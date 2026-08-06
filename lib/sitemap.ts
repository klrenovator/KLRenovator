import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPosts, type BlogPost } from "@/config/blog-posts";
import { brandAreaPairs } from "@/config/brand-area-priority";
import type { AreaPage, KampungPage } from "@/config/site/types";

const BASE = "https://www.klrenovator.com";

// P2-05: Sitemap generated from typed content registry (config/site/*) with content-aware dates.
// Last modified is now derived from the latest content deployment date and per-page availability.
// Each entry's lastModified can be overridden by content-specific dates where available (e.g., blog post dates).
// For registry entries without explicit dates, we use the latest registry update (2026-08-05).
const SITEMAP_LAST_MODIFIED = new Date("2026-08-05T00:00:00.000Z");

const buildCanonicalOnly = (path: string) => ({
  canonical: `${BASE}${path}`,
  languages: {
    "en-MY": `${BASE}${path}`,
  },
});

const buildTrilingual = (path: { en: string; ms: string; zh: string }) => ({
  canonical: `${BASE}${path.en}`,
  languages: {
    "en-MY": `${BASE}${path.en}`,
    "ms-MY": `${BASE}${path.ms}`,
    "zh-MY": `${BASE}${path.zh}`,
    "x-default": `${BASE}${path.en}`,
  },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const now = SITEMAP_LAST_MODIFIED;

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: buildTrilingual({ en: "", ms: "/ms", zh: "/zh" }) },
    { url: `${BASE}/ms`, lastModified: now, changeFrequency: "weekly", priority: 0.92, alternates: buildTrilingual({ en: "", ms: "/ms", zh: "/zh" }) },
    { url: `${BASE}/zh`, lastModified: now, changeFrequency: "weekly", priority: 0.92, alternates: buildTrilingual({ en: "", ms: "/ms", zh: "/zh" }) },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/ms/services`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/zh/services`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/areas", ms: "/ms/areas", zh: "/zh/areas" }) },
    { url: `${BASE}/ms/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.82, alternates: buildTrilingual({ en: "/areas", ms: "/ms/areas", zh: "/zh/areas" }) },
    { url: `${BASE}/zh/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.82, alternates: buildTrilingual({ en: "/areas", ms: "/ms/areas", zh: "/zh/areas" }) },
    { url: `${BASE}/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/brands", ms: "/ms/brands", zh: "/zh/brands" }) },
    { url: `${BASE}/ms/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.78, alternates: buildTrilingual({ en: "/brands", ms: "/ms/brands", zh: "/zh/brands" }) },
    { url: `${BASE}/zh/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.78, alternates: buildTrilingual({ en: "/brands", ms: "/ms/brands", zh: "/zh/brands" }) },
    { url: `${BASE}/problems`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/problems", ms: "/ms/problems", zh: "/zh/problems" }) },
    { url: `${BASE}/ms/problems`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildTrilingual({ en: "/problems", ms: "/ms/problems", zh: "/zh/problems" }) },
    { url: `${BASE}/zh/problems`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildTrilingual({ en: "/problems", ms: "/ms/problems", zh: "/zh/problems" }) },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: buildTrilingual({ en: "/blog", ms: "/ms/blog", zh: "/zh/blog" }) },
    { url: `${BASE}/ms/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.78, alternates: buildTrilingual({ en: "/blog", ms: "/ms/blog", zh: "/zh/blog" }) },
    { url: `${BASE}/zh/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.78, alternates: buildTrilingual({ en: "/blog", ms: "/ms/blog", zh: "/zh/blog" }) },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildTrilingual({ en: "/contact", ms: "/ms/contact", zh: "/zh/contact" }) },
    { url: `${BASE}/ms/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildTrilingual({ en: "/contact", ms: "/ms/contact", zh: "/zh/contact" }) },
    { url: `${BASE}/zh/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildTrilingual({ en: "/contact", ms: "/ms/contact", zh: "/zh/contact" }) },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.75, alternates: buildTrilingual({ en: "/faq", ms: "/ms/faq", zh: "/zh/faq" }) },
    { url: `${BASE}/ms/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.68, alternates: buildTrilingual({ en: "/faq", ms: "/ms/faq", zh: "/zh/faq" }) },
    { url: `${BASE}/zh/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.68, alternates: buildTrilingual({ en: "/faq", ms: "/ms/faq", zh: "/zh/faq" }) },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildTrilingual({ en: "/about", ms: "/ms/about", zh: "/zh/about" }) },
    { url: `${BASE}/ms/about`, lastModified: now, changeFrequency: "monthly", priority: 0.63, alternates: buildTrilingual({ en: "/about", ms: "/ms/about", zh: "/zh/about" }) },
    { url: `${BASE}/zh/about`, lastModified: now, changeFrequency: "monthly", priority: 0.63, alternates: buildTrilingual({ en: "/about", ms: "/ms/about", zh: "/zh/about" }) },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.70, alternates: buildTrilingual({ en: "/gallery", ms: "/ms/gallery", zh: "/zh/gallery" }) },
    { url: `${BASE}/ms/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.63, alternates: buildTrilingual({ en: "/gallery", ms: "/ms/gallery", zh: "/zh/gallery" }) },
    { url: `${BASE}/zh/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.63, alternates: buildTrilingual({ en: "/gallery", ms: "/ms/gallery", zh: "/zh/gallery" }) },
    { url: `${BASE}/near-me`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildTrilingual({ en: "/near-me", ms: "/ms/near-me", zh: "/zh/near-me" }) },
    { url: `${BASE}/ms/near-me`, lastModified: now, changeFrequency: "monthly", priority: 0.75, alternates: buildTrilingual({ en: "/near-me", ms: "/ms/near-me", zh: "/zh/near-me" }) },
    { url: `${BASE}/zh/near-me`, lastModified: now, changeFrequency: "monthly", priority: 0.75, alternates: buildTrilingual({ en: "/near-me", ms: "/ms/near-me", zh: "/zh/near-me" }) },
    { url: `${BASE}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.82, alternates: buildTrilingual({ en: "/book", ms: "/ms/book", zh: "/zh/book" }) },
    { url: `${BASE}/ms/book`, lastModified: now, changeFrequency: "monthly", priority: 0.75, alternates: buildTrilingual({ en: "/book", ms: "/ms/book", zh: "/zh/book" }) },
    { url: `${BASE}/zh/book`, lastModified: now, changeFrequency: "monthly", priority: 0.75, alternates: buildTrilingual({ en: "/book", ms: "/ms/book", zh: "/zh/book" }) },
    { url: `${BASE}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.30, alternates: buildTrilingual({ en: "/privacy-policy", ms: "/ms/privacy-policy", zh: "/zh/privacy-policy" }) },
    { url: `${BASE}/ms/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.25, alternates: buildTrilingual({ en: "/privacy-policy", ms: "/ms/privacy-policy", zh: "/zh/privacy-policy" }) },
    { url: `${BASE}/zh/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.25, alternates: buildTrilingual({ en: "/privacy-policy", ms: "/ms/privacy-policy", zh: "/zh/privacy-policy" }) },
    { url: `${BASE}/cuci-aircond-kl`, lastModified: now, changeFrequency: "weekly", priority: 0.96, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    { url: `${BASE}/ms/cuci-aircond-kl`, lastModified: now, changeFrequency: "weekly", priority: 0.95, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    { url: `${BASE}/zh/cuci-aircond-kl`, lastModified: now, changeFrequency: "weekly", priority: 0.90, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    { url: `${BASE}/installation-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.94, alternates: buildTrilingual({ en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" }) },
    { url: `${BASE}/ms/installation-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" }) },
    { url: `${BASE}/zh/installation-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" }) },
    { url: `${BASE}/aircond-service-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.95, alternates: buildTrilingual({ en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" }) },
    { url: `${BASE}/ms/aircond-service-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.96, alternates: buildTrilingual({ en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" }) },
    { url: `${BASE}/zh/aircond-service-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" }) },
    { url: `${BASE}/btu-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/btu-calculator", ms: "/ms/btu-calculator", zh: "/zh/btu-calculator" }) },
    { url: `${BASE}/ms/btu-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/btu-calculator", ms: "/ms/btu-calculator", zh: "/zh/btu-calculator" }) },
    { url: `${BASE}/zh/btu-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/btu-calculator", ms: "/ms/btu-calculator", zh: "/zh/btu-calculator" }) },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.90, alternates: buildTrilingual({ en: "/tools", ms: "/ms/tools", zh: "/zh/tools" }) },
    { url: `${BASE}/ms/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: buildTrilingual({ en: "/tools", ms: "/ms/tools", zh: "/zh/tools" }) },
    { url: `${BASE}/zh/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: buildTrilingual({ en: "/tools", ms: "/ms/tools", zh: "/zh/tools" }) },
    { url: `${BASE}/aircond-installation-cost-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.92, alternates: buildTrilingual({ en: "/aircond-installation-cost-calculator", ms: "/ms/aircond-installation-cost-calculator", zh: "/zh/aircond-installation-cost-calculator" }) },
    { url: `${BASE}/ms/aircond-installation-cost-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.87, alternates: buildTrilingual({ en: "/aircond-installation-cost-calculator", ms: "/ms/aircond-installation-cost-calculator", zh: "/zh/aircond-installation-cost-calculator" }) },
    { url: `${BASE}/zh/aircond-installation-cost-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.87, alternates: buildTrilingual({ en: "/aircond-installation-cost-calculator", ms: "/ms/aircond-installation-cost-calculator", zh: "/zh/aircond-installation-cost-calculator" }) },
    { url: `${BASE}/aircond-gas-topup-cost-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.90, alternates: buildTrilingual({ en: "/aircond-gas-topup-cost-calculator", ms: "/ms/aircond-gas-topup-cost-calculator", zh: "/zh/aircond-gas-topup-cost-calculator" }) },
    { url: `${BASE}/ms/aircond-gas-topup-cost-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: buildTrilingual({ en: "/aircond-gas-topup-cost-calculator", ms: "/ms/aircond-gas-topup-cost-calculator", zh: "/zh/aircond-gas-topup-cost-calculator" }) },
    { url: `${BASE}/zh/aircond-gas-topup-cost-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: buildTrilingual({ en: "/aircond-gas-topup-cost-calculator", ms: "/ms/aircond-gas-topup-cost-calculator", zh: "/zh/aircond-gas-topup-cost-calculator" }) },
    { url: `${BASE}/which-aircond-service-do-i-need`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/which-aircond-service-do-i-need", ms: "/ms/which-aircond-service-do-i-need", zh: "/zh/which-aircond-service-do-i-need" }) },
    { url: `${BASE}/ms/which-aircond-service-do-i-need`, lastModified: now, changeFrequency: "weekly", priority: 0.83, alternates: buildTrilingual({ en: "/which-aircond-service-do-i-need", ms: "/ms/which-aircond-service-do-i-need", zh: "/zh/which-aircond-service-do-i-need" }) },
    { url: `${BASE}/zh/which-aircond-service-do-i-need`, lastModified: now, changeFrequency: "weekly", priority: 0.83, alternates: buildTrilingual({ en: "/which-aircond-service-do-i-need", ms: "/ms/which-aircond-service-do-i-need", zh: "/zh/which-aircond-service-do-i-need" }) },
    { url: `${BASE}/aircond-size-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/aircond-size-calculator", ms: "/ms/aircond-size-calculator", zh: "/zh/aircond-size-calculator" }) },
    { url: `${BASE}/ms/aircond-size-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.83, alternates: buildTrilingual({ en: "/aircond-size-calculator", ms: "/ms/aircond-size-calculator", zh: "/zh/aircond-size-calculator" }) },
    { url: `${BASE}/zh/aircond-size-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.83, alternates: buildTrilingual({ en: "/aircond-size-calculator", ms: "/ms/aircond-size-calculator", zh: "/zh/aircond-size-calculator" }) },
    { url: `${BASE}/aircond-electricity-cost-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/aircond-electricity-cost-calculator", ms: "/ms/aircond-electricity-cost-calculator", zh: "/zh/aircond-electricity-cost-calculator" }) },
    { url: `${BASE}/ms/aircond-electricity-cost-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.83, alternates: buildTrilingual({ en: "/aircond-electricity-cost-calculator", ms: "/ms/aircond-electricity-cost-calculator", zh: "/zh/aircond-electricity-cost-calculator" }) },
    { url: `${BASE}/zh/aircond-electricity-cost-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.83, alternates: buildTrilingual({ en: "/aircond-electricity-cost-calculator", ms: "/ms/aircond-electricity-cost-calculator", zh: "/zh/aircond-electricity-cost-calculator" }) },
    { url: `${BASE}/aircond-savings-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/aircond-savings-calculator", ms: "/ms/aircond-savings-calculator", zh: "/zh/aircond-savings-calculator" }) },
    { url: `${BASE}/ms/aircond-savings-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.83, alternates: buildTrilingual({ en: "/aircond-savings-calculator", ms: "/ms/aircond-savings-calculator", zh: "/zh/aircond-savings-calculator" }) },
    { url: `${BASE}/zh/aircond-savings-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.83, alternates: buildTrilingual({ en: "/aircond-savings-calculator", ms: "/ms/aircond-savings-calculator", zh: "/zh/aircond-savings-calculator" }) },
  ];

  const emergencyPage: MetadataRoute.Sitemap = [
    { url: `${BASE}/services/emergency`, lastModified: now, changeFrequency: "monthly", priority: 0.97, alternates: buildTrilingual({ en: "/services/emergency", ms: "/ms/services/emergency", zh: "/zh/services/emergency" }) },
  ];
  const msEmergencyPage: MetadataRoute.Sitemap = [
    { url: `${BASE}/ms/services/emergency`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/services/emergency", ms: "/ms/services/emergency", zh: "/zh/services/emergency" }) },
  ];
  const zhEmergencyPage: MetadataRoute.Sitemap = [
    { url: `${BASE}/zh/services/emergency`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/services/emergency", ms: "/ms/services/emergency", zh: "/zh/services/emergency" }) },
  ];

  const installationPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/installation`, lastModified: now, changeFrequency: "weekly", priority: 0.97, alternates: buildTrilingual({ en: "/installation", ms: "/ms/installation", zh: "/zh/installation" }) },
    { url: `${BASE}/ms/installation`, lastModified: now, changeFrequency: "weekly", priority: 0.92, alternates: buildTrilingual({ en: "/installation", ms: "/ms/installation", zh: "/zh/installation" }) },
    { url: `${BASE}/zh/installation`, lastModified: now, changeFrequency: "weekly", priority: 0.90, alternates: buildTrilingual({ en: "/installation", ms: "/ms/installation", zh: "/zh/installation" }) },
    { url: `${BASE}/aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.96, alternates: buildTrilingual({ en: "/aircond-installation-kl", ms: "/ms/pemasangan-aircond-kl", zh: "/zh/aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/aircond-installation-kl", ms: "/ms/pemasangan-aircond-kl", zh: "/zh/aircond-installation-kl" }) },
    { url: `${BASE}/zh/aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/aircond-installation-kl", ms: "/ms/pemasangan-aircond-kl", zh: "/zh/aircond-installation-kl" }) },
    { url: `${BASE}/new-home-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/new-home-aircond-installation", ms: "/ms/pemasangan-aircond-rumah-baru", zh: "/zh/new-home-aircond-installation" }) },
    { url: `${BASE}/ms/pemasangan-aircond-rumah-baru`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/new-home-aircond-installation", ms: "/ms/pemasangan-aircond-rumah-baru", zh: "/zh/new-home-aircond-installation" }) },
    { url: `${BASE}/zh/new-home-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.87, alternates: buildTrilingual({ en: "/new-home-aircond-installation", ms: "/ms/pemasangan-aircond-rumah-baru", zh: "/zh/new-home-aircond-installation" }) },
    { url: `${BASE}/whole-house-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/whole-house-aircond-installation", ms: "/ms/pemasangan-aircond-seluruh-rumah", zh: "/zh/whole-house-aircond-installation" }) },
    { url: `${BASE}/ms/pemasangan-aircond-seluruh-rumah`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/whole-house-aircond-installation", ms: "/ms/pemasangan-aircond-seluruh-rumah", zh: "/zh/whole-house-aircond-installation" }) },
    { url: `${BASE}/zh/whole-house-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.87, alternates: buildTrilingual({ en: "/whole-house-aircond-installation", ms: "/ms/pemasangan-aircond-seluruh-rumah", zh: "/zh/whole-house-aircond-installation" }) },
    { url: `${BASE}/commercial-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/commercial-aircond-installation", ms: "/ms/pemasangan-aircond-komersial", zh: "/zh/commercial-aircond-installation" }) },
    { url: `${BASE}/ms/pemasangan-aircond-komersial`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/commercial-aircond-installation", ms: "/ms/pemasangan-aircond-komersial", zh: "/zh/commercial-aircond-installation" }) },
    { url: `${BASE}/zh/commercial-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.87, alternates: buildTrilingual({ en: "/commercial-aircond-installation", ms: "/ms/pemasangan-aircond-komersial", zh: "/zh/commercial-aircond-installation" }) },
    { url: `${BASE}/1hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.92, alternates: buildTrilingual({ en: "/1hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1hp-kl", zh: "/zh/1hp-aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-1hp-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/1hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1hp-kl", zh: "/zh/1hp-aircond-installation-kl" }) },
    { url: `${BASE}/zh/1hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/1hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1hp-kl", zh: "/zh/1hp-aircond-installation-kl" }) },
    { url: `${BASE}/1.5hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.92, alternates: buildTrilingual({ en: "/1.5hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1.5hp-kl", zh: "/zh/1.5hp-aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-1.5hp-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/1.5hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1.5hp-kl", zh: "/zh/1.5hp-aircond-installation-kl" }) },
    { url: `${BASE}/zh/1.5hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/1.5hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1.5hp-kl", zh: "/zh/1.5hp-aircond-installation-kl" }) },
    { url: `${BASE}/2hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.92, alternates: buildTrilingual({ en: "/2hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-2hp-kl", zh: "/zh/2hp-aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-2hp-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/2hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-2hp-kl", zh: "/zh/2hp-aircond-installation-kl" }) },
    { url: `${BASE}/zh/2hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/2hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-2hp-kl", zh: "/zh/2hp-aircond-installation-kl" }) },
    { url: `${BASE}/wall-mounted-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.92, alternates: buildTrilingual({ en: "/wall-mounted-aircond-installation-kl", ms: "/ms/pemasangan-aircond-dinding-kl", zh: "/zh/wall-mounted-aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-dinding-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/wall-mounted-aircond-installation-kl", ms: "/ms/pemasangan-aircond-dinding-kl", zh: "/zh/wall-mounted-aircond-installation-kl" }) },
    { url: `${BASE}/zh/wall-mounted-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/wall-mounted-aircond-installation-kl", ms: "/ms/pemasangan-aircond-dinding-kl", zh: "/zh/wall-mounted-aircond-installation-kl" }) },
    { url: `${BASE}/ceiling-cassette-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.92, alternates: buildTrilingual({ en: "/ceiling-cassette-aircond-installation-kl", ms: "/ms/pemasangan-aircond-keset-siling-kl", zh: "/zh/ceiling-cassette-aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-keset-siling-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/ceiling-cassette-aircond-installation-kl", ms: "/ms/pemasangan-aircond-keset-siling-kl", zh: "/zh/ceiling-cassette-aircond-installation-kl" }) },
    { url: `${BASE}/zh/ceiling-cassette-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/ceiling-cassette-aircond-installation-kl", ms: "/ms/pemasangan-aircond-keset-siling-kl", zh: "/zh/ceiling-cassette-aircond-installation-kl" }) },
    { url: `${BASE}/window-unit-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.92, alternates: buildTrilingual({ en: "/window-unit-aircond-installation-kl", ms: "/ms/pemasangan-aircond-tingkap-kl", zh: "/zh/window-unit-aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-tingkap-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/window-unit-aircond-installation-kl", ms: "/ms/pemasangan-aircond-tingkap-kl", zh: "/zh/window-unit-aircond-installation-kl" }) },
    { url: `${BASE}/zh/window-unit-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/window-unit-aircond-installation-kl", ms: "/ms/pemasangan-aircond-tingkap-kl", zh: "/zh/window-unit-aircond-installation-kl" }) },
  ];

  const servicePages: MetadataRoute.Sitemap = siteConfig.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.92,
      alternates: buildTrilingual({ en: `/services/${s.slug}`, ms: `/ms/services/${s.slug}`, zh: `/zh/services/${s.slug}` }),
    }));
  const msServicePages: MetadataRoute.Sitemap = siteConfig.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => ({
      url: `${BASE}/ms/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.84,
      alternates: buildTrilingual({ en: `/services/${s.slug}`, ms: `/ms/services/${s.slug}`, zh: `/zh/services/${s.slug}` }),
    }));
  const zhServicePages: MetadataRoute.Sitemap = siteConfig.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => ({
      url: `${BASE}/zh/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.84,
      alternates: buildTrilingual({ en: `/services/${s.slug}`, ms: `/ms/services/${s.slug}`, zh: `/zh/services/${s.slug}` }),
    }));

  const typedAreaPages = siteConfig.areaPages as AreaPage[];

  const realAreaPages = typedAreaPages.filter(
    (a) => typeof a.lat === "number" && typeof a.lng === "number" && Array.isArray(a.landmarks) && a.landmarks.length > 0,
  );

  const areaPages: MetadataRoute.Sitemap = siteConfig.areaPages.map((area) => ({
    url: `${BASE}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.88,
    alternates: buildTrilingual({
      en: `/areas/${area.slug}`,
      ms: `/ms/areas/${area.slug}`,
      zh: `/zh/areas/${area.slug}`,
    }),
  }));
  const msAreaPages: MetadataRoute.Sitemap = typedAreaPages
    .filter((a) => a.faqsBM && a.faqsBM.length > 0)
    .map((area) => ({
      url: `${BASE}/ms/areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.80,
      alternates: buildTrilingual({
        en: `/areas/${area.slug}`,
        ms: `/ms/areas/${area.slug}`,
        zh: `/zh/areas/${area.slug}`,
      }),
    }));
  const zhAreaPages: MetadataRoute.Sitemap = typedAreaPages
    .filter((a) => a.faqsZH && a.faqsZH.length > 0)
    .map((area) => ({
      url: `${BASE}/zh/areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.80,
      alternates: buildTrilingual({
        en: `/areas/${area.slug}`,
        ms: `/ms/areas/${area.slug}`,
        zh: `/zh/areas/${area.slug}`,
      }),
    }));

  const areaInstallationPages: MetadataRoute.Sitemap = realAreaPages.map((area) => ({
    url: `${BASE}/areas/${area.slug}/installation`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.86,
    alternates: buildTrilingual({
      en: `/areas/${area.slug}/installation`,
      ms: `/ms/areas/${area.slug}/installation`,
      zh: `/zh/areas/${area.slug}/installation`,
    }),
  }));
  const msAreaInstallationPages: MetadataRoute.Sitemap = realAreaPages
    .filter((a) => a.faqsBM && a.faqsBM.length > 0)
    .map((area) => ({
      url: `${BASE}/ms/areas/${area.slug}/installation`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.78,
      alternates: buildTrilingual({
        en: `/areas/${area.slug}/installation`,
        ms: `/ms/areas/${area.slug}/installation`,
        zh: `/zh/areas/${area.slug}/installation`,
      }),
    }));
  const zhAreaInstallationPages: MetadataRoute.Sitemap = realAreaPages
    .filter((a) => a.faqsZH && a.faqsZH.length > 0)
    .map((area) => ({
      url: `${BASE}/zh/areas/${area.slug}/installation`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.78,
      alternates: buildTrilingual({
        en: `/areas/${area.slug}/installation`,
        ms: `/ms/areas/${area.slug}/installation`,
        zh: `/zh/areas/${area.slug}/installation`,
      }),
    }));

  const kampungInstallationPages: MetadataRoute.Sitemap = siteConfig.kampungPages.map((k) => ({
    url: `${BASE}/areas/${k.parentSlug}/${k.slug}/installation`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.74,
    alternates: buildTrilingual({
      en: `/areas/${k.parentSlug}/${k.slug}/installation`,
      ms: `/ms/areas/${k.parentSlug}/${k.slug}/installation`,
      zh: `/zh/areas/${k.parentSlug}/${k.slug}/installation`,
    }),
  }));
  const typedKampungPages = siteConfig.kampungPages as KampungPage[];

  const msKampungInstallationPages: MetadataRoute.Sitemap = typedKampungPages
    .filter((k) => k.descriptionMS)
    .map((k) => ({
      url: `${BASE}/ms/areas/${k.parentSlug}/${k.slug}/installation`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.68,
      alternates: buildTrilingual({
        en: `/areas/${k.parentSlug}/${k.slug}/installation`,
        ms: `/ms/areas/${k.parentSlug}/${k.slug}/installation`,
        zh: `/zh/areas/${k.parentSlug}/${k.slug}/installation`,
      }),
    }));
  const zhKampungInstallationPages: MetadataRoute.Sitemap = typedKampungPages
    .filter((k) => k.descriptionZH)
    .map((k) => ({
      url: `${BASE}/zh/areas/${k.parentSlug}/${k.slug}/installation`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.68,
      alternates: buildTrilingual({
        en: `/areas/${k.parentSlug}/${k.slug}/installation`,
        ms: `/ms/areas/${k.parentSlug}/${k.slug}/installation`,
        zh: `/zh/areas/${k.parentSlug}/${k.slug}/installation`,
      }),
    }));

  const brandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.82,
    alternates: buildTrilingual({
      en: `/brands/${b.slug}`,
      ms: `/ms/brands/${b.slug}`,
      zh: `/zh/brands/${b.slug}`,
    }),
  }));
  const msBrandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/ms/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: buildTrilingual({
      en: `/brands/${b.slug}`,
      ms: `/ms/brands/${b.slug}`,
      zh: `/zh/brands/${b.slug}`,
    }),
  }));
  const zhBrandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/zh/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: buildTrilingual({
      en: `/brands/${b.slug}`,
      ms: `/ms/brands/${b.slug}`,
      zh: `/zh/brands/${b.slug}`,
    }),
  }));

  const brandInstallationPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/brands/${b.slug}/installation`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78,
    alternates: buildTrilingual({
      en: `/brands/${b.slug}/installation`,
      ms: `/ms/brands/${b.slug}/installation`,
      zh: `/zh/brands/${b.slug}/installation`,
    }),
  }));
  const msBrandInstallationPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/ms/brands/${b.slug}/installation`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
    alternates: buildTrilingual({
      en: `/brands/${b.slug}/installation`,
      ms: `/ms/brands/${b.slug}/installation`,
      zh: `/zh/brands/${b.slug}/installation`,
    }),
  }));
  const zhBrandInstallationPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/zh/brands/${b.slug}/installation`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
    alternates: buildTrilingual({
      en: `/brands/${b.slug}/installation`,
      ms: `/ms/brands/${b.slug}/installation`,
      zh: `/zh/brands/${b.slug}/installation`,
    }),
  }));

  const brandAreaMatrix = brandAreaPairs();
  const buildBrandAreaEntries = (
    locale: "en" | "ms" | "zh",
    priority: number,
  ): MetadataRoute.Sitemap =>
    brandAreaMatrix.map(({ brand, area }) => {
      const prefix = locale === "en" ? "" : `/${locale}`;
      return {
        url: `${BASE}${prefix}/brands/${brand}/${area}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates: buildTrilingual({
          en: `/brands/${brand}/${area}`,
          ms: `/ms/brands/${brand}/${area}`,
          zh: `/zh/brands/${brand}/${area}`,
        }),
      };
    });

  const brandAreaPages = buildBrandAreaEntries("en", 0.74);
  const msBrandAreaPages = buildBrandAreaEntries("ms", 0.68);
  const zhBrandAreaPages = buildBrandAreaEntries("zh", 0.68);

  const problemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.80,
    alternates: buildTrilingual({
      en: `/problems/${p.slug}`,
      ms: `/ms/problems/${p.slug}`,
      zh: `/zh/problems/${p.slug}`,
    }),
  }));
  const msProblemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/ms/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.73,
    alternates: buildTrilingual({
      en: `/problems/${p.slug}`,
      ms: `/ms/problems/${p.slug}`,
      zh: `/zh/problems/${p.slug}`,
    }),
  }));
  const zhProblemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/zh/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.73,
    alternates: buildTrilingual({
      en: `/problems/${p.slug}`,
      ms: `/ms/problems/${p.slug}`,
      zh: `/zh/problems/${p.slug}`,
    }),
  }));

  const blogPages: MetadataRoute.Sitemap = allPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
    alternates: buildTrilingual({
      en: `/blog/${p.slug}`,
      ms: `/ms/blog/${p.slug}`,
      zh: `/zh/blog/${p.slug}`,
    }),
  }));
  const msBlogPages: MetadataRoute.Sitemap = allPosts
    .filter((p) => p.contentMS)
    .map((p) => ({
      url: `${BASE}/ms/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildTrilingual({
        en: `/blog/${p.slug}`,
        ms: `/ms/blog/${p.slug}`,
        zh: `/zh/blog/${p.slug}`,
      }),
    }));
  const zhBlogPages: MetadataRoute.Sitemap = allPosts
    .filter((p) => p.contentZH)
    .map((p) => ({
      url: `${BASE}/zh/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildTrilingual({
        en: `/blog/${p.slug}`,
        ms: `/ms/blog/${p.slug}`,
        zh: `/zh/blog/${p.slug}`,
      }),
    }));

  const kampungPages: MetadataRoute.Sitemap = siteConfig.kampungPages.map((k) => ({
    url: `${BASE}/areas/${k.parentSlug}/${k.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.70,
    alternates: buildTrilingual({
      en: `/areas/${k.parentSlug}/${k.slug}`,
      ms: `/ms/areas/${k.parentSlug}/${k.slug}`,
      zh: `/zh/areas/${k.parentSlug}/${k.slug}`,
    }),
  }));
  const msKampungPages: MetadataRoute.Sitemap = typedKampungPages
    .filter((k) => k.descriptionMS)
    .map((k) => ({
      url: `${BASE}/ms/areas/${k.parentSlug}/${k.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildTrilingual({
        en: `/areas/${k.parentSlug}/${k.slug}`,
        ms: `/ms/areas/${k.parentSlug}/${k.slug}`,
        zh: `/zh/areas/${k.parentSlug}/${k.slug}`,
      }),
    }));
  const zhKampungPages: MetadataRoute.Sitemap = typedKampungPages
    .filter((k) => k.descriptionZH)
    .map((k) => ({
      url: `${BASE}/zh/areas/${k.parentSlug}/${k.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildTrilingual({
        en: `/areas/${k.parentSlug}/${k.slug}`,
        ms: `/ms/areas/${k.parentSlug}/${k.slug}`,
        zh: `/zh/areas/${k.parentSlug}/${k.slug}`,
      }),
    }));

  return [
    ...staticPages,
    ...emergencyPage,
    ...msEmergencyPage,
    ...zhEmergencyPage,
    ...installationPages,
    ...servicePages,
    ...msServicePages,
    ...zhServicePages,
    ...areaPages,
    ...msAreaPages,
    ...zhAreaPages,
    ...areaInstallationPages,
    ...msAreaInstallationPages,
    ...zhAreaInstallationPages,
    ...kampungInstallationPages,
    ...msKampungInstallationPages,
    ...zhKampungInstallationPages,
    ...kampungPages,
    ...msKampungPages,
    ...zhKampungPages,
    ...brandPages,
    ...msBrandPages,
    ...zhBrandPages,
    ...brandInstallationPages,
    ...msBrandInstallationPages,
    ...zhBrandInstallationPages,
    ...brandAreaPages,
    ...msBrandAreaPages,
    ...zhBrandAreaPages,
    ...problemPages,
    ...msProblemPages,
    ...zhProblemPages,
    ...blogPages,
    ...msBlogPages,
    ...zhBlogPages,
  ];
}
