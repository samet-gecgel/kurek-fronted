"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Award,
  Sailboat,
  Dumbbell,
} from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";

// Örnek veri - Gerçek uygulamada API'den gelecek
const trainerData = {
  id: 1,
  name: "Ahmet Yılmaz",
  image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
  specialization: "Baş Antrenör",
  club: "Denizciler Spor Kulübü",
  location: "İstanbul, Kuruçeşme",
  experience: "8 yıl",
  phone: "+90 (532) 111 22 33",
  email: "ahmet@denizkurek.com",
  startDate: "2023-01-15",
  boatClasses: ["Optimist", "Laser", "420"],
  trainingTypes: ["Temel Yelken", "Yarış Antrenmanı", "Taktik Geliştirme"],
  education: [
    {
      title: "World Sailing Level 2 Antrenör Sertifikası",
      date: "2020",
      institution: "World Sailing",
    },
    {
      title: "İleri Düzey Yelken Eğitmenliği",
      date: "2018",
      institution: "Türkiye Yelken Federasyonu",
    },
  ],
  bio: "15 yaşından beri yelken sporuyla iç içeyim. Ulusal ve uluslararası yarışlarda edindiğim deneyimleri, genç sporculara aktarmaktan büyük keyif alıyorum. Hedefim, Türk yelkenciliğinin dünya çapında başarılara imza atmasına katkıda bulunmak.",
};

export default function TrainerDetailsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
            <Link href="/super-admin/dashboard" className="hover:text-white transition-colors">
              Ana Panel
            </Link>
            <ChevronRight size={16} />
            <Link href="/super-admin/trainers" className="hover:text-white transition-colors">
              Antrenörler
            </Link>
            <ChevronRight size={16} />
            <span className="text-zinc-300">{trainerData.name}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Profil Kartı */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden ring-4 ring-blue-500/20">
                  <Image
                    src={trainerData.image}
                    alt={trainerData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{trainerData.name}</h1>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
                        {trainerData.specialization}
                      </span>
                      <span className="text-zinc-400 text-sm">
                        {trainerData.experience} deneyim
                      </span>
                    </div>
                  </div>
                  
                  {/* İletişim Bilgileri */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="flex items-center gap-3 text-zinc-300 bg-zinc-800/30 p-3 rounded-lg">
                      <Phone size={18} className="text-blue-400" />
                      <span>{trainerData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-300 bg-zinc-800/30 p-3 rounded-lg">
                      <Mail size={18} className="text-blue-400" />
                      <span>{trainerData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-300 bg-zinc-800/30 p-3 rounded-lg">
                      <Calendar size={18} className="text-blue-400" />
                      <span>Başlangıç: {trainerData.startDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Konum ve Kulüp Bilgisi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Building2 size={20} className="text-blue-400" />
                  <span>{trainerData.club}</span>
                </div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin size={20} className="text-blue-400" />
                  <span>{trainerData.location}</span>
                </div>
              </div>
            </div>

            {/* Hakkında */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Hakkında</h2>
              <p className="text-zinc-300 leading-relaxed">{trainerData.bio}</p>
            </div>

            {/* Uzmanlıklar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                  <Sailboat size={20} className="text-blue-400" />
                  Tekne Sınıfları
                </h2>
                <div className="flex flex-wrap gap-2">
                  {trainerData.boatClasses.map((boat) => (
                    <span
                      key={boat}
                      className="px-3 py-1.5 bg-zinc-800 rounded-full text-zinc-300 text-sm"
                    >
                      {boat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                  <Dumbbell size={20} className="text-blue-400" />
                  Antrenman Türleri
                </h2>
                <div className="flex flex-wrap gap-2">
                  {trainerData.trainingTypes.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1.5 bg-zinc-800 rounded-full text-zinc-300 text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Eğitim ve Sertifikalar */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                <Award size={20} className="text-blue-400" />
                Eğitim ve Sertifikalar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainerData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700 hover:border-blue-500/50 transition-colors"
                  >
                    <h3 className="font-medium text-zinc-100">{edu.title}</h3>
                    <p className="text-zinc-400 text-sm mt-2">
                      {edu.institution} • {edu.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

