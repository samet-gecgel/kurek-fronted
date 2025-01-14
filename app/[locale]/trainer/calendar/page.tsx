"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrainerSidebar } from "@/components/layout/trainer-sidebar";
import { enUS, tr } from 'date-fns/locale'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Status } from "@/types/enums/Status";
import { BoatClass } from "@/types/enums/BoatClass";
import { LessonLevel } from "@/types/enums/LessonLevel";

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

const studentCardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
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
  position: string;
  attended: Status;
}

interface Lesson {
  id: string;
  trainerId: string;
  trainerName: string;
  time: string;
  type: BoatClass;
  level: LessonLevel;
  date: string;
  students: Student[];
  status: Status;
  cancelReason?: string; 
  canceledBy?: string;
  canceledAt?: string;
}

export default function CalendarPage() {
  const t = useTranslations('trainerCalendar');
  const params = useParams();
  const locale = params.locale as string;
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: "1",
      trainerId: "t1",
      trainerName: "Ahmet Yılmaz",
      time: "09:00",
      type: BoatClass.QUAD_COXED,
      level: LessonLevel.BEGINNER,
      date: "2025-01-17",
      students: [
        { id: "s1", name: "Ahmet Yılmaz", position: "1", attended: Status.WAITING },
        { id: "s2", name: "Mehmet Demir", position: "2", attended: Status.WAITING },
        { id: "s3", name: "Ali Kaya", position: "3", attended: Status.WAITING },
        { id: "s4", name: "Ayşe Çelik", position: "4", attended: Status.WAITING }
      ],
      status: Status.SCHEDULED
    },
    {
      id: "2",
      trainerId: "t1",
      trainerName: "Ahmet Yılmaz",
      time: "10:30",
      type: BoatClass.DOUBLE_FOLLOW,
      level: LessonLevel.ADVANCED,
      date: "2025-01-17",
      students: [
        { id: "s5", name: "Can Yıldız", position: "1", attended: Status.WAITING },
        { id: "s6", name: "Zeynep Ak", position: "2", attended: Status.WAITING },
        { id: "s7", name: "Ece Demir", position: "3", attended: Status.WAITING },
        { id: "s8", name: "Berk Şahin", position: "4", attended: Status.WAITING }
      ],
      status: Status.SCHEDULED
    },
    {
      id: "3",
      trainerId: "t2",
      trainerName: "Mehmet Demir",
      time: "14:00",
      type: BoatClass.SINGLE_FOLLOW,
      level: LessonLevel.INTERMEDIATE,
      date: "2025-01-17",
      students: [
        { id: "s9", name: "Deniz Kara", position: "1", attended: Status.ATTENDED },
        { id: "s10", name: "Selin Yılmaz", position: "2", attended: Status.ABSENT },
        { id: "s11", name: "Burak Kaya", position: "3", attended: Status.ATTENDED },
        { id: "s12", name: "Elif Demir", position: "4", attended: Status.EXCUSED }
      ],
      status: Status.IN_PROGRESS
    },
    {
      id: "4",
      trainerId: "t1",
      trainerName: "Ahmet Yılmaz",
      time: "15:30",
      type: BoatClass.DOUBLE_PRIVATE,
      level: LessonLevel.BEGINNER,
      date: "2025-01-18",
      students: [
        { id: "s13", name: "İrem Su", position: "1", attended: Status.WAITING },
        { id: "s14", name: "Kaan Yıldırım", position: "2", attended: Status.WAITING },
        { id: "s15", name: "Ceren Deniz", position: "3", attended: Status.WAITING },
        { id: "s16", name: "Yusuf Kaya", position: "4", attended: Status.WAITING }
      ],
      status: Status.SCHEDULED
    },
    {
      id: "5",
      trainerId: "t3",
      trainerName: "Ayşe Çelik",
      time: "16:00",
      type: BoatClass.QUAD_COXED,
      level: LessonLevel.ADVANCED,
      date: "2025-01-20",
      students: [
        { id: "s17", name: "Yusuf Kaya", position: "1", attended: Status.WAITING },
        { id: "s18", name: "Zehra Demir", position: "2", attended: Status.WAITING },
        { id: "s19", name: "Emre Can", position: "3", attended: Status.WAITING },
        { id: "s20", name: "Aylin Yıldız", position: "4", attended: Status.WAITING }
      ],
      status: Status.SCHEDULED
    },
    {
      id: "6",
      trainerId: "t1",
      trainerName: "Ahmet Yılmaz",
      time: "11:00",
      type: BoatClass.SINGLE_FOLLOW,
      level: LessonLevel.BEGINNER,
      date: "2025-01-17",
      students: [
        { id: "s21", name: "Yağmur Kaya", position: "1", attended: Status.WAITING },
        { id: "s22", name: "Arda Demir", position: "2", attended: Status.WAITING },
        { id: "s23", name: "Sude Yılmaz", position: "3", attended: Status.WAITING },
        { id: "s24", name: "Emir Can", position: "4", attended: Status.WAITING }
      ],
      status: Status.CANCELLED,
      cancelReason: t('status.weatherCancellation'),
      canceledBy: "Admin",
      canceledAt: "2025-01-16T15:30:00"
    }
  ]);

  const selectedDateLessons = lessons.filter(lesson => {
    const lessonDate = new Date(lesson.date);
    return (
      lessonDate.getDate() === date.getDate() &&
      lessonDate.getMonth() === date.getMonth() &&
      lessonDate.getFullYear() === date.getFullYear()
    );
  });

  const handleDateSelect = (newDate: Date) => {
    setDate(newDate);
  };

  const handleAttendance = (lessonId: string, studentId: string, attended: Status) => {
    const updatedLessons = lessons.map(lesson => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          students: lesson.students.map(student => 
            student.id === studentId ? { ...student, attended } : student
          )
        };
      }
      return lesson;
    });
    setLessons(updatedLessons);
    setSelectedLesson(prev => {
      if (prev && prev.id === lessonId) {
        return {
          ...prev,
          students: prev.students.map(student =>
            student.id === studentId ? { ...student, attended } : student
          )
        };
      }
      return prev;
    });
  };

  const handleSave = () => {
    // API'ye kaydetme işlemi burada yapılacak
    console.log("Yoklama kaydedildi");
  };

  const openAttendanceDialog = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsAttendanceDialogOpen(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dersi olan günleri kontrol eden fonksiyon
  const hasLessonsOnDate = (date: Date) => {
    return lessons.some(lesson => {
      const lessonDate = new Date(lesson.date);
      return (
        lessonDate.getDate() === date.getDate() &&
        lessonDate.getMonth() === date.getMonth() &&
        lessonDate.getFullYear() === date.getFullYear()
      );
    });
  };



  if (!mounted) {
    return (
      <div className="flex h-screen bg-[#0A0A0B]">
              <TrainerSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
        <div className="flex-1 overflow-y-auto ml-20 lg:ml-64 p-8">
          <div className="flex items-center justify-center h-full">
            <div className="text-zinc-400">{t('loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  const lessonContent = selectedDateLessons.map((lesson) => (
    <motion.div
      key={lesson.id}
      variants={lessonCardVariants}
      className="relative group md:pl-16"
    >
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-zinc-700 to-transparent hidden md:block" />
      
      <div className="relative">
        <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-white/10 border-4 border-zinc-900 group-hover:border-white/20 group-hover:bg-white/20 transition-all duration-300 hidden md:block" />
        <div className={`
          bg-zinc-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 
          hover:border-white/10 transition-all duration-300 shadow-lg hover:shadow-xl
          ${lesson.status === Status.CANCELLED ? 'opacity-75' : ''}
        `}>
          <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/50">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h3 className="text-3xl font-bold text-white">{lesson.time}</h3>
              <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-zinc-800/50 text-zinc-300 border-zinc-700">
                {lesson.type}
              </Badge>
                <Badge className="bg-zinc-800/80 text-zinc-300 px-3 py-1">
                  {lesson.level}
                </Badge>
                {lesson.status === Status.CANCELLED && (
                  <Badge variant="destructive" className="px-3 py-1">
                    {t('status.cancelled')}
                  </Badge>
                )}
              </div>
            </div>
            
            {lesson.status === Status.CANCELLED ? (
              <div className="flex flex-col gap-1">
                <p className="text-red-400 text-sm">{lesson.cancelReason}</p>
                <p className="text-zinc-500 text-xs">
                  {t('status.cancelledBy')}
                  {t('status.dateFormat.separator')}
                  {new Date(lesson.canceledAt!).toLocaleString(locale, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            ) : (
              <Button
                onClick={() => openAttendanceDialog(lesson)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white"
                disabled={[Status.CANCELLED, Status.COMPLETED].includes(lesson.status)}
              >
                {t('attendance.take')}
              </Button>
            )}
          </div>

          <div className="p-4 md:p-6">
            <motion.div
              variants={studentCardVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {lesson.students.map((student) => (
                <motion.div
                  key={student.id}
                  variants={studentCardVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-zinc-800/20 backdrop-blur-sm rounded-xl p-4 hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-lg">
                      {student.name}
                    </span>
                    {student.attended === Status.ATTENDED && (
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                    {student.attended === Status.ABSENT && (
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    )}
                    {student.attended === Status.EXCUSED && (
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    )}
                    {student.attended === Status.WAITING && (
                      <div className="w-2 h-2 rounded-full bg-zinc-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  ));

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const attendanceDialog = (
    <Dialog open={isAttendanceDialogOpen} onOpenChange={setIsAttendanceDialogOpen}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[95%] max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {selectedLesson?.time} - {t('attendance.title')}
          </DialogTitle>
        </DialogHeader>


        
        <div className="grid grid-cols-1 gap-3">
          {selectedLesson?.students.map((student) => (
            <div key={student.id} className="bg-zinc-800/50 p-4 rounded-lg">
              <div className="flex flex-col gap-3">
                <span className="text-white font-medium">{student.name}</span>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => handleAttendance(selectedLesson.id, student.id, Status.ATTENDED)}
                    className={`
                      flex-1 relative overflow-hidden transition-all duration-300
                      ${student.attended === Status.ATTENDED 
                        ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-emerald-500/50" 
                        : "hover:bg-zinc-700/30 border-zinc-700/50"
                      }
                    `}
                  >
                    {student.attended === Status.ATTENDED ? "✓" : t('attendance.actions.present')}
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleAttendance(selectedLesson.id, student.id, Status.ABSENT)}
                    className={`
                      flex-1 relative overflow-hidden transition-all duration-300
                      ${student.attended === Status.ABSENT 
                        ? "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border-rose-500/50" 
                        : "hover:bg-zinc-700/30 border-zinc-700/50"
                      }
                    `}
                  >
                    {student.attended === Status.ABSENT ? "✕" : t('attendance.actions.absent')}
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleAttendance(selectedLesson.id, student.id, Status.EXCUSED)}
                    className={`
                      flex-1 relative overflow-hidden transition-all duration-300
                      ${student.attended === Status.EXCUSED 
                        ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border-yellow-500/50" 
                        : "hover:bg-zinc-700/30 border-zinc-700/50"
                      }
                    `}
                  >
                    {student.attended === Status.EXCUSED ? "!" : t('attendance.actions.excused')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setIsAttendanceDialogOpen(false)}
            className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
          >
            {t('attendance.cancel')}
          </Button>
          <Button
            onClick={() => {
              handleSave();
              setIsAttendanceDialogOpen(false);
            }}
            className="bg-white text-black hover:bg-zinc-200"
          >
            {t('attendance.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex md:flex-row flex-col h-screen bg-[#09090B]">
      <TrainerSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <motion.div 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
        } relative z-0`}
      >
        <div className="container mx-auto p-4 md:p-8 mt-14 md:mt-0 relative">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-gradient-to-b from-white via-white/50 to-transparent rounded-full" />
              <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
            </div>
            <p className="text-zinc-400 mt-2 ml-3">{t('subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="space-y-3">
                <Card className="bg-[#18181B] border-zinc-800 overflow-hidden">
                  <CardContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && handleDateSelect(date)}
                      className="w-full border-0 shadow-none bg-transparent text-sm md:text-base"
                      locale={locale === 'tr' ? tr : enUS}
                      showOutsideDays={false}
                      weekStartsOn={1}
                      modifiers={{
                        hasLesson: (date) => hasLessonsOnDate(date)
                      }}
                      modifiersStyles={{
                        hasLesson: {
                          color: 'rgb(59 130 246)', // text-blue-500
                          fontWeight: '600'
                        },
                        selected: {
                          color: 'rgb(255 255 255)', // text-white
                          backgroundColor: 'rgba(59, 130, 246, 0.1)', // bg-blue-500
                          fontWeight: '600',
                          borderRadius: '4px'
                        }
                      }}
                    />
                  </CardContent>
                </Card>

                <div className="bg-[#18181B] border border-zinc-800 rounded-lg">
                  <div className="p-3 border-b border-zinc-800">
                    <p className="text-sm font-medium text-white">{t('status.title')}</p>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-zinc-400">{t('status.present')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm text-zinc-400">{t('status.absent')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-sm text-zinc-400">{t('status.excused')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-500" />
                      <span className="text-sm text-zinc-400">{t('status.pending')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-white flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-4xl">📅</span>
                    <span>{dateFormatter.format(date)}</span>
                  </h2>
                </div>

                {selectedDateLessons.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/5"
                  >
                    <div className="text-zinc-400 text-lg space-y-2">
                      <span className="text-4xl mb-4 block">📭</span>
                      <p>{t('noLessons.title')}</p>
                      <p className="text-sm text-zinc-500">{t('noLessons.subtitle')}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div className="space-y-6">
                    {lessonContent}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      {attendanceDialog}
    </div>
  );
} 