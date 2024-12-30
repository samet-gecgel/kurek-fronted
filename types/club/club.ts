export interface ClubTrainer {
  id: number;
  name: string;
  image: string;
  specialization: string;
  experience: string;
  phone: string;
  email: string;
  activeStudents: number;
}

export interface Club {
  id: number;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  memberCount: number;
  trainerCount: number;
  status: string;
  image: string;
  createdAt: string;
  lastUpdated: string;
  manager: {
    id: number;
    name: string;
    image: string;
    phone: string;
    email: string;
    startDate: string;
    role: string;
  };
  trainers: ClubTrainer[];
}

export interface WorkingHours {
  open: string;
  close: string;
  isOpen: boolean;
}

export interface WeeklyWorkingHours {
  monday: WorkingHours;
  tuesday: WorkingHours;
  wednesday: WorkingHours;
  thursday: WorkingHours;
  friday: WorkingHours;
  saturday: WorkingHours;
  sunday: WorkingHours;
}

export interface ClubPhoto {
  id?: number;
  photoUrl: string;
  photoType: 'facility' | 'lockerRoom';
  order: number;
}

export interface ClubWorkingHour {
  id: number;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export interface ClubLocation {
  id?: number;
  location: string;
}

export interface ClubCompetition {
  id?: number;
  name: string;
}

export interface ClubAchievement {
  id?: number;
  description: string;
}

export interface ClubSocialProject {
  id?: number;
  name: string;
}

export interface ClubFormData {
  // 1. Kulüp Temel Bilgileri
  id?: number;
  name: string;
  foundationYear: number;
  type: 'recreational' | 'competitive';
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  targetAudience: string;
  missionVision: string;

  // 2. İletişim ve Lokasyon Bilgileri
  phone: string;
  email: string;
  website: string;
  address: string;
  googleMapsLink: string;
    twitterUrl: string;
    instagramUrl: string;
    facebookUrl: string;
    youtubeUrl: string;
  // 3. Çalışma Saatleri
  workingHours: WeeklyWorkingHours;

  // 4. Tesis Bilgileri
  clubPhotos: ClubPhoto[];
  facilityPhotos: ClubPhoto[];
  hasIndoorGym: boolean;
  hasLockerRoom: boolean;
  hasCafe: boolean;
  lockerRoomPhotos: ClubPhoto[];

  // 5. Teknik ve Organizasyon Bilgileri
  trainingLocations: ClubLocation[];

  // 6. Kulüp Başarıları ve Öne Çıkan Özellikler
  competitions: ClubCompetition[];
  achievements: ClubAchievement[];
  socialProjects: ClubSocialProject[];
}