"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaPhone, FaRegComments, FaWhatsapp, FaXmark } from "react-icons/fa6";
import { waLink } from "@/lib/whatsapp";

type Message = { from: "bot" | "user"; text: string };

const welcome: Message = {
  from: "bot",
  text: "Hi! I’m KL Renovator’s service assistant. I can help with official prices, repairs, chemical overhaul, and booking across KL & Selangor. How can I help?",
};

function answerFor(text: string) {
  const q = text.toLowerCase();
  if (/diagnos|check.?up|inspect|troubleshoot/.test(q)) return "Our diagnostic fee is RM88, and it is fully WAIVED when you proceed with the repair through KL Renovator. Repairs start from RM88. What issue is your aircond having?";
  if (/chemical|overhaul/.test(q)) return "Wall-mounted chemical overhaul: 1.0–1.5 HP RM350, 2.0–2.5 HP RM410, and 3.0–3.5 HP RM450. Please share your unit HP, location, and preferred date to book.";
  if (/window/.test(q)) return "Window unit servicing / installation is RM199 for 1.0–1.5 HP and RM249 for 2.0–2.5 HP. Please tell me your location in KL or Selangor and preferred date/time.";
  if (/capacitor/.test(q)) return "Capacitor replacement is RM150–RM250. The RM88 diagnostic fee is waived if you proceed with the repair.";
  if (/fan motor|motor/.test(q)) return "Fan motor replacement is RM350–RM580. The RM88 diagnostic fee is FREE when you proceed with the repair.";
  if (/pcb|board/.test(q)) return "PCB board replacement is RM350–RM600. We first diagnose the unit for RM88, waived if you proceed with our repair.";
  if (/gas leak|leak/.test(q)) return "Gas leak repair is RM120 per leak. A technician can confirm the leak location; the RM88 diagnostic fee is waived when you proceed with the repair.";
  if (/sensor|temperature/.test(q)) return "Temperature sensor replacement is RM150–RM250. The RM88 diagnostic fee is waived if you proceed with the repair.";
  if (/contactor/.test(q)) return "Contactor replacement is RM150–RM200. The RM88 diagnostic fee is waived if you proceed with the repair.";
  if (/drain pump/.test(q)) return "Drain pump replacement is RM350–RM550. The RM88 diagnostic fee is waived if you proceed with the repair.";
  if (/compressor/.test(q)) return "Compressor replacement is RM800–RM2,000. We recommend a diagnosis first; its RM88 fee is waived if you proceed with the repair.";
  if (/install/.test(q)) return "A standard installation includes 7 ft copper pipe with insulation, electrical wiring and drain pipe, vacuum commissioning to 500 microns, a 15-minute cooling test, and a 1-month written workmanship warranty. Brackets, extra piping, trunking and special electrical work are quoted separately. For a custom installation quote, please WhatsApp our technician.";
  if (/discount|5\+|10\+|unit/.test(q)) return "For eligible labour/service charges, instant bookings of 5+ units receive 5% off and 10+ units receive 10% off. Share the service type and number of units and we’ll help you book.";
  if (/book|appointment|slot|date/.test(q)) return "I can help prepare your booking. Please send: your name, KL/Selangor address, unit HP/type, service needed, and preferred date & time. You can also send these directly on WhatsApp.";
  if (/malay|bahasa/.test(q)) return "Boleh! Saya boleh bantu dalam Bahasa Melayu. Sila beritahu jenis servis, HP unit, lokasi di KL atau Selangor, dan tarikh pilihan anda.";
  if (/urdu|اردو/.test(q)) return "جی بالکل، میں اردو میں مدد کر سکتا ہوں۔ براہ کرم سروس، یونٹ کا HP/قسم، KL یا Selangor کا پتہ، اور پسندیدہ تاریخ و وقت بتائیں۔";
  return "I can provide official pricing and help arrange your service in KL or Selangor. Tell me the issue or service you need, your unit HP/type, and location. For a custom job, our technician can help on WhatsApp.";
}

export function AiSupportAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }), [messages, open]);

  const send = (event?: FormEvent, preset?: string) => {
    event?.preventDefault();
    const text = (preset ?? input).trim();
    if (!text) return;
    setMessages((current) => [...current, { from: "user", text }, { from: "bot", text: answerFor(text) }]);
    setInput("");
  };

  const bookingMessage = "Hi KL Renovator, I would like to book a service.\n\nName:\nLocation / Address (KL or Selangor):\nService needed:\nUnit HP / Type:\nPreferred Date & Time:\n\nPlease confirm availability. Thank you!";

  return (
    <div className="fixed bottom-5 right-5 z-[110] font-sans">
      {open && <section aria-label="KL Renovator support chat" className="mb-3 flex h-[min(590px,calc(100vh-7.5rem))] w-[calc(100vw-2.5rem)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/25">
        <header className="flex items-center justify-between bg-slate-950 px-5 py-4 text-white">
          <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-sky-400 text-lg">❄</span><div><h2 className="font-bold">KL Renovator Support</h2><p className="text-xs text-sky-200">Official prices · KL & Selangor</p></div></div>
          <button onClick={() => setOpen(false)} aria-label="Close support chat" className="rounded-full p-2 hover:bg-white/10"><FaXmark /></button>
        </header>
        <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
          {messages.map((message, index) => <div key={index} className={message.from === "user" ? "ml-9 rounded-2xl rounded-br-md bg-sky-600 px-3.5 py-2.5 text-sm leading-relaxed text-white" : "mr-5 rounded-2xl rounded-bl-md border border-slate-100 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 shadow-sm"}>{message.text}</div>)}
        </div>
        <div className="border-t border-slate-100 bg-white p-3">
          <div className="mb-2 flex gap-2 overflow-x-auto pb-1"><button onClick={() => send(undefined, "Chemical overhaul price")} className="shrink-0 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">Chemical overhaul</button><button onClick={() => send(undefined, "Repair diagnostic fee")} className="shrink-0 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">Repair price</button><button onClick={() => send(undefined, "I want to book")} className="shrink-0 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">Book service</button></div>
          <form onSubmit={send} className="flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..." aria-label="Support message" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500"/><button type="submit" aria-label="Send message" className="grid h-10 w-10 place-items-center rounded-xl bg-sky-600 text-white hover:bg-sky-700"><FaPaperPlane className="text-sm" /></button></form>
          <a href={waLink(bookingMessage)} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 text-xs font-semibold text-green-700 hover:text-green-800"><FaWhatsapp /> Continue booking on WhatsApp</a>
        </div>
      </section>}
      <button onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close support chat" : "Open support chat"} className="ml-auto flex items-center gap-3 rounded-full bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-200"><span className="grid h-8 w-8 place-items-center rounded-full bg-sky-400"><FaRegComments /></span><span>{open ? "Close chat" : "Ask KL Renovator"}</span></button>
      {!open && <a href="tel:+60182983573" aria-label="Call KL Renovator" className="absolute -left-12 bottom-1 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-800 shadow-lg ring-1 ring-slate-100 hover:text-sky-600"><FaPhone /></a>}
    </div>
  );
}
