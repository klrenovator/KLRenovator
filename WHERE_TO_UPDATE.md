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
- `config/tools.ts` — registry of tool URLs (used by the `/tools` hub,
  footer, navbar, and every `ToolLinks` strip). Add a tool here and it
  appears everywhere.
- `components/calculators/` — shared calculator UI + page layout + link strips.
- `lib/aircond-assistant.ts` — AI assistant engine (knowledge base + intent
  matching). It reads prices live from `sitePublic.pricing`.
- `app/aircond-assistant/page.tsx` — AI assistant page.

## 📚 Tool pages (SEO content)
Each calculator page (`app/aircond-*-calculator/page.tsx`, `/tools`,
`/which-aircond-service-do-i-need`, `/aircond-assistant`) is content in
`ToolPageLayout` props: FAQs, how-it-works steps, factors, intro. The layout
generates the WebApplication / FAQPage / HowTo / Breadcrumb JSON-LD automatically.

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
