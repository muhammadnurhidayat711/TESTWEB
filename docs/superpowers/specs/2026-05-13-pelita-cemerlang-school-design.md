# Website Profile Sekolah - Pelita Cemerlang School

## Design Specification

**Date:** 2026-05-13
**Project:** Premium School Profile Website
**Client:** Pelita Cemerlang School

---

## 1. Project Overview

Website profile profesional untuk **Pelita Cemerlang School** — sekolah swasta premium dengan jenjang lengkap Playgroup hingga SMA, kurikulum bilingual Indonesia-English, fokus pada prestasi akademik, fasilitas modern, dan ekstrakurikuler beragam.

**Goals:**
- Showcase kualitas pendidikan premium
- Menarik prospective students & parents
- Membangun credibility dan brand image
- Mudah di-update kontennya oleh admin non-technical

---

## 2. Pages Structure

### 2.1 Page List

| # | Page | Route | Description |
|---|------|-------|-------------|
| 1 | Home | `/` | Hero + overview + stats |
| 2 | About Us | `/about` | Sejarah, visi misi, nilai |
| 3 | Academic | `/academic` | Kurikulum & program |
| 4 | Facilities | `/facilities` | Galeri parallax interaktif |
| 5 | Extracurricular | `/extracurricular` | Kegiatan ES & filter |
| 6 | Achievements | `/achievements` | Wall of fame & testimonial |
| 7 | Admission | `/admission` | Form pendaftaran |
| 8 | Contact | `/contact` | Peta & inquiry form |

### 2.2 Navigation Structure

- **Fixed Header** dengan logo + nav links + language toggle
- **Mobile Hamburger Menu** dengan slide-in drawer
- **Smooth Scroll** untuk internal anchor links
- **Active State Indicator** untuk current page

---

## 3. Visual Design

### 3.1 Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Royal Blue | `#0037bd` |
| Primary Light | Sky Blue | `#4a7be8` |
| Primary Dark | Deep Navy | `#001f5c` |
| Secondary/Gold | Premium Gold | `#d4af37` |
| Background | Pure White | `#ffffff` |
| Background Alt | Soft Gray | `#f8fafc` |
| Text Primary | Charcoal | `#1a1a2e` |
| Text Secondary | Muted Gray | `#64748b` |
| Success | Emerald | `#10b981` |
| Border | Light Gray | `#e2e8f0` |

### 3.2 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Poppins | 700 | 48-64px |
| H2 | Poppins | 700 | 36-48px |
| H3 | Poppins | 600 | 24-30px |
| H4 | Poppins | 600 | 20px |
| Body | Inter | 400 | 16px |
| Body Bold | Inter | 500 | 16px |
| Caption | Inter | 400 | 14px |
| Quote | Playfair Display | 400i | 20px |

### 3.3 Spacing System

- Base unit: 4px
- Section padding: py-20 (80px) hingga py-32 (128px)
- Card padding: p-6 (24px)
- Component gap: gap-8 (32px)
- Container max-width: 1280px

### 3.4 Border & Shadow

- Card border-radius: 16px
- Button border-radius: 8px
- Image border-radius: 12px
- Shadow (cards): `0 4px 20px rgba(0, 55, 189, 0.08)`
- Shadow (hover): `0 12px 40px rgba(0, 55, 189, 0.15)`
- Shadow (floating): `0 25px 50px rgba(0, 55, 189, 0.2)`

---

## 4. Animation & Transitions

### 4.1 Page Load Animation

```
Elements: staggered fade-up
Duration: 400ms per element
Delay: 100ms incremental
Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### 4.2 Scroll Reveal

```
Trigger: Intersection Observer at 20% visibility
Animation: opacity 0→1, translateY 30px→0
Duration: 600ms
Easing: ease-out
```

### 4.3 Card Hover Effects

```
Transform: scale(1.02)
Shadow: elevation increase
Duration: 300ms
Easing: ease-out
```

### 4.4 Navigation Transitions

```
Hover underline: slide from left, 200ms
Active state: fade-in
Mobile menu: slide-in from right, 300ms
```

### 4.5 Parallax Effect (Facilities Page)

```
Background: translateY dengan scroll position × 0.5
Foreground content: normal scroll
Layers: 3 parallax layers dengan speed berbeda
```

### 4.6 Image Lazy Loading

```
Placeholder: blur-up effect (scale 1.1 → 1)
Duration: 400ms
```

### 4.7 Button Interactions

```
Hover: gradient shift, scale(1.02), 200ms
Active: scale(0.98), 100ms
```

---

## 5. Components

### 5.1 Header

- Logo (left)
- Navigation links (center)
- Language toggle ID/EN (right)
- CTA Button "Pendaftaran"
- **Sticky on scroll** dengan backdrop blur
- **Mobile:** Hamburger icon → slide drawer

### 5.2 Hero Section

- Full viewport height (100vh)
- Background: high-quality school image/video dengan overlay gradient
- Floating decorative elements (shapes/lines)
- Main headline dengan staggered animation
- Subheadline
- Dual CTA buttons
- Scroll indicator (animated chevron)

### 5.3 Stats Counter

- 4 key metrics (siswa, guru, ekstrakurikuler, juara)
- Counter animation dari 0 ke target
- Icon + number + label
- Background: soft gradient
- Hover: subtle lift

### 5.4 Section Title

- Eyebrow text (small caps, gold)
- Main title (H2)
- Subtitle/description
- Decorative line accent
- Centered alignment

### 5.5 Content Cards

| Type | Description |
|------|-------------|
| Program Card | Icon, title, description, hover effect |
| Facility Card | Image, overlay text, zoom-on-hover |
| Activity Card | Image, category badge, title, icon grid |
| Achievement Card | Medal icon, title, date, description |
| Testimonial Card | Quote, avatar, name, role |
| Staff Card | Photo, name, position, social links |

### 5.6 Gallery Component

- Masonry / grid layout
- Lightbox on click
- Lazy loading
- Caption overlay on hover

### 5.7 Counter/Odometer

- Animated number counting
- Duration: 2s
- Easing: ease-out
- Suffix support (e.g., "+")

### 5.8 Language Toggle

- Toggle button ID/EN
- Saves preference to localStorage
- Updates content dynamically

### 5.9 Form Components

- Input fields dengan floating labels
- Validation states (error, success)
- Submit button dengan loading state
- Success message modal

### 5.10 Footer

- 4-column layout
- Logo + tagline
- Quick links
- Contact info
- Social media icons
- Newsletter signup
- Copyright
- Back-to-top button

---

## 6. Page Specifications

### 6.1 Home Page

**Sections:**
1. Hero (full viewport)
2. Stats Counter
3. About Preview (visi misi singkat)
4. Academic Highlights
5. Facilities Showcase (preview carousel)
6. Extracurricular Grid
7. Achievements Highlight
8. CTA Banner (pendaftaran)
9. Testimonials Carousel
10. Contact Preview

### 6.2 About Us Page

**Sections:**
1. Hero (half-height)
2. Sejarah & Cerita Sekolah
3. Visi & Misi (visual cards)
4. Nilai-Nilai Inti (icon grid)
5. Filosofi Pendidikan
6. Tim leadership (staff cards)
7. Partner & Akreditasi

### 6.3 Academic Page

**Sections:**
1. Hero
2. Jenjang Pendidikan (tabs/accordion)
3. Kurikulum Overview
4. Metode Pembelajaran (icons + descriptions)
5. Program Khusus (akselerasi, dll)
6. Bilingual System Explanation

### 6.4 Facilities Page (PARALLAX)

**Sections:**
1. Hero dengan parallax background
2. Lab & Ruang Kelas (parallax scroll zones)
3. Fasilitas Olahraga (parallax zones)
4. Seni & Kreativitas
5. Perpustakaan & Resource Center
6. Kantin & Area Student's
7. Galeri Interactive (lightbox)
8. Virtual Tour CTA

**Parallax Implementation:**
- 3 scroll zones berbeda dengan kecepatan parallax berbeda
- Background layer: translateY(scroll × 0.5)
- Middle layer: translateY(scroll × 0.3)
- Foreground: normal scroll
- Smooth interpolation dengan requestAnimationFrame

### 6.5 Extracurricular Page

**Sections:**
1. Hero
2. Kategori Filter (Olahraga, Seni, Sains, Sosial)
3. Activity Cards Grid (filterable)
4. Jadwal Kegiatan
5. Pendaftaran ES
6. Photo Gallery

### 6.6 Achievements Page

**Sections:**
1. Hero
2. Wall of Fame ( tahun prestasi)
3. Recent Winners (card grid)
4. Competition Calendar
5. Alumni Success Stories
6. Testimonials

### 6.7 Admission Page

**Sections:**
1. Hero
2. Persyaratan
3. Biaya & Paket (cards)
4. Timeline Intake
5. Form Pendaftaran
6. FAQ Accordion
7. Contact for Inquiry

### 6.8 Contact Page

**Sections:**
1. Hero
2. Informasi Kontak
3. Peta Lokasi (embedded Google Maps)
4. Form Inquiry
5. Jam Operasional
6. Social Media Links

---

## 7. Content Update System

### 7.1 Data Structure

Semua konten disimpan dalam file JavaScript sebagai objek:

```javascript
const schoolData = {
  meta: { name, description, logo },
  hero: { title, subtitle, cta },
  stats: [{ value, label, icon }],
  about: { vision, mission, values },
  academics: [{ level, curriculum, programs }],
  facilities: [{ name, description, images, category }],
  extracurriculars: [{ name, category, description, schedule }],
  achievements: [{ title, year, category, description }],
  testimonials: [{ quote, name, role, avatar }],
  contact: { address, phone, email, maps },
  admissions: [{ program, requirements, fees }]
}
```

### 7.2 Language Support

```javascript
const translations = {
  id: { /* Indonesian content */ },
  en: { /* English content */ }
}
```

### 7.3 Update Workflow

1. Edit file `data/content.js`
2. Update array/object yang relevan
3. Website secara otomatis refresh konten
4. Tidak perlu edit HTML/CSS

---

## 8. Technical Architecture

### 8.1 File Structure

```
/
├── index.html              # Main entry
├── css/
│   ├── main.css           # Core styles
│   ├── components.css     # Component styles
│   ├── animations.css    # Animation keyframes
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js            # Core functionality
│   ├── data.js            # Content data
│   ├── translations.js    # Language strings
│   ├── components.js      # Reusable components
│   └── animations.js      # Scroll animations
├── assets/
│   ├── images/
│   └── icons/
└── pages/
    ├── about.html
    ├── academic.html
    ├── facilities.html
    ├── extracurricular.html
    ├── achievements.html
    ├── admission.html
    └── contact.html
```

### 8.2 Dependencies

- **Google Fonts:** Poppins, Inter, Playfair Display
- **Icons:** Lucide Icons (SVG inline)
- **No external JS libraries** — vanilla implementation
- **CSS Custom Properties** untuk theming

### 8.3 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 8.4 Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total page weight: < 500KB (excluding images)

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Devices |
|------------|-------|---------|
| Mobile | < 640px | Smartphones |
| Tablet | 640px - 1024px | Tablets, small laptops |
| Desktop | 1024px - 1280px | Standard laptops |
| Large | > 1280px | Desktop monitors |

### 9.1 Mobile Adaptations

- Single column layouts
- Hamburger navigation
- Swipeable carousels
- Stacked cards
- Reduced spacing
- Touch-optimized buttons (min 44px)

---

## 10. Accessibility

- Semantic HTML5 elements
- ARIA labels untuk interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text untuk semua images
- Color contrast ratio min 4.5:1
- Skip to content link

---

## 11. Placeholder Images

Untuk development, gunakan placeholder services:
- `https://picsum.photos/1920/1080` — Hero images
- `https://picsum.photos/800/600` — Card images
- `https://picsum.photos/400/400` — Avatar images

Untuk production, ganti dengan actual school photos.

---

## 12. Implementation Phases

### Phase 1: Foundation
- HTML structure all pages
- CSS variables & base styles
- Typography & color system

### Phase 2: Components
- Header & navigation
- Hero section
- Content cards
- Footer
- Forms

### Phase 3: Animations
- Scroll reveal
- Parallax (facilities)
- Hover effects
- Loading animations

### Phase 4: Functionality
- Language toggle
- Mobile menu
- Lightbox gallery
- Form handling
- Smooth scroll

### Phase 5: Content & Polish
- Populate with sample content
- Responsive testing
- Performance optimization
- Cross-browser testing

---

**End of Specification**