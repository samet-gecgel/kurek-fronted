'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";

interface LocationForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  description: string;
  city: string;
  district: string;
}

export default function AddLocation() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LocationForm>({
    name: '',
    address: '',
    phone: '',
    email: '',
    workingHours: '',
    description: '',
    city: '',
    district: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API çağrısı yapılacak
      console.log('Form data:', formData);
      router.push('/club-manager/packages');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              <h1 className="text-2xl font-bold text-white">Yeni Lokasyon Ekle</h1>
              <p className="text-zinc-400">Yeni bir lokasyon eklemek için formu doldurun</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  Lokasyon Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Lokasyon Adı
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="Örn: İstanbul Şubesi"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        E-posta
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="0212 xxx xx xx"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Çalışma Saatleri
                      </label>
                      <input
                        type="text"
                        value={formData.workingHours}
                        onChange={(e) => setFormData(prev => ({ ...prev, workingHours: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="Örn: 09:00 - 22:00"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Şehir
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="Şehir seçin"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        İlçe
                      </label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="İlçe seçin"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Açık Adres
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white min-h-[100px]"
                      placeholder="Detaylı adres bilgisi"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Açıklama
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white min-h-[100px]"
                      placeholder="Lokasyon hakkında ek bilgiler..."
                    />
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
                      {isSubmitting ? 'Kaydediliyor...' : 'Lokasyon Ekle'}
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