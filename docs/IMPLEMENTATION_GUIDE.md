# AI Agent Implementation Guide

## Overview

This document provides the AI agent with a structured roadmap to implement the Yumistanbul mobile app based on the design specifications. Follow this guide sequentially to build the app without writing production code yet (specs only).

---

## Phase 1: Foundation Setup ✅ COMPLETED

### 1.1 Project Scaffolding ✅
- [x] Vite + React + TypeScript initialized
- [x] Folder structure created (`/src/app`, `/components`, `/features`, etc.)
- [x] Base configuration files (tsconfig, vite.config, etc.)

### 1.2 Design System ✅
- [x] CSS tokens defined (`src/styles/tokens.css`)
  - 8-pt spacing scale
  - Color variants (A: Bold, B: Minimal)
  - Typography scale
  - Touch target constants
  - Safe area insets
  - Z-index scale
  - Border radius, shadows
- [x] Base styles (`src/styles/base.css`)
  - Reset
  - Accessibility focus styles
  - Utility classes
  - Skeleton loader animation

### 1.3 Documentation ✅
- [x] Wireflows (`docs/WIREFLOWS.md`)
- [x] Component specs (`docs/COMPONENTS.md`)
- [x] API contracts (`docs/API.md`)
- [x] Accessibility checklist (`docs/ACCESSIBILITY.md`)
- [x] Performance plan (`docs/PERFORMANCE.md`)
- [x] Project README

### 1.4 Configuration ✅
- [x] PWA manifest (`public/manifest.json`)
- [x] HTML shell with viewport meta tags
- [x] Safe area insets configured

---

## Phase 2: Data Layer & Mock API 🔲 NEXT

### 2.1 TypeScript Schemas
**Location:** `src/data/schemas/`

Create the following TypeScript interfaces:

**`restaurant.ts`:**
```typescript
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

export interface RestaurantDetail extends RestaurantListItem {
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

// ... (copy full schemas from docs/API.md)
```

**`filters.ts`:**
```typescript
export interface FilterState {
  districts: string[];
  categories: string[];
  features: string[];
  budget: number | null;
  special: string[];
  near: { lat: number; lng: number } | null;
  radius: number;
  sort: 'rating' | 'distance' | 'price' | 'newest';
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
```

**`ui-state.ts`:**
```typescript
export type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export interface AsyncState<T> {
  status: LoadingState;
  data: T | null;
  error: Error | null;
}
```

### 2.2 Mock Data
**Location:** `src/data/mocks/`

Create mock data for development:

**`restaurants.mock.ts`:**
- 20-30 mock restaurants with realistic Turkish data
- Variety of districts, categories, price tiers
- Include images (use placeholder services like Unsplash)

**`categories.mock.ts`:**
- Kebab 🍖, Pizza 🍕, Burger 🍔, Seafood 🦞, Asian 🍜, Italian 🍝, Turkish 🇹🇷, Dessert 🍰, Coffee ☕, Breakfast 🥐

**`districts.mock.ts`:**
- Kadıköy, Beşiktaş, Şişli, Beyoğlu, Üsküdar, Fatih, Taksim, Ataşehir

### 2.3 API Client
**Location:** `src/lib/api.ts`

```typescript
// Fetch wrapper with error handling, loading states
export class ApiClient {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    this.apiKey = import.meta.env.VITE_API_KEY || '';
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    // Implementation with fetch
    // Add query params
    // Add auth header
    // Handle errors
  }

  // Specific methods:
  async getRestaurants(filters: FilterState): Promise<RestaurantListResponse> {}
  async getRestaurantDetail(id: string): Promise<RestaurantDetail> {}
  async getSearchSuggestions(query: string): Promise<SearchSuggestionsResponse> {}
  async getCategories(): Promise<Category[]> {}
  async getDistricts(): Promise<District[]> {}
}

export const api = new ApiClient();
```

**For now:** Use mock data instead of real API calls. Switch later.

### 2.4 Data Mappers
**Location:** `src/data/mappers/`

Transform API responses to UI-friendly models:

**`restaurant.mapper.ts`:**
```typescript
export function mapRestaurantListItem(raw: any): RestaurantListItem {
  // Transform API response to match UI needs
  // Format price tier (1 → "₺", 2 → "₺₺", 3 → "₺₺₺")
  // Calculate human-readable distance ("600 m", "1.2 km")
  // Parse hours
}
```

---

## Phase 3: UI Primitives 🔲

### 3.1 Component Implementation Order

Build these components in order (most foundational first):

**Priority 1: Base Components**
1. **Chip** (`src/components/Chip.tsx`)
   - Refer to `docs/COMPONENTS.md` for full prop table
   - Implement all variants (default, district, category, special)
   - Ensure 44px height touch target
   - Add `aria-pressed` for toggle state
   - Test keyboard navigation (Enter/Space)

2. **IconButton** (`src/components/IconButton.tsx`)
   - 3 sizes: sm (36px), md (44px), lg (48px)
   - Variants: primary, secondary, ghost
   - **Required:** `ariaLabel` prop for accessibility
   - Visible focus ring (2px, primary color)

3. **Badge** (`src/components/Badge.tsx`)
   - Small labels for features/categories
   - Sizes: sm (20px), md (24px)
   - Variants: default, primary, success, warning, error

4. **Skeleton** (`src/components/Skeleton.tsx`)
   - Loading placeholders
   - Variants: text, rect, circle
   - Shimmer animation (use CSS from `base.css`)

**Priority 2: Complex Components**
5. **Card** (`src/components/Card.tsx`)
   - Restaurant card for grid/list
   - 2 variants: grid (4:3 image), list (horizontal)
   - Lazy load images
   - Semantic HTML (heading, structured data)

6. **BottomSheet** (`src/components/BottomSheet.tsx`)
   - Mobile modal drawer
   - Swipe-to-close gesture
   - Focus trap (trap focus inside when open)
   - Backdrop click to close
   - Escape key to close

7. **Carousel** (`src/components/Carousel.tsx`)
   - Image gallery with swipe
   - Dot indicators
   - Arrow buttons (keyboard accessible)
   - `aria-label="Fotoğraf galerisi"`

### 3.2 Component Testing Checklist (per component)

For each component, verify:
- [ ] Renders with required props
- [ ] All prop variants work
- [ ] Touch targets ≥44×44pt
- [ ] Keyboard accessible (Tab, Enter, Space, Escape, Arrows)
- [ ] Focus indicator visible (2px outline)
- [ ] ARIA labels present where needed
- [ ] Screen reader announces correctly (test with VoiceOver)
- [ ] Color contrast ≥4.5:1 (check with WebAIM)
- [ ] Responsive (test at 375px, 768px, 1024px widths)

---

## Phase 4: Filter Controls 🔲

### 4.1 Filter Components

**Location:** `src/components/filters/`

1. **DistrictSelector** (`DistrictSelector.tsx`)
   - Horizontal scroll chips
   - Multi-select
   - `aria-label="Semt seçimi"`

2. **CategoryGrid** (`CategoryGrid.tsx`)
   - Icon grid (3-4 columns mobile, 6-8 desktop)
   - 2 variants: pictorial (large icons), compact (outline)
   - Icons from Heroicons or emoji

3. **FeatureToggles** (`FeatureToggles.tsx`)
   - Checkboxes or switches for binary features
   - Outdoor, Alcohol, Wi-Fi, Parking, etc.

4. **BudgetSlider** (`BudgetSlider.tsx`)
   - Range slider (₺ to ₺₺₺)
   - Handle: 28px visual, 48px hit area
   - Keyboard: Arrow keys to adjust
   - `aria-valuemin`, `aria-valuemax`, `aria-valuenow`

5. **SpecialChips** (`SpecialChips.tsx`)
   - Date night 💑, Work-friendly 💼, Group-friendly 👥
   - Same as Chip but with specific styling

### 4.2 Filter State Management

**Location:** `src/lib/hooks/useFilters.ts`

```typescript
export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({
    districts: [],
    categories: [],
    features: [],
    budget: null,
    special: [],
    near: null,
    radius: 5000,
    sort: 'rating',
  });

  const toggleDistrict = (district: string) => { /* ... */ };
  const toggleCategory = (category: string) => { /* ... */ };
  const toggleFeature = (feature: string) => { /* ... */ };
  const setBudget = (budget: number) => { /* ... */ };
  const clearFilters = () => { /* ... */ };

  return { filters, toggleDistrict, toggleCategory, /* ... */ };
}
```

---

## Phase 5: Page Features 🔲

### 5.1 Home (Visual Filter) Page

**Location:** `src/features/home-visual/`

**Files:**
- `HomeVisual.tsx` (main page component)
- `TopBar.tsx` (location chip + search icon)
- `FiltersSection.tsx` (icons + chips)
- `ResultsGrid.tsx` (restaurant cards)

**Layout (mobile):**
```
┌─────────────────────────────┐
│ TopBar                      │ ← Sticky
│ 📍 Near me  [Districts]    │
├─────────────────────────────┤
│ 🍺 🌳 🍰 🍽️ ☕         │ ← Feature icons
├─────────────────────────────┤
│ [Kebab] [Pizza] [Burger]   │ ← Category grid
├─────────────────────────────┤
│ 💑 💼 👥                  │ ← Special chips
├─────────────────────────────┤
│ Results Grid                │ ← Scrollable
│ ┌─────┐ ┌─────┐            │
│ │ Card│ │ Card│            │
│ └─────┘ └─────┘            │
└─────────────────────────────┘
```

**State:**
- Filters (useFilters hook)
- Loading state (skeleton cards while fetching)
- Empty state ("Filtreleri seçin...")
- Error state (connection error)

**Behavior:**
1. User taps Dessert icon → `toggleCategory('dessert')`
2. Component calls `api.getRestaurants({ categories: ['dessert'] })`
3. Show skeleton cards while loading
4. Display results in grid
5. Tap card → Navigate to detail

### 5.2 Home (Search-First) Page

**Location:** `src/features/home-search/`

**Files:**
- `HomeSearch.tsx`
- `SearchBar.tsx` (with autocomplete)
- `BudgetSlider.tsx` (filter control)
- `ResultsList.tsx` (restaurant cards, list variant)

**Layout (mobile):**
```
┌─────────────────────────────┐
│ 🔍 kebab Kadıköy           │ ← Search bar
├─────────────────────────────┤
│ Budget: ₺ ─●─── ₺₺₺       │ ← Slider
├─────────────────────────────┤
│ [Kebab] [Pizza] [Burger]   │ ← Category chips
├─────────────────────────────┤
│ Sort: Rating ▼             │ ← Dropdown
├─────────────────────────────┤
│ Results List                │ ← Scrollable
│ ┌───────────────────────┐  │
│ │ Card (list variant)   │  │
│ └───────────────────────┘  │
└─────────────────────────────┘
```

**Search autocomplete:**
- Debounce input (300ms)
- Call `api.getSearchSuggestions(query)`
- Show suggestions dropdown
- Arrow keys navigate, Enter selects

### 5.3 Restaurant Detail Page

**Location:** `src/features/detail/`

**Files:**
- `RestaurantDetail.tsx`
- `HeroSection.tsx` (image + title)
- `InfoSection.tsx` (address, hours, contact)
- `PhotosCarousel.tsx`
- `ReviewsSection.tsx`
- `SimilarPlaces.tsx`

**Layout (mobile):**
```
┌─────────────────────────────┐
│ [← Back]    [💾 Save]      │ ← Sticky top
├─────────────────────────────┤
│ [Hero Image]                │
│                             │
├─────────────────────────────┤
│ Kebabçı Ali        4.7 ★   │
│ ₺₺ · Kebab · Kadıköy       │
│ 🍖 🌳 Outdoor              │
├─────────────────────────────┤
│ 📍 Kadıköy Cad. No:42      │
│    600 m · [Yol tarifi]    │
├─────────────────────────────┤
│ 🕐 Şu an açık · 23:00'a    │
│ 📞 0216 XXX XXXX           │
│ 🍴 [Menü]                  │
├─────────────────────────────┤
│ Photos Carousel             │
├─────────────────────────────┤
│ Reviews (3 recent)          │
├─────────────────────────────┤
│ Similar Places              │
│ ┌──────┐ ┌──────┐         │
│ │ Card │ │ Card │         │
│ └──────┘ └──────┘         │
└─────────────────────────────┘
```

**Actions:**
- Save button → localStorage
- Call button → `tel:+90216XXXXXXX`
- Directions → Open Google Maps
- Share → Web Share API

---

## Phase 6: Onboarding & Settings 🔲

### 6.1 Onboarding Flow

**Location:** `src/features/onboarding/`

**Screens:**
1. **Welcome** - Logo + tagline
2. **Location Permission** - "Yakınınızdaki yerleri göstermek için..."
3. **Mode Selection** - Visual vs Search-First
4. **Done** → Navigate to Home

**State:**
- User preferences (stored in localStorage)
- Location permission status

### 6.2 Settings Page

**Location:** `src/features/settings/`

**Options:**
- Language (TR/EN)
- Distance units (km/mi)
- Theme (Light/Dark - future)
- Privacy (Location, Analytics)
- About, Feedback, Terms

---

## Phase 7: State Management & Routing 🔲

### 7.1 Global State (Context API)

**Location:** `src/app/providers/`

**`AppContext.tsx`:**
```typescript
interface AppState {
  user: {
    location: { lat: number; lng: number } | null;
    savedRestaurants: string[];
    preferences: UserPreferences;
  };
  ui: {
    theme: 'bold' | 'minimal';
    language: 'tr' | 'en';
  };
}

export const AppProvider = ({ children }) => {
  const [state, setState] = useState<AppState>(/* ... */);
  // Actions: saveRestaurant, setSavedRestaurants, setLocation, etc.
  return <AppContext.Provider value={{ state, /* actions */ }}>{children}</AppContext.Provider>;
};
```

### 7.2 Routing (React Router)

**Location:** `src/app/routes.tsx`

```typescript
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomeVisual /> }, // or <HomeSearch /> based on user preference
      { path: 'search', element: <HomeSearch /> },
      { path: 'restaurant/:id', element: <RestaurantDetail /> },
      { path: 'settings', element: <Settings /> },
      { path: 'onboarding', element: <Onboarding /> },
    ],
  },
]);
```

**Code-splitting:**
```typescript
const HomeVisual = lazy(() => import('@features/home-visual/HomeVisual'));
const HomeSearch = lazy(() => import('@features/home-search/HomeSearch'));
const RestaurantDetail = lazy(() => import('@features/detail/RestaurantDetail'));
```

---

## Phase 8: Accessibility & Testing 🔲

### 8.1 Accessibility Audit

Run through `docs/ACCESSIBILITY.md` checklist:
- [ ] Color contrast (WebAIM Contrast Checker)
- [ ] Touch targets (manual test on iPhone/Android)
- [ ] Keyboard navigation (unplug mouse, test all interactions)
- [ ] Screen reader (VoiceOver on iOS, TalkBack on Android)
- [ ] Focus indicators (visible on all interactive elements)
- [ ] ARIA labels (all icons, buttons)
- [ ] Semantic HTML (headings, landmarks)

**Tools:**
- Lighthouse Accessibility audit (≥90 score)
- axe DevTools browser extension (0 violations)
- WAVE browser extension

### 8.2 Performance Audit

Run through `docs/PERFORMANCE.md` checklist:
- [ ] Lighthouse Performance score ≥85 (mobile)
- [ ] LCP ≤2.5s (optimize hero images)
- [ ] CLS ≤0.1 (set image dimensions, use aspect-ratio)
- [ ] TTI ≤3.5s on 3G Fast
- [ ] Bundle size ≤200 KB (gzipped)

**Commands:**
```bash
npm run build
npm run preview
npm run lighthouse:mobile
```

### 8.3 Manual Testing

**Devices:**
- iPhone 12+ (Safari, VoiceOver)
- Pixel 7+ (Chrome, TalkBack)
- iPad (Safari)
- Desktop (Chrome, keyboard navigation)

**Test cases:**
- Visual Filter flow (Dessert in Beşiktaş)
- Search-First flow (Kebab Kadıköy)
- Work-friendly coffee flow
- Save restaurant
- Share restaurant
- Error states (network off)
- Empty states (no results)

---

## Phase 9: PWA Setup (Optional) 🔲

### 9.1 Service Worker

**Tool:** Vite Plugin PWA (https://vite-pwa-org.netlify.app/)

```bash
npm install -D vite-plugin-pwa
```

**`vite.config.ts`:**
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Yumistanbul',
        short_name: 'Yumistanbul',
        description: 'İstanbul yemek rehberi',
        theme_color: '#FF6B35',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.yumistanbul\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 5 * 60 },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
});
```

### 9.2 Offline Support

- Cache app shell (HTML, CSS, JS)
- Cache static assets (icons, fonts)
- Fallback page for offline navigation
- Show toast: "Çevrimdışı modasınız"

---

## Phase 10: Deployment 🔲

### 10.1 Build Optimization

```bash
npm run build
```

**Check:**
- Bundle size (dist/ folder)
- Image optimization (WebP/AVIF)
- Lighthouse score (≥85 Performance, ≥90 Accessibility)

### 10.2 Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

**Environment Variables (Vercel Dashboard):**
```
VITE_API_BASE_URL=https://api.yumistanbul.com/v1
VITE_API_KEY=your_production_api_key
```

### 10.3 Post-launch Monitoring

- Set up analytics (GA4 Web Vitals)
- Error tracking (Sentry)
- Performance monitoring (Lighthouse CI)

---

## Deliverables Checklist

### Documentation (✅ Complete)
- [x] Wireflows with state diagrams
- [x] Component prop tables & specs
- [x] API contracts & TypeScript schemas
- [x] Accessibility checklist (WCAG AA)
- [x] Performance budget & Lighthouse plan
- [x] Project README

### Specs to Generate (🔲 Next)
- [ ] **Component prop tables** (expand in COMPONENTS.md)
- [ ] **API request/response examples** tied to UI states (loading, empty, error)
- [ ] **A11y checklist per screen** (expand in ACCESSIBILITY.md)
- [ ] **Performance budget** with Lighthouse targets (in PERFORMANCE.md)

### Implementation (🔲 Future)
- [ ] UI primitives (Chip, Card, IconButton, etc.)
- [ ] Filter controls (DistrictSelector, BudgetSlider, etc.)
- [ ] Page features (Home Visual, Home Search, Detail)
- [ ] Mock data & API client
- [ ] State management (Context API)
- [ ] Routing (React Router)
- [ ] Accessibility audit (Lighthouse ≥90)
- [ ] Performance audit (Lighthouse ≥85)
- [ ] PWA setup (service worker, manifest)
- [ ] Deployment (Vercel)

---

## Success Criteria

Before marking any phase "complete," ensure:

1. **Functionality:** Feature works as described in wireflows
2. **Accessibility:** Passes WCAG AA (contrast, keyboard, screen reader)
3. **Performance:** Lighthouse Performance ≥85
4. **Mobile-first:** Touch targets ≥44×44pt, responsive on small screens
5. **Documentation:** Code documented with JSDoc, storybook examples (optional)

---

## Tips for AI Agent

1. **Read docs first:** Always refer to `docs/` before implementing
2. **Mobile-first:** Design for mobile (375px width), then scale up
3. **Accessibility:** Test keyboard + screen reader after each component
4. **Performance:** Lazy load, code-split, optimize images
5. **Incremental:** Build one component at a time, test, then move on
6. **Ask for clarification:** If specs are unclear, ask user or refer to docs

---

## Next Immediate Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Create TypeScript schemas** (`src/data/schemas/`)

4. **Create mock data** (`src/data/mocks/`)

5. **Build first component: Chip** (`src/components/Chip.tsx`)

6. **Test Chip:**
   - Renders with label + icon
   - Toggles on click
   - Keyboard accessible (Enter/Space)
   - Focus indicator visible
   - Touch target ≥44px
   - ARIA labels present

7. **Repeat for other components** (IconButton, Badge, Skeleton, Card...)

Happy building! 🚀
