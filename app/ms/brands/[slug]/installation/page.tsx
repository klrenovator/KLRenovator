import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { BrandInstallationLandingPage } from "@/components/brand-installation-page";
import {
  getBrandInstallationContent,
  getAllBrandInstallationSlugs,
} from "@/config/brand-installation-content";

export function generateStaticParams() {
  return getAllBrandInstallationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) return { title: "Jenama tidak dijumpai" };

  const c = getBrandInstallationContent(slug, "ms");
  const enUrl = `https://www.klrenovator.com/brands/${slug}/installation`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}/installation`;
  const zhUrl = `https://www.klrenovator.com/zh/brands/${slug}/installation`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      type: "website",
      locale: "ms_MY",
      url: msUrl,
      siteName: "KL Renovator",
      images: [{ url: c.ogImage, width: 1200, height: 630, alt: c.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.ogTitle,
      description: c.ogDescription,
      images: [c.ogImage],
    },
    alternates: {
      canonical: msUrl,
      languages: {
        "en-MY": enUrl,
        "ms-MY": msUrl,
        "zh-MY": zhUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default async function BrandInstallationPageMS({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) notFound();

  return <BrandInstallationLandingPage slug={slug} locale="ms" />;
}
