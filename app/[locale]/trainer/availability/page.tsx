"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrainerSidebar } from "@/components/layout/trainer-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addDays, format, isBefore, startOfToday, isAfter } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

interface DaySchedule {
  date: Date;
  timeSlots: TimeSlot[];
}

// Saat aralıkları 06:00-18:00 arası (18:00 dahil)
const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => ({
  id: `slot-${i}`,
  time: `${String(i + 6).padStart(2, '0')}:00`,
  // Örnek olarak 09:00, 14:00 ve 16:00 saatlerini seçili getir
  isAvailable: [3, 8, 10].includes(i) // 3->09:00, 8->14:00, 10->16:00
}));

export default function AvailabilityPage() {
  const t = useTranslations('trainerAvailability');
  const params = useParams();
  const locale = params.locale as string;
  const dateLocale = locale === 'tr' ? tr : enUS;

  const today = startOfToday();
  const [currentWeekStart, setCurrentWeekStart] = useState(today);
  
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>(() => 
    Array.from({ length: 7 }, (_, i) => ({
      date: addDays(currentWeekStart, i),
      timeSlots: TIME_SLOTS,
    }))
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isDateSelectable = (date: Date) => {
    const today = startOfToday();
    const maxDate = addDays(today, 30);
    return !isBefore(date, today) && !isAfter(date, maxDate);
  };

  const handlePreviousWeek = () => {
    const newStartDate = addDays(currentWeekStart, -7);
    if (!isBefore(newStartDate, today)) {
      setCurrentWeekStart(newStartDate);
      setWeekSchedule(
        Array.from({ length: 7 }, (_, i) => ({
          date: addDays(newStartDate, i),
          timeSlots: TIME_SLOTS,
        }))
      );
    }
  };

  const handleNextWeek = () => {
    const newStartDate = addDays(currentWeekStart, 7);
    const maxDate = addDays(today, 30);
    if (!isAfter(newStartDate, maxDate)) {
      setCurrentWeekStart(newStartDate);
      setWeekSchedule(
        Array.from({ length: 7 }, (_, i) => ({
          date: addDays(newStartDate, i),
          timeSlots: TIME_SLOTS,
        }))
      );
    }
  };

  const handleTimeSlotToggle = (dayIndex: number, slotId: string) => {
    const slotDate = addDays(currentWeekStart, dayIndex);
    
    if (!isDateSelectable(slotDate)) {
      return;
    }

    setWeekSchedule(prev => prev.map((day, idx) => {
      if (idx === dayIndex) {
        return {
          ...day,
          timeSlots: day.timeSlots.map(slot => 
            slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot
          ),
        };
      }
      return day;
    }));
  };

  const handleSave = () => {
    // API'ye kaydetme işlemi burada yapılacak
    console.log(t('saved'), weekSchedule);
  };

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
       <div className="w-full p-4 md:p-8 mt-14 md:mt-0 relative">
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

          <Card className="bg-zinc-900/50 border-zinc-800">
            <div className="p-4 md:p-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handlePreviousWeek}
                    variant="outline"
                    size="icon"
                    className="bg-zinc-800 border-zinc-700"
                    disabled={isBefore(addDays(currentWeekStart, -7), today)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-base md:text-xl font-semibold text-white">
                    {format(currentWeekStart, locale === 'tr' ? 'd MMMM' : 'MMMM d', { locale: dateLocale })}
                    {" "}-{" "}
                    {format(addDays(currentWeekStart, 6), locale === 'tr' ? 'd MMMM yyyy' : 'MMMM d, yyyy', { locale: dateLocale })}
                  </h2>
                  <Button
                    onClick={handleNextWeek}
                    variant="outline"
                    size="icon"
                    className="bg-zinc-800 border-zinc-700"
                    disabled={isAfter(addDays(currentWeekStart, 7), addDays(today, 30))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {t('save')}
                </Button>
              </div>

              <p className="text-sm text-zinc-400 mb-6">
                {t('calendar.dateRange')}
              </p>

              <div className="grid grid-cols-8 gap-2 md:gap-4 min-w-[650px]">
                {/* Saat sütunu */}
                <div>
                  <div className="h-12" />
                  <div className="grid gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <div
                        key={slot.id}
                        className="h-12 flex items-center md:justify-end justify-center  md:pr-4 text-xs md:text-sm text-zinc-400"
                      >
                        {slot.time}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Günler */}
                {weekSchedule.map((day, dayIndex) => {
                  const isSelectable = isDateSelectable(day.date);
                  return (
                    <div key={dayIndex}>
                      <div className="h-12 flex flex-col items-center justify-center">
                        <div className={`text-sm font-medium ${
                          isSelectable ? 'text-zinc-300' : 'text-zinc-600'
                        }`}>
                          {format(day.date, "EEEE", { locale: dateLocale })}
                        </div>
                        <div className={`text-xs ${
                          isSelectable ? 'text-zinc-500' : 'text-zinc-700'
                        }`}>
                          {format(day.date, locale === 'tr' ? 'd MMM' : 'MMM d', { locale: dateLocale })}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        {day.timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => handleTimeSlotToggle(dayIndex, slot.id)}
                            disabled={!isSelectable}
                            title={!isSelectable ? t('timeSlot.pastDate') : 
                                   slot.isAvailable ? t('timeSlot.available') : 
                                   t('timeSlot.notAvailable')}
                            className={`
                              h-12 w-full rounded-md border relative
                              transition-all duration-200 group
                              ${!isSelectable 
                                ? "opacity-50 cursor-not-allowed bg-zinc-800/10 border-zinc-800/30" 
                                : slot.isAvailable 
                                  ? "bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30" 
                                  : "bg-zinc-800/20 border-zinc-800/50 hover:bg-zinc-800/40"}
                            `}
                          >
                            {slot.isAvailable && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="w-5 h-5 text-blue-400" />
                              </div>
                            )}
                            <div className={`
                              absolute inset-0 flex items-center justify-center
                              opacity-0 group-hover:opacity-100 transition-opacity
                              ${slot.isAvailable ? "text-blue-400" : "text-zinc-400"}
                            `}>
                              <Check className="w-5 h-5" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
} 