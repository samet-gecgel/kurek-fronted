'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Örnek veri
const INITIAL_INCOME_TYPES = [
  { id: '1', name: 'Üyelik Ödemesi' },
  { id: '2', name: 'Ders Ücreti' },
  { id: '3', name: 'Ekipman Satışı' },
];

export default function IncomeTypesPage() {
  const t = useTranslations('income');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [incomeTypes, setIncomeTypes] = useState(INITIAL_INCOME_TYPES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<{ id: string; name: string } | null>(null);
  const [typeName, setTypeName] = useState('');

  const handleOpenDialog = (type?: { id: string; name: string }) => {
    if (type) {
      setEditingType(type);
      setTypeName(type.name);
    } else {
      setEditingType(null);
      setTypeName('');
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!typeName.trim()) return;

    if (editingType) {
      // Düzenleme
      setIncomeTypes(prev => prev.map(type => 
        type.id === editingType.id ? { ...type, name: typeName } : type
      ));
    } else {
      // Yeni ekleme
      const newType = {
        id: Date.now().toString(),
        name: typeName
      };
      setIncomeTypes(prev => [...prev, newType]);
    }

    setIsDialogOpen(false);
    setTypeName('');
    setEditingType(null);
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      } relative z-0`}>
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">{t('types.title')}</h1>
              <p className="text-zinc-400 mt-1">{t('types.subtitle')}</p>
            </div>
            
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
            >
              <Plus size={20} className="mr-2" />
              {t('types.addIncomeType')}
            </Button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
            <div className="relative overflow-x-auto min-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium">
                      {t('form.incomeType')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium text-right">
                      {t('actions.title')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeTypes.map((type) => (
                    <TableRow 
                      key={type.id}
                      className="group border-zinc-800 cursor-pointer hover:bg-white/3 transition-colors"
                    >
                      <TableCell>
                        <div className="text-white group-hover:text-blue-400 transition-colors">
                          {type.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDialog(type);
                            }}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-500/5 transition-colors"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              {editingType ? t('types.editType') : t('types.addIncomeType')}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              placeholder={t('types.enterType')}
              className="bg-zinc-800/50 border-zinc-700 text-white"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              {t('actions.cancel')}
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingType ? t('actions.save') : t('actions.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}