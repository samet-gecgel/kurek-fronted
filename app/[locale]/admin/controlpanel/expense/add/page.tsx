"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/datePicker";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { format } from "date-fns";

export default function AddExpensePage() {
  const t = useTranslations('expense');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    expenseType: "",
    expenseName: "",
    amount: "",
    date: format(new Date(), 'dd.MM.yyyy'),
    time: '09:00',
    details: ""
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
    setIsLoading(true);

    try {
      // API çağrısı yapılacak
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
        <main className="p-4 md:p-8 pt-6 mt-14 md:mt-0">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {t('addExpense')}
              </h1>
              <p className="text-sm text-zinc-400">
                {t('subtitle')}
              </p>
            </div>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl text-zinc-200">
                  {t('form.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">
                      {t('form.expenseType')}
                    </Label>
                    <Select
                      value={formData.expenseType}
                      onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, expenseType: value }))
                      }
                    >
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-300">
                        <SelectValue placeholder={t('form.selectExpenseType')} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="rent" className="text-zinc-300 hover:bg-zinc-700/50 focus:bg-zinc-700/50 focus:text-zinc-100">
                          Kira
                        </SelectItem>
                        <SelectItem value="utility" className="text-zinc-300 hover:bg-zinc-700/50 focus:bg-zinc-700/50 focus:text-zinc-100">
                          Fatura
                        </SelectItem>
                        <SelectItem value="salary" className="text-zinc-300 hover:bg-zinc-700/50 focus:bg-zinc-700/50 focus:text-zinc-100">
                          Maaş
                        </SelectItem>
                        <SelectItem value="maintenance" className="text-zinc-300 hover:bg-zinc-700/50 focus:bg-zinc-700/50 focus:text-zinc-100">
                          Bakım
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-300">
                      {t('form.expenseName')}
                    </Label>
                    <Input
                      placeholder={t('form.enterExpenseName')}
                      value={formData.expenseName}
                      onChange={(e) => 
                        setFormData(prev => ({ ...prev, expenseName: e.target.value }))
                      }
                      className="bg-zinc-800/50 border-zinc-700 text-zinc-300 placeholder:text-zinc-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-300">
                      {t('form.amount')}
                    </Label>
                    <Input
                      type="number"
                      placeholder={t('form.enterAmount')}
                      value={formData.amount}
                      onChange={(e) => 
                        setFormData(prev => ({ ...prev, amount: e.target.value }))
                      }
                      className="bg-zinc-800/50 border-zinc-700 text-zinc-300 placeholder:text-zinc-500"
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
                    <Label className="text-zinc-300">
                      {t('form.details')}
                    </Label>
                    <Textarea
                      placeholder={t('form.enterDetails')}
                      value={formData.details}
                      onChange={(e) => 
                        setFormData(prev => ({ ...prev, details: e.target.value }))
                      }
                      className="bg-zinc-800/50 border-zinc-700 text-zinc-300 placeholder:text-zinc-500 min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isLoading ? "..." : t('addExpense')}
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