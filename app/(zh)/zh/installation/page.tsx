import type { Metadata } from "next";
import { InstallationHubPage } from "@/components/installation-hub-page";
import { HUB_COPY } from "@/config/installation-hub";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";

const t = HUB_COPY.zh;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: buildTrilingualHreflang("/installation", "zh"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDescription,
    url: "https://www.klrenovator.com/zh/installation",
    type: "website",
    locale: "zh_MY",
    siteName: "KL Renovator",
    images: [
      {
        url: "https://www.klrenovator.com/logo/image.png",
        width: 1200,
        height: 630,
        alt: "Aircond installation KL & Selangor — KL Renovator",
      },
    ],
  },
};

export default function Page() {
  return <InstallationHubPage locale="zh" />;
}
