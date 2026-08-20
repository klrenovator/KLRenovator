import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { clampMetaTitle, buildBrandMetaTitleWithDate } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { pickHeroImage } from "@/lib/og-image-pool";
import { BRAND_PROBLEM_MAP, BRAND_SERVICE_MAP } from "@/config/topical-authority-map";
import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { buildBrandAreaComboModule } from "@/config/brand-area-combo-links";
import { BRAND_ERROR_CODES, BRAND_TECH_SPECS } from "@/config/brand-specs";
import { serviceAnchor } from "@/config/anchor-text-diversity";
import { ExpertReviewBlock, LocalPriceComparisonTable } from "@/components/commercial-proof-blocks";

// ─────────────────────────────────────────────────────────────────────────
// /brands/[slug] — English brand page.
// ─────────────────────────────────────────────────────────────────────────

// This route is backed by a finite typed content registry.
// Unknown slugs must be a real 404, never an indexable fallback page.
export const dynamicParams = false;

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
  if (!brand) return { title: "Page not found" };

  const enUrl = `https://www.klrenovator.com/brands/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/brands/${slug}`;

  return {
    title: buildBrandMetaTitleWithDate(brand.metaTitle, "en"),
    description: clampMetaDescription(brand.metaDesc),
    openGraph: {
      title: buildBrandMetaTitleWithDate(brand.metaTitle, "en"),
      description: clampMetaDescription(brand.metaDesc),
      url: enUrl,
      type: "website",
      locale: "en_MY",
      alternateLocale: ["ms_MY", "zh_MY"],
      images: [
        {
          url: `https://www.klrenovator.com${brand.heroImage || pickHeroImage(`brand:${brand.slug}`, [brand.slug])}`,
          width: 1200,
          height: 630,
          alt: `Aircond Service ${brand.name} KL & Selangor — KL Renovator`,
        },
      ],
    },
    alternates: {
      canonical: enUrl,
      languages: {
        "en-MY": enUrl,
        "ms-MY": msUrl,
        "zh-MY": zhUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default async function BrandPageEN({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) notFound();

  const enUrl = `https://www.klrenovator.com/brands/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}`;
  const waMsg = `Hi KL Renovator, I need aircond service for my ${brand.name} unit. My location is:`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Aircond Service ${brand.name}`,
    provider: {
      "@type": "HVACBusiness",
      "@id": "https://www.klrenovator.com/#business",
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Kuala Lumpur & Selangor",
    },
    brand: { "@type": "Brand", name: brand.name },
    description: brand.description,
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
        name: "Brands",
        item: "https://www.klrenovator.com/brands",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Aircond ${brand.name}`,
        item: msUrl,
      },
    ],
  };

  const faqSchema = brand.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: brand.faqs.map((f: { q: string; a: string }) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const otherBrands = siteConfig.brandPages
    .filter((b) => b.slug !== slug)
    .slice(0, 10);
  const brandAreaComboModule = buildBrandAreaComboModule(
    brand,
    siteConfig.areaPages,
    "en",
  );
  const brandProblemSlugs =
    BRAND_PROBLEM_MAP[slug] ?? BRAND_PROBLEM_MAP["_default"];
  const relatedProblems = siteConfig.problemPages.filter((p) =>
    brandProblemSlugs.includes(p.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <nav
            className="flex items-center gap-1 text-xs text-slate-500"
            aria-label="Breadcrumb"
          >
            <NextLink
              href="/"
              className="hover:text-sky-600 transition font-medium"
            >
              Home
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink
              href="/brands"
              className="hover:text-sky-600 transition font-medium"
            >
              Brands
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-bold">
              {brand.name}
            </span>
          </nav>
        </div>
      </div>

      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Aircond Service Brands
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg" })}>Aircond Service </span>
              <span className={title({ size: "lg", color: "brand" })}>
                {brand.name}
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Yes — KL Renovator services all{" "}
              <strong>{brand.name}</strong> aircond models across KL &amp; Selangor.{" "}
              {brand.description}
            </p>

            {brand.models?.length > 0 && (
              <p className="mt-3 text-sm text-slate-500 font-medium">
                Model: {brand.models.join(", ")}.
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp Now
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 px-7 py-3.5 text-sm font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 transition-all rounded-xl"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {brand.highlights?.length > 0 && (
        <section className="py-10 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Our Expertise For {brand.name}
              </h2>
              <ul className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200 text-sm">
                {brand.highlights.map((h: string, i: number) => (
                  <li
                    key={i}
                    className="bg-white px-4 py-3 flex items-start gap-2"
                  >
                    <FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {brand.inverterNote && (
        <section className="py-10 bg-violet-50 border-t border-violet-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-3">
                {brand.name} Inverter vs Non-Inverter
              </h2>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                {brand.inverterNote}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {brand.troubleshootingTips &&
        (brand.troubleshootingTips?.length ?? 0) > 0 && (
          <section className="py-10 bg-slate-50 border-t border-slate-100">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <h2 className="text-base font-black text-slate-900 mb-4">
                  Troubleshooting Tips For {brand.name}
                </h2>
                <div className="space-y-3">
                  {(brand.troubleshootingTips ?? []).map(
                    (tip: { issue: string; tip: string }, i: number) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200 rounded-2xl p-4"
                      >
                        <h3 className="font-black text-sm text-slate-900 mb-1.5">
                          {tip.issue}
                        </h3>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                          {tip.tip}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        )}

      {brand.galleryImages && brand.galleryImages.length > 0 && (
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Real Job Photos — {brand.name}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {brand.galleryImages.map(
                  (
                    img: { src: string; alt: string; altMS?: string },
                    i: number,
                  ) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100"
                    >
                      <NextImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="50vw"
                        className="object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Trust Block: We Service, Not An Official Agent ─────────────── */}
      <section className="py-10 bg-emerald-50 border-y border-emerald-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center">
                <FiCheck className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="font-black text-sm text-slate-900 mb-1.5 uppercase tracking-wide">
                  We Service {brand.name} — We Are Not An Official Agent Of {brand.name}
                </h2>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  KL Renovator is an independent HVAC service company, not an official agent
                  or authorised service centre of {brand.name}. We
                  service, repair and install {brand.name} units using
                  genuine or OEM-equivalent parts (capacitors, PCB boards, gas,
                  drain pumps) from trusted Malaysian suppliers —
                  never counterfeit or unverified parts. If your
                  {brand.name} unit is still under manufacturer warranty, we
                  will tell you first whether the repair may
                  affect that warranty, so you can choose to
                  go to the official {brand.name} service centre yourself if needed.
                  Our job is honest, transparent service — not selling a unit
                  you do not need.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      <LocalPriceComparisonTable locale="en" name={brand.name} />
      <ExpertReviewBlock locale="en" name={brand.name} context="brand" seed={`brand-${brand.slug}-en`} />

      {brand.faqs?.length > 0 && (
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                FAQ — {brand.name}
              </h2>
              <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                {brand.faqs.map(
                  (faq: { q: string; a: string }, i: number) => (
                    <details key={i} className="group bg-white p-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                        {faq.q}
                        <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                      </summary>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </details>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              {brandAreaComboModule.eyebrow}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
              <div>
                <h2 className="speakable text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                  {brandAreaComboModule.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-3xl">
                  {brandAreaComboModule.intro}
                </p>
              </div>
              <NextLink
                href={brandAreaComboModule.allAreasHref}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-sky-700 hover:bg-sky-100 transition"
              >
                {brandAreaComboModule.allAreasLabel}{" "}
                <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {brandAreaComboModule.combos.map((combo) => (
                <NextLink
                  key={combo.href}
                  href={combo.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                >
                  <p className="text-[11px] font-black uppercase tracking-widest text-sky-600">
                    {combo.eyebrow}
                  </p>
                  <h3 className="mt-2 text-base font-black text-slate-950 group-hover:text-sky-700 transition-colors">
                    {combo.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {combo.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {combo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-700 group-hover:gap-2 transition-all">
                    Open area page <FiArrowRight className="h-3 w-3" />
                  </span>
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      
      {/* ── Technical Specifications Section ───────────────────────────────── */}
      {(() => {
        const techSpecs =
          BRAND_TECH_SPECS[slug] ?? BRAND_TECH_SPECS["_default"];
        return (
          <section className="py-12 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-1">
                  Technical Specifications
                </p>
                <h2 className="text-xl font-black text-slate-900 mb-2">
                  Technical Specifications {brand.name}
                </h2>
                <p className="text-sm text-slate-500 mb-6 max-w-2xl">
                  Key technical details and service requirements for{" "}
                  {brand.name} in Malaysia.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {techSpecs.map((ts, i) => (
                    <div
                      key={i}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
                    >
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        {ts.specification}
                      </div>
                      <div className="text-sm font-semibold text-slate-800">
                        {ts.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* ── Error Code Reference Section ───────────────────────────────── */}
      {(() => {
        const errorCodes =
          BRAND_ERROR_CODES[slug] ?? BRAND_ERROR_CODES["_default"];
        return (
          <section className="py-12 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">
                  Error Code Guide
                </p>
                <h2 className="text-xl font-black text-slate-900 mb-2">
                  Common Error Codes For {brand.name}
                </h2>
                <p className="text-sm text-slate-500 mb-6 max-w-2xl">
                  Blinking lights on your {brand.name} unit? These are common error
                  codes and what they mean. WhatsApp KL Renovator the code + model
                  for a fast remote diagnosis.
                </p>
                <div className="overflow-hidden border border-slate-200 rounded-2xl">
                  <div className="grid grid-cols-3 bg-slate-100 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-500">
                    <span>Error Code</span>
                    <span>Meaning</span>
                    <span>Fix</span>
                  </div>
                  {errorCodes.map((ec, i) => (
                    <div
                      key={ec.code}
                      className={`grid grid-cols-3 px-5 py-3.5 text-xs border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                    >
                      <span className="font-black text-red-600">{ec.code}</span>
                      <span className="font-semibold text-slate-700">
                        {ec.meaning}
                      </span>
                      <span className="text-slate-500">{ec.fix}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Code not listed? WhatsApp +60182983573 with your
                  {brand.name} model number — we will diagnose it.
                </p>
              </Reveal>
            </div>
          </section>
        );
      })()}
      {relatedProblems.length > 0 && (
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
                Problems
              </p>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Common {brand.name} Problems We Fix
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
                <NextLink
                  href="/problems"
                  className="inline-flex items-center gap-1 border border-sky-400 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 rounded-full hover:bg-sky-100 transition"
                >
                  All Problems →
                </NextLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      
      {(() => {
        const serviceSlugs = BRAND_SERVICE_MAP[slug] || BRAND_SERVICE_MAP["_default"] || [];
        const brandServices = siteConfig.services.filter((s) => serviceSlugs.includes(s.slug));
        if (brandServices.length === 0) return null;
        return (
          <section className="py-10 bg-slate-50 border-t border-slate-100">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Services</p>
                <h2 className="text-base font-black text-slate-900 mb-4">
                  {brand.name} Aircond Services We Provide
                </h2>
                <div className="flex flex-wrap gap-2">
                  {brandServices.map((s, idx) => (
                    <NextLink
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 rounded-full hover:border-sky-500 hover:text-sky-600 transition"
                    >
                      {serviceAnchor(s.slug, "en", idx)}
                    </NextLink>
                  ))}
                  <NextLink
                    href="/services"
                    className="inline-flex items-center gap-1 border border-sky-400 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 rounded-full hover:bg-sky-100 transition"
                  >
                    All Services →
                  </NextLink>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

<section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
              Other Brands We Service
            </p>
            <div className="flex flex-wrap gap-2">
              {otherBrands.map((b) => (
                <NextLink
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  {b.name}
                </NextLink>
              ))}
              <NextLink
                href="/brands"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
              >
                All Brands <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
