import { FaMapMarkerAlt } from "react-icons/fa";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { title, eyebrow } from "@/components/primitives";

export const CoverageAreas = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className={eyebrow()}>Coverage</p>
            <h2 className="mt-3">
              <span className={title({ size: "md" })}>Servicing all of </span>
              <span className={title({ size: "md", color: "brand" })}>
                KL &amp; Selangor.
              </span>
            </h2>
            <p className="mt-4 text-slate-600">
              From condos in Mont Kiara to landed homes in Kajang, our team
              covers the entire Klang Valley.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {siteConfig.areas.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-ink hover:border-brand-700 hover:text-brand-700 transition"
              >
                <FaMapMarkerAlt className="h-3 w-3 text-brand-700" />
                {a}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
