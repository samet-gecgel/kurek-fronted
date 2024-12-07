"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // API'ye form verilerini gönder
      console.log("Form gönderiliyor:", formData);
      setStatus("success");
      
      // Formu temizle
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adres",
      content: "İstanbul, Türkiye",
      details: "Kürek Kulübü Tesisleri"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "0 (212) 000 01 23",
      details: "Pazartesi - Pazar 09:00 - 18:00"
    },
    {
      icon: Mail,
      title: "E-posta",
      content: "info@kurekkulubu.com",
      details: "7/24 hizmetinizdeyiz"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 py-20">
        <div className="container mx-auto px-4">
          {/* Başlık */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              İletişime Geçin
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 max-w-2xl mx-auto"
            >
              Sorularınız için bize ulaşın, en kısa sürede size dönüş yapalım
            </motion.p>
          </div>

          {/* İletişim Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <info.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {info.title}
                    </h3>
                    <p className="text-zinc-300 mb-1">{info.content}</p>
                    <p className="text-sm text-zinc-500">{info.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* İletişim Formu */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 backdrop-blur-sm p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-white">
                  Mesaj Gönderin
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-zinc-400 mb-2">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-zinc-400 mb-2">
                      E-posta Adresiniz
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-zinc-400 mb-2">
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-zinc-400 mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors min-h-[150px]"
                    required
                  />
                </div>

                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-200">
                    <AlertCircle size={20} />
                    <span>Mesajınız gönderilemedi. Lütfen tekrar deneyin.</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 flex items-center gap-2 text-green-200">
                    <AlertCircle size={20} />
                    <span>Mesajınız başarıyla gönderildi!</span>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <Send size={20} />
                  {status === "loading" ? "Gönderiliyor..." : "Mesaj Gönder"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 