// Server component — this page has no state, effects or event handlers.
// It was marked "use client", which pulled the shared UI/config chunk into
// the browser for all three locale variants.

import Image from "next/image";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { FaWhatsapp, FaCheck } from "react-icons/fa6";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { title, eyebrow } from "@/components/primitives";
import { sitePublic } from "@/config/site-public";
import { waLink, rfqMsg } from "@/lib/whatsapp";

function StaticPriceTable({
  serviceTitle,
  tableTitle,
  rows,
  note,
  slug,
}: {
  serviceTitle: string;
  tableTitle: string;
  rows: { label: string; price: string }[];
  note?: string;
  slug?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full flex items-center justify-between px-6 py-5 bg-slate-50">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">
            {tableTitle}
          </p>
          <p className="text-base font-black text-slate-900 leading-snug">{serviceTitle}</p>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <ul className="divide-y divide-slate-50">
          {rows.map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between gap-4 px-6 py-3.5 hover:bg-sky-50/40 transition-colors"
            >
              <span className="text-sm text-slate-600 font-medium">{row.label}</span>
              <span className="text-sm font-black text-sky-700 whitespace-nowrap bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                {row.price}
              </span>
            </li>
          ))}
        </ul>

        {note && (
          <div className="border-t border-slate-100 bg-emerald-50 px-6 py-3">
            <p className="text-xs text-emerald-700 font-bold flex items-center gap-2">
              <FaCheck className="h-3 w-3 shrink-0" />
              {note}
            </p>
          </div>
        )}

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex flex-wrap items-center gap-3">
          {slug && (
            <Link
              href={`/ms/services/${slug}`}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-sky-600 transition-colors"
            >
              Lihat Butiran Servis Penuh
              <FaArrowRight className="h-3 w-3" />
            </Link>
          )}
          <a
            href={waLink(`Hi KL Renovator, I want to enquire about: ${serviceTitle}`)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all ml-auto"
          >
            <FaWhatsapp className="h-3.5 w-3.5" />
            Tempah Servis Ini
          </a>
        </div>
      </div>
    </div>
  );
}

const SVC: Record<string, { title: string; short: string }> = {
  "emergency": {
    title: "Pembaikan Aircond Kecemasan",
    short: "Tindak balas kecemasan hari sama untuk kerosakan aircond sepenuhnya, kebocoran air teruk, kerosakan unit luar, dan pembaikan segera di seluruh KL & Selangor.",
  },
  "installation": {
    title: "Pemasangan Unit Baharu",
    short: "Persediaan AC kediaman dan komersial profesional dengan penyambungan kabel yang kemas. Pemasangan hari sama tersedia untuk semua jenama dan saiz HP.",
  },
  "basic-servicing": {
    title: "Servis Asas / Penyelenggaraan Rutin",
    short: "Pembersihan penapis aircond standard secara berkala dan pemeriksaan diagnostik pelbagai titik untuk mengekalkan kecekapan tenaga optimum dan memanjangkan jangka hayat unit.",
  },
  "chemical-wash": {
    title: "Cuci Kimia Bertekanan",
    short: "Pembersihan kimia bertekanan tinggi untuk menghapuskan kulat, habuk dan bakteria degil serta meningkatkan aliran udara penyejukan dan kualiti udara dengan ketara.",
  },
  "chemical-overhaul": {
    title: "Overhaul Kimia",
    short: "Pembongkaran lengkap unit dalaman untuk pembersihan paling mendalam. Menyelesaikan kebocoran air teruk, pembentukan ais, dan sekatan teruk secara kekal.",
  },
  "gas-topup": {
    title: "Tambah Gas / Pengimbangan Tepat",
    short: "Pengimbangan refrigerant tepat dan tambah tahap tekanan untuk sistem mesra alam R32, R410A, dan R22 tradisional. Pemeriksaan kebocoran disertakan.",
  },
  "repair": {
    title: "Penyelesaian Masalah & Pembaikan",
    short: "Diagnosis pakar dan penggantian alat ganti aircond yang rosak — kapasitor, motor kipas, gegelung sensor, papan PCB, atau pendawaian tembaga. Sebut harga sebelum kerja.",
  },
  "dismantling-relocation": {
    title: "Cabut & Pindah",
    short: "Pengekstrakan unit dalaman/luaran sedia ada yang selamat dan bebas risiko dengan pam keluar refrigerant dan pengedap yang betul. Pemasangan semula penuh di lokasi baharu.",
  },
  "ceiling-cassette": {
    title: "Penyelesaian Ceiling Cassette",
    short: "Servis ceiling cassette komersial berat, cuci kimia, pemasangan dan penyelenggaraan berjadual untuk susun atur korporat dan runcit.",
  },
};

const MATERIAL_ROWS = [
  { label: "Paip Kuprum 1.0 – 1.5 HP", price: "RM 17/kaki" },
  { label: "Paip Kuprum 2.0 – 2.5 HP", price: "RM 23/kaki" },
  { label: "Paip Kuprum 3.0 – 3.5 HP", price: "RM 27/kaki" },
  { label: "Wayar", price: "RM 9/kaki" },
  { label: "Braket Luaran Standard", price: "RM 45" },
  { label: "Braket Universal Dalaman", price: "RM 35" },
  { label: "Casing PVC Kecil (Wayar Elektrik)", price: "RM 6/kaki" },
  { label: "Casing PVC Besar (Paip Kuprum + Wayar + Penebat)", price: "RM 12/kaki" },
  { label: "Pemasangan Titik Plag Elektrik", price: "RM 100" },
  { label: "Kerja Pecah Dinding & Pendam", price: "RM 25/kaki" },
  { label: "Caj Akses Bangunan Tinggi / Sukar", price: "RM 50 – 150" },
  { label: "Dulang Kabel Logam Standard", price: "RM 15/kaki" },
];

const CONTRACT_ROWS = [
  { label: "AMC Asas · seunit / tahun (2 servis asas + 1 cuci kimia)", price: "RM 299" },
  { label: "AMC Standard · seunit / tahun (2 servis asas + 2 cuci kimia + cek kecemasan percuma)", price: "RM 499" },
  { label: "AMC Premium · seunit / tahun (4 servis + 2 cuci kimia + 1 overhaul + diskaun 15% pembaikan)", price: "RM 899" },
];

const VOLUME_DISCOUNTS = [
  { units: "5+ unit", off: "Diskaun Tempahan Segera 5% (5% OFF Instant Booking Discount)" },
  { units: "10+ unit", off: "Diskaun Tempahan Segera 10% (10% OFF Instant Booking Discount)" },
];

export default function ServicesPageMS() {
  return (
    <>
      {/* Page Header — White */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/lg-aircond-gas-topup-r410a-puchong-40.webp"
            alt="Servis aircond profesional KL Renovator di Kuala Lumpur"
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-4">
              Penyelesaian Kami
            </p>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              Servis Aircond &amp; <span className="text-sky-500">Senarai Harga</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-500 font-medium">
              Harga telus — tiada caj tersembunyi. Klik mana-mana servis di bawah untuk melihat pecahan lengkap.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
              {["Tiada caj tersembunyi", "Ketersediaan hari sama", "Semua jenama diliputi", "Jaminan 1 bulan"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 font-bold uppercase tracking-wider rounded-full"
                >
                  <FaCheck className="h-2.5 w-2.5 text-sky-500" /> {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Lihat mengikut Servis</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Semua </span>
                <span className={title({ size: "sm", color: "brand" })}>Servis HVAC Kami</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sitePublic.services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 40}>
                <Link
                  href={`/ms/services/${service.slug}`}
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-sky-100 transition-all duration-300"
                >
                  <div className="inline-flex p-2.5 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4 w-fit group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-black text-slate-900 text-sm leading-snug mb-2">{SVC[service.slug]?.title ?? service.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed flex-grow">{SVC[service.slug]?.short ?? service.short}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sky-600 text-xs font-black uppercase tracking-wider">
                    Lihat Butiran <FaArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & AMC — Always Visible */}
      <section id="materials" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal>
              <p className={eyebrow()}>Kos Bahan Telus</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Harga Bahan & </span>
                <span className={title({ size: "sm", color: "brand" })}>Caj Khas</span>
              </h2>
              <p className="mt-4 text-slate-500 font-medium">
                Semua kos bahan disebut harga dan disahkan dengan anda sebelum kerja dimulakan. Tiada kejutan.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            <Reveal>
              <StaticPriceTable
                serviceTitle="Bahan Tambahan & Caj Khas"
                tableTitle="Harga Bahan"
                rows={MATERIAL_ROWS}
              />
            </Reveal>
            <Reveal delay={50}>
              <StaticPriceTable
                serviceTitle="Kontrak Penyelenggaraan Korporat & Kediaman Tahunan"
                tableTitle="Pakej AMC"
                rows={CONTRACT_ROWS}
              />
            </Reveal>
          </div>

          {/* Volume Discounts */}
          <Reveal>
            <div className="mt-8 bg-sky-600 text-white rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-sky-100 mb-5 flex items-center gap-2">
                🎯 Diskaun Tempahan Beramai-ramai
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {VOLUME_DISCOUNTS.map((d) => (
                  <div key={d.units} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                    <p className="text-xl font-black text-white">{d.units}</p>
                    <p className="text-xs font-bold text-sky-200 uppercase tracking-wider mt-1">{d.off}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-sky-200 font-medium">
                * Diskaun terpakai untuk caj upah. Hubungi kami di WhatsApp untuk mengesahkan.
              </p>
            </div>
          </Reveal>

          {/* Quote CTA */}
          <Reveal>
            <div className="mt-10 bg-[#0284c7] text-white p-8 sm:p-12 text-center rounded-2xl">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Tidak pasti apa yang anda perlukan?
              </h2>
              <p className="mt-3 text-sky-100 font-medium max-w-xl mx-auto">
                Hantar gambar unit anda melalui WhatsApp — kami akan beri sebut harga tepat dalam masa 30 minit.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={waLink(rfqMsg)}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
                >
                  <FaWhatsapp className="h-5 w-5" /> Dapatkan Sebut Harga Percuma di WhatsApp
                </a>
                <a
                  href={`tel:${sitePublic.phone}`}
                  className="inline-flex items-center gap-2.5 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
                >
                  Hubungi {sitePublic.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CoverageAreas />
      <ReadyToBook />
    </>
  );
}
