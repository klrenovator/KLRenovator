import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { buildFreshMetaTitle } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { waLink } from "@/lib/whatsapp";
import { buildServiceSchema } from "@/lib/seo";
import { PriceComparisonUI } from "@/components/price-comparison";
import { ToolLinks } from "@/components/calculators/tool-links";
import { PageExplainers } from "@/components/aeo-explainer-blocks";

export const dynamic = "force-static";

const waMsg = "你好 KL Renovator，我想预约吉隆坡冷气清洗。谢谢！";
const waHref = waLink(waMsg);

export const metadata: Metadata = {
  title: buildFreshMetaTitle("吉隆坡冷气清洗 2026 — 化学清洗 RM120 | KL Renovator", "zh"),
  description: padMetaDescription("吉隆坡冷气清洗 — 化学清洗 RM120 起。KL Renovator 当天上门。全巴生谷覆盖。500+五星好评。1个月保修。WhatsApp +60182983573。"),
  alternates: {
    canonical: "https://www.klrenovator.com/zh/cuci-aircond-kl",
    languages: {
      "zh-MY": "https://www.klrenovator.com/zh/cuci-aircond-kl",
      "ms-MY": "https://www.klrenovator.com/ms/cuci-aircond-kl",
      "en-MY": "https://www.klrenovator.com/cuci-aircond-kl",
      "x-default": "https://www.klrenovator.com/cuci-aircond-kl",
    },
  },
  openGraph: {
    title: buildFreshMetaTitle("吉隆坡冷气清洗 — RM120 | KL Renovator", "zh"),
    url: "https://www.klrenovator.com/zh/cuci-aircond-kl",
    images: getServiceOGImages("chemical-wash", "zh"),
    locale: "zh_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: getServiceOGImages("chemical-wash", "zh"),
  },
};

const pricing = [
  { label: "挂壁式 1.0–1.5 HP", price: "RM 120" },
  { label: "挂壁式 2.0–2.5 HP", price: "RM 150" },
  { label: "挂壁式 3.0 HP", price: "RM 180" },
  { label: "天花板卡式 1.0–1.5 HP", price: "RM 220" },
  { label: "天花板卡式 2.0–3.0 HP", price: "RM 280" },
];

const faqs = [
  { q: "吉隆坡冷气清洗多少钱 2026？", a: "挂壁式1.0–1.5 HP：RM120。2.0–2.5 HP：RM150。3.0 HP：RM180。天花板卡式RM220起。价格开工前确认。多台优惠5%/10%/15%。" },
  { q: "覆盖哪些地区？", a: "全巴生谷：吉隆坡、八打灵再也、梳邦再也、莎阿南、巴生、蒲种、蕉赖、安邦、加影、白沙罗、Bangsar、Mont Kiara、甲洞、文良港、鹅唛、士拉央、万挠、沙登。周一至周日当天可约。" },
  { q: "化学清洗 vs 普通保养？", a: "普通保养RM99：表面清洁。化学清洗RM120：80–120 PSI高压化学深入盘管与风轮，溶解生物膜与霉菌。有异味/风弱/12个月以上未深洗 = 化学清洗。" },
  { q: "清洗能解决漏水吗？", a: "通常可以，如果是排水管生物膜堵塞。若清洗后仍漏，排水盘可能破裂——需化学大修RM220。我们现场诚实检查。" },
  { q: "一台需要多久？", a: "挂壁式1.0–1.5 HP约60–75分钟。机器保持挂墙，完成后可立即使用。" },
  { q: "化学药剂安全吗？", a: "是。食品级碱性清洗剂，可生物降解，无磷，无有毒气体。完全冲洗干净，可立即使用。" },
  { q: "今天可以当天预约吗？", a: "可以。WhatsApp +60182983573，我们2–5分钟内确认最近时段。周一至周日 9am–10pm。" },
];

export default function Page() {
  const schema = buildServiceSchema({
    slug: "chemical-wash",
    name: "吉隆坡冷气清洗",
    description: "吉隆坡冷气清洗化学清洗 RM120。当天上门。500+五星好评。",
    startPrice: 120,
    locale: "zh",
    priceTable: pricing,
    pricingName: "吉隆坡冷气清洗价格",
    priceDescription: "RM120起"
  });
  const serviceSchema = { ...schema, "@id":"https://www.klrenovator.com/zh/cuci-aircond-kl#service", url:"https://www.klrenovator.com/zh/cuci-aircond-kl", inLanguage:"zh-MY" };
  const faqSchema = { "@context":"https://schema.org","@type":"FAQPage", mainEntity: faqs.map(f=>({ "@type":"Question", name:f.q, acceptedAnswer:{ "@type":"Answer", text:f.a }})) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(serviceSchema)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}/>
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-slate-500 flex items-center gap-1">
          <NextLink href="/zh" className="hover:text-sky-600">首页</NextLink><FiChevronRight className="h-3 w-3"/>
          <span className="text-slate-900 font-bold">吉隆坡冷气清洗</span>
        </div>
      </div>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-sky-700">吉隆坡冷气清洗 • 2026</span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-950">吉隆坡冷气清洗 &amp; 雪兰莪 — <span className="text-sky-600">RM120</span></h1>
            <p className="mt-4 text-lg text-slate-700 max-w-xl">高压 80–120 PSI 化学清洗。去除异味、漏水、风弱。巴生谷当天上门。<strong>500+ 五星好评</strong>。1个月保修。</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href={waHref} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#22c55e] px-7 py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg hover:bg-[#16a34a]"><FaWhatsapp className="h-5 w-5"/> WhatsApp 预约</a>
              <a href="tel:+60182983573" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-900 px-7 py-4 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-900 hover:text-white"><FaPhone className="h-4 w-4"/> +60182983573</a>
            </div>
          </div>
          <div className="rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-widest text-sky-600">2026 价格</p>
            <h2 className="mt-1 text-xl font-black">吉隆坡冷气清洗</h2>
            <ul className="mt-4 divide-y divide-slate-100 border rounded-2xl overflow-hidden">
              {pricing.map(p=><li key={p.label} className="flex justify-between px-4 py-3 text-sm"><span className="text-slate-700">{p.label}</span><span className="font-black text-sky-700">{p.price}</span></li>)}
            </ul>
            <a href={waHref} target="_blank" rel="nofollow noopener noreferrer" className="mt-4 block text-center rounded-xl bg-slate-950 text-white py-3 text-xs font-black uppercase tracking-wider">立即预约 →</a>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-[15px] leading-relaxed text-slate-700 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">吉隆坡冷气清洗 — 巴生谷第一</h2>
          <p>搜索 <strong>“吉隆坡冷气清洗”</strong>、<strong>“cuci aircond KL”</strong>、<strong>“aircond service KL”</strong>？您来对地方了。KL Renovator — <strong>500+ 五星 Google 好评</strong>，SSM注册，透明收费 <strong>RM120</strong> 起。我们提供真正的 <strong>80–120 PSI 高压化学清洗</strong> —— 食品级化学剂溶解盘管与风轮内的生物膜、霉菌与吉隆坡道路灰尘。</p>
          <p>我们每天在KL解决的常见问题：<em>冷气不冷</em>、<em>漏水</em>、<em>异味</em>、<em>风弱</em>、<em>电费升高</em>。60–75分钟完成，机器保持挂墙，立即可以使用。覆盖：<strong>KLCC、Bangsar、Mont Kiara、Damansara、PJ、Subang Jaya、Shah Alam、Klang、Puchong、Cheras、Ampang、Kajang、Kepong、Setapak、Gombak、Rawang</strong> —— 全巴生谷。立即WhatsApp — <strong>当天</strong>可约。</p>
        </div>
      </section>
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-950">吉隆坡冷气清洗 — 常见问答</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f,i)=>(
              <details key={i} className="group bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">{f.q}<FiChevronRight className="h-4 w-4 text-sky-600 transition group-open:rotate-90"/></summary>
                <p className="mt-3 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={waHref} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#22c55e] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg hover:bg-[#16a34a]"><FaWhatsapp className="h-5 w-5"/> 立即预约吉隆坡冷气清洗</a>
            <p className="mt-5 text-sm text-slate-600">想了解化学清洗到底清除什么、又如何影响房间空气？请阅读我们的<NextLink href="/zh/indoor-air-quality-aircond" className="font-bold text-sky-600 hover:text-sky-700">室内空气质量与化学清洗指南</NextLink>。</p>
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
      <PageExplainers locale="zh" presetId="service:cuci-aircond" />
    </>
  );
}
