import { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { FaWhatsapp, FaCheck, FaShield, FaBuilding, FaStore, FaUtensils, FaHospital, FaServer, FaPhone, FaBolt, FaCalendarCheck } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "商业冷气安装 KL & 雪兰莪 — 办公室、店铺、B2B | KL Renovator",
  description: padMetaDescription("商业冷气安装：办公室、店铺、餐厅、诊所及服务器机房。天花板卡式、管道式、多联式系统。AMC保养合约可选。WhatsApp +60182983573"),
  openGraph: {
    title: "商业冷气安装 KL & 雪兰莪 — 办公室、店铺、B2B | KL Renovator",
    description: "办公室、店铺、餐厅、诊所及服务器机房冷气安装。天花板卡式、管道式、多联式。AMC可选。WhatsApp +60182983573",
    type: "website", locale: "zh_MY",
    url: "https://www.klrenovator.com/zh/commercial-aircond-installation",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp", width: 1200, height: 630, alt: "商业冷气安装 KL 雪兰莪" }],
  },
  twitter: { card: "summary_large_image", title: "商业冷气安装 KL & 雪兰莪 — B2B | KL Renovator", description: "办公室、店铺、餐厅、诊所及服务器机房。天花板卡式、管道式、多联式。AMC可选。WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/zh/commercial-aircond-installation", languages: { "en-MY": "https://www.klrenovator.com/commercial-aircond-installation", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-komersial", "zh-MY": "https://www.klrenovator.com/zh/commercial-aircond-installation", "x-default": "https://www.klrenovator.com/commercial-aircond-installation" } },
};

const BUSINESS_TYPES = [
  { icon: <FaBuilding className="h-6 w-6" />, title: "办公楼", desc: "开放式办公室的天花板卡式或管道式系统。非营业时间安装，避免影响运营。多区域制冷，每个楼层或部门独立温控。AMC计划RM 299/年起每台。", features: ["天花板卡式 2.0–6.0 HP", "多联式配置", "非营业时间/周末安装", "分区制冷设计", "含季度保养的AMC"] },
  { icon: <FaStore className="h-6 w-6" />, title: "店铺及零售", desc: "适用于店面、精品店和零售空间的挂壁式或天花板卡式机。高制冷量机型应对玻璃店面和高客流量。隐蔽安装，不影响陈列和顾客动线。", features: ["挂壁式 1.5–3.0 HP", "大空间天花板卡式机", "隐藏排水冷凝泵", "快速安装 — 最短停业时间", "节能变频机型"] },
  { icon: <FaUtensils className="h-6 w-6" />, title: "餐厅及餐饮", desc: "厨房及用餐区的重型冷气系统。可选耐油污盘管涂层。高风量机型应对开放式厨房热负荷。符合当地卫生部门通风要求。", features: ["厨房专用涂层盘管机型", "长管道高静压机型", "兼容油污过滤器", "用餐区：天花板卡式或管道式", "建议6个月化学清洗周期"] },
  { icon: <FaHospital className="h-6 w-6" />, title: "诊所及医疗", desc: "诊室、候诊区和药房的恒温制冷。可选HEPA/UV过滤。低噪音机型保证病人舒适。符合KKM设施指南。", features: ["挂壁式或天花板卡式", "可选HEPA/UV过滤", "超静音变频机型", "24/7可靠运行", "紧急维修优先SLA"] },
  { icon: <FaServer className="h-6 w-6" />, title: "服务器机房", desc: "中小型服务器机房和IT设备间的精密制冷。24/7额定变频压缩机。冗余选项（N+1配置）。温湿度监控集成。", features: ["高显热比制冷机型", "24/7连续运行额定", "变频精确温控", "带溢流报警的冷凝泵", "可选冗余机组配置"] },
];

const PRICING = [
  { type: "挂壁式 · 1.5 HP", price: "RM 199", suitable: "小型办公室、诊室、零售柜台" },
  { type: "挂壁式 · 2.0–2.5 HP", price: "RM 249–279", suitable: "中型办公室、店铺、等候区" },
  { type: "挂壁式 · 3.0 HP", price: "RM 329", suitable: "大型办公室、餐厅用餐区" },
  { type: "天花板卡式 · 1.0–1.5 HP", price: "RM 290", suitable: "小会议室、私人办公室" },
  { type: "天花板卡式 · 2.0–3.0 HP", price: "RM 350", suitable: "开放式办公室、店铺、诊所等候区" },
  { type: "天花板卡式 · 3.5–6.0 HP", price: "RM 400", suitable: "大型商业空间、餐厅" },
];

const AMC_BENEFITS = [
  { icon: <FaCalendarCheck className="h-5 w-5" />, title: "季度预防性维护", desc: "每3个月定期保养 — 过滤网清洁、盘管检查、气压检测、电路检查。保持机组最佳效率，减少60%以上故障。" },
  { icon: <FaBolt className="h-5 w-5" />, title: "优先紧急响应", desc: "AMC客户在工作时间内享2小时优先派遣。专属商业支持热线。关键故障当天技师到位。" },
  { icon: <FaShield className="h-5 w-5" />, title: "维修折扣费率", desc: "AMC会员节省15–25%的零件和人工费用。免费诊断检查。合约客户无上门费。" },
];

const FAQS = [
  { q: "吉隆坡办公室商业冷气安装费用是多少？", a: "商业挂壁式安装从RM 199起（1.5 HP）适用于小型办公室。天花板卡式从RM 290（1.0–1.5 HP）到RM 400（3.5–6.0 HP）。每个价格含7尺铜管、电线、排水管、支架/吊架、真空泵调试和1个月工艺保修。额外材料现场报价批准。" },
  { q: "能在营业时间外安装冷气，避免影响运营吗？", a: "可以 — 我们专注于非营业时间商业安装。晚间时段（下午6点–晚上10点）、周末和公共假期均可。餐厅可在打烊至开业之间作业。办公室安装通常安排在周末。非营业时间作业不加价 — 这是我们商业客户的标准服务。" },
  { q: "什么类型的冷气最适合我的店铺或办公室？", a: "开放式办公室和店铺：天花板卡式（制冷均匀、隐藏安装、适配标准天花板格）。独立办公室和诊室：挂壁式（成本更低、独立控制）。服务器机房：专用高显热24/7额定机型。我们的现场勘察为您的具体空间确定最佳类型。" },
  { q: "为商业客户提供年度保养合约（AMC）吗？", a: "提供 — AMC计划RM 299/年起每台，含季度预防性维护。包括优先紧急响应（2小时派遣）、15–25%维修折扣、免费诊断检查和定期保养。多台商业折扣可询价。" },
  { q: "新店铺或办公室开业前安装冷气需要多长时间？", a: "标准1–3台商业安装：1–2天。大型安装（5台以上天花板卡式）：3–5天，配备专属项目团队。建议在目标开业日期前2周预约。加急/快速安装可选 — WhatsApp我们查询可用性。" },
  { q: "安装商业空间的管道式或隐藏式冷气系统吗？", a: "安装 — 我们为需要隐藏室内机、通过天花板格栅分布气流的商业空间安装隐藏式管道分体系统。这在高档办公室、精品店和追求整洁天花板外观的餐厅中很常见。管道式系统在勘察后按项目报价。" },
  { q: "能处理KL商业大厦多层办公室的冷气安装吗？", a: "可以 — 我们与大厦管理处协调多层安装，包括电梯/卸货区排期、非营业时间通行许可和结构安装审批。项目团队全程管理协调。我们在KL主要商业大厦有丰富经验，包括KLCC区域、Bangsar South、Damansara Perdana和Mont Kiara。" },
  { q: "安装和维修哪些商业冷气品牌？", a: "全部20个主要品牌 — 大金、松下、三菱、约克、Carrier、美的、LG、三星、富士通、日立、夏普、Acson、格力、东芝、海尔、海信、Aux、TCL、Isonic和National。我们提供来自巴生谷所有主要经销商的商业级机型（更高静压、更长管线、24/7工作循环额定）。" },
];

export default function CommercialInstallationPageZH() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "首页", url: "https://www.klrenovator.com/zh" },
    { name: "冷气安装 KL & 雪兰莪", url: "https://www.klrenovator.com/zh/aircond-installation-kl" },
    { name: "商业冷气安装", url: "https://www.klrenovator.com/zh/commercial-aircond-installation" },
  ]);
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image src="/logo/image.png" alt="商业冷气安装 办公室 店铺 餐厅 KL 雪兰莪" fill priority sizes="100vw" className="object-cover object-center opacity-40" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">B2B商业安装专家</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">商业冷气安装<br /><span className="text-indigo-400">办公室 · 店铺 · 餐厅 · B2B</span></h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">KL及雪兰莪的天花板卡式、管道式、多联式和挂壁式商业冷气安装。非营业时间安装，AMC保养合约，专属项目管理。全部20个品牌。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />非营业时间可选</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />AMC计划 RM 299/年起</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />专属项目团队</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🏢 商业安装咨询\n\n您好 KL Renovator，我需要为我的企业安装商业冷气。\n\n📍 地点：\n🏢 企业类型：办公室 / 店铺 / 餐厅 / 诊所 / 其他\n📏 空间面积（平方尺）：\n🔢 所需台数：\n\n请发送商业价格和时间线。")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"><FaWhatsapp className="h-5 w-5" /> 获取商业报价</a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"><FaPhone className="h-4 w-4 text-sky-300" /> 致电 +60 18-298 3573</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-slate-50" id="business-types">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12"><p className={eyebrow()}>按业务类型的商业解决方案</p><h2 className="mt-3"><span className={title({ size: "sm" })}>为每个商业空间</span><span className={title({ size: "sm", color: "brand" })}>量身定制的安装</span></h2><p className="mt-4 text-slate-600 font-medium">每种业务类型都有独特的制冷需求。我们围绕您的运营设计 — 而非相反。</p></div></Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{BUSINESS_TYPES.map((bt, i) => (<Reveal key={bt.title} delay={i * 80}><div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all h-full flex flex-col"><div className="inline-flex p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl mb-4">{bt.icon}</div><h3 className="font-black text-lg text-slate-900 mb-2">{bt.title}</h3><p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{bt.desc}</p><div className="bg-slate-50 rounded-xl p-4"><ul className="space-y-1.5">{bt.features.map((f, j) => (<li key={j} className="flex items-start gap-2 text-xs text-slate-600"><FaCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" /><span>{f}</span></li>))}</ul></div></div></Reveal>))}</div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12"><p className={eyebrow()}>商业安装价格</p><h2 className="mt-3"><span className={title({ size: "sm" })}>企业透明</span><span className={title({ size: "sm", color: "brand" })}>定价</span></h2><p className="mt-4 text-slate-600 font-medium">与住宅相同的透明单台定价 — 商业级服务标准。</p></div></Reveal>
          <Reveal delay={100}><div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl"><div className="min-w-[700px]"><div className="grid grid-cols-[1.5fr_0.8fr_2fr] gap-0 bg-slate-50 border-b border-slate-200 px-6 py-3 font-black text-slate-700 text-xs uppercase tracking-wider"><div>机型</div><div>人工价格</div><div>最适合</div></div>{PRICING.map((p, i) => (<div key={i} className={`grid grid-cols-[1.5fr_0.8fr_2fr] gap-0 px-6 py-4 border-b border-slate-50 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}><div className="font-black text-slate-900">{p.type}</div><div className="text-indigo-600 font-black">{p.price}</div><div className="text-slate-500">{p.suitable}</div></div>))}</div></div></Reveal>
          <Reveal delay={200}><div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6 max-w-3xl mx-auto"><p className="font-black text-amber-800 text-sm mb-2">定制商业报价？</p><p className="text-amber-700 text-sm mb-3">多台、管道式系统或复杂布局 — WhatsApp我们您的平面图以获取详细项目报价。</p><a href={waLink("🏢 定制商业报价\n\n您好 KL Renovator，我需要定制商业安装报价。\n\n📍 地点：\n🏢 企业类型：\n📏 总面积（平方尺）：\n🔢 所需台数：\n\n请发送详细项目定价。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> 索取定制商业报价</a></div></Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-slate-50" id="amc">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12"><p className={eyebrow()}>年度保养合约（AMC）</p><h2 className="mt-3"><span className={title({ size: "sm" })}>保持商业机组</span><span className={title({ size: "sm", color: "brand" })}>24/7运行</span></h2><p className="mt-4 text-slate-600 font-medium">预防性维护优于紧急维修。AMC计划RM 299/年起每台 — 相比单次预约节省高达30%。</p></div></Reveal>
          <div className="grid gap-8 md:grid-cols-3 mb-12">{AMC_BENEFITS.map((b, i) => (<Reveal key={b.title} delay={i * 100}><div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all h-full"><div className="inline-flex p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl mb-4">{b.icon}</div><h3 className="font-black text-slate-900 mb-2">{b.title}</h3><p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p></div></Reveal>))}</div>
          <Reveal delay={300}><div className="max-w-2xl mx-auto bg-indigo-600 text-white rounded-2xl p-8 text-center"><h3 className="font-black text-xl mb-2">商业AMC套餐</h3><div className="grid grid-cols-2 gap-4 mt-6 text-left"><div className="bg-white/10 rounded-xl p-4"><p className="text-xs text-indigo-200 mb-1">基础 · 每台</p><p className="font-black text-2xl">RM 299<span className="text-sm font-normal text-indigo-200">/年</span></p></div><div className="bg-white/10 rounded-xl p-4"><p className="text-xs text-indigo-200 mb-1">高级 · 每台</p><p className="font-black text-2xl">RM 899<span className="text-sm font-normal text-indigo-200">/年</span></p></div></div><a href={waLink("📋 AMC合约咨询\n\n您好 KL Renovator，我对商业AMC计划感兴趣。\n\n🏢 企业类型：\n🔢 台数：\n📍 地点：\n\n请发送AMC详情和价格。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 mt-6 bg-white hover:bg-indigo-50 text-indigo-700 font-black uppercase text-sm tracking-widest px-8 py-4 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> 咨询AMC</a></div></Reveal>
        </div>
      </section>

      <InstallationTrustSignals variant="default" />

      <section className="py-20 sm:py-28 bg-white" id="faq"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><Reveal><div className="text-center mb-12"><p className={eyebrow()}>商业安装常见问题</p><h2 className="mt-3"><span className={title({ size: "sm" })}>企业主问题</span><span className={title({ size: "sm", color: "brand" })}>解答</span></h2></div></Reveal><div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">{FAQS.map((faq, i) => (<Reveal key={i} delay={i * 50}><div className="px-6 py-6 sm:px-8"><h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3><p className="text-slate-600 leading-relaxed">{faq.a}</p></div></Reveal>))}</div></div></section>

      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"><Reveal>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">准备为企业制冷？</h2>
          <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">免费商业现场勘察。透明定价。非营业时间安装。AMC计划RM 299/年起。全部20个品牌。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink("🏢 商业安装 — 最终预约\n\n您好 KL Renovator，我想进行商业安装。\n\n📍 地点：\n🏢 企业类型：\n🔢 台数：\n📅 首选日期：\n\n请确认价格和排期。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> 预约商业安装</a>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaPhone className="h-4 w-4" /> 致电 +60 18-298 3573</a>
          </div>
          <p className="mt-6 text-slate-500 text-sm">覆盖KL及雪兰莪所有商业物业 — KLCC、Bangsar South、Damansara Perdana、Mont Kiara、PJ、Subang Jaya、Shah Alam、Klang、Puchong、Cheras等。</p>
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4">
            <Link href="/zh/aircond-installation-kl" className="text-sm text-slate-500 hover:text-white transition-colors">← 所有安装服务</Link>
            <Link href="/zh/services/maintenance-contract" className="text-sm text-slate-500 hover:text-white transition-colors">AMC详情</Link>
            <Link href="/zh/faq" className="text-sm text-slate-500 hover:text-white transition-colors">更多常见问题</Link>
          </div>
        </Reveal></div>
      </section>
    </>
  );
}
