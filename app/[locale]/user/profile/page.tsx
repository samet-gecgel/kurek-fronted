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
import { useTranslations } from 'next-intl';
import { Gender, BloodType, OccupationType } from "@/types/admin/add-user";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";

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
  bloodType: BloodType;
  gender: Gender;
  occupation: {
    type: OccupationType;
    otherOccupation?: string;
    schoolName?: string;
    grade?: string;
    companyName?: string;
    department?: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  billingInfo: BillingInfo;
  registrationType: "individual" | "student" | "corporate";
  photoUrl: string;
  swimmingDeclaration: {
    canSwim: boolean;
    canSwimWithClothes: boolean;
  };
  photoConsent: boolean;
  communicationConsent: boolean;
  instagramHandle: string;
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
    phone: "555 123 4567",
    birthDate: new Date(1990, 0, 1),
    birthPlace: "İstanbul",
    bloodType: BloodType.A_POSITIVE,
    gender: Gender.MALE,
    occupation: {
      type: OccupationType.STUDENT,
      schoolName: "",
      grade: ""
    },
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
    swimmingDeclaration: {
      canSwim: true,
      canSwimWithClothes: false,
    },
    photoConsent: false,
    communicationConsent: false,
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

  const t = useTranslations('profile');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert(t('photo.typeError'));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(t('photo.sizeError'));
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

  const occupationOptions = [
    { value: OccupationType.STUDENT, label: t('occupation.student') },
    { value: OccupationType.TEACHER, label: t('occupation.teacher') },
    { value: OccupationType.ENGINEER, label: t('occupation.engineer') },
    { value: OccupationType.DOCTOR, label: t('occupation.doctor') },
    { value: OccupationType.LAWYER, label: t('occupation.lawyer') },
    { value: OccupationType.ACCOUNTANT, label: t('occupation.accountant') },
    { value: OccupationType.ARCHITECT, label: t('occupation.architect') },
    { value: OccupationType.OTHER, label: t('occupation.other') }
  ];

  return (
    <div className="flex md:flex-row flex-col h-screen bg-[#09090B]">
      <UserSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
      } relative z-0`}>
        <div className="container mx-auto p-4 md:p-8 mt-14 md:mt-0 relative">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">{t('title')}</h1>
                <p className="text-sm text-zinc-400 mt-1">{t('description')}</p>
              </div>
              <Button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {t('saveButton')}
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
                        {t('photo.change')}
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
                    <h3 className="text-sm font-medium text-white">{t('password.title')}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{t('password.description')}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handlePasswordChange}
                  className="w-full bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700 text-sm text-zinc-100 hover:text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {t('password.change')}
                </Button>
              </Card>

              {/* Fatura Bilgileri Kartı */}
              <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-blue-500/10">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{t('billing.title')}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {t(`billing.type.${profile.billingInfo.type}`)}
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
                      <p>{t('billing.companyName')}: {profile.billingInfo.companyName}</p>
                      <p>{t('billing.taxNumber')}: {profile.billingInfo.taxNumber}</p>
                      <p>{t('billing.taxOffice')}: {profile.billingInfo.taxOffice}</p>
                    </>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => setIsBillingModalOpen(true)}
                  className="w-full mt-4 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700 text-sm text-zinc-100 hover:text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {t('billing.edit')}
                </Button>
              </Card>
            </div>

            {/* Sağ Kolon */}
            <div className="col-span-12 lg:col-span-8">
              <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
                <div className="space-y-6">
                  {/* Temel Bilgiler */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">{t('basicInfo.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('basicInfo.fullName')}
                        </label>
                        <Input
                          value={profile.fullName}
                          onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('basicInfo.tcNo')}
                        </label>
                        <Input
                          value={profile.tcNo}
                          onChange={(e) => setProfile({...profile, tcNo: e.target.value})}
                          className={inputClassName}
                          maxLength={11}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('basicInfo.email')}
                        </label>
                        <Input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('basicInfo.phone')}
                        </label>
                        <PhoneInput
                          value={profile.phone}
                          onChange={(value) => setProfile({...profile, phone: value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kişisel Bilgiler */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">{t('personalInfo.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('personalInfo.birthDate')}
                        </label>
                        <div className="relative">
                          <Input
                            value={format(profile.birthDate, "dd.MM.yyyy", { locale: tr })}
                            readOnly
                            className={`${inputClassName} cursor-pointer`}
                            onClick={() => setShowDatePicker(!showDatePicker)}
                          />
                          {showDatePicker && (
                            <>
                              <div 
                                className="fixed inset-0" 
                                onClick={() => setShowDatePicker(false)} 
                              />
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
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('personalInfo.birthPlace')}
                        </label>
                        <Input
                          value={profile.birthPlace}
                          onChange={(e) => setProfile({...profile, birthPlace: e.target.value})}
                          className={inputClassName}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('personalInfo.gender')}
                        </label>
                        <Select
                          value={profile.gender}
                          onValueChange={(value: Gender) => setProfile(prev => ({ ...prev, gender: value }))}
                        >
                          <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                            <SelectValue placeholder={t('personalInfo.gender')} />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value={Gender.MALE} className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
                              {t('personalInfo.genderOptions.male')}
                            </SelectItem>
                            <SelectItem value={Gender.FEMALE} className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
                              {t('personalInfo.genderOptions.female')}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('personalInfo.bloodType.label')}
                        </label>
                        <Select
                          value={profile.bloodType}
                          onValueChange={(value: BloodType) => setProfile(prev => ({ ...prev, bloodType: value }))}
                        >
                          <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                            <SelectValue placeholder={t('personalInfo.bloodType.select')} />
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

                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('personalInfo.occupation')}
                        </label>
                        <Select
                          value={profile.occupation.type}
                          onValueChange={(value: OccupationType) => setProfile(prev => ({
                            ...prev,
                            occupation: { type: value }
                          }))}
                        >
                          <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                            <SelectValue placeholder={t('personalInfo.occupation')} />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            {occupationOptions.map((option) => (
                              <SelectItem 
                                key={option.value} 
                                value={option.value}
                                className="text-zinc-100 focus:bg-zinc-700 focus:text-white"
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Öğrenci Bilgileri */}
                      {profile.occupation.type === OccupationType.STUDENT && (
                        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-medium text-zinc-400 block mb-2">
                              {t('personalInfo.school')}
                            </label>
                            <Input
                              value={profile.occupation.schoolName || ''}
                              onChange={(e) => setProfile(prev => ({
                                ...prev,
                                occupation: {
                                  ...prev.occupation,
                                  schoolName: e.target.value
                                }
                              }))}
                              className={inputClassName}
                              placeholder={t('personalInfo.schoolPlaceholder')}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-zinc-400 block mb-2">
                              {t('personalInfo.grade')}
                            </label>
                            <Input
                              value={profile.occupation.grade || ''}
                              onChange={(e) => setProfile(prev => ({
                                ...prev,
                                occupation: {
                                  ...prev.occupation,
                                  grade: e.target.value
                                }
                              }))}
                              className={inputClassName}
                              placeholder={t('personalInfo.gradePlaceholder')}
                            />
                          </div>
                        </div>
                      )}

                      {/* Çalışma Bilgileri */}
                      {profile.occupation.type !== OccupationType.STUDENT && (
                        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-medium text-zinc-400 block mb-2">
                              {t('personalInfo.company')}
                            </label>
                            <Input
                              value={profile.occupation.companyName || ''}
                              onChange={(e) => setProfile(prev => ({
                                ...prev,
                                occupation: {
                                  ...prev.occupation,
                                  companyName: e.target.value
                                }
                              }))}
                              className={inputClassName}
                              placeholder={t('personalInfo.companyPlaceholder')}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-zinc-400 block mb-2">
                              {t('personalInfo.department')}
                            </label>
                            <Input
                              value={profile.occupation.department || ''}
                              onChange={(e) => setProfile(prev => ({
                                ...prev,
                                occupation: {
                                  ...prev.occupation,
                                  department: e.target.value
                                }
                              }))}
                              className={inputClassName}
                              placeholder={t('personalInfo.departmentPlaceholder')}
                            />
                          </div>
                        </div>
                      )}

                      {/* Yüzme Beyanı */}
                      <div className="col-span-full">
                        <label className="text-sm font-medium text-zinc-400 block mb-3">
                          {t('personalInfo.swimming.title')}
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                            <Switch
                              checked={profile.swimmingDeclaration.canSwim}
                              onCheckedChange={(checked) => setProfile(prev => ({
                                ...prev,
                                swimmingDeclaration: {
                                  ...prev.swimmingDeclaration,
                                  canSwim: checked
                                }
                              }))}
                            />
                            <span className="text-zinc-300 group-hover:text-white transition-colors">
                              {t('personalInfo.swimming.canSwim')}
                            </span>
                          </label>
                          
                          <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                            <Switch
                              checked={profile.swimmingDeclaration.canSwimWithClothes}
                              onCheckedChange={(checked) => setProfile(prev => ({
                                ...prev,
                                swimmingDeclaration: {
                                  ...prev.swimmingDeclaration,
                                  canSwimWithClothes: checked
                                }
                              }))}
                            />
                            <span className="text-zinc-300 group-hover:text-white transition-colors">
                              {t('personalInfo.swimming.canSwimWithClothes')}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acil Durum İletişim */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">{t('emergency.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('emergency.name')}
                        </label>
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
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('emergency.phone')}
                        </label>
                        <PhoneInput
                          value={profile.emergencyContact.phone}
                          onChange={(value) => setProfile({
                            ...profile,
                            emergencyContact: {...profile.emergencyContact, phone: value}
                          })}
                          className="pl-10"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400 block mb-2">
                          {t('emergency.relation')}
                        </label>
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

                  {/* İzinler ve Onaylar */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white mb-4">{t('consents.title')}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white mb-4 block">Instagram Adresi</Label>
                        <div className="relative">
                          <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                          <Input
                            placeholder="Instagram kullanıcı adı"
                            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                            value={profile.instagramHandle}
                            onChange={(e) => setProfile(prev => ({ 
                              ...prev, 
                              instagramHandle: e.target.value.startsWith('@') ? e.target.value : '@' + e.target.value 
                            }))}
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                        <Switch
                          checked={profile.photoConsent}
                          onCheckedChange={(checked) => setProfile(prev => ({
                            ...prev,
                            photoConsent: checked
                          }))}
                        />
                        <div>
                          <p className="text-zinc-300 group-hover:text-white transition-colors">
                            {t('consents.photo.title')}
                          </p>
                          <p className="text-sm text-zinc-500">
                            {t('consents.photo.description')}
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                        <Switch
                          checked={profile.communicationConsent}
                          onCheckedChange={(checked) => setProfile(prev => ({
                            ...prev,
                            communicationConsent: checked
                          }))}
                        />
                        <div>
                          <p className="text-zinc-300 group-hover:text-white transition-colors">
                            {t('consents.communication.title')}
                          </p>
                          <p className="text-sm text-zinc-500">
                            {t('consents.communication.description')}
                          </p>
                        </div>
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
            <DialogTitle className="text-xl font-semibold text-white">
              {t('password.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Mevcut Şifre */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">
                {t('password.current')}
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
                  {showCurrentPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            {/* Yeni Şifre */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">
                {t('password.new')}
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
                  {showNewPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            {/* Yeni Şifre Tekrar */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">
                {t('password.confirm')}
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
                  {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPasswordModalOpen(false)}
              className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700 hover:text-white" 
            >
              {t('password.cancel')}
            </Button>
            <Button
              onClick={handlePasswordSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t('password.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fatura Bilgileri Modal */}
      <Dialog open={isBillingModalOpen} onOpenChange={setIsBillingModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-zinc-900 border-zinc-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              {t('billing.edit')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Fatura Tipi */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">
                {t('billing.type.label')}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={profile.billingInfo.type === "individual"}
                    onChange={() => setProfile({
                      ...profile,
                      billingInfo: {...profile.billingInfo, type: "individual"}
                    })}
                    className="text-blue-500"
                  />
                  <span className="text-zinc-400">{t('billing.type.individual')}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={profile.billingInfo.type === "corporate"}
                    onChange={() => setProfile({
                      ...profile,
                      billingInfo: {...profile.billingInfo, type: "corporate"}
                    })}
                    className="text-blue-500"
                  />
                  <span className="text-zinc-400">{t('billing.type.corporate')}</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">
                  {t('billing.fullName')}
                </label>
                <Input
                  value={profile.billingInfo.fullName}
                  onChange={(e) => setProfile({
                    ...profile,
                    billingInfo: {...profile.billingInfo, fullName: e.target.value}
                  })}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">
                  {t('billing.phone')}
                </label>
                <PhoneInput
                  value={profile.billingInfo.phone}
                  onChange={(value) => setProfile({
                    ...profile,
                    billingInfo: {...profile.billingInfo, phone: value}
                  })}
                  className="pl-10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">
                  {t('billing.city')}
                </label>
                <Input
                  value={profile.billingInfo.city}
                  onChange={(e) => setProfile({
                    ...profile,
                    billingInfo: {...profile.billingInfo, city: e.target.value}
                  })}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">
                  {t('billing.district')}
                </label>
                <Input
                  value={profile.billingInfo.district}
                  onChange={(e) => setProfile({
                    ...profile,
                    billingInfo: {...profile.billingInfo, district: e.target.value}
                  })}
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-zinc-400 block mb-2">
                  {t('billing.address')}
                </label>
                <Textarea
                  value={profile.billingInfo.address}
                  onChange={(e) => setProfile({
                    ...profile,
                    billingInfo: {...profile.billingInfo, address: e.target.value}
                  })}
                  className={inputClassName}
                  rows={3}
                />
              </div>

              {/* Kurumsal fatura bilgileri */}
              {profile.billingInfo.type === 'corporate' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('billing.companyName')}
                    </label>
                    <Input
                      value={profile.billingInfo.companyName}
                      onChange={(e) => setProfile({
                        ...profile,
                        billingInfo: {...profile.billingInfo, companyName: e.target.value}
                      })}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('billing.taxNumber')}
                    </label>
                    <Input
                      value={profile.billingInfo.taxNumber}
                      onChange={(e) => setProfile({
                        ...profile,
                        billingInfo: {...profile.billingInfo, taxNumber: e.target.value}
                      })}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('billing.taxOffice')}
                    </label>
                    <Input
                      value={profile.billingInfo.taxOffice}
                      onChange={(e) => setProfile({
                        ...profile,
                        billingInfo: {...profile.billingInfo, taxOffice: e.target.value}
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
              {t('billing.cancel')}
            </Button>
            <Button
              onClick={() => {
                console.log('Fatura bilgileri güncellendi');
                setIsBillingModalOpen(false);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t('billing.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 