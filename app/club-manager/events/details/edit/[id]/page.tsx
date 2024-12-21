'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trophy, GraduationCap, Users, PartyPopper, Calendar, CreditCard, Banknote, Building2, Briefcase, Dumbbell } from "lucide-react";
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
];

export default function EditEvent() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock veri - gerçek uygulamada API'den gelecek
  const [formData, setFormData] = useState<EventForm>({
    title: "Kürek Yarışması",
    type: "yarışma",
    date: "15.03.2024",
    time: "10:00",
    location: "Tuzla, İstanbul",
    mapUrl: "https://maps.app.goo.gl/6KMCKpzRfhJSYDXE8",
    maxParticipants: 50,
    description: "Yıllık kürek yarışması etkinliği. Tüm kulüp üyelerimiz davetlidir. Yarışma sonrası kokteyl düzenlenecektir.",
    isClubOnly: true,
    isPaid: true,
    price: 100,
    paymentTypes: ['credit_card', 'bank_transfer'],
    bankAccount: 'TR12 3456 7890 1234 5678 9012 34'
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

  const togglePaymentType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      paymentTypes: prev.paymentTypes.includes(type)
        ? prev.paymentTypes.filter(t => t !== type)
        : [...prev.paymentTypes, type]
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
                {/* Temel Bilgiler */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Temel Bilgiler</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Etkinlik Adı */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-200">
                        Etkinlik Adı
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 transition-colors"
                        placeholder="Etkinlik adını girin"
                      />
                    </div>

                    {/* Etkinlik Tipi */}
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-gray-200">
                        Etkinlik Tipi
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 text-white">
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
                      <Label className="text-gray-200">
                        Tarih
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full bg-zinc-800/50 border-zinc-700/50 text-white justify-start hover:bg-zinc-800 hover:text-white"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {formData.date || "Tarih seçin"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                          <DatePicker onDateSelect={handleDateSelect} />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Saat */}
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-gray-200">
                        Saat
                      </Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 transition-colors"
                      />
                    </div>

                    {/* Konum */}
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-200">
                        Konum
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 transition-colors"
                        placeholder="Etkinlik konumunu girin"
                      />
                    </div>

                    {/* Harita Linki */}
                    <div className="space-y-2">
                      <Label htmlFor="mapUrl" className="text-gray-200">
                        Harita Linki
                      </Label>
                      <Input
                        id="mapUrl"
                        name="mapUrl"
                        value={formData.mapUrl}
                        onChange={handleChange}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 transition-colors"
                        placeholder="Google Maps linkini yapıştırın"
                      />
                    </div>

                    {/* Maksimum Katılımcı */}
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants" className="text-gray-200">
                        Maksimum Katılımcı
                      </Label>
                      <Input
                        id="maxParticipants"
                        name="maxParticipants"
                        type="number"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 transition-colors"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Kayıt Ayarları */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Kayıt Ayarları</h2>
                  <div className="space-y-4">
                    {/* Kulübe Özel Switch */}
                    <div className="flex items-center justify-between bg-zinc-800/30 px-4 py-3 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-white">Kulübe Özel</Label>
                        <p className="text-sm text-zinc-400">Sadece kulüp üyeleri katılabilir</p>
                      </div>
                      <Switch
                        checked={formData.isClubOnly}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isClubOnly: checked }))}
                      />
                    </div>

                    {/* Ücretli Switch */}
                    <div className="flex items-center justify-between bg-zinc-800/30 px-4 py-3 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-white">Ücretli Etkinlik</Label>
                        <p className="text-sm text-zinc-400">Katılım için ödeme gerekli</p>
                      </div>
                      <Switch
                        checked={formData.isPaid}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPaid: checked }))}
                      />
                    </div>

                    {/* Ücret ve Ödeme Seçenekleri */}
                    {formData.isPaid && (
                      <div className="space-y-6 mt-6">
                        {/* Ücret */}
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
                            className="bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 transition-colors"
                            min="0"
                            step="1"
                          />
                        </div>

                        {/* Ödeme Seçenekleri */}
                        <div className="space-y-2">
                          <Label className="text-gray-200">
                            Ödeme Seçenekleri
                          </Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                            {paymentOptions.map((option) => (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => togglePaymentType(option.id)}
                                className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                                  formData.paymentTypes.includes(option.id)
                                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-500'
                                    : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800'
                                }`}
                              >
                                <option.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* IBAN */}
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
                  <Label htmlFor="description" className="text-gray-200">
                    Açıklama
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-zinc-800/50 border-zinc-700/50 text-white min-h-[120px] hover:bg-zinc-800 transition-colors"
                    placeholder="Etkinlik açıklamasını girin"
                  />
                </div>

                {/* Kaydet Butonu */}
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[90px] h-9 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
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