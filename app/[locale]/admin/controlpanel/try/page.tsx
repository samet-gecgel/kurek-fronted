"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
//import { useTranslations } from 'next-intl';

export default function TryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  //const t = useTranslations('superAdminSidebar');

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <motion.div 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
        } relative z-0`}
      >
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0 relative">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-gradient-to-b from-white via-white/50 to-transparent rounded-full" />
              <div className="flex-1">
                <h1 className="text-lg md:text-xl font-semibold text-white">Deneme Sayfası</h1>
                <p className="text-xs md:text-sm text-zinc-400 mt-0.5">Bu bir deneme sayfasıdır</p>
              </div>
              <Button
                onClick={() => console.log('Kaydet')}
                className="bg-blue-500 hover:bg-blue-600 text-sm"
              >
                Kaydet
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sol Kolon */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
                <h2 className="text-lg font-medium text-white mb-4">Sol Kolon</h2>
                <p className="text-zinc-400">Buraya içerik gelecek</p>
              </Card>
            </div>

            {/* Sağ Kolon */}
            <div className="lg:col-span-8">
              <Card className="bg-zinc-900/50 border-zinc-800/50 p-6">
                <h2 className="text-lg font-medium text-white mb-4">Sağ Kolon</h2>
                <p className="text-zinc-400">Buraya içerik gelecek</p>
              </Card>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}
