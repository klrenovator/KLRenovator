import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";
import { ToolLinks } from "@/components/calculators/tool-links";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Size Calculator Malaysia | BTU Calculator"),
  description:
    padMetaDescription("Free aircond size calculator Malaysia. Calculate the exact BTU & HP you need for your room size. Find 'berapa HP aircond untuk bilik' instantly."),
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
  return (
    <>
      <BtuCalculator lang="en" />
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ToolLinks />
        </div>
      </section>
    </>
  );
}
