// Crawl the deployed sitemap and fail on indexability regressions.
//
// Usage:
//   SITE_URL=https://www.klrenovator.com npm run crawl:deployed
//   SITE_URL=https://preview.example.com CRAWL_LIMIT=25 npm run crawl:deployed
//
// This intentionally uses Node's built-in fetch rather than a browser. It
// verifies the server response that search bots receive before JavaScript runs.
import process from "node:process";

const rawSiteUrl = process.env.SITE_URL;
if (!rawSiteUrl) {
  console.error("SITE_URL is required (for example: SITE_URL=https://www.klrenovator.com npm run crawl:deployed)");
  process.exit(1);
}

const base = new URL(rawSiteUrl);
const sitemapUrl = new URL("/sitemap.xml", base);
const limit = Number.parseInt(process.env.CRAWL_LIMIT ?? "0", 10) || 0;
const concurrency = Math.max(1, Math.min(12, Number.parseInt(process.env.CRAWL_CONCURRENCY ?? "6", 10) || 6));
const timeoutMs = Math.max(1000, Number.parseInt(process.env.CRAWL_TIMEOUT_MS ?? "15000", 10) || 15000);
const userAgent = "KLRenovatorDeploymentAudit/1.0 (+https://www.klrenovator.com)";

function normalPath(value) {
  const url = new URL(value, base);
  return url.pathname.replace(/\/$/, "") || "/";
}

function expectedLocale(url) {
  const path = normalPath(url);
  return path === "/ms" || path.startsWith("/ms/") ? "ms-MY"
    : path === "/zh" || path.startsWith("/zh/") ? "zh-MY"
      : "en-MY";
}

function attrs(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)].map((match) => [match[1].toLowerCase(), match[2] ?? match[3] ?? ""]),
  );
}

function parseDocument(html) {
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const canonicalTag = html.match(/<link\b[^>]*\brel=(?:"|')canonical(?:"|')[^>]*>/i)?.[0]
    ?? html.match(/<link\b[^>]*\bhref=(?:"|')[^"']+(?:"|')[^>]*\brel=(?:"|')canonical(?:"|')[^>]*>/i)?.[0]
    ?? "";
  const robotsTag = html.match(/<meta\b[^>]*\bname=(?:"|')robots(?:"|')[^>]*>/i)?.[0] ?? "";
  const alternateTags = [...html.matchAll(/<link\b[^>]*\brel=(?:"|')alternate(?:"|')[^>]*>/gi)].map((match) => attrs(match[0]));

  return {
    lang: attrs(htmlTag).lang ?? "",
    canonical: attrs(canonicalTag).href ?? "",
    robots: attrs(robotsTag).content ?? "",
    h1Count: (html.match(/<h1[\s>]/gi) ?? []).length,
    alternates: alternateTags
      .filter((tag) => tag.hreflang && tag.href)
      .map((tag) => ({ lang: tag.hreflang, href: tag.href })),
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "User-Agent": userAgent, Accept: "text/html,application/xhtml+xml" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  return { response, text: await response.text() };
}

const sitemapResponse = await fetch(sitemapUrl, {
  headers: { "User-Agent": userAgent, Accept: "application/xml,text/xml" },
  signal: AbortSignal.timeout(timeoutMs),
});
if (!sitemapResponse.ok) {
  console.error(`Unable to fetch sitemap: ${sitemapUrl} returned ${sitemapResponse.status}`);
  process.exit(1);
}

const sitemapXml = await sitemapResponse.text();
const allUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
// Sitemap <loc> values normally name the canonical production host. A preview
// deployment must still be crawlable by passing its own SITE_URL, so retain
// each sitemap path/query but request it from the supplied target origin.
const urls = (limit > 0 ? allUrls.slice(0, limit) : allUrls).map((url) => {
  const source = new URL(url);
  return new URL(`${source.pathname}${source.search}`, base).toString();
});
if (!urls.length) {
  console.error(`No URLs found in ${sitemapUrl}`);
  process.exit(1);
}

const records = new Map();
const errors = [];
let next = 0;

async function worker() {
  while (next < urls.length) {
    const url = urls[next++];
    try {
      const { response, text } = await fetchText(url);
      if (response.status !== 200) {
        errors.push(`${url}: expected HTTP 200, got ${response.status}`);
        continue;
      }
      const document = parseDocument(text);
      records.set(url, document);

      if (!document.canonical) errors.push(`${url}: missing canonical`);
      else if (normalPath(document.canonical) !== normalPath(url)) {
        errors.push(`${url}: canonical points to ${document.canonical}`);
      }
      if (/\bnoindex\b/i.test(document.robots)) errors.push(`${url}: indexable sitemap URL is noindex`);
      if (document.h1Count !== 1) errors.push(`${url}: expected exactly one H1, found ${document.h1Count}`);
      if (document.lang !== expectedLocale(url)) {
        errors.push(`${url}: html lang is ${document.lang || "missing"}, expected ${expectedLocale(url)}`);
      }
    } catch (error) {
      errors.push(`${url}: request failed (${error instanceof Error ? error.message : String(error)})`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));

for (const [url, document] of records) {
  for (const alternate of document.alternates) {
    if (alternate.lang === "x-default") continue;
    const alternateSource = new URL(alternate.href, base);
    const alternateUrl = new URL(`${alternateSource.pathname}${alternateSource.search}`, base).toString();
    const target = records.get(alternateUrl);
    // A limited crawl cannot prove a reciprocal tag outside its selected set.
    if (!target) continue;
    const returns = target.alternates.some((candidate) => normalPath(candidate.href) === normalPath(url));
    if (!returns) errors.push(`${url}: hreflang ${alternate.lang} target does not link back (${alternate.href})`);
  }
}

console.log(`Crawled ${records.size}/${urls.length} sitemap URLs from ${base.origin}`);
if (errors.length) {
  console.error(`\n✗ Deployment crawl found ${errors.length} issue(s):`);
  for (const error of errors.slice(0, 100)) console.error(`  • ${error}`);
  if (errors.length > 100) console.error(`  • …and ${errors.length - 100} more`);
  process.exit(1);
}
console.log("✓ Deployment crawl passed: status, canonical, hreflang, noindex, H1 and SSR language checks are clean.");
