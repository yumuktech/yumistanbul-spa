# Yumistanbul - Project Mindmap

```
YUMISTANBUL (Mobile-first Restaurant Discovery App)
│
├─── 🎯 CORE GOALS
│    ├─ Fast restaurant discovery (<10s to first result)
│    ├─ Two UX modes (Visual Filter vs Search-First)
│    ├─ Mobile-first responsive design
│    ├─ WCAG AA accessibility
│    └─ High performance (Lighthouse ≥85)
│
├─── 👥 USER PERSONAS
│    ├─ Local explorers (browse/discover)
│    ├─ Tourists (quick finds)
│    ├─ Work-from-cafe seekers
│    └─ Date night planners
│
├─── 📱 UX MODES
│    │
│    ├─── 🎨 VISUAL FILTER (index.html)
│    │    ├─ Large category icons (Kebab, Pizza, Coffee...)
│    │    ├─ District chips (Kadıköy, Beşiktaş...)
│    │    ├─ Feature toggles (Outdoor, Wi-Fi...)
│    │    ├─ Special chips (Date night, Work-friendly...)
│    │    └─ Minimal typing, maximum tapping
│    │
│    └─── 🔍 SEARCH-FIRST (modern.html)
│         ├─ Prominent search bar + autocomplete
│         ├─ Budget slider (₺ to ₺₺₺)
│         ├─ Quick filter chips
│         ├─ Sort options (Rating, Distance, Price)
│         └─ Type-to-refine workflow
│
├─── 🗺️ USER FLOWS
│    ├─ Flow A: "Dessert in Beşiktaş" (4 taps → result)
│    ├─ Flow B: "Kebab Kadıköy mid-budget" (3-4 actions → result)
│    └─ Flow C: "Work-friendly coffee outdoor near me" (5 taps → result)
│
├─── 📄 SCREENS
│    ├─ Onboarding (location + mode selection)
│    ├─ Home (Visual Filter)
│    ├─ Home (Search-First)
│    ├─ Restaurant Detail
│    ├─ Settings
│    └─ Bottom Sheet (Filters)
│
├─── 🧩 UI PRIMITIVES (Components)
│    │
│    ├─── Foundation
│    │    ├─ AppShell (safe areas, layout)
│    │    ├─ TopBar (location/search)
│    │    ├─ Chip (toggleable pill)
│    │    ├─ IconButton (44×44pt minimum)
│    │    ├─ Badge (category/feature labels)
│    │    └─ Skeleton (loading states)
│    │
│    └─── Complex
│         ├─ Card (restaurant info, grid/list)
│         ├─ BottomSheet (mobile modal)
│         ├─ Carousel (photo gallery)
│         └─ BudgetSlider (₺ to ₺₺₺)
│
├─── 🎛️ FILTER CONTROLS
│    ├─ DistrictSelector (horizontal scroll chips)
│    ├─ CategoryGrid (icon grid, 3-4 cols mobile)
│    ├─ FeatureToggles (Outdoor, Alcohol, Wi-Fi...)
│    ├─ BudgetSlider (range 1-3)
│    └─ SpecialChips (Date night, Work, Group)
│
├─── 🗄️ DATA LAYER
│    │
│    ├─── Schemas (TypeScript)
│    │    ├─ RestaurantListItem
│    │    ├─ RestaurantDetail
│    │    ├─ Category, District
│    │    ├─ FilterState
│    │    └─ AsyncState (loading, error, success)
│    │
│    ├─── API Client
│    │    ├─ GET /restaurants (list)
│    │    ├─ GET /restaurants/:id (detail)
│    │    ├─ GET /search/suggestions (autocomplete)
│    │    ├─ GET /categories
│    │    └─ GET /districts
│    │
│    ├─── Mappers
│    │    ├─ API response → UI model
│    │    ├─ Price tier (1 → "₺", 2 → "₺₺")
│    │    └─ Distance (850m → "850 m", 1500m → "1.5 km")
│    │
│    └─── Mock Data (dev phase)
│         ├─ 20-30 restaurants
│         ├─ 10 categories
│         └─ 8 districts
│
├─── 🎨 DESIGN SYSTEM
│    │
│    ├─── Spacing (8-pt grid)
│    │    ├─ --space-1: 8px
│    │    ├─ --space-2: 16px
│    │    ├─ --space-3: 24px
│    │    └─ --space-4: 32px
│    │
│    ├─── Colors
│    │    ├─ Variant A (Bold): #FF6B35, #4ECDC4
│    │    └─ Variant B (Minimal): #2C2C2C, #757575
│    │
│    ├─── Typography
│    │    ├─ Base: 15px (mobile-optimized)
│    │    ├─ Scale: 12/14/15/16/18/20/24/30/36px
│    │    └─ Line height: 1.5 (normal), 1.25 (tight)
│    │
│    ├─── Touch Targets
│    │    ├─ iOS: 44×44pt minimum
│    │    └─ Android: 48×48dp minimum
│    │
│    ├─── Border Radius
│    │    ├─ sm: 4px, md: 8px, lg: 12px, xl: 16px
│    │    └─ full: 9999px (pills)
│    │
│    └─── Shadows
│         ├─ sm, md, lg, xl
│         └─ Used for cards, modals, dropdowns
│
├─── ♿ ACCESSIBILITY (WCAG AA)
│    │
│    ├─── Color & Contrast
│    │    ├─ All text ≥4.5:1 contrast
│    │    ├─ Interactive elements ≥3:1
│    │    └─ Not color-only indicators
│    │
│    ├─── Touch & Gestures
│    │    ├─ All targets ≥44×44pt (iOS) / 48×48dp (Android)
│    │    ├─ Adequate spacing (8px min)
│    │    └─ Complex gestures have simple alternatives
│    │
│    ├─── Keyboard Navigation
│    │    ├─ Tab order matches visual order
│    │    ├─ No keyboard traps
│    │    ├─ Skip link to main content
│    │    └─ Focus visible (2px outline, primary color)
│    │
│    ├─── Screen Reader Support
│    │    ├─ Semantic HTML (h1→h2→h3, landmarks)
│    │    ├─ ARIA labels on icons/buttons
│    │    ├─ aria-live for dynamic content
│    │    ├─ aria-pressed for toggle states
│    │    └─ alt text on images
│    │
│    └─── Testing
│         ├─ VoiceOver (iOS/macOS)
│         ├─ TalkBack (Android)
│         ├─ Lighthouse Accessibility ≥90
│         └─ axe DevTools (0 violations)
│
├─── ⚡ PERFORMANCE
│    │
│    ├─── Core Web Vitals
│    │    ├─ LCP ≤2.5s (optimize hero images)
│    │    ├─ FID ≤100ms (avoid long JS tasks)
│    │    └─ CLS ≤0.1 (set image dimensions)
│    │
│    ├─── Bundle Sizes (gzipped)
│    │    ├─ Initial JS: ≤150 KB
│    │    ├─ Total JS: ≤300 KB
│    │    ├─ Total CSS: ≤40 KB
│    │    └─ Per-route code-split
│    │
│    ├─── Images
│    │    ├─ Hero: ≤100 KB (WebP/AVIF)
│    │    ├─ Thumbnail: ≤20 KB
│    │    ├─ Lazy load below-fold
│    │    └─ Responsive srcset
│    │
│    ├─── API Response Times
│    │    ├─ GET /restaurants: ≤500ms
│    │    ├─ GET /restaurants/:id: ≤300ms
│    │    └─ GET /search/suggestions: ≤200ms
│    │
│    └─── Optimizations
│         ├─ Code-splitting (Vite default)
│         ├─ Tree-shaking (ES modules)
│         ├─ Lazy load components
│         ├─ Cache static data (localStorage)
│         └─ Debounce search (300ms)
│
├─── 🔧 TECH STACK
│    ├─ Framework: React 18
│    ├─ Build Tool: Vite 5
│    ├─ Language: TypeScript
│    ├─ Styling: CSS Custom Properties
│    ├─ Icons: Heroicons or Lucide
│    ├─ State: React hooks + Context API
│    ├─ Routing: React Router
│    └─ Testing: Vitest + React Testing Library
│
├─── 📂 FOLDER STRUCTURE
│    ├─ /docs (specs, wireflows, API contracts)
│    ├─ /src
│    │   ├─ /app (routes, layout, providers)
│    │   ├─ /components (UI primitives)
│    │   ├─ /features (page-level components)
│    │   ├─ /data (schemas, mappers, mocks)
│    │   ├─ /lib (API client, utilities, hooks)
│    │   ├─ /styles (tokens, base styles)
│    │   └─ /assets (icons, images)
│    └─ /public (manifest, robots.txt)
│
├─── 🚀 DEPLOYMENT
│    ├─ Build: npm run build
│    ├─ Preview: npm run preview
│    ├─ Host: Vercel, Netlify, Cloudflare Pages
│    └─ CDN: Static assets on edge
│
├─── 🔄 STATE MANAGEMENT
│    ├─ Local state: useState, useReducer
│    ├─ Global state: Context API
│    │   ├─ User preferences
│    │   ├─ Saved restaurants
│    │   └─ Location data
│    └─ Filter state: useFilters hook
│
├─── 📱 PWA (Phase 2, Optional)
│    ├─ manifest.json (already created)
│    ├─ Service worker (Vite Plugin PWA)
│    ├─ Cache-first for static assets
│    ├─ Network-first for API calls
│    ├─ Offline fallback page
│    └─ Install prompt
│
├─── 🧪 TESTING STRATEGY
│    │
│    ├─── Manual Testing
│    │    ├─ iPhone 12+ (Safari, VoiceOver)
│    │    ├─ Pixel 7+ (Chrome, TalkBack)
│    │    ├─ iPad (Safari)
│    │    └─ Desktop (Chrome, keyboard)
│    │
│    ├─── Automated Testing
│    │    ├─ Lighthouse CI (Performance, A11y)
│    │    ├─ axe DevTools (A11y violations)
│    │    ├─ WAVE (A11y checker)
│    │    └─ Vitest (unit tests)
│    │
│    └─── Test Cases
│         ├─ Visual Filter flow
│         ├─ Search-First flow
│         ├─ Save restaurant
│         ├─ Error states
│         └─ Empty states
│
├─── 📊 METRICS & GOALS
│    ├─ Time to first result: <10s
│    ├─ Filter to card tap: ≤3 interactions
│    ├─ Card → Detail conversion: >40%
│    ├─ Repeat use (7 days): >30%
│    ├─ Save actions per session: ≥1
│    ├─ Lighthouse Performance: ≥85
│    └─ Lighthouse Accessibility: ≥90
│
├─── 📚 DOCUMENTATION
│    ├─ README.md (project overview)
│    ├─ WIREFLOWS.md (user flows, states)
│    ├─ COMPONENTS.md (prop tables, specs)
│    ├─ API.md (contracts, schemas)
│    ├─ ACCESSIBILITY.md (WCAG checklist)
│    ├─ PERFORMANCE.md (budgets, Lighthouse plan)
│    └─ IMPLEMENTATION_GUIDE.md (phase-by-phase roadmap)
│
└─── 🎯 SUCCESS CRITERIA
     ├─ All P0 a11y issues fixed
     ├─ Lighthouse scores: Perf ≥85, A11y ≥90
     ├─ Touch targets ≥44×44pt verified
     ├─ Keyboard navigation works end-to-end
     ├─ Screen reader tested (iOS + Android)
     ├─ Bundle size ≤200 KB (gzipped)
     └─ User flows complete in ≤3-5 interactions
```

---

## Visual Diagram: Component Hierarchy

```
AppShell
├── TopBar (variant: location | search)
│   ├── LocationChip
│   ├── SearchBar
│   └── IconButton (filter, search, menu)
│
├── main (scrollable content)
│   │
│   ├── HOME (VISUAL FILTER)
│   │   ├── DistrictSelector
│   │   │   └── Chip × N
│   │   ├── FeatureIconsRow
│   │   │   └── IconButton × 5 (Alcohol, Outdoor, Dessert, Meal, Coffee)
│   │   ├── CategoryGrid
│   │   │   └── Chip × 12 (Kebab, Pizza, Burger...)
│   │   ├── SpecialChips
│   │   │   └── Chip × 3 (Date night, Work, Group)
│   │   └── ResultsGrid
│   │       └── Card × N (restaurant cards)
│   │
│   ├── HOME (SEARCH-FIRST)
│   │   ├── SearchBar (with autocomplete dropdown)
│   │   ├── BudgetSlider
│   │   ├── CategoryChips
│   │   │   └── Chip × N
│   │   ├── SortDropdown
│   │   └── ResultsList
│   │       └── Card × N (list variant)
│   │
│   └── RESTAURANT DETAIL
│       ├── BackButton
│       ├── SaveButton
│       ├── HeroImage
│       ├── TitleSection
│       │   ├── Name (h1)
│       │   ├── Rating + ReviewCount
│       │   ├── PriceTier + Category
│       │   └── Tags (Badge × N)
│       ├── InfoSection
│       │   ├── Address + Distance
│       │   ├── Hours (open/closed)
│       │   ├── Contact (phone, website)
│       │   └── Features (Wi-Fi, Outdoor...)
│       ├── PhotosCarousel
│       │   └── Image × N
│       ├── ReviewsSection
│       │   └── Review × 3 (recent)
│       └── SimilarPlaces
│           └── Card × 4
│
├── BottomSheet (filters, modal)
│   ├── SheetHeader (drag handle, close button)
│   ├── FilterSections
│   │   ├── DistrictSelector
│   │   ├── CategoryGrid
│   │   ├── FeatureToggles
│   │   ├── BudgetSlider
│   │   └── SpecialChips
│   └── ActionButtons
│       ├── Button (Temizle)
│       └── Button (Uygula)
│
└── BottomNav (optional, phase 2)
    ├── NavLink (Home)
    ├── NavLink (Search)
    ├── NavLink (Saved)
    └── NavLink (Settings)
```

---

## Data Flow Diagram

```
USER ACTION
    ↓
COMPONENT (e.g., Chip)
    ↓
EVENT HANDLER (e.g., toggleCategory)
    ↓
STATE UPDATE (FilterState)
    ↓
API CLIENT (lib/api.ts)
    ↓
FETCH REQUEST
    ↓
API RESPONSE (JSON)
    ↓
MAPPER (data/mappers)
    ↓
UI MODEL (RestaurantListItem[])
    ↓
COMPONENT RE-RENDER
    ↓
USER SEES RESULTS
```

---

## Filter State Flow

```
FilterState
├─ districts: string[]
├─ categories: string[]
├─ features: string[]
├─ budget: number | null
├─ special: string[]
├─ near: { lat, lng } | null
├─ radius: number
└─ sort: 'rating' | 'distance' | 'price'

↓ (applied to API request)

GET /restaurants?district=kadikoy&category=kebab&budget=2&near=41.0082,28.9784&radius=3000&sort=rating

↓ (response)

RestaurantListResponse
├─ data: RestaurantListItem[]
├─ meta: { total, page, limit, hasNext, hasPrev }
└─ filters: { applied, available }

↓ (mapped to UI)

ResultsGrid / ResultsList
└─ Card × N
```

---

## Accessibility Flow

```
KEYBOARD USER
    ↓
Tab to Chip
    ↓
Focus visible (2px outline, primary color)
    ↓
Press Enter or Space
    ↓
Chip toggles (aria-pressed="true")
    ↓
Screen reader announces: "Kebab seçili"
    ↓
Results update
    ↓
aria-live="polite" announces: "15 restoran bulundu"
```

---

## Performance Optimization Flow

```
PAGE LOAD
    ↓
HTML + Critical CSS (inline <15 KB)
    ↓
Main JS Bundle (≤150 KB gzipped)
    ↓
React hydration
    ↓
Lazy load route components (Home, Detail)
    ↓
Fetch API data (background)
    ↓
Show skeleton loaders (aria-busy="true")
    ↓
Data arrives → Render results
    ↓
Lazy load below-fold images
    ↓
Preload Detail page on card hover
    ↓
TTI ≤3.5s on 3G Fast
```

---

## PWA Caching Strategy

```
SERVICE WORKER

Static Assets (CSS, JS, fonts, icons)
    → Cache-First
    → 30 days TTL

API Responses (/restaurants)
    → Network-First
    → 5 min TTL

Images (restaurant photos)
    → Stale-While-Revalidate
    → 7 days TTL

Offline Fallback
    → Serve cached app shell + "Çevrimdışı" message
```

---

## Deployment Flow

```
DEVELOPMENT
    ↓
npm run build
    ↓
dist/ folder (optimized bundles)
    ↓
npm run preview (test locally)
    ↓
Lighthouse audit
    ├─ Performance ≥85 ✓
    ├─ Accessibility ≥90 ✓
    ├─ Best Practices ≥90 ✓
    └─ SEO ≥90 ✓
    ↓
Deploy to Vercel
    ↓
PRODUCTION
    ├─ CDN (static assets)
    ├─ Edge functions (API)
    └─ Analytics (RUM, Sentry)
```

---

## Quick Decision Tree: Which UX Mode?

```
User opens app
    ↓
Onboarding asks: "How do you want to discover restaurants?"
    ↓
    ├─ "Show me good places near me"
    │   → Visual Filter Mode
    │   → Large icons, minimal typing
    │   → Best for: Exploratory browsing
    │
    └─ "I know what I want"
        → Search-First Mode
        → Type + filter + sort
        → Best for: Goal-oriented searches
```

---

## This mindmap visualizes:
1. **Project structure** (folders, files, components)
2. **User flows** (3 core tasks)
3. **Data flow** (user action → API → UI)
4. **Design system** (spacing, colors, typography)
5. **Accessibility** (keyboard, screen reader, focus)
6. **Performance** (bundle sizes, Core Web Vitals)
7. **Testing strategy** (manual + automated)
8. **Deployment** (build → preview → production)

Use this as a high-level reference when implementing features!
