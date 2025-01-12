"use client";

import { useState } from "react";
import { TrainerSidebar } from "@/components/layout/trainer-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileDown, Calendar as CalendarIcon, X } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// Örnek veri
const LESSONS_SUMMARY = [
  {
    id: "1",
    date: "2024-01-15",
    time: "09:00",
    boatClass: "1X BOT",
    students: [
      { id: "s1", name: "Ahmet Yılmaz", attendance: "present" },
      { id: "s2", name: "Mehmet Demir", attendance: "absent" }
    ],
    status: "completed"
  },
  {
    id: "2",
    date: "2024-01-16",
    time: "10:30",
    boatClass: "2X BOT",
    students: [
      { id: "s3", name: "Ayşe Kaya", attendance: "present" },
      { id: "s4", name: "Fatma Şahin", attendance: "present" }
    ],
    status: "completed"
  },
  {
    id: "3",
    date: "2024-01-17",
    time: "14:00",
    boatClass: "4X DÜMEN",
    students: [
      { id: "s5", name: "Ali Öztürk", attendance: "present" },
      { id: "s6", name: "Zeynep Yıldız", attendance: "excused" },
      { id: "s7", name: "Can Demir", attendance: "present" },
      { id: "s8", name: "Elif Arslan", attendance: "present" }
    ],
    status: "completed"
  },
  {
    id: "4",
    date: "2024-01-18",
    time: "09:30",
    boatClass: "2X ÖZEL",
    students: [
      { id: "s9", name: "Deniz Yılmaz", attendance: "present" },
      { id: "s10", name: "Selin Kaya", attendance: "present" }
    ],
    status: "completed"
  },
  {
    id: "5",
    date: "2024-01-19",
    time: "11:00",
    boatClass: "1X BOT",
    students: [
      { id: "s11", name: "Burak Demir", attendance: "absent" }
    ],
    status: "cancelled"
  },
  {
    id: "6",
    date: "2024-01-20",
    time: "14:30",
    boatClass: "4X DÜMEN",
    students: [
      { id: "s12", name: "Ece Yıldız", attendance: "present" },
      { id: "s13", name: "Mert Can", attendance: "present" },
      { id: "s14", name: "İrem Su", attendance: "excused" },
      { id: "s15", name: "Kaan Yıldırım", attendance: "present" }
    ],
    status: "completed"
  }
  // ... daha fazla ders eklenebilir
];

// Özet istatistikler
const SUMMARY_STATS = {
  total: LESSONS_SUMMARY.length,
  byBoatClass: {
    "1X BOT": 12,
    "2X BOT": 8,
    "2X ÖZEL": 5,
    "4X DÜMEN": 7
  }
};

export default function TrainerSummary() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });

  const t = useTranslations('trainerSummary');
  const itemsPerPage = 5;
  const params = useParams();
  const locale = params.locale as string;
  const dateLocale = locale === 'tr' ? tr : enUS;

  // Filtreleme işlemi
  const filteredLessons = LESSONS_SUMMARY.filter((lesson) =>
    lesson.students.some(student => 
      student.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Sayfalama için hesaplamalar
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
  const paginatedLessons = filteredLessons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-[#09090B]">
      <TrainerSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
      }`}>
        <main className="p-4 md:p-8 mt-14 md:mt-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
              <p className="text-zinc-400">{t('subtitle')}</p>
            </div>
            
            <Button 
              variant="outline" 
              className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
            >
              <FileDown className="w-4 h-4 mr-2" />
              {t('exportExcel')}
            </Button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            {/* Özet İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-zinc-800/50 p-4 rounded-lg">
                <p className="text-sm text-zinc-400">{t('totalLessons')}</p>
                <p className="text-2xl font-semibold text-white mt-1">{SUMMARY_STATS.total}</p>
              </div>
              {Object.entries(SUMMARY_STATS.byBoatClass).map(([boatClass, count]) => (
                <div key={boatClass} className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400">{boatClass}</p>
                  <p className="text-2xl font-semibold text-white mt-1">{count}</p>
                </div>
              ))}
            </div>

            {/* Filtreler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Arama */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  placeholder={t('search')}
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Tarih Seçici */}
              <div className="relative">
                <div 
                  className="relative flex items-center cursor-pointer"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                  <Input
                    readOnly
                    placeholder={t('selectDateRange')}
                    value={
                      dateRange?.from && dateRange?.to
                        ? `${format(dateRange.from, 'dd MMM yyyy', { locale: dateLocale })} - ${format(dateRange.to, 'dd MMM yyyy', { locale: dateLocale })}`
                        : ''
                    }
                    className="pl-10 pr-10 bg-zinc-800/50 border-zinc-700 text-white cursor-pointer"
                  />
                  {dateRange && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDateRange(undefined);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                {showCalendar && (
                  <>
                    <div 
                      className="fixed inset-0 bg-black/50 z-40" 
                      onClick={() => setShowCalendar(false)} 
                    />
                    <div className="absolute right-0 mt-2 z-50">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        locale={dateLocale}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tablo */}
            <div className="relative overflow-x-auto min-h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400">{t('date')}</TableHead>
                    <TableHead className="text-zinc-400">{t('time')}</TableHead>
                    <TableHead className="text-zinc-400">{t('boatClass')}</TableHead>
                    <TableHead className="text-zinc-400">{t('students')}</TableHead>
                    <TableHead className="text-zinc-400">{t('status.title')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLessons.map((lesson) => (
                    <TableRow 
                      key={lesson.id} 
                      className="border-zinc-800 hover:bg-zinc-800/30"
                    >
                      <TableCell className="font-medium text-white">
                        {format(new Date(lesson.date), 'dd MMM yyyy', { locale: dateLocale })}
                      </TableCell>
                      <TableCell className="text-white">{lesson.time}</TableCell>
                      <TableCell>
                        <Badge className="bg-white/10 text-white hover:bg-white/20 transition-colors">
                          {lesson.boatClass}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {lesson.students.map(student => (
                            <div key={student.id} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                student.attendance === 'present' ? 'bg-green-500' :
                                student.attendance === 'absent' ? 'bg-red-500' :
                                'bg-yellow-500'
                              }`} />
                              <span className="text-white">{student.name}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${
                          lesson.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          lesson.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {t(`status.${lesson.status}`)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 