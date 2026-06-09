import type { Metadata } from "next";
import NextLink from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Aircond Service by Brand KL & Selangor | KL Renovator",
  description:
    "KL Renovator services all major aircond brands in KL & Selangor — Daikin, Panasonic, Mitsubishi, York, Acson, LG, Samsung, Sharp, Midea, Haier, Toshiba, Hitachi, Carrier, Fujitsu and Gree. Call +60182983573.",
  openGraph: {
    title: "Aircond Service by Brand KL & Selangor | KL Renovator",
    description:
      "All major aircond brands serviced in KL & Selangor. Chemical wash, gas top-up, repairs & installation. Call +60182983573.",
    url: "https://www.klrenovator.com/brands",
    type: "website",
  },
  alternates: { canonical: "https://www.klrenovator.com/brands" },
};

const waMsg =
  "Hi KL Renovator, I need help with my aircond. Please advise on service and pricing.";

export default function BrandsPage() {
  const brands = siteConfig.brandPages;

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>All Brands Covered</p>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>Aircond Service </span>
              <span className={title({ size: "lg", color: "brand" })}>
                by Brand
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              KL Renovator services all major aircond brands across Kuala Lumpur
              and Selangor. Select your brand below for specific service
              information, pricing, and supported models.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> WhatsApp for Booking
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>15 Brands</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Select Your </span>
                <span className={title({ size: "sm", color: "brand" })}>
                  Aircond Brand
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {brands.map((brand, i) => (
              <Reveal key={brand.slug} delay={i * 20}>
                <NextLink
                  href={`/brands/${brand.slug}`}
                  className="group flex flex-col bg-white border border-slate-200 hover:border-sky-200 hover:shadow-md rounded-2xl p-5 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-base text-slate-900 group-hover:text-sky-700 transition-colors">
                      {brand.name}
                    </h3>
                    <FiArrowRight className="h-4 w-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed flex-1 mb-4">
                    {brand.description.substring(0, 90)}...
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.gasTypes.map((gas) => (
                      <span
                        key={gas}
                        className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full"
                      >
                        {gas}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-xs font-black text-sky-600 uppercase tracking-wider">
                      View {brand.name} Service →
                    </span>
                  </div>
                </NextLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why KL Renovator for All Brands */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Why Choose Us</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>
                  We Service Every Brand —{" "}
                </span>
                <span className={title({ size: "sm", color: "brand" })}>
                  All Models
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: "All 15+ Brands Supported",
                desc: "Daikin, Panasonic, Mitsubishi Electric, York, Acson, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu and Gree — every major brand sold in Malaysia.",
              },
              {
                title: "All Gas Types: R22, R410A, R32",
                desc: "Whether your unit uses older R22, common R410A, or the latest eco-friendly R32 refrigerant, KL Renovator handles all gas types with precision manifold balancing.",
              },
              {
                title: "Inverter & Non-Inverter",
                desc: "Both inverter and non-inverter models serviced. Wall-mounted, ceiling cassette, floor standing, window unit and multi-split systems all covered.",
              },
              {
                title: "Transparent Quote Before Work",
                desc: "No matter which brand you have, you receive a confirmed quote before any work starts. No hidden charges, no surprises.",
              },
              {
                title: "Same-Day Service Available",
                desc: "Most brand service jobs can be booked same-day across KL and Selangor. WhatsApp +60182983573 to confirm availability.",
              },
              {
                title: "1-Month Workmanship Warranty",
                desc: "All service and repair work carries a 1-month workmanship warranty regardless of brand. If the same issue recurs, we return at no extra charge.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 30}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="w-8 h-8 bg-sky-50 border border-sky-100 rounded-lg flex items-center justify-center mb-3">
                    <FiCheck className="h-4 w-4 text-sky-600" />
                  </div>
                  <h3 className="font-black text-sm text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-black uppercase tracking-widest text-sky-400 mb-2">
                Pricing — All Brands
              </p>
              <h2 className="text-2xl font-black uppercase text-white">
                Standard Service Pricing
              </h2>
              <p className="mt-2 text-slate-400 text-sm font-medium">
                Same pricing applies to all brands. Confirmed before work
                starts.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                service: "Basic Servicing",
                price: "From RM 99",
                note: "Wall-mounted 1–1.5 HP",
              },
              {
                service: "Chemical Wash",
                price: "From RM 120",
                note: "Wall-mounted 1–1.5 HP",
              },
              {
                service: "Chemical Overhaul",
                price: "From RM 220",
                note: "Wall-mounted 1–1.5 HP",
              },
              {
                service: "Gas Top-Up",
                price: "From RM 120",
                note: "R22 · 1.0 HP",
              },
              {
                service: "Gas Top-Up R410A",
                price: "From RM 150",
                note: "R410A · 1.0 HP",
              },
              {
                service: "Gas Top-Up R32",
                price: "From RM 180",
                note: "R32 · 1.0 HP",
              },
              {
                service: "Repair / Diagnostic",
                price: "From RM 88",
                note: "Waived if repaired same visit",
              },
              {
                service: "Installation",
                price: "From RM 199",
                note: "Wall-mounted 1–1.5 HP",
              },
            ].map((item, i) => (
              <Reveal key={item.service} delay={i * 20}>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
                  <p className="text-xs font-bold text-slate-400 mb-1">
                    {item.service}
                  </p>
                  <p className="text-lg font-black text-sky-400">{item.price}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links — Services + Areas */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-10">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
                  Our Services
                </h3>
                <ul className="space-y-2">
                  {siteConfig.services.map((s) => (
                    <li key={s.slug}>
                      <NextLink
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors"
                      >
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />
                        {s.title}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
                  Areas We Cover
                </h3>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.areaPages.slice(0, 12).map((area) => (
                    <NextLink
                      key={area.slug}
                      href={`/areas/${area.slug}`}
                      className="text-xs font-bold text-slate-600 border border-slate-200 bg-white hover:border-sky-200 px-3 py-1.5 rounded-lg transition-all"
                    >
                      {area.name}
                    </NextLink>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Book Your Aircond Service Today
            </h2>
            <p className="mt-3 text-sky-100 font-medium">
              All brands. Same-day available. Transparent pricing across KL &
              Selangor.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
