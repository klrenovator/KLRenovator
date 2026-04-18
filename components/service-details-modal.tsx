"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { X, Check, Tag, MessageCircle, ArrowRight } from "lucide-react";

import { ServiceIcon } from "@/components/service-icon";
import { servicesData } from "@/config/services-data";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

type Props = {
  slug: string | null;
  onClose: () => void;
};

export const ServiceDetailsModal = ({ slug, onClose }: Props) => {
  const data = slug ? servicesData[slug] : null;
  const iconName = slug
    ? siteConfig.services.find((s) => s.slug === slug)?.icon ?? "sparkles"
    : "sparkles";

  // Lock body scroll + close on ESC
  useEffect(() => {
    if (!data) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800">
        {/* Header */}
        <div className="relative shrink-0 p-5 sm:p-6 bg-brand-600 text-white">
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-start gap-3 pr-10">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <ServiceIcon name={iconName} className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h3
                id="service-modal-title"
                className="text-xl sm:text-2xl font-extrabold leading-tight"
              >
                {data.title}
              </h3>
              <p className="mt-1 text-sm text-white/85">{data.tagline}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <Tag className="h-3.5 w-3.5" /> From {data.startPrice}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5 space-y-6">
          {/* Description */}
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.description}
          </p>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              What's included
            </h4>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {data.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 px-3 py-2.5"
                >
                  <Check className="mt-0.5 h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0" />
                  <span className="text-sm text-slate-800 dark:text-slate-200">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Transparent pricing
            </h4>
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
              <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                {data.priceTable.map((p) => (
                  <li
                    key={p.label}
                    className="flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-900"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {p.label}
                    </span>
                    <span className="text-sm font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">
                      {p.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Material costs (gas, copper, brackets) are quoted separately.
            </p>
          </div>

          {/* Process */}
          {data.process?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                How it works
              </h4>
              <ol className="mt-3 grid gap-3 sm:grid-cols-2">
                {data.process.map((p, i) => (
                  <li
                    key={p.step}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {p.step}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {p.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* FAQs */}
          {data.faqs?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Common questions
              </h4>
              <div className="mt-3 space-y-2">
                {data.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"
                  >
                    <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-white flex items-center justify-between gap-3">
                      {f.q}
                      <span className="text-brand-600 group-open:rotate-45 transition-transform text-xl leading-none">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 flex flex-col sm:flex-row gap-2.5">
          <a
            href={waLink(
              `Hi Klrenovator, I'd like to book "${data.title}". Please share availability and a quote.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[rgb(var(--color-whatsapp))] px-5 py-3 text-sm font-bold text-white hover:brightness-110 active:scale-[0.98] transition"
          >
            <MessageCircle className="h-4 w-4" fill="currentColor" />
            Book on WhatsApp
          </a>
          <NextLink
            href={`/services/${data.slug}`}
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-brand-600/30 active:scale-[0.98] transition"
          >
            Full page <ArrowRight className="h-4 w-4" />
          </NextLink>
        </div>
      </div>
    </div>
  );
};
