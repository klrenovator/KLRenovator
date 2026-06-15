"use client";

import { useState, useMemo } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { waLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

// ── Types ─────────────────────────────────────────────────────────────────────
type ServiceType = "basic-servicing" | "chemical-wash" | "chemical-overhaul" | "gas-topup" | "installation" | "repair";
type UnitType = "wall" | "cassette" | "window";
type GasType = "r22" | "r410a" | "r32";

// ── Pricing matrix (synced with site.ts / services-data.ts) ──────────────────
const PRICING: Record<ServiceType, Record<UnitType, Record<string, number>>> = {
  "basic-servicing": {
    wall: { "1.0-1.5": 99, "2.0-2.5": 120, "3.0-3.5": 150 },
    cassette: { "1.0-1.5": 150, "2.0-3.0": 200, "3.5-5.0": 250 },
    window: { "1.0-1.5": 99, "2.0-2.5": 120, "3.0-3.5": 150 },
  },
  "chemical-wash": {
    wall: { "1.0-1.5": 120, "2.0-2.5": 150, "3.0": 180, "4.0-5.0": 200 },
    cassette: { "1.0-1.5": 220, "2.0-3.0": 280, "4.0-5.0": 350 },
    window: { "1.0-2.0": 130, "2.5-3.0": 160 },
  },
  "chemical-overhaul": {
    wall: { "1.0-1.5": 220, "2.0-2.5": 280, "3.0-3.5": 350 },
    cassette: { "1.0-3.0": 430, "3.5-5.0": 500 },
    window: { "1.0-1.5": 220, "2.0-2.5": 280, "3.0-3.5": 350 },
  },
  "gas-topup": {
    wall: { r22: 0, r410a: 0, r32: 0 }, // handled separately
    cassette: { r22: 0, r410a: 0, r32: 0 },
    window: { r22: 0, r410a: 0, r32: 0 },
  },
  "installation": {
    wall: { "1.0-1.5": 199, "2.0": 249, "2.5": 279, "3.0": 329, "4.0": 399, "5.0": 449 },
    cassette: { "1.0-1.5": 290, "2.0-3.0": 350, "3.5-6.0": 400 },
    window: { "1.0-1.5": 199, "2.0-2.5": 249 },
  },
  "repair": {
    wall: { diagnostic: 88 },
    cassette: { diagnostic: 88 },
    window: { diagnostic: 88 },
  },
};

const GAS_PRICING: Record<GasType, Record<string, number>> = {
  r22: { "1.0": 120, "1.5-2.0": 150, "2.5-3.0": 180 },
  r410a: { "1.0": 150, "1.5-2.0": 180, "2.5-3.0": 200 },
  r32: { "1.0": 180, "1.5-2.0": 200, "2.5-3.0": 220 },
};

// ── HP size options by service + unit type ────────────────────────────────────
const HP_OPTIONS: Record<ServiceType, Record<UnitType, { value: string; label: string; price: number }[]>> = {
  "basic-servicing": {
    wall: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 99 },
      { value: "2.0-2.5", label: "2.0 – 2.5 HP", price: 120 },
      { value: "3.0-3.5", label: "3.0 – 3.5 HP", price: 150 },
    ],
    cassette: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 150 },
      { value: "2.0-3.0", label: "2.0 – 3.0 HP", price: 200 },
      { value: "3.5-5.0", label: "3.5 – 5.0 HP", price: 250 },
    ],
    window: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 99 },
      { value: "2.0-2.5", label: "2.0 – 2.5 HP", price: 120 },
    ],
  },
  "chemical-wash": {
    wall: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 120 },
      { value: "2.0-2.5", label: "2.0 – 2.5 HP", price: 150 },
      { value: "3.0", label: "3.0 HP", price: 180 },
      { value: "4.0-5.0", label: "4.0 – 5.0 HP", price: 200 },
    ],
    cassette: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 220 },
      { value: "2.0-3.0", label: "2.0 – 3.0 HP", price: 280 },
      { value: "4.0-5.0", label: "4.0 – 5.0 HP", price: 350 },
    ],
    window: [
      { value: "1.0-2.0", label: "1.0 – 2.0 HP", price: 130 },
      { value: "2.5-3.0", label: "2.5 – 3.0 HP", price: 160 },
    ],
  },
  "chemical-overhaul": {
    wall: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 220 },
      { value: "2.0-2.5", label: "2.0 – 2.5 HP", price: 280 },
      { value: "3.0-3.5", label: "3.0 – 3.5 HP", price: 350 },
    ],
    cassette: [
      { value: "1.0-3.0", label: "1.0 – 3.0 HP", price: 430 },
      { value: "3.5-5.0", label: "3.5 – 5.0 HP", price: 500 },
    ],
    window: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 220 },
      { value: "2.0-2.5", label: "2.0 – 2.5 HP", price: 280 },
    ],
  },
  "gas-topup": {
    wall: [
      { value: "1.0", label: "1.0 HP", price: 0 },
      { value: "1.5-2.0", label: "1.5 – 2.0 HP", price: 0 },
      { value: "2.5-3.0", label: "2.5 – 3.0 HP", price: 0 },
    ],
    cassette: [
      { value: "1.0", label: "1.0 HP", price: 0 },
      { value: "1.5-2.0", label: "1.5 – 2.0 HP", price: 0 },
      { value: "2.5-3.0", label: "2.5 – 3.0 HP", price: 0 },
    ],
    window: [
      { value: "1.0", label: "1.0 HP", price: 0 },
      { value: "1.5-2.0", label: "1.5 – 2.0 HP", price: 0 },
    ],
  },
  "installation": {
    wall: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 199 },
      { value: "2.0", label: "2.0 HP", price: 249 },
      { value: "2.5", label: "2.5 HP", price: 279 },
      { value: "3.0", label: "3.0 HP", price: 329 },
      { value: "4.0", label: "4.0 HP", price: 399 },
      { value: "5.0", label: "5.0 HP", price: 449 },
    ],
    cassette: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 290 },
      { value: "2.0-3.0", label: "2.0 – 3.0 HP", price: 350 },
      { value: "3.5-6.0", label: "3.5 – 6.0 HP", price: 400 },
    ],
    window: [
      { value: "1.0-1.5", label: "1.0 – 1.5 HP", price: 199 },
      { value: "2.0-2.5", label: "2.0 – 2.5 HP", price: 249 },
    ],
  },
  "repair": {
    wall: [{ value: "diagnostic", label: "Diagnostic + Repair", price: 88 }],
    cassette: [{ value: "diagnostic", label: "Diagnostic + Repair", price: 88 }],
    window: [{ value: "diagnostic", label: "Diagnostic + Repair", price: 88 }],
  },
};

const SERVICE_LABELS: Record<ServiceType, { en: string; ms: string; zh: string }> = {
  "basic-servicing": { en: "Basic Servicing", ms: "Servis Asas", zh: "基本保养" },
  "chemical-wash": { en: "Chemical Wash", ms: "Cuci Kimia", zh: "化学清洗" },
  "chemical-overhaul": { en: "Chemical Overhaul", ms: "Overhaul Kimia", zh: "化学大修" },
  "gas-topup": { en: "Gas Top-Up", ms: "Tambah Gas", zh: "充气" },
  "installation": { en: "New Installation", ms: "Pemasangan Baru", zh: "新机安装" },
  "repair": { en: "Repair / Diagnostic", ms: "Baiki / Diagnostik", zh: "维修/诊断" },
};

const UNIT_LABELS: Record<UnitType, { en: string; ms: string; zh: string }> = {
  wall: { en: "Wall-Mounted", ms: "Unit Dinding", zh: "挂壁式" },
  cassette: { en: "Ceiling Cassette", ms: "Ceiling Cassette", zh: "天花板卡式" },
  window: { en: "Window Unit", ms: "Unit Tingkap", zh: "窗式" },
};

const GAS_LABELS: Record<GasType, string> = {
  r22: "R22 (older units)",
  r410a: "R410A",
  r32: "R32 (newer inverter)",
};

const DISCOUNT: Record<number, { pct: number; label: string }> = {
  1: { pct: 0, label: "" },
  2: { pct: 5, label: "5% off (2–3 units)" },
  3: { pct: 5, label: "5% off (2–3 units)" },
  4: { pct: 10, label: "10% off (4–8 units)" },
  5: { pct: 10, label: "10% off (4–8 units)" },
  6: { pct: 10, label: "10% off (4–8 units)" },
  7: { pct: 10, label: "10% off (4–8 units)" },
  8: { pct: 10, label: "10% off (4–8 units)" },
};
function getDiscount(units: number) {
  if (units >= 8) return { pct: 15, label: "15% off (8+ units)" };
  return DISCOUNT[units] || { pct: 0, label: "" };
}

// ── Component ─────────────────────────────────────────────────────────────────
export function PriceCalculator() {
  const [service, setService] = useState<ServiceType>("chemical-wash");
  const [unitType, setUnitType] = useState<UnitType>("wall");
  const [hpSize, setHpSize] = useState<string>("1.0-1.5");
  const [gasType, setGasType] = useState<GasType>("r32");
  const [units, setUnits] = useState<number>(1);
  const [showResult, setShowResult] = useState(false);

  // Get available HP options for current selection
  const hpOptions = HP_OPTIONS[service]?.[unitType] ?? [];

  // Calculate per-unit price
  const perUnitPrice = useMemo(() => {
    if (service === "gas-topup") {
      return GAS_PRICING[gasType]?.[hpSize] ?? 180;
    }
    const opts = HP_OPTIONS[service]?.[unitType] ?? [];
    const found = opts.find((o) => o.value === hpSize);
    return found?.price ?? 0;
  }, [service, unitType, hpSize, gasType]);

  const subtotal = perUnitPrice * units;
  const discount = getDiscount(units);
  const discountAmt = Math.round(subtotal * discount.pct / 100);
  const total = subtotal - discountAmt;

  // WhatsApp quote message
  const waMsg = [
    "Hi KL Renovator 👋",
    "",
    "I used your Price Calculator and would like to confirm a booking:",
    "",
    `🔧 Service: ${SERVICE_LABELS[service].en}`,
    `📟 Unit Type: ${UNIT_LABELS[unitType].en}`,
    `💨 HP Size: ${hpSize} HP`,
    service === "gas-topup" ? `⛽ Gas Type: ${GAS_LABELS[gasType]}` : "",
    `🔢 Number of Units: ${units}`,
    `💰 Estimated Total: RM ${total.toLocaleString()}${discount.pct > 0 ? ` (${discount.label})` : ""}`,
    "",
    "📍 My Location:",
    "",
    "Please confirm availability and send a technician. Thank you!",
  ].filter(Boolean).join("\n");

  function handleCalculate() {
    // Reset HP if not in new list
    const newOpts = HP_OPTIONS[service]?.[unitType] ?? [];
    if (!newOpts.find((o) => o.value === hpSize) && newOpts.length > 0) {
      setHpSize(newOpts[0].value);
    }
    setShowResult(true);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 py-5 text-white">
        <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Free Instant Estimate</p>
        <h3 className="text-xl font-black leading-tight">
          Aircond Service Price Calculator
        </h3>
        <p className="text-sky-100 text-xs mt-1">
          Kalkulator Harga Servis Aircond &nbsp;|&nbsp; 冷气服务价格计算器
        </p>
      </div>

      <div className="p-6 space-y-5">

        {/* Step 1: Service Type */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2.5">
            1. Select Service &nbsp;<span className="text-slate-400 font-medium normal-case tracking-normal">Pilih Perkhidmatan · 选择服务</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.keys(SERVICE_LABELS) as ServiceType[]).map((s) => (
              <button
                key={s}
                onClick={() => { setService(s); setShowResult(false); }}
                className={`text-left px-3.5 py-3 rounded-xl border text-xs font-bold transition-all ${
                  service === s
                    ? "bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-500/20"
                    : "bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                }`}
              >
                <span className="block">{SERVICE_LABELS[s].en}</span>
                <span className={`block text-[10px] mt-0.5 font-normal ${service === s ? "text-sky-200" : "text-slate-400"}`}>
                  {SERVICE_LABELS[s].zh}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Unit Type */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2.5">
            2. Unit Type &nbsp;<span className="text-slate-400 font-medium normal-case tracking-normal">Jenis Unit · 机型</span>
          </label>
          <div className="flex gap-2">
            {(["wall", "cassette", "window"] as UnitType[]).map((u) => (
              <button
                key={u}
                onClick={() => { setUnitType(u); setShowResult(false); }}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  unitType === u
                    ? "bg-sky-600 border-sky-600 text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                }`}
              >
                {UNIT_LABELS[u].en}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: HP Size */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2.5">
            3. HP Size &nbsp;<span className="text-slate-400 font-medium normal-case tracking-normal">Saiz HP · HP大小</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(HP_OPTIONS[service]?.[unitType] ?? []).map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setHpSize(opt.value); setShowResult(false); }}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                  hpSize === opt.value
                    ? "bg-sky-600 border-sky-600 text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                }`}
              >
                <span className="block">{opt.label}</span>
                {service !== "gas-topup" && opt.price > 0 && (
                  <span className={`text-[10px] font-normal ${hpSize === opt.value ? "text-sky-200" : "text-slate-400"}`}>
                    from RM {opt.price}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gas Type (only for gas-topup) */}
        {service === "gas-topup" && (
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2.5">
              Gas Type &nbsp;<span className="text-slate-400 font-medium normal-case tracking-normal">Jenis Gas · 气体类型</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["r22", "r410a", "r32"] as GasType[]).map((g) => (
                <button
                  key={g}
                  onClick={() => { setGasType(g); setShowResult(false); }}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-left ${
                    gasType === g
                      ? "bg-sky-600 border-sky-600 text-white"
                      : "bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                  }`}
                >
                  {g.toUpperCase()}
                  <span className={`block text-[10px] font-normal mt-0.5 ${gasType === g ? "text-sky-200" : "text-slate-400"}`}>
                    {g === "r22" ? "Older" : g === "r32" ? "Inverter" : "Standard"}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1.5">Not sure? Check sticker on your outdoor unit or WhatsApp us a photo.</p>
          </div>
        )}

        {/* Step 4: Number of Units */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2.5">
            4. Number of Units &nbsp;<span className="text-slate-400 font-medium normal-case tracking-normal">Bilangan Unit · 机器数量</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setUnits(Math.max(1, units - 1)); setShowResult(false); }}
              className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700 font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              −
            </button>
            <span className="text-2xl font-black text-slate-900 w-8 text-center">{units}</span>
            <button
              onClick={() => { setUnits(Math.min(20, units + 1)); setShowResult(false); }}
              className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700 font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              +
            </button>
            <span className="text-xs text-slate-500 ml-1">
              {units > 1 && getDiscount(units).pct > 0 && (
                <span className="text-emerald-600 font-black">{getDiscount(units).label} applied!</span>
              )}
            </span>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-wider py-3.5 rounded-2xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Calculate My Estimate →
        </button>

        {/* Result Block */}
        {showResult && (
          <div className="bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 rounded-2xl p-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-1">Your Estimate</p>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">{SERVICE_LABELS[service].en} × {units} unit{units > 1 ? "s" : ""}</span>
              <span className="font-bold text-slate-800">RM {subtotal.toLocaleString()}</span>
            </div>

            {discount.pct > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600 font-semibold">Volume Discount ({discount.label})</span>
                <span className="font-bold text-emerald-600">− RM {discountAmt.toLocaleString()}</span>
              </div>
            )}

            <div className="border-t border-sky-200 pt-3 flex justify-between items-baseline">
              <span className="text-sm font-black text-slate-900">Estimated Total</span>
              <span className="text-2xl font-black text-sky-700">RM {total.toLocaleString()}</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              * This is a starting estimate based on standard pricing. Final quote confirmed by technician on-site. Material costs (gas, copper pipe, brackets) quoted separately if required. No hidden charges.
            </p>

            {/* WhatsApp CTA with prefilled quote */}
            <a
              href={waLink(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider py-3.5 rounded-2xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20 mt-2"
            >
              <FaWhatsapp className="h-5 w-5 shrink-0" />
              WhatsApp This Quote — Book Now
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center w-full border-2 border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-700 font-black uppercase tracking-wider py-3 rounded-2xl text-xs transition-all"
            >
              Or Call {siteConfig.phoneDisplay}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
