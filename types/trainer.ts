export type TrainerStatus = "pending" | "approved" | "rejected";

export interface TrainerDetail {
  id: number;
  fullName: string;
  identityNumber: string;
  phone: string;
  birthDate: string;
  image: string;
  specialization: string;
  experience: string;
  education: string;
  certificates: string;
  achievements: string;
  bio: string;
  status: TrainerStatus;
  rejectionReason?: string;
}

// Uzmanlık alanı için tip tanımı
interface Expertise {
  id: string;
  name: string;
  category: string; // Örn: "Tekne Sınıfları", "Antrenman Tipleri", "Özel Alanlar"
  description?: string;
}

// Antrenör-Uzmanlık ilişkisi için tip
interface TrainerExpertise {
  id: string;
  trainerId: string;
  expertiseId: string;
  yearsOfExperience?: number;
  certificationDate?: Date;
  certificationNumber?: string;
}