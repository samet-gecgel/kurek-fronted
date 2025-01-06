"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import { motion } from "framer-motion";
import { Search, Plus, Calendar, Users, MapPin, Clock, Trophy, GraduationCap, PartyPopper } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";

type TabType = 'all' | 'upcoming' | 'past' | 'cancelled';

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
  isClubOnly: boolean;
  isPaid: boolean;
  price?: number;
  paymentTypes?: string[];
}

const tabs: TabItem[] = [
  { id: 'all', label: 'Tüm Etkinlikler' },
  { id: 'upcoming', label: 'Yaklaşan' },
  { id: 'past', label: 'Geçmiş' },
  { id: 'cancelled', label: 'İptal Edilenler' },
];

const eventTypes = [
  { value: 'yarışma', label: 'Yarışma', icon: Trophy },
  { value: 'eğitim', label: 'Eğitim', icon: GraduationCap },
  { value: 'toplantı', label: 'Toplantı', icon: Users },
  { value: 'sosyal', label: 'Sosyal Etkinlik', icon: PartyPopper }
] as const;

// Örnek veriler
const events: Event[] = [
  {
    id: '1',
    title: 'Kürek Yarışması',
    type: 'yarışma',
    date: '15.03.2024',
    time: '10:00',
    location: 'Sapanca Gölü',
    participants: 30,
    maxParticipants: 50,
    status: 'upcoming',
    description: 'Yıllık kürek yarışması etkinliği',
    isClubOnly: true,
    isPaid: true,
    price: 100,
    paymentTypes: ['credit_card', 'bank_transfer']
  },
  {
    id: '2',
    title: 'Temel Kürek Eğitimi',
    type: 'eğitim',
    date: '20.03.2024',
    time: '14:00',
    location: 'Kürek Kulübü Tesisleri',
    participants: 15,
    maxParticipants: 20,
    status: 'upcoming',
    description: 'Yeni başlayanlar için temel kürek eğitimi',
    isClubOnly: false,
    isPaid: true,
    price: 250,
    paymentTypes: ['credit_card', 'bank_transfer', 'multisport']
  },
  {
    id: '3',
    title: 'Aylık Kulüp Toplantısı',
    type: 'toplantı',
    date: '10.03.2024',
    time: '19:00',
    location: 'Online',
    participants: 45,
    maxParticipants: 100,
    status: 'past',
    description: 'Mart ayı kulüp değerlendirme toplantısı',
    isClubOnly: true,
    isPaid: false
  },
  {
    id: '4',
    title: 'Bahar Şenliği',
    type: 'sosyal',
    date: '05.04.2024',
    time: '12:00',
    location: 'Kulüp Bahçesi',
    participants: 80,
    maxParticipants: 150,
    status: 'upcoming',
    description: 'Geleneksel bahar şenliği etkinliği',
    isClubOnly: false,
    isPaid: true,
    price: 50,
    paymentTypes: ['credit_card', 'cash']
  },
  {
    id: '5',
    title: 'İleri Seviye Kürek Teknikleri',
    type: 'eğitim',
    date: '01.03.2024',
    time: '09:00',
    location: 'Kürek Kulübü Tesisleri',
    participants: 12,
    maxParticipants: 15,
    status: 'past',
    description: 'Deneyimli kürekçiler için ileri seviye teknik eğitim',
    isClubOnly: true,
    isPaid: true,
    price: 300,
    paymentTypes: ['credit_card', 'bank_transfer']
  },
  {
    id: '6',
    title: 'Yaz Kampı Planlaması',
    type: 'toplantı',
    date: '25.03.2024',
    time: '16:00',
    location: 'Toplantı Salonu',
    participants: 10,
    maxParticipants: 20,
    status: 'upcoming',
    description: '2024 yaz kampı planlama toplantısı',
    isClubOnly: true,
    isPaid: false
  },
  {
    id: '7',
    title: 'Mini Maraton',
    type: 'yarışma',
    date: '12.03.2024',
    time: '08:00',
    location: 'Sahil Parkuru',
    participants: 25,
    maxParticipants: 50,
    status: 'cancelled',
    description: 'Kötü hava koşulları nedeniyle iptal edildi',
    isClubOnly: false,
    isPaid: true,
    price: 75,
    paymentTypes: ['credit_card']
  },
  {
    id: '8',
    title: 'Sezon Açılış Partisi',
    type: 'sosyal',
    date: '30.03.2024',
    time: '20:00',
    location: 'Kulüp Restaurant',
    participants: 60,
    maxParticipants: 100,
    status: 'upcoming',
    description: '2024 sezon açılış kutlaması',
    isClubOnly: false,
    isPaid: true,
    price: 150,
    paymentTypes: ['credit_card', 'bank_transfer', 'cash']
  }
];

export default function EventsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const getEventTypeIcon = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.icon : null;
  };

  const filteredEvents = events.filter(event => {
    const matchesTab = activeTab === 'all' || event.status === activeTab;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="container mx-auto p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Etkinlikler</h1>
              <p className="text-zinc-400 mt-1">Tüm etkinlikleri görüntüle ve yönet</p>
            </div>
            <Button
              onClick={() => router.push('/club-manager/events/add')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Etkinlik
            </Button>
          </div>

          <div className="space-y-6">
            {/* Arama ve Filtreler */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Etkinlik ara..."
                />
              </div>
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    className={`${
                      activeTab === tab.id
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Etkinlik Listesi */}
            <div className="grid gap-4">
              {paginatedEvents.map((event) => {
                const EventTypeIcon = getEventTypeIcon(event.type);
                
                return (
                  <Card
                    key={event.id}
                    className="group bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-4 hover:bg-zinc-800/50 transition-all duration-200 cursor-pointer"
                    onClick={() => router.push(`/club-manager/events/details/${event.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                        {EventTypeIcon && <EventTypeIcon className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {event.title}
                          </h3>
                          {event.isClubOnly && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20">
                              Kulübe Özel
                            </span>
                          )}
                          {event.isPaid && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 group-hover:bg-green-500/20">
                              Ücretli
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-400 group-hover:text-zinc-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.participants}/{event.maxParticipants} Katılımcı</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
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
    </div>
  );
} 