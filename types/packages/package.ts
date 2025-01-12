export enum PackageDurationType {
  DAY = "DAY",
  MONTH = "MONTH"
}

export interface Package {
  id: string;
  name: string;
  duration: number;
  durationType: PackageDurationType;
  credits: number;
  price: number;
  isActive: boolean;
  level?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  paymentOptions?: string[];
  features?: string[];
}

export interface PackageFormData {
  name: string;
  duration: number;
  durationType: PackageDurationType;
  credits: number;
  price: number;
  isActive: boolean;
  level?: string;
  locationId: number;
  description?: string;
  features?: string[];
  paymentOptions?: string[];
  ibanDetails?: {
    iban: string;
    recipientName: string;
  };
}

export interface PackageFormValidation {
  name?: string;
  duration?: string;
  durationType?: string;
  credits?: string;
  price?: string;
  level?: string;
  locationId?: string;
  description?: string;
  isActive?: string;
  iban?: string;
  recipientName?: string;
} 