import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { getBlogPostSummaries } from "@/app/(en)/blog/get-blog-summaries";
import BlogIndexClient from "@/app/(en)/blog/blog-index-client";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: clampMetaTitle("Tips & Panduan Pakar Aircond | KL Renovator Blog"),
  description:
    padMetaDescription("Nasihat praktikal aircond daripada KL Renovator — cuci kimia vs overhaul, sebab aircond tidak sejuk, kekerapan servis, jenis gas R22 R410A R32, dan lebih lagi."),
  alternates: {
    canonical: "https://www.klrenovator.com/ms/blog",
    languages: {
      "en-MY": "https://www.klrenovator.com/blog",
      "ms-MY": "https://www.klrenovator.com/ms/blog",
      "zh-MY": "https://www.klrenovator.com/zh/blog",
      "x-default": "https://www.klrenovator.com/blog",
    },
  },
  openGraph: {
    title: clampMetaTitle("Tips & Panduan Pakar Aircond | KL Renovator Blog"),
    description: "Panduan penyelenggaraan aircond praktikal, petua menyelesaikan masalah, dan nasihat servis daripada pakar HVAC dipercayai Malaysia.",
    url: "https://www.klrenovator.com/ms/blog",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [{ url: "https://www.klrenovator.com/hero/sharp-aircond-basic-servicing-cheras-115.webp", width: 1200, height: 630 }],
  },
};

export default function BlogPageMS() {
  const posts = getBlogPostSummaries();
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Laman Utama", url: "https://www.klrenovator.com/" },
        { name: "Blog", url: "https://www.klrenovator.com/ms/blog" },
      ]} />
      <BlogIndexClient posts={posts} initialLang="ms" />
    </>
  );
}
