import SiteRootLayout, { metadata, viewport } from "@/components/site-root-layout";

export { metadata, viewport };

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteRootLayout locale="en">{children}</SiteRootLayout>;
}
