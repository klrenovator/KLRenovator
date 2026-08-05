import { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { AdminAuth } from "@/components/admin-auth";

export const metadata: Metadata = {
  title: "Admin Booking Portal | KL Renovator",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminBookingPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-24 bg-slate-50 min-h-screen">
      <AdminAuth>
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-black text-slate-900">
            Admin Booking Portal
          </h1>
          <p className="mx-auto max-w-2xl text-slate-600">
            Create manual bookings for customers who prefer WhatsApp.
          </p>
        </div>

        <BookingForm isAdmin={true} />
      </AdminAuth>
    </div>
  );
}
