"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Calendar,
  Users,
  MapPin,
  Clock,
  Trophy,
  GraduationCap,
  PartyPopper,
} from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";

type TabType = "all" | "upcoming" | "past" | "cancelled";

interface TabItem {
  id: TabType;
  label: string;
}

const tabs: TabItem[] = [
  { id: "all", label: "Tüm Etkinlikler" },
  { id: "upcoming", label: "Yaklaşan" },
  { id: "past", label: "Geçmiş" },
  { id: "cancelled", label: "İptal Edilenler" },
];

interface Event {
  id: string;
  name: string; // Etkinlik Adı
  type: string; // Etkinlik Türü
  date: string; // Etkinlik Tarihi ve Saati
  time: string; // Etkinlik Yeri
  location: string;
  currentPerson: number;
  maxPerson: number;// Katılımcı Sayısı
  amount: number | null; // Etkinlik Ücreti
  requirements: string; // Katılım Şartları
  program: string; // Kayıt ve Başvuru
  contactName: string;
  contactPhone: string;
  contactEmail: string; // İletişim ve Destek
  isActive: boolean; // Etkinlik Durumu
}

const eventTypes = [
  { value: "yarışma", label: "Yarışma", icon: Trophy },
  { value: "eğitim", label: "Eğitim", icon: GraduationCap },
  { value: "toplantı", label: "Toplantı", icon: Users },
  { value: "sosyal", label: "Sosyal Etkinlik", icon: PartyPopper },
] as const;

// Örnek veri
const events: Event[] = [
  {
    id: "1",
    name: "Kürek Yarışması",
    type: "yarışma",
    date: "15.03.2024",
    time: "10:00",
    location: "Tuzla / İstanbul",
    currentPerson: 30,
    maxPerson: 50,
    amount: 100,
    requirements: "Lisanslı sporcu olmak, 18 yaşından büyük olmak",
    program:
      "09:00 - Kayıt ve Kontrol\n10:00 - Yarış Başlangıcı\n12:00 - Öğle Arası\n13:00 - Final Yarışları\n15:00 - Ödül Töreni",
    contactName: "Ahmet Yılmaz",
    contactPhone: "+90 500 000 00 00",
    contactEmail: "yarisma@kurekkulubu.com",
    isActive: true,
  },
];

export default function EventsPage() {
  const t = useTranslations("events");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const router = useRouter();

  const getEventTypeIcon = (type: string) => {
    const eventType = eventTypes.find((t) => t.value === type);
    return eventType ? eventType.icon : null;
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "md:ml-84" : "md:ml-24"
        } relative z-0`}
      >
        <main className="p-8 pt-6 mt-14 md:mt-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
              <p className="text-zinc-400 mt-1">{t("subtitle")}</p>
            </div>

            <Link href="/admin/controlpanel/events/add">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                {t("addEvent")}
              </Button>
            </Link>
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
                    onClick={() =>
                      router.push(`/admin/controlpanel/events/details/${event.id}`)
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                        {EventTypeIcon && <EventTypeIcon className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {event.name}
                          </h3>
                          {!event.isActive && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                              Pasif
                            </span>
                          )}
                          {event.amount && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                              {new Intl.NumberFormat("tr-TR", {
                                style: "currency",
                                currency: "TRY",
                              }).format(event.amount)}
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
                            <span>
                              {event.currentPerson}/{event.maxPerson} Katılımcı
                            </span>
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
        </main>
      </div>
    </div>
  );
}
