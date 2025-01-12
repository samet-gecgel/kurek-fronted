export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export enum BloodType {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "0+",
  O_NEGATIVE = "0-"
}

export enum MembershipType {
  INDIVIDUAL = "INDIVIDUAL",
  HIGH_SCHOOL_STUDENT = "HIGH_SCHOOL_STUDENT",
  UNIVERSITY_STUDENT = "UNIVERSITY_STUDENT",
  CORPORATE = "CORPORATE"
}

export enum OccupationType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ENGINEER = "ENGINEER",
  DOCTOR = "DOCTOR",
  LAWYER = "LAWYER",
  ACCOUNTANT = "ACCOUNTANT",
  ARCHITECT = "ARCHITECT",
  OTHER = "OTHER"
}

export enum InvoiceType {
  INDIVIDUAL = "INDIVIDUAL",
  CORPORATE = "CORPORATE"
}

export interface EmergencyContact {
  fullName: string;
  phone: string;
  relation: string;
}

export interface OccupationDetails {
  type: OccupationType;
  otherOccupation?: string;
  // Öğrenci bilgileri
  schoolName?: string;
  grade?: string;
  // Çalışan bilgileri
  companyName?: string;
  department?: string;
}

export interface AddressDetails {
  province: string;
  district: string;
  fullAddress: string;
}

export interface CorporateInvoiceDetails {
  companyName: string;
  taxNumber: string;
  taxOffice: string;
}

export interface InvoiceDetails {
  type: InvoiceType;
  fullName: string;
  phone: string;
  address: AddressDetails;
  corporateDetails?: CorporateInvoiceDetails;
}

export interface SwimmingDeclaration {
  canSwim: boolean;
  canSwimWithClothes: boolean;
}

export interface AddUserRequest {
  // Kişisel Bilgiler
  profileImage?: string; // Base64 formatında
  fullName: string;
  identityNumber: string; // TC Kimlik No
  email: string;
  phone: string;
  gender: Gender;
  birthDate: Date;
  birthPlace: string;
  bloodType: BloodType;
  
  // Üyelik Bilgileri
  membershipType: MembershipType;
  occupation: OccupationDetails;
  swimmingDeclaration: SwimmingDeclaration;
  
  // Acil Durum Bilgileri
  emergencyContact: EmergencyContact;
  
  // Fatura Bilgileri
  invoiceDetails: InvoiceDetails;
  
  // İzinler ve Sosyal Medya
  photoConsent: boolean;
  communicationConsent: boolean;
  instagramHandle?: string;
}

export interface AddUserResponse {
  success: boolean;
  message: string;
  userId?: string;
  errors?: {
    field: string;
    message: string;
  }[];
} 