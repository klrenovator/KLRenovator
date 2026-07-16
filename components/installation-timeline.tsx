"use client";

import { useState } from "react";
import { FaWhatsapp, FaTruck, FaSearchLocation, FaTools, FaWind, FaPlayCircle, FaClipboardCheck } from "react-icons/fa";
import { Reveal } from "@/components/reveal";
import { waLink, rfqMsg } from "@/lib/whatsapp";

type Lang = "en" | "ms" | "zh";

interface TimelineStep {
  icon: React.ComponentType<{ className?: string }>;
  number: number;
  duration: string;
  title: string;
  description: string;
  details: string[];
}

const TIMELINE: Record<Lang, { eyebrow: string; title: string[]; desc: string; steps: TimelineStep[]; ctaText: string }> = {
  en: {
    eyebrow: "Our Process",
    title: ["Installation ", "Timeline"],
    desc: "From WhatsApp booking to handover — here is exactly what happens at every step of your aircond installation, so you know what to expect.",
    steps: [
      {
        icon: FaWhatsapp,
        number: 1,
        duration: "5–10 min",
        title: "WhatsApp Booking",
        description: "Send us your unit type, HP size, brand, and address. We confirm pricing and availability within 30 minutes.",
        details: [
          "Transparent per-HP pricing confirmed upfront — no surprises",
          "Same-day slots available for bookings before 11 AM",
          "We ask about unit position, floor level, and any access restrictions",
        ],
      },
      {
        icon: FaTruck,
        number: 2,
        duration: "30–60 min",
        title: "Technician Dispatch",
        description: "A qualified installation technician is dispatched to your location with all required materials and tools.",
        details: [
          "Technician carries Type L copper pipe, Armaflex insulation, brackets, and wiring",
          "GPS-tracked arrival — you receive an ETA via WhatsApp",
          "Fully equipped van: vacuum pump, nitrogen tank, flare tools, manifold gauge set",
        ],
      },
      {
        icon: FaSearchLocation,
        number: 3,
        duration: "15–20 min",
        title: "Site Survey & Wall Assessment",
        description: "Technician inspects the planned installation spot, checks wall strength, electrical circuit capacity, drainage path, and outdoor unit position.",
        details: [
          "Wall load-bearing check — ensures bracket can hold unit weight safely",
          "Electrical circuit capacity verified — dedicated MCB if needed",
          "Drainage fall gradient assessed to prevent water pooling",
          "Outdoor unit position evaluated for airflow, accessibility, and neighbour considerations",
        ],
      },
      {
        icon: FaTools,
        number: 4,
        duration: "1.5–2.5 hrs",
        title: "Installation & Piping",
        description: "Indoor unit bracket mounted, copper piping cut and flared to correct diameter, wiring run through conduit, drain pipe installed with correct gradient.",
        details: [
          "Copper pipe diameter matched to unit HP — not one-size-fits-all",
          "Armaflex insulation (9mm–13mm) on both liquid and gas lines",
          "Wiring through proper PVC conduit with dedicated circuit where required",
          "PVC drain pipe with minimum 1:100 gradient to prevent backflow",
          "Outdoor unit bracket with rubber vibration pads",
        ],
      },
      {
        icon: FaWind,
        number: 5,
        duration: "20–30 min",
        title: "Vacuum Evacuation & Leak Test",
        description: "Two-stage vacuum pump evacuation removes all moisture and air from refrigerant lines. Nitrogen pressure test confirms zero leaks.",
        details: [
          "Minimum 15–20 minutes vacuum evacuation — never skipped",
          "Removes moisture that causes compressor failure and ice buildup",
          "Nitrogen pressure test at 150+ PSI held for 5 minutes to verify seal integrity",
          "Micron gauge reading confirms vacuum level below 500 microns",
        ],
      },
      {
        icon: FaPlayCircle,
        number: 6,
        duration: "15–20 min",
        title: "Commissioning Run",
        description: "Unit powered on and run through full cooling cycle. Supply air temperature, airflow, thermostat response, and fan speeds all tested.",
        details: [
          "Delta-T test: supply vs return air temperature differential measured",
          "All fan speeds tested — low, medium, high, and auto",
          "Thermostat calibration verified against actual room temperature",
          "Drainage flow confirmed — water exits cleanly through drain pipe",
        ],
      },
      {
        icon: FaClipboardCheck,
        number: 7,
        duration: "10–15 min",
        title: "Handover & Warranty Checklist",
        description: "Written job card signed with all installation details. 1-month workmanship warranty activated. Remote control demonstration and care tips shared.",
        details: [
          "Job card records: unit model, serial number, gas type, pipe length, installation date",
          "1-month workmanship warranty — if our work causes any issue, we return free",
          "3-month parts warranty on all supplied materials",
          "Remote control demo, filter cleaning schedule, and maintenance tips",
          "Manufacturer warranty protection preserved — we follow all brand guidelines",
        ],
      },
    ],
    ctaText: "Book Your Installation",
  },
  ms: {
    eyebrow: "Proses Kami",
    title: ["Garis Masa ", "Pemasangan"],
    desc: "Dari tempahan WhatsApp hingga serahan — inilah yang berlaku pada setiap langkah pemasangan aircond anda, supaya anda tahu apa yang dijangkakan.",
    steps: [
      {
        icon: FaWhatsapp,
        number: 1,
        duration: "5–10 min",
        title: "Tempahan WhatsApp",
        description: "Hantar jenis unit, saiz HP, jenama, dan alamat anda. Kami mengesahkan harga dan ketersediaan dalam masa 30 minit.",
        details: [
          "Harga telus per-HP disahkan awal — tiada kejutan",
          "Slot hari sama tersedia untuk tempahan sebelum 11 pagi",
          "Kami bertanya tentang posisi unit, tingkat, dan sebarang sekatan akses",
        ],
      },
      {
        icon: FaTruck,
        number: 2,
        duration: "30–60 min",
        title: "Penghantaran Juruteknik",
        description: "Juruteknik pemasangan berkelayakan dihantar ke lokasi anda dengan semua bahan dan alatan yang diperlukan.",
        details: [
          "Juruteknik membawa paip tembaga Jenis L, penebat Armaflex, pendakap, dan pendawaian",
          "Ketibaan dijejaki GPS — anda menerima ETA melalui WhatsApp",
          "Van dilengkapi sepenuhnya: pam vakum, tangki nitrogen, alat flare, set tolok manifold",
        ],
      },
      {
        icon: FaSearchLocation,
        number: 3,
        duration: "15–20 min",
        title: "Tinjauan Tapak & Penilaian Dinding",
        description: "Juruteknik memeriksa lokasi pemasangan yang dirancang, memeriksa kekuatan dinding, kapasiti litar elektrik, laluan saliran, dan posisi unit luar.",
        details: [
          "Pemeriksaan beban dinding — memastikan pendakap boleh menahan berat unit dengan selamat",
          "Kapasiti litar elektrik disahkan — MCB khusus jika diperlukan",
          "Kecerunan saliran dinilai untuk mengelakkan genangan air",
          "Posisi unit luar dinilai untuk aliran udara, kebolehcapaian, dan pertimbangan jiran",
        ],
      },
      {
        icon: FaTools,
        number: 4,
        duration: "1.5–2.5 jam",
        title: "Pemasangan & Paip",
        description: "Pendakap unit dalaman dipasang, paip tembaga dipotong dan diflare ke diameter yang betul, pendawaian melalui konduit, paip saliran dipasang dengan kecerunan betul.",
        details: [
          "Diameter paip tembaga dipadankan dengan HP unit — bukan satu saiz untuk semua",
          "Penebat Armaflex (9mm–13mm) pada kedua-dua saluran cecair dan gas",
          "Pendawaian melalui konduit PVC dengan litar khusus jika diperlukan",
          "Paip saliran PVC dengan kecerunan minimum 1:100 untuk mengelakkan aliran balik",
          "Pendakap unit luar dengan pad getah anti-getaran",
        ],
      },
      {
        icon: FaWind,
        number: 5,
        duration: "20–30 min",
        title: "Evakuasi Vakum & Ujian Kebocoran",
        description: "Evakuasi pam vakum dua peringkat membuang semua kelembapan dan udara dari saluran penyejuk. Ujian tekanan nitrogen mengesahkan tiada kebocoran.",
        details: [
          "Minimum 15–20 minit evakuasi vakum — tidak pernah dilangkau",
          "Membuang kelembapan yang menyebabkan kegagalan pemampat dan pembentukan ais",
          "Ujian tekanan nitrogen pada 150+ PSI ditahan 5 minit untuk mengesahkan integriti meterai",
          "Bacaan tolok mikron mengesahkan tahap vakum di bawah 500 mikron",
        ],
      },
      {
        icon: FaPlayCircle,
        number: 6,
        duration: "15–20 min",
        title: "Larian Pentauliahan",
        description: "Unit dihidupkan dan dijalankan melalui kitaran penyejukan penuh. Suhu udara bekalan, aliran udara, tindak balas termostat, dan kelajuan kipas semua diuji.",
        details: [
          "Ujian Delta-T: perbezaan suhu udara bekalan vs udara pulang diukur",
          "Semua kelajuan kipas diuji — rendah, sederhana, tinggi, dan auto",
          "Penentukuran termostat disahkan terhadap suhu bilik sebenar",
          "Aliran saliran disahkan — air keluar dengan bersih melalui paip saliran",
        ],
      },
      {
        icon: FaClipboardCheck,
        number: 7,
        duration: "10–15 min",
        title: "Serahan & Senarai Semak Waranti",
        description: "Kad kerja bertulis ditandatangani dengan semua butiran pemasangan. Waranti kerja 1 bulan diaktifkan. Demonstrasi alat kawalan jauh dan petua penjagaan dikongsi.",
        details: [
          "Rekod kad kerja: model unit, nombor siri, jenis gas, panjang paip, tarikh pemasangan",
          "Waranti kerja 1 bulan — jika kerja kami menyebabkan sebarang masalah, kami kembali percuma",
          "Waranti alat ganti 3 bulan untuk semua bahan yang dibekalkan",
          "Demo alat kawalan jauh, jadual pembersihan penapis, dan petua penyelenggaraan",
          "Perlindungan waranti pengeluar dipelihara — kami mengikut semua garis panduan jenama",
        ],
      },
    ],
    ctaText: "Tempah Pemasangan Anda",
  },
  zh: {
    eyebrow: "我们的流程",
    title: ["安装", "时间线"],
    desc: "从 WhatsApp 预约到交付——以下是您冷气安装每个步骤的具体内容，让您清楚了解整个过程。",
    steps: [
      {
        icon: FaWhatsapp,
        number: 1,
        duration: "5–10 分钟",
        title: "WhatsApp 预约",
        description: "发送您的机型、匹数、品牌和地址。我们在 30 分钟内确认价格和可用时间。",
        details: [
          "按匹数透明报价——没有意外收费",
          "上午 11 点前预约可当天安装",
          "我们会询问安装位置、楼层及任何通道限制",
        ],
      },
      {
        icon: FaTruck,
        number: 2,
        duration: "30–60 分钟",
        title: "技术员派遣",
        description: "合格安装技术员携带所有必需材料和工具前往您的地点。",
        details: [
          "技术员携带 L 型铜管、Armaflex 保温棉、支架及电线",
          "GPS 追踪到达——您将通过 WhatsApp 收到预计到达时间",
          "装备齐全的货车：真空泵、氮气罐、扩口工具、歧管压力表组",
        ],
      },
      {
        icon: FaSearchLocation,
        number: 3,
        duration: "15–20 分钟",
        title: "现场勘查与墙体评估",
        description: "技术员检查计划安装位置，评估墙体强度、电路容量、排水路径和室外机位置。",
        details: [
          "墙体承重检查——确保支架能安全承受机组重量",
          "电路容量验证——必要时配备独立断路器",
          "排水坡度评估以防止积水",
          "室外机位置评估通风、可达性及邻居影响",
        ],
      },
      {
        icon: FaTools,
        number: 4,
        duration: "1.5–2.5 小时",
        title: "安装与管道铺设",
        description: "室内机支架安装，铜管按正确直径切割和扩口，电线穿过线管，排水管按正确坡度安装。",
        details: [
          "铜管直径匹配机型匹数——不是一刀切",
          "液管和气管均套 Armaflex 保温棉（9mm–13mm）",
          "电线穿过正规 PVC 线管，必要时配备独立电路",
          "PVC 排水管最低 1:100 坡度以防止回流",
          "室外机支架配橡胶减震垫",
        ],
      },
      {
        icon: FaWind,
        number: 5,
        duration: "20–30 分钟",
        title: "真空抽气与检漏",
        description: "两级真空泵抽除冷媒管路中所有水分和空气。氮气压力测试确认零泄漏。",
        details: [
          "最少 15–20 分钟真空抽气——绝不跳过",
          "去除导致压缩机故障和结冰的水分",
          "150+ PSI 氮气保压 5 分钟验证密封性",
          "微米表读数确认真空度低于 500 微米",
        ],
      },
      {
        icon: FaPlayCircle,
        number: 6,
        duration: "15–20 分钟",
        title: "调试运行",
        description: "开机进行完整制冷循环测试。检测出风温度、风量、温控器响应及所有风速。",
        details: [
          "Delta-T 测试：测量送风与回风温差",
          "测试所有风速——低、中、高及自动",
          "温控器校准与实际室温对照验证",
          "确认排水通畅——水通过排水管顺畅排出",
        ],
      },
      {
        icon: FaClipboardCheck,
        number: 7,
        duration: "10–15 分钟",
        title: "交付与保修清单",
        description: "签署书面工单记录所有安装详情。启动 1 个月工艺保修。遥控器演示和保养贴士分享。",
        details: [
          "工单记录：机型、序列号、冷媒类型、管长、安装日期",
          "1 个月工艺保修——若我们的工程导致任何问题，免费上门",
          "所有供应材料 3 个月零件保修",
          "遥控器演示、滤网清洗计划及保养贴士",
          "保留原厂保修权益——我们遵循所有品牌安装规范",
        ],
      },
    ],
    ctaText: "预约安装",
  },
};

export function InstallationTimeline({ lang }: { lang: Lang }) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const data = TIMELINE[lang];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3 text-center">
            {data.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 text-center uppercase">
            {data.title[0]}<span className="text-sky-500">{data.title[1]}</span>
          </h2>
          <p className="mt-4 text-slate-600 font-medium max-w-2xl mx-auto text-center leading-relaxed">
            {data.desc}
          </p>
        </Reveal>

        {/* Timeline */}
        <div className="mt-14 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-200 via-sky-400 to-sky-200 sm:-translate-x-px" />

          {data.steps.map((step, i) => {
            const Icon = step.icon;
            const isLeft = i % 2 === 0;
            const isOpen = activeStep === i;

            return (
              <Reveal key={i} delay={i * 60}>
                <div className={`relative flex items-start gap-6 mb-12 last:mb-0 sm:gap-10 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Content Card */}
                  <div className={`flex-1 ml-16 sm:ml-0 ${isLeft ? "sm:text-right sm:pr-10" : "sm:text-left sm:pl-10"}`}>
                    <button
                      onClick={() => setActiveStep(isOpen ? null : i)}
                      className="w-full text-left sm:text-inherit group"
                      aria-expanded={isOpen}
                    >
                      <span className="inline-block bg-sky-100 text-sky-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
                        {step.duration}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 font-medium leading-relaxed">
                        {step.description}
                      </p>
                    </button>

                    {/* Expandable Details */}
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[400px] mt-3" : "max-h-0"}`}>
                      <ul className={`space-y-1.5 ${isLeft ? "sm:text-right" : "sm:text-left"}`}>
                        {step.details.map((detail, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-slate-500 font-medium">
                            <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? "bg-sky-600 scale-110" : "bg-white border-2 border-sky-500"}`}>
                      <Icon className={`h-5 w-5 ${isOpen ? "text-white" : "text-sky-600"}`} />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-600 text-white text-[9px] font-black flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block flex-1" />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-14 text-center">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl shadow-lg shadow-emerald-200"
            >
              <FaWhatsapp className="h-5 w-5" />
              {data.ctaText}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
