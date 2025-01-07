"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { motion } from "framer-motion";
import { useParams } from 'next/navigation';
import { enUS } from 'date-fns/locale';

const lessonCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
interface Student {
    id: string;
    name: string;
    position: string; // Teknedeki pozisyonu (1, 2, 3, 4)
    attended: boolean | null;
  }


interface Lesson {
  id: string;
  trainerId: string;
  trainerName: string;
  time: string;
  type: string;
  level: string;
  date: string;
  students: Student[];
}



const sampleSchedule: Lesson[] = [
  {
    id: "1",
    trainerId: "t1",
    trainerName: "Ahmet Yılmaz",
    time: "09:00",
    type: "Dört Tek",
    level: "Başlangıç",
    date: "2025-01-08",
    students: [
      { id: "m1", name: "Ali Kaya", position: "1", attended: null },
      { id: "m2", name: "Mehmet Demir", position: "2", attended: null },
      { id: "m3", name: "Ayşe Çelik", position: "3", attended: null },
      { id: "m4", name: "Can Yıldız", position: "4", attended: null }
    ]
  },
  {
    id: "2",
    trainerId: "t2",
    trainerName: "Can Yıldız",
    time: "09:00",
    type: "Dört Tek",
    level: "İleri Seviye",
    date: "2025-01-08",
    students: [
      { id: "m5", name: "Zeynep Ak", position: "1", attended: null },
      { id: "m6", name: "Ece Demir", position: "2", attended: null },
      { id: "m7", name: "Berk Şahin", position: "3", attended: null },
      { id: "m8", name: "Deniz Kara", position: "4", attended: null }
    ]
  },
  {
    id: "3",
    trainerId: "t3",
    trainerName: "Mehmet Demir",
    time: "10:30",
    type: "Dört Tek",
    level: "Orta Seviye",
    date: "2025-01-07",
    students: [
      { id: "m9", name: "Selin Yılmaz", position: "1", attended: true },
      { id: "m10", name: "Burak Kaya", position: "2", attended: false },
      { id: "m11", name: "Elif Demir", position: "3", attended: true },
      { id: "m12", name: "Mert Can", position: "4", attended: true }
    ]
  },
  {
    id: "4",
    trainerId: "t1",
    trainerName: "Ahmet Yılmaz",
    time: "10:30",
    type: "Dört Tek",
    level: "Başlangıç",
    date: "2025-01-07",
    students: [
      { id: "m13", name: "İrem Su", position: "1", attended: null },
      { id: "m14", name: "Kaan Yıldırım", position: "2", attended: null },
      { id: "m15", name: "Ceren Deniz", position: "3", attended: null },
      { id: "m16", name: "Yusuf Kaya", position: "4", attended: null }
    ]
  }
];

// Ders kartı içeriği için ayrı bir bileşen
const LessonCard = ({ lesson }: { lesson: Lesson }) => {
  const t = useTranslations("lessonCalendar");
  
  return (
    <motion.div
      variants={lessonCardVariants}
      className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300"
    >
      <div className="p-4 border-b border-zinc-800/50">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-3">
          <span className="text-2xl font-bold text-white">{lesson.time}</span>
          <span className="text-sm text-zinc-400">
            <span className="font-medium text-zinc-500">{t('trainer')}:</span> {lesson.trainerName}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-zinc-800/50 text-zinc-300 border-zinc-700">
            {lesson.type}
          </Badge>
          <Badge variant="outline" className="bg-zinc-800/50 text-zinc-300 border-zinc-700">
            {lesson.level}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {lesson.students.map((student) => (
            <div
              key={student.id}
              className="bg-zinc-800/50 rounded-lg p-3 flex items-center justify-between group hover:bg-zinc-800/70 transition-all duration-200"
            >
              <span className="text-zinc-200 font-medium">{student.name}</span>
              <div className="flex items-center gap-2">
                {student.attended === true && (
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
                {student.attended === false && (
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                )}
                {student.attended === null && (
                  <div className="w-2 h-2 rounded-full bg-zinc-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function LessonCalendarPage() {
  const t = useTranslations("lessonCalendar");
  const params = useParams();
  const locale = params.locale as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [date, setDate] = useState<Date>(new Date());

  // Takvim için locale seçimi
  const calendarLocale = locale === 'tr' ? tr : enUS;

  const selectedDateLessons = sampleSchedule.filter(lesson => {
    const lessonDate = new Date(lesson.date);
    return (
      lessonDate.getDate() === date.getDate() &&
      lessonDate.getMonth() === date.getMonth() &&
      lessonDate.getFullYear() === date.getFullYear()
    );
  });

  const sortedLessons = selectedDateLessons.sort((a, b) => 
    a.time.localeCompare(b.time)
  );

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

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sol Taraf - Takvim */}
            <motion.div 
              className="lg:w-[380px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="sticky top-4 space-y-4">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                  {/* <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">
                      {format(date, "MMMM yyyy", { locale: calendarLocale })}
                    </h2>
                  </div> */}
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="w-full border-0 shadow-none bg-transparent"
                    locale={calendarLocale}
                    showOutsideDays={false}
                    weekStartsOn={1}
                  />
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                  <h3 className="text-sm font-medium text-white mb-3">{t("status.title")}</h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-sm text-zinc-400">{t("attended")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm text-zinc-400">{t("notAttended")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-500" />
                      <span className="text-sm text-zinc-400">{t("waiting")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sağ Taraf - Günlük Program */}
            <div className="flex-1">
              <motion.div 
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📅</span>
                  <h2 className="text-xl font-semibold text-white">
                    {format(date, "d MMMM yyyy", { locale: calendarLocale })}
                  </h2>
                </div>
              </motion.div>

              {sortedLessons.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-900/30 backdrop-blur-sm rounded-xl p-8 text-center border border-zinc-800"
                >
                  <div className="flex flex-col items-center justify-center text-zinc-400">
                    <span className="text-4xl mb-4">📭</span>
                    <p className="text-lg font-medium">{t("noLessons.title")}</p>
                    <p className="text-sm mt-2 text-zinc-500">{t("noLessons.subtitle")}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {sortedLessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 