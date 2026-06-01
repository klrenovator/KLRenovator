import type { Metadata } from "next";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { FAQ } from "@/components/sections/faq";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about aircon services from ${siteConfig.name} — pricing, warranty, brands, and more.`,
};

export default function FaqPage() {
  // FAQPage Schema JSON-LD Injection
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is included in the standard aircond installation package?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The standard Wall-Mounted promo package starts at RM199 (1.0-1.5HP) and includes FREE 7 Feet Copper Pipe, 7 Feet Drainage Pipe, 7 Feet Back-to-Back Wiring, and a 1-Month Workmanship Warranty."
        }
      },
      {
        "@type": "Question",
        "name": "What are your extra material and accessory charges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Extra charges apply transparently beyond standard package allocations: Extra Copper Pipe is RM17/ft, Extra Wiring is RM9/ft, Small wire casing is RM6/ft, Big pipe casing is RM12/ft, Outdoor bracket is RM45, Universal indoor bracket is RM35, and a dedicated 20A Aircon Switch is RM100."
        }
      },
      {
        "@type": "Question",
        "name": "What is your emergency and after-hours service policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our standard hours are 9:00 AM to 6:00 PM. Urgent jobs booked between 6:00 PM and 10:00 PM carry a mandatory RM50 overtime surcharge, making the after-hours diagnostic fee RM138 instead of the regular daytime RM88."
        }
      },
      {
        "@type": "Question",
        "name": "Ada hidden charges tak untuk service aircond?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tiada hidden charges sama sekali dengan KL Renovator. Harga kami sangat telus (transparent). Kami hanya charge mengikut material extra yang betul-betul dipasang dan digunakan di tapak (site) sahaja."
        }
      },
      {
        "@type": "Question",
        "name": "Berapa harga pasang aircond 1.0HP dekat Selangor / KL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pakej promo pemasangan aircond 1.0HP Wall-Mounted hanyalah RM199 sahaja boss. Ini dah termasuk FREE 7 kaki copper pipe, 7 kaki wire, insulation, water pipe, dan transport."
        }
      },
      {
        "@type": "Question",
        "name": "Kawasan mana sahaja yang KL Renovator cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kami cover seluruh kawasan Kuala Lumpur dan Selangor secara menyeluruh termasuk Selayang, Batu Caves, Gombak, Ampang, Cheras, Petaling Jaya, Subang Jaya, Puchong, Shah Alam, dan sekitar Lembah Klang."
        }
      }
    ]
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative bg-ink text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero/WhatsApp Image 2026-05-03 at 13.39.30.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
              Knowledge Base
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
              Frequently asked
              <br />
              <span className="text-brand-300">questions.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Pricing, warranty, brands, areas covered — quick answers to the
              things customers ask us most.
            </p>
          </Reveal>
        </div>
      </section>

      <FAQ showHeading={false} />
      <ReadyToBook />
    </>
  );
}
