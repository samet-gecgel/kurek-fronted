"use client";

import { useState } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const formatDuration = (duration: number, type: PackageDurationType) => {
    return `${duration} ${type === PackageDurationType.MONTH ? 'Ay' : 'Gün'}`;
  };

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
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-8">
        <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
              <Input
                className="pl-10 bg-zinc-800/50 border-zinc-700 text-white w-full"
                placeholder="Paket ara..."
              />
            </div>

            <Button
              onClick={() => router.push('/admin/controlpanel/packages/assign/add')}
              className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Paket Ekle
            </Button>
          </div>

          <div className="relative overflow-x-auto min-h-[500px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900/50">
          <Table>
              <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">Paket Adı</TableHead>
                  <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">Süre</TableHead>
                  <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">Kullanım Hakkı</TableHead>
                  <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">Fiyat</TableHead>
                  <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-right whitespace-nowrap min-w-[120px]">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PACKAGES.map((pkg) => (
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
                        {pkg.credits} Kredi
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
        </main>
      </div>
    </div>
  );
}
