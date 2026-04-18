"use client";

import { useState } from "react";
import { HelpCircle, Plus, MessageCircle } from "lucide-react";
import clsx from "clsx";

import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink, defaultWhatsAppMsg } from "@/lib/whatsapp";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "Which areas do you cover in KL & Selangor?",
    a: "We serve the whole of KL & Selangor — including Petaling Jaya, Subang Jaya, Shah Alam, Cheras, Ampang, Damansara, Puchong, Kajang, Bangsar, Mont Kiara, Klang, Setapak, Sentul, Putrajaya and Cyberjaya. Just drop your address on WhatsApp and we'll confirm the slot.",
  },
  {
    q: "How fast can you respond? Do you offer same-day service?",
    a: "Yes — we offer same-day service for most bookings made before 2 PM. Our WhatsApp team replies within 30 minutes during business hours (9 AM – 9 PM, Mon–Sun).",
  },
  {
    q: "How often should I chemical wash my aircon?",
    a: "Every 12 – 18 months is our standard recommendation. Wash sooner if you notice bad smell, weak cooling, water leaking, or if your unit hasn't been opened in 2+ years.",
  },
  {
    q: "Is your pricing transparent — any hidden charges?",
    a: "No hidden fees. Quoted price = price you pay. If any additional material is needed (gas, copper pipe, bracket), we'll inform you BEFORE starting and get your approval. Tap any service card to see the full pricing list.",
  },
  {
    q: "What brands do you service and install?",
    a: "All major brands — Daikin, Panasonic, Mitsubishi, York, Midea, Samsung, LG, Hitachi, Acson, Sharp, Toshiba and more. Split, inverter, window, cassette, and multi-split systems are all supported.",
  },
  {
    q: "Do you offer warranty for installations and repairs?",
    a: "Yes. All installations come with a 1-year workmanship warranty. Repairs carry a 3-month parts & labour warranty. Chemical wash includes a 30-day cooling guarantee.",
  },
  {
    q: "How do I book — WhatsApp, call, or form?",
    a: "Whichever is easiest for you. WhatsApp is fastest for photos & quotes. Call us directly or fill the contact form — it opens WhatsApp with your details pre-filled so you just tap send.",
  },
  {
    q: "Do you need deposit or payment upfront?",
    a: "No deposit for standard services. For new installations or orders requiring special parts, a small deposit may apply and will be discussed before booking. Cash, online transfer (DuitNow, FPX) & e-wallet accepted.",
  },
  {
    q: "Can you service aircon units that I bought elsewhere?",
    a: "Absolutely — we service, repair, and chemical wash any aircon regardless of where you bought it. We treat every unit with the same level of care.",
  },
  {
    q: "My aircon is not cold but runs — what could be the issue?",
    a: "Usually it's low refrigerant gas, a dirty coil, a faulty capacitor, or (rarely) a failing compressor. WhatsApp us a photo of the outdoor unit's label — we can give you an accurate diagnosis quickly.",
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 bg-white dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/30 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300">
              <HelpCircle className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="mt-4">
              <span className={title({ size: "md" })}>Got questions? </span>
              <span className={title({ size: "md", color: "brand" })}>
                We&apos;ve got answers.
              </span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Everything you need to know about our aircon services — and if
              something&apos;s not covered, just WhatsApp us.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 mx-auto max-w-3xl">
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 30}>
                  <div
                    className={clsx(
                      "rounded-2xl border transition-all overflow-hidden",
                      isOpen
                        ? "border-brand-500 bg-white dark:bg-slate-900 shadow-lg shadow-brand-500/10"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-400 dark:hover:border-brand-600",
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-base font-semibold text-slate-900 dark:text-white">
                        {f.q}
                      </span>
                      <span
                        className={clsx(
                          "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ring-1",
                          isOpen
                            ? "bg-brand-600 text-white ring-brand-700 rotate-45"
                            : "bg-brand-600 text-white ring-brand-700 dark:bg-brand-900/40 dark:text-brand-300 dark:ring-brand-800",
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className={clsx(
                        "grid transition-all duration-300 ease-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Still have questions card */}
          <Reveal>
            <div className="mt-8 rounded-2xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Still have questions?
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Message us on WhatsApp — we usually reply within 30 minutes.
                </p>
              </div>
              <a
                href={waLink(defaultWhatsAppMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-whatsapp))] px-5 py-3 text-sm font-bold text-white shadow-md hover:brightness-110 transition"
              >
                <MessageCircle className="h-4 w-4" fill="currentColor" />
                Chat with us
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
