// Ensure every typed dynamic route has an explicit static-generation contract.
// Run standalone (`npm run verify:routes`) and in CI before the full build.
import fs from "node:fs";
import path from "node:path";

const APP = path.resolve("app");
const pages = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "page.tsx" && full.split(path.sep).some((part) => /^\[.+\]$/.test(part))) pages.push(full);
  }
}

walk(APP);
const failures = [];
for (const file of pages) {
  const source = fs.readFileSync(file, "utf8");
  const route = `/${path.relative(APP, path.dirname(file)).split(path.sep).filter((part) => !/^\(.+\)$/.test(part)).join("/")}`;
  if (!/export\s+(async\s+)?function\s+generateStaticParams\s*\(/.test(source)) {
    failures.push(`${route}: missing generateStaticParams()`);
  }
  if (!/export\s+const\s+dynamicParams\s*=\s*false/.test(source)) {
    failures.push(`${route}: missing 'export const dynamicParams = false'`);
  }
}

if (failures.length) {
  console.error("✗ Dynamic route contract verification failed:");
  for (const failure of failures) console.error(`  • ${failure}`);
  process.exit(1);
}

console.log(`✓ ${pages.length} dynamic route modules have explicit static params + 404 fallback contracts`);
