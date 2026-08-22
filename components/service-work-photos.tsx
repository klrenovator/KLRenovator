import Image from "next/image";

import {
  buildServiceProofPhotos,
  type ServiceGalleryLocale,
} from "@/config/service-gallery";

/**
 * "Real work proof" photo grid for the standalone service pages
 * (emergency + maintenance contract). The dynamic /services/[slug] routes
 * render the same data inline inside their own Reveal-animated section.
 *
 * Always renders at least 3 photos of the service being viewed — the copy and
 * captions come from config/service-gallery.ts in the page language.
 */
export function ServiceWorkPhotos({
  slug,
  lang,
  eyebrow,
  heading,
  intro,
  heroImage,
  heroTitle,
  heroAlt,
  accent = "sky",
  className = "py-14 px-4 bg-white border-y border-slate-100",
}: {
  slug: string;
  lang: ServiceGalleryLocale;
  eyebrow: string;
  heading: string;
  intro: string;
  heroImage?: string;
  heroTitle: string;
  heroAlt: string;
  accent?: "sky" | "red";
  className?: string;
}) {
  const photos = buildServiceProofPhotos({
    slug,
    lang,
    heroImage,
    heroTitle,
    heroAlt,
  });

  if (photos.length === 0) return null;

  const eyebrowColor = accent === "red" ? "text-red-600" : "text-sky-600";

  return (
    <section id={`${slug}-work-photos`} className={className}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className={`text-xs font-black uppercase tracking-widest ${eyebrowColor} mb-2`}>
            {eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{heading}</h2>
          <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto leading-relaxed">{intro}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all"
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
              <figcaption className="p-4">
                <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">
                  {photo.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{photo.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
