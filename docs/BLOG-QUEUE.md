# KL Renovator — 14-Blog Approved Queue (Multilingual SEO Series)

Status legend: ✅ published · 🔨 next to build · ⬜ queued

| # | Working title | Slug | Status |
|---|---|---|---|
| 1 | Aircond Dismantle & Reinstall Guide for Moving House | `aircond-dismantle-reinstallation-guide-malaysia` | ✅ PR #52 (2026-08-18) |
| 2 | DIY Aircond Cleaning vs Professional Chemical Wash | `diy-aircond-cleaning-vs-chemical-wash-malaysia` | ✅ PR #53 (2026-08-18) |
| 3 | Aircond Error Codes & Blinking Lights Decoder (Malaysia) | `aircond-error-codes-blinking-lights-guide-malaysia` | ✅ PR #54 (2026-08-18) |
| 4 | Post-Haze Aircond Cleaning Guide (Malaysia) | `aircond-cleaning-after-haze-malaysia` | ✅ this session (2026-08-18) |
| 5 | Old Aircond Disposal & Responsible Replacement | `old-aircond-disposal-replacement-malaysia` | ✅ this session (2026-08-18) |
| 6 | Mitsubishi vs Daikin Aircond Comparison (Malaysia) | `mitsubishi-vs-daikin-aircond-malaysia` | ⬜ |
| 7 | Aircond Mould Prevention in Malaysia's Humid Climate | `aircond-mould-prevention-malaysia` | ⬜ |
| 8 | Aircond Remote & Timer Features You Are Not Using | `aircond-remote-timer-features-guide-malaysia` | ⬜ |
| 9 | Power Surge & Voltage Fluctuation Protection for Aircond | `aircond-power-surge-protection-malaysia` | ⬜ |
| 10 | Aircond for Baby & Kids' Rooms: Temperature, Cleaning, Safety | `aircond-for-baby-kids-room-malaysia` | ⬜ |
| 11 | Aircond Inspection Checklist When Buying a Used Home | `aircond-checklist-buying-used-home-malaysia` | ⬜ |
| 12 | New Aircond Not Cold? First-30-Days Troubleshooting | `new-aircond-not-cold-first-month-malaysia` | ⬜ |
| 13 | Aircond Outdoor Bracket Safety & Rust Check | `aircond-outdoor-bracket-safety-rust-malaysia` | ⬜ |
| 14 | Malaysia Aircond Servicing Calendar: When to Book What | `aircond-servicing-calendar-malaysia` | ⬜ |

## Rules (from the Master AI Agent Prompt)

1. **One blog per continuation prompt.** Never create more than the next unpublished blog.
2. **Additions only.** Never delete, replace, rename, overwrite or modify existing blogs.
3. Every blog ships complete in **English, Bahasa Melayu and Simplified Chinese** (title, excerpt, category, tags, full body HTML, FAQs).
4. Apply the full stack: SEO, semantic SEO, local SEO (KL & Selangor), AEO (quick-answer summary block + FAQ section), GEO/AISEO/LLMO (extractable facts, tables, prices), SXO, CRO (WhatsApp +60 18-298 3573, /book CTA), E-E-A-T (KL Renovator HVAC Expert Team byline, lastReviewed date), structured data (via the shared `BlogPostClient` — BlogPosting + BreadcrumbList), internal linking (service + blog + tool + area links per language), metadata budgets (EN/MS ≤155 chars, ZH ≤155 display width) and multilingual routing (same slug under `/blog`, `/ms/blog`, `/zh/blog` — automatic via `allPosts`).
5. **Only real KL Renovator information and published pricing.** Never invent prices, certifications, reviews, addresses, statistics or business claims.
6. Featured image must be an existing real job photo from `/public/hero/` (image-prompt notes go in the batch file header comment — never invent technician portraits or job scenes as facts).

## Implementation checklist per blog

- [ ] New post object in `config/new-blog-batch{n}.ts` (EN/MS/ZH)
- [ ] Register in `config/blog-posts.ts` (`import` + spread into `allPosts`) — additions only
- [ ] Add slug to `SERVICE_BLOG_MAP_V2` primary-service list in `config/topical-authority-map.ts`
- [ ] Add slug → services entry in `BLOG_SERVICE_MAP` in `config/topical-authority-map.ts`
- [ ] Routing, metadata, hreflang, sitemap, related posts, anchor diversification are automatic — no page files needed
- [ ] Update this queue file status after publishing
- [ ] Run `npm run typecheck`, `npm run lint`, `npm run build`, `npm run verify:routes`, `npm run audit:gsc`
