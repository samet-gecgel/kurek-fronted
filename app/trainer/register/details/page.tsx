"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, Medal, Briefcase, FileText, Trophy } from "lucide-react";
import Image from "next/image";


export default function TrainerRegisterDetails() {
  const [formData, setFormData] = useState({
    name: "",
    tcNo: "",
    phone: "",
    birthDate: "",
    address: "",
    specialization: "", // Uzmanlık alanı
    experience: "", // Deneyim yılı
    certificates: "", // Sertifikalar
    education: "", // Eğitim bilgileri
    achievements: "", // Başarılar
    availability: "", // Müsait olduğu zamanlar
    bio: "", // Kısa biyografi
    privacyAccepted: false,
    consentAccepted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Antrenör kaydı tamamlanıyor:", formData);
    // Kayıt işlemleri ve yönlendirme
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
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
            Antrenör Bilgileri
          </h1>
          <p className="text-zinc-400 text-center mb-8">
            Lütfen antrenör bilgilerinizi eksiksiz doldurunuz
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Kişisel Bilgiler */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* TC Kimlik No */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">TC Kimlik No</label>
                <div className="relative">
                  <input
                    type="text"
                    name="tcNo"
                    value={formData.tcNo}
                    onChange={handleChange}
                    maxLength={11}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Telefon */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Doğum Tarihi */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Doğum Tarihi</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Uzmanlık Alanı */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Uzmanlık Alanı</label>
                <div className="relative">
                  <Medal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Örn: Kürek Antrenörü"
                    required
                  />
                </div>
              </div>

              {/* Deneyim */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Deneyim (Yıl)</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      handleChange({
                        target: {
                          name: 'experience',
                          value
                        }
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Yıl olarak deneyiminiz"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Eğitim Bilgileri */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">Eğitim Bilgileri</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Eğitim geçmişinizi detaylı bir şekilde yazınız"
                  required
                />
              </div>
            </div>

            {/* Sertifikalar */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">Sertifikalar</label>
              <div className="relative">
                <Medal className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  name="certificates"
                  value={formData.certificates}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Sahip olduğunuz sertifikaları listeleyiniz"
                  required
                />
              </div>
            </div>

            {/* Başarılar */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">Başarılar</label>
              <div className="relative">
                <Trophy className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Sportif başarılarınızı ve antrenörlük başarılarınızı yazınız"
                />
              </div>
            </div>

            {/* Biyografi */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">Kısa Biyografi</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Kendinizi kısaca tanıtın"
                  required
                />
              </div>
            </div>

            {/* Onay Checkboxları */}
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-blue-500 rounded"
                  required
                />
                <span className="text-zinc-400">
                  Gizlilik sözleşmesini okudum ve kabul ediyorum
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="consentAccepted"
                  checked={formData.consentAccepted}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-blue-500 rounded"
                  required
                />
                <span className="text-zinc-400">
                  Açık rıza metnini okudum ve kabul ediyorum
                </span>
              </label>
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
          </form>
        </motion.div>
      </div>
    </div>
  );
} 