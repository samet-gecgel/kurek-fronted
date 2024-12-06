"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="relative">
            <Image
              src="/images/logo.png"
              alt="Kürek Takımı Logo"
              width={120}
              height={48}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-zinc-300 hover:text-white transition-colors hover:scale-105 transform duration-200"
            >
              Anasayfa
            </Link>
            <Link 
              href="/packages" 
              className="text-zinc-300 hover:text-white transition-colors hover:scale-105 transform duration-200"
            >
              Paketler
            </Link>
            <Link 
              href="/trainers" 
              className="text-zinc-300 hover:text-white transition-colors hover:scale-105 transform duration-200"
            >
              Antrenörler
            </Link>
            <Link 
              href="/contact" 
              className="text-zinc-300 hover:text-white transition-colors hover:scale-105 transform duration-200"
            >
              İletişim
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/trainer-login"
              className="text-zinc-300 hover:text-white px-4 py-2 rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] duration-200"
            >
              Antrenör Girişi
            </Link>
            <Link 
              href="/login"
              className="text-zinc-900 bg-white hover:bg-zinc-100 px-4 py-2 rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] duration-200"
            >
              Üye Girişi
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-zinc-900/95 border-b border-zinc-800"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-zinc-300 hover:text-white transition-colors hover:scale-105 transform duration-200"
              onClick={() => setIsOpen(false)}
            >
              Anasayfa
            </Link>
            <Link
              href="/packages"
              className="block text-zinc-300 hover:text-white transition-colors hover:scale-105 transform duration-200"
              onClick={() => setIsOpen(false)}
            >
              Paketler
            </Link>
            <Link
              href="/trainers"
              className="block text-zinc-300 hover:text-white transition-colors hover:scale-105 transform duration-200"
              onClick={() => setIsOpen(false)}
            >
              Antrenörler
            </Link>
            <Link
              href="/contact"
              className="block text-zinc-300 hover:text-white transition-colors hover:scale-105 transform duration-200"
              onClick={() => setIsOpen(false)}
            >
              İletişim
            </Link>
            <div className="pt-4 space-y-2">
              <Link
                href="/trainer-login"
                className="block text-center text-zinc-300 hover:text-white px-4 py-2 rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] duration-200"
                onClick={() => setIsOpen(false)}
              >
                Antrenör Girişi
              </Link>
              <Link
                href="/login"
                className="block text-center text-zinc-900 bg-white hover:bg-zinc-100 px-4 py-2 rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] duration-200"
                onClick={() => setIsOpen(false)}
              >
                Üye Girişi
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
} 