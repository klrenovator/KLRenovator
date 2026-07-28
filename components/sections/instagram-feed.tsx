"use client";

import { FiInstagram } from "react-icons/fi";
import { Reveal } from "@/components/reveal";

/**
 * 20K.112 — Instagram Feed Container
 *
 * Lightweight placeholder that displays locked Instagram post URLs as
 * cards with a CTA to open the real Instagram post. Designed to be
 * embedded on blog pages, the homepage, or a dedicated social hub.
 *
 * Supports 5 post slugs — user swaps these to their own Instagram
 * post URLs when ready.
 *
 * Trilingual: locale prop drives heading/subtext language.
 */

type SocialLocale = "en" | "ms" | "zh";

interface InstaPost {
  /** Instagram post shortcode (from URL) */
  shortcode: string;
  /** Visible caption in feed (truncated) */
  captionEN: string;
  captionMS: string;
  captionZH: string;
  /** Thumbnail alt */
  alt: string;
}

// ─── LOCKED POSTS — replace shortcodes with your real Instagram posts ───
const INSTA_POSTS: InstaPost[] = [
  {
    shortcode: "placeholder1",
    captionEN: "Chemical wash in progress — KL condominium, same-day booking ✅",
    captionMS: "Cuci kimia sedang dijalankan — kondominium KL, tempahan hari sama ✅",
    captionZH: "正在进行化学清洗——吉隆坡公寓，当天预约 ✅",
    alt: "KL Renovator chemical wash — Instagram post",
  },
  {
    shortcode: "placeholder2",
    captionEN: "Daikin inverter gas top-up completed at PJ landed home. R32 balanced.",
    captionMS: "Tambah gas Daikin inverter selesai di rumah teres PJ. R32 seimbang.",
    captionZH: "大金变频空调充气完成——PJ 排屋。R32 已平衡。",
    alt: "KL Renovator Daikin gas top-up — Instagram post",
  },
  {
    shortcode: "placeholder3",
    captionEN: "Full chemical overhaul — before & after. 5-year-old unit cooling like new ❄️",
    captionMS: "Overhaul kimia penuh — sebelum & selepas. Unit 5 tahun sejuk seperti baru ❄️",
    captionZH: "全面化学大修——前后对比。5 年老机如新 ❄️",
    alt: "KL Renovator chemical overhaul — Instagram post",
  },
  {
    shortcode: "placeholder4",
    captionEN: "Ceiling cassette servicing at KL office tower. Commercial maintenance done right.",
    captionMS: "Servis ceiling cassette di menara pejabat KL. Penyelenggaraan komersial yang betul.",
    captionZH: "吉隆坡办公楼天花板卡式机保养。商业维护，专业到位。",
    alt: "KL Renovator ceiling cassette — Instagram post",
  },
  {
    shortcode: "placeholder5",
    captionEN: "Our technician team at morning briefing. 4 trucks ready across Klang Valley 🚛",
    captionMS: "Pasukan juruteknik kami di taklimat pagi. 4 trak sedia di seluruh Lembah Klang 🚛",
    captionZH: "我们的技术团队在晨会中。4 辆卡车在巴生谷待命 🚛",
    alt: "KL Renovator team — Instagram post",
  },
];

const LABELS = {
  en: {
    heading: "Follow Our Work on Instagram",
    subtext: "Real jobs, real photos. See how we work before you book.",
    cta: "Follow @klrenovator",
    viewOnIG: "View on Instagram",
    noPosts: "Instagram feed coming soon. Follow us for behind-the-scenes content.",
  },
  ms: {
    heading: "Ikuti Kerja Kami di Instagram",
    subtext: "Kerja sebenar, foto sebenar. Lihat cara kami bekerja sebelum anda tempah.",
    cta: "Ikuti @klrenovator",
    viewOnIG: "Lihat di Instagram",
    noPosts: "Suapan Instagram akan datang. Ikuti kami untuk kandungan di sebalik tabir.",
  },
  zh: {
    heading: "在 Instagram 上关注我们的工作",
    subtext: "真实工作，真实照片。预约前了解我们的工作方式。",
    cta: "关注 @klrenovator",
    viewOnIG: "在 Instagram 上查看",
    noPosts: "Instagram 帖子即将推出。关注我们获取幕后花絮。",
  },
};

interface Props {
  locale?: SocialLocale;
  /** Show fewer posts for compact placement */
  compact?: boolean;
}

export function InstagramFeed({ locale = "en", compact = false }: Props) {
  const lbl = LABELS[locale];
  const posts = compact ? INSTA_POSTS.slice(0, 3) : INSTA_POSTS;
  const igHandle = "klrenovator";
  const igUrl = `https://www.instagram.com/${igHandle}/`;

  // If all shortcodes are placeholders, show a "coming soon" state
  const allPlaceholder = posts.every((p) => p.shortcode.startsWith("placeholder"));

  // Render nothing until real Instagram post shortcodes are filled in above.
  //
  // Every shortcode is still "placeholder1..5", so this section was shipping
  // an empty dashed "coming soon" box to real visitors on the homepage and
  // the blog index — which reads as an unfinished site rather than social
  // proof. Hiding it is strictly better until the real posts are added; the
  // moment a genuine shortcode is set, the grid appears automatically with
  // no other code change.
  if (allPlaceholder) return null;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 border-t border-pink-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
                <FiInstagram className="h-3 w-3" /> Instagram
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                {lbl.heading}
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">{lbl.subtext}</p>
            </div>
            <a
              href={igUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-5 py-3 text-xs font-black uppercase tracking-widest transition-all shadow-md"
            >
              <FiInstagram className="h-4 w-4" /> {lbl.cta}
            </a>
          </div>

          {/* Posts Grid */}
          {allPlaceholder ? (
            /* Coming soon state */
            <div className="rounded-2xl border-2 border-dashed border-pink-200 bg-white/60 p-10 text-center">
              <FiInstagram className="mx-auto h-10 w-10 text-pink-300 mb-3" />
              <p className="text-sm font-bold text-slate-600">{lbl.noPosts}</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${compact ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"}`}>
              {posts.map((post) => {
                const caption = locale === "ms" ? post.captionMS : locale === "zh" ? post.captionZH : post.captionEN;
                const igPostUrl = `https://www.instagram.com/p/${post.shortcode}/`;

                return (
                  <a
                    key={post.shortcode}
                    href={igPostUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="group relative aspect-square rounded-2xl overflow-hidden border border-pink-200 bg-white shadow-sm hover:shadow-md hover:border-pink-400 transition-all"
                  >
                    {/* Placeholder gradient bg — swap for real <img> when images available */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 flex items-center justify-center">
                      <FiInstagram className="h-10 w-10 text-pink-300 group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Caption overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <p className="text-[11px] text-white font-medium leading-snug line-clamp-3">{caption}</p>
                    </div>

                    {/* IG icon badge */}
                    <span className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 shadow-sm">
                      <FiInstagram className="h-3 w-3 text-pink-600" />
                    </span>
                  </a>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-6 text-center">
            <a
              href={igUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-pink-600 hover:text-pink-800 transition-colors"
            >
              {lbl.viewOnIG} →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
