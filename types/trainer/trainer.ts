export interface Certificate {
  name: string;
  institution: string;
  date: Date;
  pdfUrl?: string;
}

// Trainer-Expertise ilişkisi için basit interface
export interface TrainerExpertise {
  id: string;
  trainerId: string;
  name: string;
}


export interface TrainerProfile {
  fullName: string;
  email: string;
  phone: string;
  birthDate: Date;
  trainerExpertise: TrainerExpertise[];
  experience: string;
  certificates: Certificate[];
  photoUrl: string;
  bio: string;
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}