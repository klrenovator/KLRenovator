// IMPORTANT: import from `site-public`, never `site`.
//
// `waLink()` is used by nearly every client component on the site. When this
// module imported the full `config/site.ts` (~1.1 MB — all area, kampung,
// brand and problem content), webpack pulled that entire object into a
// shared client chunk that 80+ route groups then loaded. `site-public.ts`
// is the ~25 KB client-safe projection and is all this helper needs.
import { sitePublic } from "@/config/site-public";

/**
 * Build a wa.me link with a pre-filled message.
 */
export function waLink(message?: string) {
  const base = `https://wa.me/${sitePublic.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Standard RFQ template — used by all generic "Request a Quote" buttons.
 */
export const rfqMsg = [
  "Hi KL Renovator",
  "",
  "I would like to get a quotation for Aircond service/installation.",
  "",
  "Here are my details:",
  "Location:",
  "Type of service:",
  "Number of units:",
  "HP (if known):",
  "",
  "Please share price and available time. Thank you!",
].join("\n");

/**
 * Service-specific RFQ — same template, but the "Type of service" line
 * is pre-filled with the chosen service title.
 */
export function rfqMsgForService(serviceTitle: string) {
  return [
    "Hi KL Renovator 👋",
    "",
    `I would like to get a quotation for "${serviceTitle}".`,
    "",
    "Here are my details:",
    "📍 Location:",
    `❄️ Type of service: ${serviceTitle}`,
    "🔢 Number of units:",
    "💨 HP (if known):",
    "",
    "Please share price and available time. Thank you!",
  ].join("\n");
}

/** Back-compat alias — older imports referenced `defaultWhatsAppMsg`. */
export const defaultWhatsAppMsg = rfqMsg;
