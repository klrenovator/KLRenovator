// Server component — this page has no state, effects or event handlers.
// It was marked "use client", which pulled the shared UI/config chunk into
// the browser for all three locale variants.

import Image from "next/image";
import { FaWhatsapp, FaCheck } from "react-icons/fa6";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { title, eyebrow } from "@/components/primitives";
import { sitePublic } from "@/config/site-public";
import { waLink, rfqMsg } from "@/lib/whatsapp";

function StaticPriceTable({
  serviceTitle,
  tableTitle,
  rows,
  note,
  slug,
}: {
  serviceTitle: string;
  tableTitle: string;
  rows: { label: string; price: string }[];
  note?: string;
  slug?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full flex items-center justify-between px-6 py-5 bg-slate-50">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">
            {tableTitle}
          </p>
          <p className="text-base font-black text-slate-900 leading-snug">{serviceTitle}</p>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <ul className="divide-y divide-slate-50">
          {rows.map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between gap-4 px-6 py-3.5 hover:bg-sky-50/40 transition-colors"
            >
              <span className="text-sm text-slate-600 font-medium">{row.label}</span>
              <span className="text-sm font-black text-sky-700 whitespace-nowrap bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                {row.price}
              </span>
            </li>
          ))}
        </ul>

        {note && (
          <div className="border-t border-slate-100 bg-emerald-50 px-6 py-3">
            <p className="text-xs text-emerald-700 font-bold flex items-center gap-2">
              <FaCheck className="h-3 w-3 shrink-0" />
              {note}
            </p>
          </div>
        )}

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex flex-wrap items-center gap-3">
          {slug && (
            <Link
              href={`/zh/services/${slug}`}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-sky-600 transition-colors"
            >
              查看完整服务详情
              <FaArrowRight className="h-3 w-3" />
            </Link>
          )}
          <a
            href={waLink(`Hi KL Renovator, I want to enquire about: ${serviceTitle}`)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all ml-auto"
          >
            <FaWhatsapp className="h-3.5 w-3.5" />
            预约此项服务
          </a>
        </div>
      </div>
    </div>
  );
}

const SVC: Record<string, { title: string; short: string }> = {
  "emergency": {
    title: "紧急冷气维修",
    short: "为吉隆坡及雪兰莪地区提供当天紧急响应，处理冷气完全故障、严重漏水、室外机损坏及紧急维修。",
  },
  "installation": {
    title: "全新安装",
    short: "专业的住宅及商业冷气安装，线路整齐。所有品牌及匹数均可当天安装。",
  },
  "basic-servicing": {
    title: "基础保养 / 定期维护",
    short: "定期标准冷气滤网清洗及多点检测，保持最佳能效并延长使用寿命。",
  },
  "chemical-wash": {
    title: "压力化学清洗",
    short: "高压深层化学清洗，去除顽固霉菌、灰尘和细菌，显著改善制冷气流与空气质量。",
  },
  "chemical-overhaul": {
    title: "化学大修",
    short: "完全拆卸室内机进行最深层清洁。永久解决严重漏水、结冰及严重堵塞。",
  },
  "gas-topup": {
    title: "冷媒充注 / 精准平衡",
    short: "为环保 R32、R410A 及传统 R22 系统进行精准冷媒平衡与压力补充，包含检漏。",
  },
  "repair": {
    title: "故障排除与维修",
    short: "专业诊断并更换故障冷气零件 —— 电容、风扇电机、传感器线圈、PCB 主板或铜线。开工前先报价。",
  },
  "dismantling-relocation": {
    title: "拆卸与搬迁",
    short: "安全无风险地拆卸现有室内/室外机，正确回收并密封冷媒。在新位置完整重新安装。",
  },
  "ceiling-cassette": {
    title: "天花板卡式机方案",
    short: "为重型企业天花板卡式机提供服务、化学清洗、安装及定期维护，适用于公司及零售场所。",
  },
};

const MATERIAL_ROWS = [
  { label: "铜管 1.0 – 1.5 HP", price: "RM 17/尺" },
  { label: "铜管 2.0 – 2.5 HP", price: "RM 23/尺" },
  { label: "铜管 3.0 – 3.5 HP", price: "RM 27/尺" },
  { label: "电线", price: "RM 9/尺" },
  { label: "标准室外机支架", price: "RM 45" },
  { label: "室内通用支架", price: "RM 35" },
  { label: "PVC 线槽/铜管护套", price: "RM 6 – 12/尺" },
  { label: "电源插座安装", price: "RM 100" },
  { label: "墙体开槽与隐藏工程", price: "RM 6/尺" },
  { label: "高层/难以到达附加费", price: "RM 50 – 150" },
  { label: "标准金属线槽", price: "RM 15/尺" },
];

const CONTRACT_ROWS = [
  { label: "住宅套餐 · 2 – 4 台 / 年合约", price: "RM 499" },
  { label: "住宅套餐 · 5+ 台 / 年合约", price: "RM 999" },
  { label: "商业套餐 · 5 – 10 台 / 年合约", price: "RM 1,999" },
  { label: "商业套餐 · 10+ 台 / 年合约", price: "RM 3,499" },
];

const VOLUME_DISCOUNTS = [
  { units: "4 – 10 台", off: "5% OFF 即时预订折扣 (5% OFF Instant Booking Discount)" },
  { units: "10+ 台", off: "10% OFF 即时预订折扣 (10% OFF Instant Booking Discount)" },
];

export default function ServicesPageZH() {
  return (
    <>
      {/* Page Header — White */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/aircond-installation-kuala-lumpur.webp"
            alt="KL Renovator 专业冷气服务吉隆坡"
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-4">
              我们的方案
            </p>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              冷气服务与<span className="text-sky-500">价格表</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-500 font-medium">
              价格透明 —— 绝无隐藏费用。点击下方任何服务查看完整明细。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
              {["无隐藏费用", "当天可预约", "覆盖所有品牌", "1个月工艺保修"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 font-bold uppercase tracking-wider rounded-full"
                >
                  <FaCheck className="h-2.5 w-2.5 text-sky-500" /> {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>按服务浏览</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>我们的全部</span>
                <span className={title({ size: "sm", color: "brand" })}>HVAC 服务</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sitePublic.services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 40}>
                <Link
                  href={`/zh/services/${service.slug}`}
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-sky-100 transition-all duration-300"
                >
                  <div className="inline-flex p-2.5 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4 w-fit group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-black text-slate-900 text-sm leading-snug mb-2">{SVC[service.slug]?.title ?? service.title}</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed flex-grow">{SVC[service.slug]?.short ?? service.short}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sky-600 text-xs font-black uppercase tracking-wider">
                    查看详情 <FaArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & AMC — Always Visible */}
      <section id="materials" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal>
              <p className={eyebrow()}>透明材料费用</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>材料价格与</span>
                <span className={title({ size: "sm", color: "brand" })}>特殊收费</span>
              </h2>
              <p className="mt-4 text-slate-500 font-medium">
                所有材料费用会在开工前与您确认报价。绝无意外。
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            <Reveal>
              <StaticPriceTable
                serviceTitle="额外材料与特殊收费"
                tableTitle="材料价格"
                rows={MATERIAL_ROWS}
              />
            </Reveal>
            <Reveal delay={50}>
              <StaticPriceTable
                serviceTitle="年度企业与住宅维护合约"
                tableTitle="年度维护套餐 (AMC)"
                rows={CONTRACT_ROWS}
              />
            </Reveal>
          </div>

          {/* Volume Discounts */}
          <Reveal>
            <div className="mt-8 bg-sky-600 text-white rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-sky-100 mb-5 flex items-center gap-2">
                🎯 批量预订折扣
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {VOLUME_DISCOUNTS.map((d) => (
                  <div key={d.units} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                    <p className="text-xl font-black text-white">{d.units}</p>
                    <p className="text-xs font-bold text-sky-200 uppercase tracking-wider mt-1">{d.off}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-sky-200 font-medium">
                * 折扣适用于人工费用。请通过 WhatsApp 联系我们确认。
              </p>
            </div>
          </Reveal>

          {/* Quote CTA */}
          <Reveal>
            <div className="mt-10 bg-[#0284c7] text-white p-8 sm:p-12 text-center rounded-2xl">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                不确定您需要什么？
              </h2>
              <p className="mt-3 text-sky-100 font-medium max-w-xl mx-auto">
                通过 WhatsApp 发送您的机器照片 —— 我们将在 30 分钟内为您提供准确报价。
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={waLink(rfqMsg)}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
                >
                  <FaWhatsapp className="h-5 w-5" /> 通过 WhatsApp 免费获取报价
                </a>
                <a
                  href={`tel:${sitePublic.phone}`}
                  className="inline-flex items-center gap-2.5 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
                >
                  致电 {sitePublic.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CoverageAreas />
      <ReadyToBook />
    </>
  );
}
