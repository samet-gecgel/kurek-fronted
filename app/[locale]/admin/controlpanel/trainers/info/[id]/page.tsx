"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, FileText, Award, BookOpen, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

// Örnek veri
const trainerData = {
  fullName: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  phone: "+90 555 123 4567",
  birthDate: "1 Ocak 1990",
  photo: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
  specializations: ["Olimpik Kürek", "Kıyı Küregi", "Salon Küregi", "Fitness", "Yüzme"],
  experience: "10 yıllık kürek antrenörlüğü deneyimi. Ulusal ve uluslararası yarışmalarda başarılı sporcular yetiştirdim. Olimpiyat hazırlık kamplarında görev aldım.",
  bio: "Kürek sporunda uzmanlaşmış, deneyimli bir antrenör. Sporcularımın hem fiziksel hem mental gelişimlerine odaklanıyorum. Takım ruhu ve disiplinli çalışmayı ön planda tutuyorum.",
  certificates: [
    {
      name: "Level 1 Antrenörlük",
      institution: "Türkiye Kürek Federasyonu",
      date: "1 Ocak 2020",
      file: "/certificates/level1.pdf"
    },
    {
      name: "Spor Fizyolojisi Sertifikası",
      institution: "Spor Bilimleri Enstitüsü",
      date: "15 Mart 2021",
      file: "/certificates/physiology.pdf"
    }
  ]
};

export default function TrainerInfo() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const t = useTranslations('trainerInfo');

  return (
    <div className="flex md:flex-row flex-col min-h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      }`}>
        <main className="p-4 md:p-6 lg:p-8 mt-14 md:mt-0">
          <h1 className="text-2xl font-bold text-white mb-6">{t('title')}</h1>

          {/* Üst Bilgi Kartı */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 lg:p-8 mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              <div className="w-40 h-40 relative rounded-2xl overflow-hidden border-2 border-zinc-800/50 shadow-xl">
                <Image
                  src={trainerData.photo}
                  alt={trainerData.fullName}
                  width={160}
                  height={160}
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">{trainerData.fullName}</h1>
                <div className="grid sm:grid-cols-3 gap-6 text-zinc-300">
                  <div className="flex items-center justify-center lg:justify-start gap-3 group hover:text-blue-400 transition-colors duration-200">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform text-blue-400" />
                    <span>{trainerData.email}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 group hover:text-green-400 transition-colors duration-200">
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform text-green-400" />
                    <span>{trainerData.phone}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 group hover:text-purple-400 transition-colors duration-200">
                    <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform text-purple-400" />
                    <span>{trainerData.birthDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alt Bilgi Kartları Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Uzmanlık Alanları */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  {t('sections.specializations')}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trainerData.specializations.map((spec, index) => (
                  <Badge 
                    key={index}
                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1.5 text-sm font-medium transition-colors duration-200"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Deneyim */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-emerald-400" />
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  {t('sections.experience')}
                </h2>
              </div>
              <p className="text-zinc-300 leading-relaxed">{trainerData.experience}</p>
            </div>

            {/* Kişisel Mesaj */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  {t('sections.bio')}
                </h2>
              </div>
              <p className="text-zinc-300 leading-relaxed">{trainerData.bio}</p>
            </div>

            {/* Sertifikalar */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  {t('sections.certificates')}
                </h2>
              </div>
              <div className="space-y-4">
                {trainerData.certificates.map((cert, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-start p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:bg-zinc-800/70 transition-colors duration-200"
                  >
                    <div>
                      <h4 className="font-medium text-white">{cert.name}</h4>
                      <p className="text-sm text-zinc-400 mt-1">{cert.institution}</p>
                      <p className="text-sm text-zinc-500 mt-1">{cert.date}</p>
                    </div>
                    {cert.file && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border-zinc-700 hover:border-zinc-600 transition-all duration-200"
                        onClick={() => window.open(cert.file)}
                      >
                        {t('sections.viewCertificate')}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 