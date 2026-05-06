# Deployment Guide — werkenbij.21knots.nl

## 🚀 Step-by-Step Deployment

### 1. GitHub Push (if not done)
```bash
cd /Users/bram/Desktop/kaap-noord
git push origin main
```

### 2. Vercel Setup

**Option A: CLI (recommended)**
```bash
npm i -g vercel
vercel login
vercel --prod --name werkenbij
```

**Option B: UI (vercel.com)**
1. Go to https://vercel.com/new
2. Import GitHub repo (kaap-noord)
3. Set project name: `werkenbij`
4. Deploy

### 3. Environment Variables (in Vercel)

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
```

Get these from: Supabase Dashboard → Settings → API

### 4. Domain Setup

In Vercel Dashboard → Domains:
- Add domain: `werkenbij.21knots.nl`
- Follow DNS instructions from 21knots provider

### 5. Supabase Setup

Run this SQL in Supabase SQL Editor:

```sql
-- See docs/SUPABASE_SETUP.sql for full schema
CREATE TABLE testimonials (...)
CREATE TABLE quick_facts (...)
CREATE TABLE settings (...)
```

## ✅ Checklist

- [ ] GitHub push
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Domain linked
- [ ] Supabase tables created
- [ ] Test website: werkenbij.21knots.nl

## 📝 Next Steps After Deploy

1. Fill in testimonials via admin dashboard
2. Test WhatsApp flow
3. Monitor analytics
4. Gather team quotes + photos

## 🔐 Important

- Keep Supabase keys SECRET
- Use `.env.local` for local development
- Never commit secrets to GitHub
