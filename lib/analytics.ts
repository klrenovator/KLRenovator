// ─────────────────────────────────────────────────────────────────────────
// GA4 conversion events.
//
// Audit finding: GA4 (G-5V6TDZ48W0) and Microsoft Clarity were both loaded,
// but the codebase contained ZERO `gtag('event', ...)` calls. Every lead
// action — WhatsApp click, phone click, booking submit, quote form submit,
// calculator use — was completely untracked, so there was no way to tell
// which installation page actually produced business.
//
// These helpers are safe to call from anywhere: they no-op during SSR and
// when the gtag script has been blocked.
// ─────────────────────────────────────────────────────────────────────────

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: GtagParams) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, {
      // Always include the page so events can be attributed to the exact
      // installation landing that produced them.
      page_path: window.location.pathname,
      ...params,
    });
  } catch {
    // Analytics must never break the UI.
  }
}

/** WhatsApp CTA click — the site's primary conversion. */
export function trackWhatsAppClick(context: string, extra: GtagParams = {}) {
  trackEvent("whatsapp_click", { event_category: "lead", context, ...extra });
}

/** Phone / tel: link click. */
export function trackCallClick(context: string, extra: GtagParams = {}) {
  trackEvent("call_click", { event_category: "lead", context, ...extra });
}

/** Booking form successfully submitted. */
export function trackBookingSubmit(params: GtagParams = {}) {
  trackEvent("booking_submit", { event_category: "lead", ...params });
}

/** Quote/contact form successfully submitted. */
export function trackQuoteSubmit(context: string, extra: GtagParams = {}) {
  trackEvent("quote_submit", { event_category: "lead", context, ...extra });
}

/** Interactive tool completed (BTU calculator, price calculator, diagnostic). */
export function trackToolUse(tool: string, extra: GtagParams = {}) {
  trackEvent("tool_use", { event_category: "engagement", tool, ...extra });
}
