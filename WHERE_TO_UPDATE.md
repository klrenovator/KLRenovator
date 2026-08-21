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

### Keeping review counts truthful (issue #68)
`config/reviews.ts` → `googlePlace` (`totalReviews`, `averageRating`,
`lastUpdated`) is the single source of truth for every review-count claim
on the site. UI copy derives from it via `reviewCountLabel` ("88+"),
`reviewCount` and `reviewRatingLabel` ("5.0"); client widgets hydrate live
figures from `/api/google-reviews` when `GOOGLE_PLACES_API_KEY` +
`GOOGLE_PLACE_ID` are set. When the GBP count changes:
1. Update `googlePlace` in `config/reviews.ts` (also `reviewCount`/
   `reviewRating` inside `config/site/core.ts` are derived from it).
2. Run `npm run gen:site-public` (regenerates `config/site-public.ts` and
   `public/homepage-data.json`).
3. Sync the static AI-facing files, which cannot import config:
   `public/llms.txt`, `public/llms-full.txt`, `public/aeo-faq.txt`,
   `public/.well-known/ai-plugin.json`, `public/site-summary.json`.
4. Verify with:
   `grep -rn "88+" --include="*.txt" --include="*.json" public/` (replace
   `88+` with the new figure).

## 💰 Pricing
File: `config/site.ts` → `siteConfig.pricing.*`
Or: `config/services-data.ts` → `priceTable` for detailed service pages.

After changing any price in `site.ts`, run `npm run gen:site-public` — every
calculator reads prices from `config/site-public.ts`
(which is generated from `site.ts`), so they stay in sync automatically.

## 🧮 Calculators (shared logic)
- `lib/aircond-math.ts` — ALL calculation logic + non-published assumptions
  (wattage per HP, typical gas PSI, inverter savings %, drain pipe estimate
  rate). Every calculator imports from here.
- `config/tools.ts` — registry of tool URLs + trilingual display names
  (used by the `/tools` hub, footer, navbar, and every `ToolLinks` strip).
- `components/calculators/` — shared calculator UI + page layout + link strips.
  Every calculator component accepts a `lang` prop (`"en" | "ms" | "zh"`).
- `config/tool-content.ts` — trilingual SEO copy (h1, intro, how-it-works,
  factors, FAQs) for all 6 tools. EN/MS/ZH page files are thin wrappers
  around `getToolContent(key, lang)`.

## 🌐 Multilingual tool URLs
Every tool exists in 3 languages under the same slug:
- EN: `/aircond-installation-cost-calculator`
- MS: `/ms/aircond-installation-cost-calculator`
- ZH: `/zh/aircond-installation-cost-calculator`
Same pattern for `/tools`, `/aircond-gas-topup-cost-calculator`,
`/which-aircond-service-do-i-need`, `/aircond-size-calculator`,
`/aircond-electricity-cost-calculator`, `/aircond-savings-calculator`.
Add a new ms/zh page to `app/sitemap.ts` (trilingual
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

## 📅 Booking form (`/book` and `/admin/bookings`)
File: `components/booking-form.tsx`
- Labels/placeholders for all 3 languages live in the `FORM_TXT` object at the
  top (`en` / `ms` / `zh`) — add a key to all three when adding a field.
- Dropdown choices: `SERVICE_OPTS`, `AIRCOND_OPTS`, `SIZE_OPTS`,
  `PROPERTY_OPTS`, `PIPE_RUN_OPTS`, `UNIT_SUPPLY_OPTS`.
- **Job Details / Notes** — optional free-text box where the customer can
  describe the job (fault symptoms, access, preferred timing). Capped by
  `MAX_NOTES_LENGTH` in `lib/booking-validation.ts` (single source of truth for
  both the on-screen counter and the server check). The note is saved to
  `bookings.notes`, added to the Google Calendar event, and included in the
  WhatsApp confirmation message.
  ⚠️ Requires the `notes` column in Supabase — run `scripts/sql/add-booking-notes.sql`
  once in the Supabase SQL editor.
- Server-side rules (phone format, working hours, quantity caps, notes length):
  `lib/booking-validation.ts`. Job durations: `lib/booking-config.ts`.
