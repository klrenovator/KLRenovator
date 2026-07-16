import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Kalkulator BTU | Cari Saiz Aircond Sempurna — KL Renovator"),
  description:
    "Kalkulator BTU percuma — cari HP aircond yang tepat untuk bilik anda. Dapatkan anggaran kos pemasangan serta-merta. Pemasangan hari sama dari RM 199.",
  alternates: buildTrilingualHreflang("/btu-calculator"),
};

export default function BtuCalculatorPageMS() {
  return <BtuCalculator lang="ms" />;
}
