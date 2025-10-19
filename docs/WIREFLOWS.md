# Yumistanbul - Wireflows & User Journeys

## Visual Filter Flow (index.html variant)

### Flow A: "I want someplace nice for dessert in Beşiktaş tonight"

```
┌─────────────┐
│   ONBOARD   │
│  (optional) │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│         HOME - VISUAL FILTER        │
│                                     │
│  📍 Near me  [Kadıköy] [Beşiktaş]  │
│  ────────────────────────────────  │
│  🍺  🌳  🍰  🍽️  ☕              │
│  Alcohol Outdoor Dessert Meal Coffee│
│                                     │
│  [Kebab] [Pizza] [Burger] [Seafood]│
│  [Asian] [Italian] [Turkish]       │
│                                     │
│  💑 Date night  💼 Work  👥 Group  │
└──────────┬──────────────────────────┘
           │
           │ (1) Tap 🍰 Dessert icon
           ▼
┌─────────────────────────────────────┐
│    Dessert filter ACTIVE (orange)   │
│  📍 Near me  [Kadıköy] [Beşiktaş]  │
│  ────────────────────────────────  │
│  🍰 ACTIVE                          │
└──────────┬──────────────────────────┘
           │
           │ (2) Tap [Beşiktaş] chip
           ▼
┌─────────────────────────────────────┐
│  Beşiktaş filter ACTIVE             │
│  📍 Beşiktaş  [Kadıköy]             │
│  🍰 Dessert selected                │
└──────────┬──────────────────────────┘
           │
           │ (3) Optional: Tap 💑 Date night
           ▼
┌─────────────────────────────────────┐
│  RESULTS GRID (4-6 cards visible)   │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ [Image]  │  │ [Image]  │       │
│  │ Café X   │  │ Patisserie│       │
│  │ 4.6 ★    │  │ 4.8 ★    │       │
│  │ ₺₺ · 600m│  │ ₺₺₺ · 1km│       │
│  │ 🍰💑    │  │ 🍰💑🌳 │       │
│  └──────────┘  └──────────┘       │
└──────────┬──────────────────────────┘
           │
           │ (4) Tap a card
           ▼
┌─────────────────────────────────────┐
│       RESTAURANT DETAIL             │
│                                     │
│  [Hero Image]                       │
│  Café X                    4.6 ★   │
│  ₺₺ · Dessert · Beşiktaş           │
│  🍰 💑 🌳 Outdoor                   │
│                                     │
│  📍 Beşiktaş Cad. No:42            │
│     600 m · [Yol tarifi]           │
│                                     │
│  🕐 Şu an açık · 23:00'a kadar     │
│  📞 0212 XXX XXXX                   │
│  🍴 Menü                            │
│                                     │
│  [Photos Carousel]                  │
│  [Reviews snippet]                  │
│  [Similar places]                   │
│                                     │
│  [💾 Save]  [🔗 Share]             │
└─────────────────────────────────────┘
```

**Interaction Count:** 4 taps (Dessert → Beşiktaş → Optional Date-night → Card)
**Time to First Result:** <3 seconds after filters applied

---

## Search-First Flow (modern.html variant)

### Flow B: "Find mid-budget kebab in Kadıköy"

```
┌─────────────┐
│   ONBOARD   │
│  (optional) │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────────────┐
│       HOME - SEARCH FIRST            │
│                                      │
│  ┌───────────────────────────────┐  │
│  │ 🔍 kebab Kadıköy              │  │
│  └───────────────────────────────┘  │
│                                      │
│  Budget: ₺ ─●────── ₺₺₺            │
│                                      │
│  [Kebab] [Pizza] [Burger] [Seafood] │
│  [Dessert] [Coffee] [Breakfast]     │
│                                      │
│  Sort: Rating ▼                      │
└──────────┬───────────────────────────┘
           │
           │ (1) Type "kebab Kadıköy" in search
           ▼
┌──────────────────────────────────────┐
│  Search active, suggestions appear   │
│  Recent: "kebab Kadıköy"             │
│  Suggestions:                        │
│    • Kebab restaurants in Kadıköy    │
│    • Adana kebab Kadıköy             │
└──────────┬───────────────────────────┘
           │
           │ (2) Slide Budget to ₺₺
           ▼
┌──────────────────────────────────────┐
│  Budget: ₺ ──●──── ₺₺₺ (₺₺ active) │
└──────────┬───────────────────────────┘
           │
           │ (3) Tap "Apply" or auto-apply
           ▼
┌──────────────────────────────────────┐
│  RESULTS LIST (5-8 cards visible)    │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [Img] Kebabçı Ali              │ │
│  │       4.7 ★ · ₺₺ · 800 m      │ │
│  │       🍖 Kebab · Kadıköy       │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │ [Img] Ocakbaşı Murat           │ │
│  │       4.5 ★ · ₺₺ · 1.2 km     │ │
│  │       🍖 Kebab · Turkish       │ │
│  └────────────────────────────────┘ │
└──────────┬───────────────────────────┘
           │
           │ (4) Optional: Sort by Distance
           │     Results re-order
           │
           │ (5) Tap a card
           ▼
┌─────────────────────────────────────┐
│       RESTAURANT DETAIL             │
│  (Same layout as Visual Flow)       │
└─────────────────────────────────────┘
```

**Interaction Count:** 3-4 taps/actions (Type + Budget + Apply + Card)
**Time to First Result:** <5 seconds (depends on typing speed)

---

## Flow C: "Work-friendly coffee with outdoor seating near me"

```
┌─────────────┐
│   ONBOARD   │
│  (optional) │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│         HOME - VISUAL FILTER        │
│                                     │
│  📍 Near me  [Kadıköy] [Beşiktaş]  │
│  ────────────────────────────────  │
│  🍺  🌳  🍰  🍽️  ☕              │
│  Alcohol Outdoor Dessert Meal Coffee│
└──────────┬──────────────────────────┘
           │
           │ (1) Tap 🌳 Outdoor
           ▼
┌─────────────────────────────────────┐
│  🌳 ACTIVE                          │
└──────────┬──────────────────────────┘
           │
           │ (2) Tap 💼 Work-friendly chip
           ▼
┌─────────────────────────────────────┐
│  🌳 Outdoor + 💼 Work ACTIVE        │
└──────────┬──────────────────────────┘
           │
           │ (3) Tap ☕ Coffee category
           ▼
┌─────────────────────────────────────┐
│  Filters: Outdoor + Work + Coffee   │
│  📍 Near me (auto-enabled)          │
└──────────┬──────────────────────────┘
           │
           │ (4) Results appear
           ▼
┌─────────────────────────────────────┐
│  RESULTS GRID                       │
│  ┌──────────┐  ┌──────────┐       │
│  │ Café A   │  │ Café B   │       │
│  │ 4.4 ★    │  │ 4.7 ★    │       │
│  │ ₺₺ · 300m│  │ ₺₺ · 450m│       │
│  │ ☕🌳💼 │  │ ☕🌳💼 │       │
│  └──────────┘  └──────────┘       │
└──────────┬──────────────────────────┘
           │
           │ (5) Tap a card
           ▼
┌─────────────────────────────────────┐
│       RESTAURANT DETAIL             │
│  Café A                    4.4 ★   │
│  ☕ Coffee · ₺₺ · 300 m            │
│  🌳 💼 Outdoor, Work-friendly      │
│                                     │
│  📶 Wi-Fi mevcut                    │
│  🔌 Priz çok                        │
│  🪑 Sessiz çalışma alanı var       │
│  ☕ Espresso, Filter, Cold Brew    │
└─────────────────────────────────────┘
```

**Interaction Count:** 5 taps (Outdoor → Work → Coffee → Near me auto → Card)
**Time to First Result:** <4 seconds

---

## State Transitions & Edge Cases

### Empty States

**Visual Filter - No filters selected**
```
┌─────────────────────────────────────┐
│  [Empty illustration]               │
│  Filtreleri seçin veya kategoriye  │
│  dokunun.                           │
└─────────────────────────────────────┘
```

**Search-First - No query**
```
┌─────────────────────────────────────┐
│  🔍 Örn. 'kebab Kadıköy' veya      │
│     'tatlı Beşiktaş'               │
│                                     │
│  Son aramalar:                      │
│  • kebab Kadıköy                    │
│  • pizza Şişli                      │
└─────────────────────────────────────┘
```

**No Results**
```
┌─────────────────────────────────────┐
│  [Empty state icon]                 │
│  Filtrelere uyan sonuç bulamadık.  │
│  Bütçeyi genişletmeyi deneyin.     │
│                                     │
│  [Temizle] [Filtreleri değiştir]  │
└─────────────────────────────────────┘
```

### Error States

**Connection Error**
```
┌─────────────────────────────────────┐
│  [Error icon]                       │
│  Bağlantı sorunu.                   │
│  [Yeniden dene]                     │
└─────────────────────────────────────┘
```

**Location Permission Denied**
```
┌─────────────────────────────────────┐
│  Konum erişimi kapalı.              │
│  Yakınınızdaki yerleri göstermek   │
│  için ayarlardan izin verin.        │
│  [Ayarlara git] [Atla]              │
└─────────────────────────────────────┘
```

### Loading States

All interactive elements show skeleton loaders during data fetch:
- Card grid: 6 skeleton cards
- Detail page: Skeleton hero + text blocks
- Search suggestions: 3 skeleton rows

---

## Navigation Patterns

### Bottom Sheet Filter (Mobile)

Triggered when tapping "Filtrele" or filter icon:

```
┌─────────────────────────────────────┐
│  ┌─┐ Filtreler                      │
│  │ │                                │
│  ├─┤ SEMT                           │
│  │ │ [Kadıköy] [Beşiktaş] [Şişli]  │
│  │ │ [Üsküdar] [Beyoğlu]            │
│  │ │                                │
│  ├─┤ KATEGORİ                       │
│  │ │ [Kebab] [Pizza] [Burger]      │
│  │ │ [Seafood] [Asian] [Italian]   │
│  │ │                                │
│  ├─┤ ÖZELLİKLER                     │
│  │ │ ☐ Outdoor  ☐ Alcohol           │
│  │ │ ☐ Wi-Fi    ☐ Parking           │
│  │ │                                │
│  ├─┤ BÜTÇE                          │
│  │ │ ₺ ─●────── ₺₺₺                │
│  │ │                                │
│  ├─┤ ÖZEL                           │
│  │ │ [💑 Date night]               │
│  │ │ [💼 Work-friendly]            │
│  │ │ [👥 Group-friendly]           │
│  └─┘                                │
│                                     │
│  [Temizle]        [Uygula]         │
└─────────────────────────────────────┘
```

**Touch Targets:**
- Each chip: min 44×44pt
- Slider handle: 48×48pt
- Apply/Clear buttons: min 44×44pt height

---

## Responsive Breakpoints

### Mobile (default, <640px)
- Single column card grid
- Full-width search bar
- Horizontal scroll for district chips
- Bottom sheet for detailed filters

### Tablet (640px - 1023px)
- 2-column card grid
- Sticky top bar with inline filters
- Side-by-side budget slider and sort

### Desktop (≥1024px)
- 3-column card grid
- Left sidebar for persistent filters
- Inline search with auto-complete dropdown

---

## Key Metrics & Success Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to First Result | <10s | From app open to first card visible |
| Filter to Card Tap | ≤3 interactions | Click depth tracking |
| Card → Detail Conversion | >40% | Analytics event |
| Repeat Use (7 days) | >30% | User retention |
| Save Actions per Session | ≥1 | Engagement metric |

---

## Accessibility Requirements

### Focus Management
- Skip link to main content (always present)
- Focus trapped in bottom sheet when open
- Visible focus indicators (2px outline)

### Screen Reader Support
- All icons have aria-labels
- Filter state announced ("Dessert seçili")
- Card information structured (name, rating, price, distance)
- Loading states announced

### Touch Targets
- iOS: min 44×44pt
- Android: min 48×48dp
- Adequate spacing between interactive elements (8pt min)

### Color Contrast
- All text: ≥4.5:1 (AA)
- Interactive elements: ≥3:1 (AA for large text/icons)
- Checked with automated tools during build

---

## Microcopy Guidelines

### Tone
- Friendly but efficient
- Turkish primary, English secondary
- Avoid jargon

### Examples
- **Empty:** "Filtreleri seçin veya kategoriye dokunun."
- **Error:** "Bağlantı sorunu. Yeniden dene."
- **Success:** "5 restoran bulundu."
- **Loading:** "Yükleniyor..."
- **No results:** "Filtrelere uyan sonuç bulamadık."

### Button Labels
- Primary: "Uygula", "Devam et", "Kaydet"
- Secondary: "Temizle", "Atla", "İptal"
- Actions: "Yol tarifi", "Ara", "Paylaş"
