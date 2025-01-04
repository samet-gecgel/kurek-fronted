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
}

export interface PackageFormData {
  name: string;
  duration: number;
  durationType: PackageDurationType;
  credits: number;
  price: number;
  isActive: boolean;
  level?: string;
  location?: string;
  description?: string;
  features?: string[];
  paymentOptions?: string[];
}

export interface PackageFormValidation {
  name?: string;
  duration?: string;
  durationType?: string;
  credits?: string;
  price?: string;
  level?: string;
  location?: string;
  description?: string;
  isActive?: string;
} 