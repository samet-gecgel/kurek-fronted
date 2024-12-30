"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { User, Mail, Phone, Save, Eye, EyeOff, Lock } from "lucide-react";

interface PreRegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export default function PreRegister() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<PreRegisterFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ad Soyad alanı boş bırakılamaz';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı boş bırakılamaz';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon alanı boş bırakılamaz';
    } else if (formData.phone.replace(/\s/g, '').length < 10) {
      newErrors.phone = 'Telefon numarası 10 haneli olmalıdır';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifre alanı boş bırakılamaz';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      // API çağrısı yapılacak
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <motion.div 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
        } relative z-0`}
      >
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-1 bg-gradient-to-b from-white via-white/50 to-transparent rounded-full" />
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-white">Yeni Üye Ön Kayıt</h1>
              <p className="text-xs md:text-sm text-zinc-400 mt-0.5">Yeni üye ön kaydı oluşturun</p>
            </div>
          </div>

          <Card className="bg-zinc-900/50 border-zinc-800/50 p-6 w-full">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ad Soyad */}
                <div className="space-y-2">
                  <Label className="text-white">Ad Soyad</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="Ad ve soyadı girin"
                      className={`pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400`}
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({...formData, fullName: e.target.value});
                        if (errors.fullName) setErrors({...errors, fullName: undefined});
                      }}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* E-posta */}
                <div className="grid gap-2">
                      <Label className="text-white">E-posta</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="ornek@email.com"
                          className={`pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                {/* Telefon */}
                <div className="space-y-2">
                  <Label className="text-white">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <PhoneInput
                      placeholder="5xx xxx xx xx"
                      className={`pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400`}
                      value={phone}
                      onChange={(value) => {
                        setPhone(value);
                        setFormData({...formData, phone: value});
                        if (errors.phone) setErrors({...errors, phone: undefined});
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Şifre */}
                <div className="space-y-2">
                  <Label className="text-white">Şifre</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••"
                      className="pl-10 pr-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({...formData, password: e.target.value});
                        if (errors.password) setErrors({...errors, password: undefined});
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
                    >
                      {showPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-full lg:w-auto px-4 md:px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Ön Kayıt Oluştur
                </Button>
              </div>
            </form>
          </Card>
        </main>
      </motion.div>
    </div>
  );
} 