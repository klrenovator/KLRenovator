import { Metadata } from "next";
import { FaWhatsapp, FaCheck } from "react-icons/fa6";

import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Aircond Services & Price List KL & Selangor | KL Renovator",
  description:
    "Full aircond service price list for Kuala Lumpur & Selangor. Chemical wash from RM99, chemical overhaul from RM220, gas top-up from RM80, installation from RM199. No hidden fees.",
};

// ── Reusable Price Table Component ──────────────────────────
function PriceTable({
  title: tableTitle,
  rows,
  note,
}: {
  title: string;
  rows: { label: string; price: string }[];
  note?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 overflow-hidden">
      <div className="bg-slate-950 px-5 py-3">
        <h3 className="text-sm font-black uppercase tracking-widest text-white">
          {tableTitle}
        </h3>
      </div>
      <ul className="divide-y divide-slate-100">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm text-slate-700 font-medium">{row.label}</span>
            <span className="text-sm font-black text-sky-700 whitespace-nowrap">
              {row.price}
            </span>
          </li>
        ))}
      </ul>
      {note && (
        <div className="border-t border-slate-100 bg-sky-50 px-5 py-3">
          <p className="text-xs text-sky-700 font-bold">✓ {note}</p>
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const p = siteConfig.pricing;

  return (
    <>
      {/* Page Header */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 mb-4">
              Our Solutions
            </p>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Aircond Service <span className="text-sky-400">Price List</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-medium">
              Transparent pricing — zero hidden fees. All prices below are
              standard rates for KL &amp; Selangor.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
              {[
                "No hidden charges",
                "Same-day availability",
                "All brands covered",
                "1-year workmanship warranty",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-300 font-bold uppercase tracking-wider"
                >
                  <FaCheck className="h-2.5 w-2.5 text-sky-400" /> {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Cards with Tab Filter */}
      <ServicesWithPricing />

      {/* ── FULL PRICE TABLES ──────────────────────────────── */}
      <section id="pricing" className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <p className={eyebrow()}>Detailed Pricing</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Complete </span>
                <span className={title({ size: "sm", color: "brand" })}>
                  Price Guide
                </span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium">
                All prices are for labour only unless stated. Material costs
                (gas, copper pipe, brackets) quoted separately and approved by
                you before work starts.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <PriceTable
                title={p.chemicalWash.title}
                rows={p.chemicalWash.rows}
              />
            </Reveal>

            <Reveal delay={60}>
              <PriceTable
                title={p.chemicalOverhaul.title}
                rows={p.chemicalOverhaul.rows}
              />
            </Reveal>

            <Reveal delay={80}>
              <PriceTable
                title={p.basicServicing.title}
                rows={p.basicServicing.rows}
              />
            </Reveal>

            <Reveal delay={100}>
              <PriceTable
                title={p.gasTopup.title}
                rows={p.gasTopup.rows}
              />
            </Reveal>

            <Reveal delay={120}>
              <PriceTable
                title={p.repair.title}
                rows={p.repair.rows}
              />
            </Reveal>

            <Reveal delay={140}>
              <PriceTable
                title={p.installation.title}
                rows={p.installation.rows}
                note={p.installation.note}
              />
            </Reveal>
          </div>

          {/* Materials & Extras */}
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal>
              <PriceTable
                title={p.materials.title}
                rows={p.materials.rows}
              />
            </Reveal>

            <Reveal delay={60}>
              <div className="flex flex-col gap-8">
                <PriceTable
                  title={p.contracts.title}
                  rows={p.contracts.rows}
                />

                {/* Volume Discounts */}
                <div className="bg-sky-950 text-white p-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-sky-300 mb-4">
                    Volume Booking Discounts
                  </h3>
                  <ul className="space-y-3">
                    {siteConfig.volumeDiscounts.map((d) => (
                      <li
                        key={d.units}
                        className="flex items-center justify-between gap-2 border-b border-sky-900 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="text-sm font-bold text-sky-100">
                          {d.units}
                        </span>
                        <span className="text-xs font-black text-sky-300 uppercase tracking-wider">
                          {d.off}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-sky-400 font-medium">
                    * Discount applies to labour charges. Contact us on
                    WhatsApp to confirm.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Quote CTA */}
          <Reveal>
            <div className="mt-16 bg-slate-950 text-white p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Not sure what you need?
              </h2>
              <p className="mt-3 text-slate-400 font-medium max-w-xl mx-auto">
                Send us a photo of your unit on WhatsApp — we&apos;ll give you
                an accurate quote within 30 minutes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={waLink(rfqMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all"
                >
                  <FaWhatsapp className="h-5 w-5" /> Get Free Quote on WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2.5 border-2 border-slate-700 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all"
                >
                  Call {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CoverageAreas />
      <ReadyToBook />
    </>
  );
}
