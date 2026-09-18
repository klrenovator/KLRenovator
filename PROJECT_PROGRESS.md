# KL Renovator — PROJECT_PROGRESS

Master plan: multilingual programmatic SEO / GEO / AEO / AI-search implementation.
Golden rule applied: AUDIT FIRST → VERIFY EXISTING WORK → GREEN-TICK CORRECT WORK → ADD ONLY WHAT IS MISSING.

Legend: 🟢 completed & verified · 🟡 needs improvement · 🔴 pending · ⚠️ requires review/approval
"🟢 ALREADY COMPLETED" = existed before this task and verified correct — left untouched.

---

## Phase 1 — Existing Website Audit 🟢 (complete)

- Routes/pages inventoried: 2,214 built HTML pages, 2,208 sitemap URLs, all resolving
- Trilingual parity verified: EN (root), MS (/ms, native slugs e.g. /ms/pemasangan-aircond-kl), ZH (/zh) — no missing public page in any language
- Business source of truth confirmed: `config/site/core.ts` (identity/NAP), `config/site/pricing.ts` + `config/services-data.ts` priceTables (pricing), `config/reviews.ts` (review figures), `config/site/areas.ts` (40 areas) + `config/site/kampungs.ts` (162)
- Build health: lint ✓ · typecheck ✓ · build ✓ · verify:routes (30 dynamic contracts) ✓ · verify:build ✓ · gsc-audit: no indexing blockers

## Phase 2 — Existing SEO Audit 🟢 (complete)

- Metadata: 0 titles > 60 chars; 0 missing/short/long descriptions; duplicate-title pair found → fixed
- Canonicals: self-referencing per locale (GSC-safe), verified in built HTML ✓
- Hreflang: en-MY / ms-MY / zh-MY / x-default clusters correct on sampled pages ✓
- Sitemap: 2,208 URLs with trilingual alternates ✓ · robots.txt: AI bots allowlisted ✓
- Schema: HVACBusiness + Organization sitewide, Service/Offer/OfferCatalog, FAQPage, HowTo, BreadcrumbList, WebSite/WebPage, GeoCircle areaServed ✓
- Internal linking: topical-authority map + orphan-cross-links (hashed anchors) + anchor diversity config ✓
- AI files: llms.txt, llms-full.txt, aeo-faq.txt (85 Q&A), ai-plugin.json, site-summary.json — present; factual corrections applied (see Phase 5)
- IndexNow endpoint + key ✓ · Bing/Google verification ✓ · noindex on /review + /admin ✓

## Phase 3 — Keyword Architecture 🟢 (complete — pre-existing)

- EN/MS/ZH keyword universes already mapped to pages (services, problems, areas, brands, tools, blog)
- One primary intent per page; no same-intent collisions detected (post-fix)
- Near-me handled as legitimate localized page + coverage content (no spam pages)

## Phase 4 — Programmatic Architecture 🟢 ALREADY COMPLETED

- Typed content registries (config/site/*), eligibility via generateStaticParams + dynamicParams=false contracts
- Page types: service, problem, area, kampung, brand, brand×area, installation variants, tools, blog
- Quality engine exists: uniqueness matrices, depth configs, FAQ uniqueness, anchor diversity

## Phase 5 — Technical SEO Fixes 🟢 (completed this task — commit 67e5595)

- Pricing-consistency sync completed (PR #94 left stale copy in ~50 places): problems pages, FAQ pool, MS/ZH emergency tables, brands, blogs, AI files → aligned to official tables. No price changed or invented.
- site-summary.json: reviewCount 500→88 (issue #68 missed this file), geo corrected to Mont Kiara (3.1670, 101.6520), unsupported "leading" removed, sameAs synced to config
- Duplicate title (EN/MS /cuci-aircond-kl) → unique natural Malay title
- llms.txt kampung count 158→162; stale doc comments corrected

## Phase 6 — Content 🟢 structure complete · ⚠️ improvements pending approval

- Service/problem/area/kampung/brand/blog content: trilingual, deep, localized 🟢
- ⚠️ kampung-installation EN family: 82.1% average shared text (162 pages) — site's own audit warning; needs owner decision
- ⚠️ blog editorial price tables contain market estimates that differ from official component rows — owner decision

## Phase 7 — Quality Control 🟢 (each fix verified in built HTML)

- Duplicate metadata: resolved · Thin pages: none flagged · Cannibalization: checked (thermostat vs "turns off by itself" → propose enriching existing page)
- Factual check: pricing drift eliminated · keyword stuffing: none detected · natural trilingual copy confirmed

## Phase 8 — Approval 🟢 (owner approved 4 items)

Owner decisions received: (1) kampung uniqueness = TARGETED upgrades, (2) blog price tables = ALIGN to official rows, (3) "turns off by itself" = ENRICH existing thermostat page, (4) monitoring = weekly scheduled workflow.

## Phase 9 — Implementation 🟢 (Phase 1 + Phase 2 complete)

Phase 2 (owner-approved scope):
- config/kampung-installation-depth.ts — profile-driven depth paragraphs (EN/MS/ZH) for kampung installation pages in the 12 major corridors (86 kampungs × 3 locales); wired into the generator; long-tail pages untouched. Result: gsc-audit near-duplicate warning for kampung-install EN eliminated.
- Blog editorial price tables aligned to published rows (repair-vs-replace EN/MS/ZH, inverter-vs-non-inverter EN/MS/ZH, Daikin-vs-Panasonic EN/MS, landlord-tenant, drain-pump ZH row). No price invented.
- /problems/aircond-thermostat-problems enriched with the "turns off by itself" cluster: 9 new FAQs (EN/BM/ZH), 3 new AEO extra-FAQs per locale, updated direct answers, meta descriptions targeting the query — no new page, no cannibalization.
- Weekly monitoring workflow shipped at docs/seo/weekly-monitoring.workflow.yml (Arena's GitHub connection cannot push .github/workflows/*; one-command activation documented in the file header) — weekly crawl:deployed + build + audit:gsc

## Phase 10 — Final QA 🟢 (Phase 1 + Phase 2)

lint ✓ · typecheck ✓ · build (2,215 pages) ✓ · sitemap 2,208 ✓ · robots ✓ · canonicals/hreflang sampled ✓ · schema valid JSON-LD ✓ · no URL changes · no deletions · no design changes · pricing preserved

### Continuation audit — 17 September 2026 🟢

- Fresh repository inspection completed; no untracked TODOs/placeholders or pending SEO implementation was found.
- QA rerun after installing the lockfile dependencies: lint ✓ · typecheck ✓ · route contracts ✓ · sanitizer corpus (303 blog bodies) ✓.
- Production build ✓: 2,215 static pages generated; build verification ✓ (2,208 sitemap URLs, all resolve; 2,214 HTML pages; 2,213 H1s).
- GSC readiness audit ✓: 0 titles over 60 characters, 0 missing/short/long descriptions, no indexing-blocking errors.
- Existing pages, URLs, UI/branding, features, and prices were left unchanged; no SEO/content changes were necessary in this continuation pass.
- Security dependency pass completed: Next.js updated to 16.3.5 and the sharp override to 0.35.4; `npm audit` now reports 0 vulnerabilities. No `--force` upgrade was used.
- Post-update QA passed: lint ✓ · typecheck ✓ · route contracts ✓ · sanitizer ✓ · production build (2,215 pages) ✓ · build verification ✓ · GSC readiness audit ✓. Sitemap count remains 2,208, titles/descriptions remain clean, and no UI/branding/URL/price/content changes were made.
- Safe dependency refresh completed within existing version ranges; an explicit `tailwind-merge` dependency was added because the refreshed `tailwind-variants` build requires it. A first build caught this missing peer requirement; it was corrected without changing application code.
- Post-refresh QA passed again: lint ✓ · typecheck ✓ · route contracts ✓ · sanitizer ✓ · npm audit (0 vulnerabilities) ✓ · production build (2,215 pages) ✓. No UI/branding/URL/price/content changes were made.
- Major-version upgrades (for example ESLint 10, TypeScript 7, Tailwind 4.3, Google APIs 20, Framer Motion 13) remain intentionally held for a separate compatibility project; they are not security blockers and will not be changed without dedicated regression testing.
- Final diff/runtime review completed: working-tree changes are limited to `package.json`, `package-lock.json`, and this progress log; no `.github/workflows` file was changed. Production server smoke-tested `/`, `/pricing`, `/services`, `/ms`, `/zh`, `/sitemap.xml`, and `/robots.txt` — all returned HTTP 200.
- Major dependency pass continued: Google Calendar client updated to 20.0.0; Tailwind/PostCSS ecosystem and compatible React/Supabase/type tooling updates remain build- and SEO-clean. Full QA after this batch: lint ✓ · typecheck ✓ · route contracts ✓ · sanitizer ✓ · build 2,215 pages ✓ · verify:build ✓ · GSC audit ✓ · npm audit (0 vulnerabilities) ✓.
- ESLint 10 remains held because the current eslint-plugin-import release declares support only through ESLint 9; TypeScript 7, HeroUI 3.2, Framer Motion 13, and Node type 26 remain separate compatibility migrations rather than being forced into a potentially breaking install. No `--force` or `--legacy-peer-deps` was used.
- Weekly SEO workflow activation intentionally deferred per owner instruction.
