import type { Metadata } from "next";
import Image from "next/image";
import {
  FaShieldAlt, FaUserCheck, FaTools, FaHandshake,
  FaWhatsapp, FaPhoneAlt,
} from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow, subtitle } from "@/components/primitives";
import { StatsBand } from "@/components/sections/stats-band";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About KL Renovator | Trusted Aircond Specialist KL & Selangor",
  description:
    "Learn about KL Renovator (Multicore Dynamic Resources) — KL & Selangor's trusted aircon specialist for installation, chemical wash, repair, and gas top-up. 10+ years experience, 5,000+ happy customers.",
};

const VALUES = [
  {
    icon: FaShieldAlt,
    title: "Integrity",
    desc: "We give honest assessments and never recommend services you don't need.",
  },
  {
    icon: FaTools,
    title: "Craftsmanship",
    desc: "Every job is done by licensed technicians using proper tools and techniques.",
  },
  {
    icon: FaUserCheck,
    title: "Customer-First",
    desc: "Your satisfaction drives every decision we make — from quote to handover.",
  },
  {
    icon: FaHandshake,
    title: "Transparency",
    desc: "Clear quotes, no hidden fees, no surprises on the invoice.",
  },
];

const HIGHLIGHTS = [
  "10+ years of aircon expertise",
  "5,000+ satisfied customers",
  "Licensed & insured technicians",
  "Same-day service available",
  "1-year workmanship warranty",
  "Servicing all major brands",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/hero/WhatsApp Image 2026-05-03 at 13.39.32.jpeg"
            alt="KL Renovator team at work"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950/90" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">
              About KL Renovator
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.05] text-white uppercase">
              Built on craft.
              <br />
              <span className="text-sky-400">Driven by trust.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              For over a decade we have been the aircon partner Kuala Lumpur
              and Selangor turn to when comfort matters. From condos to
              commercial cassette installs — we deliver clean, careful work
              every single visit.
            </p>
          </Reveal>
        </div>
      </section>

      <StatsBand />

      {/* Story */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl">
                <Image
                  src="/hero/WhatsApp Image 2026-05-03 at 13.39.33.jpeg"
                  alt="KL Renovator aircond technician servicing unit"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <p className={eyebrow()}>Our Story</p>
                <h2 className="mt-3">
                  <span className={title({ size: "md" })}>A team of </span>
                  <span className={title({ size: "md", color: "brand" })}>
                    aircon experts.
                  </span>
                </h2>
                <p className={subtitle({ class: "mt-4" })}>
                  KL Renovator started as a single-van operation servicing
                  homes in Cheras. Today we are a full-service aircon
                  specialist with technicians stationed across the Klang Valley.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed font-medium">
                  What has not changed is the obsession with doing the small
                  things well — wearing shoe covers indoors, cleaning up after
                  every visit, and giving customers a clear quote before a
                  single screw is turned.
                </p>

                <ul className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
                  {HIGHLIGHTS.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 bg-white px-4 py-3">
                      <FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" />
                      <span className="text-sm font-bold text-slate-900">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className={eyebrow()}>Our Values</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>How we </span>
                <span className={title({ size: "md", color: "brand" })}>do business.</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium">
                Four principles that guide every booking, quote, and visit.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div className="bg-white p-6 sm:p-8 h-full hover:bg-slate-50 transition-colors">
                  <div className="inline-flex h-12 w-12 items-center justify-center bg-sky-700 text-white">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-black uppercase tracking-tight text-slate-950">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CoverageAreas />

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Let&apos;s get your aircon{" "}
              <span className="text-sky-400">running like new.</span>
            </h2>
            <p className="mt-4 text-slate-400 font-medium">
              Same-day slots available across KL &amp; Selangor.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all"
              >
                <FaWhatsapp className="h-5 w-5" />
                Request a Quote
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-white hover:bg-slate-100 px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-950 transition-all"
              >
                <FaPhoneAlt className="h-4 w-4" />
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
