// ─────────────────────────────────────────────────────────────────────────
// Monthly Electricity Cost Calculator — HP × usage hours × days × editable
// TNB rate → estimated monthly cost and kWh consumption. Trilingual.
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
import { CalcCard, CalcLabel, CalcNote, CalculateButton, NumberField, PillGroup, ResultStat } from "./ui";

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

interface Strings {
  eyebrow: string;
  title: string;
  subtitle: string;
  sizeTitle: string;
  hpLabel: string;
  usage: string;
  days: string;
  rate: string;
  rateHint: string;
  calculate: string;
  resultTitle: string;
  monthlyCost: string;
  energy: string;
  power: string;
  nonInverter: string;
  tip: string;
  askBill: string;
  compare: string;
  note: string;
  waIntro: string;
  perMonth: string;
}

const STRINGS: Record<Lang, Strings> = {
  en: {
    eyebrow: "Free Instant Estimate",
    title: "Monthly Electricity Cost Calculator",
    subtitle: "Estimate how much your aircond adds to your TNB bill — by HP, usage hours and your actual electricity rate.",
    sizeTitle: "Aircond Size",
    hpLabel: "Horsepower (HP)",
    usage: "Daily Usage",
    days: "Days Per Month",
    rate: "Electricity Rate",
    rateHint: "TNB domestic average ≈ RM 0.509/kWh — edit to match your bill",
    calculate: "Calculate My Monthly Cost",
    resultTitle: "Your Monthly Estimate",
    monthlyCost: "Monthly Cost",
    energy: "Energy Used",
    power: "Power Draw",
    nonInverter: "non-inverter",
    tip: "💡 Tip: a dirty coil makes your aircond run longer and use more electricity. A pressure chemical wash (from RM 120) restores efficiency — and upgrading to an inverter model typically cuts cooling electricity by ~35%.",
    askBill: "Ask About My Bill",
    compare: "Compare Inverter Savings →",
    note: "Estimate uses typical rated power draw per HP (e.g. 1.0 HP ≈ 0.9 kW, 1.5 HP ≈ 1.2 kW, 2.0 HP ≈ 1.7 kW). Actual consumption depends on your model, age, thermostat setting, room size and maintenance condition. For the most accurate figure, check the wattage on your unit's nameplate or your TNB bill. A 1.0–1.5 HP unit running 8 hours/day typically adds RM 100–180/month.",
    waIntro: "I used your Electricity Cost Calculator:",
    perMonth: "per month",
  },
  ms: {
    eyebrow: "Anggaran Percuma Segera",
    title: "Kalkulator Kos Elektrik Bulanan",
    subtitle: "Anggarkan berapa banyak aircond anda menambah bil TNB — mengikut HP, jam penggunaan dan kadar elektrik sebenar anda.",
    sizeTitle: "Saiz Aircond",
    hpLabel: "Kuasa Kuda (HP)",
    usage: "Penggunaan Harian",
    days: "Hari Sebulan",
    rate: "Kadar Elektrik",
    rateHint: "Purata domestik TNB ≈ RM 0.509/kWh — sunting mengikut bil anda",
    calculate: "Kira Kos Bulanan Saya",
    resultTitle: "Anggaran Bulanan Anda",
    monthlyCost: "Kos Bulanan",
    energy: "Tenaga Digunakan",
    power: "Penggunaan Kuasa",
    nonInverter: "bukan inverter",
    tip: "💡 Tip: gegelung kotor membuat aircond anda berjalan lebih lama dan menggunakan lebih elektrik. Cuci kimia tekanan (dari RM 120) memulihkan kecekapan — dan naik taraf model inverter biasanya menjimatkan ~35% elektrik penyejukan.",
    askBill: "Tanya Tentang Bil Saya",
    compare: "Bandingkan Penjimatan Inverter →",
    note: "Anggaran menggunakan kuasa kadar biasa per HP (cth. 1.0 HP ≈ 0.9 kW, 1.5 HP ≈ 1.2 kW, 2.0 HP ≈ 1.7 kW). Penggunaan sebenar bergantung pada model, usia, tetapan termostat, saiz bilik dan keadaan penyelenggaraan. Untuk angka paling tepat, semak watt pada plat nama unit atau bil TNB anda. Unit 1.0–1.5 HP berjalan 8 jam/hari biasanya menambah RM 100–180/bulan.",
    waIntro: "Saya menggunakan Kalkulator Kos Elektrik anda:",
    perMonth: "sebulan",
  },
  zh: {
    eyebrow: "免费即时估价",
    title: "每月电费计算器",
    subtitle: "按匹数、使用小时数和您的实际电费费率，估算冷气每月为国能账单增加多少费用。",
    sizeTitle: "冷气规格",
    hpLabel: "匹数（HP）",
    usage: "每日使用",
    days: "每月天数",
    rate: "电费费率",
    rateHint: "TNB家庭平均≈RM 0.509/千瓦时 — 按您的账单修改",
    calculate: "计算我的每月费用",
    resultTitle: "您的每月估算",
    monthlyCost: "每月费用",
    energy: "用电量",
    power: "运行功率",
    nonInverter: "非变频",
    tip: "💡 提示：盘管脏污会让冷气运行更久、用电更多。压力化学清洗（从RM 120起）可恢复效率 — 升级为变频机型通常可节省约35%的制冷用电。",
    askBill: "咨询我的电费",
    compare: "对比变频节省 →",
    note: "估算使用各匹数的典型额定功率（例如1.0匹≈0.9千瓦、1.5匹≈1.2千瓦、2.0匹≈1.7千瓦）。实际耗电取决于型号、机龄、恒温器设置、房间大小和保养状况。最准确的方法是查看机器铭牌上的功率或您的国能账单。1.0–1.5匹每天运行8小时通常每月增加RM 100–180。",
    waIntro: "我使用了你们的电费计算器：",
    perMonth: "每月",
  },
};

export function ElectricityCalculator({ lang = "en" }: { lang?: Lang }) {
  const s = STRINGS[lang];
  const [hp, setHp] = useState<HpSize>("1.5");
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(30);
  const [rate, setRate] = useState(DEFAULT_ELECTRICITY_RATE);
  const [showResult, setShowResult] = useState(false);

  const monthlyCost = calculateElectricityCost(hp, hours, days, rate);
  const kwh = (HP_WATTAGE[hp] * Math.max(0, hours) * Math.max(0, days)) / 1000;

  const handleCalculate = () => {
    setShowResult(true);
    trackToolUse("electricity-calculator", { hp, hours, days, rate, monthly_cost: Math.round(monthlyCost), lang });
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
    `💰 ${lang === "ms" ? "Anggaran kos bulanan" : lang === "zh" ? "预计每月费用" : "Estimated monthly cost"}: ${formatRM(monthlyCost)} (${Math.round(kwh).toLocaleString()} kWh)`,
    "",
    "My bill seems high — can you advise? 📍 Location / Lokasi / 地点:",
    "",
    "Thank you / Terima kasih / 谢谢!",
  ].join("\n");

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaPlugCircleBolt className="h-4 w-4" /> {s.eyebrow}
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{s.title}</h2>
        <p className="text-sm text-slate-600 mt-1">{s.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div>
          <CalcLabel icon={<FaBolt className="h-4 w-4 text-amber-500" />}>{s.sizeTitle}</CalcLabel>
          <PillGroup label={s.hpLabel} value={hp} onChange={(v) => { setHp(v); setShowResult(false); }} options={HP_OPTIONS} color="amber" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberField label={s.usage} value={hours} onChange={(v) => { setHours(Math.max(0, Math.min(24, v))); setShowResult(false); }} min={0} max={24} suffix="hrs/day" />
          <NumberField label={s.days} value={days} onChange={(v) => { setDays(Math.max(1, Math.min(31, Math.round(v)))); setShowResult(false); }} min={1} max={31} suffix="days" />
          <NumberField label={s.rate} value={rate} onChange={(v) => { setRate(Math.max(0, Math.min(2, v))); setShowResult(false); }} min={0} max={2} step={0.001} suffix="RM/kWh" hint={s.rateHint} />
        </div>

        <CalculateButton onClick={handleCalculate}>{s.calculate}</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">{s.resultTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResultStat label={s.monthlyCost} value={formatRM(monthlyCost)} sub={`RM ${rate.toFixed(3)}/kWh`} />
              <ResultStat label={s.energy} value={`${Math.round(kwh).toLocaleString()} kWh`} sub={s.perMonth} />
              <ResultStat label={s.power} value={`${(HP_WATTAGE[hp] / 1000).toFixed(1)} kW`} sub={`${hp} HP ${s.nonInverter}`} />
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 mb-5 text-sm font-medium text-slate-200">{s.tip}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg text-center"
              >
                <FaWhatsapp className="h-4 w-4" /> {s.askBill}
              </a>
              <a
                href={lang === "en" ? "/aircond-savings-calculator" : `/${lang}/aircond-savings-calculator`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all text-center"
              >
                💰 {s.compare}
              </a>
            </div>
          </div>
        )}
      </div>

      <CalcNote>{s.note}</CalcNote>
    </CalcCard>
  );
}
