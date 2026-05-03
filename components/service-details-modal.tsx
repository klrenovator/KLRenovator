"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiX, FiCheck, FiArrowRight, FiTag, FiPlus } from "react-icons/fi";

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
      <button
        aria-label="Close"
        className="absolute inset-0 bg-ink/80"
        onClick={onClose}
      />

      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden bg-white shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="relative shrink-0 p-5 sm:p-6 bg-ink text-white">
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center bg-white/10 hover:bg-white/20 text-white transition"
          >
            <FiX className="h-5 w-5" />
          </button>
          <div className="flex items-start gap-4 pr-10">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-brand-600">
              <ServiceIcon name={iconName} className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h3
                id="service-modal-title"
                className="text-xl sm:text-2xl font-extrabold leading-tight uppercase tracking-tight"
              >
                {data.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-300">{data.tagline}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <FiTag className="h-3 w-3" /> From {data.startPrice}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-6 space-y-7 bg-white">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {data.description}
          </p>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700">
              What&apos;s included
            </h4>
            <ul className="mt-3 grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
              {data.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 bg-white px-3 py-2.5"
                >
                  <FiCheck className="mt-0.5 h-4 w-4 text-brand-700 shrink-0" />
                  <span className="text-sm text-slate-800">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Transparent pricing
            </h4>
            <div className="mt-3 border border-slate-200">
              <ul className="divide-y divide-slate-200">
                {data.priceTable.map((p) => (
                  <li
                    key={p.label}
                    className="flex items-center justify-between gap-3 px-4 py-3 bg-white"
                  >
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-sm font-bold text-brand-700 whitespace-nowrap">
                      {p.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Material costs (gas, copper, brackets) quoted separately.
            </p>
          </div>

          {data.process?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700">
                How it works
              </h4>
              <ol className="mt-3 grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
                {data.process.map((p, i) => (
                  <li key={p.step} className="bg-white p-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center bg-ink text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm font-bold text-ink">
                        {p.step}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600">{p.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {data.faqs?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Common questions
              </h4>
              <div className="mt-3 border border-slate-200 divide-y divide-slate-200">
                {data.faqs.map((f) => (
                  <details key={f.q} className="group bg-white p-4">
                    <summary className="cursor-pointer list-none text-sm font-bold text-ink flex items-center justify-between gap-3">
                      {f.q}
                      <FiPlus className="h-4 w-4 text-brand-700 group-open:rotate-45 transition-transform" />
                    </summary>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="shrink-0 border-t border-slate-200 bg-slate-50 p-4 sm:p-5 flex flex-col sm:flex-row gap-2.5">
          <a
            href={waLink(
              `Hi Klrenovator, I'd like to request a quote (RFQ) for "${data.title}". Please share availability and pricing.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 bg-brand-700 hover:bg-brand-800 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition"
          >
            <FaWhatsapp className="h-4 w-4" />
            Request a Quote
          </a>
          <NextLink
            href={`/services/${data.slug}`}
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-slate-800 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition"
          >
            Full page <FiArrowRight className="h-4 w-4" />
          </NextLink>
        </div>
      </div>
    </div>
  );
};
