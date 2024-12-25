"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profile, setProfile] = useState({
    name: "Ahmet Yılmaz",
    email: "ahmet@admin.com",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [siteSettings, setSiteSettings] = useState({
    siteName: "Kürek Takımı Yönetim Sistemi",
    siteEmail: "info@kurek.com",
    sitePhone: "+90 555 555 55 55",
    siteAddress: "İstanbul, Türkiye",
  });

  const handleUpdateProfile = () => {
    console.log('Profil güncellendi:', profile);
    // API çağrısı: /api/super-admin/profile
  };

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Şifreler eşleşmiyor');
      return;
    }
    console.log('Şifre güncellendi');
    // API çağrısı: /api/super-admin/change-password
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleUpdateSiteSettings = () => {
    console.log('Site ayarları güncellendi:', siteSettings);
    // API çağrısı: /api/settings
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="container mx-auto p-8">
          {/* Üst Başlık */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Sistem Ayarları</h1>
            <p className="text-zinc-400 mt-1">Sistem ayarlarını ve profilinizi yönetin</p>
          </div>

          <div className="grid gap-6">
            {/* Profil Bilgileri */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Profil Bilgileri</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-400">Ad Soyad</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400">Email</label>
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white"
                    type="email"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleUpdateProfile} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Profili Güncelle
                  </Button>
                </div>
              </div>
            </Card>

            {/* Şifre Değiştir */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Şifre Değiştir</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-400">Mevcut Şifre</label>
                  <Input
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white"
                    type="password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400">Yeni Şifre</label>
                  <Input
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white"
                    type="password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400">Yeni Şifre Tekrar</label>
                  <Input
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white"
                    type="password"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleUpdatePassword} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Şifreyi Güncelle
                  </Button>
                </div>
              </div>
            </Card>

            {/* Site Ayarları */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Site Ayarları</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-400">Site Adı</label>
                  <Input
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400">Site Email</label>
                  <Input
                    value={siteSettings.siteEmail}
                    onChange={(e) => setSiteSettings({...siteSettings, siteEmail: e.target.value})}
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400">Site Telefon</label>
                  <Input
                    value={siteSettings.sitePhone}
                    onChange={(e) => setSiteSettings({...siteSettings, sitePhone: e.target.value})}
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400">Site Adresi</label>
                  <Input
                    value={siteSettings.siteAddress}
                    onChange={(e) => setSiteSettings({...siteSettings, siteAddress: e.target.value})}
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleUpdateSiteSettings} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Site Ayarlarını Güncelle
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 