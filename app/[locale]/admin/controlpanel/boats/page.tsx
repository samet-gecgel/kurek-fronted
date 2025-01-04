"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
    brand: "Filippi"
  },
  {
    id: "2",
    name: "Dalga",
    serialNumber: "KNO-2022-002",
    year: 2022,
    capacity: 2,
    branch: "KANO",
    class: "2X",
    brand: "Nelo"
  },
  // ... diğer tekneler
];

export default function BoatsList() {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 10;

  // Component mount olduktan sonra render edilsin
  useEffect(() => {
    setMounted(true);
  }, []);

  // Component mount olmadan önce hiçbir şey render etme
  if (!mounted) {
    return null;
  }

  // Filtreleme işlemi
  const filteredBoats = BOATS.filter((boat) =>
    boat.name.toLowerCase().includes(search.toLowerCase()) ||
    boat.serialNumber.toLowerCase().includes(search.toLowerCase())
  );

  // Sayfalama için hesaplamalar
  const totalPages = Math.ceil(filteredBoats.length / itemsPerPage);
  const paginatedBoats = filteredBoats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-[#09090B]">
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-84' : 'w-24'
      }`}>
        <AdminSidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      </div>

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      }`}>
        <main className="p-4 md:p-8 mt-14 md:mt-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Tekneler</h1>
              <p className="text-zinc-400">Tüm tekneleri görüntüleyin ve yönetin</p>
            </div>
            
            <Button 
              onClick={() => router.push('/admin/controlpanel/boats/add')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tekne Ekle
            </Button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            {/* Arama */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  placeholder="Tekne ara..."
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Tablo */}
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium w-[250px]">
                      Tekne Adı
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium w-[200px]">
                      Seri No
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium w-[150px]">
                      Üretim Yılı
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-center w-[150px]">
                      Kişi Sayısı
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-right w-[120px]">
                      İşlemler
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBoats.map((boat) => (
                    <TableRow 
                      key={boat.id} 
                      className="group relative border-zinc-800 cursor-pointer hover:bg-white/3 transition-colors"
                      onClick={() => router.push(`/admin/controlpanel/boats/${boat.id}`)}
                    >
                      <TableCell className="font-medium text-white group-hover:text-blue-400 transition-colors py-4">
                        {boat.name}
                      </TableCell>
                      <TableCell className="text-zinc-300 py-4">
                        {boat.serialNumber}
                      </TableCell>
                      <TableCell className="text-zinc-300 py-4">
                        {boat.year}
                      </TableCell>
                      <TableCell className="text-center text-zinc-300 py-4">
                        {boat.capacity}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10"
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
                            className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-500/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Silme işlemi
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>

                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none border-l-2 border-l-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </TableRow>
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
          </div>
        </main>
      </div>
    </div>
  );
} 