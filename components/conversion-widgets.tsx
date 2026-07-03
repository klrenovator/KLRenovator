"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StickyActions = dynamic(
  () => import("@/components/sticky-actions").then((mod) => mod.StickyActions),
  { ssr: false, loading: () => null },
);

const ExitIntentPopup = dynamic(
  () => import("@/components/exit-intent-popup").then((mod) => mod.ExitIntentPopup),
  { ssr: false, loading: () => null },
);

const ScrollDepthCTA = dynamic(
  () => import("@/components/scroll-depth-cta").then((mod) => mod.ScrollDepthCTA),
  { ssr: false, loading: () => null },
);

const FloatingPromoWidgets = dynamic(
  () => import("@/components/floating-promo-widgets").then((mod) => mod.FloatingPromoWidgets),
  { ssr: false, loading: () => null },
);

/**
 * Defers non-critical conversion UI until after the main page has hydrated.
 * These widgets are valuable for leads, but they do not need to block LCP or
 * the first interaction bundle on every route.
 */
export function ConversionWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const show = () => setReady(true);

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(show, { timeout: 1800 });
    } else {
      timeoutId = setTimeout(show, 1200);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId && typeof win.cancelIdleCallback === "function") win.cancelIdleCallback(idleId);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <StickyActions />
      <ExitIntentPopup />
      <ScrollDepthCTA />
      <FloatingPromoWidgets />
    </>
  );
}
