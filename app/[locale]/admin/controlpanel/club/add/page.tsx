"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Building2,
  Calendar,
  Mail,
  MapPin,
  Upload,
  Save,
  X,
  Image as ImageIcon,
  Phone,
  Globe,
  Plus
} from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TimePicker } from "@/components/ui/time-picker";
import { FaXTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa6";
import type { ClubFormData } from "@/types/club/club";

export default function AddClub() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [clubPhotos, setClubPhotos] = useState<string[]>([]);
  const [facilityPhotos, setFacilityPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState<ClubFormData>({
    logo: null,
    name: '',
    foundationYear: new Date().getFullYear(),
    type: 'recreational',
    primaryColor: '',
    secondaryColor: '',
    targetAudience: '',
    missionVision: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    googleMapsLink: '',
    twitterUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    workingHours: {
      monday: { open: "09:00", close: "22:00", isOpen: true },
      tuesday: { open: "09:00", close: "22:00", isOpen: true },
      wednesday: { open: "09:00", close: "22:00", isOpen: true },
      thursday: { open: "09:00", close: "22:00", isOpen: true },
      friday: { open: "09:00", close: "22:00", isOpen: true },
      saturday: { open: "10:00", close: "20:00", isOpen: true },
      sunday: { open: "10:00", close: "18:00", isOpen: true }
    },
    clubPhotos: [],
    facilityPhotos: [],
    hasIndoorGym: false,
    hasLockerRoom: false,
    hasCafe: false,
    lockerRoomPhotos: [],
    trainingLocations: [],
    competitions: [],
    achievements: [],
    socialProjects: []
  });
  const [clubColors, setClubColors] = useState({ primary: '', secondary: '' });
  const [targetAudience, setTargetAudience] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [lockerRoomPhotos, setLockerRoomPhotos] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState('');
  const [competitions, setCompetitions] = useState<string[]>([]);
  const [newCompetition, setNewCompetition] = useState('');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState('');
  const [projects, setProjects] = useState<string[]>([]);
  const [newProject, setNewProject] = useState('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'club' | 'facility') => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (type === 'club') {
            setClubPhotos(prev => [...prev, reader.result as string]);
          } else {
            setFacilityPhotos(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleWorkingHourChange = (
    day: keyof typeof formData.workingHours,
    field: keyof typeof formData.workingHours[keyof typeof formData.workingHours],
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleLockerRoomPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLockerRoomPhotos(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddLocation = () => {
    if (newLocation.trim()) {
      setLocations(prev => [...prev, newLocation.trim()]);
      setNewLocation('');
    }
  };

  const handleAddCompetition = () => {
    if (newCompetition.trim()) {
      setCompetitions(prev => [...prev, newCompetition.trim()]);
      setNewCompetition('');
    }
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements(prev => [...prev, newAchievement.trim()]);
      setNewAchievement('');
    }
  };

  const handleAddProject = () => {
    if (newProject.trim()) {
      setProjects(prev => [...prev, newProject.trim()]);
      setNewProject('');
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
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0 relative">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-gradient-to-b from-white via-white/50 to-transparent rounded-full" />
              <div className="flex-1">
                <h1 className="text-lg md:text-xl font-semibold text-white">Yeni Kulüp Ekle</h1>
                <p className="text-xs md:text-sm text-zinc-400 mt-0.5">Yeni bir spor kulübü kaydı oluşturun</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {/* 1. Temel Bilgiler */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">1. Kulüp Temel Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div className="col-span-full">
                  <Label className="text-white">Kulüp Logo & Amblem</Label>
                  <div className="mt-4">
                    <div className="relative w-40 h-40 mx-auto">
                      {logoPreview ? (
                        <div className="relative w-full h-full group">
                          <Image
                            src={logoPreview}
                            alt="Logo Preview"
                            fill
                            className="rounded-2xl object-cover border-2 border-zinc-800"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => setLogoPreview(null)}
                              className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="logo"
                          className="w-full h-full border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                          <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                          <span className="text-sm text-zinc-500">Logo Seç</span>
                          <input
                            type="file"
                            id="logo"
                            className="hidden"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Kulüp Adı */}
                <div className="col-span-full">
                  <Label className="text-white">Kulüp Adı</Label>
                  <div className="relative mt-2">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="Kulübün tam adını girin"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                {/* Kuruluş Yılı */}
                <div>
                  <Label className="text-white">Kuruluş Yılı</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      type="number"
                      placeholder="YYYY"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                {/* Kulüp Türü */}
                <div>
                  <Label className="text-white">Kulüp Türü</Label>
                  <Select>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                      <SelectValue placeholder="Kulüp türünü seçin" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-zinc-800 border-zinc-700"
                      position="popper"
                      sideOffset={5}
                    >
                      <SelectItem 
                        value="recreational" 
                        className="text-zinc-100 hover:bg-zinc-700 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Rekreatif
                      </SelectItem>
                      <SelectItem 
                        value="competitive" 
                        className="text-zinc-100 hover:bg-zinc-700 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        Yarış Odaklı
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Kulüp Renkleri */}
                <div className="col-span-full md:col-span-2">
                  <Label className="text-white">Kulüp Renkleri</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={clubColors.primary}
                        onChange={(e) => setClubColors(prev => ({ ...prev, primary: e.target.value }))}
                        placeholder="Ana Renk"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={clubColors.secondary}
                        onChange={(e) => setClubColors(prev => ({ ...prev, secondary: e.target.value }))}
                        placeholder="İkincil Renk"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Hedef Kitle */}
                <div className="col-span-full">
                  <Label className="text-white">Hedef Kitle</Label>
                  <Textarea 
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="Kulübün hedef kitlesini açıklayın"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    rows={3}
                  />
                </div>

                {/* Misyon & Vizyon */}
                <div className="col-span-full">
                  <Label className="text-white">Kulübün Misyon ve Vizyonu</Label>
                  <Textarea 
                    placeholder="Kulübün misyon ve vizyonunu açıklayın"
                    className="mt-2 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    rows={4}
                  />
                </div>

                {/* Kulüp Fotoğrafları */}
                <div className="col-span-full">
                  <Label className="text-white">Kulüp Fotoğrafları (Max 5)</Label>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="aspect-[4/3]">
                        {clubPhotos[index] ? (
                          <div className="relative w-full h-full group">
                            <Image
                              src={clubPhotos[index]}
                              alt={`Club Photo ${index + 1}`}
                              fill
                              className="rounded-xl object-cover border-2 border-zinc-800"
                            />
                            <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                onClick={() => {
                                  const newPhotos = [...clubPhotos];
                                  newPhotos.splice(index, 1);
                                  setClubPhotos(newPhotos);
                                }}
                                className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label
                            htmlFor={`club-photo-${index}`}
                            className="w-full h-full border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors"
                          >
                            <ImageIcon className="w-6 h-6 text-zinc-500 mb-2" />
                            <span className="text-xs text-zinc-500">Fotoğraf Ekle</span>
                            <input
                              type="file"
                              id={`club-photo-${index}`}
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handlePhotosChange(e, 'club')}
                              disabled={clubPhotos.length >= 5}
                            />
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* 2. İletişim ve Lokasyon Bilgileri */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">2. İletişim ve Lokasyon Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Adres */}
                <div className="col-span-full">
                  <Label className="text-white">Adres</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-3 text-zinc-400" size={20} />
                    <Textarea 
                      placeholder="Kulübün açık adresini girin"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <Label className="text-white">Telefon Numarası</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                      placeholder="Kulübün telefon numarasını girin"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label className="text-white">E-posta Adresi</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      type="email"
                      placeholder="ornek@email.com"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <Label className="text-white">Web Sitesi</Label>
                  <div className="relative mt-2">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      placeholder="www.website.com"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                {/* Sosyal Medya */}
                <div className="col-span-full">
                  <Label className="text-white">Sosyal Medya Hesapları</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div className="relative">
                      <FaFacebook className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                      <Input
                        placeholder="Facebook kullanıcı adı"
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                    <div className="relative">
                      <FaInstagram className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                      <Input
                        placeholder="Instagram kullanıcı adı"
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                    <div className="relative">
                      <FaXTwitter className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                      <Input
                        placeholder="Twitter kullanıcı adı"
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                    <div className="relative">
                      <FaYoutube className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                      <Input
                        placeholder="Youtube kullanıcı adı"
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Google Maps Linki */}
                <div>
                  <Label className="text-white">Haritada Göster</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <Input
                      value={googleMapsLink}
                      onChange={(e) => setGoogleMapsLink(e.target.value)}
                      placeholder="Google Maps linkini yapıştırın"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                    {googleMapsLink && (
                      <a 
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Git
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* 3. Kulüp Faaliyetleri ve Hedef Kitle */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">3. Kulüp Faaliyetleri ve Hedef Kitle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hedef Yaş Kategorisi */}
                <div>
                  <Label className="text-white">Hedef Yaş Kategorisi</Label>
                  <div className="space-y-3 mt-4">
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="age-12-18" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">12 - 18 Yaş</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="age-18-27" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">18 - 27 Yaş</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="age-27plus" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">27 Yaş Üstü (Masterlar)</span>
                    </label>
                  </div>
                </div>

                {/* Kullanıcı Tipi */}
                <div>
                  <Label className="text-white">Kullanıcı Tipi</Label>
                  <div className="space-y-3 mt-4">
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="type-individual" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Bireysel</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="type-school" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Lise ve Üniversite</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="type-corporate" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Kurumsal</span>
                    </label>
                  </div>
                </div>

                {/* Eğitim ve Yarış Düzeyi */}
                <div>
                  <Label className="text-white">Eğitim ve Yarış Düzeyi</Label>
                  <div className="space-y-3 mt-4">
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="level-basic" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Temel Eğitim</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="level-training" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Antrenman</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="level-racing" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Yarışçılık</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="level-hobby" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Hobi Amaçlı</span>
                    </label>
                  </div>
                </div>

                {/* Kullanılan Tekne Sınıfları */}
                <div>
                  <Label className="text-white">Kullanılan Tekne Sınıfları</Label>
                  <div className="space-y-3 mt-4">
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="boat-sea" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Deniz Küreği</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        id="boat-classic" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Klasik Kürek</span>
                    </label>
                  </div>
                </div>

                {/* Çalışma Günleri ve Saatleri */}
                <div className="col-span-full">
                  <Label className="text-white">Çalışma Günleri ve Saatleri</Label>
                  <p className="text-xs text-zinc-500 mt-1 lg:hidden">
                    Tüm saatleri görmek ve Açık/Kapalı durumları için sağa kaydırın →
                  </p>
                  <div className="mt-4 overflow-x-auto lg:overflow-visible">
                    <div className="min-w-[600px] lg:min-w-0 grid grid-cols-1 lg:grid-cols-1 gap-4">
                      {Object.entries(formData.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="w-28">
                            <span className="text-zinc-200">
                              {day === 'monday' && 'Pazartesi'}
                              {day === 'tuesday' && 'Salı'}
                              {day === 'wednesday' && 'Çarşamba'}
                              {day === 'thursday' && 'Perşembe'}
                              {day === 'friday' && 'Cuma'}
                              {day === 'saturday' && 'Cumartesi'}
                              {day === 'sunday' && 'Pazar'}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <TimePicker
                              value={hours.open}
                              onChange={(value) => handleWorkingHourChange(
                                day as keyof typeof formData.workingHours,
                                'open',
                                value
                              )}
                              className="w-32"
                              disabled={!hours.isOpen}
                            />
                            <span className="text-zinc-400">-</span>
                            <TimePicker
                              value={hours.close}
                              onChange={(value) => handleWorkingHourChange(
                                day as keyof typeof formData.workingHours,
                                'close',
                                value
                              )}
                              className="w-32"
                              disabled={!hours.isOpen}
                            />
                          </div>

                          <div className="flex items-center gap-2 ml-auto">
                            <span className="text-zinc-400 text-sm w-14 text-right">
                              {hours.isOpen ? 'Açık' : 'Kapalı'}
                            </span>
                            <Switch
                              checked={hours.isOpen}
                              onCheckedChange={(checked) => handleWorkingHourChange(
                                day as keyof typeof formData.workingHours,
                                'isOpen',
                                checked
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 4. Tesis Bilgileri */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">4. Tesis Bilgileri</h2>
              <div className="grid grid-cols-1 gap-6">
                {/* Tesis Fotoğrafları */}
                <div>
                  <Label className="text-white">Tesis Fotoğrafları</Label>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="aspect-[4/3]">
                        {facilityPhotos[index] ? (
                          <div className="relative w-full h-full group">
                            <Image
                              src={facilityPhotos[index]}
                              alt={`Facility Photo ${index + 1}`}
                              fill
                              className="rounded-xl object-cover border-2 border-zinc-800"
                            />
                            <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                onClick={() => {
                                  const newPhotos = [...facilityPhotos];
                                  newPhotos.splice(index, 1);
                                  setFacilityPhotos(newPhotos);
                                }}
                                className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label
                            htmlFor={`facility-photo-${index}`}
                            className="w-full h-full border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors"
                          >
                            <ImageIcon className="w-6 h-6 text-zinc-500 mb-2" />
                            <span className="text-xs text-zinc-500">Fotoğraf Ekle</span>
                            <input
                              type="file"
                              id={`facility-photo-${index}`}
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handlePhotosChange(e, 'facility')}
                              disabled={facilityPhotos.length >= 4}
                            />
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tesis Özellikleri */}
                <div>
                  <Label className="text-white">Tesis Özellikleri</Label>
                  <div className="space-y-3 mt-4">
                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Kapalı Spor Salonu</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        checked={formData.hasLockerRoom}
                        onChange={(e) => setFormData(prev => ({ ...prev, hasLockerRoom: e.target.checked }))}
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Duş ve Soyunma Odası</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-zinc-700 text-blue-500 focus:ring-offset-0 focus:ring-0 bg-zinc-700" 
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">Cafe</span>
                    </label>
                  </div>
                </div>

                {/* Duş ve Soyunma Odası Fotoğrafları - Koşullu Gösterim */}
                {formData.hasLockerRoom && (
                  <div>
                    <Label className="text-white">Duş ve Soyunma Odası Fotoğrafları</Label>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {[...Array(2)].map((_, index) => (
                        <div key={index} className="relative">
                          <label
                            htmlFor={`locker-room-photo-${index}`}
                            className="block aspect-[4/3] border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors"
                          >
                              {lockerRoomPhotos[index] ? (
                                <div className="relative w-full h-full group">
                                  <Image
                                    src={lockerRoomPhotos[index]}
                                    alt={`Locker Room Photo ${index + 1}`}
                                    fill
                                  className="rounded-xl object-cover"
                                  />
                                <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        const newPhotos = [...lockerRoomPhotos];
                                        newPhotos.splice(index, 1);
                                        setLockerRoomPhotos(newPhotos);
                                      }}
                                      className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white"
                                    >
                                      <X size={20} />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                              <div className="h-full flex flex-col items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-zinc-500 mb-2" />
                                  <span className="text-xs text-zinc-500">Fotoğraf Ekle</span>
                                </div>
                              )}
                            <input
                              type="file"
                              id={`locker-room-photo-${index}`}
                              className="hidden"
                              accept="image/*"
                              onChange={handleLockerRoomPhotosChange}
                              disabled={lockerRoomPhotos.length >= 2}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* 5. Teknik ve Organizasyon Bilgileri */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">5. Teknik ve Organizasyon Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Antrenman Lokasyonu */}
                <div className="col-span-full">
                  <Label className="text-white">Antrenman Lokasyonları</Label>
                  <div className="space-y-4 mt-4">
                    <div className="flex gap-2">
                      <Input
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddLocation();
                          }
                        }}
                        placeholder="Yeni lokasyon ekle"
                        className="flex-1 bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-500 text-zinc-100"
                      />
                      <Button
                        onClick={handleAddLocation}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Plus size={16} className="mr-2" />
                        Ekle
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {locations.map((location, index) => (
                        <div
                          key={index}
                          className="group flex items-center gap-2 bg-zinc-800/50 text-zinc-100 px-3 py-1.5 rounded-lg text-sm border border-zinc-700"
                        >
                          <span>{location}</span>
                          <button
                            onClick={() => setLocations(prev => prev.filter((_, i) => i !== index))}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} className="text-zinc-400 hover:text-zinc-200" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 6. Kulüp Başarıları ve Öne Çıkan Özellikler */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">6. Kulüp Başarıları ve Öne Çıkan Özellikler</h2>
              <div className="grid grid-cols-1 gap-6">
                {/* Katıldığı Yarışlar */}
                <div>
                  <Label className="text-white">Kulübün Katıldığı Yarışlar</Label>
                  <div className="space-y-4 mt-4">
                    <div className="flex gap-2">
                      <Input
                        value={newCompetition}
                        onChange={(e) => setNewCompetition(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddCompetition();
                          }
                        }}
                        placeholder="Yeni yarış ekle"
                        className="flex-1 bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-500 text-zinc-100"
                      />
                      <Button
                        onClick={handleAddCompetition}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Plus size={16} className="mr-2" />
                        Ekle
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {competitions.map((competition, index) => (
                        <div
                          key={index}
                          className="group flex items-center gap-2 bg-zinc-800/50 text-zinc-100 px-3 py-1.5 rounded-lg text-sm border border-zinc-700"
                        >
                          <span>{competition}</span>
                          <button
                            onClick={() => setCompetitions(prev => prev.filter((_, i) => i !== index))}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} className="text-zinc-400 hover:text-zinc-200" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kazanılan Ödüller ve Başarılar */}
                <div>
                  <Label className="text-white">Kazanılan Ödüller ve Başarılar</Label>
                  <div className="space-y-4 mt-4">
                    <div className="flex gap-2">
                      <Input
                        value={newAchievement}
                        onChange={(e) => setNewAchievement(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddAchievement();
                          }
                        }}
                        placeholder="Yeni başarı ekle"
                        className="flex-1 bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-500 text-zinc-100"
                      />
                      <Button
                        onClick={handleAddAchievement}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Plus size={16} className="mr-2" />
                        Ekle
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="group flex items-center gap-2 bg-zinc-800/50 text-zinc-100 px-3 py-1.5 rounded-lg text-sm border border-zinc-700"
                        >
                          <span>{achievement}</span>
                          <button
                            onClick={() => setAchievements(prev => prev.filter((_, i) => i !== index))}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} className="text-zinc-400 hover:text-zinc-200" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sosyal Sorumluluk Projeleri */}
                <div>
                  <Label className="text-white">Sosyal Sorumluluk Projeleri</Label>
                  <div className="space-y-4 mt-4">
                    <div className="flex gap-2">
                      <Input
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddProject();
                          }
                        }}
                        placeholder="Yeni proje ekle"
                        className="flex-1 bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-500 text-zinc-100"
                      />
                      <Button
                        onClick={handleAddProject}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Plus size={16} className="mr-2" />
                        Ekle
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {projects.map((project, index) => (
                        <div
                          key={index}
                          className="group flex items-center gap-2 bg-zinc-800/50 text-zinc-100 px-3 py-1.5 rounded-lg text-sm border border-zinc-700"
                        >
                          <span>{project}</span>
                          <button
                            onClick={() => setProjects(prev => prev.filter((_, i) => i !== index))}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} className="text-zinc-400 hover:text-zinc-200" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Form Submit Buttons */}
            <div className="flex items-center justify-end gap-4 mt-8">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Kulübü Kaydet
              </Button>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}