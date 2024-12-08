"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Droplets,
  Briefcase,
  Building,
  Check,
  X,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import { UserDetail, AccountStatus, RegistrationType } from "@/app/types/user";
import Sidebar from "@/app/components/Sidebar";
import { Dialog } from "@/app/components/Dialog";

// Bu örnek veriyi API'den alacaksınız
const mockUserDetail: UserDetail = {
  id: "1",
  fullName: "Mehmet Yılmaz",
  identityNumber: "12345678901",
  email: "mehmet@example.com",
  phone: "+90 532 111 22 33",
  birthDate: "1990-05-15",
  birthPlace: "İstanbul",
  bloodType: "A Rh+",
  canSwim: true,
  profession: "Mühendis",
  emergencyContact: {
    fullName: "Ayşe Yılmaz",
    relation: "Eş",
    phone: "+90 533 222 33 44",
  },
  registrationType: "individual",
  profileImage: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
  accountStatus: "pending",
  createdAt: "2024-03-15",
};

// Kayıt şekli çevirisi için yardımcı fonksiyon
const getRegistrationTypeText = (type: RegistrationType): string => {
  const types = {
    individual: "Bireysel",
    highschool: "Lise",
    university: "Üniversite",
    corporate: "Kurumsal"
  };
  return types[type];
};

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userDetail, setUserDetail] = useState<UserDetail>(() => {
    console.log('Fetching user with ID:', params.id);
    return mockUserDetail;
  });
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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const getStatusColor = (status: AccountStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  const getStatusText = (status: AccountStatus) => {
    switch (status) {
      case "approved":
        return "Onaylandı";
      case "rejected":
        return "Reddedildi";
      default:
        return "Beklemede";
    }
  };

  const handleStatusUpdate = async (newStatus: AccountStatus) => {
    // Red/Kısıtlama işlemi için modal göster
    if (newStatus === "rejected") {
      setIsUpdateModalOpen(true);
      return;
    }

    // Onaylama işlemi
    if (newStatus === "approved") {
      setDialogConfig({
        show: true,
        title: 'Onaylama',
        message: 'Bu hesabı onaylamak istediğinize emin misiniz?',
        type: 'confirm',
        action: () => {
          updateStatus(newStatus);
          setDialogConfig({ show: false, title: '', message: '' });
        }
      });
      return;
    }

    // Aktifleştirme işlemi
    if (newStatus === "pending") {
      setDialogConfig({
        show: true,
        title: 'Aktifleştirme',
        message: 'Bu hesabı aktifleştirmek istediğinize emin misiniz?',
        type: 'confirm',
        action: () => {
          updateStatus(newStatus);
          setDialogConfig({ show: false, title: '', message: '' });
        }
      });
      return;
    }
  };

  const updateStatus = (newStatus: AccountStatus) => {
    setUserDetail(prev => ({
      ...prev,
      accountStatus: newStatus,
      rejectionReason: newStatus === "rejected" ? rejectionReason : undefined
    }));
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
                <Link href="/super-admin/users" className="hover:text-white">
                  Üyeler
                </Link>
                <ChevronRight size={16} />
                <span className="text-white">Üye Detayı</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{userDetail.fullName}</h1>
            </div>
            <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(userDetail.accountStatus)}`}>
              {getStatusText(userDetail.accountStatus)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sol Kolon - Profil */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 sticky top-8">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 ring-2 ring-zinc-800">
                  <Image
                    src={userDetail.profileImage}
                    alt={userDetail.fullName}
                    fill
                    className="object-cover"
                  />
                </div>

                {userDetail.accountStatus === "pending" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStatusUpdate("approved")}
                      className="w-full py-3 px-4 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <Check size={20} />
                      Hesabı Onayla
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("rejected")}
                      className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <X size={20} />
                      Hesabı Reddet
                    </button>
                  </div>
                )}

                {userDetail.accountStatus === "approved" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStatusUpdate("rejected")}
                      className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <X size={20} />
                      Hesabı Kısıtla
                    </button>
                  </div>
                )}

                {userDetail.accountStatus === "rejected" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStatusUpdate("pending")}
                      className="w-full py-3 px-4 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <Check size={20} />
                      Hesabı Aktifleştir
                    </button>
                  </div>
                )}

                {userDetail.accountStatus === "rejected" && userDetail.rejectionReason && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <h4 className="text-red-500 font-medium mb-2 flex items-center gap-2">
                      <X size={16} />
                      Red Nedeni
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{userDetail.rejectionReason}</p>
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
                  <InfoItem icon={User} label="Ad Soyad" value={userDetail.fullName} />
                  <InfoItem icon={User} label="TC Kimlik No" value={userDetail.identityNumber} />
                  <InfoItem icon={Mail} label="E-posta" value={userDetail.email} />
                  <InfoItem icon={Phone} label="Telefon" value={userDetail.phone} />
                  <InfoItem icon={Calendar} label="Doğum Tarihi" value={userDetail.birthDate} />
                  <InfoItem icon={MapPin} label="Doğum Yeri" value={userDetail.birthPlace} />
                  <InfoItem icon={Droplets} label="Kan Grubu" value={userDetail.bloodType} />
                  <InfoItem icon={Droplets} label="Yüzme Bilgisi" value={userDetail.canSwim ? "Evet" : "Hayır"} />
                  <InfoItem icon={Briefcase} label="Meslek" value={userDetail.profession} />
                  <InfoItem icon={Building} label="Kayıt Şekli" value={getRegistrationTypeText(userDetail.registrationType)} />
                </div>
              </div>

              {/* Acil Durum İletişim Bilgileri */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Phone className="text-blue-400" size={24} />
                  Acil Durum İletişim Bilgileri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem icon={User} label="Ad Soyad" value={userDetail.emergencyContact.fullName} />
                  <InfoItem icon={User} label="Yakınlık" value={userDetail.emergencyContact.relation} />
                  <InfoItem icon={Phone} label="Telefon" value={userDetail.emergencyContact.phone} />
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
              {userDetail.accountStatus === "pending" ? "Red Nedeni" : "Kısıtlama Nedeni"}
            </h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white mb-4"
              rows={4}
              placeholder={userDetail.accountStatus === "pending" ? "Red nedenini yazınız..." : "Kısıtlama nedenini yazınız..."}
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
                    title: userDetail.accountStatus === "pending" ? 'Reddetme' : 'Kısıtlama',
                    message: userDetail.accountStatus === "pending"
                      ? 'Bu hesabı reddetmek istediğinize emin misiniz?'
                      : 'Bu hesabı kısıtlamak istediğinize emin misiniz?',
                    type: 'confirm',
                    action: () => {
                      updateStatus("rejected");
                      setIsUpdateModalOpen(false);
                    }
                  });
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                {userDetail.accountStatus === "pending" ? "Reddet" : "Kısıtla"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
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