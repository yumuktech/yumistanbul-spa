# Component Specifications & Prop Tables

## UI Primitives

### Chip

**Description:** Toggleable filter pill with icon support. Mobile touch-optimized.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Display text |
| `icon` | `ReactNode` | No | `null` | Leading icon (emoji or SVG) |
| `selected` | `boolean` | No | `false` | Active/selected state |
| `onToggle` | `() => void` | Yes | - | Click handler |
| `variant` | `'default' \| 'district' \| 'category' \| 'special'` | No | `'default'` | Visual style variant |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `ariaLabel` | `string` | No | `label` | Accessibility label |

**Visual Specs:**
- Height: 44px (iOS min touch target)
- Padding: 12px horizontal, 8px vertical
- Border-radius: `var(--border-radius-full)` (pill shape)
- Font-size: `var(--font-size-sm)` (14px)
- States:
  - Default: `background: var(--color-surface)`, `border: 1px solid var(--color-text-secondary)`
  - Selected: `background: var(--color-primary)`, `color: white`
  - Hover: `opacity: 0.8`
  - Disabled: `opacity: 0.5`, `cursor: not-allowed`

**Accessibility:**
- `role="button"`
- `aria-pressed={selected}`
- `tabIndex={0}`
- Keyboard: Enter/Space to toggle

**Example Usage:**
```tsx
<Chip
  label="Kadıköy"
  icon="📍"
  selected={isSelected}
  onToggle={() => handleDistrictToggle('kadikoy')}
  variant="district"
  ariaLabel="Kadıköy semtini filtrele"
/>
```

---

### IconButton

**Description:** Circular or square button with icon. Minimum 44×44pt touch target.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `icon` | `ReactNode` | Yes | - | Icon content (SVG or emoji) |
| `onClick` | `() => void` | Yes | - | Click handler |
| `ariaLabel` | `string` | Yes | - | Accessibility label (required!) |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Button size |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | No | `'ghost'` | Visual style |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `active` | `boolean` | No | `false` | Active/selected state |

**Visual Specs:**
- Sizes:
  - `sm`: 36×36px (use sparingly, ensure adequate spacing)
  - `md`: 44×44px (default, iOS min)
  - `lg`: 48×48px (Android min)
- Border-radius: `var(--border-radius-md)` or `var(--border-radius-full)`
- States:
  - Primary: `background: var(--color-primary)`, `color: white`
  - Secondary: `background: var(--color-surface)`, `border: 1px solid`
  - Ghost: `background: transparent`, `hover: background: rgba(0,0,0,0.05)`
  - Active: Add border or background overlay

**Accessibility:**
- `role="button"`
- `aria-label` (required, describes action)
- Visible focus ring
- Min 44×44pt hit area (even if visual smaller)

**Example Usage:**
```tsx
<IconButton
  icon={<HeartIcon />}
  onClick={handleSave}
  ariaLabel="Restoranı kaydet"
  variant="primary"
  size="md"
/>
```

---

### Card (Restaurant)

**Description:** Restaurant information card for grid/list display.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `restaurant` | `Restaurant` | Yes | - | Restaurant data object |
| `onClick` | `(id: string) => void` | Yes | - | Card click handler |
| `variant` | `'grid' \| 'list'` | No | `'grid'` | Layout style |
| `showDistance` | `boolean` | No | `true` | Show distance badge |
| `lazy` | `boolean` | No | `true` | Lazy load image |

**Restaurant Object:**
```typescript
interface Restaurant {
  id: string;
  name: string;
  rating: number; // 0-5
  priceTier: 1 | 2 | 3; // ₺, ₺₺, ₺₺₺
  distance_m: number; // meters
  images: string[]; // URLs
  categories: string[]; // ["Kebab", "Turkish"]
  tags: string[]; // ["outdoor", "alcohol", "wifi"]
  location: { lat: number; lng: number };
  district: string;
}
```

**Visual Specs:**

**Grid Variant:**
- Width: 100% (mobile), 50% (tablet), 33% (desktop)
- Aspect ratio: 4:3 for image
- Padding: `var(--space-2)`
- Border-radius: `var(--border-radius-xl)`
- Shadow: `var(--shadow-md)`
- Layout:
  ```
  ┌────────────────┐
  │  [Image 4:3]   │
  │                │
  ├────────────────┤
  │ Name     4.6 ★ │
  │ ₺₺ · 600 m    │
  │ 🍰 💑 🌳     │
  └────────────────┘
  ```

**List Variant:**
- Horizontal layout
- Image: 80×80px thumbnail
- Full width on mobile
- Layout:
  ```
  ┌────┬──────────────────┐
  │[Img│ Name       4.6 ★ │
  │ 80×│ ₺₺ · Dessert     │
  │ 80]│ 600 m · Beşiktaş │
  └────┴──────────────────┘
  ```

**Accessibility:**
- `role="article"` or `role="button"` (if entire card clickable)
- Semantic heading for name (`<h3>`)
- Alt text for image: "{name} restoranı"
- Structured info for screen readers

**Example Usage:**
```tsx
<Card
  restaurant={restaurantData}
  onClick={(id) => navigate(`/restaurant/${id}`)}
  variant="grid"
  showDistance={true}
/>
```

---

### BottomSheet

**Description:** Mobile-optimized modal drawer for filters. Slides up from bottom.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isOpen` | `boolean` | Yes | - | Open/closed state |
| `onClose` | `() => void` | Yes | - | Close handler |
| `title` | `string` | No | `''` | Sheet title/heading |
| `children` | `ReactNode` | Yes | - | Sheet content |
| `height` | `'auto' \| 'half' \| 'full'` | No | `'auto'` | Sheet height |

**Visual Specs:**
- Max-height: 90vh (leave space for safe areas)
- Border-radius: `var(--border-radius-xl)` (top corners only)
- Background: `var(--color-surface)`
- Shadow: `var(--shadow-xl)`
- Backdrop: `rgba(0, 0, 0, 0.5)`
- Handle indicator (optional): 32×4px rounded bar at top

**Behavior:**
- Swipe down to close (mobile)
- Click backdrop to close
- Escape key to close
- Prevent body scroll when open
- Trap focus inside sheet

**Accessibility:**
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` points to title
- Focus trapped inside when open
- Focus returns to trigger on close
- Escape key closes sheet

**Example Usage:**
```tsx
<BottomSheet
  isOpen={isFilterOpen}
  onClose={() => setIsFilterOpen(false)}
  title="Filtreler"
  height="auto"
>
  <FilterControls />
  <div className="actions">
    <Button onClick={clearFilters} variant="secondary">Temizle</Button>
    <Button onClick={applyFilters} variant="primary">Uygula</Button>
  </div>
</BottomSheet>
```

---

### Badge

**Description:** Small label for categories, features, or counts.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string \| number` | Yes | - | Badge content |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error'` | No | `'default'` | Color variant |
| `size` | `'sm' \| 'md'` | No | `'sm'` | Size |
| `icon` | `ReactNode` | No | `null` | Leading icon |

**Visual Specs:**
- Sizes:
  - `sm`: height 20px, padding 4px 8px, font-size 12px
  - `md`: height 24px, padding 6px 10px, font-size 13px
- Border-radius: `var(--border-radius-full)`
- Font-weight: `var(--font-weight-medium)`
- Variants:
  - default: Gray background
  - primary: Primary color
  - success: Green
  - warning: Orange
  - error: Red

**Example Usage:**
```tsx
<Badge label="Outdoor" icon="🌳" variant="success" />
<Badge label="New" variant="primary" />
<Badge label={3} size="sm" /> {/* Notification count */}
```

---

### Carousel

**Description:** Swipeable image gallery for restaurant photos.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `images` | `string[]` | Yes | - | Array of image URLs |
| `alt` | `string` | Yes | - | Alt text template |
| `aspectRatio` | `string` | No | `'16/9'` | CSS aspect-ratio |
| `showIndicators` | `boolean` | No | `true` | Show dot indicators |
| `autoPlay` | `boolean` | No | `false` | Auto-advance slides |

**Visual Specs:**
- Full width on mobile
- Swipe gesture support (touch)
- Keyboard: Arrow keys to navigate
- Indicators: Dots at bottom (8px diameter)
- Active indicator: Primary color
- Transition: Smooth slide (300ms ease)

**Accessibility:**
- `role="region"`
- `aria-label="Fotoğraf galerisi"`
- `aria-live="polite"` for auto-play
- Alt text: "{restaurant.name} - Fotoğraf {index + 1}"

**Example Usage:**
```tsx
<Carousel
  images={restaurant.images}
  alt={`${restaurant.name} restoranı`}
  aspectRatio="4/3"
  showIndicators={true}
/>
```

---

### Skeleton

**Description:** Loading placeholder with animation.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'text' \| 'rect' \| 'circle'` | No | `'text'` | Shape |
| `width` | `string \| number` | No | `'100%'` | Width |
| `height` | `string \| number` | No | `'1em'` | Height |
| `count` | `number` | No | `1` | Number of skeletons |

**Visual Specs:**
- Background: `var(--color-surface)`
- Animation: Shimmer effect (gradient moving left-to-right)
- Border-radius: Matches variant (text: 4px, rect: 8px, circle: 50%)

**Example Usage:**
```tsx
<Skeleton variant="rect" width="100%" height="200px" />
<Skeleton variant="text" count={3} />
<Skeleton variant="circle" width="48px" height="48px" />
```

---

## Filter Controls

### DistrictSelector

**Description:** Horizontal scrollable list of district chips.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `districts` | `string[]` | Yes | - | List of districts |
| `selectedDistricts` | `string[]` | Yes | - | Currently selected |
| `onToggle` | `(district: string) => void` | Yes | - | Toggle handler |
| `multiSelect` | `boolean` | No | `true` | Allow multiple selections |

**Visual Specs:**
- Container: `overflow-x: auto`, `display: flex`, `gap: var(--space-1)`
- Scroll padding: `var(--space-2)` on sides
- Hide scrollbar on desktop (show on mobile)
- Snap to grid on scroll

**Accessibility:**
- `role="group"`
- `aria-label="Semt seçimi"`
- Each chip has aria-pressed state

---

### CategoryGrid

**Description:** Icon grid for food categories.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `categories` | `Category[]` | Yes | - | List of categories |
| `selectedCategories` | `string[]` | Yes | - | Currently selected |
| `onToggle` | `(categoryId: string) => void` | Yes | - | Toggle handler |
| `variant` | `'pictorial' \| 'compact'` | No | `'pictorial'` | Visual style |

**Category Object:**
```typescript
interface Category {
  id: string;
  name: string;
  icon: string; // Emoji or icon component
}
```

**Visual Specs:**

**Pictorial Variant:**
- Grid: 3-4 columns on mobile, 6-8 on desktop
- Icon size: 48×48px
- Label below icon
- Padding: `var(--space-2)`
- Border-radius: `var(--border-radius-xl)`
- Active: Primary color background

**Compact Variant:**
- Grid: 4-5 columns on mobile
- Icon size: 32×32px
- Smaller padding
- Outline style

---

### FeatureToggles

**Description:** Switch/checkbox group for binary features.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `features` | `Feature[]` | Yes | - | List of features |
| `selectedFeatures` | `string[]` | Yes | - | Currently selected |
| `onToggle` | `(featureId: string) => void` | Yes | - | Toggle handler |

**Feature Object:**
```typescript
interface Feature {
  id: string;
  name: string;
  icon: string;
}
```

**Visual Specs:**
- Layout: Vertical list or horizontal chips
- Each item: Icon + label + toggle (checkbox or switch)
- Min height: 44px (iOS touch target)

---

### BudgetSlider

**Description:** Range slider for price tier (₺ to ₺₺₺).

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `number` | Yes | - | Current value (1-3) |
| `onChange` | `(value: number) => void` | Yes | - | Change handler |
| `min` | `number` | No | `1` | Min value |
| `max` | `number` | No | `3` | Max value |
| `step` | `number` | No | `1` | Step increment |
| `labels` | `string[]` | No | `['₺', '₺₺', '₺₺₺']` | Tick labels |

**Visual Specs:**
- Track height: 4px
- Handle size: 28×28px (ensure 44×44pt hit area with padding)
- Active track: Primary color
- Inactive track: Gray
- Labels below at each step
- Touch area: 48×48px around handle

**Accessibility:**
- `role="slider"`
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- `aria-label="Bütçe seçimi"`
- Keyboard: Arrow keys to adjust

**Example Usage:**
```tsx
<BudgetSlider
  value={budgetTier}
  onChange={(value) => setBudgetTier(value)}
  labels={['₺', '₺₺', '₺₺₺']}
/>
```

---

### SpecialChips

**Description:** Toggleable chips for special contexts (Date night, Work, Group).

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `specials` | `Special[]` | Yes | - | List of special filters |
| `selectedSpecials` | `string[]` | Yes | - | Currently selected |
| `onToggle` | `(specialId: string) => void` | Yes | - | Toggle handler |

**Special Object:**
```typescript
interface Special {
  id: string;
  name: string;
  icon: string;
  description?: string; // Tooltip text
}
```

**Visual Specs:**
- Same as Chip component
- Larger icons (emoji 20px)
- Optional tooltip on long press

---

## Page Components

### AppShell

**Description:** Root layout wrapper with safe areas and navigation.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | Page content |
| `topBar` | `ReactNode` | No | `null` | Top bar/header |
| `bottomNav` | `ReactNode` | No | `null` | Bottom navigation |
| `variant` | `'visual' \| 'search'` | Yes | - | UX mode |

**Visual Specs:**
- Handle safe-area-inset for notched devices
- Sticky top bar (z-index: `var(--z-sticky)`)
- Optional bottom nav (iOS Safari compatible)

---

### TopBar

**Description:** Context-aware header with location/search.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'location' \| 'search'` | Yes | - | Display mode |
| `locationLabel` | `string` | No | `'Near me'` | Location text |
| `onLocationClick` | `() => void` | No | - | Location click handler |
| `onSearchFocus` | `() => void` | No | - | Search focus handler |

**Visual Specs:**
- Height: 56px + safe-area-inset-top
- Background: `var(--color-surface)`
- Shadow on scroll
- Sticky positioning

---

## Component Hierarchy Example

```
AppShell
├── TopBar (variant="location")
│   ├── LocationChip
│   └── IconButton (search/filter)
├── main (scrollable)
│   ├── DistrictSelector
│   ├── CategoryGrid
│   │   └── IconButton × 12
│   ├── FeatureToggles
│   │   └── Chip × 4
│   └── ResultsGrid
│       └── Card × N
└── BottomSheet (filters)
    ├── DistrictSelector
    ├── CategoryGrid
    ├── FeatureToggles
    ├── BudgetSlider
    ├── SpecialChips
    └── ActionButtons
        ├── Button (Temizle)
        └── Button (Uygula)
```

---

## Performance Notes

- **Code-split pages:** Each page (Home Visual, Home Search, Detail, Settings) in separate chunks
- **Lazy load images:** Use `loading="lazy"` + intersection observer
- **Virtualize long lists:** Consider react-window for >100 items
- **Memoize expensive components:** Card, Carousel
- **Debounce search input:** 300ms delay
- **Preload critical chunks:** Detail page when hovering over card

---

## Testing Checklist per Component

- [ ] Renders with required props
- [ ] Handles all prop variants
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Touch targets meet 44×44pt minimum
- [ ] Focus indicators visible
- [ ] Color contrast passes AA (4.5:1)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Loading/error states handled
- [ ] Animations perform at 60fps
