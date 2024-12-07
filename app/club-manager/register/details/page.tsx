"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Phone, User, Users } from "lucide-react";
import Image from "next/image";

export default function ClubManagerDetails() {
  const [formData, setFormData] = useState({
    clubName: "",
    managerName: "",
    phone: "",
    address: "",
    memberCount: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // API'ye detay bilgileri gönderilecek
      console.log("Detaylar gönderiliyor:", formData);
      
      // Başarılı kayıt sonrası onay bekliyor sayfasına yönlendirme
      alert("Kayıt başarılı! Admin onayı bekleniyor.");
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>
      </div>

      <div className="relative container max-w-2xl mx-auto">
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
            Kulüp Bilgileri
          </h1>
          <p className="text-zinc-400 text-center mb-8">
            Kulübünüz hakkında detaylı bilgileri doldurun
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kulüp Adı */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">
                  Kulüp Adı
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
                  Yönetici Adı Soyadı
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
                  Telefon Numarası
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

              {/* Üye Sayısı */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">
                  Yaklaşık Üye Sayısı
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="number"
                    value={formData.memberCount}
                    onChange={(e) => setFormData({...formData, memberCount: e.target.value})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Adres */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">
                Kulüp Adresi
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
                Kulüp Hakkında Kısa Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors min-h-[100px]"
                placeholder="Kulübünüz hakkında kısa bir açıklama yazın..."
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
              Kaydı Tamamla
            </motion.button>

            <p className="text-sm text-zinc-400 text-center">
              Bilgileriniz admin onayından sonra aktif olacaktır.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 