'use client';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { HiOutlineTranslate } from 'react-icons/hi';
import Cookies from 'js-cookie';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    
    // NEXT_LOCALE cookie'sini ayarla
    Cookies.set('NEXT_LOCALE', newLocale, { 
      expires: 365,
      path: '/',
      sameSite: 'lax'
    });
    
    // Mevcut URL'den locale kısmını çıkar ve yeni locale ile değiştir
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-2 rounded-lg 
        text-gray-700 dark:text-gray-300
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors duration-200"
    >
      <HiOutlineTranslate className="w-5 h-5" />
      <span className="text-sm font-medium">
        {locale === 'tr' ? 'Türkçe' : 'English'}
      </span>
    </button>
  );
} 