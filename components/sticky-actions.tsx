"use client";

import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { waLink, defaultWhatsAppMsg } from "@/lib/whatsapp";

/**
 * Sticky floating action buttons — WhatsApp + Call.
 * Visible on ALL pages, both mobile and desktop.
 */
export const StickyActions = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* WhatsApp */}
      <a
        href={waLink(defaultWhatsAppMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--color-whatsapp))] text-white shadow-lg shadow-brand-600/40 transition-transform hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
      >
        <span className="absolute inset-0 rounded-full bg-[rgb(var(--color-whatsapp))] opacity-60 animate-ping" />
        <MessageCircle className="relative h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call */}
      <a
        href={`tel:${siteConfig.phone}`}
        aria-label="Call now"
        className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-cyan-600/30 transition-transform hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
      >
        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          Call {siteConfig.phoneDisplay}
        </span>
      </a>
    </div>
  );
};
