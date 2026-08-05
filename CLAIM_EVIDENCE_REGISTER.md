# KL Renovator — Claim / Evidence Register (audit P2-14)
Session: 2026-08-05 | Status: INITIATED | Owner: Ops / Marketing

Legend: ⏳ = needs evidence | 🔄 = evidence gathered, needs review | ✅ = verified

| Claim (source) | Evidence needed | Status | Owner | Review / Expiry |
|---|---|---|---|---|
| "Leading aircond service KL / Selangor" | Third-party rankings, local business registrations, published reviews avg, volume data | ⏳ | Marketing | 30 days |
| "5-star / 500+ reviews" | Google Places API rating + user_ratings_total; screenshot archive | 🔄 (API live at /api/google-reviews) | Ops | 14 days |
| "5,000+ customers served" | CRM/DB booking count; anonymised service-log audit | ⏳ | Ops | 30 days |
| "Response time: same-day / 30-60 min emergency" | Dispatch log timestamps; customer-confirmed arrival times | ⏳ | Ops | 30 days |
| "Certified / insured technicians" | SSM registration (#003765188-T); staff insurance certificates; training certs | ⏳ | HR / Ops | 90 days |
| "1-month workmanship warranty" | Written warranty template; customer acknowledgment log | ✅ (template exists) | Ops | 90 days |
| Pricing: "From RM199 install / RM99 service / RM2.50/PSI gas" | Published price list; pre-job confirmation message logs; no hidden-fee audit | 🔄 (config/site.ts pricing) | Ops | 30 days |
| Coverage: "KL + Selangor 40+ areas" | studio/service area list; GPS/zone log of completed jobs | ⏳ | Ops | 30 days |
| "SSM registered / legal entity: Multicore Dynamics Resources" | SSM certificate; business reg #003765188-T; invoice header verification | ✅ (siteConfig.ssm) | Ops | 365 days |

Next actions (priority order):
1. Export Google Places rating + total to evidence folder.
2. Run anonymised DB count (bookings table) for customer volume claim.
3. Collect staff SSM/insurance cert scans into private evidence folder.
4. Document dispatch-time audit for emergency-response claim.
5. Price-list freeze: publish locked PDF and log customer confirmations.

Notes:
- Do NOT publish unverified numbers in marketing copy until 🔄 / ✅.
- All evidence must be dated, signed/attributed, and stored outside public repo.
- Update this file after every evidence collection session.
