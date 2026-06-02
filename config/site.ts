export type SiteConfig = typeof siteConfig;

/**
 * Central site configuration for KL Renovator (Multicore Dynamic Resources).
 * Super-optimized for Google SEO, GEO (AI Engines Citation), and Local Klang Valley Conversions.
 * Core Focus: Residential & Commercial HVAC/Airconditioning Solutions.
 */
export const siteConfig = {
  name: "KL Renovator",
  parentCompany: "Multicore Dynamic Resources",
  tagline: "Expert Aircond Servicing, Chemical Overhaul & Repair KL & Selangor",
  description:
    "KL Renovator provides professional residential and commercial aircond servicing in Kuala Lumpur & Selangor. Specialized in Pressure Chemical Wash, Chemical Overhaul, Precision Gas Top-ups (R22, R410A, R32 balancing), Troubleshooting & New Installations for Daikin, Panasonic, Mitsubishi, York, LG, Midea & Samsung. Fast response and transparent pricing across Klang Valley.",

  // 🔧 Verified Contact & Business Information
  phone: "+60182983573",
  phoneDisplay: "+60 18-298 3573",
  whatsapp: "60182983573",
  whatsappLink: "https://wa.me/60182983573?text=Hi%20KL%20Renovator,%20I%20want%20to%20book%20an%20aircond%20service%20for%20my%20home/office.",
  email: "info@klrenovator.com",
  address: "Kuala Lumpur & Selangor, Malaysia",
  hours: "Mon–Sun · 9:00 AM – 6:00 PM (Everyday Open)",

  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/#contact" },
  ],

  // Core Klang Valley Target Areas for Hyper-Local SEO
  areas: [
    "Kuala Lumpur",
    "Selangor",
    "Ampang",
    "Cheras",
    "Petaling Jaya",
    "Subang Jaya",
    "Puchong",
    "Shah Alam",
    "Damansara",
    "Klang",
    "Kajang",
    "Bangsar",
    "Mont Kiara",
    "Setapak",
    "Sentul",
    "Putrajaya",
    "Cyberjaya",
  ],

  // Top HVAC Brands Managed & Serviced
  brandsSupported: [
    "Daikin",
    "Panasonic",
    "Mitsubishi",
    "York",
    "Midea",
    "LG",
    "Samsung",
  ],

  // Fact-Dense Services Data Optimized for AI Engine Crawlers & Semantic Search
  services: [
    {
      slug: "chemical-wash",
      title: "Pressure Chemical Wash",
      short: "Deep high-pressure chemical cleaning to remove stubborn mould, dust, bacteria and improve cooling airflow.",
      startPrice: 120,
      icon: "flask-conical",
      targetProblem: "Slow cooling, foul smell, low airflow, dusty air extraction.",
    },
    {
      slug: "chemical-overhaul",
      title: "Chemical Overhaul",
      short: "Complete dismantling of the indoor unit for ultimate deep cleaning. Permanently stops severe water leaking issues.",
      startPrice: 220,
      icon: "sparkles",
      targetProblem: "Water leaking, ice formation, complete blockage, system choking.",
    },
    {
      slug: "basic-servicing",
      title: "Basic Servicing / Routine Maintenance",
      short: "Regular standard aircond filter cleaning and multi-point diagnostic check to maintain peak energy efficiency.",
      startPrice: 99,
      icon: "wrench",
      targetProblem: "Routine 6-month checkup, electrical current load optimization.",
    },
    {
      slug: "gas-topup",
      title: "Gas Top-Up (R22, R410A, R32)",
      short: "Precision refrigerant balancing and pressure level top-up for eco-friendly R32, R410A, and traditional R22 systems.",
      startPrice: 100,
      icon: "gauge",
      targetProblem: "Aircond running but blowing warm air, low gas pressure.",
    },
    {
      slug: "repair",
      title: "Troubleshooting & Repairs",
      short: "Expert diagnosis and replacement of faulty aircond parts like capacitors, fan motors, sensor coils, or main copper wiring.",
      startPrice: 88,
      icon: "settings",
      targetProblem: "Noisy outdoor unit, sudden auto shut-off, blinking green timer light, wiring sparks.",
    },
    {
      slug: "installation",
      title: "New Unit Installation",
      short: "Professional residential and commercial AC setup. Dismantling of old models and installation of high-efficiency inverter units.",
      startPrice: 199,
      icon: "plug",
      targetProblem: "Upgrading old non-inverter systems, moving into new office/house.",
    },
    {
      slug: "ceiling-cassette",
      title: "Ceiling Cassette Solutions",
      short: "Heavy-duty commercial ceiling cassette servicing, chemical wash, and maintenance for corporate layouts.",
      startPrice: 290,
      icon: "layout-grid",
      targetProblem: "Commercial office hot spots, corporate annual maintenance contract needs.",
    },
    {
      slug: "dismantling-relocation",
      title: "Dismantle & Relocate",
      short: "Safe and risk-free extraction of existing indoor/outdoor units with proper refrigerant sealing for relocation.",
      startPrice: 90,
      icon: "move",
      targetProblem: "House moving, business shop shifting, office renovation adjustments.",
    },
  ],

  // Structured Pricing for Client Clarity & Schema Generation
  pricing: {
    chemicalWash: {
      title: "Pressure Chemical Wash",
      rows: [
        { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 160" },
        { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 220" },
        { label: "Wall-Mounted · 3.0 HP", price: "RM 250" },
        { label: "Wall-Mounted · 4.0 – 5.0 HP", price: "RM 280" },
        { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 220" },
        { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 280" },
        { label: "Ceiling Cassette · 4.0 – 5.0 HP", price: "RM 350" },
        { label: "Floor Standing · 3.0 – 5.0 HP", price: "RM 320" },
        { label: "Window Unit · 1.0 – 2.0 HP", price: "RM 130" },
        { label: "Window Unit · 2.5 – 3.0 HP", price: "RM 160" },
      ],
    },
    chemicalOverhaul: {
      title: "Chemical Overhaul",
      rows: [
        { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 220" },
        { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 280" },
        { label: "Wall-Mounted · 3.0 HP", price: "RM 350" },
        { label: "Ceiling Cassette · 1.0 – 3.0 HP", price: "RM 380 – 480" },
      ],
    },
    basicServicing: {
      title: "Basic Servicing / Cleaning",
      rows: [
        { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 99" },
        { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 150" },
        { label: "Wall-Mounted · 3.0 HP", price: "RM 180" },
        { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 150" },
        { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 200" },
        { label: "Ceiling Cassette · 3.5 – 5.0 HP", price: "RM 250" },
      ],
    },
    gasTopup: {
      title: "Gas Top-Up Balancing",
      rows: [
        { label: "R22 Freon Gas · 1.0 HP", price: "RM 80 – 100" },
        { label: "R22 Freon Gas · 1.5 – 2.0 HP", price: "RM 100 – 130" },
        { label: "R22 Freon Gas · 2.5 – 3.0 HP", price: "RM 130 – 160" },
        { label: "R410A Eco Gas · 1.0 HP", price: "RM 100 – 120" },
        { label: "R410A Eco Gas · 1.5 – 2.0 HP", price: "RM 120 – 150" },
        { label: "R410A Eco Gas · 2.5 – 3.0 HP", price: "RM 150 – 180" },
        { label: "R32 Next-Gen Gas · 1.0 HP", price: "RM 130 – 150" },
        { label: "R32 Next-Gen Gas · 1.5 – 2.0 HP", price: "RM 150 – 180" },
        { label: "R32 Next-Gen Gas · 2.5 – 3.0 HP", price: "RM 180 – 200" },
      ],
    },
    repair: {
      title: "Troubleshooting & Component Repair",
      rows: [
        { label: "Diagnostic / Troubleshoot Fee (Waived with repair)", price: "RM 88" },
        { label: "Copper Sensor Replacement", price: "RM 150" },
        { label: "Outdoor Capacitor Replacement", price: "RM 150" },
        { label: "Blower / Fan Motor Replacement", price: "RM 200 – 500" },
        { label: "PCB / Main Electronic Control Board", price: "RM 300 – 800" },
        { label: "Compressor Replacement Work", price: "RM 800 – 2,000" },
        { label: "Thermostat Mechanism Control", price: "RM 120 – 200" },
        { label: "Internal Water Drain Pump", price: "RM 200 – 400" },
      ],
    },
    installation: {
      title: "Installation Work (Labour & Standard Piping)",
      rows: [
        { label: "Wall-Mounted Setup · 1.0 – 1.5 HP", price: "RM 250" },
        { label: "Wall-Mounted Setup · 2.0 – 2.5 HP", price: "RM 280" },
        { label: "Wall-Mounted Setup · 3.0 HP", price: "RM 350" },
        { label: "Wall-Mounted Setup · 4.0 – 5.0 HP", price: "RM 550" },
        { label: "Ceiling Cassette Setup · 1.0 – 1.5 HP", price: "RM 250" },
        { label: "Ceiling Cassette Setup · 2.0 – 3.0 HP", price: "RM 350" },
        { label: "Ceiling Cassette Setup · 3.5 – 6.0 HP", price: "RM 400" },
      ],
      note: "Standard professional installation includes free 7 ft copper pipe, heavy duty wiring, and system drainage layout.",
    },
    materials: {
      title: "Additional High-Quality Materials",
      rows: [
        { label: "Premium Copper Pipe · 1.0 – 1.5 HP", price: "RM 22 – 25 / ft" },
        { label: "Premium Copper Pipe · 3.0 – 3.5 HP", price: "RM 30 – 35 / ft" },
        { label: "Standard Outdoor Bracket", price: "RM 20" },
        { label: "Heavy-Duty Outdoor Bracket", price: "RM 35" },
        { label: "Protective Cable Tray Setup", price: "RM 50" },
        { label: "PVC Trunking / Conduit Layout", price: "RM 15 – 25 / m" },
        { label: "Wall Hacking & Concealment Work", price: "RM 80 – 200" },
        { label: "High-Rise / Difficult Access Charge", price: "RM 50 – 150" },
        { label: "Dedicated Electrical Plug Point Installation", price: "RM 100" },
      ],
    },
    contracts: {
      title: "Annual Corporate & Residential Maintenance Contracts",
      rows: [
        { label: "Residential Package · 2 – 4 units / year contract", price: "RM 499" },
        { label: "Residential Package · 5+ units / year contract", price: "RM 999" },
      ],
    },
  },

  // Instant booking volume discount setups
  volumeDiscounts: [
    { units: "2 – 3 units", off: "5% off instant booking discount" },
    { units: "4 – 8 units", off: "10% off instant booking discount" },
    { units: "8+ units", off: "15% off instant booking discount" },
  ],

  stats: [
    { label: "Happy Klang Valley Customers", value: "5,000+" },
    { label: "Years HVAC Experience", value: "10+" },
    { label: "5-Star Verified Reviews", value: "500+" },
    { label: "Emergency Response Time", value: "< 30 min" },
  ],

  links: {
    whatsapp: "https://wa.me/60182983573",
    facebook: "https://www.facebook.com/share/18BpXK69Ai/",
    instagram: "https://www.instagram.com/klrneovator?igsh=cWp0enU0MjRsNHk1",
    tiktok: "#",
    googleMaps: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
  },
};
