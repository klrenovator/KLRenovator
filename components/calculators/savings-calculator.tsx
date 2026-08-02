// ─────────────────────────────────────────────────────────────────────────
// Inverter Savings Calculator — old non-inverter vs new inverter aircond:
// monthly savings, yearly savings, payback period. Visual results.
// Trilingual (en/ms/zh).
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
import { CalcCard, CalcLabel, CalcNote, CalculateButton, NumberField, PillGroup, ResultStat } from "./ui";

type Lang = "en" | "ms" | "zh";

const HP_OPTIONS: { value: HpSize; label: string }[] = [
  { value: "1.0", label: "1.0 HP" },
  { value: "1.5", label: "1.5 HP" },
  { value: "2.0", label: "2.0 HP" },
  { value: "2.5", label: "2.5 HP" },
  { value: "3.0", label: "3.0 HP" },
];

interface Strings {
  eyebrow: string;
  title: string;
  subtitle: string;
  yourAc: string;
  hpLabel: string;
  usage: string;
  days: string;
  rate: string;
  rateHint: string;
  premium: string;
  premiumHint: string;
  calculate: string;
  resultTitle: string;
  monthly: string;
  monthlySub: string;
  yearly: string;
  yearlySub: string;
  payback: string;
  paybackSub: string;
  elecTitle: string;
  oldLabel: string;
  newLabel: string;
  paybackText: string;
  paybackText2: string;
  discuss: string;
  installCost: string;
  note: string;
  waIntro: string;
}

const STRINGS: Record<Lang, Strings> = {
  en: {
    eyebrow: "Free Instant Estimate",
    title: "Inverter vs Non-Inverter Savings Calculator",
    subtitle: "Compare your old non-inverter aircond with a new inverter unit — monthly savings, yearly savings and payback period.",
    yourAc: "Your Aircond",
    hpLabel: "Horsepower (HP)",
    usage: "Daily Usage",
    days: "Days Per Month",
    rate: "Electricity Rate",
    rateHint: "TNB domestic average ≈ RM 0.509/kWh",
    premium: "Inverter Price Difference (premium vs non-inverter)",
    premiumHint: "Typical market premium for the same HP. KL Renovator installs the unit you buy — this is not our pricing.",
    calculate: "Calculate My Savings",
    resultTitle: "Your Savings with Inverter",
    monthly: "Monthly Savings",
    monthlySub: "less electricity",
    yearly: "Yearly Savings",
    yearlySub: "RM 12 × monthly",
    payback: "Payback Period",
    paybackSub: "premium",
    elecTitle: "Electricity Used Per Month",
    oldLabel: "Old Non-Inverter",
    newLabel: "New Inverter",
    paybackText: "The {premium} price difference pays for itself in about {years} years — after that, the inverter unit saves you {yearly} every year.",
    paybackText2: "Enter your usage and premium to see the payback period.",
    discuss: "Discuss Upgrade",
    installCost: "Installation Cost →",
    note: "Inverter airconds typically use ~35% less electricity than non-inverter units in Malaysian conditions (industry estimate; actual savings depend on runtime pattern, room heat load and usage temperature). The price premium is the typical market difference for the same HP — editable so you can use the exact quote you received. This calculator estimates electricity only; it does not include servicing or repair costs.",
    waIntro: "I used your Inverter Savings Calculator:",
  },
  ms: {
    eyebrow: "Anggaran Percuma Segera",
    title: "Kalkulator Penjimatan Inverter vs Bukan Inverter",
    subtitle: "Bandingkan aircond bukan inverter lama anda dengan unit inverter baharu — penjimatan bulanan, tahunan dan tempoh pulangan.",
    yourAc: "Aircond Anda",
    hpLabel: "Kuasa Kuda (HP)",
    usage: "Penggunaan Harian",
    days: "Hari Sebulan",
    rate: "Kadar Elektrik",
    rateHint: "Purata domestik TNB ≈ RM 0.509/kWh",
    premium: "Perbezaan Harga Inverter (premium vs bukan inverter)",
    premiumHint: "Premium pasaran biasa untuk HP yang sama. KL Renovator memasang unit yang anda beli — ini bukan harga kami.",
    calculate: "Kira Penjimatan Saya",
    resultTitle: "Penjimatan Anda dengan Inverter",
    monthly: "Penjimatan Bulanan",
    monthlySub: "kurang elektrik",
    yearly: "Penjimatan Tahunan",
    yearlySub: "RM 12 × bulanan",
    payback: "Tempoh Pulangan",
    paybackSub: "premium",
    elecTitle: "Elektrik Digunakan Sebulan",
    oldLabel: "Bukan Inverter Lama",
    newLabel: "Inverter Baharu",
    paybackText: "Perbezaan harga {premium} pulang modal dalam kira-kira {years} tahun — selepas itu, unit inverter menjimatkan {yearly} setiap tahun.",
    paybackText2: "Masukkan penggunaan dan premium anda untuk melihat tempoh pulangan.",
    discuss: "Bincang Naik Taraf",
    installCost: "Kos Pemasangan →",
    note: "Aircond inverter biasanya menggunakan ~35% kurang elektrik daripada unit bukan inverter dalam keadaan Malaysia (anggaran industri; penjimatan sebenar bergantung pada corak penggunaan, beban haba bilik dan suhu penggunaan). Premium harga ialah perbezaan pasaran biasa untuk HP yang sama — boleh disunting supaya anda boleh menggunakan sebut harga tepat yang diterima. Kalkulator ini menganggarkan elektrik sahaja; ia tidak termasuk kos servis atau pembaikan.",
    waIntro: "Saya menggunakan Kalkulator Penjimatan Inverter anda:",
  },
  zh: {
    eyebrow: "免费即时估价",
    title: "变频 vs 非变频节省计算器",
    subtitle: "对比您的旧非变频冷气与新型变频机 — 每月节省、每年节省和回本周期。",
    yourAc: "您的冷气",
    hpLabel: "匹数（HP）",
    usage: "每日使用",
    days: "每月天数",
    rate: "电费费率",
    rateHint: "TNB家庭平均≈RM 0.509/千瓦时",
    premium: "变频机差价（变频 vs 非变频）",
    premiumHint: "同匹数的典型市场溢价。KL Renovator负责安装您购买的机器 — 这不是我们的定价。",
    calculate: "计算我的节省",
    resultTitle: "变频带来的节省",
    monthly: "每月节省",
    monthlySub: "用电更少",
    yearly: "每年节省",
    yearlySub: "每月×12",
    payback: "回本周期",
    paybackSub: "差价",
    elecTitle: "每月用电量",
    oldLabel: "旧非变频机",
    newLabel: "新型变频机",
    paybackText: "{premium}的差价约{years}年回本 — 之后，变频机每年为您节省{yearly}。",
    paybackText2: "输入使用情况和差价以查看回本周期。",
    discuss: "咨询升级",
    installCost: "安装费用 →",
    note: "在马来西亚条件下，变频冷气通常比非变频机节省约35%用电（行业估算；实际节省取决于运行模式、房间热负荷和使用温度）。价格溢价是同匹数的典型市场差价 — 可编辑，以便使用您收到的确切报价。此计算器仅估算电费；不包括保养或维修费用。",
    waIntro: "我使用了你们的变频节省计算器：",
  },
};

export function SavingsCalculator({ lang = "en" }: { lang?: Lang }) {
  const s = STRINGS[lang];
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
      lang,
    });
  };

  const waMsg = [
    "Hi KL Renovator 👋",
    "",
    s.waIntro,
    "",
    `💨 HP: ${hp} HP`,
    `⏱️ Usage / Penggunaan / 使用: ${hours} hrs/day, ${days} days/month`,
    `⚡ Rate / Kadar / 费率: RM ${rate.toFixed(3)}/kWh`,
    "",
    `💰 ${lang === "ms" ? "Penjimatan bulanan" : lang === "zh" ? "每月节省" : "Monthly savings"}: ${formatRM(result.monthlySavingsRm)}`,
    `📅 ${lang === "ms" ? "Tahunan" : lang === "zh" ? "每年" : "Yearly"}: ${formatRM(result.yearlySavingsRm)}`,
    `⏳ ${lang === "ms" ? "Pulangan" : lang === "zh" ? "回本" : "Payback"}: ${result.paybackYears} years / tahun / 年`,
    "",
    "I'd like to discuss upgrading to an inverter. 📍 Location / Lokasi / 地点:",
    "",
    "Thank you / Terima kasih / 谢谢!",
  ].join("\n");

  const paybackLine = Number.isFinite(result.paybackMonths)
    ? s.paybackText
        .replace("{premium}", formatRM(premium))
        .replace("{years}", result.paybackYears)
        .replace("{yearly}", formatRM(result.yearlySavingsRm))
    : s.paybackText2;

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaPiggyBank className="h-4 w-4" /> {s.eyebrow}
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{s.title}</h2>
        <p className="text-sm text-slate-500 mt-1">{s.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div>
          <CalcLabel icon={<FaArrowTrendUp className="h-4 w-4 text-emerald-600" />}>{s.yourAc}</CalcLabel>
          <PillGroup label={s.hpLabel} value={hp} onChange={(v) => { setHp(v); setPremium(defaultInverterPremium(v)); setShowResult(false); }} options={HP_OPTIONS} color="emerald" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberField label={s.usage} value={hours} onChange={(v) => { setHours(Math.max(0, Math.min(24, v))); setShowResult(false); }} min={0} max={24} suffix="hrs/day" />
          <NumberField label={s.days} value={days} onChange={(v) => { setDays(Math.max(1, Math.min(31, Math.round(v)))); setShowResult(false); }} min={1} max={31} suffix="days" />
          <NumberField label={s.rate} value={rate} onChange={(v) => { setRate(Math.max(0, Math.min(2, v))); setShowResult(false); }} min={0} max={2} step={0.001} suffix="RM/kWh" hint={s.rateHint} />
        </div>

        <NumberField
          label={s.premium}
          value={premium}
          onChange={(v) => { setPremium(Math.max(0, Math.min(20000, v))); setShowResult(false); }}
          min={0}
          max={20000}
          suffix="RM"
          hint={s.premiumHint}
        />

        <CalculateButton onClick={handleCalculate} color="emerald">{s.calculate}</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">{s.resultTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResultStat label={s.monthly} value={formatRM(result.monthlySavingsRm)} sub={`${result.savingsPct}% ${s.monthlySub}`} />
              <ResultStat label={s.yearly} value={formatRM(result.yearlySavingsRm)} sub={s.yearlySub} />
              <ResultStat label={s.payback} value={Number.isFinite(result.paybackMonths) ? `${result.paybackYears} years / tahun / 年` : "—"} sub={`${formatRM(premium)} ${s.paybackSub}`} />
            </div>

            {/* Visual comparison bars */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 mb-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-emerald-100 mb-4">{s.elecTitle}</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-50">{s.oldLabel}</span>
                    <span className="text-white">{Math.round(result.oldMonthlyKwh).toLocaleString()} kWh</span>
                  </div>
                  <div className="h-3.5 rounded-full bg-white/25 overflow-hidden">
                    <div className="h-full rounded-full bg-white/80" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-50">{s.newLabel}</span>
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
              {paybackLine}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg text-center"
              >
                <FaWhatsapp className="h-4 w-4" /> {s.discuss}
              </a>
              <a
                href={lang === "en" ? "/aircond-installation-cost-calculator" : `/${lang}/aircond-installation-cost-calculator`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all text-center"
              >
                🔧 {s.installCost}
              </a>
            </div>
          </div>
        )}
      </div>

      <CalcNote>{s.note}</CalcNote>
    </CalcCard>
  );
}
