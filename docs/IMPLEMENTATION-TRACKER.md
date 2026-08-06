# Deep Audit Master Implementation Tracker

**Last updated:** 6 August 2026  
**Sources:** `DEEP_WEBSITE_AUDIT.md` (4 August 2026, previous audit) and `docs/DEEP_WEBSITE_AUDIT-2026-08-05.md` (new audit).  
**Rule:** statuses describe the current repository, not merely the auditor's snapshot. Items already implemented by earlier work are recorded as completed and are not duplicated.

| ID | Category | Recommendation / verification scope | Severity | Status |
|---|---|---|---|---|
| NEW-01 | International SEO | SSR locale is authoritative for homepage and Areas hub; pass explicit locale from `/ms` and `/zh` routes. | Critical | ✅ Completed |
| NEW-02 | Pricing / trust | Align window-unit installation price in calculator, prose, FAQ and structured data. Current source-of-truth price is RM199. | High | ✅ Completed |
| NEW-03 | Security | Rate-limit `/api/admin/login` using shared production limiter. | High | ✅ Completed |
| NEW-04 | Security | Add a server-only guard to the Supabase service-role module. | High | ✅ Completed |
| NEW-05 | Build integrity | Run `gen:site-public` automatically before production builds. | High | ✅ Completed |
| NEW-06 | Accessibility | Associate booking Name, Phone and Address labels with controls. | Medium | ✅ Completed |
| NEW-07 | Accessibility | Replace readable `text-slate-400` uses with WCAG AA-safe contrast. | Medium | ✅ Completed |
| NEW-08 | Structured data | Remove duplicate homepage FAQPage graph; retain one intentional AEO FAQ graph. | Medium | ✅ Completed |
| NEW-09 | Accessibility / UX | Escape-to-close and focus containment for modal popups. | Medium | 🔍 Needs Review |
| NEW-10 | Performance | Dynamically split large below-fold homepage calculators after bundle/CWV validation. | Medium | ✅ Completed |
| NEW-11 | Dependencies | Evaluate `googleapis` → `@googleapis/calendar` migration with compatibility and cold-start evidence. | Low | 🔍 Needs Review |
| NEW-12 | Performance / typography | Decide intentionally between system fonts and `next/font`; document the decision. | Low | ✅ Completed |
| NEW-13 | Dependencies | Confirm whether `@heroui/styles` is still required; remove only if verified unused. | Low | 🔍 Needs Review |
| NEW-14 | Security | CSP/nonce strategy for analytics and inline JSON-LD. | Nice to Have | ✅ Completed |
| NEW-15 | Verification | Run npm install, typecheck, lint, build, route/SEO/sanitizer checks in connected CI. | High | ⏳ Pending |
| NEW-16 | Operations | Run production crawl, Lighthouse/CWV, npm audit, and axe/keyboard tests. | Medium | ⏳ Pending |

## Prior-audit recommendations rechecked

The previous audit's P0–P3 remediation register is retained in `DEEP_WEBSITE_AUDIT.md`. Current code confirms its core implementation items: locale SSR, bounded/rate-limited availability, CSP enforcement, blog sanitization, fail-closed Supabase and IndexNow, explicit locale layouts, loading/error boundaries, cache headers, typed sitemap/route contracts, accessibility baseline, conversion-widget simplification, claim register, modern TS target, cleaned comments, zero production `as any`, and factual AEO files. Production-only checks remain verification tasks, not claims of live deployment success.

## Verification notes

- The new audit's homepage/Areas locale finding was already fixed by the prior remediation; current files use `Home locale="ms|zh"` and `AreasClient forcedLang="ms|zh"`.
- Admin login was already rate-limited in the current checkout at 8 attempts / 10 minutes through the shared limiter; it was not reimplemented.
- Booking labels were already corrected in the current checkout; no duplicate form work was performed.
- No `exit-intent-popup.tsx` remains in the current tree; modal recommendation is therefore marked Needs Review rather than inventing a replacement.
- `next/font` is intentionally not used because the repository documents an offline-safe system-font strategy; no font-loading dependency was added.
