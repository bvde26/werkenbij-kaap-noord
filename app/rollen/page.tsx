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
    uren: '38 uur',
    description: "Wil jij werken in een team waarbij gastvrijheid hoog in het vaandel staat? Sluit je aan als zelfstandig medewerker bediening bij Strandpaviljoen Kaap Noord op Texel! Samen met je collega's zorg je voor een enthousiaste, ongedwongen service die onze gasten doet terugkeren.",
    image: '/assets/IMG_7031.jpg',
  },
  {
    id: 'weekend',
    icon: '🌞',
    title: 'Weekendhulpen en vakantiekrachten',
    uren: 'Bepaal jouw uren',
    description: "Op zoek naar een leuke bijbaan op Texel? Bij Strandpaviljoen Kaap Noord op Texel zoeken we enthousiaste collega's voor de afwas, bediening en keuken. Het is bij ons mogelijk om verschillende taken te combineren. Ervaring is niet nodig; wij leren je alles wat je moet weten! Werken in de weekenden of in de vakanties, in overleg is vrijwel alles mogelijk bij ons.",
    image: '/assets/IMG_7115.jpg',
  },
  {
    id: 'tussenjaar',
    icon: '📚',
    title: 'Tussenjaars op Texel',
    uren: '38 uur',
    description: "Zin in een avontuurlijk tussenjaar in een van de mooiste omgevingen van Nederland? Bij Strandpaviljoen Kaap Noord op Texel bieden we jou die kans!\n\nErvaring in de horeca is geen vereiste; we leren je alles wat je moet weten! Bij ons kun je diverse taken uitproberen – van bedienen tot koken en alles daartussen. Er is volop ruimte om te groeien en jezelf te ontwikkelen.",
    image: '/assets/Tussenjaar-horeca-op-Texel.jpg',
  },
  {
    id: 'kok',
    icon: '👨‍🍳',
    title: 'Zelfstandig werkend kok',
    uren: '38 uur',
    description: "Wil jij werken als kok in een omgeving waar de zee altijd dichtbij is? Bij Strandpaviljoen Kaap Noord op Texel bieden we een afwisselende functie waarin je samen met ons keukenteam de heerlijkste gerechten (voor)bereidt, met een nadruk op verse en lokale producten. Onze uitgebreide menukaart biedt voor ieder wat wils en in deze rol ervaar je het unieke leven en werken op een prachtig eiland, omgeven door de adembenemende natuur van Texel.",
    image: '/assets/Sous-chef-kaap-noord-small-image.jpg',
  },
  {
    id: 'chef',
    icon: '⭐',
    title: 'Chef de Partie',
    uren: '38 uur',
    description: "Wil jij werken als Chef de Partie in een omgeving waar de zee altijd dichtbij is? Bij Strandpaviljoen Kaap Noord op Texel bieden we een dynamische functie waarin je een essentiële rol speelt binnen ons keukenteam. Je bereidt heerlijke gerechten met een focus op verse en lokale producten. Onze uitgebreide menukaart biedt voor ieder wat wils en in deze rol ervaar je het unieke leven en werken op een prachtig eiland, omgeven door de adembenemende natuur van Texel.",
    image: '/assets/Sous-chef-kaap-noord-small-image.jpg',
  },
  {
    id: 'open',
    icon: '❓',
    title: 'Open sollicitatie',
    uren: '38-40 uur',
    description: "Heb jij een passie voor de horeca en wil je deel uitmaken van het dynamische team van Strandpaviljoen Kaap Noord? Wij staan open voor talent dat ons team kan versterken, zelfs als momenteel jouw ideale baan er niet tussen staat! We zijn altijd op zoek naar enthousiaste en gemotiveerde mensen die met hun vaardigheden en positieve instelling kunnen bijdragen aan het succes van ons paviljoen. Of je nu een achtergrond hebt in de keuken, de bediening, het management of een andere rol binnen de horeca, we nodigen je uit om jouw open sollicitatie te sturen.",
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
          <div className="grid md:grid-cols-2 gap-8">
            {rollen.map((rol) => (
              <div key={rol.id}>

                {/* Wrapper: foto absoluut, groen blok als één geheel */}
                <div
                  className="relative"
                  style={{ paddingRight: rol.image ? '130px' : '0', marginBottom: '8px' }}
                >
                  {/* Foto — strekt zich over volledige hoogte (titel + uitklapdeel) */}
                  {rol.image && (
                    <div
                      className="absolute right-0 overflow-hidden rounded-lg shadow-xl"
                      style={{ top: '-14px', bottom: '-14px', width: '118px', zIndex: 10 }}
                    >
                      <img src={rol.image} alt={rol.title} className="w-full h-full object-cover object-top" />
                    </div>
                  )}
                  {!rol.image && (
                    <div
                      className="absolute right-0 overflow-hidden rounded-lg shadow-xl flex items-center justify-center"
                      style={{ top: '-14px', bottom: '-14px', width: '118px', zIndex: 10, backgroundColor: '#2a5558' }}
                    >
                      <span className="text-5xl">{rol.icon}</span>
                    </div>
                  )}

                  {/* Groen blok: titel + uitklapinhoud = 1 geheel */}
                  <div className="rounded-lg overflow-hidden shadow-md" style={{ backgroundColor: '#3b696d' }}>

                    {/* Titel balk — klikbaar */}
                    <div
                      className="px-6 py-5 cursor-pointer flex items-center justify-between hover:brightness-110 transition-all"
                      onClick={() => setExpanded(expanded === rol.id ? null : rol.id)}
                    >
                      <h3
                        className="font-bold text-white uppercase leading-tight"
                        style={{ fontSize: '1.1rem', fontFamily: "'Kodchasan', sans-serif', letterSpacing: '0.03em'" }}
                      >
                        {rol.title}
                      </h3>
                      <span
                        className="flex-shrink-0 ml-3 transition-transform duration-200 text-sm"
                        style={{ color: '#ddd95a', transform: expanded === rol.id ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}
                      >
                        ▼
                      </span>
                    </div>

                    {/* Uitklapinhoud — zelfde achtergrond */}
                    {expanded === rol.id && (
                      <div className="px-6 pb-7" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                        <div className="flex items-center gap-4 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#bdeffc' }}>
                          <span>⏱ {rol.uren}</span>
                          <span>📍 Texel</span>
                        </div>
                        <div className="space-y-3 mb-6">
                          {rol.description.split('\n\n').map((p, i) => (
                            <p key={i} className="text-sm leading-relaxed text-white">{p}</p>
                          ))}
                        </div>
                        <Link
                          href="/contact"
                          className="inline-block px-6 py-2 font-bold text-sm uppercase tracking-wider"
                          style={{ backgroundColor: '#ddd95a', color: '#3b696d', fontFamily: "'Pana Summer', serif" }}
                        >
                          Solliciteer direct
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* spacer voor foto overflow */}
                <div style={{ height: '14px' }} />

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
