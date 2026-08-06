import Image from "next/image";
import NextLink from "next/link";
import { FaStar, FaCamera, FaQuoteLeft } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

import { googleReviews, googlePlace } from "@/config/reviews";

// ─────────────────────────────────────────────────────────────────────────
// Social proof block for installation pages.
//
// Audit finding: every installation page (/aircond-installation-kl, the
// per-HP and per-type landings, all 39 area-installation pages, all 158
// kampung-installation pages, all 20 brand-installation pages) rendered
// exactly TWO images — the site logo and one hero — and contained no
// reviews, no testimonials and no project photos at all. Meanwhile the
// repo ships 93 genuine project photos that were only used on /gallery.
//
// This is a SERVER component on purpose: the photo list and review text
// are static, so none of it needs to reach the browser as JS.
// ─────────────────────────────────────────────────────────────────────────

export type ProofLocale = "en" | "ms" | "zh";

/** Real installation photos (subset of GALLERY_ITEMS, installation only). */
const INSTALLATION_PHOTOS = [
  {
    src: "/hero/aircond-installation-kuala-lumpur.webp",
    alt: "KL Renovator technician installing a wall-mounted aircond unit in a Kuala Lumpur apartment",
    caption: "Wall-mounted install · Kuala Lumpur",
  },
  {
    src: "/hero/aircond-bracket-installation-kl-renovator.webp",
    alt: "Outdoor compressor bracket securely mounted on wall during aircond installation by KL Renovator",
    caption: "Outdoor bracket mounting · KL",
  },
  {
    src: "/hero/aircond-ceiling-cassette-installation-commercial.webp",
    alt: "Ceiling cassette aircond unit being fitted in a commercial office space in KL",
    caption: "Ceiling cassette · Commercial office",
  },
  {
    src: "/hero/aircond-new-installation-petaling-jaya.webp",
    alt: "Fresh aircond installation with clean copper pipe and drain line setup in Petaling Jaya",
    caption: "Copper pipe & drain routing · PJ",
  },
  {
    src: "/hero/aircond-installation-double-unit-kl.webp",
    alt: "Two wall-mounted aircond units installed side by side in a Kuala Lumpur home",
    caption: "Multi-unit install · KL home",
  },
  {
    src: "/hero/aircond-compressor-installation-new-kl.webp",
    alt: "Brand new aircond outdoor compressor unit being connected and sealed by KL Renovator technician",
    caption: "Compressor connection & sealing · KL",
  },
] as const;

const COPY: Record<
  ProofLocale,
  {
    photoEyebrow: string;
    photoTitle: string;
    photoSub: string;
    galleryCta: string;
    reviewEyebrow: string;
    reviewTitle: string;
    reviewSub: string;
    verified: string;
  }
> = {
  en: {
    photoEyebrow: "Real Installation Work",
    photoTitle: "Actual Jobs, Not Stock Photos",
    photoSub:
      "Every photo below is real installation work completed by our own technicians across Kuala Lumpur and Selangor.",
    galleryCta: "See all 93 project photos",
    reviewEyebrow: "Verified Google Reviews",
    reviewTitle: "What Customers Say",
    reviewSub: "Rated 5.0 on Google Business Profile.",
    verified: "Verified Google review",
  },
  ms: {
    photoEyebrow: "Kerja Pemasangan Sebenar",
    photoTitle: "Kerja Sebenar, Bukan Gambar Stok",
    photoSub:
      "Setiap gambar di bawah adalah kerja pemasangan sebenar oleh juruteknik kami sendiri di Kuala Lumpur dan Selangor.",
    galleryCta: "Lihat semua 93 gambar projek",
    reviewEyebrow: "Ulasan Google Disahkan",
    reviewTitle: "Kata Pelanggan Kami",
    reviewSub: "Penarafan 5.0 di Google Business Profile.",
    verified: "Ulasan Google disahkan",
  },
  zh: {
    photoEyebrow: "真实安装案例",
    photoTitle: "真实工程，非素材图片",
    photoSub: "以下每张照片均为我们技师在吉隆坡及雪兰莪完成的真实安装工程。",
    galleryCta: "查看全部 93 张项目照片",
    reviewEyebrow: "已验证的 Google 评价",
    reviewTitle: "客户怎么说",
    reviewSub: "Google 商家资料 5.0 星评价。",
    verified: "已验证 Google 评价",
  },
};

function localePrefix(locale: ProofLocale) {
  return locale === "en" ? "" : `/${locale}`;
}

export function InstallationProof({
  locale = "en",
  photoCount = 6,
  reviewCount = 3,
  showReviews = true,
}: {
  locale?: ProofLocale;
  photoCount?: number;
  reviewCount?: number;
  showReviews?: boolean;
}) {
  const t = COPY[locale];
  const photos = INSTALLATION_PHOTOS.slice(0, photoCount);
  const reviews = googleReviews.slice(0, reviewCount);

  return (
    <>
      {/* ── Real project photos ─────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-white px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-600">
              <FaCamera className="h-3.5 w-3.5" />
              {t.photoEyebrow}
            </p>
            <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
              {t.photoTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">{t.photoSub}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {photos.map((photo) => (
              <figure
                key={photo.src}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-slate-50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
                    loading="lazy"
                    decoding="async"
                    quality={72}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-7 text-center">
            <NextLink
              href={`${localePrefix(locale)}/gallery`}
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-sky-600 transition-colors hover:text-sky-800"
            >
              {t.galleryCta} <FiArrowRight className="h-3.5 w-3.5" />
            </NextLink>
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────────────── */}
      {showReviews && reviews.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50 px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-amber-600">
                {t.reviewEyebrow}
              </p>
              <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
                {t.reviewTitle}
              </h2>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className="h-4 w-4 text-amber-400" />
                  ))}
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {googlePlace.averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-slate-500">· {t.reviewSub}</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <blockquote
                  key={`${review.author}-${review.date}`}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <FaQuoteLeft className="mb-3 h-4 w-4 shrink-0 text-sky-200" />
                  <p className="flex-1 text-sm leading-relaxed text-slate-700">{review.text}</p>
                  <footer className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-black text-sky-700">
                      {review.initials}
                    </span>
                    <span className="min-w-0">
                      <cite className="block truncate text-xs font-black not-italic text-slate-900">
                        {review.author}
                      </cite>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        {review.dateDisplay} · {t.verified}
                      </span>
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
