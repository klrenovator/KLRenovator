import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services-data";
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

// ─── Multi-color palette for process step numbers ────────────────────────────
const stepColors = [
  "bg-sky-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-teal-500",
];

// ─── Multi-color palette for highlight check icons ───────────────────────────
const highlightColors = [
  "bg-sky-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-orange-500",
];

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = servicesData[slug];
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!data) notFound();

  const iconName =
    siteConfig.services.find((s) => s.slug === slug)?.icon ?? "sparkles";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.tagline,
    url: `https://www.klrenovator.com/services/${slug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.klrenovator.com/#business",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: "https://www.klrenovator.com",
    },
    areaServed: siteConfig.areas.map((area) => ({
      "@type": "City",
      name: area,
    })),
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
      itemListElement: data.priceTable.map((row: { label: string; price: string }, i: number) => ({
        "@type": "Offer",
        position: i + 1,
        name: row.label,
        description: row.price,
      })),
    },
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
        name: "Services",
        item: "https://www.klrenovator.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: `https://www.klrenovator.com/services/${slug}`,
      },
    ],
  };

  const faqSchema = data.faqs && data.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faqs.map((f: { q: string; a: string }) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      }
    : null;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/" className="hover:text-brand-700 transition">
              Home
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/services" className="hover:text-brand-700 transition">
              Services
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">{data.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero — White with low-opacity watermark ── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        {/* Low-opacity background watermark */}
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/Compressor installation new2026-05-03 at 13.39.32 (1).jpeg"
            alt="KL Renovator aircond technician on site"
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
                {/* Colored service icon */}
                <div className="inline-flex h-14 w-14 items-center justify-center bg-sky-500 text-white shadow-md">
                  <ServiceIcon name={iconName} className="h-7 w-7" />
                </div>
                <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
                  {data.title}
                </h1>
                <p className="mt-2 text-sm font-bold text-sky-600 uppercase tracking-wider">
                  Serving All of Kuala Lumpur & Selangor
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
              {/* Overview card — white with sky border */}
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
              <span className={title({ size: "sm", color: "brand" })}>
                get with us.
              </span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {data.highlights.map((h: string, i: number) => (
              <Reveal key={h} delay={i * 60}>
                <div className="flex items-start gap-3 bg-white p-5 h-full">
                  <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center ${highlightColors[i % highlightColors.length]} text-white`}>
                    <FiCheck className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                    {h}
                  </p>
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
              <p className={eyebrow()}>Pricing</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Transparent </span>
                <span className={title({ size: "sm", color: "brand" })}>
                  pricing.
                </span>
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Starting prices. Material costs (gas, copper, trunking) quoted
                separately.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {data.priceTable.map((p: { label: string; price: string }) => (
                  <li
                    key={p.label}
                    className="flex items-center justify-between gap-3 px-5 py-4"
                  >
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-base font-bold text-sky-600 whitespace-nowrap">
                      {p.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process — Multi-color step numbers */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>Process</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>How it </span>
                <span className={title({ size: "sm", color: "brand" })}>
                  works.
                </span>
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
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>FAQ</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Common </span>
                <span className={title({ size: "sm", color: "brand" })}>
                  questions.
                </span>
              </h2>
            </div>
          </Reveal>
          <div className="mt-8 border border-slate-200 divide-y divide-slate-200">
            {data.faqs.map((f: { q: string; a: string }, i: number) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900">
                    {f.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Area Links */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              {data.title} — Available in These Areas
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

      {/* Contact CTA */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <p className={eyebrow()}>Book it</p>
                <h2 className="mt-3">
                  <span className={title({ size: "md" })}>Book your </span>
                  <span className={title({ size: "md", color: "brand" })}>
                    {data.title}.
                  </span>
                </h2>
                <p className={subtitle({ class: "mt-4" })}>
                  Send us a message now — we&apos;ll reply with availability and
                  a firm quote within 30 minutes.
                </p>
                <div className="mt-6">
                  <BookingButton serviceName={data.title} size="lg" />
                </div>

                <div className="mt-10">
                  <p className={eyebrow()}>Other Services</p>
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
