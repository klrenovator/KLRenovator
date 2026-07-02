import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp, FaGoogle } from "react-icons/fa6";
import { FiStar, FiCheck, FiArrowRight } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Thank You — Rate Your KL Renovator Service | KL Renovator",
  description:
    "Thank you for choosing KL Renovator. We hope your aircond is working perfectly. If you're happy with the service, we'd love a quick Google review!",
  alternates: { canonical: "https://www.klrenovator.com/review" },
  robots: { index: false }, // No-index — internal conversion page
};

const reviewMsg = [
  "Hi KL Renovator 👋",
  "",
  "I recently used your service and would like to share feedback.",
  "",
  "My experience:",
  "",
  "Thank you!",
].join("\n");

const referMsg = [
  "Hi KL Renovator 👋",
  "",
  "I used your service before and I'm referring a friend who needs aircond service.",
  "",
  "Friend's details:",
  "📍 Location:",
  "❄️ Service needed:",
  "",
  "Please help them out. Thank you!",
].join("\n");

const stepsEN = [
  { n: "1", title: "Tap the button below", desc: "Opens Google Maps for KL Renovator in a new tab" },
  { n: "2", title: "Click the star rating", desc: "Tap 5 stars if you're happy with the service" },
  { n: "3", title: "Write a short review", desc: "What service? How was the technician? Was it same-day?" },
  { n: "4", title: "Tap Post", desc: "Done — your review helps other Malaysians find reliable service" },
];

export default function ReviewPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-700 to-sky-600 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-6">
            <FiStar className="h-8 w-8 text-amber-300" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
            Thank You for Choosing KL Renovator!
          </h1>
          <p className="text-sky-100 text-base mb-2">Terima kasih kerana memilih KL Renovator!</p>
          <p className="text-sky-100 text-base mb-8">感谢您选择KL Renovator！</p>
          <p className="text-sky-50 text-sm max-w-md mx-auto leading-relaxed">
            We hope your aircond is running perfectly. If our technician did a great job, a quick Google review makes a huge difference to our small business — and helps other Malaysians find reliable service.
          </p>
        </div>
      </section>

      {/* Review CTA */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Takes 60 Seconds</p>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Leave Us a Google Review</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            Your review directly helps other Malaysian homeowners and businesses find a trustworthy aircond technician. We read every review personally.
          </p>

          {/* Steps */}
          <div className="text-left space-y-3 mb-8">
            {stepsEN.map((s) => (
              <div key={s.n} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white text-xs font-black">
                  {s.n}
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">{s.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stars display */}
          <div className="flex justify-center gap-1 mb-6">
            {[1,2,3,4,5].map((i) => (
              <FiStar key={i} className="h-8 w-8 text-amber-400 fill-amber-400" />
            ))}
          </div>

          {/* Google Review Button */}
          <a
            href={siteConfig.googleBusinessProfile}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-black uppercase tracking-wider py-4 rounded-2xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg mb-4 group"
          >
            <FaGoogle className="h-5 w-5 text-[#4285F4] group-hover:text-white transition-colors" />
            Write a Google Review
          </a>

          <p className="text-xs text-slate-400">
            You need a Google account (Gmail) to leave a review. It takes about 60 seconds.
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-slate-50 border-y border-slate-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { stat: "500+", label: "Google Reviews" },
              { stat: "5.0 ★", label: "Average Rating" },
              { stat: "5,000+", label: "Customers Served" },
            ].map((item) => (
              <div key={item.stat}>
                <p className="text-2xl font-black text-sky-700">{item.stat}</p>
                <p className="text-xs font-bold text-slate-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback / Issue */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-black text-slate-900 mb-2">
              Something Not Right?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              If you have any concerns about the service, please WhatsApp us directly before leaving a review. We take every concern seriously and will make it right.
            </p>
          </div>
          <a
            href={waLink(reviewMsg)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-green-500/20"
          >
            <FaWhatsapp className="h-5 w-5 shrink-0" />
            WhatsApp Us Your Feedback
          </a>
          <p className="text-xs text-slate-400 text-center mt-3">
            Our team responds within the hour during operating hours (9AM–6PM).
          </p>
        </div>
      </section>

      {/* Refer a Friend */}
      <section className="py-14 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">Know someone who needs help?</p>
          <h2 className="text-xl font-black text-slate-900 mb-3">
            Refer a Friend — We&apos;ll Take Care of Them
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            If you know a neighbour, colleague, or family member with an aircond problem, refer them to KL Renovator. Same transparent pricing, same quality service.
          </p>
          <a
            href={waLink(referMsg)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-wider px-8 py-3.5 rounded-2xl text-xs transition-all"
          >
            <FaWhatsapp className="h-4 w-4 shrink-0" />
            Refer a Friend via WhatsApp
          </a>
        </div>
      </section>

      {/* Services hub */}
      <section className="py-10 px-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Need Another Service?</p>
          <div className="flex flex-wrap justify-center gap-2">
            {siteConfig.services.filter(s => s.slug !== "emergency").map((s) => (
              <NextLink
                key={s.slug}
                href={`/services/${s.slug}`}
                className="inline-flex items-center gap-1.5 border border-slate-200 hover:border-sky-300 bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
              >
                {s.title} — from RM {s.startPrice}
                <FiArrowRight className="h-3 w-3" />
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* Back */}
      <div className="py-6 px-4 text-center bg-slate-50 border-t border-slate-100">
        <NextLink href="/" className="text-xs font-black text-sky-600 hover:text-sky-800 transition-colors">
          ← Back to KL Renovator
        </NextLink>
      </div>
    </>
  );
}
