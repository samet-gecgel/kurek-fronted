"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Search, Plus, Calendar, Edit2, Trash2, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DatePicker from "@/components/ui/datePicker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
    
import type { IUserNote } from "@/types/user/user";


const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
  ssr: false
});

export default function UserNotes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<IUserNote | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'completed' | 'cancelled'>('pending');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [followUpFilter, setFollowUpFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const itemsPerPage = 5;

  // Örnek veriler
  const notes: IUserNote[] = [
    {
      id: '1',
      userId: '1',
      adminId: '1',
      userFullName: 'Ahmet Yılmaz',
      createdBy: 'Admin Deneme',
      createdAt: new Date('2024-03-15'),
      content: 'Üye sorun çıkarttı. Gelecek hafta görüşülecek.',
      isFollowUp: true,
      followUpDate: new Date('2024-03-22'),
      status: 'pending'
    },
    {
      id: '2',
      userId: '2',
      adminId: '1',
      userFullName: 'Mehmet Demir',
      createdBy: 'Admin Deneme',
      createdAt: new Date('2024-03-14'),
      content: 'Üyelik yenileme talebi var. Kendisiyle görüşülecek.',
      isFollowUp: true,
      followUpDate: new Date('2024-03-20'),
      status: 'pending'
    },
    {
      id: '3',
      userId: '3',
      adminId: '2',
      userFullName: 'Ayşe Kaya',
      createdBy: 'Yönetici Ali',
      createdAt: new Date('2024-03-13'),
      content: 'Ödeme planı revize edildi. 3 taksit yapıldı.',
      isFollowUp: false,
      status: 'completed'
    },
    {
      id: '4',
      userId: '4',
      adminId: '1',
      userFullName: 'Fatma Şahin',
      createdBy: 'Admin Deneme',
      createdAt: new Date('2024-03-12'),
      content: 'Sağlık raporu eksik. Tamamlanması gerekiyor.',
      isFollowUp: true,
      followUpDate: new Date('2024-03-19'),
      status: 'cancelled'
    },
    {
      id: '5',
      userId: '5',
      adminId: '3',
      userFullName: 'Can Yıldız',
      createdBy: 'Yönetici Ayşe',
      createdAt: new Date('2024-03-11'),
      content: 'Özel ders talebi var. Eğitmenle görüşülecek.',
      isFollowUp: true,
      followUpDate: new Date('2024-03-18'),
      status: 'pending'
    },
    {
      id: '6',
      userId: '6',
      adminId: '2',
      userFullName: 'Zeynep Öztürk',
      createdBy: 'Yönetici Ali',
      createdAt: new Date('2024-03-10'),
      content: 'Üyelik dondurma talebi. 2 ay süreyle.',
      isFollowUp: false,
      status: 'completed'
    },
    {
      id: '7',
      userId: '7',
      adminId: '1',
      userFullName: 'Emre Çelik',
      createdBy: 'Admin Deneme',
      createdAt: new Date('2024-03-09'),
      content: 'Spor malzemesi şikayeti iletildi. Kontrol edilecek.',
      isFollowUp: true,
      followUpDate: new Date('2024-03-16'),
      status: 'pending'
    },
    {
      id: '8',
      userId: '8',
      adminId: '3',
      userFullName: 'Selin Arslan',
      createdBy: 'Yönetici Ayşe',
      createdAt: new Date('2024-03-08'),
      content: 'Üyelik yükseltme talebi var. Premium pakete geçiş yapacak.',
      isFollowUp: false,
      status: 'completed'
    }
  ];

  // Notları filtrele ve sırala
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.userFullName.toLowerCase().includes(search.toLowerCase()) ||
      note.createdBy.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    const matchesFollowUp = followUpFilter === 'all' || 
      (followUpFilter === 'yes' && note.isFollowUp) || 
      (followUpFilter === 'no' && !note.isFollowUp);

    return matchesSearch && matchesStatus && matchesFollowUp;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
  });

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);

  // Geçerli sayfadaki notları al
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sayfa değiştiğinde scroll'u yukarı al
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNote = () => {
    // Not ekleme işlemleri
    setIsDialogOpen(false);
  };

//   const handleDeleteNote = (id: string) => {
//     // Not silme işlemleri
//   };

  const handleRowClick = (note: IUserNote) => {
    setSelectedNote(note);
    setIsDetailDialogOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent, note: IUserNote) => {
    e.stopPropagation();
    setSelectedNote(note);
    setIsEditDialogOpen(true);
    setIsFollowUp(note.isFollowUp);
    setSelectedDate(note.followUpDate || null);
    setSelectedStatus(note.status);
  };

  const handleEditNote = () => {
    // Not güncelleme işlemleri
    setIsEditDialogOpen(false);
  };

  // Örnek üye listesi
  const users = [
    {
      id: '1',
      fullName: 'Ahmet Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      phone: '0532 123 4567',
      tcNo: '12345678901'
    },
    {
      id: '2',
      fullName: 'Ayşe Demir',
      email: 'ayse.demir@example.com',
      phone: '0533 234 5678',
      tcNo: '23456789012'
    },
    {
      id: '3',
      fullName: 'Mehmet Kaya',
      email: 'mehmet.kaya@example.com',
      phone: '0534 345 6789',
      tcNo: '34567890123'
    },
    {
      id: '4',
      fullName: 'Zeynep Şahin',
      email: 'zeynep.sahin@example.com',
      phone: '0535 456 7890',
      tcNo: '45678901234'
    }
  ];

  const [userSearch, setUserSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<typeof users>([]);

  // Üye arama fonksiyonu
  const handleUserSearch = (value: string) => {
    setUserSearch(value);
    if (value.length > 0) {
      const filtered = users.filter(user => 
        user.fullName.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.phone.includes(value) ||
        user.tcNo.includes(value)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <MotionDiv 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
        } relative z-0`}
      >
        <main className="w-full p-4 md:p-8 mt-14 md:mt-0">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white text-left">Üye Notları</h1>
              <p className="text-zinc-400 text-left">Üyeler hakkında notları görüntüleyin ve yönetin</p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Yeni Not Ekle
            </Button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            {/* Filtreler */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  placeholder="Not ara..."
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
            {/* Filtre ve Sıralama */}
            <div className="flex flex-wrap gap-4 mb-6">
              {/* Durum Filtresi */}
              <Select value={statusFilter} onValueChange={(value: typeof statusFilter) => setStatusFilter(value)}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white w-full md:w-[200px]">
                  <SelectValue placeholder="Durum Filtrele" />
                </SelectTrigger>
                <SelectContent 
                  className="bg-zinc-900/95 border-zinc-700" 
                  position="popper"
                  sideOffset={5}
                >
                  <SelectItem 
                    value="all" 
                    className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                  >
                    Tüm Durumlar
                  </SelectItem>
                  <SelectItem 
                    value="pending" 
                    className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                  >
                    Bekleyenler
                  </SelectItem>
                  <SelectItem 
                    value="completed" 
                    className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                  >
                    Tamamlananlar
                  </SelectItem>
                  <SelectItem 
                    value="cancelled" 
                    className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                  >
                    İptal Edilenler
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Takip Filtresi */}
              <Select value={followUpFilter} onValueChange={(value: typeof followUpFilter) => setFollowUpFilter(value)}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white w-full md:w-[200px]">
                  <SelectValue placeholder="Takip Filtrele" />
                </SelectTrigger>
                <SelectContent 
                  className="bg-zinc-900/95 border-zinc-700"
                  position="popper"
                  sideOffset={5}
                >
                  <SelectItem 
                    value="all"
                    className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                  >
                    Tümü
                  </SelectItem>
                  <SelectItem 
                    value="yes"
                    className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                  >
                    Takip Edilenler
                  </SelectItem>
                  <SelectItem 
                    value="no"
                    className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                  >
                    Takipsiz Notlar
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: typeof sortBy) => setSortBy(value)}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white w-full md:w-[200px]">
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent 
                  className="bg-zinc-900/95 border-zinc-700"
                  position="popper"
                  sideOffset={5}
                >
                  <SelectItem 
                    value="newest"
                    className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                  >
                    En Yeni
                  </SelectItem>
                  <SelectItem 
                    value="oldest"
                    className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                  >
                    En Eski
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bilgilendirme Mesajı */}
            <div className="flex items-center gap-2 p-3 mb-4 text-sm bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
              <p>Not detaylarını görmek için ilgili satıra tıklayın</p>
            </div>

            {/* Tablo */}
            <div className="relative overflow-x-auto min-h-[500px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900/50">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">Üye</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">Oluşturan</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">Tarih</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">Takip</TableHead>
                    <TableHead className="text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">Durum</TableHead>
                    <TableHead className="text-right text-zinc-400 hover:text-white transition-colors font-medium whitespace-nowrap min-w-[200px]">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedNotes.map((note) => (
                    <tr
                      key={note.id}
                      className="group relative border-zinc-800 cursor-pointer hover:bg-white/3 transition-colors"
                      onClick={() => handleRowClick(note)}
                    >
                      <TableCell className="text-white group-hover:text-blue-400 transition-colors">
                        {note.userFullName}
                      </TableCell>
                      <TableCell className="text-white group-hover:text-white/90 transition-colors">
                        {note.createdBy}
                      </TableCell>
                      <TableCell className="text-white">
                        {note.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {note.isFollowUp && (
                          <div className="flex items-center gap-2">
                            <Bell size={16} className="text-blue-500" />
                            <span className="text-sm text-zinc-400">
                              {note.followUpDate?.toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`
                            ${note.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                              note.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                              'bg-red-500/10 text-red-500'}
                          `}
                        >
                          {note.status === 'pending' ? 'Bekliyor' :
                           note.status === 'completed' ? 'Tamamlandı' : 'İptal'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5"
                            onClick={(e) => handleEditClick(e, note)}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-500/5"
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleDeleteNote(note.id)
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none border-l-2 border-l-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </main>
      </MotionDiv>

      {/* Not Detay Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-zinc-100">
              Not Detayları
            </DialogTitle>
          </DialogHeader>
          
          {selectedNote && (
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-zinc-400">Üye</Label>
                <p className="mt-1 text-white">{selectedNote.userFullName}</p>
              </div>
              
              <div>
                <Label className="text-zinc-400">Not Detayı</Label>
                <p className="mt-1 text-white whitespace-pre-wrap">{selectedNote.content}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-400">Oluşturan</Label>
                  <p className="mt-1 text-white">{selectedNote.createdBy}</p>
                </div>
                
                <div>
                  <Label className="text-zinc-400">Tarih</Label>
                  <p className="mt-1 text-white">
                    {selectedNote.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {selectedNote.isFollowUp && (
                <div>
                  <Label className="text-zinc-400">Takip Tarihi</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Bell size={16} className="text-blue-500" />
                    <span className="text-white">
                      {selectedNote.followUpDate?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
              
              <div>
                <Label className="text-zinc-400">Durum</Label>
                <div className="mt-1">
                  <Badge
                    className={`
                      ${selectedNote.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                        selectedNote.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                        'bg-red-500/10 text-red-500'}
                    `}
                  >
                    {selectedNote.status === 'pending' ? 'Bekliyor' :
                     selectedNote.status === 'completed' ? 'Tamamlandı' : 'İptal'}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setIsDetailDialogOpen(false)}
              className="bg-zinc-800 text-white hover:bg-zinc-700"
            >
              Kapat
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mevcut Not Ekleme Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-zinc-100">
              Yeni Not Ekle
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-zinc-400">Üye Seç</Label>
              <Input
                className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white"
                placeholder="Ad soyad, e-posta, TC kimlik veya telefon ile ara..."
                value={userSearch}
                onChange={(e) => handleUserSearch(e.target.value)}
              />
              {userSearch.length > 0 && (
                <div className="mt-2 bg-zinc-800 border border-zinc-700 rounded-lg max-h-48 overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div
                        key={user.id}
                        className="p-2 hover:bg-zinc-700 cursor-pointer flex flex-col gap-1"
                        onClick={() => {
                          // Seçilen üyeyi işle
                          setUserSearch(user.fullName);
                          setFilteredUsers([]);
                        }}
                      >
                        <div className="text-white">{user.fullName}</div>
                        <div className="text-sm text-zinc-400 flex gap-2">
                          <span>{user.phone}</span>
                          <span>•</span>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-zinc-400 text-center">
                      Üye bulunamadı
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <Label className="text-zinc-400">Not Detayı</Label>
              <Textarea
                className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white min-h-[100px]"
                placeholder="Not detaylarını girin..."
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-white">Takibe Al</Label>
                <p className="text-sm text-zinc-400">
                  Bu not için hatırlatma oluştur
                </p>
              </div>
              <Switch
                checked={isFollowUp}
                onCheckedChange={setIsFollowUp}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            {isFollowUp && (
              <div>
                <Label className="text-zinc-400">Takip Tarihi</Label>
                <div className="relative mt-2">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10" size={20} />
                  <Input
                    readOnly
                    placeholder="Takip tarihi seçin"
                    value={selectedDate ? selectedDate.toLocaleDateString('tr-TR') : ''}
                    className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 cursor-pointer"
                    onClick={() => setShowDatePicker(true)}
                  />
                  {showDatePicker && (
                    <>
                      <div 
                        className="fixed inset-0 bg-transparent" 
                        onClick={() => setShowDatePicker(false)} 
                        style={{ zIndex: 49 }}
                      />
                      <div 
                        className="absolute z-50 bottom-full mb-2" 
                        style={{ 
                          left: '50%', 
                          transform: 'translateX(-50%)' 
                        }}
                      >
                        <DatePicker
                          onDateSelect={(date) => {
                            setSelectedDate(date);
                            setShowDatePicker(false);
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
            >
              İptal
            </Button>
            <Button
              onClick={handleAddNote}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Not Ekle
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Not Düzenleme Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-zinc-100">
              Not Düzenle
            </DialogTitle>
          </DialogHeader>

          {selectedNote && (
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-zinc-400">Üye</Label>
                <p className="mt-1 text-white">{selectedNote.userFullName}</p>
              </div>

              <div>
                <Label className="text-zinc-400">Not Detayı</Label>
                <Textarea
                  className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white min-h-[100px]"
                  defaultValue={selectedNote.content}
                />
              </div>

              <div>
                <Label className="text-zinc-400">Durum</Label>
                <Select value={selectedStatus} onValueChange={(value: 'pending' | 'completed' | 'cancelled') => setSelectedStatus(value)}>
                  <SelectTrigger className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white">
                    <SelectValue placeholder="Durum seçin">
                      {selectedStatus === 'pending' ? 'Bekliyor' :
                       selectedStatus === 'completed' ? 'Tamamlandı' : 'İptal'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-zinc-900 border-zinc-700" 
                    style={{ zIndex: 99999 }}
                  >
                    <SelectItem 
                      value="pending" 
                      className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                    >
                      Bekliyor
                    </SelectItem>
                    <SelectItem 
                      value="completed" 
                      className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                    >
                      Tamamlandı
                    </SelectItem>
                    <SelectItem 
                      value="cancelled" 
                      className="text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                    >
                      İptal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <Label className="text-white">Takibe Al</Label>
                  <p className="text-sm text-zinc-400">
                    Bu not için hatırlatma oluştur
                  </p>
                </div>
                <Switch
                  checked={isFollowUp}
                  onCheckedChange={setIsFollowUp}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>

              {isFollowUp && (
                <div>
                  <Label className="text-zinc-400">Takip Tarihi</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10" size={20} />
                    <Input
                      readOnly
                      placeholder="Takip tarihi seçin"
                      value={selectedDate ? selectedDate.toLocaleDateString('tr-TR') : ''}
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 cursor-pointer"
                      onClick={() => setShowDatePicker(true)}
                    />
                    {showDatePicker && (
                      <>
                        <div 
                          className="fixed inset-0 bg-transparent" 
                          onClick={() => setShowDatePicker(false)} 
                          style={{ zIndex: 49 }}
                        />
                        <div 
                          className="absolute z-50 bottom-full mb-2" 
                          style={{ 
                            left: '50%', 
                            transform: 'translateX(-50%)' 
                          }}
                        >
                          <DatePicker
                            onDateSelect={(date) => {
                              setSelectedDate(date);
                              setShowDatePicker(false);
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
            >
              İptal
            </Button>
            <Button
              onClick={handleEditNote}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Kaydet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 