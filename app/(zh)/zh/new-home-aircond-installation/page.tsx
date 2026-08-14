import { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { FaWhatsapp, FaCheck, FaShield, FaClipboardList, FaBolt, FaKey, FaPhone, FaBuilding } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "新房冷气安装 KL & 雪兰莪 — 全屋套餐 | KL Renovator",
  description: padMetaDescription("搬进KL或雪兰莪的新家？1BR、2BR、3BR和4BR住宅的完整冷气安装套餐。RM199/台起。当天安装，透明定价，1个月保修。WhatsApp +60182983573"),
  openGraph: {
    title: "新房冷气安装 KL & 雪兰莪 — 全屋套餐 | KL Renovator",
    description: "搬新家？1BR–4BR住宅的完整冷气安装套餐。RM199/台起，当天安装，1个月保修。WhatsApp +60182983573",
    type: "website", locale: "zh_MY",
    url: "https://www.klrenovator.com/zh/new-home-aircond-installation",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp", width: 1200, height: 630, alt: "新房冷气安装 KL 雪兰莪" }],
  },
  twitter: { card: "summary_large_image", title: "新房冷气安装 KL & 雪兰莪 — 全屋套餐 | KL Renovator", description: "新家冷气安装完整套餐。1BR–4BR，公寓和排屋专家，48小时时间线。WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/zh/new-home-aircond-installation", languages: { "en-MY": "https://www.klrenovator.com/new-home-aircond-installation", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-rumah-baru", "zh-MY": "https://www.klrenovator.com/zh/new-home-aircond-installation", "x-default": "https://www.klrenovator.com/new-home-aircond-installation" } },
};

const PACKAGES = [
  { name: "1房 (Studio / 1BR)", subtitle: "适合单身公寓和一房式公寓", price: "RM 199", includes: ["1× 挂壁式冷气 (1.0–1.5 HP)", "7尺铜管、电线、排水管", "标准室外支架", "真空泵调试", "1个月工艺保修"], badge: "单身及情侣首选" },
  { name: "2房 (2BR)", subtitle: "适合两房式公寓", price: "RM 398", includes: ["2× 挂壁式冷气 (每台1.0–1.5 HP)", "7尺铜管、电线、排水管 ×2", "标准室外支架 ×2", "真空泵调试 ×2", "1个月工艺保修"], badge: "小家庭最佳价值", highlight: true },
  { name: "3房 (3BR)", subtitle: "3房排屋及公寓的完整制冷方案", price: "RM 597", includes: ["3× 挂壁式冷气 (根据需要1.0–2.0 HP)", "7尺铜管、电线、排水管 ×3", "标准室外支架 ×3", "真空泵调试 ×3", "1个月工艺保修", "免费现场勘察及电力检查"], badge: "全屋覆盖" },
  { name: "4房及以上 (4BR+)", subtitle: "大型排屋及半独立式全屋制冷", price: "RM 796起", includes: ["4+× 挂壁式冷气 (多种HP规格)", "每台7尺铜管、电线、排水管", "需要时使用重型支架", "每台真空泵调试", "1个月工艺保修", "免费现场勘察 + DB箱容量评估", "优先排期 — 1天内完成"], badge: "完整家居方案" },
];

const CONDO_VS_LANDED = [
  { aspect: "室外机放置", condo: "服务阳台或窗台 — 需遵守大厦管理规定。可能需要JMB批准钻孔位置。", landed: "地面支架安装或壁挂式。放置更灵活 — 较少进出限制。" },
  { aspect: "铜管长度", condo: "通常7–15英尺，取决于室内外距离。超长部分按RM 17–27/尺计费。", landed: "挂壁式通常7–12英尺。仅当室内机在楼上而压缩机在地面时需更长管线。" },
  { aspect: "电路", condo: "检查现有DB箱。部分旧公寓可能需要电路升级（施工前预先报价）。", landed: "新房通常有备用MCB插槽。老旧排屋可能需要DB箱评估以增加电路。" },
  { aspect: "进出及时间安排", condo: "需预约电梯、保安登记、卸货区。我们协调安排 — 建议工作日早上时段。", landed: "直接进出。排期更灵活。周末也可安排。整体时间线更快。" },
  { aspect: "JMB/管理处审批", condo: "大多数公寓需要。我们准备安装方案供JMB审核。审批通常需3–7个工作日。", landed: "独立排屋无需JMB审批。可立即进行安装。" },
];

const JMB_STEPS = [
  { step: 1, title: "提交安装方案", desc: "我们准备简易图示，标明室外机位置、支架类型和管道走向。您提交给JMB/管理处（或我们直接协助协调）。" },
  { step: 2, title: "JMB审核（3–7个工作日）", desc: "管理处根据大厦条例审核。大多数标准挂壁式安装可无障碍获批。天花板卡式机可能需要额外结构审批。" },
  { step: 3, title: "审批及排期", desc: "获批后，我们预约电梯/卸货区并确认安装日期。我们代表您处理所有大厦协调事宜。" },
];

const FAQS = [
  { q: "吉隆坡新房全屋冷气安装费用是多少？", a: "2BR公寓套餐（2台）RM 398，3BR套餐（3台）RM 597，4BR+套餐RM 796起。每台包含7尺铜管、电线、排水管、支架、真空泵调试和1个月工艺保修。超出7尺的额外材料在施工前现场报价并获批准。所有价格事先确认 — 无隐藏费用。" },
  { q: "新房冷气安装需要多长时间？", a: "1BR（1台）：3–5小时。2BR（2台）：5–8小时。3BR（3台）：1天。4BR+（4台以上）：1–2天。上午11点前预约的1–3台安装通常可当天完成。全屋安装提前排期，优先安排时间。" },
  { q: "公寓冷气安装需要JMB审批吗？", a: "需要 — 大多数KL及雪兰莪的公寓在钻孔或安装室外机之前需要JMB/管理处审批。我们准备简易安装方案供您提交。审批通常需3–7个工作日。我们的团队可直接协助与大厦管理处协调。" },
  { q: "公寓和排屋冷气安装有什么不同？", a: "公寓需要JMB审批、预约电梯/卸货区，可能有服务阳台限制。排屋在室外机放置上更灵活，排期通常更快。两者使用相同优质材料（Type L铜管、Armaflex保温、专用电路）。挂壁式机型价格相同。" },
  { q: "可以在搬家前安装吗 — 房子还空着？", a: "可以 — 这实际上是最理想的。空房允许无限制进出进行管道铺设、钻孔和室外机放置。许多新房主在搬家前1–2周预约我们。如果装修仍在进行中，我们会与您的承包商/装修进度协调。" },
  { q: "如果新家的配电箱无法承载额外的冷气怎么办？", a: "我们的技师在免费现场勘察时检查DB箱容量。如需升级（额外MCB插槽、更高容量主断路器），我们预先报出电力工程费用。大多数2015年后建造的新房都有备用容量。老房子可能需要小型面板升级 — 通常RM 100–300，视范围而定。" },
  { q: "多台安装有折扣吗？", a: "有 — 我们的套餐定价已将多台合并为一次便捷预约。5台以上或商业项目，请WhatsApp我们获取定制报价 — 在KL及雪兰莪的大型安装可享额外折扣。" },
  { q: "在KL附近为新家推荐什么冷气品牌？", a: "大金和松下是马来西亚新房最受信赖的品牌 — 可靠、节能、本地零件供应充足。三菱和美的性价比很高。作为您身边的安装专家，我们安装全部20个品牌，并可在免费现场勘察时根据您的房间大小、预算和节能偏好提供推荐。" },
];

export default function NewHomeInstallationPageZH() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "首页", url: "https://www.klrenovator.com/zh" },
    { name: "冷气安装 KL & 雪兰莪", url: "https://www.klrenovator.com/zh/aircond-installation-kl" },
    { name: "新房冷气安装", url: "https://www.klrenovator.com/zh/new-home-aircond-installation" },
  ]);
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image src="/hero/aircond-installation-kuala-lumpur.webp" alt="新房冷气安装套餐 吉隆坡 雪兰莪" fill priority sizes="100vw" className="object-cover object-center opacity-40" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">新房主安装专家</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">搬进新家？<br /><span className="text-emerald-400">完整冷气安装套餐</span></h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">为KL及雪兰莪的新房、公寓和排屋提供全屋冷气安装。套餐定价，当天可预约，1个月工艺保修。从预约到凉爽舒适仅需48小时。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />套餐定价 RM 199/台起</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />48小时时间线可选</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />免费现场勘察</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🏠 新房安装咨询\n\n您好 KL Renovator，我即将搬入新家，需要冷气安装。\n\n📍 区域：\n🏠 房屋类型：公寓 / 排屋\n🛏️ 卧室数量：\n📅 入住日期：\n\n请发送套餐价格和可用时段。")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"><FaWhatsapp className="h-5 w-5" /> WhatsApp获取套餐报价</a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"><FaPhone className="h-4 w-4 text-sky-300" /> 致电 +60 18-298 3573</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Package Pricing */}
      <section className="py-20 sm:py-28 bg-slate-50" id="packages">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>新房安装套餐</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>全屋定价 — </span><span className={title({ size: "sm", color: "brand" })}>套餐更省</span></h2>
            <p className="mt-4 text-slate-600 font-medium">一次预约覆盖您整个家。透明按台定价，无隐藏费用。</p>
          </div></Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <div className={`relative bg-white border-2 rounded-2xl p-6 sm:p-8 h-full flex flex-col ${pkg.highlight ? "border-emerald-400 shadow-lg shadow-emerald-100" : "border-slate-200 hover:border-sky-300 hover:shadow-md"} transition-all`}>
                  {pkg.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">最佳价值</div>}
                  {pkg.badge && !pkg.highlight && <div className="inline-flex self-start bg-sky-50 border border-sky-100 text-sky-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">{pkg.badge}</div>}
                  <div className="mb-4"><h3 className="font-black text-xl text-slate-900 mb-1">{pkg.name}</h3><p className="text-slate-500 text-sm">{pkg.subtitle}</p></div>
                  <div className="mb-4"><span className="text-3xl font-black text-sky-600">{pkg.price}</span><span className="text-slate-500 text-sm ml-1">人工总计</span></div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-5 flex-1">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">包含内容</p>
                    <ul className="space-y-2">{pkg.includes.map((item: string, j: number) => (<li key={j} className="flex items-start gap-2 text-sm text-slate-700"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
                  </div>
                  <a href={waLink("🏠 套餐咨询\n\n您好 KL Renovator，我想要 " + pkg.name + " 安装套餐。\n\n📍 我的区域：\n🏠 房屋类型：公寓 / 排屋\n📅 首选日期：\n\n请确认价格和可用性。")} target="_blank" rel="nofollow noopener noreferrer" className={`inline-flex items-center justify-center gap-2 w-full font-black uppercase text-sm tracking-widest h-12 px-6 rounded-xl transition-all ${pkg.highlight ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "bg-sky-600 hover:bg-sky-700 text-white"}`}><FaWhatsapp className="h-4 w-4" /> 选择 {pkg.name.split(" ")[0]} 套餐</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
              <p className="font-black text-amber-800 text-sm mb-1">5台以上？商业项目？</p>
              <p className="text-amber-700 text-sm">WhatsApp我们获取定制多台报价 — KL及雪兰莪的大型安装可享额外折扣。</p>
              <a href={waLink("🏢 多台咨询\n\n您好 KL Renovator，我需要多台冷气的定制报价。\n\n📍 地点：\n🔢 台数：\n🏠 物业类型：\n\n请发送定制价格和时间线。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 mt-3 bg-amber-500 hover:bg-amber-600 text-white font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> 索取定制报价</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 sm:py-28 bg-white" id="whats-included">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>每个套餐包含内容</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>专业安装 — </span><span className={title({ size: "sm", color: "brand" })}>不走捷径</span></h2>
            <p className="mt-4 text-slate-600 font-medium">每个套餐均包含这五个标准步骤。无隐藏收费，不跳过任何程序。</p>
          </div></Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <FaCheck className="h-5 w-5" />, title: "现场勘察与咨询", desc: "我们的技师走访您的新家，评估房间大小、BTU需求、管道走向、室外机放置位置和电力容量。免费 — 无义务。" },
              { icon: <FaBolt className="h-5 w-5" />, title: "电力负载检查", desc: "我们验证您的DB箱能否承载额外的冷气电路。如需升级，我们在任何工程开始前预先报价。" },
              { icon: <FaClipboardList className="h-5 w-5" />, title: "材料规格", desc: "Type L铜管、Armaflex 9–13mm保温层、2.5mm²/4mm²马来西亚标准电线。每种材料在施工前与您确认。" },
              { icon: <FaShield className="h-5 w-5" />, title: "真空泵调试", desc: "每台机组500微米深度真空。强制性 — 保护压缩机，防止酸形成，保持制造商保修有效。" },
              { icon: <FaKey className="h-5 w-5" />, title: "交接与保修卡", desc: "签署的作业卡及安装检查清单。书面1个月工艺保修。所有制造商保修凭专业安装证明得到保护。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all h-full">
                  <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4">{item.icon}</div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Condo vs Landed */}
      <section className="py-20 sm:py-28 bg-slate-50" id="condo-vs-landed">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>公寓 vs 排屋 — 有何不同？</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>两种物业类型的 </span><span className={title({ size: "sm", color: "brand" })}>安装专家</span></h2>
            <p className="mt-4 text-slate-600 font-medium">规则不同，质量相同。我们的技师在KL及雪兰莪的高层公寓和排屋方面同样经验丰富。</p>
          </div></Reveal>
          <Reveal delay={100}>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-[1fr_1fr_1fr] gap-0">
                  <div className="bg-slate-50 px-6 py-4 font-black text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">方面</div>
                  <div className="bg-sky-600 text-white px-6 py-4 font-black text-sm uppercase tracking-wider border-b border-sky-500">🏢 公寓</div>
                  <div className="bg-emerald-600 text-white px-6 py-4 font-black text-sm uppercase tracking-wider border-b border-emerald-500">🏠 排屋</div>
                  {CONDO_VS_LANDED.map((row, i) => (
                    <div key={i} className="contents">
                      <div className={`px-6 py-4 font-black text-slate-700 text-sm border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>{row.aspect}</div>
                      <div className={`px-6 py-4 text-sm text-slate-600 leading-relaxed border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>{row.condo}</div>
                      <div className={`px-6 py-4 text-sm text-slate-600 leading-relaxed border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>{row.landed}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* JMB */}
      <section className="py-20 sm:py-28 bg-white" id="jmb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>公寓安装 — JMB审批指南</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>我们为您处理 </span><span className={title({ size: "sm", color: "brand" })}>大厦协调</span></h2>
            <p className="mt-4 text-slate-600 font-medium">大多数KL及雪兰莪的公寓需要JMB/管理处审批。我们的团队顺利处理这些事务。</p>
          </div></Reveal>
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {JMB_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <div className="relative bg-slate-50 border border-slate-100 rounded-2xl p-6 pt-10 h-full">
                  <div className="absolute -top-5 left-6 w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-lg">{step.step}</div>
                  <h3 className="font-black text-slate-900 mb-2 mt-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
              <h3 className="font-black text-sky-800 mb-3 flex items-center gap-2"><FaBuilding className="h-5 w-5" /> 您身边的公寓安装专家</h3>
              <p className="text-sky-700 text-sm leading-relaxed mb-4">作为KLCC、Mont Kiara、Bangsar、Sentul、PJ、Subang Jaya等地区最受信赖的公寓安装专家 — 我们已为巴生谷数百个单元处理过JMB审批。</p>
              <p className="text-sky-700 text-sm leading-relaxed">提示：在<strong>搬家前2周</strong>预约现场勘察，为JMB审批+安装留出时间。排屋通常48小时就足够。</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-emerald-600 text-white" id="timeline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100 mb-4">从预约到凉爽舒适</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">48小时凉爽空气 — 保证</h2>
            <p className="mt-4 text-emerald-100 font-medium">我们精简的新家流程，让您从预约到完成冷气安装只需2天。</p>
          </div></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {[
              { step: "第1天上午", icon: <FaWhatsapp className="h-6 w-6" />, title: "WhatsApp预约", desc: "发送您的新家详情 — 区域、房屋类型、房间数量。我们确认套餐价格并在数小时内安排现场勘察。" },
              { step: "第1天下午", icon: <FaClipboardList className="h-6 w-6" />, title: "现场勘察与报价", desc: "技师走访您的新家。评估BTU需求、管道走向、电力。最终报价现场确认 — 免费，无义务。" },
              { step: "第2天上午", icon: <FaBolt className="h-6 w-6" />, title: "安装日", desc: "团队携带所有材料到达。多台按顺序安装。防水布保护您的地板。每台依次铜管、真空、测试。" },
              { step: "第2天下午", icon: <FaShield className="h-6 w-6" />, title: "交接与保修", desc: "所有机组测试完毕。制冷确认。作业卡签署。书面1个月工艺保修交付。您走进凉爽的新家。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center h-full flex flex-col items-center">
                  <div className="inline-flex p-3 bg-white/20 rounded-xl mb-4">{item.icon}</div>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-200 mb-2">{item.step}</p>
                  <h3 className="font-black text-lg mb-2">{item.title}</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={500}>
            <div className="mt-12 text-center">
              <p className="text-emerald-100 text-sm mb-4">*48小时时间线适用于排屋及JMB已预批的公寓。需要新JMB审批的公寓：另加3–7个工作日。</p>
              <a href={waLink("🏠 预约新房安装 — 48小时时间线\n\n您好 KL Renovator，我想预约48小时时间线的新房安装。\n\n📍 区域：\n🏠 房屋类型：\n🛏️ 卧室数量：\n📅 首选开始日期：\n\n请确认可用性和价格。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white hover:bg-emerald-50 text-emerald-700 font-black uppercase text-sm tracking-widest px-8 py-4 rounded-xl transition-all"><FaWhatsapp className="h-5 w-5" /> 开启我的48小时时间线</a>
            </div>
          </Reveal>
        </div>
      </section>

      <InstallationTrustSignals variant="default" />

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-12">
            <p className={eyebrow()}>新房安装常见问题</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>常见问题 </span><span className={title({ size: "sm", color: "brand" })}>诚实解答</span></h2>
          </div></Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
            {FAQS.map((faq, i) => (<Reveal key={i} delay={i * 50}><div className="px-6 py-6 sm:px-8"><h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3><p className="text-slate-600 leading-relaxed">{faq.a}</p></div></Reveal>))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">即将搬家？让我们搞定您的冷气。</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">免费现场勘察。套餐定价RM 199/台起。48小时时间线可选。1个月工艺保修。全部20个品牌。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🏠 新房安装 — 最终预约\n\n您好 KL Renovator，我已准备好预约新房安装。\n\n📍 区域：\n🏠 房屋类型：公寓 / 排屋\n🛏️ 卧室数量：\n📅 首选日期：\n\n请确认我的套餐和时段。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> WhatsApp预约</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaPhone className="h-4 w-4" /> 致电 +60 18-298 3573</a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">覆盖KL及雪兰莪所有区域 — 吉隆坡、八打灵再也、莎阿南、梳邦再也、蕉赖、安邦、蒲种、巴生、白沙罗、孟沙、Mont Kiara、Setapak、黑风洞、布城、赛城等。</p>
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4">
              <Link href="/zh/aircond-installation-kl" className="text-sm text-slate-500 hover:text-white transition-colors">← 所有安装服务</Link>
              <Link href="/zh/installation-price-malaysia" className="text-sm text-slate-500 hover:text-white transition-colors">完整价格指南</Link>
              <Link href="/zh/faq" className="text-sm text-slate-500 hover:text-white transition-colors">更多常见问题</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
