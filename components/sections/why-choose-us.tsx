import {
  FaShieldAlt,
  FaUserCheck,
  FaTools,
  FaRegClock,
  FaMoneyBillWave,
  FaAward,
} from "react-icons/fa";

import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";

const FEATURES = [
  {
    icon: FaShieldAlt,
    title: "Licensed & Insured",
    desc: "Every technician is licensed and insured for your protection.",
  },
  {
    icon: FaUserCheck,
    title: "Trusted by 5,000+",
    desc: "Thousands of homes & offices across KL & Selangor served.",
  },
  {
    icon: FaTools,
    title: "All Brands Serviced",
    desc: "Daikin, Panasonic, Mitsubishi, York, LG, Samsung & more.",
  },
  {
    icon: FaRegClock,
    title: "Fast Response",
    desc: "Same-day bookings. WhatsApp reply within 30 minutes.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Transparent Pricing",
    desc: "No surprises. Clear quote before any work starts.",
  },
  {
    icon: FaAward,
    title: "Workmanship Warranty",
    desc: "1-year warranty on installations. 3-month on repairs.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className={eyebrow()}>Why choose us</p>
            <h2 className="mt-3">
              <span className={title({ size: "md" })}>The aircon partner </span>
              <span className={title({ size: "md", color: "brand" })}>
                KL trusts.
              </span>
            </h2>
            <p className="mt-4 text-slate-600">
              Built on craftsmanship, transparency, and a relentless focus on
              keeping your home cool. Here&apos;s what sets us apart.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 border border-slate-200">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="bg-white p-6 h-full hover:bg-slate-50 transition-colors">
                <div className="inline-flex h-12 w-12 items-center justify-center bg-ink text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-extrabold uppercase tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
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
