import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight, FiMapPin } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { AREA_PROBLEM_MAP, AREA_BLOG_MAP } from "@/config/topical-authority-map";

const SUPPORTED_LOCALES = ["en", "ms", "zh"];
const BASE = "https://www.klrenovator.com";

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  SUPPORTED_LOCALES.forEach((lang) => {
    siteConfig.areaPages.forEach((a) => {
      params.push({ lang, slug: a.slug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(lang)) return { title: "Invalid language" };

  const area = siteConfig.areaPages.find((a) => a.slug === slug);
  if (!area) return { title: "Area not found" };

  // Pick title/desc based on language
  const metaTitle = lang === "ms" ? area.metaTitleMS : lang === "zh" ? area.metaTitleZH : area.metaTitle;
  const metaDesc = lang === "ms" ? area.metaDescMS : lang === "zh" ? area.metaDescZH : area.metaDesc;

  // ✅ REAL hreflang — each language has its own URL
  const alternates = {
    canonical: `${BASE}/${lang}/areas/${slug}`,
    languages: {
      "en-MY": `${BASE}/en/areas/${slug}`,
      "ms-MY": `${BASE}/ms/areas/${slug}`,
      "zh-MY": `${BASE}/zh/areas/${slug}`,
      "x-default": `${BASE}/en/areas/${slug}`,
    },
  };

  return {
    title: metaTitle,
    description: metaDesc,
    alternates,
    keywords: [
      `aircond service ${area.name}`,
      `aircond repair ${area.name}`,
      `chemical wash ${area.name}`,
      `KL Renovator ${area.name}`,
      `servis aircond ${area.name}`,
      `${area.name} 冷气服务`,
    ].join(", "),
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `${BASE}/${lang}/areas/${slug}`,
      type: "website",
      locale: lang === "ms" ? "ms_MY" : lang === "zh" ? "zh_MY" : "en_MY",
      alternateLocale: ["en_MY", "ms_MY", "zh_MY"],
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(lang)) notFound();

  const area = siteConfig.areaPages.find((a) => a.slug === slug);
  if (!area) notFound();

  // Pick content based on language
  const description = lang === "ms" ? area.descriptionMS : lang === "zh" ? area.descriptionZH : area.description;
  const faqs = lang === "ms" ? (area as any).faqsBM : lang === "zh" ? (area as any).faqsZH : (area as any).faqs;

  // ✅ LocalBusiness schema with inLanguage
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: siteConfig.name,
    legalName: siteConfig.parentCompany,
    url: `${BASE}/${lang}/areas/${slug}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: description,
    inLanguage: lang === "ms" ? "ms-MY" : lang === "zh" ? "zh-MY" : "en-MY",
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
    areaServed: {
      "@type": "City",
      name: area.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviewRating,
      reviewCount: siteConfig.reviewCount,
      bestRating: 5,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${BASE}/${lang}/areas` },
      { "@type": "ListItem", position: 3, name: `Aircond Service ${area.name}`, item: `${BASE}/${lang}/areas/${slug}` },
    ],
  };

  const faqSchema = faqs?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq: { q: string; a: string }) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  } : null;

  const otherAreas = siteConfig.areaPages.filter((a) => a.slug !== slug).slice(0, 12);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href={`/${lang}`} className="hover:text-sky-600 transition">Home</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href={`/${lang}/areas`} className="hover:text-sky-600 transition">Service Areas</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Aircond Service {area.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image src="/hero/aircond-installation-ampang-selangor.jpg" alt={`KL Renovator aircond technician servicing in ${area.name}`} fill sizes="100vw" className="object-cover object-center" priority />
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
                  Aircond Service <span className="text-sky-500">{area.name}</span>
                </h1>
                <p className="mt-4 text-lg text-slate-600 max-w-xl leading-relaxed">{description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.landmarks.map((lm) => (
                    <span key={lm} className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">{lm}</span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <BookingButton serviceName={`Aircond Service ${area.name}`} size="lg" />
                  <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-sky-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-slate-700 hover:text-sky-600 transition rounded-xl">
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
                    "Same-day booking available",
                    "All major brands: Daikin, Panasonic, Mitsubishi & more",
                    "Transparent pricing — no hidden charges",
                    "1-month workmanship warranty",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center bg-sky-500 text-white mt-0.5 rounded-sm">
                        <FiCheck className="h-3 w-3" />
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{point}</span>
                    </li>
                  ))}
                </ul>
                <a href={waLink(`Hi KL Renovator, I need aircond service in ${area.name}.`)} target="_blank" rel="noopener noreferrer" className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wider text-xs px-4 py-3.5 rounded-xl transition-all">
                  <FaWhatsapp className="h-4 w-4" />
                  WhatsApp for {area.name} Service
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Section — in selected language */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>FAQ</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Aircond Service </span>
                <span className={title({ size: "sm", color: "brand" })}>{area.name} — FAQ</span>
              </h2>
            </div>
          </Reveal>

          <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
            {(faqs && faqs.length > 0 ? faqs : [
              { q: `Does KL Renovator service aircond in ${area.name}?`, a: `Yes — KL Renovator provides full aircond servicing in ${area.name}. WhatsApp +60182983573 to book.` },
            ]).map((faq: { q: string; a: string }, i: number) => (
              <Reveal key={i} delay={i * 60}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    {faq.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Also Serving</p>
            <h2 className="text-base font-black text-slate-900 mb-6">Aircond Service Near {area.name}</h2>
            <div className="flex flex-wrap gap-2">
              {otherAreas.map((a) => (
                <NextLink key={a.slug} href={`/${lang}/areas/${a.slug}`} className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl">
                  <FiMapPin className="h-3 w-3 text-sky-400 shrink-0" />
                  Aircond Service {a.name}
                </NextLink>
              ))}
              <NextLink href={`/${lang}/areas`} className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl">
                All 35+ Areas <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
