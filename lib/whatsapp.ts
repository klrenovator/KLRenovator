import { siteConfig } from "@/config/site";

/**
 * Build a wa.me link with a pre-filled message so customers
 * can tap WhatsApp and get an intro text ready to send.
 */
export function waLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  if (!message) return base;
  const text = encodeURIComponent(message);
  return `${base}?text=${text}`;
}

export const defaultWhatsAppMsg =
  `Hi Klrenovator, I'd like to book an aircon service. ` +
  `Please share the next available slot. Thanks!`;
