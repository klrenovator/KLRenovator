/**
 * INS-18 Blog Batch 2 (Posts 6-10) — Installation-Focused Blog Posts
 * Round 79 (original) / Round 84 (12.1-12.4 MS/ZH expansion)
 *
 * v2: Expanded MS content from 17-24% → 95-100% coverage
 * v2: Expanded ZH content from 3-6% → 50-60% coverage
 */

import type { BlogPost } from "./blog-posts";

export const installationBlogBatch2: BlogPost[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // POST 6: Installation Cost KL vs Selangor
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "aircond-installation-cost-kl-vs-selangor-2026",
    title: "Aircond Installation Cost: KL vs Selangor — Why Prices Differ by Area",
    titleMS: "Kos Pemasangan Aircond: KL vs Selangor — Kenapa Harga Berbeza Mengikut Kawasan",
    titleZH: "冷气安装费用：KL vs 雪兰莪——为什么不同地区价格不同",
    excerpt: "Does aircond installation cost more in KL than Selangor? We break down pricing by area, explain what affects the final price, and why KL Renovator charges the same transparent rate everywhere.",
    excerptMS: "Adakah pemasangan aircond lebih mahal di KL berbanding Selangor? Kami pecahkan harga mengikut kawasan dan terangkan kenapa KL Renovator mengenakan kadar telus yang sama di mana-mana.",
    excerptZH: "KL 的冷气安装费用比雪兰莪贵吗？我们按地区分析价格，解释影响最终价格的因素，以及为什么 KL Renovator 在所有地方收取相同的透明费用。",
    category: "Pricing Guide",
    categoryMS: "Panduan Harga",
    categoryZH: "价格指南",
    tags: ["installation cost KL", "installation cost Selangor", "aircond pricing by area", "transparent pricing"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 5,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kuala-lumpur.webp",
    imageAlt: "KL Renovator installation pricing comparison across KL and Selangor areas",
    content: `
      <h2>Does Location Affect Installation Cost?</h2>
      <p>One of the most common questions our <a href="/near-me">installation specialists</a> get is: "Does it cost more to install in KL than Selangor?" The short answer from most installers is yes — but at KL Renovator, we believe in transparent, location-independent pricing. Here's why some companies charge more by area, and why we don't.</p>

      <h2>Why Some Installers Charge More in KL</h2>
      <ul>
        <li><strong>Traffic and parking</strong> — KL city center has congested roads, expensive parking (RM 3-8/hour), and limited loading zones. Installers factor in 1-2 hours of lost time and RM 20-40 parking costs.</li>
        <li><strong>Condo access complexity</strong> — High-rise condos need lift booking, security registration, and sometimes after-hours scheduling. This adds 30-60 minutes per job.</li>
        <li><strong>Reinforced concrete walls</strong> — Most KL condos have thick concrete walls that take 20-30 minutes to drill vs 5 minutes for brick walls in landed Selangor homes.</li>
        <li><strong>Higher business costs</strong> — KL-based companies pay higher rent, wages, and insurance premiums.</li>
      </ul>

      <h2>Typical Price Difference: KL vs Selangor</h2>
      <table>
        <thead><tr><th>Factor</th><th>KL Surcharge</th><th>Selangor</th></tr></thead>
        <tbody>
          <tr><td>Base installation (1.5 HP)</td><td>RM 220-280</td><td>RM 180-220</td></tr>
          <tr><td>Condo surcharge</td><td>RM 50-100</td><td>RM 30-50</td></tr>
          <tr><td>Concrete drilling (per hole)</td><td>RM 30-50</td><td>RM 15-25</td></tr>
          <tr><td>After-hours surcharge</td><td>RM 80-150</td><td>RM 50-80</td></tr>
          <tr><td>Parking/transport</td><td>RM 20-40</td><td>RM 0-10</td></tr>
        </tbody>
      </table>

      <h2>Why KL Renovator Charges the Same Everywhere</h2>
      <p>We believe transparent pricing builds trust. That's why our <a href="/aircond-installation-kl">installation pricing</a> is the same whether you're in Mont Kiara, Cheras, Petaling Jaya, or Shah Alam:</p>
      <ul>
        <li><strong>1.0 HP:</strong> RM 199 — everywhere in KL & Selangor</li>
        <li><strong>1.5 HP:</strong> RM 219 — everywhere in KL & Selangor</li>
        <li><strong>2.0 HP:</strong> RM 249 — everywhere in KL & Selangor</li>
        <li><strong>2.5 HP:</strong> RM 279 — everywhere in KL & Selangor</li>
        <li><strong>3.0 HP:</strong> RM 329 — everywhere in KL & Selangor</li>
      </ul>
      <p>No condo surcharge. No KL premium. No parking fee passed to you. The price we quote on WhatsApp is the price you pay — period.</p>

      <h2>What IS Charged Extra (Transparently)</h2>
      <p>While our base rate is location-independent, some site-specific work does cost extra — and we always quote this before starting:</p>
      <ul>
        <li><strong>Additional copper pipe:</strong> RM 18-35 per foot beyond included 7ft</li>
        <li><strong>Heavy-duty bracket:</strong> RM 50-80 (for larger units or exposed outdoor positions)</li>
        <li><strong>Casing/trunking:</strong> RM 8-12 per foot for exposed pipe runs</li>
        <li><strong>New MCB circuit:</strong> RM 150-250 (for 2.5 HP+ units needing dedicated circuit)</li>
        <li><strong>Condensate pump:</strong> RM 120-180 (when gravity drainage isn't possible)</li>
      </ul>

      <h2>How to Get the Best Installation Value</h2>
      <ul>
        <li><strong>Book 2+ units:</strong> Volume discount — 5% off for 2-3 units, 10% off for 4-8 units</li>
        <li><strong>Plan pipe routing:</strong> Position indoor unit on same wall as outdoor unit to minimize extra pipe</li>
        <li><strong>Choose weekday slots:</strong> Weekend and after-hours slots may have limited availability</li>
        <li><strong>Compare total cost:</strong> A RM 150 "budget" installer who charges RM 50 condo fee + RM 40 parking + RM 30 drilling = RM 270 total. Our RM 199 includes everything.</li>
      </ul>

      <h2>Get Your Transparent Quote Now</h2>
      <p>WhatsApp <strong>+60 18-298 3573</strong> with your unit type, HP, and address. Our <a href="/near-me">expert installers near you</a> will confirm the exact price within 30 minutes — same price whether you're in KLCC or Kajang.</p>
    `,
    contentMS: `
      <h2>Adakah Lokasi Mempengaruhi Kos Pemasangan?</h2>
      <p>Salah satu soalan paling biasa yang <a href="/near-me">pakar pemasangan kami</a> terima ialah: "Adakah lebih mahal memasang di KL berbanding Selangor?" Jawapan singkat dari kebanyakan pemasang ialah ya — tetapi di KL Renovator, kami percaya pada harga telus yang tidak bergantung pada lokasi. Berikut ialah kenapa sesetengah syarikat mengenakan caj lebih mengikut kawasan, dan kenapa kami tidak.</p>

      <h2>Kenapa Sesetengah Pemasang Caj Lebih di KL</h2>
      <ul>
        <li><strong>Trafik dan parking</strong> — pusat bandar KL mempunyai jalan sesak, parking mahal (RM 3-8/jam), dan zon memunggah terhad. Pemasang mengambil kira 1-2 jam masa terbuang dan kos parking RM 20-40.</li>
        <li><strong>Kompleksiti akses kondominium</strong> — kondominium tinggi memerlukan tempahan lif, pendaftaran keselamatan, dan kadang-kadang penjadualan luar waktu. Ini menambah 30-60 minit setiap kerja.</li>
        <li><strong>Dinding konkrit bertetulang</strong> — kebanyakan kondominium KL mempunyai dinding konkrit tebal yang mengambil masa 20-30 minit untuk digerudi berbanding 5 minit untuk dinding bata di rumah teres Selangor.</li>
        <li><strong>Kos perniagaan lebih tinggi</strong> — syarikat berpangkalan di KL membayar sewa, gaji, dan premium insurans yang lebih tinggi.</li>
      </ul>

      <h2>Perbezaan Harga Biasa: KL vs Selangor</h2>
      <table>
        <thead><tr><th>Faktor</th><th>Surcaj KL</th><th>Selangor</th></tr></thead>
        <tbody>
          <tr><td>Pemasangan asas (1.5 HP)</td><td>RM 220-280</td><td>RM 180-220</td></tr>
          <tr><td>Surcaj kondominium</td><td>RM 50-100</td><td>RM 30-50</td></tr>
          <tr><td>Penggerudian konkrit (setiap lubang)</td><td>RM 30-50</td><td>RM 15-25</td></tr>
          <tr><td>Surcaj luar waktu</td><td>RM 80-150</td><td>RM 50-80</td></tr>
          <tr><td>Parking/pengangkutan</td><td>RM 20-40</td><td>RM 0-10</td></tr>
        </tbody>
      </table>

      <h2>Kenapa KL Renovator Caj Sama Di Mana-mana</h2>
      <p>Kami percaya harga telus membina kepercayaan. Itulah sebabnya <a href="/aircond-installation-kl">harga pemasangan kami</a> sama sama ada anda di Mont Kiara, Cheras, Petaling Jaya, atau Shah Alam:</p>
      <ul>
        <li><strong>1.0 HP:</strong> RM 199 — di mana-mana di KL & Selangor</li>
        <li><strong>1.5 HP:</strong> RM 219 — di mana-mana di KL & Selangor</li>
        <li><strong>2.0 HP:</strong> RM 249 — di mana-mana di KL & Selangor</li>
        <li><strong>2.5 HP:</strong> RM 279 — di mana-mana di KL & Selangor</li>
        <li><strong>3.0 HP:</strong> RM 329 — di mana-mana di KL & Selangor</li>
      </ul>
      <p>Tiada surcaj kondominium. Tiada premium KL. Tiada caj parking dipindahkan kepada anda. Harga yang kami sebut di WhatsApp ialah harga yang anda bayar — titik.</p>

      <h2>Apa Yang Dicaj Tambahan (Secara Telus)</h2>
      <p>Walaupun kadar asas kami tidak bergantung lokasi, sesetengah kerja khusus tapak memang kos tambahan — dan kami sentiasa menyebut harga sebelum memulakan:</p>
      <ul>
        <li><strong>Paip tembaga tambahan:</strong> RM 18-35 setiap kaki melebihi 7 kaki yang termasuk</li>
        <li><strong>Pendakap berat:</strong> RM 50-80 (untuk unit lebih besar atau kedudukan luar terdedah)</li>
        <li><strong>Casing/trunking:</strong> RM 8-12 setiap kaki untuk laluan paip terdedah</li>
        <li><strong>Litar MCB baru:</strong> RM 150-250 (untuk unit 2.5 HP+ yang memerlukan litar khusus)</li>
        <li><strong>Pam kondensat:</strong> RM 120-180 (apabila saliran graviti tidak mungkin)</li>
      </ul>

      <h2>Cara Mendapatkan Nilai Pemasangan Terbaik</h2>
      <ul>
        <li><strong>Tempah 2+ unit:</strong> Diskaun volum — 5% untuk 2-3 unit, 10% untuk 4-8 unit</li>
        <li><strong>Rancang laluan paip:</strong> Letakkan unit dalaman di dinding yang sama dengan unit luar untuk mengurangkan paip tambahan</li>
        <li><strong>Pilih slot hari bekerja:</strong> Slot hujung minggu dan luar waktu mungkin mempunyai ketersediaan terhad</li>
        <li><strong>Bandingkan jumlah kos:</strong> Pemasang "bajet" RM 150 yang mengenakan caj kondominium RM 50 + parking RM 40 + penggerudian RM 30 = RM 270 jumlah. RM 199 kami termasuk semua.</li>
      </ul>

      <h2>Dapatkan Sebut Harga Telus Anda Sekarang</h2>
      <p>WhatsApp <strong>+60 18-298 3573</strong> dengan jenis unit, HP, dan alamat anda. <a href="/near-me">Pemasang pakar berhampiran anda</a> akan mengesahkan harga tepat dalam 30 minit — harga sama sama ada anda di KLCC atau Kajang.</p>
    `,
    contentZH: `
      <h2>位置影响安装费用吗？</h2>
      <p>我们<a href="/near-me">安装专家</a>最常被问的问题之一是："KL安装比雪兰莪贵吗？"大多数安装人员的简短回答是肯定的——但在KL Renovator，我们相信透明的、不依赖位置的价格。以下是为什么一些公司按地区收费更高，以及为什么我们不这样做。</p>

      <h2>为什么有些安装人员在KL收费更高</h2>
      <ul>
        <li><strong>交通和停车</strong>——KL市中心道路拥堵、停车贵（RM 3-8/小时）、装卸区有限。安装人员计入1-2小时的时间损失和RM 20-40停车费。</li>
        <li><strong>公寓进出复杂</strong>——高层公寓需要电梯预约、安保登记，有时需要非营业时间排程。每项工作增加30-60分钟。</li>
        <li><strong>钢筋混凝土墙</strong>——大多数KL公寓有厚混凝土墙，钻孔需20-30分钟，而雪兰莪排屋的砖墙只需5分钟。</li>
        <li><strong>更高的商业成本</strong>——KL的公司支付更高的租金、工资和保险费。</li>
      </ul>

      <h2>典型价格差异：KL vs 雪兰莪</h2>
      <table>
        <thead><tr><th>因素</th><th>KL附加费</th><th>雪兰莪</th></tr></thead>
        <tbody>
          <tr><td>基础安装（1.5匹）</td><td>RM 220-280</td><td>RM 180-220</td></tr>
          <tr><td>公寓附加费</td><td>RM 50-100</td><td>RM 30-50</td></tr>
          <tr><td>混凝土钻孔（每孔）</td><td>RM 30-50</td><td>RM 15-25</td></tr>
          <tr><td>非营业时间附加费</td><td>RM 80-150</td><td>RM 50-80</td></tr>
          <tr><td>停车/交通</td><td>RM 20-40</td><td>RM 0-10</td></tr>
        </tbody>
      </table>

      <h2>为什么KL Renovator到处收费相同</h2>
      <p>我们相信透明价格建立信任。这就是为什么我们的<a href="/aircond-installation-kl">安装价格</a>无论您在Mont Kiara、蕉赖、八打灵再也还是莎阿南都一样：</p>
      <ul>
        <li><strong>1.0匹：</strong>RM 199——KL和雪兰莪统一</li>
        <li><strong>1.5匹：</strong>RM 219——KL和雪兰莪统一</li>
        <li><strong>2.0匹：</strong>RM 249——KL和雪兰莪统一</li>
        <li><strong>2.5匹：</strong>RM 279——KL和雪兰莪统一</li>
        <li><strong>3.0匹：</strong>RM 329——KL和雪兰莪统一</li>
      </ul>
      <p>无公寓附加费。无KL溢价。无停车费转嫁。我们在WhatsApp上报的价格就是您付的价格——句号。</p>

      <h2>什么确实额外收费（透明地）</h2>
      <ul>
        <li><strong>额外铜管：</strong>超出包含的7英尺，每英尺RM 18-35</li>
        <li><strong>重型支架：</strong>RM 50-80（大型机组或暴露室外位置）</li>
        <li><strong>线槽/走线架：</strong>明装管道每英尺RM 8-12</li>
        <li><strong>新MCB电路：</strong>RM 150-250（2.5匹以上需独立电路）</li>
        <li><strong>冷凝水泵：</strong>RM 120-180（无法重力排水时）</li>
      </ul>

      <h2>获得最佳安装价值的方法</h2>
      <ul>
        <li><strong>预约2台以上：</strong>批量折扣——2-3台95折，4-8台9折</li>
        <li><strong>规划管道路线：</strong>将室内机放在与室外机同一面墙上以减少额外管道</li>
        <li><strong>选择工作日时段：</strong>周末和非营业时段可能可用性有限</li>
        <li><strong>比较总成本：</strong>RM 150的"预算"安装人员收RM 50公寓费+RM 40停车+RM 30钻孔=RM 270总计。我们的RM 199包含一切。</li>
      </ul>

      <h2>立即获取透明报价</h2>
      <p>WhatsApp <strong>+60 18-298 3573</strong>，提供您的机型、匹数和地址。我们<a href="/near-me">您附近的专家安装人员</a>将在30分钟内确认确切价格——无论您在KLCC还是加影，价格相同。</p>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POST 7: Split Unit vs Window Unit
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "split-unit-vs-window-unit-installation-malaysia",
    title: "Split Unit vs Window Unit Installation — Which Is Better for Malaysian Homes?",
    titleMS: "Pemasangan Unit Split vs Unit Tingkap — Mana Lebih Baik Untuk Rumah Malaysia?",
    titleZH: "分体式 vs 窗式冷气安装——哪种更适合马来西亚住宅？",
    excerpt: "Comparing split unit and window unit aircond installation: cost, cooling performance, noise, aesthetics, and which type suits your home best. Expert comparison from 500+ installations.",
    excerptMS: "Membandingkan pemasangan unit split dan unit tingkap: kos, prestasi penyejukan, bunyi, estetika, dan jenis mana yang paling sesuai untuk rumah anda.",
    excerptZH: "比较分体式和窗式冷气安装：费用、制冷性能、噪音、美观，以及哪种类型最适合您的家。",
    category: "Buying Guide",
    categoryMS: "Panduan Pembelian",
    categoryZH: "购买指南",
    tags: ["split unit vs window unit", "aircond type comparison", "window aircond installation", "split unit Malaysia"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 6,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kuala-lumpur.webp",
    imageAlt: "Split unit vs window unit aircond comparison by KL Renovator installation specialists",
    content: `
      <h2>Split Unit or Window Unit — Which Should You Install?</h2>
      <p>Choosing between a split unit and a window unit is one of the first decisions homeowners face. Our <a href="/near-me">installation specialists</a> have installed both types across hundreds of Malaysian homes — here's an honest comparison to help you decide.</p>

      <h2>Quick Comparison Table</h2>
      <table>
        <thead><tr><th>Factor</th><th>Split Unit (Wall-Mounted)</th><th>Window Unit</th></tr></thead>
        <tbody>
          <tr><td>Installation cost</td><td>From RM 199</td><td>From RM 199</td></tr>
          <tr><td>Unit price range</td><td>RM 900-3,500</td><td>RM 500-1,500</td></tr>
          <tr><td>Installation time</td><td>2-3 hours</td><td>1-1.5 hours</td></tr>
          <tr><td>Noise level</td><td>Very quiet (19-35 dB)</td><td>Moderate (40-55 dB)</td></tr>
          <tr><td>Cooling efficiency</td><td>High (inverter models)</td><td>Moderate</td></tr>
          <tr><td>Aesthetics</td><td>Sleek indoor unit, hidden outdoor</td><td>Visible box in window</td></tr>
          <tr><td>Maintenance access</td><td>Easy filter access</td><td>May need partial removal</td></tr>
          <tr><td>Lifespan</td><td>10-15 years</td><td>7-10 years</td></tr>
          <tr><td>Best for</td><td>Bedrooms, living rooms, offices</td><td>Rental properties, budget cooling</td></tr>
        </tbody>
      </table>

      <h2>When to Choose a Split Unit</h2>
      <ul>
        <li><strong>Bedrooms and living rooms</strong> — quieter operation (19 dB on low) means undisturbed sleep</li>
        <li><strong>Energy efficiency priority</strong> — inverter split units use 30-50% less electricity than window units</li>
        <li><strong>Aesthetics matter</strong> — sleek indoor panel blends with décor, outdoor unit hidden on ledge or balcony</li>
        <li><strong>Long-term investment</strong> — 10-15 year lifespan with proper maintenance</li>
        <li><strong>Multiple rooms</strong> — multi-split systems can cool 2-4 rooms from one outdoor unit</li>
      </ul>

      <h2>When to Choose a Window Unit</h2>
      <ul>
        <li><strong>Rental properties</strong> — lower upfront cost, easy to remove when moving out</li>
        <li><strong>Budget cooling</strong> — unit price 40-60% cheaper than equivalent split unit</li>
        <li><strong>Quick installation</strong> — 1-1.5 hours vs 2-3 hours for split unit</li>
        <li><strong>Older buildings with window slots</strong> — some pre-war shoplots and older flats have built-in window unit spaces</li>
        <li><strong>Temporary cooling</strong> — ideal for short-term needs (renovation period, temporary office)</li>
      </ul>

      <h2>Installation Differences</h2>

      <h3>Split Unit Installation (2-3 hours)</h3>
      <p>Our <a href="/wall-mounted-aircond-installation-kl">wall-mounted installation</a> includes: indoor unit bracket, copper pipe routing, electrical wiring, drain pipe, outdoor unit placement, vacuum evacuation, and commissioning. Requires wall drilling for pipe passage.</p>

      <h3>Window Unit Installation (1-1.5 hours)</h3>
      <p>Our <a href="/window-unit-aircond-installation-kl">window unit installation</a> includes: secure mounting in window frame, weatherproof sealing, electrical connection, and testing. Simpler process but needs a suitable window opening.</p>

      <h2>Electricity Cost Comparison</h2>
      <p>Running 8 hours daily for 30 days at TNB residential tariff:</p>
      <ul>
        <li><strong>1.5 HP Inverter Split:</strong> ~RM 80-100/month</li>
        <li><strong>1.5 HP Non-Inverter Split:</strong> ~RM 120-150/month</li>
        <li><strong>1.5 HP Window Unit:</strong> ~RM 140-180/month</li>
      </ul>
      <p>Over 5 years, an inverter split unit saves RM 2,000-4,000 in electricity vs a window unit — more than covering the higher upfront cost.</p>

      <h2>Our Recommendation</h2>
      <p>For most Malaysian homeowners, a <strong>split unit is the better long-term investment</strong> — quieter, more efficient, longer-lasting, and better looking. Window units make sense for rental properties, tight budgets, or temporary needs.</p>
      <p>Both types installed from <strong>RM 199</strong> by our <a href="/aircond-installation-kl">top-rated installation team</a>. WhatsApp <strong>+60 18-298 3573</strong> for advice on which type suits your home.</p>
    `,
    contentMS: `
      <h2>Unit Split atau Unit Tingkap — Mana Yang Perlu Anda Pasang?</h2>
      <p>Memilih antara unit split dan unit tingkap adalah salah satu keputusan pertama yang dihadapi pemilik rumah. <a href="/near-me">Pakar pemasangan kami</a> telah memasang kedua-dua jenis di ratusan rumah Malaysia — berikut perbandingan jujur untuk membantu anda membuat keputusan.</p>

      <h2>Jadual Perbandingan Pantas</h2>
      <table>
        <thead><tr><th>Faktor</th><th>Unit Split (Dinding)</th><th>Unit Tingkap</th></tr></thead>
        <tbody>
          <tr><td>Kos pemasangan</td><td>Dari RM 199</td><td>Dari RM 199</td></tr>
          <tr><td>Julat harga unit</td><td>RM 900-3,500</td><td>RM 500-1,500</td></tr>
          <tr><td>Masa pemasangan</td><td>2-3 jam</td><td>1-1.5 jam</td></tr>
          <tr><td>Paras bunyi</td><td>Sangat senyap (19-35 dB)</td><td>Sederhana (40-55 dB)</td></tr>
          <tr><td>Kecekapan penyejukan</td><td>Tinggi (model inverter)</td><td>Sederhana</td></tr>
          <tr><td>Estetika</td><td>Panel dalaman elegan, luar tersembunyi</td><td>Kotak kelihatan di tingkap</td></tr>
          <tr><td>Akses penyelenggaraan</td><td>Akses penapis mudah</td><td>Mungkin perlu tanggal separa</td></tr>
          <tr><td>Jangka hayat</td><td>10-15 tahun</td><td>7-10 tahun</td></tr>
          <tr><td>Sesuai untuk</td><td>Bilik tidur, ruang tamu, pejabat</td><td>Rumah sewa, penyejukan bajet</td></tr>
        </tbody>
      </table>

      <h2>Bila Pilih Unit Split</h2>
      <ul>
        <li><strong>Bilik tidur dan ruang tamu</strong> — operasi lebih senyap (19 dB pada rendah) bermakna tidur tidak terganggu</li>
        <li><strong>Keutamaan kecekapan tenaga</strong> — unit split inverter menggunakan 30-50% kurang elektrik berbanding unit tingkap</li>
        <li><strong>Estetika penting</strong> — panel dalaman elegan sepadan dengan hiasan, unit luar tersembunyi di birai atau balkoni</li>
        <li><strong>Pelaburan jangka panjang</strong> — jangka hayat 10-15 tahun dengan penyelenggaraan betul</li>
        <li><strong>Berbilang bilik</strong> — sistem multi-split boleh menyejukkan 2-4 bilik dari satu unit luar</li>
      </ul>

      <h2>Bila Pilih Unit Tingkap</h2>
      <ul>
        <li><strong>Rumah sewa</strong> — kos awal lebih rendah, mudah ditanggalkan apabila berpindah</li>
        <li><strong>Penyejukan bajet</strong> — harga unit 40-60% lebih murah daripada unit split setara</li>
        <li><strong>Pemasangan pantas</strong> — 1-1.5 jam berbanding 2-3 jam untuk unit split</li>
        <li><strong>Bangunan lama dengan slot tingkap</strong> — sesetengah kedai pra-perang dan flat lama mempunyai ruang unit tingkap terbina dalam</li>
        <li><strong>Penyejukan sementara</strong> — sesuai untuk keperluan jangka pendek (tempoh ubah suai, pejabat sementara)</li>
      </ul>

      <h2>Perbezaan Pemasangan</h2>

      <h3>Pemasangan Unit Split (2-3 jam)</h3>
      <p><a href="/wall-mounted-aircond-installation-kl">Pemasangan dinding kami</a> termasuk: pendakap unit dalaman, laluan paip tembaga, pendawaian elektrik, paip saliran, penempatan unit luar, evakuasi vakum, dan pentauliahan. Memerlukan penggerudian dinding untuk laluan paip.</p>

      <h3>Pemasangan Unit Tingkap (1-1.5 jam)</h3>
      <p><a href="/window-unit-aircond-installation-kl">Pemasangan unit tingkap kami</a> termasuk: pemasangan kukuh dalam bingkai tingkap, pengedap tahan cuaca, sambungan elektrik, dan ujian. Proses lebih mudah tetapi memerlukan bukaan tingkap yang sesuai.</p>

      <h2>Perbandingan Kos Elektrik</h2>
      <p>Beroperasi 8 jam sehari selama 30 hari pada tarif kediaman TNB:</p>
      <ul>
        <li><strong>1.5 HP Split Inverter:</strong> ~RM 80-100/bulan</li>
        <li><strong>1.5 HP Split Bukan Inverter:</strong> ~RM 120-150/bulan</li>
        <li><strong>1.5 HP Unit Tingkap:</strong> ~RM 140-180/bulan</li>
      </ul>
      <p>Dalam 5 tahun, unit split inverter menjimatkan RM 2,000-4,000 dalam elektrik berbanding unit tingkap — lebih daripada menampung kos awal yang lebih tinggi.</p>

      <h2>Cadangan Kami</h2>
      <p>Untuk kebanyakan pemilik rumah Malaysia, <strong>unit split adalah pelaburan jangka panjang yang lebih baik</strong> — lebih senyap, lebih cekap, lebih tahan lama, dan lebih cantik. Unit tingkap masuk akal untuk rumah sewa, bajet ketat, atau keperluan sementara.</p>
      <p>Kedua-dua jenis dipasang dari <strong>RM 199</strong> oleh <a href="/aircond-installation-kl">pasukan pemasangan terbaik kami</a>. WhatsApp <strong>+60 18-298 3573</strong> untuk nasihat jenis mana yang sesuai untuk rumah anda.</p>
    `,
    contentZH: `
      <h2>分体式还是窗式——您应该安装哪种？</h2>
      <p>在分体式和窗式之间选择是屋主面临的第一个决定之一。我们<a href="/near-me">安装专家</a>在数百个马来西亚住宅中安装过两种类型——以下是诚实比较帮助您决定。</p>

      <h2>快速比较表</h2>
      <table>
        <thead><tr><th>因素</th><th>分体式（壁挂式）</th><th>窗式</th></tr></thead>
        <tbody>
          <tr><td>安装费用</td><td>RM 199起</td><td>RM 199起</td></tr>
          <tr><td>机组价格范围</td><td>RM 900-3,500</td><td>RM 500-1,500</td></tr>
          <tr><td>安装时间</td><td>2-3小时</td><td>1-1.5小时</td></tr>
          <tr><td>噪音水平</td><td>很安静（19-35 dB）</td><td>中等（40-55 dB）</td></tr>
          <tr><td>制冷效率</td><td>高（变频型号）</td><td>中等</td></tr>
          <tr><td>美观</td><td>流线型室内机，室外机隐藏</td><td>窗户中可见的箱体</td></tr>
          <tr><td>维护便利性</td><td>滤网易于取出</td><td>可能需要部分拆卸</td></tr>
          <tr><td>寿命</td><td>10-15年</td><td>7-10年</td></tr>
          <tr><td>最适合</td><td>卧室、客厅、办公室</td><td>出租物业、预算制冷</td></tr>
        </tbody>
      </table>

      <h2>何时选择分体式</h2>
      <ul>
        <li><strong>卧室和客厅</strong>——更安静运行（低速19 dB）意味着不受干扰的睡眠</li>
        <li><strong>能效优先</strong>——变频分体机比窗机省电30-50%</li>
        <li><strong>美观重要</strong>——流线型室内面板与装修融合，室外机隐藏在平台或阳台上</li>
        <li><strong>长期投资</strong>——适当维护下10-15年寿命</li>
        <li><strong>多个房间</strong>——多联机系统可从一台室外机制冷2-4个房间</li>
      </ul>

      <h2>何时选择窗式</h2>
      <ul>
        <li><strong>出租物业</strong>——更低的前期成本，搬出时易于拆除</li>
        <li><strong>预算制冷</strong>——机组价格比同等分体机便宜40-60%</li>
        <li><strong>快速安装</strong>——1-1.5小时 vs 分体机2-3小时</li>
        <li><strong>有窗槽的旧建筑</strong>——一些战前店铺和旧公寓有内置窗机位</li>
        <li><strong>临时制冷</strong>——适合短期需求（装修期间、临时办公室）</li>
      </ul>

      <h2>安装差异</h2>

      <h3>分体式安装（2-3小时）</h3>
      <p>我们的<a href="/wall-mounted-aircond-installation-kl">壁挂式安装</a>包括：室内机支架、铜管布线、电气接线、排水管、室外机放置、真空抽气和调试。需要墙壁钻孔以通过管道。</p>

      <h3>窗式安装（1-1.5小时）</h3>
      <p>我们的<a href="/window-unit-aircond-installation-kl">窗式安装</a>包括：在窗框中牢固安装、防风雨密封、电气连接和测试。过程更简单但需要合适的窗户开口。</p>

      <h2>电费比较</h2>
      <p>每天运行8小时，30天，按TNB住宅电价：</p>
      <ul>
        <li><strong>1.5匹变频分体：</strong>约RM 80-100/月</li>
        <li><strong>1.5匹定频分体：</strong>约RM 120-150/月</li>
        <li><strong>1.5匹窗机：</strong>约RM 140-180/月</li>
      </ul>
      <p>5年内，变频分体机比窗机节省RM 2,000-4,000电费——远超更高的前期成本。</p>

      <h2>我们的建议</h2>
      <p>对大多数马来西亚屋主来说，<strong>分体式是更好的长期投资</strong>——更安静、更高效、更耐用、更美观。窗式适合出租物业、预算紧张或临时需求。</p>
      <p>两种类型均由我们<a href="/aircond-installation-kl">顶级安装团队</a>以<strong>RM 199起</strong>安装。WhatsApp <strong>+60 18-298 3573</strong>获取哪种类型适合您家的建议。</p>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POST 8: Install Before or After Renovation
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "aircond-installation-before-renovation-malaysia",
    title: "Install Aircond Before or After Renovation? The Complete Timing Guide",
    titleMS: "Pasang Aircond Sebelum atau Selepas Ubah Suai? Panduan Masa Lengkap",
    titleZH: "装修前还是装修后安装冷气？完整时间指南",
    excerpt: "When is the best time to install aircond during home renovation? Learn the optimal timing for concealed piping, electrical work, and unit mounting to save money and avoid rework.",
    excerptMS: "Bilakah masa terbaik memasang aircond semasa ubah suai rumah? Ketahui masa optimum untuk paip tersembunyi, kerja elektrik, dan pemasangan unit.",
    excerptZH: "房屋装修期间什么时候安装冷气最好？了解隐蔽管道、电气工作和机组安装的最佳时机，节省费用并避免返工。",
    category: "Installation Guide",
    categoryMS: "Panduan Pemasangan",
    categoryZH: "安装指南",
    tags: ["aircond renovation timing", "install before renovation", "concealed piping", "renovation planning Malaysia"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 5,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kuala-lumpur.webp",
    imageAlt: "Aircond installation timing during home renovation by KL Renovator specialists",
    content: `
      <h2>When Should You Install Aircond During Renovation?</h2>
      <p>Timing your aircond installation correctly during a home renovation can save you RM 500-1,500 in rework costs and produce a cleaner final result. Our <a href="/near-me">installation specialists</a> have coordinated with hundreds of renovation contractors across KL and Selangor — here's the optimal sequence.</p>

      <h2>The 3-Phase Installation Approach</h2>

      <h3>Phase 1: Pre-Renovation — Concealed Piping (Before Plastering)</h3>
      <p><strong>When:</strong> After hacking/demolition, before plastering and painting.</p>
      <p><strong>What happens:</strong></p>
      <ul>
        <li>Copper pipes, drain pipes, and electrical wiring are run inside walls and ceilings</li>
        <li>Pipe sleeves/chases are cut into concrete or brick walls</li>
        <li>Drain pipe routes planned to connect to nearest bathroom or external wall</li>
        <li>Electrical conduit run from DB box to each aircond point</li>
        <li>Indoor unit position marked and bracket backing board installed</li>
      </ul>
      <p><strong>Why this timing:</strong> Concealed piping gives a clean, invisible finish — no visible trunking or casing on your newly painted walls. It's impossible to do after plastering without hacking and repainting.</p>

      <h3>Phase 2: During Renovation — Electrical & Structural Prep</h3>
      <p><strong>When:</strong> During electrical rough-in and ceiling work.</p>
      <p><strong>What happens:</strong></p>
      <ul>
        <li>Dedicated MCB circuits installed at DB box for each aircond</li>
        <li>Ceiling cassette mounting frame installed before ceiling boards</li>
        <li>Outdoor unit platform/ledge confirmed and drainage point prepared</li>
        <li>Smart home wiring (if using WiFi-enabled aircond) run at this stage</li>
      </ul>

      <h3>Phase 3: Post-Renovation — Unit Mounting & Commissioning</h3>
      <p><strong>When:</strong> After painting is complete and furniture is in place.</p>
      <p><strong>What happens:</strong></p>
      <ul>
        <li>Indoor units mounted on pre-installed brackets</li>
        <li>Concealed pipes connected to units with flare fittings</li>
        <li>Outdoor units placed on prepared platforms</li>
        <li>Vacuum evacuation, pressure test, and commissioning</li>
        <li>Final testing and handover</li>
      </ul>
      <p><strong>Why this timing:</strong> Units are mounted after painting to avoid dust damage and paint splatter. Final commissioning happens when the home is ready for occupancy.</p>

      <h2>Cost Comparison: During vs After Renovation</h2>
      <table>
        <thead><tr><th>Item</th><th>During Renovation</th><th>After Renovation</th></tr></thead>
        <tbody>
          <tr><td>Concealed piping</td><td>RM 200-400 per point</td><td>Not possible (exposed only)</td></tr>
          <tr><td>Exposed trunking</td><td>Not needed</td><td>RM 8-12 per foot</td></tr>
          <tr><td>Wall hacking & repair</td><td>Included in reno</td><td>RM 200-500 per wall</td></tr>
          <tr><td>Repainting affected area</td><td>Included in reno</td><td>RM 150-300 per room</td></tr>
          <tr><td><strong>Total for 3 units</strong></td><td><strong>~RM 800 extra</strong></td><td><strong>~RM 2,000+ extra</strong></td></tr>
        </tbody>
      </table>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Not planning aircond positions early</strong> — decide positions before renovation starts</li>
        <li><strong>Skipping pre-piping</strong> — saves RM 800 now, costs RM 2,000+ later for exposed trunking</li>
        <li><strong>Wrong pipe sizing during pre-piping</strong> — confirm HP requirements before pipes are laid</li>
        <li><strong>Forgetting drain routes</strong> — plan drain pipe paths to nearest wet area</li>
        <li><strong>Mounting units before painting</strong> — dust and paint will damage new units</li>
      </ul>

      <h2>KL Renovator's Renovation Coordination Service</h2>
      <p>Our <a href="/new-home-aircond-installation">new home installation team</a> coordinates directly with your renovation contractor:</p>
      <ul>
        <li>✅ Pre-renovation site visit to plan pipe routes and unit positions</li>
        <li>✅ Phase 1 concealed piping before plastering</li>
        <li>✅ Phase 2 electrical coordination with your electrician</li>
        <li>✅ Phase 3 unit mounting after painting</li>
        <li>✅ Volume discounts for whole-house installations (5-15% off)</li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong> — share your renovation timeline and we'll plan the optimal installation sequence.</p>
    `,
    contentMS: `
      <h2>Bilakah Anda Perlu Pasang Aircond Semasa Ubah Suai?</h2>
      <p>Masa pemasangan aircond yang betul semasa ubah suai rumah boleh menjimatkan RM 500-1,500 dalam kos kerja semula dan menghasilkan hasil akhir yang lebih bersih. <a href="/near-me">Pakar pemasangan kami</a> telah menyelaras dengan ratusan kontraktor ubah suai di seluruh KL dan Selangor — berikut adalah urutan optimum.</p>

      <h2>Pendekatan Pemasangan 3 Fasa</h2>

      <h3>Fasa 1: Pra-Ubah Suai — Paip Tersembunyi (Sebelum Plaster)</h3>
      <p><strong>Bila:</strong> Selepas pemecahan/roboh, sebelum plaster dan pengecatan.</p>
      <p><strong>Apa yang berlaku:</strong></p>
      <ul>
        <li>Paip tembaga, paip saliran, dan pendawaian elektrik dijalankan di dalam dinding dan siling</li>
        <li>Sarung/alur paip dipotong ke dalam dinding konkrit atau bata</li>
        <li>Laluan paip saliran dirancang untuk sambung ke bilik air terdekat atau dinding luar</li>
        <li>Konduit elektrik dijalankan dari kotak DB ke setiap titik aircond</li>
        <li>Kedudukan unit dalaman ditandakan dan papan sokongan pendakap dipasang</li>
      </ul>
      <p><strong>Kenapa masa ini:</strong> Paip tersembunyi memberikan kemasan bersih, tidak kelihatan — tiada trunking atau casing yang kelihatan pada dinding baru dicat anda. Mustahil dilakukan selepas plaster tanpa pemecahan dan pengecatan semula.</p>

      <h3>Fasa 2: Semasa Ubah Suai — Persediaan Elektrik & Struktur</h3>
      <p><strong>Bila:</strong> Semasa kerja elektrik kasar dan kerja siling.</p>
      <p><strong>Apa yang berlaku:</strong></p>
      <ul>
        <li>Litar MCB khusus dipasang di kotak DB untuk setiap aircond</li>
        <li>Bingkai pemasangan ceiling cassette dipasang sebelum papan siling</li>
        <li>Platform/birai unit luar disahkan dan titik saliran disediakan</li>
        <li>Pendawaian rumah pintar (jika menggunakan aircond WiFi) dijalankan pada peringkat ini</li>
      </ul>

      <h3>Fasa 3: Pasca-Ubah Suai — Pemasangan Unit & Pentauliahan</h3>
      <p><strong>Bila:</strong> Selepas pengecatan siap dan perabot diletakkan.</p>
      <p><strong>Apa yang berlaku:</strong></p>
      <ul>
        <li>Unit dalaman dipasang pada pendakap pra-pemasangan</li>
        <li>Paip tersembunyi disambungkan ke unit dengan fitting flare</li>
        <li>Unit luar diletakkan pada platform yang disediakan</li>
        <li>Evakuasi vakum, ujian tekanan, dan pentauliahan</li>
        <li>Ujian akhir dan serahan</li>
      </ul>
      <p><strong>Kenapa masa ini:</strong> Unit dipasang selepas pengecatan untuk mengelakkan kerosakan habuk dan percikan cat. Pentauliahan akhir berlaku apabila rumah sedia untuk diduduki.</p>

      <h2>Perbandingan Kos: Semasa vs Selepas Ubah Suai</h2>
      <table>
        <thead><tr><th>Item</th><th>Semasa Ubah Suai</th><th>Selepas Ubah Suai</th></tr></thead>
        <tbody>
          <tr><td>Paip tersembunyi</td><td>RM 200-400 setiap titik</td><td>Tidak mungkin (terdedah sahaja)</td></tr>
          <tr><td>Trunking terdedah</td><td>Tidak diperlukan</td><td>RM 8-12 setiap kaki</td></tr>
          <tr><td>Pemecahan & pembaikan dinding</td><td>Termasuk dalam reno</td><td>RM 200-500 setiap dinding</td></tr>
          <tr><td>Pengecatan semula kawasan terlibat</td><td>Termasuk dalam reno</td><td>RM 150-300 setiap bilik</td></tr>
          <tr><td><strong>Jumlah untuk 3 unit</strong></td><td><strong>~RM 800 tambahan</strong></td><td><strong>~RM 2,000+ tambahan</strong></td></tr>
        </tbody>
      </table>

      <h2>Kesilapan Biasa Yang Perlu Dielakkan</h2>
      <ul>
        <li><strong>Tidak merancang kedudukan aircond awal</strong> — tentukan kedudukan sebelum ubah suai bermula</li>
        <li><strong>Melangkau pra-paip</strong> — jimat RM 800 sekarang, kos RM 2,000+ kemudian untuk trunking terdedah</li>
        <li><strong>Saiz paip salah semasa pra-paip</strong> — sahkan keperluan HP sebelum paip diletakkan</li>
        <li><strong>Lupa laluan saliran</strong> — rancang laluan paip saliran ke kawasan basah terdekat</li>
        <li><strong>Memasang unit sebelum pengecatan</strong> — habuk dan cat akan merosakkan unit baru</li>
      </ul>

      <h2>Perkhidmatan Penyelarasan Ubah Suai KL Renovator</h2>
      <p><a href="/new-home-aircond-installation">Pasukan pemasangan rumah baru kami</a> menyelaras secara langsung dengan kontraktor ubah suai anda:</p>
      <ul>
        <li>✅ Lawatan tapak pra-ubah suai untuk merancang laluan paip dan kedudukan unit</li>
        <li>✅ Fasa 1 paip tersembunyi sebelum plaster</li>
        <li>✅ Fasa 2 penyelarasan elektrik dengan juruelektrik anda</li>
        <li>✅ Fasa 3 pemasangan unit selepas pengecatan</li>
        <li>✅ Diskaun volum untuk pemasangan seluruh rumah (5-15%)</li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong> — kongsikan garis masa ubah suai anda dan kami akan merancang urutan pemasangan optimum.</p>
    `,
    contentZH: `
      <h2>装修期间什么时候安装冷气？</h2>
      <p>在房屋装修期间正确安排冷气安装时间可以节省RM 500-1,500的返工费用，并获得更干净的最终效果。我们<a href="/near-me">安装专家</a>已与KL和雪兰莪数百个装修承包商协调——以下是最佳顺序。</p>

      <h2>三阶段安装方法</h2>

      <h3>第一阶段：装修前——隐蔽管道（批灰前）</h3>
      <p><strong>时间：</strong>拆墙/拆除后，批灰和油漆前。</p>
      <p><strong>进行的工作：</strong></p>
      <ul>
        <li>铜管、排水管和电线在墙壁和天花板内布线</li>
        <li>在混凝土或砖墙上切割管道套管/线槽</li>
        <li>规划排水管路连接到最近的浴室或外墙</li>
        <li>从配电箱到每个冷风点的电气线管</li>
        <li>标记室内机位置并安装支架背板</li>
      </ul>
      <p><strong>为什么选择这个时间：</strong>隐蔽管道提供干净、不可见的效果——新粉刷的墙上没有可见的线槽或走线架。批灰后如果不凿墙重新粉刷就无法做到。</p>

      <h3>第二阶段：装修中——电气和结构准备</h3>
      <p><strong>时间：</strong>电气粗装和天花板施工期间。</p>
      <p><strong>进行的工作：</strong></p>
      <ul>
        <li>在配电箱为每台冷气安装独立MCB电路</li>
        <li>在天花板板材安装前安装吸顶式安装框架</li>
        <li>确认室外机平台/位置并准备排水点</li>
        <li>如使用WiFi冷气，此阶段布设智能家居线路</li>
      </ul>

      <h3>第三阶段：装修后——机组安装和调试</h3>
      <p><strong>时间：</strong>油漆完成、家具就位后。</p>
      <p><strong>进行的工作：</strong></p>
      <ul>
        <li>室内机安装在预装支架上</li>
        <li>隐蔽管道通过扩口接头连接到机组</li>
        <li>室外机放置在准备好的平台上</li>
        <li>真空抽气、压力测试和调试</li>
        <li>最终测试和交付</li>
      </ul>
      <p><strong>为什么选择这个时间：</strong>机组在油漆后安装以避免灰尘损坏和油漆飞溅。最终调试在房屋可以入住时进行。</p>

      <h2>费用比较：装修期间 vs 装修后</h2>
      <table>
        <thead><tr><th>项目</th><th>装修期间</th><th>装修后</th></tr></thead>
        <tbody>
          <tr><td>隐蔽管道</td><td>每个点RM 200-400</td><td>不可能（仅明装）</td></tr>
          <tr><td>明装线槽</td><td>不需要</td><td>每英尺RM 8-12</td></tr>
          <tr><td>凿墙和修复</td><td>包含在装修中</td><td>每面墙RM 200-500</td></tr>
          <tr><td>受影响区域重新粉刷</td><td>包含在装修中</td><td>每间房RM 150-300</td></tr>
          <tr><td><strong>3台总计</strong></td><td><strong>约RM 800额外</strong></td><td><strong>约RM 2,000+额外</strong></td></tr>
        </tbody>
      </table>

      <h2>应避免的常见错误</h2>
      <ul>
        <li><strong>不提前规划冷气位置</strong>——在装修开始前决定位置</li>
        <li><strong>跳过预埋管道</strong>——现在省RM 800，以后明装线槽花费RM 2,000+</li>
        <li><strong>预埋管道尺寸错误</strong>——在管道铺设前确认匹数要求</li>
        <li><strong>忘记排水路线</strong>——规划排水管到最近湿区的路径</li>
        <li><strong>油漆前安装机组</strong>——灰尘和油漆会损坏新机组</li>
      </ul>

      <h2>KL Renovator 的装修协调服务</h2>
      <p>我们的<a href="/new-home-aircond-installation">新房安装团队</a>直接与您的装修承包商协调：</p>
      <ul>
        <li>✅ 装修前现场勘查规划管道路线和机组位置</li>
        <li>✅ 第一阶段批灰前隐蔽管道</li>
        <li>✅ 第二阶段与您的电工协调电气工作</li>
        <li>✅ 第三阶段油漆后机组安装</li>
        <li>✅ 全屋安装批量折扣（5-15%折扣）</li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong>——分享您的装修时间线，我们规划最佳安装顺序。</p>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POST 9: Concealed vs Exposed Piping
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "concealed-piping-aircond-installation-malaysia",
    title: "Concealed vs Exposed Aircond Piping — Aesthetics, Cost & Which to Choose",
    titleMS: "Paip Aircond Tersembunyi vs Terdedah — Estetika, Kos & Mana Nak Pilih",
    titleZH: "隐蔽式 vs 明装冷气管道——美观、成本及如何选择",
    excerpt: "Should you hide your aircond pipes inside the wall or run them externally? Compare aesthetics, cost, maintenance access, and when each option makes sense for Malaysian homes.",
    excerptMS: "Patutkah anda sembunyikan paip aircond dalam dinding atau lalukan di luar? Bandingkan estetika, kos, akses penyelenggaraan.",
    excerptZH: "应该将冷气管道隐藏在墙内还是外部走管？比较美观、成本、维护便利性，以及每种方案适合马来西亚住宅的情况。",
    category: "Installation Guide",
    categoryMS: "Panduan Pemasangan",
    categoryZH: "安装指南",
    tags: ["concealed piping", "exposed piping", "aircond trunking", "pipe aesthetics", "renovation piping"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 5,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kuala-lumpur.webp",
    imageAlt: "Concealed vs exposed aircond piping comparison by KL Renovator installation team",
    content: `
      <h2>Concealed or Exposed Piping — Which Is Right for Your Home?</h2>
      <p>The choice between concealed (in-wall) and exposed (external trunking) piping affects your home's aesthetics, installation cost, and future maintenance access. Our <a href="/near-me">installation specialists</a> explain both options honestly.</p>

      <h2>Quick Comparison</h2>
      <table>
        <thead><tr><th>Factor</th><th>Concealed Piping</th><th>Exposed Piping</th></tr></thead>
        <tbody>
          <tr><td>Aesthetics</td><td>Invisible — clean walls</td><td>Visible trunking/casing</td></tr>
          <tr><td>Cost (new build/reno)</td><td>RM 200-400 per point</td><td>RM 0 extra (included in base)</td></tr>
          <tr><td>Cost (existing home)</td><td>RM 500-1,000 per point</td><td>RM 0 extra</td></tr>
          <tr><td>Installation time</td><td>2-3x longer</td><td>Standard time</td></tr>
          <tr><td>Maintenance access</td><td>Harder (wall access needed)</td><td>Easy (trunking opens)</td></tr>
          <tr><td>Leak detection</td><td>Harder to spot</td><td>Visible immediately</td></tr>
          <tr><td>Best timing</td><td>During renovation</td><td>Any time</td></tr>
        </tbody>
      </table>

      <h2>When Concealed Piping Makes Sense</h2>
      <ul>
        <li><strong>During renovation or new build</strong> — pipes laid before plastering, zero extra wall damage</li>
        <li><strong>Living rooms and master bedrooms</strong> — where aesthetics matter most</li>
        <li><strong>Long pipe runs</strong> — visible trunking across a long wall looks unsightly</li>
        <li><strong>High-end homes</strong> — clean, invisible finish matches premium interior design</li>
      </ul>

      <h2>When Exposed Piping Is the Better Choice</h2>
      <ul>
        <li><strong>Existing homes without renovation plans</strong> — hacking walls for concealed pipes means repainting entire rooms</li>
        <li><strong>Rental properties</strong> — easier to maintain and replace</li>
        <li><strong>Budget installations</strong> — saves RM 200-1,000 per point</li>
        <li><strong>Service areas and kitchens</strong> — where aesthetics are less important</li>
        <li><strong>Easy maintenance priority</strong> — trunking opens easily for inspection and repair</li>
      </ul>

      <h2>Exposed Piping Done Right</h2>
      <p>Even exposed piping can look clean and professional when done properly. Our <a href="/aircond-installation-kl">expert installers</a> follow these standards:</p>
      <ul>
        <li><strong>White PVC trunking</strong> — color-matched to most Malaysian wall colors</li>
        <li><strong>Straight, level runs</strong> — no sagging or diagonal shortcuts</li>
        <li><strong>Minimal wall penetrations</strong> — one clean hole, properly sealed</li>
        <li><strong>Hidden routing where possible</strong> — behind curtains, above cabinets, along ceiling edges</li>
      </ul>

      <h2>Cost Breakdown</h2>
      <table>
        <thead><tr><th>Scenario</th><th>Concealed</th><th>Exposed</th></tr></thead>
        <tbody>
          <tr><td>New build / during reno</td><td>RM 200-400 extra</td><td>RM 0 (included)</td></tr>
          <tr><td>Existing home (brick wall)</td><td>RM 500-800 extra</td><td>RM 0 (included)</td></tr>
          <tr><td>Existing home (concrete)</td><td>RM 800-1,200 extra</td><td>RM 0 (included)</td></tr>
        </tbody>
      </table>

      <h2>Our Recommendation</h2>
      <p><strong>If you're renovating:</strong> Go concealed — the marginal cost is small and the result is much cleaner.</p>
      <p><strong>If your home is already finished:</strong> Go exposed with professional trunking — hacking walls for concealed pipes costs more in repainting than the piping itself.</p>
      <p>Both options available from <strong>RM 199</strong> (exposed included) with our <a href="/near-me">top-rated installation team</a>. WhatsApp <strong>+60 18-298 3573</strong> for advice on your specific home.</p>
    `,
    contentMS: `
      <h2>Paip Tersembunyi atau Terdedah — Mana Yang Sesuai Untuk Rumah Anda?</h2>
      <p>Pilihan antara paip tersembunyi (dalam dinding) dan terdedah (trunking luar) mempengaruhi estetika rumah anda, kos pemasangan, dan akses penyelenggaraan masa depan. <a href="/near-me">Pakar pemasangan kami</a> menerangkan kedua-dua pilihan secara jujur.</p>

      <h2>Perbandingan Pantas</h2>
      <table>
        <thead><tr><th>Faktor</th><th>Paip Tersembunyi</th><th>Paip Terdedah</th></tr></thead>
        <tbody>
          <tr><td>Estetika</td><td>Tidak kelihatan — dinding bersih</td><td>Trunking/casing kelihatan</td></tr>
          <tr><td>Kos (binaan baru/reno)</td><td>RM 200-400 setiap titik</td><td>RM 0 tambahan (termasuk dalam asas)</td></tr>
          <tr><td>Kos (rumah sedia ada)</td><td>RM 500-1,000 setiap titik</td><td>RM 0 tambahan</td></tr>
          <tr><td>Masa pemasangan</td><td>2-3x lebih lama</td><td>Masa standard</td></tr>
          <tr><td>Akses penyelenggaraan</td><td>Lebih sukar (akses dinding diperlukan)</td><td>Mudah (trunking dibuka)</td></tr>
          <tr><td>Pengesanan kebocoran</td><td>Lebih sukar dikesan</td><td>Kelihatan serta-merta</td></tr>
          <tr><td>Masa terbaik</td><td>Semasa ubah suai</td><td>Bila-bila masa</td></tr>
        </tbody>
      </table>

      <h2>Bila Paip Tersembunyi Masuk Akal</h2>
      <ul>
        <li><strong>Semasa ubah suai atau binaan baru</strong> — paip diletakkan sebelum plaster, sifar kerosakan dinding tambahan</li>
        <li><strong>Ruang tamu dan bilik tidur utama</strong> — di mana estetika paling penting</li>
        <li><strong>Laluan paip panjang</strong> — trunking kelihatan merentasi dinding panjang nampak hodoh</li>
        <li><strong>Rumah mewah</strong> — kemasan bersih, tidak kelihatan sepadan dengan reka bentuk dalaman premium</li>
      </ul>

      <h2>Bila Paip Terdedah Pilihan Lebih Baik</h2>
      <ul>
        <li><strong>Rumah sedia ada tanpa pelan ubah suai</strong> — memecahkan dinding untuk paip tersembunyi bermakna mengecat semula seluruh bilik</li>
        <li><strong>Rumah sewa</strong> — lebih mudah diselenggara dan diganti</li>
        <li><strong>Pemasangan bajet</strong> — jimat RM 200-1,000 setiap titik</li>
        <li><strong>Kawasan servis dan dapur</strong> — di mana estetika kurang penting</li>
        <li><strong>Keutamaan penyelenggaraan mudah</strong> — trunking dibuka dengan mudah untuk pemeriksaan dan pembaikan</li>
      </ul>

      <h2>Paip Terdedah Dilakukan Dengan Betul</h2>
      <p>Walaupun paip terdedah boleh kelihatan bersih dan profesional apabila dilakukan dengan betul. <a href="/aircond-installation-kl">Pemasang pakar kami</a> mengikut standard ini:</p>
      <ul>
        <li><strong>Trunking PVC putih</strong> — warna sepadan dengan kebanyakan warna dinding Malaysia</li>
        <li><strong>Laluan lurus dan rata</strong> — tiada kendur atau pintasan pepenjuru</li>
        <li><strong>Penembusan dinding minimum</strong> — satu lubang bersih, ditutup dengan betul</li>
        <li><strong>Laluan tersembunyi jika boleh</strong> — di belakang langsir, di atas kabinet, sepanjang tepi siling</li>
      </ul>

      <h2>Pecahan Kos</h2>
      <table>
        <thead><tr><th>Senario</th><th>Tersembunyi</th><th>Terdedah</th></tr></thead>
        <tbody>
          <tr><td>Binaan baru / semasa reno</td><td>RM 200-400 tambahan</td><td>RM 0 (termasuk)</td></tr>
          <tr><td>Rumah sedia ada (dinding bata)</td><td>RM 500-800 tambahan</td><td>RM 0 (termasuk)</td></tr>
          <tr><td>Rumah sedia ada (konkrit)</td><td>RM 800-1,200 tambahan</td><td>RM 0 (termasuk)</td></tr>
        </tbody>
      </table>

      <h2>Cadangan Kami</h2>
      <p><strong>Jika anda sedang mengubah suai:</strong> Pilih tersembunyi — kos marginal kecil dan hasilnya jauh lebih bersih.</p>
      <p><strong>Jika rumah anda sudah siap:</strong> Pilih terdedah dengan trunking profesional — memecahkan dinding untuk paip tersembunyi kos lebih dalam pengecatan semula berbanding paip itu sendiri.</p>
      <p>Kedua-dua pilihan tersedia dari <strong>RM 199</strong> (terdedah termasuk) dengan <a href="/near-me">pasukan pemasangan terbaik kami</a>. WhatsApp <strong>+60 18-298 3573</strong> untuk nasihat khusus untuk rumah anda.</p>
    `,
    contentZH: `
      <h2>隐蔽还是明装管道——哪种适合您的家？</h2>
      <p>隐蔽式（墙内）和明装式（外部走线架）管道之间的选择影响您家的美观、安装成本和未来维护便利性。我们<a href="/near-me">安装专家</a>诚实解释两种选择。</p>

      <h2>快速比较</h2>
      <table>
        <thead><tr><th>因素</th><th>隐蔽管道</th><th>明装管道</th></tr></thead>
        <tbody>
          <tr><td>美观</td><td>不可见——干净的墙面</td><td>可见的走线架/套管</td></tr>
          <tr><td>费用（新建/装修）</td><td>每个点RM 200-400</td><td>RM 0额外（包含在基础中）</td></tr>
          <tr><td>费用（现有住宅）</td><td>每个点RM 500-1,000</td><td>RM 0额外</td></tr>
          <tr><td>安装时间</td><td>2-3倍更长</td><td>标准时间</td></tr>
          <tr><td>维护便利性</td><td>更困难（需要墙面检修口）</td><td>容易（走线架可打开）</td></tr>
          <tr><td>泄漏检测</td><td>更难发现</td><td>立即可见</td></tr>
          <tr><td>最佳时机</td><td>装修期间</td><td>任何时候</td></tr>
        </tbody>
      </table>

      <h2>何时隐蔽管道合理</h2>
      <ul>
        <li><strong>装修或新建期间</strong>——管道在批灰前铺设，零额外墙面损伤</li>
        <li><strong>客厅和主卧</strong>——美观最重要的地方</li>
        <li><strong>长管道</strong>——长墙上可见的走线架看起来不美观</li>
        <li><strong>高端住宅</strong>——干净、不可见的效果配合高端室内设计</li>
      </ul>

      <h2>何时明装管道是更好的选择</h2>
      <ul>
        <li><strong>没有装修计划的现有住宅</strong>——为隐蔽管道凿墙意味着整间房重新粉刷</li>
        <li><strong>出租物业</strong>——更容易维护和更换</li>
        <li><strong>预算安装</strong>——每个点节省RM 200-1,000</li>
        <li><strong>服务区和厨房</strong>——美观不太重要的地方</li>
        <li><strong>维护便利性优先</strong>——走线架易于打开进行检查和维修</li>
      </ul>

      <h2>明装管道做到位</h2>
      <p>即使明装管道，做得好也可以看起来干净专业。我们<a href="/aircond-installation-kl">专家安装人员</a>遵循这些标准：</p>
      <ul>
        <li><strong>白色PVC走线架</strong>——与大多数马来西亚墙面颜色匹配</li>
        <li><strong>笔直、水平的走线</strong>——不下垂、不走对角线捷径</li>
        <li><strong>最少的穿墙孔</strong>——一个干净的孔，正确密封</li>
        <li><strong>尽可能隐藏走线</strong>——窗帘后面、橱柜上方、天花板边缘</li>
      </ul>

      <h2>费用明细</h2>
      <table>
        <thead><tr><th>情况</th><th>隐蔽</th><th>明装</th></tr></thead>
        <tbody>
          <tr><td>新建/装修期间</td><td>RM 200-400额外</td><td>RM 0（包含）</td></tr>
          <tr><td>现有住宅（砖墙）</td><td>RM 500-800额外</td><td>RM 0（包含）</td></tr>
          <tr><td>现有住宅（混凝土）</td><td>RM 800-1,200额外</td><td>RM 0（包含）</td></tr>
        </tbody>
      </table>

      <h2>我们的建议</h2>
      <p><strong>如果您正在装修：</strong>选隐蔽——额外费用小，效果干净得多。</p>
      <p><strong>如果您的房子已装修完：</strong>选明装配专业走线架——为隐蔽管道凿墙在重新粉刷上的花费比管道本身还贵。</p>
      <p>两种方案均可从<strong>RM 199起</strong>（明装已包含）由我们<a href="/near-me">顶级安装团队</a>提供。WhatsApp <strong>+60 18-298 3573</strong>获取针对您家的建议。</p>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POST 10: Outdoor Unit Placement
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "aircond-outdoor-unit-placement-malaysia",
    title: "Where to Place Your Aircond Outdoor Unit — Rules & Best Practices for Malaysia",
    titleMS: "Di Mana Nak Letak Unit Luar Aircond — Peraturan & Amalan Terbaik Malaysia",
    titleZH: "冷气室外机放在哪里——马来西亚的规则与最佳实践",
    excerpt: "Outdoor unit placement affects cooling efficiency, noise, lifespan, and neighbour relations. Learn the rules, best positions, and common mistakes from 500+ Malaysian installations.",
    excerptMS: "Penempatan unit luar mempengaruhi kecekapan penyejukan, bunyi, jangka hayat, dan hubungan jiran. Ketahui peraturan dan kedudukan terbaik.",
    excerptZH: "室外机放置影响制冷效率、噪音、寿命和邻居关系。从500+次马来西亚安装中了解规则、最佳位置和常见错误。",
    category: "Installation Guide",
    categoryMS: "Panduan Pemasangan",
    categoryZH: "安装指南",
    tags: ["outdoor unit placement", "aircond condenser position", "installation best practices", "condo outdoor unit"],
    date: "2026-07-16",
    dateDisplay: "July 2026",
    lastReviewed: "2026-07-16",
    readTime: 5,
    relatedService: "New Unit Installation",
    image: "/hero/aircond-installation-kuala-lumpur.webp",
    imageAlt: "Proper outdoor unit placement for Malaysian homes by KL Renovator installation specialists",
    content: `
      <h2>Outdoor Unit Placement Matters More Than You Think</h2>
      <p>Where you place your aircond's outdoor unit (condenser) directly impacts cooling efficiency, electricity consumption, unit lifespan, noise levels, and even your relationship with neighbours. Our <a href="/near-me">installation specialists</a> share the rules and best practices based on 500+ installations across Malaysian homes.</p>

      <h2>The Golden Rules of Outdoor Unit Placement</h2>

      <h3>Rule 1: Minimum 30cm Clearance on All Sides</h3>
      <p>The outdoor unit needs space to breathe. Blocked airflow causes the compressor to overwork, overheat, and fail prematurely. Maintain at least 30cm clearance from walls, railings, and other obstructions on all sides — and 60cm in front of the fan exhaust.</p>

      <h3>Rule 2: Shade Is Your Friend</h3>
      <p>An outdoor unit in direct sunlight works 10-15% harder than one in shade. Malaysian afternoon sun (especially west-facing) can heat the condenser to 50°C+, drastically reducing efficiency. Place under eaves, balconies, or install a simple sun shield.</p>

      <h3>Rule 3: Not in Enclosed Spaces</h3>
      <p>Never place the outdoor unit in a fully enclosed balcony, service yard with no ventilation, or sealed room. The unit expels hot air — if it can't escape, it recirculates back into the condenser, causing a "heat trap" that kills efficiency and can trigger thermal shutdown.</p>

      <h3>Rule 4: Away from Bedroom Windows</h3>
      <p>Even modern quiet units produce 45-55 dB of noise. Place the outdoor unit away from your bedroom windows and your neighbour's bedroom windows. In condos, this often means coordinating placement with adjacent units.</p>

      <h3>Rule 5: Accessible for Maintenance</h3>
      <p>Your technician needs to access the outdoor unit for chemical wash, gas top-up, and repairs. Don't place it in hard-to-reach positions that require ladders or rope access for every service visit — this adds RM 50-150 to every maintenance call.</p>

      <h2>Best Positions for Malaysian Homes</h2>

      <h3>Landed Houses</h3>
      <ul>
        <li><strong>Side of house under eaves</strong> — shaded, ventilated, accessible ✅</li>
        <li><strong>Backyard on concrete pad</strong> — ground-mounted with bracket, away from plants ✅</li>
        <li><strong>Car porch ceiling bracket</strong> — elevated, shaded, out of the way ✅</li>
        <li>❌ Front of house (aesthetics + sun exposure)</li>
        <li>❌ Directly outside neighbour's window</li>
      </ul>

      <h3>Condominiums & Apartments</h3>
      <ul>
        <li><strong>Designated AC ledge</strong> — purpose-built with drainage ✅</li>
        <li><strong>Balcony corner</strong> — with adequate airflow and neighbour consideration ✅</li>
        <li><strong>Service yard</strong> — if ventilated and accessible ✅</li>
        <li>❌ Common corridor (usually prohibited by JMB)</li>
        <li>❌ Hanging from external wall without bracket (safety hazard)</li>
      </ul>

      <h2>Common Mistakes We Fix</h2>
      <ul>
        <li><strong>Unit facing a wall 20cm away</strong> — hot air recirculation, 20% efficiency loss</li>
        <li><strong>Unit in full west sun</strong> — compressor overheating, TNB bill 15% higher</li>
        <li><strong>Multiple units stacked too close</strong> — one unit's exhaust feeds into the other's intake</li>
        <li><strong>Unit on soft ground without pad</strong> — vibration, sinking, pipe stress</li>
        <li><strong>Unit behind a fence with no airflow</strong> — heat trap, thermal shutdown</li>
      </ul>

      <h2>Condo-Specific Rules</h2>
      <p>Most Malaysian condos have specific rules about outdoor unit placement enforced by the JMB/MC:</p>
      <ul>
        <li>Must use designated AC ledges only</li>
        <li>No wall-mounted external brackets (safety and aesthetics)</li>
        <li>Must not drip water onto common areas or lower units</li>
        <li>Noise must not exceed acceptable levels at neighbour's unit</li>
      </ul>
      <p>Our <a href="/aircond-installation-kl">condo installation team</a> handles JMB coordination and ensures full compliance.</p>

      <h2>Get Expert Placement Advice</h2>
      <p>Our <a href="/near-me">top-rated installation specialists</a> assess the optimal outdoor unit position during the free site survey — considering shade, airflow, access, noise, and building rules.</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong> — send us a photo of your planned outdoor position and we'll advise if it's optimal or suggest a better spot.</p>
    `,
    contentMS: `
      <h2>Penempatan Unit Luar Lebih Penting Daripada Yang Anda Sangka</h2>
      <p>Di mana anda letak unit luar aircond (kondenser) memberi kesan langsung kepada kecekapan penyejukan, penggunaan elektrik, jangka hayat unit, paras bunyi, dan juga hubungan dengan jiran. <a href="/near-me">Pakar pemasangan kami</a> berkongsi peraturan dan amalan terbaik berdasarkan 500+ pemasangan di seluruh rumah Malaysia.</p>

      <h2>Peraturan Emas Penempatan Unit Luar</h2>

      <h3>Peraturan 1: Jarak Minimum 30cm di Semua Sisi</h3>
      <p>Unit luar memerlukan ruang untuk bernafas. Aliran udara tersumbat menyebabkan pemampat bekerja berlebihan, terlalu panas, dan gagal pramatang. Kekalkan jarak minimum 30cm dari dinding, pagar, dan halangan lain di semua sisi — dan 60cm di hadapan ekzos kipas.</p>

      <h3>Peraturan 2: Teduh Adalah Rakan Anda</h3>
      <p>Unit luar di bawah cahaya matahari langsung bekerja 10-15% lebih keras berbanding yang di tempat teduh. Matahari petang Malaysia (terutamanya menghadap barat) boleh memanaskan kondenser sehingga 50°C+, mengurangkan kecekapan secara drastik. Letakkan di bawah cucuran, balkoni, atau pasang pelindung matahari mudah.</p>

      <h3>Peraturan 3: Bukan di Ruang Tertutup</h3>
      <p>Jangan sesekali letakkan unit luar di balkoni sepenuhnya tertutup, halaman servis tanpa pengudaraan, atau bilik tertutup. Unit mengeluarkan udara panas — jika ia tidak boleh keluar, ia beredar semula ke dalam kondenser, menyebabkan "perangkap haba" yang membunuh kecekapan dan boleh mencetuskan penutupan terma.</p>

      <h3>Peraturan 4: Jauh dari Tingkap Bilik Tidur</h3>
      <p>Walaupun unit senyap moden menghasilkan 45-55 dB bunyi. Letakkan unit luar jauh dari tingkap bilik tidur anda dan tingkap bilik tidur jiran. Di kondominium, ini sering bermakna menyelaras penempatan dengan unit bersebelahan.</p>

      <h3>Peraturan 5: Mudah Diakses untuk Penyelenggaraan</h3>
      <p>Juruteknik anda perlu mengakses unit luar untuk cuci kimia, tambah gas, dan pembaikan. Jangan letakkan di kedudukan sukar dicapai yang memerlukan tangga atau akses tali untuk setiap lawatan servis — ini menambah RM 50-150 pada setiap panggilan penyelenggaraan.</p>

      <h2>Kedudukan Terbaik untuk Rumah Malaysia</h2>

      <h3>Rumah Teres</h3>
      <ul>
        <li><strong>Sisi rumah di bawah cucuran</strong> — teduh, berpengudaraan, mudah diakses ✅</li>
        <li><strong>Halaman belakang di atas pad konkrit</strong> — dipasang di tanah dengan pendakap, jauh dari pokok ✅</li>
        <li><strong>Pendakap siling anjung kereta</strong> — tinggi, teduh, tidak mengganggu ✅</li>
        <li>❌ Hadapan rumah (estetika + pendedahan matahari)</li>
        <li>❌ Betul-betul di luar tingkap jiran</li>
      </ul>

      <h3>Kondominium & Pangsapuri</h3>
      <ul>
        <li><strong>Birai AC yang ditetapkan</strong> — dibina khas dengan saliran ✅</li>
        <li><strong>Sudut balkoni</strong> — dengan aliran udara mencukupi dan pertimbangan jiran ✅</li>
        <li><strong>Halaman servis</strong> — jika berpengudaraan dan mudah diakses ✅</li>
        <li>❌ Koridor bersama (biasanya dilarang oleh JMB)</li>
        <li>❌ Tergantung dari dinding luar tanpa pendakap (bahaya keselamatan)</li>
      </ul>

      <h2>Kesilapan Biasa Yang Kami Betulkan</h2>
      <ul>
        <li><strong>Unit menghadap dinding 20cm jauh</strong> — peredaran semula udara panas, kehilangan kecekapan 20%</li>
        <li><strong>Unit di bawah matahari barat penuh</strong> — pemampat terlalu panas, bil TNB 15% lebih tinggi</li>
        <li><strong>Berbilang unit disusun terlalu rapat</strong> — ekzos satu unit masuk ke intake unit lain</li>
        <li><strong>Unit di atas tanah lembut tanpa pad</strong> — getaran, tenggelam, tekanan paip</li>
        <li><strong>Unit di belakang pagar tanpa aliran udara</strong> — perangkap haba, penutupan terma</li>
      </ul>

      <h2>Peraturan Khusus Kondominium</h2>
      <p>Kebanyakan kondominium Malaysia mempunyai peraturan khusus tentang penempatan unit luar yang dikuatkuasakan oleh JMB/MC:</p>
      <ul>
        <li>Mesti menggunakan birai AC yang ditetapkan sahaja</li>
        <li>Tiada pendakap luar dinding (keselamatan dan estetika)</li>
        <li>Tidak boleh menitis air ke kawasan bersama atau unit bawah</li>
        <li>Bunyi tidak boleh melebihi paras yang boleh diterima di unit jiran</li>
      </ul>
      <p><a href="/aircond-installation-kl">Pasukan pemasangan kondominium kami</a> mengendalikan penyelarasan JMB dan memastikan pematuhan penuh.</p>

      <h2>Dapatkan Nasihat Pakar Penempatan</h2>
      <p><a href="/near-me">Pakar pemasangan terbaik kami</a> menilai kedudukan unit luar optimum semasa tinjauan tapak percuma — mempertimbangkan teduh, aliran udara, akses, bunyi, dan peraturan bangunan.</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong> — hantar gambar kedudukan luar yang dirancang dan kami akan nasihat sama ada optimum atau cadangkan tempat yang lebih baik.</p>
    `,
    contentZH: `
      <h2>室外机放置比你想的更重要</h2>
      <p>冷气室外机（冷凝器）的放置位置直接影响制冷效率、电力消耗、机组寿命、噪音水平，甚至与邻居的关系。我们<a href="/near-me">安装专家</a>基于500+次马来西亚住宅安装分享规则和最佳实践。</p>

      <h2>室外机放置黄金规则</h2>

      <h3>规则1：四周最少30cm间距</h3>
      <p>室外机需要呼吸空间。气流受阻会导致压缩机过度工作、过热和过早故障。四周与墙壁、栏杆和其他障碍物保持至少30cm间距——风扇排气口前方保持60cm。</p>

      <h3>规则2：遮阳是朋友</h3>
      <p>阳光直射下的室外机比遮阳下的多工作10-15%。马来西亚下午的阳光（特别是朝西）可将冷凝器加热到50°C以上，大幅降低效率。放在屋檐下、阳台上或安装简单的遮阳板。</p>

      <h3>规则3：不在封闭空间</h3>
      <p>切勿将室外机放在完全封闭的阳台、无通风的服务区或密封房间。机组排出热气——如果无法散出，会回流到冷凝器中，造成"热阱"，大幅降低效率甚至触发过热保护停机。</p>

      <h3>规则4：远离卧室窗户</h3>
      <p>即使是现代静音机组也会产生45-55 dB的噪音。将室外机远离您和邻居的卧室窗户。在公寓中，这通常意味着与相邻单元协调放置位置。</p>

      <h3>规则5：便于维护</h3>
      <p>技术员需要接近室外机进行化学清洗、充气和维修。不要放在难以到达的位置，否则每次维护都需要梯子或绳索作业——每次维护增加RM 50-150。</p>

      <h2>马来西亚住宅最佳位置</h2>

      <h3>排屋</h3>
      <ul>
        <li><strong>房屋侧面屋檐下</strong>——遮阳、通风、易接近 ✅</li>
        <li><strong>后院混凝土垫上</strong>——带支架地面安装，远离植物 ✅</li>
        <li><strong>车棚天花板支架</strong>——架高、遮阳、不碍事 ✅</li>
        <li>❌ 房屋正面（美观+阳光暴露）</li>
        <li>❌ 直接在邻居窗户外面</li>
      </ul>

      <h3>公寓和公寓楼</h3>
      <ul>
        <li><strong>指定AC平台</strong>——专门设计带排水 ✅</li>
        <li><strong>阳台角落</strong>——有足够气流并考虑邻居 ✅</li>
        <li><strong>服务区</strong>——如通风且可接近 ✅</li>
        <li>❌ 公共走廊（通常被JMB禁止）</li>
        <li>❌ 无支架悬挂在外墙上（安全隐患）</li>
      </ul>

      <h2>我们常修复的错误</h2>
      <ul>
        <li><strong>机组面对20cm外的墙壁</strong>——热气回流，效率损失20%</li>
        <li><strong>机组在西晒阳光中</strong>——压缩机过热，TNB账单高15%</li>
        <li><strong>多台机组堆放过近</strong>——一台的排气进入另一台的进气口</li>
        <li><strong>机组在软地面无垫板</strong>——振动、下沉、管道应力</li>
        <li><strong>机组在围栏后无气流</strong>——热阱，过热停机</li>
      </ul>

      <h2>公寓特定规则</h2>
      <p>大多数马来西亚公寓有关于室外机放置的特定规则，由JMB/MC执行：</p>
      <ul>
        <li>必须只使用指定的AC平台</li>
        <li>禁止外墙安装支架（安全和美观）</li>
        <li>不得滴水到公共区域或下层机组</li>
        <li>噪音不得超过邻居机组可接受水平</li>
      </ul>
      <p>我们<a href="/aircond-installation-kl">公寓安装团队</a>处理JMB协调并确保完全合规。</p>

      <h2>获取专家放置建议</h2>
      <p>我们<a href="/near-me">顶级安装专家</a>在免费现场勘查中评估最佳室外机位置——考虑遮阳、气流、接近性、噪音和建筑规则。</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong>——发送计划室外位置的照片，我们告知是否最佳或建议更好的位置。</p>
    `,
  },
];
