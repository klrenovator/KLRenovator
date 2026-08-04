/**
 * Sanitizer verification (audit item P0-05 double-check).
 * Run: node --experimental-strip-types scripts/verify-sanitizer.mjs
 */
import { sanitizeBlogHtml } from "../lib/blog-html-sanitize.ts";
import { allPosts } from "../config/blog-posts.ts";

let failures = 0;
const assert = (name, cond) => {
  if (!cond) {
    failures++;
    console.log("FAIL:", name);
  } else {
    console.log("ok:", name);
  }
};

// ── 1. Malicious payloads ────────────────────────────────────────────────
const attacks = [
  ["script tag", '<p>hi</p><script>alert(1)</script>'],
  ["iframe", '<iframe src="https://evil.example"></iframe><p>ok</p>'],
  ["javascript: href", '<a href="javascript:alert(1)">x</a>'],
  ["JS-encoded javascript: href", '<a href="java&#x73;cript:alert(1)">x</a>'],
  ["onerror handler", '<img src="x" onerror="alert(1)">'],
  ["onclick handler", '<a href="/ok" onclick="alert(1)">x</a>'],
  ["inline style", '<p style="background:url(javascript:alert(1))">x</p>'],
  ["style tag", '<style>body{display:none}</style><p>ok</p>'],
  ["object embed", '<object data="https://evil.example"></object>'],
  ["data: img", '<img src="data:text/html;base64,PHNjcmlwdD4=">'],
  ["form element", '<form action="https://evil.example"><input></form><p>ok</p>'],
  ["svg foreign", '<svg><script>alert(1)</script></svg><p>ok</p>'],
  ["meta refresh", '<meta http-equiv="refresh" content="0;url=https://evil.example">'],
  ["video/audio", '<video src="https://evil.example/x.mp4"></video><p>ok</p>'],
  ["base tag", '<base href="https://evil.example/"><a href="/x">x</a>'],
  ["template tag", '<template><script>alert(1)</script></template><p>ok</p>'],
  ["unknown attr", '<a href="/ok" title="t" data-custom="1" id="x" class="evil-class summary-block">x</a>'],
];

for (const [name, payload] of attacks) {
  const out = sanitizeBlogHtml(payload);
  assert(`${name} — no script/iframe/style/object/form/svg/video/audio/base/template/meta tags`, !/<script|<\/?iframe|<\/?style|<object|<form|<svg|<video|<audio|<base|<template|<meta/i.test(out));
  assert(`${name} — no event handlers`, !/\son\w+=/i.test(out));
  assert(`${name} — no javascript:/data: schemes`, !/javascript:|data:text\/html/i.test(out));
  assert(`${name} — no style attribute`, !/style=/i.test(out));
}

// Class filtering: only summary-block survives
{
  const out = sanitizeBlogHtml('<p class="evil-class summary-block">x</p>');
  assert("class filter keeps summary-block", /class="summary-block"/.test(out));
  assert("class filter drops evil-class", !/evil-class/.test(out));
  const out2 = sanitizeBlogHtml('<p class="evil-only">x</p>');
  assert("class filter removes class when nothing safe", !/class=/.test(out2));
}

// Safe markup preserved
{
  const safe = `<h2>Title</h2><p>Hello <strong>world</strong> and <a href="/services/chemical-wash" title="t">link</a>.</p><ul><li>one</li></ul><table><thead><tr><th>H</th></tr></thead><tbody><tr><td colspan="2">C</td></tr></tbody></table><details><summary>S</summary><p>D</p></details><p><em>em</em> <code>code</code></p>`;
  const out = sanitizeBlogHtml(safe);
  assert("safe markup preserved (h2,p,strong,a,ul,li,table,th,td,details,summary,em,code)", ["<h2>", "<p>", "<strong>", 'href="/services/chemical-wash"', "<ul>", "<li>", "<table>", "<th>", 'colspan="2"', "<details>", "<summary>", "<em>", "<code>"].every((s) => out.includes(s)));
}

// ── 2. Whole real corpus: every EN/MS/ZH blog body ──────────────────────
{
  const bodies = allPosts.flatMap((p) => [p.content, p.contentMS, p.contentZH]);
  assert("corpus has bodies", bodies.length > 0);
  let scriptCount = 0;
  for (const raw of bodies) {
    const out = sanitizeBlogHtml(raw);
    if (/<script/i.test(out)) scriptCount++;
    if (/\son\w+=/i.test(out)) {
      failures++;
      console.log("FAIL: event handler survived in a real post body");
    }
    if (/javascript:/i.test(out)) {
      failures++;
      console.log("FAIL: javascript: survived in a real post body");
    }
  }
  assert(`no <script> in any of ${bodies.length} sanitized blog bodies`, scriptCount === 0);
}

console.log(failures === 0 ? "\nALL CHECKS PASSED ✅" : `\n${failures} CHECK(S) FAILED ❌`);
process.exit(failures === 0 ? 0 : 1);
