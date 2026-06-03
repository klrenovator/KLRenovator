"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { useLang } from "@/context/language-context";

// ✅ FIXED: Using actual filenames that exist in /public/hero/
const HERO_IMAGES = [
  "/hero/WhatsApp Image 2026-05-03 at 13.39.24.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.25.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.26.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.27.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.29.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.30.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.32.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.33.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.34.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.35.jpeg",
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[88vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden">

      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={HERO_IMAGES[current]}
              alt="KL Renovator Professional Aircond Servicing Kuala Lumpur Selangor"
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/80 z-10" />
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center py-16">

        <Reveal>
          <div className="inline-flex items-center gap-2 bg-slate-950/80 border border-amber-500/60 px-4 py-1.5 text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-widest mb-6 shadow-2xl">
            {t("hero_badge")}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight max-w-4xl leading-[1.15] text-white drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
            {t("hero_h1_line1")}
            <br />
            <span className="text-sky-400 drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">
              {t("hero_h1_line2")}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-xs sm:text-sm text-white/90 font-semibold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-4 bg-slate-950/60 py-3 border border-white/10 shadow-2xl backdrop-blur-sm">
            {t("hero_desc")}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 w-full max-w-sm flex flex-col items-center justify-center gap-3 px-4">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full font-black uppercase text-sm tracking-widest h-14 shadow-2xl text-white bg-[#22c55e] hover:bg-[#16a34a] flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.97]"
            >
              <FaWhatsapp className="h-5 w-5" /> {t("hero_whatsapp")}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full font-black uppercase text-sm tracking-widest h-14 border-2 border-white/50 bg-slate-950/70 backdrop-blur-sm text-white hover:bg-white/10 flex items-center justify-center gap-2.5 transition-all duration-200 shadow-2xl"
            >
              <FaPhone className="h-4 w-4 text-sky-400" /> {t("hero_call")}
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white font-black text-xs uppercase tracking-wider bg-slate-950/70 px-5 py-3 border border-white/10 shadow-2xl backdrop-blur-sm">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> {t("hero_trust1")}
            </span>
            <span className="text-white/30 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> {t("hero_trust2")}
            </span>
            <span className="text-white/30 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> {t("hero_trust3")}
            </span>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
