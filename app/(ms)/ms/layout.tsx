import SiteRootLayout, { metadata, viewport } from "@/components/site-root-layout";

export { metadata, viewport };

export default function MalayRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteRootLayout locale="ms">{children}</SiteRootLayout>;
}
