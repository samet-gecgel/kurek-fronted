"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Edit, MapPin, Phone, Mail, Globe} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { FaXTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa6";
import { CLUB_COLORS } from '@/constants/colors';
import { useTranslations } from "next-intl";

// Örnek veri - Gerçek uygulamada API'den gelecek
const clubData = {
  id: "1",
  name: "Deniz Spor Kulübü",
  logo: "https://e1.pxfuel.com/desktop-wallpaper/983/683/desktop-wallpaper-metalica-logo-cool-logos.jpg",
  foundationYear: 2010,
  type: "recreational",
  phone: "+90 212 555 0000",
  email: "info@denizsporkulubu.com",
  website: "www.denizsporkulubu.com",
  address: "Kadıköy, İstanbul",
  socialMedia: {
    twitter: "denizsporkulubu",
    instagram: "denizsporkulubu",
    facebook: "denizsporkulubu",
    youtube: "denizsporkulubu"
  },
  facilities: {
    hasIndoorGym: true,
    hasLockerRoom: true,
    hasCafe: true,
    hasParking: true,
    hasShower: true,
    hasWifi: true
  },
    workingHours: {
      monday: { open: "09:00", close: "22:00", isOpen: true },
      tuesday: { open: "09:00", close: "22:00", isOpen: true },
      wednesday: { open: "09:00", close: "22:00", isOpen: true },
      thursday: { open: "09:00", close: "22:00", isOpen: true },
      friday: { open: "09:00", close: "22:00", isOpen: true },
      saturday: { open: "10:00", close: "20:00", isOpen: true },
    sunday: { open: "10:00", close: "18:00", isOpen: false }
  },
  competitions: [
    "2023 Türkiye Kürek Şampiyonası",
    "İstanbul Boğazı Yüzme Yarışması",
    "Marmara Yelken Kupası"
  ],
  achievements: [
    "2023 Türkiye Kürek Şampiyonası - Birincilik",
    "2022 İstanbul Boğazı Yüzme Yarışması - İkincilik",
    "2022 Marmara Yelken Kupası - Üçüncülük"
  ],
  trainingLocations: [
    "Caddebostan Sahili",
    "Kalamış Marina",
    "Fenerbahçe Parkı"
  ],
  membershipTypes: [
    "Bireysel Üyelik",
    "Aile Üyeliği",
    "Öğrenci Üyeliği",
    "Kurumsal Üyelik"
  ],
  colors: {
    primary: {
      id: 'navy',
      value: '#1E40AF'
    },
    secondary: {
      id: 'royal-blue',
      value: '#1D4ED8'
    }
  },
  targetAudience: "Her yaştan ve seviyeden sporcuya açık olan kulübümüz, özellikle gençlere ve su sporlarına ilgi duyan herkese hitap etmektedir.",
  missionVision: "Misyonumuz: Su sporlarını toplumun her kesimine yaymak ve uluslararası başarılar elde etmek. Vizyonumuz: Türkiye'nin en başarılı su sporları kulübü olmak.",
  clubPhotos: [
    "https://images.pexels.com/photos/18879411/pexels-photo-18879411/free-photo-of-charles-2023-8-kisilik-takimin-baskani.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3554634/pexels-photo-3554634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3682409/pexels-photo-3682409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ],
  googleMapsLink: "https://goo.gl/maps/example",
  technicalInfo: {
    boatTypes: ["4x", "2x", "1x", "8+"],
    equipmentCount: 25,
    maxCapacity: 100,
    certifications: ["Türkiye Kürek Federasyonu Lisanslı", "ISO 9001"]
  },
  ageCategories: ["12-18", "18-27", "27+"],
  userTypes: ["Bireysel", "Lise ve Üniversite", "Kurumsal"],
  trainingLevels: ["Temel Eğitim", "Antrenman", "Yarışçılık", "Hobi Amaçlı"],
  boatClasses: ["Deniz Küreği", "Klasik Kürek"],
  facilityPhotos: [
    "https://images.pexels.com/photos/5055744/pexels-photo-5055744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/7429621/pexels-photo-7429621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/30398329/pexels-photo-30398329/free-photo-of-liverpool-fc-zafer-gecidi-kutlamasi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ],
  facilityFeatures: {
    hasGym: true,
    hasLockerRoom: true,
    hasCafe: true,
    lockerRoomPhotos: [
      "https://images.pexels.com/photos/8028625/pexels-photo-8028625.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
  },
  socialProjects: [
    "Gençlere Ücretsiz Kürek Eğitimi",
    "Deniz Temizliği Projesi",
    "Spor Bursları"
  ]
};

// Gün çevirisi için helper fonksiyon
const getDayName = (day: string) => {
  const days: { [key: string]: string } = {
    monday: 'Pazartesi',
    tuesday: 'Salı',
    wednesday: 'Çarşamba',
    thursday: 'Perşembe',
    friday: 'Cuma',
    saturday: 'Cumartesi',
    sunday: 'Pazar'
  };
  return days[day] || day;
};

export default function MyClubPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("club.myClub");

  // Renk gösterimi için helper fonksiyon
  const getColorName = (colorId: string) => {
    const color = CLUB_COLORS.find(c => c.id === colorId);
    return color?.name[locale as 'tr' | 'en'] || colorId;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <motion.div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-84' : 'md:ml-24'
        } w-full`}
      >
        <main className="p-3 md:p-4 lg:p-6 xl:p-8 mt-16 md:mt-0">
          {/* Başlık kısmı */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 bg-accent/10 p-4 md:p-6 rounded-xl">
            <motion.div 
              className="flex items-center gap-4 mb-4 md:mb-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="h-12 w-1.5 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  {t("title")}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("subtitle")}
                </p>
              </div>
            </motion.div>

            <Button
              onClick={() => router.push(`/admin/controlpanel/club/myclub/edit/${clubData.id}`)}
              className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Edit className="w-4 h-4 mr-2" />
              {t("editButton")}
            </Button>
          </div>

          {/* Kartlar için container */}
          <div className="space-y-4 md:space-y-6">
            {/* 1. Kulüp Temel Bilgileri */}
            <Card className="p-4 md:p-6 xl:p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
                  <h3 className="text-base md:text-lg xl:text-xl font-bold text-card-foreground">
                    {t("sections.basicInfo.title")}
                  </h3>
                </div>
                <Badge variant="outline" className="hidden md:inline-flex text-xs px-3">
                  {t("sections.basicInfo.badge")}
                </Badge>
              </div>

              {/* Logo ve Temel Bilgiler Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 xl:gap-8">
                {/* Logo Alanı */}
                <div className="flex flex-col items-center p-4 md:p-6 bg-accent/10 rounded-xl">
                  <div className="w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40 relative mb-4">
                    <Image
                      src={clubData.logo}
                      alt={clubData.name}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 text-center">
                    {clubData.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t("sections.basicInfo.foundationYear")}: {clubData.foundationYear}
                  </p>
                </div>

                {/* Renkler ve Tür */}
                <div className="space-y-4 md:space-y-6">
                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">
                      {t("sections.basicInfo.clubColors")}
                    </h4>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-background" 
                          style={{ backgroundColor: clubData.colors.primary.value }}
                        />
                        <span className="text-sm font-medium text-foreground">
                          {getColorName(clubData.colors.primary.id)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-background" 
                          style={{ backgroundColor: clubData.colors.secondary.value }}
                        />
                        <span className="text-sm font-medium text-foreground">
                          {getColorName(clubData.colors.secondary.id)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">
                      {t("sections.basicInfo.clubType")}
                    </h4>
                    <Badge variant="secondary" className="text-sm px-4 py-2 bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                      {t(`sections.basicInfo.types.${clubData.type}`)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Hedef Kitle ve Misyon/Vizyon */}
              <div className="mt-8 space-y-6">
                <div className="p-6 bg-accent/10 rounded-xl">
                  <h4 className="text-sm font-semibold text-foreground mb-4">
                    {t("sections.basicInfo.targetAudience")}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 hover:line-clamp-none transition-all duration-300">
                    {clubData.targetAudience}
                  </p>
                </div>

                <div className="p-6 bg-accent/10 rounded-xl">
                  <h4 className="text-sm font-semibold text-foreground mb-4">
                    {t("sections.basicInfo.missionVision.title")}
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">
                        {t("sections.basicInfo.missionVision.mission")}
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 hover:line-clamp-none transition-all duration-300">
                        {clubData.missionVision.split('Vizyonumuz:')[0].replace('Misyonumuz:', '')}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">
                        {t("sections.basicInfo.missionVision.vision")}
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 hover:line-clamp-none transition-all duration-300">
                        {clubData.missionVision.split('Vizyonumuz:')[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kulüp Fotoğrafları */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-foreground mb-4">
                  {t("sections.basicInfo.clubPhotos")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {clubData.clubPhotos.map((photo, index) => (
                    <div 
                      key={index} 
                      className="aspect-video relative rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Image
                        src={photo}
                        alt={`${t("sections.basicInfo.photo")} ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-sm font-medium">{t("sections.basicInfo.photo")} {index + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* 2. İletişim ve Lokasyon Bilgileri */}
            <Card className="p-8 bg-card border-border mt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-card-foreground">
                  {t("sections.contact.title")}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {/* İletişim Bilgileri */}
                <div className="space-y-6">
                  <div className="p-6 bg-accent/10 rounded-xl space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors duration-300">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t("sections.contact.address.label")}</p>
                        <span className="text-sm font-medium text-foreground">{clubData.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors duration-300">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t("sections.contact.phone.label")}</p>
                        <span className="text-sm font-medium text-foreground">{clubData.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors duration-300">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t("sections.contact.email.label")}</p>
                        <span className="text-sm font-medium text-foreground">{clubData.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors duration-300">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t("sections.contact.website.label")}</p>
                        <span className="text-sm font-medium text-foreground">{clubData.website}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sosyal Medya ve Harita */}
                <div className="space-y-6">
                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">
                      {t("sections.contact.socialMedia.title")}
                    </h4>
                    <div className="flex flex-wrap justify-start gap-4 md:gap-6">
                      {Object.entries(clubData.socialMedia).map(([platform, username]) => (
                        <a 
                          key={platform}
                          href={`https://${platform}.com/${username}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-3 bg-background/50 rounded-lg hover:bg-background transition-colors duration-300"
                        >
                          {platform === 'twitter' && <FaXTwitter size={24} className="text-muted-foreground group-hover:text-[#1DA1F2] transition-colors" />}
                          {platform === 'instagram' && <FaInstagram size={24} className="text-muted-foreground group-hover:text-[#E4405F] transition-colors" />}
                          {platform === 'facebook' && <FaFacebook size={24} className="text-muted-foreground group-hover:text-[#1877F2] transition-colors" />}
                          {platform === 'youtube' && <FaYoutube size={24} className="text-muted-foreground group-hover:text-[#FF0000] transition-colors" />}
                        </a>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => window.open(clubData.googleMapsLink, '_blank')}
                    className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    {t("sections.contact.showOnMap")}
                  </Button>
                </div>
              </div>
            </Card>

            {/* 3. Kulüp Faaliyetleri ve Hedef Kitle */}
            <Card className="p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-card-foreground">
                  {t("sections.activities.title")}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sol Kolon */}
                <div className="space-y-6">
                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">
                      {t("sections.activities.ageCategories.title")}
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {clubData.ageCategories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                          {category} {t("sections.activities.ageCategories.suffix")}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">
                      {t("sections.activities.userTypes.title")}
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {clubData.userTypes.map((type, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sağ Kolon */}
                <div className="space-y-6">
                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">
                      {t("sections.activities.trainingLevels.title")}
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {clubData.trainingLevels.map((level, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">
                      {t("sections.activities.boatClasses.title")}
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {clubData.boatClasses.map((boat, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                          {boat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Çalışma Saatleri - Tam Genişlik */}
              <div className="mt-8">
                <div className="p-6 bg-accent/10 rounded-xl">
                  <h4 className="text-sm font-semibold text-foreground mb-4">
                    {t("sections.activities.workingHours.title")}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Object.entries(clubData.workingHours).map(([day, hours]) => (
                      <div 
                        key={day} 
                        className={`p-4 rounded-lg ${
                          hours.isOpen 
                            ? 'bg-emerald-500/10 dark:bg-emerald-500/20' 
                            : 'bg-red-500/10 dark:bg-red-500/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-foreground">
                            {getDayName(day)}
                          </p>
                          <Badge 
                            variant={hours.isOpen ? "success" : "destructive"}
                            className="text-xs"
                          >
                            {hours.isOpen 
                              ? t("sections.activities.workingHours.status.open")
                              : t("sections.activities.workingHours.status.closed")
                            }
                          </Badge>
                        </div>
                        {hours.isOpen && (
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            {hours.open} - {hours.close}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* 4. Tesis Bilgileri */}
            <Card className="p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-card-foreground">{t("sections.facilities.title")}</h3>
              </div>

              {/* Tesis Fotoğrafları - Tam Genişlik */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-foreground mb-4">{t("sections.facilities.photos.title")}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {clubData.facilityPhotos.map((photo, index) => (
                    <div 
                      key={index} 
                      className="aspect-video relative rounded-xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Image
                        src={photo}
                        alt={`${t("sections.facilities.photos.photo")} ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-sm font-medium">{t("sections.facilities.photos.photo")} {index + 1}</p>
                      </div>
                      </div>
                    ))}
                  </div>
                </div>

              {/* Tesis Özellikleri */}
              <div className="grid grid-cols-1 gap-8">
                {/* Tesis Özellikleri */}
                <div className="p-6 bg-accent/10 rounded-xl">
                  <h4 className="text-sm font-semibold text-foreground mb-4">{t("sections.facilities.features.title")}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg ${clubData.facilityFeatures.hasGym ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{t("sections.facilities.features.gym")}</span>
                        <Badge variant={clubData.facilityFeatures.hasGym ? "success" : "destructive"}>
                          {clubData.facilityFeatures.hasGym ? `${t("sections.facilities.features.status.available")}` : `${t("sections.facilities.features.status.notAvailable")}`}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${clubData.facilityFeatures.hasLockerRoom ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{t("sections.facilities.features.lockerRoom")}</span>
                        <Badge variant={clubData.facilityFeatures.hasLockerRoom ? "success" : "destructive"}>
                          {clubData.facilityFeatures.hasLockerRoom ? `${t("sections.facilities.features.status.available")}` : `${t("sections.facilities.features.status.notAvailable")}`}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${clubData.facilityFeatures.hasCafe ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{t("sections.facilities.features.cafe")}</span>
                        <Badge variant={clubData.facilityFeatures.hasCafe ? "success" : "destructive"}>
                          {clubData.facilityFeatures.hasCafe ? `${t("sections.facilities.features.status.available")}` : `${t("sections.facilities.features.status.notAvailable")}`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Soyunma Odası Fotoğrafları */}
                {clubData.facilityFeatures.hasLockerRoom && (
                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">{t("sections.facilities.lockerRoom.title")}</h4>
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {clubData.facilityFeatures.lockerRoomPhotos.map((photo, index) => (
                        <div 
                          key={index} 
                          className="aspect-video relative rounded-xl overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  <Image
                            src={photo}
                            alt={`${t("sections.facilities.lockerRoom.photo")} ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-sm font-medium">{t("sections.facilities.lockerRoom.photo")} {index + 1}</p>
                                </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* 5. Teknik ve Organizasyon Bilgileri */}
            <Card className="p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-card-foreground">{t("sections.technical.title")}</h3>
                    </div>

              <div className="p-6 bg-accent/10 rounded-xl">
                <h4 className="text-sm font-semibold text-foreground mb-4">{t("sections.technical.trainingLocation")}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {clubData.trainingLocations.map((location, index) => (
                    <div key={index} className="p-4 bg-background/50 rounded-lg flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary" />
                        </div>
                      <span className="text-sm font-medium text-foreground">{location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* 6. Kulüp Başarıları ve Öne Çıkan Özellikler */}
            <Card className="p-8 bg-card border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-card-foreground">{t("sections.clubAchievements.title")}</h3>
                    </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Yarışmalar ve Başarılar */}
                <div className="space-y-6">
                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">{t("sections.clubAchievements.competition")}</h4>
                    <div className="space-y-3">
                      {clubData.competitions.map((competition, index) => (
                        <div key={index} className="p-3 bg-background/50 rounded-lg text-sm">
                          {competition}
                        </div>
                      ))}
                  </div>
                </div>

                  <div className="p-6 bg-accent/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-4">{t("sections.clubAchievements.successes")}</h4>
                    <div className="space-y-3">
                      {clubData.achievements.map((achievement, index) => (
                        <div key={index} className="p-3 bg-background/50 rounded-lg text-sm">
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sosyal Sorumluluk Projeleri */}
                <div className="p-6 bg-accent/10 rounded-xl">
                  <h4 className="text-sm font-semibold text-foreground mb-4">{t("sections.clubAchievements.socialresponsibility")}</h4>
                  <div className="space-y-3">
                    {clubData.socialProjects.map((project, index) => (
                      <div key={index} className="p-3 bg-background/50 rounded-lg text-sm">
                        {project}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </motion.div>
    </div>
  );
}