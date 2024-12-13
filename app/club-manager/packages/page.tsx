'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, MoreVertical, Edit2, Trash2, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Location {
  id: string;
  name: string;
  packages: Package[];
}

interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
  duration: string;
  credits: string;
  paymentOptions: PaymentOption[];
  isActive: boolean;
  features: string[];
  soldCount: number;
}

type PaymentOption = 'cash' | 'credit_card' | 'iban' | 'corporate' | 'multisport';

const locations: Location[] = [
  {
    id: "loc1",
    name: "İstanbul",
    packages: [
      {
        id: 1,
        name: "Aylık Paket",
        price: 2500,
        description: "30 gün boyunca 8 kullanım hakkı",
        duration: "30",
        credits: "8",
        paymentOptions: ['cash', 'credit_card', 'iban'],
        isActive: true,
        features: ["7/24 Erişim", "Özel Antrenör", "Grup Dersleri"],
        soldCount: 45
      },
      // Diğer paketler...
    ]
  },
  {
    id: "loc2",
    name: "Antalya",
    packages: [
      {
        id: 2,
        name: "3 Aylık Paket",
        price: 6000,
        description: "90 gün boyunca 30 kullanım hakkı",
        duration: "90",
        credits: "30",
        paymentOptions: ['cash', 'credit_card'],
        isActive: true,
        features: ["7/24 Erişim", "Özel Antrenör"],
        soldCount: 28
      }
    ]
  },
  {
    id: "loc3",
    name: "İzmir",
    packages: []
  }
];

const paymentLabels = {
  cash: 'Nakit',
  credit_card: 'Kredi Kartı',
  iban: 'IBAN',
  corporate: 'Kurumsal',
  multisport: 'Multisport'
};

export default function PackageManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(locations[0].id);

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
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl font-bold text-white">Paket Yönetimi</h1>
              <p className="text-zinc-400">Mevcut paketleri yönetin ve yeni paketler ekleyin</p>
            </motion.div>

            <Link href="/club-manager/packages/add">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Paket Ekle
              </Button>
            </Link>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                Lokasyonlar
              </h2>
              <Link href="/club-manager/location/add">
                <Button 
                  variant="outline" 
                  className="border-blue-500/20 text-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Lokasyon
                </Button>
              </Link>
            </div>

            <div className="flex space-x-2">
              {locations.map((location) => (
                <div key={location.id} className="relative group">
                  <div
                    onClick={() => setActiveTab(location.id)}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer
                      flex items-center gap-2 min-w-[120px] justify-between
                      ${activeTab === location.id
                        ? 'bg-zinc-800 text-white shadow-lg shadow-black/20'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      }
                    `}
                  >
                    <span>{location.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button 
                          className="p-1 rounded-full hover:bg-zinc-700/50 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4 text-zinc-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-zinc-800 border-zinc-700">
                        <DropdownMenuItem 
                          className="flex items-center text-white hover:bg-zinc-700/50 cursor-pointer px-3 py-2 text-sm"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Lokasyonu Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center text-red-500 hover:bg-red-500/10 cursor-pointer px-3 py-2 text-sm"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Lokasyonu Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.find(loc => loc.id === activeTab)?.packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/club-manager/packages/details/${pkg.id}`}>
                  <Card className="bg-zinc-900/50 border-zinc-800 h-full hover:bg-zinc-900/80 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center">
                          <Package className="w-5 h-5 mr-2 text-blue-500" />
                          {pkg.name}
                        </CardTitle>
                        <p className="text-sm text-zinc-400 mt-1">{pkg.description}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-2xl font-bold text-white">₺{pkg.price.toLocaleString()}</p>
                          <p className="text-sm text-zinc-400">
                            {pkg.duration} günlük paket
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 font-medium">
                            {pkg.credits} Kullanım
                          </span>
                          <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                            pkg.isActive 
                              ? 'bg-green-500/10 text-green-500' 
                              : 'bg-zinc-500/10 text-zinc-500'
                          }`}>
                            {pkg.isActive ? 'Aktif' : 'Pasif'}
                          </span>
                        </div>

                        <div className="pt-4 border-t border-zinc-800">
                          <p className="text-sm font-medium text-white mb-2">Paket Özellikleri</p>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, idx) => (
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
                            {pkg.paymentOptions.map((option) => (
                              <span
                                key={option}
                                className="px-2.5 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300"
                              >
                                {paymentLabels[option]}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-800">
                          <p className="text-sm text-zinc-400">
                            <span className="text-white font-medium">{pkg.soldCount}</span> kez satıldı
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 