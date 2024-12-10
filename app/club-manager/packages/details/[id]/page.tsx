'use client';

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ManagerSidebar } from "../../../components/ManagerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, Edit2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

type PaymentOption = 'cash' | 'credit_card' | 'iban' | 'corporate' | 'multisport';

const paymentLabels: Record<PaymentOption, string> = {
  cash: 'Nakit',
  credit_card: 'Kredi Kartı',
  iban: 'IBAN',
  corporate: 'Kurumsal',
  multisport: 'Multisport'
};

export default function PackageDetails() {
  const router = useRouter();
  const params = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Mock veri - gerçek uygulamada API'den gelecek
  const packageData = {
    id: params.id,
    name: "Aylık Paket",
    price: 2500,
    description: "30 gün boyunca 8 kullanım hakkı",
    duration: "30",
    credits: "8",
    paymentOptions: ['cash', 'credit_card', 'iban', 'corporate', 'multisport'] as PaymentOption[],
    isActive: true,
    features: ["7/24 Erişim", "Özel Antrenör", "Grup Dersleri"],
    soldCount: 45,
    location: "İstanbul",
    createdAt: "2024-01-01",
    lastUpdated: "2024-03-15"
  };

  const handleDelete = () => {
    // API çağrısı yapılacak
    console.log('Paket silindi:', params.id);
    setShowDeleteDialog(false);
    router.push('/club-manager/packages');
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="p-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">{packageData.name}</h1>
                <p className="text-zinc-400">{packageData.description}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link href={`/club-manager/packages/details/edit/${params.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Paketi Düzenle
                </Button>
              </Link>
              <Button 
                variant="destructive" 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Paketi Kaldır
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    Paket Detayları
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-3xl font-bold text-white">₺{packageData.price.toLocaleString()}</p>
                    <p className="text-sm text-zinc-400">{packageData.duration} günlük paket</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 font-medium">
                      {packageData.credits} Kullanım
                    </span>
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                      packageData.isActive 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-zinc-500/10 text-zinc-500'
                    }`}>
                      {packageData.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-sm font-medium text-white mb-2">Lokasyon</p>
                    <p className="text-zinc-400">{packageData.location}</p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-sm font-medium text-white mb-2">Paket Özellikleri</p>
                    <ul className="space-y-2">
                      {packageData.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-zinc-400 flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-sm font-medium text-white mb-2">Ödeme Seçenekleri</p>
                    <div className="flex flex-wrap gap-2">
                      {packageData.paymentOptions.map((option: PaymentOption) => (
                        <span
                          key={option}
                          className="px-2.5 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300"
                        >
                          {paymentLabels[option]}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">İstatistikler ve Bilgiler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-800/50 rounded-lg">
                      <p className="text-sm text-zinc-400">Toplam Satış</p>
                      <p className="text-2xl font-bold text-white">{packageData.soldCount}</p>
                    </div>
                    <div className="p-4 bg-zinc-800/50 rounded-lg">
                      <p className="text-sm text-zinc-400">Toplam Gelir</p>
                      <p className="text-2xl font-bold text-white">
                        ₺{(packageData.soldCount * packageData.price).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-zinc-400">Oluşturulma Tarihi</p>
                        <p className="text-white">
                          {new Date(packageData.createdAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Son Güncelleme</p>
                        <p className="text-white">
                          {new Date(packageData.lastUpdated).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-white">
              Paketi kaldırmak istiyor musunuz?
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="border-zinc-700 text-zinc-400 hover:text-white"
            >
              İptal
            </Button>
            <Button 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Kaldır
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 