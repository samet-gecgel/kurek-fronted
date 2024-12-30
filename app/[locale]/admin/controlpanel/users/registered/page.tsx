"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

import { Input } from "@/components/ui/input";
import { Search, Edit2, UserX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Pagination } from "@/components/ui/pagination";

type UserStatus = 'active' | 'passive' | 'suspended' | 'pending' | 'frozen';
type MembershipType = 'individual' | 'highschool' | 'university' | 'corporate';

interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  status: UserStatus;
  membershipType: MembershipType;
  package?: {
    name: string;
    remainingDays: number;
    remainingCredits: number;
  };
}

const statusColors: Record<UserStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20',
  passive: 'bg-red-500/10 text-red-500 ring-1 ring-red-500/20',
  suspended: 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/20',
  pending: 'bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20',
  frozen: 'bg-zinc-500/10 text-zinc-400 ring-1 ring-zinc-500/20'
};

const statusLabels: Record<UserStatus, string> = {
  active: 'Aktif',
  passive: 'Pasif',
  suspended: 'Duraklatılmış',
  pending: 'Ön Kayıt',
  frozen: 'Dondurulmuş'
};

const membershipLabels: Record<MembershipType, string> = {
  individual: 'Bireysel',
  highschool: 'Lise',
  university: 'Üniversite',
  corporate: 'Kurumsal'
};

export default function RegisteredUsers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [membershipFilter, setMembershipFilter] = useState<MembershipType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Her sayfada gösterilecek üye sayısı

  // Örnek veri
  const users: User[] = [
    {
      id: '1',
      fullName: 'Ahmet Yılmaz',
      phone: '0532 123 4567',
      email: 'ahmet@example.com',
      status: 'active',
      membershipType: 'individual',
      package: {
        name: 'Kürek Eğitimi Paketi 6 Ders',
        remainingDays: 17,
        remainingCredits: 4
      }
    },
    {
      id: '2',
      fullName: 'Ayşe Demir',
      phone: '0533 456 7890',
      email: 'ayse.demir@example.com',
      status: 'active',
      membershipType: 'university',
      package: {
        name: 'Dragon Boat Paketi 12 Ders',
        remainingDays: 45,
        remainingCredits: 8
      }
    },
    {
      id: '3',
      fullName: 'Mehmet Kaya',
      phone: '0535 789 1234',
      email: 'mehmet.k@example.com',
      status: 'pending',
      membershipType: 'individual'
    },
    {
      id: '4',
      fullName: 'Zeynep Şahin',
      phone: '0536 234 5678',
      email: 'zeynep@example.com',
      status: 'suspended',
      membershipType: 'highschool'
    },
    {
      id: '5',
      fullName: 'Can Yıldız',
      phone: '0537 345 6789',
      email: 'can.yildiz@example.com',
      status: 'passive',
      membershipType: 'corporate'
    },
    {
      id: '6',
      fullName: 'Elif Öztürk',
      phone: '0538 456 7890',
      email: 'elif.o@example.com',
      status: 'active',
      membershipType: 'individual',
      package: {
        name: 'Yelken Eğitimi Paketi 8 Ders',
        remainingDays: 30,
        remainingCredits: 6
      }
    },
    {
      id: '7',
      fullName: 'Burak Aydın',
      phone: '0539 567 8901',
      email: 'burak.aydin@example.com',
      status: 'frozen',
      membershipType: 'university'
    },
    {
      id: '8',
      fullName: 'Selin Yılmaz',
      phone: '0532 678 9012',
      email: 'selin.y@example.com',
      status: 'active',
      membershipType: 'highschool',
      package: {
        name: 'Yüzme Eğitimi Paketi 10 Ders',
        remainingDays: 25,
        remainingCredits: 7
      }
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase()) ||
                         user.phone.includes(search);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesMembership = membershipFilter === 'all' || user.membershipType === membershipFilter;

    return matchesSearch && matchesStatus && matchesMembership;
  });

  // Pagination için hesaplamalar
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sayfa değiştiğinde çağrılacak fonksiyon
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <motion.div 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
        } relative z-0`}
      >
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-white">Kayıtlı Üyeler</h1>
            <p className="text-zinc-400">Tüm üyeleri görüntüleyin ve yönetin</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
          >
            {/* Filtreler */}
            <div className="space-y-4 mb-6">
              {/* Search - Full Width */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  placeholder="Üye ara..."
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              {/* Filters - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-400 text-sm">Üyelik Durumu</Label>
                  <Select value={statusFilter} onValueChange={(value: UserStatus | 'all') => setStatusFilter(value)}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Üyelik Durumu" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="all" className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer">
                        Tümü
                      </SelectItem>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <SelectItem 
                          key={value} 
                          value={value}
                          className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-400 text-sm">Üyelik Türü</Label>
                  <Select value={membershipFilter} onValueChange={(value: MembershipType | 'all') => setMembershipFilter(value)}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Üyelik Türü" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="all" className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer">
                        Tümü
                      </SelectItem>
                      {Object.entries(membershipLabels).map(([value, label]) => (
                        <SelectItem 
                          key={value} 
                          value={value}
                          className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Tablo */}
            <div className="relative overflow-x-auto min-h-[500px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900/50">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">
                      Üye
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[150px]">
                      Telefon
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">
                      E-posta
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">
                      {statusFilter === 'active' ? 'Üyelik Bilgileri' : 'Durum'}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-right whitespace-nowrap min-w-[120px]">
                      İşlemler
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        transition: { duration: 0.2 }
                      }}
                      className="group relative border-zinc-800 cursor-pointer"
                    >
                      <TableCell className="text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
                        {user.fullName}
                      </TableCell>
                      <TableCell className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                        {user.phone}
                      </TableCell>
                      <TableCell className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        {statusFilter === 'active' && user.status === 'active' ? (
                          <div className="space-y-2">
                            <Badge 
                              className={`${statusColors[user.status]} rounded-full px-2 py-1 text-xs font-medium select-none`}
                            >
                              {statusLabels[user.status]}
                            </Badge>
                            <div className="text-sm text-white font-medium">
                              {user.package?.name}
                            </div>
                            <div className="text-xs text-zinc-400">
                              {user.package?.remainingDays} gün
                              {user.package?.remainingCredits && (
                                <span className="ml-1 text-zinc-500">
                                  ({user.package.remainingCredits} kredi)
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <Badge 
                            className={`${statusColors[user.status]} rounded-full px-2 py-1 text-xs font-medium select-none`}
                          >
                            {statusLabels[user.status]}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                            title="Düzenle"
                          >
                            <Edit2 size={16} />
                            <span className="sr-only">Düzenle</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-500/5 transition-colors"
                            title="Pasif Yap"
                          >
                            <UserX size={16} />
                            <span className="sr-only">Pasif Yap</span>
                          </Button>
                        </div>
                      </TableCell>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none border-l-2 border-l-blue-500/20"
                      />
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

          </motion.div>
        </main>
      </motion.div>
    </div>
  );
} 