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

export const GALLERY_ITEMS: GalleryItem[] = [
  // INSTALLATIONS
  {
    id: 1,
    category: "installation",
    title: "New Split Unit Installation — KL",
    desc: "Wall-mounted inverter unit installed with clean concealed pipe routing. Job completed same day.",
    src: "/hero/Installation 2026-05-03 at 13.39.24.jpeg",
  },
  {
    id: 2,
    category: "installation",
    title: "Aircond Unit Mounting — Selangor",
    desc: "Professional bracket mounting and copper pipe routing for a new split unit installation.",
    src: "/hero/Installation again 2026-05-03 at 13.39.25.jpeg",
  },
  {
    id: 3,
    category: "installation",
    title: "New Installation — Petaling Jaya",
    desc: "Full installation including outdoor unit bracket, copper piping and electrical connections.",
    src: "/hero/New installation 2026-05-03 at 13.39.25 (1).jpeg",
  },
  {
    id: 4,
    category: "installation",
    title: "Ceiling Cassette Setup — Commercial",
    desc: "Ceiling cassette installation for a commercial space with drain pump and full commissioning.",
    src: "/hero/Cieling Cassette Installation 2026-05-03 at 13.39.25 (2).jpeg",
  },
  {
    id: 5,
    category: "installation",
    title: "New Aircond Installation — Rawang",
    desc: "New split unit installed in Rawang with full copper pipe and wiring concealment.",
    src: "/hero/New Aircon installation in Rawang2026-05-03 at 13.39.33 (1).jpeg",
  },
  {
    id: 6,
    category: "installation",
    title: "Aircond Installation — Ampang KL",
    desc: "New unit installation in Ampang. Clean routing and same-day completion.",
    src: "/hero/Aircon installation in ampang2026-05-03 at 13.39.33.jpeg",
  },
  {
    id: 7,
    category: "installation",
    title: "Bracket Installation — Outdoor Unit",
    desc: "Heavy duty outdoor bracket installation ensuring safe and secure outdoor unit mounting.",
    src: "/hero/Bracket Installation 2026-05-03 at 13.39.34.jpeg",
  },
  // CHEMICAL WASH
  {
    id: 8,
    category: "chemical-wash",
    title: "Pressure Chemical Wash — Cheras",
    desc: "High-pressure chemical cleaning removes mould, dust and bacteria. Cooling fully restored.",
    src: "/hero/Pressure Chemical Wash2026-05-03 at 13.39.26.jpeg",
  },
  {
    id: 9,
    category: "chemical-wash",
    title: "Chemical Wash with Canvas Protection",
    desc: "Protective canvas used during chemical wash to protect walls and floors. Professional service.",
    src: "/hero/Aircon Chemical wash with canvas2026-05-03 at 13.39.35 (1).jpeg",
  },
  {
    id: 10,
    category: "chemical-wash",
    title: "Chemical Service — Deep Clean",
    desc: "Chemical service restoring full cooling performance. Mould and bacteria completely eliminated.",
    src: "/hero/Chemical Service Aircon 2026-05-03 at 13.39.34 (1).jpeg",
  },
  // CHEMICAL OVERHAUL / REPAIRS
  {
    id: 11,
    category: "overhaul",
    title: "Gas Top-Up — R32 / R410A",
    desc: "Precision gas top-up with manifold gauge. Correct operating pressure achieved and verified.",
    src: "/hero/Gas Top up 2026-05-03 at 13.39.30.jpeg",
  },
  {
    id: 12,
    category: "overhaul",
    title: "Compressor Repairing — Selangor",
    desc: "Compressor diagnosis and repair. Unit restored to full cooling capacity.",
    src: "/hero/Aircon Compressor Repairing 2026-05-03 at 13.39.30 (1).jpeg",
    before: "/hero/Installation 2 2026-05-03 at 13.39.30 (2).jpeg",
  },
  // REPAIRS
  {
    id: 13,
    category: "repair",
    title: "Aircond Repairing — KL",
    desc: "Full fault diagnosis and repair. Transparent quote before any work begins.",
    src: "/hero/Aircon Repairing 2026-05-03 at 13.39.27.jpeg",
  },
  {
    id: 14,
    category: "repair",
    title: "Compressor Flaring — Gas Service",
    desc: "Compressor flaring and gas service. Refrigerant balanced to correct operating pressure.",
    src: "/hero/Aircon Compressor Flaring2026-05-03 at 13.39.29.jpeg",
    before: "/hero/New Compressor installation 2026-05-03 at 13.39.29 (1).jpeg",
  },
  {
    id: 15,
    category: "repair",
    title: "PCB Board Replacement",
    desc: "Main PCB board replaced. Error codes cleared and unit restored to full operation.",
    src: "/hero/PCB Board Replacement 2026-05-03 at 13.39.32.jpeg",
  },
  {
    id: 16,
    category: "repair",
    title: "PCB Board Replacement 2",
    desc: "Second PCB replacement job. Blinking light error resolved after OEM board installed.",
    src: "/hero/PCB Board Replacement 2 2026-05-03 at 13.39.34 (2).jpeg",
  },
  {
    id: 17,
    category: "repair",
    title: "Copper Sensor Replacement",
    desc: "Faulty copper thermistor sensor replaced. Temperature regulation restored.",
    src: "/hero/Copper Sensor replacement 2026-05-03 at 13.39.35.jpeg",
  },
  // COMMERCIAL
  {
    id: 18,
    category: "commercial",
    title: "New Compressor Installation — Commercial",
    desc: "New compressor installed for commercial unit. Full system test and commissioning.",
    src: "/hero/Compressor installation new2026-05-03 at 13.39.32 (1).jpeg",
  },
  {
    id: 19,
    category: "commercial",
    title: "Compressor Bracket Installation",
    desc: "Commercial compressor bracket installation. Vibration-dampening mounts fitted.",
    src: "/hero/Compressor Bracket Installation 2026-05-03 at 13.39.33 (2).jpeg",
  },
];

const CATEGORIES = [
  { key: "all",           label: "All Projects" },
  { key: "installation",  label: "Installations" },
  { key: "chemical-wash", label: "Chemical Wash" },
  { key: "overhaul",      label: "Overhaul" },
  { key: "repair",        label: "Repairs" },
  { key: "commercial",    label: "Commercial" },
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
      {/* HERO */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-[0.07]">
          <NextImage
            src="/hero/New Aircon installation in Rawang2026-05-03 at 13.39.33 (1).jpeg"
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
              Browse our real project photos — installations, chemical wash, overhaul, commercial HVAC, repairs and more across KL &amp; Selangor.
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
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
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
                className="inline-flex items-center gap-2.5 text-white font-black uppercase tracking-widest text-xs px-7 py-4 rounded-xl shadow-md transition-all bg-[#25D366] hover:bg-[#1ebe5d]"
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
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
              aria-label="Close"
            >
              <FaXmark className="h-4 w-4" />
            </button>

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

            <div className="relative aspect-video bg-slate-100">
              <img
                src={showBefore && currentItem.before ? currentItem.before : currentItem.src}
                alt={currentItem.title}
                className="w-full h-full object-contain"
              />
            </div>

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
                className="shrink-0 inline-flex items-center gap-2 text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] transition-all"
              >
                <FaWhatsapp className="h-4 w-4" />
                Book This
              </a>
            </div>
          </div>

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

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-bold">
            {lightboxIndex + 1} / {filtered.length}
          </div>
        </div>
      )}
    </main>
  );
}
