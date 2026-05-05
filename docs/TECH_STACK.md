# Tech Stack & Setup

## Stack

```
Frontend:    Next.js 14+ (TypeScript, App Router, Tailwind CSS)
Backend:     Vercel serverless + Supabase API
Database:    Supabase (PostgreSQL)
Auth:        Supabase Auth (Magic Link OTP)
Hosting:     Vercel
Analytics:   Google Analytics 4 + Google Search Console
```

## Why This Stack?

| Component | Why | Alternative |
|-----------|-----|-------------|
| **Next.js** | Full-stack, TypeScript, built-in API routes, Vercel native | Remix, SvelteKit |
| **Supabase** | PostgreSQL, realtime, built-in auth, free tier generous | Firebase, Plane, PrismaDB |
| **Magic Link** | No passwords, SMS-less, secure, user-friendly | Password + 2FA, OAuth |
| **Vercel** | Next.js native, auto-deploy, free tier, fast | AWS, Netlify, Railway |

## Setup Instructions

### 1. Prerequisites
```bash
Node 18+
npm or yarn
Supabase account (free)
Vercel account (free)
```

### 2. Clone & Install
```bash
cd ~/Desktop/kaap-noord
npm install
```

### 3. Supabase Setup
See `SUPABASE_SETUP.md` for full SQL schema.

Quick start:
1. Go to supabase.com → create new project
2. Copy keys to `.env.local` (see `.env.example`)
3. Run SQL from SUPABASE_SETUP.md
4. Enable OTP auth (Email provider)

### 4. Environment Variables
```
cp .env.example .env.local
# Fill in:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - NEXT_PUBLIC_SITE_URL (http://localhost:3000 for dev)
```

### 5. Run Local
```bash
npm run dev
# Open http://localhost:3000
# Admin: http://localhost:3000/admin/login
```

### 6. Deploy to Vercel
```bash
git push origin main
# Vercel auto-deploys
# Add environment variables in Vercel dashboard
```

## File Structure

```
app/
├── (public routes)
│   ├── page.tsx              # Home
│   ├── vacatures/page.tsx    # Job listings
│   ├── over-ons/             # About
│   ├── faq/                  # FAQ
│   └── contact/              # Contact
├── admin/                    # Protected routes
│   ├── login/               # Magic Link entry
│   ├── dashboard/           # Stats + overview
│   ├── vacatures/           # Job CRUD
│   └── inzendingen/         # Applicant review
└── layout.tsx

lib/
├── supabase.ts              # Client + service client
├── auth.ts                  # Auth helpers
└── db.ts                    # Database queries

components/
├── Header.tsx
├── Footer.tsx
├── VacatureCard.tsx
└── admin/
    ├── VacatureForm.tsx
    └── ApplicantTable.tsx
```

## Database Architecture

### Public Access
- `vacatures` (read published only)
- `applicants` (insert-only: public can submit applications)

### Admin Access
- Everything with RLS protection (must be authenticated)

### API Routes
- `/api/auth/callback` — Magic Link redirect
- `/api/vacatures` — REST endpoints (if needed)
- `/api/applicants` — REST endpoints (if needed)

## Performance Targets

- **PageSpeed Insights**: 90+ (mobile)
- **Core Web Vitals**: Green
- **Lighthouse**: 90+ across categories
- **Time to Interactive**: <2s

## Monitoring

Add later (Fase 3):
- Google Analytics 4 (track conversions)
- Google Search Console (monitor SERP)
- Sentry (error tracking)
- Vercel Analytics (real user monitoring)

## Development Workflow

1. **Feature branch**: `git checkout -b feature/xyz`
2. **Local testing**: `npm run dev`
3. **Commit**: Short English messages
4. **Push to Vercel**: Auto-preview deployment
5. **PR merge**: Auto-deploys to production

## Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| **Vercel** | $0 | Free tier (unlimited requests) |
| **Supabase** | $0 | Free tier (1M queries/month) |
| **Domain** | ~€10/year | Already owned |
| **Analytics** | $0 | Google Analytics free |
| **Email** | $0 | Sendgrid free tier OR use Vercel functions |
| **Total** | ~€10/year | Basically free |

## Security

- ✅ HTTPS enforced
- ✅ RLS on database
- ✅ No sensitive keys in repo (.env.local in .gitignore)
- ✅ CORS configured
- ✅ Rate limiting (add later if needed)

## Next Steps

1. ✅ Create Supabase project
2. ✅ Run SQL schema
3. ✅ Set environment variables
4. ⬜ Build public pages (Fase 2)
5. ⬜ Build admin UI (Fase 2)
6. ⬜ Deploy to Vercel (Fase 4)
