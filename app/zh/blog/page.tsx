import type { Metadata } from "next";
import BlogPage from "@/app/blog/page";

export const metadata: Metadata = {
  title: "冷气小贴士及专家指南 | KL Renovator Blog",
  description:
    "来自KL Renovator的实用冷气建议——化学清洗与大修对比、冷气不冷的原因、保养频率、R22 R410A R32制冷剂类型等。",
  alternates: {
    canonical: "https://www.klrenovator.com/zh/blog",
    languages: {
      "en-MY": "https://www.klrenovator.com/blog",
      "ms-MY": "https://www.klrenovator.com/ms/blog",
      "zh-MY": "https://www.klrenovator.com/zh/blog",
      "x-default": "https://www.klrenovator.com/blog",
    },
  },
  openGraph: {
    title: "冷气小贴士及专家指南 | KL Renovator Blog",
    description: "马来西亚值得信赖的HVAC专家提供的实用冷气保养指南、故障排除技巧及服务建议。",
    url: "https://www.klrenovator.com/zh/blog",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [{ url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630 }],
  },
};

export default function BlogPageZH() {
  return <BlogPage initialLang="zh" />;
}
