"use client";

import NextLink from "next/link";
import { FaWhatsapp, FiArrowRight, FiTag } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { title, eyebrow } from "@/components/primitives";
import { waLink, rfqMsgForService, waLinkCustom } from "@/lib/whatsapp";

type Props = {
  /**
   * Limit how many services to show.
   * Useful when reusing on the homepage as a teaser.
   */
  limit?: number;
  showHeading?: boolean;
};

export const ServicesWithPricing = ({ limit, showHeading = true }: Props) => {
  const services = limit ? siteConfig.services.slice(0, limit) : siteConfig.services;

  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <Reveal>
            <div className="max-w-3xl">
              <p className={eyebrow()}>Transparent Pricing</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>Professional Aircond Services in </span>
                <span className={title({ size: "md", color: "brand" })}>
                  KL &amp; Selangor
                </span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                Clear upfront rates with zero hidden charges. Tap any specialized service package below to view complete step-by-step processes, details, and exact warranties, or request an instant free estimation on WhatsApp.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-12 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <article className="group flex h-full flex-col bg-white p-6 sm:p-8 hover:bg-slate-50/60 transition-all duration-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-slate-900 rounded-xl text-white group-hover:bg-slate-950 transition-colors">
                    <ServiceIcon name={s.icon} className="h-6 w-6 text-white" />
                  </div>
                  <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider text-amber-700">
                    <FiTag className="h-3 w-3" /> from RM {s.startPrice}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="mt-6 text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-slate-950">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-500 leading-relaxed font-medium">
                    {s.short}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between gap-3 pt-5 border-t border-slate-100">
                  <NextLink
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-slate-950 transition group/link"
                  >
                    Details
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                  </NextLink>
                  <a
                    href={waLink(rfqMsgForService(s.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider text-white shadow-sm transition-all active:scale-[0.97]"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    Book Now
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {limit && limit < siteConfig.services.length && (
          <Reveal>
            <div className="mt-12 flex justify-center">
              <NextLink
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-slate-900 bg-white hover:bg-slate-900 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-white rounded-xl transition-all shadow-sm active:scale-[0.97]"
              >
                View All Aircond Services
                <FiArrowRight className="h-4 w-4" />
              </NextLink>
            </div>
          </Reveal>
        )}

        {!limit && (
          <Reveal>
            <div className="mt-12 border border-slate-900 bg-slate-950 text-white p-6 sm:p-10 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div className="max-w-2xl">
                <span className="bg-white/10 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-white">
                  Corporate &amp; Residential Deals
                </span>
                <h3 className="mt-3 text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  Multi-Unit Booking Discounts
                </h3>
                <p className="mt-2 text-sm text-slate-400 font-medium leading-relaxed">
                  Servicing multiple commercial or residential aircond units during a single scheduled property visit? We pass the transport and logistical savings directly back to you with custom bundle contract rates.
                </p>
              </div>
              <a
                href={waLinkCustom("Hello KL Renovator, I want to request a custom discount quote for servicing multiple aircond units together.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all shrink-0 active:scale-[0.97] shadow-lg"
              >
                <FaWhatsapp className="h-4 w-4 text-[#22c55e]" /> Claim Bulk Pricing
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
