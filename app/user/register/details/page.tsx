"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, MapPin, Heart, Briefcase, UserPlus } from "lucide-react";
import Image from "next/image";

export default function RegisterDetails() {
  const [formData, setFormData] = useState({
    name: "",
    tcNo: "",
    phone: "",
    birthDate: "",
    birthPlace: "",
    bloodType: "",
    canSwim: "false",
    occupation: "",
    emergencyContact: "",
    emergencyPhone: "",
    address: "",
    registrationType: "individual",
    privacyAccepted: false,
    consentAccepted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Kayıt tamamlanıyor:", formData);
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
            Kişisel Bilgiler
          </h1>
          <p className="text-zinc-400 text-center mb-8">
            Lütfen bilgilerinizi eksiksiz doldurunuz
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ad Soyad */}
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

              {/* Kan Grubu */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Kan Grubu</label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="0+">0+</option>
                    <option value="0-">0-</option>
                  </select>
                </div>
              </div>

              {/* Yüzme Bilgisi */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Yüzme Biliyor musunuz?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="canSwim"
                      value="true"
                      checked={formData.canSwim === "true"}
                      onChange={handleChange}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-white">Evet</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="canSwim"
                      value="false"
                      checked={formData.canSwim === "false"}
                      onChange={handleChange}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-white">Hayır</span>
                  </label>
                </div>
              </div>

              {/* Meslek */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Meslek</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Acil Durum Yakını */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Acil Durum Yakını</label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Acil Durum Telefonu */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Acil Durum Telefonu</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Adres */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">Adres</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Kayıt Türü */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">Kayıt Türü</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="registrationType"
                    value="individual"
                    checked={formData.registrationType === "individual"}
                    onChange={handleChange}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-white">Bireysel</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="registrationType"
                    value="student"
                    checked={formData.registrationType === "student"}
                    onChange={handleChange}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-white">Öğrenci</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="registrationType"
                    value="corporate"
                    checked={formData.registrationType === "corporate"}
                    onChange={handleChange}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-white">Kurumsal</span>
                </label>
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