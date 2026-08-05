"use client";

import { useEffect, useState, type ComponentType } from "react";

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

type ConversionWidgetsComponent = ComponentType;

/**
 *
 * The old layout imported the full ConversionWidgets client component on every
 * route. Its child widgets were dynamic, but the conversion island itself still
 * participated in the initial client graph. This loader keeps only a very small
 * hook in the critical path, then imports the real conversion widget bundle
 * after browser idle or the user's first interaction.
 */
export function ConversionWidgetsLoader() {
  const [Widgets, setWidgets] = useState<ConversionWidgetsComponent | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loaded = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const win = window as IdleWindow;

    const cancelScheduledIdle = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      if (idleId && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
        idleId = undefined;
      }
    };

    const loadWidgets = () => {
      if (cancelled || loaded) return;
      loaded = true;
      cancelScheduledIdle();
      void import("@/components/conversion-widgets").then((mod) => {
        if (!cancelled) setWidgets(() => mod.ConversionWidgets);
      });
    };

    const onFirstIntent = () => loadWidgets();

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(loadWidgets, { timeout: 2600 });
    } else {
      timeoutId = setTimeout(loadWidgets, 1800);
    }

    window.addEventListener("pointerdown", onFirstIntent, { once: true, passive: true });
    window.addEventListener("keydown", onFirstIntent, { once: true });
    window.addEventListener("touchstart", onFirstIntent, { once: true, passive: true });

    return () => {
      cancelled = true;
      cancelScheduledIdle();
      window.removeEventListener("pointerdown", onFirstIntent);
      window.removeEventListener("keydown", onFirstIntent);
      window.removeEventListener("touchstart", onFirstIntent);
    };
  }, []);

  if (!Widgets) return null;
  return <Widgets />;
}
