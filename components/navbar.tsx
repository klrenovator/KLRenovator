"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { HiBars3, HiXMark, HiChevronDown } from "react-icons/hi2";

import { sitePublic } from "@/config/site-public";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";

type LangCode = "en" | "ms" | "zh";

const LANG_OPTIONS: { code: LangCode; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ms", flag: "🇲🇾", label: "Melayu" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
];

const INSTALLATION_SLUG_MAP: Record<string, { ms: string; zh: string }> = {
  "/installation": { ms: "/ms/installation", zh: "/zh/installation" },
  "/aircond-installation-kl": {
    ms: "/ms/pemasangan-aircond-kl",
    zh: "/zh/aircond-installation-kl",
  },
  "/1hp-aircond-installation-kl": {
    ms: "/ms/pemasangan-aircond-1hp-kl",
    zh: "/zh/1hp-aircond-installation-kl",
  },
  "/1.5hp-aircond-installation-kl": {
    ms: "/ms/pemasangan-aircond-1.5hp-kl",
    zh: "/zh/1.5hp-aircond-installation-kl",
  },
  "/2hp-aircond-installation-kl": {
    ms: "/ms/pemasangan-aircond-2hp-kl",
    zh: "/zh/2hp-aircond-installation-kl",
  },
  "/wall-mounted-aircond-installation-kl": {
    ms: "/ms/pemasangan-aircond-dinding-kl",
    zh: "/zh/wall-mounted-aircond-installation-kl",
  },
  "/ceiling-cassette-aircond-installation-kl": {
    ms: "/ms/pemasangan-aircond-keset-siling-kl",
    zh: "/zh/ceiling-cassette-aircond-installation-kl",
  },
  "/window-unit-aircond-installation-kl": {
    ms: "/ms/pemasangan-aircond-tingkap-kl",
    zh: "/zh/window-unit-aircond-installation-kl",
  },
  "/new-home-aircond-installation": {
    ms: "/ms/pemasangan-aircond-rumah-baru",
    zh: "/zh/new-home-aircond-installation",
  },
  "/whole-house-aircond-installation": {
    ms: "/ms/pemasangan-aircond-seluruh-rumah",
    zh: "/zh/whole-house-aircond-installation",
  },
  "/commercial-aircond-installation": {
    ms: "/ms/pemasangan-aircond-komersial",
    zh: "/zh/commercial-aircond-installation",
  },
  "/installation-price-malaysia": {
    ms: "/ms/installation-price-malaysia",
    zh: "/zh/installation-price-malaysia",
  },
  "/aircond-service-price-malaysia": {
    ms: "/ms/aircond-service-price-malaysia",
    zh: "/zh/aircond-service-price-malaysia",
  },
  "/cuci-aircond-kl": { ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" },
  "/btu-calculator": { ms: "/ms/btu-calculator", zh: "/zh/btu-calculator" },
};

const LOCALISED_TO_EN: Record<string, string> = Object.entries(
  INSTALLATION_SLUG_MAP,
).reduce<Record<string, string>>((acc, [en, alt]) => {
  acc[alt.ms] = en;
  acc[alt.zh] = en;
  return acc;
}, {});

function getTranslatedPath(pathname: string, target: LangCode): string | null {
  const mappedEn = LOCALISED_TO_EN[pathname];
  if (mappedEn) {
    return target === "en" ? mappedEn : INSTALLATION_SLUG_MAP[mappedEn][target];
  }
  const enPath = pathname.replace(/^\/(ms|zh)(?=\/|$)/, "") || "/";
  if (INSTALLATION_SLUG_MAP[enPath]) {
    return target === "en" ? enPath : INSTALLATION_SLUG_MAP[enPath][target];
  }
  const translatableCategory = /^\/(areas|brands|problems|blog)(\/|$)/;
  if (translatableCategory.test(enPath)) {
    return target === "en" ? enPath : enPath === "/" ? `/${target}` : `/${target}${enPath}`;
  }
  const staticPages = ["/", "/contact", "/services", "/about", "/faq", "/gallery", "/review", "/near-me", "/book", "/privacy-policy"];
  if (staticPages.includes(enPath)) {
    return target === "en" ? enPath : enPath === "/" ? `/${target}` : `/${target}${enPath}`;
  }
  const toolPages = [
    "/tools",
    "/aircond-installation-cost-calculator",
    "/aircond-gas-topup-cost-calculator",
    "/which-aircond-service-do-i-need",
    "/aircond-size-calculator",
    "/aircond-electricity-cost-calculator",
    "/aircond-savings-calculator",
  ];
  if (toolPages.includes(enPath)) {
    return target === "en" ? enPath : `/${target}${enPath}`;
  }
  if (/^\/services\/.+/.test(enPath)) {
    return target === "en" ? enPath : `/${target}${enPath}`;
  }
  return null;
}

const NAV_LABELS = {
  en: {
    home: "Home", installation: "Installation", services: "Services", blog: "Blog",
    about: "About", faq: "FAQ", contact: "Contact", tools: "Tools",
    call: "Call Support", book: "Book Now",
    topbar: "Same-Day Aircond Installation & Servicing Across KL & Selangor — From RM199",
  },
  ms: {
    home: "Utama", installation: "Pemasangan", services: "Perkhidmatan", blog: "Blog",
    about: "Tentang Kami", faq: "Soalan Lazim", contact: "Hubungi", tools: "Alat",
    call: "Hubungi Kami", book: "Tempah Sekarang",
    topbar: "Pemasangan & Servis Aircond Hari Sama KL & Selangor — Dari RM199",
  },
  zh: {
    home: "首页", installation: "冷气安装", services: "服务", blog: "博客",
    about: "关于我们", faq: "常见问答", contact: "联系我们", tools: "计算工具",
    call: "致电支持", book: "立即预约",
    topbar: "当天冷气安装与服务，覆盖吉隆坡及雪兰莪 — RM199起",
  },
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang } = useLang();
  const lbl = NAV_LABELS[lang as keyof typeof NAV_LABELS] || NAV_LABELS.en;

  const localizedPath = (path: string) => {
    if (lang === "en") return path;
    if (path === "/") return `/${lang}`;
    return `/${lang}${path}`;
  };

  function handleLangChange(code: LangCode) {
    const translatedPath = getTranslatedPath(pathname, code);
    if (translatedPath && translatedPath !== pathname) {
      router.push(translatedPath);
    }
    setLang(code);
    setLangOpen(false);
  }

  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!desktopLangRef.current?.contains(t) && !mobileLangRef.current?.contains(t)) setLangOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLangOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  const currentLang = LANG_OPTIONS.find((l) => l.code === lang) ?? LANG_OPTIONS[0];

  const SIMPLE_LINKS = [
    { label: lbl.home, href: "/", localize: true },
    { label: lbl.installation, href: "/installation", localize: true },
    { label: lbl.services, href: "/services", localize: true },
    { label: lbl.tools, href: "/tools", localize: true },
    { label: lbl.blog, href: "/blog", localize: true },
    { label: lbl.about, href: "/about", localize: true },
    { label: lbl.faq, href: "/faq", localize: true },
    { label: lbl.contact, href: "/contact", localize: true },
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-slate-100"
          : "bg-white border-b border-slate-200",
      )}
    >
      <div className="hidden sm:block bg-slate-950 text-white text-xs py-2.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <span className="truncate font-black tracking-wider uppercase text-slate-300 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            {lbl.topbar}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${sitePublic.phone}`}
              className="hidden md:inline-flex items-center gap-2 font-black tracking-wide text-slate-200 hover:text-[#0284c7] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <FaPhone className="h-3 w-3 text-[#0284c7]" /> {sitePublic.phoneDisplay}
            </a>
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 font-black tracking-wide text-white hover:text-[#22c55e] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <FaWhatsapp className="h-3.5 w-3.5 text-[#22c55e]" /> WhatsApp Online
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NextLink
          href={localizedPath("/")}
          aria-label="KL Renovator Home"
          className="relative inline-block h-16 w-52 shrink-0 sm:w-56 md:w-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 rounded"
        >
          <Image
            src="/logo/image.png"
            alt="KL Renovator Aircon Specialist Logo"
            fill
            sizes="(max-width: 640px) 208px, (max-width: 768px) 224px, 240px"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="object-contain object-left"
          />
        </NextLink>

        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
          {SIMPLE_LINKS.map((l) => {
            const pathHref = localizedPath(l.href);
            const active = l.href === "/"
              ? pathname === pathHref
              : pathname === pathHref || pathname.startsWith(pathHref + "/");
            return (
              <NextLink
                key={l.href}
                href={pathHref}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative text-xs font-black uppercase tracking-widest transition-colors px-3 py-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600",
                  active ? "text-[#0284c7]" : "text-slate-900 hover:text-[#0284c7]",
                )}
              >
                {l.label}
                {active && <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0284c7]" />}
              </NextLink>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div ref={desktopLangRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-2 border-2 border-slate-200 px-3 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:border-[#0284c7] hover:text-[#0284c7] transition-all duration-200 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 rounded"
              aria-label="Change Language"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-controls="desktop-lang-listbox"
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <HiChevronDown aria-hidden="true" className={clsx("h-3 w-3 transition-transform duration-200", langOpen && "rotate-180")} />
            </button>
            {langOpen && (
              <div
                id="desktop-lang-listbox"
                role="listbox"
                aria-label="Select language"
                className="absolute right-0 top-full mt-2 w-40 bg-white border border-slate-200 shadow-xl overflow-hidden z-50 rounded"
              >
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    role="option"
                    aria-selected={lang === opt.code}
                    onClick={() => handleLangChange(opt.code)}
                    className={clsx(
                      "w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 focus-visible:outline-offset-[-2px]",
                      lang === opt.code
                        ? "bg-blue-50 text-[#0284c7]"
                        : "text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <span aria-hidden="true" className="text-base">{opt.flag}</span>
                    {opt.label}
                    {lang === opt.code && <span aria-hidden="true" className="ml-auto text-[#0284c7]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={`tel:${sitePublic.phone}`}
            className="inline-flex items-center gap-2 border-2 border-slate-900 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 rounded"
          >
            <FaPhone className="h-3.5 w-3.5" aria-hidden="true" /> {lbl.call}
          </a>
          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 rounded"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden="true" /> {lbl.book}
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <div ref={mobileLangRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex h-11 w-11 items-center justify-center border border-slate-200 text-slate-700 bg-white text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 rounded"
              aria-label="Language"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-controls="mobile-lang-listbox"
            >
              <span aria-hidden="true">{currentLang.flag}</span>
            </button>
            {langOpen && (
              <div
                id="mobile-lang-listbox"
                role="listbox"
                aria-label="Select language"
                className="absolute right-0 top-full mt-2 w-36 bg-white border border-slate-200 shadow-xl overflow-hidden z-50 rounded"
              >
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    role="option"
                    aria-selected={lang === opt.code}
                    onClick={() => handleLangChange(opt.code)}
                    className={clsx(
                      "w-full flex items-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600",
                      lang === opt.code
                        ? "bg-blue-50 text-[#0284c7]"
                        : "text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <span aria-hidden="true" className="text-base">{opt.flag}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center bg-[#22c55e] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 rounded"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center text-slate-900 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 rounded"
          >
            {open ? <HiXMark className="h-6 w-6" aria-hidden="true" /> : <HiBars3 className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-slate-100 bg-white shadow-xl max-h-[80vh] overflow-y-auto"
        >
          <nav aria-label="Mobile navigation">
            <ul>
              {SIMPLE_LINKS.map((l) => {
                const pathHref = localizedPath(l.href);
                const active = l.href === "/"
                  ? pathname === pathHref
                  : pathname === pathHref || pathname.startsWith(pathHref + "/");
                return (
                  <li key={l.href} className="border-b border-slate-50">
                    <NextLink
                      href={pathHref}
                      aria-current={active ? "page" : undefined}
                      className={clsx(
                        "block px-6 py-4 text-sm font-black uppercase tracking-widest border-l-4 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 focus-visible:outline-offset-[-2px]",
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
              href={`tel:${sitePublic.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] px-3 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 rounded"
            >
              <FaPhone className="h-3.5 w-3.5 text-white" aria-hidden="true" /> {lbl.call}
            </a>
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-3 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 rounded"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" /> {lbl.book}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
