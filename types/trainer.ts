export interface Trainer {
    id: number;
    name: string;
    image: string;
    specialization: string;
    club: string;
    location: string;
    experience: string;
    phone: string;
    email: string;
    startDate: string;
    boatClasses: string[];
    trainingTypes: string[];
    education: {
        title: string;
        date: string;
        institution: string;
    }[];
    bio: string;
}