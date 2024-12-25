export type AccountStatus = 'pending' | 'approved' | 'rejected';
export type RegistrationType = 'individual' | 'highschool' | 'university' | 'corporate';

export interface UserDetail {
  id: string;
  fullName: string;
  identityNumber: string;
  email: string;
  phone: string;
  birthDate: string;
  birthPlace: string;
  bloodType: string;
  canSwim: boolean;
  occupation: string;
  isVIR: boolean;
  isProblematic: boolean;
  notes: string;
  emergencyContact: {
    fullName: string;
    relation: string;
    phone: string;
  };
  registrationType: RegistrationType;
  profileImage: string;
  accountStatus: AccountStatus;
  rejectionReason?: string;
  createdAt: string;
} 