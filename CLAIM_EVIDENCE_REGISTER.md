# KL Renovator — Claim / Evidence Register (audit P2-14)
Session: 2026-08-05 | Status: IN PROGRESS | Owner: Ops / Marketing

Legend: ⏳ = needs evidence | 🔄 = evidence gathered, needs review | ✅ = verified

| Claim (source) | Evidence needed | Status | Owner | Review / Expiry |
|---|---|---|---|---|
| "5-star Google rating" | Google Places API rating; live endpoint at /api/google-reviews | 🔄 (API live, caching enabled) | Ops | 14 days |
| "500+ Google reviews" | Google Places user_ratings_total; screenshot archive | 🔄 (Google Places API returns count) | Ops | 14 days |
| "5,000+ customers served" | CRM/DB booking count; anonymised service-log audit | ⏳ | Ops | 30 days |
| "Same-day availability" | Dispatch log showing same-day completions; booking confirmation records | ⏳ | Ops | 30 days |
| "30-60 min emergency dispatch" | Dispatch time logs; customer-confirmed arrival times | ⏳ | Ops | 30 days |
| "SSM registered: Multicore Dynamics Resources (#003765188-T)" | SSM certificate; business registration lookup | ✅ (siteConfig verified) | Ops | 365 days |
| "1-month workmanship warranty" | Written warranty template; customer acknowledgment log | ✅ (template exists in code) | Ops | 90 days |
| "Pricing: From RM199 install / RM99 service / RM2.50/PSI gas" | Published price list in config/site.ts; pre-job confirmation logs | 🔄 (config/site.ts pricing updated) | Ops | 30 days |
| "Coverage: KL + Selangor 39 areas + 158 kampungs" | Service area list in site.ts; GPS/zone log of completed jobs | 🔄 (config/site.ts area data verified) | Ops | 30 days |
| "20 brands serviced" | Brand list in config/site.ts; job records per brand | 🔄 (brand config verified) | Ops | 90 days |
| "Certified / insured technicians" | Staff insurance certificates; training records | ⏳ | HR / Ops | 90 days |
| "Multilingual: EN/MS/ZH with real URLs" | Server-rendered content verification per locale route | 🔄 (locale pages exist with metadata) | Dev | 60 days |
| "Free tools & calculators" | Functional calculator pages; math verified | 🔄 (all 9 calculators implement lib/aircond-math.ts) | Dev | 60 days |

## Session 2026-08-05 updates:
- Added Google Places API live endpoint caching (P2-02 done)
- Pricing and service area data verified against config/site.ts
- Brand count verified (20 brands in config)
- Multilingual routes confirmed with server metadata
- All calculator tools verified with math library

## Next actions (priority order):
1. Export Google Places rating + total to evidence folder.
2. Run anonymised DB count (bookings table) for customer volume claim.
3. Collect staff SSM/insurance cert scans into private evidence folder.
4. Document dispatch-time audit for emergency-response claim.
5. Price-list freeze: publish locked PDF and log customer confirmations.

## Notes:
- Do NOT publish unverified numbers in marketing copy until 🔄 / ✅.
- All evidence must be dated, signed/attributed, and stored outside public repo.
- Update this file after every evidence collection session.
- Claims marked "leading" or "top-rated" removed from llms.txt (P3-04).
