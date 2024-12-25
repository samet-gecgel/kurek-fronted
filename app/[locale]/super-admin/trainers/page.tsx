"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Building2,
  Calendar,
} from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import Sidebar from "@/components/layout/sidebar";

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

// Örnek veri - status eklenmiş hali
const trainers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    specialization: "Baş Antrenör",
    club: "Denizciler Spor Kulübü",
    location: "İstanbul, Kuruçeşme",
    experience: "8 yıl",
    phone: "+90 (532) 111 22 33",
    email: "ahmet@denizkurek.com",
    startDate: "2023-01-15",
    status: "Onaylandı",
  },
  {
    id: 2,
    name: "Ayşe Demir",
    image: "https://cdn-icons-png.flaticon.com/512/3048/3048229.png",
    specialization: "Yardımcı Antrenör",
    club: "Antalya Spor Kulübü",
    location: "İstanbul, Kadıköy",
    experience: "5 yıl",
    phone: "+90 (532) 222 33 44",
    email: "ayse@antalyaspor.org",
    startDate: "2023-03-20",
    status: "Onay Bekliyor",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    specialization: "Stajyer Antrenör",
    club: "İzmir Spor Kulübü",
    location: "İzmir, Karşıyaka",
    experience: "3 yıl",
    phone: "+90 (532) 333 44 55",
    email: "mehmet@izmirsport.com",
    startDate: "2024-01-10",
    status: "Reddedildi",
  },
];

export default function TrainersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtreleme işlemi
  const filteredTrainers = useMemo(() => {
    let filtered = trainers;

    // Önce tab filtrelemesi
    if (activeTab !== 'all') {
      filtered = trainers.filter(trainer => 
        trainer.status === statusMapping[activeTab as keyof typeof statusMapping]
      );
    }

    // Sonra arama filtrelemesi
    return filtered.filter(trainer => 
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeTab]);

  // Tab değiştiğinde sayfa numarasını sıfırla
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Sayfalama
  const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage);
  const currentTrainers = filteredTrainers.slice(
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

      <div className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-0' : 'ml-0'
      }`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Antrenörler</h1>
              <p className="text-zinc-400">Tüm antrenörleri görüntüleyin</p>
            </div>
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
                      ? trainers.length
                      : trainers.filter(trainer => trainer.status === statusMapping[tab.id as keyof typeof statusMapping]).length
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Antrenör veya kulüp ara..."
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

          {/* Trainers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTrainers.length === 0 ? (
              <div className="col-span-full text-center py-8 text-zinc-400">
                Antrenör bulunamadı
              </div>
            ) : (
              currentTrainers.map((trainer) => (
                <Link 
                  key={trainer.id} 
                  href={`/super-admin/trainers/details/${trainer.id}`}
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
                          src={trainer.image}
                          alt={trainer.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{trainer.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">
                            {trainer.specialization}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(trainer.status)}`}>
                            {trainer.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Building2 size={14} />
                        <span>{trainer.club}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <MapPin size={14} />
                        <span>{trainer.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Phone size={14} />
                        <span>{trainer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Mail size={14} />
                        <span>{trainer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Calendar size={14} />
                        <span>Başlangıç: {trainer.startDate}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
} 