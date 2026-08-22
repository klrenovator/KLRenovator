"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/language-context";
import { HiXMark } from "react-icons/hi2";

const TEXT = {
  en: "📅 Check Live Slots & Book",
  ms: "📅 Semak Slot Tersedia & Tempah",
  zh: "📅 查看空档并预约",
};

const DISMISS_KEY = "klr-floating-booking-dismissed";
const DISMISS_MINUTES = 5;

export function FloatingBookingButton() {
  const { lang } = useLang();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [entrance, setEntrance] = useState(false);

  // Mount + dismiss check (5 min expiry)
  useEffect(() => {
    setIsMounted(true);

    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const handler = (event: MediaQueryListEvent) =>
        setPrefersReducedMotion(event.matches);
      mq.addEventListener?.("change", handler);

      requestAnimationFrame(() => setEntrance(true));

      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const timestamp = parseInt(raw, 10);
        if (
          !Number.isNaN(timestamp) &&
          Date.now() - timestamp < DISMISS_MINUTES * 60 * 1000
        ) {
          setIsDismissed(true);
        } else {
          localStorage.removeItem(DISMISS_KEY);
        }
      }

      return () => mq.removeEventListener?.("change", handler);
    } catch {
      requestAnimationFrame(() => setEntrance(true));
    }
  }, []);

  const handleDismiss = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDismissed(true);

    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  };

  if (!isMounted || isDismissed) return null;

  return (
    <div
      className={`klr-roaming-booking z-[100] print:hidden ${
        prefersReducedMotion ? "klr-roaming-booking--static" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          entrance
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-5 scale-95 opacity-0"
        }`}
      >
        {/* Dismiss button – hides for 5 min only */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss booking button for 5 minutes"
          className="absolute -right-2 -top-2 z-20 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-50 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <HiXMark className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          onClick={() => router.push("/book")}
          className="group relative flex touch-manipulation items-center justify-center rounded-full border border-slate-700/80 bg-slate-900 px-5 py-3 text-[13px] font-bold text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all hover:bg-slate-800 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:scale-[0.97] sm:px-6 sm:py-3.5 sm:text-[14px]"
          aria-label={TEXT[lang as keyof typeof TEXT] || TEXT.en}
        >
          {/* Pulse glow – disabled for reduced-motion users */}
          {!prefersReducedMotion && (
            <span
              className={`absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 opacity-40 blur transition duration-500 group-hover:opacity-60 ${
                isHovered
                  ? "[animation-play-state:paused]"
                  : "animate-pulse"
              }`}
              aria-hidden="true"
            />
          )}

          <span className="relative z-10 flex items-center gap-2 tracking-tight">
            {TEXT[lang as keyof typeof TEXT] || TEXT.en}
          </span>

          {/* Live indicator dot */}
          <span className="ml-2.5 inline-flex items-center gap-1.5 border-l border-white/15 pl-2.5">
            <span className="relative flex h-2 w-2">
              {!prefersReducedMotion && (
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
                  aria-hidden="true"
                />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="hidden text-[10px] font-black uppercase tracking-widest text-emerald-300 sm:inline">
              Live
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
