export type SiteConfig = typeof siteConfig;

/**
 * Central site configuration.
 * Edit contact numbers / social / brand copy here.
 */
export const siteConfig = {
  name: "Klrenovator",
  tagline: "Aircon Services KL & Selangor",
  description:
    "Trusted aircon service in KL & Selangor. Installation, chemical wash, servicing, gas top-up, repair, ceiling cassette & more. Fast quotes via WhatsApp.",

  // 🔧 Change these before going live
  phone: "+60182983573",
  phoneDisplay: "+60 18-298 3573",
  whatsapp: "60182983573",
  email: "info@klrenovator.com",
  address: "Kuala Lumpur, Malaysia",
  hours: "Mon–Sun · 9:00 AM – 9:00 PM",

  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/#contact" },
  ],

  areas: [
    "Kuala Lumpur",
    "Petaling Jaya",
    "Subang Jaya",
    "Shah Alam",
    "Cheras",
    "Ampang",
    "Damansara",
    "Puchong",
    "Klang",
    "Kajang",
    "Bangsar",
    "Mont Kiara",
    "Setapak",
    "Sentul",
    "Putrajaya",
    "Cyberjaya",
  ],

  // Services list (homepage grid + /services/[slug] pages)
  services: [
    {
      slug: "chemical-wash",
      title: "Chemical Wash",
      short: "Deep chemical cleaning that removes mould, dust & bacteria.",
      startPrice: 130,
      icon: "flask-conical",
    },
    {
      slug: "chemical-overhaul",
      title: "Chemical Overhaul",
      short: "Complete unit removal & deep-clean — the ultimate restoration.",
      startPrice: 220,
      icon: "sparkles",
    },
    {
      slug: "basic-servicing",
      title: "Basic Servicing",
      short: "Routine maintenance to keep your aircon cool & efficient.",
      startPrice: 99,
      icon: "wrench",
    },
    {
      slug: "gas-topup",
      title: "Gas Top-Up",
      short: "R22, R410A & R32 refill to restore cooling performance.",
      startPrice: 80,
      icon: "gauge",
    },
    {
      slug: "repair",
      title: "Aircon Repair",
      short: "Troubleshoot & fix cooling, noise, leak or electrical issues.",
      startPrice: 88,
      icon: "settings",
    },
    {
      slug: "installation",
      title: "Installation",
      short: "Professional installation — all brands, all HP sizes.",
      startPrice: 250,
      icon: "plug",
    },
    {
      slug: "ceiling-cassette",
      title: "Ceiling Cassette",
      short: "Install & service for commercial cassette units.",
      startPrice: 250,
      icon: "layout-grid",
    },
    {
      slug: "dismantling-relocation",
      title: "Dismantle & Relocate",
      short: "Safe dismantling and relocation when you move house.",
      startPrice: 200,
      icon: "move",
    },
  ],

  // Per-HP pricing — values from acservice.my
  pricing: {
    chemicalWash: {
      title: "Chemical Wash",
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
      title: "Basic Servicing",
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
      title: "Gas Top-Up",
      rows: [
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
      title: "Repair Services",
      rows: [
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
      title: "Installation (Labour Only)",
      rows: [
        { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 250" },
        { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 280" },
        { label: "Wall-Mounted · 3.0 HP", price: "RM 350" },
        { label: "Wall-Mounted · 4.0 – 5.0 HP", price: "RM 550" },
        { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 250" },
        { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 350" },
        { label: "Ceiling Cassette · 3.5 – 6.0 HP", price: "RM 400" },
      ],
      note: "Includes free 7 ft copper pipe, wiring, and drainage",
    },
    materials: {
      title: "Additional Materials",
      rows: [
        { label: "Copper pipe · 1.0 – 1.5 HP", price: "RM 22 – 25 / ft" },
        { label: "Copper pipe · 3.0 – 3.5 HP", price: "RM 30 – 35 / ft" },
        { label: "Standard bracket", price: "RM 20" },
        { label: "Heavy-duty bracket", price: "RM 35" },
        { label: "Cable tray", price: "RM 50" },
        { label: "Trunking / conduit", price: "RM 15 – 25 / m" },
        { label: "Wall hacking", price: "RM 80 – 200" },
        { label: "High-rise access", price: "RM 50 – 150" },
        { label: "Electrical plug installation", price: "RM 100" },
      ],
    },
    contracts: {
      title: "Maintenance Contracts",
      rows: [
        { label: "Residential · 2 – 4 units / year", price: "RM 499" },
        { label: "Residential · 5+ units / year", price: "RM 999" },
      ],
    },
  },

  // Volume discount messaging
  volumeDiscounts: [
    { units: "2 – 3 units", off: "5% off" },
    { units: "4 – 8 units", off: "10% off" },
    { units: "8+ units", off: "15% off" },
  ],

  stats: [
    { label: "Happy customers", value: "5,000+" },
    { label: "Years experience", value: "10+" },
    { label: "5-star reviews", value: "500+" },
    { label: "Response time", value: "< 30 min" },
  ],

  links: {
    whatsapp: "https://wa.me/60182983573",
    facebook: "#",
    instagram: "#",
    tiktok: "#",
    googleMaps: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
  },
};
