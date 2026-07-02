import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { allPosts } from "@/config/blog-posts";
import { BRAND_SERVICE_MAP } from "@/config/topical-authority-map";

// ── Brand → Blog relevance map ───────────────────────────────────────────────
const BRAND_BLOG_MAP: Record<string, string[]> = {
  "daikin":       ["best-aircond-brands-malaysia-2025", "daikin-vs-panasonic-aircond-malaysia", "inverter-vs-non-inverter-aircond-malaysia", "aircond-installation-guide-malaysia"],
  "panasonic":    ["best-aircond-brands-malaysia-2025", "daikin-vs-panasonic-aircond-malaysia", "inverter-vs-non-inverter-aircond-malaysia", "how-often-service-aircond-malaysia"],
  "mitsubishi":   ["best-aircond-brands-malaysia-2025", "inverter-vs-non-inverter-aircond-malaysia", "aircond-installation-guide-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "york":         ["best-aircond-brands-malaysia-2025", "aircond-service-price-guide-kl-2026", "aircond-lifespan-malaysia", "how-often-service-aircond-malaysia"],
  "acson":        ["best-aircond-brands-malaysia-2025", "aircond-service-price-guide-kl-2026", "how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia"],
  "carrier":      ["best-aircond-brands-malaysia-2025", "commercial-hvac-maintenance-kl", "aircond-lifespan-malaysia", "aircond-service-price-guide-kl-2026"],
  "midea":        ["best-aircond-brands-malaysia-2025", "inverter-vs-non-inverter-aircond-malaysia", "aircond-installation-guide-malaysia", "aircond-service-price-guide-kl-2026"],
  "haier":        ["best-aircond-brands-malaysia-2025", "aircond-installation-guide-malaysia", "how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia"],
  "toshiba":      ["best-aircond-brands-malaysia-2025", "aircond-lifespan-malaysia", "aircond-troubleshooting-guide-malaysia", "aircond-maintenance-checklist-malaysia"],
  "hitachi":      ["best-aircond-brands-malaysia-2025", "aircond-lifespan-malaysia", "commercial-hvac-maintenance-kl", "aircond-troubleshooting-guide-malaysia"],
  "samsung":      ["best-aircond-brands-malaysia-2025", "inverter-vs-non-inverter-aircond-malaysia", "aircond-installation-guide-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "lg":           ["best-aircond-brands-malaysia-2025", "inverter-vs-non-inverter-aircond-malaysia", "aircond-installation-guide-malaysia", "how-to-reduce-aircond-electricity-bill-malaysia"],
  "sharp":        ["best-aircond-brands-malaysia-2025", "aircond-service-price-guide-kl-2026", "how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia"],
  "fujitsu":      ["best-aircond-brands-malaysia-2025", "commercial-hvac-maintenance-kl", "aircond-lifespan-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "gree":         ["best-aircond-brands-malaysia-2025", "aircond-service-price-guide-kl-2026", "how-often-service-aircond-malaysia", "aircond-installation-guide-malaysia"],
};

// ── Error code reference per brand ───────────────────────────────────────────
const BRAND_ERROR_CODES: Record<string, { code: string; meaning: string; fix: string }[]> = {
  "daikin": [
    { code: "A1", meaning: "Indoor PCB fault", fix: "PCB board inspection / replacement" },
    { code: "C4", meaning: "Heat exchanger sensor fault", fix: "Sensor replacement" },
    { code: "J3", meaning: "Discharge pipe sensor fault", fix: "Sensor replacement" },
    { code: "L5", meaning: "Inverter overcurrent (low gas)", fix: "Gas top-up + leak check" },
    { code: "U4", meaning: "Indoor/outdoor communication error", fix: "Wiring + PCB diagnosis" },
  ],
  "panasonic": [
    { code: "H11", meaning: "Outdoor unit communication fault", fix: "PCB + wiring inspection" },
    { code: "H15", meaning: "Outdoor fan motor fault", fix: "Fan motor replacement" },
    { code: "H23", meaning: "Pipe temperature sensor fault", fix: "Sensor replacement" },
    { code: "F11", meaning: "Refrigerant pressure issue", fix: "Gas top-up + leak check" },
    { code: "E18", meaning: "Drive PCB fault", fix: "PCB board replacement" },
  ],
  "mitsubishi": [
    { code: "P8", meaning: "Outdoor unit error (general)", fix: "Outdoor unit diagnosis" },
    { code: "E6", meaning: "Communication fault indoor/outdoor", fix: "Wiring + PCB check" },
    { code: "U1", meaning: "Reverse phase / open phase", fix: "Electrical supply inspection" },
    { code: "P4", meaning: "Drain sensor fault", fix: "Drain sensor replacement" },
    { code: "E4", meaning: "Remote controller error", fix: "Remote controller / PCB check" },
  ],
  "york": [
    { code: "E1", meaning: "High pressure protection", fix: "Outdoor unit + gas pressure check" },
    { code: "E2", meaning: "Low pressure protection", fix: "Gas top-up + leak check" },
    { code: "E3", meaning: "Compressor overload", fix: "Compressor + capacitor diagnosis" },
    { code: "E6", meaning: "Fan motor fault", fix: "Fan motor inspection / replacement" },
  ],
  "acson": [
    { code: "E1", meaning: "Indoor fan motor fault", fix: "Fan motor replacement" },
    { code: "E2", meaning: "Outdoor fan motor fault", fix: "Fan motor replacement" },
    { code: "E3", meaning: "Compressor protection", fix: "Compressor + gas diagnosis" },
    { code: "E5", meaning: "Refrigerant low pressure", fix: "Gas top-up + leak check" },
  ],
  "midea": [
    { code: "E1", meaning: "High pressure protection", fix: "Outdoor unit + condenser check" },
    { code: "E3", meaning: "Low pressure protection / low gas", fix: "Gas top-up + leak check" },
    { code: "P2", meaning: "Overcurrent protection (compressor)", fix: "Compressor + capacitor diagnosis" },
    { code: "F3", meaning: "Outdoor ambient sensor fault", fix: "Sensor replacement" },
  ],
  "_default": [
    { code: "E1/E2/E3", meaning: "Various pressure / temperature faults", fix: "Diagnosis by KL Renovator technician" },
    { code: "P-series", meaning: "Protection mode triggered", fix: "On-site error code reading + diagnosis" },
    { code: "F-series", meaning: "Sensor fault codes", fix: "Sensor inspection + replacement if needed" },
  ],
};

// ── Brand → Problem relevance map ─────────────────────────────────────────────

const BRAND_PROBLEM_MAP: Record<string, string[]> = {
  "daikin":             ["aircond-not-cold", "aircond-water-leaking", "aircond-blinking-light", "aircond-low-gas"],
  "panasonic":          ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-blinking-light"],
  "mitsubishi":         ["aircond-not-cold", "aircond-blinking-light", "aircond-pcb-problem", "aircond-water-leaking"],
  "york":               ["aircond-not-cold", "aircond-compressor-problem", "aircond-water-leaking", "aircond-low-gas"],
  "acson":              ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-low-gas"],
  "carrier":            ["aircond-not-cold", "aircond-compressor-problem", "aircond-high-electricity-bill", "aircond-water-leaking"],
  "midea":              ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-making-noise"],
  "haier":              ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-low-gas"],
  "toshiba":            ["aircond-not-cold", "aircond-blinking-light", "aircond-pcb-problem", "aircond-water-leaking"],
  "hitachi":            ["aircond-not-cold", "aircond-compressor-problem", "aircond-blinking-light", "aircond-water-leaking"],
  "samsung":            ["aircond-not-cold", "aircond-water-leaking", "aircond-blinking-light", "aircond-pcb-problem"],
  "lg":                 ["aircond-not-cold", "aircond-water-leaking", "aircond-blinking-light", "aircond-fan-not-working"],
  "sharp":              ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-bad-smell"],
  "fujitsu":            ["aircond-not-cold", "aircond-compressor-problem", "aircond-pcb-problem", "aircond-blinking-light"],
  "gree":               ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-bad-smell"],
  "hisense":            ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-low-gas"],
  "aux":                ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-bad-smell"],
  "tcl":                ["aircond-not-cold", "aircond-water-leaking", "aircond-blinking-light", "aircond-low-gas"],
  "national":           ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-low-gas"],
  "isonic":             ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-low-gas"],
};

export function generateStaticParams() {
  return siteConfig.brandPages.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) return { title: "Brand not found" };

  return {
    title: brand.metaTitle,
    description: brand.metaDesc,
    openGraph: {
      title: brand.metaTitle,
      description: brand.metaDesc,
      url: `https://www.klrenovator.com/brands/${slug}`,
      type: "website",
      locale: "en_MY",
      alternateLocale: ["ms_MY", "zh_MY"],
      images: [
        {
          url: `https://www.klrenovator.com${brand.heroImage || "/hero/aircond-installation-kuala-lumpur.webp"}`,
          width: 1200,
          height: 630,
          alt: `${brand.name} Aircond Service KL & Selangor — KL Renovator`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brand.metaTitle,
      description: brand.metaDesc,
      images: [`https://www.klrenovator.com${brand.heroImage || "/hero/aircond-installation-kuala-lumpur.webp"}`],
    },
    alternates: {
      canonical: `https://www.klrenovator.com/brands/${slug}`,
      languages: {
        "en-MY": `https://www.klrenovator.com/brands/${slug}`,
        "ms-MY": `https://www.klrenovator.com/ms/brands/${slug}`,
        "zh-MY": `https://www.klrenovator.com/zh/brands/${slug}`,
        "x-default": `https://www.klrenovator.com/brands/${slug}`,
      },
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) notFound();

  const waMsg = `Hi KL Renovator, I need help with my ${brand.name} aircond. Please advise.`;
  const waMsgMS = `Hai KL Renovator, saya perlukan bantuan untuk aircond ${brand.name} saya. Tolong nasihatkan.`;
  const waMsgZH = `你好 KL Renovator，我需要帮助处理我的${brand.name}冷气。请给予建议。`;

  const services = siteConfig.services.filter((s) => s.slug !== "emergency");
  const relatedAreas = siteConfig.areaPages.slice(0, 12);

  // ── Schema ────────────────────────────────────────────────────────────────
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.klrenovator.com/brands/${slug}#service`,
    name: `${brand.name} Aircond Service KL & Selangor`,
    description: brand.description,
    provider: {
      "@type": "HVACBusiness",
      "@id": "https://www.klrenovator.com/#business",
      name: "KL Renovator",
    },
    areaServed: [
      { "@type": "City", name: "Kuala Lumpur" },
      { "@type": "State", name: "Selangor" },
    ],
    serviceType: `${brand.name} Aircond Servicing`,
    offers: {
      "@type": "Offer",
      price: "99",
      priceCurrency: "MYR",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: "99",
        maxPrice: "2000",
        priceCurrency: "MYR",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com/" },
      { "@type": "ListItem", position: 2, name: "Brands", item: "https://www.klrenovator.com/brands" },
      { "@type": "ListItem", position: 3, name: `${brand.name} Aircond Service`, item: `https://www.klrenovator.com/brands/${slug}` },
    ],
  };

  // ── HowTo Schema ─────────────────────────────────────────────────────────
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Book ${brand.name} Aircond Service in KL & Selangor`,
    description: `Step-by-step guide to booking ${brand.name} aircond servicing with KL Renovator in Kuala Lumpur and Selangor`,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "MYR",
      value: "99",
    },
    step: [
      { "@type": "HowToStep", position: 1, name: "WhatsApp KL Renovator", text: `Send a WhatsApp to +60182983573 with your ${brand.name} model, HP size and location.` },
      { "@type": "HowToStep", position: 2, name: "Receive Quote", text: "Get a confirmed price before the technician is dispatched — no hidden charges." },
      { "@type": "HowToStep", position: 3, name: "Technician Arrives", text: "Trained KL Renovator technician arrives at your location on the agreed date and time." },
      { "@type": "HowToStep", position: 4, name: "Service Completed", text: `Your ${brand.name} aircond is serviced, tested and handed over with a job card and warranty.` },
    ],
  };

  // Build FAQ entries — use brand-specific faqs if available, else generic fallback
  const faqItems = (brand.faqs ?? [
    { q: `How much does ${brand.name} aircond service cost in KL?`, a: `${brand.name} aircond servicing with KL Renovator starts from RM 99 for basic servicing, RM 120 for chemical wash, and RM 220 for chemical overhaul. Gas top-up starts from RM 120 (R22), RM 150 (R410A), RM 180 (R32). All prices confirmed before work begins.` },
    { q: `Does KL Renovator service all ${brand.name} models?`, a: `Yes. KL Renovator technicians are experienced in servicing all ${brand.name} residential and commercial models including ${brand.models.join(", ")}. Both inverter and non-inverter systems supported.` },
    { q: `My ${brand.name} aircond is not cold — what should I do?`, a: `The most common causes are low refrigerant gas, a dirty coil or a faulty capacitor. WhatsApp KL Renovator at +60182983573 with your ${brand.name} model and HP size. A technician will diagnose and quote you before starting any work.` },
    { q: `What gas does ${brand.name} aircond use?`, a: `Most ${brand.name} air conditioners use ${brand.gasTypes.join(" or ")} refrigerant. KL Renovator handles all gas types: R22, R410A and R32 with precision balancing.` },
  ]) as { q: string; a: string }[];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://www.klrenovator.com/brands/${slug}#webpage`,
    name: `${brand.name} Aircond Service KL & Selangor — KL Renovator`,
    description: brand.metaDesc,
    url: `https://www.klrenovator.com/brands/${slug}`,
    inLanguage: "en-MY",
    isPartOf: { "@id": "https://www.klrenovator.com/#website" },
    about: { "@id": "https://www.klrenovator.com/#business" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".speakable"] },
  };

  return (
    <>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-1.5 text-xs text-slate-500">
            <li><NextLink href="/" className="hover:text-sky-600 font-medium">Home</NextLink></li>
            <li><FiChevronRight className="h-3 w-3" /></li>
            <li><NextLink href="/brands" className="hover:text-sky-600 font-medium">Brands</NextLink></li>
            <li><FiChevronRight className="h-3 w-3" /></li>
            <li className="text-slate-900 font-bold">{brand.name} Aircond Service</li>
          </ol>
        </div>
      </nav>

      {/* Hero — trilingual headings */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src={brand.heroImage || "/hero/aircond-installation-kuala-lumpur.webp"}
            alt={`${brand.name} aircond service KL & Selangor`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              {/* EN */}
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">
                {brand.name} · KL & Selangor
              </p>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                {brand.name} Aircond{" "}
                <span className="text-sky-500">Service KL</span>{" "}
                &amp; Selangor
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                {brand.description}
              </p>

              {/* BM description */}
              <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed max-w-2xl border-l-2 border-sky-200 pl-3">
                {brand.descriptionMS}
              </p>

              {/* ZH description */}
              <p className="mt-2 text-sm text-slate-400 font-medium leading-relaxed max-w-2xl border-l-2 border-slate-200 pl-3">
                {brand.descriptionZH}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Chemical Wash", "Gas Top-Up", "Repairs", "Installation", "Chemical Overhaul"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider rounded-full"
                  >
                    <FiCheck className="h-2.5 w-2.5 text-sky-500" /> {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waLink(waMsg)}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  Book {brand.name} Service
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all"
                >
                  Call {siteConfig.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Trust Signal Strip ─────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 1-Month Workmanship Warranty</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> All {brand.name} Models Serviced</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Price Confirmed Before Work</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Same-Day Available</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 500+ 5-Star Reviews</span>
        </div>
      </section>

      {/* Models & Gas Types */}
      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            <Reveal>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
                  {brand.name} Models We Service
                </h2>
                <ul className="space-y-2">
                  {brand.models.map((model) => (
                    <li key={model} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                      <FiCheck className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
                      {model}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
                  Gas Types Supported
                </h2>
                <ul className="space-y-2 mb-6">
                  {brand.gasTypes.map((gas) => (
                    <li key={gas} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                      <FiCheck className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      {gas} — Precision top-up with leak check
                    </li>
                  ))}
                </ul>
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-sky-700">
                    Not sure which gas your {brand.name} uses? WhatsApp us a photo of the outdoor unit label — we&apos;ll identify it instantly.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services + Pricing */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Full Service Range</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{brand.name} Aircond </span>
                <span className={title({ size: "sm", color: "brand" })}>Services & Pricing</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 30}>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-sky-100 transition-all">
                  <h3 className="font-black text-slate-900 text-sm mb-2">{service.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">{service.short}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-sky-700 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                      From RM {service.startPrice}
                    </span>
                    <NextLink
                      href={`/services/${service.slug}`}
                      className="text-xs font-black text-sky-600 hover:text-sky-700 flex items-center gap-1 uppercase tracking-wider"
                    >
                      Details <FiArrowRight className="h-3 w-3" />
                    </NextLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 max-w-5xl mx-auto bg-slate-900 text-white rounded-2xl p-7 sm:p-10 text-center">
              <p className="text-xs font-black uppercase tracking-widest text-sky-400 mb-2">Instant Quote</p>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                Get Your {brand.name} Service Quote
              </h3>
              <p className="mt-3 text-sm text-slate-300 font-medium max-w-md mx-auto">
                WhatsApp us your {brand.name} model, HP size and area. We&apos;ll give you an accurate quote within 30 minutes.
              </p>
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp for Free Quote
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose — reasons */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Why KL Renovator</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Trusted {brand.name} Aircond </span>
                <span className={title({ size: "sm", color: "brand" })}>Specialists</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { title: "Brand-Experienced Technicians", desc: `Our technicians have hands-on experience servicing ${brand.name} models including inverter and non-inverter wall-mounted and ceiling cassette systems.` },
              { title: "Correct Gas Used Every Time", desc: `We use ${brand.gasTypes.join(" and ")} refrigerant with precision manifold balancing — never overfilling or underfilling, which protects your ${brand.name} compressor.` },
              { title: "Transparent Quote Before Work", desc: `Every ${brand.name} service job includes a confirmed quote before our technician starts. No hidden charges ever.` },
              { title: "Same-Day Service Available", desc: `Most ${brand.name} service and repair jobs can be scheduled same-day across KL and Selangor. WhatsApp to check availability.` },
              { title: "1-Month Workmanship Warranty", desc: "All labour and parts are covered by a 1-month workmanship warranty. If the same issue recurs, we return at no extra charge." },
              { title: "All KL & Selangor Covered", desc: "KL Renovator dispatches to all areas including Batu Caves, Cheras, Ampang, PJ, Subang, Shah Alam, Klang, Puchong, Kajang and more." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 40}>
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="w-8 h-8 bg-sky-50 border border-sky-100 rounded-lg flex items-center justify-center mb-3">
                    <FiCheck className="h-4 w-4 text-sky-600" />
                  </div>
                  <h3 className="font-black text-sm text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — EN + BM + ZH */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>FAQs · Soalan Lazim · 常见问答</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{brand.name} Aircond </span>
                <span className={title({ size: "sm", color: "brand" })}>Questions Answered</span>
              </h2>
            </div>
          </Reveal>

          {/* EN FAQ */}
          <Reveal>
            <div className="space-y-4 mb-6">
              {(brand.faqs ?? [
                {
                  q: `How much does ${brand.name} aircond service cost in KL & Selangor?`,
                  a: `${brand.name} aircond servicing with KL Renovator starts from RM 99 for basic servicing, RM 120 for chemical wash, and RM 220 for chemical overhaul. Gas top-up starts from RM 120 (R22), RM 150 (R410A), RM 180 (R32). All prices confirmed before work begins.`,
                },
                {
                  q: `Does KL Renovator service all ${brand.name} models?`,
                  a: `Yes. KL Renovator technicians are experienced in servicing all ${brand.name} residential and commercial models including ${brand.models.join(", ")}. Both inverter and non-inverter systems supported.`,
                },
                {
                  q: `My ${brand.name} aircond is not cold. What should I do?`,
                  a: `The most common causes are low refrigerant gas, a dirty coil or a faulty capacitor. WhatsApp KL Renovator at +60182983573 with your ${brand.name} model and HP size. A technician will diagnose and quote you before starting any work.`,
                },
                {
                  q: `My ${brand.name} aircond is leaking water. What should I do?`,
                  a: `Switch off the unit if heavily leaking. Water leaking is usually caused by a blocked drain pipe or dirty drain pan. KL Renovator provides chemical wash (from RM 120) or chemical overhaul (from RM 220) to permanently resolve the issue.`,
                },
              ]).map((faq, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-black text-sm text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* BM FAQ */}
          <Reveal>
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇲🇾 Bahasa Malaysia</p>
              {(brand.faqsBM ?? [
                {
                  q: `Berapa harga servis aircond ${brand.name} di KL & Selangor?`,
                  a: `Servis aircond ${brand.name} dengan KL Renovator bermula dari RM 99 (servis asas), RM 120 (cuci kimia), dan RM 220 (overhaul kimia). Top-up gas bermula dari RM 120 (R22), RM 150 (R410A), RM 180 (R32). Semua harga disahkan sebelum kerja bermula.`,
                },
                {
                  q: `Adakah KL Renovator boleh servis aircond ${brand.name} saya?`,
                  a: `Ya. Juruteknik KL Renovator berpengalaman menservis semua model aircond ${brand.name} termasuk ${brand.models.slice(0, 2).join(", ")} dan model lain. Hubungi +60182983573.`,
                },
                {
                  q: `Aircond ${brand.name} saya tidak sejuk. Apa yang perlu saya lakukan?`,
                  a: `Punca paling biasa adalah gas rendah, gegelung kotor atau kapasitor rosak. WhatsApp KL Renovator di +60182983573 dengan model dan saiz HP ${brand.name} anda. Juruteknik akan mendiagnosis dan memberi sebut harga sebelum memulakan kerja.`,
                },
              ]).map((faq, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h3 className="font-black text-sm text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ZH FAQ */}
          <Reveal>
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇨🇳 中文</p>
              {(brand.faqsZH ?? [
                {
                  q: `KL Renovator的${brand.name}冷气服务费用是多少？`,
                  a: `${brand.name}冷气服务费用：基本保养从RM 99起，化学清洗从RM 120起，化学大修从RM 220起，冷媒充气从RM 120（R22）、RM 150（R410A）、RM 180（R32）起。所有价格在施工前确认，无隐藏收费。`,
                },
                {
                  q: `KL Renovator能维修我的${brand.name}冷气吗？`,
                  a: `能。KL Renovator的技术员在吉隆坡和雪兰莪拥有丰富的${brand.name}冷气维修经验，包括${brand.models.slice(0, 2).join("、")}等型号。请WhatsApp +60182983573预约。`,
                },
                {
                  q: `我的${brand.name}冷气不冷，该怎么办？`,
                  a: `最常见原因是制冷剂不足、盘管脏污或电容器故障。请WhatsApp KL Renovator +60182983573，提供您的${brand.name}型号和HP大小。技术员将在开始工作前诊断并报价。`,
                },
              ]).map((faq, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h3 className="font-black text-sm text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Error Code Reference Section ───────────────────────────────── */}
      {(() => {
        const errorCodes = BRAND_ERROR_CODES[slug] ?? BRAND_ERROR_CODES["_default"];
        return (
          <section className="py-12 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">
                  Error Code Guide · Panduan Kod Ralat · 错误代码指南
                </p>
                <h2 className="text-xl font-black text-slate-900 mb-2">
                  Common {brand.name} Aircond Error Codes
                </h2>
                <p className="text-sm text-slate-500 mb-6 max-w-2xl">
                  Blinking lights on your {brand.name} unit? These are the most common error codes and what they mean. WhatsApp KL Renovator the code + model for fast remote diagnosis.
                </p>
                <div className="overflow-hidden border border-slate-200 rounded-2xl">
                  <div className="grid grid-cols-3 bg-slate-100 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-500">
                    <span>Error Code</span>
                    <span>Meaning</span>
                    <span>Fix</span>
                  </div>
                  {errorCodes.map((ec, i) => (
                    <div key={ec.code} className={`grid grid-cols-3 px-5 py-3.5 text-xs border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                      <span className="font-black text-red-600">{ec.code}</span>
                      <span className="font-semibold text-slate-700">{ec.meaning}</span>
                      <span className="text-slate-500">{ec.fix}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Error code not listed? WhatsApp +60182983573 with your {brand.name} model number and the error pattern — we&apos;ll diagnose it remotely.
                </p>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* ── Brand Comparison CTA ─────────────────────────────────────────── */}
      {["daikin", "panasonic", "mitsubishi"].includes(slug) && (
        <section className="py-8 bg-violet-50 border-t border-violet-100">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-violet-600 mb-1">Brand Comparison Guide</p>
                  <h3 className="font-black text-slate-900 text-base">
                    {slug === "daikin" ? "Daikin vs Panasonic — Which Should You Buy?" :
                     slug === "panasonic" ? "Panasonic vs Daikin — Complete Comparison" :
                     "Best Aircond Brands Malaysia — Full Comparison"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Read our independent guide to help you decide. No brand bias.</p>
                </div>
                <NextLink
                  href={slug === "daikin" || slug === "panasonic" ? "/blog/daikin-vs-panasonic-aircond-malaysia" : "/blog/best-aircond-brands-malaysia-2025"}
                  className="shrink-0 inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all"
                >
                  Read Comparison <FiArrowRight className="h-3 w-3" />
                </NextLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related Areas */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
              Service Areas · Kawasan Servis · 服务区域
            </p>
            <h2 className="text-base font-black text-slate-900 mb-5">
              {brand.name} Aircond Service by Area in KL & Selangor
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedAreas.map((area) => (
                <NextLink
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50 px-3 py-2 text-xs font-bold text-slate-700 rounded-xl transition-all"
                >
                  <FiArrowRight className="h-3 w-3 text-sky-500 shrink-0" />
                  {brand.name} Aircond Service {area.name}
                </NextLink>
              ))}
              <NextLink
                href="/areas"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 hover:bg-sky-100 px-3 py-2 text-xs font-bold text-sky-700 rounded-xl transition-all"
              >
                All 35+ Areas <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other Brands */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-5">
              Other Brands We Service
            </h2>
            <div className="flex flex-wrap gap-2">
              {siteConfig.brandPages
                .filter((b) => b.slug !== slug)
                .map((b) => (
                  <NextLink
                    key={b.slug}
                    href={`/brands/${b.slug}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 hover:border-sky-200 hover:bg-sky-50 px-3 py-2 text-xs font-bold text-slate-600 rounded-xl transition-all"
                  >
                    {b.name} Aircond Service
                  </NextLink>
                ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Blog Guides */}
      {(() => {
        const relatedSlugs = BRAND_BLOG_MAP[slug] ?? [];
        const relatedPosts = allPosts.filter((p) => relatedSlugs.includes(p.slug)).slice(0, 4);
        if (relatedPosts.length === 0) return null;
        return (
          <section className="py-12 bg-slate-50 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Expert Guides · Panduan · 指南</p>
                <h2 className="text-base font-black text-slate-900 mb-5">Related Aircond Guides &amp; Articles</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedPosts.map((post) => (
                    <NextLink
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-400 hover:shadow-md transition"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{post.category}</span>
                      <span className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition leading-snug mb-2">{post.title}</span>
                      <span className="text-xs text-slate-500 mt-auto">{post.readTime} min read</span>
                    </NextLink>
                  ))}
                </div>
                <NextLink href="/blog" className="inline-flex items-center gap-1 mt-5 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
                  All Aircond Guides <FiArrowRight className="h-3 w-3" />
                </NextLink>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* Common Problems for This Brand */}
      {(() => {
        const problemSlugs = BRAND_PROBLEM_MAP[slug] ?? [];
        const relatedProblems = siteConfig.problemPages.filter((p) => problemSlugs.includes(p.slug));
        if (relatedProblems.length === 0) return null;
        return (
          <section className="py-10 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Problems · Masalah · 问题</p>
                <h2 className="text-base font-black text-slate-900 mb-4">
                  Common {brand.name} Aircond Problems We Fix
                </h2>
                <div className="flex flex-wrap gap-2">
                  {relatedProblems.map((p) => (
                    <NextLink
                      key={p.slug}
                      href={`/problems/${p.slug}`}
                      className="inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 rounded-full hover:border-sky-500 hover:text-sky-600 transition"
                    >
                      {p.name}
                    </NextLink>
                  ))}
                  <NextLink href="/problems" className="inline-flex items-center gap-1 border border-sky-400 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 rounded-full hover:bg-sky-100 transition">
                    All Problems →
                  </NextLink>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* Related Services — fills the cross-link gap: brand pages previously
          linked to Areas, Blog posts, and Problems, but never to Services. */}
      {(() => {
        const serviceSlugs = BRAND_SERVICE_MAP[slug] ?? BRAND_SERVICE_MAP["_default"];
        const relatedServices = siteConfig.services.filter((s) => serviceSlugs.includes(s.slug));
        if (relatedServices.length === 0) return null;
        return (
          <section className="py-10 bg-slate-50 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Services · Perkhidmatan · 服务</p>
                <h2 className="text-base font-black text-slate-900 mb-4">
                  {brand.name} Services We Offer
                </h2>
                <div className="flex flex-wrap gap-2">
                  {relatedServices.map((s) => (
                    <NextLink
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1.5 border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50 px-3 py-2 text-xs font-bold text-slate-700 rounded-xl transition-all"
                    >
                      <FiArrowRight className="h-3 w-3 text-sky-500 shrink-0" />
                      {s.title} — from RM {s.startPrice}
                    </NextLink>
                  ))}
                  <NextLink href="/services" className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 hover:bg-sky-100 px-3 py-2 text-xs font-bold text-sky-700 rounded-xl transition-all">
                    All Services <FiArrowRight className="h-3 w-3" />
                  </NextLink>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* CTA */}
      <section className="py-16 bg-sky-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Book Your {brand.name} Aircond Service Today
            </h2>
            <p className="mt-3 text-sky-100 font-medium">
              Same-day service available. All {brand.name} models. Transparent pricing — no hidden charges.
            </p>
            {/* Trilingual sub-note */}
            <p className="mt-1 text-xs text-sky-200 font-medium">
              Servis hari sama tersedia · 当天服务可用
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
