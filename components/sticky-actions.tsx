"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const StickyActions = () => {
  // The full-width ScrollDepthCTA bar shows between 60%-92% scroll depth.
  // We lift these bubbles only when needed and throttle scroll work with RAF.
  const [liftForScrollBar, setLiftForScrollBar] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastLiftRef = useRef(false);

  useEffect(() => {
    const calculate = () => {
      rafRef.current = null;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;
      const nextLift = pct > 0.60 && pct < 0.92;

      if (nextLift !== lastLiftRef.current) {
        lastLiftRef.current = nextLift;
        setLiftForScrollBar(nextLift);
      }
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(calculate);
    };

    calculate();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed right-6 z-50 flex flex-col items-end gap-4 sm:right-8 print:hidden transition-[bottom] duration-200 ${
        liftForScrollBar ? "bottom-24 sm:bottom-28" : "bottom-6 sm:bottom-8"
      }`}
    >
      <a
        href={waLink(rfqMsg)}
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label="Book Aircond Service via WhatsApp"
        className="group relative inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-[0_8px_30px_rgb(34,197,94,0.4)] ring-4 ring-white transition-all hover:scale-110 active:scale-[0.93]"
      >
        <span className="absolute inset-0 rounded-full bg-[#22c55e] opacity-40 animate-ping" />
        <FaWhatsapp className="relative h-7 w-7 sm:h-8 sm:w-8" />
        <span className="pointer-events-none absolute right-full mr-4 tracking-wide whitespace-nowrap bg-slate-900 px-3.5 py-2 text-xs font-black uppercase text-white opacity-0 transition-opacity rounded-lg group-hover:opacity-100 shadow-xl border border-slate-700">
          💬 Book WhatsApp (Fast Response)
        </span>
      </a>

      <a
        href={`tel:${siteConfig.phone}`}
        aria-label="Call KL Renovator HVAC Support Now"
        className="group relative inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-[0_8px_30px_rgb(2,132,199,0.4)] ring-4 ring-white transition-all hover:scale-110 active:scale-[0.93]"
      >
        <FaPhone className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="pointer-events-none absolute right-full mr-4 tracking-wide whitespace-nowrap bg-slate-900 px-3.5 py-2 text-xs font-black uppercase text-white opacity-0 transition-opacity rounded-lg group-hover:opacity-100 shadow-xl border border-slate-700">
          📞 Call Now: {siteConfig.phoneDisplay}
        </span>
      </a>
    </div>
  );
};
