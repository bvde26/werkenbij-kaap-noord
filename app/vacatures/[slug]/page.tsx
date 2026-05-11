import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RichText from '@/components/RichText';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const PHONE = 'tel:+31623823324';
const WHATSAPP = 'https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20solliciteren%20bij%20Kaap%20Noord!';
const EMAIL = 'mailto:info@kaapnoord.nl';

async function getVacature(slug: string) {
  noStore();
  const sb = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await sb
    .from('vacatures')
    .select('id, title, uren_display, description, extended_description, image_url, slug')
    .eq('slug', slug)
    .single();
  if (error && error.code !== 'PGRST116') console.error('[vacature]', error.message);
  return data ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVacature(slug);
  if (!v) return { title: 'Vacature — Werken bij Kaap Noord' };

  const desc = (v.description || '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .split('\n').find((l: string) => l.trim().length > 20) || '';

  return {
    title: `${v.title} — Werken bij Kaap Noord`,
    description: desc.slice(0, 160),
    openGraph: {
      title: `${v.title} — Werken bij Kaap Noord`,
      description: desc.slice(0, 160),
      ...(v.image_url && { images: [{ url: v.image_url, width: 1200, height: 630, alt: v.title }] }),
      type: 'website',
      locale: 'nl_NL',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${v.title} — Werken bij Kaap Noord`,
      description: desc.slice(0, 160),
      ...(v.image_url && { images: [v.image_url] }),
    },
  };
}

export default async function VacaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = await getVacature(slug);
  if (!v) notFound();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefdf5' }}>
      <style>{`
        .vd-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 16px 20px;
          border-radius: 12px;
          text-decoration: none;
          font-family: 'Kodchasan', sans-serif;
          font-size: 13px;
          font-weight: 700;
          transition: opacity 0.15s, transform 0.15s;
          min-width: 100px;
        }
        .vd-btn:hover { opacity: 0.85; transform: translateY(-2px); }
        .vd-btn:active { transform: scale(0.97); }
      `}</style>

      <Header active="" />

      {/* Hero */}
      <section style={{ backgroundColor: '#3b696d', paddingTop: '40px', paddingBottom: '48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
          <Link href="/#vacatures"
            style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontFamily: "'Kodchasan', sans-serif", display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            ← Alle vacatures
          </Link>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#bdeffc', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Kodchasan', sans-serif", marginBottom: '10px' }}>
            Vacature · Kaap Noord · Texel
          </p>
          <h1 style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, fontSize: 'clamp(2.4rem, 7vw, 4rem)', color: '#ffffff', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 20px' }}>
            {v.title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {v.uren_display && (
              <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: '999px', padding: '5px 14px', fontSize: '13px', fontFamily: "'Kodchasan', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {v.uren_display}
              </span>
            )}
            <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: '999px', padding: '5px 14px', fontSize: '13px', fontFamily: "'Kodchasan', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Texel
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: '#ffffff', padding: '48px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>

          {/* Photo */}
          {v.image_url && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
              <div style={{
                background: 'white',
                padding: '10px 10px 36px 10px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)',
                transform: 'rotate(-1.5deg)',
                maxWidth: '360px',
                width: '100%',
              }}>
                <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img src={v.image_url} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {v.description && (
            <div style={{ marginBottom: v.extended_description ? '32px' : '0' }}>
              <RichText text={v.description} color="#3b696d" fontSize="17px" lineHeight="1.8" />
            </div>
          )}

          {/* Extended */}
          {v.extended_description && (
            <>
              <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '0 0 32px' }} />
              <RichText text={v.extended_description} color="#3b696d" fontSize="17px" lineHeight="1.8" />
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#bdeffc', padding: '48px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#3b696d', letterSpacing: '0.03em', marginBottom: '8px' }}>
            Solliciteer direct
          </h2>
          <p style={{ fontFamily: "'Kodchasan', sans-serif", fontSize: '15px', color: '#3b696d', marginBottom: '32px', fontWeight: 300 }}>
            Heb je interesse of vragen? Neem gerust contact op.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <a href={PHONE} className="vd-btn" style={{ backgroundColor: '#3b696d', color: '#ffffff' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 13.72 19.79 19.79 0 0 1 1.83 5.1 2 2 0 0 1 3.8 2.9h3a2 2 0 0 1 2 1.72c.127.96.362 1.902.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.908.338 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Bel ons
            </a>

            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="vd-btn" style={{ backgroundColor: '#25D366', color: '#ffffff' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.687.435 3.272 1.197 4.653L2 22l5.998-1.172A9.45 9.45 0 0 0 11.5 21c5.238 0 9.5-4.262 9.5-9.5S16.738 2 11.5 2zm0 17.3a7.792 7.792 0 0 1-3.976-1.083l-.285-.169-2.955.577.6-2.883-.186-.295A7.793 7.793 0 0 1 3.7 11.5C3.7 7.198 7.198 3.7 11.5 3.7S19.3 7.198 19.3 11.5 15.802 19.3 11.5 19.3z"/>
              </svg>
              WhatsApp
            </a>

            <a href={EMAIL} className="vd-btn" style={{ backgroundColor: '#ffffff', color: '#3b696d', border: '2px solid #3b696d' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Mail ons
            </a>
          </div>

          <p style={{ fontFamily: "'Kodchasan', sans-serif", fontSize: '13px', color: '#3b696d', marginTop: '28px', opacity: 0.7 }}>
            Werken bij Kaap Noord · Strandpaviljoen · Texel
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
