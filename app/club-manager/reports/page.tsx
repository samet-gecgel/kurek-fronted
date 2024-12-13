'use client';

import { useState } from "react";
//import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock veri
const monthlyData = {
  totalSales: 45800,
  totalMembers: 234,
  activePackages: 156,
  reservations: 789,
  salesByPackage: [
    { name: 'Aylık Paket', value: 25 },
    { name: '3 Aylık Paket', value: 18 },
    { name: '6 Aylık Paket', value: 12 },
    { name: 'Yıllık Paket', value: 8 },
  ],
  reservationsByDay: [
    { day: 'Pazartesi', value: 45 },
    { day: 'Salı', value: 38 },
    { day: 'Çarşamba', value: 52 },
    { day: 'Perşembe', value: 41 },
    { day: 'Cuma', value: 37 },
    { day: 'Cumartesi', value: 28 },
    { day: 'Pazar', value: 25 },
  ],
};

export default function Reports() {
  //const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("march");

  const handleExportReport = () => {
    // Excel veya PDF export işlemi
    console.log('Rapor dışa aktarılıyor...');
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="p-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Raporlar ve Analizler</h1>
              <p className="text-zinc-400">Satış ve kullanım istatistiklerini görüntüleyin</p>
            </div>

            <div className="flex items-center gap-3">
              <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40 bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Ay Seçin" />
                </SelectTrigger>
                <SelectContent 
                  className="bg-zinc-900 border-zinc-800"
                  ref={(ref) => {
                    if (ref) {
                      // SelectContent'in stil özelliklerini override et
                      const element = ref as HTMLElement;
                      element.style.setProperty('--background', '#18181B');
                      element.style.setProperty('--border', '#27272A');
                    }
                  }}
                >
                  <SelectItem value="january" className="text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white">
                    Ocak 2024
                  </SelectItem>
                  <SelectItem value="february" className="text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white">
                    Şubat 2024
                  </SelectItem>
                  <SelectItem value="march" className="text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white">
                    Mart 2024
                  </SelectItem>
                  <SelectItem value="april" className="text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white">
                    Nisan 2024
                  </SelectItem>
                  <SelectItem value="may" className="text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white">
                    Mayıs 2024
                  </SelectItem>
                  <SelectItem value="june" className="text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white">
                    Haziran 2024
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={handleExportReport}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Raporu İndir
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-400">Toplam Satış</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        ₺{monthlyData.totalSales.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-full">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ChevronDown className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">18%</span>
                    <span className="text-zinc-400 ml-2">Geçen aydan</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-400">Aktif Üyeler</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {monthlyData.totalMembers}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-full">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ChevronDown className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">12%</span>
                    <span className="text-zinc-400 ml-2">Geçen aydan</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-400">Aktif Paketler</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {monthlyData.activePackages}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded-full">
                      <BarChart3 className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ChevronDown className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">8%</span>
                    <span className="text-zinc-400 ml-2">Geçen aydan</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-400">Rezervasyonlar</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {monthlyData.reservations}
                      </p>
                    </div>
                    <div className="p-3 bg-orange-500/10 rounded-full">
                      <Calendar className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ChevronDown className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">15%</span>
                    <span className="text-zinc-400 ml-2">Geçen aydan</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Paket Satışları</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.salesByPackage.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-32 text-sm text-zinc-400">{item.name}</div>
                        <div className="flex-1">
                          <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(item.value / 30) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-12 text-right text-sm text-zinc-400">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Günlük Rezervasyonlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.reservationsByDay.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-32 text-sm text-zinc-400">{item.day}</div>
                        <div className="flex-1">
                          <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: `${(item.value / 60) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-12 text-right text-sm text-zinc-400">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 