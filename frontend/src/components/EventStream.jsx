import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, StepForward, Radio, ShieldAlert, CreditCard, Smartphone, Building2 } from "lucide-react";
import { fmtINR, timeAgo, shortId } from "../lib/api";

const failureBadge = {
  BANK_DEGRADATION: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  MERCHANT_CHECKOUT_REGRESSION: "text-purple-300 bg-purple-500/10 border-purple-500/30",
  NETWORK_LATENCY: "text-sky-300 bg-sky-500/10 border-sky-500/30",
  CARD_DECLINED: "text-rose-300 bg-rose-500/10 border-rose-500/30",
  FRAUD_HOLD: "text-indigo-300 bg-indigo-500/10 border-indigo-500/30",
};

const bankIcons = {
  HDFC: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  ICICI: "bg-orange-600/20 text-orange-400 border-orange-500/30",
  SBI: "bg-cyan-600/20 text-cyan-400 border-cyan-500/30",
  AXIS: "bg-rose-600/20 text-rose-400 border-rose-500/30",
};

export default function EventStream({
  events,
  selectedId,
  onSelect,
  autoStream,
  setAutoStream,
  onManualNext,
}) {
  return (
    <section
      className="finera-glass rounded-3xl overflow-hidden flex flex-col h-full shadow-2xl border border-white/[0.08]"
      data-testid="event-stream"
    >
      <header className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0E1118]/90 backdrop-blur-xl sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#B0A6FF] uppercase">
              Live Ingestion Feed
            </span>
          </div>
          <h3 className="text-xl font-heading font-extrabold text-white tracking-tight mt-0.5">
            Real-Time Payment Failures
          </h3>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAutoStream(!autoStream)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
              autoStream
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500/50 shadow-lg shadow-indigo-500/30 animate-pulse"
                : "bg-white/[0.05] text-[#CBD5E1] border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
            data-testid="toggle-auto-stream"
          >
            {autoStream ? <Pause size={12} /> : <Play size={12} />}
            <span>{autoStream ? "Streaming" : "Auto Ingest"}</span>
          </button>
          
          <button
            onClick={onManualNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold border bg-white text-black border-white hover:bg-neutral-200 transition-all duration-300 shadow-md shadow-white/10 hover:scale-105"
            data-testid="manual-next"
          >
            <StepForward size={12} />
            <span>Next</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scroll-thin p-4 space-y-3 max-h-[640px]">
        <AnimatePresence initial={false}>
          {events.length === 0 && (
            <div className="text-sm text-[#64748B] p-12 text-center flex flex-col items-center gap-3">
              <ShieldAlert size={28} className="text-indigo-400/50 animate-bounce" />
              <span>Awaiting payment failure events from gateway...</span>
            </div>
          )}
          {events.map((e) => {
            const isSel = e.event_id === selectedId;
            const bankStyle = bankIcons[e.bank?.toUpperCase()] || "bg-white/10 text-white/80 border-white/10";
            return (
              <motion.button
                layout
                key={e.event_id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.01, x: 3 }}
                onClick={() => onSelect(e)}
                className={`w-full text-left rounded-2xl p-4.5 transition-all duration-300 relative border overflow-hidden ${
                  isSel
                    ? "bg-gradient-to-r from-indigo-950/60 to-[#0F1422] border-indigo-500/80 shadow-[0_0_30px_rgba(99,102,241,0.25)]"
                    : "bg-white/[0.025] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15"
                }`}
                data-testid={`event-${e.event_id}`}
              >
                {/* Active neon indicator line */}
                {isSel && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-400 via-purple-400 to-cyan-400 shadow-[0_0_12px_#6366f1]" />
                )}

                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="relative flex h-2 w-2">
                      <span className={`inline-flex h-full w-full rounded-full ${isSel ? "bg-cyan-400 animate-ping" : "bg-[#64748B]"}`} />
                    </span>
                    <span className="font-mono-ui text-xs text-white/90 truncate font-semibold">
                      {e.event_id}
                    </span>
                  </div>
                  
                  <span className="font-heading font-black text-white text-base tracking-tight">
                    {fmtINR(e.amount_paise)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono-ui font-extrabold uppercase px-2 py-0.5 rounded-md border ${bankStyle}`}>
                      {e.bank || "BANK"}
                    </span>
                    <span className="text-[11px] font-bold text-[#CBD5E1]">
                      {e.method || "UPI"}
                    </span>
                  </div>

                  <span
                    className={`text-[9.5px] font-mono-ui font-bold px-2 py-0.5 rounded-full border ${
                      failureBadge[e.failure_code] || "text-[#94A3B8] bg-white/5 border-white/10"
                    }`}
                  >
                    {e.failure_code}
                  </span>
                </div>

                {e.failure_note && (
                  <div className="text-[11px] text-[#94A3B8] mt-2 line-clamp-1 italic">
                    "{e.failure_note}"
                  </div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
