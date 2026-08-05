# P1-03 — Bundle Analyzer, RUM Baseline & Deferred Widgets

## Code controls now in place

- `npm run bundle-analyze` runs `next build` with `@next/bundle-analyzer` and writes static reports to `.next/analyze/` (ignored by Git).
- `ConversionWidgetsLoader` leaves non-essential lead widgets out of the initial client graph and loads their split bundle on idle or first intent.
- Vercel Analytics and Speed Insights remain enabled in the shared root layout for real-user LCP/INP/CLS measurement.

## Required release measurement

Run the analyzer in CI or a connected local environment, then record mobile values for `/`, one service detail, one area detail, `/blog/[slug]`, and `/book`:

```bash
npm run bundle-analyze
```

Use Vercel Analytics / Speed Insights for a 28-day baseline. Do not claim a Core Web Vitals pass from a local build; production traffic and real devices are the source of truth. The reports contain generated build artefacts and must not be committed.
