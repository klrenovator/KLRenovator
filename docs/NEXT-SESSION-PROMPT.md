# Audit Part 2 — final closeout and maintenance handoff

**Closed:** 2026-08-22

**Authoritative audit:** `docs/AUDIT-PART2-CONTENT-SEO-GEO-AEO.md` §0

Audit Part 2 has no remaining remediation queue. All implementation issues
created from the audit (#62–#69 and #71–#75) are closed and all acceptance
thresholds have been met. Do not
restart old work from intermediate session notes in the historical audit body.

## Final measured state

Fresh production build → extract → analyze over **2,184 pages**:

| Score | Original | Final | Target |
|---|---:|---:|---:|
| Content | 94 | **99** | 98 |
| GEO | 53 | **88** | 86 |
| AEO | 38 | **84** | 78 |

Key final components:

- Internal linking **100**; true orphans **0**
- FAQ quality **86**; FAQ coverage **94**; visible blog FAQ/schema parity gaps **0**
- Freshness **91**
- Citation-worthiness **72**
- Expert signals **71**
- Direct answers **98**
- HowTo **46** (acceptance target ≥40)
- Tables / comparisons / definitions **98 / 98 / 98**
- Thin pages **0**
- Money pages without a table **0**
- Body-image gaps **0**; missing image alt text **0**
- Duplicate titles **0**; duplicate descriptions **0**
- Weighted intra-template similarity **20.2%**; pairs >70% **0**
- Near-orphans **166**, below #74's <200 acceptance threshold

The final CI sequence passes:

```bash
npm run typecheck
npm run lint
npm run build
npm run verify:build
npm run verify:routes
npm run audit:gsc
```

`audit:gsc` reports no indexing-blocking errors. Its one family-level warning for
the EN kampung-installation template is a conservative shared-template heuristic;
the shingle analyzer reports 35.7% average similarity and 0 pairs above 70%.
Future content work may improve it, but it is not an open Part 2 finding.

## Closed issue map

| Finding | Resolution |
|---|---|
| #62 price/comparison tables | Closed — tables 98; every money page covered |
| #63 direct answers | Closed — direct answers 98 |
| #64 expert attribution/citations | Closed — 71 / 72 |
| #65 honest HowTo markup | Closed — HowTo 46, 947 schema pages; schema maps to visible ordered steps |
| #66 pricing/troubleshooting/maintenance hubs | Closed — 9 EN/MS/ZH routes with two-way cluster links |
| #67 month-stamped title refresh | Closed — workflow installed at `.github/workflows/monthly-refresh.yml` |
| #68 review-count accuracy | Closed — GBP verified at 88 reviews / 5.0 on 2026-08-21; one config source |
| #69 metadata/thin-page cleanup | Closed — thin pages 0; no duplicate metadata; no-CTA descriptions 89 |
| #71 kampung + brand-area depth | Closed — authored EN/MS/ZH depth and structure |
| #72 definitions/comparisons | Closed — 98 / 98 |
| #73 body imagery | Closed — 0 image-less pages; VideoObject correctly omitted because no video exists |
| #74 near-orphans/MS installation graph | Closed — 166 (<200), 0 true orphans; all MS installation landings ≥3 inbound |
| #75 commercial + IAQ clusters | Closed — trilingual hubs live and cross-linked |

C1, C4, C7, C8 and C10 were fixed in the audit PRs and do not have remaining
work. C3 (`AggregateRating`) was withdrawn after policy review and must remain
unimplemented.

## Guardrails for future changes

- Never add `Review` or `AggregateRating` to `LocalBusiness`, `HVACBusiness`, or
  `Organization`; `scripts/gsc-audit.mjs` intentionally rejects it.
- Never hardcode a Google review count. Use `reviewCount`, `reviewCountLabel`,
  and `reviewRatingLabel` from `config/reviews.ts`; follow `WHERE_TO_UPDATE.md`.
- Only emit HowTo schema when the same ordered steps are visible on the page.
  A blog title or FAQ question containing “how” is not a HowTo.
- Every price, warranty, and coverage figure must come from config.
  `lib/published-prices.ts` is the published-price boundary.
- Use `config/content-review-dates.ts` for `dateModified`; never generate a fake
  freshness date with `new Date()`.
- Preserve genuinely authored EN/MS/ZH content and the 0-pairs->70% duplicate
  guard. Do not mass-copy an English paragraph into other locales.
- Keep all real photos' page-specific alt text and do not fabricate video
  metadata without a real public video asset.
- Generated audit JSON (`audit/pages.json`, `audit/findings.json`,
  `audit/gaps.json`) is intentionally ignored. Recreate it from a fresh build.

## Re-audit commands

```bash
npm run build
node audit/extract.mjs
node --max-old-space-size=6144 audit/analyze.mjs
node --max-old-space-size=4096 audit/gaps.mjs
```

A future session should only open new work for a newly observed regression,
measured search-performance opportunity, or newly supplied real asset. There is
no unfinished Audit Part 2 implementation item to resume.
