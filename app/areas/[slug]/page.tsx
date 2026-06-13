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

  return {
    title: area.metaTitle,
    description: area.metaDesc,
    keywords: [
      `aircond service ${area.name}`,
      `aircond repair ${area.name}`,
      `chemical wash ${area.name}`,
      `chemical overhaul ${area.name}`,
      `gas top up ${area.name}`,
      `aircond installation ${area.name}`,
      `KL Renovator ${area.name}`,
      `HVAC ${area.name}`,
      `aircond near me ${area.name}`,
    ].join(", "),
    openGraph: {
      title: area.metaTitle,
      description: area.metaDesc,
      url: `https://www.klrenovator.com/areas/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.klrenovator.com/areas/${slug}`,
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
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "State",
        name: area.state,
      },
    },
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Does KL Renovator service aircond in ${area.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, KL Renovator provides full aircond servicing in ${area.name}, ${area.state}. We cover chemical wash, chemical overhaul, gas top-up, repairs and new installations. Call or WhatsApp +60182983573 to book.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does aircond service cost in ${area.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Basic servicing starts from RM 99, pressure chemical wash from RM 120, chemical overhaul from RM 220, and gas top-up from RM 120 (R22) in ${area.name}. All prices are transparent with no hidden charges.`,
        },
      },
      {
        "@type": "Question",
        name: `Is same-day aircond service available in ${area.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, same-day service slots are available in ${area.name} subject to availability. WhatsApp us at +60182983573 to check and confirm your booking.`,
        },
      },
      {
        "@type": "Question",
        name: `Which aircond brands does KL Renovator service in ${area.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `KL Renovator services all major brands in ${area.name} including Daikin, Panasonic, Mitsubishi Electric, York, Midea, LG, Samsung, Acson, Sharp and Haier — both inverter and non-inverter models.`,
        },
      },
    ],
  };

  const otherAreas = siteConfig.areaPages.filter((a) => a.slug !== slug).slice(0, 12);

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
            src="/hero/aircond-installation-ampang-selangor.jpg"
            alt={`KL Renovator aircond technician servicing in ${area.name}`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
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

                {/* Landmarks */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.landmarks.map((lm) => (
                    <span
                      key={lm}
                      className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200"
                    >
                      {lm}
                    </span>
                  ))}
                </div>

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
                  rel="noopener noreferrer"
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
            {siteConfig.services.map((service, i) => (
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
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all"
                >
                  <FaWhatsapp className="h-3.5 w-3.5" /> Get Exact Quote
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Frequently Asked</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Aircond Service </span>
                <span className={title({ size: "sm", color: "brand" })}>{area.name} — FAQ</span>
              </h2>
            </div>
          </Reveal>

          <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
            {[
              {
                q: `Does KL Renovator service aircond in ${area.name}?`,
                a: `Yes — KL Renovator provides full aircond servicing across all of ${area.name}, ${area.state}. Services include chemical wash, chemical overhaul, gas top-up, repairs and new installations. WhatsApp +60182983573 to book.`,
              },
              {
                q: `How much does aircond chemical wash cost in ${area.name}?`,
                a: `Pressure chemical wash in ${area.name} starts from RM 120 for a 1.0–1.5 HP wall-mounted unit. For 2.0–2.5 HP it is RM 150. For 3.0 HP it is RM 180. All prices confirmed before work begins.`,
              },
              {
                q: `Is same-day aircond service available in ${area.name}?`,
                a: `Yes, same-day slots are frequently available in ${area.name}. WhatsApp us at +60182983573 in the morning to secure your slot. We operate Monday to Sunday, 9 AM to 6 PM.`,
              },
              {
                q: `Which aircond brands do you service in ${area.name}?`,
                a: `We service all major brands in ${area.name} — Daikin, Panasonic, Mitsubishi Electric, York, Midea, LG, Samsung, Acson, Sharp, Toshiba and Haier. Both inverter and non-inverter models.`,
              },
            ].map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900">
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
            <p className={eyebrow()}>Also Serving</p>
            <h2 className="mt-2 mb-6">
              <span className={title({ size: "sm" })}>Other </span>
              <span className={title({ size: "sm", color: "brand" })}>Coverage Areas</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherAreas.map((a) => (
                <NextLink
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition rounded-full"
                >
                  <FiMapPin className="h-3 w-3" />
                  {a.name}
                </NextLink>
              ))}
              <NextLink
                href="/areas"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 hover:bg-sky-100 transition rounded-full"
              >
                All Areas <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brands We Service in This Area */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              All Brands We Service in {area.name}
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

      {/* Related Blog Guides for This Area */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Expert Guides · Panduan · 指南</p>
          <h2 className="text-base font-black text-slate-900 mb-4">Aircond Guides for {area.name} Residents</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {allPosts.slice(0, 4).map((post) => (
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

      {/* Common Problems We Fix in This Area */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              Common Aircond Problems We Fix in {area.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.problemPages.slice(0, 12).map((problem) => (
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
    </>
  );
}
