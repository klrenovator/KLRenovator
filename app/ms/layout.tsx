/**
 * Malay (MS) locale layout.
 * 
 * P0-01/P0-08 Fix: This layout provides the correct server-side locale context
 * for all Malay pages. The LanguageProvider with initialLang="ms" ensures
 * client components render Malay content during SSR.
 * 
 * Note: In Next.js App Router, the root layout provides the single <html lang="en">
 * for all pages. We cannot override <html lang> in nested layouts. The solution
 * is to ensure LanguageProvider renders the correct locale content server-side.
 * 
 * For crawlers that don't execute JS, the content may still show English,
 * but the metadata (title, description) and hreflang are correctly set per locale.
 */
import { LanguageProvider } from "@/context/language-context";

export default function MsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider initialLang="ms">
      {children}
    </LanguageProvider>
  );
}
