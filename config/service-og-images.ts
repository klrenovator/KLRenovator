// config/service-og-images.ts
// Purpose: Provide branded service-specific OG images for all service pages (EN/MS/ZH)
// Using real work photos from /public/hero that already exist in the repo

export type ServiceOGImage = {
  url: string; // absolute or relative (will be resolved via metadataBase)
  width: number;
  height: number;
  alt: string;
  altMS?: string;
  altZH?: string;
};

export const SERVICE_OG_IMAGES: Record<string, ServiceOGImage> = {
  "chemical-wash": {
    url: "/hero/aircond-pressure-chemical-wash-selangor.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Pressure Chemical Wash — Deep cleaning wall-mounted aircond in Selangor",
    altMS: "KL Renovator Cuci Kimia Bertekanan — Pembersihan mendalam aircond dinding di Selangor",
    altZH: "KL Renovator 高压化学清洗 — 雪兰莪壁挂式冷气深度清洁",
  },
  "chemical-overhaul": {
    url: "/hero/aircond-chemical-overhaul-ampang-selangor.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Chemical Overhaul — Full dismantle deep clean in Ampang Selangor",
    altMS: "KL Renovator Overhaul Kimia — Buka penuh cuci mendalam di Ampang Selangor",
    altZH: "KL Renovator 化学大修 — 安邦雪兰莪全面拆卸深度清洁",
  },
  "gas-topup": {
    url: "/hero/aircond-gas-topup-r32-r410a-selangor.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Gas Top-Up — R32 R410A precision balancing in Selangor",
    altMS: "KL Renovator Tambah Gas — Imbangan tepat R32 R410A di Selangor",
    altZH: "KL Renovator 冷气加气 — 雪兰莪 R32 R410A 精准平衡",
  },
  repair: {
    url: "/hero/aircond-repair-technician-klang-valley.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Repair Technician — Diagnosing aircond fault in Klang Valley",
    altMS: "Juruteknik Baiki KL Renovator — Diagnosis kerosakan aircond di Lembah Klang",
    altZH: "KL Renovator 维修技术员 — 巴生谷冷气故障诊断",
  },
  installation: {
    url: "/hero/aircond-installation-wall-mounted-kl.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Installation — Wall-mounted aircond copper piping in KL",
    altMS: "KL Renovator Pemasangan — Paip tembaga aircond dinding di KL",
    altZH: "KL Renovator 安装 — 吉隆坡壁挂式冷气铜管安装",
  },
  "basic-servicing": {
    url: "/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Basic Servicing — Filter cleaning and diagnostic in Kuala Lumpur",
    altMS: "KL Renovator Servis Asas — Cuci penapis dan diagnostik di Kuala Lumpur",
    altZH: "KL Renovator 基本保养 — 吉隆坡滤网清洁与诊断",
  },
  "ceiling-cassette": {
    url: "/hero/aircond-ceiling-cassette-installation-commercial.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Ceiling Cassette — Commercial installation and service",
    altMS: "KL Renovator Ceiling Cassette — Pemasangan dan servis komersial",
    altZH: "KL Renovator 天花板卡式机 — 商业安装与服务",
  },
  "dismantling-relocation": {
    url: "/hero/daikin-aircond-dismantle-relocation-puchong-45.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Dismantle & Relocation — Safe aircond removal in Puchong",
    altMS: "KL Renovator Buka & Pindah — Cabut aircond selamat di Puchong",
    altZH: "KL Renovator 拆除与搬迁 — 蒲种安全拆卸冷气",
  },
  emergency: {
    url: "/hero/aircond-repair-technician-klang-valley.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Emergency Repair — Same-day urgent aircond service KL & Selangor",
    altMS: "KL Renovator Baiki Kecemasan — Servis aircond urgent hari sama KL & Selangor",
    altZH: "KL Renovator 紧急维修 — 吉隆坡雪兰莪当天紧急冷气服务",
  },
  "maintenance-contract": {
    url: "/hero/aircond-chemical-service-canvas-wrap-kl.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Maintenance Contract — Annual AMC servicing with canvas protection",
    altMS: "KL Renovator Kontrak Penyelenggaraan — Servis tahunan AMC dengan alas",
    altZH: "KL Renovator 保养合约 — 年度AMC保养与防护",
  },
  // Fallback for any unknown slug
  _default: {
    url: "/hero/aircond-installation-kuala-lumpur.webp",
    width: 1200,
    height: 630,
    alt: "KL Renovator Aircond Service — Expert servicing across KL & Selangor",
    altMS: "KL Renovator Servis Aircond — Servis pakar di KL & Selangor",
    altZH: "KL Renovator 冷气服务 — 吉隆坡雪兰莪专业服务",
  },
};

export function getServiceOGImage(slug: string, locale: "en" | "ms" | "zh" = "en"): ServiceOGImage {
  const base = SERVICE_OG_IMAGES[slug] || SERVICE_OG_IMAGES._default;
  const alt =
    locale === "ms" ? base.altMS || base.alt : locale === "zh" ? base.altZH || base.alt : base.alt;
  return {
    ...base,
    alt,
    // Return absolute URL for OG (metadataBase will also resolve relative, but absolute is safer for scrapers)
    url: base.url.startsWith("http") ? base.url : `https://www.klrenovator.com${base.url}`,
  };
}

export function getServiceOGImages(slug: string, locale: "en" | "ms" | "zh" = "en") {
  const img = getServiceOGImage(slug, locale);
  return [
    {
      url: img.url,
      width: img.width,
      height: img.height,
      alt: img.alt,
    },
  ];
}
