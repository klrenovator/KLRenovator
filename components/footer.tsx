import NextLink from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Snowflake,
  ExternalLink,
  Star,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

import { siteConfig } from "@/config/site";
import { waLink, defaultWhatsAppMsg } from "@/lib/whatsapp";

export const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-300">
      {/* Top CTA band */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Need aircon help today?
            </h3>
            <p className="mt-1 text-slate-400 text-sm">
              Send us a message on WhatsApp — our team replies within 30 minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href={waLink(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[rgb(var(--color-whatsapp))] px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
            >
              <FaWhatsapp className="h-5 w-5" /> WhatsApp us
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-600/30"
            >
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-2">
            <NextLink href="/" className="inline-flex items-center gap-2.5">
              <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md">
                <span className="text-sm font-black tracking-tighter">KL</span>
                <Snowflake className="absolute -top-1 -right-1 h-3.5 w-3.5 text-white bg-sky-500 rounded-full p-0.5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-base font-extrabold tracking-tight text-white">
                  KL Renovator
                </span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-400">
                  Aircon Specialist
                </span>
              </span>
            </NextLink>
            <p className="mt-4 text-sm text-slate-400 max-w-md">
              {siteConfig.description}
            </p>

            {/* Google rating badge */}
            <a
              href={siteConfig.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 hover:border-sky-500 transition"
            >
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-slate-300">
                <span className="font-semibold text-white">4.9 / 5</span> · 500+
                Google Reviews
              </span>
              <ExternalLink className="h-3 w-3 text-slate-500" />
            </a>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-2">
              <a
                aria-label="WhatsApp"
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-[rgb(var(--color-whatsapp))] text-white hover:brightness-110"
              >
                <FaWhatsapp className="h-4 w-4" />
              </a>
              <a
                aria-label="Facebook"
                href={siteConfig.links.facebook}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-blue-700 hover:text-white"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                aria-label="Instagram"
                href={siteConfig.links.instagram}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-blue-700 hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <NextLink
                    href={`/services/${s.slug}`}
                    className="text-slate-400 hover:text-sky-400 transition"
                  >
                    {s.title}
                  </NextLink>
                </li>
              ))}
              <li>
                <NextLink
                  href="/#services"
                  className="text-sky-400 hover:text-sky-300 transition font-semibold"
                >
                  View all services →
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-sky-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-slate-300 hover:text-sky-400"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-slate-300 hover:text-sky-400 break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-sky-400 shrink-0" />
                <a
                  href={siteConfig.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-sky-400"
                >
                  Find us on Google Maps
                  <ExternalLink className="inline h-3 w-3 ml-1" />
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 text-sky-400 shrink-0" />
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
