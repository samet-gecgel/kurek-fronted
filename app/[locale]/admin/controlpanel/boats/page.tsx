"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";

// Örnek veri
const BOATS = [
  {
    id: "1",
    name: "Sahil 1",
    serialNumber: "KRK-2023-001",
    year: 2023,
    capacity: 1,
    branch: "KÜREK",
    class: "1X",
    brand: "Filippi",
    isActive: true
  },
  {
    id: "2",
    name: "Dalga",
    serialNumber: "KNO-2022-002",
    year: 2022,
    capacity: 2,
    branch: "KANO",
    class: "2X",
    brand: "Nelo",
    isActive: false
  }
];

export default function BoatsList() {
  const t = useTranslations('boatList');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const filteredBoats = BOATS.filter((boat) =>
    boat.name.toLowerCase().includes(search.toLowerCase()) ||
    boat.serialNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBoats.length / itemsPerPage);
  const paginatedBoats = filteredBoats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
              <p className="text-zinc-400 mt-1">{t('subtitle')}</p>
            </div>
            
            <Button
              onClick={() => router.push('/admin/controlpanel/boats/add')}
              className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
            >
              <Plus size={20} className="mr-2" />
              {t('addNew')}
            </Button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800/50">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white w-full"
                  placeholder={t('search')}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="relative overflow-x-auto min-h-[600px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900/50">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">{t('table.name')}</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">{t('table.serialNumber')}</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[150px]">{t('table.year')}</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[150px]">{t('table.capacity')}</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[150px]">{t('table.status')}</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-right whitespace-nowrap min-w-[120px]">{t('table.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBoats.map((boat) => (
                    <TableRow 
                      key={boat.id} 
                      onClick={() => router.push(`/admin/controlpanel/boats/${boat.id}`)}
                      className="group relative border-zinc-800 cursor-pointer hover:bg-white/3 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
                            {boat.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                          {boat.serialNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                          {boat.year}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">
                          {boat.capacity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-sm font-medium inline-flex items-center justify-center
                          ${boat.isActive 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-red-500/10 text-red-500'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mr-2
                            ${boat.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                          />
                          {boat.isActive ? t('status.active') : t('status.inactive')}
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
                              router.push(`/admin/controlpanel/boats/edit/${boat.id}`);
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

            {filteredBoats.length > itemsPerPage && (
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