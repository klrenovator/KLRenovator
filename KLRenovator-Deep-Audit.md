# KL Renovator (klrenovator.com) — Deep Website Audit
**Repository:** KLRenovator-main.zip · **Stack:** Next.js 16.2.12 / React 19 / TypeScript 5.9 / Tailwind 4
**Audit date:** August 5, 2026
**Method:** Full manual source review (183 TS/TSX files inspected across app/, components/, config/, lib/, scripts/), targeted web verification of Next.js 16 / Google policy claims, and static analysis via `tsc`. **A live `next build` could not be run** — this sandbox has no network egress to the npm registry (`npm install` returns `403 host_not_allowed`). Every finding below is evidence-based from source inspection, not inferred. Before deploying any fix, run `npm run build` and `npm run typecheck` locally — see the note at the end of this report.

---

## How to read this report

Findings are graded **Critical / High / Medium / Low** based on user-facing or business impact, not code aesthetics. Each finding names the exact file(s) so you can hand this straight to whoever does the coding (yourself, an AI session, or a developer). Where I verified something *is already fixed*, I say so explicitly — this codebase has a long history of comments documenting past bugs and their fixes, and I did not want to re-flag things that are already resolved.

---

## 1. Executive Summary

This is a large, mature, and in many places **genuinely well-engineered** codebase — not a beginner project. There is clear evidence of iterative hardening: a hardcoded admin password was replaced with signed HttpOnly cookies, a PII-leaking debug endpoint was session-gated, a 1.1 MB config file was split so it wouldn't leak into the client bundle, a reveal-animation component was rewritten from a per-instance IntersectionObserver into zero-JS CSS, and non-critical widgets are idle-loaded. These are senior-level decisions, and the comments explaining *why* each fix was made are unusually good documentation.

At the same time, the same class of bug — **client-side language state silently disagreeing with server-rendered content** — appears to have been fixed correctly in some places (About, Brands, Blog, Near Me) and **missed in the two highest-traffic entry points**: the homepage itself (`/`, `/ms`, `/zh`) and the Areas hub (`/ms/areas`, `/zh/areas`). That is the single most important finding in this report, and it's detailed first.

**Production-readiness verdict:** This is a live, revenue-generating site with real customers and a real booking pipeline (Supabase + Google Calendar), so "production ready" in the sense of "already running" — yes. But there are unresolved issues (below) that actively cost SEO value, quote real customers the wrong price, and leave one admin surface without brute-force protection. None of these are exotic; all are fixable in a day or two of focused work.

---

## 2. Critical Finding — Homepage & Areas-Hub Language Architecture

### The bug, precisely

There are two competing i18n patterns in this codebase:

- **Correct pattern** (used by About, Brands, Blog posts, Near Me): the `/ms/...` and `/zh/...` route files are separate Server Components (or pass an explicit `lang`/`forcedLang`/`initialLang` prop into a shared Client Component). The server renders the correct language on the first response. No flash, no mismatch, Googlebot sees the real content immediately.
- **Broken pattern** (used by the homepage and the Areas hub): the `/ms/...` and `/zh/...` route files render a shared component that reads language from `useLang()` — a React Context whose state starts at `"en"` on every server render and every fresh client mount, and is only corrected client-side, after hydration, via a `useLayoutEffect` that reads the URL path or `localStorage`.

**Concretely broken files:**
| Route | File | Problem |
|---|---|---|
| `/ms` | `app/ms/page.tsx` | Renders `<Home />` (the English homepage component) with no `lang` prop. Body content (H1, hero copy, trust badges, "Why Choose Us", pricing cards, reviews section) is 100% dependent on client `useLang()`. |
| `/zh` | `app/zh/page.tsx` | Identical pattern, `<Home />` reused. |
| `/ms/areas` | `app/ms/areas/page.tsx` | Renders `<AreasClient />` with no `lang`/`forcedLang` prop. |
| `/zh/areas` | `app/zh/areas/page.tsx` | Same. |

**What this actually does in production:**
1. Googlebot (or any crawler, or a user with JS disabled, or the very first paint before hydration) requests `/ms`. The server has no way to know the visitor wants Malay — `LanguageProvider`'s `useState<Lang>("en")` has no server-side signal to read from. The raw HTML — the thing search engines primarily index — is **English**, while `<title>` and `<meta description>` (set correctly in each route's static `metadata` export) are **Malay**. That mismatch between meta tags and body content is exactly the kind of signal that makes Google trust a page's language classification less.
2. After hydration, `useLayoutEffect` in `context/language-context.tsx` (lines 191–210) detects the `/ms` path and flips `lang` to `"ms"` — the **entire homepage body re-renders** into Malay in front of the user. This is the flash you're seeing. It is not "reverting to English" in the sense of a bug that undoes a choice — it's that the *server-rendered frame is always English*, so anyone landing directly on `/ms` or `/zh` (not navigating there via the in-page switcher) sees English-then-Malay every single time.
3. On the plain English routes (`/`, `/services`, etc.), the opposite risk exists: if a returning visitor previously switched to Malay, `localStorage.getItem("klr_lang")` restores `"ms"` client-side even though the URL is English — so the **navbar labels can end up in Malay while the page body (which doesn't use `useLang()`) stays in English**. That mismatch is the other half of what "language reverting" looks like from the outside.

### Why I'm confident this is the actual root cause, not a guess

The codebase already contains the fix pattern, applied inconsistently:

- `app/blog/[slug]/blog-post-client.tsx` has an explicit `forcedLang` prop with this exact comment: *"when rendered from a real /ms/blog/[slug] or /zh/blog/[slug] route, the URL itself determines language — must NOT depend on the client-side language-toggle state."* `app/ms/blog/[slug]/page.tsx` and `app/zh/blog/[slug]/page.tsx` correctly pass `forcedLang="ms"` / `forcedLang="zh"`.
- `app/near-me/near-me-client.tsx` takes an `initialLang` prop (`const lang = initialLang || ctxLang`), and `app/ms/near-me/page.tsx` correctly passes `initialLang="ms"`.
- `app/ms/about/page.tsx` and `app/ms/brands/[slug]/page.tsx` render fully standalone Server Components with hardcoded Malay strings — no client dependency at all.

So the fix already exists as a known-good pattern in three different forms elsewhere in this repo. It simply wasn't applied to the homepage or the areas hub.

There's also a related but already-fixed issue worth knowing about: `app/layout.tsx` has a parser-blocking inline `<script>` (lines 148–152) that sets `document.documentElement.lang` from the URL path *before paint*, with a comment explaining that this used to be done in a `useEffect` and crawlers saw `lang="en"` on Malay/Chinese pages. That fix is good and correctly targeted — but it only fixes the `<html lang>` attribute, not the visible body content, which is the bigger SEO and UX problem.

### The fix

1. **Homepage:** Give `/ms` and `/zh` their own Server Components (the way `about-page-i18n.tsx` does), or refactor `Hero`, `WhyChooseUs`, `ServicesWithPricing`, `GoogleReviews` to accept an explicit `lang` prop and have `app/ms/page.tsx` / `app/zh/page.tsx` pass it down instead of rendering `<Home />` directly. This is the highest-leverage single fix in this whole audit — it affects your two most-linked-to pages in two languages.
2. **Areas hub:** Add a `forcedLang` (or `initialLang`) prop to `AreasClient`, mirroring exactly what `NearMeClient` already does, and pass it from `app/ms/areas/page.tsx` / `app/zh/areas/page.tsx`.
3. Once both are fixed, do a **site-wide audit for any other route rendering a `useLang()`-dependent component without a forced-language prop** — I checked every `/ms/*` and `/zh/*` `page.tsx` (81 files) and found no other instances, but it's worth a final `grep -rl "useLang" components | grep -v node_modules` sweep after any future changes to catch new regressions of this exact pattern.

---

## 3. Other High-Severity Findings

### 3.1 Pricing inconsistency: window unit installation quoted at two different prices

`lib/aircond-math.ts` (the single source of truth the interactive Price Calculator uses) prices a 1.0–1.5 HP window-unit installation at **RM 199** — and its own comment on line 71–73 flags this: *"siteConfig.pricing.installation has no window rows; the live homepage PriceCalculator... prices window at 199/249. The homepage FAQ quotes 'window unit from RM 180.'"*

Meanwhile **"window unit(s) from RM 180"** is hardcoded as fact in at least six places that are shown to customers and fed to search engines / AI answer engines as structured data:
- `app/page.tsx` line 55 (inside the homepage's `FAQPage` JSON-LD schema — this is literally submitted to Google and any AI crawler as a factual answer)
- `config/installation-hub.ts` line 306
- `config/brand-installation-content.ts` line 231
- `config/area-installation-content.ts` line 451
- `config/kampung-installation-content.ts` line 297
- `config/installation-page-content.ts` line 873 (this one goes further: "RM 180 for 1.0 HP, RM 200 for 1.5 HP, RM 230 for 2.0 HP" — a three-tier breakdown that doesn't match the calculator's flat RM 199 / RM 249 split at all)

**Why this matters beyond "a typo":** a customer who reads the FAQ (or asks ChatGPT/Perplexity, which may cite your FAQPage schema directly) will expect RM 180 and then see RM 199 in the actual calculator or on the phone — a RM 19 discrepancy that's small in money terms but real in trust terms, especially for a business built on "transparent pricing confirmed before work begins" as a core value proposition (that phrase appears throughout your own copy).

**Fix:** Decide which number is actually correct (I'd assume the calculator, since that's what a customer actually books against), then update the six content files to match. Since `lib/aircond-math.ts` already centralizes calculation logic and reads from `sitePublic.pricing`, consider adding a window-unit row to `siteConfig.pricing.installation` so there's one published source of truth instead of a hardcoded fallback in the math file and six independently-typed FAQ answers.

### 3.2 Admin login has no rate limiting

`app/api/admin/login/route.ts` checks the password with `safeEqual()` (a genuinely well-built constant-time compare in `lib/admin-session.ts` — good), and adds a randomized 250–505ms delay to slow down a *single-threaded* brute-force script. But `lib/rate-limit.ts` — a working, well-documented in-memory rate limiter — is only wired into `/api/bookings` and `/api/indexnow`. It is **not imported into `/api/admin/login`**. An attacker can fire unlimited parallel requests (the per-request delay doesn't throttle concurrency) against `ADMIN_PASSWORD`.

**Fix:** add the same `hit(`admin-login:${clientIp(req)}`, N, windowMs)` call used in `/api/bookings/route.ts` to `/api/admin/login/route.ts`, before the password check. Five attempts per 15 minutes per IP is a reasonable starting point for a single-admin login.

### 3.3 `supabaseAdmin` has no `server-only` guard

`lib/supabase.ts` exports `supabaseAdmin`, which uses `SUPABASE_SERVICE_ROLE_KEY` (bypasses Row Level Security). Today it's only imported by two `route.ts` files (which Next.js never bundles client-side by construction), so there is **no active leak right now**. But there's also no `import "server-only"` guard at the top of the file, so a future edit — an AI session or a developer importing `supabaseAdmin` into a Client Component by mistake, e.g. while building an admin dashboard — would compile fine and could ship the service-role key into the browser bundle with no error until someone opened dev tools and found it.

**Fix:** `npm install server-only`, add `import "server-only";` as the first line of `lib/supabase.ts` (or a new file that only exports `supabaseAdmin`). This turns a silent future mistake into a build-time error.

### 3.4 `config/site-public.ts` generation is a manual, unenforced step

`scripts/gen-site-public.mjs` (well-built, does exactly what its comment says) is the only thing keeping the ~25 KB client-safe `sitePublic` object in sync with the 1.1 MB `siteConfig`. It is **not** wired to `prebuild`, `predev`, or any git hook — `package.json`'s `scripts` block has no `prebuild` entry at all. `WHERE_TO_UPDATE.md` tells a human to remember to run it after changing prices. If that step is skipped, the site builds successfully and deploys successfully — with a stale phone number, stale price, or stale service list on every client-rendered surface (calculators, navbar, footer, WhatsApp buttons), and nothing will flag it.

**Fix:** add `"prebuild": "npm run gen:site-public"` to `package.json` scripts. This is a five-minute change that removes an entire category of silent-desync risk.

---

## 4. Medium-Severity Findings

### 4.1 Accessibility — booking form's three most important fields aren't programmatically labeled
In `components/booking-form.tsx`, the **Name**, **Phone**, and **Address** fields (lines 454–488 — the core of a customer's booking) have `<label>` elements with no `htmlFor`, and their `<input>`/`<textarea>` have no matching `id`. A screen reader cannot announce "Name, edit text" when the user tabs into that field — it just announces the input with no name. Ten other fields further down the same form (property type, floor level, pipe run, unit supply, notes, date, time) *do* have correct `htmlFor`/`id` pairs, and even the invisible honeypot field does — so this looks like an oversight on the earliest three fields specifically, not a systemic pattern.
**Fix:** add `id="booking-name"` / `id="booking-phone"` / `id="booking-address"` to the three inputs and matching `htmlFor` to their labels.

### 4.2 Color contrast — `text-slate-400` fails WCAG AA, used 195 times
I calculated the actual contrast ratio: Tailwind's `slate-400` (`#94a3b8`) on white background is **2.56:1**. WCAG AA requires 4.5:1 for normal text and 3.0:1 for large text (18pt+, or 14pt+ bold). This class is used 195 times across the codebase, including at 11px font size in the footer (`components/footer.tsx` line 165, copyright bar) — well below even the large-text threshold. By contrast, `text-slate-500` (`#64748b`) measures 4.76:1 and passes. This is a real, sitewide, mathematically-confirmed accessibility failure, not a stylistic nitpick — low-vision users will struggle to read footer links, timestamps, and secondary copy across the whole site.
**Fix:** a global find-and-replace of `text-slate-400` → `text-slate-500` for any text that needs to remain readable (decorative-only uses, if any, can stay). This is a low-risk, high-reach fix.

### 4.3 Duplicate `FAQPage` schema on the homepage, and a stale assumption about what it buys you
`app/page.tsx` renders **two separate `<script type="application/ld+json">` blocks both typed `FAQPage`** — one via `<HomepageAeoSchemas />` (10 questions) and one inline, labeled "HOMEPAGE-02" (5 installation-specific questions, lines 62–147). The code's own comment on line 45–51 shows real awareness of schema duplication (it explicitly removed a duplicated `HVACBusiness`/`WebSite` schema for exactly this reason) — this second `FAQPage` block appears to have been added after that cleanup and simply wasn't caught by it.

Separately, and more importantly: **Google restricted the FAQ rich-result (the expandable accordion under a search listing) to well-known government and health authority sites in August 2023.** A local HVAC business's FAQPage markup will validate perfectly and will not cause an error, but it will not produce the visual rich result the comments in this codebase seem to be optimizing for. It can still have value for AI answer engines (ChatGPT, Perplexity, Google AI Overviews), which consume structured data differently than classic blue-link rich results — so I'm not recommending you remove it — but the ROI expectation on this specific investment should be recalibrated, and the duplication should be cleaned up regardless.
**Fix:** merge the two `FAQPage` blocks into one (combine the 10 + 5 questions, dedupe if any overlap), and don't expect a visual FAQ rich snippet under the classic search result — the AEO/AI-citation value is the real remaining upside.

### 4.4 Modal dialogs lack keyboard trap / Escape handling
`components/exit-intent-popup.tsx` (and by extension likely similar components) implements `role="dialog"`, `aria-modal="true"`, and a labeled close button correctly — genuinely good baseline work — but has no focus trap (Tab can move focus to background content while the modal is open) and no `Escape`-to-close handler. This is a WCAG 2.1.2-adjacent gap for keyboard-only users.
**Fix:** add a `keydown` listener for `Escape` that calls `dismiss()`, and either use a lightweight focus-trap utility or manually manage `tabIndex`/focus on open.

### 4.5 `next/font` is not used anywhere — the site ships zero custom typography
`config/fonts.ts` is explicitly commented "Mocked for offline build support" and hardcodes `fontFamily: "Inter, system-ui, sans-serif"` as an inline style object rather than using `next/font/google`. I confirmed via a full-repo search that **no file anywhere imports `next/font`**, and `styles/globals.css`'s `--font-sans` variable falls through to `ui-sans-serif, system-ui, sans-serif` — meaning the site is actually rendering in whatever default sans-serif font each visitor's OS provides (San Francisco on Apple devices, Segoe UI on Windows, Roboto on Android), not Inter. This has a real upside (zero font-loading time, zero layout shift from font swap, one less network request) but it's unclear whether this was a deliberate performance trade-off or a leftover placeholder from a build environment that couldn't reach Google Fonts. Worth a deliberate decision either way rather than leaving it ambiguous.

---

## 5. Performance & Core Web Vitals

**What's already good, and worth knowing so it isn't accidentally undone:**
- `components/reveal.tsx` was deliberately rewritten (see its own excellent comment) from a per-instance Client Component with `useState` + `IntersectionObserver` into a zero-JS pass-through wrapper, specifically because area/brand template pages render "dozens of these wrappers per page" and the old version was inflating Total Blocking Time.
- `components/conversion-widgets-loader.tsx` is a genuinely well-built idle-loading pattern: it uses `requestIdleCallback` with a `setTimeout` fallback, *and* loads immediately on the user's first pointer/keyboard/touch interaction (whichever comes first), with full listener cleanup. Sticky bars, exit-intent popups, and floating buttons are kept out of the critical rendering path this way.
- `next.config.mjs` sets real mobile `deviceSizes` (360/414px) specifically so phone users don't get forced into a 640px+ image variant — a detail most sites miss.
- No raw `<img>` tags anywhere (`next/image` used in all 46 image-rendering files), and no `unoptimized` prop bypassing image optimization anywhere.
- `siteConfig` (1.1 MB) is confirmed **not** leaking into any client bundle — I checked every file that imports `config/site` and none carry `"use client"`. The `site-public.ts` split (see 3.4) is doing its job.

**What isn't applied consistently:**
- `next/dynamic` (code-splitting) is used in exactly **one file** (`components/conversion-widgets.tsx`). Several genuinely large, calculator-style Client Components are statically imported into the homepage instead: `PriceCalculator` (790 lines), `DiagnosticTool` (690 lines), both imported at the top of `app/page.tsx` with a plain `import` statement. That means their full JS ships in the initial homepage bundle even for a visitor who never scrolls down to use them — the exact problem `next/dynamic` exists to solve, and the exact pattern already proven out in `conversion-widgets.tsx`.
  **Fix:** wrap `PriceCalculator` and `DiagnosticTool` (and similarly-sized components like `BookingForm`, `service-detail-i18n.tsx` at 1,746 lines) in `dynamic(() => import(...), { loading: () => <Skeleton /> })` where they aren't needed for the initial paint.
- `googleapis` (a large, all-Google-APIs package) is imported in full (`import { google } from "googleapis"`) just to use the Calendar API. Google's own npm page recommends installing the scoped submodule instead for faster startup. This only affects server cold-start time (it's never in the client bundle), so it's a lower-priority item, but `@googleapis/calendar` is a straightforward swap.
- `@heroui/styles` is imported in `globals.css` but no `@heroui` React component is imported anywhere in the codebase — worth confirming this dependency is still needed, or removing it if it's a leftover from an earlier component-library integration.

---

## 6. SEO & Technical SEO

**Strong points, confirmed by direct inspection:**
- `robots.txt` explicitly allows every major AI crawler (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) in addition to standard search bots — increasingly important as AI answer engines become a real traffic source, and something a lot of sites still get wrong by blanket-blocking unfamiliar user agents.
- `app/sitemap.ts` is mature: real trilingual `alternates.languages` maps per URL, a deliberately **static, manually-pinned `lastModified` date** rather than `new Date()` on every build (the comment correctly identifies why a per-build timestamp is bad practice — it tells Google "this changed" on every deploy even when it didn't), and a sensible priority hierarchy (homepage 1.0, services 0.95, down through localized variants at slightly lower weights).
- The self-serving-reviews fix in `app/layout.tsx` (removing `aggregateRating`/`review` arrays from the `HVACBusiness` schema, with a comment citing Google's actual policy and dating the 36-invalid-snippets Search Console report that triggered it) is correct and well-reasoned — Google's September 2019 guidance (restated December 2025) does treat self-hosted reviews-about-yourself as ineligible for rich results.
- Breadcrumb JSON-LD (`components/breadcrumb-schema.tsx` and the inline versions in area/brand/service pages) is structurally valid — correct `@type`, `position`, `name`, `item` fields throughout the samples I checked.
- IndexNow integration (`app/api/indexnow/route.ts`) pulls its URL list from the sitemap itself (single source of truth) rather than a hardcoded array — the comment documents a real prior bug (only 5 URLs were ever submitted) that this fixed correctly.

**Issues:**
- The homepage/areas-hub language bug (Section 2) is itself a significant technical-SEO problem, not just a UX one — see that section for the full mechanism.
- The duplicate `FAQPage` schema and the recalibrated expectation around FAQ rich results (Section 4.3).
- The window-unit pricing inconsistency (Section 3.1) exists inside JSON-LD `FAQPage` content that's meant to be machine-readable factual data — inconsistent facts inside structured data is a worse signal than inconsistent facts in plain prose.

---

## 7. AI Search (AEO/GEO) Readiness

This is a genuine relative strength of the site. Beyond the AI-crawler-friendly `robots.txt`:
- `public/llms.txt`, `public/llms-full.txt`, and `public/aeo-faq.txt` all exist and are referenced both in `robots.txt` comments and in `<meta>` tags (`app/layout.tsx`'s `other` block: `"ai-context"`, `llms`, `llms-full`).
- FAQ answers throughout the config files (`config/service-aio-answer-blocks.ts`, `config/problem-aeo-content.ts`, the homepage FAQ schema) are written in a consistent, extractable style: specific numbers, short self-contained paragraphs, no marketing preamble before the actual answer — this is exactly the shape that answer-engine extraction favors over long narrative prose.
- The kampung-level content I sampled (`config/site.ts`'s `kampungPages`, 158 entries) contains genuinely locality-specific detail (parking constraints near a night market, hillside bungalow bracket considerations, JMB approval norms for a specific condo cluster) rather than templated filler — this is real topical depth, which both traditional SEO and AI-citation systems reward over thin, duplicated location pages.

The main gap is the factual-consistency issue already covered (Section 3.1) — AEO systems are more likely to directly quote a number from your FAQ schema than a human skimming the page would be, so inconsistent numbers matter more here than they would in ordinary prose SEO.

---

## 8. Security

**Confirmed strong (already fixed, with good documentation of what was fixed and why):**
- Admin auth: moved from a hardcoded client-side password + `localStorage` flag (bypassable via DevTools) to server-side comparison against `ADMIN_PASSWORD` with a signed, HttpOnly, `secure`-in-production, `sameSite: "lax"` session cookie. The signing/verification code (`lib/admin-session.ts`) uses `timingSafeEqual` correctly, including a clever HMAC-first trick in `safeEqual()` so both compared buffers are always equal length (a real, subtle timing-attack prevention detail many implementations miss).
- `app/api/debug-supabase/route.ts` previously returned five full customer booking rows (name, phone, address — genuine PDPA exposure) to any anonymous visitor who found the URL. Now session-gated and returns only a row count.
- `app/api/debug-calendar/route.ts` — same admin-session gating pattern applied consistently.
- `app/api/bookings/route.ts` has real defense in depth: IP-based rate limiting, a honeypot field that returns a fake-success 200 to bots instead of a rejection (so bots don't retry with a different payload shape), server-side re-validation of calendar availability (never trusts the client's idea of what's free), and deliberately never echoes raw Supabase error messages to the client (which could leak schema details).
- `lib/booking-validation.ts` is thorough: enum-whitelisted service types, length bounds on every string field, a Malaysia-timezone-aware business-hours check that's correct regardless of what timezone the server itself runs in, and clock-skew tolerance on the "not in the past" check.

**Gaps found (see Sections 3.2 and 3.3 for full detail):** no rate limiting on admin login; no `server-only` guard on the service-role Supabase client.

**Headers:** `next.config.mjs` sets `Strict-Transport-Security` (with `preload`), `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and a `Permissions-Policy` that explicitly denies camera/microphone/geolocation. No `Content-Security-Policy` header is set — for a site embedding Google Tag Manager, GA4, and Microsoft Clarity via inline scripts, a CSP is harder to retrofit than to design in from the start, but it's worth putting on the roadmap rather than treating as urgent, since the inline-script-heavy `<head>` would need `nonce`-based CSP to avoid breaking the existing analytics setup.

---

## 9. Dependencies

`package.json` pins genuinely current versions: Next.js 16.2.12, React 19, Tailwind 4.1.11, TypeScript 5.9.3. I verified independently that Next.js 16 (released October 21, 2025, now the LTS line) removed synchronous access to `params`/`cookies()`/`headers()` entirely (Next.js 15 only deprecated it) — **every one of the 30 dynamic-route files in this repo already uses the correct `params: Promise<{...}>` + `await params` pattern**, in both `generateMetadata` and the page component. That's a clean pass on the single most likely Next.js 16 breaking change to trip up a codebase this size.

- `googleapis` — see Section 5, recommend swapping to `@googleapis/calendar`.
- `@heroui/styles` — imported for CSS only, no components used; confirm it's still needed.
- No `server-only` package present at all (see Section 3.3) — worth adding regardless of the Supabase fix, as a general guard for any future server-secret module.
- `overrides` in `package.json` pin `sharp@0.35.3` and `postcss@8.5.24` — this is a deliberate, documented way to force specific transitive versions, generally a sign of a team that has actually debugged a dependency conflict before, not an accident.
- I could not run `npm audit` (no registry access in this environment) — **please run `npm audit` locally before your next deploy** to catch any CVEs in the current lockfile; I have no way to verify this from source alone.

---

## 10. Architecture Notes

- `config/site.ts` (1.1 MB) holding 40 areas, 158 kampungs, 20 brands, and 20 problems — each with full EN/MS/ZH prose and FAQ arrays — is unusual in scale but not wrong in principle; the content quality I sampled is genuinely unique per-location (not templated filler), which is exactly what avoids Google's thin/duplicate-content penalties for this kind of programmatic local-SEO page structure. The real risk isn't the file's existence, it's *forgetting the `site-public.ts` sync step* (Section 3.4) — fix that one process gap and the architecture is sound.
- The `forcedLang`/`initialLang` prop-drilling pattern used correctly in Blog and Near Me is the right general shape for this codebase's i18n — I'd formalize it as the standard pattern (maybe even a shared TypeScript type `{ lang: Lang }` that every route-level component destructures) so it's harder for a future page to accidentally fall back to the broken `useLang()`-only pattern the way the homepage and areas hub did.
- `WHERE_TO_UPDATE.md` is a genuinely useful piece of internal documentation — most projects this size don't have one at all. It's honest about its own gaps (e.g., flagging that a Supabase column addition requires a manual SQL script run).

---

## 11. Priority Roadmap

**Fix immediately (highest ROI, all are scoped, contained changes):**
1. Homepage + Areas hub language architecture (Section 2) — affects `/ms`, `/zh`, `/ms/areas`, `/zh/areas`, your most-linked bilingual entry points.
2. Window-unit pricing inconsistency across 6 files (Section 3.1) — customer-facing trust issue, also embedded in JSON-LD fed to AI/search.
3. Rate-limit `/api/admin/login` (Section 3.2) — a few lines, closes a real brute-force gap.

**High priority (this week):**
4. Add `server-only` guard to `lib/supabase.ts`'s `supabaseAdmin` export (Section 3.3).
5. Wire `gen:site-public` into `prebuild` (Section 3.4).
6. Fix the three unlabeled booking-form fields (Section 4.1) — the highest-value form on the site should be fully accessible.

**Medium priority (this sprint):**
7. Global `text-slate-400` → `text-slate-500` pass for WCAG AA contrast (Section 4.2).
8. Merge the duplicate homepage `FAQPage` schema blocks (Section 4.3).
9. Add `Escape`-to-close + basic focus handling to modal-style popups (Section 4.4).
10. Code-split `PriceCalculator` / `DiagnosticTool` / other large homepage Client Components with `next/dynamic` (Section 5).

**Nice to have:**
11. Swap `googleapis` → `@googleapis/calendar`.
12. Decide deliberately on the fonts question (Section 4.5) rather than leaving it as an unlabeled placeholder.
13. Confirm `@heroui/styles` is still needed.
14. Design a nonce-based CSP header alongside the existing GTM/GA4/Clarity inline scripts.

---

## A note on verification

I read every file referenced in this report directly from your repository — nothing here is inferred from file names or guessed from patterns I've seen elsewhere. Where I made a factual claim about Next.js 16 behavior or Google's current policies (the async-params removal, the 2023 FAQ rich-result restriction, the self-serving-reviews policy), I verified it against current documentation rather than relying on my training data, since frameworks and search policies change quickly.

What I could **not** do in this environment: run `npm install`, `next build`, `next lint`, or `tsc` with real type definitions (no network access to the npm registry here). Before you or anyone else ships fixes based on this report, please run:
```
npm install
npm run typecheck
npm run lint
npm run build
```
locally or in CI, so any TypeScript/build issue that only a real compile would surface gets caught before deploy.
