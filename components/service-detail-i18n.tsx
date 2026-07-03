import { notFound } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services-data";
import { serviceI18n } from "@/config/services-i18n";
import { allPosts } from "@/config/blog-posts";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { ContactForm } from "@/components/contact-form";
import { ServiceIcon } from "@/components/service-icon";
import { title, subtitle, eyebrow } from "@/components/primitives";
import { SERVICE_PROBLEM_MAP, SERVICE_BLOG_MAP_V2 } from "@/config/topical-authority-map";

type Lang = "ms" | "zh";

export function ServiceDetailI18n({
  lang,
  slug,
}: {
  lang: Lang;
  slug: string;
}) {
  const data = servicesData[slug];
  const i18 = serviceI18n[slug];
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!data || !i18) notFound();

  const langPrefix = lang === "ms" ? "/ms" : "/zh";
  const iconName = service?.icon ?? "sparkles";

  // ── Chrome label maps (page language is always first in the eyebrow) ──
  const LABELS: Record<string, { en: string; ms: string; zh: string }> = {
    overview: { en: "Overview", ms: "Gambaran Keseluruhan", zh: "概述" },
    whatsIncluded: { en: "What's included", ms: "Apa yang disertakan", zh: "包含内容" },
    pricing: { en: "Pricing", ms: "Harga", zh: "收费" },
    process: { en: "Process", ms: "Proses", zh: "流程" },
    faq: { en: "FAQ", ms: "Soalan Lazim", zh: "常见问答" },
    alsoConsider: { en: "Also Consider", ms: "Pertimbangkan Juga", zh: "也考虑" },
    problemsFixed: { en: "Common Problems This Service Fixes", ms: "Masalah Biasa yang Diselesaikan Perkhidmatan Ini", zh: "此服务解决的常见问题" },
    expertGuides: { en: "Expert Guides", ms: "Panduan Pakar", zh: "专家指南" },
    bookIt: { en: "Book it", ms: "Tempah", zh: "预约" },
    otherServices: { en: "Other Services", ms: "Perkhidmatan Lain", zh: "其他服务" },
    whyChoose: { en: "Why KL Renovator", ms: "Mengapa KL Renovator", zh: "为什么选择KL Renovator" },
    relatedServices: { en: "Related Services You May Need", ms: "Perkhidmatan Berkaitan yang Mungkin Anda Perlukan", zh: "您可能需要的其他服务" },
    problemsFixes: { en: "Problems This Service Fixes", ms: "Masalah yang Diselesaikan Perkhidmatan Ini", zh: "此服务解决的问题" },
    whyChooseSub: { en: "Why Customers Choose Us Over Others", ms: "Mengapa Pelanggan Memilih Kami Berbanding Yang Lain", zh: "为什么客户选择我们而非他人" },
    relatedGuides: { en: "Related Aircond Guides & Articles", ms: "Panduan & Artikel Aircond Berkaitan", zh: "相关冷气指南与文章" },
    needTodaySub: {
      en: "Same-day slots available Mon–Sun across all KL & Selangor. WhatsApp for fastest dispatch.",
      ms: "Slot hari sama tersedia Isnin–Ahad di seluruh KL & Selangor. WhatsApp untuk penghantaran terpantas.",
      zh: "周一至周日，吉隆坡及雪兰莪全区均可安排当天上门。WhatsApp 联系可获得最快派单。",
    },
    sendMessage: {
      en: "Send us a message now — we'll reply with availability and a firm quote within 30 minutes.",
      ms: "Hantar mesej kepada kami sekarang — kami akan membalas dengan ketersediaan dan sebut harga tepat dalam 30 minit.",
      zh: "立即发送消息——我们将在 30 分钟内回复可预约时间并提供确定报价。",
    },
    availableToday: { en: "Available Today", ms: "Tersedia Hari Ini", zh: "今日可上门" },
    pricingNote: {
      en: "Starting prices. Material costs (gas, copper, trunking) quoted separately.",
      ms: "Harga permulaan. Kos bahan (gas, kuprum, trunking) dikira berasingan.",
      zh: "起步价格。材料费用（气体、铜管等）另行报价。",
    },
    materialsTitle: { en: "Additional Materials & Special Charges", ms: "Bahan Tambahan & Caj Khas", zh: "额外材料与特殊费用" },
    materialsSectionTitle: { en: "Additional Materials Pricing", ms: "Harga Bahan Tambahan", zh: "额外材料收费" },
    materialsNote: {
      en: "All material costs are quoted and confirmed with you before work begins. No surprises.",
      ms: "Semua kos bahan disebut harga dan disahkan dengan anda sebelum kerja dimulakan. Tiada kejutan.",
      zh: "所有材料费用都会在工作开始前向您报价并确认，绝无意外。",
    },
    includedFree: { en: "✓ Included free: ", ms: "✓ Termasuk percuma: ", zh: "✓ 免费包含：" },
    viewFullMaterials: { en: "View Full Materials Pricing & Special Charges →", ms: "Lihat Harga Bahan Penuh & Caj Khas →", zh: "查看完整材料收费与特殊费用 →" },
    allProblems: { en: "All Aircond Problems →", ms: "Semua Masalah Aircond →", zh: "全部冷气问题 →" },
    fromWord: { en: "From", ms: "Dari", zh: "从" },
    allKlSelangorTag: { en: "All KL & Selangor", ms: "Seluruh KL & Selangor", zh: "全区KL &雪兰莪" },
    availableAreas: { en: "Available in These Areas", ms: "Tersedia di Kawasan Ini", zh: "覆盖地区" },
    allBrands: { en: "All Brands We Service", ms: "Semua Jenama yang Kami Servis", zh: "我们服务的所有品牌" },
    home: { en: "Home", ms: "Utama", zh: "首页" },
    services: { en: "Services", ms: "Perkhidmatan", zh: "服务" },
  };

  const pick = (key: keyof typeof LABELS) => LABELS[key][lang];
  const tri = (key: keyof typeof LABELS) => {
    const v = LABELS[key];
    return lang === "ms" ? `${v.ms} · ${v.en} · ${v.zh}` : `${v.zh} · ${v.en} · ${v.ms}`;
  };

  // Two-span title() headings (first part plain, second part brand-coloured)
  const SPLIT: Record<string, { en: [string, string]; ms: [string, string]; zh: [string, string] }> = {
    everything: { en: ["Everything you ", "get with us."], ms: ["Semua yang anda ", "dapat bersama kami."], zh: ["您将", "获得的一切。"] },
    pricing: { en: ["Transparent ", "pricing."], ms: ["Harga yang ", "telus."], zh: ["透明", "收费。"] },
    howItWorks: { en: ["How it ", "works."], ms: ["Bagaimana ia ", "berfungsi."], zh: ["工作", "方式。"] },
    commonQuestions: { en: ["Common ", "questions."], ms: ["Soalan-soalan ", "biasa."], zh: ["常见", "问题。"] },
  };

  // ── Trust strip ────────────────────────────────────────────────────────
  const TRUST: Record<Lang, string[]> = {
    ms: ["Jaminan Kerjatangan 1 Bulan", "Harga Disahkan Sebelum Kerja", "500+ Ulasan Google 5 Bintang", "Hari Sama Tersedia", "Berdaftar SSM"],
    zh: ["工艺保修1个月", "工作前确认价格", "500+ 谷歌五星好评", "可提供当天服务", "SSM注册"],
  };

  // ── Why choose us (generic, translated) ────────────────────────────────
  const WHY_ITEMS: { icon: string; en: string; ms: string; zh: string; descMS: string; descZH: string }[] = [
    {
      icon: "💰",
      en: "Transparent Pricing", ms: "Harga Telus", zh: "价格透明",
      descMS: "Harga penuh disahkan sebelum kerja dimulakan. Tiada caj tersembunyi, tiada tambahan mengejut. Apa yang kami sebut adalah apa yang anda bayar.",
      descZH: "开始工作前确认全部价格。无隐藏费用，无意外加价。我们报价多少，您就付多少。",
    },
    {
      icon: "📋",
      en: "Quote Before Work", ms: "Sebut Harga Dahulu", zh: "施工前报价",
      descMS: "Kami diagnos dahulu, sebut kemudian, kerja akhirnya. Anda meluluskan setiap kos sebelum spanar kami menyentuh unit anda.",
      descZH: "我们先诊断，再报价，最后施工。在我们的工具碰到您的机器之前，您先批准每一项费用。",
    },
    {
      icon: "🔧",
      en: "Trained Technicians", ms: "Juruteknik Terlatih", zh: "训练有素的技术员",
      descMS: "Setiap juruteknik terlatih dan berpengalaman dengan semua jenama dan jenis unit. Kami membawa alat dan alat ganti yang betul.",
      descZH: "每位技术员都经过培训，熟悉所有品牌和机型。我们携带正确的工具和零件。",
    },
    {
      icon: "⭐",
      en: "500+ 5-Star Reviews", ms: "500+ Ulasan Bintang 5", zh: "500+五星好评",
      descMS: "Rekod prestasi kami bercakap sendiri. 5,000+ pelanggan dilayan di seluruh KL dan Selangor dengan keputusan 5 bintang yang konsisten.",
      descZH: "我们的业绩说明一切。已在吉隆坡和雪兰莪服务 5,000 多名客户，始终如一的五星好评。",
    },
    {
      icon: "🛡️",
      en: "1-Month Warranty", ms: "Waranti 1 Bulan", zh: "一个月保修",
      descMS: "Semua kerjatangan dilindungi selama 1 bulan. Alat ganti dilindungi selama 3 bulan. Jika masalah berulang dalam tempoh jaminan, kami kembali secara percuma.",
      descZH: "所有工艺保修1个月，零件保修3个月。如果在保修期内问题再次出现，我们免费上门。",
    },
    {
      icon: "🚀",
      en: "Same-Day Service", ms: "Servis Hari Sama", zh: "当天服务",
      descMS: "WhatsApp kami lokasi dan masalah anda. Kami mengesahkan slot hari sama dalam beberapa minit untuk kebanyakan kawasan di Lembah Klang.",
      descZH: "通过 WhatsApp 告诉我们您的位置和问题。对于吉隆坡河谷大部分地区，我们几分钟内即可确认当天服务时段。",
    },
  ];

  // ── Material label translation (siteConfig.pricing.materials.rows) ─────
  const MATERIAL_LABELS: Record<string, { ms: string; zh: string }> = {
    "Copper Pipe 1.0 – 1.5 HP": { ms: "Paip Kuprum 1.0 – 1.5 HP", zh: "铜管 1.0 – 1.5 HP" },
    "Copper Pipe 2.0 – 2.5 HP": { ms: "Paip Kuprum 2.0 – 2.5 HP", zh: "铜管 2.0 – 2.5 HP" },
    "Copper Pipe 3.0 – 3.5 HP": { ms: "Paip Kuprum 3.0 – 3.5 HP", zh: "铜管 3.0 – 3.5 HP" },
    "Wire": { ms: "Wayar", zh: "电线" },
    "Standard Outdoor Bracket": { ms: "Braket Luaran Standard", zh: "标准室外支架" },
    "Indoor Universal Bracket": { ms: "Braket Universal Dalaman", zh: "室内通用支架" },
    "PVC Casing Wire/Copper Pipe": { ms: "Sarung PVC Wayar/Paip Kuprum", zh: "PVC电线/铜管槽" },
    "Electrical Plug Point Installation": { ms: "Pemasangan Titik Plag Elektrik", zh: "电源插座安装" },
    "Wall Hacking & Concealment Work": { ms: "Kerja Pecah Dinding & Pendam", zh: "墙体开槽与暗装工程" },
    "High-Rise / Difficult Access Charge": { ms: "Caj Akses Bangunan Tinggi / Sukar", zh: "高层/难进入作业费" },
    "Standard Metal Cable Tray": { ms: "Dulang Kabel Logam Standard", zh: "标准金属线槽" },
  };
  const matLabel = (enLabel: string) => MATERIAL_LABELS[enLabel]?.[lang] ?? enLabel;

  // ── Resolved localized content ──────────────────────────────────────────
  const tTitle = lang === "ms" ? i18.titleMS : i18.titleZH;
  const tTagline = lang === "ms" ? i18.taglineMS : i18.taglineZH;
  const tDescription = lang === "ms" ? i18.descriptionMS : i18.descriptionZH;
  const tHighlights = lang === "ms" ? i18.highlightsMS : i18.highlightsZH;
  const tProcess = lang === "ms" ? i18.processMS : i18.processZH;
  const tPriceTable = lang === "ms" ? i18.priceTableMS : i18.priceTableZH;
  const inLang = lang === "ms" ? "ms-MY" : "zh-MY";

  // FAQ selection: page language is primary, the other two are secondary.
  const faqsPrimary = lang === "ms" ? data.faqsBM : data.faqsZH;
  const faqsSecondary: { langTag: string; label: string; items: { q: string; a: string }[] }[] =
    lang === "ms"
      ? [
          { langTag: "🇬🇧 EN", label: "English", items: data.faqs },
          { langTag: "🇨🇳 中文", label: "中文", items: data.faqsZH },
        ]
      : [
          { langTag: "🇬🇧 EN", label: "English", items: data.faqs },
          { langTag: "🇲🇾 BM", label: "Bahasa Malaysia", items: data.faqsBM },
        ];

  // ── Cross-service recommendations ───────────────────────────────────────
  const CROSS_SERVICE_MAP: Record<string, string[]> = {
    "chemical-wash": ["chemical-overhaul", "basic-servicing", "gas-topup"],
    "chemical-overhaul": ["chemical-wash", "gas-topup", "repair"],
    "gas-topup": ["chemical-wash", "repair", "chemical-overhaul"],
    repair: ["chemical-wash", "chemical-overhaul", "gas-topup"],
    installation: ["basic-servicing", "chemical-wash"],
    "ceiling-cassette": ["chemical-overhaul", "repair", "gas-topup"],
    "dismantling-relocation": ["installation", "chemical-wash"],
    "basic-servicing": ["chemical-wash", "chemical-overhaul"],
    emergency: ["repair", "chemical-overhaul", "gas-topup"],
  };
  const crossSlugs = CROSS_SERVICE_MAP[slug] ?? [];
  const crossServices = siteConfig.services.filter((s) => crossSlugs.includes(s.slug));
  const svcTitle = (s: (typeof siteConfig.services)[number]) =>
    (lang === "ms" ? serviceI18n[s.slug]?.titleMS : serviceI18n[s.slug]?.titleZH) ?? s.title;
  const svcShort = (s: (typeof siteConfig.services)[number]) =>
    (lang === "ms" ? serviceI18n[s.slug]?.taglineMS : serviceI18n[s.slug]?.taglineZH) ?? s.short;

  const SERVICE_BLOG_MAP: Record<string, string[]> = {
    "chemical-wash": ["aircond-chemical-wash-price-malaysia-2026", "chemical-wash-vs-chemical-overhaul", "signs-your-aircond-needs-chemical-overhaul-malaysia", "how-often-service-aircond-malaysia"],
    "chemical-overhaul": ["chemical-wash-vs-chemical-overhaul", "signs-your-aircond-needs-chemical-overhaul-malaysia", "aircond-water-leaking-causes", "how-often-service-aircond-malaysia"],
    "gas-topup": ["r32-r410a-r22-gas-difference", "aircond-not-cold-reasons", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
    repair: ["aircond-not-cold-reasons", "aircond-water-leaking-causes", "aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
    installation: ["aircond-installation-guide-malaysia", "best-aircond-brands-malaysia-2025", "inverter-vs-non-inverter-aircond-malaysia", "daikin-vs-panasonic-aircond-malaysia"],
    "basic-servicing": ["how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia", "how-to-reduce-aircond-electricity-bill-malaysia", "aircond-service-price-guide-kl-2026"],
    "ceiling-cassette": ["commercial-hvac-maintenance-kl", "aircond-service-price-guide-kl-2026"],
    "dismantling-relocation": ["aircond-installation-guide-malaysia", "aircond-lifespan-malaysia"],
  };
  const relatedSlugs = SERVICE_BLOG_MAP_V2[slug] ?? SERVICE_BLOG_MAP[slug] ?? [];
  const relatedPosts = allPosts.filter((p) => relatedSlugs.includes(p.slug)).slice(0, 4);
  const blogHref = (p: (typeof allPosts)[number]) => {
    const has = lang === "ms" ? p.contentMS : p.contentZH;
    return has ? `${langPrefix}/blog/${p.slug}` : `/blog/${p.slug}`;
  };

  // ── Schemas ─────────────────────────────────────────────────────────────
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: tTitle,
    description: tTagline,
    url: `https://www.klrenovator.com${langPrefix}/services/${slug}`,
    provider: {
      "@type": "HVACBusiness",
      "@id": "https://www.klrenovator.com/#business",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: "https://www.klrenovator.com",
    },
    areaServed: [
      { "@type": "City", name: "Kuala Lumpur" },
      { "@type": "State", name: "Selangor" },
    ],
    offers: {
      "@type": "Offer",
      price: service?.startPrice ?? 88,
      priceCurrency: "MYR",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: service?.startPrice ?? 88,
        priceCurrency: "MYR",
        description: `${pick("fromWord")} RM ${service?.startPrice ?? 88}`,
      },
      availability: "https://schema.org/InStock",
      areaServed: "Kuala Lumpur and Selangor, Malaysia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${tTitle} ${pick("pricing")}`,
      itemListElement: tPriceTable.map((row: { label: string; price: string }, i: number) => ({
        "@type": "Offer",
        position: i + 1,
        name: row.label,
        description: row.price,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: pick("home"), item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: pick("services"), item: `https://www.klrenovator.com${langPrefix}/services` },
      { "@type": "ListItem", position: 3, name: tTitle, item: `https://www.klrenovator.com${langPrefix}/services/${slug}` },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${lang === "ms" ? "Cara Tempah" : "如何预约"} ${tTitle} ${lang === "ms" ? "di KL & Selangor" : "（吉隆坡及雪兰莪）"}`,
    description: `${lang === "ms" ? "Langkah demi langkah untuk" : "预约"} ${tTitle} ${lang === "ms" ? "oleh KL Renovator di Kuala Lumpur dan Selangor" : "——KL Renovator 在吉隆坡与雪兰莪的服务流程"}`,
    estimatedCost: { "@type": "MonetaryAmount", currency: "MYR", value: service?.startPrice ?? "99" },
    step: tProcess.map((p: { step: string; desc: string }, i: number) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: p.step,
      text: p.desc,
    })),
  };

  const faqSchema =
    faqsPrimary && faqsPrimary.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsPrimary.map((f: { q: string; a: string }) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://www.klrenovator.com${langPrefix}/services/${slug}#webpage`,
    name: `${tTitle} KL & Selangor — KL Renovator`,
    description: tTagline,
    url: `https://www.klrenovator.com${langPrefix}/services/${slug}`,
    inLanguage: inLang,
    isPartOf: { "@id": "https://www.klrenovator.com/#website" },
    about: { "@id": "https://www.klrenovator.com/#business" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".speakable"] },
  };

  const stepColors = ["bg-sky-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-teal-500"];
  const highlightColors = ["bg-sky-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-teal-500", "bg-indigo-500", "bg-orange-500"];

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href={`${langPrefix}/`} className="hover:text-sky-600 transition">{pick("home")}</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href={`${langPrefix}/services`} className="hover:text-sky-600 transition">{pick("services")}</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">{tTitle}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src={data.heroImage || "/hero/aircond-installation-kuala-lumpur.webp"}
            alt={`KL Renovator ${tTitle} — KL & Selangor`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <Reveal>
              <div>
                <div className="inline-flex h-14 w-14 items-center justify-center bg-sky-500 text-white shadow-md">
                  <ServiceIcon name={iconName} className="h-7 w-7" />
                </div>
                <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900">{tTitle}</h1>

                <p className="mt-4 text-lg text-slate-600 max-w-xl leading-relaxed">{tTagline}</p>
                <div className="mt-6 flex items-center gap-3 text-sm">
                  <span className="bg-sky-500 text-white px-3 py-1.5 font-bold uppercase tracking-wider">
                    {pick("fromWord")} {data.startPrice}
                  </span>
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">{pick("allKlSelangorTag")}</span>
                </div>
                <div className="mt-8">
                  <BookingButton serviceName={tTitle} size="lg" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-white text-slate-900 p-6 sm:p-8 border-2 border-sky-100 shadow-sm">
                <p className={eyebrow()}>{pick("overview")}</p>
                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">{tDescription}</p>
                <ul className="mt-6 space-y-2.5">
                  {tHighlights.slice(0, 4).map((h: string, i: number) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center ${highlightColors[i % highlightColors.length]} text-white mt-0.5`}>
                        <FiCheck className="h-3 w-3" />
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Trust Signal Strip ─────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest">
          {TRUST[lang].map((t: string) => (
            <span key={t} className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> {t}</span>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>{tri("whatsIncluded")}</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>{SPLIT.everything[lang][0]}</span>
              <span className={title({ size: "sm", color: "brand" })}>{SPLIT.everything[lang][1]}</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {tHighlights.map((h: string, i: number) => (
              <Reveal key={h} delay={i * 60}>
                <div className="flex items-start gap-3 bg-white p-5 h-full">
                  <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center ${highlightColors[i % highlightColors.length]} text-white`}>
                    <FiCheck className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">{h}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>{tri("pricing")}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{SPLIT.pricing[lang][0]}</span>
                <span className={title({ size: "sm", color: "brand" })}>{SPLIT.pricing[lang][1]}</span>
              </h2>
              <p className="mt-2 text-xs text-slate-500">{pick("pricingNote")}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {tPriceTable.map((p: { label: string; price: string }) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-base font-bold text-sky-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {data.priceTableNote && (
            <Reveal>
              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <span className="font-black">{pick("includedFree")}</span>
                  {data.priceTableNote}
                </p>
                <NextLink
                  href={`${langPrefix}/services#materials`}
                  className="inline-flex items-center gap-1 mt-2 text-xs font-black text-sky-600 hover:text-sky-800 transition-colors"
                >
                  {pick("viewFullMaterials")}
                </NextLink>
              </div>
            </Reveal>
          )}

          {/* Inline Materials Pricing — installation, dismantling, ceiling-cassette */}
          {(slug === "installation" || slug === "dismantling-relocation" || slug === "ceiling-cassette") && (
            <Reveal>
              <div className="mt-10">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{pick("materialsSectionTitle")}</p>
                <h3 className="text-base font-black text-slate-900 mb-4">{pick("materialsTitle")}</h3>
                <div className="border border-slate-200 bg-white">
                  <ul className="divide-y divide-slate-200">
                    {siteConfig.pricing.materials.rows.map((row: { label: string; price: string }) => (
                      <li key={row.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
                        <span className="text-sm text-slate-700">{matLabel(row.label)}</span>
                        <span className="text-sm font-bold text-sky-600 whitespace-nowrap">{row.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-slate-400 mt-3">{pick("materialsNote")}</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>{tri("process")}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{SPLIT.howItWorks[lang][0]}</span>
                <span className={title({ size: "sm", color: "brand" })}>{SPLIT.howItWorks[lang][1]}</span>
              </h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {tProcess.map((p: { step: string; desc: string }, i: number) => (
              <Reveal key={p.step} delay={i * 80}>
                <div className="bg-white p-6 h-full">
                  <span className={`inline-flex h-10 w-10 items-center justify-center ${stepColors[i % stepColors.length]} text-white font-extrabold text-sm`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-extrabold text-slate-900 uppercase tracking-tight">{p.step}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs — page language primary, then the other two as secondary */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>{tri("faq")}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{SPLIT.commonQuestions[lang][0]}</span>
                <span className={title({ size: "sm", color: "brand" })}>{SPLIT.commonQuestions[lang][1]}</span>
              </h2>
            </div>
          </Reveal>

          {/* Primary language FAQs */}
          <div className="mt-8 border border-slate-200 divide-y divide-slate-200">
            {faqsPrimary.map((f: { q: string; a: string }, i: number) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900">
                    {f.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          {/* Secondary language FAQ blocks */}
          {faqsSecondary.map((block) => (
            <Reveal key={block.label}>
              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{block.langTag} {block.label}</p>
                <div className="space-y-3">
                  {block.items.map((f, i: number) => (
                    <div key={i} className="bg-white border border-slate-200 p-4">
                      <h3 className="font-black text-sm text-slate-900 mb-2">{f.q}</h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Area Links */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{tTitle} {pick("availableAreas")}</p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.areaPages.map((area) => (
                <NextLink
                  key={area.slug}
                  href={`${langPrefix}/areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition rounded-full"
                >
                  {area.name} <FiArrowRight className="h-3 w-3" />
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brands Internal Links */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{tTitle} {pick("allBrands")}</p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.brandPages.map((brand) => (
                <NextLink
                  key={brand.slug}
                  href={`${langPrefix}/brands/${brand.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition rounded-full"
                >
                  {brand.name} <FiArrowRight className="h-3 w-3" />
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Same-Day Urgency Banner ──────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-sky-200 mb-1">{pick("availableToday")}</p>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              {lang === "ms" ? `Perlukan ${tTitle} Hari Ini?` : `今天需要${tTitle}？`}
            </h2>
            <p className="text-sky-100 text-sm mt-1">{pick("needTodaySub")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <BookingButton serviceName={tTitle} size="md" />
          </div>
        </div>
      </section>

      {/* ── Competitor Differentiator ─────────────────────────────────────── */}
      <section className="py-12 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">{pick("whyChoose")}</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{pick("whyChooseSub")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_ITEMS.map((item) => (
              <div key={item.icon} className="bg-white border border-slate-200 rounded-2xl p-5">
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="font-black text-slate-900 text-sm mb-0.5">{lang === "ms" ? item.ms : item.zh}</h3>
                <p className="text-[10px] text-slate-400 font-semibold mb-2">{item.en} · {lang === "ms" ? item.zh : item.ms}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{lang === "ms" ? item.descMS : item.descZH}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Also Consider — Cross-Service Links ──────────────────────────── */}
      {(() => {
        if (crossServices.length === 0) return null;
        return (
          <section className="py-10 px-4 bg-white border-t border-slate-100">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{tri("alsoConsider")}</p>
              <h2 className="text-base font-black text-slate-900 mb-4">{pick("relatedServices")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {crossServices.map((s) => (
                  <NextLink
                    key={s.slug}
                    href={`${langPrefix}/services/${s.slug}`}
                    className="group bg-slate-50 border border-slate-200 hover:border-sky-300 hover:shadow-sm rounded-2xl p-4 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors">{svcTitle(s)}</h3>
                      <FiArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-sky-500 transition-colors shrink-0" />
                    </div>
                    <p className="text-xs text-sky-700 font-black">{pick("fromWord")} RM {s.startPrice}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{svcShort(s)}</p>
                  </NextLink>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Related Problems — service-specific from topical authority map */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{tri("problemsFixed")}</p>
            <h2 className="text-base font-black text-slate-900 mb-4">{pick("problemsFixes")}</h2>
            <div className="flex flex-wrap gap-2">
              {(() => {
                const specificSlugs = SERVICE_PROBLEM_MAP[slug] ?? [];
                const specificProblems = specificSlugs.length > 0
                  ? siteConfig.problemPages.filter((p) => specificSlugs.includes(p.slug))
                  : siteConfig.problemPages.slice(0, 8);
                return specificProblems.map((problem) => (
                  <NextLink
                    key={problem.slug}
                    href={`${langPrefix}/problems/${problem.slug}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition rounded-xl"
                  >
                    <FiArrowRight className="h-3 w-3 text-red-400 shrink-0" />
                    {problem.name}
                    <span className="text-slate-400 font-normal"> · {problem.nameMS}</span>
                  </NextLink>
                ));
              })()}
              <NextLink
                href={`${langPrefix}/problems`}
                className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-black text-red-700 hover:bg-red-100 transition rounded-xl"
              >
                {pick("allProblems")}
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Blog Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{tri("expertGuides")}</p>
            <h2 className="text-lg font-black text-slate-900 mb-6">{pick("relatedGuides")}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.map((post) => (
                <NextLink
                  key={post.slug}
                  href={blogHref(post)}
                  className="group flex flex-col bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-400 hover:shadow-md transition"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-2">{post.category}</span>
                  <span className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition leading-snug mb-2">{post.title}</span>
                  <span className="text-xs text-slate-500 mt-auto">{post.readTime} min read</span>
                </NextLink>
              ))}
            </div>
            <NextLink href={`${langPrefix}/blog`} className="inline-flex items-center gap-1 mt-6 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
              {lang === "ms" ? "Semua Panduan Aircond" : "全部冷气指南"} <FiArrowRight className="h-3 w-3" />
            </NextLink>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <p className={eyebrow()}>{tri("bookIt")}</p>
                <h2 className="mt-3">
                  <span className={title({ size: "md" })}>{lang === "ms" ? "Tempah " : "预约"}</span>
                  <span className={title({ size: "md", color: "brand" })}>{tTitle}{lang === "ms" ? "." : "。"}</span>
                </h2>
                <p className={subtitle({ class: "mt-4" })}>{pick("sendMessage")}</p>
                <div className="mt-6">
                  <BookingButton serviceName={tTitle} size="lg" />
                </div>

                <div className="mt-10">
                  <p className={eyebrow()}>{tri("otherServices")}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {siteConfig.services
                      .filter((s) => s.slug !== slug)
                      .map((s) => (
                        <NextLink
                          key={s.slug}
                          href={`${langPrefix}/services/${s.slug}`}
                          className="inline-flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:border-sky-500 hover:text-sky-600 transition"
                        >
                          {svcTitle(s)} <FiArrowRight className="h-3 w-3" />
                        </NextLink>
                      ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
