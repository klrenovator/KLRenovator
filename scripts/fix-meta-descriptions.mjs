#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// FORENSIC FIX (2026-08-15) — regenerate corrupted meta descriptions.
//
// Two classes of data corruption in config/site/*.ts:
//   1. metaDescMS strings pasted with a literal "..." truncation artifact
//      (e.g. "…harga telus &..." ) — 237 occurrences. Google reads the raw
//      ellipsis as content; the sentence is cut mid-word.
//   2. metaDescZH strings written to a 155-CHARACTER budget instead of a
//      155-DISPLAY-WIDTH budget (CJK char = 2 units) — up to 214 width.
//
// This codemod rewrites every affected metaDescMS / metaDescZH in:
//   config/site/areas.ts   (40 areas)
//   config/site/brands.ts  (20 brands)
//   config/site/problems.ts(20 problems)
//   config/site/kampungs.ts(158 kampungs)
// with clean, complete sentences that keep the primary keyword, local
// intent (KL & Selangor), the brand and the WhatsApp CTA, within:
//   MS/EN : 140–155 characters
//   ZH    : ≤155 display width (≈77 CJK chars), ≥120 width
//
// Idempotent: run any number of times.
// ─────────────────────────────────────────────────────────────────────────
import fs from "node:fs";

const wide = (ch) =>
  /[\u1100-\u115f\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6\u3000-\u303f]/.test(ch);
const width = (t) => [...t].reduce((a, c) => a + (wide(c) ? 2 : 1), 0);

// Build an MS/EN description within 140–155 chars from required + optional
// parts. A pool of graded-length fillers guarantees the 140 floor is reached
// without ever crossing 155.
const MS_FILLERS = [" Waranti kerja 1 bulan.", " Harga telus sebelum kerja.", " Slot hari sama ada.", " Harga telus.", " Hari sama.", " Semua jenama."];
const EN_FILLERS = [" 1-month workmanship warranty.", " Free quote before work starts.", " Same-day slots available.", " Same-day.", " All brands.", " Book online."];
function buildLatin(core, extras, fillers) {
  let out = core;
  for (const e of [...extras, ...fillers]) {
    if (out.length >= 140) break;
    if (out.toLowerCase().includes(e.trim().toLowerCase())) continue;
    if (out.length + e.length <= 155) out += e;
  }
  if (out.length > 155) {
    const cut = out.lastIndexOf(" ", 152);
    out = out.slice(0, cut > 100 ? cut : 152).replace(/[,;&\s]+$/, "") + ".";
  }
  return out;
}
const buildMS = (core, extras) => buildLatin(core, extras, MS_FILLERS);
const buildEN = (core, extras) => buildLatin(core, extras, EN_FILLERS);

// Build a ZH description within display width 120–155.
function buildZH(core, extras) {
  let out = core;
  for (const e of extras) {
    if (width(out) >= 120) break;
    if (width(out) + width(e) <= 155) out += e;
  }
  if (width(out) > 155) {
    // trim trailing clauses
    const chars = [...out];
    let w = 0, cutAt = chars.length;
    for (let i = 0; i < chars.length; i++) {
      w += wide(chars[i]) ? 2 : 1;
      if (w > 153) { cutAt = i; break; }
    }
    let s = chars.slice(0, cutAt).join("");
    const b = Math.max(s.lastIndexOf("。"), s.lastIndexOf("，"), s.lastIndexOf("、"));
    if (b >= 40) s = s.slice(0, b);
    out = s + "。";
  }
  return out;
}

function replaceField(src, entityMatcher, field, makeValue) {
  // For every entity block, replace `field: "..."` using entity captures.
  return src.replace(entityMatcher, (block) => {
    const value = makeValue(block);
    if (!value) return block;
    const re = new RegExp(`(${field}:\\s*")[^"]*(")`);
    return block.replace(re, `$1${value.replace(/[$]/g, "$$$$")}$2`);
  });
}

const grab = (block, key) => (block.match(new RegExp(`${key}:\\s*"([^"]*)"`)) || [])[1];

let report = [];

// ── areas.ts ─────────────────────────────────────────────────────────────
{
  const f = "config/site/areas.ts";
  let src = fs.readFileSync(f, "utf8");
  const blocks = /\{\s*\n\s*slug: "[\s\S]*?heroImage:/g;
  src = src.replace(blocks, (block) => {
    const name = grab(block, "name");
    if (!name) return block;
    const oldMS = grab(block, "metaDescMS");
    const oldZH = grab(block, "metaDescZH");
    const oldEN = grab(block, "metaDesc");
    const ms = buildMS(
      `Servis aircond ${name} oleh KL Renovator: cuci kimia, overhaul, tambah gas & pembaikan semua jenama.`,
      [" Tempahan hari sama, harga telus, waranti 1 bulan.", " WhatsApp +60182983573.", " Liputan penuh KL & Selangor."],
    );
    const zh = buildZH(
      `KL Renovator 为 ${name} 提供专业冷气服务：化学清洗、大修、加气及维修。`,
      ["当天预约，价格透明，1个月工艺保修。", "WhatsApp +60182983573。"],
    );
    const en = buildEN(
      `Expert ${name} aircond service by KL Renovator — chemical wash, gas top-up & repair for all major brands.`,
      [" Same-day booking, 1-month warranty.", " WhatsApp +60182983573.", " Transparent pricing across KL & Selangor."],
    );
    if (oldMS) { report.push([`/ms/areas/*→${name}`, oldMS.length, ms.length]); block = block.replace(/(metaDescMS:\s*")[^"]*(")/, `$1${ms}$2`); }
    if (oldZH) { report.push([`/zh/areas/*→${name}`, width(oldZH), width(zh)]); block = block.replace(/(metaDescZH:\s*")[^"]*(")/, `$1${zh}$2`); }
    if (oldEN && (oldEN.length < 140 || /booking &?$|&$/.test(oldEN.trim()))) {
      report.push([`/areas/*→${name}`, oldEN.length, en.length]);
      block = block.replace(/(metaDesc:\s*")[^"]*(")/, `$1${en}$2`);
    }
    return block;
  });
  fs.writeFileSync(f, src);
}

// ── brands.ts ────────────────────────────────────────────────────────────
{
  const f = "config/site/brands.ts";
  let src = fs.readFileSync(f, "utf8");
  const blocks = /\{\s*\n?\s*slug: "[^"]*",\s*name:[\s\S]*?(?=\n\s*\{\s*\n?\s*slug: "|\n\];)/g;
  src = src.replace(blocks, (block) => {
    const name = grab(block, "name");
    if (!name || !grab(block, "metaDescMS")) return block;
    const oldMS = grab(block, "metaDescMS");
    const oldZH = grab(block, "metaDescZH");
    const ms = buildMS(
      `Servis aircond ${name} oleh KL Renovator: cuci kimia, tambah gas, pembaikan & pemasangan di KL & Selangor.`,
      [" Tempahan hari sama, waranti 1 bulan.", " WhatsApp +60182983573.", " Harga telus sebelum kerja."],
    );
    const zh = buildZH(
      `KL Renovator 为 ${name} 冷气提供专业服务：化学清洗、维修、加气及安装。`,
      ["当天预约，价格透明，1个月工艺保修。", "WhatsApp +60182983573。"],
    );
    if (oldMS && oldMS.includes("...")) { report.push([`/ms/brands/*→${name}`, oldMS.length, ms.length]); block = block.replace(/(metaDescMS:\s*")[^"]*(")/, `$1${ms}$2`); }
    if (oldZH && width(oldZH) > 155) { report.push([`/zh/brands/*→${name}`, width(oldZH), width(zh)]); block = block.replace(/(metaDescZH:\s*")[^"]*(")/, `$1${zh}$2`); }
    return block;
  });
  fs.writeFileSync(f, src);
}

// ── problems.ts ──────────────────────────────────────────────────────────
{
  const f = "config/site/problems.ts";
  let src = fs.readFileSync(f, "utf8");
  const blocks = /\{ slug: "[\s\S]*?heroImage: "[^"]*" \}/g;
  src = src.replace(blocks, (block) => {
    const nameMS = grab(block, "nameMS");
    const nameZH = grab(block, "nameZH");
    if (!nameMS) return block;
    const oldMS = grab(block, "metaDescMS");
    const oldZH = grab(block, "metaDescZH");
    const ms = buildMS(
      `${nameMS}? KL Renovator diagnos & baiki di KL & Selangor: cuci kimia, tambah gas & pembaikan semua jenama.`,
      [" Servis hari sama, harga telus.", " WhatsApp +60182983573.", " Waranti kerja 1 bulan."],
    );
    const zh = buildZH(
      `${nameZH}？KL Renovator 当天上门诊断维修：化学清洗、大修、加气及零件更换。`,
      ["价格透明，1个月工艺保修。", "覆盖吉隆坡与雪兰莪。WhatsApp +60182983573。"],
    );
    if (oldMS && oldMS.includes("...")) { report.push([`/ms/problems/*→${nameMS}`, oldMS.length, ms.length]); block = block.replace(/(metaDescMS:\s*")[^"]*(")/, `$1${ms}$2`); }
    if (oldZH && width(oldZH) > 155) { report.push([`/zh/problems/*→${nameZH}`, width(oldZH), width(zh)]); block = block.replace(/(metaDescZH:\s*")[^"]*(")/, `$1${zh}$2`); }
    return block;
  });
  fs.writeFileSync(f, src);
}

// ── kampungs.ts ──────────────────────────────────────────────────────────
{
  const f = "config/site/kampungs.ts";
  let src = fs.readFileSync(f, "utf8");
  const blocks = /\{\s*\n\s*slug: "[\s\S]*?(?=\n\s*\},\s*\n\s*\{\s*\n\s*slug: "|\n\s*\},?\s*\n\];)/g;
  src = src.replace(blocks, (block) => {
    const name = grab(block, "name");
    const parent = grab(block, "parentSlug");
    if (!name) return block;
    const parentName = parent ? parent.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ") : "";
    const oldMS = grab(block, "metaDescMS");
    const oldZH = grab(block, "metaDescZH");
    const oldEN = grab(block, "metaDesc");
    const ms = buildMS(
      `Servis aircond ${name}, ${parentName} oleh KL Renovator: cuci kimia, baiki & pemasangan semua jenama.`,
      [" Tempahan hari sama, waranti 1 bulan.", " WhatsApp +60182983573.", " Harga telus sebelum kerja."],
    );
    const zh = buildZH(
      `KL Renovator 在 ${name} 提供专业冷气服务：化学清洗、维修及安装。`,
      ["当天预约，1个月工艺保修。", "WhatsApp +60182983573。", "价格透明。"],
    );
    const en = buildEN(
      `Professional aircond service in ${name}, ${parentName} — chemical wash, repair & installation by KL Renovator.`,
      [" Same-day booking, 1-month warranty.", " WhatsApp +60182983573.", " Transparent pricing."],
    );
    if (oldMS && oldMS.includes("...")) { report.push([`/ms kampung→${name}`, oldMS.length, ms.length]); block = block.replace(/(metaDescMS:\s*")[^"]*(")/, `$1${ms}$2`); }
    if (oldZH && width(oldZH) > 155) { report.push([`/zh kampung→${name}`, width(oldZH), width(zh)]); block = block.replace(/(metaDescZH:\s*")[^"]*(")/, `$1${zh}$2`); }
    if (oldEN && oldEN.includes("...")) { report.push([`/en kampung→${name}`, oldEN.length, en.length]); block = block.replace(/(metaDesc:\s*")[^"]*(")/, `$1${en}$2`); }
    return block;
  });
  fs.writeFileSync(f, src);
}

console.log(`rewrote ${report.length} meta descriptions`);
for (const [k, o, n] of report.slice(0, 30)) console.log(`  ${k}: ${o} → ${n}`);
if (report.length > 30) console.log(`  …and ${report.length - 30} more`);
