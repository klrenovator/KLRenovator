import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FiCheck, FiClock, FiAlertTriangle, FiZap } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

// ── Emergency-specific WhatsApp message ──────────────────────────────────────
const emergencyMsg = [
  "🚨 URGENT — Emergency Aircond Service Needed",
  "",
  "Hi KL Renovator, I need EMERGENCY aircond help right now.",
  "",
  "📍 Location:",
  "❄️ Problem:",
  "🔢 Number of units affected:",
  "",
  "Please send a technician ASAP. Thank you!",
].join("\n");

const emergencyWaLink = waLink(emergencyMsg);

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Emergency Aircond Repair KL & Selangor — Same-Day Urgent Service | KL Renovator",
  description:
    "Emergency aircond repair in KL & Selangor. Same-day urgent response for aircond not working, water leaking, or complete breakdown. All brands. Call +60182983573 now.",
  keywords: [
    "emergency aircond repair KL",
    "urgent aircond service Selangor",
    "emergency aircond repair near me",
    "same day aircond repair KL",
    "aircond breakdown repair KL",
    "urgent aircond technician Kuala Lumpur",
    "emergency aircond service Klang Valley",
    "kecemasan servis aircond KL",
    "緊急冷氣維修吉隆坡",
    "aircond not working emergency KL",
  ].join(", "),
  openGraph: {
    title: "Emergency Aircond Repair KL & Selangor | KL Renovator",
    description:
      "Urgent aircond breakdown? KL Renovator dispatches same-day. All brands. Call +60182983573.",
    url: "https://www.klrenovator.com/services/emergency",
    type: "website",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.jpg",
        width: 1200,
        height: 630,
        alt: "Emergency Aircond Repair KL Renovator Same-Day Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Aircond Repair KL & Selangor | KL Renovator",
    description: "Urgent aircond breakdown? Same-day dispatch. Call +60182983573.",
    images: ["https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.jpg"],
  },
  alternates: {
    canonical: "https://www.klrenovator.com/services/emergency",
  },
};

// ── Schema ────────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.klrenovator.com/services" },
    { "@type": "ListItem", position: 3, name: "Emergency Aircond Repair", item: "https://www.klrenovator.com/services/emergency" },
  ],
};

const emergencyServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Emergency Aircond Repair KL & Selangor",
  description:
    "Same-day emergency aircond repair and troubleshooting service in Kuala Lumpur and Selangor. KL Renovator responds to urgent aircond breakdowns across the Klang Valley.",
  url: "https://www.klrenovator.com/services/emergency",
  provider: {
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: "KL Renovator",
    telephone: siteConfig.phone,
  },
  areaServed: [
    { "@type": "City", name: "Kuala Lumpur" },
    { "@type": "State", name: "Selangor" },
  ],
  offers: {
    "@type": "Offer",
    price: 88,
    priceCurrency: "MYR",
    description: "Diagnostic from RM 88 (waived if repair done same visit)",
    availability: "https://schema.org/InStock",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://wa.me/60182983573",
    servicePhone: siteConfig.phone,
    availableLanguage: ["English", "Malay", "Chinese"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does KL Renovator offer emergency same-day aircond repair in KL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — KL Renovator provides same-day emergency aircond repair across all areas of Kuala Lumpur and Selangor. WhatsApp +60182983573 for fastest response. Most emergency jobs are dispatched within 30–60 minutes of confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "How much does emergency aircond repair cost in KL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diagnostic fee is RM 88 (waived if repair is done on the same visit). Standard hours 9am–6pm apply normal pricing. Jobs between 6pm–10pm carry an overtime surcharge of RM 50. All prices confirmed before work begins.",
      },
    },
    {
      "@type": "Question",
      name: "My aircond suddenly stopped working — what should I do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "First check: Is the MCB tripped? Is the remote battery dead? If neither, WhatsApp KL Renovator at +60182983573 immediately. Common emergency causes are failed capacitor, compressor trip, PCB fault, or gas leak — all diagnosed same-day.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as an aircond emergency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Complete breakdown (unit not turning on), water leaking heavily on furniture or electrical points, sparks or burning smell from unit, outdoor unit not running, or any situation affecting a server room, medical space, or elderly/infant home.",
      },
    },
    {
      "@type": "Question",
      name: "Does KL Renovator cover emergency aircond in Selangor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — KL Renovator covers all of Selangor for emergency aircond service including Petaling Jaya, Subang Jaya, Shah Alam, Klang, Kajang, Puchong, Ampang, Damansara, Batu Caves, Selayang and all surrounding areas.",
      },
    },
    {
      "@type": "Question",
      name: "Aircond saya rosak tiba-tiba — boleh datang hari ini?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya — KL Renovator menyediakan servis kecemasan hari sama merentasi KL dan Selangor. WhatsApp +60182983573 sekarang. Kebanyakan kerja kecemasan dihantar dalam 30–60 minit selepas pengesahan.",
      },
    },
    {
      "@type": "Question",
      name: "冷气突然坏了——今天能来修吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可以——KL Renovator在吉隆坡和雪兰莪提供当天紧急冷气维修服务。立即WhatsApp +60182983573。大多数紧急工作在确认后30-60分钟内派遣技术员。",
      },
    },
  ],
};

// ── Emergency situations ──────────────────────────────────────────────────────
const emergencySituations = [
  { icon: "❄️", en: "Aircond completely not working", ms: "Aircond langsung tidak berfungsi", zh: "冷气完全不运转" },
  { icon: "💧", en: "Heavy water leaking on furniture or electrics", ms: "Air bocor teruk ke perabot atau elektrik", zh: "大量漏水至家具或电器" },
  { icon: "⚡", en: "Sparks or burning smell from unit", ms: "Percikan api atau bau terbakar dari unit", zh: "机器产生火花或烧焦气味" },
  { icon: "🔴", en: "Outdoor unit suddenly stopped running", ms: "Unit luar tiba-tiba berhenti berjalan", zh: "室外机突然停止运转" },
  { icon: "🏥", en: "Server room / medical space / infant room affected", ms: "Bilik server / perubatan / bayi terjejas", zh: "服务器室/医疗空间/婴儿房受影响" },
  { icon: "🏢", en: "Commercial premise or office with no cooling", ms: "Premis komersial atau pejabat tanpa penyejukan", zh: "商业场所或办公室无法制冷" },
];

// ── Response steps ────────────────────────────────────────────────────────────
const responseSteps = [
  {
    step: "1",
    color: "bg-red-500",
    en: { title: "WhatsApp or Call Now", desc: "Send your location, unit count, and problem description to +60182983573. Response within minutes." },
    ms: { title: "WhatsApp atau Hubungi Sekarang", desc: "Hantar lokasi, bilangan unit dan huraian masalah ke +60182983573. Respons dalam beberapa minit." },
    zh: { title: "立即WhatsApp或致电", desc: "发送您的位置、机器数量和问题描述至 +60182983573。几分钟内回复。" },
  },
  {
    step: "2",
    color: "bg-amber-500",
    en: { title: "Confirmed Quote", desc: "We confirm the diagnostic fee and estimated repair cost before dispatch. No surprises." },
    ms: { title: "Sebut Harga Disahkan", desc: "Kami sahkan caj diagnostik dan anggaran kos pembaikan sebelum menghantar. Tiada kejutan." },
    zh: { title: "确认报价", desc: "我们在派遣前确认诊断费和预估维修费用。无隐藏收费。" },
  },
  {
    step: "3",
    color: "bg-emerald-500",
    en: { title: "Technician Dispatched", desc: "Our nearest trained technician is dispatched to your location. Most jobs arrived within 30–60 min." },
    ms: { title: "Juruteknik Dihantar", desc: "Juruteknik terlatih terdekat kami dihantar ke lokasi anda. Kebanyakan kerja tiba dalam 30–60 min." },
    zh: { title: "派遣技术员", desc: "我们最近的训练有素的技术员被派往您的位置。大多数工作30-60分钟内到达。" },
  },
  {
    step: "4",
    color: "bg-sky-500",
    en: { title: "Diagnose & Fix", desc: "Full on-site diagnosis. Repair done same visit where possible. Parts quoted before installation." },
    ms: { title: "Diagnos & Baiki", desc: "Diagnostik penuh di tapak. Pembaikan dilakukan dalam lawatan yang sama jika boleh. Bahagian dikuotakan sebelum pemasangan." },
    zh: { title: "诊断和修复", desc: "现场全面诊断。尽可能在同一次上门完成维修。零件在安装前报价。" },
  },
];

// ── Common emergency problems ─────────────────────────────────────────────────
const emergencyProblems = [
  { slug: "aircond-not-turning-on", en: "Aircond not turning on", ms: "Aircond tidak hidup", zh: "冷气无法开机" },
  { slug: "aircond-compressor-problem", en: "Compressor not working", ms: "Kompressor tidak berfungsi", zh: "压缩机故障" },
  { slug: "aircond-tripping-power", en: "Tripping MCB / power", ms: "Terjatuh MCB / pawa", zh: "跳闸断电" },
  { slug: "aircond-water-leaking", en: "Heavy water leaking", ms: "Bocor air teruk", zh: "严重漏水" },
  { slug: "aircond-pcb-problem", en: "PCB board fault", ms: "Kerosakan papan PCB", zh: "PCB电路板故障" },
  { slug: "aircond-outdoor-unit-not-running", en: "Outdoor unit dead", ms: "Unit luar mati", zh: "室外机停转" },
];

export default function EmergencyPage() {
  return (
    <>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(emergencyServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HERO — RED URGENCY BANNER ─────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-rose-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest mb-6">
            <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
            Same-Day Emergency Response Available
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
            Emergency Aircond Repair<br />
            <span className="text-red-200">KL & Selangor</span>
          </h1>

          {/* BM / ZH sub-headings for multilingual SEO */}
          <p className="text-base sm:text-lg text-red-100 font-semibold mb-1">
            Kecemasan Pembaikan Aircond KL & Selangor
          </p>
          <p className="text-base sm:text-lg text-red-100 font-semibold mb-6">
            紧急冷气维修 吉隆坡及雪兰莪
          </p>

          <p className="text-lg sm:text-xl text-red-50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Aircond breakdown? Water leaking? Unit not turning on? KL Renovator dispatches trained technicians <strong>same-day</strong> across all of Kuala Lumpur and Selangor. Diagnostic from <strong>RM 88</strong>.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={emergencyWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl shadow-green-900/30 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
            >
              <FaWhatsapp className="h-5 w-5 shrink-0" />
              🚨 WhatsApp Emergency Now
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-3 bg-white text-red-700 hover:bg-red-50 font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
            >
              <FaPhone className="h-4 w-4 shrink-0" />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>

          {/* Trust pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-bold text-red-100">
            {["⚡ Response in 30–60 min", "✅ All brands serviced", "🔍 Transparent diagnosis", "💳 Quote before work"].map((t) => (
              <span key={t} className="bg-white/15 border border-white/20 rounded-full px-3.5 py-1.5">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ───────────────────────────────────────────────────────── */}
      <nav className="bg-slate-50 border-b border-slate-100 py-3 px-4 text-xs text-slate-500 font-medium">
        <div className="max-w-5xl mx-auto flex items-center gap-1.5 flex-wrap">
          <NextLink href="/" className="hover:text-sky-600 transition-colors">Home</NextLink>
          <span>/</span>
          <NextLink href="/services" className="hover:text-sky-600 transition-colors">Services</NextLink>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Emergency Aircond Repair</span>
        </div>
      </nav>

      {/* ── WHEN TO CALL ─────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-2 flex items-center justify-center gap-2">
              <FiAlertTriangle className="h-3.5 w-3.5" /> Emergency Situations
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              When to Call for Emergency Service
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Bila Perlu Hubungi untuk Servis Kecemasan &nbsp;|&nbsp; 何时需要紧急服务
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencySituations.map((s, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-4">
                <span className="text-2xl shrink-0 mt-0.5">{s.icon}</span>
                <div>
                  <p className="font-black text-slate-900 text-sm leading-snug">{s.en}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.ms}</p>
                  <p className="text-xs text-slate-500">{s.zh}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky mobile emergency CTA */}
          <div className="mt-8 text-center">
            <a
              href={emergencyWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <FaWhatsapp className="h-5 w-5 shrink-0" />
              Send Emergency WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2 flex items-center justify-center gap-2">
              <FiZap className="h-3.5 w-3.5" /> Our Emergency Response
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              From Your Call to Fixed — 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {responseSteps.map((s) => (
              <div key={s.step} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <div className={`inline-flex h-9 w-9 rounded-xl items-center justify-center text-white font-black text-sm ${s.color} mb-4`}>
                  {s.step}
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{s.en.title}</h3>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{s.en.desc}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.ms.title} — {s.zh.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Emergency Pricing</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Transparent Emergency Rates</h2>
            <p className="text-slate-500 text-sm mt-2">Harga Kecemasan &nbsp;|&nbsp; 紧急服务价格</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">Standard Hours (9am – 6pm)</p>
            </div>
            {[
              { label: "Diagnostic Fee", price: "RM 88", note: "Waived if repair done same visit" },
              { label: "Capacitor Replacement (common emergency)", price: "RM 180", note: "" },
              { label: "Fan Motor Replacement", price: "RM 250–450", note: "" },
              { label: "PCB Board Replacement", price: "RM 300–600", note: "" },
              { label: "Compressor Replacement", price: "RM 600–2,000", note: "Quote before work" },
              { label: "Drain Pipe Emergency Clear", price: "RM 120", note: "" },
            ].map((row, i) => (
              <div key={i} className={`flex items-start justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} border-b border-slate-100 last:border-0`}>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{row.label}</p>
                  {row.note && <p className="text-xs text-slate-400 mt-0.5">{row.note}</p>}
                </div>
                <p className="font-black text-sky-700 text-sm shrink-0 ml-4">{row.price}</p>
              </div>
            ))}
            <div className="bg-amber-50 border-t border-amber-100 px-6 py-4">
              <div className="flex items-start gap-2">
                <FiClock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-black text-amber-800">After-Hours Surcharge (6pm – 10pm)</p>
                  <p className="text-xs text-amber-700 mt-0.5">RM 50 overtime surcharge applies for jobs confirmed after 6:00 PM. Diagnostic becomes RM 138 (waived if repair done same visit).</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center mt-4">All prices confirmed before work begins. No surprise charges.</p>
        </div>
      </section>

      {/* ── COMMON EMERGENCY PROBLEMS ────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-2">Common Emergencies</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Aircond Problems We Fix Same-Day</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyProblems.map((p) => (
              <NextLink
                key={p.slug}
                href={`/problems/${p.slug}`}
                className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-red-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-slate-900 text-sm group-hover:text-red-600 transition-colors">{p.en}</h3>
                  <span className="text-slate-300 group-hover:text-red-400 transition-colors text-lg">›</span>
                </div>
                <p className="text-xs text-slate-400">{p.ms}</p>
                <p className="text-xs text-slate-400">{p.zh}</p>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Emergency Service Questions</h2>
            <p className="text-slate-500 text-sm mt-2">Soalan Lazim &nbsp;|&nbsp; 常见问题</p>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="font-black text-slate-900 text-sm mb-2">{faq.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COVERAGE AREAS ───────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Emergency Coverage</p>
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Same-Day Emergency Service Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {siteConfig.areaPages.slice(0, 20).map((area) => (
              <NextLink
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="bg-white border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-700 hover:text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
              >
                {area.name}
              </NextLink>
            ))}
            <NextLink
              href="/areas"
              className="bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full hover:bg-red-700 transition-all"
            >
              + All Areas →
            </NextLink>
          </div>
        </div>
      </section>

      {/* ── FINAL CONVERSION CTA ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-700 to-rose-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest mb-6">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse inline-block" />
            Available Now — Mon to Sun, 9am–6pm
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            Aircond Breakdown? Don&apos;t Wait.
          </h2>
          <p className="text-red-100 mb-2 text-sm">Aircond rosak? Jangan tunggu. &nbsp;|&nbsp; 冷气坏了？不要等。</p>
          <p className="text-red-100 mb-8 text-sm max-w-md mx-auto">
            WhatsApp us now with your location and problem. We&apos;ll respond in minutes and dispatch the nearest technician immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={emergencyWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <FaWhatsapp className="h-5 w-5 shrink-0" />
              WhatsApp Emergency Service
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-3 bg-white text-red-700 hover:bg-red-50 font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <FaPhone className="h-4 w-4 shrink-0" />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-red-200">
            {[
              "✓ Diagnostic RM 88 (waived with repair)",
              "✓ All brands serviced",
              "✓ Same-day dispatch",
              "✓ Price confirmed before work",
            ].map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Related Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.services.filter(s => s.slug !== "emergency").map((s) => (
              <NextLink
                key={s.slug}
                href={`/services/${s.slug}`}
                className="bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
              >
                {s.title} — from RM {s.startPrice}
              </NextLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
