import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolsHub } from "@/components/calculators/tools-hub";

const PAGE_URL = "https://www.klrenovator.com/ms/tools";

export const metadata: Metadata = {
  title: clampMetaTitle("Kalkulator & Alat Aircond Percuma Malaysia"),
  description:
    "Kalkulator aircond percuma Malaysia: kos pemasangan, kos tambah gas, BTU & HP, saiz aircond, kos elektrik, penjimatan inverter & cadangan servis. Anggaran segera dari KL Renovator.",
  alternates: buildTrilingualHreflang("/tools", "ms"),
  openGraph: {
    title: clampMetaTitle("Kalkulator & Alat Aircond Percuma"),
    description:
      "6 kalkulator aircond percuma: kos pemasangan, tambah gas, BTU/HP, saiz, elektrik & penjimatan inverter. Segera, tepat, mesra mudah alih.",
    url: PAGE_URL,
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Kalkulator & Alat Aircond Percuma Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Kalkulator & Alat Aircond Percuma"),
    description: "Kalkulator kos pemasangan, tambah gas, BTU, saiz, elektrik & penjimatan — percuma.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"],
  },
};

export default function MsToolsPage() {
  return <ToolsHub lang="ms" />;
}
