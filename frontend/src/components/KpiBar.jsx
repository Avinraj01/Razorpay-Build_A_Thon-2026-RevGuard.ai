import React from "react";
import { motion } from "framer-motion";
import { fmtINR } from "../lib/api";
import { TrendingUp, ShieldCheck, Zap, Activity, AlertCircle, Clock, Sparkles } from "lucide-react";

const icons = [TrendingUp, Activity, Zap, AlertCircle, ShieldCheck, Clock];

const Stat = ({ label, value, sub, idx, isRevenue }) => {
  const Icon = icons[idx] || Activity;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.4 }}
      whileHover={{ y: -3, scale: 1.02 }}
      className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 overflow-hidden group ${
        isRevenue
          ? "bg-gradient-to-b from-indigo-950/30 to-[#0A0E18] border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.15)]"
          : "bg-white/[0.025] border-white/[0.07] hover:border-indigo-500/30 hover:bg-white/[0.04]"
      }`}
      data-testid={`kpi-${(label || "unknown").toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Corner Ambient Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#94A3B8] uppercase">
          {label}
        </span>
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
          isRevenue
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-white/[0.04] text-indigo-400 border border-white/[0.08]"
        }`}>
          <Icon size={14} />
        </div>
      </div>

      <div>
        <div
          className={`text-2xl lg:text-3xl font-black font-heading tracking-tight ${
            isRevenue
              ? "bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent"
              : "text-white"
          }`}
        >
          {value}
        </div>
        {sub && (
          <div className="text-[11px] text-[#64748B] mt-1.5 font-medium flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isRevenue ? "bg-emerald-400" : "bg-indigo-400"}`} />
            <span>{sub}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function KpiBar({ metrics }) {
  const m = metrics || {};
  return (
    <div
      className="finera-glass rounded-3xl p-6 shadow-2xl border border-white/[0.08] relative overflow-hidden"
      data-testid="kpi-bar"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 px-1 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-indigo-400" />
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#B0A6FF] uppercase">
              Live Telemetry Stream
            </span>
          </div>
          <h3 className="text-2xl font-heading font-extrabold text-white tracking-tight mt-0.5">
            Economic Impact & Throughput
          </h3>
        </div>
        
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>PIPELINE HEALTHY</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Stat
          idx={0}
          label="Recovered Revenue"
          value={fmtINR(m.recovered_revenue_paise)}
          sub="Net verified TPV"
          isRevenue={true}
        />
        <Stat
          idx={1}
          label="Success Rate"
          value={`${m.success_rate ?? 0}%`}
          sub="via recovery pipeline"
        />
        <Stat
          idx={2}
          label="Events Processed"
          value={m.total_events_processed ?? 0}
          sub="Stream throughput"
        />
        <Stat
          idx={3}
          label="Escalated"
          value={m.escalated ?? 0}
          sub="Safely stopped"
        />
        <Stat
          idx={4}
          label="Duplicates Blocked"
          value={m.duplicate_blocked ?? 0}
          sub="At-most-once WAL"
        />
        <Stat
          idx={5}
          label="Execution Latency"
          value={`${m.avg_latency_ms ?? 0}ms`}
          sub="Mean policy cycle"
        />
      </div>
    </div>
  );
}
