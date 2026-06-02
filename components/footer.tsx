"use client";

import NextLink from "next/link";
import Image from "next/image";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegClock,
  FaFacebookF,
  FaInstagram,
  FaStar,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300 print:hidden">
      {/* Top High-Conversion Action CTA Band */}
      <div className="border-b border-slate-900 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Need an expert aircond technician today?
            </h3>
            <p className="mt-2 text-slate-400 text-sm font-medium">
              Send a fast WhatsApp message — our technician team replies within 30 minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white rounded-xl transition-all shadow-lg shadow-green-500/10 active:scale-95"
            >
              <FaWhatsapp className="h-5 w-5" /> Request Quote
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-slate-700 hover:border-white bg-slate-950 hover:bg-white text-white hover:text-black px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all active:scale-95"
            >
              <FaPhoneAlt className="h-3.5 w-3.5" /> {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Informational & Citation Matrix Footer */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Engine & Trust Verification Badges */}
          <div className="md:col-span-2 space-y-6">
            <NextLink
              href="/"
              aria-label="KL Renovator Home"
              className="relative inline-block h-14 w-44 transition-transform active:scale-95"
            >
              <Image
                src="/logo/image.png"
                alt="KL Renovator Aircon Specialist Brand Identity"
                fill
                sizes="176px"
                className="object-contain object-left filter brightness-100"
              />
            </NextLink>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-medium">
              {siteConfig.description}
            </p>

            {/* High Citation Google Rating Proof Element */}
            <a
              href={siteConfig.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 border border-slate-800 bg-slate-900/50 px-4 py-3 rounded-xl hover:border-slate-700 transition group"
            >
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5" />
                ))}
              </div>
              <span className="text-xs text-slate-300 font-bold tracking-wide">
                <span className="font-black text-white">4.9 / 5</span> · 500+ Local Reviews
              </span>
              <FiArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
            </a>

            {/* Micro-targeted Social Channels Grid */}
            <div className="flex items-center gap-2.5">
              <a
                aria-label="Chat directly via WhatsApp"
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 inline-flex items-center justify-center bg-[#22c55e]/10 hover:bg-[#22c55e] text-[#22c55e] hover:text-white rounded-xl transition-all duration-200 shadow-sm"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a
                aria-label="Follow us on Facebook"
                href={siteConfig.links.facebook}
                className="h-10 w-10 inline-flex items-center justify-center bg-slate-900 text-slate-400 hover:bg-[#0284c7] hover:text-white rounded-xl transition-all duration-200"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                aria-label="Follow us on Instagram"
                href={siteConfig.links.instagram}
                className="h-10 w-10 inline-flex items-center justify-center bg-slate-900 text-slate-400 hover:bg-[#e1306c] hover:text-white rounded-xl transition-all duration-200"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Directory Navigation Streams */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              Explore Matrix
            </h4>
            <ul className="mt-5 space-y-3.5 text-xs uppercase font-bold tracking-wider">
              {[
                { label: "Home Base", href: "/" },
                { label: "Our Profile", href: "/about" },
                { label: "HVAC Services", href: "/services" },
                { label: "Help FAQ", href: "/faq" },
                { label: "Get In Touch", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <NextLink
                    href={l.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </NextLink>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 text-xs font-black uppercase tracking-widest text-white">
              Top Categories
            </h4>
            <ul className="mt-5 space-y-3.5 text-xs font-bold text-slate-400 tracking-wide">
              {siteConfig.services.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <NextLink
                    href={`/services/${s.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {s.title}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Exact Real-Time Contact Node Citations for Search Engines */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              Official Contact
            </h4>
            <ul className="mt-5 space-y-4 text-xs font-semibold text-slate-300 tracking-wide">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="mt-0.5 h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-white transition-colors font-bold"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-0.5 h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors break-all font-bold"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-0.5 h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                <a
                  href={siteConfig.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  Kuala Lumpur &amp; Selangor (Ampang, Cheras, PJ, Subang Jaya, Puchong, Shah Alam)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaRegClock className="mt-0.5 h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                <span className="leading-relaxed text-slate-400">{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights and Engine Verification Footnote */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 font-bold tracking-wider uppercase">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500 font-bold tracking-wide text-left sm:text-right">
            Premium Residential &amp; Commercial Aircond Maintenance Systems · Klang Valley
          </p>
        </div>
      </div>
    </footer>
  );
};
