'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import DecorativeLine from '@/components/DecorativeLine';
import Link from 'next/link';

const whatsappLink = "https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!";
const phoneLink = "tel:+31623823324";

type CardState = 'closed' | 'short' | 'full';

const vacatures = [
  {
    uren: '38 uur',
    title: 'Zelfstandig medewerker bediening',
    img: null as string | null,
    tekst: "Wil jij werken in een team waarbij gastvrijheid hoog in het vaandel staat? Samen met je collega's zorg je voor een enthousiaste, ongedwongen service die onze gasten doet terugkeren.",
    extendedTekst: null as string | null,
  },
  {
    uren: 'Jouw uren',
    title: 'Weekendhulpen en vakantiekrachten',
    img: null as string | null,
    tekst: "Op zoek naar een leuke bijbaan op Texel? Ervaring is niet nodig — wij leren je alles wat je moet weten! In overleg is vrijwel alles mogelijk bij ons.",
    extendedTekst: null as string | null,
  },
  {
    uren: '38 uur',
    title: 'Tussenjaars op Texel',
    img: null as string | null,
    tekst: "Zin in een avontuurlijk tussenjaar in een van de mooiste omgevingen van Nederland? Van bedienen tot koken — er is volop ruimte om te groeien.",
    extendedTekst: null as string | null,
  },
  {
    uren: '38 uur',
    title: 'Zelfstandig werkend kok',
    img: null as string | null,
    tekst: "Wil jij werken als kok waar de zee altijd dichtbij is? Een afwisselende functie met een nadruk op verse en lokale producten.",
    extendedTekst: null as string | null,
  },
  {
    uren: '38 uur',
    title: 'Chef de Partie',
    img: null as string | null,
    tekst: "Een dynamische functie als essentiële rol binnen ons keukenteam. Focus op verse en lokale producten, op een prachtig eiland.",
    extendedTekst: null as string | null,
  },
  {
    uren: 'In overleg',
    title: 'Open sollicitatie',
    img: null as string | null,
    tekst: "Staat jouw ideale baan er niet bij? We zijn altijd op zoek naar enthousiaste mensen met een positieve instelling.",
    extendedTekst: null as string | null,
  },
];

export default function Home() {
  const [cardStates, setCardStates] = useState<CardState[]>(vacatures.map(() => 'closed'));
  const [isDocked, setIsDocked] = useState(false);
  const fullRef = useRef<HTMLDivElement | null>(null);

  const fullIdx = cardStates.findIndex(s => s === 'full');

  useEffect(() => {
    if (fullIdx === -1) { setIsDocked(false); return; }
    const el = fullRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsDocked(e.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [fullIdx]);

  const setCard = (i: number, state: CardState) => {
    setCardStates(prev => prev.map((s, idx) => {
      if (idx !== i) return state !== 'closed' ? 'closed' : s;
      return state;
    }));
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
        }
        .float-btn:hover {
          animation: none;
          transform: translateY(-6px) scale(1.08);
          box-shadow: 0 16px 32px rgba(0,0,0,0.55) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        @keyframes ctaGlow {
          0%, 100% {
            transform: translateY(0px);
            box-shadow: 0 4px 14px rgba(59,105,109,0.45), 0 0 0px 0px rgba(252,248,189,0);
          }
          50% {
            transform: translateY(-5px);
            box-shadow: 0 12px 28px rgba(59,105,109,0.55), 0 0 18px 5px rgba(252,248,189,0.35);
          }
        }
        .cta-glow {
          animation: ctaGlow 2.2s ease-in-out infinite;
          will-change: transform;
        }
        .cta-glow:hover {
          animation: none;
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 14px 34px rgba(59,105,109,0.6), 0 0 24px 8px rgba(252,248,189,0.45) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>
      <Header active="/" />
      <FloatingButtons hidden={isDocked} />

      {/* Hero */}
      <section className="relative" style={{ backgroundColor: '#fefdf5' }}>
        {/* Tekst + knoppen */}
        <div className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-12">
          <h1 className="text-5xl md:text-7xl uppercase mb-4"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, letterSpacing: '0.03em', color: '#3b696d' }}>
            Werken bij Kaap Noord
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d' }}>
            Kom je een dagje meelopen in ons team op het mooiste eiland?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact"
              className="cta-glow px-8 py-3 font-bold text-sm uppercase tracking-widest"
              style={{ backgroundColor: '#3b696d', color: '#fcf8bd', display: 'inline-block' }}>
              Ik wil meelopen →
            </Link>
            <Link href="/over-ons"
              className="px-8 py-3 font-bold text-sm uppercase tracking-widest border-2 transition-opacity hover:opacity-80"
              style={{ borderColor: '#3b696d', color: '#3b696d' }}>
              Vertel me meer
            </Link>
          </div>
        </div>
        {/* Video eronder */}
        <div className="w-full overflow-hidden" style={{ height: '55vh' }}>
          <iframe
            className="w-full h-full"
            src="https://player.vimeo.com/video/711355612?background=1&muted=1&autoplay=1&loop=1&dnt=1"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
        <DecorativeLine />
      </section>

      {/* Intro quote */}
      <section className="py-16" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl leading-relaxed"
            style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
            Zie jij jezelf al werken op een unieke plek met een fantastisch uitzicht? Is het helemaal jouw ding om onze gasten naar hun zin te maken en ze het huiskamer gevoel te laten beleven?
          </p>
        </div>
      </section>

      {/* Functies */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-2 uppercase"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}>
            Ontdek alle functies
          </h2>
          <div className="flex justify-center mb-10">
            <svg className="w-32 h-2" viewBox="0 0 100 10" style={{ color: '#3b696d' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10"
                fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {vacatures.map((r, i) => {
              const state = cardStates[i];
              const isOpen = state !== 'closed';
              const isFull = state === 'full';

              return (
                <div
                  key={i}
                  ref={isFull ? fullRef : null}
                  className="rounded-xl overflow-hidden shadow-md"
                  style={{ borderLeft: '4px solid #fcf8bd' }}
                >
                  {/* ── BAR ── */}
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    style={{ backgroundColor: '#3b696d' }}
                    onClick={() => setCard(i, isOpen ? 'closed' : 'short')}
                  >
                    <div className="flex-1 min-w-0">
                      <span
                        className="block font-bold leading-snug mb-1"
                        style={{
                          color: '#ffffff',
                          fontFamily: "'Kodchasan', sans-serif",
                          fontSize: '17px',
                        }}
                      >
                        {r.title}
                      </span>
                      <span className="flex items-center gap-4 flex-wrap">
                        <span style={{ color: '#fcf8bd', fontSize: '13px', fontFamily: "'Kodchasan', sans-serif" }}>
                          ⏱ {r.uren}
                        </span>
                        <span style={{ color: '#fcf8bd', fontSize: '13px', fontFamily: "'Kodchasan', sans-serif" }}>
                          📍 Texel
                        </span>
                      </span>
                    </div>
                    <svg
                      style={{
                        width: '20px', height: '20px', flexShrink: 0,
                        stroke: '#fcf8bd', transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                      fill="none" strokeWidth="2.5" viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* ── UITKLAPBAAR GEDEELTE ── */}
                  <div style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s ease',
                  }}>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ backgroundColor: '#2d5f63' }}>

                        {/* Foto placeholder — wordt later ingevuld via admin */}
                        {r.img && (
                          <div style={{ width: '100%', aspectRatio: '16/7', overflow: 'hidden' }}>
                            <img
                              src={r.img}
                              alt={r.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                          </div>
                        )}

                        {/* Korte tekst */}
                        <div className="px-5 pt-5 pb-3">
                          <p style={{
                            color: '#d4ecec',
                            fontSize: '14px',
                            lineHeight: '1.7',
                            fontFamily: "'Kodchasan', sans-serif",
                          }}>
                            {r.tekst}
                          </p>
                        </div>

                        {/* Tweede uitklap trigger — alleen zichtbaar in 'short' state */}
                        <div style={{
                          display: 'grid',
                          gridTemplateRows: !isFull ? '1fr' : '0fr',
                          transition: 'grid-template-rows 0.2s ease',
                        }}>
                          <div style={{ overflow: 'hidden' }}>
                            <div className="px-5 pb-4 flex justify-end">
                              <button
                                onClick={(e) => { e.stopPropagation(); setCard(i, 'full'); }}
                                className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-75"
                                style={{ color: '#fcf8bd', fontFamily: "'Kodchasan', sans-serif" }}
                              >
                                Volledige vacature
                                <svg style={{ width: '16px', height: '16px', stroke: '#fcf8bd' }}
                                  fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Uitgebreide tekst — alleen in 'full' state */}
                        <div style={{
                          display: 'grid',
                          gridTemplateRows: isFull ? '1fr' : '0fr',
                          transition: 'grid-template-rows 0.35s ease',
                        }}>
                          <div style={{ overflow: 'hidden' }}>
                            <div className="px-5 pt-1 pb-6">

                              {/* Divider */}
                              <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', marginBottom: '16px' }} />

                              {r.extendedTekst ? (
                                <div
                                  style={{ color: '#d4ecec', fontSize: '14px', lineHeight: '1.75', fontFamily: "'Kodchasan', sans-serif" }}
                                  dangerouslySetInnerHTML={{ __html: r.extendedTekst }}
                                />
                              ) : (
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontStyle: 'italic', fontFamily: "'Kodchasan', sans-serif" }}>
                                  Uitgebreide informatie volgt binnenkort.
                                </p>
                              )}

                              {/* Gedockte contact-knoppen */}
                              <div className="flex items-center gap-3 flex-wrap mt-5">
                                <a
                                  href={phoneLink}
                                  className="float-btn flex-shrink-0"
                                  style={{ backgroundColor: '#3b696d', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  title="Bel ons"
                                  onClick={e => e.stopPropagation()}
                                >
                                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                </a>
                                <a
                                  href={whatsappLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="float-btn flex-shrink-0"
                                  style={{ backgroundColor: '#25D366', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', animationDelay: '0.5s' }}
                                  title="WhatsApp ons"
                                  onClick={e => e.stopPropagation()}
                                >
                                  💬
                                </a>
                                <span style={{ color: '#bdeffc', fontSize: '13px', fontFamily: "'Kodchasan', sans-serif", lineHeight: '1.3' }}>
                                  Reageer direct<br />op deze vacature
                                </span>
                                <button
                                  className="ml-auto flex items-center gap-1 text-sm transition-opacity hover:opacity-75"
                                  style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Kodchasan', sans-serif" }}
                                  onClick={() => setCard(i, 'closed')}
                                >
                                  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                  </svg>
                                  Sluiten
                                </button>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/rollen"
              className="inline-block px-8 py-3 font-semibold border-2 text-sm uppercase tracking-wider transition-colors hover:text-white hover:bg-[#3b696d]"
              style={{ borderColor: '#3b696d', color: '#3b696d' }}>
              Alle functies bekijken →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row overflow-hidden rounded-xl shadow-md"
            style={{ backgroundColor: '#bdeffc' }}>
            <div className="flex-1 p-8 md:p-10 flex items-center">
              <div>
                <span className="text-5xl font-bold mb-4 block"
                  style={{ color: '#3b696d', fontFamily: 'Georgia, serif' }}>"</span>
                <p className="text-lg md:text-xl font-semibold uppercase"
                  style={{ color: '#3b696d', fontFamily: "'Pana Summer', serif", letterSpacing: '0.02em' }}>
                  Van Bonaire naar Texel. Wie had dat gedacht! Een wereld van verschil, maar ik werk al een jaar met veel plezier bij Kaap Noord!
                </p>
              </div>
            </div>
            <div className="w-full md:w-64 flex-shrink-0 h-56 md:h-auto overflow-hidden">
              <img src="/assets/IMG_7115.jpg" alt="Medewerker Kaap Noord"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Quick USPs */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f0fafe' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl text-center mb-10 uppercase"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}>
            Waarom Kaap Noord?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏝️', title: 'Werken op een eiland', text: 'Werk op een van de mooiste plekken van Nederland. Zilt water, zonsondergangen en natuur om je heen.' },
              { icon: '👥', title: 'Echt team', text: 'Fijne werksfeer in een hecht team. Bij ons geen formele setting maar het huiskamer gevoel.' },
              { icon: '🎯', title: 'Jij bepaalt mee', text: 'Flexibele tijden in overleg. Vakantie ook in het hoogseizoen. Jij brengt het voorstel, wij regelen het.' },
            ].map((usp, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3">{usp.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#3b696d' }}>{usp.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{usp.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/voor-jou"
              className="inline-block px-8 py-3 font-semibold text-sm uppercase tracking-wider transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#3b696d', color: '#ffffff' }}>
              Alle voordelen →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#3b696d' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl uppercase mb-4"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#ffffff' }}>
            Kom je kennismaken?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#bdeffc' }}>
            Geen lange sollicitatie. Geen gekke tests. Gewoon een gesprek of een dagje meelopen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="px-8 py-3 font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366', color: '#ffffff' }}>
              💬 WhatsApp Marije
            </a>
            <Link href="/contact"
              className="px-8 py-3 font-bold text-sm uppercase tracking-wider border-2 border-white transition-opacity hover:opacity-80"
              style={{ color: '#ffffff' }}>
              Of stuur een bericht
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
