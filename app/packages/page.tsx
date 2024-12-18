"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const packages = {
  events: [
    {
      name: "Etkinlik Paketi Basic",
      duration: "1 Ay",
      sessions: 4,
      price: 1500,
      features: [
        "2 saatlik etkinlik süresi",
        "Temel kürek eğitimi",
        "Güvenlik ekipmanları",
        "Eğitmen desteği"
      ]
    },
    {
      name: "Etkinlik Paketi Premium",
      duration: "1 Ay",
      sessions: 8,
      price: 2500,
      features: [
        "3 saatlik etkinlik süresi",
        "İleri seviye kürek eğitimi",
        "Özel ekipman desteği",
        "2 eğitmen desteği",
        "Video çekim hizmeti"
      ]
    }
  ],
  individual: [
    {
      name: "Bireysel Başlangıç",
      duration: "1 Ay",
      sessions: 8,
      price: 2000,
      features: [
        "Birebir eğitmen desteği",
        "Temel kürek teknikleri",
        "Ekipman kullanımı",
        "Fitness değerlendirmesi"
      ]
    },
    {
      name: "Bireysel Gelişim",
      duration: "3 Ay",
      sessions: 24,
      price: 5000,
      features: [
        "Birebir eğitmen desteği",
        "İleri kürek teknikleri",
        "Video analiz desteği",
        "Özel program hazırlama",
        "Performans takibi"
      ]
    },
    {
      name: "Bireysel Pro",
      duration: "6 Ay",
      sessions: 48,
      price: 9000,
      features: [
        "Birebir eğitmen desteği",
        "Profesyonel kürek teknikleri",
        "Haftalık video analiz",
        "Yarışma hazırlık programı",
        "Beslenme danışmanlığı"
      ]
    }
  ],
  training: [
    {
      name: "Grup Eğitim Basic",
      duration: "1 Ay",
      sessions: 12,
      price: 3000,
      features: [
        "4 kişilik grup dersleri",
        "Temel kürek eğitimi",
        "Ekip çalışması",
        "Teknik geliştirme"
      ]
    },
    {
      name: "Grup Eğitim Premium",
      duration: "3 Ay",
      sessions: 36,
      price: 8000,
      features: [
        "4 kişilik grup dersleri",
        "İleri seviye teknikler",
        "Takım koordinasyonu",
        "Yarışma hazırlığı",
        "Video analiz desteği"
      ]
    }
  ]
};

export default function Packages() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              Kürek Antrenman Paketleri
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              İhtiyaçlarınıza uygun paketlerimizi inceleyin
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="events" className="border-zinc-800 px-6">
              <AccordionTrigger className="text-xl font-semibold text-white hover:text-white">
                Etkinlik ve Eğitim Paketleri
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 pt-4">
                  {packages.events.map((pkg, index) => (
                    <PackageCard key={index} {...pkg} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="individual" className="border-zinc-800 px-6">
              <AccordionTrigger className="text-xl font-semibold text-white hover:text-white">
                Bireysel Paketler
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 pt-4">
                  {packages.individual.map((pkg, index) => (
                    <PackageCard key={index} {...pkg} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="training" className="border-zinc-800 px-6">
              <AccordionTrigger className="text-xl font-semibold text-white hover:text-white">
                Grup Eğitim Paketleri
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 pt-4">
                  {packages.training.map((pkg, index) => (
                    <PackageCard key={index} {...pkg} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer />
    </>
  );
}

interface PackageCardProps {
  name: string;
  duration: string;
  sessions: number;
  price: number;
  features: string[];
}

function PackageCard({ name, duration, sessions, price, features }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/50"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="text-zinc-400 text-sm">
            {duration} • {sessions} Antrenman
          </div>
          <div className="text-xl font-bold text-white">
            {price.toLocaleString('tr-TR')} ₺
          </div>
        </div>
      </div>

      <ul className="space-y-2 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-zinc-300 text-sm">
            <Check size={16} className="text-green-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
      >
        Paketi Seç
      </motion.button>
    </motion.div>
  );
} 