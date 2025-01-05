"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ImageIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BoatBranch, BoatFormData, BoatFormValidation } from "@/types/boat/boat";
import { cn } from "@/lib/utils";

// Enum değerlerini array'e çevirme
const BRANCHES = Object.values(BoatBranch);

export default function EditBoat({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  
  const [formData, setFormData] = useState<BoatFormData>({
    name: "",
    serialNumber: "",
    year: new Date().getFullYear(),
    branch: BoatBranch.KUREK,
    class: "",
    capacity: 1,
    brand: "",
    images: []
  });

  const [errors, setErrors] = useState<BoatFormValidation>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBoatData = async () => {
      try {
        // API'den tekne verilerini çek
        // const response = await fetch(`/api/boats/${params.id}`);
        // const data = await response.json();
        
        // Örnek veri
        const data = {
          name: "Örnek Tekne",
          serialNumber: "KRK-2023-001",
          year: 2023,
          branch: BoatBranch.KUREK,
          class: "1X",
          capacity: 1,
          brand: "Filippi",
          images: []
        };

        setFormData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching boat data:', error);
        router.push('/admin/controlpanel/boats');
      }
    };

    fetchBoatData();
  }, [params.id, router]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (formData.images.length >= 3) {
        alert("En fazla 3 fotoğraf yükleyebilirsiniz");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Dosya boyutu 5MB'dan küçük olmalıdır");
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert("Lütfen geçerli bir resim dosyası yükleyin");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field: keyof BoatFormData, value: string | number | BoatBranch) => {
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
    const newErrors: BoatFormValidation = {};

    if (!formData.name) newErrors.name = "Tekne adı zorunludur";
    if (!formData.serialNumber) newErrors.serialNumber = "Seri no zorunludur";
    if (!formData.year) newErrors.year = "Üretim yılı zorunludur";
    if (!formData.branch) newErrors.branch = "Branş seçimi zorunludur";
    if (!formData.class) newErrors.class = "Tekne sınıfı zorunludur";
    if (!formData.capacity) newErrors.capacity = "Kişi sayısı zorunludur";
    if (!formData.brand) newErrors.brand = "Marka zorunludur";
    if (formData.images.length === 0) newErrors.images = "En az bir fotoğraf zorunludur";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // API çağrısı yapılacak
      // await fetch(`/api/boats/${params.id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(formData)
      // });
      
      console.log("Updated form data:", formData);
      router.push('/admin/controlpanel/boats');
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

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h1 className="text-xl font-bold text-white mb-6">Tekne Düzenle</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-zinc-400">Branş</Label>
                <Select 
                  value={formData.branch} 
                  onValueChange={(value) => handleChange('branch', value as BoatBranch)}
                >
                  <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                    <SelectValue placeholder="Branş seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {BRANCHES.map((branch: BoatBranch) => (
                      <SelectItem
                        key={branch}
                        value={branch}
                        className="text-zinc-100 focus:bg-zinc-700 focus:text-white cursor-pointer"
                      >
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.branch && (
                  <span className="text-sm text-red-500">{errors.branch}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-400">Tekne Adı</Label>
                <Input 
                  className={cn(
                    "bg-zinc-800/50 border-zinc-700 text-white",
                    errors.name && "border-red-500"
                  )}
                  placeholder="Tekne adını girin"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">{errors.name}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-400">Tekne Seri No</Label>
                <Input 
                  className={cn(
                    "bg-zinc-800/50 border-zinc-700 text-white",
                    errors.serialNumber && "border-red-500"
                  )}
                  placeholder="Seri numarasını girin"
                  value={formData.serialNumber}
                  onChange={(e) => handleChange('serialNumber', e.target.value)}
                />
                {errors.serialNumber && (
                  <span className="text-sm text-red-500">{errors.serialNumber}</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-400">Üretim Yılı</Label>
                  <Input 
                    type="number"
                    className={cn(
                      "bg-zinc-800/50 border-zinc-700 text-white",
                      errors.year && "border-red-500"
                    )}
                    placeholder="Üretim yılını girin"
                    value={formData.year}
                    onChange={(e) => handleChange('year', parseInt(e.target.value))}
                  />
                  {errors.year && (
                    <span className="text-sm text-red-500">{errors.year}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-400">Kişi Sayısı</Label>
                  <Input 
                    type="number"
                    className={cn(
                      "bg-zinc-800/50 border-zinc-700 text-white",
                      errors.capacity && "border-red-500"
                    )}
                    placeholder="Kişi sayısını girin"
                    value={formData.capacity}
                    onChange={(e) => handleChange('capacity', parseInt(e.target.value))}
                  />
                  {errors.capacity && (
                    <span className="text-sm text-red-500">{errors.capacity}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-400">Tekne Sınıfı</Label>
                <Input 
                  className={cn(
                    "bg-zinc-800/50 border-zinc-700 text-white",
                    errors.class && "border-red-500"
                  )}
                  placeholder="Tekne sınıfını girin"
                  value={formData.class}
                  onChange={(e) => handleChange('class', e.target.value)}
                />
                {errors.class && (
                  <span className="text-sm text-red-500">{errors.class}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-400">Tekne Markası</Label>
                <Input 
                  className={cn(
                    "bg-zinc-800/50 border-zinc-700 text-white",
                    errors.brand && "border-red-500"
                  )}
                  placeholder="Tekne markasını girin"
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                />
                {errors.brand && (
                  <span className="text-sm text-red-500">{errors.brand}</span>
                )}
              </div>

              <div className="col-span-full">
                <Label className="text-white">Tekne Fotoğrafları (Max 3)</Label>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="aspect-[4/3]">
                      {formData.images[index] ? (
                        <div className="relative w-full h-full group">
                          <Image
                            src={formData.images[index]}
                            alt={`Boat Photo ${index + 1}`}
                            fill
                            className="rounded-xl object-cover border-2 border-zinc-800"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => {
                                const newPhotos = [...formData.images];
                                newPhotos.splice(index, 1);
                                setFormData(prev => ({
                                  ...prev,
                                  images: newPhotos
                                }));
                              }}
                              className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor={`boat-photo-${index}`}
                          className="w-full h-full border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                          <ImageIcon className="w-6 h-6 text-zinc-500 mb-2" />
                          <span className="text-xs text-zinc-500">Fotoğraf Ekle</span>
                          <input
                            type="file"
                            id={`boat-photo-${index}`}
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            disabled={formData.images.length >= 3}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
                {errors.images && (
                  <span className="text-sm text-red-500 mt-2 block">{errors.images}</span>
                )}
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