import { tv } from "tailwind-variants";

/**
 * Title primitive.
 * - Default: solid foreground color (always readable).
 * - `color: "brand"` applies a brand gradient via bg-clip-text.
 */
export const title = tv({
  base: "tracking-tight inline font-bold text-slate-900 dark:text-white",
  variants: {
    color: {
      brand:
        "bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-brand-700 dark:from-brand-400 dark:to-brand-600",
      accent:
        "bg-clip-text text-transparent bg-gradient-to-r from-[rgb(var(--color-accent-500))] to-[rgb(var(--color-accent-600))]",
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
  base: "w-full md:w-3/4 my-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 block max-w-full",
  variants: { fullWidth: { true: "!w-full" } },
  defaultVariants: { fullWidth: true },
});

export const sectionContainer = tv({
  base: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
});
