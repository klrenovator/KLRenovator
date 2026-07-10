import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import NextLink from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: clampMetaTitle("按品牌分类的冷气服务 KL & Selangor | KL Renovator"),
  description: clampMetaDescription("KL Renovator 服务吉隆坡和雪兰莪所有主要冷气品牌 — 大金、松下、三菱、约克、LG、三星、美的、海信等。致电 +60182983573。"),
  openGraph: {
    title: clampMetaTitle("按品牌分类的冷气服务 | KL Renovator"),
    description: clampMetaDescription("吉隆坡雪兰莪所有主要冷气品牌服务。化学清洗、加气、维修与安装。"),
    url: "https://www.klrenovator.com/zh/brands",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
  },
  alternates: {
    canonical: "https://www.klrenovator.com/zh/brands",
    languages: {
      "en-MY": "https://www.klrenovator.com/brands",
      "ms-MY": "https://www.klrenovator.com/ms/brands",
      "zh-MY": "https://www.klrenovator.com/zh/brands",
      "x-default": "https://www.klrenovator.com/brands",
    },
  },
};

const waMsg = "你好 KL Renovator，我需要冷气帮助。请提供服务和价格建议。";

export default function BrandsPageZH() {
  const brands = siteConfig.brandPages;
  return (
    <>
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>20 品牌 · 所有机型</p>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>按品牌分类的</span>
              <span className={title({ size: "lg", color: "brand" })}>冷气服务</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              KL Renovator 服务吉隆坡和雪兰莪所有主要冷气品牌。请选择您的品牌查看具体机型和价格。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink(waMsg)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> WhatsApp 预约
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((b) => (
              <NextLink key={b.slug} href={`/zh/brands/${b.slug}`} className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-200 hover:shadow-md transition-all">
                <h3 className="font-black text-slate-900 text-sm">{b.name} 冷气</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">查看服务 <FiArrowRight className="h-3 w-3" /></span>
              </NextLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
