# Admin login — Supabase setup (handmatige stappen)

De code (magic link + middleware + allowlist) staat. Onderstaande stappen
zet je éénmalig in het Supabase- en Vercel-dashboard. **Stap 4 (RLS) is de
belangrijkste** — zonder RLS ligt de database open via de publieke anon-key.

---

## 1. Open signups uitzetten

Supabase Dashboard → **Authentication → Sign In / Providers → Email**:

- **Allow new users to sign up**: **UIT**
- **Confirm email**: aan laten

Hierdoor werkt een magic link alleen voor handmatig aangemaakte gebruikers.

## 2. De 2 gebruikers aanmaken

Authentication → **Users → Add user → Create new user** (of *Invite*):

- `bramvdelst@gmail.com`
- het e-mailadres van de Kaap Noord-collega

Bij "Create new user" zonder wachtwoord: vink **Auto Confirm User** aan,
zodat ze direct via magic link kunnen inloggen.

## 3. Redirect-URL's whitelisten

Authentication → **URL Configuration**:

- **Site URL**: `https://werkenbij.21knots.nl`
- **Redirect URLs** (toevoegen):
  - `https://werkenbij.21knots.nl/auth/callback`
  - `http://localhost:3000/auth/callback`

## 4. Row Level Security aanzetten (KRITIEK)

SQL Editor → plak en run onderstaande. Dit zorgt dat:
- het publiek alleen gepubliceerde content kan **lezen**;
- alleen ingelogde admins kunnen **schrijven**;
- het publiek wél sollicitaties kan **insturen** maar niet kan teruglezen.

```sql
-- ── Content-tabellen: publiek leest gepubliceerd, admin schrijft alles ──
alter table testimonials enable row level security;
alter table faq_items   enable row level security;
alter table vacatures   enable row level security;

create policy "public reads published" on testimonials
  for select using (published = true);
create policy "admins manage" on testimonials
  for all to authenticated using (true) with check (true);

create policy "public reads published" on faq_items
  for select using (published = true);
create policy "admins manage" on faq_items
  for all to authenticated using (true) with check (true);

create policy "public reads published" on vacatures
  for select using (published = true);
create policy "admins manage" on vacatures
  for all to authenticated using (true) with check (true);

-- ── Site-content (geen published-kolom): publiek leest, admin schrijft ──
alter table site_content enable row level security;
alter table settings     enable row level security;
alter table quick_facts  enable row level security;
alter table media_items  enable row level security;

create policy "public reads" on site_content for select using (true);
create policy "admins manage" on site_content
  for all to authenticated using (true) with check (true);

create policy "public reads" on settings for select using (true);
create policy "admins manage" on settings
  for all to authenticated using (true) with check (true);

create policy "public reads" on quick_facts for select using (true);
create policy "admins manage" on quick_facts
  for all to authenticated using (true) with check (true);

create policy "public reads" on media_items for select using (true);
create policy "admins manage" on media_items
  for all to authenticated using (true) with check (true);
```

> Let op: er is **geen `applicants`-tabel** — sollicitaties worden niet in
> Supabase opgeslagen (lopen via e-mail). Daarom geen policy daarvoor.

> Heb je een tabel met een andere naam of een extra kolom-check nodig
> (bijv. alleen eigen rijen): meld het, dan pas ik het policy-blok aan.

### Storage-bucket `media`

Storage → bucket **media** → Policies:
- **SELECT**: public (bestanden zijn publiek zichtbaar op de site)
- **INSERT/UPDATE/DELETE**: `authenticated`

## 5. ADMIN_EMAILS in Vercel zetten

Vercel → project → **Settings → Environment Variables**:

```
ADMIN_EMAILS = bramvdelst@gmail.com,<collega-email>
```

Voor alle environments (Production + Preview). Daarna **redeployen**.
Lokaal staat dit al in `.env.local` — vul daar het collega-adres in.

---

## Hoe het werkt (kort)

1. Gebruiker vult e-mail in op `/admin/login` → Supabase mailt een magic link.
2. Link wijst naar `/auth/callback` → sessie-cookie wordt gezet.
3. `middleware.ts` checkt bij elke `/admin/*`-route: geldige sessie **én**
   e-mail in `ADMIN_EMAILS`. Zo niet → uitloggen + terug naar login.
4. RLS in Supabase is het echte slot op de database.

Drie onafhankelijke lagen: open signups uit · middleware-allowlist · RLS.
