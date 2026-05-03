"use client";

import { useState } from "react";
import clsx from "clsx";
import { FaWhatsapp } from "react-icons/fa";
import { FiPlus, FiHelpCircle } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink, rfqMsg } from "@/lib/whatsapp";

type QA = { q: string; a: string };

export const faqs: QA[] = [
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
    a: "No hidden fees. Quoted price = price you pay. If any additional material is needed (gas, copper pipe, bracket), we'll inform you BEFORE starting and get your approval.",
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

type Props = {
  showHeading?: boolean;
  limit?: number;
};

export const FAQ = ({ showHeading = true, limit }: Props) => {
  const [open, setOpen] = useState<number | null>(0);
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <p className={eyebrow()}>
                <FiHelpCircle className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                FAQ
              </p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>Got questions? </span>
                <span className={title({ size: "md", color: "brand" })}>
                  We&apos;ve got answers.
                </span>
              </h2>
              <p className="mt-4 text-slate-600">
                Everything you need to know about our aircon services — and if
                something&apos;s not covered, just WhatsApp us.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-10 border border-slate-200 divide-y divide-slate-200">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={clsx(
                  "transition-colors",
                  isOpen ? "bg-slate-50" : "bg-white hover:bg-slate-50",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="text-base font-bold text-ink leading-snug">
                    {f.q}
                  </span>
                  <span
                    className={clsx(
                      "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center transition-all",
                      isOpen
                        ? "bg-brand-700 text-white rotate-45"
                        : "bg-ink text-white",
                    )}
                  >
                    <FiPlus className="h-4 w-4" />
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-700 max-w-3xl">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-10 border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-ink uppercase tracking-tight">
                Still have questions?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Message us on WhatsApp — we usually reply within 30 minutes.
              </p>
            </div>
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition"
            >
              <FaWhatsapp className="h-4 w-4" />
              Chat with us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
