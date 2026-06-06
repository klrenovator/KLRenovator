"use client";

import { useState } from "react";
import { FaWhatsapp, FaCheck, FaChevronDown } from "react-icons/fa6";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";

// ─── Accordion Price Table ────────────────────────────────────────────────────
function AccordionPriceTable({
  serviceTitle,
  tableTitle,
  rows,
  note,
  slug,
  defaultOpen = false,
}: {
  serviceTitle: string;
  tableTitle: string;
  rows: { label: string; price: string }[];
  note?: string;
  slug?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Accordion Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">
            {tableTitle}
          </p>
          <p className="text-base font-black text-slate-900 leading-snug">{serviceTitle}</p>
        </div>
        <FaChevronDown
          className={`h-4 w-4 text-slate-400 shrink-0 ml-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Accordion Body */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[2000px]" : "max-h-0"}`}
      >
        <div className="border-t border-slate-100">
          <ul className="divide-y divide-slate-50">
            {rows.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between gap-4 px-6 py-3.5 hover:bg-sky-50/40 transition-colors"
              >
                <span className="text-sm text-slate-600 font-medium">{row.label}</span>
                <span className="text-sm font-black text-sky-700 whitespace-nowrap bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                  {row.price}
                </span>
              </li>
            ))}
          </ul>

          {note && (
            <div className="border-t border-slate-100 bg-emerald-50 px-6 py-3">
              <p className="text-xs text-emerald-700 font-bold flex items-center gap-2">
                <FaCheck className="h-3 w-3 shrink-0" />
                {note}
              </p>
            </div>
          )}

          {/* CTA row */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex flex-wrap items-center gap-3">
            {slug && (
              <Link
                href={`/services/${slug}`}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-sky-600 transition-colors"
              >
                View Full Service Details
                <FaArrowRight className="h-3 w-3" />
              </Link>
            )}
            <a
              href={waLink(`Hi KL Renovator, I want to enquire about: ${serviceTitle}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all ml-auto"
            >
              <FaWhatsapp className="h-3.5 w-3.5" />
              Book This Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const p = siteConfig.pricing;

  // Services in the correct order (matching instruction #5)
  const pricingSections = [
    {
      serviceTitle: "New Unit Installation & Dismantling",
      tableTitle: "Installation Pricing",
      rows: p.installation.rows,
      note: p.installation.note,
      slug: "installation",
      defaultOpen: true,
    },
    {
      serviceTitle: "Basic Servicing / Routine Maintenance",
      tableTitle: "Basic Service Pricing",
      rows: p.basicServicing.rows,
      slug: "basic-servicing",
    },
    {
      serviceTitle: "Pressure Chemical Wash",
      tableTitle: "Chemical Wash Pricing",
      rows: p.chemicalWash.rows,
      slug: "chemical-wash",
    },
    {
      serviceTitle: "Chemical Overhaul",
      tableTitle: "Chemical Overhaul Pricing",
      rows: p.chemicalOverhaul.rows,
      slug: "chemical-overhaul",
    },
    {
      serviceTitle: "Gas Top-Up / Precision Balancing",
      tableTitle: "Gas Top-Up Pricing",
      rows: p.gasTopup.rows,
      slug: "gas-topup",
    },
    {
      serviceTitle: "Troubleshooting & Repairs",
      tableTitle: "Repair & Diagnostic Pricing",
      rows: p.repair.rows,
      slug: "repair",
    },
  ];

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
              Aircond Services &amp; <span className="text-sky-400">Price List</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-medium">
              Transparent pricing — zero hidden fees. Click any service below to view the full breakdown.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
              {["No hidden charges", "Same-day availability", "All brands covered", "1-year workmanship warranty"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-300 font-bold uppercase tracking-wider rounded-full"
                >
                  <FaCheck className="h-2.5 w-2.5 text-sky-400" /> {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Cards — residential/commercial tabs */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Browse by Service</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>All Our </span>
                <span className={title({ size: "sm", color: "brand" })}>HVAC Services</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {siteConfig.services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 40}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-sky-100 transition-all duration-300"
                >
                  <div className="inline-flex p-2.5 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4 w-fit group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-black text-slate-900 text-sm leading-snug mb-2">{service.title}</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed flex-grow">{service.short}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sky-600 text-xs font-black uppercase tracking-wider">
                    View Details <FaArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL ACCORDION PRICE TABLES ─────────────────────────────── */}
      <section id="pricing" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal>
              <p className={eyebrow()}>Detailed Pricing</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Complete </span>
                <span className={title({ size: "sm", color: "brand" })}>Price Guide</span>
              </h2>
              <p className="mt-4 text-slate-500 font-medium">
                Click each service to expand full pricing. All prices are for labour only unless stated.
                Materials (gas, copper pipe, brackets) are quoted separately and approved by you before work starts.
              </p>
            </Reveal>
          </div>

          {/* Accordion list */}
          <div className="space-y-4">
            {pricingSections.map((section, i) => (
              <Reveal key={section.slug} delay={i * 50}>
                <AccordionPriceTable {...section} />
              </Reveal>
            ))}
          </div>

          {/* Materials & Extras */}
          <div className="mt-6 space-y-4">
            <Reveal>
              <AccordionPriceTable
                serviceTitle="Additional Materials & Special Charges"
                tableTitle="Materials Pricing"
                rows={p.materials.rows}
              />
            </Reveal>
            <Reveal delay={50}>
              <AccordionPriceTable
                serviceTitle="Annual Corporate & Residential Maintenance Contracts"
                tableTitle="AMC Packages"
                rows={p.contracts.rows}
              />
            </Reveal>
          </div>

          {/* Volume Discounts */}
          <Reveal>
            <div className="mt-8 bg-sky-950 text-white rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-sky-300 mb-5 flex items-center gap-2">
                🎯 Volume Booking Discounts
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {siteConfig.volumeDiscounts.map((d) => (
                  <div key={d.units} className="bg-sky-900/50 border border-sky-800 rounded-xl p-4 text-center">
                    <p className="text-xl font-black text-white">{d.units}</p>
                    <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mt-1">{d.off}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-sky-400 font-medium">
                * Discount applies to labour charges. Contact us on WhatsApp to confirm.
              </p>
            </div>
          </Reveal>

          {/* Quote CTA */}
          <Reveal>
            <div className="mt-10 bg-slate-950 text-white p-8 sm:p-12 text-center rounded-2xl">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Not sure what you need?
              </h2>
              <p className="mt-3 text-slate-400 font-medium max-w-xl mx-auto">
                Send us a photo of your unit on WhatsApp — we&apos;ll give you an accurate quote within 30 minutes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={waLink(rfqMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
                >
                  <FaWhatsapp className="h-5 w-5" /> Get Free Quote on WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2.5 border-2 border-slate-700 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
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
