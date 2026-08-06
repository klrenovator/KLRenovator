import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import NextLink from "next/link";
import { FiArrowRight, FiCheck, FiUsers, FiZap, FiClock, FiShield } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气品牌服务 KL & Selangor — 一个团队，20个品牌 | KL Renovator"),
  description: "一个持证团队维护全部20个主要冷气品牌 — 大金、松下、三菱、约克、LG、三星、美的等。当天服务，SSM注册，1个月保修。",
  openGraph: {
    title: clampMetaTitle("一个团队，20个品牌 — 冷气服务 KL & Selangor | KL Renovator"),
    description: "同一持证技术员维护每一个冷气品牌。价格透明，当天预约，1个月保修。WhatsApp +60182983573。",
    url: "https://www.klrenovator.com/zh/brands",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
  },
  alternates: buildTrilingualHreflang("/brands", "zh"),
};

const waMsg = "你好 KL Renovator，我需要冷气服务，请提供报价。";
const STATS = [
  { icon: FiUsers, value: "20", label: "服务品牌", sub: "所有主流品牌" },
  { icon: FiZap, value: "30-60", label: "分钟响应", sub: "当天巴生谷" },
  { icon: FiClock, value: "10+", label: "年经验", sub: "住宅与商业" },
  { icon: FiShield, value: "1个月", label: "保修", sub: "书面工艺保证" },
];

const BRAND_GROUPS = [
  { flag: "🇯🇵", name: "日本品牌", brands: ["Daikin", "Panasonic", "Mitsubishi", "Toshiba", "Hitachi", "Fujitsu", "Sharp"], note: "变频领先者 — R32, PCB诊断" },
  { flag: "🇰🇷", name: "韩国品牌", brands: ["Samsung", "LG"], note: "智能变频技术 — WiFi, AI制冷" },
  { flag: "🇨🇳", name: "中国品牌", brands: ["Midea", "Haier", "Gree", "Hisense", "Aux", "TCL", "Chigo"], note: "性价比 — R410A/R32" },
  { flag: "🇲🇾", name: "马来西亚与国际", brands: ["Acson", "York", "Carrier", "McQuay", "National", "Isonic", "Trane", "Fujiaire"], note: "信赖的本地与全球品牌" },
];

export default function BrandsPageZH() {
  const brands = siteConfig.brandPages;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首页", item: "https://www.klrenovator.com" },
          { "@type": "ListItem", position: 2, name: "冷气品牌服务", item: "https://www.klrenovator.com/zh/brands" },
        ],
      }) }} />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-sky-700 mb-4">
              <FiUsers className="h-3 w-3" /> 一个团队服务全部品牌
            </span>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>同一个持证团队{" "}</span>
              <span className={title({ size: "lg", color: "brand" })}>服务每一个品牌</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              不同于品牌独家授权商，KL Renovator的HVAC团队经过交叉培训，能处理马来西亚全部20个主流冷气品牌。一个团队。一个标准。每一个品牌。<br />
              <strong className="text-slate-900">SSM注册 · 1个月保修 · 500+条Google好评。</strong>
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {STATS.map((s) => (
                <div key={s.label} className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center">
                  <s.icon className="mx-auto h-4 w-4 text-sky-600 mb-1" />
                  <p className="text-lg font-black text-sky-700">{s.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-sky-600">{s.label}</p>
                  <p className="text-[9px] text-sky-500">{s.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink(waMsg)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"><FaWhatsapp className="h-5 w-5" />WhatsApp预约</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all">致电 {siteConfig.phoneDisplay}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand Groups */}
      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-10">
            <p className={eyebrow()}>全部20个品牌</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>选择您的{" "}</span><span className={title({ size: "sm", color: "brand" })}>冷气品牌</span></h2>
            <p className="mt-3 text-sm text-slate-500 font-medium max-w-xl mx-auto">以下每个品牌均由同一KL Renovator团队提供服务——透明价格，统一保修，当天派遣。</p>
          </div></Reveal>
          <div className="space-y-8">
            {BRAND_GROUPS.map((cat) => {
              const catBrands = brands.filter((b) => cat.brands.includes(b.name));
              if (catBrands.length === 0) return null;
              return (
                <div key={cat.name}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{cat.flag}</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">{cat.name}</h3>
                    <span className="text-[10px] text-slate-500 font-medium">— {cat.note}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {catBrands.map((brand) => (
                      <NextLink key={brand.slug} href={`/zh/brands/${brand.slug}`} className="group flex flex-col bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md rounded-2xl p-4 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-black text-sm text-slate-900 group-hover:text-sky-700">{brand.name}</h3>
                          <FiArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-sky-500" />
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {brand.gasTypes.slice(0, 2).map((gas) => (<span key={gas} className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">{gas}</span>))}
                        </div>
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider mt-auto">查看{ brand.name }服务 →</span>
                      </NextLink>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why One Team */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-10">
            <p className={eyebrow()}>为什么一个团队很重要</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>不限于品牌 = </span><span className={title({ size: "sm", color: "brand" })}>更好的服务</span></h2>
          </div></Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "跨品牌诊断", desc: "服务20个品牌的技术员能看出'松下噪音'和'约克振动'通常是同一原因——支架松动。不受品牌局限。", icon: FiZap },
              { title: "统一标准每项作业", desc: "相同的8项检查清单，相同的化学清洗压力(80-120 PSI)，相同的服务后风速测试——无论什么品牌。", icon: FiShield },
              { title: "更快的配件获取", desc: "我们常备适用于15+个品牌的通用配件（电容、接触器、排水泵）。无需等待品牌授权配件。", icon: FiClock },
            ].map((item) => (
              <div key={item.title} className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
                <item.icon className="h-5 w-5 text-sky-600 mb-3" />
                <h3 className="font-black text-sm text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-400 mb-2">统一价格 — 所有品牌</p>
            <h2 className="text-2xl font-black uppercase text-white">透明统一品牌定价</h2>
            <p className="mt-2 text-slate-500 text-sm font-medium">大金、松下、三菱统一价格 — 全部20个品牌。</p>
          </div></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { service: "基本保养", price: "RM 99 起" },
              { service: "化学清洗", price: "RM 120 起" },
              { service: "化学大修", price: "RM 220 起" },
              { service: "R22 充气", price: "RM 2.50 / PSI" },
              { service: "R410A 充气", price: "RM 3.00 / PSI" },
              { service: "R32 充气", price: "RM 3.00 / PSI" },
              { service: "故障诊断", price: "RM 88 起" },
              { service: "新机安装", price: "RM 199 起" },
            ].map((item) => (
              <div key={item.service} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-slate-500 mb-1">{item.service}</p>
                <p className="text-lg font-black text-sky-400">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">一个团队，20个品牌 — 今天就安排</h2>
          <p className="mt-3 text-sky-100 font-medium">同样的持证技术员。同样的透明价格。全部20个主流品牌。</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={waLink(waMsg)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"><FaWhatsapp className="h-5 w-5" />WhatsApp 预约</a>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all">致电 {siteConfig.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  );
}
