"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";

type LangCode = "en" | "ms" | "zh";

const LANG_OPTIONS: { code: LangCode; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ms", flag: "🇲🇾", label: "Melayu" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
];

// Dropdown menu data
const MORE_LINKS = [
  { label: "Brands", href: "/brands", desc: "Service by brand" },
  { label: "Problems", href: "/problems", desc: "Diagnose your issue" },
  { label: "Gallery", href: "/gallery", desc: "Our work" },
  { label: "FAQ", href: "/faq", desc: "Common questions" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_services"), href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !desktopLangRef.current?.contains(target) &&
        !mobileLangRef.current?.contains(target)
      ) {
        setLangOpen(false);
      }
      if (!moreRef.current?.contains(target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang =
    LANG_OPTIONS.find((l) => l.code === lang) ?? LANG_OPTIONS[0];

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-slate-100"
          : "bg-white border-b border-slate-200",
      )}
    >
      {/* Top Utility Bar */}
      <div className="hidden sm:block bg-slate-950 text-white text-xs py-2.5">
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
              <FaPhone className="h-3 w-3 text-[#0284c7]" />{" "}
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 font-black tracking-wide text-white hover:text-[#22c55e] transition-colors"
            >
              <FaWhatsapp className="h-3.5 w-3.5 text-[#22c55e]" /> WhatsApp
              Online
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NextLink
          href="/"
          aria-label="KL Renovator Home"
          className="relative inline-block h-48 w-56 md:w-64 mt-2 shrink-0"
        >
          <Image
            src="/logo/image.png"
            alt="KL Renovator Aircon Specialist Logo"
            fill
            priority
            className="object-contain object-left"
          />
        </NextLink>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <NextLink
                key={l.href}
                href={l.href}
                className={clsx(
                  "relative text-xs font-black uppercase tracking-widest transition-colors py-2",
                  active
                    ? "text-[#0284c7]"
                    : "text-slate-900 hover:text-[#0284c7]",
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0284c7]" />
                )}
              </NextLink>
            );
          })}

          {/* More Dropdown — Brands, Problems, Gallery, FAQ */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={clsx(
                "inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors py-2",
                moreOpen ||
                  MORE_LINKS.some((l) => pathname.startsWith(l.href))
                  ? "text-[#0284c7]"
                  : "text-slate-900 hover:text-[#0284c7]",
              )}
            >
              More
              <FiChevronDown
                className={clsx(
                  "h-3 w-3 transition-transform duration-200",
                  moreOpen && "rotate-180",
                )}
              />
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50">
                {MORE_LINKS.map((l) => (
                  <NextLink
                    key={l.href}
                    href={l.href}
                    className={clsx(
                      "flex flex-col px-4 py-3 text-xs transition-colors border-b border-slate-50 last:border-0",
                      pathname.startsWith(l.href)
                        ? "bg-blue-50 text-[#0284c7]"
                        : "text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <span className="font-black uppercase tracking-wider">
                      {l.label}
                    </span>
                    <span className="text-slate-400 font-medium mt-0.5">
                      {l.desc}
                    </span>
                  </NextLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher Desktop */}
          <div ref={desktopLangRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-2 border-2 border-slate-200 px-3 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] transition-all duration-200 bg-white"
              aria-label="Change Language"
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <svg
                className={clsx(
                  "h-3 w-3 transition-transform duration-200",
                  langOpen && "rotate-180",
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-slate-200 shadow-xl overflow-hidden z-50">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLang(opt.code);
                      setLangOpen(false);
                    }}
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

          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 border-2 border-slate-900 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200"
          >
            <FaPhone className="h-3.5 w-3.5" /> {t("nav_call")}
          </a>
          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all duration-200"
          >
            <FaWhatsapp className="h-4 w-4" /> {t("nav_book")}
          </a>
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Language Switcher Mobile */}
          <div ref={mobileLangRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex h-11 w-11 items-center justify-center border border-slate-200 text-slate-700 bg-white text-base"
              aria-label="Language"
            >
              {currentLang.flag}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-slate-200 shadow-xl overflow-hidden z-50">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLang(opt.code);
                      setLangOpen(false);
                    }}
                    className={clsx(
                      "w-full flex items-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-wider transition-colors",
                      lang === opt.code
                        ? "bg-blue-50 text-[#0284c7]"
                        : "text-slate-700 hover:bg-slate-50",
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
            aria-label="WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center bg-[#22c55e] text-white"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <button
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center text-slate-900 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all"
          >
            {open ? (
              <HiXMark className="h-6 w-6" />
            ) : (
              <HiBars3 className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl">
          <nav>
            <ul>
              {NAV_LINKS.map((l) => {
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href);
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
              {/* More links in mobile */}
              {MORE_LINKS.map((l) => {
                const active = pathname.startsWith(l.href);
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
              className="inline-flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] px-3 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all"
            >
              <FaPhone className="h-3.5 w-3.5 text-white" /> {t("nav_call")}
            </a>
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-3 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all"
            >
              <FaWhatsapp className="h-4 w-4" /> {t("nav_book")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
