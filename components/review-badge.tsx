"use client";

import { FaStar, FaGoogle } from "react-icons/fa6";
import { sitePublic } from "@/config/site-public";

export const ReviewBadge = ({ className = "" }: { className?: string }) => {
  return (
    <a
      href={sitePublic.links.googleBusiness}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-3 shadow-sm hover:shadow-md hover:border-sky-300 transition-all group ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-[#4285F4] group-hover:bg-sky-50 transition-colors">
        <FaGoogle className="h-5 w-5" />
      </div>
      <div>
        <div className="flex items-center gap-0.5 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="h-3 w-3 fill-current" />
          ))}
          <span className="ml-1.5 text-xs font-black text-slate-900">
            {sitePublic.reviewRating}.0
          </span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-sky-600 transition-colors">
          {sitePublic.reviewCount}+ Google Reviews
        </p>
      </div>
    </a>
  );
};
