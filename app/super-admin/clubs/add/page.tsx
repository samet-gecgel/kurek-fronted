"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Upload,
  X,
  Building,
  MapPin,
  Phone,
  Mail,
  Loader2,
  Save,
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/layout/sidebar";

export default function AddClubPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    logo: null as File | null,
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData({ ...formData, logo: null });
    setLogoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API'ye form verilerini gönder
      console.log("Form verileri:", formData);
      
      // Başarılı kayıt sonrası kulüpler sayfasına yönlendir
      router.push("/super-admin/clubs");
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-0' : 'ml-0'
      }`}>
        <div className="p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
            <Link href="/super-admin/dashboard" className="hover:text-white">Ana Panel</Link>
            <span>/</span>
            <Link href="/super-admin/clubs" className="hover:text-white">Kulüpler</Link>
            <span>/</span>
            <span className="text-zinc-300">Yeni Kulüp</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Yeni Kulüp Ekle</h1>
              <p className="text-zinc-400">Yeni bir spor kulübü kaydı oluşturun</p>
            </div>
            <Link 
              href="/super-admin/clubs"
              className="flex items-center gap-2 text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={20} />
              <span>Geri Dön</span>
            </Link>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-6 backdrop-blur-sm"
            >
              {/* Logo Upload Section */}
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-xl hover:border-zinc-500 transition-colors">
                <div className="mb-4">
                  {logoPreview ? (
                    <div className="relative w-32 h-32">
                      <Image
                        src={logoPreview}
                        alt="Logo Preview"
                        fill
                        className="rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-zinc-800/50 rounded-lg flex flex-col items-center justify-center">
                      <Upload size={32} className="text-zinc-400 mb-2" />
                      <span className="text-sm text-zinc-400">Logo Yükle</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="text-sm text-zinc-400 hover:text-white cursor-pointer"
                >
                  {logoPreview ? 'Logoyu Değiştir' : 'Kulüp Logosu Seç'}
                </label>
              </div>

              {/* Form Fields */}
              <div className="grid gap-6">
                {/* Kulüp Adı */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                    Kulüp Adı
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Kulübün adını girin"
                      required
                    />
                  </div>
                </div>

                {/* Adres */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-zinc-400 mb-2">
                    Adres
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-zinc-400" size={20} />
                    <textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Kulübün açık adresini girin"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-2">
                    Telefon
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="+90 (___) ___ __ __"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                    E-posta
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Link
                    href="/super-admin/clubs"
                    className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    İptal
                  </Link>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Kulübü Kaydet
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 