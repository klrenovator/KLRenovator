import { Metadata } from "next";
import { FaWhatsapp, FaCheck, FaTruck, FaWrench, FaGauge, FaShield, FaClock, FaLocationDot, FaBuilding, FaPlug, FaSnowflake, FaMagnifyingGlass, FaBolt, FaTemperatureHalf } from "react-icons/fa6";
import { FiMessageSquare, FiPhone } from "react-icons/fi";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildInstallationServiceSchema, buildInstallationHowToSchema, buildInstallationFAQSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationCROModule } from "@/components/installation-cro-module";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "冷气安装 吉隆坡 & 雪兰莪 — RM199起 | 当天服务 | KL Renovator",
  description: "专业冷气安装RM199起 — 挂壁式、天花板卡式机、窗式机，覆盖20个品牌。真空泵、铜管、1个月工艺保修。当天可预约。WhatsApp +60182983573",
  openGraph: {
    title: "冷气安装 吉隆坡 & 雪兰莪 — RM199起 | KL Renovator",
    description: "专业冷气安装RM199起。挂壁式、天花板卡式机，所有品牌。真空泵、铜管、1个月工艺保修。WhatsApp +60182983573",
    type: "website",
    locale: "zh_MY",
    url: "https://www.klrenovator.com/zh/aircond-installation-kl",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp", width: 1200, height: 630, alt: "吉隆坡雪兰莪冷气安装" }],
  },
  twitter: { card: "summary_large_image", title: "冷气安装 吉隆坡 & 雪兰莪 — RM199起 | KL Renovator", description: "专业冷气安装RM199起。当天服务，所有品牌，1个月工艺保修。WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/zh/aircond-installation-kl", languages: { "en-MY": "https://www.klrenovator.com/aircond-installation-kl", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-kl", "zh-MY": "https://www.klrenovator.com/zh/aircond-installation-kl", "x-default": "https://www.klrenovator.com/aircond-installation-kl" } },
};

const INSTALLATION_PROCESS = [
  { step: 1, title: "WhatsApp预约与现场勘察", desc: "通过WhatsApp +60182983573联系我们，提供您的区域、机型（挂壁式、天花板卡式机、窗式机）和匹数。我们确认报价并安排当天或次日现场勘察。技师评估管路走向、室外机位置和电力需求。", icon: <FiMessageSquare className="h-5 w-5" /> },
  { step: 2, title: "技师派遣与准备工作", desc: "持证HVAC技师携带所有工具、材料（铜管、保温棉、支架、电线）和安全设备到达。保护膜保护地板和家具。开工前与您确认确切安装方案。", icon: <FaTruck className="h-5 w-5" /> },
  { step: 3, title: "铜管与保温安装", desc: "根据匹数使用Type L或Type M铜管，切割、扩口、整齐铺设。Armaflex保温棉（最少9mm）防止冷凝水和能量损失。管路用合适支架固定 — 无下垂、无阻碍制冷剂流动的急弯。", icon: <FaWrench className="h-5 w-5" /> },
  { step: 4, title: "排水管安装带坡度", desc: "PVC排水管按最小1:50坡度安装，利用重力排水。防虹吸弯管防止回流。封闭前测试冷凝水。高层公寓按大厦管理规定接至最近地漏或阳台排水口。", icon: <FaWrench className="h-5 w-5" /> },
  { step: 5, title: "电力连接与断路器检查", desc: "独立回路配正确MCB额定值（1.0–1.5匹16A，2.0–2.5匹20A，3.0匹+ 32A）。线径符合马来西亚标准。漏电保护验证通过。室外机隔离开关便于安全维护。", icon: <FaBolt className="h-5 w-5" /> },
  { step: 6, title: "真空泵抽真空（强制步骤）", desc: "双级真空泵将系统抽至500微米以下 — 彻底清除水分和非冷凝气体。此步骤绝不可跳过。跳过抽真空会导致压缩机故障、酸性物质形成、厂家保修失效。我们保持真空15+分钟确认无泄漏。", icon: <FaGauge className="h-5 w-5" /> },
  { step: 7, title: "释放制冷剂、测试与交付", desc: "释放出厂预充制冷剂。系统运行15+分钟。我们验证：制冷输出（送/回风温差）、运行压力、电流、温控器校准、零振动、零泄漏。书面1个月工艺保修卡交付。签署带清单的工单。", icon: <FaTemperatureHalf className="h-5 w-5" /> },
];

const PRICING_TABLE = [
  { type: "挂壁式", hp: "1.0 匹", price: "RM 199", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管" },
  { type: "挂壁式", hp: "1.5 匹", price: "RM 199", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管" },
  { type: "挂壁式", hp: "2.0 匹", price: "RM 249", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管" },
  { type: "挂壁式", hp: "2.5 匹", price: "RM 279", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管" },
  { type: "挂壁式", hp: "3.0 匹", price: "RM 329", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管" },
  { type: "挂壁式", hp: "4.0 匹", price: "RM 399", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管" },
  { type: "挂壁式", hp: "5.0 匹", price: "RM 449", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管" },
  { type: "天花板卡式机", hp: "1.0–1.5 匹", price: "RM 290", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管+水泵" },
  { type: "天花板卡式机", hp: "2.0–3.0 匹", price: "RM 350", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管+水泵" },
  { type: "天花板卡式机", hp: "3.5–6.0 匹", price: "RM 400", pipe: "含7尺铜管", wire: "含电线", drain: "含排水管+水泵" },
  { type: "窗式机", hp: "1.0–2.0 匹", price: "RM 199", pipe: "不适用(一体机)", wire: "含电线", drain: "内置排水" },
];

const BRANDS = siteConfig.brandsSupported;

const FAQS = [
  { q: "吉隆坡和雪兰莪冷气安装费用是多少？", a: "挂壁式安装RM199起（1.0–1.5匹），含7尺铜管、电线、排水管和标准支架。天花板卡式机RM290起。窗式机RM180起。超出7尺的额外材料按尺收费 — 铜管RM 17–27/尺、电线RM 9/尺、套管RM 6–12/尺。所有价格开工前确认。 超出7尺的排水管为RM 5/尺。" },
  { q: "冷气安装需要多长时间？", a: "标准挂壁式安装单台需3–5小时。天花板卡式机需5–8小时（含吊装和水泵布线）。全屋多台安装通常1–2天完成。上午11点前预约可安排当天安装。" },
  { q: "你们在吉隆坡高层公寓安装冷气吗？", a: "是的 — 我们经常在KLCC、Mont Kiara、Bangsar、Sentul、PJ、Subang Jaya等地的公寓安装。我们协调大厦管理处申请电梯/装卸区，遵守安保程序，确保室外机位置符合JMB规定。技师熟悉服务阳台和阳台安装。" },
  { q: "安装使用什么等级的铜管？", a: "1.0–2.5匹挂壁式用Type L铜管，3.0匹+用Type M（壁厚允许时）。焊接时通氮气防止内部氧化。Armaflex保温棉9–13mm为标配。这超过马来西亚最低标准，确保长期可靠性。" },
  { q: "为什么必须抽真空？", a: "抽真空清除制冷管路内的水分和空气。水分+制冷剂=酸，会烧毁压缩机线圈、堵塞毛细管。非冷凝气体升高高压、降低效率。我们抽至500微米并保持15+分钟。不抽真空=不保修。这是全球HVAC标准最佳实践。" },
  { q: "马来西亚雨季可以安装吗？", a: "可以 — 全年安装。雨天室外作业用帐篷和防水布遮盖。室内机安装和管路不受影响。仅大暴雨雷电天气暂停室外机安装以确保安全。雨季当天名额可能较紧 — 建议早预约。" },
  { q: "新冷气需要独立电路吗？", a: "需要 — 马来西亚法规（MS IEC 60364）要求每台冷气有独立回路和专用MCB。若无现成回路我们从配电箱拉新线，或验证现有回路容量。插电式也需受保护回路上的专用插座。电气工程包含在安装报价内。" },
  { q: "安装提供什么保修？", a: "所有安装人工提供1个月书面工艺保修。30天内出现任何安装相关问题（漏水、振动、电气故障、制冷差）免费返修。机器本身的厂家保修（通常压缩机5年、零件1年）另行计算，需专业安装证明 — 我们的工单即为证明。" },
  { q: "如何在吉隆坡或雪兰莪预约附近的冷气安装？", a: "WhatsApp +60182983573，提供区域、机型（挂壁式/天花板卡式机/窗式机）、匹数、心仪日期。30分钟内确认报价排期。早预约可安排当天安装。覆盖全KL和雪兰莪 — 八打灵再也、蕉赖、安邦、梳邦再也、蒲种、莎阿南、白沙罗、巴生、加影、孟沙、满家乐、武吉洞、布城、赛城等。" },
];

function TrustBadge({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90">
      <Icon className="h-4 w-4 text-emerald-400" />
      {label}
    </span>
  );
}

function ProcessStep({ step, title, desc, icon }: { step: number; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="relative flex gap-6 group">
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-xl z-10 relative border-4 border-white">{step}</div>
        {step < 7 && <div className="absolute left-1/2 top-12 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 to-transparent" />}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex p-2 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl">{icon}</div>
          <h3 className="font-black text-slate-900 text-lg">{title}</h3>
        </div>
        <p className="text-slate-600 leading-relaxed ml-10">{desc}</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-slate-100 last:border-0 py-5">
      <h3 className="font-black text-slate-900 mb-2 text-base">{q}</h3>
      <p className="text-slate-600 leading-relaxed">{a}</p>
    </div>
  );
}

function PricingRow({ type, hp, price, pipe, wire, drain, isHeader = false }: { type: string; hp: string; price: string; pipe: string; wire: string; drain: string; isHeader?: boolean }) {
  return (
    <div className={`grid grid-cols-[1fr_80px_repeat(3,1fr)] gap-4 px-4 py-3 ${isHeader ? "bg-slate-50 font-black text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200" : "border-b border-slate-50 hover:bg-sky-50/30 transition-colors text-sm"}`}>
      <span className={`font-${isHeader ? "black" : "medium"} text-${isHeader ? "slate-700" : "slate-900"}`}>{type}</span>
      <span className="text-center">{hp}</span>
      <span className="text-center text-sky-600 font-black">{price}</span>
      <span className="text-center text-xs text-slate-500">{pipe}</span>
      <span className="text-center text-xs text-slate-500">{wire}</span>
      <span className="text-center text-xs text-slate-500">{drain}</span>
    </div>
  );
}

export default function AircondInstallationKLZHPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "首页", url: "https://www.klrenovator.com/zh" },
    { name: "冷气安装 吉隆坡 & 雪兰莪", url: "https://www.klrenovator.com/zh/aircond-installation-kl" },
  ]);

  const serviceSchema = buildInstallationServiceSchema();
  const howToSchema = buildInstallationHowToSchema();
  const faqSchema = buildInstallationFAQSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image
          src="/hero/aircond-installation-kuala-lumpur.webp"
          alt="KL Renovator技师进行专业冷气安装 吉隆坡"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">吉隆坡 & 雪兰莪最受信赖的安装专家</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">
              冷气安装 吉隆坡 & 雪兰莪
              <br />
              <span className="text-sky-400">RM199起 · 当天服务 · 全品牌</span>
            </h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">
              专业挂壁式、天花板卡式机、窗式机安装，覆盖吉隆坡与雪兰莪全域。
              真空泵抽真空、Type L铜管、Armaflex保温、1个月工艺保修。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrustBadge icon={FaCheck} label="安装低至RM199" />
              <TrustBadge icon={FaClock} label="当天可预约" />
              <TrustBadge icon={FaShield} label="1个月工艺保修" />
              <TrustBadge icon={FaTruck} label="20大品牌全支持" />
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🔧 冷气安装咨询\n\n你好KL Renovator，我要装新冷气。\n\n📍 我的区域：\n❄️ 机型：挂壁式 / 天花板卡式机 / 窗式机\n📏 匹数（如知道）：\n🏠 物业：公寓 / 排屋 / 办公室 / 店铺\n\n请报价并提供可用时段。")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all">
                <FaWhatsapp className="h-5 w-5" /> WhatsApp预约安装
              </a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all">
                <FiPhone className="h-4 w-4 text-sky-300" /> 致电 +60 18-298 3573
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Transparency Table */}
      <section className="py-20 sm:py-28 bg-slate-50" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className={eyebrow()}>透明安装报价</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>无隐形收费 — </span><span className={title({ size: "sm", color: "brand" })}>动钻前价格已确认</span></h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
              <div className="min-w-[900px]">
                <PricingRow type="类型" hp="匹数" price="人工费" pipe="铜管" wire="电线" drain="排水管" isHeader />
                {PRICING_TABLE.map((row) => (
                  <PricingRow key={`${row.type}-${row.hp}`} {...row} />
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <h3 className="font-black text-emerald-800 mb-3 flex items-center gap-2"><FaCheck className="h-5 w-5" /> 人工费包含项目</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-700">
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 免费现场勘察报价</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 7尺铜管(液管+气管)</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 7尺电线</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 7尺PVC排水管</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 标准室外机支架</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 真空泵抽真空调试</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 释放制冷剂测试</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 1个月工艺保修卡</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <h3 className="font-black text-amber-800 mb-3 flex items-center gap-2"><FaMagnifyingGlass className="h-5 w-5" /> 额外收费（仅按需）</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-amber-700">
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 超7尺铜管: RM 17/尺 (1.0–1.5 匹), RM 23/尺 (2.0–2.5 匹), RM 27/尺 (3.0–3.5 匹)</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 超7尺电线: RM 9/尺 (1.0–1.5 匹), RM 13/尺 (2.0–2.5 匹), RM 17/尺 (3.0–4.0 匹)</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 小型PVC线槽（电线）：RM 6/尺；大型PVC线槽（铜管+电线+保温层）：RM 12/尺</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 标准室外压缩机/支架: RM 45</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 重型室外压缩机/支架: RM 70</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 新插座点位: RM 100</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 凿墙/暗管: RM 6/尺</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 高层/难进场: RM 50–150</li>
              </ul>
              <p className="mt-4 text-xs text-amber-600">所有额外费用现场报价、经您批准后才动工。绝无惊喜。</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose KL Renovator for Installation */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className={eyebrow()}>为何选择 KL Renovator 安装？</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>由 </span><span className={title({ size: "sm", color: "brand" })}>持证HVAC技师</span><span className={title({ size: "sm" })}> 专业安装</span></h2>
              <p className="mt-4 text-slate-600 font-medium">我们不只是装机 — 我们打造经久耐用的完整制冷系统。</p>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <FaWrench className="h-6 w-6" />, title: "每单必抽真空", desc: "强制500微米真空，无例外。保护您的压缩机使用多年。" },
              { icon: <FaPlug className="h-6 w-6" />, title: "Type L铜管+Armaflex", desc: "优质铜管配9–13mm Armaflex保温。拒绝劣质薄壁替代品。" },
              { icon: <FaBolt className="h-6 w-6" />, title: "独立回路+正确MCB", desc: "依MS IEC 60364标准布电。断路器选型正确、漏电保护、含隔离开关。" },
              { icon: <FaGauge className="h-6 w-6" />, title: "精密调试验收", desc: "15分钟实测：压力、电流、温控校准、制冷温差全验证。" },
              { icon: <FaShield className="h-6 w-6" />, title: "书面1个月工艺保修", desc: "签署清单工单。30天内任何安装问题 — 免费上门解决。" },
              { icon: <FaBuilding className="h-6 w-6" />, title: "公寓/JMB专家", desc: "熟悉大厦审批、电梯预约、服务阳台进出、非办公时段规定。" },
              { icon: <FaSnowflake className="h-6 w-6" />, title: "覆盖20大主流品牌", desc: "大金、松下、三菱、约克、美的、LG、三星、开利、富士通、日立、夏普、Acson、格力、东芝、海信、Aux、TCL、Isonic、National、三洋。" },
              { icon: <FaLocationDot className="h-6 w-6" />, title: "全吉隆坡雪兰莪服务", desc: "八打灵再也、蕉赖、安邦、梳邦、蒲种、莎阿南、白沙罗、巴生、加影、孟沙、满家乐、武吉洞、布城、赛城。" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 50}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all">
                  <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4">{item.icon}</div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process - 7 Steps */}
      <section className="py-20 sm:py-28 bg-slate-50" id="process">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className={eyebrow()}>7步标准安装流程</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>从预约到 </span><span className={title({ size: "sm", color: "brand" })}>舒适制冷</span></h2>
              <p className="mt-4 text-slate-600 font-medium">每单安装严格遵循此流程 — 不走捷径、无隐藏惊喜。</p>
            </div>
          </Reveal>
          <div className="space-y-8">
            {INSTALLATION_PROCESS.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <ProcessStep {...step} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Technical Details */}
      <section className="py-20 sm:py-28 bg-white" id="materials">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow()}>材料与技术标准</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>每个 </span><span className={title({ size: "sm", color: "brand" })}>优质安装</span><span className={title({ size: "sm" })}> 的用料</span></h2>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal delay={100}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><FaPlug className="h-5 w-5 text-sky-600" /> 铜管</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Type L铜管（1.0–2.5匹）— 壁厚、抗腐蚀强</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Type M铜管（3.0匹+）— 大匹数认可规格</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 焊接通氮气 — 防内部氧化</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 扩口扭力扳手按规范拧紧</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 无扁折、急弯、管径不足</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><FaTemperatureHalf className="h-5 w-5 text-sky-600" /> 保温层</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Armaflex闭孔弹性体 — 最薄9mm</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 卡式机/长管路(&gt;15尺)用13mm</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 防冷凝水滴漏、防能耗损失</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 所有接头缠UV抗性胶带</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 全覆盖 — 无裸露铜管</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><FaBolt className="h-5 w-5 text-sky-600" /> 电气与支架</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 从配电箱拉独立回路 — MCB按匹数选型</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 2.5mm²线（1.0–2.5匹）、4mm²（3.0–5.0匹）</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 室外机隔离开关 — 安全与维修方便</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 重型支架 — 防震、粉末涂层防锈</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 线槽保护 — 整洁、可刷漆</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brand Expertise */}
      <section className="py-20 sm:py-28 bg-white" id="brands">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow()}>品牌安装专长</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>我们安装全部 </span><span className={title({ size: "sm", color: "brand" })}>20大主流品牌</span></h2>
              <p className="mt-4 text-slate-600 font-medium">从大金变频多联分体系统到美的变频挂机 — 技师熟知每个品牌的特性、扭矩规格、调试流程。</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {BRANDS.map((brand) => (
                <a key={brand} href={`/zh/brands/${brand.toLowerCase()}/installation`} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center hover:border-sky-300 hover:shadow-md transition-all group">
                  <p className="font-black text-slate-900 group-hover:text-sky-600 transition-colors">{brand}</p>
                  <p className="text-xs text-slate-500 mt-1">专业安装</p>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Warranty & Trust Signals */}
      <section className="py-20 sm:py-28 bg-sky-600 text-white" id="warranty">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-100 mb-4">我们的承诺</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">书面1个月工艺保修</h2>
              <p className="mt-4 text-sky-100 font-medium">非口头、非暗示。签署清单的工单 — 您专业安装的铁证。</p>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal delay={100}>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">1</div>
                <h3 className="font-black text-lg mb-2">个月工艺保修</h3>
                <p className="text-sky-100 text-sm">任何安装相关问题 — 漏水、振动、电气、制冷 — 免费返修。</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">3</div>
                <h3 className="font-black text-lg mb-2">个月零件保修</h3>
                <p className="text-sky-100 text-sm">我们供应的任何组件（支架、管路、电线、配件）保修3个月。</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">✓</div>
                <h3 className="font-black text-lg mb-2">厂家保修受保护</h3>
                <p className="text-sky-100 text-sm">工单证明专业安装 — 您的5年压缩机保修继续有效。</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div className="mt-12 text-center">
              <h3 className="font-black text-xl mb-4">动钻前价格已确认 — 承诺兑现</h3>
              <p className="text-sky-100 mb-6 max-w-2xl mx-auto">无隐形收费。无"顺便"惊喜。每项额外材料现场报价、经您批准后才动钻开槽。</p>
              <a href={waLink("🔧 安装报价申请\n\n你好KL Renovator，我要确认冷气安装价格。\n\n📍 区域：\n❄️ 机型：\n📏 匹数：\n🏠 物业类型：\n\n请发完整明细。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> WhatsApp获取确认报价
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CRO Module — Installation Page Conversion Optimization */}
      <InstallationCROModule 
        title="为何选择 KL Renovator 安装？"
        subtitle="专业冷气安装RM199起 — 当天服务，全品牌，1个月工艺保修。"
        showObjectionHandling={true}
        showTrustSignals={true}
        showPricingGuarantee={true}
        showUSPBlock={true}
      />

      {/* Installation Trust Signals — INS-17 */}
      <InstallationTrustSignals variant="default" />

      {/* FAQ Section */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>常见问题</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>安装疑问 </span><span className={title({ size: "sm", color: "brand" })}>诚实作答</span></h2>
            </div>
          </Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 50}>
                <FAQItem {...faq} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">准备好专业安装了吗？</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">吉隆坡 & 雪兰莪全域当天有位。RM199起透明报价。1个月工艺保修。20大品牌全装。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🔧 冷气安装预约\n\n你好KL Renovator，我要预约安装。\n\n📍 我的区域：\n❄️ 机型：挂壁式 / 天花板卡式机 / 窗式机\n📏 匹数：\n🏠 物业：公寓 / 排屋 / 办公室\n\n心仪日期：\n\n请确认报价与时段。")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> WhatsApp预约
              </a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FiPhone className="h-4 w-4" /> 致电 +60 18-298 3573
              </a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">服务全吉隆坡 & 雪兰莪 — 八打灵再也、蕉赖、安邦、梳邦再也、蒲种、莎阿南、白沙罗、巴生、加影、孟沙、满家乐、武吉洞、布城、赛城等。</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}