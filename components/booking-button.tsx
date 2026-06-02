"use client";

import { FaWhatsapp } from "react-icons/fa6";

import { waLink, rfqMsg } from "@/lib/whatsapp";

interface BookingButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BookingButton = ({ className = "", size = "md" }: BookingButtonProps) => {
  // Dynamic size matrix for high-conversion design
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-xs sm:text-sm",
    lg: "px-8 py-4 text-sm sm:text-base",
  };

  return (
    <a
      href={waLink(rfqMsg)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-green-500/10 hover:shadow-green-500/20 transition-all active:scale-[0.98] ${sizeClasses[size]} ${className}`}
    >
      <FaWhatsapp className="h-4 w-4 shrink-0" />
      <span>Book Aircond Service</span>
    </a>
  );
};
