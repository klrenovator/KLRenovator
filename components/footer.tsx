"use client";

import { Link } from "@nextui-org/link";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FiArrowUpRight as FiArrowIcon } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 grid-cols-1 md:grid-cols-3">
        
        {/* Brand Block */}
        <div className="space-y-4">
          <p className="text-white font-black text-xl tracking-tight uppercase">
            KL <span className="text-sky-400">RENOVATOR</span>
          </p>
          <p className="text-xs leading-relaxed max-w-sm">
            Premium residential and commercial airconditioning matrix across Kuala Lumpur &amp; Selangor. Managed under Multicore Dynamic Resources.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href={waLink(rfqMsg)} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:text-[#22c55e] transition">
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-slate-900 rounded-lg hover:text-sky-400 transition">
              <FaInstagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Contact Block */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-white">Direct Dispatch</p>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center gap-2.5">
              <FaPhone className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition font-mono">{siteConfig.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <FaEnvelope className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition break-all">{siteConfig.email}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <FaLocationDot className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <span>KL &amp; Selangor (Klang Valley)</span>
            </li>
          </ul>
        </div>

        {/* Operation Settings */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-white">Availability</p>
          <div className="flex items-start gap-2.5 text-xs">
            <FaClock className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-slate-300 font-bold">{siteConfig.hours}</p>
              <p className="mt-1 opacity-70">Emergency Troubleshooting &amp; Precision Gas Balancing Bookings Active.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p>© {new Date().getFullYear()} KL RENOVATOR. All rights reserved.</p>
        <p className="opacity-50">HVAC Solutions &amp; Maintenance Matrix</p>
      </div>
    </footer>
  );
};
