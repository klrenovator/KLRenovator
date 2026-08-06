# KL Renovator (klrenovator.com) — Deep Website Audit

**Repository:** KLRenovator-main.zip  
**Stack:** Next.js 16.2.12 / React 19 / TypeScript 5.9 / Tailwind 4  
**Audit date:** 5 August 2026

## Method and limitations

Full manual source review (183 TS/TSX files across `app/`, `components/`, `config/`, `lib/`, and `scripts`), targeted verification of Next.js 16 and Google policy claims, and static analysis via TypeScript. A live `next build` could not be run by the auditor because the sandbox had no npm registry egress (`npm install` returned `403 host_not_allowed`). Findings are evidence-based from source inspection. Run `npm run build` and `npm run typecheck` before deployment.

## Executive summary

This is a mature, revenue-generating Next.js site with strong prior hardening: signed HttpOnly admin sessions, gated debug endpoints, split client-safe site data, zero-JS reveal animation, idle-loaded non-critical widgets, optimized images, multilingual SEO architecture, and substantial AI-search content. The audit identified a small number of unresolved issues, chiefly the homepage/Areas locale SSR contract, inconsistent window-unit pricing, missing admin-login rate limiting, missing server-only protection for the Supabase service-role module, and an unenforced `site-public` generation step.

## Findings

### Critical — homepage and Areas-hub language architecture

The report identified two competing i18n patterns. About, Brands, Blog, and Near Me pass explicit language (`forcedLang`/`initialLang`) from route Server Components. At the audit snapshot, the homepage and Areas hub used `useLang()` without a route-level language prop:

- `app/ms/page.tsx` and `app/zh/page.tsx` rendered `<Home />` without a language prop.
- `app/ms/areas/page.tsx` and `app/zh/areas/page.tsx` rendered `<AreasClient />` without `lang`/`forcedLang`.
- `LanguageProvider` initially rendered English and corrected language after hydration using URL/localStorage.

Impact: translated metadata could accompany English initial body HTML, with a visible flash and possible English-language indexing. Recommended fix: use explicit server locale props / standalone Server Components, matching the known-good Blog and Near Me patterns, and audit future `useLang()` consumers.

### High — pricing consistency

`lib/aircond-math.ts` prices a 1.0–1.5 HP window-unit installation at RM199, while customer-facing and structured-data content says “window unit(s) from RM180” in:

- `app/page.tsx`
- `config/installation-hub.ts`
- `config/brand-installation-content.ts`
- `config/area-installation-content.ts`
- `config/kampung-installation-content.ts`
- `config/installation-page-content.ts`

The latter also contains a three-tier RM180/RM200/RM230 breakdown. Select one verified price source, centralize it, and update all customer-facing prose and schemas.

### High — admin login rate limiting

`app/api/admin/login/route.ts` uses constant-time password comparison and randomized delay, but the audit found no rate limiter. Add the shared limiter before password verification (suggested starting point: five attempts per 15 minutes per IP), preferably using the project’s distributed production limiter.

### High — server-only Supabase service-role guard

`lib/supabase.ts` exports `supabaseAdmin` using `SUPABASE_SERVICE_ROLE_KEY` without a `server-only` import. It was only imported by route handlers at audit time, but a future client import could expose a secret. Add `import "server-only"` or isolate the privileged export in a server-only module.

### High — generated public site data is manually synchronized

`scripts/gen-site-public.mjs` generates the client-safe `config/site-public.ts`, but the audit found it was not automatically wired to a lifecycle step. Add `prebuild: npm run gen:site-public` and document the source/generated relationship.

### Medium — booking form labels

The Name, Phone, and Address controls in `components/booking-form.tsx` lacked matching `id`/`htmlFor` pairs in the audited snapshot. Add stable IDs and associated labels.

### Medium — WCAG contrast

The audit measured Tailwind `text-slate-400` (`#94a3b8`) on white at approximately 2.56:1 and found roughly 195 uses, including small footer text. Replace readable uses with `text-slate-500` or another verified passing color; retain slate-400 only for genuinely decorative/non-text content.

### Medium — duplicate homepage FAQPage schema

The audited snapshot emitted two FAQPage JSON-LD blocks: one through `HomepageAeoSchemas` and one inline in `app/page.tsx`. Merge into one deduplicated FAQPage graph. FAQ markup may still support machine-readable/AEO extraction, but local businesses should not expect Google’s classic FAQ rich result (restricted since 2023).

### Medium — modal keyboard behavior

`components/exit-intent-popup.tsx` had a dialog role, `aria-modal`, and close button, but no Escape-to-close handling or focus containment. Add Escape handling, focus restoration, and a lightweight focus trap or equivalent keyboard containment for any modal-style popup.

### Medium — homepage bundle splitting

The audit found large client components such as `PriceCalculator` and `DiagnosticTool` statically imported by the homepage. Use `next/dynamic` with an accessible loading skeleton for below-fold interactive tools where this improves measured bundles and does not harm SEO. Evaluate similarly large interactive components based on bundle evidence.

### Nice to have — dependency and typography decisions

- Consider replacing the broad `googleapis` dependency with `@googleapis/calendar` after verifying API compatibility and server cold-start impact.
- Decide deliberately whether system fonts are preferred. `config/fonts.ts` describes an offline-safe system-font setup rather than using `next/font`.
- Confirm whether `@heroui/styles` is still needed.
- Design a nonce-based CSP around GTM/GA4/Clarity inline scripts; do not deploy a breaking CSP without testing all required origins and scripts.

## Strengths confirmed by the audit

- Correct asynchronous Next.js 16 `params: Promise<...>` usage across dynamic routes.
- Mature trilingual sitemap with alternates and stable last-modified behavior.
- AI-crawler-friendly robots policy and factual `llms.txt`/`llms-full.txt`/`aeo-faq.txt` assets.
- Correct removal of self-serving review markup from business schema.
- Strong booking validation, honeypot, server availability re-check, and opaque API errors.
- Secure admin session design with timing-safe comparison.
- No raw image optimization bypasses and a deliberate mobile image-size configuration.
- Locality content sampled by the auditor was differentiated rather than generic filler.

## Priority roadmap from the audit

1. Fix homepage and Areas locale architecture.
2. Resolve window-unit pricing consistently across six content/config locations and structured data.
3. Add admin-login rate limiting.
4. Add server-only guard to Supabase service-role module.
5. Wire `gen-site-public` into `prebuild`.
6. Fix booking Name/Phone/Address labels.
7. Replace failing readable slate-400 text.
8. Merge duplicate homepage FAQPage schema.
9. Add Escape/focus handling to modal popups.
10. Code-split large below-fold homepage Client Components.
11. Evaluate scoped Google Calendar dependency.
12. Decide on typography intentionally.
13. Confirm HeroUI styles dependency.
14. Plan nonce-based CSP with analytics compatibility.

## Verification requested by the auditor

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

Also verify pricing content, raw multilingual HTML, admin-login throttling, accessibility with axe/keyboard testing, and production CSP/analytics behavior.
