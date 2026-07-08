export type ServiceSchemaLocale = "en" | "ms" | "zh";

export const SERVICE_SCHEMA_DATE_PUBLISHED = "2026-06-19";
export const SERVICE_SCHEMA_DATE_MODIFIED = "2026-07-08";

export const SERVICE_SCHEMA_REVIEWED_BY = {
  "@type": "Organization",
  name: "KL Renovator's HVAC Expert Team",
  url: "https://www.klrenovator.com/about",
} as const;

export const SERVICE_SCHEMA_PUBLISHER = {
  "@type": "Organization",
  "@id": "https://www.klrenovator.com/#business",
  name: "KL Renovator",
  url: "https://www.klrenovator.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.klrenovator.com/logo/image.png",
  },
} as const;

export function serviceSchemaLanguage(locale: ServiceSchemaLocale) {
  return locale === "ms" ? "ms-MY" : locale === "zh" ? "zh-MY" : "en-MY";
}

export function serviceSchemaParityFields(locale: ServiceSchemaLocale) {
  return {
    datePublished: SERVICE_SCHEMA_DATE_PUBLISHED,
    dateModified: SERVICE_SCHEMA_DATE_MODIFIED,
    inLanguage: serviceSchemaLanguage(locale),
    publisher: SERVICE_SCHEMA_PUBLISHER,
    reviewedBy: SERVICE_SCHEMA_REVIEWED_BY,
  } as const;
}
