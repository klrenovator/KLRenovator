import type { Metadata } from "next";
import NextLink from "next/link";
import { FiArrowRight, FiAlertTriangle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Aircond Problems Guide KL & Selangor | KL Renovator",
  description:
    "Complete guide to aircond problems in KL & Selangor. Aircond not cold, water leaking, making noise, bad smell, blinking lights and more — diagnosed and fixed by KL Renovator. Call +60182983573.",
  openGraph: {
    title: "Aircond Problems Guide KL & Selangor | KL Renovator",
    description:
      "Complete guide to aircond problems in KL & Selangor. All common faults diagnosed and fixed. Same-day service. Call +60182983573.",
    url: "https://www.klrenovator.com/problems",
    type: "website",
  },
  alternates: { canonical: "https://www.klrenovator.com/problems" },
};

const waMsg = "Hi KL Renovator, my aircond has a problem. Can you help diagnose and fix it? My location is:";

export default function ProblemsPage() {
  const problems = siteConfig.problemPages;

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.04),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>Aircond Problem Diagnosis</p>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>Common Aircond </span>
              <span className={title({ size: "lg", color: "brand" })}>Problems KL & Selangor</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              KL Renovator diagnoses and fixes all common aircond problems across Kuala Lumpur and Selangor. Find your problem below — each guide explains the cause, fix, and pricing.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> WhatsApp For Diagnosis
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>All Problems</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Select Your </span>
                <span className={title({ size: "sm", color: "brand" })}>Aircond Problem</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {problems.map((problem, i) => (
              <Reveal key={problem.slug} delay={i * 20}>
                <NextLink
                  href={`/problems/${problem.slug}`}
                  className="group flex flex-col bg-white border border-slate-200 hover:border-red-200 hover:shadow-md rounded-2xl p-5 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <FiAlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                    <h3 className="font-black text-sm text-slate-900 group-hover:text-sky-700 transition-colors leading-tight">
                      {problem.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed flex-1">
                    {problem.description.substring(0, 100)}...
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-black text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
                      See Fix →
                    </span>
                    <FiArrowRight className="h-4 w-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                  </div>
                </NextLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Answer Section — AEO */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Quick Answers</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Most Common Aircond </span>
                <span className={title({ size: "sm", color: "brand" })}>Questions</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                q: "My aircond is running but not cold. What should I do?",
                a: "The most likely causes are low refrigerant gas, a dirty evaporator coil, or a failing capacitor. WhatsApp KL Renovator at +60182983573 with your unit HP and area — a technician will diagnose and quote before starting.",
              },
              {
                q: "My aircond is dripping water. Is it dangerous?",
                a: "Water dripping from the indoor unit is caused by a blocked drain pipe or dirty drain pan. It is not immediately dangerous but should be fixed promptly — prolonged leaking causes mould growth and potential ceiling/electrical damage.",
              },
              {
                q: "My aircond smells bad when it turns on. What causes it?",
                a: "Bad smell is caused by mould and bacteria on the evaporator coil. A chemical wash (from RM 120) kills the mould and eliminates the smell permanently. If the smell is like burning, switch off the unit and call immediately.",
              },
              {
                q: "My aircond light is blinking and it stopped working. What is the error?",
                a: "Blinking lights are error codes from the PCB. The pattern of blinks indicates a specific fault — low gas, dirty sensor, communication error, or PCB failure. KL Renovator reads the error code and diagnoses the root cause.",
              },
              {
                q: "Why is my electricity bill high after using the aircond?",
                a: "A dirty aircond coil or low refrigerant forces the compressor to work harder, consuming more electricity. A chemical wash or gas top-up can significantly reduce running costs.",
              },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 30}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-black text-sm text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Our Services</h3>
                <ul className="space-y-2">
                  {siteConfig.services.map((s) => (
                    <li key={s.slug}>
                      <NextLink href={`/services/${s.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors">
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" /> {s.title}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Areas We Cover</h3>
                <ul className="space-y-2">
                  {siteConfig.areaPages.slice(0, 8).map((area) => (
                    <li key={area.slug}>
                      <NextLink href={`/areas/${area.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors">
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" /> {area.name}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Brands We Service</h3>
                <ul className="space-y-2">
                  {siteConfig.brandPages.slice(0, 8).map((b) => (
                    <li key={b.slug}>
                      <NextLink href={`/brands/${b.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors">
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" /> {b.name}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Get Your Aircond Problem Fixed Today
            </h2>
            <p className="mt-3 text-sky-100 font-medium">
              Same-day service across KL & Selangor. Transparent quote before work starts. All brands.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
