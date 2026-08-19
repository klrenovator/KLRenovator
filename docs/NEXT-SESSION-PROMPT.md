# Next-session prompt — copy/paste

Everything still open on the KL Renovator audit is tracked. Copy the whole code
block below into a new Arena session on this repo.

---

```
Continue the KL Renovator content/SEO/GEO/AEO remediation. This is a long,
multi-session job. Do NOT rush it and do NOT sacrifice quality to close items
faster — the whole point of the remaining work is that it needs real content,
not shortcuts.

READ FIRST
----------
docs/AUDIT-PART2-CONTENT-SEO-GEO-AEO.md — start at section 0 ("Remediation
status"). It records what is already fixed, what was withdrawn and why, and
every item still open with its tracking issue number.

WHERE THINGS STAND
------------------
PR #70 is open and already fixed: C1 (360 orphaned brand-area pages), C4 (blog
FAQ schema, 1,862 -> 2,028 FAQPage), C7 (freshness, dateModified 339 -> 1,293),
C8 og:image half (now 2,170/2,172 pages), C10 jargon headings, and site-wide
orphans (443 -> 23).

Scores now: Content 98, GEO 59, AEO 40.
Target after full remediation: Content 98, GEO 86, AEO 78.

Weakest components, in the order they hurt:
  howTo 4, citationWorthiness 18, expertSignals 12, definitions 12,
  tables 11, comparison 16, directAnswers 40, answerFormatting 51,
  troubleshooting 40, freshness 66.

ONE THING THAT MUST NOT BE BUILT
--------------------------------
The original audit's finding C3 recommended adding Review/AggregateRating
schema to substantiate the "5.0 from 500+ reviews" claim. THAT RECOMMENDATION
WAS WRONG AND HAS BEEN WITHDRAWN. Do not implement it, even though it appears
in older summaries of the audit.

Google's self-serving review policy makes LocalBusiness/Organization and ALL
subtypes — including HVACBusiness — ineligible for review rich results when the
business controls the reviews. Adding aggregateRating would never render stars,
would report as "Invalid items" in Search Console, and would FAIL THIS REPO'S
OWN CI: scripts/gsc-audit.mjs section 9a already treats it as a build-breaking
error. The full reasoning is in section 0 of the audit doc.

The real underlying problem is tracked as issue #68 instead: the "500+ reviews"
claim appears 150 times but config/reviews.ts holds 9 review objects. That needs
a human with Google Business Profile access to verify — it is not a code fix.

ALL REMAINING WORK — 12 open issues, nothing omitted
----------------------------------------------------
Agent-doable, in recommended order:

  #65  HowTo schema on 137 pages that ALREADY have visible step content.
       Pure markup. Fastest score movement available. Includes all 60
       /problems/* pages, which have step content and zero HowTo schema.

  #63  Direct-answer blocks on 922 pages (kampung 474, brand-area 360,
       problem 60, installation-landing 6). Do the 60 problem pages FIRST —
       they target pure question intent and currently have zero question
       headings. 40-80 word answers, answer-first.

  #64  Expert attribution on 1,698 pages + external citations on ~200 pages
       (TNB tariffs, Energy Commission / Suruhanjaya Tenaga, SIRIM, DOSH).
       Biggest single GEO lever: expertSignals 12 and citationWorthiness 18
       are the two components capping the score. Currently ZERO pages have
       any external citation. Cite where genuinely relevant — do not bulk-add
       the same link to 2,000 pages.

  #62  Price and comparison tables on 1,782 commercial pages. Real <table>
       semantics. Prices MUST come from config/site.ts and
       config/services-data.ts so they cannot drift from the real price list.

  #72  Definition blocks (1,912 pages missing) and comparison content
       (1,820 missing). Coordinate the table component with #62.

  #71  Content depth: kampung and brand-area are 2-H2, ~580-word skeletons
       across 834 pages — 38% of the site — while sibling templates average
       1,456-1,957 words. brand-area is the highest purchase-intent page type
       on the site. Bring them up to roughly kampung-installation standard.

  #73  Body imagery: 1,103 pages contain zero <img>. The og:image half of C8
       is done; this is the in-content half. 157 real job photos already exist
       in public/hero and are catalogued in docs/IMAGE-USAGE-MAP.md. Also
       covers the zero-VideoObject-schema gap.

  #74  Internal linking tier 2: 767 near-orphans with only 1-2 inbound links,
       plus the 10 MS installation landing pages that are cut off from the
       link graph (Malay is the majority language of the target market).

  #66  Topic-cluster hubs: /pricing, /troubleshooting, /maintenance. 42
       pricing assets and 35 troubleshooting assets currently have no
       canonical entry point, so they compete instead of compounding.

  #75  The two near-empty commercial clusters: commercial/office HVAC (4 blog
       posts, no service hub, highest-ticket segment) and indoor air quality
       (2 assets, maps straight onto the chemical-wash service).

  #69  Cleanup: 13 exact title clashes (Subang Jaya SS15/SS16/SS19 x3
       locales), 7 thin pages under 300 words, 943 descriptions with no CTA,
       1,392 with no price.

Needs a human, NOT an agent — do not attempt, just remind the user:

  #67  638 titles hard-code the build-time month and go stale without a
       monthly rebuild. The workflow is written and ready at
       docs/monthly-refresh.workflow.yml, but this GitHub App lacks the
       `workflows` permission and CANNOT push to .github/workflows/. A
       maintainer must copy it in and add the VERCEL_DEPLOY_HOOK_URL secret.

  #68  Verify the "5.0 from 500+ Google reviews" claim against the real
       Google Business Profile. Unreachable from the sandbox.

HOW TO WORK
-----------
Pick up #65 and #63 this session and stop there. Finishing two items properly
beats starting six. Say clearly at the end what is done and what is left.

Quality bar — this is the part that matters:
- Do not pad pages with boilerplate that differs only by a substituted place
  name. Current near-duplicate rate is 19.9% average intra-group similarity
  with 0 pairs above 70% — that is a genuinely good result and must not
  regress. Re-check it with audit/analyze.mjs after bulk content changes.
- MS and ZH must be genuinely authored, not machine-translated EN with nouns
  swapped. The existing uniqueness configs (kampung-uniqueness-matrix.ts,
  brand-area-uniqueness.ts, area-faq-uniqueness.ts, master-faq-pool.ts) exist
  to prevent template sameness — extend them, never bypass them.
- Every price, warranty and coverage claim must trace back to config, not be
  typed inline.
- Schema must match visible content. Never emit HowTo without visible ordered
  steps, never emit FAQPage for identical Q&A repeated across hundreds of URLs.
- If genuinely unique content cannot be written for all 474 kampungs at once,
  do a proper subset and say so, rather than shipping 474 mediocre pages.

HARD-WON RULES — do not rediscover these
----------------------------------------
- Never use new Date() for dateModified. Dates are hand-maintained constants in
  config/content-review-dates.ts. Auto-bumping per deploy is structured-data
  spam under Google's policy.
- The en/ms/zh templates are NOT string-identical. ALWAYS grep the ms and zh
  file for the real anchor before any 3-file batch patch. Known traps: kampung
  FAQ uses k.faqsBM / k.faqsZH (not k.faqs), and grid class names differ
  between locales. A python anchor patch that works on EN will silently
  AssertionError or, worse, match the wrong node on ms/zh.
- In brand-area templates, enUrl/msUrl/zhUrl exist only inside
  generateMetadata — build a local pageUrl for the render body.
- Prefer `||` over `??` for config fallbacks. Several config fields hold ""
  (empty string), which is not nullish, so `??` silently passes the empty value
  through. This exact bug suppressed og:image on 25 area pages.
- Use `npm run typecheck`. Never `npx tsc` (installs the wrong package,
  tsc@2.0.4) and never `npx tsx` (it has wiped node_modules in this sandbox).
  If binaries vanish, run `npm install`.
- Run `git checkout public/gallery-items.json` before committing — the build
  mutates it.
- The live site is unreachable from the sandbox (curl exit 35). The local
  static build is authoritative. Do not retry curl against klrenovator.com.
- Never hand-write filenames into an image pool. Generate from a real
  public/hero listing and assert each file exists on disk.
- If a metric reads as a perfect 0 or 100% site-wide, verify against raw HTML
  before reporting it. Three separate extraction bugs produced false findings
  that way.

CI GATE — run all five before every commit
------------------------------------------
npm run typecheck && npm run lint && npm run build && npm run verify:build && npm run audit:gsc

Re-measure scores after changes:
  npm run build
  node audit/extract.mjs
  node --max-old-space-size=6144 audit/analyze.mjs
  node --max-old-space-size=4096 audit/gaps.mjs

Commit in logical units with messages that explain what was broken, what was
rejected as an approach, and why. Push to the session branch and update PR #70,
or open a new PR if #70 has already merged. Close each issue as it is genuinely
finished — not when it is partially done.
```

---

## Coverage check — every audit finding is filed

| Audit finding | Status | Issue |
|---|---|---|
| C1 — 360 brand-area pages, zero inbound links | ✅ Fixed | PR #70 |
| C2 — 638 month-stamped titles | ⚠️ Maintainer | [#67](https://github.com/klrenovator/KLRenovator/issues/67) |
| C3 — Review/AggregateRating schema | ❌ **Withdrawn** — fails Google policy + this repo's CI | see [#68](https://github.com/klrenovator/KLRenovator/issues/68) for the real fix |
| C4 — 267 blog posts, FAQs without schema | ✅ Fixed | PR #70 |
| C5 — 1,782 pages, no price table | 🔲 Open | [#62](https://github.com/klrenovator/KLRenovator/issues/62) |
| C6 — 922 pages, no direct answers | 🔲 Open | [#63](https://github.com/klrenovator/KLRenovator/issues/63) |
| C7 — freshness | ✅ Fixed | PR #70 |
| C7b — 1,698 pages no author, 2,164 no citations | 🔲 Open | [#64](https://github.com/klrenovator/KLRenovator/issues/64) |
| C8 — og:image | ✅ Fixed (2,170/2,172) | PR #70 |
| C8b — 1,103 pages no body imagery, 0 VideoObject | 🔲 Open | [#73](https://github.com/klrenovator/KLRenovator/issues/73) |
| C9a — HowTo schema, 137 pages | 🔲 Open | [#65](https://github.com/klrenovator/KLRenovator/issues/65) |
| C9b — definitions 1,912 / comparison 1,820 | 🔲 Open | [#72](https://github.com/klrenovator/KLRenovator/issues/72) |
| C10 — jargon H2 + task ID leak | ✅ Fixed | PR #70 |
| C10b — 834 skeleton pages (kampung, brand-area) | 🔲 Open | [#71](https://github.com/klrenovator/KLRenovator/issues/71) |
| Orphans 443 → 23 | ✅ Fixed | PR #70 |
| 767 near-orphans + MS pages cut off (§7.6) | 🔲 Open | [#74](https://github.com/klrenovator/KLRenovator/issues/74) |
| Cluster hubs (§7.4) | 🔲 Open | [#66](https://github.com/klrenovator/KLRenovator/issues/66) |
| Commercial + IAQ clusters (§7.5) | 🔲 Open | [#75](https://github.com/klrenovator/KLRenovator/issues/75) |
| Title clashes, thin pages, description CTAs | 🔲 Open | [#69](https://github.com/klrenovator/KLRenovator/issues/69) |
| "500+ reviews" claim vs 9 review objects | ⚠️ Maintainer | [#68](https://github.com/klrenovator/KLRenovator/issues/68) |

**Nothing from the audit is unfiled.** Two items (#67, #68) genuinely cannot be
done by an agent — one needs a GitHub permission this app does not have, the
other needs Google Business Profile access.
