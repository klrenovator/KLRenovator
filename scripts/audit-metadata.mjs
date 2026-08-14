#!/usr/bin/env node
/**
 * Metadata audit — verifies on every sitemap URL that:
 *   • <title> is non-empty and <= 60 characters
 *   • meta description exists and is 140–160 characters
 *   • canonical + hreflang alternates exist
 *
 * Usage: node scripts/audit-metadata.mjs [baseUrl]
 */
const BASE = (process.argv[2] || process.env.CRAWL_BASE || "http://localhost:3222").replace(/\/$/, "");
const TITLE_MAX = 60;
const DESC_MIN = 140;   // EN/MS (latin) descriptions
const DESC_MAX = 160;
const DESC_MIN_CJK = 60; // CJK carries ~2x info per char; mirrors lib/seo-description-optimizer

const unescapeHtml = (t) =>
  t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'");
const isCJK = (t) => /[\u4e00-\u9fff]/.test(t);

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
console.log(`auditing metadata on ${urls.length} pages…`);

const titleIssues = [];
const descIssues = [];
const canonIssues = [];
const BATCH = 20;

for (let i = 0; i < urls.length; i += BATCH) {
  const slice = urls.slice(i, i + BATCH);
  await Promise.all(
    slice.map(async (u) => {
      const path = new URL(u).pathname;
      let html;
      try {
        html = await (await fetch(BASE + path)).text();
      } catch {
        titleIssues.push([u, "FETCH FAILED"]);
        return;
      }
      const title = unescapeHtml((html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] ?? "").trim());
      const desc = unescapeHtml((html.match(/<meta name="description" content="(.*?)"/s)?.[1] ?? "").trim());
      const canonical = html.match(/<link rel="canonical"/);
      const hreflang = html.match(/<link rel="alternate" hreflang=/i);

      if (!title) titleIssues.push([u, "EMPTY TITLE"]);
      else if (title.length > TITLE_MAX) titleIssues.push([u, `title ${title.length} chars: "${title}"`]);

      const descMin = isCJK(desc) ? DESC_MIN_CJK : DESC_MIN;
      if (!desc) descIssues.push([u, "MISSING description"]);
      else if (desc.length < descMin || desc.length > DESC_MAX)
        descIssues.push([u, `desc ${desc.length} chars: "${desc.slice(0, 80)}…"`]);

      if (!canonical || !hreflang) canonIssues.push([u, `${canonical ? "" : "no-canonical "}${hreflang ? "" : "no-hreflang"}`]);
    }),
  );
  process.stdout.write(`\r  ${Math.min(i + BATCH, urls.length)}/${urls.length}`);
}
console.log("\n\n════════════════ METADATA AUDIT ════════════════");
console.log(`title issues: ${titleIssues.length}`);
for (const [u, why] of titleIssues.slice(0, 400)) console.log(`   ${why}\n     ${u}`);
console.log(`description issues: ${descIssues.length}`);
for (const [u, why] of descIssues.slice(0, 400)) console.log(`   ${why}\n     ${u}`);
console.log(`canonical/hreflang issues: ${canonIssues.length}`);
for (const [u, why] of canonIssues.slice(0, 20)) console.log(`   ${why}  ${u}`);
if (!titleIssues.length && !descIssues.length && !canonIssues.length) console.log("✓ all pages pass");
process.exit(titleIssues.length || descIssues.length || canonIssues.length ? 1 : 0);
