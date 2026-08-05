/**
 * P2-04 Phase 3 routing adapter — progressive migration helper.
 *
 * This module re-exports the consolidated locale helpers from lib/locale.ts
 * and adds small adapters for the current literal-tree structure.
 *
 * New families should import from here; legacy families will be migrated
 * progressively. Future [locale] route group can import same helpers without
 * changing URL semantics.
 */

export {
  type Locale,
  LOCALES,
  DEFAULT_LOCALE,
  HTML_LANG_MAP,
  OG_LOCALE_MAP,
  isLocale,
  localeFromPath,
  htmlLangForLocale,
  withLocalePrefix,
  withoutLocalePrefix,
  buildLocaleAlternates,
  privacyPolicyUrl,
} from "@/lib/locale";

import { type Locale, withLocalePrefix } from "@/lib/locale";
import type { Lang } from "@/context/language-context";

/**
 * Converts Lang (en|ms|zh) from language-context to typed Locale.
 * Kept for backward compat during transition.
 */
export function langToLocale(lang: Lang | string): Locale {
  if (lang === "ms" || lang === "zh") return lang as Locale;
  return "en";
}

/**
 * Locale-aware link builder that respects unprefixed English.
 */
export function localeLink(path: string, locale: Locale): string {
  return withLocalePrefix(path, locale);
}
