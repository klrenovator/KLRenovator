export type BlogPost = {
  slug: string;
  title: string;
  titleMS: string;
  titleZH: string;
  excerpt: string;
  excerptMS: string;
  excerptZH: string;
  category: string;
  categoryMS: string;
  categoryZH: string;
  tags: string[];
  date: string;        // ISO 8601 — e.g. "2026-05-01"
  dateDisplay: string; // Human readable — e.g. "May 2026"
  readTime: number;
  relatedService: string;
  content: string;
  contentMS: string;
  contentZH: string;
};

export const allPosts: BlogPost[] = [
  {
    slug: "aircon-service-batu-caves-selayang-2026",
    title: "Aircon Service in Batu Caves & Selayang — What to Expect in 2026",
    titleMS: "Servis Aircond di Batu Caves & Selayang — Apa yang Anda Perlu Tahu pada 2026",
    titleZH: "黑风洞及双溪毛糯冷气服务 — 2026年您需要了解的事项",
    excerpt: "Looking for reliable aircond servicing in Batu Caves or Selayang? Here's what residents should know — pricing, common issues, and why regular servicing matters in this area.",
    excerptMS: "Mencari servis aircond yang dipercayai di Batu Caves atau Selayang? Inilah yang perlu diketahui oleh penduduk — harga, masalah biasa, dan kepentingan servis berkala.",
    excerptZH: "正在寻找黑风洞或双溪毛糯可靠的冷气服务？以下是居民需要了解的内容——价格、常见问题以及定期保养的重要性。",
    category: "Local Guide",
    categoryMS: "Panduan Tempatan",
    categoryZH: "本地指南",
    tags: ["aircon service Batu Caves", "aircond Selayang", "chemical wash Batu Caves", "KL Renovator", "HVAC Selangor"],
    date: "2026-05-01",
    dateDisplay: "May 2026",
    readTime: 5,
    relatedService: "Pressure Chemical Wash",
    content: `
      <h2>Aircon Servicing in Batu Caves & Selayang</h2>
      <p>Batu Caves and Selayang are among the fastest-growing residential zones in Greater KL. With dense housing, high humidity, and dusty air near limestone hills, aircond units in this area tend to accumulate mould and dust faster than in most other parts of Selangor.</p>

      <h2>Common Aircon Problems in This Area</h2>
      <ul>
        <li><strong>Faster mould buildup</strong> — due to proximity to green areas and high moisture levels</li>
        <li><strong>Dusty coils</strong> — construction activity nearby increases airborne particles</li>
        <li><strong>Water leaking</strong> — blocked drain pipes are very common during rainy season</li>
        <li><strong>Weak cooling</strong> — gas pressure loss due to vibration from heavy traffic on Jalan Ipoh corridor</li>
      </ul>

      <h2>Recommended Service Schedule for Batu Caves Residents</h2>
      <ul>
        <li><strong>Basic service:</strong> Every 3–4 months</li>
        <li><strong>Chemical wash:</strong> Every 10–12 months</li>
        <li><strong>Chemical overhaul:</strong> Every 2–3 years or when leaking/ice forms</li>
      </ul>

      <h2>Pricing for Batu Caves & Selayang</h2>
      <ul>
        <li>Basic Service: from <strong>RM 99</strong></li>
        <li>Chemical Wash: from <strong>RM 120</strong></li>
        <li>Chemical Overhaul: from <strong>RM 220</strong></li>
        <li>Gas Top-Up R32/R410A: from <strong>RM 150</strong></li>
      </ul>
      <p>No hidden charges. All prices confirmed before work begins.</p>

      <h2>How to Book</h2>
      <p>WhatsApp <strong>+60 18-298 3573</strong> with your location, unit type, and issue. Slot confirmed within 30 minutes.</p>
      <p>We are headquartered in Selayang — fastest response time in the area. <a href="/areas/batu-caves">Batu Caves service page</a> | <a href="/areas/selayang">Selayang service page</a> | <a href="/services/chemical-wash">Chemical wash pricing</a></p>
    `,
    contentMS: `
      <h2>Servis Aircond di Batu Caves & Selayang</h2>
      <p>Batu Caves dan Selayang adalah antara zon kediaman yang paling pesat berkembang di Greater KL. Dengan perumahan padat, kelembapan tinggi, dan udara berdebu berhampiran bukit batu kapur, unit aircond di kawasan ini cenderung mengumpul kulat dan habuk lebih cepat berbanding kebanyakan kawasan lain di Selangor.</p>

      <h2>Masalah Aircond Biasa di Kawasan Ini</h2>
      <ul>
        <li><strong>Pertumbuhan kulat lebih cepat</strong> — kerana berdekatan dengan kawasan hijau dan tahap kelembapan tinggi</li>
        <li><strong>Gegelung berdebu</strong> — aktiviti pembinaan berdekatan meningkatkan zarah di udara</li>
        <li><strong>Bocor air</strong> — paip longkang tersumbat sangat biasa semasa musim hujan</li>
        <li><strong>Penyejukan lemah</strong> — kehilangan tekanan gas akibat getaran dari trafik berat di koridor Jalan Ipoh</li>
      </ul>

      <h2>Jadual Servis yang Disyorkan untuk Penduduk Batu Caves</h2>
      <ul>
        <li><strong>Servis asas:</strong> Setiap 3–4 bulan</li>
        <li><strong>Cuci kimia:</strong> Setiap 10–12 bulan</li>
        <li><strong>Overhaul kimia:</strong> Setiap 2–3 tahun atau apabila bocor/ais terbentuk</li>
      </ul>

      <h2>Harga untuk Batu Caves & Selayang</h2>
      <ul>
        <li>Servis Asas: dari <strong>RM 99</strong></li>
        <li>Cuci Kimia: dari <strong>RM 120</strong></li>
        <li>Overhaul Kimia: dari <strong>RM 220</strong></li>
        <li>Tambah Gas R32/R410A: dari <strong>RM 150</strong></li>
      </ul>
      <p>Tiada caj tersembunyi. Semua harga disahkan sebelum kerja bermula.</p>

      <h2>Cara Membuat Tempahan</h2>
      <p>WhatsApp <strong>+60 18-298 3573</strong> dengan lokasi, jenis unit, dan masalah anda. Slot disahkan dalam 30 minit.</p>
      <p>Kami beribu pejabat di Selayang — masa tindak balas tercepat di kawasan ini. <a href="/areas/batu-caves">Halaman servis Batu Caves</a> | <a href="/areas/selayang">Halaman servis Selayang</a></p>
    `,
    contentZH: `
      <h2>黑风洞及双溪毛糯冷气服务</h2>
      <p>黑风洞和双溪毛糯是大吉隆坡增长最快的住宅区之一。由于住宅密集、湿度高，以及石灰岩山丘附近的多尘空气，该地区的冷气机积聚霉菌和灰尘的速度往往比雪兰莪其他大多数地区更快。</p>

      <h2>该地区常见冷气问题</h2>
      <ul>
        <li><strong>霉菌生长更快</strong> — 由于靠近绿色区域且湿度高</li>
        <li><strong>盘管积尘</strong> — 附近的建筑活动增加了空气中的颗粒物</li>
        <li><strong>漏水</strong> — 雨季期间排水管堵塞非常普遍</li>
        <li><strong>冷却效果弱</strong> — 因Jalan Ipoh走廊繁忙交通的震动导致气压损失</li>
      </ul>

      <h2>黑风洞居民推荐保养计划</h2>
      <ul>
        <li><strong>基本保养：</strong>每3-4个月一次</li>
        <li><strong>化学清洗：</strong>每10-12个月一次</li>
        <li><strong>化学大修：</strong>每2-3年一次，或出现漏水/结冰时</li>
      </ul>

      <h2>黑风洞及双溪毛糯收费</h2>
      <ul>
        <li>基本保养：从 <strong>RM 99</strong> 起</li>
        <li>化学清洗：从 <strong>RM 120</strong> 起</li>
        <li>化学大修：从 <strong>RM 220</strong> 起</li>
        <li>R32/R410A充气：从 <strong>RM 150</strong> 起</li>
      </ul>
      <p>无隐藏收费。所有价格在施工前确认。</p>

      <h2>如何预约</h2>
      <p>请WhatsApp <strong>+60 18-298 3573</strong>，提供您的位置、机型和问题。30分钟内确认时间段。</p>
      <p>我们总部位于双溪毛糯——该地区响应速度最快。<a href="/areas/batu-caves">黑风洞服务页</a> | <a href="/areas/selayang">双溪毛糯服务页</a></p>
    `,
  },
  {
    slug: "aircon-chemical-wash-price-malaysia-2026",
    title: "Aircon Chemical Wash Price in Malaysia 2026 — Full Breakdown",
    titleMS: "Harga Cuci Kimia Aircond di Malaysia 2026 — Pecahan Lengkap",
    titleZH: "马来西亚2026年冷气化学清洗价格 — 完整明细",
    excerpt: "What does a chemical wash actually cost in Malaysia in 2026? Here's a full price breakdown by unit type and HP — including what's included and what's not.",
    excerptMS: "Berapa sebenarnya kos cuci kimia di Malaysia pada 2026? Berikut adalah pecahan harga lengkap mengikut jenis unit dan HP — termasuk apa yang disertakan dan tidak.",
    excerptZH: "2026年马来西亚化学清洗的实际费用是多少？以下是按机型和HP的完整价格明细——包括包含和不包含的内容。",
    category: "Pricing Guide",
    categoryMS: "Panduan Harga",
    categoryZH: "价格指南",
    tags: ["chemical wash price Malaysia 2026", "aircond chemical wash cost KL", "aircon cleaning price Selangor", "chemical wash RM"],
    date: "2026-04-01",
    dateDisplay: "April 2026",
    readTime: 4,
    relatedService: "Pressure Chemical Wash",
    content: `
      <h2>Chemical Wash Prices in Malaysia 2026</h2>
      <p>Chemical wash prices in Malaysia vary by unit type, horsepower (HP), and company. Here's a transparent breakdown of what KL Renovator charges in 2026 — no hidden fees.</p>

      <h2>Wall-Mounted Unit Prices</h2>
      <ul>
        <li>1.0 – 1.5 HP: <strong>RM 120</strong></li>
        <li>2.0 – 2.5 HP: <strong>RM 150</strong></li>
        <li>3.0 HP: <strong>RM 180</strong></li>
        <li>4.0 – 5.0 HP: <strong>RM 200</strong></li>
      </ul>

      <h2>Ceiling Cassette Unit Prices</h2>
      <ul>
        <li>1.0 – 1.5 HP: <strong>RM 220</strong></li>
        <li>2.0 – 3.0 HP: <strong>RM 280</strong></li>
        <li>4.0 – 5.0 HP: <strong>RM 350</strong></li>
      </ul>

      <h2>What's Included in a Chemical Wash?</h2>
      <ul>
        <li>High-pressure chemical spray on evaporator coil and blower</li>
        <li>Mould, bacteria, and dust removal</li>
        <li>Drainage pipe flush and check</li>
        <li>Filter cleaning and reinstallation</li>
        <li>System test after completion</li>
        <li>1-month workmanship warranty</li>
      </ul>

      <h2>What's NOT Included?</h2>
      <p>Gas top-up, parts replacement, and compressor work are quoted separately if needed. You approve all extra costs before work starts.</p>

      <h2>Volume Discounts Available</h2>
      <ul>
        <li>2–3 units: 5% off</li>
        <li>4–8 units: 10% off</li>
        <li>8+ units: 15% off</li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong> for a firm quote. Also see: <a href="/services/chemical-wash">Chemical wash service page</a> | <a href="/services/chemical-overhaul">Chemical overhaul pricing</a></p>
    `,
    contentMS: `
      <h2>Harga Cuci Kimia di Malaysia 2026</h2>
      <p>Harga cuci kimia di Malaysia berbeza mengikut jenis unit, horsepower (HP), dan syarikat. Berikut adalah pecahan telus tentang apa yang KL Renovator kenakan pada 2026 — tiada caj tersembunyi.</p>

      <h2>Harga Unit Dinding</h2>
      <ul>
        <li>1.0 – 1.5 HP: <strong>RM 120</strong></li>
        <li>2.0 – 2.5 HP: <strong>RM 150</strong></li>
        <li>3.0 HP: <strong>RM 180</strong></li>
        <li>4.0 – 5.0 HP: <strong>RM 200</strong></li>
      </ul>

      <h2>Harga Unit Ceiling Cassette</h2>
      <ul>
        <li>1.0 – 1.5 HP: <strong>RM 220</strong></li>
        <li>2.0 – 3.0 HP: <strong>RM 280</strong></li>
        <li>4.0 – 5.0 HP: <strong>RM 350</strong></li>
      </ul>

      <h2>Apa yang Disertakan dalam Cuci Kimia?</h2>
      <ul>
        <li>Semburan kimia tekanan tinggi pada gegelung evaporator dan blower</li>
        <li>Pembuangan kulat, bakteria, dan habuk</li>
        <li>Pembasuhan dan pemeriksaan paip longkang</li>
        <li>Pembersihan dan pemasangan semula penapis</li>
        <li>Ujian sistem selepas selesai</li>
        <li>Waranti kerja 1 bulan</li>
      </ul>

      <h2>Apa yang TIDAK Disertakan?</h2>
      <p>Tambah gas, penggantian bahagian, dan kerja kompressor dikira berasingan jika diperlukan. Anda meluluskan semua kos tambahan sebelum kerja bermula.</p>

      <h2>Diskaun Kuantiti Tersedia</h2>
      <ul>
        <li>2–3 unit: 5% diskaun</li>
        <li>4–8 unit: 10% diskaun</li>
        <li>8+ unit: 15% diskaun</li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong> untuk sebutan harga yang pasti.</p>
    `,
    contentZH: `
      <h2>2026年马来西亚化学清洗价格</h2>
      <p>马来西亚的化学清洗价格因机型、马力（HP）和公司而异。以下是KL Renovator 2026年的透明收费明细——无隐藏费用。</p>

      <h2>挂壁式机型价格</h2>
      <ul>
        <li>1.0 – 1.5 HP：<strong>RM 120</strong></li>
        <li>2.0 – 2.5 HP：<strong>RM 150</strong></li>
        <li>3.0 HP：<strong>RM 180</strong></li>
        <li>4.0 – 5.0 HP：<strong>RM 200</strong></li>
      </ul>

      <h2>天花板卡式机型价格</h2>
      <ul>
        <li>1.0 – 1.5 HP：<strong>RM 220</strong></li>
        <li>2.0 – 3.0 HP：<strong>RM 280</strong></li>
        <li>4.0 – 5.0 HP：<strong>RM 350</strong></li>
      </ul>

      <h2>化学清洗包含什么？</h2>
      <ul>
        <li>蒸发器盘管和鼓风机的高压化学喷洗</li>
        <li>去除霉菌、细菌和灰尘</li>
        <li>排水管冲洗和检查</li>
        <li>过滤网清洗和重新安装</li>
        <li>完成后系统测试</li>
        <li>1个月工艺保修</li>
      </ul>

      <h2>不包含什么？</h2>
      <p>如需充气、零件更换和压缩机工作，将单独报价。施工前您需批准所有额外费用。</p>

      <h2>批量折扣</h2>
      <ul>
        <li>2-3台：9折</li>
        <li>4-8台：9折</li>
        <li>8台以上：85折</li>
      </ul>
      <p>请WhatsApp <strong>+60 18-298 3573</strong> 获取确定报价。</p>
    `,
  },
  {
    slug: "signs-your-aircon-needs-chemical-overhaul-malaysia",
    title: "5 Signs Your Aircon Needs a Chemical Overhaul (Not Just a Wash)",
    titleMS: "5 Tanda Aircond Anda Memerlukan Overhaul Kimia (Bukan Sekadar Cuci)",
    titleZH: "5个迹象表明您的冷气需要化学大修（而不仅仅是清洗）",
    excerpt: "A chemical wash won't fix everything. Here are 5 clear signs that your aircond unit needs a full chemical overhaul — and what happens if you keep delaying it.",
    excerptMS: "Cuci kimia tidak akan menyelesaikan semua masalah. Berikut adalah 5 tanda jelas bahawa unit aircond anda memerlukan overhaul kimia penuh — dan apa yang berlaku jika anda terus menangguhkannya.",
    excerptZH: "化学清洗并非万能。以下5个明确迹象表明您的冷气机需要完整的化学大修——以及如果您继续拖延会发生什么。",
    category: "Troubleshooting",
    categoryMS: "Penyelesaian Masalah",
    categoryZH: "故障排查",
    tags: ["chemical overhaul signs", "aircon overhaul Malaysia", "aircon water leaking", "aircon ice forming", "KL Renovator"],
    date: "2026-03-01",
    dateDisplay: "March 2026",
    readTime: 4,
    relatedService: "Chemical Overhaul",
    content: `
      <h2>When a Chemical Wash Is Not Enough</h2>
      <p>Many homeowners book a chemical wash expecting it to solve all aircon problems — but some issues require a full <strong>chemical overhaul</strong>, where the indoor unit is completely dismantled and deep-cleaned.</p>

      <h2>Sign 1: Water Is Still Leaking After a Chemical Wash</h2>
      <p>If your unit leaked before servicing and is still leaking after a chemical wash, the drain pan or internal drainage channel is likely blocked beyond surface level. Only a full overhaul can clear this properly.</p>

      <h2>Sign 2: Ice Is Forming on the Coil or Pipe</h2>
      <p>Ice on the evaporator coil means severely restricted airflow — usually from a heavily blocked coil that a chemical wash cannot fully clean while mounted. An overhaul dismantles the coil for a proper soak and rinse.</p>

      <h2>Sign 3: Foul Smell Returns Within 2 Months</h2>
      <p>If the musty or sour smell returns quickly after a chemical wash, mould has grown deep inside the blower wheel, drain pan, or hidden corners — areas a mounted wash cannot reach.</p>

      <h2>Sign 4: Unit Hasn't Been Opened in 3+ Years</h2>
      <p>If no one has ever dismantled your indoor unit, the internal components will have years of compressed dirt, dead insects, and mould. A wash will clean only the surface.</p>

      <h2>Sign 5: Cooling Is Weak Even After Gas Top-Up and Chemical Wash</h2>
      <p>If both gas and coil cleaning have been done but cooling is still poor, the evaporator coil fins may be severely bent or the blower wheel may be so coated with grime that only a full clean will restore airflow.</p>

      <h2>What to Do</h2>
      <p>Chemical overhaul starts from <strong>RM 220</strong> for a wall-mounted 1.0–1.5 HP unit. WhatsApp KL Renovator at <strong>+60 18-298 3573</strong>. See also: <a href="/services/chemical-overhaul">Chemical overhaul service page</a> | <a href="/problems/aircond-water-leaking">Aircond water leaking guide</a></p>
    `,
    contentMS: `
      <h2>Apabila Cuci Kimia Tidak Mencukupi</h2>
      <p>Ramai pemilik rumah menempah cuci kimia dengan harapan ia akan menyelesaikan semua masalah aircond — tetapi sesetengah masalah memerlukan <strong>overhaul kimia</strong> penuh, di mana unit dalam dibuka sepenuhnya dan dibersihkan secara mendalam.</p>

      <h2>Tanda 1: Air Masih Bocor Selepas Cuci Kimia</h2>
      <p>Jika unit anda bocor sebelum servis dan masih bocor selepas cuci kimia, dulang longkang atau saluran longkang dalaman kemungkinan tersumbat melebihi paras permukaan. Hanya overhaul penuh yang boleh membersihkannya dengan betul.</p>

      <h2>Tanda 2: Ais Terbentuk pada Gegelung atau Paip</h2>
      <p>Ais pada gegelung evaporator bermakna aliran udara disekat teruk — biasanya dari gegelung yang sangat tersumbat yang tidak dapat dibersihkan sepenuhnya semasa dipasang di dinding.</p>

      <h2>Tanda 3: Bau Busuk Kembali Dalam 2 Bulan</h2>
      <p>Jika bau hapak atau masam kembali cepat selepas cuci kimia, kulat telah tumbuh jauh di dalam roda blower, dulang longkang, atau sudut tersembunyi — kawasan yang tidak dapat dijangkau oleh basuhan terpasang.</p>

      <h2>Tanda 4: Unit Tidak Pernah Dibuka dalam 3+ Tahun</h2>
      <p>Jika tiada siapa pernah membuka unit dalam anda, komponen dalaman akan mempunyai tahun habuk termampat, serangga mati, dan kulat. Basuhan hanya akan membersihkan permukaan sahaja.</p>

      <h2>Tanda 5: Penyejukan Lemah Walaupun Selepas Tambah Gas dan Cuci Kimia</h2>
      <p>Jika kedua-dua gas dan pembersihan gegelung telah dilakukan tetapi penyejukan masih lemah, sirip gegelung evaporator mungkin sangat bengkok atau roda blower mungkin sangat kotor sehingga hanya pembersihan penuh yang akan memulihkan aliran udara.</p>

      <h2>Apa yang Perlu Dilakukan</h2>
      <p>Overhaul kimia bermula dari <strong>RM 220</strong> untuk unit dinding 1.0–1.5 HP. WhatsApp KL Renovator di <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>当化学清洗不够用时</h2>
      <p>许多房主预约化学清洗，期望它能解决所有冷气问题——但某些问题需要完整的<strong>化学大修</strong>，即完全拆卸室内机并进行深度清洁。</p>

      <h2>迹象1：化学清洗后仍然漏水</h2>
      <p>如果您的机器在保养前漏水，保养后仍然漏水，那么排水盘或内部排水通道可能堵塞超出表面水平。只有完整的大修才能正确清除。</p>

      <h2>迹象2：盘管或管道结冰</h2>
      <p>蒸发器盘管结冰意味着气流严重受限——通常是由于盘管严重堵塞，在挂壁状态下无法完全清洗。大修时拆卸盘管进行适当浸泡和冲洗。</p>

      <h2>迹象3：2个月内异味再次出现</h2>
      <p>如果化学清洗后霉味或酸味很快再次出现，说明霉菌已在鼓风机轮、排水盘或隐蔽角落深处生长——这些是挂壁清洗无法触及的地方。</p>

      <h2>迹象4：机器超过3年未拆开检修</h2>
      <p>如果您的室内机从未被拆卸过，内部组件将积累多年的压缩灰尘、死虫和霉菌。清洗只能清洁表面。</p>

      <h2>迹象5：充气和化学清洗后冷却效果仍差</h2>
      <p>如果充气和盘管清洗都已完成但冷却效果仍差，蒸发器盘管翅片可能严重弯曲，或鼓风机轮污垢太厚，只有完整清洗才能恢复气流。</p>

      <h2>该怎么做</h2>
      <p>挂壁式1.0–1.5 HP机器化学大修从<strong>RM 220</strong>起。请WhatsApp KL Renovator：<strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "chemical-wash-vs-chemical-overhaul",
    title: "Chemical Wash vs Chemical Overhaul — What's the Difference?",
    titleMS: "Cuci Kimia vs Overhaul Kimia — Apakah Perbezaannya?",
    titleZH: "化学清洗 vs 化学大修 — 有什么区别？",
    excerpt: "Not sure whether your aircond needs a chemical wash or a full overhaul? This guide explains both services, what they include, and when to choose each one.",
    excerptMS: "Tidak pasti sama ada aircond anda memerlukan cuci kimia atau overhaul penuh? Panduan ini menerangkan kedua-dua perkhidmatan, apa yang disertakan, dan bila untuk memilih setiap satu.",
    excerptZH: "不确定您的冷气是需要化学清洗还是完整大修？本指南解释了两种服务的内容、包含的项目以及何时选择哪种。",
    category: "Service Guide",
    categoryMS: "Panduan Perkhidmatan",
    categoryZH: "服务指南",
    tags: ["chemical wash", "chemical overhaul", "aircon cleaning", "KL Renovator", "aircond service"],
    date: "2025-06-01",
    dateDisplay: "June 2025",
    readTime: 5,
    relatedService: "Chemical Overhaul",
    content: `
      <h2>What Is a Chemical Wash?</h2>
      <p>A <strong>chemical wash</strong> (also called a pressure chemical wash) is a deep-cleaning service where a trained technician sprays a chemical cleaning solution onto the evaporator coil and blower wheel while the unit remains mounted on the wall.</p>
      <p>High-pressure water is then used to rinse away dissolved dirt, mould, bacteria, and dust. The dirty water drains out through the unit's drainage pipe.</p>
      <h3>When Should You Get a Chemical Wash?</h3>
      <ul>
        <li>Your aircond smells musty or has a foul odour</li>
        <li>Cooling has become weak even though gas is fine</li>
        <li>You haven't cleaned the unit in over 12 months</li>
        <li>Dust or small insects visible inside the unit</li>
      </ul>
      <p>A chemical wash typically takes <strong>45–90 minutes per unit</strong> and starts from <strong>RM 120</strong> for a 1.0–1.5 HP wall-mounted unit.</p>

      <h2>What Is a Chemical Overhaul?</h2>
      <p>A <strong>chemical overhaul</strong> goes much further. The technician fully dismantles the indoor unit from the wall, removes every internal component, and bathes the coil, blower wheel, drain pan, and casing in a deep chemical solution.</p>
      <p>Every hidden corner is cleaned — areas a normal chemical wash cannot reach. The unit is then reassembled, reinstalled, and tested.</p>
      <h3>When Should You Get a Chemical Overhaul?</h3>
      <ul>
        <li>Water is leaking from your unit and a wash didn't fix it</li>
        <li>Ice is forming on the coil</li>
        <li>The unit hasn't been opened in 3+ years</li>
        <li>A chemical wash was done but cooling didn't improve</li>
        <li>Very heavy mould or blockage inside the unit</li>
      </ul>
      <p>A chemical overhaul takes <strong>2–3 hours per unit</strong> and starts from <strong>RM 220</strong>.</p>

      <h2>Side-by-Side Comparison</h2>
      <ul>
        <li><strong>Chemical Wash:</strong> Unit stays mounted · 45–90 min · From RM 120 · Best for routine maintenance</li>
        <li><strong>Chemical Overhaul:</strong> Unit fully dismantled · 2–3 hours · From RM 220 · Best for severe issues</li>
      </ul>
      <p>Not sure which you need? WhatsApp us a photo at <strong>+60 18-298 3573</strong> and our team will advise you honestly.</p>
      <p>Related: <a href="/services/chemical-wash">Chemical wash service</a> | <a href="/services/chemical-overhaul">Chemical overhaul service</a> | <a href="/problems/aircond-water-leaking">Aircond water leaking</a></p>
    `,
    contentMS: `
      <h2>Apa itu Cuci Kimia?</h2>
      <p><strong>Cuci kimia</strong> (juga dipanggil cuci kimia tekanan tinggi) adalah perkhidmatan pembersihan mendalam di mana juruteknik terlatih menyembur larutan pembersih kimia pada gegelung evaporator dan roda blower sementara unit kekal dipasang di dinding.</p>
      <p>Air tekanan tinggi kemudian digunakan untuk membilas habuk, kulat, bakteria, dan debu yang telah larut. Air kotor mengalir keluar melalui paip longkang unit.</p>

      <h2>Apa itu Overhaul Kimia?</h2>
      <p><strong>Overhaul kimia</strong> pergi lebih jauh. Juruteknik membuka sepenuhnya unit dalam dari dinding, mengeluarkan setiap komponen dalaman, dan merendam gegelung, roda blower, dulang longkang, dan casing dalam larutan kimia mendalam.</p>
      <p>Setiap sudut tersembunyi dibersihkan — kawasan yang tidak dapat dijangkau oleh cuci kimia biasa. Unit kemudian dipasang semula, dipasang kembali, dan diuji.</p>

      <h2>Perbandingan Sebelah-Menyebelah</h2>
      <ul>
        <li><strong>Cuci Kimia:</strong> Unit kekal dipasang · 45–90 minit · Dari RM 120 · Terbaik untuk penyelenggaraan rutin</li>
        <li><strong>Overhaul Kimia:</strong> Unit dibuka sepenuhnya · 2–3 jam · Dari RM 220 · Terbaik untuk masalah teruk</li>
      </ul>
      <p>Tidak pasti yang mana anda perlukan? WhatsApp foto kepada kami di <strong>+60 18-298 3573</strong> dan pasukan kami akan memberi nasihat jujur.</p>
    `,
    contentZH: `
      <h2>什么是化学清洗？</h2>
      <p><strong>化学清洗</strong>（也称为高压化学清洗）是一种深度清洁服务，受过培训的技术人员在机器保持挂壁安装状态下，向蒸发器盘管和鼓风机轮喷洒化学清洁液。</p>
      <p>然后使用高压水冲走溶解的污垢、霉菌、细菌和灰尘。脏水通过机器的排水管排出。</p>

      <h2>什么是化学大修？</h2>
      <p><strong>化学大修</strong>更进一步。技术人员将室内机从墙上完全拆卸，取出每个内部组件，将盘管、鼓风机轮、排水盘和机壳浸泡在深度化学溶液中。</p>
      <p>清洁每个隐蔽角落——这些是普通化学清洗无法触及的地方。然后重新组装、重新安装并测试机器。</p>

      <h2>并排比较</h2>
      <ul>
        <li><strong>化学清洗：</strong>机器保持安装状态 · 45-90分钟 · 从RM 120起 · 最适合日常保养</li>
        <li><strong>化学大修：</strong>机器完全拆卸 · 2-3小时 · 从RM 220起 · 最适合严重问题</li>
      </ul>
      <p>不确定您需要哪种？请WhatsApp照片给我们：<strong>+60 18-298 3573</strong>，我们的团队将诚实地为您建议。</p>
    `,
  },
  {
    slug: "aircon-not-cold-reasons",
    title: "Aircon Running But Not Cold? 7 Common Causes in Malaysia",
    titleMS: "Aircond Berjalan Tapi Tidak Sejuk? 7 Punca Biasa di Malaysia",
    titleZH: "冷气开着但不冷？马来西亚7个常见原因",
    excerpt: "Your aircond is switched on but the room is still warm. Here are the 7 most common reasons why — and what to do about each one.",
    excerptMS: "Aircond anda dihidupkan tetapi bilik masih panas. Berikut adalah 7 sebab paling biasa mengapa — dan apa yang perlu dilakukan untuk setiap satu.",
    excerptZH: "您的冷气已开启但房间仍然很热。以下是7个最常见的原因——以及每种情况的解决方法。",
    category: "Troubleshooting",
    categoryMS: "Penyelesaian Masalah",
    categoryZH: "故障排查",
    tags: ["aircon not cold", "aircond troubleshoot", "aircon repair KL", "gas top up", "aircond service Malaysia"],
    date: "2025-05-01",
    dateDisplay: "May 2025",
    readTime: 6,
    relatedService: "Troubleshooting & Repairs",
    content: `
      <h2>Why Is My Aircond Running But Not Cooling?</h2>
      <p>This is the most common aircond complaint in Malaysia — the unit is on, the fan is blowing, but the air is warm or barely cool. Here are the 7 most likely causes.</p>
      <h2>1. Low Refrigerant Gas</h2>
      <p>Gas leaks slowly over time. When levels drop, cooling drops dramatically. Solution: Gas top-up (R22, R410A, or R32). From RM 120.</p>
      <h2>2. Dirty Evaporator Coil</h2>
      <p>A heavily coated coil can't absorb heat efficiently. Solution: Chemical wash (from RM 120) or overhaul depending on severity.</p>
      <h2>3. Faulty Capacitor</h2>
      <p>The capacitor powers the compressor. A weak one means the compressor runs inefficiently. Solution: Replacement from RM 150.</p>
      <h2>4. Dirty Air Filter</h2>
      <p>A blocked filter restricts airflow across the coil. Solution: Clean or replace the filter monthly — DIY task, no tools needed.</p>
      <h2>5. Thermostat or Sensor Fault</h2>
      <p>If the thermostat misreads room temperature, the compressor shuts off too early. Solution: Sensor replacement from RM 150.</p>
      <h2>6. Outdoor Unit Blocked or Overheating</h2>
      <p>If the outdoor condenser is surrounded by walls or objects, heat can't escape and cooling efficiency drops. Solution: Clear the area around the outdoor unit.</p>
      <h2>7. Undersized Unit for the Room</h2>
      <p>A 1.0 HP unit in a 600 sq ft living room will struggle. If the unit has always been weak, the HP may simply be insufficient.</p>
      <h2>What to Do</h2>
      <p>WhatsApp KL Renovator at <strong>+60 18-298 3573</strong>. Diagnostic fee RM 88 (waived if repair is done same visit). See: <a href="/problems/aircond-not-cold">Aircond not cold — full guide</a> | <a href="/services/gas-topup">Gas top-up pricing</a></p>
    `,
    contentMS: `
      <h2>Kenapa Aircond Saya Berjalan Tapi Tidak Menyejukkan?</h2>
      <p>Ini adalah aduan aircond yang paling biasa di Malaysia — unit hidup, kipas bertiup, tetapi udara panas atau hampir tidak sejuk. Berikut adalah 7 punca yang paling mungkin.</p>
      <h2>1. Gas Penyejuk Rendah</h2>
      <p>Gas bocor perlahan dari masa ke masa. Apabila tahap merosot, penyejukan merosot dengan dramatik. Penyelesaian: Tambah gas (R22, R410A, atau R32). Dari RM 120.</p>
      <h2>2. Gegelung Evaporator Kotor</h2>
      <p>Gegelung yang sangat tersalut tidak dapat menyerap haba dengan cekap. Penyelesaian: Cuci kimia (dari RM 120) atau overhaul bergantung kepada keterukan.</p>
      <h2>3. Kapasitor Rosak</h2>
      <p>Kapasitor menggerakkan kompressor. Kapasitor yang lemah bermakna kompressor berjalan dengan tidak cekap. Penyelesaian: Penggantian dari RM 150.</p>
      <h2>4. Penapis Udara Kotor</h2>
      <p>Penapis yang tersumbat menyekat aliran udara merentasi gegelung. Penyelesaian: Bersihkan atau ganti penapis setiap bulan — tugas DIY, tiada alat diperlukan.</p>
      <h2>5. Kerosakan Termostat atau Sensor</h2>
      <p>Jika termostat membaca suhu bilik dengan salah, kompressor mati terlalu awal. Penyelesaian: Penggantian sensor dari RM 150.</p>
      <h2>6. Unit Luar Disekat atau Terlalu Panas</h2>
      <p>Jika kondenser luar dikelilingi oleh dinding atau objek, haba tidak dapat keluar dan kecekapan penyejukan merosot.</p>
      <h2>7. Unit Terlalu Kecil untuk Bilik</h2>
      <p>Unit 1.0 HP dalam ruang tamu 600 kaki persegi akan bergelut. Jika unit sentiasa lemah, HP mungkin tidak mencukupi.</p>
      <h2>Apa yang Perlu Dilakukan</h2>
      <p>WhatsApp KL Renovator di <strong>+60 18-298 3573</strong>. Yuran diagnostik RM 88 (dikecualikan jika pembaikan dilakukan pada lawatan yang sama).</p>
    `,
    contentZH: `
      <h2>为什么我的冷气开着但不制冷？</h2>
      <p>这是马来西亚最常见的冷气投诉——机器开着，风扇在吹，但空气是热的或几乎不凉。以下是7个最可能的原因。</p>
      <h2>1. 制冷剂气体不足</h2>
      <p>气体随时间缓慢泄漏。当水平下降时，制冷效果急剧下降。解决方案：充气（R22、R410A或R32）。从RM 120起。</p>
      <h2>2. 蒸发器盘管脏污</h2>
      <p>严重涂层的盘管无法有效吸收热量。解决方案：化学清洗（从RM 120起）或视严重程度进行大修。</p>
      <h2>3. 电容器故障</h2>
      <p>电容器驱动压缩机。电容器弱意味着压缩机运行效率低。解决方案：更换，从RM 150起。</p>
      <h2>4. 过滤网脏污</h2>
      <p>堵塞的过滤网限制了通过盘管的气流。解决方案：每月清洁或更换过滤网——DIY任务，不需要工具。</p>
      <h2>5. 恒温器或传感器故障</h2>
      <p>如果恒温器误读室温，压缩机会过早关闭。解决方案：传感器更换，从RM 150起。</p>
      <h2>6. 室外机被阻挡或过热</h2>
      <p>如果室外冷凝器被墙壁或物体包围，热量无法散发，制冷效率下降。解决方案：清除室外机周围的障碍物。</p>
      <h2>7. 机器功率不足</h2>
      <p>600平方英尺客厅中的1.0 HP机器会力不从心。如果机器一直很弱，可能HP确实不足。</p>
      <h2>该怎么做</h2>
      <p>请WhatsApp KL Renovator：<strong>+60 18-298 3573</strong>。诊断费RM 88（同次维修则豁免）。</p>
    `,
  },
  {
    slug: "how-often-service-aircond-malaysia",
    title: "How Often Should You Service Your Aircond in Malaysia?",
    titleMS: "Berapa Kerap Anda Perlu Servis Aircond di Malaysia?",
    titleZH: "在马来西亚应该多久保养一次冷气？",
    excerpt: "Malaysia's heat and humidity means your aircond works harder than most. Here's the recommended servicing schedule based on usage type and unit age.",
    excerptMS: "Haba dan kelembapan Malaysia bermakna aircond anda bekerja lebih keras daripada kebanyakan. Berikut adalah jadual servis yang disyorkan berdasarkan jenis penggunaan dan usia unit.",
    excerptZH: "马来西亚的炎热和潮湿意味着您的冷气比大多数地方工作得更努力。以下是根据使用类型和机器年龄推荐的保养计划。",
    category: "Maintenance",
    categoryMS: "Penyelenggaraan",
    categoryZH: "保养维护",
    tags: ["aircon service frequency Malaysia", "how often service aircond", "aircond maintenance schedule", "KL Renovator"],
    date: "2025-04-01",
    dateDisplay: "April 2025",
    readTime: 4,
    relatedService: "Basic Servicing / Routine Maintenance",
    content: `
      <h2>Why Malaysia Needs More Frequent Servicing</h2>
      <p>Unlike temperate countries where aircond is used seasonally, Malaysian aircond units run year-round — often 8–12 hours per day. Combined with high humidity, dust, and occasional haze, units accumulate dirt faster and need more regular attention.</p>
      <h2>Recommended Service Schedule</h2>
      <ul>
        <li><strong>Light use (evenings only, bedrooms):</strong> Service every 6 months</li>
        <li><strong>Moderate use (4–6 hours/day):</strong> Service every 4 months</li>
        <li><strong>Heavy use (8+ hours/day, living halls, offices):</strong> Service every 3 months</li>
      </ul>
      <h2>When to Do a Chemical Wash</h2>
      <p>Regardless of usage, a chemical wash is recommended once every 12 months. If you're near construction, a main road, or in a high-humidity area, every 8–10 months is better.</p>
      <h2>Signs You've Waited Too Long</h2>
      <ul>
        <li>Musty or sour smell from the unit</li>
        <li>Weaker cooling than before</li>
        <li>Visible dust or mould on the vents</li>
        <li>Water dripping from the indoor unit</li>
        <li>Higher electricity bill than usual</li>
      </ul>
      <h2>Book a Service</h2>
      <p>Basic servicing from <strong>RM 99</strong>. Chemical wash from <strong>RM 120</strong>. WhatsApp <strong>+60 18-298 3573</strong> to book. See: <a href="/services/basic-servicing">Basic servicing page</a></p>
    `,
    contentMS: `
      <h2>Mengapa Malaysia Memerlukan Servis yang Lebih Kerap</h2>
      <p>Tidak seperti negara beriklim sederhana di mana aircond digunakan secara bermusim, unit aircond Malaysia beroperasi sepanjang tahun — selalunya 8–12 jam sehari. Digabungkan dengan kelembapan tinggi, habuk, dan jerebu yang kadangkala berlaku, unit mengumpul kotoran lebih cepat dan memerlukan perhatian yang lebih kerap.</p>
      <h2>Jadual Servis yang Disyorkan</h2>
      <ul>
        <li><strong>Penggunaan ringan (malam sahaja, bilik tidur):</strong> Servis setiap 6 bulan</li>
        <li><strong>Penggunaan sederhana (4–6 jam/hari):</strong> Servis setiap 4 bulan</li>
        <li><strong>Penggunaan berat (8+ jam/hari, ruang tamu, pejabat):</strong> Servis setiap 3 bulan</li>
      </ul>
      <h2>Bila Perlu Buat Cuci Kimia</h2>
      <p>Tanpa mengira penggunaan, cuci kimia disyorkan sekali setiap 12 bulan. Jika anda berdekatan dengan pembinaan, jalan utama, atau kawasan kelembapan tinggi, setiap 8–10 bulan adalah lebih baik.</p>
      <h2>Tempah Servis</h2>
      <p>Servis asas dari <strong>RM 99</strong>. Cuci kimia dari <strong>RM 120</strong>. WhatsApp <strong>+60 18-298 3573</strong> untuk membuat tempahan.</p>
    `,
    contentZH: `
      <h2>为什么马来西亚需要更频繁的保养</h2>
      <p>与季节性使用冷气的温带国家不同，马来西亚的冷气机全年运行——每天通常运行8-12小时。加上高湿度、灰尘和偶发的烟霾，机器积聚污垢更快，需要更定期的维护。</p>
      <h2>推荐保养计划</h2>
      <ul>
        <li><strong>轻度使用（仅晚间，卧室）：</strong>每6个月保养一次</li>
        <li><strong>中度使用（每天4-6小时）：</strong>每4个月保养一次</li>
        <li><strong>重度使用（每天8小时以上，客厅、办公室）：</strong>每3个月保养一次</li>
      </ul>
      <h2>何时进行化学清洗</h2>
      <p>无论使用情况如何，建议每12个月进行一次化学清洗。如果您靠近建筑工地、主干道或高湿度地区，每8-10个月更好。</p>
      <h2>预约保养</h2>
      <p>基本保养从<strong>RM 99</strong>起。化学清洗从<strong>RM 120</strong>起。请WhatsApp <strong>+60 18-298 3573</strong>预约。</p>
    `,
  },
  {
    slug: "r32-r410a-r22-gas-difference",
    title: "R22 vs R410A vs R32 Refrigerant Gas — Which Does Your Aircon Use?",
    titleMS: "Gas R22 vs R410A vs R32 — Mana yang Digunakan oleh Aircond Anda?",
    titleZH: "R22 vs R410A vs R32 制冷剂 — 您的冷气使用哪种？",
    excerpt: "Confused about refrigerant gas types? Here's a simple guide to R22, R410A, and R32 — how to identify which one your unit uses and what top-up costs to expect.",
    excerptMS: "Keliru tentang jenis gas penyejuk? Berikut adalah panduan mudah untuk R22, R410A, dan R32 — cara mengenal pasti yang digunakan oleh unit anda dan kos tambah gas yang dijangkakan.",
    excerptZH: "对制冷剂气体类型感到困惑？以下是R22、R410A和R32的简单指南——如何识别您的机器使用哪种以及充气费用预期。",
    category: "Technical Guide",
    categoryMS: "Panduan Teknikal",
    categoryZH: "技术指南",
    tags: ["R22 gas", "R410A gas", "R32 refrigerant", "gas top up Malaysia", "aircond gas KL"],
    date: "2025-03-01",
    dateDisplay: "March 2025",
    readTime: 5,
    relatedService: "Gas Top-Up / Precision Balancing",
    content: `
      <h2>The Three Main Refrigerant Types in Malaysia</h2>
      <p>Most aircond units in Malaysia use one of three refrigerant types: R22, R410A, or R32. Each has different properties, costs, and environmental impact.</p>
      <h2>R22 (Freon)</h2>
      <p>The oldest gas type. Found in units made before 2015. R22 is being phased out globally due to its high ozone depletion potential.</p>
      <ul>
        <li>Units: Pre-2015 models</li>
        <li>Top-up cost: RM 120–180 (1.0–2.0 HP)</li>
      </ul>
      <h2>R410A</h2>
      <p>The standard gas for units made between 2010–2020. No ozone depletion but higher global warming potential than R32.</p>
      <ul>
        <li>Units: 2010–2020 Daikin, Panasonic, Mitsubishi, LG, Samsung</li>
        <li>Top-up cost: RM 150–200 (1.0–2.0 HP)</li>
      </ul>
      <h2>R32</h2>
      <p>The current standard for new inverter units. Lower global warming potential, better energy efficiency. Most new units use R32.</p>
      <ul>
        <li>Units: 2018 onwards, especially inverter models</li>
        <li>Top-up cost: RM 180–220 (1.0–2.0 HP)</li>
      </ul>
      <h2>How to Check Which Gas Your Unit Uses</h2>
      <p>Look at the sticker on your outdoor unit — it clearly states the refrigerant type. Or WhatsApp us a photo at <strong>+60 18-298 3573</strong>.</p>
      <p>See: <a href="/services/gas-topup">Gas top-up service and full pricing</a> | <a href="/problems/aircond-low-gas">Aircond low gas symptoms</a></p>
    `,
    contentMS: `
      <h2>Tiga Jenis Penyejuk Utama di Malaysia</h2>
      <p>Kebanyakan unit aircond di Malaysia menggunakan salah satu daripada tiga jenis penyejuk: R22, R410A, atau R32. Setiap satunya mempunyai sifat, kos, dan kesan alam sekitar yang berbeza.</p>
      <h2>R22 (Freon)</h2>
      <p>Jenis gas yang paling lama. Terdapat dalam unit yang dibuat sebelum 2015. R22 sedang dihentikan secara global kerana potensi penipisan ozon yang tinggi.</p>
      <ul><li>Kos tambah gas: RM 120–180 (1.0–2.0 HP)</li></ul>
      <h2>R410A</h2>
      <p>Gas standard untuk unit yang dibuat antara 2010–2020.</p>
      <ul><li>Kos tambah gas: RM 150–200 (1.0–2.0 HP)</li></ul>
      <h2>R32</h2>
      <p>Standard semasa untuk unit inverter baru. Potensi pemanasan global yang lebih rendah, kecekapan tenaga yang lebih baik.</p>
      <ul><li>Kos tambah gas: RM 180–220 (1.0–2.0 HP)</li></ul>
      <h2>Cara Menyemak Gas yang Digunakan oleh Unit Anda</h2>
      <p>Lihat pelekat pada unit luar anda — ia menyatakan jenis penyejuk dengan jelas. Atau WhatsApp foto kepada kami di <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>马来西亚三种主要制冷剂类型</h2>
      <p>马来西亚大多数冷气机使用三种制冷剂之一：R22、R410A或R32。每种都有不同的特性、成本和环境影响。</p>
      <h2>R22（氟利昂）</h2>
      <p>最古老的气体类型。见于2015年前制造的机器。R22因其高臭氧消耗潜力正在全球范围内逐步淘汰。</p>
      <ul><li>充气费用：RM 120–180（1.0–2.0 HP）</li></ul>
      <h2>R410A</h2>
      <p>2010-2020年制造机器的标准气体。</p>
      <ul><li>充气费用：RM 150–200（1.0–2.0 HP）</li></ul>
      <h2>R32</h2>
      <p>新变频机器的当前标准。全球变暖潜力更低，能效更高。</p>
      <ul><li>充气费用：RM 180–220（1.0–2.0 HP）</li></ul>
      <h2>如何查看您的机器使用哪种气体</h2>
      <p>查看室外机上的贴纸——它清楚地标明了制冷剂类型。或者WhatsApp照片给我们：<strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "aircond-water-leaking-causes",
    title: "Aircon Water Leaking? Here Are the Most Common Causes & Fixes",
    titleMS: "Aircond Bocor Air? Berikut Punca dan Penyelesaian Paling Biasa",
    titleZH: "冷气漏水？以下是最常见的原因和解决方法",
    excerpt: "Water dripping from your indoor aircond unit is one of the most common problems in Malaysia. Here's what causes it and how to fix it properly.",
    excerptMS: "Air menitis dari unit dalam aircond anda adalah salah satu masalah yang paling biasa di Malaysia. Berikut adalah punca dan cara memperbaikinya dengan betul.",
    excerptZH: "室内冷气机滴水是马来西亚最常见的问题之一。以下是原因及正确解决方法。",
    category: "Troubleshooting",
    categoryMS: "Penyelesaian Masalah",
    categoryZH: "故障排查",
    tags: ["aircon water leaking", "aircond leaking water Malaysia", "aircon dripping KL", "drain pipe blocked", "KL Renovator"],
    date: "2025-02-01",
    dateDisplay: "February 2025",
    readTime: 4,
    relatedService: "Chemical Overhaul",
    content: `
      <h2>Why Is My Aircon Leaking Water?</h2>
      <p>Water leaking from your indoor unit is the most common aircond complaint in Malaysia — especially during rainy season. Here are the main causes.</p>
      <h2>Cause 1: Blocked Drain Pipe</h2>
      <p>The most common cause. Algae, mould, and debris clog the drain pipe. Solution: Drain pipe flush during basic service or chemical wash.</p>
      <h2>Cause 2: Dirty Evaporator Coil</h2>
      <p>When the coil is coated with dirt, excess condensation forms and drips. Solution: Chemical wash or overhaul.</p>
      <h2>Cause 3: Ice on the Coil Melting</h2>
      <p>If the coil freezes (due to low gas or severe blockage) and then melts, a large amount of water drips suddenly. Solution: Check gas levels and clean the coil.</p>
      <h2>Cause 4: Damaged Drain Pan</h2>
      <p>Over time, the plastic drain pan can crack. Solution: Drain pan replacement during an overhaul.</p>
      <h2>What to Do Right Now</h2>
      <ul>
        <li>Place a bucket or towel below the unit</li>
        <li>Turn off the aircond if leaking heavily</li>
        <li>WhatsApp KL Renovator at <strong>+60 18-298 3573</strong></li>
      </ul>
      <p>See: <a href="/problems/aircond-water-leaking">Aircond water leaking full guide</a> | <a href="/services/chemical-overhaul">Chemical overhaul service</a></p>
    `,
    contentMS: `
      <h2>Kenapa Aircond Saya Bocor Air?</h2>
      <p>Air bocor dari unit dalam adalah aduan aircond yang paling biasa di Malaysia — terutamanya semasa musim hujan.</p>
      <h2>Punca 1: Paip Longkang Tersumbat</h2>
      <p>Punca yang paling biasa. Alga, kulat, dan serpihan menyumbat paip longkang. Penyelesaian: Pembasuhan paip longkang semasa servis asas atau cuci kimia.</p>
      <h2>Punca 2: Gegelung Evaporator Kotor</h2>
      <p>Apabila gegelung tersalut dengan kotoran, lebihan kondensasi terbentuk dan menitis. Penyelesaian: Cuci kimia atau overhaul.</p>
      <h2>Punca 3: Ais pada Gegelung Mencair</h2>
      <p>Jika gegelung membeku (akibat gas rendah atau sekatan teruk) dan kemudian mencair, sejumlah besar air menitis tiba-tiba.</p>
      <h2>Apa yang Perlu Dilakukan Sekarang</h2>
      <ul>
        <li>Letakkan baldi atau tuala di bawah unit</li>
        <li>Matikan aircond jika bocor teruk</li>
        <li>WhatsApp KL Renovator di <strong>+60 18-298 3573</strong></li>
      </ul>
    `,
    contentZH: `
      <h2>我的冷气为什么漏水？</h2>
      <p>室内机漏水是马来西亚最常见的冷气投诉——尤其是在雨季。以下是主要原因。</p>
      <h2>原因1：排水管堵塞</h2>
      <p>最常见的原因。藻类、霉菌和碎屑堵塞排水管。解决方案：基本保养或化学清洗时冲洗排水管。</p>
      <h2>原因2：蒸发器盘管脏污</h2>
      <p>当盘管被污垢覆盖时，多余的冷凝水形成并滴落。解决方案：化学清洗或大修。</p>
      <h2>原因3：盘管结冰融化</h2>
      <p>如果盘管结冰（因气体不足或严重堵塞）然后融化，大量水会突然滴落。</p>
      <h2>现在该做什么</h2>
      <ul>
        <li>在机器下方放置水桶或毛巾</li>
        <li>如果严重漏水，关闭冷气</li>
        <li>请WhatsApp KL Renovator：<strong>+60 18-298 3573</strong></li>
      </ul>
    `,
  },
  {
    slug: "best-aircond-brands-malaysia-2025",
    title: "Best Aircond Brands in Malaysia 2025 — Daikin, Panasonic, Mitsubishi Compared",
    titleMS: "Jenama Aircond Terbaik di Malaysia 2025 — Daikin, Panasonic, Mitsubishi Dibandingkan",
    titleZH: "2025年马来西亚最佳冷气品牌 — 大金、松下、三菱对比",
    excerpt: "Choosing a new aircond in Malaysia? Here's an honest comparison of the top brands to help you decide.",
    excerptMS: "Memilih aircond baru di Malaysia? Berikut adalah perbandingan jujur jenama terbaik untuk membantu anda membuat keputusan.",
    excerptZH: "在马来西亚选购新冷气？以下是顶级品牌的诚实比较，帮助您做决定。",
    category: "Buying Guide",
    categoryMS: "Panduan Pembelian",
    categoryZH: "购买指南",
    tags: ["best aircon brand Malaysia", "Daikin vs Panasonic", "Mitsubishi aircond", "inverter aircond Malaysia 2025"],
    date: "2025-01-01",
    dateDisplay: "January 2025",
    readTime: 7,
    relatedService: "New Unit Installation",
    content: `
      <h2>Top Aircond Brands in Malaysia 2025</h2>
      <p>Here's an honest comparison based on our technicians' real-world experience servicing thousands of units across KL and Selangor.</p>
      <h2>Daikin — Best Overall</h2>
      <p>Daikin is consistently the most reliable brand we service. Japanese engineering, excellent energy efficiency, and spare parts are widely available.</p>
      <ul><li>Best for: Reliability, long lifespan</li><li>Gas type: R32</li><li>Price range: RM 1,200 – 3,500</li></ul>
      <h2>Panasonic — Best Value</h2>
      <p>Excellent value for money. Nanoe-X air purification is a genuine benefit for families with allergies.</p>
      <ul><li>Best for: Value, air quality</li><li>Gas type: R32</li><li>Price range: RM 1,100 – 3,000</li></ul>
      <h2>Mitsubishi Electric — Best for Heavy Use</h2>
      <p>Built for continuous heavy-duty operation. Often the first choice for commercial spaces.</p>
      <ul><li>Best for: Commercial, heavy residential</li><li>Price range: RM 1,400 – 4,000</li></ul>
      <h2>Midea — Best Budget Option</h2>
      <p>Good budget option for small rooms and rental properties. Parts are affordable and widely available.</p>
      <ul><li>Best for: Budget, rentals</li><li>Price range: RM 800 – 1,800</li></ul>
      <h2>Our Recommendation</h2>
      <p>For most Malaysian homes: <strong>Daikin or Panasonic</strong> inverter models. KL Renovator installs all brands. WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/services/installation">Installation pricing</a> | <a href="/brands/daikin">Daikin service</a> | <a href="/brands/panasonic">Panasonic service</a></p>
    `,
    contentMS: `
      <h2>Jenama Aircond Terbaik di Malaysia 2025</h2>
      <p>Berikut adalah perbandingan jujur berdasarkan pengalaman dunia sebenar juruteknik kami yang menservis ribuan unit di seluruh KL dan Selangor.</p>
      <h2>Daikin — Terbaik Keseluruhan</h2>
      <p>Daikin secara konsisten adalah jenama yang paling dipercayai yang kami servis. Kejuruteraan Jepun, kecekapan tenaga yang sangat baik.</p>
      <ul><li>Terbaik untuk: Kebolehpercayaan, jangka hayat panjang</li><li>Julat harga: RM 1,200 – 3,500</li></ul>
      <h2>Panasonic — Nilai Terbaik</h2>
      <p>Nilai wang yang sangat baik. Penyucian udara Nanoe-X adalah faedah tulen untuk keluarga dengan alahan.</p>
      <ul><li>Julat harga: RM 1,100 – 3,000</li></ul>
      <h2>Mitsubishi Electric — Terbaik untuk Penggunaan Berat</h2>
      <p>Dibina untuk operasi tugasan berat berterusan.</p>
      <ul><li>Julat harga: RM 1,400 – 4,000</li></ul>
      <h2>Midea — Pilihan Bajet Terbaik</h2>
      <p>Pilihan bajet yang baik untuk bilik kecil dan hartanah sewa.</p>
      <ul><li>Julat harga: RM 800 – 1,800</li></ul>
      <h2>Cadangan Kami</h2>
      <p>Untuk kebanyakan rumah Malaysia: model inverter <strong>Daikin atau Panasonic</strong>. KL Renovator memasang semua jenama. WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>2025年马来西亚最佳冷气品牌</h2>
      <p>以下是基于我们技术人员在吉隆坡和雪兰莪服务数千台机器的真实经验的诚实比较。</p>
      <h2>大金 — 综合最佳</h2>
      <p>大金始终是我们服务的最可靠品牌。日本工程，出色的能效。</p>
      <ul><li>最适合：可靠性、长寿命</li><li>价格范围：RM 1,200 – 3,500</li></ul>
      <h2>松下 — 最佳性价比</h2>
      <p>物超所值。Nanoe-X空气净化对过敏家庭是真正的福利。</p>
      <ul><li>价格范围：RM 1,100 – 3,000</li></ul>
      <h2>三菱电机 — 重度使用最佳</h2>
      <p>专为持续高强度运行而设计。</p>
      <ul><li>价格范围：RM 1,400 – 4,000</li></ul>
      <h2>Midea — 最佳预算选择</h2>
      <p>适合小房间和出租物业的预算选择。</p>
      <ul><li>价格范围：RM 800 – 1,800</li></ul>
      <h2>我们的推荐</h2>
      <p>对大多数马来西亚家庭：<strong>大金或松下</strong>变频型号。KL Renovator安装所有品牌。WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "aircond-maintenance-checklist-malaysia",
    title: "Aircond Maintenance Checklist Malaysia — 12 Things to Check Every Year",
    titleMS: "Senarai Semak Penyelenggaraan Aircond Malaysia — 12 Perkara untuk Diperiksa Setiap Tahun",
    titleZH: "马来西亚冷气保养检查清单 — 每年需要检查的12件事",
    excerpt: "A complete aircond maintenance checklist for Malaysian homeowners and offices. Know exactly what needs to be checked, when, and why.",
    excerptMS: "Senarai semak penyelenggaraan aircond yang lengkap untuk pemilik rumah dan pejabat Malaysia. Ketahui dengan tepat apa yang perlu diperiksa, bila, dan mengapa.",
    excerptZH: "马来西亚房主和办公室的完整冷气保养检查清单。确切了解需要检查什么、何时以及为什么。",
    category: "Maintenance Guide",
    categoryMS: "Panduan Penyelenggaraan",
    categoryZH: "保养指南",
    tags: ["aircond maintenance checklist Malaysia", "aircon service checklist KL", "HVAC maintenance Selangor", "aircond service schedule"],
    date: "2026-06-01",
    dateDisplay: "June 2026",
    readTime: 6,
    relatedService: "Basic Servicing / Routine Maintenance",
    content: `
      <h2>Why a Maintenance Checklist Matters</h2>
      <p>In Malaysia's hot and humid climate, your aircond works harder than almost anywhere else in the world. Without regular maintenance, dust, mould and moisture accumulate rapidly — reducing efficiency, raising electricity bills, and shortening the unit's lifespan.</p>
      <h2>Monthly Checks (DIY)</h2>
      <ul>
        <li><strong>Clean the air filter</strong> — Remove, rinse under water, dry completely, refit. Takes 10 minutes. Blocked filters are the single biggest cause of poor cooling.</li>
        <li><strong>Check for unusual noises</strong> — Rattling, buzzing or grinding indicates a loose part or failing component.</li>
        <li><strong>Check for water dripping</strong> — Constant dripping means the drain pipe is blocked.</li>
        <li><strong>Check the outdoor unit is clear</strong> — No leaves, plastic bags or debris blocking the condenser fins.</li>
      </ul>
      <h2>Every 3–4 Months — Professional Basic Service</h2>
      <ul>
        <li>Filter cleaning, evaporator coil inspection, drain pipe flush, electrical connections check, cooling performance test</li>
      </ul>
      <h2>Every 12 Months — Chemical Wash</h2>
      <ul>
        <li>High-pressure chemical cleaning of evaporator coil, blower wheel cleaning, drain pan sterilisation, refrigerant pressure check, capacitor check, outdoor condenser cleaning</li>
      </ul>
      <h2>Every 2–3 Years — Chemical Overhaul</h2>
      <ul>
        <li>Full dismantling, deep cleaning of every component, inspection of all internal wiring and PCB board</li>
      </ul>
      <h2>Book Your Maintenance Service</h2>
      <p>Basic service from RM 99, chemical wash from RM 120. WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/services/basic-servicing">Basic servicing</a> | <a href="/services/chemical-wash">Chemical wash</a></p>
    `,
    contentMS: `
      <h2>Mengapa Senarai Semak Penyelenggaraan Penting</h2>
      <p>Dalam iklim panas dan lembap Malaysia, aircond anda bekerja lebih keras daripada hampir mana-mana tempat lain di dunia. Tanpa penyelenggaraan yang kerap, habuk, kulat dan kelembapan terkumpul dengan cepat.</p>
      <h2>Pemeriksaan Bulanan (DIY)</h2>
      <ul>
        <li><strong>Bersihkan penapis udara</strong> — Keluarkan, bilas dengan air, biar kering sepenuhnya, pasang semula. Mengambil masa 10 minit.</li>
        <li><strong>Periksa bunyi luar biasa</strong> — Bunyi gemetar, berdengung atau menggigit menunjukkan bahagian longgar.</li>
        <li><strong>Periksa titisan air</strong> — Titisan berterusan bermakna paip longkang tersumbat.</li>
        <li><strong>Pastikan unit luar bersih</strong> — Tiada daun atau serpihan yang menyekat sirip kondenser.</li>
      </ul>
      <h2>Setiap 3–4 Bulan — Servis Asas Profesional</h2>
      <ul><li>Pembersihan penapis, pemeriksaan gegelung, pembasuhan paip longkang, semakan sambungan elektrik, ujian prestasi penyejukan</li></ul>
      <h2>Setiap 12 Bulan — Cuci Kimia</h2>
      <ul><li>Pembersihan kimia tekanan tinggi gegelung evaporator, pembersihan roda blower, pensterilan dulang longkang, semakan tekanan penyejuk</li></ul>
      <h2>Tempah Servis Penyelenggaraan Anda</h2>
      <p>Servis asas dari RM 99, cuci kimia dari RM 120. WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>为什么保养检查清单很重要</h2>
      <p>在马来西亚炎热潮湿的气候下，您的冷气比世界上几乎任何其他地方都工作得更努力。没有定期保养，灰尘、霉菌和水分迅速积聚。</p>
      <h2>每月检查（DIY）</h2>
      <ul>
        <li><strong>清洗过滤网</strong> — 取出，用水冲洗，完全晾干，重新安装。只需10分钟。</li>
        <li><strong>检查异常噪音</strong> — 嘎嘎声、嗡嗡声或研磨声表示零件松动。</li>
        <li><strong>检查滴水</strong> — 持续滴水意味着排水管堵塞。</li>
        <li><strong>确保室外机清洁</strong> — 没有叶子或碎屑堵塞冷凝器翅片。</li>
      </ul>
      <h2>每3-4个月 — 专业基本保养</h2>
      <ul><li>清洗过滤网、检查蒸发器盘管、冲洗排水管、检查电气连接、冷却性能测试</li></ul>
      <h2>每12个月 — 化学清洗</h2>
      <ul><li>蒸发器盘管高压化学清洗、鼓风机轮清洁、排水盘消毒、制冷剂压力检查</li></ul>
      <h2>预约保养服务</h2>
      <p>基本保养从RM 99起，化学清洗从RM 120起。WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "aircond-service-price-guide-kl-2026",
    title: "Aircond Service Price Guide KL & Selangor 2026 — All Services Listed",
    titleMS: "Panduan Harga Servis Aircond KL & Selangor 2026 — Semua Perkhidmatan Disenaraikan",
    titleZH: "2026年吉隆坡及雪兰莪冷气服务价格指南 — 所有服务一览",
    excerpt: "Complete and transparent aircond service pricing for Kuala Lumpur and Selangor in 2026. All services, all prices, no surprises.",
    excerptMS: "Harga servis aircond yang lengkap dan telus untuk Kuala Lumpur dan Selangor pada 2026. Semua perkhidmatan, semua harga, tiada kejutan.",
    excerptZH: "2026年吉隆坡和雪兰莪完整透明的冷气服务价格。所有服务，所有价格，无惊喜。",
    category: "Pricing Guide",
    categoryMS: "Panduan Harga",
    categoryZH: "价格指南",
    tags: ["aircond service price KL 2026", "aircon service cost Selangor", "chemical wash price KL", "gas top up price Malaysia", "aircond installation cost KL"],
    date: "2026-06-01",
    dateDisplay: "June 2026",
    readTime: 5,
    relatedService: "Pressure Chemical Wash",
    content: `
      <h2>Aircond Service Pricing KL & Selangor 2026</h2>
      <p>Complete and transparent pricing from KL Renovator. All prices confirmed before work begins — no hidden charges.</p>
      <h2>Basic Servicing</h2>
      <ul>
        <li>Wall-Mounted 1.0–1.5 HP: <strong>RM 99</strong></li>
        <li>Wall-Mounted 2.0–2.5 HP: <strong>RM 120</strong></li>
        <li>Wall-Mounted 3.0–3.5 HP: <strong>RM 150</strong></li>
        <li>Ceiling Cassette 1.0–1.5 HP: <strong>RM 150</strong></li>
        <li>Ceiling Cassette 2.0–3.0 HP: <strong>RM 200</strong></li>
      </ul>
      <h2>Pressure Chemical Wash</h2>
      <ul>
        <li>Wall-Mounted 1.0–1.5 HP: <strong>RM 120</strong></li>
        <li>Wall-Mounted 2.0–2.5 HP: <strong>RM 150</strong></li>
        <li>Wall-Mounted 3.0 HP: <strong>RM 180</strong></li>
        <li>Wall-Mounted 4.0–5.0 HP: <strong>RM 200</strong></li>
        <li>Ceiling Cassette 1.0–1.5 HP: <strong>RM 220</strong></li>
        <li>Ceiling Cassette 2.0–3.0 HP: <strong>RM 280</strong></li>
      </ul>
      <h2>Chemical Overhaul</h2>
      <ul>
        <li>Wall-Mounted 1.0–1.5 HP: <strong>RM 220</strong></li>
        <li>Wall-Mounted 2.0–2.5 HP: <strong>RM 280</strong></li>
        <li>Wall-Mounted 3.0–3.5 HP: <strong>RM 350</strong></li>
      </ul>
      <h2>Gas Top-Up</h2>
      <ul>
        <li>R22 — 1.0 HP: <strong>RM 120</strong> | 1.5–2.0 HP: <strong>RM 150</strong></li>
        <li>R410A — 1.0 HP: <strong>RM 150</strong> | 1.5–2.0 HP: <strong>RM 180</strong></li>
        <li>R32 — 1.0 HP: <strong>RM 180</strong> | 1.5–2.0 HP: <strong>RM 200</strong></li>
      </ul>
      <h2>Repair & Installation</h2>
      <ul>
        <li>Diagnostic: <strong>RM 88</strong> (waived with repair)</li>
        <li>Installation Wall-Mounted 1.0–1.5 HP: <strong>RM 199</strong></li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong>. See also: <a href="/services">All services</a></p>
    `,
    contentMS: `
      <h2>Harga Servis Aircond KL & Selangor 2026</h2>
      <p>Harga lengkap dan telus dari KL Renovator. Semua harga disahkan sebelum kerja bermula — tiada caj tersembunyi.</p>
      <h2>Servis Asas</h2>
      <ul>
        <li>Dinding 1.0–1.5 HP: <strong>RM 99</strong></li>
        <li>Dinding 2.0–2.5 HP: <strong>RM 120</strong></li>
        <li>Ceiling Cassette 1.0–1.5 HP: <strong>RM 150</strong></li>
      </ul>
      <h2>Cuci Kimia Tekanan Tinggi</h2>
      <ul>
        <li>Dinding 1.0–1.5 HP: <strong>RM 120</strong></li>
        <li>Dinding 2.0–2.5 HP: <strong>RM 150</strong></li>
        <li>Dinding 3.0 HP: <strong>RM 180</strong></li>
        <li>Ceiling Cassette 1.0–1.5 HP: <strong>RM 220</strong></li>
      </ul>
      <h2>Overhaul Kimia</h2>
      <ul>
        <li>Dinding 1.0–1.5 HP: <strong>RM 220</strong></li>
        <li>Dinding 2.0–2.5 HP: <strong>RM 280</strong></li>
      </ul>
      <h2>Tambah Gas</h2>
      <ul>
        <li>R22 — 1.0 HP: <strong>RM 120</strong></li>
        <li>R410A — 1.0 HP: <strong>RM 150</strong></li>
        <li>R32 — 1.0 HP: <strong>RM 180</strong></li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong> untuk membuat tempahan.</p>
    `,
    contentZH: `
      <h2>2026年吉隆坡及雪兰莪冷气服务价格</h2>
      <p>KL Renovator完整透明的价格。所有价格在施工前确认——无隐藏收费。</p>
      <h2>基本保养</h2>
      <ul>
        <li>挂壁式 1.0–1.5 HP：<strong>RM 99</strong></li>
        <li>挂壁式 2.0–2.5 HP：<strong>RM 120</strong></li>
        <li>天花板卡式 1.0–1.5 HP：<strong>RM 150</strong></li>
      </ul>
      <h2>高压化学清洗</h2>
      <ul>
        <li>挂壁式 1.0–1.5 HP：<strong>RM 120</strong></li>
        <li>挂壁式 2.0–2.5 HP：<strong>RM 150</strong></li>
        <li>天花板卡式 1.0–1.5 HP：<strong>RM 220</strong></li>
      </ul>
      <h2>化学大修</h2>
      <ul>
        <li>挂壁式 1.0–1.5 HP：<strong>RM 220</strong></li>
        <li>挂壁式 2.0–2.5 HP：<strong>RM 280</strong></li>
      </ul>
      <h2>充气</h2>
      <ul>
        <li>R22 — 1.0 HP：<strong>RM 120</strong></li>
        <li>R410A — 1.0 HP：<strong>RM 150</strong></li>
        <li>R32 — 1.0 HP：<strong>RM 180</strong></li>
      </ul>
      <p>请WhatsApp <strong>+60 18-298 3573</strong> 预约。</p>
    `,
  },
  {
    slug: "inverter-vs-non-inverter-aircond-malaysia",
    title: "Inverter vs Non-Inverter Aircond Malaysia — Which Should You Buy?",
    titleMS: "Aircond Inverter vs Bukan Inverter Malaysia — Yang Mana Perlu Anda Beli?",
    titleZH: "变频 vs 定频冷气马来西亚 — 应该买哪种？",
    excerpt: "Inverter or non-inverter? This guide explains the real difference, electricity savings, lifespan, and which is right for Malaysian homes.",
    excerptMS: "Inverter atau bukan inverter? Panduan ini menerangkan perbezaan sebenar, penjimatan elektrik, jangka hayat, dan yang mana betul untuk rumah Malaysia.",
    excerptZH: "变频还是定频？本指南解释真正的区别、节电效果、使用寿命以及哪种适合马来西亚家庭。",
    category: "Buying Guide",
    categoryMS: "Panduan Pembelian",
    categoryZH: "购买指南",
    tags: ["inverter vs non inverter aircond Malaysia", "inverter aircond electricity saving", "best aircond Malaysia 2026", "aircond buying guide KL"],
    date: "2026-05-01",
    dateDisplay: "May 2026",
    readTime: 6,
    relatedService: "New Unit Installation",
    content: `
      <h2>Inverter vs Non-Inverter — The Simple Explanation</h2>
      <p>A non-inverter aircond compressor runs at one speed — full power, then off. An inverter varies its speed to maintain temperature with far less electricity.</p>
      <h2>Electricity Savings</h2>
      <ul>
        <li>Non-inverter 1.5 HP: approx. <strong>RM 80–120/month</strong></li>
        <li>Inverter 1.5 HP: approx. <strong>RM 40–70/month</strong></li>
        <li>Saving: roughly <strong>30–50% less electricity</strong></li>
      </ul>
      <h2>Lifespan</h2>
      <ul>
        <li>Non-inverter: 8–12 years average</li>
        <li>Inverter: 12–15 years average</li>
      </ul>
      <h2>When to Choose Each</h2>
      <ul>
        <li><strong>Inverter:</strong> Master bedroom, living room, home office — used daily</li>
        <li><strong>Non-inverter:</strong> Rarely used guest rooms, rental properties on tight budget</li>
      </ul>
      <h2>Installation</h2>
      <p>KL Renovator installs all inverter and non-inverter brands from <strong>RM 199</strong>. WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/services/installation">Installation service</a> | <a href="/brands/daikin">Daikin inverter service</a></p>
    `,
    contentMS: `
      <h2>Inverter vs Bukan Inverter — Penjelasan Mudah</h2>
      <p>Kompressor aircond bukan inverter berjalan pada satu kelajuan — kuasa penuh, kemudian mati. Inverter mengubah kelajuannya untuk mengekalkan suhu dengan penggunaan elektrik yang jauh lebih sedikit.</p>
      <h2>Penjimatan Elektrik</h2>
      <ul>
        <li>Bukan inverter 1.5 HP: lebih kurang <strong>RM 80–120/bulan</strong></li>
        <li>Inverter 1.5 HP: lebih kurang <strong>RM 40–70/bulan</strong></li>
        <li>Penjimatan: lebih kurang <strong>30–50% elektrik lebih sedikit</strong></li>
      </ul>
      <h2>Jangka Hayat</h2>
      <ul>
        <li>Bukan inverter: purata 8–12 tahun</li>
        <li>Inverter: purata 12–15 tahun</li>
      </ul>
      <h2>Pemasangan</h2>
      <p>KL Renovator memasang semua jenama dari <strong>RM 199</strong>. WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>变频 vs 定频 — 简单解释</h2>
      <p>定频冷气压缩机以一种速度运行——全速然后关闭。变频压缩机调节速度以用少得多的电力维持温度。</p>
      <h2>节电效果</h2>
      <ul>
        <li>定频1.5 HP：约 <strong>RM 80–120/月</strong></li>
        <li>变频1.5 HP：约 <strong>RM 40–70/月</strong></li>
        <li>节省：约 <strong>30-50%的电费</strong></li>
      </ul>
      <h2>使用寿命</h2>
      <ul>
        <li>定频：平均8-12年</li>
        <li>变频：平均12-15年</li>
      </ul>
      <h2>安装</h2>
      <p>KL Renovator安装所有变频和定频品牌，从 <strong>RM 199</strong> 起。WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "daikin-vs-panasonic-aircond-malaysia",
    title: "Daikin vs Panasonic Aircond Malaysia 2026 — Which is Better?",
    titleMS: "Aircond Daikin vs Panasonic Malaysia 2026 — Yang Mana Lebih Baik?",
    titleZH: "大金 vs 松下冷气马来西亚2026 — 哪个更好？",
    excerpt: "Daikin or Panasonic? Malaysia's two most popular aircond brands compared — price, reliability, electricity savings, and which to buy.",
    excerptMS: "Daikin atau Panasonic? Dua jenama aircond paling popular di Malaysia dibandingkan — harga, kebolehpercayaan, penjimatan elektrik, dan yang mana perlu dibeli.",
    excerptZH: "大金还是松下？马来西亚两个最受欢迎的冷气品牌对比——价格、可靠性、节电效果以及该买哪个。",
    category: "Buying Guide",
    categoryMS: "Panduan Pembelian",
    categoryZH: "购买指南",
    tags: ["Daikin vs Panasonic Malaysia", "best aircond brand Malaysia 2026", "Daikin aircond review Malaysia", "Panasonic aircond review Malaysia"],
    date: "2026-05-15",
    dateDisplay: "May 2026",
    readTime: 7,
    relatedService: "New Unit Installation",
    content: `
      <h2>Daikin vs Panasonic — Malaysia's Top Two Brands</h2>
      <p>Daikin and Panasonic together account for over 50% of aircond sales in Malaysia. Both are excellent, but they have different strengths.</p>
      <h2>Price (1.5 HP Inverter)</h2>
      <ul>
        <li><strong>Daikin:</strong> RM 1,300–1,800</li>
        <li><strong>Panasonic:</strong> RM 1,100–1,600 (10–15% more affordable)</li>
      </ul>
      <h2>Energy Efficiency</h2>
      <p>Both achieve 5-star ENERGY ratings. Panasonic's Econavi sensor can achieve slightly better real-world efficiency in living rooms by adjusting output based on occupancy.</p>
      <h2>Special Features</h2>
      <ul>
        <li><strong>Daikin:</strong> FlashStreamer air purification, R32, 3D airflow</li>
        <li><strong>Panasonic:</strong> Nanoe-X (removes viruses and bacteria), Econavi, AEROWINGS wide airflow</li>
      </ul>
      <h2>Our Recommendation</h2>
      <ul>
        <li><strong>Choose Daikin:</strong> Long-term reliability, commercial use, landlords</li>
        <li><strong>Choose Panasonic:</strong> Air quality priority, living rooms, slightly more affordable</li>
      </ul>
      <p>KL Renovator installs and services both. WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/brands/daikin">Daikin service</a> | <a href="/brands/panasonic">Panasonic service</a></p>
    `,
    contentMS: `
      <h2>Daikin vs Panasonic — Dua Jenama Teratas Malaysia</h2>
      <p>Daikin dan Panasonic bersama-sama menyumbang lebih daripada 50% jualan aircond di Malaysia. Kedua-duanya sangat baik, tetapi mempunyai kekuatan yang berbeza.</p>
      <h2>Harga (1.5 HP Inverter)</h2>
      <ul>
        <li><strong>Daikin:</strong> RM 1,300–1,800</li>
        <li><strong>Panasonic:</strong> RM 1,100–1,600 (10–15% lebih berpatutan)</li>
      </ul>
      <h2>Ciri Istimewa</h2>
      <ul>
        <li><strong>Daikin:</strong> Penyucian udara FlashStreamer, R32, aliran udara 3D</li>
        <li><strong>Panasonic:</strong> Nanoe-X (menghilangkan virus dan bakteria), Econavi</li>
      </ul>
      <h2>Cadangan Kami</h2>
      <ul>
        <li><strong>Pilih Daikin:</strong> Kebolehpercayaan jangka panjang, penggunaan komersial</li>
        <li><strong>Pilih Panasonic:</strong> Keutamaan kualiti udara, lebih berpatutan</li>
      </ul>
      <p>KL Renovator memasang dan menservis kedua-duanya. WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>大金 vs 松下 — 马来西亚两大品牌</h2>
      <p>大金和松下合计占马来西亚冷气销售额的50%以上。两者都很出色，但各有优势。</p>
      <h2>价格（1.5 HP变频）</h2>
      <ul>
        <li><strong>大金：</strong>RM 1,300–1,800</li>
        <li><strong>松下：</strong>RM 1,100–1,600（便宜10-15%）</li>
      </ul>
      <h2>特色功能</h2>
      <ul>
        <li><strong>大金：</strong>FlashStreamer空气净化、R32、3D气流</li>
        <li><strong>松下：</strong>Nanoe-X（去除病毒和细菌）、Econavi传感器</li>
      </ul>
      <h2>我们的推荐</h2>
      <ul>
        <li><strong>选大金：</strong>长期可靠性、商业用途、房东</li>
        <li><strong>选松下：</strong>空气质量优先、客厅、价格稍低</li>
      </ul>
      <p>KL Renovator安装和服务两个品牌。WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "how-to-reduce-aircond-electricity-bill-malaysia",
    title: "How to Reduce Aircond Electricity Bill in Malaysia — 12 Proven Tips",
    titleMS: "Cara Mengurangkan Bil Elektrik Aircond di Malaysia — 12 Petua Terbukti",
    titleZH: "如何降低马来西亚冷气电费 — 12个经验证的技巧",
    excerpt: "These 12 proven tips will reduce your aircond electricity bill in Malaysia without sacrificing comfort — starting from your service schedule.",
    excerptMS: "12 petua terbukti ini akan mengurangkan bil elektrik aircond anda di Malaysia tanpa mengorbankan keselesaan — bermula dari jadual servis anda.",
    excerptZH: "这12个经过验证的技巧将在不牺牲舒适度的情况下降低您在马来西亚的冷气电费——从您的保养计划开始。",
    category: "Energy Saving",
    categoryMS: "Penjimatan Tenaga",
    categoryZH: "节能省电",
    tags: ["reduce aircond electricity bill Malaysia", "aircond energy saving KL", "aircond electricity cost Malaysia", "lower electricity bill aircond"],
    date: "2026-05-20",
    dateDisplay: "May 2026",
    readTime: 6,
    relatedService: "Pressure Chemical Wash",
    content: `
      <h2>Why Your Aircond Bill is High</h2>
      <p>In Malaysia, aircond typically accounts for 50–70% of a household's electricity bill. Most excessive consumption comes from preventable causes — a dirty coil, low gas, wrong temperature setting, or an old inefficient unit.</p>
      <h2>Tip 1 — Set Temperature to 24–26°C, Not 16°C</h2>
      <p>Setting 16°C does not cool the room faster. At 26°C vs 16°C, you use approximately 30% less electricity.</p>
      <h2>Tip 2 — Service Your Aircond Every 3 Months</h2>
      <p>A dirty coil forces the compressor to work 20–40% harder. A RM 99 basic service pays for itself in electricity savings within 2–3 months.</p>
      <h2>Tip 3 — Chemical Wash Every 12 Months</h2>
      <p>An annual chemical wash can reduce electricity consumption by 15–25% on a neglected unit.</p>
      <h2>Tip 4 — Check Your Gas Pressure</h2>
      <p>Low gas makes the compressor run longer. Gas top-up from RM 120 fixes this immediately.</p>
      <h2>Tips 5–12</h2>
      <ul>
        <li>Use sleep mode and timers at night</li>
        <li>Close doors and windows</li>
        <li>Use ceiling fans together with aircond (allows 2–3°C higher setting)</li>
        <li>Turn off when leaving the room</li>
        <li>Clean filters monthly</li>
        <li>Ensure outdoor unit has clear airflow</li>
        <li>Upgrade old non-inverter units to save 40–50%</li>
        <li>Book annual maintenance contract for consistent efficiency</li>
      </ul>
      <p>Chemical wash from RM 120. Gas top-up from RM 120. WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/services/chemical-wash">Chemical wash</a> | <a href="/services/gas-topup">Gas top-up</a></p>
    `,
    contentMS: `
      <h2>Mengapa Bil Aircond Anda Tinggi</h2>
      <p>Di Malaysia, aircond biasanya menyumbang 50–70% daripada bil elektrik isi rumah. Kebanyakan penggunaan berlebihan berasal dari punca yang boleh dicegah — gegelung kotor, gas rendah, tetapan suhu yang salah.</p>
      <h2>Petua 1 — Tetapkan Suhu 24–26°C, Bukan 16°C</h2>
      <p>Menetapkan 16°C tidak menyejukkan bilik lebih cepat. Pada 26°C berbanding 16°C, anda menggunakan lebih kurang 30% kurang elektrik.</p>
      <h2>Petua 2 — Servis Aircond Setiap 3 Bulan</h2>
      <p>Gegelung yang kotor memaksa kompressor bekerja 20–40% lebih keras.</p>
      <h2>Petua 3 — Cuci Kimia Setiap 12 Bulan</h2>
      <p>Cuci kimia tahunan boleh mengurangkan penggunaan elektrik sebanyak 15–25% pada unit yang diabaikan.</p>
      <h2>Lain-lain Petua</h2>
      <ul>
        <li>Gunakan mod tidur dan pemasa</li>
        <li>Tutup pintu dan tingkap</li>
        <li>Gunakan kipas siling bersama aircond</li>
        <li>Bersihkan penapis setiap bulan</li>
        <li>Naik taraf unit bukan inverter lama</li>
      </ul>
      <p>Cuci kimia dari RM 120. Tambah gas dari RM 120. WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>您的冷气电费为何高</h2>
      <p>在马来西亚，冷气通常占家庭电费的50-70%。大多数过度消耗来自可预防的原因——脏盘管、气体不足、错误的温度设置。</p>
      <h2>技巧1 — 将温度设置为24-26°C，而非16°C</h2>
      <p>设置16°C不会让房间冷却得更快。26°C与16°C相比，节省约30%的电费。</p>
      <h2>技巧2 — 每3个月保养一次</h2>
      <p>脏盘管迫使压缩机多工作20-40%。RM 99的基本保养在2-3个月内通过节电收回成本。</p>
      <h2>技巧3 — 每12个月化学清洗</h2>
      <p>年度化学清洗可将被忽视机器的耗电量减少15-25%。</p>
      <h2>其他技巧</h2>
      <ul>
        <li>使用睡眠模式和定时器</li>
        <li>关闭门窗</li>
        <li>与吊扇一起使用（可提高2-3°C设定温度）</li>
        <li>每月清洗过滤网</li>
        <li>升级旧定频机器以节省40-50%</li>
      </ul>
      <p>化学清洗从RM 120起。充气从RM 120起。WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "aircond-installation-guide-malaysia",
    title: "Aircond Installation Guide Malaysia — What to Expect and What to Prepare",
    titleMS: "Panduan Pemasangan Aircond Malaysia — Apa yang Dijangka dan Apa yang Perlu Disediakan",
    titleZH: "马来西亚冷气安装指南 — 预期什么以及如何准备",
    excerpt: "Everything you need to know before installing a new aircond in Malaysia — HP sizing, pipe routing, electrical points, installation costs.",
    excerptMS: "Semua yang perlu anda ketahui sebelum memasang aircond baru di Malaysia — saiz HP, laluan paip, titik elektrik, kos pemasangan.",
    excerptZH: "在马来西亚安装新冷气前需要了解的一切——HP选择、管道走线、电源插座、安装费用。",
    category: "Installation Guide",
    categoryMS: "Panduan Pemasangan",
    categoryZH: "安装指南",
    tags: ["aircond installation guide Malaysia", "new aircond installation KL", "aircond installation cost Malaysia", "how to install aircond Malaysia"],
    date: "2026-04-15",
    dateDisplay: "April 2026",
    readTime: 7,
    relatedService: "New Unit Installation",
    content: `
      <h2>Choosing the Right HP for Your Room</h2>
      <ul>
        <li><strong>1.0 HP:</strong> Up to 100 sq ft</li>
        <li><strong>1.5 HP:</strong> 100–200 sq ft (most common)</li>
        <li><strong>2.0 HP:</strong> 200–300 sq ft</li>
        <li><strong>2.5 HP:</strong> 300–400 sq ft</li>
        <li><strong>3.0 HP:</strong> 400–600 sq ft</li>
      </ul>
      <p>Always round up if near the top of a range. West-facing rooms need higher HP.</p>
      <h2>Electrical Point</h2>
      <p>Every aircond needs a dedicated 15A electrical point. KL Renovator installs one for RM 100 if none exists.</p>
      <h2>What Standard Installation Includes</h2>
      <ul>
        <li>7ft copper pipe (free), heavy duty wiring (free), wall bracket (free), outdoor L-bracket (free), drain routing (free), system vacuum, full test, 1-month warranty</li>
      </ul>
      <h2>Pricing</h2>
      <ul>
        <li>Wall-Mounted 1.0–1.5 HP: <strong>RM 199</strong></li>
        <li>Wall-Mounted 2.0 HP: <strong>RM 249</strong></li>
        <li>Wall-Mounted 2.5 HP: <strong>RM 279</strong></li>
        <li>Wall-Mounted 3.0 HP: <strong>RM 329</strong></li>
        <li>Ceiling Cassette 1.0–1.5 HP: <strong>RM 290</strong></li>
        <li>Ceiling Cassette 2.0–3.0 HP: <strong>RM 350</strong></li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/services/installation">Full installation page</a></p>
    `,
    contentMS: `
      <h2>Memilih HP yang Betul untuk Bilik Anda</h2>
      <ul>
        <li><strong>1.0 HP:</strong> Sehingga 100 kaki persegi</li>
        <li><strong>1.5 HP:</strong> 100–200 kaki persegi (paling biasa)</li>
        <li><strong>2.0 HP:</strong> 200–300 kaki persegi</li>
        <li><strong>2.5 HP:</strong> 300–400 kaki persegi</li>
        <li><strong>3.0 HP:</strong> 400–600 kaki persegi</li>
      </ul>
      <h2>Titik Elektrik</h2>
      <p>Setiap aircond memerlukan titik elektrik 15A yang khusus. KL Renovator memasangnya seharga RM 100 jika tiada.</p>
      <h2>Apa yang Disertakan dalam Pemasangan Standard</h2>
      <ul>
        <li>7 kaki paip tembaga (percuma), pendawaian berat (percuma), sokongan dinding (percuma), sokongan L luar (percuma), laluan longkang (percuma), vakum sistem, ujian penuh, waranti 1 bulan</li>
      </ul>
      <h2>Harga</h2>
      <ul>
        <li>Dinding 1.0–1.5 HP: <strong>RM 199</strong></li>
        <li>Dinding 2.0 HP: <strong>RM 249</strong></li>
        <li>Ceiling Cassette 1.0–1.5 HP: <strong>RM 290</strong></li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>为您的房间选择正确的HP</h2>
      <ul>
        <li><strong>1.0 HP：</strong>100平方英尺以下</li>
        <li><strong>1.5 HP：</strong>100-200平方英尺（最常见）</li>
        <li><strong>2.0 HP：</strong>200-300平方英尺</li>
        <li><strong>2.5 HP：</strong>300-400平方英尺</li>
        <li><strong>3.0 HP：</strong>400-600平方英尺</li>
      </ul>
      <h2>电源插座</h2>
      <p>每台冷气需要专用15A电源插座。如果没有，KL Renovator安装费用RM 100。</p>
      <h2>标准安装包含内容</h2>
      <ul>
        <li>7英尺铜管（免费）、重型电线（免费）、墙壁支架（免费）、室外L形支架（免费）、排水走线（免费）、系统抽真空、完整测试、1个月保修</li>
      </ul>
      <h2>价格</h2>
      <ul>
        <li>挂壁式 1.0–1.5 HP：<strong>RM 199</strong></li>
        <li>挂壁式 2.0 HP：<strong>RM 249</strong></li>
        <li>天花板卡式 1.0–1.5 HP：<strong>RM 290</strong></li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "aircond-lifespan-malaysia",
    title: "How Long Does an Aircond Last in Malaysia? — Lifespan Guide",
    titleMS: "Berapa Lama Aircond Bertahan di Malaysia? — Panduan Jangka Hayat",
    titleZH: "在马来西亚冷气能用多久？— 使用寿命指南",
    excerpt: "How many years should your aircond last in Malaysia? Average lifespan by brand and type, signs your unit is failing, and whether to repair or replace.",
    excerptMS: "Berapa tahun aircond anda patut bertahan di Malaysia? Jangka hayat purata mengikut jenama dan jenis, tanda unit anda rosak, dan sama ada perlu dibaiki atau diganti.",
    excerptZH: "您的冷气在马来西亚应该能用多少年？按品牌和类型的平均寿命、机器故障迹象以及是维修还是更换。",
    category: "Maintenance Guide",
    categoryMS: "Panduan Penyelenggaraan",
    categoryZH: "保养指南",
    tags: ["aircond lifespan Malaysia", "how long does aircond last Malaysia", "when to replace aircond Malaysia", "aircond repair or replace"],
    date: "2026-04-01",
    dateDisplay: "April 2026",
    readTime: 5,
    relatedService: "Troubleshooting & Repairs",
    content: `
      <h2>Average Aircond Lifespan in Malaysia</h2>
      <ul>
        <li><strong>Inverter models (Daikin, Panasonic, Mitsubishi):</strong> 12–15 years</li>
        <li><strong>Non-inverter models:</strong> 8–12 years</li>
        <li><strong>Commercial ceiling cassette:</strong> 10–15 years with proper maintenance</li>
        <li><strong>Budget brands without maintenance:</strong> 5–8 years</li>
      </ul>
      <h2>What Shortens Lifespan</h2>
      <ul>
        <li>No regular maintenance (units fail 3–5 years earlier)</li>
        <li>Low gas left unattended (destroys the compressor over months)</li>
        <li>Incorrect installation (undersized unit at full load continuously)</li>
        <li>Power surges (damage PCB boards)</li>
      </ul>
      <h2>Repair or Replace? — Decision Guide</h2>
      <ul>
        <li><strong>Repair if:</strong> unit is under 8 years, repair cost under 40% of new unit price, single component failure</li>
        <li><strong>Replace if:</strong> compressor needs replacement + unit over 8 years old</li>
        <li><strong>Replace if:</strong> unit uses R22 + over 10 years old</li>
      </ul>
      <p>Diagnostic fee RM 88 (waived with repair). WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/services/repair">Repair service</a> | <a href="/problems/aircond-compressor-problem">Compressor problem guide</a></p>
    `,
    contentMS: `
      <h2>Jangka Hayat Purata Aircond di Malaysia</h2>
      <ul>
        <li><strong>Model inverter (Daikin, Panasonic, Mitsubishi):</strong> 12–15 tahun</li>
        <li><strong>Model bukan inverter:</strong> 8–12 tahun</li>
        <li><strong>Ceiling cassette komersial:</strong> 10–15 tahun dengan penyelenggaraan yang betul</li>
      </ul>
      <h2>Apa yang Memendekkan Jangka Hayat</h2>
      <ul>
        <li>Tiada penyelenggaraan berkala (unit gagal 3–5 tahun lebih awal)</li>
        <li>Gas rendah dibiarkan (merosakkan kompressor dalam beberapa bulan)</li>
        <li>Pemasangan yang salah</li>
      </ul>
      <h2>Baiki atau Ganti? — Panduan Keputusan</h2>
      <ul>
        <li><strong>Baiki jika:</strong> unit di bawah 8 tahun, kos pembaikan kurang dari 40% harga unit baru</li>
        <li><strong>Ganti jika:</strong> kompressor perlu diganti + unit lebih dari 8 tahun</li>
      </ul>
      <p>Yuran diagnostik RM 88 (dikecualikan dengan pembaikan). WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>马来西亚冷气平均使用寿命</h2>
      <ul>
        <li><strong>变频型号（大金、松下、三菱）：</strong>12-15年</li>
        <li><strong>定频型号：</strong>8-12年</li>
        <li><strong>商用天花板卡式：</strong>妥善保养可用10-15年</li>
      </ul>
      <h2>什么缩短使用寿命</h2>
      <ul>
        <li>不定期保养（机器提前3-5年故障）</li>
        <li>气体不足未处理（几个月内损坏压缩机）</li>
        <li>安装不当</li>
      </ul>
      <h2>维修还是更换？— 决策指南</h2>
      <ul>
        <li><strong>维修如果：</strong>机器不到8年，维修费用低于新机器价格的40%</li>
        <li><strong>更换如果：</strong>需要更换压缩机且机器超过8年</li>
      </ul>
      <p>诊断费RM 88（同次维修豁免）。WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "aircond-troubleshooting-guide-malaysia",
    title: "Aircond Troubleshooting Guide Malaysia — Diagnose Your Problem",
    titleMS: "Panduan Penyelesaian Masalah Aircond Malaysia — Diagnos Masalah Anda",
    titleZH: "马来西亚冷气故障排查指南 — 诊断您的问题",
    excerpt: "DIY aircond troubleshooting guide for Malaysia. Find out what is causing your aircond problem and whether you can fix it yourself.",
    excerptMS: "Panduan penyelesaian masalah aircond DIY untuk Malaysia. Ketahui apa yang menyebabkan masalah aircond anda dan sama ada anda boleh memperbaikinya sendiri.",
    excerptZH: "马来西亚DIY冷气故障排查指南。找出冷气问题的原因以及您是否能自行解决。",
    category: "Troubleshooting",
    categoryMS: "Penyelesaian Masalah",
    categoryZH: "故障排查",
    tags: ["aircond troubleshooting Malaysia", "aircond problem diagnosis KL", "aircond not working Malaysia", "aircond DIY fix Malaysia"],
    date: "2026-03-15",
    dateDisplay: "March 2026",
    readTime: 8,
    relatedService: "Troubleshooting & Repairs",
    content: `
      <h2>How to Diagnose Your Aircond Problem</h2>
      <p>Most aircond problems fall into a few predictable categories. Use this guide to identify what is wrong before calling a technician.</p>
      <h2>Problem: Aircond Not Cold</h2>
      <ul>
        <li>Check if set temperature is lower than room temperature</li>
        <li>Is the air filter blocked? Remove, rinse, refit</li>
        <li>Is the outdoor fan running?</li>
        <li>Is there ice on the indoor coil?</li>
      </ul>
      <p><strong>Professional fix:</strong> Low gas (RM 120+), dirty coil (RM 120+), faulty capacitor (RM 180)</p>
      <h2>Problem: Aircond Leaking Water</h2>
      <ul>
        <li>Check if the indoor unit is mounted level</li>
        <li>Look at the drain pipe outlet — is it blocked?</li>
      </ul>
      <p><strong>Professional fix:</strong> Drain pipe clearing (RM 120), chemical wash (RM 120)</p>
      <h2>Problem: Aircond Making Noise</h2>
      <ul>
        <li>Rattling from indoor: loose front panel or debris in blower wheel</li>
        <li>Grinding/metal-on-metal: fan motor bearing failing</li>
        <li>Hissing: possible refrigerant leak — switch off immediately</li>
      </ul>
      <h2>Problem: Blinking Light</h2>
      <p>Count the blinks and check your model's manual. Or WhatsApp a video to +60 18-298 3573 for instant diagnosis.</p>
      <h2>What You Can Fix Yourself</h2>
      <ul>
        <li>Clean the air filter monthly</li>
        <li>Clear debris from around the outdoor unit</li>
        <li>Replace remote control batteries</li>
        <li>Reset the MCB once (if it trips again, call a technician)</li>
      </ul>
      <p>Diagnostic fee RM 88 (waived with repair). WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/problems">All problem guides</a></p>
    `,
    contentMS: `
      <h2>Cara Mendiagnosis Masalah Aircond Anda</h2>
      <p>Kebanyakan masalah aircond termasuk dalam beberapa kategori yang boleh dijangka. Gunakan panduan ini untuk mengenal pasti apa yang salah sebelum memanggil juruteknik.</p>
      <h2>Masalah: Aircond Tidak Sejuk</h2>
      <ul>
        <li>Semak sama ada suhu yang ditetapkan lebih rendah daripada suhu bilik</li>
        <li>Adakah penapis udara tersumbat? Keluarkan, bilas, pasang semula</li>
        <li>Adakah kipas luar berjalan?</li>
      </ul>
      <p><strong>Pembaikan profesional:</strong> Gas rendah (RM 120+), gegelung kotor (RM 120+), kapasitor rosak (RM 180)</p>
      <h2>Masalah: Aircond Bocor Air</h2>
      <ul>
        <li>Semak sama ada unit dalam dipasang dengan rata</li>
        <li>Lihat salur longkang — adakah ia tersumbat?</li>
      </ul>
      <h2>Apa yang Boleh Anda Baiki Sendiri</h2>
      <ul>
        <li>Bersihkan penapis udara setiap bulan</li>
        <li>Ganti bateri kawalan jauh</li>
        <li>Reset MCB sekali (jika jatuh lagi, hubungi juruteknik)</li>
      </ul>
      <p>Yuran diagnostik RM 88 (dikecualikan dengan pembaikan). WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>如何诊断您的冷气问题</h2>
      <p>大多数冷气问题属于几个可预测的类别。在联系技术人员之前，使用本指南识别问题所在。</p>
      <h2>问题：冷气不冷</h2>
      <ul>
        <li>检查设定温度是否低于室温</li>
        <li>过滤网是否堵塞？取出、冲洗、重新安装</li>
        <li>室外机风扇是否在转？</li>
      </ul>
      <p><strong>专业修复：</strong>气体不足（RM 120+）、盘管脏（RM 120+）、电容器故障（RM 180）</p>
      <h2>问题：冷气漏水</h2>
      <ul>
        <li>检查室内机是否水平安装</li>
        <li>查看排水管出口——是否堵塞？</li>
      </ul>
      <h2>您可以自行解决的问题</h2>
      <ul>
        <li>每月清洗过滤网</li>
        <li>更换遥控器电池</li>
        <li>重置MCB一次（如果再次跳闸，请联系技术人员）</li>
      </ul>
      <p>诊断费RM 88（同次维修豁免）。WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "commercial-hvac-maintenance-kl",
    title: "Commercial HVAC Maintenance KL & Selangor — Office & Retail Guide",
    titleMS: "Penyelenggaraan HVAC Komersial KL & Selangor — Panduan Pejabat & Runcit",
    titleZH: "吉隆坡及雪兰莪商业HVAC维护 — 办公室与零售指南",
    excerpt: "Complete guide to commercial HVAC maintenance for offices, shops, restaurants and buildings in KL and Selangor. Service schedules, contracts, ceiling cassette pricing.",
    excerptMS: "Panduan lengkap penyelenggaraan HVAC komersial untuk pejabat, kedai, restoran dan bangunan di KL dan Selangor. Jadual servis, kontrak, harga ceiling cassette.",
    excerptZH: "吉隆坡和雪兰莪办公室、商店、餐厅和建筑商业HVAC维护完整指南。服务计划、合同、天花板卡式机价格。",
    category: "Commercial",
    categoryMS: "Komersial",
    categoryZH: "商业服务",
    tags: ["commercial HVAC maintenance KL", "office aircond service Selangor", "ceiling cassette service KL", "commercial aircond contract Malaysia"],
    date: "2026-03-01",
    dateDisplay: "March 2026",
    readTime: 6,
    relatedService: "Ceiling Cassette Solutions",
    content: `
      <h2>Why Commercial HVAC Maintenance is Different</h2>
      <p>Commercial aircond systems run longer hours, serve more people, and are more complex. A breakdown during business hours means lost productivity and unhappy customers.</p>
      <h2>Recommended Maintenance Schedule</h2>
      <ul>
        <li><strong>Monthly:</strong> Visual inspection, filter check, drain pan check</li>
        <li><strong>Every 2–3 months:</strong> Professional basic service</li>
        <li><strong>Every 6 months:</strong> Chemical wash of coil and blower</li>
        <li><strong>Annually:</strong> Full chemical overhaul, refrigerant check, electrical inspection</li>
      </ul>
      <h2>Ceiling Cassette Service Pricing</h2>
      <ul>
        <li>Basic Service 1.0–1.5 HP: <strong>RM 150</strong></li>
        <li>Chemical Wash 1.0–1.5 HP: <strong>RM 220</strong></li>
        <li>Chemical Wash 2.0–3.0 HP: <strong>RM 280</strong></li>
        <li>Chemical Overhaul 1.0–3.0 HP: <strong>RM 380–480</strong></li>
      </ul>
      <h2>Annual Maintenance Contracts</h2>
      <ul>
        <li>5–10 units / year: <strong>RM 1,999</strong></li>
        <li>10+ units / year: <strong>RM 3,499</strong></li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong> for a commercial quote. See: <a href="/services/ceiling-cassette">Ceiling cassette service</a></p>
    `,
    contentMS: `
      <h2>Mengapa Penyelenggaraan HVAC Komersial Berbeza</h2>
      <p>Sistem aircond komersial beroperasi lebih lama, melayani lebih ramai orang, dan lebih kompleks. Kerosakan semasa waktu perniagaan bermakna produktiviti hilang dan pelanggan tidak berpuas hati.</p>
      <h2>Jadual Penyelenggaraan yang Disyorkan</h2>
      <ul>
        <li><strong>Bulanan:</strong> Pemeriksaan visual, semak penapis, semak dulang longkang</li>
        <li><strong>Setiap 2–3 bulan:</strong> Servis asas profesional</li>
        <li><strong>Setiap 6 bulan:</strong> Cuci kimia gegelung dan blower</li>
        <li><strong>Tahunan:</strong> Overhaul kimia penuh, semak penyejuk, pemeriksaan elektrik</li>
      </ul>
      <h2>Harga Servis Ceiling Cassette</h2>
      <ul>
        <li>Servis Asas 1.0–1.5 HP: <strong>RM 150</strong></li>
        <li>Cuci Kimia 1.0–1.5 HP: <strong>RM 220</strong></li>
        <li>Overhaul Kimia 1.0–3.0 HP: <strong>RM 380–480</strong></li>
      </ul>
      <h2>Kontrak Penyelenggaraan Tahunan</h2>
      <ul>
        <li>5–10 unit / tahun: <strong>RM 1,999</strong></li>
        <li>10+ unit / tahun: <strong>RM 3,499</strong></li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong> untuk sebutan komersial.</p>
    `,
    contentZH: `
      <h2>为什么商业HVAC维护不同</h2>
      <p>商业冷气系统运行时间更长，服务人数更多，更复杂。营业时间故障意味着生产效率损失和客户不满。</p>
      <h2>推荐维护计划</h2>
      <ul>
        <li><strong>每月：</strong>目视检查、过滤网检查、排水盘检查</li>
        <li><strong>每2-3个月：</strong>专业基本保养</li>
        <li><strong>每6个月：</strong>盘管和鼓风机化学清洗</li>
        <li><strong>每年：</strong>完整化学大修、制冷剂检查、电气检查</li>
      </ul>
      <h2>天花板卡式机服务价格</h2>
      <ul>
        <li>基本保养 1.0–1.5 HP：<strong>RM 150</strong></li>
        <li>化学清洗 1.0–1.5 HP：<strong>RM 220</strong></li>
        <li>化学大修 1.0–3.0 HP：<strong>RM 380–480</strong></li>
      </ul>
      <h2>年度维护合同</h2>
      <ul>
        <li>5-10台 / 年：<strong>RM 1,999</strong></li>
        <li>10台以上 / 年：<strong>RM 3,499</strong></li>
      </ul>
      <p>请WhatsApp <strong>+60 18-298 3573</strong> 获取商业报价。</p>
    `,
  },
  {
    slug: "aircond-gas-topup-myths-malaysia",
    title: "Aircond Gas Top-Up Myths in Malaysia — What's True, What's Not",
    titleMS: "Mitos Top-Up Gas Aircond di Malaysia — Apa yang Benar, Apa yang Tidak",
    titleZH: "马来西亚冷气充气误区 — 什么是真的，什么是假的",
    excerpt: "Many Malaysian homeowners have been misled about aircond gas top-ups. This guide busts the most common myths.",
    excerptMS: "Ramai pemilik rumah Malaysia telah disesatkan tentang tambah gas aircond. Panduan ini membongkar mitos yang paling biasa.",
    excerptZH: "许多马来西亚房主对冷气充气存在误解。本指南揭穿最常见的误区。",
    category: "Gas Top-Up",
    categoryMS: "Top-Up Gas",
    categoryZH: "充气服务",
    tags: ["aircond gas topup myths Malaysia", "aircon gas top up facts KL", "R32 R410A R22 Malaysia", "aircond refrigerant Malaysia"],
    date: "2026-02-01",
    dateDisplay: "February 2026",
    readTime: 5,
    relatedService: "Gas Top-Up / Precision Balancing",
    content: `
      <h2>Myth 1 — "Gas needs to be topped up every year"</h2>
      <p><strong>False.</strong> A properly installed aircond with no leaks does not lose gas. If your unit needs top-up every year, there is a leak that must be found and repaired first.</p>
      <h2>Myth 2 — "Any amount of gas is fine"</h2>
      <p><strong>False.</strong> Both too little AND too much refrigerant damage the compressor. Professional technicians use a manifold gauge for exact pressure measurement.</p>
      <h2>Myth 3 — "R22 can be replaced with R410A"</h2>
      <p><strong>False.</strong> R22 and R410A are incompatible. Never mix refrigerant types. Continue using R22 until the unit needs replacement.</p>
      <h2>Myth 4 — "More gas = colder air"</h2>
      <p><strong>False.</strong> If gas is already at correct pressure, adding more harms the compressor. Always measure first.</p>
      <h2>Myth 5 — "R32 costs much more"</h2>
      <p>R32 top-up is slightly higher in cost but uses less volume, so the total difference is smaller than it appears.</p>
      <h2>What a Proper Gas Top-Up Includes</h2>
      <ul>
        <li>Leak check before adding gas</li>
        <li>Current pressure measurement</li>
        <li>Correct amount added</li>
        <li>Final pressure verification</li>
        <li>Cooling performance test</li>
      </ul>
      <p>R22 from RM 120, R410A from RM 150, R32 from RM 180. Leak check included. WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/services/gas-topup">Gas top-up service</a> | <a href="/problems/aircond-low-gas">Low gas symptoms</a></p>
    `,
    contentMS: `
      <h2>Mitos 1 — "Gas perlu ditambah setiap tahun"</h2>
      <p><strong>Salah.</strong> Aircond yang dipasang dengan betul tanpa kebocoran tidak kehilangan gas. Jika unit anda memerlukan tambah gas setiap tahun, ada kebocoran yang perlu dicari dan dibaiki dahulu.</p>
      <h2>Mitos 2 — "Mana-mana amaun gas adalah baik"</h2>
      <p><strong>Salah.</strong> Terlalu sedikit DAN terlalu banyak penyejuk merosakkan kompressor. Juruteknik profesional menggunakan tolok manifold untuk pengukuran tekanan yang tepat.</p>
      <h2>Mitos 3 — "R22 boleh digantikan dengan R410A"</h2>
      <p><strong>Salah.</strong> R22 dan R410A tidak serasi. Jangan sekali-kali mencampurkan jenis penyejuk.</p>
      <h2>Apa yang Disertakan dalam Top-Up Gas yang Betul</h2>
      <ul>
        <li>Semak kebocoran sebelum menambah gas</li>
        <li>Pengukuran tekanan semasa</li>
        <li>Amaun yang betul ditambah</li>
        <li>Pengesahan tekanan akhir</li>
      </ul>
      <p>R22 dari RM 120, R410A dari RM 150, R32 dari RM 180. WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>误区1 — "气体需要每年充一次"</h2>
      <p><strong>错误。</strong>安装正确且无泄漏的冷气不会损失气体。如果您的机器每年都需要充气，说明有泄漏需要先找到并修复。</p>
      <h2>误区2 — "任何量的气体都可以"</h2>
      <p><strong>错误。</strong>制冷剂太少和太多都会损坏压缩机。专业技术人员使用压力表进行精确测量。</p>
      <h2>误区3 — "R22可以换成R410A"</h2>
      <p><strong>错误。</strong>R22和R410A不兼容。切勿混合制冷剂类型。</p>
      <h2>正确充气包含的内容</h2>
      <ul>
        <li>充气前泄漏检查</li>
        <li>当前压力测量</li>
        <li>添加正确量</li>
        <li>最终压力验证</li>
      </ul>
      <p>R22从RM 120起，R410A从RM 150起，R32从RM 180起。含泄漏检查。WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
  {
    slug: "aircond-buying-guide-malaysia-2026",
    title: "Aircond Buying Guide Malaysia 2026 — Everything Before You Buy",
    titleMS: "Panduan Beli Aircond Malaysia 2026 — Semua yang Perlu Anda Tahu Sebelum Membeli",
    titleZH: "马来西亚2026年冷气购买完整指南 — 购买前需了解的一切",
    excerpt: "Complete aircond buying guide for Malaysia 2026. HP sizing, inverter vs non-inverter, best brands, gas types, energy ratings, installation costs.",
    excerptMS: "Panduan membeli aircond yang lengkap untuk Malaysia 2026. Saiz HP, inverter vs bukan inverter, jenama terbaik, jenis gas, penarafan tenaga, kos pemasangan.",
    excerptZH: "2026年马来西亚完整冷气购买指南。HP选择、变频vs定频、最佳品牌、气体类型、能效评级、安装费用。",
    category: "Buying Guide",
    categoryMS: "Panduan Pembelian",
    categoryZH: "购买指南",
    tags: ["aircond buying guide Malaysia 2026", "best aircond Malaysia 2026", "how to choose aircond Malaysia", "aircond HP guide Malaysia"],
    date: "2026-01-01",
    dateDisplay: "January 2026",
    readTime: 8,
    relatedService: "New Unit Installation",
    content: `
      <h2>Step 1 — Choose the Right HP</h2>
      <ul>
        <li>1.0 HP: Up to 100 sq ft</li>
        <li>1.5 HP: 100–200 sq ft</li>
        <li>2.0 HP: 200–300 sq ft</li>
        <li>2.5 HP: 300–400 sq ft</li>
        <li>3.0 HP: 400–600 sq ft</li>
      </ul>
      <p>Always round up if near the top of a range. West-facing rooms with large windows need the next HP up.</p>
      <h2>Step 2 — Always Choose Inverter for Daily Use</h2>
      <p>Saves 30–50% electricity. Higher purchase price recovered in 2–4 years through electricity savings.</p>
      <h2>Step 3 — Choose R32 Gas</h2>
      <p>For new purchases, always choose R32. Do not buy remaining R410A stock unless significantly discounted.</p>
      <h2>Step 4 — Best Brands</h2>
      <ul>
        <li><strong>Daikin</strong> — most reliable, best long-term value</li>
        <li><strong>Panasonic</strong> — Nanoe-X air purification, Econavi, slightly affordable</li>
        <li><strong>Mitsubishi Electric</strong> — premium quality, very quiet</li>
        <li><strong>LG Dual Inverter</strong> — good value, twin rotary compressor</li>
        <li><strong>Midea</strong> — budget-friendly inverter option</li>
      </ul>
      <h2>Step 5 — Budget for Installation + Maintenance</h2>
      <ul>
        <li>Installation: RM 199–449 (by HP)</li>
        <li>Annual maintenance: approx. RM 400–450 per unit</li>
      </ul>
      <p>KL Renovator installs all brands. WhatsApp <strong>+60 18-298 3573</strong>. See: <a href="/services/installation">Installation service</a> | <a href="/brands">All brands we service</a></p>
    `,
    contentMS: `
      <h2>Langkah 1 — Pilih HP yang Betul</h2>
      <ul>
        <li>1.0 HP: Sehingga 100 kaki persegi</li>
        <li>1.5 HP: 100–200 kaki persegi</li>
        <li>2.0 HP: 200–300 kaki persegi</li>
        <li>2.5 HP: 300–400 kaki persegi</li>
      </ul>
      <h2>Langkah 2 — Pilih Inverter untuk Kegunaan Harian</h2>
      <p>Jimat 30–50% elektrik. Harga pembelian yang lebih tinggi dikembalikan dalam 2–4 tahun melalui penjimatan elektrik.</p>
      <h2>Langkah 3 — Pilih Gas R32</h2>
      <p>Untuk pembelian baru, sentiasa pilih R32.</p>
      <h2>Langkah 4 — Jenama Terbaik</h2>
      <ul>
        <li><strong>Daikin</strong> — paling dipercayai</li>
        <li><strong>Panasonic</strong> — Nanoe-X, Econavi</li>
        <li><strong>Mitsubishi Electric</strong> — premium, sangat senyap</li>
      </ul>
      <h2>Langkah 5 — Anggaran Pemasangan + Penyelenggaraan</h2>
      <ul>
        <li>Pemasangan: RM 199–449</li>
        <li>Penyelenggaraan tahunan: lebih kurang RM 400–450 seunit</li>
      </ul>
      <p>WhatsApp <strong>+60 18-298 3573</strong>.</p>
    `,
    contentZH: `
      <h2>第一步 — 选择正确的HP</h2>
      <ul>
        <li>1.0 HP：100平方英尺以下</li>
        <li>1.5 HP：100-200平方英尺</li>
        <li>2.0 HP：200-300平方英尺</li>
        <li>2.5 HP：300-400平方英尺</li>
      </ul>
      <h2>第二步 — 日常使用始终选择变频</h2>
      <p>节省30-50%电费。较高购买价格在2-4年内通过电费节省收回。</p>
      <h2>第三步 — 选择R32气体</h2>
      <p>新购机器始终选择R32。</p>
      <h2>第四步 — 最佳品牌</h2>
      <ul>
        <li><strong>大金</strong> — 最可靠</li>
        <li><strong>松下</strong> — Nanoe-X净化、Econavi</li>
        <li><strong>三菱电机</strong> — 高品质、非常静音</li>
      </ul>
      <h2>第五步 — 安装+维护预算</h2>
      <ul>
        <li>安装：RM 199-449</li>
        <li>年度维护：约每台RM 400-450</li>
      </ul>
      <p>请WhatsApp <strong>+60 18-298 3573</strong>。</p>
    `,
  },
];
