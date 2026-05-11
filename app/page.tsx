'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import RichText from '@/components/RichText';

const whatsappLink = "https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!";
const phoneLink = "tel:+31623823324";

type CardState = 'closed' | 'preview' | 'open';

interface Vacature {
  id: string;
  title: string;
  subtitle: string | null;
  uren_display: string | null;
  salary_display: string | null;
  description: string | null;
  extended_description: string | null;
  image_url: string | null;
}

const FALLBACK_USPS = [
  { title: 'Werken op een eiland', text: 'Werk op een van de mooiste plekken van Nederland. Zilt water, zonsondergangen en natuur om je heen.' },
  { title: 'Echt team', text: 'Fijne werksfeer in een hecht team. Bij ons geen formele setting maar het huiskamer gevoel.' },
  { title: 'Jij bepaalt mee', text: 'Flexibele tijden in overleg. Vakantie ook in het hoogseizoen. Jij brengt het voorstel, wij regelen het.' },
];

export default function Home() {
  const [vacatures, setVacatures] = useState<Vacature[]>([]);
  const [vacaturesLoading, setVacaturesLoading] = useState(true);
  const [cardStates, setCardStates] = useState<CardState[]>([]);
  const [isDocked, setIsDocked] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [siteContent, setSiteContent] = useState<Record<string, string>>({});
  const [uspContent, setUspContent] = useState<Record<string, string>>({});
  const [uspExpanded, setUspExpanded] = useState(false);
  const dockedSet = useRef(new Set<number>());
  const contactBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from('site_content')
        .select('key, value')
        .in('key', ['hero_title', 'hero_subtitle', 'urgency_starburst', 'urgency_sticky', 'hero_cta_balloon', 'home_intro_text']);
      if (data) {
        const map: Record<string, string> = {};
        data.forEach(item => { map[item.key] = item.value; });
        setSiteContent(map);
      }
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from('site_content')
        .select('key, value')
        .eq('page', 'home')
        .like('key', 'home_usp_%');
      if (data && data.length > 0) {
        const map: Record<string, string> = {};
        data.forEach(item => { map[item.key] = item.value; });
        setUspContent(map);
      }
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await supabase
          .from('vacatures')
          .select('id, title, subtitle, uren_display, salary_display, description, extended_description, image_url')
          .eq('published', true)
          .order('created_at', { ascending: false });
        const list = data || [];
        setVacatures(list);
        setCardStates(list.map(() => 'closed' as CardState));
        setVacaturesLoading(false);
        if (window.location.hash === '#vacatures') {
          setTimeout(() => {
            document.getElementById('vacatures')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } catch {
        setVacaturesLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const observers = new Map<number, IntersectionObserver>();
    cardStates.forEach((state, i) => {
      if (state === 'closed') {
        if (dockedSet.current.delete(i)) setIsDocked(dockedSet.current.size > 0);
        return;
      }
      const el = contactBarRefs.current[i];
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) dockedSet.current.add(i);
        else dockedSet.current.delete(i);
        setIsDocked(dockedSet.current.size > 0);
      }, { threshold: 0.3 });
      obs.observe(el);
      observers.set(i, obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [cardStates]);

  const setCard = (i: number, state: CardState) => {
    setCardStates(prev => prev.map((s, idx) => idx === i ? state : s));
  };

  const closeCard = (i: number) => {
    setCard(i, 'closed');
    const el = cardRefs.current[i];
    if (!el) return;
    const headerHeight = window.innerWidth >= 768 ? 64 : 48;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleCardClick = (i: number) => {
    setCard(i, cardStates[i] === 'closed' ? 'preview' : 'closed');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefdf5' }}>
      <style>{`
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        .float-btn {
          animation: floatBtn 2.8s ease-in-out infinite;
          will-change: transform;
          border-radius: 50% !important;
          border: none !important;
          outline: none !important;
          cursor: pointer;
          padding: 0;
          box-shadow: 0 8px 20px rgba(0,0,0,0.38);
        }
        @media (hover: hover) and (pointer: fine) {
          .float-btn:hover {
            animation: none;
            transform: translateY(-6px) scale(1.08);
            box-shadow: 0 16px 32px rgba(0,0,0,0.55) !important;
            transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.18s ease-out;
          }
        }
        .float-btn:active {
          animation: none !important;
          transform: scale(0.95) !important;
          transition: transform 100ms ease-out !important;
        }
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 4px 10px rgba(15,167,210,0.35)) drop-shadow(0 0 4px rgba(15,167,210,0.15)); }
          50%       { filter: drop-shadow(0 12px 36px rgba(15,167,210,0.95)) drop-shadow(0 4px 16px rgba(15,167,210,0.65)) drop-shadow(0 0 52px rgba(15,167,210,0.4)); }
        }
        .cta-bubble-wrap {
          display: inline-block;
          position: relative;
          animation: bubbleFloat 3s ease-in-out infinite;
          will-change: transform;
          cursor: pointer;
        }
        .cta-glow {
          display: block;
          animation: glowPulse 3s ease-in-out infinite;
        }
        @media (hover: hover) and (pointer: fine) {
          .cta-bubble-wrap:hover {
            animation: none;
            transform: translateY(-4px) scale(1.03);
            transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .cta-bubble-wrap:hover .cta-glow {
            animation: none;
            filter: drop-shadow(0 14px 40px rgba(15,167,210,0.98)) drop-shadow(0 4px 18px rgba(15,167,210,0.7)) drop-shadow(0 0 60px rgba(15,167,210,0.45));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-glow { animation: none; filter: drop-shadow(0 8px 20px rgba(15,167,210,0.6)); }
        }
        @keyframes starWobble {
          0%, 100% { transform: rotate(-12deg) scale(1); }
          40%       { transform: rotate(-9deg) scale(1.07); }
          70%       { transform: rotate(-15deg) scale(0.97); }
        }
        .urgency-starburst-wrap {
          position: absolute;
          top: -26px;
          right: -26px;
          width: 84px;
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          animation: starWobble 2.8s ease-in-out infinite;
          transform: rotate(-12deg);
          pointer-events: none;
        }
        .urgency-starburst-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 3px 8px rgba(251,100,20,0.4));
        }
        .urgency-starburst-text {
          position: relative;
          z-index: 1;
          color: #fff;
          font-size: 9.5px;
          font-weight: 800;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.25;
          max-width: 50px;
          font-family: 'Kodchasan', sans-serif;
        }
        @keyframes stickySwing {
          0%, 100% { transform: rotate(7deg); }
          50%       { transform: rotate(4deg); }
        }
        .urgency-sticky-wrap {
          position: absolute;
          bottom: -18px;
          left: 10px;
          z-index: 10;
          pointer-events: none;
          animation: stickySwing 3.5s ease-in-out infinite;
          transform: rotate(7deg);
          transform-origin: top right;
        }
        .urgency-sticky {
          background: #fcf8bd;
          border-top: 4px solid #fb923c;
          border-radius: 2px;
          padding: 6px 12px 7px 10px;
          font-size: 12px;
          font-weight: 700;
          color: #3b696d;
          font-family: 'Kodchasan', sans-serif;
          box-shadow: 2px 4px 10px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.08);
          white-space: nowrap;
          line-height: 1.3;
          letter-spacing: 0.01em;
        }
        #vacatures {
          scroll-margin-top: 48px;
        }
        @media (min-width: 768px) {
          #vacatures { scroll-margin-top: 64px; }
        }
        .video-placeholder {
          position: absolute;
          inset: 0;
          background: #1a2e30 url('/personeel.jpg') center/cover no-repeat;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.9s ease;
        }
        .video-placeholder.loaded { opacity: 0; pointer-events: none; }
        @keyframes vpSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .vp-spinner {
          width: 64px;
          height: 64px;
          animation: vpSpin 1.6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .float-btn, .cta-bubble-wrap { animation: none; }
          .vp-spinner { animation: none; }
        }
      `}</style>
      <Header active="/" />
      <FloatingButtons hidden={isDocked} />

      {/* Hero — tekst boven video, geen wave in de flow */}
      <div style={{ backgroundColor: '#fefdf5', paddingBottom: 0, marginBottom: 0 }}>
        <div className="px-6 sm:px-10 md:px-20 lg:px-32 pt-6 pb-3 md:pt-12 md:pb-6">
          <h1 className="text-4xl md:text-7xl uppercase mb-4 md:mb-5"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, letterSpacing: '0.03em', color: '#3b696d', lineHeight: 1.05 }}>
            {(siteContent['hero_title'] || 'Werken bij\nKaap Noord')
              .split(/\\n|\n/)
              .map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
          </h1>
          <p className="mb-6 md:mb-8"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 400, fontSize: '16px', color: '#3b696d', lineHeight: '1.6', maxWidth: '38ch' }}>
            {siteContent['hero_subtitle'] || 'Kom je een dagje meelopen in ons team op het mooiste eiland?'}
          </p>
          <div className="flex flex-col items-start gap-2" style={{ marginTop: '0' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {siteContent['urgency_starburst'] && (
                <div className="urgency-starburst-wrap" aria-hidden="true">
                  <svg viewBox="0 0 100 100" className="urgency-starburst-svg">
                    <polygon fill="#fb923c" points="50,0 59,16 75,7 75,25 93,25 84,41 100,50 84,59 93,75 75,75 75,93 59,84 50,100 41,84 25,93 25,75 7,75 16,59 0,50 16,41 7,25 25,25 25,7 41,16" />
                  </svg>
                  <span className="urgency-starburst-text">{siteContent['urgency_starburst']}</span>
                </div>
              )}
              {siteContent['urgency_sticky'] && (
                <div className="urgency-sticky-wrap" aria-hidden="true">
                  <div className="urgency-sticky">{siteContent['urgency_sticky']}</div>
                </div>
              )}
            <div className="cta-bubble-wrap">
              <Link href="/contact" style={{ position: 'relative', display: 'inline-block', width: 'min(330px, 90vw)', height: '130px', textDecoration: 'none' }}>
                <svg
                  aria-hidden="true"
                  className="cta-glow"
                  width="100%" height="130"
                  viewBox="0 0 390 200"
                  preserveAspectRatio="none">
                  <path d="M55 40 C45 42 40 50 42 62 C40 82 41 102 43 122 C45 138 55 145 72 143 C82 142 88 143 92 146 C92 160 90 172 88 182 C102 174 114 160 120 146 C122 143 128 142 138 142 C220 143 290 143 330 140 C354 136 365 126 364 112 C366 92 366 72 362 52 C358 38 344 30 320 30 C250 28 180 29 86 31 C70 32 60 34 55 40 Z" fill="none" stroke="#3b696d" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{
                  position: 'absolute',
                  top: '18px',
                  left: 0,
                  right: 0,
                  bottom: '37px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b696d',
                  fontFamily: "'Pana Summer', serif",
                  fontWeight: 700,
                  fontSize: '26px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}>
                  {siteContent['hero_cta_balloon'] || 'Ik wil meelopen →'}
                </span>
              </Link>
            </div>
            </div>
            <Link href="/over-ons"
              className="font-bold text-sm uppercase tracking-widest border-2 transition-opacity hover:opacity-80"
              style={{ borderColor: '#3b696d', color: '#3b696d', display: 'inline-block', padding: '10px 24px' }}>
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
          onLoad={() => setVideoLoaded(true)}
        />
        {/* Placeholder — zichtbaar tot iframe geladen is */}
        <div className={`video-placeholder${videoLoaded ? ' loaded' : ''}`} aria-hidden="true">
          <svg className="vp-spinner" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="26" stroke="#3b696d" strokeWidth="3" strokeLinecap="round" strokeDasharray="122 41" />
          </svg>
        </div>
      </div>
      {/* Intro tekst — klein als leeg, vol als gevuld */}
      <section style={{ backgroundColor: '#bdeffc', padding: siteContent['home_intro_text'] ? '4rem 0' : '14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: siteContent['home_intro_text'] ? '32px' : '0' }}>
          <svg width="320" height="28" viewBox="0 0 320 28" fill="none" aria-hidden="true">
            <path d="M0,14 C26,4 53,24 80,14 C107,4 134,24 160,14 C186,4 213,24 240,14 C267,4 294,24 320,14" stroke="#3b696d" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M40,20 C54,13 67,22 80,20 C93,18 106,14 120,20 C134,26 147,18 160,20 C173,22 186,15 200,20 C214,25 227,18 240,20" stroke="#3b696d" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
          </svg>
        </div>
        {siteContent['home_intro_text'] && (
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xl md:text-2xl leading-relaxed"
              style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
              {siteContent['home_intro_text']}
            </p>
          </div>
        )}
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
                const isClosed = state === 'closed';
                const isPreview = state === 'preview';
                const isOpen = state === 'open';
                const isExpanded = !isClosed;
                const hasExtended = !!r.extended_description;
                const tilt = i % 2 === 0 ? '-2deg' : '1.5deg';

                return (
                  <div
                    key={r.id}
                    ref={el => { cardRefs.current[i] = el; }}
                    className="rounded-2xl shadow-lg overflow-hidden"
                    style={{
                      backgroundColor: isExpanded ? '#ffffff' : '#3b696d',
                      transition: 'background-color 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
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

                    {/* TITEL BAR — klikbaar: closed→preview, preview/open→closed */}
                    <button
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
                      onClick={() => handleCardClick(i)}
                      aria-expanded={isExpanded}
                      aria-controls={`vacature-content-${r.id}`}
                    >
                      <div className="flex-1 min-w-0">
                        <span className="block font-bold leading-snug"
                          style={{
                            color: isExpanded ? '#3b696d' : '#ffffff',
                            fontFamily: "'Kodchasan', sans-serif",
                            fontSize: '17px',
                            transition: 'color 0.3s ease',
                          }}>
                          {r.title}
                        </span>
                        {r.subtitle && (
                          <span className="block"
                            style={{
                              color: isExpanded ? '#5a8a8e' : 'rgba(255,255,255,0.65)',
                              fontFamily: "'Kodchasan', sans-serif",
                              fontSize: '13px',
                              fontWeight: 400,
                              marginBottom: '4px',
                              transition: 'color 0.3s ease',
                            }}>
                            {r.subtitle}
                          </span>
                        )}
                        <span className="flex items-center gap-4 flex-wrap">
                          {r.uren_display && (
                            <span className="flex items-center gap-1" style={{
                              color: isExpanded ? '#5a8a8e' : '#fcf8bd',
                              fontSize: '13px',
                              fontFamily: "'Kodchasan', sans-serif",
                              transition: 'color 0.3s ease',
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {r.uren_display}
                            </span>
                          )}
                          {r.salary_display && (
                            <span className="flex items-center gap-1" style={{
                              color: isExpanded ? '#5a8a8e' : '#fcf8bd',
                              fontSize: '13px',
                              fontFamily: "'Kodchasan', sans-serif",
                              transition: 'color 0.3s ease',
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                              {r.salary_display}
                            </span>
                          )}
                          <span className="flex items-center gap-1" style={{
                            color: isExpanded ? '#5a8a8e' : '#fcf8bd',
                            fontSize: '13px',
                            fontFamily: "'Kodchasan', sans-serif",
                            transition: 'color 0.3s ease',
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            Texel
                          </span>
                        </span>
                      </div>
                      <svg
                        style={{
                          width: '20px', height: '20px', flexShrink: 0,
                          stroke: isExpanded ? '#3b696d' : '#fcf8bd',
                          transition: 'transform 0.3s ease, stroke 0.3s ease',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                        fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* UITKLAPBARE CONTENT */}
                    <div id={`vacature-content-${r.id}`} style={{ display: 'grid', gridTemplateRows: isExpanded ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{
                          backgroundColor: isExpanded ? '#f8fafa' : '#2d5f63',
                          transition: 'background-color 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                        }}>
                          <div className="px-5 pt-4 pb-2">
                            {/* Korte omschrijving — alleen zichtbaar in preview staat */}
                            <div style={{ display: 'grid', gridTemplateRows: isPreview ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                              <div style={{ overflow: 'hidden' }}>
                                <RichText text={r.description || ''} color='#3b696d' fontSize="14px" lineHeight="1.75" />
                              </div>
                            </div>

                            {/* Uitgebreide omschrijving — alleen zichtbaar in open staat */}
                            {hasExtended && (
                              <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                                <div style={{ overflow: 'hidden' }}>
                                  <RichText text={r.extended_description!} color="#3b696d" fontSize="14px" lineHeight="1.75" />
                                </div>
                              </div>
                            )}

                            {/* "Lees meer" knop — zichtbaar in preview wanneer extended bestaat */}
                            {hasExtended && (
                              <div style={{ display: 'grid', gridTemplateRows: isPreview ? '1fr' : '0fr', transition: 'grid-template-rows 0.25s ease' }}>
                                <div style={{ overflow: 'hidden' }}>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setCard(i, 'open'); }}
                                    style={{
                                      background: 'none', border: 'none', cursor: 'pointer',
                                      color: '#3b696d', fontFamily: "'Kodchasan', sans-serif",
                                      fontSize: '13px', fontWeight: 600,
                                      padding: '12px 0 4px',
                                      display: 'flex', alignItems: 'center', gap: '5px',
                                    }}
                                  >
                                    Lees de volledige vacaturetekst
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                      <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* CONTACT BAR */}
                          <div
                            ref={el => { contactBarRefs.current[i] = el; }}
                            className="flex items-center gap-3 px-5 py-4"
                            style={{
                              backgroundColor: isExpanded ? '#f8fafa' : '#fefdf5',
                              borderTop: isExpanded ? '1px solid rgba(59,105,109,0.15)' : '2px solid #bdeffc',
                            }}
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

      {/* Waarom Kaap Noord — dynamisch via CMS */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f0fafe' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-2 uppercase"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}>
            Waarom Kaap Noord?
          </h2>
          <div className="flex justify-center mb-10">
            <svg className="w-32 h-2" viewBox="0 0 100 10" style={{ color: '#3b696d' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10"
                fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          {(() => {
            const dynamic = Object.keys(uspContent)
              .filter(k => /^home_usp_\d+_titel$/.test(k) && uspContent[k])
              .map(k => parseInt(k.match(/(\d+)/)![1]))
              .sort((a, b) => a - b)
              .map(num => ({ title: uspContent[`home_usp_${num}_titel`], text: uspContent[`home_usp_${num}_tekst`] || '' }));
            const items = dynamic.length > 0 ? dynamic : FALLBACK_USPS;
            const visible = items.slice(0, 4);
            const extra = items.slice(4);
            const UspItem = ({ usp, i }: { usp: { title: string; text: string }; i: number }) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-base mb-1" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>{usp.title}</p>
                  {usp.text && (
                    <p className="text-sm leading-relaxed" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>{usp.text}</p>
                  )}
                </div>
              </div>
            );
            return (
              <>
                <div className="flex flex-col gap-6 mb-6">
                  {visible.map((usp, i) => <UspItem key={i} usp={usp} i={i} />)}
                </div>
                {extra.length > 0 && (
                  <>
                    <div style={{ display: 'grid', gridTemplateRows: uspExpanded ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s cubic-bezier(0.23, 1, 0.32, 1)' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div className="flex flex-col gap-6 mb-6">
                          {extra.map((usp, i) => <UspItem key={i + 4} usp={usp} i={i + 4} />)}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => setUspExpanded(v => !v)}
                        className="text-sm font-semibold"
                        style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {uspExpanded ? 'Minder tonen' : `Nog ${extra.length} voordeel${extra.length > 1 ? 'en' : ''}`}
                        <svg fill="none" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor"
                          style={{ width: '16px', height: '16px', transition: 'transform 0.3s ease', transform: uspExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </>
            );
          })()}
        </div>
      </section>

      <Footer />
    </div>
  );
}
