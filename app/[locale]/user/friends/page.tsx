"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, UserPlus2, UserMinus2, Plus, Bell, X } from "lucide-react";
import { UserSidebar } from "@/components/layout/user-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface Friend {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isFriend: boolean;
}

interface FriendRequest {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// Örnek veriler
const friends: Friend[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    avatar: 'https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png',
    isFriend: true
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    avatar: 'https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png',
    isFriend: true
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    avatar: 'https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png',
    isFriend: false
  },
  {
    id: '4',
    name: 'Zeynep Şahin',
    email: 'zeynep@example.com',
    isFriend: false
  },
  {
    id: '5',
    name: 'Can Yıldız',
    email: 'can@example.com',
    avatar: 'https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png',
    isFriend: false
  },
  {
    id: '6',
    name: 'Elif Öztürk',
    email: 'elif@example.com',
    isFriend: false
  },
  {
    id: '7',
    name: 'Burak Aydın',
    email: 'burak@example.com',
    avatar: 'https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png',
    isFriend: false
  },
  {
    id: '8',
    name: 'Deniz Kara',
    email: 'deniz@example.com',
    isFriend: false
  },
  {
    id: '9',
    name: 'Selin Aksoy',
    email: 'selin@example.com',
    avatar: 'https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png',
    isFriend: false
  },
  {
    id: '10',
    name: 'Mert Çelik',
    email: 'mert@example.com',
    isFriend: false
  },
  {
    id: '11',
    name: 'İrem Yılmaz',
    email: 'irem@example.com',
    avatar: "",
    isFriend: false
  },
  {
    id: '12',
    name: 'Emre Demir',
    email: 'emre@example.com',
    avatar: 'https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png',
    isFriend: false
  }
];

// Örnek arkadaşlık istekleri
const friendRequests: FriendRequest[] = [
  {
    id: '1',
    sender: {
      id: '5',
      name: 'Can Yıldız',
      avatar: 'https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png'
    },
    status: 'pending',
    createdAt: '2024-02-20'
  },
  {
    id: '2',
    sender: {
      id: '8',
      name: 'Deniz Kara',
      avatar: 'https://cdn.icon-icons.com/icons2/3550/PNG/512/trainer_man_people_avatar_person_icon_224822.png'
    },
    status: 'pending',
    createdAt: '2024-02-19'
  }
];

export default function FriendsPage() {
  const t = useTranslations('userFriends');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addFriendQuery, setAddFriendQuery] = useState('');

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) && friend.isFriend
  );

  const searchResults = friends.filter(friend => 
    friend.name.toLowerCase().includes(addFriendQuery.toLowerCase()) && !friend.isFriend
  );

  const handleAddFriend = (friendId: string) => {
    // API çağrısı yapılacak
    console.log('Add friend:', friendId);
  };

  const handleRemoveFriend = (friendId: string) => {
    // API çağrısı yapılacak
    console.log('Remove friend:', friendId);
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log('İstek kabul edildi:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('İstek reddedildi:', requestId);
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <UserSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="container mx-auto p-8 max-w-[1200px]">
          {/* Üst Başlık */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
              <p className="text-zinc-400 mt-1">{t('subtitle')}</p>
            </div>
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="relative bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-100"
                  >
                    <Bell className="h-5 w-5" />
                    {friendRequests.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                        {friendRequests.length}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white">{t('notifications.title')}</DialogTitle>
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-zinc-800 data-[state=open]:text-zinc-400">
                      <X className="h-4 w-4 text-zinc-100" />
                      <span className="sr-only">{t('notifications.close')}</span>
                    </DialogClose>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {friendRequests.length > 0 ? (
                      <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {friendRequests.map((request) => (
                          <div 
                            key={request.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={request.sender.avatar} />
                                {!request.sender.avatar && (
                                  <AvatarFallback className="bg-blue-500/10 text-blue-500">
                                    {request.sender.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium text-white">{request.sender.name}</div>
                                <div className="text-xs text-zinc-400">
                                  {new Date(request.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleAcceptRequest(request.id)}
                                className="h-8 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                              >
                                {t('requests.accept')}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectRequest(request.id)}
                                className="h-8 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border-zinc-700 transition-colors"
                              >
                                {t('requests.reject')}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-zinc-400">
                        {t('notifications.empty')}
                      </div>
                    )}
                  </div>
                  <DialogFooter className="mt-6">
                    <DialogClose asChild>
                      <Button 
                        variant="outline" 
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border-zinc-700 transition-colors"
                      >
                        {t('notifications.close')}
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 transition-colors w-72"
                  placeholder={t('search.friends')}
                />
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('addFriend.button')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white">{t('addFriend.title')}</DialogTitle>
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-zinc-800 data-[state=open]:text-zinc-400">
                      <X className="h-4 w-4 text-zinc-100" />
                      <span className="sr-only">{t('addFriend.close')}</span>
                    </DialogClose>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                      <Input
                        value={addFriendQuery}
                        onChange={(e) => setAddFriendQuery(e.target.value)}
                        className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800 transition-colors"
                        placeholder={t('search.addFriend')}
                      />
                    </div>
                    
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map((user) => (
                          <div 
                            key={user.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatar} />
                                {!user.avatar && (
                                  <AvatarFallback className="bg-blue-500/10 text-blue-500">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div className="text-sm font-medium text-white">{user.name}</div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleAddFriend(user.id)}
                              className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <UserPlus2 className="w-3.5 h-3.5 mr-1" />
                              {t('addFriend.addButton')}
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-zinc-400">
                          {addFriendQuery ? t('addFriend.noResults') : t('addFriend.startSearch')}
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white hover:text-white border-zinc-700">
                        {t('addFriend.close')}
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Arkadaş Listesi */}
          <div className="grid gap-4">
            {filteredFriends.map((friend) => (
              <Card 
                key={friend.id}
                className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-4 hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={friend.avatar} />
                      {!friend.avatar && (
                        <AvatarFallback className="bg-blue-500/10 text-blue-500">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{friend.name}</h3>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="h-9 w-9 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                    title={t('buttons.remove')}
                  >
                    <UserMinus2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 