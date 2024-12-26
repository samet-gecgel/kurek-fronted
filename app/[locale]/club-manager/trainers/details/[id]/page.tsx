'use client';

import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash2, Building2, MapPin, Mail, Phone, Calendar, Clock, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// Örnek veri - gerçek uygulamada API'den gelecek
const trainerData = {
  id: '1',
  name: 'Ahmet Yılmaz',
  image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
  email: 'ahmet@example.com',
  phone: '555 123 0101',
  specialization: 'Baş Kürek Antrenörü',
  status: 'active',
  identityNumber: '12345678901',
  birthDate: '1990-05-15',
  experience: '5 yıl',
  education: 'Spor Bilimleri Fakültesi',
  achievements: 'Ulusal Kürek Yarışması Birincilik (2022)',
  bio: 'Profesyonel kürek sporcusu ve antrenör. 10 yıllık spor geçmişi ile genç sporculara rehberlik etmekte.',
  location: 'İstanbul, Kadıköy',
  club: 'Denizciler Spor Kulübü',
  paymentDetails: {
    baseSalary: 8000,
    perLessonFee: 150,
    bonusPercentage: 10,
    paymentDate: 'Her ayın 1\'i',
  },
  certificates: [
    'Kürek Antrenörlüğü Seviye 3',
    'İlk Yardım Sertifikası',
    'Spor Fizyolojisi Sertifikası'
  ],
  workSchedule: {
    monday: { isAvailable: true, hours: '09:00 - 15:00' },
    tuesday: { isAvailable: true, hours: '10:00 - 18:00' },
    wednesday: { isAvailable: true, hours: '08:00 - 12:00' },
    thursday: { isAvailable: true, hours: '09:00 - 15:00' },
    friday: { isAvailable: false, hours: '-' },
    saturday: { isAvailable: true, hours: '09:00 - 15:00' },
    sunday: { isAvailable: true, hours: '09:00 - 15:00' }
  }
};

const dayTranslations = {
  monday: 'Pazartesi',
  tuesday: 'Salı',
  wednesday: 'Çarşamba',
  thursday: 'Perşembe',
  friday: 'Cuma',
  saturday: 'Cumartesi',
  sunday: 'Pazar'
};

export default function TrainerDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleDelete = () => {
    // Silme işlemi için onay al
    if (window.confirm('Bu antrenörü silmek istediğinizden emin misiniz?')) {
      // Silme işlemi gerçekleştir
      console.log('Antrenör silindi');
      router.push('/club-manager/trainers');
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="p-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Button>
              <h1 className="text-2xl font-bold text-white">Antrenör Detayları</h1>
            </div>
            
            {/* Düzenle ve Sil butonları */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => router.push(`/club-manager/trainers/details/edit/${params.id}`)}
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  <span className="font-medium">Düzenle</span>
                </div>
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDelete}
                className="bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  <span className="font-medium">Sil</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Üst Bilgi Kartı */}
          <Card className="bg-zinc-900 border-zinc-800 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                  <Image
                    src={trainerData.image}
                    alt={trainerData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">{trainerData.name}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-sm rounded-full">
                      {trainerData.specialization}
                    </span>
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      trainerData.status === 'active'
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : 'bg-rose-400/10 text-rose-400'
                    }`}>
                      {trainerData.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Building2 size={16} />
                      <span>{trainerData.club}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <MapPin size={16} />
                      <span>{trainerData.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Kişisel Bilgiler */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100">Kişisel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="min-w-32 text-zinc-500">TC Kimlik No:</span>
                  <span>{trainerData.identityNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="min-w-32 text-zinc-500">Doğum Tarihi:</span>
                  <span>{new Date(trainerData.birthDate).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="min-w-32 text-zinc-500">Eğitim:</span>
                  <span>{trainerData.education}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="min-w-32 text-zinc-500">Deneyim:</span>
                  <span>{trainerData.experience}</span>
                </div>
              </CardContent>
            </Card>

            {/* İletişim Bilgileri */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100">İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Mail size={16} />
                  <span>{trainerData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Phone size={16} />
                  <span>{trainerData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin size={16} />
                  <span>{trainerData.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Başarılar ve Bio */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100">Başarılar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">{trainerData.achievements}</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100">Hakkında</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">{trainerData.bio}</p>
              </CardContent>
            </Card>

            {/* Ödeme Bilgileri */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100">Ödeme Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Wallet size={16} />
                  <span>Sabit Maaş: {trainerData.paymentDetails.baseSalary} ₺</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Wallet size={16} />
                  <span>Ders Başı Ücret: {trainerData.paymentDetails.perLessonFee} ₺</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar size={16} />
                  <span>Ödeme Tarihi: {trainerData.paymentDetails.paymentDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Sertifikalar */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100">Sertifikalar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {trainerData.certificates.map((certificate, index) => (
                    <li key={index} className="text-zinc-400">
                      • {certificate}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Çalışma Programı - Güncellendi */}
            <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-zinc-100">Çalışma Programı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(trainerData.workSchedule).map(([day, schedule]) => (
                    <div
                      key={day}
                      className={`p-4 rounded-lg border ${
                        schedule.isAvailable 
                          ? 'bg-blue-500/5 border-blue-500/20' 
                          : 'bg-zinc-800/50 border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-zinc-100">
                          {dayTranslations[day as keyof typeof dayTranslations]}
                        </span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          schedule.isAvailable
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-zinc-700/50 text-zinc-400'
                        }`}>
                          {schedule.isAvailable ? 'Müsait' : 'Müsait Değil'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className={
                          schedule.isAvailable ? 'text-blue-500' : 'text-zinc-500'
                        } />
                        <span className={
                          schedule.isAvailable ? 'text-zinc-300' : 'text-zinc-500'
                        }>
                          {schedule.hours}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 