# Kaap Noord — Project Context

**Project**: werkenbijkaapnoord.nl rebuild  
**Type**: Recruitment website (Next.js + Supabase)  
**Client**: Strandpaviljoen Kaap Noord (Texel)  
**Status**: Fase 1 (Tech setup)

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

## Timeline

- **Fase 1** (this week): Tech setup ← YOU ARE HERE
- **Fase 2** (next week): Website rebuild
- **Fase 3** (week 3): SEO + analytics
- **Fase 4** (week 4): Admin handover + go-live
