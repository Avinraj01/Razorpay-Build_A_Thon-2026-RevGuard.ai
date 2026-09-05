# Architectural Decision Records (ADR)

This document records the foundational architectural, evaluation, and security decisions for the RevGuard AI Revenue Recovery system.

---

## ADR-001: Separation of Probabilistic and Deterministic Layers
* **Date:** 2026-08-22
* **Status:** Accepted
* **Context:** Payment transaction workflows demand absolute determinism, auditability, and safety invariants. Large Language Models (LLMs) provide rapid probabilistic diagnosis over messy bank error strings, but must not possess direct execution authority over financial transactions.
* **Decision:** Decouple the pipeline into three strictly bounded layers:
  1. **Probabilistic Layer (LLM Diagnosis):** Evaluates error payloads and emits a structured hypothesis and confidence score.
  2. **Deterministic Layer (Policy Engine Gate):** Evaluates business rules (economic floor, bounded retries, KYC/fraud constraints) and decides the final action (`RETRY`, `OFFER_ALTERNATE_METHOD`, or `STOP_AND_ESCALATE`).
  3. **Execution Layer (Idempotency Store):** Enforces SQLite Write-Ahead-Logging (WAL) locks and primary-key constraints to guarantee at-most-once execution against the payment gateway.

---

## ADR-002: Durable At-Most-Once Idempotency via SQLite WAL
* **Date:** 2026-08-24
* **Status:** Accepted
* **Context:** Concurrent webhook deliveries and network replays create double-execution risks.
* **Decision:** Utilize single-writer atomic transactions with SQLite in WAL mode. Every transaction reservation is keyed on `(event_id, attempt_number)`. Conflicting or duplicate writes are rejected at the storage layer prior to issuing external gateway requests.

---

## ADR-003: Net Economic Contribution Evaluation Metric
* **Date:** 2026-08-27
* **Status:** Accepted
* **Context:** Measuring pure success count ignores operational costs, payment friction penalties, and API overhead.
* **Decision:** Benchmark models using Net Economic Contribution:
  $$\text{Net Value} = \text{Gross Recovered INR} - (\text{Action Cost} + \text{Friction Cost} + \text{Escalation Cost})$$
  Policies are evaluated on a chronological 70/30 split of held-out transactions.
