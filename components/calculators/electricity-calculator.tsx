// ─────────────────────────────────────────────────────────────────────────
// Monthly Electricity Cost Calculator — HP × usage hours × days × editable
// TNB rate → estimated monthly cost and kWh consumption.
// ─────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { FaWhatsapp, FaBolt, FaPlugCircleBolt } from "react-icons/fa6";
import { waLink } from "@/lib/whatsapp";
import { trackToolUse } from "@/lib/analytics";
import {
  calculateElectricityCost,
  DEFAULT_ELECTRICITY_RATE,
  formatRM,
  HP_WATTAGE,
  type HpSize,
} from "@/lib/aircond-math";
import { CalcCard, CalcLabel, CalcNote, CalculateButton, NumberField, PillGroup, ResultStat, SelectField } from "./ui";

const HP_OPTIONS: { value: HpSize; label: string }[] = [
  { value: "1.0", label: "1.0 HP" },
  { value: "1.5", label: "1.5 HP" },
  { value: "2.0", label: "2.0 HP" },
  { value: "2.5", label: "2.5 HP" },
  { value: "3.0", label: "3.0 HP" },
  { value: "3.5", label: "3.5 HP" },
  { value: "4.0", label: "4.0 HP" },
  { value: "5.0", label: "5.0 HP" },
];

export function ElectricityCalculator() {
  const [hp, setHp] = useState<HpSize>("1.5");
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(30);
  const [rate, setRate] = useState(DEFAULT_ELECTRICITY_RATE);
  const [showResult, setShowResult] = useState(false);

  const monthlyCost = calculateElectricityCost(hp, hours, days, rate);
  const kwh = (HP_WATTAGE[hp] * Math.max(0, hours) * Math.max(0, days)) / 1000;

  const handleCalculate = () => {
    setShowResult(true);
    trackToolUse("electricity-calculator", { hp, hours, days, rate, monthly_cost: Math.round(monthlyCost) });
  };

  const waMsg = [
    "Hi KL Renovator 👋",
    "",
    "I used your Electricity Cost Calculator:",
    "",
    `💨 HP: ${hp} HP`,
    `⏱️ Usage: ${hours} hrs/day, ${days} days/month`,
    `⚡ Rate: RM ${rate.toFixed(3)}/kWh`,
    "",
    `💰 Estimated monthly cost: ${formatRM(monthlyCost)} (${Math.round(kwh).toLocaleString()} kWh)`,
    "",
    "My aircond bill seems high — can you advise? 📍 Location:",
    "",
    "Thank you!",
  ].join("\n");

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaPlugCircleBolt className="h-4 w-4" /> Free Instant Estimate
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Monthly Electricity Cost Calculator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Estimate how much your aircond adds to your TNB bill — by HP, usage hours and your actual electricity rate.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <CalcLabel icon={<FaBolt className="h-4 w-4 text-amber-500" />}>Aircond Size</CalcLabel>
          <PillGroup label="Horsepower (HP)" value={hp} onChange={(v) => { setHp(v); setShowResult(false); }} options={HP_OPTIONS} color="amber" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberField label="Daily Usage" value={hours} onChange={(v) => { setHours(Math.max(0, Math.min(24, v))); setShowResult(false); }} min={0} max={24} suffix="hrs/day" />
          <NumberField label="Days Per Month" value={days} onChange={(v) => { setDays(Math.max(1, Math.min(31, Math.round(v)))); setShowResult(false); }} min={1} max={31} suffix="days" />
          <NumberField label="Electricity Rate" value={rate} onChange={(v) => { setRate(Math.max(0, Math.min(2, v))); setShowResult(false); }} min={0} max={2} step={0.001} suffix="RM/kWh" hint="TNB domestic average ≈ RM 0.509/kWh — edit to match your bill" />
        </div>

        <CalculateButton onClick={handleCalculate}>Calculate My Monthly Cost</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">Your Monthly Estimate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResultStat label="Monthly Cost" value={formatRM(monthlyCost)} sub={`RM ${rate.toFixed(3)}/kWh`} />
              <ResultStat label="Energy Used" value={`${Math.round(kwh).toLocaleString()} kWh`} sub="per month" />
              <ResultStat label="Power Draw" value={`${(HP_WATTAGE[hp] / 1000).toFixed(1)} kW`} sub={`${hp} HP non-inverter`} />
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 mb-5 text-sm font-medium text-slate-200">
              💡 Tip: a dirty coil makes your aircond run longer and use more electricity. A pressure chemical wash (from RM 120) restores efficiency —
              and upgrading to an inverter model typically cuts cooling electricity by ~35%.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg text-center"
              >
                <FaWhatsapp className="h-4 w-4" /> Ask About My Bill
              </a>
              <a
                href="/aircond-savings-calculator"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all text-center"
              >
                💰 Compare Inverter Savings →
              </a>
            </div>
          </div>
        )}
      </div>

      <CalcNote>
        Estimate uses typical rated power draw per HP (e.g. 1.0 HP ≈ 0.9 kW, 1.5 HP ≈ 1.2 kW, 2.0 HP ≈ 1.7 kW). Actual consumption depends on your
        model, age, thermostat setting, room size and maintenance condition. For the most accurate figure, check the wattage on your unit&apos;s
        nameplate or your TNB bill. A 1.0–1.5 HP unit running 8 hours/day typically adds RM 100–180/month.
      </CalcNote>
    </CalcCard>
  );
}
