import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";
import { ToolLinks } from "@/components/calculators/tool-links";

export const metadata: Metadata = {
  title: clampMetaTitle("Kalkulator Saiz Aircond Malaysia | Kira HP Bilik"),
  description:
    padMetaDescription("Kalkulator saiz aircond Malaysia percuma. Kira keperluan BTU & ketahui 'berapa HP aircond untuk bilik' anda dengan cepat & tepat secara online."),
  alternates: buildTrilingualHreflang("/btu-calculator", "ms"),
  // og:locale was inherited from the root layout as en_MY, so Facebook,
  // WhatsApp and LinkedIn previews announced this localized page as English.
  openGraph: {
    url: "https://www.klrenovator.com/ms/btu-calculator",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
  },
};

export default function BtuCalculatorPageMS() {
  return (
    <>
      <BtuCalculator lang="ms" />
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ToolLinks lang="ms" heading="Kalkulator Aircond Percuma" />
        </div>
      </section>
    </>
  );
}
