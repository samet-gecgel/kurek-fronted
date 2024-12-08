"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, Award, Trophy, BookOpen, FileText } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";

export default function AddTrainerPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    identityNumber: "",
    phone: "",
    birthDate: "",
    specialization: "Kürek Antrenörü", // Varsayılan değer
    experience: "",
    education: "",
    certificates: "",
    achievements: "",
    bio: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API entegrasyonu burada yapılacak
    console.log("Form data:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-medium text-white mb-6">Lütfen antrenör bilgilerinizi eksiksiz doldurunuz</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-zinc-400" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Ad Soyad"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">TC Kimlik No</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-zinc-400" size={18} />
                  <input
                    type="text"
                    name="identityNumber"
                    value={formData.identityNumber}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="TC Kimlik No"
                  />
                </div>
              </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
          <Link href="/super-admin/dashboard" className="hover:text-white">
            Ana Panel
          </Link>
          <span>/</span>
          <Link href="/super-admin/trainers" className="hover:text-white">
            Antrenörler
          </Link>
          <span>/</span>
          <span className="text-white">Yeni Antrenör</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Yeni Antrenör Kaydı</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Kişisel Bilgiler</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Ad Soyad</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="Ad Soyad"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">TC Kimlik No</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <input
                      type="text"
                      name="identityNumber"
                      value={formData.identityNumber}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="TC Kimlik No"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Telefon</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="Telefon"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Doğum Tarihi</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Mesleki Bilgiler</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Uzmanlık Alanı</label>
                  <div className="relative">
                    <Award className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="Örn: Kürek Antrenörü"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Deneyim (Yıl)</label>
                  <div className="relative">
                    <Trophy className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="Yıl olarak deneyiminiz"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Eğitim Bilgileri</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <textarea
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                      rows={4}
                      placeholder="Eğitim geçmişinizi detaylı bir şekilde yazınız"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Sertifikalar</label>
                  <div className="relative">
                    <Award className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <textarea
                      name="certificates"
                      value={formData.certificates}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                      rows={4}
                      placeholder="Sahip olduğunuz sertifikaları listeleyiniz"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Başarılar</label>
                  <div className="relative">
                    <Trophy className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <textarea
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                      rows={4}
                      placeholder="Sportif başarılarınızı ve antrenörlük başarılarınızı yazınız"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Kısa Biyografi</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-zinc-400" size={18} />
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500"
                      rows={4}
                      placeholder="Kendinizi kısaca tanıtın"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-end gap-4">
              <Link
                href="/super-admin/trainers"
                className="px-6 py-2 text-zinc-300 hover:text-white transition-colors"
              >
                İptal
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 