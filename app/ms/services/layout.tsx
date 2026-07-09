import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";

export const metadata: Metadata = {
  title: clampMetaTitle("Senarai Harga Servis Aircond KL & Selangor | KL Renovator"),
  description:
    "Senarai harga servis aircond KL & Selangor — cuci kimia dari RM 120, overhaul dari RM 220, tambah gas & pemasangan. Tiada caj tersembunyi.",
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
  },
};

export default function MsServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
