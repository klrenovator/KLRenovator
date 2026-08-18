/**
 * New multilingual SEO blogs — Batch 3
 * Blog 3 of 14: Aircond Error Codes & Blinking Lights Guide Malaysia
 *
 * Distinct from the broad symptom-led article
 * `aircond-troubleshooting-guide-malaysia`. This post targets the focused
 * "aircond error code / blinking timer light / lampu aircond berkelip /
 * 冷气闪灯" intent without pretending that codes are universal across brands
 * or models. It teaches readers how to capture a model-specific signal, reset
 * safely once, and separate a warning from an electrical emergency.
 *
 * Image notes and prompts (existing real job photo used as featured image):
 * - Featured: /hero/acson-aircond-pcb-board-repair-klang-71.webp
 *   (real KL Renovator job photo: exposed indoor control section during PCB
 *   diagnosis in Klang; no invented portrait, badge, code or customer claim)
 * - Supporting prompt 1: documentary macro photo of an indoor unit's real
 *   timer/operation LEDs blinking, neutral home background, no fabricated code.
 * - Supporting prompt 2: homeowner recording the complete blink-and-pause
 *   cycle on a phone beside the model label, hands only, privacy-safe framing.
 * - Supporting prompt 3: HVAC technician checking PCB voltage, sensor harness
 *   and wiring continuity with a multimeter, real tools, no invented licence.
 * - Supporting prompt 4: clean trilingual decision-flow infographic: record
 *   pattern → identify model → one safe reset → stop or arrange diagnosis.
 */

import type { BlogPost } from "./blog-posts";

export const newBlogBatch3: BlogPost[] = [
  {
    slug: "aircond-error-codes-blinking-lights-guide-malaysia",
    title: "Aircond Error Codes & Blinking Lights Guide Malaysia",
    titleMS: "Panduan Kod Ralat & Lampu Aircond Berkelip Malaysia",
    titleZH: "马来西亚冷气错误代码与闪灯故障指南",
    excerpt:
      "Aircond light blinking in Malaysia? Learn how to record the pattern, read model-specific error codes, reset safely and know when to call a technician.",
    excerptMS:
      "Lampu aircond berkelip? Ketahui cara catat corak, semak kod khusus model, reset dengan selamat dan bila perlu panggil juruteknik.",
    excerptZH:
      "冷气指示灯不停闪？学习记录闪灯规律、核对机型专用错误代码、安全重启，并判断何时需要吉隆坡与雪兰莪技师诊断。",
    category: "Troubleshooting",
    categoryMS: "Penyelesaian Masalah",
    categoryZH: "故障排查",
    tags: [
      "aircond error codes Malaysia",
      "aircond blinking light",
      "blinking timer light aircond",
      "lampu aircond berkelip",
      "aircond fault code Malaysia",
      "aircond PCB diagnosis KL",
    ],
    date: "2026-08-18",
    dateDisplay: "August 2026",
    lastReviewed: "2026-08-18",
    readTime: 12,
    relatedService: "Troubleshooting & Repairs",
    image: "/hero/acson-aircond-pcb-board-repair-klang-71.webp",
    imageAlt:
      "KL Renovator technician inspecting an exposed indoor aircond control board during PCB diagnosis in Klang",
    faqs: [
      {
        q: "Why is my aircond timer light blinking?",
        a: "A repeating timer or operation light usually means the control system has stored a warning or fault. Record the complete pattern and identify the exact brand and model before interpreting it, because meanings are model-specific.",
      },
      {
        q: "Do all aircond brands use the same error codes?",
        a: "No. The same letters, numbers or blink count can mean different things across brands and even model series. Use the manual or code chart for the exact model printed on the unit label.",
      },
      {
        q: "Can I reset a blinking aircond myself?",
        a: "You can switch the unit off, isolate its power for five minutes, then restore power once. If the warning returns, stop resetting and arrange diagnosis. Never reset repeatedly when the MCB trips, there is a burning smell, smoke or water near wiring.",
      },
      {
        q: "Does a blinking light always mean the PCB is faulty?",
        a: "No. A control board can report faults caused by a sensor, wiring connection, fan, capacitor, drainage protection or another component. Testing is needed before a PCB is replaced.",
      },
      {
        q: "What should I send on WhatsApp for a faster diagnosis?",
        a: "Send one video showing the full blink-and-pause cycle, a clear photo of the model label, the brand, what the unit was doing when it stopped, your area and whether the MCB tripped.",
      },
      {
        q: "Is it safe to keep using an aircond with a blinking light?",
        a: "Do not keep forcing it to run if cooling has stopped, the outdoor fan is not moving, the MCB trips, the unit smells burnt, makes grinding noises or leaks near electrical parts. Switch it off and arrange a check.",
      },
      {
        q: "Why did the error return after a reset?",
        a: "A reset can clear a temporary control state, but it cannot repair a failed sensor, loose harness, blocked drain, fan fault, refrigerant issue or damaged board. A returning code means the underlying condition is still present.",
      },
      {
        q: "How much is aircond error-code diagnosis with KL Renovator?",
        a: "KL Renovator's published diagnostic fee is RM 88 and is waived when the repair is completed on the same visit. Any part or additional work is quoted for approval before replacement.",
      },
      {
        q: "Can KL Renovator diagnose my aircond brand?",
        a: "KL Renovator services 20 listed brands, including Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL and Isonic.",
      },
      {
        q: "Can I book same-day error-code diagnosis in KL or Selangor?",
        a: "Same-day slots are often available depending on technician routing and parts needs. WhatsApp +60 18-298 3573 with the video, model label and your location for the fastest confirmation.",
      },
    ],
    faqsMS: [
      {
        q: "Kenapa lampu timer aircond saya berkelip?",
        a: "Lampu timer atau operasi yang berulang biasanya bermaksud sistem kawalan menyimpan amaran atau kerosakan. Rakam corak penuh dan kenal pasti jenama serta model tepat kerana maksudnya khusus mengikut model.",
      },
      {
        q: "Adakah semua jenama aircond menggunakan kod ralat yang sama?",
        a: "Tidak. Huruf, nombor atau bilangan kelip yang sama boleh membawa maksud berbeza antara jenama dan siri model. Gunakan manual atau carta kod untuk model tepat pada label unit.",
      },
      {
        q: "Boleh saya reset aircond berkelip sendiri?",
        a: "Anda boleh matikan unit, asingkan kuasa selama lima minit, kemudian pulihkan kuasa sekali. Jika amaran kembali, hentikan reset dan atur diagnosis. Jangan reset berulang jika MCB trip, ada bau terbakar, asap atau air berhampiran wayar.",
      },
      {
        q: "Adakah lampu berkelip sentiasa bermakna PCB rosak?",
        a: "Tidak. Papan kawalan boleh melaporkan kerosakan sensor, sambungan wayar, kipas, kapasitor, perlindungan saliran atau komponen lain. Ujian perlu dibuat sebelum PCB diganti.",
      },
      {
        q: "Apa yang patut saya hantar melalui WhatsApp untuk diagnosis lebih pantas?",
        a: "Hantar satu video kitaran kelip-dan-jeda penuh, gambar jelas label model, jenama, apa yang unit lakukan sebelum berhenti, kawasan anda dan sama ada MCB trip.",
      },
      {
        q: "Selamatkah terus guna aircond yang lampunya berkelip?",
        a: "Jangan paksa unit berjalan jika penyejukan berhenti, kipas luar tidak bergerak, MCB trip, unit berbau terbakar, berbunyi kasar atau bocor dekat bahagian elektrik. Matikan dan atur pemeriksaan.",
      },
      {
        q: "Kenapa ralat kembali selepas reset?",
        a: "Reset boleh membersihkan keadaan kawalan sementara tetapi tidak membaiki sensor, harness longgar, longkang tersumbat, kipas, gas atau papan rosak. Kod yang kembali bermaksud punca masih wujud.",
      },
      {
        q: "Berapa caj diagnosis kod ralat KL Renovator?",
        a: "Fi diagnosis rasmi KL Renovator ialah RM 88 dan dikecualikan apabila pembaikan disiapkan dalam lawatan sama. Sebarang alat ganti atau kerja tambahan disebut untuk kelulusan sebelum diganti.",
      },
      {
        q: "Boleh KL Renovator diagnosis jenama aircond saya?",
        a: "KL Renovator menservis 20 jenama tersenarai termasuk Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL dan Isonic.",
      },
      {
        q: "Boleh tempah diagnosis hari sama di KL atau Selangor?",
        a: "Slot hari sama kerap tersedia mengikut laluan juruteknik dan keperluan alat ganti. WhatsApp +60 18-298 3573 dengan video, label model dan lokasi untuk pengesahan terpantas.",
      },
    ],
    faqsZH: [
      {
        q: "为什么冷气 timer 灯一直闪？",
        a: "重复闪烁的 timer 或 operation 灯通常表示控制系统已记录警告或故障。先拍下完整规律，并确认准确品牌与型号；代码含义因机型而异。",
      },
      {
        q: "所有冷气品牌都使用相同的错误代码吗？",
        a: "不相同。同一组字母、数字或闪灯次数，在不同品牌甚至不同系列可能含义不同。应使用机身标签所示准确型号的说明书或代码表。",
      },
      {
        q: "我可以自己重启闪灯的冷气吗？",
        a: "可以关机并隔离电源五分钟，再恢复一次。警告重现就停止反复重启并安排诊断。若 MCB 跳闸、出现焦味、冒烟或电线附近有水，不要重启。",
      },
      {
        q: "闪灯是否一定代表 PCB 主板坏了？",
        a: "不一定。控制板也会报告传感器、接线、风扇、电容、排水保护或其他部件的故障。更换 PCB 前必须先测试。",
      },
      {
        q: "WhatsApp 应发送什么资料以加快判断？",
        a: "请发送完整闪灯与暂停循环的视频、清楚的型号标签照片、品牌、停机前的现象、所在地区，以及 MCB 是否跳闸。",
      },
      {
        q: "冷气闪灯时继续使用安全吗？",
        a: "若已经不制冷、室外风扇不转、MCB 跳闸、有焦味、摩擦异响，或电气部件附近漏水，请勿强行运行；应关机并安排检查。",
      },
      {
        q: "为什么重启后错误又回来？",
        a: "重启只能清除暂时控制状态，无法修复损坏的传感器、松动线束、堵塞排水、风扇、冷媒问题或主板。代码重现表示根因仍存在。",
      },
      {
        q: "KL Renovator 的错误代码诊断费是多少？",
        a: "KL Renovator 公布的诊断费为 RM 88；同次完成维修可豁免。任何零件或额外工作都会在更换前报价并取得同意。",
      },
      {
        q: "KL Renovator 能诊断我的冷气品牌吗？",
        a: "KL Renovator 服务 20 个已列品牌，包括 Daikin、Panasonic、Mitsubishi、Acson、York、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL 与 Isonic。",
      },
      {
        q: "吉隆坡或雪兰莪可预约当天诊断吗？",
        a: "当天时段通常视技师路线与零件需求而定。把视频、型号标签和位置发到 WhatsApp +60 18-298 3573，可最快确认。",
      },
    ],
    content: `
      <p>A blinking timer or operation light is not random decoration. It is the aircond control system telling you that it has recorded a condition it cannot ignore. The useful part is the pattern; the dangerous part is guessing what it means from a code posted for a different brand or model.</p>
      <div class="summary-block"><strong>Quick answer:</strong> Record one complete blink-and-pause cycle before switching anything off, photograph the exact model label, and check the manual for that model. You may isolate power for five minutes and restart once. If the same warning returns — or the MCB trips, there is a burning smell, smoke, heavy leaking or a stopped outdoor fan — leave the unit off and arrange a professional diagnosis. Aircond codes are model-specific, not universal.</div>

      <h2>What does a blinking aircond light mean?</h2>
      <p>Modern split units monitor temperatures, fan operation, communication between the indoor and outdoor sections, drainage protection and the control electronics. When a monitored value or response falls outside the machine's expected range, the controller may stop cooling and show a letter-number code, a repeating LED sequence, or several lights in combination.</p>
      <p>The signal is a <strong>starting point for diagnosis</strong>, not proof that a particular part must be replaced. A control board can report a sensor or wiring fault while the board itself is healthy. Likewise, an inverter communication warning can be caused by power, a loose harness or either side of the system. This is why KL Renovator tests the circuit before quoting a PCB.</p>

      <h2>The safe six-step decoder</h2>
      <h3>1. Record the pattern before resetting</h3>
      <p>Use your phone to film at least one full sequence: when the light starts, how many times it flashes, the pause, and when it repeats. If there are operation, timer, filter or power LEDs, keep all of them in frame. A ten-second clip that cuts off before the pause can hide the actual sequence.</p>

      <h3>2. Write down the visible details</h3>
      <p>Note which light is blinking, its colour, the number of blinks before the pause, whether it is fast or slow, and any letters or numbers on the display. Do not simplify a code: “E” and “E6”, for example, are not interchangeable descriptions, and their meanings still depend on the model.</p>

      <h3>3. Identify the exact brand and model</h3>
      <p>Photograph the model label on the indoor unit or the rating plate. A brand name alone is not enough because code tables can change between wall-mounted, ceiling cassette, inverter and non-inverter ranges. Do not use a decoder for a different series just because the casing looks similar.</p>

      <h3>4. Check the model manual, not a universal list</h3>
      <p>Use the manual supplied with the unit or the manufacturer's code chart for that exact model. Every brand has its own logic, and some ranges use the same display code differently. KL Renovator is an independent HVAC service company, not an authorised dealer for any brand; we cross-reference the model information and then verify the indicated circuit on site.</p>

      <h3>5. Try one controlled reset only</h3>
      <p>Switch the unit off with the remote. Isolate its power at the wall isolator or the correct MCB for five minutes, then restore power and start it once. This may clear a temporary control state after an interrupted supply. It will not repair a failed sensor, loose connector, blocked drain, fan fault or damaged PCB.</p>

      <h3>6. Watch what happens next</h3>
      <p>If the unit runs normally and the warning does not return, keep the video and monitor it. If the same signal returns immediately or after a few minutes, note exactly when: on start-up, when the outdoor unit should begin, after cooling starts, or when condensate builds. That timing narrows the search.</p>

      <h2>What to capture for a useful remote assessment</h2>
      <table>
        <thead><tr><th>Capture</th><th>Good evidence</th><th>Why it matters</th></tr></thead>
        <tbody>
          <tr><td>Blink pattern</td><td>Full flash → pause → repeat cycle</td><td>Shows the actual sequence rather than a guessed count</td></tr>
          <tr><td>Model identity</td><td>Sharp photo of indoor or outdoor rating label</td><td>Links the signal to the correct manufacturer chart</td></tr>
          <tr><td>Operating symptom</td><td>Indoor fan, outdoor fan, cooling, noise and leaking status</td><td>Separates a stored code from the active fault</td></tr>
          <tr><td>Power behaviour</td><td>Whether the MCB stays on or trips</td><td>Identifies an electrical safety priority</td></tr>
          <tr><td>Timeline</td><td>When it started and whether it follows a power interruption or service</td><td>Helps reproduce the condition</td></tr>
          <tr><td>Location</td><td>Your KL or Selangor area and unit access type</td><td>Helps route a technician and plan access</td></tr>
        </tbody>
      </table>
      <p>Send these details to WhatsApp <strong>+60 18-298 3573</strong>. A video can narrow the likely fault family, but any parts decision still follows physical testing.</p>

      <h2>Error-signal types without the guesswork</h2>
      <table>
        <thead><tr><th>What you see</th><th>How to record it</th><th>What not to assume</th></tr></thead>
        <tbody>
          <tr><td>One LED repeats a fixed count</td><td>Count flashes and pause length</td><td>Do not borrow the meaning from another brand</td></tr>
          <tr><td>Two or more LEDs alternate</td><td>Name every LED and the order</td><td>Do not report only the timer light</td></tr>
          <tr><td>Letters or numbers on a display</td><td>Photograph the exact characters</td><td>Do not omit prefixes, suffixes or dashes</td></tr>
          <tr><td>Remote or controller shows a code</td><td>Photograph both controller and unit label</td><td>Do not run a hidden diagnostic procedure from another model</td></tr>
          <tr><td>Light stays on without repeating</td><td>Check whether the unit still operates</td><td>It may be status or maintenance information; consult the manual</td></tr>
          <tr><td>MCB trips and all lights go out</td><td>Note when the trip happens</td><td>This is an electrical fault, not merely an LED code</td></tr>
        </tbody>
      </table>

      <h2>Common fault families behind blinking lights</h2>
      <p>The exact code differs, but most model charts point into one of these diagnostic families:</p>
      <ul>
        <li><strong>Temperature sensor or thermistor:</strong> the controller receives an open, shorted or implausible reading. A technician checks sensor resistance and its harness before replacing it.</li>
        <li><strong>Indoor-to-outdoor communication:</strong> the two control sections are not exchanging the expected signal. Supply, terminal wiring, connectors and both boards must be checked in order.</li>
        <li><strong>Fan or motor feedback:</strong> the commanded indoor or outdoor fan does not reach the expected response. Obstruction, motor, capacitor, wiring and drive electronics are possible causes.</li>
        <li><strong>PCB or power supply:</strong> unstable voltage, a failed relay, fuse, component or damaged board may stop control. A blinking light alone does not prove the whole PCB needs replacement.</li>
        <li><strong>Cooling-system protection:</strong> the controller may stop operation when temperature or pressure behaviour is abnormal. Refrigerant pressure is measured only when symptoms and the model's diagnostic route call for it.</li>
        <li><strong>Drainage or float protection:</strong> especially on ceiling cassette units, a drain-pump or high-water condition can stop the system to prevent overflow.</li>
        <li><strong>Maintenance or filter indication:</strong> some models use a light as a reminder rather than a breakdown. The exact model manual decides whether it is a reminder or a fault.</li>
      </ul>
      <p>For symptom-led checks that do not involve a code, use the <a href="/blog/aircond-troubleshooting-guide-malaysia">Malaysia aircond troubleshooting guide</a> or the interactive <a href="/tools">aircond diagnostic tools</a>.</p>

      <h2>Brand and model matter more than the code alone</h2>
      <p>KL Renovator services the 20 brands listed on this website: Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL and Isonic. Each can contain several code systems across generations.</p>
      <p>Start from the relevant <a href="/brands">aircond brand page</a>, then use the model label rather than guessing. For example, see the service context for <a href="/brands/daikin">Daikin</a>, <a href="/brands/panasonic">Panasonic</a>, <a href="/brands/mitsubishi">Mitsubishi</a>, <a href="/brands/acson">Acson</a> or <a href="/brands/midea">Midea</a>. The brand page confirms that KL Renovator services the equipment; the exact manufacturer manual remains the source for that model's code definition.</p>

      <h2>When to switch off immediately</h2>
      <p>A normal error-code investigation can wait for a scheduled diagnosis. These signs cannot:</p>
      <ul>
        <li><strong>MCB trips repeatedly:</strong> do not keep resetting it. A short, earth leakage, capacitor, wiring or compressor current problem needs testing.</li>
        <li><strong>Burning smell, smoke or sparks:</strong> isolate power and use the <a href="/services/emergency">emergency aircond repair service</a>.</li>
        <li><strong>Water reaches wiring, a socket or the PCB side of the indoor unit:</strong> stop the unit and protect the area without opening the electrical section.</li>
        <li><strong>Outdoor fan is stopped while the compressor area is hot or humming:</strong> do not force continued operation.</li>
        <li><strong>Grinding, knocking or metal contact:</strong> continued running can turn one mechanical fault into more damage.</li>
      </ul>
      <p>For a blinking warning without these hazards, leave the unit off after recording the evidence and arrange <a href="/services/repair">aircond troubleshooting and repair</a>.</p>

      <h2>Why a reset is not a repair</h2>
      <p>Power cycling clears the controller's temporary memory and starts a fresh self-check. That is useful once. Repeating it until the unit runs hides the sequence the technician needs and repeatedly energises the same fault.</p>
      <p>If the light returns, the condition is still present. Follow the relevant problem page instead: <a href="/problems/aircond-blinking-light">blinking light diagnosis</a>, <a href="/problems/aircond-pcb-problem">possible PCB symptoms</a>, <a href="/problems/aircond-not-turning-on">aircond not turning on</a>, or <a href="/problems/aircond-tripping-power">aircond tripping power</a>.</p>

      <h2>What a technician checks after reading the code</h2>
      <ol>
        <li><strong>Reproduce and retrieve:</strong> confirm the same signal and cross-reference the exact model chart.</li>
        <li><strong>Visual inspection:</strong> check terminals, harnesses, signs of moisture, heat damage and loose connectors.</li>
        <li><strong>Targeted electrical tests:</strong> voltage, continuity, sensor resistance, capacitor value or motor winding checks as the fault path requires.</li>
        <li><strong>System tests when relevant:</strong> fan operation, drainage, temperature response and refrigerant pressure — not an automatic gas top-up.</li>
        <li><strong>Quote before replacement:</strong> explain the confirmed cause and obtain approval before fitting a part.</li>
        <li><strong>Clear and verify:</strong> run the unit, confirm cooling and ensure the warning does not return before handover.</li>
      </ol>
      <p>This elimination process is why replacing a PCB from an online code alone is poor practice. The same visible warning can be triggered by a cheaper sensor or connection fault.</p>

      <h2>KL Renovator diagnostic and repair pricing</h2>
      <p>These are the current published rates in the repository. A code does not automatically incur a part charge: diagnosis comes first, and any replacement is approved before work starts.</p>
      <table>
        <thead><tr><th>Diagnostic or part</th><th>Published price</th><th>Important condition</th></tr></thead>
        <tbody>
          <tr><td>Error-code / fault diagnosis</td><td>RM 88</td><td>Waived when repair is completed on the same visit</td></tr>
          <tr><td>Temperature sensor replacement</td><td>RM 150–250</td><td>Only after sensor and harness testing</td></tr>
          <tr><td>Capacitor replacement</td><td>RM 150–250</td><td>Depends on the tested component and unit</td></tr>
          <tr><td>Contactor replacement</td><td>RM 150–200</td><td>Quoted when the contactor is confirmed faulty</td></tr>
          <tr><td>Fan motor replacement</td><td>RM 350–480</td><td>Model and indoor/outdoor application matter</td></tr>
          <tr><td>PCB board replacement</td><td>RM 350–600</td><td>Quoted only after board, power, sensor and wiring checks</td></tr>
          <tr><td>Drain pump replacement</td><td>RM 350–550</td><td>Relevant mainly where a drain pump is installed</td></tr>
          <tr><td>Compressor replacement</td><td>RM 800–2,000</td><td>Major repair; diagnosis and approval required</td></tr>
        </tbody>
      </table>
      <p>Cleaning is a separate decision: basic servicing starts at RM 99 and pressure chemical wash at RM 120 for a wall-mounted 1.0–1.5 HP unit. A blinking light is not, by itself, a reason to sell a chemical wash or gas top-up.</p>

      <h2>Local diagnosis across KL &amp; Selangor</h2>
      <p>KL Renovator handles error-code and blinking-light calls across Kuala Lumpur and Selangor, including Petaling Jaya, Shah Alam, Subang Jaya, Puchong, Klang, Ampang, Cheras, Kajang, Mont Kiara, Bangsar, Setapak, Kepong, Batu Caves, Selayang, Rawang, Putrajaya and Cyberjaya. View <a href="/areas/kuala-lumpur">Kuala Lumpur aircond coverage</a> or <a href="/areas/petaling-jaya">Petaling Jaya service coverage</a>.</p>
      <p>Operating hours are Monday to Sunday, 9:00 AM–6:00 PM. Same-day slots are often available depending on technician routing and parts needs. Eligible workmanship is covered by a 1-month workmanship warranty.</p>

      <h2>Frequently asked questions</h2>
      <h3>Why is my aircond timer light blinking?</h3>
      <p>A repeating timer or operation light usually means the control system has stored a warning or fault. Record the complete pattern and identify the exact brand and model before interpreting it, because meanings are model-specific.</p>

      <h3>Do all aircond brands use the same error codes?</h3>
      <p>No. The same letters, numbers or blink count can mean different things across brands and even model series. Use the manual or code chart for the exact model printed on the unit label.</p>

      <h3>Can I reset a blinking aircond myself?</h3>
      <p>You can switch the unit off, isolate its power for five minutes, then restore power once. If the warning returns, stop resetting and arrange diagnosis. Never reset repeatedly when the MCB trips, there is a burning smell, smoke or water near wiring.</p>

      <h3>Does a blinking light always mean the PCB is faulty?</h3>
      <p>No. A control board can report faults caused by a sensor, wiring connection, fan, capacitor, drainage protection or another component. Testing is needed before a PCB is replaced.</p>

      <h3>What should I send on WhatsApp for a faster diagnosis?</h3>
      <p>Send one video showing the full blink-and-pause cycle, a clear photo of the model label, the brand, what the unit was doing when it stopped, your area and whether the MCB tripped.</p>

      <h3>Is it safe to keep using an aircond with a blinking light?</h3>
      <p>Do not keep forcing it to run if cooling has stopped, the outdoor fan is not moving, the MCB trips, the unit smells burnt, makes grinding noises or leaks near electrical parts. Switch it off and arrange a check.</p>

      <h3>Why did the error return after a reset?</h3>
      <p>A reset can clear a temporary control state, but it cannot repair a failed sensor, loose harness, blocked drain, fan fault, refrigerant issue or damaged board. A returning code means the underlying condition is still present.</p>

      <h3>How much is aircond error-code diagnosis with KL Renovator?</h3>
      <p>KL Renovator's published diagnostic fee is RM 88 and is waived when the repair is completed on the same visit. Any part or additional work is quoted for approval before replacement.</p>

      <h3>Can KL Renovator diagnose my aircond brand?</h3>
      <p>KL Renovator services 20 listed brands, including Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL and Isonic.</p>

      <h3>Can I book same-day error-code diagnosis in KL or Selangor?</h3>
      <p>Same-day slots are often available depending on technician routing and parts needs. WhatsApp <strong>+60 18-298 3573</strong> with the video, model label and your location for the fastest confirmation.</p>

      <h2>Decode the signal before replacing a part</h2>
      <p>The best first move costs nothing: save the pattern and model label. The best second move is one controlled reset. If the code returns, test the indicated circuit instead of buying the part named by an unverified online list.</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong> or use the <a href="/book">online booking form</a>. Related: <a href="/services/repair">troubleshooting &amp; repairs</a> · <a href="/blog/aircond-troubleshooting-guide-malaysia">general troubleshooting guide</a> · <a href="/tools">diagnostic tools</a> · <a href="/near-me">aircond technician near you in KL &amp; Selangor</a>.</p>
    `,
    contentMS: `
      <p>Lampu timer atau operation yang berkelip bukan hiasan rawak. Itu cara sistem kawalan aircond memberitahu bahawa ia merekodkan keadaan yang tidak boleh diabaikan. Bahagian berguna ialah coraknya; bahagian berbahaya ialah meneka maksudnya daripada kod untuk jenama atau model lain.</p>
      <div class="summary-block"><strong>Jawapan pantas:</strong> Rakam satu kitaran penuh kelip-dan-jeda sebelum matikan apa-apa, ambil gambar label model tepat, dan semak manual model itu. Anda boleh asingkan kuasa selama lima minit dan hidupkan semula sekali. Jika amaran sama kembali — atau MCB trip, ada bau terbakar, asap, bocor teruk atau kipas luar berhenti — biarkan unit mati dan atur diagnosis profesional. Kod aircond khusus mengikut model, bukan universal.</div>

      <h2>Apa maksud lampu aircond berkelip?</h2>
      <p>Split unit moden memantau suhu, operasi kipas, komunikasi antara bahagian dalam dan luar, perlindungan saliran serta elektronik kawalan. Apabila nilai atau respons yang dipantau keluar daripada julat jangkaan mesin, pengawal boleh hentikan penyejukan dan tunjuk kod huruf-nombor, urutan LED berulang, atau beberapa lampu serentak.</p>
      <p>Isyarat itu ialah <strong>titik mula diagnosis</strong>, bukan bukti bahawa bahagian tertentu mesti diganti. Papan kawalan boleh melaporkan sensor atau wayar rosak walaupun papan itu sendiri sihat. Begitu juga, amaran komunikasi inverter boleh berpunca daripada bekalan kuasa, harness longgar atau salah satu bahagian sistem. Sebab itu KL Renovator menguji litar sebelum menyebut harga PCB.</p>

      <h2>Enam langkah decoder yang selamat</h2>
      <h3>1. Rakam corak sebelum reset</h3>
      <p>Guna telefon untuk rakam sekurang-kurangnya satu urutan penuh: bila lampu mula, berapa kali ia berkelip, tempoh jeda, dan bila ia berulang. Jika ada LED operation, timer, filter atau power, pastikan semuanya masuk dalam video. Klip sepuluh saat yang tamat sebelum jeda boleh menyembunyikan urutan sebenar.</p>

      <h3>2. Catat butiran yang nampak</h3>
      <p>Catat lampu mana berkelip, warnanya, bilangan kelip sebelum jeda, sama ada cepat atau perlahan, dan sebarang huruf atau nombor pada paparan. Jangan ringkaskan kod: “E” dan “E6”, contohnya, bukan penerangan yang sama, dan maksudnya masih bergantung pada model.</p>

      <h3>3. Kenal pasti jenama dan model tepat</h3>
      <p>Ambil gambar label model pada unit dalam atau plat penarafan. Nama jenama sahaja tak cukup kerana carta kod boleh berubah antara unit dinding, ceiling cassette, inverter dan bukan inverter. Jangan guna decoder siri lain hanya kerana casing nampak serupa.</p>

      <h3>4. Semak manual model, bukan senarai universal</h3>
      <p>Guna manual bersama unit atau carta kod pengeluar untuk model tepat. Setiap jenama ada logik sendiri, dan sesetengah siri menggunakan kod paparan sama dengan maksud berbeza. KL Renovator ialah syarikat HVAC bebas, bukan pengedar sah mana-mana jenama; kami rujuk silang maklumat model kemudian sahkan litar yang ditunjukkan di tapak.</p>

      <h3>5. Cuba satu reset terkawal sahaja</h3>
      <p>Matikan unit dengan remote. Asingkan kuasa di suis isolator atau MCB yang betul selama lima minit, kemudian pulihkan kuasa dan hidupkan sekali. Ini mungkin membersihkan keadaan kawalan sementara selepas bekalan terganggu. Ia tidak membaiki sensor rosak, penyambung longgar, longkang tersumbat, kipas atau PCB.</p>

      <h3>6. Perhatikan apa jadi selepas itu</h3>
      <p>Jika unit berjalan normal dan amaran tak kembali, simpan video dan pantau. Jika isyarat sama kembali serta-merta atau selepas beberapa minit, catat bila tepat: semasa mula, bila unit luar patut hidup, selepas penyejukan bermula, atau bila air kondensasi terkumpul. Masa kejadian mengecilkan skop carian.</p>

      <h2>Apa yang perlu dirakam untuk penilaian awal berguna</h2>
      <table>
        <thead><tr><th>Rakaman</th><th>Bukti yang baik</th><th>Kenapa penting</th></tr></thead>
        <tbody>
          <tr><td>Corak kelip</td><td>Kitaran penuh kelip → jeda → ulang</td><td>Tunjukkan urutan sebenar, bukan kiraan teka-teki</td></tr>
          <tr><td>Identiti model</td><td>Gambar tajam label unit dalam atau luar</td><td>Padankan isyarat dengan carta pengeluar betul</td></tr>
          <tr><td>Gejala operasi</td><td>Status kipas dalam, kipas luar, sejuk, bunyi dan bocor</td><td>Bezakan kod tersimpan dengan kerosakan aktif</td></tr>
          <tr><td>Kelakuan kuasa</td><td>Sama ada MCB kekal hidup atau trip</td><td>Kenal pasti keutamaan keselamatan elektrik</td></tr>
          <tr><td>Garis masa</td><td>Bila mula dan sama ada selepas gangguan kuasa atau servis</td><td>Bantu hasilkan semula keadaan</td></tr>
          <tr><td>Lokasi</td><td>Kawasan KL atau Selangor dan jenis akses unit</td><td>Bantu laluan juruteknik dan perancangan akses</td></tr>
        </tbody>
      </table>
      <p>Hantar butiran ini ke WhatsApp <strong>+60 18-298 3573</strong>. Video boleh mengecilkan keluarga kerosakan yang mungkin, tetapi keputusan alat ganti masih perlu ujian fizikal.</p>

      <h2>Jenis isyarat ralat tanpa meneka</h2>
      <table>
        <thead><tr><th>Apa yang anda nampak</th><th>Cara catat</th><th>Jangan terus anggap</th></tr></thead>
        <tbody>
          <tr><td>Satu LED mengulang kiraan tetap</td><td>Kira kelip dan panjang jeda</td><td>Jangan pinjam maksud daripada jenama lain</td></tr>
          <tr><td>Dua atau lebih LED berganti</td><td>Namakan setiap LED dan turutannya</td><td>Jangan laporkan lampu timer sahaja</td></tr>
          <tr><td>Huruf atau nombor pada paparan</td><td>Gambar aksara tepat</td><td>Jangan buang awalan, akhiran atau sengkang</td></tr>
          <tr><td>Remote atau controller tunjuk kod</td><td>Gambar controller dan label unit</td><td>Jangan jalankan prosedur tersembunyi model lain</td></tr>
          <tr><td>Lampu kekal menyala tanpa ulangan</td><td>Semak sama ada unit masih berjalan</td><td>Mungkin status atau penyelenggaraan; semak manual</td></tr>
          <tr><td>MCB trip dan semua lampu padam</td><td>Catat bila trip berlaku</td><td>Ini kerosakan elektrik, bukan sekadar kod LED</td></tr>
        </tbody>
      </table>

      <h2>Keluarga kerosakan biasa di sebalik lampu berkelip</h2>
      <p>Kod tepat berbeza, tetapi kebanyakan carta model menunjuk kepada salah satu keluarga diagnosis ini:</p>
      <ul>
        <li><strong>Sensor suhu atau thermistor:</strong> pengawal menerima bacaan litar terbuka, pintas atau tak munasabah. Juruteknik semak rintangan sensor dan harness sebelum menggantinya.</li>
        <li><strong>Komunikasi unit dalam-ke-luar:</strong> dua bahagian kawalan tidak bertukar isyarat yang dijangka. Bekalan, terminal wayar, penyambung dan kedua-dua papan mesti diperiksa ikut urutan.</li>
        <li><strong>Maklum balas kipas atau motor:</strong> kipas dalam atau luar yang diarahkan tidak memberi respons dijangka. Halangan, motor, kapasitor, wayar dan elektronik pemacu semuanya kemungkinan.</li>
        <li><strong>PCB atau bekalan kuasa:</strong> voltan tak stabil, geganti, fius, komponen atau papan rosak boleh hentikan kawalan. Lampu berkelip sahaja tak membuktikan seluruh PCB perlu diganti.</li>
        <li><strong>Perlindungan sistem penyejukan:</strong> pengawal boleh hentikan operasi apabila suhu atau tekanan bertindak luar biasa. Tekanan gas diukur hanya apabila gejala dan laluan diagnosis model memerlukannya.</li>
        <li><strong>Perlindungan saliran atau float:</strong> terutama pada ceiling cassette, pam longkang atau paras air tinggi boleh hentikan sistem untuk mencegah limpahan.</li>
        <li><strong>Petunjuk penyelenggaraan atau filter:</strong> sesetengah model guna lampu sebagai peringatan, bukan kerosakan. Manual model tepat menentukan bezanya.</li>
      </ul>
      <p>Untuk semakan berdasarkan gejala tanpa kod, guna <a href="/ms/blog/aircond-troubleshooting-guide-malaysia">panduan troubleshooting aircond Malaysia</a> atau <a href="/ms/tools">alat diagnostik aircond</a> interaktif.</p>

      <h2>Jenama dan model lebih penting daripada kod sahaja</h2>
      <p>KL Renovator menservis 20 jenama yang disenaraikan di laman ini: Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL dan Isonic. Setiap jenama boleh mempunyai beberapa sistem kod merentasi generasi.</p>
      <p>Mula di <a href="/ms/brands">halaman jenama aircond</a> berkaitan, kemudian guna label model dan jangan meneka. Contohnya, lihat konteks servis untuk <a href="/ms/brands/daikin">Daikin</a>, <a href="/ms/brands/panasonic">Panasonic</a>, <a href="/ms/brands/mitsubishi">Mitsubishi</a>, <a href="/ms/brands/acson">Acson</a> atau <a href="/ms/brands/midea">Midea</a>. Halaman jenama mengesahkan KL Renovator menservis peralatan itu; manual pengeluar tepat kekal sumber definisi kod model tersebut.</p>

      <h2>Bila perlu matikan segera</h2>
      <p>Pemeriksaan kod biasa boleh tunggu slot diagnosis. Tanda berikut tak boleh:</p>
      <ul>
        <li><strong>MCB trip berulang:</strong> jangan terus reset. Litar pintas, kebocoran bumi, kapasitor, wayar atau arus kompressor perlu diuji.</li>
        <li><strong>Bau terbakar, asap atau percikan:</strong> asingkan kuasa dan guna <a href="/ms/services/emergency">servis pembaikan aircond kecemasan</a>.</li>
        <li><strong>Air sampai ke wayar, soket atau sisi PCB unit dalam:</strong> hentikan unit dan lindungi kawasan tanpa membuka bahagian elektrik.</li>
        <li><strong>Kipas luar berhenti sedangkan kawasan kompressor panas atau berdengung:</strong> jangan paksa operasi berterusan.</li>
        <li><strong>Bunyi mengisar, mengetuk atau sentuhan logam:</strong> terus berjalan boleh menukar satu kerosakan mekanikal kepada kerosakan tambahan.</li>
      </ul>
      <p>Untuk amaran berkelip tanpa bahaya ini, biarkan unit mati selepas merakam bukti dan atur <a href="/ms/services/repair">troubleshooting dan pembaikan aircond</a>.</p>

      <h2>Kenapa reset bukan pembaikan</h2>
      <p>Memutus dan memulihkan kuasa membersihkan memori sementara pengawal dan memulakan pemeriksaan kendiri baru. Ia berguna sekali. Mengulang sehingga unit berjalan menyembunyikan urutan yang juruteknik perlukan dan memberi tenaga berulang kali kepada kerosakan sama.</p>
      <p>Jika lampu kembali, keadaan masih wujud. Ikut halaman masalah berkaitan: <a href="/ms/problems/aircond-blinking-light">diagnosis lampu berkelip</a>, <a href="/ms/problems/aircond-pcb-problem">gejala kemungkinan PCB</a>, <a href="/ms/problems/aircond-not-turning-on">aircond tak boleh hidup</a>, atau <a href="/ms/problems/aircond-tripping-power">aircond trip kuasa</a>.</p>

      <h2>Apa yang juruteknik semak selepas baca kod</h2>
      <ol>
        <li><strong>Hasilkan semula dan dapatkan kod:</strong> sahkan isyarat sama dan rujuk silang carta model tepat.</li>
        <li><strong>Pemeriksaan visual:</strong> semak terminal, harness, kesan kelembapan, kerosakan haba dan penyambung longgar.</li>
        <li><strong>Ujian elektrik disasarkan:</strong> voltan, kesinambungan, rintangan sensor, nilai kapasitor atau gegelung motor mengikut laluan kerosakan.</li>
        <li><strong>Ujian sistem bila berkaitan:</strong> operasi kipas, saliran, respons suhu dan tekanan gas — bukan top up gas automatik.</li>
        <li><strong>Sebut harga sebelum ganti:</strong> terangkan punca disahkan dan dapatkan kelulusan sebelum memasang alat ganti.</li>
        <li><strong>Padam dan sahkan:</strong> jalankan unit, sahkan sejuk dan pastikan amaran tak kembali sebelum serahan.</li>
      </ol>
      <p>Proses penyingkiran ini sebabnya mengganti PCB berdasarkan kod dalam talian sahaja ialah amalan buruk. Amaran nampak sama boleh dicetuskan oleh sensor atau sambungan yang lebih murah.</p>

      <h2>Harga diagnosis dan pembaikan KL Renovator</h2>
      <p>Ini kadar semasa yang diterbitkan dalam repositori. Kod tidak terus mengenakan caj alat ganti: diagnosis dibuat dahulu dan penggantian mesti diluluskan sebelum kerja bermula.</p>
      <table>
        <thead><tr><th>Diagnosis atau alat ganti</th><th>Harga rasmi</th><th>Syarat penting</th></tr></thead>
        <tbody>
          <tr><td>Diagnosis kod ralat / kerosakan</td><td>RM 88</td><td>Dikecualikan bila pembaikan siap dalam lawatan sama</td></tr>
          <tr><td>Penggantian sensor suhu</td><td>RM 150–250</td><td>Hanya selepas ujian sensor dan harness</td></tr>
          <tr><td>Penggantian kapasitor</td><td>RM 150–250</td><td>Bergantung komponen dan unit yang diuji</td></tr>
          <tr><td>Penggantian contactor</td><td>RM 150–200</td><td>Disebut bila contactor disahkan rosak</td></tr>
          <tr><td>Penggantian motor kipas</td><td>RM 350–480</td><td>Model dan kegunaan dalam/luar penting</td></tr>
          <tr><td>Penggantian papan PCB</td><td>RM 350–600</td><td>Hanya selepas semakan papan, kuasa, sensor dan wayar</td></tr>
          <tr><td>Penggantian pam longkang</td><td>RM 350–550</td><td>Berkaitan terutama jika pam longkang dipasang</td></tr>
          <tr><td>Penggantian kompressor</td><td>RM 800–2,000</td><td>Pembaikan besar; diagnosis dan kelulusan diperlukan</td></tr>
        </tbody>
      </table>
      <p>Pembersihan ialah keputusan berasingan: servis asas dari RM 99 dan cuci kimia bertekanan dari RM 120 untuk unit dinding 1.0–1.5 HP. Lampu berkelip sahaja bukan alasan menjual cuci kimia atau top up gas.</p>

      <h2>Diagnosis tempatan seluruh KL &amp; Selangor</h2>
      <p>KL Renovator mengurus panggilan kod ralat dan lampu berkelip seluruh Kuala Lumpur dan Selangor, termasuk Petaling Jaya, Shah Alam, Subang Jaya, Puchong, Klang, Ampang, Cheras, Kajang, Mont Kiara, Bangsar, Setapak, Kepong, Batu Caves, Selayang, Rawang, Putrajaya dan Cyberjaya. Lihat <a href="/ms/areas/kuala-lumpur">liputan servis aircond Kuala Lumpur</a> atau <a href="/ms/areas/petaling-jaya">liputan Petaling Jaya</a>.</p>
      <p>Waktu operasi Isnin hingga Ahad, 9:00 pagi–6:00 petang. Slot hari sama kerap tersedia mengikut laluan juruteknik dan keperluan alat ganti. Kerja yang layak dilindungi waranti kerja 1 bulan.</p>

      <h2>Soalan lazim</h2>
      <h3>Kenapa lampu timer aircond saya berkelip?</h3>
      <p>Lampu timer atau operasi yang berulang biasanya bermaksud sistem kawalan menyimpan amaran atau kerosakan. Rakam corak penuh dan kenal pasti jenama serta model tepat kerana maksudnya khusus mengikut model.</p>

      <h3>Adakah semua jenama aircond menggunakan kod ralat yang sama?</h3>
      <p>Tidak. Huruf, nombor atau bilangan kelip yang sama boleh membawa maksud berbeza antara jenama dan siri model. Gunakan manual atau carta kod untuk model tepat pada label unit.</p>

      <h3>Boleh saya reset aircond berkelip sendiri?</h3>
      <p>Anda boleh matikan unit, asingkan kuasa selama lima minit, kemudian pulihkan kuasa sekali. Jika amaran kembali, hentikan reset dan atur diagnosis. Jangan reset berulang jika MCB trip, ada bau terbakar, asap atau air berhampiran wayar.</p>

      <h3>Adakah lampu berkelip sentiasa bermakna PCB rosak?</h3>
      <p>Tidak. Papan kawalan boleh melaporkan kerosakan sensor, sambungan wayar, kipas, kapasitor, perlindungan saliran atau komponen lain. Ujian perlu dibuat sebelum PCB diganti.</p>

      <h3>Apa yang patut saya hantar melalui WhatsApp untuk diagnosis lebih pantas?</h3>
      <p>Hantar satu video kitaran kelip-dan-jeda penuh, gambar jelas label model, jenama, apa yang unit lakukan sebelum berhenti, kawasan anda dan sama ada MCB trip.</p>

      <h3>Selamatkah terus guna aircond yang lampunya berkelip?</h3>
      <p>Jangan paksa unit berjalan jika penyejukan berhenti, kipas luar tidak bergerak, MCB trip, unit berbau terbakar, berbunyi kasar atau bocor dekat bahagian elektrik. Matikan dan atur pemeriksaan.</p>

      <h3>Kenapa ralat kembali selepas reset?</h3>
      <p>Reset boleh membersihkan keadaan kawalan sementara tetapi tidak membaiki sensor, harness longgar, longkang tersumbat, kipas, gas atau papan rosak. Kod yang kembali bermaksud punca masih wujud.</p>

      <h3>Berapa caj diagnosis kod ralat KL Renovator?</h3>
      <p>Fi diagnosis rasmi KL Renovator ialah RM 88 dan dikecualikan apabila pembaikan disiapkan dalam lawatan sama. Sebarang alat ganti atau kerja tambahan disebut untuk kelulusan sebelum diganti.</p>

      <h3>Boleh KL Renovator diagnosis jenama aircond saya?</h3>
      <p>KL Renovator menservis 20 jenama tersenarai termasuk Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL dan Isonic.</p>

      <h3>Boleh tempah diagnosis hari sama di KL atau Selangor?</h3>
      <p>Slot hari sama kerap tersedia mengikut laluan juruteknik dan keperluan alat ganti. WhatsApp <strong>+60 18-298 3573</strong> dengan video, label model dan lokasi untuk pengesahan terpantas.</p>

      <h2>Decode isyarat sebelum ganti alat</h2>
      <p>Langkah pertama terbaik adalah percuma: simpan corak dan label model. Langkah kedua ialah satu reset terkawal. Jika kod kembali, uji litar yang ditunjukkan dan jangan beli alat ganti berdasarkan senarai dalam talian yang tidak disahkan.</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong> atau guna <a href="/ms/book">borang tempahan dalam talian</a>. Berkaitan: <a href="/ms/services/repair">troubleshooting &amp; pembaikan</a> · <a href="/ms/blog/aircond-troubleshooting-guide-malaysia">panduan troubleshooting umum</a> · <a href="/ms/tools">alat diagnostik</a> · <a href="/ms/near-me">juruteknik aircond berhampiran di KL &amp; Selangor</a>.</p>
    `,
    contentZH: `
      <p>Timer 或 operation 指示灯闪烁并不是随机装饰，而是冷气控制系统在告诉你：机器记录到不能忽略的状态。真正有用的是闪灯规律；真正危险的是拿其他品牌或型号的代码解释自己的机器。</p>
      <div class="summary-block"><strong>快速答案：</strong>关掉任何东西前，先拍下完整的“闪灯—暂停—重复”循环，并拍清楚准确型号标签，再查该型号说明书。可以隔离电源五分钟后重启一次。如果同一警告重现，或 MCB 跳闸、出现焦味、冒烟、严重漏水、室外风扇不转，应保持关机并安排专业诊断。冷气错误代码因机型而异，并不通用。</div>

      <h2>冷气指示灯闪烁是什么意思？</h2>
      <p>现代分体式冷气会监控温度、风扇运行、室内外机通信、排水保护和控制电子部件。当某个监测值或回应超出机器预期范围，控制器可能停止制冷，并显示字母数字代码、重复LED规律，或多个指示灯组合。</p>
      <p>信号只是<strong>诊断起点</strong>，并不能证明某个零件必须更换。控制板本身正常时，也可能报告传感器或接线故障；变频通信警告也可能来自供电、松动线束或系统任一端。因此，KL Renovator 会先测试电路，再报价更换 PCB。</p>

      <h2>安全解读错误代码的六个步骤</h2>
      <h3>1. 重启前先记录规律</h3>
      <p>用手机至少拍下一个完整循环：何时开始、闪几次、暂停多久、何时重复。如果同时有 operation、timer、filter 或 power 灯，请全部拍进画面。只拍十秒却在暂停前结束，可能看不到真正规律。</p>

      <h3>2. 写下看得到的细节</h3>
      <p>记录哪一盏灯、颜色、暂停前闪几次、快闪还是慢闪，以及屏幕上的所有字母或数字。不要缩写代码：例如“E”和“E6”不是同一个描述，而且具体含义仍取决于机型。</p>

      <h3>3. 确认准确品牌与型号</h3>
      <p>拍下室内机型号标签或铭牌。只有品牌名称还不够，因为挂壁式、天花卡式、变频和定频系列的代码表可能不同。不要因为外壳相似，就使用另一个系列的“解码器”。</p>

      <h3>4. 查准确型号说明书，不查“通用表”</h3>
      <p>使用随机器附带的说明书，或制造商针对该准确型号提供的代码表。每个品牌有自己的逻辑，同一品牌不同系列也可能用相同显示代码表达不同问题。KL Renovator 是独立 HVAC 服务公司，并非任何品牌授权经销商；我们会交叉核对型号资料，再到现场验证所指电路。</p>

      <h3>5. 只做一次受控重启</h3>
      <p>先用遥控器关机，再从墙上隔离开关或正确的 MCB 断电五分钟，然后恢复供电并只启动一次。这可能清除供电中断后的暂时控制状态，却不能修好坏掉的传感器、松动接头、堵塞排水、风扇或 PCB。</p>

      <h3>6. 观察接下来发生什么</h3>
      <p>如果机器恢复正常而警告不再出现，保留视频并继续观察。如果信号立即或数分钟后重现，请记录准确时间：开机时、室外机应启动时、开始制冷后，还是冷凝水累积后。出现时间能缩小排查范围。</p>

      <h2>远程初步判断需要拍什么？</h2>
      <table>
        <thead><tr><th>资料</th><th>有效记录</th><th>为什么重要</th></tr></thead>
        <tbody>
          <tr><td>闪灯规律</td><td>完整“闪灯→暂停→重复”循环</td><td>显示真实规律，而非猜测次数</td></tr>
          <tr><td>机型身份</td><td>室内或室外机铭牌清晰照片</td><td>对应正确制造商代码表</td></tr>
          <tr><td>运行现象</td><td>室内风扇、室外风扇、制冷、异响与漏水状态</td><td>区分历史代码与当前故障</td></tr>
          <tr><td>供电表现</td><td>MCB 保持开启还是跳闸</td><td>识别电气安全优先级</td></tr>
          <tr><td>时间线</td><td>何时开始，是否跟在停电或保养之后</td><td>帮助重现问题</td></tr>
          <tr><td>位置</td><td>KL或雪兰莪地区及机器通道类型</td><td>协助安排技师路线和通道</td></tr>
        </tbody>
      </table>
      <p>把这些资料发到 WhatsApp <strong>+60 18-298 3573</strong>。视频可以缩小可能故障类别，但更换零件前仍需现场测试。</p>

      <h2>不靠猜测的信号记录方法</h2>
      <table>
        <thead><tr><th>你看到什么</th><th>如何记录</th><th>不要直接假设什么</th></tr></thead>
        <tbody>
          <tr><td>一盏LED重复固定次数</td><td>数清闪烁次数和暂停长度</td><td>不要借用其他品牌含义</td></tr>
          <tr><td>两盏以上LED交替</td><td>记下每盏灯名称和顺序</td><td>不要只报告timer灯</td></tr>
          <tr><td>屏幕显示字母或数字</td><td>拍下完整字符</td><td>不要省略前缀、后缀或横线</td></tr>
          <tr><td>遥控器或控制器显示代码</td><td>同时拍控制器和机身标签</td><td>不要执行其他机型的隐藏诊断程序</td></tr>
          <tr><td>指示灯长亮但不重复</td><td>检查机器是否仍运行</td><td>可能是状态或保养提醒，应查说明书</td></tr>
          <tr><td>MCB跳闸、全部灯熄灭</td><td>记录跳闸发生时机</td><td>这是电气故障，不只是LED代码</td></tr>
        </tbody>
      </table>

      <h2>闪灯背后的常见故障类别</h2>
      <p>准确代码各不相同，但多数机型代码表会指向以下一种诊断类别：</p>
      <ul>
        <li><strong>温度传感器或热敏电阻：</strong>控制器收到断路、短路或不合理读数。技师会先检查传感器电阻和线束，再决定是否更换。</li>
        <li><strong>室内外机通信：</strong>两边控制部分没有交换预期信号。应按顺序检查供电、端子接线、接头和两边主板。</li>
        <li><strong>风扇或电机反馈：</strong>室内或室外风扇没有达到控制器要求的回应。异物阻挡、电机、电容、接线和驱动电子部件都可能是原因。</li>
        <li><strong>PCB或供电：</strong>电压不稳、继电器、保险丝、元件或主板损坏都可能停止控制。仅凭闪灯不能证明整块PCB必须更换。</li>
        <li><strong>制冷系统保护：</strong>温度或压力表现异常时，控制器可能停止运行。只有症状与该机型诊断流程需要时，才测量冷媒压力。</li>
        <li><strong>排水或浮球保护：</strong>尤其是天花卡式机，排水泵或高水位状态可能让系统停机，防止溢水。</li>
        <li><strong>保养或滤网提示：</strong>某些机型用指示灯提醒保养，并非故障。准确型号说明书才能判定它是提醒还是错误。</li>
      </ul>
      <p>如果机器没有代码，只有其他症状，可使用<a href="/zh/blog/aircond-troubleshooting-guide-malaysia">马来西亚冷气故障排查指南</a>或互动式<a href="/zh/tools">冷气诊断工具</a>。</p>

      <h2>品牌与型号比代码本身更重要</h2>
      <p>KL Renovator 服务网站列出的20个品牌：Daikin、Panasonic、Mitsubishi、Acson、York、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL 与 Isonic。每个品牌跨越不同年代，都可能有多套代码系统。</p>
      <p>先从相关<a href="/zh/brands">冷气品牌页面</a>开始，再按机身型号查询，不要猜。例如查看 <a href="/zh/brands/daikin">Daikin</a>、<a href="/zh/brands/panasonic">Panasonic</a>、<a href="/zh/brands/mitsubishi">Mitsubishi</a>、<a href="/zh/brands/acson">Acson</a> 或 <a href="/zh/brands/midea">Midea</a> 的服务资料。品牌页确认 KL Renovator 可服务该设备；该型号代码定义仍应以制造商准确说明书为准。</p>

      <h2>什么时候必须立即关机？</h2>
      <p>普通错误代码可预约诊断，但以下情况不能等待：</p>
      <ul>
        <li><strong>MCB反复跳闸：</strong>不要继续重置。短路、漏电、电容、接线或压缩机电流问题需要测试。</li>
        <li><strong>焦味、冒烟或火花：</strong>隔离电源，并使用<a href="/zh/services/emergency">紧急冷气维修服务</a>。</li>
        <li><strong>水流到电线、插座或室内机PCB一侧：</strong>停机并保护周围，但不要打开电气部分。</li>
        <li><strong>室外风扇不转，而压缩机附近发热或嗡响：</strong>不要强行继续运行。</li>
        <li><strong>摩擦、敲击或金属碰撞声：</strong>继续运行可能让一个机械故障造成更多损坏。</li>
      </ul>
      <p>若只有闪灯警告、没有以上危险，记录资料后保持关机，并安排<a href="/zh/services/repair">冷气故障诊断与维修</a>。</p>

      <h2>为什么重启不等于维修？</h2>
      <p>断电重启会清除控制器暂时记忆，并重新执行自检，因此只做一次有参考价值。反复重启直到机器勉强运行，会抹掉技师需要的规律，也不断让同一故障重新通电。</p>
      <p>如果指示灯回来，问题仍存在。可先查看相关故障页：<a href="/zh/problems/aircond-blinking-light">冷气闪灯诊断</a>、<a href="/zh/problems/aircond-pcb-problem">PCB故障迹象</a>、<a href="/zh/problems/aircond-not-turning-on">冷气无法开机</a>，或<a href="/zh/problems/aircond-tripping-power">冷气导致跳闸</a>。</p>

      <h2>读到代码后，技师会检查什么？</h2>
      <ol>
        <li><strong>重现并读取：</strong>确认同一信号，并对照准确型号代码表。</li>
        <li><strong>目视检查：</strong>检查端子、线束、水分、过热痕迹和松动接头。</li>
        <li><strong>针对性电气测试：</strong>按故障路径测电压、导通、传感器电阻、电容值或电机绕组。</li>
        <li><strong>相关系统测试：</strong>在有需要时检查风扇、排水、温度回应和冷媒压力——不会自动加雪种。</li>
        <li><strong>更换前报价：</strong>解释已确认根因，取得同意后才安装零件。</li>
        <li><strong>清除并验证：</strong>运行机器、确认制冷，并确保警告不再出现后才交机。</li>
      </ol>
      <p>这套排除流程说明了为什么仅凭网上代码就更换 PCB 并不专业：同一个可见警告，也可能是较便宜的传感器或接线问题。</p>

      <h2>KL Renovator 诊断与维修价格</h2>
      <p>以下是资料库当前公布价格。出现代码不代表马上收取零件费：先诊断，任何更换都在开工前取得同意。</p>
      <table>
        <thead><tr><th>诊断或零件</th><th>公布价格</th><th>重要条件</th></tr></thead>
        <tbody>
          <tr><td>错误代码/故障诊断</td><td>RM 88</td><td>同次完成维修可豁免</td></tr>
          <tr><td>温度传感器更换</td><td>RM 150–250</td><td>先测试传感器和线束</td></tr>
          <tr><td>电容更换</td><td>RM 150–250</td><td>视已测试部件与机型</td></tr>
          <tr><td>接触器更换</td><td>RM 150–200</td><td>确认接触器故障后报价</td></tr>
          <tr><td>风扇电机更换</td><td>RM 350–480</td><td>视型号及室内/室外用途</td></tr>
          <tr><td>PCB主板更换</td><td>RM 350–600</td><td>先检查主板、供电、传感器与接线</td></tr>
          <tr><td>排水泵更换</td><td>RM 350–550</td><td>主要适用于装有排水泵的系统</td></tr>
          <tr><td>压缩机更换</td><td>RM 800–2,000</td><td>大型维修，必须先诊断并获批准</td></tr>
        </tbody>
      </table>
      <p>清洗是另一项决定：挂壁式1.0–1.5 HP基本保养从 RM 99 起，高压化学清洗从 RM 120 起。仅凭闪灯，不应推销化学清洗或加雪种。</p>

      <h2>吉隆坡与雪兰莪本地诊断</h2>
      <p>KL Renovator 处理吉隆坡与雪兰莪各地的错误代码和闪灯报修，包括八打灵再也、莎阿南、梳邦再也、蒲种、巴生、安邦、蕉赖、加影、Mont Kiara、Bangsar、Setapak、Kepong、黑风洞、士拉央、万挠、布城和 Cyberjaya。查看<a href="/zh/areas/kuala-lumpur">吉隆坡冷气服务范围</a>或<a href="/zh/areas/petaling-jaya">八打灵再也服务范围</a>。</p>
      <p>营业时间为星期一至星期日，早上9点至傍晚6点。当天时段通常视技师路线与零件需求而定。符合条件的工作享1个月工艺保修。</p>

      <h2>常见问题</h2>
      <h3>为什么冷气 timer 灯一直闪？</h3>
      <p>重复闪烁的 timer 或 operation 灯通常表示控制系统已记录警告或故障。先拍下完整规律，并确认准确品牌与型号；代码含义因机型而异。</p>

      <h3>所有冷气品牌都使用相同的错误代码吗？</h3>
      <p>不相同。同一组字母、数字或闪灯次数，在不同品牌甚至不同系列可能含义不同。应使用机身标签所示准确型号的说明书或代码表。</p>

      <h3>我可以自己重启闪灯的冷气吗？</h3>
      <p>可以关机并隔离电源五分钟，再恢复一次。警告重现就停止反复重启并安排诊断。若 MCB 跳闸、出现焦味、冒烟或电线附近有水，不要重启。</p>

      <h3>闪灯是否一定代表 PCB 主板坏了？</h3>
      <p>不一定。控制板也会报告传感器、接线、风扇、电容、排水保护或其他部件的故障。更换 PCB 前必须先测试。</p>

      <h3>WhatsApp 应发送什么资料以加快判断？</h3>
      <p>请发送完整闪灯与暂停循环的视频、清楚的型号标签照片、品牌、停机前的现象、所在地区，以及 MCB 是否跳闸。</p>

      <h3>冷气闪灯时继续使用安全吗？</h3>
      <p>若已经不制冷、室外风扇不转、MCB 跳闸、有焦味、摩擦异响，或电气部件附近漏水，请勿强行运行；应关机并安排检查。</p>

      <h3>为什么重启后错误又回来？</h3>
      <p>重启只能清除暂时控制状态，无法修复损坏的传感器、松动线束、堵塞排水、风扇、冷媒问题或主板。代码重现表示根因仍存在。</p>

      <h3>KL Renovator 的错误代码诊断费是多少？</h3>
      <p>KL Renovator 公布的诊断费为 RM 88；同次完成维修可豁免。任何零件或额外工作都会在更换前报价并取得同意。</p>

      <h3>KL Renovator 能诊断我的冷气品牌吗？</h3>
      <p>KL Renovator 服务 20 个已列品牌，包括 Daikin、Panasonic、Mitsubishi、Acson、York、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL 与 Isonic。</p>

      <h3>吉隆坡或雪兰莪可预约当天诊断吗？</h3>
      <p>当天时段通常视技师路线与零件需求而定。把视频、型号标签和位置发到 WhatsApp <strong>+60 18-298 3573</strong>，可最快确认。</p>

      <h2>先解读信号，再决定换什么</h2>
      <p>最好的第一步不花钱：保留闪灯规律和型号标签。第二步只做一次受控重启。如果代码重现，就测试它所指的电路，不要根据未经验证的网上列表直接买零件。</p>
      <p>WhatsApp <strong>+60 18-298 3573</strong>，或使用<a href="/zh/book">在线预约表格</a>。相关内容：<a href="/zh/services/repair">故障诊断与维修</a> · <a href="/zh/blog/aircond-troubleshooting-guide-malaysia">通用故障排查指南</a> · <a href="/zh/tools">诊断工具</a> · <a href="/zh/near-me">吉隆坡与雪兰莪附近的冷气技师</a>。</p>
    `,
  },
];
