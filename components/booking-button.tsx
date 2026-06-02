"use client";

import clsx from "clsx";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg, rfqMsgForService } from "@/lib/whatsapp";

type Props = {
  serviceName?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  variant?: "rfq" | "call" | "both";
  className?: string;
  label?: string;
};

export const BookingButton = ({
  serviceName,
  size = "md",
  fullWidth,
  variant = "both",
  className,
  label,
}: Props) => {
  const msg = serviceName ? rfqMsgForService(serviceName) : rfqMsg;

  const sizeCls =
    size === "sm"
      ? "px-4 py-2.5 text-xs tracking-wider rounded-lg"
      : size === "lg"
        ? "px-8 py-4 text-base tracking-wide rounded-xl"
        : "px-6 py-3.5 text-sm tracking-wide rounded-xl";

  return (
    <div
      className={clsx(
        "flex gap-3",
        fullWidth ? "w-full" : "flex-wrap items-center",
        className,
      )}
    >
      {/* 1. Pure WhatsApp Green Action Button for Extreme Conversion Trust */}
      {(variant === "rfq" || variant === "both") && (
        <a
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] font-black text-white active:scale-[0.97] transition-all uppercase shadow-md shadow-green-500/10 hover:shadow-lg hover:shadow-green-500/20",
            sizeCls,
            fullWidth && "flex-1",
          )}
        >
          <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          {label ?? "Book Via WhatsApp"}
        </a>
      )}

      {/* 2. Pro Cooling Blue Telephone Call Button with Active State Feedback */}
      {(variant === "call" || variant === "both") && (
        <a
          href={`tel:${siteConfig.phone}`}
          className={clsx(
            "inline-flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] font-black text-white active:scale-[0.97] transition-all uppercase shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20",
            sizeCls,
            fullWidth && "flex-1",
          )}
        >
          <FaPhoneAlt className="h-3.5 w-3.5" />
          Call Now
        </a>
      )}
    </div>
  );
};
