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