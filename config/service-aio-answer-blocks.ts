export type ServiceAIOLocale = "en" | "ms" | "zh";

export type ServiceAIOFact = {
  label: string;
  value: string;
};

export type ServiceAIOAnswerBlock = {
  taskId: "8.6";
  eyebrow: string;
  heading: string;
  directAnswerLabel: string;
  directAnswer: string;
  facts: ServiceAIOFact[];
  quoteLine: string;
  sourceLine: string;
};

const SERVICE_TIMING: Record<string, Record<ServiceAIOLocale, string>> = {
  "chemical-wash": { en: "60–75 minutes per wall unit", ms: "60–75 minit setiap unit dinding", zh: "每台挂壁机60–75分钟" },
  "chemical-overhaul": { en: "2–3 hours per wall unit", ms: "2–3 jam setiap unit dinding", zh: "每台挂壁机2–3小时" },
  "gas-topup": { en: "30–60 minutes after pressure diagnosis", ms: "30–60 minit selepas diagnosis tekanan", zh: "压力诊断后30–60分钟" },
  repair: { en: "30–90 minutes for common parts", ms: "30–90 minit untuk parts biasa", zh: "常见零件30–90分钟" },
  installation: { en: "2–4 hours for standard wall unit", ms: "2–4 jam untuk unit dinding standard", zh: "标准挂壁机2–4小时" },
  "basic-servicing": { en: "About 45 minutes per unit", ms: "Kira-kira 45 minit setiap unit", zh: "每台约45分钟" },
  "ceiling-cassette": { en: "60–120 minutes depending on access", ms: "60–120 minit bergantung akses", zh: "视通行条件60–120分钟" },
  "dismantling-relocation": { en: "Half-day depending on reinstall scope", ms: "Setengah hari bergantung skop pasang semula", zh: "视重新安装范围约半天" },
  emergency: { en: "30–60 minute rapid dispatch where available", ms: "Dispatch pantas 30–60 minit jika tersedia", zh: "可安排时30–60分钟快速派工" },
};

const SERVICE_BEST_FOR: Record<string, Record<ServiceAIOLocale, string>> = {
  "chemical-wash": { en: "weak airflow, mouldy smell and dirty coils", ms: "airflow lemah, bau hapak dan coil kotor", zh: "风量弱、霉味和盘管肮脏" },
  "chemical-overhaul": { en: "persistent leaks, ice formation and severe blockage", ms: "bocor berulang, ais dan blockage serius", zh: "反复漏水、结冰和严重堵塞" },
  "gas-topup": { en: "low cooling after pressure diagnosis", ms: "cooling lemah selepas diagnosis tekanan", zh: "压力诊断后的制冷不足" },
  repair: { en: "blinking lights, tripping, noise and part faults", ms: "lampu blinking, trip, bunyi dan kerosakan parts", zh: "闪灯、跳电、噪音和零件故障" },
  installation: { en: "new split-unit setup with proper vacuuming", ms: "pasang split-unit baharu dengan vacuum betul", zh: "新分体机安装和正确抽真空" },
  "basic-servicing": { en: "routine maintenance every 3–6 months", ms: "maintenance rutin setiap 3–6 bulan", zh: "每3–6个月例行保养" },
  "ceiling-cassette": { en: "office, shop and commercial cassette units", ms: "unit cassette pejabat, kedai dan komersial", zh: "办公室、店铺和商业卡式机" },
  "dismantling-relocation": { en: "safe removal, moving and reinstallation", ms: "buka, pindah dan pasang semula dengan selamat", zh: "安全拆除、搬迁和重新安装" },
  emergency: { en: "breakdowns, heavy leaks, tripping and urgent no-cooling", ms: "rosak total, bocor teruk, trip dan tiada cooling segera", zh: "故障、严重漏水、跳电和紧急不制冷" },
};

const TEXT = {
  en: {
    eyebrow: "Quick service summary",
    heading: (title: string) => `Quick answer: ${title} in KL & Selangor`,
    directAnswerLabel: "Short answer",
    directAnswer: (title: string, summary: string) => `${title} by KL Renovator is a professional aircond service in Kuala Lumpur and Selangor. ${summary}`,
    facts: {
      price: "Starting price",
      timing: "Typical time",
      bestFor: "Best for",
      warranty: "Warranty",
      coverage: "Coverage",
    },
    warranty: "1-month workmanship warranty",
    coverage: "Kuala Lumpur & Selangor",
    quoteLine: (title: string) => `If you need ${title}, WhatsApp KL Renovator with your location, unit count and photos for a confirmed quote before work starts.`,
    sourceLine: "Answer summary prepared from KL Renovator service scope, pricing table and technician workflow.",
  },
  ms: {
    eyebrow: "Ringkasan servis pantas",
    heading: (title: string) => `Jawapan ringkas: ${title} di KL & Selangor`,
    directAnswerLabel: "Jawapan ringkas",
    directAnswer: (title: string, summary: string) => `${title} oleh KL Renovator ialah servis aircond profesional di Kuala Lumpur dan Selangor. ${summary}`,
    facts: {
      price: "Harga permulaan",
      timing: "Masa biasa",
      bestFor: "Sesuai untuk",
      warranty: "Waranti",
      coverage: "Liputan",
    },
    warranty: "Waranti kerja 1 bulan",
    coverage: "Kuala Lumpur & Selangor",
    quoteLine: (title: string) => `Jika anda perlukan ${title}, WhatsApp KL Renovator dengan lokasi, bilangan unit dan foto untuk sebut harga yang disahkan sebelum kerja bermula.`,
    sourceLine: "Ringkasan jawapan disediakan daripada skop servis, jadual harga dan aliran kerja juruteknik KL Renovator.",
  },
  zh: {
    eyebrow: "快速服务摘要",
    heading: (title: string) => `快速答案：KL与雪兰莪${title}`,
    directAnswerLabel: "简短答案",
    directAnswer: (title: string, summary: string) => `KL Renovator的${title}是吉隆坡与雪兰莪专业冷气服务。${summary}`,
    facts: {
      price: "起步价格",
      timing: "通常时间",
      bestFor: "适合情况",
      warranty: "保修",
      coverage: "覆盖范围",
    },
    warranty: "1个月工艺保修",
    coverage: "吉隆坡与雪兰莪",
    quoteLine: (title: string) => `如果您需要${title}，请WhatsApp KL Renovator发送位置、机器数量和照片，开工前会先确认报价。`,
    sourceLine: "答案摘要根据KL Renovator服务范围、价格表和技师流程整理。",
  },
} as const;

function withCurrency(price: string | number, locale: ServiceAIOLocale) {
  const raw = String(price).trim();
  const normalized = raw.toUpperCase().startsWith("RM") ? raw : `RM ${raw}`;
  if (locale === "zh") return `${normalized}起`;
  if (locale === "ms") return `Dari ${normalized}`;
  return `From ${normalized}`;
}

export function buildServiceAIOAnswerBlock({
  slug,
  locale,
  title,
  summary,
  startPrice,
}: {
  slug: string;
  locale: ServiceAIOLocale;
  title: string;
  summary: string;
  startPrice: string | number;
}): ServiceAIOAnswerBlock {
  const t = TEXT[locale];
  const timing = SERVICE_TIMING[slug]?.[locale] ?? SERVICE_TIMING["basic-servicing"][locale];
  const bestFor = SERVICE_BEST_FOR[slug]?.[locale] ?? SERVICE_BEST_FOR["basic-servicing"][locale];

  return {
    taskId: "8.6",
    eyebrow: t.eyebrow,
    heading: t.heading(title),
    directAnswerLabel: t.directAnswerLabel,
    directAnswer: t.directAnswer(title, summary),
    facts: [
      { label: t.facts.price, value: withCurrency(startPrice, locale) },
      { label: t.facts.timing, value: timing },
      { label: t.facts.bestFor, value: bestFor },
      { label: t.facts.warranty, value: t.warranty },
      { label: t.facts.coverage, value: t.coverage },
    ],
    quoteLine: t.quoteLine(title),
    sourceLine: t.sourceLine,
  };
}
