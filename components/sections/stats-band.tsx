import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";

export const StatsBand = () => {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800">
            {siteConfig.stats.map((s) => (
              <div
                key={s.label}
                className="bg-slate-950 px-5 py-8 text-center hover:bg-slate-900 transition-colors"
              >
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  {s.value}
                </p>
                <p className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400">
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
