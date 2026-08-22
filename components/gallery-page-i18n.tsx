"use client";

import { useState } from "react";
import NextImage from "next/image";
import { FaWhatsapp, FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { waLink } from "@/lib/whatsapp";
import { useGoogleReviewStats, reviewCountLabelFor } from "@/lib/use-google-review-stats";

type Lang = "en" | "ms" | "zh";

import { type GalleryItem, GALLERY_INITIAL_COUNT } from "@/config/gallery-items";

export type { GalleryItem };

const UI: Record<Lang, {
  headerTitle: string;
  headerDesc: string;
  badgeLocation: string;
  badgeGenuine: string;
  trustReviews: string;
  trustWarranty: string;
  trustSSM: string;
  trustPrice: string;
  beforeAfterTitle: string;
  beforeAfterDesc: string;
  beforeAfterCTATitle: string;
  beforeAfterCTADesc: string;
  categories: { key: string; label: string }[];
  viewFull: string;
  beforeAfter: string;
  before: string;
  after: string;
  noPhotos: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  bookThis: string;
  close: string;
  prev: string;
  next: string;
  counter: string;
  showAll: string;
  loadingAll: string;
}> = {
  en: {
    headerTitle: "Real Work Gallery",
    headerDesc: "93 genuine project photos — no stock images. Every photo is real work completed by our HVAC technicians across Klang Valley.",
    trustReviews: "{count} 5-Star Google Reviews",
    trustWarranty: "1-Month Workmanship Warranty",
    trustSSM: "SSM Registered Business",
    trustPrice: "Price Confirmed Before Work",
    beforeAfterTitle: "Transformation Showcase",
    beforeAfterDesc: "Real before-and-after results from KL Renovator jobs across Klang Valley. See the difference professional aircond servicing makes.",
    beforeAfterCTATitle: "Want these results for your aircond?",
    beforeAfterCTADesc: "WhatsApp us your unit details and we will show you what is possible for your specific aircond brand and condition.",
    badgeLocation: "🏙️ KL & Selangor",
    badgeGenuine: "✅ 100% Genuine Company Photos",
    categories: [
      { key: "all", label: "All" },
      { key: "installation", label: "Installation" },
      { key: "chemical-wash", label: "Chemical Wash" },
      { key: "overhaul", label: "Overhaul" },
      { key: "repair", label: "Repair & Service" },
    ],
    viewFull: "View Full",
    beforeAfter: "Before / After",
    before: "Before",
    after: "After",
    noPhotos: "No photos in this category yet.",
    ctaTitle: "Want to see more?",
    ctaDesc: "We update our gallery regularly with new project photos. Send us a WhatsApp to discuss your aircon needs.",
    ctaButton: "Book Your Service Now",
    bookThis: "Book This",
    close: "Close",
    prev: "Previous",
    next: "Next",
    counter: "{current} / {total}",
    showAll: "Show All Project Photos",
    loadingAll: "Loading more photos…",
  },
  ms: {
    headerTitle: "Galeri Kerja Sebenar",
    headerDesc: "93 gambar projek sebenar — tiada gambar stok. Setiap gambar adalah kerja sebenar yang dilakukan oleh juruteknik HVAC kami di seluruh Lembah Klang.",
    trustReviews: "{count} Ulasan 5 Bintang Google",
    trustWarranty: "Waranti Mutu Kerja 1 Bulan",
    trustSSM: "Perniagaan Berdaftar SSM",
    trustPrice: "Harga Disahkan Sebelum Kerja",
    beforeAfterTitle: "Pameran Transformasi",
    beforeAfterDesc: "Hasil sebelum-dan-selepas sebenar dari kerja KL Renovator di seluruh Lembah Klang. Lihat perbezaan yang dihasilkan oleh servis aircond profesional.",
    beforeAfterCTATitle: "Mahukan hasil ini untuk aircond anda?",
    beforeAfterCTADesc: "WhatsApp kami butiran unit anda dan kami akan tunjukkan apa yang mungkin untuk jenama dan keadaan aircond khusus anda.",
    badgeLocation: "🏙️ KL & Selangor",
    badgeGenuine: "✅ 100% Gambar Syarikat Sebenar",
    categories: [
      { key: "all", label: "Semua" },
      { key: "installation", label: "Pemasangan" },
      { key: "chemical-wash", label: "Cuci Kimia" },
      { key: "overhaul", label: "Overhaul" },
      { key: "repair", label: "Pembaikan & Servis" },
    ],
    viewFull: "Lihat Penuh",
    beforeAfter: "Sebelum / Selepas",
    before: "Sebelum",
    after: "Selepas",
    noPhotos: "Tiada gambar dalam kategori ini lagi.",
    ctaTitle: "Mahu lihat lebih banyak?",
    ctaDesc: "Kami kemas kini galeri kami secara berkala dengan gambar projek baharu. Hantar WhatsApp kepada kami untuk membincangkan keperluan aircond anda.",
    ctaButton: "Tempah Servis Anda Sekarang",
    bookThis: "Tempah Ini",
    close: "Tutup",
    prev: "Sebelumnya",
    next: "Seterusnya",
    counter: "{current} / {total}",
    showAll: "Tunjuk Semua Gambar Projek",
    loadingAll: "Memuatkan lagi gambar…",
  },
  zh: {
    headerTitle: "真实项目画廊",
    headerDesc: "93 张真实项目照片——没有 stock 图片。每张照片都是我们 HVAC 技术员在巴生谷完成的实际工作。",
    trustReviews: "{count} 条 Google 5 星好评",
    trustWarranty: "1 个月工艺保修",
    trustSSM: "SSM 注册企业",
    trustPrice: "开工前确认价格",
    beforeAfterTitle: "改造展示",
    beforeAfterDesc: "KL Renovator 在巴生谷各地的真实前后对比效果。看看专业冷气服务带来的改变。",
    beforeAfterCTATitle: "想让您的冷气也达到这个效果？",
    beforeAfterCTADesc: "WhatsApp 我们您的机器详情，我们会针对您的具体冷气品牌和状况展示可行的效果。",
    badgeLocation: "🏙️ 吉隆坡及雪兰莪",
    badgeGenuine: "✅ 100% 公司真实照片",
    categories: [
      { key: "all", label: "全部" },
      { key: "installation", label: "安装" },
      { key: "chemical-wash", label: "化学清洗" },
      { key: "overhaul", label: "化学大修" },
      { key: "repair", label: "维修与保养" },
    ],
    viewFull: "查看全图",
    beforeAfter: "前后对比",
    before: "之前",
    after: "之后",
    noPhotos: "该分类暂无照片。",
    ctaTitle: "想看更多？",
    ctaDesc: "我们会定期更新画廊，添加新的项目照片。通过 WhatsApp 联系我们，讨论您的冷气需求。",
    ctaButton: "立即预约服务",
    bookThis: "预约此项",
    close: "关闭",
    prev: "上一张",
    next: "下一张",
    counter: "{current} / {total}",
    showAll: "显示所有项目照片",
    loadingAll: "正在加载更多照片…",
  },
};

/**
 * PERF: the gallery used to server-render ALL ~100 items (~330 KB of HTML
 * per gallery page). Now the server passes only the first slice as props;
 * the full list is fetched from /gallery-items.json (generated at build
 * time from config/gallery-items.ts) the moment a visitor opens a category
 * filter or clicks "show all".
 */
export function GalleryPageI18n({ lang, initialItems }: { lang: Lang; initialItems: GalleryItem[] }) {
  const { total } = useGoogleReviewStats();
  const countLabel = reviewCountLabelFor(total);
  const t = { ...UI[lang], trustReviews: UI[lang].trustReviews.replaceAll("{count}", countLabel) };
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showBefore, setShowBefore] = useState(false);
  const [allItems, setAllItems] = useState<GalleryItem[] | null>(null);
  const [loadingAll, setLoadingAll] = useState(false);

  const ensureAllLoaded = async () => {
    if (allItems || loadingAll) return;
    setLoadingAll(true);
    try {
      const res = await fetch("/gallery-items.json", { cache: "force-cache" });
      if (res.ok) setAllItems((await res.json()) as GalleryItem[]);
    } catch {
      // Keep the SSR slice — filtering just works on what we have.
    } finally {
      setLoadingAll(false);
    }
  };

  const source = allItems ?? initialItems;
  const filtered = activeCategory === "all" ? source : source.filter((g) => g.category === activeCategory);
  const hasMore = !allItems;

  const selectCategory = (key: string) => {
    setActiveCategory(key);
    setLightboxIndex(null);
    if (key !== "all") void ensureAllLoaded();
  };

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowBefore(false);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const goNext = () => {
    if (lightboxIndex !== null && lightboxIndex < filtered.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
      setShowBefore(false);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
      setShowBefore(false);
    }
  };

  const getCatLabel = (key: string) => t.categories.find((c) => c.key === key)?.label ?? key;

  return (
    <main>
      {/* Header */}
      <div className="bg-gradient-to-b from-sky-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.headerTitle}
            </h1>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              {t.headerDesc}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold px-4 py-2 rounded-full">
                {t.badgeLocation}
              </span>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full">
                {t.badgeGenuine}
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
              <span className="text-amber-500 text-sm">&#9733;</span> {t.trustReviews}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
              <span className="text-emerald-500 text-sm">&#10004;</span> {t.trustWarranty}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
              <span className="text-sky-500 text-sm">&#127970;</span> {t.trustSSM}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
              <span className="text-emerald-500 text-sm">&#128176;</span> {t.trustPrice}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-slate-100 sticky top-[80px] z-30 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
            {t.categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => selectCategory(cat.key)}
                className={`shrink-0 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-slate-600 py-20">{t.noPhotos}</p>
          ) : (
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => (
                <Reveal key={item.id} delay={index * 30}>
                  <button
                    className="relative group w-full text-left rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-slate-100"
                    onClick={() => openLightbox(index)}
                    aria-label={`View: ${item.title}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                      <NextImage
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      {item.before && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {t.beforeAfter}
                        </span>
                      )}
                      <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {getCatLabel(item.category)}
                      </span>
                      <div className="absolute inset-0 bg-sky-900/0 group-hover:bg-sky-900/20 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                          {t.viewFull}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-black text-slate-900 text-sm leading-snug">{item.title}</p>
                      {item.desc && (
                        <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 font-medium">{item.desc}</p>
                      )}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {/* Show-all button — the full grid lives in /gallery-items.json and
              is fetched on demand so the initial HTML stays small. */}
          {hasMore && (
            <div className="mt-10 text-center">
              <button
                onClick={() => void ensureAllLoaded()}
                disabled={loadingAll}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white font-black uppercase tracking-widest text-xs px-8 py-4 shadow-md transition-all"
              >
                {loadingAll ? t.loadingAll : t.showAll}
              </button>
            </div>
          )}

          {/* Before & After Showcase */}
          <Reveal>
            <div className="mt-16 bg-white border border-amber-200 rounded-2xl p-6 sm:p-10">
              <div className="text-center mb-8">
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                  &#10024; {t.beforeAfterTitle}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{t.beforeAfterTitle}</h2>
                <p className="mt-3 text-sm text-slate-600 max-w-lg mx-auto">{t.beforeAfterDesc}</p>
              </div>
              {/* Before/After Pairs Grid */}
              <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
                {/* Chemical Wash Pair */}
                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <div className="grid grid-cols-2 gap-0.5 bg-slate-300">
                    <div className="relative aspect-square bg-slate-200">
                      <NextImage src="/hero/midea-aircond-chemical-wash-klang-61.webp" alt="Before chemical wash — dirty aircond coil with mould buildup" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" loading="lazy" decoding="async" />
                      <span className="absolute bottom-2 left-2 bg-red-500/90 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">{t.before}</span>
                    </div>
                    <div className="relative aspect-square bg-slate-200">
                      <NextImage src="/hero/daikin-aircond-chemical-wash-kuala-lumpur-1.webp" alt="After chemical wash — clean evaporator coil restored to near-new condition" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" loading="lazy" decoding="async" />
                      <span className="absolute bottom-2 right-2 bg-emerald-500/90 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">{t.after}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-black text-slate-900 text-sm">Chemical Wash Results</p>
                    <p className="text-xs text-slate-600 mt-1">Mould, biofilm and years of dirt removed. Cooling restored to near-new levels. Customer confirmed 6&deg;C temperature drop after service.</p>
                  </div>
                </div>
                {/* Installation Pair */}
                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <div className="grid grid-cols-2 gap-0.5 bg-slate-300">
                    <div className="relative aspect-square bg-slate-200">
                      <NextImage src="/hero/aircond-compressor-bracket-installation-kl.webp" alt="Before installation — old equipment and disconnected outdoor unit" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" loading="lazy" decoding="async" />
                      <span className="absolute bottom-2 left-2 bg-red-500/90 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">{t.before}</span>
                    </div>
                    <div className="relative aspect-square bg-slate-200">
                      <NextImage src="/hero/aircond-installation-kuala-lumpur.webp" alt="After — new wall-mounted aircond professionally installed with clean cable routing" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" loading="lazy" decoding="async" />
                      <span className="absolute bottom-2 right-2 bg-emerald-500/90 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">{t.after}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-black text-slate-900 text-sm">New Installation Results</p>
                    <p className="text-xs text-slate-600 mt-1">Professional install with correct pipe sizing, clean trunking, and full vacuum commissioning. 1-month workmanship warranty.</p>
                  </div>
                </div>
                {/* Overhaul Pair */}
                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <div className="grid grid-cols-2 gap-0.5 bg-slate-300">
                    <div className="relative aspect-square bg-slate-200">
                      <NextImage src="/hero/aircond-chemical-overhaul-ampang-selangor.webp" alt="Before overhaul — fully dismantled indoor unit showing severe internal dirt and biofilm" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" loading="lazy" decoding="async" />
                      <span className="absolute bottom-2 left-2 bg-red-500/90 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">{t.before}</span>
                    </div>
                    <div className="relative aspect-square bg-slate-200">
                      <NextImage src="/hero/panasonic-aircond-chemical-overhaul-kuala-lumpur-2.webp" alt="After overhaul — drain pan and coil scrubbed clean, all internal components restored" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" loading="lazy" decoding="async" />
                      <span className="absolute bottom-2 right-2 bg-emerald-500/90 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">{t.after}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-black text-slate-900 text-sm">Chemical Overhaul Results</p>
                    <p className="text-xs text-slate-600 mt-1">Every component individually deep-cleaned and reassembled. Water leaking permanently fixed. Cooling restored to factory spec.</p>
                  </div>
                </div>
                {/* Repair Pair */}
                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <div className="grid grid-cols-2 gap-0.5 bg-slate-300">
                    <div className="relative aspect-square bg-slate-200">
                      <NextImage src="/hero/aircond-pcb-board-replacement-2-klang-valley.webp" alt="Before repair — faulty PCB board with error codes causing no cooling" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" loading="lazy" decoding="async" />
                      <span className="absolute bottom-2 left-2 bg-red-500/90 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">{t.before}</span>
                    </div>
                    <div className="relative aspect-square bg-slate-200">
                      <NextImage src="/hero/aircond-pcb-board-replacement-kl.webp" alt="After repair — new PCB board installed, unit cooling perfectly again" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" loading="lazy" decoding="async" />
                      <span className="absolute bottom-2 right-2 bg-emerald-500/90 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">{t.after}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-black text-slate-900 text-sm">Repair & Troubleshooting Results</p>
                    <p className="text-xs text-slate-600 mt-1">Faulty components diagnosed and replaced. 3-month parts warranty. Same-day repair completed on first visit.</p>
                  </div>
                </div>
              </div>
              {/* Before/After CTA */}
              <div className="mt-8 text-center bg-gradient-to-r from-amber-50 to-sky-50 rounded-xl p-6 border border-amber-100">
                <p className="font-black text-slate-900 text-lg">{t.beforeAfterCTATitle}</p>
                <p className="text-sm text-slate-600 mt-1 mb-4">{t.beforeAfterCTADesc}</p>
                <a
                  href={waLink("Hi KL Renovator, I saw your before/after gallery and want similar results for my aircond. Please advise on pricing.")}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-white font-black uppercase tracking-widest text-xs px-7 py-4 rounded-xl shadow-md transition-all hover:bg-[#1ebe5d]"
                  style={{ background: "#25D366" }}
                >
                  <FaWhatsapp className="h-4 w-4" />
                  {t.ctaButton}
                </a>
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="mt-12 bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center">
              <p className="text-2xl mb-2">📸</p>
              <h3 className="font-black text-slate-900 mb-2">{t.ctaTitle}</h3>
              <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
                {t.ctaDesc}
              </p>
              <a
                href={waLink("Hi KL Renovator, I want to book an aircon service after viewing your gallery.")}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white font-black uppercase tracking-widest text-xs px-7 py-4 rounded-xl shadow-md transition-all hover:bg-[#1ebe5d]"
                style={{ background: "#25D366" }}
              >
                <FaWhatsapp className="h-4 w-4" />
                {t.ctaButton}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
              aria-label={t.close}
            >
              <FaXmark className="h-4 w-4" />
            </button>

            {/* Before/After Toggle */}
            {currentItem.before && (
              <div className="absolute top-4 left-4 z-10 flex bg-black/50 rounded-full overflow-hidden">
                <button
                  onClick={() => setShowBefore(false)}
                  className={`px-3 py-1.5 text-xs font-black uppercase transition-colors ${!showBefore ? "bg-sky-600 text-white" : "text-white/70 hover:text-white"}`}
                >
                  {t.after}
                </button>
                <button
                  onClick={() => setShowBefore(true)}
                  className={`px-3 py-1.5 text-xs font-black uppercase transition-colors ${showBefore ? "bg-amber-500 text-white" : "text-white/70 hover:text-white"}`}
                >
                  {t.before}
                </button>
              </div>
            )}

            {/* Image container */}
            <div className="relative aspect-video bg-slate-100">
              <NextImage
                src={showBefore && currentItem.before ? currentItem.before : currentItem.src}
                alt={currentItem.alt}
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Info */}
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                  {getCatLabel(currentItem.category)}
                </span>
                <h3 className="font-black text-slate-900 mt-2">{currentItem.title}</h3>
                {currentItem.desc && (
                  <p className="text-sm text-slate-600 mt-1">{currentItem.desc}</p>
                )}
              </div>
              <a
                href={waLink(`Hi KL Renovator, I saw your gallery photo: "${currentItem.title}" and want to book a similar service.`)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all hover:bg-[#1ebe5d]"
                style={{ background: "#25D366" }}
              >
                <FaWhatsapp className="h-4 w-4" />
                {t.bookThis}
              </a>
            </div>
          </div>

          {/* Prev/Next */}
          {filtered.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                aria-label={t.prev}
              >
                <FaChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                aria-label={t.next}
              >
                <FaChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-bold">
            {lightboxIndex + 1} / {filtered.length}
          </div>
        </div>
      )}
    </main>
  );
}
