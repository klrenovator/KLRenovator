import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { BRAND_PROBLEM_MAP } from "@/config/topical-authority-map";
import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { buildBrandAreaComboModule } from "@/config/brand-area-combo-links";

// ─────────────────────────────────────────────────────────────────────────
// /ms/brands/[slug] — Bahasa Malaysia brand page.
// Same pattern as /ms/areas/[slug]. All 15 brands already have faqsBM
// populated in config/site.ts, so every brand gets a page (no filtering).
// ─────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return siteConfig.brandPages.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) return { title: "Halaman tidak dijumpai" };

  const enUrl = `https://www.klrenovator.com/brands/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/brands/${slug}`;

  return {
    title: brand.metaTitleMS || brand.metaTitle,
    description: brand.metaDescMS || brand.metaDesc,
    openGraph: {
      title: brand.metaTitleMS || brand.metaTitle,
      description: brand.metaDescMS || brand.metaDesc,
      url: msUrl,
      type: "website",
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
      images: [
        {
          url: `https://www.klrenovator.com${brand.heroImage || "/hero/aircond-installation-kuala-lumpur.webp"}`,
          width: 1200,
          height: 630,
          alt: `Servis Aircond ${brand.name} KL & Selangor — KL Renovator`,
        },
      ],
    },
    alternates: {
      canonical: msUrl,
      languages: {
        "en-MY": enUrl,
        "ms-MY": msUrl,
        "zh-MY": zhUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default async function BrandPageMS({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) notFound();

  const enUrl = `https://www.klrenovator.com/brands/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}`;
  const waMsg = `Hi KL Renovator, saya nak tempah servis aircond ${brand.name}.`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Servis Aircond ${brand.name}`,
    provider: { "@type": "HVACBusiness", "@id": "https://www.klrenovator.com/#business", name: siteConfig.name },
    areaServed: { "@type": "AdministrativeArea", name: "Kuala Lumpur & Selangor" },
    brand: { "@type": "Brand", name: brand.name },
    description: brand.descriptionMS || brand.description,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Laman Utama", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Jenama", item: "https://www.klrenovator.com/ms/brands" },
      { "@type": "ListItem", position: 3, name: `Aircond ${brand.name}`, item: msUrl },
    ],
  };

  const faqSchema = brand.faqsBM?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: brand.faqsBM.map((f: { q: string; a: string }) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const otherMsBrands = siteConfig.brandPages.filter((b) => b.slug !== slug).slice(0, 10);
  const brandAreaComboModule = buildBrandAreaComboModule(brand, siteConfig.areaPages, "ms");
  const brandProblemSlugsMS = BRAND_PROBLEM_MAP[slug] ?? BRAND_PROBLEM_MAP["_default"];
  const relatedProblemsMS = siteConfig.problemPages.filter((p) => brandProblemSlugsMS.includes(p.slug));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/ms" className="hover:text-sky-600 transition font-medium">Laman Utama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/ms/brands" className="hover:text-sky-600 transition font-medium">Jenama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-bold">Aircond {brand.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Servis Aircond Jenama
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg" })}>Servis Aircond </span>
              <span className={title({ size: "lg", color: "brand" })}>{brand.name}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Ya, KL Renovator menservis semua model aircond <strong>{brand.name}</strong> di KL &amp; Selangor.
              {" "}{brand.descriptionMS || brand.description}
            </p>

            {brand.models?.length > 0 && (
              <p className="mt-3 text-sm text-slate-500 font-medium">
                Model: {brand.models.join(", ")}.
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(waMsg)}
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

      {brand.highlights?.length > 0 && (
        <section className="py-10 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Kepakaran Kami Untuk {brand.name}
              </h2>
              <ul className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200 text-sm">
                {brand.highlights.map((h: string, i: number) => (
                  <li key={i} className="bg-white px-4 py-3 flex items-start gap-2">
                    <FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {brand.inverterNoteMS && (
        <section className="py-10 bg-violet-50 border-t border-violet-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-3">
                {brand.name} Inverter vs Non-Inverter
              </h2>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">{brand.inverterNoteMS}</p>
            </Reveal>
          </div>
        </section>
      )}

      {brand.troubleshootingTipsMS && brand.troubleshootingTipsMS.length > 0 && (
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Petua Menyelesaikan Masalah {brand.name}
              </h2>
              <div className="space-y-3">
                {brand.troubleshootingTipsMS.map((tip: { issue: string; tip: string }, i: number) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4">
                    <h3 className="font-black text-sm text-slate-900 mb-1.5">{tip.issue}</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{tip.tip}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {brand.galleryImages && brand.galleryImages.length > 0 && (
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Foto Kerja Sebenar {brand.name}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {brand.galleryImages.map((img: { src: string; alt: string; altMS?: string }, i: number) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <NextImage
                      src={img.src}
                      alt={img.altMS || img.alt}
                      fill
                      sizes="50vw"
                      className="object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Blok Kepercayaan: Kami Servis, Bukan Wakil Rasmi ─────────────── */}
      <section className="py-10 bg-emerald-50 border-y border-emerald-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center">
                <FiCheck className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="font-black text-sm text-slate-900 mb-1.5 uppercase tracking-wide">
                  Kami Servis {brand.name} — Kami Bukan Wakil Rasmi {brand.name}
                </h2>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  KL Renovator adalah syarikat servis HVAC bebas, bukan wakil rasmi atau pusat servis diberi kuasa oleh {brand.name}. Kami menservis, membaiki dan memasang unit {brand.name} menggunakan alat ganti asli atau setara OEM (kapasitor, papan PCB, gas, pam saliran) daripada pembekal Malaysia yang dipercayai — tidak sekali-kali alat ganti tiruan atau tidak disahkan. Jika unit {brand.name} anda masih dalam waranti pengeluar, kami akan maklumkan terlebih dahulu sama ada pembaikan mungkin menjejaskan waranti tersebut, supaya anda boleh memilih untuk pergi ke pusat servis rasmi {brand.name} sendiri jika perlu. Tugas kami adalah servis jujur dan telus — bukan menjual unit baharu yang anda tidak perlukan.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {brand.faqsBM?.length > 0 && (
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Soalan Lazim — Aircond {brand.name}
              </h2>
              <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                {brand.faqsBM.map((faq: { q: string; a: string }, i: number) => (
                  <details key={i} className="group bg-white p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                      {faq.q}
                      <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                    </summary>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Round 32 / 20D.34: Brand + Area Combo Linking Module */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              {brandAreaComboModule.eyebrow}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
              <div>
                <h2 className="speakable text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                  {brandAreaComboModule.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-3xl">
                  {brandAreaComboModule.intro}
                </p>
              </div>
              <NextLink
                href={brandAreaComboModule.allAreasHref}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-sky-700 hover:bg-sky-100 transition"
              >
                {brandAreaComboModule.allAreasLabel} <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {brandAreaComboModule.combos.map((combo) => (
                <NextLink
                  key={combo.href}
                  href={combo.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                >
                  <p className="text-[11px] font-black uppercase tracking-widest text-sky-600">{combo.eyebrow}</p>
                  <h3 className="mt-2 text-base font-black text-slate-950 group-hover:text-sky-700 transition-colors">
                    {combo.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{combo.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {combo.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-700 group-hover:gap-2 transition-all">
                    Buka halaman kawasan <FiArrowRight className="h-3 w-3" />
                  </span>
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Common Problems for This Brand — triangular cross-link (Round 10.5) */}
      {relatedProblemsMS.length > 0 && (
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
                Masalah · 问题
              </p>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Masalah Biasa {brand.name} Yang Kami Selesaikan
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedProblemsMS.map((p) => (
                  <NextLink
                    key={p.slug}
                    href={`/ms/problems/${p.slug}`}
                    className="inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 rounded-full hover:border-sky-500 hover:text-sky-600 transition"
                  >
                    {p.nameMS || p.name}
                  </NextLink>
                ))}
                <NextLink href="/ms/problems" className="inline-flex items-center gap-1 border border-sky-400 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 rounded-full hover:bg-sky-100 transition">
                  Semua Masalah →
                </NextLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
              Jenama Lain Yang Kami Servis
            </p>
            <div className="flex flex-wrap gap-2">
              {otherMsBrands.map((b) => (
                <NextLink
                  key={b.slug}
                  href={`/ms/brands/${b.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  Aircond {b.name}
                </NextLink>
              ))}
              <NextLink
                href="/brands"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
              >
                Semua Jenama <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
