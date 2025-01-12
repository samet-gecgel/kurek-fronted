"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TimePicker } from "@/components/ui/time-picker";

interface Reservation {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
}

// Örnek veri
const RESERVATIONS = [
  {
    id: "1",
    name: "Sabah Antrenmanı",
    startTime: "07:00",
    endTime: "08:30",
    duration: 90,
  },
  {
    id: "2",
    name: "Öğle Antrenmanı",
    startTime: "12:00",
    endTime: "13:30",
    duration: 90,
  }
];

export default function ReservationsList() {
  const t = useTranslations('reservationSettings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 10;

  // Boş form verisi
  const emptyFormData = {
    name: "",
    startTime: "06:00",
    endTime: "22:00",
    duration: 60
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData(emptyFormData); // Formu sıfırla
    setIsDialogOpen(false);
    setEditingReservation(null);
  };

  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setFormData({
      name: reservation.name,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      duration: reservation.duration
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setFormData(emptyFormData); // Formu sıfırla
    setEditingReservation(null);
    setIsDialogOpen(true);
  };

  const filteredReservations = RESERVATIONS.filter((reservation) =>
    reservation.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
              <p className="text-zinc-400 mt-1">{t('subtitle')}</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              if (!open) {
                setFormData(emptyFormData);
                setEditingReservation(null);
              }
              setIsDialogOpen(open);
            }}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
                  onClick={handleAddNew}
                >
                  <Plus size={20} className="mr-2" />
                  {t('addNew')}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingReservation ? t('dialog.editTitle') : t('dialog.addTitle')}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label>{t('form.name')}</Label>
                    <Input
                      className="bg-zinc-800/50 border-zinc-700 text-white"
                      placeholder={t('form.namePlaceholder')}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('form.startTime')}</Label>
                      <TimePicker
                        value={formData.startTime}
                        onChange={(value) => setFormData({...formData, startTime: value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.endTime')}</Label>
                      <TimePicker
                        value={formData.endTime}
                        onChange={(value) => setFormData({...formData, endTime: value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('form.duration')}</Label>
                    <Input
                      type="number"
                      className="bg-zinc-800/50 border-zinc-700 text-white"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setFormData(emptyFormData);
                        setEditingReservation(null);
                      }}
                      className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      {t('form.buttons.cancel')}
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      {editingReservation ? t('form.buttons.save') : t('form.buttons.add')}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800/50">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white w-full"
                  placeholder={t('search')}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="relative overflow-x-auto min-h-[500px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900/50">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">
                      {t('table.name')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[100px]">
                      {t('table.startTime')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[100px]">
                      {t('table.endTime')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[100px]">
                      {t('table.duration')}
                    </TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[100px] text-right">
                      {t('actions.title')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedReservations.map((reservation) => (
                    <TableRow 
                      key={reservation.id}
                      className="group relative border-zinc-800 cursor-pointer hover:bg-white/3 transition-colors"
                    >
                      <TableCell className="text-white group-hover:text-blue-400 transition-colors">
                          
                          {reservation.name}
                        
                      </TableCell>
                      <TableCell className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">{reservation.startTime}</TableCell>
                      <TableCell className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">{reservation.endTime}</TableCell>
                      <TableCell className="text-white group-hover:text-white/90 transition-colors whitespace-nowrap">{reservation.duration}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(reservation);
                            }}
                            title={t('actions.edit')}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-500/5 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Silme işlemi
                            }}
                            title={t('actions.delete')}
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

            {totalPages > 1 && (
              <div className="p-6 border-t border-zinc-800/50 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 