# API Contract & Data Schemas

## Base Configuration

**Base URL:** `https://api.yumistanbul.com/v1`

**Authentication:** API Key in header
```
Authorization: Bearer {API_KEY}
```

**Response Format:** JSON
**Charset:** UTF-8

---

## Endpoints

### 1. List Restaurants

**GET** `/restaurants`

Returns a paginated list of restaurants matching filter criteria.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `district` | `string[]` | No | - | District names (comma-separated) |
| `category` | `string[]` | No | - | Category IDs (comma-separated) |
| `budget` | `number` | No | - | Max price tier (1, 2, or 3) |
| `features` | `string[]` | No | - | Feature tags (outdoor, alcohol, wifi, parking) |
| `special` | `string[]` | No | - | Special filters (date-night, work-friendly, group-friendly) |
| `near` | `string` | No | - | Lat,lng coordinates (e.g., "41.0082,28.9784") |
| `radius` | `number` | No | 5000 | Radius in meters (max 10000) |
| `sort` | `string` | No | `rating` | Sort by: rating, distance, price, newest |
| `page` | `number` | No | 1 | Page number |
| `limit` | `number` | No | 20 | Items per page (max 50) |
| `q` | `string` | No | - | Search query (name, cuisine, district) |

**Example Request:**
```
GET /restaurants?district=kadikoy,besiktas&category=kebab&budget=2&features=outdoor&near=41.0082,28.9784&radius=3000&sort=rating&limit=20
```

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "rest_123abc",
      "name": "Kebabçı Ali",
      "slug": "kebabci-ali-kadikoy",
      "rating": 4.7,
      "reviewCount": 342,
      "priceTier": 2,
      "distance_m": 850,
      "images": [
        "https://cdn.yumistanbul.com/restaurants/rest_123abc/hero.jpg",
        "https://cdn.yumistanbul.com/restaurants/rest_123abc/interior.jpg"
      ],
      "thumbnail": "https://cdn.yumistanbul.com/restaurants/rest_123abc/thumb.jpg",
      "categories": ["kebab", "turkish"],
      "tags": ["outdoor", "family-friendly"],
      "location": {
        "lat": 40.9931,
        "lng": 29.0261,
        "address": "Kadıköy Cad. No:42",
        "district": "Kadıköy",
        "neighborhood": "Moda"
      },
      "hours": {
        "isOpen": true,
        "closesAt": "23:00",
        "opensAt": "11:00",
        "schedule": {
          "monday": { "open": "11:00", "close": "23:00" },
          "tuesday": { "open": "11:00", "close": "23:00" },
          "wednesday": { "open": "11:00", "close": "23:00" },
          "thursday": { "open": "11:00", "close": "23:00" },
          "friday": { "open": "11:00", "close": "00:00" },
          "saturday": { "open": "11:00", "close": "00:00" },
          "sunday": { "open": "11:00", "close": "23:00" }
        }
      },
      "priceRange": "₺₺",
      "verified": true,
      "featured": false
    }
  ],
  "meta": {
    "total": 156,
    "page": 1,
    "limit": 20,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "applied": {
      "districts": ["kadikoy", "besiktas"],
      "categories": ["kebab"],
      "budget": 2,
      "features": ["outdoor"],
      "location": { "lat": 41.0082, "lng": 28.9784 },
      "radius": 3000
    },
    "available": {
      "districts": ["kadikoy", "besiktas", "sisli", "beyoglu"],
      "categories": ["kebab", "pizza", "burger", "seafood"],
      "features": ["outdoor", "alcohol", "wifi", "parking"]
    }
  }
}
```

**Response 400 Bad Request:**
```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid budget value. Must be 1, 2, or 3.",
    "field": "budget"
  }
}
```

**Response 429 Too Many Requests:**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 60 seconds.",
    "retryAfter": 60
  }
}
```

---

### 2. Get Restaurant Detail

**GET** `/restaurants/{id}`

Returns detailed information about a single restaurant.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Restaurant ID or slug |

**Example Request:**
```
GET /restaurants/rest_123abc
```

**Response 200 OK:**
```json
{
  "data": {
    "id": "rest_123abc",
    "name": "Kebabçı Ali",
    "slug": "kebabci-ali-kadikoy",
    "description": "Kadıköy'ün en köklü kebapçılarından. Adana, urfa kebap ve lahmacun ile ünlü.",
    "rating": 4.7,
    "reviewCount": 342,
    "priceTier": 2,
    "priceRange": "₺₺",
    "images": [
      {
        "url": "https://cdn.yumistanbul.com/restaurants/rest_123abc/hero.jpg",
        "alt": "Kebabçı Ali restoranı dış görünüm",
        "type": "exterior"
      },
      {
        "url": "https://cdn.yumistanbul.com/restaurants/rest_123abc/interior.jpg",
        "alt": "Kebabçı Ali restoranı iç mekan",
        "type": "interior"
      },
      {
        "url": "https://cdn.yumistanbul.com/restaurants/rest_123abc/food1.jpg",
        "alt": "Adana kebap",
        "type": "food"
      }
    ],
    "categories": ["kebab", "turkish", "grill"],
    "tags": ["outdoor", "family-friendly", "takeaway"],
    "features": {
      "outdoor": { "available": true, "description": "20 kişilik bahçe" },
      "wifi": { "available": true, "description": "Ücretsiz Wi-Fi" },
      "parking": { "available": false },
      "alcohol": { "available": false },
      "accessible": { "available": true, "description": "Tekerlekli sandalye erişimi" },
      "powerOutlets": { "available": false },
      "quietArea": { "available": false }
    },
    "specialties": ["date-night", "family-friendly"],
    "location": {
      "lat": 40.9931,
      "lng": 29.0261,
      "address": "Kadıköy Cad. No:42, Moda",
      "district": "Kadıköy",
      "neighborhood": "Moda",
      "directions": "https://maps.google.com/?q=40.9931,29.0261"
    },
    "contact": {
      "phone": "+90 216 XXX XXXX",
      "email": "info@kebabcialicom",
      "website": "https://kebabciali.com",
      "instagram": "@kebabciali"
    },
    "hours": {
      "isOpen": true,
      "closesAt": "23:00",
      "opensAt": "11:00",
      "schedule": {
        "monday": { "open": "11:00", "close": "23:00" },
        "tuesday": { "open": "11:00", "close": "23:00" },
        "wednesday": { "open": "11:00", "close": "23:00" },
        "thursday": { "open": "11:00", "close": "23:00" },
        "friday": { "open": "11:00", "close": "00:00" },
        "saturday": { "open": "11:00", "close": "00:00" },
        "sunday": { "open": "11:00", "close": "23:00" }
      },
      "specialHours": []
    },
    "menu": {
      "url": "https://cdn.yumistanbul.com/menus/rest_123abc.pdf",
      "highlights": [
        { "name": "Adana Kebap", "price": "₺180" },
        { "name": "Urfa Kebap", "price": "₺180" },
        { "name": "Lahmacun", "price": "₺45" }
      ]
    },
    "reviews": {
      "summary": {
        "average": 4.7,
        "total": 342,
        "distribution": {
          "5": 245,
          "4": 67,
          "3": 18,
          "2": 8,
          "1": 4
        }
      },
      "recent": [
        {
          "id": "rev_789xyz",
          "author": "Ayşe K.",
          "rating": 5,
          "comment": "Harika kebaplar, samimi hizmet. Bahçesi çok güzel.",
          "date": "2025-10-15",
          "verified": true
        }
      ]
    },
    "similarPlaces": [
      {
        "id": "rest_456def",
        "name": "Ocakbaşı Murat",
        "thumbnail": "https://cdn.yumistanbul.com/restaurants/rest_456def/thumb.jpg",
        "rating": 4.5,
        "priceTier": 2,
        "distance_m": 1200
      }
    ],
    "verified": true,
    "featured": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2025-10-10T14:22:00Z"
  }
}
```

**Response 404 Not Found:**
```json
{
  "error": {
    "code": "RESTAURANT_NOT_FOUND",
    "message": "Restaurant not found with id: rest_123abc"
  }
}
```

---

### 3. Search Suggestions

**GET** `/search/suggestions`

Returns autocomplete suggestions for search query.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `q` | `string` | Yes | - | Search query (min 2 chars) |
| `limit` | `number` | No | 5 | Max suggestions |

**Example Request:**
```
GET /search/suggestions?q=kebab+kad&limit=5
```

**Response 200 OK:**
```json
{
  "data": {
    "query": "kebab kad",
    "suggestions": [
      {
        "type": "query",
        "text": "kebab kadıköy",
        "highlight": "<strong>kebab kad</strong>ıköy"
      },
      {
        "type": "restaurant",
        "id": "rest_123abc",
        "name": "Kebabçı Ali",
        "district": "Kadıköy",
        "text": "Kebabçı Ali - Kadıköy"
      },
      {
        "type": "category",
        "id": "kebab",
        "text": "Kebab restoranları",
        "icon": "🍖"
      }
    ],
    "recent": [
      "pizza şişli",
      "tatlı beşiktaş"
    ]
  }
}
```

---

### 4. Get Categories

**GET** `/categories`

Returns list of available food categories.

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "kebab",
      "name": "Kebab",
      "nameTR": "Kebap",
      "icon": "🍖",
      "slug": "kebab",
      "count": 245
    },
    {
      "id": "pizza",
      "name": "Pizza",
      "nameTR": "Pizza",
      "icon": "🍕",
      "slug": "pizza",
      "count": 187
    },
    {
      "id": "burger",
      "name": "Burger",
      "nameTR": "Burger",
      "icon": "🍔",
      "slug": "burger",
      "count": 156
    },
    {
      "id": "seafood",
      "name": "Seafood",
      "nameTR": "Deniz Ürünleri",
      "icon": "🦞",
      "slug": "seafood",
      "count": 98
    },
    {
      "id": "dessert",
      "name": "Dessert",
      "nameTR": "Tatlı",
      "icon": "🍰",
      "slug": "dessert",
      "count": 167
    },
    {
      "id": "coffee",
      "name": "Coffee",
      "nameTR": "Kahve",
      "icon": "☕",
      "slug": "coffee",
      "count": 289
    }
  ]
}
```

---

### 5. Get Districts

**GET** `/districts`

Returns list of Istanbul districts with restaurant counts.

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "kadikoy",
      "name": "Kadıköy",
      "slug": "kadikoy",
      "count": 456,
      "location": { "lat": 40.9897, "lng": 29.0229 }
    },
    {
      "id": "besiktas",
      "name": "Beşiktaş",
      "slug": "besiktas",
      "count": 342,
      "location": { "lat": 41.0422, "lng": 29.0086 }
    },
    {
      "id": "sisli",
      "name": "Şişli",
      "slug": "sisli",
      "count": 389,
      "location": { "lat": 41.0602, "lng": 28.9875 }
    }
  ]
}
```

---

## TypeScript Schemas

### Restaurant List Item
```typescript
interface RestaurantListItem {
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
  location: {
    lat: number;
    lng: number;
    address: string;
    district: string;
    neighborhood: string;
  };
  hours: {
    isOpen: boolean;
    closesAt: string;
    opensAt: string;
  };
  priceRange: '₺' | '₺₺' | '₺₺₺';
  verified: boolean;
  featured: boolean;
}

interface RestaurantListResponse {
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
```

### Restaurant Detail
```typescript
interface RestaurantDetail extends RestaurantListItem {
  description: string;
  images: Array<{
    url: string;
    alt: string;
    type: 'exterior' | 'interior' | 'food' | 'menu';
  }>;
  features: {
    outdoor?: { available: boolean; description?: string };
    wifi?: { available: boolean; description?: string };
    parking?: { available: boolean; description?: string };
    alcohol?: { available: boolean; description?: string };
    accessible?: { available: boolean; description?: string };
    powerOutlets?: { available: boolean; description?: string };
    quietArea?: { available: boolean; description?: string };
  };
  specialties: Array<'date-night' | 'work-friendly' | 'family-friendly' | 'group-friendly'>;
  contact: {
    phone: string;
    email?: string;
    website?: string;
    instagram?: string;
  };
  hours: {
    isOpen: boolean;
    closesAt: string;
    opensAt: string;
    schedule: Record<string, { open: string; close: string }>;
    specialHours: Array<{ date: string; open: string; close: string; note?: string }>;
  };
  menu?: {
    url: string;
    highlights: Array<{ name: string; price: string }>;
  };
  reviews: {
    summary: {
      average: number;
      total: number;
      distribution: Record<number, number>;
    };
    recent: Array<{
      id: string;
      author: string;
      rating: number;
      comment: string;
      date: string;
      verified: boolean;
    }>;
  };
  similarPlaces: Array<{
    id: string;
    name: string;
    thumbnail: string;
    rating: number;
    priceTier: number;
    distance_m: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface RestaurantDetailResponse {
  data: RestaurantDetail;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  nameTR: string;
  icon: string;
  slug: string;
  count: number;
}
```

### District
```typescript
interface District {
  id: string;
  name: string;
  slug: string;
  count: number;
  location: { lat: number; lng: number };
}
```

### Search Suggestion
```typescript
interface SearchSuggestion {
  type: 'query' | 'restaurant' | 'category' | 'district';
  text: string;
  id?: string;
  name?: string;
  district?: string;
  icon?: string;
  highlight?: string;
}

interface SearchSuggestionsResponse {
  data: {
    query: string;
    suggestions: SearchSuggestion[];
    recent: string[];
  };
}
```

---

## Error Responses

All errors follow this format:

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    field?: string;
    details?: any;
    retryAfter?: number;
  };
}
```

**Common Error Codes:**

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_PARAMETER` | 400 | Invalid query parameter |
| `MISSING_PARAMETER` | 400 | Required parameter missing |
| `UNAUTHORIZED` | 401 | Invalid or missing API key |
| `FORBIDDEN` | 403 | Access denied |
| `RESTAURANT_NOT_FOUND` | 404 | Restaurant not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## UI State Mapping

### Loading State
```typescript
interface LoadingState {
  status: 'loading';
  data: null;
  error: null;
}
```

### Success State
```typescript
interface SuccessState<T> {
  status: 'success';
  data: T;
  error: null;
}
```

### Error State
```typescript
interface ErrorState {
  status: 'error';
  data: null;
  error: {
    message: string;
    code?: string;
    retryable: boolean;
  };
}
```

### Empty State
```typescript
interface EmptyState {
  status: 'empty';
  data: [];
  error: null;
  message: string; // e.g., "Filtrelere uyan sonuç bulamadık."
}
```

---

## Request/Response Examples by UI Flow

### Flow A: Visual Filter (Dessert in Beşiktaş)

**Step 1: User taps Dessert + Beşiktaş**

Request:
```
GET /restaurants?district=besiktas&category=dessert&near=41.0422,29.0086&radius=5000&sort=rating&limit=20
```

Response: `RestaurantListResponse` with 15 dessert places in Beşiktaş

**Step 2: User taps Date-night chip**

Request:
```
GET /restaurants?district=besiktas&category=dessert&special=date-night&near=41.0422,29.0086&radius=5000&sort=rating&limit=20
```

Response: Refined list of 8 date-night-friendly dessert places

**Step 3: User taps a card**

Request:
```
GET /restaurants/rest_123abc
```

Response: `RestaurantDetailResponse` with full details

---

### Flow B: Search-First (Kebab Kadıköy)

**Step 1: User types "kebab kad"**

Request:
```
GET /search/suggestions?q=kebab+kad&limit=5
```

Response: `SearchSuggestionsResponse` with suggestions

**Step 2: User completes search and applies budget ₺₺**

Request:
```
GET /restaurants?q=kebab+kadikoy&budget=2&sort=rating&limit=20
```

Response: `RestaurantListResponse` with kebab places in Kadıköy under ₺₺

---

## Caching Strategy

### Client-side Cache (localStorage/sessionStorage)

| Data | TTL | Storage |
|------|-----|---------|
| Categories | 24 hours | localStorage |
| Districts | 24 hours | localStorage |
| User location | 1 hour | sessionStorage |
| Recent searches | 7 days | localStorage |
| Saved restaurants | Permanent | localStorage |

### API Cache Headers

```
Cache-Control: public, max-age=300, s-maxage=600
ETag: "abc123"
```

Client should send `If-None-Match` header with ETag for 304 responses.

---

## Rate Limiting

**Limits:**
- 60 requests per minute per API key
- 1000 requests per hour per API key

**Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1698765432
```

When limit exceeded, wait `retryAfter` seconds before retrying.
