"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { useParams } from 'next/navigation';
import Image from "next/image";
import { getInitials } from "@/utils/getInitials";

interface ReminderEvent {
  id: string;
  userId: string;
  fullName: string;
  profileImage?: string;
  packageName: string;
  credits: {
    total: number;
    used: number;
  };
  endDate: string;
}

const sampleReminders: ReminderEvent[] = [
  {
    id: "1",
    userId: "u1",
    fullName: "Ali Kaya",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    packageName: "Aylık Paket",
    credits: {
      total: 12,
      used: 8
    },
    endDate: "2025-01-12" // 5 gün kaldı
  },
  {
    id: "2",
    userId: "u2",
    fullName: "Ayşe Çelik Demir",
    packageName: "3 Aylık Paket",
    credits: {
      total: 36,
      used: 30
    },
    endDate: "2025-01-10" // 3 gün kaldı
  },
  {
    id: "3",
    userId: "u3",
    fullName: "Mehmet Yılmaz",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    packageName: "6 Aylık Paket",
    credits: {
      total: 72,
      used: 65
    },
    endDate: "2025-01-09" // 2 gün kaldı
  }
];

const ReminderCard = ({ event }: { event: ReminderEvent }) => {
  const t = useTranslations("reminderCalendar");
  const params = useParams();
  const locale = params.locale as string;
  const calendarLocale = locale === 'tr' ? tr : enUS;

  // Kalan gün hesaplama
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(event.endDate);
  endDate.setHours(0, 0, 0, 0);
  const diffTime = endDate.getTime() - today.getTime();
  const remainingDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-red-500/20 hover:border-red-500/30 transition-all duration-300"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden bg-red-500/10">
              {event.profileImage ? (
                <Image 
                  src={event.profileImage} 
                  alt={event.fullName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-lg text-red-500">
                  {getInitials(event.fullName)}
                </div>
              )}
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{event.fullName}</div>
              <div className="text-sm text-zinc-500">{event.packageName}</div>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500/10 text-red-400">
            {remainingDays} {t("days")}
          </div>
        </div>

        <div className="space-y-3">
          {/* Kullanım Durumu */}
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-zinc-400">{t("creditsStatus")}</span>
              <span className="text-red-400">
                {event.credits.used}/{event.credits.total}
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full bg-red-500 transition-all duration-500"
                style={{ width: `${(event.credits.used / event.credits.total) * 100}%` }}
              />
            </div>
          </div>

          {/* Bitiş Tarihi */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">{t("packageEnds")}</span>
            <span className="text-red-400 font-medium">
              {format(new Date(event.endDate), "d MMMM yyyy", { locale: calendarLocale })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function RemindersPage() {
  const t = useTranslations("reminderCalendar");
  const params = useParams();
  const locale = params.locale as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [date, setDate] = useState<Date>(new Date());

  const calendarLocale = locale === 'tr' ? tr : enUS;

  // Son 5 gün kalan paketleri filtrele
  const getReminders = (selectedDate: Date) => {
    const checkDate = new Date(selectedDate);
    checkDate.setHours(0, 0, 0, 0);

    return sampleReminders.filter(reminder => {
      const endDate = new Date(reminder.endDate);
      endDate.setHours(0, 0, 0, 0);
      const diffTime = endDate.getTime() - new Date().getTime();
      const daysUntilEnd = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // Seçili tarih, bitiş tarihinden önceki 5 gün içinde mi kontrol et
      const reminderStartDate = addDays(endDate, -5);
      reminderStartDate.setHours(0, 0, 0, 0);

      return daysUntilEnd <= 5 && daysUntilEnd >= 0 && 
             checkDate >= reminderStartDate && checkDate <= endDate;
    });
  };

  const selectedDateReminders = getReminders(date);

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
              <div className="h-8 w-1 bg-gradient-to-b from-red-500 via-red-500/50 to-transparent rounded-full" />
              <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
            </div>
            <p className="text-zinc-400 mt-2 ml-3">{t("description")}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sol Taraf - Takvim */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="w-full border-0 shadow-none bg-transparent"
                  locale={calendarLocale}
                  showOutsideDays={false}
                  weekStartsOn={1}
                  modifiers={{
                    hasReminder: (date) => getReminders(date).length > 0
                  }}
                  modifiersStyles={{
                    hasReminder: {
                      color: 'rgb(239 68 68)',
                      fontWeight: '600'
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Sağ Taraf - Hatırlatıcılar */}
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
                  <div className="px-3 py-1 rounded-lg text-sm bg-red-500/10 text-red-400">
                    {t("packageReminders")}
                  </div>
                </div>

                {selectedDateReminders.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateReminders.map(reminder => (
                      <ReminderCard key={reminder.id} event={reminder} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-zinc-400 py-8">
                    <span className="text-4xl mb-4">🎉</span>
                    <p className="text-lg font-medium">{t("noReminders.title")}</p>
                    <p className="text-sm mt-2 text-zinc-500">{t("noReminders.subtitle")}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 