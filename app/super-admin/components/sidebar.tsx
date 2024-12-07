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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`bg-zinc-900/50 border-r border-zinc-800 backdrop-blur-xl h-screen fixed top-0 left-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <span className="text-lg font-semibold text-white">
                Super Admin
              </span>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-zinc-400" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-zinc-400" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={() => console.log("Çıkış yapılıyor...")}
            className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Çıkış Yap</span>}
          </button>
        </div>
      </div>
    </div>
  );
} 