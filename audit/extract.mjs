#!/usr/bin/env node
/**
 * PART 2 AUDIT — Extractor.
 * Walks every prerendered .html in .next/server/app and extracts a structured
 * content record per page: title, description, headings, word counts, schema
 * types, internal links, FAQ blocks, tables, lists, entity/trust signals.
 * Writes audit/pages.json
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".next/server/app");
const OUT = path.resolve("audit/pages.json");

// ── html helpers ────────────────────────────────────────────────────────
const unescapeHtml = (t) =>
  t
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&#x2F;/g, "/").replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–").replace(/&hellip;/g, "…").replace(/&rsquo;/g, "'");

const stripTags = (h) => unescapeHtml(h.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

const isCJK = (t) => /[\u4e00-\u9fff]/.test(t);
// Google's SERP budget approximation: CJK glyphs occupy ~2 latin units
const displayWidth = (t) => {
  let w = 0;
  for (const ch of t) w += /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/.test(ch) ? 2 : 1;
  return w;
};
// word count that works for CJK too (CJK: 1 char ~= 1 word-equivalent / 1.6)
const wordCount = (t) => {
  const cjk = (t.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = (t.replace(/[\u4e00-\u9fff]/g, " ").match(/[A-Za-z0-9][A-Za-z0-9''\-]*/g) || []).length;
  return latin + Math.round(cjk / 1.6);
};

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = path.join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (e.endsWith(".segments")) continue;
      walk(p, acc);
    } else if (e.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function routeOf(file) {
  let r = "/" + path.relative(ROOT, file).replace(/\.html$/, "");
  r = r.replace(/\/\([^)]+\)/g, "");     // strip route groups
  r = r.replace(/\/index$/, "");
  if (r === "") r = "/";
  return r;
}

function localeOf(route) {
  if (route === "/ms" || route.startsWith("/ms/")) return "ms";
  if (route === "/zh" || route.startsWith("/zh/")) return "zh";
  return "en";
}

function templateOf(route) {
  const r = route.replace(/^\/(ms|zh)/, "") || "/";
  const seg = r.split("/").filter(Boolean);
  if (r === "/") return "homepage";
  if (seg[0] === "areas") {
    if (seg.length === 1) return "areas-index";
    if (seg.length === 2) return "area";
    if (seg.length === 3 && seg[2] === "installation") return "area-installation";
    if (seg.length === 3) return "kampung";
    if (seg.length === 4) return "kampung-installation";
  }
  if (seg[0] === "brands") {
    if (seg.length === 1) return "brands-index";
    if (seg.length === 2) return "brand";
    if (seg.length === 3 && seg[2] === "installation") return "brand-installation";
    if (seg.length === 3) return "brand-area";
  }
  if (seg[0] === "blog") return seg.length === 1 ? "blog-index" : "blog-post";
  if (seg[0] === "services") return seg.length === 1 ? "services-index" : "service";
  if (seg[0] === "problems") return seg.length === 1 ? "problems-index" : "problem";
  if (/calculator|btu-calculator|which-aircond-service/.test(r)) return "tool";
  if (seg[0] === "tools") return "tools-index";
  if (/installation-kl$|installation$|installation-price|whole-house|new-home|commercial-aircond/.test(r)) return "installation-landing";
  if (["about", "contact", "faq", "gallery", "book", "review", "privacy-policy", "near-me", "admin"].includes(seg[0])) return "utility";
  return "other";
}

const files = walk(ROOT).filter((f) => {
  const b = path.basename(f);
  return !b.startsWith("_") && !f.includes("/admin/");
});

console.log(`parsing ${files.length} prerendered pages…`);

const pages = [];
for (const file of files) {
  const html = readFileSync(file, "utf8");
  const route = routeOf(file);
  if (route.startsWith("/admin")) continue;

  const head = html.slice(0, html.indexOf("</head>") + 7);

  const title = unescapeHtml((html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? "").trim());
  const desc = unescapeHtml((head.match(/<meta name="description" content="([\s\S]*?)"\/?>/)?.[1] ?? "").trim());
  const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
  const robots = head.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
  const hreflangs = [...head.matchAll(/hreflang="([^"]+)"/gi)].map((m) => m[1]);
  const ogTitle = unescapeHtml(head.match(/property="og:title" content="([^"]*)"/)?.[1] ?? "");
  const ogImage = head.match(/property="og:image"[^>]*content="([^"]*)"/)?.[1] ?? "";

  // ── body ──
  const bodyStart = html.indexOf("<body");
  const body = bodyStart >= 0 ? html.slice(bodyStart) : html;

  // Next.js streams route content into `<div hidden id="S:n">` payload blocks
  // that are appended AFTER the <main> suspense shell. So "main content" =
  // whole body minus global chrome (header/nav/footer) minus scripts/styles.
  let main = body
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    // site chrome only: the sticky top navbar header, the footer, and the
    // Main/Footer/Breadcrumb <nav>s. Article/section <header>s are CONTENT
    // (blog posts and kampung pages put their <h1> inside one) so they stay.
    .replace(/<header class="sticky[\s\S]*?<\/header>/g, " ")
    .replace(/<footer[\s\S]*?<\/footer>/g, " ")
    .replace(/<nav aria-label="Main navigation"[\s\S]*?<\/nav>/g, " ")
    .replace(/<nav[^>]*aria-label="Footer navigation"[\s\S]*?<\/nav>/g, " ")
    .replace(/<nav[^>]*aria-label="Breadcrumb"[\s\S]*?<\/nav>/g, " ")
    // suspense fallback spinner duplicated in the streamed shell (text only —
    // a greedy element-level strip here would eat the real <h1> that follows)
    .replace(/Loading page/g, " ")
    .replace(/Loading…/g, " ");

  const headings = [];
  for (const m of main.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/g)) {
    const text = stripTags(m[2]);
    if (text) headings.push({ level: Number(m[1][1]), text });
  }
  const h1s = headings.filter((h) => h.level === 1).map((h) => h.text);
  const h2s = headings.filter((h) => h.level === 2).map((h) => h.text);
  const h3s = headings.filter((h) => h.level === 3).map((h) => h.text);

  // visible text of main
  const text = stripTags(main);
  const words = wordCount(text);

  // JSON-LD
  const ldTypes = [];
  const ldRaw = [];
  for (const m of body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    ldRaw.push(m[1]);
    for (const t of m[1].matchAll(/"@type"\s*:\s*"([^"]+)"/g)) ldTypes.push(t[1]);
  }
  const ldJoined = ldRaw.join(" ");

  // FAQ counting: schema questions + visible Q/A
  const faqSchemaCount = (ldJoined.match(/"@type"\s*:\s*"Question"/g) || []).length;
  const hasHowTo = /"@type"\s*:\s*"HowTo"/.test(ldJoined);
  const hasSpeakable = /"speakable"/.test(ldJoined);
  const hasBreadcrumb = /"@type"\s*:\s*"BreadcrumbList"/.test(ldJoined);
  const hasProduct = /"@type"\s*:\s*"(Product|Offer|AggregateOffer)"/.test(ldJoined);
  const hasReviewSchema = /"@type"\s*:\s*"(Review|AggregateRating)"/.test(ldJoined);
  const hasLocalBusiness = /"@type"\s*:\s*"(LocalBusiness|HVACBusiness|ProfessionalService)"/.test(ldJoined);
  const hasArticle = /"@type"\s*:\s*"(Article|BlogPosting|NewsArticle)"/.test(ldJoined);
  const hasVideo = /"@type"\s*:\s*"VideoObject"/.test(ldJoined);
  const hasItemList = /"@type"\s*:\s*"ItemList"/.test(ldJoined);
  const hasWebPage = /"@type"\s*:\s*"(WebPage|FAQPage|CollectionPage)"/.test(ldJoined);
  const hasAuthor = /"author"\s*:/.test(ldJoined);
  const hasDateModified = /"dateModified"\s*:/.test(ldJoined);

  // structural AEO features in visible HTML
  const tables = (main.match(/<table/g) || []).length;
  const uls = (main.match(/<ul/g) || []).length;
  const ols = (main.match(/<ol/g) || []).length;
  const lis = (main.match(/<li/g) || []).length;
  const details = (main.match(/<details/g) || []).length;
  const imgs = (main.match(/<img/g) || []).length;
  const imgsNoAlt = (main.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;

  // internal links (from full body incl. nav/footer) and from main only
  const allHrefs = [...body.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/$/, "") || "/");
  const mainLinks = [...main.matchAll(/<a[^>]*href="(\/[^"#?]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({
    href: m[1].replace(/\/$/, "") || "/",
    anchor: stripTags(m[2]).slice(0, 120),
  }));
  const outLinksExternal = [...main.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1])
    .filter((u) => !/klrenovator\.com/.test(u) && !/wa\.me|whatsapp|tel:/.test(u));

  // trust / expert signals in visible text
  const lower = text.toLowerCase();
  const signals = {
    price: /rm\s?\d/i.test(text),
    warranty: /warrant|waranti|保修|保用/i.test(text),
    ssm: /ssm|registered|berdaftar|注册/i.test(text),
    years: /\b(\d{1,2})\+?\s*(years|tahun|年)/i.test(text),
    reviewCount: /\b\d{2,4}\+?\s*(reviews|customers|pelanggan|客户|评价)/i.test(text),
    rating: /\b[45]\.\d\s*(★|star|stars|\/5)/i.test(text),
    phone: /\+?60\s?1\d[\s-]?\d{3,4}[\s-]?\d{4}/.test(text),
    address: /jalan|kuala lumpur|selangor/i.test(text),
    author: /author|written by|reviewed by|disemak|作者|审核/i.test(text),
    lastUpdated: /last (updated|reviewed)|dikemas kini|更新/i.test(text),
    licence: /licens|certified|bersijil|认证/i.test(text),
    insurance: /insur|insuran|保险/i.test(text),
  };

  // AEO content-pattern detection (heading-driven)
  const hAll = headings.map((h) => h.text.toLowerCase()).join(" || ");
  const patterns = {
    faqHeading: /faq|frequently asked|soalan lazim|常见问题|questions/.test(hAll),
    howTo: /how to|how do|step|langkah|cara|步骤|如何/.test(hAll),
    comparison: /\bvs\b|versus|compare|comparison|perbandingan|banding|对比|比较|which is better|difference between/.test(hAll),
    definition: /what is|what are|apa itu|apakah|是什么|定义|meaning|means/.test(hAll),
    troubleshoot: /troubleshoot|problem|fix|why is|why does|not cool|leak|masalah|kenapa|故障|问题|维修/.test(hAll),
    pricing: /price|cost|harga|kos|价格|费用|rm\s?\d/.test(hAll),
    checklist: /checklist|signs|symptom|tanda|迹象|症状|when to/.test(hAll),
  };
  // direct-answer detection: a question heading followed by a short paragraph
  let directAnswerBlocks = 0;
  for (const m of main.matchAll(/<(h[2-4])[^>]*>([\s\S]*?)<\/\1>\s*(?:<[^>]+>\s*)*<p[^>]*>([\s\S]{0,700}?)<\/p>/g)) {
    const q = stripTags(m[2]);
    const a = stripTags(m[3]);
    if (/\?|^(what|how|why|when|where|which|do|does|is|are|can|should)\b/i.test(q) || /^(apa|kenapa|bagaimana|bila|adakah|berapa)/i.test(q) || /[？]/.test(q)) {
      const w = wordCount(a);
      if (w >= 15 && w <= 120) directAnswerBlocks++;
    }
  }

  pages.push({
    route,
    locale: localeOf(route),
    template: templateOf(route),
    title,
    titleLen: title.length,
    titleWidth: displayWidth(title),
    desc,
    descLen: desc.length,
    descWidth: displayWidth(desc),
    canonical,
    robots,
    hreflangCount: hreflangs.length,
    ogTitle,
    hasOgImage: Boolean(ogImage),
    h1s,
    h1Count: h1s.length,
    h2s,
    h3Count: h3s.length,
    headingCount: headings.length,
    headings: headings.map((h) => `${h.level}:${h.text}`),
    words,
    textSample: text.slice(0, 400),
    text,
    ldTypes: [...new Set(ldTypes)],
    faqSchemaCount,
    hasHowTo, hasSpeakable, hasBreadcrumb, hasProduct, hasReviewSchema,
    hasLocalBusiness, hasArticle, hasVideo, hasItemList, hasWebPage,
    hasAuthor, hasDateModified,
    tables, uls, ols, lis, details, imgs, imgsNoAlt,
    mainLinkCount: mainLinks.length,
    mainLinks,
    allHrefs: [...new Set(allHrefs)],
    externalCitations: [...new Set(outLinksExternal)],
    signals,
    patterns,
    directAnswerBlocks,
    htmlBytes: html.length,
  });
}

writeFileSync(OUT, JSON.stringify(pages));
console.log(`wrote ${pages.length} page records -> ${OUT}`);
const byTpl = {};
for (const p of pages) byTpl[p.template] = (byTpl[p.template] || 0) + 1;
console.log(Object.entries(byTpl).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`).join("\n"));
