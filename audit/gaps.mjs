#!/usr/bin/env node
/** Opportunity sizing: counts the exact number of pages affected by each gap. */
import { readFileSync, writeFileSync } from "node:fs";
const p = JSON.parse(readFileSync("audit/pages.json", "utf8"));
const F = JSON.parse(readFileSync("audit/findings.json", "utf8"));
const n = p.length;
const has = (f) => p.filter(f);
const tpl = (...t) => p.filter((x) => t.includes(x.template));

const G = {};

// 1. brand-area orphans
G.brandAreaOrphans = tpl("brand-area").length;
// 2. area-installation orphans
G.areaInstallOrphans = F.internalLinking.orphanSample.length; // sample only
const orphanTpl = {};
// recompute orphan template distribution
const inbound = new Map();
const routes = new Set(p.map((x) => x.route));
for (const pg of p) for (const h of new Set(pg.mainLinks.map((l) => l.href))) {
  if (routes.has(h) && h !== pg.route) { if (!inbound.has(h)) inbound.set(h, new Set()); inbound.get(h).add(pg.route); }
}
const globalCount = new Map();
for (const pg of p) for (const h of pg.allHrefs) globalCount.set(h, (globalCount.get(h) || 0) + 1);
const globalNav = new Set([...globalCount].filter(([, c]) => c > n * 0.5).map(([h]) => h));
const orphans = p.filter((x) => !(inbound.get(x.route)?.size) && !globalNav.has(x.route));
for (const o of orphans) orphanTpl[o.template] = (orphanTpl[o.template] || 0) + 1;
G.orphansByTemplate = orphanTpl;
G.orphanTotal = orphans.length;
G.orphanByLocale = orphans.reduce((a, x) => { a[x.locale] = (a[x.locale] || 0) + 1; return a; }, {});

// 3. blog FAQ schema gap
const blogAll = tpl("blog-post");
G.blogTotal = blogAll.length;
G.blogWithFaqSchema = blogAll.filter((x) => x.faqSchemaCount > 0).length;
G.blogMissingFaqSchema = blogAll.length - G.blogWithFaqSchema;

// 4. review schema
G.pagesWithReviewSchema = has((x) => x.hasReviewSchema).length;

// 5. og image
G.ogImageMissing = has((x) => !x.hasOgImage).length;
G.ogMissingByTemplate = has((x) => !x.hasOgImage).reduce((a, x) => { a[x.template] = (a[x.template] || 0) + 1; return a; }, {});

// 6. tables on money pages
const money = tpl("service", "problem", "area", "brand", "kampung", "brand-area", "installation-landing", "area-installation", "kampung-installation", "brand-installation");
G.moneyPages = money.length;
G.moneyPagesNoTable = money.filter((x) => x.tables === 0).length;

// 7. HowTo schema
G.pagesWithHowToPattern = has((x) => x.patterns.howTo).length;
G.pagesWithHowToSchema = has((x) => x.hasHowTo).length;
G.howToSchemaGap = has((x) => x.patterns.howTo && !x.hasHowTo).length;

// 8. author / expert signals
G.pagesWithAuthorSignal = has((x) => x.signals.author).length;
G.pagesWithoutAuthorSignal = n - G.pagesWithAuthorSignal;
G.pagesWithFreshness = has((x) => x.signals.lastUpdated || x.hasDateModified).length;
G.pagesWithoutFreshness = n - G.pagesWithFreshness;

// 9. citations
G.pagesWithExternalCitation = has((x) => x.externalCitations.length > 0).length;
G.pagesWithoutCitation = n - G.pagesWithExternalCitation;

// 10. month-stamped titles
G.monthStampedTitles = has((x) => /\b(January|February|March|April|May|June|July|August|September|October|November|December|Januari|Februari|Mac|Mei|Jun|Julai|Ogos|Oktober|Disember)\b|\d{4}年\d{1,2}月/.test(x.title)).length;
G.monthStampedByTemplate = has((x) => /\b(January|February|March|April|May|June|July|August|September|October|November|December|Januari|Februari|Mac|Mei|Jun|Julai|Ogos|Oktober|Disember)\b|\d{4}年\d{1,2}月/.test(x.title))
  .reduce((a, x) => { a[x.template] = (a[x.template] || 0) + 1; return a; }, {});

// 11. kampung thin-ish (median 585w, only 1-2 FAQ, 2 H2)
const kam = tpl("kampung");
G.kampungPages = kam.length;
G.kampungMedianWords = kam.map((x) => x.words).sort((a, b) => a - b)[Math.floor(kam.length / 2)];
G.kampungAvgFaq = Math.round((kam.reduce((a, x) => a + x.faqSchemaCount, 0) / kam.length) * 10) / 10;
G.kampungAvgH2 = Math.round((kam.reduce((a, x) => a + x.h2s.length, 0) / kam.length) * 10) / 10;
G.kampungZeroDirectAnswer = kam.filter((x) => x.directAnswerBlocks === 0).length;

// brand-area
const ba = tpl("brand-area");
G.brandAreaMedianWords = ba.map((x) => x.words).sort((a, b) => a - b)[Math.floor(ba.length / 2)];
G.brandAreaAvgH2 = Math.round((ba.reduce((a, x) => a + x.h2s.length, 0) / ba.length) * 10) / 10;
G.brandAreaZeroDirectAnswer = ba.filter((x) => x.directAnswerBlocks === 0).length;

// 12. direct answers
G.pagesZeroDirectAnswer = has((x) => x.directAnswerBlocks === 0).length;
G.pagesWith3PlusDirectAnswers = has((x) => x.directAnswerBlocks >= 3).length;
G.zeroDABytemplate = has((x) => x.directAnswerBlocks === 0).reduce((a, x) => { a[x.template] = (a[x.template] || 0) + 1; return a; }, {});

// 13. comparison / definition gaps
G.pagesWithComparison = has((x) => x.patterns.comparison).length;
G.pagesWithDefinition = has((x) => x.patterns.definition).length;

// 14. speakable
G.speakablePages = has((x) => x.hasSpeakable).length;

// 15. no images
G.pagesNoImage = has((x) => x.imgs === 0).length;
G.noImageByTemplate = has((x) => x.imgs === 0).reduce((a, x) => { a[x.template] = (a[x.template] || 0) + 1; return a; }, {});

// 16. desc without CTA/price
G.descNoCta = F.descriptions.noCta.length;
G.descNoPrice = F.descriptions.noPrice.length;

// 17. titles without brand
G.titlesNoBrand = F.titles.noBrand.length;

// 18. blog cluster hub check: does a hub page exist per cluster?
G.blogEnPosts = tpl("blog-post").filter((x) => x.locale === "en").length;

// 19. internal link depth: pages whose only inbound is 1-2
const near = p.filter((x) => { const c = inbound.get(x.route)?.size || 0; return c > 0 && c <= 2 && !globalNav.has(x.route); });
G.nearOrphanTotal = near.length;
G.nearOrphanByTemplate = near.reduce((a, x) => { a[x.template] = (a[x.template] || 0) + 1; return a; }, {});

// 20. service pages: 30 pages, huge word counts — check FAQ + howto
const svc = tpl("service");
G.serviceMedianWords = svc.map((x) => x.words).sort((a, b) => a - b)[Math.floor(svc.length / 2)];
G.serviceWithHowTo = svc.filter((x) => x.hasHowTo).length;

// 21. locale distribution of orphan brand-area
G.brandAreaAllOrphan = ba.every((x) => !(inbound.get(x.route)?.size));

writeFileSync("audit/gaps.json", JSON.stringify(G, null, 1));
console.log(JSON.stringify(G, null, 1));
