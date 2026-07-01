"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaGift, FaXmark, FaMinus, FaGripLines, FaCircleCheck, FaShieldHalved } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

/**
 * Round 2.7: Floating Promotional & Servicing Trust Widgets
 * 
 * Features:
 * - Draggable via Pointer Events (works smoothly on Desktop mouse & Mobile touch)
 * - Remembers position for the current session via sessionStorage
 * - Gentle screen boundary clamping so it never gets dragged off-screen
 * - Minifiable to a sleek floating badge or fully dismissible
 * - Premium Glassmorphism UI (light/dark mode compatible)
 * - Lightweight & accessible (Core Web Vitals optimized)
 */
export function FloatingPromoWidgets() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Position coordinates { x, y } in pixels relative to bottom-left corner
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [isDragging, setIsDragging] = useState(false);

  // Refs for tracking drag deltas safely without stale closures
  const widgetRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ clientX: number; clientY: number; startX: number; startY: number }>({
    clientX: 0,
    clientY: 0,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    setIsMounted(true);
    try {
      const closed = sessionStorage.getItem("klrenovator_promo_closed");
      if (closed === "true") {
        setIsClosed(true);
        return;
      }
      const minimized = sessionStorage.getItem("klrenovator_promo_minimized");
      if (minimized === "true") {
        setIsMinimized(true);
      }
      const savedPos = sessionStorage.getItem("klrenovator_promo_pos");
      if (savedPos) {
        const parsed = JSON.parse(savedPos);
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          setPosition(parsed);
        }
      }
    } catch {
      // Ignore storage errors on restricted environments
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag when clicking the drag handle or card header area
    if ((e.target as HTMLElement).closest("button, a")) return;

    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startX: position.x,
      startY: position.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.clientX;
    // Y delta is inverted because position.y is offset from bottom
    const deltaY = dragStartRef.current.clientY - e.clientY;

    let newX = dragStartRef.current.startX + deltaX;
    let newY = dragStartRef.current.startY + deltaY;

    // Gentle boundary snap inside window viewport
    const maxX = typeof window !== "undefined" ? window.innerWidth - (widgetRef.current?.offsetWidth || 300) - 16 : 500;
    const maxY = typeof window !== "undefined" ? window.innerHeight - (widgetRef.current?.offsetHeight || 200) - 16 : 600;

    newX = Math.max(12, Math.min(newX, Math.max(12, maxX)));
    newY = Math.max(12, Math.min(newY, Math.max(12, maxY)));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
      sessionStorage.getItem("klrenovator_promo_pos"); // check availability
      sessionStorage.setItem("klrenovator_promo_pos", JSON.stringify(position));
    } catch {
      // Ignore
    }
  };

  const toggleMinimize = () => {
    const next = !isMinimized;
    setIsMinimized(next);
    try {
      sessionStorage.setItem("klrenovator_promo_minimized", String(next));
    } catch {
      // Ignore
    }
  };

  const handleClose = () => {
    setIsClosed(true);
    try {
      sessionStorage.setItem("klrenovator_promo_closed", "true");
    } catch {
      // Ignore
    }
  };

  if (!isMounted || isClosed) return null;

  const promoMsg = "Hi KL Renovator! I saw your website promotion and would like to claim my 10% OFF voucher (Promo Code: WELCOME10) for aircond servicing. Please let me know available slots.";

  return (
    <div
      ref={widgetRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        left: `${position.x}px`,
        bottom: `${position.y}px`,
      }}
      className={`fixed z-40 select-none transition-shadow print:hidden ${
        isDragging ? "cursor-grabbing scale-[1.01] shadow-2xl" : "cursor-grab shadow-xl"
      }`}
    >
      {/* Minimized Pill Badge */}
      {isMinimized ? (
        <div className="flex items-center gap-2.5 rounded-full border border-sky-200/60 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-md transition-transform hover:scale-105 dark:border-slate-700/80 dark:bg-slate-900/95">
          <FaGripLines className="h-3.5 w-3.5 text-slate-400" title="Drag to reposition" />
          <button
            type="button"
            onClick={toggleMinimize}
            className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300">
              <FaGift className="h-3 w-3 animate-pulse" />
            </span>
            <span>Claim 10% OFF Special</span>
          </button>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close widget"
            className="ml-1 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <FaXmark className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        /* Full Expanded Glassmorphism Promo Card */
        <div className="w-[310px] sm:w-[330px] overflow-hidden rounded-2xl border border-sky-100/80 bg-white/95 p-4 shadow-[0_12px_40px_-12px_rgba(2,132,199,0.3)] backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/95">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <FaGripLines className="h-3.5 w-3.5 text-slate-400" />
              <span>Limited Time Offer</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleMinimize}
                aria-label="Minimize widget"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <FaMinus className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close widget"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <FaXmark className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="py-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/20">
                <FaGift className="h-5 w-5 animate-bounce" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                  Get 10% OFF Your First Service!
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Book any AC cleaning, chemical overhaul or repair today. Valid across KL &amp; Selangor.
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1">
                <FaCircleCheck className="text-emerald-500" /> RM199 Base Install
              </span>
              <span className="inline-flex items-center gap-1">
                <FaShieldHalved className="text-sky-500" /> 1-Month Warranty
              </span>
            </div>
          </div>

          {/* Action Button */}
          <a
            href={waLink(promoMsg)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-black tracking-wide text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-[#1ebe5d] active:scale-[0.98]"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span>CLAIM 10% VOUCHER ON WHATSAPP</span>
          </a>

          {/* Drag instruction note */}
          <div className="mt-2 text-center text-[10px] font-medium text-slate-400">
            💡 Touch &amp; drag anywhere to reposition
          </div>
        </div>
      )}
    </div>
  );
}
