"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "@/components/ui/time-picker";
import DatePicker from "@/components/ui/datePicker";


export default function AddEventPage() {
  const t = useTranslations("events");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: format(new Date(), "dd.MM.yyyy"),
    time: "09:00",
    location: "",
    currentPerson: 0,
    maxPerson: 0,
    amount: "",
    requirements: "",
    program: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    isActive: true,
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API çağrısı yapılacak
    console.log(formData);
  };

  const handleDateSelect = (date: Date) => {
    setFormData({
      ...formData,
      date: format(date, "dd.MM.yyyy", { locale: tr }),
    });
    setIsDatePickerOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "md:ml-84" : "md:ml-24"
        } relative z-0`}
      >
        <main className="p-8 pt-6 mt-14 md:mt-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">{t("addEvent")}</h1>
            <p className="text-zinc-400 mt-1">{t("form.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  {t("form.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Etkinlik Adı */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-100">
                    {t("form.name")}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400"
                    placeholder={t("form.namePlaceholder")}
                  />
                </div>

                {/* Etkinlik Türü - Select yerine Input olarak değiştirildi */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-zinc-100">
                    {t("form.type")}
                  </Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400"
                    placeholder={t("form.typePlaceholder")}
                  />
                </div>

                {/* Tarih ve Saat */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t("form.date")}</Label>
                    <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white hover:bg-zinc-800 hover:text-white justify-start text-left font-normal h-12"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.date || t("form.selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-zinc-900 border border-zinc-800 shadow-xl">
                        <DatePicker onDateSelect={handleDateSelect} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-100">{t("form.time")}</Label>
                    <TimePicker
                      value={formData.time}
                      onChange={(value) => setFormData({ ...formData, time: value })}
                    />
                  </div>
                </div>

                {/* Etkinlik Yeri */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-zinc-100">
                    {t("form.location")}
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400"
                    placeholder={t("form.locationPlaceholder")}
                  />
                </div>

                {/* Katılımcı Sayısı ve Ücret */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxPerson" className="text-zinc-100">
                      {t("form.maxPerson")}
                    </Label>
                    <Input
                      id="maxPerson"
                      type="number"
                      value={formData.maxPerson}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxPerson: parseInt(e.target.value),
                        })
                      }
                      className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400"
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-zinc-100">
                      {t("form.fee")}
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Katılım Şartları */}
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-zinc-100">
                    {t("form.requirements")}
                  </Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({ ...formData, requirements: e.target.value })
                    }
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400 min-h-[100px]"
                    placeholder={t("form.requirementsPlaceholder")}
                  />
                </div>

                {/* Etkinlik Programı */}
                <div className="space-y-2">
                  <Label htmlFor="program" className="text-zinc-100">
                    {t("form.program")}
                  </Label>
                  <Textarea
                    id="program"
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400 min-h-[100px]"
                    placeholder={t("form.programPlaceholder")}
                  />
                </div>

                {/* İletişim Bilgileri */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-zinc-100">
                    {t("form.contact")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName" className="text-zinc-100">
                        {t("form.contactName")}
                      </Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contactName: e.target.value,
                          })
                        }
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-zinc-100">
                        {t("form.contactEmail")}
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contactEmail: e.target.value,
                          })
                        }
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="text-zinc-100">
                      {t("form.contactPhone")}
                    </Label>
                    <PhoneInput
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(value) =>
                        setFormData({ ...formData, contactPhone: value })
                      }
                      className="bg-zinc-900 border-zinc-800 text-zinc-100"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                    {t("addEvent")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
} 