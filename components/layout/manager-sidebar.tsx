'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
 // Users,
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

const menuItems = [
  {
    title: 'Ana Panel',
    icon: LayoutDashboard,
    href: '/club-manager/dashboard',
  },
  {
    title: 'Paket Yönetimi',
    icon: Package,
    href: '/club-manager/packages',
  },
  // {
  //   title: 'Üye Yönetimi',
  //   icon: Users,
  //   href: '/club-manager/users',
  // },
  {
    title: 'Rezervasyonlar',
    icon: Calendar,
    href: '/club-manager/reservations',
  },
  {
    title: 'Antrenör Yönetimi',
    icon: UserCog,
    href: '/club-manager/trainers',
  },
  {
    title: 'Etkinlikler',
    icon: Activity,
    href: '/club-manager/events',
  },
  {
    title: 'Mesajlar',
    icon: MessageSquare,
    href: '/club-manager/messages',
  },
  {
    title: 'Raporlar',
    icon: BarChart,
    href: '/club-manager/reports',
  },
  {
    title: 'Ayarlar',
    icon: Settings,
    href: '/club-manager/settings',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ManagerSidebar = ({ isOpen, onToggle }: SidebarProps) => {
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
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-lg" />
          {isOpen && <h1 className="text-lg font-semibold text-white">Kulüp Yönetimi</h1>}
        </div>

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

        <div className="mt-auto pt-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {isOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </div>
    </div>
  );
}; 