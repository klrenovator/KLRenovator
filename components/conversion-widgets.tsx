"use client";

import dynamic from "next/dynamic";
import { ConversionTracking } from "@/components/conversion-tracking";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { StickyActions } from "@/components/sticky-actions";

const FloatingBookingButton = dynamic(
  () =>
    import("@/components/floating-booking-button").then(
      (mod) => mod.FloatingBookingButton,
    ),
  { ssr: false, loading: () => null },
);

/**
 * The site-wide conversion layer includes WhatsApp/call actions on desktop,
 * the mobile sticky bar, and the floating online booking CTA button.
 */
export function ConversionWidgets() {
  return (
    <>
      <ConversionTracking />
      <StickyActions />
      <MobileStickyBar />
      <FloatingBookingButton />
    </>
  );
}
