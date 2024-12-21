"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  User,
  Package,
  Calendar,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";

const menuItems = [
  {
    title: "Profilim",
    href: "/user/profile",
    icon: User,
  },
  {
    title: "Paketler",
    href: "/user/packages",
    icon: Package,
  },
  {
    title: 'Etkinlikler',
    icon: Activity,
    href: '/user/events',
  },
  {
    title: "Rezervasyonlarım",
    href: "/user/reservations",
    icon: Calendar,
  },
  {
    title: "Arkadaşlarım",
    href: "/user/friends",
    icon: Users,
  },
];

interface UserSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function UserSidebar({ isOpen, onToggle }: UserSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div 
      className={`fixed top-0 left-0 h-full bg-zinc-900/50 border-r border-zinc-800/50 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Toggle butonu */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-10 bg-zinc-800 rounded-full p-1.5 hover:bg-zinc-700 transition-colors"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Sidebar içeriği */}
      <div className="flex flex-col h-full p-4">
        {/* Logo ve başlık */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-lg" />
          {isOpen && <h1 className="text-lg font-semibold text-white">Kullanıcı Paneli</h1>}
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

        {/* Çıkış Yap butonu */}
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