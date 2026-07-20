"use client";

import { useState, useEffect } from "react";
import { calculateDurationMinutes } from "@/lib/booking-config";

export function BookingForm({ isAdmin = false }: { isAdmin?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState("service");
  const [aircondType, setAircondType] = useState("Wall Mounted");
  const [aircondSize, setAircondSize] = useState("1.0 HP");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [fetchedOnce, setFetchedOnce] = useState(false);

  // Admin manual override
  const [manualHours, setManualHours] = useState("");

  // Calculations
  const baseDurationMinutes = calculateDurationMinutes(serviceType, aircondType, quantity);
  const totalDurationMinutes = isAdmin && manualHours !== "" && !isNaN(parseFloat(manualHours))
    ? parseFloat(manualHours) * 60
    : baseDurationMinutes;
    
  // Cap API slot finder to max 8 hours (480 mins) so it fits in a single day
  const apiDurationMinutes = Math.min(totalDurationMinutes, 480);
  
  const totalHours = (totalDurationMinutes / 60).toFixed(1);
  const daysRequired = Math.ceil(totalDurationMinutes / 480);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability();
    }
  }, [selectedDate, apiDurationMinutes]);

  const fetchAvailability = async () => {
    try {
      const res = await fetch(`/api/bookings/availability?date=${selectedDate}&duration=${apiDurationMinutes}`);
      const data = await res.json();
      if (data.availableSlots) {
        setAvailableSlots(data.availableSlots);
      } else {
        setAvailableSlots([]);
      }
      setFetchedOnce(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return alert("Please select a time slot");

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          phone,
          address,
          service_type: serviceType,
          aircond_type: aircondType,
          aircond_size: aircondSize,
          quantity,
          start_time: selectedSlot,
          source: isAdmin ? "whatsapp_manual" : "web",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        if (isAdmin) {
          const slotTime = new Date(selectedSlot).toLocaleTimeString("en-US", {
            hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kuala_Lumpur"
          });
          const slotDate = new Date(selectedSlot).toLocaleDateString("en-US", {
            timeZone: "Asia/Kuala_Lumpur"
          });
          
          let msgText = `Hi ${name}, your booking for ${serviceType.replace(/_/g, " ")} (${aircondType} ${aircondSize} x${quantity}) at ${address} is confirmed on ${slotDate} at ${slotTime}.`;
          
          if (daysRequired > 1) {
            msgText += `\n\nNote: As this is a large job, it will take ${daysRequired} days. The selected date is Day 1. Our team will coordinate the rest of the schedule with you.`;
          }
          
          const msg = encodeURIComponent(msgText);
          setGeneratedLink(`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${msg}`);
        }
      } else {
        alert(data.error || "Failed to book");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6 text-center shadow-lg">
        <h3 className="mb-2 text-xl font-bold text-sky-900">Booking Confirmed!</h3>
        <p className="text-slate-600 mb-4">Your appointment has been scheduled successfully.</p>
        {isAdmin && generatedLink && (
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
          >
            Send WhatsApp Confirmation
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{isAdmin ? "Admin Manual Booking" : "Book an Appointment"}</h2>
      
      <div>
        <label className="block text-sm font-semibold text-slate-700">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="e.g. Ali bin Ahmad"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Phone</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="e.g. 0123456789"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Full Address</label>
        <textarea
          required
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="Enter your full installation or service address"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700">Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => {
              setServiceType(e.target.value);
              setFetchedOnce(false);
              setSelectedSlot("");
            }}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="service">Aircond Service</option>
            <option value="installation">Aircond Installation</option>
            <option value="repair">Repair</option>
            <option value="gas_top_up">Gas Top Up</option>
            <option value="dismantle">Dismantle</option>
            <option value="relocate">Relocate</option>
            <option value="conceal_piping">Copper Pipe & Wiring (Conceal/Surface)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Aircond Type</label>
          <select
            value={aircondType}
            onChange={(e) => {
              setAircondType(e.target.value);
              setFetchedOnce(false);
              setSelectedSlot("");
            }}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="Wall Mounted">Wall Mounted</option>
            <option value="Ceiling Cassette">Ceiling Cassette</option>
            <option value="Window Unit">Window Unit</option>
            <option value="Centralized/Ducted">Centralized/Ducted</option>
            <option value="Portable">Portable</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700">Aircond Size / HP</label>
          <select
            value={aircondSize}
            onChange={(e) => setAircondSize(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="1.0 HP">1.0 HP</option>
            <option value="1.5 HP">1.5 HP</option>
            <option value="2.0 HP">2.0 HP</option>
            <option value="2.5 HP">2.5 HP</option>
            <option value="3.0 HP">3.0 HP</option>
            <option value="Not Confirmed / Don't Know">Not Confirmed / Don't Know</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Quantity</label>
          <input
            type="number"
            min="1"
            max="10"
            required
            value={quantity}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value, 10));
              setFetchedOnce(false);
              setSelectedSlot("");
            }}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      {isAdmin && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <label className="block text-sm font-bold text-red-700">Admin Override: Custom Duration (Hours)</label>
          <p className="text-xs text-red-600 mb-2">Leave blank to use standard system calculation ({baseDurationMinutes / 60} hrs).</p>
          <input
            type="number"
            step="0.5"
            min="0.5"
            value={manualHours}
            onChange={(e) => {
              setManualHours(e.target.value);
              setFetchedOnce(false);
              setSelectedSlot("");
            }}
            placeholder={`Default: ${baseDurationMinutes / 60} hours`}
            className="block w-full rounded-md border border-red-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      )}

      <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
        Estimated Time: <span className="font-semibold text-slate-900">{totalHours} hours</span>
      </div>

      {/* Multi-day Alert */}
      {totalDurationMinutes > 480 && (
        <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 border border-amber-200 shadow-sm leading-relaxed">
          <span className="font-bold text-amber-900">Important Note:</span> This job is large and requires <strong>{daysRequired} days</strong> to complete. 
          The time you select below will be booked as <strong>Day 1</strong>. Our team will coordinate the rest of the schedule with you.
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700">Select Date</label>
        <input
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot("");
            setFetchedOnce(false);
          }}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {selectedDate && fetchedOnce && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Available Times</label>
          {availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-2">
              {availableSlots.map((slot) => {
                const timeStr = new Date(slot).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kuala_Lumpur",
                });
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-lg px-2 py-2 text-sm font-semibold transition ${
                      selectedSlot === slot
                        ? "bg-sky-600 text-white shadow-md"
                        : "bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-100"
                    }`}
                  >
                    {timeStr}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg bg-red-50 p-3 border border-red-100 text-red-800 text-sm">
              Not enough time left today to start this job before 6:00 PM. Please select another date.
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !selectedSlot}
        className="w-full rounded-lg bg-sky-600 px-4 py-3.5 font-black text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed mt-4 shadow-md"
      >
        {loading ? "Processing..." : "Confirm Booking"}
      </button>
    </form>
  );
}
