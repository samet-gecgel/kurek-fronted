"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { useParams } from 'next/navigation';
import Image from "next/image";
import { getInitials } from "@/utils/getInitials";
import { Button } from "@/components/ui/button";

interface BirthdayEvent {
  id: string;
  userId: string;
  fullName: string;
  profileImage?: string;
  birthDate: string;
  email: string;
  phone: string;
  messageStatus: 'pending' | 'sent' | 'failed';
  autoMessageSent?: boolean;
}

const sampleBirthdays: BirthdayEvent[] = [
  {
    id: "1",
    userId: "u1",
    fullName: "Ali Kaya",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    birthDate: "2025-01-10",
    email: "ali@example.com",
    phone: "+90 555 123 4567",
    messageStatus: 'pending',
    autoMessageSent: false
  },
  {
    id: "2",
    userId: "u2",
    fullName: "Ayşe Çelik",
    birthDate: "2025-01-15",
    email: "ayse@example.com",
    phone: "+90 555 234 5678",
    messageStatus: 'pending',
    autoMessageSent: false
  },
  {
    id: "3",
    userId: "u3",
    fullName: "Mehmet Yılmaz",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    birthDate: "2025-01-20",
    email: "mehmet@example.com",
    phone: "+90 555 345 6789",
    messageStatus: 'pending',
    autoMessageSent: false
  },
  {
    id: "4",
    userId: "u4",
    fullName: "Zeynep Demir",
    birthDate: "2025-01-05",
    email: "zeynep@example.com",
    phone: "+90 555 456 7890",
    messageStatus: 'sent',
    autoMessageSent: true
  },
  {
    id: "5",
    userId: "u5",
    fullName: "Ahmet Veli Yılmaz",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    birthDate: "2025-01-12",
    email: "ahmet@example.com",
    phone: "+90 555 567 8901",
    messageStatus: 'pending',
    autoMessageSent: false
  },
  {
    id: "6",
    userId: "u6",
    fullName: "Fatma Nur Çelik",
    birthDate: "2025-01-25",
    email: "fatma@example.com",
    phone: "+90 555 678 9012",
    messageStatus: 'pending',
    autoMessageSent: false
  },
  {
    id: "7",
    userId: "u7",
    fullName: "Can Yücel Aydın",
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    birthDate: "2025-01-08",
    email: "can@example.com",
    phone: "+90 555 789 0123",
    messageStatus: 'pending',
    autoMessageSent: false
  },
  {
    id: "8",
    userId: "u8",
    fullName: "Deniz Yıldız",
    birthDate: "2025-01-30",
    email: "deniz@example.com",
    phone: "+90 555 890 1234",
    messageStatus: 'pending',
    autoMessageSent: false
  }
];

const BirthdayCard = ({ event }: { event: BirthdayEvent }) => {
  const t = useTranslations("birthdayCalendar");
  const [messageStatus, setMessageStatus] = useState(event.messageStatus);
  const [isLoading, setIsLoading] = useState(false);

  const sendBirthdayMessage = async () => {
    setIsLoading(true);
    try {
      // API çağrısı burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API çağrısı
      setMessageStatus('sent');
    } catch {
      setMessageStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300"
    >
      <div className="p-3 md:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 md:mb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden bg-purple-500/10">
              {event.profileImage ? (
                <Image 
                  src={event.profileImage} 
                  alt={event.fullName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-base md:text-lg text-purple-500">
                  {getInitials(event.fullName)}
                </div>
              )}
            </div>
            <div>
              <div className="text-base md:text-lg font-semibold text-white">{event.fullName}</div>
              <div className="text-xs md:text-sm text-zinc-500">
                {format(new Date(event.birthDate), "d MMMM")}
              </div>
            </div>
          </div>
          <Button
            onClick={sendBirthdayMessage}
            disabled={messageStatus === 'sent' || isLoading}
            className={`w-full sm:w-auto text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 ${
              messageStatus === 'sent' 
                ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                : messageStatus === 'failed'
                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
            }`}
          >
            {isLoading ? "..." : messageStatus === 'sent' 
              ? t("messageStatus.sent") 
              : messageStatus === 'failed'
              ? t("messageStatus.failed")
              : t("messageStatus.pending")}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400">
            <span>📧</span>
            <span>{t("email")}: {event.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400">
            <span>📱</span>
            <span>{t("phone")}: {event.phone}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function BirthdaysPage() {
  const t = useTranslations("birthdayCalendar");
  const params = useParams();
  const locale = params.locale as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [date, setDate] = useState<Date>(new Date());

  const calendarLocale = locale === 'tr' ? tr : enUS;

  const getDateBirthdays = (selectedDate: Date) => {
    return sampleBirthdays.filter(birthday => {
      const birthDate = new Date(birthday.birthDate);
      return (
        birthDate.getDate() === selectedDate.getDate() &&
        birthDate.getMonth() === selectedDate.getMonth()
      );
    });
  };

  const selectedDateBirthdays = getDateBirthdays(date);

  const sendAutomaticMessages = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const birthdaysToday = sampleBirthdays.filter(birthday => {
      const birthDate = new Date(birthday.birthDate);
      return (
        birthDate.getDate() === today.getDate() &&
        birthDate.getMonth() === today.getMonth() &&
        !birthday.autoMessageSent
      );
    });

    for (const birthday of birthdaysToday) {
      try {
        // API çağrısı burada yapılacak
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API çağrısı
        
        // Mesaj gönderildi olarak işaretle
        birthday.autoMessageSent = true;
        birthday.messageStatus = 'sent';
        
        console.log(`Otomatik doğum günü mesajı gönderildi: ${birthday.fullName}`);
      } catch (error) {
        console.error(`Mesaj gönderilemedi: ${birthday.fullName}`, error);
      }
    }
  };

  useEffect(() => {
    // İlk yüklemede kontrol et
    sendAutomaticMessages();

    // Her gün 00:00'da kontrol et
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // İlk timer'ı ayarla
    const timer = setTimeout(() => {
      sendAutomaticMessages();
      
      // Sonraki günler için 24 saatlik interval ayarla
      const dailyInterval = setInterval(sendAutomaticMessages, 24 * 60 * 60 * 1000);
      
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? "md:ml-84" : "md:ml-24"
      } relative z-0`}>
        <div className="container max-w-[1500px] mx-auto p-4 md:p-8 mt-14 md:mt-0">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-gradient-to-b from-purple-500 via-purple-500/50 to-transparent rounded-full" />
              <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
            </div>
            <p className="text-zinc-400 mt-2 ml-3">{t("description")}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
            {/* Sol Taraf - Takvim */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full min-w-0"
            >
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 overflow-hidden">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="w-full border-0 shadow-none bg-transparent"
                  locale={calendarLocale}
                  showOutsideDays={false}
                  weekStartsOn={1}
                  modifiers={{
                    hasBirthday: (date) => getDateBirthdays(date).length > 0
                  }}
                  modifiersStyles={{
                    hasBirthday: {
                      color: 'rgb(168 85 247)',
                      fontWeight: '600'
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Sağ Taraf - Doğum Günleri */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full min-w-0"
            >
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4 md:mb-6">
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {format(date, "d MMMM yyyy", { locale: calendarLocale })}
                  </h3>
                  <div className="px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm bg-purple-500/10 text-purple-400">
                    {t("birthdays")}
                  </div>
                </div>

                {selectedDateBirthdays.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateBirthdays.map(birthday => (
                      <BirthdayCard key={birthday.id} event={birthday} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-zinc-400 py-8">
                    <span className="text-4xl mb-4">🎂</span>
                    <p className="text-lg font-medium">{t("noBirthdays.title")}</p>
                    <p className="text-sm mt-2 text-zinc-500">{t("noBirthdays.subtitle")}</p>
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