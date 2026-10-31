# GSC + Pricing Audit — 31 Oct 2026

Branch: `arena/70f189be-klrenovator` · Source of truth: Google Sheet **KL RENOVATOR - PRICE LIST (Simple)** `PRICES!A1:C80` (owner-confirmed: filled *New Price* = current price; empty = Current Price stands)

## 1. Pricing count (verified twice)
- Rows with *New Price* filled: **16** — **10 actually change value**, 6 confirm the same value (Basic Window 99/120, Structural Leak Check 88, Emergency Drain 170, After-hours 50, After-hours Diagnostic 138).

### Applied (10)
| Service | Old | New |
|---|---|---|
| Installation Wall 3.0 HP | RM 329 | **RM 279** |
| Installation Wall 5.0 HP | RM 449 | **RM 399** |
| Chemical Wash Wall 3.0 HP | RM 180 | **RM 150** |
| Chemical Wash Wall 4.0–5.0 HP | RM 200 | **RM 150** |
| Chemical Wash Cassette 2.0–3.0 HP | RM 280 | **RM 250** |
| Chemical Wash Cassette 4.0–5.0 HP | RM 350 | **RM 250** |
| Chemical Overhaul 2.0–2.5 HP | RM 490 | **RM 460** |
| Chemical Overhaul 3.0–3.5 HP | RM 560 | **RM 500** |
| Dismantle+Reinstall same place (standard) | RM 250 | **RM 290** |
| Dismantle+Reinstall same place 2.0–2.5 HP | RM 290 | **RM 340** |

### Where updated
`config/site/pricing.ts` (source) → `npm run gen:site-public` regenerated `config/site-public.ts`/`public/homepage-data.json`; calculators (`components/price-calculator.tsx`, `lib/aircond-math.ts`, `config/tool-content.ts`, tools hub); service tables/FAQs EN/MS/ZH (`config/services-data.ts`, `config/services-i18n.ts`, service-price & installation-price pages); area/brand/kampung FAQ generators; blog tables (incl. market-comparison columns left untouched — those are competitor prices, not KL Renovator's); AI files `public/llms.txt`/`llms-full.txt`/`aeo-faq.txt`. Identical numbers in all 3 languages (languages differ only in wording).

Drive: new Google Doc **“KL RENOVATOR - PRICE LIST (Updated Oct 2026 - from official Sheet)”** (`1csNrgAaHTsHQBpv6JsMoBzR_C8gFZ4RvrU2vfH_XFVA`). ⚠️ The Aug-2026 DOCX/PDF price lists in Drive still contain the old prices — do not use them; they were not overwritten (binary DOCX cannot be edited safely via the Drive connector).

### Pending owner clarification (NOT guessed)
- Sheet has **no 3.5 HP wall-installation row** — owner confirmed 31 Oct 2026 that 3.5 HP is charged the same as 3.0 HP (**RM 279**); applied in `lib/aircond-math.ts` (fallback + HP/BTU table) and the price calculator's 3.0–3.5 band.
- Basic Window servicing (RM 99/120) exists in the Sheet but had no published website table row — left as-is.

## 2. GSC screenshot classification (Oct 2026)
| Report | URLs | Verdict |
|---|---|---|
| Not found (404) ×17 | 6 missing (below) now 301; rest already 301 in prior audit (`best-brands-2025`×3, `indoor-air-quality` MS, `/services/aircond-service-price-malaysia`, `aircond-assistant`×2, `/&`,`/$`,`/year`,`/tahun`) | **Fixed** — after deploy, click *Validate Fix* in GSC |
| Page with redirect ×2 | `/ms/`, `/zh/` (trailing-slash → canonical) | Informational, correct — no action |
| Alternative page, proper canonical ×2 | `/?pagelayer-template=…` | Informational; canonical = homepage; `robots.txt` already disallows — no redirect possible without loop (documented in `next.config.mjs`) |
| Excluded by noindex ×3 | `/review`, `/ms/review`, `/zh/review` | Intentional (also disallowed in robots) — correct |
| Crawled–not indexed | Mostly `_next/static/chunks/*.js?dpl=…`, `llms-full.txt`, `site.webmanifest`, `favicon.ico` + a few area/blog pages | Assets are not pages — ignore; real pages already in sitemap (2,211 URLs) |
| Discovered–not indexed | area/brand/problem long-tail | Crawl-budget/quality signal, not an error; internal linking + sitemap already cover them. Monitor weekly workflow |

### New 301s added (`next.config.mjs`)
`/ms/services/aircond-service-price-malaysia`→`/ms/aircond-service-price-malaysia` · `/zh/services/aircond-service-price-malaysia`→`/zh/aircond-service-price-malaysia` · `/ms/aircond-installation-kl`→`/ms/pemasangan-aircond-kl` · `/ms/commercial-aircond-service`→`/ms/servis-aircond-komersial` · `/ms/commercial-aircond-installation`→`/ms/pemasangan-aircond-komersial` · `/ms/new-home-aircond-installation`→`/ms/pemasangan-aircond-rumah-baru`
Verified locally: all 6 return 301, all destinations 200, no internal link emits the old paths. `/services/{search_term_string}` and `/年`: no redirect added (search action already removed; junk path correctly 404s) — they will age out.

## 3. Protected (untouched)
Routes/URLs of ranking pages, WhatsApp (`wa.me/60182983573` verified in built HTML), forms, booking, language switching, Vercel config, env vars. No URL changed, no page deleted.

## 4. QA (all green)
`lint` ✓ · `typecheck` ✓ · `verify:routes` ✓ · `build` (2,217 pages) ✓ · `verify:build` (2,211 sitemap URLs resolve) ✓ · `gsc-audit` (0 indexing-blocking errors, titles/descriptions clean) ✓ · production-server smoke test `/`, `/ms`, `/zh`, sitemap, robots, llms + 6 redirects ✓

## 5. After merge (owner, ~5 min)
1. GSC → *Not found (404)* → **Validate Fix**.
2. GSC → URL Inspection on 2–3 Discovered pages → *Request Indexing* (optional, low value).
3. Optionally trash/rename the two August DOCX/PDF files in Drive to stop accidental use.
