import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const TEAL = '#3b696d';
const LIGHTBLUE = '#bdeffc';
const CREAM = '#fefdf5';

const TO_EMAIL = process.env.APPLICATIONS_EMAIL || 'vacatures@strandpaviljoenkaapnoord.nl';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Werken bij Kaap Noord <noreply@werkenbijkaapnoord.nl>';

// Leesbare labels voor de standaard-velden; onbekende keys vallen terug op de key zelf.
const LABELS: Record<string, string> = {
  categorieLabel: 'Categorie',
  functie: 'Functie',
  ervaring: 'Ervaring',
  couverts: 'Couverts per service',
  horecaErvaring: 'Eerdere horeca-ervaring',
  beschikbaarheid: 'Beschikbaar',
  beschikbaarDatum: 'Beschikbaar vanaf',
  uren: 'Uren per week',
  voornaam: 'Voornaam',
  achternaam: 'Achternaam',
  leeftijd: 'Leeftijd',
  talen: 'Talen',
  telefoon: 'Telefoon',
  email: 'E-mail',
};

// Volgorde waarin velden in de mail verschijnen.
const ORDER = [
  'categorieLabel', 'functie', 'ervaring', 'couverts', 'horecaErvaring',
  'beschikbaarheid', 'beschikbaarDatum', 'uren',
  'voornaam', 'achternaam', 'leeftijd', 'talen', 'telefoon', 'email',
];

const SKIP = new Set(['categorie', 'landcode', 'cv', 'vacature']);

function fmtValue(key: string, val: unknown): string {
  if (val == null || val === '') return '—';
  if (key === 'talen' && typeof val === 'object') {
    return Object.entries(val as Record<string, number>)
      .map(([t, n]) => `${t}: ${'★'.repeat(n)}${'☆'.repeat(Math.max(0, 5 - n))}`)
      .join('<br>');
  }
  if (key === 'beschikbaarheid') return val === 'direct' ? 'Per direct' : 'Vanaf datum';
  return String(val);
}

export async function POST(req: NextRequest) {
  let payload: { answers?: Record<string, unknown>; vacatureTitle?: string | null; cvPath?: string | null };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad-request' }, { status: 400 });
  }

  const answers = payload.answers || {};
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Inzending staat al in de database; mail is best-effort.
    return NextResponse.json({ ok: false, error: 'no-resend-key' }, { status: 200 });
  }

  const a = answers as Record<string, string>;
  const phone = [a.landcode, a.telefoon].filter(Boolean).join(' ').trim();
  const naam = [a.voornaam, a.achternaam].filter(Boolean).join(' ').trim() || 'Onbekend';

  // Optioneel: tijdelijke download-link voor het cv (privé bucket).
  let cvLink = '';
  if (payload.cvPath) {
    try {
      const sb = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      );
      const { data } = await sb.storage.from('cv').createSignedUrl(payload.cvPath, 60 * 60 * 24 * 14);
      if (data?.signedUrl) cvLink = data.signedUrl;
    } catch {
      /* cv-link is best-effort */
    }
  }

  const seen = new Set<string>();
  const keys = [...ORDER.filter(k => k in answers), ...Object.keys(answers).filter(k => !ORDER.includes(k))];
  const rows = keys
    .filter(k => !SKIP.has(k) && !seen.has(k) && (seen.add(k), true))
    .map(k => {
      const label = LABELS[k] || k;
      return `<tr>
        <td style="padding:8px 14px;border-bottom:1px solid #e7eded;color:${TEAL};font-weight:600;width:170px;vertical-align:top;">${label}</td>
        <td style="padding:8px 14px;border-bottom:1px solid #e7eded;color:#1f2937;">${fmtValue(k, answers[k])}</td>
      </tr>`;
    })
    .join('');

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:${CREAM};padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:2px solid ${LIGHTBLUE};border-radius:14px;overflow:hidden;">
      <div style="background:${LIGHTBLUE};padding:18px 22px;">
        <h1 style="margin:0;color:${TEAL};font-size:20px;">Nieuwe sollicitatie via de website</h1>
        ${payload.vacatureTitle ? `<p style="margin:6px 0 0;color:${TEAL};font-size:14px;">Vacature: <strong>${payload.vacatureTitle}</strong></p>` : ''}
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
      <div style="padding:18px 22px;">
        ${cvLink
          ? `<a href="${cvLink}" style="display:inline-block;background:${TEAL};color:#fff;text-decoration:none;padding:11px 20px;border-radius:999px;font-size:14px;">CV downloaden (14 dagen geldig)</a>`
          : `<p style="margin:0;color:#6b7280;font-size:13px;">Geen cv meegestuurd.</p>`}
      </div>
    </div>
    <p style="max-width:560px;margin:14px auto 0;color:#9ca3af;font-size:12px;text-align:center;">
      Automatisch verstuurd vanaf werkenbijkaapnoord.nl · antwoord op deze mail gaat rechtstreeks naar ${naam}.
    </p>
  </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: a.email || undefined,
        subject: `Nieuwe sollicitatie — ${naam}${payload.vacatureTitle ? ` (${payload.vacatureTitle})` : ''}`,
        html,
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ ok: false, error: 'resend-failed', detail: txt }, { status: 200 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'resend-error' }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
