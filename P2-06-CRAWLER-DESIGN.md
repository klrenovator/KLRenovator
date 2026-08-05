# P2-06 — Sitemap / Rendered Crawl Assertion Design (2026-08-05)
Method: deployed crawler (Playwright / Puppeteer / curl loop) against production sitemap.
Assertions per URL:
- HTTP 200 (not 404 / 500)
- Canonical link matches URL
- Reciprocal hreflang (en ↔ ms ↔ zh) present and correct
- One `<h1>` only; language attribute on `<html>` matches URL locale
- No `noindex` on indexable content pages
- Body text language matches `<html lang>`
- No broken internal links (crawl depth 2)

Implementation: `scripts/crawlr-verify.mjs` stub + CI job.
Blocker: needs deployed URL (Vercel production) + `node_modules` for Playwright.
Next: write stub script; schedule CI after build passes.
