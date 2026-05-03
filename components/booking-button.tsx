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
      ? "px-3 py-2 text-sm"
      : size === "lg"
        ? "px-6 py-3.5 text-base"
        : "px-5 py-3 text-sm";

  return (
    <div
      className={clsx(
        "flex gap-3",
        fullWidth ? "w-full" : "flex-wrap",
        className,
      )}
    >
      {(variant === "rfq" || variant === "both") && (
        <a
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center justify-center gap-2 bg-brand-500 font-bold text-white hover:bg-brand-600 active:scale-[0.98] transition uppercase tracking-wide",
            sizeCls,
            fullWidth && "flex-1",
          )}
        >
          <FaWhatsapp className="h-4 w-4" />
          {label ?? "Request a Quote"}
        </a>
      )}
      {(variant === "call" || variant === "both") && (
        <a
          href={`tel:${siteConfig.phone}`}
          className={clsx(
            "inline-flex items-center justify-center gap-2 bg-brand-900 font-bold text-white hover:bg-black active:scale-[0.98] transition uppercase tracking-wide",
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
