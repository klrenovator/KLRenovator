// Server component — this page has no state, effects or event handlers.
// It was marked "use client", which pulled the shared UI/config chunk into
// the browser for all three locale variants.

import Image from "next/image";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";

export const metadata = {
  title: clampMetaTitle("Aircond Services KL & Selangor — Installation, Wash, Repair"),
  description: padMetaDescription("Professional aircond servicing, chemical wash, overhaul, gas top-up and installation across KL & Selangor. Same-day slots, transparent pricing from RM99."),
};

import { FaWhatsapp, FaCheck } from "react-icons/fa6";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

import { PriceComparisonUI } from "@/components/price-comparison";
import { ReviewTrustWidget } from "@/components/review-trust-widget";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { title, eyebrow } from "@/components/primitives";
import { sitePublic } from "@/config/site-public";
import { waLink, rfqMsg } from "@/lib/whatsapp";

function StaticPriceTable({
  serviceTitle,
  tableTitle,
  rows,
  note,
  slug,
}: {
  serviceTitle: string;
  tableTitle: string;
  rows: { label: string; price: string }[];
  note?: string;
  slug?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full flex items-center justify-between px-6 py-5 bg-slate-50">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">
            {tableTitle}
          </p>
          <p className="text-base font-black text-slate-900 leading-snug">{serviceTitle}</p>
        </div>
      </div>

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
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all ml-auto"
          >
            <FaWhatsapp className="h-3.5 w-3.5" />
            Book This Service
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const p = sitePublic.pricing;

  return (
    <>
      {/* Page Header — White */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/lg-aircond-gas-topup-r410a-puchong-40.webp"
            alt="KL Renovator professional aircond services Kuala Lumpur"
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-4">
              Our Solutions
            </p>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              Aircond Services &amp; <span className="text-sky-500">Price List</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-500 font-medium">
              Transparent pricing — zero hidden fees. Click any service below to view the full breakdown.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
              {["No hidden charges", "Same-day availability", "All brands covered", "1-month workmanship warranty"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 font-bold uppercase tracking-wider rounded-full"
                >
                  <FaCheck className="h-2.5 w-2.5 text-sky-500" /> {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Cards */}
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
            {sitePublic.services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 40}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-sky-100 transition-all duration-300"
                >
                  <div className="inline-flex p-2.5 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4 w-fit group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-black text-slate-900 text-sm leading-snug mb-2">{service.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed flex-grow">{service.short}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sky-600 text-xs font-black uppercase tracking-wider">
                    View Details <FaArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & AMC — Always Visible */}
      <section id="materials" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal>
              <p className={eyebrow()}>Transparent Materials Costs</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Materials Pricing & </span>
                <span className={title({ size: "sm", color: "brand" })}>Special Charges</span>
              </h2>
              <p className="mt-4 text-slate-500 font-medium">
                All material costs are quoted and confirmed with you before work begins. No surprises.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            <Reveal>
              <StaticPriceTable
                serviceTitle="Additional Materials & Special Charges"
                tableTitle="Materials Pricing"
                rows={p.materials.rows}
              />
            </Reveal>
            <Reveal delay={50}>
              <StaticPriceTable
                serviceTitle="Annual Corporate & Residential Maintenance Contracts"
                tableTitle="AMC Packages"
                rows={p.contracts.rows}
              />
            </Reveal>
          </div>

          {/* Volume Discounts */}
          <Reveal>
            <div className="mt-8 bg-sky-600 text-white rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-sky-100 mb-5 flex items-center gap-2">
                🎯 Volume Booking Discounts
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {sitePublic.volumeDiscounts.map((d) => (
                  <div key={d.units} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                    <p className="text-xl font-black text-white">{d.units}</p>
                    <p className="text-xs font-bold text-sky-200 uppercase tracking-wider mt-1">{d.off}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-sky-200 font-medium">
                * Discount applies to labour charges. Contact us on WhatsApp to confirm.
              </p>
            </div>
          </Reveal>

          {/* Quote CTA */}
          <Reveal>
            <div className="mt-10 bg-[#0284c7] text-white p-8 sm:p-12 text-center rounded-2xl">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Not sure what you need?
              </h2>
              <p className="mt-3 text-sky-100 font-medium max-w-xl mx-auto">
                Send us a photo of your unit on WhatsApp — we&apos;ll give you an accurate quote within 30 minutes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={waLink(rfqMsg)}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
                >
                  <FaWhatsapp className="h-5 w-5" /> Get Free Quote on WhatsApp
                </a>
                <a
                  href={`tel:${sitePublic.phone}`}
                  className="inline-flex items-center gap-2.5 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
                >
                  Call {sitePublic.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10.10 Click-Depth: Quick Price Guides — ensure ≤2 clicks from /services */}
      <section className="py-12 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">Popular Price Guides</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Transparent Aircond Pricing — No Hidden Fees</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <Link href="/aircond-service-price-malaysia" className="group rounded-2xl border border-amber-200 bg-white p-6 hover:border-amber-400 hover:shadow-md transition-all"><div className="text-2xl mb-3">💰</div><h3 className="font-black text-slate-900 text-base group-hover:text-amber-700 transition-colors">Aircond Service Price 2026</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">Full service price list — basic, chemical wash, gas, repair. All prices confirmed upfront.</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-amber-600 group-hover:gap-2 transition-all">View Prices <FiArrowRight className="h-3 w-3" /></span></Link>
            <Link href="/installation-price-malaysia" className="group rounded-2xl border border-sky-200 bg-white p-6 hover:border-sky-400 hover:shadow-md transition-all"><div className="text-2xl mb-3">🔧</div><h3 className="font-black text-slate-900 text-base group-hover:text-sky-700 transition-colors">Installation Price Guide</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">New AC from RM 199. Full materials &amp; warranty. Same-day available.</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600 group-hover:gap-2 transition-all">View Guide <FiArrowRight className="h-3 w-3" /></span></Link>
            <Link href="/aircond-installation-kl" className="group rounded-2xl border border-emerald-200 bg-white p-6 hover:border-emerald-400 hover:shadow-md transition-all"><div className="text-2xl mb-3">🏗️</div><h3 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition-colors">Aircond Installation KL & Selangor</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">Expert installation from RM 199. 7-step process, vacuum pump, Type L copper, 1-month warranty. Same-day available.</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:gap-2 transition-all">View Installation <FiArrowRight className="h-3 w-3" /></span></Link>
            <Link href="/cuci-aircond-kl" className="group rounded-2xl border border-emerald-200 bg-white p-6 hover:border-emerald-400 hover:shadow-md transition-all"><div className="text-2xl mb-3">🧹</div><h3 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition-colors">Chemical Wash KL Guide</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">Cuci aircond KL dari RM 120. Same-day booking across Klang Valley.</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:gap-2 transition-all">Cuci Aircond KL <FiArrowRight className="h-3 w-3" /></span></Link>
          </div>
        </div>
      </section>
      <PriceComparisonUI locale="en" />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <ReviewTrustWidget locale="en" />
      </div>
      <CoverageAreas />
      <ReadyToBook />
    </>
  );
}