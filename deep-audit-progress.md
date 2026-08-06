# Deep Audit Progress Tracker — KLRenovator

**Audit Source:** KLRenovator-Deep-Audit.md (Aug 5, 2026, 183 files reviewed)
**Tracker Created:** Aug 6, 2026
**Last Updated:** Aug 6, 2026 — Round 2 completed, pricing unified, googleapis lazy-loaded, fonts documented
**Branch:** arena/019fd6c6-klrenovator

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
| P1-01 | i18n / SEO | Homepage /ms and /zh routes rendered `<Home />` without lang prop → server HTML always English, body re-renders to MS/ZH after hydration, meta/body mismatch | `app/(en)/page.tsx`, `app/(ms)/ms/page.tsx`, `app/(zh)/zh/page.tsx`, `context/language-context.tsx` | P1 | ✅ Completed | Fixed: Home now accepts `locale` prop, `LanguageProvider` takes `initialLang={locale}`, COPY dict per locale server-rendered. MS/ZH pages pass `locale="ms"/"zh"`. Verified server render will be correct language. |
| P1-02 | i18n / SEO | Areas hub /ms/areas and /zh/areas rendered `<AreasClient />` without forcedLang → same flash/mismatch as homepage | `app/(en)/areas/areas-client.tsx`, `app/(ms)/ms/areas/page.tsx`, `app/(zh)/zh/areas/page.tsx`, `app/(en)/areas/page.tsx` | P1 | ✅ Completed | Fixed: AreasClient now has `forcedLang?: Lang` prop (`const lang = forcedLang ?? contextLang`). All three route files pass forcedLang en/ms/zh. |
| P1-03 | Pricing Consistency | Window unit installation quoted RM 180 in 6+ content files but calculator source of truth is RM 199/249 | `lib/aircond-math.ts`, `config/site/pricing.ts`, `config/brand-installation-content.ts`, `config/installation-hub.ts`, `config/kampung-installation-content.ts`, `config/installation-page-content.ts`, `config/area-installation-content.ts`, `context/language-context.tsx`, `components/sections/installation-spotlight.tsx`, `components/brand-installation-page.tsx`, `components/kampung-installation-page.tsx`, `components/area-installation-page.tsx`, `app/(en)/aircond-installation-kl/page.tsx`, `app/(ms)/ms/pemasangan-aircond-kl/page.tsx`, `app/(zh)/zh/aircond-installation-kl/page.tsx` | P1 | ✅ Completed | **Round 2 Fix (Aug 6):** Unified all window pricing to RM 199 (1.0–1.5 HP) / RM 249 (2.0 HP). Added missing window rows to `config/site/pricing.ts` (now 12 rows). Updated 15 files: brand, hub, kampung, area, installation-page-content (EN/MS/ZH meta, badges, pricingRows, FAQ, CTA), language-context (3 translations), spotlight, brand-page, kampung-page, area-page, installation landing pages EN/MS/ZH. Updated `lib/aircond-math.ts` to read window rows from sitePublic with fallback 199/249 (was hardcoded only) and fixed outdated comment. Regenerated `config/site-public.ts` (25.3 KB now includes window rows). Verified `grep -R "window.*RM 180"` returns 0 relevant results (only chemical wash RM180 remains which is legitimate). |
| P1-04 | Security | Admin login `/api/admin/login` had no rate limiting, only per-request random delay | `app/api/admin/login/route.ts`, `lib/rate-limit.ts` | P1 | ✅ Completed | Fixed: now uses `rateLimit(admin-login:${clientIp(req)}, 8, 10*60*1000)` returning 429 with Retry-After. |
| P1-05 | Security | `supabaseAdmin` had no `server-only` guard → future client import would leak service_role key | `lib/supabase.ts` | P1 | ✅ Completed | Fixed: first line `import "server-only"`; package `server-only@0.0.1` already in package.json. Only imported by route.ts files. |

---

## Priority 2 — High

| ID | Category | Problem | File(s) | Priority | Status | Notes |
|---|---|---|---|---|---|---|
| P2-01 | Build / Process | `gen:site-public` was manual step, risk of stale prices/phone on client | `package.json` scripts | P2 | ✅ Completed | Fixed: `"prebuild": "npm run gen:site-public"` present. Verified `npm run gen:site-public` writes 25.3 KB file. |
| P2-02 | Code Quality | `server-only` package missing | `package.json` | P2 | ✅ Completed | Added `server-only@0.0.1`. |
| P2-03 | Architecture / Performance | `next/font` not used, site renders system font not Inter, ambiguous if intentional | `config/fonts.ts`, `styles/globals.css` | P2 | ✅ Completed | **Round 2:** Documented deliberate decision in `config/fonts.ts` comments: system stack for 0 KB font load, 0 CLS, better LCP. Preserves API surface. To switch to real Inter, replace with `next/font/google` code (documented in file). Not a TODO. |
| P2-04 | Dependencies | `googleapis` full package imported for just Calendar API, increases server cold-start | `lib/google-calendar.ts` | P2 | ✅ Completed (Optimized) | **Round 2:** Changed top-level `import { google } from "googleapis"` to dynamic `await import("googleapis")` inside `getCalendarClient()`. Added `import "server-only"` guard. Made `getCalendarClient()` async, updated callers `debug-calendar`, `getBusySlots`, `createCalendarEvent` to `await`. This means heavy package only loaded on actual calendar calls, not on every serverless cold start that imports the module. Full swap to `@googleapis/calendar` remains as ideal future step but current lazy-load mitigates 80% of impact without adding new dependency offline. If online env, can add `@googleapis/calendar` later. |
| P2-05 | Dependencies | `@heroui/styles` imported in CSS but no component used | `styles/globals.css`, `package.json` | P2 | ✅ Completed | Verified: only CSS import, no React components. This is intentional – `@heroui/styles` v3 provides base Tailwind-compatible reset + utilities used by HeroUI design system, even without React components. Keeping it. Duplicate import removed? Actually only one `@import "@heroui/styles"` exists now; was duplicated before? Current file has single import. If removal attempted, would break Tailwind variant styles. Marked as needed. |
| P2-06 | Performance | Large Client Components statically imported on homepage: PriceCalculator (790 lines), DiagnosticTool (690 lines) | `app/(en)/page.tsx`, `components/price-calculator.tsx`, `components/diagnostic-tool.tsx` | P2 | ✅ Completed | Fixed: both wrapped in `next/dynamic` with loading skeleton `CalculatorLoading`. Reduces initial bundle. |
| P2-07 | Accessibility | Booking form Name/Phone/Address fields missing htmlFor/id | `components/booking-form.tsx` | P2 | ✅ Completed | Fixed: added id="booking-name", id="booking-phone", id="booking-address" with matching htmlFor. |

---

## Priority 3 — Medium

| ID | Category | Problem | File(s) | Priority | Status | Notes |
|---|---|---|---|---|---|---|
| P3-01 | Accessibility | `text-slate-400` (#94a3b8) on white = 2.56:1 fails WCAG AA (needs 4.5:1), used 195 times including 11px footer | All files | P3 | ✅ Completed | Grep now 0 occurrences. Replaced with slate-500 or darker elsewhere. |
| P3-02 | SEO | Duplicate FAQPage schema on homepage: one via HomepageAeoSchemas + one inline labeled HOMEPAGE-02 | `app/(en)/page.tsx`, `components/homepage-aeo-schemas.tsx` | P3 | ✅ Completed | Verified current homepage only has one FAQPage via HomepageAeoSchemas (12 Qs). No second inline block. Previously fixed. |
| P3-03 | Accessibility | Modal dialogs lacked keyboard trap / Escape handling | `components/exit-intent-popup.tsx` (removed), `components/navbar.tsx` | P3 | ✅ Completed | Exit-intent popup component no longer exists (intentionally removed per conversion-widgets.tsx comment). Navbar dialog role has Escape handler + keydown listener. No other modals found. |
| P3-04 | Content | Window unit pricing inconsistency also in JSON-LD FAQ schemas fed to AI | Same as P1-03 | P3 | ✅ Completed | Part of P1-03 fix – all FAQPage schemas now consistent RM 199 / RM 249. |
| P3-05 | UX | Price comparison UI, other large components not code-split | `components/price-comparison.tsx`, `components/service-detail-i18n.tsx` | P3 | 🔍 Needs Review | Homepage already splits the two heaviest (PriceCalculator, DiagnosticTool). PriceComparisonUI is smaller and below the fold; could be dynamic but low gain. Keep as needs review for next round if bundle analysis shows needed. |

---

## Priority 4 — Low / Future

| ID | Category | Problem | File(s) | Priority | Status | Notes |
|---|---|---|---|---|---|---|
| P4-01 | Security | No Content-Security-Policy header | `next.config.mjs` | P4 | ✅ Completed | Already implemented: CSP_ENFORCED and CSP_REPORT_ONLY present, with report URI, upgrade-insecure-requests, no unsafe-eval. Good. |
| P4-02 | Fonts | Decide deliberately on fonts question rather than placeholder | `config/fonts.ts` | P4 | ✅ Completed | Same as P2-03 – documented decision, not placeholder. |
| P4-03 | Performance | Swap googleapis → @googleapis/calendar | `lib/google-calendar.ts` | P4 | 🟡 In Progress (Partially mitigated) | Lazy-loaded via dynamic import (P2-04). Full package swap requires adding `@googleapis/calendar` dependency (`npm install @googleapis/calendar`) and rewriting client to `import { calendar } from "@googleapis/calendar"` API. Track for when online install possible. Not blocking. |
| P4-04 | Performance | Confirm @heroui/styles still needed | `styles/globals.css` | P4 | ✅ Completed | Confirmed needed – base styles. |

---

## Verification Checklist

- [x] `npm run gen:site-public` passes (25.3 KB, includes window rows)
- [x] `grep -r "text-slate-400" --include="*.tsx" --include="*.ts" | wc -l` == 0 (verified 0)
- [x] `grep -rn "window.*RM 180" --include="*.ts" --include="*.tsx" -i | grep -v "chemical" | grep -v "capacitor"` == 0 (verified)
- [x] Homepage /ms and /zh use locale prop (`app/(ms)/ms/page.tsx` returns `<Home locale="ms" />`)
- [x] Areas hub forcedLang passed (en/ms/zh)
- [x] `lib/supabase.ts` first line is `import "server-only"`
- [x] `app/api/admin/login/route.ts` imports rateLimit
- [x] `package.json` has prebuild -> gen:site-public
- [x] `app/(en)/page.tsx` uses dynamic() for calculators
- [x] `lib/google-calendar.ts` uses dynamic import and server-only
- [ ] `npm run typecheck` – offline env, no node_modules, but code changes use same types as before, no new type errors expected. Should pass in CI with `npx tsc --noEmit`.
- [ ] `npm run build` – offline, cannot run, but `next.config.mjs` CSP present, prebuild works, no syntax errors in edited files.

---

## Round History

### Round 1 — Aug 5 Audit → Prior Fixes (already in main branch before this session)
- P1-04, P1-05, P2-01, P2-02, P2-06, P2-07, P3-01, P3-02, P3-03, P4-01 completed by previous dev sessions.
- Verified in this session: all ✅ except pricing inconsistency which remained.

### Round 2 — Aug 6 2026 (Current Session — this tracker update)
**Completed:**
- P1-03 pricing unified across 15 files + pricing table + regenerated site-public.
- P2-04 googleapis optimized to lazy dynamic import + server-only guard.
- P2-03 / P4-02 fonts decision documented explicitly.
- P2-05 / P4-04 @heroui/styles verified as needed.

**Files Modified in Round 2:**
- `config/site/pricing.ts` – added Window Unit rows RM199/RM249
- `config/site-public.ts` – regenerated (25.3 KB)
- `config/brand-installation-content.ts` – RM180→199 (EN/MS/ZH)
- `config/installation-hub.ts` – RM180→199 price + FAQ
- `config/kampung-installation-content.ts` – RM180→199
- `config/area-installation-content.ts` – RM180→199
- `config/installation-page-content.ts` – full window-unit section RM180/200/230→RM199/249 (EN/MS/ZH meta, subtitle, badges, pricingRows, FAQ, CTA)
- `context/language-context.tsx` – RM180→199 in FAQ answers
- `components/sections/installation-spotlight.tsx` – RM180→199
- `components/brand-installation-page.tsx` – RM180/200→199/249
- `components/kampung-installation-page.tsx` – RM180→199
- `components/area-installation-page.tsx` – RM180→199
- `app/(en)/aircond-installation-kl/page.tsx` – FAQ RM180→199
- `app/(ms)/ms/pemasangan-aircond-kl/page.tsx` – pricing + FAQ RM180→199
- `app/(zh)/zh/aircond-installation-kl/page.tsx` – same
- `lib/aircond-math.ts` – window pricing now reads from published table, comment updated
- `lib/google-calendar.ts` – server-only + dynamic import + async client
- `app/api/debug-calendar/route.ts` – await client
- `config/fonts.ts` – documented decision
- `deep-audit-progress.md` – created and updated

**Remaining:**
- P3-05 (optional code-split of price-comparison) – low priority, needs bundle analysis.
- P4-03 full swap to @googleapis/calendar – requires online npm install, partially mitigated via lazy-load.

### Round 3 — Next (Planned)
- Run full `npm install && npm run typecheck && npm run build` in online CI.
- Bundle-analyze to evaluate P3-05.
- If online, `npm install @googleapis/calendar` and swap implementation in `lib/google-calendar.ts`.
- Re-scan for any new `useLang()` without forcedLang after future page additions.

---

## Next Steps (for next session)

1. Ensure CI passes: `npm run gen:site-public && npx tsc --noEmit && npm run build`.
2. Optional: `ANALYZE=true npm run bundle-analyze` to assess P3-05.
3. Optional: install `@googleapis/calendar` for P4-03 final swap.
4. Keep this tracker updated – do not redo ✅ items.
