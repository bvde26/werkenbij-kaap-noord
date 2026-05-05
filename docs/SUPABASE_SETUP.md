# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Log in
3. Create new project
4. Copy these keys to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (from Settings → API)

## 2. Create Tables

Run these SQL queries in Supabase SQL editor:

### Create `vacatures` table

```sql
CREATE TABLE vacatures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  hours_per_week INTEGER NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'FULL_TIME', -- FULL_TIME, PART_TIME, SEASONAL
  location TEXT NOT NULL DEFAULT 'Texel',
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE vacatures ENABLE ROW LEVEL SECURITY;

-- Public can read published vacatures
CREATE POLICY "Public read published vacatures"
  ON vacatures FOR SELECT
  USING (published = true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Authenticated can manage vacatures"
  ON vacatures FOR ALL
  USING (auth.role() = 'authenticated');
```

### Create `applicants` table

```sql
CREATE TABLE applicants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vacature_id UUID NOT NULL REFERENCES vacatures(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT,
  type TEXT NOT NULL DEFAULT 'FORMAL', -- MEELOOP or FORMAL
  status TEXT NOT NULL DEFAULT 'NEW', -- NEW, CONTACTED, REJECTED, HIRED
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

-- Public can insert applications
CREATE POLICY "Public can submit applications"
  ON applicants FOR INSERT
  WITH CHECK (true);

-- Authenticated users (admin) can read all
CREATE POLICY "Authenticated can read applicants"
  ON applicants FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated users can update status
CREATE POLICY "Authenticated can update applicants"
  ON applicants FOR UPDATE
  USING (auth.role() = 'authenticated');
```

### Create `admin_users` table

```sql
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'EDITOR', -- ADMIN or EDITOR
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view
CREATE POLICY "Authenticated can view admin users"
  ON admin_users FOR SELECT
  USING (auth.role() = 'authenticated');
```

## 3. Enable Magic Link (OTP) Authentication

In Supabase dashboard:
1. Go to **Authentication** → **Providers**
2. Find **Email**
3. Enable **Email OTP** (not password)
4. Configure:
   - OTP validity: 24 hours
   - Session expiry: 7 days

## 4. Add Admin User

In Supabase dashboard SQL editor:

```sql
INSERT INTO admin_users (email, role)
VALUES ('your-email@example.com', 'ADMIN');
```

Or let users sign up with OTP at `/admin/login`.

## 5. Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000 (dev) or https://werkenbijkaapnoord.nl (prod)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (add later)
```

## 6. Test

```bash
npm run dev
# Visit http://localhost:3000/admin/login
# Sign in with your email (OTP will be sent)
```

## Done!

Tables are ready. Now build the UI.
