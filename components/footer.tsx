"use client";

import NextLink from "next/link";
import {
  FaPhone, FaEnvelope, FaLocationDot, FaClock, FaWhatsapp,
} from "react-icons/fa6";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

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
          <div className="flex items-center gap-3 pt-1">
            <a href={waLink(rfqMsg)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KL Renovator"
              className="p-2.5 bg-slate-100 hover:bg-[#22c55e] hover:text-white text-slate-500 transition-all rounded-lg">
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="KL Renovator Instagram"
              className="p-2.5 bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-500 transition-all rounded-lg">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer" aria-label="KL Renovator Facebook"
              className="p-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 transition-all rounded-lg">
              <FaFacebook className="h-4 w-4" />
            </a>
            <a href={siteConfig.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="KL Renovator TikTok"
              className="p-2.5 bg-slate-100 hover:bg-slate-700 hover:text-white text-slate-500 transition-all rounded-lg">
              <FaTiktok className="h-4 w-4" />
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
            className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-all mt-2 rounded-xl"
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
