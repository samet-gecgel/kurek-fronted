"use client";

import { useState, useEffect, useRef } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, X } from "lucide-react";
import { IUser } from "@/types/user/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Örnek kullanıcılar
const users: IUser[] = [
  {
    id: '1',
    fullName: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '0532 123 4567',
    photo: 'https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png',
    membershipType: 'individual',
    isActive: true,
    birthDate: new Date(),
    gender: 'male',
    identityNumber: '12345678901',
    birthPlace: 'İstanbul',
    bloodType: 'A+',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    fullName: 'Mehmet Demir',
    email: 'mehmet@example.com',
    phone: '0533 234 5678',
    photo: 'https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png',
    membershipType: 'individual',
    isActive: true,
    birthDate: new Date(),
    gender: 'male',
    identityNumber: '23456789012',
    birthPlace: 'Ankara',
    bloodType: 'A+',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    fullName: 'Ayşe Yıldız',
    email: 'ayse@example.com',
    phone: '0534 345 6789',
    photo: null,
    membershipType: 'individual',
    isActive: true,
    birthDate: new Date(),
    gender: 'female',
    identityNumber: '34567890123',
    birthPlace: 'İzmir',
    bloodType: 'A+',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// İsmin baş harflerini alma fonksiyonu
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

export default function UserGroups() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [search, setSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<IUser[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Dışarı tıklamayı dinle
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setFilteredUsers([]);
        if (!selectedUser) setUserSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedUser]);

  // Kullanıcı arama
  const handleUserSearch = (value: string) => {
    setUserSearch(value);
    if (selectedUser && value !== selectedUser.fullName) {
      setSelectedUser(null);
    }

    if (value.length > 0) {
      const filtered = users.filter(user => 
        user.fullName.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.phone.includes(value) ||
        user.identityNumber.includes(value)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  // Seçili kullanıcıyı kaldır
  const handleRemoveSelectedUser = () => {
    setSelectedUser(null);
    setUserSearch('');
    setSelectedFriends([]);
  };

  // Arkadaş seçme
  const handleSelectFriend = (user: IUser) => {
    if (!selectedFriends.find(f => f.id === user.id)) {
      setSelectedFriends([...selectedFriends, user]);
      setSearch('');
    }
  };

  // Arkadaş seçimini kaldırma
  const handleRemoveFriend = (userId: string) => {
    setSelectedFriends(selectedFriends.filter(f => f.id !== userId));
  };

  // Arkadaşlık isteklerini gönderme
  const handleSendRequests = () => {
    if (!selectedUser) return;
    
    // Seçili kullanıcı adına arkadaşlık isteklerini gönder
    selectedFriends.forEach(friend => {
      console.log(`${selectedUser.fullName} -> ${friend.fullName} arkadaşlık isteği gönderildi`);
    });

    // Başarı mesajını göster
    toast({
      title: "İstekler Gönderildi",
      description: `${selectedFriends.length} adet arkadaşlık isteği başarıyla gönderildi.`,
      className: "bg-zinc-800 border border-zinc-700 text-white",
    });

    setSelectedUser(null);
    setSelectedFriends([]);
    setSearch('');
    setUserSearch('');
  };

  // Arkadaş seçimi için arama ve filtreleme
  const getFilteredFriends = () => {
    if (!selectedUser) return [];
    if (!search) return [];
    
    return users.filter(user => 
      // Kendisi ve zaten seçili arkadaşlar hariç
      user.id !== selectedUser.id &&
      !selectedFriends.find(f => f.id === user.id) &&
      // Arama kriterleri
      (user.fullName.toLowerCase().includes(search.toLowerCase()) ||
       user.email.toLowerCase().includes(search.toLowerCase()) ||
       user.phone.includes(search) ||
       user.identityNumber.includes(search))
    );
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
              <h1 className="text-xl sm:text-2xl font-bold text-white text-center md:text-left">Arkadaşlık İstekleri</h1>
              <p className="text-zinc-400 text-sm sm:text-base text-center md:text-left">Üyeler arası arkadaşlık isteklerini yönetin</p>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 sm:p-4 md:p-6">
            <div className="space-y-6">
              {/* Kullanıcı seçimi */}
              <div ref={searchContainerRef}>
                <Label className="text-zinc-400">İstek Gönderecek Üye</Label>
                <Input
                  className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white"
                  placeholder="Ad soyad, e-posta veya telefon ile ara..."
                  value={selectedUser ? selectedUser.fullName : userSearch}
                  onChange={(e) => handleUserSearch(e.target.value)}
                />
                {userSearch.length > 0 && !selectedUser && (
                  <div className="mt-2 bg-zinc-800 border border-zinc-700 rounded-lg max-h-48 overflow-y-auto">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <div
                          key={user.id}
                          className="p-2 sm:p-3 hover:bg-zinc-700/50 cursor-pointer flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 transition-colors duration-200 border-b border-zinc-700/50 last:border-0"
                          onClick={() => {
                            setSelectedUser(user);
                            setUserSearch('');
                            setFilteredUsers([]);
                          }}
                        >
                          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                            <AvatarImage src={user.photo || undefined} />
                            <AvatarFallback className="bg-blue-500/10 text-blue-500">
                              {getInitials(user.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm sm:text-base text-white truncate">{user.fullName}</div>
                            <div className="text-xs sm:text-sm text-zinc-400 flex flex-wrap gap-1 sm:gap-2">
                              <span className="truncate">{user.phone}</span>
                              <span>•</span>
                              <span className="truncate">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 sm:p-3 text-xs sm:text-sm text-zinc-400 text-center">
                        Üye bulunamadı
                      </div>
                    )}
                  </div>
                )}
                
                {/* Seçili kullanıcı kartı */}
                {selectedUser && !userSearch && (
                  <div className="mt-2 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                    <div className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4 bg-zinc-800/90 relative flex-wrap sm:flex-nowrap">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedUser.photo || undefined} />
                        <AvatarFallback className="bg-blue-500/10 text-blue-500">
                          {getInitials(selectedUser.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-base sm:text-lg font-medium text-white truncate">
                          {selectedUser.fullName}
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-400 flex flex-wrap gap-1 sm:gap-2">
                          <span className="truncate">{selectedUser.phone}</span>
                          <span>•</span>
                          <span className="truncate">{selectedUser.email}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveSelectedUser}
                        className="text-zinc-400 hover:text-red-500 p-1.5 hover:bg-zinc-700/50 rounded-full transition-colors duration-200"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Arkadaş seçimi */}
              {selectedUser && (
                <div>
                  <Label className="text-zinc-400">Arkadaş Olarak Eklenecek Üyeler</Label>
                  <Input
                    className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Ad soyad, e-posta veya telefon ile ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                   {/* Arama sonuçları */}
                  {selectedUser && (
                    <>
                    {search.length > 0 && (
                    <div className="mt-2 bg-zinc-800 border border-zinc-700 rounded-lg max-h-48 overflow-y-auto">
                      {getFilteredFriends().length > 0 ? (
                        getFilteredFriends().map(user => (
                          <div
                            key={user.id}
                            className="p-2 sm:p-3 hover:bg-zinc-700/50 cursor-pointer flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 transition-colors duration-200 border-b border-zinc-700/50 last:border-0"
                            onClick={() => handleSelectFriend(user)}
                          >
                            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                              <AvatarImage src={user.photo || undefined} />
                              <AvatarFallback className="bg-blue-500/10 text-blue-500">
                                {getInitials(user.fullName)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm sm:text-base text-white truncate">{user.fullName}</div>
                              <div className="text-xs sm:text-sm text-zinc-400 flex flex-wrap gap-1 sm:gap-2">
                                <span className="truncate">{user.phone}</span>
                                <span>•</span>
                                <span className="truncate">{user.email}</span>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors duration-200"
                            >
                              <UserPlus size={14} className="sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 sm:p-3 text-xs sm:text-sm text-zinc-400 text-center">
                          Üye bulunamadı
                        </div>
                      )}
                    </div>
                    )}
                    </>
                  )}
                  
                  {/* Seçili arkadaşlar */}
                  <h1 className="text-white text-base sm:text-lg font-bold mt-6 sm:mt-10">Seçili Arkadaşlar</h1>
                  {selectedFriends.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
                      {selectedFriends.map(friend => (
                        <div
                          key={friend.id}
                          className="flex items-center gap-2 sm:gap-3 bg-zinc-800/50 p-2 sm:p-3 rounded-lg border border-zinc-700/50"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={friend.photo || undefined} />
                            <AvatarFallback className="bg-blue-500/10 text-blue-500">
                              {getInitials(friend.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="text-white truncate">{friend.fullName}</div>
                            <div className="text-xs sm:text-sm text-zinc-400 flex gap-1 sm:gap-2">
                              <span className="truncate">{friend.phone}</span>
                              <span>•</span>
                              <span className="truncate">{friend.email}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveFriend(friend.id)}
                            className="text-zinc-400 hover:text-red-500 p-1.5 hover:bg-red-500/10 rounded-full transition-colors duration-200"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                 
                </div>
              )}
            </div>

            {selectedUser && selectedFriends.length > 0 && (
              <div className="flex justify-end gap-3 mt-4 sm:mt-6">
                <Button
                  onClick={handleSendRequests}
                  className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
                >
                  İstekleri Gönder
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 