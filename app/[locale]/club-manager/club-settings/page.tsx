"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { TimePicker } from "@/components/ui/time-picker";
import { Upload, Camera, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import Image from "next/image";

interface WorkingHours {
  open: string;
  close: string;
  isOpen: boolean;
}

interface ClubSettings {
  logo: string | null;
  name: string;
  phone: string;
  address: string;
  description: string;
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
  };
  workingHours: {
    monday: WorkingHours;
    tuesday: WorkingHours;
    wednesday: WorkingHours;
    thursday: WorkingHours;
    friday: WorkingHours;
    saturday: WorkingHours;
    sunday: WorkingHours;
  };
}

export default function ClubSettingsPage() {
  const t = useTranslations('clubSettings');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [settings, setSettings] = useState<ClubSettings>({
    logo: "https://e1.pxfuel.com/desktop-wallpaper/983/683/desktop-wallpaper-metalica-logo-cool-logos.jpg", // Örnek logo
    name: "Spor Kulübü",
    phone: "212 123 4567",
    address: "Örnek Mahallesi, Spor Caddesi No:1",
    description: "Profesyonel spor kulübümüz...",
    social: {
      instagram: "sporkulubu",
      facebook: "sporkulubu",
      youtube: "SporKulubuTV",
      twitter: "sporkulubu"
    },
    workingHours: {
      monday: { open: "09:00", close: "22:00", isOpen: true },
      tuesday: { open: "09:00", close: "22:00", isOpen: true },
      wednesday: { open: "09:00", close: "22:00", isOpen: true },
      thursday: { open: "09:00", close: "22:00", isOpen: true },
      friday: { open: "09:00", close: "22:00", isOpen: true },
      saturday: { open: "10:00", close: "20:00", isOpen: true },
      sunday: { open: "10:00", close: "18:00", isOpen: true }
    }
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Logo yükleme işlemleri
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkingHourChange = (
    day: keyof ClubSettings['workingHours'],
    field: keyof WorkingHours,
    value: string | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API çağrısı yapılacak
    console.log('Güncellenecek ayarlar:', settings);
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <ManagerSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-100 mb-2">{t('title')}</h1>
              <p className="text-zinc-400">{t('subtitle')}</p>
            </div>
            <Button
              type="submit"
              form="settings-form"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
            >
              {t('saveButton')}
            </Button>
          </div>

          <form id="settings-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Logo ve Sosyal Medya Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Güncelleme */}
              <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-8 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-zinc-100 mb-4">{t('logo.title')}</h2>
                <div className="flex items-center justify-center">
                  <div className="relative w-72 h-48 group">
                    {settings.logo ? (
                      <Image
                        src={settings.logo}
                        alt="Club Logo"
                        fill
                        className="object-contain rounded-xl ring-2 ring-zinc-700/50 transition-all duration-300 group-hover:ring-blue-500/50 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl flex items-center justify-center ring-2 ring-zinc-700/50 group-hover:ring-blue-500/50 transition-all duration-200">
                        <Camera className="w-10 h-10 text-zinc-400" />
                      </div>
                    )}
                    <label className="absolute -bottom-3 -right-3 p-2.5 bg-blue-500 rounded-xl cursor-pointer hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <Upload className="w-5 h-5 text-white" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Sosyal Medya */}
              <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-6 rounded-xl space-y-4 border border-zinc-800/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-zinc-100 mb-4">{t('social.title')}</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <Input
                      value={settings.social.instagram}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        social: { ...prev.social, instagram: e.target.value }
                      }))}
                      className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white"
                      placeholder="@username"
                    />
                  </div>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <Input
                      value={settings.social.facebook}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        social: { ...prev.social, facebook: e.target.value }
                      }))}
                      className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white"
                      placeholder="username"
                    />
                  </div>
                  <div className="relative">
                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <Input
                      value={settings.social.youtube}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        social: { ...prev.social, youtube: e.target.value }
                      }))}
                      className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white"
                      placeholder="channel-name"
                    />
                  </div>
                  <div className="relative">
                    <FaXTwitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <Input
                      value={settings.social.twitter}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        social: { ...prev.social, twitter: e.target.value }
                      }))}
                      className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Temel Bilgiler */}
            <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-6 rounded-xl space-y-4 border border-zinc-800/50 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-zinc-100 mb-4">{t('basicInfo.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-400">{t('basicInfo.name')}</label>
                  <Input
                    value={settings.name}
                    onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-zinc-800/50 border-zinc-700/50 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400">{t('basicInfo.phone')}</label>
                  <PhoneInput
                    value={settings.phone}
                    onChange={(value) => setSettings(prev => ({ ...prev, phone: value }))}
                    className="bg-zinc-800/50 border-zinc-700/50 text-white mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-zinc-400">{t('basicInfo.address')}</label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <Input
                      value={settings.address}
                      onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                      className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-zinc-400">{t('basicInfo.description')}</label>
                  <Textarea
                    value={settings.description}
                    onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-zinc-800/50 border-zinc-700/50 text-white mt-1 min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Çalışma Saatleri */}
            <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-6 rounded-xl space-y-4 border border-zinc-800/50 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-zinc-100 mb-4">{t('workingHours.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(settings.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-28">
                      <span className="text-zinc-300">
                        {t(`workingHours.days.${day}`)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <TimePicker
                        value={hours.open}
                        onChange={(value) => handleWorkingHourChange(
                          day as keyof ClubSettings['workingHours'],
                          'open',
                          value
                        )}
                        className="w-32"
                        disabled={!hours.isOpen}
                      />
                      <span className="text-zinc-400">-</span>
                      <TimePicker
                        value={hours.close}
                        onChange={(value) => handleWorkingHourChange(
                          day as keyof ClubSettings['workingHours'],
                          'close',
                          value
                        )}
                        className="w-32"
                        disabled={!hours.isOpen}
                      />
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <input
                        type="checkbox"
                        checked={hours.isOpen}
                        onChange={(e) => handleWorkingHourChange(
                          day as keyof ClubSettings['workingHours'],
                          'isOpen',
                          e.target.checked
                        )}
                        className="w-4 h-4 rounded border-zinc-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-zinc-400 text-sm">
                        {t('workingHours.status')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 