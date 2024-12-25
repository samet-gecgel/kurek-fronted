import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

// next-intl middleware'ini oluştur
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Cookie'den dil tercihini al
  const preferredLocale = request.cookies.get('preferredLocale')?.value;
  
  // Eğer pathname'de locale yoksa veya kök dizinse
  if (!pathname.match(/^\/(?:tr|en)(?:\/|$)/)) {
    // Cookie varsa ve geçerli bir locale ise onu kullan, yoksa varsayılan locale'i kullan
    const locale = preferredLocale && locales.includes(preferredLocale) 
      ? preferredLocale 
      : defaultLocale;

    // Tercih edilen dile yönlendir
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // Diğer tüm durumlar için next-intl middleware'ini kullan
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!api|_next|_vercel|.*\\.|images|favicon.ico|404).*)'
  ]
};