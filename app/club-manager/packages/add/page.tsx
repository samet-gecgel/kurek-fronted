'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";

interface PackageForm {
  name: string;
  duration: string;
  durationType: 'day' | 'month';
  credits: string;
  price: string;
  locationId: string;
  description: string;
  features: string[];
  paymentOptions: ('cash' | 'credit_card' | 'iban' | 'corporate' | 'multisport')[];
}

type PaymentOption = 'cash' | 'credit_card' | 'iban' | 'corporate' | 'multisport';

const locations = [
  { id: 'loc1', name: 'İstanbul' },
  { id: 'loc2', name: 'Antalya' },
  { id: 'loc3', name: 'İzmir' },
];

const paymentOptions = [
  { id: 'cash', label: 'Nakit' },
  { id: 'credit_card', label: 'Kredi Kartı' },
  { id: 'iban', label: 'IBAN' },
  { id: 'corporate', label: 'Kurumsal' },
  { id: 'multisport', label: 'Multisport' }
];

const defaultFeatures = ["7/24 Erişim", "Özel Antrenör", "Grup Dersleri"];

export default function AddPackage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(defaultFeatures);
  const [newFeature, setNewFeature] = useState('');
  const [formData, setFormData] = useState<PackageForm>({
    name: '',
    duration: '',
    durationType: 'month',
    credits: '',
    price: '',
    locationId: '',
    description: '',
    features: defaultFeatures,
    paymentOptions: ['cash', 'credit_card', 'iban', 'corporate', 'multisport']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API çağrısı yapılacak
      console.log('Form data:', {
        ...formData,
        isActive: true, // Varsayılan olarak aktif
        features: selectedFeatures
      });
      router.push('/club-manager/packages');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !selectedFeatures.includes(newFeature.trim())) {
      setSelectedFeatures([...selectedFeatures, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
  };

  const togglePaymentOption = (option: 'cash' | 'credit_card' | 'iban' | 'corporate' | 'multisport') => {
    setFormData(prev => ({
      ...prev,
      paymentOptions: prev.paymentOptions.includes(option)
        ? prev.paymentOptions.filter(o => o !== option)
        : [...prev.paymentOptions, option]
    }));
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
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Yeni Paket Ekle</h1>
              <p className="text-zinc-400">Yeni bir paket oluşturmak için formu doldurun</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-500" />
                  Paket Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Paket Adı
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="Örn: Aylık Paket"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Lokasyon
                      </label>
                      <select
                        value={formData.locationId}
                        onChange={(e) => setFormData(prev => ({ ...prev, locationId: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                      >
                        <option value="">Lokasyon Seçin</option>
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.id}>{loc.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Süre
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                          placeholder="Süre"
                        />
                        <select
                          value={formData.durationType}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            durationType: e.target.value as 'day' | 'month'
                          }))}
                          className="w-32 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        >
                          <option value="month">Ay</option>
                          <option value="day">Gün</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Kullanım Hakkı
                      </label>
                      <input
                        type="number"
                        value={formData.credits}
                        onChange={(e) => setFormData(prev => ({ ...prev, credits: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="Toplam kullanım hakkı"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Fiyat (₺)
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-white">
                        Açıklama
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white min-h-[100px]"
                        placeholder="Paket hakkında detaylı açıklama yazın..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Ödeme Seçenekleri
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {paymentOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => togglePaymentOption(option.id as PaymentOption)}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            formData.paymentOptions.includes(option.id as PaymentOption)
                              ? 'bg-blue-500/20 text-blue-500 border border-blue-500/20'
                              : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-white">
                      Paket Özellikleri
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedFeatures.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-zinc-800 text-white rounded-full flex items-center gap-2"
                        >
                          {feature}
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(feature)}
                            className="text-zinc-400 hover:text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="Yeni özellik ekle"
                      />
                      <Button
                        type="button"
                        onClick={handleAddFeature}
                        variant="outline"
                        className="border-zinc-700 text-zinc-400 hover:text-white"
                      >
                        Ekle
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="border-zinc-700 text-zinc-400 hover:text-white"
                    >
                      İptal
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Kaydediliyor...' : 'Paket Ekle'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 