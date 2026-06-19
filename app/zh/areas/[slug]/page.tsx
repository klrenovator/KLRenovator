import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight, FiMapPin } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

// ─────────────────────────────────────────────────────────────────────────
// /zh/areas/[slug] — Mandarin (Chinese) area page.
// Mirrors app/ms/areas/[slug]/page.tsx exactly — see that file's header
// comment for the full pattern explanation. Only areas with `faqsZH`
// populated in config/site.ts get a page here (11 of 38 as of 19 June 2026).
// ─────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return siteConfig.areaPages
    .filter((a) => (a as any).faqsZH && (a as any).faqsZH.length > 0)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = siteConfig.areaPages.find((a) => a.slug === slug) as any;
  if (!area || !area.faqsZH?.length) return { title: "页面未找到" };

  const enUrl = `https://www.klrenovator.com/areas/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/areas/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/areas/${slug}`;
  const hasMs = (area as any).faqsBM?.length > 0;

  return {
    title: area.metaTitleZH || area.metaTitle,
    description: area.metaDescZH || area.metaDesc,
    openGraph: {
      title: area.metaTitleZH || area.metaTitle,
      description: area.metaDescZH || area.metaDesc,
      url: zhUrl,
      type: "website",
      locale: "zh_MY",
      alternateLocale: ["en_MY", "ms_MY"],
    },
    alternates: {
      canonical: zhUrl,
      languages: {
        "en-MY": enUrl,
        ...(hasMs ? { "ms-MY": msUrl } : {}),
        "zh-MY": zhUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default async function AreaPageZH({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = siteConfig.areaPages.find((a) => a.slug === slug) as any;
  if (!area || !area.faqsZH?.length) notFound();

  const enUrl = `https://www.klrenovator.com/areas/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/areas/${slug}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: siteConfig.name,
    legalName: siteConfig.parentCompany,
    url: zhUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: area.descriptionZH || area.description,
    image: "https://www.klrenovator.com/logo/image.png",
    logo: "https://www.klrenovator.com/logo/image.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: area.name,
      addressRegion: area.state,
      addressCountry: "MY",
    },
    geo: { "@type": "GeoCoordinates", latitude: area.lat, longitude: area.lng },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "State", name: area.state },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviewRating,
      reviewCount: siteConfig.reviewCount,
      bestRating: 5,
    },
    priceRange: "RM 88 – RM 2,000",
    currenciesAccepted: "MYR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "服务区域", item: "https://www.klrenovator.com/zh/areas" },
      { "@type": "ListItem", position: 3, name: `${area.name}冷气服务`, item: zhUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqsZH.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${zhUrl}#webpage`,
    name: `${area.name}冷气服务 — KL Renovator`,
    description: area.metaDescZH || area.metaDesc,
    url: zhUrl,
    inLanguage: "zh-MY",
  };

  const otherZhAreas = siteConfig.areaPages
    .filter((a: any) => a.slug !== slug && a.faqsZH?.length > 0)
    .slice(0, 10);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero — direct-answer opening for AEO/GEO */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              冷气服务 · {area.state}
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg" })}>{area.name} </span>
              <span className={title({ size: "lg", color: "brand" })}>冷气服务</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              是的，KL Renovator 在 <strong>{area.state} {area.name}</strong> 提供全面的冷气服务。
              {" "}{area.descriptionZH || area.description}
            </p>

            {area.landmarks?.length > 0 && (
              <p className="mt-3 text-sm text-slate-500 font-medium">
                服务范围：{area.landmarks.join("、")}。
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(`Hi KL Renovator，我想在${area.name}预约冷气服务。`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" />
                立即 WhatsApp
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

      {/* Quick pricing facts — fact-dense block for AI Overviews / GEO */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">
              {area.name} 冷气服务价格
            </h2>
            <ul className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200 text-sm">
              <li className="bg-white px-4 py-3 flex items-start gap-2"><FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" /><span><strong>基本保养：</strong>从 RM 99 起</span></li>
              <li className="bg-white px-4 py-3 flex items-start gap-2"><FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" /><span><strong>化学清洗：</strong>从 RM 120 起</span></li>
              <li className="bg-white px-4 py-3 flex items-start gap-2"><FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" /><span><strong>化学大修：</strong>从 RM 220 起</span></li>
              <li className="bg-white px-4 py-3 flex items-start gap-2"><FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" /><span><strong>充气：</strong>从 RM 120 起</span></li>
            </ul>
            <p className="mt-4 text-xs text-slate-500 font-medium">
              RM 88 的检测费如果当天继续维修，将全额抵扣维修费用。所有工程享30天保修。
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">
              常见问题 — {area.name} 冷气服务
            </h2>
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
          </Reveal>
        </div>
      </section>

      {/* Other ZH area pages — internal linking, avoids orphan pages */}
      {otherZhAreas.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                我们服务的其他区域
              </p>
              <div className="flex flex-wrap gap-2">
                {otherZhAreas.map((a: any) => (
                  <NextLink
                    key={a.slug}
                    href={`/zh/areas/${a.slug}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                  >
                    <FiMapPin className="h-3 w-3 text-sky-400 shrink-0" />
                    {a.name}冷气服务
                  </NextLink>
                ))}
                <NextLink
                  href="/areas"
                  className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
                >
                  所有区域 <FiArrowRight className="h-3 w-3" />
                </NextLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
