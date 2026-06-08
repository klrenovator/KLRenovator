"use client";

import { useState } from "react";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiClock, FiTag, FiArrowRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { allPosts } from "@/config/blog-posts";

type Lang = "en" | "ms" | "zh";

const LANG_LABELS: Record<Lang, string> = {
  en: "🇬🇧 English",
  ms: "🇲🇾 Bahasa Malaysia",
  zh: "🇨🇳 中文",
};

// ── ALL BLOGS — Full Trilingual Translations ──────────────────────────────────
const TRANSLATED_EXCERPTS: Record<string, Record<Lang, { title: string; excerpt: string }>> = {

  "aircon-service-batu-caves-selayang-2026": {
    en: {
      title: "Aircon Service in Batu Caves & Selayang 2026 — Fast Response by KL Renovator",
      excerpt: "Looking for reliable aircond service in Batu Caves or Selayang? KL Renovator dispatches trained HVAC technicians same-day across Batu Caves, Selayang, Kepong and surrounding areas.",
    },
    ms: {
      title: "Servis Aircond Batu Caves & Selayang 2026 — Tindak Balas Pantas KL Renovator",
      excerpt: "Cari servis aircond yang boleh dipercayai di Batu Caves atau Selayang? KL Renovator menghantar juruteknik HVAC terlatih pada hari yang sama merentasi Batu Caves, Selayang, Kepong dan kawasan sekitar.",
    },
    zh: {
      title: "2026年白沙罗及士拉央冷气服务 — KL Renovator 快速响应",
      excerpt: "寻找白沙罗或士拉央可靠的冷气服务？KL Renovator 在白沙罗、士拉央、甲洞及周边地区提供当天派遣专业技术员服务。",
    },
  },

  "aircon-chemical-wash-price-malaysia-2026": {
    en: {
      title: "Aircond Chemical Wash Price Malaysia 2026 — Complete Breakdown",
      excerpt: "How much does a chemical wash cost in Malaysia in 2026? Full price breakdown for wall-mounted, ceiling cassette and window units — from RM 120.",
    },
    ms: {
      title: "Harga Cuci Kimia Aircond Malaysia 2026 — Senarai Lengkap",
      excerpt: "Berapa harga cuci kimia di Malaysia pada 2026? Senarai harga lengkap untuk unit dinding, ceiling cassette dan unit tingkap — bermula dari RM 120.",
    },
    zh: {
      title: "2026年马来西亚冷气化学清洗价格 — 完整分类",
      excerpt: "2026年马来西亚化学清洗费用是多少？壁挂式、天花板卡式和窗式冷气的完整价格分类——从RM 120起。",
    },
  },

  "signs-your-aircon-needs-chemical-overhaul-malaysia": {
    en: {
      title: "5 Signs Your Aircond Needs a Chemical Overhaul in Malaysia",
      excerpt: "Water leaking, ice forming, bad smell after a wash? Your aircond might need a chemical overhaul — not just a basic clean. Learn the 5 key signs.",
    },
    ms: {
      title: "5 Tanda Aircond Anda Perlukan Chemical Overhaul di Malaysia",
      excerpt: "Kebocoran air, pembentukan ais, bau busuk selepas cuci? Aircond anda mungkin perlu overhaul kimia — bukan sekadar cuci biasa. Ketahui 5 tanda utama.",
    },
    zh: {
      title: "5个迹象表明您的冷气需要化学大修",
      excerpt: "漏水、结冰、清洗后仍有异味？您的冷气可能需要化学大修，而不仅仅是基本清洁。了解5个关键迹象。",
    },
  },

  "chemical-wash-vs-chemical-overhaul": {
    en: {
      title: "Chemical Wash vs Chemical Overhaul — What's the Difference?",
      excerpt: "Not sure whether your aircond needs a chemical wash or a full overhaul? This guide explains both services and when to choose each one.",
    },
    ms: {
      title: "Cuci Kimia vs Overhaul Kimia — Apa Bezanya?",
      excerpt: "Tidak pasti sama ada aircond anda perlukan cuci kimia atau overhaul penuh? Panduan ini menerangkan kedua-dua perkhidmatan dan bila memilihnya.",
    },
    zh: {
      title: "化学清洗 vs 化学大修 — 有什么区别？",
      excerpt: "不确定您的空调需要化学清洗还是全面大修？本指南解释两种服务的区别及何时选择。",
    },
  },

  "aircon-not-cold-reasons": {
    en: {
      title: "Aircon Running But Not Cold? 7 Common Causes in Malaysia",
      excerpt: "Your aircond is switched on but the room is still warm. Here are the 7 most common reasons why — and what to do about each one.",
    },
    ms: {
      title: "Aircond Hidup Tapi Tidak Sejuk? 7 Sebab Biasa di Malaysia",
      excerpt: "Aircond anda dihidupkan tetapi bilik masih panas. Inilah 7 sebab paling biasa dan cara mengatasinya.",
    },
    zh: {
      title: "空调开着但不冷？马来西亚7个常见原因",
      excerpt: "空调开了但房间还是热？这里有7个最常见的原因以及每个问题的解决方法。",
    },
  },

  "how-often-service-aircond-malaysia": {
    en: {
      title: "How Often Should You Service Your Aircond in Malaysia?",
      excerpt: "Discover the recommended aircond servicing frequency based on your usage patterns, unit type, and Malaysia's tropical climate.",
    },
    ms: {
      title: "Seberapa Kerap Anda Perlu Servis Aircond di Malaysia?",
      excerpt: "Ketahui frekuensi servis aircond yang disyorkan berdasarkan corak penggunaan, jenis unit, dan iklim tropika Malaysia.",
    },
    zh: {
      title: "在马来西亚多久保养一次空调？",
      excerpt: "根据您的使用习惯、机型和马来西亚热带气候，了解建议的空调保养频率。",
    },
  },

  "r32-r410a-r22-gas-difference": {
    en: {
      title: "R32 vs R410A vs R22 — Which Gas Does Your Aircond Use?",
      excerpt: "Confused about refrigerant gas types? This guide explains the difference between R22, R410A and R32 — and how to check which one your unit uses.",
    },
    ms: {
      title: "R32 vs R410A vs R22 — Gas Mana yang Aircond Anda Guna?",
      excerpt: "Keliru tentang jenis gas penyejuk? Panduan ini menerangkan perbezaan antara R22, R410A dan R32 — dan cara mengetahui yang mana digunakan oleh unit anda.",
    },
    zh: {
      title: "R32 vs R410A vs R22 — 您的冷气使用哪种冷媒？",
      excerpt: "对冷媒类型感到困惑？本指南解释R22、R410A和R32之间的区别，以及如何检查您的机器使用哪种冷媒。",
    },
  },

  "aircond-water-leaking-causes": {
    en: {
      title: "Aircond Leaking Water? Here Are the Most Common Causes & Fixes",
      excerpt: "Water dripping from your indoor unit? Don't ignore it. This guide covers the most common causes of aircond water leaks and how to fix each one.",
    },
    ms: {
      title: "Aircond Bocor Air? Inilah Sebab Paling Biasa & Cara Membaikinya",
      excerpt: "Air menitis dari unit dalaman anda? Jangan abaikan. Panduan ini merangkumi sebab paling biasa kebocoran air aircond dan cara membaikinya.",
    },
    zh: {
      title: "冷气漏水？这些是最常见的原因和解决方法",
      excerpt: "室内机滴水？不要忽视。本指南涵盖冷气漏水最常见的原因及每种情况的解决方法。",
    },
  },

  "best-aircond-brands-malaysia-2025": {
    en: {
      title: "Best Aircond Brands in Malaysia 2025 — Daikin, Panasonic, Mitsubishi Compared",
      excerpt: "Which aircond brand is best for Malaysian homes? We compare Daikin, Panasonic, Mitsubishi, Midea, York and more — from energy rating to after-sales service.",
    },
    ms: {
      title: "Jenama Aircond Terbaik di Malaysia 2025 — Perbandingan Daikin, Panasonic, Mitsubishi",
      excerpt: "Jenama aircond mana yang terbaik untuk rumah Malaysia? Kami membandingkan Daikin, Panasonic, Mitsubishi, Midea, York dan lain-lain — dari penilaian tenaga hingga servis selepas jualan.",
    },
    zh: {
      title: "2025年马来西亚最佳冷气品牌 — 大金、松下、三菱比较",
      excerpt: "哪个冷气品牌最适合马来西亚家庭？我们比较大金、松下、三菱、美的、约克等品牌——从能源评级到售后服务。",
    },
  },
};

function getTranslated(slug: string, lang: Lang) {
  return TRANSLATED_EXCERPTS[slug]?.[lang] ?? null;
}

export default function BlogPage() {
  const [lang, setLang] = useState<Lang>("en");

  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  const featuredT = featured ? getTranslated(featured.slug, lang) : null;

  return (
    <>
      {/* Hero — White */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,165,233,0.04),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
              Knowledge Base
            </p>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              Aircond Tips &amp; <span className="text-sky-500">Expert Guides</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-500 font-medium">
              Practical aircond advice from KL Renovator — Malaysia&apos;s trusted HVAC specialist across KL &amp; Selangor.
            </p>

            {/* Language Toggle */}
            <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1">Read in:</span>
              {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 ${
                    lang === l
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Featured Post */}
          {featured && (
            <Reveal>
              <NextLink href={`/blog/${featured.slug}`}
                className="group grid lg:grid-cols-2 bg-white border border-slate-200 hover:border-sky-400 transition-all duration-300 overflow-hidden mb-12 shadow-sm hover:shadow-lg rounded-2xl">
                <div className="bg-slate-50 p-8 sm:p-12 flex flex-col justify-between min-h-[280px] border-r border-slate-100">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-sky-600 border border-sky-200 bg-sky-50 px-2.5 py-1 mb-4 rounded-full">
                      <FiTag className="h-2.5 w-2.5" /> {featured.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight group-hover:text-sky-600 transition-colors">
                      {featuredT?.title ?? featured.title}
                    </h2>
                    <p className="mt-3 text-slate-500 font-medium text-sm leading-relaxed">
                      {featuredT?.excerpt ?? featured.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-6 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <FiClock className="h-3 w-3" /> {featured.readTime} min read
                    </span>
                    <span>{featured.date}</span>
                  </div>
                </div>
                <div className="bg-sky-600 p-8 sm:p-12 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-sky-200 mb-2">Featured Article</p>
                    <p className="text-white font-black text-lg uppercase">Read Full Guide</p>
                  </div>
                  <FiArrowRight className="h-8 w-8 text-white group-hover:translate-x-2 transition-transform" />
                </div>
              </NextLink>
            </Reveal>
          )}

          <div className="mb-10">
            <Reveal>
              <p className={eyebrow()}>All Articles</p>
              <h2 className="mt-2">
                <span className={title({ size: "sm" })}>More </span>
                <span className={title({ size: "sm", color: "brand" })}>Guides & Tips</span>
              </h2>
            </Reveal>
          </div>

          {/* All Posts Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => {
              const t = getTranslated(post.slug, lang);
              return (
                <Reveal key={post.slug} delay={i * 50}>
                  <NextLink href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-300 overflow-hidden h-full rounded-2xl">
                    <div className="h-2 bg-gradient-to-r from-sky-600 to-sky-500 group-hover:from-sky-500 group-hover:to-sky-400 transition-all" />
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5 mb-3 self-start rounded-full">
                        <FiTag className="h-2.5 w-2.5" /> {post.category}
                      </span>
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-sky-700 transition-colors">
                        {t?.title ?? post.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed flex-grow line-clamp-3">
                        {t?.excerpt ?? post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                        <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                          <FiClock className="h-3 w-3" /> {post.readTime} min
                        </span>
                        <span className="text-[11px] text-slate-400 font-bold">{post.date}</span>
                      </div>
                    </div>
                  </NextLink>
                </Reveal>
              );
            })}
          </div>

          {/* CTA */}
          <Reveal>
            <div className="mt-16 bg-sky-600 text-white p-8 sm:p-12 text-center rounded-2xl">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Need expert help with your aircon?
              </h3>
              <p className="mt-2 text-sky-100 font-medium">
                Talk to our team on WhatsApp — quick answers and same-day service across KL &amp; Selangor.
              </p>
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-6 bg-[#25D366] hover:bg-[#1ebe5d] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" /> Chat with Us on WhatsApp
              </a>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
