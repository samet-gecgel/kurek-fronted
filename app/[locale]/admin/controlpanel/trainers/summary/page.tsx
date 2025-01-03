"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
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

// Örnek veri
const TRAINERS_SUMMARY = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    lessons: {
      "1X BOT": 45,
      "2X BOT": 30,
      "2X ÖZEL": 15,
      "4X DÜMEN": 20
    },
    total: 110
  },
  {
    id: "2",
    name: "Mehmet Demir",
    lessons: {
      "1X BOT": 38,
      "2X BOT": 25,
      "2X ÖZEL": 22,
      "4X DÜMEN": 15
    },
    total: 100
  },
  {
    id: "3",
    name: "Ayşe Kaya",
    lessons: {
      "1X BOT": 50,
      "2X BOT": 35,
      "2X ÖZEL": 28,
      "4X DÜMEN": 17
    },
    total: 130
  },
  {
    id: "4",
    name: "Fatma Şahin",
    lessons: {
      "1X BOT": 42,
      "2X BOT": 28,
      "2X ÖZEL": 18,
      "4X DÜMEN": 12
    },
    total: 100
  },
  {
    id: "5",
    name: "Ali Öztürk",
    lessons: {
      "1X BOT": 55,
      "2X BOT": 40,
      "2X ÖZEL": 25,
      "4X DÜMEN": 30
    },
    total: 150
  },
  {
    id: "6",
    name: "Zeynep Yıldız",
    lessons: {
      "1X BOT": 35,
      "2X BOT": 20,
      "2X ÖZEL": 15,
      "4X DÜMEN": 10
    },
    total: 80
  },
  {
    id: "7",
    name: "Can Demir",
    lessons: {
      "1X BOT": 48,
      "2X BOT": 32,
      "2X ÖZEL": 20,
      "4X DÜMEN": 25
    },
    total: 125
  },
  {
    id: "8",
    name: "Elif Arslan",
    lessons: {
      "1X BOT": 40,
      "2X BOT": 30,
      "2X ÖZEL": 20,
      "4X DÜMEN": 15
    },
    total: 105
  },
  {
    id: "9",
    name: "Burak Çelik",
    lessons: {
      "1X BOT": 52,
      "2X BOT": 38,
      "2X ÖZEL": 24,
      "4X DÜMEN": 26
    },
    total: 140
  },
  {
    id: "10",
    name: "Selin Koç",
    lessons: {
      "1X BOT": 44,
      "2X BOT": 33,
      "2X ÖZEL": 19,
      "4X DÜMEN": 14
    },
    total: 110
  }
];

export default function TrainersSummary() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const t = useTranslations('trainerSummary');
  const itemsPerPage = 5;

  const params = useParams();
  const locale = params.locale as string;
  const dateLocale = locale === 'tr' ? tr : enUS;

  // Filtreleme işlemi
  const filteredTrainers = TRAINERS_SUMMARY.filter((trainer) =>
    trainer.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sayfalama için hesaplamalar
  const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage);
  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Tarih değişikliği için handler
  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setShowCalendar(false);
    }
  };

  // Tarih seçimini temizleme handler'ı
  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateRange(undefined);
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      }`}>
        <main className="p-4 md:p-8 mt-14 md:mt-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{t('monthlyTitle')}</h1>
              <p className="text-zinc-400">{t('detailsTitle')}</p>
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

              {/* Tarih Seçici ve Filtre Butonu */}
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <div 
                    className="relative flex items-center cursor-pointer"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      readOnly
                      placeholder={t('selectMonth')}
                      value={
                        dateRange?.from && dateRange?.to
                          ? `${format(dateRange.from, 'dd MMM yyyy', { locale: tr })} - ${format(dateRange.to, 'dd MMM yyyy', { locale: tr })}`
                          : ''
                      }
                      className="pl-10 pr-10 bg-zinc-800/50 border-zinc-700 text-white cursor-pointer text-sm md:text-base"
                    />
                    {/* Temizleme butonu */}
                    {(dateRange?.from || dateRange?.to) && (
                      <button
                        onClick={handleClearDate}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
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
                        <div className="bg-zinc-900 p-4 shadow-xl rounded-lg">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={handleDateSelect}
                            numberOfMonths={2}
                            locale={dateLocale}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            classNames={{
                              months: "flex flex-col space-y-4",
                              month: "space-y-4",
                              caption: "flex justify-center pt-1 relative items-center text-white",
                              caption_label: "text-sm font-medium",
                              nav: "space-x-1 flex items-center",
                              nav_button: "h-7 w-7 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-zinc-700 rounded-md inline-flex items-center justify-center",
                              nav_button_previous: "absolute left-1",
                              nav_button_next: "absolute right-1",
                              table: "w-full border-collapse space-y-1",
                              head_row: "flex",
                              head_cell: "text-zinc-500 w-9 font-normal text-[0.8rem] rounded-md",
                              row: "flex w-full mt-2",
                              cell: "text-center text-sm p-0 relative rounded-md focus-within:relative focus-within:z-20",
                              day: "h-9 w-9 p-0 font-normal text-zinc-100 hover:bg-zinc-800 rounded-md inline-flex items-center justify-center",
                              day_selected: "bg-blue-500 text-white hover:bg-blue-600",
                              day_today: "bg-zinc-800 text-white",
                              day_outside: "text-zinc-500 opacity-50",
                              day_disabled: "text-zinc-500",
                              day_range_middle: "bg-blue-500/20 text-white rounded-none",
                              day_range_end: "bg-blue-500 text-white hover:bg-blue-600",
                              day_range_start: "bg-blue-500 text-white hover:bg-blue-600",
                              day_hidden: "invisible"
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Filtrele Butonu */}
                <Button 
                  onClick={() => {
                    if (dateRange?.from && dateRange?.to) {
                      // Burada tarih filtreleme işlemi yapılacak
                      console.log('Filtreleniyor:', dateRange);
                    }
                  }}
                  disabled={!dateRange?.from || !dateRange?.to}
                  className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                >
                  {t('filter')}
                </Button>
              </div>
            </div>

            {/* Tablo */}
            <div className="relative overflow-x-auto min-h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium  whitespace-nowrap min-w-[180px]">
                      {t('trainer')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-center whitespace-nowrap min-w-[60px]">
                      1X BOT
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-center whitespace-nowrap min-w-[60px]">
                      2X BOT
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-center whitespace-nowrap min-w-[60px]">
                      2X ÖZEL
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-center whitespace-nowrap min-w-[60px]">
                      4X DÜMEN
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-center whitespace-nowrap min-w-[60px]">
                      {t('total')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTrainers.map((trainer) => (
                    <TableRow 
                      key={trainer.id} 
                      className="group relative border-zinc-800 cursor-pointer hover:bg-white/3 transition-colors"
                    >
                      <TableCell className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        {trainer.name}
                      </TableCell>
                      <TableCell className="text-center text-white group-hover:text-white/90 transition-colors">
                        {trainer.lessons["1X BOT"]}
                      </TableCell>
                      <TableCell className="text-center text-white group-hover:text-white/90 transition-colors">
                        {trainer.lessons["2X BOT"]}
                      </TableCell>
                      <TableCell className="text-center text-white group-hover:text-white/90 transition-colors">
                        {trainer.lessons["2X ÖZEL"]}
                      </TableCell>
                      <TableCell className="text-center text-white group-hover:text-white/90 transition-colors">
                        {trainer.lessons["4X DÜMEN"]}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                        {trainer.total}
                      </TableCell>

                      {/* Hover gradient efekti */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none border-l-2 border-l-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Sayfalama */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 