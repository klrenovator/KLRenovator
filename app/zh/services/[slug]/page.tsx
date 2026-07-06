import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const DEDICATED_STATIC_SERVICE_SLUGS = new Set(["emergency", "maintenance-contract"]);
import { servicesData } from "@/config/services-data";
import { serviceI18n } from "@/config/services-i18n";
import { ServiceDetailI18n } from "@/components/service-detail-i18n";
import { TikTokShowcase } from "@/components/sections/tiktok-showcase";

export function generateStaticParams() {
  // Round 22 / AMC hotfix: exclude service routes that have their own
  // dedicated static page files. Including maintenance-contract here can
  // let the dynamic [slug] route prerender a notFound() response because
  // servicesData intentionally does not contain the AMC landing-page copy.
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
    title: `${i18.titleZH} 吉隆坡及雪兰莪 | KL Renovator — 从 RM ${price}`,
    description: i18.taglineZH,
    openGraph: {
      title: `${i18.titleZH} | KL Renovator`,
      description: i18.taglineZH,
      url: canonical,
      type: "website",
    },
    alternates: {
      canonical,
      languages: {
        "en-MY": `https://www.klrenovator.com/services/${slug}`,
        "ms-MY": `https://www.klrenovator.com/ms/services/${slug}`,
        "zh-MY": canonical,
        "x-default": `https://www.klrenovator.com/services/${slug}`,
      },
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
      {slug === "chemical-wash" && <TikTokShowcase locale="zh" />}
    </>
  );
}
