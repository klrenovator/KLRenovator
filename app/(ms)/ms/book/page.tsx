import { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { BookingForm } from "@/components/booking-form";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";

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
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-black text-slate-900 md:text-5xl">
          Jadualkan Servis Anda
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          Pilih servis anda dan tetapkan slot masa yang sesuai. Sistem kami akan mengira anggaran tempoh yang diperlukan untuk temujanji anda secara automatik.
        </p>
      </div>

      <BookingForm isAdmin={false} forcedLang="ms" />
    </div>
  );
}
