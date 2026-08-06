import NextLink from "next/link";
import { FaWhatsapp, FaGoogle } from "react-icons/fa6";
import { FiStar, FiCheck, FiArrowRight } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

type Lang = "en" | "ms" | "zh";

const DATA: Record<Lang, {
  heroTitle: string;
  heroSub: string;
  heroDesc: string;
  reviewBadge: string;
  reviewTitle: string;
  reviewDesc: string;
  steps: { n: string; title: string; desc: string }[];
  googleButton: string;
  googleNote: string;
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
    heroDesc: "We hope your aircond is running perfectly. If our technician did a great job, a quick Google review makes a huge difference to our small business — and helps other Malaysians find reliable service.",
    reviewBadge: "Takes 60 Seconds",
    reviewTitle: "Leave Us a Google Review",
    reviewDesc: "Your review directly helps other Malaysian homeowners and businesses find a trustworthy aircond technician. We read every review personally.",
    steps: [
      { n: "1", title: "Tap the button below", desc: "Opens Google Maps for KL Renovator in a new tab" },
      { n: "2", title: "Click the star rating", desc: "Tap 5 stars if you're happy with the service" },
      { n: "3", title: "Write a short review", desc: "What service? How was the technician? Was it same-day?" },
      { n: "4", title: "Tap Post", desc: "Done — your review helps other Malaysians find reliable service" },
    ],
    googleButton: "Write a Google Review",
    googleNote: "You need a Google account (Gmail) to leave a review. It takes about 60 seconds.",
    stats: [
      { stat: "500+", label: "Google Reviews" },
      { stat: "5.0 ★", label: "Average Rating" },
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
    heroDesc: "Kami harap aircond anda berfungsi dengan sempurna. Jika juruteknik kami melakukan kerja yang cemerlang, ulasan Google yang ringkas akan memberi kesan besar kepada perniagaan kecil kami — dan membantu rakyat Malaysia lain mendapatkan servis yang boleh dipercayai.",
    reviewBadge: "Hanya 60 Saat",
    reviewTitle: "Tinggalkan Ulasan Google Kami",
    reviewDesc: "Ulasan anda secara langsung membantu pemilik rumah dan perniagaan Malaysia lain menemui juruteknik aircond yang boleh dipercayai. Kami membaca setiap ulasan secara peribadi.",
    steps: [
      { n: "1", title: "Ketik butang di bawah", desc: "Membuka Google Maps untuk KL Renovator dalam tab baharu" },
      { n: "2", title: "Ketik penarafan bintang", desc: "Ketik 5 bintang jika anda berpuas hati dengan servis" },
      { n: "3", title: "Tulis ulasan ringkas", desc: "Servis apa? Bagaimanakah juruteknik? Adakah hari sama?" },
      { n: "4", title: "Ketik Hantar", desc: "Selesai — ulasan anda membantu rakyat Malaysia lain mendapatkan servis yang boleh dipercayai" },
    ],
    googleButton: "Tulis Ulasan Google",
    googleNote: "Anda memerlukan akaun Google (Gmail) untuk meninggalkan ulasan. Ia mengambil masa kira-kira 60 saat.",
    stats: [
      { stat: "500+", label: "Ulasan Google" },
      { stat: "5.0 ★", label: "Penarafan Purata" },
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
    heroDesc: "我们希望您的冷气运行完美。如果我们的技术员做得很好，一个快速的 Google 评价将对我们的小企业产生巨大影响——并帮助其他马来西亚人找到可靠的服务。",
    reviewBadge: "只需 60 秒",
    reviewTitle: "给我们留一个 Google 评价",
    reviewDesc: "您的评价直接帮助其他马来西亚房主和企业找到值得信赖的冷气技术员。我们亲自阅读每一条评价。",
    steps: [
      { n: "1", title: "点击下方按钮", desc: "在新标签页中打开 KL Renovator 的 Google Maps" },
      { n: "2", title: "点击星级评分", desc: "如果您对服务满意，请点 5 星" },
      { n: "3", title: "写一条简短评价", desc: "什么服务？技术员怎么样？是当天服务吗？" },
      { n: "4", title: "点击发布", desc: "完成——您的评价帮助其他马来西亚人找到可靠的服务" },
    ],
    googleButton: "撰写 Google 评价",
    googleNote: "您需要一个 Google 账号（Gmail）才能留评价。大约只需 60 秒。",
    stats: [
      { stat: "500+", label: "Google 评价" },
      { stat: "5.0 ★", label: "平均评分" },
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

      {/* Review CTA */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{d.reviewBadge}</p>
          <h2 className="text-2xl font-black text-slate-900 mb-4">{d.reviewTitle}</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            {d.reviewDesc}
          </p>

          {/* Steps */}
          <div className="text-left space-y-3 mb-8">
            {d.steps.map((s) => (
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
            {d.googleButton}
          </a>

          <p className="text-xs text-slate-500">
            {d.googleNote}
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-slate-50 border-y border-slate-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {d.stats.map((item) => (
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
              {d.feedbackTitle}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
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
          <p className="text-xs text-slate-500 text-center mt-3">
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
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
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
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 text-center">{d.servicesHub}</p>
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
