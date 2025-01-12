"use client";

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';

export function LanguageSelector() {
  const t = useTranslations('language');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'tr', name: t('tr'), flag: '/images/flags/tr.png' },
    { code: 'en', name: t('en'), flag: '/images/flags/en.png' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    Cookies.set('NEXT_LOCALE', newLocale, { 
      expires: 365,
      path: '/',
      sameSite: 'lax'
    });

    const newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
    router.push(newPath);
    setIsOpen(false);
  };

  // Dışarı tıklandığında dropdown'ı kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 rounded-lg px-3 py-2 text-sm border border-zinc-700/50 focus:outline-none focus:border-blue-500 transition-all duration-200"
      >
        <Image
          src={currentLanguage?.flag || '/images/tr.png'}
          alt={currentLanguage?.name || 'TR'}
          width={20}
          height={20}
          className="rounded-sm"
        />
        <span>{currentLanguage?.name}</span>
        <ChevronDown
          size={16}
          className={`text-zinc-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-zinc-800/95 backdrop-blur-sm border border-zinc-700/50 rounded-lg shadow-lg overflow-hidden z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-700/50 transition-colors duration-200 ${
                locale === language.code ? 'bg-zinc-700/50 text-white' : 'text-zinc-200'
              }`}
            >
              <Image
                src={language.flag}
                alt={language.name}
                width={20}
                height={20}
                className="rounded-sm"
              />
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 