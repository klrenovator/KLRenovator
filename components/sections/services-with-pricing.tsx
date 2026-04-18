"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle, Tag, Info } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { ServiceDetailsModal } from "@/components/service-details-modal";

export const ServicesWithPricing = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section id="services" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Our services
            </p>
            <h2 className="mt-2">
              <span className={title({ size: "md" })}>Every aircon service </span>
              <span className={title({ size: "md", color: "brand" })}>
                you&apos;ll ever need.
              </span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Tap any service to see full details, pricing &amp; process — or book directly on WhatsApp.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-all hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1">
                {/* Full-card clickable area (opens modal) */}
                <button
                  type="button"
                  onClick={() => setActiveSlug(s.slug)}
                  aria-label={`View details for ${s.title}`}
                  className="absolute inset-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                />

                <div className="relative flex items-start justify-between gap-3 pointer-events-none">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                    <Tag className="h-3 w-3" /> from RM {s.startPrice}
                  </span>
                </div>

                <h3 className="relative mt-4 text-lg font-bold text-slate-900 dark:text-white pointer-events-none">
                  {s.title}
                </h3>
                <p className="relative mt-1.5 text-sm text-slate-700 dark:text-slate-300 pointer-events-none">
                  {s.short}
                </p>

                <div className="relative mt-4 flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-300 pointer-events-none">
                  <Info className="h-4 w-4" /> Tap for details &amp; prices
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Book button — relative + higher z so clicks go to the link */}
                <div className="relative mt-auto pt-4 z-10">
                  <a
                    href={waLink(
                      `Hi Klrenovator, I'd like to book "${s.title}". Please share the next available slot and quote.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[rgb(var(--color-whatsapp))] px-3 py-2 text-xs font-bold text-white hover:brightness-110 transition"
                  >
                    <MessageCircle className="h-3.5 w-3.5" fill="currentColor" />
                    Book now on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Volume discount banner */}
        <Reveal>
          <div className="mt-10 rounded-2xl bg-brand-600 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                More units = bigger discounts
              </h3>
              <p className="mt-1 text-sm text-white/90">
                Servicing multiple units in one visit? We pass the savings to you.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {siteConfig.volumeDiscounts.map((d) => (
                <span
                  key={d.units}
                  className="rounded-full bg-white/20 backdrop-blur px-3 py-1.5 text-xs font-semibold"
                >
                  {d.units} · {d.off}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Modal */}
      <ServiceDetailsModal
        slug={activeSlug}
        onClose={() => setActiveSlug(null)}
      />
    </section>
  );
};
