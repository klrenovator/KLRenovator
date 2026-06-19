import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE (KL Renovator project):
// Multi-language URL routing (/en/, /ms/, /zh/) is planned but the actual
// localized pages under app/[lang]/ have not been built yet.
// This middleware is intentionally a no-op passthrough for now so that
// /areas/*, /brands/*, /problems/*, /blog/* continue working normally.
// Do NOT re-enable locale redirects here until the app/[lang] routes
// actually exist and have been tested — otherwise every page under
// /areas, /brands, /problems, and /blog will 404 again.

export const config = {
  matcher: [],
};

export function middleware(request: NextRequest) {
  return NextResponse.next();
}
