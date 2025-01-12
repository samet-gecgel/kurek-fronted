"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserSidebar } from "@/components/layout/user-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useToast } from "@/hooks/use-toast";

interface Level {
  id: string;
  name: string;
  order: number;
  isSelected: boolean;
}

export default function UserLevels() {
  const t = useTranslations('userLevels');
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [levels, setLevels] = useState<Level[]>([
    { id: '1', name: 'İLK DEFA KÜREK ÇEKECEĞİM', order: 1, isSelected: false },
    { id: '2', name: 'DAHA ÖNCE SANDALDA KÜREK ÇEKTİM', order: 2, isSelected: false },
    { id: '3', name: 'TEMEL EĞİTİMİM YARIM KALDI', order: 3, isSelected: false },
    { id: '4', name: 'TEMEL EĞİTİMİMİ TAMAMLADIM', order: 4, isSelected: false },
    { id: '5', name: 'EN AZ BİR YIL BİR KULÜPTE KÜREK ÇEKTİM', order: 5, isSelected: false },
    { id: '6', name: '1X VE 2X TEKNE İLE 10 DAN FAZLA ANTRENMAN YAPTIM', order: 6, isSelected: false },
    { id: '7', name: 'OLİMPİK TEKNEDE 10 DAN FAZLA ANTRENMAN YAPTIM. 1X 2X', order: 7, isSelected: false },
    { id: '8', name: 'BÖLGESEL YARIŞA KATILDIM', order: 8, isSelected: false },
    { id: '9', name: 'ULUSAL YARIŞA KATILDIM', order: 9, isSelected: false },
    { id: '10', name: 'ULUSAL YARIŞTA MADALYA KAZANDIM', order: 10, isSelected: false },
    { id: '11', name: 'ULUSLARARASI YARIŞA KATILDIM', order: 11, isSelected: false },
    { id: '12', name: 'ULUSLARARASI YARIŞTA MADALYA ALDIM', order: 12, isSelected: false },
    { id: '13', name: 'MİLLİ TAKIMDA YER ALDIM', order: 13, isSelected: false },
    { id: '14', name: 'MİLLİ TAKIMDA MADALYA ALDIM', order: 14, isSelected: false },
  ]);

  const handleLevelToggle = (levelId: string) => {
    setLevels(prev => prev.map(level => ({
      ...level,
      isSelected: level.id === levelId ? !level.isSelected : level.isSelected
    })));
  };

  const handleSave = () => {
    // API'ye kaydetme işlemi burada yapılacak
    const selectedLevels = levels.filter(level => level.isSelected);
    console.log('Selected levels:', selectedLevels);
    
    toast({
      title: t('saved'),
      className: "bg-zinc-800 border border-zinc-700 text-white",
    });
  };

  return (
    <div className="flex md:flex-row flex-col h-screen bg-[#09090B]">
      <UserSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <motion.div 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
        } relative z-0`}
      >
        <div className="w-full p-4 md:p-8 mt-14 md:mt-0 relative">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-gradient-to-b from-white via-white/50 to-transparent rounded-full" />
              <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
            </div>
            <p className="text-zinc-400 mt-2 ml-3">{t('subtitle')}</p>
          </motion.div>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <div className="p-4 md:p-6">
              <div className="space-y-2">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleLevelToggle(level.id)}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-all ${
                      level.isSelected
                        ? 'bg-blue-500/20 border-blue-500/50 text-white'
                        : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      level.isSelected
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-zinc-600'
                    }`}>
                      {level.isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-left">{level.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleSave}
                  className="w-full md:w-auto bg-blue-500 hover:bg-blue-600"
                >
                  {t('save')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
} 