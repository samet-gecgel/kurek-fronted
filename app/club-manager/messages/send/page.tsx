'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock veriler
const groups = [
  { id: 1, name: 'Tüm Üyeler', count: 150 },
  { id: 2, name: 'Sporcular', count: 80 },
  { id: 3, name: 'Antrenörler', count: 20 },
  { id: 4, name: 'Yöneticiler', count: 10 }
];

export default function SendMessagePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    group: '',
    title: '',
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API'ye gönderme işlemi burada yapılacak
    console.log('Mesaj gönderildi:', formData);
    router.push('/club-manager/messages');
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Yeni Mesaj</h1>
              <p className="text-zinc-400 text-sm">Üyelere toplu mesaj gönderimi yapın</p>
            </div>
          </div>

          {/* Form */}
          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Alıcı Grubu */}
                <div className="space-y-2">
                  <Label className="text-gray-200">
                    Alıcı Grubu
                  </Label>
                  <Select
                    value={formData.group}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, group: value }))}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 text-white">
                      <SelectValue placeholder="Grup seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      {groups.map(group => (
                        <SelectItem 
                          key={group.id} 
                          value={group.id.toString()}
                          className="text-zinc-100 hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{group.name}</span>
                            <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full">
                              {group.count}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mesaj Başlığı */}
                <div className="space-y-2">
                  <Label className="text-gray-200">
                    Mesaj Başlığı
                  </Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Mesaj başlığını girin"
                    className="bg-zinc-800/50 border-zinc-700/50 text-white"
                  />
                </div>

                {/* Mesaj İçeriği */}
                <div className="space-y-2">
                  <Label className="text-gray-200">
                    Mesaj İçeriği
                  </Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Mesajınızı yazın"
                    className="bg-zinc-800/50 border-zinc-700/50 text-white min-h-[200px]"
                  />
                </div>

                {/* Gönder Butonu */}
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 text-sm flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    Gönder
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 