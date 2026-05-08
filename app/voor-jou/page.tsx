import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Link from 'next/link';

const usps = [
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c0 4-3 6-6 7h12c-3-1-6-3-6-7z"/><path d="M2 20h20"/><path d="M7 20c1-3 3-4 5-4s4 1 5 4"/></svg>,
    title: 'Werken op een eiland',
    short: 'Werk op een van de mooiste plekken van Nederland.',
    description: 'Texel is niet zomaar een werkplek — het is een leefstijl. Na een dienst wandel je het strand op. Je werkt met uitzicht. Je groeit met het eiland mee. Of je nu voor één zomer komt of voor jaren: je vergeet dit niet meer.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/><path d="M3 20c0-4 2.7-6 6-6M21 20c0-4-2.7-6-6-6M9 14c1 0 2 .3 3 1 1-.7 2-1 3-1"/></svg>,
    title: 'Echt team. Geen nummer.',
    short: 'Fijne werksfeer in een hecht en gezellig team.',
    description: 'Kaap Noord is familie-gerund. Désirée en Mike kennen je bij naam. Je collega\'s zijn je vrienden. Samen aanpakken, samen lachen — ook op de drukke zomerdagen. Je bent niet één van de vijfhonderd. Je bent nodig.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: 'Jij bepaalt je schema',
    short: 'Flexibele tijden in overleg — altijd.',
    description: 'Of je nu weekenden wilt, doordeweeks, seizoenmatig of parttime: we regelen het samen. Bij Kaap Noord is in overleg vrijwel alles mogelijk. Jij brengt het voorstel, wij zorgen dat het werkt.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
    title: 'Vakantie in het hoogseizoen',
    short: 'Juist wanneer jij wilt — ook in de zomer.',
    description: 'Wil je weg in de zomervakantie? Dat kan. We plannen bewust zodat iedereen z\'n vakantie kan opnemen — ook in de drukste maanden. Jouw leven staat centraal, niet alleen ons rooster.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    title: 'Je leert van de besten',
    short: 'Ruimte voor persoonlijke ontwikkeling — altijd.',
    description: 'Ervaring is niet nodig. Wij leren je alles wat je moet weten. Van dag één ben je onderdeel van een team dat je meeneemt, coacht en laat groeien. Niet via modules of formulieren — gewoon hands-on, samen werken.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: 'Woonruimte geregeld',
    short: 'Personeelskamers beschikbaar op Texel.',
    description: 'Kom je van buiten Texel? We hebben personeelskamers beschikbaar tegen betaling. Je hoeft niet iedere dag heen-en-weer te reizen. Details over de woonruimte bespreken we tijdens het kennismakingsgesprek.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    title: 'Echte cultuur. Geen bullshit.',
    short: 'Huiskamer gevoel, ook voor jou als medewerker.',
    description: 'Geen corporate regeltjes. Geen nep-motivatie. Gewoon een plek waar jij je prettig voelt, je eigen ding doet en weet dat je er toe doet. De sfeer bij Kaap Noord maakt van iedere dienst een feestje — ook als het druk is.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: 'Eerlijk salaris',
    short: 'Duidelijk en eerlijk beloond voor je werk.',
    description: 'Geen verrassing achteraf. Eerlijk salaris dat aansluit bij jouw ervaring en uren. Je weet waar je aan toe bent vanaf dag één. Details bespreken we graag in een persoonlijk gesprek.',
  },
];

export default function VoorJou() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      <Header active="/voor-jou" />
      <FloatingButtons />

      {/* Hero */}
      <section className="py-20" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 md:px-16">
          <h1
            className="text-5xl md:text-6xl uppercase mb-6"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Dit krijg jij van ons
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300, maxWidth: '42ch' }}>
            Geen lijst met eisen. Wel een lijst met wat wij jou bieden.
          </p>
        </div>
      </section>

      {/* USP Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {usps.map((usp, i) => (
              <div
                key={i}
                className="rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: '#3b696d' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>{usp.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{usp.title}</h3>
                <p className="text-sm mb-4" style={{ color: '#bdeffc' }}>{usp.short}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#d0f0fa' }}>{usp.description}</p>
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
            Klinkt goed?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#bdeffc' }}>
            Kom gewoon een dagje meelopen. Dan voel je zelf of het past.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 font-bold text-sm uppercase tracking-wider"
              style={{ backgroundColor: '#25D366', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.687.435 3.272 1.197 4.653L2 22l5.998-1.172A9.45 9.45 0 0 0 11.5 21c5.238 0 9.5-4.262 9.5-9.5S16.738 2 11.5 2zm0 17.3a7.792 7.792 0 0 1-3.976-1.083l-.285-.169-2.955.577.6-2.883-.186-.295A7.793 7.793 0 0 1 3.7 11.5C3.7 7.198 7.198 3.7 11.5 3.7S19.3 7.198 19.3 11.5 15.802 19.3 11.5 19.3z"/></svg>
              WhatsApp Marije
            </a>
            <Link href="/rollen"
              className="px-8 py-3 font-bold text-sm uppercase tracking-wider border-2 border-white text-white hover:opacity-80">
              Bekijk functies →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
