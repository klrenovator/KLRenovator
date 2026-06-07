"use client";

import NextLink from "next/link";
import {
  FaPhone, FaEnvelope, FaLocationDot, FaClock, FaWhatsapp, FaYoutube,
} from "react-icons/fa6";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { SiGooglemybusiness } from "react-icons/si";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";

export const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="w-full bg-white text-slate-500 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {/* ── Brand Block ── */}
        <div className="space-y-4 lg:col-span-1">
          <NextLink href="/" className="inline-block">
            <p className="text-slate-900 font-black text-xl tracking-tight uppercase">
              KL <span className="text-sky-500">RENOVATOR</span>
            </p>
          </NextLink>
          <p className="text-xs leading-relaxed text-slate-500">{t("footer_desc")}</p>
          <div className="flex items-center gap-2.5 pt-1 flex-wrap">
            {/* WhatsApp — official green */}
            <a href={waLink(rfqMsg)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KL Renovator"
              className="p-2.5 rounded-lg transition-all duration-200"
              style={{ background: "#25D366", color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1ebe5d"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#25D366"; }}
            >
              <FaWhatsapp className="h-4 w-4" />
            </a>
            {/* Instagram — gradient brand */}
            <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="KL Renovator Instagram"
              className="p-2.5 rounded-lg transition-all duration-200"
              style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color: "#fff" }}
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            {/* Facebook — official blue */}
            <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer" aria-label="KL Renovator Facebook"
              className="p-2.5 rounded-lg transition-all duration-200"
              style={{ background: "#1877F2", color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#0e65d9"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#1877F2"; }}
            >
              <FaFacebook className="h-4 w-4" />
            </a>
            {/* TikTok — official black */}
            <a href={siteConfig.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="KL Renovator TikTok"
              className="p-2.5 rounded-lg transition-all duration-200"
              style={{ background: "#010101", color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#333"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#010101"; }}
            >
              <FaTiktok className="h-4 w-4" />
            </a>
            {/* YouTube — official red */}
            <a href={siteConfig.links.youtube} target="_blank" rel="noopener noreferrer" aria-label="KL Renovator YouTube"
              className="p-2.5 rounded-lg transition-all duration-200"
              style={{ background: "#FF0000", color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#cc0000"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#FF0000"; }}
            >
              <FaYoutube className="h-4 w-4" />
            </a>
            {/* Google Business — official blue */}
            <a href={siteConfig.links.googleBusiness} target="_blank" rel="noopener noreferrer" aria-label="KL Renovator Google Business"
              className="p-2.5 rounded-lg transition-all duration-200"
              style={{ background: "#4285F4", color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#3367d6"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#4285F4"; }}
            >
              <SiGooglemybusiness className="h-4 w-4" />
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

        {/* ── Service Areas — All with clickable links for SEO ── */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-900">{t("footer_areas")}</p>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
            {siteConfig.areaPages.map((area) => (
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
            href="/services"
            className="inline-block text-xs font-black uppercase tracking-wider text-sky-600 hover:text-sky-700 transition-colors mt-1"
          >
            View All Services →
          </NextLink>
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
            className="inline-flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-all mt-2 rounded-xl"
            style={{ background: "#25D366" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1ebe5d"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#25D366"; }}
          >
            <FaWhatsapp className="h-4 w-4" /> Book Via WhatsApp
          </a>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} KL RENOVATOR (Multicore Dynamic Resources). {t("footer_rights")}
          </p>
          <nav className="flex items-center gap-4" aria-label="Footer navigation">
            <NextLink href="/services" className="hover:text-sky-600 transition-colors font-medium">Services</NextLink>
            <NextLink href="/blog" className="hover:text-sky-600 transition-colors font-medium">Blog</NextLink>
            <NextLink href="/gallery" className="hover:text-sky-600 transition-colors font-medium">Gallery</NextLink>
            <NextLink href="/about" className="hover:text-sky-600 transition-colors font-medium">About</NextLink>
            <NextLink href="/faq" className="hover:text-sky-600 transition-colors font-medium">FAQ</NextLink>
            <NextLink href="/contact" className="hover:text-sky-600 transition-colors font-medium">Contact</NextLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};
