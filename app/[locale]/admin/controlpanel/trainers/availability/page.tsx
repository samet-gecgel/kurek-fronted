"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { useTranslations } from 'next-intl';
import { Clock, User, Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

interface DaySchedule {
  date: string;
  timeSlots: TimeSlot[];
}

interface Trainer {
  id: number;
  trainerId: string;
  name: string;
  photo: string;
  specializations: string[];
  daySchedule: DaySchedule[];
}

const HOURS = Array.from({ length: 13 }, (_, i) => ({
  time: `${String(i + 6).padStart(2, '0')}:00`,
  id: `time-${i + 6}`
}));

// Örnek veri
const TRAINERS: Trainer[] = [
  {
    id: 1,
    trainerId: "TR001",
    name: "Ahmet Yılmaz",
    photo: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    specializations: ["Olimpik Kürek", "Fitness"],
    daySchedule: [
      {
        date: format(new Date(), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "121", time: "10:00", isAvailable: true },
          { id: "122", time: "12:00", isAvailable: true },
          { id: "123", time: "15:00", isAvailable: true }
        ]
      },
      {
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "124", time: "06:00", isAvailable: true },
          { id: "125", time: "11:00", isAvailable: true },
          { id: "126", time: "18:00", isAvailable: true }
        ]
      }
    ]
  },
  {
    id: 2,
    trainerId: "TR002",
    name: "Mehmet Demir",
    photo: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    specializations: ["Kıyı Küregi", "Yüzme"],
    daySchedule: [
      {
        date: format(new Date(), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "221", time: "09:00", isAvailable: true },
          { id: "222", time: "13:00", isAvailable: true },
          { id: "223", time: "17:00", isAvailable: true }
        ]
      },
      {
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "224", time: "08:00", isAvailable: true },
          { id: "225", time: "14:00", isAvailable: true },
          { id: "226", time: "16:00", isAvailable: true }
        ]
      }
    ]
  },
  {
    id: 3,
    trainerId: "TR003",
    name: "Ayşe Kaya",
    photo: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    specializations: ["Salon Küregi", "Fitness"],
    daySchedule: [
      {
        date: format(new Date(), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "321", time: "07:00", isAvailable: true },
          { id: "322", time: "12:00", isAvailable: true },
          { id: "323", time: "16:00", isAvailable: true }
        ]
      },
      {
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "324", time: "09:00", isAvailable: true },
          { id: "325", time: "13:00", isAvailable: true },
          { id: "326", time: "17:00", isAvailable: true }
        ]
      }
    ]
  },
  {
    id: 4,
    trainerId: "TR004",
    name: "Can Yıldız",
    photo: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    specializations: ["Olimpik Kürek", "Salon Küregi"],
    daySchedule: [
      {
        date: format(new Date(), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "421", time: "07:00", isAvailable: true },
          { id: "422", time: "11:00", isAvailable: true },
          { id: "423", time: "16:00", isAvailable: true }
        ]
      },
      {
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "424", time: "08:00", isAvailable: true },
          { id: "425", time: "12:00", isAvailable: true },
          { id: "426", time: "15:00", isAvailable: true }
        ]
      }
    ]
  },
  {
    id: 5,
    trainerId: "TR005",
    name: "Zeynep Şahin",
    photo: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    specializations: ["Yüzme", "Fitness"],
    daySchedule: [
      {
        date: format(new Date(), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "521", time: "06:00", isAvailable: true },
          { id:"540",  time: "07:00", isAvailable:true},
          { id: "522", time: "08:00", isAvailable: true },
          { id: "542", time: "09:00", isAvailable: true },
          { id: "523", time: "10:00", isAvailable: true },
          { id: "543", time: "11:00", isAvailable: true },
          { id: "524", time: "12:00", isAvailable: true },
          { id: "544", time: "13:00", isAvailable: true },
          { id: "525", time: "14:00", isAvailable: true },
          { id: "545", time: "15:00", isAvailable: true },
          { id: "526", time: "16:00", isAvailable: true },
          { id: "546", time: "17:00", isAvailable: true },
          { id: "525", time: "18:00", isAvailable: true }
        ]
      },
      {
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        timeSlots: [
          { id: "526", time: "07:00", isAvailable: true },
          { id: "527", time: "11:00", isAvailable: true },
          { id: "528", time: "16:00", isAvailable: true }
        ]
      }
    ]
  },
  {
    id: 6,
    trainerId: "TR006",
    name: "Emre Kılıç",
    photo: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    specializations: ["Olimpik Kürek", "Fitness", "Yüzme"],
    daySchedule: [
      {
        date: "2024-01-01",
        timeSlots: [
          { id: "621", time: "09:00", isAvailable: true },
          { id: "622", time: "13:00", isAvailable: true },
          { id: "623", time: "17:00", isAvailable: true }
        ]
      },
      {
        date: "2024-01-02",
        timeSlots: [
          { id: "624", time: "08:00", isAvailable: true },
          { id: "625", time: "14:00", isAvailable: true },
          { id: "626", time: "18:00", isAvailable: true }
        ]
      }
    ]
  }
];

export default function TrainerAvailability() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const t = useTranslations('trainerAvailability');
  const { locale } = useParams();
  const dateLocale = locale === 'tr' ? tr : enUS;

  const filteredTrainers = TRAINERS.filter(trainer => {
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    const daySchedule = trainer.daySchedule.find(day => day.date === selectedDateStr);
    
    // Eğer seçili günde programı yoksa gösterme
    if (!daySchedule) return false;

    const availableTimeSlots = daySchedule.timeSlots.filter(slot => slot.isAvailable);
    
    // Eğer saat seçilmişse sadece o saatte müsait olanları göster
    if (selectedTime) {
      return availableTimeSlots.some(slot => slot.time === selectedTime);
    }

    // Saat seçilmemişse ve o gün hiç müsait saati yoksa gösterme
    return availableTimeSlots.length > 0;
  });

  return (
    <div className="flex md:flex-row flex-col min-h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      }`}>
        <main className="p-4 md:p-6 lg:p-8 mt-14 md:mt-0">
          <div className="flex flex-col space-y-1.5 mb-6">
            <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
            <p className="text-sm text-zinc-400">{t('subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-[400px,1fr] gap-6">
            {/* Sol Taraf - Takvim */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <div className="flex items-center gap-2 mb-6">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">{t('calendar.title')}</h2>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className="bg-zinc-800/50 rounded-lg p-6 w-full"
                classNames={{
                  head_cell: "text-zinc-400 font-medium text-sm w-12",
                  cell: "text-center text-sm p-0 relative",
                  day: "h-12 w-12 p-0 font-normal hover:bg-zinc-800/50 rounded-md transition-colors",
                  day_selected: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400 focus:bg-blue-500/30 focus:text-blue-400",
                  day_today: "text-zinc-100",
                  day_outside: "text-zinc-500 opacity-50",
                  nav_button: "bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white",
                  nav: "space-x-1 flex items-center justify-end",
                  nav_button_previous: "h-7 w-7 bg-zinc-800/50 rounded-md flex items-center justify-center",
                  nav_button_next: "h-7 w-7 bg-zinc-800/50 rounded-md flex items-center justify-center",
                  caption: "flex items-center mb-4",
                  caption_label: "flex-1 text-base font-medium text-white"
                }}
                locale={dateLocale}
              />
              <div className="mt-6 text-sm text-zinc-400 text-center">
                {t('calendar.selectedDate')}: {format(selectedDate, 'd MMMM yyyy', { locale: dateLocale })}
              </div>
            </Card>

            {/* Sağ Taraf - Saatler ve Antrenörler */}
            <div className="space-y-6">
              {/* Saat Seçimi */}
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-semibold text-white">{t('timeSelection.title')}</h2>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                  {HOURS.map((hour) => (
                    <Button
                      key={hour.id}
                      variant="outline"
                      className={`h-12 ${
                        selectedTime === hour.time
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400'
                          : 'bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700/50 hover:text-white hover:border-zinc-600'
                      } transition-all duration-200`}
                      onClick={() => setSelectedTime(hour.time)}
                    >
                      {hour.time}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Antrenör Listesi */}
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold text-white">
                    {selectedTime 
                      ? t('trainers.titleWithTime', { time: selectedTime })
                      : t('trainers.title')}
                  </h2>
                </div>

                {filteredTrainers.length === 0 ? (
                  <div className="text-center py-8 text-zinc-400">
                    {t('trainers.noTrainers')}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTrainers.map((trainer) => (
                      <Card key={trainer.id} className="bg-zinc-800/50 border-zinc-700/50 p-4">
                        <div className="flex gap-4">
                          {/* Antrenör Fotoğrafı */}
                          <div className="w-12 h-12 flex-shrink-0">
                            <div className="w-full h-full relative rounded-full overflow-hidden">
                              <Image
                                src={trainer.photo}
                                alt={trainer.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                          </div>

                          {/* Antrenör Bilgileri */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-white truncate">{trainer.name}</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {trainer.specializations.map((spec, index) => (
                                <Badge
                                  key={index}
                                  className="bg-blue-500/10 text-blue-400 border-blue-500/20"
                                >
                                  {spec}
                                </Badge>
                              ))}
                            </div>

                            {/* Müsait Saatler */}
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-zinc-400" />
                                <span className="text-sm text-zinc-400">
                                  {t('trainers.availableHours')}
                                </span>
                              </div>
                              <div className="max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800/50 pr-2">
                                <div className="grid grid-cols-4 gap-2">
                                  {trainer.daySchedule.find(day => day.date === format(selectedDate, 'yyyy-MM-dd'))?.timeSlots.map((slot) => (
                                    <Button
                                      key={slot.id}
                                      variant="outline"
                                      size="sm"
                                      className={`
                                        ${selectedTime === slot.time
                                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                          : 'bg-zinc-800/50 border-zinc-700 text-zinc-300'
                                        }
                                        hover:bg-zinc-700/50 hover:text-white hover:border-zinc-600
                                        w-full h-9 px-2
                                      `}
                                      onClick={() => setSelectedTime(slot.time)}
                                    >
                                      {slot.time}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 