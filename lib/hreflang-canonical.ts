// lib/hreflang-canonical.ts
// Round 47 / v54 — 20E.43 Hreflang & Canonical Double-Check
// Ensures trailing slash and domain consistency across all language headers
// - No trailing slash (except root "/" canonical is https://www.klrenovator.com)
// - Domain always https://www.klrenovator.com
// - Trilingual alternates: en-MY, ms-MY, zh-MY, x-default
//
// ─────────────────────────────────────────────────────────────────────────
// GSC FIX (2026-07-28) — canonical must be SELF-referencing.
//
// Both `buildTrilingualHreflang()` and `normalizeHreflangUrls()` used to
// hard-code `canonical` to the ENGLISH url, no matter which locale's page
// was rendering it. Every /ms/* and /zh/* page that used these helpers was
// therefore telling Google "the real version of me is the English page".
//
// In Search Console that is reported as:
//   • "Alternate page with proper canonical tag"  → excluded, never indexed
//   • "Duplicate, Google chose a different canonical than user"
//
// It also silently breaks hreflang, because Google requires the canonical
// and the self-referencing hreflang to agree; when they disagree the whole
// language cluster is discarded.
//
// The helpers now take a `locale` and emit that locale's own URL as the
// canonical. `x-default` stays on English, which is correct — x-default is
// the fallback for unmatched languages, not the cluster's canonical.
// ─────────────────────────────────────────────────────────────────────────

const BASE = "https://www.klrenovator.com";

export type HreflangLocale = "en" | "ms" | "zh";

function normalizePath(path: string): string {
  if (!path) return "";
  // Ensure leading slash
  let p = path.startsWith("/") ? path : `/${path}`;
  // Remove trailing slash unless it's root "/"
  if (p.length > 1 && p.endsWith("/")) {
    p = p.slice(0, -1);
  }
  return p;
}

function buildUrl(path: string): string {
  const normalized = normalizePath(path);
  if (normalized === "" || normalized === "/") {
    return BASE;
  }
  return `${BASE}${normalized}`;
}

/**
 * Build canonical + hreflang alternates for a page that exists in all three
 * languages at the same path depth (EN at the root, MS under /ms, ZH under /zh).
 *
 * @param enPath  The ENGLISH path, e.g. "/brands" or "/btu-calculator".
 * @param locale  Which locale's page is calling this. This determines the
 *                canonical. Defaults to "en" so existing English callers are
 *                unaffected.
 *
 * @example
 *   // app/brands/page.tsx      → canonical https://www.klrenovator.com/brands
 *   buildTrilingualHreflang("/brands")
 *   // app/ms/brands/page.tsx   → canonical https://www.klrenovator.com/ms/brands
 *   buildTrilingualHreflang("/brands", "ms")
 */
export function buildTrilingualHreflang(enPath: string, locale: HreflangLocale = "en") {
  const suffix = enPath === "/" ? "" : enPath;
  const en = buildUrl(enPath);
  const ms = buildUrl(`/ms${suffix}`);
  const zh = buildUrl(`/zh${suffix}`);

  const self = locale === "ms" ? ms : locale === "zh" ? zh : en;

  return {
    // Self-referencing: the page is its own canonical. Pointing /ms/* at the
    // English URL removes it from the index entirely.
    canonical: self,
    languages: {
      "en-MY": en,
      "ms-MY": ms,
      "zh-MY": zh,
      // x-default = the version served to users whose language we don't
      // target. English is the right fallback; this is NOT the canonical.
      "x-default": en,
    },
  };
}

/**
 * Same as {@link buildTrilingualHreflang} but for pages that only exist in
 * some of the three languages.
 */
export function buildBilingualHreflang(
  enPath: string,
  hasMs = true,
  hasZh = true,
  locale: HreflangLocale = "en",
) {
  const suffix = enPath === "/" ? "" : enPath;
  const en = buildUrl(enPath);
  const ms = hasMs ? buildUrl(`/ms${suffix}`) : undefined;
  const zh = hasZh ? buildUrl(`/zh${suffix}`) : undefined;

  const languages: Record<string, string> = { "en-MY": en };
  if (ms) languages["ms-MY"] = ms;
  if (zh) languages["zh-MY"] = zh;
  languages["x-default"] = en;

  const self = locale === "ms" ? (ms ?? en) : locale === "zh" ? (zh ?? en) : en;

  return {
    canonical: self,
    languages,
  };
}

function canonicalize(url: string): string {
  let out = url;
  // Force https and www
  out = out.replace(/^http:\/\/www\./, "https://www.");
  out = out.replace(/^http:\/\/klrenovator\.com/, "https://www.klrenovator.com");
  out = out.replace(/^https:\/\/klrenovator\.com/, "https://www.klrenovator.com");
  // Remove trailing slash
  if (out !== BASE && out.endsWith("/")) {
    out = out.slice(0, -1);
  }
  return out;
}

/**
 * Helper for dynamic routes where the en/ms/zh URLs are already built.
 *
 * @param urls.locale  Which locale is rendering. Determines the canonical.
 *                     Defaults to "en" for backwards compatibility.
 */
export function normalizeHreflangUrls(urls: {
  en: string;
  ms?: string;
  zh?: string;
  xDefault?: string;
  locale?: HreflangLocale;
}) {
  const en = canonicalize(urls.en) || BASE;
  const ms = urls.ms ? canonicalize(urls.ms) : undefined;
  const zh = urls.zh ? canonicalize(urls.zh) : undefined;
  const xDefault = urls.xDefault ? canonicalize(urls.xDefault) : en;

  const languages: Record<string, string> = { "en-MY": en };
  if (ms) languages["ms-MY"] = ms;
  if (zh) languages["zh-MY"] = zh;
  languages["x-default"] = xDefault;

  const locale = urls.locale ?? "en";
  const self = locale === "ms" ? (ms ?? en) : locale === "zh" ? (zh ?? en) : en;

  return {
    canonical: self,
    languages,
  };
}

export { BASE as CANONICAL_BASE, buildUrl as buildCanonicalUrl };
