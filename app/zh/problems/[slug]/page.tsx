import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowRight, FiChevronRight, FiAlertTriangle, FiTool } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { problemContent } from "@/app/problems/[slug]/page";
import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

// ─────────────────────────────────────────────────────────────────────────
// /zh/problems/[slug] — Mandarin problem page. Mirrors /ms/problems/[slug].
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
  const problem = siteConfig.problemPages.find((p) => p.slug === slug) as any;
  if (!problem) return { title: "页面未找到" };

  const enUrl = `https://www.klrenovator.com/problems/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/problems/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/problems/${slug}`;

  return {
    title: problem.metaTitleZH || problem.metaTitle,
    description: problem.metaDescZH || problem.metaDesc,
    openGraph: {
      title: problem.metaTitleZH || problem.metaTitle,
      description: problem.metaDescZH || problem.metaDesc,
      url: zhUrl,
      type: "website",
      locale: "zh_MY",
      alternateLocale: ["en_MY", "ms_MY"],
    },
    alternates: {
      canonical: zhUrl,
      languages: { "en-MY": enUrl, "ms-MY": msUrl, "zh-MY": zhUrl, "x-default": enUrl },
    },
  };
}

export default async function ProblemPageZH({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = siteConfig.problemPages.find((p) => p.slug === slug) as any;
  const content = problemContent[slug];
  if (!problem || !content) notFound();

  const enUrl = `https://www.klrenovator.com/problems/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/problems/${slug}`;
  const relatedService = siteConfig.services.find((s) => s.slug === problem.relatedService);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqsZH.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "常见问题", item: "https://www.klrenovator.com/zh/problems" },
      { "@type": "ListItem", position: 3, name: problem.nameZH || problem.name, item: zhUrl },
    ],
  };

  const otherZhProblems = siteConfig.problemPages.filter((p) => p.slug !== slug).slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              冷气问题
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg", color: "brand" })}>{problem.nameZH || problem.name}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {problem.descriptionZH || problem.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(`Hi KL Renovator，我的冷气有问题：${problem.nameZH || problem.name}。`)}
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

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <FiTool className="h-4 w-4 text-sky-600" /> 常见原因
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {content.causesZH.map((c: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-sky-500 font-black">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="text-sm font-black text-slate-900 mb-2">KL Renovator 解决方案</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{content.solutionZH}</p>
            </div>

            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
              <FiAlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed font-medium">{content.warningZH}</p>
            </div>

            {relatedService && (
              <NextLink
                href={`/services/${relatedService.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-black text-sky-600 hover:text-sky-800"
              >
                查看{relatedService.name}服务 <FiArrowRight className="h-3.5 w-3.5" />
              </NextLink>
            )}
          </Reveal>
        </div>
      </section>

      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">常见问题</h2>
            <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
              {content.faqsZH.map((faq: { q: string; a: string }, i: number) => (
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

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
              我们解决的其他问题
            </p>
            <div className="flex flex-wrap gap-2">
              {otherZhProblems.map((p) => (
                <NextLink
                  key={p.slug}
                  href={`/zh/problems/${p.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  {p.nameZH || p.name}
                </NextLink>
              ))}
              <NextLink
                href="/problems"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
              >
                所有问题 <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
