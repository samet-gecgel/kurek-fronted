"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Building2,
  Calendar,
} from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { Pagination } from "@/app/components/pagination";
import Link from "next/link";

type TabType = 'all' | 'approved' | 'pending' | 'rejected';

interface TabItem {
  id: TabType;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'approved', label: 'Onaylandı' },
  { id: 'pending', label: 'Onay Bekliyor' },
  { id: 'rejected', label: 'Reddedildi' },
];

const statusMapping = {
  approved: 'Onaylandı',
  pending: 'Onay Bekliyor',
  rejected: 'Reddedildi',
};

// Status renkleri için yardımcı fonksiyon
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'onaylandı':
      return 'bg-green-500/10 text-green-500';
    case 'onay bekliyor':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'reddedildi':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-zinc-500/10 text-zinc-500';
  }
};

// Örnek veri
const managers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    role: "Kulüp Yöneticisi",
    club: "Denizciler Spor Kulübü",
    location: "İstanbul, Türkiye",
    phone: "+90 (532) 111 22 33",
    email: "ahmet@example.com",
    startDate: "2024-01-15",
    status: "Onaylandı",
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    image: "https://cdn-icons-png.flaticon.com/512/3048/3048229.png",
    role: "Kulüp Yöneticisi",
    club: "Antalya Spor Kulübü",
    location: "Antalya, Türkiye",
    phone: "+90 (533) 222 33 44",
    email: "ayse@example.com",
    startDate: "2024-02-20",
    status: "Onay Bekliyor",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    role: "Kulüp Yöneticisi",
    club: "İzmir Spor Kulübü",
    location: "İzmir, Türkiye",
    phone: "+90 (533) 333 44 55",
    email: "mehmet@example.com",
    startDate: "2024-02-25",
    status: "Reddedildi",
  },
];

export default function ManagersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtreleme işlemi
  const filteredManagers = useMemo(() => {
    let filtered = managers;

    // Önce tab filtrelemesi
    if (activeTab !== 'all') {
      filtered = managers.filter(manager => 
        manager.status === statusMapping[activeTab as keyof typeof statusMapping]
      );
    }

    // Sonra arama filtrelemesi
    return filtered.filter(manager => 
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeTab]);

  // Tab değiştiğinde sayfa numarasını sıfırla
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Sayfalama
  const totalPages = Math.ceil(filteredManagers.length / itemsPerPage);
  const currentManagers = filteredManagers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-zinc-950">
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-white">Kulüp Yöneticileri</h1>
          <p className="text-zinc-400">Tüm kulüp yöneticilerini görüntüleyin</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg bg-zinc-900/50 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs bg-zinc-900/50 px-2 py-0.5 rounded-full">
                  {tab.id === 'all' 
                    ? managers.length
                    : managers.filter(manager => manager.status === statusMapping[tab.id as keyof typeof statusMapping]).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="text"
                placeholder="İsim, kulüp veya konum ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Managers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentManagers.length === 0 ? (
            <div className="col-span-full text-center py-8 text-zinc-400">
              Yönetici bulunamadı
            </div>
          ) : (
            currentManagers.map((manager) => (
              <Link 
                key={manager.id} 
                href={`/super-admin/managers/details/${manager.id}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={manager.image}
                        alt={manager.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{manager.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">
                          {manager.role}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(manager.status)}`}>
                          {manager.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Building2 size={14} />
                      <span>{manager.club}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <MapPin size={14} />
                      <span>{manager.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Phone size={14} />
                      <span>{manager.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Mail size={14} />
                      <span>{manager.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Calendar size={14} />
                      <span>Başlangıç: {manager.startDate}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
} 