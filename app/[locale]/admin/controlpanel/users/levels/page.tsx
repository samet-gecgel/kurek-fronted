"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface Level {
  id: string;
  name: string;
  order: number;
}

export default function UserLevels() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [levels, setLevels] = useState<Level[]>([
    { id: '1', name: 'İLK DEFA KÜREK ÇEKECEĞİM', order: 1 },
    { id: '2', name: 'DAHA ÖNCE SANDALDA KÜREK ÇEKTİM', order: 2 },
    { id: '3', name: 'TEMEL EĞİTİMİM YARIM KALDI', order: 3 },
    { id: '4', name: 'TEMEL EĞİTİMİMİ TAMAMLADIM', order: 4 },
    { id: '5', name: 'EN AZ BİR YIL BİR KULÜPTE KÜREK ÇEKTİM', order: 5 },
    { id: '6', name: '1X VE 2X TEKNE İLE 10 DAN FAZLA ANTRENMAN YAPTIM', order: 6 },
    { id: '7', name: 'OLİMPİK TEKNEDE 10 DAN FAZLA ANTRENMAN YAPTIM. 1X 2X', order: 7 },
    { id: '8', name: 'BÖLGESEL YARIŞA KATILDIM', order: 8 },
    { id: '9', name: 'ULUSAL YARIŞA KATILDIM', order: 9 },
    { id: '10', name: 'ULUSAL YARIŞTA MADALYA KAZANDIM', order: 10 },
    { id: '11', name: 'ULUSLARARASI YARIŞA KATILDIM', order: 11 },
    { id: '12', name: 'ULUSLARARASI YARIŞTA MADALYA ALDIM', order: 12 },
    { id: '13', name: 'MİLLİ TAKIMDA YER ALDIM', order: 13 },
    { id: '14', name: 'MİLLİ TAKIMDA MADALYA ALDIM', order: 14 },
  ]);
  const [newLevel, setNewLevel] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const { toast } = useToast();

  const handleAddLevel = () => {
    if (!newLevel.trim()) return;
    
    const newLevelItem: Level = {
      id: Date.now().toString(),
      name: newLevel.trim(),
      order: levels.length + 1,
    };

    setLevels([...levels, newLevelItem]);
    setNewLevel('');
    
    toast({
      title: "Seviye Eklendi",
      description: "Yeni seviye başarıyla eklendi.",
      className: "bg-zinc-800 border border-zinc-700 text-white",
    });
  };

  const handleUpdateLevel = (id: string) => {
    if (!editingText.trim() || editingText === levels.find(l => l.id === id)?.name) {
      setEditingId(null);
      setEditingText('');
      return;
    }

    setLevels(levels.map(level => 
      level.id === id ? { ...level, name: editingText.trim() } : level
    ));
    setEditingId(null);
    setEditingText('');

    toast({
      title: "Seviye Güncellendi",
      description: "Seviye başarıyla güncellendi.",
      className: "bg-zinc-800 border border-zinc-700 text-white",
    });
  };

  const handleDeleteLevel = (id: string) => {
    setLevels(levels.filter(level => level.id !== id));
    
    toast({
      title: "Seviye Silindi",
      description: "Seviye başarıyla silindi.",
      className: "bg-zinc-800 border border-zinc-700 text-white",
    });
  };

  const startEditing = (level: Level) => {
    setEditingId(level.id);
    setEditingText(level.name);
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <Toaster />
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      }`}>
        <main className="w-full p-3 sm:p-4 md:p-8 mt-14 md:mt-0 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white text-center md:text-left">Üye Seviyeleri</h1>
              <p className="text-zinc-400 text-sm sm:text-base text-center md:text-left">Üye seviyelerini yönetin</p>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 sm:p-4 md:p-6">
            <div className="space-y-6">
              {/* Yeni seviye ekleme */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label className="text-zinc-400">Yeni Seviye</Label>
                  <Input
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Seviye adını girin..."
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleAddLevel}
                  className="bg-blue-500 hover:bg-blue-600 mt-7"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Seviye Ekle
                </Button>
              </div>

              {/* Seviyeler listesi */}
              <div className="space-y-2">
                {levels.map((level) => (
                  <div
                    key={level.id}
                    className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50 group"
                  >
                    {editingId === level.id ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          className="flex-1 bg-zinc-800/50 border-zinc-700 text-white"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          autoFocus
                        />
                        <Button
                          onClick={() => handleUpdateLevel(level.id)}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Güncelle
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
                          onClick={() => {
                            setEditingId(null);
                            setEditingText('');
                          }}
                        >
                          İptal
                        </Button>
                      </div>
                    ) : (
                      <span className="flex-1 text-white">{level.name}</span>
                    )}

                    {!editingId && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10"
                          onClick={() => startEditing(level)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-500/10"
                          onClick={() => handleDeleteLevel(level.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 