import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { ToolLinks } from "@/components/calculators/tool-links";

export const metadata: Metadata = {
  title: clampMetaTitle("Senarai Harga Servis Aircond KL & Selangor | KL Renovator"),
  description:
    padMetaDescription("Senarai harga servis aircond KL & Selangor — cuci kimia dari RM 120, overhaul dari RM 220, tambah gas & pemasangan. Tiada caj tersembunyi."),
  alternates: {
    canonical: "https://www.klrenovator.com/ms/services",
    languages: {
      "en-MY": "https://www.klrenovator.com/services",
      "ms-MY": "https://www.klrenovator.com/ms/services",
      "zh-MY": "https://www.klrenovator.com/zh/services",
      "x-default": "https://www.klrenovator.com/services",
    },
  },
  openGraph: {
    title: clampMetaTitle("Senarai Harga Servis Aircond | KL Renovator"),
    description: "Cuci kimia, overhaul, tambah gas, pemasangan & pembaikan — senarai harga penuh.",
    url: "https://www.klrenovator.com/ms/services",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/generic-aircond-basic-servicing-ampang-104.webp",
      width: 1200,
      height: 630,
      alt: "Senarai harga servis aircond KL & Selangor — KL Renovator",
    }],
  },
};

export default function MsServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Free calculator tools — internal linking on every service page */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks lang="ms" heading="Kalkulator Aircond Percuma" />
        </div>
      </section>
    </>
  );
}
