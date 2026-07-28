import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Kalkulator Saiz Aircond Malaysia | Kira HP Bilik"),
  description:
    "Kalkulator saiz aircond Malaysia percuma. Kira keperluan BTU & ketahui 'berapa HP aircond untuk bilik' anda dengan cepat & tepat secara online.",
  alternates: buildTrilingualHreflang("/btu-calculator"),
};

export default function BtuCalculatorPageMS() {
  return <BtuCalculator lang="ms" />;
}
