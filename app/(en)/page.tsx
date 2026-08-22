import { Hero } from "@/components/sections/hero";
import { InstallationSpotlight } from "@/components/sections/installation-spotlight";
import { HomeToolsLazy } from "@/components/home-tools-lazy";
import { StatsBand } from "@/components/sections/stats-band";
import {
  ServicesIsland,
  WhyChooseUsIsland,
  ReviewsIsland,
  TrustStripIsland,
  CoverageIsland,
  HubIsland,
} from "@/components/homepage-islands";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { siteConfig } from "@/config/site";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import NextLink from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { HomepageAeoSchemas } from "@/components/homepage-aeo-schemas";
import type { Metadata } from "next";
import { LanguageProvider, type Lang } from "@/context/language-context";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.klrenovator.com",
    languages: {
      "en-MY": "https://www.klrenovator.com",
      "ms-MY": "https://www.klrenovator.com/ms",
      "zh-MY": "https://www.klrenovator.com/zh",
      "x-default": "https://www.klrenovator.com",
    },
  },
  openGraph: {
    images: [
      {
        url: "https://www.klrenovator.com/hero/york-aircond-chemical-wash-puchong-37.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Expert aircond installation & servicing across Kuala Lumpur & Selangor",
      },
    ],
  },
  twitter: {
    images: ["https://www.klrenovator.com/hero/york-aircond-chemical-wash-puchong-37.webp"],
  },
};

// Locale dictionaries for all formerly hard-coded English sections
const COPY = {
  en: {
    emergencyBadge: "Same-Day Emergency Available",
    emergencyTitle: "Aircond Breakdown? We Come Today.",
    emergencyDesc: "Aircond Breakdown? We respond same day.",
    emergencyBtn: "🚨 Emergency Service →",
    waNow: "📲 WhatsApp Now",
    waUrgent: "🚨 URGENT — Emergency Aircond Service Needed\n\nHi KL Renovator, I need EMERGENCY aircond help right now.\n\n📍 Location:\n❄️ Problem:\n\nPlease send a technician ASAP.",
    toolsEyebrow: "Free Instant Tools",
    toolsTitle: "Get Your Answer in 30 Seconds",
    toolsSub: "Dapatkan Jawapan Dalam 30 Saat | 30秒内获得答案",
    installCalc: "🔧 Installation Cost Calculator",
    gasCalc: "⛽ Gas Top-up Cost Estimator",
    sizeCalc: "📏 Aircond Size Calculator",
    elecCalc: "⚡ Electricity Cost Calculator",
    savingCalc: "💰 Inverter Savings Calculator",
    viewAll: "View All Tools →",
    popularEyebrow: "Popular Price Guides",
    popularTitle: "Transparent Aircond Pricing — No Hidden Fees",
    popularSub: "Harga Telus Tanpa Yuran Tersembunyi | 价格透明无隐藏费用",
    servicePriceTitle: "Aircond Service Price 2026",
    servicePriceDesc: "Full service price list — basic, chemical wash, gas, repair, installation. All prices confirmed upfront.",
    installGuideTitle: "Installation Price Guide",
    installGuideDesc: "New AC installation from RM 199. Full materials breakdown, copper piping & warranty included.",
    installKLTitle: "Aircond Installation KL & Selangor",
    installKLDesc: "Expert installation from RM 199. 7-step process, vacuum pump, Type L copper, 1-month warranty. Same-day available.",
    washGuideTitle: "Chemical Wash KL Guide",
    washGuideDesc: "Cuci aircond KL dari RM 120. Pressure chemical cleaning, same-day booking. Full Klang Valley coverage.",
    viewPrices: "View Prices",
    viewGuide: "View Guide",
    viewInstall: "View Installation",
    cuciKL: "Cuci Aircond KL",
    quickProblems: "Aircond Problems · Masalah",
    quickBrands: "Brands We Service · Jenama",
    quickAreas: "Service Areas · Kawasan",
    quickGuides: "Expert Guides · Panduan",
    allProblems: "All Problems →",
    allBrands: "All Brands →",
    allAreas: "All Areas →",
    allGuides: "All Guides →",
    resourceEyebrow: "Complete Resource Hub",
    resourceTitle: "Everything You Need — All In One Place",
    resourceSub: "Semua Dalam Satu Tempat | 所有资源一站式",
    problemsCluster: "Aircond Problems",
    problemsFix: "Fix By Problem Type",
    brandsCluster: "Aircond Brands",
    brandsBy: "Service By Brand",
    areasCluster: "Service Areas",
    areasFind: "Find Your Area",
    guidesCluster: "Expert Guides",
    guidesLearn: "Learn & Decide",
    installCluster: "Installation",
    installPro: "Install Like a Pro",
    installGuideLink: "Installation Guide →",
    faqEyebrow: "Got Questions? Quick Answers",
    faqTitle1: "Aircond Installation ",
    faqTitle2: "FAQs at a Glance",
    faqDesc: "Quick, honest answers to the most common questions — for AI Overviews & instant clarity.",
    askWa: "Ask More on WhatsApp",
    browseFaq: "Or browse all 100+ FAQs on our",
    faqPage: "dedicated FAQ page →",
    waFaq: "🔧 Aircond Installation Enquiry\n\nHi KL Renovator, I have a question about installation.\n\n📍 My Area:\n❄️ Unit Type:\n📏 HP Size:\n\nPlease send info & pricing.",
    faqs: [
      { q: "How much does aircond installation cost in KL & Selangor?", a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP including 7 ft copper pipe, insulation, electrical wire and drain pipe, vacuum pump commissioning, and 1-month workmanship warranty. Ceiling cassette from RM 290, window unit from RM 199. All prices confirmed before work begins." },
      { q: "How long does aircond installation take?", a: "Standard wall-mounted installation takes 3–5 hours for a single unit. Ceiling cassette takes 5–8 hours. Multi-unit whole-house installations typically complete in 1–2 days. Same-day installation available for bookings made before 11 AM." },
      { q: "Which aircond brands does KL Renovator install?", a: "All 20 major brands — Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Haier, Hisense, Aux, TCL, Isonic and National. Both inverter and non-inverter models." },
      { q: "Can you install aircond in high-rise condos in KL?", a: "Yes — we regularly install in condos across KLCC, Mont Kiara, Bangsar, Sentul, PJ and Subang Jaya. We coordinate with building management for lift/loading bay access, follow JMB rules, and ensure outdoor unit placement complies with all regulations." },
      { q: "What warranty does KL Renovator provide on installation?", a: "1-month written workmanship warranty on all installation labour. If any installation-related issue arises (leaks, vibration, electrical fault, poor cooling) within 30 days, we return and rectify at zero cost. Manufacturer warranty on the unit itself remains fully protected." },
    ],
  },
  ms: {
    emergencyBadge: "Kecemasan Hari Sama Tersedia",
    emergencyTitle: "Aircond Rosak? Kami Datang Hari Ini.",
    emergencyDesc: "Aircond rosak? Kami datang hari ini.",
    emergencyBtn: "🚨 Servis Kecemasan →",
    waNow: "📲 WhatsApp Sekarang",
    waUrgent: "🚨 KECEMASAN — Perlu Servis Aircond Segera\n\nHai KL Renovator, saya perlukan bantuan aircond kecemasan sekarang.\n\n📍 Lokasi:\n❄️ Masalah:\n\nSila hantar juruteknik ASAP.",
    toolsEyebrow: "Alat Percuma Segera",
    toolsTitle: "Dapatkan Jawapan Dalam 30 Saat",
    toolsSub: "Get Your Answer in 30 Seconds | 30秒内获得答案",
    installCalc: "🔧 Kalkulator Kos Pemasangan",
    gasCalc: "⛽ Anggaran Kos Tambah Gas",
    sizeCalc: "📏 Kalkulator Saiz Aircond",
    elecCalc: "⚡ Kalkulator Kos Elektrik",
    savingCalc: "💰 Kalkulator Penjimatan Inverter",
    viewAll: "Lihat Semua Alat →",
    popularEyebrow: "Panduan Harga Popular",
    popularTitle: "Harga Aircond Telus — Tiada Yuran Tersembunyi",
    popularSub: "Transparent Pricing — No Hidden Fees | 价格透明无隐藏费用",
    servicePriceTitle: "Harga Servis Aircond 2026",
    servicePriceDesc: "Senarai harga penuh — asas, cuci kimia, gas, baiki, pemasangan. Semua harga disahkan awal.",
    installGuideTitle: "Panduan Harga Pemasangan",
    installGuideDesc: "Pemasangan AC baharu dari RM 199. Pecahan bahan penuh, paip kuprum dinding & waranti termasuk.",
    installKLTitle: "Pemasangan Aircond KL & Selangor",
    installKLDesc: "Pemasangan pakar dari RM 199. Proses 7 langkah, pam vakum, kuprum Type L, waranti 1 bulan. Hari sama tersedia.",
    washGuideTitle: "Panduan Cuci Kimia KL",
    washGuideDesc: "Cuci aircond KL dari RM 120. Cuci kimia bertekanan, tempahan hari sama. Liputan penuh Lembah Klang.",
    viewPrices: "Lihat Harga",
    viewGuide: "Lihat Panduan",
    viewInstall: "Lihat Pemasangan",
    cuciKL: "Cuci Aircond KL",
    quickProblems: "Masalah Aircond",
    quickBrands: "Jenama Kami Servis",
    quickAreas: "Kawasan Servis",
    quickGuides: "Panduan Pakar",
    allProblems: "Semua Masalah →",
    allBrands: "Semua Jenama →",
    allAreas: "Semua Kawasan →",
    allGuides: "Semua Panduan →",
    resourceEyebrow: "Hab Sumber Lengkap",
    resourceTitle: "Semua Yang Anda Perlukan — Di Satu Tempat",
    resourceSub: "Everything You Need — All In One Place | 所有资源一站式",
    problemsCluster: "Masalah Aircond",
    problemsFix: "Baiki Ikut Jenis Masalah",
    brandsCluster: "Jenama Aircond",
    brandsBy: "Servis Ikut Jenama",
    areasCluster: "Kawasan Servis",
    areasFind: "Cari Kawasan Anda",
    guidesCluster: "Panduan Pakar",
    guidesLearn: "Belajar & Buat Keputusan",
    installCluster: "Pemasangan",
    installPro: "Pasang Seperti Pakar",
    installGuideLink: "Panduan Pemasangan →",
    faqEyebrow: "Ada Soalan? Jawapan Pantas",
    faqTitle1: "Soalan Lazim ",
    faqTitle2: "Pemasangan Aircond",
    faqDesc: "Jawapan pantas dan jujur kepada soalan paling lazim — untuk AI Overviews & kejelasan segera.",
    askWa: "Tanya Lanjut di WhatsApp",
    browseFaq: "Atau layari 100+ FAQ di",
    faqPage: "halaman FAQ khusus →",
    waFaq: "🔧 Pertanyaan Pemasangan Aircond\n\nHai KL Renovator, saya ada soalan mengenai pemasangan.\n\n📍 Kawasan Saya:\n❄️ Jenis Unit:\n📏 Saiz HP:\n\nSila hantar info & harga.",
    faqs: [
      { q: "Berapa harga pemasangan aircond di KL & Selangor?", a: "Pemasangan dinding bermula dari RM 199 untuk 1.0–1.5 HP termasuk 7 kaki paip tembaga, penebat, wayar elektrik dan paip saliran standard, vakum pam, dan waranti kerja 1 bulan. Ceiling cassette dari RM 290, unit tingkap dari RM 199. Semua harga disahkan sebelum kerja bermula." },
      { q: "Berapa lama pemasangan aircond mengambil masa?", a: "Pemasangan dinding standard mengambil masa 3–5 jam untuk satu unit. Ceiling cassette mengambil 5–8 jam. Pemasangan seluruh rumah biasanya siap dalam 1–2 hari. Pemasangan hari sama tersedia untuk tempahan sebelum 11 pagi." },
      { q: "Jenama aircond apa yang dipasang oleh KL Renovator?", a: "Semua 20 jenama utama — Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Haier, Hisense, Aux, TCL, Isonic dan National. Kedua-dua model inverter dan bukan inverter." },
      { q: "Bolehkah anda pasang aircond di kondominium tinggi di KL?", a: "Ya — kami kerap memasang di kondo sekitar KLCC, Mont Kiara, Bangsar, Sentul, PJ dan Subang Jaya. Kami berurusan dengan pengurusan bangunan untuk akses lif/teluk muatan, mematuhi peraturan JMB, dan memastikan penempatan unit luar mematuhi semua peraturan." },
      { q: "Apa waranti yang diberikan KL Renovator untuk pemasangan?", a: "Waranti kerja bertulis 1 bulan untuk semua kerja pemasangan. Jika sebarang isu berkaitan pemasangan timbul (kebocoran, getaran, kerosakan elektrik, penyejukan lemah) dalam masa 30 hari, kami kembali dan baiki tanpa caj. Waranti pengeluar pada unit kekal dilindungi sepenuhnya." },
    ],
  },
  zh: {
    emergencyBadge: "当天紧急服务可用",
    emergencyTitle: "冷气坏了？我们今天上门。",
    emergencyDesc: "冷气坏了？我们当天响应。",
    emergencyBtn: "🚨 紧急服务 →",
    waNow: "📲 立即 WhatsApp",
    waUrgent: "🚨 紧急 — 需要紧急冷气服务\n\n你好 KL Renovator，我现在需要紧急冷气帮助。\n\n📍 位置：\n❄️ 问题：\n\n请尽快派技师。",
    toolsEyebrow: "免费即时工具",
    toolsTitle: "30秒内获得答案",
    toolsSub: "Get Your Answer in 30 Seconds | Dapatkan Jawapan Dalam 30 Saat",
    installCalc: "🔧 安装费用计算器",
    gasCalc: "⛽ 充气费用估算",
    sizeCalc: "📏 冷气匹数计算器",
    elecCalc: "⚡ 电费计算器",
    savingCalc: "💰 变频省电计算器",
    viewAll: "查看所有工具 →",
    popularEyebrow: "热门价格指南",
    popularTitle: "价格透明 — 无隐藏费用",
    popularSub: "Transparent Pricing — No Hidden Fees | Harga Telus Tanpa Yuran Tersembunyi",
    servicePriceTitle: "2026 冷气服务价格",
    servicePriceDesc: "完整服务价目 — 基础、化学清洗、充气、维修、安装。所有价格提前确认。",
    installGuideTitle: "安装价格指南",
    installGuideDesc: "全新冷气安装 RM 199 起。含完整材料清单、铜管、支架与保修。",
    installKLTitle: "吉隆坡 & 雪兰莪冷气安装",
    installKLDesc: "专业安装 RM 199 起。7步流程、真空泵、L型铜管、1个月保修。可当天上门。",
    washGuideTitle: "吉隆坡化学清洗指南",
    washGuideDesc: "吉隆坡洗冷气 RM 120 起。高压化学清洗，可当天预约。覆盖整个巴生谷。",
    viewPrices: "查看价格",
    viewGuide: "查看指南",
    viewInstall: "查看安装",
    cuciKL: "吉隆坡洗冷气",
    quickProblems: "冷气问题",
    quickBrands: "我们服务的品牌",
    quickAreas: "服务区域",
    quickGuides: "专家指南",
    allProblems: "所有问题 →",
    allBrands: "所有品牌 →",
    allAreas: "所有区域 →",
    allGuides: "所有指南 →",
    resourceEyebrow: "完整资源中心",
    resourceTitle: "所需一切 — 一站式",
    resourceSub: "Everything You Need — All In One Place | Semua Dalam Satu Tempat",
    problemsCluster: "冷气问题",
    problemsFix: "按问题类型维修",
    brandsCluster: "冷气品牌",
    brandsBy: "按品牌服务",
    areasCluster: "服务区域",
    areasFind: "查找您的区域",
    guidesCluster: "专家指南",
    guidesLearn: "学习与决策",
    installCluster: "安装",
    installPro: "像专业人士一样安装",
    installGuideLink: "安装指南 →",
    faqEyebrow: "有疑问？快速解答",
    faqTitle1: "冷气安装",
    faqTitle2: "常见问题一览",
    faqDesc: "对最常见问题的快速诚实回答 — 为AI概览和即时清晰度而设计。",
    askWa: "在WhatsApp上咨询更多",
    browseFaq: "或浏览我们",
    faqPage: "专用FAQ页面上的100+常见问题 →",
    waFaq: "🔧 冷气安装咨询\n\n你好 KL Renovator，我对安装有疑问。\n\n📍 我的区域：\n❄️ 机型：\n📏 匹数：\n\n请发送信息和价格。",
    faqs: [
      { q: "吉隆坡和雪兰莪冷气安装费用是多少？", a: "挂壁式安装从RM 199起（1.0–1.5 HP），包含7英尺铜管、电线、排水管、真空泵调试和1个月工艺保修。天花板卡式机RM 290起，窗式机RM 199起。所有价格在施工前确认。" },
      { q: "冷气安装需要多长时间？", a: "标准挂壁式安装单台需要3–5小时。天花板卡式机需要5–8小时。全屋多台安装通常1–2天完成。上午11点前预约可安排当天安装。" },
      { q: "KL Renovator安装哪些冷气品牌？", a: "全部20个主要品牌 — 大金、松下、三菱、约克、美的、LG、三星、Carrier、富士通、日立、夏普、Acson、格力、东芝、海尔、海信、Aux、TCL、Isonic和National。变频和非变频机型均可。" },
      { q: "能在吉隆坡高层公寓安装冷气吗？", a: "可以 — 我们经常在KLCC、Mont Kiara、Bangsar、Sentul、PJ和Subang Jaya的公寓安装。我们协调大厦管理处的电梯/卸货区通行，遵守JMB规定，确保室外机位置符合所有规范。" },
      { q: "KL Renovator提供什么安装保修？", a: "所有安装工程享有1个月书面工艺保修。如30天内出现任何安装相关问题（漏水、震动、电气故障、制冷不佳），我们免费返修。机组本身的制造商保修完全不受影响。" },
    ],
  },
} as const;

function HomeContent({ locale }: { locale: Lang }) {
  const t = COPY[locale] || COPY.en;
  const faqs = t.faqs;

  const homeServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.klrenovator.com/#homepage-service",
    name: locale === "ms" ? "Pemasangan & Servis Aircond KL & Selangor" : locale === "zh" ? "吉隆坡与雪兰莪冷气安装与服务" : "Aircond Installation & Servicing KL & Selangor",
    description: locale === "ms" ? "Pakar pemasangan aircond dari RM199 — plus servis, cuci kimia, overhaul & baiki di Kuala Lumpur & Selangor." : locale === "zh" ? "吉隆坡与雪兰莪专业冷气安装 RM199起 — 另提供清洗、化学大修、充气与维修。" : "Expert aircond installation from RM199 — plus servicing, chemical wash, overhaul & repairs across Kuala Lumpur & Selangor. Same-day, transparent pricing, 1-month workmanship warranty.",
    serviceType: "Aircon Installation & Servicing",
    category: "Air conditioning services",
    url: "https://www.klrenovator.com/",
    provider: { "@type": "HVACBusiness", "@id": "https://www.klrenovator.com/#business", name: "KL Renovator", telephone: siteConfig.phone },
    areaServed: [
      { "@type": "City", name: "Kuala Lumpur" },
      { "@type": "City", name: "Petaling Jaya" },
      { "@type": "City", name: "Shah Alam" },
      { "@type": "City", name: "Subang Jaya" },
      { "@type": "City", name: "Cheras" },
      { "@type": "City", name: "Ampang" },
      { "@type": "City", name: "Puchong" },
      { "@type": "City", name: "Klang" },
      { "@type": "State", name: "Selangor" },
    ],
    offers: { "@type": "Offer", price: 199, priceCurrency: "MYR", availability: "https://schema.org/InStock", description: "Starting from RM 199 for wall-mounted 1.0–1.5 HP installation" },
  };

  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: locale === "ms" ? "Pemasangan & Servis Aircond Kuala Lumpur & Selangor" : locale === "zh" ? "吉隆坡与雪兰莪冷气安装与服务" : "Aircond Installation & Servicing Kuala Lumpur & Selangor",
    // Compact offers: full service descriptions live on /services/[slug];
    // repeating them here cost ~5KB x2 (DOM + RSC flight) on the homepage.
    itemListElement: siteConfig.services.map((service, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        url: `https://www.klrenovator.com/services/${service.slug}`,
      },
      priceSpecification: { "@type": "PriceSpecification", price: service.startPrice, priceCurrency: "MYR" },
    })),
  };

  const prefix = locale === "ms" ? "/ms" : locale === "zh" ? "/zh" : "";

  return (
    <>
      <HomepageAeoSchemas />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeServiceSchema) }} />

      <Hero locale={locale} />
      <StatsBand locale={locale} />
      <InstallationSpotlight locale={locale} />
      {/* Reviews moved up for trust above fold – audit Part 3 CRO fix */}
      <ReviewsIsland locale={locale} />
      {/* Below-the-fold sections load as viewport-triggered islands so the
          initial HTML document stays small (was 600 KB+). All content has
          dedicated crawlable routes (/services, /areas, /review, …). */}
      <ServicesIsland locale={locale} />
      <WhyChooseUsIsland locale={locale} />
      <TrustStripIsland locale={locale} />

      <section className="bg-gradient-to-r from-red-700 to-rose-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse inline-block" />
              {t.emergencyBadge}
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight mb-1">{t.emergencyTitle}</h2>
            <p className="text-red-100 text-sm">{t.emergencyDesc}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <NextLink href="/services/emergency" className="inline-flex items-center justify-center gap-2 bg-white text-red-700 hover:bg-red-50 font-black uppercase tracking-wider px-6 py-3 rounded-xl text-xs transition-all hover:scale-105 active:scale-95 shadow-lg">{t.emergencyBtn}</NextLink>
            <a href={waLink(t.waUrgent)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-6 py-3 rounded-xl text-xs transition-all hover:scale-105 active:scale-95 shadow-lg">{t.waNow}</a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50" id="tools">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{t.toolsEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{t.toolsTitle}</h2>
            <p className="text-slate-500 text-sm mt-2">{t.toolsSub}</p>
          </div>
          {/* Interactive calculators load client-side only (see HomeToolsLazy) */}
          <HomeToolsLazy />
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-2.5">
              <NextLink href="/aircond-installation-cost-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">{t.installCalc}</NextLink>
              <NextLink href="/aircond-gas-topup-cost-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">{t.gasCalc}</NextLink>
              <NextLink href="/aircond-size-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">{t.sizeCalc}</NextLink>
              <NextLink href="/aircond-electricity-cost-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">{t.elecCalc}</NextLink>
              <NextLink href="/aircond-savings-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">{t.savingCalc}</NextLink>
              <NextLink href="/tools" className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-4 py-2 text-xs font-black hover:bg-sky-700 hover:shadow-md transition-all">{t.viewAll}</NextLink>
            </div>
          </div>
        </div>
      </section>

      <CoverageIsland locale={locale} />

      <section className="py-12 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">{t.popularEyebrow}</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.popularTitle}</h2>
            <p className="text-slate-500 text-sm mt-1">{t.popularSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <NextLink href="/aircond-service-price-malaysia" className="group rounded-2xl border border-amber-200 bg-amber-50/50 p-6 hover:border-amber-400 hover:shadow-md transition-all">
              <div className="text-2xl mb-3">💰</div>
              <h3 className="font-black text-slate-900 text-base group-hover:text-amber-700 transition-colors">{t.servicePriceTitle}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t.servicePriceDesc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-amber-600 group-hover:gap-2 transition-all">{t.viewPrices} <FiArrowRight className="h-3 w-3" /></span>
            </NextLink>
            <NextLink href="/installation-price-malaysia" className="group rounded-2xl border border-sky-200 bg-sky-50/50 p-6 hover:border-sky-400 hover:shadow-md transition-all">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-black text-slate-900 text-base group-hover:text-sky-700 transition-colors">{t.installGuideTitle}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t.installGuideDesc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600 group-hover:gap-2 transition-all">{t.viewGuide} <FiArrowRight className="h-3 w-3" /></span>
            </NextLink>
            <NextLink href="/aircond-installation-kl" className="group rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 hover:border-emerald-400 hover:shadow-md transition-all">
              <div className="text-2xl mb-3">🏗️</div>
              <h3 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition-colors">{t.installKLTitle}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t.installKLDesc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:gap-2 transition-all">{t.viewInstall} <FiArrowRight className="h-3 w-3" /></span>
            </NextLink>
            <NextLink href="/cuci-aircond-kl" className="group rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 hover:border-emerald-400 hover:shadow-md transition-all">
              <div className="text-2xl mb-3">🧹</div>
              <h3 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition-colors">{t.washGuideTitle}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{t.washGuideDesc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:gap-2 transition-all">{t.cuciKL} <FiArrowRight className="h-3 w-3" /></span>
            </NextLink>
          </div>
        </div>
      </section>

      {/* Compact crawlable link bar — the heavy quick-links + topical-hub
          grids now load as a viewport island below. */}
      <nav className="py-8 px-4 bg-slate-50 border-t border-slate-100" aria-label="Popular pages">
        <div className="mx-auto max-w-6xl flex flex-wrap justify-center gap-2 text-xs font-semibold">
          {[
            { href: "/services", label: locale === "ms" ? "Perkhidmatan" : locale === "zh" ? "服务" : "Services" },
            { href: "/installation", label: locale === "ms" ? "Pemasangan" : locale === "zh" ? "安装" : "Installation" },
            { href: "/problems", label: locale === "ms" ? "Masalah" : locale === "zh" ? "问题" : "Problems" },
            { href: "/brands", label: locale === "ms" ? "Jenama" : locale === "zh" ? "品牌" : "Brands" },
            { href: "/areas", label: locale === "ms" ? "Kawasan" : locale === "zh" ? "区域" : "Areas" },
            { href: "/blog", label: locale === "ms" ? "Panduan" : locale === "zh" ? "指南" : "Guides" },
            { href: "/tools", label: locale === "ms" ? "Alat Percuma" : locale === "zh" ? "免费工具" : "Free Tools" },
            { href: "/review", label: locale === "ms" ? "Ulasan" : locale === "zh" ? "评价" : "Reviews" },
          ].map((item) => (
            <NextLink key={item.href} href={prefix + item.href} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-600 transition-colors">{item.label}</NextLink>
          ))}
        </div>
      </nav>

      <HubIsland locale={locale} />

      <section className="py-20 sm:py-28 bg-white" id="homepage-faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-3">{t.faqEyebrow}</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{t.faqTitle1}<span className="text-sky-500">{t.faqTitle2}</span></h2>
              <p className="text-slate-500 text-sm mt-2">{t.faqDesc}</p>
            </div>
          </Reveal>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="px-6 py-6 sm:px-8">
                  <h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-8 text-center">
              <a href={waLink(t.waFaq)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> {t.askWa}</a>
              <p className="mt-3 text-xs text-slate-500">{t.browseFaq} <NextLink href="/faq" className="text-sky-600 font-bold underline hover:text-sky-800">{t.faqPage}</NextLink></p>
            </div>
          </Reveal>
        </div>
      </section>

      <InstagramFeed locale={locale} />
      <ReadyToBook locale={locale} />
    </>
  );
}

export default function Home({ locale = "en" }: { locale?: Lang }) {
  return (
    <LanguageProvider initialLang={locale}>
      <HomeContent locale={locale} />
    </LanguageProvider>
  );
}
