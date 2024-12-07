import { Trainer } from "./trainer";

interface Manager {
  id: number;
  name: string;
  image: string;
  phone: string;
  email: string;
  startDate: string;
  role: string;
}

export interface Club {
    id: number;
    name: string;
    location: string;
    address: string;
    phone: string;
    email: string;
    memberCount: number;
    trainerCount: number;
    status: string;
    image: string;
    createdAt: string;
    lastUpdated: string;
    trainers: Trainer[];
    manager: Manager;
  }