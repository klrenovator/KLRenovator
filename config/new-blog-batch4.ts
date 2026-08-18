/**
 * New multilingual SEO blogs — Batch 4
 * Blog 4 of 14: Post-Haze Aircond Cleaning Guide Malaysia
 *
 * Distinct from the existing posts:
 * - `diy-aircond-cleaning-vs-chemical-wash-malaysia` (DIY vs professional line)
 * - `chemical-wash-vs-chemical-overhaul` (wash vs overhaul scope)
 * - `how-often-service-aircond-malaysia` (servicing frequency)
 * This post targets the "haze aircond / cleaning after smoke haze /
 * cuci aircond musim kabut / 烟霾后洗冷气" intent: what haze dust does to
 * each component, what is safe to do during haze, and the correct
 * post-haze cleaning path using KL Renovator's published prices only.
 *
 * Image notes (existing real job photo used as featured image):
 * - Featured: /hero/midea-aircond-chemical-wash-klang-61.webp
 *   (real KL Renovator job photo: wall-mounted indoor unit with canvas
 *   protection laid out below during a chemical wash in Klang; no invented
 *   portrait, badge, haze sky or customer claim)
 * - Supporting prompt 1: close-up of a grey soot-dusted mesh air filter
 *   held up to natural light, neutral background, no brand logo visible.
 * - Supporting prompt 2: technician hand in a nitrile glove rinsing the
 *   mesh filter at a sink with running water, no face shown.
 * - Supporting prompt 3: outdoor condenser with visible dust on the fins
 *   on a concrete ledge, daytime, no invented skyline or haze.
 * - Supporting prompt 4: clean trilingual decision-flow infographic:
 *   rinse filter weekly during haze → book basic service after haze →
 *   chemical wash if smell or weak airflow → overhaul if leaking or icing.
 */

import type { BlogPost } from "./blog-posts";

export const newBlogBatch4: BlogPost[] = [
  {
    slug: "aircond-cleaning-after-haze-malaysia",
    title: "Post-Haze Aircond Cleaning Guide Malaysia",
    titleMS: "Cuci Aircond Selepas Musim Kabut Malaysia",
    titleZH: "马来西亚烟霾后冷气清洗指南",
    excerpt:
      "Haze coats aircond filters and coils in fine PM2.5 dust. What smoke haze does to your unit, and the post-haze cleaning checklist for KL & Selangor homes.",
    excerptMS:
      "Kabut menyelimuti penapis dan gegelung aircond dengan debu PM2.5 halus. Apa yang berlaku pada unit, dan senarai cuci selepas musim kabut di KL & Selangor.",
    excerptZH:
      "烟霾季会让冷气滤网和蒸发器积满细粒子粉尘。了解烟霾对冷气的实际影响，以及吉隆坡与雪兰莪屋主在烟霾过后的清洗清单、检查重点与专业服务价格。",
    category: "Chemical Services",
    categoryMS: "Perkhidmatan Cuci Kimia",
    categoryZH: "化学清洗服务",
    tags: [
      "aircond cleaning after haze Malaysia",
      "haze season aircond PM2.5",
      "post-haze aircond chemical wash KL",
      "smoke haze aircond filter",
      "aircond service haze season Selangor",
      "KL Renovator",
    ],
    date: "2026-08-18",
    dateDisplay: "August 2026",
    lastReviewed: "2026-08-18",
    readTime: 12,
    relatedService: "Pressure Chemical Wash",
    image: "/hero/midea-aircond-chemical-wash-klang-61.webp",
    imageAlt:
      "Wall-mounted aircond with canvas protection laid out below during a professional chemical wash service in Klang",
    faqs: [
      {
        q: "Does haze damage aircond units?",
        a: "Haze does not instantly damage a healthy aircond, but the fine soot it deposits on the filter, coil, blower and outdoor fins adds to the fouling that a normal service schedule already has to remove. The longer a unit runs through heavy haze without filter rinses, the faster airflow and cooling decline and the earlier a chemical wash is needed.",
      },
      {
        q: "How much haze dust does an aircond collect?",
        a: "It depends on the unit, run hours and how strong the haze is, so there is no fixed figure. Practical signs are visible: a grey film on the mesh filter within days, weaker airflow, a musty smell, or dust on the outdoor fins. If your filters look dirty every 1 to 2 weeks during haze, the internal parts have likely collected more.",
      },
      {
        q: "Can I clean my aircond after haze myself?",
        a: "Rinsing the mesh filters is safe DIY work — do it every 1 to 2 weeks during haze days. Cleaning the evaporator coil, blower wheel, drain path and outdoor condenser properly requires a pressure chemical wash with canvas protection, so leave that part to a technician.",
      },
      {
        q: "Should I run or switch off my aircond during haze?",
        a: "Run it with doors and windows closed. A split unit recirculates indoor air and does not pull in outdoor air while the room is sealed, so it keeps the air you already have circulating. Opening windows during a high-PM2.5 day replaces that air with fresh haze. The mesh filter is not a PM2.5 filter — pair the aircond with a HEPA purifier if outdoor smoke is the main concern.",
      },
      {
        q: "How often should I rinse the filter during haze season?",
        a: "Every 1 to 2 weeks during heavy haze instead of the usual 2 to 4 weeks. Switch the unit off or unplug it, remove the filters, rinse under running water, shake off excess water, dry completely in shade, and refit. A filter that is reinstalled damp will re-dust the room every time the unit runs.",
      },
      {
        q: "What post-haze service should I book — basic service or chemical wash?",
        a: "Book a basic service (from RM 99) if the unit cooled normally during haze and shows no smell. Book a pressure chemical wash (from RM 120 for a wall-mounted 1.0–1.5 HP unit) if it ran a lot through the haze and now smells musty, blows weaker air, or the coil shows heavy soot. A chemical overhaul (wall-mounted units only, from RM 420) is for units that still leak, ice up, or have never been deep-cleaned in 3+ years.",
      },
      {
        q: "How long does a post-haze chemical wash take?",
        a: "A wall-mounted unit takes approximately 45 to 90 minutes per unit with canvas protection, filter cleaning, drain flush and a cooling test after completion. Ceiling cassette units typically take 90 to 120 minutes. Same-day slots are often available across KL and Selangor.",
      },
      {
        q: "Does KL Renovator charge extra during haze season?",
        a: "No. The same published rates apply — basic servicing from RM 99, pressure chemical wash from RM 120 for a wall-mounted 1.0–1.5 HP unit — and every price is confirmed in writing via WhatsApp before work begins. Multi-unit bookings qualify for the 5% instant booking discount at 5+ units and 10% at 10+ units.",
      },
      {
        q: "What months does haze season affect aircond cleaning?",
        a: "Transboundary smoke haze in Malaysia typically peaks from August to October, but dust from construction, traffic and local sources is present year-round, so a unit on a busy corridor fouls fast even in haze-free months. The same post-haze checklist applies whenever fine dust loading is high.",
      },
      {
        q: "Can KL Renovator service my aircond brand after haze?",
        a: "Yes. KL Renovator services the 20 brands listed on this website, including Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL and Isonic, across KL and Selangor.",
      },
    ],
    faqsMS: [
      {
        q: "Adakah kabut merosakkan unit aircond?",
        a: "Kabut tidak serta-merta merosakkan aircond yang sihat, tetapi jel halus yang ditinggalkannya pada penapis, gegelung, blower dan sirip luar menambah kepada pencemaran yang jadual servis biasa sudah perlu buang. Semakin lama unit berjalan melalui kabut teruk tanpa bilas penapis, semakin cepat aliran udara dan penyejukan merosot dan semakin awal cuci kimia diperlukan.",
      },
      {
        q: "Berapa banyak debu kabut yang dikumpul oleh aircond?",
        a: "Ia bergantung pada unit, jam berjalan dan sejauh mana kuatnya kabut, jadi tiada angka tetap. Tanda praktikal yang nampak: filem kelabu pada penapis mesh dalam beberapa hari, aliran udara lemah, bau hapak, atau habuk pada sirip luar. Jika penapis anda nampak kotor setiap 1–2 minggu semasa kabut, bahagian dalaman kemungkinan sudah mengumpul lebih banyak.",
      },
      {
        q: "Boleh saya bersih aircond selepas kabut sendiri?",
        a: "Membilas penapis mesh adalah kerja DIY yang selamat — buat setiap 1–2 minggu pada hari kabut. Membersihkan gegelung evaporator, roda blower, laluan longkang dan kondenser luar dengan betul memerlukan cuci kimia bertekanan dengan kanvas pelindung, jadi bahagian itu ditinggalkan kepada juruteknik.",
      },
      {
        q: "Patut saya jalankan atau matikan aircond semasa kabut?",
        a: "Jalankan dengan pintu dan tingkap ditutup. Unit split mengedarkan semula udara dalam bilik dan tidak menarik udara luaran selagi bilik disegel, jadi ia terus mengedarkan udara yang sudah anda ada. Membuka tingkap pada hari PM2.5 tinggi menggantikan udara itu dengan kabut baharu. Penapis mesh bukan penapis PM2.5 — gandingkan aircond dengan penapis udara HEPA jika asap luaran merupakan kebimbangan utama.",
      },
      {
        q: "Berapa kerap saya perlu bilas penapis semasa musim kabut?",
        a: "Setiap 1–2 minggu semasa kabut teruk, berbanding 2–4 minggu seperti biasa. Matikan unit (atau cabut palam), keluarkan penapis, bilas di bawah air mengalir, goncang air berlebihan, keringkan sepenuhnya di tempat teduh dan pasang semula. Penapis yang dipasang semula lembap akan mengembunkan debu semula ke bilik setiap kali unit dijalankan.",
      },
      {
        q: "Servis pasca-kabut apa patut saya tempah — servis asas atau cuci kimia?",
        a: "Tempah servis asas (dari RM 99) jika unit sejuk normal semasa kabut dan tiada bau. Tempah cuci kimia bertekanan (dari RM 120 untuk unit dinding 1.0–1.5 HP) jika ia berjalan banyak melalui kabut dan kini berbau hapak, tiup udara lebih lemah, atau gegelung menunjukkan jel teruk. Overhaul kimia (unit dinding sahaja, dari RM 420) adalah untuk unit yang masih bocor, membeku, atau tidak pernah dicuci mendalam dalam 3+ tahun.",
      },
      {
        q: "Berapa lama cuci kimia pasca-kabut mengambil masa?",
        a: "Satu unit dinding mengambil lebih kurang 45–90 minit seunit dengan kanvas pelindung, pembersihan penapis, pembasuhan longkang dan ujian penyejukan selepas siap. Unit ceiling cassette biasanya mengambil 90–120 minit. Slot hari sama kerap tersedia di seluruh KL dan Selangor.",
      },
      {
        q: "Adakah KL Renovator caj tambahan semasa musim kabut?",
        a: "Tidak. Kadar rasmi yang sama terpakai — servis asas dari RM 99, cuci kimia bertekanan dari RM 120 untuk unit dinding 1.0–1.5 HP — dan setiap harga disahkan secara bertulis melalui WhatsApp sebelum kerja bermula. Tempahan berbilang unit layak untuk diskaun tempahan segera 5% pada 5+ unit dan 10% pada 10+ unit.",
      },
      {
        q: "Bulan apa musim kabut mempengaruhi pembersihan aircond?",
        a: "Kabut asap rentas sempadan di Malaysia biasanya mencapai puncak dari Ogos hingga Oktober, tetapi habuk daripada pembinaan, trafik dan sumber tempatan wujud sepanjang tahun, jadi unit di koridor sibuk menjadi kotor dengan cepat walaupun pada bulan tanpa kabut. Senarai semak pasca-kabut yang sama terpakai setiap kali bebanan debu halus tinggi.",
      },
      {
        q: "Boleh KL Renovator servis jenama aircond saya selepas kabut?",
        a: "Boleh. KL Renovator menservis 20 jenama yang disenaraikan di laman web ini, termasuk Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL dan Isonic, di seluruh KL dan Selangor.",
      },
    ],
    faqsZH: [
      {
        q: "烟霾会损坏冷气吗？",
        a: "烟霾不会立即损坏健康的冷气，但它在滤网、蒸发器、风轮和室外翅片上沉积的细烟炱，会增加本来保养计划就要清除的积垢量。机器在重度烟霾中开机而滤网不冲洗的时间越长，风量和制冷下降得越快，化学清洗也会更早被需要。",
      },
      {
        q: "冷气会积多少烟霾粉尘？",
        a: "取决于机器、运行时长和烟霾强度，所以没有固定数字。实际可见的信号是：滤网几天内出现灰膜、风量变小、有异味，或室外翅片有尘。如果您的滤网在烟霾期间每 1–2 周就脏了，内部部件很可能已积累更多。",
      },
      {
        q: "烟霾后我可以自己清洗冷气吗？",
        a: "冲洗滤网是安全的 DIY 工作——烟霾日每 1–2 周一次。但蒸发器、风轮、排水路径和室外冷凝器的正确清洁需要带防护帆布的高压化学清洗，这部分请交给技师。",
      },
      {
        q: "烟霾期间应该开冷气还是关机？",
        a: "关好门窗并照常运行。分体机循环的是室内空气，房间密封时不会吸入室外空气，所以它持续循环的是您已有的空气。在高 PM2.5 日开窗，等于用新烟霾替换它。滤网不是 PM2.5 滤网——如果室外烟雾是主要健康顾虑，请搭配 HEPA 级空气净化器。",
      },
      {
        q: "烟霾季滤网多久冲洗一次？",
        a: "重度烟霾期间每 1–2 周一次，而非平时的 2–4 周。关机（或拔插头）、取出滤网、用流动水冲洗、甩掉多余水分、在阴凉处完全晾干后装回。湿着装回的滤网每次开机都会再次向房间喷尘。",
      },
      {
        q: "烟霾后该约哪种服务——基本保养还是化学清洗？",
        a: "机器在烟霾期间制冷正常且无异味，约基本保养（RM 99 起）。若它整个烟霾期长时间运行，现在出现异味、风量变弱或蒸发器可见重度烟炱，约高压化学清洗（壁挂式 1.0–1.5 HP 为 RM 120 起）。洗后仍漏水、铜管结冰或 3 年以上未深度保养的机器，则需化学大修（仅限挂壁式，RM 420 起）。",
      },
      {
        q: "烟霾后化学清洗需要多久？",
        a: "壁挂式机器约 45–90 分钟/台，含防护帆布、滤网清洗、排水冲洗和完工后的制冷测试。天花卡式通常 90–120 分钟。吉隆坡与雪兰莪当天时段通常可约。",
      },
      {
        q: "KL Renovator 烟霾季会加价吗？",
        a: "不会。执行同一公开价目——基本保养 RM 99 起，壁挂式 1.0–1.5 HP 高压化学清洗 RM 120 起——每个价格都在开工前经 WhatsApp 书面确认。5 台以上享 5% 即时预约折扣，10 台以上享 10%。",
      },
      {
        q: "哪几个月烟霾会影响冷气清洗？",
        a: "马来西亚跨境烟霾通常 8–10 月最严重，但施工、交通与本地来源的细尘全年都有，所以繁忙走廊旁的机器即使无霾月份也会很快变脏。只要细尘负荷高，同一套烟霾后检查清单都适用。",
      },
      {
        q: "KL Renovator 能服务我的冷气品牌吗？",
        a: "可以。KL Renovator 服务本网站列出的 20 个品牌，包括 Daikin、Panasonic、Mitsubishi、Acson、York、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL 与 Isonic，覆盖吉隆坡与雪兰莪。",
      },
    ],
    content: `
      <p>Haze in the Klang Valley is not only an outdoor-air problem — it also lands on the machine that circulates your home's air. When PM2.5-laden smoke drifts in through open windows, doors and gaps, the aircond's filters and coil are the first surfaces the fine dust settles on, while the outdoor unit is exposed to the same smoke on the ledge. This guide explains what haze actually does to each part, what you can safely do while the haze lasts, and the correct way to clean the unit once it clears — using only KL Renovator's published prices for KL and Selangor.</p>
      <div class="summary-block"><strong>Quick answer:</strong> Haze dust — PM2.5 fine particles and soot — coats the mesh filter, evaporator coil, blower wheel, drain path and outdoor condenser fins, reducing airflow and cooling over time. While the haze lasts, rinse the mesh filter every 1–2 weeks and run the unit with doors and windows closed. Once the haze clears, book a basic service (from RM 99) for light soiling, or a pressure chemical wash (from RM 120 for a wall-mounted 1.0–1.5 HP unit) for heavy soot, musty smell or weak airflow. All prices are published, confirmed in writing before work, and covered by a 1-month workmanship warranty.</div>

      <h2>How haze dust gets into your aircond</h2>
      <p>PM2.5 refers to particles smaller than 2.5 micrometres — small enough to drift through an open window, a doorway or a wall gap, and far more numerous in the air than the visible haze suggests. A wall-mounted split unit does not pull in outdoor air while the room is sealed: it recirculates the air already inside. That means haze enters when you ventilate, and the aircond then keeps moving that dusty air through its internal parts every time it runs.</p>
      <p>The mesh filter is designed for coarse dust and pet hair. It traps a fraction of PM2.5, but the rest passes through and settles on the evaporator coil, the blower wheel behind the panel, and the dark, humid drain pan. Add Malaysia's humidity and the soot binds into a fine grime layer that a casual wipe never removes. Meanwhile the outdoor condenser sits exposed on the ledge or wall bracket, collecting the same soot on its fins all season long.</p>

      <h2>What haze does to each part of the unit</h2>
      <table>
        <thead><tr><th>Component</th><th>What haze leaves behind</th><th>What happens if left uncleaned</th></tr></thead>
        <tbody>
          <tr><td>Mesh filter</td><td>Fine grey film of soot mixed with dust</td><td>Airflow across the coil drops and the unit works harder to hold temperature</td></tr>
          <tr><td>Evaporator coil</td><td>Stuck-on fine dust that binds with humidity into a biofilm layer</td><td>Heat exchange degrades, cooling weakens, electricity use rises</td></tr>
          <tr><td>Blower wheel</td><td>Dust and mould in the fan vanes</td><td>Musty smell, uneven airflow, possible wobble noise</td></tr>
          <tr><td>Drain pan and pipe</td><td>Organic film in a dark, humid channel</td><td>Slow drainage that ends in dripping or leaking from the indoor unit</td></tr>
          <tr><td>Outdoor condenser</td><td>Soot layer over the aluminium fins</td><td>Heat rejection gets worse, the compressor works harder and the unit runs hotter</td></tr>
        </tbody>
      </table>
      <p>None of this is an instant breakdown. It is an acceleration: the same fouling every aircond accumulates in a humid climate, only arriving sooner in haze months. A coil left uncleaned for long enough can lose 15–40% of heat-exchange capacity as grime builds on the fins — which is why a post-haze check is worth doing even when the unit still feels cold.</p>

      <h2>What to do during haze — the safe DIY part</h2>
      <h3>Rinse the filters every 1–2 weeks</h3>
      <p>Normally a mesh filter is rinsed every 2–4 weeks. During heavy haze days, halve that interval. Switch the unit off (or remove the plug), take the filters out, rinse them under running water, shake off excess water, dry them completely in the shade and refit. A filter that is reinstalled damp will re-dust the room. This takes about ten minutes and costs nothing.</p>
      <h3>Keep doors and windows closed — and run the aircond</h3>
      <p>Because a split unit recirculates indoor air, a sealed room keeps its existing air circulating without replacing it with fresh haze. Running the unit during a high-PM2.5 day is generally the more comfortable and the more sensible choice for the room air you already have.</p>
      <p>Be honest about one limit: the mesh filter is not a PM2.5 filter. It will not scrub smoke out of the air. If outdoor haze is the main health concern, a HEPA-class air purifier is the tool for that job; the aircond's job is cooling and comfort, with filter care as its contribution to air quality.</p>
      <h3>Keep the outdoor unit clear</h3>
      <p>Check that nothing is leaning against the outdoor unit and that leaves, plastic bags or debris are not covering the fins. You do not need to — and should not — clean the condenser yourself while the unit is powered. A professional service includes a proper fin clean.</p>
      <h3>Do not leave it off for weeks</h3>
      <p>In a hot, humid climate, a unit that sits powered-off for weeks lets mould establish in the drain pan and behind the coil. Run the unit for a short session after heavy haze days so the internal parts stay dry.</p>

      <h2>The post-haze cleaning checklist — what a technician actually does</h2>
      <p>Once the haze clears, here is the sequence a professional post-haze clean follows (this is the same workflow KL Renovator technicians use across KL and Selangor):</p>
      <ol>
        <li><strong>Photo record and filter inspection</strong> — the filter's soot load is the fastest indicator of how loaded the internals are.</li>
        <li><strong>Filter deep clean or replacement</strong> — rinsed until the water runs clear, or replaced if the mesh is damaged.</li>
        <li><strong>Evaporator coil check</strong> — a high-pressure chemical wash is applied when soot or biofilm is present, with canvas protection on the floor and furniture below.</li>
        <li><strong>Blower wheel cleaning</strong> — the fan behind the coil where mould hides.</li>
        <li><strong>Drain pan and drain pipe flush</strong> — haze-season humidity accelerates the organic blockage that causes indoor dripping.</li>
        <li><strong>Outdoor condenser fin clean</strong> — soot and dust removed from the fins so the unit rejects heat properly again.</li>
        <li><strong>Electrical check and cooling test</strong> — connections inspected, the unit run, and cooling performance verified before handover.</li>
        <li><strong>Written job card</strong> — what was found, what was done, and the 1-month workmanship warranty terms.</li>
      </ol>

      <h2>Basic service vs chemical wash vs overhaul after haze</h2>
      <table>
        <thead><tr><th>Your unit's condition after haze</th><th>Recommended service</th><th>Published price (wall-mounted 1.0–1.5 HP)</th></tr></thead>
        <tbody>
          <tr><td>Cools normally, no smell, light dust on the filter</td><td>Basic service</td><td>From RM 99</td></tr>
          <tr><td>Ran heavily through haze; musty smell, weaker airflow, or visible soot on the coil</td><td>Pressure chemical wash</td><td>From RM 120</td></tr>
          <tr><td>Still leaks after washing, ice forms on the pipe, or no deep clean in 3+ years</td><td>Chemical overhaul (wall-mounted aircon only)</td><td>From RM 420</td></tr>
        </tbody>
      </table>
      <p>Not sure where your unit sits? Compare the honest DIY line in our <a href="/blog/diy-aircond-cleaning-vs-chemical-wash-malaysia">DIY cleaning vs professional chemical wash guide</a>, or the <a href="/blog/chemical-wash-vs-chemical-overhaul">chemical wash vs chemical overhaul</a> breakdown. You can also WhatsApp a photo of your filter and unit — we will tell you which level you actually need.</p>

      <h2>Post-haze prices — KL Renovator's published rates</h2>
      <p>These are the current published rates in the repository. There is no "haze surcharge": the same prices apply in haze months, and every quote is confirmed in writing via WhatsApp before any work begins.</p>
      <table>
        <thead><tr><th>Service</th><th>Wall-mounted</th><th>Ceiling cassette</th></tr></thead>
        <tbody>
          <tr><td>Basic servicing</td><td>RM 99 (1.0–1.5 HP) · RM 120 (2.0–2.5 HP) · RM 150 (3.0–3.5 HP)</td><td>RM 150 (1.0–1.5 HP) · RM 200 (2.0–3.0 HP) · RM 250 (3.5–5.0 HP)</td></tr>
          <tr><td>Pressure chemical wash</td><td>RM 120 (1.0–1.5 HP) · RM 150 (2.0–2.5 HP) · RM 180 (3.0 HP) · RM 200 (4.0–5.0 HP)</td><td>RM 220 (1.0–1.5 HP) · RM 280 (2.0–3.0 HP) · RM 350 (4.0–5.0 HP)</td></tr>
          <tr><td>Chemical overhaul (wall-mounted aircon only)</td><td>RM 420 (1.0–1.5 HP) · RM 490 (2.0–2.5 HP) · RM 560 (3.0–3.5 HP)</td><td>Separate on-site quote</td></tr>
        </tbody>
      </table>
      <p>Annual maintenance contracts are the easiest way to stop haze season from becoming a problem at all: the AMC Basic plan from RM 299 per unit per year covers 2 basic services and 1 chemical wash; AMC Standard from RM 499 adds a second chemical wash and a free emergency check. Prices are per wall-mounted 1.0–1.5 HP unit; multi-unit and commercial discounts are quoted on enquiry. Booking 5 or more units in one visit also qualifies for the 5% instant booking discount, and 10% for 10 or more.</p>

      <h2>Timing: before, during and after haze season</h2>
      <p>Transboundary smoke haze in Malaysia typically peaks from August to October, but fine dust from construction, traffic and local sources is present year-round — a unit on a busy corridor fouls quickly even in haze-free months. The schedule that protects both your comfort and your wallet:</p>
      <ul>
        <li><strong>Before peak haze (July–August):</strong> book the annual chemical wash so the coil enters haze season clean.</li>
        <li><strong>During heavy haze days:</strong> rinse the filter every 1–2 weeks, keep windows closed, keep the outdoor unit clear.</li>
        <li><strong>After the haze clears:</strong> run the unit briefly to dry the internals, then book a post-haze check — a basic service if everything looks light, a chemical wash if the smell or airflow says otherwise.</li>
        <li><strong>AMC customers:</strong> nothing to schedule — the contract's visit cycle already covers it, and we send WhatsApp reminders.</li>
      </ul>
      <p>For the baseline servicing interval your unit needs regardless of haze, see <a href="/blog/how-often-service-aircond-malaysia">how often you should service your aircond in Malaysia</a> and the <a href="/blog/aircond-maintenance-checklist-malaysia">12-point maintenance checklist</a>.</p>

      <h2>Local post-haze service coverage in KL &amp; Selangor</h2>
      <p>KL Renovator handles post-haze cleaning calls across Kuala Lumpur and Selangor, including Petaling Jaya, Shah Alam, Subang Jaya, Puchong, Klang, Ampang, Cheras, Kajang, Mont Kiara, Bangsar, Setapak, Kepong, Batu Caves, Selayang, Rawang, Putrajaya and Cyberjaya. See <a href="/areas/kuala-lumpur">Kuala Lumpur aircond coverage</a> or <a href="/areas/petaling-jaya">Petaling Jaya service coverage</a>.</p>
      <p>Operating hours are Monday to Sunday, 9:00 AM–6:00 PM. Same-day slots are often available depending on technician routing. KL Renovator operates under Multicore Dynamics Resources (SSM 003765188-T), services all 20 brands listed on this website, and covers eligible workmanship with a 1-month written warranty.</p>

      <h2>Frequently asked questions</h2>
      <h3>Does haze damage aircond units?</h3>
      <p>Haze does not instantly damage a healthy aircond, but the fine soot it deposits on the filter, coil, blower and outdoor fins adds to the fouling that a normal service schedule already has to remove. The longer a unit runs through heavy haze without filter rinses, the faster airflow and cooling decline and the earlier a chemical wash is needed.</p>

      <h3>How much haze dust does an aircond collect?</h3>
      <p>It depends on the unit, run hours and how strong the haze is, so there is no fixed figure. Practical signs are visible: a grey film on the mesh filter within days, weaker airflow, a musty smell, or dust on the outdoor fins. If your filters look dirty every 1 to 2 weeks during haze, the internal parts have likely collected more.</p>

      <h3>Can I clean my aircond after haze myself?</h3>
      <p>Rinsing the mesh filters is safe DIY work — do it every 1 to 2 weeks during haze days. Cleaning the evaporator coil, blower wheel, drain path and outdoor condenser properly requires a pressure chemical wash with canvas protection, so leave that part to a technician.</p>

      <h3>Should I run or switch off my aircond during haze?</h3>
      <p>Run it with doors and windows closed. A split unit recirculates indoor air and does not pull in outdoor air while the room is sealed, so it keeps the air you already have circulating. Opening windows during a high-PM2.5 day replaces that air with fresh haze. The mesh filter is not a PM2.5 filter — pair the aircond with a HEPA purifier if outdoor smoke is the main concern.</p>

      <h3>How often should I rinse the filter during haze season?</h3>
      <p>Every 1 to 2 weeks during heavy haze instead of the usual 2 to 4 weeks. Switch the unit off or unplug it, remove the filters, rinse under running water, shake off excess water, dry completely in shade, and refit. A filter that is reinstalled damp will re-dust the room every time the unit runs.</p>

      <h3>What post-haze service should I book — basic service or chemical wash?</h3>
      <p>Book a basic service (from RM 99) if the unit cooled normally during haze and shows no smell. Book a pressure chemical wash (from RM 120 for a wall-mounted 1.0–1.5 HP unit) if it ran a lot through the haze and now smells musty, blows weaker air, or the coil shows heavy soot. A chemical overhaul (wall-mounted units only, from RM 420) is for units that still leak, ice up, or have never been deep-cleaned in 3+ years.</p>

      <h3>How long does a post-haze chemical wash take?</h3>
      <p>A wall-mounted unit takes approximately 45 to 90 minutes per unit with canvas protection, filter cleaning, drain flush and a cooling test after completion. Ceiling cassette units typically take 90 to 120 minutes. Same-day slots are often available across KL and Selangor.</p>

      <h3>Does KL Renovator charge extra during haze season?</h3>
      <p>No. The same published rates apply — basic servicing from RM 99, pressure chemical wash from RM 120 for a wall-mounted 1.0–1.5 HP unit — and every price is confirmed in writing via WhatsApp before work begins. Multi-unit bookings qualify for the 5% instant booking discount at 5+ units and 10% at 10+ units.</p>

      <h3>What months does haze season affect aircond cleaning?</h3>
      <p>Transboundary smoke haze in Malaysia typically peaks from August to October, but dust from construction, traffic and local sources is present year-round, so a unit on a busy corridor fouls fast even in haze-free months. The same post-haze checklist applies whenever fine dust loading is high.</p>

      <h3>Can KL Renovator service my aircond brand after haze?</h3>
      <p>Yes. KL Renovator services the 20 brands listed on this website, including Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL and Isonic, across KL and Selangor.</p>

      <h2>Book your post-haze clean</h2>
      <p>The cheapest post-haze service is the one you did before the haze. If the haze is already here: rinse the filter this week, and once it clears, WhatsApp <strong>+60 18-298 3573</strong> with your location, unit type and HP for a confirmed price and slot — or use the <a href="/book">online booking form</a>. Related: <a href="/services/chemical-wash">pressure chemical wash service</a> · <a href="/services/basic-servicing">basic servicing</a> · <a href="/problems/aircond-bad-smell">aircond bad smell</a> · <a href="/problems/aircond-weak-airflow">weak airflow</a> · <a href="/tools">aircond diagnostic tools</a> · <a href="/near-me">aircond technician near you in KL &amp; Selangor</a>.</p>
    `,
    contentMS: `
      <p>Kabut di Lembah Klang bukan sekadar masalah udara luaran — ia juga hinggap pada mesin yang mengedarkan udara di rumah anda. Apabila asap bercampur PM2.5 masuk melalui tingkap, pintu atau celah dinding, penapis dan gegelung aircond menjadi permukaan pertama yang menerima debu halus itu, manakala unit luar terdedah kepada asap yang sama di tangga atau dinding. Panduan ini menerangkan apa yang kabut sebenarnya lakukan pada setiap bahagian, apa yang boleh anda buat dengan selamat sepanjang kabut berterusan, dan cara betul untuk membersihkan unit setelah kabut bertukar cerah — menggunakan hanya harga rasmi KL Renovator untuk KL dan Selangor.</p>
      <div class="summary-block"><strong>Jawapan pantas:</strong> Debu kabut — zarah halus PM2.5 dan jel — menyaluti penapis mesh, gegelung evaporator, roda blower, laluan longkang dan sirip kondenser luar, mengurangkan aliran udara dan penyejukan dari semasa ke semasa. Semasa kabut berterusan, bilas penapis mesh setiap 1–2 minggu dan jalankan unit dengan pintu dan tingkap ditutup. Selepas kabut bertukar cerah, tempah servis asas (dari RM 99) untuk kotoran ringan, atau cuci kimia bertekanan (dari RM 120 untuk unit dinding 1.0–1.5 HP) untuk jel teruk, bau hapak atau aliran udara lemah. Semua harga rasmi, disahkan secara bertulis sebelum kerja, dan dilindungi waranti kerja 1 bulan.</div>

      <h2>Bagaimana debu kabut masuk ke dalam aircond anda</h2>
      <p>PM2.5 merujuk kepada zarah yang lebih kecil daripada 2.5 mikrometer — cukup kecil untuk hanyut melalui tingkap terbuka, pintu atau celah dinding, dan jumlahnya di udara jauh lebih banyak daripada yang anda nampak sebagai kabus. Unit split dinding tidak menarik udara luaran apabila bilik disegel: ia mengedarkan semula udara yang sudah ada di dalam. Bererti kabut masuk ketika anda berventilasi, dan aircond kemudian terus mengedarkan udara berdebu itu melalui bahagian dalaman setiap kali ia dijalankan.</p>
      <p>Penapis mesh direka untuk habuk kasar dan bulu haiwan. Ia memerangkap sebahagian kecil PM2.5, tetapi sebahagian lagi lalu dan hinggap pada gegelung evaporator, roda blower di sebalik panel, dan dulang longkang yang gelap serta lembap. Tambah kelembapan Malaysia, jel itu mengikat menjadi lapisan nipis yang tak pernah dapat dibuang dengan lap biasa. Pada masa yang sama, kondenser luar duduk terdedah di tangga atau pendakap dinding, mengumpulkan jel yang sama pada siripnya sepanjang musim.</p>

      <h2>Apa yang kabut lakukan pada setiap bahagian unit</h2>
      <table>
        <thead><tr><th>Komponen</th><th>Apa yang ditinggalkan kabut</th><th>Apa berlaku jika tidak dibersihkan</th></tr></thead>
        <tbody>
          <tr><td>Penapis mesh</td><td>Lapisan kelabu nipis jel bercampur habuk</td><td>Aliran udara merentasi gegelung berkurang, unit bekerja lebih keras untuk mengekalkan suhu</td></tr>
          <tr><td>Gegelung evaporator</td><td>Debu halus yang melekat dan mengikat dengan kelembapan menjadi lapisan biofilm</td><td>Pertukaran haba merosot, penyejukan lemah, penggunaan elektrik naik</td></tr>
          <tr><td>Roda blower</td><td>Debu dan kulat di bil kipas</td><td>Bau hapak, aliran udara tidak sekata, bunyi goyang kemungkinan</td></tr>
          <tr><td>Dulang dan paip longkang</td><td>Lapisan organik di saluran gelap dan lembap</td><td>Longkang perlahan yang berakhir dengan air menitis atau bocor dari unit dalam</td></tr>
          <tr><td>Kondenser luar</td><td>Lapisan jel atas sirip aluminium</td><td>Pelepasan haba terjejas, kompressor bekerja lebih keras, unit berjalan lebih panas</td></tr>
        </tbody>
      </table>
      <p>Kesemua ini bukan kerosakan segera. Ia mempercepatan: pencemaran yang sama yang setiap aircond kumpul dalam iklim lembap, hanya tiba lebih awal pada bulan berkaput. Gegelung yang dibiarkan tak dibersihkan cukup lama boleh kehilangan 15–40% kapasiti pertukaran haba apabila kotoran bertimbun pada sirip — sebab itulah semakan selepas kabut berbaloi walaupun unit masih rasa sejuk.</p>

      <h2>Apa yang perlu dibuat semasa kabut — bahagian DIY yang selamat</h2>
      <h3>Bilas penapis setiap 1–2 minggu</h3>
      <p>Biasanya penapis mesh dibilas setiap 2–4 minggu. Pada hari kabut teruk, separuhkan selang itu. Matikan unit (atau cabut palam), keluarkan penapis, bilas di bawah air mengalir, goncang air berlebihan, keringkan sepenuhnya di tempat teduh dan pasang semula. Penapis yang dipasang semula masih lembap akan mengembunkan debu semula ke bilik. Ini mengambil masa lebih kurang 10 minit dan tiada kos.</p>
      <h3>Tutup pintu dan tingkap — dan jalankan aircond</h3>
      <p>Kerana unit split mengedarkan semula udara dalam bilik, bilik yang disegel mengekalkan udaranya sendiri beredaran tanpa diganti dengan kabut baharu. Menjalankan unit pada hari PM2.5 tinggi biasanya pilihan yang lebih selesa dan munasabah untuk udara bilik yang anda sudah ada.</p>
      <p>Jujur tentang satu had: penapis mesh bukan penapis PM2.5. Ia tidak akan menyapu asap keluar daripada udara. Jika kabus luaran merupakan kebimbangan utama kesihatan, penapis udara kelas HEPA ialah alat untuk kerja itu; tugas aircond ialah penyejukan dan keselesaan, dengan penjagaan penapis sebagai sumbangannya kepada kualiti udara.</p>
      <h3>Biarkan unit luar kekal bersih</h3>
      <p>Semak tiada objek bersandar pada unit luar dan tiada daun, beg plastik atau serpihan menutupi sirip. Anda tidak perlu — dan tidak patut — membersihkan kondenser sendiri semasa unit masih berkuasa. Servis profesional termasuk pembersihan sirip yang betul.</p>
      <h3>Jangan biarkan ia mati selama berminggu</h3>
      <p>Dalam iklim panas dan lembap, unit yang dibiarkan mati selama berminggu membolehkan kulat berkembang di dulang longkang dan di sebalik gegelung. Jalankan unit untuk satu sesi pendek selepas hari kabut teruk supaya bahagian dalaman kekal kering.</p>

      <h2>Senarai pembersihan selepas kabut — apa juruteknik sebenarnya lakukan</h2>
      <p>Apabila kabut bertukar cerah, inilah urutan yang diikuti oleh pembersihan pasca-kabut profesional (ini adalah alur kerja yang sama yang juruteknik KL Renovator gunakan di seluruh KL dan Selangor):</p>
      <ol>
        <li><strong>Rekod foto dan pemeriksaan penapis</strong> — beban jel pada penapis ialah penunjuk terpantas tahap beban bahagian dalaman.</li>
        <li><strong>Cuci mendalam atau ganti penapis</strong> — dibilas sehingga air mengalir jernih, atau diganti jika mesh rosak.</li>
        <li><strong>Semakan gegelung evaporator</strong> — cuci kimia tekanan tinggi digunakan apabila jel atau biofilm hadir, dengan kanvas pelindung di lantai dan perabot di bawah.</li>
        <li><strong>Pembersihan roda blower</strong> — kipas di sebalik gegelung tempat kulat bersembunyi.</li>
        <li><strong>Pembasuhan dulang dan paip longkang</strong> — kelembapan musim kabut mempercepatkan penyumbatan organik yang menyebabkan air menitis di dalam.</li>
        <li><strong>Pembersihan sirip kondenser luar</strong> — jel dan debu dibuang dari sirip supaya unit melepaskan haba dengan betul semula.</li>
        <li><strong>Periksaan elektrik dan ujian penyejukan</strong> — sambungan diperiksa, unit dijalankan, dan prestasi penyejukan disahkan sebelum serahan.</li>
        <li><strong>Kad kerja bertulis</strong> — apa yang ditemui, apa yang dilakukan, dan terma waranti kerja 1 bulan.</li>
      </ol>

      <h2>Servis asas vs cuci kimia vs overhaul selepas kabut</h2>
      <table>
        <thead><tr><th>Kondisi unit anda selepas kabut</th><th>Servis yang disyorkan</th><th>Harga rasmi (unit dinding 1.0–1.5 HP)</th></tr></thead>
        <tbody>
          <tr><td>Sejuk normal, tiada bau, habuk ringan pada penapis</td><td>Servis asas</td><td>Dari RM 99</td></tr>
          <tr><td>Berjalan banyak semasa kabut; bau hapak, aliran udara lemah, atau jel kelihatan pada gegelung</td><td>Cuci kimia bertekanan</td><td>Dari RM 120</td></tr>
          <tr><td>Masih bocor setelah dibasuh, ais terbentuk pada paip, atau tiada cuci mendalam dalam 3+ tahun</td><td>Overhaul kimia (unit dinding sahaja)</td><td>Dari RM 420</td></tr>
        </tbody>
      </table>
      <p>Tidak pasti di mana unit anda berada? Bandingkan garis DIY yang jujur dalam <a href="/ms/blog/diy-aircond-cleaning-vs-chemical-wash-malaysia">panduan cuci DIY vs cuci kimia profesional</a>, atau pecahan <a href="/ms/blog/chemical-wash-vs-chemical-overhaul">cuci kimia vs overhaul kimia</a>. Anda juga boleh WhatsApp gambar penapis dan unit — kami beritahu tahap mana yang anda benar-benar perlukan.</p>

      <h2>Harga selepas kabut — kadar rasmi KL Renovator</h2>
      <p>Ini kadar semasa yang diterbitkan dalam repositori. Tiada "caj kabut": harga yang sama terpakai pada bulan berkaput, dan setiap sebut harga disahkan secara bertulis melalui WhatsApp sebelum sebarang kerja bermula.</p>
      <table>
        <thead><tr><th>Servis</th><th>Unit dinding</th><th>Ceiling cassette</th></tr></thead>
        <tbody>
          <tr><td>Servis asas</td><td>RM 99 (1.0–1.5 HP) · RM 120 (2.0–2.5 HP) · RM 150 (3.0–3.5 HP)</td><td>RM 150 (1.0–1.5 HP) · RM 200 (2.0–3.0 HP) · RM 250 (3.5–5.0 HP)</td></tr>
          <tr><td>Cuci kimia bertekanan</td><td>RM 120 (1.0–1.5 HP) · RM 150 (2.0–2.5 HP) · RM 180 (3.0 HP) · RM 200 (4.0–5.0 HP)</td><td>RM 220 (1.0–1.5 HP) · RM 280 (2.0–3.0 HP) · RM 350 (4.0–5.0 HP)</td></tr>
          <tr><td>Overhaul kimia (unit dinding sahaja)</td><td>RM 420 (1.0–1.5 HP) · RM 490 (2.0–2.5 HP) · RM 560 (3.0–3.5 HP)</td><td>Sebut harga di tapak berasingan</td></tr>
        </tbody>
      </table>
      <p>Kontrak penyelenggaraan tahunan (AMC) ialah cara paling mudah supaya musim kabut tidak menjadi masalah: pelan AMC Basic dari RM 299 seunit setahun meliputi 2 servis asas dan 1 cuci kimia; AMC Standard dari RM 499 menambah cuci kimia kedua dan pemeriksaan kecemasan percuma. Harga adalah per unit dinding 1.0–1.5 HP; diskaun berbilang unit dan komersial disebut semasa pertanyaan. Menempah 5 unit atau lebih dalam satu lawatan juga layak untuk diskaun tempahan segera 5%, dan 10% untuk 10 unit atau lebih.</p>

      <h2>Waktu: sebelum, semasa dan selepas musim kabut</h2>
      <p>Kabut asap rentas sempadan di Malaysia biasanya mencapai puncak dari Ogos hingga Oktober, tetapi habuk halus daripada pembinaan, trafik dan sumber tempatan wujud sepanjang tahun — unit di koridor sibuk menjadi kotor dengan cepat walaupun pada bulan tanpa kabut. Jadual yang melindungi keselesaan dan dompet anda:</p>
      <ul>
        <li><strong>Sebelum puncak kabut (Julai–Ogos):</strong> tempah cuci kimia tahunan supaya gegelung masuk musim kabut dalam keadaan bersih.</li>
        <li><strong>Semasa hari kabut teruk:</strong> bilas penapis setiap 1–2 minggu, tutup tingkap, biarkan unit luar kekal bersih.</li>
        <li><strong>Selepas kabut bertukar cerah:</strong> jalankan unit seketika untuk mengeringkan bahagian dalaman, kemudian tempah semakan pasca-kabut — servis asas jika semuanya nampak ringan, cuci kimia jika bau atau aliran udara berkata sebaliknya.</li>
        <li><strong>Pelanggan AMC:</strong> tiada apa untuk dijadualkan — kitaran lawatan kontrak sudah meliputinya, dan kami hantar peringatan WhatsApp.</li>
      </ul>
      <p>Untuk selang servis asas yang unit anda perlukan tanpa mengira kabut, lihat <a href="/ms/blog/how-often-service-aircond-malaysia">berapa kerap anda patut servis aircond di Malaysia</a> dan <a href="/ms/blog/aircond-maintenance-checklist-malaysia">senarai semak penyelenggaraan 12 mata</a>.</p>

      <h2>Liputan servis pasca-kabut tempatan di KL &amp; Selangor</h2>
      <p>KL Renovator mengurus panggilan pembersihan pasca-kabut di seluruh Kuala Lumpur dan Selangor, termasuk Petaling Jaya, Shah Alam, Subang Jaya, Puchong, Klang, Ampang, Cheras, Kajang, Mont Kiara, Bangsar, Setapak, Kepong, Batu Caves, Selayang, Rawang, Putrajaya dan Cyberjaya. Lihat <a href="/ms/areas/kuala-lumpur">liputan aircond Kuala Lumpur</a> atau <a href="/ms/areas/petaling-jaya">liputan Petaling Jaya</a>.</p>
      <p>Waktu operasi Isnin hingga Ahad, 9:00 pagi–6:00 petang. Slot hari sama kerap tersedia mengikut laluan juruteknik. KL Renovator beroperasi di bawah Multicore Dynamics Resources (SSM 003765188-T), menservis semua 20 jenama yang disenaraikan di laman web ini, dan melindungi kerja yang layak dengan waranti bertulis 1 bulan.</p>

      <h2>Soalan lazim</h2>
      <h3>Adakah kabut merosakkan unit aircond?</h3>
      <p>Kabut tidak serta-merta merosakkan aircond yang sihat, tetapi jel halus yang ditinggalkannya pada penapis, gegelung, blower dan sirip luar menambah kepada pencemaran yang jadual servis biasa sudah perlu buang. Semakin lama unit berjalan melalui kabut teruk tanpa bilas penapis, semakin cepat aliran udara dan penyejukan merosot dan semakin awal cuci kimia diperlukan.</p>

      <h3>Berapa banyak debu kabut yang dikumpul oleh aircond?</h3>
      <p>Ia bergantung pada unit, jam berjalan dan sejauh mana kuatnya kabut, jadi tiada angka tetap. Tanda praktikal yang nampak: filem kelabu pada penapis mesh dalam beberapa hari, aliran udara lemah, bau hapak, atau habuk pada sirip luar. Jika penapis anda nampak kotor setiap 1–2 minggu semasa kabut, bahagian dalaman kemungkinan sudah mengumpul lebih banyak.</p>

      <h3>Boleh saya bersih aircond selepas kabut sendiri?</h3>
      <p>Membilas penapis mesh adalah kerja DIY yang selamat — buat setiap 1–2 minggu pada hari kabut. Membersihkan gegelung evaporator, roda blower, laluan longkang dan kondenser luar dengan betul memerlukan cuci kimia bertekanan dengan kanvas pelindung, jadi bahagian itu ditinggalkan kepada juruteknik.</p>

      <h3>Patut saya jalankan atau matikan aircond semasa kabut?</h3>
      <p>Jalankan dengan pintu dan tingkap ditutup. Unit split mengedarkan semula udara dalam bilik dan tidak menarik udara luaran selagi bilik disegel, jadi ia terus mengedarkan udara yang sudah anda ada. Membuka tingkap pada hari PM2.5 tinggi menggantikan udara itu dengan kabut baharu. Penapis mesh bukan penapis PM2.5 — gandingkan aircond dengan penapis udara HEPA jika asap luaran merupakan kebimbangan utama.</p>

      <h3>Berapa kerap saya perlu bilas penapis semasa musim kabut?</h3>
      <p>Setiap 1–2 minggu semasa kabut teruk, berbanding 2–4 minggu seperti biasa. Matikan unit (atau cabut palam), keluarkan penapis, bilas di bawah air mengalir, goncang air berlebihan, keringkan sepenuhnya di tempat teduh dan pasang semula. Penapis yang dipasang semula lembap akan mengembunkan debu semula ke bilik setiap kali unit dijalankan.</p>

      <h3>Servis pasca-kabut apa patut saya tempah — servis asas atau cuci kimia?</h3>
      <p>Tempah servis asas (dari RM 99) jika unit sejuk normal semasa kabut dan tiada bau. Tempah cuci kimia bertekanan (dari RM 120 untuk unit dinding 1.0–1.5 HP) jika ia berjalan banyak melalui kabut dan kini berbau hapak, tiup udara lebih lemah, atau gegelung menunjukkan jel teruk. Overhaul kimia (unit dinding sahaja, dari RM 420) adalah untuk unit yang masih bocor, membeku, atau tidak pernah dicuci mendalam dalam 3+ tahun.</p>

      <h3>Berapa lama cuci kimia pasca-kabut mengambil masa?</h3>
      <p>Satu unit dinding mengambil lebih kurang 45–90 minit seunit dengan kanvas pelindung, pembersihan penapis, pembasuhan longkang dan ujian penyejukan selepas siap. Unit ceiling cassette biasanya mengambil 90–120 minit. Slot hari sama kerap tersedia di seluruh KL dan Selangor.</p>

      <h3>Adakah KL Renovator caj tambahan semasa musim kabut?</h3>
      <p>Tidak. Kadar rasmi yang sama terpakai — servis asas dari RM 99, cuci kimia bertekanan dari RM 120 untuk unit dinding 1.0–1.5 HP — dan setiap harga disahkan secara bertulis melalui WhatsApp sebelum kerja bermula. Tempahan berbilang unit layak untuk diskaun tempahan segera 5% pada 5+ unit dan 10% pada 10+ unit.</p>

      <h3>Bulan apa musim kabut mempengaruhi pembersihan aircond?</h3>
      <p>Kabut asap rentas sempadan di Malaysia biasanya mencapai puncak dari Ogos hingga Oktober, tetapi habuk daripada pembinaan, trafik dan sumber tempatan wujud sepanjang tahun, jadi unit di koridor sibuk menjadi kotor dengan cepat walaupun pada bulan tanpa kabut. Senarai semak pasca-kabut yang sama terpakai setiap kali bebanan debu halus tinggi.</p>

      <h3>Boleh KL Renovator servis jenama aircond saya selepas kabut?</h3>
      <p>Boleh. KL Renovator menservis 20 jenama yang disenaraikan di laman web ini, termasuk Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL dan Isonic, di seluruh KL dan Selangor.</p>

      <h2>Tempah pembersihan pasca-kabut anda</h2>
      <p>Servis pasca-kabut yang termurah ialah yang anda buat sebelum kabut. Jika kabut sudah di sini: bilas penapis minggu ini, dan apabila ia bertukar cerah, WhatsApp <strong>+60 18-298 3573</strong> dengan lokasi, jenis unit dan HP untuk harga dan slot yang disahkan — atau guna <a href="/ms/book">borang tempahan dalam talian</a>. Berkaitan: <a href="/ms/services/chemical-wash">servis cuci kimia bertekanan</a> · <a href="/ms/services/basic-servicing">servis asas</a> · <a href="/ms/problems/aircond-bad-smell">bau aircond buruk</a> · <a href="/ms/problems/aircond-weak-airflow">aliran udara lemah</a> · <a href="/ms/tools">alat diagnostik aircond</a> · <a href="/ms/near-me">juruteknik aircond berhampiran di KL &amp; Selangor</a>.</p>
    `,
    contentZH: `
      <p>吉隆坡谷地的烟霾不只是室外空气问题——它也会落到负责循环你家空气的机器上。当混有 PM2.5 的烟雾从开着的门窗和缝隙飘进来，冷气的滤网和蒸发器最先积上细尘，而室外机则一直暴露在平台或墙架上的相同烟雾中。本篇解释烟霾对各部件的实际影响、烟霾期间您可以安全做什么，以及烟霾过后正确的清洗方式——全部采用 KL Renovator 在吉隆坡与雪兰莪的公开价格。</p>
      <div class="summary-block"><strong>快速答案：</strong>烟霾粉尘——PM2.5 细粒子与烟炱——会附着在滤网、蒸发器、风轮、排水路径和室外冷凝器翅片上，随时间削弱风量与制冷。烟霾期间，每 1–2 周冲洗一次滤网，并关好门窗运行冷气。烟霾过后，轻度积尘预约基本保养（RM 99 起），重度积烟、异味或风量变弱则预约高压化学清洗（壁挂式 1.0–1.5 HP 为 RM 120 起）。所有价格公开、开工前书面确认，并享 1 个月工艺保修。</div>

      <h2>烟霾粉尘如何进入冷气</h2>
      <p>PM2.5 指直径小于 2.5 微米的粒子——小到能从开着的窗、门口或墙缝飘入，而且空气中的数量远多于肉眼看到的烟霾所暗示的。壁挂式分体机在房间密封时不会吸入室外空气：它循环的是室内已有的空气。也就是说，烟霾在你通风时进入，之后每次开机，冷气都会把这份积尘的空气反复送过内部部件。</p>
      <p>滤网的设计目标是粗尘和毛发。它能截留一小部分 PM2.5，但其余会穿过，落在蒸发器、面板后面的风轮，以及阴暗潮湿的排水盘上。加上马来西亚的高湿度，烟炱会结合成一层细垢，普通擦拭永远清不掉。与此同时，室外冷凝器一直暴露在平台或墙架上，整个季节都在翅片上积累同样的烟炱。</p>

      <h2>烟霾对冷气各部件的影响</h2>
      <table>
        <thead><tr><th>部件</th><th>烟霾留下什么</th><th>不清理会怎样</th></tr></thead>
        <tbody>
          <tr><td>滤网</td><td>烟炱与灰尘混合的灰色细膜</td><td>穿过蒸发器的风量下降，机器要更努力维持温度</td></tr>
          <tr><td>蒸发器</td><td>粘附的细尘与湿气结合成生物膜层</td><td>热交换变差，制冷变弱，耗电上升</td></tr>
          <tr><td>风轮</td><td>扇叶里的灰尘和霉菌</td><td>异味、送风不均，可能出现摇摆异响</td></tr>
          <tr><td>排水盘和排水管</td><td>阴暗潮湿通道里的有机膜</td><td>排水变慢，最后表现为室内机滴水或漏水</td></tr>
          <tr><td>室外冷凝器</td><td>铝翅片上的烟炱层</td><td>散热变差，压缩机更费力，机器运行温度更高</td></tr>
        </tbody>
      </table>
      <p>这些都不是立即损坏，而是加速：潮湿气候里每台冷气都会积累的污垢，在烟霾月份只是提前到来。蒸发器长期不清，翅片积垢可让换热能力下降 15–40%——这就是为什么即使机器还觉得冷，烟霾后也值得做一次检查。</p>

      <h2>烟霾期间该做什么——安全的 DIY 部分</h2>
      <h3>每 1–2 周冲洗一次滤网</h3>
      <p>正常情况下滤网每 2–4 周冲洗一次。重度烟霾日请把间隔减半。关机（或拔插头），取出滤网，用流动水冲洗，甩掉多余水分，在阴凉处完全晾干后装回。湿着装回去的滤网会再次向房间喷尘。这只需约 10 分钟，零成本。</p>
      <h3>关好门窗——并且照常开冷气</h3>
      <p>分体机循环的是室内空气，密封的房间会让已有空气持续循环，而不是被新烟霾替换。在高 PM2.5 的日子，开着冷气通常对室内已有空气更舒适、也更合理。</p>
      <p>要诚实说明一个局限：滤网不是 PM2.5 滤网，它不会把烟从空气里筛掉。如果室外烟霾是主要健康顾虑，HEPA 级空气净化器才是对应工具；冷气的职责是制冷和舒适，滤网保养是它对空气质量的贡献。</p>
      <h3>保持室外机周围清洁</h3>
      <p>检查没有物品靠在室外机上，没有落叶、塑料袋或杂物盖住翅片。您不需要、也不应该在通电状态下自行冲洗冷凝器——专业保养包含正确的翅片清洗。</p>
      <h3>不要连续数周不开机</h3>
      <p>在炎热潮湿的气候里，长期关机的机器会让霉菌在排水盘和蒸发器后方滋生。重度烟霾日后让机器短时运行一次，让内部部件保持干燥。</p>

      <h2>烟霾后的清洗清单——技师实际做什么</h2>
      <p>烟霾散后，专业烟霾后清洗遵循以下顺序（这正是 KL Renovator 技师在吉隆坡与雪兰莪使用的同一套流程）：</p>
      <ol>
        <li><strong>拍照记录与滤网检查</strong>——滤网上的烟炱负荷是内部积垢程度最快的指标。</li>
        <li><strong>滤网深度清洁或更换</strong>——冲洗到出水清澈，滤网破损则更换。</li>
        <li><strong>蒸发器检查</strong>——有烟炱或生物膜时进行高压化学清洗，下方地面与家具铺设防护帆布。</li>
        <li><strong>风轮清洗</strong>——蒸发器后方、霉菌藏身的扇叶。</li>
        <li><strong>排水盘与排水管冲洗</strong>——烟霾季的湿度会加速导致室内滴水的有机堵塞。</li>
        <li><strong>室外冷凝器翅片清洗</strong>——清除翅片上的烟炱与灰尘，让机器恢复正常散热。</li>
        <li><strong>电气检查与制冷测试</strong>——检查接线，运行机器，交接前确认制冷表现。</li>
        <li><strong>书面工作单</strong>——发现了什么、做了什么，以及 1 个月工艺保修条款。</li>
      </ol>

      <h2>烟霾后：基本保养 vs 化学清洗 vs 大修</h2>
      <table>
        <thead><tr><th>烟霾后机器状态</th><th>推荐服务</th><th>公开价格（壁挂式 1.0–1.5 HP）</th></tr></thead>
        <tbody>
          <tr><td>制冷正常、无异味、滤网轻度积尘</td><td>基本保养</td><td>RM 99 起</td></tr>
          <tr><td>烟霾期间长时间运行；有异味、风量变弱，或蒸发器可见烟炱</td><td>高压化学清洗</td><td>RM 120 起</td></tr>
          <tr><td>洗过仍漏水、铜管结冰，或 3 年以上未深度保养</td><td>化学大修（仅限挂壁式冷气）</td><td>RM 420 起</td></tr>
        </tbody>
      </table>
      <p>不确定机器属于哪种情况？参考我们<a href="/zh/blog/diy-aircond-cleaning-vs-chemical-wash-malaysia">自己洗 vs 专业化学清洗指南</a>中诚实的 DIY 分界线，或<a href="/zh/blog/chemical-wash-vs-chemical-overhaul">化学清洗与化学大修对比</a>。您也可以 WhatsApp 发送滤网和机器照片——我们会告诉您真正需要哪个级别。</p>

      <h2>烟霾后价格——KL Renovator 公开价目</h2>
      <p>以下是资料库当前公布的价格。没有"烟霾附加费"：烟霾月份执行同一价格，所有报价在开工前经 WhatsApp 书面确认。</p>
      <table>
        <thead><tr><th>服务</th><th>壁挂式</th><th>天花卡式</th></tr></thead>
        <tbody>
          <tr><td>基本保养</td><td>RM 99 (1.0–1.5 HP) · RM 120 (2.0–2.5 HP) · RM 150 (3.0–3.5 HP)</td><td>RM 150 (1.0–1.5 HP) · RM 200 (2.0–3.0 HP) · RM 250 (3.5–5.0 HP)</td></tr>
          <tr><td>高压化学清洗</td><td>RM 120 (1.0–1.5 HP) · RM 150 (2.0–2.5 HP) · RM 180 (3.0 HP) · RM 200 (4.0–5.0 HP)</td><td>RM 220 (1.0–1.5 HP) · RM 280 (2.0–3.0 HP) · RM 350 (4.0–5.0 HP)</td></tr>
          <tr><td>化学大修（仅限挂壁式冷气）</td><td>RM 420 (1.0–1.5 HP) · RM 490 (2.0–2.5 HP) · RM 560 (3.0–3.5 HP)</td><td>另行上门报价</td></tr>
        </tbody>
      </table>
      <p>年度保养合约（AMC）是防止烟霾季变成问题的最省事方式：AMC Basic 每机每年 RM 299 起，含 2 次基本保养和 1 次化学清洗；AMC Standard RM 499 起，多 1 次化学清洗和免费紧急检查。价格按壁挂式 1.0–1.5 HP 机器计；多台及商用折扣可查询后报价。一次预约 5 台以上还可享 5% 即时预约折扣，10 台以上享 10%。</p>

      <h2>时机：烟霾季前、中、后</h2>
      <p>马来西亚的跨境烟霾通常 8–10 月最严重，但施工、交通和本地来源的细尘全年都存在——繁忙走廊旁的机器即使无霾月份也会很快变脏。能同时保护舒适与钱包的安排：</p>
      <ul>
        <li><strong>烟霾高峰前（7–8 月）：</strong>预约年度化学清洗，让蒸发器以干净状态进入烟霾季。</li>
        <li><strong>重度烟霾日：</strong>每 1–2 周冲洗滤网，关窗，保持室外机周围清洁。</li>
        <li><strong>烟霾散后：</strong>让机器短时运行烘干内部，再预约烟霾后检查——一切轻度就约基本保养，有异味或风量变弱就约化学清洗。</li>
        <li><strong>AMC 客户：</strong>无需安排——合约的上门周期已覆盖，并会收到 WhatsApp 提醒。</li>
      </ul>
      <p>无论有无烟霾，机器本身需要的保养间隔可参考<a href="/zh/blog/how-often-service-aircond-malaysia">马来西亚冷气应该多久保养一次</a>和<a href="/zh/blog/aircond-maintenance-checklist-malaysia">12 项保养检查清单</a>。</p>

      <h2>吉隆坡与雪兰莪本地烟霾后服务范围</h2>
      <p>KL Renovator 在吉隆坡与雪兰莪各地处理烟霾后清洗报修，包括八打灵再也、莎阿南、梳邦再也、蒲种、巴生、安邦、蕉赖、加影、Mont Kiara、Bangsar、Setapak、Kepong、黑风洞、士拉央、万挠、布城和 Cyberjaya。查看<a href="/zh/areas/kuala-lumpur">吉隆坡冷气服务范围</a>或<a href="/zh/areas/petaling-jaya">八打灵再也服务范围</a>。</p>
      <p>营业时间为星期一至星期日，早上 9 点至傍晚 6 点。当天时段通常视技师路线而定。KL Renovator 以 Multicore Dynamics Resources（SSM 003765188-T）名义运营，服务本网站列出的全部 20 个品牌，符合条件的工艺享 1 个月书面保修。</p>

      <h2>常见问题</h2>
      <h3>烟霾会损坏冷气吗？</h3>
      <p>烟霾不会立即损坏健康的冷气，但它在滤网、蒸发器、风轮和室外翅片上沉积的细烟炱，会增加本来保养计划就要清除的积垢量。机器在重度烟霾中开机而滤网不冲洗的时间越长，风量和制冷下降得越快，化学清洗也会更早被需要。</p>

      <h3>冷气会积多少烟霾粉尘？</h3>
      <p>取决于机器、运行时长和烟霾强度，所以没有固定数字。实际可见的信号是：滤网几天内出现灰膜、风量变小、有异味，或室外翅片有尘。如果您的滤网在烟霾期间每 1–2 周就脏了，内部部件很可能已积累更多。</p>

      <h3>烟霾后我可以自己清洗冷气吗？</h3>
      <p>冲洗滤网是安全的 DIY 工作——烟霾日每 1–2 周一次。但蒸发器、风轮、排水路径和室外冷凝器的正确清洁需要带防护帆布的高压化学清洗，这部分请交给技师。</p>

      <h3>烟霾期间应该开冷气还是关机？</h3>
      <p>关好门窗并照常运行。分体机循环的是室内空气，房间密封时不会吸入室外空气，所以它持续循环的是您已有的空气。在高 PM2.5 日开窗，等于用新烟霾替换它。滤网不是 PM2.5 滤网——如果室外烟雾是主要健康顾虑，请搭配 HEPA 级空气净化器。</p>

      <h3>烟霾季滤网多久冲洗一次？</h3>
      <p>重度烟霾期间每 1–2 周一次，而非平时的 2–4 周。关机（或拔插头）、取出滤网、用流动水冲洗、甩掉多余水分、在阴凉处完全晾干后装回。湿着装回的滤网每次开机都会再次向房间喷尘。</p>

      <h3>烟霾后该约哪种服务——基本保养还是化学清洗？</h3>
      <p>机器在烟霾期间制冷正常且无异味，约基本保养（RM 99 起）。若它整个烟霾期长时间运行，现在出现异味、风量变弱或蒸发器可见重度烟炱，约高压化学清洗（壁挂式 1.0–1.5 HP 为 RM 120 起）。洗后仍漏水、铜管结冰或 3 年以上未深度保养的机器，则需化学大修（仅限挂壁式，RM 420 起）。</p>

      <h3>烟霾后化学清洗需要多久？</h3>
      <p>壁挂式机器约 45–90 分钟/台，含防护帆布、滤网清洗、排水冲洗和完工后的制冷测试。天花卡式通常 90–120 分钟。吉隆坡与雪兰莪当天时段通常可约。</p>

      <h3>KL Renovator 烟霾季会加价吗？</h3>
      <p>不会。执行同一公开价目——基本保养 RM 99 起，壁挂式 1.0–1.5 HP 高压化学清洗 RM 120 起——每个价格都在开工前经 WhatsApp 书面确认。5 台以上享 5% 即时预约折扣，10 台以上享 10%。</p>

      <h3>哪几个月烟霾会影响冷气清洗？</h3>
      <p>马来西亚跨境烟霾通常 8–10 月最严重，但施工、交通与本地来源的细尘全年都有，所以繁忙走廊旁的机器即使无霾月份也会很快变脏。只要细尘负荷高，同一套烟霾后检查清单都适用。</p>

      <h3>KL Renovator 能服务我的冷气品牌吗？</h3>
      <p>可以。KL Renovator 服务本网站列出的 20 个品牌，包括 Daikin、Panasonic、Mitsubishi、Acson、York、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL 与 Isonic，覆盖吉隆坡与雪兰莪。</p>

      <h2>预约您的烟霾后清洗</h2>
      <p>最便宜的烟霾后保养，是您在烟霾来之前就做过的那一次。如果烟霾已经来了：本周冲洗滤网，烟霾散后把位置、机型和 HP 发到 WhatsApp <strong>+60 18-298 3573</strong> 获取确认的价格与时段——或使用<a href="/zh/book">在线预约表格</a>。相关内容：<a href="/zh/services/chemical-wash">高压化学清洗服务</a> · <a href="/zh/services/basic-servicing">基本保养</a> · <a href="/zh/problems/aircond-bad-smell">冷气异味</a> · <a href="/zh/problems/aircond-weak-airflow">风量不足</a> · <a href="/zh/tools">冷气诊断工具</a> · <a href="/zh/near-me">吉隆坡与雪兰莪附近的冷气技师</a>。</p>
    `,
  },
];
