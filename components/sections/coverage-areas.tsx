import NextLink from "next/link";
import { FaLocationDot, FaCheck } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";

export const CoverageAreas = () => {
  return (
    <section id="coverage" className="py-20 bg-white relative isolate">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className={eyebrow()}>Local Servicing Network</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>Our Core </span>
              <span className={title({ size: "sm", color: "brand" })}>Coverage Areas</span>
            </h2>
            <p className="mt-4 text-slate-600 font-medium">
              We dispatch professional HVAC teams daily across Kuala Lumpur and Selangor.
              Click any area to see local pricing and service details.
            </p>
          </Reveal>
        </div>

        {/* Areas Grid — each area links to its own SEO page */}
        <div className="mt-12 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {siteConfig.areaPages.map((area, idx) => (
            <Reveal key={area.slug} delay={idx * 25}>
              <NextLink
                href={`/areas/${area.slug}`}
                title={`Aircond Service ${area.name}`}
                className="flex items-center gap-2.5 p-4 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-white hover:border-sky-500 hover:shadow-md transition-all duration-200 group"
              >
                <FaLocationDot className="h-3.5 w-3.5 text-slate-400 group-hover:text-sky-500 transition-colors shrink-0" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide group-hover:text-sky-600 transition-colors">
                  {area.name}
                </span>
              </NextLink>
            </Reveal>
          ))}
        </div>

        {/* Also covers these extra areas */}
        <Reveal delay={100}>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {["Wangsa Maju", "Kepong", "Bukit Jalil", "USJ", "Sunway", "Port Klang",
              "Setia Alam", "Meru", "Kundang", "Balakong", "Pandan Indah", "Dengkil"
            ].map((area) => (
              <span
                key={area}
                className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full"
              >
                {area}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Trust Badge */}
        <div className="mt-10 text-center">
          <Reveal delay={200}>
            <div className="inline-flex items-center gap-2 border border-[#25D366]/20 bg-[#25D366]/5 px-4 py-2.5 rounded-full text-xs font-bold text-[#1ebe5d] uppercase tracking-wider">
              <FaCheck className="h-3.5 w-3.5" /> Rapid Response Dispatch Guaranteed Across All Listed Regions
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
