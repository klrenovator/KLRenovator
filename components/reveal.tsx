"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
} from "react";
import clsx from "clsx";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  once?: boolean;
};

/**
 * Scroll-reveal wrapper.
 *
 * Progressive-enhancement approach:
 *  - SSR / pre-JS: content renders fully VISIBLE (no FOUC, no hidden text).
 *  - On mount, if element is below the fold we hide it and observe; it
 *    fades-up into view when scrolled into the viewport.
 *  - Elements already in the viewport on mount stay visible (no flicker).
 *  - Respects prefers-reduced-motion.
 */
export const Reveal = ({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  once = true,
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"initial" | "hidden" | "visible">(
    "initial",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion — skip entirely
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setState("visible");
      return;
    }

    // If element is already in viewport on mount, keep visible (no animation)
    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 40 && rect.bottom > 0;
    if (inView) {
      setState("visible");
      return;
    }

    // Otherwise hide and wait for it to scroll in
    setState("hidden");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState("visible");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setState("hidden");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [once]);

  const Component = Tag as any;
  return (
    <Component
      ref={ref as any}
      className={clsx(
        state === "hidden" && "reveal-hidden",
        state === "visible" && "reveal-visible",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
};
