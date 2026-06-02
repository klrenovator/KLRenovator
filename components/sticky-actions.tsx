"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const StickyActions = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 sm:bottom-8 sm:right-8 print:hidden">
      {/* 1. Ultra-High Conversion Pure Green WhatsApp Trigger */}
      <a
        href={waLink(rfqMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book Aircond Service via WhatsApp"
        className="group relative inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-[0_8px_30px_rgb(34,197,94,0.4)] ring-4 ring-white transition-all hover:scale-110 active:scale-95"
      >
        {/* Dynamic Wave Pulse Animation to Attract Customer Eyes Instantly */}
        <span className="absolute inset-0 rounded-full bg-[#22c55e] opacity-40 animate-ping" />
        <FaWhatsapp className="relative h-7 w-7 sm:h-8 sm:w-8" />
        
        {/* Desktop Hover Tooltip Box */}
        <span className="pointer-events-none absolute right-full mr-4 tracking-wide whitespace-nowrap bg-slate-900 px-3.5 py-2 text-xs font-black uppercase text-white opacity-0 transition-opacity rounded-lg group-hover:opacity-100 shadow-xl border border-slate-700">
          💬 Book WhatsApp (Fast Response)
        </span>
      </a>

      {/* 2. Direct Cooling Blue Call Trigger for Immediate Technical Dispatch */}
      <a
        href={`tel:${siteConfig.phone}`}
        aria-label="Call KL Renovator HVAC Support Now"
        className="group relative inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-[0_8px_30px_rgb(2,132,199,0.4)] ring-4 ring-white transition-all hover:scale-110 active:scale-95"
      >
        <FaPhoneAlt className="h-5 w-5 sm:h-6 sm:w-6" />
        
        {/* Desktop Hover Tooltip Box */}
        <span className="pointer-events-none absolute right-full mr-4 tracking-wide whitespace-nowrap bg-slate-900 px-3.5 py-2 text-xs font-black uppercase text-white opacity-0 transition-opacity rounded-lg group-hover:opacity-100 shadow-xl border border-slate-700">
          📞 Call Now: {siteConfig.phoneDisplay}
        </span>
      </a>
    </div>
  );
};
