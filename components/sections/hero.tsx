"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp, FaPhone, FaStar } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";

// Each image paired with a unique, keyword-rich alt tag for SEO & accessibility
const HERO_IMAGES = [
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.24.jpeg",
    alt: "KL Renovator technician performing aircond chemical wash Kuala Lumpur",
  },
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.25.jpeg",
    alt: "Professional aircond installation wall-mounted unit Selangor",
  },
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.26.jpeg",
    alt: "Aircond chemical overhaul deep cleaning indoor unit KL",
  },
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.27.jpeg",
    alt: "HVAC technician gas top-up R32 R410A refrigerant Klang Valley",
  },
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.29.jpeg",
    alt: "Aircond repair troubleshooting outdoor unit Petaling Jaya",
  },
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.30.jpeg",
    alt: "Pressure chemical wash high-pressure rinse evaporator coil Selangor",
  },
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.32.jpeg",
    alt: "Daikin Panasonic Mitsubishi aircond servicing Cheras Ampang",
  },
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.33.jpeg",
    alt: "Ceiling cassette aircond service commercial office KL Selangor",
  },
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.34.jpeg",
    alt: "New aircond unit installation copper pipe routing Shah Alam Subang",
  },
  {
    src: "/hero/WhatsApp Image 2026-05-03 at 13.39.35.jpeg",
    alt: "KL Renovator completed aircond project satisfied customer Klang Valley",
  },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-900">

      {/* ── Background Slideshow ─────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[current].src}
              alt={HERO_IMAGES[current].alt}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover object-center"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* ✅ LIGHTER overlay — images clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/30 z-10" />
        {/* Bottom fade for text area */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/60 to-transparent z-10" />
      </div>

      {/* ── Slide Indicators ─────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}: ${HERO_IMAGES[i].alt}`}
          />
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-2xl">

          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 mb-6"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="h-3 w-3 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-white/90">
              {t("hero_badge")}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]"
          >
            {t("hero_h1_line1")}
            <br />
            <span className="text-sky-400">{t("hero_h1_line2")}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-5 text-sm sm:text-base text-white/85 font-medium leading-relaxed max-w-xl"
          >
            {t("hero_desc")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
          >
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all duration-200 active:scale-[0.97]"
            >
              <FaWhatsapp className="h-5 w-5" />
              {t("hero_whatsapp")}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all duration-200"
            >
              <FaPhone className="h-4 w-4 text-sky-300" />
              {t("hero_call")}
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {[t("hero_trust1"), t("hero_trust2"), t("hero_trust3")].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white/90"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
