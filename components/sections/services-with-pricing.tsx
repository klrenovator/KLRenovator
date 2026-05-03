"use client";

import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight, FiTag } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { title, eyebrow } from "@/components/primitives";
import { waLink, rfqMsgForService } from "@/lib/whatsapp";

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
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <Reveal>
            <div className="max-w-2xl">
              <p className={eyebrow()}>Our services</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>Every aircon service </span>
                <span className={title({ size: "md", color: "brand" })}>
                  you&apos;ll ever need.
                </span>
              </h2>
              <p className="mt-4 text-slate-600">
                Tap any service to see full details, pricing &amp; process — or
                request a quote on WhatsApp.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 border border-slate-200">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <article className="group flex h-full flex-col bg-white p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-brand-700 text-white">
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    <FiTag className="h-3 w-3" /> from RM {s.startPrice}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-ink uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {s.short}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3 pt-5 border-t border-slate-200">
                  <NextLink
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 hover:text-brand-900 transition"
                  >
                    Details
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </NextLink>
                  <a
                    href={waLink(rfqMsgForService(s.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-brand-700 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-brand-800 transition"
                  >
                    <FaWhatsapp className="h-3.5 w-3.5" />
                    RFQ
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {limit && limit < siteConfig.services.length && (
          <Reveal>
            <div className="mt-10 flex justify-center">
              <NextLink
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-ink bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-white transition"
              >
                View all services
                <FiArrowRight className="h-4 w-4" />
              </NextLink>
            </div>
          </Reveal>
        )}

        {!limit && (
          <Reveal>
            <div className="mt-10 bg-ink text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight">
                  More units = bigger discounts
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Servicing multiple units in one visit? We pass the savings to you.
                </p>
              </div>
   
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
