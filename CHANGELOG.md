# CHANGELOG — KL Renovator

This file collects historical "Round" implementation notes that were previously scattered as inline comments across `next.config.mjs` and page components. Per audit item P3-02, verbose history has been moved here to keep source files focused on current invariants.

## Next.js Config History

- **Round 13 / 20F.51 (2026-07-06)**: Introduced Malay URL slug aliases `/servis/*` → canonical `/ms/services/*` to capture Bahasa Malaysia search queries (cuci aircond KL, servis aircond murah, harga pasang aircond). Preserves EN/MS canonical routes and SEO equity.
- **Round 16 / 20H.80**: Added real mobile viewport widths (360,414,640,750,828,1080,1200,1920) to `images.deviceSizes` so homepage hero and full-width images do not force 640px+ variants on 360–414px phones.
- **Round 23 / 20F.50**: Cuci Aircond KL dedicated landing — top-volume native search queries now resolve to dedicated trilingual `/cuci-aircond-kl` cluster landing pages instead of generic `/ms/services/chemical-wash`. Old redirect `/cuci-aircond-kl` → `/ms/services/chemical-wash` removed to allow 200 OK.
- **Round 25 / 20F.53**: Malay aliases now point to dedicated installation price landing (`/harga-pasang-aircond`, `/pasang-aircond`, `/installation-price` → `/installation-price-malaysia` variants).
- **Round 50 / 20G.77**: Malay aliases for Harga Servis Aircond 2026 pricing guide (`/harga-servis-aircond`, `/harga-servis-aircond-2026`, etc → `/aircond-service-price-malaysia`).

## Performance & SEO History

- **Round 20B.13**: Sitemap hygiene — keep `<lastmod>` stable tied to latest content deployment instead of changing on every build.
- **Round 20F.50**: Cuci Aircond KL landing launch — sitemap updated 2026-07-07.
- **Round 20G.77**: Fixed malformed OG image URLs across 768 installation landing pages.
- **Round 20H.80**: LCP image predictable on mobile — `svh` avoids mobile browser address-bar vh jumps; 360/414 device sizes added; tiny neutral blur placeholder prevents blank flash.
- **Round 20H.84**: Keep area page LocalBusiness schema.
- **Round 20D.33 / 20D.34**: Area page uniqueness matrix for every sub-area route; Brand + Area combo linking module.
- **Round 28 / 20F.57**: Per-area intent sections (Aircond Not Cold / Tak Sejuk / 不冷).
- **Round 31 / 20D.33**: Area page uniqueness matrix for localized sub-area routes.
- **Round 32 / 20D.34**: Brand + Area combo linking module.
- **Round 33-38 / 8.x**: Service pages core polish, SXO/CRO, AIO/LLMO compact answer blocks, semantic SEO & HVAC entity pass, visual SXO polish.
- **Round 39 / 8.10**: Route QA — exclude only routes that have own pages.
- **Round 51 / 10.1-10.6**: Blog → Problem reverse links, Problem → Blog reverse guides, Brand → Service reverse links.
- **Round 52 / 10.8**: Entity Hub clusters around core HVAC problems, Brand → Service reverse links.
- **Round 70 / INS-08 + INS-09**: Per-HP and per-type installation pages; sitemap updated 2026-07-15.
- **Round 10.5**: Triangular cross-links (Brands, Areas, Common Problems) in area/brand/problem pages.
- **Round 10.10**: Click-depth — popular price guides at 1-click depth.

## Security & Audit History

- **P0-04**: CSP Report-Only rollout — policy designed to be enforceable but sent as `Content-Security-Policy-Report-Only` so site keeps working while browsers report violations to `/api/csp-report`. `unsafe-inline` remains in script-src because GTM, Clarity, GA4 and JSON-LD blocks are inline; enforcement (nonce/hash) tracked as P0-04b in DEEP_WEBSITE_AUDIT.md. Violations must be reviewed for one full production cycle before enforcement.
- **P0-04b**: CSP enforcement prep — `CSP_REPORT_LOG`, collector ready; enforcement blocked by production violation-cycle review (2026-08-05).
- **P2-11**: Opaque errors implemented in `indexnow`, `debug-calendar`, `debug-supabase`; server-side logging added.
- **P2-01**: Production rate limit note added to `lib/rate-limit.ts` — atomic Upstash Redis REST adapter with bounded local fallback.
- **P0-01/P0-08**: Moved EN, MS, ZH route trees under independent locale root layouts. `<html lang>` now server-rendered (`en-MY`, `ms-MY`, `zh-MY`) and global navbar/footer receive matching initial locale before hydration.
- **P0-03/P2-01**: Replaced in-memory-only limiter with Upstash Redis REST adapter.
- **P1-03**: Installed `@next/bundle-analyzer`, documented RUM, removed nonessential exit/scroll/drifting lead overlays.
- **P1-04**: Added `DATA_GOVERNANCE_RUNBOOK.md` with staff access, retention, deletion, incident procedures.
- **P2-06/P2-07**: Added deployed sitemap crawler (`npm run crawl:deployed`) and route-contract check (`npm run verify:routes`). All 30 dynamic route modules now use `dynamicParams = false`.
- **P3-03**: Removed all production `as any` escape hatches with typed area FAQ input.
- **P3-01**: `tsconfig.json` target updated from `es5` to `ESNext`.
- **P3-04**: `public/llms.txt` rewritten — removed promotional claims, accurate server-rendered description.

## Homepage History

- **HOMEPAGE-01/02**: AI-Ready Installation Q&A data and FAQPage schema, homepage-specific Service schema, OfferCatalog.
- **Installation**: Primary revenue service surfaced under hero instead of small card 8 sections down.

## Batch Shipments

- **Batch 26 (2026-06-19)**: Putrajaya + Cyberjaya cluster — Presint 1–20, NeoCyber, City Centre, Tamarind Square.
- **Batch 27 (2026-06-20+)**: Additional residential sub-areas — Batu 9, Batu 11, Miharja, Taman Mutiara, SS16, Taipan, Brickfields, Taman Wahyu, Tropicana, Elmina, Eco Ardence, Kemuning Utama, Telok Panglima Garang, Taman Muda, Taman Wawasan, Taman Desa, Salak South, Pantai Dalam, Taman AU, Damansara Damai, Duta Nusantara, Desa Jaya, Bandar Baru Klang, Port Klang, Cheras Baru, Taman Kajang Maju, Taman Batu Muda, Taman Selayang, Taman Rawang Perdana, Kundang, Serendah, Semenyih Town, Taman Pelangi Semenyih, Bangi Lama, Taman Selayang Baru, Taman Len Seng, Jade Hills, Taman Sri Muda, Taman Setapak, Dengkil, HICOM Glenmarie, Taman Ehsan, etc.

## Current Invariants (Concise)

- English is default locale at root path; Malay at `/ms/*`, Chinese at `/zh/*` where real pages exist.
- Sitemap includes only URLs with real route files; review pages (noindex conversion-only) excluded.
- Non-www → www redirect is 301; Malay short-URLs 301 to canonical localized pages.
- Images: AVIF/WebP, deviceSizes include 360,414,640,750,828,1080,1200,1920, mobile hero uses `svh` and blur placeholder.
- Security headers: HSTS, XFO SAMEORIGIN, nosniff, strict-origin-when-cross-origin, Permissions-Policy camera/mic/geolocation, CSP Report-Only with report-to endpoint `/api/csp-report`.
- Booking availability validates real MYT date, lead window, 480-min max, rejects malformed input, excludes elapsed slots, throttled.
- Supabase admin client fails closed when server config missing; IndexNow trigger fails closed without secret.
- Blog HTML sanitized server-side before `dangerouslySetInnerHTML`.
- All dynamic route modules export `generateStaticParams` + `dynamicParams = false`.
- Homepage fully server-rendered per locale with independent root layouts and `<html lang>` en-MY/ms-MY/zh-MY; no client JS text-swap for indexable content (P0-01 fixed 2026-08-05).
- Config split into typed domain collections (config/site/*) — P2-03.
- Sitemap generated from typed registry with content-aware dates — P2-05 (2026-08-05).

## 2026-08-06 — Deep audit implementation phase

- Archived the new audit as `docs/DEEP_WEBSITE_AUDIT-2026-08-05.md` without replacing the previous `DEEP_WEBSITE_AUDIT.md`.
- Added `docs/IMPLEMENTATION-TRACKER.md` as the master tracker for both audits.
- Re-verified prior locale SSR, admin throttling, booking labels, CSP, and server validation work.
- Standardized window-unit installation references to the calculator/source-of-truth price of RM199.
- Added a `server-only` guard for the privileged Supabase module and automatic `site-public` generation before builds.
- Removed the duplicate homepage FAQPage JSON-LD graph and improved readable slate text contrast.
