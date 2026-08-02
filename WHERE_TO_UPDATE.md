# Quick reference — where to change things

## 🎨 Brand colours
File: `styles/globals.css`
- Edit `--color-brand-*` (light mode, `:root`) to change the primary brand colour
- Edit `--color-brand-*` inside `.dark` for the dark-mode palette
- Edit `--color-accent-*` for the secondary (cyan) accent
- Edit `--color-whatsapp` for the WhatsApp button green

## ⭐ Google reviews (REAL ones)
We cannot auto-scrape reviews from `maps.app.goo.gl` short-links, so you
have two options:

**OPTION A — live reviews (recommended):**
1. Enable the Places API in Google Cloud
2. Create `.env.local` with:
   ```
   GOOGLE_PLACES_API_KEY=your_key_here
   GOOGLE_PLACE_ID=your_place_id_here
   ```
3. Restart `npm run dev` — homepage will fetch live reviews every hour

**OPTION B — manual (paste reviews in):**
File: `config/reviews.ts`
Replace the `googleReviews` array with your real reviews.

## 💰 Pricing
File: `config/site.ts` → `siteConfig.pricing.*`
Or: `config/services-data.ts` → `priceTable` for detailed service pages.

After changing any price in `site.ts`, run `npm run gen:site-public` — every
calculator and the AI assistant reads prices from `config/site-public.ts`
(which is generated from `site.ts`), so they stay in sync automatically.

## 🧮 Calculators & AI assistant (shared logic)
- `lib/aircond-math.ts` — ALL calculation logic + non-published assumptions
  (wattage per HP, typical gas PSI, inverter savings %, drain pipe estimate
  rate). Every calculator and the AI assistant import from here.
- `config/tools.ts` — registry of tool URLs + trilingual display names
  (used by the `/tools` hub, footer, navbar, and every `ToolLinks` strip).
- `components/calculators/` — shared calculator UI + page layout + link strips.
  Every calculator component accepts a `lang` prop (`"en" | "ms" | "zh"`).
- `config/tool-content.ts` — trilingual SEO copy (h1, intro, how-it-works,
  factors, FAQs) for all 7 tools + the AI assistant page. EN/MS/ZH page
  files are thin wrappers around `getToolContent(key, lang)`.
- `lib/aircond-assistant.ts` — trilingual AI assistant engine (knowledge
  base + intent matching). `answer(input, context, lang)` reads prices live
  from `sitePublic.pricing`.
- `app/aircond-assistant/page.tsx` + `/ms/aircond-assistant` + `/zh/aircond-assistant`.

## 🌐 Multilingual tool URLs
Every tool exists in 3 languages under the same slug:
- EN: `/aircond-installation-cost-calculator`
- MS: `/ms/aircond-installation-cost-calculator`
- ZH: `/zh/aircond-installation-cost-calculator`
Same pattern for `/tools`, `/aircond-gas-topup-cost-calculator`,
`/which-aircond-service-do-i-need`, `/aircond-size-calculator`,
`/aircond-electricity-cost-calculator`, `/aircond-savings-calculator`,
`/aircond-assistant`. Add a new ms/zh page to `app/sitemap.ts` (trilingual
alternates) and to the `toolPages` array in `components/navbar.tsx`
(getTranslatedPath) when creating new tools.

## 📞 Contact & brand info
File: `config/site.ts`
- `phone`, `phoneDisplay`, `whatsapp`, `email`, `address`, `hours`
- `links.googleMaps`, `links.whatsapp`, socials

## ❓ FAQs
File: `app/faq/page.tsx` — edit the `FAQS` object (separate `en`, `ms`, `zh` arrays).
Note: FAQ schema/snippets shown on other pages (services, areas, brands, problems)
are defined inline in each of those page files, not in a shared component.

## 🧭 Navigation links
File: `components/navbar.tsx` → `NAV_LINKS` array.
