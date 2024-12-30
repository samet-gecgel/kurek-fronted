"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { User, Mail, Phone, CreditCard, Save } from "lucide-react";

interface PreRegisterFormData {
  fullName: string;
  identityNumber: string;
  email: string;
  phone: string;
}

export default function PreRegister() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [phone, setPhone] = useState('');
  const [formData, setFormData] = useState<PreRegisterFormData>({
    fullName: '',
    identityNumber: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ad Soyad */}
                <div className="space-y-2">
                  <Label className="text-white">Ad Soyad</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="Ad ve soyadı girin"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* TC Kimlik */}
                <div className="space-y-2">
                  <Label className="text-white">TC Kimlik No</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="TC Kimlik numarası"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      maxLength={11}
                      value={formData.identityNumber}
                      onChange={(e) => setFormData({...formData, identityNumber: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* E-posta */}
                <div className="space-y-2">
                  <Label className="text-white">E-posta</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      type="email"
                      placeholder="E-posta adresi"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div className="space-y-2">
                  <Label className="text-white">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <PhoneInput
                      placeholder="Telefon numarası"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      value={phone}
                      onChange={(value) => {
                        setPhone(value);
                        setFormData({...formData, phone: value});
                      }}
                      required
                    />
                  </div>
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