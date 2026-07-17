import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight, FiMapPin } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import {
  resolveLandmarkLink,
  getAreaNeighbourhoodLinks,
  getRelatedNeighbourhoodLinks,
} from "@/config/area-internal-links";
import { allPosts } from "@/config/blog-posts";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { buildAreaServedSchema, buildServiceAreaGeoCircle } from "@/lib/seo";
import { AREA_PROBLEM_MAP, AREA_BLOG_MAP } from "@/config/topical-authority-map";
import { getFreshDate } from "@/lib/dates";
import { buildUniqueAreaFAQ_EN } from "@/config/area-faq-uniqueness";
import { clampMetaTitle, buildAreaMetaTitleWithDate } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";


// Helper to match area to a real work photo from /public/hero
function getAreaImage(areaName: string, slug: string) {
  const imagePool = [
    "/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp",
    "/hero/acson-aircond-chemical-overhaul-puchong-38.webp",
    "/hero/acson-aircond-chemical-wash-shah-alam-49.webp",
    "/hero/acson-aircond-gas-topup-r32-subang-jaya-27.webp",
    "/hero/acson-aircond-gas-topup-r410a-petaling-jaya-16.webp",
    "/hero/acson-aircond-pcb-board-repair-klang-71.webp",
    "/hero/acson-aircond-water-leaking-fix-shah-alam-60.webp",
    "/hero/aircond-bracket-installation-kl-renovator.webp",
    "/hero/aircond-ceiling-cassette-installation-commercial.webp",
    "/hero/aircond-chemical-overhaul-ampang-selangor.webp",
    "/hero/aircond-chemical-service-canvas-wrap-kl.webp",
    "/hero/aircond-chemical-wash-canvas-kepong-kl.webp",
    "/hero/aircond-compressor-bracket-installation-kl.webp",
    "/hero/aircond-compressor-flaring-repair-kl.webp",
    "/hero/aircond-compressor-installation-new-kl.webp",
    "/hero/aircond-gas-topup-r32-r410a-selangor.webp",
    "/hero/aircond-installation-ampang-selangor.webp",
    "/hero/aircond-installation-double-unit-kl.webp",
    "/hero/aircond-installation-kuala-lumpur.webp",
    "/hero/aircond-installation-wall-mounted-kl.webp",
    "/hero/aircond-new-compressor-installation-rawang.webp",
    "/hero/aircond-new-installation-petaling-jaya.webp",
    "/hero/aircond-new-installation-rawang-selangor.webp",
    "/hero/aircond-pcb-board-replacement-2-klang-valley.webp",
    "/hero/aircond-pcb-board-replacement-kl.webp",
    "/hero/aircond-pressure-chemical-wash-selangor.webp",
    "/hero/aircond-repair-technician-klang-valley.webp",
    "/hero/aircond-sensor-replacement-klang-valley.webp",
    "/hero/aux-aircond-basic-servicing-shah-alam-53.webp",
    "/hero/aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp",
    "/hero/aux-aircond-dismantle-relocation-kuala-lumpur-9.webp",
    "/hero/aux-aircond-gas-topup-r410a-klang-64.webp",
    "/hero/aux-aircond-new-installation-subang-jaya-31.webp",
    "/hero/aux-aircond-troubleshooting-repair-puchong-42.webp",
    "/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp",
    "/hero/daikin-aircond-chemical-wash-kuala-lumpur-1.webp",
    "/hero/daikin-aircond-compressor-replacement-subang-jaya-34.webp",
    "/hero/daikin-aircond-dismantle-relocation-puchong-45.webp",
    "/hero/daikin-aircond-new-installation-klang-67.webp",
    "/hero/daikin-aircond-pcb-board-repair-petaling-jaya-23.webp",
    "/hero/daikin-aircond-water-leaking-fix-kuala-lumpur-12.webp",
    "/hero/isonic-aircond-ceiling-cassette-service-puchong-44.webp",
    "/hero/isonic-aircond-compressor-replacement-petaling-jaya-22.webp",
    "/hero/isonic-aircond-dismantle-relocation-subang-jaya-33.webp",
    "/hero/isonic-aircond-new-installation-shah-alam-55.webp",
    "/hero/isonic-aircond-pcb-board-repair-kuala-lumpur-11.webp",
    "/hero/isonic-aircond-troubleshooting-repair-klang-66.webp",
    "/hero/lg-aircond-basic-servicing-subang-jaya-29.webp",
    "/hero/lg-aircond-chemical-overhaul-klang-62.webp",
    "/hero/lg-aircond-gas-topup-r32-shah-alam-51.webp",
    "/hero/lg-aircond-gas-topup-r410a-puchong-40.webp",
    "/hero/lg-aircond-new-installation-kuala-lumpur-7.webp",
    "/hero/lg-aircond-troubleshooting-repair-petaling-jaya-18.webp",
    "/hero/midea-aircond-basic-servicing-petaling-jaya-17.webp",
    "/hero/midea-aircond-chemical-overhaul-shah-alam-50.webp",
    "/hero/midea-aircond-chemical-wash-klang-61.webp",
    "/hero/midea-aircond-gas-topup-r32-puchong-39.webp",
    "/hero/midea-aircond-gas-topup-r410a-subang-jaya-28.webp",
    "/hero/midea-aircond-troubleshooting-repair-kuala-lumpur-6.webp",
    "/hero/midea-aircond-water-leaking-fix-klang-72.webp",
    "/hero/mitsubishi-aircond-chemical-overhaul-petaling-jaya-14.webp",
    "/hero/mitsubishi-aircond-chemical-wash-subang-jaya-25.webp",
    "/hero/mitsubishi-aircond-compressor-replacement-shah-alam-58.webp",
    "/hero/mitsubishi-aircond-dismantle-relocation-klang-69.webp",
    "/hero/mitsubishi-aircond-gas-topup-r32-kuala-lumpur-3.webp",
    "/hero/mitsubishi-aircond-pcb-board-repair-puchong-47.webp",
    "/hero/mitsubishi-aircond-water-leaking-fix-subang-jaya-36.webp",
    "/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp",
    "/hero/panasonic-aircond-chemical-overhaul-kuala-lumpur-2.webp",
    "/hero/panasonic-aircond-chemical-wash-petaling-jaya-13.webp",
    "/hero/panasonic-aircond-compressor-replacement-puchong-46.webp",
    "/hero/panasonic-aircond-dismantle-relocation-shah-alam-57.webp",
    "/hero/panasonic-aircond-pcb-board-repair-subang-jaya-35.webp",
    "/hero/panasonic-aircond-water-leaking-fix-petaling-jaya-24.webp",
    "/hero/samsung-aircond-basic-servicing-puchong-41.webp",
    "/hero/samsung-aircond-ceiling-cassette-service-kuala-lumpur-8.webp",
    "/hero/samsung-aircond-gas-topup-r32-klang-63.webp",
    "/hero/samsung-aircond-gas-topup-r410a-shah-alam-52.webp",
    "/hero/samsung-aircond-new-installation-petaling-jaya-19.webp",
    "/hero/samsung-aircond-troubleshooting-repair-subang-jaya-30.webp",
    "/hero/tcl-aircond-basic-servicing-klang-65.webp",
    "/hero/tcl-aircond-ceiling-cassette-service-subang-jaya-32.webp",
    "/hero/tcl-aircond-compressor-replacement-kuala-lumpur-10.webp",
    "/hero/tcl-aircond-dismantle-relocation-petaling-jaya-21.webp",
    "/hero/tcl-aircond-new-installation-puchong-43.webp",
    "/hero/tcl-aircond-troubleshooting-repair-shah-alam-54.webp",
    "/hero/york-aircond-chemical-overhaul-subang-jaya-26.webp",
    "/hero/york-aircond-chemical-wash-puchong-37.webp",
    "/hero/york-aircond-compressor-replacement-klang-70.webp",
    "/hero/york-aircond-gas-topup-r32-petaling-jaya-15.webp",
    "/hero/york-aircond-gas-topup-r410a-kuala-lumpur-4.webp",
    "/hero/york-aircond-pcb-board-repair-shah-alam-59.webp",
    "/hero/york-aircond-water-leaking-fix-puchong-48.webp",
  ];

  const nameLower = areaName.toLowerCase();
  const slugLower = slug.toLowerCase();
  
  const matched = imagePool.find(img => 
    img.toLowerCase().includes(nameLower) || 
    img.toLowerCase().includes(slugLower)
  );
  
  return matched || "/hero/aircond-installation-kuala-lumpur.webp";
}

export function generateStaticParams() {
  return siteConfig.areaPages.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = siteConfig.areaPages.find((a) => a.slug === slug);
  if (!area) return { title: "Area not found" };

  const freshDate = getFreshDate();
  const rawMetaTitle = area.metaTitle.includes("—") 
    ? `${area.metaTitle.split(" — ")[0]} ${freshDate} — ${area.metaTitle.split(" — ")[1]}`
    : `${area.metaTitle} — ${freshDate}`;
  const metaTitle = clampMetaTitle(buildAreaMetaTitleWithDate(area.metaTitle, freshDate));

  const enUrl = `https://www.klrenovator.com/areas/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/areas/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/areas/${slug}`;
  const hasMs = area.faqsBM?.length > 0;
  const hasZh = area.faqsZH?.length > 0;

  return {
    title: metaTitle,
    description: clampMetaDescription(area.metaDesc),
    openGraph: {
      title: area.metaTitle,
      description: clampMetaDescription(area.metaDesc),
      url: enUrl,
      type: "website",
      locale: "en_MY",
      alternateLocale: ["ms_MY", "zh_MY"],
    },
    alternates: {
      canonical: enUrl,
      languages: {
        "en-MY": enUrl,
        ...(hasMs ? { "ms-MY": msUrl } : {}),
        ...(hasZh ? { "zh-MY": zhUrl } : {}),
        "x-default": enUrl,
      },
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = siteConfig.areaPages.find((a) => a.slug === slug);
  if (!area) notFound();

  // ── Schema: references the main #business entity as provider ──────────────
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: siteConfig.name,
    legalName: siteConfig.parentCompany,
    url: `https://www.klrenovator.com/areas/${slug}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: area.description,
    image: "https://www.klrenovator.com/logo/image.png",
    logo: "https://www.klrenovator.com/logo/image.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: area.name,
      addressRegion: area.state,
      addressCountry: "MY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: area.lat,
      longitude: area.lng,
    },
    // Round 18 / 20H.84: keep area page LocalBusiness schema
    // aligned with the homepage entity by listing the full Klang Valley
    // service footprint, not only the current landing-page city.
    areaServed: [
      ...buildAreaServedSchema(),
      buildServiceAreaGeoCircle(),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviewRating,
      reviewCount: siteConfig.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: "RM 88 – RM 2,000",
    currenciesAccepted: "MYR",
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.googleBusiness,
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `https://www.klrenovator.com/areas/${slug}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.klrenovator.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: "https://www.klrenovator.com/areas",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Aircond Service ${area.name}`,
        item: `https://www.klrenovator.com/areas/${slug}`,
      },
    ],
  };

  // 9.10 Schema Uniqueness Pass — build unique FAQ schema per area using area-specific faqs + landmark-aware Near Me variants
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: buildUniqueAreaFAQ_EN(area as any),
  };

  const otherAreas = siteConfig.areaPages.filter((a) => a.slug !== slug).slice(0, 12);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://www.klrenovator.com/areas/${slug}#webpage`,
    name: `Aircond Service ${area.name} — KL Renovator`,
    description: clampMetaDescription(area.metaDesc),
    url: `https://www.klrenovator.com/areas/${slug}`,
    inLanguage: "en-MY",
    isPartOf: { "@id": "https://www.klrenovator.com/#website" },
    about: { "@id": "https://www.klrenovator.com/#business" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".speakable"],
    },
    breadcrumb: { "@id": `https://www.klrenovator.com/areas/${slug}#breadcrumb` },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/" className="hover:text-sky-600 transition">Home</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/areas" className="hover:text-sky-600 transition">Service Areas</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Aircond Service {area.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src={getAreaImage(area.name, slug)}
            alt={`Aircond service technician working on an air conditioning unit in ${area.name}, KL & Selangor`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5">
                  <FiMapPin className="h-3 w-3" />
                  {area.state}
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
                  Aircond Service{" "}
                  <span className="text-sky-500">{area.name}</span>
                </h1>
                <p className="mt-4 text-lg text-slate-600 max-w-xl leading-relaxed">
                  {area.description}
                </p>

                {/* Landmarks — linked to dedicated kampung pages, or to another
                    top-level area page, where a real match exists */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.landmarks.map((lm) => {
                    const resolved = resolveLandmarkLink(lm, slug, "en");
                    if (resolved) {
                      return (
                        <NextLink
                          key={lm}
                          href={resolved.href}
                          className="text-xs font-bold bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-200 hover:bg-sky-100 transition"
                        >
                          {lm}
                        </NextLink>
                      );
                    }
                    return (
                      <span
                        key={lm}
                        className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200"
                      >
                        {lm}
                      </span>
                    );
                  })}
                </div>

                {/* Dedicated neighbourhood pages for this area (+ nearby if few children) */}
                {(() => {
                  const neighbourhoods = getAreaNeighbourhoodLinks(slug, "en");
                  const related = neighbourhoods.length >= 4 ? [] : getRelatedNeighbourhoodLinks(slug, "en", 8);
                  const links = neighbourhoods.length > 0 ? neighbourhoods : related;
                  if (links.length === 0) return null;
                  return (
                  <div className="mt-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      {neighbourhoods.length > 0 ? "Neighbourhood Guides" : "Nearby Neighbourhood Guides"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {links.map((k) => (
                          <NextLink
                            key={`${k.parentSlug}-${k.slug}`}
                            href={k.href}
                            className="inline-flex items-center gap-1 text-xs font-black text-sky-600 hover:text-sky-800 underline"
                          >
                            {k.label}
                          </NextLink>
                        ))}
                    </div>
                  </div>
                  );
                })()}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <BookingButton serviceName={`Aircond Service ${area.name}`} size="lg" />
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-sky-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-slate-700 hover:text-sky-600 transition rounded-xl"
                  >
                    Call {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-white border-2 border-sky-100 shadow-sm p-6 sm:p-8">
                <p className={eyebrow()}>Quick Facts — {area.name}</p>
                <ul className="mt-5 space-y-3">
                  {[
                    `Serving all of ${area.name} & surrounding areas`,
                    "Same-day booking available — call or WhatsApp",
                    "All major brands: Daikin, Panasonic, Mitsubishi & more",
                    "Transparent pricing — no hidden charges",
                    "1-month workmanship warranty on all work",
                    "Emergency after-hours service (6PM–10PM, +RM50)",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center bg-sky-500 text-white mt-0.5 rounded-sm">
                        <FiCheck className="h-3 w-3" />
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Hi KL Renovator, I need aircond service in ${area.name}. Please advise.`)}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wider text-xs px-4 py-3.5 rounded-xl transition-all"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  WhatsApp for {area.name} Service
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust Signal Strip */}
      <section className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Same-Day Available</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> All Brands Serviced</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Price Confirmed Before Work</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 1-Month Workmanship Warranty</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 500+ 5-Star Reviews</span>
        </div>
      </section>

      {/* ── Near Me Section ─────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Aircond Service Near Me in {area.name} — Same-Day Booking
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
              If you searched &quot;aircond service near me&quot; and landed here, you&apos;re in the right place. KL Renovator dispatches trained technicians to {area.name} and surrounding neighbourhoods every day. We handle everything from basic servicing and chemical wash to emergency repairs and gas top-ups — all with transparent pricing and a 1-month workmanship warranty. WhatsApp us now and we&apos;ll confirm your slot within minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">
                aircond service near me {area.name}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">
                same day aircond repair near me
              </span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">
                best aircond technician near me
              </span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">
                aircond chemical wash near me
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Aircond Not Cold / Tak Sejuk — Per-Area Intent Section — Round 28 / 20F.57 ── */}
      <section className="py-14 bg-red-50 border-y border-red-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-1">
              Troubleshooting · Diagnosis · 故障排除
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 speakable">
              Aircond Tak Sejuk di {area.name}? Here&apos;s What to Check
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-3xl mb-6">
              &quot;Aircond tak sejuk di {area.name}&quot; is one of the most common searches from this area. If your aircond is running but not cooling, here are the top causes KL Renovator technicians find every day in {area.name} and the Klang Valley:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  problem: "Dirty Evaporator Coil",
                  problemMS: "Gegelung Penyejat Kotor",
                  problemZH: "蒸发器盘管脏污",
                  desc: `The #1 cause in ${area.name}. KL's humidity and dust clog the coil fins, reducing airflow by 30–50%. Fix: pressure chemical wash from RM 120.`,
                  fix: "Chemical Wash",
                  price: "RM 120",
                },
                {
                  problem: "Low Refrigerant Gas",
                  problemMS: "Gas Penyejuk Rendah",
                  problemZH: "冷媒不足",
                  desc: "If the unit runs but blows warm air, gas may be low. This means there's a leak — simply topping up without finding the leak wastes money. Fix: leak check + gas top-up from RM 150.",
                  fix: "Gas Top-Up",
                  price: "RM 150",
                },
                {
                  problem: "Blocked Drain Pipe",
                  problemMS: "Paip Longkang Tersumbat",
                  problemZH: "排水管堵塞",
                  desc: `Common in ${area.name} during monsoon season. Biofilm buildup blocks drainage, causing water leaks and ice formation. Fix: drain flush included in basic service from RM 99.`,
                  fix: "Basic Service",
                  price: "RM 99",
                },
                {
                  problem: "Compressor Not Running",
                  problemMS: "Pemampat Tidak Berfungsi",
                  problemZH: "压缩机不运转",
                  desc: "If the indoor fan runs but outdoor unit is silent, the compressor or capacitor may have failed. This needs on-site diagnosis. Fix: repair from RM 150 + parts.",
                  fix: "Repair",
                  price: "RM 150+",
                },
                {
                  problem: "Thermostat Miscalibrated",
                  problemMS: "Termostat Tidak Tepat",
                  problemZH: "温控器校准偏差",
                  desc: "The unit thinks the room is colder than it is, so it cycles off too early. Common in older non-inverter units. Fix: thermostat recalibration during service.",
                  fix: "Basic Service",
                  price: "RM 99",
                },
                {
                  problem: "Wrong HP for Room Size",
                  problemMS: "HP Tidak Sesuai Saiz Bilik",
                  problemZH: "HP与房间大小不匹配",
                  desc: `A 1.0 HP unit in a large master bedroom will never cool properly in ${area.name}'s 33°C heat. If you just moved in, check if the previous owner undersized the unit.`,
                  fix: "Consultation",
                  price: "Free",
                },
              ].map((item) => (
                <div key={item.problem} className="bg-white border border-red-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-slate-900 text-sm">{item.problem}</h3>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{item.price}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold mb-2">{item.problemMS} · {item.problemZH}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  <NextLink
                    href={`/services/${item.fix === "Chemical Wash" ? "chemical-wash" : item.fix === "Gas Top-Up" ? "gas-topup" : item.fix === "Repair" ? "repair" : "basic-servicing"}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-black text-sky-600 hover:text-sky-800 transition"
                  >
                    {item.fix} Service <FiArrowRight className="h-3 w-3" />
                  </NextLink>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <BookingButton serviceName={`Aircond Troubleshooting ${area.name}`} size="md" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Geographic Coverage — KL, Selangor, Klang Valley ─────────────── */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Klang Valley Aircond Repair & Service — KL & Selangor Coverage
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
              {area.name} sits within the greater Klang Valley corridor, and KL Renovator&apos;s service network covers the full stretch from Kuala Lumpur city centre through every Selangor suburb. Whether you need routine aircond service in Kuala Lumpur, urgent aircond repair in Klang Valley, or a full chemical overhaul in Selangor, our technicians are already working in your area today. We carry common spare parts, refrigerant gas, and cleaning chemicals on every van — so most jobs are completed in a single visit.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Aircond Service Kuala Lumpur</h3>
                <p className="text-xs text-slate-500">Full KL coverage including {area.name} and all adjoining neighbourhoods. Same-day slots available.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Aircond Repair Klang Valley</h3>
                <p className="text-xs text-slate-500">Emergency repair dispatch across the entire Klang Valley metropolitan area. 30–60 min response.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Aircond Service Selangor</h3>
                <p className="text-xs text-slate-500">All Selangor districts covered including Petaling, Gombak, Hulu Langat, Klang, and Sepang.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Available in This Area */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Available in {area.name}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>All Our </span>
                <span className={title({ size: "sm", color: "brand" })}>HVAC Services</span>
              </h2>
              <p className="mt-3 text-slate-500 font-medium max-w-2xl mx-auto">
                We dispatch trained technicians to {area.name} for all of the following services — same-day slots available.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.services.filter((s) => s.slug !== "emergency").map((service, i) => (
              <Reveal key={service.slug} delay={i * 40}>
                <NextLink
                  href={`/services/${service.slug}`}
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-sky-200 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
                      From RM {service.startPrice}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-sm leading-snug mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed flex-grow">
                    {service.short}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sky-600 text-xs font-black uppercase tracking-wider">
                    View Details <FiArrowRight className="h-3 w-3" />
                  </div>
                </NextLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Quick Reference */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Price Reference</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Aircond Service Prices in </span>
                <span className={title({ size: "sm", color: "brand" })}>{area.name}</span>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-sky-600 px-6 py-4">
                <p className="text-white font-black text-sm uppercase tracking-widest">
                  Standard Pricing — {area.name} (All Prices in RM)
                </p>
              </div>
              <ul className="divide-y divide-slate-100">
                {[
                  { service: "Basic Servicing (1.0–1.5 HP)", price: "RM 99" },
                  { service: "Basic Servicing (2.0–2.5 HP)", price: "RM 120" },
                  { service: "Pressure Chemical Wash (1.0–1.5 HP)", price: "RM 120" },
                  { service: "Pressure Chemical Wash (2.0–2.5 HP)", price: "RM 150" },
                  { service: "Pressure Chemical Wash (3.0 HP)", price: "RM 180" },
                  { service: "Pressure Chemical Wash (4.0–5.0 HP)", price: "RM 200" },
                  { service: "Chemical Overhaul (1.0–1.5 HP)", price: "RM 220" },
                  { service: "Chemical Overhaul (2.0–2.5 HP)", price: "RM 280" },
                  { service: "Gas Top-Up R22 (1.0 HP)", price: "RM 120" },
                  { service: "Gas Top-Up R410A (1.0 HP)", price: "RM 150" },
                  { service: "Gas Top-Up R32 (1.0 HP)", price: "RM 180" },
                  { service: "Diagnostic / Troubleshooting", price: "RM 88 (waived with repair)" },
                  { service: "New Installation (1.0–1.5 HP)", price: "From RM 199" },
                ].map((row) => (
                  <li
                    key={row.service}
                    className="flex items-center justify-between gap-4 px-6 py-3.5 hover:bg-sky-50/40 transition-colors"
                  >
                    <span className="text-sm text-slate-600 font-medium">{row.service}</span>
                    <span className="text-sm font-black text-sky-700 whitespace-nowrap bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                      {row.price}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex flex-wrap items-center gap-3">
                <p className="text-xs text-slate-500 font-medium flex-1">
                  * Prices are for labour. Materials (copper pipe, gas, casing) quoted separately before work begins.
                </p>
                <a
                  href={waLink(`Hi KL Renovator, I need a quote for aircond service in ${area.name}.`)}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all"
                >
                  <FaWhatsapp className="h-3.5 w-3.5" /> Get Exact Quote
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contextual Guides — in-body blog links for area pages */}
      {(() => {
        const contextualSlugs = AREA_BLOG_MAP[slug] ?? AREA_BLOG_MAP["_default"];
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
                  Helpful aircond guides people in {area.name} read before booking
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Customers in {area.name} often check these guides before they WhatsApp us for a quote, especially when deciding between repair, chemical wash, servicing intervals, or installation costs.
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

      {/* FAQ Section — area-specific + BM + ZH */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>FAQ · Soalan Lazim · 常见问题</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Aircond Service </span>
                <span className={title({ size: "sm", color: "brand" })}>{area.name} — FAQ</span>
              </h2>
            </div>
          </Reveal>

          {/* English FAQs — area-specific if available, else generic */}
          <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden mb-6">
            {(area.faqs?.length > 0 ? area.faqs : [
              { q: `Does KL Renovator service aircond in ${area.name}?`, a: `Yes — KL Renovator provides full aircond servicing across all of ${area.name}, ${area.state}. Services include chemical wash, chemical overhaul, gas top-up, repairs and new installations. WhatsApp +60182983573 to book.` },
              { q: `How much does aircond chemical wash cost in ${area.name}?`, a: `Pressure chemical wash in ${area.name} starts from RM 120 (1.0–1.5 HP), RM 150 (2.0–2.5 HP), RM 180 (3.0 HP). Ceiling cassette from RM 220. All prices confirmed before work.` },
              { q: `Is same-day aircond service available in ${area.name}?`, a: `Yes — same-day slots are frequently available in ${area.name}. WhatsApp +60182983573 in the morning to secure your slot. Mon–Sun, 9AM–6PM.` },
              { q: `Which aircond brands do you service in ${area.name}?`, a: `All major brands in ${area.name} — Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Acson, Sharp, Toshiba and Haier. Inverter and non-inverter.` },
            ]).map((faq: any, i: number) => (
              <Reveal key={i} delay={i * 60}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    {faq?.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq?.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          {/* BM FAQs */}
          {area.faqsBM?.length > 0 && (
            <Reveal>
              <div className="mt-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇲🇾 Bahasa Malaysia</p>
                <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                  {area.faqsBM.map((faq: { q: string; a: string }, i: number) => (
                    <details key={i} className="group bg-white p-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                        {faq.q}
                        <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                      </summary>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* ZH FAQs */}
          {area.faqsZH?.length > 0 && (
            <Reveal>
              <div className="mt-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇨🇳 中文</p>
                <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                  {area.faqsZH.map((faq: { q: string; a: string }, i: number) => (
                    <details key={i} className="group bg-white p-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                        {faq.q}
                        <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                      </summary>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Near Me FAQs — AEO/GEO targeted */}
          <Reveal>
            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">📍 Near Me · Berhampiran Saya · 附近</p>
              <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    Is there an aircond service near me in {area.name}?
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Yes — KL Renovator provides same-day aircond service near you in {area.name}. WhatsApp +60182983573 with your address and we&apos;ll dispatch the nearest technician. Most appointments in {area.name} are confirmed within 30 minutes.
                  </p>
                </details>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    Who is the best aircond repair technician near me in {area.name}?
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    KL Renovator&apos;s trained technicians are highly rated across {area.name} and Klang Valley. With 500+ five-star reviews, transparent upfront pricing, and a 1-month workmanship warranty, we are the trusted choice for aircond repair and service near you.
                  </p>
                </details>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    How fast is same-day aircond service near me in {area.name}?
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Most same-day requests in {area.name} are dispatched within 30–60 minutes of WhatsApp confirmation. We cover all of {area.name} and surrounding Klang Valley areas daily from 9AM to 10PM, including emergency repairs.
                  </p>
                </details>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other Areas — with keyword-rich anchor text */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Also Serving · Kawasan Lain · 其他区域</p>
            <h2 className="text-base font-black text-slate-900 mb-6">
              Aircond Service Near {area.name} — Other Areas We Cover
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherAreas.map((a) => (
                <NextLink
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  <FiMapPin className="h-3 w-3 text-sky-400 shrink-0" />
                  Aircond Service {a.name}
                </NextLink>
              ))}
              <NextLink
                href="/areas"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
              >
                All 35+ Areas <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brands We Service in This Area */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
              Aircond Brands · Jenama · 品牌
            </p>
            <h2 className="text-base font-black text-slate-900 mb-4">
              All Aircond Brands We Service in {area.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {siteConfig.brandPages.map((brand) => (
                <NextLink
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  {brand.name} Aircond Service {area.name}
                  <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery + Near Me + Neighbourhood Links — orphan-link fix */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Proof + Coverage · Bukti + Liputan · 真实案例 + 覆盖范围
            </p>
            <h2 className="text-base font-black text-slate-900 mb-6">
              See Real Work in {area.name} and Explore Nearby Coverage
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <NextLink
                href="/gallery"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Before &amp; After Gallery</p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  See real KL Renovator project photos before you book
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Browse real chemical wash, overhaul, installation and repair photos from homes, condos, offices and shoplots across KL &amp; Selangor.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  View Gallery <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>

              <NextLink
                href="/near-me"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Fast Local Dispatch</p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  Need fast aircond service in {area.name} or nearby areas?
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Use our Near Me page to check nearby coverage, compare adjacent townships and request the fastest available WhatsApp appointment.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  Open Near Me Page <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>
            </div>

            {(() => {
              const neighbourhoods = getAreaNeighbourhoodLinks(slug, "en");
              const related = neighbourhoods.length >= 4 ? [] : getRelatedNeighbourhoodLinks(slug, "en", 10);
              const links = neighbourhoods.length > 0 ? neighbourhoods : related;
              if (links.length === 0) return null;
              return (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                  {neighbourhoods.length > 0 ? `Neighbourhoods in ${area.name}` : `Nearby neighbourhoods for ${area.name}`}
                </p>
                <h3 className="text-base font-black text-slate-900">
                  {neighbourhoods.length > 0
                    ? `More local area pages under ${area.name}`
                    : `Useful nearby community pages around ${area.name}`}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  These neighbourhood pages strengthen local coverage and help residents in smaller communities find the most relevant service page faster.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {links.map((k) => (
                      <NextLink
                        key={`${k.parentSlug}-${k.slug}`}
                        href={k.href}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
                      >
                        {k.label}
                        <FiArrowRight className="h-3 w-3 text-sky-400" />
                      </NextLink>
                    ))}
                </div>
              </div>
              );
            })()}
          </Reveal>
        </div>
      </section>

      {/* Related Blog Guides — AREA_BLOG_MAP driven */}
      {(() => {
        const blogSlugs = AREA_BLOG_MAP[slug] ?? AREA_BLOG_MAP["_default"];
        const featuredPosts = allPosts.filter((p) => blogSlugs.includes(p.slug));
        const displayPosts = featuredPosts.length > 0 ? featuredPosts : allPosts.slice(0, 4);
        return (
          <section className="py-10 bg-slate-50 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Expert Guides · Panduan · 指南</p>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Aircond Guides for {area.name} Residents
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {displayPosts.slice(0, 4).map((post) => (
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
              <NextLink href="/blog" className="inline-flex items-center gap-1 mt-4 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
                All Aircond Guides <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </section>
        );
      })()}

      {/* Common Problems We Fix in This Area */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
              Common Aircond Problems We Fix in {area.name}
            </p>
            <h2 className="text-base font-black text-slate-900 mb-4">
              {area.name} Aircond Problems &amp; Solutions
            </h2>
            <div className="flex flex-wrap gap-2">
              {(() => {
                const specificSlugs = AREA_PROBLEM_MAP[slug] ?? AREA_PROBLEM_MAP["_default"];
                return siteConfig.problemPages
                  .filter((p) => specificSlugs.includes(p.slug))
                  .map((problem) => (
                    <NextLink
                      key={problem.slug}
                      href={`/problems/${problem.slug}`}
                      className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition rounded-xl"
                    >
                      <FiArrowRight className="h-3 w-3 text-red-400 shrink-0" />
                      {problem.name}
                      <span className="text-slate-400 font-normal"> · {problem.nameMS}</span>
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

      {/* Related Blog Guides — area-contextual */}
      {(() => {
        const blogSlugs = AREA_BLOG_MAP[slug] ?? AREA_BLOG_MAP["_default"];
        const areaPosts = allPosts.filter((p) => blogSlugs.includes(p.slug)).slice(0, 3);
        if (areaPosts.length === 0) return null;
        return (
          <section className="py-10 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">
                  Expert Guides · Panduan · 指南
                </p>
                <h2 className="text-base font-black text-slate-900 mb-4">
                  Aircond Service Guides for {area.name} Residents
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {areaPosts.map((post) => (
                    <NextLink
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-sky-400 hover:shadow-md transition"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{post.category}</span>
                      <span className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition leading-snug mb-2">{post.title}</span>
                      <span className="text-xs text-slate-500 mt-auto">{post.readTime} min read</span>
                    </NextLink>
                  ))}
                </div>
                <NextLink href="/blog" className="inline-flex items-center gap-1 mt-4 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
                  All Aircond Guides <FiArrowRight className="h-3 w-3" />
                </NextLink>
              </Reveal>
            </div>
          </section>
        );
      })()}
    </>
  );
}
