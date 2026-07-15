import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { KampungInstallationLandingPage } from "@/components/kampung-installation-page";
import {
  getKampungInstallationContent,
  getAllKampungInstallationParams,
} from "@/config/kampung-installation-content";

export function generateStaticParams() {
  return getAllKampungInstallationParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; kampung: string }>;
}): Promise<Metadata> {
  const { slug, kampung } = await params;
  const k = siteConfig.kampungPages.find(
    (x) => x.slug === kampung && x.parentSlug === slug,
  );
  if (!k) return { title: "Kawasan tidak dijumpai" };

  const c = getKampungInstallationContent(slug, kampung, "ms");
  const enUrl = `https://www.klrenovator.com/areas/${slug}/${kampung}/installation`;
  const msUrl = `https://www.klrenovator.com/ms/areas/${slug}/${kampung}/installation`;
  const zhUrl = `https://www.klrenovator.com/zh/areas/${slug}/${kampung}/installation`;

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

export default async function KampungInstallationPageMS({
  params,
}: {
  params: Promise<{ slug: string; kampung: string }>;
}) {
  const { slug, kampung } = await params;
  const k = siteConfig.kampungPages.find(
    (x) => x.slug === kampung && x.parentSlug === slug,
  );
  if (!k) notFound();

  return <KampungInstallationLandingPage parentSlug={slug} kampungSlug={kampung} locale="ms" />;
}
