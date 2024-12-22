"use client";

import {
  LayoutDashboard,
  Users,
  Building2,
  UserCog,
  Dumbbell,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Ana Panel",
    icon: LayoutDashboard,
    href: "/super-admin/dashboard",
  },
  {
    title: "Kulüpler",
    icon: Building2,
    href: "/super-admin/clubs",
  },
  {
    title: "Kulüp Yöneticileri",
    icon: UserCog,
    href: "/super-admin/managers",
  },
  {
    title: "Antrenörler",
    icon: Dumbbell,
    href: "/super-admin/trainers",
  },
  {
    title: "Üyeler",
    icon: Users,
    href: "/super-admin/users",
  },
  {
    title: "Adminler",
    icon: UserCog,
    href: "/super-admin/admins",
  },
  {
    title: "Rezervasyonlar",
    icon: Calendar,
    href: "/super-admin/reservations",
  },
  {
    title: "Raporlar",
    icon: BarChart3,
    href: "/super-admin/reports",
  },
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/super-admin/settings",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/super-admin/login');
  };

  return (
    <div className={`fixed h-screen bg-zinc-900/50 border-r border-zinc-800 transition-all duration-300 ease-in-out ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      {/* Toggle butonu */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-10 bg-zinc-800 rounded-full p-1.5 hover:bg-zinc-700 transition-colors"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Sidebar içeriği - flex yapısı ekledik */}
      <div className="flex flex-col h-full p-4">
        {/* Logo ve başlık */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-red-500 rounded-lg" />
          {isOpen && <h1 className="text-lg font-semibold text-white">Super Admin</h1>}
        </div>

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

        {/* Çıkış Yap butonu - mt-auto ile en alta sabitlendi */}
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
} 