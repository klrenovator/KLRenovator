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
}): Record<string, unknown> {
  const locale = args.locale || "en";
  const baseUrl = "https://www.klrenovator.com";
  const pathPrefix = locale === "en" ? "" : `/${locale}`;
  const url = `${baseUrl}${pathPrefix}/services/${args.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url,
    provider: {
      "@type": "HVACBusiness",
      "@id": `${baseUrl}/#business`,
      name: "KL Renovator",
      telephone: siteConfig.phone,
    },
    areaServed: args.areasServed || [
      { "@type": "City", name: "Kuala Lumpur" },
      { "@type": "State", name: "Selangor" },
    ],
    offers: {
      "@type": "Offer",
      price: args.startPrice,
      priceCurrency: "MYR",
      availability: "https://schema.org/InStock",
      url,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: args.startPrice,
        priceCurrency: "MYR",
        description: `Starting from RM ${args.startPrice}`,
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: 1,
          unitText: "per unit",
        },
      },
    },
  };
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
