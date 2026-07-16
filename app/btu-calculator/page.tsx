import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("BTU Calculator | Find Your Perfect Aircond Size — KL Renovator"),
  description:
    "Free BTU calculator — find the exact HP aircond you need for your room. Get instant installation cost estimate. Same-day installation from RM 199.",
  alternates: buildTrilingualHreflang("/btu-calculator"),
  openGraph: {
    title: clampMetaTitle("BTU Calculator | Find Your Perfect Aircond Size — KL Renovator"),
    description:
      "Free BTU calculator for Malaysian homes. Input room size, get exact HP recommendation + installation cost. From RM 199, same-day available.",
    url: "https://www.klrenovator.com/btu-calculator",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
  },
};

export default function BtuCalculatorPage() {
  return <BtuCalculator lang="en" />;
}
