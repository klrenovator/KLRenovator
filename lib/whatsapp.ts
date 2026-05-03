import { siteConfig } from "@/config/site";

/**
 * Build a wa.me link with a pre-filled message.
 */
export function waLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMsg =
  `Hi Klrenovator, I'd like to book an aircon service. ` +
  `Please share the next available slot. Thanks!`;

export const rfqMsg =
  `Hi Klrenovator, I'd like to request a quote (RFQ). ` +
  `Please share pricing and availability for my requirement. Thanks!`;
