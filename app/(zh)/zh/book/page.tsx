import { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { BookingForm } from "@/components/booking-form";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";
import { BookingSupportInfo } from "@/components/booking-support-info";

export const metadata: Metadata = {
  title: "在线预约冷气服务 | KL Renovator",
  description:
    padMetaDescription("在吉隆坡及雪兰莪在线预约冷气清洗、维修或安装服务。选择您的服务与时间段 — 即时确认，无需押金。"),
  alternates: buildTrilingualHreflang("/book", "zh"),
  openGraph: {
    title: "在线预约冷气服务 | KL Renovator",
    description:
      "在线选择服务与时间段。吉隆坡与雪兰莪专业冷气清洗、维修及安装。",
    url: "https://www.klrenovator.com/zh/book",
    type: "website",
    locale: "zh_MY",
    images: [{
      url: "https://www.klrenovator.com/hero/lg-aircond-basic-servicing-subang-jaya-29.webp",
      width: 1200,
      height: 630,
      alt: "预约 KL Renovator 吉隆坡雪兰莪冷气服务",
    }],
  },
};

export default function BookPageZH() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-24">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-black text-slate-900 md:text-5xl">
          预约您的冷气服务
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          选择所需服务并挑选合适的时间段。系统将自动计算服务所需预计时长。
        </p>
      </div>

      <div className="mx-auto mb-10 max-w-2xl">
        <PrimaryJobPhoto
          seed="https://www.klrenovator.com/zh/book"
          pageUrl="https://www.klrenovator.com/zh/book"
          title="在线预约冷气服务"
          locale="zh"
          hints={["basic-servicing"]}
          sizes="(min-width: 1024px) 672px, (min-width: 640px) 80vw, 100vw"
        />
      </div>

      <BookingForm isAdmin={false} forcedLang="zh" />

      <div className="mt-12 -mx-4">
        <BookingSupportInfo locale="zh" />
      </div>
    </div>
  );
}
