import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Link from 'next/link';

const faqs = [
  {
    q: 'Wanneer kan ik starten met werken?',
    a: 'Je kunt direct starten na het afronden van het sollicitatieproces! We proberen dit zo snel en laagdrempelig mogelijk te houden. Liefst plannen we eerst een kort gesprekje of een dag meelopen.',
  },
  {
    q: 'Is er woonruimte beschikbaar op Texel?',
    a: 'Ja, we bieden personeelskamers aan tegen betaling. Kom je van buiten Texel? Dan regelen we graag de details tijdens ons kennismakingsgesprek. Zo hoef je niet iedere dag heen-en-weer te reizen.',
  },
  {
    q: 'Heb ik ervaring nodig?',
    a: 'Nee! Ervaring in de horeca is geen vereiste. Wij leren je alles wat je moet weten. We zoeken enthousiasme, een glimlach en de wil om samen iets moois te maken — de rest leren we je.',
  },
  {
    q: 'Hoe begin ik met solliciteren?',
    a: 'Stuur een WhatsApp, bel ons of vul het contactformulier in. We reageren zo snel mogelijk en plannen daarna graag een persoonlijk gesprek. Je kunt ook een CV + motivatie mailen naar vacatures@strandpaviljoenkaapnoord.nl.',
  },
  {
    q: 'Kan ik parttime werken of alleen in het weekend?',
    a: 'Ja, in overleg is vrijwel alles mogelijk. Of je nu weekenden wilt, doordeweeks, seizoenmatig of parttime — we kijken samen naar wat werkt voor jou en voor ons.',
  },
  {
    q: 'Kan ik ook in het hoogseizoen vakantie opnemen?',
    a: 'Ja! We plannen bewust zodat iedereen z\'n vakantie kan opnemen — ook in de drukste maanden. We doen dit met elkaar en in overleg, zodat het voor iedereen werkt.',
  },
  {
    q: 'Wat voor functies zijn er?',
    a: 'We zoeken mensen voor de bediening, de keuken (kok / chef de partie), als weekendhulp of vakantiekracht, en voor tussenjaars-posities. Staat jouw ideale rol er niet bij? Stuur gewoon een open sollicitatie!',
  },
  {
    q: 'Wil je ons eerst even spreken?',
    a: 'Uiteraard! Bel of WhatsApp Marije op 06-23823324. We horen graag van je en beantwoorden al je vragen met plezier.',
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      <Header active="/faq" />
      <FloatingButtons />

      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1
            className="text-5xl md:text-6xl uppercase mb-6"
            style={{ fontFamily: "'Pana Summer', serif", fontWeight: 400, color: '#3b696d', letterSpacing: '0.03em' }}
          >
            Veelgestelde vragen
          </h1>
          <p className="text-xl" style={{ color: '#3b696d', fontFamily: "'Kodchasan', sans-serif", fontWeight: 300 }}>
            Alles over werken bij Kaap Noord
          </p>
        </div>
      </section>

      {/* FAQ lijst */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-lg bg-white shadow-sm overflow-hidden"
              >
                <summary
                  className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold text-base select-none list-none"
                  style={{ color: '#3b696d' }}
                >
                  {faq.q}
                  <span className="ml-4 text-xl transition-transform group-open:rotate-45 flex-shrink-0">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm leading-relaxed text-gray-600 border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* Nog een vraag? */}
          <div className="mt-14 rounded-xl p-8 text-center" style={{ backgroundColor: '#3b696d' }}>
            <h3 className="text-2xl font-bold text-white mb-3">Nog een vraag?</h3>
            <p className="mb-6" style={{ color: '#bdeffc' }}>
              Wil je ons graag even spreken? Neem gerust contact op — we horen graag van je.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/31623823324?text=Ik%20heb%20een%20vraag%20over%20werken%20bij%20Kaap%20Noord"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 font-bold text-sm uppercase tracking-wider"
                style={{ backgroundColor: '#25D366', color: 'white' }}
              >
                💬 WhatsApp Marije
              </a>
              <Link href="/contact"
                className="px-8 py-3 font-bold text-sm uppercase tracking-wider border-2 border-white text-white hover:opacity-80">
                Contactformulier
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
