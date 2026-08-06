"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/language-context";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const TEXT = {
  en: "📅 Check Live Slots & Book",
  ms: "📅 Semak Slot Tersedia & Tempah",
  zh: "📅 查看空档并预约",
};

// 4 Safe zones for drifting (relative to the viewport center)
const ZONES = [
  { x: "-35vw", y: "-25vh" }, // Upper Left
  { x: "35vw", y: "-25vh" },  // Upper Right
  { x: "-35vw", y: "25vh" },  // Lower Left
  { x: "35vw", y: "25vh" },   // Lower Right
];

// For mobile, tighter zones
const MOBILE_ZONES = [
  { x: "-25vw", y: "-35vh" }, // Upper Left
  { x: "25vw", y: "-35vh" },  // Upper Right
  { x: "-25vw", y: "35vh" },  // Lower Left
  { x: "25vw", y: "35vh" },   // Lower Right
];

export function FloatingBookingButton() {
  const { lang } = useLang();
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Drifting logic
    if (prefersReducedMotion || isHovered) return;

    const interval = setInterval(() => {
      setCurrentZoneIndex((prev) => {
        // Pick a random next zone that is not the current one
        let next = prev;
        while (next === prev) {
          next = Math.floor(Math.random() * 4);
        }
        return next;
      });
    }, 6000); // Change position every 6 seconds

    return () => clearInterval(interval);
  }, [isHovered, prefersReducedMotion]);

  if (!isMounted) return null;

  const activeZones = isMobile ? MOBILE_ZONES : ZONES;
  const currentZone = activeZones[currentZoneIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-[100]"
        style={{
          top: "50%",
          left: "50%",
          // Offset by 50% so coordinates act from center
          x: "-50%",
          y: "-50%",
        }}
        animate={
          prefersReducedMotion
            ? { x: "-50%", y: "40vh" } // Fixed position bottom center if reduced motion
            : {
                x: `calc(-50% + ${currentZone.x})`,
                y: `calc(-50% + ${currentZone.y})`,
              }
        }
        transition={{
          duration: 8,
          ease: "easeInOut",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <button
          onClick={() => router.push("/book")}
          className="group relative flex items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm sm:text-base px-5 py-3 sm:px-6 sm:py-3.5 shadow-2xl border border-slate-700/80 hover:bg-slate-800 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 touch-manipulation"
          aria-label="Check Live Slots and Book"
        >
          {/* Subtle Pulse Glow */}
          <span className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-70 animate-pulse transition duration-500 -z-10"></span>

          <span className="flex items-center gap-2 relative z-10">
            {TEXT[lang as keyof typeof TEXT] || TEXT.en}
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
