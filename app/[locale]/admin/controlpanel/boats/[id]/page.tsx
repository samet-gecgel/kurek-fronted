"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BoatBranch, BoatFormData } from "@/types/boat/boat";

export default function BoatDetails({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const [boat, setBoat] = useState<BoatFormData | null>(null);

  useEffect(() => {
    // Simüle edilmiş veri
    setBoat({
      name: "Sahil 1",
      serialNumber: "KRK-2023-001",
      year: 2023,
      capacity: 1,
      branch: BoatBranch.KUREK,
      class: "1X",
      brand: "Filippi",
      images: [
        "https://images.freeimages.com/images/large-previews/ad1/ruderboot-1560922.jpg",
        "https://images.freeimages.com/images/premium/previews/1915/19151243-female-double-scull-rowing-team.jpg"
      ]
    });
  }, []);

  if (!boat) return null;

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
          <div className="max-w-6xl mx-auto">
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
                onClick={() => router.push(`/admin/controlpanel/boats/edit/${params.id}`)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Düzenle
              </Button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              {/* Fotoğraf Galerisi */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">Tekne Fotoğrafları</h2>
                {boat.images.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {boat.images.map((image, index) => (
                      <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                        <Image
                          src={image}
                          alt={`${boat.name} - Fotoğraf ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-3 left-3 text-white text-sm">
                            Fotoğraf {index + 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-zinc-500 text-center py-8 bg-zinc-800/30 rounded-xl">
                    Fotoğraf bulunmamaktadır
                  </div>
                )}
              </div>

              {/* Tekne Bilgileri */}
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{boat.name}</h1>
                <p className="text-zinc-400 mb-6">{boat.serialNumber}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex justify-between py-2 px-4 rounded-lg bg-zinc-800/50">
                    <span className="text-zinc-400">Branş</span>
                    <span className="text-white font-medium">{boat.branch}</span>
                  </div>
                  <div className="flex justify-between py-2 px-4 rounded-lg bg-zinc-800/50">
                    <span className="text-zinc-400">Tekne Sınıfı</span>
                    <span className="text-white font-medium">{boat.class}</span>
                  </div>
                  <div className="flex justify-between py-2 px-4 rounded-lg bg-zinc-800/50">
                    <span className="text-zinc-400">Üretim Yılı</span>
                    <span className="text-white font-medium">{boat.year}</span>
                  </div>
                  <div className="flex justify-between py-2 px-4 rounded-lg bg-zinc-800/50">
                    <span className="text-zinc-400">Kişi Sayısı</span>
                    <span className="text-white font-medium">{boat.capacity}</span>
                  </div>
                  <div className="flex justify-between py-2 px-4 rounded-lg bg-zinc-800/50">
                    <span className="text-zinc-400">Marka</span>
                    <span className="text-white font-medium">{boat.brand}</span>
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