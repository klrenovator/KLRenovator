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

## Phase 8 — Approval ⚠️ (current gate)

Awaiting owner decisions: kampung uniqueness scope, blog price-table handling, new problem page(s), scheduled monitoring workflow.

## Phase 9 — Implementation 🟢 (Phase-1 fixes done; Phase-2 pending approval)

## Phase 10 — Final QA 🟢 (for Phase-1 changes)

lint ✓ · typecheck ✓ · build (2,215 pages) ✓ · sitemap 2,208 ✓ · robots ✓ · canonicals/hreflang sampled ✓ · schema valid JSON-LD ✓ · no URL changes · no deletions · no design changes · pricing preserved
