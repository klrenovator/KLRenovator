// ─────────────────────────────────────────────────────────────────────────
// SEO/Schema helpers — 20H.84 + 20H.85
// ─────────────────────────────────────────────────────────────────────────
// Centralized builders for LocalBusiness / Service / areaServed JSON-LD
// schema. The 20H.84 goal is to emit a comprehensive, properly typed,
// GeoCoordinate-aware areaServed array using `siteConfig.areaPages`
// (40 configured Klang Valley suburbs/cities with lat/lng/state/name)
// instead of flat strings. Round 18 extends the same full footprint to
// every EN/MS/ZH area landing page schema, so the homepage entity and
// area organization entities stay consistent.
// ─────────────────────────────────────────────────────────────────────────

import { siteConfig } from "@/config/site";
import { serviceSchemaParityFields } from "@/config/service-schema-parity";

export type Locale = "en" | "ms" | "zh";

/**
 * Build a comprehensive `areaServed` JSON-LD array for LocalBusiness /
 * HVACBusiness schema. Each entry uses `@type: "City"` (with embedded
 * GeoCoordinates for the city/suburb centre) so Google can match the
 * served area to a real Klang Valley location.
 */
export function buildAreaServedSchema(): Array<Record<string, unknown>> {
  const result: Array<Record<string, unknown>> = [];

  // 1) Per-area City entries (from structured areaPages)
  for (const area of siteConfig.areaPages) {
    if (typeof area.lat === "number" && typeof area.lng === "number") {
      result.push({
        "@type": "City",
        name: area.name,
        containedInPlace: {
          "@type": "State",
          name: area.state || "Selangor",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: area.lat,
          longitude: area.lng,
        },
        url: `https://www.klrenovator.com/areas/${area.slug}`,
      });
    } else {
      // Defensive fallback for any future area without lat/lng
      result.push({
        "@type": "AdministrativeArea",
        name: `${area.name}, Malaysia`,
      });
    }
  }

  // 2) State-level entries so the LocalBusiness is unambiguously
  //    associated with the two states it operates in.
  result.push({
    "@type": "State",
    name: "Kuala Lumpur",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 3.139,
      longitude: 101.6869,
    },
  });
  result.push({
    "@type": "State",
    name: "Selangor",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 3.0738,
      longitude: 101.5183,
    },
  });

  return result;
}

/**
 * Build a `GeoCircle` describing the operational service radius
 * (Klang Valley, ~50 km from KL city centre). This complements the
 * per-City areaServed list by telling Google the rough geographic
 * service area without having to enumerate every neighbourhood.
 */
export function buildServiceAreaGeoCircle(): Record<string, unknown> {
  return {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geoLat,
      longitude: siteConfig.geoLng,
    },
    geoRadius: {
      "@type": "Distance",
      name: "50 km",
      value: 50000,
      unitCode: "MTR",
    },
  };
}

/**
 * Build a `Service` JSON-LD object with Offer + PriceSpecification
 * parity. Used by service detail templates to ensure MS/ZH routes
 * emit the same structured data shape as the EN route (Round 14 /
 * 20H.85).
 */
export function buildServiceSchema(args: {
  slug: string;
  name: string;
  description: string;
  startPrice: number;
  locale?: Locale;
  areasServed?: Array<Record<string, unknown>>;
  priceTable?: ReadonlyArray<{ label: string; price: string }>;
  pricingName?: string;
  priceDescription?: string;
}): Record<string, unknown> {
  const locale = args.locale || "en";
  const baseUrl = "https://www.klrenovator.com";
  const pathPrefix = locale === "en" ? "" : `/${locale}`;
  const url = `${baseUrl}${pathPrefix}/services/${args.slug}`;
  const inLanguage = locale === "ms" ? "ms-MY" : locale === "zh" ? "zh-MY" : "en-MY";
  const priceDescription = args.priceDescription || `Starting from RM ${args.startPrice}`;
  const parity = serviceSchemaParityFields(locale);
  // Compact footprint: the full 40-area geo list lives in the root layout's
  // sitewide #business entity. Repeating it here added ~8 KB (x2 with the RSC
  // flight payload) to every service/price page.
  const areaServed = args.areasServed || [
    { "@type": "City", name: "Kuala Lumpur" },
    { "@type": "State", name: "Selangor" },
    buildServiceAreaGeoCircle(),
  ];

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: args.name,
    description: args.description,
    serviceType: args.name,
    category: "Air conditioning service",
    url,
    datePublished: parity.datePublished,
    dateModified: parity.dateModified,
    inLanguage,
    provider: {
      "@type": "HVACBusiness",
      "@id": `${baseUrl}/#business`,
      name: "KL Renovator",
      telephone: siteConfig.phone,
      url: baseUrl,
    },
    areaServed,
    offers: {
      "@type": "Offer",
      "@id": `${url}#offer`,
      url,
      price: args.startPrice,
      priceCurrency: "MYR",
      availability: "https://schema.org/InStock",
      eligibleRegion: [
        { "@type": "City", name: "Kuala Lumpur" },
        { "@type": "State", name: "Selangor" },
      ],
      priceSpecification: {
        "@type": "PriceSpecification",
        price: args.startPrice,
        priceCurrency: "MYR",
        description: priceDescription,
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: 1,
          unitText: "per unit",
        },
      },
    },
  };

  if (args.priceTable?.length) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: args.pricingName || `${args.name} Pricing`,
      itemListElement: args.priceTable.map((row, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: row.label,
        description: row.price,
        priceCurrency: "MYR",
        itemOffered: {
          "@type": "Service",
          name: args.name,
          url,
        },
      })),
    };
  }

  return schema;
}

/**
 * Build a `BreadcrumbList` JSON-LD object for any hierarchical page.
 */
export function buildBreadcrumbSchema(
  items: ReadonlyArray<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Build a `FAQPage` JSON-LD object from a Q&A list.
 */
export function buildFaqSchema(
  faqs: ReadonlyArray<{ q: string; a: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

/**
 * Build Installation Service Schema for the primary installation pillar page
 */
export function buildInstallationServiceSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.klrenovator.com/aircond-installation-kl#service",
    name: "Aircond Installation KL & Selangor",
    description: "Professional aircond installation from RM199 — wall-mounted, ceiling cassette & window units for all 20 brands. Same-day available, 1-month workmanship warranty, vacuum pump commissioning.",
    serviceType: "Aircon Installation",
    category: "Air conditioning installation",
    url: "https://www.klrenovator.com/aircond-installation-kl",
    provider: {
      "@type": "HVACBusiness",
      "@id": "https://www.klrenovator.com/#business",
      name: "KL Renovator",
      telephone: "+60182983573",
      url: "https://www.klrenovator.com/",
      // Part 4 NAP fix: reference the single source of truth (config/site/core.ts)
      // instead of a hardcoded second address. The previous hardcoded
      // "A-22-09 Magnaville Selayang" block conflicted with the sitewide
      // LocalBusiness address and the Google Business Profile listing.
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.addressStreet,
        postalCode: siteConfig.addressPostal,
        addressLocality: siteConfig.addressCity,
        addressRegion: siteConfig.addressState,
        addressCountry: siteConfig.addressCountry,
      },
      areaServed: [
        { "@type": "State", name: "Kuala Lumpur" },
        { "@type": "State", name: "Selangor" },
      ],
    },
    offers: {
      "@type": "Offer",
      "@id": "https://www.klrenovator.com/aircond-installation-kl#offer",
      url: "https://www.klrenovator.com/aircond-installation-kl",
      price: 199,
      priceCurrency: "MYR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: 199,
        priceCurrency: "MYR",
        description: "Starting from RM 199 for wall-mounted 1.0–1.5 HP including 7ft copper pipe, insulation, electrical wire and drain pipe, vacuum pump commissioning, and 1-month workmanship warranty.",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: 1,
          unitText: "per unit",
        },
      },
      eligibleRegion: [
        { "@type": "City", name: "Kuala Lumpur" },
        { "@type": "City", name: "Petaling Jaya" },
        { "@type": "City", name: "Subang Jaya" },
        { "@type": "City", name: "Shah Alam" },
        { "@type": "City", name: "Klang" },
        { "@type": "City", name: "Cheras" },
        { "@type": "City", name: "Ampang" },
        { "@type": "City", name: "Puchong" },
        { "@type": "City", name: "Damansara" },
        { "@type": "City", name: "Bangsar" },
        { "@type": "City", name: "Mont Kiara" },
        { "@type": "City", name: "Setapak" },
        { "@type": "City", name: "Batu Caves" },
        { "@type": "City", name: "Putrajaya" },
        { "@type": "City", name: "Cyberjaya" },
      ],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aircond Installation Pricing",
      itemListElement: [
        { "@type": "Offer", position: 1, name: "Wall-Mounted 1.0 HP", priceCurrency: "MYR", price: 199, description: "7ft copper pipe, wiring, drain, vacuum, warranty included" },
        { "@type": "Offer", position: 2, name: "Wall-Mounted 1.5 HP", priceCurrency: "MYR", price: 199, description: "7ft copper pipe, wiring, drain, vacuum, warranty included" },
        { "@type": "Offer", position: 3, name: "Wall-Mounted 2.0 HP", priceCurrency: "MYR", price: 249, description: "7ft copper pipe, wiring, drain, vacuum, warranty included" },
        { "@type": "Offer", position: 4, name: "Wall-Mounted 2.5 HP", priceCurrency: "MYR", price: 279, description: "7ft copper pipe, wiring, drain, vacuum, warranty included" },
        { "@type": "Offer", position: 5, name: "Ceiling Cassette 1.0–1.5 HP", priceCurrency: "MYR", price: 290, description: "7ft copper pipe, wiring, drain+pump, suspension kit, vacuum, warranty included" },
        { "@type": "Offer", position: 6, name: "Window Unit 1.0–2.0 HP", priceCurrency: "MYR", price: 180, description: "Window frame mounting, wiring, vacuum, warranty included" },
      ],
    },
  };
}

/**
 * Generic HowTo JSON-LD. Schema must match visible numbered steps on the
 * same page — never emit this without a matching `<ol>` / numbered process.
 */
export function buildHowToSchema(args: {
  name: string;
  description: string;
  url?: string;
  totalTime?: string;
  estimatedCost?: { currency: string; value: string };
  supply?: readonly string[];
  tool?: readonly string[];
  steps: ReadonlyArray<{ name: string; text: string; url?: string }>;
  inLanguage?: string;
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: args.name,
    description: args.description,
    step: args.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  };

  if (args.url) schema.url = args.url;
  if (args.totalTime) schema.totalTime = args.totalTime;
  if (args.inLanguage) schema.inLanguage = args.inLanguage;
  if (args.estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      currency: args.estimatedCost.currency,
      value: args.estimatedCost.value,
    };
  }
  if (args.supply?.length) {
    schema.supply = args.supply.map((name) => ({
      "@type": "HowToSupply",
      name,
    }));
  }
  if (args.tool?.length) {
    schema.tool = args.tool.map((name) => ({
      "@type": "HowToTool",
      name,
    }));
  }

  return schema;
}

/**
 * Build HowTo Schema for the 7-step installation process
 */
export function buildInstallationHowToSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How KL Renovator Installs Your Aircond — 7-Step Process",
    description: "Professional aircond installation process from booking to handover. Vacuum pump commissioning, Type L copper piping, insulation, dedicated electrical circuit, 1-month workmanship warranty.",
    totalTime: "PT4H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "MYR",
      value: "199",
    },
    supply: [
      { "@type": "HowToSupply", name: "Aircond unit (wall-mounted, ceiling cassette, or window unit)" },
      { "@type": "HowToSupply", name: "Type L/Type M copper piping with insulation" },
      { "@type": "HowToSupply", name: "PVC drain pipe with gradient" },
      { "@type": "HowToSupply", name: "Electrical wiring and MCB" },
      { "@type": "HowToSupply", name: "Mounting brackets and vibration dampers" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Two-stage vacuum pump (500 microns)" },
      { "@type": "HowToTool", name: "Flaring tool and torque wrench" },
      { "@type": "HowToTool", name: "Manifold gauge set" },
      { "@type": "HowToTool", name: "purging kit" },
      { "@type": "HowToTool", name: "Digital thermometer and clamp meter" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "WhatsApp Booking & Site Survey",
        text: "Contact KL Renovator via WhatsApp at +60182983573 with your area, unit type (wall-mounted / ceiling cassette / window), and HP size. We confirm pricing and schedule a same-day or next-day site survey. Our technician assesses piping route, outdoor unit placement, and electrical requirements.",
        url: "https://www.klrenovator.com/contact",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Technician Dispatch & Preparation",
        text: "Our certified HVAC technician arrives with all tools, materials (copper pipe, insulations, wiring), and safety equipment. Drop sheets protect your floors and furniture. We confirm the exact installation plan with you before starting.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Copper Piping & Insulation Installation",
        text: "Type L or Type M copper pipes (based on HP size) are cut, flared, and routed neatly. Insulation (minimum 9mm) prevents condensation and energy loss. Pipes are secured with proper brackets — no sagging, no sharp bends that restrict refrigerant flow.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Drain Pipe Installation with Gradient",
        text: "PVC drain pipe installed with minimum 1:50 gradient for gravity drainage. Anti-siphon trap prevents backflow. Condensate tested before closing up. For high-rise condos, we route to nearest floor trap or balcony drain per building management rules.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Electrical Connection & Breaker Check",
        text: "Dedicated circuit with correct MCB rating (16A for 1.0–1.5HP, 20A for 2.0–2.5HP, 32A for 3.0HP+). Wiring sized per Malaysian standards. Earth leakage protection verified. Outdoor unit isolator installed for safety and maintenance access.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Vacuum Pump Commissioning (Mandatory)",
        text: "Two-stage vacuum pump pulls system down to 500 microns or below — removing all moisture and non-condensables. This step is NON-NEGOTIABLE. Skipping vacuuming causes compressor failure, acid formation, and voids manufacturer warranty. We hold vacuum for 15+ minutes to confirm no leaks.",
      },
      {
        "@type": "HowToStep",
        position: 7,
        name: "Refrigerant Release, Testing & Handover",
        text: "Factory charge released. System runs for 15+ minutes. We verify: cooling output (thermometer at supply/return), running pressures, amp draw, thermostat calibration, zero vibration, zero leaks. Written 1-month workmanship warranty card handed over. Job card with checklist signed.",
      },
    ],
  };
}

/**
 * Build FAQPage Schema for installation FAQs
 */
export function buildInstallationFAQSchema(faqs: ReadonlyArray<{ q: string; a: string }>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.klrenovator.com/aircond-installation-kl#faq",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
