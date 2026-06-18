import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    // Skip all internal API paths, static files, and _next
    '/((?!api|_next/static|_next/image|favicon.ico|logo|hero|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ['en', 'ms', 'zh'];
const DEFAULT_LOCALE = 'en';

function getLocale(request: NextRequest): string | undefined {
  // 1. Check cookie
  const cookieLocale = request.cookies.get('klr_lang')?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  for (const locale of SUPPORTED_LOCALES) {
    if (acceptLanguage.toLowerCase().includes(locale)) {
      return locale;
    }
  }

  // 3. Default
  return undefined;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/llms') ||
    pathname.startsWith('/aeo') ||
    pathname.startsWith('/site-summary') ||
    pathname.startsWith('/.well-known')
  ) {
    return NextResponse.next();
  }

  // Check if pathname has a locale prefix
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect: /[locale]/... for localized routes
  const localizedRoutes = ['/areas', '/brands', '/problems', '/blog'];
  const isLocalizedRoute = localizedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isLocalizedRoute) {
    const locale = getLocale(request) || DEFAULT_LOCALE;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // For non-localized routes (/, /services, /about, etc.), just continue
  return NextResponse.next();
}
