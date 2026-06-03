"use client";

import * as React from "react";
import { LanguageProvider } from "@/context/language-context";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
