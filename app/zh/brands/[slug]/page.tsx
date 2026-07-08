import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { BRAND_PROBLEM_MAP } from "@/config/topical-authority-map";
import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { buildBrandAreaComboModule } from "@/config/brand-area-combo-links";

// ─────────────────────────────────────────────────────────────────────────
// /zh/brands/[slug] — Mandarin brand page. Mirrors /ms/brands/[slug].
// ─────────────────────────────────────────────────────────────────────────

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
  if (!brand) return { title: "页面未找到" };

  const enUrl = `https://www.klrenovator.com/brands/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/brands/${slug}`;

  return {
    title: brand.metaTitleZH || brand.metaTitle,
    description: brand.metaDescZH || brand.metaDesc,
    openGraph: {
      title: brand.metaTitleZH || brand.metaTitle,
      description: brand.metaDescZH || brand.metaDesc,
      url: zhUrl,
      type: "website",
      locale: "zh_MY",
      alternateLocale: ["en_MY", "ms_MY"],
      images: [
        {
          url: `https://www.klrenovator.com${brand.heroImage || "/hero/aircond-installation-kuala-lumpur.webp"}`,
          width: 1200,
          height: 630,
          alt: `${brand.name}冷气服务 KL & Selangor — KL Renovator`,
        },
      ],
    },
    alternates: {
      canonical: zhUrl,
      languages: {
        "en-MY": enUrl,
        "ms-MY": msUrl,
        "zh-MY": zhUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default async function BrandPageZH({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) notFound();

  const enUrl = `https://www.klrenovator.com/brands/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/brands/${slug}`;
  const waMsg = `Hi KL Renovator，我想预约${brand.name}冷气服务。`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${brand.name}冷气服务`,
    provider: { "@type": "HVACBusiness", "@id": "https://www.klrenovator.com/#business", name: siteConfig.name },
    areaServed: { "@type": "AdministrativeArea", name: "Kuala Lumpur & Selangor" },
    brand: { "@type": "Brand", name: brand.name },
    description: brand.descriptionZH || brand.description,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "品牌", item: "https://www.klrenovator.com/zh/brands" },
      { "@type": "ListItem", position: 3, name: `${brand.name}冷气`, item: zhUrl },
    ],
  };

  const faqSchema = brand.faqsZH?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: brand.faqsZH.map((f: { q: string; a: string }) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const otherZhBrands = siteConfig.brandPages.filter((b) => b.slug !== slug).slice(0, 10);
  const brandAreaComboModule = buildBrandAreaComboModule(brand, siteConfig.areaPages, "zh");
  const brandProblemSlugsZH = BRAND_PROBLEM_MAP[slug] ?? BRAND_PROBLEM_MAP["_default"];
  const relatedProblemsZH = siteConfig.problemPages.filter((p) => brandProblemSlugsZH.includes(p.slug));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/zh" className="hover:text-sky-600 transition font-medium">首页</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/zh/brands" className="hover:text-sky-600 transition font-medium">品牌</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-bold">{brand.name} 冷气</span>
          </nav>
        </div>
      </div>

      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              品牌冷气服务
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg" })}>{brand.name} </span>
              <span className={title({ size: "lg", color: "brand" })}>冷气服务</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              是的，KL Renovator 在吉隆坡及雪兰莪维修所有 <strong>{brand.name}</strong> 冷气型号。
              {" "}{brand.descriptionZH || brand.description}
            </p>

            {brand.models?.length > 0 && (
              <p className="mt-3 text-sm text-slate-500 font-medium">
                型号：{brand.models.join("、")}。
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

      {brand.highlights?.length > 0 && (
        <section className="py-10 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                我们的{brand.name}专业服务
              </h2>
              <ul className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200 text-sm">
                {brand.highlights.map((h: string, i: number) => (
                  <li key={i} className="bg-white px-4 py-3 flex items-start gap-2">
                    <FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {brand.inverterNoteZH && (
        <section className="py-10 bg-violet-50 border-t border-violet-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-3">
                {brand.name}变频与定频
              </h2>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">{brand.inverterNoteZH}</p>
            </Reveal>
          </div>
        </section>
      )}

      {brand.troubleshootingTipsZH && brand.troubleshootingTipsZH.length > 0 && (
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                {brand.name}故障排除提示
              </h2>
              <div className="space-y-3">
                {brand.troubleshootingTipsZH.map((tip: { issue: string; tip: string }, i: number) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4">
                    <h3 className="font-black text-sm text-slate-900 mb-1.5">{tip.issue}</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{tip.tip}</p>
                  </div>
                ))}
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
                {brand.name}真实作业照片
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {brand.galleryImages.map((img: { src: string; alt: string; altZH?: string }, i: number) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <NextImage
                      src={img.src}
                      alt={img.altZH || img.alt}
                      fill
                      sizes="50vw"
                      className="object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── 信任说明：我们提供维修服务，并非官方经销商 ─────────────────── */}
      <section className="py-10 bg-emerald-50 border-y border-emerald-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center">
                <FiCheck className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="font-black text-sm text-slate-900 mb-1.5 uppercase tracking-wide">
                  我们提供{brand.name}维修服务 — 但并非{brand.name}官方经销商
                </h2>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  KL Renovator是一家独立的HVAC维修服务公司，并非{brand.name}的官方经销商或授权服务中心。我们为{brand.name}机型提供维修、保养和安装服务，使用来自马来西亚可信赖供应商的正品或同等OEM替换零件（电容器、PCB主板、冷媒、排水泵）——绝不使用假冒或未经验证的零件。如果您的{brand.name}机器仍在原厂保修期内，我们会事先告知维修是否可能影响保修，让您自行决定是否改由{brand.name}官方授权中心处理。我们的宗旨是诚实透明的服务——而非推销您不需要的新机器。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {brand.faqsZH?.length > 0 && (
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                常见问题 — {brand.name}冷气
              </h2>
              <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                {brand.faqsZH.map((faq: { q: string; a: string }, i: number) => (
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

      {/* Round 32 / 20D.34: Brand + Area Combo Linking Module */}
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
                {brandAreaComboModule.allAreasLabel} <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {brandAreaComboModule.combos.map((combo) => (
                <NextLink
                  key={combo.href}
                  href={combo.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                >
                  <p className="text-[11px] font-black uppercase tracking-widest text-sky-600">{combo.eyebrow}</p>
                  <h3 className="mt-2 text-base font-black text-slate-950 group-hover:text-sky-700 transition-colors">
                    {combo.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{combo.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {combo.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-700 group-hover:gap-2 transition-all">
                    打开区域路线 <FiArrowRight className="h-3 w-3" />
                  </span>
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Common Problems for This Brand — triangular cross-link (Round 10.5) */}
      {relatedProblemsZH.length > 0 && (
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
                问题 · Masalah
              </p>
              <h2 className="text-base font-black text-slate-900 mb-4">
                我们解决的{brand.name}常见问题
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedProblemsZH.map((p) => (
                  <NextLink
                    key={p.slug}
                    href={`/zh/problems/${p.slug}`}
                    className="inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 rounded-full hover:border-sky-500 hover:text-sky-600 transition"
                  >
                    {p.nameZH || p.name}
                  </NextLink>
                ))}
                <NextLink href="/zh/problems" className="inline-flex items-center gap-1 border border-sky-400 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 rounded-full hover:bg-sky-100 transition">
                  所有问题 →
                </NextLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
              我们服务的其他品牌
            </p>
            <div className="flex flex-wrap gap-2">
              {otherZhBrands.map((b) => (
                <NextLink
                  key={b.slug}
                  href={`/zh/brands/${b.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  {b.name}冷气
                </NextLink>
              ))}
              <NextLink
                href="/brands"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
              >
                所有品牌 <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
