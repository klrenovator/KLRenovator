#!/usr/bin/env node
/**
 * PART 2 AUDIT — Analyzer.
 * Reads audit/pages.json and produces audit/findings.json with:
 * content/GEO/AEO scoring, duplicate + cannibalization clusters,
 * thin-content lists, link graph, topic clusters, and gap tables.
 */
import { readFileSync, writeFileSync } from "node:fs";
import crypto from "node:crypto";

const pages = JSON.parse(readFileSync("audit/pages.json", "utf8"));
const idx = new Map(pages.map((p) => [p.route, p]));
const F = {}; // findings

const pct = (n, d) => (d ? Math.round((n / d) * 1000) / 10 : 0);
const isCJK = (t) => /[\u4e00-\u9fff]/.test(t);

// ═══════════════ 1. TITLE TAGS ═══════════════
const TITLE_MAX = 60, TITLE_MIN = 30;
const titleIssues = { empty: [], tooLong: [], tooShort: [], noBrand: [], dupExact: [], noKeyword: [], boilerplateRatio: [] };
const titleMap = new Map();
for (const p of pages) {
  if (!p.title) titleIssues.empty.push(p.route);
  else {
    if (p.titleWidth > TITLE_MAX) titleIssues.tooLong.push({ r: p.route, w: p.titleWidth, t: p.title });
    if (p.titleWidth < TITLE_MIN) titleIssues.tooShort.push({ r: p.route, w: p.titleWidth, t: p.title });
    if (!/KL Renovator|KLRenovator/i.test(p.title)) titleIssues.noBrand.push(p.route);
    const key = p.title.trim().toLowerCase();
    if (!titleMap.has(key)) titleMap.set(key, []);
    titleMap.get(key).push(p.route);
  }
}
for (const [t, rs] of titleMap) if (rs.length > 1) titleIssues.dupExact.push({ title: t, count: rs.length, routes: rs.slice(0, 8) });
titleIssues.dupExact.sort((a, b) => b.count - a.count);

// Title template-similarity: how much of the title is shared boilerplate per template
function tokenSet(s) {
  return new Set((s.toLowerCase().match(/[a-z0-9\u4e00-\u9fff]+/g) || []));
}
const titleTplStats = {};
for (const p of pages) {
  const k = `${p.template}|${p.locale}`;
  if (!titleTplStats[k]) titleTplStats[k] = [];
  titleTplStats[k].push(p.title);
}
const titleUniformity = [];
for (const [k, list] of Object.entries(titleTplStats)) {
  if (list.length < 5) continue;
  // token frequency: tokens present in >90% of titles = boilerplate
  const freq = new Map();
  for (const t of list) for (const tok of tokenSet(t)) freq.set(tok, (freq.get(tok) || 0) + 1);
  const boiler = [...freq].filter(([, c]) => c / list.length > 0.9).map(([t]) => t);
  const avgTokens = list.reduce((a, t) => a + tokenSet(t).size, 0) / list.length;
  titleUniformity.push({
    group: k, pages: list.length,
    boilerplateTokens: boiler.length, avgTokens: Math.round(avgTokens * 10) / 10,
    boilerplateShare: pct(boiler.length, avgTokens),
    sample: list.slice(0, 3),
  });
}
titleUniformity.sort((a, b) => b.pages - a.pages);
F.titles = { total: pages.length, ...titleIssues, uniformity: titleUniformity };

// ═══════════════ 2. META DESCRIPTIONS ═══════════════
const D_MAX = 155, D_MIN_LAT = 120, D_MIN_CJK = 60;
const descIssues = { missing: [], tooLong: [], tooShort: [], dupExact: [], truncationArtifact: [], noCta: [], noPrice: [] };
const descMap = new Map();
for (const p of pages) {
  if (!p.desc) { descIssues.missing.push(p.route); continue; }
  const min = isCJK(p.desc) ? D_MIN_CJK : D_MIN_LAT;
  if (p.descWidth > D_MAX) descIssues.tooLong.push({ r: p.route, w: p.descWidth });
  if (p.descWidth < min) descIssues.tooShort.push({ r: p.route, w: p.descWidth, d: p.desc });
  if (/\.\.\.|…\s*$|&\.\.\.|\s\.\.\.\s/.test(p.desc)) descIssues.truncationArtifact.push({ r: p.route, d: p.desc.slice(-60) });
  if (!/whatsapp|book|tempah|call|预约|hubungi|联系/i.test(p.desc)) descIssues.noCta.push(p.route);
  if (!/rm\s?\d/i.test(p.desc)) descIssues.noPrice.push(p.route);
  const key = p.desc.trim().toLowerCase();
  if (!descMap.has(key)) descMap.set(key, []);
  descMap.get(key).push(p.route);
}
for (const [d, rs] of descMap) if (rs.length > 1) descIssues.dupExact.push({ count: rs.length, desc: d.slice(0, 110), routes: rs.slice(0, 6) });
descIssues.dupExact.sort((a, b) => b.count - a.count);

// near-duplicate descriptions: normalise by removing location/brand proper nouns
const descNorm = new Map();
for (const p of pages) {
  if (!p.desc) continue;
  const n = p.desc.toLowerCase()
    .replace(/[a-z\u4e00-\u9fff]+/g, (w) => w) // keep
    .replace(/\b(kuala lumpur|petaling jaya|subang jaya|shah alam|cheras|ampang|puchong|kajang|klang|setapak|wangsa maju|bangsar|mont kiara|sri petaling|damansara|kepong|sentul|serdang|seri kembangan|semenyih|rawang|selayang|gombak|titiwangsa|brickfields|bukit jalil|old klang road|taman [a-z]+|bandar [a-z]+|kampung [a-z]+|desa [a-z]+|sri [a-z]+|usj|ss\d+|pj|kl)\b/g, "«LOC»")
    .replace(/\b(daikin|panasonic|mitsubishi|york|acson|carrier|midea|haier|toshiba|hitachi|samsung|lg|sharp|fujitsu|gree|national|hisense|aux|tcl|isonic)\b/g, "«BRAND»")
    .replace(/\d+/g, "#").replace(/\s+/g, " ").trim();
  if (!descNorm.has(n)) descNorm.set(n, []);
  descNorm.get(n).push(p.route);
}
const descTemplateClusters = [...descNorm].filter(([, r]) => r.length >= 10)
  .map(([n, r]) => ({ count: r.length, pattern: n.slice(0, 130), sample: r.slice(0, 4) }))
  .sort((a, b) => b.count - a.count);
F.descriptions = { ...descIssues, templateClusters: descTemplateClusters };

// ═══════════════ 3. H1 / H2 HIERARCHY ═══════════════
const hIssues = { noH1: [], multiH1: [], h1EqTitle: [], noH2: [], skipped: [], thinHeadingStructure: [] };
const h1Map = new Map();
for (const p of pages) {
  if (p.h1Count === 0) hIssues.noH1.push(p.route);
  if (p.h1Count > 1) hIssues.multiH1.push({ r: p.route, n: p.h1Count, h1s: p.h1s });
  if (p.h1s[0] && p.title && p.h1s[0].trim().toLowerCase() === p.title.split("|")[0].trim().toLowerCase())
    hIssues.h1EqTitle.push(p.route);
  if (p.h2s.length === 0) hIssues.noH2.push(p.route);
  if (p.h2s.length > 0 && p.h2s.length < 3) hIssues.thinHeadingStructure.push({ r: p.route, h2: p.h2s.length });
  // level skips
  const levels = p.headings.map((h) => Number(h.split(":")[0]));
  for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) { hIssues.skipped.push({ r: p.route, from: levels[i - 1], to: levels[i] }); break; }
  for (const h of p.h1s) {
    const k = h.trim().toLowerCase();
    if (!h1Map.has(k)) h1Map.set(k, []);
    h1Map.get(k).push(p.route);
  }
}
const dupH1 = [...h1Map].filter(([, r]) => r.length > 1).map(([h, r]) => ({ h1: h.slice(0, 90), count: r.length, sample: r.slice(0, 5) })).sort((a, b) => b.count - a.count);
F.headings = { ...hIssues, dupH1 };

// ═══════════════ 4. THIN CONTENT ═══════════════
const THIN = 300, VERY_THIN = 150;
const byTemplate = {};
for (const p of pages) { if (!byTemplate[p.template]) byTemplate[p.template] = []; byTemplate[p.template].push(p); }
const thinByTemplate = {};
for (const [t, list] of Object.entries(byTemplate)) {
  const ws = list.map((p) => p.words).sort((a, b) => a - b);
  const med = ws[Math.floor(ws.length / 2)];
  thinByTemplate[t] = {
    pages: list.length,
    medianWords: med,
    minWords: ws[0], maxWords: ws[ws.length - 1],
    p25: ws[Math.floor(ws.length * 0.25)], p75: ws[Math.floor(ws.length * 0.75)],
    under300: list.filter((p) => p.words < THIN).length,
    under150: list.filter((p) => p.words < VERY_THIN).length,
  };
}
const thinPages = pages.filter((p) => p.words < THIN).map((p) => ({ r: p.route, w: p.words, tpl: p.template })).sort((a, b) => a.w - b.w);
F.thin = { byTemplate: thinByTemplate, thinPages: thinPages.slice(0, 60), thinTotal: thinPages.length };

// ═══════════════ 5. DUPLICATE CONTENT (shingling) ═══════════════
function shingles(text, k = 8) {
  const toks = (text.toLowerCase().match(/[a-z0-9\u4e00-\u9fff]+/g) || []);
  const s = new Set();
  for (let i = 0; i + k <= toks.length; i++) {
    s.add(crypto.createHash("md5").update(toks.slice(i, i + k).join(" ")).digest("hex").slice(0, 12));
  }
  return s;
}
function jaccard(a, b) {
  let inter = 0;
  const [small, big] = a.size < b.size ? [a, b] : [b, a];
  for (const x of small) if (big.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
}
// compare within template+locale groups (cross-group dupes are structural, not competitive)
const dupClusters = [];
const dupSummary = {};
for (const [t, list] of Object.entries(byTemplate)) {
  for (const loc of ["en", "ms", "zh"]) {
    const group = list.filter((p) => p.locale === loc);
    if (group.length < 2) continue;
    const sh = group.map((p) => ({ p, s: shingles(p.text) }));
    const sample = sh.length > 90 ? sh.filter((_, i) => i % Math.ceil(sh.length / 90) === 0) : sh;
    let sum = 0, n = 0, high = 0;
    const pairs = [];
    for (let i = 0; i < sample.length; i++) {
      for (let j = i + 1; j < sample.length; j++) {
        const sim = jaccard(sample[i].s, sample[j].s);
        sum += sim; n++;
        if (sim > 0.7) { high++; if (pairs.length < 6) pairs.push({ a: sample[i].p.route, b: sample[j].p.route, sim: Math.round(sim * 100) }); }
      }
    }
    dupSummary[`${t}|${loc}`] = {
      pages: group.length, sampled: sample.length,
      avgSimilarity: Math.round((sum / (n || 1)) * 1000) / 10,
      pairsOver70: high, pairShare: pct(high, n),
      examples: pairs,
    };
    if (sum / (n || 1) > 0.5) dupClusters.push({ group: `${t}|${loc}`, pages: group.length, avg: Math.round((sum / n) * 1000) / 10 });
  }
}
F.duplicates = { summary: dupSummary, highRiskGroups: dupClusters.sort((a, b) => b.avg - a.avg) };

// ═══════════════ 6. KEYWORD CANNIBALIZATION ═══════════════
// Build primary-keyword fingerprint from title (minus brand boilerplate)
function kwOf(title) {
  return (title.toLowerCase()
    .replace(/kl renovator|klrenovator/g, "")
    .replace(/[—|·\-–]/g, " ")
    .match(/[a-z\u4e00-\u9fff]+/g) || [])
    .filter((w) => !["the", "a", "an", "for", "in", "and", "or", "of", "to", "from", "with", "dari", "di", "dan", "untuk", "same", "day"].includes(w) && w.length > 1)
    .sort().join(" ");
}
const kwMap = new Map();
for (const p of pages) {
  const k = kwOf(p.title);
  if (!k) continue;
  if (!kwMap.has(k)) kwMap.set(k, []);
  kwMap.get(k).push(p);
}
const cannibalExactTitle = [...kwMap].filter(([, r]) => r.length > 1)
  .map(([k, r]) => ({ keyword: k.slice(0, 80), count: r.length, routes: r.map((p) => p.route).slice(0, 6) }))
  .sort((a, b) => b.count - a.count);

// intent-level cannibalization: same locale, same head-term set targeting same query class
const HEAD_TERMS = [
  "aircond installation", "aircond service", "chemical wash", "chemical overhaul", "gas top", "gas topup",
  "aircond repair", "aircond not cold", "aircond price", "aircond cost", "servicing", "cuci aircond",
  "pemasangan aircond", "servis aircond", "冷气安装", "冷气服务", "化学清洗",
];
const intentBuckets = {};
for (const p of pages) {
  const t = (p.title + " " + p.h1s.join(" ")).toLowerCase();
  for (const term of HEAD_TERMS) {
    if (t.includes(term)) { const bk = `${term}|${p.locale}`; if (!intentBuckets[bk]) intentBuckets[bk] = []; intentBuckets[bk].push(p.route); }
  }
}
const intentCannibal = Object.entries(intentBuckets)
  .map(([k, r]) => ({ intent: k, pages: r.length, sample: r.slice(0, 5) }))
  .filter((x) => x.pages >= 20).sort((a, b) => b.pages - a.pages);

// "near-me" + service+location overlap between /areas/x and /areas/x/installation
const overlapPairs = [];
for (const p of pages) {
  if (p.template === "area") {
    const inst = idx.get(p.route + "/installation");
    if (inst) {
      const sim = jaccard(shingles(p.text), shingles(inst.text));
      overlapPairs.push({ a: p.route, b: inst.route, sim: Math.round(sim * 100) });
    }
  }
  if (p.template === "kampung") {
    const inst = idx.get(p.route + "/installation");
    if (inst) {
      const sim = jaccard(shingles(p.text), shingles(inst.text));
      overlapPairs.push({ a: p.route, b: inst.route, sim: Math.round(sim * 100) });
    }
  }
}
const avgOverlap = Math.round(overlapPairs.reduce((a, x) => a + x.sim, 0) / (overlapPairs.length || 1));
F.cannibalization = {
  exactTitleKeywordClashes: cannibalExactTitle.slice(0, 40),
  exactTitleClashTotal: cannibalExactTitle.reduce((a, x) => a + x.count, 0),
  intentBuckets: intentCannibal,
  parentChildOverlap: { pairs: overlapPairs.length, avgSimilarity: avgOverlap, worst: overlapPairs.sort((a, b) => b.sim - a.sim).slice(0, 12) },
};

// ═══════════════ 7. INTERNAL LINKING ═══════════════
const inbound = new Map();
const outboundMain = new Map();
const allRoutes = new Set(pages.map((p) => p.route));
for (const p of pages) {
  outboundMain.set(p.route, p.mainLinks.length);
  const uniq = new Set(p.mainLinks.map((l) => l.href));
  for (const h of uniq) {
    if (!allRoutes.has(h)) continue;
    if (h === p.route) continue;
    if (!inbound.has(h)) inbound.set(h, new Set());
    inbound.get(h).add(p.route);
  }
}
// global nav/footer links (present on nearly all pages) — count separately
const globalLinkCount = new Map();
for (const p of pages) for (const h of p.allHrefs) globalLinkCount.set(h, (globalLinkCount.get(h) || 0) + 1);
const globalNavLinks = new Set([...globalLinkCount].filter(([, c]) => c > pages.length * 0.5).map(([h]) => h));

const linkStats = pages.map((p) => ({
  route: p.route, tpl: p.template, locale: p.locale,
  inboundContextual: (inbound.get(p.route)?.size) || 0,
  outboundContextual: p.mainLinks.length,
  isGlobalLinked: globalNavLinks.has(p.route),
}));
const orphans = linkStats.filter((x) => x.inboundContextual === 0 && !x.isGlobalLinked);
const nearOrphans = linkStats.filter((x) => x.inboundContextual > 0 && x.inboundContextual <= 2 && !x.isGlobalLinked);
const inboundByTpl = {};
for (const x of linkStats) {
  if (!inboundByTpl[x.tpl]) inboundByTpl[x.tpl] = [];
  inboundByTpl[x.tpl].push(x.inboundContextual);
}
const inboundSummary = Object.entries(inboundByTpl).map(([t, arr]) => {
  const s = arr.slice().sort((a, b) => a - b);
  return { template: t, pages: arr.length, medianInbound: s[Math.floor(s.length / 2)], zeroInbound: arr.filter((v) => v === 0).length };
}).sort((a, b) => b.pages - a.pages);

// anchor text diversity
const anchorMap = new Map();
for (const p of pages) for (const l of p.mainLinks) {
  if (!allRoutes.has(l.href)) continue;
  if (!anchorMap.has(l.href)) anchorMap.set(l.href, new Map());
  const am = anchorMap.get(l.href); am.set(l.anchor, (am.get(l.anchor) || 0) + 1);
}
let genericAnchors = 0, totalAnchors = 0;
const GENERIC = /^(read more|learn more|click here|here|view|see more|more|selengkapnya|baca lagi|了解更多|更多|详情|book now|contact us|get quote)$/i;
for (const p of pages) for (const l of p.mainLinks) { totalAnchors++; if (GENERIC.test(l.anchor.trim())) genericAnchors++; }

F.internalLinking = {
  totalContextualLinks: totalAnchors,
  avgOutboundPerPage: Math.round((totalAnchors / pages.length) * 10) / 10,
  orphanCount: orphans.length,
  orphanSample: orphans.slice(0, 25),
  nearOrphanCount: nearOrphans.length,
  nearOrphanSample: nearOrphans.slice(0, 15),
  inboundByTemplate: inboundSummary,
  genericAnchorShare: pct(genericAnchors, totalAnchors),
  globalNavLinkCount: globalNavLinks.size,
  topLinked: [...inbound].map(([r, s]) => ({ route: r, inbound: s.size })).sort((a, b) => b.inbound - a.inbound).slice(0, 20),
};

// ═══════════════ 8. FAQ QUALITY ═══════════════
const faqStats = { pagesWithFaqSchema: 0, pagesWithoutFaq: [], byTemplate: {} };
const faqQuestionMap = new Map();
for (const p of pages) {
  if (p.faqSchemaCount > 0) faqStats.pagesWithFaqSchema++;
  else faqStats.pagesWithoutFaq.push(p.route);
  if (!faqStats.byTemplate[p.template]) faqStats.byTemplate[p.template] = { pages: 0, withFaq: 0, totalQ: 0, minQ: 999, maxQ: 0 };
  const b = faqStats.byTemplate[p.template];
  b.pages++;
  if (p.faqSchemaCount) { b.withFaq++; b.totalQ += p.faqSchemaCount; b.minQ = Math.min(b.minQ, p.faqSchemaCount); b.maxQ = Math.max(b.maxQ, p.faqSchemaCount); }
}
for (const b of Object.values(faqStats.byTemplate)) { b.avgQ = Math.round((b.totalQ / (b.withFaq || 1)) * 10) / 10; if (b.minQ === 999) b.minQ = 0; }

// FAQ duplication across pages: extract visible question strings from headings + text
for (const p of pages) {
  const qs = (p.text.match(/[A-Z][^.?!]{15,120}\?/g) || []).map((q) => q.trim().toLowerCase());
  for (const q of new Set(qs)) { if (!faqQuestionMap.has(q)) faqQuestionMap.set(q, []); faqQuestionMap.get(q).push(p.route); }
}
const dupFaqQuestions = [...faqQuestionMap].filter(([, r]) => r.length >= 20)
  .map(([q, r]) => ({ q: q.slice(0, 100), count: r.length })).sort((a, b) => b.count - a.count);
F.faq = { ...faqStats, faqlessCount: faqStats.pagesWithoutFaq.length, faqlessSample: faqStats.pagesWithoutFaq.slice(0, 30), duplicatedQuestions: dupFaqQuestions.slice(0, 25) };

// ═══════════════ 9. AEO FEATURE COVERAGE ═══════════════
const aeoTally = {
  faqHeading: 0, howTo: 0, comparison: 0, definition: 0, troubleshoot: 0, pricing: 0, checklist: 0,
  tables: 0, lists: 0, directAnswers: 0, howToSchema: 0, speakable: 0,
};
for (const p of pages) {
  for (const k of Object.keys(p.patterns)) if (p.patterns[k]) aeoTally[k]++;
  if (p.tables > 0) aeoTally.tables++;
  if (p.uls + p.ols > 0) aeoTally.lists++;
  if (p.directAnswerBlocks > 0) aeoTally.directAnswers++;
  if (p.hasHowTo) aeoTally.howToSchema++;
  if (p.hasSpeakable) aeoTally.speakable++;
}
const aeoByTemplate = {};
for (const [t, list] of Object.entries(byTemplate)) {
  const n = list.length;
  aeoByTemplate[t] = {
    pages: n,
    faqPct: pct(list.filter((p) => p.faqSchemaCount > 0).length, n),
    tablePct: pct(list.filter((p) => p.tables > 0).length, n),
    howToPct: pct(list.filter((p) => p.patterns.howTo).length, n),
    howToSchemaPct: pct(list.filter((p) => p.hasHowTo).length, n),
    comparisonPct: pct(list.filter((p) => p.patterns.comparison).length, n),
    definitionPct: pct(list.filter((p) => p.patterns.definition).length, n),
    troubleshootPct: pct(list.filter((p) => p.patterns.troubleshoot).length, n),
    directAnswerAvg: Math.round((list.reduce((a, p) => a + p.directAnswerBlocks, 0) / n) * 10) / 10,
    speakablePct: pct(list.filter((p) => p.hasSpeakable).length, n),
    breadcrumbPct: pct(list.filter((p) => p.hasBreadcrumb).length, n),
  };
}
F.aeo = { tally: aeoTally, total: pages.length, byTemplate: aeoByTemplate };

// ═══════════════ 10. GEO SIGNALS ═══════════════
const geoTally = { author: 0, lastUpdated: 0, externalCitation: 0, reviewSchema: 0, localBusiness: 0, price: 0, warranty: 0, rating: 0, licence: 0, insurance: 0, dateModified: 0, articleSchema: 0 };
for (const p of pages) {
  if (p.signals.author) geoTally.author++;
  if (p.signals.lastUpdated) geoTally.lastUpdated++;
  if (p.externalCitations.length) geoTally.externalCitation++;
  if (p.hasReviewSchema) geoTally.reviewSchema++;
  if (p.hasLocalBusiness) geoTally.localBusiness++;
  if (p.signals.price) geoTally.price++;
  if (p.signals.warranty) geoTally.warranty++;
  if (p.signals.rating) geoTally.rating++;
  if (p.signals.licence) geoTally.licence++;
  if (p.signals.insurance) geoTally.insurance++;
  if (p.hasDateModified) geoTally.dateModified++;
  if (p.hasArticle) geoTally.articleSchema++;
}
const geoByTemplate = {};
for (const [t, list] of Object.entries(byTemplate)) {
  const n = list.length;
  geoByTemplate[t] = {
    pages: n,
    authorPct: pct(list.filter((p) => p.signals.author).length, n),
    freshnessPct: pct(list.filter((p) => p.signals.lastUpdated || p.hasDateModified).length, n),
    citationPct: pct(list.filter((p) => p.externalCitations.length).length, n),
    reviewSchemaPct: pct(list.filter((p) => p.hasReviewSchema).length, n),
    pricePct: pct(list.filter((p) => p.signals.price).length, n),
    entitySchemaPct: pct(list.filter((p) => p.ldTypes.length >= 3).length, n),
  };
}
// schema type coverage
const schemaTypeCount = new Map();
for (const p of pages) for (const t of p.ldTypes) schemaTypeCount.set(t, (schemaTypeCount.get(t) || 0) + 1);
F.geo = {
  tally: geoTally, total: pages.length, byTemplate: geoByTemplate,
  schemaTypes: [...schemaTypeCount].sort((a, b) => b[1] - a[1]),
  pagesWithZeroExternalCitations: pages.filter((p) => !p.externalCitations.length).length,
};

// ═══════════════ 11. TOPIC CLUSTERS / TOPICAL AUTHORITY ═══════════════
const blogPosts = pages.filter((p) => p.template === "blog-post" && p.locale === "en");
const clusterTerms = {
  "installation": /install|pemasangan|安装/i,
  "chemical wash / cleaning": /chemical wash|cuci|clean|清洗/i,
  "chemical overhaul": /overhaul|大修/i,
  "gas / refrigerant": /gas|refrigerant|r32|r410|r22|加气/i,
  "repair / troubleshooting": /repair|fix|not cold|leak|noise|troubleshoot|error code|维修|故障/i,
  "pricing / cost": /price|cost|harga|rm ?\d|费用|价格/i,
  "energy / electricity": /electric|energy|tnb|kwh|bill|save|省电|电费/i,
  "maintenance / servicing": /servic|maintenance|contract|保养|维护/i,
  "buying guide / brands": /brand|best|which|compare|buy|review|inverter|品牌|选购/i,
  "sizing / BTU": /btu|hp|size|sizing|马力|尺寸/i,
  "indoor air quality / health": /mould|mold|bacteria|allergy|air quality|health|霉|健康/i,
  "commercial / office": /commercial|office|shop|retail|商业|办公/i,
};
const clusters = {};
for (const [name, re] of Object.entries(clusterTerms)) {
  const posts = blogPosts.filter((p) => re.test(p.title) || re.test(p.h1s.join(" ")));
  const svc = pages.filter((p) => p.template === "service" && p.locale === "en" && (re.test(p.title) || re.test(p.h1s.join(" "))));
  const prob = pages.filter((p) => p.template === "problem" && p.locale === "en" && (re.test(p.title) || re.test(p.h1s.join(" "))));
  const tools = pages.filter((p) => p.template === "tool" && p.locale === "en" && (re.test(p.title) || re.test(p.h1s.join(" "))));
  // hub existence
  clusters[name] = {
    blogPosts: posts.length, servicePages: svc.length, problemPages: prob.length, tools: tools.length,
    totalEnAssets: posts.length + svc.length + prob.length + tools.length,
    samplePosts: posts.slice(0, 4).map((p) => p.route),
  };
}
// blog interlinking depth
const blogInbound = blogPosts.map((p) => ({ r: p.route, in: inbound.get(p.route)?.size || 0, out: p.mainLinks.filter((l) => l.href.includes("/blog/")).length }));
F.clusters = {
  clusters,
  blogEnCount: blogPosts.length,
  blogAvgInbound: Math.round((blogInbound.reduce((a, x) => a + x.in, 0) / (blogInbound.length || 1)) * 10) / 10,
  blogZeroInbound: blogInbound.filter((x) => x.in === 0).length,
  blogAvgBlogToBlogLinks: Math.round((blogInbound.reduce((a, x) => a + x.out, 0) / (blogInbound.length || 1)) * 10) / 10,
  blogNoBlogLinks: blogInbound.filter((x) => x.out === 0).length,
};

// ═══════════════ 12. LOCALE PARITY ═══════════════
const enRoutes = new Set(pages.filter((p) => p.locale === "en").map((p) => p.route));
const msMissing = [], zhMissing = [];
for (const r of enRoutes) {
  if (r.startsWith("/admin")) continue;
  if (!idx.has("/ms" + (r === "/" ? "" : r))) msMissing.push(r);
  if (!idx.has("/zh" + (r === "/" ? "" : r))) zhMissing.push(r);
}
F.localeParity = {
  en: pages.filter((p) => p.locale === "en").length,
  ms: pages.filter((p) => p.locale === "ms").length,
  zh: pages.filter((p) => p.locale === "zh").length,
  msMissingCount: msMissing.length, msMissingSample: msMissing.slice(0, 20),
  zhMissingCount: zhMissing.length, zhMissingSample: zhMissing.slice(0, 20),
};

// ═══════════════ 13. WORD COUNT + MEDIA ═══════════════
F.media = {
  pagesWithNoImage: pages.filter((p) => p.imgs === 0).length,
  imagesMissingAlt: pages.reduce((a, p) => a + p.imgsNoAlt, 0),
  pagesWithMissingAlt: pages.filter((p) => p.imgsNoAlt > 0).length,
  videoSchemaPages: pages.filter((p) => p.hasVideo).length,
  ogImageMissing: pages.filter((p) => !p.hasOgImage).length,
};

// ═══════════════ SCORING ═══════════════
const n = pages.length;
function clamp(x) { return Math.max(0, Math.min(100, Math.round(x))); }

// Content score components
const cTitle = clamp(100
  - pct(titleIssues.tooLong.length, n) * 1.5
  - pct(titleIssues.empty.length, n) * 4
  - pct(titleIssues.dupExact.reduce((a, x) => a + x.count, 0), n) * 1.2
  - pct(titleIssues.tooShort.length, n) * 0.4);
const cDesc = clamp(100
  - pct(descIssues.missing.length, n) * 4
  - pct(descIssues.tooLong.length, n) * 1.5
  - pct(descIssues.dupExact.reduce((a, x) => a + x.count, 0), n) * 1.5
  - pct(descIssues.truncationArtifact.length, n) * 2);
const cHead = clamp(100
  - pct(hIssues.noH1.length, n) * 3
  - pct(hIssues.multiH1.length, n) * 1.5
  - pct(hIssues.noH2.length, n) * 2
  - pct(dupH1.reduce((a, x) => a + x.count, 0), n) * 0.8);
const cThin = clamp(100 - pct(thinPages.length, n) * 2.2 - pct(pages.filter((p) => p.words < VERY_THIN).length, n) * 3);
const avgDupAll = Object.values(dupSummary).reduce((a, x) => a + x.avgSimilarity * x.pages, 0) / n;
const cDup = clamp(100 - Math.max(0, avgDupAll - 25) * 2.2);
const cCannibal = clamp(100 - Math.min(45, cannibalExactTitle.reduce((a, x) => a + x.count, 0) / n * 100 * 1.1) - Math.max(0, avgOverlap - 40) * 0.7);
const cLinks = clamp(100 - pct(orphans.length, n) * 2 - Math.max(0, 12 - F.internalLinking.avgOutboundPerPage) * 2.5 - F.internalLinking.genericAnchorShare * 0.5);
const cFaq = clamp(pct(faqStats.pagesWithFaqSchema, n) * 0.75 + 25 - Math.min(25, dupFaqQuestions.length * 0.6));
const contentScore = clamp(cTitle * 0.13 + cDesc * 0.13 + cHead * 0.11 + cThin * 0.16 + cDup * 0.16 + cCannibal * 0.13 + cLinks * 0.10 + cFaq * 0.08);

// GEO score
const gEntity = clamp(pct(pages.filter((p) => p.ldTypes.length >= 3).length, n));
const gTrust = clamp((pct(geoTally.price, n) + pct(geoTally.warranty, n) + pct(geoTally.localBusiness, n)) / 3);
const gExpert = clamp(pct(geoTally.author, n) * 0.5 + pct(geoTally.licence, n) * 0.3 + pct(geoTally.reviewSchema, n) * 0.2);
const gCitation = clamp(pct(geoTally.externalCitation, n) * 0.7 + pct(geoTally.dateModified, n) * 0.3);
const gAnswer = clamp(pct(pages.filter((p) => p.directAnswerBlocks >= 2).length, n));
const gFresh = clamp(pct(geoTally.lastUpdated + geoTally.dateModified, n * 2) * 2);
const geoScore = clamp(gEntity * 0.22 + gTrust * 0.20 + gAnswer * 0.20 + gExpert * 0.16 + gCitation * 0.12 + gFresh * 0.10);

// AEO score
const aFaq = clamp(pct(faqStats.pagesWithFaqSchema, n));
const aDirect = clamp(pct(pages.filter((p) => p.directAnswerBlocks >= 3).length, n));
const aTable = clamp(pct(pages.filter((p) => p.tables > 0).length, n));
const aHowTo = clamp(pct(pages.filter((p) => p.hasHowTo).length, n) * 0.6 + pct(pages.filter((p) => p.patterns.howTo).length, n) * 0.4);
const aCompare = clamp(pct(pages.filter((p) => p.patterns.comparison).length, n));
const aDefine = clamp(pct(pages.filter((p) => p.patterns.definition).length, n));
const aTrouble = clamp(pct(pages.filter((p) => p.patterns.troubleshoot).length, n));
const aeoScore = clamp(aFaq * 0.24 + aDirect * 0.20 + aHowTo * 0.14 + aTable * 0.12 + aTrouble * 0.12 + aCompare * 0.10 + aDefine * 0.08);

F.scores = {
  content: { total: contentScore, components: { titles: cTitle, descriptions: cDesc, headings: cHead, thinContent: cThin, duplicate: cDup, cannibalization: cCannibal, internalLinking: cLinks, faq: cFaq } },
  geo: { total: geoScore, components: { entityClarity: gEntity, trustSignals: gTrust, answerFormatting: gAnswer, expertSignals: gExpert, citationWorthiness: gCitation, freshness: gFresh } },
  aeo: { total: aeoScore, components: { faqCoverage: aFaq, directAnswers: aDirect, howTo: aHowTo, tables: aTable, troubleshooting: aTrouble, comparison: aCompare, definitions: aDefine } },
};

writeFileSync("audit/findings.json", JSON.stringify(F, null, 1));
console.log(JSON.stringify(F.scores, null, 1));
console.log("\n--- key counts ---");
console.log("pages:", n);
console.log("thin(<300w):", thinPages.length, " very thin(<150w):", pages.filter((p) => p.words < VERY_THIN).length);
console.log("orphans:", orphans.length, "near-orphans:", nearOrphans.length);
console.log("dup titles:", titleIssues.dupExact.length, "dup descs:", descIssues.dupExact.length);
console.log("faq schema pages:", faqStats.pagesWithFaqSchema, "/", n);
console.log("avg intra-group similarity (weighted):", Math.round(avgDupAll * 10) / 10);
console.log("parent/child overlap avg:", avgOverlap);
