"use client";

import { motion } from "framer-motion";
import {
  Users,
  Building2,
  UserCog,
  Dumbbell,
  Bell,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  DollarSign,
  Activity,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";

const monthlyData = [
  { name: 'Oca', üye: 400, kulüp: 5 },
  { name: 'Şub', üye: 450, kulüp: 6 },
  { name: 'Mar', üye: 520, kulüp: 6 },
  { name: 'Nis', üye: 580, kulüp: 7 },
  { name: 'May', üye: 650, kulüp: 8 },
  { name: 'Haz', üye: 720, kulüp: 8 },
  { name: 'Tem', üye: 800, kulüp: 10 },
];

const activityData = [
  { name: 'Pzt', antrenman: 65 },
  { name: 'Sal', antrenman: 85 },
  { name: 'Çar', antrenman: 75 },
  { name: 'Per', antrenman: 90 },
  { name: 'Cum', antrenman: 95 },
  { name: 'Cmt', antrenman: 100 },
  { name: 'Paz', antrenman: 70 },
];

const recentActivities = [
  { 
    id: 1, 
    type: 'Yeni Üye',
    description: 'Ahmet Yılmaz üyelik kaydı oluşturuldu',
    club: 'Denizciler Spor Kulübü',
    date: '1 saat önce',
    status: 'success'
  },
  { 
    id: 2, 
    type: 'Yeni Antrenör',
    description: 'Ayşe Demir antrenör olarak atandı',
    club: 'Antalya Spor Kulübü',
    date: '3 saat önce',
    status: 'success'
  },
  { 
    id: 3, 
    type: 'İptal',
    description: 'Mehmet Kaya üyeliği iptal edildi',
    club: 'İstanbul Spor Kulübü',
    date: '5 saat önce',
    status: 'error'
  },
  { 
    id: 4, 
    type: 'Ödeme',
    description: 'Aylık aidat ödemesi alındı',
    club: 'Aksaray Spor Kulübü',
    date: '6 saat önce',
    status: 'success'
  },
];

// Progress bar'lar için hedef/maksimum değerler
const progressMetrics = {
  activeSubscription: {
    current: 8.5,
    max: 12, // Örneğin maksimum üyelik süresi 12 ay
    getPercentage: () => (8.5 / 12) * 100
  },
  monthlyIncome: {
    current: 125000,
    target: 150000, // Hedeflenen aylık gelir
    getPercentage: () => (125000 / 150000) * 100
  },
  dailyActivity: {
    current: 89,
    max: 100, // Maksimum aktivite yüzdesi
    getPercentage: () => 89 // Zaten yüzde olarak geliyor
  },
  targetAchievement: {
    current: 92,
    max: 100, // Maksimum hedef yüzdesi
    getPercentage: () => 92 // Zaten yüzde olarak geliyor
  }
};

export default function SuperAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-zinc-950">
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-0' : 'ml-0'
      }`}>
        <div className="p-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Hoş Geldiniz</h1>
              <p className="text-zinc-400">Sistem durumunu kontrol edin</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Toplam Kulüp", value: "12", change: "+2", icon: Building2, trend: "up" },
              { title: "Toplam Yönetici", value: "25", change: "+5", icon: UserCog, trend: "up" },
              { title: "Toplam Antrenör", value: "40", change: "+8", icon: Dumbbell, trend: "up" },
              { title: "Toplam Üye", value: "350", change: "-12", icon: Users, trend: "down" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <stat.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className={`text-sm flex items-center gap-1 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {stat.change}
                    {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-zinc-400 text-sm">{stat.title}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">Büyüme Analizi</h2>
                  <p className="text-sm text-zinc-400">Üye ve kulüp sayısı artışı</p>
                </div>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorUye" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem'
                      }}
                      labelStyle={{ color: '#e5e7eb' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="üye"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorUye)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">Haftalık Aktivite</h2>
                  <p className="text-sm text-zinc-400">Günlük antrenman sayısı</p>
                </div>
                <Dumbbell className="w-5 h-5 text-blue-500" />
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem'
                      }}
                      labelStyle={{ color: '#e5e7eb' }}
                    />
                    <Bar dataKey="antrenman" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Aktif Üyelik Süresi</p>
                  <p className="text-xl font-bold text-white">
                    Ort. {progressMetrics.activeSubscription.current} Ay
                    <span className="text-sm text-zinc-400 ml-2">/ {progressMetrics.activeSubscription.max} ay</span>
                  </p>
                </div>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full mb-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${progressMetrics.activeSubscription.getPercentage()}%` }}
                ></div>
              </div>
              <p className="text-xs text-zinc-500 italic mt-2">* Maksimum süreye göre ilerleme</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Aylık Gelir</p>
                  <p className="text-xl font-bold text-white">
                    ₺{progressMetrics.monthlyIncome.current.toLocaleString()}
                    <span className="text-sm text-zinc-400 ml-2">/ ₺{progressMetrics.monthlyIncome.target.toLocaleString()}</span>
                  </p>
                </div>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full mb-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${progressMetrics.monthlyIncome.getPercentage()}%` }}
                ></div>
              </div>
              <p className="text-xs text-zinc-500 italic mt-2">* Hedef gelire göre ilerleme</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Günlük Aktivite</p>
                  <p className="text-xl font-bold text-white">89%</p>
                </div>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full mb-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
              <p className="text-xs text-zinc-500 italic mt-2">* Toplam kapasite kullanımına göre ilerleme</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-500/10 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Hedef Gerçekleşme</p>
                  <p className="text-xl font-bold text-white">92%</p>
                </div>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full mb-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-zinc-500 italic mt-2">* Aylık hedeflere göre ilerleme</p>
            </motion.div>
          </div>

          {/* Recent Activities Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ 
              scale: 1.005,
              transition: { duration: 0.2 }
            }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-white mb-6">Son Aktiviteler</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-zinc-400 text-sm">
                    <th className="text-left pb-4">Tip</th>
                    <th className="text-left pb-4">Açıklama</th>
                    <th className="text-left pb-4">Kulüp</th>
                    <th className="text-left pb-4">Tarih</th>
                    <th className="text-left pb-4">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id} className="border-t border-zinc-800">
                      <td className="py-4 text-white">{activity.type}</td>
                      <td className="py-4 text-zinc-400">{activity.description}</td>
                      <td className="py-4 text-zinc-400">{activity.club}</td>
                      <td className="py-4 text-zinc-400">{activity.date}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          activity.status === 'success' 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {activity.status === 'success' ? 'Başarılı' : 'Hata'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 