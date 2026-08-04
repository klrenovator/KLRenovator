// Content data for INS-08 (per-HP) and INS-09 (per-type) installation landing pages.
// Imported by components/installation-landing-page.tsx and each thin page file.

import { Metadata } from "next";
import { buildInstallationMetaTitle } from "@/lib/seo-title-optimizer";
import { buildInstallationMetaDesc } from "@/lib/seo-description-optimizer";

export type InstallationLocale = "en" | "ms" | "zh";
export type InstallationPageKey =
  | "1hp"
  | "1.5hp"
  | "2hp"
  | "wall-mounted"
  | "ceiling-cassette"
  | "window-unit";

type PricingRow = {
  hp: string;
  labour: string;
  pipe: string;
  bracket: string;
  note?: string;
};

type WhyItem = {
  title: string;
  desc: string;
};

type FAQ = { q: string; a: string };

export type InstallationPageContent = {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  ogImageAlt: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  heroBadges: string[];
  overviewTitle: string;
  overviewBody: string;
  bestForTitle: string;
  bestForItems: string[];
  pricingTitle: string;
  pricingRows: PricingRow[];
  includedTitle: string;
  includedItems: string[];
  extrasTitle: string;
  extrasItems: string[];
  whyTitle: string;
  whyItems: WhyItem[];
  faqs: FAQ[];
  ctaTitle: string;
  ctaBody: string;
  whatsAppLabel: string;
  callLabel: string;
  breadcrumbLabel: string;
};

const basePricing = {
  en: {
    included: [
      "Site survey & quotation (free)",
      "7 ft copper pipe (liquid + gas lines)",
      "7 ft electrical wiring",
      "7 ft PVC drain pipe",
      "Standard outdoor bracket",
      "Vacuum pump commissioning",
      "Refrigerant release & testing",
      "1-month workmanship warranty card",
    ],
    extras: [
      "Copper pipe beyond 7 ft: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP)",
      "Drain pipe beyond 7 ft: RM 5/ft",
      "Wire beyond 7 ft: RM 9/ft (1.0–1.5 HP), RM 13/ft (2.0–2.5 HP), RM 17/ft (3.0–4.0 HP)",
      "PVC casing/concealment: RM 6–12/ft",
      "Standard compressor / outdoor bracket: RM 45",
      "Heavy-duty compressor / outdoor bracket: RM 70",
      "New electrical plug point: RM 100",
      "Wall hacking/concealment: RM 6/ft",
      "High-rise/difficult access: RM 50–150",
    ],
  },
  ms: {
    included: [
      "Pemeriksaan tapak & sebut harga (percuma)",
      "7 ft paip tembaga (tali cecair + gas)",
      "7 ft wayar elektrik",
      "7 ft paip saliran PVC",
      "Braket luar standard disertakan",
      "Pentauliahan pam vakum",
      "Pelepasan refrigeran & ujian",
      "Kad waranti kerja 1 bulan",
    ],
    extras: [
      "Paip tembaga melebihi 7 ft: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP)",
      "Paip saliran melebihi 7 ft: RM 5/ft",
      "Wayar elektrik melebihi 7 ft: RM 9/ft (1.0–1.5 HP), RM 13/ft (2.0–2.5 HP), RM 17/ft (3.0–4.0 HP)",
      "Casing PVC/penyembunyian: RM 6–12/ft",
      "Braket kompressor / luaran standard: RM 45",
      "Braket kompressor / luaran heavy-duty: RM 70",
      "Pasang plug point baharu: RM 100",
      "Pecah dinding/penyembunyian: RM 6/ft",
      "Tinggi/susah akses: RM 50–150",
    ],
  },
  zh: {
    included: [
      "免费现场勘察与报价",
      "7尺铜管（液管+气管）",
      "7尺电线",
      "7尺PVC排水管",
      "标准室外机支架",
      "真空泵抽真空调试",
      "冷媒释放与运行测试",
      "1个月工艺保修卡",
    ],
    extras: [
      "超出7尺铜管：RM 17/尺 (1.0–1.5 匹), RM 23/尺 (2.0–2.5 匹), RM 27/尺 (3.0–3.5 匹)",
      "超出7尺排水管：RM 5/尺",
      "超出7尺电线：RM 9/尺 (1.0–1.5 匹), RM 13/尺 (2.0–2.5 匹), RM 17/尺 (3.0–4.0 匹)",
      "PVC套管/隐藏：RM 6–12/尺",
      "标准室外压缩机/支架：RM 45",
      "重型室外压缩机/支架：RM 70",
      "新增电源插座：RM 100",
      "敲墙/隐藏管线：RM 6/尺",
      "高层/困难施工：RM 50–150",
    ],
  },
};

const whyChoose: Record<InstallationLocale, WhyItem[]> = {
  en: [
    { title: "Certified HVAC Technicians", desc: "Trained installers, not general handymen. Every job follows Malaysian electrical and refrigeration standards." },
    { title: "Vacuum Pump Every Install", desc: "Mandatory 500-micron evacuation protects your compressor and keeps manufacturer warranty valid." },
    { title: "Price Confirmed First", desc: "We quote every extra material on-site before drilling. No hidden fees, no surprise bills." },
    { title: "Same-Day Available", desc: "Book before 11 AM and our KL & Selangor teams can usually install the same day." },
  ],
  ms: [
    { title: "Juruteknik HVAC Bertauliah", desc: "Pemasang berlatih, bukan tukang biasa. Setiap kerja mematuhi standard elektrik dan pendingin udara Malaysia." },
    { title: "Pam Vakum Setiap Pemasangan", desc: "Pengosongan 500 mikron wajib melindungi kompresor anda dan mengekalkan waranti pengeluar." },
    { title: "Harga Disahkan Dahulu", desc: "Kami sebut harga setiap bahan tambahan di tapak sebelum mengecer. Tiada caj tersembunyi." },
    { title: "Hari Sama Tersedia", desc: "Tempah sebelum 11 pagi dan pasukan KL & Selangor kami biasanya boleh pasang hari sama." },
  ],
  zh: [
    { title: "持证HVAC技师", desc: "专业安装技师，而非普通杂工。每项工程均符合马来西亚电气与制冷标准。" },
    { title: "每次安装都抽真空", desc: "强制500微米真空抽取，保护压缩机并维持制造商保修有效。" },
    { title: "先确认价格", desc: "施工前现场报出所有额外材料费用。无隐藏收费，无意外账单。" },
    { title: "可当天上门", desc: "上午11点前预约，我们覆盖吉隆坡和雪兰莪的团队通常可当天安装。" },
  ],
};

export const installationPageContent: Record<
  InstallationPageKey,
  Record<InstallationLocale, InstallationPageContent>
> = {
  "1hp": {
    en: {
      metaTitle: "1HP Aircond Installation KL — From RM199 | Bedroom Cooling | KL Renovator",
      metaDescription: "1HP aircond installation in KL & Selangor from RM199. Ideal for bedrooms up to 130 sq ft. Same-day available, 7ft copper pipe included, 1-month warranty. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "1HP Aircond Installation KL Selangor",
      eyebrow: "1HP Wall-Mounted Installation Specialists",
      h1: "1HP Aircond Installation KL & Selangor",
      subtitle: "From RM 199 · Same-Day · Perfect for Bedrooms & Small Rooms",
      heroBadges: ["From RM 199", "Same-Day Available", "1-Month Warranty", "7ft Copper Pipe Included"],
      overviewTitle: "Is 1HP the Right Size for Your Room?",
      overviewBody:
        "A 1HP wall-mounted aircond is the most popular choice for small bedrooms, guest rooms, and home offices across Kuala Lumpur and Selangor. It cools rooms up to 130 sq ft efficiently without oversizing, which saves electricity and reduces wear. Our technicians measure your room, check insulation, and confirm the ideal HP before installation — so you don't pay for capacity you don't need.",
      bestForTitle: "Best For",
      bestForItems: [
        "Bedrooms up to 130 sq ft (12 m²)",
        "Guest rooms and small home offices",
        "Single occupants or couples",
        "Rooms with moderate sun exposure",
        "Condos and apartments in PJ, Cheras, Ampang, Subang",
      ],
      pricingTitle: "1HP Installation Pricing",
      pricingRows: [
        { hp: "1.0 HP", labour: "RM 199", pipe: "7 ft included", bracket: "Standard included", note: "Wall-mounted" },
        { hp: "1.0 HP", labour: "RM 290", pipe: "7 ft included", bracket: "Ceiling kit included", note: "Ceiling cassette" },
      ],
      includedTitle: "What's Included",
      includedItems: basePricing.en.included,
      extrasTitle: "Optional Extras (Quoted First)",
      extrasItems: basePricing.en.extras,
      whyTitle: "Why Choose KL Renovator for 1HP Installation?",
      whyItems: whyChoose.en,
      faqs: [
        { q: "How much does 1HP aircond installation cost in KL?", a: "1HP wall-mounted installation starts from RM 199 including 7 ft copper pipe, wiring, drain pipe, and standard bracket. Ceiling cassette 1HP starts from RM 290. Extra materials beyond 7 ft are quoted before work begins." },
        { q: "Is 1HP enough for my bedroom?", a: "1HP is ideal for bedrooms up to 130 sq ft with normal ceiling height and moderate sun exposure. For west-facing rooms, large windows, or ceilings over 10 ft, 1.5HP may be better. We assess on-site and recommend the right size." },
        { q: "How long does 1HP installation take?", a: "A standard 1HP wall-mounted installation takes 3–4 hours including vacuum pump commissioning, electrical testing, and final run-check. Same-day installation is available for bookings made before 11 AM." },
        { q: "Do I need a dedicated circuit for a 1HP aircond?", a: "Yes — Malaysian electrical standards require a dedicated 16A MCB circuit for each 1HP unit. We include the wiring from your DB box and install an outdoor isolator as part of the installation." },
      ],
      ctaTitle: "Book 1HP Aircond Installation Today",
      ctaBody: "Same-day slots available across KL & Selangor. Get a confirmed price before we drill.",
      whatsAppLabel: "Book 1HP Installation via WhatsApp",
      callLabel: "Call +60 18-298 3573",
      breadcrumbLabel: "1HP Aircond Installation",
    },
    ms: {
      metaTitle: "Pemasangan Aircond 1HP KL — Dari RM199 | Sejuk Bilik | KL Renovator",
      metaDescription: "Pemasangan aircond 1HP di KL & Selangor dari RM199. Sesuai untuk bilik tidur sehingga 130 kaki persegi. Servis hari sama, paip tembaga 7ft disertakan, waranti 1 bulan. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "Pemasangan Aircond 1HP KL Selangor",
      eyebrow: "Pakar Pemasangan 1HP Dinding",
      h1: "Pemasangan Aircond 1HP KL & Selangor",
      subtitle: "Dari RM 199 · Hari Sama · Sesuai untuk Bilik Tidur & Bilik Kecil",
      heroBadges: ["Dari RM 199", "Hari Sama Tersedia", "Waranti 1 Bulan", "Paip Tembaga 7ft"],
      overviewTitle: "Adakah 1HP Saiz Yang Tepat untuk Bilik Anda?",
      overviewBody:
        "Aircond dinding 1HP adalah pilihan paling popular untuk bilik tidur kecil, bilik tetamu, dan pejabat rumah di Kuala Lumpur dan Selangor. Ia menyejukkan bilik sehingga 130 kaki persegi dengan cekap tanpa oversizing, menjimatkan elektrik dan mengurangkan haus. Juruteknik kami mengukur bilik anda, menyemak penebat, dan mengesahkan HP ideal sebelum pemasangan.",
      bestForTitle: "Sesuai Untuk",
      bestForItems: [
        "Bilik tidur sehingga 130 kaki persegi (12 m²)",
        "Bilik tetamu dan pejabat rumah kecil",
        "Penghuni tunggal atau pasangan",
        "Bilik dengan pendedahan matahari sederhana",
        "Kondominium dan pangsapuri di PJ, Cheras, Ampang, Subang",
      ],
      pricingTitle: "Harga Pemasangan 1HP",
      pricingRows: [
        { hp: "1.0 HP", labour: "RM 199", pipe: "7 ft disertakan", bracket: "Standard disertakan", note: "Dinding" },
        { hp: "1.0 HP", labour: "RM 290", pipe: "7 ft disertakan", bracket: "Kit siling disertakan", note: "Ceiling cassette" },
      ],
      includedTitle: "Apa Yang Termasuk",
      includedItems: basePricing.ms.included,
      extrasTitle: "Tambahan Pilihan (Disebut Dahulu)",
      extrasItems: basePricing.ms.extras,
      whyTitle: "Kenapa Pilih KL Renovator untuk Pemasangan 1HP?",
      whyItems: whyChoose.ms,
      faqs: [
        { q: "Berapa harga pemasangan aircond 1HP di KL?", a: "Pemasangan dinding 1HP bermula RM 199 termasuk 7 ft paip tembaga, wayar, paip saliran, dan braket standard. Ceiling cassette 1HP bermula RM 290. Bahan tambahan melebihi 7 ft disebut sebelum kerja bermula." },
        { q: "Adakah 1HP mencukupi untuk bilik tidur saya?", a: "1HP sesuai untuk bilik tidur sehingga 130 kaki persegi dengan ketinggian siling biasa dan pendedahan matahari sederhana. Untuk bilik menghadap barat, tingkap besar, atau siling melebihi 10 kaki, 1.5HP mungkin lebih baik. Kami nilai di tapak." },
        { q: "Berapa lama pemasangan 1HP?", a: "Pemasangan dinding 1HP standard mengambil masa 3–4 jam termasuk pentauliahan pam vakum, ujian elektrik, dan pemeriksaan akhir. Servis hari sama tersedia untuk tempahan sebelum 11 pagi." },
        { q: "Perlukah litar khas untuk aircond 1HP?", a: "Ya — standard elektrik Malaysia memerlukan litar 16A MCB khas untuk setiap unit 1HP. Kami termasuk wayar dari kotak DB anda dan memasang isolator luar sebagai sebahagian pemasangan." },
      ],
      ctaTitle: "Tempah Pemasangan Aircond 1HP Hari Ini",
      ctaBody: "Slot hari sama tersedia di KL & Selangor. Dapatkan harga disahkan sebelum kami mula mengecer.",
      whatsAppLabel: "Tempah Pemasangan 1HP via WhatsApp",
      callLabel: "Hubungi +60 18-298 3573",
      breadcrumbLabel: "Pemasangan Aircond 1HP",
    },
    zh: {
      metaTitle: "1匹冷气安装 KL — RM199起 | 卧室制冷 | KL Renovator",
      metaDescription: "吉隆坡和雪兰莪1匹冷气安装RM199起。适合130平方英尺以下卧室。当天服务，含7尺铜管，1个月保修。WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "1匹冷气安装 吉隆坡雪兰莪",
      eyebrow: "1匹挂壁式冷气安装专家",
      h1: "1匹冷气安装 吉隆坡 & 雪兰莪",
      subtitle: "RM199起 · 当天服务 · 卧室与小房间首选",
      heroBadges: ["RM199起", "可当天上门", "1个月保修", "含7尺铜管"],
      overviewTitle: "1匹是否适合您的房间？",
      overviewBody:
        "1匹挂壁式冷气机是吉隆坡和雪兰莪小型卧室、客房和家庭办公室最常见的选择。它可高效制冷130平方英尺以下的房间，避免过大马力造成电费浪费和机器损耗。我们的技师会上门测量房间、检查隔热情况，并在安装前确认最合适的马力。",
      bestForTitle: "适合场景",
      bestForItems: [
        "130平方英尺（12平方米）以下卧室",
        "客房和小型家庭办公室",
        "单人或双人居住",
        "日照中等的房间",
        "PJ、Cheras、Ampang、Subang的公寓和住宅",
      ],
      pricingTitle: "1匹安装价格",
      pricingRows: [
        { hp: "1.0 匹", labour: "RM 199", pipe: "含7尺铜管", bracket: "含标准支架", note: "挂壁式" },
        { hp: "1.0 匹", labour: "RM 290", pipe: "含7尺铜管", bracket: "含吊顶套件", note: "天花板卡式" },
      ],
      includedTitle: "包含项目",
      includedItems: basePricing.zh.included,
      extrasTitle: "可选额外费用（先报价）",
      extrasItems: basePricing.zh.extras,
      whyTitle: "为什么选择 KL Renovator 安装1匹冷气？",
      whyItems: whyChoose.zh,
      faqs: [
        { q: "吉隆坡1匹冷气安装多少钱？", a: "1匹挂壁式冷气安装从RM199起，包含7尺铜管、电线、排水管和标准支架。1匹天花板卡式机从RM290起。超出7尺的材料会在施工前报价。" },
        { q: "我的卧室1匹够吗？", a: "1匹适合130平方英尺以下、天花板高度正常、日照中等的卧室。如果是西晒房、大窗户或天花板超过10英尺，建议选择1.5匹。我们会现场评估并推荐合适马力。" },
        { q: "1匹冷气安装需要多长时间？", a: "标准1匹挂壁式安装约需3–4小时，包括真空泵抽真空、电路测试和最终运行检查。上午11点前预约可安排当天安装。" },
        { q: "1匹冷气需要专用电路吗？", a: "需要。根据马来西亚电气标准，每台1匹冷气必须有独立的16A微型断路器（MCB）电路。我们包含从配电箱拉线以及安装室外机隔离开关。" },
      ],
      ctaTitle: "立即预约1匹冷气安装",
      ctaBody: "吉隆坡和雪兰莪当天名额有限。施工前先确认价格。",
      whatsAppLabel: "通过 WhatsApp 预约1匹安装",
      callLabel: "致电 +60 18-298 3573",
      breadcrumbLabel: "1匹冷气安装",
    },
  },
  "1.5hp": {
    en: {
      metaTitle: "1.5HP Aircond Installation KL — From RM199 | Master Bedroom | KL Renovator",
      metaDescription: "1.5HP aircond installation in KL & Selangor from RM199. Best for master bedrooms & small living rooms up to 180 sq ft. Same-day, vacuum pump, 1-month warranty. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "1.5HP Aircond Installation KL Selangor",
      eyebrow: "1.5HP Wall-Mounted Installation Specialists",
      h1: "1.5HP Aircond Installation KL & Selangor",
      subtitle: "From RM 199 · Same-Day · Best for Master Bedrooms & Small Living Rooms",
      heroBadges: ["From RM 199", "Same-Day Available", "1-Month Warranty", "Master Bedroom Specialist"],
      overviewTitle: "Why 1.5HP Is the Most Versatile Choice",
      overviewBody:
        "1.5HP is the sweet spot for most Malaysian homes. It comfortably cools master bedrooms up to 180 sq ft and small living rooms, even with afternoon sun. If you're unsure between 1HP and 2HP, 1.5HP is usually the right answer for bedrooms and compact living spaces across KL & Selangor.",
      bestForTitle: "Best For",
      bestForItems: [
        "Master bedrooms up to 180 sq ft (17 m²)",
        "Small living rooms and TV areas",
        "Rooms with afternoon sun exposure",
        "Couples and small families",
        "Condos in Mont Kiara, Bangsar, PJ, Subang Jaya",
      ],
      pricingTitle: "1.5HP Installation Pricing",
      pricingRows: [
        { hp: "1.5 HP", labour: "RM 199", pipe: "7 ft included", bracket: "Standard included", note: "Wall-mounted" },
        { hp: "1.5 HP", labour: "RM 290", pipe: "7 ft included", bracket: "Ceiling kit included", note: "Ceiling cassette" },
      ],
      includedTitle: "What's Included",
      includedItems: basePricing.en.included,
      extrasTitle: "Optional Extras (Quoted First)",
      extrasItems: basePricing.en.extras,
      whyTitle: "Why Choose KL Renovator for 1.5HP Installation?",
      whyItems: whyChoose.en,
      faqs: [
        { q: "How much does 1.5HP aircond installation cost?", a: "1.5HP wall-mounted installation starts from RM 199 including 7 ft copper pipe, wiring, drain pipe, and standard bracket. Ceiling cassette 1.5HP starts from RM 290. All extras are quoted and approved before work starts." },
        { q: "Is 1.5HP too big for a bedroom?", a: "Not for most master bedrooms in KL and Selangor. 1.5HP is ideal for rooms 130–180 sq ft, especially with afternoon sun, high ceilings, or large windows. Oversizing is only a problem when the unit is far too large for the space." },
        { q: "Can I install 1.5HP in a condo?", a: "Yes — 1.5HP is the most common size installed in condos across KLCC, Mont Kiara, Bangsar, and PJ. We handle JMB approval, lift booking, service-ledge access, and outdoor unit placement per building rules." },
        { q: "What electrical breaker do I need for 1.5HP?", a: "A 1.5HP unit requires a dedicated 16A MCB circuit. We run wiring from your DB box, install an outdoor isolator, and verify earth leakage protection as part of the installation." },
      ],
      ctaTitle: "Book 1.5HP Installation Today",
      ctaBody: "Master bedroom cooling from RM 199. Same-day installation available across KL & Selangor.",
      whatsAppLabel: "Book 1.5HP Installation via WhatsApp",
      callLabel: "Call +60 18-298 3573",
      breadcrumbLabel: "1.5HP Aircond Installation",
    },
    ms: {
      metaTitle: "Pemasangan Aircond 1.5HP KL — Dari RM199 | Bilik Tidur Utama | KL Renovator",
      metaDescription: "Pemasangan aircond 1.5HP di KL & Selangor dari RM199. Terbaik untuk bilik tidur utama & bilik kecil sehingga 180 kaki persegi. Hari sama, pam vakum, waranti 1 bulan. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "Pemasangan Aircond 1.5HP KL Selangor",
      eyebrow: "Pakar Pemasangan 1.5HP Dinding",
      h1: "Pemasangan Aircond 1.5HP KL & Selangor",
      subtitle: "Dari RM 199 · Hari Sama · Terbaik untuk Bilik Tidur Utama & Bilik Kecil",
      heroBadges: ["Dari RM 199", "Hari Sama Tersedia", "Waranti 1 Bulan", "Pakar Bilik Utama"],
      overviewTitle: "Mengapa 1.5HP Pilihan Paling Serbaguna",
      overviewBody:
        "1.5HP adalah saiz paling sesuai untuk kebanyakan rumah di Malaysia. Ia menyejukkan bilik tidur utama sehingga 180 kaki persegi dan bilik kecil dengan selesa, walaupun dengan matahari petang. Jika anda ragu antara 1HP dan 2HP, 1.5HP biasanya jawapan yang tepat.",
      bestForTitle: "Sesuai Untuk",
      bestForItems: [
        "Bilik tidur utama sehingga 180 kaki persegi (17 m²)",
        "Bilik kecil dan ruang TV",
        "Bilik dengan pendedahan matahari petang",
        "Pasangan dan keluarga kecil",
        "Kondominium di Mont Kiara, Bangsar, PJ, Subang Jaya",
      ],
      pricingTitle: "Harga Pemasangan 1.5HP",
      pricingRows: [
        { hp: "1.5 HP", labour: "RM 199", pipe: "7 ft disertakan", bracket: "Standard disertakan", note: "Dinding" },
        { hp: "1.5 HP", labour: "RM 290", pipe: "7 ft disertakan", bracket: "Kit siling disertakan", note: "Ceiling cassette" },
      ],
      includedTitle: "Apa Yang Termasuk",
      includedItems: basePricing.ms.included,
      extrasTitle: "Tambahan Pilihan (Disebut Dahulu)",
      extrasItems: basePricing.ms.extras,
      whyTitle: "Kenapa Pilih KL Renovator untuk Pemasangan 1.5HP?",
      whyItems: whyChoose.ms,
      faqs: [
        { q: "Berapa harga pemasangan aircond 1.5HP?", a: "Pemasangan dinding 1.5HP bermula RM 199 termasuk 7 ft paip tembaga, wayar, paip saliran, dan braket standard. Ceiling cassette 1.5HP bermula RM 290. Semua tambahan disebut dan diluluskan sebelum kerja bermula." },
        { q: "Adakah 1.5HP terlalu besar untuk bilik tidur?", a: "Tidak untuk kebanyakan bilik tidur utama di KL dan Selangor. 1.5HP sesuai untuk bilik 130–180 kaki persegi, terutama dengan matahari petang, siling tinggi, atau tingkap besar." },
        { q: "Boleh pasang 1.5HP di kondo?", a: "Ya — 1.5HP adalah saiz paling biasa dipasang di kondominium di KLCC, Mont Kiara, Bangsar, dan PJ. Kami uruskan kelulusan JMB, tempahan lif, akses service ledge, dan kedudukan unit luar." },
        { q: "Berapa MCB yang diperlukan untuk 1.5HP?", a: "Unit 1.5HP memerlukan litar 16A MCB khas. Kami tarik wayar dari kotak DB, pasang isolator luar, dan sahkan perlindungan kebocoran bumi." },
      ],
      ctaTitle: "Tempah Pemasangan 1.5HP Hari Ini",
      ctaBody: "Penyejukan bilik tidur utama dari RM 199. Servis hari sama tersedia di KL & Selangor.",
      whatsAppLabel: "Tempah Pemasangan 1.5HP via WhatsApp",
      callLabel: "Hubungi +60 18-298 3573",
      breadcrumbLabel: "Pemasangan Aircond 1.5HP",
    },
    zh: {
      metaTitle: "1.5匹冷气安装 KL — RM199起 | 主卧客厅 | KL Renovator",
      metaDescription: "吉隆坡和雪兰莪1.5匹冷气安装RM199起。适合180平方英尺以下主卧和小客厅。当天服务、真空泵调试、1个月保修。WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "1.5匹冷气安装 吉隆坡雪兰莪",
      eyebrow: "1.5匹挂壁式冷气安装专家",
      h1: "1.5匹冷气安装 吉隆坡 & 雪兰莪",
      subtitle: "RM199起 · 当天服务 · 主卧与小客厅首选",
      heroBadges: ["RM199起", "可当天上门", "1个月保修", "主卧专家"],
      overviewTitle: "为什么1.5匹是最 versatile 的选择",
      overviewBody:
        "1.5匹是大多数马来西亚家庭的最佳选择。它能舒适地制冷180平方英尺以下的主卧和小客厅，即使下午有西晒也足够。如果您在1匹和2匹之间犹豫，对于卧室和紧凑型起居空间，1.5匹通常是正确答案。",
      bestForTitle: "适合场景",
      bestForItems: [
        "180平方英尺（17平方米）以下主卧",
        "小客厅和电视区",
        "下午有西晒的房间",
        "夫妻和小家庭",
        "Mont Kiara、Bangsar、PJ、Subang Jaya的公寓",
      ],
      pricingTitle: "1.5匹安装价格",
      pricingRows: [
        { hp: "1.5 匹", labour: "RM 199", pipe: "含7尺铜管", bracket: "含标准支架", note: "挂壁式" },
        { hp: "1.5 匹", labour: "RM 290", pipe: "含7尺铜管", bracket: "含吊顶套件", note: "天花板卡式" },
      ],
      includedTitle: "包含项目",
      includedItems: basePricing.zh.included,
      extrasTitle: "可选额外费用（先报价）",
      extrasItems: basePricing.zh.extras,
      whyTitle: "为什么选择 KL Renovator 安装1.5匹冷气？",
      whyItems: whyChoose.zh,
      faqs: [
        { q: "1.5匹冷气安装多少钱？", a: "1.5匹挂壁式冷气安装从RM199起，包含7尺铜管、电线、排水管和标准支架。1.5匹天花板卡式机从RM290起。所有额外费用均在施工前报价并确认。" },
        { q: "1.5匹对卧室来说太大吗？", a: "对于吉隆坡和雪兰莪的大多数主卧来说不会。1.5匹适合130–180平方英尺的房间，尤其是西晒、天花板较高或大窗户的房间。" },
        { q: "公寓可以安装1.5匹吗？", a: "可以。1.5匹是KLCC、Mont Kiara、Bangsar和PJ公寓中最常见的安装尺寸。我们负责JMB批准、电梯预约、服务阳台进出和室外机位置安排。" },
        { q: "1.5匹需要什么断路器？", a: "1.5匹需要独立的16A MCB电路。我们从配电箱拉线、安装室外机隔离开关，并验证漏电保护。" },
      ],
      ctaTitle: "立即预约1.5匹冷气安装",
      ctaBody: "主卧制冷从RM199起。吉隆坡和雪兰莪可安排当天安装。",
      whatsAppLabel: "通过 WhatsApp 预约1.5匹安装",
      callLabel: "致电 +60 18-298 3573",
      breadcrumbLabel: "1.5匹冷气安装",
    },
  },
  "2hp": {
    en: {
      metaTitle: "2HP Aircond Installation KL — From RM249 | Large Rooms | KL Renovator",
      metaDescription: "2HP aircond installation in KL & Selangor from RM249. Best for large living rooms, open-plan spaces & master suites up to 250 sq ft. Same-day, 1-month warranty. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "2HP Aircond Installation KL Selangor",
      eyebrow: "2HP Wall-Mounted Installation Specialists",
      h1: "2HP Aircond Installation KL & Selangor",
      subtitle: "From RM 249 · Same-Day · Large Rooms, Open Spaces & Master Suites",
      heroBadges: ["From RM 249", "Same-Day Available", "1-Month Warranty", "Large Room Specialist"],
      overviewTitle: "When You Need More Cooling Power",
      overviewBody:
        "2HP units are built for bigger spaces. If your living room is open-plan, your master suite is over 180 sq ft, or your room gets heavy afternoon sun, a 2HP aircond gives you the cooling capacity you need without running the compressor at maximum load all day.",
      bestForTitle: "Best For",
      bestForItems: [
        "Living rooms up to 250 sq ft (23 m²)",
        "Open-plan living and dining areas",
        "Large master suites and walk-in wardrobe rooms",
        "Rooms with heavy sun exposure or high ceilings",
        "Landed homes in Shah Alam, Klang, Puchong, Cheras",
      ],
      pricingTitle: "2HP Installation Pricing",
      pricingRows: [
        { hp: "2.0 HP", labour: "RM 249", pipe: "7 ft included", bracket: "Standard included", note: "Wall-mounted" },
        { hp: "2.0 HP", labour: "RM 350", pipe: "7 ft included", bracket: "Ceiling kit included", note: "Ceiling cassette" },
      ],
      includedTitle: "What's Included",
      includedItems: basePricing.en.included,
      extrasTitle: "Optional Extras (Quoted First)",
      extrasItems: basePricing.en.extras,
      whyTitle: "Why Choose KL Renovator for 2HP Installation?",
      whyItems: whyChoose.en,
      faqs: [
        { q: "How much does 2HP aircond installation cost?", a: "2HP wall-mounted installation starts from RM 249 including 7 ft copper pipe, wiring, drain pipe, and standard bracket. Ceiling cassette 2HP starts from RM 350. Larger pipe diameter and heavier bracket are included in the price." },
        { q: "What room size needs a 2HP aircond?", a: "2HP is recommended for rooms 180–250 sq ft, especially open-plan spaces, high ceilings, or rooms with significant sun exposure. For normal bedrooms under 180 sq ft, 1.5HP is usually sufficient." },
        { q: "Does 2HP need a bigger electrical circuit?", a: "Yes — a 2HP unit typically needs a dedicated 20A MCB circuit with 2.5mm² or 4mm² wiring depending on run length. We assess your DB box capacity and upgrade the circuit as needed." },
        { q: "Is 2HP installation available same-day in KL?", a: "Yes — same-day 2HP installation is available across KL and Selangor for bookings made before 11 AM. The job takes 4–5 hours including vacuum commissioning and electrical testing." },
      ],
      ctaTitle: "Book 2HP Installation Today",
      ctaBody: "Cool large rooms properly from RM 249. Same-day installation available across KL & Selangor.",
      whatsAppLabel: "Book 2HP Installation via WhatsApp",
      callLabel: "Call +60 18-298 3573",
      breadcrumbLabel: "2HP Aircond Installation",
    },
    ms: {
      metaTitle: "Pemasangan Aircond 2HP KL — Dari RM249 | Bilik Besar | KL Renovator",
      metaDescription: "Pemasangan aircond 2HP di KL & Selangor dari RM249. Terbaik untuk bilik kecil, ruang terbuka & suite utama sehingga 250 kaki persegi. Hari sama, waranti 1 bulan. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "Pemasangan Aircond 2HP KL Selangor",
      eyebrow: "Pakar Pemasangan 2HP Dinding",
      h1: "Pemasangan Aircond 2HP KL & Selangor",
      subtitle: "Dari RM 249 · Hari Sama · Bilik Besar, Ruang Terbuka & Suite Utama",
      heroBadges: ["Dari RM 249", "Hari Sama Tersedia", "Waranti 1 Bulan", "Pakar Bilik Besar"],
      overviewTitle: "Apabila Anda Memerlukan Lebih Kuasa Penyejukan",
      overviewBody:
        "Unit 2HP dibina untuk ruang lebih besar. Jika ruang tamu anda terbuka, suite utama melebihi 180 kaki persegi, atau bilik mendapat matahari petang yang kuat, aircond 2HP memberi kapasiti penyejukan yang diperlukan tanpa memaksa kompresor berjalan pada beban maksimum sepanjang hari.",
      bestForTitle: "Sesuai Untuk",
      bestForItems: [
        "Ruang tamu sehingga 250 kaki persegi (23 m²)",
        "Ruang tamu dan makan terbuka",
        "Suite utama besar dan bilik almari pakaian",
        "Bilik dengan pendedahan matahari kuat atau siling tinggi",
        "Rumah berkembar di Shah Alam, Klang, Puchong, Cheras",
      ],
      pricingTitle: "Harga Pemasangan 2HP",
      pricingRows: [
        { hp: "2.0 HP", labour: "RM 249", pipe: "7 ft disertakan", bracket: "Standard disertakan", note: "Dinding" },
        { hp: "2.0 HP", labour: "RM 350", pipe: "7 ft disertakan", bracket: "Kit siling disertakan", note: "Ceiling cassette" },
      ],
      includedTitle: "Apa Yang Termasuk",
      includedItems: basePricing.ms.included,
      extrasTitle: "Tambahan Pilihan (Disebut Dahulu)",
      extrasItems: basePricing.ms.extras,
      whyTitle: "Kenapa Pilih KL Renovator untuk Pemasangan 2HP?",
      whyItems: whyChoose.ms,
      faqs: [
        { q: "Berapa harga pemasangan aircond 2HP?", a: "Pemasangan dinding 2HP bermula RM 249 termasuk 7 ft paip tembaga, wayar, paip saliran, dan braket standard. Ceiling cassette 2HP bermula RM 350. Diameter paip lebih besar dan braket lebih berat termasuk dalam harga." },
        { q: "Saiz bilik apa yang perlukan aircond 2HP?", a: "2HP disyorkan untuk bilik 180–250 kaki persegi, terutama ruang terbuka, siling tinggi, atau bilik dengan pendedahan matahari ketara. Untuk bilik tidur biasa bawah 180 kaki persegi, 1.5HP biasanya mencukupi." },
        { q: "Adakah 2HP perlukan litar elektrik lebih besar?", a: "Ya — unit 2HP biasanya memerlukan litar 20A MCB khas dengan wayar 2.5mm² atau 4mm² bergantung pada jarak. Kami menilai kapasiti kotak DB anda dan menaik taraf litar jika perlu." },
        { q: "Boleh pasang 2HP hari sama di KL?", a: "Ya — pemasangan 2HP hari sama tersedia di KL dan Selangor untuk tempahan sebelum 11 pagi. Kerja mengambil masa 4–5 jam termasuk pentauliahan vakum dan ujian elektrik." },
      ],
      ctaTitle: "Tempah Pemasangan 2HP Hari Ini",
      ctaBody: "Sejukkan bilik besar dengan betul dari RM 249. Servis hari sama tersedia di KL & Selangor.",
      whatsAppLabel: "Tempah Pemasangan 2HP via WhatsApp",
      callLabel: "Hubungi +60 18-298 3573",
      breadcrumbLabel: "Pemasangan Aircond 2HP",
    },
    zh: {
      metaTitle: "2匹冷气安装 KL — RM249起 | 大房间 | KL Renovator",
      metaDescription: "吉隆坡和雪兰莪2匹冷气安装RM249起。适合250平方英尺以下大客厅、开放式空间和主卧套房。当天服务，1个月保修。WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "2匹冷气安装 吉隆坡雪兰莪",
      eyebrow: "2匹挂壁式冷气安装专家",
      h1: "2匹冷气安装 吉隆坡 & 雪兰莪",
      subtitle: "RM249起 · 当天服务 · 大客厅、开放式空间与主卧套房",
      heroBadges: ["RM249起", "可当天上门", "1个月保修", "大房间专家"],
      overviewTitle: "什么时候需要更大制冷量",
      overviewBody:
        "2匹冷气专为更大空间设计。如果您的客厅是开放式格局、主卧套房超过180平方英尺，或者房间西晒严重，2匹冷气能提供足够的制冷量，而不会让压缩机全天满负荷运转。",
      bestForTitle: "适合场景",
      bestForItems: [
        "250平方英尺（23平方米）以下客厅",
        "开放式客厅和餐厅",
        "大型主卧套房和衣帽间",
        "西晒严重或天花板较高的房间",
        "Shah Alam、Klang、Puchong、Cheras的排屋",
      ],
      pricingTitle: "2匹安装价格",
      pricingRows: [
        { hp: "2.0 匹", labour: "RM 249", pipe: "含7尺铜管", bracket: "含标准支架", note: "挂壁式" },
        { hp: "2.0 匹", labour: "RM 350", pipe: "含7尺铜管", bracket: "含吊顶套件", note: "天花板卡式" },
      ],
      includedTitle: "包含项目",
      includedItems: basePricing.zh.included,
      extrasTitle: "可选额外费用（先报价）",
      extrasItems: basePricing.zh.extras,
      whyTitle: "为什么选择 KL Renovator 安装2匹冷气？",
      whyItems: whyChoose.zh,
      faqs: [
        { q: "2匹冷气安装多少钱？", a: "2匹挂壁式冷气安装从RM249起，包含7尺铜管、电线、排水管和标准支架。2匹天花板卡式机从RM350起。价格已包含更大直径铜管和更重的支架。" },
        { q: "多大房间需要2匹冷气？", a: "2匹推荐用于180–250平方英尺的房间，尤其是开放式空间、天花板较高或阳光直射严重的房间。180平方英尺以下的普通卧室通常1.5匹足够。" },
        { q: "2匹需要更大的电路吗？", a: "需要。2匹通常需要独立的20A MCB电路，使用2.5平方毫米或4平方毫米电线（视距离而定）。我们会评估配电箱容量并按需升级电路。" },
        { q: "吉隆坡可以当天安装2匹吗？", a: "可以。上午11点前预约，我们可在吉隆坡和雪兰莪安排当天2匹安装。整个工程约4–5小时，包括真空调试和电路测试。" },
      ],
      ctaTitle: "立即预约2匹冷气安装",
      ctaBody: "大房间正确制冷从RM249起。吉隆坡和雪兰莪可当天安装。",
      whatsAppLabel: "通过 WhatsApp 预约2匹安装",
      callLabel: "致电 +60 18-298 3573",
      breadcrumbLabel: "2匹冷气安装",
    },
  },
  "wall-mounted": {
    en: {
      metaTitle: "Wall-Mounted Aircond Installation KL — From RM199 | All Brands | KL Renovator",
      metaDescription: "Wall-mounted aircond installation in KL & Selangor from RM199. Split unit fitting for all 20 brands, 1–5HP. Same-day, vacuum pump, 1-month warranty. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-wall-mounted-kl.webp",
      ogImageAlt: "Wall-Mounted Aircond Installation KL Selangor",
      eyebrow: "Wall-Mounted Split Unit Specialists",
      h1: "Wall-Mounted Aircond Installation KL & Selangor",
      subtitle: "From RM 199 · Same-Day · Split Units for Homes, Condos & Offices",
      heroBadges: ["From RM 199", "Same-Day Available", "1-Month Warranty", "All 20 Brands"],
      overviewTitle: "The Most Popular Aircond Type in Malaysia",
      overviewBody:
        "Wall-mounted split units are the standard for Malaysian homes and offices. They're affordable to install, quiet to run, and easy to service. Whether you're replacing an old unit, moving into a new condo, or fitting out a terrace house, our wall-mounted installation service covers every brand and HP size across KL & Selangor.",
      bestForTitle: "Best For",
      bestForItems: [
        "Bedrooms, living rooms, and dining areas",
        "Condos, apartments, and service residences",
        "Landed homes and terrace houses",
        "Small offices and shoplots",
        "All 20 major brands — Daikin, Panasonic, Midea, Mitsubishi, and more",
      ],
      pricingTitle: "Wall-Mounted Installation Pricing",
      pricingRows: [
        { hp: "1.0 HP", labour: "RM 199", pipe: "7 ft included", bracket: "Standard included", note: "" },
        { hp: "1.5 HP", labour: "RM 199", pipe: "7 ft included", bracket: "Standard included", note: "" },
        { hp: "2.0 HP", labour: "RM 249", pipe: "7 ft included", bracket: "Standard included", note: "" },
        { hp: "2.5 HP", labour: "RM 279", pipe: "7 ft included", bracket: "Standard included", note: "" },
        { hp: "3.0 HP", labour: "RM 329", pipe: "7 ft included", bracket: "Standard included", note: "" },
      ],
      includedTitle: "What's Included",
      includedItems: basePricing.en.included,
      extrasTitle: "Optional Extras (Quoted First)",
      extrasItems: basePricing.en.extras,
      whyTitle: "Why Choose KL Renovator for Wall-Mounted Installation?",
      whyItems: whyChoose.en,
      faqs: [
        { q: "How much does wall-mounted aircond installation cost?", a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP, RM 249 for 2.0 HP, RM 279 for 2.5 HP, and RM 329 for 3.0 HP. All prices include 7 ft copper pipe, wiring, drain pipe, standard bracket, and vacuum pump commissioning." },
        { q: "How long does wall-mounted installation take?", a: "A single wall-mounted unit takes 3–5 hours depending on pipe run length, floor level, and electrical work needed. Multi-unit installations for whole houses typically take 1–2 days." },
        { q: "Can you install wall-mounted units in high-rise condos?", a: "Yes — we install wall-mounted units in condos across KLCC, Mont Kiara, Bangsar, PJ, Subang, and all major KL/Selangor high-rises. We coordinate with building management for lift access and service-ledge work." },
        { q: "Which brands of wall-mounted units do you install?", a: "All 20 major brands — Daikin, Panasonic, Mitsubishi Electric, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, Isonic, and Acson." },
      ],
      ctaTitle: "Book Wall-Mounted Installation Today",
      ctaBody: "Split unit installation from RM 199. Same-day slots across KL & Selangor.",
      whatsAppLabel: "Book Wall-Mounted Installation via WhatsApp",
      callLabel: "Call +60 18-298 3573",
      breadcrumbLabel: "Wall-Mounted Installation",
    },
    ms: {
      metaTitle: "Pemasangan Aircond Dinding KL — Dari RM199 | Semua Jenama | KL Renovator",
      metaDescription: "Pemasangan aircond dinding di KL & Selangor dari RM199. Pemasangan unit split untuk semua 20 jenama, 1–5HP. Hari sama, pam vakum, waranti 1 bulan. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-wall-mounted-kl.webp",
      ogImageAlt: "Pemasangan Aircond Dinding KL Selangor",
      eyebrow: "Pakar Unit Split Dinding",
      h1: "Pemasangan Aircond Dinding KL & Selangor",
      subtitle: "Dari RM 199 · Hari Sama · Unit Split untuk Rumah, Kondo & Pejabat",
      heroBadges: ["Dari RM 199", "Hari Sama Tersedia", "Waranti 1 Bulan", "Semua 20 Jenama"],
      overviewTitle: "Jenis Aircond Paling Popular di Malaysia",
      overviewBody:
        "Unit split dinding adalah standard untuk rumah dan pejabat di Malaysia. Ia mampu milik untuk dipasang, senyap semasa berjalan, dan mudah diservis. Sama ada anda menggantikan unit lama, berpindah ke kondo baharu, atau memasang rumah teres, perkhidmatan pemasangan dinding kami meliputi semua jenama dan saiz HP di KL & Selangor.",
      bestForTitle: "Sesuai Untuk",
      bestForItems: [
        "Bilik tidur, ruang tamu, dan ruang makan",
        "Kondominium, pangsapuri, dan kediaman servis",
        "Rumah berkembar dan rumah teres",
        "Pejabat kecil dan kedai",
        "Semua 20 jenama utama — Daikin, Panasonic, Midea, Mitsubishi, dan banyak lagi",
      ],
      pricingTitle: "Harga Pemasangan Dinding",
      pricingRows: [
        { hp: "1.0 HP", labour: "RM 199", pipe: "7 ft disertakan", bracket: "Standard disertakan", note: "" },
        { hp: "1.5 HP", labour: "RM 199", pipe: "7 ft disertakan", bracket: "Standard disertakan", note: "" },
        { hp: "2.0 HP", labour: "RM 249", pipe: "7 ft disertakan", bracket: "Standard disertakan", note: "" },
        { hp: "2.5 HP", labour: "RM 279", pipe: "7 ft disertakan", bracket: "Standard disertakan", note: "" },
        { hp: "3.0 HP", labour: "RM 329", pipe: "7 ft disertakan", bracket: "Standard disertakan", note: "" },
      ],
      includedTitle: "Apa Yang Termasuk",
      includedItems: basePricing.ms.included,
      extrasTitle: "Tambahan Pilihan (Disebut Dahulu)",
      extrasItems: basePricing.ms.extras,
      whyTitle: "Kenapa Pilih KL Renovator untuk Pemasangan Dinding?",
      whyItems: whyChoose.ms,
      faqs: [
        { q: "Berapa harga pemasangan aircond dinding?", a: "Pemasangan dinding bermula RM 199 untuk 1.0–1.5 HP, RM 249 untuk 2.0 HP, RM 279 untuk 2.5 HP, dan RM 329 untuk 3.0 HP. Semua harga termasuk 7 ft paip tembaga, wayar, paip saliran, braket standard, dan pentauliahan pam vakum." },
        { q: "Berapa lama pemasangan dinding?", a: "Satu unit dinding mengambil masa 3–5 jam bergantung pada panjang laluan paip, aras tingkat, dan kerja elektrik yang diperlukan. Pemasangan multi-unit untuk seluruh rumah biasanya mengambil 1–2 hari." },
        { q: "Boleh pasang unit dinding di kondominium tinggi?", a: "Ya — kami memasang unit dinding di kondominium di KLCC, Mont Kiara, Bangsar, PJ, Subang, dan semua bangunan tinggi utama KL/Selangor. Kami menguruskan akses lif dan service ledge dengan pengurusan bangunan." },
        { q: "Jenama unit dinding apa yang anda pasang?", a: "Semua 20 jenama utama — Daikin, Panasonic, Mitsubishi Electric, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, Isonic, dan Acson." },
      ],
      ctaTitle: "Tempah Pemasangan Dinding Hari Ini",
      ctaBody: "Pemasangan unit split dari RM 199. Slot hari sama di KL & Selangor.",
      whatsAppLabel: "Tempah Pemasangan Dinding via WhatsApp",
      callLabel: "Hubungi +60 18-298 3573",
      breadcrumbLabel: "Pemasangan Dinding",
    },
    zh: {
      metaTitle: "挂壁式冷气安装 KL — RM199起 | 全品牌 | KL Renovator",
      metaDescription: "吉隆坡和雪兰莪挂壁式冷气安装RM199起。分体机安装覆盖20个品牌，1–5匹。当天服务、真空泵调试、1个月保修。WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-wall-mounted-kl.webp",
      ogImageAlt: "挂壁式冷气安装 吉隆坡雪兰莪",
      eyebrow: "挂壁式分体机安装专家",
      h1: "挂壁式冷气安装 吉隆坡 & 雪兰莪",
      subtitle: "RM199起 · 当天服务 · 家庭、公寓与办公室分体机",
      heroBadges: ["RM199起", "可当天上门", "1个月保修", "20个品牌"],
      overviewTitle: "马来西亚最受欢迎的冷气机类型",
      overviewBody:
        "挂壁式分体冷气机是马来西亚家庭和办公室的标准选择。它安装费用实惠、运行安静、保养方便。无论您是更换旧机、搬入新公寓，还是为排屋安装，我们的挂壁式安装服务覆盖吉隆坡和雪兰莪所有品牌和马力。",
      bestForTitle: "适合场景",
      bestForItems: [
        "卧室、客厅和餐厅",
        "公寓、住宅和服务式公寓",
        "排屋和半独立式住宅",
        "小型办公室和店屋",
        "20个主要品牌——大金、松下、美的、三菱等",
      ],
      pricingTitle: "挂壁式安装价格",
      pricingRows: [
        { hp: "1.0 匹", labour: "RM 199", pipe: "含7尺铜管", bracket: "含标准支架", note: "" },
        { hp: "1.5 匹", labour: "RM 199", pipe: "含7尺铜管", bracket: "含标准支架", note: "" },
        { hp: "2.0 匹", labour: "RM 249", pipe: "含7尺铜管", bracket: "含标准支架", note: "" },
        { hp: "2.5 匹", labour: "RM 279", pipe: "含7尺铜管", bracket: "含标准支架", note: "" },
        { hp: "3.0 匹", labour: "RM 329", pipe: "含7尺铜管", bracket: "含标准支架", note: "" },
      ],
      includedTitle: "包含项目",
      includedItems: basePricing.zh.included,
      extrasTitle: "可选额外费用（先报价）",
      extrasItems: basePricing.zh.extras,
      whyTitle: "为什么选择 KL Renovator 安装挂壁式冷气？",
      whyItems: whyChoose.zh,
      faqs: [
        { q: "挂壁式冷气安装多少钱？", a: "挂壁式安装1.0–1.5匹从RM199起，2.0匹RM249，2.5匹RM279，3.0匹RM329。所有价格均含7尺铜管、电线、排水管、标准支架和真空泵调试。" },
        { q: "挂壁式安装需要多长时间？", a: "单台挂壁式安装约需3–5小时，具体取决于管线长度、楼层和电路改造需求。全屋多台安装通常需1–2天。" },
        { q: "高层公寓可以安装挂壁式吗？", a: "可以。我们在KLCC、Mont Kiara、Bangsar、PJ、Subang以及吉隆坡/雪兰莪所有主要高层公寓安装挂壁式冷气。我们会与大厦管理处协调电梯使用和服务阳台作业。" },
        { q: "你们安装哪些品牌的挂壁式冷气？", a: "20个主要品牌——Daikin、Panasonic、Mitsubishi Electric、York、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL、Isonic和Acson。" },
      ],
      ctaTitle: "立即预约挂壁式冷气安装",
      ctaBody: "分体机安装从RM199起。吉隆坡和雪兰莪当天名额有限。",
      whatsAppLabel: "通过 WhatsApp 预约挂壁式安装",
      callLabel: "致电 +60 18-298 3573",
      breadcrumbLabel: "挂壁式冷气安装",
    },
  },
  "ceiling-cassette": {
    en: {
      metaTitle: "Ceiling Cassette Installation KL — From RM290 | Commercial & Homes | KL Renovator",
      metaDescription: "Ceiling cassette aircond installation in KL & Selangor from RM290. Commercial & residential 4-way cassette fitting. Same-day, drain pump, 1-month warranty. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-ceiling-cassette-installation-commercial.webp",
      ogImageAlt: "Ceiling Cassette Installation KL Selangor",
      eyebrow: "Ceiling Cassette Installation Specialists",
      h1: "Ceiling Cassette Installation KL & Selangor",
      subtitle: "From RM 290 · Same-Day · Commercial, Retail & Large Homes",
      heroBadges: ["From RM 290", "Same-Day Available", "1-Month Warranty", "Drain Pump Included"],
      overviewTitle: "Discreet Cooling for Larger Spaces",
      overviewBody:
        "Ceiling cassette airconds sit flush in your ceiling, distributing cool air in four directions. They're the go-to choice for offices, restaurants, retail shops, and large open-plan homes where wall space is limited or where even cooling across a wide area matters. Our technicians handle ceiling suspension, drain pump wiring, and proper airflow design.",
      bestForTitle: "Best For",
      bestForItems: [
        "Offices, meeting rooms, and co-working spaces",
        "Restaurants, cafes, and retail shops",
        "Large living rooms and open-plan homes",
        "Spaces where wall mounting isn't practical",
        "Commercial buildings in PJ, KLCC, Shah Alam, Subang",
      ],
      pricingTitle: "Ceiling Cassette Installation Pricing",
      pricingRows: [
        { hp: "1.0–1.5 HP", labour: "RM 290", pipe: "7 ft included", bracket: "Ceiling kit included", note: "" },
        { hp: "2.0–3.0 HP", labour: "RM 350", pipe: "7 ft included", bracket: "Ceiling kit included", note: "" },
        { hp: "3.5–6.0 HP", labour: "RM 400", pipe: "7 ft included", bracket: "Ceiling kit included", note: "" },
      ],
      includedTitle: "What's Included",
      includedItems: basePricing.en.included,
      extrasTitle: "Optional Extras (Quoted First)",
      extrasItems: basePricing.en.extras,
      whyTitle: "Why Choose KL Renovator for Ceiling Cassette Installation?",
      whyItems: whyChoose.en,
      faqs: [
        { q: "How much does ceiling cassette installation cost?", a: "Ceiling cassette installation starts from RM 290 for 1.0–1.5 HP, RM 350 for 2.0–3.0 HP, and RM 400 for 3.5–6.0 HP. Price includes ceiling suspension kit, drain pump, 7 ft copper pipe, wiring, and vacuum commissioning." },
        { q: "How long does ceiling cassette installation take?", a: "Ceiling cassette installation takes 5–8 hours because it involves ceiling suspension, drain pump wiring, and careful alignment. Commercial jobs with multiple cassettes may take 1–2 days." },
        { q: "Do I need a false ceiling for a cassette unit?", a: "Yes — cassette units need a suspended or false ceiling with enough depth (usually 250–300mm) to house the unit. If you don't have one, we can recommend a contractor or advise on a wall-mounted alternative." },
        { q: "Is ceiling cassette good for homes?", a: "Yes — cassettes are excellent for large open-plan homes, bungalows, and penthouse apartments where wall space is limited and even airflow is desired. They're quiet and don't take up wall space." },
      ],
      ctaTitle: "Book Ceiling Cassette Installation Today",
      ctaBody: "Discreet commercial cooling from RM 290. Same-day surveys across KL & Selangor.",
      whatsAppLabel: "Book Ceiling Cassette via WhatsApp",
      callLabel: "Call +60 18-298 3573",
      breadcrumbLabel: "Ceiling Cassette Installation",
    },
    ms: {
      metaTitle: "Pemasangan Ceiling Cassette KL — Dari RM290 | Komersial & Rumah | KL Renovator",
      metaDescription: "Pemasangan aircond ceiling cassette di KL & Selangor dari RM290. Pemasangan 4-way cassette komersial & kediaman. Hari sama, pam saliran, waranti 1 bulan. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-ceiling-cassette-installation-commercial.webp",
      ogImageAlt: "Pemasangan Ceiling Cassette KL Selangor",
      eyebrow: "Pakar Pemasangan Ceiling Cassette",
      h1: "Pemasangan Ceiling Cassette KL & Selangor",
      subtitle: "Dari RM 290 · Hari Sama · Komersial, Runcit & Rumah Besar",
      heroBadges: ["Dari RM 290", "Hari Sama Tersedia", "Waranti 1 Bulan", "Pam Saliran Disertakan"],
      overviewTitle: "Penyejukan Diskret untuk Ruang Lebih Besar",
      overviewBody:
        "Aircond ceiling cassette dipasang rata di siling, mengedarkan udara sejuk ke empat arah. Ia adalah pilihan utama untuk pejabat, restoran, kedai runcit, dan rumah terbuka besar di mana ruang dinding terhad atau penyejukan sekata di seluruh kawasan penting. Juruteknik kami mengendalikan suspensi siling, pendawaian pam saliran, dan reka bentuk aliran udara.",
      bestForTitle: "Sesuai Untuk",
      bestForItems: [
        "Pejabat, bilik mesyuarat, dan ruang kerja bersama",
        "Restoran, kafe, dan kedai runcit",
        "Ruang tamu besar dan rumah terbuka",
        "Ruang di mana pemasangan dinding tidak praktikal",
        "Bangunan komersial di PJ, KLCC, Shah Alam, Subang",
      ],
      pricingTitle: "Harga Pemasangan Ceiling Cassette",
      pricingRows: [
        { hp: "1.0–1.5 HP", labour: "RM 290", pipe: "7 ft disertakan", bracket: "Kit siling disertakan", note: "" },
        { hp: "2.0–3.0 HP", labour: "RM 350", pipe: "7 ft disertakan", bracket: "Kit siling disertakan", note: "" },
        { hp: "3.5–6.0 HP", labour: "RM 400", pipe: "7 ft disertakan", bracket: "Kit siling disertakan", note: "" },
      ],
      includedTitle: "Apa Yang Termasuk",
      includedItems: basePricing.ms.included,
      extrasTitle: "Tambahan Pilihan (Disebut Dahulu)",
      extrasItems: basePricing.ms.extras,
      whyTitle: "Kenapa Pilih KL Renovator untuk Pemasangan Ceiling Cassette?",
      whyItems: whyChoose.ms,
      faqs: [
        { q: "Berapa harga pemasangan ceiling cassette?", a: "Pemasangan ceiling cassette bermula RM 290 untuk 1.0–1.5 HP, RM 350 untuk 2.0–3.0 HP, dan RM 400 untuk 3.5–6.0 HP. Harga termasuk kit suspensi siling, pam saliran, 7 ft paip tembaga, wayar, dan pentauliahan vakum." },
        { q: "Berapa lama pemasangan ceiling cassette?", a: "Pemasangan ceiling cassette mengambil masa 5–8 jam kerana melibatkan suspensi siling, pendawaian pam saliran, dan pelarasan yang teliti. Kerja komersial dengan beberapa cassette mungkin mengambil 1–2 hari." },
        { q: "Perlukah siling palsu untuk unit cassette?", a: "Ya — unit cassette memerlukan siling tergantung atau siling palsu dengan kedalaman mencukupi (biasanya 250–300mm). Jika tiada, kami boleh cadangkan kontraktor atau alternatif pemasangan dinding." },
        { q: "Adakah ceiling cassette sesuai untuk rumah?", a: "Ya — cassette sangat baik untuk rumah terbuka besar, banglo, dan apartmen penthouse di mana ruang dinding terhad dan aliran udara sekata diinginkan. Ia senyap dan tidak mengambil ruang dinding." },
      ],
      ctaTitle: "Tempah Pemasangan Ceiling Cassette Hari Ini",
      ctaBody: "Penyejukan komersial diskret dari RM 290. Pemeriksaan tapak hari sama di KL & Selangor.",
      whatsAppLabel: "Tempah Ceiling Cassette via WhatsApp",
      callLabel: "Hubungi +60 18-298 3573",
      breadcrumbLabel: "Pemasangan Ceiling Cassette",
    },
    zh: {
      metaTitle: "天花板卡式冷气安装 KL — RM290起 | 商用与住宅 | KL Renovator",
      metaDescription: "吉隆坡和雪兰莪天花板卡式机安装RM290起。商用与住宅四向卡式机安装。当天服务、含排水泵、1个月保修。WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-ceiling-cassette-installation-commercial.webp",
      ogImageAlt: "天花板卡式机安装 吉隆坡雪兰莪",
      eyebrow: "天花板卡式机安装专家",
      h1: "天花板卡式冷气安装 吉隆坡 & 雪兰莪",
      subtitle: "RM290起 · 当天服务 · 商用、零售与大型住宅",
      heroBadges: ["RM290起", "可当天上门", "1个月保修", "含排水泵"],
      overviewTitle: "大空间的隐蔽式制冷方案",
      overviewBody:
        "天花板卡式冷气机嵌入吊顶，四向送风。它是办公室、餐厅、零售店和大型开放式住宅的首选，尤其适合墙面空间有限或需要均匀制冷的大面积场所。我们的技师负责吊顶悬挂、排水泵布线和气流设计。",
      bestForTitle: "适合场景",
      bestForItems: [
        "办公室、会议室和共享工作空间",
        "餐厅、咖啡馆和零售店",
        "大客厅和开放式住宅",
        "墙面安装不实用的空间",
        "PJ、KLCC、Shah Alam、Subang的商业建筑",
      ],
      pricingTitle: "天花板卡式机安装价格",
      pricingRows: [
        { hp: "1.0–1.5 匹", labour: "RM 290", pipe: "含7尺铜管", bracket: "含吊顶套件", note: "" },
        { hp: "2.0–3.0 匹", labour: "RM 350", pipe: "含7尺铜管", bracket: "含吊顶套件", note: "" },
        { hp: "3.5–6.0 匹", labour: "RM 400", pipe: "含7尺铜管", bracket: "含吊顶套件", note: "" },
      ],
      includedTitle: "包含项目",
      includedItems: basePricing.zh.included,
      extrasTitle: "可选额外费用（先报价）",
      extrasItems: basePricing.zh.extras,
      whyTitle: "为什么选择 KL Renovator 安装天花板卡式机？",
      whyItems: whyChoose.zh,
      faqs: [
        { q: "天花板卡式机安装多少钱？", a: "天花板卡式机安装1.0–1.5匹从RM290起，2.0–3.0匹RM350，3.5–6.0匹RM400。价格包含吊顶套件、排水泵、7尺铜管、电线和真空调试。" },
        { q: "天花板卡式机安装需要多长时间？", a: "天花板卡式机安装约需5–8小时，因为涉及吊顶悬挂、排水泵布线和精确对位。多台商业安装可能需要1–2天。" },
        { q: "安装卡式机需要假天花吗？", a: "需要。卡式机需要悬挂式或假天花，深度通常需250–300毫米。如果没有，我们可以推荐承包商或建议挂壁式替代方案。" },
        { q: "天花板卡式机适合住宅吗？", a: "适合。卡式机非常适合大型开放式住宅、独立式洋房和顶层公寓，尤其是墙面空间有限且希望气流均匀分布的场所。它安静且不占用墙面空间。" },
      ],
      ctaTitle: "立即预约天花板卡式机安装",
      ctaBody: "隐蔽式商用制冷从RM290起。吉隆坡和雪兰莪可当天勘察。",
      whatsAppLabel: "通过 WhatsApp 预约天花板卡式机",
      callLabel: "致电 +60 18-298 3573",
      breadcrumbLabel: "天花板卡式机安装",
    },
  },
  "window-unit": {
    en: {
      metaTitle: "Window Unit Installation KL — From RM180 | Budget Cooling | KL Renovator",
      metaDescription: "Window aircond installation in KL & Selangor from RM180. Budget-friendly window unit fitting for homes, rented rooms & older apartments. Same-day, 1-month warranty. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "Window Aircond Installation KL Selangor",
      eyebrow: "Window Unit Installation Specialists",
      h1: "Window Aircond Installation KL & Selangor",
      subtitle: "From RM 180 · Same-Day · Budget Cooling for Rentals & Older Homes",
      heroBadges: ["From RM 180", "Same-Day Available", "1-Month Warranty", "No Outdoor Unit Bracket"],
      overviewTitle: "Simple, Affordable Cooling",
      overviewBody:
        "Window airconds are a practical choice for rented rooms, older apartments, and budget-conscious households. Everything is contained in one unit — no separate indoor/outdoor piping, no vacuum pump, and no complex bracket work. We mount the unit securely, seal the opening, and wire it to a dedicated circuit.",
      bestForTitle: "Best For",
      bestForItems: [
        "Rented rooms and budget apartments",
        "Older flats without space for outdoor units",
        "Temporary or short-term cooling solutions",
        "Single rooms up to 150 sq ft",
        "Tenants who need a quick, affordable install",
      ],
      pricingTitle: "Window Unit Installation Pricing",
      pricingRows: [
        { hp: "1.0 HP", labour: "RM 180", pipe: "Self-contained", bracket: "Window frame mount", note: "" },
        { hp: "1.5 HP", labour: "RM 200", pipe: "Self-contained", bracket: "Window frame mount", note: "" },
        { hp: "2.0 HP", labour: "RM 230", pipe: "Self-contained", bracket: "Window frame mount", note: "" },
      ],
      includedTitle: "What's Included",
      includedItems: [
        "Site survey & quotation (free)",
        "Window frame mounting & levelling",
        "Side panels and weather sealing",
        "Dedicated electrical wiring from DB",
        "Circuit breaker/isolator installation",
        "Run test and temperature check",
        "1-month workmanship warranty card",
      ],
      extrasTitle: "Optional Extras (Quoted First)",
      extrasItems: [
        "Electrical plug point installation: RM 100",
        "Window frame reinforcement: RM 50–80",
        "Additional weather sealing: RM 30–50",
        "High-rise access surcharge: RM 50–150",
        "Removal of old window unit: RM 80",
      ],
      whyTitle: "Why Choose KL Renovator for Window Unit Installation?",
      whyItems: whyChoose.en,
      faqs: [
        { q: "How much does window aircond installation cost?", a: "Window unit installation starts from RM 180 for 1.0 HP, RM 200 for 1.5 HP, and RM 230 for 2.0 HP. Price includes window frame mounting, weather sealing, electrical wiring, and 1-month workmanship warranty." },
        { q: "How long does window unit installation take?", a: "Window unit installation is quick — usually 2–3 hours. It doesn't require copper piping or vacuum pump work, so it's ideal for same-day service." },
        { q: "Do I need a separate outdoor unit for a window aircond?", a: "No — window units are self-contained. The compressor and condenser are built into the same chassis that sits in your window. Only a small rear section extends outside." },
        { q: "Is a window unit good for condos in KL?", a: "Window units are usually only allowed in older apartments or specific building designs. Most modern condos require split units. We can advise whether a window unit is suitable for your property." },
      ],
      ctaTitle: "Book Window Unit Installation Today",
      ctaBody: "Budget cooling from RM 180. Same-day installation across KL & Selangor.",
      whatsAppLabel: "Book Window Unit via WhatsApp",
      callLabel: "Call +60 18-298 3573",
      breadcrumbLabel: "Window Unit Installation",
    },
    ms: {
      metaTitle: "Pemasangan Aircond Tingkap KL — Dari RM180 | Penyejukan Ekonomi | KL Renovator",
      metaDescription: "Pemasangan aircond tingkap di KL & Selangor dari RM180. Pemasangan unit tingkap mesra bajet untuk rumah, bilik sewa & pangsapuri lama. Hari sama, waranti 1 bulan. WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "Pemasangan Aircond Tingkap KL Selangor",
      eyebrow: "Pakar Pemasangan Unit Tingkap",
      h1: "Pemasangan Aircond Tingkap KL & Selangor",
      subtitle: "Dari RM 180 · Hari Sama · Penyejukan Ekonomi untuk Sewaan & Rumah Lama",
      heroBadges: ["Dari RM 180", "Hari Sama Tersedia", "Waranti 1 Bulan", "Tiada Braket Unit Luar"],
      overviewTitle: "Penyejukan Mudah & Mampu Milik",
      overviewBody:
        "Aircond tingkap adalah pilihan praktikal untuk bilik sewa, pangsapuri lama, dan isi rumah yang menjimatkan. Semuanya terkandung dalam satu unit — tiada paip dalam/luar, tiada pam vakum, dan tiada kerja braket kompleks. Kami memasang unit dengan selamat, menyegel bukaan, dan menyambung wayar ke litar khas.",
      bestForTitle: "Sesuai Untuk",
      bestForItems: [
        "Bilik sewa dan pangsapuri bajet",
        "Pangsapuri lama tanpa ruang untuk unit luar",
        "Penyelesaian penyejukan sementara",
        "Bilik tunggal sehingga 150 kaki persegi",
        "Penyewa yang perlukan pemasangan pantas & murah",
      ],
      pricingTitle: "Harga Pemasangan Unit Tingkap",
      pricingRows: [
        { hp: "1.0 HP", labour: "RM 180", pipe: "Terkandung", bracket: "Bingkai tingkap", note: "" },
        { hp: "1.5 HP", labour: "RM 200", pipe: "Terkandung", bracket: "Bingkai tingkap", note: "" },
        { hp: "2.0 HP", labour: "RM 230", pipe: "Terkandung", bracket: "Bingkai tingkap", note: "" },
      ],
      includedTitle: "Apa Yang Termasuk",
      includedItems: [
        "Pemeriksaan tapak & sebut harga (percuma)",
        "Pemasangan & pelarasan bingkai tingkap",
        "Panel sisi dan penyegel cuaca",
        "Wayar elektrik khas dari DB",
        "Pemasangan pemutus litar/isolator",
        "Ujian jalan dan semakan suhu",
        "Kad waranti kerja 1 bulan",
      ],
      extrasTitle: "Tambahan Pilihan (Disebut Dahulu)",
      extrasItems: [
        "Pasang plug point elektrik: RM 100",
        "Perkukuh bingkai tingkap: RM 50–80",
        "Penyegel cuaca tambahan: RM 30–50",
        "Surcaj akses tinggi: RM 50–150",
        "Buang unit tingkap lama: RM 80",
      ],
      whyTitle: "Kenapa Pilih KL Renovator untuk Pemasangan Unit Tingkap?",
      whyItems: whyChoose.ms,
      faqs: [
        { q: "Berapa harga pemasangan aircond tingkap?", a: "Pemasangan unit tingkap bermula RM 180 untuk 1.0 HP, RM 200 untuk 1.5 HP, dan RM 230 untuk 2.0 HP. Harga termasuk pemasangan bingkai tingkap, penyegel cuaca, wayar elektrik, dan waranti kerja 1 bulan." },
        { q: "Berapa lama pemasangan unit tingkap?", a: "Pemasangan unit tingkap pantas — biasanya 2–3 jam. Ia tidak memerlukan paip tembaga atau kerja pam vakum, jadi sesuai untuk servis hari sama." },
        { q: "Perlukah unit luar berasingan untuk aircond tingkap?", a: "Tidak — unit tingkap adalah self-contained. Kompresor dan kondenser dibina dalam satu casis yang diletakkan di tingkap. Hanya bahagian belakang kecil menjulur ke luar." },
        { q: "Adakah unit tingkap sesuai untuk kondo di KL?", a: "Unit tingkap biasanya hanya dibenarkan di pangsapuri lama atau reka bentuk bangunan tertentu. Kebanyakan kondo moden memerlukan unit split. Kami boleh nasihatkan sama ada sesuai untuk hartanah anda." },
      ],
      ctaTitle: "Tempah Pemasangan Unit Tingkap Hari Ini",
      ctaBody: "Penyejukan ekonomi dari RM 180. Pemasangan hari sama di KL & Selangor.",
      whatsAppLabel: "Tempah Unit Tingkap via WhatsApp",
      callLabel: "Hubungi +60 18-298 3573",
      breadcrumbLabel: "Pemasangan Unit Tingkap",
    },
    zh: {
      metaTitle: "窗口式冷气安装 KL — RM180起 | 经济制冷 | KL Renovator",
      metaDescription: "吉隆坡和雪兰莪窗口式冷气安装RM180起。适合出租屋、旧公寓和经济型家庭。当天服务、1个月保修。WhatsApp +60182983573",
      ogImage: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
      ogImageAlt: "窗口式冷气安装 吉隆坡雪兰莪",
      eyebrow: "窗口式冷气安装专家",
      h1: "窗口式冷气安装 吉隆坡 & 雪兰莪",
      subtitle: "RM180起 · 当天服务 · 出租屋与旧住宅的经济制冷方案",
      heroBadges: ["RM180起", "可当天上门", "1个月保修", "无需室外机支架"],
      overviewTitle: "简单实惠的制冷选择",
      overviewBody:
        "窗口式冷气机是出租房、旧公寓和预算有限家庭的实用选择。所有部件集成在一个机箱内——无需室内外铜管连接、无需抽真空、无需复杂支架。我们安全固定机体、密封开口，并接入专用电路。",
      bestForTitle: "适合场景",
      bestForItems: [
        "出租房和经济型公寓",
        "没有室外机安装空间的旧式公寓",
        "临时或短期制冷需求",
        "150平方英尺以下单间",
        "需要快速经济安装的租户",
      ],
      pricingTitle: "窗口式冷气安装价格",
      pricingRows: [
        { hp: "1.0 匹", labour: "RM 180", pipe: "一体机", bracket: "窗框固定", note: "" },
        { hp: "1.5 匹", labour: "RM 200", pipe: "一体机", bracket: "窗框固定", note: "" },
        { hp: "2.0 匹", labour: "RM 230", pipe: "一体机", bracket: "窗框固定", note: "" },
      ],
      includedTitle: "包含项目",
      includedItems: [
        "免费现场勘察与报价",
        "窗框安装与调平",
        "侧板和防水密封",
        "从配电箱拉专用电线",
        "安装断路器/隔离开关",
        "运行测试和温度检查",
        "1个月工艺保修卡",
      ],
      extrasTitle: "可选额外费用（先报价）",
      extrasItems: [
        "新增电源插座：RM 100",
        "窗框加固：RM 50–80",
        "额外防水密封：RM 30–50",
        "高层施工附加费：RM 50–150",
        "拆除旧窗口机：RM 80",
      ],
      whyTitle: "为什么选择 KL Renovator 安装窗口式冷气？",
      whyItems: whyChoose.zh,
      faqs: [
        { q: "窗口式冷气安装多少钱？", a: "窗口式冷气安装1.0匹从RM180起，1.5匹RM200，2.0匹RM230。价格包含窗框安装、防水密封、电线接入和1个月工艺保修。" },
        { q: "窗口式安装需要多长时间？", a: "窗口式安装很快，通常2–3小时。不需要铜管连接或真空泵作业，非常适合当天服务。" },
        { q: "窗口式冷气需要单独的室外机吗？", a: "不需要。窗口式冷气机是一体机，压缩机和冷凝器都集成在同一个机箱内，只有一小部分后部伸出窗外。" },
        { q: "吉隆坡公寓适合装窗口式吗？", a: "窗口式通常只允许安装在旧式公寓或特定建筑中。大多数现代公寓要求安装分体机。我们可以评估您的物业是否适合。" },
      ],
      ctaTitle: "立即预约窗口式冷气安装",
      ctaBody: "经济制冷从RM180起。吉隆坡和雪兰莪可当天安装。",
      whatsAppLabel: "通过 WhatsApp 预约窗口式安装",
      callLabel: "致电 +60 18-298 3573",
      breadcrumbLabel: "窗口式冷气安装",
    },
  },
};

export function getInstallationContent(
  pageKey: InstallationPageKey,
  locale: InstallationLocale,
): InstallationPageContent {
  return installationPageContent[pageKey][locale];
}

export function getInstallationPageKeys(): InstallationPageKey[] {
  return Object.keys(installationPageContent) as InstallationPageKey[];
}

export function getInstallationPath(
  pageKey: InstallationPageKey,
  locale: InstallationLocale,
): string {
  const map: Record<InstallationPageKey, Record<InstallationLocale, string>> = {
    "1hp": { en: "/1hp-aircond-installation-kl", ms: "/pemasangan-aircond-1hp-kl", zh: "/1hp-aircond-installation-kl" },
    "1.5hp": { en: "/1.5hp-aircond-installation-kl", ms: "/pemasangan-aircond-1.5hp-kl", zh: "/1.5hp-aircond-installation-kl" },
    "2hp": { en: "/2hp-aircond-installation-kl", ms: "/pemasangan-aircond-2hp-kl", zh: "/2hp-aircond-installation-kl" },
    "wall-mounted": { en: "/wall-mounted-aircond-installation-kl", ms: "/pemasangan-aircond-dinding-kl", zh: "/wall-mounted-aircond-installation-kl" },
    "ceiling-cassette": { en: "/ceiling-cassette-aircond-installation-kl", ms: "/pemasangan-aircond-keset-siling-kl", zh: "/ceiling-cassette-aircond-installation-kl" },
    "window-unit": { en: "/window-unit-aircond-installation-kl", ms: "/pemasangan-aircond-tingkap-kl", zh: "/window-unit-aircond-installation-kl" },
  };
  return map[pageKey][locale];
}

export function getInstallationCanonical(
  pageKey: InstallationPageKey,
  locale: InstallationLocale,
): string {
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  return `https://www.klrenovator.com${localePrefix}${getInstallationPath(pageKey, locale)}`;
}

const langLabel: Record<InstallationLocale, string> = {
  en: "Aircond Installation",
  ms: "Pemasangan Aircond",
  zh: "冷气安装",
};

export function getInstallationMetadata(
  pageKey: InstallationPageKey,
  locale: InstallationLocale,
): Metadata {
  const c = getInstallationContent(pageKey, locale);
  const canonical = getInstallationCanonical(pageKey, locale);
  const paths = {
    en: getInstallationPath(pageKey, "en"),
    ms: getInstallationPath(pageKey, "ms"),
    zh: getInstallationPath(pageKey, "zh"),
  };
  const optimizedTitle = buildInstallationMetaTitle(c.metaTitle, locale, { type: "hp" });
  const optimizedDesc = buildInstallationMetaDesc(c.metaDescription, locale, { type: "hp" });
  return {
    title: optimizedTitle,
    description: optimizedDesc,
    openGraph: {
      title: optimizedTitle,
      description: optimizedDesc,
      type: "website",
      locale: locale === "en" ? "en_MY" : locale === "ms" ? "ms_MY" : "zh_MY",
      url: canonical,
      siteName: "KL Renovator",
      images: [
        {
          url: c.ogImage,
          width: 1200,
          height: 630,
          alt: c.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.metaDescription,
      images: [c.ogImage],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        "en-MY": `https://www.klrenovator.com${paths.en}`,
        "ms-MY": `https://www.klrenovator.com/ms${paths.ms}`,
        "zh-MY": `https://www.klrenovator.com/zh${paths.zh}`,
        "x-default": `https://www.klrenovator.com${paths.en}`,
      },
    },
  };
}
