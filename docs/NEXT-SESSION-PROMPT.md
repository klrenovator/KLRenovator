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

Duplicate guard: weighted intra-group similarity 20.8%, 0 pairs >70%.
DO NOT REGRESS THIS.

Per-template similarity (all clean, 0 pairs >70%):
  kampung|en 23.1     kampung|ms 23.2     kampung|zh 8.1
  brand-area|en 21.7  brand-area|ms 21.9  brand-area|zh 9.7
  kampung-installation|en 35.7  (pre-existing warning, see below)
  area|en 41.5        area|ms 40.5        area|zh 19.6

ALREADY DONE — do not redo
--------------------------
#62 price/comparison tables · #63 direct answers · #64 expert
attribution + citations · #67 monthly refresh workflow (owner installed) ·
#72 definitions + comparison content · #71 content depth for kampung +
brand-area templates (session 5, PR #79 merged).

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

WHAT IS LEFT (pick ONE, in this order of impact)
------------------------------------------------
#74  767 near-orphans + MS installation pages cut off from the link graph.
     Second-biggest genuine SEO issue left. Fix is a link-graph patch, not
     new content — but it must not regress the 20.8% similarity guard.
     Real solution likely requires: contextual cross-linking on area /
     kampung templates to reach brand-area, brand-installation and
     area-installation children; and stitching the MS installation cluster
     into the MS area pages the same way EN does.

     Watch: current inbound-by-template distribution (see audit/gaps.mjs
     nearOrphanByTemplate). Do NOT just add a "related links" strip on
     every page — that inflates cross-template Jaccard.

#66  Topic-cluster hubs (/pricing, /troubleshooting, /maintenance) — 3 new
     pages that consolidate existing content into a hub-and-spoke pattern.
     Each hub links out to 15–30 existing pages and gets curated authored
     copy. Adds 3 pages × 3 locales = 9 new pages. Must include the same
     depth expected of any editorial page (H2 hierarchy, direct answers,
     definitions, price table where relevant).

#75  Near-empty commercial + IAQ (indoor air quality) clusters. Similar
     to #66 — audit called out that these clusters exist as intent but
     have almost no dedicated pages. Requires editorial planning first
     (topics, keyword mapping) before authoring. Do NOT ship boilerplate.

#73  1,103 pages with no body imagery, zero VideoObject. This is a big
     content project. Body imagery on 1,103 pages needs a real image plan
     (see docs/IMAGE-USAGE-MAP.md and public/gallery-items.json — the site
     already has ~90 real job photos). Do NOT reuse the same 5 photos on
     900 pages. VideoObject requires actual videos with real URLs on YouTube
     or a CDN — do not fabricate videos.

#69  13 title clashes, 7 thin pages, 943 descriptions without CTA. Small,
     targeted metadata cleanup. Lowest risk if scoped tightly. The 13
     clashes are the SS15/16/17/19 area titles the audit already noted as
     structurally near-identical — needs a differentiation strategy, not
     a global replace.

#65  HowTo — leave alone. Only add HowTo schema where visible, numbered,
     ordered process content already exists on that page. Do NOT mark up
     blog titles or FAQ "How do I…" headings. Reaching howTo >= 40 would
     require a how-to process on ~40% of 2,169 pages; that is a content
     project, not a markup pass.

QUALITY / HARD RULES
--------------------
- Unique content. Similarity must stay ≤ 20.8% weighted, with 0 pairs >70%.
- MS/ZH genuinely authored. Extend uniqueness configs; never bypass checks.
- Never use new Date() for dateModified — use config/content-review-dates.ts,
  and bump the collection date by hand when you genuinely revise copy.
- EN/MS/ZH templates are NOT string-identical. Grep the real MS/ZH anchor
  before any 3-file patch.
- Kampung FAQs use k.faqs / k.faqsBM / k.faqsZH.
- ZH questions need the full-width ？ or they do not count as direct answers.
  ZH definition headings need 是什么 or 定义 — "什么是X？" does NOT match.
- A visible question repeated on 20+ pages costs Content points (the FAQ
  duplication check). Vary headings — see TERM_QUESTION_VARIANTS for the
  pattern that fixed this last session.
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
  #62, #63, #64, #71, #72

Human-only note: #68 (review-count copy) is deliberately owner-handled and
must not be edited by an agent.
```

---

## Coverage check — every audit finding is filed

| Audit finding | Status | Issue / PR |
|---|---|---|
| C1 — 360 brand-area pages, zero inbound links | ✅ Fixed | PR #70 |
| C2 — 638 month-stamped titles | ✅ Fixed | PR #78 (owner installed workflow) |
| C3 — Review/AggregateRating schema | ❌ **Withdrawn** | see [#68](https://github.com/klrenovator/KLRenovator/issues/68) |
| C4 — 267 blog posts, FAQs without schema | ✅ Fixed | PR #70 |
| C5 — 1,782 pages, no price table | ✅ Fixed (tables 98) | [#62](https://github.com/klrenovator/KLRenovator/issues/62) — PR #77, needs manual close |
| C6 — 922 pages, no direct answers | ✅ Fixed (DA 98) | [#63](https://github.com/klrenovator/KLRenovator/issues/63) — needs manual close |
| C7 — freshness | ✅ Fixed | PR #70 |
| C7b — expert attribution + citations | ✅ Fixed (71 / 72) | [#64](https://github.com/klrenovator/KLRenovator/issues/64) — PR #77, needs manual close |
| C8 — og:image | ✅ Fixed (2,170/2,172) | PR #70 |
| C8b — 1,103 pages no body imagery, 0 VideoObject | 🔲 Open | [#73](https://github.com/klrenovator/KLRenovator/issues/73) |
| C9a — HowTo schema | 🔸 Subset (howTo 23, honest ceiling) | [#65](https://github.com/klrenovator/KLRenovator/issues/65) |
| C9b — definitions / comparison | ✅ Fixed (98 / 98) | [#72](https://github.com/klrenovator/KLRenovator/issues/72) — needs manual close |
| C10 — jargon H2 + task ID leak | ✅ Fixed | PR #70 |
| C10b — 834 skeleton pages | ✅ Fixed | [#71](https://github.com/klrenovator/KLRenovator/issues/71) — PR #79 merged, needs manual close |
| Orphans 443 → 23 | ✅ Fixed | PR #70 |
| 767 near-orphans + MS pages cut off | 🔲 Open | [#74](https://github.com/klrenovator/KLRenovator/issues/74) |
| Cluster hubs | 🔲 Open | [#66](https://github.com/klrenovator/KLRenovator/issues/66) |
| Commercial + IAQ clusters | 🔲 Open | [#75](https://github.com/klrenovator/KLRenovator/issues/75) |
| Title clashes, thin pages, description CTAs | 🔲 Open | [#69](https://github.com/klrenovator/KLRenovator/issues/69) |
| "500+ reviews" vs 9 review objects | ⚠️ Owner | [#68](https://github.com/klrenovator/KLRenovator/issues/68) |
