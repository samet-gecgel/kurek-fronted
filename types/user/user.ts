// users tablosu - ana tablo
export interface IUser {
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
  membershipType: 'individual' | 'highschool' | 'university' | 'corporate';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// user_occupations tablosu
export interface IUserOccupation {
  id: string;
  userId: string;
  type: string;
  otherOccupation?: string;
  schoolName?: string;
  grade?: string;
  companyName?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}

// user_swimming_declarations tablosu
export interface IUserSwimmingDeclaration {
  id: string;
  userId: string;
  cannotSwim: boolean;
  canSwim50m: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// user_emergency_contacts tablosu
export interface IUserEmergencyContact {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  relationship: string;
  createdAt: Date;
  updatedAt: Date;
}

// user_invoices tablosu
export interface IUserInvoice {
  id: string;
  userId: string;
  type: 'individual' | 'corporate';
  fullName: string;
  phone: string;
  province: string;
  district: string;
  fullAddress: string;
  companyName?: string;
  taxNumber?: string;
  taxOffice?: string;
  createdAt: Date;
  updatedAt: Date;
}

// user_permissions tablosu
export interface IUserPermission {
  id: string;
  userId: string;
  instagramUsername?: string;
  photoConsent: boolean;
  communicationConsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// user_pre_registers tablosu
export interface IUserPreRegister {
  id: string;
  fullName: string;
  identityNumber: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// API ve form işlemleri için birleştirilmiş tip
export type IUserWithRelations = IUser & {
  occupation: Omit<IUserOccupation, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
  swimmingDeclaration: Omit<IUserSwimmingDeclaration, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
  emergencyContact: Omit<IUserEmergencyContact, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
  invoice: Omit<IUserInvoice, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
  permissions: Omit<IUserPermission, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
};

// Form state tipi
export interface IUserFormState {
  isSubmitting: boolean;
  errors: Partial<Record<keyof IUserWithRelations, string>>;
}

// API response tipleri
export interface IUserResponse {
  success: boolean;
  data?: IUserWithRelations;
  error?: string;
}

export interface IUserListResponse {
  success: boolean;
  data?: {
    users: IUserWithRelations[];
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
}

// DTO tipleri
export type CreateUserDTO = Omit<IUserWithRelations, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;

// Filtre tipi
export interface IUserFilters {
  search?: string;
  membershipType?: IUser['membershipType'];
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

// Kullanıcı durumu
export type UserStatus = 'active' | 'passive' | 'suspended' | 'pending' | 'frozen';

// Kullanıcı rolleri
export type UserRole = 'user' | 'trainer' | 'club_manager' | 'admin' | 'super_admin';

// Kullanıcı izinleri
export interface IUserPermissions {
  canCreateUser: boolean;
  canEditUser: boolean;
  canDeleteUser: boolean;
  canViewUsers: boolean;
  canManageTrainers: boolean;
  canManageClubs: boolean;
  canManageEvents: boolean;
  canManageSettings: boolean;
} 