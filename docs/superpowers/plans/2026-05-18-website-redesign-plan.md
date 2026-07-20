# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform all 7 pages + shared components (Header, Footer, globals.css) to Neo-Brutalist Modern + Soft Organic design language

**Architecture:** Incremental approach — update globals.css first, then shared components, then each page independently. Each page can be reviewed before moving to next.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, Lucide React, Google Fonts (Playfair Display, Plus Jakarta Sans, Fraunces)

---

## File Structure Overview

```
src/
├── styles/globals.css          # Global styles, tokens, component classes
├── components/
│   ├── Header.tsx              # Navigation with neo-brutalist pill style
│   └── Footer.tsx              # Footer with updated styling
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Homepage
│   ├── academic/page.tsx       # Academic page
│   ├── facilities/page.tsx    # Facilities page
│   ├── extracurricular/page.tsx # Extracurricular page
│   ├── achievements/page.tsx   # Achievements page
│   ├── gallery/page.tsx        # Gallery page
│   ├── news/page.tsx           # News page
│   └── contact/page.tsx        # Contact page
```

---

## Task 1: Global Styles Update

**Modify:** `src/styles/globals.css`

- [ ] **Step 1: Update color tokens**

Replace existing color palette with new design tokens:

```css
:root {
  /* Primary Colors */
  --primary: #0037bd;
  --primary-light: #4a7be8;
  --primary-dark: #001f5c;

  /* Background Colors */
  --bg-primary: #fafafa;
  --bg-surface: #ffffff;
  --bg-alt: #f5f5f5;
  --bg-dark: #1a1a2e;

  /* Text Colors */
  --text-primary: #1a1a2e;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --text-inverse: #ffffff;

  /* Accent */
  --gold: #d4af37;
  --gold-light: #e5c76b;

  /* Borders & Shadows */
  --border: #e5e5e5;
  --border-dark: #d4d4d4;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.08);
  --shadow-xl: 0 24px 48px rgba(0,0,0,0.12);
  --shadow-glow: 0 0 40px rgba(0,55,189,0.15);

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-2xl: 48px;
}
```

- [ ] **Step 2: Update body base styles**

```css
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-jakarta text-text-primary antialiased;
    background: var(--bg-primary);
    min-height: 100vh;
  }

  ::selection {
    @apply bg-primary/20 text-primary-dark;
  }
}
```

- [ ] **Step 3: Update component classes**

Replace/update these class definitions in globals.css:

```css
@layer components {
  /* Section Patterns - Mixed Intensity */
  .section {
    @apply py-16 md:py-24 lg:py-32;
  }

  .section-alt {
    @apply bg-[var(--bg-alt)];
  }

  .section-dark {
    @apply bg-[var(--bg-dark)] text-white;
  }

  /* Typography */
  .section-eyebrow {
    @apply inline-block text-[var(--gold)] font-semibold text-xs tracking-[0.2em] uppercase mb-4;
  }

  .section-title {
    @apply font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6;
  }

  .section-subtitle {
    @apply text-[var(--text-secondary)] text-lg max-w-3xl mx-auto leading-relaxed;
  }

  /* Buttons - Neo-Brutalist style with soft organic touches */
  .btn {
    @apply inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300;
  }

  .btn-primary {
    @apply bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98];
  }

  .btn-secondary {
    @apply bg-[var(--gold)] text-white hover:bg-[var(--gold-light)] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98];
  }

  .btn-outline {
    @apply border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full;
  }

  .btn-outline-light {
    @apply border-2 border-white/30 text-white hover:bg-white hover:text-[var(--primary)] rounded-full backdrop-blur-sm;
  }

  /* Cards - Soft organic with geometric touches */
  .card {
    @apply bg-[var(--bg-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1;
  }

  .card-brutalist {
    @apply bg-[var(--bg-surface)] rounded-[var(--radius-md)] border border-[var(--border)] hover:shadow-[var(--shadow-lg)] transition-all duration-300;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)];
  }

  /* Geometric pattern backgrounds */
  .bg-geometric {
    background-image:
      linear-gradient(135deg, var(--primary) 1px, transparent 1px),
      linear-gradient(225deg, var(--primary) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: 10px 0;
  }

  .bg-dots {
    background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
    background-size: 20px 20px;
  }
}
```

- [ ] **Step 4: Verify globals.css syntax**
Run: `npx tailwindcss --help` (verify Tailwind is working)

---

## Task 2: Header Component Update

**Modify:** `src/components/Header.tsx`

- [ ] **Step 1: Update Header with Neo-Brutalist style**

Replace existing Header with new design featuring:
- Pill-shaped navigation with backdrop blur
- Bold typography
- Geometric logo container
- Strong hover states with color transitions

Key changes:
- Nav items: rounded-full, bold text, strong hover with bg color
- Language toggle: minimal, text-based
- Mobile menu: full-screen overlay with large touch targets
- Scroll behavior: solid bg on scroll

```tsx
// Key sections to update:
// 1. Header wrapper - solid bg on scroll
// 2. Nav pills - bold, geometric feel
// 3. Mobile menu - full-screen, staggered animation
```

---

## Task 3: Footer Component Update

**Modify:** `src/components/Footer.tsx`

- [ ] **Step 1: Update Footer with current design language**

- Update gradient orbs to match new color palette
- Keep existing structure but enhance styling
- Update social icons with new hover effects
- Refine newsletter input styling

---

## Task 4: Homepage Redesign

**Modify:** `src/app/page.tsx`

- [ ] **Step 1: Update hero section with airy layout**

```tsx
// Hero updates:
- Keep full viewport height
- Update typography: Playfair Display for headings
- Simplify color overlay (less dramatic)
- Use geometric decorative elements
- Add subtle gradient accents
```

- [ ] **Step 2: Update Core Values section**

```tsx
// Neo-brutalist cards:
- Bold letter display (large, geometric)
- Strong borders
- Geometric corner decorations
- High contrast on hover
```

- [ ] **Step 3: Update Curriculum section**

```tsx
// Balanced content:
- 2-column layout
- Clean typography
- Subtle gradient accents
- Modern card styling
```

- [ ] **Step 4: Update Testimonials section**

```tsx
// Dark section with soft organic touches:
- Glowing orbs (subtle)
- Large quote marks
- Clean profile display
- Smooth transitions
```

- [ ] **Step 5: Update Alumni marquee**

```tsx
// Subtle, elegant scroll:
- Clean card design
- Grayscale to color on hover
- Smooth infinite scroll
```

- [ ] **Step 6: Update CTA section**

```tsx
// Dramatic, centered:
- Large padding
- Bold headline
- Single prominent button
- Subtle glow effect
```

---

## Task 5: Academic Page Redesign

**Modify:** `src/app/academic/page.tsx`

- [ ] **Step 1: Update page header**

```tsx
// Clean, centered:
- Playfair Display title
- Large gradient text accent
- Minimal subtitle
```

- [ ] **Step 2: Update level selector**

```tsx
// Neo-brutalist tabs:
- Bold active state
- Strong borders
- Clean icon styling
```

- [ ] **Step 3: Update bento grid features**

```tsx
// 4-column grid:
- Geometric card shapes
- Bold icon containers
- Strong hover effects
```

- [ ] **Step 4: Update program cards**

```tsx
// 3-column pillars:
- Clean cards
- Accent decorations
- Modern list styling
```

---

## Task 6: Facilities Page Redesign

**Modify:** `src/app/facilities/page.tsx`

- [ ] **Step 1: Update intro section**

```tsx
// Dramatic hero:
- Large Playfair typography
- Gradient accent
- Minimal description
```

- [ ] **Step 2: Update scroll sections**

```tsx
// Alternating layout:
- Geometric image containers
- Bold titles
- Clean descriptions
- Subtle parallax
```

---

## Task 7: Extracurricular Page Redesign

**Modify:** `src/app/extracurricular/page.tsx`

- [ ] **Step 1: Update header**

```tsx
// Split layout:
- Large title left
- Category pills right
- Clean typography
```

- [ ] **Step 2: Update featured banner**

```tsx
// Bento card:
- Dark background
- Gradient accents
- Large image
- Clean text layout
```

- [ ] **Step 3: Update activity grid**

```tsx
// 4-column grid:
- Bold cards
- Strong category badges
- Clean schedule info
- Hover effects
```

---

## Task 8: Achievements Page Redesign

**Modify:** `src/app/achievements/page.tsx`

- [ ] **Step 1: Update header**

```tsx
// Centered, clean:
- Playfair title
- Minimal subtitle
- Subtle gradient
```

- [ ] **Step 2: Update featured achievement**

```tsx
// Large card:
- 50/50 image-text split
- Bold trophy icon
- Clean typography
- Gold accents
```

- [ ] **Step 3: Update filters**

```tsx
// Modern filter bar:
- Clean pills
- Dark active state
- Subtle shadows
```

- [ ] **Step 4: Update achievement grid**

```tsx
// 3-column cards:
- Bold medals
- Clean typography
- Category badges
- Hover effects
```

---

## Task 9: Gallery Page Redesign

**Modify:** `src/app/gallery/page.tsx`

- [ ] **Step 1: Update header**

```tsx
// Centered, clean:
- Large title
- Category pills below
```

- [ ] **Step 2: Update masonry grid**

```tsx
// Clean masonry:
- Rounded corners
- Subtle hover overlay
- Category labels
- Smooth lightbox
```

---

## Task 10: News Page Redesign

**Modify:** `src/app/news/page.tsx`

- [ ] **Step 1: Update header**

```tsx
// Split layout:
- Title left
- Category pills right
```

- [ ] **Step 2: Update featured article**

```tsx
// Large hero card:
- Image left, text right
- Bold title
- Clean metadata
- Arrow CTA
```

- [ ] **Step 3: Update article grid**

```tsx
// 3-column grid:
- Clean cards
- Category badges
- Hover effects
- Arrow CTAs
```

---

## Task 11: Contact Page Redesign

**Modify:** `src/app/contact/page.tsx`

- [ ] **Step 1: Update header**

```tsx
// Centered:
- Clean gradient title
- Minimal subtitle
```

- [ ] **Step 2: Update contact info cards**

```tsx
// Bento grid:
- 2x2 layout
- Bold icons
- Clean text
```

- [ ] **Step 3: Update form**

```tsx
// Modern form:
- Clean labels
- Large inputs
- Rounded fields
- Strong submit button
```

---

## Implementation Order

```
Phase 1: Foundation
  Task 1: Global Styles Update

Phase 2: Shared Components
  Task 2: Header Component Update
  Task 3: Footer Component Update

Phase 3: Pages (incremental review after each)
  Task 4: Homepage
  Task 5: Academic Page
  Task 6: Facilities Page
  Task 7: Extracurricular Page
  Task 8: Achievements Page
  Task 9: Gallery Page
  Task 10: News Page
  Task 11: Contact Page
```

---

## Testing Checklist

After each page update:
- [ ] Responsive on mobile (375px+)
- [ ] Responsive on tablet (768px+)
- [ ] Responsive on desktop (1280px+)
- [ ] Animations smooth (no janky transitions)
- [ ] No console errors
- [ ] All links functional
- [ ] Fonts loading correctly
- [ ] Color contrast accessible

---

## Success Criteria

1. Consistent visual language across all pages
2. Bold typography hierarchy (Playfair headings → Plus Jakarta body)
3. Neo-brutalist elements: geometric shapes, bold contrasts
4. Soft organic touches: rounded corners, subtle gradients, warm spacing
5. Primary blue (#0037bd) as dominant accent
6. Mixed intensity layout (airy hero → balanced content → dramatic CTA)
7. Smooth, purposeful animations
8. Mobile-responsive across all breakpoints