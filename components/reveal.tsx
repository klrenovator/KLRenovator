import { type ReactNode } from "react";
import clsx from "clsx";

type RevealProps = {
  children: ReactNode;
  /**
   * Kept for backwards compatibility with existing call sites.
   * Zero-JS render wrapper — no timers, no IntersectionObserver.
   */
  delay?: number;
  className?: string;
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
 * Now a plain render wrapper — content stays visible in SSR, no layout shift,
 * and heavy area/brand grids no longer pay per-card client-side observer cost.
 * The prop API is preserved so existing pages do not need mass edits.
 */
export const Reveal = ({
  children,
  className,
}: Omit<RevealProps, "as">) => {
  return <div className={clsx(className)}>{children}</div>;
};
