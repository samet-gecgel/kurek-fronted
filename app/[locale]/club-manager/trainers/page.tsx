'use client';

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin, Phone, Mail, Calendar, Building2 } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Pagination } from "@/components/ui/pagination";

type TabType = 'all' | 'active' | 'inactive';

interface TabItem {
  id: TabType;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'active', label: 'Aktif' },
  { id: 'inactive', label: 'Pasif' },
];

interface Trainer {
  id: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  specialization: string;
  status: 'active' | 'inactive';
  salary: number;
  startDate: string;
  location: string;
  club: string;
  experience: string;
}

const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    email: 'ahmet@example.com',
    phone: '555-0101',
    specialization: 'Baş Kürek Antrenörü',
    status: 'active',
    salary: 8000,
    startDate: '2023-01-15',
    location: 'İstanbul, Kadıköy',
    club: 'Denizciler Spor Kulübü',
    experience: '5 yıl',
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    image: "https://cdn-icons-png.flaticon.com/512/3048/3048229.png",
    email: 'ayse@example.com',
    phone: '555-0202',
    specialization: 'Yardımcı Kürek Antrenörü',
    status: 'active',
    salary: 7500,
    startDate: '2023-02-01',
    location: 'İstanbul, Beşiktaş',
    club: 'Denizciler Spor Kulübü',
    experience: '3 yıl',
  },
  {
    id: '3',
    name: 'Mehmet Yıldız',
    image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    email: 'mehmet@example.com',
    phone: '555-0303',
    specialization: 'Kürek Antrenörü',
    status: 'active',
    salary: 8500,
    startDate: '2023-03-15',
    location: 'İstanbul, Şişli',
    club: 'Denizciler Spor Kulübü',
    experience: '4 yıl',
  },
  {
    id: '4',
    name: 'Zeynep Kaya',
    image: "https://cdn-icons-png.flaticon.com/512/3048/3048229.png",
    email: 'zeynep@example.com',
    phone: '555-0404',
    specialization: 'Stajyer Kürek Antrenörü',
    status: 'inactive',
    salary: 7000,
    startDate: '2023-04-01',
    location: 'İstanbul, Ataşehir',
    club: 'Denizciler Spor Kulübü',
    experience: '2 yıl',
  },
  {
    id: '5',
    name: 'Can Demir',
    image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    email: 'can@example.com',
    phone: '555-0505',
    specialization: 'Kürek Antrenörü',
    status: 'active',
    salary: 9000,
    startDate: '2023-05-15',
    location: 'İstanbul, Maltepe',
    club: 'Denizciler Spor Kulübü',
    experience: '6 yıl',
  },
  {
    id: '6',
    name: 'Elif Yılmaz',
    image: "https://cdn-icons-png.flaticon.com/512/3048/3048229.png",
    email: 'elif@example.com',
    phone: '555-0606',
    specialization: 'Yardımcı Kürek Antrenörü',
    status: 'active',
    salary: 7200,
    startDate: '2023-06-01',
    location: 'İstanbul, Üsküdar',
    club: 'Denizciler Spor Kulübü',
    experience: '3 yıl',
  },
  {
    id: '7',
    name: 'Burak Şahin',
    image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    email: 'burak@example.com',
    phone: '555-0707',
    specialization: 'Stajyer Kürek Antrenörü',
    status: 'inactive',
    salary: 8300,
    startDate: '2023-07-15',
    location: 'İstanbul, Kartal',
    club: 'Denizciler Spor Kulübü',
    experience: '5 yıl',
  },
];

export default function TrainersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtreleme işlemi
  const filteredTrainers = useMemo(() => {
    let filtered = trainers;

    if (activeTab !== 'all') {
      filtered = trainers.filter(trainer => trainer.status === activeTab);
    }

    return filtered.filter(trainer => 
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeTab]);

  // Sayfalama için mevcut sayfadaki antrenörleri al
  const currentTrainers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTrainers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTrainers, currentPage]);

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage);

  return (
    <div className="flex h-screen bg-zinc-950">
      <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Antrenörler</h1>
              <p className="text-zinc-400">Tüm antrenörleri görüntüleyin ve yönetin</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 rounded-lg bg-zinc-900/50 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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
                      : trainers.filter(trainer => trainer.status === tab.id).length
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
                  placeholder="Antrenör ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push(`/club-manager/trainers/details/${trainer.id}`)}
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
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          trainer.status === 'active'
                            ? 'bg-emerald-400/10 text-emerald-400'
                            : 'bg-rose-400/10 text-rose-400'
                        }`}>
                          {trainer.status === 'active' ? 'Aktif' : 'Pasif'}
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
                      <span>Başlangıç: {new Date(trainer.startDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="py-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 