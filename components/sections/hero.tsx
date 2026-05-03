"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt, FaCheck, FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";

const HERO_IMAGES = [
  "/hero/WhatsApp Image 2026-05-03 at 13.39.29.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.32.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.33.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.34.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.35.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.30.jpeg",
];

const TRUST_POINTS = [
  "Same-day booking",
  "Licensed technicians",
  "Transparent pricing",
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  const next = () => setIndex((i) => (i + 1) % HERO_IMAGES.length);
  const prev = () =>
    setIndex((i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  return (
    <section className="relative isolate overflow-hidden bg-brand-950 min-h-[600px] sm:min-h-[700px] lg:min-h-[760px]">
      {/* Carousel layer */}
      <div className="absolute inset-0 -z-20">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 -z-10 hero-overlay" aria-hidden />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-24 sm:pb-32">
        <Reveal>
          <div className="inline-flex items-center gap-2 border border-white/30 bg-black/30 px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white">
            <FaStar className="h-3 w-3 text-amber-300" />
            Rated 4.9 / 5 by 500+ customers
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-6 max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
            Reliable Aircon Services
            <br />
            <span className="text-brand-300">Across KL &amp; Selangor.</span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-5 max-w-2xl text-sm sm:text-lg text-slate-200 leading-relaxed">
            Professional installation, chemical wash, repair &amp; gas top-up.
            Licensed technicians. Honest pricing. Same-day service.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 px-6 sm:px-7 py-4 text-base font-bold text-white shadow-2xl shadow-black/50 transition uppercase tracking-wide"
            >
              <FaWhatsapp className="h-5 w-5" />
              Request a Quote
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 px-6 sm:px-7 py-4 text-base font-bold text-black transition uppercase tracking-wide"
            >
              <FaPhoneAlt className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white">
            {TRUST_POINTS.map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center bg-brand-500 text-white">
                  <FaCheck className="h-3 w-3" />
                </span>
                <span className="font-semibold">{t}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Carousel controls + dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-end justify-between gap-4">
          <div className="flex items-center gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1 transition-all ${
                  i === index ? "w-10 bg-brand-400" : "w-6 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              aria-label="Previous slide"
              onClick={prev}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next slide"
              onClick={next}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
