"use client";

import { useMemo, useState, type ReactNode } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { waLink } from "@/lib/whatsapp";
import { sitePublic } from "@/config/site-public";
import { getBundleDiscount } from "@/lib/aircond-math";

type ServiceType = "basic-servicing" | "chemical-wash" | "chemical-overhaul" | "gas-topup" | "installation" | "repair" | "dismantle" | "relocate-same" | "relocate-other";
type UnitType = "wall" | "cassette" | "window";
type GasType = "r22" | "r410a" | "r32";

const selectCls = "w-full border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm font-bold text-slate-900 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all appearance-none cursor-pointer";
const FREE_FEET = 7;
const COPPER_RATE = (hp: string) => hp === "1.0-1.5" ? 17 : hp === "2.0" || hp === "2.5" ? 23 : 27;
const hpBand = (hp: string) => hp === "2.0" || hp === "2.5" ? "2.0-2.5" : hp;
const WIRE_RATE = 9;
const INSULATION_RATE = 7;
const DRAIN_RATE = 5;
const SMALL_PVC_RATE = 6;
const LARGE_PVC_RATE = 12;
const WALL_HACKING_RATE = 25;

const SERVICE_LABELS: Record<ServiceType, string> = {
  "basic-servicing": "Basic Servicing",
  "chemical-wash": "Chemical Wash",
  "chemical-overhaul": "Chemical Overhaul",
  "gas-topup": "Gas Top-Up",
  installation: "New Installation",
  repair: "Repair / Diagnostic",
  dismantle: "Dismantle Only (indoor + outdoor)",
  "relocate-same": "Dismantle + Reinstall Same Place",
  "relocate-other": "Dismantle + Reinstall Other Place",
};

const BASE_PRICES: Record<Exclude<ServiceType, "gas-topup" | "installation" | "relocate-same">, Record<string, number>> = {
  "basic-servicing": { "1.0-1.5": 99, "2.0-2.5": 120, "3.0-3.5": 150 },
  "chemical-wash": { "1.0-1.5": 120, "2.0-2.5": 150, "3.0-3.5": 180 },
  "chemical-overhaul": { "1.0-1.5": 220, "2.0-2.5": 280, "3.0-3.5": 350 },
  repair: { "1.0-1.5": 88, "2.0-2.5": 88, "3.0-3.5": 88 },
  dismantle: { "1.0-1.5": 90, "2.0-2.5": 90, "3.0-3.5": 90 },
  "relocate-other": { "1.0-1.5": 350, "2.0-2.5": 350, "3.0-3.5": 350 },
};

function Select({ value, onChange, children }: { value: string; onChange: (value: string) => void; children: ReactNode }) {
  return <div className="relative"><select value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>{children}</select><FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /></div>;
}
function FeetInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (value: number) => void; hint: string }) {
  return <label className="block"><span className="block text-[11px] font-bold text-slate-700 mb-1">{label}</span><input type="number" min="0" max="100" value={value} onChange={(e) => onChange(Math.max(0, Math.min(100, Number(e.target.value) || 0)))} className={selectCls} /><span className="block text-[10px] text-slate-500 mt-1">{hint}</span></label>;
}

export function PriceCalculator() {
  const [service, setService] = useState<ServiceType>("chemical-wash");
  const [unitType, setUnitType] = useState<UnitType>("wall");
  const [hp, setHp] = useState("1.0-1.5");
  const [gasType, setGasType] = useState<GasType>("r32");
  const [units, setUnits] = useState(1);
  const [copperFeet, setCopperFeet] = useState(7);
  const [wireFeet, setWireFeet] = useState(7);
  const [insulationFeet, setInsulationFeet] = useState(7);
  const [drainFeet, setDrainFeet] = useState(7);
  const [smallPvcFeet, setSmallPvcFeet] = useState(0);
  const [largePvcFeet, setLargePvcFeet] = useState(0);
  const [wallHackingFeet, setWallHackingFeet] = useState(0);
  const [bracket, setBracket] = useState<"none" | "standard" | "heavy">("none");
  const [showResult, setShowResult] = useState(false);

  const includesInstallationMaterials = service === "installation" || service === "relocate-same" || service === "relocate-other";
  const basePrice = useMemo(() => {
    if (service === "gas-topup") return gasType === "r22" ? 120 : gasType === "r410a" ? 150 : 180;
    if (service === "installation") return hp === "1.0-1.5" ? 199 : hp === "2.0" ? 249 : hp === "2.5" ? 279 : 329;
    if (service === "relocate-same") return hp === "2.0" || hp === "2.5" ? 290 : 250;
    return BASE_PRICES[service as Exclude<ServiceType, "gas-topup" | "installation" | "relocate-same">]?.[hpBand(hp)] ?? 0;
  }, [service, gasType, hp]);
  const extra = (feet: number) => Math.max(0, feet - FREE_FEET);
  const materialLines = includesInstallationMaterials ? [
    { label: `Extra Copper Pipe — ${extra(copperFeet)} ft × RM ${COPPER_RATE(hp)}/ft`, amount: extra(copperFeet) * COPPER_RATE(hp) },
    { label: `Extra Electrical Wire — ${extra(wireFeet)} ft × RM ${WIRE_RATE}/ft`, amount: extra(wireFeet) * WIRE_RATE },
    { label: `Extra Insulation — ${extra(insulationFeet)} ft × RM ${INSULATION_RATE}/ft`, amount: extra(insulationFeet) * INSULATION_RATE },
    { label: `Extra Drain Pipe — ${extra(drainFeet)} ft × RM ${DRAIN_RATE}/ft`, amount: extra(drainFeet) * DRAIN_RATE },
    { label: `Small PVC Casing (Electrical Wire) — ${smallPvcFeet} ft × RM ${SMALL_PVC_RATE}/ft`, amount: smallPvcFeet * SMALL_PVC_RATE },
    { label: `Large PVC Casing (Copper Pipe + Wire + Insulation) — ${largePvcFeet} ft × RM ${LARGE_PVC_RATE}/ft`, amount: largePvcFeet * LARGE_PVC_RATE },
    { label: `Wall Hacking & Concealment Work — ${wallHackingFeet} ft × RM ${WALL_HACKING_RATE}/ft`, amount: wallHackingFeet * WALL_HACKING_RATE },
    ...(bracket === "none" ? [] : [{ label: bracket === "heavy" ? "Heavy Duty Compressor / Outdoor Bracket" : "Standard Compressor / Outdoor Bracket", amount: bracket === "heavy" ? 70 : 45 }]),
  ].filter((line) => line.amount > 0) : [];
  const materialsTotal = materialLines.reduce((total, line) => total + line.amount, 0) * units;
  const serviceTotal = basePrice * units;
  const discount = getBundleDiscount(units);
  const discountAmount = Math.round((serviceTotal * discount.pct) / 100);
  const total = serviceTotal - discountAmount + materialsTotal;

  const quoteMessage = [
    "Hi KL Renovator 👋", "", "I used your Price Calculator and would like a confirmed quote:", "",
    `Service: ${SERVICE_LABELS[service]}`, `Unit type: ${unitType}`, `HP: ${hp} HP`, `Units: ${units}`,
    service === "gas-topup" ? `Gas type: ${gasType.toUpperCase()}` : "",
    includesInstallationMaterials ? `Lengths per unit — copper ${copperFeet} ft, wire ${wireFeet} ft, insulation ${insulationFeet} ft, drain ${drainFeet} ft` : "",
    includesInstallationMaterials ? `PVC — small ${smallPvcFeet} ft, large ${largePvcFeet} ft; bracket: ${bracket}` : "",
    includesInstallationMaterials && wallHackingFeet > 0 ? `Wall hacking & concealment: ${wallHackingFeet} ft` : "",
    "", `Estimated total: RM ${total.toLocaleString()}`, "", "Location:", "Please confirm. Thank you!",
  ].filter(Boolean).join("\n");

  return <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
    <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 py-5 text-white"><p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Free Instant Estimate</p><h3 className="text-xl font-black">Aircond Service Price Calculator</h3><p className="text-sky-100 text-xs mt-1">Service · installation · dismantle · relocation · materials</p></div>
    <div className="p-6 space-y-4">
      <label className="block text-xs font-black uppercase tracking-widest text-slate-500">1. Service<Select value={service} onChange={(value) => { const nextService = value as ServiceType; setService(nextService); if (nextService === "chemical-overhaul" && unitType === "cassette") setUnitType("wall"); setShowResult(false); }}><option value="basic-servicing">Basic Servicing</option><option value="chemical-wash">Chemical Wash</option><option value="chemical-overhaul">Chemical Overhaul</option><option value="gas-topup">Gas Top-Up</option><option value="installation">New Installation</option><option value="dismantle">Dismantle Only</option><option value="relocate-same">Relocate — Reinstall Same Place</option><option value="relocate-other">Relocate — Reinstall Other Place</option><option value="repair">Repair / Diagnostic</option></Select></label>
      <div className="grid grid-cols-2 gap-3"><label className="block text-xs font-black uppercase tracking-widest text-slate-500">2. Unit Type<Select value={unitType} onChange={(value) => { setUnitType(value as UnitType); setShowResult(false); }}><option value="wall">Wall-Mounted</option>{service !== "chemical-overhaul" && <option value="cassette">Ceiling Cassette</option>}<option value="window">Window Unit</option></Select></label><label className="block text-xs font-black uppercase tracking-widest text-slate-500">3. HP Size<Select value={hp} onChange={(value) => { setHp(value); setShowResult(false); }}><option value="1.0-1.5">1.0 – 1.5 HP</option><option value="2.0">2.0 HP</option><option value="2.5">2.5 HP</option><option value="3.0-3.5">3.0 – 3.5 HP</option></Select></label></div>
      {service === "gas-topup" && <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Gas Type<Select value={gasType} onChange={(value) => { setGasType(value as GasType); setShowResult(false); }}><option value="r22">R22</option><option value="r410a">R410A</option><option value="r32">R32</option></Select></label>}
      <label className="block text-xs font-black uppercase tracking-widest text-slate-500">4. Number of Units<input type="number" min="1" max="20" value={units} onChange={(e) => { setUnits(Math.max(1, Math.min(20, Number(e.target.value) || 1))); setShowResult(false); }} className={selectCls} /></label>
      {includesInstallationMaterials && <div className="border-t border-slate-100 pt-4 space-y-4"><div><p className="text-xs font-black uppercase tracking-widest text-slate-500">5. Installation materials & add-ons</p><p className="text-[11px] text-emerald-700 mt-1 font-semibold">First 7 ft per unit is included free: copper pipe, insulation, electrical wire and drain pipe. Outdoor bracket is a paid optional item.</p></div><div className="grid grid-cols-2 gap-3"><FeetInput label="Copper Pipe Length" value={copperFeet} onChange={setCopperFeet} hint={`Extra: RM ${COPPER_RATE(hp)}/ft`} /><FeetInput label="Electrical Wire Length" value={wireFeet} onChange={setWireFeet} hint="Extra: RM 9/ft" /><FeetInput label="Insulation Length" value={insulationFeet} onChange={setInsulationFeet} hint="Extra: RM 7/ft" /><FeetInput label="Drain Pipe Length" value={drainFeet} onChange={setDrainFeet} hint="Extra: RM 5/ft" /><FeetInput label="Small PVC Casing (Electrical Wire)" value={smallPvcFeet} onChange={setSmallPvcFeet} hint="RM 6/ft" /><FeetInput label="Large PVC Casing (Copper + Wire + Insulation)" value={largePvcFeet} onChange={setLargePvcFeet} hint="RM 12/ft" /><FeetInput label="Wall Hacking & Concealment Work" value={wallHackingFeet} onChange={setWallHackingFeet} hint={`RM ${WALL_HACKING_RATE}/ft — concealed piping in wall`} /></div><label className="block text-[11px] font-bold text-slate-700">Outdoor Bracket (paid special charge only)<Select value={bracket} onChange={(value) => { setBracket(value as typeof bracket); setShowResult(false); }}><option value="none">No bracket needed</option><option value="standard">Standard Compressor / Outdoor Bracket — RM 45</option><option value="heavy">Heavy Duty Compressor / Outdoor Bracket — RM 70</option></Select></label></div>}
      <button onClick={() => setShowResult(true)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-wider py-3.5 rounded-2xl text-sm transition-all">Calculate My Estimate →</button>
      {showResult && <div className="bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 rounded-2xl p-5 space-y-3"><p className="text-xs font-black uppercase tracking-widest text-sky-700">Your Estimate</p><div className="flex justify-between text-sm"><span>{SERVICE_LABELS[service]} × {units}</span><strong>RM {serviceTotal.toLocaleString()}</strong></div>{discountAmount > 0 && <div className="flex justify-between text-sm text-emerald-700"><span>{discount.label}</span><strong>− RM {discountAmount.toLocaleString()}</strong></div>}{materialLines.map((line) => <div key={line.label} className="flex justify-between gap-3 text-xs"><span className="text-slate-600">{line.label} × {units}</span><strong>RM {(line.amount * units).toLocaleString()}</strong></div>)}<div className="border-t border-sky-200 pt-3 flex justify-between items-baseline"><span className="text-sm font-black">Estimated Total</span><span className="text-2xl font-black text-sky-700">RM {total.toLocaleString()}</span></div><p className="text-xs text-slate-500">Final quote is confirmed by the technician on-site before work begins.</p><a href={waLink(quoteMessage)} target="_blank" rel="nofollow noopener noreferrer" className="flex justify-center items-center gap-2 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider py-3.5 rounded-2xl text-sm"><FaWhatsapp className="h-5 w-5" /> WhatsApp This Quote — Book Now</a><a href={`tel:${sitePublic.phone}`} className="flex justify-center w-full border-2 border-slate-200 text-slate-700 font-black uppercase tracking-wider py-3 rounded-2xl text-xs">Or Call {sitePublic.phoneDisplay}</a></div>}
    </div>
  </div>;
}
