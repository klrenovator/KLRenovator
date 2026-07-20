"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/language-context";
import clsx from "clsx";

const TEXT = {
  en: "📅 Check Live Slots & Book",
  ms: "📅 Semak Slot Tersedia & Tempah",
  zh: "📅 查看空档并预约",
};

export function FloatingBookingButton() {
  const { lang } = useLang();
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0, elemX: 0, elemY: 0 });
  const hasMoved = useRef(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("klr_booking_pos");
    if (saved) {
      try {
        setPosition(JSON.parse(saved));
      } catch (e) {}
    } else {
      // Default to bottom right area
      setTimeout(() => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const btnW = buttonRef.current?.offsetWidth || 240;
        const btnH = buttonRef.current?.offsetHeight || 50;
        const margin = 20;

        setPosition({
          x: screenW - btnW - margin,
          y: screenH - btnH - margin - 80, // Offset to avoid overlapping bottom menus
        });
      }, 100);
    }
  }, []);

  // Window resize observer to keep button on screen
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const btnW = buttonRef.current?.offsetWidth || 240;
        const btnH = buttonRef.current?.offsetHeight || 50;
        const margin = 20;

        let newX = prev.x;
        let newY = prev.y;

        // Clamp to edges
        if (newX + btnW > screenW) newX = screenW - btnW - margin;
        if (newY + btnH > screenH) newY = screenH - btnH - margin;
        if (newX < margin) newX = margin;
        if (newY < margin) newY = margin;

        return { x: newX, y: newY };
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    // Only trigger drag on primary touch or left mouse click
    if (e.pointerType === "mouse" && e.button !== 0) return;

    setIsDragging(true);
    hasMoved.current = false;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      elemX: position.x,
      elemY: position.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    // Threshold to differentiate click vs drag
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasMoved.current = true;
    }

    setPosition({
      x: dragStart.current.elemX + dx,
      y: dragStart.current.elemY + dy,
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);

    // Snap to nearest edge (left or right)
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const btnW = buttonRef.current?.offsetWidth || 240;
    const btnH = buttonRef.current?.offsetHeight || 50;
    const margin = 20;

    const centerX = position.x + btnW / 2;
    let finalX = centerX < screenW / 2 ? margin : screenW - btnW - margin;
    let finalY = Math.max(margin, Math.min(position.y, screenH - btnH - margin));

    setPosition({ x: finalX, y: finalY });
    
    // Save new position
    localStorage.setItem("klr_booking_pos", JSON.stringify({ x: finalX, y: finalY }));
  };

  const onClick = () => {
    if (!hasMoved.current) {
      router.push("/book");
    }
  };

  if (!isMounted) return null;

  return (
    <div
      ref={buttonRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={onClick}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      className={clsx(
        "fixed top-0 left-0 z-[100] flex items-center justify-center touch-none select-none",
        isDragging ? "cursor-grabbing transition-none" : "cursor-grab transition-transform duration-300 ease-out"
      )}
      aria-label="Check Live Slots and Book"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          router.push("/book");
        }
      }}
    >
      <div className="relative group">
        {/* Subtle Pulse Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-70 animate-pulse transition duration-500"></div>

        {/* Button Surface */}
        <div className="relative bg-slate-900 text-white font-bold text-sm sm:text-base px-5 py-3 sm:px-6 sm:py-3.5 rounded-full shadow-2xl border border-slate-700/80 flex items-center gap-2 hover:bg-slate-800 transition-colors">
          <span>{TEXT[lang as keyof typeof TEXT] || TEXT.en}</span>
        </div>
      </div>
    </div>
  );
}
