"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail,
  Lock,
  X,
  Eye,
  EyeOff,
  CreditCard,
  Edit,
  Instagram
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import DatePicker from "@/components/ui/datePicker";
import Image from "next/image";
import { UserSidebar } from "@/components/layout/user-sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface BillingInfo {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  addressTitle: string;
  type: "individual" | "corporate";
  // Kurumsal fatura bilgileri
  taxNumber?: string;
  taxOffice?: string;
  companyName?: string;
}

interface UserProfile {
  fullName: string;
  tcNo: string;
  email: string;
  phone: string;
  birthDate: Date;
  birthPlace: string;
  bloodType: string;
  canSwim: boolean;
  occupation: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  billingInfo: BillingInfo;
  registrationType: "individual" | "student" | "corporate";
  photoUrl: string;
  sharePhotos: boolean;
  instagramHandle?: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "Ahmet Yılmaz",
    tcNo: "12345678901",
    email: "ahmet@example.com",
    phone: "+90 555 123 4567",
    birthDate: new Date(1990, 0, 1),
    birthPlace: "İstanbul",
    bloodType: "A+",
    canSwim: true,
    occupation: "Mühendis",
    emergencyContact: {
      name: "Mehmet Yılmaz",
      phone: "+90 555 987 6543",
      relation: "Kardeş"
    },
    billingInfo: {
      fullName: "Ahmet Yılmaz",
      phone: "+90 555 123 4567",
      city: "İstanbul",
      district: "Kadıköy",
      address: "Örnek Mah. Test Sok. No:1 D:2",
      addressTitle: "Ev Adresi",
      type: "individual",
    },
    registrationType: "individual",
    photoUrl: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    sharePhotos: false,
    instagramHandle: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const bloodTypes = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "0+", label: "0+" },
    { value: "0-", label: "0-" }
  ];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Lütfen bir resim dosyası seçin');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan küçük olmalıdır');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, photoUrl: imageUrl });
    }
  };

  const handleSave = () => {
    console.log('Profil güncellendi:', profile);
  };

  const handlePasswordChange = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = () => {
    console.log('Şifre güncellendi:', passwordForm);
    setIsPasswordModalOpen(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  // Input ve Textarea için ortak className
  const inputClassName = "bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-blue-500/50 focus:ring-blue-500/20 placeholder:text-zinc-500";

  return (
    <div className="flex h-screen bg-[#09090B]">
      <UserSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="container mx-auto p-8">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Profil Bilgileri</h1>
                <p className="text-sm text-zinc-400 mt-1">Kişisel bilgilerinizi düzenleyin</p>
              </div>
              <Button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Değişiklikleri Kaydet
              </Button>
            </div>
          </motion.div>

          {/* Content */}
          <div className="grid grid-cols-12 gap-6 max-w-[1400px] mx-auto">
            {/* Sol Kolon */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Profil Kartı */}
              <Card className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                <div className="p-6 -mt-16">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden relative">
                      <Image 
                        src={profile.photoUrl} 
                        alt="Profil fotoğrafı"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </div>
                    <div className="relative">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4 text-xs"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Fotoğraf Değiştir
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-white mt-4">{profile.fullName}</h2>
                    <div className="flex items-center gap-2 text-zinc-400 mt-1">
                      <Mail size={14} />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Şifre Değiştirme Kartı */}
              <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-500/10">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Şifre Değiştirme</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Hesap güvenliğiniz için şifrenizi düzenli olarak değiştirin</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handlePasswordChange}
                  className="w-full bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700 text-sm text-zinc-100 hover:text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Şifre Değiştir
                </Button>
              </Card>

              {/* Fatura Bilgileri Kartı */}
              <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-500/10">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Fatura Bilgileri</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {profile.billingInfo.type === 'individual' ? 'Bireysel' : 'Kurumsal'} fatura bilgileriniz
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-zinc-400">
                  <p>{profile.billingInfo.fullName}</p>
                  <p>{profile.billingInfo.phone}</p>
                  <p>{profile.billingInfo.city} / {profile.billingInfo.district}</p>
                  <p className="text-xs">{profile.billingInfo.address}</p>
                  {profile.billingInfo.type === 'corporate' && (
                    <>
                      <div className="border-t border-zinc-800 my-2" />
                      <p>Firma: {profile.billingInfo.companyName}</p>
                      <p>VKN: {profile.billingInfo.taxNumber}</p>
                      <p>Vergi Dairesi: {profile.billingInfo.taxOffice}</p>
                    </>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => setIsBillingModalOpen(true)}
                  className="w-full mt-4 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700 text-sm text-zinc-100 hover:text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Fatura Bilgilerini Güncelle
                </Button>
              </Card>
            </div>

            {/* Sağ Kolon */}
            <div className="col-span-12 lg:col-span-8">
              <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
                <div className="space-y-6">
                  {/* Temel Bilgiler */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Temel Bilgiler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Ad Soyad</label>
                        <Input
                          value={profile.fullName}
                          onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">TC Kimlik No</label>
                        <Input
                          value={profile.tcNo}
                          onChange={(e) => setProfile({...profile, tcNo: e.target.value})}
                          className={inputClassName}
                          maxLength={11}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">E-posta</label>
                        <Input
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className={inputClassName}
                          type="email"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Telefon</label>
                        <Input
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className={inputClassName}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kişisel Bilgiler */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Kişisel Bilgiler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Doğum Tarihi</label>
                        <div className="relative">
                          <Input
                            value={format(profile.birthDate, "d MMMM yyyy", { locale: tr })}
                            readOnly
                            className={`${inputClassName} cursor-pointer`}
                            onClick={() => setShowDatePicker(!showDatePicker)}
                          />
                          {showDatePicker && (
                            <>
                              <div className="fixed inset-0" onClick={() => setShowDatePicker(false)} />
                              <div className="absolute z-[60] left-1/2 -translate-x-1/2 translate-y-2">
                                <DatePicker
                                  onDateSelect={(date) => {
                                    setProfile({...profile, birthDate: date});
                                    setShowDatePicker(false);
                                  }}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Doğum Yeri</label>
                        <Input
                          value={profile.birthPlace}
                          onChange={(e) => setProfile({...profile, birthPlace: e.target.value})}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Kan Grubu</label>
                        <select
                          value={profile.bloodType}
                          onChange={(e) => setProfile({...profile, bloodType: e.target.value})}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-2 px-3 text-zinc-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
                        >
                          <option value="">Seçiniz</option>
                          {bloodTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Meslek</label>
                        <Input
                          value={profile.occupation}
                          onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Yüzme Biliyor mu?</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={profile.canSwim}
                              onChange={() => setProfile({...profile, canSwim: true})}
                              className="text-blue-500"
                            />
                            <span className="text-zinc-400">Evet</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={!profile.canSwim}
                              onChange={() => setProfile({...profile, canSwim: false})}
                              className="text-blue-500"
                            />
                            <span className="text-zinc-400">Hayır</span>
                          </label>
                        </div>
                      </div>
                      <div className="md:col-span-2 flex flex-col md:flex-row items-start justify-between md:items-center gap-6 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                        {/* Fotoğraf Paylaşım İzni */}
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.sharePhotos}
                            onChange={(e) => setProfile({...profile, sharePhotos: e.target.checked})}
                              className="sr-only peer"
                          />
                            <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                          <span className="text-sm text-zinc-400">Fotoğraflarınızı paylaşmamızı istiyor musunuz?</span>
                      </div>

                        {/* Instagram Adresi - her zaman göster */}
                          <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Instagram className="h-4 w-4 text-zinc-500" />
                              </div>
                          <Input
                            value={profile.instagramHandle}
                            onChange={(e) => setProfile({...profile, instagramHandle: e.target.value})}
                              className={`${inputClassName} pl-9 ${!profile.sharePhotos ? 'opacity-50' : ''}`}
                            placeholder="@kullaniciadi"
                              disabled={!profile.sharePhotos}
                          />
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acil Durum İletişim */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Acil Durum İletişim Bilgileri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Ad Soyad</label>
                        <Input
                          value={profile.emergencyContact.name}
                          onChange={(e) => setProfile({
                            ...profile, 
                            emergencyContact: {...profile.emergencyContact, name: e.target.value}
                          })}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Telefon</label>
                        <Input
                          value={profile.emergencyContact.phone}
                          onChange={(e) => setProfile({
                            ...profile, 
                            emergencyContact: {...profile.emergencyContact, phone: e.target.value}
                          })}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">Yakınlık</label>
                        <Input
                          value={profile.emergencyContact.relation}
                          onChange={(e) => setProfile({
                            ...profile, 
                            emergencyContact: {...profile.emergencyContact, relation: e.target.value}
                          })}
                          className={inputClassName}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kayıt Şekli */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Kayıt Şekli</h3>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={profile.registrationType === "individual"}
                          onChange={() => setProfile({...profile, registrationType: "individual"})}
                          className="text-blue-500"
                        />
                        <span className="text-zinc-400">Bireysel</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={profile.registrationType === "student"}
                          onChange={() => setProfile({...profile, registrationType: "student"})}
                          className="text-blue-500"
                        />
                        <span className="text-zinc-400">Öğrenci</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={profile.registrationType === "corporate"}
                          onChange={() => setProfile({...profile, registrationType: "corporate"})}
                          className="text-blue-500"
                        />
                        <span className="text-zinc-400">Kurumsal</span>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Şifre Değiştirme Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">Şifre Değiştir</DialogTitle>
            <Button
              variant="ghost"
              className="absolute right-4 top-4 p-0 w-6 h-6 text-zinc-400 hover:text-white"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Mevcut Şifre */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">
                Mevcut Şifre
              </label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value
                  })}
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Yeni Şifre */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">
                Yeni Şifre
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value
                  })}
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Yeni Şifre Tekrar */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">
                Yeni Şifre Tekrar
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value
                  })}
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPasswordModalOpen(false)}
              className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700"
            >
              İptal
            </Button>
            <Button
              onClick={handlePasswordSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fatura Bilgileri Modal */}
      <Dialog open={isBillingModalOpen} onOpenChange={setIsBillingModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-zinc-900 border-zinc-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              Fatura Bilgilerini Güncelle
            </DialogTitle>
            <Button
              variant="ghost"
              className="absolute right-4 top-4 p-0 w-6 h-6 text-zinc-400 hover:text-white"
              onClick={() => setIsBillingModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Fatura Tipi */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">Fatura Tipi</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={profile.billingInfo.type === "individual"}
                    onChange={() => setProfile({
                      ...profile,
                      billingInfo: { ...profile.billingInfo, type: "individual" }
                    })}
                    className="text-blue-500"
                  />
                  <span className="text-zinc-400">Bireysel</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={profile.billingInfo.type === "corporate"}
                    onChange={() => setProfile({
                      ...profile,
                      billingInfo: { ...profile.billingInfo, type: "corporate" }
                    })}
                    className="text-blue-500"
                  />
                  <span className="text-zinc-400">Kurumsal</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">Ad Soyad</label>
                <Input
                  value={profile.billingInfo.fullName}
                  onChange={(e) => setProfile({
                    ...profile,
                    billingInfo: { ...profile.billingInfo, fullName: e.target.value }
                  })}
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">Telefon</label>
                <Input
                  value={profile.billingInfo.phone}
                  onChange={(e) => setProfile({
                    ...profile,
                    billingInfo: { ...profile.billingInfo, phone: e.target.value }
                  })}
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">İl</label>
                <Input
                  value={profile.billingInfo.city}
                  onChange={(e) => setProfile({
                    ...profile,
                    billingInfo: { ...profile.billingInfo, city: e.target.value }
                  })}
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">İlçe</label>
                <Input
                  value={profile.billingInfo.district}
                  onChange={(e) => setProfile({
                    ...profile,
                    billingInfo: { ...profile.billingInfo, district: e.target.value }
                  })}
                  className={inputClassName}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-zinc-400 block mb-2">Adres</label>
                <Textarea
                  value={profile.billingInfo.address}
                  onChange={(e) => setProfile({
                    ...profile,
                    billingInfo: { ...profile.billingInfo, address: e.target.value }
                  })}
                  className={inputClassName}
                  rows={3}
                />
              </div>

              {/* Kurumsal fatura bilgileri */}
              {profile.billingInfo.type === 'corporate' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">Firma Adı</label>
                    <Input
                      value={profile.billingInfo.companyName}
                      onChange={(e) => setProfile({
                        ...profile,
                        billingInfo: { ...profile.billingInfo, companyName: e.target.value }
                      })}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">Vergi Numarası</label>
                    <Input
                      value={profile.billingInfo.taxNumber}
                      onChange={(e) => setProfile({
                        ...profile,
                        billingInfo: { ...profile.billingInfo, taxNumber: e.target.value }
                      })}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">Vergi Dairesi</label>
                    <Input
                      value={profile.billingInfo.taxOffice}
                      onChange={(e) => setProfile({
                        ...profile,
                        billingInfo: { ...profile.billingInfo, taxOffice: e.target.value }
                      })}
                      className={inputClassName}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBillingModalOpen(false)}
              className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700"
            >
              İptal
            </Button>
            <Button
              onClick={() => {
                console.log('Fatura bilgileri güncellendi');
                setIsBillingModalOpen(false);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 