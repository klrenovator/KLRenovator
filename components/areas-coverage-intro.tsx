/**
 * Coverage-description block for the /areas index pages (issue #69 thin-content
 * fix). The index otherwise renders mostly a link grid, so it reads thin to
 * crawlers. This adds real authored copy describing the coverage footprint and
 * how local dispatch works, in EN/MS/ZH. No review-count claim, no rating.
 */

import { PrimaryJobPhoto } from "@/components/primary-job-photo";

type Locale = "en" | "ms" | "zh";

const COPY: Record<
  Locale,
  { heading: string; lead: string; paras: string[] }
> = {
  en: {
    heading: "Aircond service across Kuala Lumpur & Selangor",
    lead: "KL Renovator covers the whole Klang Valley — from the city centre out to the growing townships on every edge of it. Pick your area below, or read how our coverage works.",
    paras: [
      "Our technicians work daily across Petaling Jaya, Subang Jaya, Shah Alam, Puchong, Cheras, Ampang, Klang, Kepong, Rawang and the neighbourhoods within each. Because we dispatch from within the Klang Valley rather than a single fixed depot, most areas can be reached the same day or the next, and the price is the same published rate wherever you are — basic service from RM 99, chemical wash from RM 120, installation from RM 199.",
      "Each area page below explains what we typically see in that neighbourhood — the mix of high-rise condos, landed homes and shoplots, the common faults we get called for, and the nearest landmarks we work around. If your exact taman or block is not listed, it is almost certainly still covered: WhatsApp us the address and we will confirm the nearest available slot.",
      "Every job, in every area, is quoted from the same transparent price list before work begins and backed by a 1-month workmanship warranty. We service all 20 major aircond brands for servicing, chemical wash, gas top-up, repair and installation.",
    ],
  },
  ms: {
    heading: "Servis aircond di seluruh Kuala Lumpur & Selangor",
    lead: "KL Renovator meliputi seluruh Lembah Klang — dari pusat bandar hingga ke pekan yang sedang membangun di setiap penjurunya. Pilih kawasan anda di bawah, atau baca cara liputan kami berfungsi.",
    paras: [
      "Juruteknik kami bekerja setiap hari di Petaling Jaya, Subang Jaya, Shah Alam, Puchong, Cheras, Ampang, Klang, Kepong, Rawang dan kejiranan dalam setiap satunya. Kerana kami menghantar dari dalam Lembah Klang dan bukan satu depoh tetap, kebanyakan kawasan boleh dicapai pada hari sama atau esok, dan harga adalah kadar terbitan yang sama di mana sahaja anda berada — servis asas dari RM 99, cuci kimia dari RM 120, pemasangan dari RM 199.",
      "Setiap halaman kawasan di bawah menerangkan apa yang biasa kami lihat di kejiranan itu — gabungan kondo pangsapuri tinggi, rumah teres dan kedai, kerosakan biasa yang kami dipanggil, serta mercu tanda terdekat yang kami kerjakan. Jika taman atau blok tepat anda tiada dalam senarai, ia hampir pasti masih diliputi: WhatsApp kami alamatnya dan kami sahkan slot terdekat yang ada.",
      "Setiap kerja, di setiap kawasan, disebut harga dari senarai harga telus yang sama sebelum kerja bermula dan disokong waranti kerja tangan 1 bulan. Kami servis semua 20 jenama aircond utama untuk servis, cuci kimia, tambah gas, pembaikan dan pemasangan.",
    ],
  },
  zh: {
    heading: "覆盖吉隆坡与雪兰莪的冷气服务",
    lead: "KL Renovator 覆盖整个巴生谷——从市中心到周边不断发展的新镇。请在下方选择您的地区，或先了解我们的覆盖方式。",
    paras: [
      "我们的技术员每天在八打灵再也、梳邦再也、莎阿南、蒲种、蕉赖、安邦、巴生、甲洞、万挠及各自的社区施工。由于我们从巴生谷内就近派工，而非单一固定站点，大多数地区都能当天或隔天到达，且无论您身在何处，价格都是同一份公布费率——基础保养 RM 99 起、化学清洗 RM 120 起、安装 RM 199 起。",
      "下方每个地区页面都会说明我们在该社区通常会遇到的情况——高层公寓、有地住宅与店屋的比例、我们常被叫去处理的故障，以及我们施工时参照的邻近地标。如果您具体的花园住宅区或楼座未在列，几乎可以肯定仍在覆盖范围内：请 WhatsApp 告知地址，我们会确认最近的可用时段。",
      "在每个地区的每一项作业，都会在动工前依据同一份透明价目表报价，并享1个月工艺保修。我们为全部20个主要冷气品牌提供保养、化学清洗、加气、维修与安装。",
    ],
  },
};

export function AreasCoverageIntro({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 speakable">{t.heading}</h2>
        <p className="mt-3 text-base leading-relaxed text-slate-700 font-medium speakable">{t.lead}</p>
        <div className="mt-4 space-y-3">
          {t.paras.map((p, i) => (
            <p key={i} className="text-sm sm:text-base leading-relaxed text-slate-600">{p}</p>
          ))}
        </div>
        <div className="mt-8 max-w-2xl">
          <PrimaryJobPhoto
            seed={`areas-index:${locale}`}
            pageUrl={`https://www.klrenovator.com${locale === "en" ? "" : `/${locale}`}/areas`}
            title={t.heading}
            locale={locale}
            hints={["klang-valley"]}
            sizes="(min-width: 1024px) 672px, (min-width: 640px) 80vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
