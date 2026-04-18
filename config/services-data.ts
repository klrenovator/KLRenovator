/**
 * Detailed content for each service page.
 * Keyed by slug (matches config/site.ts services).
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
    title: "Chemical Wash",
    tagline: "Deep-clean that removes mould, dust, smell & bacteria.",
    description:
      "A chemical wash uses a food-safe chemical solution to dissolve dirt, mould and bacteria trapped in the evaporator coil and blower wheel. Recommended if your aircon smells, isn't cold, or hasn't been serviced in 12+ months.",
    startPrice: "RM 130",
    heroImage:
      "https://images.unsplash.com/photo-1580595999172-187fe6ccb3bd?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Food-safe chemical solution",
      "Full coil + blower treatment",
      "Kills mould and bacteria",
      "Restores original cooling power",
    ],
    process: [
      { step: "Cover & protect", desc: "Drop sheets to protect your floor & wall." },
      { step: "Apply chemical", desc: "Spray chemical on coil and fan blades." },
      { step: "High-pressure rinse", desc: "Dirty water fully extracted, no drips." },
      { step: "Reassemble & test", desc: "Test cooling output and clean up." },
    ],
    faqs: [
      { q: "How often should I chemical wash?", a: "Every 12 – 18 months, or sooner if you notice bad smell or weak cooling." },
      { q: "What's the difference vs basic servicing?", a: "Basic servicing is a surface cleaning. Chemical wash dissolves stubborn deposits the surface clean cannot reach." },
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 160" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 220" },
      { label: "Wall-Mounted · 3.0 HP", price: "RM 250" },
      { label: "Wall-Mounted · 4.0 – 5.0 HP", price: "RM 280" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Ceiling Cassette · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "Window · 1.0 – 2.0 HP", price: "RM 130" },
      { label: "Window · 2.5 – 3.0 HP", price: "RM 160" },
    ],
  },
  "chemical-overhaul": {
    slug: "chemical-overhaul",
    title: "Chemical Overhaul",
    tagline: "Complete dismantle & deep-clean — the ultimate restore.",
    description:
      "Overhaul removes the indoor unit from the wall for a full deep-clean — inside, outside, every hidden corner. Ideal for heavily soiled units that haven't been touched in years.",
    startPrice: "RM 220",
    heroImage:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Unit removed from the wall",
      "All parts deep-cleaned",
      "Drain pan & piping flushed",
      "Reassembled & pressure-tested",
    ],
    process: [
      { step: "Dismantle", desc: "Carefully remove unit from the wall." },
      { step: "Full immersion clean", desc: "Coil & fan bathed in chemical solution." },
      { step: "Flush & dry", desc: "All components rinsed and dried." },
      { step: "Reinstall & test", desc: "Remount, charge if needed, and test." },
    ],
    faqs: [
      { q: "How long does an overhaul take?", a: "Typically 2 – 3 hours per unit." },
      { q: "When do I need an overhaul instead of a wash?", a: "If chemical wash doesn't restore cooling, or the unit is 4+ years old and never overhauled." },
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 280" },
      { label: "Wall-Mounted · 3.0 HP", price: "RM 350" },
      { label: "Ceiling Cassette · 1.0 – 3.0 HP", price: "RM 380 – 480" },
    ],
  },
  "basic-servicing": {
    slug: "basic-servicing",
    title: "Basic Servicing",
    tagline: "Routine maintenance for cool, efficient aircon.",
    description:
      "A normal service keeps your aircon efficient. We clean filters and blower wheel, flush drainage, and check gas pressure. Recommended every 3 – 6 months depending on use.",
    startPrice: "RM 99",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Filter + blower cleaning",
      "Drainage flushing",
      "Gas pressure check",
      "Cooling test after service",
    ],
    process: [
      { step: "Inspection", desc: "Check unit condition & note any issues." },
      { step: "Filter clean", desc: "Wash filters thoroughly." },
      { step: "Drainage flush", desc: "Flush drain pipe to prevent leaks." },
      { step: "Cooling test", desc: "Verify temperature drop." },
    ],
    faqs: [
      { q: "How often should I service?", a: "Every 3 months for heavy use, 6 months for light use." },
      { q: "Is gas top-up included?", a: "No — gas refill is quoted separately only if needed." },
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 150" },
      { label: "Wall-Mounted · 3.0 HP", price: "RM 180" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Ceiling Cassette · 3.5 – 5.0 HP", price: "RM 250" },
    ],
  },
  "gas-topup": {
    slug: "gas-topup",
    title: "Gas Top-Up",
    tagline: "Restore icy cold performance with a professional refill.",
    description:
      "If your aircon runs but isn't cold, low refrigerant is usually the cause. We refill R22, R410A, and R32 with accurate pressure charts — never over or under charge.",
    startPrice: "RM 80",
    heroImage:
      "https://images.unsplash.com/photo-1631545308456-c3e32f5f1abe?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "R22, R410A, R32 supported",
      "Leak check included",
      "Accurate pressure measurement",
      "Cooling performance verified",
    ],
    process: [
      { step: "Leak check", desc: "Inspect for leaks before topping up." },
      { step: "Vacuum", desc: "Vacuum the line to remove moisture if needed." },
      { step: "Refill", desc: "Charge correct amount per spec." },
      { step: "Test", desc: "Measure output temperature to confirm." },
    ],
    faqs: [
      { q: "Which gas does my aircon use?", a: "Check the outdoor unit label — or send a photo via WhatsApp." },
      { q: "How long before it leaks again?", a: "If there's no leak, gas lasts many years. If it leaks quickly, we'll diagnose the cause." },
    ],
    priceTable: [
      { label: "R22 · 1.0 HP", price: "RM 80 – 100" },
      { label: "R22 · 1.5 – 2.0 HP", price: "RM 100 – 130" },
      { label: "R22 · 2.5 – 3.0 HP", price: "RM 130 – 160" },
      { label: "R410A · 1.0 HP", price: "RM 100 – 120" },
      { label: "R410A · 1.5 – 2.0 HP", price: "RM 120 – 150" },
      { label: "R410A · 2.5 – 3.0 HP", price: "RM 150 – 180" },
      { label: "R32 · 1.0 HP", price: "RM 130 – 150" },
      { label: "R32 · 1.5 – 2.0 HP", price: "RM 150 – 180" },
      { label: "R32 · 2.5 – 3.0 HP", price: "RM 180 – 200" },
    ],
  },
  repair: {
    slug: "repair",
    title: "Aircon Repair",
    tagline: "We fix cooling, leaks, noise & electrical faults.",
    description:
      "Not cooling? Water leaking? Strange noise? Our team diagnoses the issue and gives a clear quote before work starts. PCB, capacitor, fan motor, compressor — we handle it all.",
    startPrice: "RM 88",
    heroImage:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Transparent diagnosis (waived with repair)",
      "Quote before any work",
      "Genuine / OEM parts",
      "Workmanship warranty",
    ],
    process: [
      { step: "Diagnose", desc: "On-site inspection to find the root cause." },
      { step: "Quote", desc: "Clear quote before starting work." },
      { step: "Repair", desc: "Fix with proper parts, tested thoroughly." },
      { step: "Warranty", desc: "Parts & workmanship warranty." },
    ],
    faqs: [
      { q: "Is the diagnosis fee deducted from the repair?", a: "Yes — RM 88 diagnosis fee is waived if you proceed with the repair." },
      { q: "Do you use original parts?", a: "We prefer OEM / original. We'll inform you if only aftermarket is available." },
    ],
    priceTable: [
      { label: "Diagnostic / Troubleshoot (waived with repair)", price: "RM 88" },
      { label: "Copper sensor replacement", price: "RM 150" },
      { label: "Capacitor replacement", price: "RM 150" },
      { label: "Fan motor", price: "RM 200 – 500" },
      { label: "PCB / main board", price: "RM 300 – 800" },
      { label: "Compressor", price: "RM 800 – 2,000" },
      { label: "Thermostat", price: "RM 120 – 200" },
      { label: "Drain pump", price: "RM 200 – 400" },
    ],
  },
  installation: {
    slug: "installation",
    title: "Aircon Installation",
    tagline: "Clean, professional installation for any brand.",
    description:
      "We install split, inverter, and cassette units for homes, condos, and offices across KL & Selangor. All piping, bracketing, and electrical work by licensed technicians — tidy cable concealment and thorough test-run before we leave.",
    startPrice: "RM 250",
    heroImage:
      "https://images.unsplash.com/photo-1628592102751-ba83b0314276?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "All brands — Daikin, Panasonic, Mitsubishi, Midea, Samsung, York",
      "Free 7 ft copper pipe, wiring & drainage included",
      "Clean cable routing & post-install cooling test",
      "1-year workmanship warranty",
    ],
    process: [
      { step: "Site inspection", desc: "Check wall, power point & drainage route." },
      { step: "Bracket & piping", desc: "Install bracket, run pipes and drainage." },
      { step: "Unit mounting", desc: "Indoor & outdoor units mounted securely." },
      { step: "Vacuum & test", desc: "Vacuum, charge-up, and cooling test." },
    ],
    faqs: [
      { q: "Do I need to buy the aircond separately?", a: "Yes — we install units you've purchased. We can also help source any brand, just ask on WhatsApp." },
      { q: "How long does installation take?", a: "Typically 2 – 4 hours for a standard split unit." },
      { q: "Do you provide warranty?", a: "Yes — 1-year workmanship warranty on our installation." },
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 250" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 280" },
      { label: "Wall-Mounted · 3.0 HP", price: "RM 350" },
      { label: "Wall-Mounted · 4.0 – 5.0 HP", price: "RM 550" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 250" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Ceiling Cassette · 3.5 – 6.0 HP", price: "RM 400" },
    ],
  },
  "ceiling-cassette": {
    slug: "ceiling-cassette",
    title: "Ceiling Cassette Service & Installation",
    tagline: "Specialist care for commercial cassette units.",
    description:
      "Ceiling cassette units cool large spaces evenly. We install new units and service existing ones — including chemical wash, panel removal, and drain pump checks.",
    startPrice: "RM 250",
    heroImage:
      "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Retail, office, F&B & residential cassettes",
      "Ducting, ceiling cut, drain pump",
      "Chemical wash available",
      "Scheduled maintenance packages",
    ],
    process: [
      { step: "Survey", desc: "Site inspection & spec confirmation." },
      { step: "Ceiling prep", desc: "Cut or adjust ceiling panel cleanly." },
      { step: "Install & pipe", desc: "Mount unit, route copper & drain lines." },
      { step: "Commission", desc: "Full test & handover with warranty." },
    ],
    faqs: [
      { q: "Do you handle multiple units?", a: "Yes — we regularly install 5+ cassette units in one visit for offices." },
      { q: "Can you service brands I bought elsewhere?", a: "Absolutely. We service all brands regardless of purchase origin." },
    ],
    priceTable: [
      { label: "Install · 1.0 – 1.5 HP", price: "RM 250" },
      { label: "Install · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Install · 3.5 – 6.0 HP", price: "RM 400" },
      { label: "Chemical wash · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical wash · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Chemical wash · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "Basic servicing · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Basic servicing · 2.0 – 3.0 HP", price: "RM 200" },
    ],
  },
  "dismantling-relocation": {
    slug: "dismantling-relocation",
    title: "Dismantling & Relocation",
    tagline: "Move your aircon to your new home — safely.",
    description:
      "Moving house? We carefully pump-down, disconnect, and reinstall your existing aircon at the new location. All copper, brackets, and sealing properly re-done.",
    startPrice: "RM 200",
    heroImage:
      "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Proper pump-down procedure",
      "Careful transport of unit",
      "Full reinstall at new site",
      "Cooling test after reinstall",
    ],
    process: [
      { step: "Pump down", desc: "Recover gas safely into outdoor unit." },
      { step: "Disconnect", desc: "Remove copper, bracket & drainage." },
      { step: "Transport", desc: "Pack unit securely to new site." },
      { step: "Reinstall", desc: "Install at new location & test." },
    ],
    faqs: [
      { q: "Is it cheaper than buying a new one?", a: "Usually yes — if your unit is less than 8 years old and in good condition." },
      { q: "Do you charge extra for long distance?", a: "Cross-area relocation has a small surcharge. WhatsApp us for a full quote." },
    ],
    priceTable: [
      { label: "Dismantle only (per unit)", price: "RM 200" },
      { label: "Dismantle + Relocate (same area)", price: "RM 350" },
      { label: "Dismantle + Relocate (cross area)", price: "RM 450" },
    ],
  },
};
