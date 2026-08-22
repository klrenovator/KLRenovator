import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Terma Perkhidmatan — padanan Bahasa Malaysia untuk /terms-of-service (Part 4).

const LAST_UPDATED = "22 Ogos 2026";

export const metadata: Metadata = {
  title: "Terma Perkhidmatan | KL Renovator",
  description:
    padMetaDescription("Terma perkhidmatan KL Renovator (Multicore Dynamics Resources): sebut harga, bayaran, waranti kerja 1 bulan, pembatalan dan akses tapak untuk servis aircond di KL & Selangor."),
  openGraph: {
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp",
      width: 1200,
      height: 630,
      alt: "Terma perkhidmatan KL Renovator",
    }],
  },
  alternates: buildTrilingualHreflang("/terms-of-service", "ms"),
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-100 py-7 last:border-0">
      <BreadcrumbSchema items={[
        { name: "Laman Utama", url: "https://www.klrenovator.com/" },
        { name: "Terma Perkhidmatan", url: "https://www.klrenovator.com/ms/terms-of-service" },
      ]} />
      <h2 className="mb-3 text-lg font-black text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function TermsOfServicePageMS() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-sky-600">Maklumat Undang-Undang</p>
      <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
        Terma Perkhidmatan
      </h1>
      <p className="mt-3 text-sm text-slate-500">Kemas kini terakhir: {LAST_UPDATED}</p>

      <div className="mt-8 max-w-xl">
        <PrimaryJobPhoto
          seed="https://www.klrenovator.com/ms/terms-of-service"
          pageUrl="https://www.klrenovator.com/ms/terms-of-service"
          title="Terma Perkhidmatan KL Renovator"
          locale="ms"
          hints={["installation"]}
          sizes="(min-width: 1024px) 576px, (min-width: 640px) 80vw, 100vw"
        />
      </div>
      <div className="mt-8">
        <Section title="1. Siapa kami">
          <p>
            Terma ini terpakai bagi perkhidmatan pemasangan, servis, pembaikan aircond dan
            perkhidmatan berkaitan oleh <strong>{siteConfig.legalName}</strong>, beroperasi
            sebagai <strong>{siteConfig.name}</strong> (pendaftaran SSM {siteConfig.ssmFull}),
            di Kuala Lumpur dan Selangor, Malaysia. Dengan mengesahkan tempahan, anda menerima
            terma ini.
          </p>
        </Section>

        <Section title="2. Sebut harga dan harga">
          <p>
            Harga yang diterbitkan di laman web ini (contohnya servis asas dari RM 99, cuci
            kimia tekanan dari RM 120 dan pemasangan unit dinding dari RM 199) adalah harga
            permulaan. Harga akhir bergantung pada jenis unit, saiz HP, larian paip dan keadaan
            tapak. Setiap harga disahkan dengan anda — melalui WhatsApp atau di tapak — sebelum
            sebarang kerja dimulakan.
          </p>
          <p>
            Jika bahan tambahan diperlukan (contohnya paip tembaga melebihi 7 kaki yang
            disertakan, pada RM 17–27/kaki bergantung pada HP), kos tambahan diukur, disebut
            harga dan diluluskan oleh anda di tapak sebelum kerja pemasangan bermula.
          </p>
        </Section>

        <Section title="3. Tempahan janji temu">
          <p>
            Tempahan melalui laman web ini adalah permintaan slot janji temu. Tempahan hanya
            disahkan apabila kami membalas mengesahkan tarikh dan masa. Ketersediaan hari sama
            bergantung pada laluan juruteknik dan tidak dijamin. Kami akan memberitahu anda
            seawal mungkin jika slot perlu dijadualkan semula.
          </p>
        </Section>

        <Section title="4. Bayaran">
          <p>
            Kami menerima tunai, pemindahan bank, DuitNow dan e-dompet. Bayaran kad kredit boleh
            diatur untuk kerja besar apabila dipersetujui lebih awal. Melainkan dipersetujui
            sebaliknya untuk projek besar, bayaran dikutip selepas kerja selesai dan anda telah
            mengesahkan unit berfungsi — tiada bayaran pendahuluan diperlukan untuk servis
            standard.
          </p>
        </Section>

        <Section title="5. Waranti kerja">
          <p>
            Kerja servis, pembaikan dan pemasangan yang kami laksanakan dilindungi{" "}
            <strong>waranti kerja 1 bulan</strong> dari tarikh siap. Jika masalah yang diliputi
            waranti ini berlaku dalam tempoh tersebut, hubungi kami melalui WhatsApp di{" "}
            {siteConfig.phoneDisplay} dan kami akan kembali untuk memperbetulkannya. Waranti ini
            meliputi kerja kraf sahaja; ia tidak meliputi kecacatan pengeluar, kerosakan bahagian
            yang tidak berkaitan dengan kerja kami, kerosakan fizikal selepas serahan, atau
            kerosakan yang disebabkan kerja pihak lain.
          </p>
        </Section>

        <Section title="6. Pembatalan dan penjadualan semula">
          <p>
            Anda boleh membatalkan atau menjadualkan semula tempahan yang disahkan tanpa caj
            dengan menghubungi kami melalui WhatsApp seawal mungkin sebelum masa yang ditetapkan.
            Jika juruteknik telah bergerak ke alamat anda dan kerja dibatalkan ketika ketibaan,
            caj perjalanan mungkin dikenakan. Ketidakhadiran berulang mungkin memerlukan
            pengesahan awal untuk tempahan akan datang.
          </p>
        </Section>

        <Section title="7. Akses tapak, keselamatan dan peraturan bangunan">
          <p>
            Anda bertanggungjawab menyediakan akses yang selamat dan sah kepada unit yang akan
            diservis, termasuk sebarang kebenaran, deposit atau tempahan lif servis yang
            diperlukan oleh pengurusan bangunan untuk kerja bangunan tinggi. Juruteknik kami
            mematuhi prosedur keselamatan dan akses setiap bangunan. Kami tidak bertanggungjawab
            atas kelewatan yang disebabkan kebenaran bangunan yang tidak lengkap, kawasan
            berkunci, akses berbahaya atau bekalan elektrik yang tidak sesuai.
          </p>
        </Section>

        <Section title="8. Unit lama dan keadaan sedia ada">
          <p>
            Banyak unit yang kami servis di KL dan Selangor berusia 10 tahun ke atas. Sekiranya
            servis atau pembongkaran unit tua berisiko mendedahkan kerosakan sedia ada
            (contohnya kapasitor lemah, paip rapuh atau dulang longkang berkarat), kami akan
            menandakan risiko tersebut dan memberi sebut harga sebelum kerja tambahan. Kami
            tidak bertanggungjawab atas kecacatan sedia ada yang bukan disebabkan kerja kami.
          </p>
        </Section>

        <Section title="9. Liabiliti">
          <p>
            Liabiliti kami atas sebarang tuntutan yang timbul daripada perkhidmatan adalah
            terhad kepada jumlah yang dibayar bagi kerja berkenaan. Tiada apa-apa dalam terma ini
            mengecualikan liabiliti yang tidak boleh dikecualikan di bawah undang-undang
            Malaysia.
          </p>
        </Section>

        <Section title="10. Undang-undang yang terpakai">
          <p>
            Terma ini ditadbir oleh undang-undang Malaysia. Sebarang pertikaian yang timbul
            daripadanya tertakluk kepada bidang kuasa mahkamah Malaysia.
          </p>
        </Section>

        <Section title="11. Hubungi">
          <p>
            Soalan mengenai terma ini: WhatsApp {siteConfig.phoneDisplay} atau e-mel{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-sky-700 underline">
              {siteConfig.email}
            </a>
            . Lihat juga{" "}
            <NextLink href="/ms/privacy-policy" className="font-semibold text-sky-700 underline">
              Dasar Privasi
            </NextLink>{" "}
            kami.
          </p>
        </Section>
      </div>
    </div>
  );
}
