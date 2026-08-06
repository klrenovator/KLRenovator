import { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";

export const metadata: Metadata = {
  title: "Book an Appointment | KL Renovator",
  description:
    "Book aircond servicing, repair or installation online in KL & Selangor. Pick your service and time slot — instant confirmation, no deposit.",
  alternates: buildTrilingualHreflang("/book", "en"),
  openGraph: {
    title: "Book an Aircond Appointment Online | KL Renovator",
    description:
      "Pick your service and time slot online. Aircond servicing, repair and installation across KL & Selangor.",
    url: "https://www.klrenovator.com/book",
    type: "website",
    locale: "en_MY",
  },
};

export default function BookPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-24">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-black text-slate-900 md:text-5xl">
          Schedule Your Service
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          Select your service and choose an available time slot. Our system will automatically calculate the required duration for your appointment.
        </p>
      </div>

      <BookingForm isAdmin={false} forcedLang="en" />
    </div>
  );
}
