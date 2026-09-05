import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
  Lock,
  ArrowRight,
  CreditCard,
  Smartphone,
  Sparkles,
} from "lucide-react";

export default function HeroPhoneVisual() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto py-6 flex items-center justify-center">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/15 blur-3xl rounded-full pointer-events-none transform -translate-y-4" />

      {/* ================= FLOATING CRYSTAL BADGES (Finera Style) ================= */}
      
      {/* 1. Top-Left Floating Badge: Visa / 3DS Crystal */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [-1, 1.5, -1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 -left-4 sm:-left-8 z-20 finera-glass-card px-3.5 py-2 rounded-2xl shadow-xl border border-white/15 flex items-center gap-2.5 backdrop-blur-2xl"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-[11px] shadow-md shadow-indigo-500/30">
          VISA
        </div>
        <div>
          <div className="text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">
            3DS 2.2 Verified
          </div>
          <div className="text-xs font-extrabold text-white">Safe Retry Pass</div>
        </div>
      </motion.div>

      {/* 2. Top-Right Floating Badge: Razorpay Secured Shield */}
      <motion.div
        animate={{ y: [6, -8, 6], rotate: [1, -1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-8 -right-4 sm:-right-8 z-20 finera-glass-card px-3.5 py-2 rounded-2xl shadow-xl border border-white/15 flex items-center gap-2.5 backdrop-blur-2xl"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
          <ShieldCheck size={16} />
        </div>
        <div>
          <div className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            Zero Double Charge
          </div>
          <div className="text-xs font-extrabold text-white">SQLite WAL Lock</div>
        </div>
      </motion.div>

      {/* 3. Bottom-Left Floating Badge: UPI 2.0 Autoswitch */}
      <motion.div
        animate={{ y: [8, -6, 8], rotate: [-1.5, 1, -1.5] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-12 -left-6 sm:-left-10 z-20 finera-glass-card px-3.5 py-2 rounded-2xl shadow-xl border border-white/15 flex items-center gap-2.5 backdrop-blur-2xl"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-extrabold text-[10px] shadow-md shadow-orange-500/30">
          UPI
        </div>
        <div>
          <div className="text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">
            Smart Fallback
          </div>
          <div className="text-xs font-extrabold text-white">Alternate Rail Active</div>
        </div>
      </motion.div>

      {/* 4. Bottom-Right Floating Badge: Mastercard / Instant Recovery */}
      <motion.div
        animate={{ y: [-6, 7, -6], rotate: [1, -1.5, 1] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -bottom-2 -right-4 sm:-right-6 z-20 finera-glass-card px-3.5 py-2 rounded-2xl shadow-xl border border-white/15 flex items-center gap-2.5 backdrop-blur-2xl"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/30">
          <Sparkles size={15} />
        </div>
        <div>
          <div className="text-[10px] font-bold tracking-wider text-[#B0A6FF] uppercase">
            Autonomous
          </div>
          <div className="text-xs font-extrabold text-white">₹24,999 Recovered</div>
        </div>
      </motion.div>

      {/* ================= SMARTPHONE MOCKUP BODY (Finera Style) ================= */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[300px] sm:w-[325px] rounded-[44px] p-3 bg-gradient-to-b from-[#22283A] via-[#151924] to-[#0D1017] border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(99,102,241,0.25)]"
      >
        {/* Outer Titanium Edge Reflection */}
        <div className="rounded-[38px] bg-[#0A0C13] border border-white/[0.08] overflow-hidden p-4 flex flex-col justify-between min-h-[550px] relative">
          
          {/* Dynamic Island / Speaker Notch */}
          <div className="flex justify-center mb-3">
            <div className="w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-end px-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Top Status Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono-ui text-[#64748B] mb-2 px-1">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">5G</span>
              <div className="w-4 h-2 rounded-sm border border-[#64748B] p-0.5 flex items-center">
                <div className="h-full w-full bg-emerald-400 rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Screen Content: Payment Failure Interception & Recovery */}
          <div className="space-y-3.5 flex-1">
            {/* Merchant Header */}
            <div className="flex items-center justify-between bg-white/[0.04] p-2.5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  R
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Razorpay Checkout</div>
                  <div className="text-[9px] text-[#94A3B8]">Merchant ID: M_FLIPKART</div>
                </div>
              </div>
              <span className="text-[9px] font-mono-ui text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            {/* Amount Banner */}
            <div className="text-center py-2 bg-gradient-to-b from-white/[0.06] to-transparent rounded-2xl border border-white/[0.06]">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8]">
                Payment Amount
              </div>
              <div className="text-2xl font-black text-white font-heading mt-0.5 tracking-tight">
                ₹24,999.00
              </div>
              <div className="text-[10px] text-rose-400 font-medium mt-0.5 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Initial Attempt Failed (Issuer Timeout)
              </div>
            </div>

            {/* AI Diagnosis Card */}
            <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-2xl p-3 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-[11px]">
                  <Sparkles size={13} className="text-indigo-400" />
                  <span>AI Failure Diagnosis</span>
                </div>
                <span className="text-[9px] font-mono-ui font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  96% Confidence
                </span>
              </div>
              <p className="text-[11px] text-[#CBD5E1] leading-tight">
                SBI UPI rail degradation detected. Policy engine recommends automatic retry on secondary fast-lane.
              </p>
            </div>

            {/* Policy Action Selector */}
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">
                Deterministic Action
              </div>

              {/* Action Item 1: Smart Route (Selected) */}
              <div className="bg-gradient-to-r from-indigo-600/30 to-purple-600/20 border border-indigo-400/50 rounded-xl p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                    <Zap size={13} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white leading-none">
                      Execute Safe Recovery
                    </div>
                    <div className="text-[9px] text-[#94A3B8] mt-0.5">
                      Idempotent WAL single-lock
                    </div>
                  </div>
                </div>
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>

              {/* Action Item 2: Alternate Method */}
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[#94A3B8]">
                    <CreditCard size={13} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white leading-none">
                      Fallback to Card / Netbanking
                    </div>
                    <div className="text-[9px] text-[#64748B] mt-0.5">
                      Alternative payment link
                    </div>
                  </div>
                </div>
                <div className="w-3.5 h-3.5 rounded-full border border-white/20" />
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-extrabold text-xs tracking-wide shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity">
              <span>Recover ₹24,999 Now</span>
              <ArrowRight size={13} />
            </button>
            <div className="text-center mt-2 text-[9px] text-[#64748B] flex items-center justify-center gap-1 font-mono-ui">
              <Lock size={9} /> Bounded Policy: Max 1 Retry
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
