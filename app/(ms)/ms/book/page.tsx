import { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { BookingForm } from "@/components/booking-form";
import { BookingSupportInfo } from "@/components/booking-support-info";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Tempah Temujanji Servis Aircond | KL Renovator",
  description:
    padMetaDescription("Tempah servis aircond, pembaikan atau pemasangan dalam talian di KL & Selangor. Pilih perkhidmatan dan slot masa — pengesahan segera, tanpa deposit."),
  alternates: buildTrilingualHreflang("/book", "ms"),
  openGraph: {
    title: "Tempah Temujanji Aircond Dalam Talian | KL Renovator",
    description:
      "Pilih servis dan slot masa anda dalam talian. Servis aircond, baiki dan pemasangan merentasi KL & Selangor.",
    url: "https://www.klrenovator.com/ms/book",
    type: "website",
    locale: "ms_MY",
    images: [{
      url: "https://www.klrenovator.com/hero/lg-aircond-basic-servicing-subang-jaya-29.webp",
      width: 1200,
      height: 630,
      alt: "Tempah servis aircond dengan KL Renovator di KL dan Selangor",
    }],
  },
};

export default function BookPageMS() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-24">
      <BreadcrumbSchema items={[
        { name: "Laman Utama", url: "https://www.klrenovator.com/" },
        { name: "Tempah Slot", url: "https://www.klrenovator.com/ms/book" },
      ]} />
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-black text-slate-900 md:text-5xl">
          Jadualkan Servis Anda
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          Pilih servis anda dan tetapkan slot masa yang sesuai. Sistem kami akan mengira anggaran tempoh yang diperlukan untuk temujanji anda secara automatik.
        </p>
      </div>

      <div className="mx-auto mb-10 max-w-2xl">
        <PrimaryJobPhoto
          seed="https://www.klrenovator.com/ms/book"
          pageUrl="https://www.klrenovator.com/ms/book"
          title="Tempah Temujanji Servis Aircond Dalam Talian"
          locale="ms"
          hints={["basic-servicing"]}
          sizes="(min-width: 1024px) 672px, (min-width: 640px) 80vw, 100vw"
        />
      </div>

      <BookingForm isAdmin={false} forcedLang="ms" />

      <div className="mt-12 -mx-4">
        <BookingSupportInfo locale="ms" />
      </div>
    </div>
  );
}
