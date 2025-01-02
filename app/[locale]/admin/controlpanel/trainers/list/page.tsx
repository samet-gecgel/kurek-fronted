"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Edit2, UserX } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";

// Antrenör durumları için etiketler ve renkler
const statusLabels: { [key: string]: string } = {
  active: "Aktif",
  pending: "Onay Bekliyor",
  suspended: "Askıya Alındı",
  passive: "Pasif"
};

const statusColors: { [key: string]: string } = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  suspended: "bg-red-500/10 text-red-400 border-red-500/20",
  passive: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
};

// Örnek antrenör verisi
const TRAINERS = [
  {
    id: '1',
    fullName: 'Ahmet Yılmaz',
    phone: '0532 123 4567',
    email: 'ahmet@example.com',
    status: 'active'
  },
  {
    id: '2',
    fullName: 'Ayşe Demir',
    phone: '0533 456 7890',
    email: 'ayse.demir@example.com',
    status: 'pending'
  },
  {
    id: '3',
    fullName: 'Mehmet Kaya',
    phone: '0534 567 8901',
    email: 'mehmet@example.com',
    status: 'suspended'
  },
  {
    id: '4',
    fullName: 'Zeynep Şahin',
    phone: '0535 678 9012',
    email: 'zeynep@example.com',
    status: 'passive'
  }
];


const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
    ssr: false
  });

export default function TrainersList() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const t = useTranslations('trainersList');

  // Filtreleme işlemi
  const filteredTrainers = TRAINERS.filter(trainer => {
    const matchesSearch = trainer.fullName.toLowerCase().includes(search.toLowerCase()) ||
                         trainer.email.toLowerCase().includes(search.toLowerCase()) ||
                         trainer.phone.includes(search);
    const matchesStatus = statusFilter === 'all' || trainer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sayfalama için hesaplamalar
  const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage);
  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Antrenör detayına yönlendirme fonksiyonu
  const handleTrainerClick = (trainerId: string) => {
    router.push(`/admin/controlpanel/trainers/info/${trainerId}`);
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <MotionDiv 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
        } relative z-0`}
      >
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0">
          <MotionDiv 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
            <p className="text-zinc-400">{t('subtitle')}</p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
          >
            {/* Filtreler */}
            <div className="space-y-4 mb-6">
              {/* Arama */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  placeholder={t('search')}
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              {/* Filtreler - İki Sütun */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-400 text-sm">{t('filters.status')}</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder={t('filters.selectStatus')} />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="all" className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer">
                        {t('filters.all')}
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
              </div>
            </div>

            {/* Tablo */}
            <div className="relative overflow-x-auto min-h-[500px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900/50">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">
                      {t('table.trainer')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[150px]">
                      {t('table.phone')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">
                      {t('table.email')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[120px]">
                      {t('table.status')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-right whitespace-nowrap min-w-[120px]">
                      {t('table.actions')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTrainers.map((trainer) => (
                    <tr
                      key={trainer.id}
                      onClick={() => handleTrainerClick(trainer.id)}
                      className="group relative border-zinc-800 cursor-pointer hover:bg-white/3 transition-colors"
                    >
                      <TableCell className="text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
                        {trainer.fullName}
                      </TableCell>
                      <TableCell className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                        {trainer.phone}
                      </TableCell>
                      <TableCell className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                        {trainer.email}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`${statusColors[trainer.status]} rounded-full px-2 py-1 text-xs font-medium select-none`}
                        >
                          {statusLabels[trainer.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                            title={t('actions.edit')}
                            onClick={(e) => {
                              e.stopPropagation(); // Tıklamanın üst elemana geçmesini engelle
                              // Edit işlemi
                            }}
                          >
                            <Edit2 size={16} />
                            <span className="sr-only">{t('actions.edit')}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-500/5 transition-colors"
                            title={t('actions.deactivate')}
                            onClick={(e) => {
                              e.stopPropagation(); // Tıklamanın üst elemana geçmesini engelle
                              // Deactivate işlemi
                            }}
                          >
                            <UserX size={16} />
                            <span className="sr-only">{t('actions.deactivate')}</span>
                          </Button>
                        </div>
                      </TableCell>

                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none border-l-2 border-l-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </tr>
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
          </MotionDiv>
        </main>
      </MotionDiv>
    </div>
  );
} 