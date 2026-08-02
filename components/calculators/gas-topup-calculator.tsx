// ─────────────────────────────────────────────────────────────────────────
// Gas Top-up Cost Estimator — HP + gas type + estimated gas condition +
// units → estimated cost range, always with the on-site inspection note.
// Trilingual (en/ms/zh).
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

type Lang = "en" | "ms" | "zh";

const HP_OPTIONS: { value: HpSize; label: string }[] = [
  { value: "1.0", label: "1.0 HP" },
  { value: "1.5", label: "1.5 HP" },
  { value: "2.0", label: "2.0 HP" },
  { value: "2.5", label: "2.5 HP" },
  { value: "3.0", label: "3.0 HP" },
];

const GAS_OPTIONS: Record<Lang, { value: GasType; label: string }[]> = {
  en: [
    { value: "r22", label: "R22 — RM 2.50/PSI (older units)" },
    { value: "r410a", label: "R410A — RM 3.00/PSI (standard)" },
    { value: "r32", label: "R32 — RM 3.00/PSI (newer inverter)" },
  ],
  ms: [
    { value: "r22", label: "R22 — RM 2.50/PSI (unit lama)" },
    { value: "r410a", label: "R410A — RM 3.00/PSI (standard)" },
    { value: "r32", label: "R32 — RM 3.00/PSI (inverter baharu)" },
  ],
  zh: [
    { value: "r22", label: "R22 — 每PSI RM 2.50（旧机型）" },
    { value: "r410a", label: "R410A — 每PSI RM 3.00（标准机型）" },
    { value: "r32", label: "R32 — 每PSI RM 3.00（新型变频）" },
  ],
};

const CONDITION_OPTIONS: Record<Lang, { value: "low" | "medium" | "high"; label: string; sub: string }[]> = {
  en: [
    { value: "low", label: "Slightly Low", sub: "Cooling is a bit weak" },
    { value: "medium", label: "Moderately Low", sub: "Warm air, longer cycles" },
    { value: "high", label: "Very Low", sub: "Barely any cooling" },
  ],
  ms: [
    { value: "low", label: "Sedikit Rendah", sub: "Penyejukan agak lemah" },
    { value: "medium", label: "Sederhana Rendah", sub: "Udara panas, kitaran lama" },
    { value: "high", label: "Sangat Rendah", sub: "Hampir tiada penyejukan" },
  ],
  zh: [
    { value: "low", label: "轻微不足", sub: "制冷稍弱" },
    { value: "medium", label: "中度不足", sub: "吹热风、周期变长" },
    { value: "high", label: "严重不足", sub: "几乎不制冷" },
  ],
};

interface Strings {
  eyebrow: string;
  title: string;
  subtitle: string;
  hpLabel: string;
  gasLabel: string;
  conditionTitle: string;
  conditionLabel: string;
  unitsLabel: string;
  calculate: string;
  resultTitle: string;
  gasType: string;
  psiNeeded: string;
  perUnit: string;
  estTotal: string;
  inspectionNote: string;
  book: string;
  startOver: string;
  note: string;
  waIntro: string;
}

const STRINGS: Record<Lang, Strings> = {
  en: {
    eyebrow: "Free Instant Estimate",
    title: "Gas Top-up Cost Estimator",
    subtitle: "Estimate R22, R410A & R32 gas top-up cost by HP and gas condition. Charged per actual PSI after inspection.",
    hpLabel: "Horsepower (HP)",
    gasLabel: "Gas Type",
    conditionTitle: "Estimated Gas Condition",
    conditionLabel: "How low is the refrigerant?",
    unitsLabel: "Number of Units",
    calculate: "Estimate My Gas Top-up Cost",
    resultTitle: "Estimated Gas Top-up Cost",
    gasType: "Gas Type",
    psiNeeded: "Est. PSI Needed",
    perUnit: "Per Unit",
    estTotal: "Estimated Total",
    inspectionNote: "⚠️ Final gas quantity and charges will be confirmed by the technician after on-site inspection.",
    book: "Book Gas Top-up",
    startOver: "Start Over",
    note: "Published rates: R22 at RM 2.50/PSI, R410A and R32 at RM 3.00/PSI. The estimate assumes a typical PSI shortfall for your HP size; the exact PSI is measured with a manifold gauge during inspection. A leak check is included with every gas top-up — refrigerant never “runs out” on its own, so if it is low, it leaked.",
    waIntro: "I used your Gas Top-up Cost Estimator:",
  },
  ms: {
    eyebrow: "Anggaran Percuma Segera",
    title: "Anggaran Kos Tambah Gas Aircond",
    subtitle: "Anggarkan kos tambah gas R22, R410A & R32 mengikut HP dan keadaan gas. Dicaj mengikut PSI sebenar selepas pemeriksaan.",
    hpLabel: "Kuasa Kuda (HP)",
    gasLabel: "Jenis Gas",
    conditionTitle: "Anggaran Keadaan Gas",
    conditionLabel: "Berapa rendah gas penyejuk?",
    unitsLabel: "Bilangan Unit",
    calculate: "Anggarkan Kos Tambah Gas Saya",
    resultTitle: "Anggaran Kos Tambah Gas",
    gasType: "Jenis Gas",
    psiNeeded: "Anggaran PSI Diperlukan",
    perUnit: "Setiap Unit",
    estTotal: "Anggaran Jumlah",
    inspectionNote: "⚠️ Kuantiti dan caj gas akhir akan disahkan oleh juruteknik selepas pemeriksaan di tapak.",
    book: "Tempah Tambah Gas",
    startOver: "Mula Semula",
    note: "Kadar diterbitkan: R22 pada RM 2.50/PSI, R410A dan R32 pada RM 3.00/PSI. Anggaran mengandaikan kekurangan PSI biasa untuk saiz HP anda; PSI tepat diukur dengan tolok manifold semasa pemeriksaan. Semakan kebocoran disertakan dengan setiap tambah gas — gas penyejuk tidak pernah 'habis' dengan sendirinya, jadi jika rendah, ia bocor.",
    waIntro: "Saya menggunakan Anggaran Kos Tambah Gas anda:",
  },
  zh: {
    eyebrow: "免费即时估价",
    title: "冷气加气费用估算器",
    subtitle: "按匹数和气体状况估算R22、R410A和R32加气费用。按检查后的实际PSI收费。",
    hpLabel: "匹数（HP）",
    gasLabel: "气体类型",
    conditionTitle: "预估气体状况",
    conditionLabel: "冷媒不足程度如何？",
    unitsLabel: "台数",
    calculate: "估算我的加气费用",
    resultTitle: "预计加气费用",
    gasType: "气体类型",
    psiNeeded: "预计所需PSI",
    perUnit: "每台",
    estTotal: "预计总额",
    inspectionNote: "⚠️ 最终加气量和费用将由技术员现场检查后确认。",
    book: "预约加气服务",
    startOver: "重新开始",
    note: "已公布费率：R22每PSI RM 2.50，R410A和R32每PSI RM 3.00。估算假设您的匹数存在典型PSI缺口；实际PSI在检查时用压力表测量。每次加气都附带检漏 — 冷媒不会自行\"用完\"，如果不足，就是泄漏了。",
    waIntro: "我使用了你们的加气费用估算器：",
  },
};

export function GasTopupCalculator({ lang = "en" }: { lang?: Lang }) {
  const s = STRINGS[lang];
  const [hp, setHp] = useState<HpSize>("1.5");
  const [gasType, setGasType] = useState<GasType>("r32");
  const [condition, setCondition] = useState<"low" | "medium" | "high">("medium");
  const [units, setUnits] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const result = calculateGasEstimate({ hp, gasType, condition, units });

  const handleCalculate = () => {
    setShowResult(true);
    trackToolUse("gas-topup-calculator", { hp, gas_type: gasType, condition, units, lang });
  };

  const waMsg = [
    "Hi KL Renovator 👋",
    "",
    s.waIntro,
    "",
    `💨 HP: ${hp} HP`,
    `⛽ Gas / Gas / 气体: ${GAS_LABELS[gasType]}`,
    `📊 Condition / Keadaan / 状况: ${CONDITION_OPTIONS[lang].find((c) => c.value === condition)?.label ?? condition}`,
    `🔢 Units / Unit / 台数: ${units}`,
    "",
    `💰 ${lang === "ms" ? "Anggaran kos" : lang === "zh" ? "预计费用" : "Estimated cost"}: ${formatRM(result.totalMin)} – ${formatRM(result.totalMax)}`,
    "",
    "Please confirm / Sila sahkan / 请确认. 📍 Location / Lokasi / 地点:",
    "",
    "Thank you / Terima kasih / 谢谢!",
  ].join("\n");

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaGasPump className="h-4 w-4" /> {s.eyebrow}
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{s.title}</h2>
        <p className="text-sm text-slate-500 mt-1">{s.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <SelectField label={s.hpLabel} value={hp} onChange={(v) => { setHp(v as HpSize); setShowResult(false); }} options={HP_OPTIONS} />
          <SelectField label={s.gasLabel} value={gasType} onChange={(v) => { setGasType(v as GasType); setShowResult(false); }} options={GAS_OPTIONS[lang]} />
        </div>

        <div>
          <CalcLabel icon={<FaGaugeHigh className="h-4 w-4 text-amber-500" />}>{s.conditionTitle}</CalcLabel>
          <PillGroup label={s.conditionLabel} value={condition} onChange={(v) => { setCondition(v); setShowResult(false); }} options={CONDITION_OPTIONS[lang]} color="amber" />
        </div>

        <NumberFieldUnits label={s.unitsLabel} value={units} onChange={(v) => { setUnits(Math.max(1, Math.min(30, Math.round(v)))); setShowResult(false); }} />

        <CalculateButton onClick={handleCalculate}>{s.calculate}</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">{s.resultTitle}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <ResultStat label={s.gasType} value={result.gasLabel.split(" (")[0]} sub={`${formatRM(result.perPsi)} / PSI`} />
              <ResultStat label={s.psiNeeded} value={`${result.psiMin}–${result.psiMax}`} sub="per unit / setiap unit / 每台" />
              <ResultStat label={s.perUnit} value={`${formatRM(Math.round(result.totalMin / units))}–${formatRM(Math.round(result.totalMax / units))}`} sub={`${units} unit${units > 1 ? "s" : ""}`} />
              <ResultStat label={s.estTotal} value={`${formatRM(result.totalMin)}–${formatRM(result.totalMax)}`} sub="all units / semua unit / 全部台数" />
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 mb-5 text-sm font-semibold">
              {s.inspectionNote}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg text-center"
              >
                <FaWhatsapp className="h-4 w-4" /> {s.book}
              </a>
              <button
                type="button"
                onClick={() => setShowResult(false)}
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

function NumberFieldUnits({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-2">{label}</label>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={1}
        max={30}
        aria-label={label}
        className="w-full max-w-xs px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-base font-bold text-slate-900"
      />
    </div>
  );
}
