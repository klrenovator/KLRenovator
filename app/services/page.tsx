import type { Metadata } from "next";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { title, eyebrow } from "@/components/primitives";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: `Full list of aircon services & transparent pricing — chemical wash, installation, repair, gas top-up, ceiling cassette and more across KL & Selangor.`,
};

export default function ServicesIndexPage() {
  // Service Schema JSON-LD Injection
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KL Renovator Aircon Services Prices",
    "description": "Professional aircond servicing, cleaning, repair, and installation price list in Kuala Lumpur and Selangor.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Basic Servicing",
          "description": "Routine maintenance to keep your aircon cool & efficient.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "KL Renovator"
          },
          "offers": {
            "@type": "Offer",
            "price": "99.00",
            "priceCurrency": "RM"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Chemical Wash",
          "description": "Deep chemical cleaning that removes mould, dust & bacteria.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "KL Renovator"
          },
          "offers": {
            "@type": "Offer",
            "price": "120.00",
            "priceCurrency": "RM"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Gas Top-Up",
          "description": "R22, R410A & R32 refill to restore cooling performance.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "KL Renovator"
          },
          "offers": {
            "@type": "Offer",
            "price": "100.00",
            "priceCurrency": "RM"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Aircon Repair",
          "description": "Troubleshoot & fix cooling, noise, leak or electrical issues.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "KL Renovator"
          },
          "offers": {
            "@type": "Offer",
            "price": "88.00",
            "priceCurrency": "RM"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Service",
          "name": "Chemical Overhaul",
          "description": "Complete unit removal & deep-clean — the ultimate restoration.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "KL Renovator"
          },
          "offers": {
            "@type": "Offer",
            "price": "220.00",
            "priceCurrency": "RM"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Service",
          "name": "Aircond Installation",
          "description": "Professional installation — all brands, all HP sizes.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "KL Renovator"
          },
          "offers": {
            "@type": "Offer",
            "price": "199.00",
            "priceCurrency": "RM"
          }
        }
      }
    ]
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Page hero */}
      <section className="relative bg-ink text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero/WhatsApp Image 2026-05-03 at 13.39.34.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
              Our Services
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
              Aircon services
              <br />
              <span className="text-brand-300">done right.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Whether it&apos;s a chemical wash, a full installation, or an
              emergency repair — our team delivers clean, careful work with
              transparent pricing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition"
              >
                <FaWhatsapp className="h-4 w-4" />
                Request a Quote
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-white/40 hover:bg-white hover:text-ink px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition"
              >
                <FaPhoneAlt className="h-3.5 w-3.5" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ServicesWithPricing showHeading={false} />

      <CoverageAreas />
      <ReadyToBook />
    </>
  );
}
