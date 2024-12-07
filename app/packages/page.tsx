"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

const individualPackages = [
  {
    name: "Tek Kişilik Başlangıç",
    duration: "1 Ay",
    sessions: 8,
    price: 2500,
    features: [
      "Birebir eğitmen desteği",
      "Temel kürek teknikleri",
      "Ekipman kullanımı",
      "Fitness değerlendirmesi",
    ],
    recommended: false,
    type: "1x"
  },
  {
    name: "İkili Performans",
    duration: "3 Ay",
    sessions: 24,
    price: 6000,
    features: [
      "2 kişilik özel eğitim",
      "İleri kürek teknikleri",
      "Video analiz desteği",
      "Beslenme programı",
      "Yarış hazırlık desteği"
    ],
    recommended: true,
    type: "2x"
  },
  {
    name: "Dörtlü Takım",
    duration: "6 Ay",
    sessions: 48,
    price: 10000,
    features: [
      "4 kişilik takım antrenmanı",
      "Profesyonel yarış hazırlığı",
      "Taktik ve strateji eğitimi",
      "Performans analizi",
      "Özel yarış simülasyonları"
    ],
    recommended: false,
    type: "4x"
  }
];

const corporatePackages = [
  {
    name: "Kurumsal Başlangıç",
    duration: "3 Ay",
    sessions: 36,
    price: 15000,
    features: [
      "10 kişiye kadar grup eğitimi",
      "Temel takım oluşturma",
      "Ekipman tedariği",
      "Takım ruhu aktiviteleri"
    ],
    type: "Kurumsal"
  },
  {
    name: "Kurumsal Premium",
    duration: "6 Ay",
    sessions: 72,
    price: 25000,
    features: [
      "20 kişiye kadar grup eğitimi",
      "Özel yarış organizasyonları",
      "VIP ekipman tedariği",
      "Profesyonel koçluk desteği",
      "Özel etkinlik organizasyonu"
    ],
    type: "Kurumsal+"
  }
];

export default function Packages() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Başlık */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              Kürek Antrenman Paketleri
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Bireysel ve kurumsal ihtiyaçlarınıza özel hazırlanmış kürek antrenman paketlerimizi keşfedin
            </p>
          </div>

          {/* Bireysel Paketler */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Bireysel Paketler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {individualPackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border ${
                    pkg.recommended
                      ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                      : "border-zinc-800/50"
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1">
                        <Star size={14} /> Önerilen
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-zinc-400 text-sm mb-4">
                      {pkg.type} | {pkg.duration}
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {pkg.price.toLocaleString('tr-TR')} ₺
                    </div>
                    <div className="text-zinc-400 text-sm">
                      {pkg.sessions} Antrenman
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-zinc-300">
                        <Check size={16} className="text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-2 px-4 rounded-lg transition-colors ${
                      pkg.recommended
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white"
                    }`}
                  >
                    Paketi Seç
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Kurumsal Paketler */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Kurumsal Paketler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {corporatePackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/50"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-zinc-400 text-sm mb-4">
                      {pkg.type} | {pkg.duration}
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {pkg.price.toLocaleString('tr-TR')} ₺
                    </div>
                    <div className="text-zinc-400 text-sm">
                      {pkg.sessions} Antrenman
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-zinc-300">
                        <Check size={16} className="text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                  >
                    İletişime Geç
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 