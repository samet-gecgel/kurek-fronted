'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trophy, GraduationCap, Users, PartyPopper, Calendar, MapPin, CreditCard, Users2, Banknote, Building2, Briefcase, Dumbbell } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "@/components/ui/datePicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { IBANInput } from "@/components/ui/iban-input";

interface EventForm {
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  mapUrl: string;
  maxParticipants: number;
  description: string;
  isClubOnly: boolean;
  isPaid: boolean;
  price: number;
  paymentTypes: string[];
  bankAccount?: string;
}

const eventTypes = [
  { value: 'yarışma', label: 'Yarışma', icon: Trophy },
  { value: 'eğitim', label: 'Eğitim', icon: GraduationCap },
  { value: 'toplantı', label: 'Toplantı', icon: Users },
  { value: 'sosyal', label: 'Sosyal Etkinlik', icon: PartyPopper }
] as const;

const paymentOptions = [
  { id: 'cash', label: 'Nakit', icon: Banknote },
  { id: 'credit_card', label: 'Kredi Kartı', icon: CreditCard },
  { id: 'bank_transfer', label: 'IBAN', icon: Building2 },
  { id: 'corporate', label: 'Kurumsal', icon: Briefcase },
  { id: 'multisport', label: 'Multisport', icon: Dumbbell },
] as const;

const initialFormData: EventForm = {
  title: '',
  type: '',
  date: '',
  time: '',
  location: '',
  mapUrl: '',
  maxParticipants: 0,
  description: '',
  isClubOnly: false,
  isPaid: false,
  price: 0,
  paymentTypes: [],
  bankAccount: '',
};

export default function CreateEventPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState<EventForm>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API'ye kaydet
    console.log('Kaydedildi:', formData);
    router.push('/club-manager/events');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date: Date) => {
    // Tarihi GG.AA.YYYY formatına çevir
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    setFormData(prev => ({
      ...prev,
      date: formattedDate
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
              <h1 className="text-2xl font-bold text-white">Yeni Etkinlik Oluştur</h1>
              <p className="text-zinc-400 mt-1 text-sm">Yeni bir etkinlik oluşturmak için formu doldurun</p>
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

                  {/* Konum ve Harita */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-200 font-medium">
                        Konum
                      </Label>
                      <div className="relative">
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 pl-10 text-lg"
                          placeholder="Etkinlik konumunu girin"
                        />
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mapUrl" className="text-gray-200 font-medium">
                        Harita Bağlantısı
                      </Label>
                      <Input
                        id="mapUrl"
                        name="mapUrl"
                        value={formData.mapUrl}
                        onChange={handleChange}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 text-lg"
                        placeholder="Google Maps bağlantısını yapıştırın"
                      />
                    </div>
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

                  {/* Kayıt Türü ve Ücret Bilgileri */}
                  <div className="grid grid-cols-2 gap-4 col-span-2">
                    {/* Kayıt Türü */}
                    <div className="space-y-2">
                      <Label className="text-gray-200 font-medium">Kayıt Türü</Label>
                      <div className="flex items-center justify-between bg-zinc-800/30 p-5 rounded-xl border border-zinc-700/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-zinc-800">
                            <Users2 className="w-5 h-5 text-zinc-400" />
                          </div>
                          <span className="text-zinc-200 font-medium">Sadece kulüp üyelerine özel</span>
                        </div>
                        <Switch
                          checked={formData.isClubOnly}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, isClubOnly: checked }))
                          }
                        />
                      </div>
                    </div>

                    {/* Ücret Bilgileri */}
                    <div className="space-y-2">
                      <Label className="text-gray-200 font-medium">Ücret Bilgileri</Label>
                      <div className="flex items-center justify-between bg-zinc-800/30 p-5 rounded-xl border border-zinc-700/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-zinc-800">
                            <CreditCard className="w-5 h-5 text-zinc-400" />
                          </div>
                          <span className="text-zinc-200 font-medium">Ücretli Etkinlik</span>
                        </div>
                        <Switch
                          checked={formData.isPaid}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ 
                              ...prev, 
                              isPaid: checked,
                              paymentTypes: checked ? ['credit_card', 'bank_transfer'] : [],
                              price: checked ? prev.price : 0
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/* Ücret Detayları - Tam Genişlik */}
                    {formData.isPaid && (
                      <div className="col-span-2 mt-4 space-y-4 bg-zinc-800/30 p-5 rounded-xl border border-zinc-700/50">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price" className="text-gray-200">
                              Ücret (TL)
                            </Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              value={formData.price}
                              onChange={handleChange}
                              className="bg-zinc-800/50 border-zinc-700/50 text-white h-12"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>

                        {/* Ödeme Seçenekleri */}
                        <div className="space-y-2">
                          <Label className="text-gray-200">Ödeme Seçenekleri</Label>
                          <div className="grid grid-cols-5 gap-3">
                            {paymentOptions.map((option) => {
                              const Icon = option.icon;
                              const isSelected = formData.paymentTypes.includes(option.id);

                              return (
                                <div
                                  key={option.id}
                                  onClick={() => {
                                    setFormData(prev => ({
                                      ...prev,
                                      paymentTypes: isSelected
                                        ? prev.paymentTypes.filter(id => id !== option.id)
                                        : [...prev.paymentTypes, option.id]
                                    }));
                                  }}
                                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                    isSelected 
                                      ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' 
                                      : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                                  }`}
                                >
                                  <Icon className="w-5 h-5" />
                                  <span className="text-xs font-medium">{option.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* IBAN alanı */}
                        {formData.paymentTypes.includes('bank_transfer') && (
                          <div className="space-y-2">
                            <Label htmlFor="bankAccount" className="text-gray-200">
                              IBAN
                            </Label>
                            <IBANInput
                              id="bankAccount"
                              value={formData.bankAccount || ''}
                              onChange={(value) => 
                                setFormData(prev => ({ ...prev, bankAccount: value }))
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
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

                {/* Kaydet Butonu */}
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit"
                    className="min-w-[90px] h-9 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="flex items-center gap-2">
                      <Save className="w-3.5 h-3.5" />
                      <span>Kaydet</span>
                    </div>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 