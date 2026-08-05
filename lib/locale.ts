/**
 * P2-04 — Locale consolidation (phase 3)
 *
 * Central typed locale helpers. This module is the single source of truth
 * for locale detection, prefixing, hreflang and <html lang> mapping.
 *
 * Migration notes:
 * - English routes remain unprefixed (canonical root).
 * - Malay at /ms/*, Chinese at /zh/*.
 * - Legacy literal trees (app/(en), app/(ms)/ms, app/(zh)/zh) still render
 *   but now consume helpers from here rather than ad-hoc path checks.
 * - Future migration to app/[locale] route groups can reuse `isLocale`,
 *   `localeFromPath`, `withLocalePrefix`, `htmlLangForLocale`.
 */

export type Locale = "en" | "ms" | "zh";
export const LOCALES: Locale[] = ["en", "ms", "zh"];
export const DEFAULT_LOCALE: Locale = "en";

export const HTML_LANG_MAP: Record<Locale, string> = {
  en: "en-MY",
  ms: "ms-MY",
  zh: "zh-MY",
};

export const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_MY",
  ms: "ms_MY",
  zh: "zh_MY",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

export function localeFromPath(pathname: string): Locale {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/ms" || p.startsWith("/ms/")) return "ms";
  if (p === "/zh" || p.startsWith("/zh/")) return "zh";
  return "en";
}

export function htmlLangForLocale(locale: Locale): string {
  return HTML_LANG_MAP[locale] ?? "en-MY";
}

export function withLocalePrefix(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function withoutLocalePrefix(path: string): { locale: Locale; path: string } {
  const locale = localeFromPath(path);
  if (locale === "en") return { locale, path };
  const stripped = path.replace(new RegExp(`^/${locale}`), "") || "/";
  return { locale, path: stripped };
}

export function buildLocaleAlternates(enPath: string): Record<string, string> {
  const base = "https://www.klrenovator.com";
  const path = enPath.startsWith("/") ? enPath : `/${enPath}`;
  const clean = path === "/" ? "" : path;
  // clean may be "" for root; fallback to "/" for en and x-default, "/ms" and "/zh" for others
  const enUrl = clean ? `${base}${clean}` : `${base}/`;
  const msUrl = clean ? `${base}/ms${clean}` : `${base}/ms`;
  const zhUrl = clean ? `${base}/zh${clean}` : `${base}/zh`;
  return {
    "en-MY": enUrl,
    "ms-MY": msUrl,
    "zh-MY": zhUrl,
    "x-default": enUrl,
  };
}

/**
 * Returns localized privacy policy URL by locale.
 */
export function privacyPolicyUrl(locale: Locale): string {
  // Currently single privacy policy route at /privacy-policy,
  // but helper prepares for future i18n versions.
  const raw = locale === "en" ? "/privacy-policy" : `/${locale}/privacy-policy`;
  return raw.replace(/\/\//g, "/");
}
