import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowRight, FiChevronRight, FiMapPin } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";
import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { getProblemsForKampung, getBlogsForKampung } from "@/config/topical-authority-map";

// ─────────────────────────────────────────────────────────────────────────
// /ms/areas/[slug]/[kampung] — Bahasa Malaysia kampung page.
// Mirrors /areas/[slug]/[kampung]. Only ships for kampungs that have
// descriptionMS populated (all of Batch 1 do).
// ─────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return siteConfig.kampungPages
    .filter((k) => k.descriptionMS)
    .map((k) => ({ slug: k.parentSlug, kampung: k.slug }));
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
  if (!k || !k.descriptionMS) return { title: "Halaman tidak dijumpai" };

  const enUrl = `https://www.klrenovator.com/areas/${slug}/${kampung}`;
  const msUrl = `https://www.klrenovator.com/ms/areas/${slug}/${kampung}`;
  const zhUrl = `https://www.klrenovator.com/zh/areas/${slug}/${kampung}`;

  return {
    title: k.metaTitleMS || k.metaTitle,
    description: k.metaDescMS || k.metaDesc,
    openGraph: {
      title: k.metaTitleMS || k.metaTitle,
      description: k.metaDescMS || k.metaDesc,
      url: msUrl,
      type: "website",
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
    },
    alternates: {
      canonical: msUrl,
      languages: { "en-MY": enUrl, "ms-MY": msUrl, "zh-MY": zhUrl, "x-default": enUrl },
    },
  };
}

export default async function KampungPageMS({
  params,
}: {
  params: Promise<{ slug: string; kampung: string }>;
}) {
  const { slug, kampung } = await params;
  const k = siteConfig.kampungPages.find(
    (x) => x.slug === kampung && x.parentSlug === slug
  );
  if (!k || !k.descriptionMS) notFound();

  const parentArea = siteConfig.areaPages.find((a) => a.slug === k.parentSlug);
  const enUrl = `https://www.klrenovator.com/areas/${slug}/${kampung}`;
  const msUrl = `https://www.klrenovator.com/ms/areas/${slug}/${kampung}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Laman Utama", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Kawasan Servis", item: "https://www.klrenovator.com/ms/areas" },
      { "@type": "ListItem", position: 3, name: parentArea?.name, item: `https://www.klrenovator.com/ms/areas/${slug}` },
      { "@type": "ListItem", position: 4, name: k.name, item: msUrl },
    ],
  };

  const faqSchema = k.faqsBM?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: k.faqsBM.map((f: { q: string; a: string }) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const siblingKampungs = siteConfig.kampungPages.filter(
    (x) => x.parentSlug === slug && x.slug !== kampung && x.descriptionMS
  );

  const relatedProblemSlugs = getProblemsForKampung(slug);
  const relatedProblems = relatedProblemSlugs
    .map((ps) => siteConfig.problemPages.find((p) => p.slug === ps))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedBlogSlugs = getBlogsForKampung(slug);
  const relatedBlogs = relatedBlogSlugs
    .map((bs) => allPosts.find((b) => b.slug === bs))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <nav className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-4">
              <NextLink href="/ms/areas" className="hover:text-sky-600">Kawasan Servis</NextLink>
              <FiChevronRight className="h-3 w-3" />
              <NextLink href={`/ms/areas/${slug}`} className="hover:text-sky-600">{parentArea?.name}</NextLink>
              <FiChevronRight className="h-3 w-3" />
              <span className="text-slate-600">{k.name}</span>
            </nav>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Servis Aircond · {k.state}
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg" })}>Servis Aircond </span>
              <span className={title({ size: "lg", color: "brand" })}>{k.name}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {k.descriptionMS}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(`Hi KL Renovator, saya nak tempah servis aircond di ${k.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
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

      {k.faqsBM?.length > 0 && (
        <section className="py-10 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Soalan Lazim — {k.name}
              </h2>
              <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                {k.faqsBM.map((faq: { q: string; a: string }, i: number) => (
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
                Masalah Aircond Biasa Berhampiran {k.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedProblems.map((p) => (
                  <NextLink
                    key={p.slug}
                    href={`/ms/problems/${p.slug}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                  >
                    {p.nameMS || p.name}
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
                Panduan Berguna untuk Penduduk {k.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedBlogs.map((b) => (
                  <NextLink
                    key={b.slug}
                    href={`/blog/${b.slug}`}
                    className="inline-flex items-center gap-1.5 border border-sky-200 bg-white px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50 transition rounded-xl"
                  >
                    {b.titleMS || b.title}
                  </NextLink>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
              Kawasan Lain Berhampiran {k.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {siblingKampungs.map((s) => (
                <NextLink
                  key={s.slug}
                  href={`/ms/areas/${slug}/${s.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  <FiMapPin className="h-3 w-3 text-sky-400 shrink-0" />
                  {s.name}
                </NextLink>
              ))}
              <NextLink
                href={`/ms/areas/${slug}`}
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
              >
                Semua {parentArea?.name} <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
