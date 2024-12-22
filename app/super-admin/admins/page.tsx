"use client";

import { useState } from "react";
import { Plus, Search, Trash2, Shield, Eye, EyeOff } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
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
import { Switch } from "@/components/ui/switch";

interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  isSuperAdmin: boolean; // Ana super-admin kontrolü
  createdAt: string;
}

// Örnek veriler
const admins: Admin[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@admin.com',
    password: '123456',
    isSuperAdmin: true, // Ana super-admin
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mehmet Demir',
    email: 'mehmet@admin.com',
    password: '123456',
    isSuperAdmin: false, // Normal admin
    createdAt: '2024-02-01'
  }
];

// Örnek olarak mevcut kullanıcının ana super-admin olduğunu varsayalım
const currentUserIsSuperAdmin = true;

export default function AdminsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    isSuperAdmin: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAdmin = () => {
    console.log('Yeni admin:', newAdmin);
    setIsAddDialogOpen(false);
    setNewAdmin({ name: '', email: '', password: '', isSuperAdmin: false });
  };

  const handleDeleteAdmin = (id: string) => {
    // Silme işlemi burada yapılabilir
    console.log('Admin silindi:', id);
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="container mx-auto p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Yöneticiler</h1>
              <p className="text-zinc-400 mt-1">Sistem yöneticilerini görüntüle ve yönet</p>
            </div>
            {currentUserIsSuperAdmin && (
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
                      <DialogTitle className="text-xl font-semibold text-white">Yeni Yönetici Ekle</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium text-zinc-400">Ad Soyad</label>
                        <Input 
                          value={newAdmin.name}
                          onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                          className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white" 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400">Email</label>
                        <Input 
                          value={newAdmin.email}
                          onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                          className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white" 
                          type="email" 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-400">Şifre</label>
                        <div className="relative">
                          <Input 
                            value={newAdmin.password}
                            onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                            className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-white pr-10" 
                            type={showPassword ? "password" : "text"}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-300 rounded-md"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">
                          Ana Yönetici Yetkisi
                        </label>
                        <Switch
                          checked={newAdmin.isSuperAdmin}
                          onCheckedChange={(checked) => setNewAdmin({...newAdmin, isSuperAdmin: checked})}
                        />
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
                      <Button onClick={handleAddAdmin} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Kaydet
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          <div className="grid gap-4">
            {filteredAdmins.map((admin) => (
              <Card key={admin.id} className="bg-zinc-900/50 border-zinc-800/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="text-blue-500 font-medium">
                        {admin.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-medium">{admin.name}</h3>
                        {admin.isSuperAdmin && (
                          <div className="tooltip" data-tip="Ana Yönetici">
                            <Shield className="w-4 h-4 text-blue-500" />
                          </div>
                        )}
                      </div>
                      <p className="text-zinc-400 text-sm">{admin.email}</p>
                    </div>
                  </div>
                  {currentUserIsSuperAdmin && !admin.isSuperAdmin && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 