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
  "Same-Day Scheduled Visits",
  "Expert Aircond Technicians",
  "Transparent Upfront Rates",
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
    <section className="relative isolate overflow-hidden bg-slate-950 min-h-[620px] sm:min-h-[720px] lg:min-h-[780px]">
      {/* Dynamic Background Image Slider Stack */}
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
              alt="KL Renovator Professional Commercial and Residential Aircond Engineering Works"
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.85]"
            />
          </div>
        ))}
      </div>

      {/* Solid High-Contrast Vignette Film Overlay for Text Extraction */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent sm:bg-gradient-to-b sm:from-slate-950/50 sm:via-slate-950/70 sm:to-slate-950" aria-hidden />

      {/* Main Structural Content Grid */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-28 sm:pb-36 flex flex-col justify-center min-h-[620px] sm:min-h-[720px] lg:min-h-[780px]">
        
        {/* Verified Google Badge Matrix */}
        <div className="flex">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest text-white shadow-xl">
              <FaStar className="h-3.5 w-3.5 text-amber-400" />
              <span>Top Rated 4.9 / 5 On Google Maps Reviews</span>
            </div>
          </Reveal>
        </div>

        {/* The Golden GEO SEO Keyword Rich H1 Title */}
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white uppercase">
            Expert Aircond Services
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">
              In KL &amp; Selangor
            </span>
          </h1>
        </Reveal>

        {/* Fact-Dense Answer-First Value Proposition */}
        <Reveal delay={180}>
          <p className="mt-5 max-w-2xl text-sm sm:text-lg text-slate-300 font-medium leading-relaxed">
            Premium residential and commercial HVAC solutions by KL Renovator. Specialist pressure chemical wash, chemical overhaul, precision troubleshooting, leak repairs, and gas balancing. Rapid response teams across Klang Valley.
          </p>
        </Reveal>

        {/* Double High-Conversion Trigger Actions */}
        <Reveal delay={260}>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-md sm:max-w-none">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-xl shadow-green-500/20 transition-all active:scale-95"
            >
              <FaWhatsapp className="h-5 w-5" />
              Book via WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2.5 border border-white/20 hover:border-white bg-white/10 hover:bg-white text-white hover:text-slate-950 backdrop-blur-sm px-8 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-lg"
            >
              <FaPhoneAlt className="h-3.5 w-3.5 text-sky-400 group-hover:text-slate-950" />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </Reveal>

        {/* Horizontal Semantic Trust Engine Checks */}
        <Reveal delay={340}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-wider text-slate-300">
            {TRUST_POINTS.map((t) => (
              <span key={t} className="inline-flex items-center gap-2 font-bold">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#22c55e]/20 border border-[#22c55e]/30 text-[#22c55e]">
                  <FaCheck className="h-2.5 w-2.5" />
                </span>
                <span>{t}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Absolute Slide Control Interactivity Panels */}
      <div className="absolute bottom-6 left-0 right-0 z-10 hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/5">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                aria-label={`Navigate to aircond slider view node ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all rounded-full ${
                  i === index ? "w-8 bg-sky-400" : "w-3 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous slider scene"
              onClick={prev}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-slate-950/40 backdrop-blur-md text-white hover:bg-white hover:text-slate-950 rounded-xl transition-all active:scale-95"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next slider scene"
              onClick={next}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-slate-950/40 backdrop-blur-md text-white hover:bg-white hover:text-slate-950 rounded-xl transition-all active:scale-95"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
