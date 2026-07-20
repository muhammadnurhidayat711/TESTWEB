# Website Redesign Spec: Modern, Minimalist, Elegant

## Concept

**Neo-Brutalist Modern** dengan sentuhan **Soft Organic** — memadukan bold typography, geometric shapes, dan stark contrasts dengan rounded corners, subtle gradients, dan warm tones untuk menciptakan pengalaman yang sophisticated namun approachable.

**Mood**: Bold, confident, architectural — tapi dengan sentuhan human warmth yang membuat interface terasa welcoming, bukan cold atau intimidating.

---

## Design Language

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#0037bd` | Aksen utama, buttons, highlights |
| Primary Dark | `#001f5c` | Text aksent, hover states |
| Primary Light | `#4a7be8` | Gradients, secondary accents |
| Background | `#fafafa` | Page background (warm white) |
| Surface | `#ffffff` | Cards, elevated elements |
| Surface Alt | `#f5f5f5` | Alternate sections |
| Text Primary | `#1a1a2e` | Headings, body text |
| Text Secondary | `#64748b` | Supporting text, captions |
| Text Muted | `#94a3b8` | Placeholders, disabled |
| Accent Gold | `#d4af37` | Premium touches, special elements |
| Border | `#e5e5e5` | Subtle borders, dividers |

### Typography Stack

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display/Headings | Playfair Display | 700, 600 | H1-H3, hero text, section titles |
| Body/UI | Plus Jakarta Sans | 400, 500, 600, 700 | Body text, buttons, navigation |
| Accent | Fraunces | 400, 500 | Pull quotes, special callouts |

### Typography Scale

```
Display: 72px / 1.1 line-height / -0.02em tracking (Playfair)
H1: 56px / 1.15 / -0.01em
H2: 40px / 1.2 / -0.01em
H3: 32px / 1.25
H4: 24px / 1.35
Body Large: 20px / 1.6 (leading-relaxed)
Body: 16px / 1.6
Small: 14px / 1.5
Caption: 12px / 1.4
```

### Spacing System

```
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
--space-4xl: 96px
--space-5xl: 128px
```

### Layout Density

**Mixed Intensity Approach:**
- **Hero sections**: Extra airy (padding 128px+), dramatic whitespace
- **Content sections**: Balanced (padding 64-96px), comfortable reading
- **Feature cards**: Compact but breathable (gap 24-32px)
- **CTAs & Transitions**: Dramatic (large padding, bold elements)

### Border Radius

```
--radius-sm: 8px    (buttons, small elements)
--radius-md: 16px   (cards, inputs)
--radius-lg: 24px   (large cards, panels)
--radius-xl: 32px   (hero elements)
--radius-2xl: 48px  (special sections)
```

### Shadows

```
--shadow-sm: 0 1px 2px rgba(0,0,0,0.04)
--shadow-md: 0 4px 12px rgba(0,0,0,0.06)
--shadow-lg: 0 12px 32px rgba(0,0,0,0.08)
--shadow-xl: 0 24px 48px rgba(0,0,0,0.12)
--shadow-glow: 0 0 40px rgba(0,55,189,0.15)
```

### Motion Philosophy

**Purposeful, not decorative** — motion guides attention and communicates hierarchy.

- Entrance: Fade + slight translate (opacity 0→1, y: 20→0), 500ms ease-out
- Stagger: 100ms between elements
- Hover: Scale 1.02, shadow lift, 300ms ease
- Page transitions: Crossfade 400ms

---

## Component Patterns

### Buttons

**Primary**: Solid fill, primary color, rounded-full (pill shape), bold text
```
bg-primary, text-white, rounded-full, px-6 py-3, font-semibold
Hover: bg-primary-dark, scale-105, shadow-glow
```

**Secondary**: Outline style, primary border, transparent fill
```
border-2 border-primary, text-primary, rounded-full
Hover: bg-primary, text-white
```

**Ghost**: Text only, no border, underline on hover
```
text-primary, no bg, no border
Hover: underline
```

### Cards

**Standard Card**:
- bg-white, rounded-2xl (24px), shadow-md
- Padding: 24-32px
- Hover: shadow-lg, translateY(-4px), 300ms

**Feature Card**:
- Same base + icon container (bg-primary/10, rounded-xl)
- Title + description stack

### Navigation

**Desktop**:
- Horizontal pill nav, bg-white/10 backdrop-blur
- Items: px-4 py-2, rounded-full
- Active: bg-primary, text-white

**Mobile**:
- Full-screen overlay, slide from right
- Large touch targets (min 48px)
- Staggered animation on open

### Section Patterns

**Hero Section**:
- Full viewport height (min 700px)
- Large display typography (48-72px)
- Generous padding (128px vertical)
- Optional: subtle gradient overlay on images

**Content Section**:
- Standard padding (96px vertical)
- Section eyebrow (uppercase, tracking-wide, gold accent)
- H2 title (Playfair, 40-48px)
- Subtitle (gray-500, max-w-2xl)
- 2-4 column grid for cards

**Testimonial Section**:
- Dark bg variant (#0a2540)
- Large quote marks as decorative
- Profile photo with subtle ring

**CTA Section**:
- Dramatic padding (128px)
- Centered text, large headline
- Single prominent button

---

## Pages Inventory

### 1. Homepage (/)
**Density**: Mixed (Airy hero → Balanced content → Dramatic CTA)
- Hero: Full viewport, centered text, gradient overlay on image
- Core Values: Dark section, grid of 9 IMPACTFUL cards
- Curriculum: Light section, 2-column with image
- Testimonials: Dark section, slider layout
- Alumni: Light section, marquee scroll
- CTA: White section, centered

### 2. Academic (/academic)
- Page header: Centered title + subtitle
- Level selector: Tab interface (sidebar on desktop)
- Features: Bento grid (4 columns)
- Programs: 3-column cards
- CTA: Dark card with gradient

### 3. Facilities (/facilities)
- Grid layout for facility categories
- Large image cards with hover reveal
- Statistics/quick facts section

### 4. Extracurricular (/extracurricular)
- Category cards with icon
- Activity listing with images
- Schedule/calendar visual

### 5. Achievements (/achievements)
- Timeline or masonry grid
- Achievement cards with medal/badge visual
- Statistics highlight section

### 6. Gallery (/gallery)
- Masonry or uniform grid
- Lightbox on click
- Category filter tabs

### 7. News (/news)
- Card grid for articles
- Featured article hero
- Category tags

### 8. Contact (/contact)
- Contact form (clean, minimal fields)
- Map/location info
- Direct contact details

---

## Implementation Order

1. **Phase 1: Global Styles** (`src/styles/globals.css`)
   - Update color tokens
   - Update typography scale
   - Update component classes
   - Add new utilities

2. **Phase 2: Shared Components**
   - Header (update to match new style)
   - Footer (update styling)
   - Shared section patterns

3. **Phase 3: Pages**
   - Homepage (/)
   - Academic (/academic)
   - Facilities (/facilities)
   - Extracurricular (/extracurricular)
   - Achievements (/achievements)
   - Gallery (/gallery)
   - News (/news)
   - Contact (/contact)

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