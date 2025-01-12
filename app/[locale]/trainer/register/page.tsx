"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, Eye, EyeOff, Lock, Mail, AlertCircle, 
  User, Phone, Calendar, Plus, X, Upload
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import DatePicker from "@/components/ui/datePicker";
import { TrainerExpertise } from "@/types/trainer/trainer";

interface RegisterFormData {
  // Step 1
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2
  fullName: string;
  phone: string;
  birthDate: Date;
  expertise: TrainerExpertise[];
  experience: string;
  personalMessage: string;
  certificates: {
    name: string;
    institution: string;
    date: Date;
    file: File | null;
  }[];
  profileImage: File | null;
  
  // Consent fields
  privacyConsent: boolean;
  dataProcessingConsent: boolean;
}

export default function TrainerRegister() {
  const t = useTranslations('trainerRegister');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    // Step 1
    email: "",
    password: "",
    confirmPassword: "",
    
    // Step 2
    fullName: "",
    phone: "",
    birthDate: new Date(),
    expertise: [],
    experience: "",
    personalMessage: "",
    certificates: [],
    profileImage: null,
    
    // Consent fields
    privacyConsent: false,
    dataProcessingConsent: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCertDatePicker, setShowCertDatePicker] = useState<number | null>(null);
  const [expertiseInput, setExpertiseInput] = useState("");
  const [error, setError] = useState("");

  const handleAddExpertise = () => {
    if (expertiseInput.trim()) {
      const newExpertise: TrainerExpertise = {
        id: Date.now().toString(),
        trainerId: "temp", // Geçici ID
        name: expertiseInput.trim()
      };

      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise]
      }));
      setExpertiseInput("");
    }
  };

  const handleRemoveExpertise = (expertiseId: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(exp => exp.id !== expertiseId)
    }));
  };

  const handleAddCertificate = () => {
    setFormData(prev => ({
      ...prev,
      certificates: [...prev.certificates, {
        name: "",
        institution: "",
        date: new Date(),
        file: null
      }]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      // Step 1 validasyonları
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError(t('errors.fillAllFields'));
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError(t('errors.passwordMatch'));
        return;
      }

      if (formData.password.length < 6) {
        setError(t('errors.passwordLength'));
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError(t('errors.invalidEmail'));
        return;
      }

      setStep(2);
      return;
    }

    // Step 2 - Final submit
    if (!formData.privacyConsent || !formData.dataProcessingConsent) {
      setError(t('errors.consentRequired'));
      return;
    }

    try {
      // API çağrısı yapılabilir
      // const response = await fetch('/api/trainer/register', { ... });
      
      // Başarılı ise profil sayfasına yönlendir
      router.push('/trainer/profile');
    } catch (error) {
      console.error('Registration error:', error);
      setError(t('errors.unexpectedError'));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-24 px-4 flex items-center justify-center">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>
      </div>

      <div className={`relative container  ${step === 1 ? 'max-w-lg' : 'max-w-3xl'} mx-auto transition-all duration-300`}>
        {/* Top Bar */}
        <div className="absolute -top-16 w-full flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link 
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('backToHome')}</span>
            </Link>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm"
        >
          {/* Logo ve Başlık */}
          <div className="text-center mb-8">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={60}
              className="mx-auto hover:opacity-80 transition-opacity"
            />
            <h1 className="text-2xl font-bold text-white mt-6">
              {t(step === 1 ? 'step1.title' : 'step2.title')}
            </h1>
            <p className="text-zinc-400 mt-2">
              {t(step === 1 ? 'step1.subtitle' : 'step2.subtitle')}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-6 flex items-center gap-2 text-red-200">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              // Step 1 Form Fields
              <>
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-zinc-400 block">
                    {t('step1.email.label')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder={t('step1.email.placeholder')}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm text-zinc-400 block">
                    {t('step1.password.label')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder={t('step1.password.placeholder')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm text-zinc-400 block">
                    {t('step1.confirmPassword.label')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder={t('step1.confirmPassword.placeholder')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Step 2 Form Fields
              <>
                {/* Profil Fotoğrafı */}
                <div className="col-span-full">
                  <label className="text-white">{t('step2.profileImage')}</label>
                  <div className="mt-4">
                    <div className="relative w-40 h-40 mx-auto">
                      {formData.profileImage ? (
                        <div className="relative w-full h-full group">
                          <Image
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="Photo Preview"
                            fill
                            className="rounded-2xl object-cover border-2 border-zinc-800"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => setFormData(prev => ({ ...prev, profileImage: null }))}
                              className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="profileImage"
                          className="w-full h-full border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                          <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                          <span className="text-sm text-zinc-500">{t('step2.profileImage')}</span>
                          <input
                            type="file"
                            id="profileImage"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setFormData(prev => ({ ...prev, profileImage: file }));
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ad Soyad */}
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('step2.fullName.label')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder={t('step2.fullName.placeholder')}
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white"
                      required
                    />
                  </div>
                </div>

                {/* Phone ve Birth Date yan yana */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Telefon */}
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400 block">
                      {t('step2.phone.label')}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <input
                        type="tel"
                        placeholder={t('step2.phone.placeholder')}
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Doğum Tarihi */}
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400 block">
                      {t('step2.birthDate.label')}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.birthDate.toLocaleDateString()}
                        onClick={() => setShowDatePicker(true)}
                        readOnly
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white cursor-pointer"
                      />
                      {showDatePicker && (
                        <>
                          <div 
                            className="fixed inset-0" 
                            onClick={() => setShowDatePicker(false)} 
                          />
                          <div className="absolute z-50 mt-2">
                            <DatePicker
                              onDateSelect={(date) => {
                                setFormData(prev => ({ ...prev, birthDate: date }));
                                setShowDatePicker(false);
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Uzmanlık Alanları */}
                <div className="space-y-4">
                  <label className="text-sm text-zinc-400">
                    {t('step2.expertise.label')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.expertise.map((exp) => (
                      <div
                        key={exp.id}
                        className="group flex items-center gap-2 bg-zinc-800/50 text-zinc-100 px-3 py-1.5 rounded-lg text-sm border border-zinc-700"
                      >
                        <span>{exp.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExpertise(exp.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} className="text-zinc-400 hover:text-zinc-200" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={expertiseInput}
                      onChange={(e) => setExpertiseInput(e.target.value)}
                      className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-3 text-white"
                      placeholder={t('step2.expertise.placeholder')}
                    />
                    <button
                      type="button"
                      onClick={handleAddExpertise}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Plus size={16} />
                      {t('step2.expertise.add')}
                    </button>
                  </div>
                </div>

                {/* Deneyim */}
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('step2.experience.label')}
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-3 text-white min-h-[100px]"
                    placeholder={t('step2.experience.placeholder')}
                    required
                  />
                </div>

                {/* Kişisel Mesaj */}
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 block">
                    {t('step2.personalMessage.label')}
                  </label>
                  <textarea
                    value={formData.personalMessage}
                    onChange={(e) => setFormData(prev => ({ ...prev, personalMessage: e.target.value }))}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-3 text-white min-h-[100px]"
                    placeholder={t('step2.personalMessage.placeholder')}
                    required
                  />
                </div>

                {/* Sertifikalar */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-zinc-400">{t('step2.certificates.title')}</label>
                    <button
                      type="button"
                      onClick={handleAddCertificate}
                      className="text-sm text-blue-500 hover:text-blue-400"
                    >
                      + {t('step2.certificates.addNew')}
                    </button>
                  </div>
                  
                  {formData.certificates.map((cert, index) => (
                    <div key={index} className="space-y-4 p-4 bg-zinc-800/30 rounded-lg relative">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            certificates: prev.certificates.filter((_, i) => i !== index)
                          }))
                        }}
                        className="absolute right-2 top-2 p-1 hover:bg-zinc-700 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-zinc-400" />
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-zinc-400">{t('step2.certificates.name')}</label>
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
                          <label className="text-sm text-zinc-400">{t('step2.certificates.institution')}</label>
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
                          <label className="text-sm text-zinc-400">{t('step2.certificates.date')}</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cert.date.toLocaleDateString()}
                              onClick={() => setShowCertDatePicker(index)}
                              readOnly
                              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white cursor-pointer"
                            />
                            {showCertDatePicker === index && (
                              <>
                                <div 
                                  className="fixed inset-0 z-[60]" 
                                  onClick={() => setShowCertDatePicker(null)} 
                                />
                                <div className="absolute z-[70] mt-1 right-0">
                                  <DatePicker
                                    onDateSelect={(date) => {
                                      const newCerts = [...formData.certificates];
                                      newCerts[index].date = date;
                                      setFormData(prev => ({ ...prev, certificates: newCerts }));
                                      setShowCertDatePicker(null);
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-zinc-400">{t('step2.certificates.file')}</label>
                          <div className="relative">
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const newCerts = [...formData.certificates];
                                  newCerts[index].file = file;
                                  setFormData(prev => ({ ...prev, certificates: newCerts }));
                                }
                              }}
                              className="hidden"
                              id={`cert-file-${index}`}
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
                                  {t('step2.certificates.selectFile')}
                                </button>
                                <div className="flex-1 bg-zinc-800/50 border-y border-r border-zinc-700 rounded-r-lg py-1.5 px-3 text-zinc-400 truncate">
                                  {cert.file ? (
                                    <span className="text-white">{cert.file.name}</span>
                                  ) : (
                                    t('step2.certificates.noFile')
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
                                  className="text-zinc-400 hover:text-red-400 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Onay Kutuları */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={(e) => setFormData(prev => ({ ...prev, privacyConsent: e.target.checked }))}
                      className="w-4 h-4 rounded border-zinc-600 bg-zinc-800/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900"
                    />
                    <label htmlFor="privacyConsent" className="text-sm text-zinc-400">
                      {t('step2.consent.privacy')}
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="dataProcessingConsent"
                      checked={formData.dataProcessingConsent}
                      onChange={(e) => setFormData(prev => ({ ...prev, dataProcessingConsent: e.target.checked }))}
                      className="w-4 h-4 rounded border-zinc-600 bg-zinc-800/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900"
                    />
                    <label htmlFor="dataProcessingConsent" className="text-sm text-zinc-400">
                      {t('step2.consent.dataProcessing')}
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {step === 1 ? t('step1.continue') : t('step2.submit')}
            </motion.button>

            {/* Login Link - Sadece ilk adımda göster */}
            {step === 1 && (
              <p className="text-center text-zinc-400">
                {t('login.text')}{" "}
                <Link
                  href={`/${locale}/trainer/login`}
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                >
                  {t('login.link')}
                </Link>
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
} 