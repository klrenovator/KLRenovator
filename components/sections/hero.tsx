"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";

// Complete Matrix of All 8-10 Project Images with Exact Fallbacks
const images = [
  "/hero/WhatsApp Image 2026-05-03 at 13.39.35.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.36.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.37.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.38.jpeg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.35.jpg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.36.jpg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.37.jpg",
  "/hero/WhatsApp Image 2026-05-03 at 13.39.38.jpg"
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
    <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden py-12">
      
      {/* High-Visibility Bright Slider Control */}
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
              className="object-cover object-[center_25%] opacity-65"
              onError={(e) => {
                // If any image path fails, safely skip to the first valid one so it never turns black
                setCurrent((prev) => (prev + 1) % images.length);
              }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Soft balance gradient - makes text readable without making the background dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/70 z-10" />
      </div>

      {/* Main Structural Content Layer matching Screenshot 1000479402_2.jpg */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Google Maps Trust Badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-4 py-1.5 rounded-xs text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-widest mb-6 shadow-md">
            ⭐ Top Rated 4.9 / 5 on Google Maps Reviews
          </div>
        </Reveal>

        {/* Master H1 Action Hook */}
        <Reveal delay={100}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight max-w-4xl leading-[1.15] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            Expert Aircond Services
            <br />
            <span className="text-sky-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">In KL &amp; Selangor</span>
          </h1>
        </Reveal>

        {/* Brand Explainer Copy */}
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] px-2">
            Premium residential and commercial HVAC solutions by KL Renovator. Specialist pressure chemical wash, chemical overhaul, precision troubleshooting, leak repairs, and gas balancing. Rapid response teams across Klang Valley.
          </p>
        </Reveal>

        {/* Fixed CTA Buttons Area matching Layout */}
        <Reveal delay={300}>
          <div className="mt-8 w-full max-w-md flex flex-col items-center justify-center gap-4 px-4">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full font-bold uppercase text-xs tracking-widest h-14 shadow-xl text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-sm flex items-center justify-center gap-2 transition-all duration-200"
            >
              <FaWhatsapp className="h-5 w-5" /> Book Via WhatsApp
            </a>
            
            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full font-bold uppercase text-xs tracking-widest h-14 border border-white/40 bg-white/10 backdrop-blur-xs rounded-sm text-white hover:bg-white/20 flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"
            >
              <FaPhone className="h-4 w-4 text-sky-400" /> Call +60 18-298 3573
            </a>
          </div>
        </Reveal>

        {/* Trust Checklist Badges */}
        <Reveal delay={400}>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-y-3 gap-x-6 text-white font-bold text-xs uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 bg-emerald-500/20 p-1 rounded-xs border border-emerald-500/30">✓</span> Same-Day Scheduled Visits
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 bg-emerald-500/20 p-1 rounded-xs border border-emerald-500/30">✓</span> Expert Aircond Technicians
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 bg-emerald-500/20 p-1 rounded-xs border border-emerald-500/30">✓</span> Transparent Upfront Rates
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
