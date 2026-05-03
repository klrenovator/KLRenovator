import type { Metadata } from "next";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { FAQ } from "@/components/sections/faq";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about aircon services from ${siteConfig.name} — pricing, warranty, brands, and more.`,
};

export default function FaqPage() {
  return (
    <>
      <section className="relative bg-ink text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero/WhatsApp Image 2026-05-03 at 13.39.30.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
              Knowledge Base
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
              Frequently asked
              <br />
              <span className="text-brand-300">questions.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Pricing, warranty, brands, areas covered — quick answers to the
              things customers ask us most.
            </p>
          </Reveal>
        </div>
      </section>

      <FAQ showHeading={false} />
      <ReadyToBook />
    </>
  );
}
