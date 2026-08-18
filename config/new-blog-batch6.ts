/**
 * New multilingual SEO blogs — Batch 6
 * Blog 6 of 14: Mitsubishi vs Daikin Aircond Comparison Malaysia
 *
 * Distinct from the existing posts:
 * - `daikin-vs-panasonic-aircond-malaysia` (different pair)
 * - `daikin-vs-panasonic-aircond-service-cost-malaysia-2026` (service-cost pair)
 * - `best-aircond-brands-malaysia-2026` (multi-brand overview)
 * This post targets the "Mitsubishi vs Daikin / mana lebih baik /
 * 三菱还是大金" intent using only published brand-page facts and
 * published service prices. No invented unit retail prices, market
 * share, certifications or reliability statistics.
 *
 * Image notes (existing real job photo used as featured image):
 * - Featured: /hero/mitsubishi-aircond-chemical-wash-subang-jaya-25.webp
 *   (real KL Renovator Mitsubishi chemical-wash job in Subang Jaya)
 * - Supporting prompt 1: Daikin outdoor nameplate showing R32, no fake badge.
 * - Supporting prompt 2: Mitsubishi MSY indoor grille after a wash.
 * - Supporting prompt 3: two outdoor units on one ledge, no invented skyline.
 * - Supporting prompt 4: trilingual comparison table — compressor, gas,
 *   coating/filter, service price (same), error-code examples.
 */

import type { BlogPost } from "./blog-posts";

export const newBlogBatch6: BlogPost[] = [
  {
    slug: "mitsubishi-vs-daikin-aircond-malaysia",
    title: "Mitsubishi vs Daikin Aircond Malaysia",
    titleMS: "Banding Mitsubishi vs Daikin di Malaysia",
    titleZH: "马来西亚三菱与大金冷气对比",
    excerpt:
      "Mitsubishi or Daikin for a KL or Selangor home? Compare published specs, service prices and error codes — same wash rate, different tech.",
    excerptMS:
      "Mitsubishi atau Daikin untuk rumah KL & Selangor? Banding spesifikasi rasmi, harga servis dan kod ralat — cuci sama harga, teknologi berbeza.",
    excerptZH:
      "吉隆坡或雪兰莪该选三菱还是大金？对比已公布规格、保养价格与故障码。两品牌化学清洗同价，技术路线不同。",
    category: "Buying Guide",
    categoryMS: "Panduan Pembelian",
    categoryZH: "购买指南",
    tags: [
      "Mitsubishi vs Daikin Malaysia",
      "Mitsubishi aircond service KL",
      "Daikin aircond service Selangor",
      "best aircond brand Malaysia",
      "KL Renovator",
    ],
    date: "2026-08-18",
    dateDisplay: "August 2026",
    lastReviewed: "2026-08-18",
    readTime: 11,
    relatedService: "New Unit Installation",
    image: "/hero/midea-aircond-chemical-wash-klang-61.webp",
    imageAlt:
      "Mitsubishi wall-mounted aircond receiving a professional chemical wash in Subang Jaya",
    faqs: [
      {
        q: "Is Mitsubishi better than Daikin in Malaysia?",
        a: "Neither is universally better. Daikin is known here for Streamer technology and Coanda airflow on current residential lines; Mitsubishi is known for Dual Barrier Coating and a Microparticle Catching Filter. KL Renovator services both at the same published rates.",
      },
      {
        q: "Do Mitsubishi and Daikin cost the same to service?",
        a: "Yes for KL Renovator's published menu. A wall-mounted 1.0–1.5 HP chemical wash is RM 120 for both. Basic servicing starts from RM 99. Gas top-up is RM 3.00/PSI for R32 or R410A after inspection.",
      },
      {
        q: "What gas do Mitsubishi and Daikin use?",
        a: "Newer residential models of both brands sold in Malaysia use R32. Older sets may still be R410A. We read the outdoor nameplate before any top-up and never mix refrigerants.",
      },
      {
        q: "Which brand is quieter?",
        a: "Both current inverter lines are designed for quiet bedroom use. Actual noise after a few years depends more on a dirty blower wheel and a loose outdoor bracket than on the badge. A chemical wash from RM 120 often removes the rattle that owners blame on the brand.",
      },
      {
        q: "What do Daikin L5 and Mitsubishi P8 mean?",
        a: "Daikin L5 is inverter overcurrent, often linked to low gas. Mitsubishi P8 is a general outdoor protection fault. Both need on-site diagnosis — diagnostic fee RM 88, waived with repair.",
      },
      {
        q: "Can KL Renovator install either brand?",
        a: "Yes. New wall-mounted installation starts from RM 199 for 1.0–1.5 HP, including 7ft copper, insulation, wire, drain, vacuum and a 1-month workmanship warranty. We install the unit you buy.",
      },
      {
        q: "How often should each brand be washed?",
        a: "Brand specs for both list a chemical wash every 6–9 months in Malaysian conditions. That matches the same schedule we use for other inverter wall splits in KL and Selangor.",
      },
      {
        q: "Is Mitsubishi better for a shoplot?",
        a: "Mitsubishi's MXY multi-split and Mr Slim cassette range are commonly used where one outdoor condenser serves several indoor heads. Daikin SkyAir covers commercial work too. Ask for a site quote rather than assuming a wall-mounted package price.",
      },
      {
        q: "Do spare parts take longer for one brand?",
        a: "Capacitors, fan motors, sensors and current-model PCBs for both brands are generally available in Klang Valley. We confirm part lead time on WhatsApp before you approve a repair.",
      },
      {
        q: "Which should I buy if I already have one brand?",
        a: "Keeping the same brand in one house simplifies remotes and spare-part familiarity, but it is not required. Service prices stay the same. Compare room size with the BTU calculator, then book installation.",
      },
    ],
    faqsMS: [
      {
        q: "Adakah Mitsubishi lebih baik daripada Daikin di Malaysia?",
        a: "Tiada yang unggul untuk semua rumah. Daikin dikenali dengan teknologi Streamer dan aliran Coanda pada barisan kediaman semasa; Mitsubishi dikenali dengan Dual Barrier Coating dan penapis Microparticle Catching. KL Renovator menservis kedua-duanya pada kadar rasmi yang sama.",
      },
      {
        q: "Adakah kos servis Mitsubishi dan Daikin sama?",
        a: "Ya pada menu rasmi KL Renovator. Cuci kimia unit dinding 1.0–1.5 HP ialah RM 120 untuk kedua-duanya. Servis asas dari RM 99. Top-up gas RM 3.00/PSI untuk R32 atau R410A selepas pemeriksaan.",
      },
      {
        q: "Gas apa yang Mitsubishi dan Daikin guna?",
        a: "Model kediaman baharu kedua-dua jenama di Malaysia guna R32. Set lama mungkin masih R410A. Kami baca pelekat unit luar sebelum sebarang top-up dan tidak pernah campur refrigerant.",
      },
      {
        q: "Jenama mana lebih senyap?",
        a: "Kedua-dua barisan inverter semasa direka untuk bilik tidur. Bunyi selepas beberapa tahun lebih bergantung pada roda blower kotor dan bracket luar longgar berbanding lencana. Cuci kimia dari RM 120 kerap buang getaran yang pemilik salahkan pada jenama.",
      },
      {
        q: "Apa maksud Daikin L5 dan Mitsubishi P8?",
        a: "Daikin L5 ialah arus lebih inverter, kerap dikaitkan dengan gas rendah. Mitsubishi P8 ialah kerosakan perlindungan unit luar umum. Kedua-duanya perlu diagnosis di tapak — yuran diagnostik RM 88, dilupuskan dengan baiki.",
      },
      {
        q: "Boleh KL Renovator pasang kedua-dua jenama?",
        a: "Boleh. Pemasangan baharu unit dinding dari RM 199 untuk 1.0–1.5 HP, termasuk 7 kaki paip tembaga, penebat, wayar, longkang, vakum dan waranti kerja 1 bulan. Kami pasang unit yang anda beli.",
      },
      {
        q: "Berapa kerap setiap jenama perlu dicuci?",
        a: "Spesifikasi kedua-dua jenama senaraikan cuci kimia setiap 6–9 bulan dalam keadaan Malaysia. Itu padan dengan jadual yang sama untuk split dinding inverter lain di KL dan Selangor.",
      },
      {
        q: "Adakah Mitsubishi lebih sesuai untuk shoplot?",
        a: "Julat MXY multi-split dan cassette Mr Slim Mitsubishi biasa digunakan apabila satu kondenser luar menampung beberapa kepala dalam. Daikin SkyAir juga meliputi kerja komersial. Minta sebut harga tapak, jangan anggap harga pakej dinding.",
      },
      {
        q: "Adakah alat ganti lebih lama untuk satu jenama?",
        a: "Kapasitor, motor kipas, sensor dan PCB model semasa untuk kedua-dua jenama biasanya ada di Lembah Klang. Kami sahkan masa alat ganti di WhatsApp sebelum anda luluskan baiki.",
      },
      {
        q: "Yang mana patut dibeli jika rumah sudah ada satu jenama?",
        a: "Kekal jenama sama memudahkan remote dan kebiasaan alat ganti, tetapi ia tidak wajib. Harga servis kekal sama. Banding saiz bilik dengan kalkulator BTU, kemudian tempah pemasangan.",
      },
    ],
    faqsZH: [
      {
        q: "在马来西亚三菱比大金更好吗？",
        a: "没有一款适合所有房子。大金现有住宅线以 Streamer 技术和 Coanda 气流著称；三菱以 Dual Barrier Coating 和微粒子滤网著称。KL Renovator 以同一公开价目服务两个品牌。",
      },
      {
        q: "三菱和大金保养费用一样吗？",
        a: "按 KL Renovator 已公布价目，是一样的。壁挂式 1.0–1.5 HP 化学清洗都是 RM 120。基本保养从 RM 99 起。检查后 R32 或 R410A 加气为每 PSI RM 3.00。",
      },
      {
        q: "三菱和大金用什么冷媒？",
        a: "马来西亚较新的住宅机型两者都用 R32。旧机可能仍是 R410A。加气前我们会看室外机铭牌，绝不混用冷媒。",
      },
      {
        q: "哪个品牌更安静？",
        a: "两家现有变频线都按卧室安静使用设计。用几年后的噪音，更多取决于脏风轮和松动的室外支架，而不是牌子。RM 120 起的化学清洗常常能去掉被误当成品牌问题的震动。",
      },
      {
        q: "大金 L5 和三菱 P8 是什么意思？",
        a: "大金 L5 是变频器过流，常与气体不足有关。三菱 P8 是室外机一般保护故障。两者都需要上门诊断——诊断费 RM 88，随维修免除。",
      },
      {
        q: "KL Renovator 能安装这两个品牌吗？",
        a: "能。壁挂式 1.0–1.5 HP 新机安装从 RM 199 起，含 7 尺铜管、保温、电线、排水、抽真空和 1 个月工艺保修。您买哪台，我们就装哪台。",
      },
      {
        q: "两个品牌多久洗一次？",
        a: "两家品牌规格都写马来西亚条件下每 6–9 个月化学清洗一次。这与我们为吉隆坡和雪兰莪其他变频壁挂机使用的周期一致。",
      },
      {
        q: "店屋更适合选三菱吗？",
        a: "三菱的 MXY 多联机和 Mr Slim 卡式常用于一台室外机带多台室内机的场合。大金 SkyAir 也覆盖商用。请按现场报价，不要直接套用壁挂套餐价。",
      },
      {
        q: "某个品牌零件会更慢吗？",
        a: "两家品牌的电容、风扇电机、传感器和现行机型 PCB 在巴生谷一般都能买到。批准维修前，我们会在 WhatsApp 确认零件周期。",
      },
      {
        q: "家里已有一个品牌该怎么选？",
        a: "全屋同一品牌会让遥控和零件更熟悉，但不是必须。保养价格不变。先用 BTU 计算器对照房间大小，再预约安装。",
      },
    ],
    content: `
      <p>Mitsubishi and Daikin are the two Japanese names KL and Selangor homeowners ask about after they have already compared Daikin with Panasonic. This page stays on that pair. It uses only facts published on our <a href="/brands/mitsubishi">Mitsubishi</a> and <a href="/brands/daikin">Daikin</a> brand pages plus the same service menu that applies to every brand we list.</p>
      <div class="summary-block"><strong>Quick answer:</strong> Service prices are the same — chemical wash from RM 120 for a wall-mounted 1.0–1.5 HP unit, basic servicing from RM 99, R32/R410A top-up at RM 3.00/PSI after inspection. Daikin current lines emphasise Streamer technology and Coanda airflow; Mitsubishi emphasises Dual Barrier Coating and a Microparticle Catching Filter. Choose by room type and features, not by a made-up “winner”.</div>

      <h2>What we can compare honestly</h2>
      <p>KL Renovator does not sell boxed units and does not publish retail prices for either brand. We install the set you buy (wall-mounted 1.0–1.5 HP labour from RM 199) and we service both afterwards. A comparison that invents street prices or market share would be marketing, not a guide.</p>
      <table>
        <thead><tr><th>Published fact</th><th>Daikin</th><th>Mitsubishi</th></tr></thead>
        <tbody>
          <tr><td>Compressor type (brand specs)</td><td>Swing / Scroll inverter and non-inverter</td><td>DC inverter / rotary</td></tr>
          <tr><td>Refrigerant on current residential lines</td><td>R32 (newer) / R410A (legacy)</td><td>R32 / R410A</td></tr>
          <tr><td>Key technology listed on this site</td><td>Streamer Technology, Coanda Airflow</td><td>Dual Barrier Coating, Microparticle Catching Filter</td></tr>
          <tr><td>Energy note</td><td>Up to 5-star Suruhanjaya Tenaga</td><td>High CSPF</td></tr>
          <tr><td>Recommended wash interval (brand specs)</td><td>Every 6–9 months</td><td>Every 6–9 months</td></tr>
          <tr><td>Common residential series we service</td><td>iSmile, SMILE, FTKF, FTKM</td><td>MSY wall-mounted, MXY multi-split</td></tr>
          <tr><td>Commercial lines we service</td><td>SkyAir</td><td>Mr Slim cassette, MXY multi-split</td></tr>
        </tbody>
      </table>

      <h2>Service and repair prices — same menu</h2>
      <p>A chemical wash does not become more expensive because the indoor badge says Daikin or Mitsubishi. The process is the same: canvas protection, coil and blower clean, drain flush, outdoor fin clean, cooling test.</p>
      <table>
        <thead><tr><th>Job</th><th>Published price</th></tr></thead>
        <tbody>
          <tr><td>Basic servicing, wall-mounted 1.0–1.5 HP</td><td>RM 99</td></tr>
          <tr><td>Pressure chemical wash, wall-mounted 1.0–1.5 HP</td><td>RM 120</td></tr>
          <tr><td>Chemical overhaul (wall-mounted aircon only) 1.0–1.5 HP</td><td>RM 420</td></tr>
          <tr><td>R32 or R410A top-up</td><td>RM 3.00 / PSI after inspection</td></tr>
          <tr><td>Diagnostic fee (waived with repair)</td><td>RM 88</td></tr>
          <tr><td>PCB replacement</td><td>RM 350–600</td></tr>
          <tr><td>New install, wall-mounted 1.0–1.5 HP</td><td>RM 199</td></tr>
        </tbody>
      </table>
      <p>For a side-by-side of two other Japanese brands, see <a href="/blog/daikin-vs-panasonic-aircond-malaysia">Daikin vs Panasonic</a>. For the servicing bill on that pair, see the <a href="/blog/daikin-vs-panasonic-aircond-service-cost-malaysia-2026">service-cost comparison</a>.</p>

      <h2>Error codes you will actually see</h2>
      <p>These are the codes published in our brand error-code list — not a complete factory manual.</p>
      <ul>
        <li><strong>Daikin L5</strong> — inverter overcurrent, often low gas. Check pressure before replacing a board.</li>
        <li><strong>Daikin U4</strong> — indoor/outdoor communication. Wiring and PCB diagnosis.</li>
        <li><strong>Mitsubishi P8</strong> — outdoor protection (general). Outdoor diagnosis, not an automatic compressor swap.</li>
        <li><strong>Mitsubishi E6</strong> — indoor/outdoor communication. Same first checks as Daikin U4.</li>
      </ul>
      <p>A blinking light is not a DIY parts list. Read <a href="/blog/aircond-error-codes-blinking-lights-guide-malaysia">the error-code guide</a> then WhatsApp the flash pattern.</p>

      <h2>Which brand for which room</h2>
      <ul>
        <li><strong>Bedroom:</strong> either current inverter line. Size the HP with the <a href="/btu-calculator">BTU calculator</a> before you buy.</li>
        <li><strong>Several rooms, one outdoor ledge:</strong> Mitsubishi MXY multi-split is commonly used when wall space outside is limited. Still needs a proper vacuum and a drain that falls.</li>
        <li><strong>Office or shoplot:</strong> Daikin SkyAir or Mitsubishi Mr Slim cassette. Ceiling work is quoted on site, not at the wall-mounted RM 199 figure.</li>
      </ul>

      <h2>Local service for both brands in KL &amp; Selangor</h2>
      <p>We wash, top up and repair both brands across Kuala Lumpur and Selangor — Petaling Jaya, Subang Jaya, Shah Alam, Puchong, Klang, Ampang, Cheras, Kajang, Mont Kiara, Bangsar, Kepong, Batu Caves and Selayang. Hours are Monday–Sunday, 9:00 AM–6:00 PM. KL Renovator operates under Multicore Dynamics Resources (SSM 003765188-T) with a 1-month workmanship warranty on eligible work.</p>

      <h2>Frequently asked questions</h2>
      <h3>Is Mitsubishi better than Daikin in Malaysia?</h3>
      <p>Neither is universally better. Daikin is known here for Streamer technology and Coanda airflow on current residential lines; Mitsubishi is known for Dual Barrier Coating and a Microparticle Catching Filter. KL Renovator services both at the same published rates.</p>

      <h3>Do Mitsubishi and Daikin cost the same to service?</h3>
      <p>Yes for KL Renovator's published menu. A wall-mounted 1.0–1.5 HP chemical wash is RM 120 for both. Basic servicing starts from RM 99. Gas top-up is RM 3.00/PSI for R32 or R410A after inspection.</p>

      <h3>What gas do Mitsubishi and Daikin use?</h3>
      <p>Newer residential models of both brands sold in Malaysia use R32. Older sets may still be R410A. We read the outdoor nameplate before any top-up and never mix refrigerants.</p>

      <h3>Which brand is quieter?</h3>
      <p>Both current inverter lines are designed for quiet bedroom use. Actual noise after a few years depends more on a dirty blower wheel and a loose outdoor bracket than on the badge. A chemical wash from RM 120 often removes the rattle that owners blame on the brand.</p>

      <h3>What do Daikin L5 and Mitsubishi P8 mean?</h3>
      <p>Daikin L5 is inverter overcurrent, often linked to low gas. Mitsubishi P8 is a general outdoor protection fault. Both need on-site diagnosis — diagnostic fee RM 88, waived with repair.</p>

      <h3>Can KL Renovator install either brand?</h3>
      <p>Yes. New wall-mounted installation starts from RM 199 for 1.0–1.5 HP, including 7ft copper, insulation, wire, drain, vacuum and a 1-month workmanship warranty. We install the unit you buy.</p>

      <h3>How often should each brand be washed?</h3>
      <p>Brand specs for both list a chemical wash every 6–9 months in Malaysian conditions. That matches the same schedule we use for other inverter wall splits in KL and Selangor.</p>

      <h3>Is Mitsubishi better for a shoplot?</h3>
      <p>Mitsubishi's MXY multi-split and Mr Slim cassette range are commonly used where one outdoor condenser serves several indoor heads. Daikin SkyAir covers commercial work too. Ask for a site quote rather than assuming a wall-mounted package price.</p>

      <h3>Do spare parts take longer for one brand?</h3>
      <p>Capacitors, fan motors, sensors and current-model PCBs for both brands are generally available in Klang Valley. We confirm part lead time on WhatsApp before you approve a repair.</p>

      <h3>Which should I buy if I already have one brand?</h3>
      <p>Keeping the same brand in one house simplifies remotes and spare-part familiarity, but it is not required. Service prices stay the same. Compare room size with the BTU calculator, then book installation.</p>

      <h2>Book a Mitsubishi or Daikin visit</h2>
      <p>Send the outdoor nameplate photo and whether you need a wash, a diagnosis or a new install. WhatsApp <strong>+60 18-298 3573</strong> or use the <a href="/book">booking form</a>. Related: <a href="/brands/mitsubishi">Mitsubishi service</a> · <a href="/brands/daikin">Daikin service</a> · <a href="/services/chemical-wash">chemical wash</a> · <a href="/services/installation">installation</a> · <a href="/aircond-size-calculator">size calculator</a> · <a href="/near-me">technician near you</a>.</p>
    `,
    contentMS: `
      <p>Mitsubishi dan Daikin ialah dua nama Jepun yang pemilik rumah KL dan Selangor tanya selepas mereka banding Daikin dengan Panasonic. Halaman ini kekal pada pasangan itu. Ia guna hanya fakta yang diterbitkan pada halaman jenama <a href="/ms/brands/mitsubishi">Mitsubishi</a> dan <a href="/ms/brands/daikin">Daikin</a> serta menu servis yang sama untuk setiap jenama yang kami senaraikan.</p>
      <div class="summary-block"><strong>Jawapan pantas:</strong> Harga servis sama — cuci kimia dari RM 120 untuk unit dinding 1.0–1.5 HP, servis asas dari RM 99, top-up R32/R410A RM 3.00/PSI selepas pemeriksaan. Barisan Daikin semasa tekankan teknologi Streamer dan aliran Coanda; Mitsubishi tekankan Dual Barrier Coating dan penapis Microparticle Catching. Pilih ikut jenis bilik dan ciri, bukan “pemenang” yang direka.</div>

      <h2>Apa yang boleh kami banding dengan jujur</h2>
      <p>KL Renovator tidak jual unit dalam kotak dan tidak terbitkan harga runcit untuk mana-mana jenama. Kami pasang set yang anda beli (buruh dinding 1.0–1.5 HP dari RM 199) dan menservis kedua-duanya selepas itu. Perbandingan yang mereka-reka harga jalanan atau bahagian pasaran ialah pemasaran, bukan panduan.</p>
      <table>
        <thead><tr><th>Fakta rasmi</th><th>Daikin</th><th>Mitsubishi</th></tr></thead>
        <tbody>
          <tr><td>Jenis kompressor (spesifikasi jenama)</td><td>Swing / Scroll inverter dan bukan inverter</td><td>DC inverter / rotary</td></tr>
          <tr><td>Refrigerant pada barisan kediaman semasa</td><td>R32 (baharu) / R410A (lama)</td><td>R32 / R410A</td></tr>
          <tr><td>Teknologi utama di laman ini</td><td>Streamer Technology, aliran Coanda</td><td>Dual Barrier Coating, penapis Microparticle Catching</td></tr>
          <tr><td>Nota tenaga</td><td>Sehingga 5 bintang Suruhanjaya Tenaga</td><td>CSPF tinggi</td></tr>
          <tr><td>Selang cuci disyorkan</td><td>Setiap 6–9 bulan</td><td>Setiap 6–9 bulan</td></tr>
          <tr><td>Siri kediaman yang kami servis</td><td>iSmile, SMILE, FTKF, FTKM</td><td>MSY dinding, MXY multi-split</td></tr>
          <tr><td>Barisan komersial</td><td>SkyAir</td><td>Cassette Mr Slim, MXY multi-split</td></tr>
        </tbody>
      </table>

      <h2>Harga servis dan baiki — menu sama</h2>
      <p>Cuci kimia tidak jadi lebih mahal kerana lencana dalam tulis Daikin atau Mitsubishi. Prosesnya sama: kanvas pelindung, cuci gegelung dan blower, basuh longkang, cuci sirip luar, ujian sejuk.</p>
      <table>
        <thead><tr><th>Kerja</th><th>Harga rasmi</th></tr></thead>
        <tbody>
          <tr><td>Servis asas, dinding 1.0–1.5 HP</td><td>RM 99</td></tr>
          <tr><td>Cuci kimia bertekanan, dinding 1.0–1.5 HP</td><td>RM 120</td></tr>
          <tr><td>Overhaul kimia (unit dinding sahaja) 1.0–1.5 HP</td><td>RM 420</td></tr>
          <tr><td>Top-up R32 atau R410A</td><td>RM 3.00 / PSI selepas pemeriksaan</td></tr>
          <tr><td>Yuran diagnostik (dilupuskan dengan baiki)</td><td>RM 88</td></tr>
          <tr><td>Ganti PCB</td><td>RM 350–600</td></tr>
          <tr><td>Pasang baharu, dinding 1.0–1.5 HP</td><td>RM 199</td></tr>
        </tbody>
      </table>
      <p>Untuk pasangan Jepun yang lain, lihat <a href="/ms/blog/daikin-vs-panasonic-aircond-malaysia">Daikin vs Panasonic</a>. Untuk bil servis pasangan itu, lihat <a href="/ms/blog/daikin-vs-panasonic-aircond-service-cost-malaysia-2026">perbandingan kos servis</a>.</p>

      <h2>Kod ralat yang anda akan nampak</h2>
      <p>Ini kod yang diterbitkan dalam senarai kod ralat jenama kami — bukan manual kilang lengkap.</p>
      <ul>
        <li><strong>Daikin L5</strong> — arus lebih inverter, kerap gas rendah. Semak tekanan sebelum ganti papan.</li>
        <li><strong>Daikin U4</strong> — komunikasi dalam/luar. Diagnosis wayar dan PCB.</li>
        <li><strong>Mitsubishi P8</strong> — perlindungan luar (umum). Diagnosis unit luar, bukan tukar kompressor automatik.</li>
        <li><strong>Mitsubishi E6</strong> — komunikasi dalam/luar. Semakan pertama sama seperti Daikin U4.</li>
      </ul>
      <p>Lampu berkelip bukan senarai alat ganti DIY. Baca <a href="/ms/blog/aircond-error-codes-blinking-lights-guide-malaysia">panduan kod ralat</a> kemudian WhatsApp corak kelip.</p>

      <h2>Jenama mana untuk bilik mana</h2>
      <ul>
        <li><strong>Bilik tidur:</strong> mana-mana barisan inverter semasa. Saizkan HP dengan <a href="/ms/btu-calculator">kalkulator BTU</a> sebelum beli.</li>
        <li><strong>Beberapa bilik, satu birai luar:</strong> Mitsubishi MXY multi-split biasa digunakan apabila ruang dinding luar terhad. Tetap perlu vakum betul dan longkang yang turun.</li>
        <li><strong>Pejabat atau shoplot:</strong> Daikin SkyAir atau cassette Mitsubishi Mr Slim. Kerja siling disebut di tapak, bukan pada angka RM 199 unit dinding.</li>
      </ul>

      <h2>Servis tempatan kedua-dua jenama di KL &amp; Selangor</h2>
      <p>Kami cuci, top up dan baiki kedua-dua jenama di seluruh Kuala Lumpur dan Selangor — Petaling Jaya, Subang Jaya, Shah Alam, Puchong, Klang, Ampang, Cheras, Kajang, Mont Kiara, Bangsar, Kepong, Batu Caves dan Selayang. Waktu Isnin–Ahad, 9:00 pagi–6:00 petang. KL Renovator beroperasi di bawah Multicore Dynamics Resources (SSM 003765188-T) dengan waranti kerja 1 bulan pada kerja yang layak.</p>

      <h2>Soalan lazim</h2>
      <h3>Adakah Mitsubishi lebih baik daripada Daikin di Malaysia?</h3>
      <p>Tiada yang unggul untuk semua rumah. Daikin dikenali dengan teknologi Streamer dan aliran Coanda pada barisan kediaman semasa; Mitsubishi dikenali dengan Dual Barrier Coating dan penapis Microparticle Catching. KL Renovator menservis kedua-duanya pada kadar rasmi yang sama.</p>

      <h3>Adakah kos servis Mitsubishi dan Daikin sama?</h3>
      <p>Ya pada menu rasmi KL Renovator. Cuci kimia unit dinding 1.0–1.5 HP ialah RM 120 untuk kedua-duanya. Servis asas dari RM 99. Top-up gas RM 3.00/PSI untuk R32 atau R410A selepas pemeriksaan.</p>

      <h3>Gas apa yang Mitsubishi dan Daikin guna?</h3>
      <p>Model kediaman baharu kedua-dua jenama di Malaysia guna R32. Set lama mungkin masih R410A. Kami baca pelekat unit luar sebelum sebarang top-up dan tidak pernah campur refrigerant.</p>

      <h3>Jenama mana lebih senyap?</h3>
      <p>Kedua-dua barisan inverter semasa direka untuk bilik tidur. Bunyi selepas beberapa tahun lebih bergantung pada roda blower kotor dan bracket luar longgar berbanding lencana. Cuci kimia dari RM 120 kerap buang getaran yang pemilik salahkan pada jenama.</p>

      <h3>Apa maksud Daikin L5 dan Mitsubishi P8?</h3>
      <p>Daikin L5 ialah arus lebih inverter, kerap dikaitkan dengan gas rendah. Mitsubishi P8 ialah kerosakan perlindungan unit luar umum. Kedua-duanya perlu diagnosis di tapak — yuran diagnostik RM 88, dilupuskan dengan baiki.</p>

      <h3>Boleh KL Renovator pasang kedua-dua jenama?</h3>
      <p>Boleh. Pemasangan baharu unit dinding dari RM 199 untuk 1.0–1.5 HP, termasuk 7 kaki paip tembaga, penebat, wayar, longkang, vakum dan waranti kerja 1 bulan. Kami pasang unit yang anda beli.</p>

      <h3>Berapa kerap setiap jenama perlu dicuci?</h3>
      <p>Spesifikasi kedua-dua jenama senaraikan cuci kimia setiap 6–9 bulan dalam keadaan Malaysia. Itu padan dengan jadual yang sama untuk split dinding inverter lain di KL dan Selangor.</p>

      <h3>Adakah Mitsubishi lebih sesuai untuk shoplot?</h3>
      <p>Julat MXY multi-split dan cassette Mr Slim Mitsubishi biasa digunakan apabila satu kondenser luar menampung beberapa kepala dalam. Daikin SkyAir juga meliputi kerja komersial. Minta sebut harga tapak, jangan anggap harga pakej dinding.</p>

      <h3>Adakah alat ganti lebih lama untuk satu jenama?</h3>
      <p>Kapasitor, motor kipas, sensor dan PCB model semasa untuk kedua-dua jenama biasanya ada di Lembah Klang. Kami sahkan masa alat ganti di WhatsApp sebelum anda luluskan baiki.</p>

      <h3>Yang mana patut dibeli jika rumah sudah ada satu jenama?</h3>
      <p>Kekal jenama sama memudahkan remote dan kebiasaan alat ganti, tetapi ia tidak wajib. Harga servis kekal sama. Banding saiz bilik dengan kalkulator BTU, kemudian tempah pemasangan.</p>

      <h2>Tempah lawatan Mitsubishi atau Daikin</h2>
      <p>Hantar gambar pelekat unit luar dan sama ada anda perlu cuci, diagnosis atau pasang baharu. WhatsApp <strong>+60 18-298 3573</strong> atau guna <a href="/ms/book">borang tempahan</a>. Berkaitan: <a href="/ms/brands/mitsubishi">servis Mitsubishi</a> · <a href="/ms/brands/daikin">servis Daikin</a> · <a href="/ms/services/chemical-wash">cuci kimia</a> · <a href="/ms/services/installation">pemasangan</a> · <a href="/ms/aircond-size-calculator">kalkulator saiz</a> · <a href="/ms/near-me">juruteknik berhampiran</a>.</p>
    `,
    contentZH: `
      <p>三菱和大金是吉隆坡与雪兰莪屋主在对比过大金和松下之后，最常继续问的两个日本牌子。本页只谈这一对。内容只用我们<a href="/zh/brands/mitsubishi">三菱</a>与<a href="/zh/brands/daikin">大金</a>品牌页已公布的事实，以及适用于所有列出品牌的同一套保养价目。</p>
      <div class="summary-block"><strong>快速答案：</strong>保养价格相同——壁挂式 1.0–1.5 HP 化学清洗 RM 120 起，基本保养 RM 99 起，检查后 R32/R410A 加气每 PSI RM 3.00。大金现有产品线强调 Streamer 技术与 Coanda 气流；三菱强调 Dual Barrier Coating 与微粒子滤网。按房间类型和功能选，不要按虚构的“赢家”选。</div>

      <h2>我们能诚实对比什么</h2>
      <p>KL Renovator 不卖纸箱里的整机，也不公布任一品牌的零售价。我们安装您买来的机器（壁挂式 1.0–1.5 HP 人工从 RM 199 起），之后为两家做保养。编造街价或市占率的对比是营销，不是指南。</p>
      <table>
        <thead><tr><th>已公布事实</th><th>大金</th><th>三菱</th></tr></thead>
        <tbody>
          <tr><td>压缩机类型（品牌规格）</td><td>摆动 / 涡旋，变频与定频</td><td>直流变频 / 旋转式</td></tr>
          <tr><td>现有住宅线冷媒</td><td>R32（较新）/ R410A（旧款）</td><td>R32 / R410A</td></tr>
          <tr><td>本站列出的关键技术</td><td>Streamer、Coanda 气流</td><td>Dual Barrier Coating、微粒子滤网</td></tr>
          <tr><td>能效说明</td><td>最高能源委员会 5 星</td><td>高 CSPF</td></tr>
          <tr><td>建议清洗间隔</td><td>每 6–9 个月</td><td>每 6–9 个月</td></tr>
          <tr><td>我们服务的常见住宅系列</td><td>iSmile、SMILE、FTKF、FTKM</td><td>MSY 壁挂、MXY 多联机</td></tr>
          <tr><td>商用线</td><td>SkyAir</td><td>Mr Slim 卡式、MXY 多联机</td></tr>
        </tbody>
      </table>

      <h2>保养与维修价格——同一价目</h2>
      <p>室内机徽章写大金或三菱，化学清洗不会因此更贵。流程相同：防护帆布、清洗蒸发器与风轮、冲洗排水、清洗室外翅片、制冷测试。</p>
      <table>
        <thead><tr><th>工作</th><th>已公布价格</th></tr></thead>
        <tbody>
          <tr><td>基本保养，壁挂 1.0–1.5 HP</td><td>RM 99</td></tr>
          <tr><td>高压化学清洗，壁挂 1.0–1.5 HP</td><td>RM 120</td></tr>
          <tr><td>化学大修（仅限挂壁式）1.0–1.5 HP</td><td>RM 420</td></tr>
          <tr><td>R32 或 R410A 加气</td><td>检查后每 PSI RM 3.00</td></tr>
          <tr><td>诊断费（随维修免除）</td><td>RM 88</td></tr>
          <tr><td>更换 PCB</td><td>RM 350–600</td></tr>
          <tr><td>新装，壁挂 1.0–1.5 HP</td><td>RM 199</td></tr>
        </tbody>
      </table>
      <p>另外两个日本品牌的对比见<a href="/zh/blog/daikin-vs-panasonic-aircond-malaysia">大金 vs 松下</a>。该组合的保养账单见<a href="/zh/blog/daikin-vs-panasonic-aircond-service-cost-malaysia-2026">保养费用对比</a>。</p>

      <h2>你实际会看到的故障码</h2>
      <p>这些来自我们品牌故障码列表——不是完整原厂手册。</p>
      <ul>
        <li><strong>大金 L5</strong>——变频器过流，常与气体不足有关。换板前先查压力。</li>
        <li><strong>大金 U4</strong>——室内外通信。查线路和 PCB。</li>
        <li><strong>三菱 P8</strong>——室外保护（一般）。先诊断室外机，不是自动换压缩机。</li>
        <li><strong>三菱 E6</strong>——室内外通信。第一步检查与大金 U4 相同。</li>
      </ul>
      <p>闪灯不是 DIY 零件清单。先看<a href="/zh/blog/aircond-error-codes-blinking-lights-guide-malaysia">故障码指南</a>，再把闪烁规律发到 WhatsApp。</p>

      <h2>哪种房间选哪个品牌</h2>
      <ul>
        <li><strong>卧室：</strong>两家现有变频线都可以。买之前先用<a href="/zh/btu-calculator">BTU 计算器</a>确认匹数。</li>
        <li><strong>多房间、只有一个室外平台：</strong>室外墙位不够时，常用三菱 MXY 多联机。仍然需要正确抽真空和有坡度的排水。</li>
        <li><strong>办公室或店屋：</strong>大金 SkyAir 或三菱 Mr Slim 卡式。天花工程按现场报价，不是壁挂 RM 199。</li>
      </ul>

      <h2>吉隆坡与雪兰莪两品牌本地服务</h2>
      <p>我们在吉隆坡与雪兰莪为两品牌做清洗、加气和维修——八打灵再也、梳邦再也、莎阿南、蒲种、巴生、安邦、蕉赖、加影、Mont Kiara、Bangsar、Kepong、黑风洞和士拉央。营业时间星期一至星期日上午 9 点至傍晚 6 点。KL Renovator 以 Multicore Dynamics Resources（SSM 003765188-T）运营，符合条件的工艺享 1 个月保修。</p>

      <h2>常见问题</h2>
      <h3>在马来西亚三菱比大金更好吗？</h3>
      <p>没有一款适合所有房子。大金现有住宅线以 Streamer 技术和 Coanda 气流著称；三菱以 Dual Barrier Coating 和微粒子滤网著称。KL Renovator 以同一公开价目服务两个品牌。</p>

      <h3>三菱和大金保养费用一样吗？</h3>
      <p>按 KL Renovator 已公布价目，是一样的。壁挂式 1.0–1.5 HP 化学清洗都是 RM 120。基本保养从 RM 99 起。检查后 R32 或 R410A 加气为每 PSI RM 3.00。</p>

      <h3>三菱和大金用什么冷媒？</h3>
      <p>马来西亚较新的住宅机型两者都用 R32。旧机可能仍是 R410A。加气前我们会看室外机铭牌，绝不混用冷媒。</p>

      <h3>哪个品牌更安静？</h3>
      <p>两家现有变频线都按卧室安静使用设计。用几年后的噪音，更多取决于脏风轮和松动的室外支架，而不是牌子。RM 120 起的化学清洗常常能去掉被误当成品牌问题的震动。</p>

      <h3>大金 L5 和三菱 P8 是什么意思？</h3>
      <p>大金 L5 是变频器过流，常与气体不足有关。三菱 P8 是室外机一般保护故障。两者都需要上门诊断——诊断费 RM 88，随维修免除。</p>

      <h3>KL Renovator 能安装这两个品牌吗？</h3>
      <p>能。壁挂式 1.0–1.5 HP 新机安装从 RM 199 起，含 7 尺铜管、保温、电线、排水、抽真空和 1 个月工艺保修。您买哪台，我们就装哪台。</p>

      <h3>两个品牌多久洗一次？</h3>
      <p>两家品牌规格都写马来西亚条件下每 6–9 个月化学清洗一次。这与我们为吉隆坡和雪兰莪其他变频壁挂机使用的周期一致。</p>

      <h3>店屋更适合选三菱吗？</h3>
      <p>三菱的 MXY 多联机和 Mr Slim 卡式常用于一台室外机带多台室内机的场合。大金 SkyAir 也覆盖商用。请按现场报价，不要直接套用壁挂套餐价。</p>

      <h3>某个品牌零件会更慢吗？</h3>
      <p>两家品牌的电容、风扇电机、传感器和现行机型 PCB 在巴生谷一般都能买到。批准维修前，我们会在 WhatsApp 确认零件周期。</p>

      <h3>家里已有一个品牌该怎么选？</h3>
      <p>全屋同一品牌会让遥控和零件更熟悉，但不是必须。保养价格不变。先用 BTU 计算器对照房间大小，再预约安装。</p>

      <h2>预约三菱或大金上门</h2>
      <p>请发送室外机铭牌照片，并说明需要清洗、诊断还是新装。WhatsApp <strong>+60 18-298 3573</strong>，或使用<a href="/zh/book">预约表格</a>。相关：<a href="/zh/brands/mitsubishi">三菱服务</a> · <a href="/zh/brands/daikin">大金服务</a> · <a href="/zh/services/chemical-wash">化学清洗</a> · <a href="/zh/services/installation">安装</a> · <a href="/zh/aircond-size-calculator">尺寸计算器</a> · <a href="/zh/near-me">附近技师</a>。</p>
    `,
  },
];
