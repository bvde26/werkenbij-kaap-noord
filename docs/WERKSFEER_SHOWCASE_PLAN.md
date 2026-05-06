# Werksfeer Showcase Website — Final Plan

**Project:** werkenbij.21knots.nl (temp → eventually werkenbijkaapnoord.nl)  
**Goal:** Low-friction recruitment via WhatsApp + real benefits showcase  
**Target:** 15-35, mobile-first, hospitality sector

---

## 📋 Content Structure (Mobile-First)

```
1. HERO SECTION (Sticky WhatsApp)
   ┌─────────────────────────────────┐
   │ "Wil je een dagje meelopen?"    │
   │ [WhatsApp Button - FIXED]        │
   └─────────────────────────────────┘

2. QUICK FACTS (Concrete Benefits)
   ┌─────────────────────────────────┐
   │ 💰 Salaris: €[X] - €[X]/uur    │
   │ 📅 Flexibel rooster             │
   │ 🏝️  Texel + goeie sfeer          │
   │ 👥 Klein, hecht team             │
   └─────────────────────────────────┘

3. TEAM TESTIMONIALS (Tekst + Foto)
   ┌─────────────────────────────────┐
   │ [Foto] Marco                     │
   │ "Ik werk hier omdat de sfeer..." │
   │ 3 jaar bediening                 │
   └─────────────────────────────────┘
   
   ┌─────────────────────────────────┐
   │ [Foto] Lisa                      │
   │ "Het fijne aan Kaap Noord..."    │
   │ 1 jaar keuken                    │
   └─────────────────────────────────┘

4. DETAILS (Wat je nog wil weten)
   ┌─────────────────────────────────┐
   │ • Seizoen: Mei-Oktober + jaar    │
   │ • Training: 2 weken              │
   │ • Woonruimte: Ja, €[X]/maand    │
   │ • Wat we zoeken: Betrouwbaar +   │
   │   energiek, geen ervaring nodig  │
   └─────────────────────────────────┘

5. CONTACT OPTIONS
   ┌─────────────────────────────────┐
   │ 1️⃣ WhatsApp → [Button]          │
   │ 2️⃣ Bel Marije → 06-23823324    │
   │ 3️⃣ Email → vacatures@...        │
   └─────────────────────────────────┘

6. MAP + FOOTER
```

---

## 🗄️ Database Schema (Testimonials)

```sql
-- Testimonials/Team Members
CREATE TABLE testimonials (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  years_worked INT,
  quote TEXT NOT NULL,
  image_url TEXT,
  order INT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Quick Facts (Editable)
CREATE TABLE quick_facts (
  id UUID PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  order INT,
  created_at TIMESTAMP
);
```

---

## 🎯 Admin Panel Features

```
/admin/dashboard
├── Testimonials
│   ├── List all
│   ├── Add new (name, role, quote, photo upload)
│   ├── Edit
│   ├── Delete
│   └── Reorder (drag-drop)
├── Quick Facts
│   ├── Edit salaris range
│   ├── Edit rooster
│   ├── Edit woonruimte price
│   └── Edit hire criteria
└── Settings
    ├── Hero headline
    ├── WhatsApp number
    └── Contact info
```

---

## 💾 Content (To Fill In)

### Quick Facts
```
💰 Salaris: €11.50 - €14.50/uur
📅 Rooster: 4-5 dagen/week (flexibel)
🏝️  Locatie: Texel, uitzicht zee
👥 Team: 8-10 vaste collega's
```

### Testimonials (Template)
```
[Testimonial 1]
Name: Marco
Role: Bediening (3 jaar)
Quote: "Ik werk hier omdat de sfeer geweldig is en 
Desiree & Mike echt om hun crew geven. Plus flexibel rooster!"
Photo: /assets/marco.jpg

[Testimonial 2]
Name: Lisa  
Role: Keuken (1 jaar)
Quote: "Geen stress, hechte groep, en je verdient 
behoorlijk goed voor Texel."
Photo: /assets/lisa.jpg

[Testimonial 3]
Name: Desiree
Role: Owner
Quote: "We zoeken mensen die energiek zijn en 
van gasten houden. Ervaring? Niet nodig!"
Photo: /assets/desiree.jpg
```

---

## 🔄 Implementation Phases

### Phase 1: Admin Panel + Database (3 days)
- [ ] Supabase setup (testimonials + quick_facts tables)
- [ ] Admin page layout (/admin/dashboard)
- [ ] CRUD endpoints (API routes)
- [ ] Image upload handling
- [ ] Reorder functionality

### Phase 2: Homepage Redesign (2 days)
- [ ] Hero section (new copy, WhatsApp button)
- [ ] Quick Facts section (dynamic from DB)
- [ ] Testimonials section (cards, mobile-responsive)
- [ ] Details section (clean, scannable)
- [ ] Contact options (3 buttons)
- [ ] Mobile testing

### Phase 3: Polish + Deploy (1 day)
- [ ] Analytics setup
- [ ] SEO basics
- [ ] Performance check
- [ ] Deploy werkenbij.21knots.nl
- [ ] Test WhatsApp flow

---

## 🛠️ Tech Implementation

### New Components Needed
```tsx
// components/
├── Testimonial.tsx (single card)
├── TestimonialGrid.tsx (all testimonials)
├── QuickFacts.tsx (benefits showcase)
├── ContactOptions.tsx (3-button footer)
└── admin/
    ├── TestimonialForm.tsx
    ├── TestimonialList.tsx
    ├── QuickFactsEditor.tsx
    └── SettingsPanel.tsx
```

### API Routes
```
/api/admin/testimonials (GET, POST, PUT, DELETE)
/api/admin/quick-facts (GET, PUT)
/api/admin/settings (GET, PUT)
/api/upload (image upload to Supabase)
```

---

## ✅ Checklist: Info Needed

- [ ] **Salaris**: Exact range? (€X - €X/uur)
- [ ] **Rooster**: Hoeveel dagen/week? (4-5?)
- [ ] **Woonruimte**: Prijs per maand?
- [ ] **Team fotos**: Hebben jullie foto's van:
  - [ ] Marco (bediening)
  - [ ] Lisa (keuken)  
  - [ ] Desiree (owner)
  - [ ] Andere collega's?
- [ ] **Testimonial quotes**: Wat zeggen ze echt?
- [ ] **WhatsApp**: Hetzelfde nummer (Marije)?
- [ ] **Criteria**: Wat zoeken jullie ECHT? (betrouwbaar, energiek, vriendelijk, etc)

---

## 🎨 Design Notes

- **Hero**: Big, simple, mobile-first
- **Colors**: Keep #3b696d (teal) + #bdeffc (cyan)
- **Typography**: Kodchasan (already set)
- **Spacing**: Generous (mobile scrolling)
- **CTAs**: Always visible (sticky/prominent)
- **Tone**: Informal, honest, no corporate BS
