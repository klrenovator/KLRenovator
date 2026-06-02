"use client";

import { useState } from "react";
import { FaWhatsapp, FaCheck, FaSnowflake } from "react-icons/fa6";

import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsgForService } from "@/lib/whatsapp";
import { title, eyebrow } from "@/components/primitives";

export const ServicesWithPricing = () => {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");

  // Filter services based on active high-conversion tab segments
  const filteredServices = siteConfig.services.filter(
    (s) => s.category === activeTab || s.category === "both"
  );

  return (
    <section id="services" className="py-20 sm:py-28 bg-slate-50 relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Matrix */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <p className={eyebrow()}>Premium Aircond Solutions</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>Transparent </span>
              <span className={title({ size: "sm", color: "brand" })}>Aircond Pricing</span>
            </h2>
            <p className="mt-4 text-slate-600 font-medium">
              No hidden fees. Professional residential and commercial HVAC services across Kuala Lumpur and Selangor with upfront, competitive rates.
            </p>
          </Reveal>
        </div>

        {/* Dynamic Interactive Segment Custom Tabs switcher */}
        <div className="mt-12 flex justify-center">
          <Reveal delay={100}>
            <div className="inline-flex p-1.5 bg-slate-200/80 backdrop-blur-sm rounded-2xl border border-slate-300/30 shadow-inner">
              <button
                onClick={() => setActiveTab("residential")}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 ${
                  activeTab === "residential"
                    ? "bg-white text-slate-950 shadow-md"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Residential Services
              </button>
              <button
                onClick={() => setActiveTab("commercial")}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 ${
                  activeTab === "commercial"
                    ? "bg-white text-slate-950 shadow-md"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Commercial HVAC
              </button>
            </div>
          </Reveal>
        </div>

        {/* Fact-Dense Answer-First Card Layout Schema Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {filteredServices.map((service, index) => (
            <Reveal key={service.slug} delay={index * 50}>
              <div className="flex flex-col h-full bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-300 relative group">
                
                {/* Visual Engineering Backdrop Accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 to-brand-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex-grow">
                  <div className="inline-flex p-3 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 mb-5">
                    <FaSnowflake className="h-5 w-5 animate-spin-slow" />
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-950 tracking-tight uppercase">
                    {service.title}
                  </h3>
                  
                  <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">
                    {service.description}
                  </p>

                  {/* Pricing Display Matrix Area */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-baseline gap-1">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">From</span>
                    <span className="text-3xl font-black tracking-tight text-slate-950">
                      {service.price}
                    </span>
                  </div>

                  {/* Semantic Scannable Feature List Matrix */}
                  <ul className="mt-6 space-y-3">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs font-bold text-slate-700 uppercase tracking-wide">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e]">
                          <FaCheck className="h-2.5 w-2.5" />
                        </span>
                        <span className="pt-0.5">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct High-Conversion WhatsApp CTAs */}
                <div className="mt-8 pt-2">
                  <a
                    href={waLink(rfqMsgForService(service.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl shadow-lg shadow-green-500/10 hover:shadow-green-500/20 transition-all active:scale-[0.98]"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    Book Service Now
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
