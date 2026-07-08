export type ServiceRouteLocale = "en" | "ms" | "zh";

export const SERVICE_ROUTE_QA_SLUGS = [
  "chemical-wash",
  "chemical-overhaul",
  "gas-topup",
  "repair",
  "installation",
  "basic-servicing",
  "ceiling-cassette",
  "dismantling-relocation",
  "emergency",
] as const;

export type ServiceRouteQASlug = (typeof SERVICE_ROUTE_QA_SLUGS)[number];

export const SERVICE_ROUTE_QA_LOCALES: ServiceRouteLocale[] = ["en", "ms", "zh"];

export const SERVICE_ROUTE_QA_EXPECTED_ROUTE_COUNT = SERVICE_ROUTE_QA_SLUGS.length * SERVICE_ROUTE_QA_LOCALES.length;

export function serviceRoutePath(slug: string, locale: ServiceRouteLocale) {
  if (locale === "en") return `/services/${slug}`;
  return `/${locale}/services/${slug}`;
}

export function serviceRouteUrl(slug: string, locale: ServiceRouteLocale) {
  return `https://www.klrenovator.com${serviceRoutePath(slug, locale)}`;
}

export function buildServiceRouteAlternates(slug: string) {
  return {
    "en-MY": serviceRouteUrl(slug, "en"),
    "ms-MY": serviceRouteUrl(slug, "ms"),
    "zh-MY": serviceRouteUrl(slug, "zh"),
    "x-default": serviceRouteUrl(slug, "en"),
  };
}

export const SERVICE_ROUTE_QA_CHECKLIST = {
  taskId: "8.10",
  scope: "9 core service routes × 3 languages = 27 route/metadata/hreflang checks",
  checks: [
    "Every EN/MS/ZH core service route returns 200 OK",
    "Every route emits a self-canonical URL",
    "Every route emits en-MY, ms-MY, zh-MY and x-default hreflang alternates",
    "Every route has a localized title and meta description",
    "MS/ZH emergency routes are included in generateStaticParams() because they do not have dedicated static page files",
  ],
} as const;
