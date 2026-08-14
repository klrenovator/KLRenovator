import { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { FaWhatsapp, FaCheck, FaShield, FaBolt, FaBuilding, FaCubes, FaTags, FaPhone, FaSnowflake } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "全屋冷气安装 KL & 雪兰莪 — 多台批量套餐 | KL Renovator",
  description: padMetaDescription("在KL或雪兰莪的家安装3台以上冷气？批量折扣阶梯、逐房BTU指南、全屋制冷方案。RM199/台起。WhatsApp批量报价 +60182983573"),
  openGraph: {
    title: "全屋冷气安装 KL & 雪兰莪 — 多台批量套餐 | KL Renovator",
    description: "3台以上冷气？批量折扣、BTU房间指南、全屋制冷方案。RM199/台起。WhatsApp +60182983573",
    type: "website", locale: "zh_MY",
    url: "https://www.klrenovator.com/zh/whole-house-aircond-installation",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-double-unit-kl.webp", width: 1200, height: 630, alt: "全屋冷气安装 KL 雪兰莪" }],
  },
  twitter: { card: "summary_large_image", title: "全屋冷气安装 KL & 雪兰莪 — 批量套餐 | KL Renovator", description: "多台冷气安装含批量折扣。BTU指南，项目时间线，RM199/台起。WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/aircond-installation-double-unit-kl.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/zh/whole-house-aircond-installation", languages: { "en-MY": "https://www.klrenovator.com/whole-house-aircond-installation", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-seluruh-rumah", "zh-MY": "https://www.klrenovator.com/zh/whole-house-aircond-installation", "x-default": "https://www.klrenovator.com/whole-house-aircond-installation" } },
};

const VOLUME_TIERS = [
  { units: "3台", price: "RM 597", save: "相比单独预订省RM 0", highlights: ["3× 挂壁式（根据需要混合HP）", "7尺铜管、电线、排水管 ×3", "3× 真空泵调试", "1天完成"], badge: "3房家庭首选" },
  { units: "5台", price: "RM 945", save: "相比单独预订省RM 50", highlights: ["5× 挂壁式（混合HP）", "7尺铜管、电线、排水管 ×5", "5× 真空泵调试", "1天优先完成", "免费DB箱容量评估"], badge: "最佳价值", highlight: true },
  { units: "10台以上", price: "RM 1,790起", save: "定制批量折扣", highlights: ["10+× 挂壁式（混合HP）", "每台7尺铜管、电线、排水管", "每台真空泵调试", "专属项目团队", "免费DB评估 + 负载平衡", "优先排期 — 1–2天完成", "可定制付款计划"], badge: "批量/商业" },
];

const ROOM_BTU_GUIDE = [
  { room: "小卧室", size: "100–150 平方尺", btus: "9,000 – 12,000", hp: "1.0 HP", notes: "标准马来西亚卧室。单人居住。低日照。" },
  { room: "主卧室", size: "150–250 平方尺", btus: "12,000 – 18,000", hp: "1.0 – 1.5 HP", notes: "附带浴室增加热负荷。朝西可能需要1.5 HP。" },
  { room: "客厅", size: "250–400 平方尺", btus: "18,000 – 24,000", hp: "1.5 – 2.0 HP", notes: "开放式含厨房？最低2.0 HP。双层挑高天花板考虑2.5 HP。" },
  { room: "大客厅/家庭厅", size: "400–600 平方尺", btus: "24,000 – 36,000", hp: "2.0 – 3.0 HP", notes: "开放式含餐厅+干厨房。天花板卡式机比挂壁式制冷更均匀。" },
  { room: "家庭办公室/书房", size: "80–120 平方尺", btus: "9,000 – 12,000", hp: "1.0 HP", notes: "电子设备（电脑、显示器、打印机）增加热量。1.0 HP通常足够。" },
  { room: "厨房（湿）", size: "100–200 平方尺", btus: "12,000+", hp: "1.0 – 1.5 HP", notes: "除非使用特殊耐油机型，否则不建议。油污快速堵塞盘管 — 需6个月化学清洗周期。" },
  { room: "店铺/零售", size: "300–800 平方尺", btus: "24,000 – 48,000", hp: "2.0 – 4.0 HP", notes: "高客流量、频繁开门、玻璃门面。可能需要多台或天花板卡式机。" },
  { room: "办公室/会议室", size: "200–400 平方尺", btus: "18,000 – 30,000", hp: "1.5 – 2.5 HP", notes: "4–8人显著增加热负荷。建议天花板卡式机以均匀分布。" },
];

const PROJECT_TIMELINE = [
  { phase: "第1天 — 上午", title: "咨询与现场勘察", desc: "WhatsApp您的平面图或房间清单。我们的高级技师走访您的物业。评估每个房间、测量BTU需求、检查DB箱容量、规划管道走向、选定室外机位置。免费 — 无义务。", icon: <FaBuilding className="h-6 w-6" /> },
  { phase: "第1天 — 下午", title: "最终报价与排期", desc: "您收到详细报价：每台人工费、铜管总长度、支架类型、电力工程（如有）、项目总费用。确认后，我们锁定安装日期 — 排屋通常在48小时内。", icon: <FaTags className="h-6 w-6" /> },
  { phase: "第2天 — 全天", title: "多台安装", desc: "团队携带所有预准备材料到达。按房间顺序逐一安装。防水布保护每个区域。铜管、真空（500微米）、电路、排水测试 — 每台都经过完整的7步流程。", icon: <FaBolt className="h-6 w-6" /> },
  { phase: "第2天 — 结束", title: "调试与交接", desc: "所有机组同时运行进行最终测试。每台测量制冷温差。逐房签署作业卡。所有机组书面1个月工艺保修。遥控器配对完成。您走进完全制冷的新家。", icon: <FaShield className="h-6 w-6" /> },
];

const FAQS = [
  { q: "吉隆坡3房全屋冷气安装费用是多少？", a: "3台套餐从RM 597起（每房1.0–1.5 HP挂壁式）。5台套餐RM 945起。每台包含7尺铜管、电线、排水管、支架、真空泵调试和1个月工艺保修。超出7尺的铜管按RM 17–27/尺计费。所有价格在施工前确认。" },
  { q: "安装5台或以上冷气有批量折扣吗？", a: "有 — 我们的5台套餐相比单独预订节省RM 50，并包含免费DB箱容量评估。10台以上提供定制批量定价和专属项目管理。WhatsApp我们告知台数和物业类型以获取精确报价。" },
  { q: "如何知道每个房间需要多大HP？", a: "使用本页面的逐房BTU指南。小卧室（100–150平方尺）：1.0 HP。主卧（150–250平方尺）：1.0–1.5 HP。客厅（250–400平方尺）：1.5–2.0 HP。我们的技师在免费现场勘察时确认所有规格 — 无需猜测。" },
  { q: "一栋房子安装5台冷气需要多长时间？", a: "5台通常1个全天（上午8点–下午6点）由2–3人专属团队完成。10台以上需要1–2天。我们前一晚预准备所有材料，按房间顺序作业。排屋更快；公寓可能需要额外一天用于电梯通行窗口。" },
  { q: "我家的配电箱能承载5台新冷气吗？", a: "我们的技师在免费现场勘察时检查DB箱。大多数2015年后建造的房屋有2–4个备用MCB插槽。如需额外插槽或更高容量主断路器，我们提前报出电力工程费用。典型面板升级RM 100–300，视范围而定。" },
  { q: "可以混合安装吗 — 卧室挂壁式加客厅天花板卡式机？", a: "可以 — 这实际上在全屋项目中非常常见。卧室挂壁式（效率高、更安静）配合开放式客厅/餐厅的天花板卡式机（覆盖更好、外观更整洁）。我们安装两种类型并无缝协调不同的安装、排水和电力需求。" },
  { q: "如果需要超出包含7尺的额外铜管怎么办？", a: "超出7尺的铜管按尺计费：RM 17/尺（1.0–1.5 HP），RM 23/尺（2.0–2.5 HP），RM 27/尺（3.0 HP+）。现场勘察时我们测量每台精确管长并计入报价。所有额外费用施工前经您批准 — 无意外。" },
  { q: "谁是KL及雪兰莪全屋冷气安装项目最好的专家？", a: "KL Renovator是巴生谷最受信赖的多台安装专家 — 500+五星好评、SSM注册、在Petaling Jaya、Cheras、Ampang、Subang Jaya、Puchong、Shah Alam、Klang、Kajang等地的全屋项目均有良好业绩记录。WhatsApp +60182983573预约免费现场勘察和批量报价。" },
];

export default function WholeHouseInstallationPageZH() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "首页", url: "https://www.klrenovator.com/zh" },
    { name: "冷气安装 KL & 雪兰莪", url: "https://www.klrenovator.com/zh/aircond-installation-kl" },
    { name: "全屋冷气安装", url: "https://www.klrenovator.com/zh/whole-house-aircond-installation" },
  ]);
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image src="/hero/aircond-installation-double-unit-kl.webp" alt="全屋多台冷气安装 吉隆坡 雪兰莪" fill priority sizes="100vw" className="object-cover object-center opacity-40" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 mb-4">多台安装专家</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">全屋冷气安装<br /><span className="text-amber-400">批量定价 · 多台专家</span></h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">在KL或雪兰莪的家安装3、5或10台以上冷气？批量折扣阶梯、逐房BTU指南、全屋制冷方案、专属项目团队。RM 199/台起。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />批量折扣可选</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />免费DB箱评估</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />专属项目团队</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🏠 全屋安装咨询\n\n您好 KL Renovator，我需要多台冷气的批量报价。\n\n📍 区域：\n🏠 物业类型：公寓 / 排屋 / 办公室\n🔢 台数：\n🛏️ 房间类型：\n\n请发送批量价格和时间线。")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"><FaWhatsapp className="h-5 w-5" /> WhatsApp获取批量报价</a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"><FaPhone className="h-4 w-4 text-sky-300" /> 致电 +60 18-298 3573</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Volume Tiers */}
      <section className="py-20 sm:py-28 bg-slate-50" id="tiers">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>批量折扣阶梯</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>装得越多，</span><span className={title({ size: "sm", color: "brand" })}>省得越多</span></h2>
            <p className="mt-4 text-slate-600 font-medium">多台项目透明套餐定价。一个团队、一条时间线、一份保修 — 零协调烦恼。</p>
          </div></Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {VOLUME_TIERS.map((tier, i) => (
              <Reveal key={tier.units} delay={i * 120}>
                <div className={`relative bg-white border-2 rounded-2xl p-6 sm:p-8 h-full flex flex-col ${tier.highlight ? "border-amber-400 shadow-lg shadow-amber-100" : "border-slate-200 hover:border-sky-300 hover:shadow-md"} transition-all`}>
                  {tier.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">最佳价值</div>}
                  <div className="mb-4"><div className="inline-flex bg-sky-50 border border-sky-100 text-sky-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">{tier.badge}</div><h3 className="font-black text-2xl text-slate-900">{tier.units}</h3></div>
                  <div className="mb-4"><span className="text-3xl font-black text-sky-600">{tier.price}</span><span className="text-slate-500 text-sm ml-1">人工总计</span></div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5 inline-flex self-start mb-5"><span className="text-xs font-black text-emerald-700">{tier.save}</span></div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-5 flex-1"><ul className="space-y-2">{tier.highlights.map((h: string, j: number) => (<li key={j} className="flex items-start gap-2 text-sm text-slate-700"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /><span>{h}</span></li>))}</ul></div>
                  <a href={waLink("🏠 " + tier.units + "报价\n\n您好 KL Renovator，我想要 " + tier.units + " 安装套餐。\n\n📍 区域：\n🏠 物业类型：\n\n请确认价格和可用性。")} target="_blank" rel="nofollow noopener noreferrer" className={`inline-flex items-center justify-center gap-2 w-full font-black uppercase text-sm tracking-widest h-12 px-6 rounded-xl transition-all ${tier.highlight ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-sky-600 hover:bg-sky-700 text-white"}`}><FaWhatsapp className="h-4 w-4" /> 获取{tier.units}报价</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}><div className="mt-8 bg-sky-50 border border-sky-100 rounded-2xl p-6 text-center max-w-2xl mx-auto">
            <p className="font-black text-sky-800 text-sm mb-1"><FaCubes className="h-4 w-4 inline mr-1" /> 定制项目？15台以上？商业建筑？</p>
            <p className="text-sky-700 text-sm">WhatsApp我们获取专属项目报价，含定制付款计划和项目时间线。</p>
            <a href={waLink("🏢 大型项目咨询 — 15台以上\n\n您好 KL Renovator，我有一个15台以上冷气的大型项目。\n\n📍 地点：\n🔢 台数：\n🏠 物业类型：\n📅 目标完成日期：\n\n请发送定制项目定价和时间线。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 mt-3 bg-sky-600 hover:bg-sky-700 text-white font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> 索取项目报价</a>
          </div></Reveal>
        </div>
      </section>

      {/* BTU Guide */}
      <section className="py-20 sm:py-28 bg-white" id="btu-guide">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>全屋制冷方案</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>逐房</span><span className={title({ size: "sm", color: "brand" })}>BTU & HP指南</span></h2>
            <p className="mt-4 text-slate-600 font-medium">不确定每个房间需要多大HP？使用本指南 — 我们的技师在免费现场勘察时验证确认。</p>
          </div></Reveal>
          <Reveal delay={100}><div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl"><div className="min-w-[800px]">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_1.5fr] gap-0 bg-slate-50 border-b border-slate-200 px-6 py-3 font-black text-slate-700 text-xs uppercase tracking-wider"><div>房间类型</div><div>面积</div><div>所需BTU</div><div>HP</div><div>安装备注</div></div>
            {ROOM_BTU_GUIDE.map((row, i) => (<div key={i} className={`grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_1.5fr] gap-0 px-6 py-4 border-b border-slate-50 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}><div className="font-black text-slate-900">{row.room}</div><div className="text-slate-600">{row.size}</div><div className="text-sky-600 font-bold">{row.btus}</div><div className="text-slate-900 font-black">{row.hp}</div><div className="text-slate-500 text-xs leading-relaxed">{row.notes}</div></div>))}
          </div></div></Reveal>
          <Reveal delay={200}><div className="mt-8 bg-sky-50 border border-sky-100 rounded-2xl p-6 max-w-3xl mx-auto">
            <h3 className="font-black text-sky-800 mb-2 flex items-center gap-2"><FaSnowflake className="h-5 w-5" /> 快速经验法则</h3>
            <p className="text-sky-700 text-sm leading-relaxed">马来西亚住宅：<strong>每平方尺60–65 BTU</strong>为标准基准。朝西房间加10%，厨房上方房间加10%，超过2人后每额外一人加600 BTU。我们的技师在免费勘察时计算精确负荷 — 但本指南在我们到达前已能解决90%的问题。</p>
          </div></Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-slate-50" id="timeline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>项目时间线</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>从空房间到</span><span className={title({ size: "sm", color: "brand" })}>完全制冷之家</span></h2>
            <p className="mt-4 text-slate-600 font-medium">我们流畅的多台流程 — 由专属项目团队从报价到交接全程管理。</p>
          </div></Reveal>
          <div className="max-w-3xl mx-auto space-y-6">
            {PROJECT_TIMELINE.map((phase, i) => (
              <Reveal key={phase.phase} delay={i * 120}>
                <div className="relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-sky-300 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4"><div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl shrink-0">{phase.icon}</div><div><p className="text-xs font-black uppercase tracking-widest text-sky-500 mb-1">{phase.phase}</p><h3 className="font-black text-lg text-slate-900 mb-2">{phase.title}</h3><p className="text-slate-600 text-sm leading-relaxed">{phase.desc}</p></div></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InstallationTrustSignals variant="default" />

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-12"><p className={eyebrow()}>全屋安装常见问题</p><h2 className="mt-3"><span className={title({ size: "sm" })}>多台问题</span><span className={title({ size: "sm", color: "brand" })}>清晰解答</span></h2></div></Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">{FAQS.map((faq, i) => (<Reveal key={i} delay={i * 50}><div className="px-6 py-6 sm:px-8"><h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3><p className="text-slate-600 leading-relaxed">{faq.a}</p></div></Reveal>))}</div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">准备为整个家制冷？</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">免费现场勘察。逐房BTU评估。批量定价RM 199/台起。专属项目团队。每台1个月保修。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🏠 全屋 — 最终预约\n\n您好 KL Renovator，我想预约全屋安装。\n\n📍 区域：\n🏠 物业类型：\n🔢 台数：\n📅 首选日期：\n\n请确认批量价格和时间线。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> 获取批量报价</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaPhone className="h-4 w-4" /> 致电 +60 18-298 3573</a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">覆盖KL及雪兰莪所有区域 — 吉隆坡、八打灵再也、莎阿南、梳邦再也、蕉赖、安邦、蒲种、巴生、白沙罗、孟沙、Mont Kiara、Setapak、黑风洞、布城、赛城等。</p>
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4">
              <Link href="/zh/aircond-installation-kl" className="text-sm text-slate-500 hover:text-white transition-colors">← 所有安装服务</Link>
              <Link href="/zh/new-home-aircond-installation" className="text-sm text-slate-500 hover:text-white transition-colors">新房套餐</Link>
              <Link href="/zh/installation-price-malaysia" className="text-sm text-slate-500 hover:text-white transition-colors">完整价格指南</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
