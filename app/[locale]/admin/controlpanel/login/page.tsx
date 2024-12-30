"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, AlertCircle, Shield } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SuperAdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // API'ye giriş isteği gönderilecek
      console.log("Super Admin girişi yapılıyor:", formData);
      
      // Başarılı giriş sonrası yönlendirme
      router.push("/admin/controlpanel/dashboard");
    } catch {
      setError("Giriş yapılırken bir hata oluştu");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full" />
        </div>
      </div>

      <div className="relative container max-w-lg mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -top-20 left-0"
        >
          <Link 
            href="/"
            className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm"
        >
          {/* Logo ve Shield Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={60}
                className="hover:opacity-80 transition-opacity"
              />
              <Shield className="absolute -right-8 -bottom-4 w-8 h-8 text-red-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 text-center">
            Yönetici Girişi
          </h1>
          <p className="text-zinc-400 text-center mb-6">
            Yönetim paneline erişmek için giriş yapın
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-6 flex items-center gap-2 text-red-200">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-zinc-400 block">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="ornek@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-zinc-400 block">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/super-admin/forgot-password"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Şifremi Unuttum
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Shield size={20} />
              Giriş Yap
            </motion.button>

          </form>
        </motion.div>
      </div>
    </div>
  );
} 