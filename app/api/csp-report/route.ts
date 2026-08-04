import { NextResponse } from "next/server";

/**
 * CSP violation report collector (audit item P0-04).
 *
 * The site sends `Content-Security-Policy-Report-Only` (and later the enforced
 * policy) with `report-uri /api/csp-report` (CSP2) and `report-to csp-endpoint`
 * (CSP3, group defined by the `Report-To` header in next.config.mjs).
 *
 * Browsers POST JSON here on every policy violation. In local/dev runs the
 * payload is printed to the server log; on Vercel it shows up in the function
 * logs, so the next remediation session can review what actually violates the
 * policy before flipping it from report-only to enforcement.
 *
 * The endpoint is intentionally tiny and always answers 204 — it stores
 * nothing, so it cannot be abused as a log-amplifier.
 */

export const dynamic = "force-dynamic";

// CSP3 sends `Content-Type: application/csp-report+json` (or
// `application/reports+json`); CSP2 used `application/csp-report`.
async function readBody(request: Request): Promise<unknown> {
  try {
    const text = await request.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = await readBody(request);

  // Log violations where they are useful: local dev always; production only
  // when CSP_REPORT_LOG=1 so a noisy production deploy cannot spam logs.
  if (process.env.NODE_ENV !== "production" || process.env.CSP_REPORT_LOG === "1") {
    const report =
      (body as { "csp-report"?: unknown } | null)?.["csp-report"] ??
      (body as { body?: unknown } | null)?.body ??
      body;
    if (report) {
      console.warn("[csp-report]", JSON.stringify(report));
    }
  }

  return new NextResponse(null, { status: 204 });
}

// Some legacy clients fire GET against report-uri; answer harmlessly.
export async function GET() {
  return new NextResponse(null, { status: 204 });
}
