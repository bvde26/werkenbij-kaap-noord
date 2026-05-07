# Kaap Noord — Project Context

**Project**: werkenbijkaapnoord.nl rebuild  
**Type**: Recruitment website (Next.js + Supabase)  
**Client**: Strandpaviljoen Kaap Noord (Texel)  
**Status**: Fase 2 (Website rebuild — in uitvoering)

---

## Stack

- **Frontend**: Next.js 14+ (TypeScript, App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Magic Link (Supabase Auth)
- **Hosting**: Vercel
- **Analytics**: Google Analytics 4 + Google Search Console

---

## Project Structure

```
kaap-noord/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx
│   ├── vacatures/
│   │   ├── page.tsx          # All jobs
│   │   └── [id]/page.tsx     # Single job detail
│   ├── over-ons/page.tsx
│   ├── faq/page.tsx
│   ├── contact/page.tsx
│   └── admin/
│       ├── login/page.tsx    # Magic Link login
│       ├── dashboard/page.tsx
│       ├── vacatures/page.tsx
│       └── inzendingen/page.tsx
├── lib/
│   ├── supabase.ts           # Supabase client
│   ├── db.ts                 # Database helpers
│   └── auth.ts               # Auth helpers
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── VacatureCard.tsx
│   ├── admin/
│   │   └── VacatureForm.tsx
│   └── ...
├── public/
│   └── images/
├── docs/
│   ├── ASSETS.md
│   ├── SEO_AUDIT.md
│   ├── UX_AUDIT.md
│   ├── TECH_STACK.md
│   └── ADMIN_GUIDE.md
└── package.json
```

---

## Database Schema

### `vacatures` table
```sql
id: uuid (PK)
title: text
description: text
salary_min: integer (optional)
salary_max: integer (optional)
hours_per_week: integer
job_type: text (FULL_TIME, PART_TIME, SEASONAL)
location: text (default: "Texel")
image_url: text (optional)
published: boolean
created_at: timestamp
updated_at: timestamp
```

### `applicants` table
```sql
id: uuid (PK)
vacature_id: uuid (FK)
name: text
email: text (optional for MEELOOP)
phone: text
message: text (optional)
type: text (MEELOOP, FORMAL)
status: text (NEW, CONTACTED, REJECTED, HIRED)
created_at: timestamp
```

### `admin_users` table
```sql
id: uuid (PK)
email: text (unique)
role: text (ADMIN, EDITOR)
created_at: timestamp
```

---

## Key Features

### Public Site
- ✅ Homepage with hero video
- ✅ Dynamic vacatures grid
- ✅ Dual-CTA system:
  - "Kom meelopen" (light form: naam + tel)
  - "Formele sollicitatie" (full form)
- ✅ FAQ section
- ✅ Contact page with map
- ✅ Mobile-first responsive

### Admin UI
- ✅ Magic Link authentication
- ✅ Vacature CRUD
- ✅ View all applicants
- ✅ Filter by meeloop vs. formal

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
NEXT_PUBLIC_GA_ID=xxx
NEXT_PUBLIC_SITE_URL=https://werkenbijkaapnoord.nl
```

---

## Key UX Decision: Meeloop Entry Point

**Problem**: Sollicitatie form has high friction  
**Solution**: Dual-CTA (meeloop ultra-light + formal standard)

---

## Typography & Fonts

**From strandpaviljoenkaapnoord.nl:**

- **Pana Summer** (Regular) - h1, h3, a, nav-links, knoppen
  - Stored: `/public/fonts/PanaSummer-Regular.woff2` + `.woff`
  - Usage: "Werken bij Kaap Noord" hero heading, main headings

- **Pana Summer Outline** - Variant available
  - Stored: `/public/fonts/PanaSummer-Outline.woff2` + `.woff`

- **Kodchasan** - h2, p, ul li, body text, subkoppen, formulieren
  - Google Fonts: `Kodchasan:wght@200;300;400;500;600;700`

- **Iconfont** (icomoon) - Icon font
  - Stored: `/public/fonts/icomoon.woff`

- **slick** - Slider/carousel icons
  - Stored: `/public/fonts/slick.woff`

**@font-face format:**
- woff2 (primary - modern, best compression)
- woff (fallback - broader browser support)
- All imported in `globals.css`

---

## Timeline

- **Fase 1**: Tech setup ✅
- **Fase 2**: Website rebuild ← YOU ARE HERE
- **Fase 3**: SEO + analytics
- **Fase 4**: Admin handover + go-live

---

## ⚠️ Kritieke technische beperkingen

### globals.css is kapot — gebruik het NIET
`globals.css` heeft pre-existing fouten: `@import` na andere regels (regel ~741) + ontbrekend `/original-theme.css`. Dit maakt de **lokale dev server altijd blank**. Oplossing: **verificatie altijd via Vercel deploy**, nooit lokaal.

### Nieuwe styles → inline `<style>` JSX tags
Geen nieuwe CSS in globals.css schrijven. Gebruik inline `<style>{...}</style>` in de component zelf voor `@keyframes` en nieuwe klassen.

### `rounded-full` werkt niet op `<a>` tags
Tailwind `rounded-full` en zelfs `borderRadius` classes worden overschreven door globals.css op `<a>` elementen. **Altijd oplossen met expliciete inline style:**
```tsx
style={{ borderRadius: '50%', width: '56px', height: '56px' }}
```
En in de CSS class: `border-radius: 50% !important;`

---

## Vercel deployment

- **Team ID**: `team_emWcQFtLOQepXnlL2NydHyIk`
- **Project ID**: `prj_sUHl8mbCG9JMQgA7Vjf57bHFK4lC`
- **Live URL**: `werkenbij.vercel.app` / `werkenbij.21knots.nl`
- **GitHub repo**: `bvde26/werkenbij-kaap-noord` (auto-deploy op push naar `main`)

---

## Geïmplementeerde features (Fase 2)

- ✅ Homepage hero: tekst + knoppen boven video, crème achtergrond `#fefdf5`
- ✅ Hero: golvende SVG-scheiding tussen tekst en video
- ✅ Hero mobiel: compacte spacing (`pt-5`, kleinere fonts)
- ✅ 3-state accordion vacaturekaarten (closed → short → full)
- ✅ Docked contact buttons (telefoon + WhatsApp) in open vacaturekaart
- ✅ FloatingButtons globaal (rechtsonder, `components/FloatingButtons.tsx`)
- ✅ FloatingButtons verdwijnen wanneer docked buttons zichtbaar zijn (IntersectionObserver)
- ✅ Alle cirkelknoppen zwevend geanimeerd (`@keyframes floatFixed/floatBtn`)
- ✅ "Ik wil meelopen" CTA-knop: floating + warm crème glow animatie
- ✅ Contact pagina: ronde knoppen, FloatingButtons weg wanneer knoppen in beeld
- ✅ Over-ons pagina: foto slider met 19 WordPress CDN foto's (auto-advance, swipe, dots)

### IntersectionObserver patroon (hergebruiken)
```tsx
const [isVisible, setIsVisible] = useState(false);
const ref = useRef<HTMLDivElement>(null);
useEffect(() => {
  const obs = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting), { threshold: 0.2 });
  if (ref.current) obs.observe(ref.current);
  return () => obs.disconnect();
}, []);
// <FloatingButtons hidden={isVisible} />
// <div ref={ref}>...de knoppen...</div>
```

### Animatie patroon (hergebruiken)
```css
/* In inline <style> tag in de component */
@keyframes floatFixed {
  0%, 100% { transform: translateY(0px); box-shadow: 0 6px 20px rgba(0,0,0,0.35); }
  50%       { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.45); }
}
.float-fixed { animation: floatFixed 3s ease-in-out infinite; border-radius: 50% !important; }
```

---

## Brandkleuren

| Naam | Hex |
|------|-----|
| Teal (hoofd) | `#3b696d` |
| Lichtblauw | `#bdeffc` |
| Crème/geel | `#fcf8bd` / `#fefdf5` |
| Donker teal | `#2a4a4d` |
| WhatsApp groen | `#25D366` |

---

## Geïnstalleerde Claude Code Skills

Locatie: `.claude/skills/`

| Skill | Bron | Wat het doet |
|-------|------|-------------|
| `emil-design-eng` | `emilkowalski/skill` | Animatie-filosofie, easing, timing, component-patronen |
| `impeccable` | `pbakaus/impeccable` | Design fluency, 23 commando's (`/polish`, `/audit`, `/animate` etc.) |
| `taste-skill` | `Leonxlnx/taste-skill` | Anti-slop frontend, instelbare dials voor variance/motion/density |

---

## Openstaande content-wijzigingen (opdrachtgever, mei 2026)

Uit het aangeleverde document — nog NIET geïmplementeerd:

### Homepage
- [ ] Hero-tekst vervangen (nieuwe tekst + USP-bullets aangeleverd)
- [ ] Vacatures terugbrengen van 6 → 4: **Kok**, **Keukenhulp**, **Vakantiekracht**, **Bediening**
  - Tussenjaars, Chef de Partie, Open sollicitatie → weg
- [ ] Nieuwe volledige wervingsteksten per vacature (in opdrachtgeverdocument)
- [ ] Teal CTA-banner onderaan homepage verwijderen ("Kom je kennismaken?")

### Over ons pagina
- [ ] Tekst vervangen (nieuwe versie aangeleverd)
- [ ] Bonaire-testimonial verwijderen
- [ ] USP-sectie ("Werken bij ons") verwijderen
- [ ] FAQ van deze pagina verwijderen

### Nog te ontvangen van opdrachtgever
- [ ] Nieuw wervingsfilmpje (Gerhard)
- [ ] Foto's met personeelskleding / meerdere teamleden
