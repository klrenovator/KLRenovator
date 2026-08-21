# Image usage map — real job photo catalog

Gallery catalog (`/gallery` + `GALLERY_ITEMS`) is the canonical library of
157 KL Renovator work photos. The explicit editorial assignments below use at
most one unique photo per listed slot.

Programmatic body imagery (kampung, brand-area, area, brand, problem, tool,
index and utility pages) deterministically reuses this same verified pool via
`config/place-job-photos.ts`. The route key and brand/area/service hints keep a
URL's selection stable across builds while distributing the photos across the
site; those URL-level reuse assignments are intentionally generated rather
than manually listed here.

## Services (10 unique)

| Image | Used on |
|---|---|
| acson-aircond-chemical-wash-shah-alam-49.webp | Pressure Chemical Wash |
| acson-aircond-chemical-overhaul-puchong-38.webp | Chemical Overhaul |
| acson-aircond-gas-topup-r32-subang-jaya-27.webp | Gas Top-Up |
| aircond-repair-technician-klang-valley.webp | Troubleshooting & Repairs |
| aircond-bracket-installation-kl-renovator.webp | New Unit Installation |
| acson-aircond-basic-servicing-kuala-lumpur-5.webp | Basic Servicing |
| aircond-ceiling-cassette-installation-commercial.webp | Ceiling Cassette |
| aux-aircond-dismantle-relocation-kuala-lumpur-9.webp | Dismantle & Relocation |
| acson-aircond-pcb-board-repair-klang-71.webp | Emergency Repair |
| aux-aircond-basic-servicing-shah-alam-53.webp | Maintenance Contract |

## Service page photo galleries (`config/service-gallery.ts`)

Every service page (EN / MS / ZH) now renders **at least 3 photos of that
service** — the service hero photo plus a dedicated set below it. Captions and
alt text are trilingual, so the same photo never repeats identical alt text
across locales. Add or swap photos in `config/service-gallery.ts` only.

| Service page | Photos (in addition to the service hero above) |
|---|---|
| New Unit Installation | generic-aircond-new-installation-subang-jaya-127 · -puchong-139 · -rawang-159 · -kuala-lumpur-116 |
| Pressure Chemical Wash | generic-aircond-chemical-wash-klang-138 · -shah-alam-119 · -puchong-121 · hisense-aircond-chemical-wash-klang-111 |
| Chemical Overhaul | generic-aircond-chemical-overhaul-cheras-142 · -kuala-lumpur-143 · lg-aircond-chemical-overhaul-klang-62 · york-aircond-chemical-overhaul-subang-jaya-26 |
| Gas Top-Up | generic-aircond-gas-topup-ampang-122 · -cheras-151 · acson-aircond-gas-topup-r410a-petaling-jaya-16 · aircond-gas-topup-r32-r410a-selangor |
| Troubleshooting & Repairs | generic-aircond-troubleshooting-repair-petaling-jaya-108 · -puchong-130 · lg-aircond-troubleshooting-repair-petaling-jaya-18 · aircond-sensor-replacement-klang-valley |
| Basic Servicing | generic-aircond-basic-servicing-cheras-124 · -shah-alam-110 · -ampang-104 · lg-aircond-basic-servicing-subang-jaya-29 |
| Ceiling Cassette | generic-aircond-ceiling-cassette-service-puchong-112 · daikin-aircond-ceiling-cassette-service-shah-alam-56 · panasonic-aircond-ceiling-cassette-service-klang-68 |
| Dismantle & Relocation | generic-aircond-dismantle-relocation-ampang-158 · daikin-aircond-dismantle-relocation-puchong-45 · aircond-installation-ampang-selangor · aircond-new-installation-rawang-selangor |
| Emergency Repair | generic-aircond-water-leak-fix-klang-102 · acson-aircond-water-leaking-fix-shah-alam-60 · daikin-aircond-water-leaking-fix-kuala-lumpur-12 · isonic-aircond-troubleshooting-repair-klang-66 |
| Maintenance Contract (AMC) | generic-aircond-basic-servicing-shah-alam-146 · -cheras-133 · -puchong-103 · hisense-aircond-basic-servicing-ampang-113 |

## Homepage hero slideshow (15 unique — `components/sections/hero.tsx`)

The homepage hero rotates through 15 photos (5s each, one at a time, respecting
`prefers-reduced-motion`). Homepage-only — none of these appear on a service,
area, brand or problem page.

| Image | Used on |
|---|---|
| york-aircond-chemical-wash-puchong-37.webp | Homepage hero slide 1 (+ installation spotlight, OG image) |
| daikin-aircond-new-installation-ampang-131.webp | Homepage hero slide 2 |
| isonic-aircond-ceiling-cassette-service-puchong-44.webp | Homepage hero slide 3 (ceiling cassette) |
| aux-aircond-new-installation-subang-jaya-31.webp | Homepage hero slide 4 |
| sharp-aircond-chemical-wash-rawang-114.webp | Homepage hero slide 5 |
| aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp | Homepage hero slide 6 (ceiling cassette) |
| aux-aircond-gas-topup-r410a-klang-64.webp | Homepage hero slide 7 |
| generic-aircond-chemical-overhaul-klang-129.webp | Homepage hero slide 8 |
| daikin-aircond-basic-servicing-ampang-140.webp | Homepage hero slide 9 |
| isonic-aircond-new-installation-shah-alam-55.webp | Homepage hero slide 10 |
| generic-aircond-new-installation-kuala-lumpur-152.webp | Homepage hero slide 11 |
| midea-aircond-chemical-overhaul-shah-alam-50.webp | Homepage hero slide 12 |
| generic-aircond-basic-servicing-kuala-lumpur-161.webp | Homepage hero slide 13 |
| generic-aircond-new-installation-petaling-jaya-126.webp | Homepage hero slide 14 |
| generic-aircond-chemical-overhaul-shah-alam-128.webp | Homepage hero slide 15 |

## Other pages / sections (12 unique)

| Image | Used on |
|---|---|
| york-aircond-chemical-wash-puchong-37.webp | Homepage hero + installation spotlight |
| generic-aircond-gas-topup-kuala-lumpur-107.webp | About — story |
| generic-aircond-gas-topup-rawang-123.webp | About — team Muhammad |
| aircond-compressor-bracket-installation-kl.webp | About — team Shahzaib |
| generic-aircond-gas-topup-shah-alam-101.webp | About — team Mudassar |
| generic-aircond-gas-topup-subang-jaya-136.webp | About — team Hamzah |
| aircond-pcb-board-replacement-kl.webp | Contact |
| lg-aircond-gas-topup-r32-shah-alam-51.webp | FAQ |
| lg-aircond-gas-topup-r410a-puchong-40.webp | Services index |
| midea-aircond-gas-topup-r32-puchong-39.webp | Problems index |

## Problems (20 unique)

| Image | Used on |
|---|---|
| midea-aircond-gas-topup-r410a-subang-jaya-28.webp | Problem: Aircond Not Cold |
| midea-aircond-water-leaking-fix-klang-72.webp | Problem: Water Leaking |
| daikin-aircond-compressor-replacement-subang-jaya-34.webp | Problem: Making Noise |
| mitsubishi-aircond-gas-topup-r32-kuala-lumpur-3.webp | Problem: Bad Smell |
| samsung-aircond-gas-topup-r32-klang-63.webp | Problem: Freezing Up |
| samsung-aircond-gas-topup-r410a-shah-alam-52.webp | Problem: Low Gas |
| toshiba-aircond-gas-topup-rawang-141.webp | Problem: Gas Leak |
| generic-aircond-compressor-replacement-puchong-157.webp | Problem: Compressor |
| daikin-aircond-pcb-board-repair-petaling-jaya-23.webp | Problem: PCB |
| york-aircond-gas-topup-r32-petaling-jaya-15.webp | Problem: Fan Not Working |
| generic-aircond-pcb-board-repair-klang-147.webp | Problem: Tripping Power |
| generic-aircond-pcb-board-repair-klang-156.webp | Problem: Remote Not Working |
| mitsubishi-aircond-water-leaking-fix-subang-jaya-36.webp | Problem: Indoor Unit Leaking |
| isonic-aircond-compressor-replacement-petaling-jaya-22.webp | Problem: Outdoor Unit Not Running |
| york-aircond-gas-topup-r410a-kuala-lumpur-4.webp | Problem: High Electricity Bill |
| isonic-aircond-pcb-board-repair-kuala-lumpur-11.webp | Problem: Weak Airflow |
| mitsubishi-aircond-pcb-board-repair-puchong-47.webp | Problem: Not Turning On |
| panasonic-aircond-pcb-board-repair-subang-jaya-35.webp | Problem: Blinking Light |
| panasonic-aircond-water-leaking-fix-petaling-jaya-24.webp | Problem: Water Dripping |
| york-aircond-pcb-board-repair-shah-alam-59.webp | Problem: Thermostat |

## Areas (16 unique — 24 remaining need photos)

| Image | Used on |
|---|---|
| york-aircond-water-leaking-fix-puchong-48.webp | Area: Kuala Lumpur |
| samsung-aircond-ceiling-cassette-service-kuala-lumpur-8.webp | Area: Petaling Jaya |
| tcl-aircond-ceiling-cassette-service-subang-jaya-32.webp | Area: Cheras |
| aircond-compressor-installation-new-kl.webp | Area: Shah Alam |
| aircond-new-compressor-installation-rawang.webp | Area: Subang Jaya |
| mitsubishi-aircond-compressor-replacement-shah-alam-58.webp | Area: Ampang |
| panasonic-aircond-compressor-replacement-puchong-46.webp | Area: Puchong |
| tcl-aircond-compressor-replacement-kuala-lumpur-10.webp | Area: Klang |
| york-aircond-compressor-replacement-klang-70.webp | Area: Kajang |
| generic-aircond-dismantle-relocation-kuala-lumpur-134.webp | Area: Batu Caves |
| generic-aircond-dismantle-relocation-petaling-jaya-135.webp | Area: Damansara |
| generic-aircond-dismantle-relocation-puchong-148.webp | Area: Bangsar |
| isonic-aircond-dismantle-relocation-subang-jaya-33.webp | Area: Mont Kiara |
| mitsubishi-aircond-dismantle-relocation-klang-69.webp | Area: Setapak |
| panasonic-aircond-dismantle-relocation-shah-alam-57.webp | Area: Sentul |
| tcl-aircond-dismantle-relocation-petaling-jaya-21.webp | Area: Selayang |

## Blogs (101 unique)

Every blog `image` field is now a distinct `/hero/` file. Full slug → file mapping is in `docs/image-assignment-map.json` under keys `blog:*`.

## Intentionally not given a work photo (no unused unique photo left)

- 24 remaining area pages
- All 20 brand pages (heroes + galleries cleared)
- 158 kampung pages
- Area / brand / kampung installation subpages
- Installation landings (1HP / 1.5HP / 2HP / wall / cassette / window / commercial / new-home / whole-house)
- Calculators, tools hub, near-me, price guides
- These pages now use the company logo for OG, or no work-photo hero
