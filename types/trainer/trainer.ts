export interface TrainerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: Date;
  photoUrl: string | null;
  bio: string;
  experience: string;
  specializations: TrainerExpertise[];
  certificates: TrainerCertificate[];
  education: TrainerEducation[];
  achievements: TrainerAchievement[];
}

export interface TrainerCertificate {
  id: string;
  name: string;
  institution: string;
  date: Date;
  documentUrl?: string;
}

export interface TrainerEducation {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  isOngoing: boolean;
}

export interface TrainerAchievement {
  id: string;
  title: string;
  description: string;
  date: Date;
}

export interface TrainerExpertise {
  id: string;
  name: string;
  yearsOfExperience: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  certificationDate?: Date;
  certificationNumber?: string;
}
