'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import { UserSidebar } from "@/components/layout/user-sidebar";
import { Button } from "@/components/ui/button";
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
import { motion } from "framer-motion";

// Mock veri - çoklu dil desteği ile
const eventData = {
  id: '1',
  title: {
    tr: 'Kürek Yarışması',
    en: 'Rowing Competition'
  },
  type: 'competition',
  date: '15.03.2024',
  time: '10:00',
  location: {
    tr: 'İstanbul, Maltepe Sahili',
    en: 'Istanbul, Maltepe Coast'
  },
  participants: 30,
  maxParticipants: 50,
  status: 'upcoming',
  description: {
    tr: 'Yıllık kürek yarışması etkinliği. Tüm sporcularımızın katılımını bekliyoruz. Yarışma sonrası ödül töreni ve kokteyl olacaktır.',
    en: 'Annual rowing competition event. We expect all our athletes to participate. There will be an award ceremony and cocktail after the competition.'
  },
  createdAt: '15.01.2024',
  updatedAt: '15.01.2024',
  isRegistered: false
};

export default function EventDetailsPage() {
  const router = useRouter();
  const t = useTranslations('userEventDetails');
  const eventT = useTranslations('userEvents');
  const params = useParams();
  const eventId = params!.id as string;
  const locale = params.locale as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const handleRegister = () => {
    console.log('Etkinliğe kayıt olundu:', eventId);
    setShowRegisterDialog(false);
  };

  return (
    <div className="flex md:flex-row flex-col h-screen bg-[#09090B]">
      <UserSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
      } relative z-0`}>
        <div className="container mx-auto p-4 md:p-8 mt-14 md:mt-0 relative">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Başlık */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.back()}
                  className="h-8 w-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold text-white">{t('title')}</h1>
                  <p className="text-sm text-zinc-400 mt-1">{t('subtitle')}</p>
                </div>
              </div>
            </div>

            {/* Etiketler */}
            <div className="flex items-center gap-2 mt-6">
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                {t(`status.${eventData.status}`)}
              </span>
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">
                {eventT(`event.type.${eventData.type}`)}
              </span>
            </div>

            {/* Detaylar */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar className="w-4 h-4" />
                <span>{t('info.date')}: {eventData.date}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="w-4 h-4" />
                <span>{t('info.time')}: {eventData.time}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4" />
                <span>{t('info.location')}: {eventData.location[locale as keyof typeof eventData.location]}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Users className="w-4 h-4" />
                <span>{eventData.participants}/{eventData.maxParticipants} {t('info.participants')}</span>
              </div>
            </div>

            {/* Açıklama ve Tarihler */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-white mb-2">{t('info.description')}</h3>
              <p className="text-zinc-400 text-sm">
                {eventData.description[locale as keyof typeof eventData.description]}
              </p>
              <div className="mt-4 text-xs text-zinc-500">
                {t('info.createdAt')}: {eventData.createdAt}
              </div>
            </div>

            {/* Katıl Butonu */}
            {!eventData.isRegistered && (
              <Button 
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white h-10 px-8 text-sm font-medium"
                onClick={() => setShowRegisterDialog(true)}
              >
                {t('buttons.join')}
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Katılım Dialog */}
      <AlertDialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <AlertDialogContent className="bg-zinc-900 border border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold text-white">
              {t('dialog.title')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400 mt-3">
              <div className="space-y-2">
                <p className="font-medium text-white">
                  {eventData.title[locale as keyof typeof eventData.title]}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{t('info.date')}: {eventData.date} - {eventData.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{t('info.location')}: {eventData.location[locale as keyof typeof eventData.location]}</span>
                </div>
              </div>
              <p className="mt-4">{t('dialog.confirmMessage')}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700">
              {t('dialog.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRegister}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t('dialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 