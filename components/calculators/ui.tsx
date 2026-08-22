// ─────────────────────────────────────────────────────────────────────────
// Shared UI primitives for all calculators — one consistent look across
// every tool (matches the existing BTU calculator / PriceCalculator design:
// white rounded cards, slate borders, sky-600 accents, uppercase labels).
// ─────────────────────────────────────────────────────────────────────────
"use client";

import { FiChevronDown } from "react-icons/fi";
import type { ReactNode } from "react";

/** Uppercase section label with optional icon — used above input groups. */
export function CalcLabel({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
      {icon}
      {children}
    </label>
  );
}

export const inputCls =
  "w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-base font-bold text-slate-900 bg-white";

export const selectCls =
  "w-full appearance-none px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-base font-bold text-slate-900 bg-white cursor-pointer pr-10";

/** Numeric input with optional unit suffix. */
export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  hint,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-2">{label}</label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => {
            const n = Number(e.target.value);
            onChange(Number.isFinite(n) ? n : 0);
          }}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-label={label}
          className={`${inputCls} ${suffix ? "pr-12" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-600">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-600">{hint}</p>}
    </div>
  );
}

/** Styled select with chevron. */
export function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-2">{label}</label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} className={selectCls}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-600">{hint}</p>}
    </div>
  );
}

/** Pill button group (single choice). */
export function PillGroup<T extends string>({
  label,
  value,
  onChange,
  options,
  color = "sky",
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; sub?: string }[];
  color?: "sky" | "amber" | "emerald" | "violet";
}) {
  const activeCls: Record<string, string> = {
    sky: "bg-sky-600 text-white shadow-lg scale-[1.03] border-sky-600",
    amber: "bg-amber-500 text-white shadow-lg scale-[1.03] border-amber-500",
    emerald: "bg-emerald-600 text-white shadow-lg scale-[1.03] border-emerald-600",
    violet: "bg-violet-600 text-white shadow-lg scale-[1.03] border-violet-600",
  };
  const idleCls = "bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent";
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-2">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 cursor-pointer ${
              value === o.value ? activeCls[color] : idleCls
            }`}
          >
            {o.label}
            {o.sub && <span className={`block text-[10px] font-semibold mt-0.5 ${value === o.value ? "opacity-80" : "text-slate-600"}`}>{o.sub}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/** White calculator card shell. */
export function CalcCard({ children }: { children: ReactNode }) {
  return <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">{children}</div>;
}

/** Result stat tile used inside the gradient result panel. */
export function ResultStat({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 text-center">
      <p className="text-sky-100 text-[11px] font-bold uppercase tracking-wider mb-1.5">{label}</p>
      <p className="text-2xl sm:text-3xl font-black text-white leading-tight">{value}</p>
      {sub && <p className="text-sky-200 text-xs font-bold mt-1">{sub}</p>}
    </div>
  );
}

/** Primary calculate button. */
export function CalculateButton({ onClick, children, color = "sky" }: { onClick: () => void; children: ReactNode; color?: "sky" | "emerald" }) {
  const cls =
    color === "sky"
      ? "bg-sky-600 hover:bg-sky-700"
      : "bg-emerald-600 hover:bg-emerald-700";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full ${cls} text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer`}
    >
      {children}
    </button>
  );
}

/** Small print / disclaimer line inside calculator cards. */
export function CalcNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-xs text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
      {children}
    </p>
  );
}
