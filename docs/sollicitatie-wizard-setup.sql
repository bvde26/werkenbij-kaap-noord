-- ============================================================
-- Sollicitatie-wizard — volledige Supabase setup
-- Idempotent: veilig meerdere keren te draaien.
-- Uitvoeren in de Supabase SQL editor.
-- ============================================================

-- 1. Applicants-tabel (sollicitanten).
create table if not exists applicants (
  id          uuid primary key default gen_random_uuid(),
  vacature_id uuid,
  name        text not null,
  email       text,
  phone       text,
  message     text,
  type        text not null default 'WIZARD',
  status      text not null default 'NEW',
  answers     jsonb,
  cv_url      text,
  created_at  timestamptz not null default now()
);

-- Voor het geval de tabel al bestond zonder deze kolommen:
alter table applicants add column if not exists answers jsonb;
alter table applicants add column if not exists cv_url  text;
alter table applicants add column if not exists type    text default 'WIZARD';
alter table applicants add column if not exists status  text default 'NEW';

-- 2. Config-tabel: één rij (id = 1) met de volledige form-definitie.
create table if not exists wizard_config (
  id          int primary key default 1,
  config      jsonb not null,
  updated_at  timestamptz not null default now(),
  constraint wizard_config_single_row check (id = 1)
);

-- 3. Privé storage-bucket voor CV-uploads.
insert into storage.buckets (id, name, public)
values ('cv', 'cv', false)
on conflict (id) do nothing;

-- 4. RLS aanzetten.
alter table applicants     enable row level security;
alter table wizard_config  enable row level security;

-- Bezoekers (anon) mogen een sollicitatie insturen.
drop policy if exists "applicants insert public" on applicants;
create policy "applicants insert public" on applicants
  for insert with check (true);

-- Ingelogde admins mogen sollicitaties lezen/bijwerken.
drop policy if exists "applicants admin read" on applicants;
create policy "applicants admin read" on applicants
  for select using (auth.role() = 'authenticated');

drop policy if exists "applicants admin update" on applicants;
create policy "applicants admin update" on applicants
  for update using (auth.role() = 'authenticated');

-- Wizard-config: iedereen leest, alleen admins schrijven.
drop policy if exists "wizard_config read" on wizard_config;
create policy "wizard_config read" on wizard_config
  for select using (true);

drop policy if exists "wizard_config write" on wizard_config;
create policy "wizard_config write" on wizard_config
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- CV-upload: anon mag uploaden, alleen admins lezen.
drop policy if exists "cv upload public" on storage.objects;
create policy "cv upload public" on storage.objects
  for insert with check (bucket_id = 'cv');

drop policy if exists "cv read admin" on storage.objects;
create policy "cv read admin" on storage.objects
  for select using (bucket_id = 'cv' and auth.role() = 'authenticated');
