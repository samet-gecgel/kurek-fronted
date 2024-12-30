"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  User,
  Mail,
  Phone,
  Lock,
  Plus,
  Search,
  Trash2,
  Shield,
  Briefcase,
  Eye,
  EyeOff
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { Manager } from "@/types/club/club-manager";



export default function ClubManagers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [managers, setManagers] = useState<Manager[]>([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@admin.com",
      phone: "+90 555 123 4567",
      position: "Başkan",
      photo: null,
      isPrimaryManager: true
    },
    {
      id: 2,
      name: "Mehmet Demir",
      email: "mehmet@admin.com",
      phone: "+90 555 987 6543",
      position: "Başkan Yardımcısı",
      photo: null,
      isPrimaryManager: false
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    password: '',
    isPrimaryManager: false
  });

  const [errors, setErrors] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleDeleteManager = (id: number) => {
    setManagers(prev => prev.filter(manager => manager.id !== id));
  };

  const handleAddManager = () => {
    setErrors({
      name: '',
      position: '',
      email: '',
      phone: '',
      password: ''
    });

    let hasError = false;

    if (!formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Ad Soyad alanı boş bırakılamaz' }));
      hasError = true;
    }

    if (!formData.position.trim()) {
      setErrors(prev => ({ ...prev, position: 'Görev/Unvan alanı boş bırakılamaz' }));
      hasError = true;
    }

    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'E-posta alanı boş bırakılamaz' }));
      hasError = true;
    } else if (!formData.email.includes('@')) {
      setErrors(prev => ({ ...prev, email: 'Geçerli bir e-posta adresi giriniz' }));
      hasError = true;
    }

    if (!formData.phone.trim()) {
      setErrors(prev => ({ ...prev, phone: 'Telefon alanı boş bırakılamaz' }));
      hasError = true;
    } else {
      const phoneNumber = formData.phone.replace(/\D/g, '');
      if (phoneNumber.length !== 10) {
        setErrors(prev => ({ ...prev, phone: 'Telefon numarası 10 haneli olmalıdır' }));
        hasError = true;
      }
    }

    if (formData.password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Şifre en az 6 karakter olmalıdır' }));
      hasError = true;
    }

    if (hasError) return;

    const newManager = {
      id: managers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      photo: null,
      isPrimaryManager: formData.isPrimaryManager
    };

    setManagers(prev => [...prev, newManager]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      password: '',
      isPrimaryManager: false
    });
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-semibold text-white">Yöneticiler</h1>
              <p className="text-xs md:text-sm text-zinc-400 mt-0.5">Sistem yöneticilerini görüntüle ve yönet</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  placeholder="İsim veya email ile ara..."
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 w-full sm:w-64"
                />
              </div>

              <Dialog 
                open={isDialogOpen} 
                onOpenChange={setIsDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Plus size={20} className="mr-2" />
                    Yönetici Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white w-[95%] sm:w-full max-w-lg mx-auto">
                  <DialogHeader>
                    <DialogTitle>Yeni Yönetici Ekle</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label className="text-white">Ad Soyad</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Yöneticinin adı ve soyadı"
                          className={`pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 ${
                            errors.name ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-white">Görev/Unvan</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <Input
                          value={formData.position}
                          onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                          placeholder="Yöneticinin kulüpteki pozisyonu (Örn: Başkan)"
                          className={`pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 ${
                            errors.position ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      {errors.position && (
                        <p className="text-sm text-red-500">{errors.position}</p>
                      )}
                    </div>

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

                    <div className="grid gap-2">
                      <Label className="text-white">Telefon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <PhoneInput
                          value={formData.phone}
                          onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                          placeholder="Telefon numarası"
                          className={`pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 ${
                            errors.phone ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-white">Şifre</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="••••••"
                          className={`px-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 ${
                            errors.password ? 'border-red-500' : ''
                          }`}
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
                        <p className="text-sm text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="space-y-0.5">
                        <Label className="text-white">Ana Yönetici Yetkisi</Label>
                        <p className="text-sm text-zinc-400">
                          Tüm yönetici yetkilerine sahip olur
                        </p>
                      </div>
                      <Switch
                        checked={formData.isPrimaryManager}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, isPrimaryManager: checked }))
                        }
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          position: '',
                          password: '',
                          isPrimaryManager: false
                        });
                        setErrors({
                          name: '',
                          position: '',
                          email: '',
                          phone: '',
                          password: ''
                        });
                        setIsDialogOpen(false);
                      }}
                      className="bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-colors"
                    >
                      İptal
                    </Button>
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={handleAddManager}
                    >
                      Yöneticiyi Kaydet
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-2">
            {managers.map((manager) => (
              <div key={manager.id} 
                className="relative flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-lg group hover:bg-zinc-900 transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 shrink-0">
                  {manager.photo ? (
                    <Image
                      src={manager.photo}
                      alt={manager.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="text-lg font-semibold">{getInitials(manager.name)}</div>
                  )}
                </div>
                  
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium truncate">{manager.name}</span>
                    {manager.isPrimaryManager && (
                      <div className="flex items-center gap-1 text-xs text-blue-400 whitespace-nowrap">
                        <Shield size={14} />
                        <span>Ana Yönetici</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-zinc-400 truncate">{manager.email}</div>
                </div>

                <Button 
                  variant="ghost" 
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-opacity ml-auto shrink-0"
                  onClick={() => handleDeleteManager(manager.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>
        </main>
      </motion.div>
    </div>
  );
} 