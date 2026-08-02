// ─────────────────────────────────────────────────────────────────────────
// Gas Top-up Cost Estimator — HP + gas type + estimated gas condition +
// units → estimated cost range, always with the on-site inspection note.
// ─────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { FaWhatsapp, FaGaugeHigh, FaGasPump } from "react-icons/fa6";
import { waLink } from "@/lib/whatsapp";
import { trackToolUse } from "@/lib/analytics";
import {
  calculateGasEstimate,
  formatRM,
  GAS_LABELS,
  type GasType,
  type HpSize,
} from "@/lib/aircond-math";
import { CalcCard, CalcLabel, CalcNote, CalculateButton, PillGroup, ResultStat, SelectField } from "./ui";

const HP_OPTIONS: { value: HpSize; label: string }[] = [
  { value: "1.0", label: "1.0 HP" },
  { value: "1.5", label: "1.5 HP" },
  { value: "2.0", label: "2.0 HP" },
  { value: "2.5", label: "2.5 HP" },
  { value: "3.0", label: "3.0 HP" },
];

const GAS_OPTIONS: { value: GasType; label: string }[] = [
  { value: "r22", label: "R22 — RM 2.50/PSI (older units)" },
  { value: "r410a", label: "R410A — RM 3.00/PSI (standard)" },
  { value: "r32", label: "R32 — RM 3.00/PSI (newer inverter)" },
];

const CONDITION_OPTIONS: { value: "low" | "medium" | "high"; label: string; sub: string }[] = [
  { value: "low", label: "Slightly Low", sub: "Cooling is a bit weak" },
  { value: "medium", label: "Moderately Low", sub: "Warm air, longer cycles" },
  { value: "high", label: "Very Low", sub: "Barely any cooling" },
];

export function GasTopupCalculator() {
  const [hp, setHp] = useState<HpSize>("1.5");
  const [gasType, setGasType] = useState<GasType>("r32");
  const [condition, setCondition] = useState<"low" | "medium" | "high">("medium");
  const [units, setUnits] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const result = calculateGasEstimate({ hp, gasType, condition, units });

  const handleCalculate = () => {
    setShowResult(true);
    trackToolUse("gas-topup-calculator", { hp, gas_type: gasType, condition, units });
  };

  const waMsg = [
    "Hi KL Renovator 👋",
    "",
    "I used your Gas Top-up Cost Estimator:",
    "",
    `💨 HP: ${hp} HP`,
    `⛽ Gas Type: ${GAS_LABELS[gasType]}`,
    `📊 Estimated Condition: ${condition === "low" ? "Slightly low" : condition === "medium" ? "Moderately low" : "Very low"}`,
    `🔢 Units: ${units}`,
    "",
    `💰 Estimated cost: ${formatRM(result.totalMin)} – ${formatRM(result.totalMax)}`,
    "",
    "Please confirm the exact PSI and final charge. 📍 My location:",
    "",
    "Thank you!",
  ].join("\n");

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaGasPump className="h-4 w-4" /> Free Instant Estimate
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Gas Top-up Cost Estimator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Estimate R22, R410A &amp; R32 gas top-up cost by HP and gas condition. Charged per actual PSI after inspection.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <SelectField label="Horsepower (HP)" value={hp} onChange={(v) => { setHp(v as HpSize); setShowResult(false); }} options={HP_OPTIONS} />
          <SelectField label="Gas Type" value={gasType} onChange={(v) => { setGasType(v as GasType); setShowResult(false); }} options={GAS_OPTIONS} />
        </div>

        <div>
          <CalcLabel icon={<FaGaugeHigh className="h-4 w-4 text-amber-500" />}>Estimated Gas Condition</CalcLabel>
          <PillGroup label="How low is the refrigerant?" value={condition} onChange={(v) => { setCondition(v); setShowResult(false); }} options={CONDITION_OPTIONS} color="amber" />
        </div>

        <NumberFieldUnits value={units} onChange={(v) => { setUnits(Math.max(1, Math.min(30, Math.round(v)))); setShowResult(false); }} />

        <CalculateButton onClick={handleCalculate}>Estimate My Gas Top-up Cost</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">Estimated Gas Top-up Cost</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <ResultStat label="Gas Type" value={result.gasLabel.split(" (")[0]} sub={`${formatRM(result.perPsi)} / PSI`} />
              <ResultStat label="Est. PSI Needed" value={`${result.psiMin}–${result.psiMax}`} sub="per unit" />
              <ResultStat label="Per Unit" value={`${formatRM(Math.round((result.totalMin / units)))}–${formatRM(Math.round(result.totalMax / units))}`} sub={`${units} unit${units > 1 ? "s" : ""}`} />
              <ResultStat label="Estimated Total" value={`${formatRM(result.totalMin)}–${formatRM(result.totalMax)}`} sub="all units" />
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 mb-5 text-sm font-semibold">
              ⚠️ Final gas quantity and charges will be confirmed by the technician after on-site inspection.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg text-center"
              >
                <FaWhatsapp className="h-4 w-4" /> Book Gas Top-up
              </a>
              <button
                type="button"
                onClick={() => setShowResult(false)}
                className="bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all cursor-pointer"
              >
                ↺ Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      <CalcNote>
        Published rates: R22 at RM 2.50/PSI, R410A and R32 at RM 3.00/PSI. The estimate assumes a typical PSI shortfall for your HP size; the exact
        PSI is measured with a manifold gauge during inspection. A leak check is included with every gas top-up — refrigerant never “runs out” on
        its own, so if it is low, it leaked.
      </CalcNote>
    </CalcCard>
  );
}

function NumberFieldUnits({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-2">Number of Units</label>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={1}
        max={30}
        aria-label="Number of Units"
        className="w-full max-w-xs px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-base font-bold text-slate-900"
      />
    </div>
  );
}
