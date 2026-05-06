-- Supabase Setup für Werksfeer Showcase

-- 1. TESTIMONIALS TABLE
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  years_worked INT,
  quote TEXT NOT NULL,
  image_url TEXT,
  order_index INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. QUICK FACTS TABLE
CREATE TABLE quick_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. SETTINGS TABLE
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE quick_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read testimonials"
  ON testimonials FOR SELECT USING (published = true);

CREATE POLICY "Public read quick_facts"
  ON quick_facts FOR SELECT USING (true);

CREATE POLICY "Public read settings"
  ON settings FOR SELECT USING (true);

-- Auth-only write access (for admin)
CREATE POLICY "Authenticated write testimonials"
  ON testimonials FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write quick_facts"
  ON quick_facts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write settings"
  ON settings FOR ALL USING (auth.role() = 'authenticated');

-- Initial Data
INSERT INTO quick_facts (label, value, icon, order_index) VALUES
  ('Rooster', 'Geheel samen bepalen in overleg', '📅', 1),
  ('Woonruimte', 'Mogelijkheden beschikbaar', '🏠', 2),
  ('Team', 'Aanpakkers, sociaal, flexibel, leuk', '👥', 3);

INSERT INTO settings (key, value) VALUES
  ('whatsapp_number', '06-23823324'),
  ('hero_headline', 'Wil je een dagje meelopen?'),
  ('hero_subheading', 'Kom ontdekken hoe het bij Kaap Noord voelt'),
  ('criteria', 'Aanpakker, sociaal, flexibel, leuk');
