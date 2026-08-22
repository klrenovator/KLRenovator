"use client";

import NextLink from "next/link";
import { FaFacebookF, FaGoogle, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

import { sitePublic } from "@/config/site-public";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";
import { serviceAnchor } from "@/config/anchor-text-diversity";

const FOOTER_LINKS = {
  en: {
    blog: "Blog",
    services: "View All Services →",
    quickLinks: "Quick Links",
    priceGuides: "Price Guides",
    bookWa: "Book Via WhatsApp",
    bookOnline: "Book a Slot Online",
    privacyPolicy: "Privacy Policy",
    navServices: "Services",
    navBlog: "Blog",
    navGallery: "Gallery",
    navAbout: "About",
    navFaq: "FAQ",
    navContact: "Contact",
  },
  ms: {
    blog: "Blog",
    services: "Lihat Semua Perkhidmatan →",
    quickLinks: "Pautan Pantas",
    priceGuides: "Panduan Harga",
    bookWa: "Tempah Via WhatsApp",
    bookOnline: "Tempah Slot Dalam Talian",
    privacyPolicy: "Dasar Privasi",
    navServices: "Perkhidmatan",
    navBlog: "Blog",
    navGallery: "Galeri",
    navAbout: "Tentang Kami",
    navFaq: "Soalan Lazim",
    navContact: "Hubungi",
  },
  zh: {
    blog: "博客",
    services: "查看所有服务 →",
    quickLinks: "快速链接",
    priceGuides: "价格指南",
    bookWa: "通过 WhatsApp 预约",
    bookOnline: "在线预约时段",
    privacyPolicy: "隐私政策",
    navServices: "服务",
    navBlog: "博客",
    navGallery: "图库",
    navAbout: "关于我们",
    navFaq: "常见问答",
    navContact: "联系我们",
  },
};

export const Footer = () => {
  const { t, lang } = useLang();
  const fl = FOOTER_LINKS[lang as keyof typeof FOOTER_LINKS] ?? FOOTER_LINKS.en;

  // Malay installation landings intentionally use native slugs rather than
  // an English slug under /ms. Keep globally rendered footer links on real
  // routes; a missing footer destination is amplified across every page.
  const localizedPath = (path: string) => {
    if (lang === "en") return path;
    if (path === "/") return `/${lang}`;
    if (lang === "ms") {
      const malaySlugs: Record<string, string> = {
        "/aircond-installation-kl": "/ms/pemasangan-aircond-kl",
        "/new-home-aircond-installation": "/ms/pemasangan-aircond-rumah-baru",
        "/commercial-aircond-installation": "/ms/pemasangan-aircond-komersial",
        "/commercial-aircond-service": "/ms/servis-aircond-komersial",
        "/indoor-air-quality-aircond": "/ms/kualiti-udara-dalaman-aircond",
      };
      return malaySlugs[path] ?? `/ms${path}`;
    }
    return `/zh${path}`;
  };

  return (
    <footer className="w-full bg-white text-slate-600 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand Block */}
        <div className="space-y-4">
          <NextLink href={localizedPath("/")} className="inline-block">
            <p className="text-slate-900 font-black text-xl tracking-tight uppercase">
              KL <span className="text-sky-500">RENOVATOR</span>
            </p>
          </NextLink>
          <p className="text-xs leading-relaxed text-slate-600">{t("footer_desc")}</p>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <a href={waLink(rfqMsg)} target="_blank" rel="nofollow noopener noreferrer" aria-label="WhatsApp KL Renovator" style={{ backgroundColor: "#25D366" }} className="grid h-9 w-9 place-items-center rounded-full text-white transition-opacity hover:opacity-85"><FaWhatsapp className="h-4 w-4" /></a>
            <a href={sitePublic.links.instagram} target="_blank" rel="nofollow noopener noreferrer" aria-label="KL Renovator Instagram" style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }} className="grid h-9 w-9 place-items-center rounded-full text-white transition-opacity hover:opacity-85"><FaInstagram className="h-4 w-4" /></a>
            <a href={sitePublic.links.facebook} target="_blank" rel="nofollow noopener noreferrer" aria-label="KL Renovator Facebook" style={{ backgroundColor: "#1877F2" }} className="grid h-9 w-9 place-items-center rounded-full text-white transition-opacity hover:opacity-85"><FaFacebookF className="h-4 w-4" /></a>
            <a href={sitePublic.links.tiktok} target="_blank" rel="nofollow noopener noreferrer" aria-label="KL Renovator TikTok" style={{ backgroundColor: "#010101" }} className="grid h-9 w-9 place-items-center rounded-full text-white transition-opacity hover:opacity-85"><FaTiktok className="h-4 w-4" /></a>
            <a href={sitePublic.links.googleBusiness} target="_blank" rel="nofollow noopener noreferrer" aria-label="KL Renovator Google Business Profile" style={{ backgroundColor: "#4285F4" }} className="grid h-9 w-9 place-items-center rounded-full text-white transition-opacity hover:opacity-85"><FaGoogle className="h-4 w-4" /></a>
            <a href={sitePublic.links.twitter} target="_blank" rel="nofollow noopener noreferrer" aria-label="KL Renovator X / Twitter" style={{ backgroundColor: "#000000" }} className="grid h-9 w-9 place-items-center rounded-full text-white transition-opacity hover:opacity-85"><FaXTwitter className="h-4 w-4" /></a>
            <a href={sitePublic.links.linkedin} target="_blank" rel="nofollow noopener noreferrer" aria-label="KL Renovator LinkedIn" style={{ backgroundColor: "#0A66C2" }} className="grid h-9 w-9 place-items-center rounded-full text-white transition-opacity hover:opacity-85"><FaLinkedinIn className="h-4 w-4" /></a>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-900">{t("footer_services")}</p>
          <ul className="space-y-2">
            {sitePublic.services.map((s, idx) => (
              <li key={s.slug}>
                <NextLink href={localizedPath(`/services/${s.slug}`)} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">
                  {serviceAnchor(s.slug, (lang as "en" | "ms" | "zh"), idx)}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-900">{fl.quickLinks}</p>

          {/* Installation Hub Links */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-2">Aircond Installation</p>
            <ul className="space-y-1.5">
              <li><NextLink href={localizedPath("/installation")} className="text-xs font-black text-sky-600 hover:text-sky-700 transition-colors">All Installation Services →</NextLink></li>
              <li><NextLink href={localizedPath("/aircond-installation-kl")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">Installation KL &amp; Selangor</NextLink></li>
              <li><NextLink href={localizedPath("/btu-calculator")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">BTU &amp; HP Calculator</NextLink></li>
              <li><NextLink href={localizedPath("/new-home-aircond-installation")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">New Home Package</NextLink></li>
              <li><NextLink href={localizedPath("/commercial-aircond-installation")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">Commercial &amp; Shoplot</NextLink></li>
              <li><NextLink href={localizedPath("/commercial-aircond-service")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Servis & AMC Komersial" : lang === "zh" ? "商用保养与 AMC" : "Commercial Service & AMC"}</NextLink></li>
            </ul>
          </div>

          {/* Topic Hubs (issue #66) */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-2">
              {lang === "ms" ? "Hab Topik" : lang === "zh" ? "主题总览" : "Topic Hubs"}
            </p>
            <ul className="space-y-1.5">
              <li><NextLink href={localizedPath("/pricing")} className="text-xs font-black text-sky-600 hover:text-sky-700 transition-colors">{lang === "ms" ? "Semua Harga →" : lang === "zh" ? "全部价格 →" : "All Pricing Guides →"}</NextLink></li>
              <li><NextLink href={localizedPath("/troubleshooting")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Penyelesaian Masalah" : lang === "zh" ? "故障排查" : "Troubleshooting"}</NextLink></li>
              <li><NextLink href={localizedPath("/maintenance")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Penyelenggaraan" : lang === "zh" ? "保养与维修" : "Maintenance"}</NextLink></li>
            </ul>
          </div>

          {/* Price Guides */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">{fl.priceGuides}</p>
            <ul className="space-y-1.5">
              <li><NextLink href={localizedPath("/aircond-service-price-malaysia")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">Aircond Service Price 2026</NextLink></li>
              <li><NextLink href={localizedPath("/installation-price-malaysia")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">Installation Price Guide</NextLink></li>
              <li><NextLink href={localizedPath("/cuci-aircond-kl")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">Chemical Wash KL Guide</NextLink></li>
              <li><NextLink href={localizedPath("/indoor-air-quality-aircond")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Kualiti Udara Dalaman" : lang === "zh" ? "室内空气质量" : "Indoor Air Quality"}</NextLink></li>
              <li><NextLink href={localizedPath("/book")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{fl.bookOnline}</NextLink></li>
            </ul>
          </div>

          {/* Free Calculators (trilingual EN/MS/ZH tool pages) */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Free Calculators</p>
            <ul className="space-y-1.5">
              <li><NextLink href={localizedPath("/aircond-installation-cost-calculator")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Kalkulator Kos Pemasangan" : lang === "zh" ? "安装费用计算器" : "Installation Cost Calculator"}</NextLink></li>
              <li><NextLink href={localizedPath("/aircond-gas-topup-cost-calculator")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Anggaran Kos Tambah Gas" : lang === "zh" ? "加气费用估算器" : "Gas Top-up Cost Estimator"}</NextLink></li>
              <li><NextLink href={localizedPath("/aircond-size-calculator")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Kalkulator Saiz Aircond" : lang === "zh" ? "冷气尺寸计算器" : "Aircond Size Calculator"}</NextLink></li>
              <li><NextLink href={localizedPath("/aircond-electricity-cost-calculator")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Kalkulator Kos Elektrik" : lang === "zh" ? "电费计算器" : "Electricity Cost Calculator"}</NextLink></li>
              <li><NextLink href={localizedPath("/aircond-savings-calculator")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Penjimatan Inverter" : lang === "zh" ? "变频节省计算器" : "Inverter Savings Calculator"}</NextLink></li>
              <li><NextLink href={localizedPath("/which-aircond-service-do-i-need")} className="text-xs text-slate-600 hover:text-sky-600 transition-colors font-medium">{lang === "ms" ? "Servis Mana Yang Saya Perlukan?" : lang === "zh" ? "我需要哪种服务？" : "Which Service Do I Need?"}</NextLink></li>
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">{fl.blog}</p>
            <NextLink href={localizedPath("/blog")} className="text-xs font-black text-sky-600 hover:text-sky-700 transition-colors">{fl.blog} →</NextLink>
          </div>
        </div>

        {/* Contact Block */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-900">{t("footer_dispatch")}</p>
          <ul className="space-y-3 text-xs">
            <li><a href={`tel:${sitePublic.phone}`} className="flex items-center gap-2.5 hover:text-sky-600 transition-colors font-medium"><span className="text-sky-500" aria-hidden="true">📞</span>{sitePublic.phoneDisplay}</a></li>
            <li><a href={`mailto:${sitePublic.email}`} className="flex items-center gap-2.5 hover:text-sky-600 transition-colors font-medium break-all"><span className="text-sky-500" aria-hidden="true">✉️</span>{sitePublic.email}</a></li>
            <li className="flex items-start gap-2.5"><span className="text-sky-500 mt-0.5" aria-hidden="true">📍</span><span className="font-medium">KL &amp; Selangor (Klang Valley)</span></li>
            <li className="flex items-start gap-2.5"><span className="text-sky-500 mt-0.5" aria-hidden="true">🕘</span><div><p className="text-slate-700 font-bold">{t("footer_hours")}</p><p className="mt-0.5 text-slate-600">Emergency bookings accepted</p></div></li>
          </ul>
          <a href={waLink(rfqMsg)} target="_blank" rel="nofollow noopener noreferrer" style={{ backgroundColor: "#25D366" }} className="inline-flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-opacity hover:opacity-85 mt-2 rounded-xl"><span aria-hidden="true">💬</span> {fl.bookWa}</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
          <p>© {new Date().getFullYear()} KL RENOVATOR (Multicore Dynamics Resources). {t("footer_rights")}</p>
          <nav className="flex items-center gap-4 flex-wrap justify-center" aria-label="Footer navigation">
            <NextLink href={localizedPath("/services")} className="hover:text-sky-600 transition-colors font-medium">{fl.navServices}</NextLink>
            <NextLink href={localizedPath("/blog")} className="hover:text-sky-600 transition-colors font-medium">{fl.navBlog}</NextLink>
            <NextLink href={localizedPath("/gallery")} className="hover:text-sky-600 transition-colors font-medium">{fl.navGallery}</NextLink>
            <NextLink href={localizedPath("/about")} className="hover:text-sky-600 transition-colors font-medium">{fl.navAbout}</NextLink>
            <NextLink href={localizedPath("/faq")} className="hover:text-sky-600 transition-colors font-medium">{fl.navFaq}</NextLink>
            <NextLink href={localizedPath("/contact")} className="hover:text-sky-600 transition-colors font-medium">{fl.navContact}</NextLink>
            <NextLink href={localizedPath("/privacy-policy")} className="hover:text-sky-600 transition-colors font-medium">{fl.privacyPolicy}</NextLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};
