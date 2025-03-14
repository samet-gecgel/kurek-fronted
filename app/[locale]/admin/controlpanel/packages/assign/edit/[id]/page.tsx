"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PackageFormData, PackageFormValidation, PackageDurationType } from "@/types/packages/package";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

interface PaymentOption {
  id: string;
  label: string;
}

const paymentOptions: PaymentOption[] = [
  { id: 'cash', label: 'Nakit' },
  { id: 'credit_card', label: 'Kredi Kartı' },
  { id: 'iban', label: 'IBAN' },
  { id: 'corporate', label: 'Kurumsal' },
  { id: 'multisport', label: 'Multisport' }
];

// Örnek veri
const PACKAGE_DATA: PackageFormData = {
  name: "Başlangıç Paketi",
  duration: 1,
  durationType: PackageDurationType.MONTH,
  credits: 8,
  price: 1500,
  isActive: true,
  level: "beginner",
  locationId: 1,
  description: "Bu paket, kürek sporuna yeni başlayanlar için özel olarak hazırlanmıştır.",
  paymentOptions: ["cash", "credit_card", "iban", "multisport"],
  features: ["7/24 Erişim", "Özel Antrenör", "Grup Dersleri"]
};

export default function EditPackage({ params }: { params: { id: string } }) {
  const t = useTranslations('packageEdit');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  const [formData, setFormData] = useState<PackageFormData>({
    name: "",
    duration: 1,
    durationType: PackageDurationType.MONTH,
    credits: 1,
    price: 0,
    isActive: true,
    level: "",
    locationId: 0,
    description: "",
    features: [],
    paymentOptions: []
  });

  const [errors, setErrors] = useState<PackageFormValidation>({});
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API'den veri çekme simülasyonu
        setFormData(PACKAGE_DATA);
        setSelectedFeatures(PACKAGE_DATA.features || []);
        setSelectedPaymentOptions(PACKAGE_DATA.paymentOptions || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching package data:', error);
        router.push('/admin/controlpanel/packages/assign');
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleChange = (field: keyof PackageFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (field in errors) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: PackageFormValidation = {};

    if (!formData.name) newErrors.name = t('validation.nameRequired');
    if (!formData.duration) newErrors.duration = t('validation.durationRequired');
    if (!formData.durationType) newErrors.durationType = t('validation.durationTypeRequired');
    if (!formData.credits) newErrors.credits = t('validation.creditsRequired');
    if (!formData.price) newErrors.price = t('validation.priceRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // API çağrısı yapılacak
      const updatedData = {
        ...formData,
        features: selectedFeatures,
        paymentOptions: selectedPaymentOptions
      };
      console.log("Updated form data:", updatedData);
      
      router.push('/admin/controlpanel/packages/assign');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !selectedFeatures.includes(newFeature.trim())) {
      setSelectedFeatures([...selectedFeatures, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
  };

  const togglePaymentOption = (optionId: string) => {
    setSelectedPaymentOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center bg-[#09090B]">
      <div className="text-white">Yükleniyor...</div>
    </div>;
  }

  return (
    <div className="flex h-screen bg-[#09090B]">
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-84' : 'w-24'
      }`}>
        <AdminSidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      </div>

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'ml-84' : 'ml-24'
      }`}>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              onClick={() => router.push('/admin/controlpanel/packages/assign')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
              <p className="text-zinc-400">{t('subtitle')}</p>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-2 text-lg font-medium text-white">
                  <Package className="w-5 h-5 text-blue-500" />
                  {t('form.name')}
                </h2>
                <div className="flex items-center gap-2">
                  <Label htmlFor="isActive" className="text-zinc-400">{t('form.status')}</Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleChange('isActive', checked)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-zinc-400">{t('form.name')}</Label>
                    <Input 
                      className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white",
                        errors.name && "border-red-500"
                      )}
                      placeholder={t('form.namePlaceholder')}
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                    {errors.name && (
                      <span className="text-sm text-red-500">{errors.name}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-400">{t('form.location')}</Label>
                    <Input 
                      className={cn(
                        "bg-zinc-800/50 border-zinc-700 text-white",
                        errors.locationId && "border-red-500"
                      )}
                      placeholder={t('form.locationPlaceholder')}
                      value={formData.locationId}
                      onChange={(e) => handleChange('locationId', parseInt(e.target.value))}
                    />
                    {errors.locationId && (
                      <span className="text-sm text-red-500">{errors.locationId}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-400">{t('form.duration')}</Label>
                    <div className="flex gap-3">
                      <Input 
                        type="number"
                        min="1"
                        className={cn(
                          "bg-zinc-800/50 border-zinc-700 text-white flex-1",
                          errors.duration && "border-red-500"
                        )}
                        value={formData.duration}
                        onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                      />
                      <Select
                        value={formData.durationType}
                        onValueChange={(value) => handleChange('durationType', value)}
                      >
                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white w-32">
                          <SelectValue placeholder={t('form.duration')} />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value={PackageDurationType.DAY} className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
                            {t('form.durationType.day')}
                          </SelectItem>
                          <SelectItem value={PackageDurationType.MONTH} className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
                            {t('form.durationType.month')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.duration && (
                      <span className="text-sm text-red-500">{errors.duration}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-400">{t('form.credits')}</Label>
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
                    <Label className="text-zinc-400">{t('form.price')}</Label>
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
                    <Label className="text-zinc-400">{t('form.level')}</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => handleChange('level', value)}
                    >
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                        <SelectValue placeholder={t('form.levelPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="beginner" className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
                          {t('form.levels.beginner')}
                        </SelectItem>
                        <SelectItem value="intermediate" className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
                          {t('form.levels.intermediate')}
                        </SelectItem>
                        <SelectItem value="advanced" className="text-zinc-100 focus:bg-zinc-700 focus:text-white">
                          {t('form.levels.advanced')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-400">{t('form.description')}</Label>
                  <Textarea
                    className="bg-zinc-800/50 border-zinc-700 text-white min-h-[100px]"
                    placeholder={t('form.descriptionPlaceholder')}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-400">{t('form.paymentOptions')}</Label>
                  <div className="flex flex-wrap gap-2">
                    {paymentOptions.map(option => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => togglePaymentOption(option.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedPaymentOptions.includes(option.id)
                            ? 'bg-blue-500/20 text-blue-500 border border-blue-500/20'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-zinc-400">{t('form.features')}</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-zinc-800 text-white rounded-full flex items-center gap-2"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(feature)}
                          className="text-zinc-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      className="bg-zinc-800/50 border-zinc-700 text-white"
                      placeholder={t('form.addFeature')}
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={handleAddFeature}
                      variant="outline"
                      className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      {t('form.buttons.add')}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-end">
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    variant="outline"
                    className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    {t('form.buttons.cancel')}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    {t('form.buttons.save')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 