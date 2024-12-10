'use client';

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Sidebar from "@/app/components/Sidebar";
import { useRouter } from 'next/navigation';

type TabType = 'new' | 'pending' | 'completed' | 'cancelled';

interface TabItem {
  id: TabType;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'new', label: 'Yeni Rezervasyonlar' },
  { id: 'pending', label: 'Bekleyen Rezervasyonlar' },
  { id: 'completed', label: 'Gerçekleşmiş Rezervasyonlar' },
  { id: 'cancelled', label: 'İptal Edilmiş Rezervasyonlar' },
];

interface Reservation {
  id: string;
  memberName: string;
  trainerName?: string;
  teamName?: string;
  reservationDate: string;
  paymentType: 'cash' | 'credit_card' | 'iban' | 'corporate' | 'multisport';
  paymentStatus: 'pending' | 'approved' | 'completed';
  packageName: string;
  remainingCredits: number;
  packageDuration: string;
  status: TabType;
}

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

const paymentLabels = {
  cash: 'Nakit',
  credit_card: 'Kredi Kartı',
  iban: 'IBAN',
  corporate: 'Kurumsal',
  multisport: 'Multisport',
};

// Rezervasyon durumu için renk ve etiketler
const getReservationStatusColor = (status: TabType) => {
  switch (status) {
    case 'new':
      return 'bg-blue-500/10 text-blue-500 font-medium';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'completed':
      return 'bg-green-500/10 text-green-500';
    case 'cancelled':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-zinc-500/10 text-zinc-500';
  }
};

const reservationStatusLabels = {
  new: 'Yeni',
  pending: 'Beklemede',
  completed: 'Gerçekleşti',
  cancelled: 'İptal Edildi'
};

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [reservations] = useState<Reservation[]>([
    {
      id: '1',
      memberName: 'Ahmet Yılmaz',
      trainerName: 'Mehmet Öz',
      teamName: 'A Takımı',
      reservationDate: '2024-03-20',
      paymentType: 'cash',
      paymentStatus: 'pending',
      packageName: 'Aylık Paket',
      remainingCredits: 6,
      packageDuration: '1 ay',
      status: 'pending',
    },
    {
      id: '2',
      memberName: 'Ayşe Demir',
      trainerName: 'Fatma Yıldız',
      teamName: 'B Takımı',
      reservationDate: '2024-03-19',
      paymentType: 'iban',
      paymentStatus: 'approved',
      packageName: '3 Aylık Paket',
      remainingCredits: 20,
      packageDuration: '3 ay',
      status: 'pending',
    },
    {
      id: '3',
      memberName: 'Mehmet Kaya',
      trainerName: 'Ali Veli',
      teamName: 'C Takımı',
      reservationDate: '2024-03-18',
      paymentType: 'multisport',
      paymentStatus: 'completed',
      packageName: 'Yıllık Paket',
      remainingCredits: 85,
      packageDuration: '12 ay',
      status: 'completed',
    },
    {
      id: '4',
      memberName: 'Zeynep Şahin',
      trainerName: 'Mehmet Öz',
      teamName: 'A Takımı',
      reservationDate: '2024-03-15',
      paymentType: 'iban',
      paymentStatus: 'pending',
      packageName: 'Aylık Paket',
      remainingCredits: 8,
      packageDuration: '1 ay',
      status: 'cancelled',
    },
    {
      id: '5',
      memberName: 'Can Yılmaz',
      trainerName: 'Fatma Yıldız',
      teamName: 'B Takımı',
      reservationDate: '2024-03-17',
      paymentType: 'corporate',
      paymentStatus: 'pending',
      packageName: '6 Aylık Paket',
      remainingCredits: 45,
      packageDuration: '6 ay',
      status: 'pending',
    },
    {
      id: '6',
      memberName: 'Elif Yıldız',
      reservationDate: '2024-03-21',
      paymentType: 'credit_card',
      paymentStatus: 'pending',
      packageName: 'Aylık Paket',
      remainingCredits: 8,
      packageDuration: '1 ay',
      status: 'new',
    },
    {
      id: '7',
      memberName: 'Burak Demir',
      reservationDate: '2024-03-21',
      paymentType: 'multisport',
      paymentStatus: 'pending',
      packageName: '3 Aylık Paket',
      remainingCredits: 24,
      packageDuration: '3 ay',
      status: 'new',
    },
  ]);

  const filteredReservations = useMemo(() => {
    return reservations.filter(reservation => reservation.status === activeTab);
  }, [reservations, activeTab]);

  const ReservationTable = ({ reservations }: { reservations: Reservation[] }) => {
    const router = useRouter();
    const isNewReservation = activeTab === 'new';

    return (
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium">
              Üye Adı Soyadı
            </TableHead>
            {!isNewReservation && (
              <>
                <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium">
                  Antrenör
                </TableHead>
                <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium">
                  Takım
                </TableHead>
              </>
            )}
            <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium">
              Rezervasyon Tarihi
            </TableHead>
            <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium">
              Ödeme Tipi
            </TableHead>
            <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium">
              Paket Bilgisi
            </TableHead>
            <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium">
              Kalan Haklar
            </TableHead>
            <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium">
              Durum
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <motion.tr
              key={reservation.id}
              onClick={() => router.push(`/super-admin/reservations/details/${reservation.id}`)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                transition: { duration: 0.2 }
              }}
              className="group relative border-zinc-800 cursor-pointer"
            >
              <TableCell className="text-white group-hover:text-blue-400 transition-colors">
                {reservation.memberName}
              </TableCell>
              {!isNewReservation && (
                <>
                  <TableCell className="text-white group-hover:text-white/90 transition-colors">
                    {reservation.trainerName}
                  </TableCell>
                  <TableCell className="text-white group-hover:text-white/90 transition-colors">
                    {reservation.teamName}
                  </TableCell>
                </>
              )}
              <TableCell className="text-white group-hover:text-white/90 transition-colors">
                {new Date(reservation.reservationDate).toLocaleDateString('tr-TR')}
              </TableCell>
              <TableCell>
                <motion.span 
                  className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(reservation.paymentType, reservation.paymentStatus)}`}
                >
                  {paymentLabels[reservation.paymentType]}
                  {reservation.paymentStatus === 'pending' && ['cash', 'iban', 'corporate'].includes(reservation.paymentType) 
                    ? ' (Onay Bekliyor)' 
                    : reservation.paymentStatus === 'approved' 
                    ? ' (Onaylandı)'
                    : ''}
                </motion.span>
              </TableCell>
              <TableCell className="text-white group-hover:text-white/90 transition-colors">
                {reservation.packageName} ({reservation.packageDuration})
              </TableCell>
              <TableCell className="text-white group-hover:text-white/90 transition-colors">
                {reservation.remainingCredits} Adet
              </TableCell>
              <TableCell>
                <motion.span 
                  className={`px-2 py-1 rounded-full text-xs ${getReservationStatusColor(reservation.status)}`}
                >
                  {reservationStatusLabels[reservation.status]}
                </motion.span>
              </TableCell>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"
              />
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className="flex-1 p-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white">Rezervasyonlar</h1>
          <p className="text-zinc-400">Tüm rezervasyonları görüntüleyin</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex space-x-1 rounded-lg bg-zinc-900/50 p-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {tab.label}
                <motion.span 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="ml-2 text-xs bg-zinc-900/50 px-2 py-0.5 rounded-full"
                >
                  {reservations.filter(res => res.status === tab.id).length}
                </motion.span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
        >
          <ReservationTable reservations={filteredReservations} />
        </motion.div>
      </div>
    </div>
  );
}
