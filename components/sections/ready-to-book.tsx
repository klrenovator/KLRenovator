
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { waLink } from "@/lib/whatsapp";

type Locale = "en" | "ms" | "zh";

const COPY: Record<Locale, { badge: string; title1: string; title2: string; desc: string; quote: string; call: string; pills: string[]; waMsg: string }> = {
  en: {
    badge: "Same-day slots available",
    title1: "Ready to book your ",
    title2: "aircond service?",
    desc: "Chat with us on WhatsApp and get a transparent quote in minutes. Licensed technicians · Honest pricing · Quality workmanship.",
    quote: "Request a Quote",
    call: "Call",
    pills: ["Reply within 30 mins", "Licensed & insured", "Satisfaction guaranteed"],
    waMsg: "Hi KL Renovator, I want to book an aircond service. My location is:",
  },
  ms: {
    badge: "Slot hari sama tersedia",
    title1: "Bersedia untuk tempah ",
    title2: "servis aircond anda?",
    desc: "Sembang dengan kami di WhatsApp dan dapatkan sebut harga telus dalam beberapa minit. Juruteknik bertauliah · Harga jujur · Kerja berkualiti.",
    quote: "Minta Sebut Harga",
    call: "Hubungi",
    pills: ["Balas dalam 30 minit", "Berlesen & diinsuranskan", "Kepuasan dijamin"],
    waMsg: "Hai KL Renovator, saya mahu tempah servis aircond. Lokasi saya:",
  },
  zh: {
    badge: "可当天预约",
    title1: "准备好预约您的",
    title2: "冷气服务了吗？",
    desc: "在WhatsApp上与我们聊天，几分钟内获取透明报价。持证技师 · 诚实定价 · 优质工艺。",
    quote: "获取报价",
    call: "致电",
    pills: ["30分钟内回复", "持证并有保险", "满意保证"],
    waMsg: "你好 KL Renovator，我想预约冷气服务。我的位置是：",
  },
};

export const ReadyToBook = ({ locale = "en" }: { locale?: Locale }) => {
  const t = COPY[locale] || COPY.en;
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-sky-600 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-block border border-sky-300 bg-sky-700 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-sky-100 rounded-full">{t.badge}</span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] uppercase">
            {t.title1}<span className="text-sky-100">{t.title2}</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-sky-100 font-medium">{t.desc}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={waLink(t.waMsg)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
              <span aria-hidden="true">💬</span> {t.quote}
            </a>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-white hover:bg-slate-100 px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-900 transition-all rounded-xl">
              <span aria-hidden="true">📞</span> {t.call} {siteConfig.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-sky-500 border border-sky-500 rounded-xl overflow-hidden">
            {[ { icon: "🕘", label: t.pills[0] }, { icon: "🛡️", label: t.pills[1] }, { icon: "✅", label: t.pills[2] }].map(({ icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2.5 bg-sky-700 hover:bg-sky-600 transition-colors px-4 py-5 text-sm font-black text-white uppercase tracking-wider"><span aria-hidden="true">{icon}</span>{label}</div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
