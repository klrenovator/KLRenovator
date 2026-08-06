import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight, FiMapPin, FiShield, FiCpu, FiAlertCircle } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { waLink } from "@/lib/whatsapp";
import { normalizeHreflangUrls } from "@/lib/hreflang-canonical";
import { BRAND_ERROR_CODES, BRAND_TECH_SPECS } from "@/config/brand-specs";
import { brandAreaPairs } from "@/config/brand-area-priority";
import {
  brandAreaIntro,
  brandAreaLocalNote,
  brandAreaFaqs,
} from "@/config/brand-area-uniqueness";
import { serviceAnchor } from "@/config/anchor-text-diversity";

// ─────────────────────────────────────────────────────────────────────────
// ROUND 14.1 — Brand-Specific Area Page (Bahasa Malaysia)
// Route: /ms/brands/[slug]/[area]
// ─────────────────────────────────────────────────────────────────────────


// This route is backed by a finite typed content registry.
// Unknown slugs must be a real 404, never an indexable fallback page.
export const dynamicParams = false;

export function generateStaticParams() {
  // Shared with app/sitemap.ts via config/brand-area-priority.ts so the
  // generated pages and the sitemap can never drift apart again.
  return brandAreaPairs().map(({ brand, area }) => ({ slug: brand, area }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; area: string }>;
}): Promise<Metadata> {
  const { slug, area: areaSlug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  const area = siteConfig.areaPages.find((a) => a.slug === areaSlug);
  if (!brand || !area) return { title: "Page not found" };

  const titleText = `Servis Aircond ${brand.name} ${area.name} — Hari Sama KL Renovator`;
  const descText = `Pakar servis aircond ${brand.name}, cuci kimia, tambah gas & baiki di ${area.name}, Selangor. Berdaftar SSM, waranti kerja 1 bulan. Hubungi sekarang.`;

  const enUrl = `https://www.klrenovator.com/brands/${slug}/${areaSlug}`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}/${areaSlug}`;
  const zhUrl = `https://www.klrenovator.com/zh/brands/${slug}/${areaSlug}`;

  return {
    title: clampMetaTitle(titleText),
    description: clampMetaDescription(descText),
    openGraph: {
      title: clampMetaTitle(titleText),
      description: clampMetaDescription(descText),
      url: msUrl,
      type: "website",
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
    },
    alternates: normalizeHreflangUrls({
      en: enUrl,
      ms: msUrl,
      zh: zhUrl,
      // Self-canonical: this is the MS page, so it must point at itself.
      // Defaulting to the EN url made Google treat all of these as
      // "Alternate page with proper canonical tag" and drop them.
      locale: "ms",
    }),
  };
}

export default async function BrandAreaPageMS({
  params,
}: {
  params: Promise<{ slug: string; area: string }>;
}) {
  const { slug, area: areaSlug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  const area = siteConfig.areaPages.find((a) => a.slug === areaSlug);

  if (!brand || !area) notFound();

  const waMsg = `Hi KL Renovator, saya perlukan servis aircond ${brand.name} di ${area.name}. Lokasi saya:`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Servis Aircond ${brand.name} di ${area.name}`,
    provider: {
      "@type": "HVACBusiness",
      "@id": "https://www.klrenovator.com/#business",
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${area.name}, Selangor, Malaysia`,
    },
    brand: { "@type": "Brand", name: brand.name },
    description: `Servis khusus aircond ${brand.name} di ${area.name}. Termasuk cuci kimia bertekanan tinggi, overhaul kimia, penyelesaian masalah, dan pemasangan.`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Utama", item: "https://www.klrenovator.com/ms" },
      { "@type": "ListItem", position: 2, name: "Jenama", item: "https://www.klrenovator.com/ms/brands" },
      { "@type": "ListItem", position: 3, name: brand.name, item: `https://www.klrenovator.com/ms/brands/${slug}` },
      { "@type": "ListItem", position: 4, name: area.name, item: `https://www.klrenovator.com/ms/brands/${slug}/${areaSlug}` },
    ],
  };

  // Area-specific prose. These 360 pages were 98.9% token-identical to
  // each other, which Google reports as "Duplicate without user-selected
  // canonical" / "Crawled - currently not indexed".
  const areaIntro = brandAreaIntro(brand, area, "ms");
  const areaLocalNote = brandAreaLocalNote(brand, area, "ms");
  const areaFaqs = brandAreaFaqs(brand, area, "ms");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: areaFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const techSpecs = BRAND_TECH_SPECS[slug] ?? BRAND_TECH_SPECS._default;
  const errorCodes = BRAND_ERROR_CODES[slug] ?? BRAND_ERROR_CODES._default;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/ms" className="hover:text-sky-600 transition font-medium">Utama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/ms/brands" className="hover:text-sky-600 transition font-medium">Jenama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href={`/ms/brands/${slug}`} className="hover:text-sky-600 transition font-medium">{brand.name}</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-bold">{area.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 px-3 py-1 text-xs font-black uppercase tracking-widest text-sky-400 mb-4">
            <FiMapPin className="h-3.5 w-3.5" /> Kawasan Servis Tempatan
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
            Servis Aircond {brand.name} <span className="text-sky-400">{area.name}</span>
          </h1>
          <p className="mt-4 text-slate-300 font-medium text-base sm:text-lg max-w-3xl leading-relaxed">
            Perlukan servis khusus untuk unit aircond {brand.name} anda di {area.name}? Pasukan KL Renovator berdaftar dengan SSM, menawarkan dispatch pantas hari sama, waranti bertulis 1 bulan, dan sebut harga telus.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
            <a
              href={waLink(waMsg)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
            >
              <FaWhatsapp className="h-5 w-5" /> WhatsApp Sekarang
            </a>
            <NextLink
              href={`/ms/areas/${areaSlug}`}
              className="inline-flex items-center justify-center gap-1 border border-white/30 hover:bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-all rounded-xl"
            >
              Ketahui Liputan {area.name} <FiArrowRight className="h-4 w-4" />
            </NextLink>
          </div>
        </div>
      </section>

      {/* Trust & Verification Band */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center sm:justify-between gap-x-8 gap-y-2 text-xs font-black uppercase tracking-wider text-slate-600">
          <span>✓ Berdaftar SSM</span>
          <span>✓ Waranti Kerja Bertulis 1 Bulan</span>
          <span>✓ Peralatan Khusus {brand.name}</span>
        </div>
      </div>

      {/* Core Body Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-950 mb-6">
            Penyelesaian Servis Aircond {brand.name} Profesional di {area.name}
          </h2>
          <p className="text-slate-700 font-medium leading-relaxed mb-6">{areaIntro}</p>

          {/* Pricing Table */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-10">
            <h3 className="font-black text-lg text-slate-950 mb-4 uppercase">Senarai Harga Servis {brand.name} yang Telus</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { name: "Servis Asas", price: "Dari RM 99" },
                { name: "Cuci Kimia Bertekanan", price: "Dari RM 120" },
                { name: "Overhaul Kimia", price: "Dari RM 220" },
                { name: "Isi Gas R32/R410A", price: "Dari RM 3.00/PSI" },
              ].map((p) => (
                <div key={p.name} className="flex justify-between bg-white border border-slate-200 p-3.5 rounded-xl text-sm font-bold">
                  <span className="text-slate-700">{p.name}</span>
                  <span className="text-sky-600 font-black">{p.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4 italic">
              * Nota: Pengangkutan dan buruh sudah termasuk. Harga disahkan sepenuhnya sebelum kerja bermula.
            </p>
          </div>

          {/* Brand Highlights */}
          {brand.highlights?.length > 0 && (
            <div className="mb-10">
              <h3 className="font-black text-lg text-slate-900 mb-4 uppercase">Kepakaran Kami Untuk Unit {brand.name}</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {brand.highlights.map((h: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <FiCheck className="mt-1 h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specs */}
          <div className="mb-10">
            <h3 className="font-black text-lg text-slate-900 mb-4 uppercase flex items-center gap-2">
              <FiCpu className="text-sky-500" /> Spesifikasi Teknikal {brand.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techSpecs.slice(0, 4).map((ts, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{ts.specification}</div>
                  <div className="text-sm font-black text-slate-800">{ts.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Error Codes */}
          <div className="mb-10">
            <h3 className="font-black text-lg text-slate-900 mb-4 uppercase flex items-center gap-2">
              <FiAlertCircle className="text-red-500" /> Kod Ralat Biasa &amp; Maksud
            </h3>
            <div className="overflow-hidden border border-slate-200 rounded-xl">
              <div className="grid grid-cols-2 bg-slate-100 px-4 py-2.5 text-xs font-black uppercase text-slate-500">
                <span>Kod / Kelipan</span>
                <span>Maksud / Kerosakan</span>
              </div>
              {errorCodes.slice(0, 4).map((ec, i) => (
                <div key={i} className={`grid grid-cols-2 px-4 py-3 text-xs border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                  <span className="font-black text-red-600">{ec.code}</span>
                  <span className="text-slate-700 font-medium">{ec.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Local conditions — area-specific, prevents these 360 pages
              from being near-duplicates of one another */}
          <div className="mb-10">
            <h3 className="font-black text-lg text-slate-900 mb-4 uppercase flex items-center gap-2">
              <FiMapPin className="text-sky-500" /> {`Keadaan Tempatan di ${area.name}`}
            </h3>
            <p className="text-slate-700 font-medium leading-relaxed">{areaLocalNote}</p>
          </div>

          {/* Area-aware FAQ */}
          <div className="mb-10">
            <h3 className="font-black text-lg text-slate-900 mb-4 uppercase">
              {`Soalan Lazim — ${brand.name} di ${area.name}`}
            </h3>
            <div className="space-y-3">
              {areaFaqs.map((f, i) => (
                <details key={i} className="group bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <summary className="cursor-pointer list-none font-black text-sm text-slate-900 flex justify-between gap-3">
                    <span>{f.q}</span>
                    <FiChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-700 font-medium leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Independent Service Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex gap-3 items-start mb-10">
            <FiShield className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-black text-sm text-slate-900 uppercase">Notis Penyedia Servis Bebas</h4>
              <p className="text-xs text-slate-700 font-medium leading-relaxed mt-1.5">
                KL Renovator ialah syarikat HVAC bebas. Kami bukan rakan kongsi rasmi atau pengedar sah Daikin/Panasonic/{brand.name}. Kami menyediakan servis khusus menggunakan alat ganti OEM atau asli bagi menjamin kualiti kerja terbaik pada kadar harga yang berpatutan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-14 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Tempah Servis {brand.name} di {area.name} Hari Ini
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base">
            Servis profesional · Slot hari sama · Sebut harga telus &amp; jujur
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waLink(waMsg)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all rounded-xl"
            >
              <FaWhatsapp className="h-4 w-4" /> Tempah di WhatsApp
            </a>
            <NextLink
              href="/ms/brands"
              className="inline-flex items-center justify-center gap-1 border border-white/20 hover:bg-white/10 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all rounded-xl"
            >
              Kembali ke Jenama
            </NextLink>
          </div>
        </div>
      </section>
    </>
  );
}
