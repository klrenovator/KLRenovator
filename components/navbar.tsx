"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiBars3, HiXMark } from "react-icons/hi2";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full bg-white transition-shadow",
        scrolled
          ? "shadow-[0_2px_0_0_#1d4ed8]"
          : "border-b border-slate-200",
      )}
    >
      {/* Top utility bar */}
      <div className="hidden sm:block bg-brand-900 text-white text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-2">
          <span className="truncate font-medium tracking-wide">
            Same-day aircon service across KL &amp; Selangor
          </span>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden md:inline-flex items-center gap-1.5 font-semibold hover:text-brand-300 transition-colors"
            >
              <FaPhoneAlt className="h-3 w-3" /> {siteConfig.phoneDisplay}
            </a>
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 font-semibold hover:text-brand-300 transition-colors"
            >
              <FaWhatsapp className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 sm:h-24 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo only — no text */}
        <NextLink
          href="/"
          aria-label="KL Renovator home"
          className="relative inline-block h-14 w-56 "
        >
          <Image
            src="/logo/logo.jpeg"
            alt="KL Renovator"
            fill
            priority
          
            className=" w-full"
          />
        </NextLink>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <NextLink
                key={l.href}
                href={l.href}
                className={clsx(
                  "relative text-sm font-bold uppercase tracking-wider transition-colors",
                  active ? "text-brand-700" : "text-black hover:text-brand-700",
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-500" />
                )}
              </NextLink>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 border-2 border-brand-900 px-4 py-2.5 text-sm font-bold text-brand-900 hover:bg-brand-900 hover:text-white transition"
          >
            <FaPhoneAlt className="h-3.5 w-3.5" />
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition"
          >
            <FaWhatsapp className="h-4 w-4" />
            Request a Quote
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex lg:hidden items-center gap-1">
          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center bg-brand-500 text-white"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <button
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center text-black hover:bg-slate-100"
          >
            {open ? (
              <HiXMark className="h-7 w-7" />
            ) : (
              <HiBars3 className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <ul>
            {NAV_LINKS.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href);
              return (
                <li key={l.href} className="border-b border-slate-100">
                  <NextLink
                    href={l.href}
                    className={clsx(
                      "block px-5 py-4 text-base font-bold uppercase tracking-wider border-l-4 transition-colors",
                      active
                        ? "border-brand-500 text-brand-700 bg-brand-50"
                        : "border-transparent text-black hover:bg-slate-50",
                    )}
                  >
                    {l.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
          <div className="px-4 py-4 grid grid-cols-2 gap-2">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-brand-900 px-3 py-3.5 text-sm font-bold text-white"
            >
              <FaPhoneAlt className="h-4 w-4" /> Call
            </a>
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-500 px-3 py-3.5 text-sm font-bold text-white"
            >
              <FaWhatsapp className="h-4 w-4" />
              RFQ
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
