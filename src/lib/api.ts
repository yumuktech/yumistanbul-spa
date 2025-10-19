import type {
  RestaurantListItem,
  RestaurantDetail,
  Category,
  District,
  SearchSuggestion,
  FilterState,
  AsyncState,
  Features,
  RestaurantImage,
  Specialty,
} from '../data/schemas';
import { successState, errorState } from '../data/schemas';

  type BffListResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  };

  type BffRestaurantListItem = {
    id: string;
    name: string;
    slug: string;
    district: string;
    district_name: string;
    price_tier: number;
    rating: number;
    review_count: number;
    features?: string[] | null;
    additional_filters?: string[] | null;
    thumbnail_url?: string | null;
    hero_image_url?: string | null;
    cover_image_url?: string | null;
    distance_m?: number | null;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    neighborhood?: string | null;
    categories?: string[] | null;
    is_verified?: boolean | null;
    is_featured?: boolean | null;
    hours?: {
      is_open: boolean;
      opens_at: string;
      closes_at: string;
    } | null;
  };

  type BffRestaurantDetail = BffRestaurantListItem & {
    description?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    instagram?: string | null;
    menu_url?: string | null;
    gallery?: Array<{ url: string; alt?: string | null; type?: string | null }> | null;
  };

  type BffDistrict = {
    slug: string;
    name: string;
    restaurant_count?: number | null;
  };

  type BffFeature = {
    key: string;
    label: string;
    emoji?: string | null;
  };

  type BffAdditionalFilter = BffFeature;

  type BffSearchSuggestions = {
    query: string;
    restaurants: Array<{ id: string; name: string; slug: string }>;
    districts: Array<{ slug: string; name: string }>;
  };

  interface RequestOptions {
    requiresAuth?: boolean;
  }

  const DEFAULT_BASE_URL = 'http://localhost:8000/api';

  /**
   * Lightweight API client that speaks to the Django BFF.
   * Responsibilities:
   * - Translate frontend filter state into query params
   * - Normalize BFF payloads to legacy UI types until components are refactored
   * - Cache rarely changing taxonomies (districts/features/additional filters)
   */
  export class ApiClient {
    private readonly baseUrl: string;
    private authToken: string | null = null;
    private readonly taxonomyCache: {
      districts: District[] | null;
      features: BffFeature[] | null;
      additionals: BffAdditionalFilter[] | null;
    } = {
      districts: null,
      features: null,
      additionals: null,
    };

    constructor(baseUrl?: string) {
      const envBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
        ? String(import.meta.env.VITE_API_BASE_URL)
        : undefined;
      const chosenBase = baseUrl ?? envBase ?? DEFAULT_BASE_URL;
      this.baseUrl = chosenBase.replace(/\/+$/, '');
    }

    setAuthToken(token: string | null): void {
      this.authToken = token;
    }

    async getRestaurants(filters?: Partial<FilterState>): Promise<AsyncState<RestaurantListItem[]>> {
      try {
        const params = this.buildRestaurantQuery(filters);
        const search = params.toString();
        const response = await this.request<BffListResponse<BffRestaurantListItem>>(
          `/restaurants/${search ? `?${search}` : ''}`
        );
        const items = response.results.map((item) => this.mapRestaurantListItem(item));
        return successState(items);
      } catch (error) {
        return errorState(error instanceof Error ? error : new Error('Failed to fetch restaurants'));
      }
    }

    async getRestaurantDetail(idOrSlug: string): Promise<AsyncState<RestaurantDetail>> {
      try {
        const result = await this.request<BffRestaurantDetail>(`/restaurants/${encodeURIComponent(idOrSlug)}/`);
        return successState(this.mapRestaurantDetail(result));
      } catch (error) {
        return errorState(error instanceof Error ? error : new Error('Failed to fetch restaurant detail'));
      }
    }

    async getSearchSuggestions(query: string): Promise<AsyncState<SearchSuggestion[]>> {
      if (!query || query.trim().length < 2) {
        return successState([]);
      }

      try {
        const params = new URLSearchParams({ q: query.trim() });
        const suggestions = await this.request<BffSearchSuggestions>(`/search/suggestions/?${params.toString()}`);
        const normalized: SearchSuggestion[] = [];

        normalized.push({
          type: 'query',
          text: suggestions.query,
          id: suggestions.query,
        });

        suggestions.restaurants.forEach((restaurant) => {
          normalized.push({
            type: 'restaurant',
            id: restaurant.id,
            text: restaurant.name,
            name: restaurant.name,
          });
        });

        suggestions.districts.forEach((district) => {
          normalized.push({
            type: 'district',
            id: district.slug,
            text: district.name,
            name: district.name,
          });
        });

        return successState(normalized.slice(0, 15));
      } catch (error) {
        return errorState(error instanceof Error ? error : new Error('Failed to fetch suggestions'));
      }
    }

    async getCategories(): Promise<AsyncState<Category[]>> {
      try {
        // Categories are not yet exposed via the BFF; return an empty list so UI can handle gracefully.
        return successState([]);
      } catch (error) {
        return errorState(error instanceof Error ? error : new Error('Failed to fetch categories'));
      }
    }

    async getDistricts(): Promise<AsyncState<District[]>> {
      try {
        if (this.taxonomyCache.districts) {
          return successState(this.taxonomyCache.districts);
        }
        const envelope = await this.request<BffListResponse<BffDistrict>>(`/districts/`);
        const mapped = envelope.results.map((district) => this.mapDistrict(district));
        this.taxonomyCache.districts = mapped;
        return successState(mapped);
      } catch (error) {
        return errorState(error instanceof Error ? error : new Error('Failed to fetch districts'));
      }
    }

    async getFeatureFilters(): Promise<AsyncState<string[]>> {
      try {
        if (this.taxonomyCache.features) {
          return successState(this.taxonomyCache.features.map((feature) => feature.key));
        }
        const envelope = await this.request<BffListResponse<BffFeature>>(`/features/`);
        this.taxonomyCache.features = envelope.results;
        return successState(envelope.results.map((feature) => feature.key));
      } catch (error) {
        return errorState(error instanceof Error ? error : new Error('Failed to fetch features'));
      }
    }

    async getAdditionalFilters(): Promise<AsyncState<{ id: string; label: string; emoji?: string }[]>> {
      try {
        if (this.taxonomyCache.additionals) {
          return successState(
            this.taxonomyCache.additionals.map((filter) => ({
              id: filter.key,
              label: filter.label,
              emoji: filter.emoji ?? undefined,
            }))
          );
        }
        const envelope = await this.request<BffListResponse<BffAdditionalFilter>>(`/additional-filters/`);
        this.taxonomyCache.additionals = envelope.results;
        return successState(
          envelope.results.map((filter) => ({
            id: filter.key,
            label: filter.label,
            emoji: filter.emoji ?? undefined,
          }))
        );
      } catch (error) {
        return errorState(error instanceof Error ? error : new Error('Failed to fetch additional filters'));
      }
    }

    async login(username: string, password: string): Promise<{ access: string; refresh: string }> {
      const body = JSON.stringify({ username, password });
      const tokens = await this.request<{ access: string; refresh: string }>(
        `/auth/token/`,
        { method: 'POST', body },
        { requiresAuth: false }
      );
      this.setAuthToken(tokens.access);
      return tokens;
    }

    async refreshToken(refreshToken: string): Promise<{ access: string }> {
      const body = JSON.stringify({ refresh: refreshToken });
      const token = await this.request<{ access: string }>(
        `/auth/token/refresh/`,
        { method: 'POST', body },
        { requiresAuth: false }
      );
      this.setAuthToken(token.access);
      return token;
    }

    async createRestaurant(payload: Record<string, unknown>): Promise<RestaurantDetail> {
      const body = JSON.stringify(payload);
      const result = await this.request<BffRestaurantDetail>(
        `/restaurants/`,
        { method: 'POST', body },
        { requiresAuth: true }
      );
      return this.mapRestaurantDetail(result);
    }

    async updateRestaurant(idOrSlug: string, payload: Record<string, unknown>): Promise<RestaurantDetail> {
      const body = JSON.stringify(payload);
      const result = await this.request<BffRestaurantDetail>(
        `/restaurants/${encodeURIComponent(idOrSlug)}/`,
        { method: 'PATCH', body },
        { requiresAuth: true }
      );
      return this.mapRestaurantDetail(result);
    }

    private buildRestaurantQuery(filters?: Partial<FilterState>): URLSearchParams {
      const params = new URLSearchParams();

      params.set('limit', '24');

      if (!filters) {
        params.set('ordering', '-rating');
        return params;
      }

      if (filters.districts && filters.districts.length > 0) {
        filters.districts.forEach((district) => params.append('district', district));
      }

      if (filters.features && filters.features.length > 0) {
        filters.features.forEach((feature) => params.append('feature', feature));
      }

      if (filters.special && filters.special.length > 0) {
        filters.special.forEach((filter) => params.append('additional', filter));
      }

      if (typeof filters.budget === 'number') {
        params.set('price_tier', String(filters.budget));
      }

      if (filters.query && filters.query.trim().length > 0) {
        params.set('search', filters.query.trim());
      }

      const ordering = this.mapOrdering(filters.sort);
      if (ordering) {
        params.set('ordering', ordering);
      } else if (!params.has('ordering')) {
        params.set('ordering', '-rating');
      }

      return params;
    }

    private mapOrdering(sort?: FilterState['sort']): string | undefined {
      switch (sort) {
        case 'rating':
          return '-rating';
        case 'price':
          return 'price_tier';
        case 'distance':
          return undefined;
        case 'newest':
          return '-created_at';
        default:
          return undefined;
      }
    }

    private mapRestaurantListItem(item: BffRestaurantListItem): RestaurantListItem {
      const priceTier = this.normalizePriceTier(item.price_tier);
      const tags = [
        ...(item.features ?? []),
        ...(item.additional_filters ?? []),
      ].filter(Boolean) as string[];

      const hours = item.hours
        ? {
            isOpen: Boolean(item.hours.is_open),
            opensAt: item.hours.opens_at,
            closesAt: item.hours.closes_at,
          }
        : {
            isOpen: false,
            opensAt: '09:00',
            closesAt: '22:00',
          };

      const images = this.buildPrimaryImages(item);

      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        rating: typeof item.rating === 'number' ? item.rating : 0,
        reviewCount: typeof item.review_count === 'number' ? item.review_count : 0,
        priceTier,
        distance_m: typeof item.distance_m === 'number' ? item.distance_m : 0,
        images,
        thumbnail: images[0] ?? '',
        categories: (item.categories ?? []) as string[],
        tags,
        location: {
          lat: item.latitude ?? 0,
          lng: item.longitude ?? 0,
          address: item.address ?? '',
          district: item.district_name ?? item.district ?? '',
          neighborhood: item.neighborhood ?? '',
        },
        hours,
        priceRange: this.priceTierToSymbol(priceTier),
        verified: Boolean(item.is_verified),
        featured: Boolean(item.is_featured),
      };
    }

    private mapRestaurantDetail(item: BffRestaurantDetail): RestaurantDetail {
      const base = this.mapRestaurantListItem(item);
      const images = this.mapGallery(item, base.name, base.slug);
      const features = this.mapFeatures(item.features ?? []);
      const specialties = this.mapSpecialties(item.additional_filters ?? []);

      const distribution = this.buildDefaultDistribution(base.reviewCount);

      return {
        ...base,
        description: item.description ?? '',
        images,
        features,
        specialties,
        contact: {
          phone: item.phone ?? 'N/A',
          email: item.email ?? undefined,
          website: item.website ?? undefined,
          instagram: item.instagram ?? undefined,
        },
        menu: item.menu_url ? { url: item.menu_url, highlights: [] } : undefined,
        reviews: {
          summary: {
            average: base.rating,
            total: base.reviewCount,
            distribution,
          },
          recent: [],
        },
        similarPlaces: [],
        createdAt: item.created_at ?? '',
        updatedAt: item.updated_at ?? '',
      };
    }

    private mapDistrict(district: BffDistrict): District {
      return {
        id: district.slug,
        slug: district.slug,
        name: district.name,
        count: district.restaurant_count ?? 0,
        location: { lat: 0, lng: 0 },
      };
    }

    private mapFeatures(keys: string[]): Features {
      const result: Features = {};
      const mapping: Record<string, keyof Features> = {
        wifi: 'wifi',
        outdoor: 'outdoor',
        terrace: 'outdoor',
        parking: 'parking',
        alcohol: 'alcohol',
        accessible: 'accessible',
        power: 'powerOutlets',
        quiet: 'quietArea',
      };

      keys.forEach((key) => {
        const mapped = mapping[key] ?? (key as keyof Features);
        result[mapped] = { available: true };
      });

      return result;
    }

    private mapSpecialties(keys: string[]): Specialty[] {
      const mapping: Record<string, Specialty> = {
        'date-night': 'date-night',
        'work-friendly': 'work-friendly',
        'family-friendly': 'family-friendly',
        'group-friendly': 'group-friendly',
      };

      const set = new Set<Specialty>();
      keys.forEach((key) => {
        const specialty = mapping[key];
        if (specialty) {
          set.add(specialty);
        }
      });

      return Array.from(set);
    }

    private buildPrimaryImages(item: BffRestaurantListItem): string[] {
      const urls: string[] = [];
      if (item.thumbnail_url) {
        urls.push(item.thumbnail_url);
      } else if (item.hero_image_url) {
        urls.push(item.hero_image_url);
      } else if (item.cover_image_url) {
        urls.push(item.cover_image_url);
      }

      if (urls.length === 0) {
        urls.push(this.placeholderImage(item.name));
      }

      return urls;
    }

    private mapGallery(item: BffRestaurantDetail, name: string, slug: string): RestaurantImage[] {
      if (item.gallery && item.gallery.length > 0) {
        return item.gallery.map((image, index) => ({
          url: image.url,
          alt: image.alt ?? `${name} image ${index + 1}`,
          type: (image.type ?? 'exterior') as RestaurantImage['type'],
        }));
      }

      const fallbackUrl = item.hero_image_url ?? item.cover_image_url ?? this.placeholderImage(name);
      return [
        {
          url: fallbackUrl,
          alt: `${name} hero image`,
          type: 'exterior',
        },
        {
          url: this.placeholderImage(`${slug}-menu`, 640, 480),
          alt: `${name} secondary image`,
          type: 'interior',
        },
      ];
    }

    private buildDefaultDistribution(total: number): Record<number, number> {
      if (!total) {
        return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      }

      return {
        5: Math.round(total * 0.6),
        4: Math.round(total * 0.25),
        3: Math.round(total * 0.1),
        2: Math.round(total * 0.03),
        1: Math.max(total - Math.round(total * 0.98), 0),
      };
    }

    private placeholderImage(text: string, width = 800, height = 600): string {
      const encoded = encodeURIComponent(text || 'Yumistanbul');
      return `https://placehold.co/${width}x${height}?text=${encoded}`;
    }

    private normalizePriceTier(tier?: number | null): 1 | 2 | 3 {
      if (tier === 2) return 2;
      if (tier === 3) return 3;
      if (tier && tier >= 4) return 3;
      return 1;
    }

    private priceTierToSymbol(tier: 1 | 2 | 3): '₺' | '₺₺' | '₺₺₺' {
      const map = {
        1: '₺',
        2: '₺₺',
        3: '₺₺₺',
      } as const;
      return map[tier];
    }

    private buildUrl(path: string): string {
      if (!path.startsWith('/')) {
        return `${this.baseUrl}/${path}`;
      }
      return `${this.baseUrl}${path}`;
    }

    private async request<T>(path: string, init: RequestInit = {}, options: RequestOptions = {}): Promise<T> {
      const url = this.buildUrl(path);
      const headers = new Headers(init.headers ?? {});

      if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
      }

      if (init.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }

      if (options.requiresAuth) {
        if (!this.authToken) {
          throw new Error('Authentication required');
        }
        headers.set('Authorization', `Bearer ${this.authToken}`);
      }

      const response = await fetch(url, {
        ...init,
        headers,
      });

      if (!response.ok) {
        let message = `Request failed with status ${response.status}`;

        try {
          const payload = await response.json();
          if (typeof payload.detail === 'string') {
            message = payload.detail;
          } else if (Array.isArray(payload.non_field_errors)) {
            message = payload.non_field_errors.join(', ');
          }
        } catch (parseError) {
          if (parseError instanceof Error) {
            message = `${message}. ${parseError.message}`;
          }
        }

        throw new Error(message);
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return response.json() as Promise<T>;
    }
  }

  export const apiClient = new ApiClient();
