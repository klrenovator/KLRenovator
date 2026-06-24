"use client";

import { useEffect, useState, useCallback } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiX, FiClock, FiStar } from "react-icons/fi";
import { waLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

const EXIT_STORAGE_KEY = "klr_exit_dismissed";
const DISMISS_DAYS = 3; // don't show again for 3 days after dismiss

const exitMsg = [
  "Hi KL Renovator 👋",
  "",
  "I was browsing your website and would like to get a quote before I go.",
  "",
  "📍 My Location:",
  "❄️ Service I need:",
  "🔢 Number of units:",
  "",
  "Please send me your best price. Thank you!",
].join("\n");

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const isDismissed = useCallback(() => {
    try {
      const stored = localStorage.getItem(EXIT_STORAGE_KEY);
      if (!stored) return false;
      const { until } = JSON.parse(stored);
      return Date.now() < until;
    } catch {
      return false;
    }
  }, []);

  const dismiss = useCallback((permanent = false) => {
    setVisible(false);
    try {
      localStorage.setItem(
        EXIT_STORAGE_KEY,
        JSON.stringify({ until: Date.now() + (permanent ? 30 : DISMISS_DAYS) * 86400_000 })
      );
    } catch {}
  }, []);

  useEffect(() => {
    if (isDismissed()) return;

    // Trigger 1: mouse leaves viewport top (desktop)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered) {
        setTriggered(true);
        setVisible(true);
      }
    };

    // Trigger 2: mobile back-scroll bounce — rapid upward scroll after 40% depth
    let lastY = window.scrollY;
    let maxScroll = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const pageH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = pageH > 0 ? y / pageH : 0;
      if (pct > maxScroll) maxScroll = pct;
      // If scrolled back up quickly from >40% depth
      if (maxScroll > 0.4 && lastY - y > 200 && !triggered) {
        setTriggered(true);
        setVisible(true);
      }
      lastY = y;
    };

    // Trigger 3: 45-second idle timer (user hasn't converted)
    const timer = setTimeout(() => {
      if (!triggered && !isDismissed()) {
        setTriggered(true);
        setVisible(true);
      }
    }, 45000);

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [triggered, isDismissed]);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
        onClick={() => dismiss()}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Before you go — get a quick quote"
        className="fixed left-1/2 top-1/2 z-[999] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Top bar */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 py-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-sky-100 mb-0.5">
              Before You Go
            </p>
            <h2 className="text-lg font-black text-white leading-tight">
              Get a Free Quote in 60 Seconds
            </h2>
          </div>
          <button
            onClick={() => dismiss()}
            aria-label="Close"
            className="text-white/70 hover:text-white transition-colors mt-0.5 shrink-0"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Trust signals */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1">
              <FiStar className="h-3 w-3 text-amber-400" /> 500+ 5-Star Reviews
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="h-3 w-3 text-sky-500" /> Same-Day Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-black">✓</span> Price Before Work
            </span>
          </div>

          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Still deciding? WhatsApp us your details — we&apos;ll reply in minutes with a confirmed price. No commitment needed.
          </p>

          {/* Offers */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { service: "Chemical Wash", price: "from RM 120", slug: "chemical-wash" },
              { service: "Gas Top-Up", price: "from RM 120", slug: "gas-topup" },
              { service: "Chemical Overhaul", price: "from RM 220", slug: "chemical-overhaul" },
              { service: "Repair & Diagnose", price: "from RM 88", slug: "repair" },
            ].map((s) => (
              <a
                key={s.slug}
                href={waLink(`Hi KL Renovator 👋\n\nI'm interested in ${s.service}.\n\n📍 My Location:\n🔢 Number of units:\n\nPlease share your price. Thank you!`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => dismiss(true)}
                className="flex flex-col bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl px-3 py-2.5 transition-all"
              >
                <span className="text-xs font-black text-slate-900">{s.service}</span>
                <span className="text-[10px] font-bold text-sky-600 mt-0.5">{s.price}</span>
              </a>
            ))}
          </div>

          {/* Primary CTA */}
          <a
            href={waLink(exitMsg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => dismiss(true)}
            className="flex items-center justify-center gap-2.5 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider py-3.5 rounded-2xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20"
          >
            <FaWhatsapp className="h-5 w-5 shrink-0" />
            WhatsApp for Free Quote
          </a>

          <div className="mt-3 flex items-center justify-between">
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-xs font-black text-slate-500 hover:text-sky-600 transition-colors"
            >
              📞 {siteConfig.phoneDisplay}
            </a>
            <button
              onClick={() => dismiss()}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 
