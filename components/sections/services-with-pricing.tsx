"use client";

import { useState } from "react";
import NextLink from "next/link";
import { ArrowRight, ChevronDown, MessageCircle, Tag } from "lucide-react";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

type Row = { label: string; price: string };
type Pricing = { title: string; rows: Row[]; note?: string };

const pricingBySlug: Record<string, Pricing | undefined> = {
  "chemical-wash": siteConfig.pricing.chemicalWash,
  "chemical-overhaul": siteConfig.pricing.chemicalOverhaul,
  "basic-servicing": siteConfig.pricing.basicServicing,
  "gas-topup": siteConfig.pricing.gasTopup,
  repair: siteConfig.pricing.repair,
  installation: siteConfig.pricing.installation as Pricing,
  "ceiling-cassette": {
    title: "Ceiling Cassette",
    rows: [
      { label: "Install · 1.0 – 1.5 HP", price: "RM 250" },
      { label: "Install · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Install · 3.5 – 6.0 HP", price: "RM 400" },
      { label: "Chemical wash · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical wash · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Chemical wash · 4.0 – 5.0 HP", price: "RM 350" },
    ],
  },
  "dismantling-relocation": {
    title: "Dismantle & Relocate",
    rows: [
      { label: "Dismantle only (per unit)", price: "RM 200" },
      { label: "Dismantle + Relocate (same area)", price: "RM 350" },
      { label: "Dismantle + Relocate (cross area)", price: "RM 450" },
    ],
  },
};

export const ServicesWithPricing = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="services" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Our services
            </p>
            <h2 className="mt-2">
              <span className={title({ size: "md" })}>Every aircon service </span>
              <span className={title({ size: "md", color: "brand" })}>
                you&apos;ll ever need.
              </span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Transparent per-HP pricing. No hidden fees. Click any service to
              see the full price list.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((s, i) => {
            const isOpen = expanded === s.slug;
            const pricing = pricingBySlug[s.slug];
            return (
              <Reveal key={s.slug} delay={i * 50}>
                <div
                  className={clsx(
                    "flex h-full flex-col rounded-2xl border bg-white dark:bg-slate-900 p-5 transition-all",
                    isOpen
                      ? "border-brand-500 shadow-xl shadow-brand-500/10"
                      : "border-slate-200 dark:border-slate-800 hover:border-brand-400 hover:shadow-lg hover:-translate-y-1",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md">
                      <ServiceIcon name={s.icon} className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 dark:bg-brand-900/40 px-2.5 py-1 text-xs font-bold text-brand-700 dark:text-brand-300">
                      <Tag className="h-3 w-3" /> from RM {s.startPrice}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                    {s.short}
                  </p>

                  {/* Pricing list */}
                  {pricing && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : s.slug)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-brand-400 transition"
                      >
                        <span>
                          {isOpen ? "Hide" : "See"} full pricing
                        </span>
                        <ChevronDown
                          className={clsx(
                            "h-4 w-4 transition-transform",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                      {isOpen && (
                        <ul className="mt-3 divide-y divide-slate-200 dark:divide-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                          {pricing.rows.map((r) => (
                            <li
                              key={r.label}
                              className="flex items-center justify-between gap-3 px-3 py-2.5"
                            >
                              <span className="text-xs text-slate-600 dark:text-slate-400">
                                {r.label}
                              </span>
                              <span className="text-xs font-bold text-brand-600 whitespace-nowrap">
                                {r.price}
                              </span>
                            </li>
                          ))}
                          {pricing.note && (
                            <li className="px-3 py-2 text-[10px] text-slate-500 italic">
                              {pricing.note}
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <a
                      href={waLink(
                        `Hi Klrenovator, I'd like to book "${s.title}". Please share the next available slot and quote.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[rgb(var(--color-whatsapp))] px-3 py-2 text-xs font-semibold text-white hover:brightness-110"
                    >
                      <MessageCircle className="h-3.5 w-3.5" fill="currentColor" />
                      Book
                    </a>
                    <NextLink
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-brand-400 hover:text-brand-600"
                    >
                      Details <ArrowRight className="h-3.5 w-3.5" />
                    </NextLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Volume discount banner */}
        <Reveal>
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                More units = bigger discounts
              </h3>
              <p className="mt-1 text-sm text-white/80">
                Servicing multiple units in one visit? We pass the savings to you.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {siteConfig.volumeDiscounts.map((d) => (
                <span
                  key={d.units}
                  className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold"
                >
                  {d.units} · {d.off}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
