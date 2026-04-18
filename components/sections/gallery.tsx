"use client";

import { useState } from "react";
import { Camera, X, MapPin, ArrowLeft, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";

/**
 * Gallery — swap the `src` values for your own project photos.
 *
 * HOW TO ADD REAL IMAGES:
 *   1. Drop your images into `/public/gallery/` (e.g. `/public/gallery/job-1.jpg`).
 *   2. Update the array below — replace the `src` with the local path
 *      (e.g. "/gallery/job-1.jpg") and update title/location.
 *   3. (Optional) Add or remove entries freely — the grid adapts.
 *
 * You can also keep external URLs (as long as they serve HTTPS).
 */
export type GalleryItem = {
  src: string;
  title: string;
  location: string;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1625834509589-e0a32862d3be?auto=format&fit=crop&w=1200&q=75",
    title: "Split unit installation",
    location: "Mont Kiara, KL",
  },
  {
    src: "https://images.unsplash.com/photo-1635048512731-34ed1bdb0c13?auto=format&fit=crop&w=1200&q=75",
    title: "Chemical wash — 3 units",
    location: "Subang Jaya",
  },
  {
    src: "https://images.unsplash.com/photo-1631545308456-c3e32f5f1abe?auto=format&fit=crop&w=1200&q=75",
    title: "Gas top-up & diagnosis",
    location: "Damansara",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=75",
    title: "Ceiling cassette install",
    location: "Puchong Jaya",
  },
  {
    src: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=75",
    title: "Condo installation",
    location: "Bangsar South",
  },
  {
    src: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?auto=format&fit=crop&w=1200&q=75",
    title: "Dismantle & relocation",
    location: "Shah Alam → Cheras",
  },
  {
    src: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?auto=format&fit=crop&w=1200&q=75",
    title: "Office cassette maintenance",
    location: "KLCC",
  },
  {
    src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=75",
    title: "Daikin inverter install",
    location: "Kajang",
  },
];

export const Gallery = () => {
  const [active, setActive] = useState<number | null>(null);

  const next = () =>
    setActive((i) => (i === null ? null : (i + 1) % galleryItems.length));
  const prev = () =>
    setActive((i) =>
      i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length,
    );

  return (
    <section
      id="gallery"
      className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300">
              <Camera className="h-3.5 w-3.5" />
              Our Recent Projects
            </div>
            <h2 className="mt-4">
              <span className={title({ size: "md" })}>Real jobs, real </span>
              <span className={title({ size: "md", color: "brand" })}>
                happy customers.
              </span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              A look at some of our recent installations, chemical washes, and
              repairs across KL &amp; Selangor.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {galleryItems.map((item, i) => (
            <Reveal key={item.src} delay={i * 40}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative w-full aspect-square overflow-hidden rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800 bg-slate-200 dark:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback SVG tile so broken images don't show blank
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                  <p className="text-xs font-bold text-white truncate">
                    {item.title}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/80">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            💡 Tip: Replace the images in{" "}
            <code className="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-[11px]">
              components/sections/gallery.tsx
            </code>{" "}
            — see the top of the file for step-by-step instructions.
          </p>
        </Reveal>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
            aria-label="Close"
            onClick={() => setActive(null)}
          />
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-3 sm:left-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-3 sm:right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative max-w-5xl w-full">
            <img
              src={galleryItems[active].src}
              alt={galleryItems[active].title}
              className="w-full max-h-[82vh] object-contain rounded-2xl"
            />
            <div className="mt-3 text-center text-white">
              <p className="text-base font-bold">
                {galleryItems[active].title}
              </p>
              <p className="mt-0.5 flex items-center justify-center gap-1 text-sm text-white/80">
                <MapPin className="h-3.5 w-3.5" />
                {galleryItems[active].location}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
