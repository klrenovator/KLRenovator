import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services-data";
import { allPosts } from "@/config/blog-posts";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { ContactForm } from "@/components/contact-form";
import { ServiceIcon } from "@/components/service-icon";
import { title, subtitle, eyebrow } from "@/components/primitives";

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = servicesData[slug];
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!data || !service) return { title: "Service not found" };

  return {
    title: `${data.title} KL & Selangor | KL Renovator — From RM ${service.startPrice}`,
    description: data.tagline,
    keywords: [
      data.title,
      `${data.title} Kuala Lumpur`,
      `${data.title} Selangor`,
      `${data.title} KL`,
      `servis ${data.title} KL`,
      `${data.title} 吉隆坡`,
      "aircond service Malaysia",
      "KL Renovator",
    ].join(", "),
    openGraph: {
      title: `${data.title} | KL Renovator`,
      description: data.tagline,
      url: `https://www.klrenovator.com/services/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.klrenovator.com/services/${slug}`,
    },
  };
}

// ─── Multi-color palettes ─────────────────────────────────────────────────────
const stepColors = [
  "bg-sky-500", "bg-emerald-500", "bg-violet-500",
  "bg-amber-500", "bg-rose-500", "bg-teal-500",
];
const highlightColors = [
  "bg-sky-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500",
  "bg-rose-500", "bg-teal-500", "bg-indigo-500", "bg-orange-500",
];

// ─── Trilingual static UI labels ─────────────────────────────────────────────
const SECTION_LABELS = {
  servingAll: {
    en: "Serving All of Kuala Lumpur & Selangor",
    ms: "Meliputi Seluruh Kuala Lumpur & Selangor",
    zh: "覆盖吉隆坡及雪兰莪全区",
  },
  overview: { en: "Overview", ms: "Gambaran Keseluruhan", zh: "概述" },
  whatsIncluded: { en: "What's included", ms: "Apa yang disertakan", zh: "包含内容" },
  everythingYouGet: {
    en: "Everything you get with us.",
    ms: "Semua yang anda dapat bersama kami.",
    zh: "您将获得的一切。",
  },
  pricing: { en: "Pricing", ms: "Harga", zh: "收费" },
  transparentPricing: {
    en: "Transparent pricing.",
    ms: "Harga yang telus.",
    zh: "透明收费。",
  },
  pricingNote: {
    en: "Starting prices. Material costs (gas, copper, trunking) quoted separately.",
    ms: "Harga permulaan. Kos bahan (gas, kuprum, trunking) dikira berasingan.",
    zh: "起步价格。材料费用（气体、铜管等）另行报价。",
  },
  process: { en: "Process", ms: "Proses", zh: "工作流程" },
  howItWorks: { en: "How it works.", ms: "Bagaimana ia berfungsi.", zh: "工作方式。" },
  faq: { en: "FAQ", ms: "Soalan Lazim", zh: "常见问答" },
  commonQuestions: {
    en: "Common questions.",
    ms: "Soalan-soalan biasa.",
    zh: "常见问题。",
  },
  availableAreas: {
    en: "— Available in These Areas",
    ms: "— Tersedia di Kawasan Ini",
    zh: "— 覆盖地区",
  },
  allBrandsServed: {
    en: "— All Brands We Service",
    ms: "— Semua Jenama yang Kami Servis",
    zh: "— 我们服务的所有品牌",
  },
  problemsFixed: {
    en: "Common Problems This Service Fixes",
    ms: "Masalah Biasa yang Diselesaikan Perkhidmatan Ini",
    zh: "此服务解决的常见问题",
  },
  bookIt: { en: "Book it", ms: "Tempah", zh: "立即预约" },
  bookYour: { en: "Book your", ms: "Tempah perkhidmatan", zh: "预约您的" },
  sendMessage: {
    en: "Send us a message now — we'll reply with availability and a firm quote within 30 minutes.",
    ms: "Hantar mesej kepada kami sekarang — kami akan membalas dengan ketersediaan dan sebut harga tepat dalam 30 minit.",
    zh: "立即发送消息——我们将在30分钟内回复可用时间和确定报价。",
  },
  otherServices: {
    en: "Other Services",
    ms: "Perkhidmatan Lain",
    zh: "其他服务",
  },
};

// ── Service → Blog relevance map ─────────────────────────────────────────────
const SERVICE_BLOG_MAP: Record<string, string[]> = {
  "chemical-wash": ["aircon-chemical-wash-price-malaysia-2026", "chemical-wash-vs-chemical-overhaul", "signs-your-aircon-needs-chemical-overhaul-malaysia", "how-often-service-aircond-malaysia"],
  "chemical-overhaul": ["chemical-wash-vs-chemical-overhaul", "signs-your-aircon-needs-chemical-overhaul-malaysia", "aircond-water-leaking-causes", "how-often-service-aircond-malaysia"],
  "gas-topup": ["r32-r410a-r22-gas-difference", "aircond-not-cold-reasons", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "repair": ["aircond-not-cold-reasons", "aircond-water-leaking-causes", "aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "installation": ["aircond-installation-guide-malaysia", "best-aircond-brands-malaysia-2025", "inverter-vs-non-inverter-aircond-malaysia", "daikin-vs-panasonic-aircond-malaysia"],
  "basic-servicing": ["how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia", "how-to-reduce-aircond-electricity-bill-malaysia", "aircond-service-price-guide-kl-2026"],
  "ceiling-cassette": ["commercial-hvac-maintenance-kl", "aircond-service-price-guide-kl-2026"],
  "dismantling-relocation": ["aircond-installation-guide-malaysia", "aircond-lifespan-malaysia"],
};

function t(key: keyof typeof SECTION_LABELS, lang: "en" | "ms" | "zh") {
  return SECTION_LABELS[key][lang];
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = servicesData[slug];
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!data) notFound();

  const iconName = siteConfig.services.find((s) => s.slug === slug)?.icon ?? "sparkles";

  // ── Schema — fixed: HVACBusiness (not HomeAndConstructionBusiness) ──────────
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.tagline,
    url: `https://www.klrenovator.com/services/${slug}`,
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
        description: `Starting from RM ${service?.startPrice ?? 88}`,
      },
      availability: "https://schema.org/InStock",
      areaServed: "Kuala Lumpur and Selangor, Malaysia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${data.title} Pricing`,
      itemListElement: data.priceTable.map(
        (row: { label: string; price: string }, i: number) => ({
          "@type": "Offer",
          position: i + 1,
          name: row.label,
          description: row.price,
        }),
      ),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.klrenovator.com/services" },
      { "@type": "ListItem", position: 3, name: data.title, item: `https://www.klrenovator.com/services/${slug}` },
    ],
  };

  // ── HowTo Schema ─────────────────────────────────────────────────────────
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Book ${data.title} in KL & Selangor`,
    description: `Step-by-step process for ${data.title} by KL Renovator in Kuala Lumpur and Selangor`,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "MYR",
      value: service?.startPrice ?? "99",
    },
    step: data.process.map((step: { step: string; desc: string }, i: number) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.step,
      text: step.desc,
    })),
  };

  const faqSchema =
    data.faqs && data.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faqs.map((f: { q: string; a: string }) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  // ── Trilingual content ────────────────────────────────────────────────────
  // Service pages show all 3 languages in static sections below
  // (same pattern as existing problems page — all 3 visible at once)
  const lang = "en" as const; // default for server render; labels below show all 3

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://www.klrenovator.com/services/${slug}#webpage`,
    name: data.title + " KL & Selangor — KL Renovator",
    description: data.tagline,
    url: `https://www.klrenovator.com/services/${slug}`,
    inLanguage: "en-MY",
    isPartOf: { "@id": "https://www.klrenovator.com/#website" },
    about: { "@id": "https://www.klrenovator.com/#business" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".speakable"] },
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/" className="hover:text-sky-600 transition">Home</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/services" className="hover:text-sky-600 transition">Services</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">{data.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src={data.heroImage || "/hero/aircond-installation-kuala-lumpur.jpg"}
            alt={`KL Renovator ${data.title} — KL & Selangor`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
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
                <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
                  {data.title}
                </h1>

                {/* Trilingual serving label */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                    {t("servingAll", "en")}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {t("servingAll", "ms")} · {t("servingAll", "zh")}
                </p>

                <p className="mt-4 text-lg text-slate-600 max-w-xl leading-relaxed">
                  {data.tagline}
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm">
                  <span className="bg-sky-500 text-white px-3 py-1.5 font-bold uppercase tracking-wider">
                    From {data.startPrice}
                  </span>
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    All KL &amp; Selangor
                  </span>
                </div>
                <div className="mt-8">
                  <BookingButton serviceName={data.title} size="lg" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-white text-slate-900 p-6 sm:p-8 border-2 border-sky-100 shadow-sm">
                <p className={eyebrow()}>Overview</p>
                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {data.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {data.highlights.slice(0, 4).map((h: string, i: number) => (
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

      {/* Highlights */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>What&apos;s included</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>Everything you </span>
              <span className={title({ size: "sm", color: "brand" })}>get with us.</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {data.highlights.map((h: string, i: number) => (
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
              <p className={eyebrow()}>Pricing · Harga · 收费</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Transparent </span>
                <span className={title({ size: "sm", color: "brand" })}>pricing.</span>
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                {t("pricingNote", "en")}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {t("pricingNote", "ms")} · {t("pricingNote", "zh")}
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {data.priceTable.map((p: { label: string; price: string }) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-base font-bold text-sky-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>Process · Proses · 流程</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>How it </span>
                <span className={title({ size: "sm", color: "brand" })}>works.</span>
              </h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {data.process.map((p: { step: string; desc: string }, i: number) => (
              <Reveal key={p.step} delay={i * 80}>
                <div className="bg-white p-6 h-full">
                  <span className={`inline-flex h-10 w-10 items-center justify-center ${stepColors[i % stepColors.length]} text-white font-extrabold text-sm`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-extrabold text-slate-900 uppercase tracking-tight">
                    {p.step}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs — shown in all 3 languages */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>FAQ · Soalan Lazim · 常见问答</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Common </span>
                <span className={title({ size: "sm", color: "brand" })}>questions.</span>
              </h2>
            </div>
          </Reveal>

          {/* English FAQs */}
          <div className="mt-8 border border-slate-200 divide-y divide-slate-200">
            {data.faqs.map((f: { q: string; a: string }, i: number) => (
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

          {/* BM FAQs */}
          {data.faqsBM && data.faqsBM.length > 0 && (
            <Reveal>
              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇲🇾 Bahasa Malaysia</p>
                <div className="space-y-3">
                  {data.faqsBM.map((f: { q: string; a: string }, i: number) => (
                    <div key={i} className="bg-white border border-slate-200 p-4">
                      <h3 className="font-black text-sm text-slate-900 mb-2">{f.q}</h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* ZH FAQs */}
          {data.faqsZH && data.faqsZH.length > 0 && (
            <Reveal>
              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇨🇳 中文</p>
                <div className="space-y-3">
                  {data.faqsZH.map((f: { q: string; a: string }, i: number) => (
                    <div key={i} className="bg-white border border-slate-200 p-4">
                      <h3 className="font-black text-sm text-slate-900 mb-2">{f.q}</h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Area Links */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              {data.title} {t("availableAreas", "en")} · {t("availableAreas", "ms")} · {t("availableAreas", "zh")}
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.areaPages.map((area) => (
                <NextLink
                  key={area.slug}
                  href={`/areas/${area.slug}`}
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
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              {data.title} {t("allBrandsServed", "en")} · {t("allBrandsServed", "ms")} · {t("allBrandsServed", "zh")}
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.brandPages.map((brand) => (
                <NextLink
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition rounded-full"
                >
                  {brand.name} <FiArrowRight className="h-3 w-3" />
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Problems */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              {t("problemsFixed", "en")} · {t("problemsFixed", "ms")} · {t("problemsFixed", "zh")}
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.problemPages.slice(0, 10).map((problem) => (
                <NextLink
                  key={problem.slug}
                  href={`/problems/${problem.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition rounded-full"
                >
                  {problem.name} <FiArrowRight className="h-3 w-3" />
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Blog Articles */}
      {(() => {
        const relatedSlugs = SERVICE_BLOG_MAP[slug] ?? [];
        const relatedPosts = allPosts.filter((p) => relatedSlugs.includes(p.slug)).slice(0, 4);
        if (relatedPosts.length === 0) return null;
        return (
          <section className="py-12 bg-slate-50 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Expert Guides · Panduan Pakar · 专家指南</p>
              <h2 className="text-lg font-black text-slate-900 mb-6">
                Related Aircond Guides &amp; Articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedPosts.map((post) => (
                  <NextLink
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-400 hover:shadow-md transition"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-2">{post.category}</span>
                    <span className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition leading-snug mb-2">{post.title}</span>
                    <span className="text-xs text-slate-500 mt-auto">{post.readTime} min read</span>
                  </NextLink>
                ))}
              </div>
              <NextLink href="/blog" className="inline-flex items-center gap-1 mt-6 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
                All Aircond Guides <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </section>
        );
      })()}

      {/* Contact CTA */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <p className={eyebrow()}>Book it · Tempah · 预约</p>
                <h2 className="mt-3">
                  <span className={title({ size: "md" })}>Book your </span>
                  <span className={title({ size: "md", color: "brand" })}>{data.title}.</span>
                </h2>
                <p className={subtitle({ class: "mt-4" })}>
                  {t("sendMessage", "en")}
                </p>
                <p className="mt-1 text-sm text-slate-500 font-medium">
                  {t("sendMessage", "ms")}
                </p>
                <p className="mt-0.5 text-sm text-slate-400 font-medium">
                  {t("sendMessage", "zh")}
                </p>
                <div className="mt-6">
                  <BookingButton serviceName={data.title} size="lg" />
                </div>

                <div className="mt-10">
                  <p className={eyebrow()}>Other Services · Perkhidmatan Lain · 其他服务</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {siteConfig.services
                      .filter((s) => s.slug !== slug)
                      .map((s) => (
                        <NextLink
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="inline-flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:border-sky-500 hover:text-sky-600 transition"
                        >
                          {s.title} <FiArrowRight className="h-3 w-3" />
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
