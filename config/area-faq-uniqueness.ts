// config/area-faq-uniqueness.ts
// Round 43 / v50 — 9.10 Schema Uniqueness Pass for Areas
// Purpose: Vary FAQ schema questions slightly across area pages to avoid duplicate schema flags.
// Each area page keeps its own unique faqs from siteConfig (faqs / faqsBM / faqsZH) but we
// inject 2 Near-Me FAQs that mention area-specific landmarks, so every area's FAQPage JSON-LD
// is structurally similar but textually unique (area name + landmark + state variation).

type AreaPageLike = {
  slug: string;
  name: string;
  state: string;
  landmarks: string[];
  faqs?: { q: string; a: string }[];
  faqsBM?: { q: string; a: string }[];
  faqsZH?: { q: string; a: string }[];
  description?: string;
};

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function pickLandmarks(area: AreaPageLike, count = 3): string[] {
  const lms = area.landmarks && area.landmarks.length ? area.landmarks : [area.name];
  // Ensure at least count entries by repeating if needed
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(lms[i % lms.length]);
  return out;
}

// EN — 3 variant sets
const EN_NEARME_SETS: Array<
  (area: AreaPageLike) => { q: string; a: string }[]
> = [
  (area) => {
    const [lm1, lm2] = pickLandmarks(area, 2);
    return [
      {
        q: `Is there an aircond service near me in ${area.name}?`,
        a: `Yes — KL Renovator provides same-day aircond service near you in ${area.name}, ${area.state}. Our teams work daily around ${lm1} and ${lm2}. WhatsApp +60182983573 with your address and we'll dispatch the nearest technician. Most appointments in ${area.name} are confirmed within 30 minutes.`,
      },
      {
        q: `Who is the best aircond repair technician near me in ${area.name}?`,
        a: `KL Renovator's trained technicians are highly rated across ${area.name} and Klang Valley. With 500+ five-star reviews, transparent pricing from RM 99, and a 1-month workmanship warranty, we are trusted for aircond repair near ${lm1} and across ${area.state}.`,
      },
    ];
  },
  (area) => {
    const [lm1, lm2, lm3] = pickLandmarks(area, 3);
    return [
      {
        q: `Do you cover aircond servicing near ${lm1} in ${area.name}?`,
        a: `Yes — we cover aircond servicing near ${lm1}, ${lm2} and all neighbourhoods in ${area.name}, ${area.state}. Same-day slots are common. WhatsApp +60182983573 early for fastest dispatch in ${area.name}.`,
      },
      {
        q: `How fast is same-day aircond service near me in ${area.name}?`,
        a: `Most same-day requests in ${area.name} near ${lm1} and ${lm2} are dispatched within 30–60 minutes of WhatsApp confirmation. We operate 9AM–10PM daily across ${area.name} and greater Klang Valley, including ${lm3}.`,
      },
    ];
  },
  (area) => {
    const [lm1, lm2] = pickLandmarks(area, 2);
    return [
      {
        q: `Can I book aircond service near me today in ${area.name}?`,
        a: `Yes — you can book today in ${area.name}, ${area.state}. KL Renovator serves ${lm1}, ${lm2} and surrounding areas daily. Send your unit type (wall-mounted, ceiling cassette, window) and issue via WhatsApp +60182983573 for instant price confirmation in ${area.name}.`,
      },
      {
        q: `Is there emergency aircond repair near me in ${area.name}?`,
        a: `Yes — emergency aircond repair is available near you in ${area.name}. We prioritize water-leaking, not-cold, and noisy outdoor units around ${lm1} and ${lm2}. WhatsApp us with a short video and location for triage within minutes.`,
      },
    ];
  },
];

// MS — 3 variant sets
const MS_NEARME_SETS: Array<
  (area: AreaPageLike) => { q: string; a: string }[]
> = [
  (area) => {
    const [lm1, lm2] = pickLandmarks(area, 2);
    return [
      {
        q: `Adakah servis aircond berhampiran saya di ${area.name}?`,
        a: `Ya — KL Renovator menyediakan servis aircond hari sama berhampiran anda di ${area.name}, ${area.state}. Pasukan kami bekerja harian sekitar ${lm1} dan ${lm2}. WhatsApp +60182983573 dengan alamat anda dan kami akan hantar juruteknik terdekat. Kebanyakan temujanji di ${area.name} disahkan dalam 30 minit.`,
      },
      {
        q: `Siapa juruteknik baiki aircond terbaik berhampiran saya di ${area.name}?`,
        a: `Juruteknik terlatih KL Renovator mendapat penarafan tinggi di ${area.name}. Dengan 500+ ulasan 5-bintang, harga telus dari RM 99 dan jaminan 1 bulan, kami dipercayai untuk baiki aircond berhampiran ${lm1} dan seluruh ${area.state}.`,
      },
    ];
  },
  (area) => {
    const [lm1, lm2, lm3] = pickLandmarks(area, 3);
    return [
      {
        q: `Adakah anda cover servis aircond berhampiran ${lm1} di ${area.name}?`,
        a: `Ya — kami cover servis aircond berhampiran ${lm1}, ${lm2} dan semua kejiranan di ${area.name}, ${area.state}. Slot hari sama kerap tersedia. WhatsApp +60182983573 awal untuk penghantaran terpantas di ${area.name}, termasuk kawasan ${lm3}.`,
      },
      {
        q: `Berapa cepat servis aircond hari sama berhampiran saya di ${area.name}?`,
        a: `Kebanyakan permintaan hari sama di ${area.name} berhampiran ${lm1} dan ${lm2} dihantar dalam 30–60 minit selepas pengesahan WhatsApp. Kami beroperasi 9AM–10PM setiap hari di ${area.name} dan Lembah Klang.`,
      },
    ];
  },
  (area) => {
    const [lm1, lm2] = pickLandmarks(area, 2);
    return [
      {
        q: `Bolehkah saya tempah servis aircond berhampiran saya hari ini di ${area.name}?`,
        a: `Boleh — anda boleh tempah hari ini di ${area.name}, ${area.state}. KL Renovator servis ${lm1}, ${lm2} dan kawasan sekitar setiap hari. Hantar jenis unit dan masalah melalui WhatsApp +60182983573 untuk sebut harga segera di ${area.name}.`,
      },
      {
        q: `Adakah pembaikan aircond kecemasan berhampiran saya di ${area.name}?`,
        a: `Ya — pembaikan kecemasan tersedia berhampiran anda di ${area.name}. Kami utamakan kes bocor air, tak sejuk, dan outdoor bising sekitar ${lm1} dan ${lm2}. WhatsApp video pendek dan lokasi untuk triage segera.`,
      },
    ];
  },
];

// ZH — 3 variant sets
const ZH_NEARME_SETS: Array<
  (area: AreaPageLike) => { q: string; a: string }[]
> = [
  (area) => {
    const [lm1, lm2] = pickLandmarks(area, 2);
    return [
      {
        q: `${area.name}附近有冷气服务吗？`,
        a: `有的——KL Renovator 在${area.state}${area.name}为您提供当天附近的冷气服务。团队每天在${lm1}、${lm2}附近工作。通过WhatsApp +60182983573发送地址，我们将派遣最近的技术员。${area.name}的大多数预约在30分钟内确认。`,
      },
      {
        q: `${area.name}附近最好的冷气维修技术员是谁？`,
        a: `KL Renovator 训练有素的技术员在${area.name}获得高度评价，拥有500多个五星好评，价格从RM 99起透明，享有1个月工艺保修，值得信赖，覆盖${lm1}及整个${area.state}。`,
      },
    ];
  },
  (area) => {
    const [lm1, lm2, lm3] = pickLandmarks(area, 3);
    return [
      {
        q: `你们覆盖${area.name}${lm1}附近的冷气服务吗？`,
        a: `覆盖——我们覆盖${area.name}${lm1}、${lm2}及所有社区的冷气服务，${area.state}当天名额常见。请早上WhatsApp +60182983573以获得${area.name}包括${lm3}在内的最快派遣。`,
      },
      {
        q: `${area.name}附近当天冷气服务有多快？`,
        a: `大多数${area.name}靠近${lm1}、${lm2}的当天请求在WhatsApp确认后30–60分钟内派遣。我们每天9AM–10PM在${area.name}及整个巴生谷运营。`,
      },
    ];
  },
  (area) => {
    const [lm1, lm2] = pickLandmarks(area, 2);
    return [
      {
        q: `今天可以在${area.name}附近预约冷气服务吗？`,
        a: `可以——今天就可以在${area.state}${area.name}预约。KL Renovator每天服务${lm1}、${lm2}及周边区域。通过WhatsApp +60182983573发送机型和故障，立即在${area.name}确认价格。`,
      },
      {
        q: `${area.name}附近有紧急冷气维修吗？`,
        a: `有的——${area.name}附近提供紧急冷气维修。我们优先处理${lm1}、${lm2}附近的漏水、不冷、室外机噪音问题。请WhatsApp发送短视频和定位，几分钟内分诊。`,
      },
    ];
  },
];

function toFAQPageMainEntity(items: { q: string; a: string }[]) {
  return items.map((f) => ({
    "@type": "Question" as const,
    name: f.q,
    acceptedAnswer: { "@type": "Answer" as const, text: f.a },
  }));
}

export function buildUniqueAreaFAQ_EN(area: AreaPageLike) {
  const base = area.faqs && area.faqs.length ? area.faqs : [];
  const variantIdx = hashSlug(area.slug) % EN_NEARME_SETS.length;
  const nearMe = EN_NEARME_SETS[variantIdx](area);
  // Ensure uniqueness: add a signature Q that mentions one landmark specifically
  const [lm1] = pickLandmarks(area, 1);
  const signature = {
    q: `What should I prepare before aircond servicing in ${area.name} near ${lm1}?`,
    a: `In ${area.name}, especially near ${lm1}, please ensure clear access to the indoor unit and outdoor compressor, share your condo/house access procedure, and send a photo of the unit label if possible. KL Renovator brings drop sheets and vacuum equipment, serving ${area.name}, ${area.state} with transparent RM99+ pricing.`,
  };
  const combined = [...base, ...nearMe, signature];
  return toFAQPageMainEntity(combined);
}

export function buildUniqueAreaFAQ_MS(area: AreaPageLike) {
  const base = area.faqsBM && area.faqsBM.length ? area.faqsBM : area.faqs || [];
  const variantIdx = hashSlug(area.slug) % MS_NEARME_SETS.length;
  const nearMe = MS_NEARME_SETS[variantIdx](area);
  const [lm1] = pickLandmarks(area, 1);
  const signature = {
    q: `Apa perlu saya sediakan sebelum servis aircond di ${area.name} berhampiran ${lm1}?`,
    a: `Di ${area.name}, terutama berhampiran ${lm1}, pastikan akses jelas ke unit dalam dan kompressor luar, kongsi prosedur akses kondo/rumah, dan hantar foto label unit jika boleh. KL Renovator bawa alas kalis air dan vakum, servis ${area.name}, ${area.state} dengan harga telus dari RM99.`,
  };
  const combined = [...base, ...nearMe, signature];
  return toFAQPageMainEntity(combined);
}

export function buildUniqueAreaFAQ_ZH(area: AreaPageLike) {
  const base = area.faqsZH && area.faqsZH.length ? area.faqsZH : area.faqs || [];
  const variantIdx = hashSlug(area.slug) % ZH_NEARME_SETS.length;
  const nearMe = ZH_NEARME_SETS[variantIdx](area);
  const [lm1] = pickLandmarks(area, 1);
  const signature = {
    q: `在${area.name}${lm1}附近进行冷气保养前需要准备什么？`,
    a: `在${area.name}，尤其是${lm1}附近，请确保室内机和室外压缩机通道畅通，告知公寓/住宅的进出流程，并尽可能发送机身标签照片。KL Renovator会携带防水垫和吸尘设备，为${area.state}${area.name}提供RM99起的透明价格服务。`,
  };
  const combined = [...base, ...nearMe, signature];
  return toFAQPageMainEntity(combined);
}
