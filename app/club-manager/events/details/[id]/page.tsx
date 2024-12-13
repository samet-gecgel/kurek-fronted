'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Pencil, 
  Trash2,
} from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock veri - Gerçek uygulamada API'den gelecek
const eventData = {
  id: '1',
  title: 'Kürek Yarışması',
  type: 'Yarışma',
  date: '2024-03-15',
  time: '10:00',
  location: 'İstanbul, Maltepe Sahili',
  participants: 30,
  maxParticipants: 50,
  status: 'upcoming',
  description: 'Yıllık kürek yarışması etkinliği. Tüm sporcularımızın katılımını bekliyoruz. Yarışma sonrası ödül töreni ve kokteyl olacaktır.',
  createdAt: '2024-01-15',
  updatedAt: '2024-01-15'
};

export default function EventDetailsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    // API'ye silme isteği gönder
    console.log('Etkinlik silindi:', eventData.id);
    router.push('/club-manager/events');
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              >
                <ArrowLeft className="w-4 h-4" />
                Geri
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push(`/club-manager/events/details/edit/${eventData.id}`)}
                className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 h-9 px-3 text-sm"
              >
                <Pencil className="w-4 h-4 mr-1.5" />
                Düzenle
              </Button>
              <Button
                onClick={() => setShowDeleteDialog(true)}
                className="bg-red-600/10 hover:bg-red-600/20 text-red-500 h-9 px-3 text-sm"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                Sil
              </Button>
            </div>
          </div>

          {/* Başlık */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">{eventData.title}</h1>
            <p className="text-zinc-400 text-sm">Etkinlik detayları ve yönetimi</p>
          </div>

          {/* Ana Kart */}
          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              {/* Durum Etiketleri */}
              <div className="flex items-center gap-2 mb-6">
                <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                  eventData.status === 'upcoming'
                    ? 'bg-emerald-400/10 text-emerald-400'
                    : eventData.status === 'past'
                    ? 'bg-zinc-400/10 text-zinc-400'
                    : 'bg-rose-400/10 text-rose-400'
                }`}>
                  {eventData.status === 'upcoming' ? 'Yaklaşan' : eventData.status === 'past' ? 'Geçmiş' : 'İptal'}
                </span>
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full font-medium">
                  {eventData.type}
                </span>
              </div>

              {/* Bilgi Grid'i */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(eventData.date).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="w-4 h-4" />
                  <span>{eventData.time}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4" />
                  <span>{eventData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Users className="w-4 h-4" />
                  <span>{eventData.participants}/{eventData.maxParticipants} Katılımcı</span>
                </div>
              </div>

              {/* Açıklama */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-white mb-2">Açıklama</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {eventData.description}
                </p>
              </div>

              {/* Oluşturma Bilgileri */}
              <div className="text-xs text-zinc-500 flex justify-between">
                <div>Oluşturulma: {new Date(eventData.createdAt).toLocaleDateString('tr-TR')}</div>
                <div>Son Güncelleme: {new Date(eventData.updatedAt).toLocaleDateString('tr-TR')}</div>
              </div>
            </CardContent>
          </Card>

          {/* Katılımcılar Kartı */}
          <Card className="mt-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium text-white mb-4">Katılımcılar</h2>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-zinc-400">Toplam Katılımcı</span>
                <span className="text-white font-medium">{eventData.participants}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-zinc-400">Maksimum Katılımcı</span>
                <span className="text-white font-medium">{eventData.maxParticipants}</span>
              </div>
              <div className="relative pt-2">
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(eventData.participants / eventData.maxParticipants) * 100}%` }}
                  />
                </div>
              </div>
              <Button 
                className="w-full mt-4 bg-zinc-800 hover:bg-zinc-700 text-white"
                onClick={() => router.push(`/club-manager/events/${eventData.id}/participants`)}
              >
                Katılımcıları Görüntüle
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Silme Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-zinc-900 border border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Etkinliği Sil</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Bu etkinliği silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700">
              İptal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 