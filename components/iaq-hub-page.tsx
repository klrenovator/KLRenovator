import Link from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FiChevronRight, FiArrowRight } from "react-icons/fi";

import { sitePublic } from "@/config/site-public";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { reviewDateDisplay } from "@/config/content-review-dates";
import { PageExplainers } from "@/components/aeo-explainer-blocks";
import { JobPhotoStrip } from "@/components/job-photo-strip";
import {
  IAQ_HERO,
  IAQ_FACTORS,
  IAQ_CLEAN_CADENCE,
  IAQ_FAQS,
  HUB_CITATIONS,
  type HubLocale,
} from "@/config/commercial-iaq-content";

const UI = {
  en: {
    factorsEyebrow: "What's really going on inside the unit",
    factorsHeading: "Four things a neglected aircond does to your air",
    cadenceEyebrow: "Cleaning cadence",
    disclaimer: "This page describes what a dirty aircond physically holds and what cleaning removes. It is not medical advice and makes no health-cure claim. If you have a health concern, please speak to a doctor.",
    faqHeading: "Indoor air quality & chemical wash FAQs",
    ctaHeading: "Book a chemical wash",
    ctaBody: "Clear the mould, biofilm and dust off the coil and blower, and flush the drain. Chemical wash from RM 120 per wall unit — WhatsApp us your unit type and area.",
    ctaWa: "WhatsApp to Book a Chemical Wash",
    ctaCall: "Call +60 18-298 3573",
    sources: "Sources we reference",
    reviewed: "Last reviewed",
    relatedHeading: "Related pages",
    relatedWash: "Chemical wash service & pricing",
    relatedOverhaul: "Chemical overhaul (deep clean)",
    relatedSmell: "Aircond bad smell — causes & fix",
    relatedCuci: "Cuci aircond KL guide",
    colFactor: "Task",
    colWhen: "How often",
    waBook: "Chemical wash booking\n\nHi KL Renovator, I'd like to book an aircond chemical wash.\n\nUnit type (wall / cassette):\nNumber of units:\nArea:\n\nThere's a musty smell / it hasn't been cleaned in a while.",
  },
  ms: {
    factorsEyebrow: "Apa sebenarnya berlaku di dalam unit",
    factorsHeading: "Empat perkara aircond terbiar lakukan pada udara anda",
    cadenceEyebrow: "Kekerapan pembersihan",
    disclaimer: "Halaman ini menerangkan apa yang aircond kotor simpan secara fizikal dan apa yang pembersihan buang. Ia bukan nasihat perubatan dan tidak membuat dakwaan penyembuhan kesihatan. Jika anda ada kebimbangan kesihatan, sila rujuk doktor.",
    faqHeading: "Soalan Lazim Kualiti Udara Dalaman & Cuci Kimia",
    ctaHeading: "Tempah cuci kimia",
    ctaBody: "Buang kulat, biofilem dan habuk dari gegelung dan blower, serta bersihkan longkang. Cuci kimia dari RM 120 setiap unit dinding — WhatsApp kami jenis unit dan kawasan anda.",
    ctaWa: "WhatsApp untuk Tempah Cuci Kimia",
    ctaCall: "Hubungi +60 18-298 3573",
    sources: "Sumber yang kami rujuk",
    reviewed: "Semakan terakhir",
    relatedHeading: "Halaman berkaitan",
    relatedWash: "Servis & harga cuci kimia",
    relatedOverhaul: "Overhaul kimia (cuci mendalam)",
    relatedSmell: "Aircond bau busuk — punca & baiki",
    relatedCuci: "Panduan cuci aircond KL",
    colFactor: "Tugas",
    colWhen: "Kekerapan",
    waBook: "Tempahan cuci kimia\n\nHi KL Renovator, saya nak tempah cuci kimia aircond.\n\nJenis unit (dinding / kaset):\nBilangan unit:\nKawasan:\n\nAda bau hapak / lama tak dicuci.",
  },
  zh: {
    factorsEyebrow: "机器内部到底发生了什么",
    factorsHeading: "疏于保养的冷气对空气做的四件事",
    cadenceEyebrow: "清洁周期",
    disclaimer: "本页描述脏冷气内部实际存留了什么、清洗清除了什么。它不是医疗建议，也不作任何治病宣称。若有健康顾虑，请咨询医生。",
    faqHeading: "室内空气质量与化学清洗常见问题",
    ctaHeading: "预约化学清洗",
    ctaBody: "清除盘管与风轮上的霉菌、生物膜与灰尘，并冲洗排水管。化学清洗壁挂机每台 RM 120 起——请 WhatsApp 告知机型与地区。",
    ctaWa: "WhatsApp 预约化学清洗",
    ctaCall: "致电 +60 18-298 3573",
    sources: "我们参考的资料来源",
    reviewed: "最近审阅",
    relatedHeading: "相关页面",
    relatedWash: "化学清洗服务与价格",
    relatedOverhaul: "化学大修（深度清洁）",
    relatedSmell: "冷气异味——原因与解决",
    relatedCuci: "吉隆坡洗冷气指南",
    colFactor: "项目",
    colWhen: "频率",
    waBook: "化学清洗预约\n\nHi KL Renovator，我想预约冷气化学清洗。\n\n机型（壁挂 / 嵌入）：\n机器数量：\n地区：\n\n有霉味 / 很久没洗了。",
  },
} as const;

function localizedPath(locale: HubLocale, enPath: string): string {
  const map: Record<string, { ms: string; zh: string }> = {
    "/cuci-aircond-kl": { ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" },
    "/services/chemical-wash": { ms: "/ms/services/chemical-wash", zh: "/zh/services/chemical-wash" },
    "/services/chemical-overhaul": { ms: "/ms/services/chemical-overhaul", zh: "/zh/services/chemical-overhaul" },
    "/problems/aircond-bad-smell": { ms: "/ms/problems/aircond-bad-smell", zh: "/zh/problems/aircond-bad-smell" },
  };
  if (locale === "en") return enPath;
  const m = map[enPath];
  return m ? m[locale] : `/${locale}${enPath}`;
}

export function IaqHubPage({ locale }: { locale: HubLocale }) {
  const t = UI[locale];
  const base = locale === "en" ? "" : `/${locale}`;
  const canonical = `https://www.klrenovator.com${base}/indoor-air-quality-aircond`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.klrenovator.com${base || "/"}` },
      { "@type": "ListItem", position: 2, name: IAQ_HERO.h1[locale], item: canonical },
    ],
  };

  const faqs = IAQ_FAQS[locale];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    name: IAQ_HERO.h1[locale],
    url: canonical,
    inLanguage: locale === "en" ? "en-MY" : locale === "ms" ? "ms-MY" : "zh-MY",
    dateModified: "2026-08-21",
    isPartOf: { "@id": "https://www.klrenovator.com/#website" },
    about: { "@id": "https://www.klrenovator.com/#business" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".speakable"] },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <nav className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-4" aria-label="Breadcrumb">
              <Link href={base || "/"} className="hover:text-sky-300">Home</Link>
              <FiChevronRight className="h-3 w-3" />
              <span className="text-slate-300">{IAQ_HERO.eyebrow[locale]}</span>
            </nav>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-3">{IAQ_HERO.eyebrow[locale]}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.08]">
              {IAQ_HERO.h1[locale]}
            </h1>
            <p className="mt-3 text-sky-300 font-black uppercase tracking-widest text-sm">{IAQ_HERO.subtitle[locale]}</p>
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl speakable">{IAQ_HERO.intro[locale]}</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {IAQ_HERO.badges[locale].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white/90 rounded-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />{b}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
              <a href={waLink(t.waBook)} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest px-6 py-3.5 transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> {t.ctaWa}
              </a>
              <a href={`tel:${sitePublic.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black uppercase text-sm tracking-widest px-6 py-3.5 transition-all rounded-xl">
                <FaPhone className="h-4 w-4 text-sky-300" /> {t.ctaCall}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-amber-50 border-b border-amber-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm leading-relaxed text-amber-800">{t.disclaimer}</p>
        </div>
      </section>

      {/* Factors */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>{t.factorsEyebrow}</p>
            <h2 className="mt-2 speakable"><span className={title({ size: "sm" })}>{t.factorsHeading}</span></h2>
          </Reveal>
          <div className="mt-8 space-y-5">
            {IAQ_FACTORS.map((f, i) => (
              <Reveal key={f.key} delay={i * 50}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="font-black text-lg text-slate-900">{f.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body[locale]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cadence table */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>{t.cadenceEyebrow}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-950 speakable">{IAQ_CLEAN_CADENCE.heading[locale]}</h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 max-w-3xl speakable">{IAQ_CLEAN_CADENCE.intro[locale]}</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-xs font-black uppercase tracking-wider text-slate-600">
                    <th className="px-5 py-3">{t.colFactor}</th>
                    <th className="px-5 py-3">{t.colWhen}</th>
                  </tr>
                </thead>
                <tbody>
                  {IAQ_CLEAN_CADENCE.rows.map((row, i) => (
                    <tr key={i} className={i % 2 ? "bg-slate-50/40" : "bg-white"}>
                      <td className="px-5 py-3.5 font-bold text-slate-900">{row.label[locale]}</td>
                      <td className="px-5 py-3.5 text-slate-600">{row.value[locale]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <JobPhotoStrip
        locale={locale}
        variant="place"
        place={locale === "ms" ? "cuci kimia aircond" : locale === "zh" ? "冷气化学清洗" : "aircond chemical wash"}
        hints={["chemical-wash", "chemical-overhaul"]}
        seed="iaq-hub"
      />

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 mb-6 speakable">{t.faqHeading}</h2>
          </Reveal>
          <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden bg-white">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                  {f.q}
                  <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                </summary>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sources + related */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">{t.sources}</p>
          <ul className="space-y-2 mb-6">
            {HUB_CITATIONS.map((c) => (
              <li key={c.href} className="text-sm leading-relaxed text-slate-600">
                <a href={c.href} target="_blank" rel="nofollow noopener noreferrer" className="text-sky-700 font-semibold hover:underline">{c.label}</a>
                <span className="text-slate-500"> — {c[locale]}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">{t.relatedHeading}</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: localizedPath(locale, "/cuci-aircond-kl"), label: t.relatedCuci },
              { href: localizedPath(locale, "/services/chemical-wash"), label: t.relatedWash },
              { href: localizedPath(locale, "/services/chemical-overhaul"), label: t.relatedOverhaul },
              { href: localizedPath(locale, "/problems/aircond-bad-smell"), label: t.relatedSmell },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 transition rounded-xl">
                {l.label} <FiArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
          <p className="mt-5 text-xs text-slate-400">{t.reviewed}: {reviewDateDisplay("commercialIaq", locale)}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">{t.ctaHeading}</h2>
            <p className="text-slate-300 mb-7 max-w-xl mx-auto leading-relaxed">{t.ctaBody}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={waLink(t.waBook)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> {t.ctaWa}
              </a>
              <a href={`tel:${sitePublic.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaPhone className="h-4 w-4" /> {t.ctaCall}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <PageExplainers locale={locale} presetId="service:iaq" />
    </>
  );
}
