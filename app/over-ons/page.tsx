import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Link from 'next/link';

export default function OverOns() {
  return (
    <div className="min-h-screen bg-white">
      <Header active="/over-ons" />
      <FloatingButtons />

      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1
            className="text-5xl md:text-6xl uppercase mb-6"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Over ons
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
            Dit is Kaap Noord. Dit zijn wij. Dit zoeken we.
          </p>
        </div>
      </section>

      {/* Verhaal */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl uppercase mb-4"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}
          >
            Over Strandpaviljoen Kaap Noord
          </h2>
          <svg className="w-32 h-2 mb-8" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
            <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#444' }}>
            Bij ons staat "je thuis voelen" voor zowel gasten als voor jou, hoog op ons lijstje. Snelle ongedwongen service met een glimlach is waar wij voor staan. Bij ons geen formele setting maar juist het huiskamer gevoel waarin ook jij je prettig voelt.
          </p>
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#444' }}>
            Een gezellig, gemotiveerd team met de nodige humor om er zo iedere dag weer een feestje van te maken. Soms is het flink aanpakken, maar altijd met een lach en altijd samen.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#444' }}>
            Kaap Noord is een familie, waarbij de ervaring die de medewerkers hebben minstens net zo belangrijk is als die van de gasten. Désirée en Mike vinden het belangrijk dat jij elke ochtend wakker wordt en zin hebt om aan de slag te gaan.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row overflow-hidden rounded-xl shadow-md" style={{ backgroundColor: '#bdeffc' }}>
            <div className="flex-1 p-8 md:p-10 flex items-center">
              <div>
                <span className="text-5xl font-bold mb-2 block" style={{ color: '#3b696d', fontFamily: 'Georgia, serif' }}>"</span>
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

      {/* Werken bij ons */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl uppercase mb-4"
            style={{ fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, color: '#3b696d', letterSpacing: '0.05em' }}
          >
            Werken bij ons
          </h2>
          <svg className="w-32 h-2 mb-8" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
            <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#f0fafe' }}>
              <div className="text-3xl mb-3">🏝️</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#3b696d' }}>Werken op een eiland</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Werk op een van de mooiste plekken van Nederland. Texel is niet zomaar een locatie — het is een leefstijl.</p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#f0fafe' }}>
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#3b696d' }}>Collega's</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Fijne werksfeer in een hecht team. De sfeer tussen de collega's maakt van een heerlijk drukke dag ook voor jou een feestje.</p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#f0fafe' }}>
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#3b696d' }}>Ontwikkeling</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Er is altijd ruimte voor persoonlijke ontwikkeling binnen het vak. Ervaring is niet nodig — wij leren je alles.</p>
            </div>
          </div>
          <div className="rounded-xl p-8 md:p-12 text-center" style={{ backgroundColor: '#3b696d' }}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Past dit bij jou?</h3>
            <p className="mb-6" style={{ color: '#bdeffc' }}>Geen lange procedure. Gewoon kennismaken en kijken of het klikt.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!" target="_blank" rel="noopener noreferrer"
                className="px-8 py-3 font-bold text-sm uppercase tracking-wider" style={{ backgroundColor: '#25D366', color: 'white' }}>
                💬 WhatsApp Marije
              </a>
              <Link href="/voor-jou" className="px-8 py-3 font-bold text-sm uppercase tracking-wider border-2 border-white text-white hover:opacity-80">
                Bekijk alle voordelen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
