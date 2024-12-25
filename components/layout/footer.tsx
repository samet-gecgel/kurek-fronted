"use client";

import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50 text-zinc-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Kürek Takımı Logo"
              width={150}
              height={60}
              className="mb-4 hover:opacity-80 transition-opacity"
            />
            <p className="text-sm">
              {t('description')}
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-white transition-all hover:translate-x-2 inline-block duration-200"
                >
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/packages" 
                  className="hover:text-white transition-all hover:translate-x-2 inline-block duration-200"
                >
                  {t('links.packages')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/trainers" 
                  className="hover:text-white transition-all hover:translate-x-2 inline-block duration-200"
                >
                  {t('links.trainers')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/schedule" 
                  className="hover:text-white transition-all hover:translate-x-2 inline-block duration-200"
                >
                  {t('links.schedule')}
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contact.title')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <MapPin size={16} className="group-hover:text-blue-500 transition-colors" />
                {t('contact.address')}
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Phone size={16} className="group-hover:text-blue-500 transition-colors" />
                {t('contact.phone')}
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Mail size={16} className="group-hover:text-blue-500 transition-colors" />
                {t('contact.email')}
              </li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('social.title')}</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] duration-200"
                aria-label={t('social.facebook')}
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] duration-200"
                aria-label={t('social.instagram')}
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] duration-200"
                aria-label={t('social.twitter')}
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-zinc-800/50 mt-12 pt-8 text-center text-sm">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
} 