"use client";

import { useState } from "react";
import { FaWhatsapp, FaCheck, FaSnowflake } from "react-icons/fa6";

import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsgForService } from "@/lib/whatsapp";
import { title, eyebrow } from "@/components/primitives";
import { useLang } from "@/context/language-context";

export const ServicesWithPricing = () => {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const { t } = useLang();

  const filteredServices = siteConfig.services.filter(
    (s) => s.category === activeTab || s.category === "both"
  );

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
            <div className="inline-flex p-1.5 bg-slate-200/80 backdrop-blur-sm border border-slate-300/30 shadow-inner">
              <button
                onClick={() => setActiveTab("residential")}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  activeTab === "residential"
                    ? "bg-white text-slate-950 shadow-md"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {t("services_residential")}
              </button>
              <button
                onClick={() => setActiveTab("commercial")}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  activeTab === "commercial"
                    ? "bg-white text-slate-950 shadow-md"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {t("services_commercial")}
              </button>
            </div>
          </Reveal>
        </div>

        {/* Service Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {filteredServices.map((service, index) => (
            <Reveal key={service.slug} delay={index * 50}>
              <div className="flex flex-col h-full bg-white border border-slate-100 p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 relative group">

                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex-grow">
                  <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 mb-5">
                    <FaSnowflake className="h-5 w-5" />
                  </div>

                  <h3 className="text-xl font-black text-slate-950 tracking-tight uppercase">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">
                    {service.short}
                  </p>

                  {/* Price */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-baseline gap-1.5">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{t("services_from")}</span>
                    <span className="text-3xl font-black tracking-tight text-slate-950">RM {service.startPrice}</span>
                  </div>

                  {/* Target Problem */}
                  <div className="mt-5">
                    <div className="flex items-start gap-3 text-xs font-bold text-slate-600 tracking-wide">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e]">
                        <FaCheck className="h-2.5 w-2.5" />
                      </span>
                      <span className="pt-0.5">{service.targetProblem}</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-8">
                  <a
                    href={waLink(rfqMsgForService(service.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-widest text-xs py-4 shadow-lg shadow-green-500/10 hover:shadow-green-500/20 transition-all active:scale-[0.98]"
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
    </section>
  );
};
