"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Users,
  Dumbbell,
  Calendar,
  Edit,
  Trash2,
  Clock,
} from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { Club } from "@/types/club";


const clubs = [
  {
    id: 1,
    name: "Denizciler Spor Kulübü",
    location: "İstanbul, Kuruçeşme",
    address: "Kuruçeşme Cad. No:32",
    phone: "+90 (212) 123 45 67",
    email: "info@denizkurek.com",
    memberCount: 85,
    trainerCount: 6,
    status: "active",
    image: "https://e1.pxfuel.com/desktop-wallpaper/983/683/desktop-wallpaper-metalica-logo-cool-logos.jpg",
    createdAt: "2023-01-15",
    lastUpdated: "2024-03-10",
    manager: {
      id: 1,
      name: "Mehmet Yıldız",
      image: "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png",
      phone: "+90 (532) 111 22 33",
      email: "mehmet@denizkurek.com",
      startDate: "2023-01-15",
      role: "Kulüp Yöneticisi"
    },
    trainers: [
      {
        id: 1,
        name: "Ahmet Yılmaz",
        image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
        specialization: "Baş Antrenör",
        experience: "8 yıl",
        phone: "+90 (532) 111 22 33",
        email: "ahmet@denizkurek.com",
        activeStudents: 25,
      },
      {
        id: 2,
        name: "Ayşe Demir",
        image: "https://cdn-icons-png.flaticon.com/512/3048/3048229.png",
        specialization: "Yardımcı Antrenör",
        experience: "5 yıl",
        phone: "+90 (532) 222 33 44",
        email: "ayse@denizkurek.com",
        activeStudents: 18,
      },
      // ... diğer antrenörler
    ],
  },
  // ... diğer kulüpler
];

export default function ClubDetailsPage({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [club, setClub] = useState<Club | null>(null);

  useEffect(() => {
    const clubData = clubs.find(c => c.id === parseInt(params.id)) || null;
    setClub(clubData);
  }, [params.id]);

  if (!club) return null;

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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
            <Link href="/super-admin/dashboard" className="hover:text-white">Ana Panel</Link>
            <span>/</span>
            <Link href="/super-admin/clubs" className="hover:text-white">Kulüpler</Link>
            <span>/</span>
            <span className="text-zinc-300">{club.name}</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{club.name}</h1>
                <p className="text-zinc-400">{club.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/super-admin/clubs"
                className="flex items-center gap-2 text-zinc-400 hover:text-white"
              >
                <ArrowLeft size={20} />
                <span>Geri Dön</span>
              </Link>
              <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                <Edit size={20} />
              </button>
              <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info Card */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Kulüp Bilgileri</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-zinc-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-zinc-400">Adres</p>
                      <p className="text-white">{club.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-zinc-400" />
                    <div>
                      <p className="text-sm font-medium text-zinc-400">Telefon</p>
                      <p className="text-white">{club.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-zinc-400" />
                    <div>
                      <p className="text-sm font-medium text-zinc-400">E-posta</p>
                      <p className="text-white">{club.email}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">İstatistikler</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="text-zinc-400">Toplam Üye</span>
                    </div>
                    <span className="text-xl font-bold text-white">{club.memberCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-5 h-5 text-green-500" />
                      <span className="text-zinc-400">Antrenör Sayısı</span>
                    </div>
                    <span className="text-xl font-bold text-white">{club.trainerCount}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Tarihler</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      <span className="text-zinc-400">Kayıt Tarihi</span>
                    </div>
                    <span className="text-white">{club.createdAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-zinc-400">Son Güncelleme</span>
                    </div>
                    <span className="text-white">{club.lastUpdated}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Kulüp Yöneticisi</h2>
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={club.manager.image}
                      alt={club.manager.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{club.manager.name}</h3>
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">
                      {club.manager.role}
                    </span>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Phone size={14} />
                        <span>{club.manager.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Mail size={14} />
                        <span>{club.manager.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Calendar size={14} />
                        <span>Başlangıç: {club.manager.startDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Antrenörler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club.trainers.map((trainer) => (
                  <motion.div
                    key={trainer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 hover:bg-zinc-800 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={trainer.image}
                          alt={trainer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{trainer.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">
                            {trainer.specialization}
                          </span>
                          <span className="text-zinc-400 text-sm">
                            {trainer.experience} deneyim
                          </span>
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <Phone size={14} />
                            <span>{trainer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <Mail size={14} />
                            <span>{trainer.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 