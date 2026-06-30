"use client";

import { useState, useMemo } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
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
    wall: { r22: 0, r410a: 0, r32: 0 },
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

// Copper pipe rates per foot (extra beyond 7 ft free)
const COPPER_PIPE_RATE: Record<string, number> = {
  "1.0-1.5": 17,
  "1.0": 17,
  "2.0": 23,
  "2.0-2.5": 23,
  "1.5-2.0": 23,
  "2.5": 23,
  "2.5-3.0": 27,
  "3.0": 27,
  "3.0-3.5": 27,
  "4.0": 27,
  "4.0-5.0": 27,
  "5.0": 27,
  "3.5-5.0": 27,
  "3.5-6.0": 27,
  "1.0-3.0": 23,
};

const WIRE_RATE_PER_FOOT = 9;
const FREE_PIPE_FEET = 7;
const OUTDOOR_BRACKET_PRICE = 45;
const INDOOR_BRACKET_PRICE = 35;
const SWITCH_PRICE = 100;
const PVC_INDOOR_RATE = 8;  // RM per foot (mid of RM 6-12 range for wire casing)
const PVC_OUTDOOR_RATE = 12; // RM per foot (for copper pipe casing)

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
  r410a: "R410A (standard)",
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

// Helper: get copper pipe rate for current HP size
function getCopperRatePerFoot(hpSize: string): number {
  return COPPER_PIPE_RATE[hpSize] ?? 17;
}

// Shared select styling — matches the house input style used in contact-form.tsx
const selectCls =
  "w-full border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm font-bold text-slate-900 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all duration-200 appearance-none cursor-pointer";

// Compact yes/no select used across the Add-ons section
function YesNoSelect({
  value,
  onChange,
  yesLabel = "✅ Yes, I have one",
  noLabel = "❌ No, need one",
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value === null ? "" : value ? "yes" : "no"}
        onChange={(e) => onChange(e.target.value === "yes")}
        className={selectCls}
      >
        <option value="" disabled>Select an option…</option>
        <option value="yes">{yesLabel}</option>
        <option value="no">{noLabel}</option>
      </select>
      <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export function PriceCalculator() {
  const [service, setService] = useState<ServiceType>("chemical-wash");
  const [unitType, setUnitType] = useState<UnitType>("wall");
  const [hpSize, setHpSize] = useState<string>("1.0-1.5");
  const [gasType, setGasType] = useState<GasType>("r32");
  const [units, setUnits] = useState<number>(1);
  const [showResult, setShowResult] = useState(false);

  // ── Add-on states (installation only) ───────────────────────────────────────
  const [extraCopperFeet, setExtraCopperFeet] = useState<number>(0);
  const [hasOutdoorBracket, setHasOutdoorBracket] = useState<boolean | null>(null);
  const [hasSwitch, setHasSwitch] = useState<boolean | null>(null);
  const [wantsPvcIndoor, setWantsPvcIndoor] = useState<boolean | null>(null);
  const [pvcIndoorFeet, setPvcIndoorFeet] = useState<number>(0);
  const [wantsPvcOutdoor, setWantsPvcOutdoor] = useState<boolean | null>(null);
  const [pvcOutdoorFeet, setPvcOutdoorFeet] = useState<number>(0);
  const [hasIndoorBracket, setHasIndoorBracket] = useState<boolean | null>(null);

  // ── Base price calculation ─────────────────────────────────────────────────
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
  const baseTotal = subtotal - discountAmt;

  const isInstallation = service === "installation";

  // ── Add-on cost calculation (installation only) ───────────────────────────
  const copperRate = getCopperRatePerFoot(hpSize);
  const copperExtraCost = isInstallation && extraCopperFeet > 0
    ? extraCopperFeet * copperRate + extraCopperFeet * WIRE_RATE_PER_FOOT
    : 0;
  const outdoorBracketCost = isInstallation && hasOutdoorBracket === false ? OUTDOOR_BRACKET_PRICE : 0;
  const switchCost = isInstallation && hasSwitch === false ? SWITCH_PRICE : 0;
  const pvcIndoorCost = isInstallation && wantsPvcIndoor === true && pvcIndoorFeet > 0 ? pvcIndoorFeet * PVC_INDOOR_RATE : 0;
  const pvcOutdoorCost = isInstallation && wantsPvcOutdoor === true && pvcOutdoorFeet > 0 ? pvcOutdoorFeet * PVC_OUTDOOR_RATE : 0;
  const indoorBracketCost = isInstallation && hasIndoorBracket === false ? INDOOR_BRACKET_PRICE : 0;

  const addOnTotal = copperExtraCost + outdoorBracketCost + switchCost + pvcIndoorCost + pvcOutdoorCost + indoorBracketCost;
  const grandTotal = baseTotal + addOnTotal;

  // ── WhatsApp message ───────────────────────────────────────────────────────
  const addOnLines: string[] = [];
  if (isInstallation) {
    if (extraCopperFeet > 0) {
      addOnLines.push(`📦 Extra Copper Pipe & Wire: ${extraCopperFeet} ft beyond free 7 ft = RM ${copperExtraCost.toLocaleString()} (copper RM ${copperRate}/ft + wire RM ${WIRE_RATE_PER_FOOT}/ft)`);
    } else {
      addOnLines.push(`📦 Copper Pipe & Wire: Using standard 7 ft (free included)`);
    }
    if (hasOutdoorBracket === false) addOnLines.push(`🔩 Outdoor Compressor Bracket: RM ${OUTDOOR_BRACKET_PRICE} (not available, to be supplied)`);
    if (hasSwitch === false) addOnLines.push(`🔌 Aircond Switch / Plug Point: RM ${SWITCH_PRICE} (installation required)`);
    if (wantsPvcIndoor === true && pvcIndoorFeet > 0) addOnLines.push(`📏 PVC Casing (Indoor – wire section): ${pvcIndoorFeet} ft × RM ${PVC_INDOOR_RATE}/ft = RM ${pvcIndoorCost.toLocaleString()}`);
    if (wantsPvcOutdoor === true && pvcOutdoorFeet > 0) addOnLines.push(`📏 PVC Casing (Outdoor – copper pipe section): ${pvcOutdoorFeet} ft × RM ${PVC_OUTDOOR_RATE}/ft = RM ${pvcOutdoorCost.toLocaleString()}`);
    if (hasIndoorBracket === false) addOnLines.push(`🔧 Indoor Unit Bracket: RM ${INDOOR_BRACKET_PRICE} (old unit bracket not available)`);
  }

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
    "",
    addOnLines.length > 0 ? "📋 Add-ons / Materials:" : "",
    ...addOnLines,
    "",
    `💰 Base Service Total: RM ${baseTotal.toLocaleString()}${discount.pct > 0 ? ` (${discount.label})` : ""}`,
    addOnTotal > 0 ? `🔩 Add-ons Total: RM ${addOnTotal.toLocaleString()}` : "",
    `💵 Estimated Grand Total: RM ${grandTotal.toLocaleString()}`,
    "",
    "📍 My Location:",
    "",
    "Please confirm availability and send a technician. Thank you!",
  ].filter(Boolean).join("\n");

  function handleCalculate() {
    const newOpts = HP_OPTIONS[service]?.[unitType] ?? [];
    if (!newOpts.find((o) => o.value === hpSize) && newOpts.length > 0) {
      setHpSize(newOpts[0].value);
    }
    setShowResult(true);
  }

  function resetAddons() {
    setExtraCopperFeet(0);
    setHasOutdoorBracket(null);
    setHasSwitch(null);
    setWantsPvcIndoor(null);
    setPvcIndoorFeet(0);
    setWantsPvcOutdoor(null);
    setPvcOutdoorFeet(0);
    setHasIndoorBracket(null);
    setShowResult(false);
  }

  const hpOptionsForSelection = HP_OPTIONS[service]?.[unitType] ?? [];

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

      <div className="p-6 space-y-4">

        {/* Step 1: Service Type */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
            1. Service &nbsp;<span className="text-slate-400 font-medium normal-case tracking-normal">Perkhidmatan · 服务</span>
          </label>
          <div className="relative">
            <select
              value={service}
              onChange={(e) => { setService(e.target.value as ServiceType); resetAddons(); }}
              className={selectCls}
            >
              {(Object.keys(SERVICE_LABELS) as ServiceType[]).map((s) => (
                <option key={s} value={s}>
                  {SERVICE_LABELS[s].en} · {SERVICE_LABELS[s].zh}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Step 2 + 3: Unit Type & HP Size side-by-side on larger screens, stacked on mobile */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
              2. Unit Type
            </label>
            <div className="relative">
              <select
                value={unitType}
                onChange={(e) => { setUnitType(e.target.value as UnitType); setShowResult(false); }}
                className={selectCls}
              >
                {(["wall", "cassette", "window"] as UnitType[]).map((u) => (
                  <option key={u} value={u}>{UNIT_LABELS[u].en}</option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
              3. HP Size
            </label>
            <div className="relative">
              <select
                value={hpSize}
                onChange={(e) => { setHpSize(e.target.value); setShowResult(false); }}
                className={selectCls}
              >
                {hpOptionsForSelection.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}{service !== "gas-topup" && opt.price > 0 ? ` — RM ${opt.price}` : ""}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Gas Type (only for gas-topup) */}
        {service === "gas-topup" && (
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
              Gas Type &nbsp;<span className="text-slate-400 font-medium normal-case tracking-normal">Jenis Gas · 气体类型</span>
            </label>
            <div className="relative">
              <select
                value={gasType}
                onChange={(e) => { setGasType(e.target.value as GasType); setShowResult(false); }}
                className={selectCls}
              >
                {(["r22", "r410a", "r32"] as GasType[]).map((g) => (
                  <option key={g} value={g}>{g.toUpperCase()} — {GAS_LABELS[g]}</option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">Not sure? Check the sticker on your outdoor unit or WhatsApp us a photo.</p>
          </div>
        )}

        {/* Step 4: Number of Units */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
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

        {/* ── ADD-ONS SECTION — Installation only ─────────────────────────────
            These materials (bracket, switch, PVC casing) only apply to new
            unit installation. Previously shown for every service type,
            which was both confusing and added unnecessary length to the
            calculator for chemical wash / gas top-up / repair bookings. */}
        {isInstallation && (
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              5. Installation Materials &amp; Add-ons &nbsp;
              <span className="text-slate-400 font-medium normal-case tracking-normal">Bahan Tambahan · 附加材料</span>
            </p>

            {/* Copper Pipe & Wire */}
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 space-y-2.5">
              <div>
                <p className="text-xs font-black text-sky-800 mb-0.5">Copper Pipe &amp; Wire</p>
                <p className="text-[11px] text-sky-600 leading-relaxed">
                  ✅ First <strong>7 ft are FREE</strong>. Extra footage is charged per foot based on HP size.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-700 mb-1.5">
                  Total feet needed (indoor to outdoor unit):
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setExtraCopperFeet(Math.max(0, extraCopperFeet - 1)); setShowResult(false); }}
                    className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-700 font-black text-base hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-xl font-black text-slate-900 w-14 text-center">{extraCopperFeet + FREE_PIPE_FEET} ft</span>
                  <button
                    onClick={() => { setExtraCopperFeet(extraCopperFeet + 1); setShowResult(false); }}
                    className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-700 font-black text-base hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    +
                  </button>
                  {extraCopperFeet > 0 ? (
                    <span className="text-[11px] text-amber-700 font-semibold">+RM {copperExtraCost.toLocaleString()}</span>
                  ) : (
                    <span className="text-[11px] text-emerald-700 font-semibold">FREE 🎉</span>
                  )}
                </div>
              </div>
            </div>

            {/* Outdoor Compressor Bracket */}
            <div>
              <p className="text-[11px] font-semibold text-slate-700 mb-1.5">
                Outdoor compressor bracket already installed?
                <span className="block text-slate-400 font-normal">Ada bracket outdoor? · 室外机有支架吗？</span>
              </p>
              <YesNoSelect value={hasOutdoorBracket} onChange={(v) => { setHasOutdoorBracket(v); setShowResult(false); }} />
              {hasOutdoorBracket === false && (
                <p className="text-[11px] text-amber-700 mt-1 font-semibold">+RM {OUTDOOR_BRACKET_PRICE} added to estimate</p>
              )}
            </div>

            {/* Aircond Switch */}
            <div>
              <p className="text-[11px] font-semibold text-slate-700 mb-1.5">
                Dedicated aircond switch / plug point already installed?
                <span className="block text-slate-400 font-normal">Ada switch aircond? · 有冷气专用开关吗？</span>
              </p>
              <YesNoSelect value={hasSwitch} onChange={(v) => { setHasSwitch(v); setShowResult(false); }} />
              {hasSwitch === false && (
                <p className="text-[11px] text-amber-700 mt-1 font-semibold">+RM {SWITCH_PRICE} added to estimate</p>
              )}
            </div>

            {/* PVC Casing — Indoor */}
            <div>
              <p className="text-[11px] font-semibold text-slate-700 mb-1.5">
                Want PVC casing for the indoor wire (unit to switch)?
                <span className="block text-slate-400 font-normal">室内PVC线槽要吗？</span>
              </p>
              <YesNoSelect
                value={wantsPvcIndoor}
                onChange={(v) => { setWantsPvcIndoor(v); if (!v) setPvcIndoorFeet(0); setShowResult(false); }}
                yesLabel="✅ Yes, I want it"
                noLabel="No thanks"
              />
              {wantsPvcIndoor === true && (
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-slate-600">Feet needed (RM {PVC_INDOOR_RATE}/ft):</span>
                  <button
                    onClick={() => { setPvcIndoorFeet(Math.max(0, pvcIndoorFeet - 1)); setShowResult(false); }}
                    className="h-7 w-7 rounded-lg border border-slate-200 bg-white text-slate-700 font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-sm font-black text-slate-900 w-8 text-center">{pvcIndoorFeet}</span>
                  <button
                    onClick={() => { setPvcIndoorFeet(pvcIndoorFeet + 1); setShowResult(false); }}
                    className="h-7 w-7 rounded-lg border border-slate-200 bg-white text-slate-700 font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    +
                  </button>
                  {pvcIndoorFeet > 0 && (
                    <span className="text-[11px] text-amber-700 font-semibold">+RM {pvcIndoorCost}</span>
                  )}
                </div>
              )}
            </div>

            {/* PVC Casing — Outdoor */}
            <div>
              <p className="text-[11px] font-semibold text-slate-700 mb-1.5">
                Want PVC casing for the outdoor copper pipe?
                <span className="block text-slate-400 font-normal">室外PVC铜管槽要吗？</span>
              </p>
              <YesNoSelect
                value={wantsPvcOutdoor}
                onChange={(v) => { setWantsPvcOutdoor(v); if (!v) setPvcOutdoorFeet(0); setShowResult(false); }}
                yesLabel="✅ Yes, I want it"
                noLabel="No thanks"
              />
              {wantsPvcOutdoor === true && (
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-slate-600">Feet needed (RM {PVC_OUTDOOR_RATE}/ft):</span>
                  <button
                    onClick={() => { setPvcOutdoorFeet(Math.max(0, pvcOutdoorFeet - 1)); setShowResult(false); }}
                    className="h-7 w-7 rounded-lg border border-slate-200 bg-white text-slate-700 font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-sm font-black text-slate-900 w-8 text-center">{pvcOutdoorFeet}</span>
                  <button
                    onClick={() => { setPvcOutdoorFeet(pvcOutdoorFeet + 1); setShowResult(false); }}
                    className="h-7 w-7 rounded-lg border border-slate-200 bg-white text-slate-700 font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    +
                  </button>
                  {pvcOutdoorFeet > 0 && (
                    <span className="text-[11px] text-amber-700 font-semibold">+RM {pvcOutdoorCost}</span>
                  )}
                </div>
              )}
            </div>

            {/* Indoor Bracket (old unit) */}
            <div>
              <p className="text-[11px] font-semibold text-slate-700 mb-1.5">
                Replacing an old unit — existing indoor bracket reusable?
                <span className="block text-slate-400 font-normal">旧机的室内机支架还有吗？</span>
              </p>
              <YesNoSelect
                value={hasIndoorBracket}
                onChange={(v) => { setHasIndoorBracket(v); setShowResult(false); }}
                yesLabel="✅ Yes / New unit"
                noLabel="❌ No / Need new bracket"
              />
              {hasIndoorBracket === false && (
                <p className="text-[11px] text-amber-700 mt-1 font-semibold">+RM {INDOOR_BRACKET_PRICE} added to estimate</p>
              )}
            </div>
          </div>
        )}

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

            {/* Base service */}
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

            {/* Add-ons breakdown */}
            {isInstallation && extraCopperFeet > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Extra copper pipe &amp; wire ({extraCopperFeet} ft)</span>
                <span className="font-bold text-slate-800">RM {copperExtraCost.toLocaleString()}</span>
              </div>
            )}
            {isInstallation && extraCopperFeet === 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-emerald-600">✅ Copper pipe &amp; wire (7 ft)</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
            )}
            {isInstallation && hasOutdoorBracket === false && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Outdoor compressor bracket</span>
                <span className="font-bold text-slate-800">RM {OUTDOOR_BRACKET_PRICE}</span>
              </div>
            )}
            {isInstallation && hasSwitch === false && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Aircond switch / plug point</span>
                <span className="font-bold text-slate-800">RM {SWITCH_PRICE}</span>
              </div>
            )}
            {isInstallation && wantsPvcIndoor === true && pvcIndoorFeet > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">PVC casing indoor – {pvcIndoorFeet} ft</span>
                <span className="font-bold text-slate-800">RM {pvcIndoorCost.toLocaleString()}</span>
              </div>
            )}
            {isInstallation && wantsPvcOutdoor === true && pvcOutdoorFeet > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">PVC casing outdoor – {pvcOutdoorFeet} ft</span>
                <span className="font-bold text-slate-800">RM {pvcOutdoorCost.toLocaleString()}</span>
              </div>
            )}
            {isInstallation && hasIndoorBracket === false && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Indoor unit bracket</span>
                <span className="font-bold text-slate-800">RM {INDOOR_BRACKET_PRICE}</span>
              </div>
            )}

            <div className="border-t border-sky-200 pt-3 flex justify-between items-baseline">
              <span className="text-sm font-black text-slate-900">Estimated Total</span>
              <span className="text-2xl font-black text-sky-700">RM {grandTotal.toLocaleString()}</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              * This is a starting estimate based on standard pricing. Final quote confirmed by technician on-site. No hidden charges — all costs discussed before work begins.
            </p>

            {/* WhatsApp CTA with prefilled quote */}
            <a
              href={waLink(waMsg)}
              target="_blank"
              rel="nofollow noopener noreferrer"
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
