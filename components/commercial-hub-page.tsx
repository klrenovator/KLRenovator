import Link from "next/link";
import { FaWhatsapp, FaPhone, FaCheck } from "react-icons/fa6";
import { FiChevronRight, FiArrowRight } from "react-icons/fi";

import { sitePublic } from "@/config/site-public";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { reviewDateDisplay } from "@/config/content-review-dates";
import { PageExplainers } from "@/components/aeo-explainer-blocks";
import { JobPhotoStrip } from "@/components/job-photo-strip";
import {
  COMMERCIAL_HERO,
  COMMERCIAL_SEGMENTS,
  COMMERCIAL_PRICING,
  COMMERCIAL_PRICING_NOTE,
  COMMERCIAL_AMC,
  COMMERCIAL_FAQS,
  HUB_CITATIONS,
  type HubLocale,
} from "@/config/commercial-iaq-content";

const UI = {
  en: {
    segmentsEyebrow: "Who we service",
    segmentsHeading: "Built for how businesses actually run",
    pricingEyebrow: "Transparent per-unit pricing",
    pricingHeading: "Commercial service pricing",
    colService: "Service",
    colPrice: "From",
    colNote: "Notes",
    faqHeading: "Commercial aircond FAQs",
    ctaHeading: "Get a commercial site survey",
    ctaBody: "Free survey, transparent per-unit pricing, after-hours slots and SST-ready invoicing. Tell us your unit count and we will plan a servicing cycle or AMC.",
    ctaWa: "WhatsApp for a Site Survey",
    ctaCall: "Call +60 18-298 3573",
    sources: "Sources we reference",
    reviewed: "Last reviewed",
    relatedHeading: "Related pages",
    relatedInstall: "Commercial installation (offices, shoplots, F&B)",
    relatedAmc: "Maintenance contract (AMC) details",
    relatedWash: "Chemical wash service & pricing",
    relatedPricing: "Full pricing guide",
    waSurvey: "Commercial site survey request\n\nHi KL Renovator, I'd like a commercial aircond servicing quote.\n\nBusiness type:\nLocation:\nNumber of units:\nUnit type (wall / cassette):\n\nPlease advise a servicing cycle or AMC.",
  },
  ms: {
    segmentsEyebrow: "Siapa kami servis",
    segmentsHeading: "Dibina untuk cara perniagaan sebenar beroperasi",
    pricingEyebrow: "Harga per unit telus",
    pricingHeading: "Harga servis komersial",
    colService: "Servis",
    colPrice: "Dari",
    colNote: "Nota",
    faqHeading: "Soalan Lazim Aircond Komersial",
    ctaHeading: "Dapatkan tinjauan tapak komersial",
    ctaBody: "Tinjauan percuma, harga per unit telus, slot luar waktu dan invois sedia SST. Beritahu kami bilangan unit dan kami rancang kitaran servis atau AMC.",
    ctaWa: "WhatsApp untuk Tinjauan Tapak",
    ctaCall: "Hubungi +60 18-298 3573",
    sources: "Sumber yang kami rujuk",
    reviewed: "Semakan terakhir",
    relatedHeading: "Halaman berkaitan",
    relatedInstall: "Pemasangan komersial (pejabat, kedai, F&B)",
    relatedAmc: "Butiran kontrak penyelenggaraan (AMC)",
    relatedWash: "Servis & harga cuci kimia",
    relatedPricing: "Panduan harga penuh",
    waSurvey: "Permintaan tinjauan tapak komersial\n\nHi KL Renovator, saya nak sebut harga servis aircond komersial.\n\nJenis perniagaan:\nLokasi:\nBilangan unit:\nJenis unit (dinding / kaset):\n\nSila cadangkan kitaran servis atau AMC.",
  },
  zh: {
    segmentsEyebrow: "我们服务谁",
    segmentsHeading: "为企业真实的运营方式而设",
    pricingEyebrow: "每台价格透明",
    pricingHeading: "商用保养价格",
    colService: "服务",
    colPrice: "起价",
    colNote: "备注",
    faqHeading: "商用冷气常见问题",
    ctaHeading: "预约商用现场勘查",
    ctaBody: "免费勘查、每台价格透明、可安排非营业时间、可开具含SST发票。告诉我们机器数量，我们会规划保养周期或 AMC。",
    ctaWa: "WhatsApp 预约现场勘查",
    ctaCall: "致电 +60 18-298 3573",
    sources: "我们参考的资料来源",
    reviewed: "最近审阅",
    relatedHeading: "相关页面",
    relatedInstall: "商用安装（办公室、店屋、餐饮）",
    relatedAmc: "维护合约（AMC）详情",
    relatedWash: "化学清洗服务与价格",
    relatedPricing: "完整价格指南",
    waSurvey: "商用现场勘查申请\n\nHi KL Renovator，我想要商用冷气保养报价。\n\n业务类型：\n地点：\n机器数量：\n机型（壁挂 / 嵌入）：\n\n请建议保养周期或 AMC。",
  },
} as const;

function localizedPath(locale: HubLocale, enPath: string): string {
  const map: Record<string, { ms: string; zh: string }> = {
    "/commercial-aircond-installation": { ms: "/ms/pemasangan-aircond-komersial", zh: "/zh/commercial-aircond-installation" },
    "/services/maintenance-contract": { ms: "/ms/services/maintenance-contract", zh: "/zh/services/maintenance-contract" },
    "/cuci-aircond-kl": { ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" },
    "/pricing": { ms: "/ms/pricing", zh: "/zh/pricing" },
  };
  if (locale === "en") return enPath;
  const m = map[enPath];
  return m ? m[locale] : `/${locale}${enPath}`;
}

export function CommercialHubPage({ locale }: { locale: HubLocale }) {
  const t = UI[locale];
  const base = locale === "en" ? "" : `/${locale}`;
  const canonical = `https://www.klrenovator.com${base}/commercial-aircond-service`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.klrenovator.com${base || "/"}` },
      { "@type": "ListItem", position: 2, name: COMMERCIAL_HERO.h1[locale], item: canonical },
    ],
  };

  const faqs = COMMERCIAL_FAQS[locale];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Commercial air-conditioning servicing & maintenance",
    provider: { "@type": "HVACBusiness", "@id": "https://www.klrenovator.com/#business", name: "KL Renovator" },
    areaServed: { "@type": "AdministrativeArea", name: "Kuala Lumpur & Selangor, Malaysia" },
    audience: { "@type": "BusinessAudience", name: "Offices, shoplots, restaurants and clinics" },
    description: COMMERCIAL_HERO.intro[locale],
    url: canonical,
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    name: COMMERCIAL_HERO.h1[locale],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <nav className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-4" aria-label="Breadcrumb">
              <Link href={base || "/"} className="hover:text-sky-300">Home</Link>
              <FiChevronRight className="h-3 w-3" />
              <span className="text-slate-300">{COMMERCIAL_HERO.eyebrow[locale]}</span>
            </nav>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-3">{COMMERCIAL_HERO.eyebrow[locale]}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.08]">
              {COMMERCIAL_HERO.h1[locale]}
            </h1>
            <p className="mt-3 text-indigo-300 font-black uppercase tracking-widest text-sm">{COMMERCIAL_HERO.subtitle[locale]}</p>
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl speakable">{COMMERCIAL_HERO.intro[locale]}</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {COMMERCIAL_HERO.badges[locale].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white/90 rounded-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />{b}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
              <a href={waLink(t.waSurvey)} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-13 px-6 py-3.5 transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> {t.ctaWa}
              </a>
              <a href={`tel:${sitePublic.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black uppercase text-sm tracking-widest h-13 px-6 py-3.5 transition-all rounded-xl">
                <FaPhone className="h-4 w-4 text-sky-300" /> {t.ctaCall}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Segments */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>{t.segmentsEyebrow}</p>
            <h2 className="mt-2 speakable"><span className={title({ size: "sm" })}>{t.segmentsHeading}</span></h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {COMMERCIAL_SEGMENTS.map((seg, i) => (
              <Reveal key={seg.key} delay={i * 60}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="font-black text-lg text-slate-900">{seg.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{seg.body[locale]}</p>
                  <ul className="mt-4 space-y-2">
                    {seg.points[locale].map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                        <FaCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-1" /><span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100" id="pricing">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>{t.pricingEyebrow}</p>
            <h2 className="mt-2 speakable"><span className={title({ size: "sm" })}>{t.pricingHeading}</span></h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-xs font-black uppercase tracking-wider text-slate-600">
                    <th className="px-5 py-3">{t.colService}</th>
                    <th className="px-5 py-3">{t.colPrice}</th>
                    <th className="px-5 py-3">{t.colNote}</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMERCIAL_PRICING.map((row, i) => (
                    <tr key={i} className={i % 2 ? "bg-slate-50/40" : "bg-white"}>
                      <td className="px-5 py-3.5 font-bold text-slate-900">{row.service[locale]}</td>
                      <td className="px-5 py-3.5 font-black text-indigo-600 whitespace-nowrap">{row.price[locale]}</td>
                      <td className="px-5 py-3.5 text-slate-500">{row.note[locale]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-5 text-sm leading-relaxed text-slate-600 max-w-3xl">{COMMERCIAL_PRICING_NOTE[locale]}</p>
        </div>
      </section>

      {/* AMC */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100" id="amc">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 speakable">{COMMERCIAL_AMC.heading[locale]}</h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 max-w-3xl speakable">{COMMERCIAL_AMC.intro[locale]}</p>
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {COMMERCIAL_AMC.points[locale].map((p, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="flex items-start gap-2.5 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 text-sm text-slate-700">
                  <FaCheck className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" /><span>{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <JobPhotoStrip
        locale={locale}
        variant="brand"
        place={locale === "ms" ? "aircond komersial" : locale === "zh" ? "商用冷气" : "commercial aircond"}
        hints={["ceiling-cassette", "commercial"]}
        seed="commercial-hub"
      />

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 mb-6 speakable">{t.faqHeading}</h2>
          </Reveal>
          <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden bg-white">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                  {f.q}
                  <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-indigo-500 shrink-0" />
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
                <a href={c.href} target="_blank" rel="nofollow noopener noreferrer" className="text-indigo-700 font-semibold hover:underline">{c.label}</a>
                <span className="text-slate-500"> — {c[locale]}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">{t.relatedHeading}</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: localizedPath(locale, "/commercial-aircond-installation"), label: t.relatedInstall },
              { href: localizedPath(locale, "/services/maintenance-contract"), label: t.relatedAmc },
              { href: localizedPath(locale, "/cuci-aircond-kl"), label: t.relatedWash },
              { href: localizedPath(locale, "/pricing"), label: t.relatedPricing },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition rounded-xl">
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
              <a href={waLink(t.waSurvey)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> {t.ctaWa}
              </a>
              <a href={`tel:${sitePublic.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaPhone className="h-4 w-4" /> {t.ctaCall}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <PageExplainers locale={locale} presetId="service:commercial" />
    </>
  );
}
