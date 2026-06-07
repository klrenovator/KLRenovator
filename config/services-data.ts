/**
 * Detailed content for each service page.
 * Keyed by slug (matches config/site.ts services).
 * ALL prices synced with site.ts — June 2026
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
    heroImage:
      "/hero/WhatsApp Image 2026-05-03 at 13.39.32 (1).jpeg",
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
    heroImage:
      "/hero/WhatsApp Image 2026-05-03 at 13.39.33 (1).jpeg",
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
    heroImage:
      "/hero/WhatsApp Image 2026-05-03 at 13.39.29.jpeg",
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
    heroImage:
      "/hero/WhatsApp Image 2026-05-03 at 13.39.34.jpeg",
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
    title: "Troubleshooting & Repairs",
    tagline: "Fast diagnosis and same-day repair — quote confirmed before we touch anything.",
    description:
      "Our technicians diagnose the root cause of your aircond problem on-site and repair it the same day in most cases. Common repairs include capacitor replacement, fan motor, PCB board, sensor coil, copper wiring and drain pump installation. We quote clearly before starting — no surprise bills. The RM 88 diagnostic fee is fully waived if you proceed with the repair.",
    startPrice: "RM 88",
    heroImage:
      "/hero/WhatsApp Image 2026-05-03 at 13.39.35.jpeg",
    highlights: [
      "RM 88 diagnostic fee waived if repair proceeds",
      "Multi-point electrical and mechanical diagnosis",
      "OEM-compatible parts used",
      "Clear quote before any work starts",
      "PCB board, capacitor, fan motor, sensor repair",
      "Copper wiring and drain pump replacement",
      "Same-day completion for most common repairs",
      "1-month workmanship warranty on all repairs",
    ],
    process: [
      { step: "Diagnose", desc: "Multi-point electrical and mechanical inspection to identify the exact root cause." },
      { step: "Quote", desc: "We explain the fault clearly and provide a firm parts + labour quote. You decide — no pressure." },
      { step: "Repair", desc: "Fault repaired with OEM-compatible components. No shortcuts." },
      { step: "Test", desc: "Full cooling and electrical test after repair to confirm the fix." },
    ],
    faqs: [
      {
        q: "What is the diagnostic fee?",
        a: "RM 88 during standard hours (9AM–6PM). This fee is fully waived if you proceed with the repair on the same visit.",
      },
      {
        q: "My aircond keeps shutting off automatically. What could be wrong?",
        a: "Common causes are a dirty filter restricting airflow, low refrigerant gas, faulty thermistor sensor, or a weak capacitor. Our technician will diagnose on-site and quote before repairing.",
      },
      {
        q: "Do you use original brand parts?",
        a: "We use OEM-compatible parts as standard. Original brand parts can be sourced on request — a lead time of 1–3 days may apply depending on brand availability.",
      },
      {
        q: "Is there a warranty on repairs?",
        a: "Yes — 1-month workmanship warranty on all repairs. Replaced parts carry a 3-month warranty.",
      },
      {
        q: "Can you repair all brands?",
        a: "Yes — Daikin, Panasonic, Mitsubishi Electric, York, Midea, LG, Samsung, Acson, Sharp, Haier and more. All inverter and non-inverter models.",
      },
    ],
    priceTable: [
      { label: "Diagnostic / Inspection Fee (waived with repair)", price: "RM 88" },
      { label: "Capacitor Replacement", price: "RM 180" },
      { label: "Copper Sensor / Thermistor Replacement", price: "RM 150" },
      { label: "Fan Motor Replacement", price: "RM 250 – 450" },
      { label: "PCB / Main Board Replacement", price: "RM 300 – 600" },
      { label: "Drain Pipe Clearing", price: "RM 120" },
      { label: "Drain Pump Installation", price: "RM 300 – 400" },
      { label: "Compressor Replacement", price: "RM 600 – 2,000" },
      { label: "Remote Control Replacement", price: "RM 80 – 130" },
    ],
  },

  installation: {
    slug: "installation",
    title: "New Unit Installation",
    tagline: "Professional AC installation for all brands — clean routing, proper commissioning, 1-month warranty.",
    description:
      "KL Renovator installs all types of split-unit and ceiling cassette airconds for homes, condos and offices across KL and Selangor. Our technicians handle the complete scope: copper pipe routing, wiring, drainage, outdoor bracket mounting, and a full vacuum and test-run before handover. Old unit dismantling is also available from RM 90. Standard installation includes free 7ft copper pipe, wiring, insulation and water pipe.",
    startPrice: "RM 199",
    heroImage:
      "/hero/WhatsApp Image 2026-05-03 at 13.39.24.jpeg",
    highlights: [
      "All brands — Daikin, Panasonic, Mitsubishi, Midea, Samsung, York, LG",
      "Free 7ft copper pipe, wiring, insulation and water pipe included",
      "Clean concealed cable and pipe routing",
      "Outdoor bracket mounting included",
      "Vacuum, commissioning and cooling test before handover",
      "Old unit dismantling available from RM 90",
      "Same-day installation available",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Site Survey", desc: "We assess wall structure, power point location and best drainage route before starting." },
      { step: "Bracket & Piping", desc: "Outdoor compressor bracket fixed. Copper pipe, drain and cable routed cleanly." },
      { step: "Mount & Connect", desc: "Indoor unit mounted. All refrigerant, electrical and drainage connections secured." },
      { step: "Vacuum & Test", desc: "Line vacuumed, system charged, cooling tested and handed over with job card." },
    ],
    faqs: [
      {
        q: "What is included in the RM 199 installation package?",
        a: "Standard installation includes free 7ft copper pipe, 7ft wiring, insulation, water pipe, transport, site survey, and a 1-month workmanship warranty per unit.",
      },
      {
        q: "What if I need more copper pipe than 7ft?",
        a: "Additional copper pipe is charged at RM 17/ft for 1.0–1.5 HP, RM 23/ft for 2.0–2.5 HP, and RM 27/ft for 3.0–3.5 HP. Additional wiring at RM 9/ft. All extra materials quoted and approved by you on-site before installation.",
      },
      {
        q: "Do I need to buy the aircond unit separately?",
        a: "Yes — we provide installation service. You supply the unit, or we can advise on the best brand and model for your space via WhatsApp.",
      },
      {
        q: "Can you dismantle my old unit before installing the new one?",
        a: "Yes. Old unit dismantling starts from RM 90 and can be done in the same visit.",
      },
      {
        q: "How long does installation take?",
        a: "A standard single split-unit takes 2–3 hours. Multiple units are scheduled per job — WhatsApp us for a full plan.",
      },
      {
        q: "Do you install ceiling cassette units?",
        a: "Yes — ceiling cassette installation starts from RM 290 for 1.0–1.5 HP. We handle all ceiling prep, ducting, drain pump setup and commissioning.",
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
      { label: "Additional copper pipe 1.0–1.5 HP", price: "RM 17/ft" },
      { label: "Additional copper pipe 2.0–2.5 HP", price: "RM 23/ft" },
      { label: "Additional copper pipe 3.0–3.5 HP", price: "RM 27/ft" },
      { label: "Additional wire", price: "RM 9/ft" },
      { label: "Dismantling old unit", price: "From RM 90" },
    ],
  },

  "dismantling-relocation": {
    slug: "dismantling-relocation",
    title: "Dismantling & Relocation",
    tagline: "Move your aircond to your new home safely — proper pump-down, transport and full reinstall.",
    description:
      "Moving house or shifting your aircond to another room? KL Renovator carefully recovers the refrigerant gas into the outdoor unit (pump-down), disconnects all piping and brackets, and reinstalls the complete system at the new location. All copper connections, brackets and drainage are re-done properly. Cooling is tested before we leave.",
    startPrice: "RM 90",
    heroImage:
      "/hero/WhatsApp Image 2026-05-03 at 13.39.30.jpeg",
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
    heroImage:
      "/hero/WhatsApp Image 2026-05-03 at 13.39.33.jpeg",
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
