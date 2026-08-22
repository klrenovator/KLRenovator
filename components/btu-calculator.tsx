"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaCalculator, FaHome, FaSun, FaUsers, FaRulerCombined, FaShareAlt } from "react-icons/fa";
import { FaRegWindowRestore } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { sitePublic } from "@/config/site-public";
import { trackToolUse } from "@/lib/analytics";
import {
  calculateBtu,
  recommendHpFromBtu,
  heightMultiplier,
  peopleBtu,
  windowsBtu,
} from "@/lib/aircond-math";

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
  windows: string;
  standardHeight: string;
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
  shareResult: string;
  copyLink: string;
  copied: string;
}

const STRINGS: Record<Lang, CalculatorStrings> = {
  en: {
    eyebrow: "BTU Calculator",
    title: ["Find Your Perfect ", "Aircond Size"],
    desc: "Answer 5 quick questions and we'll recommend the exact HP you need — plus the installation cost. No guesswork, no oversizing.",
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
    windows: "Number of Windows",
    standardHeight: "Use standard ceiling height (10 ft)",
    calculate: "Calculate My BTU",
    result: "Your Recommendation",
    recommendedHP: "Recommended HP",
    btuRequired: "BTU Required",
    estimatedCost: "Installation Cost",
    installationFrom: "from",
    bookNow: "Book This Installation",
    disclaimer: "This is an estimate. Actual requirements may vary based on insulation, window size, and other factors. Our technician will confirm during the site survey.",
    whatsappMessage: "Hi KL Renovator, I used your BTU calculator. My room needs approximately {btu} BTU ({hp} HP). I'd like to book an installation. Room: {length}ft x {width}ft, type: {roomType}, sun: {sun}, windows: {windows}.",
    feet: "ft",
    meters: "m",
    people: "people",
    shareResult: "Share Result",
    copyLink: "Copy Link & Share",
    copied: "Copied!",
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
    windows: "Bilangan Tingkap",
    standardHeight: "Guna ketinggian siling standard (10 kaki)",
    calculate: "Kira BTU Saya",
    result: "Cadangan Anda",
    recommendedHP: "HP Disyorkan",
    btuRequired: "BTU Diperlukan",
    estimatedCost: "Kos Pemasangan",
    installationFrom: "dari",
    bookNow: "Tempah Pemasangan Ini",
    disclaimer: "Ini adalah anggaran. Keperluan sebenar mungkin berbeza berdasarkan penebat, saiz tingkap, dan faktor lain. Juruteknik kami akan mengesahkan semasa tinjauan tapak.",
    whatsappMessage: "Hi KL Renovator, saya guna kalkulator BTU anda. Bilik saya perlukan kira-kira {btu} BTU ({hp} HP). Saya ingin menempah pemasangan. Bilik: {length}ka x {width}ka, jenis: {roomType}, matahari: {sun}, tingkap: {windows}.",
    feet: "ka",
    meters: "m",
    people: "orang",
    shareResult: "Kongsi Keputusan",
    copyLink: "Salin Pautan & Kongsi",
    copied: "Disalin!",
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
    windows: "窗户数量",
    standardHeight: "使用标准天花板高度（10英尺）",
    calculate: "计算我的 BTU",
    result: "您的推荐",
    recommendedHP: "推荐匹数",
    btuRequired: "所需 BTU",
    estimatedCost: "安装费用",
    installationFrom: "起价",
    bookNow: "预约此安装",
    disclaimer: "此为估算值。实际需求可能因保温、窗户尺寸和其他因素而异。我们的技术员将在现场勘查时确认。",
    whatsappMessage: "你好 KL Renovator，我使用了你们的 BTU 计算器。我的房间大约需要 {btu} BTU（{hp} 匹）。我想预约安装。房间：{length}英尺 x {width}英尺，类型：{roomType}，阳光：{sun}，窗户：{windows}。",
    feet: "英尺",
    meters: "米",
    people: "人",
    shareResult: "分享结果",
    copyLink: "复制链接并分享",
    copied: "已复制！",
  },
};

export function BtuCalculator({ lang }: { lang: Lang }) {
  const s = STRINGS[lang];

  const [length, setLength] = useState<number>(12);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [useStandardHeight, setUseStandardHeight] = useState<boolean>(true);
  const [roomType, setRoomType] = useState<string>("bedroom");
  const [sunExposure, setSunExposure] = useState<string>("medium");
  const [occupants, setOccupants] = useState<number>(2);
  const [windows, setWindows] = useState<number>(1);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract from query parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const l = params.get("l");
      const w = params.get("w");
      const h = params.get("h");
      const rt = params.get("rt");
      const se = params.get("s");
      const o = params.get("o");
      const c = params.get("c");

      if (l) setLength(Number(l));
      if (w) setWidth(Number(w));
      if (h) setHeight(Number(h));
      if (rt) setRoomType(rt);
      if (se) setSunExposure(se);
      if (o) setOccupants(Number(o));
      if (c === "1" || l || w) {
        setShowResult(true);
      }
    }
  }, []);

  // Effective ceiling height — the site-standard 10 ft unless the user opts out
  const effectiveHeight = useStandardHeight ? 10 : height;

  // Calculate BTU — shared formula from lib/aircond-math (single source of truth)
  const calculateBTU = () => {
    const roomMultiplier = s.roomTypes.find((r) => r.value === roomType)?.multiplier || 1.0;
    const sunMultiplier = s.sunLevels.find((x) => x.value === sunExposure)?.multiplier || 1.0;
    return calculateBtu({
      areaSqft: Math.max(0, length) * Math.max(0, width),
      roomTypeMultiplier: roomMultiplier,
      sunMultiplier,
      heightMultiplier: heightMultiplier(effectiveHeight),
      peopleBTU: peopleBtu(occupants),
      windowsBTU: windowsBtu(windows),
    });
  };

  const btu = calculateBTU();
  const hpRecommendation = recommendHpFromBtu(btu);

  const handleCalculate = () => {
    setShowResult(true);
    trackToolUse("btu-calculator", { action: "calculate", btu, hp: hpRecommendation.hp, windows, standard_height: useStandardHeight });

    // Update URL query parameters
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("l", length.toString());
      params.set("w", width.toString());
      if (!useStandardHeight) params.set("h", height.toString());
      params.set("rt", roomType);
      params.set("s", sunExposure);
      params.set("o", occupants.toString());
      params.set("wd", windows.toString());
      params.set("c", "1");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({ path: newUrl }, "", newUrl);
    }
  };

  const handleShare = async () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    trackToolUse("btu-calculator", { action: "share", url: currentUrl, hp: hpRecommendation.hp });

    if (navigator.share) {
      try {
        await navigator.share({
          title: s.title.join(""),
          text: lang === "ms" 
            ? `Bilik saya perlukan kira-kira ${btu} BTU (${hpRecommendation.hp} HP). Kira BTU anda di sini:`
            : lang === "zh"
            ? `我的房间大约需要 ${btu} BTU（${hpRecommendation.hp} 马力）。在这里计算您的冷气尺寸：`
            : `My room needs approximately ${btu} BTU (${hpRecommendation.hp} HP). Calculate yours here:`,
          url: currentUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share sheet fails or is dismissed
      }
    }

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
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
      .replace("{sun}", sunLabel)
      .replace("{windows}", windows.toString());
    return `https://wa.me/${sitePublic.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  // Generate JSON-LD schemas
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": lang === "ms" 
      ? "Kalkulator BTU KL Renovator" 
      : lang === "zh" 
      ? "KL Renovator BTU 计算器" 
      : "KL Renovator BTU Calculator",
    "url": `https://www.klrenovator.com/${lang === "en" ? "" : lang + "/"}btu-calculator`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "MYR"
    }
  };

  const faqData = lang === "ms" ? [
    {
      q: "1 HP aircond sesuai untuk berapa square feet?",
      a: "Aircond 1 HP (Kuasa Kuda) biasanya sesuai untuk menyejukkan bilik bersaiz 100 hingga 150 kaki persegi. Ia sangat sesuai untuk bilik tidur biasa atau bilik belajar di Malaysia."
    },
    {
      q: "Berapakah saiz bilik yang sesuai untuk aircond 1.5 HP di Malaysia?",
      a: "Aircond 1.5 HP amat sesuai untuk ruang antara 150 hingga 250 kaki persegi. Ia sering digunakan untuk bilik tidur utama yang lebih besar, ruang tamu kecil, atau pejabat rumah."
    },
    {
      q: "Bagaimana cara kira BTU aircond untuk bilik?",
      a: "Formula asasnya ialah Panjang Bilik (kaki) × Lebar Bilik (kaki) × 25 BTU. Anda boleh melaraskan pengiraan ini mengikut jenis bilik, tinggi siling, pendedahan matahari, dan bilangan orang."
    }
  ] : lang === "zh" ? [
    {
      q: "1马力（1 HP）的冷气适合多少平方英尺的房间？",
      a: "一台 1马力（1 HP）的冷气通常适合冷却 100 到 150 平方英尺的房间。这对于马来西亚的标准卧室或书房非常理想。"
    },
    {
      q: "在马来西亚，1.5马力（1.5 HP）冷气适合多大的房间？",
      a: "一台 1.5马力（1.5 HP）的冷气非常适合 150 到 250 平方英尺的房间。它通常用于较大的主卧室、小型客厅或家庭办公室。"
    },
    {
      q: "如何计算房间所需的冷气 BTU？",
      a: "基本公式为：房间长度（英尺）× 房间宽度（英尺）× 25 BTU。您可以根据房间类型（例如厨房需要更多冷却）、阳光照射情况以及房间人数来进行调整。"
    }
  ] : [
    {
      q: "How many square feet can a 1 HP aircond cool?",
      a: "A 1 HP (Horsepower) aircond is typically suitable for cooling a room size of 100 to 150 square feet. This is ideal for standard bedrooms or study rooms in Malaysia."
    },
    {
      q: "What is the perfect room size for a 1.5 HP aircond in Malaysia?",
      a: "A 1.5 HP aircond is perfect for rooms ranging from 150 to 250 square feet. It is commonly used for larger master bedrooms, small living rooms, or home offices."
    },
    {
      q: "How do you calculate BTU for an air conditioner?",
      a: "The basic formula is Room Length (ft) × Room Width (ft) × 25 BTU. You can adjust this by multiplying for room type (bedrooms need less cooling, kitchens need more), sun exposure (west-facing or top floors need extra BTU), and number of occupants."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": lang === "ms"
      ? "Cara Mengira Saiz Aircond (BTU) Yang Sempurna Untuk Bilik Anda"
      : lang === "zh"
      ? "如何为您的房间计算合适的冷气尺寸 (BTU)"
      : "How to Calculate the Right Aircond Size (BTU) for Your Room",
    "step": (lang === "ms" ? [
      "Ukur panjang dan lebar bilik dalam unit kaki.",
      "Darabkan panjang dengan lebar untuk mendapatkan luas bilik dalam kaki persegi.",
      "Darabkan luas bilik dengan 25 untuk mendapatkan BTU asas yang diperlukan.",
      "Laras pengiraan mengikut faktor jenis bilik, tinggi siling, pendedahan matahari, dan bilangan orang.",
      "Padankan jumlah BTU akhir dengan Horsepower (HP) aircond yang disyorkan."
    ] : lang === "zh" ? [
      "以英尺为单位测量房间的长度和宽度。",
      "将长度乘以宽度，计算出房间的平方英尺面积。",
      "将面积乘以 25，得到基础的 BTU 需求。",
      "根据房间类型、挑高天花板、阳光照射和人数等因素进行调整。",
      "将最终的 BTU 与推荐的冷气马力 (HP) 进行匹配。"
    ] : [
      "Measure the length and width of the room in feet.",
      "Multiply length by width to find the room area in square feet.",
      "Multiply the area by 25 to get the base BTU requirement.",
      "Adjust based on factors like room type, high ceilings, sun exposure, and occupants.",
      "Match the final BTU with the recommended Aircond Horsepower (HP)."
    ]).map((stepText, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "text": stepText,
      "name": `${lang === "ms" ? "Langkah" : lang === "zh" ? "步骤" : "Step"} ${idx + 1}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3 flex items-center justify-center gap-2">
                <FaCalculator className="h-4 w-4" /> {s.eyebrow}
              </p>
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
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  {length} × {width} = <strong>{length * width}</strong> sqft
                </p>

                {/* Optional ceiling height */}
                <label className="mt-4 flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useStandardHeight}
                    onChange={(e) => { setUseStandardHeight(e.target.checked); setShowResult(false); }}
                    className="h-4 w-4 accent-sky-600"
                  />
                  <span className="text-sm font-bold text-slate-700">{s.standardHeight} ({s.heightDefault})</span>
                </label>
                {!useStandardHeight && (
                  <div className="mt-3 max-w-[160px]">
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
                )}
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

              {/* Occupants + Windows */}
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
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
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-lg font-bold"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
                    <FaRegWindowRestore className="h-4 w-4 text-sky-600" />
                    {s.windows}
                  </label>
                  <input
                    type="number"
                    value={windows}
                    onChange={(e) => { setWindows(Number(e.target.value)); setShowResult(false); }}
                    min="0"
                    max="10"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-lg font-bold"
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer"
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
                    <p className="text-4xl font-black text-white">RM {hpRecommendation.installFrom}</p>
                    <p className="text-sky-200 text-sm font-bold mt-1">{s.installationFrom}</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
                  <p className="text-xs text-sky-100 font-medium leading-relaxed">
                    <FiCheckCircle className="inline h-4 w-4 mr-2" />
                    {s.disclaimer}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest text-xs sm:text-sm py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-center"
                  >
                    <FaWhatsapp className="inline h-5 w-5 mr-2 align-middle" />
                    {s.bookNow}
                  </a>

                  <button
                    onClick={handleShare}
                    className="block bg-white hover:bg-slate-100 text-sky-700 font-black uppercase tracking-widest text-xs sm:text-sm py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-center cursor-pointer"
                  >
                    <FaShareAlt className="inline h-4 w-4 mr-2 align-middle" />
                    {copied ? s.copied : s.copyLink}
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {/* Visible FAQ & How-To Section for SEO */}
          <Reveal>
            <div className="mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                {lang === "ms" 
                  ? "Panduan Pengiraan BTU & FAQ Aircond" 
                  : lang === "zh" 
                  ? "BTU 计算指南与冷气常见问答" 
                  : "Aircond BTU Calculation Guide & FAQs"}
              </h2>

              {/* How-To Steps */}
              <div className="mb-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-wider flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600 text-sm">✓</span>
                  {lang === "ms"
                    ? "Cara Kira Saiz Aircond (Langkah demi Langkah)"
                    : lang === "zh"
                    ? "冷气马力计算步骤 (Step-by-Step)"
                    : "How to Calculate Aircond Size (Step-by-Step)"}
                </h3>
                <ol className="space-y-4">
                  {(lang === "ms" ? [
                    "Sila ukur panjang dan lebar bilik anda dalam unit kaki (ft).",
                    "Darabkan panjang x lebar untuk mengetahui luas bilik dalam kaki persegi (sqft).",
                    "Darabkan luas bilik tersebut dengan 25 untuk mendapatkan keperluan BTU asas.",
                    "Laras pengiraan mengikut jenis bilik (cth., bilik tidur utama perlukan lebih 10%), pendedahan matahari, tinggi siling, bilangan orang, dan bilangan tingkap.",
                    "Bandingkan jumlah BTU akhir dengan Horsepower (HP) aircond: 9,000 BTU bersamaan dengan 1.0 HP."
                  ] : lang === "zh" ? [
                    "以英尺 (ft) 为单位测量房间的长度和宽度。",
                    "长度乘以宽度得到房间的平方英尺 (sqft) 面积。",
                    "将面积乘以 25，得到所需的基本 BTU 数量。",
                    "根据房间类型（例如主卧室、客厅）、阳光照射程度（西晒等）、天花板高度、人数和窗户数量对计算进行微调。",
                    "将最终的 BTU 数值与冷气马力 (HP) 进行匹配：9,000 BTU 约等于 1.0 HP。"
                  ] : [
                    "Measure your room's length and width in feet (ft).",
                    "Multiply length x width to calculate the room's area in square feet (sqft).",
                    "Multiply the area by 25 to get the base BTU cooling power required.",
                    "Adjust for room type (e.g. master bedrooms need +10%), sun exposure (west-facing rooms), ceiling height, occupants, and number of windows.",
                    "Match your final calculated BTU to the required Horsepower (HP): 9,000 BTU is approx. 1.0 HP."
                  ]).map((stepText, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">{stepText}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQs */}
              <div className="space-y-6">
                {faqData.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h3 className="text-base font-bold text-slate-900 flex gap-2">
                      <span className="text-sky-600 font-extrabold">Q:</span>
                      {faq.q}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed pl-6 border-l-2 border-sky-500">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
