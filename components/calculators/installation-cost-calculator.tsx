// ─────────────────────────────────────────────────────────────────────────
// Aircond Installation Cost Calculator — estimates material cost, labour
// cost, bundle discount and grand total using the published site pricing
// via lib/aircond-math.ts (single source of truth).
// ─────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { FaWhatsapp, FaWrench, FaRulerCombined, FaShieldAlt, FaPlug, FaWater, FaBoxOpen } from "react-icons/fa";
import { waLink } from "@/lib/whatsapp";
import { trackToolUse } from "@/lib/analytics";
import {
  calculateInstallationEstimate,
  formatRM,
  FREE_RUN_FEET,
  DRAIN_PIPE_RATE,
  type HpSize,
  type UnitType,
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

const UNIT_TYPE_OPTIONS: { value: UnitType; label: string; sub: string }[] = [
  { value: "wall", label: "Wall-Mounted", sub: "Most homes & offices" },
  { value: "cassette", label: "Ceiling Cassette", sub: "Shoplots & offices" },
  { value: "window", label: "Window Unit", sub: "Older homes" },
];

export function InstallationCostCalculator() {
  const [units, setUnits] = useState(1);
  const [hp, setHp] = useState<HpSize>("1.5");
  const [unitType, setUnitType] = useState<UnitType>("wall");
  const [copperFeet, setCopperFeet] = useState(7);
  const [wireFeet, setWireFeet] = useState(7);
  const [drainFeet, setDrainFeet] = useState(7);
  const [pvcFeet, setPvcFeet] = useState(0);
  const [needsOutdoorBracket, setNeedsOutdoorBracket] = useState(true);
  const [heavyDuty, setHeavyDuty] = useState(false);
  const [needsSwitch, setNeedsSwitch] = useState(false);
  const [needsWaterPump, setNeedsWaterPump] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const result = calculateInstallationEstimate({
    units,
    hp,
    unitType,
    extraCopperFeet: Math.max(0, copperFeet - FREE_RUN_FEET),
    extraWireFeet: Math.max(0, wireFeet - FREE_RUN_FEET),
    extraDrainFeet: Math.max(0, drainFeet - FREE_RUN_FEET),
    pvcFeet,
    needsOutdoorBracket,
    heavyDutyBracket: heavyDuty,
    needsIndoorBracket: false,
    needsSwitch,
    needsWaterPump,
  });

  const handleCalculate = () => {
    setShowResult(true);
    trackToolUse("installation-cost-calculator", {
      units,
      hp,
      unit_type: unitType,
      grand_total: result.grandTotal,
    });
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("u", String(units));
      params.set("hp", hp);
      params.set("t", unitType);
      params.set("c", "1");
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    }
  };

  const waMsg = [
    "Hi KL Renovator 👋",
    "",
    "I used your Aircond Installation Cost Calculator and would like a confirmed quotation:",
    "",
    `🔢 Units: ${units}`,
    `💨 HP: ${hp} HP`,
    `🏠 Type: ${unitType === "wall" ? "Wall-Mounted" : unitType === "cassette" ? "Ceiling Cassette" : "Window Unit"}`,
    `📏 Copper pipe: ${copperFeet} ft | Wire: ${wireFeet} ft | Drain: ${drainFeet} ft`,
    pvcFeet > 0 ? `📦 PVC casing: ${pvcFeet} ft` : "",
    needsOutdoorBracket ? `🔩 Outdoor bracket: ${heavyDuty ? "Heavy duty" : "Standard"}` : "",
    needsSwitch ? "🔌 Aircond switch: Yes" : "",
    needsWaterPump ? "💧 Water pump: Yes" : "",
    "",
    `💰 Estimated Grand Total: ${formatRM(result.grandTotal)}`,
    result.discountAmount > 0 ? `🎉 ${result.discount.label} applied (−${formatRM(result.discountAmount)})` : "",
    "",
    "📍 My Location:",
    "",
    "Please confirm availability and exact pricing. Thank you!",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaWrench className="h-4 w-4" /> Free Instant Estimate
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Aircond Installation Cost Calculator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Labour + materials + bundle discount. Every published price is used as-is; anything unconfirmed is clearly marked as an estimate.
        </p>
      </div>

      <div className="space-y-6">
        {/* Units + type + HP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <NumberField label="Number of Units" value={units} onChange={(v) => { setUnits(Math.max(1, Math.min(30, Math.round(v)))); setShowResult(false); }} min={1} max={30} hint="Multi-unit jobs get bundle discounts (4–10 units: 5%, 10+: 10%)" />
          <SelectField label="Aircond Type" value={unitType} onChange={(v) => { setUnitType(v as UnitType); setShowResult(false); }} options={UNIT_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))} />
        </div>
        <PillGroup label="Horsepower (HP)" value={hp} onChange={(v) => { setHp(v); setShowResult(false); }} options={HP_OPTIONS} />

        {/* Run lengths */}
        <div>
          <CalcLabel icon={<FaRulerCombined className="h-4 w-4 text-sky-600" />}>Pipe &amp; Wire Run Lengths (per unit)</CalcLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <NumberField label="Copper Pipe Length" value={copperFeet} onChange={(v) => { setCopperFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint={`First ${FREE_RUN_FEET} ft free`} />
            <NumberField label="Electrical Wire Length" value={wireFeet} onChange={(v) => { setWireFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint={`First ${FREE_RUN_FEET} ft free`} />
            <NumberField label="Drain Pipe Length" value={drainFeet} onChange={(v) => { setDrainFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint={`First ${FREE_RUN_FEET} ft free`} />
          </div>
        </div>

        {/* Optional add-ons */}
        <div>
          <CalcLabel icon={<FaBoxOpen className="h-4 w-4 text-sky-600" />}>Optional Add-ons</CalcLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField label="PVC Casing (optional)" value={pvcFeet} onChange={(v) => { setPvcFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint="RM 6–12/ft (published rate)" />
            <div className="flex items-end">
              <label className="flex items-center gap-3 w-full px-4 py-3 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-sky-400 transition-colors">
                <input type="checkbox" checked={needsOutdoorBracket} onChange={(e) => { setNeedsOutdoorBracket(e.target.checked); setShowResult(false); }} className="h-4 w-4 accent-sky-600" />
                <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><FaShieldAlt className="text-sky-600" /> Outdoor Bracket</span>
              </label>
            </div>
            {needsOutdoorBracket && (
              <PillGroup label="Bracket Type" value={heavyDuty ? "heavy" : "standard"} onChange={(v) => { setHeavyDuty(v === "heavy"); setShowResult(false); }} options={[{ value: "standard", label: "Standard" }, { value: "heavy", label: "Heavy Duty" }]} color="emerald" />
            )}
            <div className="flex items-end">
              <label className="flex items-center gap-3 w-full px-4 py-3 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-sky-400 transition-colors">
                <input type="checkbox" checked={needsSwitch} onChange={(e) => { setNeedsSwitch(e.target.checked); setShowResult(false); }} className="h-4 w-4 accent-sky-600" />
                <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><FaPlug className="text-sky-600" /> Aircond Switch / Plug Point</span>
              </label>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 w-full px-4 py-3 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-sky-400 transition-colors">
                <input type="checkbox" checked={needsWaterPump} onChange={(e) => { setNeedsWaterPump(e.target.checked); setShowResult(false); }} className="h-4 w-4 accent-sky-600" />
                <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><FaWater className="text-sky-600" /> Water Pump <span className="text-[10px] text-slate-400 font-semibold">(concealed / low-ceiling installs)</span></span>
              </label>
            </div>
          </div>
        </div>

        <CalculateButton onClick={handleCalculate}>Calculate My Installation Cost</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-sky-600 to-sky-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">Your Installation Estimate</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <ResultStat label="Labour Cost" value={formatRM(result.labourTotal)} sub={`${formatRM(result.labourPerUnit)} / unit`} />
              <ResultStat label="Material Cost" value={formatRM(result.materialsTotal)} sub="pipe, wire, add-ons" />
              <ResultStat label="Bundle Discount" value={result.discountAmount > 0 ? `−${formatRM(result.discountAmount)}` : "—"} sub={result.discountAmount > 0 ? `${result.discount.pct}% OFF` : "Add 4+ units"} />
              <ResultStat label="Grand Total" value={formatRM(result.grandTotal)} sub={units > 1 ? `${formatRM(result.perUnitTotal)} / unit` : "for 1 unit"} />
            </div>

            {/* Line-item breakdown */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-sky-100 mb-3">Breakdown</p>
              <ul className="space-y-2">
                {result.lineItems.map((item, i) => (
                  <li key={i} className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-sky-50 font-medium">
                      {item.label}
                      <span className="block text-[11px] text-sky-200/90">{item.detail}</span>
                      {item.note && <span className="block text-[10px] text-sky-200/70 italic">{item.note}</span>}
                    </span>
                    <span className="font-black whitespace-nowrap">{formatRM(item.amount)}</span>
                  </li>
                ))}
                {result.discountAmount > 0 && (
                  <li className="flex items-center justify-between gap-3 text-sm border-t border-white/20 pt-2">
                    <span className="text-emerald-200 font-bold">{result.discount.label}</span>
                    <span className="font-black text-emerald-300 whitespace-nowrap">−{formatRM(result.discountAmount)}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg text-center"
              >
                <FaWhatsapp className="h-4 w-4" /> Get Confirmed Quote
              </a>
              <button
                type="button"
                onClick={() => { setShowResult(false); trackToolUse("installation-cost-calculator", { action: "reset" }); }}
                className="bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all cursor-pointer"
              >
                ↺ Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      <CalcNote>
        Standard installation includes {FREE_RUN_FEET} ft of copper pipe, wire and drain pipe free (published terms). Copper pipe is charged at RM 17–27/ft,
        wire at RM 9–17/ft, PVC casing RM 6–12/ft, brackets RM 35–70, switch/plug point RM 100. Drain pipe beyond {FREE_RUN_FEET} ft is estimated at
        RM {DRAIN_PIPE_RATE}/ft and the water pump at the published RM 350–550 repair range — both confirmed by the technician after on-site inspection.
        Multi-unit bundle discounts: 4–10 units 5% OFF, 10+ units 10% OFF.
      </CalcNote>
    </CalcCard>
  );
}
