import { Metadata } from "next";
import Image from "next/image";
import {
  FaPhone, FaEnvelope, FaLocationDot, FaRegClock, FaWhatsapp,
} from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { title, eyebrow } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Contact KL Renovator | Aircond Service KL & Selangor",
  description:
    "Contact KL Renovator for fast professional aircond servicing in Kuala Lumpur & Selangor. WhatsApp for instant quotes. Call +60 18-298 3573. Same-day service available.",
};

const SERVICES_QUICK = [
  "Pressure Chemical Wash",
  "Chemical Overhaul",
  "Gas Top-Up (R22 / R410A / R32)",
  "Troubleshooting & Repair",
  "New Unit Installation",
  "Ceiling Cassette Service",
  "Dismantle & Relocate",
  "Annual Maintenance Contract",
];

const WHATSAPP_MESSAGES = [
  {
    label: "General Quote",
    text: "Hi KL Renovator, I'd like to get a quote for aircond service.",
  },
  {
    label: "Chemical Wash",
    text: "Hi KL Renovator, I need a Chemical Wash for my aircond unit. Can you advise on pricing and availability?",
  },
  {
    label: "Aircond Not Cold",
    text: "Hi KL Renovator, my aircond is running but not cooling properly. Can you help diagnose the issue?",
  },
  {
    label: "Water Leaking",
    text: "Hi KL Renovator, my aircond is leaking water. When can your technician come to check?",
  },
  {
    label: "New Installation",
    text: "Hi KL Renovator, I need a new aircond unit installed. Can I get a quote including labour and materials?",
  },
  {
    label: "Gas Top-Up",
    text: "Hi KL Renovator, I need a gas top-up for my aircond. Can you advise on pricing?",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "KL Renovator",
            alternateName: "Multicore Dynamic Resources",
            telephone: siteConfig.phone,
            email: siteConfig.email,
            url: "https://www.klrenovator.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kuala Lumpur",
              addressRegion: "Selangor",
              addressCountry: "MY",
            },
            openingHours: "Mo-Su 09:00-18:00",
            priceRange: "RM99 – RM2000",
            areaServed: siteConfig.areas,
          }),
        }}
      />

      {/* Hero */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero/WhatsApp Image 2026-05-03 at 13.39.35.jpeg"
            alt="KL Renovator aircond technician"
            fill sizes="100vw"
            className="object-cover" priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950/90" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.05] uppercase text-white">
              Let&apos;s get your<br />
              <span className="text-sky-400">aircon sorted.</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-300 font-medium leading-relaxed">
              Fastest response is via WhatsApp — we reply within 30 minutes
              during business hours. Same-day visits available across KL &amp; Selangor.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* Left: Contact Methods */}
            <Reveal>
              <div>
                <p className={eyebrow()}>Reach Us</p>
                <h2 className="mt-3">
                  <span className={title({ size: "sm" })}>Talk to a real </span>
                  <span className={title({ size: "sm", color: "brand" })}>technician.</span>
                </h2>
                <p className="mt-4 text-slate-600 font-medium">
                  Pick whichever channel suits you — we respond fast on all of them.
                </p>

                <div className="mt-8 space-y-3">
                  {/* WhatsApp — Primary */}
                  <a href={waLink(rfqMsg)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-[#0284c7] hover:bg-[#0369a1] text-white p-5 transition-all group">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#22c55e]">
                      <FaWhatsapp className="h-6 w-6 text-white" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] font-black uppercase tracking-wider text-sky-100">
                        Fastest · Reply within 30 mins
                      </p>
                      <p className="font-black uppercase tracking-tight text-white text-lg">
                        WhatsApp Us Now
                      </p>
                    </div>
                    <span className="text-white font-black text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </a>

                  {/* Phone */}
                  <a href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-4 border-2 border-slate-200 bg-white p-5 hover:border-sky-500 hover:bg-sky-50 transition-all">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#0284c7] text-white">
                      <FaPhone className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Direct Call</p>
                      <p className="font-black text-slate-950 text-lg">{siteConfig.phoneDisplay}</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-4 border-2 border-slate-200 bg-white p-5 hover:border-sky-500 hover:bg-sky-50 transition-all">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#0284c7] text-white">
                      <FaEnvelope className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Email</p>
                      <p className="font-black text-slate-950 break-all">{siteConfig.email}</p>
                    </div>
                  </a>

                  {/* Hours + Area */}
                  <div className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FaRegClock className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Hours</p>
                      </div>
                      <p className="font-black text-slate-950 text-sm">{siteConfig.hours}</p>
                    </div>
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FaLocationDot className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Coverage</p>
                      </div>
                      <p className="font-black text-slate-950 text-sm">KL &amp; Selangor (Klang Valley)</p>
                    </div>
                  </div>
                </div>

                {/* Services List */}
                <div className="mt-8 bg-slate-50 border border-slate-200 p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-4">
                    Services We Cover
                  </p>
                  <ul className="grid grid-cols-1 gap-2">
                    {SERVICES_QUICK.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <FiCheck className="h-4 w-4 text-sky-600 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Right: WhatsApp Quick-Select Form */}
            <Reveal delay={100}>
              <div className="bg-[#0284c7] text-white p-8 sm:p-10">
                <p className="text-xs font-black uppercase tracking-widest text-sky-100 mb-2">
                  Quick WhatsApp Booking
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                  What do you need?
                </h3>
                <p className="text-sky-100 text-sm font-medium mb-8">
                  Tap the service you need — it opens WhatsApp with your message ready.
                  No typing needed.
                </p>

                <div className="grid gap-3">
                  {WHATSAPP_MESSAGES.map((item) => (
                    <a
                      key={item.label}
                      href={`https://wa.me/60182983573?text=${encodeURIComponent(item.text)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 bg-white/15 hover:bg-[#22c55e] border border-white/20 hover:border-[#22c55e] px-5 py-4 text-sm font-black uppercase tracking-wider text-white transition-all group"
                    >
                      <span className="flex items-center gap-3">
                        <FaWhatsapp className="h-4 w-4 text-white shrink-0" />
                        {item.label}
                      </span>
                      <span className="text-sky-100 group-hover:text-white transition-colors">→</span>
                    </a>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/20 pt-6">
                  <p className="text-xs text-sky-100 font-medium text-center">
                    Or call us directly at{" "}
                    <a href={`tel:${siteConfig.phone}`}
                      className="text-white font-black hover:text-sky-200 transition-colors">
                      {siteConfig.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <CoverageAreas />
    </>
  );
}
