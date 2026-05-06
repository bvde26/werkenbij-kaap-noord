'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Link from 'next/link';

const rollen = [
  {
    id: 'bediening',
    icon: '🍽️',
    title: 'Zelfstandig medewerker bediening',
    uren: '38 uur/week',
    summary: 'Gastvrijheid hoog in het vaandel. De enthousiaste service die onze gasten doet terugkeren.',
    description: 'Wil jij werken in een team waarbij gastvrijheid hoog in het vaandel staat? Sluit je aan als zelfstandig medewerker bediening bij Strandpaviljoen Kaap Noord op Texel! Samen met je collega\'s zorg je voor een enthousiaste, ongedwongen service die onze gasten doet terugkeren.',
    image: '/assets/IMG_7031.jpg',
  },
  {
    id: 'weekend',
    icon: '🌞',
    title: 'Weekendhulpen en vakantiekrachten',
    uren: 'Jouw uren',
    summary: 'Op zoek naar een leuke bijbaan of vakantiebaan op Texel? Ervaring is niet nodig.',
    description: 'Op zoek naar een leuke bijbaan op Texel? Bij Strandpaviljoen Kaap Noord zoeken we enthousiaste collega\'s voor de afwas, bediening en keuken. Het is bij ons mogelijk om verschillende taken te combineren. Ervaring is niet nodig — wij leren je alles wat je moet weten! Werken in de weekenden of in de vakanties: in overleg is vrijwel alles mogelijk bij ons.',
    image: '/assets/IMG_7115.jpg',
  },
  {
    id: 'tussenjaar',
    icon: '📚',
    title: 'Tussenjaars op Texel',
    uren: '38 uur/week',
    summary: 'Een avontuurlijk tussenjaar in een van de mooiste omgevingen van Nederland.',
    description: 'Zin in een avontuurlijk tussenjaar in een van de mooiste omgevingen van Nederland? Bij Strandpaviljoen Kaap Noord op Texel bieden we jou die kans! Ervaring in de horeca is geen vereiste — we leren je alles wat je moet weten. Bij ons kun je diverse taken uitproberen: van bedienen tot koken en alles daartussen. Er is volop ruimte om te groeien en jezelf te ontwikkelen.',
    image: '/assets/Tussenjaar-horeca-op-Texel.jpg',
  },
  {
    id: 'kok',
    icon: '👨‍🍳',
    title: 'Zelfstandig werkend kok',
    uren: '38 uur/week',
    summary: 'Koken waar de zee altijd dichtbij is. Verse en lokale producten, prachtig eiland.',
    description: 'Wil jij werken als kok in een omgeving waar de zee altijd dichtbij is? Bij Strandpaviljoen Kaap Noord bieden we een afwisselende functie waarin je samen met ons keukenteam de heerlijkste gerechten bereidt, met een nadruk op verse en lokale producten. Onze uitgebreide menukaart biedt voor ieder wat wils — in deze rol ervaar je het unieke leven en werken op een prachtig eiland.',
    image: '/assets/Sous-chef-kaap-noord-small-image.jpg',
  },
  {
    id: 'chef',
    icon: '⭐',
    title: 'Chef de Partie',
    uren: '38 uur/week',
    summary: 'Essentiële rol in ons keukenteam. Focus op kwaliteit, verse producten en eiland-leven.',
    description: 'Wil jij werken als Chef de Partie in een omgeving waar de zee altijd dichtbij is? Bij Strandpaviljoen Kaap Noord bieden we een dynamische functie waarin je een essentiële rol speelt binnen ons keukenteam. Je bereidt heerlijke gerechten met een focus op verse en lokale producten. In deze rol ervaar je het unieke leven en werken op een prachtig eiland, omgeven door de adembenemende natuur van Texel.',
    image: '/assets/Sous-chef-kaap-noord-small-image.jpg',
  },
  {
    id: 'open',
    icon: '❓',
    title: 'Open sollicitatie',
    uren: 'In overleg',
    summary: 'Staat jouw ideale functie er niet bij? We zijn altijd op zoek naar enthousiaste mensen.',
    description: 'Heb jij een passie voor de horeca en wil je deel uitmaken van het dynamische team van Strandpaviljoen Kaap Noord? Wij staan open voor talent dat ons team kan versterken, zelfs als momenteel jouw ideale baan er niet tussen staat! We zijn altijd op zoek naar enthousiaste en gemotiveerde mensen die met hun vaardigheden en positieve instelling kunnen bijdragen. Of je nu een achtergrond hebt in de keuken, de bediening, het management of een andere rol — we nodigen je uit!',
    image: null,
  },
];

export default function Rollen() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      <Header active="/rollen" />
      <FloatingButtons />

      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1
            className="text-5xl md:text-6xl uppercase mb-6"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Functies & Rollen
          </h1>
          <p className="text-xl" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
            Klik op een functie om meer te lezen — en solliciteer direct als het bij je past.
          </p>
        </div>
      </section>

      {/* Rollen grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {rollen.map((rol) => (
              <div key={rol.id}>
                {/* Card */}
                <div
                  className="flex overflow-hidden rounded-lg shadow-md cursor-pointer transition-shadow hover:shadow-lg"
                  style={{ backgroundColor: '#3b696d' }}
                  onClick={() => setExpanded(expanded === rol.id ? null : rol.id)}
                >
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#bdeffc' }}>
                        ⏱ {rol.uren} &nbsp;📍 Texel
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{rol.title}</h3>
                    <p className="text-sm mb-5" style={{ color: '#d0f0fa' }}>{rol.summary}</p>
                    <div className="flex items-center gap-3">
                      <button
                        className="px-5 py-2 text-sm font-bold uppercase tracking-wider"
                        style={{ backgroundColor: '#ddd95a', color: '#3b696d', fontFamily: "'Pana Summer', serif" }}
                      >
                        {expanded === rol.id ? 'Inklappen ↑' : 'Meer lezen ↓'}
                      </button>
                    </div>
                  </div>
                  {rol.image && (
                    <div className="w-32 md:w-40 flex-shrink-0 overflow-hidden">
                      <img src={rol.image} alt={rol.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  {!rol.image && (
                    <div className="w-32 md:w-40 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#2a5558' }}>
                      <span className="text-5xl">{rol.icon}</span>
                    </div>
                  )}
                </div>

                {/* Expanded detail */}
                {expanded === rol.id && (
                  <div className="rounded-b-lg p-6 shadow-md -mt-1" style={{ backgroundColor: '#f0fafe', borderTop: '3px solid #bdeffc' }}>
                    <p className="text-base leading-relaxed mb-6" style={{ color: '#3b696d' }}>
                      {rol.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/contact"
                        className="inline-block px-6 py-3 font-bold text-white text-sm uppercase tracking-wider text-center transition-opacity hover:opacity-85"
                        style={{ backgroundColor: '#3b696d' }}
                      >
                        Ik wil meelopen →
                      </Link>
                      <a
                        href="https://wa.me/31623823324?text=Hoi!%20Ik%20ben%20ge%C3%AFnteresseerd%20in%20de%20functie%3A%20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 font-bold text-white text-sm uppercase tracking-wider text-center"
                        style={{ backgroundColor: '#25D366' }}
                      >
                        💬 WhatsApp Marije
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#3b696d' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white uppercase mb-4"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400 }}>
            Staat jouw functie er niet bij?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#bdeffc' }}>
            Stuur gewoon een open sollicitatie. We zijn altijd blij met enthousiaste mensen.
          </p>
          <Link href="/contact"
            className="inline-block px-8 py-3 font-bold text-sm uppercase tracking-wider border-2 border-white text-white hover:opacity-80">
            Open sollicitatie →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
