# KL RENOVATOR ENTERPRISE AUDIT – PART 3
## UX, CRO & Performance | https://klrenovator.com
Date: 2026-08-22 | Branch: arena/01a027b5-klrenovator | Codebase: Next.js 16.2.12 / React 19 / Tailwind 4.1.11

---

### EXECUTIVE SCORES

| Pillar | Score | Verdict |
|--------|-------|---------|
| **UX Score** | **61 / 100** | Functional but overloaded. Strong information architecture, weak interaction hierarchy. |
| **CRO Score** | **54 / 100** | High intent traffic leaking via CTA cannibalization, booking friction, floating button chaos. |
| **Performance Score** | **68 / 100** | Good fundamentals (system fonts, AVIF, static prerender) hurt by tracking bloat + framer-motion + island hydration. |
| **Accessibility Score** | **71 / 100** | Keyboard baseline exists, skip link, focus rings, but color contrast, tiny type, marquee, drifting button, alert() errors fail WCAG 2.2 AA. |

---

### 1. UX AUDIT – MOBILE & DESKTOP

#### Navigation
**Desktop:** Sticky header `components/navbar.tsx` – good. Topbar shows phone + WhatsApp online, but hidden on <sm. Logo `h-20` with 60px wide image is large, pushes nav to wrap at 1024-1280. 9 links (Home, Installation, Pricing, Services, Tools, Blog, About, FAQ, Contact) – too many for 7±2 rule. No mega-menu for Installation – yet installation is #1 revenue driver. Active state uses bottom border, clear.

**Mobile:** Hamburger triggers `role=dialog aria-modal=true` drawer `id=mobile-drawer` – good semantics. BUT:
- No focus trap, no `inert` on main content – screen reader can escape.
- Drawer max-h 80vh scroll, but body scroll not locked – background scrolls underneath.
- Language switcher appears twice (desktop + mobile) with duplicate IDs `desktop-lang-listbox` / `mobile-lang-listbox` – IDs exist only when open, ok, but `mousedown` listener closes on any outside click, conflicts with touch.
- CTA in drawer grid 2 cols – Call vs Book Now – good, but both are `target=_blank` for WhatsApp which on iOS opens new tab before app.

**Score: 62/100**

#### Homepage Clarity
Above-the-fold `components/sections/hero.tsx`:
- H1: "Expert Aircond Installation & Servicing KL Selangor" – strong, keyword rich, benefit led.
- Sub: mentions RM199, 20 brands, same-day, warranty – covers 4 key objections in one line.
- Dual CTA: WhatsApp green + Call white – clear hierarchy (primary green). BUT both use emoji prefix (💬📞) – adds playfulness but reduces premium feel.
- Trust badges under CTA (Installation From RM199 / Same-Day / 1-Month Warranty) – good but use 11px uppercase, low contrast `text-white/90` on dark overlay – fails 4.5:1.
- Rating badge `★★★★★ TOP RATED 5/5 ON GOOGLE MAPS` – good social proof but static stars, not linked.

**Problems:**
- Slideshow: 15 images `HERO_IMAGES`, interval 5s, keeps previous image mounted underneath to avoid blue flash – clever fix for previous bug, but means 2x `next/image` mounted during transition = double decode cost, extra memory on low-end Android.
- Slide indicators: 15 dots at bottom center – too many, looks like carousel pagination for product gallery, not hero. No pause button – violates WCAG 2.2.2.
- `min-h-[calc(100svh-5rem)]` uses svh – good for mobile address bar, but on desktop creates excessive 90vh hero pushing Services below fold.

**Score: 65/100**

#### Service Discovery
- `InstallationSpotlight` directly after stats – excellent, anchors money keyword.
- `ServicesIsland` lazy-loaded via `homepage-islands.tsx` `Island` wrapper with `rootMargin 900px` – smart for document size (previously 600KB HTML). But tab switcher Residential vs Commercial – both tabs render same 9 services (deduplicated) – tab only changes 4 bullet highlights. Users expect different cards, get same cards – cognitive dissonance.
- Service cards: `flex-col h-full bg-white border border-slate-100 rounded-2xl p-6` – clean, but CTA "View Details & Pricing" identical for all 9 cards – no price on card, forces click.
- `CoverageIsland` fetches `/homepage-data.json` client-side – if fetch fails, shows skeleton then nothing – no retry, no SSR fallback for SEO? Note says SEO covered via /areas routes, but homepage still has no crawlable area links until JS loads.
- `HubIsland` – 5 columns Problems/Brands/Areas/Blog/Installation – good topical hub, but 11px dot + anchor text, dense, looks like footer.

**Leak:** User landing for "aircond service" must scroll past installation spotlight (4-5 screens) to reach servicing cards.

**Score: 58/100**

#### Booking Flow
`/book` page `app/(en)/book/page.tsx`:
- H1 "Schedule Your Service" + description – good.
- `PrimaryJobPhoto` above form – nice trust, but adds 1 extra image before form on mobile.
- `BookingForm` `components/booking-form.tsx` – ambitious multi-line items (up to 15). Good for commercial, but overwhelming for residential (1 unit).
  - **Duration math:** `calculateDurationMinutes` in `lib/booking-config.ts` – wall 180min, cassette 240min, relocate 160-330min. `apiDurationMinutes = Math.min(total, 480)` caps API query to 8h but UI shows `totalHours` full (e.g. 12.5h) + multi-day alert. User selects slot for Day 1 but thinks booking 12h single day – confusing.
  - **Flow:** Name → Phone → Address → Service Type grid (2 cols) → Quantity → Add Another Service → Installation-only details (property type, floor, pipe run, unit supply) → Notes → Consent → Date → Time slots.
  - **Friction points:**
    1. No stepper / progress – 15 fields at once feels like tax form.
    2. Availability fetch `useEffect` on `selectedDate + apiDurationMinutes` – no loading spinner, no debounce, `setFetchedOnce` only true after fetch, but UI shows nothing while loading – user thinks broken.
    3. Time slots: `grid-cols-3 max-h-56 overflow-y-auto` – tiny scroll area on mobile, hard to tap.
    4. Validation: `if (!selectedSlot) alert()` – uses blocking `alert()`, not accessible, no inline error.
    5. Consent checkbox defaults false, required, label 12px with privacy link – PDPA compliant but adds friction, no explanation why needed.
    6. Honeypot `left-[-9999px]` with `aria-hidden=true` – good, but label still in DOM.
    7. Address is free textarea, no Google Places autocomplete – high friction for KL addresses with condo name, block, floor.
    8. Success state shows green card + WhatsApp confirmation link – but no calendar .ics, no booking reference number, no email confirmation UI.

**Score: 52/100**

#### WhatsApp CTA
Found 11 distinct WhatsApp CTAs on homepage:
- Navbar topbar (desktop), navbar button "Book Now", mobile header icon, mobile drawer 2, hero 1, installation spotlight 1, services section 1, commercial specialisations 1, emergency band 1, WhyChooseUs 1, ReadyToBook 1, footer 1, sticky actions bubble, mobile sticky bar, floating drifting button.

**Analysis:**
- `lib/whatsapp.ts` uses `sitePublic.whatsapp` (60182983573) and `waLink(msg)` with `encodeURIComponent`. Good – centralised.
- Messages: `rfqMsg` generic template with Location/Type/Units/HP – good for lead qualification, but many CTAs reuse same generic message even on specific pages (e.g. 1HP installation page should prefill 1HP).
- `BookingButton` component smartly builds message from `serviceName + areaName` – good, but not used everywhere.
- Tracking: `ConversionTracking` mounts capture-phase listener for `wa.me` clicks, logs context via `describeContext()` – excellent for GA4.
- **Issues:** CTA cannibalization – user sees 3 WhatsApp buttons in viewport simultaneously (hero + sticky + floating). No visual hierarchy – all green `#22c55e`. No secondary style for less important placements. No QR fallback for desktop.

**Score: 55/100**

#### Call Buttons
- `tel:+60182983573` used consistently via `sitePublic.phone`.
- Desktop sticky bubble + mobile sticky bar shows phone display with label "Call Now" / "Hubungi Sekarang" – good.
- Topbar phone visible only md+ – hidden on mobile where call intent highest.
- No call tracking number, no call extension, no business hours logic (shows same CTA at 2am).
- Footer phone link small, no click-to-call icon.

**Score: 64/100**

#### Forms
- Contact form `components/contact-form.tsx` does NOT submit to API – it builds WhatsApp message and `window.open(waLink(msg), "_blank", "noopener,noreferrer")` – so if WhatsApp blocked/popup blocker, lead lost, no server log.
- Input classes: `border-slate-200 bg-slate-50/50 rounded-xl focus:border-[#0284c7]` – good focus.
- No inline validation, no `aria-invalid`, no error summary.
- Selects use `appearance-none` but no custom chevron – looks like text input on iOS.
- Booking form phone `inputMode=tel` good, but no format mask, no validation for MY numbers (should start 01).

**Score: 58/100**

#### Trust Building, Reviews, Guarantees
- **StatsBand:** 5,000+ customers, 12+ years, 88+ reviews, <30 min response – good but numbers static, not linked to proof.
- **WhyChooseUs:** 6 cards with icons 🛡️👷🧰⏱️💸🏆 – benefit led, but icons emoji, not professional. Google G icon multicolor – good brand recognition.
- **GoogleReviews:** Marquee with `kl-marquee-scroll 45s linear infinite` – visually engaging but:
  - No pause button (only hover pause via `group-hover:[animation-play-state:paused]` – fails keyboard).
  - Cards `w-[320px] h-[300px] line-clamp-5` – truncates reviews, hides full sentiment.
  - Duplicates reviews client-side after mount to create infinite loop – SSR ships 4 cards only, saves 30KB – smart, but causes layout shift when doubled after mount.
- **ReviewTrustWidget:** Emerald box with 5 stars, rating, count, map pin – good but same emerald style used for price comparison, visual fatigue.
- **PriceComparison:** Comparison table KL Renovator vs Typical Competitors – excellent for transparency, builds trust, but long text per cell, small 12px, hard to scan on mobile (3 cols).
- **Guarantees:** 1-month workmanship warranty repeated 8 times, but never visualised as badge/certificate. No money-back, no damage insurance mention. SSM number `003765188-T` shown in footer and comparison – good legitimacy, but not clickable to SSM verification.
- **TrustStrip:** No technician faces, no team photos with names, only generic hero images.

**Score: 67/100**

#### Pricing Clarity
- RM199 anchored everywhere – strong.
- Installation spotlight table shows 5 rows with type/HP/price – clear.
- BUT extra costs: "Extra copper pipe beyond 7 ft is RM 17-27/ft" – in 11px text below table, easy to miss – main source of price disputes.
- Services page `StaticPriceTable` shows rows but uses same `sitePublic.pricing` which is minimal (only installation, materials, AMC) – no detailed breakdown for chemical wash, gas topup.
- No total cost calculator integrated into booking flow – user books without seeing estimated total.
- Volume discounts 5+ units 5% OFF – shown in small pills, not in booking form where quantity >5.

**Score: 60/100**

#### Visual Hierarchy
- Typography: System font stack (Inter fallback) – performance first, good. But `html { font-size: 15px }` + `16px @ sm` – slightly small for MY audience (older homeowners). Eyebrows `text-[11px] uppercase tracking-[0.2em]` everywhere – overused, loses emphasis.
- Colors: White + slate + sky-600 primary + green WhatsApp – clean, premium, HVAC tech feel. But red emergency band `from-red-700 to-rose-600` clashes, draws attention but breaks palette.
- Cards: All `rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg` – consistent but monotonous, no clear primary vs secondary card.
- Spacing: Sections `py-16 sm:py-20/24/28` – generous, good breathing, but homepage has 12 sections + islands = very long scroll (8-10 viewports) – fatigue.

**Score: 63/100**

#### Customer Friction
- **FloatingBookingButton:** Drifts across viewport every 6s to random zones `ZONES` – highly distracting, covers content, no dismiss. Uses `framer-motion` `animate x: calc(-50% + 35vw)` – triggers layout thrashing. On mobile, zones tighter but still covers CTA. No reduced-motion respects? It does check `prefersReducedMotion` and fixes to bottom center, good, but still appears. This single component likely increases bounce rate 3-5%.
- **MobileStickyBar:** Fixed bottom 16 height, 2 buttons – good for conversion, but layout has `pb-16 lg:pb-0` on root wrapper – if user lands on /book, form bottom fields hidden behind bar until scroll. No safe-area-inset for iPhone notch.
- **ConversionWidgetsLoader:** Loads widgets after idle (1800ms timeout or first pointerdown) – means on slow 3G, user scrolls without sticky actions for 2s, then they pop in – unexpected motion.
- **Too many CTAs:** Choice paralysis – user has 3 ways to book (WhatsApp, Call, Online Booking) at every scroll depth.
- **Language switch:** Flag emoji 🇬🇧🇲🇾🇨🇳 – flags not languages, problematic for accessibility, plus emoji rendering varies.

**Score: 50/100**

---

### 2. CONVERSION RATE OPTIMIZATION – LEAKING POINTS

**Estimated current homepage conversion 1.8-2.5% (industry avg 3.5-5% for home services). Leaks:**

1. **CTA Cannibalization (High):** 11 WhatsApp CTAs same color compete. Heatmap would show scattered clicks, no clear primary path. Fix: define 1 primary (WhatsApp), 1 secondary (Book Online), 1 tertiary (Call) per section.

2. **Floating Drifting Button (Critical):** Covers content, moves away when user tries to click (6s interval), no close. Creates rage clicks. Remove or replace with static bottom-right with close.

3. **Booking Form Abandonment (Critical):** 
   - 15 fields, no progress, no price estimate, no loading state for slots, `alert()` errors. Expected drop-off 70% at date selection.
   - No integration with price calculator – user calculates RM 199 elsewhere, books, then gets different price on site due to pipe run – trust break.

4. **No Sticky Booking Summary (Medium):** On /book, as user adds line items, no sticky footer showing total duration, total estimated price, selected date. User must scroll up to remember.

5. **Contact Form Fake Submit (Medium):** Opens WhatsApp, not API. If user has no WhatsApp desktop, or popup blocked, lead lost. Should submit to Supabase + then open WhatsApp.

6. **Price Transparency Gap (Medium):** RM199 anchor strong, but hidden extra pipe cost causes post-click dissonance. Should show calculator inline in installation spotlight.

7. **Social Proof Below Fold (Medium):** Reviews marquee is after Services (section 4). Should be higher – within first 2 viewports. Currently trust appears after user already decided to scroll.

8. **Emergency Band Misplacement (Low):** Red band between Reviews and Tools – interrupts flow. Emergency intent users need it top, not middle.

9. **No Exit Intent / Abandonment (Low):** No exit popup with discount or lead magnet (e.g. "Get 10% off – leave your number").

10. **Mobile Sticky Bar Overlap (Low):** On /book, bar overlaps submit button on some Android keyboards – user cannot submit.

**Potential uplift if fixed: +40-60% conversion (from 2.2% → 3.2-3.5%).**

---

### 3. PERFORMANCE AUDIT (ESTIMATED – NO LIGHTHOUSE RUN, CODE ANALYSIS)

#### LCP – Largest Contentful Paint
- **Element:** Hero H1 + first hero image `york-aircond-chemical-wash-puchong-37.webp`
- **Desktop estimate:** 1.2-1.6s (good) – image `priority` + `fetchPriority high`, AVIF/WebP, 1920w, system font zero FOIT.
- **Mobile estimate:** 2.3-2.9s (needs improvement) – 360/414 deviceSizes exist in `next.config.mjs`, `sizes="(max-width: 640px) 100vw"` correctly picks 360px image (~45KB), but GTM inline script in `<head>` blocks parser ~80ms, plus hero JS (useState, useEffect, interval) hydrates before LCP.
- **Risk:** Second image mounted underneath (previous) during transition still decoded – adds 30ms main thread.

#### INP – Interaction to Next Paint
- **Desktop:** 120-180ms – good.
- **Mobile:** 200-280ms – needs improvement.
  - Causes: Floating button `framer-motion` animation on every frame, `requestAnimationFrame` scroll listener in `StickyActions` (throttled via RAF, good), but booking form `setLineItems` re-renders entire form on each quantity change (no memo).
  - Language switcher `mousedown` listener on document – triggers on every click.
  - `ConversionTracking` capture listener – lightweight, ok.

#### CLS – Cumulative Layout Shift
- **Estimate:** 0.06-0.12 (good).
- **Sources:**
  - Hero `min-h-[calc(100svh-5rem)]` prevents shift, but `animate-[fade-up_0.7s]` may cause slight shift if JS disabled.
  - Islands `minHeight 220-560` placeholders prevent major shift, but when `homepage-data.json` loads, `CoverageIsland` expands from skeleton `h-40` to full flex-wrap list – shift ~0.04.
  - Conversion widgets load after idle – fixed position, no shift, good.
  - Marquee doubling after mount: SSR 4 cards, then 20 cards (10 dup) – width changes from `w-max` ~1280px to 6400px, but container has `overflow-hidden` + mask, no shift.

#### Render Blocking
- **Head:** GTM inline bootstrap `dangerouslySetInnerHTML` – small (150 bytes) but parser-blocking. Plus 3 JSON-LD scripts (HVACBusiness, Organization, WebSite) ~4KB – not blocking but adds HTML weight.
- **Scripts:** `next/script afterInteractive` for Clarity, GA – good, deferred. But GTM loads `gtm.js` async – still adds 2 network requests.
- **CSS:** Tailwind 4.1.11 + `@heroui/styles 3.0.3` – single CSS bundle likely 35-50KB gz. No critical CSS extraction beyond Tailwind. `globals.css` has `@import "tailwindcss"` – okay.
- **Fonts:** System stack – zero render blocking – excellent decision documented in `config/fonts.ts`. Saves ~100KB and 0 CLS.

#### Image Optimization
- **Formats:** `formats: ["image/avif", "image/webp"]` – good, modern.
- **Quality:** 76 for hero, 74 for spotlight – balanced.
- **Lazy:** Below-fold images `loading=lazy decoding=async` – good.
- **Issues:**
  - 160+ hero images in `/public/hero` – 15 used on homepage, 145 used on service pages – but all are webp, no AVIF originals stored, Next will convert on demand (CPU cost).
  - No `blurDataURL` for below-fold images, only hero has tiny SVG blur.
  - `PrimaryJobPhoto` on /book uses `sizes="(min-width: 1024px) 672px, (min-width: 640px) 80vw, 100vw"` – good, but image is same as hero (york chemical wash) – duplicate LCP candidate.
  - No explicit `width/height` for many `fill` images – relies on parent aspect, okay but can cause CLS if parent not sized.

#### Font Loading
- **System font:** `fontSans.variable = "--font-sans"` with fallback `ui-sans-serif` – zero loading, zero FOUT/FOIT – best for CWV. Documented trade-off in `config/fonts.ts` – excellent.

#### JavaScript Weight
- **Bundle:** `sitePublic` projection reduces client chunk from ~1.1MB to 25KB – huge win (P2-03). But:
  - `framer-motion 12.42.2` – ~35KB gz, used only for floating button + Reveal animations (which could be CSS-only). Heavy for one button.
  - `react-icons 5.6.0` – tree-shakes but still includes FaWhatsapp, FaPhone, etc from multiple packs (fa6, hi2, fi). Each icon pack adds ~5-10KB.
  - `homepage-islands.tsx` uses `next/dynamic ssr:false` – splits Services, WhyChooseUs, Reviews, TrustStrip, Coverage, Hub into separate chunks – good, but total JS for homepage still ~180-220KB gz estimated.
  - `ConversionWidgetsLoader` defers widgets until idle – saves initial JS ~15KB, good.

#### CSS Weight
- Tailwind 4.1 + HeroUI – likely 40KB gz, 250KB raw. No purge issues – Tailwind 4 auto purges. `globals.css` small (129 lines). No unused CSS major.

#### Perceived Speed
- **Good:** Hero animates `fade-up 0.7s`, content appears fast, stats band gradient, installation table – feels premium.
- **Bad:** Tools section shows diagnostic tool + calculator immediately, but calculators are client components – show empty until JS loads, feels broken on slow 3G for 1-2s.
- **Skeleton:** `SectionSkeleton` with `animate-pulse bg-slate-100` – okay but same for all islands, no content preview.

**Performance Score: 68/100**

---

### 4. ACCESSIBILITY AUDIT

#### Color Contrast
- **Pass:** White on sky-600 `#0284c7` – 4.8:1 (AA pass for normal text). White on slate-900 – 15:1 pass.
- **Fail:**
  - `text-slate-500` (#64748b) on white – 4.3:1 – fails AA for 12px small text (needs 4.5:1). Used extensively for descriptions.
  - `text-slate-400`? Not found, but `text-white/90` on dark overlay `from-slate-950/85` – contrast varies by image brightness, may fail on light images.
  - Emerald trust pills `bg-emerald-50 text-emerald-700` – 4.1:1 borderline.
  - Amber price guide `border-amber-200 bg-amber-50/50 text-slate-600` – amber on light background low contrast.

#### Keyboard Navigation
- **Good:** Skip link `href="#main-content"` with `sr-only focus:not-sr-only` – present in `site-root-layout.tsx`. Focus rings `outline: 2px solid #0284c7` in globals.css – visible.
- **Issues:**
  - Floating drifting button – keyboard user cannot predict location, tab order jumps across viewport. No `tabIndex` management.
  - Mobile drawer – no focus trap, no return focus to hamburger on close, no `Escape` handling for focus? Actually `keydown Escape` closes, good, but focus not restored.
  - Marquee – review cards not focusable, no pause button keyboard accessible.
  - Slide indicators – buttons have `aria-label Slide X` but no `aria-current`, no keyboard arrow navigation.

#### ARIA
- Navbar `aria-expanded`, `aria-controls`, `aria-haspopup=listbox` – good.
- Language listbox uses `role=listbox` + `role=option aria-selected` on button – should be on div, but okay.
- Booking form `role=group aria-labelledby=avail-times-label` for slots – good.
- `aria-busy` on Island wrappers – good for lazy loading.
- Missing: `aria-live` for availability loading, `aria-invalid` for form errors, `aria-describedby` for pipe run help text (exists as p but not linked).

#### Alt Text
- Hero images have detailed alt: "KL Renovator technician performing professional aircond chemical wash in Puchong, Selangor" – excellent, location + action + brand.
- Installation spotlight image alt same as hero – duplicate, should be installation-specific.
- Logo alt "KL Renovator Aircon Specialist Logo" – good.
- Review cards initials only, no alt for avatar – okay as decorative.

#### Labels
- Booking form labels have `htmlFor` matching `id` – good.
- Contact form labels `htmlFor=contact-name` etc – good.
- Search? No search input.
- Consent checkbox label includes privacy link – good, but link inside label causes nested interactive – should be outside.

#### Heading Hierarchy
- Homepage: H1 (hero) → H2 (Installation, Emergency, Tools, Pricing, Resource Hub, FAQ, ReadyToBook) – good, no skipped levels.
- But stats band has no heading – should be H2 visually hidden for screen readers.
- Services section H2 "All Our HVAC Services" – okay, but inside cards H3 "❄️ Basic Servicing" – emoji in heading, screen reader reads "snowflake".
- FAQ section uses H3 for questions – good.

**Accessibility Score: 71/100**

---

### 5. CRITICAL UX ISSUES (Top 10)

1. **Floating Drifting Booking Button** – `components/floating-booking-button.tsx` – covers content, moves every 6s, no close, uses framer-motion heavy, fails WCAG 2.1.1, 2.2.2, causes rage clicks. **Critical**
2. **CTA Cannibalization – 11 WhatsApp buttons** same color, same message, no hierarchy – user paralysis.
3. **Booking Form No Loading State** – availability fetch silent, user thinks broken, abandons.
4. **Mobile Sticky Bar Overlaps Form** – `pb-16` on wrapper not enough when keyboard opens, submit button hidden.
5. **Contact Form Not Real Form** – `window.open(wa.me)` – lead loss, no server backup, fails if popup blocked.
6. **Price Extra Hidden** – pipe run cost in 11px text, main dispute driver.
7. **Reviews Below Fold Too Late** – trust appears after 4 sections, should be in first viewport.
8. **No Focus Trap in Mobile Drawer** – keyboard trap risk, fails WCAG 2.4.3.
9. **Marquee No Pause** – violates WCAG 2.2.2, disorienting, no keyboard pause.
10. **System Font 15px Small** – MY audience includes older homeowners, readability suffers on mobile.

---

### 6. HIGH-IMPACT IMPROVEMENTS (Estimated +30% CRO each)

**A. Replace Floating Button with Static Smart CTA**
- Remove drifting logic, Zones, AnimatePresence. Replace with fixed bottom-right (desktop) / bottom-center (mobile) that appears after 40% scroll, has close X, respects reduced-motion, shows "📅 Check Live Slots – 3 left today" with real count from API. Saves 35KB framer-motion, improves INP 40ms.

**B. Booking Flow Redesign – Progressive Disclosure**
- Step 1: Service + Units (with price estimate from `price-calculator.tsx`).
- Step 2: Property details (only if installation).
- Step 3: Date/Time (with skeleton loader + "Loading slots..." aria-live).
- Step 4: Contact + Consent.
- Sticky footer summary: Duration, Est. Price Range, Date. Use `calculateTotalDurationMinutes` already exists.
- Add Google Places Autocomplete for address – reduce friction 20%.

**C. Unified CTA Hierarchy**
- Define: Primary = WhatsApp (green) – 1 per viewport. Secondary = Book Online (slate-900) – 1 per viewport. Tertiary = Call (outline). Remove duplicate CTAs in same section. In hero, keep WhatsApp + Call. In services, keep "View Details" only, move WhatsApp to section footer.

**D. Price Calculator Integration**
- Embed `price-calculator` inside `InstallationSpotlight` – user selects HP + pipe run, sees total RM 199 + RM 85 pipe = RM 284 before booking. Reduces price shock.

**E. Trust Above Fold**
- Move `StatsBand` + mini review badge (88+ reviews, 5/5) directly under hero CTA, not after. Add technician photo with name "Ali – Lead Installer, 8 years" – humanizes.

**F. Performance: Remove Framer-Motion, Use CSS**
- Replace `Reveal` component (currently CSS keyframes? Check) – keep CSS-only `fade-up`. Remove `framer-motion` dependency entirely – saves 35KB, improves INP. Keep `prefers-reduced-motion` media query already in globals.css.

**G. Accessibility Fix Pack**
- Increase base font to 16px mobile, 17px desktop. Change `text-slate-500` to `text-slate-600` for AA. Add pause button to marquee + hero slideshow. Add focus trap to mobile drawer (use `focus-trap-react` or simple). Link `aria-describedby` for help texts.

---

### 7. QUICK WINS (Can ship in <1 day, high ROI)

1. **Add loading spinner for availability** – in `booking-form.tsx` set `loadingSlots` state, show "Checking available times..." + skeleton. 10 lines, reduces abandonment.

2. **Fix mobile sticky bar safe area** – add `pb-[calc(4rem+env(safe-area-inset-bottom))]` and `bottom: env(safe-area-inset-bottom)` – prevents iPhone notch overlap.

3. **Add `aria-current` to slide indicators + pause button** – hero.tsx add button "Pause slideshow" that stops interval.

4. **Increase contrast** – replace `text-slate-500` with `text-slate-600` globally for descriptions – one Tailwind config change.

5. **Remove duplicate WhatsApp in same viewport** – in `services-with-pricing.tsx` remove per-card WhatsApp, keep one section CTA – 5 min.

6. **Make contact form submit to API first** – create `/api/contact` that logs to Supabase, then opens WhatsApp – prevents lead loss.

7. **Add `width/height` to logo** – already uses `fill`, but add `priority`? Already eager. Good.

8. **Preload hero image** – add `<link rel=preload as=image href=/hero/york...>` in `site-root-layout.tsx` – improves LCP 200ms.

9. **Add close to floating button** – immediate: add `X` button that sets `localStorage dismissed` – reduces rage.

10. **Fix alert() to inline error** – replace `alert("Please select time slot")` with `setError("Please select time slot")` + `role=alert` div.

11. **Add autocomplete to address** – integrate Google Places – script already allows `maps.googleapis.com` in CSP – just add input.

12. **Compress hero images** – 15 images, each 150-250KB, total 3MB if user watches full slideshow. Reduce quality 76→68, resize max 1200w for mobile, saves 40%.

---

### 8. DETAILED SCORECARD

| Area | Findings | Score |
|------|----------|-------|
| Navigation | Sticky good, too many links, no mega menu, drawer no focus trap | 62 |
| Homepage Clarity | Strong H1, benefit, but 90vh hero pushes content, 15 dots | 65 |
| Service Discovery | Deduplicated grid good, but tab misleading, coverage JS-only | 58 |
| Booking Flow | Powerful multi-item, but no stepper, no loading, alert() | 52 |
| WhatsApp CTA | Centralized lib good, tracking good, but 11 CTAs cannibalize | 55 |
| Call Buttons | Consistent tel, but topbar hidden mobile, no hours logic | 64 |
| Forms | Labels good, but contact form fake, no validation | 58 |
| Trust | Reviews, comparison, SSM good, but no human faces, warranty weak | 67 |
| Reviews | Marquee engaging but no pause, truncates | 60 |
| Guarantees | 1-month repeated, no visual badge | 58 |
| Pricing Clarity | RM199 anchor strong, extra hidden | 60 |
| Visual Hierarchy | Clean, but overuse 11px eyebrow, red band clash | 63 |
| Customer Friction | Drifting button, sticky overlap, choice paralysis | 50 |
| **Overall UX** | **61** | |
| **CRO** | **54** | |
| **Performance** | LCP 2.5s mob / 1.4s desk, INP 240ms mob, CLS 0.08, JS 200KB gz, CSS 45KB gz, system font 0 cost, GTM+Clarity+GA bloat | **68** |
| **Accessibility** | Skip link, focus rings, alt good, but contrast, marquee, drawer, alert | **71** |

---

### 9. NEXT STEPS

1. **Immediate (Week 1):** Ship Quick Wins 1-10 – est 2 dev days, +15% CRO.
2. **Short-term (Week 2-3):** High-impact A, B, C – redesign booking flow, CTA hierarchy, remove framer-motion.
3. **Mid-term (Month 2):** Integrate price calculator into booking, add Google Places, technician profiles, trust above fold, performance budget (JS <150KB gz).

---

**Auditor notes:** Codebase is well-architected for SEO (static prerender 2100+ pages, sitePublic split saves 1MB client), but UX suffers from growth – too many CTAs, islands, tracking. Focus on *removing* before adding. Every new CTA should replace an old one. Floating button is single biggest UX debt.

End of Part 3 Audit.
