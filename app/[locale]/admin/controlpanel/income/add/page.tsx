'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import DatePicker from "@/components/ui/datePicker";
import { DateTimePicker } from "@/components/ui/date-time-picker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';

// Örnek gelir türleri - normalde API'den gelecek
const INCOME_TYPES = [
  { id: '1', name: 'Üyelik Ödemesi' },
  { id: '2', name: 'Ders Ücreti' },
  { id: '3', name: 'Ekipman Satışı' },
];


export default function AddIncomePage() {
  const t = useTranslations('income');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [formData, setFormData] = useState({
    incomeTypeId: '',
    name: '',
    amount: '',
    date: format(new Date(), 'dd.MM.yyyy'),
    time: '09:00',
    details: ''
  });

  const handleDateSelect = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      date: format(date, 'dd.MM.yyyy')
    }));
    setShowDatePicker(false);
  };





  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API çağrısı yapılacak
    const datetime = `${formData.date} ${formData.time}`;
    console.log('Form data:', { ...formData, datetime });
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
      } relative z-0`}>
        <main className="p-8 pt-6 mt-14 md:mt-0">
          <div className="flex flex-col gap-4 md:gap-8">
            <div>
              <h1 className="text-2xl font-bold text-white">{t('addIncome')}</h1>
              <p className="text-zinc-400 mt-1">{t('subtitle')}</p>
            </div>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">
                  {t('form.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-200">
                      {t('form.incomeType')}
                    </label>
                    <Select
                      value={formData.incomeTypeId}
                      onValueChange={(value) => setFormData({...formData, incomeTypeId: value})}
                    >
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-300">
                        <SelectValue placeholder={t('form.selectIncomeType')} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {INCOME_TYPES.map((type) => (
                          <SelectItem 
                            key={type.id} 
                            value={type.id}
                            className="text-zinc-300 hover:bg-zinc-700/50 focus:bg-zinc-700/50 focus:text-zinc-100 cursor-pointer"
                          >
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-200">
                      {t('form.incomeName')}
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={t('form.enterIncomeName')}
                      className="bg-zinc-800/50 border-zinc-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-200">
                      {t('form.amount')}
                    </label>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      placeholder={t('form.enterAmount')}
                      className="bg-zinc-800/50 border-zinc-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-200">
                        {t('form.dateTime')}
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.date}
                          onClick={() => setShowDatePicker(!showDatePicker)}
                          readOnly
                          className="bg-zinc-800/50 border-zinc-700 text-white cursor-pointer"
                        />
                        {showDatePicker && (
                          <div className="absolute top-full left-0 mt-2 z-50">
                            <DatePicker onDateSelect={handleDateSelect} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-200">Saat</label>
                      <DateTimePicker
                        value={formData.time}
                        onChange={(time) => setFormData(prev => ({ ...prev, time }))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-200">
                      {t('form.details')}
                    </label>
                    <Textarea
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      placeholder={t('form.enterDetails')}
                      rows={4}
                      className="bg-zinc-800/50 border-zinc-700 text-white resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                    >
                      {t('actions.cancel')}
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {t('actions.save')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}