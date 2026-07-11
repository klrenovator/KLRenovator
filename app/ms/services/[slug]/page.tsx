import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle, buildServiceMetaTitleWithDate } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const DEDICATED_STATIC_SERVICE_SLUGS = new Set(["maintenance-contract"]);
import { servicesData } from "@/config/services-data";
import { serviceI18n } from "@/config/services-i18n";
import { ServiceDetailI18n } from "@/components/service-detail-i18n";
import { TikTokShowcase } from "@/components/sections/tiktok-showcase";
import { buildServiceRouteAlternates } from "@/config/service-route-qa";

export function generateStaticParams() {
  // Round 39 / 8.10 route QA: exclude only routes that have their own
  // dedicated localized static page files. Emergency must remain here for
  // Malay route-generation parity because /ms/services/emergency is served
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
  if (!i18) return { title: "Servis tidak dijumpai" };

  const canonical = `https://www.klrenovator.com/ms/services/${slug}`;
  const price = service?.startPrice ?? "";
  return {
    title: buildServiceMetaTitleWithDate(`${i18.titleMS} KL & Selangor — Dari RM ${price}`, "ms"),
    description: clampMetaDescription(i18.taglineMS),
    openGraph: {
      title: clampMetaTitle(`${i18.titleMS} | KL Renovator`),
      description: clampMetaDescription(i18.taglineMS),
      url: canonical,
      type: "website",
      images: getServiceOGImages(slug, "ms"),
    },
    twitter: {
      card: "summary_large_image",
      title: clampMetaTitle(`${i18.titleMS} | KL Renovator`),
      description: clampMetaDescription(i18.taglineMS),
      images: getServiceOGImages(slug, "ms"),
    },
    alternates: {
      canonical,
      languages: buildServiceRouteAlternates(slug),
    },
  };
}

export default async function MsServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <ServiceDetailI18n lang="ms" slug={slug} />
      {slug === "chemical-wash" && <TikTokShowcase locale="ms" />}
    </>
  );
}