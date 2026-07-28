import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowRight, FiChevronRight, FiAlertTriangle, FiTool } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { problemContent } from "@/app/problems/[slug]/page";
import { problemAEOContent } from "@/config/problem-aeo-content";
import { PROBLEM_BRAND_MAP, PROBLEM_BLOG_MAP_V2, PROBLEM_SERVICE_MAP } from "@/config/topical-authority-map";
import { getHubsForProblem } from "@/config/problem-entity-hubs";
import { allPosts } from "@/config/blog-posts";
import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { FiCheckCircle, FiUserCheck } from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────────────
// /ms/problems/[slug] — Bahasa Malaysia problem page.
// Reuses `problemContent` exported from the English template
// (app/problems/[slug]/page.tsx) instead of duplicating ~1,500 lines of
// causes/solution/warning/FAQ data. All 20 problems already have BM data.
// ─────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return siteConfig.problemPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const problem = siteConfig.problemPages.find((p) => p.slug === slug);
  if (!problem) return { title: "Halaman tidak dijumpai" };

  const enUrl = `https://www.klrenovator.com/problems/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/problems/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/problems/${slug}`;

  return {
    title: clampMetaTitle(problem.metaTitleMS || problem.metaTitle),
    description: problem.metaDescMS || problem.metaDesc,
    openGraph: {
      title: clampMetaTitle(problem.metaTitleMS || problem.metaTitle),
      description: problem.metaDescMS || problem.metaDesc,
      url: msUrl,
      type: "website",
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
      images: [
        {
          url: `https://www.klrenovator.com${problem.heroImage}`,
          width: 1200,
          height: 630,
          alt: problem.nameMS || problem.name,
        },
      ],
    },
    alternates: {
      canonical: msUrl,
      languages: { "en-MY": enUrl, "ms-MY": msUrl, "zh-MY": zhUrl, "x-default": enUrl },
    },
  };
}

export default async function ProblemPageMS({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = siteConfig.problemPages.find((p) => p.slug === slug);
  const content = problemContent[slug];
  const aeo = problemAEOContent[slug];
  if (!problem || !content) notFound();

  const enUrl = `https://www.klrenovator.com/problems/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/problems/${slug}`;
  const relatedService = siteConfig.services.find((s) => s.slug === problem.relatedService);
  const secondaryServiceSlug = PROBLEM_SERVICE_MAP[slug]?.secondary;
  const secondaryService = secondaryServiceSlug
    ? siteConfig.services.find((s) => s.slug === secondaryServiceSlug)
    : undefined;


  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...content.faqsBM, ...(problemAEOContent[slug]?.extraFaqsMS ?? [])].map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Laman Utama", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Masalah", item: "https://www.klrenovator.com/ms/problems" },
      { "@type": "ListItem", position: 3, name: problem.nameMS || problem.name, item: msUrl },
    ],
  };

  const otherMsProblems = siteConfig.problemPages.filter((p) => p.slug !== slug).slice(0, 8);
  const relatedBrandSlugsMS = PROBLEM_BRAND_MAP[slug] ?? [];
  const relatedBrandsMS = siteConfig.brandPages.filter((b) => relatedBrandSlugsMS.includes(b.slug));
  const relatedAreasMSProblem = siteConfig.areaPages.slice(0, 12);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/ms" className="hover:text-sky-600 transition font-medium">Laman Utama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/ms/problems" className="hover:text-sky-600 transition font-medium">Masalah</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-bold">{problem.nameMS || problem.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Masalah Aircond
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg", color: "brand" })}>{problem.nameMS || problem.name}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {problem.descriptionMS || problem.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(`Hi KL Renovator, aircond saya ada masalah: ${problem.nameMS || problem.name}.`)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp Sekarang
              </a>
              <NextLink
                href={enUrl}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 px-7 py-3.5 text-sm font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 transition-all rounded-xl"
              >
                Read in English <FiArrowRight className="h-3.5 w-3.5" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {aeo && (
        <section className="py-8 bg-sky-50 border-b border-sky-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-2">Jawapan Terus</p>
              <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">{aeo.directAnswerMS}</p>
            </Reveal>
          </div>
        </section>
      )}

      {aeo && (
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">Semakan DIY vs Perlu Juruteknik</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              <Reveal>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <FiCheckCircle className="h-4 w-4 text-emerald-600" />
                    <h3 className="font-black text-xs text-emerald-800 uppercase">Boleh Semak Sendiri</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {aeo.diyChecksMS.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-black">•</span><span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <FiUserCheck className="h-4 w-4 text-sky-400" />
                    <h3 className="font-black text-xs text-white uppercase">Perlu Juruteknik</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-200">
                    {aeo.technicianChecksMS.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-400 font-black">•</span><span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <FiTool className="h-4 w-4 text-sky-600" /> Punca Biasa
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {content.causesBM.map((c: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-sky-500 font-black">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="text-sm font-black text-slate-900 mb-2">Penyelesaian KL Renovator</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{content.solutionBM}</p>
            </div>

            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
              <FiAlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed font-medium">{content.warningBM}</p>
            </div>

            {relatedService && (
              <NextLink
                href={`/ms/services/${relatedService.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-black text-sky-600 hover:text-sky-800"
              >
                Lihat Servis {relatedService.title} <FiArrowRight className="h-3.5 w-3.5" />
              </NextLink>
            )}
            {secondaryService && (
              <NextLink
                href={`/ms/services/${secondaryService.slug}`}
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50 px-4 py-2.5 text-sm font-bold text-slate-700 rounded-xl transition-all"
              >
                Juga: {secondaryService.title}
                <FiArrowRight className="h-3.5 w-3.5 text-sky-500" />
              </NextLink>
            )}
          </Reveal>
        </div>
      </section>

      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">Soalan Lazim</h2>
            <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
              {[...content.faqsBM, ...(aeo?.extraFaqsMS ?? [])].map((faq: { q: string; a: string }, i: number) => (
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

      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Bukti Kerja Sebenar
            </p>
            <h2 className="text-base font-black text-slate-900 mb-4">
              Lihat hasil sebelum & selepas kerja aircond sebelum anda membuat tempahan
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <NextLink
                href="/ms/gallery"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Galeri Sebelum & Selepas</p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  Semak foto sebenar kerja cuci kimia, pembaikan dan pemasangan
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Lihat bagaimana KL Renovator mengendalikan gegelung kotor, unit bocor, kerja pemasangan dan hasil pembaikan di seluruh KL &amp; Selangor.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  Buka Galeri <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Mengapa ini membantu</p>
                <h3 className="text-base font-black text-slate-900">
                  Bandingkan mutu kerja sebenar sebelum memilih pilihan pembaikan
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Pelanggan yang berdepan masalah {problem.nameMS || problem.name} biasanya mahu lihat standard kerja sebenar, cara perlindungan kawasan dan hasil kerja juruteknik di lokasi.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brands — triangular cross-link (Round 10.5) */}
      {relatedBrandsMS.length > 0 && (
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
                Jenama · 品牌
              </p>
              <h2 className="text-base font-black text-slate-900 mb-4">
                {problem.nameMS || problem.name} — Biasa Pada Jenama Ini
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedBrandsMS.map((b) => (
                  <NextLink
                    key={b.slug}
                    href={`/ms/brands/${b.slug}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 hover:border-sky-300 hover:bg-sky-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-sky-700 rounded-xl transition-all"
                  >
                    <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />
                    Aircond {b.name}
                  </NextLink>
                ))}
                <NextLink
                  href="/ms/brands"
                  className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 text-xs font-black text-sky-700 rounded-xl transition-all"
                >
                  Semua Jenama <FiArrowRight className="h-3 w-3" />
                </NextLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Areas — triangular cross-link (Round 10.5) */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
              Baiki Mengikut Lokasi · 按地区修复
            </p>
            <h2 className="text-base font-black text-slate-900 mb-4">
              Pembaikan {problem.nameMS || problem.name} — Kawasan KL & Selangor
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedAreasMSProblem.map((area) => (
                <NextLink
                  key={area.slug}
                  href={`/ms/areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50 px-3 py-1.5 text-xs font-bold text-slate-700 rounded-xl transition-all"
                >
                  <FiArrowRight className="h-3 w-3 text-sky-500 shrink-0" />
                  {area.name}
                </NextLink>
              ))}
              <NextLink
                href="/ms/areas"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 text-xs font-bold text-sky-700 rounded-xl transition-all"
              >
                Semua Kawasan <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      
      {/* Round 51 / 10.1–10.6: Problem → Blog reverse guides */}
      {(() => {
        const relatedSlugs = PROBLEM_BLOG_MAP_V2[slug] ?? [];
        const relatedPosts = allPosts.filter((p) => relatedSlugs.includes(p.slug)).slice(0, 3);
        if (relatedPosts.length === 0) return null;
        return (
          <section className="py-10 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Panduan Pakar</p>
                <h2 className="text-base font-black text-slate-900 mb-4">Panduan Berkaitan Masalah Ini</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {relatedPosts.map((post) => (
                    <NextLink
                      key={post.slug}
                      href={`/ms/blog/${post.slug}`}
                      className="group flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-sky-400 hover:shadow-md transition"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{post.categoryMS || post.category}</span>
                      <span className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition leading-snug mb-2">{post.titleMS || post.title}</span>
                      <span className="text-xs text-slate-500 line-clamp-2">{post.excerptMS || post.excerpt}</span>
                    </NextLink>
                  ))}
                </div>
                <div className="mt-4">
                  <NextLink href="/ms/blog" className="text-xs font-black uppercase tracking-widest text-sky-700 hover:text-sky-900">
                    Semua Artikel →
                  </NextLink>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}


      {/* Round 52 / 10.8 — Related symptom hubs for this problem entity */}
      {(() => {
        const hubs = getHubsForProblem(slug);
        if (hubs.length === 0) return null;
        return (
          <section className="py-12 bg-slate-50 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Kumpulan Simptom Berkaitan</p>
                <h2 className="text-base font-black text-slate-900 mb-4">Masalah Lain Dalam Kumpulan Sama</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {hubs.map((hub) => {
                    const label = hub.labels.ms;
                    const others = siteConfig.problemPages.filter(
                      (p) => hub.problemSlugs.includes(p.slug) && p.slug !== slug
                    );
                    const primary = siteConfig.services.find((s) => s.slug === hub.primaryService);
                    return (
                      <div key={hub.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-black text-sm text-slate-900 mb-1">{label.title}</h3>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">{label.blurb}</p>
                        <ul className="space-y-1 mb-3">
                          {others.slice(0, 4).map((p) => (
                            <li key={p.slug}>
                              <NextLink href={`/ms/problems/${p.slug}`} className="text-sm font-semibold text-sky-700 hover:text-sky-900">
                                {p.nameMS || p.name}
                              </NextLink>
                            </li>
                          ))}
                        </ul>
                        <NextLink href="/ms/problems" className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-sky-600">
                          Semua kumpulan masalah →
                        </NextLink>
                        {primary && (
                          <div className="mt-3">
                            <NextLink href={`/ms/services/${primary.slug}`} className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
                              {primary.title}
                            </NextLink>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
              Masalah Lain Yang Kami Selesaikan
            </p>
            <div className="flex flex-wrap gap-2">
              {otherMsProblems.map((p) => (
                <NextLink
                  key={p.slug}
                  href={`/ms/problems/${p.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  {p.nameMS || p.name}
                </NextLink>
              ))}
              <NextLink
                href="/ms/problems"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
              >
                Semua Masalah <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
