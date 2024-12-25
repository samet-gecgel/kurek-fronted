//import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const locales = ['tr', 'en'] as const;
export type Locale = typeof locales[number];

export const routing = {
  locales,
  defaultLocale: 'tr' as const,
  localePrefix: 'always'
} as const;

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);