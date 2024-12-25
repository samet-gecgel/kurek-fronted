"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MapPin,
  Phone,
  Mail,
  Users,
  Dumbbell,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/ui/pagination";
import Sidebar from "@/components/layout/sidebar";

// Örnek veri
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
  },
  {
    id: 2,
    name: "Antalya Spor Kulübü",
    location: "İstanbul, Kadıköy",
    address: "Kurbağalıdere Cad. No:123",
    phone: "+90 (212) 234 56 78",
    email: "kurek@antalyaspor.org",
    memberCount: 92,
    trainerCount: 7,
    status: "active",
    image: "https://e1.pxfuel.com/desktop-wallpaper/604/598/desktop-wallpaper-cool-logos-logos.jpg",
  },
  {
    id: 3,
    name: "İstanbul Spor Kulübü",
    location: "İstanbul, Tuzla",
    address: "Tuzla Sahil No:45",
    phone: "+90 (212) 345 67 89",
    email: "info@ibbkurek.com",
    memberCount: 65,
    trainerCount: 4,
    status: "active",
    image: "https://e1.pxfuel.com/desktop-wallpaper/379/539/desktop-wallpaper-cool-logos-and.jpg",
  },
  {
    id: 4,
    name: "Aksaray Spor Kulübü",
    location: "Aksaray, Merkez",
    address: "Taşpazar Cad. No:123",
    phone: "+90 (382) 456 78 90",
    email: "iletisim@aksarayspor.org",
    memberCount: 45,
    trainerCount: 3,
    status: "active",
    image: "https://e1.pxfuel.com/desktop-wallpaper/874/196/desktop-wallpaper-cool-logos-and-logos.jpg",
  }
];

export default function ClubsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);

  const currentClubs = filteredClubs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              <h1 className="text-2xl font-bold text-white">Kulüpler</h1>
              <p className="text-zinc-400">Tüm spor kulüplerini yönetin</p>
            </div>
            <Link href="/super-admin/clubs/add">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={20} />
                Yeni Kulüp Ekle
              </motion.button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Kulüp ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              {/* Filtreler buraya eklenebilir */}
            </div>
          </div>

          {/* Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentClubs.map((club) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/super-admin/clubs/details/${club.id}`)}
              >
                {/* Club Image */}
                <div className="relative h-48">
                  <Image
                    src={club.image}
                    alt={club.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Dropdown Menu - event propagation'ı durdurmak için */}
                  <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
                    <div className="relative group/dropdown">
                      <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                        <MoreVertical size={20} className="text-white" />
                      </button>
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-48 py-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl invisible group-hover/dropdown:visible transition-all">
                        <Link 
                          href={`/super-admin/clubs/details/${club.id}`}
                          className="w-full px-4 py-2 text-left text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center gap-2"
                        >
                          <Eye size={16} />
                          Detayları Görüntüle
                        </Link>
                        <button className="w-full px-4 py-2 text-left text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center gap-2">
                          <Edit size={16} />
                          Düzenle
                        </button>
                        <button className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-500/10 flex items-center gap-2">
                          <Trash2 size={16} />
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Club Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{club.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <MapPin size={16} />
                      <span>{club.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Phone size={16} />
                      <span>{club.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Mail size={16} />
                      <span>{club.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-zinc-400 mb-1">
                        <Users size={16} />
                        <span>Üyeler</span>
                      </div>
                      <p className="text-xl font-bold text-white">{club.memberCount}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-zinc-400 mb-1">
                        <Dumbbell size={16} />
                        <span>Antrenörler</span>
                      </div>
                      <p className="text-xl font-bold text-white">{club.trainerCount}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      {/* Add Club Modal - İhtiyaca göre ayrı bir bileşen olarak da oluşturulabilir */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Yeni Kulüp Ekle</h2>
            {/* Form içeriği buraya gelecek */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                İptal
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Kulüp Ekle
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 