'use client';

import { useState } from "react";
//import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Clock, 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  Facebook,
  Save,
} from "lucide-react";

interface SettingsForm {
  clubName: string;
  email: string;
  phone: string;
  address: string;
  workingHours: {
    monday: { start: string; end: string; isOpen: boolean };
    tuesday: { start: string; end: string; isOpen: boolean };
    wednesday: { start: string; end: string; isOpen: boolean };
    thursday: { start: string; end: string; isOpen: boolean };
    friday: { start: string; end: string; isOpen: boolean };
    saturday: { start: string; end: string; isOpen: boolean };
    sunday: { start: string; end: string; isOpen: boolean };
  };
  socialMedia: {
    instagram: string;
    facebook: string;
  };
}

const days = [
  { id: 'monday', label: 'Pazartesi' },
  { id: 'tuesday', label: 'Salı' },
  { id: 'wednesday', label: 'Çarşamba' },
  { id: 'thursday', label: 'Perşembe' },
  { id: 'friday', label: 'Cuma' },
  { id: 'saturday', label: 'Cumartesi' },
  { id: 'sunday', label: 'Pazar' },
] as const;

export default function Settings() {
  //const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock veri - gerçek uygulamada API'den gelecek
  const [formData, setFormData] = useState<SettingsForm>({
    clubName: "FitLife Club İstanbul",
    email: "info@fitlifeclub.com",
    phone: "+90 (532) 555 44 33",
    address: "Bağdat Caddesi No:123, Kadıköy, İstanbul",
    workingHours: {
      monday: { start: "07:00", end: "23:00", isOpen: true },
      tuesday: { start: "07:00", end: "23:00", isOpen: true },
      wednesday: { start: "07:00", end: "23:00", isOpen: true },
      thursday: { start: "07:00", end: "23:00", isOpen: true },
      friday: { start: "07:00", end: "23:00", isOpen: true },
      saturday: { start: "09:00", end: "22:00", isOpen: true },
      sunday: { start: "09:00", end: "20:00", isOpen: true },
    },
    socialMedia: {
      instagram: "fitlifeclub",
      facebook: "fitlifeclubist",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API çağrısı yapılacak
      console.log('Settings data:', formData);
      // Başarılı güncelleme mesajı göster
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWorkingHourChange = (
    day: keyof SettingsForm['workingHours'], 
    field: 'start' | 'end' | 'isOpen', 
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Ayarlar</h1>
            <p className="text-zinc-400">Kulüp bilgilerini ve ayarlarını yönetin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    Kulüp Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Kulüp Adı
                      </label>
                      <input
                        type="text"
                        value={formData.clubName}
                        onChange={(e) => setFormData(prev => ({ ...prev, clubName: e.target.value }))}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        E-posta
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Telefon
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Adres
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Çalışma Saatleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {days.map(day => (
                      <div key={day.id} className="flex items-center gap-4">
                        <div className="w-32">
                          <label className="text-sm font-medium text-white">
                            {day.label}
                          </label>
                        </div>
                        <div className="flex items-center gap-4">
                          <input
                            type="time"
                            value={formData.workingHours[day.id].start}
                            onChange={(e) => handleWorkingHourChange(day.id, 'start', e.target.value)}
                            className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                            disabled={!formData.workingHours[day.id].isOpen}
                          />
                          <span className="text-zinc-400">-</span>
                          <input
                            type="time"
                            value={formData.workingHours[day.id].end}
                            onChange={(e) => handleWorkingHourChange(day.id, 'end', e.target.value)}
                            className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                            disabled={!formData.workingHours[day.id].isOpen}
                          />
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.workingHours[day.id].isOpen}
                              onChange={(e) => handleWorkingHourChange(day.id, 'isOpen', e.target.checked)}
                              className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-500"
                            />
                            <span className="text-sm text-zinc-400">Açık</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Sosyal Medya</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Instagram
                      </label>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <input
                          type="text"
                          value={formData.socialMedia.instagram}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                          }))}
                          className="w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                          placeholder="Kullanıcı adı"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Facebook
                      </label>
                      <div className="relative">
                        <Facebook className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <input
                          type="text"
                          value={formData.socialMedia.facebook}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                          }))}
                          className="w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                          placeholder="Sayfa adı"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-end gap-3">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 