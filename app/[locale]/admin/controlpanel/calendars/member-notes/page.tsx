"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { useParams } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Bell, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getInitials } from "@/utils/getInitials";

interface MemberNote {
  id: string;
  userId: string;
  adminId: string;
  userFullName: string;
  profileImage?: string;
  createdBy: string;
  createdAt: Date;
  content: string;
  isFollowUp: boolean;
  followUpDate: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

const NoteCard = ({ note }: { note: MemberNote }) => {
  const t = useTranslations("memberNoteCalendar");
  const [status, setStatus] = useState(note.status);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
      >
        <div className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 md:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center overflow-hidden bg-blue-500/10">
                {note.profileImage ? (
                  <Image 
                    src={note.profileImage}
                    alt={note.userFullName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-lg font-semibold text-blue-400">
                    {getInitials(note.userFullName)}
                  </div>
                )}
              </div>
              <div>
                <div className="text-base md:text-lg font-semibold text-white">
                  {note.userFullName}
                </div>
                <div className="text-xs md:text-sm text-zinc-500">
                  {format(note.followUpDate, "d MMMM yyyy")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={`
                  ${status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                    status === 'completed' ? 'bg-green-500/10 text-green-500' :
                    'bg-red-500/10 text-red-500'}
                  text-xs md:text-sm px-2 py-1
                `}
              >
                {status === 'pending' ? t("status.pending") :
                 status === 'completed' ? t("status.completed") :
                 t("status.cancelled")}
              </Badge>
              <Button
                onClick={() => setIsDialogOpen(true)}
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <Edit2 size={16} />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm md:text-base text-zinc-300 whitespace-pre-wrap">
              {note.content}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-zinc-400">
                <span>👤</span>
                <span>{t("createdBy")}: {note.createdBy}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <span>📅</span>
                <span>{t("createdAt")}: {format(note.createdAt, "d MMMM yyyy")}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Durum Güncelleme Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 w-[90%] max-w-[500px] p-4 md:p-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg md:text-xl font-semibold text-zinc-100">
              {t("updateStatus")}
            </DialogTitle>
            <p className="text-sm text-zinc-400">
              {format(note.followUpDate, "d MMMM yyyy")}
            </p>
          </DialogHeader>

          <div className="mt-4 md:mt-6">
            <div className="space-y-4 md:space-y-6">
              {/* Üye Bilgileri */}
              <div className="flex items-start gap-3 bg-zinc-800/50 rounded-lg p-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center overflow-hidden bg-blue-500/10">
                  {note.profileImage ? (
                    <Image 
                      src={note.profileImage}
                      alt={note.userFullName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-lg font-semibold text-blue-400">
                      {getInitials(note.userFullName)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-white">
                    {note.userFullName}
                  </div>
                  <div className="text-xs md:text-sm text-zinc-400">
                    {note.createdBy}
                  </div>
                </div>
              </div>

              {/* Not İçeriği */}
              <div className="bg-zinc-800/50 rounded-lg p-3">
                <div className="text-xs md:text-sm text-zinc-300 whitespace-pre-wrap">
                  {note.content}
                </div>
              </div>

              {/* Durum Seçenekleri */}
              <div className="space-y-3">
                <div className="text-xs md:text-sm font-medium text-zinc-400">
                  {t("currentStatus")}:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(['pending', 'completed', 'cancelled'] as const).map((statusOption) => (
                    <Badge
                      key={statusOption}
                      onClick={() => setStatus(statusOption)}
                      className={`
                        ${status === statusOption ? 
                          (statusOption === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                           statusOption === 'completed' ? 'bg-green-500/10 text-green-500' :
                           'bg-red-500/10 text-red-500') :
                          'bg-zinc-800/50 text-zinc-400'
                        }
                        text-xs md:text-sm px-3 py-2 cursor-pointer hover:opacity-80 transition-opacity flex justify-center items-center
                      `}
                    >
                      {t(`status.${statusOption}`)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 mt-6 md:mt-8">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 w-full sm:w-auto"
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={() => {
                  // Burada API çağrısı yapılabilir
                  setIsDialogOpen(false);
                }}
                className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
              >
                {t("save")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Örnek veriler
const sampleNotes: MemberNote[] = [
  {
    id: '1',
    userId: '1',
    adminId: '1',
    userFullName: 'Ahmet Yılmaz',
    profileImage: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    createdBy: 'Admin Deneme',
    createdAt: new Date('2025-01-05'),
    content: 'Üyelik yenileme görüşmesi yapılacak. Özel fiyat teklifi sunulacak.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-10'),
    status: 'pending'
  },
  {
    id: '2',
    userId: '2',
    adminId: '2',
    userFullName: 'Ayşe Demir',
    createdBy: 'Yönetici Ali',
    createdAt: new Date('2025-01-06'),
    content: 'Program değişikliği talebi var. Eğitmenle görüşülecek. Yeni program hazırlanacak.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-15'),
    status: 'completed'
  },
  {
    id: '3',
    userId: '3',
    adminId: '1',
    userFullName: 'Mehmet Kaya',
    createdBy: 'Admin Deneme',
    createdAt: new Date('2025-01-07'),
    content: 'Sağlık raporu eksik. Doktor randevusu alındı, raporun tamamlanması beklenecek.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-18'),
    status: 'pending'
  },
  {
    id: '4',
    userId: '4',
    adminId: '3',
    userFullName: 'Zeynep Şahin',
    createdBy: 'Yönetici Ayşe',
    createdAt: new Date('2025-01-08'),
    content: 'Grup derslerine katılım talebi var. Seviye testi yapılacak ve uygun gruba yerleştirilecek.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-20'),
    status: 'pending'
  },
  {
    id: '5',
    userId: '5',
    adminId: '2',
    userFullName: 'Can Öztürk',
    createdBy: 'Yönetici Ali',
    createdAt: new Date('2025-01-09'),
    content: 'Üyelik dondurma talebi. 2 aylık rapor sunuldu, işlemler tamamlandı.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-14'),
    status: 'completed'
  },
  {
    id: '6',
    userId: '6',
    adminId: '1',
    userFullName: 'Elif Yıldız',
    createdBy: 'Admin Deneme',
    createdAt: new Date('2025-01-10'),
    content: 'Özel ders paketi talebi var. Eğitmen tercihleri görüşülecek.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-16'),
    status: 'cancelled'
  },
  {
    id: '7',
    userId: '7',
    adminId: '3',
    userFullName: 'Burak Demir',
    createdBy: 'Yönetici Ayşe',
    createdAt: new Date('2025-01-11'),
    content: 'Beslenme danışmanlığı talebi. Diyetisyen ile görüşme ayarlanacak.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-17'),
    status: 'pending'
  },
  {
    id: '8',
    userId: '8',
    adminId: '2',
    userFullName: 'Selin Arslan',
    createdBy: 'Yönetici Ali',
    createdAt: new Date('2025-01-12'),
    content: 'Premium üyelik yükseltme görüşmesi yapılacak. Avantajlar anlatılacak.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-19'),
    status: 'pending'
  },
  {
    id: '9',
    userId: '9',
    adminId: '1',
    userFullName: 'Murat Yılmaz',
    createdBy: 'Admin Deneme',
    createdAt: new Date('2025-01-13'),
    content: 'Spor malzemesi şikayeti. Ekipman kontrolü yapılacak ve bilgi verilecek.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-18'),
    status: 'completed'
  },
  {
    id: '10',
    userId: '10',
    adminId: '3',
    userFullName: 'Deniz Aydın',
    createdBy: 'Yönetici Ayşe',
    createdAt: new Date('2025-01-25'),
    content: 'PT seanslarının yeniden planlanması. Program revizyonu yapılacak.',
    isFollowUp: true,
    followUpDate: new Date('2025-01-30'),
    status: 'pending'
  }
];

export default function MemberNotesPage() {
  const t = useTranslations("memberNoteCalendar");
  const params = useParams();
  const locale = params.locale as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [date, setDate] = useState<Date>(new Date());

  const calendarLocale = locale === 'tr' ? tr : enUS;

  const getDateNotes = (selectedDate: Date) => {
    return sampleNotes.filter(note => {
      const followUpDate = new Date(note.followUpDate);
      return (
        followUpDate.getDate() === selectedDate.getDate() &&
        followUpDate.getMonth() === selectedDate.getMonth() &&
        followUpDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  const selectedDateNotes = getDateNotes(date);

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
              <div className="h-8 w-1 bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent rounded-full" />
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
                    hasNote: (date) => getDateNotes(date).length > 0
                  }}
                  modifiersStyles={{
                    hasNote: {
                      color: 'rgb(59 130 246)',
                      fontWeight: '600'
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Sağ Taraf - Notlar */}
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
                  <div className="flex items-center gap-2 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm bg-blue-500/10 text-blue-400">
                    <Bell size={14} />
                    {t("followUpNotes")}
                  </div>
                </div>

                {selectedDateNotes.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateNotes.map(note => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-zinc-400 py-8">
                    <span className="text-4xl mb-4">📝</span>
                    <p className="text-lg font-medium">{t("noNotes.title")}</p>
                    <p className="text-sm mt-2 text-zinc-500">{t("noNotes.subtitle")}</p>
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