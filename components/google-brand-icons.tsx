/**
 * Shared Google brand SVG sprite (the multicolour "G" + a solid star).
 *
 * These symbols used to live inside `components/sections/google-reviews.tsx`.
 * They are now shared so the reviews marquee, the Google review widget and any
 * future Google-branded surface can reference the same `<symbol>` definitions
 * with `<use href="#kl-google-g" />` / `<use href="#kl-star" />` instead of
 * re-inlining ~2 KB of path data per card.
 *
 * Render `<GoogleIconSprites />` ONCE per page. Components that ship their own
 * sprite expose an `includeSprite` prop so a second copy can be suppressed when
 * another component on the same page already rendered it.
 */

export const GOOGLE_G_SYMBOL_ID = "kl-google-g";
export const STAR_SYMBOL_ID = "kl-star";

/** The `<symbol>` definitions. Renders nothing visible. */
export const GoogleIconSprites = () => (
  <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
    <symbol id={GOOGLE_G_SYMBOL_ID} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6.26c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </symbol>
    <symbol id={STAR_SYMBOL_ID} viewBox="0 0 576 512">
      <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.1c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288.1 439.8 416.2 507.7c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.3 329 542.4 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381 150.3 316.9 18z"/>
    </symbol>
  </svg>
);

/** Official multicolour Google "G". Size it with `className` height/width utilities. */
export const GoogleGIcon = ({ className }: { className?: string }) => (
  <svg className={className} aria-hidden="true">
    <use href={`#${GOOGLE_G_SYMBOL_ID}`} />
  </svg>
);

/** A row of `count` amber stars. */
export const GoogleStars = ({
  count,
  className,
  starClassName = "h-3.5 w-3.5",
  label,
}: {
  count: number;
  className?: string;
  starClassName?: string;
  label?: string;
}) => (
  <span
    className={`inline-flex items-center gap-0.5 text-amber-400 ${className ?? ""}`}
    aria-label={label ?? `${count} star rating`}
  >
    {Array.from({ length: count }).map((_, k) => (
      <svg key={k} className={starClassName} aria-hidden="true">
        <use href={`#${STAR_SYMBOL_ID}`} />
      </svg>
    ))}
  </span>
);
