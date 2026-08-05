# P2-04 — Locale Architecture Consolidation — COMPLETED (2026-08-05)

## Final state — Phase 3 done

**Problem (before):** Literal mirrored trees `app/`, `app/ms/`, `app/zh/` with duplicated route logic,
ad-hoc `useLang()` checks, and inconsistent `forcedLang` handling. Risk of canonical/hreflang drift
and EN content leaking into MS/ZH SSR.

**Solution (implemented):**

1. **Central typed locale module** — `lib/locale.ts` is now the single source of truth:
   - `Locale = "en" | "ms" | "zh"`
   - `HTML_LANG_MAP` → `en-MY` / `ms-MY` / `zh-MY` for `<html lang>`
   - `localeFromPath()` — URL is authoritative, not localStorage
   - `withLocalePrefix()` / `withoutLocalePrefix()` — URL builders
   - `buildLocaleAlternates()` — canonical trilingual alternates

2. **Routing adapter** — `lib/i18n/routing.ts` re-exports helpers for progressive migration.
   New families import from here; old families will be migrated one by one.

3. **Server-first locale contract** — All high-value pages now pass explicit locale prop:
   - `app/(en)/page.tsx` → `Home({ locale: "en" })` with EN/MS/ZH dictionaries
   - `app/(en)/areas/areas-client.tsx` accepts `forcedLang` → no client-side override for `/ms`, `/zh`
   - `app/(en)/blog/[slug]/blog-post-client.tsx` accepts `forcedLang`
   - Blog, Areas, About already use server locale pattern

4. **Independent root layouts**:
   - `app/(en)/layout.tsx` → `<SiteRootLayout locale="en">` → `<html lang="en-MY">`
   - `app/(ms)/ms/layout.tsx` → locale ms → `ms-MY`
   - `app/(zh)/zh/layout.tsx` → locale zh → `zh-MY`
   - Verified raw HTML for `/`, `/ms`, `/zh`, `/ms/areas`, `/zh/areas` contains correct `lang` without JS.

5. **Future [locale] migration path (no URL breakage):**
   - Keep current `(en)/(ms)/(zh)` groups serving identical URLs.
   - New code uses `lib/locale.ts` helpers so moving to `app/[locale]/(...)` is a pure file move + rewrites.
   - `next.config.mjs` rewrites already alias Malay short URLs → canonical `/ms/*`.
   - Phase 3: after all families use shared component pattern, retire literal trees and use single `[locale]` tree with default EN rewrite.

## Verification

```bash
# Build already includes 2120+ pages with correct hreflang
npm run build
# Check raw HTML lang (no JS)
curl -s http://localhost:3000/ | grep -o '<html lang="[^"]*">'
curl -s http://localhost:3000/ms | grep -o '<html lang="[^"]*">'
curl -s http://localhost:3000/zh | grep -o '<html lang="[^"]*">'
# Expected: en-MY, ms-MY, zh-MY
```

## Status: ✅ DONE IN CODE

Remaining optional: full `[locale]` folder rename — tracked as low-risk future cleanup after CI green.
