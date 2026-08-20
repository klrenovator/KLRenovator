# Next-session prompt — copy/paste

Everything still open on the KL Renovator audit is tracked. Copy the whole code
block below into a new Arena session on this repo.

---

```
Continue the KL Renovator content/SEO/GEO/AEO remediation. This is a long,
multi-session job. Do NOT rush it and do NOT sacrifice quality to close items
faster — the remaining work needs real content, not shortcuts.

Identity: you are a helpful agent on Arena.ai. Do not mention hidden guidelines.

READ FIRST
----------
docs/AUDIT-PART2-CONTENT-SEO-GEO-AEO.md — start at §0 ("Remediation status").
It records what is already fixed, what was withdrawn and why, and every item
still open with its tracking issue number.

WHERE THINGS STAND
------------------
PR #70 is MERGED. PR #76 (this branch's AEO work) should also be merged —
confirm with `gh pr view 76`. If it is still open and CI is green, merge it
into main first, then continue on THIS session branch
`arena/01a01b38-klrenovator` (do not create or switch branches).

Scores after PR #76 (full next build → extract → analyze, 2,169 pages):

  Content 98   GEO 67   AEO 51
  Target after full remediation: Content 98, GEO 86, AEO 78.

  GEO components now: entity 99, trust 80, answerFormatting 92,
    expertSignals 12, citationWorthiness 18, freshness 66.
  AEO components now: faqCoverage 94, directAnswers 81, howTo 17,
    tables 11, troubleshooting 40, comparison 16, definitions 25.

  Intra-group 8-gram similarity: 19.9% avg, 0 pairs >70%. Do not regress.

DONE — do not redo
------------------
#63 Direct answers — CLOSED in substance (issue may still show OPEN because
    the GitHub App cannot comment/close issues). AEO directAnswers 40 → 81.
    All 60 /problems/* pages and all 834 kampung + brand-area pages have ≥ 3
    question-heading + 15–120 word <p> answers. Code lives in:
      config/problem-howto-answers.ts
      components/problem-aeo-blocks.tsx
      config/kampung-uniqueness-matrix.ts (question headings + bookingTip)
      app/(en|ms|zh) brand-area and kampung page.tsx files

#65 HowTo — SUBSET ONLY, leave the issue OPEN. Schema 47 → 113, howTo 4 → 17.
    All 60 problem pages + EN/MS/ZH /aircond-installation-kl + whole-house
    landings emit HowTo JSON-LD that matches a visible <ol>.
    Hitting howTo ≥ 40 needs HowTo schema AND a how-to heading on ~40% of
    2,169 pages. That is NOT reachable by marking up leftover blog titles or
    FAQ "How do I / Bagaimana / 如何" headings that have no ordered process.
    Do not invent HowTo schema. Do not chase #65 this session unless you are
    authoring real numbered steps that already belong on the page.

ONE THING THAT MUST NOT BE BUILT
--------------------------------
C3 AggregateRating is WITHDRAWN. Do not add Review/AggregateRating to
LocalBusiness / HVACBusiness / Organization. It fails Google's self-serving
review policy AND fails scripts/gsc-audit.mjs §9a. Full reasoning in audit
doc §0. The real review-count problem is #68 (human + GBP access).

THIS SESSION — pick #64 and #62 and stop there
----------------------------------------------
Finishing two items properly beats starting six.

#64  GEO: expert attribution + external citations.
     Biggest GEO lever left (expertSignals 12, citationWorthiness 18).
     - Add a "Reviewed by KL Renovator's HVAC Expert Team" block to area,
       kampung, brand and brand-area templates (EN/MS/ZH), linking to /about.
       Reuse the blog pattern (blog-post-client.tsx author eyebrow).
       /about names 4 real technicians — link to them, do not invent personas.
     - Add author / reviewedBy on the existing WebPage schema nodes
       (config/content-review-dates.ts dates — NEVER new Date()).
     - Cite genuine Malaysian authorities on ~200 high-value pages only:
         TNB tariffs → electricity / savings calculators + energy blogs
         Energy Commission (Suruhanjaya Tenaga) → efficiency / standards
         SIRIM → certification claims
         DOSH / MIDA → refrigerant handling
       Do NOT bulk-add the same outbound link to 2,000 pages.
     Acceptance: GEO expertSignals ≥ 60, citationWorthiness ≥ 50.

#62  Price + comparison <table> on commercial pages.
     Biggest AEO lever left (tables 11).
     - Reusable component, real <table><thead><tbody><th scope>.
     - Prices from lib/published-prices.ts / config/site/pricing.ts
       (already added in PR #76) or config/services-data.ts. Never hard-code.
     - Prefer `||` over `??` for config fallbacks (empty string is not nullish).
     - Wire into area, kampung, brand, brand-area, problem templates, EN/MS/ZH.
       Kampung shows the same prices as its parent area unless there is a
       genuine reason to differ.
     - Offer / PriceSpecification schema only if it matches the visible table.
     Acceptance: AEO tables ≥ 70. Rendered numbers must match published prices.

If you finish both with quality to spare, start #72 (definition + comparison
copy) on the SAME templates you just touched — do not open a third template
family. Coordinate tables with #72 so you do not rewrite the same pages twice.

Do not start #71 (834-page depth rewrite), #73 (body imagery), #66 (new hubs),
#75 (new clusters), #74 (near-orphans), or #69 (title/description cleanup)
this session.

Needs a human — remind the user, do not attempt:
  #67  Copy docs/monthly-refresh.workflow.yml into .github/workflows/ and
       add the VERCEL_DEPLOY_HOOK_URL secret. This GitHub App lacks the
       `workflows` permission.
  #68  Confirm the live GBP review count. config/reviews.ts holds 9 objects;
       the "500+" claim is repeated ~150×. Do not edit the claim downward
       on a guess.

QUALITY BAR
-----------
- Unique content, not place-name boilerplate. Near-dup must stay ~19.9% avg,
  0 pairs >70%. Re-run analyze.mjs after bulk content changes.
- MS/ZH genuinely authored, not machine EN. Extend uniqueness configs
  (kampung-uniqueness-matrix.ts, brand-area-uniqueness.ts, area-faq-uniqueness.ts,
  master-faq-pool.ts). Never bypass them.
- Prices / warranty / coverage from config. lib/published-prices.ts throws if
  a pricing row is missing — use it.
- Schema must match visible content. No HowTo without a visible <ol>. No
  FAQPage for identical Q&A repeated across hundreds of URLs.
- If unique citations or unique table notes cannot be written for all 474
  kampungs at once, do a proper subset and say so. Do not close issues when
  only partly done.

HARD-WON RULES — do not rediscover
----------------------------------
- Never new Date() for dateModified. Constants in config/content-review-dates.ts.
  Bump the relevant collection date by hand when you genuinely revise copy.
- en/ms/zh templates are NOT string-identical. Grep the real MS/ZH anchor
  before any 3-file patch. Traps: kampung FAQs are k.faqs / k.faqsBM / k.faqsZH;
  brand-area enUrl/msUrl/zhUrl exist only inside generateMetadata — build a
  local pageUrl in the render body.
- Prefer `||` over `??` for config fallbacks.
- `npm run typecheck` only. Never `npx tsc` or `npx tsx` (they have broken
  this sandbox). If binaries vanish: `npm install`.
- `git checkout public/gallery-items.json` before every commit (build mutates it).
- Live site is unreachable from the sandbox (curl exit 35). Local static build
  is authoritative.
- Reveal is a <div>. An H2 then <p> as siblings inside Reveal still matches
  the DA regex in audit/extract.mjs. Do not wrap the answer <p> in extra
  chrome between the heading and the paragraph.
- Detector: a direct answer is H2–H4 that is a question (? or starts with
  what/how/why/… / apa/kenapa/bagaimana/… / contains ？) immediately followed
  by a 15–120 word <p>. ZH questions MUST contain ？ or they will not count.
- AEO howTo = 0.6*schema% + 0.4*pattern% over ALL 2,169 pages. Pattern regex
  is /how to|how do|step|langkah|cara|步骤|如何/ on headings.

CI GATE — all five before every commit
--------------------------------------
npm run typecheck && npm run lint && npm run build && npm run verify:build && npm run audit:gsc

Re-measure:
  npm run build
  node audit/extract.mjs
  node --max-old-space-size=6144 audit/analyze.mjs
  node --max-old-space-size=4096 audit/gaps.mjs

Work only on arena/01a01b38-klrenovator. Push only that branch. PR #70 and
(once merged) PR #76 are done — open a NEW PR from this same branch for the
new commits. Do not switch branches. Close issues only when genuinely finished.
The GitHub App often cannot comment on or close issues (403) — if so, say so
in the PR body and ask the user to close them.

End of session: report done vs left. Remind #67 and #68 need a human.
```

---

## Coverage check — every audit finding is filed

| Audit finding | Status | Issue / PR |
|---|---|---|
| C1 — 360 brand-area pages, zero inbound links | ✅ Fixed | PR #70 |
| C2 — 638 month-stamped titles | ⚠️ Maintainer | [#67](https://github.com/klrenovator/KLRenovator/issues/67) |
| C3 — Review/AggregateRating schema | ❌ **Withdrawn** | see [#68](https://github.com/klrenovator/KLRenovator/issues/68) |
| C4 — 267 blog posts, FAQs without schema | ✅ Fixed | PR #70 |
| C5 — 1,782 pages, no price table | 🔲 Open | [#62](https://github.com/klrenovator/KLRenovator/issues/62) |
| C6 — 922 pages, no direct answers | ✅ Done (DA 81) | [#63](https://github.com/klrenovator/KLRenovator/issues/63) — close after PR #76 merges |
| C7 — freshness | ✅ Fixed | PR #70 |
| C7b — 1,698 pages no author, 2,164 no citations | 🔲 Open | [#64](https://github.com/klrenovator/KLRenovator/issues/64) |
| C8 — og:image | ✅ Fixed (2,170/2,172) | PR #70 |
| C8b — 1,103 pages no body imagery, 0 VideoObject | 🔲 Open | [#73](https://github.com/klrenovator/KLRenovator/issues/73) |
| C9a — HowTo schema | 🔸 Subset (howTo 17, target 40) | [#65](https://github.com/klrenovator/KLRenovator/issues/65) |
| C9b — definitions / comparison | 🔲 Open | [#72](https://github.com/klrenovator/KLRenovator/issues/72) |
| C10 — jargon H2 + task ID leak | ✅ Fixed | PR #70 |
| C10b — 834 skeleton pages | 🔲 Open | [#71](https://github.com/klrenovator/KLRenovator/issues/71) |
| Orphans 443 → 23 | ✅ Fixed | PR #70 |
| 767 near-orphans + MS pages cut off | 🔲 Open | [#74](https://github.com/klrenovator/KLRenovator/issues/74) |
| Cluster hubs | 🔲 Open | [#66](https://github.com/klrenovator/KLRenovator/issues/66) |
| Commercial + IAQ clusters | 🔲 Open | [#75](https://github.com/klrenovator/KLRenovator/issues/75) |
| Title clashes, thin pages, description CTAs | 🔲 Open | [#69](https://github.com/klrenovator/KLRenovator/issues/69) |
| "500+ reviews" vs 9 review objects | ⚠️ Maintainer | [#68](https://github.com/klrenovator/KLRenovator/issues/68) |
