
export type UserType = 'individual' | 'agency';
export type Language = 'fr' | 'ar' | 'en';

export interface Alert {
  id: string;
  type: PropertyType | 'all';
  transaction: TransactionType;
  wilaya: string;
  priceMax?: number;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  balance: number;
  phone: string;
  subscription: 'free' | 'premium' | 'ultime';
  favorites?: string[];
  alerts?: Alert[];
  whatsapp?: string;
  city?: string;
  wilaya?: string;
  isVerified?: boolean;
  language?: Language | 'both';
  notifications?: {
    email: boolean;
    sms: boolean;
    news: boolean;
  };
  agencyName?: string;
  agencyPhone?: string;
  agencyWhatsapp?: string;
  agencyAddress?: string;
  openingHours?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

export type TransactionType = 'buy' | 'rent';
export type PropertyType = 'apartment' | 'house' | 'studio' | 'commercial' | 'office' | 'warehouse' | 'land';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  surface: number;
  type: PropertyType;
  transaction: TransactionType;
  city: string;
  wilaya: string;
  lat?: number;
  lng?: number;
  rooms?: number;
  bedrooms?: number;
  floor?: number;
  hasElevator?: boolean;
  hasParking?: boolean;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerType: UserType;
  createdAt: string;
  isBoosted?: boolean;
}

export interface BoostAnalytics {
  id: string;
  listingTitle: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  budget: number;
  estimatedReach: [number, number];
  results: {
    impressions: number;
    clicks: number;
    messages: number;
    phoneReveals: number;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  propertyId: string;
  content: string;
  timestamp: string;
}
