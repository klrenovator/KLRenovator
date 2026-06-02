import { Metadata } from "next";

import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Professional Aircond Services KL & Selangor | KL Renovator",
  description: "Explore our full HVAC matrix from Pressure Chemical Wash, Chemical Overhaul, to precision Gas Top-ups and New Unit Inverter installations across Klang Valley.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Dynamic Structural Header Block */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Our Solutions</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Aircond Service <span className="text-sky-400">Matrix</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-medium">
              Transparent upfront pricing with zero hidden charges. Premium workmanship backed by Multicore Dynamic Resources.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Services Content Area */}
      <ServicesWithPricing />

      {/* Trust Blocks & Area Dispatch Support */}
      <CoverageAreas />
      <ReadyToBook />
    </>
  );
}
