import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { PriceCalculator } from "@/components/price-calculator";
import { BookingButton } from "@/components/booking-button";
import { title, subtitle } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent aircon service pricing for KL & Selangor — per-HP rates for servicing, chemical wash, gas top-up, installation and more.",
};

const sections = [
  { key: "normalService", name: "Normal Service" },
  { key: "chemicalWash", name: "Chemical Wash" },
  { key: "chemicalOverhaul", name: "Chemical Overhaul" },
  { key: "gasTopup", name: "Gas Top-Up" },
  { key: "installation", name: "Installation" },
  { key: "repair", name: "Repair" },
  { key: "dismantle", name: "Dismantle & Relocate" },
] as const;

export default function PricingPage() {
  return (
    <>
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Pricing
              </p>
              <h1 className="mt-2">
                <span className={title({ size: "lg" })}>Simple, </span>
                <span className={title({ size: "lg", color: "brand" })}>
                  honest per-HP rates.
                </span>
              </h1>
              <p className={subtitle({ class: "mt-3" })}>
                No hidden fees. Material costs (gas, copper pipe, trunking) are always quoted separately and confirmed before we start.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Calculator + Pricing list */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="lg:sticky lg:top-24 self-start">
            <Reveal>
              <PriceCalculator />
            </Reveal>
          </div>

          <div className="space-y-8">
            {sections.map((section, idx) => {
              const rows = siteConfig.pricing[
                section.key as keyof typeof siteConfig.pricing
              ] as { hp: string; price: number }[];
              return (
                <Reveal key={section.key} delay={idx * 40}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="border-b border-slate-200 dark:border-slate-800 px-5 py-4 bg-slate-50 dark:bg-slate-800/50">
                      <h2 className="font-bold text-slate-900 dark:text-white">
                        {section.name}
                      </h2>
                    </div>
                    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                      {rows.map((r) => (
                        <li
                          key={r.hp}
                          className="flex items-center justify-between px-5 py-3.5"
                        >
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {r.hp}
                          </span>
                          <span className="text-sm font-bold text-brand-600">
                            RM {r.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Material note + CTA */}
      <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white">
                What extra material may cost
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                For installation or relocation, the total may include:
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm">
                {[
                  "Copper pipe (≈ RM 40 / m)",
                  "PVC trunking (≈ RM 25 / m)",
                  "Drain pipe extension",
                  "Additional wiring",
                  "Bracket / mount",
                  "Gas (if original insufficient)",
                ].map((m) => (
                  <li key={m} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                We always tell you the material cost before starting. No surprise billing.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 flex justify-center">
            <BookingButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
