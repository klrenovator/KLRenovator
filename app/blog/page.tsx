"use client";

import Image from "next/image";

import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiClock, FiTag, FiArrowRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { allPosts, type BlogPost } from "@/config/blog-posts";

type Lang = "en" | "ms" | "zh";

// Every post in config/blog-posts.ts already carries its own title/excerpt/
// category translations (titleMS, titleZH, excerptMS, excerptZH, categoryMS,
// categoryZH) for all 20 posts — this just picks the right field for the
// active language instead of a separate, hand-maintained translation table
// that previously only covered 9 of the 20 posts (and had a typo breaking
// one of those 9), silently showing English on /ms/blog and /zh/blog for
// most posts.
function localized(post: BlogPost, lang: Lang) {
  return {
    title: lang === "ms" ? post.titleMS : lang === "zh" ? post.titleZH : post.title,
    excerpt: lang === "ms" ? post.excerptMS : lang === "zh" ? post.excerptZH : post.excerpt,
    category: lang === "ms" ? post.categoryMS : lang === "zh" ? post.categoryZH : post.category,
  };
}

const UI = {
  en: {
    eyebrow: "Knowledge Base",
    h1a: "Aircond Tips & ",
    h1b: "Expert Guides",
    sub: "Practical aircond advice from KL Renovator — Malaysia's trusted HVAC specialist across KL & Selangor.",
    allArticles: "All Articles",
    moreA: "More ",
    moreB: "Guides & Tips",
    featured: "Featured Article",
    readFull: "Read Full Guide",
    minRead: "min read",
    min: "min",
    ctaTitle: "Need expert help with your aircon?",
    ctaSub: "Talk to our team on WhatsApp — quick answers and same-day service across KL & Selangor.",
    ctaBtn: "Chat with Us on WhatsApp",
  },
  ms: {
    eyebrow: "Pusat Pengetahuan",
    h1a: "Tip Aircond & ",
    h1b: "Panduan Pakar",
    sub: "Nasihat aircond praktikal daripada KL Renovator — pakar HVAC dipercayai Malaysia di seluruh KL & Selangor.",
    allArticles: "Semua Artikel",
    moreA: "Lebih ",
    moreB: "Panduan & Tip",
    featured: "Artikel Pilihan",
    readFull: "Baca Panduan Penuh",
    minRead: "min bacaan",
    min: "min",
    ctaTitle: "Perlukan bantuan pakar untuk aircond anda?",
    ctaSub: "Hubungi pasukan kami di WhatsApp — jawapan pantas dan servis hari sama di seluruh KL & Selangor.",
    ctaBtn: "Chat di WhatsApp",
  },
  zh: {
    eyebrow: "知识库",
    h1a: "冷气小贴士及",
    h1b: "专家指南",
    sub: "来自KL Renovator的实用冷气建议——马来西亚值得信赖的HVAC专家，服务范围覆盖吉隆坡及雪兰莪。",
    allArticles: "所有文章",
    moreA: "更多",
    moreB: "指南与贴士",
    featured: "精选文章",
    readFull: "阅读完整指南",
    minRead: "分钟阅读",
    min: "分钟",
    ctaTitle: "需要专业的冷气帮助吗？",
    ctaSub: "通过WhatsApp联系我们的团队——快速解答，吉隆坡及雪兰莪全境当天服务。",
    ctaBtn: "WhatsApp联系我们",
  },
};

export default function BlogPage({ initialLang = "en" }: { initialLang?: Lang }) {
  const lang = initialLang;
  const ui = UI[lang];

  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  const featuredT = featured ? localized(featured, lang) : null;

  return (
    <>
      {/* Hero — White */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/aircond-chemical-overhaul-ampang-selangor.webp"
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
              {ui.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              {ui.h1a}<span className="text-sky-500">{ui.h1b}</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-500 font-medium">
              {ui.sub}
            </p>
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
                      <FiClock className="h-3 w-3" /> {featured.readTime} {ui.minRead}
                    </span>
                    <span>{featured.date}</span>
                  </div>
                </div>
                <div className="bg-sky-600 p-8 sm:p-12 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-sky-200 mb-2">{ui.featured}</p>
                    <p className="text-white font-black text-lg uppercase">{ui.readFull}</p>
                  </div>
                  <FiArrowRight className="h-8 w-8 text-white group-hover:translate-x-2 transition-transform" />
                </div>
              </NextLink>
            </Reveal>
          )}

          <div className="mb-10">
            <Reveal>
              <p className={eyebrow()}>{ui.allArticles}</p>
              <h2 className="mt-2">
                <span className={title({ size: "sm" })}>{ui.moreA}</span>
                <span className={title({ size: "sm", color: "brand" })}>{ui.moreB}</span>
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
                          <FiClock className="h-3 w-3" /> {post.readTime} {ui.min}
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
                {ui.ctaTitle}
              </h3>
              <p className="mt-2 text-sky-100 font-medium">
                {ui.ctaSub}
              </p>
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-6 bg-[#25D366] hover:bg-[#1ebe5d] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" /> {ui.ctaBtn}
              </a>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
