import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight, FiTag, FiClock, FiShield } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, subtitle, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { buildServiceSchema } from "@/lib/seo";
import { getFreshDateZH } from "@/lib/dates";

export async function generateMetadata(): Promise<Metadata> {
  const freshDate = getFreshDateZH();
  return {
    title: `${freshDate}马来西亚冷气服务价格 — 透明收费表 | KL Renovator`,
    description: `吉隆坡及雪兰莪最新${freshDate}冷气服务价格。化学清洗RM120，基本保养RM99，大修RM220及加Gas RM120。透明收费，无隐藏费用。`,
    openGraph: {
      title: `${freshDate}马来西亚冷气服务价格 — 透明收费表`,
      description: `查找吉隆坡及雪兰莪最新的${freshDate}冷气服务价格。我们为化学清洗、大修和维修提供透明报价。WhatsApp +60182983573。`,
      url: "https://www.klrenovator.com/zh/aircond-service-price-malaysia",
      type: "website",
      locale: "zh_MY",
      alternateLocale: ["en_MY", "ms_MY"],
    },
  twitter: {
    card: "summary_large_image",
    images: getServiceOGImages("basic-servicing", "zh"),
  },
    alternates: {
      canonical: "https://www.klrenovator.com/zh/aircond-service-price-malaysia",
      languages: {
        "en-MY": "https://www.klrenovator.com/aircond-service-price-malaysia",
        "ms-MY": "https://www.klrenovator.com/ms/aircond-service-price-malaysia",
        "zh-MY": "https://www.klrenovator.com/zh/aircond-service-price-malaysia",
        "x-default": "https://www.klrenovator.com/aircond-service-price-malaysia",
      },
    },
  };
}

const pricingCategories = [
  {
    title: clampMetaTitle("清洁服务"),
    rows: [
      { label: "基本保养 (标准) · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "基本保养 (标准) · 2.0 – 2.5 HP", price: "RM 120" },
      { label: "高压化学清洗 · 1.0 – 1.5 HP", price: "RM 120" },
      { label: "高压化学清洗 · 2.0 – 2.5 HP", price: "RM 150" },
      { label: "高压化学清洗 · 3.0 HP", price: "RM 180" },
      { label: "化学大修 (拆机) · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "化学大修 (拆机) · 2.0 – 2.5 HP", price: "RM 280" },
    ],
  },
  {
    title: clampMetaTitle("加 Gas & 充冷媒"),
    rows: [
      { label: "R22 Gas (标准) · 1.0 HP", price: "RM 120" },
      { label: "R410A Gas (变频) · 1.0 HP", price: "RM 150" },
      { label: "R32 Gas (环保变频) · 1.0 HP", price: "RM 180" },
      { label: "结构查漏", price: "RM 88" },
    ],
  },
  {
    title: clampMetaTitle("维修与零件"),
    rows: [
      { label: "诊断费", price: "RM 88" },
      { label: "更换电容 (Capacitor)", price: "RM 150 – 250" },
      { label: "更换风扇马达 (Fan Motor)", price: "RM 250 – 380" },
      { label: "维修 PCB 控制板", price: "RM 280 – 600" },
    ],
  },
];

const faqs = [
  { q: "这些价格包含交通费吗？", a: "是的。所显示的价格已包含吉隆坡及雪兰莪区域的全部费用。我们不收取任何隐藏的交通或过路费。" },
  { q: "服务后有保修吗？", a: "我们所有的服务和维修工作均享有1个月的工艺保修（workmanship warranty）。如果同一问题再次出现，我们将免费上门解决。" },
  { q: "化学清洗服务需要多长时间？", a: "标准挂壁式机组通常需要 45 到 60 分钟。化学大修（Overhaul）则可能需要 2 到 3 小时，因为需要将机组完全拆除。" },
  { q: "不同类型的 Gas 价格一样吗？", a: "不一样。R22 是针对旧机型，而 R410A 和 R32 是针对现代变频机型。价格会根据您的机组所需的压力（PSI）而定。" },
  { q: "多台机组保养有折扣吗？", a: "当然有！我们为同次上门的 2-3 台机组提供 5% 折扣，4-8 台提供 10% 折扣，8 台以上提供 15% 折扣。" },
  { q: "为什么化学大修比普通化学清洗贵？", a: "大修需要技术员将整台室内机从墙上拆除，单独清洗每个零件，而普通化学清洗则无需拆机。大修是解决长期漏水问题的最终方案。" },
  { q: "如何付款？", a: "在工作完成且您对服务质量满意后，我们接受现金或网上银行转账。" },
];

export default function ZhPricingPage() {
  const serviceSchema = buildServiceSchema({
    slug: "aircond-service-price-malaysia",
    name: "2026年马来西亚冷气服务价格",
    description: "吉隆坡及雪兰莪冷气保养、化学清洗、大修和维修的透明价格表。",
    startPrice: 99,
    locale: "zh",
    priceTable: pricingCategories[0].rows,
    pricingName: "2026年冷气服务价格表",
    priceDescription: "基本保养价格从 RM 99 起。",
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/zh" className="hover:text-sky-600 transition">首页</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">2026年冷气服务价格</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white py-16 sm:py-24 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>更新于：{getFreshDateZH()}</p>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>{new Date().getFullYear()}年 </span>
              <span className={title({ size: "lg", color: "brand" })}>冷气服务价格</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              查找吉隆坡及雪兰莪最新的冷气服务价格表。KL Renovator 为您的家居和办公室提供透明报价，绝无隐藏费用。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BookingButton serviceName={`${new Date().getFullYear()}年价格表`} size="lg" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all"
              >
                联系我们：{siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {pricingCategories.map((cat, idx) => (
              <Reveal key={cat.title} delay={idx * 100}>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-900 px-6 py-4">
                    <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                      <FiTag className="text-sky-400" /> {cat.title}
                    </h2>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {cat.rows.map((row) => (
                      <li key={row.label} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                        <span className="text-sm text-slate-700 font-medium">{row.label}</span>
                        <span className="text-base font-black text-sky-600 whitespace-nowrap bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                          {row.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-12 bg-sky-600 rounded-2xl p-8 text-white text-center shadow-lg shadow-sky-900/20">
              <h3 className="text-xl sm:text-2xl font-black uppercase">多台机组套餐优惠</h3>
              <p className="mt-2 text-sky-100 font-medium">一次性预约更多机组，享受更高折扣。</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 text-center">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black">5% 折扣</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">2 – 3 台</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black">10% 折扣</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">4 – 8 台</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black">15% 折扣</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">8+ 台</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose KL Renovator */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>品质与信任</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>为什么选择 </span>
                <span className={title({ size: "sm", color: "brand" })}>我们的服务？</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              { icon: <FiCheck />, title: clampMetaTitle("透明且固定报价"), desc: "无隐藏费用。我们在 WhatsApp 报出的价格即为您在现场支付的价格。" },
              { icon: <FiShield />, title: clampMetaTitle("1个月工艺保修"), desc: "每项服务均享有工艺保证。如果问题重复出现，我们免费上门修复。" },
              { icon: <FiClock />, title: clampMetaTitle("当天上门服务"), desc: "上午 11 点前联系我们，即有极大机会预约到当天的服务时段。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-4 text-xl">
                    {item.icon}
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>常见问题</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">冷气服务价格 FAQ</h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 50}>
                <details className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-5 font-bold text-slate-900">
                    {f.q}
                    <FiChevronRight className="h-5 w-5 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{f.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">立即获取免费报价</h2>
          <p className="mt-4 text-lg text-slate-400 font-medium">WhatsApp 我们您的冷气型号和位置，30分钟内快速回复。</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink("Hi KL Renovator，我想询问冷气服务价格。")}
              className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-10 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all shadow-lg shadow-emerald-900/20"
            >
              <FaWhatsapp className="h-5 w-5" />
              立即 WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-white px-10 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
            >
              致电：{siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
