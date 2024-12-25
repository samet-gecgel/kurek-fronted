"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { TrainerSidebar } from "@/components/layout/trainer-sidebar";
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
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { enUS, tr } from "date-fns/locale";
import DatePicker from "@/components/ui/datePicker";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface Certificate {
  name: string;
  institution: string;
  date: Date;
  pdfUrl?: string;
}

interface TrainerProfile {
  fullName: string;
  email: string;
  phone: string;
  birthDate: Date;
  expertise: string[];
  experience: string;
  certificates: Certificate[];
  photoUrl: string;
  bio: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const t = useTranslations('trainerProfile');
  const params = useParams();
  const locale = params.locale as string;
  const dateLocale = locale === 'tr' ? tr : enUS;

  const [profile, setProfile] = useState<TrainerProfile>({
    fullName: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 555 123 4567",
    birthDate: new Date(1990, 0, 1),
    expertise: ["Kürek", "Tekne Sınıfı A", "Antrenman Programlama"],
    experience: "10 yıllık kürek antrenörlüğü deneyimi",
    certificates: [
      {
        name: "Level 1 Antrenörlük",
        institution: "Türkiye Kürek Federasyonu",
        date: new Date(2020, 0, 1),
        pdfUrl: "/certificates/level1.pdf"
      }
    ],
    photoUrl: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    bio: "Kürek sporunda uzmanlaşmış, deneyimli bir antrenör."
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCertDatePicker, setShowCertDatePicker] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert(t('photo.errors.type'));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(t('photo.errors.size'));
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, photoUrl: imageUrl });
      console.log('New photo:', file);
    }
  };

  const handleSave = () => {
    console.log(t('saved'), profile);
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

  const handleCertificateDateSelect = (date: Date, index: number) => {
    const newCerts = [...profile.certificates];
    newCerts[index].date = date;
    setProfile({ ...profile, certificates: newCerts });
    setShowCertDatePicker(null);
  };

  // Input ve Textarea için ortak className
  const inputClassName = "bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-blue-500/50 focus:ring-blue-500/20 placeholder:text-zinc-500";


  return (
    <div className="flex h-screen bg-[#09090B]">
      <TrainerSidebar />
      <motion.div 
        className="flex-1 overflow-y-auto ml-20 lg:ml-64 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">{t('title')}</h1>
              <p className="text-sm text-zinc-400 mt-1">{t('subtitle')}</p>
            </div>
            <Button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {t('save')}
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sol Kolon */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Profil Kartı */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
              <div className="p-6 -mt-16">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden shadow-xl relative">
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
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {profile.expertise.map((exp, index) => (
                      <Badge key={index} className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {exp}
                      </Badge>
                    ))}
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
                  <p className="text-xs text-zinc-400 mt-0.5">{t('password.subtitle')}</p>
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
          </div>

          {/* Sağ Kolon */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ad Soyad */}
                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('form.fullName')}
                    </label>
                    <Input
                      value={profile.fullName}
                      onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                      className={inputClassName}
                      placeholder="Ad Soyad"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('form.email')}
                    </label>
                    <Input
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className={inputClassName}
                      placeholder={t('form.email')}
                    />
                  </div>

                  {/* Telefon */}
                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('form.phone')}
                    </label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className={inputClassName}
                      placeholder={t('form.phone')}
                    />
                  </div>

                  {/* Doğum Tarihi */}
                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('form.birthDate')}
                    </label>
                    <div className="relative">
                      <Input
                        value={format(profile.birthDate, "d MMMM yyyy", { locale: dateLocale })}
                        readOnly
                        className={`${inputClassName} cursor-pointer`}
                        onClick={() => setShowDatePicker(true)}
                      />
                      {showDatePicker && (
                        <>
                          <div className="fixed inset-0" onClick={() => setShowDatePicker(false)} />
                          <div className="absolute z-50 mt-2">
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
                </div>

                {/* Uzmanlık Alanları */}
                <div>
                  <label className="text-sm font-medium text-zinc-400 block mb-2">
                    {t('form.expertise.label')}
                  </label>
                  <Input
                    value={profile.expertise.join(", ")}
                    onChange={(e) => setProfile({...profile, expertise: e.target.value.split(",")})}
                    className={inputClassName}
                    placeholder={t('form.expertise.placeholder')}
                  />
                </div>

                {/* Deneyim */}
                <div className="mt-6">
                  <label className="text-sm font-medium text-zinc-400 block mb-2">
                    {t('form.experience.label')}
                  </label>
                  <Textarea
                    value={profile.experience}
                    onChange={(e) => setProfile({...profile, experience: e.target.value})}
                    className={inputClassName}
                    placeholder={t('form.experience.placeholder')}
                  />
                </div>

                {/* Kişisel Mesaj */}
                <div className="mt-6">
                  <label className="text-sm font-medium text-zinc-400 block mb-2">
                    {t('form.bio.label')}
                  </label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className={inputClassName}
                    placeholder={t('form.bio.placeholder')}
                  />
                </div>

                {/* Sertifikalar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-zinc-400">
                      {t('certificates.title')}
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setProfile({
                          ...profile,
                          certificates: [
                            ...profile.certificates,
                            {
                              name: "",
                              institution: "",
                              date: new Date(),
                              pdfUrl: ""
                            }
                          ]
                        });
                      }}
                      className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 hover:text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {t('certificates.addNew')}
                    </Button>
                  </div>

                  {profile.certificates.map((cert, index) => (
                    <Card key={index} className="bg-zinc-800/30 border-zinc-700/50 p-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-zinc-400 block mb-1">
                            {t('certificates.form.name.label')}
                          </label>
                          <Input
                            value={cert.name}
                            onChange={(e) => {
                              const newCerts = [...profile.certificates];
                              newCerts[index].name = e.target.value;
                              setProfile({ ...profile, certificates: newCerts });
                            }}
                            className={inputClassName}
                            placeholder={t('certificates.form.name.placeholder')}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-400 block mb-1">
                            {t('certificates.form.institution.label')}
                          </label>
                          <Input
                            value={cert.institution}
                            onChange={(e) => {
                              const newCerts = [...profile.certificates];
                              newCerts[index].institution = e.target.value;
                              setProfile({ ...profile, certificates: newCerts });
                            }}
                            className={inputClassName}
                            placeholder={t('certificates.form.institution.placeholder')}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-400 block mb-1">
                            {t('certificates.form.date')}
                          </label>
                          <div className="relative">
                            <Input
                              value={format(cert.date, "d MMMM yyyy", { locale: dateLocale })}
                              readOnly
                              className={`${inputClassName} cursor-pointer`}
                              onClick={() => setShowCertDatePicker(index)}
                            />
                            {showCertDatePicker === index && (
                              <>
                                <div className="fixed inset-0" onClick={() => setShowCertDatePicker(null)} />
                                <div className="absolute z-[60] bottom-full mb-2">
                                  <DatePicker
                                    onDateSelect={(date) => handleCertificateDateSelect(date, index)}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-zinc-400 block mb-1">
                            {t('certificates.form.file.label')}
                          </label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input
                                type="file"
                                accept=".pdf"
                                id={`cert-file-${index}`}
                                className="hidden"
                                onChange={() => {
                                  // PDF yükleme mantığı
                                }}
                              />
                              <label
                                htmlFor={`cert-file-${index}`}
                                className={`
                                  flex items-center justify-between px-3 py-2 rounded-md cursor-pointer
                                  border border-zinc-700 bg-zinc-900 text-zinc-100
                                  hover:bg-zinc-800 transition-colors
                                `}
                              >
                                <span className="text-sm text-zinc-400">
                                  {cert.pdfUrl ? t('certificates.form.file.selected') : t('certificates.form.file.noFile')}
                                </span>
                                <span className="bg-zinc-800 px-2 py-1 rounded text-xs text-zinc-300">
                                  {t('certificates.form.file.select')}
                                </span>
                              </label>
                            </div>
                            {cert.pdfUrl && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 border-zinc-700 hover:bg-zinc-800"
                                onClick={() => window.open(cert.pdfUrl, '_blank')}
                              >
                                <Eye className="h-4 w-4 text-blue-400" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => {
                          const newCerts = profile.certificates.filter((_, i) => i !== index);
                          setProfile({ ...profile, certificates: newCerts });
                        }}
                      >
                        {t('certificates.delete')}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Şifre Değiştirme Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              {t('password.title')}
            </DialogTitle>
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
                {t('password.form.current.label')}
              </label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  className={inputClassName}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:black"
                  title={showCurrentPassword ? "Şifreyi Gizle" : "Şifreyi Göster"}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Yeni Şifre */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">
                {t('password.form.new.label')}
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  className={inputClassName}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-black"
                  title={showNewPassword ? "Şifreyi Gizle" : "Şifreyi Göster"}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Yeni Şifre Tekrar */}
            <div>
              <label className="text-sm font-medium text-zinc-400 block mb-2">
                {t('password.form.confirm.label')}
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  className={inputClassName}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-black"
                  title={showConfirmPassword ? "Şifreyi Gizle" : "Şifreyi Göster"}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsPasswordModalOpen(false)}
              className="border-zinc-800 hover:bg-red-500 hover:text-white"
            >
              İptal
            </Button>
            <Button
              onClick={handlePasswordSubmit}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {t('password.save')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 