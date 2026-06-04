"use client";

import NextLink from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa6";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";

export const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900">

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand Block */}
        <div className="space-y-4 lg:col-span-1">
          <p className="text-white font-black text-xl tracking-tight uppercase">
            KL <span className="text-sky-400">RENOVATOR</span>
          </p>
          <p className="text-xs leading-relaxed text-slate-400">
            {t("footer_desc")}
          </p>
          {/* Social */}
          <div className="flex items-center gap-3 pt-1">
            <a href={waLink(rfqMsg)} target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2.5 bg-slate-900 hover:bg-[#22c55e] hover:text-white text-slate-400 transition-all">
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 bg-slate-900 hover:bg-pink-600 hover:text-white text-slate-400 transition-all">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2.5 bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-400 transition-all">
              <FaFacebook className="h-4 w-4" />
            </a>
            <a href={siteConfig.links.tiktok} target="_blank" rel="noopener noreferrer"
              aria-label="TikTok"
              className="p-2.5 bg-slate-900 hover:bg-slate-700 hover:text-white text-slate-400 transition-all">
              <FaTiktok className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-white">
            {t("footer_services")}
          </p>
          <ul className="space-y-2">
            {siteConfig.services.map((s) => (
              <li key={s.slug}>
                <NextLink
                  href={`/services/${s.slug}`}
                  className="text-xs text-slate-400 hover:text-sky-400 transition-colors font-medium"
                >
                  {s.title}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-white">
            {t("footer_areas")}
          </p>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
            {siteConfig.areas.slice(0, 14).map((area) => (
              <li key={area} className="text-xs text-slate-400 font-medium">
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Block */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-white">
            {t("footer_dispatch")}
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <a href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors font-medium">
                <FaPhone className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors font-medium break-all">
                <FaEnvelope className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <FaLocationDot className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
              <span className="font-medium">KL &amp; Selangor (Klang Valley)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <FaClock className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-300 font-bold">{t("footer_hours")}</p>
                <p className="mt-0.5 text-slate-500">Emergency bookings accepted</p>
              </div>
            </li>
          </ul>

          {/* WhatsApp CTA */}
          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-all mt-2"
          >
            <FaWhatsapp className="h-4 w-4" />
            Book Via WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} KL RENOVATOR (Multicore Dynamic Resources). {t("footer_rights")}
          </p>
          <div className="flex items-center gap-4">
            <NextLink href="/services" className="hover:text-slate-300 transition-colors font-medium">
              Services
            </NextLink>
            <NextLink href="/about" className="hover:text-slate-300 transition-colors font-medium">
              About
            </NextLink>
            <NextLink href="/contact" className="hover:text-slate-300 transition-colors font-medium">
              Contact
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
