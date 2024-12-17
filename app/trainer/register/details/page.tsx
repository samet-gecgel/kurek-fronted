"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, Medal, Briefcase, FileText, Upload, X } from "lucide-react";
import Image from "next/image";
import DatePicker from "@/components/ui/datePicker";

export default function TrainerRegisterDetails() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCertDatePicker, setShowCertDatePicker] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: new Date().toLocaleDateString('tr-TR'),
    specialization: "",
    experience: "",
    personalMessage: "",
    privacyAccepted: false,
    consentAccepted: false,
    profileImage: null as File | null,
    certificates: [] as {
      name: string;
      institution: string;
      date: string;
      file: File | null;
    }[]
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.date-picker-container') && !target.closest('.date-input')) {
        setShowDatePicker(false);
        setShowCertDatePicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        profileImage: e.target.files![0]
      }));
    }
  };

  const handleAddCertificate = () => {
    setFormData(prev => ({
      ...prev,
      certificates: [...prev.certificates, {
        name: "",
        institution: "",
        date: "",
        file: null
      }]
    }));
  };

  const handleRemoveCertificate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const handleDateSelect = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      birthDate: date.toLocaleDateString('tr-TR')
    }));
    setShowDatePicker(false);
  };

  const handleCertDateSelect = (date: Date, index: number) => {
    const newCerts = [...formData.certificates];
    newCerts[index].date = date.toLocaleDateString('tr-TR');
    setFormData(prev => ({ ...prev, certificates: newCerts }));
    setShowCertDatePicker(null);
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
            {/* Profil Resmi Yükleme */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 hover:border-blue-500 transition-colors"
                >
                  {formData.profileImage ? (
                    <div className="w-32 h-32 relative">
                      <Image
                        src={URL.createObjectURL(formData.profileImage)}
                        alt="Profile"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-zinc-400" />
                      <span className="text-sm text-zinc-400 mt-2">Profil Resmi Ekle</span>
                    </>
                  )}
                </label>
              </div>
            </div>

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

              {/* Doğum Tarihi - DatePicker ile */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">Doğum Tarihi</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    value={formData.birthDate}
                    onClick={() => setShowDatePicker(true)}
                    readOnly
                    className="date-input w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {showDatePicker && (
                    <div className="date-picker-container absolute z-10 mt-1">
                      <DatePicker onDateSelect={handleDateSelect} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Uzmanlık Alanı - Grid dışında */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">Uzmanlık Alanları</label>
              <div className="relative">
                <Medal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Örn: Kürek, Tekne Sınıfı A, Antrenman Programlama"
                  required
                />
              </div>
            </div>

            {/* Deneyim - Grid dışında */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">Deneyim</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Deneyimlerinizi detaylı bir şekilde yazınız"
                  required
                />
              </div>
            </div>

            {/* Kişisel Mesaj */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">Kişisel Mesaj</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  name="personalMessage"
                  value={formData.personalMessage}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Kendinizi kısaca tanıtın"
                  required
                />
              </div>
            </div>

            {/* Sertifikalar */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm text-zinc-400">Sertifikalar</label>
                <button
                  type="button"
                  onClick={handleAddCertificate}
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  + Yeni Sertifika Ekle
                </button>
              </div>
              
              {formData.certificates.map((cert, index) => (
                <div key={index} className="space-y-4 p-4 bg-zinc-800/30 rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveCertificate(index)}
                    className="absolute right-2 top-2 p-1 hover:bg-zinc-700 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-zinc-400" />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400">Sertifika Adı</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => {
                          const newCerts = [...formData.certificates];
                          newCerts[index].name = e.target.value;
                          setFormData(prev => ({ ...prev, certificates: newCerts }));
                        }}
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400">Kurum</label>
                      <input
                        type="text"
                        value={cert.institution}
                        onChange={(e) => {
                          const newCerts = [...formData.certificates];
                          newCerts[index].institution = e.target.value;
                          setFormData(prev => ({ ...prev, certificates: newCerts }));
                        }}
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400">Alınma Tarihi</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cert.date}
                          onClick={() => setShowCertDatePicker(index)}
                          readOnly
                          className="date-input w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white cursor-pointer"
                        />
                        {showCertDatePicker === index && (
                          <div className="date-picker-container absolute z-10 mt-1">
                            <DatePicker onDateSelect={(date) => handleCertDateSelect(date, index)} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400">Sertifika Dosyası</label>
                      <input
                        type="file"
                        onChange={(e) => {
                          const newCerts = [...formData.certificates];
                          newCerts[index].file = e.target.files?.[0] || null;
                          setFormData(prev => ({ ...prev, certificates: newCerts }));
                        }}
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-1 px-4 text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
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