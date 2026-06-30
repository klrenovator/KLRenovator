"use client";

import { useState } from "react";
import NextImage from "next/image";
import { FaWhatsapp, FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export type GalleryItem = {
  id: number;
  category: string;
  title: string;
  desc?: string;
  src: string;
  before?: string;
};

// ── ALL REAL COMPANY IMAGES — SEO-friendly filenames ─────────────────────────
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 8, category: "installation", title: "Aircon Bracket Installation KL Renovator", src: "/hero/aircond-bracket-installation-kl-renovator.webp" },
  { id: 9, category: "installation", title: "Aircon Ceiling Cassette Installation Commercial", src: "/hero/aircond-ceiling-cassette-installation-commercial.webp" },
  { id: 13, category: "installation", title: "Aircon Compressor Bracket Installation KL", src: "/hero/aircond-compressor-bracket-installation-kl.webp" },
  { id: 15, category: "installation", title: "Aircon Compressor Installation New KL", src: "/hero/aircond-compressor-installation-new-kl.webp" },
  { id: 17, category: "installation", title: "Aircon Installation Ampang Selangor", src: "/hero/aircond-installation-ampang-selangor.webp" },
  { id: 18, category: "installation", title: "Aircon Installation Double Unit KL", src: "/hero/aircond-installation-double-unit-kl.webp" },
  { id: 19, category: "installation", title: "Aircon Installation Kuala Lumpur", src: "/hero/aircond-installation-kuala-lumpur.webp" },
  { id: 20, category: "installation", title: "Aircon Installation Wall Mounted KL", src: "/hero/aircond-installation-wall-mounted-kl.webp" },
  { id: 21, category: "installation", title: "Aircon New Compressor Installation Rawang", src: "/hero/aircond-new-compressor-installation-rawang.webp" },
  { id: 22, category: "installation", title: "Aircon New Installation Petaling Jaya", src: "/hero/aircond-new-installation-petaling-jaya.webp" },
  { id: 23, category: "installation", title: "Aircon New Installation Rawang Selangor", src: "/hero/aircond-new-installation-rawang-selangor.webp" },
  { id: 33, category: "installation", title: "Aux Aircon New Installation Subang Jaya 31", src: "/hero/aux-aircond-new-installation-subang-jaya-31.webp" },
  { id: 39, category: "installation", title: "Daikin Aircon New Installation KLang 67", src: "/hero/daikin-aircond-new-installation-klang-67.webp" },
  { id: 45, category: "installation", title: "Isonic Aircon New Installation Shah Alam 55", src: "/hero/isonic-aircond-new-installation-shah-alam-55.webp" },
  { id: 52, category: "installation", title: "Lg Aircon New Installation Kuala Lumpur 7", src: "/hero/lg-aircond-new-installation-kuala-lumpur-7.webp" },
  { id: 79, category: "installation", title: "Samsung Aircon New Installation Petaling Jaya 19", src: "/hero/samsung-aircond-new-installation-petaling-jaya-19.webp" },
  { id: 85, category: "installation", title: "Tcl Aircon New Installation Puchong 43", src: "/hero/tcl-aircond-new-installation-puchong-43.webp" },
  { id: 3, category: "chemical-wash", title: "Acson Aircon Chemical Wash Shah Alam 49", src: "/hero/acson-aircond-chemical-wash-shah-alam-49.webp" },
  { id: 12, category: "chemical-wash", title: "Aircon Chemical Wash Canvas Kepong KL", src: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp" },
  { id: 26, category: "chemical-wash", title: "Aircon Pressure Chemical Wash Selangor", src: "/hero/aircond-pressure-chemical-wash-selangor.webp" },
  { id: 36, category: "chemical-wash", title: "Daikin Aircon Chemical Wash Kuala Lumpur 1", src: "/hero/daikin-aircond-chemical-wash-kuala-lumpur-1.webp" },
  { id: 56, category: "chemical-wash", title: "Midea Aircon Chemical Wash KLang 61", src: "/hero/midea-aircond-chemical-wash-klang-61.webp" },
  { id: 62, category: "chemical-wash", title: "Mitsubishi Aircon Chemical Wash Subang Jaya 25", src: "/hero/mitsubishi-aircond-chemical-wash-subang-jaya-25.webp" },
  { id: 70, category: "chemical-wash", title: "Panasonic Aircon Chemical Wash Petaling Jaya 13", src: "/hero/panasonic-aircond-chemical-wash-petaling-jaya-13.webp" },
  { id: 88, category: "chemical-wash", title: "York Aircon Chemical Wash Puchong 37", src: "/hero/york-aircond-chemical-wash-puchong-37.webp" },
  { id: 2, category: "overhaul", title: "Acson Aircon Chemical Overhaul Puchong 38", src: "/hero/acson-aircond-chemical-overhaul-puchong-38.webp" },
  { id: 10, category: "overhaul", title: "Aircon Chemical Overhaul Ampang Selangor", src: "/hero/aircond-chemical-overhaul-ampang-selangor.webp" },
  { id: 49, category: "overhaul", title: "Lg Aircon Chemical Overhaul KLang 62", src: "/hero/lg-aircond-chemical-overhaul-klang-62.webp" },
  { id: 55, category: "overhaul", title: "Midea Aircon Chemical Overhaul Shah Alam 50", src: "/hero/midea-aircond-chemical-overhaul-shah-alam-50.webp" },
  { id: 61, category: "overhaul", title: "Mitsubishi Aircon Chemical Overhaul Petaling Jaya 14", src: "/hero/mitsubishi-aircond-chemical-overhaul-petaling-jaya-14.webp" },
  { id: 69, category: "overhaul", title: "Panasonic Aircon Chemical Overhaul Kuala Lumpur 2", src: "/hero/panasonic-aircond-chemical-overhaul-kuala-lumpur-2.webp" },
  { id: 87, category: "overhaul", title: "York Aircon Chemical Overhaul Subang Jaya 26", src: "/hero/york-aircond-chemical-overhaul-subang-jaya-26.webp" },
  { id: 1, category: "repair", title: "Acson Aircon Basic Servicing Kuala Lumpur 5", src: "/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp" },
  { id: 4, category: "repair", title: "Acson Aircon Gas Topup R32 Subang Jaya 27", src: "/hero/acson-aircond-gas-topup-r32-subang-jaya-27.webp" },
  { id: 5, category: "repair", title: "Acson Aircon Gas Topup R410a Petaling Jaya 16", src: "/hero/acson-aircond-gas-topup-r410a-petaling-jaya-16.webp" },
  { id: 6, category: "repair", title: "Acson Aircon Pcb Board Repair KLang 71", src: "/hero/acson-aircond-pcb-board-repair-klang-71.webp" },
  { id: 7, category: "repair", title: "Acson Aircon Water Leaking Fix Shah Alam 60", src: "/hero/acson-aircond-water-leaking-fix-shah-alam-60.webp" },
  { id: 11, category: "repair", title: "Aircon Chemical Service Canvas Wrap KL", src: "/hero/aircond-chemical-service-canvas-wrap-kl.webp" },
  { id: 14, category: "repair", title: "Aircon Compressor Flaring Repair KL", src: "/hero/aircond-compressor-flaring-repair-kl.webp" },
  { id: 16, category: "repair", title: "Aircon Gas Topup R32 R410a Selangor", src: "/hero/aircond-gas-topup-r32-r410a-selangor.webp" },
  { id: 24, category: "repair", title: "Aircon Pcb Board Replacement 2 KLang Valley", src: "/hero/aircond-pcb-board-replacement-2-klang-valley.webp" },
  { id: 25, category: "repair", title: "Aircon Pcb Board Replacement KL", src: "/hero/aircond-pcb-board-replacement-kl.webp" },
  { id: 28, category: "repair", title: "Aircon Sensor Replacement KLang Valley", src: "/hero/aircond-sensor-replacement-klang-valley.webp" },
  { id: 29, category: "repair", title: "Aux Aircon Basic Servicing Shah Alam 53", src: "/hero/aux-aircond-basic-servicing-shah-alam-53.webp" },
  { id: 31, category: "repair", title: "Aux Aircon Dismantle Relocation Kuala Lumpur 9", src: "/hero/aux-aircond-dismantle-relocation-kuala-lumpur-9.webp" },
  { id: 32, category: "repair", title: "Aux Aircon Gas Topup R410a KLang 64", src: "/hero/aux-aircond-gas-topup-r410a-klang-64.webp" },
  { id: 34, category: "repair", title: "Aux Aircon Troubleshooting Repair Puchong 42", src: "/hero/aux-aircond-troubleshooting-repair-puchong-42.webp" },
  { id: 37, category: "repair", title: "Daikin Aircon Compressor Replacement Subang Jaya 34", src: "/hero/daikin-aircond-compressor-replacement-subang-jaya-34.webp" },
  { id: 38, category: "repair", title: "Daikin Aircon Dismantle Relocation Puchong 45", src: "/hero/daikin-aircond-dismantle-relocation-puchong-45.webp" },
  { id: 40, category: "repair", title: "Daikin Aircon Pcb Board Repair Petaling Jaya 23", src: "/hero/daikin-aircond-pcb-board-repair-petaling-jaya-23.webp" },
  { id: 41, category: "repair", title: "Daikin Aircon Water Leaking Fix Kuala Lumpur 12", src: "/hero/daikin-aircond-water-leaking-fix-kuala-lumpur-12.webp" },
  { id: 43, category: "repair", title: "Isonic Aircon Compressor Replacement Petaling Jaya 22", src: "/hero/isonic-aircond-compressor-replacement-petaling-jaya-22.webp" },
  { id: 44, category: "repair", title: "Isonic Aircon Dismantle Relocation Subang Jaya 33", src: "/hero/isonic-aircond-dismantle-relocation-subang-jaya-33.webp" },
  { id: 46, category: "repair", title: "Isonic Aircon Pcb Board Repair Kuala Lumpur 11", src: "/hero/isonic-aircond-pcb-board-repair-kuala-lumpur-11.webp" },
  { id: 47, category: "repair", title: "Isonic Aircon Troubleshooting Repair KLang 66", src: "/hero/isonic-aircond-troubleshooting-repair-klang-66.webp" },
  { id: 48, category: "repair", title: "Lg Aircon Basic Servicing Subang Jaya 29", src: "/hero/lg-aircond-basic-servicing-subang-jaya-29.webp" },
  { id: 50, category: "repair", title: "Lg Aircon Gas Topup R32 Shah Alam 51", src: "/hero/lg-aircond-gas-topup-r32-shah-alam-51.webp" },
  { id: 51, category: "repair", title: "Lg Aircon Gas Topup R410a Puchong 40", src: "/hero/lg-aircond-gas-topup-r410a-puchong-40.webp" },
  { id: 53, category: "repair", title: "Lg Aircon Troubleshooting Repair Petaling Jaya 18", src: "/hero/lg-aircond-troubleshooting-repair-petaling-jaya-18.webp" },
  { id: 54, category: "repair", title: "Midea Aircon Basic Servicing Petaling Jaya 17", src: "/hero/midea-aircond-basic-servicing-petaling-jaya-17.webp" },
  { id: 57, category: "repair", title: "Midea Aircon Gas Topup R32 Puchong 39", src: "/hero/midea-aircond-gas-topup-r32-puchong-39.webp" },
  { id: 58, category: "repair", title: "Midea Aircon Gas Topup R410a Subang Jaya 28", src: "/hero/midea-aircond-gas-topup-r410a-subang-jaya-28.webp" },
  { id: 59, category: "repair", title: "Midea Aircon Troubleshooting Repair Kuala Lumpur 6", src: "/hero/midea-aircond-troubleshooting-repair-kuala-lumpur-6.webp" },
  { id: 60, category: "repair", title: "Midea Aircon Water Leaking Fix KLang 72", src: "/hero/midea-aircond-water-leaking-fix-klang-72.webp" },
  { id: 63, category: "repair", title: "Mitsubishi Aircon Compressor Replacement Shah Alam 58", src: "/hero/mitsubishi-aircond-compressor-replacement-shah-alam-58.webp" },
  { id: 64, category: "repair", title: "Mitsubishi Aircon Dismantle Relocation KLang 69", src: "/hero/mitsubishi-aircond-dismantle-relocation-klang-69.webp" },
  { id: 65, category: "repair", title: "Mitsubishi Aircon Gas Topup R32 Kuala Lumpur 3", src: "/hero/mitsubishi-aircond-gas-topup-r32-kuala-lumpur-3.webp" },
  { id: 66, category: "repair", title: "Mitsubishi Aircon Pcb Board Repair Puchong 47", src: "/hero/mitsubishi-aircond-pcb-board-repair-puchong-47.webp" },
  { id: 67, category: "repair", title: "Mitsubishi Aircon Water Leaking Fix Subang Jaya 36", src: "/hero/mitsubishi-aircond-water-leaking-fix-subang-jaya-36.webp" },
  { id: 71, category: "repair", title: "Panasonic Aircon Compressor Replacement Puchong 46", src: "/hero/panasonic-aircond-compressor-replacement-puchong-46.webp" },
  { id: 72, category: "repair", title: "Panasonic Aircon Dismantle Relocation Shah Alam 57", src: "/hero/panasonic-aircond-dismantle-relocation-shah-alam-57.webp" },
  { id: 73, category: "repair", title: "Panasonic Aircon Pcb Board Repair Subang Jaya 35", src: "/hero/panasonic-aircond-pcb-board-repair-subang-jaya-35.webp" },
  { id: 74, category: "repair", title: "Panasonic Aircon Water Leaking Fix Petaling Jaya 24", src: "/hero/panasonic-aircond-water-leaking-fix-petaling-jaya-24.webp" },
  { id: 75, category: "repair", title: "Samsung Aircon Basic Servicing Puchong 41", src: "/hero/samsung-aircond-basic-servicing-puchong-41.webp" },
  { id: 77, category: "repair", title: "Samsung Aircon Gas Topup R32 KLang 63", src: "/hero/samsung-aircond-gas-topup-r32-klang-63.webp" },
  { id: 78, category: "repair", title: "Samsung Aircon Gas Topup R410a Shah Alam 52", src: "/hero/samsung-aircond-gas-topup-r410a-shah-alam-52.webp" },
  { id: 80, category: "repair", title: "Samsung Aircon Troubleshooting Repair Subang Jaya 30", src: "/hero/samsung-aircond-troubleshooting-repair-subang-jaya-30.webp" },
  { id: 81, category: "repair", title: "Tcl Aircon Basic Servicing KLang 65", src: "/hero/tcl-aircond-basic-servicing-klang-65.webp" },
  { id: 83, category: "repair", title: "Tcl Aircon Compressor Replacement Kuala Lumpur 10", src: "/hero/tcl-aircond-compressor-replacement-kuala-lumpur-10.webp" },
  { id: 84, category: "repair", title: "Tcl Aircon Dismantle Relocation Petaling Jaya 21", src: "/hero/tcl-aircond-dismantle-relocation-petaling-jaya-21.webp" },
  { id: 86, category: "repair", title: "Tcl Aircon Troubleshooting Repair Shah Alam 54", src: "/hero/tcl-aircond-troubleshooting-repair-shah-alam-54.webp" },
  { id: 89, category: "repair", title: "York Aircon Compressor Replacement KLang 70", src: "/hero/york-aircond-compressor-replacement-klang-70.webp" },
  { id: 90, category: "repair", title: "York Aircon Gas Topup R32 Petaling Jaya 15", src: "/hero/york-aircond-gas-topup-r32-petaling-jaya-15.webp" },
  { id: 91, category: "repair", title: "York Aircon Gas Topup R410a Kuala Lumpur 4", src: "/hero/york-aircond-gas-topup-r410a-kuala-lumpur-4.webp" },
  { id: 92, category: "repair", title: "York Aircon Pcb Board Repair Shah Alam 59", src: "/hero/york-aircond-pcb-board-repair-shah-alam-59.webp" },
  { id: 93, category: "repair", title: "York Aircon Water Leaking Fix Puchong 48", src: "/hero/york-aircond-water-leaking-fix-puchong-48.webp" },
  { id: 30, category: "commercial", title: "Aux Aircon Ceiling Cassette Service Petaling Jaya 20", src: "/hero/aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp" },
  { id: 35, category: "commercial", title: "Daikin Aircon Ceiling Cassette Service Shah Alam 56", src: "/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp" },
  { id: 42, category: "commercial", title: "Isonic Aircon Ceiling Cassette Service Puchong 44", src: "/hero/isonic-aircond-ceiling-cassette-service-puchong-44.webp" },
  { id: 68, category: "commercial", title: "Panasonic Aircon Ceiling Cassette Service KLang 68", src: "/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp" },
  { id: 76, category: "commercial", title: "Samsung Aircon Ceiling Cassette Service Kuala Lumpur 8", src: "/hero/samsung-aircond-ceiling-cassette-service-kuala-lumpur-8.webp" },
  { id: 82, category: "commercial", title: "Tcl Aircon Ceiling Cassette Service Subang Jaya 32", src: "/hero/tcl-aircond-ceiling-cassette-service-subang-jaya-32.webp" },
  { id: 27, category: "team", title: "Aircon Repair Technician KLang Valley", src: "/hero/aircond-repair-technician-klang-valley.webp" },
];

const CATEGORIES = [
  { key: "all",           label: "All Projects" },
  { key: "installation",  label: "Installations" },
  { key: "chemical-wash", label: "Chemical Wash" },
  { key: "overhaul",      label: "Overhaul" },
  { key: "repair",        label: "Repairs" },
  { key: "commercial",    label: "Commercial" },
  { key: "team",          label: "Our Team" },
];

export function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showBefore, setShowBefore] = useState(false);

  const filtered =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowBefore(false);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
    setShowBefore(false);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    setShowBefore(false);
  };

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100 py-16 sm:py-20">
        {/* Watermark */}
        <div className="absolute inset-0 opacity-[0.07]">
          <NextImage
            src="/hero/aircond-new-installation-rawang-selangor.webp"
            alt="KL Renovator aircond installation project"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/60" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
              Real Projects · Real Results
            </p>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Our Work Gallery
            </h1>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto font-medium">
              Browse our real project photos — installations, chemical wash, overhaul, commercial HVAC, repairs, and our team at work across KL &amp; Selangor.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <span className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full">
                📸 {GALLERY_ITEMS.length}+ Real Project Photos
              </span>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full">
                🏙️ KL &amp; Selangor
              </span>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full">
                ✅ 100% Genuine Company Photos
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-slate-100 sticky top-[80px] z-30 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`shrink-0 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-slate-400 py-20">No photos in this category yet.</p>
          ) : (
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => (
                <Reveal key={item.id} delay={index * 30}>
                  <button
                    className="relative group w-full text-left rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-slate-100"
                    onClick={() => openLightbox(index)}
                    aria-label={`View: ${item.title}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                      <NextImage
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading={index < 6 ? "eager" : "lazy"}
                      />
                      {item.before && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Before / After
                        </span>
                      )}
                      <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {CATEGORIES.find((c) => c.key === item.category)?.label}
                      </span>
                      <div className="absolute inset-0 bg-sky-900/0 group-hover:bg-sky-900/20 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                          View Full
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-black text-slate-900 text-sm leading-snug">{item.title}</p>
                      {item.desc && (
                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 font-medium">{item.desc}</p>
                      )}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {/* CTA */}
          <Reveal>
            <div className="mt-16 bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center">
              <p className="text-2xl mb-2">📸</p>
              <h3 className="font-black text-slate-900 mb-2">Want to see more?</h3>
              <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                We update our gallery regularly with new project photos. Send us a WhatsApp to discuss your aircon needs.
              </p>
              <a
                href={waLink("Hi KL Renovator, I want to book an aircon service after viewing your gallery.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white font-black uppercase tracking-widest text-xs px-7 py-4 rounded-xl shadow-md transition-all"
                style={{ background: "#25D366" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1ebe5d"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#25D366"; }}
              >
                <FaWhatsapp className="h-4 w-4" />
                Book Your Service Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
              aria-label="Close"
            >
              <FaXmark className="h-4 w-4" />
            </button>

            {/* Before/After Toggle */}
            {currentItem.before && (
              <div className="absolute top-4 left-4 z-10 flex bg-black/50 rounded-full overflow-hidden">
                <button
                  onClick={() => setShowBefore(false)}
                  className={`px-3 py-1.5 text-xs font-black uppercase transition-colors ${!showBefore ? "bg-sky-600 text-white" : "text-white/70 hover:text-white"}`}
                >
                  After
                </button>
                <button
                  onClick={() => setShowBefore(true)}
                  className={`px-3 py-1.5 text-xs font-black uppercase transition-colors ${showBefore ? "bg-amber-500 text-white" : "text-white/70 hover:text-white"}`}
                >
                  Before
                </button>
              </div>
            )}

            {/* Image container */}
            <div className="relative aspect-video bg-slate-100">
              <NextImage
                src={showBefore && currentItem.before ? currentItem.before : currentItem.src}
                alt={currentItem.title}
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Info */}
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                  {CATEGORIES.find((c) => c.key === currentItem.category)?.label}
                </span>
                <h3 className="font-black text-slate-900 mt-2">{currentItem.title}</h3>
                {currentItem.desc && (
                  <p className="text-sm text-slate-500 mt-1">{currentItem.desc}</p>
                )}
              </div>
              <a
                href={waLink(`Hi KL Renovator, I saw your gallery photo: "${currentItem.title}" and want to book a similar service.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all"
                style={{ background: "#25D366" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1ebe5d"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#25D366"; }}
              >
                <FaWhatsapp className="h-4 w-4" />
                Book This
              </a>
            </div>
          </div>

          {/* Prev/Next */}
          {filtered.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                aria-label="Previous"
              >
                <FaChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                aria-label="Next"
              >
                <FaChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-bold">
            {lightboxIndex + 1} / {filtered.length}
          </div>
        </div>
      )}
    </main>
  );
}
