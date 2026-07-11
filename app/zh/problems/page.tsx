import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import Image from "next/image";
import NextLink from "next/link";
import { FiArrowRight, FiAlertTriangle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { PROBLEM_ENTITY_HUBS } from "@/config/problem-entity-hubs";

export const metadata: Metadata = {
  title: clampMetaTitle("吉隆坡冷气故障指南 | KL Renovator"),
  description:
    "吉隆坡与雪兰莪常见冷气故障指南——不冷、漏水、噪音、异味等。诊断与维修。WhatsApp +60182983573。",
  openGraph: {
    title: clampMetaTitle("吉隆坡冷气故障指南 | KL Renovator"),
    description:
      "吉隆坡与雪兰莪常见冷气故障完整指南。当天上门、透明报价。WhatsApp +60182983573。",
    url: "https://www.klrenovator.com/zh/problems",
    type: "website",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator 冷气故障s Guide — KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("吉隆坡冷气故障指南 | KL Renovator"),
    description: "冷气故障指南——不冷、漏水、噪音、异味、闪灯。当天服务。",
    images: ["https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp"],
  },
  alternates: buildTrilingualHreflang("/problems"),
};

// ── Schemas ─────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: "https://www.klrenovator.com/zh" },
    { "@type": "ListItem", position: 2, name: "冷气故障", item: "https://www.klrenovator.com/zh/problems" },
  ],
};

const waMsg = "Hi KL Renovator，我的冷气有问题。可以帮忙诊断维修吗？我的位置是：";

// Truncates at the last full word within the limit instead of cutting
// mid-word (e.g. "refrigerant ga..." instead of stopping before "gas").
function truncateAtWord(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "...";
}

export default function ProblemsPageZH() {
  const problems = siteConfig.problemPages;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/aircond-repair-technician-klang-valley.webp"
            alt="KL Renovator aircond repair technician diagnosing problems"
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>冷气故障诊断</p>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>常见冷气</span>
              <span className={title({ size: "lg", color: "brand" })}>故障 KL & Selangor</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              KL Renovator 诊断并修复吉隆坡与雪兰莪所有常见冷气故障。请选择下方问题——每篇指南说明原因、修法与价格。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> WhatsApp 诊断
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all"
              >
                致电 {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>全部故障</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>选择您的</span>
                <span className={title({ size: "sm", color: "brand" })}>冷气故障</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {problems.map((problem, i) => (
              <Reveal key={problem.slug} delay={i * 20}>
                <NextLink
                  href={`/zh/problems/${problem.slug}`}
                  className="group flex flex-col bg-white border border-slate-200 hover:border-red-200 hover:shadow-md rounded-2xl p-5 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <FiAlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                    <h3 className="font-black text-sm text-slate-900 group-hover:text-sky-700 transition-colors leading-tight">
                      {problem.nameZH || problem.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed flex-1">
                    {truncateAtWord(problem.description, 100)}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-black text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
                      查看修法 →
                    </span>
                    <FiArrowRight className="h-4 w-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                  </div>
                </NextLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      {/* Round 52 / 10.8 — Entity Hub clusters */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>故障分组</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>按症状 </span>
                <span className={title({ size: "sm", color: "brand" })}>快速查找</span>
              </h2>
              <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto font-medium">
                相关冷气故障已分组，方便您更快找到正确修法、服务与指南。
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROBLEM_ENTITY_HUBS.map((hub, i) => {
              const hubProblems = problems.filter((p) => hub.problemSlugs.includes(p.slug));
              const primary = siteConfig.services.find((s) => s.slug === hub.primaryService);
              return (
                <Reveal key={hub.id} delay={i * 40}>
                  <div className="h-full flex flex-col bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-sky-200 hover:shadow-md transition">
                    <h3 className="font-black text-base text-slate-900 mb-2">{hub.labels.zh.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{hub.labels.zh.blurb}</p>
                    <ul className="space-y-1.5 mb-4 flex-1">
                      {hubProblems.map((p) => (
                        <li key={p.slug}>
                          <NextLink
                            href={`/zh/problems/${p.slug}`}
                            className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-sky-600 transition"
                          >
                            <FiArrowRight className="h-3 w-3 text-sky-500 shrink-0" />
                            {p.nameZH || p.name}
                          </NextLink>
                        </li>
                      ))}
                    </ul>
                    {primary && (
                      <NextLink
                        href={`/zh/services/${primary.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white transition"
                      >
                        {primary.title} <FiArrowRight className="h-3 w-3" />
                      </NextLink>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hub.secondaryServices.map((slug) => {
                        const s = siteConfig.services.find((x) => x.slug === slug);
                        if (!s) return null;
                        return (
                          <NextLink
                            key={slug}
                            href={`/zh/services/${slug}`}
                            className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-1 rounded-full hover:bg-sky-100 transition"
                          >
                            {s.title}
                          </NextLink>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Answer Section — AEO */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>快速解答</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Most 常见冷气</span>
                <span className={title({ size: "sm", color: "brand" })}>问题</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                q: "冷气运行但不冷，怎么办？",
                a: "最常见原因是冷媒不足、蒸发器脏或电容故障。WhatsApp KL Renovator +60182983573，告知匹数与地区——技师会先诊断并报价再开工。",
              },
              {
                q: "冷气滴水危险吗？",
                a: "室内机滴水通常是排水管堵塞或水盘脏。虽不立刻危险，但应尽快处理——长期漏水会发霉并损坏天花板/电路。",
              },
              {
                q: "冷气开机有臭味是什么原因？",
                a: "异味多由蒸发器盘管发霉引起。化学清洗（从 RM 120）可除霉除味。若像烧焦味，请关机并立即联系我们。",
              },
              {
                q: "冷气灯在闪且停机是什么故障？",
                a: "闪灯是PCB错误代码。闪烁规律对应具体故障——缺气、传感器脏、通信错误或PCB损坏。KL Renovator 会读取并诊断根因。",
              },
              {
                q: "用了冷气电费为什么变高？",
                a: "盘管脏或冷媒不足会让压缩机更费力，耗电增加。化学清洗或加气可明显降低运行成本。",
              },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 30}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-black text-sm text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">我们的服务</h3>
                <ul className="space-y-2">
                  {siteConfig.services.map((s) => (
                    <li key={s.slug}>
                      <NextLink href={`/zh/services/${s.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors">
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" /> {s.title}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">服务区域</h3>
                <ul className="space-y-2">
                  {siteConfig.areaPages.slice(0, 8).map((area) => (
                    <li key={area.slug}>
                      <NextLink href={`/zh/areas/${area.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors">
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" /> {area.name}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">服务品牌</h3>
                <ul className="space-y-2">
                  {siteConfig.brandPages.slice(0, 8).map((b) => (
                    <li key={b.slug}>
                      <NextLink href={`/zh/brands/${b.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors">
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" /> {b.name}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Get Your 冷气故障 Fixed Today
            </h2>
            <p className="mt-3 text-sky-100 font-medium">
              吉隆坡与雪兰莪当天上门。开工前透明报价。支持各品牌。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> 立即 WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                致电 {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
