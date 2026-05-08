'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import DecorativeLine from '@/components/DecorativeLine';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import RichText from '@/components/RichText';

const whatsappLink = "https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!";
const phoneLink = "tel:+31623823324";

type CardState = 'closed' | 'open';

interface Vacature {
  id: string;
  title: string;
  uren_display: string | null;
  description: string | null;
  extended_description: string | null;
  image_url: string | null;
}

const usps = [
  {
    title: 'Werken op een eiland',
    text: 'Werk op een van de mooiste plekken van Nederland. Zilt water, zonsondergangen en natuur om je heen.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 7 7 4 2 6M12 12C12 7 17 4 22 6M2 20h20M6 20c1-2 3-3 4-4M18 20c-1-2-3-3-4-4" />
      </svg>
    ),
  },
  {
    title: 'Echt team',
    text: 'Fijne werksfeer in een hecht team. Bij ons geen formele setting maar het huiskamer gevoel.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="15" cy="7" r="3" />
        <path d="M3 20c0-4 2.7-6 6-6M21 20c0-4-2.7-6-6-6M9 14c1 0 2 .3 3 1 1-.7 2-1 3-1" />
      </svg>
    ),
  },
  {
    title: 'Jij bepaalt mee',
    text: 'Flexibele tijden in overleg. Vakantie ook in het hoogseizoen. Jij brengt het voorstel, wij regelen het.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

export default function Home() {
  const [vacatures, setVacatures] = useState<Vacature[]>([]);
  const [vacaturesLoading, setVacaturesLoading] = useState(true);
  const [cardStates, setCardStates] = useState<CardState[]>([]);
  const [isDocked, setIsDocked] = useState(false);
  const fullRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    supabase
      .from('vacatures')
      .select('id, title, uren_display, description, extended_description, image_url')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        const list = data || [];
        setVacatures(list);
        setCardStates(list.map(() => 'closed' as CardState));
        setVacaturesLoading(false);
      });
  }, []);

  const openIdx = cardStates.findIndex(s => s === 'open');

  useEffect(() => {
    if (openIdx === -1) { setIsDocked(false); return; }
    const el = fullRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsDocked(e.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [openIdx]);

  const setCard = (i: number, state: CardState) => {
    setCardStates(prev => prev.map((s, idx) => {
      if (idx !== i) return state !== 'closed' ? 'closed' : s;
      return state;
    }));
  };

  const closeCard = (i: number) => {
    setCard(i, 'closed');
    const el = cardRefs.current[i];
    if (!el) return;
    const headerHeight = window.innerWidth >= 768 ? 80 : 60;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefdf5' }}>
      <style>{`
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0px); box-shadow: 0 6px 16px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.3); }
          50%       { transform: translateY(-5px); box-shadow: 0 14px 28px rgba(0,0,0,0.55), 0 4px 10px rgba(0,0,0,0.3); }
        }
        .float-btn {
          animation: floatBtn 2.8s ease-in-out infinite;
          will-change: transform;
          border-radius: 50% !important;
          border: none !important;
          outline: none !important;
          cursor: pointer;
          padding: 0;
        }
        .float-btn:hover {
          animation: none;
          transform: translateY(-6px) scale(1.08);
          box-shadow: 0 16px 32px rgba(0,0,0,0.55) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        @keyframes bubbleBounce {
          0%   { transform: translateY(0px) rotate(-1deg); }
          30%  { transform: translateY(-10px) rotate(0.5deg); }
          55%  { transform: translateY(-6px) rotate(-0.4deg); }
          75%  { transform: translateY(-9px) rotate(0.3deg); }
          100% { transform: translateY(0px) rotate(-1deg); }
        }
        .cta-bubble-wrap {
          display: inline-block;
          position: relative;
          animation: bubbleBounce 2.6s ease-in-out infinite;
          will-change: transform;
          cursor: pointer;
        }
        .cta-bubble-wrap:hover {
          animation: none;
          transform: translateY(-4px) scale(1.04) rotate(0deg);
          transition: transform 0.18s ease;
        }
        #vacatures {
          scroll-margin-top: 60px;
        }
        @media (min-width: 768px) {
          #vacatures { scroll-margin-top: 80px; }
        }
      `}</style>
      <Header active="/" />
      <FloatingButtons hidden={isDocked} />

      {/* Hero — tekst boven video, geen wave in de flow */}
      <div style={{ backgroundColor: '#fefdf5', paddingBottom: 0, marginBottom: 0 }}>
        <div className="px-6 sm:px-10 md:px-20 lg:px-32 py-6 md:py-12">
          <h1 className="text-4xl md:text-7xl uppercase mb-4 md:mb-5"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, letterSpacing: '0.03em', color: '#3b696d', lineHeight: 1.05 }}>
            Werken bij<br />Kaap Noord
          </h1>
          <p className="text-base md:text-xl mb-6 md:mb-8"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', maxWidth: '38ch' }}>
            Kom je een dagje meelopen in ons team op het mooiste eiland?
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6" style={{ marginTop: '8px' }}>
            <div className="cta-bubble-wrap">
              <Link href="/contact" style={{ position: 'relative', display: 'inline-block', width: '290px', height: '110px', textDecoration: 'none' }}>
                <svg
                  aria-hidden="true"
                  width="290" height="110"
                  viewBox="0 0 390 200"
                  preserveAspectRatio="none"
                  style={{ display: 'block', filter: 'drop-shadow(0 8px 24px rgba(59,105,109,0.4))' }}>
                  <path d="M55 40 C45 42 40 50 42 62 C40 82 41 102 43 122 C45 138 55 145 72 143 C82 142 88 143 92 146 C92 160 90 172 88 182 C102 174 114 160 120 146 C122 143 128 142 138 142 C220 143 290 143 330 140 C354 136 365 126 364 112 C366 92 366 72 362 52 C358 38 344 30 320 30 C250 28 180 29 86 31 C70 32 60 34 55 40 Z" fill="#fcf8bd" />
                </svg>
                <span style={{
                  position: 'absolute',
                  top: '46px',
                  left: '52%',
                  transform: 'translate(-50%, -50%)',
                  color: '#3b696d',
                  fontFamily: "'Kodchasan', sans-serif",
                  fontWeight: 700,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}>
                  Ik wil meelopen →
                </span>
              </Link>
            </div>
            <Link href="/over-ons"
              className="px-6 py-2.5 md:px-8 md:py-3 font-bold text-sm uppercase tracking-widest transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#3b696d', color: '#fcf8bd', display: 'inline-block', marginTop: '4px' }}>
              Vertel me eerst meer
            </Link>
          </div>
        </div>
      </div>

      {/* Video — wave als cream overlay bovenop video, zodat hero naadloos overloopt */}
      <div style={{ position: 'relative', height: 'clamp(260px, 56vw, 560px)', overflow: 'hidden', lineHeight: 0 }}>
        {/* Cream golf overlay: visueel verbindt hero met video, gap structureel onmogelijk */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, lineHeight: 0, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }} preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,0 L1440,0 L1440,22 C1260,46 1080,56 900,42 C720,28 540,8 360,24 C180,40 90,52 0,38 Z" fill="#fefdf5"/>
          </svg>
        </div>
        <iframe
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
          src="https://player.vimeo.com/video/711355612?background=1&muted=1&autoplay=1&loop=1&dnt=1"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
      <DecorativeLine />

      {/* Intro quote */}
      <section className="py-16" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl leading-relaxed"
            style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
            Zie jij jezelf al werken op een unieke plek met een fantastisch uitzicht? Is het helemaal jouw ding om onze gasten naar hun zin te maken en ze het huiskamer gevoel te laten beleven?
          </p>
        </div>
      </section>

      {/* Functies — dynamisch uit Supabase */}
      <section id="vacatures" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-2 uppercase"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}>
            Ontdek alle functies
          </h2>
          <div className="flex justify-center mb-10">
            <svg className="w-32 h-2" viewBox="0 0 100 10" style={{ color: '#3b696d' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10"
                fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {vacaturesLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-2xl animate-pulse" style={{ backgroundColor: '#e8f4f4', height: '220px' }} />
              ))}
            </div>
          ) : vacatures.length === 0 ? (
            <p className="text-center py-8" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>
              Er zijn momenteel geen openstaande vacatures. Kijk binnenkort terug.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {vacatures.map((r, i) => {
                const state = cardStates[i];
                const isOpen = state === 'open';
                const tilt = i % 2 === 0 ? '-2deg' : '1.5deg';

                return (
                  <div
                    key={r.id}
                    ref={el => { cardRefs.current[i] = el; }}
                    className="rounded-2xl shadow-lg overflow-hidden"
                    style={{ backgroundColor: '#3b696d' }}
                  >
                    {/* POLAROID FOTO — altijd zichtbaar */}
                    {r.image_url && (
                      <div style={{ padding: '22px 22px 10px 22px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                          background: 'white',
                          padding: '8px 8px 26px 8px',
                          boxShadow: '0 10px 32px rgba(0,0,0,0.45), 0 3px 10px rgba(0,0,0,0.25)',
                          transform: `rotate(${tilt})`,
                          width: '85%',
                          maxWidth: '300px',
                        }}>
                          <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                            <img src={r.image_url} alt={r.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TITEL BAR — klikbaar */}
                    <button
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
                      onClick={() => setCard(i, isOpen ? 'closed' : 'open')}
                    >
                      <div className="flex-1 min-w-0">
                        <span className="block font-bold leading-snug mb-1"
                          style={{ color: '#ffffff', fontFamily: "'Kodchasan', sans-serif", fontSize: '17px' }}>
                          {r.title}
                        </span>
                        <span className="flex items-center gap-4 flex-wrap">
                          {r.uren_display && (
                            <span className="flex items-center gap-1" style={{ color: '#fcf8bd', fontSize: '13px', fontFamily: "'Kodchasan', sans-serif" }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {r.uren_display}
                            </span>
                          )}
                          <span className="flex items-center gap-1" style={{ color: '#fcf8bd', fontSize: '13px', fontFamily: "'Kodchasan', sans-serif" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            Texel
                          </span>
                        </span>
                      </div>
                      <svg
                        style={{ width: '20px', height: '20px', flexShrink: 0, stroke: '#fcf8bd', transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* UITKLAPBARE CONTENT */}
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ backgroundColor: '#2d5f63' }}>
                          <div className="px-5 pt-4 pb-4">
                            <RichText text={r.description || ''} color="#d4ecec" fontSize="14px" lineHeight="1.75" />
                            {r.extended_description && (
                              <>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '14px 0' }} />
                                <RichText text={r.extended_description} color="#d4ecec" fontSize="14px" lineHeight="1.75" />
                              </>
                            )}
                          </div>

                          {/* CONTACT BAR */}
                          <div
                            ref={i === openIdx ? fullRef : null}
                            className="flex items-center gap-3 px-5 py-4"
                            style={{ backgroundColor: '#fefdf5', borderTop: '2px solid #bdeffc' }}
                          >
                            <button
                              className="float-btn flex-shrink-0"
                              style={{ backgroundColor: '#3b696d', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              title="Bel ons"
                              onClick={e => { e.stopPropagation(); window.location.href = phoneLink; }}>
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                            </button>
                            <button
                              className="float-btn flex-shrink-0"
                              style={{ backgroundColor: '#25D366', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', animationDelay: '0.5s' }}
                              title="WhatsApp ons"
                              onClick={e => { e.stopPropagation(); window.open(whatsappLink, '_blank', 'noopener,noreferrer'); }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                <path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.687.435 3.272 1.197 4.653L2 22l5.998-1.172A9.45 9.45 0 0 0 11.5 21c5.238 0 9.5-4.262 9.5-9.5S16.738 2 11.5 2zm0 17.3a7.792 7.792 0 0 1-3.976-1.083l-.285-.169-2.955.577.6-2.883-.186-.295A7.793 7.793 0 0 1 3.7 11.5C3.7 7.198 7.198 3.7 11.5 3.7S19.3 7.198 19.3 11.5 15.802 19.3 11.5 19.3z"/>
                              </svg>
                            </button>
                            <span style={{ color: '#3b696d', fontSize: '13px', fontFamily: "'Kodchasan', sans-serif", lineHeight: '1.3', flex: 1 }}>
                              Reageer direct<br />op deze vacature
                            </span>
                            <button
                              className="flex-shrink-0 flex items-center justify-center transition-opacity hover:opacity-60"
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '8px' }}
                              onClick={e => { e.stopPropagation(); closeCard(i); }}>
                              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                                <path d="M18 15l-6-6-6 6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* USPs — zig-zag 2-kolom ipv 3-kolom grid */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f0fafe' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl text-center mb-12 uppercase"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}>
            Waarom Kaap Noord?
          </h2>
          <div className="flex flex-col gap-10">
            {usps.map((usp, i) => (
              <div key={i} className={`flex items-start gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
                  {usp.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>
                    {usp.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4b7c80' }}>
                    {usp.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/voor-jou"
              className="inline-block px-8 py-3 font-semibold text-sm uppercase tracking-wider transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#3b696d', color: '#ffffff' }}>
              Alle voordelen →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
