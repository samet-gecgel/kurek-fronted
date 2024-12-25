import {getRequestConfig} from 'next-intl/server';
import { Locale, routing } from './routing';
 



export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale : Locale = await requestLocale as Locale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`../../public/locales/${locale}/common.json`)).default
  };
});