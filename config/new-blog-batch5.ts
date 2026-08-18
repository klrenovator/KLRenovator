/**
 * New multilingual SEO blogs — Batch 5
 * Blog 5 of 14: Old Aircond Disposal & Responsible Replacement Malaysia
 *
 * Distinct from the existing posts:
 * - `aircond-dismantle-reinstallation-guide-malaysia` (moving-house reuse)
 * - `baiki-vs-tukar-baru-aircond-malaysia` (repair-vs-replace cost rule)
 * - `aircond-lifespan-malaysia` (how long a unit lasts)
 * This post targets the "buang aircond lama / dispose old aircond /
 * tukar aircond baru / 旧冷气报废更换" intent: how to take an end-of-life
 * unit off the wall without venting refrigerant, what KL Renovator
 * actually does with the old indoor and outdoor units, and the published
 * dismantle + new-install path. No invented recycling plant names,
 * disposal fees, DOE licences or unit retail prices.
 *
 * Image notes (existing real job photo used as featured image):
 * - Featured: /hero/aux-aircond-dismantle-relocation-kuala-lumpur-9.webp
 *   (real KL Renovator job photo: Aux outdoor unit being prepared for
 *   dismantle / relocation in Kuala Lumpur; no invented portrait,
 *   landfill scene or recycling-badge claim)
 * - Supporting prompt 1: nameplate close-up showing refrigerant type
 *   (R22 / R410A / R32) on an outdoor casing, no brand logo invented.
 * - Supporting prompt 2: capped copper stubs and isolated isolator after
 *   a pump-down, indoor wall plate still on the wall.
 * - Supporting prompt 3: new wall-mounted indoor unit on a fresh plate
 *   beside the empty outline of the old unit, canvas on the floor.
 * - Supporting prompt 4: clean trilingual decision-flow infographic:
 *   diagnose → repair if under the 50% rule → else dismantle with
 *   pump-down → install new unit from RM 199.
 */

import type { BlogPost } from "./blog-posts";

export const newBlogBatch5: BlogPost[] = [
  {
    slug: "old-aircond-disposal-replacement-malaysia",
    title: "Old Aircond Disposal & Replacement Malaysia",
    titleMS: "Buang & Ganti Aircond Lama di Malaysia",
    titleZH: "马来西亚旧冷气报废与更换指南",
    excerpt:
      "Old aircond ready to go? How KL & Selangor homes dismantle, dispose and replace a unit — pump-down, published prices, no vented gas. Book same-day.",
    excerptMS:
      "Aircond lama nak dibuang? Cara buka, buang dan ganti unit di KL & Selangor — pump-down gas, harga rasmi, tanpa lepaskan refrigerant. Tempah hari sama.",
    excerptZH:
      "旧冷气该报废了？吉隆坡与雪兰莪屋主如何安全拆机、带走旧机并换新。含泵回冷媒、公开价格与当天预约，绝不向空气排放雪种。",
    category: "Installation Guide",
    categoryMS: "Panduan Pemasangan",
    categoryZH: "安装指南",
    tags: [
      "old aircond disposal Malaysia",
      "buang aircond lama",
      "replace old aircond KL",
      "aircond replacement Selangor",
      "dismantle old aircond",
      "KL Renovator",
    ],
    date: "2026-08-18",
    dateDisplay: "August 2026",
    lastReviewed: "2026-08-18",
    readTime: 12,
    relatedService: "Dismantle & Relocation",
    image: "/hero/generic-aircond-dismantle-relocation-ampang-158.webp",
    imageAlt:
      "Aux outdoor aircond unit being prepared for professional dismantle and replacement in Kuala Lumpur",
    faqs: [
      {
        q: "How do I dispose of an old aircond in Malaysia?",
        a: "Do not leave it at the roadside or cut the copper pipes yourself. A technician should pump the refrigerant into the outdoor unit, isolate the power, remove both indoor and outdoor units, and take the old set away. KL Renovator publishes dismantle-only from RM 90 and disposes of the old unit properly after removal.",
      },
      {
        q: "Can I throw an old aircond in the normal rubbish?",
        a: "No. A split unit still holds refrigerant, compressor oil and electrical parts. Cutting the pipes vents the gas and leaves an open circuit. Book a dismantle so the charge is recovered first.",
      },
      {
        q: "Does KL Renovator take the old unit away?",
        a: "Yes. When we dismantle a unit we are replacing, we take the old indoor and outdoor units away and dispose of them properly. Confirm this on WhatsApp when you book so the visit is planned as a replacement, not a keep-the-old-unit job.",
      },
      {
        q: "How much does it cost to remove and replace an old aircond?",
        a: "Dismantle only is from RM 90. A new wall-mounted 1.0–1.5 HP installation is from RM 199 and includes 7ft copper pipe, insulation, electrical wire, drain pipe, vacuum commissioning and a 1-month workmanship warranty. The two jobs are quoted together before work starts.",
      },
      {
        q: "Should I repair my old aircond or replace it?",
        a: "Use the 50% rule in our repair-or-replace guide: if the repair quote is more than half the cost of an equivalent new unit, or the set is over 10 years old, still on R22, or has a failed compressor (RM 800–2,000), replacement is usually the clearer path. Capacitor, drain and small leak jobs are still worth repairing.",
      },
      {
        q: "What happens to the refrigerant when an old unit is removed?",
        a: "On a typical split unit the technician runs a pump-down so the charge is stored in the outdoor condenser before the pipes are opened. The gas is not vented into the room or the street. A top-up is only discussed if the system was already leaking.",
      },
      {
        q: "Can the old copper pipes stay in the wall?",
        a: "The buried length in the old wall is cut at the penetration and left there — it cannot be pulled out intact. A replacement install runs new 7ft copper, insulation, wire and drain at the same opening or a new one. Extra length is charged at the published per-foot rates.",
      },
      {
        q: "Is an R22 aircond worth keeping?",
        a: "R22 top-up is still published at RM 2.50 per PSI, so a healthy R22 unit can be kept running. Replacement becomes the better call when the compressor is noisy, leaks keep returning, or the indoor coil has never been deep-cleaned in years.",
      },
      {
        q: "How long does a same-day replacement take?",
        a: "A wall-mounted swap is typically a half-day job once access is ready: dismantle the old set, mount the new indoor plate and outdoor bracket, run the new line-set, vacuum, commission and test cooling. High-floor condos add lift booking time.",
      },
      {
        q: "Do you replace every aircond brand?",
        a: "Yes. KL Renovator dismantles and replaces the 20 brands listed on this website — including Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL and Isonic — across KL and Selangor.",
      },
    ],
    faqsMS: [
      {
        q: "Bagaimana nak buang aircond lama di Malaysia?",
        a: "Jangan tinggalkan di tepi jalan atau potong paip tembaga sendiri. Juruteknik patut pump-down gas ke unit luar, putuskan kuasa, cabut unit dalam dan luar, kemudian bawa set lama pergi. KL Renovator terbitkan buka sahaja dari RM 90 dan membuang unit lama dengan betul selepas cabutan.",
      },
      {
        q: "Boleh buang aircond lama bersama sampah biasa?",
        a: "Tidak. Split unit masih ada refrigerant, minyak kompressor dan bahagian elektrik. Memotong paip melepaskan gas dan meninggalkan litar terbuka. Tempah buka supaya cas gas dikumpul dahulu.",
      },
      {
        q: "Adakah KL Renovator bawa unit lama pergi?",
        a: "Ya. Apabila kami buka unit yang diganti, kami bawa unit dalam dan luar lama dan membuangnya dengan betul. Sahkan di WhatsApp semasa tempah supaya lawatan dirancang sebagai penggantian, bukan kerja simpan unit lama.",
      },
      {
        q: "Berapa kos cabut dan ganti aircond lama?",
        a: "Buka sahaja dari RM 90. Pemasangan baharu unit dinding 1.0–1.5 HP dari RM 199 termasuk 7 kaki paip tembaga, penebat, wayar, paip longkang, pentauliahan vakum dan waranti kerja 1 bulan. Kedua-dua kerja disebut harga bersama sebelum kerja bermula.",
      },
      {
        q: "Patut baiki aircond lama atau ganti?",
        a: "Guna peraturan 50% dalam panduan baiki atau ganti kami: jika sebut harga baiki lebih daripada separuh kos unit baharu yang setara, atau set berusia lebih 10 tahun, masih R22, atau kompressor dah rosak (RM 800–2,000), ganti biasanya lebih jelas. Kapasitor, longkang dan bocor kecil masih berbaloi dibaiki.",
      },
      {
        q: "Apa jadi kepada gas apabila unit lama dicabut?",
        a: "Pada split unit biasa juruteknik jalankan pump-down supaya cas disimpan dalam kondenser luar sebelum paip dibuka. Gas tidak dilepaskan ke bilik atau jalan. Top-up hanya dibincang jika sistem sudah bocor.",
      },
      {
        q: "Boleh paip tembaga lama tinggal dalam dinding?",
        a: "Bahagian tertanam dalam dinding lama dipotong di titik penembusan dan ditinggalkan — ia tidak boleh ditarik utuh. Pemasangan ganti menjalankan 7 kaki paip tembaga, penebat, wayar dan longkang baharu. Panjang tambahan dicaj pada kadar rasmi seaki.",
      },
      {
        q: "Adakah aircond R22 masih berbaloi disimpan?",
        a: "Top-up R22 masih diterbitkan pada RM 2.50 se-PSI, jadi unit R22 yang sihat masih boleh dijalankan. Penggantian menjadi pilihan lebih baik apabila kompressor bising, bocor berulang, atau gegelung dalam tidak pernah dicuci mendalam selama bertahun.",
      },
      {
        q: "Berapa lama penggantian hari sama mengambil masa?",
        a: "Tukar unit dinding biasanya kerja setengah hari apabila akses sedia: buka set lama, pasang plat dalam dan bracket luar baharu, pasang paip baharu, vakum, tauliah dan uji penyejukan. Kondo tingkat tinggi menambah masa tempahan lif.",
      },
      {
        q: "Adakah anda ganti setiap jenama aircond?",
        a: "Ya. KL Renovator buka dan ganti 20 jenama yang disenaraikan di laman web ini — termasuk Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL dan Isonic — di seluruh KL dan Selangor.",
      },
    ],
    faqsZH: [
      {
        q: "在马来西亚如何处理旧冷气？",
        a: "不要扔在路边，也不要自己剪铜管。应由技师把冷媒泵回室外机、切断电源、拆下室内外机并带走旧机。KL Renovator 公布只拆机从 RM 90 起，拆下后会妥善处理旧机。",
      },
      {
        q: "旧冷气可以当普通垃圾扔掉吗？",
        a: "不可以。分体机里仍有冷媒、压缩机油和电气部件。剪管会把气体排到空气中，并留下开口管路。请预约拆机，先回收冷媒。",
      },
      {
        q: "KL Renovator 会把旧机带走吗？",
        a: "会。我们拆下要更换的机器时，会带走旧的室内外机并妥善处理。预约时请在 WhatsApp 确认，以便按换机而不是保留旧机来安排。",
      },
      {
        q: "拆旧换新要多少钱？",
        a: "只拆机从 RM 90 起。壁挂式 1.0–1.5 HP 新机安装从 RM 199 起，含 7 尺铜管、保温、电线、排水管、抽真空调试和 1 个月工艺保修。两项工作开工前一并报价。",
      },
      {
        q: "旧冷气该修还是该换？",
        a: "参考我们维修或更换指南中的 50% 规则：维修报价超过同等新机一半，或机器超过 10 年、仍用 R22、压缩机已坏（RM 800–2,000），通常换新更清楚。电容、排水和小型泄漏仍值得修。",
      },
      {
        q: "拆旧机时冷媒怎么处理？",
        a: "一般分体机会先做泵送，把冷媒存在室外冷凝器里再开管。气体不会排到房间或街上。只有系统本来就在漏，才另外谈加雪种。",
      },
      {
        q: "旧铜管可以留在墙里吗？",
        a: "埋在旧墙里的那段会在穿墙处切断并留下——无法完整抽出。换机安装会走新的 7 尺铜管、保温、电线和排水。超出部分按已公布的每尺价格收费。",
      },
      {
        q: "R22 旧机还值得留吗？",
        a: "R22 加气仍公布为每 PSI RM 2.50，健康的 R22 机器还可以继续用。压缩机已吵、反复泄漏，或室内蒸发器多年未深度清洗时，换新更合适。",
      },
      {
        q: "当天换机要多久？",
        a: "壁挂式换机在通道准备好后通常半天：拆旧机、装新墙板和室外支架、走新管路、抽真空、调试并测试制冷。高层公寓还要预约电梯。",
      },
      {
        q: "你们更换所有冷气品牌吗？",
        a: "是。KL Renovator 拆卸并更换本网站列出的 20 个品牌——包括 Daikin、Panasonic、Mitsubishi、Acson、York、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL 与 Isonic——覆盖吉隆坡与雪兰莪。",
      },
    ],
    content: `
      <p>An aircond that no longer cools, still runs on R22, or has a compressor quote sitting next to the price of a new install should leave the wall — not sit on a corridor, a balcony or the roadside. This guide is for KL and Selangor homeowners who need the old set taken down, the refrigerant handled, and a replacement commissioned, using only KL Renovator's published prices.</p>
      <div class="summary-block"><strong>Quick answer:</strong> Do not cut the pipes or dump the outdoor unit. A technician pumps the refrigerant into the outdoor condenser, isolates the power, removes both units and takes the old set away. KL Renovator publishes dismantle-only from RM 90 and a new wall-mounted 1.0–1.5 HP installation from RM 199 (7ft copper, insulation, wire, drain, vacuum and a 1-month workmanship warranty). Prices are confirmed in writing before work starts.</div>

      <h2>Disposal is not the same as moving house</h2>
      <p>A <a href="/blog/aircond-dismantle-reinstallation-guide-malaysia">house-move dismantle</a> keeps your working indoor and outdoor units so they can be recommissioned at the new address. Disposal is the opposite job: the set is coming off the wall for the last time. The pump-down still matters — refrigerant should not be vented — but the old units leave with the technician instead of travelling to a new ledge.</p>
      <p>If you are still deciding whether the unit has any life left, start with the <a href="/blog/baiki-vs-tukar-baru-aircond-malaysia">repair or replace cost guide</a> and the <a href="/blog/aircond-lifespan-malaysia">Malaysia lifespan guide</a>. This page assumes that decision is already leaning toward replacement.</p>

      <h2>Why you should not dump or cut an old aircond yourself</h2>
      <ul>
        <li><strong>The circuit is still charged</strong> — cutting copper without a pump-down vents R22, R410A or R32 and lets moisture into the open pipes.</li>
        <li><strong>The outdoor unit is not household rubbish</strong> — it holds compressor oil, a sealed compressor and electrical parts. Leaving it at the gate or in a condo bin is not a disposal plan.</li>
        <li><strong>Live isolators and wall plates stay behind</strong> — power has to be confirmed dead before the indoor unit comes off. A leftover live cable in a plastered wall is a later problem.</li>
        <li><strong>Condo corridors are not storage</strong> — many JMBs in Mont Kiara, Bangsar, Damansara and Petaling Jaya will not allow an outdoor unit to sit in a common area overnight.</li>
      </ul>

      <h2>What a responsible replacement visit actually includes</h2>
      <ol>
        <li><strong>Nameplate and fault check</strong> — brand, HP, refrigerant type and whether anything is still worth repairing (capacitor RM 150–250, leak RM 120, compressor RM 800–2,000).</li>
        <li><strong>Pump-down</strong> — the charge is stored in the outdoor condenser before the pipes are opened.</li>
        <li><strong>Electrical isolation</strong> — isolator or MCB confirmed dead, indoor and outdoor wiring labelled and disconnected.</li>
        <li><strong>Indoor and outdoor removal</strong> — wall plate usually stays; buried copper is cut at the penetration and left in the old wall.</li>
        <li><strong>Take-away of the old set</strong> — both units leave with the technician and are disposed of properly.</li>
        <li><strong>New install</strong> — new indoor plate, outdoor bracket if needed (standard RM 45, heavy-duty RM 70), 7ft copper / insulation / wire / drain, vacuum, commission, cooling test, written job card and 1-month workmanship warranty.</li>
      </ol>
      <p>That last block is a full <a href="/services/installation">new unit installation</a>, not a “hang the box on the old screws” shortcut. If the new site needs extra pipe, an isolator (electrical plug point RM 100) or high-rise access (RM 50–150), it is quoted before drilling.</p>

      <h2>Repair, keep, or replace — published numbers only</h2>
      <table>
        <thead><tr><th>Situation</th><th>Usual path</th><th>Published KL Renovator figure</th></tr></thead>
        <tbody>
          <tr><td>Capacitor, sensor, small leak, blocked drain</td><td>Repair</td><td>Diagnostic RM 88 (waived with repair); capacitor RM 150–250; leak RM 120; basic service from RM 99</td></tr>
          <tr><td>Healthy R22 unit, still cooling</td><td>Keep and service</td><td>R22 top-up RM 2.50/PSI after inspection; chemical wash from RM 120</td></tr>
          <tr><td>Compressor failed, 10+ years, repeated leaks</td><td>Replace</td><td>Compressor replacement RM 800–2,000 vs dismantle from RM 90 + new install from RM 199</td></tr>
          <tr><td>Unit already off the wall, no reinstall</td><td>Dismantle only</td><td>From RM 90 (indoor + outdoor, pump-down, take-away)</td></tr>
        </tbody>
      </table>
      <p>We do not publish a separate “disposal surcharge” or a recycling-plant fee. Take-away of the old set is part of a replacement dismantle. WhatsApp the brand, HP and a photo of the outdoor nameplate for a written quote.</p>

      <h2>Published replacement prices</h2>
      <table>
        <thead><tr><th>Job</th><th>Wall-mounted</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Dismantle only</td><td>From RM 90</td><td>Indoor + outdoor, pump-down, proper take-away</td></tr>
          <tr><td>New install 1.0–1.5 HP</td><td>RM 199</td><td>7ft copper, insulation, wire, drain, vacuum, 1-month workmanship warranty</td></tr>
          <tr><td>New install 2.0 HP</td><td>RM 249</td><td>Same inclusions; extra pipe beyond 7ft at RM 23/ft</td></tr>
          <tr><td>New install 2.5 HP</td><td>RM 279</td><td>Same inclusions</td></tr>
          <tr><td>Ceiling cassette 1.0–1.5 HP</td><td>RM 290</td><td>Old cassette removal quoted on site</td></tr>
          <tr><td>Standard / heavy-duty outdoor bracket</td><td>RM 45 / RM 70</td><td>Only if the old bracket is unsafe or the wrong size</td></tr>
        </tbody>
      </table>
      <p>Use the <a href="/aircond-installation-cost-calculator">installation cost calculator</a> if the new pipe run is longer than 7ft, then confirm the number on WhatsApp. Multi-unit homes (5+ units in one visit) qualify for the 5% instant booking discount; 10+ units qualify for 10%.</p>

      <h2>R22, R410A and R32 on an old nameplate</h2>
      <p>The outdoor sticker tells you which gas is inside. That does not change the dismantle price, but it changes the keep-or-replace conversation. R22 top-up is still listed at RM 2.50/PSI; R410A and R32 are RM 3.00/PSI. A unit that needs gas every few months has a leak — topping up without a <a href="/services/gas-topup">leak check</a> only repeats the bill. Details sit in our <a href="/blog/r32-r410a-r22-gas-difference">R32 vs R410A vs R22 guide</a>.</p>

      <h2>Local replacement coverage in KL &amp; Selangor</h2>
      <p>KL Renovator handles old-unit take-away and replacement across Kuala Lumpur and Selangor, including Petaling Jaya, Shah Alam, Subang Jaya, Puchong, Klang, Ampang, Cheras, Kajang, Mont Kiara, Bangsar, Setapak, Kepong, Batu Caves, Selayang, Rawang, Putrajaya and Cyberjaya. See <a href="/areas/kuala-lumpur">Kuala Lumpur coverage</a> or <a href="/areas/petaling-jaya">Petaling Jaya coverage</a>.</p>
      <p>Hours are Monday to Sunday, 9:00 AM–6:00 PM. Same-day slots depend on routing. KL Renovator operates under Multicore Dynamics Resources (SSM 003765188-T) and covers eligible workmanship with a 1-month written warranty.</p>

      <h2>Frequently asked questions</h2>
      <h3>How do I dispose of an old aircond in Malaysia?</h3>
      <p>Do not leave it at the roadside or cut the copper pipes yourself. A technician should pump the refrigerant into the outdoor unit, isolate the power, remove both indoor and outdoor units, and take the old set away. KL Renovator publishes dismantle-only from RM 90 and disposes of the old unit properly after removal.</p>

      <h3>Can I throw an old aircond in the normal rubbish?</h3>
      <p>No. A split unit still holds refrigerant, compressor oil and electrical parts. Cutting the pipes vents the gas and leaves an open circuit. Book a dismantle so the charge is recovered first.</p>

      <h3>Does KL Renovator take the old unit away?</h3>
      <p>Yes. When we dismantle a unit we are replacing, we take the old indoor and outdoor units away and dispose of them properly. Confirm this on WhatsApp when you book so the visit is planned as a replacement, not a keep-the-old-unit job.</p>

      <h3>How much does it cost to remove and replace an old aircond?</h3>
      <p>Dismantle only is from RM 90. A new wall-mounted 1.0–1.5 HP installation is from RM 199 and includes 7ft copper pipe, insulation, electrical wire, drain pipe, vacuum commissioning and a 1-month workmanship warranty. The two jobs are quoted together before work starts.</p>

      <h3>Should I repair my old aircond or replace it?</h3>
      <p>Use the 50% rule in our repair-or-replace guide: if the repair quote is more than half the cost of an equivalent new unit, or the set is over 10 years old, still on R22, or has a failed compressor (RM 800–2,000), replacement is usually the clearer path. Capacitor, drain and small leak jobs are still worth repairing.</p>

      <h3>What happens to the refrigerant when an old unit is removed?</h3>
      <p>On a typical split unit the technician runs a pump-down so the charge is stored in the outdoor condenser before the pipes are opened. The gas is not vented into the room or the street. A top-up is only discussed if the system was already leaking.</p>

      <h3>Can the old copper pipes stay in the wall?</h3>
      <p>The buried length in the old wall is cut at the penetration and left there — it cannot be pulled out intact. A replacement install runs new 7ft copper, insulation, wire and drain at the same opening or a new one. Extra length is charged at the published per-foot rates.</p>

      <h3>Is an R22 aircond worth keeping?</h3>
      <p>R22 top-up is still published at RM 2.50 per PSI, so a healthy R22 unit can be kept running. Replacement becomes the better call when the compressor is noisy, leaks keep returning, or the indoor coil has never been deep-cleaned in years.</p>

      <h3>How long does a same-day replacement take?</h3>
      <p>A wall-mounted swap is typically a half-day job once access is ready: dismantle the old set, mount the new indoor plate and outdoor bracket, run the new line-set, vacuum, commission and test cooling. High-floor condos add lift booking time.</p>

      <h3>Do you replace every aircond brand?</h3>
      <p>Yes. KL Renovator dismantles and replaces the 20 brands listed on this website — including Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL and Isonic — across KL and Selangor.</p>

      <h2>Book old-unit take-away and a replacement slot</h2>
      <p>Send the outdoor nameplate photo, HP if you can read it, and whether the property is a condo or landed house. WhatsApp <strong>+60 18-298 3573</strong> or use the <a href="/book">online booking form</a>. Related: <a href="/services/dismantling-relocation">dismantle &amp; relocation</a> · <a href="/services/installation">new installation</a> · <a href="/blog/baiki-vs-tukar-baru-aircond-malaysia">repair or replace</a> · <a href="/which-aircond-service-do-i-need">which service do I need</a> · <a href="/near-me">technician near you in KL &amp; Selangor</a>.</p>
    `,
    contentMS: `
      <p>Aircond yang dah tak sejuk, masih R22, atau ada sebut harga kompressor berhampiran harga pasang unit baharu patut turun dari dinding — bukan duduk di koridor, balkoni atau tepi jalan. Panduan ini untuk pemilik rumah KL dan Selangor yang perlu cabut set lama, urus refrigerant, dan tauliah pengganti, menggunakan hanya harga rasmi KL Renovator.</p>
      <div class="summary-block"><strong>Jawapan pantas:</strong> Jangan potong paip atau buang unit luar sendiri. Juruteknik memam gas ke kondenser luar, putuskan kuasa, cabut kedua-dua unit dan bawa set lama pergi. KL Renovator terbitkan buka sahaja dari RM 90 dan pemasangan baharu unit dinding 1.0–1.5 HP dari RM 199 (7 kaki paip tembaga, penebat, wayar, longkang, vakum dan waranti kerja 1 bulan). Harga disahkan secara bertulis sebelum kerja bermula.</div>

      <h2>Pembuangan bukan sama dengan pindah rumah</h2>
      <p><a href="/ms/blog/aircond-dismantle-reinstallation-guide-malaysia">Buka untuk pindah rumah</a> menyimpan unit dalam dan luar yang masih elok supaya dipasang semula di alamat baharu. Pembuangan ialah kerja bertentangan: set turun dari dinding buat kali terakhir. Pump-down tetap penting — gas tidak patut dilepaskan — tetapi unit lama ikut juruteknik, bukan ke birai baharu.</p>
      <p>Jika anda masih menimbang sama ada unit ada baki hayat, mula dengan <a href="/ms/blog/baiki-vs-tukar-baru-aircond-malaysia">panduan baiki atau ganti</a> dan <a href="/ms/blog/aircond-lifespan-malaysia">panduan jangka hayat Malaysia</a>. Halaman ini mengandaikan keputusan sudah condong ke penggantian.</p>

      <h2>Kenapa jangan buang atau potong aircond lama sendiri</h2>
      <ul>
        <li><strong>Litar masih ada cas</strong> — memotong tembaga tanpa pump-down melepaskan R22, R410A atau R32 dan membiarkan kelembapan masuk.</li>
        <li><strong>Unit luar bukan sampah rumah</strong> — ia ada minyak kompressor, kompressor tertutup dan bahagian elektrik. Meninggalkannya di pagar atau tong kondo bukan pelan pembuangan.</li>
        <li><strong>Isolator hidup dan plat dinding tinggal</strong> — kuasa mesti disahkan mati sebelum unit dalam dicabut. Wayar hidup dalam dinding bersimen jadi masalah kemudian.</li>
        <li><strong>Koridor kondo bukan stor</strong> — ramai JMB di Mont Kiara, Bangsar, Damansara dan Petaling Jaya tidak benarkan unit luar duduk di kawasan bersama semalaman.</li>
      </ul>

      <h2>Apa yang lawatan penggantian bertanggungjawab sebenarnya termasuk</h2>
      <ol>
        <li><strong>Semak pelekat dan kerosakan</strong> — jenama, HP, jenis gas dan sama ada masih berbaloi dibaiki (kapasitor RM 150–250, bocor RM 120, kompressor RM 800–2,000).</li>
        <li><strong>Pump-down</strong> — cas disimpan dalam kondenser luar sebelum paip dibuka.</li>
        <li><strong>Putuskan elektrik</strong> — isolator atau MCB disahkan mati, wayar dalam dan luar dilabel dan ditanggalkan.</li>
        <li><strong>Cabut unit dalam dan luar</strong> — plat dinding biasanya tinggal; tembaga tertanam dipotong di titik penembusan dan ditinggalkan dalam dinding lama.</li>
        <li><strong>Bawa set lama</strong> — kedua-dua unit ikut juruteknik dan dibuang dengan betul.</li>
        <li><strong>Pasang baharu</strong> — plat dalam baharu, bracket luar jika perlu (standard RM 45, tugas berat RM 70), 7 kaki paip / penebat / wayar / longkang, vakum, tauliah, ujian sejuk, kad kerja bertulis dan waranti kerja 1 bulan.</li>
      </ol>
      <p>Blok terakhir itu <a href="/ms/services/installation">pemasangan unit baharu</a> penuh, bukan “gantung kotak pada skru lama”. Jika tapak baharu perlu paip tambahan, isolator (titik palam elektrik RM 100) atau akses tingkat tinggi (RM 50–150), ia disebut sebelum dinding dibor.</p>

      <h2>Baiki, simpan, atau ganti — angka rasmi sahaja</h2>
      <table>
        <thead><tr><th>Situasi</th><th>Laluan biasa</th><th>Angka rasmi KL Renovator</th></tr></thead>
        <tbody>
          <tr><td>Kapasitor, sensor, bocor kecil, longkang tersumbat</td><td>Baiki</td><td>Diagnostik RM 88 (dilupuskan dengan baiki); kapasitor RM 150–250; bocor RM 120; servis asas dari RM 99</td></tr>
          <tr><td>Unit R22 sihat, masih sejuk</td><td>Simpan dan servis</td><td>Top-up R22 RM 2.50/PSI selepas pemeriksaan; cuci kimia dari RM 120</td></tr>
          <tr><td>Kompressor rosak, 10+ tahun, bocor berulang</td><td>Ganti</td><td>Ganti kompressor RM 800–2,000 berbanding buka dari RM 90 + pasang baharu dari RM 199</td></tr>
          <tr><td>Unit sudah turun, tiada pasang semula</td><td>Buka sahaja</td><td>Dari RM 90 (dalam + luar, pump-down, bawa pergi)</td></tr>
        </tbody>
      </table>
      <p>Kami tidak terbitkan “caj pembuangan” berasingan atau yuran loji kitar semula. Bawa pergi set lama ialah sebahagian daripada buka penggantian. WhatsApp jenama, HP dan gambar pelekat unit luar untuk sebut harga bertulis.</p>

      <h2>Harga penggantian rasmi</h2>
      <table>
        <thead><tr><th>Kerja</th><th>Unit dinding</th><th>Nota</th></tr></thead>
        <tbody>
          <tr><td>Buka sahaja</td><td>Dari RM 90</td><td>Dalam + luar, pump-down, bawa pergi dengan betul</td></tr>
          <tr><td>Pasang baharu 1.0–1.5 HP</td><td>RM 199</td><td>7 kaki paip tembaga, penebat, wayar, longkang, vakum, waranti kerja 1 bulan</td></tr>
          <tr><td>Pasang baharu 2.0 HP</td><td>RM 249</td><td>Inklusi sama; paip tambahan melebihi 7 kaki RM 23/kaki</td></tr>
          <tr><td>Pasang baharu 2.5 HP</td><td>RM 279</td><td>Inklusi sama</td></tr>
          <tr><td>Ceiling cassette 1.0–1.5 HP</td><td>RM 290</td><td>Cabutan cassette lama disebut di tapak</td></tr>
          <tr><td>Bracket luar standard / tugas berat</td><td>RM 45 / RM 70</td><td>Hanya jika bracket lama tidak selamat atau saiz salah</td></tr>
        </tbody>
      </table>
      <p>Guna <a href="/ms/aircond-installation-cost-calculator">kalkulator kos pemasangan</a> jika laluan paip baharu lebih daripada 7 kaki, kemudian sahkan nombor di WhatsApp. Rumah berbilang unit (5+ unit dalam satu lawatan) layak untuk diskaun tempahan segera 5%; 10+ unit layak 10%.</p>

      <h2>R22, R410A dan R32 pada pelekat lama</h2>
      <p>Pelekat luar memberitahu gas yang ada di dalam. Itu tidak menukar harga buka, tetapi menukar perbualan simpan-atau-ganti. Top-up R22 masih disenaraikan RM 2.50/PSI; R410A dan R32 RM 3.00/PSI. Unit yang perlu gas setiap beberapa bulan ada bocor — top-up tanpa <a href="/ms/services/gas-topup">semakan bocor</a> hanya mengulang bil. Butiran dalam <a href="/ms/blog/r32-r410a-r22-gas-difference">panduan R32 vs R410A vs R22</a>.</p>

      <h2>Liputan penggantian tempatan di KL &amp; Selangor</h2>
      <p>KL Renovator mengurus bawa pergi unit lama dan penggantian di seluruh Kuala Lumpur dan Selangor, termasuk Petaling Jaya, Shah Alam, Subang Jaya, Puchong, Klang, Ampang, Cheras, Kajang, Mont Kiara, Bangsar, Setapak, Kepong, Batu Caves, Selayang, Rawang, Putrajaya dan Cyberjaya. Lihat <a href="/ms/areas/kuala-lumpur">liputan Kuala Lumpur</a> atau <a href="/ms/areas/petaling-jaya">liputan Petaling Jaya</a>.</p>
      <p>Waktu operasi Isnin hingga Ahad, 9:00 pagi–6:00 petang. Slot hari sama bergantung pada laluan. KL Renovator beroperasi di bawah Multicore Dynamics Resources (SSM 003765188-T) dan melindungi kerja yang layak dengan waranti bertulis 1 bulan.</p>

      <h2>Soalan lazim</h2>
      <h3>Bagaimana nak buang aircond lama di Malaysia?</h3>
      <p>Jangan tinggalkan di tepi jalan atau potong paip tembaga sendiri. Juruteknik patut pump-down gas ke unit luar, putuskan kuasa, cabut unit dalam dan luar, kemudian bawa set lama pergi. KL Renovator terbitkan buka sahaja dari RM 90 dan membuang unit lama dengan betul selepas cabutan.</p>

      <h3>Boleh buang aircond lama bersama sampah biasa?</h3>
      <p>Tidak. Split unit masih ada refrigerant, minyak kompressor dan bahagian elektrik. Memotong paip melepaskan gas dan meninggalkan litar terbuka. Tempah buka supaya cas gas dikumpul dahulu.</p>

      <h3>Adakah KL Renovator bawa unit lama pergi?</h3>
      <p>Ya. Apabila kami buka unit yang diganti, kami bawa unit dalam dan luar lama dan membuangnya dengan betul. Sahkan di WhatsApp semasa tempah supaya lawatan dirancang sebagai penggantian, bukan kerja simpan unit lama.</p>

      <h3>Berapa kos cabut dan ganti aircond lama?</h3>
      <p>Buka sahaja dari RM 90. Pemasangan baharu unit dinding 1.0–1.5 HP dari RM 199 termasuk 7 kaki paip tembaga, penebat, wayar, paip longkang, pentauliahan vakum dan waranti kerja 1 bulan. Kedua-dua kerja disebut harga bersama sebelum kerja bermula.</p>

      <h3>Patut baiki aircond lama atau ganti?</h3>
      <p>Guna peraturan 50% dalam panduan baiki atau ganti kami: jika sebut harga baiki lebih daripada separuh kos unit baharu yang setara, atau set berusia lebih 10 tahun, masih R22, atau kompressor dah rosak (RM 800–2,000), ganti biasanya lebih jelas. Kapasitor, longkang dan bocor kecil masih berbaloi dibaiki.</p>

      <h3>Apa jadi kepada gas apabila unit lama dicabut?</h3>
      <p>Pada split unit biasa juruteknik jalankan pump-down supaya cas disimpan dalam kondenser luar sebelum paip dibuka. Gas tidak dilepaskan ke bilik atau jalan. Top-up hanya dibincang jika sistem sudah bocor.</p>

      <h3>Boleh paip tembaga lama tinggal dalam dinding?</h3>
      <p>Bahagian tertanam dalam dinding lama dipotong di titik penembusan dan ditinggalkan — ia tidak boleh ditarik utuh. Pemasangan ganti menjalankan 7 kaki paip tembaga, penebat, wayar dan longkang baharu. Panjang tambahan dicaj pada kadar rasmi seaki.</p>

      <h3>Adakah aircond R22 masih berbaloi disimpan?</h3>
      <p>Top-up R22 masih diterbitkan pada RM 2.50 se-PSI, jadi unit R22 yang sihat masih boleh dijalankan. Penggantian menjadi pilihan lebih baik apabila kompressor bising, bocor berulang, atau gegelung dalam tidak pernah dicuci mendalam selama bertahun.</p>

      <h3>Berapa lama penggantian hari sama mengambil masa?</h3>
      <p>Tukar unit dinding biasanya kerja setengah hari apabila akses sedia: buka set lama, pasang plat dalam dan bracket luar baharu, pasang paip baharu, vakum, tauliah dan uji penyejukan. Kondo tingkat tinggi menambah masa tempahan lif.</p>

      <h3>Adakah anda ganti setiap jenama aircond?</h3>
      <p>Ya. KL Renovator buka dan ganti 20 jenama yang disenaraikan di laman web ini — termasuk Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL dan Isonic — di seluruh KL dan Selangor.</p>

      <h2>Tempah bawa pergi unit lama dan slot penggantian</h2>
      <p>Hantar gambar pelekat unit luar, HP jika boleh dibaca, dan sama ada hartanah kondo atau rumah teres. WhatsApp <strong>+60 18-298 3573</strong> atau guna <a href="/ms/book">borang tempahan dalam talian</a>. Berkaitan: <a href="/ms/services/dismantling-relocation">buka &amp; pindah</a> · <a href="/ms/services/installation">pemasangan baharu</a> · <a href="/ms/blog/baiki-vs-tukar-baru-aircond-malaysia">baiki atau ganti</a> · <a href="/ms/which-aircond-service-do-i-need">servis mana yang saya perlu</a> · <a href="/ms/near-me">juruteknik berhampiran di KL &amp; Selangor</a>.</p>
    `,
    contentZH: `
      <p>一台已经不冷、仍在用 R22，或压缩机报价已经接近新机安装费的冷气，应该从墙上拆下来——而不是放在走廊、阳台或路边。本指南面向吉隆坡与雪兰莪需要拆旧、处理冷媒并调试新机的屋主，全部采用 KL Renovator 已公布的价格。</p>
      <div class="summary-block"><strong>快速答案：</strong>不要自己剪管或丢弃室外机。技师会把冷媒泵回室外冷凝器、切断电源、拆下两台机器并带走旧机。KL Renovator 公布只拆机从 RM 90 起，壁挂式 1.0–1.5 HP 新机安装从 RM 199 起（含 7 尺铜管、保温、电线、排水、抽真空和 1 个月工艺保修）。开工前书面确认价格。</div>

      <h2>报废不等于搬家移机</h2>
      <p><a href="/zh/blog/aircond-dismantle-reinstallation-guide-malaysia">搬家拆机</a>是把还能用的室内外机带到新地址重新调试。报废正好相反：这套机器最后一次下墙。泵送仍然重要——冷媒不该被排放——但旧机跟着技师走，而不是上新的平台。</p>
      <p>如果还在犹豫机器有没有剩余价值，先看<a href="/zh/blog/baiki-vs-tukar-baru-aircond-malaysia">维修还是更换费用指南</a>和<a href="/zh/blog/aircond-lifespan-malaysia">马来西亚使用寿命指南</a>。本页默认你已经倾向换新。</p>

      <h2>为什么不要自己丢或剪旧冷气</h2>
      <ul>
        <li><strong>管路里还有压力</strong>——不泵送就剪铜管，会把 R22、R410A 或 R32 排到空气中，并让水分进入开口管路。</li>
        <li><strong>室外机不是生活垃圾</strong>——里面有压缩机油、密封压缩机和电气部件。丢在门口或公寓垃圾桶里，不算处理方案。</li>
        <li><strong>带电隔离开关和墙板会留下</strong>——室内机下来前必须确认断电。粉刷墙里留下的带电电线是以后的隐患。</li>
        <li><strong>公寓走廊不是仓库</strong>——Mont Kiara、Bangsar、Damansara 和八打灵再也许多 JMB 不允许室外机在公共区域过夜。</li>
      </ul>

      <h2>一次负责任的换机上门实际包含什么</h2>
      <ol>
        <li><strong>铭牌与故障检查</strong>——品牌、匹数、冷媒种类，以及是否仍值得修（电容 RM 150–250，泄漏 RM 120，压缩机 RM 800–2,000）。</li>
        <li><strong>泵送</strong>——开管前把冷媒存在室外冷凝器里。</li>
        <li><strong>切断电源</strong>——确认隔离开关或空气开关无电，室内外电线标记后拆除。</li>
        <li><strong>拆室内外机</strong>——墙板通常留下；埋墙铜管在穿墙处切断并留在旧墙里。</li>
        <li><strong>带走旧机</strong>——两台机器随技师离开并妥善处理。</li>
        <li><strong>安装新机</strong>——新墙板、必要时新室外支架（标准 RM 45，重型 RM 70）、7 尺铜管/保温/电线/排水、抽真空、调试、制冷测试、书面工单和 1 个月工艺保修。</li>
      </ol>
      <p>最后这一块是完整的<a href="/zh/services/installation">新机安装</a>，不是“挂回旧螺丝”的偷工。如果新位置需要加长铜管、隔离开关（电源插座安装 RM 100）或高层作业（RM 50–150），会在钻孔前报价。</p>

      <h2>修、留还是换——只用已公布数字</h2>
      <table>
        <thead><tr><th>情况</th><th>通常路径</th><th>KL Renovator 已公布数字</th></tr></thead>
        <tbody>
          <tr><td>电容、传感器、小泄漏、排水堵塞</td><td>维修</td><td>诊断 RM 88（随维修免除）；电容 RM 150–250；泄漏 RM 120；基本保养从 RM 99 起</td></tr>
          <tr><td>健康的 R22 机器，仍能制冷</td><td>保留并保养</td><td>检查后 R22 加气 RM 2.50/PSI；化学清洗从 RM 120 起</td></tr>
          <tr><td>压缩机损坏、10 年以上、反复泄漏</td><td>更换</td><td>换压缩机 RM 800–2,000，对比拆机从 RM 90 起 + 新装从 RM 199 起</td></tr>
          <tr><td>机器已下墙，不再重装</td><td>只拆机</td><td>从 RM 90 起（室内+室外、泵送、带走）</td></tr>
        </tbody>
      </table>
      <p>我们没有单独公布“报废附加费”或回收厂费用。带走旧机是换机拆卸的一部分。把品牌、匹数和室外机铭牌照片发到 WhatsApp，即可获得书面报价。</p>

      <h2>已公布的换机价格</h2>
      <table>
        <thead><tr><th>工作</th><th>壁挂式</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td>只拆机</td><td>RM 90 起</td><td>室内+室外、泵送、妥善带走</td></tr>
          <tr><td>新装 1.0–1.5 HP</td><td>RM 199</td><td>7 尺铜管、保温、电线、排水、抽真空、1 个月工艺保修</td></tr>
          <tr><td>新装 2.0 HP</td><td>RM 249</td><td>同样包含；超过 7 尺铜管每尺 RM 23</td></tr>
          <tr><td>新装 2.5 HP</td><td>RM 279</td><td>同样包含</td></tr>
          <tr><td>天花卡式 1.0–1.5 HP</td><td>RM 290</td><td>旧卡式拆除按现场报价</td></tr>
          <tr><td>标准 / 重型室外支架</td><td>RM 45 / RM 70</td><td>仅当旧支架不安全或尺寸不对</td></tr>
        </tbody>
      </table>
      <p>新管路超过 7 尺时，先用<a href="/zh/aircond-installation-cost-calculator">安装费用计算器</a>，再在 WhatsApp 确认数字。一次预约 5 台以上享 5% 即时预约折扣，10 台以上享 10%。</p>

      <h2>旧铭牌上的 R22、R410A 与 R32</h2>
      <p>室外机贴纸告诉你里面是哪种气体。这不改变拆机价格，但会改变留还是换的讨论。R22 加气仍列为每 PSI RM 2.50；R410A 与 R32 为 RM 3.00/PSI。每隔几个月就要加气的机器有泄漏——不做<a href="/zh/services/gas-topup">查漏</a>只加气，账单会重复。详见<a href="/zh/blog/r32-r410a-r22-gas-difference">R32、R410A 与 R22 指南</a>。</p>

      <h2>吉隆坡与雪兰莪本地换机范围</h2>
      <p>KL Renovator 在吉隆坡与雪兰莪处理旧机带走与更换，包括八打灵再也、莎阿南、梳邦再也、蒲种、巴生、安邦、蕉赖、加影、Mont Kiara、Bangsar、Setapak、Kepong、黑风洞、士拉央、万挠、布城和 Cyberjaya。查看<a href="/zh/areas/kuala-lumpur">吉隆坡服务范围</a>或<a href="/zh/areas/petaling-jaya">八打灵再也服务范围</a>。</p>
      <p>营业时间为星期一至星期日，早上 9 点至傍晚 6 点。当天时段视技师路线而定。KL Renovator 以 Multicore Dynamics Resources（SSM 003765188-T）名义运营，符合条件的工艺享 1 个月书面保修。</p>

      <h2>常见问题</h2>
      <h3>在马来西亚如何处理旧冷气？</h3>
      <p>不要扔在路边，也不要自己剪铜管。应由技师把冷媒泵回室外机、切断电源、拆下室内外机并带走旧机。KL Renovator 公布只拆机从 RM 90 起，拆下后会妥善处理旧机。</p>

      <h3>旧冷气可以当普通垃圾扔掉吗？</h3>
      <p>不可以。分体机里仍有冷媒、压缩机油和电气部件。剪管会把气体排到空气中，并留下开口管路。请预约拆机，先回收冷媒。</p>

      <h3>KL Renovator 会把旧机带走吗？</h3>
      <p>会。我们拆下要更换的机器时，会带走旧的室内外机并妥善处理。预约时请在 WhatsApp 确认，以便按换机而不是保留旧机来安排。</p>

      <h3>拆旧换新要多少钱？</h3>
      <p>只拆机从 RM 90 起。壁挂式 1.0–1.5 HP 新机安装从 RM 199 起，含 7 尺铜管、保温、电线、排水管、抽真空调试和 1 个月工艺保修。两项工作开工前一并报价。</p>

      <h3>旧冷气该修还是该换？</h3>
      <p>参考我们维修或更换指南中的 50% 规则：维修报价超过同等新机一半，或机器超过 10 年、仍用 R22、压缩机已坏（RM 800–2,000），通常换新更清楚。电容、排水和小型泄漏仍值得修。</p>

      <h3>拆旧机时冷媒怎么处理？</h3>
      <p>一般分体机会先做泵送，把冷媒存在室外冷凝器里再开管。气体不会排到房间或街上。只有系统本来就在漏，才另外谈加雪种。</p>

      <h3>旧铜管可以留在墙里吗？</h3>
      <p>埋在旧墙里的那段会在穿墙处切断并留下——无法完整抽出。换机安装会走新的 7 尺铜管、保温、电线和排水。超出部分按已公布的每尺价格收费。</p>

      <h3>R22 旧机还值得留吗？</h3>
      <p>R22 加气仍公布为每 PSI RM 2.50，健康的 R22 机器还可以继续用。压缩机已吵、反复泄漏，或室内蒸发器多年未深度清洗时，换新更合适。</p>

      <h3>当天换机要多久？</h3>
      <p>壁挂式换机在通道准备好后通常半天：拆旧机、装新墙板和室外支架、走新管路、抽真空、调试并测试制冷。高层公寓还要预约电梯。</p>

      <h3>你们更换所有冷气品牌吗？</h3>
      <p>是。KL Renovator 拆卸并更换本网站列出的 20 个品牌——包括 Daikin、Panasonic、Mitsubishi、Acson、York、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL 与 Isonic——覆盖吉隆坡与雪兰莪。</p>

      <h2>预约带走旧机并安排换机时段</h2>
      <p>请发送室外机铭牌照片、能看清的匹数，以及房子是公寓还是排屋。WhatsApp <strong>+60 18-298 3573</strong>，或使用<a href="/zh/book">在线预约表格</a>。相关：<a href="/zh/services/dismantling-relocation">拆卸与移机</a> · <a href="/zh/services/installation">新机安装</a> · <a href="/zh/blog/baiki-vs-tukar-baru-aircond-malaysia">修还是换</a> · <a href="/zh/which-aircond-service-do-i-need">我需要哪种服务</a> · <a href="/zh/near-me">吉隆坡与雪兰莪附近的技师</a>。</p>
    `,
  },
];
