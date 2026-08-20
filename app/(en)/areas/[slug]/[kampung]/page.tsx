import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowRight, FiChevronRight, FiMapPin } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { buildFreshMetaTitle, clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { allPosts } from "@/config/blog-posts";
import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { getProblemsForKampung, getBlogsForKampung } from "@/config/topical-authority-map";
import { buildKampungUniquenessMatrix } from "@/config/kampung-uniqueness-matrix";
import { kampungGamePlan, kampungSignals } from "@/config/kampung-depth";
import { buildOgImage } from "@/lib/og-image-pool";
import { reviewDateFor } from "@/config/content-review-dates";
import { ExpertReviewBlock, LocalPriceComparisonTable } from "@/components/commercial-proof-blocks";
import { kampungChildBlock } from "@/config/orphan-cross-links";
import { MoneyCrossLinks } from "@/components/money-cross-links";

// ─────────────────────────────────────────────────────────────────────────
// /areas/[slug]/[kampung] — English kampung/neighbourhood page.
// Nested under its parent area (e.g. /areas/cheras/taman-connaught).
// Data source: siteConfig.kampungPages, filtered by parentSlug.
// See KLRenovator-KAMPUNG-MASTER-PLAN.md for the full rollout plan —
// this is BATCH 1 (Cheras cluster, 5 locations, shipped 19 June 2026).
// ─────────────────────────────────────────────────────────────────────────

// This route is backed by a finite typed content registry.
// Unknown slugs must be a real 404, never an indexable fallback page.
export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.kampungPages.map((k) => ({
    slug: k.parentSlug,
    kampung: k.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; kampung: string }>;
}): Promise<Metadata> {
  const { slug, kampung } = await params;
  const k = siteConfig.kampungPages.find(
    (x) => x.slug === kampung && x.parentSlug === slug
  );
  if (!k) return { title: "Page not found" };

  const enUrl = `https://www.klrenovator.com/areas/${slug}/${kampung}`;
  const msUrl = `https://www.klrenovator.com/ms/areas/${slug}/${kampung}`;
  const zhUrl = `https://www.klrenovator.com/zh/areas/${slug}/${kampung}`;

  return {
    title: buildFreshMetaTitle(k.metaTitle, "en"),
    description: clampMetaDescription(k.metaDesc),
    openGraph: {
      title: buildFreshMetaTitle(k.metaTitle, "en"),
      description: clampMetaDescription(k.metaDesc),
      url: enUrl,
      type: "website",
      locale: "en_MY",
      alternateLocale: ["ms_MY", "zh_MY"],
      images: [buildOgImage(`kampung-${k.parentSlug}-${k.slug}`, `Aircond service in ${k.name} — KL Renovator`, [k.parentSlug])],
    },
    alternates: {
      canonical: enUrl,
      languages: { "en-MY": enUrl, "ms-MY": msUrl, "zh-MY": zhUrl, "x-default": enUrl },
    },
  };
}

export default async function KampungPage({
  params,
}: {
  params: Promise<{ slug: string; kampung: string }>;
}) {
  const { slug, kampung } = await params;
  const k = siteConfig.kampungPages.find(
    (x) => x.slug === kampung && x.parentSlug === slug
  );
  if (!k) notFound();

  const parentArea = siteConfig.areaPages.find((a) => a.slug === k.parentSlug);
  const enUrl = `https://www.klrenovator.com/areas/${slug}/${kampung}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: siteConfig.name,
    legalName: siteConfig.parentCompany,
    url: enUrl,
    telephone: siteConfig.phone,
    description: k.description,
    address: { "@type": "PostalAddress", addressLocality: k.name, addressRegion: k.state, addressCountry: "MY" },
    geo: { "@type": "GeoCoordinates", latitude: k.lat, longitude: k.lng },
    areaServed: { "@type": "Place", name: k.name, containedInPlace: { "@type": "City", name: parentArea?.name } },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.klrenovator.com/areas" },
      { "@type": "ListItem", position: 3, name: parentArea?.name, item: `https://www.klrenovator.com/areas/${slug}` },
      { "@type": "ListItem", position: 4, name: k.name, item: enUrl },
    ],
  };


  // WebPage node carries the freshness signal. `dateModified` comes from a
  // hand-maintained constant (config/content-review-dates.ts), NOT from
  // new Date() — auto-bumping the date on every deploy is exactly what
  // Google's structured-data spam policy treats as deceptive.
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${enUrl}#webpage`,
    name: `Aircond Service ${k.name} — KL Renovator`,
    description: clampMetaDescription(k.metaDesc),
    url: enUrl,
    inLanguage: "en-MY",
    dateModified: reviewDateFor("kampungs"),
    isPartOf: { "@id": "https://www.klrenovator.com/#website" },
    about: { "@id": "https://www.klrenovator.com/#business" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".speakable"],
    },
  };

  const faqSchema = k.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: k.faqs.map((f: { q: string; a: string }) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const siblingKampungs = siteConfig.kampungPages.filter(
    (x) => x.parentSlug === slug && x.slug !== kampung
  );

  // Cross-silo links — inherited from the parent area's topical authority
  // map entry (see getProblemsForKampung/getBlogsForKampung in
  // config/topical-authority-map.ts for why this isn't a per-kampung list).
  const relatedProblemSlugs = getProblemsForKampung(slug);
  const relatedProblems = relatedProblemSlugs
    .map((ps) => siteConfig.problemPages.find((p) => p.slug === ps))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedBlogSlugs = getBlogsForKampung(slug);
  const relatedBlogs = relatedBlogSlugs
    .map((bs) => allPosts.find((b) => b.slug === bs))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const uniquenessMatrix = buildKampungUniquenessMatrix(k, parentArea, "en");
  const gamePlan = kampungGamePlan(k, parentArea, "en");
  const signals = kampungSignals(k, parentArea, "en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <nav className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-4" aria-label="Breadcrumb">
              <NextLink href="/areas" className="hover:text-sky-600">Service Areas</NextLink>
              <FiChevronRight className="h-3 w-3" />
              <NextLink href={`/areas/${slug}`} className="hover:text-sky-600">{parentArea?.name}</NextLink>
              <FiChevronRight className="h-3 w-3" />
              <span className="text-slate-600">{k.name}</span>
            </nav>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Aircond Service · {k.state}
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg" })}>Aircond Service </span>
              <span className={title({ size: "lg", color: "brand" })}>{k.name}</span>
            </h1>
            <h2 className="mt-6 text-xl sm:text-2xl font-black tracking-tight text-slate-950">
              What does aircond service in {k.name} actually cover?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-700 leading-relaxed font-medium speakable">
              {k.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(`Hi KL Renovator, I'd like to book aircond service in ${k.name}.`)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id={uniquenessMatrix.id} aria-labelledby={`${uniquenessMatrix.id}-heading`} className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              {uniquenessMatrix.eyebrow}
            </p>
            <h2 id={`${uniquenessMatrix.id}-heading`} className="speakable text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              {uniquenessMatrix.heading}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700 max-w-4xl speakable">
              {uniquenessMatrix.intro}
            </p>
            <h2 className="mt-8 text-xl sm:text-2xl font-black tracking-tight text-slate-950">
              How do I book aircond service in {k.name}?
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 max-w-4xl speakable">
              {uniquenessMatrix.bookingTip}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {uniquenessMatrix.rows.map((row) => (
                <div key={row.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">{row.label}</p>
                  <p className="mt-2 text-sm font-black text-slate-950">{row.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{row.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-3xl border border-sky-100 bg-sky-50 p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-sky-700">{uniquenessMatrix.serviceHeading}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 max-w-3xl">{uniquenessMatrix.serviceIntro}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {uniquenessMatrix.serviceLinks.map((service) => (
                  <NextLink
                    key={service.href}
                    href={service.href}
                    className="group rounded-2xl border border-white bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                  >
                    <span className="block text-sm font-black text-slate-950">{service.label}</span>
                    <span className="mt-1 block text-xs font-bold text-sky-700">{service.price}</span>
                    <span className="mt-2 block text-xs leading-relaxed text-slate-600">{service.reason}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-700 group-hover:gap-2 transition-all">
                      View service <FiArrowRight className="h-3 w-3" />
                    </span>
                  </NextLink>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Content depth §71 — game plan: real ordered mini-checklist for
          this exact kampung. Per-slug variant + profile keeps neighbouring
          pages from repeating the same sequence. */}
      <section id="kampung-game-plan" aria-labelledby="kampung-game-plan-heading" className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="kampung-game-plan-heading" className="speakable text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              {gamePlan.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 max-w-3xl speakable">
              {gamePlan.intro}
            </p>
            <ol className="mt-6 space-y-3">
              {gamePlan.steps.map((step, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-black text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-black text-slate-950">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 max-w-3xl">{gamePlan.closing}</p>
          </Reveal>
        </div>
      </section>

      {/* Content depth §71 — local signals: 4-dimension mini-table with
          per-dimension variant selection so 6 kampungs in the same parent
          area produce 4^N different combinations rather than one shared
          paragraph. */}
      <section id="kampung-signals" aria-labelledby="kampung-signals-heading" className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="kampung-signals-heading" className="speakable text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              {signals.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 max-w-3xl speakable">
              {signals.intro}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {signals.rows.map((row) => (
                <div key={row.dimension} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">{row.dimension}</p>
                  <p className="mt-2 text-sm font-black text-slate-950">{row.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{row.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 max-w-3xl">{signals.closing}</p>
          </Reveal>
        </div>
      </section>

      <LocalPriceComparisonTable locale="en" name={k.name} />
      <ExpertReviewBlock locale="en" name={k.name} context="kampung" seed={`kampung-${k.slug}-en`} />

      {k.faqs?.length > 0 && (
        <section className="py-10 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                FAQ — {k.name}
              </h2>
              <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                {k.faqs.map((faq: { q: string; a: string }, i: number) => (
                  <details key={i} className="group bg-white p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                      {faq.q}
                      <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                    </summary>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {relatedProblems.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                Common Aircond Problems Near {k.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedProblems.map((p) => (
                  <NextLink
                    key={p.slug}
                    href={`/problems/${p.slug}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                  >
                    {p.name}
                  </NextLink>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {relatedBlogs.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                Helpful Guides for {k.name} Residents
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedBlogs.map((b) => (
                  <NextLink
                    key={b.slug}
                    href={`/blog/${b.slug}`}
                    className="inline-flex items-center gap-1.5 border border-sky-200 bg-white px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50 transition rounded-xl"
                  >
                    {b.title}
                  </NextLink>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <MoneyCrossLinks
              block={kampungChildBlock(k.slug, k.name, slug, parentArea?.name || slug, "en")}
            />
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
              Other Areas Near {k.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {siblingKampungs.map((s) => (
                <NextLink
                  key={s.slug}
                  href={`/areas/${slug}/${s.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  <FiMapPin className="h-3 w-3 text-sky-400 shrink-0" />
                  {s.name}
                </NextLink>
              ))}
              <NextLink
                href={`/areas/${slug}`}
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
              >
                All of {parentArea?.name} <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
