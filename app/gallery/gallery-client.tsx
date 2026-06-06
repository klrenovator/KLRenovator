"use client";

import { useState } from "react";
import { FaWhatsapp, FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY DATA
// To add new photos: just add an object to the GALLERY_ITEMS array below.
// Fields:
//   id        — unique number
//   category  — must be one of the CATEGORIES keys (e.g. "installation")
//   title     — short caption shown in the card
//   desc      — optional longer description shown in lightbox
//   src       — URL of the image (Unsplash, your CDN, or /public path)
//   before    — (optional) src of before photo for before/after cards
// ─────────────────────────────────────────────────────────────────────────────

export type GalleryItem = {
  id: number;
  category: string;
  title: string;
  desc?: string;
  src: string;
  before?: string; // for before/after
};

export const GALLERY_ITEMS: GalleryItem[] = [
  // ── INSTALLATIONS ─────────────────────────────────────────────
  {
    id: 1,
    category: "installation",
    title: "New Split Unit — Condo, Mont Kiara",
    desc: "Daikin 1.5HP inverter installed with concealed pipe routing. Job completed in 2.5 hours.",
    src: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    category: "installation",
    title: "Office Block Installation — Damansara",
    desc: "8 units installed across 2 floors. All wiring concealed in casing.",
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "installation",
    title: "Ceiling Cassette — F&B Outlet, Cheras",
    desc: "4HP cassette unit with drain pump and concealed ceiling routing.",
    src: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=800&q=80",
  },
  // ── CHEMICAL WASH ─────────────────────────────────────────────
  {
    id: 4,
    category: "chemical-wash",
    title: "Pressure Chemical Wash — Subang Jaya",
    desc: "High-pressure chemical cleaning removes mould and restores airflow.",
    src: "https://images.unsplash.com/photo-1580595999172-187fe6ccb3bd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    category: "chemical-wash",
    title: "Wall-Mounted Unit Chemical Wash",
    desc: "Before: unit had foul smell and weak cooling. After: fresh air and full cooling restored.",
    src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80",
    before: "https://images.unsplash.com/photo-1621905251189-77e3f4a46fba?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    category: "chemical-wash",
    title: "Coil Cleaning — Petaling Jaya",
    desc: "Evaporator coil chemical treatment eliminates bacteria and mould buildup.",
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
  // ── CHEMICAL OVERHAUL ─────────────────────────────────────────
  {
    id: 7,
    category: "overhaul",
    title: "Chemical Overhaul — Shah Alam",
    desc: "Full unit dismantle and immersion clean. Drain pan and blower completely restored.",
    src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    category: "overhaul",
    title: "Heavy Blockage Cleared — Ampang",
    desc: "Unit had years of buildup causing ice formation. Overhaul resolved completely.",
    src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
  // ── REPAIRS ───────────────────────────────────────────────────
  {
    id: 9,
    category: "repair",
    title: "PCB Board Replacement",
    desc: "Main board replaced with OEM part. Unit restored to full function same day.",
    src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    category: "repair",
    title: "Compressor Fault Diagnosis",
    desc: "Outdoor unit making noise — capacitor identified and replaced within the hour.",
    src: "https://images.unsplash.com/photo-1631545308456-c3e32f5f1abe?auto=format&fit=crop&w=800&q=80",
  },
  // ── COMMERCIAL ────────────────────────────────────────────────
  {
    id: 11,
    category: "commercial",
    title: "Office Block — Kuala Lumpur City Centre",
    desc: "Annual maintenance contract for 22-unit commercial building. Quarterly visits.",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    category: "commercial",
    title: "VRF System — Corporate Office, Bangsar",
    desc: "VRF/VRV multi-split system covering entire floor of 8,000 sq ft office.",
    src: "https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    category: "commercial",
    title: "Retail Outlet — Puchong",
    desc: "4 cassette units for fashion retail outlet. Completed over one weekend.",
    src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
  },
  // ── TECHNICIANS ───────────────────────────────────────────────
  {
    id: 14,
    category: "team",
    title: "Technician at Work — Setapak",
    desc: "Our certified technicians carry full PPE and proper tools on every job.",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    category: "team",
    title: "Installation Team — Kajang",
    desc: "Two-man team ensures clean and efficient installations at any location.",
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  },
];

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "all",           label: "All Projects" },
  { key: "installation",  label: "Installations" },
  { key: "chemical-wash", label: "Chemical Wash" },
  { key: "overhaul",      label: "Overhaul" },
  { key: "repair",        label: "Repairs" },
  { key: "commercial",    label: "Commercial" },
  { key: "team",          label: "Our Team" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

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
      {/* Hero Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">
              Real Projects · Real Results
            </p>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Our Work Gallery
            </h1>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto font-medium">
              Browse our real project photos — installations, chemical wash, overhaul, commercial HVAC, repairs, and our team at work across KL & Selangor.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-full">
                📸 {GALLERY_ITEMS.length}+ Project Photos
              </span>
              <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-full">
                🏙️ KL & Selangor
              </span>
              <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-full">
                ✅ Verified Projects
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
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Before/After badge */}
                      {item.before && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Before / After
                        </span>
                      )}
                      {/* Category badge */}
                      <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {CATEGORIES.find((c) => c.key === item.category)?.label}
                      </span>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-sky-900/0 group-hover:bg-sky-900/20 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                          View Full
                        </span>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="p-4">
                      <p className="font-black text-slate-900 text-sm leading-snug">{item.title}</p>
                      {item.desc && (
                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 font-medium">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {/* Add More Notice for owner */}
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
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-widest text-xs px-7 py-4 rounded-xl shadow-md hover:shadow-green-200 transition-all"
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

            {/* Image */}
            <div className="relative aspect-video bg-slate-900">
              <img
                src={showBefore && currentItem.before ? currentItem.before : currentItem.src}
                alt={currentItem.title}
                className="w-full h-full object-contain"
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
                className="shrink-0 inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all"
              >
                <FaWhatsapp className="h-4 w-4" />
                Book This
              </a>
            </div>
          </div>

          {/* Prev / Next */}
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
