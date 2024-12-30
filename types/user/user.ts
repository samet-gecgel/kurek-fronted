export interface IUser {
  // Kişisel Bilgiler
  id: string;
  photo: string | null;
  fullName: string;
  identityNumber: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  birthDate: Date;
  birthPlace: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | '0+' | '0-';
  educationLevel: 'primary' | 'secondary' | 'highschool' | 'university' | 'master' | 'doctorate';
  membershipType: 'individual' | 'highschool' | 'university' | 'corporate';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;

  // Meslek Bilgileri
  occupation: {
    type: string; // "student" | "teacher" | "engineer" | "doctor" | "lawyer" | "accountant" | "architect" | "other"
    details: {
      // Öğrenci ise
      schoolName?: string;
      grade?: string;
      // Çalışan ise
      companyName?: string;
      department?: string;
    };
  };

  // Yüzme Seviyesi
  swimmingLevel: 'none' | 'beginner' | 'intermediate' | 'advanced';

  // Acil Durum İletişim
  emergencyContact: {
    fullName: string;
    phone: string;
    relationship: string;
  };

  // Fatura Bilgileri
  invoice: {
    type: 'individual' | 'corporate';
    fullName: string;
    phone: string;
    address: {
      province: string;
      district: string;
      fullAddress: string;
    };
    // Kurumsal fatura bilgileri
    corporate?: {
      companyName: string;
      taxNumber: string;
      taxOffice: string;
    };
  };

  // İzinler ve Onaylar
  permissions: {
    instagramUsername: string;
    photoConsent: boolean;
    communicationConsent: boolean;
  };
}

// Form state için interface
export interface IUserFormState {
  isSubmitting: boolean;
  errors: {
    [K in keyof IUser]?: string;
  };
}

// API response interface
export interface IUserResponse {
  success: boolean;
  data?: IUser;
  error?: string;
}

// Liste response interface
export interface IUserListResponse {
  success: boolean;
  data?: {
    users: IUser[];
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
}

// Kullanıcı oluşturma/güncelleme için DTO
export type CreateUserDTO = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;

// Filtreleme için interface
export interface IUserFilters {
  search?: string;
  membershipType?: IUser['membershipType'];
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

// Ön kayıt için interface
export interface IUserPreRegister {
  fullName: string;
  identityNumber: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Ön kayıt response interface
export interface IUserPreRegisterResponse {
  success: boolean;
  data?: IUserPreRegister;
  error?: string;
} 