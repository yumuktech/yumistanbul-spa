# Accessibility Checklist

## WCAG AA Compliance Requirements

### Color & Contrast

- [ ] All text meets 4.5:1 contrast ratio (AA)
  - [ ] Primary text on white background: `#1A1A1A` (16.5:1) ✓
  - [ ] Secondary text on white background: `#666666` (5.7:1) ✓
  - [ ] Primary button text on primary color: Verify with checker
  - [ ] Link text: `var(--color-primary)` on white (verify ≥4.5:1)
  - [ ] Disabled states: Verify readability

- [ ] Large text (≥18px regular or ≥14px bold) meets 3:1 ratio
  - [ ] Headings
  - [ ] Button labels
  - [ ] Icon labels

- [ ] Interactive elements have 3:1 contrast against adjacent colors
  - [ ] Form input borders
  - [ ] Button borders
  - [ ] Focus indicators

- [ ] Color is not the only visual means of conveying information
  - [ ] Filter selected state: Color + icon/checkmark
  - [ ] Error messages: Color + icon + text
  - [ ] Success states: Color + icon + text

**Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Coverage > Show only colors
- axe DevTools browser extension

---

### Touch Targets & Pointer Gestures

- [ ] All interactive elements meet minimum touch target size
  - [ ] iOS: 44×44pt minimum (tested on iPhone)
  - [ ] Android: 48×48dp minimum (tested on Pixel)
  - [ ] Adequate spacing between targets (8px min)

- [ ] Touch targets by component:
  - [ ] Chip: 44px height ✓
  - [ ] IconButton (md): 44×44px ✓
  - [ ] IconButton (lg): 48×48px ✓
  - [ ] Card (entire card tappable): ✓
  - [ ] Search bar: 48px height
  - [ ] Slider handle: 28px visual + 48px hit area
  - [ ] Checkbox/switch: 24px visual + 44px hit area
  - [ ] Links in text: Min 44px height

- [ ] Complex gestures have simple alternatives
  - [ ] Swipe to close sheet: Also has close button
  - [ ] Pinch to zoom images: Also has zoom buttons
  - [ ] Carousel swipe: Also has arrow buttons & dot indicators

- [ ] No content lost on orientation change (portrait/landscape)

---

### Keyboard Navigation

- [ ] All interactive elements keyboard accessible
  - [ ] Tab order matches visual order
  - [ ] No keyboard traps
  - [ ] Skip link to main content (always present)

- [ ] Keyboard shortcuts:
  - [ ] Tab: Next element
  - [ ] Shift+Tab: Previous element
  - [ ] Enter: Activate button/link
  - [ ] Space: Activate button, toggle checkbox
  - [ ] Escape: Close modal/sheet
  - [ ] Arrow keys: Navigate within components (slider, carousel)

- [ ] Focus management:
  - [ ] Focus moved to modal when opened
  - [ ] Focus returned to trigger when modal closed
  - [ ] Focus trapped inside modal
  - [ ] Focus visible on all elements

---

### Focus Indicators

- [ ] Visible focus indicators on all interactive elements
  - [ ] Min 2px outline
  - [ ] Primary color (`var(--color-primary)`)
  - [ ] 2px offset from element
  - [ ] Not obscured by other elements

- [ ] Focus-visible (keyboard) vs focus (mouse)
  - [ ] `:focus-visible` shows outline
  - [ ] `:focus:not(:focus-visible)` hides outline (mouse/touch)

- [ ] Focus indicators tested with:
  - [ ] Keyboard navigation
  - [ ] Screen reader (VoiceOver/TalkBack)
  - [ ] High contrast mode

---

### Screen Reader Support

#### Semantic HTML

- [ ] Proper heading hierarchy (h1 → h2 → h3)
  - [ ] Single h1 per page (app title or page title)
  - [ ] No skipped levels
  - [ ] Logical structure

- [ ] Landmarks:
  - [ ] `<header>` or `role="banner"`
  - [ ] `<nav>` or `role="navigation"`
  - [ ] `<main>` or `role="main"`
  - [ ] `<footer>` or `role="contentinfo"`
  - [ ] `<aside>` or `role="complementary"` (filters)

- [ ] Lists for list content:
  - [ ] `<ul>` for restaurant cards
  - [ ] `<ul>` for filter chips
  - [ ] `<ol>` if order matters

- [ ] Buttons vs Links:
  - [ ] `<button>` for actions (toggle filter, open modal)
  - [ ] `<a>` for navigation (go to detail page)

#### ARIA Labels & Descriptions

- [ ] All icons have accessible names:
  - [ ] IconButton: `aria-label="Restoranı kaydet"`
  - [ ] Decorative icons: `aria-hidden="true"`
  - [ ] Emoji: Followed by `<span className="sr-only">Text</span>`

- [ ] Form inputs have labels:
  - [ ] `<label>` associated with `<input>` (for or wrapping)
  - [ ] Search: `aria-label="Restoran ara"`
  - [ ] Sliders: `aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`

- [ ] Dynamic content announced:
  - [ ] Loading: `aria-live="polite"` + "Yükleniyor..."
  - [ ] Search results count: `aria-live="polite"` + "15 restoran bulundu"
  - [ ] Error messages: `aria-live="assertive"` + error text
  - [ ] Filter applied: `aria-live="polite"` + "Kebab filtresi uygulandı"

- [ ] Toggle states:
  - [ ] Chip: `aria-pressed="true|false"`
  - [ ] Checkbox: `aria-checked="true|false|mixed"`
  - [ ] Expandable: `aria-expanded="true|false"`

- [ ] Modals:
  - [ ] `role="dialog"`
  - [ ] `aria-modal="true"`
  - [ ] `aria-labelledby` points to title
  - [ ] `aria-describedby` points to description (optional)

#### Screen Reader Testing

- [ ] Test with VoiceOver (iOS/macOS):
  - [ ] All text read correctly
  - [ ] Navigation landmarks work
  - [ ] Focus order logical
  - [ ] Filter states announced

- [ ] Test with TalkBack (Android):
  - [ ] Same as VoiceOver
  - [ ] Touch exploration works

- [ ] Test with NVDA/JAWS (Windows, if targeting desktop)

---

### Text & Content

- [ ] Text is resizable up to 200% without loss of content or functionality
  - [ ] Test with browser zoom
  - [ ] Test with system font size settings (iOS/Android)

- [ ] Line length not too long (max 80 characters)
  - [ ] Use `max-width` on text containers

- [ ] Sufficient line height (1.5 for body text)
  - [ ] `line-height: var(--line-height-normal)` ✓

- [ ] Language declared:
  - [ ] `<html lang="tr">` ✓
  - [ ] `lang="en"` on English sections if mixed content

- [ ] No text in images (use real text with CSS styling)

- [ ] Placeholder text not sole instruction
  - [ ] Search: Visible label or aria-label
  - [ ] Placeholder is hint, not label

---

### Forms & Inputs

- [ ] All inputs have labels (visible or aria-label)
- [ ] Required fields indicated:
  - [ ] Visual indicator (asterisk)
  - [ ] `aria-required="true"`
- [ ] Error messages:
  - [ ] Visible near field
  - [ ] Linked with `aria-describedby`
  - [ ] Icon + text (not color alone)
- [ ] Success feedback:
  - [ ] "Başarıyla kaydedildi" message
  - [ ] `aria-live="polite"`
- [ ] Autocomplete attributes where appropriate:
  - [ ] Search: `autocomplete="off"` or `"search"`
  - [ ] Email: `autocomplete="email"`
  - [ ] Phone: `autocomplete="tel"`

---

### Images & Media

- [ ] All images have alt text:
  - [ ] Restaurant images: "{name} restoranı" or descriptive
  - [ ] Decorative images: `alt=""` (empty)
  - [ ] Icons: `aria-label` on parent or `role="img"` + aria-label

- [ ] SVG icons:
  - [ ] `role="img"` + `aria-label` for meaningful
  - [ ] `aria-hidden="true"` for decorative

- [ ] Videos (if added):
  - [ ] Captions/subtitles
  - [ ] Audio descriptions if needed

---

### Navigation & Wayfinding

- [ ] Skip link to main content
  - [ ] Always present (screen reader + keyboard)
  - [ ] Visible on focus
  - [ ] `href="#main-content"`

- [ ] Breadcrumbs (if multi-level):
  - [ ] `<nav aria-label="Breadcrumb">`
  - [ ] Current page: `aria-current="page"`

- [ ] Current page/tab indicated:
  - [ ] Visual style
  - [ ] `aria-current="page"` or `aria-selected="true"`

- [ ] Link purpose clear from text or context:
  - [ ] Avoid "Click here" / "Read more"
  - [ ] Use descriptive text: "Kebabçı Ali detayları"

---

### Responsive & Mobile

- [ ] No horizontal scroll at any viewport width
- [ ] Content reflows without loss of information
- [ ] Pinch-to-zoom not disabled:
  - [ ] No `user-scalable=no` in viewport meta
  - [ ] No `maximum-scale=1.0`
- [ ] Safe areas respected (iOS notch):
  - [ ] `padding: env(safe-area-inset-*)`
- [ ] Orientation changes handled gracefully

---

### Error Handling & Feedback

- [ ] Error states:
  - [ ] Clear error message
  - [ ] Icon + text (not color alone)
  - [ ] Suggestions for resolution
  - [ ] `aria-live="assertive"` for critical errors

- [ ] Loading states:
  - [ ] Skeleton loaders with `aria-busy="true"`
  - [ ] "Yükleniyor..." text for screen readers
  - [ ] `aria-live="polite"`

- [ ] Empty states:
  - [ ] Helpful message: "Filtrelere uyan sonuç bulamadık."
  - [ ] Suggestions: "Bütçeyi genişletmeyi deneyin."
  - [ ] Action buttons: "Filtreleri temizle"

- [ ] Success states:
  - [ ] Confirmation message: "Restoran kaydedildi"
  - [ ] `aria-live="polite"`
  - [ ] Auto-dismiss or manual close

---

### Performance & Accessibility

- [ ] No flashing content (≥3 flashes per second)
  - [ ] Could trigger seizures
  - [ ] Use subtle animations

- [ ] Animations can be disabled:
  - [ ] Respect `prefers-reduced-motion` media query
  - [ ] Reduce/remove animations when set

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] No auto-playing videos/audio

- [ ] Timeout warnings:
  - [ ] If session timeout, warn before (e.g., 2 min notice)
  - [ ] Allow user to extend

---

### Testing Checklist per Screen

#### Onboarding

- [ ] Skip link works
- [ ] All buttons keyboard accessible
- [ ] Focus order logical
- [ ] Screen reader reads all content
- [ ] Color contrast passes
- [ ] Touch targets meet minimum

#### Home (Visual Filter)

- [ ] Skip link works
- [ ] Filter chips keyboard navigable
- [ ] Chip states announced (selected/unselected)
- [ ] Icon buttons have aria-labels
- [ ] Restaurant cards keyboard accessible
- [ ] Card content structured (heading, list)
- [ ] Empty state message visible
- [ ] Loading skeletons have aria-busy

#### Home (Search-First)

- [ ] Search input has label
- [ ] Search suggestions keyboard navigable
- [ ] Arrow keys navigate suggestions
- [ ] Enter selects suggestion
- [ ] Budget slider keyboard operable (arrow keys)
- [ ] Slider value announced
- [ ] Sort dropdown keyboard accessible

#### Restaurant Detail

- [ ] Back button keyboard accessible + aria-label
- [ ] Image carousel keyboard navigable (arrow keys)
- [ ] All sections have headings
- [ ] Contact info (phone, website) clickable
- [ ] Map link has descriptive text
- [ ] Reviews structured (list, rating, comment)
- [ ] Similar places section has heading

#### Settings

- [ ] All toggles keyboard accessible
- [ ] Toggle states announced
- [ ] Language selector keyboard accessible
- [ ] Focus order logical

#### Bottom Sheet (Filters)

- [ ] Focus trapped inside when open
- [ ] Escape key closes
- [ ] Focus returned to trigger on close
- [ ] All filters keyboard accessible
- [ ] Slider keyboard operable
- [ ] Apply/Clear buttons accessible

---

### Automated Testing Tools

**Required:**
- [ ] Lighthouse Accessibility audit (≥90 score)
- [ ] axe DevTools (0 violations)
- [ ] WAVE browser extension (0 errors)

**Manual Testing:**
- [ ] Keyboard-only navigation (unplug mouse)
- [ ] Screen reader (VoiceOver, TalkBack, NVDA)
- [ ] High contrast mode (Windows)
- [ ] Dark mode (if supported)
- [ ] Zoom to 200%
- [ ] Different viewport sizes

**Real Devices:**
- [ ] iPhone (VoiceOver)
- [ ] Android phone (TalkBack)
- [ ] Tablet
- [ ] Desktop (keyboard + screen reader)

---

## Priority Levels

### P0 (Must fix before launch)
- Color contrast violations
- Missing alt text on meaningful images
- Missing labels on form inputs
- Keyboard traps
- Missing focus indicators

### P1 (Fix within first sprint)
- Incomplete screen reader support
- Touch target size issues
- Improper heading hierarchy
- Missing ARIA labels on icon buttons

### P2 (Nice to have)
- Improved error messaging
- Better loading state announcements
- Enhanced keyboard shortcuts

---

## Sign-off Checklist

- [ ] All P0 issues resolved
- [ ] Lighthouse Accessibility score ≥90
- [ ] axe DevTools: 0 violations
- [ ] Manual keyboard testing passed
- [ ] Screen reader testing passed (iOS + Android)
- [ ] Touch target testing passed (real devices)
- [ ] Color contrast verified with tools
- [ ] Documentation updated with a11y notes

**Tested by:** ________________  
**Date:** ________________  
**Devices:** iPhone 14, Pixel 7, iPad Air, MacBook Pro  
**Screen readers:** VoiceOver 17.x, TalkBack 14.x  
