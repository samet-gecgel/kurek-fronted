"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { User, Phone, Upload, Camera } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { LanguageSelector } from "@/components/language-selector";
import { PhoneInput } from "@/components/ui/phone-input";

interface ManagerDetails {
  fullName: string;
  position: string;
  phone: string;
  photoUrl: string | null;
}

export default function ManagerDetailsPage() {
  const t = useTranslations('managerRegisterDetails');
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ManagerDetails>({
    fullName: "",
    position: "",
    phone: "",
    photoUrl: null
  });

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
      setFormData({ ...formData, photoUrl: imageUrl });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/club-manager/club-register');
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      {/* Background Effect */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>
      </div>

      <div className="container max-w-2xl mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <LanguageSelector />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={60}
              className="hover:opacity-80 transition-opacity"
            />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 text-center">
            {t('title')}
          </h1>
          <p className="text-zinc-400 text-center mb-8">
            {t('subtitle')}
          </p>

          {/* Profil Fotoğrafı */}
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <label
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 hover:border-blue-500 transition-colors"
              >
                {formData.photoUrl ? (
                  <div className="w-32 h-32 relative">
                    <Image
                      src={formData.photoUrl}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-zinc-400" />
                    <span className="text-sm text-zinc-400 mt-2">
                      {t('photo.upload')}
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Temel Bilgiler */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">
                {t('basicInfo.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('form.fullName')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                      placeholder="Ahmet Yılmaz"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('form.position')}
                  </label>
                  <div className="relative">
                    <Input
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      className="bg-zinc-800/50 border-zinc-700 text-white"
                      placeholder="Kulüp Yöneticisi"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('form.phone')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => setFormData({...formData, phone: value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 rounded-lg transition-all duration-200"
            >
              {t('submit')}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 