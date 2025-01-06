"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Calendar,
  DollarSign,
  ClipboardList,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Örnek veri
const eventData = {
  id: "1",
  name: "Kürek Yarışması",
  type: "yarışma",
  date: "15.03.2024",
  time: "10:00",
  location: "Tuzla / İstanbul",
  currentPerson: 30,
  maxPerson: 50,
  amount: 100,
  requirements: "Lisanslı sporcu olmak, 18 yaşından büyük olmak",
  program:
    "09:00 - Kayıt ve Kontrol\n10:00 - Yarış Başlangıcı\n12:00 - Öğle Arası\n13:00 - Final Yarışları\n15:00 - Ödül Töreni",
  contactName: "Ahmet Yılmaz",
  contactPhone: "500 000 00 00",
  contactEmail: "yarisma@kurekkulubu.com",
  isActive: true,
};

export default function EventDetailsPage() {
  const t = useTranslations("events");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? "md:ml-84" : "md:ml-24"
      } relative z-0`}>
        <main className="p-8 pt-6 mt-14 md:mt-0">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">{eventData.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
                  eventData.isActive 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "bg-red-500/10 text-red-500"
                }`}>
                  {eventData.isActive ? t("status.active") : t("status.inactive")}
                </span>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-400">{eventData.type}</span>
              </div>
            </div>
            <Button 
            className="bg-blue-600 hover:bg-blue-700" 
            onClick={() => router.push(`/admin/controlpanel/events/edit/${eventData.id}`)}
            >
              {t("actions.edit")}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Kolon - Ana Bilgiler */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    {t("details.eventDetails")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-400">{t("form.date")}</p>
                      <p className="text-white text-lg">{eventData.date}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-400">{t("form.time")}</p>
                      <p className="text-white text-lg">{eventData.time}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-400">{t("form.location")}</p>
                      <p className="text-white text-lg">{eventData.location}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-400">{t("form.maxPerson")}</p>
                      <p className="text-white text-lg">
                        <span className="text-emerald-500">{eventData.currentPerson}</span>
                        <span className="text-zinc-400">/</span>
                        <span>{eventData.maxPerson}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-blue-500" />
                    {t("details.eventProgram")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventData.program.split('\n').map((line, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                        <p className="text-zinc-100">{line}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sağ Kolon - İletişim ve Diğer Bilgiler */}
            <div className="space-y-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-500" />
                    {t("details.eventFee")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {`${eventData.amount.toLocaleString('tr-TR')} ₺`}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    {t("details.contactInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-400">{t("form.contactName")}</p>
                    <p className="text-white">{eventData.contactName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-400">{t("form.contactPhone")}</p>
                    <p className="text-white">{eventData.contactPhone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-400">{t("form.contactEmail")}</p>
                    <p className="text-white">{eventData.contactEmail}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-blue-500" />
                    {t("details.requirements")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-zinc-100 whitespace-pre-line">
                    {eventData.requirements}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 