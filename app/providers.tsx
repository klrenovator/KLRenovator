"use client";

import * as React from "react";
import { LanguageProvider, useLang } from "@/context/language-context";

export interface ProvidersProps {
  children: React.ReactNode;
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

export function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <LangSync />
      {children}
    </LanguageProvider>
  );
}
