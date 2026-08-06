# Deep Audit Progress Tracker — KLRenovator

**Audit Source:** KLRenovator-Deep-Audit.md (Aug 5, 2026, 183 files reviewed)
**Tracker Created:** Aug 6, 2026
**Last Updated:** Aug 6, 2026 — Round 5 completed: P3-05 bundle review closed (server/client component analysis) — tracker 100% complete; all checks re-verified green
**Branch:** arena/019fd83e-klrenovator

This file tracks every recommendation from the deep audit. Status labels:
- ✅ Completed
- 🟡 In Progress
- ⏳ Pending
- ❌ Blocked
- 🔍 Needs Review

---

## Priority 1 — Critical

| ID | Category | Problem | File(s) | Priority | Status | Notes |
|---|---|---|---|---|---|---|
| P1-01 | i18n / SEO | Homepage /ms and /zh routes rendered `<Home />` without lang prop → server HTML always English, body re-renders to MS/ZH after hydration, meta/body mismatch | `app/(en)/page.tsx`, `app/(ms)/ms/page.tsx`, `app/(zh)/zh/page.tsx`, `context/language-context.tsx`, `components/sections/hero.tsx`, `components/sections/why-choose-us.tsx`, `components/sections/services-with-pricing.tsx`, `components/sections/google-reviews.tsx` | P1 | ✅ Completed | **Round 3 Enhanced:** Home now accepts `locale` prop with COPY dict. **Gap closed (Round 3):** Hero, WhyChooseUs, ServicesWithPricing, GoogleReviews now accept `locale?: Lang` prop and resolve `lang = locale ?? ctxLang` with `translations[lang]` override, so server-rendered body matches metadata. Homepage passes `locale={locale}` to all 4. Verified no remaining useLang-only above-the-fold sections on homepage. |
| P1-02 | i18n / SEO | Areas hub /ms/areas and /zh/areas rendered `<AreasClient />` without forcedLang → same flash/mismatch as homepage | `app/(en)/areas/areas-client.tsx`, `app/(ms)/ms/areas/page.tsx`, `app/(zh)/zh/areas/page.tsx`, `app/(en)/areas/page.tsx` | P1 | ✅ Completed | Fixed: AreasClient has `forcedLang?: Lang` (`const lang = forcedLang ?? contextLang`). All three route files pass forcedLang en/ms/zh. |
| P1-03 | Pricing Consistency | Window unit installation quoted RM 180 in 6+ content files but calculator source of truth is RM 199/249 | `lib/aircond-math.ts`, `config/site/pricing.ts`, `config/brand-installation-content.ts`, `config/installation-hub.ts`, `config/kampung-installation-content.ts`, `config/installation-page-content.ts`, `config/area-installation-content.ts`, `context/language-context.tsx`, `components/sections/installation-spotlight.tsx`, `components/brand-installation-page.tsx`, `components/kampung-installation-page.tsx`, `components/area-installation-page.tsx`, `app/(en)/aircond-installation-kl/page.tsx`, `app/(ms)/ms/pemasangan-aircond-kl/page.tsx`, `app/(zh)/zh/aircond-installation-kl/page.tsx` | P1 | ✅ Completed | **Round 2:** Unified all window pricing to RM 199 (1.0–1.5 HP) / RM 249 (2.0 HP). Added window rows to pricing.ts (12 rows). Updated 15 files. Regenerated `config/site-public.ts` (25.3 KB). Verified `grep -R "window.*RM 180"` = 0 relevant. |
| P1-04 | Security | Admin login `/api/admin/login` had no rate limiting, only per-request random delay | `app/api/admin/login/route.ts`, `lib/rate-limit.ts` | P1 | ✅ Completed | Uses `rateLimit(admin-login:${clientIp(req)}, 8, 10*60*1000)` returning 429 with Retry-After. |
| P1-05 | Security | `supabaseAdmin` had no `server-only` guard → future client import would leak service_role key | `lib/supabase.ts` | P1 | ✅ Completed | First line `import "server-only"`; package `server-only@0.0.1` present. Only imported by route.ts files. |

---

## Priority 2 — High

| ID | Category | Problem | File(s) | Priority | Status | Notes |
|---|---|---|---|---|---|---|
| P2-01 | Build / Process | `gen:site-public` was manual step, risk of stale prices/phone on client | `package.json` scripts | P2 | ✅ Completed | `"prebuild": "npm run gen:site-public"` present. |
| P2-02 | Code Quality | `server-only` package missing | `package.json` | P2 | ✅ Completed | Added `server-only@0.0.1`. |
| P2-03 | Architecture / Performance | `next/font` not used, site renders system font not Inter, ambiguous if intentional | `config/fonts.ts`, `styles/globals.css` | P2 | ✅ Completed | **Round 2:** Documented deliberate system-stack decision for 0 KB / 0 CLS. Preserves API surface; swap instructions in file. |
| P2-04 | Dependencies | `googleapis` full package imported for just Calendar API, increases server cold-start | `lib/google-calendar.ts` | P2 | ✅ Completed (Optimized) | **Round 2:** Top-level import → dynamic `await import("googleapis")` inside `getCalendarClient()`. Added `server-only` guard, async callers. Full `@googleapis/calendar` swap tracked as P4-03. |
| P2-05 | Dependencies | `@heroui/styles` imported in CSS but no component used | `styles/globals.css`, `package.json` | P2 | ✅ Completed | Verified intentional – base Tailwind reset/utilities. Single `@import` present. |
| P2-06 | Performance | Large Client Components statically imported on homepage: PriceCalculator (790 lines), DiagnosticTool (690 lines) | `app/(en)/page.tsx`, `components/price-calculator.tsx`, `components/diagnostic-tool.tsx` | P2 | ✅ Completed | Both wrapped in `next/dynamic` with `CalculatorLoading` skeleton. |
| P2-07 | Accessibility | Booking form Name/Phone/Address fields missing htmlFor/id | `components/booking-form.tsx` | P2 | ✅ Completed | Added id="booking-name", id="booking-phone", id="booking-address" with matching htmlFor. Verified. |

---

## Priority 3 — Medium

| ID | Category | Problem | File(s) | Priority | Status | Notes |
|---|---|---|---|---|---|---|
| P3-01 | Accessibility | `text-slate-400` (#94a3b8) on white = 2.56:1 fails WCAG AA (needs 4.5:1), used 195 times | All files | P3 | ✅ Completed | Grep 0 occurrences. |
| P3-02 | SEO | Duplicate FAQPage schema on homepage: one via HomepageAeoSchemas + one inline labeled HOMEPAGE-02 | `app/(en)/page.tsx`, `components/homepage-aeo-schemas.tsx` | P3 | ✅ Completed | Only one FAQPage via HomepageAeoSchemas (12 Qs). No second block. |
| P3-03 | Accessibility | Modal dialogs lacked keyboard trap / Escape handling | `components/exit-intent-popup.tsx` (removed), `components/navbar.tsx` | P3 | ✅ Completed | Exit-intent popup removed. Navbar has Escape handler. No other modals. |
| P3-04 | Content | Window unit pricing inconsistency also in JSON-LD FAQ schemas fed to AI | Same as P1-03 | P3 | ✅ Completed | Part of P1-03 fix. |
| P3-05 | UX | Price comparison UI, other large components not code-split | `components/price-comparison.tsx`, `components/service-detail-i18n.tsx` | P3 | ✅ Completed | **Round 5 (Reviewed — no split needed):** Bundle analysis done. `service-detail-i18n.tsx` (115 KB) is a pure Server Component (no `use client`, no hooks) → ships 0 KB to client bundle; dynamic split irrelevant. `price-comparison.tsx` is only 16 KB / 226 lines, rendered below-the-fold; `next/dynamic` split would save negligible bytes vs. extra request overhead. The two genuinely heavy client components (PriceCalculator, DiagnosticTool) are already code-split on the homepage. Decision: keep static imports. |

---

## Priority 4 — Low / Future

| ID | Category | Problem | File(s) | Priority | Status | Notes |
|---|---|---|---|---|---|---|
| P4-01 | Security | No Content-Security-Policy header | `next.config.mjs` | P4 | ✅ Completed | CSP_ENFORCED + CSP_REPORT_ONLY present, upgrade-insecure-requests, no unsafe-eval in enforced. |
| P4-02 | Fonts | Decide deliberately on fonts question rather than placeholder | `config/fonts.ts` | P4 | ✅ Completed | Same as P2-03 – documented decision. |
| P4-03 | Performance | Swap googleapis → @googleapis/calendar | `lib/google-calendar.ts`, `package.json` | P4 | ✅ Completed | **Round 4:** Fully installed `@googleapis/calendar` and uninstalled heavy `googleapis` package. Updated `lib/google-calendar.ts` to use `@googleapis/calendar` auth client and calendar client. |
| P4-04 | Performance | Confirm @heroui/styles still needed | `styles/globals.css` | P4 | ✅ Completed | Confirmed needed – base styles. |

---

## Verification Checklist

- [x] `npm run gen:site-public` passes (25.3 KB, includes window rows)
- [x] `grep -r "text-slate-400" --include="*.tsx" --include="*.ts" | wc -l` == 0 (verified 0)
- [x] `grep -rn "window.*RM 180" --include="*.ts" --include="*.tsx" -i | grep -v "chemical" | grep -v "capacitor"` == 0
- [x] Homepage /ms and /zh use locale prop (`app/(ms)/ms/page.tsx` returns `<Home locale="ms" />`)
- [x] **Round 3:** Hero, WhyChooseUs, ServicesWithPricing, GoogleReviews accept `locale` prop and pass it from `app/(en)/page.tsx` HomeContent
- [x] Areas hub forcedLang passed (en/ms/zh)
- [x] `lib/supabase.ts` first line is `import "server-only"`
- [x] `app/api/admin/login/route.ts` imports rateLimit
- [x] `package.json` has prebuild -> gen:site-public
- [x] `app/(en)/page.tsx` uses dynamic() for calculators
- [x] `lib/google-calendar.ts` uses dynamic import and server-only
- [x] `npm run typecheck` passes with zero errors (`tsc --noEmit`).
- [x] `npm run build` passes with 2,131 static pages compiled in 40s.
- [x] `npm run lint` passes with zero errors.
- [x] `npm run verify:routes` and `npm run verify:build` pass with zero errors.
- [x] `npm run verify:sanitizer` passes with 261 blog bodies verified.
- [x] Multilingual route parity implemented: `/ms/book`, `/zh/book`, `/ms/privacy-policy`, `/zh/privacy-policy`.

---

## Round History

### Round 1 — Aug 5 Audit → Prior Fixes (already in main branch before this session)
- P1-04, P1-05, P2-01, P2-02, P2-06, P2-07, P3-01, P3-02, P3-03, P4-01 completed by previous dev sessions.

### Round 2 — Aug 6 2026
**Completed:**
- P1-03 pricing unified across 15 files + pricing table + regenerated site-public.
- P2-04 googleapis optimized to lazy dynamic import + server-only guard.
- P2-03 / P4-02 fonts decision documented explicitly.
- P2-05 / P4-04 @heroui/styles verified as needed.

### Round 3 — Aug 6 2026
**Completed:**
- **P1-01 enhancement:** Closed remaining gap where Hero, WhyChooseUs, ServicesWithPricing, GoogleReviews still used `useLang()` without locale, causing MS/ZH server HTML to remain English above-the-fold despite homepage locale fix. Now all four accept `locale?: Lang` and read `translations[locale]` directly, falling back to context only for unprefixed /.
- Verified `app/(en)/page.tsx` HomeContent passes `locale` to all 6 locale-sensitive sections.

### Round 5.1 — Aug 6 2026 (Dead File Cleanup)
**Completed:**
- **Deleted 3 dead files:** `config/site-area-pages.ts` (1,888-line stale duplicate of `config/site/areas.ts` — identical content, zero imports), `config/sitemap-registry.ts` (29-line unused sitemap experiment; real logic lives in `lib/sitemap.ts`), `lib/i18n/routing.ts` (44-line unused migration re-export shim; `lib/i18n/` dir removed).
- **Verified NOT dead (kept):** all 90 hero `.webp` images (each referenced in config), `public/logo/image.png`, SEO verification files (`BingSiteAuth.xml`, `google*.html`, `e7492*.txt`), PWA icons/manifest, `public/.well-known/ai-plugin.json`, `scripts/sql/add-booking-notes.sql` (DB migration record for the live `notes` column), all 7 scripts referenced from `package.json`.
- **Post-deletion verification:** typecheck ✅, lint ✅, verify:routes ✅, verify:sanitizer ✅ (261 bodies), build ✅ (2,131 pages), verify:build ✅ — all green.

### Round 5 — Aug 6 2026 (Current Session)
**Completed:**
- **Full-suite re-verification:** `npm run typecheck` ✅ (0 errors), `npm run lint` ✅ (0 errors), `npm run verify:routes` ✅ (30 dynamic route contracts), `npm run verify:sanitizer` ✅ (261 blog bodies), `npm run build` ✅ (2,170 app routes / 2,124 sitemap URLs compiled clean), `npm run verify:build` ✅. No `.bak`/leftover files, no TODO/FIXME markers in source, working tree clean.
- **P3-05 closed:** Bundle review evidence — `service-detail-i18n.tsx` is a Server Component (zero client JS), `price-comparison.tsx` is 16 KB below-the-fold (split gain negligible). Static imports kept deliberately.

### Round 4 — Aug 6 2026
**Completed:**
- **P1-06 Multilingual Parity:** Created `/ms/book`, `/zh/book`, `/ms/privacy-policy`, and `/zh/privacy-policy` with natural, context-aware translations.
- **P4-03 Package Optimization:** Migrated `googleapis` to `@googleapis/calendar`, reducing dependency footprint.
- **Build & Memory Hardening:** Added `NODE_OPTIONS='--max-old-space-size=4096'` to `package.json` build scripts ensuring all 2,131+ static pages compile reliably without V8 memory exhaustion.
- **Sitemap & Route Synchronization:** Updated `lib/sitemap.ts` and `scripts/verify-build.mjs` for trilingual booking and legal pages.
- **Navbar & Footer Localization:** Updated language switcher mappings and footer links to route properly across English, Malay, and Chinese.
- **Sanitizer Verification:** Added `verify:sanitizer` to test script suite.
- **Roadmap Creation:** Created permanent single source of truth `AI_OPTIMIZATION_ROADMAP.md`.

---

## Next Steps (for continuous monitoring)

1. Monitor Search Console for new multilingual URL indexing.
2. Maintain `AI_OPTIMIZATION_ROADMAP.md` as the master tracking document.
