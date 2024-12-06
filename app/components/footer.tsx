"use client";

import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
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
              Profesyonel kürek eğitimi ve antrenmanlarıyla, sporcularımızı ulusal ve uluslararası başarılara taşıyoruz.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-white transition-all hover:translate-x-2 inline-block duration-200"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link 
                  href="/packages" 
                  className="hover:text-white transition-all hover:translate-x-2 inline-block duration-200"
                >
                  Eğitim Paketleri
                </Link>
              </li>
              <li>
                <Link 
                  href="/trainers" 
                  className="hover:text-white transition-all hover:translate-x-2 inline-block duration-200"
                >
                  Antrenörlerimiz
                </Link>
              </li>
              <li>
                <Link 
                  href="/schedule" 
                  className="hover:text-white transition-all hover:translate-x-2 inline-block duration-200"
                >
                  Antrenman Programı
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <MapPin size={16} className="group-hover:text-blue-500 transition-colors" />
                Akat Mh. Selçuklar Sokak 16/2 Beşiktaş Istanbul
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Phone size={16} className="group-hover:text-blue-500 transition-colors" />
                +90 (212) 000 01 23 
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Mail size={16} className="group-hover:text-blue-500 transition-colors" />
                info@kurektakimi.com
              </li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h3 className="text-white font-semibold mb-4">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-zinc-800/50 mt-12 pt-8 text-center text-sm">
          <p>© 2024 Kürek Takımı. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 