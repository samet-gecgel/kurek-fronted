"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Package, PackageDurationType } from "@/types/packages/package";

// Örnek veri
const PACKAGE_DATA: Package = {
  id: "1",
  name: "Başlangıç Paketi",
  duration: 1,
  durationType: PackageDurationType.MONTH,
  credits: 8,
  price: 1500,
  isActive: true,
  level: "Başlangıç",
  location: "Ana Şube",
  description: "Bu paket, kürek sporuna yeni başlayanlar için özel olarak hazırlanmıştır. Temel teknikleri öğrenme ve geliştirme fırsatı sunar. Deneyimli eğitmenler eşliğinde güvenli ve profesyonel bir ortamda spor yapma imkanı. Esnek kullanım saatleri ve modern ekipmanlarla donatılmış tesislerimizde kaliteli bir deneyim yaşayın.",
  paymentOptions: [
    "Nakit",
    "Kredi Kartı",
    "Havale/EFT",
    "Multisport"
  ],
  features: [
    "7/24 Tesis Erişimi",
    "Özel Antrenör (4 Seans)",
    "Grup Dersleri",
    "VIP Soyunma Odası",
    "Duş ve Sauna",
    "Havlu Hizmeti",
    "Özel Dolap",
    "Spor Malzemesi Desteği",
    "Ücretsiz Otopark",
    "Kafeterya İndirimi"
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

export default function PackageDetails({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [packageData, setPackageData] = useState<Package | null>(null);
  const router = useRouter();

  useEffect(() => {
    // API'den veri çekme simülasyonu
    const fetchData = async () => {
      try {
        // const response = await fetch(`/api/packages/${params.id}`);
        // const data = await response.json();
        setPackageData(PACKAGE_DATA);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching package data:', error);
        router.push('/admin/controlpanel/packages/assign');
      }
    };

    fetchData();
  }, [params.id, router]);

  if (isLoading || !packageData) {
    return <div>Loading...</div>;
  }

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
          {/* Üst Kısım - Geri Dön ve Düzenle */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
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
              Paketi Düzenle
            </Button>
          </div>

          {/* Paket Detayları */}
          <div className="space-y-6">
            {/* Ana Bilgiler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sol Kısım - Temel Bilgiler */}
              <div className="md:col-span-2 space-y-6">
                {/* Paket Bilgileri */}
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Paket Bilgileri</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-zinc-400">Paket Adı</label>
                      <p className="text-white mt-1">{packageData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Süre</label>
                      <p className="text-white mt-1">{formatDuration(packageData.duration, packageData.durationType)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Kullanım Hakkı</label>
                      <p className="text-white mt-1">{packageData.credits} Kredi</p>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Fiyat</label>
                      <p className="text-white mt-1">
                        {packageData.price.toLocaleString('tr-TR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })} ₺
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ödeme Seçenekleri ve Özellikler */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Ödeme Seçenekleri */}
                  <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Ödeme Seçenekleri</h2>
                    <div className="flex flex-wrap gap-2">
                      {packageData.paymentOptions?.map((option, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full text-sm bg-zinc-800 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-800/80 transition-colors"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Paket Özellikleri */}
                  <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Paket Özellikleri</h2>
                    <div className="flex flex-wrap gap-2">
                      {packageData.features?.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ Kısım - Ek Bilgiler ve İstatistikler */}
              <div className="space-y-6">
                {/* Ek Bilgiler */}
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Ek Bilgiler</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-zinc-400">Seviye</label>
                      <p className="text-white mt-1">{packageData.level || "Belirtilmemiş"}</p>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Lokasyon</label>
                      <p className="text-white mt-1">{packageData.location || "Belirtilmemiş"}</p>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Durum</label>
                      <p className={`mt-1 ${packageData.isActive ? 'text-green-500' : 'text-red-500'}`}>
                        {packageData.isActive ? 'Aktif' : 'Pasif'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">Oluşturulma Tarihi</label>
                      <p className="text-white mt-1">
                        {packageData.createdAt.toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* İstatistikler */}
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">İstatistikler</h2>
                  <div className="space-y-4">
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <p className="text-sm text-zinc-400">Toplam Satış</p>
                      <p className="text-2xl font-semibold text-white mt-1">0</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <p className="text-sm text-zinc-400">Aktif Kullanıcı</p>
                      <p className="text-2xl font-semibold text-white mt-1">0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Açıklama - Grid dışında, tam genişlikte */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Açıklama</h2>
              <p className="text-zinc-300">
                {packageData.description || "Bu paket için henüz bir açıklama eklenmemiş."}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 