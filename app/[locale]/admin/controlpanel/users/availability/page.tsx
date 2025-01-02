"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, format, isBefore, addWeeks } from "date-fns";
import { tr } from "date-fns/locale";
import { Card } from "@/components/ui/card";

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
  isAvailable: [3, 8, 10].includes(i)
}));

export default function UserAvailability() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>(() => 
    Array.from({ length: 7 }, (_, i) => ({
      date: addDays(currentWeekStart, i),
      timeSlots: TIME_SLOTS,
    }))
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Önceki haftaya gitme fonksiyonu
  const handlePreviousWeek = () => {
    const newWeekStart = addWeeks(currentWeekStart, -1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isBefore(newWeekStart, today)) {
      return;
    }

    setCurrentWeekStart(newWeekStart);
    setWeekSchedule(
      Array.from({ length: 7 }, (_, i) => ({
        date: addDays(newWeekStart, i),
        timeSlots: TIME_SLOTS,
      }))
    );
  };

  // Sonraki haftaya gitme fonksiyonu
  const handleNextWeek = () => {
    const newWeekStart = addWeeks(currentWeekStart, 1);
    setCurrentWeekStart(newWeekStart);
    setWeekSchedule(
      Array.from({ length: 7 }, (_, i) => ({
        date: addDays(newWeekStart, i),
        timeSlots: TIME_SLOTS,
      }))
    );
  };

  return (
    <div className="flex md:flex-row flex-col h-screen bg-[#09090B]">
      <Toaster />
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      }`}>
        <main className="w-full p-3 sm:p-4 md:p-8 mt-14 md:mt-0 mx-auto">
          <div className="flex flex-col space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-white">Müsaitlik Durumu</h1>
            <p className="text-sm text-zinc-400">Üyenin haftalık müsaitlik durumu</p>
          </div>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <div className="p-4 md:p-6">
              {/* Mobil görünüm için özel başlık ve kontroller */}
              <div className="md:hidden space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePreviousWeek}
                    disabled={isBefore(currentWeekStart, new Date())}
                    className="h-8 w-8 bg-zinc-900 border-zinc-700 text-zinc-400"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium text-white">
                    {format(currentWeekStart, 'd MMMM', { locale: tr })}
                    {" "}-{" "}
                    {format(addDays(currentWeekStart, 6), 'd MMMM yyyy', { locale: tr })}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextWeek}
                    className="h-8 w-8 bg-zinc-900 border-zinc-700 text-zinc-400"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Desktop görünüm için başlık ve kontroller */}
              <div className="hidden md:flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePreviousWeek}
                      disabled={isBefore(currentWeekStart, new Date())}
                      className="h-8 w-8 bg-zinc-900 border-zinc-700 text-zinc-400"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-base md:text-xl font-semibold text-white">
                      {format(currentWeekStart, 'd MMMM', { locale: tr })}
                      {" "}-{" "}
                      {format(addDays(currentWeekStart, 6), 'd MMMM yyyy', { locale: tr })}
                    </h2>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextWeek}
                      className="h-8 w-8 bg-zinc-900 border-zinc-700 text-zinc-400"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Takvim görünümü */}
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-8 gap-2 md:gap-4">
                    {/* Saat sütunu */}
                    <div>
                      <div className="h-12" />
                      <div className="grid gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <div
                            key={slot.id}
                            className="h-12 flex items-center justify-end pr-4 text-sm text-zinc-400"
                          >
                            {slot.time}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Günler */}
                    {weekSchedule.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <div className="h-12 flex flex-col items-center justify-center">
                          <div className="text-sm font-medium text-zinc-300">
                            {format(day.date, "EEEE", { locale: tr })}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {format(day.date, 'd MMM', { locale: tr })}
                          </div>
                        </div>
                        <div className="grid gap-2">
                          {day.timeSlots.map((slot) => (
                            <div
                              key={slot.id}
                              className={`
                                h-12 w-full rounded-md border relative
                                ${slot.isAvailable
                                  ? "bg-blue-500/20 border-blue-500/50"
                                  : "bg-zinc-800/20 border-zinc-800/50"}
                              `}
                            >
                              {slot.isAvailable && (
                                <Check className="absolute inset-0 m-auto w-5 h-5 text-blue-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
} 