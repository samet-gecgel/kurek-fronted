"use client";

import { motion } from "framer-motion";
import { Award, Medal, Target, Users, Clock, Ship } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useTranslations } from 'next-intl';

export default function Trainers() {
  const t = useTranslations('trainers');

  const trainerCategories = [
    {
      title: t('categories.racing.title'),
      description: t('categories.racing.description'),
      icon: Medal,
      specialties: [
        t('categories.racing.specialties.0'),
        t('categories.racing.specialties.1'),
        t('categories.racing.specialties.2'),
        t('categories.racing.specialties.3')
      ]
    },
    {
      title: t('categories.basic.title'),
      description: t('categories.basic.description'),
      icon: Target,
      specialties: [
        t('categories.basic.specialties.0'),
        t('categories.basic.specialties.1'),
        t('categories.basic.specialties.2'),
        t('categories.basic.specialties.3')
      ]
    },
    {
      title: t('categories.team.title'),
      description: t('categories.team.description'),
      icon: Users,
      specialties: [
        t('categories.team.specialties.0'),
        t('categories.team.specialties.1'),
        t('categories.team.specialties.2'),
        t('categories.team.specialties.3')
      ]
    }
  ];

  const achievements = [
    {
      number: t('achievements.certifiedTrainers.number'),
      text: t('achievements.certifiedTrainers.text'),
      icon: Award
    },
    {
      number: t('achievements.nationalSuccess.number'),
      text: t('achievements.nationalSuccess.text'),
      icon: Medal
    },
    {
      number: t('achievements.experience.number'),
      text: t('achievements.experience.text'),
      icon: Clock
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 py-20">
        {/* Hero Section */}
        <div className="relative mb-20">
          <div className="relative container mx-auto px-4 py-20 flex flex-col justify-center items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-300 max-w-2xl"
            >
              {t('hero.description')}
            </motion.p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)",
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 text-center border border-zinc-800/50 hover:border-blue-500/50 transition-colors cursor-pointer"
              >
                <achievement.icon className="w-8 h-8 text-blue-500 mx-auto mb-4 transform transition-transform group-hover:rotate-12" />
                <div className="text-3xl font-bold text-white mb-2">
                  {achievement.number}
                </div>
                <div className="text-zinc-400">
                  {achievement.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('categories.title')}
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              {t('categories.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainerCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(30, 41, 59, 0.7)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
                className="group bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              >
                <category.icon className="w-10 h-10 text-blue-500 mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-xl font-bold text-white mb-4 transition-colors group-hover:text-blue-400">
                  {category.title}
                </h3>
                <p className="text-zinc-400 mb-6">
                  {category.description}
                </p>
                <ul className="space-y-3">
                  {Array.isArray(category.specialties) && category.specialties.map((specialty, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-2 text-zinc-300 group-hover:text-zinc-100"
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Ship className="w-4 h-4 text-blue-500 transition-transform group-hover:scale-110" />
                      {specialty}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 