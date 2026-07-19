"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FiX, FiGift } from "react-icons/fi";
import { waLink } from "@/lib/whatsapp";

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

export function FloatingOfferButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Drifting logic
    if (prefersReducedMotion || isHovered || isOpen) return;

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
  }, [isHovered, isOpen, prefersReducedMotion]);

  const activeZones = isMobile ? MOBILE_ZONES : ZONES;
  const currentZone = activeZones[currentZoneIndex];
  
  const promoMsg = "Hi KL Renovator! I saw your website promotion and would like to claim my 10% OFF voucher (Promo Code: WELCOME10) for aircond servicing. Please let me know available slots.";

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed z-40"
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
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-sky-900 shadow-xl ring-1 ring-sky-100 transition-all hover:scale-105 hover:bg-sky-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              aria-label="Open 10% Off Offer"
            >
              <span className="flex items-center justify-center rounded-full bg-sky-500 p-1.5 text-white shadow-inner transition-transform group-hover:rotate-12">
                <FiGift className="h-4 w-4" />
              </span>
              <span className="pr-1 tracking-tight">10% Off</span>
              
              {/* Subtle pulse effect */}
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-sky-400 opacity-20 duration-1000"></span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Close modal"
              >
                <FiX className="h-5 w-5" />
              </button>
              
              <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-sky-100 p-3 text-sky-600">
                <FiGift className="h-6 w-6" />
              </div>
              
              <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
                Get 10% Off Your First Service
              </h3>
              
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                Welcome to KL Renovator! We&apos;re offering new customers a special 10% discount on any standard aircond servicing or repair. Experience our premium service today.
              </p>
              
              <div className="mb-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">Terms & Conditions:</p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>Valid for first-time customers only.</li>
                  <li>Cannot be combined with other offers.</li>
                  <li>Mention this offer when our admin contacts you.</li>
                </ul>
              </div>
              
              <a
                href={waLink(promoMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block w-full rounded-xl bg-sky-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Book Now to Claim
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
