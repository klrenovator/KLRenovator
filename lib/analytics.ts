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
//
// Canonical conversion event names (GA4 custom conversion events):
//   • click_whatsapp  — WhatsApp CTA click (primary conversion)
//   • click_phone     — tel: link click
//   • submit_booking  — booking form submitted on /book
//   • generate_lead   — GA4's built-in lead conversion event, fired on the
//                       highest-intent actions (booking + quote submits) so
//                       Google Ads / GA4 lead funnels work out of the box.
//
// Legacy names (whatsapp_click, call_click, booking_submit, quote_submit)
// are still emitted alongside so existing GA4 explorations, audiences and
// Google Ads import rules keep receiving data while dashboards migrate.
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
  const params: GtagParams = { event_category: "lead", context, ...extra };
  trackEvent("click_whatsapp", params);
  // Legacy name — kept for continuity with existing GA4 reports.
  trackEvent("whatsapp_click", params);
}

/** Phone / tel: link click. */
export function trackCallClick(context: string, extra: GtagParams = {}) {
  const params: GtagParams = { event_category: "lead", context, ...extra };
  trackEvent("click_phone", params);
  // Legacy name — kept for continuity with existing GA4 reports.
  trackEvent("call_click", params);
}

/** Booking form successfully submitted (/book). */
export function trackBookingSubmit(params: GtagParams = {}) {
  const all: GtagParams = { event_category: "lead", ...params };
  trackEvent("submit_booking", all);
  // Legacy name — kept for continuity with existing GA4 reports.
  trackEvent("booking_submit", all);
  // GA4's built-in lead conversion event — makes the booking show up in
  // standard lead funnels / Google Ads conversion imports without any
  // extra configuration.
  trackEvent("generate_lead", { ...all, lead_type: "booking" });
}

/** Quote/contact form successfully submitted. */
export function trackQuoteSubmit(context: string, extra: GtagParams = {}) {
  const params: GtagParams = { event_category: "lead", context, ...extra };
  trackEvent("submit_quote", params);
  // Legacy name — kept for continuity with existing GA4 reports.
  trackEvent("quote_submit", params);
  trackEvent("generate_lead", { ...params, lead_type: "quote" });
}

/** Interactive tool completed (BTU calculator, price calculator, diagnostic). */
export function trackToolUse(tool: string, extra: GtagParams = {}) {
  trackEvent("tool_use", { event_category: "engagement", tool, ...extra });
}
