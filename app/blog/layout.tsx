import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aircond Tips & Expert Guides | KL Renovator Blog",
  description:
    "Practical aircond advice from KL Renovator — chemical wash vs overhaul, why aircon not cold, how often to service, refrigerant gas types R22 R410A R32, and more.",
  alternates: {
    canonical: "https://www.klrenovator.com/blog",
    languages: {
      "en-MY": "https://www.klrenovator.com/blog",
      "ms-MY": "https://www.klrenovator.com/blog",
      "zh-MY": "https://www.klrenovator.com/blog",
      "x-default": "https://www.klrenovator.com/blog",
    },
  },
  openGraph: {
    title: "Aircond Tips & Expert Guides | KL Renovator Blog",
    description:
      "Practical aircond maintenance guides, troubleshooting tips, and service advice from Malaysia's trusted HVAC specialist.",
    url: "https://www.klrenovator.com/blog",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [{ url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630 }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.klrenovator.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.klrenovator.com/blog",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://www.klrenovator.com/blog#blog",
    name: "KL Renovator Aircond Tips & Guides",
    description:
      "Expert aircond maintenance guides, troubleshooting tips, pricing breakdowns and service advice for Kuala Lumpur and Selangor homeowners.",
    url: "https://www.klrenovator.com/blog",
    publisher: {
      "@type": "Organization",
      "@id": "https://www.klrenovator.com/#organization",
      name: "KL Renovator",
      logo: {
        "@type": "ImageObject",
        url: "https://www.klrenovator.com/logo/image.png",
      },
    },
    inLanguage: ["en", "ms", "zh"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {children}
    </>
  );
}
