import { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";

export const metadata: Metadata = {
  title: "在线预约冷气服务 | KL Renovator",
  description:
    "在吉隆坡及雪兰莪在线预约冷气清洗、维修或安装服务。选择您的服务与时间段 — 即时确认，无需押金。",
  alternates: buildTrilingualHreflang("/book", "zh"),
  openGraph: {
    title: "在线预约冷气服务 | KL Renovator",
    description:
      "在线选择服务与时间段。吉隆坡与雪兰莪专业冷气清洗、维修及安装。",
    url: "https://www.klrenovator.com/zh/book",
    type: "website",
    locale: "zh_MY",
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

      <BookingForm isAdmin={false} forcedLang="zh" />
    </div>
  );
}
