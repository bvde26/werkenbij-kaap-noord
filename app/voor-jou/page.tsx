import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Link from 'next/link';

const usps = [
  {
    icon: '🏝️',
    title: 'Werken op een eiland',
    short: 'Werk op een van de mooiste plekken van Nederland.',
    description: 'Texel is niet zomaar een werkplek — het is een leefstijl. Na een dienst wandel je het strand op. Je werkt met uitzicht. Je groeit met het eiland mee. Of je nu voor één zomer komt of voor jaren: je vergeet dit niet meer.',
  },
  {
    icon: '👥',
    title: 'Echt team. Geen nummer.',
    short: 'Fijne werksfeer in een hecht en gezellig team.',
    description: 'Kaap Noord is familie-gerund. Désirée en Mike kennen je bij naam. Je collega\'s zijn je vrienden. Samen aanpakken, samen lachen — ook op de drukke zomerdagen. Je bent niet één van de vijfhonderd. Je bent nodig.',
  },
  {
    icon: '🎯',
    title: 'Jij bepaalt je schema',
    short: 'Flexibele tijden in overleg — altijd.',
    description: 'Of je nu weekenden wilt, doordeweeks, seizoenmatig of parttime: we regelen het samen. Bij Kaap Noord is in overleg vrijwel alles mogelijk. Jij brengt het voorstel, wij zorgen dat het werkt.',
  },
  {
    icon: '🌞',
    title: 'Vakantie in het hoogseizoen',
    short: 'Juist wanneer jij wilt — ook in de zomer.',
    description: 'Wil je weg in de zomervakantie? Dat kan. We plannen bewust zodat iedereen z\'n vakantie kan opnemen — ook in de drukste maanden. Jouw leven staat centraal, niet alleen ons rooster.',
  },
  {
    icon: '⭐',
    title: 'Je leert van de besten',
    short: 'Ruimte voor persoonlijke ontwikkeling — altijd.',
    description: 'Ervaring is niet nodig. Wij leren je alles wat je moet weten. Van dag één ben je onderdeel van een team dat je meeneemt, coacht en laat groeien. Niet via modules of formulieren — gewoon hands-on, samen werken.',
  },
  {
    icon: '🏠',
    title: 'Woonruimte geregeld',
    short: 'Personeelskamers beschikbaar op Texel.',
    description: 'Kom je van buiten Texel? We hebben personeelskamers beschikbaar tegen betaling. Je hoeft niet iedere dag heen-en-weer te reizen. Details over de woonruimte bespreken we tijdens het kennismakingsgesprek.',
  },
  {
    icon: '😌',
    title: 'Echte cultuur. Geen bullshit.',
    short: 'Huiskamer gevoel, ook voor jou als medewerker.',
    description: 'Geen corporate regeltjes. Geen nep-motivatie. Gewoon een plek waar jij je prettig voelt, je eigen ding doet en weet dat je er toe doet. De sfeer bij Kaap Noord maakt van iedere dienst een feestje — ook als het druk is.',
  },
  {
    icon: '💰',
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
      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1
            className="text-5xl md:text-6xl uppercase mb-6"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Dit krijg jij van ons
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
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
                <div className="text-3xl mb-3">{usp.icon}</div>
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
              style={{ backgroundColor: '#25D366', color: 'white' }}
            >
              💬 WhatsApp Marije
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
