import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";

const LAST_UPDATED = "06 Ogos 2026";

export const metadata: Metadata = {
  title: "Dasar Privasi | KL Renovator",
  description:
    padMetaDescription("Bagaimana KL Renovator (Multicore Dynamics Resources) mengumpul, menggunakan, menyimpan dan melindungi data peribadi anda di bawah Akta Perlindungan Data Peribadi (APDP) 2010 Malaysia."),
  alternates: buildTrilingualHreflang("/privacy-policy", "ms"),
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-100 py-7 last:border-0">
      <h2 className="mb-3 text-lg font-black text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPageMS() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-sky-600">Undang-Undang</p>
      <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
        Dasar Privasi
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        Terakhir dikemas kini: {LAST_UPDATED} · Dikeluarkan di bawah Akta Perlindungan Data Peribadi 2010 (Malaysia)
      </p>

      <div className="mt-8">
        <Section title="1. Siapa Kami">
          <p>
            Laman web ini dikendalikan oleh <strong>{siteConfig.legalName}</strong>, berdagang sebagai{" "}
            <strong>{siteConfig.name}</strong> (No. Pendaftaran SSM {siteConfig.ssmFull}), sebuah syarikat pemasangan dan servis penyaman udara yang beroperasi di Kuala Lumpur dan Selangor, Malaysia. Dalam dasar ini, &ldquo;kami&rdquo; merujuk kepada syarikat tersebut.
          </p>
        </Section>

        <Section title="2. Data Peribadi yang Kami Kumpul">
          <p>Kami hanya mengumpul apa yang diperlukan untuk memberi sebut harga dan melaksanakan servis yang anda minta:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong>Butiran tempahan dan pertanyaan</strong> — nama, nombor telefon, alamat servis, perkhidmatan yang diminta, jenis aircond, saiz serta kuantiti, dan tarikh/masa pilihan temujanji anda.
            </li>
            <li>
              <strong>Butiran pemasangan</strong> — jenis hartanah, aras tingkat, anggaran panjang paip kuprum, dan status pemilikan unit. Ini menentukan sebut harga dan sama ada kebenaran pengurusan bangunan diperlukan.
            </li>
            <li>
              <strong>Mesej yang dihantar kepada kami</strong> — kandungan mesej WhatsApp, panggilan dan emel yang anda mulakan.
            </li>
            <li>
              <strong>Data teknikal dan penggunaan</strong> — alamat IP, jenis pelayar, halaman yang dilawati dan laman rujukan, dikumpul melalui Google Analytics 4 dan Microsoft Clarity.
            </li>
          </ul>
          <p>
            Kami tidak mengumpul butiran kad pembayaran di laman web ini, dan kami tidak sengaja mengumpul data daripada kanak-kanak.
          </p>
        </Section>

        <Section title="3. Mengapa Kami Menggunakannya">
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Untuk menyediakan sebut harga dan mengesahkan harga sebelum kerja bermula.</li>
            <li>Untuk menjadualkan juruteknik dan menghubungi anda mengenai temujanji anda.</li>
            <li>Untuk menunaikan waranti kerja bagi servis yang telah kami laksanakan.</li>
            <li>Untuk mematuhi kewajipan penyimpanan rekod perakaunan, percukaian dan undang-undang.</li>
            <li>Untuk memahami halaman dan perkhidmatan yang berguna kepada pelawat secara agregat.</li>
          </ul>
          <p>
            Kami tidak menjual data peribadi anda, dan kami tidak berkongsinya dengan pihak ketiga untuk tujuan pemasaran mereka.
          </p>
        </Section>

        <Section title="4. Pihak yang Kami Dedahkan Data">
          <p>
            Data anda hanya dikongsi dengan pembekal perkhidmatan yang membantu kami mengendalikan perniagaan, dan hanya setakat yang mereka perlukan:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong>Supabase</strong> — pengehosan pangkalan data selamat untuk rekod tempahan.
            </li>
            <li>
              <strong>Google (Kalendar &amp; Analytics)</strong> — penjadualan temujanji juruteknik dan analitik web terkumpul.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — analitik penggunaan laman web.
            </li>
            <li>
              <strong>Vercel</strong> — pengehosan aplikasi dan laman web.
            </li>
            <li>
              <strong>Juruteknik kami</strong> — nama, nombor telefon dan alamat yang diperlukan untuk hadir ke lokasi anda.
            </li>
          </ul>
        </Section>

        <Section title="5. Tempoh Penyimpanan Data">
          <p>
            Rekod tempahan disimpan sehingga tujuh tahun untuk memenuhi keperluan undang-undang cukai dan perakaunan Malaysia serta menyokong tuntutan waranti. Data analitik disimpan mengikut tempoh piawai pembekal analitik. Pertanyaan yang tidak menjadi tempahan akan dipadamkan apabila tidak lagi diperlukan.
          </p>
        </Section>

        <Section title="6. Perlindungan Data">
          <p>
            Data dihantar melalui sambungan selamat HTTPS, disimpan dengan kawalan akses yang ketat, dan panel pentadbir kami dilindungi oleh pengesahan bahagian pelayan. Tiada sistem yang boleh dijamin 100% selamat, namun kami mengambil langkah teknikal dan organisasi yang sewajarnya untuk melindungi maklumat anda.
          </p>
        </Section>

        <Section title="7. Hak Anda di Bawah APDP 2010">
          <p>Anda mempunyai hak untuk:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Memohon akses kepada data peribadi yang kami simpan tentang anda.</li>
            <li>Memohon pembetulan data yang tidak tepat, tidak lengkap atau lapuk.</li>
            <li>Menarik balik kebenaran untuk pemprosesan selanjutnya.</li>
            <li>Memohon pemadaman data sekiranya kami tidak terikat secara undang-undang untuk menyimpannya.</li>
          </ul>
        </Section>

        <Section title="8. Kuki dan Analitik">
          <p>
            Kami menggunakan Google Analytics 4 dan Microsoft Clarity untuk memahami penggunaan laman web. Anda boleh menyahaktifkan kuki dalam tetapan pelayar anda pada bila-bila masa. Laman web akan terus berfungsi seperti biasa.
          </p>
        </Section>

        <Section title="9. Hubungi Kami">
          <p>
            Untuk sebarang pertanyaan tentang dasar ini atau data peribadi anda, sila hubungi{" "}
            <strong>{siteConfig.legalName}</strong>:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              Emel:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-sky-600 underline"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              Telefon / WhatsApp:{" "}
              <a href={`tel:${siteConfig.phone}`} className="font-semibold text-sky-600 underline">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>Alamat: {siteConfig.address}</li>
          </ul>
        </Section>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-sm text-slate-600">
          Ada soalan mengenai tempahan servis?{" "}
          <NextLink href="/ms/contact" className="font-black text-sky-600 hover:text-sky-800">
            Hubungi kami
          </NextLink>
          .
        </p>
      </div>
    </div>
  );
}
