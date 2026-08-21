import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import {
  selectJobPhotos,
  type PhotoLocale,
} from "@/config/place-job-photos";

/**
 * "Real work photos" strip for the location / brand / problem templates
 * (kampung, brand-area, area, brand, problem).
 *
 * Fixes audit finding C8b / issue #73: 1,103 of these pages rendered ZERO
 * `<img>` in their body. This drops in a 3-photo grid of KL Renovator's own
 * job photos, deterministically selected + captioned per page by
 * config/place-job-photos.ts, so:
 *   - every page gains real content imagery (Google Images entry point),
 *   - alt text is page-specific and never a repeated template string,
 *   - an ImageObject node per photo makes the media machine-readable.
 *
 * Server component — no client JS. Uses next/image with correct `sizes`;
 * lazy by default because this block sits well below the fold on every
 * template that renders it (all of them have a hero/intro above it).
 */

type Locale = PhotoLocale;

type Variant = "place" | "problem" | "brand";

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    heading: (place: string, variant: Variant) => string;
    intro: (place: string, variant: Variant) => string;
    galleryCta: string;
    galleryHref: string;
  }
> = {
  en: {
    eyebrow: "Real Work · Not Stock Photos",
    heading: (place, variant) =>
      variant === "problem"
        ? `What fixing ${place} looks like on the job`
        : variant === "brand"
          ? `Recent ${place} aircond jobs we've handled`
          : `Recent aircond jobs around ${place}`,
    intro: (place, variant) =>
      variant === "problem"
        ? `Real KL Renovator repair and servicing work related to ${place} — every photo is our own team on site, not a stock image. We diagnose, quote, then fix across KL & Selangor.`
        : variant === "brand"
          ? `Real KL Renovator work on ${place} and other units — every photo is our own team on site, not a stock image. Chemical wash, gas top-up, repairs and installation across KL & Selangor.`
          : `A sample of real KL Renovator work near ${place} — every photo is our own team on site, not a stock image. Chemical wash, gas top-up, repairs and installation across KL & Selangor.`,
    galleryCta: "See the full photo gallery",
    galleryHref: "/gallery",
  },
  ms: {
    eyebrow: "Kerja Sebenar · Bukan Foto Stok",
    heading: (place, variant) =>
      variant === "problem"
        ? `Rupa kerja membaiki ${place} di lokasi`
        : variant === "brand"
          ? `Kerja aircond ${place} terkini yang kami kendalikan`
          : `Kerja aircond terkini sekitar ${place}`,
    intro: (place, variant) =>
      variant === "problem"
        ? `Kerja pembaikan dan servis sebenar KL Renovator berkaitan ${place} — setiap foto ialah pasukan kami sendiri di lokasi, bukan imej stok. Kami diagnos, beri sebut harga, kemudian baiki di seluruh KL & Selangor.`
        : variant === "brand"
          ? `Kerja sebenar KL Renovator pada unit ${place} dan lain-lain — setiap foto ialah pasukan kami sendiri di lokasi, bukan imej stok. Cuci kimia, tambah gas, pembaikan dan pemasangan di seluruh KL & Selangor.`
          : `Contoh kerja sebenar KL Renovator berhampiran ${place} — setiap foto ialah pasukan kami sendiri di lokasi, bukan imej stok. Cuci kimia, tambah gas, pembaikan dan pemasangan di seluruh KL & Selangor.`,
    galleryCta: "Lihat galeri foto penuh",
    galleryHref: "/ms/gallery",
  },
  zh: {
    eyebrow: "真实作业 · 非图库照片",
    heading: (place, variant) =>
      variant === "problem"
        ? `处理${place}的实际作业实拍`
        : variant === "brand"
          ? `我们近期处理的${place}冷气作业`
          : `${place}一带的近期冷气作业`,
    intro: (place, variant) =>
      variant === "problem"
        ? `KL Renovator 与${place}相关的真实维修与保养作业 — 每张照片都是我们团队亲自在现场施工，绝非图库素材。先诊断、后报价、再维修，覆盖吉隆坡与雪兰莪。`
        : variant === "brand"
          ? `KL Renovator 对${place}及其他品牌冷气的真实施工实拍 — 每张照片都是我们团队亲自在现场施工，绝非图库素材。化学清洗、加气、维修与安装，覆盖吉隆坡与雪兰莪。`
          : `KL Renovator 在${place}附近的真实作业实拍 — 每张照片都是我们团队亲自在现场施工，绝非图库素材。化学清洗、加气、维修与安装，覆盖吉隆坡与雪兰莪。`,
    galleryCta: "查看完整照片库",
    galleryHref: "/zh/gallery",
  },
};

export function JobPhotoStrip({
  place,
  brand,
  hints = [],
  seed,
  locale,
  count = 3,
  variant = "place",
  className = "py-12 bg-white border-t border-slate-100",
}: {
  /**
   * For variant "place": the area/kampung name, written into the heading and
   * the alt text. For variant "problem": the problem name — used only in the
   * heading; alt text stays location-generic since the photo isn't tied to a
   * specific place.
   */
  place: string;
  /** Brand name/slug when the page is brand-specific. */
  brand?: string;
  /** Matching hints — brand slug, area slug, service token. */
  hints?: string[];
  /** Stable per-page selection key (route or slug). */
  seed: string;
  locale: Locale;
  count?: number;
  variant?: Variant;
  className?: string;
}) {
  const copy = COPY[locale];
  const photos = selectJobPhotos({
    key: seed,
    // On problem pages `place` is a symptom and on brand pages it is a brand
    // name — neither is a location, so don't write it into the alt text as if
    // it were an address (the brand is passed separately via `brand`).
    place: variant === "place" ? place : undefined,
    brand,
    hints,
    count,
    locale,
  });

  if (photos.length === 0) return null;

  const imageSchema = photos.map((photo) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `https://www.klrenovator.com${photo.src}`,
    url: `https://www.klrenovator.com${photo.src}`,
    caption: photo.alt,
    creditText: "KL Renovator",
    creator: { "@type": "Organization", name: "KL Renovator" },
    copyrightNotice: "© KL Renovator",
    representativeOfPage: false,
  }));

  return (
    <section id="job-photo-strip" className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
          {copy.eyebrow}
        </p>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
          {copy.heading(place, variant)}
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-3xl">
          {copy.intro(place, variant)}
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="p-4 text-xs leading-relaxed text-slate-500">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href={copy.galleryHref}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-sky-700 hover:gap-2.5 transition-all"
          >
            {copy.galleryCta} <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
