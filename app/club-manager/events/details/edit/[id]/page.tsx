'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trophy, GraduationCap, Users, PartyPopper, Calendar } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "@/components/ui/datePicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface EventForm {
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  description: string;
  isActive: boolean;
}

const eventTypes = [
  { value: 'yarışma', label: 'Kürek Yarışması', icon: Trophy },
  { value: 'eğitim', label: 'Teknik Eğitim', icon: GraduationCap },
  { value: 'toplantı', label: 'Takım Toplantısı', icon: Users },
  { value: 'sosyal', label: 'Sosyal Etkinlik', icon: PartyPopper }
] as const;

export default function EditEvent() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock veri - gerçek uygulamada API'den gelecek
  const [formData, setFormData] = useState<EventForm>({
    title: "Kürek Teknikleri Eğitimi",
    type: "eğitim",
    date: "20.03.2024",
    time: "09:00",
    location: "Kürek Havuzu 1",
    maxParticipants: 8,
    description: "Temel kürek teknikleri, su üzerinde denge ve koordinasyon çalışmaları. Başlangıç seviyesinden orta seviyeye geçiş için ideal bir eğitim programı. Katılımcılar temel kürek çekme tekniklerini öğrenecek ve su üzerinde pratik yapma fırsatı bulacaklar.",
    isActive: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API çağrısı yapılacak
      console.log('Event data:', formData);
      router.push('/club-manager/events');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    setFormData(prev => ({
      ...prev,
      date: formattedDate
    }));
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-4xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="text-white hover:text-white hover:bg-zinc-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Etkinliği Düzenle</h1>
              <p className="text-zinc-400 mt-1 text-sm">Etkinlik bilgilerini güncelleyin</p>
            </div>
          </div>

          <Card className="bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Etkinlik Adı */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-200 font-medium">
                      Etkinlik Adı
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="Etkinlik adını girin"
                    />
                  </div>

                  {/* Etkinlik Tipi */}
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-gray-200 font-medium">
                      Etkinlik Tipi
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger 
                        className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 text-base hover:bg-zinc-800 transition-colors"
                      >
                        <SelectValue placeholder="Etkinlik tipi seçin" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        {eventTypes.map((type) => (
                          <SelectItem 
                            key={type.value} 
                            value={type.value}
                            className="text-zinc-100 hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <type.icon className="w-4 h-4" />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tarih */}
                  <div className="space-y-2">
                    <Label className="text-gray-200 font-medium">
                      Tarih
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white hover:bg-zinc-800 hover:text-white justify-start text-left font-normal h-12"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.date || "Tarih seçin"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-zinc-900 border border-zinc-800 shadow-xl">
                        <DatePicker onDateSelect={handleDateSelect} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Saat */}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-gray-200 font-medium">
                      Saat
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="bg-zinc-900 border-zinc-800 text-white h-12 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                    />
                  </div>

                  {/* Konum */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-200 font-medium">
                      Konum
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="Etkinlik konumunu girin"
                    />
                  </div>

                  {/* Maksimum Katılımcı */}
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants" className="text-gray-200 font-medium">
                      Maksimum Katılımcı
                    </Label>
                    <Input
                      id="maxParticipants"
                      name="maxParticipants"
                      type="number"
                      value={formData.maxParticipants}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                {/* Açıklama */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-200 font-medium">
                    Açıklama
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-zinc-800/50 border-zinc-700/50 text-white min-h-[120px] text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="Etkinlik açıklamasını girin"
                  />
                </div>

                {/* Durum ve butonların olduğu kısmı güncelleyelim */}
                <div className="flex flex-col gap-6 pt-6 border-t border-zinc-800">
                  {/* Durum */}
                  <div className="flex items-center justify-between bg-zinc-800/30 px-4 py-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${formData.isActive ? 'bg-green-500' : 'bg-zinc-500'}`} />
                      <span className="text-sm font-medium text-white">Etkinlik Durumu</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Butonlar */}
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="min-w-[90px] h-10 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
                    >
                      İptal
                    </Button>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-[120px] h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Kaydediliyor</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Save className="w-3.5 h-3.5" />
                          <span>Kaydet</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 