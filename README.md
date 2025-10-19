# yumistanbul-spa
# Yumistanbul - Development README

## Project Overview

**Yumistanbul** is a mobile-first restaurant discovery app for Istanbul, built with Vite + React + TypeScript. The app features two UX variants:

1. **Visual Filter Interface** (`index.html` variant) - Exploratory browsing with visual icons and chips
2. **Search-First Interface** (`modern.html` variant) - Goal-oriented search with text input and filters

---

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Language:** TypeScript
- **Styling:** CSS Custom Properties (no framework for now)
- **Icons:** Heroicons or Lucide (to be decided)
- **State:** React hooks (local state, Context API for global state)
- **Routing:** React Router (to be added)
- **Testing:** Vitest + React Testing Library (to be configured)

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start dev server (with HMR)
npm run dev

# Open http://localhost:3000
```

### Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run Lighthouse audit (after build + preview)
npm run lighthouse:mobile
npm run lighthouse
```

---

## Project Structure

```
yumistanbul-spa/
├── docs/                   # 📄 Design specs & documentation
│   ├── WIREFLOWS.md        # User flows, state diagrams
│   ├── COMPONENTS.md       # Component prop tables & specs
│   ├── API.md              # API contracts, schemas
│   ├── ACCESSIBILITY.md    # A11y checklist (WCAG AA)
│   └── PERFORMANCE.md      # Lighthouse plan, budgets
├── public/                 # Static assets
│   ├── manifest.json       # PWA manifest (to be created)
│   └── robots.txt
├── src/
│   ├── app/                # App root, providers, routing
│   │   └── App.tsx
│   ├── components/         # UI primitives (reusable)
│   │   ├── Chip.tsx
│   │   ├── Card.tsx
│   │   ├── IconButton.tsx
│   │   ├── BottomSheet.tsx
│   │   ├── Badge.tsx
│   │   ├── Carousel.tsx
│   │   └── Skeleton.tsx
│   ├── features/           # Page-level components
│   │   ├── home-visual/    # Visual filter variant
│   │   ├── home-search/    # Search-first variant
│   │   ├── detail/         # Restaurant detail page
│   │   ├── onboarding/     # Onboarding flow
│   │   └── settings/       # Settings page
│   ├── data/               # Data schemas, mappers, mock data
│   │   ├── schemas/        # TypeScript interfaces
│   │   └── mappers/        # API response → UI model
│   ├── lib/                # Utilities, API client, hooks
│   │   ├── api.ts          # Fetch wrapper
│   │   ├── storage.ts      # localStorage helpers
│   │   └── location.ts     # Geolocation utilities
│   ├── styles/             # Global styles, tokens
│   │   ├── tokens.css      # Design system variables
│   │   └── base.css        # Reset, base styles
│   ├── assets/             # Images, icons, SVG sprites
│   └── main.tsx            # App entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Design System

### Spacing (8-pt grid)
- `var(--space-1)` = 8px
- `var(--space-2)` = 16px
- `var(--space-3)` = 24px
- `var(--space-4)` = 32px

### Colors

**Variant A (Bold):**
- Primary: `#FF6B35` (vibrant coral)
- Secondary: `#4ECDC4` (turquoise)
- Text: `#1A1A1A` (16.5:1 contrast - AAA)

**Variant B (Minimal):**
- Primary: `#2C2C2C` (dark gray)
- Secondary: `#757575`
- Text: `#212121`

Toggle variant with `.theme-minimal` class on `<html>`.

### Typography
- Base: 15px (mobile-optimized)
- Font stack: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- Line height: 1.5 (normal), 1.25 (tight for headings)

### Touch Targets
- iOS: min 44×44pt
- Android: min 48×48dp

### Accessibility
- All text: ≥4.5:1 contrast (WCAG AA)
- Focus indicators: 2px outline, primary color
- Skip link to main content
- Screen reader support with ARIA labels

---

## Key Concepts

### UX Modes

1. **Visual Filter (index.html):**
   - Large category icons (Kebab, Pizza, Dessert…)
   - District chips (Kadıköy, Beşiktaş…)
   - Feature toggles (Outdoor, Alcohol, Wi-Fi…)
   - Minimal typing, maximum tapping

2. **Search-First (modern.html):**
   - Prominent search bar with autocomplete
   - Budget slider (₺ to ₺₺₺)
   - Meal-kind filter chips
   - Sort by rating/distance/price

### Filters

**District:** Kadıköy, Beşiktaş, Şişli, Beyoğlu, Üsküdar, etc.  
**Category:** Kebab, Pizza, Burger, Seafood, Asian, Italian, Turkish, Dessert, Coffee, Breakfast  
**Features:** Outdoor, Alcohol, Wi-Fi, Parking, Accessible  
**Budget:** ₺ (1), ₺₺ (2), ₺₺₺ (3)  
**Special:** Date night, Work-friendly, Family-friendly, Group-friendly

### Data Flow

1. User applies filters → Component state
2. Component calls API via `lib/api.ts`
3. Response mapped to UI model via `data/mappers`
4. UI updates with loading/error/success states

---

## Component Guide

### Chip
Toggleable filter pill. Used for districts, categories, features.

**Props:** `label`, `icon`, `selected`, `onToggle`, `variant`

**Touch target:** 44px height

**Accessibility:** `aria-pressed={selected}`, keyboard accessible

---

### Card (Restaurant)
Displays restaurant info in grid or list layout.

**Props:** `restaurant`, `onClick`, `variant` (grid | list)

**Accessibility:** Semantic headings, alt text on images, structured content

---

### IconButton
Circular/square button with icon (e.g., Save, Filter, Search).

**Props:** `icon`, `onClick`, `ariaLabel` (required!), `size`, `variant`

**Touch target:** 44×44px (md), 48×48px (lg)

---

### BottomSheet
Mobile-optimized modal for filters.

**Props:** `isOpen`, `onClose`, `title`, `children`

**Accessibility:** Focus trapped, Escape closes, `aria-modal="true"`

---

### BudgetSlider
Range slider for price tier selection (₺ to ₺₺₺).

**Props:** `value`, `onChange`, `min`, `max`, `labels`

**Accessibility:** `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, keyboard operable

---

## API Integration

### Base URL
`https://api.yumistanbul.com/v1`

### Endpoints

**List Restaurants:**
```
GET /restaurants?district=kadikoy&category=kebab&budget=2&near=41.0082,28.9784&radius=3000&sort=rating&limit=20
```

**Restaurant Detail:**
```
GET /restaurants/{id}
```

**Search Suggestions:**
```
GET /search/suggestions?q=kebab+kad&limit=5
```

**Categories:**
```
GET /categories
```

**Districts:**
```
GET /districts
```

See `docs/API.md` for full schemas and examples.

---

## Development Workflow

### 1. Read the Specs
Before coding, read:
- `docs/WIREFLOWS.md` - User flows, screen layouts
- `docs/COMPONENTS.md` - Component prop tables, visual specs
- `docs/API.md` - Data contracts, TypeScript interfaces

### 2. Build Components
Start with UI primitives (`components/`), then features (`features/`).

### 3. Test Accessibility
- Run Lighthouse after each major feature
- Test keyboard navigation
- Check color contrast with WebAIM tool

### 4. Optimize Performance
- Lazy load images (`loading="lazy"`)
- Code-split routes (dynamic imports)
- Check bundle size after build

### 5. Document Changes
Update docs if you change component APIs or data schemas.

---

## Testing

### Manual Testing Checklist
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Keyboard-only navigation
- [ ] Screen reader (VoiceOver, TalkBack)
- [ ] Zoom to 200%
- [ ] Network throttling (3G Fast)

### Automated Testing (to be set up)
```bash
# Unit tests
npm run test

# Coverage
npm run test:coverage
```

---

## Performance Goals

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥95 |
| LCP (mobile) | ≤2.5s |
| TTI (mobile 3G) | ≤3.5s |
| JS bundle (gzipped) | ≤200 KB |

See `docs/PERFORMANCE.md` for full budgets and testing plan.

---

## Accessibility Goals

- WCAG AA compliance
- All text ≥4.5:1 contrast
- Touch targets ≥44×44pt (iOS) / 48×48dp (Android)
- Keyboard accessible
- Screen reader tested (VoiceOver, TalkBack)

See `docs/ACCESSIBILITY.md` for full checklist.

---

## Deployment

### Build
```bash
npm run build
```

Outputs to `dist/` folder.

### Preview
```bash
npm run preview
```

Serves production build at `http://localhost:4173`.

### Deploy
Deploy `dist/` to any static host:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

**Environment Variables:**
```
VITE_API_BASE_URL=https://api.yumistanbul.com/v1
VITE_API_KEY=your_api_key
```

---

## Next Steps for AI Agent

### Phase 1: Foundation (Current)
- ✅ Project scaffolding (Vite + TypeScript)
- ✅ Design tokens & base styles
- ✅ Documentation (wireflows, components, API, a11y, performance)
- 🔲 UI primitives implementation (Chip, Card, IconButton, etc.)
- 🔲 Mock data & API client
- 🔲 Home (Visual) page
- 🔲 Home (Search) page

### Phase 2: Core Features
- 🔲 Restaurant detail page
- 🔲 Filter bottom sheet
- 🔲 Search with autocomplete
- 🔲 Location permission flow
- 🔲 Saved restaurants (localStorage)

### Phase 3: Polish
- 🔲 Settings page
- 🔲 Onboarding flow
- 🔲 Error/empty states
- 🔲 Loading skeletons
- 🔲 Animations (respect prefers-reduced-motion)

### Phase 4: PWA (Optional)
- 🔲 Service worker
- 🔲 Manifest
- 🔲 Offline support
- 🔲 Install prompt

---

## Resources

- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/
- **Heroicons:** https://heroicons.com/
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Web.dev (Performance):** https://web.dev/vitals/
- **Lighthouse:** https://developer.chrome.com/docs/lighthouse/

---

## Contact

For questions or design clarifications, refer to:
- `docs/WIREFLOWS.md` for UX flows
- `docs/COMPONENTS.md` for component specs
- `docs/API.md` for data contracts
- `docs/ACCESSIBILITY.md` for a11y requirements
- `docs/PERFORMANCE.md` for optimization goals

Happy coding! 🚀

---

## 2025-10-19 Simplified Mobile Redesign

To better match the desired ultra-simple mobile experience, the UI was pared down:

### What Changed
- Removed complex filter panels (categories grid, additional feature sections).
- Added `FeatureFilterBar` with four core feature toggles (Alcohol, Outdoor, Meal, Coffee) + horizontal district chips.
- Replaced category/tag overload with minimal feature badges inside each restaurant card.
- Simplified `RestaurantCard`: no image, no hours, no review count, no distance metric—just name, rating, price tier, district, core feature tags.
- Introduced cartoon-style inline SVG icons (`FeatureIcons.tsx`) for playful clarity without external assets.
- Added mobile-first global tweaks in `src/styles/mobile.css` reducing shadows and tightening spacing.
- Removed unused state (detail view) from `App.tsx` to focus on one primary list screen.

### Files Added / Modified
- `src/components/filters/FeatureIcons.tsx` – cartoon SVG icon component.
- `src/components/filters/FeatureFilterBar.tsx` & `.css` – unified simple filter bar.
- `src/components/restaurant/RestaurantCard.tsx` / `.css` – stripped-down card layout.
- `src/app/App.tsx` – integrated simplified filters, removed category/search complexity.
- `src/styles/mobile.css` – global mobile adjustments.

### How Filtering Works Now
1. User taps feature chips (multi-select). If any selected, list filters restaurants whose `tags` include at least one selected feature.
2. User taps district chips (multi-select). District filtering still done server-side via existing API logic.
3. Reset button clears both feature and district selections.

### Future Minimal Enhancements (Optional)
- Add a lightweight image thumbnail only when screen width > 700px.
- Replace text feature badges with small colored pills + icons.
- Introduce a subtle sticky header with count of matches.
- Provide a single search input (debounced) only if needed—currently intentionally omitted for simplicity.

### Rationale
### Ultra Minimal Panel (Follow-up)
2025-10-19 (later): Replaced prior simplified layout with a single unified `FilterPanel` containing three sections (Restaurant Features, District, Additional Filters) using a bootstrap-like palette (`simple.css`). Added a Dessert feature icon and support for additional filters (date-night, work-friendly, group-friendly). Removed obsolete `FeatureFilterBar`.

The redesign focuses on reducing cognitive load: fewer visual elements, clear tap targets, immediate list feedback. By collapsing multiple filter concepts into one horizontal module, mobile users can filter quickly without navigating nested panels.

---
