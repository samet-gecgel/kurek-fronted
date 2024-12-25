"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Phone, User, Camera, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { LanguageSelector } from "@/components/language-selector";

export default function ClubManagerDetails() {
  const t = useTranslations('clubManagerRegisterDetails');
  const [formData, setFormData] = useState({
    clubName: "",
    managerName: "",
    phone: "",
    address: "",
    description: "",
  });
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log("Detaylar gönderiliyor:", formData);
      alert(t('submitSuccess'));
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert(t('logo.errors.type'));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(t('logo.errors.size'));
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setLogoUrl(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      {/* Background Effect */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>
      </div>

      <div className="container max-w-2xl mx-auto relative">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <LanguageSelector />
          </motion.div>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm"
        >
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

          <div className="mb-8">
            <div className="flex justify-center">
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="hidden"
                />
                
                <div className="relative w-48 h-32 bg-zinc-800/50 border-2 border-dashed border-zinc-700 rounded-lg overflow-hidden group">
                  {logoUrl ? (
                    <>
                      <Image
                        src={logoUrl}
                        alt="Club Logo"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                          title={t('logo.change')}
                        >
                          <Camera className="w-5 h-5 text-white" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setLogoUrl(null)}
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                          title={t('logo.remove')}
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400 hover:text-zinc-300 transition-colors"
                    >
                      <Camera className="w-8 h-8" />
                      <span className="text-sm">{t('logo.upload')}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kulüp Adı */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">
                  {t('form.clubName')}
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    value={formData.clubName}
                    onChange={(e) => setFormData({...formData, clubName: e.target.value})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Yönetici Adı */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">
                  {t('form.managerName')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    value={formData.managerName}
                    onChange={(e) => setFormData({...formData, managerName: e.target.value})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Telefon */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">
                  {t('form.phone')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="05XX XXX XX XX"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Adres */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">
                {t('form.address')}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors min-h-[100px]"
                  required
                />
              </div>
            </div>

            {/* Açıklama */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">
                {t('form.description.label')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors min-h-[100px]"
                placeholder={t('form.description.placeholder')}
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {t('submit')}
            </motion.button>

            <p className="text-sm text-zinc-400 text-center">
              {t('pendingApproval')}
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 