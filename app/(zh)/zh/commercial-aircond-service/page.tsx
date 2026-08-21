import type { Metadata } from "next";

import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { CommercialHubPage } from "@/components/commercial-hub-page";
import { COMMERCIAL_META } from "@/config/commercial-iaq-content";

const EN = "https://www.klrenovator.com/commercial-aircond-service";
const MS = "https://www.klrenovator.com/ms/servis-aircond-komersial";
const ZH = "https://www.klrenovator.com/zh/commercial-aircond-service";

export const metadata: Metadata = {
  title: COMMERCIAL_META.title.zh,
  description: padMetaDescription(COMMERCIAL_META.description.zh),
  openGraph: {
    title: COMMERCIAL_META.title.zh,
    description: COMMERCIAL_META.description.zh,
    type: "website",
    locale: "zh_MY",
    url: ZH,
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp", width: 1200, height: 630, alt: "商用冷气保养服务 吉隆坡与雪兰莪 — KL Renovator" }],
  },
  twitter: { card: "summary_large_image", title: COMMERCIAL_META.title.zh, description: COMMERCIAL_META.description.zh, images: ["https://www.klrenovator.com/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp"] },
  alternates: { canonical: ZH, languages: { "en-MY": EN, "ms-MY": MS, "zh-MY": ZH, "x-default": EN } },
};

export default function Page() {
  return <CommercialHubPage locale="zh" />;
}
