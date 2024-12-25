"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, Medal, Briefcase, FileText, Upload, X } from "lucide-react";
import Image from "next/image";
import DatePicker from "@/components/ui/datePicker";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/language-selector";

export default function TrainerRegisterDetails() {
  const t = useTranslations('trainerRegisterDetails');

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Sadece sayıları al
    if (value.length <= 10) { // Maksimum 10 karakter
      setFormData(prev => ({
        ...prev,
        phone: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      {/* Top Bar */}
      <div className="container max-w-2xl mx-auto mb-8">
        <div className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <LanguageSelector />
          </motion.div>
        </div>
      </div>

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
            {t('title')}
          </h1>
          <p className="text-zinc-400 text-center mb-8">
            {t('subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profil Resmi */}
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
                      <span className="text-sm text-zinc-400 mt-2">{t('form.profileImage.label')}</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ad Soyad */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">{t('form.basicInfo.fullName')}</label>
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
                <label className="text-sm text-zinc-400 block">{t('form.basicInfo.phone')}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="5XX XXX XXXX"
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                {formData.phone && formData.phone.length < 10 && (
                  <p className="text-red-400 text-sm mt-1">
                    {t('form.basicInfo.phoneError', { defaultValue: 'Telefon numarası 10 haneli olmalıdır' })}
                  </p>
                )}
              </div>

              {/* Doğum Tarihi */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 block">{t('form.basicInfo.birthDate')}</label>
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

            {/* Uzmanlık Alanı */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">{t('form.specialization.label')}</label>
              <div className="relative">
                <Medal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder={t('form.specialization.placeholder')}
                  required
                />
              </div>
            </div>

            {/* Deneyim */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">{t('form.experience.label')}</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder={t('form.experience.placeholder')}
                  required
                />
              </div>
            </div>

            {/* Kişisel Mesaj */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 block">{t('form.personalMessage.label')}</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                <textarea
                  name="personalMessage"
                  value={formData.personalMessage}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder={t('form.personalMessage.placeholder')}
                  required
                />
              </div>
            </div>

            {/* Sertifikalar */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm text-zinc-400">{t('form.certificates.title')}</label>
                <button
                  type="button"
                  onClick={handleAddCertificate}
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  + {t('form.certificates.addNew')}
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
                      <label className="text-sm text-zinc-400">{t('form.certificates.name')}</label>
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
                      <label className="text-sm text-zinc-400">{t('form.certificates.institution')}</label>
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
                      <label className="text-sm text-zinc-400">{t('form.certificates.date')}</label>
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
                      <label className="text-sm text-zinc-400">{t('form.certificates.file')}</label>
                      <div className="relative">
                        <input
                          type="file"
                          id={`cert-file-${index}`}
                          onChange={(e) => {
                            const newCerts = [...formData.certificates];
                            newCerts[index].file = e.target.files?.[0] || null;
                            setFormData(prev => ({ ...prev, certificates: newCerts }));
                          }}
                          className="hidden"
                        />
                        <label
                          htmlFor={`cert-file-${index}`}
                          className="flex items-center gap-2 w-full text-sm"
                        >
                          <div className="flex-1 flex items-center">
                            <button
                              type="button"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-l-lg transition-colors flex items-center gap-1.5"
                              onClick={() => document.getElementById(`cert-file-${index}`)?.click()}
                            >
                              <Upload className="w-3.5 h-3.5" />
                              {t('form.certificates.selectFile')}
                            </button>
                            <div className="flex-1 bg-zinc-800/50 border-y border-r border-zinc-700 rounded-r-lg py-1.5 px-3 text-zinc-400 truncate">
                              {cert.file ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-zinc-400">{t('form.certificates.selected')}</span>
                                  <span className="text-white truncate">{cert.file.name}</span>
                                </div>
                              ) : (
                                <span>{t('form.certificates.noFileSelected')}</span>
                              )}
                            </div>
                          </div>
                          {cert.file && (
                            <button
                              type="button"
                              onClick={() => {
                                const newCerts = [...formData.certificates];
                                newCerts[index].file = null;
                                setFormData(prev => ({ ...prev, certificates: newCerts }));
                              }}
                              className="text-zinc-400 hover:text-red-400 transition-colors p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </label>
                      </div>
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
                <span className="text-zinc-400">{t('form.consent.privacy')}</span>
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
                <span className="text-zinc-400">{t('form.consent.dataProcessing')}</span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {t('form.submit')}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 