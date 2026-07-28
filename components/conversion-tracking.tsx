"use client";

import { useEffect } from "react";

import { trackWhatsAppClick, trackCallClick } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────
// Global click tracker for WhatsApp and phone CTAs.
//
// The site has ~15 WhatsApp links and ~6 tel: links on a single installation
// page, spread across many separate components (hero, CRO module, trust
// signals, sticky bar, exit popup, footer...). Wiring an onClick into every
// one of them would be invasive and easy to miss.
//
// Instead this mounts one capture-phase listener on <body> and attributes
// any wa.me / tel: click automatically — including links rendered by SERVER
// components, which cannot carry onClick handlers at all. That last point
// matters: most installation CTAs are server-rendered.
// ─────────────────────────────────────────────────────────────────────────

/** Nearest meaningful section id/heading, so events say WHERE the click was. */
function describeContext(anchor: HTMLAnchorElement): string {
  const section = anchor.closest("section[id]");
  if (section?.id) return section.id;

  const heading = anchor.closest("section")?.querySelector("h2, h1");
  const text = heading?.textContent?.trim().slice(0, 60);
  return text || "unknown";
}

export function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";

      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        trackWhatsAppClick(describeContext(anchor), {
          link_text: anchor.textContent?.trim().slice(0, 50) || "",
        });
        return;
      }

      if (href.startsWith("tel:")) {
        trackCallClick(describeContext(anchor), {
          link_text: anchor.textContent?.trim().slice(0, 50) || "",
        });
      }
    };

    // Capture phase so we still record the click even if a handler further
    // down calls stopPropagation().
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
