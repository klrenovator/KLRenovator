"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { HiBars3, HiXMark } from "react-icons/hi2";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang, Lang } from "@/context/language-context";

const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ms", flag: "🇲🇾", label: "Melayu" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();
  const langRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_services"), href: "/services" },
    { label: t("nav_faq"), href: "/faq" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = LANG_OPTIONS.find((l) => l.code === lang)!;

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full bg-white backdrop-blur-md transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-slate-100"
          : "border-b border-slate-200",
      )}
    >
      {/* Top Utility Bar */}
      <div className="hidden sm:block bg-slate-950 text-white text-xs py-2.5 border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <span className="truncate font-black tracking-wider uppercase text-slate-300 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            {t("nav_topbar")}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden md:inline-flex items-center gap-2 font-black tracking-wide text-slate-200 hover:text-[#0284c7] transition-colors"
            >
              <FaPhone className="h-3 w-3 text-[#0284c7]" /> {siteConfig.phoneDisplay}
            </a>
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 font-black tracking-wide text-white hover:text-[#22c55e] transition-colors"
            >
              <FaWhatsapp className="h-3.5 w-3.5 text-[#22c55e]" /> WhatsApp Online
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NextLink
          href="/"
          aria-label="KL Renovator Home"
          className="relative inline-block h-48 w-64 md:w-72 mt-2 transition-transform active:scale-95"
        >
          <Image
            src="/logo/image.png"
            alt="KL Renovator Aircon Specialist Logo"
            fill
            priority
            className="object-contain object-left"
          />
        </NextLink>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <NextLink
                key={l.href}
                href={l.href}
                className={clsx(
                  "relative text-xs font-black uppercase tracking-widest transition-colors py-2",
                  active ? "text-[#0284c7]" : "text-slate-900 hover:text-[#0284c7]",
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0284c7] rounded-full" />
                )}
              </NextLink>
            );
          })}
        </nav>

        {/* Desktop Right Buttons + Language Switcher */}
        <div className="hidden lg:flex items-center gap-3">

          {/* ── LANGUAGE SWITCHER ── */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-2 border-2 border-slate-200 px-3 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] rounded-xl transition-all duration-200 bg-white"
              aria-label="Change Language"
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <svg
                className={clsx("h-3 w-3 transition-transform duration-200", langOpen && "rotate-180")}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => { setLang(opt.code); setLangOpen(false); }}
                    className={clsx(
                      "w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors",
                      lang === opt.code
                        ? "bg-blue-50 text-[#0284c7]"
                        : "text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <span className="text-base">{opt.flag}</span>
                    {opt.label}
                    {lang === opt.code && (
                      <span className="ml-auto text-[#0284c7]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* ── END LANGUAGE SWITCHER ── */}

          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 border-2 border-slate-900 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-900 hover:bg-slate-900 hover:text-white rounded-xl transition-all duration-200"
          >
            <FaPhone className="h-3.5 w-3.5" />
            {t("nav_call")}
          </a>
          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white rounded-xl shadow-md shadow-green-500/10 transition-all duration-200"
          >
            <FaWhatsapp className="h-4 w-4" />
            {t("nav_book")}
          </a>
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-2">

          {/* Mobile Language Switcher */}
          <div ref={undefined} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex h-11 w-11 items-center justify-center border border-slate-200 text-slate-700 bg-white rounded-xl transition-all text-base"
              aria-label="Language"
            >
              {currentLang.flag}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => { setLang(opt.code); setLangOpen(false); }}
                    className={clsx(
                      "w-full flex items-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-wider transition-colors",
                      lang === opt.code ? "bg-blue-50 text-[#0284c7]" : "text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <span className="text-base">{opt.flag}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center bg-[#22c55e] active:bg-[#16a34a] text-white rounded-xl shadow-md shadow-green-500/10"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <button
            aria-expanded={open}
            aria-label="Toggle Navigation Menu"
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center text-slate-900 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 active:scale-95 transition-all"
          >
            {open ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav>
            <ul>
              {NAV_LINKS.map((l) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <li key={l.href} className="border-b border-slate-50">
                    <NextLink
                      href={l.href}
                      className={clsx(
                        "block px-6 py-4 text-sm font-black uppercase tracking-widest border-l-4 transition-all",
                        active
                          ? "border-[#0284c7] text-[#0284c7] bg-blue-50/40"
                          : "border-transparent text-slate-900 hover:bg-slate-50",
                      )}
                    >
                      {l.label}
                    </NextLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="px-5 py-5 grid grid-cols-2 gap-3 bg-slate-50/50 border-t border-slate-100">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 px-3 py-3.5 text-xs font-black uppercase tracking-wider text-white rounded-xl transition-all"
            >
              <FaPhone className="h-3.5 w-3.5 text-[#0284c7]" /> {t("nav_call")}
            </a>
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-3 py-3.5 text-xs font-black uppercase tracking-wider text-white rounded-xl shadow-md transition-all"
            >
              <FaWhatsapp className="h-4 w-4" /> {t("nav_book")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
