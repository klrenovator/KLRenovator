import type { Metadata } from "next";
import { TopicHubPage } from "@/components/topic-hub-page";
import { TOPIC_HUBS } from "@/config/topic-hubs";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";

const t = TOPIC_HUBS.pricing.copy.zh;

export const metadata: Metadata = {
  title: clampMetaTitle(t.metaTitle),
  description: padMetaDescription(t.metaDescription),
  alternates: buildTrilingualHreflang("/pricing", "zh"),
  openGraph: {
    title: clampMetaTitle(t.metaTitle),
    description: padMetaDescription(t.metaDescription),
    url: "https://www.klrenovator.com/zh/pricing",
    type: "website",
    locale: "zh_MY",
    siteName: "KL Renovator",
    images: [
      {
        url: "https://www.klrenovator.com/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp",
        width: 1200,
        height: 630,
        alt: "冷气服务价格 吉隆坡雪兰莪 — KL Renovator",
      },
    ],
  },
};

export default function Page() {
  return <TopicHubPage hubId="pricing" locale="zh" />;
}
