export type ManagerStatus = "pending" | "approved" | "rejected";

export interface ManagerDetail {
  id: number;
  fullName: string;
  identityNumber: string;
  phone: string;
  email: string;
  birthDate: string;
  image: string;
  clubName: string;
  clubRole: string;
  startDate: string;
  status: ManagerStatus;
  rejectionReason?: string;
} 