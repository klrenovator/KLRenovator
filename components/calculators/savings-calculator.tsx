// ─────────────────────────────────────────────────────────────────────────
// Inverter Savings Calculator — old non-inverter vs new inverter aircond:
// monthly savings, yearly savings, payback period. Visual results.
// ─────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { FaWhatsapp, FaPiggyBank, FaArrowTrendUp, FaClockRotateLeft } from "react-icons/fa6";
import { waLink } from "@/lib/whatsapp";
import { trackToolUse } from "@/lib/analytics";
import {
  calculateInverterSavings,
  defaultInverterPremium,
  formatRM,
  type HpSize,
} from "@/lib/aircond-math";
import { CalcCard, CalcLabel, CalcNote, CalculateButton, NumberField, PillGroup, ResultStat, SelectField } from "./ui";

const HP_OPTIONS: { value: HpSize; label: string }[] = [
  { value: "1.0", label: "1.0 HP" },
  { value: "1.5", label: "1.5 HP" },
  { value: "2.0", label: "2.0 HP" },
  { value: "2.5", label: "2.5 HP" },
  { value: "3.0", label: "3.0 HP" },
];

export function SavingsCalculator() {
  const [hp, setHp] = useState<HpSize>("1.5");
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(30);
  const [rate, setRate] = useState(0.509);
  const [premium, setPremium] = useState(defaultInverterPremium("1.5"));
  const [showResult, setShowResult] = useState(false);

  const result = calculateInverterSavings(hp, hours, days, rate, premium);

  const handleCalculate = () => {
    setShowResult(true);
    trackToolUse("savings-calculator", {
      hp,
      hours,
      days,
      premium,
      monthly_savings: Math.round(result.monthlySavingsRm),
      payback_months: Math.round(result.paybackMonths),
    });
  };

  const waMsg = [
    "Hi KL Renovator 👋",
    "",
    "I used your Inverter Savings Calculator:",
    "",
    `💨 HP: ${hp} HP`,
    `⏱️ Usage: ${hours} hrs/day, ${days} days/month`,
    `⚡ Rate: RM ${rate.toFixed(3)}/kWh`,
    "",
    `💰 Monthly savings: ${formatRM(result.monthlySavingsRm)}`,
    `📅 Yearly savings: ${formatRM(result.yearlySavingsRm)}`,
    `⏳ Payback: ${result.paybackYears} years`,
    "",
    "I'd like to discuss upgrading to an inverter aircond. 📍 Location:",
    "",
    "Thank you!",
  ].join("\n");

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaPiggyBank className="h-4 w-4" /> Free Instant Estimate
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Inverter vs Non-Inverter Savings Calculator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Compare your old non-inverter aircond with a new inverter unit — monthly savings, yearly savings and payback period.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <CalcLabel icon={<FaArrowTrendUp className="h-4 w-4 text-emerald-600" />}>Your Aircond</CalcLabel>
          <PillGroup label="Horsepower (HP)" value={hp} onChange={(v) => { setHp(v); setPremium(defaultInverterPremium(v)); setShowResult(false); }} options={HP_OPTIONS} color="emerald" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberField label="Daily Usage" value={hours} onChange={(v) => { setHours(Math.max(0, Math.min(24, v))); setShowResult(false); }} min={0} max={24} suffix="hrs/day" />
          <NumberField label="Days Per Month" value={days} onChange={(v) => { setDays(Math.max(1, Math.min(31, Math.round(v)))); setShowResult(false); }} min={1} max={31} suffix="days" />
          <NumberField label="Electricity Rate" value={rate} onChange={(v) => { setRate(Math.max(0, Math.min(2, v))); setShowResult(false); }} min={0} max={2} step={0.001} suffix="RM/kWh" hint="TNB domestic average ≈ RM 0.509/kWh" />
        </div>

        <NumberField
          label="Inverter Price Difference (premium vs non-inverter)"
          value={premium}
          onChange={(v) => { setPremium(Math.max(0, Math.min(20000, v))); setShowResult(false); }}
          min={0}
          max={20000}
          suffix="RM"
          hint="Typical market premium for the same HP. KL Renovator installs the unit you buy — this is not our pricing."
        />

        <CalculateButton onClick={handleCalculate} color="emerald">Calculate My Savings</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">Your Savings with Inverter</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResultStat label="Monthly Savings" value={formatRM(result.monthlySavingsRm)} sub={`${result.savingsPct}% less electricity`} />
              <ResultStat label="Yearly Savings" value={formatRM(result.yearlySavingsRm)} sub="RM 12 × monthly" />
              <ResultStat label="Payback Period" value={Number.isFinite(result.paybackMonths) ? `${result.paybackYears} years` : "—"} sub={`${formatRM(premium)} premium`} />
            </div>

            {/* Visual comparison bars */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 mb-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-emerald-100 mb-4">Electricity Used Per Month</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-50">Old Non-Inverter</span>
                    <span className="text-white">{Math.round(result.oldMonthlyKwh).toLocaleString()} kWh</span>
                  </div>
                  <div className="h-3.5 rounded-full bg-white/25 overflow-hidden">
                    <div className="h-full rounded-full bg-white/80" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-50">New Inverter</span>
                    <span className="text-emerald-200">{Math.round(result.newMonthlyKwh).toLocaleString()} kWh</span>
                  </div>
                  <div className="h-3.5 rounded-full bg-white/25 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-300" style={{ width: `${100 * (1 - result.savingsPct / 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 mb-5 text-sm font-medium">
              <FaClockRotateLeft className="inline h-4 w-4 mr-2" />
              {Number.isFinite(result.paybackMonths) ? (
                <>The {formatRM(premium)} price difference pays for itself in about <strong>{result.paybackYears} years</strong> — after that, the inverter unit saves you <strong>{formatRM(result.yearlySavingsRm)} every year</strong>.</>
              ) : (
                <>Enter your usage and premium to see the payback period.</>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg text-center"
              >
                <FaWhatsapp className="h-4 w-4" /> Discuss Upgrade
              </a>
              <a
                href="/aircond-installation-cost-calculator"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all text-center"
              >
                🔧 Installation Cost →
              </a>
            </div>
          </div>
        )}
      </div>

      <CalcNote>
        Inverter airconds typically use ~35% less electricity than non-inverter units in Malaysian conditions (industry estimate; actual savings
        depend on runtime pattern, room heat load and usage temperature). The price premium is the typical market difference for the same HP —
        editable so you can use the exact quote you received. This calculator estimates electricity only; it does not include servicing or repair costs.
      </CalcNote>
    </CalcCard>
  );
}
