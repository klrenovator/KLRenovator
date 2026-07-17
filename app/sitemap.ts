import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";

const BASE = "https://www.klrenovator.com";

// Round 14 / 20B.13 sitemap hygiene: keep <lastmod> stable and tied to
// the latest content deployment instead of changing on every build.
// Round 23 / 20F.50 — updated 2026-07-07 for Cuci Aircond KL landing launch.
// Round 70 / INS-08 + INS-09 — updated 2026-07-15 for per-HP and per-type installation pages.
const SITEMAP_LAST_MODIFIED = new Date("2026-07-17T00:00:00.000Z");

// ─────────────────────────────────────────────────────────────────────────
// MULTILINGUAL ROUTING — audited 2026-07-06 (Round 14 / 20B.13):
//   - English = default locale, lives at the ROOT path (no /en/ prefix).
//   - Bahasa Malaysia = /ms/* where real pages exist.
//   - Mandarin        = /zh/* where real pages exist.
//   - Service indexes + service detail pages, blog indexes + blog posts,
//     contact, FAQ, about, gallery, areas, brands, problems and kampung
//     pages expose real trilingual URL entries with hreflang alternates.
//   - Internal noindex conversion-only review pages are intentionally
//     EXCLUDED from the sitemap to prevent sitemap/noindex conflict.
//
// RULE: only add /ms/ or /zh/ URLs here once the matching real page exists.
// This keeps the sitemap free of dead URLs and crawl-budget waste.
// ─────────────────────────────────────────────────────────────────────────

const buildCanonicalOnly = (path: string) => ({
  canonical: `${BASE}${path}`,
  languages: {
    "en-MY": `${BASE}${path}`,
  },
});

// For URL families that exist in all 3 languages at the same depth
// (areas, brands, problems, and their kampung children), this builds the
// real per-language alternates map so the sitemap itself — not just each
// page's own <head> tags — tells Google which URLs are translations of
// each other.
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

  // ── Static / Index Pages — only URLs with real route files are listed.
  // Review pages are noindex conversion-only routes, so they are excluded.
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: buildCanonicalOnly("") },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/ms/services`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/zh/services`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildCanonicalOnly("/areas") },
    { url: `${BASE}/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildCanonicalOnly("/brands") },
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
    // ── 20F.50 Cuci Aircond KL dedicated landing — trilingual ──────────
    { url: `${BASE}/cuci-aircond-kl`, lastModified: now, changeFrequency: "weekly", priority: 0.96, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    { url: `${BASE}/ms/cuci-aircond-kl`, lastModified: now, changeFrequency: "weekly", priority: 0.95, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    { url: `${BASE}/zh/cuci-aircond-kl`, lastModified: now, changeFrequency: "weekly", priority: 0.90, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    // Round 25 / 20F.53: Installation Price Malaysia dedicated trilingual landing
    { url: `${BASE}/installation-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.94, alternates: buildTrilingual({ en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" }) },
    { url: `${BASE}/ms/installation-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" }) },
    { url: `${BASE}/zh/installation-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" }) },
    // Round 50 / 20G.77: Harga Servis Aircond 2026 Malay Pricing Guide landing — trilingual
    { url: `${BASE}/aircond-service-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.95, alternates: buildTrilingual({ en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" }) },
    { url: `${BASE}/ms/aircond-service-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.96, alternates: buildTrilingual({ en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" }) },
    { url: `${BASE}/zh/aircond-service-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" }) },
    // Round 77 / INS-19: BTU Calculator — trilingual interactive tool
    { url: `${BASE}/btu-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/btu-calculator", ms: "/ms/btu-calculator", zh: "/zh/btu-calculator" }) },
    { url: `${BASE}/ms/btu-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/btu-calculator", ms: "/ms/btu-calculator", zh: "/zh/btu-calculator" }) },
    { url: `${BASE}/zh/btu-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/btu-calculator", ms: "/ms/btu-calculator", zh: "/zh/btu-calculator" }) },
  ];

  // ── Emergency Service Page — trilingual canonical entries ───────────
  const emergencyPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/services/emergency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.97,
      alternates: buildTrilingual({ en: "/services/emergency", ms: "/ms/services/emergency", zh: "/zh/services/emergency" }),
    },
  ];

  const msEmergencyPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/ms/services/emergency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.90,
      alternates: buildTrilingual({ en: "/services/emergency", ms: "/ms/services/emergency", zh: "/zh/services/emergency" }),
    },
  ];

  const zhEmergencyPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/zh/services/emergency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.90,
      alternates: buildTrilingual({ en: "/services/emergency", ms: "/ms/services/emergency", zh: "/zh/services/emergency" }),
    },
  ];

  // ── Installation Landing Pages — EN/MS/ZH canonical entries ─────────
  const installationPages: MetadataRoute.Sitemap = [
    // Main installation pillar
    { url: `${BASE}/aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.96, alternates: buildTrilingual({ en: "/aircond-installation-kl", ms: "/ms/pemasangan-aircond-kl", zh: "/zh/aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/aircond-installation-kl", ms: "/ms/pemasangan-aircond-kl", zh: "/zh/aircond-installation-kl" }) },
    { url: `${BASE}/zh/aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/aircond-installation-kl", ms: "/ms/pemasangan-aircond-kl", zh: "/zh/aircond-installation-kl" }) },
    // Sub-pillar: new home / whole house / commercial
    { url: `${BASE}/new-home-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/new-home-aircond-installation", ms: "/ms/pemasangan-aircond-rumah-baru", zh: "/zh/new-home-aircond-installation" }) },
    { url: `${BASE}/ms/pemasangan-aircond-rumah-baru`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/new-home-aircond-installation", ms: "/ms/pemasangan-aircond-rumah-baru", zh: "/zh/new-home-aircond-installation" }) },
    { url: `${BASE}/zh/new-home-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.87, alternates: buildTrilingual({ en: "/new-home-aircond-installation", ms: "/ms/pemasangan-aircond-rumah-baru", zh: "/zh/new-home-aircond-installation" }) },
    { url: `${BASE}/whole-house-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/whole-house-aircond-installation", ms: "/ms/pemasangan-aircond-seluruh-rumah", zh: "/zh/whole-house-aircond-installation" }) },
    { url: `${BASE}/ms/pemasangan-aircond-seluruh-rumah`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/whole-house-aircond-installation", ms: "/ms/pemasangan-aircond-seluruh-rumah", zh: "/zh/whole-house-aircond-installation" }) },
    { url: `${BASE}/zh/whole-house-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.87, alternates: buildTrilingual({ en: "/whole-house-aircond-installation", ms: "/ms/pemasangan-aircond-seluruh-rumah", zh: "/zh/whole-house-aircond-installation" }) },
    { url: `${BASE}/commercial-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/commercial-aircond-installation", ms: "/ms/pemasangan-aircond-komersial", zh: "/zh/commercial-aircond-installation" }) },
    { url: `${BASE}/ms/pemasangan-aircond-komersial`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/commercial-aircond-installation", ms: "/ms/pemasangan-aircond-komersial", zh: "/zh/commercial-aircond-installation" }) },
    { url: `${BASE}/zh/commercial-aircond-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.87, alternates: buildTrilingual({ en: "/commercial-aircond-installation", ms: "/ms/pemasangan-aircond-komersial", zh: "/zh/commercial-aircond-installation" }) },
    // INS-08: per-HP pages
    { url: `${BASE}/1hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.92, alternates: buildTrilingual({ en: "/1hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1hp-kl", zh: "/zh/1hp-aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-1hp-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/1hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1hp-kl", zh: "/zh/1hp-aircond-installation-kl" }) },
    { url: `${BASE}/zh/1hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/1hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1hp-kl", zh: "/zh/1hp-aircond-installation-kl" }) },
    { url: `${BASE}/1.5hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.92, alternates: buildTrilingual({ en: "/1.5hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1.5hp-kl", zh: "/zh/1.5hp-aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-1.5hp-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/1.5hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1.5hp-kl", zh: "/zh/1.5hp-aircond-installation-kl" }) },
    { url: `${BASE}/zh/1.5hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/1.5hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-1.5hp-kl", zh: "/zh/1.5hp-aircond-installation-kl" }) },
    { url: `${BASE}/2hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.92, alternates: buildTrilingual({ en: "/2hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-2hp-kl", zh: "/zh/2hp-aircond-installation-kl" }) },
    { url: `${BASE}/ms/pemasangan-aircond-2hp-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/2hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-2hp-kl", zh: "/zh/2hp-aircond-installation-kl" }) },
    { url: `${BASE}/zh/2hp-aircond-installation-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/2hp-aircond-installation-kl", ms: "/ms/pemasangan-aircond-2hp-kl", zh: "/zh/2hp-aircond-installation-kl" }) },
    // INS-09: per-type pages
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

  // ── Service Detail Pages — EN/MS/ZH canonical entries ───────────────
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

  // Only genuine geographic areas (not brand entries mistakenly placed in areaPages)
  const realAreaPages = siteConfig.areaPages.filter(
    (a) => typeof a.lat === "number" && typeof a.lng === "number" && Array.isArray(a.landmarks) && a.landmarks.length > 0,
  );

  // ── Area Pages — all configured areas with real /ms/ and /zh/ twins ──
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

  const msAreaPages: MetadataRoute.Sitemap = siteConfig.areaPages
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

  const zhAreaPages: MetadataRoute.Sitemap = siteConfig.areaPages
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

  // ── Area Installation Pages (INS-10) — per-area installation landing pages
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

  // ── Kampung Installation Pages (INS-10 Part 2) — neighbourhood-level installation landings
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

  const msKampungInstallationPages: MetadataRoute.Sitemap = siteConfig.kampungPages
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

  const zhKampungInstallationPages: MetadataRoute.Sitemap = siteConfig.kampungPages
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

  // ── Brand Pages — all configured brands with real /ms/ and /zh/ twins
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

  // ── Brand Installation Pages (INS-11) — per-brand installation landing pages
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

  // ── Problem Pages — all configured problems with real /ms/ and /zh/ twins
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

  // ── Blog Post Pages — all configured posts with real /ms/blog and /zh/blog
  // twins where contentMS/contentZH exists in config/blog-posts.ts.
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

  // ── Kampung/Neighbourhood Pages — nested under their parent area, with
  // real /ms/ and /zh/ twins wherever descriptionMS/descriptionZH exists.
  // New batches need zero changes here — they appear automatically the
  // moment they're added to config/site.ts.
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
  const msKampungPages: MetadataRoute.Sitemap = siteConfig.kampungPages
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
  const zhKampungPages: MetadataRoute.Sitemap = siteConfig.kampungPages
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
    ...problemPages,
    ...msProblemPages,
    ...zhProblemPages,
    ...blogPages,
    ...msBlogPages,
    ...zhBlogPages,
  ];
}
