import Image from "next/image";

import {
  selectJobPhotos,
  type PhotoLocale,
} from "@/config/place-job-photos";

/**
 * A single, primary photograph for pages that need visual proof but do not
 * need the full three-photo `JobPhotoStrip` gallery.
 *
 * The source is always one of KL Renovator's 157 real jobs in `/public/hero`.
 * `seed` must be stable (normally the canonical URL), which makes the image
 * choice deterministic across builds. `hints` let the photo selector favour a
 * matching service, brand or Klang Valley area.
 */
export function PrimaryJobPhoto({
  seed,
  title,
  locale,
  pageUrl,
  hints = [],
  priority = false,
  sizes = "(min-width: 1024px) 640px, (min-width: 640px) 80vw, 100vw",
  className = "",
  aspectClassName = "aspect-[4/3]",
  showCaption = true,
}: {
  /** Stable per-page key, such as the canonical URL. */
  seed: string;
  /** Page-specific subject used in the visible caption, alt and ImageObject. */
  title: string;
  locale: PhotoLocale;
  /** Canonical URL used to connect the ImageObject to its page. */
  pageUrl?: string;
  /** Brand, service and/or area tokens used by the deterministic selector. */
  hints?: string[];
  /** Set only when this photo is part of the above-the-fold hero. */
  priority?: boolean;
  /** Responsive width contract passed through to next/image. */
  sizes?: string;
  className?: string;
  aspectClassName?: string;
  showCaption?: boolean;
}) {
  const [photo] = selectJobPhotos({
    key: seed,
    hints,
    count: 1,
    locale,
  });

  if (!photo) return null;

  // Keep the filename-derived description (what is actually shown) and add
  // the page subject. This is descriptive rather than a repeated, generic
  // "aircond service" alt string, while remaining accurate for the image.
  const alt = `${title}: ${photo.alt}`;
  const caption =
    locale === "ms"
      ? `${title} — foto kerja sebenar KL Renovator`
      : locale === "zh"
        ? `${title} — KL Renovator 真实作业照片`
        : `${title} — a real KL Renovator job photo`;
  const imageUrl = `https://www.klrenovator.com${photo.src}`;

  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": pageUrl ? `${pageUrl}#primary-job-photo` : undefined,
    name: title,
    contentUrl: imageUrl,
    url: imageUrl,
    caption: alt,
    description: alt,
    encodingFormat: "image/webp",
    creditText: "KL Renovator",
    creator: { "@type": "Organization", name: "KL Renovator" },
    copyrightNotice: "© KL Renovator",
    representativeOfPage: true,
    mainEntityOfPage: pageUrl ? { "@id": pageUrl } : undefined,
  };

  return (
    <figure className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />
      <div className={`relative bg-slate-100 ${aspectClassName}`}>
        <Image
          src={photo.src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          quality={80}
          className="object-cover"
        />
      </div>
      {showCaption ? (
        <figcaption className="border-t border-slate-100 px-4 py-3 text-xs leading-relaxed text-slate-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
