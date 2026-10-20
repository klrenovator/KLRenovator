# Price Management Audit — Phase 3 Report

**Project:** KL Renovator (klrenovator.com), Multicore Dynamics Resources, SSM 003765188-T
**Baseline commit:** `d3adf0119695b3a9c9c4a00f1655cfa0d649d1ca` (`main`)
**Branch:** `arena/6a0d2bdf-klrenovator`
**Date:** 2026-10-20
**Status:** Phase 3 complete — **awaiting owner approval**. No production price has been changed. No site file was edited.

---

## 1. The master database

**Workbook:** WEBSITE MASTER PRICING DATABASE — KL Renovator
**URL:** https://docs.google.com/spreadsheets/d/1ZaXN3E2mEqqMR4tchz7xaONXYDwuAE8Jlq50Ffe-PYc/edit
**ID:** `1ZaXN3E2mEqqMR4tchz7xaONXYDwuAE8Jlq50Ffe-PYc`
**Locale / timezone:** en_US / Asia/Kuala_Lumpur

| Tab | Rows (incl. header) | Purpose |
|---|---|---|
| `README` | 74 | Purpose, golden rules, change workflow, conflicts, verification notes |
| `MASTER_PRICES` | 76 (75 rules) | Canonical price table, columns A–Z |
| `PRICE_LOCATIONS` | 177 (176 locations) | Every page/component/file that repeats a price |
| `PRICE_CHANGE_LOG` | 2 (1 entry) | `CHG-0001` baseline snapshot |
| `SYNC_STATUS` | 76 (75 rules) | Master value vs live-site value per rule |
| `BLOG_FAQ_AUDIT` | 178 (177 items) | 102 blogs + 53 master FAQs + 13 blog FAQs + 9 service FAQs |

### `MASTER_PRICES` columns

`A` Price_ID · `B` Service_Category · `C` Service_Name · `D` Subservice_Name · `E` Price_Type · `F` Current_Approved_Price · `G` Currency · `H` Pricing_Unit · `I` Minimum_Quantity · `J` Included_Quantity · `K` Additional_Quantity_Rate · `L` Material_Cost · `M` Labour_Cost · `N` Discount_Rules · `O` Conditions · `P` Exclusions · `Q` Warranty_Conditions · `R` English_Description · `S` Malay_Description · `T` Chinese_Description · `U` Status · `V` Last_Updated · `W` Updated_By · `X` Sync_Status · `Y` Last_Synced_Commit · `Z` Notes

---

## 2. Phase 3 deliverables (the requested counts)

| Requested item | Count | Notes |
|---|---|---|
| Unique pricing rules | **75** | 65 canonical + 10 additional rules that are published on the site but were missing from `config/site/pricing.ts` |
| Price references found in the codebase | **10,284** `RM` references across **151** files | Includes electricity-cost prose, not only service prices |
| Locations recorded in `PRICE_LOCATIONS` | **176** | 75 canonical definitions, generated files, 21 service-page price tables, 8 service cards, 3 start prices, 3 hardcoded page tables, calculator/tool UI, 77 aggregated content references |
| Calculator dependencies | **4 calculators + 3 tools** | `installation-cost-calculator`, `chemical-wash-cost-calculator`, `gas-topup-calculator`, `electricity-calculator`; `price-calculator`, `price-comparison`, `diagnostic-tool`, `btu-calculator`; 94 hardcoded price strings inside calculator UI |
| Blogs containing prices | **102 blogs total, 98 with prices** | Recorded individually in `BLOG_FAQ_AUDIT` |
| FAQs containing prices | **53 master-pool questions** (95 per language set, EN/MS/ZH) + **13 blog FAQ blocks** + **9 service-page FAQ blocks** | Price-bearing answers: 18 EN / 16 MS / 16 ZH in the master pool |
| Conflicts found | **8** | See §3 |
| Items needing confirmation | **8 rule IDs + 1 open question** | See §4 |

Content-density of price references by source: kampung pages 1,892 · area pages 890 · brand pages 470 · `config/services-data.ts` 378 · `config/tool-content.ts` 286 · `config/installation-page-content.ts` 241 · blogs 1,900+.

---

## 3. Conflicts — owner decision required

None of these have been changed. Each is listed in the `README` tab as C1–C8.

| # | Conflict | Canonical | Where the different value lives |
|---|---|---|---|
| C1 | Diagnostic fee — RM 88 vs RM 138 | RM 88 (`PRC-REP-001`) | `config/services-data.ts:408,411,1006`, `components/diagnostic-tool.tsx:204,298,368`, `config/blog-posts.ts:624` — 138 = 88 + RM 50 after-hours surcharge, so both numbers are real but the headline is inconsistent |
| C2 | Chemical wash "from" price | RM 120 (`PRC-CW-001`) | `config/services-data.ts:40,294` shows "RM 2.50 / PSI" — that is the gas rate, not a wash price |
| C3 | Emergency-service prices | Standard table | Capacitor 230, PCB 400–600, compressor 850–2,000, drain clear 170 on the emergency page and components vs 150–250 / 350–600 / 800–2,000 / 90 |
| C4 | Window-unit installation | RM 199 (`PRC-INST-011`) | `lib/seo.ts:319` schema offer 180 and `app/(zh)/.../aircond-installation-kl/page.tsx:56` RM 180 |
| C5 | Pressure-wash price in a compare table | RM 120 | `config/services-data.ts:184` compareTable "Pressure Wash (RM 170)" |
| C6 | Dismantling | RM 90 (`PRC-DIS-001`) | `config/master-faq-pool.ts:98` "from RM 150"; `config/blog-posts.ts:2980` "RM 80–90" |
| C7 | Annual maintenance contract | RM 499 Standard (`PRC-AMC-002`) | `config/blog-posts.ts:5386` "RM 450" — matches no published plan |
| C8 | Copper pipe | RM 17 / 23 / 27 per ft by HP band | `public/aeo-faq.txt:32` "RM 25/ft" (legacy single rate) |

---

## 4. Items needing confirmation

Marked `NEEDS_CONFIRMATION` in `SYNC_STATUS` and `MASTER_PRICES`: these numbers are published on the site but have no canonical rule. They were **not** invented into rules, and no value was chosen for them.

| ID | Item | Published value |
|---|---|---|
| `PRC-SERV-007` | Window unit — basic servicing 1.0–1.5 HP | RM 99 |
| `PRC-SERV-008` | Window unit — basic servicing 2.0–2.5 HP | RM 120 |
| `PRC-GAS-005` | Structural leak check | RM 88 |
| `PRC-EMG-001` | Drain-pipe emergency clear | RM 170 |
| `PRC-SUR-001` | After-hours surcharge (6pm–10pm) | RM 50 |
| `PRC-SUR-002` | After-hours diagnostic (88 + 50) | RM 138 |
| `PRC-DIS-005` | Dismantling, as worded in the FAQ pool | from RM 150 |
| `PRC-AMC-004` | Standard plan — 3 visits / year | RM 450 |

**Open question Q1:** window units publish RM 99 / RM 120 basic servicing, but the canonical table has no basic-servicing row for window units. Confirm these as real rules, or treat the published values as errors.

---

## 5. Other data-quality flags

- `PRC-INST-011` / `PRC-INST-012` (window installation) are missing from `config/services-data.ts` `installation.priceTable` — the service page silently omits them.
- `PRC-REP-006` reuses the label "Capacitor Replacement"; two different repair rules share one display name.
- `services[gas-topup].startPrice = 2.5` is a per-PSI rate stored in a field that the UI renders as "from RM".
- `lib/aircond-math.ts` hardcodes `DEFAULT_ELECTRICITY_RATE = 0.509` and several fallback prices that duplicate the canonical table without a `PRICE_ID` reference.
- `config/site-public.ts` is generated by `scripts/gen-site-public.mjs` during `prebuild`; it must never be edited by hand and is therefore recorded as a single generated-file location rather than 75 separate rows.
- Non-canonical amounts that appear most often on the site: 500 (121×), 300 (95×), 80 (92×), 30 (39×), 138 (37×), 60 (32×), 40 (29×), 450 (25×). Only **138**, **450** and **80** are genuine inconsistencies; the rest are legitimate (room sizes, electricity figures, component brackets).

---

## 6. How the sync will work (Phase 4 preview — not built yet)

Two options, both requiring owner sign-off. **Nothing is implemented and no trigger is installed**, so the workbook is not live and does not update the site.

- **Option A — live runtime read.** The site reads the sheet at runtime/build time, caches it, and renders from it. Fastest feedback, but every page render depends on an external service and a bad edit goes live immediately.
- **Option B — controlled sync workflow** (recommended). A scheduled/triggered job reads `MASTER_PRICES`, diffs it against `config/site/pricing.ts`, opens a pull request with the regenerated price module and a `PRICE_CHANGE_LOG` entry, and only deploys after review. Slower by one review cycle, but keeps GitHub history, keeps Vercel previews, and keeps a human gate on money.

Credentials: the site must read the sheet through a server-side service account. No key may ever appear in browser code; environment variables only, and none have been created yet.

---

## 7. Verification performed & limitations

Verified:
- All six tabs read back after writing; row counts and `Price_ID` sequences confirmed against the generated data.
- Every `Price_ID` in `PRICE_LOCATIONS` and `SYNC_STATUS` matches a row in `MASTER_PRICES`.
- Two structural defects introduced during population were found and fixed by read-back: a missing `BLG-051` row in `BLOG_FAQ_AUDIT` (all 177 audit rows are now present and aligned) and a gap in the `PRICE_LOCATIONS` canonical-definition block (all 75 definitions now present).
- Chinese values that did not survive the automation connector as plain text are rebuilt with `UNICHAR()` formulas so they display correctly.

Not verified / out of reach:
- Frozen header rows, column widths, colours, and data-validation dropdowns — the connector exposes no formatting API. These can be set manually in two minutes.
- The sandbox has no direct network access, so the sheet was written through the connector only; no Google Apps Script, trigger, or service account exists yet.
- `lib/seo.ts` and the `zh` installation page were read, not executed; the RM 180 conflict is from source inspection.

---

## 8. Reproducing this audit

```bash
npm ci
node scripts/pricing-audit.mjs        # read-only: writes docs/pricing-audit/*.json
npx tsx scripts/pricing-sheet-build.mjs   # read-only: writes docs/pricing-audit/sheet/*.json
```

Neither script modifies site source. `price-references.json` (2.6 MB) and `price-review-candidates.json` are regenerated by the first script and are intentionally not committed.

---

## 9. What I need from you before Phase 4

1. **Approve or correct `MASTER_PRICES`** (75 rows) — this is the gate.
2. **Decide C1–C8** and answer **Q1**.
3. **Choose Option A or Option B** for the sync architecture.

Until then, nothing on klrenovator.com changes.
