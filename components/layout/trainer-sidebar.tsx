"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Calendar, 
  Clock,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  FileText
} from "lucide-react";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { LanguageSelector } from "@/components/language-selector";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function TrainerSidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const t = useTranslations('trainerSidebar');
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const menuItems = [
    {
      title: t('menu.calendar'),
      href: `/${locale}/trainer/calendar`,
      icon: Calendar,
    },
    {
      title: t('menu.summary'),
      href: `/${locale}/trainer/summary`,
      icon: FileText,
    },
    {
      title: t('menu.availability'),
      href: `/${locale}/trainer/availability`,
      icon: Clock,
    },
    {
      title: t('menu.profile'),
      href: `/${locale}/trainer/profile`,
      icon: User,
    },
  ];

  const handleLogout = () => {
    router.push(`/${locale}/login`);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-4">
      {/* Logo ve başlık */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-lg" />
        {isOpen && <h1 className="text-lg font-semibold text-white">{t('title')}</h1>}
      </div>

      {/* Dil seçici */}
      {isOpen && (
        <div className="mb-4">
          <LanguageSelector />
        </div>
      )}

      {/* Menü öğeleri */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors ${
              pathname === item.href 
                ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' 
                : ''
            }`}
          >
            <item.icon size={20} />
            {isOpen && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      {/* Çıkış Yap butonu */}
      <div className="mt-auto pt-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          {isOpen && <span>{t('logout')}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block fixed top-0 left-0 h-full bg-zinc-900/50 border-r border-zinc-800 transition-all duration-300 z-40 ${
        isOpen ? 'w-64' : 'w-20'
      }`}>
        {/* Toggle butonu */}
        <button 
          onClick={onToggle}
          className="absolute -right-3 top-10 bg-zinc-800 rounded-full p-1.5 hover:bg-zinc-700 transition-colors"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-[100]">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-zinc-900/90 border-zinc-800">
              <Menu className="h-5 w-5 text-zinc-400" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-zinc-900/95 border-zinc-800/50 backdrop-blur-sm z-[100]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
} 