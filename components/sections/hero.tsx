"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";

// Standard direct filenames matrix
const images = [
  "/hero/WhatsApp Image 2026-05-03 at 13.39.35.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.36.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.37.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.38.jpeg"
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden py-10">
      
      {/* Background Bright Slider Matrix */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[current]}
              alt="KL Renovator Professional Aircond Servicing Kuala Lumpur Selangor"
              fill
              priority
              className="object-cover object-[center_20%] opacity-70"
            />
          </motion.div>
        </AnimatePresence>
        {/* Soft bottom-only gradient overlay so text stays readable but image remains perfectly bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
      </div>

      {/* Main Structural Content Layer */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Google Maps Trust Badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-slate-950/80 border border-amber-500/50 px-3 py-1 rounded-full text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-4 shadow-md">
            ⭐ Top Rated 4.9 / 5 on Google Maps Reviews
          </div>
        </Reveal>

        {/* Master H1 Action Hook */}
        <Reveal delay={100}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight max-w-4xl leading-[1.1] text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
            Expert Aircond Services
            <br />
            <span className="text-sky-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">In KL &amp; Selangor</span>
          </h1>
        </Reveal>

        {/* Brand Explainer Mini Copy */}
        <Reveal delay={200}>
          <p className="mt-4 max-w-xl text-xs sm:text-sm text-white bg-slate-950/60 p-3 rounded-xl backdrop-blur-sm leading-relaxed font-bold shadow-lg">
            Premium residential &amp; commercial HVAC solutions by KL Renovator. Specialized pressure chemical wash, chemical overhaul, and precision gas balancing across Klang Valley.
          </p>
        </Reveal>

        {/* Optimized Direct Call-to-Action Panel */}
        <Reveal delay={300}>
          <div className="mt-6 w-full max-w-xs sm:max-w-none flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto font-extrabold uppercase text-xs tracking-wider px-8 h-12 shadow-lg text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-full flex items-center justify-center gap-2 transition-all duration-200"
            >
              <FaWhatsapp className="h-4 w-4" /> Book Via WhatsApp
            </a>
            
            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full sm:w-auto font-extrabold uppercase text-xs tracking-wider px-8 h-12 border border-white/40 bg-slate-950/80 rounded-full text-white hover:bg-slate-900 flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
            >
              <FaPhone className="h-3.5 w-3.5 text-sky-400" /> Call Technician
            </a>
          </div>
        </Reveal>

        {/* 3-Point Fast Local Trust Checklist */}
        <Reveal delay={400}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-6 text-white font-black text-[11px] uppercase tracking-wide bg-slate-950/70 px-4 py-2 rounded-full backdrop-blur-xs shadow-md">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Same-Day Scheduled Visits
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Expert Aircond Technicians
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Transparent Upfront Rates
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
