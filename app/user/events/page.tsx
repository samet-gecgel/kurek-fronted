"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Users, MapPin, Clock } from "lucide-react";
import { UserSidebar } from "@/components/layout/user-sidebar";
import { Pagination } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

type TabType = 'all' | 'club' | 'registered';

interface TabItem {
  id: TabType;
  label: string;
}

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'past' | 'cancelled';
  description: string;
  isClubOnly?: boolean;
  isRegistered?: boolean;
}

const tabs: TabItem[] = [
  { id: 'all', label: 'Tüm Etkinlikler' },
  { id: 'club', label: 'Kulüp Etkinlikleri' },
  { id: 'registered', label: 'Kayıtlı Olduklarım' },
];

// Örnek veriler
const events: Event[] = [
  {
    id: '1',
    title: 'Kürek Yarışması',
    type: 'Yarışma',
    date: '2024-03-15',
    time: '10:00',
    location: 'İstanbul, Maltepe Sahili',
    participants: 45,
    maxParticipants: 50,
    status: 'upcoming',
    description: 'Yıllık kürek yarışması etkinliği',
    isClubOnly: true,
    isRegistered: false
  },
  // Diğer etkinlikler...
];

export default function EventsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const itemsPerPage = 6;

  // Filtreleme işlemi
  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (activeTab === 'club') {
      filtered = events.filter(event => event.isClubOnly);
    } else if (activeTab === 'registered') {
      filtered = events.filter(event => event.isRegistered);
    }

    return filtered.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeTab]);

  // Sayfalama için mevcut sayfadaki etkinlikleri al
  const currentEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage]);

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handleRegister = (eventId: string) => {
    // Kayıt işlemleri yapılabilir
    console.log("Etkinliğe kayıt:", eventId);
    // Etkinlik detay sayfasına yönlendir
    router.push(`/user/events/details/${eventId}`);
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <UserSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto"
          >
            {/* Başlık */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-white">Etkinlikler</h1>
                <p className="text-sm text-zinc-400 mt-1">Yaklaşan etkinlikleri keşfedin</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 rounded-lg bg-[#18181B] p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-[#2563EB] text-white'
                        : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-[#1D4ED8] text-white'
                        : 'bg-[#27272A] text-[#A1A1AA]'
                    }`}>
                      {tab.id === 'all' 
                        ? events.length
                        : tab.id === 'club'
                        ? events.filter(event => event.isClubOnly).length
                        : events.filter(event => event.isRegistered).length
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#60A5FA]" size={20} />
                  <input
                    type="text"
                    placeholder="Etkinlik ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#2563EB] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Etkinlik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvents.map(event => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push(`/user/events/details/${event.id}`)}
                  className="bg-[#18181B] rounded-2xl p-6 hover:bg-[#1C1C20] transition-all duration-300 cursor-pointer"
                >
                  {/* Başlık ve Tip */}
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-blue-500 text-sm">
                        {event.type}
                      </span>
                      {event.status === 'upcoming' && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                          Yaklaşan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Detaylar */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Calendar size={16} className="text-zinc-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <MapPin size={16} className="text-zinc-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Users size={16} className="text-zinc-500" />
                      <span>{event.participants}/{event.maxParticipants} Katılımcı</span>
                    </div>
                  </div>

                  {/* Açıklama ve Saat */}
                  <div className="mt-4 text-sm text-zinc-500">
                    {event.description}
                    <div className="mt-2">
                      <Clock size={16} className="inline-block mr-2 text-zinc-500" />
                      {event.time}
                    </div>
                  </div>

                  {/* Buton */}
                  {event.status === 'upcoming' && event.participants < event.maxParticipants && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Kartın tıklama olayını engelle
                        handleRegister(event.id);
                      }}
                      className="w-full py-2.5 mt-4 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      Katıl
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-end">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* CSS Animasyon için style ekleyin */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
} 