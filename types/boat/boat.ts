export enum BoatBranch {
  KUREK = "KÜREK",
  KANO = "KANO",
  YELKEN = "YELKEN",
  OPTIMIST = "OPTİMİST",
  SUP = "SUP",
  SU_BISIKLETI = "SU BİSİKLETİ"
}

// Ana tekne tablosu için interface
export interface Boat {
  id: string;
  name: string;
  serialNumber: string;
  year: number;
  branch: BoatBranch;
  class: string;
  capacity: number;
  brand: string;
}

// Tekne fotoğrafları için ayrı tablo
export interface BoatImage {
  id: string;
  boatId: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
}

export interface BoatFormData {
  name: string;
  serialNumber: string;
  year: number;
  branch: BoatBranch;
  class: string;
  capacity: number;
  brand: string;
  images: string[]; // Base64 formatında fotoğraflar
}

export interface BoatFormValidation {
  name?: string;
  serialNumber?: string;
  year?: string;
  branch?: string;
  class?: string;
  capacity?: string;
  brand?: string;
  images?: string;
} 