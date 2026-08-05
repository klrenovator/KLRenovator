# P1-03 — Bundle Analyzer, RUM Baseline & Deferred Widgets (2026-08-05)
- Add `bundle-analyze` script to package.json (stub ready).
- Deferred / nonessential widgets (GTM, Clarity, conversion widgets) should mount only on eligible routes / user intent, not globally.
- RUM: need Vercel Analytics / Speed Insights baseline; no build available in this checkout to measure.
- Blocker: `node_modules` absent, build unverified.
- Next: run `npm run bundle-analyze` after `npm install`; establish LCP/INP baseline; audit global layout imports.
