"use client";

import { useState } from "react";
import { FaWhatsapp, FaCalculator, FaHome, FaSun, FaUsers, FaRulerCombined } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { sitePublic } from "@/config/site-public";

type Lang = "en" | "ms" | "zh";

interface CalculatorStrings {
  eyebrow: string;
  title: string[];
  desc: string;
  roomDimensions: string;
  length: string;
  width: string;
  height: string;
  heightDefault: string;
  roomType: string;
  roomTypes: { value: string; label: string; multiplier: number }[];
  sunExposure: string;
  sunLevels: { value: string; label: string; multiplier: number }[];
  occupants: string;
  calculate: string;
  result: string;
  recommendedHP: string;
  btuRequired: string;
  estimatedCost: string;
  installationFrom: string;
  bookNow: string;
  disclaimer: string;
  whatsappMessage: string;
  feet: string;
  meters: string;
  people: string;
}

const STRINGS: Record<Lang, CalculatorStrings> = {
  en: {
    eyebrow: "BTU Calculator",
    title: ["Find Your Perfect ", "Aircond Size"],
    desc: "Answer 4 quick questions and we'll recommend the exact HP you need — plus the installation cost. No guesswork, no oversizing.",
    roomDimensions: "Room Dimensions",
    length: "Length",
    width: "Width",
    height: "Height",
    heightDefault: "10 (standard)",
    roomType: "Room Type",
    roomTypes: [
      { value: "bedroom", label: "Bedroom", multiplier: 1.0 },
      { value: "master-bedroom", label: "Master Bedroom", multiplier: 1.1 },
      { value: "living-room", label: "Living Room", multiplier: 1.15 },
      { value: "office", label: "Home Office", multiplier: 1.1 },
      { value: "kitchen", label: "Kitchen", multiplier: 1.3 },
      { value: "shop", label: "Shop / Retail", multiplier: 1.25 },
    ],
    sunExposure: "Sun Exposure",
    sunLevels: [
      { value: "low", label: "Low (shaded / north-facing)", multiplier: 1.0 },
      { value: "medium", label: "Medium (partial sun)", multiplier: 1.1 },
      { value: "high", label: "High (west-facing / top floor)", multiplier: 1.25 },
    ],
    occupants: "Number of People",
    calculate: "Calculate My BTU",
    result: "Your Recommendation",
    recommendedHP: "Recommended HP",
    btuRequired: "BTU Required",
    estimatedCost: "Installation Cost",
    installationFrom: "from",
    bookNow: "Book This Installation",
    disclaimer: "This is an estimate. Actual requirements may vary based on insulation, window size, and other factors. Our technician will confirm during the site survey.",
    whatsappMessage: "Hi KL Renovator, I used your BTU calculator. My room needs approximately {btu} BTU ({hp} HP). I'd like to book an installation. Room: {length}ft x {width}ft, type: {roomType}, sun: {sun}.",
    feet: "ft",
    meters: "m",
    people: "people",
  },
  ms: {
    eyebrow: "Kalkulator BTU",
    title: ["Cari Saiz Aircond ", "Yang Sempurna"],
    desc: "Jawab 4 soalan pantas dan kami akan cadangkan HP yang tepat — serta kos pemasangan. Tanpa tekaan, tanpa saiz berlebihan.",
    roomDimensions: "Dimensi Bilik",
    length: "Panjang",
    width: "Lebar",
    height: "Tinggi",
    heightDefault: "10 (standard)",
    roomType: "Jenis Bilik",
    roomTypes: [
      { value: "bedroom", label: "Bilik Tidur", multiplier: 1.0 },
      { value: "master-bedroom", label: "Bilik Tidur Utama", multiplier: 1.1 },
      { value: "living-room", label: "Ruang Tamu", multiplier: 1.15 },
      { value: "office", label: "Pejabat Rumah", multiplier: 1.1 },
      { value: "kitchen", label: "Dapur", multiplier: 1.3 },
      { value: "shop", label: "Kedai / Runcit", multiplier: 1.25 },
    ],
    sunExposure: "Pendedahan Matahari",
    sunLevels: [
      { value: "low", label: "Rendah (teduh / menghadap utara)", multiplier: 1.0 },
      { value: "medium", label: "Sederhana (separa matahari)", multiplier: 1.1 },
      { value: "high", label: "Tinggi (menghadap barat / tingkat atas)", multiplier: 1.25 },
    ],
    occupants: "Bilangan Orang",
    calculate: "Kira BTU Saya",
    result: "Cadangan Anda",
    recommendedHP: "HP Disyorkan",
    btuRequired: "BTU Diperlukan",
    estimatedCost: "Kos Pemasangan",
    installationFrom: "dari",
    bookNow: "Tempah Pemasangan Ini",
    disclaimer: "Ini adalah anggaran. Keperluan sebenar mungkin berbeza berdasarkan penebat, saiz tingkap, dan faktor lain. Juruteknik kami akan mengesahkan semasa tinjauan tapak.",
    whatsappMessage: "Hi KL Renovator, saya guna kalkulator BTU anda. Bilik saya perlukan kira-kira {btu} BTU ({hp} HP). Saya ingin menempah pemasangan. Bilik: {length}ka x {width}ka, jenis: {roomType}, matahari: {sun}.",
    feet: "ka",
    meters: "m",
    people: "orang",
  },
  zh: {
    eyebrow: "BTU 计算器",
    title: ["找到完美的", "冷气尺寸"],
    desc: "回答 4 个快速问题，我们将推荐您需要的确切匹数——以及安装费用。无需猜测，不会过大。",
    roomDimensions: "房间尺寸",
    length: "长度",
    width: "宽度",
    height: "高度",
    heightDefault: "10（标准）",
    roomType: "房间类型",
    roomTypes: [
      { value: "bedroom", label: "卧室", multiplier: 1.0 },
      { value: "master-bedroom", label: "主卧室", multiplier: 1.1 },
      { value: "living-room", label: "客厅", multiplier: 1.15 },
      { value: "office", label: "家庭办公室", multiplier: 1.1 },
      { value: "kitchen", label: "厨房", multiplier: 1.3 },
      { value: "shop", label: "商铺/零售", multiplier: 1.25 },
    ],
    sunExposure: "阳光照射",
    sunLevels: [
      { value: "low", label: "低（阴凉/朝北）", multiplier: 1.0 },
      { value: "medium", label: "中（部分阳光）", multiplier: 1.1 },
      { value: "high", label: "高（朝西/顶楼）", multiplier: 1.25 },
    ],
    occupants: "人数",
    calculate: "计算我的 BTU",
    result: "您的推荐",
    recommendedHP: "推荐匹数",
    btuRequired: "所需 BTU",
    estimatedCost: "安装费用",
    installationFrom: "起价",
    bookNow: "预约此安装",
    disclaimer: "此为估算值。实际需求可能因保温、窗户尺寸和其他因素而异。我们的技术员将在现场勘查时确认。",
    whatsappMessage: "你好 KL Renovator，我使用了你们的 BTU 计算器。我的房间大约需要 {btu} BTU（{hp} 匹）。我想预约安装。房间：{length}英尺 x {width}英尺，类型：{roomType}，阳光：{sun}。",
    feet: "英尺",
    meters: "米",
    people: "人",
  },
};

// HP recommendation table based on BTU
const HP_TABLE = [
  { minBTU: 0, maxBTU: 9000, hp: "1.0", price: 199 },
  { minBTU: 9001, maxBTU: 12000, hp: "1.5", price: 219 },
  { minBTU: 12001, maxBTU: 18000, hp: "2.0", price: 249 },
  { minBTU: 18001, maxBTU: 24000, hp: "2.5", price: 279 },
  { minBTU: 24001, maxBTU: 30000, hp: "3.0", price: 329 },
  { minBTU: 30001, maxBTU: 99999, hp: "3.0+", price: 379 },
];

export function BtuCalculator({ lang }: { lang: Lang }) {
  const s = STRINGS[lang];

  const [length, setLength] = useState<number>(12);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [roomType, setRoomType] = useState<string>("bedroom");
  const [sunExposure, setSunExposure] = useState<string>("medium");
  const [occupants, setOccupants] = useState<number>(2);
  const [showResult, setShowResult] = useState(false);

  // Calculate BTU
  const calculateBTU = () => {
    const area = length * width;
    const baseBTU = area * 25; // 25 BTU per sqft base

    // Room type multiplier
    const roomMultiplier = s.roomTypes.find((r) => r.value === roomType)?.multiplier || 1.0;

    // Sun exposure multiplier
    const sunMultiplier = s.sunLevels.find((s) => s.value === sunExposure)?.multiplier || 1.0;

    // Height adjustment (add 10% per foot above 10ft)
    const heightMultiplier = height > 10 ? 1 + (height - 10) * 0.1 : 1.0;

    // Occupant adjustment (add 600 BTU per person beyond 2)
    const occupantBTU = occupants > 2 ? (occupants - 2) * 600 : 0;

    const totalBTU = Math.round(baseBTU * roomMultiplier * sunMultiplier * heightMultiplier + occupantBTU);
    return totalBTU;
  };

  const btu = calculateBTU();
  const hpRecommendation = HP_TABLE.find((h) => btu >= h.minBTU && btu <= h.maxBTU) || HP_TABLE[HP_TABLE.length - 1];

  const handleCalculate = () => {
    setShowResult(true);
  };

  const getWhatsAppLink = () => {
    const roomTypeLabel = s.roomTypes.find((r) => r.value === roomType)?.label || roomType;
    const sunLabel = s.sunLevels.find((s) => s.value === sunExposure)?.label || sunExposure;
    const message = s.whatsappMessage
      .replace("{btu}", btu.toString())
      .replace("{hp}", hpRecommendation.hp)
      .replace("{length}", length.toString())
      .replace("{width}", width.toString())
      .replace("{roomType}", roomTypeLabel)
      .replace("{sun}", sunLabel);
    return `https://wa.me/${sitePublic.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3 flex items-center justify-center gap-2">
              <FaCalculator className="h-4 w-4" /> {s.eyebrow}
            </p>
            {/* This is the page's primary heading — the three /btu-calculator
                routes (en/ms/zh) previously rendered NO <h1> at all, which
                is a hard SEO problem for a top-of-funnel installation page. */}
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              {s.title[0]}<span className="text-sky-500">{s.title[1]}</span>
            </h1>
            <p className="mt-4 text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              {s.desc}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
            {/* Room Dimensions */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
                <FaRulerCombined className="h-4 w-4 text-sky-600" />
                {s.roomDimensions}
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">{s.length} ({s.feet})</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => { setLength(Number(e.target.value)); setShowResult(false); }}
                    min="5"
                    max="50"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">{s.width} ({s.feet})</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => { setWidth(Number(e.target.value)); setShowResult(false); }}
                    min="5"
                    max="50"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">{s.height} ({s.feet})</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => { setHeight(Number(e.target.value)); setShowResult(false); }}
                    min="8"
                    max="20"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-lg font-bold"
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {length} × {width} = <strong>{length * width}</strong> sqft
              </p>
            </div>

            {/* Room Type */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
                <FaHome className="h-4 w-4 text-sky-600" />
                {s.roomType}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {s.roomTypes.map((room) => (
                  <button
                    key={room.value}
                    onClick={() => { setRoomType(room.value); setShowResult(false); }}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      roomType === room.value
                        ? "bg-sky-600 text-white shadow-lg scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {room.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sun Exposure */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
                <FaSun className="h-4 w-4 text-amber-500" />
                {s.sunExposure}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {s.sunLevels.map((sun) => (
                  <button
                    key={sun.value}
                    onClick={() => { setSunExposure(sun.value); setShowResult(false); }}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      sunExposure === sun.value
                        ? "bg-amber-500 text-white shadow-lg scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {sun.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occupants */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
                <FaUsers className="h-4 w-4 text-sky-600" />
                {s.occupants}
              </label>
              <input
                type="number"
                value={occupants}
                onChange={(e) => { setOccupants(Number(e.target.value)); setShowResult(false); }}
                min="1"
                max="10"
                className="w-full max-w-xs px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-lg font-bold"
              />
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              {s.calculate}
            </button>
          </div>
        </Reveal>

        {/* Result */}
        {showResult && (
          <Reveal>
            <div className="mt-8 bg-gradient-to-br from-sky-600 to-sky-700 rounded-3xl shadow-2xl p-8 sm:p-10 text-white">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6 text-center">
                {s.result}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                  <p className="text-sky-100 text-xs font-bold uppercase tracking-wider mb-2">{s.btuRequired}</p>
                  <p className="text-4xl font-black text-white">{btu.toLocaleString()}</p>
                  <p className="text-sky-200 text-sm font-bold mt-1">BTU</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                  <p className="text-sky-100 text-xs font-bold uppercase tracking-wider mb-2">{s.recommendedHP}</p>
                  <p className="text-4xl font-black text-white">{hpRecommendation.hp}</p>
                  <p className="text-sky-200 text-sm font-bold mt-1">HP</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                  <p className="text-sky-100 text-xs font-bold uppercase tracking-wider mb-2">{s.estimatedCost}</p>
                  <p className="text-4xl font-black text-white">RM {hpRecommendation.price}</p>
                  <p className="text-sky-200 text-sm font-bold mt-1">{s.installationFrom}</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
                <p className="text-xs text-sky-100 font-medium leading-relaxed">
                  <FiCheckCircle className="inline h-4 w-4 mr-2" />
                  {s.disclaimer}
                </p>
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="block w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-center"
              >
                <FaWhatsapp className="inline h-5 w-5 mr-2" />
                {s.bookNow}
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
