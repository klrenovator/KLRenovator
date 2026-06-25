"use client";

import NextLink from "next/link";
import {
  FaPhone, FaEnvelope, FaLocationDot, FaClock, FaWhatsapp, FaGoogle,
} from "react-icons/fa6";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";

const FOOTER_LINKS = {
  en: {
    brands: "Brands",
    problems: "Problems",
    blog: "Blog",
    areas: "All Areas",
    services: "View All Services →",
    quickLinks: "Quick Links",
    bookWa: "Book Via WhatsApp",
    // bottom nav
    navServices: "Services",
    navBrands: "Brands",
    navProblems: "Problems",
    navAreas: "Areas",
    navBlog: "Blog",
    navGallery: "Gallery",
    navAbout: "About",
    navFaq: "FAQ",
    navContact: "Contact",
  },
  ms: {
    brands: "Jenama",
    problems: "Masalah",
    blog: "Blog",
    areas: "Semua Kawasan",
    services: "Lihat Semua Perkhidmatan →",
    quickLinks: "Pautan Pantas",
    bookWa: "Tempah Via WhatsApp",
    navServices: "Perkhidmatan",
    navBrands: "Jenama",
    navProblems: "Masalah",
    navAreas: "Kawasan",
    navBlog: "Blog",
    navGallery: "Galeri",
    navAbout: "Tentang Kami",
    navFaq: "Soalan Lazim",
    navContact: "Hubungi",
  },
  zh: {
    brands: "品牌",
    problems: "常见故障",
    blog: "博客",
    areas: "所有地区",
    services: "查看所有服务 →",
    quickLinks: "快速链接",
    bookWa: "通过 WhatsApp 预约",
    navServices: "服务",
    navBrands: "品牌",
    navProblems: "常见故障",
    navAreas: "服务地区",
    navBlog: "博客",
    navGallery: "图库",
    navAbout: "关于我们",
    navFaq: "常见问答",
    navContact: "联系我们",
  },
};

export const Footer = () => {
  const { t, lang } = useLang();
  const fl = FOOTER_LINKS[lang as keyof typeof FOOTER_LINKS] ?? FOOTER_LINKS.en;

  return (
    <footer className="w-full bg-white text-slate-500 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">

        {/* ── Brand Block ── */}
        <div className="space-y-4 lg:col-span-1">
          <NextLink href="/" className="inline-block">
            <p className="text-slate-900 font-black text-xl tracking-tight uppercase">
              KL <span className="text-sky-500">RENOVATOR</span>
            </p>
          </NextLink>
          <p className="text-xs leading-relaxed text-slate-500">{t("footer_desc")}</p>

          {/* Social Icons — WhatsApp, Instagram, Facebook, TikTok, Google Business Profile */}
          <div className="flex items-center gap-2.5 pt-1 flex-wrap">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp KL Renovator"
              style={{ backgroundColor: "#25D366" }}
              className="p-2.5 rounded-lg text-white transition-opacity hover:opacity-85"
            >
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KL Renovator Instagram"
              style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
              className="p-2.5 rounded-lg text-white transition-opacity hover:opacity-85"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KL Renovator Facebook"
              style={{ backgroundColor: "#1877F2" }}
              className="p-2.5 rounded-lg text-white transition-opacity hover:opacity-85"
            >
              <FaFacebook className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KL Renovator TikTok"
              style={{ backgroundColor: "#010101" }}
              className="p-2.5 rounded-lg text-white transition-opacity hover:opacity-85"
            >
              <FaTiktok className="h-4 w-4" />
            </a>
            {/* Google Business Profile */}
            <a
              href={siteConfig.links.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KL Renovator Google Business Profile"
              style={{ backgroundColor: "#4285F4" }}
              className="p-2.5 rounded-lg text-white transition-opacity hover:opacity-85"
            >
              <FaGoogle className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* ── Services List ── */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-900">{t("footer_services")}</p>
          <ul className="space-y-2">
            {siteConfig.services.map((s) => (
              <li key={s.slug}>
                <NextLink
                  href={`/services/${s.slug}`}
                  className="text-xs text-slate-500 hover:text-sky-600 transition-colors font-medium"
                >
                  {s.title}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Service Areas ── */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-900">{t("footer_areas")}</p>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
            {siteConfig.areaPages.slice(0, 16).map((area) => (
              <li key={area.slug}>
                <NextLink
                  href={`/areas/${area.slug}`}
                  className="text-xs text-slate-500 hover:text-sky-600 transition-colors font-medium"
                  title={`Aircond Service ${area.name}`}
                >
                  {area.name}
                </NextLink>
              </li>
            ))}
          </ul>
          <NextLink
            href="/areas"
            className="inline-block text-xs font-black uppercase tracking-wider text-sky-600 hover:text-sky-700 transition-colors mt-1"
          >
            {fl.areas} →
          </NextLink>
        </div>

        {/* ── Quick Links — Brands / Problems / Blog ── */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-900">{fl.quickLinks}</p>

          {/* Brands */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{fl.brands}</p>
            <ul className="space-y-1.5">
              {siteConfig.brandPages.map((b) => (
                <li key={b.slug}>
                  <NextLink
                    href={`/brands/${b.slug}`}
                    className="text-xs text-slate-500 hover:text-sky-600 transition-colors font-medium"
                  >
                    {b.name}
                  </NextLink>
                </li>
              ))}
              <li>
                <NextLink
                  href="/brands"
                  className="text-xs font-black text-sky-600 hover:text-sky-700 transition-colors"
                >
                  {fl.brands} →
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Problems */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{fl.problems}</p>
            <ul className="space-y-1.5">
              {siteConfig.problemPages.slice(0, 8).map((p) => (
                <li key={p.slug}>
                  <NextLink
                    href={`/problems/${p.slug}`}
                    className="text-xs text-slate-500 hover:text-sky-600 transition-colors font-medium"
                  >
                    {p.name}
                  </NextLink>
                </li>
              ))}
              <li>
                <NextLink
                  href="/problems"
                  className="text-xs font-black text-sky-600 hover:text-sky-700 transition-colors"
                >
                  {fl.problems} →
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Blog link */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{fl.blog}</p>
            <NextLink
              href="/blog"
              className="text-xs font-black text-sky-600 hover:text-sky-700 transition-colors"
            >
              {fl.blog} →
            </NextLink>
          </div>
        </div>

        {/* ── Contact Block ── */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-900">{t("footer_dispatch")}</p>
          <ul className="space-y-3 text-xs">
            <li>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2.5 hover:text-sky-600 transition-colors font-medium"
              >
                <FaPhone className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 hover:text-sky-600 transition-colors font-medium break-all"
              >
                <FaEnvelope className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <FaLocationDot className="h-3.5 w-3.5 text-sky-500 shrink-0 mt-0.5" />
              <span className="font-medium">KL &amp; Selangor (Klang Valley)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <FaClock className="h-3.5 w-3.5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700 font-bold">{t("footer_hours")}</p>
                <p className="mt-0.5 text-slate-400">Emergency bookings accepted</p>
              </div>
            </li>
          </ul>
          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#25D366" }}
            className="inline-flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-opacity hover:opacity-85 mt-2 rounded-xl"
          >
            <FaWhatsapp className="h-4 w-4" /> {fl.bookWa}
          </a>
        </div>
      </div>

      {/* ── Bottom Bar — fully language-aware ── */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} KL RENOVATOR (Multicore Dynamics Resources). {t("footer_rights")}
          </p>
          <nav className="flex items-center gap-4 flex-wrap justify-center" aria-label="Footer navigation">
            <NextLink href="/services" className="hover:text-sky-600 transition-colors font-medium">{fl.navServices}</NextLink>
            <NextLink href="/brands" className="hover:text-sky-600 transition-colors font-medium">{fl.navBrands}</NextLink>
            <NextLink href="/problems" className="hover:text-sky-600 transition-colors font-medium">{fl.navProblems}</NextLink>
            <NextLink href="/areas" className="hover:text-sky-600 transition-colors font-medium">{fl.navAreas}</NextLink>
            <NextLink href="/blog" className="hover:text-sky-600 transition-colors font-medium">{fl.navBlog}</NextLink>
            <NextLink href="/gallery" className="hover:text-sky-600 transition-colors font-medium">{fl.navGallery}</NextLink>
            <NextLink href="/about" className="hover:text-sky-600 transition-colors font-medium">{fl.navAbout}</NextLink>
            <NextLink href="/faq" className="hover:text-sky-600 transition-colors font-medium">{fl.navFaq}</NextLink>
            <NextLink href="/contact" className="hover:text-sky-600 transition-colors font-medium">{fl.navContact}</NextLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};
