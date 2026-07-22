"use client";

import { FiStar, FiMapPin } from "react-icons/fi";
import { siteConfig } from "@/config/site";

interface ReviewTrustWidgetProps {
  locale?: "en" | "ms" | "zh";
  compact?: boolean;
}

export function ReviewTrustWidget({ locale = "en", compact = false }: ReviewTrustWidgetProps) {
  const data = {
    en: {
      title: "Real Customers. Real Results.",
      subtitle: "500+ five-star Google reviews from homeowners across KL & Selangor",
      cta: "Read Google Reviews",
      link: "https://www.google.com/search?q=KL+Renovator+reviews",
    },
    ms: {
      title: "Pelanggan Sebenar. Hasil Sebenar.",
      subtitle: "Lebih 500 ulasan 5-bintang Google daripada pemilik rumah di KL & Selangor",
      cta: "Baca Ulasan Google",
      link: "https://www.google.com/search?q=KL+Renovator+reviews",
    },
    zh: {
      title: "真实客户 · 真实结果",
      subtitle: "来自吉隆坡与雪兰莪屋主的 500+ 条五星 Google 评价",
      cta: "查看 Google 评价",
      link: "https://www.google.com/search?q=KL+Renovator+reviews",
    },
  };

  const d = data[locale];

  return (
    <div className={`rounded-3xl border border-emerald-200 bg-emerald-50 p-6 ${compact ? "max-w-md" : ""}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex -space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center ring-2 ring-white">
              <FiStar className="h-4 w-4 text-white" />
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-3xl font-black text-emerald-700">5.0</span>
            <span className="text-emerald-600">/ 5</span>
          </div>
          <p className="text-xs font-bold text-emerald-600">Based on 500+ reviews</p>
        </div>
      </div>

      <h3 className="font-black text-xl text-emerald-900 tracking-tight">{d.title}</h3>
      <p className="mt-2 text-sm text-emerald-700 leading-relaxed">{d.subtitle}</p>

      <div className="mt-5 flex items-center gap-2 text-xs font-bold text-emerald-600">
        <FiMapPin className="h-4 w-4" />
        <span>KL • Petaling Jaya • Shah Alam • Subang • Klang • Puchong</span>
      </div>

      <a
        href={d.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider px-6 py-3 text-xs transition-all"
      >
        {d.cta} →
      </a>
    </div>
  );
}
