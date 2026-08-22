import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import Image from "next/image";
import NextLink from "next/link";
import {
  FaWhatsapp, FaPhone, FaEnvelope, FaRegClock, FaLocationDot,
} from "react-icons/fa6";
import { FiCheck, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { BookingSupportInfo } from "@/components/booking-support-info";
import { GoogleReviewWidget } from "@/components/google-review-widget";
import { GoogleMapCard } from "@/components/google-map-card";

export const metadata: Metadata = {
  title: clampMetaTitle("联系 KL Renovator | 吉隆坡及雪兰莪冷气服务"),
  description:
    padMetaDescription("联系 KL Renovator，获取吉隆坡及雪兰莪的冷气服务。WhatsApp +60182983573 获取当天报价。价格透明，响应迅速。"),
  alternates: {
    canonical: "https://www.klrenovator.com/zh/contact",
    languages: {
      "en-MY": "https://www.klrenovator.com/contact",
      "ms-MY": "https://www.klrenovator.com/ms/contact",
      "zh-MY": "https://www.klrenovator.com/zh/contact",
      "x-default": "https://www.klrenovator.com/contact",
    },
  },
  openGraph: {
    title: clampMetaTitle("联系 KL Renovator | 吉隆坡及雪兰莪冷气服务"),
    description:
      "最快响应 via WhatsApp — 30 分钟内回复。吉隆坡及雪兰莪当天冷气服务。化学清洗从 RM 120 起。",
    url: "https://www.klrenovator.com/zh/contact",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      { url: "https://www.klrenovator.com/hero/aircond-pcb-board-replacement-kl.webp", width: 1200, height: 630, alt: "联系 KL Renovator — 吉隆坡及雪兰莪冷气服务" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("联系 KL Renovator | 吉隆坡及雪兰莪冷气服务"),
    description: "最快响应 via WhatsApp — 吉隆坡及雪兰莪当天冷气服务。化学清洗从 RM 120 起。",
    images: ["https://www.klrenovator.com/hero/aircond-pcb-board-replacement-kl.webp"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "联系我们", item: "https://www.klrenovator.com/zh/contact" },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.klrenovator.com/zh/contact#contactpage",
  name: "联系 KL Renovator — 吉隆坡及雪兰莪冷气服务",
  description:
    padMetaDescription("联系 KL Renovator，获取吉隆坡及雪兰莪的专业冷气服务。提供当天服务。WhatsApp +60182983573。"),
  url: "https://www.klrenovator.com/zh/contact",
  mainEntity: {
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: "KL Renovator",
    legalName: "Multicore Dynamics Resources",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: "https://www.klrenovator.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressStreet,
      addressLocality: siteConfig.addressCity,
      postalCode: siteConfig.addressPostal,
      addressRegion: siteConfig.addressState,
      addressCountry: siteConfig.addressCountry,
    },
    geo: { "@type": "GeoCoordinates", latitude: siteConfig.geoLat, longitude: siteConfig.geoLng },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "18:00" },
    ],
    hasMap: siteConfig.links.googleMaps,
    priceRange: "RM88 – RM2000",
  },
};

const SERVICES_QUICK = [
  "压力化学清洗",
  "化学大修",
  "冷媒充注（R22 / R410A / R32）",
  "故障排除与维修",
  "全新安装",
  "天花板卡式机服务",
  "拆卸与搬迁",
  "年度维护合约",
];

const WHATSAPP_MESSAGES = [
  { label: "普通报价", text: "您好 KL Renovator，我想咨询冷气服务的报价。" },
  { label: "化学清洗", text: "您好 KL Renovator，我需要为我的冷气做化学清洗。可以告诉我价格和时间吗？" },
  { label: "冷气不冷", text: "您好 KL Renovator，我的冷气在运行但不制冷。可以帮忙诊断问题吗？" },
  { label: "漏水", text: "您好 KL Renovator，我的冷气在漏水。技术员什么时候可以来检查？" },
  { label: "新安装", text: "您好 KL Renovator，我需要安装新的冷气。可以给我包含人工和材料的报价吗？" },
  { label: "冷媒充注", text: "您好 KL Renovator，我需要为冷气加冷媒。我明白加气费用是根据实际 PSI 计算的。可以告诉我价格吗？" },
];

export default function ContactPageZH() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/zh" className="hover:text-sky-600 transition">首页</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-700 font-medium">联系我们</span>
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/aircond-pcb-board-replacement-kl.webp"
            alt="KL Renovator 技术员在吉隆坡维修冷气"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
              联系我们
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.05] uppercase text-slate-900">
              让您的冷气<br />
              <span className="text-sky-500">恢复最佳状态。</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-600 font-medium leading-relaxed">
              最快的响应方式是通过 WhatsApp — 营业时间内我们会在 30 分钟内回复。吉隆坡及雪兰莪提供当天上门服务。
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* Left: Contact Methods */}
            <Reveal>
              <div>
                <p className={eyebrow()}>联系我们</p>
                <h2 className="mt-3">
                  <span className={title({ size: "sm" })}>与真实技术员 </span>
                  <span className={title({ size: "sm", color: "brand" })}>直接沟通。</span>
                </h2>
                <p className="mt-4 text-slate-600 font-medium">
                  选择最适合您的联系方式 — 我们在所有渠道都快速响应。
                </p>

                <div className="mt-8 space-y-3">
                  <a href={waLink(rfqMsg)} target="_blank" rel="nofollow noopener noreferrer"
                    className="flex items-center gap-4 bg-[#0284c7] hover:bg-[#0369a1] text-white p-5 transition-all group">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#25D366]">
                      <FaWhatsapp className="h-6 w-6 text-white" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] font-black uppercase tracking-wider text-sky-100">
                        最快 · 30 分钟内回复
                      </p>
                      <p className="font-black uppercase tracking-tight text-white text-lg">
                        立即 WhatsApp 我们
                      </p>
                    </div>
                    <span className="text-white font-black text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </a>

                  <a href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-4 border-2 border-slate-200 bg-white p-5 hover:border-sky-500 hover:bg-sky-50 transition-all">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#0284c7] text-white">
                      <FaPhone className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">直接致电</p>
                      <p className="font-black text-slate-950 text-lg">{siteConfig.phoneDisplay}</p>
                    </div>
                  </a>

                  <a href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-4 border-2 border-slate-200 bg-white p-5 hover:border-sky-500 hover:bg-sky-50 transition-all">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#0284c7] text-white">
                      <FaEnvelope className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">电子邮件</p>
                      <p className="font-black text-slate-950 break-all">{siteConfig.email}</p>
                    </div>
                  </a>

                  <div className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FaRegClock className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">营业时间</p>
                      </div>
                      <p className="font-black text-slate-950 text-sm">{siteConfig.hours}</p>
                    </div>
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FaLocationDot className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">服务范围</p>
                      </div>
                      <p className="font-black text-slate-950 text-sm">吉隆坡及雪兰莪（巴生谷）</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-slate-50 border border-slate-200 p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-4">
                    我们的服务范围
                  </p>
                  <ul className="grid grid-cols-1 gap-2">
                    {SERVICES_QUICK.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <FiCheck className="h-4 w-4 text-sky-600 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Right: WhatsApp Quick-Select */}
            <Reveal delay={100}>
              <div className="bg-[#0284c7] text-white p-8 sm:p-10">
                <p className="text-xs font-black uppercase tracking-widest text-sky-100 mb-2">
                  WhatsApp 快速预约
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                  您需要什么服务？
                </h3>
                <p className="text-sky-100 text-sm font-medium mb-8">
                  点击您需要的服务 — 将打开 WhatsApp 并自动填好信息。无需打字。
                </p>
                <div className="grid gap-3">
                  {WHATSAPP_MESSAGES.map((item) => (
                    <a
                      key={item.label}
                      href={`https://wa.me/60182983573?text=${encodeURIComponent(item.text)}`}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="flex items-center justify-between gap-3 bg-white/15 hover:bg-[#25D366] border border-white/20 hover:border-[#25D366] px-5 py-4 text-sm font-black uppercase tracking-wider text-white transition-all group"
                    >
                      <span className="flex items-center gap-3">
                        <FaWhatsapp className="h-4 w-4 text-white shrink-0" />
                        {item.label}
                      </span>
                      <span className="text-sky-100 group-hover:text-white transition-colors">→</span>
                    </a>
                  ))}
                </div>
                <div className="mt-8 border-t border-white/20 pt-6">
                  <p className="text-xs text-sky-100 font-medium text-center">
                    或直接致电我们{" "}
                    <a href={`tel:${siteConfig.phone}`}
                      className="text-white font-black hover:text-sky-200 transition-colors">
                      {siteConfig.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Google reviews widget + keyless Maps embed ── */}
      <section className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className={eyebrow()}>评价与位置</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>谷歌 </span>
                <span className={title({ size: "sm", color: "brand" })}>五星好评。</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium">
                看看巴生谷屋主对我们的评价，或留下您自己的评价。两者都会直接打开 Google。
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
            <GoogleReviewWidget locale="zh" />
            <GoogleMapCard locale="zh" includeSprite={false} />
          </div>
        </div>
      </section>

      <CoverageAreas />
      <BookingSupportInfo locale="zh" />
    </>
  );
}
