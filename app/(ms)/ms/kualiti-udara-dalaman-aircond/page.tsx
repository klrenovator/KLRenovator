import type { Metadata } from "next";

import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { IaqHubPage } from "@/components/iaq-hub-page";
import { IAQ_META } from "@/config/commercial-iaq-content";

const EN = "https://www.klrenovator.com/indoor-air-quality-aircond";
const MS = "https://www.klrenovator.com/ms/kualiti-udara-dalaman-aircond";
const ZH = "https://www.klrenovator.com/zh/indoor-air-quality-aircond";

export const metadata: Metadata = {
  title: IAQ_META.title.ms,
  description: padMetaDescription(IAQ_META.description.ms),
  openGraph: {
    title: IAQ_META.title.ms,
    description: IAQ_META.description.ms,
    type: "website",
    locale: "ms_MY",
    url: MS,
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/hisense-aircond-chemical-wash-klang-111.webp", width: 1200, height: 630, alt: "Cuci kimia aircond untuk kualiti udara dalaman — KL Renovator" }],
  },
  twitter: { card: "summary_large_image", title: IAQ_META.title.ms, description: IAQ_META.description.ms, images: ["https://www.klrenovator.com/hero/hisense-aircond-chemical-wash-klang-111.webp"] },
  alternates: { canonical: MS, languages: { "en-MY": EN, "ms-MY": MS, "zh-MY": ZH, "x-default": EN } },
};

export default function Page() {
  return <IaqHubPage locale="ms" />;
}
