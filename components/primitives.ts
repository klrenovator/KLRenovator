import { tv } from "tailwind-variants";

/**
 * Title primitive — black & blue palette, square, professional.
 */
export const title = tv({
  base: "tracking-tight inline font-extrabold text-black",
  variants: {
    color: {
      brand: "text-brand-700",
      darkBrand: "text-brand-900",
      white: "text-white",
    },
    size: {
      sm: "text-2xl sm:text-3xl lg:text-4xl",
      md: "text-3xl sm:text-4xl lg:text-5xl",
      lg: "text-4xl sm:text-5xl lg:text-6xl",
      xl: "text-5xl sm:text-6xl lg:text-7xl",
    },
    fullWidth: { true: "w-full block" },
  },
  defaultVariants: { size: "md" },
});

export const subtitle = tv({
  base: "w-full md:w-3/4 my-2 text-base sm:text-lg text-slate-700 block max-w-full",
  variants: { fullWidth: { true: "!w-full" } },
  defaultVariants: { fullWidth: true },
});

export const sectionContainer = tv({
  base: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
});

export const eyebrow = tv({
  base: "inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-700",
});
