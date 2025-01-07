"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { useParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { getInitials } from "@/utils/getInitials";

interface PackageEvent {
  id: string;
  userId: string;
  fullName: string;
  packageName: string;
  profileImage?: string;
  credits: {
    total: number;
    used: number;
  };
  startDate: string;
  endDate: string;
}

const samplePackages: PackageEvent[] = [
  {
    id: "1",
    userId: "u1",
    fullName: "Ali Kaya",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    packageName: "Aylık Paket",
    credits: {
      total: 12,
      used: 4
    },
    startDate: "2025-01-01",
    endDate: "2025-02-01"
  },
  {
    id: "2",
    userId: "u2",
    fullName: "Ayşe Çelik Demir",
    packageName: "3 Aylık Paket",
    credits: {
      total: 36,
      used: 12
    },
    startDate: "2025-01-03",
    endDate: "2025-04-03"
  },
  {
    id: "3",
    userId: "u3",
    fullName: "Mehmet Yılmaz Kara",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    packageName: "6 Aylık Paket",
    credits: {
      total: 72,
      used: 15
    },
    startDate: "2025-01-04",
    endDate: "2025-07-04"
  },
  {
    id: "4",
    userId: "u4",
    fullName: "Zeynep Demir",
    packageName: "Aylık Paket",
    credits: {
      total: 12,
      used: 8
    },
    startDate: "2025-01-05",
    endDate: "2025-02-05"
  },
  {
    id: "5",
    userId: "u5",
    fullName: "Ahmet Veli Yılmaz",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    packageName: "3 Aylık Paket",
    credits: {
      total: 36,
      used: 20
    },
    startDate: "2025-01-06",
    endDate: "2025-04-06"
  },
  {
    id: "6",
    userId: "u6",
    fullName: "Fatma Nur Çelik",
    packageName: "Aylık Paket",
    credits: {
      total: 12,
      used: 2
    },
    startDate: "2025-01-07",
    endDate: "2025-02-07"
  },
  {
    id: "7",
    userId: "u7",
    fullName: "Can Yücel Aydın",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    packageName: "6 Aylık Paket",
    credits: {
      total: 72,
      used: 30
    },
    startDate: "2025-01-02",
    endDate: "2025-07-02"
  },
  {
    id: "8",
    userId: "u8",
    fullName: "Deniz Yıldız",
    packageName: "Aylık Paket",
    credits: {
      total: 12,
      used: 6
    },
    startDate: "2025-01-06",
    endDate: "2025-02-06"
  }
];

const PackageCard = ({ event, type }: { event: PackageEvent, type: 'start' | 'end' }) => {
  const t = useTranslations("packageCalendar");
  const params = useParams();
  const locale = params.locale as string;
  const calendarLocale = locale === 'tr' ? tr : enUS;
  const isStart = type === 'start';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300"
    >
      {/* Üst Kısım */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden ${
              isStart ? 'bg-emerald-500/10' : 'bg-red-500/10'
            }`}>
              {event.profileImage ? (
                <Image 
                  src={event.profileImage} 
                  alt={event.fullName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`text-lg ${
                  isStart ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {getInitials(event.fullName)}
                </div>
              )}
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{event.fullName}</div>
              <div className="text-sm text-zinc-500">{event.packageName}</div>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
            isStart ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {event.credits.used}/{event.credits.total} Ders
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-zinc-400">{t("creditsStatus")}</span>
            <span className={`font-medium ${
              isStart ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {Math.round((event.credits.used / event.credits.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                isStart ? 'bg-emerald-500' : 'bg-red-500'
              }`}
              style={{ width: `${(event.credits.used / event.credits.total) * 100}%` }}
            />
          </div>
        </div>

        {/* Tarih Bilgileri */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">{t("packageStarts")}</div>
            <div className={`text-sm font-medium text-emerald-400 flex items-center gap-2`}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {format(new Date(event.startDate), "d MMMM yyyy", { locale: calendarLocale })}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">{t("packageEnds")}</div>
            <div className={`text-sm font-medium text-red-400 flex items-center gap-2`}>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {format(new Date(event.endDate), "d MMMM yyyy", { locale: calendarLocale })}
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bilgi Çubuğu */}
      <div className={`px-5 py-3 border-t border-zinc-800/50 flex items-center justify-between ${
        isStart ? 'bg-emerald-500/5' : 'bg-red-500/5'
      }`}>
        <div className="text-sm text-zinc-500">
          {t("remainingDays")}:
        </div>
        <div className={`text-sm font-medium ${
          isStart ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {(() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const endDate = new Date(event.endDate);
            endDate.setHours(0, 0, 0, 0);

            const diffTime = endDate.getTime() - today.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) {
              return '0';
            }
            
            return `${diffDays} ${t("days")}`;
          })()} 
        </div>
      </div>
    </motion.div>
  );
};

export default function CreditsCalendarPage() {
  const t = useTranslations("packageCalendar");
  const params = useParams();
  const locale = params.locale as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<"start" | "end">("start");

  const calendarLocale = locale === 'tr' ? tr : enUS;

  const getDateEvents = (date: Date, type: 'start' | 'end') => {
    return samplePackages.filter(pkg => {
      const eventDate = new Date(type === 'start' ? pkg.startDate : pkg.endDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const selectedDateEvents = getDateEvents(date, activeTab);

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? "md:ml-84" : "md:ml-24"
      } relative z-0`}>
        <div className="container mx-auto p-4 md:p-8 mt-14 md:mt-0">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-gradient-to-b from-white via-white/50 to-transparent rounded-full" />
              <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
            </div>
            <p className="text-zinc-400 mt-2 ml-3">{t("description")}</p>
          </motion.div>

          <Tabs defaultValue="start" className="w-full" onValueChange={(v) => setActiveTab(v as "start" | "end")}>
            <TabsList className="w-full bg-zinc-900/50 border border-zinc-800 mb-6">
              <TabsTrigger 
                value="start" 
                className="w-full data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-500"
              >
                {t("startDates")}
              </TabsTrigger>
              <TabsTrigger 
                value="end" 
                className="w-full data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500"
              >
                {t("endDates")}
              </TabsTrigger>
            </TabsList>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Sol Taraf - Takvim */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">
                      {format(date, "MMMM yyyy", { locale: calendarLocale })}
                    </h2>
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="w-full border-0 shadow-none bg-transparent"
                    locale={calendarLocale}
                    showOutsideDays={false}
                    weekStartsOn={1}
                    modifiers={{
                      hasEvent: (date) => getDateEvents(date, activeTab).length > 0
                    }}
                    modifiersStyles={{
                      hasEvent: {
                        color: activeTab === 'start' ? 'rgb(34 197 94)' : 'rgb(239 68 68)',
                        fontWeight: '600'
                      }
                    }}
                  />
                </div>
              </motion.div>

              {/* Sağ Taraf - Seçili Gün Detayları */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">
                      {format(date, "d MMMM yyyy", { locale: calendarLocale })}
                    </h3>
                    <div className={`px-3 py-1 rounded-lg text-sm ${
                      activeTab === 'start' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {activeTab === 'start' ? t("startDates") : t("endDates")}
                    </div>
                  </div>

                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateEvents.map(event => (
                        <PackageCard key={event.id} event={event} type={activeTab} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-400 py-8">
                      <span className="text-4xl mb-4">📭</span>
                      <p className="text-lg font-medium">{t("noEvents.title")}</p>
                      <p className="text-sm mt-2 text-zinc-500">{t("noEvents.subtitle")}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 