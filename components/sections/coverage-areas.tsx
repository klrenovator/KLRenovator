"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { title, eyebrow } from "@/components/primitives";

export const CoverageAreas = () => {
  return (
    <section id="coverage" className="py-16 sm:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className={eyebrow()}>Service Network</p>
            <h2 className="mt-3">
              <span className={title({ size: "md" })}>Our Professional Aircond </span>
              <br className="sm:hidden" />
              <span className={title({ size: "md", color: "brand" })}>
                Coverage Areas
              </span>
            </h2>
            <p className="mt-4 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              KL Renovator deploys active, fast-response HVAC expert teams across the entire Klang Valley region. From residential high-rise condos to large commercial corporate hubs, we provide on-demand same-day operations throughout Kuala Lumpur and Selangor.
            </p>
          </div>
        </Reveal>

        {/* High-Scannable Semantic Location Badge Grid */}
        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
            {siteConfig.areas.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-800 shadow-sm hover:border-slate-900 hover:text-slate-950 transition-all duration-150 cursor-default select-none"
              >
                <FaMapMarkerAlt className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                <span>{a}</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* Engine Footnote Signal */}
        <Reveal>
          <p className="mt-8 text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">
            Active Hubs · Ampang · Cheras · Petaling Jaya · Subang Jaya · Puchong · Shah Alam
          </p>
        </Reveal>
      </div>
    </section>
  );
};
