import type { Metadata } from "next";
import Image from "next/image";
import {
  FaShieldAlt, FaUserCheck, FaTools, FaHandshake,
  FaWhatsapp, FaPhoneAlt,
} from "react-icons/fa";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { googlePlace } from "@/config/reviews";
import { Reveal } from "@/components/reveal";
import { title, eyebrow, subtitle } from "@/components/primitives";
import { StatsBand } from "@/components/sections/stats-band";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About KL Renovator | Trusted Aircond Specialist KL & Selangor",
  description:
    "KL Renovator (Multicore Dynamics Resources) — trusted aircond specialist in KL & Selangor. 12+ years experience, 5,000+ happy customers, 500+ reviews.",
  alternates: {
    canonical: "https://www.klrenovator.com/about",
    languages: {
      "en-MY": "https://www.klrenovator.com/about",
      "x-default": "https://www.klrenovator.com/about",
    },
  },
  openGraph: {
    title: "About KL Renovator | Trusted Aircond Specialist KL & Selangor",
    description:
      "KL Renovator (Multicore Dynamics Resources) — 12+ years HVAC expertise, 5,000+ happy customers, 500+ 5-star reviews. Professional aircond servicing across Kuala Lumpur & Selangor.",
    url: "https://www.klrenovator.com/about",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Trusted Aircond Specialist Kuala Lumpur & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About KL Renovator | Trusted Aircond Specialist KL & Selangor",
    description: "12+ years HVAC expertise, 5,000+ happy customers, 500+ 5-star reviews. Professional aircond servicing across KL & Selangor.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp"],
  },
};

// ── Breadcrumb Schema ────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.klrenovator.com/about" },
  ],
};

// ── Organization Schema ───────────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.klrenovator.com/#organization",
  name: "KL Renovator",
  legalName: "Multicore Dynamics Resources",
  url: "https://www.klrenovator.com",
  logo: "https://www.klrenovator.com/logo/image.png",
  image: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
  description: "Professional HVAC and air conditioning service company in Kuala Lumpur and Selangor. 12+ years experience, 5,000+ customers, 500+ 5-star reviews.",
  foundingDate: "2014",
  telephone: "+60182983573",
  email: "info@klrenovator.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-22-09 Magnaville Selayang",
    addressLocality: "Batu Caves",
    postalCode: "68100",
    addressRegion: "Selangor",
    addressCountry: "MY",
  },
  sameAs: [
    "https://www.facebook.com/share/1HV3kAqC6V/",
    "https://www.instagram.com/klrenovator",
    "https://www.tiktok.com/@klrenovator",
    "https://share.google/HhXvqWDkefZ5bzNdL",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(googlePlace.averageRating),
    reviewCount: String(googlePlace.totalReviews),
    bestRating: "5",
    worstRating: "1",
  },
};

const VALUES = [
  {
    icon: FaShieldAlt,
    title: "Integrity",
    desc: "We give honest assessments and never recommend services you don't need.",
  },
  {
    icon: FaTools,
    title: "Craftsmanship",
    desc: "Every job is done by licensed technicians using proper tools and techniques.",
  },
  {
    icon: FaUserCheck,
    title: "Customer-First",
    desc: "Your satisfaction drives every decision we make — from quote to handover.",
  },
  {
    icon: FaHandshake,
    title: "Transparency",
    desc: "Clear quotes, no hidden fees, no surprises on the invoice.",
  },
];

const HIGHLIGHTS = [
  "12+ years of aircon expertise",
  "5,000+ satisfied customers",
  "Licensed & insured technicians",
  "Same-day service available",
  "1-month workmanship warranty",
  "Servicing all major brands",
];

const ABOUT_GALLERY = [
  { src: "/hero/aircond-installation-kuala-lumpur.webp", alt: "KL Renovator technician installing a wall-mounted aircond unit in a Kuala Lumpur apartment", title: "Installation KL" },
  { src: "/hero/aircond-installation-wall-mounted-kl.webp", alt: "Indoor wall-mounted aircond unit neatly installed with concealed piping in a Selangor home", title: "Wall-Mounted Install" },
  { src: "/hero/aircond-ceiling-cassette-installation-commercial.webp", alt: "Ceiling cassette aircond unit being fitted in a commercial office space in KL", title: "Cassette Installation" },
  { src: "/hero/aircond-new-installation-rawang-selangor.webp", alt: "Completed new aircond installation showing indoor unit and neat cable routing in Rawang", title: "New Install Rawang" },
  { src: "/hero/aircond-pressure-chemical-wash-selangor.webp", alt: "Technician applying pressure chemical wash to clean mould and dust from aircond evaporator coil", title: "Pressure Wash" },
  { src: "/hero/aircond-repair-technician-klang-valley.webp", alt: "KL Renovator HVAC technician diagnosing aircond fault using professional testing equipment", title: "Repair Technician" },
  { src: "/hero/aircond-new-compressor-installation-rawang.webp", alt: "Replacement compressor installed on an aircond outdoor unit at a Rawang residential property", title: "Compressor Replace" },
  { src: "/hero/aircond-compressor-flaring-repair-kl.webp", alt: "Copper pipe flaring repair on aircond compressor to fix refrigerant leak in Kuala Lumpur", title: "Flaring Repair" },
  { src: "/hero/aircond-compressor-bracket-installation-kl.webp", alt: "Heavy-duty outdoor bracket installed for aircond compressor unit in Kuala Lumpur", title: "Compressor Bracket" },
  { src: "/hero/aircond-installation-double-unit-kl.webp", alt: "Two wall-mounted aircond units installed side by side in a Kuala Lumpur home", title: "Double Unit Install" },
  { src: "/hero/aircond-gas-topup-r32-r410a-selangor.webp", alt: "Refrigerant gas top-up being performed with manifold gauge on aircond unit in Selangor", title: "Gas Top-Up" },
  { src: "/hero/aircond-compressor-installation-new-kl.webp", alt: "Brand new aircond outdoor compressor unit being connected and sealed by KL Renovator technician", title: "New Compressor" },
  { src: "/hero/aircond-pcb-board-replacement-kl.webp", alt: "Faulty PCB board replaced with new unit inside aircond indoor unit in Kuala Lumpur", title: "PCB Replace" },
  { src: "/hero/aircond-installation-ampang-selangor.webp", alt: "Wall-mounted aircond installation completed in an Ampang condominium unit", title: "Installation Ampang" },
  { src: "/hero/aircond-chemical-service-canvas-wrap-kl.webp", alt: "Canvas protection laid out before chemical service to keep customer's home clean in KL", title: "Canvas Protection" },
  { src: "/hero/aircond-pcb-board-replacement-2-klang-valley.webp", alt: "Aircond PCB board replacement in progress in Klang Valley", title: "PCB Replacement" },
  { src: "/hero/aircond-bracket-installation-kl-renovator.webp", alt: "Outdoor compressor bracket securely mounted on wall during aircond installation by KL Renovator", title: "Bracket Installation" },
  { src: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp", alt: "Canvas-wrapped chemical wash in progress to protect walls and furniture at a Kepong property", title: "Chemical Wash Kepong" },
  { src: "/hero/aux-aircond-basic-servicing-shah-alam-53.webp", alt: "Aux brand aircond receiving routine filter clean and multi-point check in Shah Alam", title: "Aux Servicing" },
  { src: "/hero/aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp", alt: "Aux ceiling cassette unit being serviced in a Petaling Jaya office", title: "Aux Cassette" },
  { src: "/hero/aux-aircond-dismantle-relocation-kuala-lumpur-9.webp", alt: "Aux aircond unit carefully dismantled for relocation in Kuala Lumpur", title: "Aux Relocation" },
  { src: "/hero/aux-aircond-gas-topup-r410a-klang-64.webp", alt: "R410A refrigerant being added to Aux inverter aircond in Klang", title: "Aux Gas Top-Up" },
  { src: "/hero/aux-aircond-troubleshooting-repair-puchong-42.webp", alt: "Aux aircond troubleshooting in progress in Puchong", title: "Aux Troubleshoot" },
  { src: "/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp", alt: "Daikin ceiling cassette aircond receiving scheduled maintenance in Shah Alam", title: "Daikin Cassette" },
  { src: "/hero/daikin-aircond-compressor-replacement-subang-jaya-34.webp", alt: "Daikin aircond compressor replaced with proper pump-down in Subang Jaya", title: "Daikin Compressor" },
  { src: "/hero/daikin-aircond-dismantle-relocation-puchong-45.webp", alt: "Daikin aircond safely dismantled for relocation in Puchong", title: "Daikin Relocation" },
  { src: "/hero/daikin-aircond-pcb-board-repair-petaling-jaya-23.webp", alt: "Daikin aircond PCB board inspected and repaired in Petaling Jaya", title: "Daikin PCB Repair" },
  { src: "/hero/daikin-aircond-water-leaking-fix-kuala-lumpur-12.webp", alt: "Daikin aircond water leak traced to blocked drain cleared in KL", title: "Daikin Leak Fix" },
  { src: "/hero/isonic-aircond-ceiling-cassette-service-puchong-44.webp", alt: "Isonic ceiling cassette aircond filter and coil cleaned in Puchong", title: "Isonic Cassette" },
  { src: "/hero/isonic-aircond-compressor-replacement-petaling-jaya-22.webp", alt: "Isonic aircond outdoor compressor being replaced in Petaling Jaya", title: "Isonic Compressor" },
  { src: "/hero/isonic-aircond-dismantle-relocation-subang-jaya-33.webp", alt: "Isonic aircond unit dismantled for relocation in Subang Jaya", title: "Isonic Relocation" },
  { src: "/hero/isonic-aircond-pcb-board-repair-kuala-lumpur-11.webp", alt: "Isonic aircond circuit board diagnosed and soldered in Kuala Lumpur", title: "Isonic PCB Repair" },
  { src: "/hero/isonic-aircond-troubleshooting-repair-klang-66.webp", alt: "Isonic aircond fault diagnosis checking fan motor in Klang", title: "Isonic Troubleshoot" },
  { src: "/hero/lg-aircond-basic-servicing-subang-jaya-29.webp", alt: "LG aircond routine filter cleaning and system check in Subang Jaya", title: "LG Servicing" },
  { src: "/hero/lg-aircond-gas-topup-r32-shah-alam-51.webp", alt: "LG inverter aircond R32 refrigerant top-up in Shah Alam", title: "LG Gas R32" },
  { src: "/hero/lg-aircond-gas-topup-r410a-puchong-40.webp", alt: "LG aircond R410A gas refill being done in Puchong", title: "LG Gas R410A" },
  { src: "/hero/lg-aircond-troubleshooting-repair-petaling-jaya-18.webp", alt: "LG aircond diagnosed for intermittent auto-shutoff in Petaling Jaya", title: "LG Troubleshoot" },
  { src: "/hero/midea-aircond-basic-servicing-petaling-jaya-17.webp", alt: "Midea aircond receiving standard filter and coil cleaning in Petaling Jaya", title: "Midea Servicing" },
  { src: "/hero/midea-aircond-gas-topup-r32-puchong-39.webp", alt: "Midea R32 inverter aircond gas pressure balanced during top-up in Puchong", title: "Midea Gas R32" },
  { src: "/hero/midea-aircond-gas-topup-r410a-subang-jaya-28.webp", alt: "Midea aircond R410A refrigerant refill with leak check in Subang Jaya", title: "Midea Gas R410A" },
  { src: "/hero/midea-aircond-troubleshooting-repair-kuala-lumpur-6.webp", alt: "Midea aircond troubleshooting testing capacitor in Kuala Lumpur", title: "Midea Troubleshoot" },
  { src: "/hero/midea-aircond-water-leaking-fix-klang-72.webp", alt: "Midea aircond water leak resolved drain pipe flushed in Klang", title: "Midea Leak Fix" },
  { src: "/hero/mitsubishi-aircond-chemical-overhaul-petaling-jaya-14.webp", alt: "Mitsubishi aircond indoor unit deep-cleaned in chemical overhaul at Petaling Jaya", title: "Mitsubishi Overhaul" },
  { src: "/hero/mitsubishi-aircond-compressor-replacement-shah-alam-58.webp", alt: "Mitsubishi aircond compressor swapped out in Shah Alam", title: "Mitsubishi Compressor" },
  { src: "/hero/mitsubishi-aircond-dismantle-relocation-klang-69.webp", alt: "Mitsubishi aircond unit safely removed for relocation in Klang", title: "Mitsubishi Relocation" },
  { src: "/hero/mitsubishi-aircond-gas-topup-r32-kuala-lumpur-3.webp", alt: "Mitsubishi R32 inverter aircond refrigerant topped up in Kuala Lumpur", title: "Mitsubishi Gas R32" },
  { src: "/hero/mitsubishi-aircond-pcb-board-repair-puchong-47.webp", alt: "Mitsubishi aircond control board being repaired in Puchong", title: "Mitsubishi PCB" },
  { src: "/hero/mitsubishi-aircond-water-leaking-fix-subang-jaya-36.webp", alt: "Mitsubishi aircond drain pan cleaned and water leak fixed in Subang Jaya", title: "Mitsubishi Leak Fix" },
  { src: "/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp", alt: "Panasonic ceiling cassette aircond serviced at Klang commercial property", title: "Panasonic Cassette" },
  { src: "/hero/panasonic-aircond-compressor-replacement-puchong-46.webp", alt: "Panasonic aircond outdoor compressor replaced in Puchong", title: "Panasonic Compressor" },
  { src: "/hero/panasonic-aircond-dismantle-relocation-shah-alam-57.webp", alt: "Panasonic aircond dismantled for office relocation in Shah Alam", title: "Panasonic Relocation" },
  { src: "/hero/panasonic-aircond-pcb-board-repair-subang-jaya-35.webp", alt: "Panasonic aircond PCB inspected and repaired in Subang Jaya", title: "Panasonic PCB" },
  { src: "/hero/panasonic-aircond-water-leaking-fix-petaling-jaya-24.webp", alt: "Panasonic aircond water leak repaired drain pipe unblocked in PJ", title: "Panasonic Leak Fix" },
  { src: "/hero/samsung-aircond-basic-servicing-puchong-41.webp", alt: "Samsung aircond filter cleaned during routine servicing in Puchong", title: "Samsung Servicing" },
  { src: "/hero/samsung-aircond-ceiling-cassette-service-kuala-lumpur-8.webp", alt: "Samsung ceiling cassette unit receiving filter change in KL", title: "Samsung Cassette" },
  { src: "/hero/samsung-aircond-gas-topup-r32-klang-63.webp", alt: "Samsung R32 inverter aircond gas topped up in Klang", title: "Samsung Gas R32" },
  { src: "/hero/samsung-aircond-gas-topup-r410a-shah-alam-52.webp", alt: "Samsung aircond R410A refrigerant refilled in Shah Alam", title: "Samsung Gas R410A" },
  { src: "/hero/samsung-aircond-troubleshooting-repair-subang-jaya-30.webp", alt: "Samsung aircond error code diagnosed and repaired in Subang Jaya", title: "Samsung Troubleshoot" },
  { src: "/hero/tcl-aircond-basic-servicing-klang-65.webp", alt: "TCL aircond unit cleaned and checked during maintenance in Klang", title: "TCL Servicing" },
  { src: "/hero/tcl-aircond-ceiling-cassette-service-subang-jaya-32.webp", alt: "TCL ceiling cassette aircond deep-serviced in Subang Jaya office", title: "TCL Cassette" },
  { src: "/hero/tcl-aircond-compressor-replacement-kuala-lumpur-10.webp", alt: "TCL aircond outdoor compressor replaced in Kuala Lumpur", title: "TCL Compressor" },
  { src: "/hero/tcl-aircond-dismantle-relocation-petaling-jaya-21.webp", alt: "TCL aircond unit removed for relocation in Petaling Jaya", title: "TCL Relocation" },
  { src: "/hero/tcl-aircond-new-installation-puchong-43.webp", alt: "TCL aircond installed with bracket and copper piping in Puchong", title: "TCL Install" },
  { src: "/hero/tcl-aircond-troubleshooting-repair-shah-alam-54.webp", alt: "TCL aircond diagnosed for cooling issues in Shah Alam", title: "TCL Troubleshoot" },
  { src: "/hero/york-aircond-chemical-overhaul-subang-jaya-26.webp", alt: "York aircond fully disassembled for overhaul in Subang Jaya", title: "York Overhaul" },
  { src: "/hero/york-aircond-chemical-wash-puchong-37.webp", alt: "York aircond indoor unit receiving chemical wash in Puchong", title: "York Chem Wash" },
  { src: "/hero/york-aircond-compressor-replacement-klang-70.webp", alt: "York aircond compressor swapped out and new unit installed in Klang", title: "York Compressor" },
  { src: "/hero/york-aircond-gas-topup-r32-petaling-jaya-15.webp", alt: "York R32 inverter aircond refrigerant restored in Petaling Jaya", title: "York Gas R32" },
  { src: "/hero/york-aircond-gas-topup-r410a-kuala-lumpur-4.webp", alt: "York aircond R410A gas top-up with leak check in Kuala Lumpur", title: "York Gas R410A" },
  { src: "/hero/york-aircond-pcb-board-repair-shah-alam-59.webp", alt: "York aircond PCB board with faulty component replaced in Shah Alam", title: "York PCB Repair" },
  { src: "/hero/york-aircond-water-leaking-fix-puchong-48.webp", alt: "York aircond water leak resolved drain pipe cleared in Puchong", title: "York Leak Fix" },
  { src: "/hero/aircond-chemical-service-canvas-wrap-kl.webp", alt: "Canvas protection laid out before chemical service to keep home clean in KL", title: "Canvas Protection" },
  { src: "/hero/aircond-compressor-flaring-repair-kl.webp", alt: "Copper pipe flaring repair on aircond compressor to fix refrigerant leak in KL", title: "Flaring Repair" },
  { src: "/hero/aircond-gas-topup-r32-r410a-selangor.webp", alt: "Refrigerant gas top-up with manifold gauge on aircond unit in Selangor", title: "Gas Top-Up" },
  { src: "/hero/aircond-new-compressor-installation-rawang.webp", alt: "Replacement compressor installed on aircond outdoor unit in Rawang", title: "Compressor Replace" },
  { src: "/hero/aircond-pcb-board-replacement-kl.webp", alt: "Faulty PCB board replaced with new unit in Kuala Lumpur", title: "PCB Replace" },
  { src: "/hero/aircond-pcb-board-replacement-2-klang-valley.webp", alt: "Aircond PCB board replacement in progress in Klang Valley", title: "PCB Replacement" },
  { src: "/hero/aircond-repair-technician-klang-valley.webp", alt: "KL Renovator HVAC technician diagnosing aircond fault with professional equipment", title: "Repair Technician" },
  { src: "/hero/aircond-sensor-replacement-klang-valley.webp", alt: "Temperature sensor replacement restoring proper cooling cycle in Klang Valley", title: "Sensor Replace" },
  { src: "/hero/acson-aircond-chemical-overhaul-puchong-38.webp", alt: "Acson aircond fully dismantled for chemical overhaul at a Puchong home", title: "Acson Overhaul" },
  { src: "/hero/aircond-chemical-overhaul-ampang-selangor.webp", alt: "Aircond indoor unit taken apart for deep chemical overhaul cleaning in Ampang", title: "Overhaul Ampang" },
  { src: "/hero/lg-aircond-chemical-overhaul-klang-62.webp", alt: "LG aircond blower wheel and evaporator coil cleaned during chemical overhaul in Klang", title: "LG Overhaul" },
  { src: "/hero/midea-aircond-chemical-overhaul-shah-alam-50.webp", alt: "Midea aircond components washed individually during overhaul in Shah Alam", title: "Midea Overhaul" },
  { src: "/hero/panasonic-aircond-chemical-overhaul-kuala-lumpur-2.webp", alt: "Panasonic aircond drain pan and coil scrubbed clean during overhaul in KL", title: "Panasonic Overhaul" },
  { src: "/hero/york-aircond-chemical-overhaul-subang-jaya-26.webp", alt: "York aircond fully disassembled for chemical overhaul in Subang Jaya", title: "York Overhaul" },
  { src: "/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp", alt: "Acson aircond filter being cleaned during routine basic servicing in KL", title: "Acson Servicing" },
  { src: "/hero/acson-aircond-gas-topup-r32-subang-jaya-27.webp", alt: "R32 refrigerant precisely topped up on Acson aircond in Subang Jaya", title: "Acson Gas R32" },
  { src: "/hero/acson-aircond-gas-topup-r410a-petaling-jaya-16.webp", alt: "R410A gas pressure check and refill on Acson inverter in PJ", title: "Acson Gas R410A" },
  { src: "/hero/acson-aircond-pcb-board-repair-klang-71.webp", alt: "Acson aircond PCB board diagnosed and repaired by technician in Klang", title: "Acson PCB Repair" },
  { src: "/hero/acson-aircond-water-leaking-fix-shah-alam-60.webp", alt: "Acson aircond water leak resolved drain pipe cleared in Shah Alam", title: "Acson Leak Fix" },
  { src: "/hero/daikin-aircond-chemical-wash-kuala-lumpur-1.webp", alt: "Daikin aircond filter and coil deep-cleaned with chemical solution in KL", title: "Daikin Chem Wash" },
  { src: "/hero/midea-aircond-chemical-wash-klang-61.webp", alt: "Midea wall-mounted aircond receiving pressure chemical wash in Klang", title: "Midea Chem Wash" },
  { src: "/hero/mitsubishi-aircond-chemical-wash-subang-jaya-25.webp", alt: "Mitsubishi aircond unit mid chemical wash showing improved airflow in Subang Jaya", title: "Mitsubishi Chem Wash" },
  { src: "/hero/panasonic-aircond-chemical-wash-petaling-jaya-13.webp", alt: "Panasonic inverter aircond evaporator coil chemically cleaned in PJ", title: "Panasonic Chem Wash" },
  { src: "/hero/york-aircond-chemical-wash-puchong-37.webp", alt: "York aircond indoor unit receiving chemical wash in Puchong apartment", title: "York Chem Wash" },
];

// ── Meet The Team — E-E-A-T: named, real people behind the work ───────────────
const TEAM = [
  {
    name: "Muhammad",
    role: "Owner & Founder",
    experience: "Running KL Renovator since 2014",
    bio: "Started KL Renovator as a single-van operation servicing homes in Cheras. Personally oversees every technician's training and every job quality check.",
    image: "/hero/aircond-installation-ampang-selangor.webp",
    imageAlt: "Muhammad, Owner & Founder of KL Renovator, on an aircond installation job in Ampang Selangor",
  },
  {
    name: "Shahzaib",
    role: "Senior Installation Technician",
    experience: "18 years experience",
    bio: "Our most experienced installer — handles wall-mounted splits, ceiling cassettes, and multi-unit commercial installations across the Klang Valley.",
    image: "/hero/aircond-installation-kuala-lumpur.webp",
    imageAlt: "Shahzaib, Senior Installation Technician with 18 years experience, installing an aircond unit in Kuala Lumpur",
  },
  {
    name: "Mudassar",
    role: "Service & Chemical Wash Technician",
    experience: "3 years experience",
    bio: "Specialist in chemical wash and chemical overhaul jobs — known for careful canvas-protected cleaning that keeps walls and floors spotless.",
    image: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp",
    imageAlt: "Mudassar, Service & Chemical Wash Technician with 3 years experience, performing a canvas-protected chemical wash in Kepong KL",
  },
  {
    name: "Hamzah",
    role: "Service Technician",
    experience: "1.5 years experience",
    bio: "Handles pressure chemical washes and routine servicing across Selangor — fast, tidy, and thorough on every visit.",
    image: "/hero/aircond-pressure-chemical-wash-selangor.webp",
    imageAlt: "Hamzah, Service Technician with 1.5 years experience, performing a pressure chemical wash in Selangor",
  },
];

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.klrenovator.com/#organization",
    name: "KL Renovator",
    legalName: "Multicore Dynamics Resources",
    url: "https://www.klrenovator.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.klrenovator.com/logo/image.png",
      width: 400,
      height: 400,
    },
    image: "https://www.klrenovator.com/logo/image.png",
    description:
      "KL Renovator (Multicore Dynamics Resources) is a professional HVAC and aircond servicing company based in Selayang, serving all of Kuala Lumpur and Selangor since 2014. Specialized in chemical wash, chemical overhaul, gas top-up, repair, and new unit installation.",
    foundingDate: "2014",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Megnavilla Selayang",
      postalCode: "68100",
      addressLocality: "Selayang",
      addressRegion: "Selangor",
      addressCountry: "MY",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "MY",
        availableLanguage: ["English", "Malay", "Chinese"],
      },
    ],
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
      siteConfig.links.tiktok,
      siteConfig.links.youtube,
      siteConfig.links.googleBusiness,
      siteConfig.links.googleMaps,
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
    ],
    founder: {
      "@type": "Person",
      name: "Muhammad",
      jobTitle: "Owner & Founder",
    },
    employee: [
      {
        "@type": "Person",
        name: "Shahzaib",
        jobTitle: "Senior Installation Technician",
        description: "18 years experience in aircond installation",
      },
      {
        "@type": "Person",
        name: "Mudassar",
        jobTitle: "Service & Chemical Wash Technician",
        description: "3 years experience in aircond chemical wash and servicing",
      },
      {
        "@type": "Person",
        name: "Hamzah",
        jobTitle: "Service Technician",
        description: "1.5 years experience in aircond servicing",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(googlePlace.averageRating),
      reviewCount: String(googlePlace.totalReviews),
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.klrenovator.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://www.klrenovator.com/about",
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Nav */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/" className="hover:text-sky-600 transition">
              Home
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">About</span>
          </nav>
        </div>
      </div>

      {/* Hero — White */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/hero/aircond-pcb-board-replacement-kl.webp"
            alt="KL Renovator professional HVAC team at work Kuala Lumpur"
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
              About KL Renovator
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.05] text-slate-900 uppercase">
              Built on craft.
              <br />
              <span className="text-sky-500">Driven by trust.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              For 12+ years we have been the aircon partner Kuala Lumpur
              and Selangor turn to when comfort matters. From condos to
              commercial cassette installs — we deliver clean, careful work
              every single visit.
            </p>
          </Reveal>
        </div>
      </section>

      <StatsBand />

      {/* Story */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl rounded-2xl">
                <Image
                  src="/hero/aircond-installation-ampang-selangor.webp"
                  alt="KL Renovator HVAC technician servicing aircond unit Selangor"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <p className={eyebrow()}>Our Story</p>
                <h2 className="mt-3">
                  <span className={title({ size: "md" })}>A team of </span>
                  <span className={title({ size: "md", color: "brand" })}>
                    aircon experts.
                  </span>
                </h2>
                <p className={subtitle({ class: "mt-4" })}>
                  KL Renovator started as a single-van operation servicing
                  homes in Cheras. Today we are a full-service aircon
                  specialist with technicians stationed across the Klang Valley.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed font-medium">
                  What has not changed is the obsession with doing the small
                  things well — wearing shoe covers indoors, cleaning up after
                  every visit, and giving customers a clear quote before a
                  single screw is turned.
                </p>

                <ul className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
                  {HIGHLIGHTS.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 bg-white px-4 py-3">
                      <FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" />
                      <span className="text-sm font-bold text-slate-900">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Meet The Team — named technicians for E-E-A-T trust signals */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className={eyebrow()}>Meet The Team</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>The people </span>
                <span className={title({ size: "md", color: "brand" })}>behind every job.</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium">
                Real technicians, real experience — not a faceless call centre.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <div className="bg-white h-full">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-sky-600">
                      {member.role}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-500">{member.experience}</p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery — Horizontal Scroll */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className={eyebrow()}>Our Work</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>Real Projects. </span>
                <span className={title({ size: "md", color: "brand" })}>Real Results.</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium">
                Every photo below is from an actual KL Renovator job — no stock images, no staging.
              </p>
            </div>
          </Reveal>

          <div
            className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            {ABOUT_GALLERY.map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 w-72 sm:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-md snap-start border border-slate-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="320px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-400 font-medium">
            ← Swipe or scroll horizontally to view more →
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className={eyebrow()}>Our Values</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>How we </span>
                <span className={title({ size: "md", color: "brand" })}>do business.</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium">
                Four principles that guide every booking, quote, and visit.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div className="bg-white p-6 sm:p-8 h-full hover:bg-slate-50 transition-colors">
                  <div className="inline-flex h-12 w-12 items-center justify-center bg-sky-600 text-white rounded-xl">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-black uppercase tracking-tight text-slate-900">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CoverageAreas />

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-sky-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Let&apos;s get your aircon{" "}
              <span className="text-sky-100">running like new.</span>
            </h2>
            <p className="mt-4 text-sky-100 font-medium">
              Same-day slots available across KL &amp; Selangor — Batu Caves, Ampang, Cheras, Petaling Jaya, Subang Jaya, Shah Alam, Klang, Kajang, Bangsar, Mont Kiara, Kepong, Sri Petaling, Sunway, USJ, Putrajaya, Cyberjaya &amp; more.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" />
                Request a Quote
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-white hover:bg-slate-100 px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-900 transition-all rounded-xl"
              >
                <FaPhoneAlt className="h-4 w-4" />
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
