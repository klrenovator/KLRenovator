# KLRenovator — Pending Analytics / SEO / Tracking Setup (Next Session Prompt)

> Copy everything below the line into a new Arena session to finish the remaining
> setup safely. It is written in English on purpose so any agent executes it exactly.
> Replace the `<USER PROVIDES: ...>` placeholders with real IDs before/while running.

---

## ROLE & TASK
You are working on the **KLRenovator** Next.js (App Router) website at `/home/user/KLRenovator`.
The Google Tag Manager container `GTM-57MCF8NQ` was just added to `app/layout.tsx` (PR #8, branch
`arena/019fc02c-klrenovator`). The goal of THIS session is to finish the remaining analytics / SEO /
tracking setup WITHOUT breaking what already works and WITHOUT double-counting data.

## FIRST: Read the current state
Before changing anything, read `app/layout.tsx` and `config/site.ts`. Confirm the tags already present:
- **Google Analytics 4 (hardcoded, keep):** `G-5V6TDZ48W0`
- **Microsoft Clarity (hardcoded, keep):** `x4h3dghn6p`
- **Google Tag Manager (just added):** `GTM-57MCF8NQ`  → head script + `<noscript>` iframe
- **Vercel Analytics** (`<Analytics/>`) and **Vercel Speed Insights** (`<SpeedInsights/>`) in body
- **Google Search Console verification meta tag:** `bXgZJKdBlDiVK9DsjNukmCqqicH37cqU_YdHSIVhjlg`
  (in the `metadata.verification.google` field)
- **Google Business Profile URL** in `config/site.ts`: `https://share.google/HhXvqWDkefZ5bzNdL`
- **IndexNow API route** exists at `app/api/indexnow/route.ts` (auto-notifies Bing/Yahoo of new pages)

## ⛔ CRITICAL RULES — do NOT violate these (they cause real data/SEO damage)
1. **DO NOT add GA4 again inside GTM.** GA4 must stay hardcoded/independent. Adding it in GTM too
   causes **double-counted sessions**. The decision is: GA4 alone, GTM for ads/marketing only.
2. **DO NOT add duplicate Bing / Ahrefs verification meta tags to the code.** Verify those tools by
   importing from Google Search Console inside their dashboards (no code change needed).
3. **Marketing/ad tags (Meta Pixel, Google Ads) MUST go through GTM**, not hardcoded into the layout,
   unless the user explicitly asks for direct code. This keeps `app/layout.tsx` clean.
4. **Always commit to the current session branch** (e.g. `arena/019fc02c-...`); never commit/push to `main`.
5. After any tracking change, verify the ID appears **exactly once** in the rendered HTML (view-source).

## TASK A — Things ONLY THE USER can do (in external dashboards). Do NOT attempt these in code.
Tell the user to complete these and report back any IDs needed for Task B:
- **Google Search Console:** add Domain property `klrenovator.com` (meta tag already in code → auto-verifies);
  then submit sitemap `https://www.klrenovator.com/sitemap.xml`.
- **Google Business Profile:** claim + verify at business.google.com (postcard/phone). Most important for local SEO.
- **Bing Webmaster Tools:** add site, choose **"Import from Google Search Console"** (no code needed).
- **Ahrefs Webmaster Tools:** add project, verify via **GSC import**.
- **UptimeRobot:** add monitors for `https://www.klrenovator.com` and `https://klrenovator.com` (free tier = 50 monitors).
- **Meta Pixel:** create pixel in Meta Events Manager → give agent the **Pixel ID**.
- **Google Ads:** create account, get **conversion ID / conversion label / remarketing tag ID**.
- **Cloudflare:** confirm the domain is managed in Cloudflare (DNS/SSL/caching/WAF); add any TXT verification records there.
- **Vercel dashboard:** enable **Analytics** and **Speed Insights** (code is already present).

## TASK B — Code work the AGENT can do (only after user supplies the IDs)
Ask the user for each ID; implement one at a time and verify.

1. **Meta Pixel via GTM** — preferred method:
   - Add the Meta Pixel base code + PageView as tags inside the GTM container `GTM-57MCF8NQ`
     (using GTM UI / or, if the user wants code, add an `fbq` init script right after the existing GTM
     head script, gated so it only fires with the Pixel ID). Do NOT hardcode if GTM path is chosen.
   - Then update `app/privacy-policy/page.tsx` to mention Meta Pixel (currently only GA4 + Clarity listed).

2. **Google Ads conversion / remarketing via GTM** — add using the IDs from Task A inside `GTM-57MCF8NQ`.
   Do NOT hardcode unless explicitly requested.

3. **Sentry (optional error monitoring)** — only if the user wants it:
   - `npm i @sentry/nextjs`, add `instrumentation.ts`, wrap the app, add a Sentry error boundary.
   - This is a larger change; confirm with the user before starting.

4. **Privacy policy sync** — whenever a new tracker is added (Meta Pixel, Google Ads, Sentry),
   add it to the tracker list in `app/privacy-policy/page.tsx` so the site stays compliant.

## VERIFICATION CHECKLIST (run after deploy / before declaring done)
- [ ] View-source of the live site shows `GTM-57MCF8NQ` once in `<head>` and the `<noscript>` iframe once after `<body>`.
- [ ] View-source shows `G-5V6TDZ48W0` (GA4) exactly once — NOT loaded a second time via GTM.
- [ ] GA4 Realtime report shows normal (not doubled) traffic.
- [ ] GTM Preview/Debug mode shows the container and any new tags firing correctly.
- [ ] New trackers (Meta Pixel / Google Ads) fire only when their IDs are present.
- [ ] `npm run build` (or `npx next lint`) passes with no errors.

## COMMIT / PR CONVENTION
- Work on the session branch only.
- One logical change per commit; clear message (e.g. "Add Meta Pixel via GTM").
- Open PR against `main` from the session branch when the user asks.
