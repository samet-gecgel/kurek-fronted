export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CORPORATE' | 'MULTISPORT';
export type ReservationStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Reservation {
    id: string;
    memberId: string;
    memberName: string;
    trainerId: string;
    trainerName: string;
    teamId: string;
    teamName: string;
    reservationDate: Date;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    packageId: string;
    packageName: string;
    remainingSessions: number;
    packageDuration: number; // ay cinsinden
    status: ReservationStatus;
    createdAt: Date;
} 