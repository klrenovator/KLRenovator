/**
 * Round 55 / 10.10 & 20.106 — Click-Depth Verification & Fix
 * 
 * Ensures every commercial priority page is reachable within 2-3 clicks
 * from the homepage. Adds strategic internal links where gaps exist.
 */

import { siteConfig } from "@/config/site";

export interface ClickDepthLink {
  href: string;
  label: string;
  locale?: "en" | "ms" | "zh";
}

/**
 * Returns the 3 most important commercial landing pages that should be
 * reachable within 2 clicks from homepage.
 */
export function getPriorityCommercialLinks(locale: "en" | "ms" | "zh" = "en"): ClickDepthLink[] {
  const prefix = locale === "ms" ? "/ms" : locale === "zh" ? "/zh" : "";
  
  return [
    {
      href: `${prefix}/cuci-aircond-kl`,
      label: locale === "ms" ? "Cuci Aircond KL" : locale === "zh" ? "吉隆坡冷气清洗" : "Cuci Aircond KL",
    },
    {
      href: `${prefix}/installation-price-malaysia`,
      label: locale === "ms" ? "Harga Pasang Aircond" : locale === "zh" ? "冷气安装价格" : "Aircond Installation Price Malaysia",
    },
    {
      href: `${prefix}/aircond-service-price-malaysia`,
      label: locale === "ms" ? "Harga Servis Aircond 2026" : locale === "zh" ? "冷气服务价格 2026" : "Aircond Service Price Malaysia 2026",
    },
  ];
}

/**
 * Returns quick navigation links for the homepage / near-me / services index
 * to improve click depth for commercial pages.
 */
export function getQuickNavLinks(locale: "en" | "ms" | "zh" = "en"): ClickDepthLink[] {
  const prefix = locale === "ms" ? "/ms" : locale === "zh" ? "/zh" : "";
  
  return [
    ...getPriorityCommercialLinks(locale),
    {
      href: `${prefix}/services`,
      label: locale === "ms" ? "Senarai Servis" : locale === "zh" ? "服务列表" : "All Services",
    },
    {
      href: `${prefix}/brands`,
      label: locale === "ms" ? "Semua Brand" : locale === "zh" ? "所有品牌" : "All Brands",
    },
    {
      href: `${prefix}/areas`,
      label: locale === "ms" ? "Kawasan Kami" : locale === "zh" ? "服务区域" : "Our Areas",
    },
  ];
}

/**
 * Component helper: returns a compact "Quick Links" block
 * that can be dropped into homepage, near-me, or service indexes.
 */
export function buildQuickCommercialLinks(locale: "en" | "ms" | "zh" = "en") {
  return getPriorityCommercialLinks(locale).map((link) => ({
    ...link,
    description: locale === "ms" 
      ? "Harga telus & booking cepat" 
      : locale === "zh" 
      ? "透明价格 · 快速预约" 
      : "Transparent pricing · Same-day booking",
  }));
}
