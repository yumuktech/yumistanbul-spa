# Quick Reference Guide

## Essential Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run lighthouse:mobile  # Run Lighthouse (mobile)
npm run lighthouse         # Run Lighthouse (desktop)
npm run test               # Run unit tests (to be configured)

# Linting
npm run lint         # ESLint
```

---

## File Locations (Quick Navigation)

| What | Where |
|------|-------|
| **Design specs** | `docs/WIREFLOWS.md`, `docs/COMPONENTS.md` |
| **API contracts** | `docs/API.md` |
| **A11y checklist** | `docs/ACCESSIBILITY.md` |
| **Performance plan** | `docs/PERFORMANCE.md` |
| **Implementation guide** | `docs/IMPLEMENTATION_GUIDE.md` |
| **Project overview** | `README.md` |
| **Design tokens** | `src/styles/tokens.css` |
| **Base styles** | `src/styles/base.css` |
| **App entry** | `src/main.tsx` |
| **App root** | `src/app/App.tsx` |
| **Components** | `src/components/*.tsx` |
| **Features** | `src/features/*/` |

---

## CSS Variables (Most Used)

### Spacing
```css
var(--space-1)  /* 8px */
var(--space-2)  /* 16px */
var(--space-3)  /* 24px */
var(--space-4)  /* 32px */
```

### Colors
```css
var(--color-primary)           /* Vibrant coral (#FF6B35) */
var(--color-text-primary)      /* Almost black (#1A1A1A) */
var(--color-text-secondary)    /* Gray (#666666) */
var(--color-surface)           /* Light gray (#F7F7F7) */
var(--color-error)             /* Red */
var(--color-success)           /* Green */
```

### Typography
```css
var(--font-size-base)    /* 15px */
var(--font-size-lg)      /* 18px */
var(--font-size-2xl)     /* 24px */
var(--line-height-normal) /* 1.5 */
```

### Touch Targets
```css
var(--touch-target-min)     /* 44px (iOS) */
var(--touch-target-android) /* 48px (Android) */
```

### Border Radius
```css
var(--border-radius-md)   /* 8px */
var(--border-radius-xl)   /* 16px */
var(--border-radius-full) /* 9999px (pill) */
```

---

## Component Checklist (When Building)

- [ ] Props defined with TypeScript interface
- [ ] Touch target ≥44×44pt (if interactive)
- [ ] Keyboard accessible (Tab, Enter, Space, Escape, Arrows)
- [ ] Focus indicator visible (2px outline)
- [ ] ARIA labels where needed (icons, buttons)
- [ ] Color contrast ≥4.5:1 (check with WebAIM)
- [ ] Responsive (test at 375px, 768px, 1024px)
- [ ] Loading/error states handled
- [ ] Screen reader tested (VoiceOver or TalkBack)

---

## API Endpoints (Quick Reference)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/restaurants` | List restaurants (with filters) |
| GET | `/restaurants/:id` | Restaurant detail |
| GET | `/search/suggestions?q=` | Autocomplete suggestions |
| GET | `/categories` | Food categories |
| GET | `/districts` | Istanbul districts |

**Base URL:** `https://api.yumistanbul.com/v1` (or mock in dev)

---

## Filter Parameters

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `district` | `string[]` | `kadikoy,besiktas` | District names |
| `category` | `string[]` | `kebab,pizza` | Category IDs |
| `budget` | `number` | `2` | Max price tier (1, 2, 3) |
| `features` | `string[]` | `outdoor,wifi` | Feature tags |
| `special` | `string[]` | `date-night` | Special filters |
| `near` | `string` | `41.0082,28.9784` | Lat,lng |
| `radius` | `number` | `5000` | Meters (max 10000) |
| `sort` | `string` | `rating` | rating, distance, price |
| `q` | `string` | `kebab kadıköy` | Search query |

---

## Accessibility Quick Checks

### Before Committing Code:
1. **Keyboard:** Can you navigate with Tab and activate with Enter/Space?
2. **Focus:** Is focus visible (2px outline)?
3. **Screen reader:** Does VoiceOver announce content correctly?
4. **Contrast:** Run text through WebAIM checker (≥4.5:1)
5. **Touch targets:** Are all buttons ≥44×44pt?

### Tools:
- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Lighthouse:** Chrome DevTools → Lighthouse tab → Accessibility
- **axe DevTools:** Browser extension (0 violations)
- **VoiceOver:** macOS/iOS (Cmd+F5 or Settings → Accessibility)
- **TalkBack:** Android (Settings → Accessibility)

---

## Performance Quick Checks

### Before Build:
1. **Images:** Are they WebP/AVIF? ≤100 KB hero, ≤20 KB thumbnails?
2. **Lazy loading:** Are below-fold images lazy loaded?
3. **Code-splitting:** Are routes dynamically imported?
4. **Bundle size:** Run `npm run build` → check `dist/` folder sizes

### After Build:
```bash
npm run build
npm run preview
npm run lighthouse:mobile  # Check scores
```

**Targets:**
- Performance: ≥85
- Accessibility: ≥90
- LCP: ≤2.5s
- CLS: ≤0.1
- TTI: ≤3.5s

---

## User Flow Quick Summary

### Visual Filter (4 taps → result)
1. Tap category icon (e.g., Dessert 🍰)
2. Tap district chip (e.g., Beşiktaş)
3. Optional: Tap special chip (e.g., Date night 💑)
4. Tap restaurant card

### Search-First (3-4 actions → result)
1. Type query ("kebab kadıköy")
2. Adjust budget slider (₺₺)
3. Tap Apply (or auto-apply)
4. Tap restaurant card

### Work-Friendly Coffee (5 taps → result)
1. Tap Outdoor 🌳
2. Tap Work-friendly 💼
3. Tap Coffee ☕
4. Near me (auto-enabled)
5. Tap restaurant card

---

## Common Patterns

### Loading State
```tsx
{status === 'loading' && (
  <div aria-busy="true" aria-label="Yükleniyor">
    <Skeleton variant="rect" count={6} />
  </div>
)}
```

### Error State
```tsx
{status === 'error' && (
  <div role="alert">
    <p>{error.message}</p>
    <button onClick={retry}>Yeniden dene</button>
  </div>
)}
```

### Empty State
```tsx
{status === 'empty' && (
  <div>
    <p>Filtrelere uyan sonuç bulamadık.</p>
    <button onClick={clearFilters}>Filtreleri temizle</button>
  </div>
)}
```

---

## TypeScript Snippets

### Restaurant Card Props
```typescript
interface CardProps {
  restaurant: RestaurantListItem;
  onClick: (id: string) => void;
  variant?: 'grid' | 'list';
  showDistance?: boolean;
  lazy?: boolean;
}
```

### Filter State
```typescript
interface FilterState {
  districts: string[];
  categories: string[];
  features: string[];
  budget: number | null;
  special: string[];
  near: { lat: number; lng: number } | null;
  radius: number;
  sort: 'rating' | 'distance' | 'price' | 'newest';
}
```

### Async State
```typescript
type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

interface AsyncState<T> {
  status: LoadingState;
  data: T | null;
  error: Error | null;
}
```

---

## Microcopy (Turkish)

| Context | Text |
|---------|------|
| **Empty state** | "Filtreleri seçin veya kategoriye dokunun." |
| **No results** | "Filtrelere uyan sonuç bulamadık. Bütçeyi genişletmeyi deneyin." |
| **Error** | "Bağlantı sorunu. Yeniden dene." |
| **Loading** | "Yükleniyor..." |
| **Success** | "5 restoran bulundu." |
| **Location permission** | "Yakınınızdaki yerleri göstermek için konum erişimine izin verin." |
| **Button: Apply** | "Uygula" |
| **Button: Clear** | "Temizle" |
| **Button: Skip** | "Atla" |
| **Button: Save** | "Kaydet" |
| **Button: Share** | "Paylaş" |
| **Button: Directions** | "Yol tarifi" |
| **Button: Call** | "Ara" |
| **Hours: Open** | "Şu an açık · 23:00'a kadar" |
| **Hours: Closed** | "Şu an kapalı · 11:00'da açılıyor" |

---

## Common Icons (Emoji Fallback)

| Feature | Emoji | Heroicon Alternative |
|---------|-------|---------------------|
| Location | 📍 | MapPinIcon |
| Outdoor | 🌳 | TreeIcon (custom) |
| Alcohol | 🍺 | BeakerIcon |
| Dessert | 🍰 | CakeIcon (custom) |
| Meal | 🍽️ | PresentationChartBarIcon |
| Coffee | ☕ | CoffeeIcon (custom) |
| Kebab | 🍖 | Custom SVG |
| Pizza | 🍕 | Custom SVG |
| Burger | 🍔 | Custom SVG |
| Seafood | 🦞 | Custom SVG |
| Date night | 💑 | HeartIcon |
| Work-friendly | 💼 | BriefcaseIcon |
| Group-friendly | 👥 | UsersIcon |

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/chip-component

# Make changes, commit often
git add src/components/Chip.tsx
git commit -m "Add Chip component with a11y support"

# Push to remote
git push origin feature/chip-component

# Create PR, run CI checks (Lighthouse, tests)
```

---

## VS Code Extensions (Recommended)

- **ESLint:** Linting
- **Prettier:** Code formatting
- **axe Accessibility Linter:** A11y checks in editor
- **Vite:** Syntax highlighting for Vite config
- **TypeScript Vue Plugin (Volar):** Better TS support

---

## Debugging Tips

### Vite HMR not working?
```bash
# Restart dev server
npm run dev
```

### TypeScript errors in VSCode?
```bash
# Restart TS server
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Performance issues in dev?
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Lighthouse scores low?
- Check bundle size: `npm run build` → `dist/assets/*.js`
- Optimize images: Use WebP, lazy load
- Check network throttling: Lighthouse runs with simulated 3G

---

## Testing on Real Devices

### iOS (Safari + VoiceOver)
1. Run `npm run dev`
2. Open `http://<your-local-ip>:3000` on iPhone
3. Enable VoiceOver: Settings → Accessibility → VoiceOver
4. Test navigation with swipe gestures

### Android (Chrome + TalkBack)
1. Run `npm run dev`
2. Open `http://<your-local-ip>:3000` on Android
3. Enable TalkBack: Settings → Accessibility → TalkBack
4. Test navigation with swipe gestures

---

## When in Doubt...

1. **Design:** Check `docs/WIREFLOWS.md` or `docs/COMPONENTS.md`
2. **API:** Check `docs/API.md`
3. **Accessibility:** Check `docs/ACCESSIBILITY.md`
4. **Performance:** Check `docs/PERFORMANCE.md`
5. **Implementation:** Check `docs/IMPLEMENTATION_GUIDE.md`

---

## Emoji Legend

- 📄 Documentation
- 📱 Mobile/UX
- 🎨 Design/Visual
- 🧩 Components
- 🗄️ Data/API
- ♿ Accessibility
- ⚡ Performance
- 🔧 Tech/Config
- 🚀 Deployment
- 🧪 Testing
- ✅ Completed
- 🔲 To-do

---

## Success Checklist (Before Shipping)

- [ ] All user flows tested on mobile
- [ ] Lighthouse Performance ≥85
- [ ] Lighthouse Accessibility ≥90
- [ ] Touch targets ≥44×44pt verified
- [ ] Keyboard navigation works end-to-end
- [ ] Screen reader tested (VoiceOver + TalkBack)
- [ ] Color contrast ≥4.5:1 verified
- [ ] No console errors or warnings
- [ ] Bundle size ≤200 KB (gzipped)
- [ ] Images optimized (WebP/AVIF)
- [ ] API error states handled gracefully
- [ ] Empty states have helpful messaging
- [ ] Loading states show skeletons
- [ ] All P0 a11y issues fixed

**Ready to deploy!** 🚀
