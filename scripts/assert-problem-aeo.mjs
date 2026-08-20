#!/usr/bin/env node
/**
 * Word-count + completeness check for config/problem-howto-answers.ts
 * Matches audit/extract.mjs wordCount so DA blocks stay in the 15–120 band.
 */
import { readFileSync } from "node:fs";

const src = readFileSync("config/problem-howto-answers.ts", "utf8");
const slugs = [
  "aircond-not-cold",
  "aircond-water-leaking",
  "aircond-making-noise",
  "aircond-bad-smell",
  "aircond-freezing-up",
  "aircond-low-gas",
  "aircond-gas-leak",
  "aircond-compressor-problem",
  "aircond-pcb-problem",
  "aircond-fan-not-working",
  "aircond-tripping-power",
  "aircond-remote-not-working",
  "aircond-indoor-unit-leaking",
  "aircond-outdoor-unit-not-running",
  "aircond-high-electricity-bill",
  "aircond-weak-airflow",
  "aircond-not-turning-on",
  "aircond-blinking-light",
  "aircond-water-dripping",
  "aircond-thermostat-problems",
];

const wordCount = (t) => {
  const cjk = (t.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = (t.replace(/[\u4e00-\u9fff]/g, " ").match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || []).length;
  return latin + Math.round(cjk / 1.6);
};

let bad = 0;
for (const slug of slugs) {
  if (!src.includes(`"${slug}":`)) {
    console.log("MISSING SLUG", slug);
    bad++;
  }
}

const answerRe = /a: `([^`]{20,})`/g;
let m;
const lengths = [];
while ((m = answerRe.exec(src))) {
  const w = wordCount(m[1]);
  lengths.push(w);
  if (w < 15 || w > 120) {
    console.log("OUT OF RANGE", w, m[1].slice(0, 80));
    bad++;
  } else if (w < 40) {
    console.log("SHORT", w, m[1].slice(0, 90).replace(/\n/g, " "));
  }
}

const min = Math.min(...lengths);
const max = Math.max(...lengths);
const avg = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
console.log(`answers=${lengths.length} min=${min} max=${max} avg=${avg}`);
if (lengths.length !== 240) {
  console.log("expected 240 answers (20 slugs × 3 locales × 4)");
  bad++;
}
process.exit(bad ? 1 : 0);
