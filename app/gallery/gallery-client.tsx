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
  // ── INSTALLATIONS ─────────────────────────────────────────────
  {
    id: 1,
    category: "installation",
    title: "New Split Unit Installation — KL",
    desc: "Wall-mounted inverter unit installed with clean concealed pipe routing. Job completed same day.",
    src: "/hero/aircond-installation-kuala-lumpur.webp",
  },
  {
    id: 2,
    category: "installation",
    title: "Aircond Unit Mounting — Selangor",
    desc: "Professional bracket mounting and copper pipe routing for a new split unit installation.",
    src: "/hero/aircond-installation-wall-mounted-kl.webp",
  },
  {
    id: 3,
    category: "installation",
    title: "New Installation — Petaling Jaya",
    desc: "Full installation including outdoor unit bracket, copper piping and electrical connections.",
    src: "/hero/aircond-new-installation-petaling-jaya.webp",
  },
  {
    id: 4,
    category: "installation",
    title: "Ceiling Cassette Setup — Commercial",
    desc: "Ceiling cassette installation for a commercial space with drain pump and full commissioning.",
    src: "/hero/aircond-ceiling-cassette-installation-commercial.webp",
  },
  // ── CHEMICAL WASH ─────────────────────────────────────────────
  {
    id: 5,
    category: "chemical-wash",
    title: "Pressure Chemical Wash — Cheras",
    desc: "High-pressure chemical cleaning removes mould, dust and bacteria. Cooling fully restored.",
    src: "/hero/aircond-pressure-chemical-wash-selangor.webp",
  },
  {
    id: 6,
    category: "chemical-wash",
    title: "Chemical Wash in Progress — Subang Jaya",
    desc: "Food-safe chemical solution applied to evaporator coil and blower wheel for deep cleaning.",
    src: "/hero/aircond-repair-technician-klang-valley.webp",
  },
  {
    id: 7,
    category: "chemical-wash",
    title: "Post Chemical Wash Result",
    desc: "Before and after chemical wash. Coil completely clean, airflow restored to factory standard.",
    src: "/hero/aircond-compressor-flaring-repair-kl.webp",
    before: "/hero/aircond-new-compressor-installation-rawang.webp",
  },
  // ── CHEMICAL OVERHAUL ─────────────────────────────────────────
  {
    id: 8,
    category: "overhaul",
    title: "Chemical Overhaul — Shah Alam",
    desc: "Full unit dismantle and immersion clean. Drain pan and blower wheel completely restored.",
    src: "/hero/aircond-gas-topup-r32-r410a-selangor.webp",
  },
  {
    id: 9,
    category: "overhaul",
    title: "Heavy Blockage Cleared — Ampang",
    desc: "Unit had years of mould buildup causing ice formation. Chemical overhaul resolved completely.",
    src: "/hero/aircond-chemical-overhaul-ampang-selangor.webp",
    before: "/hero/aircond-installation-double-unit-kl.webp",
  },
  {
    id: 10,
    category: "overhaul",
    title: "Drain Pan Deep Clean — Damansara",
    desc: "Drain pan removed, chemical soaked and flushed. Water leaking issue permanently resolved.",
    src: "/hero/aircond-pcb-board-replacement-kl.webp",
  },
  // ── REPAIRS ───────────────────────────────────────────────────
  {
    id: 11,
    category: "repair",
    title: "Component Diagnosis — KL",
    desc: "Multi-point electrical diagnosis to identify root cause before any repair work begins.",
    src: "/hero/aircond-compressor-installation-new-kl.webp",
  },
  {
    id: 12,
    category: "repair",
    title: "PCB Board Inspection",
    desc: "Main board inspected and tested. OEM-compatible replacement fitted and unit restored to full function.",
    src: "/hero/aircond-installation-ampang-selangor.webp",
  },
  {
    id: 13,
    category: "repair",
    title: "Capacitor Replacement — Setapak",
    desc: "Outdoor unit capacitor identified as faulty and replaced within the hour. Cooling restored.",
    src: "/hero/aircond-bracket-installation-kl-renovator.webp",
  },
  // ── COMMERCIAL ────────────────────────────────────────────────
  {
    id: 14,
    category: "commercial",
    title: "Office Block — Kuala Lumpur",
    desc: "Multi-unit commercial servicing. Annual maintenance contract covering quarterly visits.",
    src: "/hero/aircond-new-installation-rawang-selangor.webp",
  },
  {
    id: 15,
    category: "commercial",
    title: "Ceiling Cassette Service — Bangsar",
    desc: "Ceiling cassette chemical wash with full panel removal and drain pump inspection.",
    src: "/hero/aircond-compressor-bracket-installation-kl.webp",
  },
  // ── TEAM ──────────────────────────────────────────────────────
  {
    id: 16,
    category: "team",
    title: "Technician at Work — Mont Kiara",
    desc: "Our certified technicians carry full PPE and proper tools on every job.",
    src: "/hero/aircond-chemical-service-canvas-wrap-kl.webp",
  },
  {
    id: 17,
    category: "team",
    title: "Installation Team — Kajang",
    desc: "Experienced two-man team ensures clean and efficient installations at any location.",
    src: "/hero/aircond-pcb-board-replacement-2-klang-valley.webp",
  },
  {
    id: 18,
    category: "team",
    title: "Service in Progress — Puchong",
    desc: "Full service routine underway. Every visit includes a multi-point system check.",
    src: "/hero/aircond-sensor-replacement-klang-valley.webp",
  },
  {
    id: 19,
    category: "team",
    title: "On-Site Gas Top-Up — Kepong",
    desc: "Precision gas top-up with calibrated gauges. Cooling output verified after refill.",
    src: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp",
  },
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
