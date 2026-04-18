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
 * IMPORTANT: Content is ALWAYS visible by default (no `reveal-hidden` class
 * is ever applied in SSR or before JS runs). If a supported IntersectionObserver
 * is present and the element enters the viewport, we apply the fade-up
 * animation. If anything goes wrong, the content simply stays visible.
 *
 * This avoids any scenario where text becomes permanently invisible.
 */
export const Reveal = ({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  once = true,
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;

    // Reduced motion — never animate, always visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // If IntersectionObserver isn't available, skip animation entirely.
    if (!("IntersectionObserver" in window)) {
      setAnimated(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            if (once) io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    io.observe(node);

    // Safety net: if IO hasn't fired in 1.2s, just show normally.
    const t = window.setTimeout(() => setAnimated(true), 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [once]);

  const Component = Tag as any;
  return (
    <Component
      ref={ref as any}
      className={clsx(animated && "reveal-visible", className)}
      style={animated ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
};
