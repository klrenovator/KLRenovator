import { clampMetaDescription, padMetaDescription, ensureCtaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle, buildServiceMetaTitleWithDate } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const DEDICATED_STATIC_SERVICE_SLUGS = new Set(["maintenance-contract"]);
import { servicesData } from "@/config/services-data";
import { serviceI18n } from "@/config/services-i18n";
import { ServiceDetailI18n } from "@/components/service-detail-i18n";
import { buildServiceRouteAlternates } from "@/config/service-route-qa";

// This route is backed by a finite typed content registry.
// Unknown slugs must be a real 404, never an indexable fallback page.
export const dynamicParams = false;

export function generateStaticParams() {
  // dedicated localized static page files. Emergency must remain here for
  // Chinese route-generation parity because /zh/services/emergency is served
  // by this localized dynamic template.
  return siteConfig.services
    .filter((s) => !DEDICATED_STATIC_SERVICE_SLUGS.has(s.slug))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i18 = serviceI18n[slug];
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!i18) return { title: "找不到该服务" };

  const canonical = `https://www.klrenovator.com/zh/services/${slug}`;
  const price = service?.startPrice ?? "";
  return {
    title: buildServiceMetaTitleWithDate(`${i18.titleZH} KL & Selangor — From RM ${price}`, "zh"),
    description: ensureCtaDescription(padMetaDescription(i18.taglineZH)),
    openGraph: {
      title: buildServiceMetaTitleWithDate(`${i18.titleZH} KL & Selangor — From RM ${price}`, "zh"),
      description: padMetaDescription(i18.taglineZH),
      url: canonical,
      type: "website",
      images: getServiceOGImages(slug, "zh"),
    },
    twitter: {
      card: "summary_large_image",
      title: clampMetaTitle(`${i18.titleZH} | KL Renovator`),
      description: padMetaDescription(i18.taglineZH),
      images: getServiceOGImages(slug, "zh"),
    },
    alternates: {
      canonical,
      languages: buildServiceRouteAlternates(slug),
    },
  };
}

export default async function ZhServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  return (
    <>
      <ServiceDetailI18n lang="zh" slug={slug} />
    </>
  );
}