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

const TRANSLATED_EXCERPTS: Record<string, Record<Lang, { title: string; excerpt: string }>> = {
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
  "how-often-service-aircond": {
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
              Practical aircond advice from KL Renovator — Malaysia&apos;s trusted HVAC specialist.
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

          <Reveal>
            <div className="mt-16 bg-sky-600 text-white p-8 sm:p-12 text-center rounded-2xl">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Need expert help with your aircon?
              </h3>
              <p className="mt-2 text-sky-100 font-medium">
                Talk to our team on WhatsApp — quick answers and same-day service.
              </p>
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-6 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
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
