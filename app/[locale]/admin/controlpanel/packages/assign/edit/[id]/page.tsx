"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PackageFormData, PackageFormValidation, PackageDurationType } from "@/types/packages/package";
import { cn } from "@/lib/utils";

export default function EditPackage({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState<PackageFormData>({
    name: "",
    duration: 1,
    durationType: PackageDurationType.MONTH,
    credits: 1,
    price: 0,
    isActive: true,
    level: ""
  });

  const [errors, setErrors] = useState<PackageFormValidation>({});

  useEffect(() => {
    // Simüle edilmiş veri yükleme
    const fetchPackageData = async () => {
      try {
        // API çağrısı yapılacak
        // const response = await fetch(`/api/packages/${params.id}`);
        // const data = await response.json();
        
        // Örnek veri
        const data = {
          name: "Başlangıç Paketi",
          duration: 1,
          durationType: PackageDurationType.MONTH,
          credits: 8,
          price: 1500,
          isActive: true,
          level: "Başlangıç"
        };

        setFormData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching package data:', error);
        router.push('/admin/controlpanel/packages/assign');
      }
    };

    fetchPackageData();
  }, [params.id]);

  const handleChange = (field: keyof PackageFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: PackageFormValidation = {};

    if (!formData.name) newErrors.name = "Paket adı zorunludur";
    if (!formData.duration) newErrors.duration = "Süre zorunludur";
    if (!formData.durationType) newErrors.durationType = "Süre tipi zorunludur";
    if (!formData.credits) newErrors.credits = "Kullanım hakkı zorunludur";
    if (!formData.price) newErrors.price = "Fiyat zorunludur";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // API çağrısı yapılacak
      // await fetch(`/api/packages/${params.id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(formData)
      // });
      
      console.log("Updated form data:", formData);
      router.push('/admin/controlpanel/packages/assign');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      }`}>
        <main className="p-4 md:p-8 mt-14 md:mt-0">
          <Button
            variant="ghost"
            className="mb-6 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>

          <div className="max-w-2xl mx-auto bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h1 className="text-xl font-bold text-white mb-6">Paketi Düzenle</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form alanları add sayfası ile aynı */}
              <div className="space-y-2">
                <Label className="text-zinc-400">Paket Adı</Label>
                <Input 
                  className={cn(
                    "bg-zinc-800/50 border-zinc-700 text-white",
                    errors.name && "border-red-500"
                  )}
                  placeholder="Paket adını girin"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">{errors.name}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-400">Süre</Label>
                  <Input 
                    type="number"
                    min="1"
                    className={cn(
                      "bg-zinc-800/50 border-zinc-700 text-white",
                      errors.duration && "border-red-500"
                    )}
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                  />
                  {errors.duration && (
                    <span className="text-sm text-red-500">{errors.duration}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-400">Süre Tipi</Label>
                  <Select
                    value={formData.durationType}
                    onValueChange={(value) => handleChange('durationType', value)}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Süre tipi seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem 
                        value={PackageDurationType.DAY}
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white"
                      >
                        Gün
                      </SelectItem>
                      <SelectItem 
                        value={PackageDurationType.MONTH}
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white"
                      >
                        Ay
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.durationType && (
                    <span className="text-sm text-red-500">{errors.durationType}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-400">Kullanım Hakkı (Kredi)</Label>
                <Input 
                  type="number"
                  min="1"
                  className={cn(
                    "bg-zinc-800/50 border-zinc-700 text-white",
                    errors.credits && "border-red-500"
                  )}
                  value={formData.credits}
                  onChange={(e) => handleChange('credits', parseInt(e.target.value))}
                />
                {errors.credits && (
                  <span className="text-sm text-red-500">{errors.credits}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-400">Fiyat (₺)</Label>
                <Input 
                  type="number"
                  min="0"
                  step="0.01"
                  className={cn(
                    "bg-zinc-800/50 border-zinc-700 text-white",
                    errors.price && "border-red-500"
                  )}
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                />
                {errors.price && (
                  <span className="text-sm text-red-500">{errors.price}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-400">Seviye (Opsiyonel)</Label>
                <Input 
                  className="bg-zinc-800/50 border-zinc-700 text-white"
                  placeholder="Seviye bilgisi girin"
                  value={formData.level || ""}
                  onChange={(e) => handleChange('level', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  className="rounded border-zinc-700 bg-zinc-800/50"
                  checked={formData.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                />
                <Label htmlFor="isActive" className="text-zinc-400">Paket Aktif</Label>
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Değişiklikleri Kaydet
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
} 