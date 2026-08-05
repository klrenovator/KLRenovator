"use client";

import { ConversionTracking } from "@/components/conversion-tracking";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { StickyActions } from "@/components/sticky-actions";

/**
 * The site-wide conversion layer intentionally has one CTA pattern per
 * viewport: WhatsApp/call actions on desktop and the same two actions in the
 * mobile sticky bar. In particular, it does not interrupt reading with exit
 * modals, scroll-depth bars, or drifting buttons.
 */
export function ConversionWidgets() {
  return (
    <>
      <ConversionTracking />
      <StickyActions />
      <MobileStickyBar />
    </>
  );
}
