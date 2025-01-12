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
  User, Mail, Phone, Calendar, Upload, Save,
  X, Instagram, CreditCard
} from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  AddUserRequest, Gender, BloodType, MembershipType, 
  OccupationType, InvoiceType
} from "@/types/admin/add-user";

export default function AddUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState<AddUserRequest>({
    profileImage: undefined,
    fullName: "",
    identityNumber: "",
    email: "",
    phone: "",
    gender: Gender.MALE,
    birthDate: new Date(),
    birthPlace: "",
    bloodType: BloodType.A_POSITIVE,
    membershipType: MembershipType.INDIVIDUAL,
    occupation: {
      type: OccupationType.STUDENT,
    },
    swimmingDeclaration: {
      canSwim: false,
      canSwimWithClothes: false
    },
    emergencyContact: {
      fullName: "",
      phone: "",
      relation: ""
    },
    invoiceDetails: {
      type: InvoiceType.INDIVIDUAL,
      fullName: "",
      phone: "",
      address: {
        province: "",
        district: "",
        fullAddress: ""
      }
    },
    photoConsent: false,
    communicationConsent: false,
    instagramHandle: ""
  });

  const occupationOptions = [
    { value: OccupationType.STUDENT, label: 'Öğrenci' },
    { value: OccupationType.TEACHER, label: 'Öğretmen' },
    { value: OccupationType.ENGINEER, label: 'Mühendis' },
    { value: OccupationType.DOCTOR, label: 'Doktor' },
    { value: OccupationType.LAWYER, label: 'Avukat' },
    { value: OccupationType.ACCOUNTANT, label: 'Muhasebeci' },
    { value: OccupationType.ARCHITECT, label: 'Mimar' },
    { value: OccupationType.OTHER, label: 'Diğer' }
  ];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        alert('Lütfen geçerli bir resim dosyası seçin');
        return;
      }

      // Boyut kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan küçük olmalıdır');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validasyonu
    if (!formData.fullName || !formData.identityNumber || !formData.email || !formData.phone) {
      alert('Lütfen zorunlu alanları doldurun');
      return;
    }

    // TC Kimlik validasyonu
    if (formData.identityNumber.length !== 11) {
      alert('TC Kimlik numarası 11 haneli olmalıdır');
      return;
    }

    // Kurumsal fatura için validasyon
    if (formData.invoiceDetails.type === InvoiceType.CORPORATE) {
      if (!formData.invoiceDetails.corporateDetails?.taxNumber || 
          !formData.invoiceDetails.corporateDetails?.taxOffice) {
        alert('Kurumsal fatura için vergi bilgilerini doldurun');
        return;
      }
    }

    try {
      const response = await fetch('/api/admin/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Üye başarıyla eklendi');
        // Başarılı işlem sonrası yönlendirme yapılabilir
      } else {
        alert(`Hata: ${data.message}`);
      }
    } catch (error) {
      console.error('İşlem hatası:', error);
      alert('Bir hata oluştu');
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
                      {formData.profileImage ? (
                        <div className="relative w-full h-full group">
                          <Image
                            src={formData.profileImage}
                            alt="Photo Preview"
                            fill
                            className="rounded-2xl object-cover border-2 border-zinc-800"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => setFormData(prev => ({ ...prev, profileImage: undefined }))}
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
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    />
                  </div>
                </div>

                {/* TC Kimlik */}
                <div>
                  <Label className="text-white">TC Kimlik No</Label>
                  <div className="relative mt-2">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      type="number"
                      placeholder="TC Kimlik numarası"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      maxLength={11}
                      value={formData.identityNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, identityNumber: e.target.value }))}
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
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                      value={formData.phone}
                      onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                    />
                  </div>
                </div>

                {/* Cinsiyet */}
                <div>
                  <Label className="text-white">Cinsiyet</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value: Gender) => 
                      setFormData(prev => ({ ...prev, gender: value }))
                    }
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Cinsiyet seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value={Gender.MALE}
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Erkek
                      </SelectItem>
                      <SelectItem 
                        value={Gender.FEMALE}
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
                      value={formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('tr-TR') : ''}
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 cursor-pointer"
                      onClick={() => setShowDatePicker(true)}
                    />
                    {showDatePicker && (
                      <>
                        <div className="fixed inset-0" onClick={() => setShowDatePicker(false)} />
                        <div className="absolute z-50 mt-2">
                          <DatePicker
                            onDateSelect={(date) => {
                              setFormData(prev => ({ ...prev, birthDate: date }));
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
                    value={formData.birthPlace}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthPlace: e.target.value }))}
                  />
                </div>

                {/* Kan Grubu */}
                <div>
                  <Label className="text-white">Kan Grubu</Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value: BloodType) => 
                      setFormData(prev => ({ ...prev, bloodType: value }))
                    }
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Kan grubu seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {Object.values(BloodType).map((type) => (
                        <SelectItem 
                          key={type}
                          value={type}
                          className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Üyelik Tipi */}
                <div>
                  <Label className="text-white">Üyelik Tipi</Label>
                  <Select
                    value={formData.membershipType}
                    onValueChange={(value: MembershipType) => setFormData(prev => ({ 
                      ...prev, 
                      membershipType: value 
                    }))}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Üyelik tipi seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value={MembershipType.INDIVIDUAL}
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Bireysel Üye
                      </SelectItem>
                      <SelectItem 
                        value={MembershipType.HIGH_SCHOOL_STUDENT}
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Lise Öğrencisi
                      </SelectItem>
                      <SelectItem 
                        value={MembershipType.UNIVERSITY_STUDENT}
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Üniversite Öğrencisi
                      </SelectItem>
                      <SelectItem 
                        value={MembershipType.CORPORATE}
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
                    value={formData.occupation.type}
                    onValueChange={(value: OccupationType) => setFormData(prev => ({ 
                      ...prev, 
                      occupation: { 
                        ...prev.occupation, 
                        type: value 
                      } 
                    }))}
                  >
                    <SelectTrigger className="mt-2 bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Meslek seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {occupationOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Diğer Meslek Input */}
                {formData.occupation.type === OccupationType.OTHER && (
                  <div>
                    <Label className="text-white">Mesleğinizi Belirtin</Label>
                    <Input
                      value={formData.occupation.otherOccupation || ''}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        occupation: { 
                          ...prev.occupation, 
                          otherOccupation: e.target.value 
                        } 
                      }))}
                      className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                      placeholder="Mesleğinizi yazın"
                    />
                  </div>
                )}

                {/* Öğrenci Bilgileri */}
                {formData.occupation.type === OccupationType.STUDENT && (
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white">Okuduğu Okul</Label>
                      <Input
                        placeholder="Okul adı"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        value={formData.occupation.schoolName || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          occupation: { 
                            ...prev.occupation, 
                            schoolName: e.target.value 
                          } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label className="text-white">Sınıf</Label>
                      <Input
                        placeholder="Sınıf bilgisi"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        value={formData.occupation.grade || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          occupation: { 
                            ...prev.occupation, 
                            grade: e.target.value 
                          } 
                        }))}
                      />
                    </div>
                  </div>
                )}

                {/* Çalışma Bilgileri */}
                {formData.occupation.type && formData.occupation.type !== OccupationType.STUDENT && (
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white">Çalıştığı Şirket</Label>
                      <Input
                        placeholder="Şirket adı"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        value={formData.occupation.companyName || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          occupation: { 
                            ...prev.occupation, 
                            companyName: e.target.value 
                          } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label className="text-white">Departman</Label>
                      <Input
                        placeholder="Departman bilgisi"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        value={formData.occupation.department || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          occupation: { 
                            ...prev.occupation, 
                            department: e.target.value 
                          } 
                        }))}
                      />
                    </div>
                  </div>
                )}

                {/* Yüzme Beyanı */}
                <div className="col-span-full">
                  <Label className="text-white mb-3 block">Yüzme Beyanı</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        checked={formData.swimmingDeclaration.canSwim}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          swimmingDeclaration: {
                            ...prev.swimmingDeclaration,
                            canSwim: e.target.checked
                          }
                        }))}
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">
                        Yüzme biliyorum
                      </span>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        checked={formData.swimmingDeclaration.canSwimWithClothes}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          swimmingDeclaration: {
                            ...prev.swimmingDeclaration,
                            canSwimWithClothes: e.target.checked
                          }
                        }))}
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">
                        Kıyafetlerle yüzebilirim
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            {/* 2. Acil Durum İletişim Bilgileri */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">2. Acil Durum İletişim Bilgileri</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white">Ad Soyad</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="Acil durumda aranacak kişinin adı soyadı"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      value={formData.emergencyContact.fullName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        emergencyContact: {
                          ...prev.emergencyContact,
                          fullName: e.target.value
                        }
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white">Telefon</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <PhoneInput
                      placeholder="Acil durumda aranacak telefon"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      value={formData.emergencyContact.phone}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        emergencyContact: {
                          ...prev.emergencyContact,
                          phone: value
                        }
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white">Yakınlık Derecesi</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="Örn: Anne, Baba, Eş, Kardeş"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      value={formData.emergencyContact.relation}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        emergencyContact: {
                          ...prev.emergencyContact,
                          relation: e.target.value
                        }
                      }))}
                    />
                  </div>
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
                    value={formData.invoiceDetails.type}
                    onValueChange={(value: InvoiceType) => setFormData(prev => ({
                      ...prev,
                      invoiceDetails: {
                        ...prev.invoiceDetails,
                        type: value,
                        corporateDetails: value === InvoiceType.CORPORATE 
                          ? { companyName: '', taxNumber: '', taxOffice: '' }
                          : undefined
                      }
                    }))}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Fatura tipi seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value={InvoiceType.INDIVIDUAL}
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Bireysel
                      </SelectItem>
                      <SelectItem 
                        value={InvoiceType.CORPORATE}
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Kurumsal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Ad Soyad / Firma Adı</Label>
                  <Input
                    placeholder="Fatura için ad soyad veya firma adı"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    value={formData.invoiceDetails.fullName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      invoiceDetails: {
                        ...prev.invoiceDetails,
                        fullName: e.target.value
                      }
                    }))}
                  />
                </div>

                {formData.invoiceDetails.type === InvoiceType.CORPORATE && (
                  <>
                    <div>
                      <Label className="text-white">Vergi Numarası</Label>
                      <Input
                        placeholder="Vergi numarası"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        value={formData.invoiceDetails.corporateDetails?.taxNumber}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          invoiceDetails: {
                            ...prev.invoiceDetails,
                            corporateDetails: {
                              ...prev.invoiceDetails.corporateDetails!,
                              taxNumber: e.target.value
                            }
                          }
                        }))}
                      />
                    </div>

                    <div>
                      <Label className="text-white">Vergi Dairesi</Label>
                      <Input
                        placeholder="Vergi dairesi"
                        className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        value={formData.invoiceDetails.corporateDetails?.taxOffice}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          invoiceDetails: {
                            ...prev.invoiceDetails,
                            corporateDetails: {
                              ...prev.invoiceDetails.corporateDetails!,
                              taxOffice: e.target.value
                            }
                          }
                        }))}
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label className="text-white">Telefon</Label>
                  <PhoneInput
                    placeholder="Fatura için telefon"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    value={formData.invoiceDetails.phone}
                    onChange={(value) => setFormData(prev => ({
                      ...prev,
                      invoiceDetails: {
                        ...prev.invoiceDetails,
                        phone: value
                      }
                    }))}
                  />
                </div>

                <div>
                  <Label className="text-white">İl</Label>
                  <Input
                    placeholder="İl"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    value={formData.invoiceDetails.address.province}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      invoiceDetails: {
                        ...prev.invoiceDetails,
                        address: {
                          ...prev.invoiceDetails.address,
                          province: e.target.value
                        }
                      }
                    }))}
                  />
                </div>

                <div>
                  <Label className="text-white">İlçe</Label>
                  <Input
                    placeholder="İlçe"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    value={formData.invoiceDetails.address.district}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      invoiceDetails: {
                        ...prev.invoiceDetails,
                        address: {
                          ...prev.invoiceDetails.address,
                          district: e.target.value
                        }
                      }
                    }))}
                  />
                </div>

                <div className="col-span-full">
                  <Label className="text-white">Adres</Label>
                  <Input
                    placeholder="Fatura adresi"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    value={formData.invoiceDetails.address.fullAddress}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      invoiceDetails: {
                        ...prev.invoiceDetails,
                        address: {
                          ...prev.invoiceDetails.address,
                          fullAddress: e.target.value
                        }
                      }
                    }))}
                  />
                </div>
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
                      value={formData.instagramHandle}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        instagramHandle: e.target.value 
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                    <Switch
                      checked={formData.photoConsent}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        photoConsent: checked
                      }))}
                    />
                    <div>
                      <p className="text-zinc-300 group-hover:text-white transition-colors">
                        Fotoğraf Kullanım İzni
                      </p>
                      <p className="text-sm text-zinc-500">
                        Fotoğraflarımın kulüp tarafından kullanılmasına izin veriyorum
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                    <Switch
                      checked={formData.communicationConsent}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        communicationConsent: checked
                      }))}
                    />
                    <div>
                      <p className="text-zinc-300 group-hover:text-white transition-colors">
                        İletişim İzni
                      </p>
                      <p className="text-sm text-zinc-500">
                        SMS ve e-posta ile bilgilendirme almak istiyorum
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </Card>

            {/* Form Submit Button */}
            <div className="flex items-center justify-end gap-4 mt-8">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleSubmit}
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