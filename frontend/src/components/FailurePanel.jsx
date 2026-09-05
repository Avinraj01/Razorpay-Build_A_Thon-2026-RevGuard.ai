import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, GitFork, TimerReset, Copy, ShieldAlert, Sparkles, CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";
import { api } from "../lib/api";

const scenarios = [
  {
    key: "concurrent",
    icon: GitFork,
    title: "Concurrent Webhooks",
    proof: "SQLite atomic UPSERT elects exactly one winner",
    action: api.failure.concurrent,
    testId: "trigger-concurrent",
    badge: "10x Concurrency Race",
    color: "from-indigo-500 to-purple-600",
  },
  {
    key: "stale",
    icon: TimerReset,
    title: "Stale Reservation",
    proof: "Crashed worker state → next attempt routes to STOP_AND_ESCALATE",
    action: api.failure.stale,
    testId: "trigger-stale",
    badge: "Worker Crash Recovery",
    color: "from-amber-500 to-orange-600",
  },
  {
    key: "duplicate",
    icon: Copy,
    title: "Duplicate Executor Call",
    proof: "Primary Key constraint blocks 2nd physical write · At-most-once guaranteed",
    action: api.failure.duplicate,
    testId: "trigger-duplicate",
    badge: "Zero Double-Charge Proof",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function FailurePanel({ onScenarioComplete }) {
  const [busyKey, setBusyKey] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  const run = async (s) => {
    setBusyKey(s.key);
    try {
      const res = await s.action();
      setLastResult({ scenario: s.title, ...res });
      toast.success(`${s.title} → scenario proven`, {
        description: res.explanation,
      });
      onScenarioComplete?.();
    } catch (e) {
      toast.error(`Failed: ${s.title}`);
    } finally {
      setBusyKey(null);
    }
  };

  return (
    <section
      className="finera-glass rounded-3xl p-8 shadow-2xl border border-white/[0.08] relative overflow-hidden"
      data-testid="failure-panel"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-amber-400" />
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#B0A6FF] uppercase">
              Adversarial Chaos & Invariant Verification Lab
            </span>
          </div>
          <h3 className="text-2xl font-heading font-extrabold text-white tracking-tight">
            Prove Financial Invariants Live
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl leading-relaxed">
            Trigger simulated network drops, crashed workers, and concurrent double-charge attempts to test the durable SQLite WAL lock boundary.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono-ui font-semibold">
          <Lock size={12} className="text-indigo-400" />
          <span>WAL Mode: Single-Writer Isolation</span>
        </div>
      </div>

      {/* Scenario Attack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {scenarios.map((s) => {
          const Icon = s.icon;
          const busy = busyKey === s.key;
          return (
            <motion.button
              key={s.key}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => run(s)}
              disabled={busy}
              className="text-left rounded-3xl p-6 bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300 relative overflow-hidden group shadow-lg flex flex-col justify-between"
              data-testid={s.testId}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg border border-white/20 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className={busy ? "animate-spin" : ""} />
                  </div>
                  <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#94A3B8] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
                    {s.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-heading text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                  {s.title}
                </h4>

                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                  {s.proof}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-white transition-colors">
                <span>{busy ? "Injecting Fault…" : "Trigger Scenario"}</span>
                <span className="text-lg leading-none">→</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Verification Ledger Output */}
      {lastResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-indigo-950/30 to-[#0C0F17] border border-emerald-500/30 p-4.5 flex items-start gap-3 shadow-xl"
        >
          <CheckCircle2 size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-heading font-bold text-white text-sm">
              {lastResult.scenario} Invariant Verified:
            </span>{" "}
            <span className="text-[#CBD5E1] leading-relaxed">
              {lastResult.explanation}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
