# Phase 1 — Pricing & Content Consistency Audit

**Repository:** `klrenovator/KLRenovator`  
**Branch:** `arena/019fd5c7-klrenovator`  
**Audit date:** 2026-08-06  
**Scope:** source code, route content, reusable components, configuration/data, calculators, public AI-readable files, SEO/schema-related content.

## Purpose

This is the saved, pre-change inventory for the KL Renovator pricing and installation-policy update. No customer-facing copy, prices, or calculator behaviour was changed in Phase 1.

The implementation is deliberately split into three reviewable GitHub stages:

1. **Phase 1 (this commit):** audit and change map.
2. **Phase 2:** canonical pricing, installation policy, and both calculators.
3. **Phase 3:** route/content/AI/SEO propagation plus exhaustive quality assurance.

## Project inventory

- 306 TypeScript/TSX/Markdown/JSON/text files were scanned under `app`, `components`, `config`, `lib`, `public`, and `scripts`.
- The project is a Next.js application with English, Malay, and Chinese route groups.
- Public AI-consumable content exists in `public/aeo-faq.txt`, `public/llms.txt`, `public/llms-full.txt`, and `public/site-summary.json`.
- The installation calculator has EN/MS/ZH routes, while the homepage service-price calculator is currently English/trilingual-label UI.

## Canonical data and generation flow

| Role | Location | Phase 2 action |
|---|---|---|
| Canonical shared pricing | `config/site/pricing.ts` | Update material rows, PCB, and add gas-leak repair row. |
| Client-safe generated pricing projection | `config/site-public.ts` | Regenerate with `npm run gen:site-public`; do not manually edit. |
| General service/FAQ data | `config/services-data.ts`, `config/services-i18n.ts` | Align its independently authored tables, descriptions, FAQs, and steps with canonical policy. |
| Shared calculator business logic | `lib/aircond-math.ts` | Replace HP-tier wire/PVC assumptions; add insulation and explicit PVC-type calculations. |
| Installation calculator UI | `components/calculators/installation-cost-calculator.tsx` | Add insulation input and separate small/large PVC inputs; preserve bracket as a paid optional material. |
| Homepage service-price calculator UI | `components/price-calculator.tsx` | Add dismantle and relocation using existing published pricing; make all four free materials and all requested extra-material calculations explicit. |

`config/site-public.ts` is generated from `config/site.ts` (which imports `config/site/pricing.ts`) by `scripts/gen-site-public.mjs`. Any Phase 2 change to shared pricing must be followed by generation.

## Confirmed current inconsistencies to correct

### Installation package and materials

The current canonical note says the first 7 ft of copper pipe, wire, and drain pipe are free, but **omits insulation**. Numerous independently authored pages also describe a bracket as included. The new standard must consistently be:

- 7 ft copper pipe included;
- 7 ft insulation included;
- 7 ft electrical wire included;
- 7 ft drain pipe included;
- every length beyond 7 ft charged at the applicable additional-material rate;
- outdoor brackets never described as free/included; they remain paid special-charge options only:
  - Standard Compressor / Outdoor Bracket — RM45
  - Heavy Duty Compressor / Outdoor Bracket — RM70.

### Material table

`config/site/pricing.ts` currently has HP-tier electrical wire rates (`RM9/ft`, `RM13/ft`, `RM17/ft`) and a combined PVC range (`RM6–12/ft`). It must become:

- Copper pipe: RM17/ft (1.0–1.5 HP), RM23/ft (2.0–2.5 HP), RM27/ft (3.0–3.5 HP);
- Electrical Wire: RM9/ft only;
- Insulation: RM7/ft;
- Drain Pipe beyond 7 ft: RM5/ft;
- Small PVC Casing (Electrical Wire): RM6/ft;
- Large PVC Casing (Copper Pipe + Wire + Insulation): RM12/ft;
- the existing bracket rows retained under additional materials/special charges.

### Repair and gas services

- The canonical PCB price is currently `RM 280 – 600`; it needs to be `RM 350 – 600`.
- `Gas Leak Repair — RM120 / leak` is not presently a canonical shared price row. Existing “gas leak” content is diagnostic/advisory, rather than this priced service.
- Existing gas top-up rates must be retained without change.

### Nitrogen references

A global scan found **62** case-insensitive `nitrogen` references. These occur in route content, service data, blogs, FAQ pools, SEO helper content, and reusable installation content. All nitrogen testing/pressure-test language must be removed, while vacuum pump commissioning at 500 microns is retained where currently applicable.

### Legacy-search baseline

These counts are pre-change matches and include legitimate uses where a term is also valid (for example, copper-pipe `RM17/ft`):

| Search | Pre-change occurrences | Required outcome |
|---|---:|---|
| `nitrogen` | 62 | 0 |
| `outdoor bracket` | 51 | Paid-material mentions may remain; “included/free” claims must be removed |
| `RM13/ft` | 26 | 0 |
| `RM17/ft` | 52 | Copper-pipe uses remain valid; wire-specific uses must be 0 |
| `RM280` | 106 | PCB-specific `RM280–600` claims must be 0 |
| `PCB Board Replacement` | 30 | All associated prices must be RM350–600 |
| `Gas Leak Repair` | 2 | Add consistent priced-service coverage where relevant |

## Exact files/areas identified for Phase 2

### Pricing and calculation logic (must change)

- `config/site/pricing.ts`
- `config/site-public.ts` (generated output)
- `lib/aircond-math.ts`
- `components/calculators/installation-cost-calculator.tsx`
- `components/price-calculator.tsx`
- `config/services-data.ts`
- `config/services-i18n.ts`
- `config/site-public.ts` consumers/price displays as required.

Current calculator gaps:

- `lib/aircond-math.ts` charges wire by HP tier and has no insulation field/rate.
- It models PVC using an RM6–12 midpoint rather than the requested two explicit casing choices.
- `InstallationCostCalculator` has copper, wire, and drain lengths but no insulation length; it exposes one combined PVC input.
- The homepage `PriceCalculator` bundles extra copper and wire into one distance, omits insulation and drain inputs, and only offers installation add-ons. It has no dismantle/relocate service choice despite published dismantling/relocation prices in `config/site/pricing.ts`.
- Published existing dismantle/relocation rows to use (not invent): dismantle only RM90; dismantle + reinstall same place RM250 (standard), RM290 (2.0–2.5 HP); dismantle + reinstall other place RM350.

## Site-wide propagation inventory (Phase 3)

The following files contain one or more of: nitrogen, outdoor-bracket wording, legacy wire pricing, legacy PCB pricing, or gas-leak wording. They require contextual updates rather than blind replacement.

### Route/page and reusable UI content

- `app/(en)/aircond-installation-kl/page.tsx`
- `app/(en)/aircond-service-price-malaysia/page.tsx`
- `app/(en)/areas/[slug]/page.tsx`
- `app/(en)/cuci-aircond-kl/page.tsx`
- `app/(en)/gallery/gallery-client.tsx`
- `app/(en)/installation-price-malaysia/page.tsx`
- `app/(en)/new-home-aircond-installation/page.tsx`
- `app/(en)/problems/[slug]/page.tsx`
- `app/(en)/services/[slug]/page.tsx`
- `app/(en)/services/emergency/page.tsx`
- `app/(en)/whole-house-aircond-installation/page.tsx`
- `app/(ms)/ms/aircond-service-price-malaysia/page.tsx`
- `app/(ms)/ms/cuci-aircond-kl/page.tsx`
- `app/(ms)/ms/installation-price-malaysia/page.tsx`
- `app/(ms)/ms/pemasangan-aircond-kl/page.tsx`
- `app/(zh)/zh/aircond-service-price-malaysia/page.tsx`
- `app/(zh)/zh/cuci-aircond-kl/page.tsx`
- `components/about-page-i18n.tsx`
- `components/diagnostic-tool.tsx`
- `components/gallery-page-i18n.tsx`
- `components/installation-cro-module.tsx`
- `components/installation-proof.tsx`
- `components/sections/hero.tsx`
- `components/sections/installation-spotlight.tsx`
- `components/service-detail-i18n.tsx`
- `lib/seo.ts`

### Content, FAQ, blog, area/brand/problem datasets

- `config/area-installation-content.ts`
- `config/blog-posts.ts`
- `config/brand-installation-content.ts`
- `config/brand-specs.ts`
- `config/installation-blog-batch1.ts`
- `config/installation-blog-batch3.ts`
- `config/installation-entity-map.ts`
- `config/installation-hub.ts`
- `config/installation-page-content.ts`
- `config/kampung-installation-content.ts`
- `config/master-faq-pool.ts`
- `config/problem-aeo-content.ts`
- `config/service-hvac-entity-pass.ts`
- `config/site-area-pages.ts`
- `config/site/areas.ts`
- `config/site/brands.ts`
- `config/site/problems.ts`
- `config/tool-content.ts`

### AI-readable/public generated content

- `public/aeo-faq.txt`
- `public/llms-full.txt`
- `public/site-summary.json`

`public/llms.txt` should also be checked during Phase 3 because it contains installation/service recommendations even where it was not returned by every legacy-pricing search.

## Phase 3 verification checklist

1. Regenerate `config/site-public.ts` after canonical-price updates.
2. Run typecheck, lint, and production build (or record any pre-existing failure separately).
3. Search all tracked source/content files for `nitrogen` and confirm zero matches.
4. Search for legacy `RM13/ft`, wire-specific `RM17/ft`, and PCB `RM280–600` variants; confirm zero outdated matches.
5. Review every retained outdoor-bracket match to confirm it is a paid additional-material/special-charge statement, never package inclusion.
6. Verify every installation/reinstallation wording includes all four free 7-ft materials.
7. Exercise both calculators for a 1.5 HP and a 2.5 HP example, including lengths above 7 ft, both PVC types, bracket, dismantle, and relocation; verify totals use only published rates.
8. Re-check public AI files, FAQ data, and schema/SEO-producing sources for the final wording and prices.

## Assumptions deliberately avoided

- No new dismantle or relocation rate will be invented; only existing published rows will be used.
- Gas top-up rates will not be changed.
- No new business claim, warranty, or technical process will be added. Nitrogen wording will be removed, and existing vacuum-commissioning wording retained.
