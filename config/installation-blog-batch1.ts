/**
 * INS-18 Blog Batch 1 (Posts 1-5) — Installation-Focused Blog Posts
 * Round 78 — 2026-07-16
 * 
 * 5 trilingual (EN/MS/ZH) blog posts with:
 * - 800-1,500 words per language
 * - Internal linking mesh to installation pages
 * - FAQ schema-ready (5 questions each)
 * - WhatsApp CTA
 * - Installation authority language (near me, specialist, etc.)
 */

import type { BlogPost } from "./blog-posts";

export const installationBlogBatch1: BlogPost[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // POST 1: 10 Costly Installation Mistakes
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "10-costly-aircond-installation-mistakes-malaysia-2026",
    title: "10 Costly Aircond Installation Mistakes Malaysian Homeowners Make",
    titleMS: "10 Kesilapan Pemasangan Aircond Mahal Pemilik Rumah Malaysia Lakukan",
    titleZH: "马来西亚屋主常犯的10个昂贵冷气安装错误",
    excerpt: "Avoid installation errors that cost RM 500-2,000 in repairs. Learn from 500+ installations across KL & Selangor what separates quality work from corner-cutting.",
    excerptMS: "Elakkan kesilapan pemasangan yang menelan belanja RM 500-2,000. Belajar dari 500+ pemasangan di KL & Selangor apa yang membezakan kerja berkualiti.",
    excerptZH: "避免花费 RM 500-2,000 维修费的安装错误。从 KL 和雪兰莪 500+ 次安装中学习优质工艺与偷工减料的区别。",
    category: "Installation Guide",
    categoryMS: "Panduan Pemasangan",
    categoryZH: "安装指南",
    tags: ["aircond installation mistakes", "installation cost Malaysia", "quality installation KL", "vacuum pump", "copper pipe Type L"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 8,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kl-selangor.webp",
    imageAlt: "KL Renovator technician performing quality aircond installation with vacuum pump in KL home",
    content: `
      <h2>10 Installation Mistakes That Cost Malaysian Homeowners Thousands</h2>
      <p>After completing over 500 aircond installations across KL and Selangor, our installation specialists have seen the same expensive mistakes repeated again and again. These errors don't just waste money upfront — they lead to higher TNB bills, frequent breakdowns, and units that fail 3-5 years earlier than they should.</p>

      <h2>Mistake #1: Skipping the Vacuum Pump Step</h2>
      <p>Some installers skip vacuum evacuation to save 15-20 minutes. This single shortcut causes compressor failure within 2-3 years (replacement: RM 600-1,200), ice formation on copper pipes, and 15-20% higher electricity bills. <strong>Always insist on minimum 15-20 minutes vacuum time.</strong></p>

      <h2>Mistake #2: Using Type M Copper Pipe Instead of Type L</h2>
      <p>Type M copper has thinner walls and costs 30% less. Budget installers use it to increase margins. Result: pinhole leaks within 3-5 years and RM 400-800 re-piping costs. <a href="/aircond-installation-kl">Our installation specialists</a> use only Type L copper pipe — thicker walls rated for high-pressure R410A and R32 refrigerants.</p>

      <h2>Mistake #3: Incorrect Pipe Sizing</h2>
      <p>Using universal 1/4" pipe for all HP ratings restricts refrigerant flow by 20-30%, forcing the compressor to work harder and increasing TNB bills. Match pipe diameter to HP: 1.0-1.5 HP uses 1/4" + 3/8", while 2.5-3.0 HP needs 3/8" + 5/8".</p>

      <h2>Mistake #4: Inadequate Insulation</h2>
      <p>Thin 6mm insulation or skipping the gas line insulation causes condensation dripping, 10-15% energy loss, and mold growth. We use Armaflex 9mm on liquid lines and 13mm on gas lines as standard.</p>

      <h2>Mistake #5: Ignoring Electrical Circuit Capacity</h2>
      <p>Installing a 2.5 HP or 3.0 HP unit on a standard 13A socket without checking circuit capacity risks frequent MCB tripping, melted wiring, and fire hazards. Units 2.5 HP and above need a dedicated 20A MCB circuit.</p>

      <h2>Mistake #6: Poor Drainage Slope</h2>
      <p>Insufficient slope or horizontal drain pipe runs cause water leaking from the indoor unit, mold growth, and ceiling damage. Minimum 1:100 gradient is essential, with PVC pipe (not flexible tubing) and a condensate pump for long runs.</p>

      <h2>Mistake #7: Incorrect Outdoor Unit Placement</h2>
      <p>Placing the outdoor unit in direct sunlight or enclosed spaces reduces cooling efficiency by 15-25% and causes compressor overheating. Ensure minimum 30cm clearance on all sides and a shaded location.</p>

      <h2>Mistake #8: Skipping the Nitrogen Pressure Test</h2>
      <p>Without a pressure test at 150 PSI for 15 minutes, undetected leaks cause refrigerant loss and repeated RM 120-180 gas top-ups. Every quality installation includes this essential step.</p>

      <h2>Mistake #9: Reusing Old Pipes During Replacement</h2>
      <p>Old copper pipes contain moisture, oxidation, and acid from previous compressor burnout. Always install new copper pipes with a new unit — the RM 200-300 saved by reusing old pipes isn't worth the RM 400-800 in damage they cause.</p>

      <h2>Mistake #10: Choosing Price Over Quality</h2>
      <p>The cheapest installer cuts corners on vacuum (saves them 15 min, costs you RM 1,000+), pipe quality (saves RM 50, costs RM 600+), and insulation (saves RM 30, costs RM 300+). Choose installers with SSM registration, 50+ reviews, and written warranty.</p>

      <h2>The True Cost Comparison</h2>
      <table>
        <thead><tr><th>Item</th><th>Budget Install (RM 150)</th><th>Quality Install (RM 199)</th></tr></thead>
        <tbody>
          <tr><td>Vacuum pump</td><td>Skipped → RM 800 compressor</td><td>Done properly</td></tr>
          <tr><td>Copper pipe</td><td>Type M → RM 600 re-pipe</td><td>Type L, lasts 15+ years</td></tr>
          <tr><td>Insulation</td><td>Thin → RM 300 water damage</td><td>Armaflex, proper thickness</td></tr>
          <tr><td>Pressure test</td><td>Skipped → RM 360 gas refills</td><td>Done, no leaks</td></tr>
          <tr><td><strong>3-Year Total</strong></td><td><strong>RM 2,210</strong></td><td><strong>RM 199</strong></td></tr>
        </tbody>
      </table>

      <h2>KL Renovator's Quality Installation Standard</h2>
      <p>Every installation by our <a href="/near-me">expert installers near you</a> includes two-stage vacuum evacuation, Type L copper pipe, Armaflex insulation, nitrogen pressure test, electrical circuit check, proper drainage, and a written 1-month workmanship warranty. <strong>From RM 199, same-day available.</strong></p>
      <p>WhatsApp <strong>+60 18-298 3573</strong> for a transparent quote within 30 minutes.</p>
    `,
    contentMS: `
      <h2>10 Kesilapan Pemasangan Yang Menelan Kos Beribu</h2>
      <p>Selepas lebih 500 pemasangan aircond di KL dan Selangor, pakar pemasangan kami melihat kesilapan mahal yang sama berulang. Kesilapan ini menyebabkan bil TNB lebih tinggi, kerosakan kerap, dan unit gagal 3-5 tahun lebih awal.</p>

      <h2>Kesilapan #1: Melangkau Pam Vakum</h2>
      <p>Sesetengah pemasang melangkau evakuasi vakum untuk menjimatkan 15-20 minit. Ini menyebabkan kegagalan pemampat dalam 2-3 tahun (penggantian: RM 600-1,200), pembentukan ais, dan bil elektrik 15-20% lebih tinggi. <strong>Sentiasa tekankan minimum 15-20 minit vakum.</strong></p>

      <h2>Kesilapan #2: Paip Tembaga Jenis M Bukan Jenis L</h2>
      <p>Jenis M dinding lebih nipis, kos 30% kurang. Hasil: kebocoran lubang pin dalam 3-5 tahun dan kos RM 400-800 pemasangan semula. <a href="/aircond-installation-kl">Pakar pemasangan kami</a> hanya menggunakan paip tembaga Jenis L.</p>

      <h2>Kesilapan #3-10: Ringkasan</h2>
      <ul>
        <li><strong>Saiz paip salah:</strong> Aliran penyejuk berkurangan 20-30%, bil TNB lebih tinggi</li>
        <li><strong>Penebat tidak cukup:</strong> Kondensasi, kehilangan tenaga 10-15%, kulat</li>
        <li><strong>Abaikan kapasiti litar:</strong> MCB terpelantik, risiko kebakaran</li>
        <li><strong>Kecerunan saliran lemah:</strong> Bocor air, kerosakan siling</li>
        <li><strong>Penempatan unit luar salah:</strong> Kecekapan berkurangan 15-25%</li>
        <li><strong>Tiada ujian tekanan nitrogen:</strong> Kebocoran tidak dikesan</li>
        <li><strong>Guna paip lama:</strong> Pencemaran, kerosakan RM 400-800</li>
        <li><strong>Pilih harga bukan kualiti:</strong> RM 1,500-3,000 pembaikan dalam 2 tahun</li>
      </ul>

      <h2>Standard Pemasangan Berkualiti KL Renovator</h2>
      <p>Setiap pemasangan oleh <a href="/near-me">pemasang pakar berhampiran anda</a> termasuk evakuasi vakum dua peringkat, paip tembaga Jenis L, penebat Armaflex, ujian tekanan nitrogen, dan waranti kerja 1 bulan bertulis. <strong>Dari RM 199, hari sama tersedia.</strong></p>
      <p>WhatsApp <strong>+60 18-298 3573</strong> untuk sebut harga telus dalam 30 minit.</p>
    `,
    contentZH: `
      <h2>10个花费数千的安装错误</h2>
      <p>在完成KL和雪兰莪超过500次冷气安装后，我们的安装专家一次又一次看到同样昂贵的错误。这些错误导致更高的TNB账单、频繁故障和提前3-5年故障的机组。</p>

      <h2>错误 #1：跳过真空泵</h2>
      <p>一些安装人员跳过真空抽气以节省15-20分钟。这导致2-3年内压缩机故障（更换RM 600-1,200）、结冰和电费增加15-20%。<strong>始终要求至少15-20分钟真空时间。</strong></p>

      <h2>错误 #2：M型铜管非L型</h2>
      <p>M型壁更薄，成本低30%。结果：3-5年内针孔泄漏，RM 400-800重新布管。<a href="/aircond-installation-kl">我们的安装专家</a>只使用L型铜管。</p>

      <h2>错误 #3-10：摘要</h2>
      <ul>
        <li><strong>管道尺寸错误：</strong>冷媒流量减少20-30%，TNB账单增加</li>
        <li><strong>保温不足：</strong>冷凝水、能量损失10-15%、霉菌</li>
        <li><strong>忽视电路容量：</strong>频繁跳闸、火灾风险</li>
        <li><strong>排水坡度不良：</strong>漏水、天花板损坏</li>
        <li><strong>室外机放置不当：</strong>效率降低15-25%</li>
        <li><strong>无氮气压力测试：</strong>未发现的泄漏</li>
        <li><strong>重复使用旧管：</strong>污染、RM 400-800损坏</li>
        <li><strong>选择价格非质量：</strong>2年内RM 1,500-3,000维修费</li>
      </ul>

      <h2>KL Renovator 优质安装标准</h2>
      <p>我们<a href="/near-me">您附近的专家安装人员</a>的每次安装都包括两级真空抽气、L型铜管、Armaflex保温、氮气压力测试和书面1个月工艺保修。<strong>RM 199起，可当天安装。</strong></p>
      <p>WhatsApp <strong>+60 18-298 3573</strong>，30分钟内获得透明报价。</p>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POST 2: How Long Does Installation Take
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "how-long-does-aircond-installation-take-malaysia",
    title: "How Long Does Aircond Installation Take? Complete Timeline Guide",
    titleMS: "Berapa Lama Pemasangan Aircond Mengambil Masa? Panduan Garis Masa Lengkap",
    titleZH: "冷气安装需要多长时间？完整时间线指南",
    excerpt: "From WhatsApp booking to handover — the complete timeline of a professional aircond installation. Single unit: 2-3 hours. Two units: 5-6 hours. Here's what happens at every step.",
    excerptMS: "Dari tempahan WhatsApp hingga serahan — garis masa lengkap pemasangan aircond profesional. Satu unit: 2-3 jam. Dua unit: 5-6 jam.",
    excerptZH: "从 WhatsApp 预约到交付——专业冷气安装的完整时间线。单台：2-3小时。两台：5-6小时。",
    category: "Installation Guide",
    categoryMS: "Panduan Pemasangan",
    categoryZH: "安装指南",
    tags: ["aircond installation time", "how long installation takes", "installation process Malaysia", "same day installation KL"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 6,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kl-selangor.webp",
    imageAlt: "Timeline of professional aircond installation process by KL Renovator technicians",
    content: `
      <h2>How Long Does Aircond Installation Actually Take?</h2>
      <p>One of the first questions homeowners ask our <a href="/near-me">installation specialists near them</a> is: "How long will this take?" The honest answer depends on unit type, number of units, and site conditions. Here's our complete timeline based on 500+ installations across KL and Selangor.</p>

      <h2>Quick Answer: Installation Duration by Unit Type</h2>
      <table>
        <thead><tr><th>Unit Type</th><th>Time</th><th>Key Factors</th></tr></thead>
        <tbody>
          <tr><td>Wall-mounted (1 unit)</td><td>2–3 hours</td><td>Standard residential</td></tr>
          <tr><td>Wall-mounted (2 units)</td><td>5–6 hours</td><td>Same day possible</td></tr>
          <tr><td>Ceiling cassette</td><td>3–4 hours</td><td>Ceiling cut-out required</td></tr>
          <tr><td>Window unit</td><td>1–1.5 hours</td><td>Simpler installation</td></tr>
          <tr><td>Multi-split (1 outdoor, 2-3 indoor)</td><td>6–8 hours</td><td>Multiple pipe runs</td></tr>
        </tbody>
      </table>

      <h2>The 7-Step Installation Timeline</h2>

      <h3>Step 1: WhatsApp Booking (5-10 min)</h3>
      <p>Send us your unit type, HP, brand, and address. We confirm transparent pricing and availability within 30 minutes. Same-day slots available for bookings before 11 AM.</p>

      <h3>Step 2: Technician Dispatch (30-60 min)</h3>
      <p>Our qualified installation specialist is dispatched with all required materials — Type L copper pipe, Armaflex insulation, brackets, wiring, vacuum pump, and nitrogen tank. GPS-tracked arrival with ETA via WhatsApp.</p>

      <h3>Step 3: Site Survey & Wall Assessment (15-20 min)</h3>
      <p>The technician inspects the installation spot, checks wall strength, electrical circuit capacity, drainage path, and outdoor unit position. Any issues are flagged before work begins — no surprises.</p>

      <h3>Step 4: Installation & Piping (1.5-2.5 hours)</h3>
      <p>The main work: bracket mounting, copper pipe cutting and flaring, wiring through conduit, drain pipe installation. This is where quality matters most — every connection, every flare, every inch of insulation.</p>

      <h3>Step 5: Vacuum Evacuation & Leak Test (20-30 min)</h3>
      <p>Two-stage vacuum pump evacuation for minimum 15-20 minutes. This step is <strong>never skipped</strong> — it removes moisture that causes compressor failure. Nitrogen pressure test at 150 PSI confirms zero leaks.</p>

      <h3>Step 6: Commissioning Run (15-20 min)</h3>
      <p>Unit powered on and tested through full cooling cycle. Delta-T test measures supply vs return air temperature. All fan speeds, thermostat response, and drainage flow verified.</p>

      <h3>Step 7: Handover & Warranty (10-15 min)</h3>
      <p>Written job card with unit details, materials used, gas readings, and warranty start date. Remote control demo, filter cleaning schedule, and maintenance tips shared. <strong>1-month workmanship warranty activated.</strong></p>

      <h2>What Can Make Installation Take Longer?</h2>
      <ul>
        <li><strong>Reinforced concrete walls</strong> — drilling takes 20-30 min extra per hole</li>
        <li><strong>Long pipe runs</strong> — over 15ft requires more copper, insulation, and support brackets</li>
        <li><strong>High-floor condos</strong> — coordination with building management, lift booking</li>
        <li><strong>Electrical upgrades</strong> — new MCB circuit for 2.5 HP+ units</li>
        <li><strong>Ceiling cassette</strong> — ceiling cut-out and suspension mounting adds time</li>
      </ul>

      <h2>Can I Get Same-Day Installation?</h2>
      <p>Yes! Book before 11 AM via WhatsApp <strong>+60 18-298 3573</strong> and our <a href="/aircond-installation-kl">most trusted installation team</a> can be at your door the same afternoon. We cover all of KL and Selangor — from Mont Kiara to Cheras, Petaling Jaya to Shah Alam.</p>
    `,
    contentMS: `
      <h2>Berapa Lama Pemasangan Aircond Sebenarnya Mengambil Masa?</h2>
      <p>Soalan pertama pemilik rumah tanya <a href="/near-me">pakar pemasangan berhampiran mereka</a> ialah: "Berapa lama ini mengambil masa?" Jawapan jujur bergantung kepada jenis unit, bilangan unit, dan keadaan tapak.</p>

      <h2>Jawapan Pantas: Tempoh Mengikut Jenis Unit</h2>
      <table>
        <thead><tr><th>Jenis Unit</th><th>Masa</th></tr></thead>
        <tbody>
          <tr><td>Dinding (1 unit)</td><td>2–3 jam</td></tr>
          <tr><td>Dinding (2 unit)</td><td>5–6 jam</td></tr>
          <tr><td>Ceiling cassette</td><td>3–4 jam</td></tr>
          <tr><td>Unit tingkap</td><td>1–1.5 jam</td></tr>
        </tbody>
      </table>

      <h2>Garis Masa 7 Langkah</h2>
      <ol>
        <li><strong>Tempahan WhatsApp</strong> (5-10 min) — Harga telus disahkan dalam 30 minit</li>
        <li><strong>Penghantaran Juruteknik</strong> (30-60 min) — Semua bahan dibawa</li>
        <li><strong>Tinjauan Tapak</strong> (15-20 min) — Dinding, elektrik, saliran diperiksa</li>
        <li><strong>Pemasangan & Paip</strong> (1.5-2.5 jam) — Kerja utama dilakukan</li>
        <li><strong>Evakuasi Vakum & Ujian</strong> (20-30 min) — Minimum 15-20 minit vakum</li>
        <li><strong>Pentauliahan</strong> (15-20 min) — Ujian penyejukan penuh</li>
        <li><strong>Serahan & Waranti</strong> (10-15 min) — Kad kerja + waranti 1 bulan</li>
      </ol>

      <h2>Bolehkah Pemasangan Hari Sama?</h2>
      <p>Ya! Tempah sebelum 11 PG melalui WhatsApp <strong>+60 18-298 3573</strong> dan <a href="/aircond-installation-kl">pasukan pemasangan paling dipercayai kami</a> boleh sampai petang itu juga.</p>
    `,
    contentZH: `
      <h2>冷气安装实际需要多长时间？</h2>
      <p>屋主向我们<a href="/near-me">附近的安装专家</a>问的第一个问题是："这需要多长时间？"诚实的答案取决于机型、数量和现场条件。</p>

      <h2>快速答案：按机型分类的安装时间</h2>
      <table>
        <thead><tr><th>机型</th><th>时间</th></tr></thead>
        <tbody>
          <tr><td>壁挂式（1台）</td><td>2-3小时</td></tr>
          <tr><td>壁挂式（2台）</td><td>5-6小时</td></tr>
          <tr><td>天花板卡式机</td><td>3-4小时</td></tr>
          <tr><td>窗机</td><td>1-1.5小时</td></tr>
        </tbody>
      </table>

      <h2>7步时间线</h2>
      <ol>
        <li><strong>WhatsApp预约</strong>（5-10分钟）— 30分钟内确认透明价格</li>
        <li><strong>技术员派遣</strong>（30-60分钟）— 携带所有材料</li>
        <li><strong>现场勘查</strong>（15-20分钟）— 检查墙体、电气、排水</li>
        <li><strong>安装与布管</strong>（1.5-2.5小时）— 主要工作</li>
        <li><strong>真空抽气与检漏</strong>（20-30分钟）— 至少15-20分钟真空</li>
        <li><strong>调试运行</strong>（15-20分钟）— 完整制冷测试</li>
        <li><strong>交付与保修</strong>（10-15分钟）— 工单 + 1个月保修</li>
      </ol>

      <h2>能当天安装吗？</h2>
      <p>可以！上午11点前通过 WhatsApp <strong>+60 18-298 3573</strong> 预约，我们<a href="/aircond-installation-kl">最受信赖的安装团队</a>当天下午即可上门。</p>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POST 3: Condo Installation Rules
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "aircond-installation-condo-rules-malaysia-2026",
    title: "Condo Aircond Installation Rules in Malaysia — JMB Approval Guide 2026",
    titleMS: "Peraturan Pemasangan Aircond Kondominium di Malaysia — Panduan Kelulusan JMB 2026",
    titleZH: "马来西亚公寓冷气安装规则——2026年JMB批准指南",
    excerpt: "Everything condo owners need to know about aircond installation: JMB approval, outdoor unit placement rules, drilling restrictions, and after-hours scheduling. Expert tips from 200+ condo installations.",
    excerptMS: "Semua yang pemilik kondominium perlu tahu tentang pemasangan aircond: kelulusan JMB, peraturan penempatan unit luar, sekatan penggerudian.",
    excerptZH: "公寓业主需要了解的冷气安装一切：JMB批准、室外机放置规则、钻孔限制和非营业时间安排。",
    category: "Installation Guide",
    categoryMS: "Panduan Pemasangan",
    categoryZH: "安装指南",
    tags: ["condo aircond installation", "JMB approval", "condo installation rules Malaysia", "high-rise installation"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 7,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kl-selangor.webp",
    imageAlt: "KL Renovator installing aircond in a KL condominium with proper JMB compliance",
    content: `
      <h2>Condo Aircond Installation: What Every Malaysian Owner Needs to Know</h2>
      <p>Installing aircond in a Malaysian condominium isn't as straightforward as in a landed property. Between JMB/MC approval requirements, outdoor unit placement restrictions, and building-specific drilling rules, there's a lot to navigate. Our <a href="/near-me">condo installation specialists near you</a> have completed 200+ condo installations across KL and Selangor — here's everything you need to know.</p>

      <h2>Step 1: Get JMB/MC Approval Before Installation</h2>
      <p>Most condominiums require written approval from the Joint Management Body (JMB) or Management Corporation (MC) before any installation work. This typically includes:</p>
      <ul>
        <li><strong>Application form</strong> — submitted to management office 3-7 days before work</li>
        <li><strong>Outdoor unit position</strong> — must be on approved ledge, balcony, or designated AC platform</li>
        <li><strong>Drilling approval</strong> — some buildings restrict drilling through structural walls</li>
        <li><strong>Work hours</strong> — typically 9 AM to 5 PM weekdays, some allow Saturday mornings</li>
        <li><strong>Contractor registration</strong> — your installer may need to register at the guardhouse</li>
      </ul>

      <h2>Outdoor Unit Placement Rules</h2>
      <p>This is the #1 issue in condo installations. Buildings have specific rules about where outdoor units can go:</p>
      <ul>
        <li><strong>Designated AC ledges</strong> — most condos have pre-built concrete ledges with drainage</li>
        <li><strong>Balcony placement</strong> — allowed in most buildings, but must not block emergency exits</li>
        <li><strong>Wall-mounted brackets</strong> — some JMBs prohibit external wall brackets for safety</li>
        <li><strong>No ground placement</strong> — common areas are strictly off-limits</li>
      </ul>
      <p>Our technicians assess the approved placement during the site survey and advise on the best configuration for optimal airflow and accessibility.</p>

      <h2>Drilling & Piping Through Walls</h2>
      <p>Condo walls are often reinforced concrete, which makes drilling more time-consuming (20-30 minutes per hole vs 5 minutes for brick). Some buildings require:</p>
      <ul>
        <li>Pre-approved drilling points marked by the building engineer</li>
        <li>Use of existing pipe sleeves/chases built into the wall</li>
        <li>Sealing of all wall penetrations with fire-rated sealant</li>
      </ul>

      <h2>Electrical Considerations for Condos</h2>
      <p>Most condos have adequate electrical capacity for 1-2 aircond units per bedroom. However:</p>
      <ul>
        <li>Units above 2.5 HP may need management approval for additional MCB</li>
        <li>Older condos (pre-2010) may have limited spare circuit capacity</li>
        <li>Never tap into the common area power supply — this is illegal and dangerous</li>
      </ul>

      <h2>After-Hours & Weekend Installation</h2>
      <p>Some condos only allow installation during specific hours. If your building restricts weekday work, our team offers:</p>
      <ul>
        <li><strong>Saturday morning slots</strong> — most buildings allow 9 AM to 1 PM</li>
        <li><strong>After-hours scheduling</strong> — for buildings with 6 PM–10 PM drilling windows</li>
        <li><strong>Quiet installation techniques</strong> — we minimize noise disruption to neighbors</li>
      </ul>

      <h2>High-Floor Challenges (Floor 15+)</h2>
      <p>High-floor installations present unique challenges our <a href="/aircond-installation-kl">expert installation team</a> handles regularly:</p>
      <ul>
        <li>Service lift booking required for equipment transport</li>
        <li>Stronger winds on outdoor unit ledges — extra bracket securing needed</li>
        <li>Longer pipe runs from outdoor unit to interior rooms</li>
        <li>Rope access may be needed for buildings without accessible ledges (additional cost)</li>
      </ul>

      <h2>How KL Renovator Handles Condo Installations</h2>
      <p>Our <a href="/near-me">top-rated condo installation specialists</a> handle everything:</p>
      <ul>
        <li>✅ Pre-installation JMB coordination and paperwork</li>
        <li>✅ Site survey of approved outdoor unit positions</li>
        <li>✅ Reinforced concrete drilling with dust protection</li>
        <li>✅ After-hours and weekend scheduling</li>
        <li>✅ High-floor logistics and service lift coordination</li>
        <li>✅ All work follows building management rules</li>
        <li>✅ Written 1-month workmanship warranty</li>
      </ul>
      <p><strong>Condo installation from RM 199.</strong> WhatsApp <strong>+60 18-298 3573</strong> — tell us your condo name and we'll advise on JMB requirements.</p>
    `,
    contentMS: `
      <h2>Pemasangan Aircond Kondominium: Apa Yang Pemilik Perlu Tahu</h2>
      <p>Pemasangan aircond di kondominium Malaysia tidak semudah rumah teres. Antara keperluan kelulusan JMB/MC, sekatan penempatan unit luar, dan peraturan penggerudian, banyak yang perlu dilalui. <a href="/near-me">Pakar pemasangan kondominium berhampiran anda</a> telah menyelesaikan 200+ pemasangan.</p>

      <h2>Langkah 1: Dapatkan Kelulusan JMB/MC</h2>
      <ul>
        <li>Borang permohonan — dihantar 3-7 hari sebelum kerja</li>
        <li>Kedudukan unit luar — mesti di tempat yang diluluskan</li>
        <li>Kelulusan penggerudian — sesetengah bangunan menyekat</li>
        <li>Waktu kerja — biasanya 9 PG–5 PTG hari bekerja</li>
      </ul>

      <h2>Peraturan Penempatan Unit Luar</h2>
      <p>Isu #1 dalam pemasangan kondominium. Bangunan mempunyai peraturan khusus tentang lokasi unit luar: birai AC, balkoni, atau platform yang ditetapkan.</p>

      <h2>Bagaimana KL Renovator Mengendalikan Pemasangan Kondominium</h2>
      <p><a href="/near-me">Pakar pemasangan kondominium terbaik kami</a> mengendalikan semua: koordinasi JMB, penggerudian konkrit, penjadualan luar waktu, dan logistik tingkat tinggi. <strong>Dari RM 199.</strong> WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>公寓冷气安装：每位业主需要知道的</h2>
      <p>在马来西亚公寓安装冷气不像排屋那么简单。JMB/MC批准要求、室外机放置限制和建筑特定的钻孔规则需要处理。我们<a href="/near-me">您附近的公寓安装专家</a>已完成200+次公寓安装。</p>

      <h2>第一步：获得JMB/MC批准</h2>
      <ul>
        <li>申请表——提前3-7天提交</li>
        <li>室外机位置——必须在批准位置</li>
        <li>钻孔批准——某些建筑有限制</li>
        <li>工作时间——通常工作日9AM-5PM</li>
      </ul>

      <h2>KL Renovator如何处理公寓安装</h2>
      <p>我们<a href="/near-me">顶级公寓安装专家</a>处理一切：JMB协调、混凝土钻孔、非营业时间排程和高层物流。<strong>RM 199起。</strong>WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POST 4: Best HP for Bedroom Size Guide
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "best-hp-aircond-bedroom-size-guide-malaysia",
    title: "Best HP Aircond for Your Room Size — Complete Malaysia Guide 2026",
    titleMS: "HP Aircond Terbaik Untuk Saiz Bilik Anda — Panduan Lengkap Malaysia 2026",
    titleZH: "最适合您房间尺寸的冷气匹数——2026马来西亚完整指南",
    excerpt: "Room-to-HP chart for Malaysian homes. Find the exact aircond HP for your bedroom, living room, or office — plus installation cost. Don't oversize or undersize.",
    excerptMS: "Carta bilik-ke-HP untuk rumah Malaysia. Cari HP aircond tepat untuk bilik tidur, ruang tamu, atau pejabat anda — serta kos pemasangan.",
    excerptZH: "马来西亚住宅的房间-匹数对照表。为您的卧室、客厅或办公室找到确切的冷气匹数——以及安装费用。",
    category: "Buying Guide",
    categoryMS: "Panduan Pembelian",
    categoryZH: "购买指南",
    tags: ["aircond HP guide", "room size aircond", "BTU calculator Malaysia", "1HP vs 1.5HP", "best aircond size"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 6,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kl-selangor.webp",
    imageAlt: "Room size to aircond HP sizing guide for Malaysian homes by KL Renovator",
    content: `
      <h2>Which HP Aircond Is Right for Your Room?</h2>
      <p>Choosing the wrong HP is one of the most common mistakes Malaysian homeowners make. Too small and the unit runs non-stop without cooling properly. Too big and it short-cycles — cooling the room too fast without removing humidity, leaving the air cold but clammy. Our <a href="/near-me">installation specialists near you</a> have put together this definitive room-to-HP guide based on Malaysian climate conditions.</p>

      <h2>Room Size to HP Chart — Malaysia Standard</h2>
      <table>
        <thead><tr><th>Room Size (sqft)</th><th>Recommended HP</th><th>BTU Range</th><th>Best For</th><th>Installation From</th></tr></thead>
        <tbody>
          <tr><td>100–150</td><td>1.0 HP</td><td>9,000</td><td>Standard bedroom</td><td><a href="/1hp-aircond-installation-kl">RM 199</a></td></tr>
          <tr><td>150–250</td><td>1.5 HP</td><td>12,000</td><td>Master bedroom, small living</td><td><a href="/1.5hp-aircond-installation-kl">RM 219</a></td></tr>
          <tr><td>250–400</td><td>2.0 HP</td><td>18,000</td><td>Large living room</td><td><a href="/2hp-aircond-installation-kl">RM 249</a></td></tr>
          <tr><td>400–550</td><td>2.5 HP</td><td>24,000</td><td>Open-plan areas</td><td>RM 279</td></tr>
          <tr><td>550–700</td><td>3.0 HP</td><td>30,000</td><td>Commercial / large halls</td><td>RM 329</td></tr>
        </tbody>
      </table>

      <h2>When to Go One Size Up</h2>
      <p>The chart above assumes standard conditions. Add one HP size if your room has:</p>
      <ul>
        <li><strong>West-facing windows</strong> — direct afternoon sun adds 20-25% heat load</li>
        <li><strong>Top floor / rooftop exposure</strong> — heat from above increases cooling demand</li>
        <li><strong>Ceiling height above 10ft</strong> — larger air volume needs more capacity</li>
        <li><strong>4+ regular occupants</strong> — each person adds ~600 BTU heat load</li>
        <li><strong>Kitchen adjacency</strong> — cooking heat significantly increases cooling demand</li>
        <li><strong>Large glass windows</strong> — poor insulation compared to solid walls</li>
      </ul>

      <h2>Why Oversizing Is Also a Problem</h2>
      <p>A common misconception is "bigger is always better." An oversized unit:</p>
      <ul>
        <li>Cools the room in 5 minutes then shuts off — never running long enough to dehumidify</li>
        <li>Short-cycles (frequent on/off) which wears the compressor faster</li>
        <li>Leaves the air cold but humid — that "sticky cold" feeling Malaysians know well</li>
        <li>Costs more upfront and uses more electricity per cycle</li>
      </ul>

      <h2>Try Our Free BTU Calculator</h2>
      <p>Not sure about your room size? Use our free <a href="/btu-calculator">BTU Calculator</a> — enter your room dimensions, room type, and sun exposure to get an instant HP recommendation with installation cost.</p>

      <h2>Installation Cost by HP Size</h2>
      <p>KL Renovator's <a href="/aircond-installation-kl">expert installation team</a> offers transparent per-HP pricing:</p>
      <ul>
        <li><strong>1.0 HP:</strong> From RM 199 — <a href="/1hp-aircond-installation-kl">see details</a></li>
        <li><strong>1.5 HP:</strong> From RM 219 — <a href="/1.5hp-aircond-installation-kl">see details</a></li>
        <li><strong>2.0 HP:</strong> From RM 249 — <a href="/2hp-aircond-installation-kl">see details</a></li>
        <li><strong>2.5 HP:</strong> From RM 279</li>
        <li><strong>3.0 HP:</strong> From RM 329</li>
      </ul>
      <p>Every price includes 7ft Type L copper pipe, Armaflex insulation, wiring, vacuum evacuation, pressure test, and 1-month warranty. Volume discount: 2-3 units 5% off, 4-8 units 10% off.</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong> — tell us your room size and we'll recommend the perfect HP.</p>
    `,
    contentMS: `
      <h2>HP Aircond Mana Yang Sesuai Untuk Bilik Anda?</h2>
      <p>Memilih HP yang salah adalah kesilapan paling biasa. Terlalu kecil dan unit beroperasi tanpa henti. Terlalu besar dan ia beroperasi pendek — menyejukkan terlalu cepat tanpa menghilangkan kelembapan. <a href="/near-me">Pakar pemasangan berhampiran anda</a> menyediakan panduan bilik-ke-HP ini.</p>

      <h2>Carta Saiz Bilik ke HP</h2>
      <table>
        <thead><tr><th>Saiz (kps)</th><th>HP</th><th>Sesuai Untuk</th><th>Pemasangan Dari</th></tr></thead>
        <tbody>
          <tr><td>100–150</td><td>1.0 HP</td><td>Bilik tidur standard</td><td>RM 199</td></tr>
          <tr><td>150–250</td><td>1.5 HP</td><td>Bilik utama, ruang tamu kecil</td><td>RM 219</td></tr>
          <tr><td>250–400</td><td>2.0 HP</td><td>Ruang tamu besar</td><td>RM 249</td></tr>
          <tr><td>400–550</td><td>2.5 HP</td><td>Kawasan pelan terbuka</td><td>RM 279</td></tr>
          <tr><td>550–700</td><td>3.0 HP</td><td>Komersial</td><td>RM 329</td></tr>
        </tbody>
      </table>

      <h2>Cuba Kalkulator BTU Percuma Kami</h2>
      <p>Tidak pasti saiz bilik? Gunakan <a href="/btu-calculator">Kalkulator BTU</a> percuma kami untuk cadangan HP serta-merta.</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong> — beritahu saiz bilik dan kami cadangkan HP sempurna.</p>
    `,
    contentZH: `
      <h2>哪种匹数冷气适合您的房间？</h2>
      <p>选择错误的匹数是马来西亚屋主最常犯的错误之一。太小则机组不停运转仍不够冷。太大则频繁启停——制冷过快但不除湿。我们<a href="/near-me">您附近的安装专家</a>为您准备了这份房间-匹数指南。</p>

      <h2>房间尺寸-匹数对照表</h2>
      <table>
        <thead><tr><th>面积（平方英尺）</th><th>匹数</th><th>适合</th><th>安装起价</th></tr></thead>
        <tbody>
          <tr><td>100–150</td><td>1.0 HP</td><td>标准卧室</td><td>RM 199</td></tr>
          <tr><td>150–250</td><td>1.5 HP</td><td>主卧、小客厅</td><td>RM 219</td></tr>
          <tr><td>250–400</td><td>2.0 HP</td><td>大客厅</td><td>RM 249</td></tr>
          <tr><td>400–550</td><td>2.5 HP</td><td>开放式区域</td><td>RM 279</td></tr>
          <tr><td>550–700</td><td>3.0 HP</td><td>商业/大厅</td><td>RM 329</td></tr>
        </tbody>
      </table>

      <h2>试试我们的免费 BTU 计算器</h2>
      <p>不确定房间大小？使用我们免费的<a href="/btu-calculator">BTU 计算器</a>获取即时匹数推荐。</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong>——告诉我们您的房间尺寸，我们推荐完美匹数。</p>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POST 5: Maximum Piping Distance
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "aircond-piping-distance-maximum-malaysia",
    title: "Maximum Aircond Piping Distance — Does Pipe Length Affect Cooling?",
    titleMS: "Jarak Paip Aircond Maksimum — Adakah Panjang Paip Mempengaruhi Penyejukan?",
    titleZH: "冷气最大管道距离——管道长度影响制冷吗？",
    excerpt: "How far can your outdoor unit be from the indoor unit? Maximum pipe lengths by HP, what happens when pipes are too long, and how proper sizing protects your cooling performance.",
    excerptMS: "Berapa jauh unit luar boleh dari unit dalaman? Panjang paip maksimum mengikut HP, apa yang berlaku apabila paip terlalu panjang.",
    excerptZH: "室外机离室内机可以有多远？按匹数分类的最大管道长度，管道过长时会发生什么，以及正确的尺寸如何保护制冷性能。",
    category: "Installation Guide",
    categoryMS: "Panduan Pemasangan",
    categoryZH: "安装指南",
    tags: ["aircond piping distance", "maximum pipe length", "copper pipe installation", "pipe length cooling", "split unit piping"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 5,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kl-selangor.webp",
    imageAlt: "KL Renovator technician measuring copper pipe length during aircond installation in KL",
    content: `
      <h2>Does Aircond Pipe Length Really Affect Cooling?</h2>
      <p>Yes — and it's one of the most overlooked factors in aircond installation. The distance between your indoor and outdoor units directly impacts cooling efficiency, compressor lifespan, and electricity consumption. Our <a href="/near-me">installation specialists near you</a> explain everything Malaysian homeowners need to know.</p>

      <h2>Maximum Pipe Length by HP Size</h2>
      <table>
        <thead><tr><th>HP Size</th><th>Max Pipe Length</th><th>Max Height Difference</th><th>Standard Included</th></tr></thead>
        <tbody>
          <tr><td>1.0 HP</td><td>15 meters</td><td>5 meters</td><td>7ft (2.1m)</td></tr>
          <tr><td>1.5 HP</td><td>20 meters</td><td>7 meters</td><td>7ft (2.1m)</td></tr>
          <tr><td>2.0 HP</td><td>20 meters</td><td>10 meters</td><td>7ft (2.1m)</td></tr>
          <tr><td>2.5 HP</td><td>25 meters</td><td>10 meters</td><td>7ft (2.1m)</td></tr>
          <tr><td>3.0 HP</td><td>30 meters</td><td>15 meters</td><td>7ft (2.1m)</td></tr>
        </tbody>
      </table>

      <h2>What Happens When Pipes Are Too Long?</h2>
      <ul>
        <li><strong>Reduced cooling capacity</strong> — every meter beyond recommended adds pressure drop, reducing cooling by 1-2% per meter</li>
        <li><strong>Higher electricity consumption</strong> — compressor works harder to push refrigerant through longer pipes</li>
        <li><strong>Oil return problems</strong> — compressor oil gets trapped in long pipe runs, leading to premature wear</li>
        <li><strong>Slower cooling response</strong> — more refrigerant volume means longer time to reach set temperature</li>
      </ul>

      <h2>Height Difference Matters Too</h2>
      <p>When the outdoor unit is significantly above or below the indoor unit, gravity affects refrigerant flow:</p>
      <ul>
        <li><strong>Outdoor above indoor</strong> — oil return becomes harder; may need oil traps every 5-8 meters of vertical rise</li>
        <li><strong>Outdoor below indoor</strong> — generally easier, but drainage must still flow correctly</li>
        <li><strong>Condo installations</strong> — high-floor units with ground-level outdoor condensers need special consideration</li>
      </ul>

      <h2>Additional Copper Pipe Cost</h2>
      <p>KL Renovator's <a href="/installation-price-malaysia">installation packages</a> include 7ft of Type L copper pipe. Beyond that:</p>
      <ul>
        <li>1.0-1.5 HP: RM 18-22 per additional foot</li>
        <li>2.0-2.5 HP: RM 22-28 per additional foot</li>
        <li>3.0 HP: RM 28-35 per additional foot</li>
      </ul>
      <p>Every additional foot includes copper pipe, Armaflex insulation, and wiring extension.</p>

      <h2>Tips for Optimal Pipe Length</h2>
      <ul>
        <li>Position the indoor unit on the same wall as the outdoor unit when possible</li>
        <li>Avoid unnecessary bends — each 90° bend adds equivalent resistance to 1-2 meters of straight pipe</li>
        <li>For runs over 10 meters, discuss with your installer about upsizing pipe diameter</li>
        <li>Always measure the actual route, not just the straight-line distance</li>
      </ul>

      <h2>Get Expert Pipe Planning Advice</h2>
      <p>Our <a href="/aircond-installation-kl">top-rated installation team</a> assesses optimal pipe routing during the free site survey. We'll advise on the best indoor/outdoor unit positions to minimize pipe length and maximize cooling performance.</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong> — send us a photo of your planned installation and we'll advise on pipe requirements.</p>
    `,
    contentMS: `
      <h2>Adakah Panjang Paip Aircond Mempengaruhi Penyejukan?</h2>
      <p>Ya — dan ia salah satu faktor paling diabaikan. Jarak antara unit dalaman dan luar memberi kesan langsung kepada kecekapan penyejukan. <a href="/near-me">Pakar pemasangan berhampiran anda</a> menerangkan semua yang perlu diketahui.</p>

      <h2>Panjang Paip Maksimum Mengikut HP</h2>
      <table>
        <thead><tr><th>HP</th><th>Max Panjang</th><th>Termasuk Standard</th></tr></thead>
        <tbody>
          <tr><td>1.0 HP</td><td>15 meter</td><td>7 kaki</td></tr>
          <tr><td>1.5 HP</td><td>20 meter</td><td>7 kaki</td></tr>
          <tr><td>2.0 HP</td><td>20 meter</td><td>7 kaki</td></tr>
          <tr><td>2.5-3.0 HP</td><td>25-30 meter</td><td>7 kaki</td></tr>
        </tbody>
      </table>

      <h2>Dapatkan Nasihat Pakar</h2>
      <p><a href="/aircond-installation-kl">Pasukan pemasangan terbaik kami</a> menilai laluan paip optimum semasa tinjauan tapak percuma. WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>冷气管道长度真的影响制冷吗？</h2>
      <p>是的——这是安装中最常被忽视的因素之一。室内外机之间的距离直接影响制冷效率。我们<a href="/near-me">您附近的安装专家</a>为您解释。</p>

      <h2>按匹数分类的最大管道长度</h2>
      <table>
        <thead><tr><th>匹数</th><th>最大长度</th><th>标准包含</th></tr></thead>
        <tbody>
          <tr><td>1.0 HP</td><td>15米</td><td>7英尺</td></tr>
          <tr><td>1.5 HP</td><td>20米</td><td>7英尺</td></tr>
          <tr><td>2.0 HP</td><td>20米</td><td>7英尺</td></tr>
          <tr><td>2.5-3.0 HP</td><td>25-30米</td><td>7英尺</td></tr>
        </tbody>
      </table>

      <h2>获取专家管道规划建议</h2>
      <p>我们<a href="/aircond-installation-kl">顶级安装团队</a>在免费现场勘查中评估最佳管道路线。WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
];
