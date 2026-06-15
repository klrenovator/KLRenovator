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
import { useLang } from "@/context/language-context";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { FaWhatsapp } from "react-icons/fa6";

// ── Official Google "G" multicolor SVG ───────────────────────────────────────
const GoogleGIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
    aria-hidden="true"
  >
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

const ICONS = [FaShieldHalved, FaUserCheck, FaToolbox, FaRegClock, FaMoneyBillWave, FaAward];
const COLORS = [
  "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-500",
  "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-500",
  "bg-violet-50 border-violet-100 text-violet-600 group-hover:bg-violet-500",
  "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-500",
  "bg-rose-50 border-rose-100 text-rose-600 group-hover:bg-rose-500",
  "bg-teal-50 border-teal-100 text-teal-600 group-hover:bg-teal-500",
];

export const WhyChooseUs = () => {
  const { t } = useLang();

  const FEATURES = [
    { icon: ICONS[0], colorClass: COLORS[0], title: t("why_1_title"), desc: t("why_1_desc") },
    { icon: ICONS[1], colorClass: COLORS[1], title: t("why_2_title"), desc: t("why_2_desc") },
    { icon: ICONS[2], colorClass: COLORS[2], title: t("why_3_title"), desc: t("why_3_desc") },
    { icon: ICONS[3], colorClass: COLORS[3], title: t("why_4_title"), desc: t("why_4_desc") },
    { icon: ICONS[4], colorClass: COLORS[4], title: t("why_5_title"), desc: t("why_5_desc") },
    { icon: ICONS[5], colorClass: COLORS[5], title: t("why_6_title"), desc: t("why_6_desc") },
  ];

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className={eyebrow()}>{t("why_eyebrow")}</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>{t("why_title1")}</span>
                <span className={title({ size: "md", color: "brand" })}>{t("why_title2")}</span>
              </h2>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {/* Google rating badge with multicolor G icon + colored "Google" text */}
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
                <GoogleGIcon className="h-4 w-4 shrink-0" />
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className="text-xs font-black text-slate-700">5 / 5</span>
                <span className="flex items-center gap-0 text-xs font-black">
                  <span style={{ color: "#EA4335" }}>G</span>
                  <span style={{ color: "#4285F4" }}>o</span>
                  <span style={{ color: "#FBBC05" }}>o</span>
                  <span style={{ color: "#34A853" }}>g</span>
                  <span style={{ color: "#EA4335" }}>l</span>
                  <span style={{ color: "#4285F4" }}>e</span>
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
                <span className="text-xs font-black text-slate-700">✓ 5,000+ Customers</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
                <span className="text-xs font-black text-slate-700">⚡ Same-Day Service</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Feature Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="group bg-white border border-slate-100 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg hover:border-sky-100 transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className={`inline-flex h-13 w-13 p-3 shrink-0 items-center justify-center border rounded-xl mb-5 transition-all duration-300 group-hover:text-white ${f.colorClass}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2.5">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium flex-grow">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Brands row */}
        <Reveal>
          <div className="mt-14 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center mb-6">
              All Brands We Service
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {siteConfig.brandsSupported.map((brand) => (
                <span
                  key={brand}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-sky-50 hover:border-sky-200 hover:text-sky-700 transition-all duration-200"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-10 text-center">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-md hover:shadow-green-200 transition-all duration-200"
            >
              <FaWhatsapp className="h-5 w-5" />
              Book Your Service — WhatsApp Us Now
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
