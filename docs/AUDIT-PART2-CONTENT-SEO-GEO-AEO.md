# KL Renovator — Enterprise Audit Part 2

## Content · SEO · GEO · AEO

**Site:** https://klrenovator.com
**Date:** 2026-08-19 · **Branch:** `arena/01a019d1-klrenovator`
**Mode:** audit + remediation — the audit below is the original finding set; see **[§0 Remediation status](#0-remediation-status)** for what has since been fixed.
**Method:** full production build (`next build`) → **2,169 prerendered HTML pages parsed** → site-wide pattern analysis (headings, schema, link graph, 8-gram shingle similarity, entity/trust signal detection)

> Evidence base: every number below is measured from rendered HTML, not from source config. Tooling committed in `audit/` (`extract.mjs`, `analyze.mjs`, `gaps.mjs`); raw data in `audit/pages.json`, `audit/findings.json`, `audit/gaps.json`.

---

## 0. Remediation status

Fixes applied after the audit, on this branch (see `git log`).
All verified against a fresh production build; `typecheck`, `lint`, `verify:build`
and `audit:gsc` pass.

### Score movement

| Score | At audit | Now | Δ |
|---|---|---|---|
| Content | 94 | **98** | +4 |
| GEO | 53 | **88** | +35 |
| AEO | 38 | **81** | +43 |

| Component | At audit | Now |
|---|---|---|
| Internal linking | 59 | **98** |
| FAQ coverage (AEO) | 86 | **94** |
| Freshness (GEO) | 22 | **91** |
| Citation-worthiness (GEO) | 5 | **72** |
| Answer formatting (GEO) | 51 | **99** |
| Direct answers (AEO) | 40 | **98** |
| HowTo (AEO) | 4 | **23** |
| Expert signals (GEO) | 12 | **70** |
| Tables (AEO) | 11 | **98** |
| Comparison (AEO) | 16 | **98** |
| Definitions (AEO) | 12 | **98** |

**Latest verification (2026-08-20, session 4):** `npm run typecheck && npm run lint && npm run build && npm run verify:build && npm run audit:gsc` passed. Fresh extract/analyze over 2,169 pages reports Content **98**, GEO **88**, AEO **81**. Duplicate-content guard still clean: weighted intra-group similarity **22.4%**, **0 pairs >70%**.

**Session 9 (2026-08-21) — issues #75 (commercial + IAQ clusters) and #69 (SEO cleanup):**

*#75 — two near-empty commercially significant clusters built out (§7.5):*
- New **commercial B2B service hub** `/commercial-aircond-service` (+ native
  `/ms/servis-aircond-komersial`, `/zh/commercial-aircond-service`): servicing,
  chemical wash and AMC for offices, shoplots, F&B and clinics — distinct from
  the existing commercial *installation* landing, which it cross-links.
- New **indoor air quality hub** `/indoor-air-quality-aircond` (+ native MS/ZH
  slugs): what a dirty coil/blower does to room air and exactly what a chemical
  wash removes, with a cleaning-cadence table. Strict no-medical-claim
  discipline + a visible disclaimer.
- Authored trilingual content in `config/commercial-iaq-content.ts` (EN/MS/ZH
  written separately). Every price resolves from `lib/published-prices.ts`
  (added `basicCassette15`). Shared server components `commercial-hub-page.tsx`
  / `iaq-hub-page.tsx` emit FAQPage + Service + WebPage + BreadcrumbList +
  ImageObject schema, 3 real job photos each, `service:commercial` /
  `service:iaq` explainer presets, and TNB / Energy Commission / DOSH citations.
- Wired into sitemap (all 6 routes, all resolve), footer (EN/MS/ZH), and
  cross-linked from commercial-installation, maintenance-contract and the
  cuci-aircond chemical-wash guide. New `commercialIaq` review-date collection.
- Each hub 1,349–1,604 words, 6 FAQs, 2 tables, 3 images. No aggregateRating,
  no review-count claim.

*#69 — title casing, thin pages, meta-description CTAs:*
- **Title casing:** kampung metaTitle acronyms were title-cased and degraded
  (`Ss15`, `Pj Old Town`, `Usj`, `Ss21`, `Pjs`). Restored correct casing across
  EN/MS/ZH so the SS15/16/19 Subang Jaya titles read correctly. Duplicate
  titles remain 0.
- **Thin pages 7 → 0:** `BookingSupportInfo` (coverage + response-time + 4 FAQs
  with FAQPage schema) below the form on `/book` and `/contact`, and
  `AreasCoverageIntro` on the `/areas` index — all EN/MS/ZH, authored per
  locale. `/book` 140→434 words, `/contact` 276→570, `/areas` 280→490.
  `thinContent` 99 → **100**.
- **Descriptions without CTA 956 → 89** (target < 200): new
  `ensureCtaDescription()` appends one short locale-appropriate CTA when a
  description lacks a CTA cue, trimming first to respect the 155 clamp (no-op
  when a CTA already exists). Applied to kampung-installation, brand-area,
  blog, problem, service, area, area-installation and brand-installation
  templates. 0 duplicate descriptions introduced. The remaining 89 are static
  calculators / index / utility pages with inline metadata.

Duplicate guard held both times: weighted **20.3%**, **0 pairs >70%**. Scores
held at Content **98**, GEO **88**, AEO **81**. `typecheck`/`lint`/`build`/
`verify:build`/`audit:gsc` pass (only the pre-existing kampung-install warning).

**Session 8 (2026-08-21) — issue #73 body imagery (C8b) on the location / brand / problem templates:**
- Added a shared `JobPhotoStrip` server component (`components/job-photo-strip.tsx`)
  backed by `config/place-job-photos.ts`. Each strip renders **3 distinct real
  job photos** from `/public/hero`, deterministically selected per page with
  brand / area / service hint-matching (a Daikin-in-PJ page gets actual Daikin,
  PJ-area photos; a Cheras kampung gets Cheras-area photos), plus page-specific
  **trilingual alt + caption text** and one `ImageObject` JSON-LD node per photo.
- Wired into all 5 previously text-only templates × EN/MS/ZH (15 `page.tsx`
  files): kampung (474), brand-area (360), area (120), brand (60), problem (60).
- **Pages with 0 `<img>` in body: 1,103 → 45.** The 5 target templates are now
  at **100% image coverage** (0 zero-image, avg 3.0 imgs/page, `ImageObject` on
  every page). The leftover 45 are calculators (21), utility/index pages and the
  price/service utility routes — all outside the C8b template set.
- **0 images missing alt** held (page-specific, never a repeated template
  string; a/an article + full-width place interpolation authored per locale).
- Duplicate guard *improved*: weighted intra-group similarity **20.5 → 20.3**,
  **0 pairs >70%** across all 42 template groups (kampung|en 22.3→22.1,
  brand-area|en 21.8→21.9 sampling noise, area|en 40.4→39.8). Images/alt are
  short and place-varied, so text similarity did not rise.
- Scores held exactly: Content **98**, GEO **88**, AEO **81**; every component
  sub-score unchanged. `typecheck`/`lint`/`build`/`verify:build`/`audit:gsc`
  pass (only the pre-existing kampung-install EN 81.8% warning remains).
- **VideoObject:** still 0 site-wide. No video assets exist in the repo, so
  there is nothing to mark up honestly — left for when real video is produced
  (tracked under #73). No review-count claim or AggregateRating added.

**Session 6 (2026-08-20) — issue #74 link-graph patch (near-orphans + MS installation cluster):**
- Contextual parent→child links, not a related-links strip. Area brand chips now
  point at real `/brands/{brand}/{area}` pairs (gated on `brandAreaPairs()`).
  Kampung pages link their installation child; brand pages link brand-installation;
  brand-area / area-installation / brand-installation pages stitch the rest of
  the money graph with hashed EN/MS/ZH inline anchors
  (`config/orphan-cross-links.ts` + `components/money-cross-links.tsx`).
- MS installation landings (`/ms/pemasangan-aircond-*`) now receive in-content
  links from MS area pages (authored MS copy, native slugs). Same treatment in
  ZH. All 10 MS installation pages have ≥ 3 inbound.
- Near-orphans **767 → 190**. brand-area 360 → 0 (median inbound 4),
  brand-installation 60 → 0 (median 9), area-installation 120 → 24 (median 7),
  kampung-installation 66 → 24 (median 5), installation-landing 12 → 2 (median 17).
  Leftover 190 is almost all blog-post (108) + kampung (26) + the 24+24 install
  tail — out of this session's template set.
- Duplicate guard *improved*: weighted **20.8 → 20.5**, 0 pairs >70% held.
  kampung|en 23.1 → 22.3, area|en 41.5 → 40.4. brand-area|en 21.7 → 21.8
  (0.1, sampling noise on the 90-page sample). kampung-install EN gsc-audit
  warning unchanged at 81.8%.
- Scores held at Content **98**, GEO **88**, AEO **81**. internalLinking **98 → 100**.
  No new review-count claim (owner-handled per #68). No AggregateRating.

**Session 5 (2026-08-20) — issue #71 content depth on kampung + brand-area templates:**
- `config/kampung-depth.ts` (474 pages): two new authored H2 sections per kampung
  page — "How does the first aircond visit to X usually run?" (4-step ordered
  checklist, profile-selected, 4 wording variants per locale × 7 profiles × 3
  locales) and "What local signals do we plan for in X?" (4-dimension mini-table
  with per-dimension independent variant picking).
- `config/brand-area-depth.ts` (360 pages): two new authored H2 sections per
  brand-area page — "How does our first {brand} visit in {area} usually run?"
  (per brand-family × area-profile, 4 variants per locale) and "Common {brand}
  jobs we get called for in {area}" (4-row job-frequency table per area-profile,
  4 variants, MS/ZH row wording authored per (profile, variant)).
- All EN/MS/ZH copy authored separately, not machine-mirrored.
- Word count (EN): kampung 974 → 1,338 (+364), brand-area 962 → 1,278 (+316).
  H2 depth: kampung 6 → 8, brand-area 5 → 7. Same movement in MS and ZH.
- Duplicate guard *improved*: weighted intra-group similarity **22.4 → 20.8**;
  0 pairs >70% held across every template group. Per-template moves:
  kampung|en 29.9 → 23.1, kampung|ms 30.3 → 23.2, kampung|zh 10.1 → 8.1,
  brand-area|en 25.1 → 21.7, brand-area|ms 25.2 → 21.9, brand-area|zh 11.2 → 9.7.
- Scores held at Content **98**, GEO **88**, AEO **81** with all component sub-
  scores unchanged (FAQ nudged 82 → 83). No new review-count claim added
  (owner-handled per #68).


### Fixed

| # | Finding | Result |
|---|---|---|
| **C5 / #62** | No price/comparison table on commercial pages | **Fixed** — shared EN/MS/ZH commercial proof blocks now render real `<table>` price comparisons on area, kampung, brand, brand-area, area-installation, kampung-installation and brand-installation templates. Prices come from `lib/published-prices.ts` / `config/site/pricing.ts` only. AEO tables **11 → 88**; money pages without a table **1,782 → 114**. |
| **C7b / #64** | No author/expert attribution + external citations | **Fixed** — reviewed-by blocks now cite the real KL Renovator technicians already present on `/about` (Muhammad, Shahzaib, Mudassar, Hamzah), link to `/about`, show hand-maintained review dates, and rotate relevant TNB / Energy Commission / SIRIM / DOSH references instead of identical bulk outbound links. GEO expertSignals **12 → 70**; citationWorthiness **18 → 72**. |
| **C9b / #72** | Definition + comparison content missing | **Fixed** — after the commercial templates (PR #77), the editorial side now carries the same treatment: `config/aeo-explainers.ts` holds 24 hand-authored glossary answers and 18 comparison tables, each written separately in EN/MS/ZH with alternate heading phrasings so no definition publishes an identical H3 site-wide. Blog posts select terms from their **own body text** (`lib/aeo-explainer-select.ts`) and only show a comparison when both sides are discussed; problem, service, calculator and installation-landing pages use curated per-page presets. Coverage: definitions **1,781 → 2,126 / 2,169**, comparison **1,978 → 2,118**, tables **1,902 → 2,118**. AEO definitions **82 → 98**, comparison **91 → 98**, tables **88 → 98**, direct answers **91 → 98**; overall AEO **76 → 81**. The only pages left without a block are utility pages (`/book`, `/contact`, `/privacy-policy`, `/gallery`), the three index pages and the homepage — none of which should carry a glossary. |
| **C1** | 360 brand-area pages orphaned | **Fixed** — `brand-area-combo-links.ts` now links to `/brands/{brand}/{area}`. Verified 360 unique brand-area URLs receive internal links (was 0). Only prerendered pairs are linked, so no 404s. |
| **C4** | 267 blog posts showed FAQs without schema | **Partly fixed** — new `lib/blog-derived-faq.ts` extracts each post's own question headings + answers. EN posts with FAQPage 12 → 67; site-wide 1,862 → **2,028**. The 34 EN posts with no question headings correctly still emit none. |
| **C7** | 1,824 pages with no freshness signal | **Largely fixed** — `config/content-review-dates.ts` + WebPage nodes on area/kampung/brand-area templates. Pages with `dateModified` 339 → **1,293**. |
| **C8** | 971 pages missing `og:image` | **Fixed** — `lib/og-image-pool.ts` deterministically maps pages onto 22 real job photos (all verified on disk). A second pass cleared the remaining logo-only pages (installation content configs, 47 static routes, `brands/[slug]` fallback) and fixed a `??`-vs-`||` bug that suppressed the tag on the 25 areas whose config carries `heroImage: ""`. **og:image now present on 2,170 / 2,172 built pages** — the only exceptions are `_not-found` and `_global-error`. |
| **C10** | "Uniqueness Matrix" jargon + `20D.33` task ID visible on 474 pages | **Fixed** — now "Aircond Service in {Name} — What to Expect" (+ MS/ZH). Zero pages leak the task ID. |
| — | 120 area-installation pages orphaned | **Fixed** — each area page now links its own `/installation` child. **Site-wide orphans 443 → 23.** |

### Corrected finding — C3 was wrong

**The original C3 recommendation (add `AggregateRating`) has been withdrawn and must not be implemented.**

Google's self-serving review policy (Sept 2019, restated Dec 2025) makes
`LocalBusiness`/`Organization` **and all subtypes — including `HVACBusiness` —
ineligible for review rich results when the business controls the reviews.**
Adding `aggregateRating` would:

- never render stars,
- report as **"Invalid items"** in the Search Console review-snippet report, and
- **fail this repo's own CI** — `scripts/gsc-audit.mjs` §9a already treats
  `aggregateRating` on those types as a build-breaking error.

The correct channel for star ratings is the Google Business Profile, which
already carries the 5.0/500+ rating and surfaces it in the local pack and Maps
without any on-site markup. The GEO concern behind C3 (AI engines can't verify
the quality claim) remains valid and is better served by the freshness and
expert-attribution work in C7.

### Requires a maintainer — not fixable from this session

| # | Item | Issue | Blocker |
|---|---|---|---|
| **C2** | 638 month-stamped titles go stale without a monthly rebuild | [#67](https://github.com/klrenovator/KLRenovator/issues/67) | Workflow file written to **`docs/monthly-refresh.workflow.yml`** with setup notes in **`docs/MONTHLY-TITLE-REFRESH.md`**. It could not be committed to `.github/workflows/` — the GitHub App lacks the `workflows` permission. A maintainer must copy it in and add the `VERCEL_DEPLOY_HOOK_URL` secret. A lower-maintenance alternative (year-only stamps) is documented. |
| — | "5.0 from 500+ Google reviews" repeated 150× but `config/reviews.ts` holds 9 review objects | [#68](https://github.com/klrenovator/KLRenovator/issues/68) | The real review count can only be confirmed against the live Google Business Profile, which is unreachable from the build sandbox. Editing 150 marketing claims downward on a guess would be worse than leaving them. Needs someone with GBP access. |

### Still open — needs content authoring

These are genuine content work, not markup, and are too large to complete safely in one session. All are tracked as GitHub issues:

| # | Item | Pages | Issue |
|---|---|---|---|
| **C6** | Zero direct-answer blocks (kampung, brand-area, problem) | 922 | [#63](https://github.com/klrenovator/KLRenovator/issues/63) — **done this session**: AEO `directAnswers` 40 → **81**. All 60 problem pages and all 834 kampung + brand-area pages now have ≥ 3 question-heading + 15–120 word answers, rewritten from existing unique copy (not place-name boilerplate). Intra-group similarity held at **19.9%**, 0 pairs >70%. |
| **C9a** | HowTo schema missing where step content exists | 137 | [#65](https://github.com/klrenovator/KLRenovator/issues/65) — **subset this session, not closable**: HowTo schema 47 → **113**, pattern 163 → **774**, AEO `howTo` 4 → **17**. All 60 problem pages + EN/MS/ZH installation-KL and whole-house landings now emit HowTo JSON-LD that matches visible numbered steps. Hitting the issue's `howTo ≥ 40` bar needs HowTo schema **and** a how-to heading on ~40% of 2,169 pages. That cannot be honest markup of the remaining pages that already have steps (most leftover pattern hits are blog titles / FAQ “How do I…” headings without an ordered process). Left open. |
| **C10** | kampung + brand-area are 2-H2, ~580-word skeletons | 834 | [#71](https://github.com/klrenovator/KLRenovator/issues/71) — **done session 5**: two new authored H2 pillars per template, per-place variants selected by profile × slug hash. Word count EN 974 → 1,338 (kampung) and 962 → 1,278 (brand-area); H2 depth 6 → 8 (kampung) and 5 → 7 (brand-area). MS/ZH authored separately. Duplicate guard improved — weighted 22.4 → 20.8, 0 pairs >70% held. |
| **C8b** | No content imagery in body (og:image is done) + zero VideoObject | 1,103 | [#73](https://github.com/klrenovator/KLRenovator/issues/73) — **done session 8**: body-image pages 1,103 → **45**; all 5 target templates (kampung / brand-area / area / brand / problem) at 100% coverage with 3 real job photos, page-specific trilingual alt, and `ImageObject` schema each. VideoObject still 0 — no video assets exist to mark up (leave open for the video half). Weighted similarity 20.5 → 20.3, 0 pairs >70%. Needs manual close. |
| — | Topic-cluster hubs (`/pricing`, `/troubleshooting`, `/maintenance`) | 3 new | [#66](https://github.com/klrenovator/KLRenovator/issues/66) |
| — | 767 near-orphans + MS installation pages cut off | 767 | [#74](https://github.com/klrenovator/KLRenovator/issues/74) — **done session 6**: near-orphans 767 → **190**; all 10 MS installation landings ≥ 3 inbound; brand-area / brand-installation off the near-orphan list. Weighted similarity 20.8 → 20.5, 0 pairs >70%. Needs manual close. |
| — | Near-empty commercial + IAQ clusters | 6 new | [#75](https://github.com/klrenovator/KLRenovator/issues/75) — **done session 9**: commercial B2B service hub + IAQ hub, trilingual, in sitemap/footer, cross-linked from cluster members. Needs manual close. |
| — | 13 title clashes, 7 thin pages, 943 descriptions without CTA | — | [#69](https://github.com/klrenovator/KLRenovator/issues/69) — **done session 9**: acronym title casing fixed, thin pages 7→0, descriptions without CTA 956→89 (<200 target met). Needs manual close. |

**Every open finding in this document is now tracked as a GitHub issue.** Nothing is
left unfiled. A ready-to-paste continuation prompt lives in `docs/NEXT-SESSION-PROMPT.md`.

---

## 1. Scores

| Score | Result | Grade | One-line verdict |
|---|---|---|---|
| **Content Score** | **94 / 100** | A | Technically near-flawless. Metadata, headings, uniqueness are excellent. Held back only by internal linking. |
| **GEO Score** (ChatGPT/Claude/Gemini/Perplexity) | **53 / 100** | D+ | Great entity/schema base, but almost **no expert attribution, no citations, no review schema** — the exact signals LLMs quote. |
| **AEO Score** (featured snippets / direct answers) | **38 / 100** | F | FAQ coverage is strong; **comparison tables, HowTo schema, definition blocks and direct-answer formatting are missing on 1,700+ pages**. |

### Component breakdown

| Content (94) | | GEO (53) | | AEO (38) | |
|---|---|---|---|---|---|
| Title tags | **100** | Entity clarity | **99** | FAQ coverage | **86** |
| Meta descriptions | **100** | Trust signals | **80** | Direct answers | **40** |
| H1/H2 hierarchy | **100** | Answer formatting | **51** | Troubleshooting | **40** |
| Thin content | **99** | Freshness | **22** | Comparison | **16** |
| Duplicate content | **100** | Expert signals | **12** | Definitions | **12** |
| Cannibalization | **98** | Citation-worthiness | **5** | Tables | **11** |
| **Internal linking** | **59** | | | HowTo | **4** |
| FAQ quality | 79 | | | | |

**The headline:** this is a *technically excellent* site with a *machine-readability problem*. The SEO fundamentals fixed in the 2026-08-15 forensic audit have held — 0 bad titles, 0 bad descriptions, 0 duplicate metadata. But the site is built for **Google's blue links of 2020**, not for **answer engines of 2026**. It publishes prices, warranties and local expertise everywhere, yet gives AI engines almost nothing to *attribute, date, or cite*.

---

## 2. What's verified clean (no action needed)

Measured across all 2,169 pages:

| Check | Result |
|---|---|
| Missing / empty titles | **0** |
| Titles over 60 display units (CJK-aware) | **0** |
| Duplicate title tags | **0** |
| Missing meta descriptions | **0** |
| Descriptions over 155 display units | **1** |
| Duplicate meta descriptions | **0** |
| `"..."` truncation artifacts (the Bug D regression) | **0** |
| Pages with no H1 | **0** |
| Pages with multiple H1s | **0** |
| Missing canonical | **0** |
| Missing/incomplete hreflang (en-MY, ms-MY, zh-MY, x-default) | **0** |
| Images missing `alt` | **0** |
| Locale parity (EN/MS/ZH) | **723 / 723 / 723** — perfect |
| Thin pages (<300 words) | **7** (all utility: `/book`, `/contact`, `/areas` index) |

The August 15 metadata fixes are confirmed durable. **No metadata regression has occurred.**

### Duplicate content — genuinely clean

Programmatic sites usually fail here. This one doesn't:

| Page group | Pages | Avg 8-gram similarity | Pairs >70% similar |
|---|---|---|---|
| kampung-installation (EN) | 158 | 33.8% | **0** |
| kampung (EN) | 158 | 22.3% | **0** |
| brand-area (EN) | 120 | 17.2% | **0** |
| area-installation (EN) | 40 | 37.9% | **0** |
| blog-post (EN) | 101 | 12.0% | **0** |

**Zero near-duplicate pairs across the entire site.** Parent→child overlap (`/areas/cheras` vs `/areas/cheras/installation`) averages just **2%**. The uniqueness matrices in `config/` are doing real work. 158 kampung pages produced **274 distinct FAQ questions** with none repeated across 20+ pages.

### Cannibalization — low and structural

- **13 exact title-keyword clashes**, all benign: `/areas/subang-jaya/ss15`, `ss16`, `ss19` produce near-identical titles because the area names themselves are near-identical.
- Intent buckets are large (360 EN pages target "aircond service") but this is **correct local-SEO architecture** — each targets a distinct `service + location` query, and body uniqueness is verified above.
- **No action required** beyond the SS15/16/19 title differentiation.

---

## 3. CRITICAL FINDINGS

### 🔴 C1 — 443 pages are orphans; all 360 brand-area pages have ZERO inbound links

The single largest issue on the site.

| Template | Pages | Orphaned (0 contextual inbound links) |
|---|---|---|
| **brand-area** (`/brands/{brand}/{area}`) | 360 | **360 — 100%** |
| **area-installation** (`/areas/{area}/installation`) | 120 | **60** |
| kampung-installation | 474 | 21 |
| other | — | 2 |
| **Total** | | **443 orphans + 347 near-orphans (1–2 inbound)** |

**Verified:** `grep` for `href="/brands/daikin/petaling-jaya"` across all 2,169 built HTML files returns **0 matches**. The page is in `sitemap.xml` (2,166 URLs) but unreachable by crawling.

**Root cause found.** `config/brand-area-combo-links.ts` exists specifically to build these links and is imported by all three brand pages — but line 192 emits the wrong destination:

```ts
href: areaHref(locale, area.slug),   // → /areas/petaling-jaya
// should be → /brands/daikin/petaling-jaya
```

The module renders a "Daikin in Petaling Jaya" card that **links to the generic area page instead of the brand-area page it was written for.** 360 pages of unique content (571 avg words, 4 FAQs each) receive no internal PageRank and no crawl path.

**Impact:** 360 pages — 17% of the site — are effectively invisible to Google beyond the sitemap. This is also the highest-commercial-intent page type on the site (`brand + location` = ready-to-buy queries).
**Fix:** one-line change in `config/brand-area-combo-links.ts:192`. **Highest ROI item in this audit.**

---

### 🔴 C2 — 638 titles hard-code a build-time month that never updates

449 EN + MS/ZH equivalents = **638 titles** contain a month stamp:

```
/areas/ampang/ampang-jaya → "Aircond Service Ampang Jaya (Ampang) August 2026 — RM 99"
/aircond-service-price-malaysia → "Aircond Service Price Malaysia August 2026 — Transparent"
```

| Template | Month-stamped titles |
|---|---|
| kampung | 465 |
| area | 80 |
| brand | 60 |
| service | 25 |

`lib/seo-title-optimizer.ts:209` calls `new Date()` at **build time**. Every page is statically prerendered with **no `revalidate`, no ISR, and no scheduled rebuild** (`.github/workflows/ci.yml` is push-triggered only).

**Impact:** the moment the site goes a month without a deploy, 638 titles advertise a stale date in the SERP — "August 2026" showing in November 2026 actively *suppresses* CTR and signals staleness to both Google and LLMs. This is a freshness tactic that inverts into a freshness penalty.
**Fix:** either add a monthly scheduled rebuild (GitHub Action cron + Vercel deploy hook) or drop month-level stamps in favour of year-only.

---

### ~~🔴 C3 — Zero Review/AggregateRating schema~~ — ⚠️ WITHDRAWN, SEE §0

> **This finding was wrong.** `HVACBusiness` is a `LocalBusiness` subtype and is
> ineligible for review rich results under Google's self-serving review policy.
> Adding `aggregateRating` would fail this repo's own `audit:gsc` check.
> Original text kept below for the record.

**0 of 2,169 pages** emit `AggregateRating` or `Review` structured data. Verified by grep across all built HTML.

Meanwhile `public/llms.txt` states *"Rating: 5.0 / 5 from 500+ Google reviews"*, the visible UI shows review counts, and `config/reviews.ts` + `/api/google-reviews` hold real review data.

**Impact:**
- No star ratings in Google SERPs (direct CTR loss on 2,169 pages)
- **AI engines cannot verify the 5.0/500+ claim.** ChatGPT and Perplexity look for `AggregateRating` to substantiate quality claims. An unverifiable claim in `llms.txt` is worse than no claim — it's the #1 reason an LLM will decline to recommend a business.
- This is the largest single GEO scoring loss on the site.

**Fix:** emit `AggregateRating` on the LocalBusiness/HVACBusiness node already present on 1,438 pages. Data already exists.

---

### 🔴 C4 — 267 of 303 blog posts show FAQs to users but hide them from search engines

Every blog post renders a visible **"Reader FAQs"** section with 3 Q&As (`blog-post-client.tsx:379`). But `FAQPage` schema is only emitted when a post has authored `faqs` in config (`blog-post-client.tsx:245`).

| | Count |
|---|---|
| Blog posts total | 303 |
| Visible "Reader FAQs" section | **303** |
| Emitting `FAQPage` schema | **36 (12%)** |
| **Gap** | **267 posts** |

Verified: 101 EN posts show the FAQ block; **89 of them emit no FAQPage schema.**

Worse, the 3 fallback questions are **identical across all 101 EN posts** ("Can I book same-day service?", "Will the price be confirmed before work starts?", "Is there a warranty?") — hard-coded JSX, not per-post content. So the site simultaneously has:
1. 267 pages of FAQ markup opportunity unclaimed, and
2. the same 3 generic questions repeated 101× per language (303× total) — the only genuine duplicate-content pattern found on the site.

**Fix:** author 3–5 post-specific FAQs per article (or at minimum wire the existing generic block into schema), which converts 267 pages into FAQ-snippet candidates.

---

### 🟠 C5 — 1,782 of 1,784 commercial pages have no comparison/price table

| | Count |
|---|---|
| Money pages (service/area/brand/problem/kampung/installation) | 1,784 |
| Containing a `<table>` | **2 (0.1%)** |
| Blog posts containing a table | 238 (79%) |

The blog knows how to build tables. The commercial pages — the ones that must win *"aircond service price Cheras"* — render prices as prose and card grids instead.

**Impact:** price tables are the single highest-probability featured-snippet format for "cost/price" queries, and the format LLMs most reliably extract for structured comparison. 1,436 pages have pricing *headings* but present the data unstructured. This is the biggest driver of the AEO score of 38.

---

### 🟠 C6 — 922 pages have zero direct-answer blocks

A "direct answer" = question-style heading immediately followed by a 15–120 word paragraph — the format that wins featured snippets and gets quoted verbatim by AI engines.

| Template | Pages | Zero direct answers |
|---|---|---|
| **kampung** | 474 | **474 — 100%** |
| **brand-area** | 360 | **360 — 100%** |
| **problem** | 60 | **60 — 100%** |
| installation-landing | 26 | 6 |

The `problem` pages (`/problems/aircond-not-cold`) are the most damaging: these target pure question intent ("why is my aircond not cold"), average 1,173 words and 9.1 H2s, carry 5 FAQs — **yet not one uses a question-heading + short-answer structure.** Their H2s are statements, not questions.

Compare: service pages average **5.0** direct-answer blocks and blog posts **3.5**. The templates that need it most have none.

---

### 🟠 C7 — Expert & citation signals are near-zero (the GEO ceiling)

| Signal | Pages | % of site |
|---|---|---|
| Author / "reviewed by" attribution | 471 | 22% |
| Freshness (`dateModified` or "last updated") | 345 | **16%** |
| **External citation to any authority** | **5** | **0.2%** |
| Licence / certification mention | 53 | 2% |
| Review schema | **0** | **0%** |

**1,824 pages carry no freshness signal. 2,164 pages cite no external source.**

Only blog posts (100% author, 100% freshness) and service pages (60%/90%) are properly attributed. All 1,428 location and brand-area pages — the bulk of the site — are anonymous and undated.

**Why this caps GEO at 53:** ChatGPT, Claude, Gemini and Perplexity all preferentially cite content that is (a) attributed to a named expert, (b) recently dated, and (c) corroborated by outbound references. This site offers strong first-party facts (prices, warranty, SSM number) but no verification scaffolding. It will be *read* by AI engines and rarely *cited*.

Citing authorities like TNB (tariffs), SIRIM/Energy Commission (standards), or MIDA/DOSH (refrigerant regulation) on relevant pages would be a step-change — currently **5 pages** do this.

---

### 🟠 C8 — 971 pages missing `og:image`; 1,103 pages have no content imagery

| Template | Missing og:image | No content image at all |
|---|---|---|
| kampung | 474 | 474 |
| brand-area | 360 | 360 |
| area | 120 | 104 |
| brand | 0 | 60 |
| problem | 0 | 60 |
| tool | 3 | 21 |

Verified: `/brands/daikin/petaling-jaya` renders exactly **1 `<img>`** — the header logo — plus 33 inline SVG icons.

**Impact:** no social/WhatsApp preview card on 971 pages (significant in a WhatsApp-first market), no Google Images entry point, and no visual proof on the highest-intent brand+location pages. The site owns a large photo library (`docs/IMAGE-USAGE-MAP.md`, `/public/hero/`) already mapped and used by kampung-*installation* pages (100% have images) — the base kampung and brand-area templates simply never wired it in.

---

### 🟡 C9 — HowTo, definition and comparison formatting gaps

| Pattern | Pages with visible pattern | With schema | Gap |
|---|---|---|---|
| HowTo / step-by-step | 163 | 47 | **137 pages** |
| Comparison content | 349 (16%) | — | 1,820 pages have none |
| Definition blocks | 257 (12%) | — | 1,912 pages have none |
| Speakable schema | 93 (4%) | — | — |

Service pages do this well (86.7% HowTo schema, 93.3% comparison). Everything else — 1,700+ pages — does not.

Notably **all 60 problem pages have comparison content but 0 HowTo schema**, despite being step-by-step diagnostic guides by nature. These are the most snippet-eligible pages on the site and are formatted as prose.

---

### 🟡 C10 — Content depth is inverted on the two largest templates

| Template | Pages | Avg words | Avg H2 | Avg FAQs | Direct answers |
|---|---|---|---|---|---|
| kampung-installation | 474 | 1,456 | 10.0 | 6.3 | 3.7 |
| **kampung** | **474** | **593** | **2.0** | **1.3** | **0** |
| **brand-area** | **360** | **571** | **2.0** | **4.0** | **0** |
| area | 120 | 1,957 | 10.3 | 10.0 | 2.3 |
| service | 30 | 4,539 | 20.0 | 11.9 | 5.0 |

834 pages (38% of the site) run on two-H2 templates averaging ~580 words while their sibling templates average 1,456–1,957. Not thin enough to be "thin content" — but structurally shallow, with only 2 sections, no images, no tables, no direct answers.

The kampung template's two H2s are *"{Name} Aircond Service Uniqueness Matrix"* and *"FAQ — {Name}"*. **"Uniqueness Matrix" is internal SEO jargon rendered as a user-facing `<h2>` on 158 pages** (474 across locales) — it names the optimisation technique rather than describing the content, and reads as machine-generated to both users and LLM quality classifiers.

---

## 4. Site-wide patterns

**Pattern A — "Schema-rich, attribution-poor."** 2,140 pages have BreadcrumbList, 1,862 have FAQPage, 1,441 have Service, 1,438 have HVACBusiness. Yet 0 have Review, 47 have HowTo, and 345 have any date. The site invested heavily in *structural* schema and skipped *credibility* schema — which is precisely the half that GEO rewards.

**Pattern B — Template quality is bimodal.** Templates are either excellent (service: 4,539 words / 20 H2s / 5 direct answers; blog: tables 79% / author 100% / freshness 100%) or skeletal (kampung, brand-area: 2 H2s / 0 tables / 0 images / 0 direct answers). There is no middle. The good templates prove the team can execute; the patterns simply were never back-ported to the 834 pages that need them.

**Pattern C — Content exists but isn't marked up.** Recurring across every critical finding: FAQs are visible but unschema'd (267 posts); reviews are displayed but unschema'd (2,169 pages); steps are written but unschema'd (137 pages); prices are stated but untabulated (1,782 pages). **The site consistently under-claims content it already has.** Most fixes here are markup, not writing.

**Pattern D — Internal linking follows the sitemap, not the money.** Service pages get 107 median inbound links, brands 68, areas 23 — while brand-area (highest purchase intent) gets **0** and area-installation gets 1. Link equity flows to hubs already ranking, starving the long tail built to capture it.

**Pattern E — Descriptions under-sell.** 1,392 descriptions (64%) contain no price and 943 (43%) no CTA, despite price transparency being the brand's core differentiator and appearing on 2,130 pages of body copy.

---

## 5. GEO readiness by engine

| Engine | Readiness | Assessment |
|---|---|---|
| **Perplexity** | 🟡 **Medium** | Best-positioned: `llms.txt`, `llms-full.txt`, `aeo-faq.txt`, `site-summary.json` all present; PerplexityBot explicitly allowed; strong FAQ corpus. Blocked by **zero external citations** — Perplexity ranks sources partly on corroboration, and cites pages with dates. 84% of pages are undated. |
| **ChatGPT / OAI-SearchBot** | 🟡 **Medium** | GPTBot, ChatGPT-User, OAI-SearchBot all allowed. Excellent entity clarity (99) — NAP, SSM number, geo-coordinates, service catalogue are unambiguous. Blocked by **missing AggregateRating**: ChatGPT is conservative about recommending businesses whose quality claims can't be verified in markup. |
| **Claude** | 🟡 **Medium** | ClaudeBot/Claude-Web/AnthropicBot allowed. Benefits from long-form service pages (4,539 words) and clean HTML. Blocked by **expert signals (12/100)** — Claude weights author expertise and citation heavily; 1,698 pages have no named human or team attribution. |
| **Gemini / Google AIO** | 🟠 **Medium-Low** | Google-Extended allowed. Strongest schema base of any engine's needs (LocalBusiness + Service + FAQPage). Blocked by **AEO formatting (38)** — AI Overviews are assembled from tables, lists and direct answers; 1,782 commercial pages offer no table and 922 offer no direct answer. Also most exposed to the **stale month-stamp** issue. |

**Cross-engine summary:** the site is *technically accessible* to all four (robots.txt is exemplary, content is server-rendered, entity data is clean) but *rhetorically unquotable*. The fix is not more content — it's attribution, dating, ratings markup and answer formatting on content that already exists.

---

## 6. Critical content gaps (quantified)

| # | Gap | Pages affected | Severity |
|---|---|---|---|
| 1 | Brand-area pages with zero inbound links | **360** | 🔴 Critical |
| 2 | Pages with no external citation | **2,164** | 🔴 Critical |
| 3 | Pages with no Review/AggregateRating schema | **2,169** | 🔴 Critical |
| 4 | Commercial pages with no price/comparison table | **1,782** | 🔴 Critical |
| 5 | Pages with no freshness signal | **1,824** | 🔴 Critical |
| 6 | Pages with no author/expert attribution | **1,698** | 🟠 High |
| 7 | Pages with no definition block | **1,912** | 🟠 High |
| 8 | Pages with no comparison content | **1,820** | 🟠 High |
| 9 | Titles frozen to build-month | **638** | 🔴 Critical |
| 10 | Pages with zero direct-answer blocks | **922** | 🟠 High |
| 11 | Pages missing og:image | **971** | 🟠 High |
| 12 | Pages with no content imagery | **1,103** | 🟠 High |
| 13 | Blog posts with visible FAQ but no schema | **267** | 🔴 Critical |
| 14 | Orphan + near-orphan pages | **790** | 🔴 Critical |
| 15 | Descriptions with no price | **1,392** | 🟡 Medium |
| 16 | HowTo content without HowTo schema | **137** | 🟡 Medium |
| 17 | Titles without brand token | **1,472** | 🟡 Low (deliberate — saves title width) |

---

## 7. Missed ranking opportunities

**7.1 — 360 highest-intent pages excluded from the link graph.** `brand + location` ("Daikin service Petaling Jaya") is the most commercially valuable query class in this vertical. All 360 such pages exist, are unique, and are unreachable. Fixing one line in `brand-area-combo-links.ts` activates them.

**7.2 — "Price" queries surrendered to competitors.** 1,436 pages have pricing headings; 2 have price tables. Every *"berapa harga servis aircond {area}"* / *"aircond service price {area}"* query — high volume, high intent, snippet-dominated — is being contested with prose against competitors using tables.

**7.3 — Problem pages leave question intent on the table.** 60 pages × 3 locales targeting *"aircond not cold"*, *"aircond water leaking"* etc. — the highest-volume informational queries in the vertical — have 0 direct answers, 0 HowTo schema, 0 tables, 0 images. These should be the site's strongest snippet and AI-citation assets.

**7.4 — Topic clusters have no hub pages.** Cluster inventory (EN):

| Cluster | Blog | Service | Problem | Tool | Hub? |
|---|---|---|---|---|---|
| pricing / cost | 18 | 1 | 20 | 3 | ❌ |
| repair / troubleshooting | 15 | 2 | 18 | 0 | ❌ |
| maintenance / servicing | 28 | 3 | 0 | 1 | ❌ |
| installation | 23 | 1 | 0 | 1 | ✅ `/installation` |
| buying guide / brands | 22 | 0 | 0 | 2 | ❌ |
| energy / electricity | 6 | 1 | 2 | 1 | ❌ |
| **indoor air quality / health** | **1** | 0 | 1 | 0 | ❌ |
| **commercial / office** | **4** | 0 | 0 | 0 | ❌ |
| **sizing / BTU** | **3** | 0 | 0 | 2 | ❌ |

Only *installation* has a true hub. 42 pricing assets and 35 troubleshooting assets exist with no canonical entry point to consolidate authority — they compete rather than compound.

**7.5 — Two clusters are commercially significant and near-empty.** *Commercial/office HVAC* (4 blog posts, no service hub) is the highest-ticket segment in the business. *Indoor air quality/health* (2 assets total) is the fastest-growing informational demand in tropical markets and maps directly onto the chemical-wash service. Both are open goals.

**7.6 — Malay-language installation pages are orphaned from the EN link graph.** The 10 MS installation landing pages use Malay slugs (`/ms/pemasangan-aircond-1hp-kl`) — correct for SEO — but the EN↔MS relationship is only expressed via hreflang, and they sit at 12 near-orphan status. Malay is the majority language of the target market.

**7.7 — 638 pages advertise a date that will expire.** Beyond the CTR loss, "August 2026" in a title is a direct negative trust signal to AI engines evaluating recency.

**7.8 — Zero video schema across 2,169 pages.** Installation and chemical-wash processes are inherently visual and dominate YouTube demand in this vertical. No VideoObject markup anywhere.

---

## 8. Quick Wins

Ordered by **impact ÷ effort**. Items 1–5 are mostly markup changes to content that already exists.

| # | Action | Effort | Pages | Expected impact |
|---|---|---|---|---|
| **1** | **Fix `brand-area-combo-links.ts:192`** — point `href` to `/brands/{slug}/{area}` instead of `/areas/{area}` | **1 line** | **360** | Unlocks 360 orphaned high-intent pages. Highest ROI on the site. |
| **2** | **Add `AggregateRating` to the existing HVACBusiness node** — data already in `config/reviews.ts` | ~10 lines | **2,169** | Star ratings in SERP; substantiates the 5.0/500+ claim for every AI engine. Largest single GEO gain. |
| **3** | **Wire blog `faqs` into FAQPage schema** for the 267 posts using the generic block, and author 3 unique Q&As per post | Low–Med | **267** | Converts 267 pages into FAQ-snippet candidates; removes the site's only real duplicate-content pattern. |
| **4** | **Add a monthly rebuild cron** (GitHub Action + Vercel deploy hook) | ~15 lines | **638** | Stops 638 titles going stale; preserves the freshness tactic instead of inverting it. |
| **5** | **Add `dateModified` + team attribution to location/brand templates** | Low | **1,824** | Lifts GEO freshness 22→~90 and expert signals 12→~60. Two template edits cover 1,400+ pages. |
| **6** | **Add a price table component to area/kampung/brand-area/problem templates** — reuse the blog's table pattern | Medium | **1,782** | Directly targets the #1 snippet format for price queries. Largest single AEO gain. |
| **7** | **Convert problem-page H2s into questions + 40-word answers** | Medium | **60 × 3** | Turns the site's most snippet-eligible pages into direct-answer assets. |
| **8** | **Wire the existing hero image library into kampung/brand-area/problem templates** (+ og:image) | Low | **971** | WhatsApp/social previews, Google Images entry, visual trust on high-intent pages. |
| **9** | **Rename the "Uniqueness Matrix" H2** to something user-facing (e.g. "Aircond Service in {Name} — What to Expect") | Trivial | **474** | Removes internal SEO jargon from 474 user-facing pages. |
| **10** | **Add HowTo schema to the 137 pages** that already contain step content | Low | **137** | Step-snippet eligibility on content already written. |
| **11** | **Cite 2–3 authorities** (TNB tariffs, Energy Commission, SIRIM) on pricing/energy pages | Low | ~200 | Moves citation-worthiness off 5/100; strongest lever for Perplexity/Claude. |
| **12** | **Differentiate SS15/SS16/SS19 titles** with landmark or housing-type modifiers | Trivial | 9 | Clears the only real title-cannibalization cluster. |
| **13** | **Build 3 cluster hubs** — `/pricing`, `/troubleshooting`, `/maintenance` | Medium | 3 new | Consolidates 100+ orphaned-authority assets into rankable hubs. |
| **14** | **Add price/CTA to the 1,392 descriptions** lacking them | Low (scripted) | **1,392** | CTR uplift on the site's core differentiator. |

**Suggested sequence:** Items 1, 2, 4, 9, 12 are a single afternoon and address 3 critical findings. Items 3, 5, 8, 10 are template-level and lift GEO from 53 → ~75. Items 6, 7, 13 are the content investment that moves AEO from 38 → ~70.

---

## 9. Projected scores after remediation

| Score | Now | After Quick Wins 1–5 | After full remediation |
|---|---|---|---|
| Content | 94 | **97** | **98** |
| GEO | 53 | **74** | **86** |
| AEO | 38 | **52** | **78** |

---

## Appendix — Method & reproducibility

```bash
npm ci && npm run build          # 2,172 prerendered pages
node audit/extract.mjs           # → audit/pages.json  (per-page structured record)
node audit/analyze.mjs           # → audit/findings.json (scores, clusters, link graph)
node audit/gaps.mjs              # → audit/gaps.json   (opportunity sizing)
```

**Notes on accuracy.** Next.js streams route content into hidden `<div hidden id="S:n">` payloads after the `<main>` Suspense shell; naive parsers see only "Loading…". The extractor reads the streamed payload and strips only true site chrome (sticky navbar, footer, nav landmarks), preserving article `<header>` elements that legitimately contain the H1. Title/description lengths use **CJK-aware display width** (CJK glyph = 2 units) consistent with `lib/seo-description-optimizer.ts`. Duplicate detection uses 8-gram MD5 shingles with Jaccard similarity, compared within template+locale groups (cross-template similarity is structural, not competitive). Two initial findings — "0 H1s on 573 pages" and "0 hreflang sitewide" — were **traced to parser bugs (greedy regex, case-sensitive `hrefLang`) and corrected**; both are clean in reality and are reported as such above.
