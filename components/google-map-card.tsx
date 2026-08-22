import { GoogleGIcon, GoogleIconSprites } from "@/components/google-brand-icons";
import { googlePlace } from "@/config/reviews";

type Lang = "en" | "ms" | "zh";

/**
 * GOOGLE MAPS CARD — keyless.
 *
 * Uses the public `output=embed` Maps URL, which needs no API key, no Cloud
 * project and no billing (the Maps Embed API key form is only required for the
 * `/maps/embed/v1/*` endpoints). `frame-src` in next.config.mjs already allows
 * https://www.google.com, so the iframe is CSP-clean.
 *
 * Server component — zero JS shipped.
 */

const COPY: Record<Lang, { eyebrow: string; title: string; cta: string; frameTitle: string }> = {
  en: {
    eyebrow: "Find Us On Google",
    title: "KL Renovator on Google Maps",
    cta: "Open in Google Maps",
    frameTitle: "Google Maps location of KL Renovator, Mont Kiara, Kuala Lumpur",
  },
  ms: {
    eyebrow: "Cari Kami Di Google",
    title: "KL Renovator di Google Maps",
    cta: "Buka dalam Google Maps",
    frameTitle: "Lokasi KL Renovator di Google Maps, Mont Kiara, Kuala Lumpur",
  },
  zh: {
    eyebrow: "在谷歌上找到我们",
    title: "KL Renovator 的 Google 地图位置",
    cta: "在 Google 地图中打开",
    frameTitle: "KL Renovator 在 Google 地图上的位置（吉隆坡 Mont Kiara）",
  },
};

/** Keyless Google Maps embed URL for the business listing. */
export const KEYLESS_MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=KL+Renovator+Mont+Kiara+Kuala+Lumpur&output=embed";

export function GoogleMapCard({
  locale = "en",
  includeSprite = true,
}: {
  locale?: Lang;
  /** Set to `false` when another component on the page already rendered the sprite. */
  includeSprite?: boolean;
}) {
  const d = COPY[locale];

  return (
    <div className="w-full border border-slate-200 bg-white shadow-sm">
      {includeSprite ? <GoogleIconSprites /> : null}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <GoogleGIcon className="h-6 w-6 shrink-0" />
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
            {d.eyebrow}
          </p>
          <p className="text-sm font-black text-slate-950">{d.title}</p>
        </div>
      </div>

      <iframe
        src={KEYLESS_MAPS_EMBED_SRC}
        title={d.frameTitle}
        width="100%"
        height="280"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full border-0"
      />

      <div className="border-t border-slate-100 px-5 py-4">
        <a
          href={googlePlace.mapsUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-700 transition-colors hover:text-sky-900"
        >
          {d.cta} →
        </a>
      </div>
    </div>
  );
}
