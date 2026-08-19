import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight, FiMapPin } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import {
  resolveLandmarkLink,
  getAreaNeighbourhoodLinks,
  getRelatedNeighbourhoodLinks,
} from "@/config/area-internal-links";
import { allPosts } from "@/config/blog-posts";
import { AREA_BLOG_MAP, AREA_PROBLEM_MAP } from "@/config/topical-authority-map";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { buildServiceAreaGeoCircle } from "@/lib/seo";
import { getFreshDateMS } from "@/lib/dates";
import { buildUniqueAreaFAQ_MS } from "@/config/area-faq-uniqueness";
import { clampMetaTitle, buildAreaMetaTitleWithDate } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { pickHeroImage } from "@/lib/og-image-pool";
import { reviewDateFor } from "@/config/content-review-dates";

// ─────────────────────────────────────────────────────────────────────────
// /ms/areas/[slug] — Bahasa Malaysia area page.
//
// PILOT TEMPLATE for the multilingual routing system (built 19 June 2026).
// This is the pattern to copy for: /ms/brands/[slug], /ms/problems/[slug],
// /ms/blog/[slug], and the new kampung pages once their data is ready.
//
// IMPORTANT: only areas with `faqsBM` populated in config/site.ts are
// included in generateStaticParams below. As more areas get their faqsBM
// written (see KLRenovator-PROJECT-STATUS-HANDOFF.md — 27 of 38 still
// missing this as of 19 June 2026), they will automatically appear here
// with zero extra code changes. Do NOT publish an /ms/ area page for an
// area that doesn't have real translated FAQ content yet — that would be
// a thin/low-value page.
// ─────────────────────────────────────────────────────────────────────────

// This route is backed by a finite typed content registry.
// Unknown slugs must be a real 404, never an indexable fallback page.
export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.areaPages
    .filter((a) => a.faqsBM && a.faqsBM.length > 0)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = siteConfig.areaPages.find((a) => a.slug === slug);
  if (!area || !area.faqsBM?.length) return { title: "Halaman tidak dijumpai" };

  const freshDate = getFreshDateMS();
  const rawTitle = area.metaTitleMS || area.metaTitle;
  const metaTitle = clampMetaTitle(buildAreaMetaTitleWithDate(rawTitle, freshDate));

  const enUrl = `https://www.klrenovator.com/areas/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/areas/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/areas/${slug}`;
  const hasZh = area.faqsZH?.length > 0;

  return {
    title: metaTitle,
    description: clampMetaDescription(area.metaDescMS || area.metaDesc),
    openGraph: {
      title: area.metaTitleMS || area.metaTitle,
      description: clampMetaDescription(area.metaDescMS || area.metaDesc),
      url: msUrl,
      type: "website",
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
      images: [{
        url: area.heroImage || pickHeroImage(`area-${area.slug}`, [area.slug]),
        width: 1200,
        height: 630,
        alt: `Servis aircond di ${area.name}, ${area.state} — KL Renovator`,
      }],
    },
    alternates: {
      canonical: msUrl,
      languages: {
        "en-MY": enUrl,
        "ms-MY": msUrl,
        ...(hasZh ? { "zh-MY": zhUrl } : {}),
        "x-default": enUrl,
      },
    },
  };
}

export default async function AreaPageMS({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = siteConfig.areaPages.find((a) => a.slug === slug);
  if (!area || !area.faqsBM?.length) notFound();

  const enUrl = `https://www.klrenovator.com/areas/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/areas/${slug}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: siteConfig.name,
    legalName: siteConfig.parentCompany,
    url: msUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: area.descriptionMS || area.description,
    image: `https://www.klrenovator.com${pickHeroImage(`area:${slug}`, [slug])}`,
    logo: "https://www.klrenovator.com/logo/image.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: area.name,
      addressRegion: area.state,
      addressCountry: "MY",
    },
    geo: { "@type": "GeoCoordinates", latitude: area.lat, longitude: area.lng },
    // Only THIS area's footprint belongs on the area landing page. The
    // sitewide entity in the root layout already declares the full Klang
    // Valley footprint — inlining all 40 areas' geo here added ~10 KB (x2
    // with the RSC flight payload) to every single area page.
    areaServed: [
      {
        "@type": "City",
        name: area.name,
        containedInPlace: { "@type": "State", name: area.state || "Selangor" },
        geo: { "@type": "GeoCoordinates", latitude: area.lat, longitude: area.lng },
        url: `https://www.klrenovator.com/ms/areas/${slug}`,
      },
      buildServiceAreaGeoCircle(),
    ],
    priceRange: "RM 88 – RM 2,000",
    currenciesAccepted: "MYR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `https://www.klrenovator.com/areas/${slug}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Laman Utama", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Kawasan Servis", item: "https://www.klrenovator.com/ms/areas" },
      { "@type": "ListItem", position: 3, name: `Servis Aircond ${area.name}`, item: msUrl },
    ],
  };

  // 9.10 Schema Uniqueness Pass — unique FAQ schema per area with landmark-aware Near Me variants
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: buildUniqueAreaFAQ_MS(area),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${msUrl}#webpage`,
    name: `Servis Aircond ${area.name} — KL Renovator`,
    description: clampMetaDescription(area.metaDescMS || area.metaDesc),
    url: msUrl,
    inLanguage: "ms-MY",
    dateModified: reviewDateFor("areas"),
  };

  const otherMsAreas = siteConfig.areaPages
    .filter((a) => a.slug !== slug && a.faqsBM?.length > 0)
    .slice(0, 10);
  const areaBlogPosts = allPosts
    .filter((p) => (AREA_BLOG_MAP[slug] ?? AREA_BLOG_MAP["_default"] ?? []).includes(p.slug))
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/ms" className="hover:text-sky-600 transition font-medium">Laman Utama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/ms/areas" className="hover:text-sky-600 transition font-medium">Kawasan Servis</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-bold">Servis Aircond {area.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero — direct-answer opening for AEO/GEO */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Servis Aircond · {area.state}
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg" })}>Servis Aircond </span>
              <span className={title({ size: "lg", color: "brand" })}>{area.name}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Ya, KL Renovator menyediakan servis aircond penuh di <strong>{area.name}, {area.state}</strong>.
              {" "}{area.descriptionMS || area.description}
            </p>

            {area.landmarks?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {area.landmarks.map((lm) => {
                  const resolved = resolveLandmarkLink(lm, slug, "ms");
                  if (resolved) {
                    return (
                      <NextLink
                        key={lm}
                        href={resolved.href}
                        className="text-xs font-bold bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-200 hover:bg-sky-100 transition"
                      >
                        {lm}
                      </NextLink>
                    );
                  }
                  return (
                    <span
                      key={lm}
                      className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200"
                    >
                      {lm}
                    </span>
                  );
                })}
              </div>
            )}

            {(() => {
              const neighbourhoods = getAreaNeighbourhoodLinks(slug, "ms");
              const related = neighbourhoods.length >= 4 ? [] : getRelatedNeighbourhoodLinks(slug, "ms", 8);
              const links = neighbourhoods.length > 0 ? neighbourhoods : related;
              if (links.length === 0) return null;
              return (
              <div className="mt-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                  {neighbourhoods.length > 0 ? "Panduan Kawasan Kejiranan" : "Panduan Kejiranan Berhampiran"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {links.map((k) => (
                      <NextLink
                        key={`${k.parentSlug}-${k.slug}`}
                        href={k.href}
                        className="inline-flex items-center gap-1 text-xs font-black text-sky-600 hover:text-sky-800 underline"
                      >
                        {k.label}
                      </NextLink>
                    ))}
                </div>
              </div>
              );
            })()}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(`Hi KL Renovator, saya nak tempah servis aircond di ${area.name}.`)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp Sekarang
              </a>
              <NextLink
                href={enUrl}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 px-7 py-3.5 text-sm font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 transition-all rounded-xl"
              >
                Read in English <FiArrowRight className="h-3.5 w-3.5" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Near Me — BM */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">
              Servis Aircond Berhampiran Saya di {area.name} — Tempahan Hari Sama
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Jika anda mencari &quot;servis aircond berhampiran saya&quot; dan sampai ke halaman ini, anda berada di tempat yang betul. KL Renovator menghantar juruteknik terlatih ke {area.name} dan kawasan kejiranan sekitar setiap hari. Kami menangani segala-galanya dari servis asas dan cuci kimia hingga pembaikan kecemasan dan tambah gas — semua dengan harga telus dan jaminan kerjatangan 1 bulan. WhatsApp kami sekarang dan kami akan sahkan slot anda dalam beberapa minit.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">servis aircond berhampiran saya {area.name}</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">baiki aircond hari sama berdekatan</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">juruteknik aircond terbaik berhampiran</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">cuci kimia aircond berdekatan</span>
            </div>
          </Reveal>
        </div>
      </section>

      
      <section className="py-14 bg-red-50 border-y border-red-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-1">Diagnosis · Troubleshooting · 故障排除</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 speakable">
              Aircond Tak Sejuk di {area.name}? Ini Yang Perlu Semak
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-3xl mb-6">
              &quot;Aircond tak sejuk di {area.name}&quot; adalah antara carian paling biasa dari kawasan ini. Jika aircond anda berjalan tetapi tidak sejuk, ini punca utama yang juruteknik KL Renovator temui setiap hari di {area.name} dan Lembah Klang:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { problem: "Gegelung Penyejat Kotor", en: "Dirty Evaporator Coil", zh: "蒸发器盘管脏污", desc: `Punca #1 di ${area.name}. Kelembapan dan habuk KL menyumbat sirip gegelung, mengurangkan aliran udara 30–50%. Baiki: cuci kimia tekanan dari RM 120.`, fix: "Cuci Kimia", price: "RM 120" },
                { problem: "Gas Penyejuk Rendah", en: "Low Refrigerant Gas", zh: "冷媒不足", desc: "Jika unit berjalan tetapi hembus angin panas, gas mungkin rendah. Ini bermakna ada kebocoran — tambah gas sahaja tanpa mencari kebocoran membazir wang. Baiki: semak bocor + tambah gas dari RM 2.50/PSI.", fix: "Tambah Gas", price: "Dari RM 2.50/PSI" },
                { problem: "Paip Longkang Tersumbat", en: "Blocked Drain Pipe", zh: "排水管堵塞", desc: `Biasa di ${area.name} semasa musim monsun. Biofilm menyumbat saliran, menyebabkan bocor air dan pembentukan ais. Baiki: bilas longkang termasuk dalam servis asas dari RM 99.`, fix: "Servis Asas", price: "RM 99" },
                { problem: "Pemampat Tidak Berfungsi", en: "Compressor Not Running", zh: "压缩机不运转", desc: "Jika kipas dalam berjalan tetapi unit luar senyap, pemampat atau kapasitor mungkin rosak. Perlu diagnosis di lokasi. Baiki: pembaikan dari RM 150 + alat ganti.", fix: "Pembaikan", price: "RM 150+" },
                { problem: "Termostat Tidak Tepat", en: "Thermostat Miscalibrated", zh: "温控器校准偏差", desc: "Unit fikir bilik lebih sejuk dari sebenar, jadi ia mati terlalu awal. Biasa pada unit bukan inverter lama. Baiki: kalibrasi semula termostat semasa servis.", fix: "Servis Asas", price: "RM 99" },
                { problem: "HP Tidak Sesuai Saiz Bilik", en: "Wrong HP for Room Size", zh: "HP与房间大小不匹配", desc: `Unit 1.0 HP dalam bilik utama besar tidak akan sejuk dengan betul dalam cuaca 33°C ${area.name}. Jika baru pindah, semak sama ada pemilik sebelumnya guna HP terlalu kecil.`, fix: "Perundingan", price: "Percuma" },
              ].map((item) => (
                <div key={item.problem} className="bg-white border border-red-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-slate-900 text-sm">{item.problem}</h3>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{item.price}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold mb-2">{item.en} · {item.zh}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <BookingButton serviceName={`Diagnosis Aircond ${area.name}`} size="md" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Geographic Coverage — BM */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">
              Baiki & Servis Aircond Lembah Klang — Liputan KL & Selangor
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {area.name} terletak dalam koridor Lembah Klang yang lebih besar, dan rangkaian servis KL Renovator meliputi keseluruhan stretch dari pusat bandar Kuala Lumpur hingga ke setiap suburb Selangor. Sama ada anda memerlukan servis aircond rutin di Kuala Lumpur, baiki aircond kecemasan di Lembah Klang, atau overhaul kimia penuh di Selangor, juruteknik kami sudah berkerja di kawasan anda hari ini. Kami membawa alat ganti biasa, gas penyejuk, dan bahan kimia pembersihan dalam setiap van — jadi kebanyakan kerja diselesaikan dalam satu lawatan.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white border border-slate-200 rounded-xl p-3">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Servis Aircond Kuala Lumpur</h3>
                <p className="text-xs text-slate-500">Liputan penuh KL termasuk {area.name} dan semua kawasan kejiranan bersebelahan. Slot hari sama tersedia.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Baiki Aircond Lembah Klang</h3>
                <p className="text-xs text-slate-500">Penghantaran pembaikan kecemasan merentasi seluruh kawasan metropolitan Lembah Klang. Respons 30–60 minit.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Servis Aircond Selangor</h3>
                <p className="text-xs text-slate-500">Semua daerah Selangor diliputi termasuk Petaling, Gombak, Hulu Langat, Klang, dan Sepang.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick pricing facts — fact-dense block for AI Overviews / GEO */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">
              Harga Servis Aircond di {area.name}
            </h2>
            <ul className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200 text-sm">
              <li className="bg-white px-4 py-3 flex items-start gap-2"><FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" /><span><strong>Servis Asas:</strong> dari RM 99</span></li>
              <li className="bg-white px-4 py-3 flex items-start gap-2"><FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" /><span><strong>Cuci Kimia:</strong> dari RM 120</span></li>
              <li className="bg-white px-4 py-3 flex items-start gap-2"><FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" /><span><strong>Overhaul Kimia:</strong> dari RM 220</span></li>
              <li className="bg-white px-4 py-3 flex items-start gap-2"><FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" /><span><strong>Tambah Gas:</strong> dari RM 2.50/PSI</span></li>
            </ul>
            <p className="mt-4 text-xs text-slate-500 font-medium">
              Yuran diagnostik RM 88 dikreditkan sepenuhnya ke dalam bil pembaikan jika anda teruskan servis pada lawatan yang sama. Waranti kerja 30 hari untuk semua kerja.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contextual Guides — in-body blog links for area pages */}
      {areaBlogPosts.length > 0 && (
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
                Sebelum Tempah
              </p>
              <h2 className="text-base font-black text-slate-900 mb-3">
                Panduan aircond yang pelanggan di {area.name} selalu baca sebelum tempah
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ramai pelanggan di {area.name} membaca panduan ini dahulu sebelum WhatsApp kami untuk sebut harga, terutama bila mereka sedang membandingkan repair, cuci kimia, jadual servis, atau kos pemasangan.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {areaBlogPosts.map((post) => (
                  <NextLink
                    key={post.slug}
                    href={`/ms/blog/${post.slug}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-400 hover:bg-white hover:shadow-sm"
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{post.categoryMS}</p>
                    <h3 className="text-sm font-black text-slate-900 leading-snug">{post.titleMS}</h3>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-3">{post.excerptMS}</p>
                  </NextLink>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-base font-black text-slate-900 mb-4">
              Soalan Lazim — Servis Aircond {area.name}
            </h2>
            <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
              {area.faqsBM.map((faq: { q: string; a: string }, i: number) => (
                <details key={i} className="group bg-white p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    {faq?.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq?.a}</p>
                </details>
              ))}
            </div>
          </Reveal>

          {/* Near Me FAQs — BM */}
          <Reveal>
            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">📍 Berhampiran Saya</p>
              <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                <details className="group bg-white p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    Adakah servis aircond berhampiran saya di {area.name}?
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Ya — KL Renovator menyediakan servis aircond hari sama berhampiran anda di {area.name}. WhatsApp +60182983573 dengan alamat anda dan kami akan hantar juruteknik terdekat. Kebanyakan temujanji di {area.name} disahkan dalam 30 minit.
                  </p>
                </details>
                <details className="group bg-white p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    Siapa juruteknik baiki aircond terbaik berhampiran saya di {area.name}?
                  <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Juruteknik terlatih KL Renovator mendapat penarafan tinggi di {area.name} dan Lembah Klang. Dengan 500+ ulasan bintang 5, harga telus, dan jaminan kerjatangan 1 bulan, kami adalah pilihan dipercayai untuk baiki dan servis aircond berhampiran anda.
                  </p>
                </details>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
              Jenama Aircond · 品牌
            </p>
            <h2 className="text-base font-black text-slate-900 mb-4">
              Semua Jenama Aircond Yang Kami Servis di {area.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {siteConfig.brandPages.map((brand) => (
                <NextLink
                  key={brand.slug}
                  href={`/ms/brands/${brand.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  Aircond {brand.name} {area.name}
                  <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      
      {(() => {
        const specificSlugs = AREA_PROBLEM_MAP[slug] ?? AREA_PROBLEM_MAP["_default"];
        const relatedProblems = siteConfig.problemPages.filter((p) => specificSlugs.includes(p.slug));
        if (relatedProblems.length === 0) return null;
        return (
          <section className="py-10 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">
                  Masalah · 问题
                </p>
                <h2 className="text-base font-black text-slate-900 mb-4">
                  Masalah Aircond Biasa Yang Kami Selesaikan di {area.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {relatedProblems.map((p) => (
                    <NextLink
                      key={p.slug}
                      href={`/ms/problems/${p.slug}`}
                      className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 hover:border-red-300 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition rounded-xl"
                    >
                      <FiArrowRight className="h-3 w-3 text-red-400 shrink-0" />
                      {p.nameMS || p.name}
                    </NextLink>
                  ))}
                  <NextLink
                    href="/ms/problems"
                    className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-black text-red-700 hover:bg-red-100 transition rounded-xl"
                  >
                    Semua Masalah <FiArrowRight className="h-3 w-3" />
                  </NextLink>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* Gallery + Near Me + Neighbourhood Links — orphan-link fix */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Bukti + Liputan
            </p>
            <h2 className="text-base font-black text-slate-900 mb-6">
              Lihat hasil kerja sebenar dan semak liputan berhampiran {area.name}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Link to this area's own installation page — those pages had
                  zero inbound internal links (sitemap-only). */}
              <NextLink
                data-testid="area-installation-cta"
                href={`/ms/areas/${slug}/installation`}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Servis pemasangan</p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  Pemasangan Aircond di {area.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600 font-medium">
                  Pemasangan unit baharu — pentauliahan vacuum pump, paip tembaga Type-L dan waranti kerja 1 bulan. Dari RM 199.
                </p>
              </NextLink>
              <NextLink
                href="/ms/gallery"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Galeri Sebelum & Selepas</p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  Lihat foto kerja sebenar KL Renovator sebelum membuat tempahan
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Semak foto sebenar cuci kimia, overhaul, pemasangan dan pembaikan dari rumah, kondominium, pejabat dan lot kedai sekitar KL &amp; Selangor.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  Buka Galeri <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>

              <NextLink
                href="/ms/near-me"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Servis Berdekatan · Kawasan Sekitar</p>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  Perlukan servis aircond pantas di {area.name} atau kawasan berdekatan?
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Gunakan halaman Near Me kami untuk menyemak liputan kawasan berdekatan dan meminta slot WhatsApp paling cepat.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                  Buka Halaman Near Me <FiArrowRight className="h-3 w-3" />
                </span>
              </NextLink>
            </div>

            {(() => {
              const neighbourhoods = getAreaNeighbourhoodLinks(slug, "ms");
              const related = neighbourhoods.length >= 4 ? [] : getRelatedNeighbourhoodLinks(slug, "ms", 10);
              const links = neighbourhoods.length > 0 ? neighbourhoods : related;
              if (links.length === 0) return null;
              return (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                  {neighbourhoods.length > 0 ? `Kawasan Kejiranan di ${area.name}` : `Kejiranan berhampiran ${area.name}`}
                </p>
                <h3 className="text-base font-black text-slate-900">
                  {neighbourhoods.length > 0
                    ? `Halaman kawasan kecil di bawah ${area.name}`
                    : `Halaman komuniti berhampiran ${area.name}`}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Halaman kejiranan ini membantu pelanggan di komuniti yang lebih kecil mencari servis aircond yang paling relevan dengan lebih cepat.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {links.map((k) => (
                      <NextLink
                        key={`${k.parentSlug}-${k.slug}`}
                        href={k.href}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
                      >
                        {k.label}
                        <FiArrowRight className="h-3 w-3 text-sky-400" />
                      </NextLink>
                    ))}
                </div>
              </div>
              );
            })()}
          </Reveal>
        </div>
      </section>

      {/* Other MS area pages — internal linking, avoids orphan pages */}
      {otherMsAreas.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                Kawasan Lain Yang Kami Liputi
              </p>
              <div className="flex flex-wrap gap-2">
                {otherMsAreas.map((a) => (
                  <NextLink
                    key={a.slug}
                    href={`/ms/areas/${a.slug}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                  >
                    <FiMapPin className="h-3 w-3 text-sky-400 shrink-0" />
                    Servis Aircond {a.name}
                  </NextLink>
                ))}
                <NextLink
                  href="/ms/areas"
                  className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
                >
                  Semua Kawasan <FiArrowRight className="h-3 w-3" />
                </NextLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
