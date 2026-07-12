import type { Metadata } from "next";
import { clampMetaTitle, buildFreshMetaTitle } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiChevronRight, FiTag, FiClock, FiShield, FiTool, FiHome } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { buildServiceSchema } from "@/lib/seo";
import { getFreshDateZH } from "@/lib/dates";
import { PriceComparisonUI } from "@/components/price-comparison";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const freshDate = getFreshDateZH();
  const metaTitle = clampMetaTitle(
    buildFreshMetaTitle(`马来西亚冷气服务价格 — 透明价目表`, "zh")
  );
  const metaDesc = clampMetaDescription(
    `${freshDate}吉隆坡及雪兰莪冷气服务价格。基本保养RM99，化学清洗RM120，大修RM220，加气RM120，安装RM199。无隐藏费用。`
  );

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: "https://www.klrenovator.com/zh/aircond-service-price-malaysia",
      type: "website",
      locale: "zh_MY",
      alternateLocale: ["en_MY", "ms_MY"],
      images: getServiceOGImages("basic-servicing", "zh"),
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
    title: "清洗服务",
    rows: [
      { label: "基本保养 · 挂机 1.0 – 1.5 HP", price: "RM 99" },
      { label: "基本保养 · 挂机 2.0 – 2.5 HP", price: "RM 120" },
      { label: "基本保养 · 挂机 3.0 – 3.5 HP", price: "RM 150" },
      { label: "高压化学清洗 · 挂机 1.0 – 1.5 HP", price: "RM 120" },
      { label: "高压化学清洗 · 挂机 2.0 – 2.5 HP", price: "RM 150" },
      { label: "高压化学清洗 · 挂机 3.0 HP", price: "RM 180" },
      { label: "化学大修 · 挂机 1.0 – 1.5 HP", price: "RM 220" },
      { label: "化学大修 · 挂机 2.0 – 2.5 HP", price: "RM 280" },
      { label: "化学大修 · 挂机 3.0 – 3.5 HP", price: "RM 350" },
    ],
  },
  {
    title: "冷媒充注",
    rows: [
      { label: "R22 冷媒 · 1.0 HP", price: "RM 120" },
      { label: "R22 冷媒 · 1.5 – 2.0 HP", price: "RM 150" },
      { label: "R410A 冷媒 · 1.0 HP", price: "RM 150" },
      { label: "R410A 冷媒 · 1.5 – 2.0 HP", price: "RM 180" },
      { label: "R32 冷媒 · 1.0 HP", price: "RM 180" },
      { label: "R32 冷媒 · 1.5 – 2.0 HP", price: "RM 200" },
      { label: "泄漏检查", price: "RM 88" },
    ],
  },
  {
    title: "新机安装",
    rows: [
      { label: "挂机 1.0 – 1.5 HP（含 7 尺铜管）", price: "RM 199" },
      { label: "挂机 2.0 HP", price: "RM 249" },
      { label: "挂机 2.5 HP", price: "RM 279" },
      { label: "挂机 3.0 HP", price: "RM 329" },
      { label: "天花板卡式机 1.0 – 1.5 HP", price: "RM 290" },
      { label: "窗机 1.0 – 1.5 HP", price: "RM 199" },
    ],
  },
  {
    title: "天花板卡式机（商业）",
    rows: [
      { label: "基本保养 · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "基本保养 · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "化学清洗 · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "化学清洗 · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "化学大修 · 1.0 – 3.0 HP", price: "RM 430" },
    ],
  },
  {
    title: "维修与配件",
    rows: [
      { label: "诊断费（同次修好则免收）", price: "RM 88" },
      { label: "电容更换", price: "RM 150 – 250" },
      { label: "室内风扇马达更换", price: "RM 250 – 380" },
      { label: "室外风扇马达更换", price: "RM 300 – 450" },
      { label: "PCB 控制板维修/更换", price: "RM 280 – 600" },
      { label: "排水泵更换", price: "RM 350 – 550" },
    ],
  },
  {
    title: "拆机、移机与紧急维修",
    rows: [
      { label: "仅拆机（不重装）", price: "RM 90" },
      { label: "拆机 + 就近重装 (1.0 – 1.5 HP)", price: "RM 250" },
      { label: "拆机 + 不同地点重装 (1.0 – 1.5 HP)", price: "RM 350" },
      { label: "紧急诊断（上午 9 点–下午 6 点）", price: "RM 88" },
      { label: "非工作时间附加费（下午 6 点–晚上 10 点）", price: "RM 50" },
    ],
  },
  {
    title: "年度保养合约 (AMC)",
    rows: [
      { label: "AMC Basic — 2 次基本 + 1 次化学清洗", price: "RM 299/年" },
      { label: "AMC Standard — 2 次基本 + 2 次化学 + 优先预约", price: "RM 499/年" },
      { label: "AMC Premium — 4 次基本 + 2 次化学 + 1 次大修", price: "RM 899/年" },
    ],
  },
];

const faqs = [
  {
    q: "价格是否包含交通费？",
    a: "是的。所列价格为吉隆坡及雪兰莪地区的全包价，不另收交通或过路费。",
  },
  {
    q: "服务后有保修吗？",
    a: "所有服务与维修享有 1 个月工艺保修。配件（电容、马达、PCB）享有 3 个月保修。同一问题复发，我们免费回访处理。",
  },
  {
    q: "化学清洗需要多久？",
    a: "标准挂机通常 45–60 分钟。化学大修因需完全拆机，可能需要 2–3 小时。",
  },
  {
    q: "不同冷媒价格是否不同？",
    a: "是的。R22 用于旧机型，R410A 和 R32 用于现代变频机。价格按冷媒类型和匹数计算。",
  },
  {
    q: "多台机组有折扣吗？",
    a: "有。同次上门 2–3 台享 5% 折扣，4–8 台 10%，8 台以上 15%。",
  },
  {
    q: "为什么化学大修比普通化学清洗贵？",
    a: "大修需要技术员将整台室内机从墙上拆除并单独清洗每个零件，而普通化学清洗无需拆机。大修是解决长期漏水的最终方案。",
  },
  {
    q: "如何付款？",
    a: "工作完成且您满意后，可现金、网上转账或 DuitNow 付款。无需预付款。",
  },
  {
    q: "本页与完整价格博客指南有何不同？",
    a: "本页是快速预约价目表。如需 9 项服务完整明细、全匹数表格与选型指南，请参阅 2026 年马来西亚冷气服务价格博客文章。",
  },
];

const serviceLinks = [
  { href: "/zh/services/basic-servicing", label: "基本保养" },
  { href: "/zh/services/chemical-wash", label: "化学清洗" },
  { href: "/zh/services/chemical-overhaul", label: "化学大修" },
  { href: "/zh/services/gas-topup", label: "冷媒充注" },
  { href: "/zh/services/installation", label: "安装" },
  { href: "/zh/services/repair", label: "维修" },
  { href: "/zh/services/ceiling-cassette", label: "天花板卡式机" },
  { href: "/zh/services/dismantling-relocation", label: "拆机移机" },
  { href: "/zh/services/emergency", label: "紧急维修" },
  { href: "/zh/services/maintenance-contract", label: "AMC 合约" },
  { href: "/zh/installation-price-malaysia", label: "安装价格指南" },
  { href: "/zh/cuci-aircond-kl", label: "吉隆坡冷气清洗" },
  { href: "/zh/blog/harga-servis-aircond-2026-malaysia", label: "完整价格博客" },
];

export default function ZhPricingPage() {
  const freshDate = getFreshDateZH();

  const serviceSchema = buildServiceSchema({
    slug: "aircond-service-price-malaysia",
    name: "2026年马来西亚冷气服务价格",
    description: "吉隆坡及雪兰莪冷气保养、化学清洗、大修、加气、安装和维修的透明价格表。",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: "https://www.klrenovator.com/zh",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "2026年冷气服务价格",
        item: "https://www.klrenovator.com/zh/aircond-service-price-malaysia",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${freshDate}马来西亚冷气服务价格`,
    description: "吉隆坡及雪兰莪完整透明冷气服务价目表，每月更新。",
    url: "https://www.klrenovator.com/zh/aircond-service-price-malaysia",
    inLanguage: "zh-MY",
    isPartOf: { "@type": "WebSite", name: "KL Renovator", url: "https://www.klrenovator.com" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable", "h1"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/zh" className="hover:text-sky-600 transition">
              首页
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">2026年冷气服务价格</span>
          </nav>
        </div>
      </div>

      <section className="relative bg-white py-16 sm:py-24 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>更新于：{freshDate}</p>
            <h1 className="mt-4 speakable">
              <span className={title({ size: "lg" })}>2026年 </span>
              <span className={title({ size: "lg", color: "brand" })}>冷气服务价格</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto speakable">
              查找吉隆坡及雪兰莪最新冷气服务价格表。基本保养从 RM 99 起，化学清洗从 RM 120 起，安装从 RM 199 起 — 绝无隐藏费用。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BookingButton serviceName="2026年冷气服务价格表" size="lg" />
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

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {pricingCategories.map((cat, idx) => (
              <Reveal key={cat.title} delay={idx * 60}>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-900 px-6 py-4">
                    <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                      <FiTag className="text-sky-400" /> {cat.title}
                    </h2>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {cat.rows.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                      >
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

          <Reveal delay={200}>
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
              {
                icon: <FiCheck />,
                title: "透明且固定报价",
                desc: "无隐藏费用。我们在 WhatsApp 报出的价格即为您在现场支付的价格。",
              },
              {
                icon: <FiShield />,
                title: "1个月工艺保修",
                desc: "每项服务均享有工艺保证。如果问题重复出现，我们免费上门修复。",
              },
              {
                icon: <FiClock />,
                title: "当天上门服务",
                desc: "上午 11 点前联系我们，即有极大机会预约到当天的服务时段。",
              },
              {
                icon: <FiTool />,
                title: "支持 20 个品牌",
                desc: "大金、松下、三菱、Acson、约克、LG、三星、美的等 20 个品牌 — 挂机、卡式机与窗机。",
              },
              {
                icon: <FiHome />,
                title: "覆盖吉隆坡与雪兰莪",
                desc: "从 Batu Caves 到巴生、蕉赖到莎阿南 — 本地团队 30–60 分钟可到达。",
              },
              {
                icon: <FiTag />,
                title: "开工前书面确认",
                desc: "所有价格在技术员开工前通过 WhatsApp 书面确认。",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-full">
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

      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-lg font-black text-slate-900 mb-6">相关链接</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {serviceLinks.map((link) => (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold rounded-full bg-white border border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-700 transition"
                >
                  {link.label}
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>常见问题</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 speakable">冷气服务价格 FAQ</h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 40}>
                <details className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
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

      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">立即获取免费报价</h2>
          <p className="mt-4 text-lg text-slate-400 font-medium">WhatsApp 我们您的冷气型号和位置，30 分钟内快速回复。</p>
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
      <PriceComparisonUI locale="zh" />
    </>
  );
}
