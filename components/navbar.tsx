"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { Menu, X, Phone, Snowflake, MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { waLink, defaultWhatsAppMsg } from "@/lib/whatsapp";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-40 w-full transition-all",
        scrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-sm"
          : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-md",
      )}
    >
      {/* Top announcement bar */}
      <div className="hidden sm:block bg-gradient-to-r from-brand-700 via-brand-600 to-[rgb(var(--color-accent-500))] text-white text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-1.5">
          <span className="truncate">
            ⚡ Same-day aircon service across KL &amp; Selangor · 5-star rated
          </span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden md:inline-flex items-center gap-1.5 font-semibold hover:underline"
          >
            <Phone className="h-3 w-3" /> {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <NextLink href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 via-brand-600 to-[rgb(var(--color-accent-500))] text-white shadow-md shadow-brand-600/30">
            <span className="text-sm font-black tracking-tighter">KL</span>
            <Snowflake className="absolute -top-1 -right-1 h-3.5 w-3.5 text-[rgb(var(--color-accent-300))] bg-slate-950 rounded-full p-0.5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              KL Renovator
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-600 dark:text-[rgb(var(--color-accent-400))]">
              Aircon Specialist · KL &amp; Selangor
            </span>
          </span>
        </NextLink>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <NextLink
                href={l.href}
                className="inline-flex rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
              >
                {l.label}
              </NextLink>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2">
          <ThemeSwitch />
          <a
            href={waLink(defaultWhatsAppMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-whatsapp))] px-4 py-2 text-sm font-bold text-white shadow-md shadow-emerald-600/20 hover:brightness-110 hover:scale-[1.02] active:scale-95 transition"
          >
            <MessageCircle className="h-4 w-4" fill="currentColor" />
            Book on WhatsApp
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex lg:hidden items-center gap-1">
          <a
            href={`tel:${siteConfig.phone}`}
            aria-label="Call now"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-brand-600 dark:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Phone className="h-5 w-5" />
          </a>
          <ThemeSwitch />
          <button
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <ul className="px-4 py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <NextLink
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {l.label}
                </NextLink>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4 pt-2 grid grid-cols-2 gap-2">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 py-3 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={waLink(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[rgb(var(--color-whatsapp))] px-3 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" fill="currentColor" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
