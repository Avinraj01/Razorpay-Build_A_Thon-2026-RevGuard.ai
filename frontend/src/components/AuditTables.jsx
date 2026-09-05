import React from "react";
import { Database, RefreshCw, Layers, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";
import { shortId, timeAgo, fmtINR } from "../lib/api";

const statusStyle = {
  PENDING: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  SUCCESS: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
  ESCALATED: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  DUPLICATE_BLOCKED: "text-indigo-300 bg-indigo-500/15 border-indigo-500/30",
  SDK_ERROR: "text-rose-400 bg-rose-500/10 border-rose-500/30",
};

const Table = ({ title, sub, rows, columns, testId }) => (
  <div
    className="finera-glass rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl"
    data-testid={testId}
  >
    <div className="px-6 py-5 border-b border-white/[0.08] bg-[#0E1118]/90 backdrop-blur-xl flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Database size={14} className="text-indigo-400" />
          <span className="text-[10px] font-bold tracking-[0.22em] text-[#B0A6FF] uppercase">
            WAL Ledger · {title}
          </span>
        </div>
        <div className="text-xs text-[#94A3B8] mt-0.5">{sub}</div>
      </div>
      <span className="text-xs font-mono-ui font-semibold text-indigo-300 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 shadow-inner">
        {rows.length} records
      </span>
    </div>
    
    <div className="overflow-x-auto scroll-thin">
      <table className="w-full text-left">
        <thead className="bg-white/[0.02] border-b border-white/[0.06]">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="px-5 py-3.5 text-[10px] font-bold tracking-[0.18em] text-[#94A3B8] uppercase"
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-xs text-[#64748B]"
              >
                No audit records yet — trigger the recovery pipeline above to observe SQLite WAL writes.
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <motion.tr
                key={r.reservation_id || r.execution_id || i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-white/[0.03] transition-colors"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="px-5 py-3.5 text-xs text-[#CBD5E1] whitespace-nowrap font-medium"
                  >
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default function AuditTables({ reservations, executors, onRefresh }) {
  const resColumns = [
    {
      key: "reservation_id",
      label: "Reservation ID",
      render: (r) => (
        <span className="font-mono-ui text-indigo-300 font-bold">
          {shortId(r.reservation_id, 14)}
        </span>
      ),
    },
    {
      key: "event_id",
      label: "Event Ref",
      render: (r) => (
        <span className="font-mono-ui text-[#94A3B8]">{shortId(r.event_id, 14)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <span
          className={`text-[10px] font-mono-ui font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
            statusStyle[r.status] || "text-slate-300 bg-slate-800 border-slate-700"
          }`}
        >
          {r.status}
        </span>
      ),
    },
    {
      key: "retry_count",
      label: "Retries",
      render: (r) => (
        <span className="font-mono-ui font-semibold text-white">
          {r.retry_count ?? 0} / 2
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Recorded",
      render: (r) => (
        <span className="text-[#64748B] text-[11px]">{timeAgo(r.created_at)}</span>
      ),
    },
  ];

  const execColumns = [
    {
      key: "execution_id",
      label: "Execution Ref",
      render: (r) => (
        <span className="font-mono-ui text-indigo-300 font-bold">
          {shortId(r.execution_id, 14)}
        </span>
      ),
    },
    {
      key: "action_type",
      label: "Action Type",
      render: (r) => (
        <span className="font-mono-ui text-[11px] font-bold text-white uppercase">
          {r.action_type || "RETRY"}
        </span>
      ),
    },
    {
      key: "outcome",
      label: "Outcome",
      render: (r) => (
        <span
          className={`text-[10px] font-mono-ui font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
            statusStyle[r.outcome] || "text-slate-300 bg-slate-800 border-slate-700"
          }`}
        >
          {r.outcome}
        </span>
      ),
    },
    {
      key: "razorpay_payment_id",
      label: "Gateway Payment ID",
      render: (r) => (
        <span className="font-mono-ui text-[#94A3B8] text-[11px]">
          {r.razorpay_payment_id || "pay_null"}
        </span>
      ),
    },
    {
      key: "latency_ms",
      label: "Latency",
      render: (r) => (
        <span className="font-mono-ui font-bold text-white">{r.latency_ms ?? 0}ms</span>
      ),
    },
    {
      key: "executed_at",
      label: "Committed",
      render: (r) => (
        <span className="text-[#64748B] text-[11px]">{timeAgo(r.executed_at)}</span>
      ),
    },
  ];

  return (
    <section className="space-y-6" data-testid="audit-tables">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers size={14} className="text-indigo-400" />
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#B0A6FF] uppercase">
              Cryptographic Audit Trail
            </span>
          </div>
          <h3 className="text-2xl font-heading font-extrabold text-white tracking-tight">
            Immutable SQLite WAL Ledgers
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl leading-relaxed">
            Direct real-time query interface into <code className="text-indigo-300 font-mono-ui">payment_reservations</code> and <code className="text-indigo-300 font-mono-ui">execution_history</code> tables.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold bg-white/[0.05] text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shadow-md"
        >
          <RefreshCw size={13} />
          <span>Refresh Database</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Table
          title="payment_reservations"
          sub="Locks event_ids before any API call · Prevents concurrent double execution"
          rows={reservations}
          columns={resColumns}
          testId="table-reservations"
        />
        <Table
          title="execution_history"
          sub="Permanent audit logs of gateway outcomes with response signatures"
          rows={executors}
          columns={execColumns}
          testId="table-executors"
        />
      </div>
    </section>
  );
}
