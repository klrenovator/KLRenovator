import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import Image from "next/image";
import NextLink from "next/link";
import { FiArrowRight, FiAlertTriangle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { PROBLEM_ENTITY_HUBS } from "@/config/problem-entity-hubs";

export const metadata: Metadata = {
  title: clampMetaTitle("Panduan Masalah Aircond KL & Selangor | KL Renovator"),
  description:
    padMetaDescription("Panduan lengkap masalah aircond di KL & Selangor — tak sejuk, bocor air, bising, berbau & lagi. Diagnosis & baiki. WhatsApp +60182983573."),
  openGraph: {
    title: clampMetaTitle("Panduan Masalah Aircond KL & Selangor | KL Renovator"),
    description:
      "Panduan lengkap masalah aircond di KL & Selangor. Semua kerosakan biasa didiagnosis dan dibaiki. Servis hari sama. WhatsApp +60182983573.",
    url: "https://www.klrenovator.com/ms/problems",
    type: "website",
    images: [
      {
        url: "https://www.klrenovator.com/hero/midea-aircond-gas-topup-r32-puchong-39.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator Masalah Aircond Andas Guide — KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Panduan Masalah Aircond KL & Selangor | KL Renovator"),
    description: "Panduan masalah aircond — tak sejuk, bocor air, bising, berbau, lampu berkelip. Servis hari sama.",
    images: ["https://www.klrenovator.com/hero/midea-aircond-gas-topup-r32-puchong-39.webp"],
  },
  alternates: buildTrilingualHreflang("/problems", "ms"),
};

// ── Schemas ─────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Utama", item: "https://www.klrenovator.com/ms" },
    { "@type": "ListItem", position: 2, name: "Masalah Aircond", item: "https://www.klrenovator.com/ms/problems" },
  ],
};

const waMsg = "Hi KL Renovator, aircond saya ada masalah. Boleh bantu diagnosis dan baiki? Lokasi saya:";

// Truncates at the last full word within the limit instead of cutting
// mid-word (e.g. "refrigerant ga..." instead of stopping before "gas").
function truncateAtWord(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "...";
}

export default function ProblemsPageMS() {
  const problems = siteConfig.problemPages;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/midea-aircond-gas-topup-r32-puchong-39.webp"
            alt="KL Renovator aircond repair technician diagnosing problems"
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>Diagnosis Masalah Aircond</p>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>Masalah Aircond </span>
              <span className={title({ size: "lg", color: "brand" })}>Biasa KL & Selangor</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              KL Renovator mendiagnosis dan membaiki semua masalah aircond biasa di Kuala Lumpur dan Selangor. Pilih masalah di bawah — setiap panduan terangkan punca, baiki, dan harga.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> WhatsApp Untuk Diagnosis
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all"
              >
                Hubungi {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Semua Masalah</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Pilih </span>
                <span className={title({ size: "sm", color: "brand" })}>Masalah Aircond Anda</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {problems.map((problem, i) => (
              <Reveal key={problem.slug} delay={i * 20}>
                <NextLink
                  href={`/ms/problems/${problem.slug}`}
                  className="group flex flex-col bg-white border border-slate-200 hover:border-red-200 hover:shadow-md rounded-2xl p-5 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <FiAlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                    <h3 className="font-black text-sm text-slate-900 group-hover:text-sky-700 transition-colors leading-tight">
                      {problem.nameMS || problem.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed flex-1">
                    {truncateAtWord(problem.description, 100)}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-black text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
                      Lihat Baiki →
                    </span>
                    <FiArrowRight className="h-4 w-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                  </div>
                </NextLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Kumpulan Masalah</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Layari Mengikut </span>
                <span className={title({ size: "sm", color: "brand" })}>Jenis Simptom</span>
              </h2>
              <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto font-medium">
                Masalah aircond yang berkaitan dikumpulkan supaya anda terus ke baiki, servis dan panduan yang betul.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROBLEM_ENTITY_HUBS.map((hub, i) => {
              const hubProblems = problems.filter((p) => hub.problemSlugs.includes(p.slug));
              const primary = siteConfig.services.find((s) => s.slug === hub.primaryService);
              return (
                <Reveal key={hub.id} delay={i * 40}>
                  <div className="h-full flex flex-col bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-sky-200 hover:shadow-md transition">
                    <h3 className="font-black text-base text-slate-900 mb-2">{hub.labels.ms.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{hub.labels.ms.blurb}</p>
                    <ul className="space-y-1.5 mb-4 flex-1">
                      {hubProblems.map((p) => (
                        <li key={p.slug}>
                          <NextLink
                            href={`/ms/problems/${p.slug}`}
                            className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-sky-600 transition"
                          >
                            <FiArrowRight className="h-3 w-3 text-sky-500 shrink-0" />
                            {p.nameMS || p.name}
                          </NextLink>
                        </li>
                      ))}
                    </ul>
                    {primary && (
                      <NextLink
                        href={`/ms/services/${primary.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white transition"
                      >
                        {primary.title} <FiArrowRight className="h-3 w-3" />
                      </NextLink>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hub.secondaryServices.map((slug) => {
                        const s = siteConfig.services.find((x) => x.slug === slug);
                        if (!s) return null;
                        return (
                          <NextLink
                            key={slug}
                            href={`/ms/services/${slug}`}
                            className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-1 rounded-full hover:bg-sky-100 transition"
                          >
                            {s.title}
                          </NextLink>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Answer Section — AEO */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Jawapan Pantas</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Most Masalah Aircond </span>
                <span className={title({ size: "sm", color: "brand" })}>Paling Lazim</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                q: "Aircond saya hidup tapi tak sejuk. Apa patut saya buat?",
                a: "Punca paling biasa ialah gas penyejuk rendah, gegelung evaporator kotor, atau kapasitor rosak. WhatsApp KL Renovator di +60182983573 dengan HP unit dan kawasan anda — juruteknik akan diagnosis dan sebut harga sebelum mula.",
              },
              {
                q: "Aircond saya menitis air. Adakah berbahaya?",
                a: "Air menitis dari unit dalam biasanya kerana paip longkang tersumbat atau dulang kotor. Tidak berbahaya serta-merta, tetapi perlu dibaiki segera — bocor lama boleh sebabkan kulat dan kerosakan siling/elektrik.",
              },
              {
                q: "Aircond berbau busuk bila dihidupkan. Apa puncanya?",
                a: "Bau busuk biasanya kulat dan bakteria pada gegelung. Cuci kimia (dari RM 120) membunuh kulat dan hilangkan bau. Jika baunya macam terbakar, matikan unit dan hubungi kami segera.",
              },
              {
                q: "Lampu aircond berkelip dan unit berhenti. Apa maksudnya?",
                a: "Lampu berkelip ialah kod ralat PCB. Corak kedipan tunjukkan punca — gas rendah, sensor kotor, ralat komunikasi, atau PCB rosak. KL Renovator baca kod ralat dan diagnosis punca sebenar.",
              },
              {
                q: "Kenapa bil elektrik tinggi selepas guna aircond?",
                a: "Gegelung kotor atau gas rendah memaksa kompresor bekerja lebih keras dan guna lebih elektrik. Cuci kimia atau tambah gas boleh kurangkan kos operasi dengan ketara.",
              },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 30}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-black text-sm text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Perkhidmatan Kami</h3>
                <ul className="space-y-2">
                  {siteConfig.services.map((s) => (
                    <li key={s.slug}>
                      <NextLink href={`/ms/services/${s.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors">
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" /> {s.title}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Kawasan Liputan</h3>
                <ul className="space-y-2">
                  {siteConfig.areaPages.slice(0, 8).map((area) => (
                    <li key={area.slug}>
                      <NextLink href={`/ms/areas/${area.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors">
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" /> {area.name}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Jenama Yang Kami Servis</h3>
                <ul className="space-y-2">
                  {siteConfig.brandPages.slice(0, 8).map((b) => (
                    <li key={b.slug}>
                      <NextLink href={`/ms/brands/${b.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors">
                        <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" /> {b.name}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Get Your Masalah Aircond Anda Fixed Today
            </h2>
            <p className="mt-3 text-sky-100 font-medium">
              Servis hari sama di KL & Selangor. Sebut harga telus sebelum kerja. Semua jenama.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> WhatsApp Kami Sekarang
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                Hubungi {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
