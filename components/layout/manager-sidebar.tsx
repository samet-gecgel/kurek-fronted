'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Package,
  Calendar,
  MessageSquare,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  UserCog,
  LogOut
} from 'lucide-react';
import { LanguageSelector } from "@/components/language-selector";

const menuItems = [
  {
    titleKey: 'dashboard',
    icon: LayoutDashboard,
    href: '/club-manager/dashboard',
  },
  {
    titleKey: 'packages',
    icon: Package,
    href: '/club-manager/packages',
  },
  {
    titleKey: 'reservations',
    icon: Calendar,
    href: '/club-manager/reservations',
  },
  {
    titleKey: 'trainers',
    icon: UserCog,
    href: '/club-manager/trainers',
  },
  {
    titleKey: 'events',
    icon: Activity,
    href: '/club-manager/events',
  },
  {
    titleKey: 'messages',
    icon: MessageSquare,
    href: '/club-manager/messages',
  },
  {
    titleKey: 'reports',
    icon: BarChart,
    href: '/club-manager/reports',
  },
  {
    titleKey: 'settings',
    icon: Settings,
    href: '/club-manager/settings',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ManagerSidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const t = useTranslations('managerSidebar');
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/club-manager/login');
  };

  return (
    <div className="h-full bg-zinc-900 border-r border-zinc-800 relative">
      <button
        onClick={onToggle}
        className="absolute -right-3 top-10 bg-zinc-800 rounded-full p-1.5 hover:bg-zinc-700 transition-colors"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="flex flex-col h-full p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-lg" />
          {isOpen && <h1 className="text-lg font-semibold text-white">{t('title')}</h1>}
        </div>

        {/* Language Selector */}
        {isOpen && (
          <div className="mb-6">
            <LanguageSelector />
          </div>
        )}

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
              {isOpen && <span>{t(`menu.${item.titleKey}`)}</span>}
            </Link>
          ))}
        </nav>

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
    </div>
  );
}; 