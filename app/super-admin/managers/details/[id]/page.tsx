"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  User,
  Phone,
  Mail,
  Calendar,
  Building,
  Check,
  X,
} from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { Dialog } from "@/app/components/Dialog";
import { ManagerDetail, ManagerStatus } from "@/types/manager";

// Örnek veri - Gerçek uygulamada API'den gelecek
const mockManagerDetail: ManagerDetail = {
  id: 1,
  fullName: "Ali Yılmaz",
  identityNumber: "12345678901",
  phone: "+90 (532) 111 22 33",
  email: "ali.yilmaz@example.com",
  birthDate: "1985-05-15",
  image: "https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png",
  clubName: "Deniz Spor Kulübü",
  clubRole: "Kulüp Müdürü",
  startDate: "2022-01-15",
  status: "pending",
};

export default function ManagerDetailsPage({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [managerDetail, setManagerDetail] = useState<ManagerDetail>(() => {
    console.log('Fetching manager with ID:', params.id);
    return mockManagerDetail;
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

  const getStatusColor = (status: ManagerStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  const getStatusText = (status: ManagerStatus) => {
    switch (status) {
      case "approved":
        return "Onaylandı";
      case "rejected":
        return "Reddedildi";
      default:
        return "Beklemede";
    }
  };

  const handleStatusUpdate = async (newStatus: ManagerStatus) => {
    if (newStatus === "rejected") {
      setIsUpdateModalOpen(true);
      return;
    }

    if (newStatus === "approved") {
      setDialogConfig({
        show: true,
        title: 'Onaylama',
        message: 'Bu yöneticiyi onaylamak istediğinize emin misiniz?',
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
        message: 'Bu yöneticiyi aktifleştirmek istediğinize emin misiniz?',
        type: 'confirm',
        action: () => {
          updateStatus(newStatus);
          setDialogConfig({ show: false, title: '', message: '' });
        }
      });
      return;
    }
  };

  const updateStatus = (newStatus: ManagerStatus) => {
    setManagerDetail(prev => ({
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                <Link href="/super-admin/dashboard" className="hover:text-white">
                  Ana Panel
                </Link>
                <ChevronRight size={16} />
                <Link href="/super-admin/managers" className="hover:text-white">
                  Yöneticiler
                </Link>
                <ChevronRight size={16} />
                <span className="text-white">Yönetici Detayı</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{managerDetail.fullName}</h1>
            </div>
            <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(managerDetail.status)}`}>
              {getStatusText(managerDetail.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sol Kolon - Profil */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 sticky top-8">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 ring-2 ring-zinc-800">
                  <Image
                    src={managerDetail.image}
                    alt={managerDetail.fullName}
                    fill
                    className="object-cover"
                  />
                </div>

                {managerDetail.status === "pending" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStatusUpdate("approved")}
                      className="w-full py-3 px-4 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <Check size={20} />
                      Yöneticiyi Onayla
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("rejected")}
                      className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <X size={20} />
                      Yöneticiyi Reddet
                    </button>
                  </div>
                )}

                {managerDetail.status === "approved" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStatusUpdate("rejected")}
                      className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <X size={20} />
                      Yöneticiyi Kısıtla
                    </button>
                  </div>
                )}

                {managerDetail.status === "rejected" && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStatusUpdate("pending")}
                      className="w-full py-3 px-4 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <Check size={20} />
                      Yöneticiyi Aktifleştir
                    </button>
                  </div>
                )}

                {managerDetail.status === "rejected" && managerDetail.rejectionReason && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <h4 className="text-red-500 font-medium mb-2 flex items-center gap-2">
                      <X size={16} />
                      Red Nedeni
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{managerDetail.rejectionReason}</p>
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
                  <InfoItem icon={User} label="Ad Soyad" value={managerDetail.fullName} />
                  <InfoItem icon={User} label="TC Kimlik No" value={managerDetail.identityNumber} />
                  <InfoItem icon={Mail} label="E-posta" value={managerDetail.email} />
                  <InfoItem icon={Phone} label="Telefon" value={managerDetail.phone} />
                  <InfoItem icon={Calendar} label="Doğum Tarihi" value={managerDetail.birthDate} />
                </div>
              </div>

              {/* Kulüp Bilgileri */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Building className="text-blue-400" size={24} />
                  Kulüp Bilgileri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem icon={Building} label="Kulüp Adı" value={managerDetail.clubName} />
                  <InfoItem icon={Building} label="Görevi" value={managerDetail.clubRole} />
                  <InfoItem icon={Calendar} label="Başlangıç Tarihi" value={managerDetail.startDate} />
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
              {managerDetail.status === "pending" ? "Red Nedeni" : "Kısıtlama Nedeni"}
            </h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white mb-4"
              rows={4}
              placeholder={managerDetail.status === "pending" ? "Red nedenini yazınız..." : "Kısıtlama nedenini yazınız..."}
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
                    title: managerDetail.status === "pending" ? 'Reddetme' : 'Kısıtlama',
                    message: managerDetail.status === "pending"
                      ? 'Bu yöneticiyi reddetmek istediğinize emin misiniz?'
                      : 'Bu yöneticiyi kısıtlamak istediğinize emin misiniz?',
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
                {managerDetail.status === "pending" ? "Reddet" : "Kısıtla"}
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