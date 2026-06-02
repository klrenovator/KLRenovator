import { Metadata } from "next";
import Image from "next/image";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaRegClock,
  FaWhatsapp,
} from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form"; // Fixed case-sensitivity path
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { title, eyebrow } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Contact KL Renovator | Aircond Service Kuala Lumpur & Selangor",
  description: "Get fast, professional residential & commercial aircond servicing, chemical wash, and repairs from KL Renovator from Multicore Dynamic Resources in Ampang, Cheras, PJ, Subang Jaya, Puchong, and Shah Alam.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero/WhatsApp Image 2026-05-03 at 13.39.35.jpeg"
            alt="KL Renovator Professional Aircond Servicing Kuala Lumpur Selangor"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">
              Contact Us
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
              Let&apos;s get your
              <br />
              <span className="text-sky-400">aircon sorted.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Fastest way to reach us is WhatsApp. We reply within 30 minutes
              during working hours, 9 AM – 9 PM, Mon–Sun.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <Reveal>
              <div>
                <p className={eyebrow()}>Reach Us</p>
                <h2 className="mt-3">
                  <span className={title({ size: "sm" })}>Talk to a real </span>
                  <span className={title({ size: "sm", color: "brand" })}>
                    technician.
                  </span>
                </h2>
                <p className="mt-4 text-slate-600">
                  Pick whichever channel suits you — we respond fast on all of
                  them for fast expert HVAC dispatch.
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href={waLink(rfqMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-slate-950 hover:bg-slate-900 text-white p-5 transition rounded-xl"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center bg-white/15 rounded-lg">
                      <FaWhatsapp className="h-6 w-6 text-[#22c55e]" />
                    </span>
                    <div>
                      <p className="text-[11px] opacity-80 font-bold uppercase tracking-wider text-slate-400">
                        Fastest response
                      </p>
                      <p className="font-extrabold uppercase tracking-tight text-white">
                        WhatsApp · Request a Quote
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-4 border border-slate-200 bg-white p-5 hover:border-sky-500 transition rounded-xl"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center bg-slate-950 text-white rounded-lg">
                      <FaPhone className="h-5 w-5 text-sky-400" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                        Call
                      </p>
                      <p className="font-extrabold text-slate-950">
                        {siteConfig.phoneDisplay}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-4 border border-slate-200 bg-white p-5 hover:border-sky-500 transition rounded-xl"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center bg-slate-950 text-white rounded-lg">
                      <FaEnvelope className="h-5 w-5 text-sky-400" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                        Email
                      </p>
                      <p className="font-extrabold text-slate-950 break-all">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>

                  <div className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2">
                        <FaRegClock className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                          Hours
                        </p>
                      </div>
                      <p className="mt-1.5 font-bold text-slate-950 text-sm">
                        {siteConfig.hours}
                      </p>
                    </div>
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2">
                        <FaLocationDot className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                          Coverage Areas
                        </p>
                      </div>
                      <p className="mt-1.5 font-bold text-slate-950 text-sm">
                        Klang Valley, KL &amp; Selangor
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative">
                <ContactForm />
                {/* Embedded Engine GEO Citation Input inside valid block tree */}
                <input type="hidden" id="geo-regions" value="Ampang, Cheras, Petaling Jaya, Subang Jaya, Puchong, Shah Alam" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CoverageAreas />
    </>
  );
}
