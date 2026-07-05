import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight, FiMapPin } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";
import { AREA_BLOG_MAP } from "@/config/topical-authority-map";
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
    .filter((a) => a.faqsZH && a.faqsZH.length > 0)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = siteConfig.areaPages.find((a) => a.slug === slug);
  if (!area || !area.faqsZH?.length) return { title: "页面未找到" };

  const enUrl = `https://www.klrenovator.com/areas/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/areas/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/areas/${slug}`;
  const hasMs = area.faqsBM?.length > 0;

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
  const area = siteConfig.areaPages.find((a) => a.slug === slug);
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
      worstRating: 1,
    },
    priceRange: "RM 88 – RM 2,000",
    currenciesAccepted: "MYR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `https://www.klrenovator.com/areas/${slug}#breadcrumb`,
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
  const areaBlogPosts = allPosts
    .filter((p) => (AREA_BLOG_MAP[slug] ?? AREA_BLOG_MAP["_default"] ?? []).includes(p.slug))
    .slice(0, 3);

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
              <div className="mt-5 flex flex-wrap gap-2">
                {area.landmarks.map((lm) => {
                  const kampungPage = siteConfig.kampungPages?.find(
                    (k) => k.parentSlug === slug && k.name === lm
                  );
                  if (kampungPage && kampungPage.descriptionZH) {
                    return (
                      <NextLink
                        key={lm}
                        href={`/zh/areas/${slug}/${kampungPage.slug}`}
                        className="text-xs font-bold bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-200 hover:bg-sky-100 transition"
                      >
                        {lm}
                      </NextLink>
                    );
                  }
                  const crossArea = siteConfig.areaPages.find((a) => a.name === lm && a.slug !== slug);
                  if (crossArea) {
                    return (
                      <NextLink
                        key={lm}
                        href={`/areas/${crossArea.slug}`}
                        className="text-xs font-bold bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-200 hover:bg-sky-100 transition"
                      >
                        {lm}
                      </NextLink>
                    );
                  }
                  const kampungElsewhere = siteConfig.kampungPages?.find(
                    (k) => k.name === lm && k.parentSlug !== slug
                  );
                  if (kampungElsewhere) {
                    return (
                      <NextLink
                        key={lm}
                        href={`/areas/${kampungElsewhere.parentSlug}/${kampungElsewhere.slug}`}
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
            )}

            {/* Dedicated neighbourhood pages for this area, if any exist */}
            {siteConfig.kampungPages
              ?.filter((k) => k.parentSlug === slug && k.descriptionZH)
              .length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  社区指南
                </p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.kampungPages
                    .filter((k) => k.parentSlug === slug && k.descriptionZH)
                    .map((k) => (
                      <NextLink
                        key={k.slug}
                        href={`/zh/areas/${slug}/${k.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-black text-sky-600 hover:text-sky-800 underline"
                      >
                        {k.name} 冷气服务
                      </NextLink>
                    ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(`Hi KL Renovator，我想在${area.name}预约冷气服务。`)}
                target="_blank"
                rel="nofollow noopener noreferrer"
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

      {/* Near Me — ZH */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">
              {area.name} 附近冷气服务 — 当天预约
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              如果您搜索了&quot;附近冷气服务&quot;并来到这里，您来对地方了。KL Renovator 每天派遣训练有素的技术员到 {area.name} 及周边社区。我们处理从基本保养、化学清洗到紧急维修和充气的一切服务——全部价格透明，并享有一个月工艺保修。立即 WhatsApp 联系我们，我们将在几分钟内确认您的时间段。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">{area.name} 附近冷气服务</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">当天冷气维修附近</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">附近最好的冷气技术员</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">附近化学清洗冷气</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Geographic Coverage — ZH */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">
              吉隆坡谷冷气维修与服务 — 覆盖 KL & 雪兰莪
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {area.name} 位于大吉隆坡谷走廊内，KL Renovator 的服务网络覆盖从吉隆坡市中心到每个雪兰莪郊区的全程。无论您需要在吉隆坡进行日常冷气服务、在吉隆坡谷进行紧急冷气维修，还是在雪兰莪进行全面化学大修，我们的技术员今天已经在您的区域工作。每辆车上都携带常用零件、制冷剂和清洁化学品——因此大多数工作可在一次上门完成。
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white border border-slate-200 rounded-xl p-3">
                <h3 className="font-bold text-slate-900 text-sm mb-1">吉隆坡冷气服务</h3>
                <p className="text-xs text-slate-500">覆盖整个吉隆坡，包括 {area.name} 及所有相邻社区。可提供当天时段。</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3">
                <h3 className="font-bold text-slate-900 text-sm mb-1">吉隆坡谷冷气维修</h3>
                <p className="text-xs text-slate-500">整个吉隆坡谷都市区的紧急维修派遣。30–60 分钟响应。</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3">
                <h3 className="font-bold text-slate-900 text-sm mb-1">雪兰莪冷气服务</h3>
                <p className="text-xs text-slate-500">覆盖所有雪兰莪地区，包括 Petaling、Gombak、Hulu Langat、Klang 和 Sepang。</p>
              </div>
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

      {/* Contextual Guides — in-body blog links for area pages */}
      {areaBlogPosts.length > 0 && (
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
                预约前先看
              </p>
              <h2 className="text-base font-black text-slate-900 mb-3">
                {area.name} 客户预约前最常阅读的冷气指南
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                很多 {area.name} 客户会先阅读这些指南，再通过 WhatsApp 向我们询价，尤其是在比较维修、化学清洗、保养频率或安装费用的时候。
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {areaBlogPosts.map((post) => (
                  <NextLink
                    key={post.slug}
                    href={`/zh/blog/${post.slug}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-400 hover:bg-white hover:shadow-sm"
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{post.categoryZH}</p>
                    <h3 className="text-sm font-black text-slate-900 leading-snug">{post.titleZH}</h3>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-3">{post.excerptZH}</p>
                  </NextLink>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

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

          {/* Near Me FAQs — ZH */}
          <Reveal>
            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">📍 附近服务</p>
              <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                <details className="group bg-white p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    {area.name} 附近有冷气服务吗？
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    有的——KL Renovator 在 {area.name} 为您提供当天附近的冷气服务。通过 WhatsApp +60182983573 发送您的地址，我们将派遣最近的技术员。{area.name} 的大多数预约在30分钟内确认。
                  </p>
                </details>
                <details className="group bg-white p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    {area.name} 附近最好的冷气维修技术员是谁？
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    KL Renovator 训练有素的技术员在 {area.name} 和吉隆坡谷获得高度评价。拥有500多个五星好评、透明的 upfront 定价和一个月工艺保修，我们是您附近冷气维修和服务的信赖选择。
                  </p>
                </details>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery + Near Me + Neighbourhood Links — orphan-link fix */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              真实案例 + 覆盖范围
            </p>
            <h2 className="text-base font-black text-slate-900 mb-6">
              查看 {area.name} 附近的真实作业照片与服务覆盖范围
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <NextLink
                href="/zh/gallery"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">前后对比图库</p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  预约前先查看 KL Renovator 的真实作业照片
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  查看来自吉隆坡与雪兰莪住宅、公寓、办公室和店铺的真实化学清洗、大修、安装与维修成果。
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  查看图库 <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>

              <NextLink
                href="/near-me"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">附近服务中心</p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  查看您附近的当天冷气服务可用性
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  使用我们的 Klang Valley near-me 页面比较附近覆盖区域，并选择最快的 WhatsApp 预约路线。
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  打开 Near Me 页面 <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>
            </div>

            {siteConfig.kampungPages?.filter((k) => k.parentSlug === slug && k.descriptionZH).length > 0 && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                  {area.name} 的社区页面
                </p>
                <h3 className="text-base font-black text-slate-900">
                  {area.name} 下属更小社区的服务页面
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  这些社区页面可帮助较小住宅区的客户更快找到最相关的冷气服务信息。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {siteConfig.kampungPages
                    .filter((k) => k.parentSlug === slug && k.descriptionZH)
                    .map((k) => (
                      <NextLink
                        key={k.slug}
                        href={`/zh/areas/${slug}/${k.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
                      >
                        {k.name} 冷气服务
                        <FiArrowRight className="h-3 w-3 text-sky-400" />
                      </NextLink>
                    ))}
                </div>
              </div>
            )}
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
