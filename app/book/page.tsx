import { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book an Appointment | KL Renovator",
  description: "Schedule your aircond servicing, repair, or installation online with KL Renovator.",
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

      <BookingForm isAdmin={false} />
    </div>
  );
}
