import React, { useCallback, useEffect, useRef, useState } from "react";
import "@/App.css";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  RefreshCw,
  TrendingUp,
  Terminal,
} from "lucide-react";

import HeroPhoneVisual from "@/components/HeroPhoneVisual";
import InteractiveSky from "@/components/InteractiveSky";
import PreloaderIntro from "@/components/PreloaderIntro";
import KpiBar from "@/components/KpiBar";
import EventStream from "@/components/EventStream";
import PipelineViz from "@/components/PipelineViz";
import BatchBenchmarkSection from "@/components/BatchBenchmarkSection";
import FailurePanel from "@/components/FailurePanel";
import AuditTables from "@/components/AuditTables";
import ParadigmRibbonStripe from "@/components/ParadigmRibbonStripe";
import { api } from "@/lib/api";

function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-2xl bg-[#08090C]/90 border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)] transition-all"
      data-testid="app-header"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        
        {/* ================= LEFT: BRAND IDENTITY ================= */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]">
            <ShieldCheck size={22} className="text-white drop-shadow" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-white text-xl tracking-tight leading-tight flex items-center">
                RevGuard
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 font-extrabold ml-0.5">
                  .ai
                </span>
              </span>
              <span className="text-[9px] font-mono-ui font-bold px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 tracking-wider uppercase">
                Enterprise
              </span>
            </div>
            <span className="text-[10.5px] text-[#94A3B8] font-medium tracking-wide leading-none mt-1 hidden sm:block">
              Autonomous AI Revenue Recovery Engine
            </span>
          </div>
        </a>

        {/* ================= CENTER: NAVIGATION CAPSULE ================= */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] backdrop-blur-md shadow-inner">
          <a
            href="#live-console"
            className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-white hover:bg-white/[0.07] px-4 py-1.5 rounded-full transition-all duration-200"
          >
            Live Console
          </a>
          <a
            href="#features"
            className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-white hover:bg-white/[0.07] px-4 py-1.5 rounded-full transition-all duration-200"
          >
            Architecture
          </a>
          <a
            href="#benchmark"
            className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-white hover:bg-white/[0.07] px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5"
          >
            <span>Benchmark</span>
            <span className="text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
              ROI
            </span>
          </a>
          <a
            href="#chaos"
            className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-white hover:bg-white/[0.07] px-4 py-1.5 rounded-full transition-all duration-200"
          >
            Chaos Lab
          </a>
          <a
            href="#audit"
            className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-white hover:bg-white/[0.07] px-4 py-1.5 rounded-full transition-all duration-200"
          >
            Audit Ledger
          </a>
        </nav>

        {/* ================= RIGHT: TELEMETRY & LAUNCH CONSOLE ================= */}
        <div className="flex items-center gap-3.5">
          {/* FastAPI Telemetry Beacon */}
          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono-ui text-[#94A3B8] bg-white/[0.03] px-3.5 py-2 rounded-full border border-white/[0.07]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[#E2E8F0] font-semibold text-[11px]">fastapi·live</span>
          </div>

          {/* High-End Launch Console Button */}
          <a
            href="#live-console"
            className="relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full font-heading font-extrabold text-xs tracking-wide text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 shadow-[0_0_25px_rgba(99,102,241,0.45)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] hover:scale-[1.03] active:scale-[0.98] border border-white/20"
          >
            <Zap size={14} className="text-amber-300 fill-amber-300 animate-pulse" />
            <span>Launch Console</span>
            <ArrowRight size={13} className="text-white/80" />
          </a>
        </div>

      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[620px] flex items-center pt-8 pb-12">
      {/* 3D Interactive Sky Atmosphere */}
      <InteractiveSky />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-indigo-300 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-6 shadow-inner">
            <Activity size={12} className="text-indigo-400" /> Track 03 · Autonomous Revenue Recovery
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-6.5xl font-extrabold tracking-tight text-white leading-[1.04] font-heading">
            The Art of{" "}
            <span className="font-serif-hero italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-200 to-sky-300">
              Revenue Recovery.
            </span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#94A3B8] max-w-xl font-normal">
            A probabilistic <span className="text-white font-semibold">LLM Diagnosis</span> proposes root causes, a deterministic <span className="text-white font-semibold">Policy Gate</span> enforces financial invariants, and the <span className="text-white font-semibold">Razorpay Executor</span> acts — backed by SQLite WAL locks for mathematical <span className="text-indigo-300 font-medium">zero double-charge safety</span>.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#live-console"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-extrabold text-sm hover:bg-neutral-200 transition-all duration-300 shadow-xl shadow-white/10"
            >
              <span>Explore Live Pipeline</span>
              <ArrowRight size={15} />
            </a>
            <a
              href="#chaos"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] text-white font-bold text-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
            >
              <Zap size={14} className="text-indigo-400" />
              <span>Prove Idempotency</span>
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <div className="text-2xl font-extrabold font-heading text-white">100%</div>
              <div className="text-[11px] text-[#64748B] font-medium mt-0.5">At-Most-Once Guarantee</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-heading text-white">0 Hallucination</div>
              <div className="text-[11px] text-[#64748B] font-medium mt-0.5">Sandboxed LLM Layer</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-heading text-white">&gt;94%</div>
              <div className="text-[11px] text-[#64748B] font-medium mt-0.5">Diagnostic Accuracy</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="lg:col-span-6 flex items-center justify-center"
        >
          <HeroPhoneVisual />
        </motion.div>
      </div>
    </section>
  );
}

function PartnersRibbon() {
  const rails = [
    "Razorpay Direct API",
    "UPI 2.0 Autoswitch",
    "HDFC SmartHub",
    "ICICI PayDirect",
    "SBI ePay",
    "Visa 3DS 2.2",
    "Mastercard Identity Check",
    "Axis Bank Nexus",
  ];
  return (
    <section className="border-y border-white/[0.06] bg-[#0A0D14]/70 py-6 overflow-hidden relative">
      {/* Edge gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#08090C] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#08090C] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 text-center">
        <span className="text-[10px] font-bold tracking-[0.24em] text-[#64748B] uppercase flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Guarding Transactions Across National & Global Payment Rails
        </span>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {rails.map((rail, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2, scale: 1.03 }}
              className="px-4.5 py-2 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs font-bold text-[#CBD5E1] hover:text-white hover:border-indigo-500/50 hover:bg-white/[0.06] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all cursor-default flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>{rail}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureBento() {
  const cards = [
    {
      icon: Cpu,
      tag: "LAYER 01",
      title: "Probabilistic Diagnosis",
      desc: "LLM analyzes raw timeout codes and merchant metadata to output strict typed diagnoses with confidence levels — completely stripped of execution authority.",
      highlight: "Zero Hallucinated Charges",
    },
    {
      icon: Lock,
      tag: "LAYER 02",
      title: "Deterministic Policy Gate",
      desc: "Hardcoded business logic enforces economic floors (amount > ₹100), bounded retry limits (max 1-2 attempts), and automatic escalation routes.",
      highlight: "Absolute Business Control",
    },
    {
      icon: Database,
      tag: "LAYER 03",
      title: "Atomic WAL State Store",
      desc: "SQLite Write-Ahead-Log with primary key constraints on event_ids guarantees single-writer execution. Concurrent duplicates are rejected at the DB level.",
      highlight: "Mathematically Idempotent",
    },
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-[#B0A6FF] px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-3 backdrop-blur-md">
            BUILT FOR FINANCIAL GRADE SECURITY
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-5.5xl font-extrabold text-white tracking-tight font-heading">
            Reversing the <span className="font-serif-hero italic font-normal text-indigo-300">AI Agent</span> Paradigm.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
            Never give an LLM direct API keys to move funds. We separate diagnosis from execution for unbreakable financial safety and revenue protection.
          </p>
        </div>

        {/* 3D Perspective The-Eternals Marquee Ribbon Background Stripe */}
        <ParadigmRibbonStripe />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mt-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="finera-glass-card rounded-3xl p-8 flex flex-col justify-between border border-white/[0.08] shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#64748B] uppercase">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-bold text-indigo-300">
                  <ShieldCheck size={14} />
                  <span>{c.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [pipelineResult, setPipelineResult] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [executors, setExecutors] = useState([]);
  const [running, setRunning] = useState(false);
  const [autoStream, setAutoStream] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const autoRef = useRef(null);

  const fetchState = useCallback(async () => {
    try {
      const [m, res, ex] = await Promise.all([
        api.metrics(),
        api.reservations(),
        api.executors(),
      ]);
      setMetrics(m);
      setReservations(res || []);
      setExecutors(ex || []);
    } catch (e) {
      // Backend not reached
    }
  }, []);

  const pushNextEvent = useCallback(async () => {
    try {
      const e = await api.newEvent();
      setEvents((prev) => [e, ...prev.slice(0, 49)]);
      return e;
    } catch (e) {
      toast.error("Failed to load simulated event.");
      return null;
    }
  }, []);

  const runPipeline = useCallback(
    async (event) => {
      if (!event || running) return;
      setSelected(event);
      setRunning(true);
      setPipelineResult(null);

      try {
        const payload = event._raw || {
          event_id: event.event_id,
          payment_attempt_group_id: `group_${event.event_id}`,
          timestamp: new Date().toISOString(),
          merchant_id: "M_MERCHANT",
          amount: (event.amount_paise || 10000) / 100,
          currency: "INR",
          payment_method: event.method || "UPI",
          issuing_bank: event.bank || "HDFC",
          device_type: "MOBILE_ANDROID",
          status: "FAILED",
          failure_code: event.failure_code || "TIMEOUT",
          failure_reason: event.failure_note || "Failure note",
        };
        const res = await api.runPipeline(payload);
        setPipelineResult(res);

        const outcome = res.execution?.outcome || res.decision?.final_action;
        if (outcome === "SUCCESS") {
          toast.success(`Recovered ₹${((event.amount_paise || 0) / 100).toFixed(0)}`, {
            description: `Ref: ${res.execution?.razorpay_ref || "Captured"}`,
          });
        } else if (res.execution?.duplicate_blocked) {
          toast.info("Duplicate attempt blocked", {
            description: "At-most-once SQLite lock verified.",
          });
        } else {
          toast.warning(`Outcome: ${outcome}`, {
            description: res.decision?.reason,
          });
        }
        await fetchState();
      } catch (e) {
        toast.error("Pipeline evaluation failed");
      } finally {
        setRunning(false);
      }
    },
    [running, fetchState]
  );

  const handleManualNext = useCallback(async () => {
    const e = await pushNextEvent();
    if (e) runPipeline(e);
  }, [pushNextEvent, runPipeline]);

  // Initial load
  useEffect(() => {
    fetchState();
    api.listEvents().then((evts) => {
      if (evts && evts.length > 0) {
        setEvents(evts);
        setSelected(evts[0]);
      } else {
        pushNextEvent().then((e) => {
          if (e) setSelected(e);
        });
      }
    }).catch(() => {
      pushNextEvent().then((e) => {
        if (e) setSelected(e);
      });
    });
  }, [fetchState, pushNextEvent]);

  // Auto stream loop
  useEffect(() => {
    if (autoStream) {
      autoRef.current = setInterval(async () => {
        const e = await pushNextEvent();
        if (e) runPipeline(e);
      }, 4500);
    } else if (autoRef.current) {
      clearInterval(autoRef.current);
    }
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [autoStream, pushNextEvent, runPipeline]);

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F1F5F9] relative flex flex-col font-sans">
      {showIntro && <PreloaderIntro onComplete={() => setShowIntro(false)} />}
      <Toaster position="top-right" richColors theme="dark" />
      {!showIntro && <Header />}

      <main className="flex-1">
        <Hero />
        <PartnersRibbon />

        {/* Live Operator Console Section */}
        <section id="live-console" className="py-14 relative">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-8">
            {/* KPI Telemetry */}
            <KpiBar metrics={metrics} />

            {/* Ingestion & Pipeline Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 flex flex-col">
                <EventStream
                  events={events}
                  selectedId={selected?.event_id}
                  onSelect={(e) => runPipeline(e)}
                  autoStream={autoStream}
                  setAutoStream={setAutoStream}
                  onManualNext={handleManualNext}
                />
              </div>
              <div className="lg:col-span-7 flex flex-col">
                <PipelineViz
                  selected={selected}
                  result={pipelineResult}
                  running={running}
                />
              </div>
            </div>
          </div>
        </section>

        <ArchitectureBento />
        <BatchBenchmarkSection />

        {/* Chaos Injection Lab & Audit Ledger */}
        <section id="chaos" className="py-14 border-t border-white/[0.08] bg-[#07080B]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
            <FailurePanel onScenarioComplete={fetchState} />
            <div id="audit">
              <AuditTables
                reservations={reservations}
                executors={executors}
                onRefresh={fetchState}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Finera Style Minimalist Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050608] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              <ShieldCheck size={16} />
            </div>
            <span className="font-heading font-extrabold text-white text-lg tracking-tight">
              revguard<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">.ai</span>
            </span>
            <span className="text-xs text-[#64748B] pl-2 border-l border-white/10">
              Autonomous AI Revenue Recovery Engine
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#94A3B8]">
            <span className="hover:text-white transition-colors">Razorpay Buildathon 2026 · Track 03</span>
            <span className="hover:text-white transition-colors">SQLite WAL Invariants</span>
            <span className="hover:text-white transition-colors">Mathematical Zero Double-Charge</span>
          </div>

          <div className="text-xs text-[#64748B]">
            © 2026 RevGuard AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
