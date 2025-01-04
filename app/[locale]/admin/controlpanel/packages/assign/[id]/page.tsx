"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Package, PackageDurationType } from "@/types/packages/package";
import { formatPrice } from "@/lib/utils";

export default function PackageDetails({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const [pkg, setPkg] = useState<Package | null>(null);

  useEffect(() => {
    // Simüle edilmiş veri
    setPkg({
      id: "1",
      name: "Başlangıç Paketi",
      duration: 1,
      durationType: PackageDurationType.MONTH,
      credits: 8,
      price: 1500,
      isActive: true,
      level: "Başlangıç",
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }, []);

  if (!pkg) return null;

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
      }`}>
        <main className="p-4 md:p-8 mt-14 md:mt-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri Dön
              </Button>

              <Button
                onClick={() => router.push(`/admin/controlpanel/packages/assign/edit/${params.id}`)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Düzenle
              </Button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">{pkg.name}</h1>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                    {pkg.isActive ? 'Aktif' : 'Pasif'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 px-4 rounded-lg bg-zinc-800/50">
                    <span className="text-zinc-400">Süre</span>
                    <span className="text-white font-medium">
                      {formatDuration(pkg.duration, pkg.durationType)}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 px-4 rounded-lg bg-zinc-800/50">
                    <span className="text-zinc-400">Kullanım Hakkı</span>
                    <span className="text-white font-medium">{pkg.credits} Kredi</span>
                  </div>

                  <div className="flex justify-between py-2 px-4 rounded-lg bg-zinc-800/50">
                    <span className="text-zinc-400">Fiyat</span>
                    <span className="text-white font-medium">{formatPrice(pkg.price)} ₺</span>
                  </div>

                  {pkg.level && (
                    <div className="flex justify-between py-2 px-4 rounded-lg bg-zinc-800/50">
                      <span className="text-zinc-400">Seviye</span>
                      <span className="text-white font-medium">{pkg.level}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-zinc-800 pt-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Paket Geçmişi</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-zinc-400">
                      <span>Oluşturulma Tarihi</span>
                      <span>{pkg.createdAt.toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Son Güncelleme</span>
                      <span>{pkg.updatedAt.toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 