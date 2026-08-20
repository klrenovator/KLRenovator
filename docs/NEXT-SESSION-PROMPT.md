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

WHERE THINGS STAND
------------------
PR #70, #76, #77 are MERGED. The #72 work (definition + comparison blocks on
editorial templates) is complete and in its own PR from this branch.

Latest measured scores (full build → extract → analyze, 2,169 pages):

  Content 98
  GEO     88
  AEO     81

Original targets (Content 98 / GEO 86 / AEO 78) are all met or exceeded.

GEO components: entityClarity 99, trustSignals 88, answerFormatting 99,
                expertSignals 71, citationWorthiness 72, freshness 91
AEO components: faqCoverage 94, directAnswers 98, howTo 23, tables 98,
                troubleshooting 50, comparison 98, definitions 98

Duplicate guard: weighted intra-group similarity 22.4%, 0 pairs >70%.
Do not regress this.

DONE — do not redo
------------------
#63 direct answers (98), #62 price/comparison tables (98), #64 expert
attribution + citations, #72 definitions + comparison content (98/98).

#72 landed as:
  config/aeo-explainers.ts        24 glossary terms + 18 comparison sets,
                                  authored separately in EN/MS/ZH, plus
                                  alternate heading phrasings so no heading
                                  repeats across the site
  lib/aeo-explainer-select.ts     blog posts pick terms from their OWN body
  lib/blog-explainers.ts          server-side resolution for the 3 blog routes
  components/aeo-explainer-blocks.tsx
                                  DefinitionBlocks / ComparisonBlock /
                                  PageExplainers (curated preset wrapper)

If you add pages to a template that already renders PageExplainers, add a
matching preset in EXPLAINER_PRESETS — do NOT reuse an unrelated preset.

Pages deliberately left without a glossary block: /book, /contact,
/privacy-policy, /gallery, /review, /near-me, /about, the three index pages
and the homepage. A glossary there would be filler.

WHAT IS LEFT (pick ONE or TWO, in this order)
---------------------------------------------
#71  kampung + brand-area templates are 2-H2, ~580-word skeletons (834 pages).
     Biggest genuine content gap left. Needs real per-place authoring, not
     place-name substitution. Watch similarity: kampung-installation EN
     already averages ~81.8% identical text in scripts/gsc-audit.mjs and
     35.7% 8-gram similarity in audit/analyze.mjs.

#74  767 near-orphans + MS installation pages cut off from the link graph.

#73  1,103 pages with no body imagery, zero VideoObject.

#66  Topic-cluster hubs (/pricing, /troubleshooting, /maintenance).

#75  Near-empty commercial + IAQ clusters.
#69  13 title clashes, 7 thin pages, 943 descriptions without CTA.

#65  HowTo — LEAVE MOSTLY ALONE. Only add HowTo schema where visible,
     numbered, ordered process content already exists on that page. Do NOT
     mark up blog titles or FAQ "How do I…" headings. Reaching howTo ≥ 40
     would require a how-to process on ~40% of 2,169 pages; that is a content
     project, not a markup pass. If you do author steps, they must be real,
     visible, localized and matched 1:1 by the schema.

NEVER BUILD THIS
----------------
C3 AggregateRating is WITHDRAWN. Do not add Review or AggregateRating to
LocalBusiness / HVACBusiness / Organization. It violates Google's
self-serving review policy and fails scripts/gsc-audit.mjs §9a.

QUALITY / HARD RULES
--------------------
- Unique content. Similarity must stay low, with 0 pairs >70%.
- MS/ZH genuinely authored. Extend uniqueness configs; never bypass checks.
- Never use new Date() for dateModified — use config/content-review-dates.ts.
- EN/MS/ZH templates are NOT string-identical.
- Kampung FAQs use k.faqs / k.faqsBM / k.faqsZH.
- ZH questions need ？ or they do not count as direct answers. ZH definition
  headings need 是什么 or 定义 — "什么是X？" does NOT match the detector.
- Watch the FAQ-duplication check: a visible question repeated on 20+ pages
  costs Content points. Vary headings (see TERM_QUESTION_VARIANTS).
- Prefer `||` over `??` where this repo's rules expect it.
- Reveal is a <div>; H2 + <p> as siblings still count as a direct answer. Do
  not insert chrome between the heading and the answer paragraph.
- npm run typecheck only. Never npx tsc / npx tsx.
- If binaries vanish: npm install.
- git checkout -- public/gallery-items.json before every commit.
- Live site may be unreachable; local static build is authoritative.

CI BEFORE EVERY COMMIT
----------------------
npm run typecheck && npm run lint && npm run build && npm run verify:build && npm run audit:gsc

RE-MEASURE BEFORE FINAL
-----------------------
npm run build && node audit/extract.mjs
node --max-old-space-size=6144 audit/analyze.mjs
node --max-old-space-size=4096 audit/gaps.mjs

END OF SESSION
--------------
Report: done vs left, exact score movement, duplicate similarity / 0 pairs
>70%, and any GitHub issue close failures.

Remind human-only:
  #67 needs workflow permission + VERCEL_DEPLOY_HOOK_URL
  #68 needs GBP access to reconcile the 500+ review claim vs 9 local review
      objects
  #62, #64, #72 are fixed in merged/open PRs but may still show OPEN — the
      GitHub App cannot close issues (403 "Resource not accessible by
      integration"). A maintainer must close them.
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
| C8b — 1,103 pages no body imagery, 0 VideoObject | 🔲 Open | [#73](https://github.com/klrenovator/KLRenovator/issues/73) |
| C9a — HowTo schema | 🔸 Subset (howTo 23, honest ceiling) | [#65](https://github.com/klrenovator/KLRenovator/issues/65) |
| C9b — definitions / comparison | ✅ Fixed (98 / 98) | [#72](https://github.com/klrenovator/KLRenovator/issues/72) — needs manual close |
| C10 — jargon H2 + task ID leak | ✅ Fixed | PR #70 |
| C10b — 834 skeleton pages | 🔲 Open | [#71](https://github.com/klrenovator/KLRenovator/issues/71) |
| Orphans 443 → 23 | ✅ Fixed | PR #70 |
| 767 near-orphans + MS pages cut off | 🔲 Open | [#74](https://github.com/klrenovator/KLRenovator/issues/74) |
| Cluster hubs | 🔲 Open | [#66](https://github.com/klrenovator/KLRenovator/issues/66) |
| Commercial + IAQ clusters | 🔲 Open | [#75](https://github.com/klrenovator/KLRenovator/issues/75) |
| Title clashes, thin pages, description CTAs | 🔲 Open | [#69](https://github.com/klrenovator/KLRenovator/issues/69) |
| "500+ reviews" vs 9 review objects | ⚠️ Maintainer | [#68](https://github.com/klrenovator/KLRenovator/issues/68) |
