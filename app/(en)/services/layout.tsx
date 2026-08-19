import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolLinks } from "@/components/calculators/tool-links";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Services & Price List KL Selangor | KL Renovator"),
  description:
    padMetaDescription("Full aircond service price list for KL & Selangor — chemical wash from RM 120, overhaul from RM 220, gas top-up & installation. No hidden fees."),
  alternates: buildTrilingualHreflang("/services"),
  openGraph: {
    title: clampMetaTitle("Aircond Services & Price List | KL Renovator"),
    description: "Chemical wash, overhaul, gas top-up, installation & repair — full price list with zero hidden fees.",
    url: "https://www.klrenovator.com/services",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [{ url: "https://www.klrenovator.com/hero/midea-aircond-basic-servicing-petaling-jaya-17.webp", width: 1200, height: 630, alt: "KL Renovator aircond services & price list KL Selangor" }],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.klrenovator.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.klrenovator.com/services" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
      {/* Free calculator tools — internal linking on every service page */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks />
        </div>
      </section>
    </>
  );
}
