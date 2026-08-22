"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/language-context";
import { HiXMark } from "react-icons/hi2";

const TEXT = {
  en: "📅 Check Live Slots & Book",
  ms: "📅 Semak Slot Tersedia & Tempah",
  zh: "📅 查看空档并预约",
};

const DISMISS_KEY = "klr-floating-booking-dismissed";
const DISMISS_MINUTES = 5; // re-show after 5 minutes (user requested)

export function FloatingBookingButton() {
  const { lang } = useLang();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [liftForScrollBar, setLiftForScrollBar] = useState(false);
  const [hideNearFooter, setHideNearFooter] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [entrance, setEntrance] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastLiftRef = useRef(false);

  // Mount + dismiss check (5 min expiry)
  useEffect(() => {
    setIsMounted(true);
    // Respect prefers-reduced-motion
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener?.("change", handler);
      // Trigger entrance animation after mount
      requestAnimationFrame(() => setEntrance(true));
      // Dismiss check
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const ts = parseInt(raw, 10);
        if (!Number.isNaN(ts) && Date.now() - ts < DISMISS_MINUTES * 60 * 1000) {
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

  // Scroll lift – same logic as StickyActions: lift when scroll depth CTA bar shows (60%-92%)
  useEffect(() => {
    if (!isMounted) return;
    const calculate = () => {
      rafRef.current = null;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;
      const nextLift = pct > 0.6 && pct < 0.92;
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
  }, [isMounted]);

  // Hide when footer enters viewport – avoids covering footer links / trust badges
  useEffect(() => {
    if (!isMounted) return;
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setHideNearFooter(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { rootMargin: "0px", threshold: [0, 0.1, 0.5] }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, [isMounted]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  };

  if (!isMounted || isDismissed) return null;

  const wrapperClasses = [
    "fixed z-[100] print:hidden",
    "left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0",
    "lg:right-8",
    liftForScrollBar ? "bottom-[140px] sm:bottom-[160px] lg:bottom-28" : "bottom-[88px] sm:bottom-28 lg:bottom-8",
    "transition-[bottom,transform,opacity] duration-300 ease-out",
    hideNearFooter ? "translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
    entrance ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-95",
    prefersReducedMotion ? "" : "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
  ].join(" ");

  return (
    <div
      className={wrapperClasses}
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dismiss button – hides for 5 min only */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss booking button for 5 minutes"
        className="absolute -top-2 -right-2 z-20 grid h-7 w-7 place-items-center rounded-full bg-white text-slate-600 border border-slate-200 shadow-md hover:bg-slate-50 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
      >
        <HiXMark className="h-4 w-4" aria-hidden="true" />
      </button>

      <button
        onClick={() => router.push("/book")}
        className="group relative flex items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[13px] sm:text-[14px] px-5 py-3 sm:px-6 sm:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] border border-slate-700/80 hover:bg-slate-800 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all touch-manipulation"
        aria-label={TEXT[lang as keyof typeof TEXT] || TEXT.en}
      >
        {/* Orbit ring — decorative ring that rotates smoothly around the
            pill, continuously (owner request). Skipped entirely for
            prefers-reduced-motion users; the CSS class also self-disables. */}
        {!prefersReducedMotion && (
          <span className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
            <span
              className="klr-orbit-ring block aspect-square rounded-full border-2 border-dashed border-sky-400/80"
              style={{ height: "calc(100% + 16px)" }}
            />
          </span>
        )}

        {/* Pulse glow – disabled for reduced-motion users */}
        {!prefersReducedMotion && (
          <span
            className={`absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500 -z-10 ${
              isHovered ? "[animation-play-state:paused]" : "animate-pulse"
            }`}
            aria-hidden="true"
          />
        )}

        <span className="flex items-center gap-2 relative z-10 tracking-tight">
          {TEXT[lang as keyof typeof TEXT] || TEXT.en}
        </span>

        {/* Live indicator dot */}
        <span className="ml-2.5 inline-flex items-center gap-1.5 pl-2.5 border-l border-white/15">
          <span className="relative flex h-2 w-2">
            {!prefersReducedMotion && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" aria-hidden="true" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 hidden sm:inline">Live</span>
        </span>
      </button>

      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 mb-2 hidden group-hover:block whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
        Click X to hide for 5 min
      </span>
    </div>
  );
}
