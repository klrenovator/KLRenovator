"use client";

import dynamic from "next/dynamic";
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
 *
 * ConversionTracking (GA4 click tracking) now mounts immediately in the root
 * layout instead of here, so conversion events are captured from first paint
 * rather than after this lazy bundle loads.
 */
export function ConversionWidgets() {
  return (
    <>
      <StickyActions />
      <MobileStickyBar />
      <FloatingBookingButton />
    </>
  );
}
