"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const StickyActions = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={waLink(rfqMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center bg-brand-500 text-white shadow-2xl shadow-brand-900/50 ring-4 ring-white transition-transform hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 bg-brand-500 opacity-50 animate-ping" />
        <FaWhatsapp className="relative h-7 w-7 sm:h-8 sm:w-8" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-black px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
          WhatsApp · RFQ
        </span>
      </a>

      <a
        href={`tel:${siteConfig.phone}`}
        aria-label="Call now"
        className="group relative inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center bg-brand-900 text-white shadow-2xl shadow-brand-900/40 ring-4 ring-white transition-transform hover:scale-105 active:scale-95"
      >
        <FaPhoneAlt className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-black px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
          Call {siteConfig.phoneDisplay}
        </span>
      </a>
    </div>
  );
};
