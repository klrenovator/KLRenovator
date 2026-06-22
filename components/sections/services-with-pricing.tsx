"use client";
import { useState } from "react";
import Link from "next/link";
import { FaWhatsapp, FaCheck, FaSnowflake, FaBuilding } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { title, eyebrow } from "@/components/primitives";
import { useLang } from "@/context/language-context";

// ─── Service benefit highlights per tab ─────────────────────────────────────
const residentialHighlights = [
  "Homes, Condos & Apartments",
  "All residential AC brands",
  "Same-day appointments",
  "Transparent fixed pricing",
];
const commercialHighlights = [
  "Offices, Retail & F&B outlets",
  "VRF / VRV system specialists",
  "Scheduled maintenance contracts",
  "Multi-unit commercial pricing",
];

// ─── Commercial-specific services that don't appear in residential ───────────
const commercialExtraInfo = [
  {
    title: "VRF / VRV Systems",
    desc: "We install, service and troubleshoot Variable Refrigerant Flow systems for large commercial spaces — offices, hotels and retail.",
    icon: <FaBuilding className="h-5 w-5" />,
  },
  {
    title: "Annual Maintenance Contracts",
    desc: "Fixed-rate AMC packages for offices — scheduled visits, priority response, and detailed service reports.",
    icon: <FaBuilding className="h-5 w-5" />,
  },
  {
    title: "Ceiling Cassette Specialists",
    desc: "From supply-and-install to chemical wash, we handle all ceiling cassette brands across KL & Selangor.",
    icon: <FaBuilding className="h-5 w-5" />,
  },
];

export const ServicesWithPricing = () => {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const { t } = useLang();

  // ✅ SSR both tabs — Google can crawl commercial content too
  const residentialServices = siteConfig.services.filter(
    (s) => s.slug !== "emergency" && (s.category === "residential" || s.category === "both")
  );
  const commercialServices = siteConfig.services.filter(
    (s) => s.slug !== "emergency" && (s.category === "commercial" || s.category === "both")
  );

  const isCommercial = activeTab === "commercial";

  return (
    <section id="services" className="py-20 sm:py-28 bg-slate-50 relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <p className={eyebrow()}>{t("services_eyebrow")}</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>{t("services_title1")}</span>
              <span className={title({ size: "sm", color: "brand" })}>{t("services_title2")}</span>
            </h2>
            <p className="mt-4 text-slate-600 font-medium">{t("services_desc")}</p>
          </Reveal>
        </div>

        {/* Tab Switcher */}
        <div className="mt-12 flex justify-center">
          <Reveal delay={100}>
            <div className="inline-flex p-1.5 bg-slate-200/80 backdrop-blur-sm border border-slate-300/30 shadow-inner rounded-xl">
              <button
                onClick={() => setActiveTab("residential")}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 rounded-lg ${
                  activeTab === "residential"
                    ? "bg-white text-slate-950 shadow-md"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                🏠 {t("services_residential")}
              </button>
              <button
                onClick={() => setActiveTab("commercial")}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 rounded-lg ${
                  activeTab === "commercial"
                    ? "bg-white text-slate-950 shadow-md"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                🏢 {t("services_commercial")}
              </button>
            </div>
          </Reveal>
        </div>

        {/* Tab Context Banner */}
        <Reveal delay={150}>
          <div className={`mt-8 mx-auto max-w-3xl rounded-xl p-5 border transition-all duration-300 ${
            isCommercial
              ? "bg-blue-50 border-blue-100"
              : "bg-sky-50 border-sky-100"
          }`}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {(isCommercial ? commercialHighlights : residentialHighlights).map((h) => (
                <div key={h} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <FaCheck className={`h-3 w-3 ${isCommercial ? "text-blue-500" : "text-sky-500"}`} />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ✅ Service Cards — BOTH TABS RENDERED, CSS TOGGLES VISIBILITY */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {/* Residential Grid */}
          <div className={`col-span-full grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${activeTab !== "residential" ? "hidden" : ""}`}>
            {residentialServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 50}>
                <div className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all duration-300 relative group">
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex-grow">
                    <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 mb-5 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                      <FaSnowflake className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-black text-slate-950 tracking-tight leading-snug">{service.title}</h3>
                    <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">{service.short}</p>
                    <div className="mt-5">
                      <div className="flex items-start gap-3 text-xs font-bold text-slate-600 tracking-wide bg-green-50 border border-green-100 rounded-lg p-3">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] rounded-full mt-0.5">
                          <FaCheck className="h-2.5 w-2.5" />
                        </span>
                        <span className="pt-0.5">{service.targetProblem}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98]"
                    >
                      View Details & Pricing
                      <FaArrowRight className="h-3 w-3" />
                    </Link>
                    <a
                      href={waLink(`Hi KL Renovator, I want to enquire about: ${service.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-xl shadow-sm hover:shadow-green-200 transition-all duration-200 active:scale-[0.98]"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      {t("services_book")}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Commercial Grid — SSR'd, Google can crawl */}
          <div className={`col-span-full grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${activeTab !== "commercial" ? "hidden" : ""}`}>
            {commercialServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 50}>
                <div className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative group">
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex-grow">
                    <div className="inline-flex p-3 bg-blue-50 border border-blue-100 text-blue-600 mb-5 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      <FaSnowflake className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-black text-slate-950 tracking-tight leading-snug">{service.title}</h3>
                    <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">{service.short}</p>
                    <div className="mt-5">
                      <div className="flex items-start gap-3 text-xs font-bold text-slate-600 tracking-wide bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded-full mt-0.5">
                          <FaCheck className="h-2.5 w-2.5" />
                        </span>
                        <span className="pt-0.5">{service.targetProblem}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98]"
                    >
                      View Details & Pricing
                      <FaArrowRight className="h-3 w-3" />
                    </Link>
                    <a
                      href={waLink(`Hi KL Renovator, I need a commercial quote for: ${service.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-xl shadow-sm hover:shadow-green-200 transition-all duration-200 active:scale-[0.98]"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      {t("services_book")}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Commercial Extra Info Block — always SSR'd, CSS toggles visibility (same pattern as the service grids above) */}
        <div className={isCommercial ? "" : "hidden"}>
          <Reveal delay={200}>
            <div className="mt-16">
              <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-8">
                Commercial HVAC Specialisations
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {commercialExtraInfo.map((item) => (
                  <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <div className="inline-flex p-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-lg mb-4">
                      {item.icon}
                    </div>
                    <h4 className="font-black text-slate-900 text-sm mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <a
                  href={waLink("Hi KL Renovator, I need a commercial HVAC quote for my business.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all duration-200"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  Get Commercial Quote via WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
