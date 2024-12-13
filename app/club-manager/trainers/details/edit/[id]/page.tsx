'use client';

import { ManagerSidebar } from "@/components/layout/manager-sidebar";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

const trainerData = {
  id: '1',
  name: 'Ahmet Yılmaz',
  paymentDetails: {
    baseSalary: 8000,
    perLessonFee: 150,
    bonusPercentage: 10,
    paymentDate: 'Her ayın 1\'i',
  }
};

export default function EditTrainerPaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState(trainerData.paymentDetails);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Kaydedildi:', formData);
    router.push(`/club-manager/trainers/details/${params.id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex h-screen bg-black">
      <ManagerSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="text-white hover:text-white hover:bg-zinc-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Ödeme Bilgilerini Düzenle</h1>
              <p className="text-gray-400 mt-1 text-sm">{trainerData.name}</p>
            </div>
          </div>

          <Card className="bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="baseSalary" className="text-gray-200 font-medium">
                      Sabit Maaş (₺)
                    </Label>
                    <Input
                      id="baseSalary"
                      name="baseSalary"
                      type="number"
                      value={formData.baseSalary}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="perLessonFee" className="text-gray-200 font-medium">
                      Ders Başı Ücret (₺)
                    </Label>
                    <Input
                      id="perLessonFee"
                      name="perLessonFee"
                      type="number"
                      value={formData.perLessonFee}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bonusPercentage" className="text-gray-200 font-medium">
                      Bonus Yüzdesi (%)
                    </Label>
                    <Input
                      id="bonusPercentage"
                      name="bonusPercentage"
                      type="number"
                      value={formData.bonusPercentage}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentDate" className="text-gray-200 font-medium">
                      Ödeme Tarihi
                    </Label>
                    <Input
                      id="paymentDate"
                      name="paymentDate"
                      value={formData.paymentDate}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700/50 text-white h-12 text-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="Örn: Her ayın 1'i"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Kaydet
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 