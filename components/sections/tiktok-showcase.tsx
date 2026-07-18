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
// Order matches handoff v19 Section 7. We keep the short share URLs for
// outbound clicks, and use the resolved numeric TikTok video IDs with
// TikTok's official player/v1 iframe for reliable single-click playback.
const TIKTOK_VIDEOS: ReadonlyArray<{
  id: string;
  videoId: string;
  url: string;
  canonicalUrl: string;
  embedUrl: string;
  caption: string;
  captionMS: string;
  captionZH: string;
}> = [
  {
    id: "tt-1",
    videoId: "7638847576980065554",
    url: "https://vt.tiktok.com/ZSCteJX6e/",
    canonicalUrl: "https://www.tiktok.com/@klrenovator/video/7638847576980065554",
    embedUrl: "https://www.tiktok.com/player/v1/7638847576980065554",
    caption: "Petaling Jaya aircond installation with neat piping",
    captionMS: "Pemasangan aircond di Petaling Jaya dengan piping kemas",
    captionZH: "八打灵再也冷气安装，管线整齐",
  },
  {
    id: "tt-2",
    videoId: "7636810709262781703",
    url: "https://vt.tiktok.com/ZSCtenFmj/",
    canonicalUrl: "https://www.tiktok.com/@klrenovator/video/7636810709262781703",
    embedUrl: "https://www.tiktok.com/player/v1/7636810709262781703",
    caption: "Three aircond units installed in one day",
    captionMS: "Tiga unit aircond dipasang dalam satu hari",
    captionZH: "一天内完成三台冷气安装",
  },
  {
    id: "tt-3",
    videoId: "7635682478841187602",
    url: "https://vt.tiktok.com/ZSCtetdg3/",
    canonicalUrl: "https://www.tiktok.com/@klrenovator/video/7635682478841187602",
    embedUrl: "https://www.tiktok.com/player/v1/7635682478841187602",
    caption: "Aircond servicing, chemical cleaning and new installation support",
    captionMS: "Servis aircond, cucian kimia dan sokongan pemasangan baru",
    captionZH: "冷气保养、化学清洗与新机安装服务",
  },
  {
    id: "tt-4",
    videoId: "7624823112177093906",
    url: "https://vt.tiktok.com/ZSCteQ3UC/",
    canonicalUrl: "https://www.tiktok.com/@klrenovator/video/7624823112177093906",
    embedUrl: "https://www.tiktok.com/player/v1/7624823112177093906",
    caption: "Eight aircond installations completed in one day",
    captionMS: "Lapan pemasangan aircond siap dalam satu hari",
    captionZH: "一天内完成八台冷气安装",
  },
  {
    id: "tt-5",
    videoId: "7624113759505763591",
    url: "https://vt.tiktok.com/ZSCteu1fL/",
    canonicalUrl: "https://www.tiktok.com/@klrenovator/video/7624113759505763591",
    embedUrl: "https://www.tiktok.com/player/v1/7624113759505763591",
    caption: "Outdoor condenser cleaning to improve cooling performance",
    captionMS: "Cucian kondenser luar untuk tingkatkan prestasi penyejukan",
    captionZH: "清洗室外冷凝器，提升制冷表现",
  },
];

type Locale = "en" | "ms" | "zh";

const I18N = {
  en: {
    eyebrow: "Real Jobs. Real Reels.",
    title: "Watch KL Renovator on TikTok",
    subtitle:
      "Short, honest videos from real servicing jobs across Klang Valley \u2014 no studio, no scripts, just technicians doing the work.",
    playCta: "Play video",
    openCta: "Open on TikTok",
    followCta: "Follow @klrenovator",
    moreCta: "More real-work videos coming every week \u2014 book a slot today",
    bookWa: "Book on WhatsApp",
  },
  ms: {
    eyebrow: "Kerja Sebenar. Video Sebenar.",
    title: "Tonton KL Renovator di TikTok",
    subtitle:
      "Video pendek dan jujur dari kerja servis sebenar di sekitar Lembah Klang \u2014 tiada studio, tiada skrip, hanya juruteknik yang buat kerja.",
    playCta: "Main video",
    openCta: "Buka di TikTok",
    followCta: "Ikuti @klrenovator",
    moreCta: "Lebih banyak video kerja sebenar setiap minggu \u2014 tempah slot hari ini",
    bookWa: "Tempah di WhatsApp",
  },
  zh: {
    eyebrow: "\u771f\u5b9e\u5de5\u4f5c\u3002\u771f\u5b9e\u77ed\u89c6\u9891\u3002",
    title: "\u5728 TikTok \u89c2\u770b KL Renovator",
    subtitle:
      "\u6765\u81ea\u5df4\u751f\u8c37\u771f\u5b9e\u7ef4\u4fee\u5de5\u4f5c\u7684\u7b80\u77ed\u8bda\u5b9e\u89c6\u9891 \u2014 \u6ca1\u6709\u6444\u5f71\u680b\uff0c\u6ca1\u6709\u811a\u672c\uff0c\u53ea\u6709\u8ba4\u771f\u5de5\u4f5c\u7684\u6280\u5e08\u3002",
    playCta: "\u64ad\u653e\u89c6\u9891",
    openCta: "\u5728 TikTok \u6253\u5f00",
    followCta: "\u5173\u6ce8 @klrenovator",
    moreCta: "\u6bcf\u5468\u53d1\u5e03\u66f4\u591a\u771f\u5b9e\u5de5\u4f5c\u89c6\u9891 \u2014 \u7acb\u5373 WhatsApp \u9884\u7ea6",
    bookWa: "WhatsApp \u9884\u7ea6",
  },
} as const;

function captionOf(v: (typeof TIKTOK_VIDEOS)[number], loc: Locale): string {
  if (loc === "ms") return v.captionMS;
  if (loc === "zh") return v.captionZH;
  return v.caption;
}

function embedUrlOf(
  v: (typeof TIKTOK_VIDEOS)[number],
  loc: Locale,
  autoplay = false
): string {
  const lang = loc === "ms" ? "ms-MY" : loc === "zh" ? "zh-Hans" : "en";
  const params = new URLSearchParams({
    lang,
    autoplay: autoplay ? "1" : "0",
    // Muted autoplay is the most reliable cross-browser behavior after a
    // user taps the facade. Users can unmute inside the TikTok player.
    muted: autoplay ? "1" : "0",
    controls: "1",
    progress_bar: "1",
    play_button: "1",
    volume_control: "1",
    fullscreen_button: "1",
    loop: "0",
    rel: "0",
    description: "0",
    music_info: "0",
    native_context_menu: "1",
  });

  return `${v.embedUrl}?${params.toString()}`;
}

function TikTokCard({
  v,
  loc,
  anyPlayed,
  setAnyPlayed,
}: {
  v: (typeof TIKTOK_VIDEOS)[number];
  loc: Locale;
  anyPlayed: boolean;
  setAnyPlayed: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
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

  const nudgeTikTokPlay = useCallback(() => {
    const playerWindow = iframeRef.current?.contentWindow;
    if (!playerWindow) return;

    // TikTok player/v1 supports postMessage controls. We send a small
    // delayed play nudge after the iframe loads; autoplay=1&muted=1 remains
    // the primary mechanism, this is a safe fallback for slower mobile loads.
    playerWindow.postMessage({ type: "play", "x-tiktok-player": true }, "https://www.tiktok.com");
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timers = [
      window.setTimeout(nudgeTikTokPlay, 500),
      window.setTimeout(nudgeTikTokPlay, 1200),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [playing, nudgeTikTokPlay]);

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
            ref={iframeRef}
            src={embedUrlOf(v, loc, playing)}
            title={captionOf(v, loc)}
            allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={playing ? nudgeTikTokPlay : undefined}
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`${t.playCta}: ${captionOf(v, loc)}`}
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

  const waMsg = loc === "ms"
    ? "Hi KL Renovator, saya nak tempah slot servis aircond."
    : loc === "zh"
    ? "\u4f60\u597d KL Renovator\uff0c\u6211\u60f3\u9884\u7ea6\u51b7\u6c14\u7ef4\u4fee\u3002"
    : "Hi KL Renovator, I'd like to book an aircond servicing slot.";

  return (
    <section
      id="tiktok-showcase"
      aria-labelledby="tiktok-showcase-title"
      className="bg-slate-50 py-12 sm:py-16 lg:py-20"
    >

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
