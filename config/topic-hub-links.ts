// ─────────────────────────────────────────────────────────────────────────
// Lightweight topic-hub link registry — safe to import from CLIENT
// components (no blog/service configs pulled in).
//
// The heavy per-hub content lives in config/topic-hubs.ts (server-only).
// This file exists so member pages (blog posts, problems, services, tools,
// price guides) can link back to their hub with trilingual labels without
// dragging the whole blog config into a client bundle.
// ─────────────────────────────────────────────────────────────────────────

export type HubLocale = "en" | "ms" | "zh";
export type TopicHubId = "pricing" | "troubleshooting" | "maintenance";

/** EN path of each hub; MS/ZH live at /ms|/zh + path (same slug). */
export const TOPIC_HUB_PATH: Record<TopicHubId, string> = {
  pricing: "/pricing",
  troubleshooting: "/troubleshooting",
  maintenance: "/maintenance",
};

export const TOPIC_HUB_LABEL: Record<TopicHubId, Record<HubLocale, string>> = {
  pricing: { en: "Pricing", ms: "Harga", zh: "价格" },
  troubleshooting: { en: "Troubleshooting", ms: "Penyelesaian Masalah", zh: "故障排查" },
  maintenance: { en: "Maintenance", ms: "Penyelenggaraan", zh: "保养" },
};

export const TOPIC_HUB_TAGLINE: Record<TopicHubId, Record<HubLocale, string>> = {
  pricing: {
    en: "Every aircond price, calculator and cost guide in one place.",
    ms: "Semua harga aircond, kalkulator dan panduan kos di satu tempat.",
    zh: "所有冷气价格、计算器与费用指南汇集一处。",
  },
  troubleshooting: {
    en: "20 problem guides with causes, DIY checks and fix prices.",
    ms: "20 panduan masalah dengan punca, semakan DIY dan harga baiki.",
    zh: "20 篇故障指南：原因、自行检查与维修价格。",
  },
  maintenance: {
    en: "Service frequency, deep cleans and AMC plans explained.",
    ms: "Kekerapan servis, cucian mendalam dan pelan AMC dijelaskan.",
    zh: "保养频率、深度清洗与 AMC 合约详解。",
  },
};

/** CTA label for the member → hub strip. */
export const TOPIC_HUB_CTA: Record<HubLocale, string> = {
  en: "Explore the full hub",
  ms: "Terokai hab penuh",
  zh: "前往完整总览",
};

/**
 * Blog category (English, as stored in config/blog-posts.ts) → hub.
 * Posts outside these categories carry no hub banner.
 */
export const BLOG_CATEGORY_HUB: Record<string, TopicHubId> = {
  "Pricing & Cost Guide": "pricing",
  "Energy Saving": "pricing",
  Troubleshooting: "troubleshooting",
  "Repair Guide": "troubleshooting",
  "Maintenance Guide": "maintenance",
  "Chemical Services": "maintenance",
};

/**
 * Service slug → hub. Maintenance-family services point at /maintenance,
 * repair at /troubleshooting, gas top-up at /pricing.
 */
export const SERVICE_HUB_MAP: Record<string, TopicHubId> = {
  "basic-servicing": "maintenance",
  "chemical-wash": "maintenance",
  "chemical-overhaul": "maintenance",
  "maintenance-contract": "maintenance",
  repair: "troubleshooting",
  "gas-topup": "pricing",
};
