"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, Eye, EyeOff, Lock, Mail, User, CreditCard, Phone, 
  Calendar, Instagram, X, Upload, Save 
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddUserRequest, Gender, BloodType, MembershipType, OccupationType, InvoiceType } from "@/types/admin/add-user";
import DatePicker from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PhoneInput } from "@/components/ui/phone-input";

interface RegisterFormData extends Omit<AddUserRequest, 'profileImage'> {
  password: string;
  confirmPassword: string;
  profileImage?: string;
}

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

export default function Register() {
  const t = useTranslations('auth.register');
  const router = useRouter();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState<RegisterFormData>({
    // Hesap Bilgileri
    email: "",
    password: "",
    confirmPassword: "",

    // Kişisel Bilgiler
    fullName: "",
    identityNumber: "",
    phone: "",
    gender: Gender.MALE,
    birthDate: new Date(),
    birthPlace: "",
    bloodType: BloodType.A_POSITIVE,
    
    // Üyelik Bilgileri
    membershipType: MembershipType.INDIVIDUAL,
    occupation: {
      type: OccupationType.STUDENT,
    },
    swimmingDeclaration: {
      canSwim: false,
      canSwimWithClothes: false
    },
    
    // Acil Durum Bilgileri
    emergencyContact: {
      fullName: "",
      phone: "",
      relation: ""
    },

    // Fatura Bilgileri
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
    
    // İzinler ve Sosyal Medya
    photoConsent: false,
    communicationConsent: false,
    instagramHandle: ""
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(t('form.photo.errors.type'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t('form.photo.errors.size'));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Email ve şifre validasyonu
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        alert(t('errors.fillAllFields'));
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        alert(t('errors.passwordsDontMatch'));
        return;
      }

      // Email format kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert(t('errors.invalidEmail'));
        return;
      }

      setStep(2);
      return;
    }

    // Step 2 - Kayıt işlemi
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        router.push('/user/availability');
      } else {
        alert(data.message || t('errors.registrationFailed'));
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(t('errors.unexpectedError'));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-24 px-4 flex items-center justify-center">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>
      </div>

      <div className={`relative container ${step === 1 ? 'max-w-lg' : 'max-w-3xl'} mx-auto transition-all duration-300`}>
        {/* Top Bar */}
        <div className="absolute -top-16 w-full flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link 
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('backToHome')}</span>
            </Link>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {step === 1 ? (
            // Adım 1: Hesap Bilgileri
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6 ">
              <div className="text-center mb-8">
                <Image 
                  src="/images/logo.png" 
                  alt="Logo" 
                  width={150} 
                  height={60} 
                  className="mx-auto mb-4"
                />
                <h1 className="text-2xl font-semibold text-white">
                  {t('title')}
                </h1>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400">
                  {t('form.email.label')}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={t('form.email.placeholder')}
                    className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2 mt-4">
                <Label htmlFor="password" className="text-zinc-400">
                  {t('form.password.label')}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder={t('form.password.placeholder')}
                    className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2 mt-4">
                <Label htmlFor="confirmPassword" className="text-zinc-400">
                  {t('form.confirmPassword.label')}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder={t('form.confirmPassword.placeholder')}
                    className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  {t('buttons.continue')}
                </Button>
              </div>

              {/* Login Link */}
              <p className="text-center text-zinc-400 mt-4">
                {t('login.text')}{" "}
                <Link
                  href="/user/login"
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                >
                  {t('login.link')}
                </Link>
              </p>
            </Card>
          ) : (
            // Adım 2: Diğer tüm bilgiler (admin/controlpanel/users/add ile aynı)
            <>
              {/* 1. Kişisel Bilgiler */}
              <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">1. Kişisel Bilgiler</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profil Fotoğrafı */}
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
                        type="text"
                        maxLength={11}
                        placeholder="TC Kimlik numarası"
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        value={formData.identityNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                          setFormData(prev => ({ ...prev, identityNumber: value }));
                        }}
                      />
                    </div>
                  </div>

                  {/* Telefon */}
                  <div>
                    <Label className="text-white">Telefon</Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                      <PhoneInput
                        value={formData.phone}
                        onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Cinsiyet */}
                  <div>
                    <Label className="text-white">Cinsiyet</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value: Gender) => setFormData(prev => ({ ...prev, gender: value }))}
                    >
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                        <SelectValue placeholder="Cinsiyet seçin" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value={Gender.MALE} className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
                          Erkek
                        </SelectItem>
                        <SelectItem value={Gender.FEMALE} className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
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
                    <div className="relative mt-2">
                      <Input
                        value={formData.birthPlace}
                        onChange={(e) => setFormData(prev => ({ ...prev, birthPlace: e.target.value }))}
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        placeholder="Doğum yeri"
                      />
                    </div>
                  </div>

                  {/* Kan Grubu */}
                  <div>
                    <Label className="text-white">Kan Grubu</Label>
                    <Select
                      value={formData.bloodType}
                      onValueChange={(value: BloodType) => setFormData(prev => ({ ...prev, bloodType: value }))}
                    >
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                        <SelectValue placeholder="Kan grubu seçin" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {Object.values(BloodType).map((type) => (
                          <SelectItem 
                            key={type}
                            value={type}
                            className="text-zinc-100 focus:bg-zinc-700 focus:text-white"
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
                        <Switch
                          checked={formData.swimmingDeclaration.canSwim}
                          onCheckedChange={(checked) => setFormData(prev => ({
                            ...prev,
                            swimmingDeclaration: {
                              ...prev.swimmingDeclaration,
                              canSwim: checked
                            }
                          }))}
                        />
                        <span className="text-zinc-300 group-hover:text-white transition-colors">
                          Yüzme biliyorum
                        </span>
                      </label>
                      
                      <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                        <Switch
                          checked={formData.swimmingDeclaration.canSwimWithClothes}
                          onCheckedChange={(checked) => setFormData(prev => ({
                            ...prev,
                            swimmingDeclaration: {
                              ...prev.swimmingDeclaration,
                              canSwimWithClothes: checked
                            }
                          }))}
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
                        value={formData.emergencyContact.phone}
                        onChange={(value) => setFormData(prev => ({
                          ...prev,
                          emergencyContact: {
                            ...prev.emergencyContact,
                            phone: value
                          }
                        }))}
                        className="pl-10"
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
                        <SelectItem value={InvoiceType.INDIVIDUAL} className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
                          Bireysel
                        </SelectItem>
                        <SelectItem value={InvoiceType.CORPORATE} className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
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
                      value={formData.invoiceDetails.phone}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        invoiceDetails: {
                          ...prev.invoiceDetails,
                          phone: value
                        }
                      }))}
                      className="mt-2"
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
                          instagramHandle: e.target.value.startsWith('@') ? e.target.value : '@' + e.target.value 
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

              {/* Form Submit Buttons */}
              <div className="flex items-center justify-end gap-4">
                <Button
                  type="button"
                  className="bg-zinc-800 hover:bg-zinc-700"
                  onClick={() => setStep(1)}
                >
                  {t('buttons.back')}
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {t('buttons.complete')}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
} 