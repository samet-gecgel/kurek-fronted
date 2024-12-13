"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import { Pagination } from "@/components/ui/pagination";
import { users } from "@/app/data/users";

type TabType = 'all' | 'approved' | 'pending' | 'rejected';

interface TabItem {
  id: TabType;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'approved', label: 'Onaylandı' },
  { id: 'pending', label: 'Onay Bekliyor' },
  { id: 'rejected', label: 'Reddedildi' },
];

const statusMapping = {
  approved: 'Onaylandı',
  pending: 'Onay Bekliyor',
  rejected: 'Reddedildi',
};

// Status renkleri için yardımcı fonksiyon
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'onaylandı':
      return 'bg-green-500/10 text-green-500';
    case 'onay bekliyor':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'reddedildi':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-zinc-500/10 text-zinc-500';
  }
};

export default function UsersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtreleme işlemi
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Önce tab filtrelemesi
    if (activeTab !== 'all') {
      filtered = users.filter(user => 
        user.status === statusMapping[activeTab as keyof typeof statusMapping]
      );
    }

    // Sonra arama filtrelemesi
    return filtered.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeTab]);

  // Tab değiştiğinde sayfa numarasını sıfırla
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Sayfa değiştiğinde scrollu başa al
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sayfalama hesaplaması
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = useMemo(() => {
    return filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, filteredUsers, itemsPerPage]);

  // Kullanıcı kartına tıklandığında detay sayfasına yönlendir
  const handleUserClick = (userId: string | number) => {
    router.push(`/super-admin/users/details/${userId}`);
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-white">Kullanıcılar</h1>
          <p className="text-zinc-400">Tüm kullanıcıları görüntüleyin</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg bg-zinc-900/50 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs bg-zinc-900/50 px-2 py-0.5 rounded-full">
                  {tab.id === 'all' 
                    ? users.length
                    : users.filter(user => user.status === statusMapping[tab.id as keyof typeof statusMapping]).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="text"
                placeholder="İsim, e-posta veya konum ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Arama yapıldığında ilk sayfaya dön
                }}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {currentUsers.length === 0 ? (
            <div className="col-span-full text-center py-8 text-zinc-400">
              Kullanıcı bulunamadı
            </div>
          ) : (
            currentUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
                onClick={() => handleUserClick(user.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <MapPin size={14} />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Phone size={14} />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Mail size={14} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Calendar size={14} />
                    <span>Katılım: {user.joinDate}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}