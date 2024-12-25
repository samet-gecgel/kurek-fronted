export interface Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    isSuperAdmin: boolean; // Ana super-admin kontrolü
    createdAt: string;
  }