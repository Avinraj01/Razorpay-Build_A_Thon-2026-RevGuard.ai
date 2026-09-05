import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Wifi, Sparkles, CheckCircle2, Zap, Lock, Cpu, Activity } from "lucide-react";

export default function PreloaderIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const stages = [
    "MOUNTING WAL KERNEL",
    "VERIFYING ZERO DOUBLE-CHARGE",
    "CALIBRATING 277 TEST EVENTS",
    "INITIALIZING POLICY AGENT",
    "SYSTEM ARMED & SECURED",
  ];

  const currentStage = stages[Math.min(Math.floor((progress / 100) * stages.length), stages.length - 1)];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Characters for binary/hex stream
    const fontSize = 14;
    const columns = Math.ceil(width / fontSize);
    const rows = Math.ceil(height / (fontSize * 1.3));

    const grid = [];
    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < columns; c++) {
        grid[r][c] = Math.random() > 0.5 ? "1" : "0";
      }
    }

    let animationFrame;
    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.fillStyle = "#07080B";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          if (Math.random() < 0.08) {
            grid[r][c] = Math.random() > 0.5 ? "1" : "0";
          }

          const rand = (r * columns + c + frameCount) % 100;
          if (rand < 15) {
            ctx.fillStyle = "rgba(56, 189, 248, 0.45)"; // Cyan
          } else if (rand < 45) {
            ctx.fillStyle = "rgba(176, 166, 255, 0.35)"; // Lilac
          } else if (rand < 75) {
            ctx.fillStyle = "rgba(129, 140, 248, 0.22)"; // Indigo
          } else {
            ctx.fillStyle = "rgba(99, 102, 241, 0.16)"; // Deep purple
          }

          ctx.fillText(grid[r][c], c * (fontSize * 1.05), (r + 1) * (fontSize * 1.35));
        }
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              onComplete?.();
            }, 400);
          }, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
      clearInterval(interval);
    };
  }, [onComplete]);

  // Number of cyber segmented blocks
  const totalBlocks = 24;
  const activeBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="apple-card-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={() => {
            setIsDone(true);
            setTimeout(() => onComplete?.(), 250);
          }}
          className="fixed inset-0 z-[100] bg-[#07080B] overflow-hidden cursor-pointer select-none flex flex-col items-center justify-center"
        >
          {/* 1. Dynamic 01 Binary Matrix Stream Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-35" />

          {/* 2. Deep Radiant Ambient Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(99,102,241,0.22),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07080B_85%)] pointer-events-none" />

          {/* Main 3D Card Stage with Parallax */}
          <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none px-4 max-w-lg w-full">
            
            {/* Top Minimalist Luxury Hackathon Label */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl shadow-inner"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-[11px] font-mono-ui font-bold tracking-[0.24em] uppercase text-white/90">
                RAZORPAY BUILDATHON 2026
              </span>
              <span className="text-white/20 font-light">/</span>
              <span className="text-[10px] font-mono-ui font-extrabold text-cyan-300 tracking-widest uppercase">
                TRACK 03
              </span>
            </motion.div>

            {/* 3D Titanium Metal Card Perspective Wrapper */}
            <div className="relative perspective-[1400px] mb-8">
              
              {/* Card Dynamic Ambient Glow Aura */}
              <div className="absolute -inset-6 bg-gradient-to-r from-indigo-500/35 via-purple-500/25 to-cyan-400/35 blur-3xl rounded-3xl -z-10 animate-pulse" />

              {/* 3D Photorealistic Luxury Credit Card with Mouse Parallax */}
              <motion.div
                ref={cardRef}
                animate={{
                  rotateX: 14 - mousePos.y * 0.8,
                  rotateY: -6 + mousePos.x * 0.8,
                  rotateZ: [1, -1, 1],
                  y: [-6, 6, -6],
                }}
                transition={{
                  rotateX: { type: "spring", damping: 15, stiffness: 80 },
                  rotateY: { type: "spring", damping: 15, stiffness: 80 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative w-[320px] sm:w-[370px] h-[200px] sm:h-[225px] rounded-[26px] bg-[#0F121C] border-2 border-white/30 p-6 flex flex-col justify-between shadow-[0_30px_70px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden"
              >
                {/* Brushed Titanium Dark Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#242A3E] via-[#121522] to-[#08090E] pointer-events-none" />

                {/* Animated Holographic Security Laser Scan Line */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transform -skew-x-25 pointer-events-none"
                />

                {/* Card Top Row: Chip + Wifi + Brand Badge */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Realistic Gold EMV Chip */}
                    <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-200 shadow-md p-1 flex items-center justify-center">
                      <div className="w-full h-full border border-amber-900/40 rounded-xs flex items-center justify-center">
                        <div className="w-3 h-3 border-r border-b border-amber-950/50" />
                      </div>
                    </div>
                    {/* Contactless Icon */}
                    <Wifi size={20} className="text-white/90 rotate-90" />
                  </div>

                  {/* RevGuard Brand Icon & Title */}
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 shadow-inner">
                    <ShieldCheck size={16} className="text-indigo-400" />
                    <span className="font-heading font-black text-sm text-white tracking-tight">
                      RevGuard<span className="text-indigo-400">.ai</span>
                    </span>
                  </div>
                </div>

                {/* Embossed Card Digits */}
                <div className="relative z-10 my-auto">
                  <div className="font-mono-ui text-lg sm:text-xl font-black tracking-[0.24em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    4532 •••• •••• 8820
                  </div>
                  <div className="text-[9.5px] font-mono-ui font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>POLICY SHIELD ACTIVE · 0 DOUBLE-CHARGE</span>
                  </div>
                </div>

                {/* Card Bottom Row: Cardholder + Expiry + Visa */}
                <div className="flex items-center justify-between text-[11px] font-mono-ui text-[#CBD5E1] border-t border-white/15 pt-3 relative z-10">
                  <div>
                    <div className="text-[8px] uppercase tracking-wider text-[#94A3B8] font-bold">CARDHOLDER</div>
                    <div className="text-white font-black tracking-wider uppercase text-xs">RAZORPAY RECOVERY</div>
                  </div>
                  <div>
                    <div className="text-[8px] uppercase tracking-wider text-[#94A3B8] font-bold">EXPIRES</div>
                    <div className="text-white font-black text-xs">12/28</div>
                  </div>
                  <div className="font-heading font-black text-sm italic tracking-widest text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-3 py-1 rounded-md border border-white/30 shadow-lg">
                    VISA
                  </div>
                </div>
              </motion.div>

              {/* Floating Security Seal Badge */}
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [2, -2, 2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-3 z-30 finera-glass px-4 py-2 rounded-2xl border-2 border-emerald-400 shadow-2xl shadow-emerald-500/30 flex items-center gap-2.5"
              >
                <div className="w-6.5 h-6.5 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/40">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest leading-none">
                    IMMUTABLE WAL
                  </div>
                  <div className="text-xs font-black text-white leading-tight mt-0.5">
                    100% Idempotent
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Refined World-Class Typography & Telemetry */}
            <div className="text-center space-y-3 w-full max-w-sm">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-white flex items-center justify-center">
                RevGuard
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 font-extrabold ml-1">
                  .ai
                </span>
              </h1>

              <div className="text-xs text-[#94A3B8] font-medium tracking-wide">
                Autonomous AI Revenue Recovery Engine
              </div>

              {/* Ultra-Clean Laser Progress Loader */}
              <div className="pt-2 space-y-2 font-mono-ui">
                <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span className="text-indigo-300 font-semibold tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    INITIALIZING KERNEL
                  </span>
                  <span className="text-cyan-300 font-bold tracking-widest">{progress}%</span>
                </div>
                
                <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden p-[1px]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_12px_#38bdf8]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
