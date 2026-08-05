# KL Renovator — Personal-data Governance Runbook

**Owner:** Operations lead

**Last updated:** 05 August 2026 (P1-04 final pass)

**Review cadence:** monthly, and whenever a processor, form, or booking workflow changes

**Scope:** booking, contact/WhatsApp enquiries, staff access, Supabase, Google Calendar, GA4, Clarity and Vercel.

This internal runbook supports the public [Privacy Policy](/privacy-policy). It is not customer-facing evidence and must not contain customer data, credentials, or certificate scans.

## 1. Access control

1. Give booking-data access only to the operations lead and technicians who need a specific job’s contact/address details.
2. Use individual accounts where a provider supports them; never share Supabase, Google, Vercel, or admin passwords in chat or a spreadsheet.
3. Remove a departing staff member’s access on their final working day; record the removal date and owner in the monthly review log.
4. Rotate `ADMIN_SESSION_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, Google credentials, Upstash token, and other privileged values after suspected exposure or staff-role changes.
5. Review the Supabase dashboard and Google Calendar sharing list monthly for unknown users/service accounts.

## 2. Retention schedule

| Record | Working retention | Action at expiry | Owner |
|---|---:|---|---|
| Completed booking / invoice / warranty evidence | 7 years, subject to applicable tax and accounting duties | Delete or irreversibly anonymise after confirming no legal/warranty hold | Operations + finance |
| Unconverted enquiry / quote | 90 days | Delete from business inbox, CRM/export and any manual tracker unless the person asks to keep it | Operations |
| Calendar event | Keep only while needed to schedule/complete the job; no longer than the underlying booking record | Delete event content once the linked record is removed | Operations |
| Admin access audit log | 12 months | Delete aggregated log after review | Operations |
| Analytics data | Provider-configured minimum practical retention | Review GA4/Clarity settings quarterly | Marketing |
| Consent records (booking) | Same as booking record it belongs to (proof of consent) | Delete with booking | Operations |

A legal, fraud, complaint, payment, or warranty hold overrides normal deletion. Record the reason and review date; delete when the hold ends.

## 3. Access, correction, withdrawal and deletion requests

1. Receive requests at `info@klrenovator.com` or the public phone/WhatsApp number. Do not ask the requester to send identity documents by WhatsApp unless strictly necessary.
2. Open an internal request entry with date, contact channel, requested action, systems searched, assigned owner, due date, and result. Do **not** store the requester’s full data in this runbook.
3. Verify the requester reasonably (for example, match the phone/email already attached to the booking) before disclosing or deleting data.
4. Search Supabase bookings, Google Calendar, the company mailbox/WhatsApp export, and any manual spreadsheet/CRM.
5. Correct inaccurate data, or export the minimum relevant record securely. For deletion, remove data from each system unless a retention hold applies; if held, explain the limited reason and review date.
6. Reply within the PDPA response timeframe stated in the Privacy Policy (target: 21 days). Escalate uncertainty to management/legal counsel rather than guessing.
7. Record completion date and systems actioned, then retain only the minimal audit entry for 12 months.

## 4. Incident response

1. Revoke exposed credentials and suspend affected integrations immediately.
2. Preserve only necessary logs/evidence; do not paste customer details into tickets or public repositories.
3. Assess affected systems, data types, people, and timeframe. Notify management and obtain legal advice on notification duties.
4. Fix root cause, rotate credentials, test the repair, and document preventive actions.
5. Notify affected data subjects if required under PDPA 2010 breach notification guidance.

## 5. Monthly controls checklist (enhanced 2026-08-05 — P1-04, P0-04b, P2-14)

- [ ] Admin, Supabase, Google Calendar, Vercel and Upstash access reviewed.
- [ ] Pending Calendar-sync bookings checked and customers/technicians notified where required.
- [ ] 90-day unconverted enquiries deleted or justified under a hold.
- [ ] Expired records identified against the retention schedule.
- [ ] Data subject requests closed within target timeframe (21 days PDPA).
- [ ] Privacy Policy processor list and booking consent copy still match the deployed site.
- [ ] Booking form consent checkbox is required client-side AND server-side (`lib/booking-validation.ts` checks `consent:true`).
- [ ] Production environment has `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` configured (rate limiting).
- [ ] Claim-evidence register reviewed; private evidence is stored outside the repository.
- [ ] CSP enforcement live: response headers contain `Content-Security-Policy` with nonce + `x-csp-enforced:1`; check `https://www.klrenovator.com` headers + `/api/csp-report` logs.
- [ ] `CONTENT_SECURITY_POLICY` report logs reviewed (if `CSP_REPORT_LOG=1`); no unexpected violations in last 30 days.
- [ ] Deployed crawler `SITE_URL=https://www.klrenovator.com npm run crawl:deployed` run and passed (200, canonical, hreflang reciprocal, noindex, H1, SSR lang).
- [ ] Accessibility quick check: skip link, focus-visible, ESC to close drawers, keyboard booking flow.
- [ ] Conversion widgets still single pattern (one desktop, one mobile WA/phone) — no stacking.

## 6. Deployment prerequisites

Before releasing a booking-flow change, verify:

- Public consent checkbox is required (client disables submit, server returns 400 if missing) — see `lib/booking-validation.ts`.
- Privacy Policy remains linked in booking form and footer, last-updated date current.
- All required server secrets are configured (`SUPABASE_*`, `GOOGLE_*`, `ADMIN_SESSION_SECRET`, `UPSTASH_*`, `INDEXNOW_TRIGGER_SECRET`).
- `npm run lint && npm run typecheck && npm run build && npm run verify:build && npm run verify:routes && npm run audit:gsc` are green.
- Deployed sitemap crawl passes (`npm run crawl:deployed` with production `SITE_URL`).
- Sanitizer script passes (`npx tsx scripts/verify-sanitizer.mjs`) for all 261 blog bodies + attack payloads.

The technical checks are documented in `DEEP_WEBSITE_AUDIT.md`.
