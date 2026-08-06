// ─────────────────────────────────────────────────────────────────────────
// Aircond Installation Cost Calculator — estimates material cost, labour
// cost, bundle discount and grand total using the published site pricing
// via lib/aircond-math.ts (single source of truth). Trilingual (en/ms/zh).
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

type Lang = "en" | "ms" | "zh";

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

const UNIT_TYPE_OPTIONS: Record<Lang, { value: UnitType; label: string; sub: string }[]> = {
  en: [
    { value: "wall", label: "Wall-Mounted", sub: "Most homes & offices" },
    { value: "cassette", label: "Ceiling Cassette", sub: "Shoplots & offices" },
    { value: "window", label: "Window Unit", sub: "Older homes" },
  ],
  ms: [
    { value: "wall", label: "Dinding", sub: "Kebanyakan rumah & pejabat" },
    { value: "cassette", label: "Ceiling Cassette", sub: "Kedai & pejabat" },
    { value: "window", label: "Unit Tingkap", sub: "Rumah lama" },
  ],
  zh: [
    { value: "wall", label: "挂壁式", sub: "多数家庭与办公室" },
    { value: "cassette", label: "天花板卡式", sub: "店铺与办公室" },
    { value: "window", label: "窗式", sub: "旧式住宅" },
  ],
};

interface Strings {
  eyebrow: string;
  title: string;
  subtitle: string;
  unitsLabel: string;
  unitsHint: string;
  typeLabel: string;
  hpLabel: string;
  runTitle: string;
  copper: string;
  wire: string;
  drain: string;
  insulation: string;
  freeHint: string;
  addonsTitle: string;
  smallPvc: string;
  largePvc: string;
  pvcHint: string;
  bracketCheck: string;
  bracketTypeLabel: string;
  standard: string;
  heavy: string;
  switchCheck: string;
  pumpCheck: string;
  pumpSub: string;
  calculate: string;
  resultTitle: string;
  labour: string;
  labourSub: string;
  material: string;
  materialSub: string;
  discount: string;
  discountSub: string;
  discountNone: string;
  grandTotal: string;
  perUnit: string;
  for1Unit: string;
  breakdown: string;
  confirmedQuote: string;
  startOver: string;
  note: string;
  waIntro: string;
}

const STRINGS: Record<Lang, Strings> = {
  en: {
    eyebrow: "Free Instant Estimate",
    title: "Aircond Installation Cost Calculator",
    subtitle: "Labour + materials + bundle discount. Every published price is used as-is; anything unconfirmed is clearly marked as an estimate.",
    unitsLabel: "Number of Units",
    unitsHint: "Multi-unit jobs get bundle discounts (4–10 units: 5%, 10+: 10%)",
    typeLabel: "Aircond Type",
    hpLabel: "Horsepower (HP)",
    runTitle: "Pipe & Wire Run Lengths (per unit)",
    copper: "Copper Pipe Length",
    wire: "Electrical Wire Length",
    drain: "Drain Pipe Length",
    insulation: "Insulation Length",
    freeHint: `First ${FREE_RUN_FEET} ft free`,
    addonsTitle: "Optional Add-ons",
    smallPvc: "Small PVC Casing (Electrical Wire)",
    largePvc: "Large PVC Casing (Copper Pipe + Wire + Insulation)",
    pvcHint: "Charged by actual casing length",
    bracketCheck: "Outdoor Bracket",
    bracketTypeLabel: "Bracket Type",
    standard: "Standard",
    heavy: "Heavy Duty",
    switchCheck: "Aircond Switch / Plug Point",
    pumpCheck: "Water Pump",
    pumpSub: "(concealed / low-ceiling installs)",
    calculate: "Calculate My Installation Cost",
    resultTitle: "Your Installation Estimate",
    labour: "Labour Cost",
    labourSub: "per unit",
    material: "Material Cost",
    materialSub: "pipe, wire, add-ons",
    discount: "Bundle Discount",
    discountSub: "Add 4+ units",
    discountNone: "—",
    grandTotal: "Grand Total",
    perUnit: "per unit",
    for1Unit: "for 1 unit",
    breakdown: "Breakdown",
    confirmedQuote: "Get Confirmed Quote",
    startOver: "Start Over",
    note: `Standard installation includes the first ${FREE_RUN_FEET} ft of copper pipe, insulation, electrical wire and drain pipe free. Extra copper is RM 17–27/ft by HP, electrical wire RM 9/ft, insulation RM 7/ft, and drain pipe RM ${DRAIN_PIPE_RATE}/ft. Small PVC casing (electrical wire) is RM 6/ft; large PVC casing (copper pipe + wire + insulation) is RM 12/ft. Outdoor brackets are paid add-ons (RM 45–70), never included free. Multi-unit bundle discounts: 4–10 units 5% OFF, 10+ units 10% OFF.`,
    waIntro: "I used your Aircond Installation Cost Calculator and would like a confirmed quotation:",
  },
  ms: {
    eyebrow: "Anggaran Percuma Segera",
    title: "Kalkulator Kos Pemasangan Aircond",
    subtitle: "Buruh + bahan + diskaun pakej. Setiap harga diterbitkan digunakan seadanya; apa-apa yang belum disahkan ditanda sebagai anggaran.",
    unitsLabel: "Bilangan Unit",
    unitsHint: "Kerja berbilang unit dapat diskaun pakej (4–10 unit: 5%, 10+: 10%)",
    typeLabel: "Jenis Aircond",
    hpLabel: "Kuasa Kuda (HP)",
    runTitle: "Panjang Paip & Wayar (setiap unit)",
    copper: "Panjang Paip Tembaga",
    wire: "Panjang Wayar Elektrik",
    drain: "Panjang Paip Saliran",
    insulation: "Panjang Penebat",
    freeHint: `${FREE_RUN_FEET} kaki pertama percuma`,
    addonsTitle: "Item Tambahan Pilihan",
    smallPvc: "Casing PVC Kecil (Wayar Elektrik)",
    largePvc: "Casing PVC Besar (Paip Tembaga + Wayar + Penebat)",
    pvcHint: "Dicaj mengikut panjang casing sebenar",
    bracketCheck: "Pendakap Luar",
    bracketTypeLabel: "Jenis Pendakap",
    standard: "Standard",
    heavy: "Heavy Duty",
    switchCheck: "Suis / Plug Point Aircond",
    pumpCheck: "Pam Air",
    pumpSub: "(pemasangan tersembunyi / siling rendah)",
    calculate: "Kira Kos Pemasangan Saya",
    resultTitle: "Anggaran Pemasangan Anda",
    labour: "Kos Buruh",
    labourSub: "setiap unit",
    material: "Kos Bahan",
    materialSub: "paip, wayar, tambahan",
    discount: "Diskaun Pakej",
    discountSub: "Tambah 4+ unit",
    discountNone: "—",
    grandTotal: "Jumlah Keseluruhan",
    perUnit: "setiap unit",
    for1Unit: "untuk 1 unit",
    breakdown: "Pecahan",
    confirmedQuote: "Dapatkan Sebut Harga Sah",
    startOver: "Mula Semula",
    note: `Pemasangan standard termasuk ${FREE_RUN_FEET} kaki pertama paip tembaga, penebat, wayar elektrik dan paip saliran percuma. Paip tembaga tambahan RM 17–27/kaki mengikut HP, wayar elektrik RM 9/kaki, penebat RM 7/kaki dan paip saliran RM ${DRAIN_PIPE_RATE}/kaki. Casing PVC kecil (wayar) RM 6/kaki; casing PVC besar (paip tembaga + wayar + penebat) RM 12/kaki. Pendakap luar ialah item tambahan berbayar (RM 45–70), bukan percuma. Diskaun pakej berbilang unit: 4–10 unit 5% OFF, 10+ unit 10% OFF.`,
    waIntro: "Saya menggunakan Kalkulator Kos Pemasangan Aircond anda dan ingin sebut harga disahkan:",
  },
  zh: {
    eyebrow: "免费即时估价",
    title: "冷气安装费用计算器",
    subtitle: "人工 + 材料 + 批量折扣。所有已公布价格原样使用；任何未确认项目都会明确标注为估算。",
    unitsLabel: "安装台数",
    unitsHint: "多台安装享批量折扣（4–10台：5%，10台以上：10%）",
    typeLabel: "冷气类型",
    hpLabel: "匹数（HP）",
    runTitle: "管道与电线长度（每台）",
    copper: "铜管长度",
    wire: "电线长度",
    drain: "排水管长度",
    insulation: "保温层长度",
    freeHint: `前${FREE_RUN_FEET}英尺免费`,
    addonsTitle: "可选附加项目",
    smallPvc: "小型 PVC 线槽（电线）",
    largePvc: "大型 PVC 线槽（铜管 + 电线 + 保温层）",
    pvcHint: "按实际线槽长度收费",
    bracketCheck: "室外支架",
    bracketTypeLabel: "支架类型",
    standard: "标准",
    heavy: "重型",
    switchCheck: "冷气开关/插座",
    pumpCheck: "水泵",
    pumpSub: "（隐藏式/低吊顶安装）",
    calculate: "计算我的安装费用",
    resultTitle: "您的安装估价",
    labour: "人工费",
    labourSub: "每台",
    material: "材料费",
    materialSub: "管道、电线、附加项",
    discount: "批量折扣",
    discountSub: "4台以上",
    discountNone: "—",
    grandTotal: "总价",
    perUnit: "每台",
    for1Unit: "1台",
    breakdown: "费用明细",
    confirmedQuote: "获取正式报价",
    startOver: "重新开始",
    note: `标准安装包含前${FREE_RUN_FEET}英尺铜管、保温层、电线和排水管。额外铜管按HP每英尺RM 17–27，电线每英尺RM 9，保温层每英尺RM 7，排水管每英尺RM ${DRAIN_PIPE_RATE}。小型PVC线槽（电线）每英尺RM 6；大型PVC线槽（铜管+电线+保温层）每英尺RM 12。室外支架为付费附加项目（RM 45–70），不免费包含。多台批量折扣：4–10台享5%折扣，10台以上享10%折扣。`,
    waIntro: "我使用了你们的冷气安装费用计算器，希望获得正式报价：",
  },
};

export function InstallationCostCalculator({ lang = "en" }: { lang?: Lang }) {
  const s = STRINGS[lang];
  const [units, setUnits] = useState(1);
  const [hp, setHp] = useState<HpSize>("1.5");
  const [unitType, setUnitType] = useState<UnitType>("wall");
  const [copperFeet, setCopperFeet] = useState(7);
  const [wireFeet, setWireFeet] = useState(7);
  const [drainFeet, setDrainFeet] = useState(7);
  const [insulationFeet, setInsulationFeet] = useState(7);
  const [smallPvcFeet, setSmallPvcFeet] = useState(0);
  const [largePvcFeet, setLargePvcFeet] = useState(0);
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
    extraInsulationFeet: Math.max(0, insulationFeet - FREE_RUN_FEET),
    extraDrainFeet: Math.max(0, drainFeet - FREE_RUN_FEET),
    smallPvcFeet,
    largePvcFeet,
    needsOutdoorBracket,
    heavyDutyBracket: heavyDuty,
    needsIndoorBracket: false,
    needsSwitch,
    needsWaterPump,
  });

  const discountLabel =
    lang === "en"
      ? result.discount.label
      : lang === "ms"
        ? `${result.discount.pct}% OFF — Diskaun Tempahan Segera (${result.discount.range === "4–10 units" ? "4–10 unit" : "10+ unit"})`
        : `${result.discount.pct}% 折扣 — 即时预约优惠（${result.discount.range === "4–10 units" ? "4–10台" : "10台以上"}）`;

  const unitTypeLabel =
    unitType === "wall"
      ? lang === "ms" ? "Dinding" : lang === "zh" ? "挂壁式" : "Wall-Mounted"
      : unitType === "cassette"
        ? lang === "ms" ? "Ceiling Cassette" : lang === "zh" ? "天花板卡式" : "Ceiling Cassette"
        : lang === "ms" ? "Unit Tingkap" : lang === "zh" ? "窗式" : "Window Unit";

  const handleCalculate = () => {
    setShowResult(true);
    trackToolUse("installation-cost-calculator", {
      units,
      hp,
      unit_type: unitType,
      grand_total: result.grandTotal,
      lang,
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
    s.waIntro,
    "",
    `🔢 Units / Unit / 台数: ${units}`,
    `💨 HP: ${hp} HP`,
    `🏠 Type / Jenis / 类型: ${unitTypeLabel}`,
    `📏 Copper: ${copperFeet} ft | Wire / Wayar / 电线: ${wireFeet} ft | Insulation / Penebat / 保温: ${insulationFeet} ft | Drain / Saliran / 排水: ${drainFeet} ft`,
    smallPvcFeet > 0 ? `📦 Small PVC casing (wire): ${smallPvcFeet} ft` : "",
    largePvcFeet > 0 ? `📦 Large PVC casing (pipe + wire + insulation): ${largePvcFeet} ft` : "",
    needsOutdoorBracket ? `🔩 Bracket / Pendakap / 支架: ${heavyDuty ? "Heavy duty" : "Standard"}` : "",
    needsSwitch ? "🔌 Switch / Suis / 开关: Yes / Ya / 是" : "",
    needsWaterPump ? "💧 Water pump / Pam air / 水泵: Yes / Ya / 是" : "",
    "",
    `💰 ${lang === "ms" ? "Anggaran Jumlah" : lang === "zh" ? "预计总价" : "Estimated Grand Total"}: ${formatRM(result.grandTotal)}`,
    result.discountAmount > 0 ? `🎉 ${discountLabel} (−${formatRM(result.discountAmount)})` : "",
    "",
    "📍 Location / Lokasi / 地点:",
    "",
    "Please confirm / Sila sahkan / 请确认. Thank you / Terima kasih / 谢谢!",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaWrench className="h-4 w-4" /> {s.eyebrow}
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{s.title}</h2>
        <p className="text-sm text-slate-500 mt-1">{s.subtitle}</p>
      </div>

      <div className="space-y-6">
        {/* Units + type + HP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <NumberField label={s.unitsLabel} value={units} onChange={(v) => { setUnits(Math.max(1, Math.min(30, Math.round(v)))); setShowResult(false); }} min={1} max={30} hint={s.unitsHint} />
          <SelectField label={s.typeLabel} value={unitType} onChange={(v) => { setUnitType(v as UnitType); setShowResult(false); }} options={UNIT_TYPE_OPTIONS[lang].map((o) => ({ value: o.value, label: o.label }))} />
        </div>
        <PillGroup label={s.hpLabel} value={hp} onChange={(v) => { setHp(v); setShowResult(false); }} options={HP_OPTIONS} />

        {/* Run lengths */}
        <div>
          <CalcLabel icon={<FaRulerCombined className="h-4 w-4 text-sky-600" />}>{s.runTitle}</CalcLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <NumberField label={s.copper} value={copperFeet} onChange={(v) => { setCopperFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint={s.freeHint} />
            <NumberField label={s.wire} value={wireFeet} onChange={(v) => { setWireFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint={s.freeHint} />
            <NumberField label={s.insulation} value={insulationFeet} onChange={(v) => { setInsulationFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint={s.freeHint} />
            <NumberField label={s.drain} value={drainFeet} onChange={(v) => { setDrainFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint={s.freeHint} />
          </div>
        </div>

        {/* Optional add-ons */}
        <div>
          <CalcLabel icon={<FaBoxOpen className="h-4 w-4 text-sky-600" />}>{s.addonsTitle}</CalcLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField label={s.smallPvc} value={smallPvcFeet} onChange={(v) => { setSmallPvcFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint="RM 6/ft" />
            <NumberField label={s.largePvc} value={largePvcFeet} onChange={(v) => { setLargePvcFeet(Math.max(0, Math.min(100, v))); setShowResult(false); }} min={0} max={100} suffix="ft" hint="RM 12/ft" />
            <div className="flex items-end">
              <label className="flex items-center gap-3 w-full px-4 py-3 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-sky-400 transition-colors">
                <input type="checkbox" checked={needsOutdoorBracket} onChange={(e) => { setNeedsOutdoorBracket(e.target.checked); setShowResult(false); }} className="h-4 w-4 accent-sky-600" />
                <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><FaShieldAlt className="text-sky-600" /> {s.bracketCheck}</span>
              </label>
            </div>
            {needsOutdoorBracket && (
              <PillGroup label={s.bracketTypeLabel} value={heavyDuty ? "heavy" : "standard"} onChange={(v) => { setHeavyDuty(v === "heavy"); setShowResult(false); }} options={[{ value: "standard", label: s.standard }, { value: "heavy", label: s.heavy }]} color="emerald" />
            )}
            <div className="flex items-end">
              <label className="flex items-center gap-3 w-full px-4 py-3 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-sky-400 transition-colors">
                <input type="checkbox" checked={needsSwitch} onChange={(e) => { setNeedsSwitch(e.target.checked); setShowResult(false); }} className="h-4 w-4 accent-sky-600" />
                <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><FaPlug className="text-sky-600" /> {s.switchCheck}</span>
              </label>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 w-full px-4 py-3 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-sky-400 transition-colors">
                <input type="checkbox" checked={needsWaterPump} onChange={(e) => { setNeedsWaterPump(e.target.checked); setShowResult(false); }} className="h-4 w-4 accent-sky-600" />
                <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><FaWater className="text-sky-600" /> {s.pumpCheck} <span className="text-[10px] text-slate-500 font-semibold">{s.pumpSub}</span></span>
              </label>
            </div>
          </div>
        </div>

        <CalculateButton onClick={handleCalculate}>{s.calculate}</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-sky-600 to-sky-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">{s.resultTitle}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <ResultStat label={s.labour} value={formatRM(result.labourTotal)} sub={`${formatRM(result.labourPerUnit)} ${s.labourSub}`} />
              <ResultStat label={s.material} value={formatRM(result.materialsTotal)} sub={s.materialSub} />
              <ResultStat label={s.discount} value={result.discountAmount > 0 ? `−${formatRM(result.discountAmount)}` : s.discountNone} sub={result.discountAmount > 0 ? `${result.discount.pct}% OFF` : s.discountSub} />
              <ResultStat label={s.grandTotal} value={formatRM(result.grandTotal)} sub={units > 1 ? `${formatRM(result.perUnitTotal)} ${s.perUnit}` : s.for1Unit} />
            </div>

            {/* Line-item breakdown */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-sky-100 mb-3">{s.breakdown}</p>
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
                    <span className="text-emerald-200 font-bold">{discountLabel}</span>
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
                <FaWhatsapp className="h-4 w-4" /> {s.confirmedQuote}
              </a>
              <button
                type="button"
                onClick={() => { setShowResult(false); trackToolUse("installation-cost-calculator", { action: "reset" }); }}
                className="bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all cursor-pointer"
              >
                ↺ {s.startOver}
              </button>
            </div>
          </div>
        )}
      </div>

      <CalcNote>{s.note}</CalcNote>
    </CalcCard>
  );
}
