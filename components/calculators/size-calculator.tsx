// ─────────────────────────────────────────────────────────────────────────
// Aircond Size Calculator — room size + room type + usage + heat exposure
// → recommended HP, BTU and suitable aircond capacity. Trilingual.
// ─────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { FaWhatsapp, FaRulerCombined, FaHome, FaSun, FaFire } from "react-icons/fa";
import { waLink } from "@/lib/whatsapp";
import { trackToolUse } from "@/lib/analytics";
import { estimateSizeFromArea, formatRM } from "@/lib/aircond-math";
import { CalcCard, CalcLabel, CalcNote, CalculateButton, NumberField, PillGroup, ResultStat, SelectField } from "./ui";

type Lang = "en" | "ms" | "zh";

const ROOM_TYPES: Record<Lang, { value: string; label: string }[]> = {
  en: [
    { value: "bedroom", label: "Bedroom" },
    { value: "master-bedroom", label: "Master Bedroom" },
    { value: "living-room", label: "Living Room" },
    { value: "office", label: "Home Office" },
    { value: "kitchen", label: "Kitchen" },
    { value: "shop", label: "Shop / Retail" },
  ],
  ms: [
    { value: "bedroom", label: "Bilik Tidur" },
    { value: "master-bedroom", label: "Bilik Tidur Utama" },
    { value: "living-room", label: "Ruang Tamu" },
    { value: "office", label: "Pejabat Rumah" },
    { value: "kitchen", label: "Dapur" },
    { value: "shop", label: "Kedai / Runcit" },
  ],
  zh: [
    { value: "bedroom", label: "卧室" },
    { value: "master-bedroom", label: "主卧室" },
    { value: "living-room", label: "客厅" },
    { value: "office", label: "家庭办公室" },
    { value: "kitchen", label: "厨房" },
    { value: "shop", label: "店铺/零售" },
  ],
};

const USAGE_OPTIONS: Record<Lang, { value: "standard" | "heavy" | "light"; label: string; sub: string }[]> = {
  en: [
    { value: "light", label: "Light", sub: "A few hours a day" },
    { value: "standard", label: "Standard", sub: "6–10 hours a day" },
    { value: "heavy", label: "Heavy", sub: "12+ hours / hot room" },
  ],
  ms: [
    { value: "light", label: "Ringan", sub: "Beberapa jam sehari" },
    { value: "standard", label: "Standard", sub: "6–10 jam sehari" },
    { value: "heavy", label: "Berat", sub: "12+ jam / bilik panas" },
  ],
  zh: [
    { value: "light", label: "轻度", sub: "每天几小时" },
    { value: "standard", label: "标准", sub: "每天6–10小时" },
    { value: "heavy", label: "重度", sub: "12小时以上/炎热房间" },
  ],
};

const HEAT_OPTIONS: Record<Lang, { value: "low" | "medium" | "high"; label: string; sub: string }[]> = {
  en: [
    { value: "low", label: "Low", sub: "Shaded / north-facing" },
    { value: "medium", label: "Medium", sub: "Partial sun" },
    { value: "high", label: "High", sub: "West-facing / top floor" },
  ],
  ms: [
    { value: "low", label: "Rendah", sub: "Teduh / menghadap utara" },
    { value: "medium", label: "Sederhana", sub: "Separa matahari" },
    { value: "high", label: "Tinggi", sub: "Menghadap barat / tingkat atas" },
  ],
  zh: [
    { value: "low", label: "低", sub: "阴凉/朝北" },
    { value: "medium", label: "中", sub: "部分日照" },
    { value: "high", label: "高", sub: "朝西/顶楼" },
  ],
};

interface Strings {
  eyebrow: string;
  title: string;
  subtitle: string;
  roomSize: string;
  length: string;
  width: string;
  roomTypeLabel: string;
  usageTitle: string;
  usageLabel: string;
  heatTitle: string;
  heatLabel: string;
  calculate: string;
  resultTitle: string;
  hpLabel: string;
  hpSub: string;
  btuLabel: string;
  btuSub: string;
  capacityLabel: string;
  capacitySub: string;
  explanation: string;
  getQuote: string;
  detailed: string;
  note: string;
  waIntro: string;
}

const STRINGS: Record<Lang, Strings> = {
  en: {
    eyebrow: "Free Instant Estimate",
    title: "Aircond Size Calculator",
    subtitle: "Room size + type + usage + heat exposure → the right HP, BTU and aircond capacity for your space.",
    roomSize: "Room Size",
    length: "Length",
    width: "Width",
    roomTypeLabel: "Room Type",
    usageTitle: "Usage",
    usageLabel: "How much is the room used?",
    heatTitle: "Heat Exposure",
    heatLabel: "Sun exposure",
    calculate: "Find My Aircond Size",
    resultTitle: "Your Recommended Aircond Size",
    hpLabel: "Recommended HP",
    hpSub: "Horsepower",
    btuLabel: "Recommended BTU",
    btuSub: "British Thermal Units",
    capacityLabel: "Suitable Capacity",
    capacitySub: "standard Malaysian sizing",
    explanation: "A {area} sqft {room} with {usage} usage and {heat} heat exposure needs about {btu} BTU — a {hp} HP aircond is the right size. Sizing correctly saves electricity and cools faster.",
    getQuote: "Get Installation Quote",
    detailed: "Try the Detailed BTU Calculator →",
    note: "Based on the standard Malaysian rule of thumb: ~25 BTU per square foot, adjusted for room type (kitchen/shop need more), usage intensity and heat exposure (west-facing and top-floor rooms need up to 25% more). Oversized units short-cycle and waste electricity; undersized units never cool properly. Our technician confirms the final size during the site survey.",
    waIntro: "I used your Aircond Size Calculator:",
  },
  ms: {
    eyebrow: "Anggaran Percuma Segera",
    title: "Kalkulator Saiz Aircond",
    subtitle: "Saiz bilik + jenis + penggunaan + pendedahan haba → HP, BTU dan kapasiti aircond yang betul untuk ruang anda.",
    roomSize: "Saiz Bilik",
    length: "Panjang",
    width: "Lebar",
    roomTypeLabel: "Jenis Bilik",
    usageTitle: "Penggunaan",
    usageLabel: "Berapa kerap bilik digunakan?",
    heatTitle: "Pendedahan Haba",
    heatLabel: "Pendedahan matahari",
    calculate: "Cari Saiz Aircond Saya",
    resultTitle: "Saiz Aircond Yang Disyorkan",
    hpLabel: "HP Disyorkan",
    hpSub: "Kuasa Kuda",
    btuLabel: "BTU Disyorkan",
    btuSub: "Unit Terma British",
    capacityLabel: "Kapasiti Sesuai",
    capacitySub: "saiz standard Malaysia",
    explanation: "Bilik {area} kaki persegi ({room}) dengan penggunaan {usage} dan pendedahan haba {heat} perlukan kira-kira {btu} BTU — aircond {hp} HP adalah saiz yang betul. Saiz yang tepat menjimatkan elektrik dan menyejuk lebih cepat.",
    getQuote: "Dapatkan Sebut Harga Pemasangan",
    detailed: "Cuba Kalkulator BTU Terperinci →",
    note: "Berdasarkan peraturan praktis standard Malaysia: ~25 BTU per kaki persegi, dilaraskan untuk jenis bilik (dapur/kedai perlukan lebih), intensiti penggunaan dan pendedahan haba (bilik menghadap barat dan tingkat atas perlukan sehingga 25% lebih). Unit terlalu besar kitar pendek dan membazir elektrik; unit terlalu kecil tidak pernah menyejuk dengan betul. Juruteknik kami mengesahkan saiz akhir semasa tinjauan tapak.",
    waIntro: "Saya menggunakan Kalkulator Saiz Aircond anda:",
  },
  zh: {
    eyebrow: "免费即时估价",
    title: "冷气尺寸计算器",
    subtitle: "房间大小 + 类型 + 使用 + 受热 → 为您的空间推荐正确的匹数、BTU和冷气容量。",
    roomSize: "房间尺寸",
    length: "长度",
    width: "宽度",
    roomTypeLabel: "房间类型",
    usageTitle: "使用情况",
    usageLabel: "房间使用频率如何？",
    heatTitle: "受热情况",
    heatLabel: "日照情况",
    calculate: "查找我的冷气尺寸",
    resultTitle: "推荐的冷气尺寸",
    hpLabel: "推荐匹数",
    hpSub: "马力",
    btuLabel: "推荐BTU",
    btuSub: "英制热量单位",
    capacityLabel: "合适容量",
    capacitySub: "马来西亚标准规格",
    explanation: "约{area}平方英尺的{room}，使用强度{usage}、受热{heat}，需要约{btu} BTU — {hp}匹冷气正合适。尺寸选对可省电且制冷更快。",
    getQuote: "获取安装报价",
    detailed: "使用详细BTU计算器 →",
    note: "基于马来西亚标准经验法则：每平方英尺约25 BTU，并根据房间类型（厨房/店铺需要更多）、使用强度和受热情况（朝西和顶楼房间需要多达25%更多）调整。过大的机器频繁启停浪费电；过小的机器永远无法正常制冷。技术员会在现场勘察时确认最终尺寸。",
    waIntro: "我使用了你们的冷气尺寸计算器：",
  },
};

export function SizeCalculator({ lang = "en" }: { lang?: Lang }) {
  const s = STRINGS[lang];
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
      lang,
    });
  };

  const roomLabel = ROOM_TYPES[lang].find((r) => r.value === roomType)?.label ?? roomType;
  const usageLabel = USAGE_OPTIONS[lang].find((u) => u.value === usage)?.label ?? usage;
  const heatLabel = HEAT_OPTIONS[lang].find((h) => h.value === heat)?.label ?? heat;
  const explanation = s.explanation
    .replace("{area}", String(Math.round(areaSqft)))
    .replace("{room}", roomLabel)
    .replace("{usage}", usageLabel)
    .replace("{heat}", heatLabel)
    .replace("{btu}", result.btu.toLocaleString())
    .replace("{hp}", result.recommendation.hp);

  const waMsg = [
    "Hi KL Renovator 👋",
    "",
    s.waIntro,
    "",
    `📏 Room / Bilik / 房间: ${length}ft × ${width}ft (${Math.round(areaSqft)} sqft)`,
    `🏠 Type / Jenis / 类型: ${roomLabel}`,
    `⏱️ Usage / Penggunaan / 使用: ${usageLabel}`,
    `☀️ Heat / Haba / 受热: ${heatLabel}`,
    "",
    `✅ ${lang === "ms" ? "Disyorkan" : lang === "zh" ? "推荐" : "Recommended"}: ${result.recommendation.label} (${result.btu.toLocaleString()} BTU)`,
    `🔧 Installation / Pemasangan / 安装: from RM ${result.recommendation.installFrom}`,
    "",
    "I'd like to book an installation. 📍 Location / Lokasi / 地点:",
    "",
    "Thank you / Terima kasih / 谢谢!",
  ].join("\n");

  return (
    <CalcCard>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center gap-2">
          <FaHome className="h-4 w-4" /> {s.eyebrow}
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{s.title}</h2>
        <p className="text-sm text-slate-600 mt-1">{s.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div>
          <CalcLabel icon={<FaRulerCombined className="h-4 w-4 text-sky-600" />}>{s.roomSize}</CalcLabel>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label={s.length} value={length} onChange={(v) => { setLength(Math.max(3, Math.min(100, v))); setShowResult(false); }} min={3} max={100} suffix="ft" />
            <NumberField label={s.width} value={width} onChange={(v) => { setWidth(Math.max(3, Math.min(100, v))); setShowResult(false); }} min={3} max={100} suffix="ft" />
          </div>
          <p className="mt-2 text-xs text-slate-600">
            {length} × {width} = <strong>{Math.round(areaSqft)} sqft</strong>
          </p>
        </div>

        <SelectField label={s.roomTypeLabel} value={roomType} onChange={(v) => { setRoomType(v); setShowResult(false); }} options={ROOM_TYPES[lang]} />

        <div>
          <CalcLabel icon={<FaFire className="h-4 w-4 text-orange-500" />}>{s.usageTitle}</CalcLabel>
          <PillGroup label={s.usageLabel} value={usage} onChange={(v) => { setUsage(v); setShowResult(false); }} options={USAGE_OPTIONS[lang]} color="sky" />
        </div>

        <div>
          <CalcLabel icon={<FaSun className="h-4 w-4 text-amber-500" />}>{s.heatTitle}</CalcLabel>
          <PillGroup label={s.heatLabel} value={heat} onChange={(v) => { setHeat(v); setShowResult(false); }} options={HEAT_OPTIONS[lang]} color="amber" />
        </div>

        <CalculateButton onClick={handleCalculate}>{s.calculate}</CalculateButton>

        {showResult && (
          <div className="mt-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight mb-5">{s.resultTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResultStat label={s.hpLabel} value={result.recommendation.hp} sub={s.hpSub} />
              <ResultStat label={s.btuLabel} value={result.btu.toLocaleString()} sub={s.btuSub} />
              <ResultStat label={s.capacityLabel} value={result.capacityLabel} sub={s.capacitySub} />
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 mb-5 text-sm font-medium">
              📐 {explanation}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg text-center"
              >
                <FaWhatsapp className="h-4 w-4" /> {s.getQuote}
              </a>
              <a
                href={lang === "en" ? "/btu-calculator" : `/${lang}/btu-calculator`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 rounded-xl transition-all text-center"
              >
                📐 {s.detailed}
              </a>
            </div>
          </div>
        )}
      </div>

      <CalcNote>{s.note}</CalcNote>
    </CalcCard>
  );
}
