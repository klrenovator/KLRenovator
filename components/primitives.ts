import { tv } from "tailwind-variants";

/**
 * Title primitive.
 * - Default: solid foreground color (always readable).
 * - `color: "brand"` applies a brand gradient with SOLID fallback
 *   so text is never invisible on browsers that don't support
 *   background-clip: text.
 */
export const title = tv({
  base: "tracking-tight inline font-extrabold text-slate-900 dark:text-white",
  variants: {
    color: {
      brand: "brand-gradient-text",
      accent:
        "text-[rgb(var(--color-accent-500))] dark:text-[rgb(var(--color-accent-400))]",
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
  base: "w-full md:w-3/4 my-2 text-base sm:text-lg text-slate-600 dark:text-slate-300 block max-w-full",
  variants: { fullWidth: { true: "!w-full" } },
  defaultVariants: { fullWidth: true },
});

export const sectionContainer = tv({
  base: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
});
