import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { ensureCtaDescription } from "@/lib/seo-description-optimizer";
import { BrandInstallationLandingPage } from "@/components/brand-installation-page";
import {
  getBrandInstallationContent,
  getAllBrandInstallationSlugs,
} from "@/config/brand-installation-content";

// This route is backed by a finite typed content registry.
// Unknown slugs must be a real 404, never an indexable fallback page.
export const dynamicParams = false;

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
  if (!brand) return { title: "Brand not found" };

  const c = getBrandInstallationContent(slug, "en");
  const enUrl = `https://www.klrenovator.com/brands/${slug}/installation`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}/installation`;
  const zhUrl = `https://www.klrenovator.com/zh/brands/${slug}/installation`;

  return {
    title: c.metaTitle,
    description: ensureCtaDescription(c.metaDescription),
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      type: "website",
      locale: "en_MY",
      url: enUrl,
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
      canonical: enUrl,
      languages: {
        "en-MY": enUrl,
        "ms-MY": msUrl,
        "zh-MY": zhUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default async function BrandInstallationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) notFound();

  return <BrandInstallationLandingPage slug={slug} locale="en" />;
}
