"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/language-context";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FaRobot } from "react-icons/fa6";
import { FiX } from "react-icons/fi";

// Localised label + destination. The assistant lives at /aircond-assistant
// in every locale (en unprefixed, ms/zh as folder trees).
const TEXT: Record<
  string,
  { label: string; sub: string; href: string }
> = {
  en: {
    label: "AI Assistant",
    sub: "Ask our Aircond Expert",
    href: "/aircond-assistant",
  },
  ms: {
    label: "Pembantu AI",
    sub: "Tanya Pakar Aircond",
    href: "/ms/aircond-assistant",
  },
  zh: {
    label: "AI 助手",
    sub: "咨询冷气专家",
    href: "/zh/aircond-assistant",
  },
};

/**
 * Floating "Expert / AI Assistant" launcher.
 *
 * Fixed bottom-right chat-style button that is visible on every page so a
 * visitor who needs help can open the Aircond Expert Assistant instantly.
 * Mounted directly from the root layout (not the idle-loaded conversion
 * bundle) so it is always present — no waiting for idle / first interaction.
 */
export function FloatingAssistantButton() {
  const { lang } = useLang();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render nothing on the server / first client paint to avoid hydration
  // mismatch (lang + dismiss state are client-only).
  if (!isMounted || dismissed) return null;

  const t = TEXT[lang as keyof typeof TEXT] || TEXT.en;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-20 right-4 z-[55] lg:bottom-6 lg:right-6 print:hidden"
        initial={
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
        }
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Dismiss (separate element so it is never nested inside the button) */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss assistant button"
          className="absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <FiX className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => router.push(t.href)}
          className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-sky-200/70 bg-gradient-to-r from-sky-600 to-blue-600 py-3 pl-3 pr-5 text-left shadow-2xl shadow-sky-900/20 transition-all hover:scale-[1.03] hover:shadow-sky-900/30 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 touch-manipulation"
          aria-label={t.label}
        >
          {/* Pulsing attention ring */}
          {!prefersReducedMotion && (
            <span className="pointer-events-none absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 opacity-40 blur animate-pulse" />
          )}

          {/* Robot icon */}
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 transition-transform group-hover:rotate-6">
            <FaRobot className="h-5 w-5" />
            {/* Live "online" dot */}
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sky-600 bg-green-400" />
          </span>

          {/* Label + sub */}
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold tracking-tight text-white">
              {t.label}
            </span>
            <span className="hidden text-[11px] font-medium text-sky-100/90 sm:block">
              {t.sub}
            </span>
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
