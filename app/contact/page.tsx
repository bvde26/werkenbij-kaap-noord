'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function Contact() {
  const [ctaVisible, setCtaVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefdf5' }}>
      <style>{`
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0px); box-shadow: 0 6px 16px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2); }
          50%       { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2); }
        }
        .float-btn-contact {
          animation: floatBtn 2.8s ease-in-out infinite;
          will-change: transform;
          border-radius: 50% !important;
        }
        .float-btn-contact:hover {
          animation: none;
          transform: translateY(-8px) scale(1.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.45) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>
      <Header active="/contact" />
      <FloatingButtons hidden={ctaVisible} />

      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1
            className="text-5xl md:text-6xl uppercase mb-6"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Kom je kennismaken?
          </h1>
          <p className="text-xl" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
            Geen lange sollicitatie. Geen gekke tests. Gewoon een gesprek of een dagje meelopen.
          </p>
        </div>
      </section>

      {/* Contact opties */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={ctaRef} className="grid md:grid-cols-2 gap-8 mb-12">

            {/* WhatsApp */}
            <div className="rounded-xl p-8 text-center shadow-sm bg-white flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>WhatsApp Marije</h2>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: '#666' }}>
                De snelste manier. Stuur een appje en we reageren zo snel mogelijk. Gewoon in je eigen woorden.
              </p>
              <div className="float-btn-contact" style={{ width: '56px', height: '56px', flexShrink: 0, position: 'relative', borderRadius: '50%', backgroundColor: '#25D366' }}>
                <a
                  href="https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ position: 'absolute', inset: '0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Open WhatsApp"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.687.435 3.272 1.197 4.653L2 22l5.998-1.172A9.45 9.45 0 0 0 11.5 21c5.238 0 9.5-4.262 9.5-9.5S16.738 2 11.5 2zm0 17.3a7.792 7.792 0 0 1-3.976-1.083l-.285-.169-2.955.577.6-2.883-.186-.295A7.793 7.793 0 0 1 3.7 11.5C3.7 7.198 7.198 3.7 11.5 3.7S19.3 7.198 19.3 11.5 15.802 19.3 11.5 19.3z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Bellen */}
            <div className="rounded-xl p-8 text-center shadow-sm bg-white flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>Bel ons</h2>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: '#666' }}>
                Liever even bellen? Marije staat voor je klaar. Geef jezelf even voor en we plannen een gesprekje.
              </p>
              <div className="float-btn-contact" style={{ width: '56px', height: '56px', flexShrink: 0, position: 'relative', borderRadius: '50%', backgroundColor: '#3b696d', animationDelay: '0.5s' }}>
                <a
                  href="tel:+31623823324"
                  style={{ position: 'absolute', inset: '0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Bel ons"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl p-8 md:p-12 bg-white shadow-sm">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#3b696d' }}>Stuur een berichtje</h2>
            <p className="text-gray-500 text-sm mb-8">We reageren zo snel mogelijk en plannen daarna graag een persoonlijk gesprek.</p>

            <form className="space-y-5" action="mailto:vacatures@strandpaviljoenkaapnoord.nl" method="get">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d' }}>Naam *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jouw naam"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#3b696d] bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d' }}>Telefoonnummer *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="06-..."
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#3b696d] bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d' }}>Interesse in... (optioneel)</label>
                <select className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#3b696d] bg-gray-50" name="functie">
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
                <label className="block text-sm font-semibold mb-2" style={{ color: '#3b696d' }}>Bericht (optioneel)</label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Vertel wat je wil — of laat dit gewoon leeg. We nemen toch contact op!"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#3b696d] bg-gray-50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 font-bold text-white text-sm uppercase tracking-wider transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#3b696d' }}
              >
                Verstuur bericht
              </button>
            </form>

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
