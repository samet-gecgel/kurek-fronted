"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Packages() {
  const t = useTranslations('packages');

  const packages = {
    events: [
      {
        name: t('packages.events.basic.name'),
        duration: "1",
        sessions: 4,
        price: 1500,
        features: t.raw('packages.events.basic.features')
      },
      {
        name: t('packages.events.premium.name'),
        duration: "1",
        sessions: 8,
        price: 2500,
        features: t.raw('packages.events.premium.features')
      }
    ],
    individual: [
      {
        name: t('packages.individual.starter.name'),
        duration: "1",
        sessions: 8,
        price: 2000,
        features: t.raw('packages.individual.starter.features')
      },
      {
        name: t('packages.individual.development.name'),
        duration: "3",
        sessions: 24,
        price: 5000,
        features: t.raw('packages.individual.development.features')
      },
      {
        name: t('packages.individual.pro.name'),
        duration: "6",
        sessions: 48,
        price: 9000,
        features: t.raw('packages.individual.pro.features')
      }
    ],
    training: [
      {
        name: t('packages.training.basic.name'),
        duration: "1",
        sessions: 12,
        price: 3000,
        features: t.raw('packages.training.basic.features')
      },
      {
        name: t('packages.training.premium.name'),
        duration: "3",
        sessions: 36,
        price: 8000,
        features: t.raw('packages.training.premium.features')
      }
    ]
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="events" className="border-zinc-800 px-6">
              <AccordionTrigger className="text-xl font-semibold text-white hover:text-white">
                {t('categories.events')}
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
                {t('categories.individual')}
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
                {t('categories.training')}
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
  const t = useTranslations('packages');

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
            {duration} {t('duration')} • {sessions} {t('sessions')}
          </div>
          <div className="text-xl font-bold text-white">
            {price.toLocaleString('tr-TR')} ₺
          </div>
        </div>
      </div>

      <ul className="space-y-2 mb-6">
        {Array.isArray(features) && features.map((feature, idx) => (
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
        {t('selectPackage')}
      </motion.button>
    </motion.div>
  );
} 