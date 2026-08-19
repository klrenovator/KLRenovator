# Ready-to-paste prompt for the next session

Copy everything inside the code block below into a new Arena session on this repo.

---

```
Continue the KL Renovator content/SEO/GEO/AEO remediation.

Context: PR #70 is open and covers Part 2 of the enterprise audit plus fixes for
findings C1, C4, C7, C8, C10 and the site-wide orphan problem. The full audit is
at docs/AUDIT-PART2-CONTENT-SEO-GEO-AEO.md — read section 0 ("Remediation status")
first, it tells you exactly what is already done, what was withdrawn and why, and
what is still open.

Current scores: Content 98, GEO 59, AEO 40.
The two weak scores are GEO and AEO, and the components dragging them down are:
  expertSignals 12, citationWorthiness 18, howTo 4, definitions 12, tables 11,
  comparison 16, directAnswers 40.

Work the open issues in this order — they are ordered by impact per unit of effort:

  1. #65  HowTo schema on 137 pages that ALREADY have visible step content.
          Pure markup, no writing. Fastest score movement available.
  2. #63  Direct-answer blocks on 922 pages. Start with the 60 /problems/* pages —
          they target question intent and currently have zero question headings.
  3. #64  Expert attribution (1,698 pages) + external citations to TNB, Energy
          Commission and SIRIM. This is the single biggest GEO lever.
  4. #62  Price and comparison tables on commercial pages.
  5. #66  Topic-cluster hubs: /pricing, /troubleshooting, /maintenance.
  6. #69  Cleanup: 13 title clashes, 7 thin pages, 943 descriptions with no CTA.

Please pick up #65 and #63 this session and stop there rather than rushing all six.

Hard rules — these were learned the hard way, do not rediscover them:

- Do NOT add aggregateRating or review schema to HVACBusiness/LocalBusiness.
  Google's self-serving review policy makes it ineligible, and this repo's own
  scripts/gsc-audit.mjs section 9a fails the build on it. The reasoning is in
  section 0 of the audit doc.
- Do NOT use new Date() for dateModified. Dates are hand-maintained constants in
  config/content-review-dates.ts. Auto-bumping per deploy is structured-data spam.
- HowTo schema must only be emitted where ordered steps are VISIBLE on the page.
- The en/ms/zh templates are NOT string-identical. Always grep the ms and zh file
  for the real anchor before running any 3-file batch patch — kampung FAQ uses
  k.faqsBM / k.faqsZH, and grid class names differ between locales.
- Use `npm run typecheck`, never `npx tsc` (it installs the wrong package) and
  never `npx tsx` (it has wiped node_modules here).
- Run `git checkout public/gallery-items.json` before committing; the build
  mutates it.
- CI gate before every commit:
  npm run typecheck && npm run lint && npm run build && npm run verify:build && npm run audit:gsc

To re-measure scores after your changes:
  npm run build
  node audit/extract.mjs
  node --max-old-space-size=6144 audit/analyze.mjs
  node --max-old-space-size=4096 audit/gaps.mjs

Push to the session branch and update PR #70 (or open a new PR if #70 has merged).
```

---

## Quick reference — where things stand

**Merged into the branch / in PR #70**

| Finding | Status |
|---|---|
| C1 — 360 orphaned brand-area pages | Fixed |
| C4 — blog FAQ schema | Fixed (1,862 → 2,028 FAQPage) |
| C7 — freshness | Fixed (`dateModified` 339 → 1,293) |
| C8 — og:image | Fixed (2,170 / 2,172 pages) |
| C10 — jargon headings + leaked task ID | Fixed |
| Orphan pages | 443 → 23 |
| C3 — AggregateRating | **Withdrawn** — would fail CI and Google policy |

**Open issues**

| Issue | Item |
|---|---|
| [#62](https://github.com/klrenovator/KLRenovator/issues/62) | Price & comparison tables — 1,782 pages |
| [#63](https://github.com/klrenovator/KLRenovator/issues/63) | Direct-answer blocks — 922 pages |
| [#64](https://github.com/klrenovator/KLRenovator/issues/64) | Expert attribution + external citations |
| [#65](https://github.com/klrenovator/KLRenovator/issues/65) | HowTo schema — 137 pages |
| [#66](https://github.com/klrenovator/KLRenovator/issues/66) | Topic-cluster hubs |
| [#67](https://github.com/klrenovator/KLRenovator/issues/67) | ⚠️ Maintainer — install monthly rebuild workflow |
| [#68](https://github.com/klrenovator/KLRenovator/issues/68) | ⚠️ Maintainer — verify the "500+ reviews" claim |
| [#69](https://github.com/klrenovator/KLRenovator/issues/69) | Title clashes, thin pages, description CTAs |

**#67 and #68 cannot be done by an agent.** #67 needs the `workflows` permission
the GitHub App does not have; #68 needs Google Business Profile access.
