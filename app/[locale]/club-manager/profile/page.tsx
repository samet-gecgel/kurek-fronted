"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, Camera, Eye, EyeOff, Lock } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import Image from "next/image";

interface ManagerProfile {
  photo: string | null;
  email: string;
  fullName: string;
  position: string;
  phone: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const t = useTranslations('profile');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profile, setProfile] = useState<ManagerProfile>({
    photo: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
    email: "manager@example.com",
    fullName: "Ahmet Yılmaz",
    position: "Kulüp Müdürü",
    phone: "5111111111"
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Şifre değiştirme API çağrısı yapılacak
    console.log('Password form:', passwordForm);
    setIsPasswordDialogOpen(false);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Profil güncelleme API çağrısı yapılacak
    console.log('Updated profile:', profile);
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <ManagerSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-100 mb-2">{t('title')}</h1>
              <p className="text-zinc-400">{t('description')}</p>
            </div>
            <Button
              type="submit"
              form="profile-form"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
            >
              {t('saveButton')}
            </Button>
          </div>

          <form id="profile-form" onSubmit={handleProfileSubmit} className="space-y-6">
            {/* Profil Fotoğrafı */}
            <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-8 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-8">
                <div className="relative w-32 h-32 group">
                  {profile.photo ? (
                    <Image
                      src={profile.photo}
                      alt="Profile Photo"
                      fill
                      className="object-cover rounded-full ring-2 ring-zinc-700/50 transition-all duration-300 group-hover:ring-blue-500/50"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center ring-2 ring-zinc-700/50">
                      <Camera className="w-8 h-8 text-zinc-400" />
                    </div>
                  )}
                  <label className="absolute -bottom-2 -right-2 p-2.5 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-zinc-100">{profile.fullName}</h3>
                  <p className="text-zinc-400">{profile.position}</p>
                </div>
              </div>
            </div>

            {/* Profil Bilgileri */}
            <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-6 rounded-xl space-y-4 border border-zinc-800/50 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm text-zinc-400">{t('basicInfo.email')}</label>
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-zinc-800/50 border-zinc-700/50 text-white mt-1"
                    type="email"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-zinc-400">{t('basicInfo.fullName')}</label>
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                    className="bg-zinc-800/50 border-zinc-700/50 text-white mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-zinc-400">{t('basicInfo.position')}</label>
                  <Input
                    value={profile.position}
                    onChange={(e) => setProfile(prev => ({ ...prev, position: e.target.value }))}
                    className="bg-zinc-800/50 border-zinc-700/50 text-white mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-zinc-400">{t('basicInfo.phone')}</label>
                  <PhoneInput
                    value={profile.phone}
                    onChange={(value) => setProfile(prev => ({ ...prev, phone: value }))}
                    className="bg-zinc-800/50 border-zinc-700/50 text-white mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Şifre Değiştir Butonu */}
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-800/50 rounded-lg">
                  <Lock className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-zinc-100">{t('password.title')}</h3>
                  <p className="text-sm text-zinc-400">{t('password.description')}</p>
                </div>
                <Button
                  type="button"
                  onClick={() => setIsPasswordDialogOpen(true)}
                  className="ml-auto bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-100 transition-colors"
                >
                  {t('password.change')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Şifre Değiştirme Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-zinc-100">
              {t('password.title')}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-zinc-400">{t('password.current')}</label>
              <div className="relative mt-1">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="bg-zinc-800/50 border-zinc-700/50 text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(prev => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                  {showCurrentPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400">{t('password.new')}</label>
              <div className="relative mt-1">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="bg-zinc-800/50 border-zinc-700/50 text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(prev => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                  {showCurrentPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400">{t('password.confirm')}</label>
              <div className="relative mt-1">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="bg-zinc-800/50 border-zinc-700/50 text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                 {showCurrentPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPasswordDialogOpen(false)}
                className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700 hover:text-white"
              >
                {t('password.cancel')}
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t('password.save')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 