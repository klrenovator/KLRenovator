// lib/hreflang-canonical.ts
// Round 47 / v54 — 20E.43 Hreflang & Canonical Double-Check
// Ensures trailing slash and domain consistency across all language headers
// - No trailing slash (except root "/" canonical is https://www.klrenovator.com)
// - Domain always https://www.klrenovator.com
// - Trilingual alternates: en-MY, ms-MY, zh-MY, x-default

const BASE = "https://www.klrenovator.com";

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

export function buildTrilingualHreflang(enPath: string) {
  const en = buildUrl(enPath);
  const ms = buildUrl(`/ms${enPath === "/" ? "" : enPath}`);
  const zh = buildUrl(`/zh${enPath === "/" ? "" : enPath}`);
  
  // Special cases for index pages that have dedicated MS/ZH routes
  // enPath "/" => ms "/ms", zh "/zh" (not "/ms/" or "/zh/")
  // For "/areas" => "/ms/areas", "/zh/areas" etc.

  return {
    canonical: en,
    languages: {
      "en-MY": en,
      "ms-MY": ms,
      "zh-MY": zh,
      "x-default": en,
    },
  };
}

export function buildBilingualHreflang(enPath: string, hasMs = true, hasZh = true) {
  const en = buildUrl(enPath);
  const result: Record<string, string> = { "en-MY": en };
  if (hasMs) result["ms-MY"] = buildUrl(`/ms${enPath === "/" ? "" : enPath}`);
  if (hasZh) result["zh-MY"] = buildUrl(`/zh${enPath === "/" ? "" : enPath}`);
  result["x-default"] = en;
  return {
    canonical: en,
    languages: result,
  };
}

// Helper for dynamic routes where we already have en/ms/zh URLs built
export function normalizeHreflangUrls(urls: { en: string; ms?: string; zh?: string; xDefault?: string }) {
  const en = urls.en.replace(/\/$/, "") || BASE;
  const ms = urls.ms ? urls.ms.replace(/\/$/, "") : undefined;
  const zh = urls.zh ? urls.zh.replace(/\/$/, "") : undefined;
  const xDefault = urls.xDefault ? urls.xDefault.replace(/\/$/, "") : en;

  const languages: Record<string, string> = { "en-MY": en };
  if (ms) languages["ms-MY"] = ms;
  if (zh) languages["zh-MY"] = zh;
  languages["x-default"] = xDefault;

  // Ensure all use www.klrenovator.com and https
  for (const key of Object.keys(languages)) {
    let url = languages[key];
    // Force https and www
    url = url.replace(/^http:\/\/www\./, "https://www.");
    url = url.replace(/^http:\/\/klrenovator\.com/, "https://www.klrenovator.com");
    url = url.replace(/^https:\/\/klrenovator\.com/, "https://www.klrenovator.com");
    // Remove trailing slash
    if (url !== BASE && url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    languages[key] = url;
  }

  return {
    canonical: languages["en-MY"],
    languages,
  };
}

export { BASE as CANONICAL_BASE, buildUrl as buildCanonicalUrl };
