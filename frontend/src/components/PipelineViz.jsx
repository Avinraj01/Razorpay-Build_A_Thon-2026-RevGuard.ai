import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  Rocket,
  CircleCheck,
  CircleX,
  TriangleAlert,
  Sparkles,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  Layers,
} from "lucide-react";
import { fmtINR, shortId } from "../lib/api";

const decisionBadge = {
  RETRY: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
  OFFER_ALTERNATE_METHOD: "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
  STOP_AND_ESCALATE: "bg-rose-500/15 text-rose-400 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]",
};

const outcomeIcon = {
  SUCCESS: <CircleCheck size={20} className="text-emerald-400" />,
  ESCALATED: <TriangleAlert size={20} className="text-rose-400" />,
  DUPLICATE_BLOCKED: <ShieldCheck size={20} className="text-indigo-400" />,
  SDK_ERROR: <CircleX size={20} className="text-rose-400" />,
};

const Stage = ({ index, active, title, icon: Icon, children, testId }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden border ${
      active
        ? "bg-gradient-to-b from-[#131828] to-[#0D101A] border-indigo-500/80 shadow-[0_0_35px_rgba(99,102,241,0.3)] ring-1 ring-indigo-500/50"
        : "finera-glass-card hover:bg-white/[0.04] border-white/[0.08]"
    }`}
    data-testid={testId}
  >
    {/* Stage Accent Aura */}
    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
      active ? "bg-indigo-500/15" : "bg-white/[0.01]"
    }`} />

    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
              active
                ? "bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/40 border border-white/20 animate-pulse"
                : "bg-white/[0.04] text-indigo-300 border border-white/[0.08]"
            }`}
          >
            <Icon size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-[#94A3B8] uppercase">
              Stage 0{index + 1}
            </div>
            <h4 className="text-base font-heading font-extrabold text-white tracking-tight">
              {title}
            </h4>
          </div>
        </div>
        {active && (
          <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold tracking-[0.2em] uppercase text-indigo-300 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            PROCESSING
          </span>
        )}
      </div>
      {children}
    </div>
  </motion.div>
);

function ConfidenceBar({ value }) {
  const pct = Math.round((value || 0) * 100);
  const good = value >= 0.6;
  return (
    <div className="mt-4 pt-3.5 border-t border-white/[0.06]">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-[#94A3B8] font-medium">Confidence Score</span>
        <span
          className={`font-mono-ui font-extrabold ${good ? "text-emerald-400" : "text-rose-400"}`}
        >
          {pct}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden p-0.5 border border-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`h-full rounded-full ${
            good
              ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_#10b981]"
              : "bg-gradient-to-r from-rose-500 to-red-400 shadow-[0_0_10px_#f43f5e]"
          }`}
        />
      </div>
    </div>
  );
}

export default function PipelineViz({ selected, result, running }) {
  const diag = result?.diagnosis;
  const decision = result?.decision;
  const execution = result?.execution;

  return (
    <section
      className="finera-glass rounded-3xl p-6 h-full shadow-2xl flex flex-col justify-between border border-white/[0.08]"
      data-testid="pipeline-viz"
    >
      <div>
        {/* Header Telemetry */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-indigo-400" />
              <span className="text-[10px] font-bold tracking-[0.22em] text-[#B0A6FF] uppercase">
                Deterministic Policy Pipeline
              </span>
            </div>
            <h3 className="text-2xl font-heading font-extrabold text-white tracking-tight mt-0.5">
              {selected
                ? `Executing ${shortId(selected.event_id, 20)}`
                : "Select an Ingestion Event to Inspect"}
            </h3>
            {selected && (
              <div className="flex items-center gap-2 text-xs text-[#94A3B8] mt-2 flex-wrap">
                <span className="font-mono-ui font-bold text-white bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">
                  {selected.method?.toUpperCase()}
                </span>
                <span className="text-white font-semibold">· {selected.bank}</span>
                <span className="text-emerald-400 font-extrabold">{fmtINR(selected.amount_paise)}</span>
                <span className="text-rose-400 font-mono-ui font-bold">· {selected.failure_code}</span>
              </div>
            )}
          </div>

          {running && (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>EXECUTING POLICY INVARIANTS</span>
            </div>
          )}
        </div>

        {/* 3-Stage Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Stage 1: LLM Diagnostic Proposal */}
          <Stage
            index={0}
            active={running && !diag}
            title="LLM Diagnosis"
            icon={Brain}
            testId="stage-llm"
          >
            <AnimatePresence mode="wait">
              {diag ? (
                <motion.div
                  key="d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-bold">
                    Classified Proposal
                  </div>
                  <div className="text-sm font-extrabold text-white font-heading">
                    {diag.diagnosis_class}
                  </div>
                  <div className="text-xs text-[#CBD5E1] leading-relaxed bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                    {diag.evidence_summary}
                  </div>
                  <ConfidenceBar value={diag.confidence} />
                </motion.div>
              ) : (
                <div className="text-xs text-[#64748B] py-8 text-center flex flex-col items-center gap-2">
                  <Cpu size={20} className="text-white/20" />
                  <span>Awaiting diagnosis proposal…</span>
                </div>
              )}
            </AnimatePresence>
          </Stage>

          {/* Stage 2: Deterministic Policy Gate */}
          <Stage
            index={1}
            active={running && diag && !decision}
            title="Policy Engine Gate"
            icon={ShieldCheck}
            testId="stage-policy"
          >
            {decision ? (
              <div className="space-y-3">
                <div
                  className={`inline-block text-[11px] font-extrabold tracking-[0.16em] uppercase px-3.5 py-1 rounded-full border ${decisionBadge[decision.final_action] || "text-slate-300 bg-slate-800 border-slate-700"}`}
                >
                  {(decision?.final_action || "UNKNOWN").replace(/_/g, " ")}
                </div>
                
                <div className="text-xs text-[#CBD5E1] leading-relaxed">
                  {decision.reason}
                </div>

                <div className="space-y-1.5 pt-2.5 border-t border-white/[0.06]">
                  {Object.entries(decision.gates).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between text-[11px] font-mono-ui"
                    >
                      <span className="text-[#94A3B8]">{k}</span>
                      {v ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-bold">
                          <CircleCheck size={12} /> PASS
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1 font-bold">
                          <CircleX size={12} /> REJECT
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono-ui text-[#64748B] pt-1">
                  res_id: {shortId(decision.reservation_id, 18)}
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#64748B] py-8 text-center flex flex-col items-center gap-2">
                <Lock size={20} className="text-white/20" />
                <span>Awaiting policy gates…</span>
              </div>
            )}
          </Stage>

          {/* Stage 3: Razorpay Gateway Executor */}
          <Stage
            index={2}
            active={running && decision && !execution}
            title="Gateway Executor"
            icon={Rocket}
            testId="stage-executor"
          >
            {execution ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  {outcomeIcon[execution.outcome] || (
                    <CircleCheck size={20} className="text-indigo-400" />
                  )}
                  <span className="text-base font-black text-white font-heading">
                    {(execution?.outcome || "PENDING").replace(/_/g, " ")}
                  </span>
                </div>

                {execution.razorpay_ref && (
                  <div className="text-[10px] font-mono-ui text-indigo-300/90 break-all bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20">
                    ref: {execution.razorpay_ref}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-2.5 text-center">
                    <div className="text-[9px] text-[#94A3B8] uppercase tracking-wider font-bold">
                      Latency
                    </div>
                    <div className="font-mono-ui font-extrabold text-white mt-0.5">
                      {execution.latency_ms} ms
                    </div>
                  </div>
                  
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-2.5 text-center">
                    <div className="text-[9px] text-[#94A3B8] uppercase tracking-wider font-bold">
                      Status
                    </div>
                    <div className="font-mono-ui font-extrabold text-emerald-400 mt-0.5">
                      {execution.duplicate_blocked ? "BLOCKED" : "COMMITTED"}
                    </div>
                  </div>
                </div>

                {execution.explanation && (
                  <div className="text-[11px] text-[#94A3B8] line-clamp-2 leading-relaxed italic">
                    "{execution.explanation}"
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-[#64748B] py-8 text-center flex flex-col items-center gap-2">
                <Rocket size={20} className="text-white/20" />
                <span>Awaiting execution stage…</span>
              </div>
            )}
          </Stage>
        </div>
      </div>
    </section>
  );
}
