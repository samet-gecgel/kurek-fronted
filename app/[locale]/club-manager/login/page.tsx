"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { LanguageSelector } from "@/components/language-selector";

export default function ClubManagerLogin() {
  const t = useTranslations('clubManagerLogin');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("Club Manager login:", { email, password });
  };

  const handleGoogleLogin = () => {
    console.log("Logging in with Google");
  };

  const handleAppleLogin = () => {
    console.log("Logging in with Apple");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>
      </div>

      <div className="relative container max-w-lg mx-auto">
        {/* Language Selector */}
        <div className="absolute top-0 right-0 -mt-20">
          <LanguageSelector />
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -top-20 left-0"
        >
          <Link 
            href="/"
            className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('backToHome')}</span>
          </Link>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={60}
              className="hover:opacity-80 transition-opacity"
            />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 text-center">
            {t('title')}
          </h1>
          <p className="text-zinc-400 text-center mb-6">
            {t('subtitle')}
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-6 flex items-center gap-2 text-red-200">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGoogleLogin}
              className="w-full bg-white text-zinc-900 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:bg-zinc-100"
            >
              <Image
                src="/images/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
              {t('socialLogin.google')}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleAppleLogin}
              className="w-full bg-black text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:bg-zinc-900 border border-zinc-700"
            >
              <Image
                src="/images/apple.svg"
                alt="Apple"
                width={20}
                height={20}
              />
              {t('socialLogin.apple')}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-zinc-400 bg-zinc-900">{t('socialLogin.or')}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-zinc-400 block">
                {t('form.email.label')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder={t('form.email.placeholder')}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-zinc-400 block">
                {t('form.password.label')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder={t('form.password.placeholder')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  title={showPassword ? t('form.password.hide') : t('form.password.show')}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/club-manager/forgot-password"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {t('form.forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {t('form.submit')}
            </motion.button>

            {/* Register Link */}
            <p className="text-center text-zinc-400">
              {t('register.text')}{" "}
              <Link
                href="/club-manager/register"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                {t('register.link')}
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 