import type { Metadata } from "next";
import BlogPage from "@/app/blog/page";

export const metadata: Metadata = {
  title: "Tips & Panduan Pakar Aircond | KL Renovator Blog",
  description:
    "Nasihat praktikal aircond daripada KL Renovator — cuci kimia vs overhaul, sebab aircond tidak sejuk, kekerapan servis, jenis gas R22 R410A R32, dan lebih lagi.",
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
    title: "Tips & Panduan Pakar Aircond | KL Renovator Blog",
    description: "Panduan penyelenggaraan aircond praktikal, petua menyelesaikan masalah, dan nasihat servis daripada pakar HVAC dipercayai Malaysia.",
    url: "https://www.klrenovator.com/ms/blog",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [{ url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630 }],
  },
};

export default function BlogPageMS() {
  return <BlogPage initialLang="ms" />;
}
