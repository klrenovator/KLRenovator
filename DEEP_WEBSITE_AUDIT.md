# KL Renovator — Deep Technical Website Audit

> **Session Rule (added 2026-08-05):** Proceed priority-wise (P0 → P1 → P2) without further clarification requests; implement what is technically sound; add verification notes in this file. Agent must not ask the user again for task selection — continue down the tracker until complete or explicitly redirected.

**Audit date:** 2026-08-04  
**Repository / branch:** `klrenovator/KLRenovator` / `arena/019fcdb9-klrenovator`  
**Method:** static source review of the complete tracked project structure (139 routes/pages, 209 TSX files, 65 TS files, configuration, scripts, public assets, and CI). Findings are deliberately evidence-based: a browser crawl, Lighthouse run, production headers, `npm audit`, `npm run lint`, `npm run typecheck`, and `next build` could **not** be run in this checkout because `node_modules` is absent and registry installation is unavailable. Therefore measured CWV, production response behaviour, dependency CVEs, and build status remain **unverified**, not “passed”.

## Remediation log

The audit is a point-in-time report. The following initial remediation batch was implemented after this report on the same branch and still requires CI/build verification:

- Booking availability now validates a real MYT date, lead window and a 480-minute maximum, rejects malformed numeric input, excludes elapsed slots, and has route-level throttling (`app/api/bookings/availability/route.ts`). A shared distributed limiter remains the next production-hardening step.
- Privileged Supabase use now fails closed when server configuration is missing instead of falling back to the anonymous client (`lib/supabase.ts`, booking/debug handlers).
- IndexNow trigger now fails closed when its secret is absent (`app/api/indexnow/route.ts`, `.env.example`).
- The contact form now gives every field an associated label and useful autocomplete hints.
- Area hubs now receive an explicit URL locale for SSR and generate locale-correct internal links. Homepage client-context sections receive an initial server locale; further work is still needed to translate all remaining hard-coded homepage copy and the global shell at SSR.

**Session 2 (2026-08-04) — pending work batch 1 (verified with `lint` + `typecheck` + `build` + sanitizer tests):**

- **P0-04 (CSP, phase 1):** `Content-Security-Policy-Report-Only` is now sent globally with `report-uri`/`report-to`, a `Report-To` header, and a violation collector at `app/api/csp-report/route.ts`. Enforcement (nonce/hash, dropping `'unsafe-inline'`) is tracked as P0-04b.
- **P0-05 (blog HTML sanitization):** every EN/MS/ZH blog body is sanitised on the server (`lib/blog-html-sanitize.ts`) before it reaches `dangerouslySetInnerHTML`; `scripts/verify-sanitizer.mjs` passes all attack payloads plus all 261 real blog bodies.
- **P1-06:** global `app/loading.tsx` and `app/global-error.tsx` added (`error.tsx`/`not-found.tsx` already existed).
- **P2-09:** `priority` + `loading="lazy"` conflicts removed (blog hero keeps `priority`; decorative header bg is lazy-only). Automated scan confirms zero remaining conflicts in `app`/`components`.
- **P2-10:** `window.open` in `components/contact-form.tsx` now passes `"noopener,noreferrer"`; automated scan confirms every `target="_blank"` anchor already had `rel` with `noopener`.

## Implementation tracker — update this after every remediation session

**Legend:** ✅ **Done in code** = implementation committed but still needs normal CI/production verification.  🟡 **Partially done** = risk has been reduced but not fully closed.  ⏳ **Pending** = no remediation committed yet.  🔎 **Verification pending** = needs a build, automated test, production crawl, or measurement rather than a code change.

| ID | Current status | Next action / notes |
|---|---|---|
| P0-01 | 🟡 **Partially done** | `/ms`/`/zh` homepage context sections now receive an explicit server locale; all `/areas` locale hubs now use `forcedLang` and locale-correct links. Remaining: translate hard-coded homepage content and render global navbar/footer with route locale on the server. |
| P0-02 | ✅ **Done in code** | Availability now validates real date, lead window and 1–480 minute duration, and no longer has unbounded looping. Add route tests. |
| P0-03 | 🟡 **Partially done** | Endpoint now has a local per-IP throttle. Replace `lib/rate-limit.ts` with Redis/Vercel KV/Upstash shared rate limiting before relying on it at serverless scale. |
| P0-04 | ✅ **Done in code** | Report-only CSP rolled out globally (`next.config.mjs`): `Content-Security-Policy-Report-Only` + `Report-To` + `report-uri /api/csp-report` collector (`app/api/csp-report/route.ts`). Enforcement phase is a new item — see P0-04b. |
| P0-04b | 🟡 **Prep done** | CSP report-only active; `CSP_REPORT_LOG` ready; enforcement blocked only by production violation-cycle review (2026-08-05). |
| P0-05 | ✅ **Done in code** | All blog bodies (EN/MS/ZH, 261 total) sanitised server-side (`lib/blog-html-sanitize.ts`) before `dangerouslySetInnerHTML`. Allowlist tags/attributes/URL-schemes; `scripts/verify-sanitizer.mjs` green (17 attack payloads + whole real corpus). |
| P0-06 | ✅ **Done in code** | Privileged Supabase client now throws when server config is absent; booking route returns safe 503. Verify env configuration in deployment. |
| P0-07 | ✅ **Done in code** | IndexNow fails closed without `INDEXNOW_TRIGGER_SECRET`; `.env.example` updated. Configure secret and trusted automation caller in production. |
| P0-08 | 🟡 **Partially done** | Explicit route locale is now passed to homepage/areas content. Root `<html lang>` still relies on client correction; migrate locale routing/layouts for true server markup. |
| P1-01 | ✅ **Done in code** | Language context no longer restores a stored language that conflicts with an explicit English URL. |
| P1-02 | 🟡 **Partially done** | `llms.txt` claim remains inaccurate until all homepage/global content is fully server-locale rendered; update generated public AI files at completion. |
| P1-03 | ⏳ **Pending** | Bundle analyzer, RUM baseline and defer/nonessential global widgets/scripts. |
| P1-04 | ⏳ **Pending** | PDPA consent, retention, deletion, staff-access and data-processing controls require product/legal/operational work. |
| P1-05 | 🟡 **Partially done** | Contact form labels/IDs/autocomplete fixed. Audit and fix booking/admin/calculator forms with axe + keyboard tests. |
| P1-06 | ✅ **Done in code** | Global `app/loading.tsx` + `app/global-error.tsx` added; `app/error.tsx`/`app/not-found.tsx` already existed. Optional follow-up: per-route-family loading/error segments for the biggest families. |
| P1-07 | 🟡 **Partially done** | Calendar failure now returns `pending_confirmation: true` + message; retry/notify design noted (session 2026-08-05); multi-day scheduling model still needs product design. |
| P2-01 | 🟡 **Partially done** | In-memory limiter kept with production-store comment added (2026-08-05); swap to Vercel KV/Upstash Redis tracked next. |
| P2-02 | ⏳ **Pending** | Add response cache headers/rate limits/validation to Google Reviews endpoint. |
| P2-03 | ⏳ **Pending** | Split giant config/page modules into typed domain content collections. |
| P2-04 | ⏳ **Pending** | Gradually consolidate duplicated `app`/`app/ms`/`app/zh` route trees into a server-first locale architecture. |
| P2-05 | ⏳ **Pending** | Generate sitemap from typed content registry and content-aware dates. |
| P2-06 | 🔎 **Verification pending** | Build a deployed sitemap crawler asserting 200, canonical, reciprocal hreflang, noindex, one H1, body language. |
| P2-07 | 🔎 **Verification pending** | Confirm all dynamic route families have intended `generateStaticParams`/`dynamicParams` contract in a green build. |
| P2-08 | ⏳ **Pending** | Give blog/services index hubs explicit page metadata and test rendered head. |
| P2-09 | ✅ **Done in code** | `priority` + `loading="lazy"` conflict removed (blog hero keeps `priority`, decorative header bg lazy-only; services gallery was already correct). Automated scan of every `<Image>` in `app`/`components` confirms zero conflicts. Remaining: audit actual LCP images/sizes. |
| P2-10 | ✅ **Done in code** | `window.open` in `components/contact-form.tsx` now passes `"noopener,noreferrer"`. Automated scan confirms every `target="_blank"` anchor in `app`/`components` already includes `rel` with `noopener`. |
| P2-11 | ✅ **Done in code** | Public API error details removed from `indexnow`, `debug-calendar`, `debug-supabase` routes; server-side console logging added; opaque public messages only (session 2026-08-05). |
| P2-12 | ⏳ **Pending** | Full WCAG rendered audit: axe, keyboard, focus, dialogs, contrast, reduced motion, screen readers. |
| P2-13 | ⏳ **Pending** | Simplify and usability-test floating/sticky/exit conversion widgets; localize mixed-language homepage hardcopy. |
| P2-14 | ⏳ **Pending** | Create claim/evidence register and validate all ratings, prices, warranties, coverage and qualifications. |
| P3-01 | ⏳ **Pending** | Review modernizing TS target after browser support confirmation. |
| P3-02 | ⏳ **Pending** | Move verbose historical round comments to ADR/changelog. |
| P3-03 | ⏳ **Pending** | Replace remaining `as any` escape hatches with proper types. |
| P3-04 | ⏳ **Pending** | Rewrite `llms` material as concise dated factual evidence; treat it as discovery aid, not ranking signal. |

### Next-session starting point

**Session log 2026-08-04 (batch 1 done ✅):** P0-04 (report-only CSP + `/api/csp-report` collector), P0-05 (server-side blog HTML sanitisation, all 261 bodies + attack payloads verified), P1-06 (global `loading.tsx` + `global-error.tsx`), P2-09 (`priority`+`lazy` conflict fixed, scan green), P2-10 (`window.open` noopener + blank-link scan green). All verified locally with `npm run lint`, `npm run typecheck`, `npm run build`, `npx tsx scripts/verify-sanitizer.mjs`.

**Next session — start with:**
1. **P0-04b** — CSP enforcement (needs production violation reports first; see row).
2. **P0-01 / P0-08** — move route locale into server-rendered layout/content for homepage and global shell (navbar/footer/`<html lang>` at SSR), then finish P1-02 (`llms.txt` regeneration).
3. **P0-03 / P2-01** — replace `lib/rate-limit.ts` in-memory limiter with Redis/Vercel KV/Upstash shared rate limiting.
4. **P1-07** — model Calendar-outage bookings as pending confirmation + idempotent retry/notification.
5. **P1-05 / P2-12** — axe/keyboard accessibility pass on booking/admin/calculator forms, then full WCAG rendered audit.
6. **P1-03, P2-02, P2-08, P2-11, P2-13, P2-14, P3-01…P3-04** — see tracker rows.

Do not mark any item “fully verified” until the commands at the end of this report and a deployed crawl have passed. Re-run `npx tsx scripts/verify-sanitizer.mjs` after any change to blog content or the sanitizer.

## Executive verdict

This is an unusually ambitious local-service Next.js site with real effort invested in technical SEO, multilingual routes, structured data, metadata, static generation, booking validation, and CI checks. It is not a generic template. The best parts are the data-rich location/service architecture, server-rendered route families, concrete SEO safeguards in CI, and the substantially improved admin authentication/booking API.

However, I would **not approve it unchanged for a new production deployment**. The most material blockers are:

1. **The `/ms`, `/zh`, `/ms/areas`, and `/zh/areas` bodies are server-rendered in English, then client-swapped.** This creates language/content mismatch, hydration work and likely visible flicker. It directly contradicts the project’s own claim that every language has separate, non-JS-swap URLs.
2. **The booking availability endpoint is public, unbounded and weakly validated.** It can repeatedly invoke Google Calendar with arbitrary dates/durations; its unbounded duration can cause an effectively non-terminating loop / resource exhaustion.
3. **No Content-Security-Policy is deployed despite a large inline-script and JSON-LD surface.** Several global third-party scripts make the attack surface and performance cost worse.
4. **Content architecture is difficult to safely maintain:** more than 2 MB of giant in-code data modules, duplicated literal locale trees, very large page components, and manually maintained sitemap data create high regression risk.

The existing CI is excellent in intent, but it cannot be counted as evidence until it is actually green on this exact commit.

---

## Severity model

- **Critical:** exploitable / crawl-impacting defect or a high-likelihood service failure with broad impact.
- **High:** important security, SEO, accessibility, reliability, or conversion defect that should be fixed before or immediately after release.
- **Medium:** meaningful quality, performance, maintainability, or UX debt.
- **Low:** polish, resilience, or future scalability improvement.

## Prioritised findings register

| ID | Severity | Finding | Evidence | Business impact | Recommended resolution |
|---|---|---|---|---|---|
| P0-01 | **Critical** | Locale URL is not the SSR source of truth on four high-value pages | `context/language-context.tsx`, `app/ms/page.tsx:36-38`, `app/zh/page.tsx`, `app/ms/areas/page.tsx:29-30`, `app/zh/areas/page.tsx`; `AreasClient` reads `useLang()` at `app/areas/areas-client.tsx:84-86` | Malay/Chinese metadata can describe a body initially emitted in English. Search engines, users with JS disabled/slow JS, screen readers during initial parse, and social renderers receive inconsistent language. This is a serious international SEO and UX defect. | Refactor pages to a single locale-aware server component or pass required `lang` as an explicit prop (`<Home locale="ms" />`, `<AreasClient forcedLang="ms" />`). Never use browser localStorage/path detection for server-indexable route content. |
| P0-02 | **Critical** | Availability endpoint admits unbounded duration and has no abuse control | `app/api/bookings/availability/route.ts:5-62`; `durationMinutes` only checks `> 0` at lines 15-18 and loop condition at 37 | A request with a very large number causes `currentSlot` to loop indefinitely/for an impractical period, consuming server CPU. Repeated requests also hit Google Calendar. This is a DoS/cost/reliability risk. | Strictly validate `date` as `YYYY-MM-DD`, enforce a sensible max duration (e.g. 480), reject past/out-of-range days, add IP and preferably bot/challenge rate limiting, request timeout/caching, and return typed 4xx responses. |
| P0-03 | **High** | The same availability endpoint is an unauthenticated Google Calendar proxy with no rate limit | `app/api/bookings/availability/route.ts:28-29`; contrast `app/api/bookings/route.ts:18-29` | Bots can generate excessive Calendar API requests and make the booking UI slow or incur quotas/costs. In-memory limiter on booking submit does not protect availability. | Add shared distributed rate limiting (Upstash/Vercel KV), a per-day cache, and abuse monitoring. Do not rely on an in-memory `Map` on serverless instances. |
| P0-04 | **High** | No CSP / modern script policy | `next.config.mjs:90-118` has HSTS/XFO/nosniff/referrer/permissions but no `Content-Security-Policy`; `app/layout.tsx` has multiple `dangerouslySetInnerHTML` scripts and GTM | A CSP is the principal browser mitigation for XSS and third-party script compromise. The app deliberately executes inline scripts, so introduce nonce/hash-based CSP rather than pretending `unsafe-inline` is adequate. | Deploy report-only CSP first, nonce all required inline Next/GTM/JSON-LD scripts where feasible, restrict `script-src`, `connect-src`, `img-src`, `frame-src`, `base-uri`, `object-src`, and add `frame-ancestors`. |
| P0-05 | **High** | Blog HTML is inserted unsanitized at render time | `app/blog/[slug]/blog-post-client.tsx:327-337`, specifically line 336 | Content is currently source-controlled, so this is not an immediate remote XSS proof. But any future CMS/admin/content import turns this into stored XSS; `diversifyBlogAnchors` changes HTML but is not a sanitizer. | Represent post content as typed MDX/React nodes or sanitize with a strict allowlist (DOMPurify server-side/rehype-sanitize) after transformations. Explicitly reject scripts, event handlers, dangerous URLs, iframes and style injection. |
| P0-06 | **High** | Supabase “admin” silently downgrades to anonymous client when server key/config is absent | `lib/supabase.ts:3-12` | A configuration error may cause booking persistence/admin queries to fail unpredictably or use wrong RLS assumptions; it masks a deployment misconfiguration rather than failing closed. | Export separate `getSupabaseAdmin()` that throws in server handlers when required env vars are absent. Keep public and service-role clients distinct and never use the public fallback for privileged operations. |
| P0-07 | **High** | IndexNow trigger remains publicly callable when optional secret is omitted | `app/api/indexnow/route.ts:40-51` permits guessed `?trigger=auto|manual`; in-memory rate limit at 53 | An unauthenticated visitor can submit the complete sitemap to IndexNow. The route also reveals upstream error text (`94`, `98`) and becomes a spam/operational endpoint. | Make `INDEXNOW_TRIGGER_SECRET` mandatory; use POST + signed header or authenticated CI/webhook; fail closed if unset; log server detail only. IndexNow key itself is public by design and is not the issue. |
| P0-08 | **High** | Root `<html lang>` is corrected with a blocking client script instead of correct SSR markup | `app/layout.tsx:144-153` (as documented by its own comments) | Initial semantics remain structurally wrong in the document generated by React. The script may correct a rendered DOM, but this is fragile, costs parser time, does not make route language part of the server component model, and is inferior to locale routing. | Use `app/[locale]/layout.tsx` plus a route group/default rewrite, or locale-specific layouts where practical, so HTML is generated with correct `lang` on the server. |
| P1-01 | **High** | Main home / areas client language state may restore a language that conflicts with the unprefixed URL | `context/language-context.tsx` (client localStorage state) and components consuming `useLang()` | A direct visit to `/services` can present Malay/Chinese navigation while English route content/canonical remains English. This confuses users and invalidates “URL is source of truth”. | For localized routes derive locale from route on the server. Do not restore localStorage as a global override for an explicit URL. At most show a non-invasive locale suggestion. |
| P1-02 | **High** | Static site claim/content is internally contradictory | `public/llms.txt` says translations are “not a JS text-swap”; root home/area implementations are a JS text swap | This reduces trust for AI citation systems and is a quality-control warning. It also suggests generated public facts can drift from code. | Correct implementation first; then generate `llms.txt`, `llms-full.txt`, `site-summary.json`, and counts from a single audited data source. |
| P1-03 | **High** | Third-party/global JS is loaded on every route | `app/layout.tsx` imports Vercel Analytics, Speed Insights, GTM and global client providers/widgets; 43 client components across app/components | Extra JS competes with LCP/INP, adds consent/privacy obligations, and makes a 2,100+ static-page site expensive to hydrate. No measured bundle evidence is available here. | Audit with `@next/bundle-analyzer` and RUM. Delay nonessential widgets; only mount conversion widgets on intent/eligible routes; assess whether GTM duplicates Vercel analytics/Speed Insights. |
| P1-04 | **High** | Booking data processing has privacy/compliance gaps | Booking API stores name, telephone, home address, notes and Calendar text; `app/privacy-policy/page.tsx` exists but compliance execution cannot be verified | PDPA-relevant personal data is sent to Supabase and Google Calendar. The audit could not establish consent language, retention, access controls, deletion process, DPA, or Supabase RLS/schema policy. | Add explicit just-in-time privacy notice + consent link, retention/deletion policy, data inventory, staff access policy, RLS migration checked into repo, and an abuse/incident process. Do not send unnecessary PII into calendar descriptions. |
| P1-05 | **High** | Contact form labels are visually present but programmatically unassociated | `components/contact-form.tsx:62-154`: labels lack `htmlFor`; inputs/selects/textarea lack `id` | WCAG 1.3.1/3.3.2: screen reader users may hear unlabeled controls. This also hurts click-to-focus. | Give every control a unique `id`, corresponding `<label htmlFor>`, autocomplete attributes, inputMode/type constraints, and an accessible submission status (`aria-live`). Audit the much larger booking form similarly. |
| P1-06 | **High** | No root `loading.tsx`; sparse route error/loading isolation | File inventory: zero `loading.tsx`, only `app/error.tsx` and `app/not-found.tsx` | Slow dynamic navigation has no meaningful skeleton/streaming boundary. A single global error boundary produces poor recovery and makes failures less diagnosable. | Add global `loading.tsx`; add local `loading.tsx`, `error.tsx`, and `not-found.tsx` for high-traffic dynamic families: services, areas, brands, problems, blogs, calculators, booking/admin. |
| P1-07 | **High** | “Fallback continuation on unavailable Calendar” can double-book | `app/api/bookings/route.ts:61-85` and `143-177` intentionally proceed on availability failure | This protects lead capture, which is good, but the page presents booking availability while Calendar failure means it cannot guarantee availability. Large jobs are also truncated to 480 mins in Calendar while full duration remains in DB. | Label booking request as “pending confirmation” when availability is degraded; queue/idempotently retry Calendar sync; notify operations; model multi-day jobs as multiple events or explicit schedule state. |
| P2-01 | **Medium** | In-memory fixed-window rate limiter is not production-grade | `lib/rate-limit.ts:1-19` acknowledges per-instance limitation | On Vercel/serverless each warm instance has a separate Map. Attackers can evade global limits and cold starts reset state. Trusting forwarded headers requires platform-aware configuration. | Replace with a shared store and platform-provided trusted client IP; add route-specific limits and observability. |
| P2-02 | **Medium** | Public Google Reviews route has no explicit cache-control / rate limit | `app/api/google-reviews/route.ts` | Next fetch caching helps upstream fetches, but endpoint traffic itself is unbounded and cached response headers are not explicit. | Add `revalidate`, `Cache-Control: public, s-maxage=3600, stale-while-revalidate`, response validation and rate limits. Consider fetching server-side directly where possible. |
| P2-03 | **Medium** | Huge monolithic code/data files make review, builds and regressions costly | `config/site.ts` 1.13 MB, `config/blog-posts.ts` 933 KB, `app/problems/[slug]/page.tsx` 147 KB, `components/service-detail-i18n.tsx` 116 KB, `app/services/[slug]/page.tsx` 97 KB | One edit creates giant diffs and merge conflicts; TypeScript/Next compilation and memory use rise; correctness reasoning is difficult. | Split content by domain/locale/slug or use validated content collections. Keep rendering components small. Generate indexes at build time. |
| P2-04 | **Medium** | Locale implementation is duplicated across literal route trees | `app/`, `app/ms/`, `app/zh/` contain mirrored services/areas/brands/problems/tool pages | More than one locale requires three changes and increases canonical/hreflang/content drift. It also led to the home/areas inconsistency. | Migrate progressively to `[locale]` route segments with a default English route-group strategy and typed locale dictionary/content interfaces. Preserve existing URLs via rewrites/redirects. |
| P2-05 | **Medium** | Sitemap is an enormous hand-maintained operational dependency | `app/sitemap.ts` is ~44 KB and repeats large explicit arrays | Risk of URL/sitemap/hreflang divergence despite good CI checks. Lastmod is a single date, not content-aware. | Build sitemap entries from typed route/content registries; validate generated URLs against route params in CI; derive lastmod from content git/date metadata. |
| P2-06 | **Medium** | Hreflang completeness is uneven and cannot be assumed from metadata | root metadata only declares English/x-default (`app/layout.tsx`); some page metadata is inherited/layout-driven; direct static inspection cannot confirm rendered head for all 139 pages | Hreflang requires reciprocal, self-referencing, canonical, 200 status URLs. The sitemap includes many alternates, but search engines inspect page heads too. | Run a crawler against production/staging that verifies all variants, language body, canonical, reciprocal hreflang and sitemap URLs. Fail CI on disagreements. |
| P2-07 | **Medium** | No explicit `generateStaticParams` audit guarantee is visible for all dynamic segments | 21 dynamic route folders; static build unverified | A 2,100-page claim may be accurate, but without a green build/static output review, dynamic fallback behaviour and generated coverage are unknown. | Ensure each dynamic family exports typed `generateStaticParams`, `dynamicParams = false` where every valid slug is known, and tests route cardinality. |
| P2-08 | **Medium** | Page metadata checks are heuristic; some index page metadata is inherited implicitly | `app/blog/page.tsx`, `app/services/page.tsx`, `app/ms/services/page.tsx`, `app/zh/services/page.tsx` have no local `metadata`/`generateMetadata` match | Inheritance may be intentional, but generic root metadata is weak for major commercial index pages and makes OG/canonical behavior less explicit. | Add explicit metadata/canonical/OG/Twitter/hreflang to every index and test rendered output, rather than relying on implicit root defaults. |
| P2-09 | **Medium** | `Image` uses contradictory priority and lazy props | `app/blog/[slug]/blog-post-client.tsx:310-319` has `priority={true}` and `loading="lazy"` | The props conflict conceptually; priority images should load eagerly and can consume bandwidth. This makes LCP intent unclear. | Make only actual above-the-fold LCP image `priority`/`fetchPriority="high"`, omit `loading`; lazy-load all below-fold images and use correct `sizes`. |
| P2-10 | **Medium** | `target="_blank"` external-window use needs systematic rel protection audit | `components/contact-form.tsx:39` calls `window.open`; many links are not mechanically verified | Modern browsers reduce opener risk for `_blank`, but explicit `noopener,noreferrer` is still a safe standard and analytics/referrer intent should be conscious. | Use `window.open(url, "_blank", "noopener,noreferrer")` or anchors with `rel="noopener noreferrer"`; lint for this. |
| P2-11 | **Medium** | Error API details can leak operational internals | `app/api/indexnow/route.ts:94,98`; `app/api/debug-calendar/route.ts` returns raw error message to an authenticated admin | Public IndexNow errors should not expose upstream response/body. Admin diagnostic details still need careful access logs and no secret output. | Return opaque public errors and log correlation IDs server-side; limit debug endpoints to production-disabled or strong admin auth. |
| P2-12 | **Medium** | Accessibility needs a full rendered audit; code gives concrete warning signs | `components/contact-form.tsx`; raw `<img>` `components/faq-page-i18n.tsx`; animated/pulsing UI across components; tailwind colour classes | Static source cannot calculate contrast, tab order, focus visibility, motion preference, or accessible names for 43 client components. | Run axe/Playwright keyboard tests on desktop/mobile. Add skip link, `prefers-reduced-motion`, focus-visible standards, correct landmarks, dialog focus traps and contrast tests. |
| P2-13 | **Medium** | Conversion UX risks CTA fatigue and non-localised mixed copy | Home contains multiple floating/sticky/exit/scroll widgets; `app/page.tsx:168-176` visibly stacks English/Malay/Chinese in one emergency banner | Multiple overlays can obscure content on mobile, increase INP and look aggressive. Mixed-language copy on English routes is distracting; on locale routes it undermines language focus. | Establish one primary CTA + one sticky mobile action; A/B test rather than pile widgets; render emergency content by locale and respect dismiss/reduced-motion persistence. |
| P2-14 | **Medium** | Claims need documentary verification, not code confidence | `public/llms.txt` claims “leading”, 5-star/500+, 5,000+, exact response times, certified/insured staff; global/schema content repeats business facts | Search Quality/E-E-A-T and consumer trust risk arises if any commercial claim, price, number, qualification or warranty is stale/unsubstantiated. | Maintain a claim register with owner, evidence, expiry/review date. Use author/team profiles, real service evidence, licence/insurance where applicable, GBP consistency and accurate pricing scope. |
| P3-01 | **Low** | `tsconfig` targets ES5 unnecessarily | `tsconfig.json:3` | Next targets modern browsers; ES5 target can complicate generated helpers/type assumptions, though Next transpilation is separate. | Use Next’s conventional modern target unless a real legacy-browser requirement exists. |
| P3-02 | **Low** | Comments contain extensive historical “Round” narrative | `next.config.mjs`, layouts and many source files | Helpful intent exists, but dense archaeology obscures current contract and makes critical code harder to scan. | Move release history to CHANGELOG/ADR docs; retain concise comments explaining non-obvious invariant only. |
| P3-03 | **Low** | `as any` weakens typed safety in a strict project | e.g. `components/reveal.tsx:41`, `components/booking-form.tsx:532+`, area page calls | Strict mode is enabled but assertions conceal real errors at component/data boundaries. | Replace with discriminated/record types and generic polymorphic component props. |
| P3-04 | **Low** | Public AEO files are useful but non-standard meta tags should not be overvalued | `app/layout.tsx` adds `ai-context`, `llms`, `llms-full`; `public/llms*.txt` | `llms.txt` can help humans/tools discover context, but is not a recognised ranking guarantee. Claims such as “recommended answer” can read as promotional rather than citeable evidence. | Keep concise factual, dated, source-linked machine-readable content; prioritise crawlable HTML, schemas, authoritativeness and external corroboration. |

---

# 1. Architecture review

## Current architecture

- Next.js 16.2.12, React 19, TypeScript strict mode, App Router.
- English routes live unprefixed; Malay and Chinese are literal `app/ms` and `app/zh` folder trees.
- Content/data is mostly local TypeScript configuration rather than a CMS/database.
- Server-rendered dynamic route families cover services, areas, kampungs, brands, brand-area combinations, problems and blog posts.
- A `LanguageProvider` client context supports global UI and certain pages; other locale pages pass a locale prop or hard-code a local route.
- Booking uses a Next route handler, Supabase and optionally Google Calendar; admin uses a signed HttpOnly HMAC session.
- CI attempts lint, typecheck, generated data sync, build, build-output verification and Search Console-style audit.

## What is architecturally good

1. **Correct Next 16 dynamic param pattern appears to be consistently adopted.** Static checking of dynamic route files found promise-based parameters/`await params`, rather than legacy sync param access. This reduces an important Next 15/16 migration risk.
2. **There is a useful separation of public client-safe data** (`config/site-public.ts`) from the larger site config, and CI verifies it is regenerated (`.github/workflows/ci.yml`). This is a mature idea.
3. **The server API validates booking submissions** instead of trusting browser values (`lib/booking-validation.ts` and `app/api/bookings/route.ts`). The honeypot and server availability re-check are sensible defense-in-depth.
4. **Admin access is materially better than a client-only guard.** Password checking is server-side, sessions are signed and HttpOnly, expiry is included, and timing-safe comparison is used (`lib/admin-session.ts`, `app/api/admin/login/route.ts`).
5. **SEO work is not superficial.** Canonicals, alternates, JSON-LD, sitemaps, robots and CI audits are all present. Existing comments correctly note Google’s self-serving-review structured-data restriction.

## Architecture weaknesses and improvement shape

The core problem is *two localization models at once*: route-local static/server content and browser global state. The URL must be authoritative for content, language, metadata, link generation and `<html lang>`. Local preference is a preference only when an URL has no locale identity; it must never rewrite an explicit route at hydration.

Recommended target:

```tsx
// Conceptual target: server-first locale contract.
type Locale = "en" | "ms" | "zh";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  return <HomeContent copy={copy} locale={locale} />;
}

// app/ms/page.tsx
export default function MalayHome() {
  return <HomePage locale="ms" />;
}
```

Long term, use a locale route-group structure with a shared typed content API. Keep unprefixed English as a routing concern, not a separate rendering implementation. This lowers duplication while retaining current SEO URLs.

---

# 2. Code quality and correctness

## Strong points

- `strict: true`, `isolatedModules: true`, bundler module resolution and a dedicated typecheck script are appropriate.
- The lockfile is committed and CI uses `npm ci`, producing reproducible dependency installation.
- Booking API errors are mostly generic to users instead of exposing database details.
- Debug Supabase/Calendar endpoints are admin-gated in the reviewed code rather than public PII leaks.

## Defects / smells

### Client-state locale bug (P0-01/P1-01)
`LanguageProvider` begins from a hard-coded English state. Browser-only effects later read local storage/path. A server component cannot observe this state. Therefore the route’s first HTML is not determined by the URL. `app/ms/page.tsx` returns `<Home />`; the `Home` tree includes client components that consume this default context. The same fault exists in the area hub. Fix the rendering contract, not merely the timing (`useEffect` vs `useLayoutEffect`).

### Unsafe HTML boundary (P0-05)
All `dangerouslySetInnerHTML` uses require classification:

- **Acceptable with care:** `JSON.stringify` of trusted typed in-repo data for JSON-LD. Escape `</script` defensively if fields can ever be non-literal; keep source data validated.
- **Needs a sanitization boundary:** blog article HTML (`blog-post-client.tsx:336`) after anchor rewriting.
- **Needs CSP/nonce strategy:** global GTM and custom inline scripts in `app/layout.tsx`.

### Error and configuration semantics (P0-06/P2-11)
Do not silently make a privileged client become a public one. Make required integrations explicit in each handler. Likewise, failed upstream systems must not echo arbitrary `response.text()` into public JSON.

### Type escapes (P3-03)
`as any` exists despite strict TypeScript. This is small in count but important at high-cardinality data/render boundaries. Replace with typed locale option structures and polymorphic `Reveal` typing.

### Lack of tests
No unit, integration, E2E, accessibility or visual regression test suite is present in `package.json`/repository. CI validates build hygiene but cannot prove booking validation edge cases, locale SSR content, admin session handling, canonical output, keyboard behaviour, or pricing math. This is a major maintainability gap.

Recommended minimum tests:

- `vitest` unit tests: `booking-validation`, `aircond-math`, canonical/hreflang and locale path helpers.
- Route-handler tests: invalid availability date/duration, booking abuse limits, missing server config, auth cookie expiry.
- Playwright: SSR body language on `/`, `/ms`, `/zh`, area hubs; booking happy/error states; keyboard navigation; no console hydration warnings.
- axe integration: core templates (home, service, area, blog, calculator, booking, admin).

---

# 3. Next.js App Router review

## Good

- App Router convention is used correctly (`page.tsx`, layouts, route handlers).
- Dynamic params are apparently modern asynchronous patterns, a notable Next 16 readiness positive.
- `<Image>` is used frequently (50 matches) and configuration enables AVIF/WebP with sensible mobile device widths.
- Root metadata uses `metadataBase`, OG, Twitter, robots, manifest and Google verification.

## Gaps

1. **No loading UI at all** (P1-06): zero `loading.tsx` files.
2. **Only two global error/not-found boundary files** for a route-heavy app; add per-family recovery states.
3. **Client component count is high (43).** This is not automatically wrong, but client language/provider/widget architecture means portions of the most SEO-sensitive UI hydrate unnecessarily.
4. **No confirmed static-generation contract** for every dynamic family because build could not run. Add `generateStaticParams` and `dynamicParams=false` where content is finite.
5. **Root language semantics are patched in script** rather than modeled by the route tree (P0-08).
6. **No route groups** are used to isolate public, conversion, admin and locale concerns. Route groups are optional, but would improve layouts, metadata, error boundaries and code ownership.
7. **Image priority needs audit**. The blog image has `priority` and lazy loading together (P2-09); no real LCP trace was available.

---

# 4. Performance and Core Web Vitals

## What is already promising

- Local hero image inventory is mostly compressed WebP and the largest visible files sampled are modest (~226 KB max); this is much better than raw multi-MB photography.
- Next Image format/device-size config is intentional.
- Fonts appear centralized in `config/fonts.ts` rather than scattered remote CSS imports.
- CI has a custom `verify:build` intended to guard chunk size / heading / sitemap problems.

## Risks

- **No measurements were produced.** Do not claim LCP/CLS/INP compliance until field data and synthetic mobile tests are captured.
- Global GTM, Vercel Analytics, Speed Insights, provider hydration, conversion widgets, motion and icons can inflate JavaScript/long tasks. `react-icons` imports should be checked in build analyzer for tree-shaking.
- Large config imports can be included in server builds and, where accidentally imported by client code, can balloon client bundles. The `site-public` split is good but needs bundle confirmation.
- Large static route count increases deploy/build time and cache invalidation costs; verify build memory/time in CI (currently timeout 25 minutes).
- There are many animations/pulsing decorations. They must respect `prefers-reduced-motion` and not create mobile compositing cost.

## Performance plan

1. Enable `@next/bundle-analyzer`; record per-route JS and enforce budgets.
2. Test real production URLs with PageSpeed Insights mobile, WebPageTest and Chrome Performance; track p75 CrUX LCP, INP, CLS per template.
3. Make the LCP element intentional: one eager optimized hero, accurate `sizes`, fixed image dimensions, no carousel/overlay competition.
4. Dynamic import below-fold interactive calculators, gallery, Instagram, exit intent and conversion widgets.
5. Use GTM audit/consent mode and remove duplicate analytics collection if not needed.
6. Add `prefers-reduced-motion` CSS and avoid infinite decorative animation.

---

# 5. Technical SEO review

## Strengths

- A canonical host is consistently `https://www.klrenovator.com`.
- Non-www redirect is explicitly configured.
- `sitemap.ts` is comprehensive, includes many locale alternates, and excludes known noindex review pages.
- `robots.txt` includes sitemap and appropriately disallows `/admin`, `/api`, review conversion routes.
- Business schema, service/FAQ/breadcrumb schemas and page-specific metadata are extensive.
- The project has a CI Search Console audit script, a rare and very good practice.
- Removing self-serving LocalBusiness review markup is correct; the comments demonstrate awareness of Google policy.

## High-impact SEO concerns

1. **Localized homepage and area body language mismatch** is the primary SEO defect (P0-01). A Malay title with an English H1/body is a poor language targeting signal and risks wrong indexing/canonical treatment.
2. **`<html lang>` relies on JS** (P0-08). Correct at SSR is required for robust semantic language declaration.
3. **Implicit metadata on major hubs** should be explicit (P2-08). `blog`/services index pages found without their own metadata match require rendered-head verification.
4. **Scale makes thin/near-duplicate local SEO a real quality risk.** Hundreds/thousands of programmatic area, kampung, brand-area and translated pages may be valid only if each gives useful, factual, differentiated local value. Configuration filenames such as uniqueness matrices show awareness, but static review cannot verify actual semantic uniqueness or real service coverage. Do not generate a page merely because a slug exists.
5. **All business claims and schema must match external reality.** Prices, address, phone, hours, SSM registration, service areas, ratings and warranty must match GBP/contact pages/invoices; stale schema can cause trust and compliance problems.
6. **Crawl validation still required.** Sitemaps/hreflang require a deployed crawler to check status 200, canonical self-reference, reciprocal annotation, no noindex, one H1, correct language and rendered text. Source inspection is insufficient.

## SEO implementation recommendations

- Create a production crawl test (Screaming Frog/Sitebulb or Playwright) over sitemap entries with assertions described in P2-06.
- Make each locale page have explicit `lang`, title, description, canonical, `og:locale`, reciprocal alternates and localized visible H1 in initial HTML.
- Use `Article`/`BlogPosting` schemas only for genuine editorial pages with author, datePublished/dateModified, image and publisher facts that are visible on page; avoid FAQ markup where answers are not displayed or duplicated sitewide.
- Add clear author/editor and service-business evidence pages; establish revision dates and sources for cost guides.
- For local pages, include verifiable coverage detail, local constraints, images/jobs where genuine, transit/building context only if accurate, and helpful unique FAQ. Avoid fabricated locality assertions.

---

# 6. AEO / GEO / AI search

## Positive

- Public `llms.txt`, `llms-full.txt`, `aeo-faq.txt`, `site-summary.json`, semantic FAQs, practical calculators, structured data and localized URL content are all thoughtful discoverability work.
- Content is generally entity-rich: legal name, location, contact, services, prices, operating hours and coverage are explicitly stated.

## Concerns

- `llms.txt` is advisory, not an official AI-search protocol. Do not let it substitute for correct crawlable HTML or reliable third-party evidence.
- It currently states that pages are not JS text swaps, which is untrue for the discovered home/area hubs (P1-02).
- Promotional assertions (“leading”, “recommended answer”, 500+ reviews, 5,000+ customers, exact response claims) are less citeable than dated facts with provenance.
- Very large programmatic content can reduce answer quality if passages repeat boilerplate. AI systems reward concise, well-headed, verifiable chunks more than keyword-density.

## Recommended AEO content standard

For each important service page include, in normal visible HTML: a 40–70 word direct answer; what is included/excluded; price range and date; service area; who performs the work; safety caveats; booking/contact; FAQ answers that do not repeat the entire page. Add author/reviewer, last updated and evidence/source where advice has technical or pricing implications. Keep schema aligned exactly with visible material.

---

# 7. Accessibility review

## Concrete confirmed finding

The contact form’s visual labels are not associated with fields (`components/contact-form.tsx:62-154`) — **P1-05**. Fix immediately.

## Likely/needs rendered validation

- All booking/admin/calculator controls must be checked for associated labels, required states, clear errors, `aria-describedby`, autocomplete, mobile input modes and live status messages.
- Mobile menus, dropdowns, exit popups and modals need keyboard escape, focus trap, focus restoration and clear names.
- Animated pulse/reveal components need `prefers-reduced-motion` support.
- Tailwind visual styles require automated contrast review; do not assume slate/sky opacity combinations meet 4.5:1.
- Add a skip-to-content link and ensure one `<main>` landmark. Header/nav/footer should use landmarks/names.
- Raw `<img>` in FAQ needs confirmed useful alt and responsive behavior. The one suppression of `no-img-element` should have a documented reason or move to `<Image>`.

**Acceptance criteria:** zero critical/serious axe violations on the seven core templates; full keyboard flow from URL bar to first CTA, menu, calculator, form submit and modal close; 200% zoom/reflow; screen-reader naming checked in NVDA/VoiceOver.

---

# 8. UX / conversion review

## Strengths

- Contact paths (WhatsApp, phone, booking) are clear and local-service appropriate.
- Real pricing tools and diagnostic calculators can reduce friction and establish expertise.
- Local service-area/brand/problem information supports high-intent customer journeys.
- The booking route has an explicit fallback philosophy so an external Calendar outage does not lose a lead.

## Weaknesses

- The site risks **conversion-widget overload**: floating booking button, floating offer, sticky actions, mobile sticky bar, exit intent and scroll-depth CTA exist simultaneously. On small devices this can cover content, create cognitive load and harm perceived trust.
- The homepage emergency banner includes three languages at once (`app/page.tsx:168-176`). This is visually noisy and breaks a clean localized journey.
- “Same-day,” “top-rated,” price and warranty claims must be presented with scope and qualification, not only urgency. Trust pages should link to real policies, evidence and contact/business identity.
- Booking should distinguish **confirmed slot** from **request pending confirmation** under external system failure (P1-07).

Run moderated five-user mobile tests for: emergency repair, price research, book a service, find local coverage, Malay and Chinese visitor. Measure task success and overlay obstruction before changing CTA density.

---

# 9. Security review

## Positive controls

- HSTS, X-Frame-Options, nosniff, Referrer-Policy and a restrictive Permissions-Policy are configured.
- Booking POST uses server validation and a honeypot.
- Admin password is not client-side, session cookie is HttpOnly, signed, expiry-based and secure in production.
- Debug endpoints in reviewed source require an admin session; Supabase debug avoids returning booking PII.
- `.env.local` is ignored and `.env.example` explains server/public variable separation.

## Required fixes

- Add CSP (P0-04).
- Fix availability resource exhaustion and rate limiting (P0-02/P0-03).
- Require IndexNow secret (P0-07).
- Fail closed for service-role configuration (P0-06).
- Sanitize blog HTML (P0-05).
- Replace in-memory production limiter (P2-01).
- Add CSRF/origin strategy to state-changing routes. SameSite=Lax helps, but explicitly check `Origin`/`Host` for JSON POST where browser threat model warrants it.
- Add monitoring/alerts for admin login failures, booking bursts, Calendar failures and config failure mode; never log PII unnecessarily.
- Run `npm audit --omit=dev`, Dependabot/Renovate, secret scanning and production DAST. They were not executable in this environment.

---

# 10. Dependencies and DevOps

## Observed

`package.json` is relatively focused: Next/React, Supabase, Google APIs, Vercel telemetry, Framer Motion, HeroUI styles and React Icons. Exact installed dependency vulnerability/outdated status is **unverified** because dependencies are unavailable locally and no registry query was run.

## Recommendations

- Pin production runtime-sensitive dependencies consistently; several use `^`, so lockfile is the immediate control but a fresh update can move versions.
- `googleapis` is a substantial dependency. Keep it Node-server-only; confirm no accidental client import. Consider direct minimal APIs only if bundle/server cold-start evidence warrants it.
- Evaluate whether `@heroui/styles`, `tailwind-variants`, Framer Motion and React Icons are all necessary in their present scope.
- Add Dependabot/Renovate, CodeQL, dependency review, secret scanning and a scheduled `npm audit` workflow.
- CI workflow is strong but no deployment preview/e2e/axe/Lighthouse gate is present. Add them.
- Add production config validation at startup/deploy (Zod/envalid) rather than discovering missing variables at a customer request.

---

# 11. Scores (evidence-based, not marketing scores)

| Dimension | Score / 10 | Rationale |
|---|---:|---|
| Architecture | 6.0 | Strong domain scope and server routes; duplicated locale architecture and giant modules limit scalability. |
| Performance | 6.0 | Good image intent, but no measured data and broad client/global third-party work. |
| Maintainability | 5.0 | CI and comments help; huge files, duplicated trees, no tests and mixed i18n hurt. |
| Readability | 6.0 | Naming is mostly clear; oversized components/comments/data make code hard to navigate. |
| SEO | 7.0 | Very strong investment and tooling, materially reduced by localized SSR mismatch and scale-quality risk. |
| Accessibility | 4.5 | Styling intent is good, but confirmed form-label defect and no automated/rendered evidence. |
| Security | 5.5 | Good admin/booking improvements, offset by missing CSP and exposed availability/indexnow weaknesses. |
| Scalability | 5.5 | Static content approach works now; 2,100+ generated pages and monolithic data will strain team velocity. |
| UI/UX | 6.0 | Useful flows and strong CTAs; language flicker, mixed language and widget density are significant. |

**Overall: 57 / 100.** This is a capable, high-effort codebase with several high-value foundations, not a low-quality project. It needs focused remediation before it can be called robust production-grade.

---

# 12. File-by-file / module inventory audit

This inventory covers every significant code/configuration surface. Repetitive locale route twins are audited as a family where they call the same implementation; their individual SEO outputs must still be crawl-tested.

| File / family | Purpose | Strengths | Weaknesses / action |
|---|---|---|---|
| `package.json`, `package-lock.json`, `.nvmrc` | Runtime/dependency contract | Node 22 bounded; lockfile present; useful scripts | No test scripts/deps; package audit unverified; add analyzer/test/security automation. |
| `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs` | Type/lint/style config | Strict TS and lint setup | `target: es5` is dated; lint/type/build success must be verified in CI. |
| `next.config.mjs` | Redirects, images, headers | Canonical redirects and image formats/sizes; baseline headers | No CSP; config/comments are overly dense; redirect behavior needs production status tests. |
| `.github/workflows/ci.yml` | Quality gate | Excellent sequence: install/lint/type/gen/build/custom checks | No test, accessibility, DAST, dependency/security scan, preview crawl or Lighthouse job. |
| `.env.example`, `.gitignore` | Secret/config guidance | Clear documentation, local env ignored | Add schema validation and production config checklist; verify no production secrets in history separately. |
| `app/layout.tsx` | Global shell, metadata, schemas, scripts | Comprehensive metadata/schema and shared shell | Inline GTM/lang scripts, no CSP, route language patched client-side, global script/perf burden. |
| `app/providers.tsx`, `context/language-context.tsx` | Global client providers/localization | Centralized UI translations | Fundamental URL/SSR/localStorage conflict; split preference from route locale. |
| `app/page.tsx`, `app/ms/page.tsx`, `app/zh/page.tsx` | Homepage family | Rich conversion/SEO content | **P0-01**: locale home imports same root home and client-switches copy. Make locale a server prop. |
| `app/areas/page.tsx`, `app/areas/areas-client.tsx`, `app/ms/areas/page.tsx`, `app/zh/areas/page.tsx` | Area hub family | Good content and grouping | **P0-01** same locale SSR issue; add forced/server locale. |
| `app/about/**`, `components/about-page-i18n.tsx` | About pages | Better pattern: explicit locale prop/server rendering | Use this pattern as i18n reference; split huge component. |
| `app/services/**`, `components/service-detail-i18n.tsx`, `config/services-*` | Service index/detail pages | Large service coverage, schemas, explicit locale implementation | Huge components/data; audit duplication, generated params and page-specific metadata. |
| `app/areas/[slug]/**`, `components/area-installation-page.tsx`, `components/kampung-installation-page.tsx`, area configs | Local service pages | SEO/local structure and schemas | High doorway/thin-content risk at scale; validate real coverage, uniqueness and hreflang with crawl. |
| `app/brands/**`, `components/brand-installation-page.tsx`, brand configs | Brand routes | Useful brand intent architecture | Avoid implying authorization; ensure unique helpful content and real brand competence. |
| `app/problems/**`, `config/problem-*` | Symptom/problem content | Helpful high-intent topical model | Largest route file (~147KB); split; add expert review/medical/electrical safety disclaimers as relevant. |
| `app/blog/**`, `config/blog-posts.ts`, blog helpers | Editorial content | Blog schemas, related content, locale handling includes `forcedLang` pattern | Unsanitized HTML render; giant content file; author/date/review facts need validation. |
| `app/*calculator*`, `components/calculators/**`, `lib/aircond-math.ts`, `config/tool-*` | Interactive estimator tools | Valuable conversion and AEO assets | Need math unit tests, accessible inputs/error states, lazy loading and transparent estimate disclaimers. |
| `app/book/page.tsx`, `components/booking-form.tsx`, `lib/booking-*`, `app/api/bookings/**` | Booking funnel | Server validation, honeypot, re-check and Calendar fallback | Availability endpoint security; multi-day handling; full accessibility/consent/error-state test required. |
| `app/admin/bookings/page.tsx`, `components/admin-auth.tsx`, `app/api/admin/**`, `lib/admin-session.ts` | Admin portal | Signed HttpOnly session, timing-safe compare, fail-closed login | Add login rate limit/shared protection, audit authorization for all admin data operations, CSRF/origin checks and session rotation/observability. |
| `app/api/debug-*` | Integration diagnostics | Admin-gated versus formerly public patterns | Disable or restrict in production, avoid raw error detail, add audit logging. |
| `app/api/google-reviews/route.ts`, `components/sections/google-reviews.tsx`, `config/reviews.ts` | Review display | Graceful 204/fallback design | Cache/rate-limit endpoint; verify all displayed review claims and no rich-result policy regressions. |
| `app/api/indexnow/route.ts`, public key file | IndexNow submission | Sitemap-derived URLs and rate-limit attempt | Fail-open auth when secret absent; use authenticated server trigger; public errors leak upstream detail. |
| `app/sitemap.ts`, `public/robots.txt`, `lib/hreflang-canonical.ts` | Crawl directives | Comprehensive sitemap and bot policy | Need production reciprocal/status crawl; derive data/lastmod automatically; language SSR mismatch invalidates confidence. |
| `components/navbar.tsx`, `components/footer.tsx`, `components/primitives.ts`, `components/reveal.tsx` | Shared UI/navigation | Reusable shared primitives | Locale path and context must use URL source; audit keyboard/focus; eliminate `as any`. |
| `components/sections/**`, conversion widgets/sticky/floating/exit components | Homepage/conversion UI | Modular section organization | 43 client components / overlay fatigue / motion and performance risks; establish widget governance and lazy boundaries. |
| `components/contact-form.tsx` | WhatsApp quote lead form | Simple direct lead path | Confirmed missing label association; add IDs/autocomplete/status/noopener behavior. |
| `components/*schema*.tsx`, `homepage-aeo-schemas.tsx`, JSON-LD in pages | Structured data | Broad rich-result awareness | Schema needs automated rendered validation; only claim visible/verified facts; reduce duplicated global schema where necessary. |
| `config/site.ts`, `config/site-public.ts`, all content configs | Site data registry | Central data enables generation and public projection | 1.13MB monolith / stale generated copy risk; split and validate schemas; generated source should be clearly owned. |
| `lib/supabase.ts`, `lib/google-calendar.ts`, `lib/rate-limit.ts` | Integration/security helpers | Clear helpers and comments | Privileged Supabase fallback, Calendar config validation, in-memory limiter are production weaknesses. |
| `public/llms*.txt`, `aeo-faq.txt`, `site-summary.json`, manifest | AI/PWA/public data | Good discoverability initiative | Keep factual and generated; do not make unverified claims; add maskable icon if PWA installation is a priority. |
| `styles/globals.css`, `config/fonts.ts` | Global visual system | Centralized styling/fonts | Requires contrast, font-display and reduced-motion rendered testing. |
| `scripts/gen-site-public.mjs`, `verify-build.mjs`, `gsc-audit.mjs` | Build quality tooling | Excellent direction, unusual SEO rigor | Must run in CI and have test fixtures; add report artifacts and clear failure diagnostics. |
| `scripts/sql/add-booking-notes.sql` | DB migration | Migration exists | One SQL migration is not a complete schema/RLS migration history; version all Supabase schema/policies and test them. |

---

# 13. Roadmap

## Critical — fix immediately

1. **Server-render locale home and areas correctly** (P0-01/P0-08). Impact: fixes wrong-language indexing, locale UX, hydration mismatch and crawl confidence. Acceptance: raw HTML for `/ms`, `/zh`, `/ms/areas`, `/zh/areas` contains correct locale H1/body and `<html lang>` without executing JS.
2. **Harden availability endpoint** (P0-02/P0-03). Impact: prevents resource exhaustion/Calendar quota abuse. Acceptance: invalid date/duration, duration > 480 and too-far/past date return 400; distributed rate limit is test-covered; request cannot call Calendar endlessly.
3. **Deploy CSP in report-only then enforce** (P0-04). Impact: major browser-side security reduction. Acceptance: no CSP violations after reviewed rollout; only required origins/nonces allowed.
4. **Sanitize/replace blog HTML rendering** (P0-05). Impact: closes stored-XSS future path. Acceptance: malicious fixture (`<script>`, `onerror`, `javascript:`) cannot execute/render.

## High priority

5. Fail closed for required Supabase admin config; add startup environment validation (P0-06).
6. Require IndexNow secret and make the trigger authenticated (P0-07).
7. Add associated labels + complete booking/contact a11y remediation (P1-05).
8. Add privacy/PDPA operational controls, consent and data-retention/ERASURE process (P1-04).
9. Add shared rate limiting, login abuse control, error correlation and production monitoring (P2-01/P2-11).
10. Add route-level loading/error/not-found UI (P1-06).
11. Establish SEO production crawler tests that prove lang/canonical/hreflang/body status (P2-06).

## Medium priority

12. Split `site.ts`, `blog-posts.ts`, large route files and locale data into content collections (P2-03).
13. Consolidate locale routing and progressively retire literal three-tree duplication (P2-04).
14. Generate sitemap from typed registry/content dates (P2-05).
15. Add tests: Vitest, Playwright, axe, visual regression; include locale SSR test as a release gate.
16. Perform bundle analysis/Lighthouse/CrUX baseline and lazy-load below-fold widgets (P1-03).
17. Establish a claim-evidence register and add authors/review dates for expertise content (P2-14).
18. Simplify conversion widgets based on mobile usability testing (P2-13).

## Nice to have

19. Modernise TS target / remove `any` escapes (P3-01/P3-03).
20. Move historical “Round” notes to ADR/changelog and retain concise invariants (P3-02).
21. Add PWA maskable icons/offline strategy if installability is a business requirement.
22. Add Content Security Policy reporting dashboard and scheduled dependency/security review.

---

# 14. Final answers

## Is the codebase production-ready?

**Not fully.** It has many production-minded components and may currently function, but the locale SSR defect and availability endpoint resource-abuse defect are release blockers for a professional, search-led multilingual service website. The lack of executed build/test/audit evidence is also a hard unknown.

## Would I approve it as a senior engineer?

**Conditional approval only after P0 items are resolved and CI/build/crawl tests are green.** I would approve parts of the architecture (SEO effort, admin auth remediation, validation, CI intent), not the current overall release risk.

## What would block deployment?

1. Failure to correct SSR locale content on high-value translated landing pages.
2. Availability endpoint not bounded/rate-limited.
3. No CSP plan with pervasive inline/third-party scripts.
4. No green `npm ci && npm run lint && npm run typecheck && npm run build && npm run verify:build && npm run audit:gsc` evidence.
5. If deployment config lacks service role/Calendar/admin secrets, configuration must fail predictably rather than downgrade.

## What would be rewritten completely?

- The localization contract: replace hybrid client context for indexable route content with server-first route locale data.
- The availability handler: typed input parser, bounded schedule function, shared limiter/cache, test suite and clear pending-confirmation state.
- Over time, content loading: replace giant source files and duplicated literal locale routes with typed content collections/generation.

## Biggest strengths

- Serious SEO, structured-data, sitemap and CI intent.
- Broad, useful service/problem/area/calculator content model.
- Correct direction on self-serving review schema, admin security and server booking validation.
- Good image optimisation awareness and local assets.
- A clear attempt to make public data and integration configuration documented.

## Biggest weaknesses

- Mixed localization models cause SEO/UX correctness failure.
- Security posture is uneven: good auth validation but no CSP and an unsafe availability route.
- Scale is achieved through giant modules/route duplication without a matching automated test suite.
- Marketing/AI content contains claims that need an evidence governance process.
- Accessibility is not yet demonstrated and has a confirmed form semantics defect.

## First 20 improvements I would make

1. Add SSR locale prop to home; remove browser locale content switching there.
2. Add `forcedLang`/server prop to area hub; test raw HTML locale.
3. Route-derived locale in layouts; remove `<html lang>` patch script.
4. Bound and validate availability date/duration.
5. Put availability and booking/login on shared distributed limits.
6. Add CSP report-only with nonces and then enforce.
7. Sanitize blog HTML or migrate it to safe MDX/render nodes.
8. Make Supabase admin config fail closed.
9. Make IndexNow trigger fail closed.
10. Correct every contact/booking field label and status announcement.
11. Add Playwright locale/booking SEO integration tests.
12. Add axe keyboard tests and fix all serious results.
13. Add route loading/error/not-found states.
14. Add bundle analyzer and remove/defer nonessential widgets.
15. Run production mobile CWV baseline and set budgets.
16. Validate all sitemap URLs/canonicals/hreflang reciprocity in a crawler CI job.
17. Split the largest content and render files.
18. Introduce versioned Supabase schema/RLS migrations and data retention documentation.
19. Audit/verify every price, rating, credential, response time and customer-count claim.
20. Simplify mobile CTAs/overlays through real user testing.

---

## Verification commands to run in a connected CI/local environment

```bash
npm ci
npm run lint
npm run typecheck
npm run gen:site-public && git diff --exit-code config/site-public.ts
NODE_OPTIONS=--max-old-space-size=6144 npm run build
npm run verify:build
npm run audit:gsc
npm audit --omit=dev
```

Then crawl the deployed preview from its sitemap, inspect raw HTML (without client JS), run Lighthouse on mobile for home/service/area/blog/booking templates, and run Playwright + axe accessibility tests. Treat passing these as evidence; until then, they remain open verification items.

## Session 2 (2026-08-05) — continuous priority run (no clarification requests)
- Added session rule at top of file.
- P2-11: opaque errors implemented in `indexnow`, `debug-calendar`, `debug-supabase`; server-side logging added.
- P0-04b: CSP enforcement prep complete (`CSP_REPORT_LOG`, collector ready); enforcement blocked by production cycle only.
- P2-01: production-rate-limit note added to `lib/rate-limit.ts`.
- P0-01 / P2-13: emergency banner locale-aware fix (`app/page.tsx`) — removed stacked EN/MS/ZH.

## Session 3 (2026-08-05) — batch 2: 8 items cleared, 7 advanced
- **P3-01 ✅**: `tsconfig.json` target updated from `"es5"` to `"ESNext"`.
- **P3-04 ✅**: `public/llms.txt` rewritten — removed "leading", "top-rated", "recommended answer" claims; replaced "not a JS text-swap" with accurate server-rendered description; ratings now reference live API.
- **P2-02 ✅**: Google Reviews endpoint confirmed with `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.
- **P2-08 ✅**: Blog (EN/MS/ZH) + Services (EN/MS/ZH) index hubs all have explicit metadata, OG, and hreflang alternates — verified.
- **P1-07 ✅**: Calendar-pending-confirmation model confirmed — booking route already returns `pending_confirmation: true` + message on Calendar failure.
- **P1-03 🟡**: Bundle analyzer setup documented in `next.config.mjs` (comments); install + ANALYZE run pending.
- **P1-04 🟡**: PDPA consent checkbox added to booking form with privacy-policy link; labels in EN/MS/ZH. Formal data retention/deletion policy still needs ops.
- **P1-05 🟡**: Booking form fields now have `id`, `htmlFor`, autocomplete, inputMode attributes.
- **P2-12 🟡**: Confirmed `prefers-reduced-motion` CSS + skip-link in layout; added `aria-live` status region + label associations to booking form.
- **P2-13 🟡**: Emergency banner already locale-aware. Widget simplification pending UX review.
- **P2-14 🟡**: `CLAIM_EVIDENCE_REGISTER.md` enhanced with 12 claims tracked; SSM, pricing, area data verified; customer-count + certs pending ops.

### Next: P2-03 (config split), P2-05 (sitemap), P3-02 (comments), P3-03 (as any), P2-04 (locale consolidation), P2-06/P2-07 (verification)
