"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import DatePicker from "@/components/ui/datePicker";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Upload,
  Save,
  X,
  Instagram,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function AddUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [membershipType, setMembershipType] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [occupation, setOccupation] = useState<string>('');
  const [invoicePhone, setInvoicePhone] = useState('');
  const [invoiceType, setInvoiceType] = useState<string>('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <motion.div 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
        } relative z-0`}
      >
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-1 bg-gradient-to-b from-white via-white/50 to-transparent rounded-full" />
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-white">Yeni Üye Ekle</h1>
              <p className="text-xs md:text-sm text-zinc-400 mt-0.5">Yeni bir üye kaydı oluşturun</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* 1. Kişisel Bilgiler */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">1. Kişisel Bilgiler</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fotoğraf */}
                <div className="col-span-full">
                  <Label className="text-white">Fotoğraf</Label>
                  <div className="mt-4">
                    <div className="relative w-40 h-40 mx-auto">
                      {photoPreview ? (
                        <div className="relative w-full h-full group">
                          <Image
                            src={photoPreview}
                            alt="Photo Preview"
                            fill
                            className="rounded-2xl object-cover border-2 border-zinc-800"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => setPhotoPreview(null)}
                              className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="photo"
                          className="w-full h-full border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                          <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                          <span className="text-sm text-zinc-500">Fotoğraf Seç</span>
                          <input
                            type="file"
                            id="photo"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                

                {/* Ad Soyad */}
                <div className="col-span-full">
                  <Label className="text-white">Ad Soyad</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="Ad ve soyadı girin"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                {/* TC Kimlik */}
                <div>
                  <Label className="text-white">TC Kimlik No</Label>
                  <div className="relative mt-2">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="TC Kimlik numarası"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      maxLength={11}
                    />
                  </div>
                </div>

                {/* E-posta */}
                <div>
                  <Label className="text-white">E-posta</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      type="email"
                      placeholder="E-posta adresi"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <Label className="text-white">Telefon</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <PhoneInput
                      placeholder="Telefon numarası"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      value={phone}
                      onChange={(value) => setPhone(value)}
                    />
                  </div>
                </div>

                {/* Cinsiyet */}
                <div>
                  <Label className="text-white">Cinsiyet</Label>
                  <Select>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Cinsiyet seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value="male" 
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Erkek
                      </SelectItem>
                      <SelectItem 
                        value="female"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Kadın
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Doğum Tarihi */}
                <div>
                  <Label className="text-white">Doğum Tarihi</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10" size={20} />
                    <Input
                      readOnly
                      placeholder="Doğum tarihi seçin"
                      value={birthDate ? new Date(birthDate).toLocaleDateString('tr-TR') : ''}
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 cursor-pointer"
                      onClick={() => setShowDatePicker(true)}
                    />
                    {showDatePicker && (
                      <>
                        <div className="fixed inset-0" onClick={() => setShowDatePicker(false)} />
                        <div className="absolute z-50 mt-2">
                          <DatePicker
                            onDateSelect={(date) => {
                              setBirthDate(date);
                              setShowDatePicker(false);
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Doğum Yeri */}
                <div>
                  <Label className="text-white">Doğum Yeri</Label>
                  <Input
                    placeholder="Doğum yeri"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                  />
                </div>

                {/* Kan Grubu */}
                <div>
                  <Label className="text-white">Kan Grubu</Label>
                  <Select>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Kan grubu seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value="A+" 
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        A Rh+
                      </SelectItem>
                      <SelectItem 
                        value="A-"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        A Rh-
                      </SelectItem>
                      <SelectItem 
                        value="B+"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        B Rh+
                      </SelectItem>
                      <SelectItem 
                        value="B-"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        B Rh-
                      </SelectItem>
                      <SelectItem 
                        value="AB+"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        AB Rh+
                      </SelectItem>
                      <SelectItem 
                        value="AB-"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        AB Rh-
                      </SelectItem>
                      <SelectItem 
                        value="0+"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        0 Rh+
                      </SelectItem>
                      <SelectItem 
                        value="0-"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        0 Rh-
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Eğitim Durumu */}
                <div>
                  <Label className="text-white">Eğitim Durumu</Label>
                  <Select>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Eğitim durumu seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value="primary"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        İlkokul
                      </SelectItem>
                      <SelectItem 
                        value="secondary"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Ortaokul
                      </SelectItem>
                      <SelectItem 
                        value="highschool"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Lise
                      </SelectItem>
                      <SelectItem 
                        value="university"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Üniversite
                      </SelectItem>
                      <SelectItem 
                        value="master"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Yüksek Lisans
                      </SelectItem>
                      <SelectItem 
                        value="doctorate"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Doktora
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Üyelik Tipi */}
                <div>
                  <Label className="text-white">Üyelik Tipi</Label>
                  <Select value={membershipType} onValueChange={setMembershipType}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Üyelik tipi seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value="individual"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Bireysel Üye
                      </SelectItem>
                      <SelectItem 
                        value="highschool"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Lise Öğrencisi
                      </SelectItem>
                      <SelectItem 
                        value="university"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Üniversite Öğrencisi
                      </SelectItem>
                      <SelectItem 
                        value="corporate"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Kurumsal Üye
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Meslek */}
                <div>
                  <Label className="text-white">Meslek</Label>
                  <Select
                    value={occupation}
                    onValueChange={setOccupation}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Meslek seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value="student"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Öğrenci
                      </SelectItem>
                      <SelectItem 
                        value="teacher"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Öğretmen
                      </SelectItem>
                      <SelectItem 
                        value="engineer"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Mühendis
                      </SelectItem>
                      <SelectItem 
                        value="doctor"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Doktor
                      </SelectItem>
                      <SelectItem 
                        value="lawyer"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Avukat
                      </SelectItem>
                      <SelectItem 
                        value="accountant"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Muhasebeci
                      </SelectItem>
                      <SelectItem 
                        value="architect"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Mimar
                      </SelectItem>
                      <SelectItem 
                        value="other"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Diğer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Öğrenci Bilgileri */}
                {occupation === "student" && (
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white">Okuduğu Okul</Label>
                      <Input
                        placeholder="Okul adı"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Sınıf</Label>
                      <Input
                        placeholder="Sınıf bilgisi"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                )}

                {/* Çalışma Bilgileri */}
                {occupation && occupation !== "student" && (
                  <div className="col-span-full grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white">Çalıştığı Şirket</Label>
                      <Input
                        placeholder="Şirket adı"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Departman</Label>
                      <Input
                        placeholder="Departman bilgisi"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                )}

                {/* Yüzme Beyanı */}
                <div className="col-span-full">
                  <Label className="text-white">Yüzme Beyanı</Label>
                  <Select>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Yüzme durumunuzu seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value="none"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Hiç bilmiyorum
                      </SelectItem>
                      <SelectItem 
                        value="beginner"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Başlangıç seviyesi
                      </SelectItem>
                      <SelectItem 
                        value="intermediate"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Orta seviye
                      </SelectItem>
                      <SelectItem 
                        value="advanced"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        İleri seviye
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* 2. Acil Durum İletişim Bilgileri */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">2. Acil Durum İletişim Bilgileri</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white">Ad Soyad</Label>
                  <Input
                    placeholder="Acil durumda aranacak kişinin adı soyadı"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                  />
                </div>

                <div>
                  <Label className="text-white">Telefon</Label>
                  <PhoneInput
                    placeholder="Acil durumda aranacak telefon"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    value={emergencyPhone}
                    onChange={(value) => setEmergencyPhone(value)}
                  />
                </div>

                <div>
                  <Label className="text-white">Yakınlık Derecesi</Label>
                  <Input
                    placeholder="Örn: Anne, Baba, Eş, Kardeş"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                  />
                </div>
              </div>
            </Card>

            {/* 3. Fatura Bilgileri */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">3. Fatura Bilgileri</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white">Fatura Tipi</Label>
                  <Select
                    value={invoiceType}
                    onValueChange={setInvoiceType}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Fatura tipi seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value="individual"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Bireysel
                      </SelectItem>
                      <SelectItem 
                        value="corporate"
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Kurumsal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Ad Soyad</Label>
                  <Input
                    placeholder="Fatura için ad soyad"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                  />
                </div>

                <div>
                  <Label className="text-white">Telefon</Label>
                  <PhoneInput
                    placeholder="Fatura için telefon"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    value={invoicePhone}
                    onChange={(value) => setInvoicePhone(value)}
                  />
                </div>

                <div>
                  <Label className="text-white">İl</Label>
                  <Input
                    placeholder="İl"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                  />
                </div>

                <div>
                  <Label className="text-white">İlçe</Label>
                  <Input
                    placeholder="İlçe"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                  />
                </div>

                <div className="col-span-full">
                  <Label className="text-white">Adres</Label>
                  <Input
                    placeholder="Fatura adresi"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                  />
                </div>

                {/* Kurumsal Bilgiler */}
                {invoiceType === "corporate" && (
                  <>
                    <div>
                      <Label className="text-white">Firma Adı</Label>
                      <Input
                        placeholder="Firma adı"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Vergi Numarası</Label>
                      <Input
                        placeholder="Vergi numarası"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Vergi Dairesi</Label>
                      <Input
                        placeholder="Vergi dairesi"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* 4. İzinler ve Onaylar */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">4. İzinler ve Onaylar</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-4 block">Instagram Adresi</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="Instagram kullanıcı adı"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                    <Switch />
                    <div>
                      <p className="text-zinc-300 group-hover:text-white transition-colors">Fotoğraf Kullanım İzni</p>
                      <p className="text-sm text-zinc-500">Fotoğraflarımın kulüp tarafından kullanılmasına izin veriyorum</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                    <Switch />
                    <div>
                      <p className="text-zinc-300 group-hover:text-white transition-colors">İletişim İzni</p>
                      <p className="text-sm text-zinc-500">SMS ve e-posta ile bilgilendirme almak istiyorum</p>
                    </div>
                  </label>
                </div>
              </div>
            </Card>

            {/* Form Submit Buttons */}
            <div className="flex items-center justify-end gap-4 mt-8">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Üyeyi Kaydet
              </Button>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
} 