'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Search, Plus, Users, Calendar } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock veriler
const messages = [
  {
    id: 1,
    title: 'Haftalık Antrenman Programı',
    content: 'Bu haftaki antrenman programı değişikliği hakkında bilgilendirme...',
    sentTo: 'Tüm Üyeler',
    date: '2024-03-15',
    recipientCount: 150,
    status: 'sent'
  },
  {
    id: 2,
    title: 'Yeni Kurs Duyurusu',
    content: 'Yeni başlayacak olan kürek kursu hakkında detaylı bilgilendirme...',
    sentTo: 'Sporcular',
    date: '2024-03-14',
    recipientCount: 80,
    status: 'scheduled'
  }
];

export default function MessagesPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Mesajlar</h1>
              <p className="text-zinc-400 text-sm">Gönderilen mesajları görüntüleyin ve yönetin</p>
            </div>
            <Button 
              onClick={() => router.push('/club-manager/messages/send')}
              className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 text-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Yeni Mesaj
            </Button>
          </div>

          {/* Arama */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Mesajlarda ara..."
                className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white w-full"
              />
            </div>
          </div>

          {/* Mesaj Listesi */}
          <div className="space-y-4">
            {messages.map(message => (
              <Card key={message.id} className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                          {message.title}
                        </h3>
                        <div className="flex items-center ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            message.status === 'sent'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : 'bg-blue-500/10 text-blue-500'
                          }`}>
                            {message.status === 'sent' ? 'Gönderildi' : 'Planlandı'}
                          </span>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-sm line-clamp-2">{message.content}</p>
                      <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Users className="w-3.5 h-3.5" />
                          <span>{message.sentTo}</span>
                          <span className="mx-1.5">•</span>
                          <span>{message.recipientCount} kişi</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(message.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>
                    </div>
                    <Mail className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors mt-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}