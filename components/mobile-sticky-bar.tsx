"use client";

import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";

const T = {
  en: {
    wa: "WhatsApp Us",
    call: "Call Now",
  },
  ms: {
    wa: "WhatsApp Kami",
    call: "Hubungi Sekarang",
  },
  zh: {
    wa: "WhatsApp 咨询",
    call: "立即通话",
  },
};

export const MobileStickyBar = () => {
  const { lang } = useLang();
  const tx = T[lang as keyof typeof T] || T.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden print:hidden">
      <div className="flex w-full items-stretch h-16 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        {/* WhatsApp Button */}
        <a
          href={waLink(rfqMsg)}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 bg-[#22c55e] text-white transition-colors hover:bg-[#16a34a] active:bg-[#15803d]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <FaWhatsapp className="h-6 w-6" />
          </div>
          <span className="text-sm font-black uppercase tracking-tight">
            {tx.wa}
          </span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex flex-1 items-center justify-center gap-2 bg-slate-900 text-white transition-colors hover:bg-slate-800 active:bg-black"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <FaPhone className="h-4 w-4" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-0.5">
              {tx.call}
            </span>
            <span className="text-sm font-black">
              {siteConfig.phoneDisplay}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
