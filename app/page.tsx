"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Users, Award, Dumbbell, Target, Clock, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-zinc-950 text-zinc-50 min-h-screen pt-16">
      {/* Hero Section with Neon Effect */}
      <div className="relative container mx-auto px-4 py-24">
        {/* Neon background efektleri */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px]">
          <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-purple-500/10 blur-[120px] rounded-full" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10"
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            Profesyonel Kürek Eğitimi
          </h1>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Deneyimli antrenörlerimiz ve modern ekipmanlarımızla kürek sporunda mükemmelliği hedefliyoruz.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              Hemen Başla <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center p-6"
          >
            <h3 className="text-4xl font-bold text-blue-500 mb-2">400+</h3>
            <p className="text-zinc-400">Üye</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center p-6"
          >
            <h3 className="text-4xl font-bold text-purple-500 mb-2">50+</h3>
            <p className="text-zinc-400">Antrenör</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center p-6"
          >
            <h3 className="text-4xl font-bold text-blue-500 mb-2">200+</h3>
            <p className="text-zinc-400">Antrenman</p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-blue-500/50 transition-colors group"
          >
            <Calendar className="w-12 h-12 text-blue-500 mb-4 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <h2 className="text-xl font-bold mb-2">Esnek Antrenman</h2>
            <p className="text-zinc-400">
              Bireysel veya takım olarak, size uygun saatlerde antrenman yapın. Su üstü ve kara antrenmanları.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-purple-500/50 transition-colors group"
          >
            <Users className="w-12 h-12 text-purple-500 mb-4 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            <h2 className="text-xl font-bold mb-2">Uzman Eğitmenler</h2>
            <p className="text-zinc-400">
              Milli takım deneyimli antrenörlerimizle profesyonel kürek eğitimi alın.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-blue-500/50 transition-colors group"
          >
            <Award className="w-12 h-12 text-blue-500 mb-4 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <h2 className="text-xl font-bold mb-2">Özel Programlar</h2>
            <p className="text-zinc-400">
              Başlangıç seviyesinden yarışma hazırlığına özel antrenman programları.
            </p>
          </motion.div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-4 gap-6 mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 bg-zinc-900/30 p-4 rounded-lg"
          >
            <Dumbbell className="w-8 h-8 text-blue-500" />
            <span className="text-zinc-300">Modern Ekipmanlar</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 bg-zinc-900/30 p-4 rounded-lg"
          >
            <Target className="w-8 h-8 text-purple-500" />
            <span className="text-zinc-300">Yarışma Hazırlık</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 bg-zinc-900/30 p-4 rounded-lg"
          >
            <Clock className="w-8 h-8 text-blue-500" />
            <span className="text-zinc-300">Düzenli Antrenman</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 bg-zinc-900/30 p-4 rounded-lg"
          >
            <Star className="w-8 h-8 text-purple-500" />
            <span className="text-zinc-300">Elit Performans</span>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center relative z-10"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-12 rounded-2xl border border-zinc-800">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Yolculuğunuza bugün başlayın!
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto text-zinc-300">
              Size özel hazırlanmış antrenman programları ve profesyonel antrenörlerimizle tanışın.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="space-x-4"
            >
              <Link 
                href="/packages" 
                className="bg-white text-zinc-900 px-8 py-4 rounded-full inline-flex items-center gap-2 font-semibold hover:bg-zinc-100 transition-colors"
              >
                Paketleri İncele <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
