import SiteRootLayout, { metadata, viewport } from "@/components/site-root-layout";

export { metadata, viewport };

export default function ChineseRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteRootLayout locale="zh">{children}</SiteRootLayout>;
}
