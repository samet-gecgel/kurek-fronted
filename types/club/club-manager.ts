export interface Manager {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    photo: string | null;
    isPrimaryManager: boolean;
  }