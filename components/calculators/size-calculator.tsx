// ─────────────────────────────────────────────────────────────────────────
// Aircond Size Calculator — room size + room type + usage + heat exposure
// → recommended HP, BTU and suitable aircond capacity.
// ─────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { FaWhatsapp, FaRulerCombined, FaHome, FaSun, FaFire } from "react-icons/fa";
import { waLink } from "@/lib/whatsapp";
import { trackToolUse } from "@/lib/analytics";
import { estimateSizeFromArea, formatRM, type HpSize } from "@/lib/aircond-math";
import { CalcCard, CalcLabel, CalcNote, CalculateButton, NumberField, PillGroup, ResultStat, SelectField } from "./ui";

const ROOM_TYPES: { value: string; label: string }[] = [
  { value: "bedroom", label: "Bedroom" },
  { value: "master-bedroom", label: "Master Bedroom" },
  { value: "living-room", label: "Living Room" },
  { value: "office", label: "Home Office" },
  { value: "kitchen", label: "Kitchen" },
  { value: "shop", label: "Shop / Retail" },
];

const USAGE_OPTIONS: { value: "standard" | "heavy" | "light"; label: string; sub: string }[] = [
  { value: "light", label: "Light", sub: "A few hours a day" },
  { value: "standard", label: "Standard", sub: "6–10 hours a day" },
  { value: "heavy", label: "Heavy", sub: "12+ hours / hot room" },
];

const HEAT_OPTIONS: { value: "low" | "medium" | "high"; label: string; sub: string }[] = [
  { value: "low", label: "Low", sub: "Shaded / north-facing" },
  { value: "medium", label: "Medium", sub: "Partial sun" },
  { value: "high", label: "High", sub: "West-facing / top floor" },
];

export function SizeCalculator() {
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(10);
  const [roomType, setRoomType] = useState("bedroom");
  const [usage, setUsage] = useState<"standard" | "heavy" | "light">("standard");
  const [heat, setHeat] = useState<"low" | "medium" | "high">("medium");
  const [showResult, setShowResult] = useState(false);

  const areaSqft = Math.max(0, length) * Math.max(0, width);
  const result = estimateSizeFromArea({ areaSqft, roomType, usage, heatExposure: heat });

  const handleCalculate = () => {
    setShowResult(true);
    trackToolUse("size-calculator", {
      area: Math.round(areaSqft),
      room_type: roomType,
      usage,
      heat,
      hp: result.recommendation.hp,
      btu: result.btu,
    });
  };

  const roomLabel = ROOM_TYPES.find((r) => r.value === roomType)?.label ?? roomType;

  const waMsg = [
    "Hi KL Renovator 👋",
    "",
    "I used your Aircond Size Calculator:",
    "",
    `📏 Room: ${length}ft × ${width}ft (${Math.round(areaSqft)} sqft)`,
    `🏠 Type: ${roomLabel}`,
    `⏱️ Usage: ${usage}`,
    `☀️ Heat exposure: ${heat}`,
    "",
    `✅ Recommended: ${result.recommendation.label} (${result.btu.toLocaleString()} BTU)`,
    `🔧 Installation from ${formatRM(result.recommendation.installFrom)}`,
    "",
    "I'd like to book an installation. 📍 Location:",
    "",
    "Thank you!",
  ].join("\n");

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaHome className="h-4 w-4" /> Free Instant Estimate
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Aircond Size Calculator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Room size + type + usage + heat exposure → the right HP, BTU and aircond capacity for your space.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <CalcLabel icon={<FaRulerCombined className="h-4 w-4 text-sky-600" />}>Room Size</CalcLabel>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Length" value={length} onChange={(v) => { setLength(Math.max(3, Math.min(100, v))); setShowResult(false); }} min={3} max={100} suffix="ft" />
            <NumberField label="Width" value={width} onChange={(v) => { setWidth(Math.max(3, Math.min(100, v))); setShowResult(false); }} min={3} max={100} suffix="ft" />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {length} × {width} = <strong>{Math.round(areaSqft)} sqft</strong>
          </p>
        </div>

        <SelectField label="Room Type" value={roomType} onChange={(v) => { setRoomType(v); setShowResult(false); }} options={ROOM_TYPES} />

        <div>
          <CalcLabel icon={<FaFire className="h-4 w-4 text-orange-500" />}>Usage</CalcLabel>
          <PillGroup label="How much is the room used?" value={usage} onChange={(v) => { setUsage(v); setShowResult(false); }} options={USAGE_OPTIONS} color="sky" />
        </div>

        <div>
          <CalcLabel icon={<FaSun className="h-4 w-4 text-amber-500" />}>Heat Exposure</CalcLabel>
          <PillGroup label="Sun exposure" value={heat} onChange={(v) => { setHeat(v); setShowResult(false); }} options={HEAT_OPTIONS} color="amber" />
        </div>

        <CalculateButton onClick={handleCalculate}>Find My Aircond Size</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">Your Recommended Aircond Size</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResultStat label="Recommended HP" value={result.recommendation.hp} sub="Horsepower" />
              <ResultStat label="Recommended BTU" value={result.btu.toLocaleString()} sub="British Thermal Units" />
              <ResultStat label="Suitable Capacity" value={result.capacityLabel} sub="standard Malaysian sizing" />
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 mb-5 text-sm font-medium">
              📐 A {Math.round(areaSqft)} sqft {roomLabel.toLowerCase()} with {usage} usage and {heat} heat exposure needs about{" "}
              <strong>{result.btu.toLocaleString()} BTU</strong> — a <strong>{result.recommendation.hp} HP</strong> aircond is the right size. Sizing
              correctly saves electricity and cools faster.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg text-center"
              >
                <FaWhatsapp className="h-4 w-4" /> Get Installation Quote
              </a>
              <a
                href="/btu-calculator"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all text-center"
              >
                📐 Try the Detailed BTU Calculator →
              </a>
            </div>
          </div>
        )}
      </div>

      <CalcNote>
        Based on the standard Malaysian rule of thumb: ~25 BTU per square foot, adjusted for room type (kitchen/shop need more), usage intensity and
        heat exposure (west-facing and top-floor rooms need up to 25% more). Oversized units short-cycle and waste electricity; undersized units
        never cool properly. Our technician confirms the final size during the site survey.
      </CalcNote>
    </CalcCard>
  );
}
