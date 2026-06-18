"use client";
import clsx from "clsx";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg, rfqMsgForService } from "@/lib/whatsapp";

interface BookingButtonProps {
  serviceName?: string;
  variant?: "primary" | "secondary" | "outline" | "whatsapp" | "phone";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
  areaName?: string; // NEW: Area name pass karne ke liye
}

export const BookingButton = ({
  serviceName,
  variant = "primary",
  size = "md",
  className,
  fullWidth = false,
  areaName,
}: BookingButtonProps) => {
  
  // Smart Message Logic
  let finalLink = waLink(rfqMsg);
  
  if (serviceName && areaName) {
    // Agar Area aur Service dono hain
    finalLink = waLink(`Hi KL Renovator, I need ${serviceName} in ${areaName}. Please advise on pricing and availability.`);
  } else if (serviceName) {
    // Agar sirf Service hai
    finalLink = waLink(rfqMsgForService(serviceName));
  } else if (areaName) {
    // Agar sirf Area hai (Area pages ke liye)
    finalLink = waLink(`Hi KL Renovator, I need aircond service in ${areaName}. Please advise.`);
  }

  return (
    <div className={clsx("flex flex-wrap items-center gap-3", fullWidth && "w-full", className)}>
      {variant === "phone" ? (
        <a
          href={`tel:${siteConfig.phone}`}
          className={clsx(
            "inline-flex items-center justify-center font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white shadow-sm",
            size === "sm" && "px-3.5 py-2 text-[11px]",
            size === "md" && "px-5 py-3 text-xs",
            size === "lg" && "px-7 py-4 text-sm",
            fullWidth && "w-full"
          )}
        >
          <FaPhone className="mr-2 h-3.5 w-3.5 shrink-0 text-[#0284c7]" />
          Call Hotline
        </a>
      ) : (
        <a
          href={finalLink}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center justify-center font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 text-white shadow-md",
            variant === "primary" && "bg-slate-950 hover:bg-slate-900 shadow-slate-950/10",
            variant === "secondary" && "bg-[#0284c7] hover:bg-[#0369a1] shadow-sky-500/10",
            variant === "whatsapp" && "bg-[#22c55e] hover:bg-[#16a34a] shadow-green-500/10",
            size === "sm" && "px-3.5 py-2 text-[11px]",
            size === "md" && "px-5 py-3 text-xs",
            size === "lg" && "px-7 py-4 text-sm",
            fullWidth && "w-full"
          )}
        >
          <FaWhatsapp className="mr-2 h-4 w-4 shrink-0" />
          Book Aircond Service
        </a>
      )}
    </div>
  );
};
