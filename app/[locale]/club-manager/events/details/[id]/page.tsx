'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Users2, CreditCard, Pencil, Trash2, ExternalLink } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Event örneği - Gerçek uygulamada API'den gelecek
const event = {
  id: '1',
  title: 'Kürek Yarışması',
  type: 'yarışma',
  date: '15.03.2024',
  time: '10:00',
  location: 'Tuzla, İstanbul',
  mapUrl: 'https://maps.app.goo.gl/6KMCKpzRfhJSYDXE8',
  participants: 30,
  maxParticipants: 50,
  status: 'upcoming',
  description: 'Yıllık kürek yarışması etkinliği. Tüm kulüp üyelerimiz davetlidir. Yarışma sonrası kokteyl düzenlenecektir.',
  isClubOnly: true,
  isPaid: true,
  price: 100,
  paymentTypes: ['credit_card', 'bank_transfer'],
  bankAccount: 'TR12 3456 7890 1234 5678 9012 34'
};

export default function EventDetailsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getPaymentTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      credit_card: 'Kredi Kartı',
      bank_transfer: 'Banka Havalesi',
      cash: 'Nakit',
      multisport: 'Multisport',
      corporate: 'Kurumsal'
    };
    return labels[type] || type;
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
        <div className="container mx-auto p-8">
          {/* Üst Başlık */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8 bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{event.title}</h1>
              <p className="text-zinc-400 mt-1">Etkinlik detaylarını görüntüle ve düzenle</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(`/club-manager/events/details/edit/${event.id}`)}
                className="bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Düzenle
              </Button>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Sil
              </Button>
            </div>
          </div>

          {/* Detay Kartı */}
          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sol Kolon - Temel Bilgiler */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Etkinlik Bilgileri</h2>
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3 text-zinc-400">
                        <Calendar className="w-5 h-5" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-400">
                        <Clock className="w-5 h-5" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-400">
                        <MapPin className="w-5 h-5" />
                        <span>{event.location}</span>
                        {event.mapUrl && (
                          <a 
                            href={event.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-400"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-zinc-400">
                        <Users2 className="w-5 h-5" />
                        <span>{event.participants}/{event.maxParticipants} Katılımcı</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Açıklama</h2>
                    <p className="text-zinc-400 whitespace-pre-wrap">{event.description}</p>
                  </div>
                </div>

                {/* Sağ Kolon - Kayıt ve Ödeme Bilgileri */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Kayıt Bilgileri</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {event.isClubOnly && (
                          <Badge 
                            variant="secondary" 
                            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20 transition-colors"
                          >
                            Kulübe Özel
                          </Badge>
                        )}
                        {event.isPaid && (
                          <Badge 
                            variant="secondary" 
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/20 transition-colors"
                          >
                            Ücretli
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {event.isPaid && (
                    <div>
                      <h2 className="text-lg font-semibold text-white mb-4">Ödeme Bilgileri</h2>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-zinc-400">
                          <CreditCard className="w-5 h-5" />
                          <span>{event.price} TL</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-zinc-400 mb-2">Ödeme Seçenekleri</h3>
                          <div className="flex flex-wrap gap-2">
                            {event.paymentTypes?.map((type) => {
                              const getBadgeColors = (type: string) => {
                                const colors = {
                                  credit_card: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-blue-500/20',
                                  bank_transfer: 'bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/20',
                                  cash: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20',
                                  multisport: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 border-purple-500/20',
                                  corporate: 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 border-indigo-500/20'
                                };
                                return colors[type as keyof typeof colors] || 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300 border-zinc-700';
                              };

                              return (
                                <Badge 
                                  key={type}
                                  variant="secondary" 
                                  className={`${getBadgeColors(type)} transition-colors`}
                                >
                                  {getPaymentTypeLabel(type)}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                        {event.paymentTypes?.includes('bank_transfer') && (
                          <div>
                            <h3 className="text-sm font-medium text-zinc-400 mb-2">IBAN</h3>
                            <div className="p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg border border-zinc-700/50 transition-colors">
                              <code className="text-zinc-300 font-mono">{event.bankAccount}</code>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 