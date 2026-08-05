"use client";

import * as React from "react";
import { LanguageProvider, useLang, type Lang } from "@/context/language-context";

export interface ProvidersProps {
  children: React.ReactNode;
  /** Locale selected by the server route before the initial render. */
  initialLang?: Lang;
}

// Inner component that reads lang and applies it to <html>
function LangSync() {
  const { lang } = useLang();

  React.useEffect(() => {
    const map: Record<string, string> = {
      en: "en-MY",
      ms: "ms-MY",
      zh: "zh-MY",
    };
    document.documentElement.lang = map[lang] ?? "en-MY";
  }, [lang]);

  return null;
}

export function Providers({ children, initialLang = "en" }: ProvidersProps) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <LangSync />
      {children}
    </LanguageProvider>
  );
}
