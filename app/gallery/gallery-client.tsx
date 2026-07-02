"use client";

import { useState } from "react";
import NextImage from "next/image";
import { FaWhatsapp, FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export type GalleryItem = {
  id: number;
  category: string;
  title: string;
  alt: string;
  desc?: string;
  src: string;
  before?: string;
};

// ── ALL REAL COMPANY IMAGES — SEO-friendly filenames + unique alt text ────────
export const GALLERY_ITEMS: GalleryItem[] = [
  // ── INSTALLATION ──────────────────────────────────────────────────────────
  { id: 8, category: "installation", title: "Aircon Bracket Installation KL Renovator", alt: "Outdoor compressor bracket securely mounted on wall during aircond installation by KL Renovator", src: "/hero/aircond-bracket-installation-kl-renovator.webp" },
  { id: 9, category: "installation", title: "Ceiling Cassette Installation Commercial", alt: "Ceiling cassette aircond unit being fitted in a commercial office space in KL", src: "/hero/aircond-ceiling-cassette-installation-commercial.webp" },
  { id: 13, category: "installation", title: "Compressor Bracket Installation KL", alt: "Heavy-duty outdoor bracket installed for aircond compressor unit in Kuala Lumpur", src: "/hero/aircond-compressor-bracket-installation-kl.webp" },
  { id: 15, category: "installation", title: "Compressor Installation New KL", alt: "Brand new aircond outdoor compressor unit being connected and sealed by KL Renovator technician", src: "/hero/aircond-compressor-installation-new-kl.webp" },
  { id: 17, category: "installation", title: "Aircond Installation Ampang Selangor", alt: "Wall-mounted aircond installation completed in an Ampang condominium unit", src: "/hero/aircond-installation-ampang-selangor.webp" },
  { id: 18, category: "installation", title: "Double Unit Installation KL", alt: "Two wall-mounted aircond units installed side by side in a Kuala Lumpur home", src: "/hero/aircond-installation-double-unit-kl.webp" },
  { id: 19, category: "installation", title: "Aircond Installation Kuala Lumpur", alt: "KL Renovator technician installing a wall-mounted aircond unit in a Kuala Lumpur apartment", src: "/hero/aircond-installation-kuala-lumpur.webp" },
  { id: 20, category: "installation", title: "Wall-Mounted Installation KL", alt: "Indoor wall-mounted aircond unit neatly installed with concealed piping in Selangor home", src: "/hero/aircond-installation-wall-mounted-kl.webp" },
  { id: 21, category: "installation", title: "New Compressor Installation Rawang", alt: "New outdoor compressor unit installed with proper bracket and copper pipe routing in Rawang", src: "/hero/aircond-new-compressor-installation-rawang.webp" },
  { id: 22, category: "installation", title: "New Installation Petaling Jaya", alt: "Fresh aircond installation with clean copper pipe and drain line setup in Petaling Jaya", src: "/hero/aircond-new-installation-petaling-jaya.webp" },
  { id: 23, category: "installation", title: "New Installation Rawang Selangor", alt: "Completed new aircond installation showing indoor unit and neat cable routing in Rawang", src: "/hero/aircond-new-installation-rawang-selangor.webp" },
  { id: 33, category: "installation", title: "Aux Aircond Installation Subang Jaya", alt: "Aux brand aircond unit being professionally installed at a residential property in Subang Jaya", src: "/hero/aux-aircond-new-installation-subang-jaya-31.webp" },
  { id: 39, category: "installation", title: "Daikin Aircond Installation Klang", alt: "Daikin inverter aircond installed with standard copper pipe and electrical wiring in Klang", src: "/hero/daikin-aircond-new-installation-klang-67.webp" },
  { id: 45, category: "installation", title: "Isonic Aircond Installation Shah Alam", alt: "Isonic aircond new installation in progress at a Shah Alam terrace house", src: "/hero/isonic-aircond-new-installation-shah-alam-55.webp" },
  { id: 52, category: "installation", title: "LG Aircond Installation Kuala Lumpur", alt: "LG aircond wall-mounted unit installed in a Kuala Lumpur condo with proper bracket support", src: "/hero/lg-aircond-new-installation-kuala-lumpur-7.webp" },
  { id: 79, category: "installation", title: "Samsung Aircond Installation PJ", alt: "Samsung aircond unit being mounted and connected in a Petaling Jaya home", src: "/hero/samsung-aircond-new-installation-petaling-jaya-19.webp" },
  { id: 85, category: "installation", title: "TCL Aircond Installation Puchong", alt: "TCL aircond installation with standard 7ft copper pipe included at a Puchong residence", src: "/hero/tcl-aircond-new-installation-puchong-43.webp" },

  // ── CHEMICAL WASH ─────────────────────────────────────────────────────────
  { id: 3, category: "chemical-wash", title: "Acson Chemical Wash Shah Alam", alt: "Acson aircond indoor unit undergoing high-pressure chemical wash in a Shah Alam home", src: "/hero/acson-aircond-chemical-wash-shah-alam-49.webp" },
  { id: 12, category: "chemical-wash", title: "Chemical Wash Canvas Kepong KL", alt: "Canvas-wrapped chemical wash in progress to protect walls and furniture at a Kepong property", src: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp" },
  { id: 26, category: "chemical-wash", title: "Pressure Chemical Wash Selangor", alt: "Technician applying pressure chemical wash to clean mould and dust from aircond evaporator coil in Selangor", src: "/hero/aircond-pressure-chemical-wash-selangor.webp" },
  { id: 36, category: "chemical-wash", title: "Daikin Chemical Wash Kuala Lumpur", alt: "Daikin aircond filter and coil being deep-cleaned with chemical solution in Kuala Lumpur", src: "/hero/daikin-aircond-chemical-wash-kuala-lumpur-1.webp" },
  { id: 56, category: "chemical-wash", title: "Midea Chemical Wash Klang", alt: "Midea wall-mounted aircond receiving pressure chemical wash treatment in Klang", src: "/hero/midea-aircond-chemical-wash-klang-61.webp" },
  { id: 62, category: "chemical-wash", title: "Mitsubishi Chemical Wash Subang Jaya", alt: "Mitsubishi aircond unit mid chemical wash showing improved airflow after mould removal in Subang Jaya", src: "/hero/mitsubishi-aircond-chemical-wash-subang-jaya-25.webp" },
  { id: 70, category: "chemical-wash", title: "Panasonic Chemical Wash Petaling Jaya", alt: "Panasonic inverter aircond evaporator coil being chemically cleaned for better cooling in PJ", src: "/hero/panasonic-aircond-chemical-wash-petaling-jaya-13.webp" },
  { id: 88, category: "chemical-wash", title: "York Chemical Wash Puchong", alt: "York aircond indoor unit receiving thorough chemical wash in a Puchong apartment", src: "/hero/york-aircond-chemical-wash-puchong-37.webp" },

  // ── CHEMICAL OVERHAUL ─────────────────────────────────────────────────────
  { id: 2, category: "overhaul", title: "Acson Chemical Overhaul Puchong", alt: "Acson aircond fully dismantled for complete chemical overhaul at a Puchong home", src: "/hero/acson-aircond-chemical-overhaul-puchong-38.webp" },
  { id: 10, category: "overhaul", title: "Chemical Overhaul Ampang Selangor", alt: "Aircond indoor unit taken apart for deep chemical overhaul cleaning in Ampang", src: "/hero/aircond-chemical-overhaul-ampang-selangor.webp" },
  { id: 49, category: "overhaul", title: "LG Chemical Overhaul Klang", alt: "LG aircond blower wheel and evaporator coil cleaned during chemical overhaul in Klang", src: "/hero/lg-aircond-chemical-overhaul-klang-62.webp" },
  { id: 55, category: "overhaul", title: "Midea Chemical Overhaul Shah Alam", alt: "Midea aircond components washed individually during overhaul service in Shah Alam", src: "/hero/midea-aircond-chemical-overhaul-shah-alam-50.webp" },
  { id: 61, category: "overhaul", title: "Mitsubishi Chemical Overhaul PJ", alt: "Mitsubishi aircond indoor unit dismantled and deep-cleaned in chemical overhaul at Petaling Jaya", src: "/hero/mitsubishi-aircond-chemical-overhaul-petaling-jaya-14.webp" },
  { id: 69, category: "overhaul", title: "Panasonic Chemical Overhaul KL", alt: "Panasonic aircond drain pan and coil scrubbed clean during overhaul in Kuala Lumpur", src: "/hero/panasonic-aircond-chemical-overhaul-kuala-lumpur-2.webp" },
  { id: 87, category: "overhaul", title: "York Chemical Overhaul Subang Jaya", alt: "York aircond fully disassembled for chemical overhaul in Subang Jaya — resolving water leak issue", src: "/hero/york-aircond-chemical-overhaul-subang-jaya-26.webp" },

  // ── REPAIR / SERVICING ────────────────────────────────────────────────────
  { id: 1, category: "repair", title: "Acson Basic Servicing Kuala Lumpur", alt: "Acson aircond filter being cleaned during routine basic servicing in Kuala Lumpur", src: "/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp" },
  { id: 4, category: "repair", title: "Acson Gas Top-Up R32 Subang Jaya", alt: "R32 refrigerant being precisely topped up on an Acson aircond unit in Subang Jaya", src: "/hero/acson-aircond-gas-topup-r32-subang-jaya-27.webp" },
  { id: 5, category: "repair", title: "Acson Gas Top-Up R410A Petaling Jaya", alt: "R410A gas pressure check and refill on Acson inverter aircond in Petaling Jaya", src: "/hero/acson-aircond-gas-topup-r410a-petaling-jaya-16.webp" },
  { id: 6, category: "repair", title: "Acson PCB Board Repair Klang", alt: "Acson aircond PCB board being diagnosed and repaired by KL Renovator technician in Klang", src: "/hero/acson-aircond-pcb-board-repair-klang-71.webp" },
  { id: 7, category: "repair", title: "Acson Water Leak Fix Shah Alam", alt: "Acson aircond water leaking issue resolved — drain pipe cleared and sealed in Shah Alam", src: "/hero/acson-aircond-water-leaking-fix-shah-alam-60.webp" },
  { id: 11, category: "repair", title: "Chemical Service Canvas Wrap KL", alt: "Canvas protection laid out before chemical service to keep customer's home clean in KL", src: "/hero/aircond-chemical-service-canvas-wrap-kl.webp" },
  { id: 14, category: "repair", title: "Compressor Flaring Repair KL", alt: "Copper pipe flaring repair on aircond compressor to fix refrigerant leak in Kuala Lumpur", src: "/hero/aircond-compressor-flaring-repair-kl.webp" },
  { id: 16, category: "repair", title: "Gas Top-Up R32 & R410A Selangor", alt: "Refrigerant gas top-up being performed with manifold gauge on aircond unit in Selangor", src: "/hero/aircond-gas-topup-r32-r410a-selangor.webp" },
  { id: 24, category: "repair", title: "New Compressor Installation Rawang", alt: "Replacement compressor installed on an aircond outdoor unit at a Rawang residential property", src: "/hero/aircond-new-compressor-installation-rawang.webp" },
  { id: 25, category: "repair", title: "PCB Board Replacement KL", alt: "Faulty PCB board replaced with new unit inside aircond indoor unit in Kuala Lumpur", src: "/hero/aircond-pcb-board-replacement-kl.webp" },
  { id: 27, category: "repair", title: "Sensor Replacement Klang Valley", alt: "Temperature sensor replacement on aircond unit restoring proper cooling cycle in Klang Valley", src: "/hero/aircond-sensor-replacement-klang-valley.webp" },
  { id: 28, category: "repair", title: "Aircond Repair Technician Klang Valley", alt: "KL Renovator HVAC technician diagnosing aircond fault using professional testing equipment", src: "/hero/aircond-repair-technician-klang-valley.webp" },
  { id: 29, category: "repair", title: "Aux Basic Servicing Shah Alam", alt: "Aux brand aircond receiving routine filter clean and multi-point check in Shah Alam", src: "/hero/aux-aircond-basic-servicing-shah-alam-53.webp" },
  { id: 30, category: "repair", title: "Aux Ceiling Cassette Service PJ", alt: "Aux ceiling cassette unit being serviced in a Petaling Jaya office space", src: "/hero/aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp" },
  { id: 31, category: "repair", title: "Aux Dismantle & Relocation KL", alt: "Aux aircond unit carefully dismantled for relocation to a new premise in Kuala Lumpur", src: "/hero/aux-aircond-dismantle-relocation-kuala-lumpur-9.webp" },
  { id: 32, category: "repair", title: "Aux Gas Top-Up R410A Klang", alt: "R410A refrigerant being added to Aux inverter aircond in Klang with pressure gauge monitoring", src: "/hero/aux-aircond-gas-topup-r410a-klang-64.webp" },
  { id: 34, category: "repair", title: "Aux Troubleshooting Repair Puchong", alt: "Aux aircond troubleshooting in progress — checking electrical connections in Puchong", src: "/hero/aux-aircond-troubleshooting-repair-puchong-42.webp" },
  { id: 35, category: "repair", title: "Daikin Ceiling Cassette Service Shah Alam", alt: "Daikin ceiling cassette aircond receiving scheduled maintenance service in Shah Alam", src: "/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp" },
  { id: 37, category: "repair", title: "Daikin Compressor Replacement Subang Jaya", alt: "Daikin aircond compressor unit replaced with proper refrigerant pump-down in Subang Jaya", src: "/hero/daikin-aircond-compressor-replacement-subang-jaya-34.webp" },
  { id: 38, category: "repair", title: "Daikin Dismantle & Relocation Puchong", alt: "Daikin aircond safely dismantled and prepared for relocation at Puchong commercial premise", src: "/hero/daikin-aircond-dismantle-relocation-puchong-45.webp" },
  { id: 40, category: "repair", title: "Daikin PCB Board Repair PJ", alt: "Daikin aircond PCB board inspected and repaired at a Petaling Jaya service call", src: "/hero/daikin-aircond-pcb-board-repair-petaling-jaya-23.webp" },
  { id: 41, category: "repair", title: "Daikin Water Leak Fix Kuala Lumpur", alt: "Daikin aircond water leak traced to blocked drain — cleared and sealed in KL", src: "/hero/daikin-aircond-water-leaking-fix-kuala-lumpur-12.webp" },
  { id: 42, category: "repair", title: "Isonic Ceiling Cassette Service Puchong", alt: "Isonic ceiling cassette aircond filter and coil cleaned during service in Puchong", src: "/hero/isonic-aircond-ceiling-cassette-service-puchong-44.webp" },
  { id: 43, category: "repair", title: "Isonic Compressor Replacement PJ", alt: "Isonic aircond outdoor compressor being replaced at a Petaling Jaya residence", src: "/hero/isonic-aircond-compressor-replacement-petaling-jaya-22.webp" },
  { id: 44, category: "repair", title: "Isonic Dismantle & Relocation Subang Jaya", alt: "Isonic aircond unit dismantled with proper pump-down for relocation in Subang Jaya", src: "/hero/isonic-aircond-dismantle-relocation-subang-jaya-33.webp" },
  { id: 46, category: "repair", title: "Isonic PCB Board Repair KL", alt: "Isonic aircond circuit board diagnosed and soldered during repair in Kuala Lumpur", src: "/hero/isonic-aircond-pcb-board-repair-kuala-lumpur-11.webp" },
  { id: 47, category: "repair", title: "Isonic Troubleshooting Repair Klang", alt: "Isonic aircond fault diagnosis — technician checking fan motor and capacitor in Klang", src: "/hero/isonic-aircond-troubleshooting-repair-klang-66.webp" },
  { id: 48, category: "repair", title: "LG Basic Servicing Subang Jaya", alt: "LG aircond routine filter cleaning and system check at a Subang Jaya home", src: "/hero/lg-aircond-basic-servicing-subang-jaya-29.webp" },
  { id: 50, category: "repair", title: "LG Gas Top-Up R32 Shah Alam", alt: "LG inverter aircond R32 refrigerant top-up with digital pressure monitoring in Shah Alam", src: "/hero/lg-aircond-gas-topup-r32-shah-alam-51.webp" },
  { id: 51, category: "repair", title: "LG Gas Top-Up R410A Puchong", alt: "LG aircond R410A gas refill being done carefully to prevent overcharging in Puchong", src: "/hero/lg-aircond-gas-topup-r410a-puchong-40.webp" },
  { id: 53, category: "repair", title: "LG Troubleshooting Repair PJ", alt: "LG aircond being diagnosed for intermittent auto-shutoff issue in Petaling Jaya", src: "/hero/lg-aircond-troubleshooting-repair-petaling-jaya-18.webp" },
  { id: 54, category: "repair", title: "Midea Basic Servicing Petaling Jaya", alt: "Midea aircond receiving standard filter and coil cleaning service in Petaling Jaya", src: "/hero/midea-aircond-basic-servicing-petaling-jaya-17.webp" },
  { id: 57, category: "repair", title: "Midea Gas Top-Up R32 Puchong", alt: "Midea R32 inverter aircond gas pressure being balanced during top-up in Puchong", src: "/hero/midea-aircond-gas-topup-r32-puchong-39.webp" },
  { id: 58, category: "repair", title: "Midea Gas Top-Up R410A Subang Jaya", alt: "Midea aircond R410A refrigerant refill completed with leak check in Subang Jaya", src: "/hero/midea-aircond-gas-topup-r410a-subang-jaya-28.webp" },
  { id: 59, category: "repair", title: "Midea Troubleshooting Repair KL", alt: "Midea aircond troubleshooting — technician testing capacitor and wiring in Kuala Lumpur", src: "/hero/midea-aircond-troubleshooting-repair-kuala-lumpur-6.webp" },
  { id: 60, category: "repair", title: "Midea Water Leak Fix Klang", alt: "Midea aircond water leak resolved — clogged drain pipe flushed and resealed in Klang", src: "/hero/midea-aircond-water-leaking-fix-klang-72.webp" },
  { id: 63, category: "repair", title: "Mitsubishi Gas Top-Up R32 KL", alt: "Mitsubishi R32 inverter aircond refrigerant being topped up in Kuala Lumpur", src: "/hero/mitsubishi-aircond-gas-topup-r32-kuala-lumpur-3.webp" },
  { id: 64, category: "repair", title: "Mitsubishi PCB Board Repair Puchong", alt: "Mitsubishi aircond control board being repaired at a Puchong customer site", src: "/hero/mitsubishi-aircond-pcb-board-repair-puchong-47.webp" },
  { id: 65, category: "repair", title: "Mitsubishi Water Leak Fix Subang Jaya", alt: "Mitsubishi aircond drain pan cleaned and water leak fixed in Subang Jaya", src: "/hero/mitsubishi-aircond-water-leaking-fix-subang-jaya-36.webp" },
  { id: 66, category: "repair", title: "Mitsubishi Dismantle & Relocation Klang", alt: "Mitsubishi aircond unit safely removed for customer relocation in Klang", src: "/hero/mitsubishi-aircond-dismantle-relocation-klang-69.webp" },
  { id: 67, category: "repair", title: "Mitsubishi Compressor Replacement Shah Alam", alt: "Mitsubishi aircond compressor swapped out for a new unit in Shah Alam", src: "/hero/mitsubishi-aircond-compressor-replacement-shah-alam-58.webp" },
  { id: 71, category: "repair", title: "Panasonic Ceiling Cassette Service Klang", alt: "Panasonic ceiling cassette aircond being serviced at a Klang commercial property", src: "/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp" },
  { id: 72, category: "repair", title: "Panasonic Compressor Replacement Puchong", alt: "Panasonic aircond outdoor compressor replaced with new unit in Puchong", src: "/hero/panasonic-aircond-compressor-replacement-puchong-46.webp" },
  { id: 73, category: "repair", title: "Panasonic Dismantle & Relocation Shah Alam", alt: "Panasonic aircond dismantled for office relocation in Shah Alam", src: "/hero/panasonic-aircond-dismantle-relocation-shah-alam-57.webp" },
  { id: 74, category: "repair", title: "Panasonic PCB Board Repair Subang Jaya", alt: "Panasonic aircond PCB inspected for burnt components and repaired in Subang Jaya", src: "/hero/panasonic-aircond-pcb-board-repair-subang-jaya-35.webp" },
  { id: 75, category: "repair", title: "Panasonic Water Leak Fix PJ", alt: "Panasonic aircond water leak repaired — drain pipe unblocked in Petaling Jaya", src: "/hero/panasonic-aircond-water-leaking-fix-petaling-jaya-24.webp" },
  { id: 76, category: "repair", title: "Samsung Basic Servicing Puchong", alt: "Samsung aircond filter cleaned and unit inspected during routine servicing in Puchong", src: "/hero/samsung-aircond-basic-servicing-puchong-41.webp" },
  { id: 77, category: "repair", title: "Samsung Ceiling Cassette Service KL", alt: "Samsung ceiling cassette unit receiving filter change and coil cleaning in Kuala Lumpur", src: "/hero/samsung-aircond-ceiling-cassette-service-kuala-lumpur-8.webp" },
  { id: 78, category: "repair", title: "Samsung Gas Top-Up R32 Klang", alt: "Samsung R32 inverter aircond gas level checked and topped up in Klang", src: "/hero/samsung-aircond-gas-topup-r32-klang-63.webp" },
  { id: 80, category: "repair", title: "Samsung Gas Top-Up R410A Shah Alam", alt: "Samsung aircond R410A refrigerant refilled with proper pressure balancing in Shah Alam", src: "/hero/samsung-aircond-gas-topup-r410a-shah-alam-52.webp" },
  { id: 81, category: "repair", title: "Samsung Troubleshooting Repair Subang Jaya", alt: "Samsung aircond error code diagnosed and repaired at a Subang Jaya home", src: "/hero/samsung-aircond-troubleshooting-repair-subang-jaya-30.webp" },
  { id: 82, category: "repair", title: "TCL Basic Servicing Klang", alt: "TCL aircond unit cleaned and checked during standard maintenance visit in Klang", src: "/hero/tcl-aircond-basic-servicing-klang-65.webp" },
  { id: 83, category: "repair", title: "TCL Ceiling Cassette Service Subang Jaya", alt: "TCL ceiling cassette aircond being deep-serviced in a Subang Jaya office", src: "/hero/tcl-aircond-ceiling-cassette-service-subang-jaya-32.webp" },
  { id: 84, category: "repair", title: "TCL Compressor Replacement KL", alt: "TCL aircond outdoor compressor unit replaced with new one in Kuala Lumpur", src: "/hero/tcl-aircond-compressor-replacement-kuala-lumpur-10.webp" },
  { id: 86, category: "repair", title: "TCL Dismantle & Relocation PJ", alt: "TCL aircond unit carefully removed for customer relocation in Petaling Jaya", src: "/hero/tcl-aircond-dismantle-relocation-petaling-jaya-21.webp" },
  { id: 89, category: "repair", title: "TCL Troubleshooting Repair Shah Alam", alt: "TCL aircond being diagnosed for cooling issues — capacitor tested in Shah Alam", src: "/hero/tcl-aircond-troubleshooting-repair-shah-alam-54.webp" },
  { id: 90, category: "repair", title: "York Compressor Replacement Klang", alt: "York aircond compressor swapped out and new unit installed in Klang", src: "/hero/york-aircond-compressor-replacement-klang-70.webp" },
  { id: 91, category: "repair", title: "York Gas Top-Up R32 Petaling Jaya", alt: "York R32 inverter aircond refrigerant level restored during service in Petaling Jaya", src: "/hero/york-aircond-gas-topup-r32-petaling-jaya-15.webp" },
  { id: 92, category: "repair", title: "York Gas Top-Up R410A KL", alt: "York aircond R410A gas top-up performed with leak detection check in Kuala Lumpur", src: "/hero/york-aircond-gas-topup-r410a-kuala-lumpur-4.webp" },
  { id: 93, category: "repair", title: "York PCB Board Repair Shah Alam", alt: "York aircond PCB board inspected and faulty component replaced in Shah Alam", src: "/hero/york-aircond-pcb-board-repair-shah-alam-59.webp" },
  { id: 94, category: "repair", title: "York Water Leak Fix Puchong", alt: "York aircond water leak issue resolved — drain pipe cleared and sealed in Puchong", src: "/hero/york-aircond-water-leaking-fix-puchong-48.webp" },
  // Additional missing items from original
  { id: 95, category: "repair", title: "PCB Board Replacement Klang Valley", alt: "Aircond PCB board replacement in progress — old board removed and new one wired in Klang Valley", src: "/hero/aircond-pcb-board-replacement-2-klang-valley.webp" },
  { id: 96, category: "installation", title: "TCL New Installation Puchong", alt: "TCL aircond unit being installed with bracket and copper piping at a Puchong home", src: "/hero/tcl-aircond-new-installation-puchong-43.webp" },
  { id: 97, category: "overhaul", title: "LG Chemical Overhaul Klang", alt: "LG aircond indoor unit dismantled for full chemical overhaul — blower wheel and coil deep-cleaned in Klang", src: "/hero/lg-aircond-chemical-overhaul-klang-62.webp" },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "installation", label: "Installation" },
  { key: "chemical-wash", label: "Chemical Wash" },
  { key: "overhaul", label: "Overhaul" },
  { key: "repair", label: "Repair & Service" },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showBefore, setShowBefore] = useState(false);

  const filtered =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((g) => g.category === activeCategory);

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

  return (
    <main>
      {/* Header */}
      <div className="bg-gradient-to-b from-sky-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Real Work Gallery
            </h1>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
              93 genuine project photos — no stock images. Every photo is real work completed by our HVAC technicians across Klang Valley.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold px-4 py-2 rounded-full">
                🏙️ KL &amp; Selangor
              </span>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full">
                ✅ 100% Genuine Company Photos
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-slate-100 sticky top-[80px] z-30 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
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
            <p className="text-center text-slate-400 py-20">No photos in this category yet.</p>
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
                        loading={index < 6 ? "eager" : "lazy"}
                      />
                      {item.before && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Before / After
                        </span>
                      )}
                      <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {CATEGORIES.find((c) => c.key === item.category)?.label}
                      </span>
                      <div className="absolute inset-0 bg-sky-900/0 group-hover:bg-sky-900/20 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                          View Full
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-black text-slate-900 text-sm leading-snug">{item.title}</p>
                      {item.desc && (
                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 font-medium">{item.desc}</p>
                      )}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {/* CTA */}
          <Reveal>
            <div className="mt-16 bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center">
              <p className="text-2xl mb-2">📸</p>
              <h3 className="font-black text-slate-900 mb-2">Want to see more?</h3>
              <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                We update our gallery regularly with new project photos. Send us a WhatsApp to discuss your aircon needs.
              </p>
              <a
                href={waLink("Hi KL Renovator, I want to book an aircon service after viewing your gallery.")}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white font-black uppercase tracking-widest text-xs px-7 py-4 rounded-xl shadow-md transition-all"
                style={{ background: "#25D366" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1ebe5d"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#25D366"; }}
              >
                <FaWhatsapp className="h-4 w-4" />
                Book Your Service Now
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
              aria-label="Close"
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
                  After
                </button>
                <button
                  onClick={() => setShowBefore(true)}
                  className={`px-3 py-1.5 text-xs font-black uppercase transition-colors ${showBefore ? "bg-amber-500 text-white" : "text-white/70 hover:text-white"}`}
                >
                  Before
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
                  {CATEGORIES.find((c) => c.key === currentItem.category)?.label}
                </span>
                <h3 className="font-black text-slate-900 mt-2">{currentItem.title}</h3>
                {currentItem.desc && (
                  <p className="text-sm text-slate-500 mt-1">{currentItem.desc}</p>
                )}
              </div>
              <a
                href={waLink(`Hi KL Renovator, I saw your gallery photo: "${currentItem.title}" and want to book a similar service.`)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 text-white font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition-all"
                style={{ background: "#25D366" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1ebe5d"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#25D366"; }}
              >
                <FaWhatsapp className="h-4 w-4" />
                Book This
              </a>
            </div>
          </div>

          {/* Prev/Next */}
          {filtered.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                aria-label="Previous"
              >
                <FaChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                aria-label="Next"
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
