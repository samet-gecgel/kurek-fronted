"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, MapPin, Heart, Briefcase, UserPlus, Upload, Instagram } from "lucide-react";
import Image from "next/image";
import DatePicker from "@/components/ui/datePicker";
import { useTranslations } from 'next-intl';
import { LanguageSelector } from "@/components/language-selector";

interface UserProfile {
  fullName: string;
  tcNo: string;
  phone: string;
  birthDate: Date;
  birthPlace: string;
  bloodType: string;
  canSwim: boolean;
  occupation: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  photoUrl: string | null;
  registrationType: "individual" | "student" | "corporate";
  sharePhotos: boolean;
  instagramHandle: string;
}

export default function RegisterDetails() {
  const t = useTranslations('auth.registerDetails');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState<UserProfile>({
    fullName: "",
    tcNo: "",
    phone: "",
    birthDate: new Date(),
    birthPlace: "",
    bloodType: "",
    canSwim: false,
    occupation: "",
    emergencyContact: {
      name: "",
      phone: "",
      relation: ""
    },
    photoUrl: null,
    registrationType: "individual",
    sharePhotos: false,
    instagramHandle: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Kayıt tamamlanıyor:", formData);
    // Kayıt işlemleri ve yönlendirme
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'tcNo') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 11) {
        setFormData(prev => ({ ...prev, tcNo: numericValue }));
      }
      return;
    }

    if (name === 'phone' || name === 'emergencyContact.phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (name === 'phone') {
        setFormData(prev => ({ ...prev, phone: numericValue }));
      } else {
        setFormData(prev => ({
          ...prev,
          emergencyContact: {
            ...prev.emergencyContact,
            phone: numericValue
          }
        }));
      }
      return;
    }

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UserProfile] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      if (name === 'canSwim') {
        setFormData(prev => ({
          ...prev,
          canSwim: value === 'true'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Lütfen bir resim dosyası seçin');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan küçük olmalıdır');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, photoUrl: imageUrl }));
    }
  };

  const handleDateSelect = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      birthDate: date
    }));
    setShowDatePicker(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <LanguageSelector />
          </motion.div>
        </div>

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
            {t('title')}
          </h1>
          <p className="text-zinc-400 text-center mb-8">
            {t('description')}
          </p>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
              <label
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 hover:border-blue-500 transition-colors"
              >
                {formData.photoUrl ? (
                  <div className="w-32 h-32 relative">
                    <Image
                      src={formData.photoUrl}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-zinc-400" />
                    <span className="text-sm text-zinc-400 mt-2">
                      {t('profileImage.label')}
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Temel Bilgiler */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">
                {t('basicInfo.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('basicInfo.fullName')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('basicInfo.tcNo')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="tcNo"
                      value={formData.tcNo}
                      onChange={handleChange}
                      maxLength={11}
                      pattern="\d{11}"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('basicInfo.phone')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                      pattern="\d{10}"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Kişisel Bilgiler */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">
                {t('personalInfo.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('personalInfo.birthDate')}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="text"
                      value={formData.birthDate.toLocaleDateString('tr-TR')}
                      onClick={() => setShowDatePicker(true)}
                      readOnly
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white cursor-pointer focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {showDatePicker && (
                      <div 
                        ref={datePickerRef}
                        className="absolute z-50 mt-1"
                      >
                        <DatePicker onDateSelect={handleDateSelect} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('personalInfo.birthPlace')}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('personalInfo.bloodType.label')}
                  </label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full appearance-none bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="" className="bg-zinc-800">
                        {t('personalInfo.bloodType.select')}
                      </option>
                      <option value="A+" className="bg-zinc-800">A+</option>
                      <option value="A-" className="bg-zinc-800">A-</option>
                      <option value="B+" className="bg-zinc-800">B+</option>
                      <option value="B-" className="bg-zinc-800">B-</option>
                      <option value="AB+" className="bg-zinc-800">AB+</option>
                      <option value="AB-" className="bg-zinc-800">AB-</option>
                      <option value="0+" className="bg-zinc-800">0+</option>
                      <option value="0-" className="bg-zinc-800">0-</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('personalInfo.occupation')}
                  </label>
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

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('personalInfo.canSwim.label')}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="canSwim"
                        value="true"
                        checked={formData.canSwim === true}
                        onChange={handleChange}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-white">{t('personalInfo.canSwim.yes')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="canSwim"
                        value="false"
                        checked={formData.canSwim === false}
                        onChange={handleChange}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-white">{t('personalInfo.canSwim.no')}</span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col md:flex-row items-start justify-between md:items-center gap-6 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="sharePhotos"
                        checked={formData.sharePhotos}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                    <span className="text-sm text-zinc-400">
                      {t('photoConsent.label')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Instagram className="h-4 w-4 text-zinc-500" />
                      </div>
                      <input
                        type="text"
                        name="instagramHandle"
                        value={formData.instagramHandle}
                        onChange={handleChange}
                        className={`w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors ${!formData.sharePhotos ? 'opacity-50' : ''}`}
                        placeholder="@kullaniciadi"
                        disabled={!formData.sharePhotos}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acil Durum İletişim */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">
                {t('emergency.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('emergency.name')}
                  </label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="text"
                      name="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('emergency.phone')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="tel"
                      name="emergencyContact.phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleChange}
                      maxLength={10}
                      pattern="\d{10}"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('emergency.relation')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="emergencyContact.relation"
                      value={formData.emergencyContact.relation}
                      onChange={handleChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Kayıt Şekli */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">
                {t('registrationType.title')}
              </h3>
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
                  <span className="text-white">{t('registrationType.individual')}</span>
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
                  <span className="text-white">{t('registrationType.student')}</span>
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
                  <span className="text-white">{t('registrationType.corporate')}</span>
                </label>
              </div>
            </div>

           

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {t('submit')}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 