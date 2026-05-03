import type { Metadata } from "next";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { title, eyebrow } from "@/components/primitives";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: `Full list of aircon services & transparent pricing — chemical wash, installation, repair, gas top-up, ceiling cassette and more across KL & Selangor.`,
};

export default function ServicesIndexPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative bg-ink text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero/WhatsApp Image 2026-05-03 at 13.39.34.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
              Our Services
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
              Aircon services
              <br />
              <span className="text-brand-300">done right.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Whether it&apos;s a chemical wash, a full installation, or an
              emergency repair — our team delivers clean, careful work with
              transparent pricing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition"
              >
                <FaWhatsapp className="h-4 w-4" />
                Request a Quote
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-white/40 hover:bg-white hover:text-ink px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition"
              >
                <FaPhoneAlt className="h-3.5 w-3.5" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ServicesWithPricing showHeading={false} />

      {/* Pricing breakdown */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className={eyebrow()}>Pricing</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>Honest, </span>
                <span className={title({ size: "md", color: "brand" })}>
                  transparent rates.
                </span>
              </h2>
              <p className="mt-4 text-slate-600">
                Starting prices listed here. Material costs (gas, copper pipe,
                brackets) are quoted separately and approved before any work
                begins.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {Object.values(siteConfig.pricing).map((block, i) => (
              <Reveal key={block.title} delay={i * 60}>
                <div className="border border-slate-200 bg-white">
                  <div className="bg-ink text-white px-5 py-4">
                    <h3 className="text-base font-extrabold uppercase tracking-tight">
                      {block.title}
                    </h3>
                  </div>
                  <ul className="divide-y divide-slate-200">
                    {block.rows.map((r) => (
                      <li
                        key={r.label}
                        className="flex items-center justify-between gap-3 px-5 py-3"
                      >
                        <span className="text-sm text-slate-700">{r.label}</span>
                        <span className="text-sm font-bold text-brand-700 whitespace-nowrap">
                          {r.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {"note" in block && block.note && (
                    <p className="px-5 py-3 text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
                      {block.note}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CoverageAreas />
      <ReadyToBook />
    </>
  );
}
