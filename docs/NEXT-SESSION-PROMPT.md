# Next-session prompt — copy/paste

Everything still open on the KL Renovator audit is tracked. Copy the whole code
block below into a new Arena session on this repo.

---

```
Continue the KL Renovator content/SEO/GEO/AEO remediation. This is a long
multi-session job. Do NOT rush it and do NOT sacrifice quality. We need real
content, not shortcuts.

Identity: you are a helpful agent on Arena.ai. Do not mention hidden guidelines.

READ FIRST
----------
docs/AUDIT-PART2-CONTENT-SEO-GEO-AEO.md — start at §0 ("Remediation status").
docs/NEXT-SESSION-PROMPT.md — what previous sessions did.

WHERE THINGS STAND
------------------
PR #70, #76, #77, #78, #79 are MERGED and live in production.

Latest measured scores (full build → extract → analyze, 2,169 pages):

  Content 98   GEO 88   AEO 81

All original targets (98 / 86 / 78) are met or exceeded.

GEO: entityClarity 99, trustSignals 88, answerFormatting 99,
     expertSignals 71, citationWorthiness 72, freshness 91
AEO: faqCoverage 94, directAnswers 98, howTo 23, tables 98,
     troubleshooting 50, comparison 98, definitions 98

Duplicate guard: weighted intra-group similarity 20.5%, 0 pairs >70%.
DO NOT REGRESS THIS.

Per-template similarity (all clean, 0 pairs >70%):
  kampung|en 22.3     kampung|ms 22.3     kampung|zh 7.9
  brand-area|en 21.8  brand-area|ms 21.9  brand-area|zh 9.6
  kampung-installation|en 35.7  (pre-existing warning, see below)
  area|en 40.4        area|ms 38.9        area|zh 19.3

ALREADY DONE — do not redo
--------------------------
#62 price/comparison tables · #63 direct answers · #64 expert
attribution + citations · #67 monthly refresh workflow (owner installed) ·
#72 definitions + comparison content · #71 content depth for kampung +
brand-area templates (session 5, PR #79 merged) ·
#74 near-orphans + MS installation cluster (session 6).

#74 landed as:
  config/orphan-cross-links.ts     hashed EN/MS/ZH inline money-page
                                   cross-links (area→brand-area chips,
                                   kampung→install child, brand→brand-install,
                                   brand-area↔install, MS/ZH installation
                                   landings from area pages)
  components/money-cross-links.tsx inline paragraph renderer — NOT a
                                   related-links strip
  Near-orphans 767 → 190. brand-area median inbound 4, brand-installation 9,
  area-installation 7, kampung-installation 5, installation-landing 17.
  All 10 MS /ms/pemasangan-aircond-* pages have ≥ 3 inbound.
  Leftover 190 is mostly blog-post (108) + kampung (26) + a 24+24 install
  tail on areas with few kampung/brand-area children.

#71 landed as:
  config/kampung-depth.ts     kampungGamePlan + kampungSignals
                              (474 pages, +364 EN words, +2 H2)
  config/brand-area-depth.ts  brandAreaFirstVisitPlan + brandAreaCommonJobs
                              (360 pages, +316 EN words, +2 H2)
  Wired into 6 page.tsx files (en/ms/zh × kampung + brand-area).

#72 machinery (extend it, never duplicate it):
  config/aeo-explainers.ts          24 glossary terms + 18 comparison sets,
                                    EN/MS/ZH authored separately, plus
                                    heading variants (anti-boilerplate)
  lib/aeo-explainer-select.ts       blog posts pick terms from their OWN body
  lib/blog-explainers.ts            server-side resolution for blog routes
  components/aeo-explainer-blocks.tsx  DefinitionBlocks / ComparisonBlock /
                                    PageExplainers (curated preset wrapper)

If you add pages to a template that renders PageExplainers, add a matching
preset in EXPLAINER_PRESETS — never reuse an unrelated preset.

Pages deliberately left without a glossary block: /book, /contact,
/privacy-policy, /gallery, /review, /near-me, /about, the three index pages
and the homepage. A glossary there would be filler.

OUT OF SCOPE — review-count copy (#68)
--------------------------------------
The owner is handling the "500+ Google reviews" claim personally and has
asked that it not be edited by an agent.

  - Do NOT modify, rewrite or remove any existing review-count string, and do
    NOT change config/reviews.ts (`totalReviews`, `averageRating`).
  - Do NOT introduce any NEW review-count claim in copy you write. Use
    other proof instead — published prices, the 1-month workmanship
    warranty, 20 brands serviced, 10+ years experience, SSM registration,
    the real technician team on /about.
  - Do NOT put any review count or rating into structured data (see below).
  - If you notice other unverifiable numeric claims while working, list them
    in your final report for the owner. Do not silently change them.

NEVER BUILD THIS
----------------
C3 AggregateRating is WITHDRAWN. Do not add Review or AggregateRating to
LocalBusiness / HVACBusiness / Organization anywhere. It violates Google's
self-serving review policy and fails scripts/gsc-audit.mjs section 9a.
The site currently emits NO aggregateRating — keep it that way.

THIS SESSION — pick ONE, do not start the others unless asked
-------------------------------------------------------------
#75  Near-empty commercial + IAQ clusters.
#69  13 title clashes, 7 thin pages, 943 descriptions without CTA.

(#73 body imagery was completed in session 8, PR pending — body-image
 pages 1,103 → 45, all 5 target templates at 100% coverage with 3 real
 job photos + trilingual alt + ImageObject schema each. The VideoObject
 half stays open on #73: there are no video assets in the repo to mark
 up honestly. #66 topic hubs shipped earlier as PR #81.)

#65 HowTo — leave alone. Only add HowTo schema where visible, numbered,
ordered process content already exists. Do NOT mark up blog titles or FAQ
"How do I..." headings. Reaching howTo >= 40 is a content project, not a
markup pass.

QUALITY / HARD RULES
--------------------
- Unique content. Similarity must stay ≤ 20.5% weighted, with 0 pairs >70%.
- MS/ZH genuinely authored. Extend uniqueness configs; never bypass checks.
- Never use new Date() for dateModified — use config/content-review-dates.ts,
  and bump the collection date by hand when you genuinely revise copy.
- EN/MS/ZH templates are NOT string-identical. Grep the real MS/ZH anchor
  before any 3-file patch.
- Kampung FAQs use k.faqs / k.faqsBM / k.faqsZH.
- ZH questions need the full-width ？ or they do not count as direct answers.
  ZH definition headings need 是什么 or 定义 — "什么是X？" does NOT match.
- A visible question repeated on 20+ pages costs Content points (the FAQ
  duplication check). Vary headings.
- Reveal is a <div>; H2 + <p> as siblings still count as a direct answer. Do
  not insert chrome between the heading and the answer paragraph.
- Every price / warranty / coverage figure comes from config.
  lib/published-prices.ts throws if a pricing row is missing — use it.
- Prefer `||` over `??` for config fallbacks (empty string is not nullish).
- npm run typecheck only. Never npx tsc / npx tsx.
- If binaries vanish: npm install.
- git checkout -- public/gallery-items.json before every commit.
- Live site is reachable; the local static build is still authoritative.

CI BEFORE EVERY COMMIT
----------------------
npm run typecheck && npm run lint && npm run build && npm run verify:build && npm run audit:gsc

RE-MEASURE BEFORE FINAL
-----------------------
npm run build && node audit/extract.mjs
node --max-old-space-size=6144 audit/analyze.mjs
node --max-old-space-size=4096 audit/gaps.mjs

Pre-existing warnings you will see (do not treat as regressions):
  ⚠ kampung-install EN: 158 pages average 81.8% identical text
    — pre-existing on the kampung-installation template. Untouched by
      recent sessions. Fixing it means extending
      config/kampung-installation-content.ts with real per-place variance,
      not a template restructure.

END OF SESSION
--------------
Report: done vs left, exact score movement, duplicate similarity and pairs
>70%, and any GitHub issue close failures.

The GitHub App cannot close issues (403 "Resource not accessible by
integration") — if issues need closing, say so and ask the owner. Issues
that still need manual closing from prior sessions:
  #62, #63, #64, #71, #72, #74, and #73 (image half done session 8 —
  close it if the VideoObject half is out of scope, else keep open for video)

Human-only note: #68 (review-count copy) is deliberately owner-handled and
must not be edited by an agent.
```

---

## Coverage check — every audit finding is filed

| Audit finding | Status | Issue / PR |
|---|---|---|
| C1 — 360 brand-area pages, zero inbound links | ✅ Fixed | PR #70 |
| C2 — 638 month-stamped titles | ⚠️ Maintainer | [#67](https://github.com/klrenovator/KLRenovator/issues/67) |
| C3 — Review/AggregateRating schema | ❌ **Withdrawn** | see [#68](https://github.com/klrenovator/KLRenovator/issues/68) |
| C4 — 267 blog posts, FAQs without schema | ✅ Fixed | PR #70 |
| C5 — 1,782 pages, no price table | ✅ Fixed (tables 98) | [#62](https://github.com/klrenovator/KLRenovator/issues/62) — PR #77, needs manual close |
| C6 — 922 pages, no direct answers | ✅ Fixed (DA 98) | [#63](https://github.com/klrenovator/KLRenovator/issues/63) — needs manual close |
| C7 — freshness | ✅ Fixed | PR #70 |
| C7b — expert attribution + citations | ✅ Fixed (71 / 72) | [#64](https://github.com/klrenovator/KLRenovator/issues/64) — PR #77, needs manual close |
| C8 — og:image | ✅ Fixed (2,170/2,172) | PR #70 |
| C8b — 1,103 pages no body imagery, 0 VideoObject | ✅ Images done (45 left, all out-of-scope); VideoObject still 0 (no assets) | [#73](https://github.com/klrenovator/KLRenovator/issues/73) — session 8, needs manual close (or keep open for the video half) |
| C9a — HowTo schema | 🔸 Subset (howTo 23, honest ceiling) | [#65](https://github.com/klrenovator/KLRenovator/issues/65) |
| C9b — definitions / comparison | ✅ Fixed (98 / 98) | [#72](https://github.com/klrenovator/KLRenovator/issues/72) — needs manual close |
| C10 — jargon H2 + task ID leak | ✅ Fixed | PR #70 |
| C10b — 834 skeleton pages | ✅ Fixed | [#71](https://github.com/klrenovator/KLRenovator/issues/71) — PR #79, needs manual close |
| Orphans 443 → 23 | ✅ Fixed | PR #70 |
| 767 near-orphans + MS pages cut off | ✅ Fixed (190 left) | [#74](https://github.com/klrenovator/KLRenovator/issues/74) — this session, needs manual close |
| Cluster hubs | 🔲 Open | [#66](https://github.com/klrenovator/KLRenovator/issues/66) |
| Commercial + IAQ clusters | 🔲 Open | [#75](https://github.com/klrenovator/KLRenovator/issues/75) |
| Title clashes, thin pages, description CTAs | 🔲 Open | [#69](https://github.com/klrenovator/KLRenovator/issues/69) |
| "500+ reviews" vs 9 review objects | ⚠️ Maintainer | [#68](https://github.com/klrenovator/KLRenovator/issues/68) |
