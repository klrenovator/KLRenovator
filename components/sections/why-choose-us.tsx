"use client";

import {
  FaShieldHalved,
  FaUserCheck,
  FaToolbox,
  FaRegClock,
  FaMoneyBillWave,
  FaAward,
} from "react-icons/fa6";

import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";

const FEATURES = [
  {
    icon: FaShieldHalved,
    title: "Registered Engineering Team",
    desc: "Every technician is highly trained and background-verified, executing safe residential and commercial HVAC diagnostics under strict corporate safety guidelines.",
  },
  {
    icon: FaUserCheck,
    title: "Trusted Klang Valley Experts",
    desc: "Proudly serving homes, retail outlets, and corporate offices across Kuala Lumpur and Selangor (including Ampang, Cheras, PJ, Subang Jaya, Puchong, and Shah Alam).",
  },
  {
    icon: FaToolbox,
    title: "Multi-Brand Specialists",
    desc: "Authorized maintenance, repair, and precision gas top-ups for major cooling brands: Daikin, Panasonic, Mitsubishi, York, LG, Samsung, and Midea.",
  },
  {
    icon: FaRegClock,
    title: "30-Min Fast Response",
    desc: "No long waiting times. Same-day emergency booking processing with instant customer support replies over WhatsApp within 30 minutes or less.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Transparent Upfront Rates",
    desc: "Zero hidden fees or surprise costs. We provide a complete itemized calculation and clear breakdown before any technical service or cleaning job starts.",
  },
  {
    icon: FaAward,
    title: "Solid Workmanship Guarantee",
    desc: "We stand behind our technical expertise with an absolute guarantee backing on installations and specialized system troubleshoot diagnostics.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className={eyebrow()}>Why Choose KL Renovator</p>
            <h2 className="mt-3">
              <span className={title({ size: "md" })}>The trusted aircond partner </span>
              <br className="hidden sm:inline" />
              <span className={title({ size: "md", color: "brand" })}>
                Klang Valley relies on.
              </span>
            </h2>
            <p className="mt-4 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              Built on expert craftsmanship, transparent operational pricing, and a relentless focus on keeping your living spaces cool and refreshing. Here is what makes our HVAC service system top-tier.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="bg-white p-6 sm:p-8 h-full hover:bg-slate-50/50 transition-all duration-200 flex flex-col justify-start">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-slate-900 rounded-xl text-white">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-6 text-base font-black uppercase tracking-tight text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
