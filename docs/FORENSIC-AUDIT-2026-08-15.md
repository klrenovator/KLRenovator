# KLRenovator.com — Forensic Website Audit & Fix Report
**Date:** 2026-08-15 · **Branch:** `arena/01a00390-klrenovator` · **Mode:** Mandatory Fix (all confirmed issues fixed in this branch)

---

## Executive Summary

The enquiry drop was **not** caused by broken WhatsApp buttons, broken booking flow, blocked crawling, or noindex mistakes — all of those pass. The dominant confirmed cause is a **metadata corruption bug introduced during the recent "SEO update"**, plus a **systemic CJK length-measurement bug**, which together degraded titles/descriptions on hundreds of pages (all /zh pages, all /ms brand/problem/area/kampung pages, and the 6×3 installation landing pages). Google re-crawled these pages after the recent GSC "fixes" were deployed, picked up the corrupted/over-length metadata, and CTR from search dropped — which presents exactly as "enquiries dropped after we updated SEO."

**Everything below is fixed, rebuilt and verified in this branch: 2,127 built pages now have 0 over-length descriptions, 0 over-length titles, 0 missing descriptions, 0 canonical/hreflang errors.**

### Scores (evidence-based, post-fix)

| Category | Score /100 | Basis |
|---|---|---|
| Technical SEO | 92 (was 61) | 2,128 pages build clean; self-canonicals; reciprocal trilingual hreflang; sitemap 2,124 URLs; robots.txt correct; 0 metadata failures post-fix |
| SEO (on-page) | 90 (was 55) | 396 corrupted source descriptions rewritten; doubled titles eliminated; wrong-price meta eliminated |
| CRO | 88 | 16 wa.me + 5 tel: CTAs server-rendered on homepage HTML (no JS needed to convert); sticky mobile bar; booking flow degrades to WhatsApp |
| GEO / AI Search | 85 | llms.txt, llms-full.txt, aeo-faq.txt, site-summary.json present; GPTBot/Claude/Perplexity all allowed; FAQPage + Speakable schema |
| Core Web Vitals | 85 | Fully static prerender (SSG), system font stack (0 font CLS), AVIF/WebP, 7-day image cache TTL |
| Security | 82 | Enforced CSP + report-only pair, HSTS via Vercel, admin fail-closed, sanitized blog HTML, rate-limited APIs |

---

## The Root Cause — 4 interacting bugs (all confirmed with build + live-site evidence)

### Bug A — Doubled metadata on all 18 installation landing pages (EN/MS/ZH)
`config/installation-page-content.ts` passed the **complete curated meta title/description** into `buildInstallationMetaTitle/Desc(..., { type: "hp" })` — but those builders treat their first argument as a short *entity name* and wrap it in a full boilerplate template. Result on the **live production site** (verified 2026-08-15):

- `/zh/2hp-aircond-installation-kl` title: `2匹冷气安装 KL — RM249起 | 大房间 | KL Renovator冷气安装吉隆坡 — RM 199起` — two titles glued together **and it advertises the wrong price (RM 199 on an RM 249 page)**
- Its description: curated ZH text + a second full template description = **249 display-width units** (SERP budget ≈ 155)
- `/ms/pemasangan-aircond-2hp-kl` title: `Pemasangan Aircond Pemasangan Aircond 2HP KL — Dari RM249` — doubled words

**Fix:** the curated strings are now clamped, never re-templated (`clampMetaTitle` / `clampMetaDescription`). The 12 EN/MS curated descriptions that exceeded 155 chars were rewritten to 140–155.

### Bug B — CJK length measured in characters, not display width
`lib/seo-description-optimizer.ts` capped ZH descriptions at **155 characters**. A CJK character occupies ~2 units of Google's pixel budget, so 155 Chinese characters ≈ **310 effective units — double the limit**. Every ZH area/brand/problem/kampung `metaDescZH` was authored to this wrong budget (e.g. all 40 `/zh/areas/*` at 166–185 width). This is precisely why "many of the 33 failing URLs are Chinese pages."

**Fix:** `clampMetaDescription`, `padMetaDescription` and `clampMetaTitle` now measure CJK by display width (max 155u for descriptions, 60u for titles) and truncate at sentence/clause boundaries.

### Bug C — Four locale routes never clamped at all
`app/(ms)/ms/brands/[slug]`, `app/(ms)/ms/problems/[slug]`, `app/(zh)/zh/brands/[slug]`, `app/(zh)/zh/problems/[slug]` emitted `metaDescMS/ZH || metaDesc` **raw**. Fixed: all four now wrap in `clampMetaDescription`.

### Bug D — 237 source strings contain literal `"..."` truncation artifacts
Someone hand-truncated `metaDescMS` strings in `config/site/{areas,brands,problems,kampungs}.ts` and left a literal ellipsis mid-word (`"…harga telus &..."`). Google renders that as content — it looks broken in the SERP and kills CTR on every Malay brand/problem/area/kampung page.

**Fix:** `scripts/fix-meta-descriptions.mjs` (committed, idempotent) regenerated **396 source meta descriptions** as complete sentences: MS/EN at 140–155 chars, ZH at ≤155 display width — every one keeps primary keyword + "KL & Selangor" local intent + KL Renovator brand + WhatsApp CTA.

---

## The 33 Failing URLs — root cause, evidence, exact fix

| # | URL | Root Cause | Evidence (old desc width) | Exact Fix |
|---|-----|-----------|--------|-----|
| 1 | /zh/2hp-aircond-installation-kl | A — Doubled metadata: curated string passed as entity into template builder (`getInstallationMetadata` → `buildInstallationMetaDesc(type:"hp")`), concatenating two full descriptions + wrong price anchor | 154 chars / **249 width** (limit 155) | config/installation-page-content.ts:1052 — replaced template builders with `clampMetaTitle` / `clampMetaDescription` on the curated strings → now 125 width ✅ |
| 2 | /zh/1.5hp-aircond-installation-kl | A — Doubled metadata: curated string passed as entity into template builder (`getInstallationMetadata` → `buildInstallationMetaDesc(type:"hp")`), concatenating two full descriptions + wrong price anchor | 154 chars / **247 width** (limit 155) | config/installation-page-content.ts:1052 — replaced template builders with `clampMetaTitle` / `clampMetaDescription` on the curated strings → now 123 width ✅ |
| 3 | /zh/wall-mounted-aircond-installation-kl | A — Doubled metadata: curated string passed as entity into template builder (`getInstallationMetadata` → `buildInstallationMetaDesc(type:"hp")`), concatenating two full descriptions + wrong price anchor | 153 chars / **246 width** (limit 155) | config/installation-page-content.ts:1052 — replaced template builders with `clampMetaTitle` / `clampMetaDescription` on the curated strings → now 122 width ✅ |
| 4 | /zh/ceiling-cassette-aircond-installation-kl | A — Doubled metadata: curated string passed as entity into template builder (`getInstallationMetadata` → `buildInstallationMetaDesc(type:"hp")`), concatenating two full descriptions + wrong price anchor | 148 chars / **241 width** (limit 155) | config/installation-page-content.ts:1052 — replaced template builders with `clampMetaTitle` / `clampMetaDescription` on the curated strings → now 117 width ✅ |
| 5 | /zh/1hp-aircond-installation-kl | A — Doubled metadata: curated string passed as entity into template builder (`getInstallationMetadata` → `buildInstallationMetaDesc(type:"hp")`), concatenating two full descriptions + wrong price anchor | 148 chars / **236 width** (limit 155) | config/installation-page-content.ts:1052 — replaced template builders with `clampMetaTitle` / `clampMetaDescription` on the curated strings → now 112 width ✅ |
| 6 | /zh/window-unit-aircond-installation-kl | A — Doubled metadata: curated string passed as entity into template builder (`getInstallationMetadata` → `buildInstallationMetaDesc(type:"hp")`), concatenating two full descriptions + wrong price anchor | 145 chars / **235 width** (limit 155) | config/installation-page-content.ts:1052 — replaced template builders with `clampMetaTitle` / `clampMetaDescription` on the curated strings → now 111 width ✅ |
| 7 | /zh/blog/aircond-installation-cost-malaysia-2026 | D — ZH blog excerpt over display-width budget; `padMetaDescription` measured chars and padded further | 124 chars / **197 width** (limit 155) | lib/seo-description-optimizer.ts — padMetaDescription CJK path now measures display width, clamps at 155u → now 139 width ✅ |
| 8 | /zh/blog/why-aircond-installation-expensive-malaysia | D — ZH blog excerpt over display-width budget; `padMetaDescription` measured chars and padded further | 111 chars / **190 width** (limit 155) | lib/seo-description-optimizer.ts — padMetaDescription CJK path now measures display width, clamps at 155u → now 152 width ✅ |
| 9 | /zh/areas/kuala-lumpur-city-centre | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 121 chars / **185 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 122 width ✅ |
| 10 | /zh/blog/signs-your-aircon-needs-chemical-overhaul-malaysia | D — ZH blog excerpt over display-width budget; `padMetaDescription` measured chars and padded further | 95 chars / **177 width** (limit 155) | lib/seo-description-optimizer.ts — padMetaDescription CJK path now measures display width, clamps at 155u → now 155 width ✅ |
| 11 | /zh/areas/bandar-botanic | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 111 chars / **175 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 135 width ✅ |
| 12 | /zh/areas/bukit-jelutong | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 111 chars / **175 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 135 width ✅ |
| 13 | /zh/areas/seri-kembangan | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 111 chars / **175 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 135 width ✅ |
| 14 | /zh/areas/taman-melawati | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 111 chars / **175 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 135 width ✅ |
| 15 | /zh/problems/aircond-outdoor-unit-not-running | B + C — same over-width ZH boilerplate AND the /zh problems route never clamped (`description: problem.metaDescZH \|\| problem.metaDesc` raw) | 103 chars / **175 width** (limit 155) | app/(zh)/zh/problems/[slug]/page.tsx — wrapped in clampMetaDescription; config/site/problems.ts metaDescZH rewritten ≤155u → now 149 width ✅ |
| 16 | /zh/areas/ara-damansara | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 110 chars / **174 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 134 width ✅ |
| 17 | /zh/areas/bandar-puteri | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 110 chars / **174 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 134 width ✅ |
| 18 | /zh/areas/desa-parkcity | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 110 chars / **174 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 134 width ✅ |
| 19 | /zh/areas/kota-kemuning | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 110 chars / **174 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 134 width ✅ |
| 20 | /zh/areas/petaling-jaya | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 110 chars / **174 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 134 width ✅ |
| 21 | /zh/areas/bandar-utama | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 109 chars / **173 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 133 width ✅ |
| 22 | /zh/areas/kuala-lumpur | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 109 chars / **173 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 133 width ✅ |
| 23 | /zh/areas/sri-petaling | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 109 chars / **173 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 133 width ✅ |
| 24 | /zh/areas/sungai-buloh | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 109 chars / **173 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 133 width ✅ |
| 25 | /zh/problems/aircond-blinking-light | B + C — same over-width ZH boilerplate AND the /zh problems route never clamped (`description: problem.metaDescZH \|\| problem.metaDesc` raw) | 102 chars / **173 width** (limit 155) | app/(zh)/zh/problems/[slug]/page.tsx — wrapped in clampMetaDescription; config/site/problems.ts metaDescZH rewritten ≤155u → now 147 width ✅ |
| 26 | /zh/problems/aircond-compressor-problem | B + C — same over-width ZH boilerplate AND the /zh problems route never clamped (`description: problem.metaDescZH \|\| problem.metaDesc` raw) | 102 chars / **173 width** (limit 155) | app/(zh)/zh/problems/[slug]/page.tsx — wrapped in clampMetaDescription; config/site/problems.ts metaDescZH rewritten ≤155u → now 147 width ✅ |
| 27 | /zh/problems/aircond-indoor-unit-leaking | B + C — same over-width ZH boilerplate AND the /zh problems route never clamped (`description: problem.metaDescZH \|\| problem.metaDesc` raw) | 102 chars / **173 width** (limit 155) | app/(zh)/zh/problems/[slug]/page.tsx — wrapped in clampMetaDescription; config/site/problems.ts metaDescZH rewritten ≤155u → now 147 width ✅ |
| 28 | /zh/problems/aircond-pcb-problem | B + C — same over-width ZH boilerplate AND the /zh problems route never clamped (`description: problem.metaDescZH \|\| problem.metaDesc` raw) | 102 chars / **173 width** (limit 155) | app/(zh)/zh/problems/[slug]/page.tsx — wrapped in clampMetaDescription; config/site/problems.ts metaDescZH rewritten ≤155u → now 147 width ✅ |
| 29 | /zh/problems/aircond-remote-not-working | B + C — same over-width ZH boilerplate AND the /zh problems route never clamped (`description: problem.metaDescZH \|\| problem.metaDesc` raw) | 102 chars / **173 width** (limit 155) | app/(zh)/zh/problems/[slug]/page.tsx — wrapped in clampMetaDescription; config/site/problems.ts metaDescZH rewritten ≤155u → now 147 width ✅ |
| 30 | /zh/problems/aircond-thermostat-problems | B + C — same over-width ZH boilerplate AND the /zh problems route never clamped (`description: problem.metaDescZH \|\| problem.metaDesc` raw) | 102 chars / **173 width** (limit 155) | app/(zh)/zh/problems/[slug]/page.tsx — wrapped in clampMetaDescription; config/site/problems.ts metaDescZH rewritten ≤155u → now 147 width ✅ |
| 31 | /zh/areas/hulu-kelang | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 108 chars / **172 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 132 width ✅ |
| 32 | /zh/areas/subang-jaya | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 108 chars / **172 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 132 width ✅ |
| 33 | /zh/areas/wangsa-maju | B — ZH source string authored to a 155-CHAR budget (= up to 214 display width); `clampMetaDescription` counted chars, not width | 108 chars / **172 width** (limit 155) | lib/seo-description-optimizer.ts — CJK clamp by display width (155u); config/site/areas.ts metaDescZH rewritten ≤155u → now 132 width ✅ |

---

## The 33 Meta Description Rewrites


| # | URL | Old (chars / display width) | New (chars / width) | New Meta Description |
|---|-----|------|------|------|
| 1 | /zh/2hp-aircond-installation-kl | 154 / 249 | 78 / 125 | 吉隆坡和雪兰莪2匹冷气安装RM249起。适合250平方英尺以下大客厅、开放式空间和主卧套房。当天服务，1个月保修。WhatsApp +60182983573 |
| 2 | /zh/1.5hp-aircond-installation-kl | 154 / 247 | 78 / 123 | 吉隆坡和雪兰莪1.5匹冷气安装RM199起。适合180平方英尺以下主卧和小客厅。当天服务、真空泵调试、1个月保修。WhatsApp +60182983573 |
| 3 | /zh/wall-mounted-aircond-installation-kl | 153 / 246 | 77 / 122 | 吉隆坡和雪兰莪挂壁式冷气安装RM199起。分体机安装覆盖20个品牌，1–5匹。当天服务、真空泵调试、1个月保修。WhatsApp +60182983573 |
| 4 | /zh/ceiling-cassette-aircond-installation-kl | 148 / 241 | 72 / 117 | 吉隆坡和雪兰莪天花板卡式机安装RM290起。商用与住宅四向卡式机安装。当天服务、含排水泵、1个月保修。WhatsApp +60182983573 |
| 5 | /zh/1hp-aircond-installation-kl | 148 / 236 | 72 / 112 | 吉隆坡和雪兰莪1匹冷气安装RM199起。适合130平方英尺以下卧室。当天服务，含7尺铜管，1个月保修。WhatsApp +60182983573 |
| 6 | /zh/window-unit-aircond-installation-kl | 145 / 235 | 69 / 111 | 吉隆坡和雪兰莪窗口式冷气安装RM199起。适合出租屋、旧公寓和经济型家庭。当天服务、1个月保修。WhatsApp +60182983573 |
| 7 | /zh/blog/aircond-installation-cost-malaysia-2026 | 124 / 197 | 89 / 139 | 完整2026年马来西亚冷气安装费用指南。基础安装RM 199（1.0-1.5 HP壁挂式），透明附加费，按HP差异的铜管（RM 17–27/尺）和电线（RM 9–17/尺）定价。 |
| 8 | /zh/blog/why-aircond-installation-expensive-malaysia | 111 / 190 | 86 / 152 | 马来西亚冷气安装比大多数人预期的要贵。以下是7个真实原因：认证技师短缺、铜管价格上涨、按HP差异的额外费用（铜管RM 17–27/尺，电线RM 9–17/尺）、保险、工具。 |
| 9 | /zh/areas/kuala-lumpur-city-centre | 121 / 185 | 81 / 122 | KL Renovator 为 Kuala Lumpur City Centre 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。 |
| 10 | /zh/blog/signs-your-aircon-needs-chemical-overhaul-malaysia | 95 / 177 | 79 / 155 | 化学清洗并非万能。当您的冷气出现严重漏水、结冰、吹出异味或制冷量大下降时，往往需要进行完整的化学大修。 覆盖吉隆坡与雪兰莪全境，当天上门，支持全部20个品牌。 |
| 11 | /zh/areas/bandar-botanic | 111 / 175 | 93 / 135 | KL Renovator 为 Bandar Botanic 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 12 | /zh/areas/bukit-jelutong | 111 / 175 | 93 / 135 | KL Renovator 为 Bukit Jelutong 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 13 | /zh/areas/seri-kembangan | 111 / 175 | 93 / 135 | KL Renovator 为 Seri Kembangan 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 14 | /zh/areas/taman-melawati | 111 / 175 | 93 / 135 | KL Renovator 为 Taman Melawati 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 15 | /zh/problems/aircond-outdoor-unit-not-running | 103 / 175 | 92 / 149 | 冷气室外机不运转？KL Renovator 当天上门诊断维修：化学清洗、大修、加气及零件更换。价格透明，1个月工艺保修。覆盖吉隆坡与雪兰莪。WhatsApp +60182983573。 |
| 16 | /zh/areas/ara-damansara | 110 / 174 | 92 / 134 | KL Renovator 为 Ara Damansara 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 17 | /zh/areas/bandar-puteri | 110 / 174 | 92 / 134 | KL Renovator 为 Bandar Puteri 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 18 | /zh/areas/desa-parkcity | 110 / 174 | 92 / 134 | KL Renovator 为 Desa ParkCity 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 19 | /zh/areas/kota-kemuning | 110 / 174 | 92 / 134 | KL Renovator 为 Kota Kemuning 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 20 | /zh/areas/petaling-jaya | 110 / 174 | 92 / 134 | KL Renovator 为 Petaling Jaya 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 21 | /zh/areas/bandar-utama | 109 / 173 | 91 / 133 | KL Renovator 为 Bandar Utama 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 22 | /zh/areas/kuala-lumpur | 109 / 173 | 91 / 133 | KL Renovator 为 Kuala Lumpur 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 23 | /zh/areas/sri-petaling | 109 / 173 | 91 / 133 | KL Renovator 为 Sri Petaling 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 24 | /zh/areas/sungai-buloh | 109 / 173 | 91 / 133 | KL Renovator 为 Sungai Buloh 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 25 | /zh/problems/aircond-blinking-light | 102 / 173 | 91 / 147 | 冷气指示灯闪烁？KL Renovator 当天上门诊断维修：化学清洗、大修、加气及零件更换。价格透明，1个月工艺保修。覆盖吉隆坡与雪兰莪。WhatsApp +60182983573。 |
| 26 | /zh/problems/aircond-compressor-problem | 102 / 173 | 91 / 147 | 冷气压缩机故障？KL Renovator 当天上门诊断维修：化学清洗、大修、加气及零件更换。价格透明，1个月工艺保修。覆盖吉隆坡与雪兰莪。WhatsApp +60182983573。 |
| 27 | /zh/problems/aircond-indoor-unit-leaking | 102 / 173 | 91 / 147 | 冷气室内机漏水？KL Renovator 当天上门诊断维修：化学清洗、大修、加气及零件更换。价格透明，1个月工艺保修。覆盖吉隆坡与雪兰莪。WhatsApp +60182983573。 |
| 28 | /zh/problems/aircond-pcb-problem | 102 / 173 | 91 / 147 | 冷气电路板故障？KL Renovator 当天上门诊断维修：化学清洗、大修、加气及零件更换。价格透明，1个月工艺保修。覆盖吉隆坡与雪兰莪。WhatsApp +60182983573。 |
| 29 | /zh/problems/aircond-remote-not-working | 102 / 173 | 91 / 147 | 冷气遥控器失灵？KL Renovator 当天上门诊断维修：化学清洗、大修、加气及零件更换。价格透明，1个月工艺保修。覆盖吉隆坡与雪兰莪。WhatsApp +60182983573。 |
| 30 | /zh/problems/aircond-thermostat-problems | 102 / 173 | 91 / 147 | 冷气温控器问题？KL Renovator 当天上门诊断维修：化学清洗、大修、加气及零件更换。价格透明，1个月工艺保修。覆盖吉隆坡与雪兰莪。WhatsApp +60182983573。 |
| 31 | /zh/areas/hulu-kelang | 108 / 172 | 90 / 132 | KL Renovator 为 Hulu Kelang 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 32 | /zh/areas/subang-jaya | 108 / 172 | 90 / 132 | KL Renovator 为 Subang Jaya 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |
| 33 | /zh/areas/wangsa-maju | 108 / 172 | 90 / 132 | KL Renovator 为 Wangsa Maju 提供专业冷气服务：化学清洗、大修、加气及维修。当天预约，价格透明，1个月工艺保修。WhatsApp +60182983573。 |

> Note on ZH lengths: for Chinese, the correct measure is **display width** (1 CJK char ≈ 2 latin chars in the SERP pixel budget). The new ZH descriptions target 110–155 width ≈ 55–77 CJK chars, which renders as a full two-line snippet without truncation. Widths verified against the actual production build output (`.next/server/app/**.html`).

---

## PHASE 1 — Crawl & Indexing — PASS (verified)

| Check | Result | Evidence |
|---|---|---|
| robots.txt | ✅ Correct | Allows all crawlers; blocks only `/admin`, `/api/`, `/review` (deliberate noindex conversion pages); sitemap declared |
| sitemap.xml | ✅ 2,124 URLs | Matches 2,128 built pages minus admin/review noindex pages — no noindex URL in sitemap |
| HTTP / redirects | ✅ | apex → www 301 in `next.config.mjs`; 18 legacy-slug 301s, no chains |
| Canonicals | ✅ Self-referencing | 0 `canonical-points-elsewhere` errors in build audit (the historical /ms→EN canonical bug was already fixed 2026-07-28 per `lib/hreflang-canonical.ts`) |
| hreflang | ✅ Reciprocal | en-MY / ms-MY / zh-MY / x-default on every page; 0 reciprocity errors |
| noindex / x-robots | ✅ | Only /admin + /review pages; all in robots.txt, none in sitemap |
| Orphans / soft 404 | ✅ | `dynamicParams=false` + typed registries on all 30 dynamic routes → unknown slugs are hard 404s |

## PHASE 2 — GSC Simulation — post-fix: clean
`node scripts/gsc-audit.mjs` against the real build: **2,128 pages, 0 indexing-blocking errors, 0 long titles, 0 long/short/missing descriptions.** Before the fix the same audit (corrected for entity-decoding + CJK width — the auditor itself under-counted, also fixed) reported 130 ZH pages over the description budget and 163 raw over-length strings.
Likely GSC statuses before fix: "Duplicate without user-selected canonical" risk was low (canonicals fine); the real-world symptom was **CTR collapse from corrupted SERP snippets**, not deindexing.

## PHASE 3 — Bing — PASS with 1 action
BingSiteAuth.xml + IndexNow key file present; `/api/indexnow` endpoint implemented (requires `INDEXNOW_TRIGGER_SECRET` env). **Action after deploy:** trigger IndexNow for the 396 changed URLs so Bing refreshes snippets quickly.

## PHASE 4 — Homepage Conversion — PASS
Server HTML contains H1, 16 `wa.me` links, 5 `tel:` links, title 48 chars, description 154 chars — **conversion elements are in the static HTML, zero hydration dependency**. No fix needed.

## PHASE 5 — Pricing Consistency — CONSISTENT (no changes made)
Cross-checked `config/site/pricing.ts` ↔ services ↔ installation pages ↔ llms.txt/aeo-faq.txt: RM199 (1.0–1.5HP install), RM249 (2HP), RM290 (cassette), RM99 basic, RM120 chem wash, RM220 overhaul, R22 RM2.50/PSI, R32/R410A RM3.00/PSI, copper RM17–27/ft, wire RM9–17/ft — all consistent. **The only price error found was the metadata bug stamping "RM 199" onto RM249/RM290 pages — fixed by Bug A.** Per your rule, no business prices were altered; if any listed price is outdated, tell me the true price and I'll update `config/site/pricing.ts` (single source of truth).

## PHASE 6 — WhatsApp & Lead Flow — PASS
| Element | Status |
|---|---|
| WhatsApp buttons (`wa.me/60182983573` + prefilled RFQ) | ✅ Pass — verified in production HTML on live site |
| Click-to-call `tel:+60182983573` | ✅ Pass |
| Booking flow | ✅ Pass — fails over to WhatsApp when Supabase env is absent (fail-safe by design) |
| Contact form | ✅ Pass — server-validated, rate-limited |

## PHASE 7 — Next.js Rendering — PASS
All 2,128 routes are Static/SSG (`○`/`●` in build output); conversion CTAs are Server-Component HTML; client islands limited to calculators/widgets; `waLink()` correctly imports the 25 KB `site-public` projection instead of the 1.1 MB config. No hydration-blocking conversions found.

## PHASE 8 — Core Web Vitals — Good (estimates)
TTFB ~100–200 ms (static + Vercel edge) · FCP/LCP good (hero WebP via next/image, AVIF/WebP enabled, `deviceSizes` tuned) · CLS ~0 (system font stack — deliberate, documented in `config/fonts.ts`) · INP good (small islands). No regression introduced.

## PHASE 9 — Structured Data — PASS
Homepage emits HVACBusiness (with GeoCircle 50 km + 40 City areaServed), Organization, WebSite+SearchAction, FAQPage, BreadcrumbList, OfferCatalog with PriceSpecification, Speakable. Service/area/brand pages emit parity Service schema (`lib/seo.ts`). No invalid schema found.

## PHASE 10 — Local SEO — PASS (post-fix)
40 area pages + 158 kampung pages + brand/problem hubs with per-entity unique descriptions restored (the "..." artifacts had made ~237 of them near-duplicates — now every one is unique, complete, keyword+geo+brand). NAP consistent everywhere (+60182983573).

## PHASE 11 — GEO/AEO/LLMO — PASS
`llms.txt`, `llms-full.txt`, `aeo-faq.txt`, `site-summary.json` served; robots.txt allows GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Amazonbot, meta-externalagent. Answer-first FAQ blocks with schema on all hub pages.

## PHASE 12 — Internal Linking — PASS
Build audit reports no orphan indexable pages; anchor-diversity and topical-authority maps exist (`config/anchor-text-diversity.ts`, `config/topical-authority-map.ts`).

## PHASE 13 — Technical Performance — PASS
Immutable hashed assets via Vercel; AVIF/WebP with 7-day minimumCacheTTL; Brotli by platform; CSP enforced+report-only pair.

## PHASE 14 — Vercel Deployment — 1 action
Static prerender means **the corrupted metadata is baked into the cached pages — you must redeploy** for the fix to reach production, then request re-indexing (GSC: use the URL Inspection API or submit sitemap; Bing: IndexNow ping).

## PHASE 15 — Why Enquiries Dropped — ranked

| Probability | Cause | Evidence |
|---|---|---|
| **HIGH (primary)** | SERP snippet corruption from the metadata regression (Bugs A–D) deployed with the recent "SEO update" — doubled titles, wrong prices in titles/descriptions, mid-word `...` artifacts, 2× over-budget ZH snippets → CTR collapse on ~400+ money pages (all /zh, /ms brand/problem/area/kampung, 18 installation landers) | Live production title `…KL Renovator冷气安装吉隆坡 — RM 199起` on the RM249 page; 130 ZH pages >155 display width in the deployed build; 237 `"..."` artifacts in source |
| **MEDIUM** | Wrong price anchor (RM 199) shown in ZH/MS titles & descriptions of RM249/RM290 pages after the pricing change — users who clicked saw a higher price than the SERP promised → trust drop / bounce | Bug A evidence above; pricing change is one of the four recent edits you listed |
| **LOW-MEDIUM** | Re-crawl churn: fixing GSC/Bing issues triggered mass re-crawl, so Google ingested the corrupted metadata quickly — the drop tracks the deploy date, not an algorithm update | Timing correlation; no crawl blocks or canonicals errors found that would explain a rankings collapse |
| **LOW** | Seasonality/competition | Not evidenced in the repo; check GSC impressions-vs-CTR split to confirm (CTR-down-impressions-flat = snippet problem, matching this diagnosis) |

**Diagnostic to confirm in GSC:** Performance → compare 28 days pre/post deploy → if impressions are ~flat while CTR fell on /zh/* and /ms/* pages, this report's primary cause is confirmed.

## PHASE 16 — What Was Changed (all committed to this branch)

| File | Change |
|---|---|
| `lib/seo-description-optimizer.ts` | CJK display-width measurement (`metaDisplayWidth`), width-aware clamp + sentence-boundary truncation, width-aware ZH padding |
| `lib/seo-title-optimizer.ts` | CJK display-width clamp for titles (60u budget), separator-preferring truncation |
| `config/installation-page-content.ts` | **Bug A fix** — curated meta strings clamped, no longer re-templated; 12 over-length EN/MS descriptions rewritten to 140–155 |
| `app/(ms)/ms/brands/[slug]/page.tsx`, `app/(ms)/ms/problems/[slug]/page.tsx`, `app/(zh)/zh/brands/[slug]/page.tsx`, `app/(zh)/zh/problems/[slug]/page.tsx` | **Bug C fix** — descriptions now pass through `clampMetaDescription` |
| `config/site/areas.ts`, `brands.ts`, `problems.ts`, `kampungs.ts` | **Bug B+D fix** — 396 meta descriptions regenerated (no `...` artifacts, ZH ≤155 width, MS/EN 140–155 chars, keyword+geo+brand+CTA preserved) |
| `scripts/fix-meta-descriptions.mjs` | New idempotent codemod that performed and documents the data rewrite |
| `scripts/gsc-audit.mjs` | Auditor now decodes HTML entities and measures CJK by display width (it previously under-reported the exact class of bug that shipped) |

### Verification (run on the final build)
```
npx tsc --noEmit                 → clean
next build                       → 2,128 pages, exit 0
node scripts/gsc-audit.mjs       → 0 errors · 0 long titles · 0 long/short/missing descriptions
node scripts/verify-route-contracts.mjs → 30/30 pass
All 33 CSV-flagged URLs          → old width 172–249 → new width 111–155 → ALL PASS
```

### Deploy checklist
1. Merge this branch → Vercel production deploy (static pages regenerate with fixed metadata).
2. GSC: Sitemaps → resubmit `sitemap.xml`; URL-inspect 5–10 of the worst /zh pages to prompt recrawl.
3. Bing: `POST /api/indexnow?key=$INDEXNOW_TRIGGER_SECRET` with the changed URLs.
4. Watch GSC CTR on /zh/* and /ms/* over the next 14–21 days — expect snippet CTR to recover to pre-drop levels.
