"use client";

import { MessageCircle, Phone } from "lucide-react";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

type Props = {
  serviceName?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  variant?: "whatsapp" | "call" | "both";
  className?: string;
};

export const BookingButton = ({
  serviceName,
  size = "md",
  fullWidth,
  variant = "both",
  className,
}: Props) => {
  const msg = serviceName
    ? `Hi Klrenovator, I'd like to book "${serviceName}". Please share the next available slot and price. Thanks!`
    : `Hi Klrenovator, I'd like to book an aircon service. Please share the next available slot. Thanks!`;

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
      {(variant === "whatsapp" || variant === "both") && (
        <a
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center justify-center gap-2 rounded-lg bg-[rgb(var(--color-whatsapp))] font-semibold text-white shadow-md shadow-emerald-600/20 hover:brightness-110 active:scale-[0.98] transition",
            sizeCls,
            fullWidth && "flex-1",
          )}
        >
          <MessageCircle className="h-4 w-4" fill="currentColor" />
          WhatsApp Quote
        </a>
      )}
      {(variant === "call" || variant === "both") && (
        <a
          href={`tel:${siteConfig.phone}`}
          className={clsx(
            "inline-flex items-center justify-center gap-2 rounded-lg border border-brand-600 text-brand-700 dark:text-brand-300 dark:border-brand-500 font-semibold hover:bg-brand-50 dark:hover:bg-slate-800 active:scale-[0.98] transition",
            sizeCls,
            fullWidth && "flex-1",
          )}
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      )}
    </div>
  );
};
