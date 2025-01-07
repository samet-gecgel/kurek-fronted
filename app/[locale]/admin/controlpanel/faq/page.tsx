"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, X, ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useParams } from "next/navigation";
import { tr, enUS } from "date-fns/locale";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  image?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export default function FAQPage() {
  const t = useTranslations("faq");
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);
  const params = useParams();
  const locale = params.locale as string;

  // Örnek veriler
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "Kürek antrenmanları hangi saatlerde yapılıyor?",
      answer: "Kürek antrenmanlarımız hafta içi sabah 06:00-09:00 ve akşam 16:00-19:00, hafta sonu ise 07:00-11:00 saatleri arasında yapılmaktadır. Başlangıç seviyesi için özel antrenman saatlerimiz mevcuttur. Hava koşullarına bağlı olarak program değişikliği yapılabilir.",
      createdAt: new Date(),
    },
    {
      id: "2",
      question: "Kürek sporuna başlamak için ne gerekiyor?",
      answer: `Kürek sporuna başlamak için aşağıdaki gereksinimleri sağlamanız gerekmektedir:

1. Temel Gereksinimler:
- Yüzme bilmek (en az 200 metre)
- Temel fiziksel sağlık kontrolünden geçmek
- 12 yaş ve üzeri olmak
- Düzenli katılım sağlayabilmek

2. Gerekli Ekipmanlar:
- Rahat spor kıyafetler
- Su geçirmez spor ayakkabı
- Yedek kıyafet
- Su matarası
- Havlu

3. Sağlık Kontrolleri:
- Genel sağlık raporu
- Kardiyovasküler sistem kontrolü
- Kas-iskelet sistemi değerlendirmesi

4. Kayıt İşlemleri:
- Üyelik başvuru formu
- Sağlık beyanı
- Veli izin belgesi (18 yaş altı için)
- Lisans işlemleri

Tüm ekipmanlar kulübümüz tarafından sağlanmaktadır. İlk aşamada deneyimli eğitmenlerimiz eşliğinde teknik eğitim alacaksınız.`,
      image: "https://static.vecteezy.com/system/resources/thumbnails/019/872/929/small_2x/3d-minimal-faq-sign-answers-to-frequently-asked-questions-message-icon-with-a-faq-text-3d-illustration-free-png.png",
      createdAt: new Date(),
    },
    {
      id: "3",
      question: "Kürek antrenman programı nasıl ilerliyor?",
      answer: `Kürek antrenman programımız aşağıdaki aşamaları içerir:

1. Başlangıç Eğitimi (2-3 Hafta):
- Temel kürek çekme tekniği
- Ergometre kullanımı
- Denge ve koordinasyon çalışmaları
- Güvenlik kuralları eğitimi

2. Teknik Geliştirme (4-6 Hafta):
- Tank çalışmaları
- Tek kişilik tekne eğitimi
- Ritim ve senkronizasyon
- Temel manevra teknikleri

3. Su Üstü Antrenmanlar:
- Sabah ve akşam su üstü çalışmaları
- Takım koordinasyonu
- Yarış teknikleri
- Mesafe ve tempo çalışmaları

4. Kondisyon Programı:
- Kardiyo egzersizleri
- Kuvvet antrenmanları
- Esneklik çalışmaları
- Core güçlendirme

5. İleri Seviye:
- Yarışma hazırlıkları
- Taktik antrenmanlar
- Özel teknik çalışmalar
- Performans takibi

Tüm programlar kişisel gelişim düzeyinize göre antrenörlerimiz tarafından özelleştirilmektedir.`,
      createdAt: new Date(),
    }
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFAQ = () => {
    const newFAQ: FAQ = {
      id: (faqs.length + 1).toString(),
      question: newQuestion,
      answer: newAnswer,
      image: imagePreview || undefined,
      createdAt: new Date(),
    };

    setFaqs([...faqs, newFAQ]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditFAQ = () => {
    if (selectedFAQ) {
      const updatedFAQs = faqs.map(faq => {
        if (faq.id === selectedFAQ.id) {
          return {
            ...faq,
            question: newQuestion,
            answer: newAnswer,
            image: imagePreview || faq.image,
            updatedAt: new Date(),
          };
        }
        return faq;
      });

      setFaqs(updatedFAQs);
      setIsEditDialogOpen(false);
      resetForm();
    }
  };

  const handleDeleteClick = (id: string) => {
    setFaqToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (faqToDelete) {
      try {
        setFaqs(faqs.filter(faq => faq.id !== faqToDelete));
        toast({
          title: t("messages.deleteSuccess"),
          variant: "default"
        });
      } catch {
        toast({
          title: t("messages.deleteError"),
          variant: "destructive"
        });
      }
      setIsDeleteDialogOpen(false);
      setFaqToDelete(null);
    }
  };

  const resetForm = () => {
    setNewQuestion("");
    setNewAnswer("");
    setImagePreview("");
    setSelectedFAQ(null);
  };

  const filteredFAQs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#09090B]">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? "md:ml-84" : "md:ml-24"
      } relative z-0`}>
        <div className="container max-w-[1500px] mx-auto p-4 sm:p-6 md:p-10 mt-14 md:mt-0">
          <motion.div 
            className="mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-6 md:h-8 w-1 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent rounded-full" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">{t("title")}</h1>
            </div>
            <p className="text-sm md:text-base text-zinc-400 mt-2 ml-3">{t("description")}</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <Input
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 w-full"
              />
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
            >
              <Plus size={20} className="mr-2" />
              {t("addFAQ")}
            </Button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Sol taraf - Resim */}
                  {faq.image ? (
                    <div className="w-full sm:w-1/5 relative bg-zinc-800/50">
                      <div className="h-40 sm:h-full min-h-[160px] relative">
                        <Image
                          src={faq.image}
                          alt={faq.question}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 640px) 100vw, 20vw"
                          priority
                        />
                      </div>
                    </div>
                  ) : null}

                  {/* Sağ taraf - İçerik */}
                  <div className={`flex-1 p-5 sm:p-7 flex flex-col justify-between ${!faq.image ? 'w-full' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-white line-clamp-2">{faq.question}</h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedFAQ(faq);
                            setNewQuestion(faq.question);
                            setNewAnswer(faq.answer);
                            setImagePreview(faq.image || "");
                            setIsEditDialogOpen(true);
                          }}
                          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          <Edit2 size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(faq.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1 mb-4">
                      <CollapsibleText text={faq.answer} />
                    </div>

                    <div className="pt-3 border-t border-zinc-800">
                      <div className="flex flex-col sm:flex-row gap-2 text-xs sm:text-sm text-zinc-500">
                        <span>
                          {t("createdAt")}: {format(faq.createdAt, "d MMMM yyyy", {
                            locale: locale === 'tr' ? tr : enUS
                          })}
                        </span>
                        {faq.updatedAt && (
                          <span className="sm:ml-4">
                            {t("updatedAt")}: {format(faq.updatedAt, "d MMMM yyyy", {
                              locale: locale === 'tr' ? tr : enUS
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Ekleme Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 w-[90%] sm:w-[85%] md:w-auto max-w-[500px] p-3 sm:p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold text-zinc-100">
              {t("addFAQ")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
            <div>
              <Label className="text-sm sm:text-base text-zinc-400">{t("question")}</Label>
              <Input
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white text-sm sm:text-base"
              />
            </div>

            <div>
              <Label className="text-sm sm:text-base text-zinc-400">{t("answer")}</Label>
              <Textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white min-h-[100px] sm:min-h-[150px] text-sm sm:text-base"
              />
            </div>

            <div>
              <Label className="text-sm sm:text-base text-zinc-400">{t("image")}</Label>
              <div className="mt-1.5">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-28 sm:h-32 md:h-36 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-600 transition-colors"
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-contain rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setImagePreview("");
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-zinc-400">
                        <ImageIcon size={24} />
                        <span className="text-sm">{t("dragAndDrop")}</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}
              className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 text-sm sm:text-base"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleAddFAQ}
              className="bg-orange-500 hover:bg-orange-600 text-sm sm:text-base"
            >
              {t("add")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Düzenleme Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[90%] sm:w-[85%] md:w-auto max-w-[500px] p-3 sm:p-4 md:p-6">
      <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-zinc-100">
              {t("editFAQ")}
            </DialogTitle>
          </DialogHeader>

          {/* Aynı form alanları */}
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-zinc-400">{t("question")}</Label>
              <Input
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white"
              />
            </div>

            <div>
              <Label className="text-zinc-400">{t("answer")}</Label>
              <Textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="mt-1.5 bg-zinc-800/50 border-zinc-700 text-white min-h-[100px]"
              />
            </div>

            <div>
              <Label className="text-zinc-400">{t("image")}</Label>
              <div className="mt-1.5">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload-edit"
                  />
                  <label
                    htmlFor="image-upload-edit"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-600 transition-colors"
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-contain rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setImagePreview("");
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-zinc-400">
                        <ImageIcon size={24} />
                        <span className="text-sm">{t("dragAndDrop")}</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                resetForm();
              }}
              className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleEditFAQ}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {t("save")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Silme Onay Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border border-zinc-800 w-[90%] sm:w-auto max-w-[400px] p-3 sm:p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl text-zinc-100">
              {t("deleteConfirm.title")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base text-zinc-400">
              {t("deleteConfirm.message")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-3">
            <AlertDialogCancel className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 text-sm sm:text-base">
              {t("deleteConfirm.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base"
            >
              {t("deleteConfirm.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Uzun metinler için genişletilebilir komponent
const CollapsibleText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("faq");

  // Görünen metin yüksekliğini kontrol et
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const element = textRef.current;
      if (element) {
        // line-height * 3 satır için maksimum yükseklik
        const maxHeight = 24 * 3; // 24px line-height
        setIsOverflowing(element.scrollHeight > maxHeight);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  return (
    <div>
      <div 
        ref={textRef}
        className={`text-sm sm:text-base text-zinc-300 whitespace-pre-wrap ${
          !isExpanded ? "line-clamp-3" : ""
        }`}
      >
        {text}
      </div>
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              {t("showLess")}
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              {t("showMore")}
              <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
}; 