"use client";

import { FaLocationDot, FaCheck } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";

export const CoverageAreas = () => {
  return (
    <section id="coverage" className="py-20 bg-white relative isolate">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Stream */}
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className={eyebrow()}>Local Servicing Network</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>Our Core </span>
              <span className={title({ size: "sm", color: "brand" })}>Coverage Areas</span>
            </h2>
            <p className="mt-4 text-slate-600 font-medium">
              We dispatch professional HVAC teams daily across Kuala Lumpur and Selangor. Fast arrival guaranteed within Klang Valley.
            </p>
          </Reveal>
        </div>

        {/* Areas Matrix Grid */}
        <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {siteConfig.areas.map((area, idx) => (
            <Reveal key={area} delay={idx * 30}>
              <div className="flex items-center gap-2.5 p-4 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-white hover:border-sky-500 hover:shadow-md transition-all duration-200 group">
                <FaLocationDot className="h-3.5 w-3.5 text-slate-400 group-hover:text-sky-500 transition-colors shrink-0" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">{area}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Local Verification Trust Badge */}
        <div className="mt-12 text-center">
          <Reveal delay={200}>
            <div className="inline-flex items-center gap-2 border border-[#22c55e]/20 bg-[#22c55e]/5 px-4 py-2.5 rounded-full text-xs font-bold text-[#16a34a] uppercase tracking-wider">
              <FaCheck className="h-3.5 w-3.5" /> Rapid Response Dispatch Guaranteed Across All Listed Regions
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
