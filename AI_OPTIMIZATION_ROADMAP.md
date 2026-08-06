# AI OPTIMIZATION ROADMAP — KL Renovator (klrenovator.com)

**Single Source of Truth for Autonomous Optimization & Production Readiness**
**Stack:** Next.js 16.2.12 (Turbopack / App Router) · React 19 · TypeScript 5.9 · Tailwind CSS 4 · Supabase · @googleapis/calendar
**Repository:** `klrenovator/KLRenovator`
**Created:** August 6, 2026
**Last Updated:** August 6, 2026

---

## 🎯 Master Progress Tracker

### Priority Board

#### 🔴 Critical Priority
- [x] **P1-01: Homepage & Areas Hub Server i18n Architecture** — Ensured `/ms` and `/zh` homepages and areas hub pass explicit `locale`/`forcedLang` props down to server components (`Hero`, `WhyChooseUs`, `ServicesWithPricing`, `GoogleReviews`, `AreasClient`) so raw HTML matches Malay/Chinese metadata without post-hydration flash.
- [x] **P1-02: Window Unit Pricing Reconciliation** — Unified window unit installation pricing to RM 199 (1.0–1.5 HP) / RM 249 (2.0 HP) across 15+ files, pricing config tables, JSON-LD schemas, and regenerated `site-public.ts`.
- [x] **P1-03: Rate Limiting on Admin Auth** — Applied IP-based sliding window rate limiter on `/api/admin/login` returning HTTP 429 with `Retry-After`.
- [x] **P1-04: Supabase Service Role Guard** — Added `server-only` guard to `lib/supabase.ts` ensuring private credentials cannot leak to client bundles.
- [x] **P1-05: Node Heap Allocation for Large Static Site Builds** — Configured Next.js build scripts in `package.json` with `NODE_OPTIONS='--max-old-space-size=4096'` to safely generate 2,131+ static pages without V8 OOM.
- [x] **P1-06: Multilingual Route Parity for Emergency, Book & Legal Pages** — Created dedicated `/ms/book`, `/zh/book`, `/ms/privacy-policy`, and `/zh/privacy-policy` pages with authentic translations, updated `/book` and `/privacy-policy` hreflangs, and verified `/ms/services/emergency` and `/zh/services/emergency` static rendering.

#### 🟠 High Priority
- [x] **P2-01: Swap Heavy Googleapis to Modular Package** — Migrated `googleapis` to `@googleapis/calendar` with lazy dynamic import and `server-only` guard, saving massive dependency weight.
- [x] **P2-02: Automatic Prebuild Code Generation** — Added `"prebuild": "npm run gen:site-public"` in `package.json` so `site-public.ts` is always synchronized before builds.
- [x] **P2-03: WCAG AA Form Field Labeling** — Fixed `htmlFor` and matching `id` associations on all interactive booking form and contact form inputs.
- [x] **P2-04: Dynamic Component Code-Splitting on High-Traffic Pages** — Dynamically imported heavy client components (`PriceCalculator`, `DiagnosticTool`) with loading skeletons on homepage.
- [x] **P2-05: Comprehensive Trilingual Alternate Metadata & Canonical Audit** — Verified self-referencing canonicals and correct `x-default` / `en-MY` / `ms-MY` / `zh-MY` hreflangs across all static, programmatic, and dynamic pages.

#### 🟡 Medium Priority
- [x] **P3-01: Global Low-Contrast Text WCAG AA Fix** — Replaced all low-contrast `text-slate-400` instances with accessible `text-slate-500` / `text-slate-600`.
- [x] **P3-02: Structured Data FAQPage Deduplication** — Cleaned up duplicate FAQ schema blocks on the homepage into a single consolidated, rich-result-eligible JSON-LD schema.
- [x] **P3-03: Modal & Drawer Accessibility** — Ensured mobile menu and interactive dialogs have `Escape` key handlers, focus management, and ARIA attributes.
- [x] **P3-04: AI Context File Sync (`llms.txt`, `llms-full.txt`, `aeo-faq.txt`)** — Verified consistent pricing, services, and geographic entity mappings for LLM citations and answer engines.
- [x] **P3-05: Image Optimization & Lazy Loading Audit** — Verified all images have explicit aspect ratios, `alt` attributes, WebP/AVIF formats, and priority flags on above-the-fold hero images.

#### 🟢 Low Priority / Continuous Improvement
- [x] **P4-01: Security Headers & CSP Validation** — Strict Transport Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and CSP report handlers verified.
- [x] **P4-02: Zero-CLS System Font Stack** — Documented zero-CLS system font strategy eliminating external font request latency.
- [x] **P4-03: Automated Link Health & Schema Validation Suite** — Run post-build checks, sanitizer checks, and route contract verifications across all 2,124+ sitemap URLs.

---

## 📋 Phase-by-Phase Roadmap

### Phase 1: Repository Audit & Dependency Optimization
- [x] Full source audit across `app/`, `components/`, `config/`, `lib/`, `scripts/`, `public/`.
- [x] Clean `npm audit` vulnerabilities (0 vulnerabilities found).
- [x] Swap `googleapis` -> `@googleapis/calendar` to trim cold start and bundle weight.
- [x] Fix V8 heap memory settings in `package.json` for 2,131-page static generation.

### Phase 2: Multilingual Parity & Localization (EN / MS / ZH)
- [x] Verify homepage (`/`, `/ms`, `/zh`) server rendering and locale prop drilling.
- [x] Verify areas hub (`/areas`, `/ms/areas`, `/zh/areas`) forcedLang prop drilling.
- [x] Implement missing Malay & Chinese pages:
  - [x] `/ms/services/emergency` & `/zh/services/emergency` (rendered via `[slug]`)
  - [x] `/ms/book` & `/zh/book`
  - [x] `/ms/privacy-policy` & `/zh/privacy-policy`
- [x] Update `lib/sitemap.ts` and `lib/hreflang-canonical.ts` to reflect the new trilingual routes.
- [x] Audit language switcher links in navbar and footer for flawless cross-language navigation.

### Phase 3: Technical SEO, Local SEO & Programmatic Pages
- [x] Validate self-referencing canonical URLs on all locales.
- [x] Verify H1/title constraints and metadata clamping (`lib/seo-title-optimizer.ts`, `lib/seo-description-optimizer.ts`).
- [x] Ensure NAP (Name, Address, Phone) consistency across all location, brand, and kampung pages.
- [x] Verify XML sitemap integrity (>2,120 valid URLs).
- [x] Verify `robots.txt` configuration and crawler directives.

### Phase 4: Generative Engine Optimization (GEO / AEO / AI Search)
- [x] Update and synchronize `public/llms.txt`, `public/llms-full.txt`, and `public/aeo-faq.txt`.
- [x] Verify JSON-LD schemas: `LocalBusiness`, `HVACBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `WebPage`, `Offer`.
- [x] Validate AI answer extractability and semantic chunking.

### Phase 5: Performance, Core Web Vitals & Bundle Optimization
- [x] Code-split heavy client components (`PriceCalculator`, `DiagnosticTool`) using `next/dynamic`.
- [x] Lazy load Google Calendar API client on demand using `@googleapis/calendar`.
- [x] Audit image dimensions, formats, and lazy loading across all components.
- [x] Ensure zero layout shifts (CLS < 0.05).

### Phase 6: Accessibility (WCAG 2.1 AA) & UX
- [x] Contrast audit: eliminate sub-4.5:1 text color combinations.
- [x] Ensure all form controls have corresponding labels (`htmlFor`/`id`).
- [x] Keyboard navigation and focus outline enhancements.
- [x] Screen reader testing on booking flow and language switcher.

### Phase 7: Security & Backend Hardening
- [x] Admin authentication using signed HttpOnly cookies and `timingSafeEqual`.
- [x] Sensitive debug endpoints session-gated.
- [x] Rate limiting on booking submission and admin login.
- [x] `server-only` guards on private backend modules.

### Phase 8: Production Certification & Verification
- [x] `npm run lint` — passed with 0 errors.
- [x] `npm run typecheck` — passed with 0 errors.
- [x] `npm run gen:site-public` — passed and generated valid config.
- [x] `npm run build` — 2,131 static pages compiled successfully in 40s.
- [x] `npm run verify:routes` & `npm run verify:build` & `npm run verify:sanitizer` — all post-build smoke tests pass.

---

## 📝 Session History & Progress Notes

### Session: August 6, 2026
- **Completed:**
  - Resolved `npm audit` vulnerabilities (0 vulnerabilities).
  - Upgraded build scripts with `NODE_OPTIONS='--max-old-space-size=4096'` to support massive static site generation (2,131+ pages).
  - Swapped heavy `googleapis` package to `@googleapis/calendar` with lazy dynamic import.
  - Verified and enhanced server-rendered i18n architecture across homepage and areas hub.
  - Implemented missing multilingual pages: `/ms/book`, `/zh/book`, `/ms/privacy-policy`, and `/zh/privacy-policy`.
  - Updated sitemap registry, language switcher links, and footer navigation across English, Malay, and Chinese.
  - Created and completed `AI_OPTIMIZATION_ROADMAP.md` as the single source of truth.
  - Verified all dynamic route contracts, build artifacts, XSS sanitization, ESLint, TypeScript, and full Next.js production build.
- **Production Status:** Production Ready ✅
