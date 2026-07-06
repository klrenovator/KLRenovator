// ─────────────────────────────────────────────────────────────────────────
// TikTok Vertical Video Embed Showcase — Round 13 / 20G.72 & 11.7
// ─────────────────────────────────────────────────────────────────────────
// 5 LIVE TikTok video links LOCKED by user (2026-07-06) — see MASTER
// HANDOFF v19 Section 7. Implementation strategy: LAZY FACADE PATTERN.
// Each card renders a static thumbnail with a play button. The actual
// TikTok iframe (and the ~150KB external script it pulls in) is only
// injected after the user clicks "Play". This keeps:
//   - Initial page weight: ZERO TikTok JS / CSS
//   - TBT: unaffected (no third-party script parse/eval on load)
//   - LCP: unaffected (no extra DOM nodes above the fold)
//   - CLS: zero — all cards have reserved 9:16 aspect ratio
// Once any one card is played, the remaining cards become eager-load
// on hover/in-viewport, since the user has already opted in to TikTok.
// ─────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { FaTiktok, FaPlay, FaWhatsapp } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

// 5 LOCKED TikTok short video URLs (provided by user 2026-07-06).
// Order matches handoff v19 Section 7.
type TikTokVideo = {
  id: string;
  url: string;
  embedUrl: string;
  caption: string;
  captionMS: string;
  captionZH: string;
};

type Locale = "en" | "ms" | "zh";

const TIKTOK_VIDEOS: ReadonlyArray<TikTokVideo> = [
  {
    id: "tt-1",
    url: "https://vt.tiktok.com/ZSCteJX6e/",
    embedUrl: "https://www.tiktok.com/embed/v2/ZSCteJX6e/?lang=en",
    caption: "Watch real chemical wash on a clogged wall unit",
    captionMS: "Tonton cuci kimia sebenar pada unit dinding tersumbat",
    captionZH: "观看真实堵塞壁挂机化学清洗过程",
  },
  {
    id: "tt-2",
    url: "https://vt.tiktok.com/ZSCtenFmj/",
    embedUrl: "https://www.tiktok.com/embed/v2/ZSCtenFmj/?lang=en",
    caption: "Why your aircond smells bad — 60s explainer",
    captionMS: "Kenapa aircond anda berbau busuk — penjelasan 60 saat",
    captionZH: "为什么冷气有异味 — 60秒讲解",
  },
  {
    id: "tt-3",
    url: "https://vt.tiktok.com/ZSCtetdg3/",
    embedUrl: "https://www.tiktok.com/embed/v2/ZSCtetdg3/?lang=en",
    caption: "Chemical overhaul — full dismantle in 90s",
    captionMS: "Overhaul kimia — pelepasan penuh dalam 90 saat",
    captionZH: "化学大修 — 90秒完整拆解",
  },
  {
    id: "tt-4",
    url: "https://vt.tiktok.com/ZSCteQ3UC/",
    embedUrl: "https://www.tiktok.com/embed/v2/ZSCteQ3UC/?lang=en",
    caption: "Gas top-up R32 — what's the right pressure?",
    captionMS: "Tambah gas R32 — apakah tekanan yang betul?",
    captionZH: "R32加气 — 正确压力是多少？",
  },
  {
    id: "tt-5",
    url: "https://vt.tiktok.com/ZSCteu1fL/",
    embedUrl: "https://www.tiktok.com/embed/v2/ZSCteu1fL/?lang=en",
    caption: "Indoor unit cleaning — drain pipe cleared",
    captionMS: "Pencucian unit dalaman — paip longkang dibersihkan",
    captionZH: "室内机清洗 — 排水管已清理",
  },
];

const I18N = {
  en: {
    eyebrow: "Real Jobs. Real Reels.",
    title: "Watch KL Renovator on TikTok",
    subtitle:
      "Short, honest videos from real servicing jobs across Klang Valley — no studio, no scripts, just technicians doing the work.",
    playCta: "Play video",
    openCta: "Open on TikTok",
    followCta: "Follow @klrenovator",
    moreCta: "More real-work videos coming every week — book a slot today",
    bookWa: "Book on WhatsApp",
  },
  ms: {
    eyebrow: "Kerja Sebenar. Video Sebenar.",
    title: "Tonton KL Renovator di TikTok",
    subtitle:
      "Video pendek dan jujur dari kerja servis sebenar di sekitar Lembah Klang — tiada studio, tiada skrip, hanya juruteknik yang buat kerja.",
    playCta: "Main video",
    openCta: "Buka di TikTok",
    followCta: "Ikuti @klrenovator",
    moreCta: "Lebih banyak video kerja sebenar setiap minggu — tempah slot hari ini",
    bookWa: "Tempah di WhatsApp",
  },
  zh: {
    eyebrow: "真实工作。真实短视频。",
    title: "在 TikTok 观看 KL Renovator",
    subtitle: "来自巴生谷真实维修工作的简短诚实视频 — 没有摄影棚，没有脚本，只有认真工作的技师。",
    playCta: "播放视频",
    openCta: "在 TikTok 打开",
    followCta: "关注 @klrenovator",
    moreCta: "每周发布更多真实工作视频 — 立即 WhatsApp 预约",
    bookWa: "WhatsApp 预约",
  },
};

function captionOf(v: TikTokVideo, loc: Locale): string {
  if (loc === "ms") return v.captionMS;
  if (loc === "zh") return v.captionZH;
  return v.caption;
}

function TikTokCard({ v, loc, anyPlayed, setAnyPlayed }: { v: TikTokVideo; loc: Locale; anyPlayed: boolean; setAnyPlayed: () => void; }) {
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const t = I18N[loc];

  useEffect(() => {
    if (!anyPlayed) return;
    if (!ref.current || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            return;
          }
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [anyPlayed]);

  const onPlay = useCallback(() => {
    setPlaying(true);
    setAnyPlayed();
  }, [setAnyPlayed]);

  const shouldRenderIframe = playing || (anyPlayed && inView);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
        {shouldRenderIframe ? (
          <iframe
            src={v.embedUrl}
            title={captionOf(v, loc)}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label={t.playCta + ": " + captionOf(v, loc)}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white transition hover:from-slate-800 hover:to-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-400/40"
          >
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur transition group-hover:scale-110 group-hover:bg-white/25">
              <FaPlay className="h-6 w-6 translate-x-[1px]" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
              <FaTiktok className="h-3.5 w-3.5" aria-hidden="true" />
              <span>TikTok</span>
            </div>
            <div className="mt-2 px-4 text-center text-sm font-medium leading-snug text-white/95">
              {captionOf(v, loc)}
            </div>
            <div className="mt-3 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 group-hover:bg-white/20">
              {t.playCta}
            </div>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 px-3 py-2.5 text-xs">
        <p className="line-clamp-2 flex-1 text-slate-700">{captionOf(v, loc)}</p>
        <a
          href={v.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
          aria-label={t.openCta}
        >
          <FaTiktok className="h-3 w-3" aria-hidden="true" />
          <FiExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function TikTokShowcase({ locale = "en" }: { locale?: Locale }) {
  const loc: Locale = I18N[locale] ? locale : "en";
  const t = I18N[loc];
  const [anyPlayed, setAnyPlayed] = useState(false);

  const handleAnyPlayed = useCallback(() => setAnyPlayed(true), []);

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TIKTOK_VIDEOS.map((v, i) => ({
      "@type": "VideoObject",
      position: i + 1,
      name: captionOf(v, loc),
      description: captionOf(v, loc) + " — KL Renovator real-job video. " + siteConfig.tagline,
      contentUrl: v.url,
      embedUrl: v.embedUrl,
      uploadDate: "2026-07-06",
      publisher: {
        "@type": "Organization",
        name: "KL Renovator",
        url: "https://www.klrenovator.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.klrenovator.com/logo/image.png",
        },
      },
    })),
  };

  const waMsg = loc === "ms"
    ? "Hi KL Renovator, saya nak tempah slot servis aircond."
    : loc === "zh"
    ? "你好 KL Renovator，我想预约冷气维修。"
    : "Hi KL Renovator, I'd like to book an aircond servicing slot.";

  return (
    <section
      id="tiktok-showcase"
      aria-labelledby="tiktok-showcase-title"
      className="bg-slate-50 py-12 sm:py-16 lg:py-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              <FaTiktok className="h-3 w-3" aria-hidden="true" />
              {t.eyebrow}
            </p>
            <h2
              id="tiktok-showcase-title"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              {t.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              {t.subtitle}
            </p>
          </div>
          <a
            href={siteConfig.links.tiktok}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-sky-400 hover:text-sky-700"
          >
            <FaTiktok className="h-4 w-4" aria-hidden="true" />
            {t.followCta}
            <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {TIKTOK_VIDEOS.map((v) => (
            <TikTokCard
              key={v.id}
              v={v}
              loc={loc}
              anyPlayed={anyPlayed}
              setAnyPlayed={handleAnyPlayed}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-white p-4 sm:flex-row sm:p-5">
          <p className="text-center text-sm text-slate-700 sm:text-left">
            {t.moreCta}
          </p>
          <a
            href={waLink(waMsg)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-600"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
            {t.bookWa}
          </a>
        </div>
      </div>
    </section>
  );
}

export default TikTokShowcase;
