// Restaurant data types

export interface Location {
  lat: number;
  lng: number;
  address: string;
  district: string;
  neighborhood: string;
}

export interface Hours {
  isOpen: boolean;
  closesAt: string;
  opensAt: string;
  schedule?: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
  specialHours?: Array<{ date: string; open: string; close: string; note?: string }>;
}

export interface RestaurantListItem {
  id: string;
  name: string;
  slug: string;
  rating: number;
  reviewCount: number;
  priceTier: 1 | 2 | 3;
  distance_m: number;
  images: string[];
  thumbnail: string;
  categories: string[];
  tags: string[];
  location: Location;
  hours: Hours;
  priceRange: '₺' | '₺₺' | '₺₺₺';
  verified: boolean;
  featured: boolean;
}

export interface RestaurantImage {
  url: string;
  alt: string;
  type: 'exterior' | 'interior' | 'food' | 'menu';
}

export interface Feature {
  available: boolean;
  description?: string;
}

export interface Features {
  outdoor?: Feature;
  wifi?: Feature;
  parking?: Feature;
  alcohol?: Feature;
  accessible?: Feature;
  powerOutlets?: Feature;
  quietArea?: Feature;
}

export type Specialty = 'date-night' | 'work-friendly' | 'family-friendly' | 'group-friendly';

export interface Contact {
  phone: string;
  email?: string;
  website?: string;
  instagram?: string;
}

export interface Menu {
  url: string;
  highlights: Array<{ name: string; price: string }>;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Reviews {
  summary: {
    average: number;
    total: number;
    distribution: Record<number, number>;
  };
  recent: Review[];
}

export interface RestaurantDetail extends Omit<RestaurantListItem, 'images'> {
  description: string;
  images: RestaurantImage[];
  features: Features;
  specialties: Specialty[];
  contact: Contact;
  menu?: Menu;
  reviews: Reviews;
  similarPlaces: RestaurantListItem[];
  createdAt: string;
  updatedAt: string;
}

// API Response types

export interface RestaurantListResponse {
  data: RestaurantListItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    applied: Record<string, any>;
    available: Record<string, any>;
  };
}

export interface RestaurantDetailResponse {
  data: RestaurantDetail;
}
