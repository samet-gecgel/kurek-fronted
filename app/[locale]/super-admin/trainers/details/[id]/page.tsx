"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  User,
  Phone,
  Calendar,
  Award,
  Trophy,
  BookOpen,
  FileText,
  Check,
  X,
} from "lucide-react";
import { TrainerDetail, TrainerStatus } from "@/types/trainer";
import Sidebar from "@/components/layout/sidebar";
import { Dialog } from "@/components/ui/dialogCustom";

// Örnek veri - Gerçek uygulamada API'den gelecek
const mockTrainerDetail: TrainerDetail = {
  id: 1,
  fullName: "Ahmet Yılmaz",
  identityNumber: "12345678901",
  phone: "+90 (532) 111 22 33",
  birthDate: "1990-05-15",
  image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
  specialization: "Kürek Antrenörü",
  experience: "8",
  education: "İstanbul Üniversitesi Spor Bilimleri Fakültesi - Antrenörlük Eğitimi Bölümü\nMarmara Üniversitesi - Spor Yönetimi Yüksek Lisans\nSpor Bilimleri ve Teknolojisi Yüksekokulu - Doktora Programı",
  certificates: "World Sailing Level 2 Antrenör Sertifikası\nİleri Düzey Yelken Eğitmenliği Sertifikası\nUluslararası Kürek Federasyonu Antrenörlük Lisansı\nSpor Psikolojisi Uzmanlık Sertifikası",
  achievements: "2019 Türkiye Şampiyonası Birincilik - Takım Koçluğu\n15+ Milli Sporcu Yetiştirme Başarısı\n2020 Avrupa Gençler Şampiyonası - En İyi Antrenör Ödülü\n2021 Olimpiyat Oyunları Milli Takım Antrenörlüğü",
  bio: "15 yaşından beri yelken sporuyla iç içeyim. Ulusal ve uluslararası yarışlarda edindiğim deneyimleri, genç sporculara aktarmaktan büyük keyif alıyorum.",
  status: "pending",
};

export default function TrainerDetailsPage({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [trainerDetail, setTrainerDetail] = useState<TrainerDetail>(() => {
    console.log('Fetching trainer with ID:', params.id);
    return mockTrainerDetail;
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [dialogConfig, setDialogConfig] = useState<{
    show: boolean;
    title: string;
    message: string;
    action?: () => void;
    type?: 'warning' | 'confirm';
  }>({
    show: false,
    title: '',
    message: '',
  });

  const getStatusColor = (status: TrainerStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  const getStatusText = (status: TrainerStatus) => {
    switch (status) {
      case "approved":
        return "Onaylandı";
      case "rejected":
        return "Reddedildi";
      default:
        return "Beklemede";
    }
  };

  const handleStatusUpdate = async (newStatus: TrainerStatus) => {
    if (newStatus === "rejected") {
      setIsUpdateModalOpen(true);
      return;
    }

    if (newStatus === "approved") {
      setDialogConfig({
        show: true,
        title: 'Onaylama',
        message: 'Bu antrenörü onaylamak istediğinize emin misiniz?',
        type: 'confirm',
        action: () => {
          updateStatus(newStatus);
          setDialogConfig({ show: false, title: '', message: '' });
        }
      });
      return;
    }

    if (newStatus === "pending") {
      setDialogConfig({
        show: true,
        title: 'Aktifleştirme',
        message: 'Bu antrenörü aktifleştirmek istediğinize emin misiniz?',
        type: 'confirm',
        action: () => {
          updateStatus(newStatus);
          setDialogConfig({ show: false, title: '', message: '' });
        }
      });
      return;
    }
  };

  const updateStatus = (newStatus: TrainerStatus) => {
    setTrainerDetail(prev => ({
      ...prev,
      status: newStatus,
      rejectionReason: newStatus === "rejected" ? rejectionReason : undefined
    }));
    setIsUpdateModalOpen(false);
    setRejectionReason("");
    setDialogConfig({ show: false, title: '', message: '' });
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className="flex-1 p-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                <Link href="/super-admin/dashboard" className="hover:text-white">
                  Ana Panel
                </Link>
                <ChevronRight size={16} />
                <Link href="/super-admin/trainers" className="hover:text-white">
                  Antrenörler
                </Link>
                <ChevronRight size={16} />
                <span className="text-white">Antrenör Detayı</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{trainerDetail.fullName}</h1>
            </div>
            <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(trainerDetail.status)}`}>
              {getStatusText(trainerDetail.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sol Kolon - Profil */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 sticky top-8">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 ring-2 ring-zinc-800">
                  <Image
                    src={trainerDetail.image}
                    alt={trainerDetail.fullName}
                    fill
                    className="object-cover"
                  />
                </div>

                {trainerDetail.status === "pending" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStatusUpdate("approved")}
                      className="w-full py-3 px-4 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <Check size={20} />
                      Antrenörü Onayla
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("rejected")}
                      className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <X size={20} />
                      Antrenörü Reddet
                    </button>
                  </div>
                )}

                {trainerDetail.status === "approved" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStatusUpdate("rejected")}
                      className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <X size={20} />
                      Antrenörü Kısıtla
                    </button>
                  </div>
                )}

                {trainerDetail.status === "rejected" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStatusUpdate("pending")}
                      className="w-full py-3 px-4 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <Check size={20} />
                      Antrenörü Aktifleştir
                    </button>
                  </div>
                )}

                {trainerDetail.status === "rejected" && trainerDetail.rejectionReason && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <h4 className="text-red-500 font-medium mb-2 flex items-center gap-2">
                      <X size={16} />
                      Red Nedeni
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{trainerDetail.rejectionReason}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sağ Kolon - Detaylar */}
            <div className="lg:col-span-3 space-y-8">
              {/* Kişisel Bilgiler */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="text-blue-400" size={24} />
                  Kişisel Bilgiler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem icon={User} label="Ad Soyad" value={trainerDetail.fullName} />
                  <InfoItem icon={User} label="TC Kimlik No" value={trainerDetail.identityNumber} />
                  <InfoItem icon={Phone} label="Telefon" value={trainerDetail.phone} />
                  <InfoItem icon={Calendar} label="Doğum Tarihi" value={trainerDetail.birthDate} />
                </div>
              </div>

              {/* Mesleki Bilgiler */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="text-blue-400" size={24} />
                  Mesleki Bilgiler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem icon={Award} label="Uzmanlık Alanı" value={trainerDetail.specialization} />
                  <InfoItem icon={Trophy} label="Deneyim" value={`${trainerDetail.experience} Yıl`} />
                  <InfoItem icon={BookOpen} label="Eğitim Bilgileri" value={trainerDetail.education} multiline />
                  <InfoItem icon={Award} label="Sertifikalar" value={trainerDetail.certificates} multiline />
                  <InfoItem icon={Trophy} label="Başarılar" value={trainerDetail.achievements} multiline />
                  <InfoItem icon={FileText} label="Kısa Biyografi" value={trainerDetail.bio} multiline />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      {dialogConfig.show && (
        <Dialog
          title={dialogConfig.title}
          message={dialogConfig.message}
          type={dialogConfig.type}
          onConfirm={dialogConfig.action}
          onCancel={() => setDialogConfig({ show: false, title: '', message: '' })}
          className="z-50"
        />
      )}

      {/* Rejection Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
          <div className="bg-zinc-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              {trainerDetail.status === "pending" ? "Red Nedeni" : "Kısıtlama Nedeni"}
            </h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white mb-4"
              rows={4}
              placeholder={trainerDetail.status === "pending" ? "Red nedenini yazınız..." : "Kısıtlama nedenini yazınız..."}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="px-4 py-2 text-zinc-300 hover:text-white"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  if (!rejectionReason) {
                    setDialogConfig({
                      show: true,
                      title: 'Uyarı',
                      message: 'Lütfen red nedenini belirtiniz',
                      type: 'warning'
                    });
                    return;
                  }
                  setDialogConfig({
                    show: true,
                    title: trainerDetail.status === "pending" ? 'Reddetme' : 'Kısıtlama',
                    message: trainerDetail.status === "pending"
                      ? 'Bu antrenörü reddetmek istediğinize emin misiniz?'
                      : 'Bu antrenörü kısıtlamak istediğinize emin misiniz?',
                    type: 'confirm',
                    action: () => {
                      updateStatus("rejected");
                      setIsUpdateModalOpen(false);
                      setDialogConfig({ show: false, title: '', message: '' });
                    }
                  });
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                {trainerDetail.status === "pending" ? "Reddet" : "Kısıtla"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  multiline?: boolean;
}

function InfoItem({ icon: Icon, label, value, multiline }: InfoItemProps) {
  if (multiline) {
    const items = value.split('\n').filter(item => item.trim());
    
    return (
      <div className="col-span-full bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50 hover:border-zinc-600/50 transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500/10 rounded-lg p-2">
            <Icon className="text-blue-400" size={20} />
          </div>
          <h3 className="text-sm font-medium text-zinc-400">{label}</h3>
        </div>
        
        <div className={`grid gap-3 pl-11 ${
          label === "Kısa Biyografi" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        }`}>
          {items.map((item, index) => (
            <div 
              key={index}
              className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors"
            >
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                <p className="text-white text-sm leading-relaxed flex-1">
                  {item.replace(/^-\s*/, '')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50 hover:border-zinc-600/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="bg-blue-500/10 rounded-lg p-2">
          <Icon className="text-blue-400" size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-400 mb-1">{label}</p>
          <p className="text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}
