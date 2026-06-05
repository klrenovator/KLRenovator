import type { Metadata } from "next";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { Reveal } from "@/components/reveal";
import { FAQ } from "@/components/sections/faq";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { FaWhatsapp } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "FAQ — Aircond Service Questions Answered | KL Renovator",
  description:
    "Frequently asked questions about aircond servicing in KL & Selangor. Pricing, warranty, brands covered, service areas, chemical wash vs overhaul, and more. Answered by KL Renovator.",
  keywords: [
    "aircond service FAQ Malaysia",
    "aircon chemical wash price KL",
    "how often service aircond",
    "aircon not cold fix",
    "aircond service warranty",
    "KL Renovator FAQ",
  ],
};

const ALL_FAQS = [
  {
    q: "What areas do you cover?",
    a: "We cover the entire Klang Valley including all areas of Kuala Lumpur and Selangor — Ampang, Cheras, Petaling Jaya, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Sentul, Putrajaya, and Cyberjaya.",
  },
  {
    q: "How much does a chemical wash cost?",
    a: "Chemical wash starts from RM 120 for a 1.0–1.5 HP wall-mounted unit. Prices vary by unit type and HP size. Check our full price list on the Services page.",
  },
  {
    q: "What is the difference between chemical wash and chemical overhaul?",
    a: "A chemical wash cleans the unit while it stays mounted on the wall — good for regular maintenance. A chemical overhaul fully dismantles the unit for a deep clean of every internal component — recommended for water leaking, ice formation, or units not serviced in 3+ years.",
  },
  {
    q: "How often should I service my aircond?",
    a: "For light use (evenings only), service every 6 months. For heavy use (8+ hours daily), every 3 months. A chemical wash is recommended annually regardless of usage.",
  },
  {
    q: "Do you offer same-day service?",
    a: "Yes, same-day appointments are available subject to technician availability. WhatsApp us early in the morning for the best chance of a same-day slot.",
  },
  {
    q: "What brands do you service?",
    a: "We service all major brands including Daikin, Panasonic, Mitsubishi, York, Midea, LG, and Samsung. If your brand isn't listed, WhatsApp us — we likely service it.",
  },
  {
    q: "Is there a warranty on your work?",
    a: "Yes. All workmanship carries a 1-year warranty. Parts and components replaced by us are covered under the respective manufacturer's warranty.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No hidden charges at all. We provide a full quote before starting any work. Extra materials (copper pipe, brackets) are quoted and approved by you on-site before installation.",
  },
  {
    q: "My aircond is running but not cold. What's wrong?",
    a: "The most common causes are low refrigerant gas, a dirty evaporator coil, or a faulty capacitor. Our technicians diagnose the exact issue and quote you before any repair starts. Diagnostic fee is RM 88 (waived if repair is done).",
  },
  {
    q: "My aircond is leaking water. What should I do?",
    a: "The most common cause is a blocked drain pipe — usually fixed with a basic service. If the problem is severe (heavy leaking, ice forming), a chemical overhaul may be needed. We recommend switching off the unit if leaking heavily to prevent damage.",
  },
  {
    q: "What gas type does my aircond use?",
    a: "Check the sticker on your outdoor unit — it states the gas type (R22, R410A, or R32). Alternatively, WhatsApp us a photo of the outdoor unit sticker and we'll identify it for you.",
  },
  {
    q: "Do you do commercial and office aircond servicing?",
    a: "Yes, we handle commercial ceiling cassette units, ducted systems, and large-capacity commercial units. We also offer annual maintenance contracts for offices and commercial properties.",
  },
  {
    q: "What is your emergency / after-hours rate?",
    a: "Standard hours are 9:00 AM to 6:00 PM. Jobs booked between 6:00 PM and 10:00 PM carry an overtime surcharge of RM 50.",
  },
  {
    q: "Do you offer installation for new units?",
    a: "Yes. Installation starts from RM 199 for a 1.0–1.5 HP wall-mounted unit and includes 7 ft copper pipe, wiring, and drainage. We can also help you choose the right HP size and brand for your room.",
  },
  {
    q: "How do I book a service?",
    a: "The fastest way is via WhatsApp at +60 18-298 3573. Tell us your unit type, area, and the issue you're experiencing — we'll confirm availability and pricing within 30 minutes.",
  },
];

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero/WhatsApp Image 2026-05-03 at 13.39.30.jpeg"
            alt="KL Renovator aircond service"
            fill sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950/90" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">
              Knowledge Base
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.05] uppercase text-white">
              Frequently asked<br />
              <span className="text-sky-400">questions.</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-300 font-medium leading-relaxed">
              Pricing, warranty, brands, areas covered — quick honest answers to
              the things our customers ask most.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {ALL_FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 20}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
                    <span className="text-base font-black text-slate-950 uppercase tracking-tight group-open:text-sky-700 transition-colors">
                      {faq.q}
                    </span>
                    <span className="mt-0.5 shrink-0 text-slate-500 group-open:text-sky-600 transition-colors">
                      <svg className="h-5 w-5 transition-transform duration-200 group-open:rotate-45"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          {/* Still have questions CTA */}
          <Reveal>
            <div className="mt-14 bg-slate-950 text-white p-8 text-center">
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                Still have a question?
              </h2>
              <p className="mt-2 text-slate-400 font-medium text-sm">
                WhatsApp us — our technicians reply within 30 minutes.
              </p>
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-6 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> Ask Us on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ReadyToBook />
    </>
  );
}
