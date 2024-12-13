'use client';

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, Calendar, MapPin, Users, Clock } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

type TabType = 'all' | 'upcoming' | 'past' | 'cancelled';

interface TabItem {
  id: TabType;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'upcoming', label: 'Yaklaşan' },
  { id: 'past', label: 'Geçmiş' },
  { id: 'cancelled', label: 'İptal' },
];

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
}

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
    description: 'Yıllık kürek yarışması etkinliği'
  },
  {
    id: '2',
    title: 'Kürek Eğitimi',
    type: 'Eğitim',
    date: '2024-03-20',
    time: '14:00',
    location: 'İstanbul, Kadıköy',
    participants: 15,
    maxParticipants: 20,
    status: 'upcoming',
    description: 'Başlangıç seviyesi kürek eğitimi'
  },
  {
    id: '3',
    title: 'Takım Toplantısı',
    type: 'Toplantı',
    date: '2024-02-10',
    time: '09:00',
    location: 'Kulüp Binası',
    participants: 25,
    maxParticipants: 25,
    status: 'past',
    description: 'Aylık takım değerlendirme toplantısı'
  },
  // Daha fazla etkinlik eklenebilir
];

export default function EventsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtreleme işlemi
  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (activeTab !== 'all') {
      filtered = events.filter(event => event.status === activeTab);
    }

    return filtered.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeTab]);

  // Sayfalama için mevcut sayfadaki etkinlikleri al
  const currentEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage]);

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <div className="flex h-screen bg-zinc-950">
      <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Etkinlikler</h1>
              <p className="text-zinc-400">Tüm etkinlikleri görüntüleyin ve yönetin</p>
            </div>
            <Button 
              onClick={() => router.push('/club-manager/events/add')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Yeni Etkinlik
            </Button>
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
                      ? events.length
                      : events.filter(event => event.status === tab.id).length
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
                  placeholder="Etkinlik ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.length === 0 ? (
              <div className="col-span-full text-center py-8 text-zinc-400">
                Etkinlik bulunamadı
              </div>
            ) : (
              currentEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push(`/club-manager/events/details/${event.id}`)}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full mt-2 inline-block">
                        {event.type}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'upcoming'
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : event.status === 'past'
                        ? 'bg-zinc-400/10 text-zinc-400'
                        : 'bg-rose-400/10 text-rose-400'
                    }`}>
                      {event.status === 'upcoming' ? 'Yaklaşan' : event.status === 'past' ? 'Geçmiş' : 'İptal'}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Calendar size={14} />
                      <span>{new Date(event.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Users size={14} />
                      <span>{event.participants}/{event.maxParticipants} Katılımcı</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-zinc-500 line-clamp-2">
                    {event.description}
                  </p>
                </motion.div>
              ))
            )}
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
        </div>
      </div>
    </div>
  );
} 