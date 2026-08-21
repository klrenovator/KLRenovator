// P2-03: Site config split into typed domain collections (config/site/*) to improve maintainability and avoid giant diffs.
// This barrel file re-assembles the legacy siteConfig shape so existing imports continue to work.
// New code should import directly from config/site/* where possible.

import { areaPages } from "./site/areas";
import { kampungPages } from "./site/kampungs";
import { brandPages } from "./site/brands";
import { problemPages } from "./site/problems";
import { brandsSupported } from "./site/brands-supported";
import { services } from "./site/services";
import { pricing } from "./site/pricing";
import { volumeDiscounts } from "./site/volume-discounts";
import { stats } from "./site/stats";
import { links } from "./site/links";
import { areaNames } from "./site/core";
import { googlePlace } from "./reviews";

export const siteConfig = {
  name: "KL Renovator",
  parentCompany: "Multicore Dynamics Resources",
  legalName: "Multicore Dynamics Resources",
  ssm: "003765188-T",
  ssmFull: "202503227236 (003765188-T)",
  tagline: "Aircond Installation, Servicing & Repair KL & Selangor",
  description:
    "KL Renovator provides expert aircond installation (from RM199), professional servicing, chemical wash, overhaul, gas top-up (from RM 2.50/PSI) and repairs in Kuala Lumpur & Selangor. Serving Batu Caves, Ampang, Cheras, Petaling Jaya, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Wangsa Maju, Kepong, Sri Petaling, Bukit Jalil, Kota Damansara, Ara Damansara, Sunway, USJ, Port Klang, Bukit Tinggi, Setia Alam, Meru, Rawang, Kundang, Semenyih, Balakong, Seri Kembangan, Pandan Indah, Putrajaya, Cyberjaya & Dengkil. Same-day installation and servicing for Daikin, Panasonic, Mitsubishi, York, LG, Midea, Samsung & 13 more brands. Transparent pricing confirmed before work begins.",
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
  reviewCount: googlePlace.totalReviews,
  reviewRating: googlePlace.averageRating,
  reviewLastUpdated: googlePlace.lastUpdated,

  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],

  areas: areaNames,

  areaPages,
  kampungPages,
  brandPages,
  problemPages,

  brandsSupported,
  services,
  pricing,
  volumeDiscounts,
  stats,
  links,
};

export type SiteConfig = typeof siteConfig;

// Re-export individual collections for direct consumption (P2-03)
export { areaPages } from "./site/areas";
export { kampungPages } from "./site/kampungs";
export { brandPages } from "./site/brands";
export { problemPages } from "./site/problems";
export { brandsSupported } from "./site/brands-supported";
export { services } from "./site/services";
export { pricing } from "./site/pricing";
export { volumeDiscounts } from "./site/volume-discounts";
export { stats } from "./site/stats";
export { links } from "./site/links";
