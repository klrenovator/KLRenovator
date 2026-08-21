import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { buildFreshMetaTitle } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import Image from "next/image";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { buildServiceSchema } from "@/lib/seo";
import { PriceComparisonUI } from "@/components/price-comparison";
import { ToolLinks } from "@/components/calculators/tool-links";
import { PageExplainers } from "@/components/aeo-explainer-blocks";
import { TopicHubCta } from "@/components/topic-hub-cta";
import { reviewCountLabel } from "@/config/reviews";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: buildFreshMetaTitle("什么牌子冷气机最好马来西亚2026? 安装价格从 RM199 | KL Renovator", "zh"),
  description:
    padMetaDescription("2026年吉隆坡及雪兰莪冷气安装价格完整指南。RM 199基础安装含7尺铜管、电线、抽真空及测漏。20大品牌。可当天安装。"),
  openGraph: {
    title: buildFreshMetaTitle("马来西亚冷气安装价格 2026 — 从 RM 199 起 | KL Renovator", "zh"),
    description: "2026年吉隆坡及雪兰莪冷气安装价格完整指南。RM 199基础安装含7尺铜管、抽真空及测漏。",
    url: "https://www.klrenovator.com/zh/installation-price-malaysia",
    images: getServiceOGImages("installation", "zh"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: getServiceOGImages("installation", "zh"),
  },
  alternates: {
    canonical: "https://www.klrenovator.com/zh/installation-price-malaysia",
    languages: {
      "en-MY": "https://www.klrenovator.com/installation-price-malaysia",
      "ms-MY": "https://www.klrenovator.com/ms/installation-price-malaysia",
      "zh-MY": "https://www.klrenovator.com/zh/installation-price-malaysia",
      "x-default": "https://www.klrenovator.com/installation-price-malaysia",
    },
  },
};

const INSTALL_PRICES = [
  { label: "挂壁式 · 1.0 HP", price: "RM 199" },
  { label: "挂壁式 · 1.5 HP", price: "RM 199" },
  { label: "挂壁式 · 2.0 HP", price: "RM 249" },
  { label: "挂壁式 · 2.5 HP", price: "RM 279" },
  { label: "挂壁式 · 3.0 HP", price: "RM 329" },
  { label: "挂壁式 · 4.0 HP", price: "RM 399" },
  { label: "挂壁式 · 5.0 HP", price: "RM 449" },
  { label: "天花板卡式 · 1.0–1.5 HP", price: "RM 290" },
  { label: "天花板卡式 · 2.0–3.0 HP", price: "RM 350" },
  { label: "天花板卡式 · 3.5–6.0 HP", price: "RM 400" },
  { label: "窗式 · 1.0–1.5 HP", price: "RM 199" },
  { label: "窗式 · 2.0–2.5 HP", price: "RM 249" },
];

const MATERIAL_PRICES = [
  { label: "铜管 1.0–1.5 HP", price: "RM 17/尺" },
  { label: "铜管 2.0–2.5 HP", price: "RM 23/尺" },
  { label: "铜管 3.0–3.5 HP", price: "RM 27/尺" },
  { label: "电线", price: "RM 9/尺" },
  { label: "超过7尺排水管", price: "RM 5/尺" },
  { label: "标准室外压缩机/支架", price: "RM 45" },
  { label: "重型室外压缩机/支架", price: "RM 70" },
  { label: "室内通用支架", price: "RM 35" },
  { label: "小型PVC线槽（电线）", price: "RM 6/尺" },
  { label: "大型PVC线槽（铜管+电线+保温层）", price: "RM 12/尺" },
  { label: "电源插座安装", price: "RM 100" },
  { label: "墙体开槽与暗装", price: "RM 25/尺" },
  { label: "高层/难进入作业费", price: "RM 50–150" },
  { label: "标准金属线槽", price: "RM 15/尺" },
];

const FAQS = [
  { q: "2026年吉隆坡和雪兰莪冷气安装费用是多少？", a: "挂壁式1.0–1.5 HP从RM 199起。2.0 HP从RM 249起，2.5 HP从RM 279起，3.0 HP从RM 329起。天花板卡式从RM 290起。窗式从RM 199起。每项价格包含7尺铜管、电线、排水管、抽真空、测漏和调试——开工前确认。" },
  { q: "RM 199基础安装具体包含什么？", a: "9项套餐：（1）现场勘查与墙体评估，（2）7尺正确管径隔热铜管，（3）通过专用线管的电线，（4）带正确下坡度的PVC排水管，（5）真空泵抽真空最少15分钟，（6）氮气压力测漏，（7）全面调试——制冷、风量、温控器，（8）书面工作卡+1个月工艺保修。" },
  { q: "为什么超过7尺的铜管要额外收费？", a: "标准7尺覆盖大多数房间布局。更长的管路需要更多铜管、隔热材料和人工。我们按尺透明计费（RM 17–27/尺视HP而定）。技术员测量实际需要的管路长度，切割前确认额外费用。" },
  { q: "RM 199基础安装和完整铜管套餐有什么区别？", a: "RM 199覆盖标准直管安装，最多7尺铜管。'完整铜管套餐'通常指10–20尺以上的铜管、隐蔽线槽、室外线缆架，可能还需要额外支架——常见于室外机离室内机较远的高层公寓。具体费用取决于实际管路长度和材料，我们在现场勘查后给出确切报价。" },
  { q: "安装需要多长时间？", a: "标准挂壁式：2–3小时。天花板卡式：3–4小时。同天安装两台：5–6小时。我们从不赶工——仅正确的抽真空就需要最少15–20分钟。" },
  { q: "你们提供冷气机器还是只安装？", a: "KL Renovator仅提供专业安装服务。您从Harvey Norman、Senheng、AEON、Lazada、Shopee等购买机器。如需购买前的品牌和HP建议，请WhatsApp我们——我们根据马来西亚实际房间条件提供建议。" },
  { q: "可以在管理严格的高层公寓安装吗？", a: "可以——我们每周在KLCC、Mont Kiara、Bangsar、Damansara、Sentul等高层公寓安装。我们遵守每栋大楼的规定：工作时间、电梯保护、噪音限制、废物处理。如管理处需要装修许可，请提前告知，我们准备文件。" },
  { q: "安装有什么保修？", a: "每个安装享有1个月工艺保修。如因我们的工作导致冷媒泄漏、不制冷或排水问题，我们免费返回修复。我们的抽真空+压力测试能在离开前发现99%的问题。" },
];

export default function ZhInstallationPricePage() {
  const serviceSchema = buildServiceSchema({
    slug: "installation",
    name: "冷气安装",
    description: "专业冷气安装从RM 199起。20大品牌，真空泵抽真空，压力测漏，1个月保修。",
    startPrice: 199,
    locale: "zh",
    priceTable: INSTALL_PRICES,
    pricingName: "冷气安装价格2026",
    priceDescription: "从RM 199起",
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "安装价格指南", item: "https://www.klrenovator.com/zh/installation-price-malaysia" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/zh" className="hover:text-sky-600 transition">首页</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">冷气安装价格指南 2026</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image src="/logo/image.png" alt="马来西亚冷气安装价格2026" fill sizes="100vw" className="object-cover" loading="eager" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <span className="inline-block bg-sky-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest mb-4">2026价格指南</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900 speakable">
                马来西亚冷气安装价格 2026 — 从 RM 199 起
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
                搜索&quot;冷气安装价格&quot;或&quot;pasang aircond berapa&quot;？KL Renovator的透明指南涵盖每个HP规格、每种机型和每项材料费用——无隐藏收费。<strong>RM 199</strong>基础安装含7尺铜管、电线、真空泵、测漏和1个月保修。
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="bg-sky-500 text-white px-3 py-1.5 font-bold uppercase tracking-wider text-sm">从 RM 199</span>
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">20大品牌 · 全KL及雪兰莪</span>
              </div>
              <div className="mt-8"><BookingButton serviceName="冷气安装" size="lg" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 含7尺铜管</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 强制抽真空</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 1个月保修</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> {reviewCountLabel}五星好评</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> SSM注册</span>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">安装价格清单</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 speakable">2026年冷气安装完整价格表</h2>
            <p className="text-sm text-slate-500 mb-6">所有价格含7尺铜管、电线、排水管、抽真空、测漏和调试。开工前确认。</p>
          </Reveal>
          <Reveal>
            <div className="border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {INSTALL_PRICES.map((p) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-base font-bold text-sky-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-xs text-emerald-800 leading-relaxed">
                <span className="font-black">✓ 每次安装免费包含：</span>7尺铜管（按HP正确配管）、电线、PVC排水管、真空泵抽真空、氮气压力测漏、调试、书面工作卡。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9-Point */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">包含内容</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">RM 199基础安装包含哪些内容？</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: buildFreshMetaTitle("现场勘查与墙体评估", "zh"), desc: "技术员在钻孔前检查墙体强度、电源容量、排水坡度和室外机位置。" },
              { title: buildFreshMetaTitle("7尺铜管（正确管径）", "zh"), desc: "管道直径按您机器HP匹配——非通用细管。带正确隔热层防止冷凝水滴落。" },
              { title: buildFreshMetaTitle("电线与线管", "zh"), desc: "从隔离开关到室内机通过专用线管的独立电线。" },
              { title: buildFreshMetaTitle("PVC排水管", "zh"), desc: "设置正确的下坡度，让水自然流出，预防未来漏水问题。" },
              { title: buildFreshMetaTitle("支架与减震垫", "zh"), desc: "调平固定支架，带橡胶减震垫减少压缩机振动噪音。" },
              { title: buildFreshMetaTitle("真空泵抽真空", "zh"), desc: "最少15–20分钟。清除冷媒管内所有水分和空气——保护压缩机。" },
              { title: buildFreshMetaTitle("氮气压力测漏", "zh"), desc: "释放冷媒前确认零泄漏。便宜安装商跳过的步骤。" },
              { title: buildFreshMetaTitle("全面调试", "zh"), desc: "测试所有风速的制冷输出、校准温控器、验证风量。记录在工作卡上。" },
              { title: buildFreshMetaTitle("1个月工艺保修", "zh"), desc: "如因我们的工作导致问题在1个月内复发，我们免费返回修复。" },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start gap-2.5 mb-2">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center bg-emerald-500 text-white mt-0.5"><FiCheck className="h-3 w-3" /></span>
                  <h3 className="font-black text-slate-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-14 sm:py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">额外材料</p>
            <h2 className="text-2xl font-black text-slate-900 mb-2">额外材料与特殊费用</h2>
            <p className="text-sm text-slate-500 mb-6">仅在您的安装超出标准7尺套餐时收取。开工前报价并确认。</p>
          </Reveal>
          <Reveal>
            <div className="border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {MATERIAL_PRICES.map((p) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-sm font-bold text-sky-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">套餐对比</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">RM 199基础安装 vs 完整铜管套餐</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-white border-2 border-sky-200 rounded-2xl p-6">
                <span className="inline-block bg-sky-100 text-sky-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">最受欢迎</span>
                <h3 className="font-black text-xl text-slate-900">标准安装</h3>
                <p className="text-3xl font-black text-sky-600 mt-2">RM 199</p>
                <p className="text-xs text-slate-500 mt-1">挂壁式1.0–1.5 HP</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> 含7尺铜管</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> 电线+排水+支架</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> 真空泵+测漏</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> 调试+工作卡</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> 1个月工艺保修</li>
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed"><strong>适合：</strong>室内外机铜管距离在7尺内的标准房间布局。大多数排屋、公寓和底层房间。</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">长管路</span>
                <h3 className="font-black text-xl text-slate-900">完整铜管套餐</h3>
                <p className="text-3xl font-black text-slate-600 mt-2">RM 350–600+</p>
                <p className="text-xs text-slate-500 mt-1">视管路长度和材料</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> 10–20尺以上铜管</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> 隐蔽PVC线槽</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> 室外线缆架（如需）</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> 额外支架</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> 高层作业费</li>
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed"><strong>适合：</strong>室外机在阳台等较远位置的高层公寓。有较长天花板管路的办公室和店铺。现场勘查后报价。</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">常见问答 · FAQ · Soalan Lazim</p>
            <h2 className="text-2xl font-black text-slate-900 mb-6 speakable">冷气安装常见问题</h2>
          </Reveal>
          <div className="border border-slate-200 divide-y divide-slate-200">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    {f.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-200 mb-2">今天预约安装</p>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-4">获取确定安装价格 — 立即WhatsApp我们</h2>
          <p className="text-sky-100 text-sm mb-6 max-w-2xl mx-auto">发送您的机器品牌、HP和位置。我们几分钟内确认准确价格和可用时段。周一至周日全KL及雪兰莪可当天安装。</p>
          <BookingButton serviceName="冷气安装" size="lg" />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <NextLink href="/zh/services/installation" className="inline-flex items-center gap-1 text-xs font-black text-sky-200 hover:text-white transition">查看完整安装服务页 <FiArrowRight className="h-3 w-3" /></NextLink>
            <NextLink href="/zh/cuci-aircond-kl" className="inline-flex items-center gap-1 text-xs font-black text-sky-200 hover:text-white transition">化学清洗 RM 120 起 <FiArrowRight className="h-3 w-3" /></NextLink>
          </div>
        </div>
      </section>

      {/* Keywords */}
      <section className="py-6 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {["冷气安装价格马来西亚", "aircond installation price Malaysia", "吉隆坡冷气安装", "冷气安装费用2026", "pasang aircond berapa", "雪兰莪冷气安装"].map((kw) => (
              <span key={kw} className="inline-flex items-center bg-white text-slate-600 px-3 py-1.5 text-xs font-bold rounded-full border border-slate-200">{kw}</span>
            ))}
          </div>
        </div>
      </section>
      {/* Free calculator tools — internal linking */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks lang="zh" heading="免费冷气计算工具" />
        </div>
      </section>

      <PriceComparisonUI locale="zh" />

      {/* Definition + comparison blocks (issue #72) — curated for this page. */}
      {/* Topic hub (issue #66) */}
      <TopicHubCta hubId="pricing" locale="zh" />

      <PageExplainers locale="zh" presetId="install:price" />
    </>
  );
}
