"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import Sidebar from "@/app/components/Sidebar";

// Örnek veri
const managers = [
  {
    id: 1,
    name: "Mehmet Yıldız",
    image: "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png",
    club: "Denizciler Spor Kulübü",
    location: "İstanbul, Kuruçeşme",
    phone: "+90 (532) 111 22 33",
    email: "mehmet@denizkurek.com",
    startDate: "2023-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Zeynep Kaya",
    image: "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png",
    club: "Antalya Spor Kulübü",
    location: "İstanbul, Kadıköy",
    phone: "+90 (532) 222 33 44",
    email: "zeynep@antalyaspor.org",
    startDate: "2023-03-20",
    status: "active",
  },
  {
    id: 3,
    name: "Ali Demir",
    image: "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png",
    club: "İstanbul Spor Kulübü",
    location: "İstanbul, Tuzla",
    phone: "+90 (532) 333 44 55",
    email: "ali@ibbkurek.com",
    startDate: "2023-06-10",
    status: "active",
  },
  {
    id: 4,
    name: "Ayşe Yılmaz",
    image: "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png",
    club: "Aksaray Spor Kulübü",
    location: "Aksaray, Merkez",
    phone: "+90 (532) 444 55 66",
    email: "ayse@aksarayspor.org",
    startDate: "2023-09-05",
    status: "active",
  },
];

export default function ClubManagersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Arama filtrelemesi
  const filteredManagers = managers.filter(manager => 
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sayfalama
  const totalPages = Math.ceil(filteredManagers.length / itemsPerPage);
  const currentManagers = filteredManagers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Kulüp Yöneticileri</h1>
              <p className="text-zinc-400">Tüm kulüp yöneticilerini görüntüleyin</p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Yönetici veya kulüp ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Managers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentManagers.map((manager) => (
              <motion.div
                key={manager.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={manager.image}
                      alt={manager.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">{manager.name}</h3>
                      <Shield className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Building2 size={14} className="text-zinc-400" />
                      <span className="text-sm text-zinc-400">{manager.club}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <MapPin size={14} />
                    <span>{manager.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Phone size={14} />
                    <span>{manager.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Mail size={14} />
                    <span>{manager.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Calendar size={14} />
                    <span>Başlangıç: {manager.startDate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1 
                    ? 'text-zinc-600 cursor-not-allowed' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages 
                    ? 'text-zinc-600 cursor-not-allowed' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 