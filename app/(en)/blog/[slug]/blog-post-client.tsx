"use client";

import NextLink from "next/link";
import type { BlogPost, BlogPostSummary } from "@/config/blog-posts";
import { BLOG_SERVICE_MAP, PROBLEM_BLOG_MAP_V2 } from "@/config/topical-authority-map";
import { diversifyBlogAnchors } from "@/config/anchor-text-diversity";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { FiClock, FiTag, FiChevronRight, FiArrowLeft, FiArrowRight, FiMapPin } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { waLink, rfqMsgForService } from "@/lib/whatsapp";
import { sitePublic } from "@/config/site-public";
import { useLang } from "@/context/language-context";
import { TopicHubCta } from "@/components/topic-hub-cta";
import { BLOG_CATEGORY_HUB } from "@/config/topic-hub-links";
import { deriveFaqsFromContent } from "@/lib/blog-derived-faq";
import { ComparisonBlock, DefinitionBlocks } from "@/components/aeo-explainer-blocks";
import type { ExplainerBundle } from "@/lib/aeo-explainer-select";
import { reviewCountLabel } from "@/config/reviews";

// UI Labels
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
    lastReviewed: "Last reviewed",
    quickAnswer: "Quick answer",
    readerFaq: "Reader FAQs",
    by: "By KL Renovator's HVAC Expert Team",
    authorEyebrow: "Reviewed by real technicians",
    authorTitle: "KL Renovator's HVAC Expert Team",
    authorDesc: "This article links back to the same field team that services wall-mounted, ceiling cassette and window units across KL & Selangor. Meet the 4 real technicians behind KL Renovator, see their experience, and review our service standards before you book.",
    authorCta: "Meet the team",
    authorTrust: ["10+ years HVAC experience", "20 major brands serviced", `${reviewCountLabel} Google reviews`, "1-month workmanship warranty"],
    authorSchemaDescription: "Field-reviewed by KL Renovator's HVAC Expert Team, serving wall-mounted, ceiling cassette and window units across KL & Selangor.",
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
    coverageNote: "KL - Selangor - Ampang - Batu Caves - Cheras - Petaling Jaya - Subang - Shah Alam - Klang - Kajang - Bangsar - Mont Kiara - Setapak - Kepong",
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
    lastReviewed: "Disemak terakhir",
    quickAnswer: "Jawapan ringkas",
    readerFaq: "Soalan lazim pembaca",
    by: "Oleh Pasukan Pakar HVAC KL Renovator",
    authorEyebrow: "Disemak oleh juruteknik sebenar",
    authorTitle: "Pasukan Pakar HVAC KL Renovator",
    authorDesc: "Artikel ini berpaut terus kepada pasukan lapangan yang sama yang menservis unit dinding, ceiling cassette dan window di KL & Selangor. Lihat 4 juruteknik sebenar di sebalik KL Renovator, pengalaman mereka, dan standard kerja kami sebelum anda membuat tempahan.",
    authorCta: "Lihat pasukan kami",
    authorTrust: ["10+ tahun pengalaman HVAC", "20 jenama utama diservis", `${reviewCountLabel} ulasan Google`, "Waranti kerjatangan 1 bulan"],
    authorSchemaDescription: "Disemak oleh Pasukan Pakar HVAC KL Renovator yang menservis unit dinding, ceiling cassette dan window di KL & Selangor.",
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
    coverageNote: "KL - Selangor - Ampang - Batu Caves - Cheras - Petaling Jaya - Subang - Shah Alam - Klang - Kajang - Bangsar - Mont Kiara",
  },
  zh: {
    home: "\u9996\u9875",
    blog: "\u535a\u5ba2",
    backToAll: "\u8fd4\u56de\u6240\u6709\u6587\u7ae0",
    needService: "\u9700\u8981\u6b64\u670d\u52a1\uff1f",
    bookExpert: "\u7acb\u5373\u9884\u7ea6\u4e13\u5bb6",
    sameDay: "\u63d0\u4f9b\u5f53\u5929\u670d\u52a1\u3002WhatsApp\u83b7\u53d6\u5373\u65f6\u62a5\u4ef7\u3002",
    bookWA: "\u901a\u8fc7WhatsApp\u9884\u7ea6",
    tags: "\u6807\u7b7e",
    ourServices: "\u6211\u4eec\u7684\u670d\u52a1",
    readTime: "\u5206\u949f\u9605\u8bfb",
    lastReviewed: "\u6700\u540e\u5ba1\u6838",
    quickAnswer: "\u5feb\u901f\u7b54\u6848",
    readerFaq: "\u8bfb\u8005\u5e38\u89c1\u95ee\u9898",
    by: "\u4f5c\u8005\uff1aKL Renovator HVAC\u4e13\u5bb6\u56e2\u961f",
    authorEyebrow: "\u7531\u771f\u5b9e\u6280\u672f\u5458\u5ba1\u6838",
    authorTitle: "KL Renovator HVAC\u4e13\u5bb6\u56e2\u961f",
    authorDesc: "\u8fd9\u7bc7\u6587\u7ae0\u76f4\u63a5\u8fde\u5230\u540c\u4e00\u652f\u73b0\u573a\u56e2\u961f\uff0c\u8be5\u56e2\u961f\u5728 KL \u548c Selangor \u4e3a\u6302\u58c1\u5f0f\u3001\u5929\u82b1\u5361\u5f0f\u548c\u7a97\u5f0f\u51b7\u6c14\u63d0\u4f9b\u670d\u52a1\u3002\u9884\u7ea6\u524d\u60a8\u53ef\u4ee5\u67e5\u770b KL Renovator \u80cc\u540e 4 \u4f4d\u771f\u5b9e\u6280\u672f\u5458\u7684\u7ecf\u9a8c\u548c\u670d\u52a1\u6807\u51c6\u3002",
    authorCta: "\u8ba4\u8bc6\u6211\u4eec\u7684\u56e2\u961f",
    authorTrust: ["10+ \u5e74 HVAC \u7ecf\u9a8c", "\u7ef4\u4fee 20 \u4e2a\u4e3b\u6d41\u54c1\u724c", `${reviewCountLabel} Google \u8bc4\u4ef7`, "1 \u4e2a\u6708\u5de5\u827a\u4fdd\u4fee"],
    authorSchemaDescription: "\u7531 KL Renovator HVAC \u4e13\u5bb6\u56e2\u961f\u5ba1\u6838\uff0c\u4e3a KL \u548c Selangor \u7684\u6302\u58c1\u5f0f\u3001\u5929\u82b1\u5361\u5f0f\u548c\u7a97\u5f0f\u51b7\u6c14\u63d0\u4f9b\u670d\u52a1\u3002",
    related: "\u76f8\u5173\u6587\u7ae0",
    alsoServing: "\u540c\u65f6\u670d\u52a1\uff1a",
    services: [
      { label: "\u9ad8\u538b\u5316\u5b66\u6e05\u6d17", slug: "chemical-wash" },
      { label: "\u5316\u5b66\u5927\u4fee", slug: "chemical-overhaul" },
      { label: "\u85b0\u51b7\u5a92", slug: "gas-topup" },
      { label: "\u7ef4\u4fee\u4e0e\u6545\u969c\u6392\u67e5", slug: "repair" },
      { label: "\u65b0\u673a\u5b89\u88c5", slug: "installation" },
      { label: "\u57fa\u672c\u4fdd\u517b", slug: "basic-servicing" },
    ],
    coverageNote: "\u5409\u9686\u5761 - \u96ea\u5170\u83ab - \u5b89\u90a6 - \u9ed1\u98ce\u6d1e - \u8549\u8d56 - \u516b\u6253\u7075\u518d\u4e5f - \u68a2\u90a6 - \u838e\u963f\u5357 - \u5df4\u751f - \u52a0\u5f71 - \u5b5f\u6c99 - \u8499\u7279\u57fa\u62c9",
  },
};

// Props
interface Props {
  post: BlogPost;
  related: BlogPostSummary[];
  // Optional: when rendered from a real /ms/blog/[slug] or /zh/blog/[slug]
  // route, the URL itself determines language - must NOT depend on the
  // client-side language-toggle state (that's only for the unprefixed
  // /blog/[slug] route, where all 3 languages render on one URL). Passing
  // forcedLang overrides useLang() so crawlers/visitors always see the
  // language matching the URL they requested.
  forcedLang?: "en" | "ms" | "zh";
  /**
   * Definition + comparison blocks resolved on the server from this post's
   * own body text (issue #72). All three locales are supplied because the
   * unprefixed /blog/[slug] route toggles language client-side.
   */
  explainers?: ExplainerBundle;
}

// Client Component
export function BlogPostClient({ post, related, forcedLang, explainers }: Props) {
  const { lang: contextLang } = useLang();
  const lang = forcedLang ?? contextLang;
  const ui = UI[lang];

  // Pick correct language
  const title    = lang === "ms" ? post.titleMS    : lang === "zh" ? post.titleZH    : post.title;
  const excerpt  = lang === "ms" ? post.excerptMS  : lang === "zh" ? post.excerptZH  : post.excerpt;
  const category = lang === "ms" ? post.categoryMS : lang === "zh" ? post.categoryZH : post.category;
  const content  = lang === "ms" ? post.contentMS  : lang === "zh" ? post.contentZH  : post.content;
  const localePrefix = lang === "en" ? "" : `/${lang}`;
  const localizedPath = (path: string) => `${localePrefix}${path}`;
  const postUrl = `https://www.klrenovator.com${localizedPath(`/blog/${post.slug}`)}`;
  const aboutTeamHref = `${localizedPath("/about")}#team`;
  const aboutTeamUrl = `https://www.klrenovator.com${aboutTeamHref}`;
  const schemaLang = lang === "ms" ? "ms-MY" : lang === "zh" ? "zh-MY" : "en-MY";
  const dateModified = post.lastReviewed ?? post.date;
  const lastReviewedDisplay = dateModified === post.date ? post.dateDisplay : dateModified;

  const quickAnswer =
    lang === "zh"
      ? `KL Renovator 的建议：${excerpt}`
      : lang === "ms"
        ? `Nasihat KL Renovator: ${excerpt}`
        : `KL Renovator's practical answer: ${excerpt}`;

  const serviceHref = localizedPath(`/services/${(BLOG_SERVICE_MAP[post.slug]?.[0] ?? "chemical-wash")}`);
  const areasHref = localizedPath("/areas/kuala-lumpur");
  const authoredFaqs =
    (lang === "ms" ? post.faqsMS : lang === "zh" ? post.faqsZH : post.faqs) ?? [];
  // Hand-authored FAQs win. Otherwise derive Q&A from the post's own visible
  // question headings so the other ~267 posts stop hiding their Q&A from
  // search engines. See lib/blog-derived-faq.ts for why we don't just
  // schema-ify the generic 3-question block (it would be identical on 300+
  // URLs = FAQ spam).
  const localizedFaqs =
    authoredFaqs.length > 0 ? authoredFaqs : deriveFaqsFromContent(content);

  // Posts with no authored FAQ and no usable question/answer section render no
  // Reader FAQ block. Repeating a generic booking/price/warranty trio on those
  // pages would recreate the duplicate-content and schema-parity gap from C4.

  // BlogPosting Schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: title,
    name: title,
    description: excerpt,
    datePublished: post.date,
    dateModified,
    inLanguage: schemaLang,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Organization",
      name: ui.authorTitle,
      url: aboutTeamUrl,
      description: ui.authorSchemaDescription,
      sameAs: [
        sitePublic.links.facebook,
        sitePublic.links.instagram,
        sitePublic.links.tiktok,
        sitePublic.links.googleBusiness,
        sitePublic.links.twitter,
        sitePublic.links.linkedin,
      ],
      parentOrganization: {
        "@type": "Organization",
        "@id": "https://www.klrenovator.com/#business",
        name: "KL Renovator",
      },
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
      url: `https://www.klrenovator.com${post.image}`,
      caption: post.imageAlt,
      width: 1200,
      height: 630,
    },
    keywords: post.tags.join(", "),
    articleSection: category,
    wordCount: Math.max(1, content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length),
    isPartOf: {
      "@type": "Blog",
      "@id": `https://www.klrenovator.com${localizedPath("/blog")}#blog`,
      name: "KL Renovator Blog",
      publisher: { "@id": "https://www.klrenovator.com/#business" },
    },
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
      { "@type": "ListItem", position: 1, name: ui.home, item: `https://www.klrenovator.com${localizedPath("")}` },
      { "@type": "ListItem", position: 2, name: ui.blog, item: `https://www.klrenovator.com${localizedPath("/blog")}` },
      { "@type": "ListItem", position: 3, name: title, item: postUrl },
    ],
  };

  // Only posts with authored, visible locale-specific Q&A emit FAQPage.
  // Existing blogs without these optional fields keep their current schema.
  const faqSchema = localizedFaqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${postUrl}#faq`,
        inLanguage: schemaLang,
        mainEntity: localizedFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null;

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href={localizedPath("") || "/"} className="hover:text-sky-600 transition font-medium">{ui.home}</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href={localizedPath("/blog")} className="hover:text-sky-600 transition font-medium">{ui.blog}</NextLink>
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
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="100vw"
              className="object-cover object-center"
              loading="lazy"
              decoding="async"
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
                <span className="text-slate-300">.</span>
                <time dateTime={dateModified}>{ui.lastReviewed}: {lastReviewedDisplay}</time>
                <span className="text-slate-300">.</span>
                <NextLink href={aboutTeamHref} className="hover:text-sky-600 transition-colors">
                  {ui.by}
                </NextLink>
              </div>
            </Reveal>
          </div>
        </header>

        {/* Body */}
        <div className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <figure className="relative mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm aspect-[16/9]">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority={true}
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
                decoding="async"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/70 px-4 py-2 text-[11px] font-semibold text-white/90">
                {post.imageAlt}
              </figcaption>
            </figure>
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
                dangerouslySetInnerHTML={{ __html: diversifyBlogAnchors(content, lang) }}
              />

              {/* Definition + comparison blocks (issue #72). Chosen server-side
                  from this post's own body, so a drainage guide gets drainage
                  terms and an energy guide gets MEPS / inverter — never a
                  generic glossary pasted onto 300 URLs. */}
              <DefinitionBlocks locale={lang} terms={explainers?.[lang].terms || []} seed={post.slug} />
              <ComparisonBlock locale={lang} comparison={explainers?.[lang].comparison || null} seed={post.slug} />

              <section className="mt-10 rounded-2xl border border-sky-100 bg-sky-50/70 p-5 not-prose">
                <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-2">
                  {ui.quickAnswer}
                </p>                <p className="text-sm font-semibold leading-relaxed text-slate-700">
                  {quickAnswer}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <NextLink href={serviceHref} className="rounded-xl bg-white border border-sky-100 p-3 text-xs font-black text-sky-700 hover:border-sky-300 transition">
                    {lang === "zh" ? "查看相关服务" : lang === "ms" ? "Lihat perkhidmatan berkaitan" : "View related service"} →
                  </NextLink>
                  <NextLink href={areasHref} className="rounded-xl bg-white border border-sky-100 p-3 text-xs font-black text-sky-700 hover:border-sky-300 transition">
                    {lang === "zh" ? "查看服务地区" : lang === "ms" ? "Lihat kawasan servis" : "View KL & Selangor coverage"} →
                  </NextLink>
                </div>
              </section>

              {/* Reader FAQs use the exact same locale-specific entries as
                  FAQPage JSON-LD, so visible Q&A and schema cannot diverge.
                  Posts without unique authored/derived entries omit both. */}
              {localizedFaqs.length > 0 && (
                <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 not-prose shadow-sm">
                  <h2 className="text-lg font-black uppercase tracking-tight text-slate-950">{ui.readerFaq}</h2>
                  <div className="mt-4 space-y-4 text-sm text-slate-700">
                    {localizedFaqs.map((faq) => (
                      <div key={faq.q}>
                        <h3 className="font-black text-slate-900">{faq.q}</h3>
                        <p className="mt-1">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-8 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 not-prose shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-2">
                  {ui.authorEyebrow}
                </p>
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  {ui.authorTitle}
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {ui.authorDesc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ui.authorTrust.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-sky-200 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wider text-sky-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <NextLink
                    href={aboutTeamHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-sky-700"
                  >
                    {ui.authorCta}
                  </NextLink>
                  <NextLink
                    href={localizedPath("/about")}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                  >
                    {lang === "zh" ? "查看公司简介" : lang === "ms" ? "Lihat halaman tentang kami" : "View About page"}
                  </NextLink>
                </div>
              </section>

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
                    rel="nofollow noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 mt-4 bg-[#25D366] hover:bg-[#1ebe5d] px-4 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all rounded-xl"
                  >
                    <FaWhatsapp className="h-4 w-4" /> {ui.bookWA}
                  </a>
                  <p className="mt-3 text-[10px] text-slate-500 font-medium text-center leading-relaxed">
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

                {/* Related Services - post-specific from BLOG_SERVICE_MAP */}
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
                            href={localizedPath(`/services/${s.slug}`)}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors"
                          >
                            <FiArrowRight className="h-3 w-3 shrink-0 text-sky-400" /> {s.label}
                          </NextLink>
                        </li>
                      ));
                    })()}
                  </ul>
                  <NextLink
                    href={localizedPath("/services")}
                    className="block mt-3 text-xs font-black text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    All Services →
                  </NextLink>
                </div>


                {(() => {
                  const problemSlugs = Object.entries(PROBLEM_BLOG_MAP_V2)
                    .filter(([, blogs]) => blogs.includes(post.slug))
                    .map(([problemSlug]) => problemSlug)
                    .slice(0, 4);
                  if (problemSlugs.length === 0) return null;
                  const problems = sitePublic.problemPagesLite.filter((p) => problemSlugs.includes(p.slug));
                  if (problems.length === 0) return null;
                  return (
                    <div className="bg-white border border-slate-200 p-5 rounded-xl">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-3">
                        {lang === "ms" ? "Masalah Berkaitan" : lang === "zh" ? "相关故障" : "Related Problems"}
                      </p>
                      <ul className="space-y-1.5">
                        {problems.map((p) => (
                          <li key={p.slug}>
                            <NextLink
                              href={localizedPath(`/problems/${p.slug}`)}
                              className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition"
                            >
                              <span>
                                {lang === "ms" ? (p.nameMS || p.name) : lang === "zh" ? (p.nameZH || p.name) : p.name}
                              </span>
                              <FiChevronRight className="h-3.5 w-3.5 shrink-0 text-sky-500" />
                            </NextLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}

                {/* Area Links - keyword-rich anchors */}
                <div className="bg-white border border-slate-200 p-5 rounded-xl">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-3">
                    <FiMapPin className="inline h-3 w-3 mr-1 text-sky-500" />
                    {ui.alsoServing}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {sitePublic.areaPagesLite.slice(0, 12).map((area) => (
                      <NextLink
                        key={area.slug}
                        href={localizedPath(`/areas/${area.slug}`)}
                        className="text-[11px] font-bold text-slate-500 hover:text-sky-600 hover:underline transition-colors"
                        title={`Aircond Service ${area.name}`}
                      >
                        {area.name}
                      </NextLink>
                    ))}
                    <NextLink href={localizedPath("/areas/kuala-lumpur")} className="text-[11px] font-black text-sky-600 hover:underline">
                      All Areas →
                    </NextLink>
                  </div>
                </div>

                <NextLink
                  href={localizedPath("/blog")}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-sky-600 transition-colors"
                >
                  <FiArrowLeft className="h-3.5 w-3.5" /> {ui.backToAll}
                </NextLink>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* In-Content Bottom CTA */}
      <section className="py-10 bg-sky-50 border-y border-sky-100">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
            {lang === "zh" ? "\u9700\u8981\u4e13\u4e1a\u5e2e\u52a9\uff1f" : lang === "ms" ? "Perlukan bantuan profesional?" : "Need professional help?"}
          </p>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            {lang === "zh" ? "KL Renovator - \u5f53\u5929\u4e0a\u95e8\u670d\u52a1" : lang === "ms" ? "KL Renovator - Servis Hari Sama" : "KL Renovator - Same-Day Service Available"}
          </h2>
          <p className="text-sm text-slate-600 mb-5">
            {lang === "zh" 
              ? `\u8986\u76d6\u5409\u9686\u5761\u53ca\u96ea\u5170\u83ab\u5168\u533a\u3002\u4ef7\u683c\u900f\u660e\uff0c\u65bd\u5de5\u524d\u786e\u8ba4\u30022026\u5e74${reviewCountLabel}\u4e94\u661f\u597d\u8bc4\u3002`
              : lang === "ms" 
              ? `Meliputi semua kawasan KL & Selangor. Harga telus, disahkan sebelum kerja. ${reviewCountLabel} ulasan bintang 5.`
              : `Covering all of KL & Selangor. Transparent pricing confirmed before work starts. ${reviewCountLabel} 5-star reviews.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waLink(rfqMsgForService(post.relatedService))}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wider px-6 py-3 rounded-xl text-xs transition-all"
            >
              <FaWhatsapp className="h-4 w-4" />
              {lang === "zh" ? "WhatsApp\u9884\u7ea6" : lang === "ms" ? "WhatsApp Tempah" : "WhatsApp to Book"}
            </a>
            <NextLink
              href={localizedPath("/services")}
              className="inline-flex items-center justify-center gap-1 border-2 border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-700 font-black uppercase tracking-wider px-6 py-3 rounded-xl text-xs transition-all"
            >
              {lang === "zh" ? "\u67e5\u770b\u6240\u6709\u670d\u52a1 \u2192" : lang === "ms" ? "Lihat Semua Perkhidmatan \u2192" : "View All Services \u2192"}
            </NextLink>
          </div>
        </div>
      </section>

      {/* Topic hub banner (issue #66) — only when this post's category belongs to a hub */}
      {(() => {
        const hubId = BLOG_CATEGORY_HUB[post.category];
        if (!hubId) return null;
        return (
          <TopicHubCta
            hubId={hubId}
            locale={lang}
            className="py-10 bg-white border-t border-slate-200"
          />
        );
      })()}

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
                      href={localizedPath(`/blog/${p.slug}`)}
                      className="group block overflow-hidden bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all rounded-2xl"
                    >
                      <div className="relative h-36 bg-slate-100">
                        <Image
                          src={p.image}
                          alt={p.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="p-5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-600">{rCat}</span>
                      <h3 className="mt-2 text-sm font-black text-slate-950 uppercase leading-snug group-hover:text-sky-700 transition-colors">
                        {rTitle}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 font-medium line-clamp-2">{rExcerpt}</p>
                      <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-500 font-bold">
                        <FiClock className="h-3 w-3" /> {p.readTime} {ui.readTime} . {p.dateDisplay}
                      </div>
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
