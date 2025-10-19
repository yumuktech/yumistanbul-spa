# Performance Budget & Lighthouse Plan

## Performance Budget

### Lighthouse Score Targets

| Metric | Target | Minimum | Notes |
|--------|--------|---------|-------|
| **Performance** | ≥90 | ≥85 | Mobile-first priority |
| **Accessibility** | ≥95 | ≥90 | WCAG AA compliance |
| **Best Practices** | ≥95 | ≥90 | Security, HTTPS, console errors |
| **SEO** | ≥95 | ≥90 | Meta tags, structured data |
| **PWA** | ✓ | ✓ | Installable, offline-capable (optional phase 2) |

---

## Core Web Vitals Targets

### Largest Contentful Paint (LCP)
**Target:** ≤2.5s  
**Max acceptable:** ≤4.0s

**Optimization strategies:**
- [ ] Optimize hero image on Home + Detail pages
  - Use WebP/AVIF formats
  - Lazy load below-fold images
  - Preload LCP image: `<link rel="preload" as="image" href="hero.jpg">`
- [ ] Code-split routes (Vite default)
- [ ] Preload critical CSS
- [ ] Use CDN for static assets

**Measurement:**
```bash
lighthouse http://localhost:4173 --only-categories=performance --view
```

---

### First Input Delay (FID)
**Target:** ≤100ms  
**Max acceptable:** ≤300ms

**Optimization strategies:**
- [ ] Break up long JavaScript tasks (>50ms)
- [ ] Use `requestIdleCallback` for non-critical work
- [ ] Debounce search input (300ms)
- [ ] Avoid blocking main thread during filter operations

**Measurement:**
- Chrome DevTools Performance tab
- Real User Monitoring (RUM) in production

---

### Cumulative Layout Shift (CLS)
**Target:** ≤0.1  
**Max acceptable:** ≤0.25

**Optimization strategies:**
- [ ] Set explicit width/height on images:
  ```html
  <img src="hero.jpg" width="800" height="600" alt="...">
  ```
- [ ] Use CSS `aspect-ratio` for responsive images:
  ```css
  img { aspect-ratio: 4 / 3; width: 100%; height: auto; }
  ```
- [ ] Reserve space for dynamic content (skeleton loaders)
- [ ] Avoid inserting content above existing content
- [ ] Use `font-display: swap` with font loading API to minimize FOIT

**Measurement:**
- Lighthouse CLS score
- Chrome DevTools Layout Shift regions

---

## Bundle Size Budget

### JavaScript

| Route | Target | Max | Notes |
|-------|--------|-----|-------|
| **Initial Bundle** | ≤150 KB | ≤200 KB | Gzipped |
| Home (Visual) | ≤50 KB | ≤75 KB | Lazy loaded |
| Home (Search) | ≤50 KB | ≤75 KB | Lazy loaded |
| Restaurant Detail | ≤60 KB | ≤80 KB | Lazy loaded |
| Settings | ≤20 KB | ≤30 KB | Lazy loaded |
| **Total JS (all routes)** | ≤300 KB | ≤400 KB | Gzipped |

**Vite bundle analysis:**
```bash
npm run build
# Check dist/ folder sizes
# Use rollup-plugin-visualizer for bundle analysis
```

**Optimization strategies:**
- [ ] Code-split routes (automatic with Vite dynamic imports)
- [ ] Tree-shake unused code (automatic with ES modules)
- [ ] Avoid large dependencies (e.g., Moment.js → date-fns or native Intl)
- [ ] Use dynamic imports for heavy components:
  ```ts
  const Carousel = lazy(() => import('@components/Carousel'));
  ```

---

### CSS

| Target | Max | Notes |
|--------|-----|-------|
| **Critical CSS** | ≤15 KB | ≤20 KB | Inline in `<head>` |
| **Total CSS** | ≤40 KB | ≤60 KB | Gzipped |

**Optimization strategies:**
- [ ] CSS code-split per route (Vite default)
- [ ] Remove unused CSS with PurgeCSS (if using Tailwind)
- [ ] Use CSS custom properties (no runtime overhead)
- [ ] Avoid large icon fonts (use SVG sprites)

---

### Images

| Type | Target per image | Format | Notes |
|------|------------------|--------|-------|
| **Hero image** | ≤100 KB | WebP/AVIF | 1200px width |
| **Thumbnail** | ≤20 KB | WebP | 400px width |
| **Icon** | ≤2 KB | SVG | Inline or sprite |

**Optimization strategies:**
- [ ] Use responsive images with `srcset`:
  ```html
  <img src="hero-800.webp" 
       srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
       alt="...">
  ```
- [ ] Lazy load below-fold images:
  ```html
  <img src="..." loading="lazy" alt="...">
  ```
- [ ] Use image CDN with automatic optimization (e.g., Cloudinary, Imgix)
- [ ] Blur-up placeholder or skeleton loader

---

### Fonts

| Target | Max | Notes |
|--------|-----|-------|
| **Total fonts** | ≤50 KB | ≤80 KB | WOFF2 format |

**Optimization strategies:**
- [ ] Use system fonts (no download):
  ```css
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  ```
- [ ] If custom fonts needed:
  - [ ] Subset to Latin + Turkish characters
  - [ ] Use WOFF2 format
  - [ ] Preload critical fonts:
    ```html
    <link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin>
    ```
  - [ ] Use `font-display: swap`

---

## Network Budget

### HTTP Requests

| Target | Max | Notes |
|--------|-----|-------|
| **Initial page load** | ≤30 | ≤40 | Including CSS, JS, fonts, images |
| **Home page** | ≤50 | ≤70 | Including API calls + images |
| **Detail page** | ≤60 | ≤80 | Carousel images + API |

**Optimization strategies:**
- [ ] Combine CSS/JS bundles (Vite default)
- [ ] Use HTTP/2 or HTTP/3 (server config)
- [ ] Inline critical CSS
- [ ] Lazy load non-critical resources
- [ ] Use icon sprites (single SVG file)

---

### API Response Times

| Endpoint | Target | Max | Notes |
|----------|--------|-----|-------|
| **GET /restaurants** | ≤500ms | ≤1000ms | List results |
| **GET /restaurants/:id** | ≤300ms | ≤600ms | Single restaurant |
| **GET /search/suggestions** | ≤200ms | ≤400ms | Autocomplete |
| **GET /categories** | ≤100ms | ≤200ms | Cached |
| **GET /districts** | ≤100ms | ≤200ms | Cached |

**Optimization strategies:**
- [ ] Cache static data (categories, districts) in localStorage
- [ ] Use API response caching (ETag, max-age headers)
- [ ] Debounce search input (300ms)
- [ ] Prefetch likely next pages (e.g., hover on card → prefetch detail)
- [ ] Use CDN/edge caching for API responses

---

## Time to Interactive (TTI)

**Target:** ≤3.5s on mobile 3G  
**Max acceptable:** ≤5.0s

**Optimization strategies:**
- [ ] Server-side rendering (SSR) or static generation (optional phase 2)
- [ ] Preload critical resources
- [ ] Defer non-critical JavaScript
- [ ] Use web workers for heavy computations (if any)
- [ ] Minimize main thread work

**Measurement:**
```bash
lighthouse http://localhost:4173 --throttling-method=devtools --throttling.cpuSlowdownMultiplier=4 --view
```

---

## Lighthouse Testing Plan

### Local Development Testing

**Weekly during development:**
```bash
# Start preview server
npm run build
npm run preview

# Run Lighthouse (mobile)
npm run lighthouse:mobile

# Run Lighthouse (desktop)
npm run lighthouse

# Or use Chrome DevTools Lighthouse panel
```

**Check for:**
- [ ] Performance score ≥85
- [ ] Accessibility violations (0 critical)
- [ ] Console errors (0)
- [ ] Unused JavaScript/CSS
- [ ] Image optimization opportunities
- [ ] Render-blocking resources

---

### CI/CD Integration

**Pre-merge checks:**
```yaml
# Example GitHub Actions workflow
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run preview &
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:4173
            http://localhost:4173/restaurant/rest_123abc
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

**Lighthouse budget file** (`lighthouse-budget.json`):
```json
[
  {
    "path": "/*",
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 200
      },
      {
        "resourceType": "stylesheet",
        "budget": 60
      },
      {
        "resourceType": "image",
        "budget": 400
      },
      {
        "resourceType": "total",
        "budget": 800
      }
    ],
    "timings": [
      {
        "metric": "interactive",
        "budget": 3500
      },
      {
        "metric": "first-contentful-paint",
        "budget": 1500
      },
      {
        "metric": "largest-contentful-paint",
        "budget": 2500
      }
    ]
  }
]
```

---

### Production Monitoring

**Post-launch:**
- [ ] Set up Real User Monitoring (RUM)
  - Google Analytics 4 Web Vitals
  - Sentry Performance Monitoring
  - New Relic Browser
- [ ] Weekly Lighthouse audits on production URLs
- [ ] Track Core Web Vitals in Google Search Console

**Alerts:**
- Performance score drops below 85
- LCP > 2.5s for >25% of users
- CLS > 0.1 for >25% of users
- TTI > 5s for >25% of users

---

## PWA Optimization (Phase 2)

### Service Worker Strategy

**Cache-first for static assets:**
```js
// CSS, JS, fonts, icons
workbox.routing.registerRoute(
  /\.(?:css|js|woff2|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'static-assets',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);
```

**Network-first for API calls:**
```js
// API responses
workbox.routing.registerRoute(
  /\/api\/restaurants/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  })
);
```

**Stale-while-revalidate for images:**
```js
// Restaurant images
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|webp|avif)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);
```

### PWA Checklist

- [ ] manifest.json configured
  - [ ] App name, short_name
  - [ ] Icons (192x192, 512x512)
  - [ ] theme_color, background_color
  - [ ] display: standalone
  - [ ] start_url
- [ ] Service worker registered
- [ ] Offline fallback page
- [ ] Install prompt handled
- [ ] App shell cached
- [ ] HTTPS enabled
- [ ] Lighthouse PWA audit passes

---

## Performance Testing Matrix

### Test Conditions

| Device | Network | Target FCP | Target LCP | Target TTI |
|--------|---------|------------|------------|------------|
| **iPhone 12** | 4G | ≤1.2s | ≤2.0s | ≤3.0s |
| **iPhone 12** | 3G Fast | ≤1.8s | ≤2.5s | ≤3.5s |
| **Pixel 7** | 4G | ≤1.2s | ≤2.0s | ≤3.0s |
| **Pixel 7** | 3G Fast | ≤1.8s | ≤2.5s | ≤3.5s |
| **Desktop** | Broadband | ≤0.8s | ≤1.5s | ≤2.0s |

**Testing in Chrome DevTools:**
1. Open DevTools → Performance
2. Click gear icon → Network: "Fast 3G" or "Slow 3G"
3. CPU: "4x slowdown" (simulates mobile)
4. Record page load
5. Check FCP, LCP, TTI in timeline

---

## Optimization Workflow

### 1. Baseline Audit (Week 1)
- [ ] Run Lighthouse on all pages (mobile + desktop)
- [ ] Document current scores
- [ ] Identify top 5 issues

### 2. Critical Path Optimization (Week 2-3)
- [ ] Optimize LCP (images, fonts, render-blocking)
- [ ] Fix layout shifts (CLS)
- [ ] Reduce JavaScript bundle size

### 3. Accessibility Fixes (Week 3)
- [ ] Fix all P0 accessibility issues
- [ ] Achieve Lighthouse Accessibility ≥90

### 4. Best Practices & SEO (Week 4)
- [ ] Fix console errors
- [ ] Add meta tags
- [ ] Structured data (JSON-LD)

### 5. PWA Setup (Phase 2)
- [ ] Service worker
- [ ] Manifest
- [ ] Offline support

### 6. Continuous Monitoring (Post-launch)
- [ ] Weekly Lighthouse audits
- [ ] Monthly performance reviews
- [ ] Quarterly optimization sprints

---

## Tools & Resources

### Analysis Tools
- **Lighthouse:** Built into Chrome DevTools
- **WebPageTest:** https://www.webpagetest.org/
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Bundlephobia:** https://bundlephobia.com/ (check package sizes)
- **webpack-bundle-analyzer** or **rollup-plugin-visualizer**

### Image Optimization
- **Squoosh:** https://squoosh.app/
- **ImageOptim:** https://imageoptim.com/
- **Sharp (Node.js):** https://sharp.pixelplumbing.com/

### Font Optimization
- **Glyphhanger:** Subset fonts
- **Google Fonts:** Use `&display=swap`

### Monitoring (Production)
- **Google Analytics 4:** Web Vitals report
- **Sentry:** Performance monitoring
- **New Relic Browser**
- **Datadog RUM**

---

## Performance Checklist Sign-off

**Pre-launch:**
- [ ] All pages score ≥85 on Lighthouse Performance (mobile)
- [ ] LCP ≤2.5s on 4G mobile
- [ ] CLS ≤0.1 on all pages
- [ ] TTI ≤3.5s on 3G Fast
- [ ] JavaScript bundle ≤200 KB (gzipped)
- [ ] Images optimized (WebP/AVIF)
- [ ] Fonts preloaded (if custom)
- [ ] API responses cached appropriately
- [ ] Accessibility score ≥90
- [ ] No console errors or warnings

**Tested by:** ________________  
**Date:** ________________  
**Devices:** iPhone 12 (3G), Pixel 7 (4G), MacBook Pro (broadband)  
**Lighthouse scores:**
- Home (Visual): Performance ___ / Accessibility ___ / Best Practices ___ / SEO ___
- Home (Search): Performance ___ / Accessibility ___ / Best Practices ___ / SEO ___
- Detail: Performance ___ / Accessibility ___ / Best Practices ___ / SEO ___
