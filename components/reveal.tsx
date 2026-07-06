import { type ElementType, type ReactNode } from "react";
import clsx from "clsx";

type RevealProps = {
  children: ReactNode;
  /**
   * Kept for backwards compatibility with existing call sites.
   * Round 17 / 20H.81 intentionally does not run JS timers or
   * IntersectionObserver per block, so delay is no longer executed.
   */
  delay?: number;
  className?: string;
  as?: ElementType;
  /**
   * Kept for backwards compatibility with existing call sites.
   * No client-side observer means there is no repeated animation state.
   */
  once?: boolean;
};

/**
 * Zero-JS reveal wrapper.
 *
 * Earlier versions of this component were a Client Component that created a
 * React state hook, timeout and IntersectionObserver for every <Reveal> block.
 * Area and brand templates render dozens of these wrappers per page, which
 * inflated hydration work and Total Blocking Time on crawl-heavy pages.
 *
 * Round 17 / 20H.81 converts Reveal into a plain render wrapper. Content stays
 * visible in SSR, there is no layout shift, and heavy area/brand grids no
 * longer pay per-card client-side observer cost. The prop API is preserved so
 * existing pages do not need mass edits.
 */
export const Reveal = ({
  children,
  delay: _delay = 0,
  className,
  as: Tag = "div",
  once: _once = true,
}: RevealProps) => {
  const Component = Tag as any;

  return <Component className={clsx(className)}>{children}</Component>;
};
