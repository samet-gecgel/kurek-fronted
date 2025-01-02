"use client";

import { useState, useRef } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimePicker } from "@/components/ui/time-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from 'next-intl';
import { CalendarDays, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import  DatePicker  from "@/components/ui/datePicker";

interface TrainingSchedule {
  id: string;
  boatName: string;
  trainerId?: string;
  level: string;
  boatClass: typeof BOAT_CLASSES[number];
  capacity: number;
  startTime: string;
  endTime: string;
  date: Date;
  isRecurring: boolean;
  ageRange: {
    min: number;
    max: number;
  };
  gender: 'all' | 'male' | 'female';
  note: string;
}

const BOAT_CLASSES = [
  "1X BOT TAKİP",
  "2X BOT TAKİP",
  "2X ÖZEL DERS",
  "4X DÜMEN"
] as const;

const LEVELS = [
  "Başlangıç",
  "Orta",
  "İleri",
  "Yarışma"
];

const TRAINERS = [
  { id: "1", name: "Ahmet Yılmaz" },
  { id: "2", name: "Mehmet Demir" },
  { id: "3", name: "Ayşe Kaya" },
  { id: "4", name: "Fatma Çelik" },
  { id: "5", name: "Ali Öztürk" }
] as const;

interface FormErrors {
  boatName?: string;
  boatClass?: string;
  level?: string;
  capacity?: string;
  time?: string;
  ageRange?: string;
  gender?: string;
}

export default function TrainingCalendar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  // Form state'leri
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("07:00");
  const [formData, setFormData] = useState<Partial<TrainingSchedule>>({
    boatName: "",
    trainerId: undefined,
    level: "",
    boatClass: "1X BOT TAKİP",
    capacity: 1,
    date: new Date(),
    isRecurring: false,
    ageRange: {
      min: 1,
      max: 1
    },
    gender: 'all',
    note: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const t = useTranslations('trainingCalendar');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};

    if (!formData.boatName?.trim()) {
      newErrors.boatName = "Tekne adı zorunludur";
    }

    if (!formData.boatClass) {
      newErrors.boatClass = "Tekne sınıfı seçilmelidir";
    }

    if (!formData.level) {
      newErrors.level = "Seviye seçilmelidir";
    }

    if (!formData.capacity || formData.capacity < 1) {
      newErrors.capacity = "Geçerli bir kontenjan girilmelidir";
    }

    if (!startTime || !endTime) {
      newErrors.time = "Başlangıç ve bitiş saati seçilmelidir";
    }

    if (!formData.ageRange?.min || !formData.ageRange?.max || 
        formData.ageRange.min > formData.ageRange.max) {
      newErrors.ageRange = "Geçerli bir yaş aralığı girilmelidir";
    }

    if (!formData.gender) {
      newErrors.gender = "Cinsiyet seçilmelidir";
    }

    setErrors(newErrors);

    // Hata yoksa formu gönder
    if (Object.keys(newErrors).length === 0) {
      const scheduleData: TrainingSchedule = {
        ...formData as Omit<TrainingSchedule, 'id'>,
        id: Date.now().toString(),
        startTime,
        endTime,
        date: selectedDate
      };
      console.log(scheduleData);
    }
  };

  const handleChange = (
    field: keyof TrainingSchedule, 
    value: string | number | boolean | { min: number; max: number } | undefined
  ) => {
    if (field === 'ageRange') {
      setFormData(prev => ({
        ...prev,
        ageRange: {
          min: (value as { min: number; max: number }).min || 1,
          max: (value as { min: number; max: number }).max || 1
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };


  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
        } relative z-0`}
      >
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0 relative">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
                <p className="text-zinc-400">{t('subtitle')}</p>
              </div>
              <Button 
                onClick={() => router.push('/admin/controlpanel/calendars/lessons')}
                className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                {t('viewCalendar')}
              </Button>
            </div>

            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  

                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.boatName')}</Label>
                    <Input 
                      value={formData.boatName}
                      onChange={(e) => handleChange('boatName', e.target.value)}
                      className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white",
                        errors.boatName && "border-red-500"
                      )}
                      placeholder={t('form.boatNamePlaceholder')}
                    />
                    {errors.boatName && (
                      <span className="text-sm text-red-500">{errors.boatName}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.boatClass')}</Label>
                    <Select onValueChange={(value) => handleChange('boatClass', value)}>
                      <SelectTrigger className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white",
                        errors.boatClass && "border-red-500"
                      )}>
                        <SelectValue placeholder={t('form.selectBoatClass')} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {BOAT_CLASSES.map(boat => (
                          <SelectItem 
                            key={boat} 
                            value={boat}
                            className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                          >
                            {boat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.boatClass && (
                      <span className="text-sm text-red-500">{errors.boatClass}</span>
                    )}
                  </div>



                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.trainer')}</Label>
                    <Select onValueChange={(value) => handleChange('trainerId', value)}>
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                        <SelectValue placeholder={t('form.selectTrainer')} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem 
                          value="none" 
                          className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                        >
                          {t('form.noTrainer')}
                        </SelectItem>
                        {TRAINERS.map(trainer => (
                          <SelectItem 
                            key={trainer.id} 
                            value={trainer.id}
                            className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                          >
                            {trainer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.level')}</Label>
                    <Select onValueChange={(value) => handleChange('level', value)}>
                      <SelectTrigger className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white",
                        errors.level && "border-red-500"
                      )}>
                        <SelectValue placeholder={t('form.selectLevel')} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {LEVELS.map(level => (
                          <SelectItem 
                            key={level} 
                            value={level}
                            className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                          >
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.level && (
                      <span className="text-sm text-red-500">{errors.level}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.capacity')}</Label>
                    <Input 
                      type="number" 
                      min="1"
                      value={formData.capacity}
                      onChange={(e) => handleChange('capacity', parseInt(e.target.value))}
                      className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white",
                        errors.capacity && "border-red-500"
                      )}
                    />
                    {errors.capacity && (
                      <span className="text-sm text-red-500">{errors.capacity}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.date')}</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <input
                        type="text"
                        value={selectedDate.toLocaleDateString('tr-TR')}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDatePicker(true);
                        }}
                        readOnly
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder={t('form.selectDate')}
                      />
                      {showDatePicker && (
                        <div 
                          ref={datePickerRef}
                          className="absolute z-50 mt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DatePicker onDateSelect={handleDateSelect} />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.startTime')}</Label>
                    <TimePicker 
                      value={startTime} 
                      onChange={setStartTime} 
                      className={cn(
                        "mt-1.5",
                        errors.time && "border-red-500"
                      )}
                    />
                    {errors.time && (
                      <span className="text-sm text-red-500">{errors.time}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.endTime')}</Label>
                    <TimePicker 
                      value={endTime} 
                      onChange={setEndTime} 
                      className="mt-1.5" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.recurring')}</Label>
                    <div 
                      onClick={() => setIsRecurring(!isRecurring)}
                      className={cn(
                        "h-[42px] px-4 flex items-center gap-3 rounded-lg cursor-pointer border transition-all duration-200",
                        isRecurring 
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                          : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center",
                        isRecurring 
                          ? "border-blue-500 bg-blue-500" 
                          : "border-zinc-600"
                      )}>
                        {isRecurring && (
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            className="w-3 h-3 text-white"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm">Tekrarlansın mı?</span>
                    </div>
                  </div>



                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.minAge')}</Label>
                    <Input 
                      type="number" 
                      min="1"
                      value={formData.ageRange?.min}
                      onChange={(e) => handleChange('ageRange', { 
                        min: parseInt(e.target.value),
                        max: formData.ageRange?.max || 1
                      })}
                      className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white",
                        errors.ageRange && "border-red-500"
                      )}
                    />
                    {errors.ageRange && (
                      <span className="text-sm text-red-500">{errors.ageRange}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.maxAge')}</Label>
                    <Input 
                      type="number" 
                      min="1"
                      value={formData.ageRange?.max}
                      onChange={(e) => handleChange('ageRange', { 
                        min: formData.ageRange?.min || 1,
                        max: parseInt(e.target.value)
                      })}
                      className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white",
                        errors.ageRange && "border-red-500"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t('form.gender')}</Label>
                    <Select onValueChange={(value) => handleChange('gender', value)}>
                      <SelectTrigger className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white",
                        errors.gender && "border-red-500"
                      )}>
                        <SelectValue placeholder={t('form.selectGender')} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem 
                          value="all" 
                          className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                        >
                          {t('form.genderAll')}
                        </SelectItem>
                        <SelectItem 
                          value="male" 
                          className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                        >
                          {t('form.genderMale')}
                        </SelectItem>
                        <SelectItem 
                          value="female" 
                          className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                        >
                          {t('form.genderFemale')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <span className="text-sm text-red-500">{errors.gender}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-100">{t('form.note')}</Label>
                  <Textarea 
                    className="bg-zinc-800/50 border-zinc-700 text-white mt-1.5"
                    placeholder={t('form.notePlaceholder')}
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                  {t('form.submit')}
                </Button>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
} 