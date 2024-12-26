'use client';

import { useState } from "react";
import { Plus, Search, Trash2, Eye, EyeOff } from "lucide-react";
import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OfficeManager {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function OfficeManagersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Mock data
  const [managers] = useState<OfficeManager[]>([
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',
      createdAt: '2024-02-01'
    }
  ]);

  const handleAddManager = () => {
    console.log('Yeni ofis sorumlusu:', newManager);
    setIsAddDialogOpen(false);
    setNewManager({ name: '', email: '', password: '' });
  };

  const handleDeleteManager = (id: string) => {
    console.log('Ofis sorumlusu silindi:', id);
  };

  const filteredManagers = managers.filter(manager =>
    manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Ofis Sorumluları</h1>
              <p className="text-zinc-400 mt-1">Ofis sorumlularını görüntüle ve yönet</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-800/50 border-zinc-700/50 text-white w-[300px]"
                  placeholder="İsim veya email ile ara..."
                />
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Yönetici Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white">
                      Yeni Ofis Sorumlusu Ekle
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium text-zinc-400">Ad Soyad</label>
                      <Input 
                        value={newManager.name}
                        onChange={(e) => setNewManager({...newManager, name: e.target.value})}
                        className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-400">Email</label>
                      <Input 
                        value={newManager.email}
                        onChange={(e) => setNewManager({...newManager, email: e.target.value})}
                        className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white" 
                        type="email" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-400">Şifre</label>
                      <div className="relative">
                        <Input 
                          value={newManager.password}
                          onChange={(e) => setNewManager({...newManager, password: e.target.value})}
                          className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white pr-10" 
                          type={showPassword ? "text" : "password"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-300 rounded-md"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)} 
                      className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300 hover:text-white"
                    >
                      İptal
                    </Button>
                    <Button onClick={handleAddManager} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Kaydet
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredManagers.map((manager) => (
              <Card key={manager.id} className="bg-zinc-900/50 border-zinc-800/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="text-blue-500 font-medium">
                        {manager.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{manager.name}</h3>
                      <p className="text-zinc-400 text-sm">{manager.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteManager(manager.id)}
                    className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
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