import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import NextLink from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: clampMetaTitle("Servis Aircond Mengikut Jenama KL & Selangor | KL Renovator"),
  description: clampMetaDescription("KL Renovator servis semua jenama aircond utama di KL & Selangor — Daikin, Panasonic, Mitsubishi, York, LG, Samsung, Midea, Hisense & lebih. Hubungi +60182983573."),
  openGraph: {
    title: clampMetaTitle("Servis Aircond Mengikut Jenama | KL Renovator"),
    description: clampMetaDescription("Semua jenama aircond utama diservis di KL & Selangor. Cuci kimia, tambah gas, baiki & pasang."),
    url: "https://www.klrenovator.com/ms/brands",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
  },
  alternates: {
    canonical: "https://www.klrenovator.com/ms/brands",
    languages: {
      "en-MY": "https://www.klrenovator.com/brands",
      "ms-MY": "https://www.klrenovator.com/ms/brands",
      "zh-MY": "https://www.klrenovator.com/zh/brands",
      "x-default": "https://www.klrenovator.com/brands",
    },
  },
};

const waMsg = "Hai KL Renovator, saya perlukan bantuan aircond. Tolong nasihat tentang servis dan harga.";

export default function BrandsPageMS() {
  const brands = siteConfig.brandPages;
  return (
    <>
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>20 Jenama · Semua Model</p>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>Servis Aircond </span>
              <span className={title({ size: "lg", color: "brand" })}>Mengikut Jenama</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              KL Renovator servis semua jenama aircond utama di Kuala Lumpur dan Selangor. Pilih jenama anda di bawah untuk model spesifik dan harga.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink(waMsg)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> WhatsApp Tempahan
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((b) => (
              <NextLink key={b.slug} href={`/ms/brands/${b.slug}`} className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-200 hover:shadow-md transition-all">
                <h3 className="font-black text-slate-900 text-sm">{b.name} Aircond</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">Lihat Servis <FiArrowRight className="h-3 w-3" /></span>
              </NextLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
