"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Camera, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslations } from 'next-intl';
import { PhoneInput } from "@/components/ui/phone-input";
import { TimePicker } from "@/components/ui/time-picker";

interface WorkingHours {
  open: string;
  close: string;
  isOpen: boolean;
}

interface ClubDetails {
  logo: string | null;
  name: string;
  phone: string;
  address: string;
  description: string;
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
  };
  workingHours: {
    monday: WorkingHours;
    tuesday: WorkingHours;
    wednesday: WorkingHours;
    thursday: WorkingHours;
    friday: WorkingHours;
    saturday: WorkingHours;
    sunday: WorkingHours;
  };
}

export default function ClubRegisterPage() {
  const t = useTranslations('clubRegister');
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showNextStep, setShowNextStep] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<ClubDetails>({
    logo: null,
    name: "",
    phone: "",
    address: "",
    description: "",
    social: {
      instagram: "",
      facebook: "",
      youtube: "",
      twitter: ""
    },
    workingHours: {
      monday: { open: "00:00", close: "23:00", isOpen: true },
      tuesday: { open: "00:00", close: "23:00", isOpen: true },
      wednesday: { open: "00:00", close: "23:00", isOpen: true },
      thursday: { open: "00:00", close: "23:00", isOpen: true },
      friday: { open: "00:00", close: "23:00", isOpen: true },
      saturday: { open: "00:00", close: "23:00", isOpen: true },
      sunday: { open: "00:00", close: "23:00", isOpen: true }
    }
  });

  useEffect(() => {
    // Hoşgeldiniz mesajını göster
    setTimeout(() => {
      setShowWelcome(false);
      // Hoşgeldiniz mesajı kaybolunca, "Şimdi kulübünüzü oluşturalım" mesajını göster
      setTimeout(() => {
        setShowNextStep(true);
        // 2 saniye sonra bu mesaj da kaybolsun ve form görünsün
        setTimeout(() => {
          setShowNextStep(false);
          setShowForm(true);
        }, 2000);
      }, 500);
    }, 2000);
  }, []);

  // Giriş animasyonu
  const welcomeAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Burada API çağrısı ve kayıt işlemleri yapılabilir
    // try {
    //   await registerClub(formData);
    // } catch (error) {
    //   console.error('Kayıt hatası:', error);
    //   return;
    // }

    // Başarılı kayıt sonrası dashboard'a yönlendir
    router.push('/club-manager/dashboard');
  };

  // Çalışma saati değiştirme fonksiyonu
  const handleWorkingHourChange = (
    day: keyof ClubDetails['workingHours'],
    field: keyof WorkingHours,
    value: string | boolean
  ) => {
    setFormData({
      ...formData,
      workingHours: {
        ...formData.workingHours,
        [day]: {
          ...formData.workingHours[day],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-poppins">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            {...welcomeAnimation}
            className="fixed inset-0 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm z-50"
          >
            <motion.h2 className="text-4xl font-bold text-zinc-100">
              {t('welcome')}
            </motion.h2>
          </motion.div>
        )}

        {showNextStep && (
          <motion.div
            {...welcomeAnimation}
            className="fixed inset-0 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm z-50"
          >
            <motion.h2 className="text-4xl font-bold text-zinc-100">
              {t('letsCreate')}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form içeriği */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container max-w-2xl mx-auto py-12 px-4"
          >
            {/* Background Effect */}
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm relative"
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-zinc-100 mb-2">{t('title')}</h1>
                <p className="text-zinc-400 font-light">{t('subtitle')}</p>
              </div>


              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Logo Upload */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setFormData({ ...formData, logo: imageUrl });
                        }
                      }}
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer flex flex-col items-center justify-center w-48 h-32 rounded-xl bg-zinc-800 border-2 border-dashed border-zinc-600 hover:border-blue-500 transition-colors"
                    >
                      {formData.logo ? (
                        <div className="w-48 h-32 relative">
                          <Image
                            src={formData.logo}
                            alt="Club Logo"
                            fill
                            className="rounded-xl object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-zinc-400" />
                          <span className="text-sm text-zinc-400 mt-2">
                            {t('form.logo.upload')}
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Temel Bilgiler */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-zinc-300 block mb-2">
                      {t('form.name')}
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700/50 text-zinc-100 font-light"
                      placeholder="İstanbul Kürek"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('form.phone')}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <PhoneInput
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('form.address')}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                      <Textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white min-h-[100px]"
                        placeholder="İstanbul, Türkiye"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-400 block mb-2">
                      {t('form.description.label')}
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700/50 text-white min-h-[100px]"
                      placeholder={t('form.description.placeholder')}
                    />
                  </div>
                </div>

                {/* Sosyal Medya */}
                <div>
                  <h3 className="text-lg font-medium text-zinc-100 mb-4">
                    {t('form.social.title')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <Input
                        value={formData.social.instagram}
                        onChange={(e) => setFormData({
                          ...formData,
                          social: { ...formData.social, instagram: e.target.value }
                        })}
                        className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white"
                        placeholder="@username"
                      />
                    </div>

                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <Input
                        value={formData.social.facebook}
                        onChange={(e) => setFormData({
                          ...formData,
                          social: { ...formData.social, facebook: e.target.value }
                        })}
                        className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white"
                        placeholder="username"
                      />
                    </div>

                    <div className="relative">
                      <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <Input
                        value={formData.social.youtube}
                        onChange={(e) => setFormData({
                          ...formData,
                          social: { ...formData.social, youtube: e.target.value }
                        })}
                        className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white"
                        placeholder="channel-name"
                      />
                    </div>

                    <div className="relative">
                      <FaXTwitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <Input
                        value={formData.social.twitter}
                        onChange={(e) => setFormData({
                          ...formData,
                          social: { ...formData.social, twitter: e.target.value }
                        })}
                        className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white"
                        placeholder="@username"
                      />
                    </div>
                  </div>
                </div>

                {/* Çalışma Saatleri */}
                <div>
                  <h3 className="text-lg font-medium text-zinc-100 mb-4">
                    {t('form.workingHours.title')}
                  </h3>
                  <div className="space-y-3 bg-zinc-800/30 rounded-xl p-4">
                    {Object.entries(formData.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-28">
                          <span className="text-zinc-300">
                            {t(`form.workingHours.days.${day}`)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <TimePicker
                            value={hours.open}
                            onChange={(value) => handleWorkingHourChange(
                              day as keyof ClubDetails['workingHours'],
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
                              day as keyof ClubDetails['workingHours'],
                              'close',
                              value
                            )}
                            className="w-32"
                            disabled={!hours.isOpen}
                          />
                        </div>

                        <div className="flex items-center gap-2 ml-auto">
                          <input
                            type="checkbox"
                            checked={hours.isOpen}
                            onChange={(e) => handleWorkingHourChange(
                              day as keyof ClubDetails['workingHours'],
                              'isOpen',
                              e.target.checked
                            )}
                            className="w-4 h-4 rounded border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-zinc-400 text-sm">
                            {t('form.workingHours.status')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-zinc-100 py-6 rounded-lg transition-all duration-200 font-medium"
                >
                  {t('submit')}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 