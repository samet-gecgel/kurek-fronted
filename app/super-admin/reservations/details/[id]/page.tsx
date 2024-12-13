'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/sidebar";
interface Trainer {
  id: string;
  name: string;
  specialization: string;
  teams: string[];
  availableSlots: string[];
}

interface Reservation {
  id: string;
  memberName: string;
  trainerName?: string;
  selectedTrainer?: string;
  teamName?: string;
  boatClass?: 'C4X' | 'C2X' | 'C1X' | '8+' | '4+' | '2-';
  reservationDate: string;
  reservationTime?: string;
  paymentType: 'cash' | 'credit_card' | 'iban' | 'corporate' | 'multisport';
  paymentStatus: 'pending' | 'approved' | 'completed';
  paymentAmount: number;
  packageName: string;
  remainingCredits: number;
  packageDuration: string;
  packageStartDate: string;
  packageEndDate: string;
  status: 'new' | 'pending' | 'completed' | 'cancelled';
  memberNote?: string;
  adminNote?: string;
}

const paymentLabels = {
  cash: 'Nakit',
  credit_card: 'Kredi Kartı',
  iban: 'IBAN',
  corporate: 'Kurumsal',
  multisport: 'Multisport',
};

const statusLabels = {
  new: 'Yeni',
  pending: 'Beklemede',
  completed: 'Tamamlandı',
  cancelled: 'İptal Edildi'
};

const getPaymentStatusColor = (type: Reservation['paymentType'], status: Reservation['paymentStatus']) => {
  if (status === 'pending' && ['cash', 'iban', 'corporate'].includes(type)) {
    return 'bg-yellow-500/10 text-yellow-500';
  }
  if (status === 'approved' || status === 'completed') {
    return 'bg-green-500/10 text-green-500';
  }
  if (type === 'credit_card') {
    return 'bg-blue-500/10 text-blue-500';
  }
  if (type === 'multisport') {
    return 'bg-purple-500/10 text-purple-500';
  }
  return 'bg-zinc-500/10 text-zinc-500';
};

export default function ReservationDetails() {
  const params = useParams();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [availableTrainers, setAvailableTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock veri - Gerçek uygulamada API'den gelecek
  useEffect(() => {
    // Rezervasyon detaylarını getir
    setReservation({
      id: params.id as string,
      memberName: "Elif Yıldız",
      selectedTrainer: "2",
      reservationDate: "2024-03-21",
      reservationTime: "14:00",
      paymentType: "credit_card",
      paymentStatus: "pending",
      paymentAmount: 2500,
      packageName: "Aylık Kürek Paketi",
      remainingCredits: 8,
      packageDuration: "1 ay",
      packageStartDate: "2024-03-01",
      packageEndDate: "2024-03-31",
      status: "new",
      boatClass: "C2X",
      memberNote: "Akşam saatlerini tercih ediyorum",
    });

    // Müsait antrenörleri getir
    setAvailableTrainers([
      {
        id: "1",
        name: "Ahmet Yılmaz",
        specialization: "Kürek Antrenörü",
        teams: ["A Takımı"],
        availableSlots: ["09:00", "10:00", "14:00", "15:00"]
      },
      {
        id: "2",
        name: "Mehmet Demir",
        specialization: "Kürek Antrenörü",
        teams: ["B Takımı"],
        availableSlots: ["11:00", "13:00", "16:00"]
      },
      {
        id: "3",
        name: "Ayşe Kaya",
        specialization: "Kürek Antrenörü",
        teams: ["C Takımı"],
        availableSlots: ["08:00", "12:00", "17:00"]
      }
    ]);
  }, [params.id]);

  const handleAssignTrainer = () => {
    if (!selectedTrainer) {
      alert("Lütfen antrenör seçiniz");
      return;
    }
    
    if (!reservation) {
      return;
    }
    
    console.log("Antrenör atama:", { trainerId: selectedTrainer, time: reservation.reservationTime });
  };

  const handlePaymentAction = (action: 'approve' | 'reject') => {
    // API çağrısı yapılacak
    console.log(`Ödeme ${action === 'approve' ? 'onaylandı' : 'reddedildi'}`);
    
    // Başarılı olursa state'i güncelle
    if (reservation) {
      setReservation({
        ...reservation,
        paymentStatus: action === 'approve' ? 'approved' : 'pending'
      });
    }
  };

  const handleReservationAction = (action: 'approve' | 'reject') => {
    // API çağrısı yapılacak
    console.log(`Rezervasyon ${action === 'approve' ? 'onaylandı' : 'reddedildi'}`);
    
    // Başarılı olursa state'i güncelle
    if (reservation) {
      setReservation({
        ...reservation,
        status: action === 'approve' ? 'pending' : 'cancelled'
      });
    }
  };

  if (!reservation) {
    return <div className="p-8 text-white">Yükleniyor...</div>;
  }

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className={`flex-1 overflow-y-auto ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-white">Rezervasyon Detayı</h1>
            <p className="text-zinc-400">#{params.id}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Üye Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400">Üye Adı</label>
                  <p className="text-white">{reservation.memberName}</p>
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Tekne Sınıfı</label>
                  <p className="text-white">{reservation.boatClass}</p>
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Üye Notu</label>
                  <p className="text-white">{reservation.memberNote || '-'}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Paket Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400">Paket</label>
                  <p className="text-white">{reservation.packageName}</p>
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Süre</label>
                  <p className="text-white">{reservation.packageDuration}</p>
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Başlangıç - Bitiş</label>
                  <p className="text-white">
                    {new Date(reservation.packageStartDate).toLocaleDateString('tr-TR')} - 
                    {new Date(reservation.packageEndDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Kalan Haklar</label>
                  <p className="text-white">{reservation.remainingCredits} Adet</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Ödeme Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400">Ödeme Tipi</label>
                  <p className="text-white">{paymentLabels[reservation.paymentType]}</p>
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Tutar</label>
                  <p className="text-white">{reservation.paymentAmount} TL</p>
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Ödeme Durumu</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    getPaymentStatusColor(reservation.paymentType, reservation.paymentStatus)
                  }`}>
                    {reservation.paymentStatus === 'pending' ? 'Bekliyor' : 
                     reservation.paymentStatus === 'approved' ? 'Onaylandı' : 'Tamamlandı'}
                  </span>
                </div>
                {reservation.paymentStatus === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <Button 
                      onClick={() => handlePaymentAction('approve')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    >
                      Ödemeyi Onayla
                    </Button>
                    <Button 
                      onClick={() => handlePaymentAction('reject')}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    >
                      Ödemeyi Reddet
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {reservation.status === 'new' && !reservation.selectedTrainer ? (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Antrenör Ataması</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Antrenör Seçimi</label>
                    <Select onValueChange={setSelectedTrainer}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Antrenör seçiniz" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {availableTrainers.map((trainer) => (
                          <SelectItem key={trainer.id} value={trainer.id} className="text-white">
                            {trainer.name} - {trainer.teams.join(', ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400">Seçilen Saat</label>
                    <p className="text-white">{reservation.reservationTime}</p>
                  </div>

                  <Button 
                    onClick={handleAssignTrainer}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Antrenör Ata
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Antrenör Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-zinc-400">Seçilen Antrenör</label>
                    <p className="text-white">
                      {availableTrainers.find(t => t.id === reservation.selectedTrainer)?.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Seçilen Saat</label>
                    <p className="text-white">{reservation.reservationTime}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Rezervasyon Detayları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400">Rezervasyon Tarihi</label>
                  <p className="text-white">
                    {new Date(reservation.reservationDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                {reservation.reservationTime && (
                  <div>
                    <label className="text-sm text-zinc-400">Rezervasyon Saati</label>
                    <p className="text-white">{reservation.reservationTime}</p>
                  </div>
                )}
                {reservation.trainerName && (
                  <div>
                    <label className="text-sm text-zinc-400">Atanan Antrenör</label>
                    <p className="text-white">{reservation.trainerName}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-zinc-400">Durum</label>
                  <p className="text-white">{statusLabels[reservation.status]}</p>
                </div>
                {reservation.paymentStatus === 'approved' && reservation.status === 'new' && (
                  <div className="flex gap-2 mt-4">
                    <Button 
                      onClick={() => handleReservationAction('approve')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    >
                      Rezervasyonu Onayla
                    </Button>
                    <Button 
                      onClick={() => handleReservationAction('reject')}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    >
                      Rezervasyonu Reddet
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}