"use client";

import { useState, Fragment } from "react";
import { useTranslations } from 'next-intl';
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ChevronDown, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IncomeTypeBarChart } from "@/components/charts/income-type-bar-chart";
import { IncomeLineChart } from "@/components/charts/income-line-chart";
import { format } from "date-fns";


const incomeTypeData = [
  { name: "Üyelik Ödemesi", value: 450000 },
  { name: "Ders Ücreti", value: 300000 },
  { name: "Ekipman Satışı", value: 150000 },
  { name: "Kira Geliri", value: 100000 },
  { name: "Etkinlik Geliri", value: 80000 },
  { name: "Sponsorluk", value: 70000 }
];

// Örnek veri
const incomeData = [
  {
    id: 1,
    name: "Üyelik Ödemesi - Ahmet Yılmaz",
    type: "Üyelik Ödemesi",
    amount: 1500,
    dateTime: "2024-01-15 14:30",
    details: "3 aylık üyelik ödemesi"
  },
  {
    id: 2,
    name: "Ekipman Satışı - Yüzme Gözlüğü",
    type: "Ekipman Satışı",
    amount: 250,
    dateTime: "2024-01-16 11:20",
    details: "2 adet profesyonel yüzme gözlüğü satışı"
  },
  // ... daha fazla örnek veri
];

export default function IncomeReportsPage() {
  const t = useTranslations('income.reports');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("12");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  // Örnek veri
const monthlyData = [
    { month: t('months.january').slice(0, 3), amount: 12500 },
    { month: t('months.february').slice(0, 3), amount: 15000 },
    { month: t('months.march').slice(0, 3), amount: 18000 },
    { month: t('months.april').slice(0, 3), amount: 16500 },
    { month: t('months.may').slice(0, 3), amount: 19000 },
    { month: t('months.june').slice(0, 3), amount: 22000 },
    { month: t('months.july').slice(0, 3), amount: 21000 },
    { month: t('months.august').slice(0, 3), amount: 23000 },
    { month: t('months.september').slice(0, 3), amount: 25000 },
    { month: t('months.october').slice(0, 3), amount: 24000 },
    { month: t('months.november').slice(0, 3), amount: 26000 },
    { month: t('months.december').slice(0, 3), amount: 28000 },
  ];
  

  const currentMonths = [
    { value: "1", label: t('months.january') },
    { value: "2", label: t('months.february') },
    { value: "3", label: t('months.march') },
    { value: "4", label: t('months.april') },
    { value: "5", label: t('months.may') },
    { value: "6", label: t('months.june') },
    { value: "7", label: t('months.july') },
    { value: "8", label: t('months.august') },
    { value: "9", label: t('months.september') },
    { value: "10", label: t('months.october') },
    { value: "11", label: t('months.november') },
    { value: "12", label: t('months.december') },
  ];

  const years = ["2024", "2023", "2022"];

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      } relative z-0`}>
        <main className="p-4 md:p-8 pt-6 mt-14 md:mt-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-white">{t('title')}</h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full sm:w-[160px] bg-zinc-800/50 border-zinc-700 text-zinc-300">
                  <SelectValue placeholder={t('selectMonth')} />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {currentMonths.map((month) => (
                    <SelectItem 
                      key={month.value} 
                      value={month.value}
                      className="text-zinc-300 hover:bg-zinc-700/50 focus:bg-zinc-700/50 focus:text-zinc-100"
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-[120px] bg-zinc-800/50 border-zinc-700 text-zinc-300">
                  <SelectValue placeholder={t('selectYear')} />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {years.map((year) => (
                    <SelectItem 
                      key={year} 
                      value={year}
                      className="text-zinc-300 hover:bg-zinc-700/50 focus:bg-zinc-700/50 focus:text-zinc-100"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                {t('fetch')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Toplam Gelir */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-zinc-200 text-sm font-medium">
                  {t('totalIncome')}
                </CardTitle>
                <div className="w-4 h-4 text-emerald-500">₺</div>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-white">125.000 ₺</div>
                <p className="text-xs text-zinc-400 mt-1">
                  {t('monthlyTotalIncome')}
                </p>
              </CardContent>
            </Card>

            {/* En Yüksek Gelir */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-zinc-200 text-sm font-medium">
                  {t('highestIncome')}
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">45.000 ₺</div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-zinc-400">{t('type')}:</p>
                  <p className="text-xs text-emerald-500">{t('membershipPayment')}</p>
                </div>
              </CardContent>
            </Card>

            {/* En Düşük Gelir */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-zinc-200 text-sm font-medium">
                  {t('lowestIncome')}
                </CardTitle>
                <TrendingDown className="w-4 h-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">5.000 ₺</div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-zinc-400">{t('type')}:</p>
                  <p className="text-xs text-blue-500">{t('equipmentSale')}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Gelir Türlerine Göre Dağılım */}
            <div className="lg:col-span-1">
              <IncomeTypeBarChart data={incomeTypeData} />
            </div>

            {/* Aylık Gelir Trendleri */}
            <div className="lg:col-span-1">
              <IncomeLineChart data={monthlyData} />
            </div>
          </div>

          {/* Gelir Detay Tablosu */}
          <div className="mt-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead className="text-zinc-400">
                        {t('table.incomeName')}
                      </TableHead>
                      <TableHead className="text-zinc-400">
                        {t('table.incomeType')}
                      </TableHead>
                      <TableHead className="text-zinc-400">
                        {t('table.amount')}
                      </TableHead>
                      <TableHead className="text-zinc-400">
                        {t('table.dateTime')}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomeData.map((income) => (
                      <Fragment key={income.id}>
                        <TableRow 
                          className="border-zinc-800 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                          onClick={() => toggleRow(income.id)}
                        >
                          <TableCell className="w-[40px]">
                            {expandedRows.includes(income.id) ? (
                              <ChevronDown className="h-4 w-4 text-zinc-400" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-zinc-400" />
                            )}
                          </TableCell>
                          <TableCell className="font-medium text-zinc-200">
                            {income.name}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {income.type}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {new Intl.NumberFormat('tr-TR', {
                              style: 'currency',
                              currency: 'TRY'
                            }).format(income.amount)}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {format(new Date(income.dateTime), 'dd.MM.yyyy HH:mm')}
                          </TableCell>
                        </TableRow>
                        {expandedRows.includes(income.id) && (
                          <TableRow className="border-zinc-800 bg-zinc-800 hover:bg-zinc-800/50">
                            <TableCell colSpan={5} className="px-14 py-3">
                              <div className="text-sm flex items-center gap-2">
                                <span className="text-zinc-400">{t('table.description')}:</span>
                                <span className="text-zinc-300">{income.details}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
} 