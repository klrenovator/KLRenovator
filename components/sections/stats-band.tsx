import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";

export const StatsBand = () => {
  return (
    <section className="bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-800 border border-brand-800">
            {siteConfig.stats.map((s) => (
              <div
                key={s.label}
                className="bg-brand-900 px-5 py-6 text-center"
              >
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {s.value}
                </p>
                <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-300">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
