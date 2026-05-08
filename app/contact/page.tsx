'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { supabase } from '@/lib/supabase';

/*
  Supabase tabel nodig — run eenmalig in SQL Editor:

  create table contact_submissions (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text not null,
    functie text,
    message text,
    created_at timestamptz default now()
  );
  alter table contact_submissions enable row level security;
  create policy "public_insert" on contact_submissions for insert with check (true);
*/

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [ctaVisible, setCtaVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [functie, setFunctie] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setCtaVisible(e.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase
      .from('contact_submissions')
      .insert({ name, phone, functie: functie || null, message: message || null });

    if (error) {
      // Fallback: open mailto met de data correct in de body
      const subject = encodeURIComponent('Contactformulier werkenbijkaapnoord.nl');
      const body = encodeURIComponent(
        `Naam: ${name}\nTelefoon: ${phone}${functie ? `\nInteresse: ${functie}` : ''}${message ? `\nBericht: ${message}` : ''}`
      );
      window.location.href = `mailto:vacatures@strandpaviljoenkaapnoord.nl?subject=${subject}&body=${body}`;
      setStatus('idle');
    } else {
      setStatus('success');
      setName('');
      setPhone('');
      setFunctie('');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefdf5' }}>
      <style>{`
        @keyframes floatWA {
          0%, 100% { transform: translateY(0px) scale(1); }
          40%       { transform: translateY(-16px) scale(1.09); }
          60%       { transform: translateY(-11px) scale(1.05); }
        }
        @keyframes floatPhone {
          0%, 100% { transform: translateY(0px) scale(1); }
          40%       { transform: translateY(-16px) scale(1.09); }
          60%       { transform: translateY(-11px) scale(1.05); }
        }
        .contact-circle-btn {
          width: 62px;
          height: 62px;
          border-radius: 50% !important;
          border: none !important;
          outline: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 0;
          will-change: transform;
        }
        .float-wa {
          animation: floatWA 2.4s ease-in-out infinite;
          box-shadow: 0 8px 24px rgba(37,211,102,0.5), 0 3px 10px rgba(37,211,102,0.28);
        }
        .float-phone {
          animation: floatPhone 2.4s ease-in-out infinite;
          animation-delay: 0.6s;
          box-shadow: 0 8px 24px rgba(59,105,109,0.5), 0 3px 10px rgba(59,105,109,0.28);
        }
        @media (hover: hover) and (pointer: fine) {
          .float-wa:hover {
            animation: none;
            transform: translateY(-10px) scale(1.15);
            box-shadow: 0 32px 52px rgba(37,211,102,0.65) !important;
            transition: transform 0.18s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.18s ease-out;
          }
          .float-phone:hover {
            animation: none;
            transform: translateY(-10px) scale(1.15);
            box-shadow: 0 32px 52px rgba(59,105,109,0.65) !important;
            transition: transform 0.18s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.18s ease-out;
          }
        }
        .float-wa:active, .float-phone:active {
          animation: none !important;
          transform: scale(0.94) !important;
          transition: transform 100ms ease-out !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .float-wa, .float-phone { animation: none; }
        }
        .form-input {
          width: 100%;
          border: 1px solid #d1d5db;
          padding: 12px 16px;
          font-size: 14px;
          background: #f9fafb;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
          font-family: 'Kodchasan', sans-serif;
        }
        .form-input:focus {
          border-color: #3b696d;
          box-shadow: 0 0 0 3px rgba(59,105,109,0.12);
        }
      `}</style>
      <Header active="/contact" />
      <FloatingButtons hidden={ctaVisible} />

      {/* Hero */}
      <section className="py-6 md:py-12 text-center" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1
            className="text-5xl md:text-6xl uppercase mb-4"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Kom je kennismaken?
          </h1>
          <p style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '1.6' }}>
            Geen lange sollicitatie. Geen gekke tests. Gewoon een gesprek of een dagje meelopen.
          </p>
        </div>
      </section>

      {/* Contact opties */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={ctaRef} className="grid md:grid-cols-2 gap-4 mb-8">

            {/* WhatsApp */}
            <div className="rounded-xl p-5 text-center shadow-sm bg-white flex flex-col items-center">
              <h2 className="text-2xl uppercase mb-2" style={{ color: '#3b696d', fontFamily: "'Pana Summer', serif", fontWeight: 400, letterSpacing: '0.03em' }}>WhatsApp Marije</h2>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: '#666' }}>
                De snelste manier. Stuur een appje en we reageren zo snel mogelijk. Gewoon in je eigen woorden.
              </p>
              <button
                className="contact-circle-btn float-wa"
                style={{ backgroundColor: '#25D366' }}
                onClick={() => window.open('https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!', '_blank', 'noopener,noreferrer')}
                aria-label="Open WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.687.435 3.272 1.197 4.653L2 22l5.998-1.172A9.45 9.45 0 0 0 11.5 21c5.238 0 9.5-4.262 9.5-9.5S16.738 2 11.5 2zm0 17.3a7.792 7.792 0 0 1-3.976-1.083l-.285-.169-2.955.577.6-2.883-.186-.295A7.793 7.793 0 0 1 3.7 11.5C3.7 7.198 7.198 3.7 11.5 3.7S19.3 7.198 19.3 11.5 15.802 19.3 11.5 19.3z"/>
                </svg>
              </button>
            </div>

            {/* Bellen */}
            <div className="rounded-xl p-5 text-center shadow-sm bg-white flex flex-col items-center">
              <h2 className="text-2xl uppercase mb-2" style={{ color: '#3b696d', fontFamily: "'Pana Summer', serif", fontWeight: 400, letterSpacing: '0.03em' }}>Bel ons</h2>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: '#666' }}>
                Liever even bellen? Marije staat voor je klaar. Geef jezelf even voor en we plannen een gesprekje.
              </p>
              <button
                className="contact-circle-btn float-phone"
                style={{ backgroundColor: '#3b696d' }}
                onClick={() => window.location.href = 'tel:+31623823324'}
                aria-label="Bel ons"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl p-8 md:p-12 bg-white shadow-sm">
            <h2 className="text-2xl uppercase mb-2" style={{ color: '#3b696d', fontFamily: "'Pana Summer', serif", fontWeight: 400, letterSpacing: '0.03em' }}>Stuur een berichtje</h2>
            <p className="text-sm mb-8" style={{ color: '#666', fontFamily: "'Kodchasan', sans-serif", fontWeight: 400, lineHeight: '1.6' }}>We reageren zo snel mogelijk en plannen daarna graag een persoonlijk gesprek.</p>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-content mx-auto mb-4" style={{ backgroundColor: '#bdeffc' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b696d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: 'auto' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl uppercase mb-2" style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}>Bericht ontvangen!</h3>
                <p className="text-sm" style={{ color: '#666', fontFamily: "'Kodchasan', sans-serif", lineHeight: '1.6' }}>
                  We nemen zo snel mogelijk contact met je op.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm underline"
                  style={{ color: '#3b696d', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Kodchasan', sans-serif" }}
                >
                  Nog een bericht sturen
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>Naam *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jouw naam"
                      className="form-input"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>Telefoonnummer *</label>
                    <input
                      type="tel"
                      required
                      placeholder="06-..."
                      className="form-input"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>Interesse in... (optioneel)</label>
                  <select
                    className="form-input"
                    value={functie}
                    onChange={e => setFunctie(e.target.value)}
                  >
                    <option value="">Kies een functie...</option>
                    <option>Bediening</option>
                    <option>Keuken / Kok</option>
                    <option>Weekendhulp of vakantiekracht</option>
                    <option>Tussenjaars op Texel</option>
                    <option>Chef de Partie</option>
                    <option>Open sollicitatie</option>
                    <option>Weet ik nog niet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>Bericht (optioneel)</label>
                  <textarea
                    rows={4}
                    placeholder="Vertel wat je wil — of laat dit gewoon leeg. We nemen toch contact op!"
                    className="form-input resize-none"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-85 active:scale-[0.98] disabled:opacity-60"
                  style={{ backgroundColor: '#3b696d', color: '#ffffff', transition: 'opacity 0.15s ease, transform 0.1s ease' }}
                >
                  {status === 'loading' ? 'Versturen...' : 'Verstuur bericht'}
                </button>
              </form>
            )}

            <p className="text-center text-xs text-gray-400 mt-4">
              Of mail direct: <a href="mailto:vacatures@strandpaviljoenkaapnoord.nl" className="underline" style={{ color: '#3b696d' }}>vacatures@strandpaviljoenkaapnoord.nl</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
