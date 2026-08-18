import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { entityPhrases } from "@/config/installation-entity-map";

const DEDICATED_STATIC_SERVICE_SLUGS = new Set(["emergency", "maintenance-contract"]);
import { servicesData } from "@/config/services-data";
import { allPosts } from "@/config/blog-posts";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { ContactForm } from "@/components/contact-form";
import { ServiceIcon } from "@/components/service-icon";
import { buildServiceSchema } from "@/lib/seo";
import { clampMetaTitle, buildServiceMetaTitleWithDate } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { title, subtitle, eyebrow } from "@/components/primitives";
import { buildServiceCorePolishModule } from "@/config/service-core-polish";
import { buildServiceCRORefinementModule } from "@/config/service-cro-refinement";
import { buildServiceAIOAnswerBlock } from "@/config/service-aio-answer-blocks";
import { buildServiceHVACEntityModule } from "@/config/service-hvac-entity-pass";
import { serviceSchemaParityFields } from "@/config/service-schema-parity";
import { buildServiceVisualSXOModule } from "@/config/service-visual-sxo-polish";
import { buildServiceRouteAlternates } from "@/config/service-route-qa";
import { anchor } from "@/config/anchor-text-diversity";
import { PriceComparisonUI } from "@/components/price-comparison";

// This route is backed by a finite typed content registry.
// Unknown slugs must be a real 404, never an indexable fallback page.
export const dynamicParams = false;

export function generateStaticParams() {
  // dedicated static page files. Including maintenance-contract here can
  // let the dynamic [slug] route prerender a notFound() response because
  // servicesData intentionally does not contain the AMC landing-page copy.
  return siteConfig.services
    .filter((s) => !DEDICATED_STATIC_SERVICE_SLUGS.has(s.slug))
    .map((s) => ({ slug: s.slug }));
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
    title: buildServiceMetaTitleWithDate(`${data.title} KL & Selangor — From RM ${service.startPrice}`, "en"),
    description: clampMetaDescription(data.tagline),
    openGraph: {
      title: clampMetaTitle(`${data.title} | KL Renovator`),
      description: clampMetaDescription(data.tagline),
      url: `https://www.klrenovator.com/services/${slug}`,
      type: "website",
      images: getServiceOGImages(slug, "en"),
    },
    twitter: {
      card: "summary_large_image",
      title: clampMetaTitle(`${data.title} | KL Renovator`),
      description: clampMetaDescription(data.tagline),
      images: getServiceOGImages(slug, "en"),
    },
    alternates: {
      canonical: `https://www.klrenovator.com/services/${slug}`,
      languages: buildServiceRouteAlternates(slug),
    },
  };
}

// ─── Multi-color palettes ─────────────────────────────────────────────────────
// ── Cross-service recommendations ────────────────────────────────────────────
const CROSS_SERVICE_MAP: Record<string, string[]> = {
  "chemical-wash":         ["chemical-overhaul", "basic-servicing", "gas-topup"],
  "chemical-overhaul":     ["chemical-wash", "gas-topup", "repair"],
  "gas-topup":             ["chemical-wash", "repair", "chemical-overhaul"],
  "repair":                ["chemical-wash", "chemical-overhaul", "gas-topup"],
  "basic-servicing":       ["chemical-wash", "chemical-overhaul"],
  "installation":          ["basic-servicing", "chemical-wash"],
  "ceiling-cassette":      ["repair", "gas-topup"],
  "dismantling-relocation":["installation", "chemical-wash"],
  "emergency":             ["repair", "chemical-overhaul", "gas-topup"],
};

const stepColors = [
  "bg-sky-500", "bg-emerald-500", "bg-violet-500",
  "bg-amber-500", "bg-rose-500", "bg-teal-500",
];
const highlightColors = [
  "bg-sky-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500",
  "bg-rose-500", "bg-teal-500", "bg-indigo-500", "bg-orange-500",
];

type ServiceFaq = { q: string; a: string };

const SUPPLEMENTAL_SERVICE_FAQS: Record<string, ServiceFaq[]> = {
  "chemical-wash": [
    { q: "What post-service testing is performed after a pressure chemical wash?", a: "After the 80–120 PSI chemical wash and high-pressure water rinse, our technician reassembles your unit and conducts a 15-minute operational test. We measure the supply airflow velocity and cooling temperature drop to verify that cooling efficiency and strong airflow are fully restored before handover." },
    { q: "Can I stay at home during the chemical wash?", a: "Yes. The technician uses a protective canvas and checks drainage before leaving. Keep children away from the work area while the unit is being washed." },
  ],
  "chemical-overhaul": [
    { q: "When should I choose chemical overhaul instead of chemical wash?", a: "Choose chemical overhaul when the aircond has severe weak airflow, repeated leaking, ice formation, bad smell that returns quickly, or years of heavy dirt inside the blower and back tray." },
    { q: "Will the indoor unit be removed from the wall?", a: "For a proper wall-mounted chemical overhaul, the indoor unit is dismantled so hidden parts can be cleaned more thoroughly than a normal front chemical wash." },
  ],
  "gas-topup": [
    { q: "Does low gas always mean I need a refill?", a: "Low gas usually means there may be a leak. KL Renovator checks pressure and advises whether a leak check or repair is needed before repeated top-ups waste money." },
    { q: "Can you identify whether my unit uses R32, R410A or R22?", a: "Yes. You can WhatsApp a clear photo of the outdoor unit label, or the technician can identify the refrigerant type on-site before topping up." },
  ],
  "repair": [
    { q: "Should I turn off the aircond if it trips the DB box?", a: "Yes. Stop using it until checked. Repeated tripping can point to electrical short, capacitor fault, compressor issue or water reaching electrical parts." },
    { q: "Do you quote repair parts before replacing them?", a: "Yes. The technician diagnoses the fault and confirms the repair cost before replacing capacitor, fan motor, PCB, sensor or wiring parts." },
  ],
  "installation": [
    { q: "Is RM199 installation enough for every home?", a: "RM199 covers standard wall-mounted 1.0–1.5HP installation labour with up to 7ft copper pipe, insulation, electrical wire and drain pipe. Extra materials such as longer copper run or power point are quoted first if needed." },
    { q: "Do you vacuum the system during installation?", a: `Yes. ${entityPhrases.vacuumMandatory} Proper vacuuming removes moisture and air from the line before refrigerant release, helping protect the compressor and cooling performance.` },
    { q: "What copper pipe do you use for installation?", a: `${entityPhrases.copperTypeL} All piping is cleanly prepared during brazing to prevent internal oxidation.` },
    { q: "Do you provide electrical wiring for the new unit?", a: `Yes. ${entityPhrases.dedicatedCircuit} We ensure correct MCB sizing per HP, plus an outdoor isolator switch for safety and maintenance access.` },
    { q: "What insulation do you use on the copper pipes?", a: `${entityPhrases.insulationStandard} ${entityPhrases.insulationThick}` },
    { q: "Can you install in high-rise condos?", a: "Yes — we regularly install in KLCC, Mont Kiara, Bangsar, Sentul, PJ, and Subang Jaya. We coordinate with building management for lift/loading bay access and follow JMB rules. Our technicians are experienced with service-ledge and balcony installations." },
  ],
  "basic-servicing": [
    { q: "How often should I service my aircond in Malaysia?", a: "For daily-use bedrooms and offices, every 3–4 months is recommended. Light-use rooms can often be serviced every 6 months." },
    { q: "When is basic service not enough?", a: "If there is leaking water, strong smell, weak airflow or heavy internal dirt, chemical wash or chemical overhaul may be more suitable than basic servicing." },
  ],
  "ceiling-cassette": [
    { q: "Do ceiling cassette units need different servicing from wall units?", a: "Yes. Ceiling cassette units have larger panels, drain trays and ceiling access considerations, so they need technicians trained for safe commercial or office servicing." },
    { q: "Can you service office ceiling cassette units after business hours?", a: "Scheduling depends on technician availability, but KL Renovator can coordinate suitable slots for offices and shoplots to reduce business disruption." },
  ],
  "dismantling-relocation": [
    { q: "Can you reuse my existing aircond after dismantling?", a: "Yes, if the unit, copper line compatibility and condition are suitable. The technician will advise whether reuse or new material is safer." },
    { q: "Will gas be recovered before dismantling?", a: "Where suitable, the technician follows safe pump-down/recovery practice before disconnecting the unit to reduce refrigerant loss and protect the compressor." },
  ],
  "emergency": [
    { q: "What counts as an emergency aircond repair?", a: "Water leaking near electrical points, DB tripping, burning smell, total breakdown, compressor not running or urgent commercial cooling failure should be checked quickly." },
    { q: "Can emergency service be done same day?", a: "Same-day emergency slots are often available across KL and Selangor depending on route, time and parts needed. WhatsApp your location and symptoms for fastest triage." },
  ],
};

const GLOBAL_SERVICE_FAQS: ServiceFaq[] = [
  { q: "Do you confirm the price before starting work?", a: "Yes. KL Renovator confirms the service scope, starting price and any extra material or repair cost before work begins." },
  { q: "Is there a workmanship warranty?", a: "Yes. Eligible workmanship is covered by a 1-month workmanship warranty. Warranty terms are explained clearly before handover." },
  { q: "Do you offer discounts for multiple units?", a: "Yes. Eligible multi-unit bookings can receive 5% OFF Instant Booking Discount for 5+ units and 10% OFF Instant Booking Discount for 10+ units, confirmed before booking." },
];

function mergeFaqs(...groups: ServiceFaq[][]): ServiceFaq[] {
  const seen = new Set<string>();
  return groups.flat().filter((faq) => {
    const key = faq.q.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Proof strip uses the same unique hero already assigned to this service page.

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
import { SERVICE_PROBLEM_MAP, SERVICE_BLOG_MAP_V2 } from "@/config/topical-authority-map";

const SERVICE_BLOG_MAP: Record<string, string[]> = {
  "chemical-wash": ["aircond-chemical-wash-price-malaysia-2026", "chemical-wash-vs-chemical-overhaul", "signs-your-aircon-needs-chemical-overhaul-malaysia", "how-often-service-aircond-malaysia"],
  "chemical-overhaul": ["chemical-wash-vs-chemical-overhaul", "signs-your-aircon-needs-chemical-overhaul-malaysia", "aircond-water-leaking-causes", "how-often-service-aircond-malaysia"],
  "gas-topup": ["r32-r410a-r22-gas-difference", "aircond-not-cold-reasons", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "repair": ["aircond-not-cold-reasons", "aircond-water-leaking-causes", "aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "installation": ["aircond-installation-guide-malaysia", "best-aircond-brands-malaysia-2026", "inverter-vs-non-inverter-aircond-malaysia", "daikin-vs-panasonic-aircond-malaysia"],
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

  const schemaParity = serviceSchemaParityFields("en");
  const enhancedFaqs = mergeFaqs(data.faqs ?? [], SUPPLEMENTAL_SERVICE_FAQS[slug] ?? [], GLOBAL_SERVICE_FAQS);
  const enhancedFaqsBM = data.faqsBM ?? [];
  const enhancedFaqsZH = data.faqsZH ?? [];

  const iconName = siteConfig.services.find((s) => s.slug === slug)?.icon ?? "sparkles";
  const proofImages = SERVICE_PROOF_IMAGES[slug] ?? SERVICE_PROOF_IMAGES["installation"];

  const serviceSchema = buildServiceSchema({
    slug,
    name: data.title,
    description: data.tagline,
    startPrice: service?.startPrice ?? 88,
    locale: "en",
    priceTable: data.priceTable,
    pricingName: `${data.title} Pricing`,
    priceDescription: `Starting from RM ${service?.startPrice ?? 88}`,
  });

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
    datePublished: schemaParity.datePublished,
    dateModified: schemaParity.dateModified,
    inLanguage: schemaParity.inLanguage,
    publisher: schemaParity.publisher,
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
    enhancedFaqs && enhancedFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          datePublished: schemaParity.datePublished,
          dateModified: schemaParity.dateModified,
          inLanguage: schemaParity.inLanguage,
          mainEntity: enhancedFaqs.map((f: { q: string; a: string }) => ({
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
  const serviceStartPrice = service?.startPrice ?? data.startPrice;
  const corePolish = buildServiceCorePolishModule(slug, "en", data.title, serviceStartPrice);
  const croModule = buildServiceCRORefinementModule(slug, "en", data.title);
  const aioBlock = buildServiceAIOAnswerBlock({
    slug,
    locale: "en",
    title: data.title,
    summary: data.aioSummary,
    startPrice: serviceStartPrice,
  });
  const hvacEntityModule = buildServiceHVACEntityModule(slug, "en", data.title);
  const visualSXOModule = buildServiceVisualSXOModule(slug, "en", data.title);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://www.klrenovator.com/services/${slug}#webpage`,
    name: data.title + " KL & Selangor — KL Renovator",
    description: data.tagline,
    url: `https://www.klrenovator.com/services/${slug}`,
    datePublished: schemaParity.datePublished,
    dateModified: schemaParity.dateModified,
    reviewedBy: schemaParity.reviewedBy,
    publisher: schemaParity.publisher,
    inLanguage: schemaParity.inLanguage,
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
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
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
            src={data.heroImage}
            alt={`KL Renovator ${data.title} — KL & Selangor`}
            fill
            priority={true}
            sizes="100vw"
            className="object-cover object-center"
            loading="eager"
            decoding="async"
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

      {/* Pricing */}
      <section id="service-pricing" className="py-14 sm:py-16 bg-slate-50">
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
              <p className="text-xs text-slate-500 mt-0.5">
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
          {data.priceTableNote && (
            <Reveal>
              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <span className="font-black">✓ Included free: </span>
                  {data.priceTableNote}
                </p>
                <NextLink
                  href="/services#materials"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-black text-sky-600 hover:text-sky-800 transition-colors"
                >
                  View Full Materials Pricing & Special Charges →
                </NextLink>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-sky-300">Multi-Unit Bundle Savings</p>
                  <h3 className="mt-1 text-lg font-black uppercase tracking-tight">Book more units in one visit and pay less</h3>
                  <p className="mt-2 max-w-2xl text-sm text-slate-300">
                    Perfect for condominiums, terrace houses, offices and shoplots with multiple aircond units. Discounts apply to eligible labour/service charges and are confirmed before work starts.
                  </p>
                </div>
                <NextLink
                  href="/services#materials"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white/20"
                >
                  View all pricing →
                </NextLink>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {siteConfig.volumeDiscounts.map((discount) => (
                  <div key={discount.units} className="rounded-xl border border-white/15 bg-white/10 p-4 text-center">
                    <p className="text-2xl font-black text-white">{discount.units}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-sky-200">{discount.off}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Inline Materials Pricing — shown directly on installation & dismantling pages */}
          {(slug === "installation" || slug === "dismantling-relocation" || slug === "ceiling-cassette") && (
            <Reveal>
              <div className="mt-10">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
                  Materials Pricing
                </p>
                <h3 className="text-base font-black text-slate-900 mb-4">
                  Additional Materials & Special Charges
                </h3>
                <div className="border border-slate-200 bg-white">
                  <ul className="divide-y divide-slate-200">
                    {siteConfig.pricing.materials.rows.map((row: { label: string; price: string }) => (
                      <li key={row.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
                        <span className="text-sm text-slate-700">{row.label}</span>
                        <span className="text-sm font-bold text-sky-600 whitespace-nowrap">{row.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  All material costs are quoted and confirmed with you before work begins. No surprises.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Expert Review / AEO Direct Answer ─────────────────────────── */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5 sm:p-6">
                <p className="text-xs font-black uppercase tracking-widest text-sky-700">Direct Answer</p>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  Is {data.title} the right service for my aircond?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Yes — if your unit matches the symptoms and pricing table on this page, {data.title} is the recommended service. KL Renovator confirms the exact issue, price and any material cost before work starts, so you can book with a clear budget and no hidden surprises.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-sky-800">
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1.5">Same-day KL & Selangor slots</span>
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1.5">Price confirmed first</span>
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1.5">1-month workmanship warranty</span>
                </div>
              </div>
              <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Expert reviewed</p>
                <p className="mt-2 text-base font-black text-slate-950">KL Renovator&apos;s HVAC Expert Team</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Reviewed for current KL & Selangor pricing, active service scope, supported brands and workmanship warranty details.
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <dt className="font-bold uppercase tracking-wider text-slate-500">Last reviewed</dt>
                    <dd className="mt-1 font-black text-slate-900">3 July 2026</dd>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <dt className="font-bold uppercase tracking-wider text-slate-500">Business</dt>
                    <dd className="mt-1 font-black text-slate-900">SSM Registered</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Trust Signal Strip ─────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 1-Month Workmanship Warranty</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Price Confirmed Before Work</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 500+ 5-Star Google Reviews</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Same-Day Available</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> SSM Registered</span>
        </div>
      </section>

      <section id="service-summary" className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 sm:p-6 shadow-sm">
              <div className="grid gap-5 lg:grid-cols-[1.3fr_0.85fr] lg:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-2">{aioBlock.eyebrow}</p>
                  <h2 className="speakable text-2xl sm:text-3xl font-black tracking-tight text-slate-950">{aioBlock.heading}</h2>
                  <p className="mt-4 text-xs font-black uppercase tracking-widest text-slate-500">{aioBlock.directAnswerLabel}</p>
                  <p className="mt-2 text-base leading-relaxed text-slate-700">{aioBlock.directAnswer}</p>
                  <p className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold leading-relaxed text-emerald-900">
                    {aioBlock.quoteLine}
                  </p>
                </div>
                <aside className="rounded-2xl border border-slate-200 bg-white p-4">
                  <dl className="grid gap-3">
                    {aioBlock.facts.map((fact) => (
                      <div key={fact.label} className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                        <dt className="text-[11px] font-black uppercase tracking-widest text-slate-500">{fact.label}</dt>
                        <dd className="text-right text-sm font-black text-slate-900">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-[11px] leading-relaxed text-slate-500">{aioBlock.sourceLine}</p>
                </aside>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="parts-and-checks" className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-7 max-w-4xl">
              <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-2">{hvacEntityModule.eyebrow}</p>
              <h2 className="speakable text-2xl sm:text-3xl font-black tracking-tight text-slate-950">{hvacEntityModule.heading}</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{hvacEntityModule.intro}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {hvacEntityModule.groups.map((group) => (
                <article key={group.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-black text-slate-950">{group.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.terms.map((term) => (
                      <span key={term} className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800">
                        {term}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.75fr]">
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-700 mb-3">{hvacEntityModule.validationTitle}</p>
                <ul className="grid gap-2 sm:grid-cols-3">
                  {hvacEntityModule.validationPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm font-semibold text-emerald-950">
                      <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-600">
                {hvacEntityModule.note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="service-choice-guide" className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-7 max-w-4xl">
              <p className="text-xs font-black uppercase tracking-widest text-violet-700 mb-2">{visualSXOModule.eyebrow}</p>
              <h2 className="speakable text-2xl sm:text-3xl font-black tracking-tight text-slate-950">{visualSXOModule.heading}</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{visualSXOModule.intro}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.35fr]">
              <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5 sm:p-6">
                <p className="text-xs font-black uppercase tracking-widest text-violet-700 mb-4">{visualSXOModule.decisionTitle}</p>
                <div className="space-y-3">
                  {visualSXOModule.decisionPaths.map((path, i) => (
                    <div key={path.trigger} className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">{i + 1}</span>
                        <div>
                          <p className="text-sm font-bold leading-relaxed text-slate-800">{path.trigger}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-widest">
                            <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-800">{path.action}</span>
                            <FiArrowRight className="h-3 w-3 text-violet-500" />
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">{path.outcome}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">{visualSXOModule.comparisonTitle}</p>
                  <p className="text-[11px] font-black uppercase tracking-widest text-sky-700">{visualSXOModule.compareAgainstLabel}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-4 bg-slate-900 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-white">
                    <span>Criteria</span>
                    <span>This service</span>
                    <span>Compare</span>
                    <span>Decision</span>
                  </div>
                  {visualSXOModule.comparisonRows.map((row, i) => (
                    <div key={row.criterion} className={`grid grid-cols-1 gap-2 border-t border-slate-200 px-4 py-4 text-sm sm:grid-cols-4 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                      <span className="font-black text-slate-950">{row.criterion}</span>
                      <span className="text-slate-700">{row.thisService}</span>
                      <span className="text-slate-600">{row.compareOption}</span>
                      <span className="font-semibold text-sky-800">{row.decision}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-xs font-semibold leading-relaxed text-amber-900">
                  {visualSXOModule.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.45fr] lg:items-start">
              <div className="rounded-3xl border border-sky-100 bg-sky-50 p-5 sm:p-6">
                <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-2">{corePolish.eyebrow}</p>
                <h2 className="speakable text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                  {corePolish.heading}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{corePolish.intro}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white border border-sky-200 px-3 py-1.5 text-xs font-black text-sky-700">{corePolish.priceBadge}</span>
                  <span className="rounded-full bg-white border border-emerald-200 px-3 py-1.5 text-xs font-black text-emerald-700">{corePolish.warrantyBadge}</span>
                </div>
                <div className="mt-6 rounded-2xl bg-white border border-sky-100 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">{corePolish.quickFitTitle}</p>
                  <ul className="space-y-2">
                    {corePolish.quickFit.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                        <FiCheck className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{corePolish.stepsTitle}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {corePolish.steps.map((step, i) => (
                    <div key={step.title} className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-black text-white">{i + 1}</span>
                        <h3 className="text-sm font-black text-slate-950">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">{step.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-700 mb-1">{corePolish.handoverTitle}</p>
                  <p className="text-sm leading-relaxed text-slate-700">{corePolish.handover}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="booking-options" className="py-12 bg-slate-950 text-white border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between mb-6">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-sky-300 mb-2">{croModule.eyebrow}</p>
                <h2 className="speakable text-2xl sm:text-3xl font-black tracking-tight text-white">{croModule.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 max-w-3xl">{croModule.intro}</p>
              </div>
              <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold leading-relaxed text-slate-300 lg:max-w-xs">
                {croModule.reassurance}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {croModule.stages.map((stage) => (
                <a
                  key={stage.id}
                  href={stage.href}
                  target={stage.external ? "_blank" : undefined}
                  rel={stage.external ? "nofollow noopener noreferrer" : undefined}
                  className="group rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-white/[0.09]"
                >
                  <p className="text-[11px] font-black uppercase tracking-widest text-sky-300">{stage.badge}</p>
                  <h3 className="mt-2 text-lg font-black text-white">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{stage.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-950 transition group-hover:gap-2">
                    {stage.actionLabel} <FiArrowRight className="h-3 w-3" />
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Near Me Section ──────────────────────────────────────────────── */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
              {data.title} Near Me — KL &amp; Selangor
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Searching for &quot;{data.title.toLowerCase()} near me&quot;? KL Renovator operates across all KL and Selangor areas with same-day dispatch. Whether you&apos;re in Kuala Lumpur city, Petaling Jaya, Shah Alam, Subang Jaya, Klang, or any Klang Valley suburb, our technicians are already in your area today. WhatsApp your location and we&apos;ll confirm the nearest available slot.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">{data.title.toLowerCase()} near me</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">same day {data.title.toLowerCase()} near me</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">best aircond technician near me</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">aircond service near me klang valley</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Problem-Aware Block — exact symptoms this service fixes ─────── */}
      {(() => {
        const problemSlugs = SERVICE_PROBLEM_MAP[slug] ?? [];
        const problems = problemSlugs.length > 0
          ? siteConfig.problemPages.filter((p) => problemSlugs.includes(p.slug))
          : [];
        if (problems.length === 0) return null;
        return (
          <section id="diagnostic-guides" className="py-14 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-1">Symptom help before booking</p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
                  Still Checking Your Aircond Symptoms? Read These Guides First.
                </h2>
                <p className="text-base text-slate-600 leading-relaxed max-w-3xl mb-6">
                  If you are still unsure what is wrong with your aircond, read the related guides below first. They explain common causes in simple language. When you are ready for professional service, you can book {data.title} directly on this page.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {problems.map((problem) => (
                    <NextLink
                      key={problem.slug}
                      href={`/problems/${problem.slug}`}
                      className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:bg-red-50 transition"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center bg-red-100 text-red-600 rounded-full text-xs font-black">!</span>
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-red-700 transition">{problem.name}</h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{problem.description ? `${problem.description.slice(0, 120)}...` : `Learn what causes ${problem.name.toLowerCase()} and how ${data.title} fixes it.`}</p>
                    </NextLink>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}


      {slug === "basic-servicing" && (
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">
                Affordable Aircond Service · Servis Aircond Murah KL · 便宜冷气保养
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 speakable">
                Affordable Aircond Service KL — RM 99, 1-Month Warranty, 500+ Reviews
              </h2>
              <p className="text-base text-slate-600 leading-relaxed max-w-3xl mb-6">
                Searching &quot;servis aircond murah KL&quot; or &quot;affordable aircond cleaning near me&quot;? KL Renovator&apos;s Basic Servicing starts from just <strong>RM 99</strong> per wall-mounted unit — transparent pricing with no hidden charges. Every service includes a full diagnostic check, filter deep-wash, drain flush, coil spray, electrical safety inspection, and cooling performance test. Backed by a <strong>1-month workmanship warranty</strong> and over <strong>500 five-star Google reviews</strong>, you get genuine value without cutting corners.
              </p>

              {/* Comparison table */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {/* KL Renovator Basic Service */}
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 relative">
                  <span className="absolute -top-3 left-4 bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">Best Value</span>
                  <h3 className="font-black text-emerald-900 text-lg mt-1">KL Renovator Basic Service</h3>
                  <p className="text-3xl font-black text-emerald-700 mt-2">RM 99</p>
                  <ul className="mt-4 space-y-2 text-sm text-emerald-800">
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> 8-point inspection &amp; service</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Filter deep-wash + drain flush</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Coil anti-bacterial spray</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Electrical safety check</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Cooling temperature test</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> 1-month workmanship warranty</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> SSM registered, 500+ 5★ reviews</li>
                  </ul>
                </div>

                {/* Doing Nothing */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                  <h3 className="font-black text-red-900 text-lg">Skipping Regular Service</h3>
                  <p className="text-3xl font-black text-red-400 mt-2">RM 0</p>
                  <p className="text-xs text-red-500 font-bold mt-1">(but costs more later)</p>
                  <ul className="mt-4 space-y-2 text-sm text-red-700">
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Gradual coil clogging</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Higher TNB electricity bill</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Drain blockage → water leaks</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Mould &amp; bacteria buildup</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Risk of compressor damage</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Emergency repair RM 200–500+</li>
                  </ul>
                </div>

                {/* Chemical Wash */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-black text-slate-900 text-lg">Chemical Wash (When Needed)</h3>
                  <p className="text-3xl font-black text-slate-600 mt-2">RM 120</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">For heavy dirt / smell / weak airflow</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><span className="text-slate-500 mt-0.5">→</span> High-pressure 80–120 PSI</li>
                    <li className="flex items-start gap-2"><span className="text-slate-500 mt-0.5">→</span> Deep coil &amp; blower cleaning</li>
                    <li className="flex items-start gap-2"><span className="text-slate-500 mt-0.5">→</span> Dissolves mould &amp; biofilm</li>
                    <li className="flex items-start gap-2"><span className="text-slate-500 mt-0.5">→</span> 60–75 min per unit</li>
                    <li className="flex items-start gap-2"><span className="text-slate-500 mt-0.5">→</span> Recommended every 12 months</li>
                    <li className="flex items-start gap-2"><span className="text-slate-500 mt-0.5">→</span> Best after 12+ months no deep clean</li>
                  </ul>
                </div>
              </div>

              {/* Value summary */}
              <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <h3 className="font-black text-emerald-900 text-lg mb-3">Why RM 99 Basic Servicing is the Smart Choice</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-emerald-800 leading-relaxed">
                      <strong>Prevents expensive repairs:</strong> A clogged drain pipe that could cost RM 200–500 to fix after water damage is caught early with a simple RM 99 drain flush. Loose electrical connections that could damage your compressor are detected and tightened before they cause harm.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-800 leading-relaxed">
                      <strong>Reduces electricity bills:</strong> A dirty evaporator coil forces your compressor to work 15–30% harder. Regular servicing keeps cooling efficient, which means lower monthly TNB bills — often saving more than the service cost itself within 1–2 billing cycles.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <BookingButton serviceName="Basic Servicing" size="md" />
                  <NextLink
                    href="/cuci-aircond-kl"
                    className="inline-flex items-center justify-center rounded-xl border border-emerald-300 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider text-emerald-700 hover:bg-emerald-100 transition"
                  >
                    View Chemical Wash from RM 120 →
                  </NextLink>
                </div>
              </div>

              {/* Keyword tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 text-xs font-bold rounded-full border border-emerald-200">servis aircond murah KL</span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 text-xs font-bold rounded-full border border-emerald-200">affordable aircond service kl</span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 text-xs font-bold rounded-full border border-emerald-200">aircond service price KL 2026</span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 text-xs font-bold rounded-full border border-emerald-200">cuci aircond murah selangor</span>
              </div>
            </Reveal>
          </div>
        </section>
      )}

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

      {/* Real Work Proof */}
      <section className="py-14 sm:py-16 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <p className={eyebrow()}>Real Work Proof · Bukti Kerja · 真实施工</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>See How Our </span>
                <span className={title({ size: "sm", color: "brand" })}>Technicians Work</span>
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Real KL Renovator job photos help customers understand the workmanship standard before booking: protected indoor work, correct tools, clean handling and service-specific proof from homes, condos, offices and shoplots around KL & Selangor.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {proofImages.map((img, i) => (
              <Reveal key={img.src} delay={i * 80}>
                <figure className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all">
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className="p-4">
                    <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">{img.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{img.alt}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-100 bg-white p-5 text-center">
                <p className="text-2xl font-black text-emerald-600">1-Month</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-600">Workmanship warranty</p>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-white p-5 text-center">
                <p className="text-2xl font-black text-sky-600">500+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-600">Google 5-star reviews</p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-white p-5 text-center">
                <p className="text-2xl font-black text-amber-600">SSM</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-600">Registered Malaysian business</p>
              </div>
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

      {/* Contextual Guides — in-body blog links, not only bottom cards */}
      {(() => {
        const contextualSlugs = SERVICE_BLOG_MAP_V2[slug] ?? SERVICE_BLOG_MAP[slug] ?? [];
        const contextualPosts = allPosts.filter((p) => contextualSlugs.includes(p.slug)).slice(0, 3);
        if (contextualPosts.length === 0) return null;
        return (
          <section className="py-10 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
                  Before You Book · Sebelum Tempah · 预约前先看
                </p>
                <h2 className="text-base font-black text-slate-900 mb-3">
                  Helpful guides customers read before booking {data.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  If you're comparing service options, pricing, or symptoms before choosing {data.title.toLowerCase()}, start with{" "}
                  {contextualPosts.map((post, index) => (
                    <span key={post.slug}>
                      <NextLink href={`/blog/${post.slug}`} className="font-bold text-sky-600 hover:text-sky-800 underline underline-offset-2">
                        {post.title}
                      </NextLink>
                      {index < contextualPosts.length - 2 ? ", " : index === contextualPosts.length - 2 ? " and " : ""}
                    </span>
                  ))}
                  . These explain the decision points customers ask us about most on WhatsApp before confirming a booking.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {contextualPosts.map((post) => (
                    <NextLink
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-400 hover:bg-white hover:shadow-sm"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{post.category}</p>
                      <h3 className="text-sm font-black text-slate-900 leading-snug">{post.title}</h3>
                      <p className="mt-2 text-xs text-slate-500 line-clamp-3">{post.excerpt}</p>
                    </NextLink>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

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
            {enhancedFaqs.map((f: { q: string; a: string }, i: number) => (
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
          {enhancedFaqsBM && enhancedFaqsBM.length > 0 && (
            <Reveal>
              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">🇲🇾 Bahasa Malaysia</p>
                <div className="space-y-3">
                  {enhancedFaqsBM.map((f: { q: string; a: string }, i: number) => (
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
          {enhancedFaqsZH && enhancedFaqsZH.length > 0 && (
            <Reveal>
              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">🇨🇳 中文</p>
                <div className="space-y-3">
                  {enhancedFaqsZH.map((f: { q: string; a: string }, i: number) => (
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

      {/* ── Geographic Coverage — KL, Selangor, Klang Valley ─────────────── */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
              Aircond Service Kuala Lumpur &amp; Selangor — Klang Valley Coverage
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              We provide {data.title.toLowerCase()} across the entire Klang Valley metropolitan area. From Kuala Lumpur&apos;s CBD to every Selangor township, our mobile technicians carry the tools, parts, and refrigerant gas needed to complete most jobs in a single visit. No travel charges — you pay only for the service.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Aircond Service Kuala Lumpur</h3>
                <p className="text-xs text-slate-500">Full KL coverage — all townships and condo districts. Same-day slots available.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Aircond Repair Klang Valley</h3>
                <p className="text-xs text-slate-500">Emergency repair dispatch across the entire Klang Valley. 30–60 min response.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Aircond Service Selangor</h3>
                <p className="text-xs text-slate-500">All Selangor districts covered — Petaling, Gombak, Hulu Langat, Klang, Sepang.</p>
              </div>
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

      {/* ── Same-Day Urgency Banner ──────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-sky-200 mb-1">Available Today · Tersedia Hari Ini · 今日可上门</p>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              Need {data.title} Today?
            </h2>
            <p className="text-sky-100 text-sm mt-1">
              Same-day slots available Mon–Sun across all KL & Selangor. WhatsApp for fastest dispatch.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <BookingButton serviceName={data.title} size="md" />
          </div>
        </div>
      </section>

      {/* ── Competitor Differentiator ─────────────────────────────────────── */}
      <section className="py-12 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Why KL Renovator</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Why Customers Choose Us Over Others
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Mengapa Pelanggan Memilih Kami · 为什么客户选择我们
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "💰", title: "Transparent Pricing", ms: "Harga Telus", zh: "价格透明", desc: "Full price confirmed before work starts. No hidden charges, no surprise additions. What we quote is what you pay." },
              { icon: "📋", title: "Quote Before Work", ms: "Sebut Harga Dahulu", zh: "施工前报价", desc: "We diagnose first, quote second, work third. You approve every cost before our wrench touches your unit." },
              { icon: "🔧", title: "Trained Technicians", ms: "Juruteknik Terlatih", zh: "训练有素的技术员", desc: "Every technician is trained and experienced in all brands and unit types. We bring the right tools and parts." },
              { icon: "⭐", title: "500+ 5-Star Reviews", ms: "500+ Ulasan Bintang 5", zh: "500+五星好评", desc: "Our track record speaks for itself. 5,000+ customers served across KL and Selangor with consistent 5-star results." },
              { icon: "🛡️", title: "1-Month Warranty", ms: "Waranti 1 Bulan", zh: "一个月保修", desc: "All workmanship covered for 1 month. Parts covered for 3 months. If an issue recurs within warranty, we return free." },
              { icon: "🚀", title: "Same-Day Service", ms: "Servis Hari Sama", zh: "当天服务", desc: "WhatsApp us your location and problem. We confirm a same-day slot in minutes for most areas across Klang Valley." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-5">
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="font-black text-slate-900 text-sm mb-0.5">{item.title}</h3>
                <p className="text-[10px] text-slate-500 font-semibold mb-2">{item.ms} · {item.zh}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Also Consider — Cross-Service Links ──────────────────────────── */}
      {(() => {
        const crossSlugs = CROSS_SERVICE_MAP[slug] ?? [];
        const crossServices = siteConfig.services.filter((s) => crossSlugs.includes(s.slug));
        if (crossServices.length === 0) return null;
        return (
          <section className="py-10 px-4 bg-white border-t border-slate-100">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Also Consider · Pertimbangkan Juga · 也考虑</p>
              <h2 className="text-base font-black text-slate-900 mb-4">Related Services You May Need</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {crossServices.map((s) => (
                  <NextLink
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group bg-slate-50 border border-slate-200 hover:border-sky-300 hover:shadow-sm rounded-2xl p-4 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors">{s.title}</h3>
                      <FiArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-sky-500 transition-colors shrink-0" />
                    </div>
                    <p className="text-xs text-sky-700 font-black">from RM {s.startPrice}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{s.short}</p>
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
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
              {t("problemsFixed", "en")} · {t("problemsFixed", "ms")} · {t("problemsFixed", "zh")}
            </p>
            <h2 className="text-base font-black text-slate-900 mb-4">
              Problems This Service Fixes
            </h2>
            <div className="flex flex-wrap gap-2">
              {(() => {
                const specificSlugs = SERVICE_PROBLEM_MAP[slug] ?? [];
                const specificProblems = specificSlugs.length > 0
                  ? siteConfig.problemPages.filter((p) => specificSlugs.includes(p.slug))
                  : siteConfig.problemPages.slice(0, 8);
                return specificProblems.map((problem) => (
                  <NextLink
                    key={problem.slug}
                    href={`/problems/${problem.slug}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition rounded-xl"
                  >
                    <FiArrowRight className="h-3 w-3 text-red-400 shrink-0" />
                    {problem.name}
                    <span className="text-slate-500 font-normal"> · {problem.nameMS}</span>
                  </NextLink>
                ));
              })()}
              <NextLink
                href="/problems"
                className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-black text-red-700 hover:bg-red-100 transition rounded-xl"
              >
                All Aircond Problems →
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Blog Articles */}
      {(() => {
        const relatedSlugs = (SERVICE_BLOG_MAP_V2[slug] ?? SERVICE_BLOG_MAP[slug] ?? []);
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

      {/* Gallery + Near Me Hub — orphan-link fix */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Proof + Coverage · Bukti + Liputan · 真实案例 + 覆盖范围
            </p>
            <h2 className="text-lg font-black text-slate-900 mb-6">
              See Real Before &amp; After Results and Check Same-Day Coverage Near You
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <NextLink
                href="/gallery"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
                  Before &amp; After Gallery
                </p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  See real KL Renovator job photos before you book
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  View real chemical wash, overhaul, installation and repair results from homes, condos, offices and shoplots across KL &amp; Selangor.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  View Gallery <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>

              <NextLink
                href="/near-me"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
                  Near Me Hub
                </p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  Check same-day aircond service availability near you
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Use our Klang Valley near-me hub to confirm nearby coverage, compare areas, and choose the fastest route to WhatsApp booking.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  Open Near Me Page <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

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
                <p className="mt-0.5 text-sm text-slate-500 font-medium">
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
}lery + Near Me Hub — orphan-link fix */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Proof + Coverage · Bukti + Liputan · 真实案例 + 覆盖范围
            </p>
            <h2 className="text-lg font-black text-slate-900 mb-6">
              See Real Before &amp; After Results and Check Same-Day Coverage Near You
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <NextLink
                href="/gallery"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
                  Before &amp; After Gallery
                </p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  See real KL Renovator job photos before you book
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  View real chemical wash, overhaul, installation and repair results from homes, condos, offices and shoplots across KL &amp; Selangor.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  View Gallery <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>

              <NextLink
                href="/near-me"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
                  Near Me Hub
                </p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  Check same-day aircond service availability near you
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Use our Klang Valley near-me hub to confirm nearby coverage, compare areas, and choose the fastest route to WhatsApp booking.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  Open Near Me Page <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

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
                <p className="mt-0.5 text-sm text-slate-500 font-medium">
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