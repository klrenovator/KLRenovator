import type { Metadata } from "next";

export const dynamic = "force-static";
import NextLink from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

const amcMsg = [
  "Hi KL Renovator，我对年度冷气保养合同（AMC）感兴趣。",
  "",
  "机器数量：",
  "类型：挂壁式 / 天花板卡式 / 窗式",
  "位置：",
  "",
  "请分享AMC价格和可选方案。谢谢！",
].join("\n");
const amcWaLink = waLink(amcMsg);

export const metadata: Metadata = {
  title: "冷气年度保养合同 (AMC) 吉隆坡及雪兰莪 — 年度计划从 RM 299 起 | KL Renovator",
  description: "吉隆坡和雪兰莪的冷气年度保养合同。相比单次预约节省高达30%。季度保养、优先排程、免费紧急检查。从 RM 299/年起。",
  openGraph: {
    title: "冷气年度保养合同 (AMC) 吉隆坡及雪兰莪 | KL Renovator",
    description: "通过年度冷气保养计划节省高达30%。季度保养、优先响应、免费诊断。从 RM 299/年起。",
    url: "https://www.klrenovator.com/zh/services/maintenance-contract",
    type: "website", locale: "zh_MY", alternateLocale: ["en_MY", "ms_MY"],
    images: [{ url: "https://www.klrenovator.com/hero/aircond-chemical-service-canvas-wrap-kl.webp", width: 1200, height: 630, alt: "冷气年度保养合同 KL Renovator" }],
  },
  twitter: { card: "summary_large_image", title: "冷气年度保养合同 吉隆坡及雪兰莪 | KL Renovator", description: "年度计划节省高达30%。从 RM 299/年起。", images: ["https://www.klrenovator.com/hero/aircond-chemical-service-canvas-wrap-kl.webp"] },
  alternates: {
    canonical: "https://www.klrenovator.com/zh/services/maintenance-contract",
    languages: { "en-MY": "https://www.klrenovator.com/services/maintenance-contract", "ms-MY": "https://www.klrenovator.com/ms/services/maintenance-contract", "zh-MY": "https://www.klrenovator.com/zh/services/maintenance-contract", "x-default": "https://www.klrenovator.com/services/maintenance-contract" },
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "服务", item: "https://www.klrenovator.com/zh/services" },
    { "@type": "ListItem", position: 3, name: "冷气年度保养合同", item: "https://www.klrenovator.com/zh/services/maintenance-contract" },
  ],
};

const plans = [
  { name: "基础", price: "299", period: "/年", color: "bg-slate-700", border: "border-slate-300", badging: "最实惠", services: "3 次/年", includes: ["2 次基本保养 (价值 RM 99/次)", "1 次高压化学清洗 (价值 RM 120)", "优先排程", "12 个月锁定价格", "AMC 客户专属 WhatsApp 专线"] },
  { name: "标准", price: "499", period: "/年", color: "bg-sky-600", border: "border-sky-300", badging: "最佳性价比", services: "4 次/年", includes: ["2 次基本保养", "2 次高压化学清洗", "1 次免费紧急诊断 (价值 RM 88)", "优先排程 + 当天响应", "12 个月锁定价格", "额外维修人工费 9 折"] },
  { name: "尊享", price: "899", period: "/年", color: "bg-amber-600", border: "border-amber-300", badging: "全面保护", services: "7 次/年", includes: ["4 次基本保养 (季度)", "2 次高压化学清洗", "1 次化学大修 (价值 RM 220)", "2 次免费紧急诊断 (价值 RM 176)", "优先 + 当天 + 非工作时间响应", "额外维修人工费 85 折", "每次上门免费气压检查"] },
];

export default function AMCPageZH() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/zh" className="hover:text-sky-600 transition">首页</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/zh/services" className="hover:text-sky-600 transition">服务</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">冷气年度保养合同</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 text-white py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            年度保养合同 (AMC)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            年度冷气保养计划 — 节省高达 30%
          </h1>
          <p className="text-sky-200 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            一次年付。定期季度保养。优先紧急响应。从此不再为冷气烦恼。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={amcWaLink} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl transition-all">
              <FaWhatsapp className="h-5 w-5" /> 获取 AMC 报价
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-sky-300">
            <span>✓ 从 RM 299/年起</span><span>✓ 全部 20 个品牌</span><span>✓ 吉隆坡及雪兰莪</span><span>✓ 无锁定期罚款</span>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">AMC 方案</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">选择您的保养方案</h2>
            <p className="text-slate-500 text-sm mt-2">所有价格为单台挂壁式 1.0–1.5 HP。多台折扣可用。</p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={"relative bg-white border-2 " + plan.border + " rounded-2xl p-6 sm:p-8 flex flex-col"}>
                {plan.badging && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-full whitespace-nowrap">{plan.badging}</span>}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                  <div className="mt-3"><span className="text-4xl font-black text-slate-900">RM {plan.price}</span><span className="text-slate-400 text-sm">{plan.period}</span></div>
                  <p className="text-xs text-slate-400 mt-1 font-bold">{plan.services}</p>
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.includes.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm"><FiCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-600">{item}</span></li>
                  ))}
                </ul>
                <a href={amcWaLink} target="_blank" rel="nofollow noopener noreferrer" className={"mt-6 block text-center " + plan.color + " hover:opacity-90 text-white font-black uppercase tracking-wider text-sm py-3.5 rounded-xl transition-all"}>
                  选择 {plan.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">如何运作</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-10">三步轻松获得保障</h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "选择您的方案", desc: "根据机器数量和使用情况选择基础、标准或尊享方案。如需帮助选择，WhatsApp 联系我们——我们会根据您的实际情况诚实建议。" },
              { step: "2", title: "我们安排首次上门", desc: "首次保养在 3-5 个工作日内确认。我们检查您的机器，执行首次保养，并设定全年季度计划。" },
              { step: "3", title: "放心交给我们", desc: "每次计划保养前自动提醒。保养间隔期间如有问题享受优先紧急响应。到期前 30 天发送年度续约提醒。" },
            ].map((s, i) => (
              <div key={i} className="flex gap-5 text-left items-start">
                <span className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white font-black text-lg">{s.step}</span>
                <div><h3 className="font-black text-slate-900 text-lg">{s.title}</h3><p className="text-slate-500 text-sm mt-1">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-sky-700 to-slate-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">准备好不再为冷气烦恼了吗？</h2>
          <p className="text-sky-200 mb-8 text-sm max-w-md mx-auto">加入 500+ 信赖 KL Renovator 冷气保养的巴生谷客户。立即 WhatsApp 联系我们——我们会为您推荐合适的方案。</p>
          <a href={amcWaLink} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl transition-all">
            <FaWhatsapp className="h-5 w-5" /> 获取我的 AMC 方案
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-sky-300">
            <span>✓ 从 RM 299/年起</span><span>✓ 所有品牌</span><span>✓ 吉隆坡及雪兰莪</span>
          </div>
        </div>
      </section>
    </>
  );
}
