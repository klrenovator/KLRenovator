// ─────────────────────────────────────────────────────────────────────────
// AUTO-GENERATED — do not edit by hand.
// Regenerate with:  npm run gen:site-public
//
// WHY THIS FILE EXISTS
// ────────────────────
// `config/site.ts` is ~1.1 MB of source (39 areaPages + 158 kampungPages +
// 20 brandPages + 20 problemPages, each carrying full EN/MS/ZH prose and
// FAQ arrays). It is perfect for SERVER components and schema builders.
//
// But 25+ CLIENT components ("use client") were importing it just to read
// two or three tiny fields — most commonly `siteConfig.phone`. Because a
// client import pulls the whole module into the browser bundle, every page
// was shipping a ~1 MB (220 KB gzipped) chunk to users. That single chunk
// was loaded by 83 of 130 route groups.
//
// This file is the small, client-safe projection of that data. Client
// components import `sitePublic` from here; server components keep using
// the full `siteConfig`. Nothing here should ever contain long-form prose,
// FAQ arrays, or per-kampung content.
// ─────────────────────────────────────────────────────────────────────────

// NOTE: deliberately NOT `as const`. The original `siteConfig` object is a
// plain (widened) object literal, so consumers expect `string` / `string[]`
// rather than literal-union and fixed-length tuple types. Using `as const`
// here made `.filter()` results unassignable to the arrays they feed and
// broke `<select>` state typing in the contact form.
export const sitePublic = {
  "name": "KL Renovator",
  "legalName": "Multicore Dynamics Resources",
  "ssm": "003765188-T",
  "ssmFull": "202503227236 (003765188-T)",
  "tagline": "Aircond Installation, Servicing & Repair KL & Selangor",
  "phone": "+60182983573",
  "phoneDisplay": "+60 18-298 3573",
  "whatsapp": "60182983573",
  "whatsappLink": "https://wa.me/60182983573?text=Hi%20KL%20Renovator,%20I%20want%20to%20book%20an%20aircond%20service%20for%20my%20home/office.",
  "email": "info@klrenovator.com",
  "hours": "Mon–Sun · 9:00 AM – 6:00 PM (Everyday Open)",
  "reviewCount": 500,
  "reviewRating": 5,
  "areas": [
    "Kuala Lumpur",
    "Cheras",
    "Ampang",
    "Setapak",
    "Wangsa Maju",
    "Kepong",
    "Sri Petaling",
    "Bukit Jalil",
    "Mont Kiara",
    "Bangsar",
    "Desa ParkCity",
    "Taman Melawati",
    "Hulu Kelang",
    "Petaling Jaya",
    "Subang Jaya",
    "Shah Alam",
    "Puchong",
    "Damansara",
    "Kota Damansara",
    "Ara Damansara",
    "Sunway",
    "USJ",
    "Bandar Utama",
    "SS2",
    "Klang",
    "Port Klang",
    "Bukit Tinggi",
    "Setia Alam",
    "Meru",
    "Kota Kemuning",
    "Bukit Jelutong",
    "Glenmarie",
    "Batu Caves",
    "Selayang",
    "Rawang",
    "Kundang",
    "Sungai Buloh",
    "Kajang",
    "Semenyih",
    "Balakong",
    "Seri Kembangan",
    "Pandan Indah",
    "Bandar Puteri",
    "Putrajaya",
    "Cyberjaya",
    "Dengkil",
    "Selangor",
    "Sentul",
    "Bandar Botanic"
  ],
  "brandsSupported": [
    "Daikin",
    "Panasonic",
    "Mitsubishi",
    "Acson",
    "York",
    "Carrier",
    "Midea",
    "Haier",
    "Toshiba",
    "Hitachi",
    "Samsung",
    "LG",
    "Sharp",
    "Fujitsu",
    "Gree",
    "National",
    "Hisense",
    "Aux",
    "TCL",
    "Isonic"
  ],
  "stats": [
    {
      "label": "Happy Klang Valley Customers",
      "value": "5,000+"
    },
    {
      "label": "Years HVAC Experience",
      "value": "12+"
    },
    {
      "label": "5-Star Verified Reviews",
      "value": "500+"
    },
    {
      "label": "Emergency Response Time",
      "value": "< 30 min"
    }
  ],
  "volumeDiscounts": [
    {
      "units": "2 – 3 units",
      "off": "5% off instant booking discount"
    },
    {
      "units": "4 – 8 units",
      "off": "10% off instant booking discount"
    },
    {
      "units": "8+ units",
      "off": "15% off instant booking discount"
    }
  ],
  "links": {
    "whatsapp": "https://wa.me/60182983573",
    "facebook": "https://www.facebook.com/share/1DDDB3523A/",
    "instagram": "https://www.instagram.com/klrenovator?igsh=MTNqb3p1NDExZ3Boeg==",
    "tiktok": "https://www.tiktok.com/@klrenovator?_r=1&_t=ZS-96tR1k7aVU5",
    "googleMaps": "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
    "googleBusiness": "https://share.google/HhXvqWDkefZ5bzNdL",
    "twitter": "https://x.com/KlRenovator",
    "linkedin": "https://www.linkedin.com/in/kl-renovator-7912b7389"
  },
  "pricing": {
    "installation": {
      "title": "New Unit Installation",
      "rows": [
        {
          "label": "Wall-Mounted · 1.0 HP",
          "price": "RM 199"
        },
        {
          "label": "Wall-Mounted · 1.5 HP",
          "price": "RM 199"
        },
        {
          "label": "Wall-Mounted · 2.0 HP",
          "price": "RM 249"
        },
        {
          "label": "Wall-Mounted · 2.5 HP",
          "price": "RM 279"
        },
        {
          "label": "Wall-Mounted · 3.0 HP",
          "price": "RM 329"
        },
        {
          "label": "Wall-Mounted · 4.0 HP",
          "price": "RM 399"
        },
        {
          "label": "Wall-Mounted · 5.0 HP",
          "price": "RM 449"
        },
        {
          "label": "Ceiling Cassette · 1.0 – 1.5 HP",
          "price": "RM 290"
        },
        {
          "label": "Ceiling Cassette · 2.0 – 3.0 HP",
          "price": "RM 350"
        },
        {
          "label": "Ceiling Cassette · 3.5 – 6.0 HP",
          "price": "RM 400"
        }
      ],
      "note": "Standard installation includes 7ft copper pipe, wire, and drain pipe free. Anything beyond 7ft, or any bracket / casing / electrical / access work, is charged per the Additional Materials & Special Charges rates below."
    },
    "basicServicing": {
      "title": "Basic Servicing / Cleaning",
      "rows": [
        {
          "label": "Wall-Mounted · 1.0 – 1.5 HP",
          "price": "RM 99"
        },
        {
          "label": "Wall-Mounted · 2.0 – 2.5 HP",
          "price": "RM 120"
        },
        {
          "label": "Wall-Mounted · 3.0 – 3.5 HP",
          "price": "RM 150"
        },
        {
          "label": "Ceiling Cassette · 1.0 – 1.5 HP",
          "price": "RM 150"
        },
        {
          "label": "Ceiling Cassette · 2.0 – 3.0 HP",
          "price": "RM 200"
        },
        {
          "label": "Ceiling Cassette · 3.5 – 5.0 HP",
          "price": "RM 250"
        }
      ]
    },
    "chemicalWash": {
      "title": "Pressure Chemical Wash",
      "rows": [
        {
          "label": "Wall-Mounted · 1.0 – 1.5 HP",
          "price": "RM 120"
        },
        {
          "label": "Wall-Mounted · 2.0 – 2.5 HP",
          "price": "RM 150"
        },
        {
          "label": "Wall-Mounted · 3.0 HP",
          "price": "RM 180"
        },
        {
          "label": "Wall-Mounted · 4.0 – 5.0 HP",
          "price": "RM 200"
        },
        {
          "label": "Ceiling Cassette · 1.0 – 1.5 HP",
          "price": "RM 220"
        },
        {
          "label": "Ceiling Cassette · 2.0 – 3.0 HP",
          "price": "RM 280"
        },
        {
          "label": "Ceiling Cassette · 4.0 – 5.0 HP",
          "price": "RM 350"
        },
        {
          "label": "Window Unit · 1.0 – 2.0 HP",
          "price": "RM 130"
        },
        {
          "label": "Window Unit · 2.5 – 3.0 HP",
          "price": "RM 160"
        }
      ]
    },
    "chemicalOverhaul": {
      "title": "Chemical Overhaul",
      "rows": [
        {
          "label": "Wall-Mounted · 1.0 – 1.5 HP",
          "price": "RM 220"
        },
        {
          "label": "Wall-Mounted · 2.0 – 2.5 HP",
          "price": "RM 280"
        },
        {
          "label": "Wall-Mounted · 3.0 – 3.5 HP",
          "price": "RM 350"
        },
        {
          "label": "Ceiling Cassette · 1.0 – 3.0 HP",
          "price": "RM 430"
        },
        {
          "label": "Ceiling Cassette · 3.5 – 5.0 HP",
          "price": "RM 500"
        }
      ]
    },
    "gasTopup": {
      "title": "Gas Top-Up / Precision Balancing",
      "rows": [
        {
          "label": "R22 · 1.0 HP",
          "price": "RM 120"
        },
        {
          "label": "R22 · 1.5 – 2.0 HP",
          "price": "RM 150"
        },
        {
          "label": "R22 · 2.5 – 3.0 HP",
          "price": "RM 180"
        },
        {
          "label": "R410A · 1.0 HP",
          "price": "RM 150"
        },
        {
          "label": "R410A · 1.5 – 2.0 HP",
          "price": "RM 180"
        },
        {
          "label": "R410A · 2.5 – 3.0 HP",
          "price": "RM 200"
        },
        {
          "label": "R32 · 1.0 HP",
          "price": "RM 180"
        },
        {
          "label": "R32 · 1.5 – 2.0 HP",
          "price": "RM 200"
        },
        {
          "label": "R32 · 2.5 – 3.0 HP",
          "price": "RM 220"
        }
      ]
    },
    "repair": {
      "title": "Troubleshooting & Component Repair",
      "rows": [
        {
          "label": "Diagnostic Fee (waived with repair)",
          "price": "RM 88"
        },
        {
          "label": "Capacitor Replacement",
          "price": "RM 150 – 250"
        },
        {
          "label": "Fan Motor Replacement",
          "price": "RM 250 – 380"
        },
        {
          "label": "PCB Board Replacement",
          "price": "RM 280 – 600"
        },
        {
          "label": "Temperature Sensor Replacement",
          "price": "RM 150 – 250"
        },
        {
          "label": "Contactor Replacement",
          "price": "RM 150 – 200"
        },
        {
          "label": "Drain Pump Replacement",
          "price": "RM 350 – 550"
        },
        {
          "label": "Compressor Replacement",
          "price": "RM 800 – 2,000"
        }
      ]
    },
    "dismantling": {
      "title": "Dismantling & Relocation",
      "rows": [
        {
          "label": "Dismantle Only (indoor + outdoor)",
          "price": "RM 90"
        },
        {
          "label": "Dismantle + Reinstall Same Place (standard)",
          "price": "RM 250"
        },
        {
          "label": "Dismantle + Reinstall Same Place (2.0–2.5 HP)",
          "price": "RM 290"
        },
        {
          "label": "Dismantle + Reinstall Other Place",
          "price": "RM 350"
        }
      ],
      "note": "7ft copper pipe, wire, and drain pipe are free with reinstallation. Beyond 7ft, or any bracket/casing/electrical/access work, is charged per the Additional Materials & Special Charges rates."
    },
    "materials": {
      "title": "Additional Materials Pricing",
      "rows": [
        {
          "label": "Copper Pipe 1.0 – 1.5 HP",
          "price": "RM 17/ft"
        },
        {
          "label": "Copper Pipe 2.0 – 2.5 HP",
          "price": "RM 23/ft"
        },
        {
          "label": "Copper Pipe 3.0 – 3.5 HP",
          "price": "RM 27/ft"
        },
        {
          "label": "Wire",
          "price": "RM 9/ft"
        },
        {
          "label": "Standard Outdoor Bracket",
          "price": "RM 45"
        },
        {
          "label": "Indoor Universal Bracket",
          "price": "RM 35"
        },
        {
          "label": "PVC Casing Wire/Copper Pipe",
          "price": "RM 6 – 12/ft"
        },
        {
          "label": "Electrical Plug Point Installation",
          "price": "RM 100"
        },
        {
          "label": "Wall Hacking & Concealment Work",
          "price": "RM 6/ft"
        },
        {
          "label": "High-Rise / Difficult Access Charge",
          "price": "RM 50 – 150"
        },
        {
          "label": "Standard Metal Cable Tray",
          "price": "RM 15/ft"
        }
      ]
    },
    "contracts": {
      "title": "Annual Corporate & Residential Maintenance Contracts",
      "rows": [
        {
          "label": "Residential Package · 2 – 4 units / year contract",
          "price": "RM 499"
        },
        {
          "label": "Residential Package · 5+ units / year contract",
          "price": "RM 999"
        },
        {
          "label": "Commercial Package · 5 – 10 units / year contract",
          "price": "RM 1,999"
        },
        {
          "label": "Commercial Package · 10+ units / year contract",
          "price": "RM 3,499"
        }
      ]
    }
  },
  "services": [
    {
      "slug": "installation",
      "title": "New Unit Installation",
      "short": "Professional aircond installation from RM199 — wall-mounted, ceiling cassette & window units for all 20 brands. Same-day available, 1-month workmanship warranty, vacuum pump commissioning.",
      "startPrice": 199,
      "icon": "plug",
      "targetProblem": "New home setup, upgrading old systems, moving into new office or condo.",
      "category": "both"
    },
    {
      "slug": "emergency",
      "title": "Emergency Aircond Repair",
      "short": "Same-day rapid emergency response for complete aircond breakdowns, heavy water leaks, outdoor unit failures, and urgent repairs across KL & Selangor.",
      "startPrice": 88,
      "icon": "alert-triangle",
      "targetProblem": "Sudden complete breakdown, heavy water leak, MCB tripping, burning smell.",
      "category": "both"
    },
    {
      "slug": "basic-servicing",
      "title": "Basic Servicing / Routine Maintenance",
      "short": "Regular standard aircond filter cleaning and multi-point diagnostic check to maintain peak energy efficiency and extend unit lifespan.",
      "startPrice": 99,
      "icon": "wrench",
      "targetProblem": "Routine 3–6 month checkup, energy efficiency checks, preventive care.",
      "category": "residential"
    },
    {
      "slug": "chemical-wash",
      "title": "Pressure Chemical Wash",
      "short": "Deep high-pressure chemical cleaning to remove stubborn mould, dust, bacteria and dramatically improve cooling airflow and air quality.",
      "startPrice": 120,
      "icon": "flask-conical",
      "targetProblem": "Slow cooling, foul smell, low airflow, dusty air extraction.",
      "category": "both"
    },
    {
      "slug": "chemical-overhaul",
      "title": "Chemical Overhaul",
      "short": "Complete dismantling of the indoor unit for the ultimate deep-clean. Permanently resolves severe water leaking, ice formation, and extreme blockage.",
      "startPrice": 220,
      "icon": "sparkles",
      "targetProblem": "Water leaking, ice formation, complete blockage, system choking.",
      "category": "both"
    },
    {
      "slug": "gas-topup",
      "title": "Gas Top-Up / Precision Balancing",
      "short": "Precision refrigerant balancing and pressure level top-up for eco-friendly R32, R410A, and traditional R22 systems. Leak check included.",
      "startPrice": 120,
      "icon": "gauge",
      "targetProblem": "Aircond running but blowing warm air, low gas pressure.",
      "category": "both"
    },
    {
      "slug": "repair",
      "title": "Troubleshooting & Repairs",
      "short": "Expert diagnosis and replacement of faulty aircond parts — capacitors, fan motors, sensor coils, PCB boards, or copper wiring. Quote before work.",
      "startPrice": 88,
      "icon": "settings",
      "targetProblem": "Noisy outdoor unit, sudden auto shut-off, blinking timer light, wiring sparks.",
      "category": "both"
    },
    {
      "slug": "dismantling-relocation",
      "title": "Dismantle & Relocation",
      "short": "Safe and risk-free extraction of existing indoor/outdoor units with proper refrigerant pump-down and sealing. Full reinstall at new location.",
      "startPrice": 90,
      "icon": "move",
      "targetProblem": "House moving, shop shifting, office relocation/shifting.",
      "category": "both"
    },
    {
      "slug": "ceiling-cassette",
      "title": "Ceiling Cassette Solutions",
      "short": "Heavy-duty commercial ceiling cassette servicing, chemical wash, installation and scheduled maintenance for corporate and retail layouts.",
      "startPrice": 150,
      "icon": "layout-grid",
      "targetProblem": "Commercial office hot spots, multi-unit ceiling cassette systems, corporate annual maintenance needs.",
      "category": "commercial"
    },
    {
      "slug": "maintenance-contract",
      "title": "Maintenance Contract (AMC)",
      "short": "Annual aircond maintenance plans with quarterly servicing, priority scheduling, and free emergency checks. Save up to 30% vs one-off bookings. From RM 299/year.",
      "startPrice": 299,
      "icon": "shield-check",
      "targetProblem": "Regular maintenance scheduling, long-term cost savings, priority emergency response, commercial multi-unit plans.",
      "category": "both"
    }
  ],
  "areaPagesLite": [
    {
      "slug": "kuala-lumpur",
      "name": "Kuala Lumpur",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "petaling-jaya",
      "name": "Petaling Jaya",
      "state": "Selangor"
    },
    {
      "slug": "cheras",
      "name": "Cheras",
      "state": "Kuala Lumpur / Selangor"
    },
    {
      "slug": "shah-alam",
      "name": "Shah Alam",
      "state": "Selangor"
    },
    {
      "slug": "subang-jaya",
      "name": "Subang Jaya",
      "state": "Selangor"
    },
    {
      "slug": "ampang",
      "name": "Ampang",
      "state": "Selangor / KL"
    },
    {
      "slug": "puchong",
      "name": "Puchong",
      "state": "Selangor"
    },
    {
      "slug": "klang",
      "name": "Klang",
      "state": "Selangor"
    },
    {
      "slug": "kajang",
      "name": "Kajang",
      "state": "Selangor"
    },
    {
      "slug": "batu-caves",
      "name": "Batu Caves",
      "state": "Selangor"
    },
    {
      "slug": "damansara",
      "name": "Damansara",
      "state": "Selangor / KL"
    },
    {
      "slug": "bangsar",
      "name": "Bangsar",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "mont-kiara",
      "name": "Mont Kiara",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "setapak",
      "name": "Setapak",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "sentul",
      "name": "Sentul",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "selayang",
      "name": "Selayang",
      "state": "Selangor"
    },
    {
      "slug": "putrajaya",
      "name": "Putrajaya",
      "state": "Putrajaya"
    },
    {
      "slug": "cyberjaya",
      "name": "Cyberjaya",
      "state": "Selangor"
    },
    {
      "slug": "kepong",
      "name": "Kepong",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "sri-petaling",
      "name": "Sri Petaling",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "sunway",
      "name": "Sunway",
      "state": "Selangor"
    },
    {
      "slug": "rawang",
      "name": "Rawang",
      "state": "Selangor"
    },
    {
      "slug": "kajang-semenyih",
      "name": "Semenyih",
      "state": "Selangor"
    },
    {
      "slug": "seri-kembangan",
      "name": "Seri Kembangan",
      "state": "Selangor"
    },
    {
      "slug": "desa-parkcity",
      "name": "Desa ParkCity",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "taman-melawati",
      "name": "Taman Melawati",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "hulu-kelang",
      "name": "Hulu Kelang",
      "state": "Selangor"
    },
    {
      "slug": "bandar-puteri",
      "name": "Bandar Puteri",
      "state": "Selangor"
    },
    {
      "slug": "bandar-botanic",
      "name": "Bandar Botanic",
      "state": "Selangor"
    },
    {
      "slug": "glenmarie",
      "name": "Glenmarie",
      "state": "Selangor"
    },
    {
      "slug": "kota-kemuning",
      "name": "Kota Kemuning",
      "state": "Selangor"
    },
    {
      "slug": "bukit-jelutong",
      "name": "Bukit Jelutong",
      "state": "Selangor"
    },
    {
      "slug": "setia-alam",
      "name": "Setia Alam",
      "state": "Selangor"
    },
    {
      "slug": "ss2",
      "name": "SS2",
      "state": "Selangor"
    },
    {
      "slug": "ara-damansara",
      "name": "Ara Damansara",
      "state": "Selangor"
    },
    {
      "slug": "bandar-utama",
      "name": "Bandar Utama",
      "state": "Selangor"
    },
    {
      "slug": "sungai-buloh",
      "name": "Sungai Buloh",
      "state": "Selangor"
    },
    {
      "slug": "wangsa-maju",
      "name": "Wangsa Maju",
      "state": "Kuala Lumpur"
    },
    {
      "slug": "balakong",
      "name": "Balakong",
      "state": "Selangor"
    },
    {
      "slug": "kuala-lumpur-city-centre",
      "name": "Kuala Lumpur City Centre",
      "state": "Kuala Lumpur"
    }
  ],
  "brandPagesLite": [
    {
      "slug": "daikin",
      "name": "Daikin"
    },
    {
      "slug": "panasonic",
      "name": "Panasonic"
    },
    {
      "slug": "mitsubishi",
      "name": "Mitsubishi"
    },
    {
      "slug": "york",
      "name": "York"
    },
    {
      "slug": "acson",
      "name": "Acson"
    },
    {
      "slug": "carrier",
      "name": "Carrier"
    },
    {
      "slug": "midea",
      "name": "Midea"
    },
    {
      "slug": "haier",
      "name": "Haier"
    },
    {
      "slug": "toshiba",
      "name": "Toshiba"
    },
    {
      "slug": "hitachi",
      "name": "Hitachi"
    },
    {
      "slug": "samsung",
      "name": "Samsung"
    },
    {
      "slug": "lg",
      "name": "LG"
    },
    {
      "slug": "sharp",
      "name": "Sharp"
    },
    {
      "slug": "fujitsu",
      "name": "Fujitsu"
    },
    {
      "slug": "gree",
      "name": "Gree"
    },
    {
      "slug": "hisense",
      "name": "Hisense"
    },
    {
      "slug": "aux",
      "name": "Aux"
    },
    {
      "slug": "tcl",
      "name": "TCL"
    },
    {
      "slug": "national",
      "name": "National"
    },
    {
      "slug": "isonic",
      "name": "Isonic"
    }
  ],
  "problemPagesLite": [
    {
      "slug": "aircond-not-cold",
      "name": "Aircond Not Cold",
      "nameMS": "Aircond Tidak Sejuk",
      "nameZH": "冷气不冷"
    },
    {
      "slug": "aircond-water-leaking",
      "name": "Aircond Water Leaking",
      "nameMS": "Aircond Bocor Air",
      "nameZH": "冷气漏水"
    },
    {
      "slug": "aircond-making-noise",
      "name": "Aircond Making Noise",
      "nameMS": "Aircond Bunyi Bising",
      "nameZH": "冷气噪音"
    },
    {
      "slug": "aircond-bad-smell",
      "name": "Aircond Bad Smell",
      "nameMS": "Aircond Bau Busuk",
      "nameZH": "冷气异味"
    },
    {
      "slug": "aircond-freezing-up",
      "name": "Aircond Freezing Up",
      "nameMS": "Aircond Membeku",
      "nameZH": "冷气结冰"
    },
    {
      "slug": "aircond-low-gas",
      "name": "Aircond Low Gas",
      "nameMS": "Aircond Gas Rendah",
      "nameZH": "冷气气体不足"
    },
    {
      "slug": "aircond-gas-leak",
      "name": "Aircond Gas Leak",
      "nameMS": "Kebocoran Gas Aircond",
      "nameZH": "冷气气体泄漏"
    },
    {
      "slug": "aircond-compressor-problem",
      "name": "Aircond Compressor Problem",
      "nameMS": "Masalah Kompressor Aircond",
      "nameZH": "冷气压缩机故障"
    },
    {
      "slug": "aircond-pcb-problem",
      "name": "Aircond PCB Problem",
      "nameMS": "Masalah PCB Aircond",
      "nameZH": "冷气电路板故障"
    },
    {
      "slug": "aircond-fan-not-working",
      "name": "Aircond Fan Not Working",
      "nameMS": "Kipas Aircond Tidak Berfungsi",
      "nameZH": "冷气风扇不转"
    },
    {
      "slug": "aircond-tripping-power",
      "name": "Aircond Tripping Power",
      "nameMS": "Aircond Terjatuh Pawa",
      "nameZH": "冷气跳闸断电"
    },
    {
      "slug": "aircond-remote-not-working",
      "name": "Aircond Remote Not Working",
      "nameMS": "Remote Aircond Tidak Berfungsi",
      "nameZH": "冷气遥控器失灵"
    },
    {
      "slug": "aircond-indoor-unit-leaking",
      "name": "Aircond Indoor Unit Leaking",
      "nameMS": "Unit Dalam Aircond Bocor",
      "nameZH": "冷气室内机漏水"
    },
    {
      "slug": "aircond-outdoor-unit-not-running",
      "name": "Aircond Outdoor Unit Not Running",
      "nameMS": "Unit Luar Aircond Tidak Berfungsi",
      "nameZH": "冷气室外机不运转"
    },
    {
      "slug": "aircond-high-electricity-bill",
      "name": "Aircond High Electricity Bill",
      "nameMS": "Bil Elektrik Tinggi Aircond",
      "nameZH": "冷气电费高"
    },
    {
      "slug": "aircond-weak-airflow",
      "name": "Aircond Weak Airflow",
      "nameMS": "Aliran Udara Aircond Lemah",
      "nameZH": "冷气风力弱"
    },
    {
      "slug": "aircond-not-turning-on",
      "name": "Aircond Not Turning On",
      "nameMS": "Aircond Tidak Hidup",
      "nameZH": "冷气开不了机"
    },
    {
      "slug": "aircond-blinking-light",
      "name": "Aircond Blinking Light Error",
      "nameMS": "Ralat Lampu Berkelip Aircond",
      "nameZH": "冷气指示灯闪烁"
    },
    {
      "slug": "aircond-water-dripping",
      "name": "Aircond Water Dripping",
      "nameMS": "Aircond Menitis Air",
      "nameZH": "冷气滴水"
    },
    {
      "slug": "aircond-thermostat-problems",
      "name": "Aircond Thermostat Problems",
      "nameMS": "Masalah Termostat Aircond",
      "nameZH": "冷气温控器问题"
    }
  ]
};

export type SitePublic = typeof sitePublic;
