"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>
      </div>

      <div className="relative container max-w-lg mx-auto text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            404
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={60}
            className="hover:opacity-80 transition-opacity"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-2xl font-bold text-white">
            Sayfa Bulunamadı
          </h1>
          <p className="text-zinc-400">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                  text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Ana Sayfaya Dön
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.history.back()}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg 
                  inline-flex items-center gap-2 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Geri Dön
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 