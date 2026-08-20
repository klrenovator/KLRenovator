// ─────────────────────────────────────────────────────────────────────────
// Topic-cluster hub data — /pricing, /troubleshooting and /maintenance
// (EN/MS/ZH twins), modelled on config/installation-hub.ts.
//
// Issue #66: the site had installation as its only true cluster hub. Pricing
// (42 assets), troubleshooting (35 assets) and maintenance (32 assets) had no
// canonical entry point. This file is the single source of truth for the
// three new hubs: authored trilingual copy, curated group cards, comparison
// tables, FAQs and the cluster-member index.
//
// Member links are DERIVED from the existing configs (blog-posts, tools,
// services, site/problems) so a hub can never point at a stale slug or a
// page that no longer exists. Only the curated group cards and the copy are
// authored here.
// ─────────────────────────────────────────────────────────────────────────

import { allPosts, type BlogPost } from "./blog-posts";
import { TOOLS, type ToolInfo } from "./tools";
import { siteConfig } from "./site";
import { serviceI18n } from "./services-i18n";
import { publishedPrices } from "@/lib/published-prices";

export type HubLocale = "en" | "ms" | "zh";
export type TopicHubId = "pricing" | "troubleshooting" | "maintenance";

export type HubLink = {
  /** Full path including locale prefix. */
  href: Record<HubLocale, string>;
  label: Record<HubLocale, string>;
  blurb: Record<HubLocale, string>;
  price?: string;
};

export type HubGroup = {
  id: string;
  accent: "sky" | "emerald" | "amber" | "violet";
  eyebrow: Record<HubLocale, string>;
  title: Record<HubLocale, string>;
  links: HubLink[];
};

export type HubTable = {
  title: Record<HubLocale, string>;
  intro: Record<HubLocale, string>;
  headers: Record<HubLocale, string[]>;
  rows: { cells: Record<HubLocale, string[]> }[];
};

export type HubFaq = { q: string; a: string };

export type HubCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  badges: string[];
  tableTitle: string;
  tableIntro: string;
  editorialTitle: string;
  editorialBody: string[];
  /** Question-style H2 immediately followed by a 15–120 word answer paragraph. */
  directQuestion: string;
  directAnswer: string;
  faqs: HubFaq[];
  ctaTitle: string;
  ctaBody: string;
  fullIndexTitle: string;
  relatedTitle: string;
  photos: { eyebrow: string; heading: string; intro: string; heroTitle: string; heroAlt: string };
};

export type TopicHub = {
  id: TopicHubId;
  /** EN path of the hub, e.g. "/pricing". MS/ZH live at /ms|/zh + path. */
  slug: string;
  groups: HubGroup[];
  table: HubTable;
  copy: Record<HubLocale, HubCopy>;
  members: {
    blog: string[];
    tools: string[];
    problems: string[];
    services: string[];
  };
};

// ─────────────────────────────────────────────────────────────────────────
// Helper: full path for a hub in a locale.
// ─────────────────────────────────────────────────────────────────────────
export function hubPath(id: TopicHubId, locale: HubLocale): string {
  const slug = TOPIC_HUBS[id].slug;
  return locale === "en" ? slug : `/${locale}${slug}`;
}

// ─────────────────────────────────────────────────────────────────────────
// Derived member link builders — labels/blurbs always come from the real
// configs so translations stay in sync and slugs never rot.
// ─────────────────────────────────────────────────────────────────────────

function blogLink(p: BlogPost, locale: HubLocale): HubLink {
  return {
    href: { en: `/blog/${p.slug}`, ms: `/ms/blog/${p.slug}`, zh: `/zh/blog/${p.slug}` },
    label: { en: p.title, ms: p.titleMS, zh: p.titleZH },
    blurb: { en: p.excerpt, ms: p.excerptMS, zh: p.excerptZH },
  };
}

function toolLink(t: ToolInfo, locale: HubLocale): HubLink {
  return {
    href: { en: t.slug, ms: `/ms${t.slug}`, zh: `/zh${t.slug}` },
    label: { en: t.title, ms: t.titleMS, zh: t.titleZH },
    blurb: { en: t.desc, ms: t.descMS, zh: t.descZH },
  };
}

const AMC_LABEL: Record<HubLocale, string> = {
  en: "Aircond Maintenance Contract (AMC)",
  ms: "Kontrak Penyelenggaraan Aircond (AMC)",
  zh: "冷气保养合约（AMC）",
};

const AMC_BLURB: Record<HubLocale, string> = {
  en: "Annual plans from RM 299 — scheduled servicing, priority response and locked-in pricing.",
  ms: "Pelan tahunan dari RM 299 — servis berjadual, respons keutamaan dan harga terkunci.",
  zh: "每年 RM 299 起的年度合约 — 定期上门、优先响应与价格锁定。",
};

function serviceLink(slug: string, locale: HubLocale): HubLink {
  const s = siteConfig.services.find((x) => x.slug === slug);
  const i18n = serviceI18n[slug];
  const i18nTitle = i18n ? { ms: i18n.titleMS, zh: i18n.titleZH } : null;
  const i18nTagline = i18n
    ? { ms: i18n.taglineMS, zh: i18n.taglineZH }
    : null;
  return {
    href: { en: `/services/${slug}`, ms: `/ms/services/${slug}`, zh: `/zh/services/${slug}` },
    label: {
      en: s?.title ?? AMC_LABEL.en,
      ms: i18nTitle?.ms ?? AMC_LABEL.ms,
      zh: i18nTitle?.zh ?? AMC_LABEL.zh,
    },
    blurb: {
      en: s?.short ?? AMC_BLURB.en,
      ms: i18nTagline?.ms ?? AMC_BLURB.ms,
      zh: i18nTagline?.zh ?? AMC_BLURB.zh,
    },
  };
}

function problemLink(slug: string, locale: HubLocale): HubLink {
  const p = siteConfig.problemPages.find((x) => x.slug === slug);
  if (!p) throw new Error(`topic-hubs: unknown problem slug "${slug}"`);
  return {
    href: { en: `/problems/${slug}`, ms: `/ms/problems/${slug}`, zh: `/zh/problems/${slug}` },
    label: { en: p.name, ms: p.nameMS, zh: p.nameZH },
    blurb: { en: p.description, ms: p.descriptionMS, zh: p.descriptionZH },
  };
}

/** Resolve a hub's full cluster-member index as links (hub → members). */
export function resolveHubMembers(hub: TopicHub, locale: HubLocale): HubLink[] {
  const out: HubLink[] = [];
  for (const slug of hub.members.blog) {
    const p = allPosts.find((x) => x.slug === slug);
    if (!p) throw new Error(`topic-hubs: unknown blog slug "${slug}"`);
    out.push(blogLink(p, locale));
  }
  for (const slug of hub.members.tools) {
    const t = TOOLS.find((x) => x.slug === slug);
    if (!t) throw new Error(`topic-hubs: unknown tool slug "${slug}"`);
    out.push(toolLink(t, locale));
  }
  for (const slug of hub.members.problems) out.push(problemLink(slug, locale));
  for (const slug of hub.members.services) out.push(serviceLink(slug, locale));
  return out;
}

// ─────────────────────────────────────────────────────────────────────────
// 1 · PRICING HUB
// ─────────────────────────────────────────────────────────────────────────

const PRICING_GROUPS: HubGroup[] = [
  {
    id: "by-service",
    accent: "sky",
    eyebrow: { en: "Cleaning & Gas", ms: "Pembersihan & Gas", zh: "清洗与加气" },
    title: { en: "Service Prices by Type", ms: "Harga Servis Mengikut Jenis", zh: "各类保养价格" },
    links: [
      {
        href: { en: "/services/basic-servicing", ms: "/ms/services/basic-servicing", zh: "/zh/services/basic-servicing" },
        label: { en: "Basic Servicing", ms: "Servis Asas", zh: "基本保养" },
        blurb: {
          en: "45-minute filter wash, drain flush and 8-point electrical & cooling check.",
          ms: "Cuci penapis 45 minit, bilas saliran dan semakan 8 titik elektrik & penyejukan.",
          zh: "45 分钟滤网清洗、排水管冲洗与 8 点电气及制冷检查。",
        },
        price: publishedPrices.basic15,
      },
      {
        href: { en: "/services/chemical-wash", ms: "/ms/services/chemical-wash", zh: "/zh/services/chemical-wash" },
        label: { en: "Pressure Chemical Wash", ms: "Cuci Kimia Bertekanan", zh: "高压化学清洗" },
        blurb: {
          en: "80–120 PSI deep clean of coil fins and blower wheel for mould & biofilm.",
          ms: "Cucian dalam 80–120 PSI sirip gegelung dan roda blower untuk kulat & biofilm.",
          zh: "80–120 PSI 高压深入清洁盘管翅片与风轮，去除霉菌与生物膜。",
        },
        price: publishedPrices.chemicalWash15,
      },
      {
        href: { en: "/services/chemical-overhaul", ms: "/ms/services/chemical-overhaul", zh: "/zh/services/chemical-overhaul" },
        label: { en: "Chemical Overhaul", ms: "Chemical Overhaul", zh: "化学大修" },
        blurb: {
          en: "Full dismantle and soak for units with severe leaks, ice or blockage.",
          ms: "Buka penuh dan rendam untuk unit dengan kebocoran, ais atau sekatan teruk.",
          zh: "整机拆解浸泡，针对严重漏水、结冰或堵塞的机器。",
        },
        price: publishedPrices.overhaul15,
      },
      {
        href: { en: "/services/gas-topup", ms: "/ms/services/gas-topup", zh: "/zh/services/gas-topup" },
        label: { en: "Gas Top-Up (R22 / R410A / R32)", ms: "Tambah Gas (R22 / R410A / R32)", zh: "加气（R22 / R410A / R32）" },
        blurb: {
          en: "Charged per actual PSI after inspection, leak check included.",
          ms: "Dicaj mengikut PSI sebenar selepas pemeriksaan, semakan bocor disertakan.",
          zh: "按检查后的实际 PSI 收费，并附泄漏检查。",
        },
        price: publishedPrices.r22,
      },
    ],
  },
  {
    id: "by-guide",
    accent: "emerald",
    eyebrow: { en: "Price Guides", ms: "Panduan Harga", zh: "价格指南" },
    title: { en: "Read the Full Price Lists", ms: "Baca Senarai Harga Penuh", zh: "查看完整价目" },
    links: [
      {
        href: { en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" },
        label: { en: "Aircond Service Price Malaysia", ms: "Harga Servis Aircond Malaysia", zh: "马来西亚冷气服务价格" },
        blurb: {
          en: "Every service price — cleaning, gas, repair — in one published list.",
          ms: "Semua harga servis — pembersihan, gas, pembaikan — dalam satu senarai diterbitkan.",
          zh: "所有保养价格 — 清洗、加气、维修 — 一览无遗。",
        },
      },
      {
        href: { en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" },
        label: { en: "Installation Price Guide", ms: "Panduan Harga Pemasangan", zh: "安装价格指南" },
        blurb: {
          en: "Every HP size, materials rates, and what counts as an extra.",
          ms: "Setiap saiz HP, kadar bahan, dan apa yang dikira tambahan.",
          zh: "各匹数、材料费率，以及哪些属于额外收费。",
        },
        price: publishedPrices.installWall15,
      },
      {
        href: { en: "/aircond-installation-cost-calculator", ms: "/ms/aircond-installation-cost-calculator", zh: "/zh/aircond-installation-cost-calculator" },
        label: { en: "Installation Cost Calculator", ms: "Kalkulator Kos Pemasangan", zh: "安装费用计算器" },
        blurb: {
          en: "Build your exact installation job — labour, pipe, wire, extras.",
          ms: "Bina kerja pemasangan anda — buruh, paip, wayar, tambahan.",
          zh: "估算您的具体安装工程 — 人工、铜管、电线、附加项。",
        },
      },
      {
        href: { en: "/which-aircond-service-do-i-need", ms: "/ms/which-aircond-service-do-i-need", zh: "/zh/which-aircond-service-do-i-need" },
        label: { en: "Which Service Do I Need?", ms: "Servis Mana Yang Saya Perlukan?", zh: "我需要哪种服务？" },
        blurb: {
          en: "4 quick questions to match your symptoms to the right price.",
          ms: "4 soalan pantas untuk memadankan gejala anda dengan harga yang betul.",
          zh: "4 个快速问题，将您的症状对应到合适的服务与价格。",
        },
      },
    ],
  },
  {
    id: "by-repair",
    accent: "amber",
    eyebrow: { en: "Repair & Energy", ms: "Pembaikan & Tenaga", zh: "维修与电费" },
    title: { en: "Repair & Electricity Costs", ms: "Kos Pembaikan & Elektrik", zh: "维修与电费成本" },
    links: [
      {
        href: { en: "/services/repair", ms: "/ms/services/repair", zh: "/zh/services/repair" },
        label: { en: "Troubleshooting & Repairs", ms: "Penyelesaian Masalah & Pembaikan", zh: "故障排查与维修" },
        blurb: {
          en: "Component-level pricing — capacitor, fan motor, PCB, compressor.",
          ms: "Harga peringkat komponen — kapasitor, motor kipas, PCB, pekali.",
          zh: "零件级价格 — 电容器、风扇电机、电路板、压缩机。",
        },
        price: publishedPrices.diagnostic,
      },
      {
        href: { en: "/aircond-electricity-cost-calculator", ms: "/ms/aircond-electricity-cost-calculator", zh: "/zh/aircond-electricity-cost-calculator" },
        label: { en: "Electricity Cost Calculator", ms: "Kalkulator Kos Elektrik", zh: "电费计算器" },
        blurb: {
          en: "See what your aircond actually costs per hour on your TNB bill.",
          ms: "Lihat kos sebenar aircond anda sejam pada bil TNB anda.",
          zh: "查看您的冷气每小时在电费单上的实际花费。",
        },
      },
      {
        href: { en: "/aircond-savings-calculator", ms: "/ms/aircond-savings-calculator", zh: "/zh/aircond-savings-calculator" },
        label: { en: "Inverter Savings Calculator", ms: "Penjimatan Inverter", zh: "变频节省计算器" },
        blurb: {
          en: "Non-inverter vs inverter — monthly savings and payback period.",
          ms: "Bukan inverter vs inverter — penjimatan bulanan dan tempoh pulangan.",
          zh: "定频对比变频 — 每月节省与回本期。",
        },
      },
      {
        href: { en: "/aircond-gas-topup-cost-calculator", ms: "/ms/aircond-gas-topup-cost-calculator", zh: "/zh/aircond-gas-topup-cost-calculator" },
        label: { en: "Gas Top-Up Cost Estimator", ms: "Anggaran Kos Tambah Gas", zh: "加气费用估算器" },
        blurb: {
          en: "Estimate R22 / R410A / R32 refill cost by HP and gas condition.",
          ms: "Anggarkan kos isi semula R22 / R410A / R32 mengikut HP dan keadaan gas.",
          zh: "按匹数与气体状况估算 R22 / R410A / R32 加气费用。",
        },
      },
    ],
  },
  {
    id: "by-sizing",
    accent: "violet",
    eyebrow: { en: "Sizing & Planning", ms: "Saiz & Perancangan", zh: "匹数与规划" },
    title: { en: "Size Your Unit Before You Pay", ms: "Tentukan Saiz Sebelum Membayar", zh: "先选对匹数再花钱" },
    links: [
      {
        href: { en: "/btu-calculator", ms: "/ms/btu-calculator", zh: "/zh/btu-calculator" },
        label: { en: "BTU Calculator", ms: "Kalkulator BTU", zh: "BTU 计算器" },
        blurb: {
          en: "Room dimensions, sun exposure, people & windows → exact BTU.",
          ms: "Dimensi bilik, cahaya matahari, orang & tingkap → BTU tepat.",
          zh: "房间尺寸、日照、人数与窗户 → 精确 BTU。",
        },
      },
      {
        href: { en: "/aircond-size-calculator", ms: "/ms/aircond-size-calculator", zh: "/zh/aircond-size-calculator" },
        label: { en: "Aircond Size Calculator", ms: "Kalkulator Saiz Aircond", zh: "冷气尺寸计算器" },
        blurb: {
          en: "Room type, usage and heat exposure → recommended HP capacity.",
          ms: "Jenis bilik, penggunaan dan pendedahan haba → kapasiti HP disyorkan.",
          zh: "房间类型、使用与受热 → 推荐匹数容量。",
        },
      },
      {
        href: { en: "/new-home-aircond-installation", ms: "/ms/pemasangan-aircond-rumah-baru", zh: "/zh/new-home-aircond-installation" },
        label: { en: "New Home Package", ms: "Pakej Rumah Baru", zh: "新居配套" },
        blurb: {
          en: "Full-house installation coordinated around your renovation.",
          ms: "Pemasangan seluruh rumah diselaraskan dengan renovasi anda.",
          zh: "整屋安装，配合装修进度安排。",
        },
      },
      {
        href: { en: "/commercial-aircond-installation", ms: "/ms/pemasangan-aircond-komersial", zh: "/zh/commercial-aircond-installation" },
        label: { en: "Commercial & Shoplot", ms: "Komersial & Kedai", zh: "商用与店铺" },
        blurb: {
          en: "Offices, retail, F&B — after-hours installation available.",
          ms: "Pejabat, runcit, F&B — pemasangan selepas waktu tersedia.",
          zh: "办公室、零售、餐饮 — 可安排非营业时间施工。",
        },
      },
    ],
  },
];

const PRICING_TABLE: HubTable = {
  title: {
    en: "Published Aircond Prices at a Glance",
    ms: "Harga Aircond Diterbitkan Sekilas Pandang",
    zh: "已公布冷气价格速览",
  },
  intro: {
    en: "The headline prices below come from KL Renovator's published price list. Extras such as extra copper pipe, brackets or high-rise access are quoted on-site before work begins.",
    ms: "Harga utama di bawah daripada senarai harga KL Renovator yang diterbitkan. Caj tambahan seperti paip kuprum tambahan, bracket atau akses bangunan tinggi disebut harga di tapak sebelum kerja bermula.",
    zh: "以下主要价格取自 KL Renovator 已公布的价目表。额外铜管、支架或高楼作业等附加项目，均在动工前于现场报价并征得同意。",
  },
  headers: {
    en: ["Service", "Published Price"],
    ms: ["Servis", "Harga Diterbitkan"],
    zh: ["服务项目", "公布价格"],
  },
  rows: [
    {
      cells: {
        en: ["Basic Servicing — Wall 1.0–1.5 HP", publishedPrices.basic15],
        ms: ["Servis Asas — Dinding 1.0–1.5 HP", publishedPrices.basic15],
        zh: ["基本保养 — 挂壁式 1.0–1.5 匹", publishedPrices.basic15],
      },
    },
    {
      cells: {
        en: ["Pressure Chemical Wash — Wall 1.0–1.5 HP", publishedPrices.chemicalWash15],
        ms: ["Cuci Kimia Bertekanan — Dinding 1.0–1.5 HP", publishedPrices.chemicalWash15],
        zh: ["高压化学清洗 — 挂壁式 1.0–1.5 匹", publishedPrices.chemicalWash15],
      },
    },
    {
      cells: {
        en: ["Chemical Overhaul — Wall 1.0–1.5 HP", publishedPrices.overhaul15],
        ms: ["Chemical Overhaul — Dinding 1.0–1.5 HP", publishedPrices.overhaul15],
        zh: ["化学大修 — 挂壁式 1.0–1.5 匹", publishedPrices.overhaul15],
      },
    },
    {
      cells: {
        en: ["Gas Top-Up — R32 (per PSI)", publishedPrices.r32],
        ms: ["Tambah Gas — R32 (setiap PSI)", publishedPrices.r32],
        zh: ["加气 — R32（每 PSI）", publishedPrices.r32],
      },
    },
    {
      cells: {
        en: ["Gas Leak Repair", publishedPrices.gasLeakRepair],
        ms: ["Baiki Bocor Gas", publishedPrices.gasLeakRepair],
        zh: ["冷媒泄漏维修", publishedPrices.gasLeakRepair],
      },
    },
    {
      cells: {
        en: ["Diagnostic Fee (waived with repair)", publishedPrices.diagnostic],
        ms: ["Yuran Diagnostik (dikecualikan dengan pembaikan)", publishedPrices.diagnostic],
        zh: ["检测费（维修时豁免）", publishedPrices.diagnostic],
      },
    },
    {
      cells: {
        en: ["Installation — Wall 1.0–1.5 HP", publishedPrices.installWall15],
        ms: ["Pemasangan — Dinding 1.0–1.5 HP", publishedPrices.installWall15],
        zh: ["安装 — 挂壁式 1.0–1.5 匹", publishedPrices.installWall15],
      },
    },
    {
      cells: {
        en: ["Installation — Ceiling Cassette 1.0–1.5 HP", publishedPrices.installCassette15],
        ms: ["Pemasangan — Keset Siling 1.0–1.5 HP", publishedPrices.installCassette15],
        zh: ["安装 — 天花板卡式 1.0–1.5 匹", publishedPrices.installCassette15],
      },
    },
    {
      cells: {
        en: ["Installation — Window Unit 1.0–1.5 HP", publishedPrices.installWindow],
        ms: ["Pemasangan — Unit Tingkap 1.0–1.5 HP", publishedPrices.installWindow],
        zh: ["安装 — 窗式机 1.0–1.5 匹", publishedPrices.installWindow],
      },
    },
  ],
};

const PRICING_COPY: Record<HubLocale, HubCopy> = {
  en: {
    metaTitle: "Aircond Service Prices KL & Selangor — RM 99 | KL Renovator",
    metaDescription:
      "Every aircond price in one place: basic service RM 99, chemical wash RM 120, gas top-up from RM 2.50/PSI, installation from RM 199. Free calculators + transparent price guides.",
    eyebrow: "Pricing Hub",
    h1: "Aircond Service & Installation Prices in KL & Selangor",
    intro:
      "Every aircond cost in Malaysia in one place: published service prices, installation rates, gas top-up charges and repair estimates, plus free calculators to work out your own job before you call. All figures are the prices KL Renovator quotes across KL & Selangor — confirmed before work starts, with no hidden charges and a 1-month workmanship warranty.",
    badges: ["RM 99 Basic Service", "RM 120 Chemical Wash", "Install From RM 199", "Gas From RM 2.50/PSI", "1-Month Warranty"],
    tableTitle: "Published Aircond Prices at a Glance",
    tableIntro:
      "The headline prices below come from KL Renovator's published price list. Extras such as extra copper pipe, brackets or high-rise access are quoted on-site before work begins.",
    editorialTitle: "How KL Renovator's published prices work",
    editorialBody: [
      "KL Renovator publishes its prices because aircond service in Malaysia has a reputation for surprise quotes. The RM 99 basic service, RM 120 pressure chemical wash and RM 199 installation are the prices you see on the page — not teaser rates that climb once the technician arrives. Anything that changes the job, like extra copper pipe, a new bracket, or high-rise access, is quoted and approved before work starts.",
      "The price list is the same for every area we cover — 39 neighbourhoods across Kuala Lumpur and Selangor — and for all 20 brands we service. Use the calculators on this page to estimate your exact job, then confirm the final figure with us on WhatsApp before booking.",
    ],
    directQuestion: "What does the RM 99 basic aircond service include?",
    directAnswer:
      "A 45-minute service covering filter removal and wash, a drain pipe flush, a mild anti-bacterial coil spray, an 8-point electrical and cooling check and a temperature test. It suits units serviced in the last 6 months; units with heavy build-up usually need a pressure chemical wash at RM 120 instead.",
    faqs: [
      {
        q: "What does the RM 99 basic aircond service include?",
        a: "Filter removal and wash, drain pipe flush, mild anti-bacterial coil spray, 8-point electrical and cooling check, and a temperature test — about 45 minutes per unit. For a unit that has not been deep-cleaned in over a year, a pressure chemical wash (RM 120 for 1.0–1.5 HP) is usually the better choice.",
      },
      {
        q: "Why does a chemical wash cost more than a basic service?",
        a: "Basic service cleans what you can reach — filters, drain, coil surface. A pressure chemical wash pushes food-safe alkaline chemical at 80–120 PSI into the coil fins and blower wheel, dissolving biofilm and mould that basic service cannot reach. More equipment, more time, deeper result.",
      },
      {
        q: "How is aircond gas top-up priced?",
        a: "By actual PSI after inspection: R22 at RM 2.50 per PSI, R410A and R32 at RM 3.00 per PSI, with a leak check included. We only refill what is missing, so you pay for the real amount rather than a flat top-up fee.",
      },
      {
        q: "Are installation prices final before work starts?",
        a: "The published installation price covers the first 7 ft of copper pipe, insulation, wire and drain pipe. If your job needs extra piping, a bracket, concealed wall work or high-rise access, the additional cost is quoted on-site and approved by you before we drill.",
      },
      {
        q: "Is the RM 88 diagnostic fee really waived with a repair?",
        a: "Yes. If you approve a repair with us, the RM 88 diagnostic fee is waived and only the repair is charged. If you choose not to proceed after diagnosis, you pay only the diagnostic fee — which is still credited if you book the repair within 30 days.",
      },
    ],
    ctaTitle: "Get a confirmed price for your aircond job",
    ctaBody:
      "Send us your area, unit type and what you need — we confirm the full price before any work starts. Same-day service across KL & Selangor, all 20 brands, 1-month workmanship warranty.",
    fullIndexTitle: "Every Pricing Guide & Tool",
    relatedTitle: "Explore Other Topic Hubs",
    photos: {
      eyebrow: "Real Work, Real Prices",
      heading: "The Jobs Behind These Prices",
      intro:
        "Actual KL Renovator jobs across Kuala Lumpur & Selangor — basic servicing, chemical wash, gas top-up and installation work, photographed on site.",
      heroTitle: "Basic Servicing in Kuala Lumpur",
      heroAlt: "KL Renovator technician performing a basic aircond service on a wall-mounted unit in Kuala Lumpur",
    },
  },
  ms: {
    metaTitle: "Harga Servis Aircond KL & Selangor — RM 99 | KL Renovator",
    metaDescription:
      "Semua harga aircond di satu tempat: servis asas RM 99, cuci kimia RM 120, tambah gas dari RM 2.50/PSI, pemasangan dari RM 199. Kalkulator percuma & panduan harga telus.",
    eyebrow: "Hab Harga",
    h1: "Harga Servis & Pemasangan Aircond di KL & Selangor",
    intro:
      "Semua kos aircond di Malaysia dalam satu tempat: harga servis yang diterbitkan, kadar pemasangan, cas tambah gas dan anggaran pembaikan, serta kalkulator percuma untuk mengira kos kerja anda sebelum menghubungi kami. Semua angka ialah harga yang KL Renovator sebut di seluruh KL & Selangor — disahkan sebelum kerja bermula, tanpa caj tersembunyi dan dengan waranti mutu kerja 1 bulan.",
    badges: ["Servis Asas RM 99", "Cuci Kimia RM 120", "Pemasangan Dari RM 199", "Gas Dari RM 2.50/PSI", "Waranti 1 Bulan"],
    tableTitle: "Harga Aircond Diterbitkan Sekilas Pandang",
    tableIntro:
      "Harga utama di bawah daripada senarai harga KL Renovator yang diterbitkan. Caj tambahan seperti paip kuprum tambahan, bracket atau akses bangunan tinggi disebut harga di tapak sebelum kerja bermula.",
    editorialTitle: "Bagaimana harga diterbitkan KL Renovator berfungsi",
    editorialBody: [
      "KL Renovator menerbitkan harganya kerana servis aircond di Malaysia terkenal dengan sebut harga mengejut. Servis asas RM 99, cuci kimia bertekanan RM 120 dan pemasangan RM 199 ialah harga yang anda lihat di halaman — bukan harga umpan yang naik setelah juruteknik tiba. Apa-apa yang mengubah kerja, seperti paip kuprum tambahan, bracket baharu atau akses bangunan tinggi, disebut harga dan diluluskan sebelum kerja bermula.",
      "Senarai harga ini sama untuk setiap kawasan yang kami liputi — 39 kawasan di sekitar Kuala Lumpur dan Selangor — serta untuk semua 20 jenama yang kami servis. Gunakan kalkulator di halaman ini untuk menganggarkan kerja anda, kemudian sahkan angka akhir dengan kami di WhatsApp sebelum membuat tempahan.",
    ],
    directQuestion: "Apa yang termasuk dalam servis asas aircond RM 99?",
    directAnswer:
      "Servis 45 minit yang merangkumi cucian dan pembersihan penapis, bilasan paip saliran, semburan anti-bakteria ringan pada gegelung, pemeriksaan 8 titik elektrik dan penyejukan, serta ujian suhu. Sesuai untuk unit yang diservis dalam 6 bulan; unit dengan kotoran tebal biasanya memerlukan cuci kimia bertekanan RM 120.",
    faqs: [
      {
        q: "Apa yang termasuk dalam servis asas aircond RM 99?",
        a: "Cucian penapis, bilasan paip saliran, semburan anti-bakteria ringan pada gegelung, pemeriksaan 8 titik elektrik dan penyejukan, serta ujian suhu — kira-kira 45 minit setiap unit. Untuk unit yang tidak dicuci dalam lebih setahun, cuci kimia bertekanan (RM 120 untuk 1.0–1.5 HP) biasanya pilihan yang lebih baik.",
      },
      {
        q: "Mengapa cuci kimia lebih mahal daripada servis asas?",
        a: "Servis asas membersihkan bahagian yang boleh dicapai — penapis, saliran, permukaan gegelung. Cuci kimia bertekanan menyembur larutan kimia alkali selamat makanan pada 80–120 PSI ke dalam sirip gegelung dan roda blower, melarutkan biofilm dan kulat yang tidak dapat dicapai servis asas. Lebih banyak peralatan, lebih lama masa, hasil yang lebih mendalam.",
      },
      {
        q: "Bagaimana harga tambah gas aircond dikira?",
        a: "Mengikut PSI sebenar selepas pemeriksaan: R22 pada RM 2.50 setiap PSI, R410A dan R32 pada RM 3.00 setiap PSI, dengan semakan kebocoran disertakan. Kami hanya mengisi semula gas yang kurang, jadi anda membayar jumlah sebenar, bukan yuran tetap.",
      },
      {
        q: "Adakah harga pemasangan muktamad sebelum kerja bermula?",
        a: "Harga pemasangan yang diterbitkan merangkumi 7 kaki pertama paip kuprum, penebat, wayar dan paip saliran. Jika kerja anda memerlukan paip tambahan, bracket, kerja tembok tersembunyi atau akses bangunan tinggi, kos tambahan disebut harga di tapak dan diluluskan oleh anda sebelum kami menebuk.",
      },
      {
        q: "Benarkah yuran diagnostik RM 88 dikecualikan dengan pembaikan?",
        a: "Ya. Jika anda meluluskan pembaikan, yuran diagnostik RM 88 dikecualikan dan hanya caj pembaikan dikenakan. Jika anda memilih untuk tidak meneruskan selepas diagnosis, anda hanya membayar yuran diagnostik — yang tetap dikreditkan jika anda menempah pembaikan dalam 30 hari.",
      },
    ],
    ctaTitle: "Dapatkan harga sah untuk kerja aircond anda",
    ctaBody:
      "Hantar kawasan, jenis unit dan keperluan anda — kami sahkan harga penuh sebelum sebarang kerja bermula. Servis hari sama di seluruh KL & Selangor, semua 20 jenama, waranti mutu kerja 1 bulan.",
    fullIndexTitle: "Semua Panduan & Alat Harga",
    relatedTitle: "Terokai Hab Topik Lain",
    photos: {
      eyebrow: "Kerja Sebenar, Harga Sebenar",
      heading: "Kerja Di Sebalik Harga Ini",
      intro:
        "Kerja sebenar KL Renovator di seluruh Kuala Lumpur & Selangor — servis asas, cuci kimia, tambah gas dan pemasangan, dirakam di tapak.",
      heroTitle: "Servis Asas di Kuala Lumpur",
      heroAlt: "Juruteknik KL Renovator melakukan servis asas aircond pada unit dinding di Kuala Lumpur",
    },
  },
  zh: {
    metaTitle: "冷气服务价格 吉隆坡雪兰莪 — RM99起 | KL Renovator",
    metaDescription:
      "所有冷气费用一览：基本保养 RM 99、化学清洗 RM 120、加气每PSI RM 2.50起、安装 RM 199起。免费计算器与透明价目指南。",
    eyebrow: "价格总览",
    h1: "吉隆坡与雪兰莪冷气服务及安装价格",
    intro:
      "马来西亚冷气费用一站式总览：已公布的保养价格、安装费率、加气收费与维修估价，以及免费计算工具，让您在致电前先自行估算。所有数字均为 KL Renovator 在吉隆坡与雪兰莪的报价 — 动工前确认，绝无隐藏费用，附 1 个月工艺保修。",
    badges: ["基本保养 RM 99", "化学清洗 RM 120", "安装 RM 199 起", "加气每PSI RM 2.50 起", "1 个月保修"],
    tableTitle: "已公布冷气价格速览",
    tableIntro:
      "以下主要价格取自 KL Renovator 已公布的价目表。额外铜管、支架或高楼作业等附加项目，均在动工前于现场报价并征得同意。",
    editorialTitle: "KL Renovator 的公布价格如何运作",
    editorialBody: [
      "KL Renovator 公布价格，是因为马来西亚的冷气服务常以'上门后再加价'闻名。RM 99 基本保养、RM 120 高压化学清洗与 RM 199 安装，就是您在页面上看到的价格 — 不是技术员到场后上涨的诱饵价。任何会改变工程的项目，例如额外铜管、新支架或高楼作业，都会在动工前报价并经您确认。",
      "这份价目表适用于我们覆盖的每一个地区 — 吉隆坡与雪兰莪共 39 个社区 — 以及我们服务的全部 20 个品牌。您可以使用本页的计算工具估算具体工程，然后在预约前通过 WhatsApp 与我们确认最终价格。",
    ],
    directQuestion: "RM 99 的基本冷气保养包含什么？",
    directAnswer:
      "45 分钟的保养：拆洗滤网、冲洗排水管、盘管温和抗菌喷雾、8 点电气与制冷检查，以及出风温度测试。适合近 6 个月内保养过的机器；积垢严重的机器通常需要 RM 120 的高压化学清洗。",
    faqs: [
      {
        q: "RM 99 的基本冷气保养包含什么？",
        a: "拆洗滤网、冲洗排水管、盘管温和抗菌喷雾、8 点电气与制冷检查，以及温度测试 — 每台约 45 分钟。若机器超过一年未深度清洗，通常更适合选择高压化学清洗（1.0–1.5 匹 RM 120）。",
      },
      {
        q: "为什么化学清洗比基本保养贵？",
        a: "基本保养只清洁触手可及的部分 — 滤网、排水管、盘管表面。高压化学清洗则以 80–120 PSI 将食品级碱性清洗液喷入盘管翅片与风轮内部，溶解基本保养无法触及的生物膜与霉菌。设备更多、时间更长、效果更深。",
      },
      {
        q: "冷气加气如何收费？",
        a: "按检查后的实际 PSI 收费：R22 每 PSI RM 2.50，R410A 与 R32 每 PSI RM 3.00，并附泄漏检查。我们只补足缺失的冷媒，您按实际用量付费，而非固定加气费。",
      },
      {
        q: "安装价格在动工前就是最终价吗？",
        a: "公布的安装价格包含首 7 英尺铜管、保温、电线与排水管。若工程需要额外铜管、支架、埋墙作业或高楼作业，附加费用会在现场报价，经您同意后才动工钻孔。",
      },
      {
        q: "RM 88 检测费真的会随维修豁免吗？",
        a: "会。若您确认维修，RM 88 检测费即予豁免，只收取维修费用。若诊断后您决定不维修，只需支付检测费 — 30 天内改期维修仍可抵扣。",
      },
    ],
    ctaTitle: "获取冷气工程的确认报价",
    ctaBody:
      "告诉我们您的地区、机型与需求 — 我们会在动工前确认完整价格。吉隆坡与雪兰莪当天上门，全部 20 大品牌，1 个月工艺保修。",
    fullIndexTitle: "全部价格指南与工具",
    relatedTitle: "浏览其他主题总览",
    photos: {
      eyebrow: "真实工程，真实价格",
      heading: "这些价格背后的实况",
      intro:
        "KL Renovator 在吉隆坡与雪兰莪的实际工程 — 基本保养、化学清洗、加气与安装，现场拍摄。",
      heroTitle: "吉隆坡基本保养实况",
      heroAlt: "KL Renovator 技术员在吉隆坡为挂壁式冷气进行基本保养",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// 2 · TROUBLESHOOTING HUB
// ─────────────────────────────────────────────────────────────────────────

const TROUBLESHOOTING_GROUPS: HubGroup[] = [
  {
    id: "by-cooling",
    accent: "sky",
    eyebrow: { en: "Cooling Problems", ms: "Masalah Penyejukan", zh: "制冷问题" },
    title: { en: "Aircond Not Cooling", ms: "Aircond Tidak Sejuk", zh: "冷气不制冷" },
    links: [
      {
        href: { en: "/problems/aircond-not-cold", ms: "/ms/problems/aircond-not-cold", zh: "/zh/problems/aircond-not-cold" },
        label: { en: "Aircond Not Cold", ms: "Aircond Tidak Sejuk", zh: "冷气不冷" },
        blurb: {
          en: "Low gas, dirty coil or a failing capacitor — the usual suspects.",
          ms: "Gas rendah, gegelung kotor atau kapasitor rosak — punca biasa.",
          zh: "冷媒不足、盘管脏或电容器故障 — 常见原因。",
        },
      },
      {
        href: { en: "/problems/aircond-low-gas", ms: "/ms/problems/aircond-low-gas", zh: "/zh/problems/aircond-low-gas" },
        label: { en: "Aircond Low Gas", ms: "Aircond Gas Rendah", zh: "冷气气体不足" },
        blurb: {
          en: "Warm air and longer cooling cycles point to low refrigerant.",
          ms: "Udara panas dan kitaran penyejukan lebih lama menandakan gas rendah.",
          zh: "吹暖风、制冷变慢，通常表示冷媒不足。",
        },
      },
      {
        href: { en: "/problems/aircond-freezing-up", ms: "/ms/problems/aircond-freezing-up", zh: "/zh/problems/aircond-freezing-up" },
        label: { en: "Aircond Freezing Up", ms: "Aircond Membeku", zh: "冷气结冰" },
        blurb: {
          en: "Ice on the coil — low gas or a blocked airflow path.",
          ms: "Ais pada gegelung — gas rendah atau laluan aliran udara tersumbat.",
          zh: "盘管结冰 — 冷媒不足或风路堵塞。",
        },
      },
      {
        href: { en: "/problems/aircond-weak-airflow", ms: "/ms/problems/aircond-weak-airflow", zh: "/zh/problems/aircond-weak-airflow" },
        label: { en: "Aircond Weak Airflow", ms: "Aliran Udara Lemah", zh: "冷气风量弱" },
        blurb: {
          en: "Dirty filters and a clogged blower are the first things to check.",
          ms: "Penapis kotor dan blower tersumbat ialah perkara pertama disemak.",
          zh: "滤网脏与风轮堵塞是最先要检查的项目。",
        },
      },
    ],
  },
  {
    id: "by-water",
    accent: "emerald",
    eyebrow: { en: "Water & Odour", ms: "Air & Bau", zh: "漏水与异味" },
    title: { en: "Leaks & Bad Smells", ms: "Bocor & Bau Busuk", zh: "漏水与异味" },
    links: [
      {
        href: { en: "/problems/aircond-water-leaking", ms: "/ms/problems/aircond-water-leaking", zh: "/zh/problems/aircond-water-leaking" },
        label: { en: "Aircond Water Leaking", ms: "Aircond Bocor Air", zh: "冷气漏水" },
        blurb: {
          en: "A blocked drain pipe is behind most indoor-unit leaks.",
          ms: "Paip saliran tersumbat ialah punca kebanyakan bocor unit dalam.",
          zh: "排水管堵塞是室内机漏水最常见的原因。",
        },
      },
      {
        href: { en: "/problems/aircond-indoor-unit-leaking", ms: "/ms/problems/aircond-indoor-unit-leaking", zh: "/zh/problems/aircond-indoor-unit-leaking" },
        label: { en: "Indoor Unit Leaking", ms: "Unit Dalam Bocor", zh: "室内机漏水" },
        blurb: {
          en: "Drips from the front panel usually mean a dirty drain pan.",
          ms: "Titisan dari panel depan biasanya bermaksud dulang saliran kotor.",
          zh: "前面板滴水，通常是排水盘太脏。",
        },
      },
      {
        href: { en: "/problems/aircond-water-dripping", ms: "/ms/problems/aircond-water-dripping", zh: "/zh/problems/aircond-water-dripping" },
        label: { en: "Water Dripping From Unit", ms: "Air Menitis Dari Unit", zh: "冷气滴水" },
        blurb: {
          en: "Constant dripping is a drainage problem, not a cooling one.",
          ms: "Titisan berterusan ialah masalah saliran, bukan penyejukan.",
          zh: "持续滴水是排水问题，而非制冷问题。",
        },
      },
      {
        href: { en: "/problems/aircond-bad-smell", ms: "/ms/problems/aircond-bad-smell", zh: "/zh/problems/aircond-bad-smell" },
        label: { en: "Aircond Bad Smell", ms: "Aircond Bau Busuk", zh: "冷气异味" },
        blurb: {
          en: "Mould and biofilm on a wet coil — a chemical wash resolves it.",
          ms: "Kulat dan biofilm pada gegelung lembap — cuci kimia menyelesaikannya.",
          zh: "潮湿盘管上的霉菌与生物膜 — 化学清洗可解决。",
        },
      },
    ],
  },
  {
    id: "by-electrical",
    accent: "amber",
    eyebrow: { en: "Electrical & Mechanical", ms: "Elektrik & Mekanikal", zh: "电气与机械" },
    title: { en: "Power, Parts & Noise", ms: "Kuasa, Komponen & Bunyi", zh: "电源、零件与噪音" },
    links: [
      {
        href: { en: "/problems/aircond-not-turning-on", ms: "/ms/problems/aircond-not-turning-on", zh: "/zh/problems/aircond-not-turning-on" },
        label: { en: "Aircond Not Turning On", ms: "Aircond Tidak Hidup", zh: "冷气不启动" },
        blurb: {
          en: "Remote, power supply or PCB — traced in order of likelihood.",
          ms: "Remote, bekalan kuasa atau PCB — dikesan mengikut kebarangkalian.",
          zh: "遥控器、电源或电路板 — 按可能性逐一排查。",
        },
      },
      {
        href: { en: "/problems/aircond-tripping-power", ms: "/ms/problems/aircond-tripping-power", zh: "/zh/problems/aircond-tripping-power" },
        label: { en: "Aircond Tripping Power", ms: "Aircond Memutuskan Elektrik", zh: "冷气跳闸" },
        blurb: {
          en: "A failing capacitor or PCB is the usual trip cause.",
          ms: "Kapasitor atau PCB rosak ialah punca biasa pemutus litar.",
          zh: "电容器或电路板故障是跳闸的常见原因。",
        },
      },
      {
        href: { en: "/problems/aircond-making-noise", ms: "/ms/problems/aircond-making-noise", zh: "/zh/problems/aircond-making-noise" },
        label: { en: "Aircond Making Noise", ms: "Aircond Bunyi Bising", zh: "冷气噪音" },
        blurb: {
          en: "Grinding or rattling points to bearings, blades or a loose part.",
          ms: "Bunyi geseran atau gemeretak menandakan bearing, bilah atau bahagian longgar.",
          zh: "研磨声或咔哒声，指向轴承、叶片或零件松动。",
        },
      },
      {
        href: { en: "/problems/aircond-compressor-problem", ms: "/ms/problems/aircond-compressor-problem", zh: "/zh/problems/aircond-compressor-problem" },
        label: { en: "Compressor Problem", ms: "Masalah Kompressor", zh: "压缩机故障" },
        blurb: {
          en: "Runs but won't cool — honest repair-vs-replace advice.",
          ms: "Berjalan tetapi tak sejuk — nasihat jujur baiki vs ganti.",
          zh: "机器运转但不制冷 — 诚实建议维修还是更换。",
        },
      },
    ],
  },
  {
    id: "by-repair",
    accent: "violet",
    eyebrow: { en: "Expert Repair", ms: "Pembaikan Pakar", zh: "专业维修" },
    title: { en: "Repair Service & Deep Guides", ms: "Servis Baiki & Panduan Mendalam", zh: "维修服务与深度指南" },
    links: [
      {
        href: { en: "/services/repair", ms: "/ms/services/repair", zh: "/zh/services/repair" },
        label: { en: "Troubleshooting & Repairs", ms: "Penyelesaian Masalah & Pembaikan", zh: "故障排查与维修" },
        blurb: {
          en: "Component-level repair with the price confirmed before work.",
          ms: "Pembaikan peringkat komponen dengan harga disahkan sebelum kerja.",
          zh: "零件级维修，动工前确认价格。",
        },
        price: publishedPrices.diagnostic,
      },
      {
        href: { en: "/blog/aircond-troubleshooting-guide-malaysia", ms: "/ms/blog/aircond-troubleshooting-guide-malaysia", zh: "/zh/blog/aircond-troubleshooting-guide-malaysia" },
        label: { en: "Full Troubleshooting Guide", ms: "Panduan Penyelesaian Masalah Penuh", zh: "完整排查指南" },
        blurb: {
          en: "Every symptom explained from filters to compressor.",
          ms: "Setiap gejala dijelaskan dari penapis hingga pekali.",
          zh: "从滤网到压缩机，逐一解释各种症状。",
        },
      },
      {
        href: { en: "/blog/aircond-error-codes-blinking-lights-guide-malaysia", ms: "/ms/blog/aircond-error-codes-blinking-lights-guide-malaysia", zh: "/zh/blog/aircond-error-codes-blinking-lights-guide-malaysia" },
        label: { en: "Error Codes & Blinking Lights", ms: "Kod Ralat & Lampu Berkelip", zh: "故障码与闪烁指示灯" },
        blurb: {
          en: "What each brand's blinking pattern actually means.",
          ms: "Apa maksud corak kelipan setiap jenama sebenarnya.",
          zh: "各品牌指示灯闪烁模式的实际含义。",
        },
      },
      {
        href: { en: "/problems/aircond-blinking-light", ms: "/ms/problems/aircond-blinking-light", zh: "/zh/problems/aircond-blinking-light" },
        label: { en: "Blinking Light Error", ms: "Lampu Ralat Berkelip", zh: "故障灯闪烁" },
        blurb: {
          en: "Timer or operation lights flashing — sensor or PCB fault.",
          ms: "Lampu timer atau operasi berkelip — kerosakan sensor atau PCB.",
          zh: "定时或运行灯闪烁 — 传感器或电路板故障。",
        },
      },
    ],
  },
];

const TROUBLESHOOTING_TABLE: HubTable = {
  title: {
    en: "Common Aircond Problems, Causes & Fixes",
    ms: "Masalah Aircond Biasa, Punca & Penyelesaian",
    zh: "常见冷气故障、原因与维修",
  },
  intro: {
    en: "A quick-reference table for the most frequent call-outs we handle. The typical fix is what most jobs need; the final diagnosis is confirmed on-site.",
    ms: "Jadual rujukan pantas untuk panggilan paling kerap kami kendalikan. Penyelesaian biasa ialah apa yang kebanyakan kerja perlukan; diagnosis akhir disahkan di tapak.",
    zh: "我们最常接到的维修快速对照表。常见维修是多数工程所需；最终诊断以现场为准。",
  },
  headers: {
    en: ["Symptom", "Likely Cause", "Typical Fix", "From"],
    ms: ["Gejala", "Punca Mungkin", "Penyelesaian Biasa", "Dari"],
    zh: ["症状", "可能原因", "常见维修", "起价"],
  },
  rows: [
    {
      cells: {
        en: ["Not cold enough", "Low gas or dirty coil", "Gas top-up or chemical wash", publishedPrices.basic15],
        ms: ["Tidak cukup sejuk", "Gas rendah / gegelung kotor", "Tambah gas atau cuci kimia", publishedPrices.basic15],
        zh: ["制冷不足", "冷媒不足 / 盘管脏", "加气或化学清洗", publishedPrices.basic15],
      },
    },
    {
      cells: {
        en: ["Water leaking from indoor unit", "Blocked drain pipe", "Drain flush (basic service)", publishedPrices.basic15],
        ms: ["Bocor air dari unit dalam", "Paip saliran tersumbat", "Bilas saliran (servis asas)", publishedPrices.basic15],
        zh: ["室内机漏水", "排水管堵塞", "冲洗排水管（基本保养）", publishedPrices.basic15],
      },
    },
    {
      cells: {
        en: ["Making noise", "Loose parts / worn fan bearing", "Inspection & part replacement", publishedPrices.diagnostic],
        ms: ["Bunyi bising", "Bahagian longgar / bearing kipas haus", "Pemeriksaan & ganti bahagian", publishedPrices.diagnostic],
        zh: ["有噪音", "零件松动 / 风扇轴承磨损", "检查并更换零件", publishedPrices.diagnostic],
      },
    },
    {
      cells: {
        en: ["Bad smell", "Mould & biofilm on the coil", "Pressure chemical wash", publishedPrices.chemicalWash15],
        ms: ["Bau busuk", "Kulat & biofilm pada gegelung", "Cuci kimia bertekanan", publishedPrices.chemicalWash15],
        zh: ["异味", "盘管上的霉菌与生物膜", "高压化学清洗", publishedPrices.chemicalWash15],
      },
    },
    {
      cells: {
        en: ["Tripping power", "Faulty capacitor or PCB", "Component replacement", "RM 150"],
        ms: ["Elektrik terputus", "Kapasitor atau PCB rosak", "Ganti komponen", "RM 150"],
        zh: ["跳闸", "电容器或电路板故障", "更换部件", "RM 150"],
      },
    },
    {
      cells: {
        en: ["Blinking error light", "Sensor or PCB fault", "Component replacement", "RM 150"],
        ms: ["Lampu ralat berkelip", "Sensor atau PCB rosak", "Ganti komponen", "RM 150"],
        zh: ["故障灯闪烁", "传感器或电路板故障", "更换部件", "RM 150"],
      },
    },
    {
      cells: {
        en: ["Ice forming on the coil", "Low gas or blocked coil", "Gas top-up or chemical overhaul", publishedPrices.overhaul15],
        ms: ["Ais pada gegelung", "Gas rendah / gegelung tersumbat", "Tambah gas atau chemical overhaul", publishedPrices.overhaul15],
        zh: ["盘管结冰", "冷媒不足或盘管堵塞", "加气或化学大修", publishedPrices.overhaul15],
      },
    },
    {
      cells: {
        en: ["Unit not turning on", "Remote, power supply or PCB", "Diagnosis & repair", publishedPrices.diagnostic],
        ms: ["Unit tidak hidup", "Remote, bekalan kuasa atau PCB", "Diagnosis & baiki", publishedPrices.diagnostic],
        zh: ["机器不启动", "遥控器、电源或电路板", "检测并维修", publishedPrices.diagnostic],
      },
    },
  ],
};

const TROUBLESHOOTING_COPY: Record<HubLocale, HubCopy> = {
  en: {
    metaTitle: "Aircond Troubleshooting Guides & Repairs KL — KL Renovator",
    metaDescription:
      "Why is your aircond not cold, leaking or noisy? 20 problem guides with causes, DIY checks and honest fix prices. Same-day technician repair across KL & Selangor.",
    eyebrow: "Troubleshooting Hub",
    h1: "Aircond Troubleshooting Guides for KL & Selangor",
    intro:
      "Twenty of the most common aircond problems — not cooling, water leaking, strange noises, bad smells, tripped power and error lights — explained with their likely causes, the checks you can safely do yourself, and what a KL Renovator technician fixes on-site, with the price confirmed before work starts.",
    badges: ["20 Problem Guides", "DIY Checks First", "RM 88 Diagnostic", "Same-Day Fix", "All 20 Brands"],
    tableTitle: "Common Aircond Problems, Causes & Fixes",
    tableIntro:
      "A quick-reference table for the most frequent call-outs we handle. The typical fix is what most jobs need; the final diagnosis is confirmed on-site.",
    editorialTitle: "How to use these troubleshooting guides safely",
    editorialBody: [
      "Start with the DIY checks every guide includes — cleaning the filter, checking the remote battery, confirming the circuit breaker. These solve a surprising share of 'broken' aircond calls, and they cost nothing. Anything involving the sealed refrigerant circuit, mains electricity or dismantled parts is technician work.",
      "Every problem guide lists the likely causes in order of frequency, plus the published price for the fix. KL Renovator charges an RM 88 diagnostic fee that is waived when you approve the repair — you never pay for a guess.",
    ],
    directQuestion: "Which aircond problems can I fix myself before calling a technician?",
    directAnswer:
      "A clogged filter that slows cooling, a remote with dead batteries, a tripped breaker, and a unit that simply needs a power reset. Anything with refrigerant gas, mains wiring, the compressor or water leaking from the indoor unit is safer left to a licensed technician — the guides below show what each fix costs.",
    faqs: [
      {
        q: "How much does it cost to diagnose an aircond problem?",
        a: "The diagnostic fee is RM 88. It is waived in full when you approve a repair with us, so you only pay for the fix. If you decide not to proceed, the RM 88 covers the technician's time and the report of what is wrong.",
      },
      {
        q: "Is it safe to keep using an aircond that is not cooling properly?",
        a: "If it is still blowing cool air, yes — but expect a higher electricity bill while it runs inefficiently. If you see ice forming, smell burning, or the unit trips the breaker, switch it off and call a technician; continued running can damage the compressor.",
      },
      {
        q: "Which aircond problems can I check myself first?",
        a: "Filter clogs, remote batteries and a tripped circuit breaker are safe, free checks. Opening the electrical panel, handling refrigerant or dismantling the indoor unit is not DIY — those are technician jobs covered in the guides below.",
      },
      {
        q: "How fast can a technician reach me in KL & Selangor?",
        a: "Same-day service is available for bookings confirmed before 11 AM across our 39 areas in Kuala Lumpur and Selangor. Emergency slots for complete breakdowns or heavy leaks are prioritised.",
      },
      {
        q: "Why does my aircond smell musty, and can a chemical wash fix it?",
        a: "Musty smell comes from mould and bacteria growing on the wet evaporator coil and blower wheel. A pressure chemical wash dissolves the biofilm and rinses it out through the drain — for very heavy build-up, a chemical overhaul at RM 420 is the complete fix.",
      },
    ],
    ctaTitle: "Fix your aircond today — same-day service",
    ctaBody:
      "Tell us the problem and your area. We diagnose, quote and repair — with the price confirmed before any work starts. All 20 brands, 39 areas, 1-month workmanship warranty.",
    fullIndexTitle: "Every Troubleshooting Guide",
    relatedTitle: "Explore Other Topic Hubs",
    photos: {
      eyebrow: "Real Repair Work",
      heading: "Fixes Our Technicians Actually Do",
      intro:
        "Diagnosis, gas balancing, part replacement and deep cleaning — real KL Renovator repair jobs photographed across KL & Selangor.",
      heroTitle: "Repair Work in Petaling Jaya",
      heroAlt: "KL Renovator technician working on an aircond repair job in Petaling Jaya",
    },
  },
  ms: {
    metaTitle: "Panduan Selesaikan Masalah Aircond KL — RM 99 | KL Renovator",
    metaDescription:
      "Kenapa aircond tak sejuk, bocor atau bising? 20 panduan masalah dengan punca, semakan DIY dan harga baiki yang telus. Servis hari sama di KL & Selangor.",
    eyebrow: "Hab Penyelesaian Masalah",
    h1: "Panduan Selesaikan Masalah Aircond di KL & Selangor",
    intro:
      "Dua puluh masalah aircond paling biasa — tidak sejuk, bocor air, bunyi bising, bau busuk, elektrik terputus dan lampu ralat — diterangkan dengan punca yang mungkin, semakan yang boleh anda lakukan sendiri dengan selamat, dan apa yang juruteknik KL Renovator baiki di tapak, dengan harga disahkan sebelum kerja bermula.",
    badges: ["20 Panduan Masalah", "Semakan DIY Dahulu", "Diagnostik RM 88", "Baiki Hari Sama", "Semua 20 Jenama"],
    tableTitle: "Masalah Aircond Biasa, Punca & Penyelesaian",
    tableIntro:
      "Jadual rujukan pantas untuk panggilan paling kerap kami kendalikan. Penyelesaian biasa ialah apa yang kebanyakan kerja perlukan; diagnosis akhir disahkan di tapak.",
    editorialTitle: "Cara menggunakan panduan ini dengan selamat",
    editorialBody: [
      "Mulakan dengan semakan DIY yang disertakan dalam setiap panduan — cuci penapis, periksa bateri remote, sahkan pemutus litar. Semakan ini menyelesaikan sebahagian besar panggilan 'aircond rosak', dan ia percuma. Apa-apa yang melibatkan litar gas tertutup, elektrik utama atau bahagian yang dibuka ialah kerja juruteknik.",
      "Setiap panduan menyenaraikan punca yang mungkin mengikut kekerapan, serta harga diterbitkan untuk penyelesaiannya. KL Renovator mengenakan yuran diagnostik RM 88 yang dikecualikan apabila anda meluluskan pembaikan — anda tidak pernah membayar untuk tekaan.",
    ],
    directQuestion: "Masalah aircond mana yang boleh saya baiki sendiri sebelum menghubungi juruteknik?",
    directAnswer:
      "Penapis tersumbat yang memperlahankan penyejukan, remote dengan bateri lemah, pemutus litar yang tersilap, dan unit yang hanya perlu set semula kuasa. Apa-apa yang melibatkan gas penyejuk, pendawaian utama, pekali atau kebocoran air dari unit dalam lebih selamat diserahkan kepada juruteknik bertauliah — panduan di bawah menunjukkan kos setiap pembaikan.",
    faqs: [
      {
        q: "Berapakah kos untuk mendiagnosis masalah aircond?",
        a: "Yuran diagnostik ialah RM 88. Ia dikecualikan sepenuhnya apabila anda meluluskan pembaikan, jadi anda hanya membayar untuk pembaikan. Jika anda memilih untuk tidak meneruskan, RM 88 meliputi masa juruteknik dan laporan tentang punca masalah.",
      },
      {
        q: "Selamatkah terus menggunakan aircond yang tidak sejuk?",
        a: "Jika masih menghembus udara sejuk, selamat — tetapi jangkakan bil elektrik lebih tinggi. Jika anda nampak ais terbentuk, bau terbakar, atau unit memutuskan elektrik, matikan dan hubungi juruteknik; penggunaan berterusan boleh merosakkan pekali.",
      },
      {
        q: "Masalah aircond mana yang boleh saya semak sendiri dahulu?",
        a: "Penapis tersumbat, bateri remote dan pemutus litar yang tersilap ialah semakan selamat dan percuma. Membuka panel elektrik, mengendalikan gas penyejuk atau membongkar unit dalam bukan kerja DIY — itu tugas juruteknik yang diterangkan dalam panduan.",
      },
      {
        q: "Berapa cepat juruteknik sampai ke kawasan saya?",
        a: "Servis hari sama tersedia untuk tempahan yang disahkan sebelum 11 pagi di 39 kawasan kami di Kuala Lumpur dan Selangor. Slot kecemasan untuk kerosakan total atau kebocoran teruk diberi keutamaan.",
      },
      {
        q: "Kenapa aircond saya berbau hapak, dan bolehkah cuci kimia menghilangkannya?",
        a: "Bau hapak datang daripada kulat dan bakteria yang tumbuh pada gegelung penyejat dan roda blower yang lembap. Cuci kimia bertekanan melarutkan biofilm dan membilasnya keluar melalui saliran — untuk kotoran yang sangat tebal, chemical overhaul RM 420 ialah penyelesaian lengkap.",
      },
    ],
    ctaTitle: "Baiki aircond anda hari ini — servis hari sama",
    ctaBody:
      "Beritahu kami masalah dan kawasan anda. Kami diagnos, sebut harga dan baiki — dengan harga disahkan sebelum sebarang kerja bermula. Semua 20 jenama, 39 kawasan, waranti mutu kerja 1 bulan.",
    fullIndexTitle: "Semua Panduan Penyelesaian Masalah",
    relatedTitle: "Terokai Hab Topik Lain",
    photos: {
      eyebrow: "Kerja Pembaikan Sebenar",
      heading: "Pembaikan Yang Juruteknik Kami Lakukan",
      intro:
        "Diagnosis, imbangan gas, ganti bahagian dan cucian mendalam — kerja pembaikan sebenar KL Renovator dirakam di seluruh KL & Selangor.",
      heroTitle: "Kerja Pembaikan di Petaling Jaya",
      heroAlt: "Juruteknik KL Renovator menjalankan kerja pembaikan aircond di Petaling Jaya",
    },
  },
  zh: {
    metaTitle: "冷气故障排查指南 吉隆坡雪兰莪 — RM99起 | KL Renovator",
    metaDescription:
      "冷气不冷、漏水、有噪音？20 篇故障指南：原因、可自行检查的项目与透明维修价格。吉隆坡与雪兰莪当天上门维修。",
    eyebrow: "故障排查总览",
    h1: "吉隆坡与雪兰莪冷气故障排查指南",
    intro:
      "冷气最常见的 20 种故障 — 不制冷、漏水、噪音、异味、跳闸与故障灯 — 逐一说明可能原因、您可以安全自行检查的项目，以及 KL Renovator 技术员在现场的维修方案，价格在动工前确认。",
    badges: ["20 篇故障指南", "先做自行检查", "检测费 RM 88", "当天维修", "全部 20 大品牌"],
    tableTitle: "常见冷气故障、原因与维修",
    tableIntro: "我们最常接到的维修快速对照表。常见维修是多数工程所需；最终诊断以现场为准。",
    editorialTitle: "如何安全使用这些排查指南",
    editorialBody: [
      "先从每篇指南附带的自行检查开始 — 清洗滤网、检查遥控器电池、确认断路器状态。这些免费的检查能解决相当一部分'冷气坏了'的来电。任何涉及密封冷媒回路、市电或拆开部件的工作，都应交给技术员。",
      "每篇故障指南都会按出现频率列出可能原因，并标明维修的公布价格。KL Renovator 收取 RM 88 检测费，若您确认维修即全额豁免 — 您永远不会为'猜测'付费。",
    ],
    directQuestion: "哪些冷气问题可以自己先修？",
    directAnswer:
      "滤网堵塞导致制冷变慢、遥控器电池耗尽、断路器跳闸，以及只需断电重启的机器。凡是涉及冷媒气体、市电线路、压缩机或室内机漏水的问题，交给持证技术员更安全 — 下方指南列出了每项维修的费用。",
    faqs: [
      {
        q: "检测冷气故障要多少钱？",
        a: "检测费为 RM 88。若您确认维修，检测费全额豁免，只需支付维修费用。若您决定不维修，RM 88 涵盖技术员上门时间与故障报告。",
      },
      {
        q: "冷气不制冷时继续使用安全吗？",
        a: "若仍吹出凉风，可以继续使用 — 但电费会更高。若看到结冰、闻到烧焦味或机器跳闸，请立即关机并致电技术员；继续运转可能损坏压缩机。",
      },
      {
        q: "哪些冷气问题可以自己先检查？",
        a: "滤网堵塞、遥控器电池与断路器跳闸都是安全免费的检查。打开电气面板、接触冷媒或拆开室内机则不是 DIY 项目 — 这些属于技术员工作，指南中有详细说明。",
      },
      {
        q: "技术员多快能到达？",
        a: "吉隆坡与雪兰莪 39 个服务地区，上午 11 点前确认的预约可安排当天上门。完全停机或严重漏水的紧急单优先处理。",
      },
      {
        q: "为什么冷气有霉味，化学清洗能解决吗？",
        a: "霉味来自潮湿蒸发器盘管与风轮上滋生的霉菌和细菌。高压化学清洗能溶解生物膜并经排水管冲走 — 积垢严重时可选择 RM 420 的化学大修彻底解决。",
      },
    ],
    ctaTitle: "今天修好冷气 — 当天上门",
    ctaBody:
      "告诉我们故障与您的地区。我们检测、报价、维修 — 动工前确认价格。全部 20 大品牌、39 个地区、1 个月工艺保修。",
    fullIndexTitle: "全部故障排查指南",
    relatedTitle: "浏览其他主题总览",
    photos: {
      eyebrow: "真实维修实况",
      heading: "技术员实际进行的维修",
      intro:
        "检测、冷媒平衡、更换零件与深度清洗 — KL Renovator 在吉隆坡与雪兰莪的真实维修工程现场照片。",
      heroTitle: "八打灵再也维修实况",
      heroAlt: "KL Renovator 技术员在八打灵再也进行冷气维修作业",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// 3 · MAINTENANCE HUB
// ─────────────────────────────────────────────────────────────────────────

const MAINTENANCE_GROUPS: HubGroup[] = [
  {
    id: "by-service",
    accent: "sky",
    eyebrow: { en: "Choose Your Service", ms: "Pilih Servis Anda", zh: "选择服务" },
    title: { en: "Maintenance Services", ms: "Perkhidmatan Penyelenggaraan", zh: "保养服务" },
    links: [
      {
        href: { en: "/services/basic-servicing", ms: "/ms/services/basic-servicing", zh: "/zh/services/basic-servicing" },
        label: { en: "Basic Servicing", ms: "Servis Asas", zh: "基本保养" },
        blurb: {
          en: "The routine check-up that keeps a healthy unit healthy.",
          ms: "Pemeriksaan rutin yang memastikan unit yang sihat kekal sihat.",
          zh: "让健康机器保持健康的例行保养。",
        },
        price: publishedPrices.basic15,
      },
      {
        href: { en: "/services/chemical-wash", ms: "/ms/services/chemical-wash", zh: "/zh/services/chemical-wash" },
        label: { en: "Pressure Chemical Wash", ms: "Cuci Kimia Bertekanan", zh: "高压化学清洗" },
        blurb: {
          en: "The deep clean for smell, weak airflow and 12+ month build-up.",
          ms: "Cucian dalam untuk bau, aliran udara lemah dan kotoran 12+ bulan.",
          zh: "针对异味、风量弱与 12 个月以上积垢的深度清洁。",
        },
        price: publishedPrices.chemicalWash15,
      },
      {
        href: { en: "/services/chemical-overhaul", ms: "/ms/services/chemical-overhaul", zh: "/zh/services/chemical-overhaul" },
        label: { en: "Chemical Overhaul", ms: "Chemical Overhaul", zh: "化学大修" },
        blurb: {
          en: "Full dismantle and soak when washing is no longer enough.",
          ms: "Buka penuh dan rendam apabila cucian tidak lagi mencukupi.",
          zh: "当清洗已不足够时，整机拆解浸泡。",
        },
        price: publishedPrices.overhaul15,
      },
      {
        href: { en: "/services/maintenance-contract", ms: "/ms/services/maintenance-contract", zh: "/zh/services/maintenance-contract" },
        label: { en: "Maintenance Contract (AMC)", ms: "Kontrak Penyelenggaraan (AMC)", zh: "保养合约（AMC）" },
        blurb: {
          en: "Quarterly servicing, priority response, locked-in yearly price.",
          ms: "Servis suku tahunan, respons keutamaan, harga tahunan terkunci.",
          zh: "每季度上门保养、优先响应、年度价格锁定。",
        },
        price: "RM 299 / year",
      },
    ],
  },
  {
    id: "by-frequency",
    accent: "emerald",
    eyebrow: { en: "When to Service", ms: "Bila Perlu Servis", zh: "何时保养" },
    title: { en: "Frequency & Scheduling", ms: "Kekerapan & Jadual", zh: "频率与排期" },
    links: [
      {
        href: { en: "/blog/how-often-service-aircond-malaysia", ms: "/ms/blog/how-often-service-aircond-malaysia", zh: "/zh/blog/how-often-service-aircond-malaysia" },
        label: { en: "How Often to Service", ms: "Berapa Kerap Perlu Servis", zh: "多久保养一次" },
        blurb: {
          en: "The straight answer for KL & Selangor usage patterns.",
          ms: "Jawapan terus untuk corak penggunaan KL & Selangor.",
          zh: "针对吉隆坡与雪兰莪使用习惯的直接答案。",
        },
      },
      {
        href: { en: "/blog/aircond-servicing-calendar-malaysia", ms: "/ms/blog/aircond-servicing-calendar-malaysia", zh: "/zh/blog/aircond-servicing-calendar-malaysia" },
        label: { en: "Yearly Servicing Calendar", ms: "Kalendar Servis Tahunan", zh: "年度保养日历" },
        blurb: {
          en: "A month-by-month plan that matches Malaysian seasons.",
          ms: "Pelan bulan demi bulan yang sepadan dengan musim Malaysia.",
          zh: "配合马来西亚气候的逐月保养计划。",
        },
      },
      {
        href: { en: "/blog/chemical-wash-every-6-vs-12-months-malaysia-2026", ms: "/ms/blog/chemical-wash-every-6-vs-12-months-malaysia-2026", zh: "/zh/blog/chemical-wash-every-6-vs-12-months-malaysia-2026" },
        label: { en: "Chemical Wash: 6 vs 12 Months", ms: "Cuci Kimia: 6 vs 12 Bulan", zh: "化学清洗：6 个月还是 12 个月" },
        blurb: {
          en: "When a 6-month cycle genuinely pays for itself.",
          ms: "Bila kitaran 6 bulan benar-benar berbaloi.",
          zh: "什么时候 6 个月一次真正划算。",
        },
      },
      {
        href: { en: "/blog/aircond-maintenance-checklist-malaysia", ms: "/ms/blog/aircond-maintenance-checklist-malaysia", zh: "/zh/blog/aircond-maintenance-checklist-malaysia" },
        label: { en: "Maintenance Checklist", ms: "Senarai Semak Penyelenggaraan", zh: "保养检查清单" },
        blurb: {
          en: "The full checklist technicians follow on every visit.",
          ms: "Senarai semak penuh yang juruteknik ikuti pada setiap lawatan.",
          zh: "技术员每次上门遵循的完整检查清单。",
        },
      },
    ],
  },
  {
    id: "by-care",
    accent: "amber",
    eyebrow: { en: "Seasonal & Home Care", ms: "Penjagaan Bermusim & Rumah", zh: "季节与居家保养" },
    title: { en: "Everyday Aircond Care", ms: "Penjagaan Aircond Harian", zh: "日常冷气护理" },
    links: [
      {
        href: { en: "/blog/3-minute-rule-aircon-malaysia", ms: "/ms/blog/3-minute-rule-aircon-malaysia", zh: "/zh/blog/3-minute-rule-aircon-malaysia" },
        label: { en: "The 3-Minute Rule", ms: "Peraturan 3 Minit", zh: "三分钟规则" },
        blurb: {
          en: "The habit that protects your compressor from damage.",
          ms: "Tabiat yang melindungi pekali anda daripada kerosakan.",
          zh: "保护压缩机免受损坏的习惯。",
        },
      },
      {
        href: { en: "/blog/aircond-mould-prevention-malaysia", ms: "/ms/blog/aircond-mould-prevention-malaysia", zh: "/zh/blog/aircond-mould-prevention-malaysia" },
        label: { en: "Mould Prevention", ms: "Cegah Kulat", zh: "霉菌预防" },
        blurb: {
          en: "Stop mould before it starts in humid Malaysian air.",
          ms: "Hentikan kulat sebelum ia bermula dalam udara lembap Malaysia.",
          zh: "在马来西亚潮湿空气中，于霉菌滋生前先预防。",
        },
      },
      {
        href: { en: "/blog/aircond-cleaning-after-haze-malaysia", ms: "/ms/blog/aircond-cleaning-after-haze-malaysia", zh: "/zh/blog/aircond-cleaning-after-haze-malaysia" },
        label: { en: "Cleaning After Haze", ms: "Cucian Selepas Jerebu", zh: "烟霾后的清洗" },
        blurb: {
          en: "Filters and coils pick up haze particulates — here's the fix.",
          ms: "Penapis dan gegelung menyerap partikel jerebu — ini penyelesaiannya.",
          zh: "滤网与盘管会吸附烟霾颗粒 — 这是解决方法。",
        },
      },
      {
        href: { en: "/blog/aircond-for-baby-kids-room-malaysia", ms: "/ms/blog/aircond-for-baby-kids-room-malaysia", zh: "/zh/blog/aircond-for-baby-kids-room-malaysia" },
        label: { en: "Aircond for Baby & Kids Rooms", ms: "Aircond untuk Bilik Bayi & Kanak-kanak", zh: "婴儿与儿童房冷气" },
        blurb: {
          en: "Temperature, airflow and hygiene for children's rooms.",
          ms: "Suhu, aliran udara dan kebersihan untuk bilik kanak-kanak.",
          zh: "儿童房的温度、风量与卫生要点。",
        },
      },
    ],
  },
  {
    id: "by-tool",
    accent: "violet",
    eyebrow: { en: "Plan & Decide", ms: "Rancang & Tentukan", zh: "规划与决策" },
    title: { en: "Decide What Your Unit Needs", ms: "Tentukan Apa Unit Anda Perlukan", zh: "判断您的机器需要什么" },
    links: [
      {
        href: { en: "/which-aircond-service-do-i-need", ms: "/ms/which-aircond-service-do-i-need", zh: "/zh/which-aircond-service-do-i-need" },
        label: { en: "Which Service Do I Need?", ms: "Servis Mana Yang Saya Perlukan?", zh: "我需要哪种服务？" },
        blurb: {
          en: "Answer 4 questions — get a service recommendation.",
          ms: "Jawab 4 soalan — dapatkan cadangan servis.",
          zh: "回答 4 个问题 — 获得服务建议。",
        },
      },
      {
        href: { en: "/blog/aircond-lifespan-malaysia", ms: "/ms/blog/aircond-lifespan-malaysia", zh: "/zh/blog/aircond-lifespan-malaysia" },
        label: { en: "How Long Should an Aircond Last?", ms: "Berapa Lama Jangka Hayat Aircond?", zh: "冷气能用多久？" },
        blurb: {
          en: "Realistic lifespan expectations and the maintenance that extends them.",
          ms: "Jangka hayat realistik dan penyelenggaraan yang memanjangkannya.",
          zh: "实际的寿命预期，以及延长寿命的保养方式。",
        },
      },
      {
        href: { en: "/blog/regular-aircond-basic-servicing-kl-selangor-2026", ms: "/ms/blog/regular-aircond-basic-servicing-kl-selangor-2026", zh: "/zh/blog/regular-aircond-basic-servicing-kl-selangor-2026" },
        label: { en: "Regular Basic Servicing", ms: "Servis Asas Berkala", zh: "定期基本保养" },
        blurb: {
          en: "Why consistency beats occasional deep cleaning.",
          ms: "Mengapa konsisten mengatasi cucian mendalam sekali-sekala.",
          zh: "为什么规律保养胜过偶尔深度清洗。",
        },
      },
      {
        href: { en: "/blog/diy-aircond-cleaning-vs-chemical-wash-malaysia", ms: "/ms/blog/diy-aircond-cleaning-vs-chemical-wash-malaysia", zh: "/zh/blog/diy-aircond-cleaning-vs-chemical-wash-malaysia" },
        label: { en: "DIY Cleaning vs Chemical Wash", ms: "Cucian DIY vs Cuci Kimia", zh: "DIY 清洗对比化学清洗" },
        blurb: {
          en: "What DIY actually achieves — and where it stops.",
          ms: "Apa yang DIY sebenarnya capai — dan di mana ia berhenti.",
          zh: "DIY 清洗实际能做什么 — 以及它的局限。",
        },
      },
    ],
  },
];

const MAINTENANCE_TABLE: HubTable = {
  title: {
    en: "Aircond Maintenance Services Compared",
    ms: "Perbandingan Perkhidmatan Penyelenggaraan Aircond",
    zh: "冷气保养服务对比",
  },
  intro: {
    en: "The four maintenance options we offer, how often each is needed, and what it costs. Prices are for wall-mounted 1.0–1.5 HP units.",
    ms: "Empat pilihan penyelenggaraan yang kami tawarkan, kekerapan yang diperlukan, dan kosnya. Harga untuk unit dinding 1.0–1.5 HP.",
    zh: "我们提供的四种保养方案、所需频率与费用。价格按挂壁式 1.0–1.5 匹计算。",
  },
  headers: {
    en: ["Service", "How Often", "What It Does", "Price"],
    ms: ["Servis", "Kekerapan", "Apa Yang Dilakukan", "Harga"],
    zh: ["服务", "频率", "内容", "价格"],
  },
  rows: [
    {
      cells: {
        en: ["Basic Servicing", "Every 3–6 months", "Filter wash, drain flush, 8-point check", publishedPrices.basic15],
        ms: ["Servis Asas", "Setiap 3–6 bulan", "Cuci penapis, bilas saliran, semakan 8 titik", publishedPrices.basic15],
        zh: ["基本保养", "每 3–6 个月", "清洗滤网、冲洗排水管、8 点检查", publishedPrices.basic15],
      },
    },
    {
      cells: {
        en: ["Pressure Chemical Wash", "Every 12–18 months", "High-pressure deep clean of coil & blower", publishedPrices.chemicalWash15],
        ms: ["Cuci Kimia Bertekanan", "Setiap 12–18 bulan", "Cucian dalam tekanan tinggi gegelung & blower", publishedPrices.chemicalWash15],
        zh: ["高压化学清洗", "每 12–18 个月", "高压深度清洁盘管与风轮", publishedPrices.chemicalWash15],
      },
    },
    {
      cells: {
        en: ["Chemical Overhaul", "Every 2–3 years", "Full dismantle, soak, sanitize, reassemble", publishedPrices.overhaul15],
        ms: ["Chemical Overhaul", "Setiap 2–3 tahun", "Buka penuh, rendam, sanitasi, pasang semula", publishedPrices.overhaul15],
        zh: ["化学大修", "每 2–3 年", "整机拆解、浸泡、消毒、重装", publishedPrices.overhaul15],
      },
    },
    {
      cells: {
        en: ["AMC Plan", "Yearly contract", "Scheduled visits + priority response", "RM 299 / year"],
        ms: ["Pelan AMC", "Kontrak tahunan", "Lawatan berjadual + respons keutamaan", "RM 299 / tahun"],
        zh: ["保养合约（AMC）", "年度合约", "定期上门 + 优先响应", "每年 RM 299"],
      },
    },
  ],
};

const MAINTENANCE_COPY: Record<HubLocale, HubCopy> = {
  en: {
    metaTitle: "Aircond Maintenance & Servicing Guides — KL Renovator",
    metaDescription:
      "Keep your aircond healthy in Malaysia's climate: service frequency, chemical wash vs overhaul, AMC plans from RM 299/year and the full maintenance guide library.",
    eyebrow: "Maintenance Hub",
    h1: "Aircond Maintenance & Servicing in KL & Selangor",
    intro:
      "Everything you need to keep an aircond running efficiently in Malaysia's tropical climate — how often to service it, what basic servicing, pressure chemical wash and chemical overhaul each do, annual maintenance contracts from RM 299, and honest guidance on what your unit actually needs.",
    badges: ["Service Every 3–6 Months", "Chemical Wash 12–18 Months", "AMC From RM 299/Year", "20 Brands", "1-Month Warranty"],
    tableTitle: "Aircond Maintenance Services Compared",
    tableIntro:
      "The four maintenance options we offer, how often each is needed, and what it costs. Prices are for wall-mounted 1.0–1.5 HP units.",
    editorialTitle: "Why aircond maintenance matters in KL & Selangor",
    editorialBody: [
      "A Malaysian aircond runs 8–12 hours a day for most of the year, in humidity that keeps the evaporator coil wet around the clock. That combination produces exactly what shortens an aircond's life: biofilm on the coil, mould in the drain line, and fans that labour against dust. Regular servicing removes the build-up before it becomes a repair.",
      "Maintenance is also the cheapest form of energy saving. A coil blocked with dust and biofilm cools less, so the compressor runs longer to reach the same temperature — the difference shows up directly in the TNB bill. A RM 99 basic service or RM 120 chemical wash typically restores cooling output to 90–95% of a new unit.",
    ],
    directQuestion: "How often should an aircond be serviced in Malaysia?",
    directAnswer:
      "Basic servicing every 3–6 months for units used 8+ hours daily, and every 6 months for lighter use. A pressure chemical wash every 12–18 months, and a chemical overhaul every 2–3 years. An AMC plan bundles these into a fixed yearly price from RM 299.",
    faqs: [
      {
        q: "How often should I service my aircond in Malaysia?",
        a: "Units running 8+ hours a day: basic service every 3–4 months. Moderate use: every 6 months. Pressure chemical wash every 12–18 months, and a chemical overhaul every 2–3 years or when cooling drops noticeably despite regular washing.",
      },
      {
        q: "What is the difference between basic servicing and chemical wash?",
        a: "Basic service cleans the filters, flushes the drain and checks the electricals — about 45 minutes. A chemical wash forces food-safe chemical at 80–120 PSI into the coil fins and blower wheel, dissolving biofilm and mould. Use basic service for upkeep; chemical wash for smell, weak airflow or heavy build-up.",
      },
      {
        q: "Is an aircond maintenance contract (AMC) worth it?",
        a: "For a unit used 6+ hours daily, yes: the Basic AMC at RM 299/year covers two basic services and one chemical wash that would cost RM 318 booked separately — plus priority scheduling and locked-in pricing. Multi-unit homes and businesses save more.",
      },
      {
        q: "How long does an aircond last with regular maintenance?",
        a: "A well-maintained split unit typically lasts 10–15 years in Malaysia, versus 5–8 years for a neglected one. Regular servicing also protects the compressor — the single most expensive component — by keeping the system clean and correctly charged.",
      },
      {
        q: "Can I maintain my aircond myself instead of booking a service?",
        a: "You can wash filters monthly and keep the area around the outdoor unit clear — both genuinely help. The drain flush, coil cleaning, gas pressure check and electrical audit need tools and training; skip them and small problems become RM 420 overhauls or worse.",
      },
    ],
    ctaTitle: "Book your next aircond service",
    ctaBody:
      "Basic servicing from RM 99, pressure chemical wash from RM 120, or an AMC from RM 299/year. Same-day slots across KL & Selangor, all 20 brands, 1-month workmanship warranty.",
    fullIndexTitle: "Every Maintenance Guide",
    relatedTitle: "Explore Other Topic Hubs",
    photos: {
      eyebrow: "Real Servicing Work",
      heading: "Maintenance Our Technicians Perform",
      intro:
        "Filter washes, chemical washes and overhauls — real KL Renovator servicing jobs photographed across KL & Selangor.",
      heroTitle: "Chemical Wash in Shah Alam",
      heroAlt: "KL Renovator technician performing a pressure chemical wash in Shah Alam",
    },
  },
  ms: {
    metaTitle: "Panduan Penyelenggaraan Aircond KL — RM 99 | KL Renovator",
    metaDescription:
      "Pastikan aircond anda sihat: kekerapan servis, cuci kimia vs overhaul, pelan AMC dari RM 299/tahun dan pustaka panduan penyelenggaraan penuh.",
    eyebrow: "Hab Penyelenggaraan",
    h1: "Penyelenggaraan & Servis Aircond di KL & Selangor",
    intro:
      "Semua yang anda perlukan untuk memastikan aircond beroperasi dengan cekap dalam iklim tropika Malaysia — kekerapan servis, apa yang dilakukan oleh servis asas, cuci kimia bertekanan dan chemical overhaul, kontrak penyelenggaraan tahunan dari RM 299, serta nasihat jujur tentang apa yang unit anda sebenarnya perlukan.",
    badges: ["Servis Setiap 3–6 Bulan", "Cuci Kimia 12–18 Bulan", "AMC Dari RM 299/Tahun", "20 Jenama", "Waranti 1 Bulan"],
    tableTitle: "Perbandingan Perkhidmatan Penyelenggaraan Aircond",
    tableIntro:
      "Empat pilihan penyelenggaraan yang kami tawarkan, kekerapan yang diperlukan, dan kosnya. Harga untuk unit dinding 1.0–1.5 HP.",
    editorialTitle: "Mengapa penyelenggaraan aircond penting di KL & Selangor",
    editorialBody: [
      "Aircond Malaysia beroperasi 8–12 jam sehari hampir sepanjang tahun, dalam kelembapan yang mengekalkan gegelung penyejat basah sepanjang masa. Gabungan itu menghasilkan tepat apa yang memendekkan jangka hayat aircond: biofilm pada gegelung, kulat dalam saliran, dan kipas yang terpaksa bekerja menentang habuk. Servis berkala membuang timbunan sebelum ia menjadi pembaikan.",
      "Penyelenggaraan juga ialah cara penjimatan tenaga paling murah. Gegelung yang tersumbat habuk dan biofilm menyejukkan kurang, jadi pekali berjalan lebih lama untuk mencapai suhu yang sama — perbezaannya kelihatan terus pada bil TNB. Servis asas RM 99 atau cuci kimia RM 120 biasanya memulihkan output penyejukan kepada 90–95% unit baharu.",
    ],
    directQuestion: "Berapa kerap aircond perlu diservis di Malaysia?",
    directAnswer:
      "Servis asas setiap 3–6 bulan untuk unit yang digunakan 8+ jam sehari, dan setiap 6 bulan untuk penggunaan ringan. Cuci kimia bertekanan setiap 12–18 bulan, dan chemical overhaul setiap 2–3 tahun. Pelan AMC menggabungkan semua ini pada harga tahunan tetap dari RM 299.",
    faqs: [
      {
        q: "Berapa kerap saya perlu menservis aircond di Malaysia?",
        a: "Unit yang digunakan 8+ jam sehari: servis asas setiap 3–4 bulan. Penggunaan sederhana: setiap 6 bulan. Cuci kimia bertekanan setiap 12–18 bulan, dan chemical overhaul setiap 2–3 tahun atau apabila penyejukan menurun walaupun selepas cucian biasa.",
      },
      {
        q: "Apa beza servis asas dan cuci kimia?",
        a: "Servis asas membersihkan penapis, membilas saliran dan memeriksa elektrikal — kira-kira 45 minit. Cuci kimia menyembur bahan kimia selamat makanan pada 80–120 PSI ke dalam sirip gegelung dan roda blower, melarutkan biofilm dan kulat. Gunakan servis asas untuk penyelenggaraan; cuci kimia untuk bau, aliran udara lemah atau kotoran tebal.",
      },
      {
        q: "Adakah kontrak penyelenggaraan aircond (AMC) berbaloi?",
        a: "Untuk unit yang digunakan 6+ jam sehari: ya. AMC Basic RM 299/tahun merangkumi dua servis asas dan satu cuci kimia yang berharga RM 318 jika ditempah berasingan — ditambah keutamaan jadual dan harga terkunci. Rumah dan perniagaan berbilang unit menjimatkan lebih banyak.",
      },
      {
        q: "Berapa lama aircond bertahan dengan penyelenggaraan berkala?",
        a: "Unit split yang diselenggara baik biasanya bertahan 10–15 tahun di Malaysia, berbanding 5–8 tahun untuk unit yang diabaikan. Servis berkala juga melindungi pekali — komponen paling mahal — dengan memastikan sistem bersih dan cas gas betul.",
      },
      {
        q: "Bolehkah saya menyelenggara aircond sendiri?",
        a: "Anda boleh mencuci penapis setiap bulan dan memastikan kawasan unit luar bersih — kedua-duanya benar-benar membantu. Bilasan saliran, pembersihan gegelung, semakan tekanan gas dan audit elektrik memerlukan alatan dan latihan; abaikan dan masalah kecil menjadi overhaul RM 420 atau lebih teruk.",
      },
    ],
    ctaTitle: "Tempah servis aircond anda yang seterusnya",
    ctaBody:
      "Servis asas dari RM 99, cuci kimia bertekanan dari RM 120, atau AMC dari RM 299/tahun. Slot hari sama di seluruh KL & Selangor, semua 20 jenama, waranti mutu kerja 1 bulan.",
    fullIndexTitle: "Semua Panduan Penyelenggaraan",
    relatedTitle: "Terokai Hab Topik Lain",
    photos: {
      eyebrow: "Kerja Servis Sebenar",
      heading: "Penyelenggaraan Yang Juruteknik Kami Lakukan",
      intro:
        "Cuci penapis, cuci kimia dan overhaul — kerja servis sebenar KL Renovator dirakam di seluruh KL & Selangor.",
      heroTitle: "Cuci Kimia di Shah Alam",
      heroAlt: "Juruteknik KL Renovator melakukan cuci kimia bertekanan di Shah Alam",
    },
  },
  zh: {
    metaTitle: "冷气保养与维修指南 吉隆坡雪兰莪 — RM99起 | KL Renovator",
    metaDescription:
      "在马来西亚气候下保养冷气：保养频率、化学清洗与大修的区别、每年RM 299起的保养合约，以及完整保养指南库。",
    eyebrow: "保养总览",
    h1: "吉隆坡与雪兰莪冷气保养与维修",
    intro:
      "在马来西亚的热带气候下让冷气保持高效运转所需的一切 — 多久保养一次、基本保养、高压化学清洗与化学大修各做什么、每年 RM 299 起的保养合约，以及关于您的机器真正需要什么的诚实建议。",
    badges: ["每 3–6 个月保养", "化学清洗 12–18 个月", "保养合约每年 RM 299 起", "20 大品牌", "1 个月保修"],
    tableTitle: "冷气保养服务对比",
    tableIntro: "我们提供的四种保养方案、所需频率与费用。价格按挂壁式 1.0–1.5 匹计算。",
    editorialTitle: "为什么冷气保养在吉隆坡与雪兰莪如此重要",
    editorialBody: [
      "马来西亚的冷气一年中大部分时间每天运行 8–12 小时，湿度使蒸发器盘管几乎全天保持潮湿。这种组合恰好会产生缩短冷气寿命的东西：盘管上的生物膜、排水管中的霉菌，以及顶着灰尘运转的风扇。定期保养能在积垢变成维修问题之前将其清除。",
      "保养也是最省钱的节能方式。被灰尘和生物膜堵塞的盘管制冷效率下降，压缩机必须运转更久才能达到相同温度 — 差异会直接体现在电费单上。RM 99 基本保养或 RM 120 化学清洗通常可将制冷能力恢复到新机的 90–95%。",
    ],
    directQuestion: "在马来西亚，冷气应该多久保养一次？",
    directAnswer:
      "每天使用 8 小时以上的机器每 3–6 个月做一次基本保养，使用较少的每 6 个月一次。高压化学清洗每 12–18 个月一次，化学大修每 2–3 年一次。AMC 保养合约将这些打包为每年 RM 299 起的固定价格。",
    faqs: [
      {
        q: "在马来西亚应该多久保养一次冷气？",
        a: "每天使用 8 小时以上：每 3–4 个月基本保养一次。中等使用：每 6 个月一次。高压化学清洗每 12–18 个月一次；化学大修每 2–3 年一次，或当定期清洗后制冷仍明显下降时进行。",
      },
      {
        q: "基本保养和化学清洗有什么区别？",
        a: "基本保养清洗滤网、冲洗排水管并检查电气部分 — 约 45 分钟。化学清洗以 80–120 PSI 将食品级清洗液喷入盘管翅片与风轮内部，溶解生物膜与霉菌。日常维护用基本保养；异味、风量弱或积垢严重时用化学清洗。",
      },
      {
        q: "冷气保养合约（AMC）划算吗？",
        a: "每天使用 6 小时以上的机器：划算。每年 RM 299 的基本 AMC 包含两次基本保养和一次化学清洗，单独预订需 RM 318 — 另享优先排期与价格锁定。多机家庭与企业节省更多。",
      },
      {
        q: "定期保养的冷气能用多久？",
        a: "保养良好的分体机在马来西亚通常可用 10–15 年，疏于保养的只有 5–8 年。定期保养还能保护最昂贵的部件 — 压缩机 — 让系统保持清洁与冷媒充足。",
      },
      {
        q: "可以自己保养冷气而不预约服务吗？",
        a: "您可以每月清洗滤网并保持室外机周围清洁 — 这两项确实有帮助。冲洗排水管、清洁盘管、检查气压与电气审计需要工具和培训；跳过这些，小问题会变成 RM 420 的大修甚至更糟。",
      },
    ],
    ctaTitle: "预约下一次冷气保养",
    ctaBody:
      "基本保养 RM 99 起、高压化学清洗 RM 120 起，或每年 RM 299 起的保养合约。吉隆坡与雪兰莪当天可约，全部 20 大品牌，1 个月工艺保修。",
    fullIndexTitle: "全部保养指南",
    relatedTitle: "浏览其他主题总览",
    photos: {
      eyebrow: "真实保养实况",
      heading: "技术员实际执行的保养",
      intro:
        "滤网清洗、化学清洗与大修 — KL Renovator 在吉隆坡与雪兰莪的真实保养工程现场照片。",
      heroTitle: "莎阿南化学清洗实况",
      heroAlt: "KL Renovator 技术员在莎阿南进行高压化学清洗",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Member slug lists (single source for hub → member links)
// ─────────────────────────────────────────────────────────────────────────

export const TOPIC_HUBS: Record<TopicHubId, TopicHub> = {
  pricing: {
    id: "pricing",
    slug: "/pricing",
    groups: PRICING_GROUPS,
    table: PRICING_TABLE,
    copy: PRICING_COPY,
    members: {
      blog: [
        "aircond-service-price-guide-kl-2026",
        "ac-service-price-malaysia-2026",
        "aircond-chemical-wash-price-malaysia-2026",
        "harga-servis-aircond-2026-malaysia",
        "aircond-installation-cost-malaysia-2026",
        "aircond-installation-cost-kl-vs-selangor-2026",
        "rm199-vs-rm300-aircond-installation-kl-renovator",
        "ac-unit-installation-cost-malaysia",
        "why-aircond-installation-expensive-malaysia",
        "aircond-installation-time-malaysia",
        "aircond-rm99-service-too-cheap-malaysia-2026",
        "baiki-vs-tukar-baru-aircond-malaysia",
        "aircond-amc-vs-one-time-service-malaysia-2026",
        "aircond-maintenance-contract-malaysia-2026",
        "daikin-vs-panasonic-aircond-service-cost-malaysia-2026",
        "inverter-vs-non-inverter-aircond-repair-cost-malaysia-2026",
        "shopee-aircond-service-vs-direct-booking-malaysia-2026",
        "tnb-bill-high-check-aircond-efficiency-malaysia-2026",
        "1-hour-ac-electricity-cost-malaysia",
        "how-to-reduce-aircond-electricity-bill-malaysia",
      ],
      tools: [
        "/aircond-installation-cost-calculator",
        "/aircond-gas-topup-cost-calculator",
        "/aircond-electricity-cost-calculator",
        "/aircond-savings-calculator",
        "/aircond-size-calculator",
        "/btu-calculator",
        "/which-aircond-service-do-i-need",
      ],
      problems: [],
      services: ["basic-servicing", "chemical-wash", "chemical-overhaul", "gas-topup", "repair"],
    },
  },
  troubleshooting: {
    id: "troubleshooting",
    slug: "/troubleshooting",
    groups: TROUBLESHOOTING_GROUPS,
    table: TROUBLESHOOTING_TABLE,
    copy: TROUBLESHOOTING_COPY,
    members: {
      blog: [
        "aircond-troubleshooting-guide-malaysia",
        "aircond-troubleshooting-repair-kl-selangor-leaks-noise-wiring",
        "aircond-error-codes-blinking-lights-guide-malaysia",
        "aircond-not-cold-reasons",
        "aircond-water-leaking-causes",
        "signs-your-aircon-needs-chemical-overhaul-malaysia",
        "new-aircond-not-cold-first-month-malaysia",
        "aircond-power-surge-protection-malaysia",
      ],
      tools: [],
      problems: [
        "aircond-not-cold",
        "aircond-weak-airflow",
        "aircond-low-gas",
        "aircond-gas-leak",
        "aircond-freezing-up",
        "aircond-water-leaking",
        "aircond-indoor-unit-leaking",
        "aircond-water-dripping",
        "aircond-bad-smell",
        "aircond-not-turning-on",
        "aircond-tripping-power",
        "aircond-blinking-light",
        "aircond-remote-not-working",
        "aircond-thermostat-problems",
        "aircond-making-noise",
        "aircond-fan-not-working",
        "aircond-outdoor-unit-not-running",
        "aircond-compressor-problem",
        "aircond-pcb-problem",
        "aircond-high-electricity-bill",
      ],
      services: ["repair"],
    },
  },
  maintenance: {
    id: "maintenance",
    slug: "/maintenance",
    groups: MAINTENANCE_GROUPS,
    table: MAINTENANCE_TABLE,
    copy: MAINTENANCE_COPY,
    members: {
      blog: [
        "how-often-service-aircond-malaysia",
        "aircond-servicing-calendar-malaysia",
        "aircond-maintenance-checklist-malaysia",
        "chemical-wash-every-6-vs-12-months-malaysia-2026",
        "regular-aircond-basic-servicing-kl-selangor-2026",
        "aircond-lifespan-malaysia",
        "aircond-remote-timer-features-guide-malaysia",
        "3-minute-rule-aircon-malaysia",
        "aircond-leaking-water-malaysia",
        "servis-aircond-rumah-sewa-airbnb-malaysia",
        "aircond-for-baby-kids-room-malaysia",
        "aircond-mould-prevention-malaysia",
        "aircond-cleaning-after-haze-malaysia",
        "diy-aircond-cleaning-vs-chemical-wash-malaysia",
        "pressure-chemical-wash-leaking-aircond-kl-selangor",
        "aircond-chemical-overhaul-kl-selangor-cooling-efficiency",
      ],
      tools: ["/which-aircond-service-do-i-need"],
      problems: [],
      services: ["basic-servicing", "chemical-wash", "chemical-overhaul", "maintenance-contract"],
    },
  },
};

/** All three hub ids in display order (used for the cross-hub strip). */
export const TOPIC_HUB_IDS: TopicHubId[] = ["pricing", "troubleshooting", "maintenance"];

/** Short display label per hub, per locale (cross-hub strip + nav helpers). */
export const HUB_SHORT_LABEL: Record<TopicHubId, Record<HubLocale, string>> = {
  pricing: { en: "Pricing", ms: "Harga", zh: "价格" },
  troubleshooting: { en: "Troubleshooting", ms: "Penyelesaian Masalah", zh: "故障排查" },
  maintenance: { en: "Maintenance", ms: "Penyelenggaraan", zh: "保养" },
};

/** One-line descriptor per hub, per locale (cross-hub strip). */
export const HUB_SHORT_BLURB: Record<TopicHubId, Record<HubLocale, string>> = {
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
