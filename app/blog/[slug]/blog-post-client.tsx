"use client";

import NextLink from "next/link";
import { BLOG_SERVICE_MAP } from "@/config/topical-authority-map";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { FiClock, FiTag, FiChevronRight, FiArrowLeft, FiArrowRight, FiMapPin } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { waLink, rfqMsgForService } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { useLang } from "@/context/language-context";
import type { BlogPost } from "@/config/blog-posts";

// ─── UI Labels ────────────────────────────────────────────────────────────────
const UI = {
  en: {
    home: "Home",
    blog: "Blog",
    backToAll: "Back to all articles",
    needService: "Need This Service?",
    bookExpert: "Book an expert now",
    sameDay: "Same-day service available. WhatsApp for instant quote.",
    bookWA: "Book on WhatsApp",
    tags: "Tags",
    ourServices: "Our Services",
    readTime: "min read",
    by: "By KL Renovator Team",
    related: "Related Articles",
    alsoServing: "Also serving:",
    services: [
      { label: "Pressure Chemical Wash", slug: "chemical-wash" },
      { label: "Chemical Overhaul", slug: "chemical-overhaul" },
      { label: "Gas Top-Up", slug: "gas-topup" },
      { label: "Repairs & Troubleshooting", slug: "repair" },
      { label: "New Installation", slug: "installation" },
      { label: "Basic Servicing", slug: "basic-servicing" },
    ],
    coverageNote: "KL · Selangor · Ampang · Batu Caves · Cheras · Petaling Jaya · Subang · Shah Alam · Klang · Kajang · Bangsar · Mont Kiara · Setapak · Kepong",
  },
  ms: {
    home: "Utama",
    blog: "Blog",
    backToAll: "Kembali ke semua artikel",
    needService: "Perlukan Perkhidmatan Ini?",
    bookExpert: "Tempah pakar sekarang",
    sameDay: "Servis hari sama tersedia. WhatsApp untuk sebutan harga segera.",
    bookWA: "Tempah melalui WhatsApp",
    tags: "Tag",
    ourServices: "Perkhidmatan Kami",
    readTime: "min baca",
    by: "Oleh Pasukan KL Renovator",
    related: "Artikel Berkaitan",
    alsoServing: "Juga meliputi:",
    services: [
      { label: "Cuci Kimia Tekanan Tinggi", slug: "chemical-wash" },
      { label: "Overhaul Kimia", slug: "chemical-overhaul" },
      { label: "Tambah Gas", slug: "gas-topup" },
      { label: "Pembaikan & Penyelesaian Masalah", slug: "repair" },
      { label: "Pemasangan Baru", slug: "installation" },
      { label: "Servis Asas", slug: "basic-servicing" },
    ],
    coverageNote: "KL · Selangor · Ampang · Batu Caves · Cheras · Petaling Jaya · Subang · Shah Alam · Klang · Kajang · Bangsar · Mont Kiara",
  },
  zh: {
    home: "首页",
    blog: "博客",
    backToAll: "返回所有文章",
    needService: "需要此服务？",
    bookExpert: "立即预约专家",
    sameDay: "提供当天服务。WhatsApp获取即时报价。",
    bookWA: "通过WhatsApp预约",
    tags: "标签",
    ourServices: "我们的服务",
    readTime: "分钟阅读",
    by: "KL Renovator团队",
    related: "相关文章",
    alsoServing: "同时服务：",
    services: [
      { label: "高压化学清洗", slug: "chemical-wash" },
      { label: "化学大修", slug: "chemical-overhaul" },
      { label: "充冷媒", slug: "gas-topup" },
      { label: "维修与故障排查", slug: "repair" },
      { label: "新机安装", slug: "installation" },
      { label: "基本保养", slug: "basic-servicing" },
    ],
    coverageNote: "吉隆坡 · 雪兰莪 · 安邦 · 黑风洞 · 蕉赖 · 八打灵再也 · 梳邦 · 莎阿南 · 巴生 · 加影 · 孟沙 · 蒙特基拉",
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  post: BlogPost;
  related: BlogPost[];
  // Optional: when rendered from a real /ms/blog/[slug] or /zh/blog/[slug]
  // route, the URL itself determines language — must NOT depend on the
  // client-side language-toggle state (that's only for the unprefixed
  // /blog/[slug] route, where all 3 languages render on one URL). Passing
  // forcedLang overrides useLang() so crawlers/visitors always see the
  // language matching the URL they requested.
  forcedLang?: "en" | "ms" | "zh";
}

// ─── Client Component ─────────────────────────────────────────────────────────
export function BlogPostClient({ post, related, forcedLang }: Props) {
  const { lang: contextLang } = useLang();
  const lang = forcedLang ?? contextLang;
  const ui = UI[lang];

  // Pick correct language
  const title    = lang === "ms" ? post.titleMS    : lang === "zh" ? post.titleZH    : post.title;
  const excerpt  = lang === "ms" ? post.excerptMS  : lang === "zh" ? post.excerptZH  : post.excerpt;
  const category = lang === "ms" ? post.categoryMS : lang === "zh" ? post.categoryZH : post.category;
  const content  = lang === "ms" ? post.contentMS  : lang === "zh" ? post.contentZH  : post.content;

  // ── BlogPosting Schema ──────────────────────────────────────────────────────
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.klrenovator.com/blog/${post.slug}`,
    headline: post.title,
    name: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-MY",
    url: `https://www.klrenovator.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.klrenovator.com/blog/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      name: "KL Renovator",
      url: "https://www.klrenovator.com",
      "@id": "https://www.klrenovator.com/#business",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.klrenovator.com/#business",
      name: "KL Renovator",
      logo: {
        "@type": "ImageObject",
        url: "https://www.klrenovator.com/logo/image.png",
        width: 400,
        height: 400,
      },
    },
    image: {
      "@type": "ImageObject",
      url: "https://www.klrenovator.com/logo/image.png",
      width: 400,
      height: 400,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    about: {
      "@type": "Service",
      name: post.relatedService,
      provider: { "@id": "https://www.klrenovator.com/#business" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.klrenovator.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.klrenovator.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/" className="hover:text-sky-600 transition font-medium">{ui.home}</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/blog" className="hover:text-sky-600 transition font-medium">{ui.blog}</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-bold truncate max-w-[200px]">{title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article>
        {/* Header */}
        <header className="relative bg-white overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 opacity-[0.07]">
            <Image
              src="/hero/aircond-installation-kuala-lumpur.jpg"
              alt="KL Renovator aircond technician"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/70 to-white/40" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-sky-600 border border-sky-200 bg-sky-50 px-2.5 py-1 mb-5">
                <FiTag className="h-2.5 w-2.5" /> {category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                {title}
              </h1>
              <p className="mt-4 text-slate-600 font-medium text-base leading-relaxed max-w-2xl">
                {excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <FiClock className="h-3 w-3 text-sky-500" />
                  {post.readTime} {ui.readTime}
                </span>
                <time dateTime={post.date}>{post.dateDisplay}</time>
                <span className="text-slate-300">·</span>
                <span>{ui.by}</span>
              </div>
            </Reveal>
          </div>
        </header>

        {/* Body */}
        <div className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_280px] gap-12">

              {/* Article Content */}
              <div
                className="prose prose-slate prose-sm sm:prose-base max-w-none
                  prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-slate-950
                  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-900
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-medium
                  prose-strong:text-slate-900 prose-strong:font-black
                  prose-ul:my-4 prose-li:text-slate-700 prose-li:font-medium
                  prose-a:text-sky-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Sidebar */}
              <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">

                {/* Book CTA */}
                <div className="bg-white border-2 border-sky-100 shadow-sm p-6 rounded-2xl">
                  <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
                    {ui.needService}
                  </p>
                  <h3 className="text-lg font-black uppercase text-slate-900 leading-tight">
                    {ui.bookExpert}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                    {ui.sameDay}
                  </p>
                  <a
                    href={waLink(rfqMsgForService(post.relatedService))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 mt-4 bg-[#25D366] hover:bg-[#1ebe5d] px-4 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all rounded-xl"
                  >
                    <FaWhatsapp className="h-4 w-4" /> {ui.bookWA}
                  </a>
                  <p className="mt-3 text-[10px] text-slate-400 font-medium text-center leading-relaxed">
                    {ui.coverageNote}
                  </p>
                </div>

                {/* Tags */}
                <div className="bg-white border border-slate-200 p-5 rounded-xl">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-3">{ui.tags}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related Services — post-specific from BLOG_SERVICE_MAP */}
                <div className="bg-white border border-slate-200 p-5 rounded-xl">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-3">{ui.ourServices}</p>
                  <ul className="space-y-1.5">
                    {(() => {
                      const specificSlugs = BLOG_SERVICE_MAP[post.slug] ?? [];
                      const specificServices = specificSlugs.length > 0
                        ? ui.services.filter((s) => specificSlugs.includes(s.slug))
                        : ui.services;
                      const displayServices = specificServices.length > 0 ? specificServices : ui.services;
                      return displayServices.map((s) => (
                        <li key={s.slug}>
                          <NextLink
                            href={`/services/${s.slug}`}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors"
                          >
                            <FiArrowRight className="h-3 w-3 shrink-0 text-sky-400" /> {s.label}
                          </NextLink>
                        </li>
                      ));
                    })()}
                  </ul>
                  <NextLink
                    href="/services"
                    className="block mt-3 text-xs font-black text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    All Services →
                  </NextLink>
                </div>

                {/* Area Links — keyword-rich anchors */}
                <div className="bg-white border border-slate-200 p-5 rounded-xl">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-3">
                    <FiMapPin className="inline h-3 w-3 mr-1 text-sky-500" />
                    {ui.alsoServing}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {siteConfig.areaPages.slice(0, 12).map((area) => (
                      <NextLink
                        key={area.slug}
                        href={`/areas/${area.slug}`}
                        className="text-[11px] font-bold text-slate-500 hover:text-sky-600 hover:underline transition-colors"
                        title={`Aircond Service ${area.name}`}
                      >
                        {area.name}
                      </NextLink>
                    ))}
                    <NextLink href="/areas" className="text-[11px] font-black text-sky-600 hover:underline">
                      All Areas →
                    </NextLink>
                  </div>
                </div>

                <NextLink
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-sky-600 transition-colors"
                >
                  <FiArrowLeft className="h-3.5 w-3.5" /> {ui.backToAll}
                </NextLink>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* ── In-Content Bottom CTA ───────────────────────────────────────── */}
      <section className="py-10 bg-sky-50 border-y border-sky-100">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
            {lang === "zh" ? "需要专业帮助？" : lang === "ms" ? "Perlukan bantuan profesional?" : "Need professional help?"}
          </p>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            {lang === "zh" ? "KL Renovator — 当天上门服务" : lang === "ms" ? "KL Renovator — Servis Hari Sama" : "KL Renovator — Same-Day Service Available"}
          </h2>
          <p className="text-sm text-slate-600 mb-5">
            {lang === "zh" 
              ? "覆盖吉隆坡及雪兰莪全区。价格透明，施工前确认。500+五星好评。"
              : lang === "ms" 
              ? "Meliputi semua kawasan KL & Selangor. Harga telus, disahkan sebelum kerja. 500+ ulasan bintang 5."
              : "Covering all of KL & Selangor. Transparent pricing confirmed before work starts. 500+ 5-star reviews."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waLink(rfqMsgForService(post.relatedService))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wider px-6 py-3 rounded-xl text-xs transition-all"
            >
              <FaWhatsapp className="h-4 w-4" />
              {lang === "zh" ? "WhatsApp预约" : lang === "ms" ? "WhatsApp Tempah" : "WhatsApp to Book"}
            </a>
            <NextLink
              href="/services"
              className="inline-flex items-center justify-center gap-1 border-2 border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-700 font-black uppercase tracking-wider px-6 py-3 rounded-xl text-xs transition-all"
            >
              {lang === "zh" ? "查看所有服务 →" : lang === "ms" ? "Lihat Semua Perkhidmatan →" : "View All Services →"}
            </NextLink>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-950 mb-8">
                {ui.related}
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => {
                const rTitle   = lang === "ms" ? p.titleMS   : lang === "zh" ? p.titleZH   : p.title;
                const rExcerpt = lang === "ms" ? p.excerptMS : lang === "zh" ? p.excerptZH : p.excerpt;
                const rCat     = lang === "ms" ? p.categoryMS : lang === "zh" ? p.categoryZH : p.category;
                return (
                  <Reveal key={p.slug} delay={i * 50}>
                    <NextLink
                      href={`/blog/${p.slug}`}
                      className="group block bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all p-5 rounded-2xl"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-600">{rCat}</span>
                      <h3 className="mt-2 text-sm font-black text-slate-950 uppercase leading-snug group-hover:text-sky-700 transition-colors">
                        {rTitle}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 font-medium line-clamp-2">{rExcerpt}</p>
                      <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400 font-bold">
                        <FiClock className="h-3 w-3" /> {p.readTime} {ui.readTime} · {p.dateDisplay}
                      </div>
                    </NextLink>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
