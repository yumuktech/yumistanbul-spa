// Filter and search related types

export interface FilterState {
  districts: string[];
  categories: string[];
  features: string[];
  budget: number | null;
  special: string[];
  near: { lat: number; lng: number } | null;
  radius: number;
  sort: 'rating' | 'distance' | 'price' | 'newest';
  query?: string;
}

export interface Category {
  id: string;
  name: string;
  nameTR: string;
  icon: string;
  slug: string;
  count: number;
}

export interface District {
  id: string;
  name: string;
  slug: string;
  count: number;
  location: { lat: number; lng: number };
}

export interface FilterFeature {
  id: string;
  name: string;
  nameTR: string;
  icon: string;
}

export interface Special {
  id: string;
  name: string;
  nameTR: string;
  icon: string;
  description?: string;
}

export interface SearchSuggestion {
  type: 'query' | 'restaurant' | 'category' | 'district';
  text: string;
  id?: string;
  name?: string;
  district?: string;
  icon?: string;
  highlight?: string;
}

export interface SearchSuggestionsResponse {
  data: {
    query: string;
    suggestions: SearchSuggestion[];
    recent: string[];
  };
}
