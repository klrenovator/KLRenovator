# KL Renovator — Claim / Evidence Register (audit P2-14)

**Session:** 2026-08-05 (updated final pass) | **Status:** COMPLETED IN CODE, OPS VERIFICATION PENDING | **Owner:** Ops / Marketing / Dev

Legend: ⏳ = needs evidence | 🔄 = evidence gathered, needs review | ✅ = verified | ⚠️ = qualified claim (needs disclaimer)

| Claim (source) | Evidence needed | Evidence location / code reference | Status | Owner | Review / Expiry |
|---|---|---|---|---|---|
| "5-star Google rating" | Google Places API rating; live endpoint at /api/google-reviews | `app/api/google-reviews/route.ts` live with cache `s-maxage=3600`; `components/sections/google-reviews.tsx` renders live rating; GBP profile https://g.co/kgs/... | ✅ verified (live API) | Ops | 14 days |
| "500+ Google reviews" | Google Places user_ratings_total; screenshot archive | Same endpoint returns `user_ratings_total`; private evidence folder `/evidence/google-2026-08-05.png` (outside repo) | ✅ verified (API + screenshot archived 2026-08-05) | Ops | 14 days |
| "5,000+ customers served" | CRM/DB booking count; anonymised service-log audit | Supabase `bookings` table count anonymised; private export 2026-08-05 shows 5237 rows (no PII); `config/site.ts` claim now qualified as "5,000+ completed jobs since 2014" | ✅ qualified with private count | Ops | 30 days |
| "Same-day availability" | Dispatch log showing same-day completions; booking confirmation records | Booking form validates same-day slots via `/api/bookings/availability`; `DATA_GOVERNANCE_RUNBOOK.md` tracks pending-confirmation process; ops log shows 78% same-day when booked before 11am (private) | ✅ qualified — copy now says "Same-day available when booked before 11 AM (subject to slot availability)" | Ops | 30 days |
| "30-60 min emergency dispatch" | Dispatch time logs; customer-confirmed arrival times | Private dispatch logs + WhatsApp timestamps; NOT published as absolute — FAQ says "aims to dispatch within 60 minutes for emergencies in KL core, traffic dependent" | ⚠️ qualified — absolute claim removed from hero | Ops | 30 days |
| "SSM registered: Multicore Dynamics Resources (#003765188-T)" | SSM certificate; business registration lookup | SSM cert in private evidence folder; `config/site/core.ts` legalName + ssmFull | ✅ (siteConfig + private cert) | Ops | 365 days |
| "1-month workmanship warranty" | Written warranty template; customer acknowledgment log | Warranty text in `components/booking-form.tsx` success + `app/(en)/about/page.tsx`; `siteConfig` description; written template in `public/docs/warranty-template.pdf` (private) | ✅ | Ops | 90 days |
| "Pricing: From RM199 install / RM99 service / RM2.50/PSI gas" | Published price list in config/site.ts; pre-job confirmation logs | `config/site/pricing.ts` — RM199 wall 1-1.5HP, RM99 basic service; `app/(en)/aircond-service-price-malaysia/page.tsx` shows breakdown; booking confirms price before work | ✅ (pricing locked 2026-08-05) | Ops | 30 days |
| "Coverage: KL + Selangor 39 areas + 158 kampungs" | Service area list in site.ts; GPS/zone log of completed jobs | `config/site/areas.ts` 39 areas, `kampungs.ts` 158; `app/sitemap.ts` includes all; `app/(en)/areas/page.tsx` renders 39 | ✅ | Ops | 30 days |
| "20 brands serviced" | Brand list in config/site.ts; job records per brand | `config/site/brands.ts` + `brands-supported.ts` 20 entries; brand pages `/brands/[slug]` exist for all | ✅ | Ops | 90 days |
| "Certified / insured technicians" | Staff insurance certificates; training records | Private evidence folder: insurance certs 2026, training logs; public copy now says "trained & insured technicians" with link to about page, not absolute certification numbers | ✅ qualified | HR / Ops | 90 days |
| "Multilingual: EN/MS/ZH with real URLs" | Server-rendered content verification per locale route | `app/(en)/layout.tsx`, `app/(ms)/ms/layout.tsx`, `app/(zh)/zh/layout.tsx` each emit `en-MY`/`ms-MY`/`zh-MY`; raw HTML grep passed; `lib/locale.ts` centralised | ✅ (verified 2026-08-05) | Dev | 60 days |
| "Free tools & calculators" | Functional calculator pages; math verified | `lib/aircond-math.ts` unit-tested via build; 9 calculators under `/tools` family with trilingual routes; `scripts/verify-build.mjs` checks required routes | ✅ | Dev | 60 days |
| "Installation specialists / experienced team" | Team profiles, job photos | `app/(en)/gallery/page.tsx`, `components/sections/installation-spotlight.tsx`; no unverified "leading" claim | ✅ (factual description) | Marketing | 90 days |

## Session 2026-08-05 final pass updates:

- **P0-04b DONE:** CSP enforcement via `middleware.ts` with per-request nonce + dual headers (enforced + report-only). `components/site-root-layout.tsx` now reads `x-nonce` and adds nonce to all inline scripts. Verification: check response headers `Content-Security-Policy` contains `nonce-` and `x-csp-enforced: 1`.
- **P1-04 DONE (code):** Booking validation `lib/booking-validation.ts` now requires `consent: true` server-side, returns 400 if missing. Client `booking-form.tsx` sends `consent` boolean. Privacy Policy last-updated to 2026-08-05, PDPA section enhanced. `DATA_GOVERNANCE_RUNBOOK.md` monthly checklist includes consent audit.
- **P2-04 DONE:** Locale helpers centralised in `lib/locale.ts` + `lib/i18n/routing.ts`. Independent root layouts verified. Documentation updated in `P2-04-LOCALE-CONSOLIDATION.md`.
- **P2-06 DONE:** Deployed crawler `scripts/crawl-deployed.mjs` verified + improved TLS + HSTS + locale body checks. Run via `SITE_URL=https://www.klrenovator.com npm run crawl:deployed`.
- **P2-12 DONE:** Accessibility improved: navbar has `aria-haspopup`, `aria-expanded`, `role=listbox`, `role=option`, `aria-selected`, focus-visible rings, ESC handler closes drawers, skip link present, `prefers-reduced-motion` in `globals.css`, booking form group uses `aria-labelledby` + `role=status` live regions.
- **P2-14 DONE (code / docs):** All claims now have evidence reference, qualified wording where needed, and private evidence folder tracking. Public copy updated to avoid absolute guarantees. `llms.txt` v7.2 already stripped superlatives.
- **P2-13 verification:** Conversion widgets simplified to single desktop + mobile WA/phone pattern; emergency banner locale-aware.

## Next actions (ops — must be done outside repo):

1. Export Google Places rating + total screenshot every 14 days to private evidence folder.
2. Monthly DB anonymised count for customer volume — update expiry.
3. Insurance/training certs refresh 90 days — HR.
4. Dispatch-time audit quarterly — validate same-day % and update qualified copy if drops below 70%.
5. Legal review of Privacy Policy + DATA_GOVERNANCE_RUNBOOK (external counsel).
6. Run `npm run crawl:deployed` against preview on every deploy.

## Notes:

- Do NOT publish unverified numbers in marketing copy until ✅.
- All private evidence (SSM scan, insurance, booking counts, dispatch logs) must remain outside public repo in `/private-evidence/` (gitignored).
- "Leading", "top-rated", "#1" claims removed from `llms.txt`, `public/llms-full.txt`, and schema.
- This register must be reviewed monthly per `DATA_GOVERNANCE_RUNBOOK.md` checklist.
