"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import {
  Menu,
  X,
  Phone,
  Wind,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { ServiceIcon } from "@/components/service-icon";
import { waLink, defaultWhatsAppMsg } from "@/lib/whatsapp";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-40 w-full transition-all",
        scrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-sm"
          : "bg-white/60 dark:bg-slate-950/60 backdrop-blur-md",
      )}
    >
      {/* Top announcement bar */}
      <div className="hidden sm:block bg-gradient-to-r from-brand-600 to-brand-700 text-white text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-1.5">
          <span className="truncate">
            ⚡ Same-day aircon service across KL & Selangor · 5-star rated
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
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/30">
            <Wind className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              {siteConfig.name}
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Aircon Specialist · KL & Selangor
            </span>
          </span>
        </NextLink>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          <li>
            <NextLink
              href="/"
              className="inline-flex rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              Home
            </NextLink>
          </li>

          {/* Services dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              onMouseEnter={() => setServicesOpen(true)}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              Services
              <ChevronDown
                className={clsx(
                  "h-4 w-4 transition-transform",
                  servicesOpen && "rotate-180",
                )}
              />
            </button>

            {servicesOpen && (
              <div
                onMouseLeave={() => setServicesOpen(false)}
                className="absolute left-0 top-full mt-2 w-[520px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-3 grid grid-cols-2 gap-1"
              >
                {siteConfig.services.map((s) => (
                  <NextLink
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setServicesOpen(false)}
                    className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/40 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition">
                      <ServiceIcon name={s.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                        {s.title}
                      </span>
                      <span className="block text-xs text-slate-500 truncate">
                        From RM {s.startPrice}
                      </span>
                    </span>
                  </NextLink>
                ))}
                <div className="col-span-2 mt-1 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 px-4 py-2.5 text-xs text-white flex items-center justify-between">
                  <span>Not sure which service? Ask us on WhatsApp.</span>
                  <a
                    href={waLink(defaultWhatsAppMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 font-semibold hover:bg-white/30"
                  >
                    <MessageCircle className="h-3 w-3" fill="currentColor" />
                    Chat
                  </a>
                </div>
              </div>
            )}
          </li>

          <li>
            <a
              href="/#reviews"
              className="inline-flex rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              Reviews
            </a>
          </li>
          <li>
            <a
              href="/#contact"
              className="inline-flex rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              Contact
            </a>
          </li>
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
            <li>
              <NextLink
                href="/"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Home
              </NextLink>
            </li>

            {/* Mobile services accordion */}
            <li className="border-b border-slate-100 dark:border-slate-800 pb-1">
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Services
                <ChevronDown
                  className={clsx(
                    "h-4 w-4 transition-transform",
                    mobileServicesOpen && "rotate-180",
                  )}
                />
              </button>
              {mobileServicesOpen && (
                <ul className="mt-1 ml-2 space-y-0.5">
                  {siteConfig.services.map((s) => (
                    <li key={s.slug}>
                      <NextLink
                        href={`/services/${s.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <span className="flex items-center gap-2.5">
                          <ServiceIcon
                            name={s.icon}
                            className="h-4 w-4 text-brand-600"
                          />
                          {s.title}
                        </span>
                        <span className="text-xs font-semibold text-brand-600">
                          RM {s.startPrice}+
                        </span>
                      </NextLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <a
                href="/#reviews"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Reviews
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Contact
              </a>
            </li>
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
