import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Size Calculator Malaysia | BTU Calculator"),
  description:
    "Free aircond size calculator Malaysia. Calculate the exact BTU & HP you need for your room size. Find 'berapa HP aircond untuk bilik' instantly.",
  alternates: buildTrilingualHreflang("/btu-calculator"),
  openGraph: {
    title: clampMetaTitle("Aircond Size Calculator Malaysia | BTU Calculator"),
    description:
      "Free aircond size calculator Malaysia. Input room dimensions & find the exact aircond HP needed. Accurate BTU calculation & installation costs.",
    url: "https://www.klrenovator.com/btu-calculator",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
  },
};

export default function BtuCalculatorPage() {
  return <BtuCalculator lang="en" />;
}
