import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";
import { PageExplainers } from "@/components/aeo-explainer-blocks";
import { ToolLinks } from "@/components/calculators/tool-links";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";

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
    images: [{
      url: "https://www.klrenovator.com/hero/sharp-aircond-basic-servicing-cheras-115.webp",
      width: 1200,
      height: 630,
      alt: "Kalkulator saiz BTU dan kuasa kuda aircond — KL Renovator",
    }],
  },
};

export default function BtuCalculatorPageMS() {
  return (
    <>
      <BtuCalculator lang="ms" />
      <section className="border-t border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PrimaryJobPhoto
            seed="https://www.klrenovator.com/ms/btu-calculator"
            pageUrl="https://www.klrenovator.com/ms/btu-calculator"
            title="Kalkulator Saiz Aircond Malaysia | Kira HP Bilik"
            locale="ms"
            hints={["new-installation"]}
            sizes="(min-width: 1024px) 768px, (min-width: 640px) 80vw, 100vw"
          />
        </div>
      </section>
      {/* Definition + comparison blocks (issue #72) — sizing units explained. */}
      <PageExplainers locale="ms" presetId="tool:btu" />
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ToolLinks lang="ms" heading="Kalkulator Aircond Percuma" />
        </div>
      </section>
    </>
  );
}
