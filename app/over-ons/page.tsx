'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Link from 'next/link';
import { getContentByPage, getMediaByPage } from '@/lib/supabase';

const FALLBACK_PHOTOS = [
  'https://i0.wp.com/werkenbijkaapnoord.nl/wp-content/uploads/2026/02/IMG_5883-scaled.jpeg?w=800',
  'https://i0.wp.com/werkenbijkaapnoord.nl/wp-content/uploads/2024/02/kaapnoord-drone-04.jpg?w=800',
  'https://i0.wp.com/werkenbijkaapnoord.nl/wp-content/uploads/2026/02/IMG_5114-scaled.jpeg?w=800',
  'https://i0.wp.com/werkenbijkaapnoord.nl/wp-content/uploads/2024/02/3bef2712-9f74-439b-9969-a525c1b0373a.jpg?w=800',
  'https://i0.wp.com/werkenbijkaapnoord.nl/wp-content/uploads/2024/02/f46c845e-1d01-4c3d-9d8a-ac655179ef27.jpg?w=800',
  'https://i0.wp.com/werkenbijkaapnoord.nl/wp-content/uploads/2024/02/kaapnoord-26.jpg?w=800',
  'https://i0.wp.com/werkenbijkaapnoord.nl/wp-content/uploads/2024/02/kaapnoord-drone-01.jpg?w=800',
  'https://i0.wp.com/werkenbijkaapnoord.nl/wp-content/uploads/2024/02/Bediening-1.jpg?w=800',
  'https://i0.wp.com/werkenbijkaapnoord.nl/wp-content/uploads/2024/02/kaapnoord-02.jpg?w=800',
];

function PhotoSlider({ photos }: { photos: string[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent(i => (i + 1) % photos.length), [photos.length]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section style={{ backgroundColor: '#fefdf5' }}>
      <style>{`
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(59, 105, 109, 0.7);
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s ease, transform 0.2s ease;
          backdrop-filter: blur(4px);
        }
        @media (hover: hover) and (pointer: fine) {
          .slider-arrow:hover {
            background: rgba(59, 105, 109, 0.95);
            transform: translateY(-50%) scale(1.1);
          }
        }
        .slider-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
          padding: 0;
        }
      `}</style>

      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(220px, 56vw, 520px)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding strip */}
        <div
          style={{
            display: 'flex',
            width: `${photos.length * 100}%`,
            height: '100%',
            transform: `translateX(-${(current / photos.length) * 100}%)`,
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {photos.map((src, i) => (
            <div key={i} style={{ width: `${100 / photos.length}%`, flexShrink: 0, height: '100%' }}>
              <img
                src={src}
                alt={`Kaap Noord foto ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <button className="slider-arrow" style={{ left: '12px' }} onClick={prev} aria-label="Vorige foto">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Right arrow */}
        <button className="slider-arrow" style={{ right: '12px' }} onClick={next} aria-label="Volgende foto">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Counter badge */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(0,0,0,0.45)',
          color: 'white',
          fontSize: '11px',
          fontFamily: "'Kodchasan', sans-serif",
          padding: '3px 8px',
          borderRadius: '20px',
          backdropFilter: 'blur(4px)',
          letterSpacing: '0.05em',
        }}>
          {current + 1} / {photos.length}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '14px 0 6px' }}>
        {photos.map((_, i) => (
          <button
            key={i}
            className="slider-dot"
            onClick={() => setCurrent(i)}
            aria-label={`Foto ${i + 1}`}
            style={{
              background: i === current ? '#3b696d' : '#bdeffc',
              transform: i === current ? 'scale(1.35)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function OverOns() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<string[]>(FALLBACK_PHOTOS);

  useEffect(() => {
    getContentByPage('over-ons').then(c => { if (Object.keys(c).length > 0) setContent(c); });
    getMediaByPage('over-ons').then(items => { if (items.length > 0) setPhotos(items.map(m => m.url)); });
  }, []);

  const c = (key: string, fallback: string) => content[key] || fallback;

  return (
    <div className="min-h-screen bg-white">
      <Header active="/over-ons" />
      <FloatingButtons />

      {/* Hero */}
      <section className="py-20" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 md:px-16">
          <h1
            className="text-5xl md:text-6xl uppercase mb-6"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            {c('over_ons_h1', 'Over ons')}
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, maxWidth: '42ch' }}>
            Dit is Kaap Noord. Dit zijn wij. Dit zoeken we.
          </p>
        </div>
      </section>

      {/* Photo slider */}
      <PhotoSlider photos={photos} />

      {/* Verhaal */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl uppercase mb-4"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Over Strandpaviljoen Kaap Noord
          </h2>
          <svg className="w-32 h-2 mb-8" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
            <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#3b696d' }}>
            {c('over_ons_tekst_1', 'Bij ons staat "je thuis voelen" voor zowel gasten als voor jou, hoog op ons lijstje. Snelle ongedwongen service met een glimlach is waar wij voor staan. Bij ons geen formele setting maar juist het huiskamer gevoel waarin ook jij je prettig voelt.')}
          </p>
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#3b696d' }}>
            {c('over_ons_tekst_2', 'Een gezellig, gemotiveerd team met de nodige humor om er zo iedere dag weer een feestje van te maken. Soms is het flink aanpakken, maar altijd met een lach en altijd samen.')}
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#3b696d' }}>
            {c('over_ons_tekst_3', 'Kaap Noord is een familie, waarbij de ervaring die de medewerkers hebben minstens net zo belangrijk is als die van de gasten. Désirée en Mike vinden het belangrijk dat jij elke ochtend wakker wordt en zin hebt om aan de slag te gaan.')}
          </p>
        </div>
      </section>


      {/* Werken bij ons */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl uppercase mb-4"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Werken bij ons
          </h2>
          <svg className="w-32 h-2 mb-8" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
            <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="flex flex-col gap-10 mb-12">
            {[
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c0 4-3 6-6 7h12c-3-1-6-3-6-7z"/><path d="M2 20h20"/><path d="M7 20c1-3 3-4 5-4s4 1 5 4"/></svg>,
                title: 'Werken op een eiland',
                text: 'Werk op een van de mooiste plekken van Nederland. Texel is niet zomaar een locatie — het is een leefstijl.',
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/><path d="M3 20c0-4 2.7-6 6-6M21 20c0-4-2.7-6-6-6M9 14c1 0 2 .3 3 1 1-.7 2-1 3-1"/></svg>,
                title: "Collega's",
                text: "Fijne werksfeer in een hecht team. De sfeer tussen de collega's maakt van een heerlijk drukke dag ook voor jou een feestje.",
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
                title: 'Ontwikkeling',
                text: 'Er is altijd ruimte voor persoonlijke ontwikkeling binnen het vak. Ervaring is niet nodig — wij leren je alles.',
              },
            ].map((usp, i) => (
              <div key={i} className={`flex items-start gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
                  {usp.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif" }}>{usp.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#3b696d' }}>{usp.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
