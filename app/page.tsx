import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import DecorativeLine from '@/components/DecorativeLine';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      <Header active="/" />
      <FloatingButtons />

      {/* Hero */}
      <section className="relative">
        <div className="h-[80vh] md:h-screen overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://player.vimeo.com/video/711355612?background=1&muted=1&autoplay=1&loop=1&dnt=1"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={{ background: 'rgba(0,0,0,0.35)' }}>
            <h1
              className="text-5xl md:text-7xl uppercase mb-4 text-white"
              style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, letterSpacing: '0.03em' }}
            >
              Werken bij Kaap Noord
            </h1>
            <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl"
              style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
              Kom je een dagje meelopen in ons team op het mooiste eiland?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 font-bold text-sm uppercase tracking-widest transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}
              >
                Ik wil meelopen →
              </Link>
              <Link
                href="/over-ons"
                className="px-8 py-3 font-bold text-sm uppercase tracking-widest border-2 border-white text-white transition-opacity hover:opacity-80"
              >
                Vertel me meer
              </Link>
            </div>
          </div>
        </div>
        <DecorativeLine />
      </section>

      {/* Intro quote */}
      <section className="py-16" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl leading-relaxed" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
            Zie jij jezelf al werken op een unieke plek met een fantastisch uitzicht? Is het helemaal jouw ding om onze gasten naar hun zin te maken en ze het huiskamer gevoel te laten beleven?
          </p>
        </div>
      </section>

      {/* Functies */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-center mb-2 uppercase"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}
          >
            Ontdek alle functies
          </h2>
          <div className="flex justify-center mb-10">
            <svg className="w-32 h-2" viewBox="0 0 100 10" style={{ color: '#3b696d' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { uren: '38 uur', title: 'Zelfstandig medewerker bediening', img: '/assets/IMG_7031.jpg', tekst: "Wil jij werken in een team waarbij gastvrijheid hoog in het vaandel staat? Samen met je collega's zorg je voor een enthousiaste, ongedwongen service die onze gasten doet terugkeren." },
              { uren: 'Jouw uren', title: 'Weekendhulpen en vakantiekrachten', img: '/assets/IMG_7115.jpg', tekst: "Op zoek naar een leuke bijbaan op Texel? Ervaring is niet nodig — wij leren je alles wat je moet weten! In overleg is vrijwel alles mogelijk bij ons." },
              { uren: '38 uur', title: 'Tussenjaars op Texel', img: '/assets/Tussenjaar-horeca-op-Texel.jpg', tekst: "Zin in een avontuurlijk tussenjaar in een van de mooiste omgevingen van Nederland? Van bedienen tot koken — er is volop ruimte om te groeien." },
              { uren: '38 uur', title: 'Zelfstandig werkend kok', img: '/assets/Sous-chef-kaap-noord-small-image.jpg', tekst: "Wil jij werken als kok waar de zee altijd dichtbij is? Een afwisselende functie met een nadruk op verse en lokale producten." },
              { uren: '38 uur', title: 'Chef de Partie', img: '/assets/Sous-chef-kaap-noord-small-image.jpg', tekst: "Een dynamische functie als essentiële rol binnen ons keukenteam. Focus op verse en lokale producten, op een prachtig eiland." },
              { uren: 'In overleg', title: 'Open sollicitatie', img: null, tekst: "Staat jouw ideale baan er niet bij? We zijn altijd op zoek naar enthousiaste mensen met een positieve instelling." },
            ].map((r, i) => (
              <div key={i} className="relative" style={{ paddingRight: r.img ? '120px' : '0' }}>
                {/* Groene kaart */}
                <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: '#3b696d' }}>
                  <span className="text-xs font-semibold uppercase tracking-widest mb-2 block" style={{ color: '#bdeffc' }}>
                    ⏱ {r.uren} &nbsp;📍 Texel
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">{r.title}</h3>
                  <p className="text-sm mb-5" style={{ color: '#d0f0fa' }}>{r.tekst}</p>
                  <Link href="/contact" className="inline-block px-5 py-2 text-sm font-bold uppercase tracking-wider"
                    style={{ backgroundColor: '#ddd95a', color: '#3b696d', fontFamily: "'Pana Summer', serif" }}>
                    Solliciteer direct
                  </Link>
                </div>
                {/* Foto uitspringend */}
                {r.img && (
                  <div className="absolute right-0 overflow-hidden rounded-lg shadow-xl"
                    style={{ top: '-14px', bottom: '-14px', width: '110px', zIndex: 10 }}>
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                  </div>
                )}
                {!r.img && (
                  <div className="absolute right-0 overflow-hidden rounded-lg shadow-xl flex items-center justify-center"
                    style={{ top: '-14px', bottom: '-14px', width: '110px', zIndex: 10, backgroundColor: '#2a5558' }}>
                    <span className="text-4xl">❓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/rollen" className="inline-block px-8 py-3 font-semibold border-2 text-sm uppercase tracking-wider transition-colors hover:text-white hover:bg-[#3b696d]"
              style={{ borderColor: '#3b696d', color: '#3b696d' }}>
              Alle functies bekijken →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row overflow-hidden rounded-xl shadow-md" style={{ backgroundColor: '#bdeffc' }}>
            <div className="flex-1 p-8 md:p-10 flex items-center">
              <div>
                <span className="text-5xl font-bold mb-4 block" style={{ color: '#3b696d', fontFamily: 'Georgia, serif' }}>"</span>
                <p className="text-lg md:text-xl font-semibold uppercase" style={{ color: '#3b696d', fontFamily: "'Pana Summer', serif", letterSpacing: '0.02em' }}>
                  Van Bonaire naar Texel. Wie had dat gedacht! Een wereld van verschil, maar ik werk al een jaar met veel plezier bij Kaap Noord!
                </p>
              </div>
            </div>
            <div className="w-full md:w-64 flex-shrink-0 h-56 md:h-auto overflow-hidden">
              <img src="/assets/IMG_7115.jpg" alt="Medewerker Kaap Noord" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Quick USPs */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f0fafe' }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl text-center mb-10 uppercase"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}
          >
            Waarom Kaap Noord?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🏝️</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#3b696d' }}>Werken op een eiland</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Werk op een van de mooiste plekken van Nederland. Zilt water, zonsondergangen en natuur om je heen.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#3b696d' }}>Echt team</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Fijne werksfeer in een hecht team. Bij ons geen formele setting maar het huiskamer gevoel.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#3b696d' }}>Jij bepaalt mee</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Flexibele tijden in overleg. Vakantie ook in het hoogseizoen. Jij brengt het voorstel, wij regelen het.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/voor-jou" className="inline-block px-8 py-3 font-semibold text-sm uppercase tracking-wider text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#3b696d' }}>
              Alle voordelen →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#3b696d' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white uppercase mb-4"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400 }}>
            Kom je kennismaken?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#bdeffc' }}>
            Geen lange sollicitatie. Geen gekke tests. Gewoon een gesprek of een dagje meelopen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366', color: 'white' }}
            >
              💬 WhatsApp Marije
            </a>
            <Link href="/contact"
              className="px-8 py-3 font-bold text-sm uppercase tracking-wider border-2 border-white text-white transition-opacity hover:opacity-80">
              Of stuur een bericht
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
