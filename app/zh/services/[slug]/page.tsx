import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services-data";
import { serviceI18n } from "@/config/services-i18n";
import { ServiceDetailI18n } from "@/components/service-detail-i18n";

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
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
  return <ServiceDetailI18n lang="zh" slug={slug} />;
}
