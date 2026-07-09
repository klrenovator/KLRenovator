import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { GalleryPageI18n } from "@/components/gallery-page-i18n";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气项目画廊 — KL Renovator 真实作品 | 吉隆坡及雪兰莪"),
  description:
    "KL Renovator 在吉隆坡及雪兰莪的真实冷气安装、化学清洗、大修及维修项目照片。100% 真实——无 stock 图片。",
  openGraph: {
    title: clampMetaTitle("项目画廊 — KL Renovator 真实冷气工程"),
    description: "真实项目照片：安装、化学清洗、大修、商用 HVAC 及维修，覆盖吉隆坡及雪兰莪全区。100% 真实照片。",
    url: "https://www.klrenovator.com/zh/gallery",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      { url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630, alt: "KL Renovator 冷气项目画廊" },
    ],
  },
  alternates: {
    canonical: "https://www.klrenovator.com/zh/gallery",
    languages: {
      "en-MY": "https://www.klrenovator.com/gallery",
      "ms-MY": "https://www.klrenovator.com/ms/gallery",
      "zh-MY": "https://www.klrenovator.com/zh/gallery",
      "x-default": "https://www.klrenovator.com/gallery",
    },
  },
};

export default function GalleryPageZH() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "首页", url: "https://www.klrenovator.com" },
          { name: "画廊", url: "https://www.klrenovator.com/zh/gallery" },
        ]}
      />
      <GalleryPageI18n lang="zh" />
    </>
  );
}
