import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiStar, FiCheck, FiArrowRight } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { GoogleReviewWidget } from "@/components/google-review-widget";
import { waLink } from "@/lib/whatsapp";
import { reviewCountLabel, reviewRatingLabel } from "@/config/reviews";

type Lang = "en" | "ms" | "zh";

const DATA: Record<Lang, {
  heroTitle: string;
  heroSub: string;
  heroDesc: string;
  reviewBadge: string;
  reviewTitle: string;
  reviewDesc: string;
  stats: { stat: string; label: string }[];
  feedbackTitle: string;
  feedbackDesc: string;
  feedbackButton: string;
  feedbackNote: string;
  referBadge: string;
  referTitle: string;
  referDesc: string;
  referButton: string;
  servicesHub: string;
  backLink: string;
  reviewMsg: string;
  referMsg: string;
}> = {
  en: {
    heroTitle: "Thank You for Choosing KL Renovator!",
    heroSub: "Terima kasih kerana memilih KL Renovator!",
    heroDesc: "We hope your aircond is running perfectly. If anything at all needs our attention, WhatsApp us directly below — we take every concern seriously.",
    reviewBadge: "Verified Google Reviews",
    reviewTitle: "See What Our Customers Say",
    reviewDesc: `Real reviews from real KL & Selangor customers on our Google Business Profile — currently ${reviewCountLabel} five-star reviews.`,
    stats: [
      { stat: reviewCountLabel, label: "Google Reviews" },
      { stat: `${reviewRatingLabel} ★`, label: "Average Rating" },
      { stat: "5,000+", label: "Customers Served" },
    ],
    feedbackTitle: "Something Not Right?",
    feedbackDesc: "If you have any concerns about the service, please WhatsApp us directly before leaving a review. We take every concern seriously and will make it right.",
    feedbackButton: "WhatsApp Us Your Feedback",
    feedbackNote: "Our team responds within the hour during operating hours (9AM–6PM).",
    referBadge: "Know someone who needs help?",
    referTitle: "Refer a Friend — We'll Take Care of Them",
    referDesc: "If you know a neighbour, colleague, or family member with an aircond problem, refer them to KL Renovator. Same transparent pricing, same quality service.",
    referButton: "Refer a Friend via WhatsApp",
    servicesHub: "Need Another Service?",
    backLink: "← Back to KL Renovator",
    reviewMsg: "Hi KL Renovator 👋\n\nI recently used your service and would like to share feedback.\n\nMy experience:\n\nThank you!",
    referMsg: "Hi KL Renovator 👋\n\nI used your service before and I'm referring a friend who needs aircond service.\n\nFriend's details:\n📍 Location:\n❄️ Service needed:\n\nPlease help them out. Thank you!",
  },
  ms: {
    heroTitle: "Terima Kasih Kerana Memilih KL Renovator!",
    heroSub: "感谢您选择KL Renovator！",
    heroDesc: "Kami harap aircond anda berfungsi dengan sempurna. Jika ada apa-apa yang memerlukan perhatian kami, WhatsApp kami terus di bawah — kami mengambil serius setiap kebimbangan.",
    reviewBadge: "Ulasan Google Disahkan",
    reviewTitle: "Lihat Kata Pelanggan Kami",
    reviewDesc: `Ulasan sebenar daripada pelanggan sebenar KL & Selangor di Profil Perniagaan Google kami — kini ${reviewCountLabel} ulasan lima bintang.`,
    stats: [
      { stat: reviewCountLabel, label: "Ulasan Google" },
      { stat: `${reviewRatingLabel} ★`, label: "Penarafan Purata" },
      { stat: "5,000+", label: "Pelanggan Dilayan" },
    ],
    feedbackTitle: "Ada Yang Tidak Kena?",
    feedbackDesc: "Jika anda mempunyai sebarang kebimbangan mengenai servis, sila WhatsApp kami terlebih dahulu sebelum meninggalkan ulasan. Kami mengambil serius setiap kebimbangan dan akan memperbaikinya.",
    feedbackButton: "WhatsApp Maklum Balas Anda",
    feedbackNote: "Pasukan kami membalas dalam masa sejam semasa waktu operasi (9PG–6PTG).",
    referBadge: "Kenal sesiapa yang perlukan bantuan?",
    referTitle: "Rujuk Rakan — Kami Akan Jaga Mereka",
    referDesc: "Jika anda mengenali jiran, rakan sekerja, atau ahli keluarga dengan masalah aircond, rujuk mereka kepada KL Renovator. Harga telus yang sama, servis berkualiti yang sama.",
    referButton: "Rujuk Rakan melalui WhatsApp",
    servicesHub: "Perlukan Servis Lain?",
    backLink: "← Kembali ke KL Renovator",
    reviewMsg: "Hi KL Renovator 👋\n\nSaya baru-baru ini menggunakan servis anda dan ingin berkongsi maklum balas.\n\nPengalaman saya:\n\nTerima kasih!",
    referMsg: "Hi KL Renovator 👋\n\nSaya pernah menggunakan servis anda sebelum ini dan saya merujuk seorang rakan yang memerlukan servis aircond.\n\nButiran rakan:\n📍 Lokasi:\n❄️ Servis diperlukan:\n\nTolong bantu mereka. Terima kasih!",
  },
  zh: {
    heroTitle: "感谢您选择 KL Renovator！",
    heroSub: "Terima kasih kerana memilih KL Renovator!",
    heroDesc: "我们希望您的冷气运行完美。如有任何需要我们关注的地方，请直接通过下方的 WhatsApp 联系我们——我们认真对待每一个问题。",
    reviewBadge: "已验证的 Google 评价",
    reviewTitle: "看看客户怎么说",
    reviewDesc: `来自吉隆坡与雪兰莪真实客户在我们 Google 商家资料上的真实评价——目前已有 ${reviewCountLabel} 条五星评价。"`,

    stats: [
      { stat: reviewCountLabel, label: "Google 评价" },
      { stat: `${reviewRatingLabel} ★`, label: "平均评分" },
      { stat: "5,000+", label: "服务客户数" },
    ],
    feedbackTitle: "有问题没解决？",
    feedbackDesc: "如果您对服务有任何疑虑，请在留评价前直接通过 WhatsApp 联系我们。我们认真对待每一个问题，并会妥善解决。",
    feedbackButton: "通过 WhatsApp 反馈",
    feedbackNote: "我们的团队在营业时间（上午9点–下午6点）内一小时内回复。",
    referBadge: "认识需要帮助的人？",
    referTitle: "推荐朋友——我们会照顾好他们",
    referDesc: "如果您认识有冷气问题的邻居、同事或家人，请推荐他们给 KL Renovator。同样透明的价格，同样优质的服务。",
    referButton: "通过 WhatsApp 推荐朋友",
    servicesHub: "需要其他服务？",
    backLink: "← 返回 KL Renovator",
    reviewMsg: "Hi KL Renovator 👋\n\n我最近使用了您的服务，想分享反馈。\n\n我的体验：\n\n谢谢！",
    referMsg: "Hi KL Renovator 👋\n\n我以前用过您的服务，现在推荐一位需要冷气服务的朋友。\n\n朋友详情：\n📍 地点：\n❄️ 需要的服务：\n\n请帮忙。谢谢！",
  },
};

export function ReviewPageI18n({ lang }: { lang: Lang }) {
  const d = DATA[lang];
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-700 to-sky-600 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-6">
            <FiStar className="h-8 w-8 text-amber-300" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
            {d.heroTitle}
          </h1>
          <p className="text-sky-100 text-base mb-2">{d.heroSub}</p>
          <p className="text-sky-50 text-sm max-w-md mx-auto leading-relaxed">
            {d.heroDesc}
          </p>
        </div>
      </section>

      {/* Reviews showcase — the former "leave us a review" funnel (steps,
          star picker, Write a Google Review button) was removed at the
          owner's request. This page now thanks the customer and shows the
          existing verified reviews only. */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{d.reviewBadge}</p>
          <h2 className="text-2xl font-black text-slate-900 mb-4">{d.reviewTitle}</h2>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            {d.reviewDesc}
          </p>

          {/* Official Google review widget — keyless link widget (rating +
              review count come from config/reviews.ts via useGoogleReviewStats). */}
          <div className="mt-8 text-left">
            <GoogleReviewWidget locale={lang} />
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-slate-50 border-y border-slate-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {d.stats.map((item) => (
              <div key={item.stat}>
                <p className="text-2xl font-black text-sky-700">{item.stat}</p>
                <p className="text-xs font-bold text-slate-600 mt-0.5">{item.label}</p>
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
              {d.feedbackTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {d.feedbackDesc}
            </p>
          </div>
          <a
            href={waLink(d.reviewMsg)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-green-500/20"
          >
            <FaWhatsapp className="h-5 w-5 shrink-0" />
            {d.feedbackButton}
          </a>
          <p className="text-xs text-slate-600 text-center mt-3">
            {d.feedbackNote}
          </p>
        </div>
      </section>

      {/* Refer a Friend */}
      <section className="py-14 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">{d.referBadge}</p>
          <h2 className="text-xl font-black text-slate-900 mb-3">
            {d.referTitle}
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            {d.referDesc}
          </p>
          <a
            href={waLink(d.referMsg)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-wider px-8 py-3.5 rounded-2xl text-xs transition-all"
          >
            <FaWhatsapp className="h-4 w-4 shrink-0" />
            {d.referButton}
          </a>
        </div>
      </section>

      {/* Services hub */}
      <section className="py-10 px-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-slate-600 mb-4 text-center">{d.servicesHub}</p>
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
          {d.backLink}
        </NextLink>
      </div>
    </>
  );
}
