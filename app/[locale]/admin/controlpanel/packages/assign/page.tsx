"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, PackageDurationType } from "@/types/packages/package";

// Örnek veri
const PACKAGES: Package[] = [
  {
    id: "1",
    name: "Başlangıç Paketi",
    duration: 1,
    durationType: PackageDurationType.MONTH,
    credits: 8,
    price: 1500,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Deneme Paketi",
    duration: 10,
    durationType: PackageDurationType.DAY,
    credits: 4,
    price: 500,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function PackageList() {
  const t = useTranslations('packageList');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const formatDuration = (duration: number, type: PackageDurationType) => {
    return `${duration} ${type === PackageDurationType.MONTH ? t('durationType.month') : t('durationType.day')}`;
  };

  // Arama ve filtreleme
  const filteredPackages = PACKAGES.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.credits.toString().includes(searchTerm) ||
    pkg.price.toString().includes(searchTerm)
  );

  // Pagination hesaplamaları
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = filteredPackages.slice(startIndex, endIndex);

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      } relative z-0`}>
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0">
          {/* Başlık ve Buton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
              <p className="text-zinc-400 mt-1">{t('subtitle')}</p>
            </div>
            
            <Button
              onClick={() => router.push('/admin/controlpanel/packages/assign/add')}
              className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
            >
              <Plus size={20} className="mr-2" />
              {t('addNew')}
            </Button>
          </div>

          {/* Tablo Card */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
            {/* Card Header */}
            <div className="p-6 border-b border-zinc-800/50">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white w-full"
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              {/* Bilgi mesajı */}
              <div className="mt-4 text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                {t('clickInfo')}
              </div>
            </div>

            {/* Tablo */}
            <div className="relative overflow-x-auto min-h-[600px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900/50">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">{t('table.name')}</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">{t('table.duration')}</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">{t('table.credits')}</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">{t('table.price')}</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-right whitespace-nowrap min-w-[120px]">{t('table.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPackages.map((pkg) => (
                    <TableRow 
                      key={pkg.id} 
                      onClick={() => router.push(`/admin/controlpanel/packages/assign/${pkg.id}`)}
                      className="group relative border-zinc-800 cursor-pointer hover:bg-white/3 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
                            {pkg.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                          {formatDuration(pkg.duration, pkg.durationType)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                          {pkg.credits} {t('credits')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                          {pkg.price.toLocaleString('tr-TR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })} ₺
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/admin/controlpanel/packages/assign/edit/${pkg.id}`);
                            }}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-500/5 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Silme işlemi
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredPackages.length > itemsPerPage && (
              <div className="p-6 border-t border-zinc-800/50 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
