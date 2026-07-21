"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp, FaPhone, FaStar } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";

// SEO-optimised filenames — keyword-rich, no date-stamps
const HERO_IMAGES = [
  {
    src: "/hero/aircond-installation-kuala-lumpur.webp",
    alt: "KL Renovator technician performing professional aircond installation Kuala Lumpur",
  },
  {
    src: "/hero/aircond-installation-wall-mounted-kl.webp",
    alt: "Professional wall-mounted aircond installation service KL Renovator Selangor",
  },
  {
    src: "/hero/aircond-pressure-chemical-wash-selangor.webp",
    alt: "Aircond pressure chemical wash deep cleaning indoor unit Selangor",
  },
  {
    src: "/hero/aircond-repair-technician-klang-valley.webp",
    alt: "HVAC technician aircond repair troubleshooting Klang Valley KL Renovator",
  },
  {
    src: "/hero/aircond-compressor-flaring-repair-kl.webp",
    alt: "Aircond compressor copper pipe flaring repair Kuala Lumpur",
  },
  {
    src: "/hero/aircond-gas-topup-r32-r410a-selangor.webp",
    alt: "Aircond gas top-up R32 R410A R22 refrigerant balancing Selangor",
  },
  {
    src: "/hero/aircond-pcb-board-replacement-kl.webp",
    alt: "Daikin Panasonic Mitsubishi aircond PCB board replacement Kuala Lumpur",
  },
  {
    src: "/hero/aircond-installation-ampang-selangor.webp",
    alt: "Ceiling cassette aircond installation commercial office Ampang Selangor",
  },
  {
    src: "/hero/aircond-bracket-installation-kl-renovator.webp",
    alt: "Aircond outdoor bracket installation copper pipe routing Shah Alam Subang",
  },
  {
    src: "/hero/aircond-sensor-replacement-klang-valley.webp",
    alt: "KL Renovator aircond temperature sensor replacement Klang Valley Malaysia",
  },
];

// Round 16 / 20H.80 — keep the LCP image predictable on mobile:
// - `svh` avoids mobile browser address-bar vh jumps.
// - 360/414px device sizes are added in next.config.mjs, so this `sizes`
//   string can now select a true phone-sized image instead of 640px+.
// - tiny neutral blur placeholder prevents a blank flash without layout shift.
const HERO_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px";
const HERO_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMjgnIHZpZXdCb3g9JzAgMCAxNiAyOCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBzdG9wLWNvbG9yPScjMGYxNzJhJy8+PHN0b3Agb2Zmc2V0PScxJyBzdG9wLWNvbG9yPScjMDI4NGM3Jy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzI4JyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+";

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const { t } = useLang();

  const setSlide = (next: number) => {
    setCurrent((prev) => {
      if (prev !== next) setPrevious(prev);
      return next;
    });
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => {
        setPrevious(prev);
        return (prev + 1) % HERO_IMAGES.length;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (previous === null) return;
    const t = window.setTimeout(() => setPrevious(null), 900);
    return () => window.clearTimeout(t);
  }, [previous]);

  const currentImage = HERO_IMAGES[current];
  const previousImage = previous === null ? null : HERO_IMAGES[previous];

  return (
    <section className="relative w-full min-h-[calc(100svh-5rem)] sm:min-h-[calc(100svh-7rem)] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background slideshow — CSS-only transition, no framer-motion runtime */}
      <div className="absolute inset-0 z-0">
        {previousImage && (
          <Image
            key={`prev-${previous}`}
            src={previousImage.src}
            alt={previousImage.alt}
            fill
            sizes={HERO_IMAGE_SIZES}
            className="object-cover object-center opacity-0 transition-opacity duration-700 ease-in-out"
            loading="lazy"
            decoding="async"
            placeholder="blur"
            blurDataURL={HERO_BLUR_DATA_URL}
            quality={76}
          />
        )}
        <Image
          key={`current-${current}`}
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          priority={current === 0}
          loading={current === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={current === 0 ? "high" : "auto"}
          sizes={HERO_IMAGE_SIZES}
          className="object-cover object-center opacity-100 transition-opacity duration-700 ease-in-out"
          placeholder="blur"
          blurDataURL={HERO_BLUR_DATA_URL}
          quality={76}
        />

        {/* Lighter overlay — images clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/30 z-10" />
        {/* Bottom fade for text area */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/60 to-transparent z-10" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}: ${HERO_IMAGES[i].alt}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-2xl animate-[fade-up_0.7s_ease-out_both]">
          {/* Rating badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 mb-6">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="h-3 w-3 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-white/90">
              {t("hero_badge")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
            {t("hero_h1_line1")}
            <br />
            <span className="text-sky-400">{t("hero_h1_line2")}</span>
          </h1>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-base text-white/85 font-medium leading-relaxed max-w-xl">
            {t("hero_desc")}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="nofollow noopener noreferrer"
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
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[t("hero_trust1"), t("hero_trust2"), t("hero_trust3")].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white/90"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
