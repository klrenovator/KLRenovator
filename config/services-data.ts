/**
 * Detailed content for each service page.
 * Keyed by slug (matches config/site.ts services).
 * ALL prices synced with site.ts — June 2026
 * Hero images updated to SEO-clean filenames — June 2026
 */

export type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  startPrice: string;
  highlights: string[];
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
  priceTable: { label: string; price: string }[];
  heroImage: string;
};

export const servicesData: Record<string, ServiceDetail> = {
  "chemical-wash": {
    slug: "chemical-wash",
    title: "Pressure Chemical Wash",
    tagline: "Deep high-pressure chemical clean — removes mould, dust, bacteria and restores cooling power.",
    description:
      "A pressure chemical wash uses a food-safe chemical solution sprayed at high pressure onto the evaporator coil and blower wheel while the unit stays mounted on the wall. It dissolves stubborn mould, bacteria, dust and allergens that a basic service cannot remove. Recommended every 12 months, or sooner if your unit smells, blows warm air, or has low airflow.",
    startPrice: "RM 120",
    heroImage: "/hero/aircond-pressure-chemical-wash-kl.jpeg",
    highlights: [
      "High-pressure food-safe chemical spray",
      "Full evaporator coil + blower wheel treatment",
      "Kills mould, bacteria & allergens",
      "Drain pipe flush included",
      "Restores original cooling power & airflow",
      "Unit stays mounted — no dismantle needed",
      "Filter cleaned & reinstalled",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Cover & Protect", desc: "Drop sheets protect your floor, wall and furniture before we start." },
      { step: "Apply Chemical", desc: "Food-safe chemical solution sprayed onto coil, blower wheel and all internal surfaces." },
      { step: "High-Pressure Rinse", desc: "High-pressure water rinse flushes out dissolved dirt, mould and bacteria through the drain." },
      { step: "Test & Handover", desc: "Cooling output tested, area cleaned, and job card handed to you." },
    ],
    faqs: [
      {
        q: "How much does a chemical wash cost in KL & Selangor?",
        a: "Chemical wash starts from RM 120 for a wall-mounted 1.0–1.5 HP unit. Ceiling cassette starts from RM 220. All prices confirmed before work begins — no hidden charges.",
      },
      {
        q: "How often should I get a chemical wash?",
        a: "Every 12 months for most homes. Every 8–10 months if you're near a main road, construction, or high-humidity area. Every 6 months for units running 8+ hours daily.",
      },
      {
        q: "What is the difference between chemical wash and basic servicing?",
        a: "Basic servicing is a surface filter and drain clean. Chemical wash uses a high-pressure chemical spray to dissolve mould and dirt deep inside the coil and blower wheel — areas basic servicing cannot reach.",
      },
      {
        q: "What is the difference between chemical wash and chemical overhaul?",
        a: "Chemical wash is done with the unit still mounted on the wall. Chemical overhaul fully dismantles the indoor unit for a complete deep clean of every internal component. Overhaul is recommended when the unit is leaking, icing up, or hasn't been opened in 3+ years.",
      },
      {
        q: "Does chemical wash fix water leaking?",
        a: "It often does — if the cause is a blocked drain pipe. If leaking continues after a chemical wash, a chemical overhaul is likely needed to clean the drain pan and internal channels properly.",
      },
      {
        q: "Is same-day chemical wash available?",
        a: "Yes — same-day slots are available across KL and Selangor. WhatsApp +60182983573 in the morning to secure your slot.",
      },
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 120" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 150" },
      { label: "Wall-Mounted · 3.0 HP", price: "RM 180" },
      { label: "Wall-Mounted · 4.0 – 5.0 HP", price: "RM 200" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Ceiling Cassette · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "Window Unit · 1.0 – 2.0 HP", price: "RM 130" },
      { label: "Window Unit · 2.5 – 3.0 HP", price: "RM 160" },
    ],
  },

  "chemical-overhaul": {
    slug: "chemical-overhaul",
    title: "Chemical Overhaul",
    tagline: "Complete dismantle and deep-clean — the ultimate restoration for heavily soiled or leaking aircond units.",
    description:
      "A chemical overhaul is the most thorough aircond cleaning service available. The technician fully dismantles the indoor unit from the wall, removes every internal component, and immerses the coil, blower wheel, drain pan and casing in a deep chemical solution. Every hidden corner is cleaned — areas that a chemical wash cannot reach. The unit is reassembled, reinstalled, pressure-tested, and handed back with a 1-month warranty. Ideal for units that are leaking, icing up, smelling bad after a wash, or haven't been opened in 3+ years.",
    startPrice: "RM 220",
    heroImage: "/hero/aircond-chemical-service-kuala-lumpur.jpeg",
    highlights: [
      "Indoor unit fully dismantled from wall",
      "Coil, blower, drain pan — all removed and deep-cleaned",
      "Chemical bath removes years of embedded mould and grime",
      "Drain pan flushed and inspected for cracks",
      "Internal piping and drainage channels cleared",
      "Unit reassembled, reinstalled and pressure-tested",
      "All brands supported — Daikin, Panasonic, Mitsubishi, Midea",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Dismantle", desc: "Indoor unit carefully removed from wall. All components separated for individual cleaning." },
      { step: "Chemical Bath", desc: "Coil, blower wheel and drain pan fully immersed in chemical solution. Every hidden surface cleaned." },
      { step: "Flush & Dry", desc: "All components high-pressure rinsed, drain pan flushed, and components dried before reassembly." },
      { step: "Reinstall & Test", desc: "Unit remounted, electrical connections checked, cooling and drainage tested before handover." },
    ],
    faqs: [
      {
        q: "When do I need a chemical overhaul instead of a chemical wash?",
        a: "Get an overhaul if: water is leaking after a chemical wash, ice is forming on the coil, the unit smells bad again within 2 months of a wash, it hasn't been dismantled in 3+ years, or cooling is still weak after gas top-up and a chemical wash.",
      },
      {
        q: "How long does a chemical overhaul take?",
        a: "Typically 2–3 hours per unit. Multiple units in one visit can be arranged — WhatsApp us to schedule.",
      },
      {
        q: "How much does a chemical overhaul cost in KL?",
        a: "Chemical overhaul starts from RM 220 for a wall-mounted 1.0–1.5 HP unit. Ceiling cassette overhaul starts from RM 380.",
      },
      {
        q: "Is there a warranty on chemical overhaul?",
        a: "Yes — 1-month workmanship warranty. If any leaking or related issue recurs within a month, we return and inspect at no charge.",
      },
      {
        q: "Will the overhaul fix my water leaking problem?",
        a: "Yes, in the vast majority of cases. Overhaul cleans the drain pan, drain channels, and all internal components — the most common sources of leaking. If leaking was caused by a cracked drain pan, we will advise on replacement options.",
      },
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 280" },
      { label: "Wall-Mounted · 3.0 – 3.5 HP", price: "RM 350" },
      { label: "Ceiling Cassette · 1.0 – 3.0 HP", price: "RM 380 – 480" },
    ],
  },

  "basic-servicing": {
    slug: "basic-servicing",
    title: "Basic Servicing / Routine Maintenance",
    tagline: "Routine aircond maintenance to keep your unit efficient, clean and leak-free.",
    description:
      "A standard basic service covers filter washing, blower surface cleaning, drain pipe flushing, and a multi-point system check. It keeps your unit running at peak efficiency and extends its lifespan. Recommended every 3–6 months depending on usage. A basic service takes 30–45 minutes per unit and is the most affordable way to maintain your aircond.",
    startPrice: "RM 99",
    heroImage: "/hero/aircond-repair-technician-kl.jpeg",
    highlights: [
      "Filter removal, wash and reinstall",
      "Blower wheel surface cleaning",
      "Drain pipe flush to prevent leaking",
      "Gas pressure visual check",
      "Electrical connection check",
      "Cooling output test after service",
      "All brands covered",
      "30–45 minutes per unit",
    ],
    process: [
      { step: "Inspection", desc: "Check unit condition, note any visible issues before starting." },
      { step: "Filter Clean", desc: "Filters removed, washed thoroughly and reinstalled." },
      { step: "Drain Flush", desc: "Drain pipe flushed with water to clear blockages and prevent leaking." },
      { step: "Cooling Test", desc: "System switched on and temperature drop verified before we leave." },
    ],
    faqs: [
      {
        q: "How often should I do a basic service in Malaysia?",
        a: "Every 3 months for units running 8+ hours daily. Every 4–6 months for moderate use (evenings only). Malaysia's humidity means units get dirty faster than in temperate countries.",
      },
      {
        q: "Is gas top-up included in basic servicing?",
        a: "No — gas refill is quoted separately only if needed. If our technician notices low pressure during the service, we will advise you and quote before proceeding.",
      },
      {
        q: "What's the difference between basic servicing and chemical wash?",
        a: "Basic servicing is a surface clean — filters, drain, and visual check. Chemical wash uses a food-safe chemical spray to dissolve mould and dirt deep inside the coil and blower wheel. If your unit hasn't been chemically washed in 12+ months, a chemical wash is recommended instead.",
      },
      {
        q: "How much does basic servicing cost in KL & Selangor?",
        a: "Basic servicing starts from RM 99 for a wall-mounted 1.0–1.5 HP unit. Ceiling cassette starts from RM 150.",
      },
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 120" },
      { label: "Wall-Mounted · 3.0 – 3.5 HP", price: "RM 150" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Ceiling Cassette · 3.5 – 5.0 HP", price: "RM 250" },
    ],
  },

  "gas-topup": {
    slug: "gas-topup",
    title: "Gas Top-Up / Precision Balancing",
    tagline: "Restore icy cold performance — precision refrigerant refill with leak check for R22, R410A and R32.",
    description:
      "If your aircond runs but isn't cold, low refrigerant gas is one of the most common causes. Our technicians perform a precision gas top-up using calibrated pressure gauges — never over or under charging. We support all three refrigerant types used in Malaysia: R22, R410A and R32. A leak check is included with every gas top-up service.",
    startPrice: "RM 120",
    heroImage: "/hero/aircond-gas-topup-r32-r410a-kl.jpeg",
    highlights: [
      "R22, R410A and R32 all supported",
      "Precision pressure gauges — correct charge every time",
      "Leak check included before top-up",
      "Cooling performance verified after refill",
      "Safe vacuum procedure if moisture detected",
      "Same-day service available",
      "All brands and HP sizes covered",
    ],
    process: [
      { step: "Leak Check", desc: "Inspect system for leaks before topping up — prevents repeat issues." },
      { step: "Pressure Read", desc: "Connect gauges to measure existing refrigerant pressure accurately." },
      { step: "Refill", desc: "Charge the correct amount per manufacturer specification — not a rough estimate." },
      { step: "Verify", desc: "Measure output temperature to confirm full cooling restoration." },
    ],
    faqs: [
      {
        q: "How do I know which gas my aircond uses — R22, R410A or R32?",
        a: "Check the sticker on your outdoor unit — it clearly states the refrigerant type. Or WhatsApp us a photo of the outdoor unit and we'll identify it for you.",
      },
      {
        q: "How much does gas top-up cost in KL & Selangor?",
        a: "R22 gas starts from RM 120, R410A from RM 150, R32 from RM 180 — depending on unit size. All prices confirmed before work begins.",
      },
      {
        q: "My aircond is running but blowing warm air. Is it low gas?",
        a: "Low gas is one of the most common causes. Other possibilities include a dirty coil, faulty capacitor, or blocked outdoor unit. Our technician will diagnose before recommending a top-up.",
      },
      {
        q: "How long does gas last before it needs to be topped up again?",
        a: "If there is no leak, refrigerant gas lasts many years — it doesn't deplete with normal use. If it keeps running low, there is a leak that needs to be found and repaired.",
      },
      {
        q: "Is gas top-up safe to do without fixing the leak?",
        a: "It provides temporary relief but the gas will run low again. We always check for leaks first and advise you honestly on whether a repair is needed.",
      },
    ],
    priceTable: [
      { label: "R22 · 1.0 HP", price: "RM 120" },
      { label: "R22 · 1.5 – 2.0 HP", price: "RM 150" },
      { label: "R22 · 2.5 – 3.0 HP", price: "RM 180" },
      { label: "R410A · 1.0 HP", price: "RM 150" },
      { label: "R410A · 1.5 – 2.0 HP", price: "RM 180" },
      { label: "R410A · 2.5 – 3.0 HP", price: "RM 200" },
      { label: "R32 · 1.0 HP", price: "RM 180" },
      { label: "R32 · 1.5 – 2.0 HP", price: "RM 200" },
      { label: "R32 · 2.5 – 3.0 HP", price: "RM 220" },
    ],
  },

  repair: {
    slug: "repair",
    title: "Aircond Troubleshooting & Repair",
    tagline: "Expert aircond fault diagnosis and repair in KL & Selangor — capacitors, fan motors, PCB boards, compressors and more.",
    description:
      "KL Renovator provides professional aircond repair and troubleshooting across Kuala Lumpur and Selangor. Our technicians diagnose the root cause of any aircond fault — from blinking error lights to complete breakdowns — and provide a transparent quote before any repair work begins. We carry common replacement parts on the van to fix most issues in a single visit. Diagnostic fee is RM 88, which is fully waived if the repair is carried out on the same visit.",
    startPrice: "RM 88",
    heroImage: "/hero/aircond-compressor-repair-selangor.jpeg",
    highlights: [
      "Full fault diagnosis before any repair work",
      "Transparent quote — you approve before we start",
      "Diagnostic fee waived if repair done same visit",
      "Capacitor, fan motor, PCB, sensor and compressor repairs",
      "Error code reading for all major brands",
      "Common parts carried on-van for same-day fix",
      "1-month workmanship warranty on all parts",
      "All brands: Daikin, Panasonic, Mitsubishi, LG, Samsung & more",
    ],
    process: [
      { step: "Diagnosis", desc: "Technician runs a full system test, reads error codes, and identifies the fault. A quote is provided before any work begins." },
      { step: "Quote Approval", desc: "You receive an itemised quote covering parts and labour. Work only begins after your approval." },
      { step: "Part Replacement", desc: "Faulty component is replaced — capacitor, fan motor, PCB, sensor, drain pump, or other part as needed." },
      { step: "Test & Warranty", desc: "System is tested to confirm the fault is resolved. A 1-month warranty is issued on the repaired component." },
    ],
    faqs: [
      {
        q: "How much does aircond repair cost in KL & Selangor?",
        a: "Diagnostic fee is RM 88 (waived if repair is done on the same visit). Common repairs: capacitor RM 180, fan motor RM 250–450, PCB board RM 300–600, compressor RM 600–2,000. All quoted before work begins.",
      },
      {
        q: "My aircond is blinking and not working. What does that mean?",
        a: "A blinking light usually indicates an error code from the unit's PCB. Our technician reads the error code and identifies the exact fault — it could be a dirty sensor, low gas, PCB fault or communication error. We diagnose and fix the root cause.",
      },
      {
        q: "My aircond is running but not cold. Is that a repair or gas top-up?",
        a: "Not cold can be caused by low refrigerant gas, a dirty coil, or a faulty capacitor. Our technician checks all three before recommending a solution. You will receive a quote for the correct service — gas top-up, chemical wash or part replacement.",
      },
      {
        q: "Is the diagnostic fee refundable or waived?",
        a: "Yes. The RM 88 diagnostic fee is fully waived if you proceed with the repair on the same visit. You only pay for the repair itself.",
      },
      {
        q: "How long does a repair visit take?",
        a: "Most repairs take 1 to 2 hours. PCB board replacements may take longer if the part needs to be sourced. In most cases, common parts like capacitors and fan motors are carried on the van and replaced on the spot.",
      },
      {
        q: "Do you repair all aircond brands?",
        a: "Yes. KL Renovator repairs all major brands including Daikin, Panasonic, Mitsubishi Electric, York, Acson, Midea, LG, Samsung, Sharp, Toshiba, Haier and more.",
      },
    ],
    priceTable: [
      { label: "Diagnostic Fee (waived with repair)", price: "RM 88" },
      { label: "Capacitor Replacement", price: "RM 180" },
      { label: "Copper Sensor / Thermistor", price: "RM 150" },
      { label: "Fan Motor", price: "RM 250 – 450" },
      { label: "PCB / Main Board", price: "RM 300 – 600" },
      { label: "Drain Pipe Clearing", price: "RM 120" },
      { label: "Drain Pump Installation", price: "RM 300 – 400" },
      { label: "Compressor Replacement", price: "RM 600 – 2,000" },
      { label: "Remote Control Replacement", price: "RM 80 – 130" },
    ],
  },

  installation: {
    slug: "installation",
    title: "New Aircond Unit Installation",
    tagline: "Professional new aircond installation in KL & Selangor — all brands and HP sizes, clean cable routing, same-day available.",
    description:
      "KL Renovator installs all residential and commercial aircond brands across Kuala Lumpur and Selangor. Every installation includes free 7 ft copper pipe, heavy duty wiring, drain pipe routing and a full system test. Our technicians ensure clean cable concealment and proper drainage setup to prevent future water leaking. Whether you are installing your first unit, upgrading an old system, or setting up a commercial space, we provide transparent pricing with no hidden charges.",
    startPrice: "RM 199",
    heroImage: "/hero/aircond-new-installation-selangor.jpeg",
    highlights: [
      "All brands supported — Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung and more",
      "Free 7 ft copper pipe included with every installation",
      "Heavy duty wiring and proper earthing",
      "Clean cable routing and PVC casing",
      "Correct drainage setup prevents future water leaking",
      "Full system test and performance confirmation",
      "Same-day installation slots available",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Site Assessment", desc: "Technician checks wall, electrical point, drainage path and distance before starting." },
      { step: "Mount Indoor Unit", desc: "Indoor unit bracket is levelled and mounted securely. Cable and copper pipe are routed cleanly through wall or casing." },
      { step: "Install Outdoor Unit", desc: "Outdoor unit is positioned on bracket with proper spacing for ventilation and drainage." },
      { step: "Connect & Vacuum", desc: "Copper pipes are connected, system is vacuumed to remove air and moisture before gas is released." },
      { step: "Test & Handover", desc: "System is run and cooling output confirmed. Job card and 1-month warranty issued." },
    ],
    faqs: [
      {
        q: "How much does aircond installation cost in KL & Selangor?",
        a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP and goes up to RM 449 for 5.0 HP. Ceiling cassette installation starts from RM 290. Standard installation includes 7 ft copper pipe, wiring, and drain routing. Additional materials are quoted separately if needed.",
      },
      {
        q: "Do you supply the aircond unit or just install?",
        a: "KL Renovator provides labour-only installation. You purchase your preferred brand and model from any retailer, and we install it professionally. We install all major brands including Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Sharp and more.",
      },
      {
        q: "How long does aircond installation take?",
        a: "A standard wall-mounted installation takes 1.5 to 3 hours. Ceiling cassette installation takes 2 to 4 hours depending on ceiling height and access. We aim to complete all work in one visit.",
      },
      {
        q: "What is included in the standard installation price?",
        a: "Standard installation includes: 7 ft copper pipe, heavy duty wiring, drain pipe routing, PVC casing, brackets (indoor and outdoor), vacuuming the system, and a full test run. Additional pipe or wire length beyond 7 ft is charged at RM 17–27/ft.",
      },
      {
        q: "Do you offer same-day aircond installation?",
        a: "Yes. Same-day installation slots are available subject to technician availability. WhatsApp +60182983573 with your area and unit details to confirm a slot.",
      },
      {
        q: "Can you install on a high-rise balcony or high floor?",
        a: "Yes. KL Renovator handles high-rise installations. A difficult access surcharge of RM 50–150 may apply for units above level 10 or where outdoor unit access requires special rigging.",
      },
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 HP", price: "RM 199" },
      { label: "Wall-Mounted · 1.5 HP", price: "RM 199" },
      { label: "Wall-Mounted · 2.0 HP", price: "RM 249" },
      { label: "Wall-Mounted · 2.5 HP", price: "RM 279" },
      { label: "Wall-Mounted · 3.0 HP", price: "RM 329" },
      { label: "Wall-Mounted · 4.0 HP", price: "RM 399" },
      { label: "Wall-Mounted · 5.0 HP", price: "RM 449" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 290" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Ceiling Cassette · 3.5 – 6.0 HP", price: "RM 400" },
      { label: "Additional copper pipe (per ft)", price: "RM 17 – 27/ft" },
      { label: "Additional wire (per ft)", price: "RM 9/ft" },
      { label: "Dismantle old unit", price: "From RM 90" },
    ],
  },

  "dismantling-relocation": {
    slug: "dismantling-relocation",
    title: "Dismantling & Relocation",
    tagline: "Move your aircond to your new home safely — proper pump-down, transport and full reinstall.",
    description:
      "Moving house or shifting your aircond to another room? KL Renovator carefully recovers the refrigerant gas into the outdoor unit (pump-down), disconnects all piping and brackets, and reinstalls the complete system at the new location. All copper connections, brackets and drainage are re-done properly. Cooling is tested before we leave.",
    startPrice: "RM 90",
    heroImage: "/hero/aircond-bracket-installation-kl.jpeg",
    highlights: [
      "Proper pump-down procedure — gas safely recovered",
      "Careful disconnect and transport of indoor and outdoor units",
      "Full reinstall at new location",
      "New copper connections, brackets and drainage",
      "Cooling test after reinstall",
      "All brands and HP sizes handled",
    ],
    process: [
      { step: "Pump Down", desc: "Refrigerant gas safely recovered into outdoor unit before disconnection." },
      { step: "Disconnect", desc: "Copper pipes, brackets and drainage carefully removed. Units protected for transport." },
      { step: "Transport", desc: "Units securely transported to new location." },
      { step: "Reinstall & Test", desc: "Full reinstall at new location — new copper, brackets, drainage — then cooling tested." },
    ],
    faqs: [
      {
        q: "Is it worth relocating an old aircond or should I buy new?",
        a: "If the unit is under 8 years old and in good condition, relocation is usually much cheaper than buying new. We'll advise honestly after seeing the unit.",
      },
      {
        q: "How much does aircond relocation cost in KL?",
        a: "Dismantling only starts from RM 90 per unit. Dismantle + reinstall in same building is RM 290. Full relocation (dismantle + relocate to new location) starts from RM 350. WhatsApp us for a full quote based on your situation.",
      },
      {
        q: "Do you charge extra for long-distance relocation?",
        a: "Cross-area relocation has a small surcharge depending on the distance. WhatsApp us with both addresses and we'll quote you accurately.",
      },
      {
        q: "How long does full relocation take?",
        a: "Allow 2–4 hours for a single unit full relocation — dismantle, transport and reinstall. We require a minimum 3-hour calendar block.",
      },
    ],
    priceTable: [
      { label: "Dismantle Only (per unit)", price: "RM 90" },
      { label: "Dismantle + Reinstall (same building)", price: "RM 290" },
      { label: "Dismantle + Relocate (different location)", price: "RM 350" },
    ],
  },

  "ceiling-cassette": {
    slug: "ceiling-cassette",
    title: "Ceiling Cassette Service & Installation",
    tagline: "Specialist servicing and installation for commercial and residential ceiling cassette HVAC systems.",
    description:
      "Ceiling cassette units distribute cool air evenly in all four directions, making them ideal for offices, retail outlets, F&B spaces and large open-plan homes. KL Renovator installs new cassette units and services existing ones — including chemical wash, panel removal, drain pump checks and coil cleaning. We also offer scheduled annual maintenance contracts for corporate and commercial clients.",
    startPrice: "RM 150",
    heroImage: "/hero/ceiling-cassette-aircond-installation-kl.jpeg",
    highlights: [
      "Residential, retail, F&B, office cassette systems",
      "Chemical wash with full panel removal",
      "Drain pump inspection and replacement",
      "Ceiling cut and ducting for new installs",
      "VRF/VRV multi-split system support",
      "Scheduled annual maintenance contracts available",
      "All major brands — Daikin, Panasonic, Mitsubishi",
    ],
    process: [
      { step: "Survey", desc: "Site inspection to confirm unit spec, ceiling height and access requirements." },
      { step: "Ceiling Prep", desc: "Ceiling panel cut or access panel installed cleanly for new installations." },
      { step: "Install & Pipe", desc: "Unit mounted, copper pipe routed, drain connected with proper slope and drain pump installed." },
      { step: "Commission & Test", desc: "Full system vacuum, charge, cooling test and handover with warranty." },
    ],
    faqs: [
      {
        q: "How much does ceiling cassette chemical wash cost?",
        a: "Ceiling cassette chemical wash starts from RM 220 for a 1.0–1.5 HP unit. Larger units (4.0–5.0 HP) are RM 350.",
      },
      {
        q: "Can you service ceiling cassette units from other companies?",
        a: "Absolutely — we service all brands regardless of who installed them. We need the unit model to bring the correct tools and parts.",
      },
      {
        q: "Do you handle VRF/VRV multi-split commercial systems?",
        a: "Yes — we handle multi-split ceiling cassette systems for offices and commercial properties. WhatsApp us with the number of units and brands for a full quotation.",
      },
      {
        q: "Do you offer annual maintenance contracts for offices?",
        a: "Yes — we offer scheduled quarterly or bi-annual maintenance contracts for commercial properties. WhatsApp us for a custom quotation.",
      },
      {
        q: "How much does ceiling cassette installation cost?",
        a: "Ceiling cassette installation starts from RM 290 for 1.0–1.5 HP, RM 350 for 2.0–3.0 HP, and RM 400 for 3.5–6.0 HP. WhatsApp us for a full site quotation.",
      },
    ],
    priceTable: [
      { label: "Basic Servicing · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Basic Servicing · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Basic Servicing · 3.5 – 5.0 HP", price: "RM 250" },
      { label: "Chemical Wash · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical Wash · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Chemical Wash · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "Chemical Overhaul · 1.0 – 3.0 HP", price: "RM 380 – 480" },
      { label: "Installation · 1.0 – 1.5 HP", price: "RM 290" },
      { label: "Installation · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Installation · 3.5 – 6.0 HP", price: "RM 400" },
    ],
  },
};
