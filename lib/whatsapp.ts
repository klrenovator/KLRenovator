import { siteConfig } from "@/config/site";

/**
 * Build a wa.me link with a pre-filled message.
 */
export function waLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Standard RFQ template — used by all generic "Request a Quote" buttons.
 */
export const rfqMsg = [
  "Hi KL Renovator 👋",
  "",
  "I would like to get a quotation for Aircond service/installation.",
  "",
  "Here are my details:",
  "📍 Location:",
  "❄️ Type of service:",
  "🔢 Number of units:",
  "💨 HP (if known):",
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
