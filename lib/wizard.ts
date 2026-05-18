import { supabase } from './supabase';

// ── Types ──────────────────────────────────────────────

export type StepType =
  | 'category'   // keuze uit config.categories — bepaalt de route
  | 'function'   // keuze uit config.functions[categorie]
  | 'single'     // 1 keuze uit options (auto-volgende)
  | 'multi'      // meerdere keuzes uit options
  | 'text'       // 1+ tekstvelden
  | 'number'     // leeftijd e.d.
  | 'rating'     // sterren per item (talen)
  | 'availability' // per direct / vanaf datum
  | 'file'       // CV upload
  | 'thanks';    // eindscherm

export interface WizardTextField {
  key: string;
  label: string;
  placeholder?: string;
  inputType?: 'text' | 'tel' | 'email';
}

export interface WizardStep {
  id: string;
  type: StepType;
  title: string;
  subtitle?: string;
  hint?: string;
  field?: string;            // sleutel in formData
  required?: boolean;
  options?: string[];        // single / multi
  ratingItems?: string[];    // rating
  fields?: WizardTextField[]; // text
  showFor?: string[];        // category-ids; leeg/undefined = alle routes
}

export interface WizardConfig {
  categories: { id: string; label: string }[];
  functions: Record<string, string[]>;
  steps: WizardStep[];
}

// ── Default-config (afgeslankt + couverts/horeca-ervaring) ──────────

export const ERVARINGSNIVEAUS = [
  'Geen ervaring',
  'Een beetje (0-1 jaar)',
  'Ervaren (1-3 jaar)',
  'Veel ervaring (3+ jaar)',
];

export const COUVERTS_OPTIES = ['Minder dan 50', '50 - 100', '100 - 200', '200+'];
export const UREN_OPTIES = ['0 - 16 uur', '16 - 24 uur', '24 - 32 uur', '32+ uur'];

export const DEFAULT_CONFIG: WizardConfig = {
  categories: [
    { id: 'keuken', label: 'Heerlijke gerechten koken' },
    { id: 'bediening', label: 'Gasten bedienen' },
    { id: 'management', label: 'Leidinggeven aan een team' },
    { id: 'spoel', label: 'Helpen in de spoelkeuken' },
  ],
  functions: {
    keuken: ['Zelfstandig werkend kok', 'Chef de Partie', 'Leerling kok', 'Keukenhulp'],
    bediening: ['Zelfstandig medewerker bediening', 'Medewerker bediening', 'Barmedewerker', 'Vakantiekracht / weekendhulp'],
    management: ['Restaurantmanager', 'Assistent-manager', 'Floormanager'],
    spoel: ['Afwasser / spoelkeuken'],
  },
  steps: [
    {
      id: 'categorie',
      type: 'category',
      field: 'categorie',
      title: 'Wat zou je graag willen doen bij Kaap Noord?',
    },
    {
      id: 'functie',
      type: 'function',
      field: 'functie',
      title: 'Voor welke functie wil je solliciteren?',
    },
    {
      id: 'ervaring',
      type: 'single',
      field: 'ervaring',
      title: 'Hoeveel ervaring heb je in deze functie?',
      options: ERVARINGSNIVEAUS,
    },
    {
      id: 'couverts',
      type: 'single',
      field: 'couverts',
      title: 'Hoeveel couverts heb je gemiddeld per service gedraaid?',
      options: COUVERTS_OPTIES,
      showFor: ['keuken', 'bediening', 'management'],
    },
    {
      id: 'horeca_ervaring',
      type: 'text',
      title: 'Waar in de horeca heb je eerder gewerkt?',
      hint: 'Bijvoorbeeld restaurants, strandtenten of andere horeca. Laat leeg als je nog geen ervaring hebt.',
      showFor: ['keuken', 'bediening', 'management'],
      fields: [
        { key: 'horecaErvaring', label: 'Vorige werkgever(s)', placeholder: 'Typ hier waar je eerder hebt gewerkt' },
      ],
    },
    {
      id: 'beschikbaarheid',
      type: 'availability',
      field: 'beschikbaarheid',
      title: 'Vanaf wanneer ben je beschikbaar?',
    },
    {
      id: 'uren',
      type: 'single',
      field: 'uren',
      title: 'Hoeveel uur per week wil je werken?',
      options: UREN_OPTIES,
    },
    {
      id: 'naam',
      type: 'text',
      subtitle: 'Laten we even kennismaken.',
      title: 'Wat is je naam?',
      required: true,
      fields: [
        { key: 'voornaam', label: 'Voornaam', placeholder: 'Typ hier je voornaam' },
        { key: 'achternaam', label: 'Achternaam', placeholder: 'Typ hier je achternaam' },
      ],
    },
    {
      id: 'leeftijd',
      type: 'number',
      field: 'leeftijd',
      title: 'Hoe oud ben je?',
      required: true,
    },
    {
      id: 'talen',
      type: 'rating',
      field: 'talen',
      title: 'Welke talen spreek je?',
      ratingItems: ['Nederlands', 'Engels'],
    },
    {
      id: 'contact',
      type: 'text',
      title: 'Hoe kunnen we je bereiken?',
      required: true,
      fields: [
        { key: 'telefoon', label: 'Telefoonnummer', placeholder: '06 12345678', inputType: 'tel' },
        { key: 'email', label: 'E-mailadres', placeholder: 'voorbeeld@email.com', inputType: 'email' },
      ],
    },
    {
      id: 'cv',
      type: 'file',
      field: 'cv',
      title: 'Maak je sollicitatie compleet met je cv',
      hint: 'Optioneel — je kunt deze stap ook overslaan.',
    },
    {
      id: 'bedankt',
      type: 'thanks',
      title: 'Bedankt voor je sollicitatie!',
      subtitle: 'We nemen zo snel mogelijk contact met je op.',
    },
  ],
};

// ── Config laden / opslaan ─────────────────────────────

export async function getWizardConfig(): Promise<WizardConfig> {
  const { data, error } = await supabase
    .from('wizard_config')
    .select('config')
    .eq('id', 1)
    .maybeSingle();
  if (error || !data?.config) return DEFAULT_CONFIG;
  return data.config as WizardConfig;
}

export async function saveWizardConfig(config: WizardConfig) {
  const { error } = await supabase
    .from('wizard_config')
    .upsert({ id: 1, config, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// ── Inzending versturen ────────────────────────────────

export interface WizardSubmission {
  vacatureId?: string | null;
  vacatureTitle?: string | null;
  answers: Record<string, unknown>;
  cvFile?: File | null;
}

export async function submitWizardApplication(s: WizardSubmission) {
  let cv_url: string | null = null;

  if (s.cvFile) {
    const ext = s.cvFile.name.split('.').pop() || 'pdf';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from('cv')
      .upload(path, s.cvFile, { upsert: false });
    if (!upErr) cv_url = path;
  }

  const a = s.answers as Record<string, string>;
  const naam = [a.voornaam, a.achternaam].filter(Boolean).join(' ').trim() || 'Onbekend';
  const phone = [a.landcode, a.telefoon].filter(Boolean).join(' ').trim();

  const { error } = await supabase.from('applicants').insert([
    {
      vacature_id: s.vacatureId || null,
      name: naam,
      email: a.email || null,
      phone: phone || '—',
      message: s.vacatureTitle ? `Sollicitatie via wizard — ${s.vacatureTitle}` : 'Sollicitatie via wizard',
      type: 'WIZARD',
      status: 'NEW',
      answers: s.answers,
      cv_url,
    },
  ]);
  if (error) throw error;

  // Mailnotificatie (best-effort — de inzending staat al veilig in de DB).
  try {
    const { cv: _cv, ...mailAnswers } = s.answers as Record<string, unknown>;
    void _cv;
    await fetch('/api/sollicitatie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: mailAnswers,
        vacatureTitle: s.vacatureTitle ?? null,
        cvPath: cv_url,
      }),
    });
  } catch {
    /* mail mag falen zonder de sollicitatie te blokkeren */
  }
}
