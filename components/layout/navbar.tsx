"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';

// Dil seçici komponenti
function LanguageSelector({ currentLocale, onChange }: { currentLocale: string; onChange: (locale: string) => void }) {
  const options = [
    { value: 'tr', label: 'Türkçe', flag: '/images/flags/tr.png' },
    { value: 'en', label: 'English', flag: '/images/flags/en.png' }
  ];

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-zinc-900 text-white border border-zinc-700 rounded-lg pl-8 pr-10 py-1.5 cursor-pointer hover:border-zinc-500 transition-colors focus:outline-none focus:border-blue-500"
        style={{
          backgroundImage: `url(${options.find(opt => opt.value === currentLocale)?.flag})`,
          backgroundPosition: '8px center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '16px 12px',
          paddingLeft: '32px'
        }}
      >
        {options.map(option => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-zinc-900 text-white pl-6 py-2"
            style={{
              backgroundImage: `url(${option.flag})`,
              backgroundPosition: '8px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px 12px'
            }}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <svg className="h-4 w-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const currentLocale = pathname.split('/')[1];

  const handleLanguageChange = (newLocale: string) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;
    
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <nav className="fixed w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="relative">
            <Image
              src="/images/logo.png"
              alt="Kürek Takımı Logo"
              width={120}
              height={48}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-zinc-300 hover:text-white transition-colors">
              {t('home')}
            </Link>
            <Link href="/packages" className="text-zinc-300 hover:text-white transition-colors">
              {t('packages')}
            </Link>
            <Link href="/trainers" className="text-zinc-300 hover:text-white transition-colors">
              {t('trainers')}
            </Link>
            <Link href="/contact" className="text-zinc-300 hover:text-white transition-colors">
              {t('contact')}
            </Link>
            
            {/* Dil Seçici */}
            <LanguageSelector currentLocale={currentLocale} onChange={handleLanguageChange} />
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/trainer/login" className="text-zinc-300 hover:text-white px-4 py-2">
              {t('trainerLogin')}
            </Link>
            <Link href="/user/login" className="text-zinc-900 bg-white hover:bg-zinc-100 px-4 py-2 rounded-lg">
              {t('userLogin')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-zinc-900/95 border-b border-zinc-800"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className="text-lg text-zinc-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                {t('home')}
              </Link>
              <Link 
                href="/packages" 
                onClick={() => setIsOpen(false)}
                className="text-lg text-zinc-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                {t('packages')}
              </Link>
              <Link 
                href="/trainers" 
                onClick={() => setIsOpen(false)}
                className="text-lg text-zinc-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                {t('trainers')}
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="text-lg text-zinc-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                {t('contact')}
              </Link>

              <div className="h-px bg-zinc-800/50 my-4" />

              {/* Mobil Dil Seçici */}
              <div className="px-4">
                <LanguageSelector currentLocale={currentLocale} onChange={handleLanguageChange} />
              </div>

              <div className="h-px bg-zinc-800/50 my-4" />

              <Link 
                href="/trainer/login" 
                onClick={() => setIsOpen(false)}
                className="text-lg text-zinc-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                {t('trainerLogin')}
              </Link>
              <Link 
                href="/user/login" 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-zinc-900 bg-white hover:bg-zinc-100 transition-colors px-4 py-2 rounded-lg"
              >
                {t('userLogin')}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
} 