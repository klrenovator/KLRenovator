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
    <footer className="mt-16 bg-black text-slate-300">
      {/* Top CTA band */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Need an aircon expert today?
            </h3>
            <p className="mt-2 text-slate-400 text-sm">
              Send a WhatsApp — our team replies within 30 minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 px-5 py-3 text-sm font-bold text-white transition"
            >
              <FaWhatsapp className="h-5 w-5" /> Request a Quote
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white hover:bg-white hover:text-black px-5 py-3 text-sm font-bold text-white transition"
            >
              <FaPhoneAlt className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand column — logo only */}
          <div className="md:col-span-2">
            <NextLink
              href="/"
              aria-label="KL Renovator home"
              className="relative inline-block h-16 w-16 bg-white p-1"
            >
              <Image
                src="/logo/logo.jpeg"
                alt="KL Renovator"
                fill
                sizes="64px"
                className="object-contain"
              />
            </NextLink>
            <p className="mt-5 text-sm text-slate-400 max-w-md leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Google rating badge */}
            <a
              href={siteConfig.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 border border-slate-800 bg-slate-950 px-4 py-2.5 hover:border-brand-500 transition"
            >
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5" />
                ))}
              </div>
              <span className="text-xs text-slate-300">
                <span className="font-bold text-white">4.9 / 5</span> · 500+
                Google Reviews
              </span>
              <FiArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
            </a>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              <a
                aria-label="WhatsApp"
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 inline-flex items-center justify-center bg-brand-500 text-white hover:bg-brand-400 transition"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a
                aria-label="Facebook"
                href={siteConfig.links.facebook}
                className="h-10 w-10 inline-flex items-center justify-center bg-slate-900 text-slate-300 hover:bg-brand-500 hover:text-white transition"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                aria-label="Instagram"
                href={siteConfig.links.instagram}
                className="h-10 w-10 inline-flex items-center justify-center bg-slate-900 text-slate-300 hover:bg-brand-500 hover:text-white transition"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <NextLink
                    href={l.href}
                    className="text-slate-400 hover:text-brand-300 transition"
                  >
                    {l.label}
                  </NextLink>
                </li>
              ))}
            </ul>

            <h4 className="mt-7 text-sm font-bold uppercase tracking-wider text-white">
              Top Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.services.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <NextLink
                    href={`/services/${s.slug}`}
                    className="text-slate-400 hover:text-brand-300 transition"
                  >
                    {s.title}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <FaPhoneAlt className="mt-1 h-3.5 w-3.5 text-brand-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-slate-300 hover:text-brand-300 transition"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaEnvelope className="mt-1 h-3.5 w-3.5 text-brand-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-slate-300 hover:text-brand-300 transition break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="mt-1 h-3.5 w-3.5 text-brand-400 shrink-0" />
                <a
                  href={siteConfig.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-brand-300 transition"
                >
                  Find us on Google Maps
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaRegClock className="mt-1 h-3.5 w-3.5 text-brand-400 shrink-0" />
                <span className="text-slate-300">{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Serving KL &amp; Selangor · Same-day bookings via WhatsApp
          </p>
        </div>
      </div>
    </footer>
  );
};
