"use client";

import dynamic from "next/dynamic";

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
 * Non-critical conversion widgets.
 *
 * Round 21 / 20H.87: this component is no longer mounted directly from the
 * root layout. `ConversionWidgetsLoader` imports it after browser idle / first
 * user intent, and each lead widget remains split into its own client chunk.
 */
export function ConversionWidgets() {
  return (
    <>
      <StickyActions />
      <ExitIntentPopup />
      <ScrollDepthCTA />
      <FloatingPromoWidgets />
    </>
  );
}
