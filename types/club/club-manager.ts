export interface Manager {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    photo: string | null;
    isPrimaryManager: boolean;
  }