'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, CreditCard, TrendingUp, Clock, Package } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";

// Mock data for charts
const monthlyData = [
  { name: 'Oca', value: 45 },
  { name: 'Şub', value: 52 },
  { name: 'Mar', value: 48 },
  { name: 'Nis', value: 61 },
  { name: 'May', value: 55 },
  { name: 'Haz', value: 67 },
];

const packageData = [
  { name: 'Aylık Paket', value: 35 },
  { name: '3 Aylık Paket', value: 25 },
  { name: '6 Aylık Paket', value: 20 },
  { name: 'Yıllık Paket', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Add new mock data
const recentActivities = [
  {
    type: 'reservation_cancel',
    title: 'Rezervasyon İptali',
    description: 'Ahmet Yılmaz bugünkü antrenmanını iptal etti',
    time: '5 dakika önce'
  },
  {
    type: 'reservation',
    title: 'Yeni Rezervasyon',
    description: 'Mehmet Demir 15:00 antrenman rezervasyonu',
    time: '15 dakika önce'
  },
  {
    type: 'package_renewal',
    title: 'Paket Yenileme',
    description: 'Ayşe Kaya 3 aylık paketini yeniledi',
    time: '1 saat önce'
  },
  {
    type: 'session_complete',
    title: 'Antrenman Tamamlandı',
    description: 'Can Yıldız antrenmanını tamamladı',
    time: '2 saat önce'
  },
];

const upcomingReservations = [
  {
    memberName: 'Elif Yıldız',
    time: '14:00',
    date: 'Bugün',
    trainer: 'Ahmet Demir',
    status: 'confirmed'
  },
  {
    memberName: 'Murat Kaya',
    time: '15:30',
    date: 'Bugün',
    trainer: 'Ayşe Yılmaz',
    status: 'pending'
  },
  {
    memberName: 'Zeynep Ak',
    time: '10:00',
    date: 'Yarın',
    trainer: 'Mehmet Can',
    status: 'confirmed'
  },
];

const popularPackages = [
  {
    name: 'Aylık Sınırsız',
    sales: 28,
    revenue: '₺14,000',
    trend: '+12%'
  },
  {
    name: '3 Aylık Paket',
    sales: 45,
    revenue: '₺45,000',
    trend: '+28%'
  },
  {
    name: 'Deneme Paketi',
    sales: 32,
    revenue: '₺6,400',
    trend: '+8%'
  },
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const statsData = [
    {
      title: "Toplam Üye",
      value: "2,834",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Aktif Rezervasyon",
      value: "48",
      change: "+8.2%",
      icon: Calendar,
      color: "text-green-500",
    },
    {
      title: "Aylık Gelir",
      value: "₺142,384",
      change: "+15.3%",
      icon: CreditCard,
      color: "text-purple-500",
    },
    {
      title: "Doluluk Oranı",
      value: "%78",
      change: "+4.1%",
      icon: TrendingUp,
      color: "text-yellow-500",
    },
  ];

  // Toplam paket satışını hesapla
  const totalPackages = packageData.reduce((sum, item) => sum + item.value, 0);

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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-white">Hoş Geldiniz 👋</h1>
            <p className="text-zinc-400">Kulübünüzün güncel durumunu takip edin</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-zinc-400">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                        <span className="text-sm text-green-500">{stat.change}</span>
                      </div>
                      <div className={`p-3 rounded-lg bg-zinc-800 ${stat.color}`}>
                        <stat.icon size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Aylık Üye Aktivitesi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f1f1f', 
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Paket Dağılımı</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={packageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={100}
                          outerRadius={140}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {packageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <circle cx="50%" cy="50%" r="95" fill="#000" />
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x="50%"
                            dy="-15"
                            fontSize="32"
                            fill="#fff"
                            fontWeight="bold"
                          >
                            {totalPackages}
                          </tspan>
                          <tspan
                            x="50%"
                            dy="25"
                            fontSize="14"
                            fill="#666"
                          >
                            Paket Satışı
                          </tspan>
                        </text>
                        <Tooltip    
                          contentStyle={{ 
                            backgroundColor: '#1f1f1f', 
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                          itemStyle={{ color: '#fff' }}
                          formatter={(value, name) => [`${value}%`, `${name}`]}
                          labelStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* New Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Son Aktiviteler</CardTitle>
                  <Clock className="w-5 h-5 text-zinc-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-white">{activity.title}</p>
                          <p className="text-xs text-zinc-400">{activity.description}</p>
                          <p className="text-xs text-zinc-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Reservations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Yaklaşan Rezervasyonlar</CardTitle>
                  <Calendar className="w-5 h-5 text-zinc-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingReservations.map((reservation, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{reservation.memberName}</p>
                          <p className="text-xs text-zinc-400">
                            {reservation.date} - {reservation.time}
                          </p>
                          <p className="text-xs text-zinc-500">{reservation.trainer}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          reservation.status === 'confirmed' 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {reservation.status === 'confirmed' ? 'Onaylı' : 'Beklemede'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Popular Packages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Popüler Paketler</CardTitle>
                  <Package className="w-5 h-5 text-zinc-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularPackages.map((pkg, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{pkg.name}</p>
                          <p className="text-xs text-zinc-400">{pkg.sales} satış</p>
                          <p className="text-xs text-zinc-500">{pkg.revenue}</p>
                        </div>
                        <span className="text-xs text-green-500">{pkg.trend}</span>
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