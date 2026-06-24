"use client";

import Image from "next/image";

import { useState } from "react";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiClock, FiTag, FiArrowRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { allPosts, type BlogPost } from "@/config/blog-posts";

type Lang = "en" | "ms" | "zh";

const LANG_LABELS: Record<Lang, string> = {
  en: "🇬🇧 English",
  ms: "🇲🇾 Bahasa Malaysia",
  zh: "🇨🇳 中文",
};

// Every post in config/blog-posts.ts already carries its own title/excerpt/
// category translations (titleMS, titleZH, excerptMS, excerptZH, categoryMS,
// categoryZH) — this just picks the right field for the active language
// instead of relying on a separate, hand-maintained translation table that
// previously only covered 9 of the 20 real posts (and had a typo breaking
// one of those 9), silently showing English on the /ms/blog and /zh/blog
// pages for most posts.
function localized(post: BlogPost, lang: Lang) {
  return {
    title: lang === "ms" ? post.titleMS : lang === "zh" ? post.titleZH : post.title,
    excerpt: lang === "ms" ? post.excerptMS : lang === "zh" ? post.excerptZH : post.excerpt,
    category: lang === "ms" ? post.categoryMS : lang === "zh" ? post.categoryZH : post.category,
  };
}

export default function BlogPage() {
  const [lang, setLang] = useState<Lang>("en");

  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  const featuredT = featured ? localized(featured, lang) : null;

  return (
    <>
      {/* Hero — White */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/aircond-chemical-overhaul-ampang-selangor.jpg"
            alt="KL Renovator aircond tips and guides Kuala Lumpur"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60" />
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

      {/* Trust Signal Strip — full-bleed dark bar, not nested inside the content container */}
      <section className="bg-slate-900 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-1.5 text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 20 Expert Guides</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Pricing Guides Updated 2026</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Troubleshooting Guides</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Buying Guides</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> EN · BM · ZH</span>
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
                      <FiTag className="h-2.5 w-2.5" /> {featuredT?.category ?? featured.category}
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
              const t = localized(post, lang);
              return (
                <Reveal key={post.slug} delay={i * 50}>
                  <NextLink href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-300 overflow-hidden h-full rounded-2xl">
                    <div className="h-2 bg-gradient-to-r from-sky-600 to-sky-500 group-hover:from-sky-500 group-hover:to-sky-400 transition-all" />
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5 mb-3 self-start rounded-full">
                        <FiTag className="h-2.5 w-2.5" /> {t.category}
                      </span>
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-sky-700 transition-colors">
                        {t.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed flex-grow line-clamp-3">
                        {t.excerpt}
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

          {/* Emergency Quick Links — problem cluster hub */}
          <Reveal>
            <div className="mt-14 bg-red-50 border border-red-100 rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">🚨 Emergency Resources</p>
              <h2 className="text-lg font-black text-slate-900 mb-4">
                Aircond Problem? Start Here
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  { label: "Aircond Not Cold", slug: "aircond-not-cold-reasons" },
                  { label: "Water Leaking", slug: "aircond-water-leaking-causes" },
                  { label: "Not Turning On", slug: "aircond-troubleshooting-guide-malaysia" },
                  { label: "Bad Smell", slug: "signs-your-aircond-needs-chemical-overhaul-malaysia" },
                  { label: "Freezing Up", slug: "aircond-not-cold-reasons" },
                  { label: "High Bill", slug: "how-to-reduce-aircond-electricity-bill-malaysia" },
                  { label: "Gas Top-Up Guide", slug: "r32-r410a-r22-gas-difference" },
                  { label: "Wash vs Overhaul?", slug: "chemical-wash-vs-chemical-overhaul" },
                ].map((item) => (
                  <NextLink
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="flex items-center gap-1.5 bg-white border border-red-100 hover:border-red-300 hover:bg-red-50 text-slate-700 hover:text-red-700 text-xs font-bold px-3 py-2.5 rounded-xl transition-all"
                  >
                    <FiArrowRight className="h-3 w-3 text-red-400 shrink-0" />
                    {item.label}
                  </NextLink>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <NextLink href="/problems" className="text-xs font-black text-red-600 hover:text-red-800 transition">
                  All Aircond Problems →
                </NextLink>
                <NextLink href="/services/emergency" className="text-xs font-black text-red-600 hover:text-red-800 transition">
                  Emergency Service →
                </NextLink>
              </div>
            </div>
          </Reveal>

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
