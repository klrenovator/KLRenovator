// Core business identity split from site.ts (P2-03)
export const businessIdentity = {

  name: "KL Renovator",
  parentCompany: "Multicore Dynamics Resources",
  legalName: "Multicore Dynamics Resources",
  ssm: "003765188-T",
  ssmFull: "202503227236 (003765188-T)",
  tagline: "Aircond Installation, Servicing & Repair KL & Selangor",
  description:
    "KL Renovator provides expert aircond installation (from RM199), professional servicing, chemical wash, overhaul, gas top-up (from RM 2.50/PSI) and repairs in Kuala Lumpur & Selangor. Serving Batu Caves, Ampang, Cheras, Petaling Jaya, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Wangsa Maju, Kepong, Sri Petaling, Bukit Jalil, Kota Damansara, Ara Damansara, Sunway, USJ, Port Klang, Bukit Tinggi, Setia Alam, Meru, Rawang, Kundang, Semenyih, Balakong, Seri Kembangan, Pandan Indah, Putrajaya, Cyberjaya & Dengkil. Same-day installation and servicing for Daikin, Panasonic, Mitsubishi, York, LG, Midea, Samsung & 13 more brands. Transparent pricing confirmed before work begins.",
  // Short version for HTML <meta name="description">, OG, and Twitter cards —
  // Google truncates around 155-160 characters, so the long `description`
  // above (used for JSON-LD schema, where length doesn't hurt) is NOT
  // suitable for these tags. This one is kept inside the 150-158 char
  // target range from the project's own CTR-optimization brief.
  metaDescription:
    "Expert aircond installation from RM199 — plus servicing, chemical wash, overhaul & repairs across KL & Selangor. Same-day, transparent pricing. 20 brands.",

  phone: "+60182983573",
  phoneDisplay: "+60 18-298 3573",
  whatsapp: "60182983573",
  whatsappLink: "https://wa.me/60182983573?text=Hi%20KL%20Renovator,%20I%20want%20to%20book%20an%20aircond%20service%20for%20my%20home/office.",
  email: "info@klrenovator.com",
  address: "Jalan Kiara, Mont Kiara, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
  addressStreet: "Jalan Kiara, Mont Kiara",
  addressCity: "Kuala Lumpur",
  addressPostal: "50480",
  addressState: "Wilayah Persekutuan Kuala Lumpur",
  addressCountry: "MY",
  geoLat: 3.1670,
  geoLng: 101.6520,
  hours: "Mon–Sun · 9:00 AM – 6:00 PM (Everyday Open)",
  googleMapsEmbed: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
  googleBusinessProfile: "https://share.google/HhXvqWDkefZ5bzNdL",
  reviewCount: 500,
  reviewRating: 5,
  reviewLastUpdated: "2026-07-11",

  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],

  };

export const areaNames = [
    "Kuala Lumpur", "Cheras", "Ampang", "Setapak", "Wangsa Maju",
    "Kepong", "Sri Petaling", "Bukit Jalil", "Mont Kiara", "Bangsar",
    "Desa ParkCity", "Taman Melawati", "Hulu Kelang",
    "Petaling Jaya", "Subang Jaya", "Shah Alam", "Puchong", "Damansara",
    "Kota Damansara", "Ara Damansara", "Sunway", "USJ", "Bandar Utama", "SS2",
    "Klang", "Port Klang", "Bukit Tinggi", "Setia Alam", "Meru",
    "Kota Kemuning", "Bukit Jelutong", "Glenmarie",
    "Batu Caves", "Selayang", "Rawang", "Kundang", "Sungai Buloh",
    "Kajang", "Semenyih", "Balakong", "Seri Kembangan", "Pandan Indah",
    "Bandar Puteri", "Putrajaya", "Cyberjaya", "Dengkil",
    "Selangor", "Sentul", "Bandar Botanic",
  ];
