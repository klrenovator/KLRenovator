import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";
import { PageExplainers } from "@/components/aeo-explainer-blocks";
import { ToolLinks } from "@/components/calculators/tool-links";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

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
    images: [{
      url: "https://www.klrenovator.com/hero/sharp-aircond-basic-servicing-cheras-115.webp",
      width: 1200,
      height: 630,
      alt: "Aircond BTU and horsepower size calculator — KL Renovator",
    }],
  },
};

export default function BtuCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.klrenovator.com/" },
        { name: "BTU Calculator", url: "https://www.klrenovator.com/btu-calculator" },
      ]} />
      <BtuCalculator lang="en" />
      <section className="border-t border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PrimaryJobPhoto
            seed="https://www.klrenovator.com/btu-calculator"
            pageUrl="https://www.klrenovator.com/btu-calculator"
            title="Aircond Size Calculator Malaysia | BTU Calculator"
            locale="en"
            hints={["new-installation"]}
            sizes="(min-width: 1024px) 768px, (min-width: 640px) 80vw, 100vw"
          />
        </div>
      </section>
      {/* Definition + comparison blocks (issue #72) — sizing units explained. */}
      <PageExplainers locale="en" presetId="tool:btu" />
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ToolLinks />
        </div>
      </section>
    </>
  );
}
