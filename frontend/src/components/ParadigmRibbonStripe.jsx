import React from "react";
import { motion } from "framer-motion";

const STRIPE_ITEMS = [
  "REVERSING THE AI AGENT PARADIGM",
  "ZERO DOUBLE-CHARGE",
  "THREE.JS WEBGL ENGINE",
  "DETERMINISTIC POLICY GATE",
  "SQLITE WAL STATE LOCK",
  "PROBABILISTIC LLM DIAGNOSIS",
  "AT-MOST-ONCE EXECUTION",
  "RAZORPAY REVENUE RECOVERY",
  "100% IDEMPOTENT COMMITS",
  "FINANCIAL INVARIANTS",
];

export default function ParadigmRibbonStripe() {
  return (
    <div className="relative w-full overflow-hidden py-12 select-none pointer-events-none my-6">
      {/* Background glow atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/15 to-indigo-500/10 blur-3xl" />

      {/* 3D Angled Perspective Container matching Webflow / The-Eternals Style */}
      <div className="relative w-full flex flex-col items-center justify-center gap-2">
        
        {/* TOP / PRIMARY PERSPECTIVE RIBBON */}
        <div 
          className="w-[120%] -ml-[10%] relative py-4 sm:py-5 shadow-[0_10px_35px_rgba(16,185,129,0.35)] border-y border-black/20 overflow-hidden transform -rotate-2 scale-105"
          style={{
            background: "linear-gradient(90deg, #84cc16 0%, #10b981 35%, #06b6d4 70%, #3b82f6 100%)",
            clipPath: "polygon(0 8%, 50% 0%, 100% 12%, 100% 92%, 50% 100%, 0 88%)",
          }}
        >
          {/* Subtle noise / scanline texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />

          {/* Continuous Infinite Marquee 1 */}
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...STRIPE_ITEMS, ...STRIPE_ITEMS, ...STRIPE_ITEMS, ...STRIPE_ITEMS].map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 font-heading font-black text-black tracking-tight text-sm sm:text-base md:text-lg uppercase">
                <span>{item}</span>
                <span className="inline-block w-2.5 h-2.5 bg-black rounded-full opacity-80" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM / CROSS-PERSPECTIVE RIBBON (Counter-angled for extreme depth) */}
        <div 
          className="w-[120%] -ml-[10%] relative py-3 sm:py-4 shadow-[0_10px_30px_rgba(6,182,212,0.3)] border-y border-black/20 overflow-hidden transform rotate-1.5 -mt-3 scale-100 opacity-90"
          style={{
            background: "linear-gradient(90deg, #06b6d4 0%, #3b82f6 30%, #8b5cf6 70%, #10b981 100%)",
            clipPath: "polygon(0 0%, 50% 12%, 100% 0%, 100% 100%, 50% 88%, 0 100%)",
          }}
        >
          {/* Continuous Infinite Marquee 2 (Reverse Direction) */}
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...STRIPE_ITEMS, ...STRIPE_ITEMS, ...STRIPE_ITEMS, ...STRIPE_ITEMS].reverse().map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 font-heading font-black text-black/90 tracking-tight text-xs sm:text-sm md:text-base uppercase">
                <span>{item}</span>
                <span className="inline-block w-2 h-2 bg-black/80 rotate-45" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
