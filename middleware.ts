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

  // Sadece NEXT_LOCALE cookie'sini kontrol et
  const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value;

  // Eğer pathname'de locale yoksa veya kök dizinse
  if (!pathname.match(/^\/(?:tr|en)(?:\/|$)/)) {
    let locale;

    if (preferredLocale && locales.includes(preferredLocale)) {
      // Cookie varsa onu kullan
      locale = preferredLocale;
    } else {
      // Cookie yoksa tarayıcı dilini kontrol et
      const acceptLanguage = request.headers.get('accept-language');
      if (acceptLanguage) {
        const browserLocales = acceptLanguage.split(',')
          .map(lang => lang.split(';')[0].split('-')[0]);
        
        locale = browserLocales.find(lang => locales.includes(lang));
      }
      
      locale = locale || defaultLocale;
    }

    // Tercih edilen dile yönlendir
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\.|images|favicon.ico|404).*)'
  ]
};