"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { waLink, rfqMsg } from "@/lib/whatsapp";

const STORAGE_KEY = "klr_scroll_cta_dismissed";

export function ScrollDepthCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && Date.now() < JSON.parse(stored).until) {
        setDismissed(true);
        return;
      }
    } catch {}

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;

      // Show between 60% and 92% scroll depth
      if (pct > 0.60 && pct < 0.92) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ until: Date.now() + 86400_000 }));
    } catch {}
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-sky-500 shadow-2xl px-4 py-3 flex items-center justify-between gap-3 print:hidden">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-black text-slate-900 leading-tight">
          Like what you see? Get a same-day slot.
        </p>
        <p className="text-[10px] text-slate-500 font-medium mt-0.5 hidden sm:block">
          WhatsApp us now — reply in minutes, price before we start.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href={waLink(rfqMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-4 py-2.5 rounded-xl text-xs transition-all active:scale-[0.97] shadow-md"
        >
          <FaWhatsapp className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">WhatsApp Quote</span>
          <span className="sm:hidden">Quote</span>
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
