'use client';

import Header from '@/components/Header';
import VacatureCard from '@/components/VacatureCard';
import vacaturesData from '@/lib/vacatures-data.json';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO SECTION - EXACT REPLICA */}
      <section className="py-16 md:py-24" id="over-ons" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Col */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                WERKEN BIJ KAAP NOORD
              </h1>
              <p className="text-lg md:text-xl leading-relaxed">
                Zie jij jezelf al werken op een unieke plek met een fantastisch uitzicht. Is het helemaal jouw ding om het onze gasten naar hun zin te maken en ze het huiskamer gevoel te laten beleven?
              </p>
            </div>

            {/* Right Col - CTA */}
            <div className="flex items-center justify-center">
              <div className="p-8 rounded text-center" style={{ backgroundColor: '#3b696d', color: '#ffffff' }}>
                <p className="text-lg font-semibold">
                  Wij zoeken collega's! Maak jij de Kaap Noord familie compleet?
                </p>
              </div>
            </div>
          </div>

          {/* Vimeo Video */}
          <div className="mt-12 aspect-video bg-black rounded overflow-hidden">
            <iframe
              title="Strandpaviljoen Kaap Noord sfeervideo"
              src="https://player.vimeo.com/video/711355612?background=1&muted=1&autoplay=1&dnt=1"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* VACATURES SECTION */}
      <section className="py-16 bg-gray-50" id="vacatures">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Ontdek alle vacatures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {vacaturesData.map((vacature) => (
              <VacatureCard key={vacature.id} vacature={vacature} />
            ))}
          </div>
        </div>
      </section>

      {/* OVER ONS SECTION - 2 KOLOMMEN TEKST */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Over Strandpaviljoen Kaap Noord
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Bij ons staat "je thuis voelen" voor zowel gasten, als voor jou, hoog op ons lijstje. Snelle ongedwongen service met een glimlach is waar wij voor staan. Bij ons geen formele setting maar juist het huiskamer gevoel waarin ook jij je prettig voelt. Een gezellig, gemotiveerd team met de nodige humor om er zo iedere dag weer een feestje van te maken. Soms is het flink aanpakken, maar altijd met een lach en altijd samen.
              </p>
            </div>

            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Kaap Noord is is een familie, waarbij de ervaring die de medewerkers hebben minstens net zo belangrijk is als die van de gasten. Desiree en Mike vinden het belangrijk dat jij elke ochtend wakker wordt en zin hebt om aan de slag te gaan. De sfeer tussen de collega's maakt van een heerlijk drukke dag ook voor jou een feestje. Past dit bij jou?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 rounded shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-2xl font-semibold text-gray-800 italic">
                  "Van Bonaire naar Texel, wie had dat gedacht! Een wereld van verschil, maar ik werk al een jaar met veel plezier bij Kaap Noord!"
                </p>
              </div>
              <div className="aspect-square bg-gray-200 rounded overflow-hidden">
                <img
                  src="/assets/IMG_7031.jpg"
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USP SECTION - WERKEN BIJ ONS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Werken bij ons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* USP 1 */}
            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: '#3b696d' }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Werken op een eiland
              </h3>
              <p className="text-gray-600">
                Werk op een van de mooiste plekken van Nederland met prachtig uitzicht.
              </p>
            </div>

            {/* USP 2 */}
            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: '#3b696d' }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Collega's
              </h3>
              <p className="text-gray-600">
                Fijne werksfeer in een hecht team
              </p>
            </div>

            {/* USP 3 */}
            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: '#3b696d' }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Ontwikkeling
              </h3>
              <p className="text-gray-600">
                Er is altijd ruimte voor (persoonlijke) ontwikkeling binnen het vak
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-gray-50" id="faq">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Veelgestelde vragen
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Alles over werken bij Kaap Noord
              </h3>
            </div>

            <div className="space-y-4">
              {/* FAQ 1 */}
              <details className="bg-white p-6 rounded cursor-pointer hover:bg-gray-100">
                <summary className="font-bold text-gray-900 flex justify-between items-center">
                  <span>Wanneer kan ik starten met werken?</span>
                  <span>+</span>
                </summary>
                <p className="text-gray-600 mt-4">
                  Je kunt direct starten na het afronden van het sollicitatieproces! Bekijk de vacature die bij jou past, daar vind je het sollicitatieproces.
                </p>
              </details>

              {/* FAQ 2 */}
              <details className="bg-white p-6 rounded cursor-pointer hover:bg-gray-100">
                <summary className="font-bold text-gray-900 flex justify-between items-center">
                  <span>Is er woonruimte beschikbaar op Texel?</span>
                  <span>+</span>
                </summary>
                <p className="text-gray-600 mt-4">
                  Ja, we bieden woonruimte aan tegen betaling. Details hierover verstrekken we tijdens het sollicitatiegesprek.
                </p>
              </details>

              {/* FAQ 3 */}
              <details className="bg-white p-6 rounded cursor-pointer hover:bg-gray-100">
                <summary className="font-bold text-gray-900 flex justify-between items-center">
                  <span>Wat zijn de opleidingsvereisten?</span>
                  <span>+</span>
                </summary>
                <p className="text-gray-600 mt-4">
                  De opleidingsvereisten variëren per functie. Raadpleeg de specifieke vacature voor meer details.
                </p>
              </details>

              {/* FAQ 4 */}
              <details className="bg-white p-6 rounded cursor-pointer hover:bg-gray-100">
                <summary className="font-bold text-gray-900 flex justify-between items-center">
                  <span>Hoe begin ik met solliciteren?</span>
                  <span>+</span>
                </summary>
                <div className="text-gray-600 mt-4 space-y-3 text-sm">
                  <p>Lijkt het je leuk om te werken aan het strand in een informele setting? Kom dan werken bij Kaap Noord! Solliciteer via het formulier of val extra op door je CV + motivatie te mailen naar <a href="mailto:vacatures@strandpaviljoenkaapnoord.nl" className="text-blue-600 underline">vacatures@strandpaviljoenkaapnoord.nl</a>.</p>
                  <p>Bel of whatsapp je ons liever, dat kan natuurlijk ook. Hier onder vind je de contactgegevens!</p>
                  <p>We reageren zo snel mogelijk en plannen daarna graag een persoonlijk gesprek. Heb je nog vragen over de vacature? Dan kan altijd, we horen graag van je.</p>
                  <p>Telefoonnummer voor sollicitaties: <a href="tel:+31623823324" className="text-blue-600 underline">06-23823324</a> (Marije)</p>
                </div>
              </details>
            </div>
          </div>

          {/* Contact Info in FAQ */}
          <div className="mt-12 p-8 rounded text-center text-white" style={{ backgroundColor: '#3b696d' }}>
            <h3 className="text-2xl font-bold mb-4">
              Wil je ons graag eerst even spreken? Neem contact met ons op.
            </h3>
            <p className="mb-6">
              Solliciteer via jouw gewenste vacature of neem contact op. We reageren zo snel mogelijk en plannen daarna graag een persoonlijk gesprek.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a href="mailto:vacatures@strandpaviljoenkaapnoord.nl" className="text-blue-200 hover:text-white text-lg">
                vacatures@strandpaviljoenkaapnoord.nl
              </a>
              <a href="tel:+31623823324" className="text-blue-200 hover:text-white text-lg">
                +31 (0)6 23823324
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="h-96 bg-gray-200">
        <iframe
          title="Kaap Noord locatie"
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.734944277197!2d4.86669!3d53.17498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cf2eee748071bf%3A0x55265a1070e618b!2sStrandpaviljoen%20Kaap%20Noord!5e0!3m2!1snl!2snl!4v1"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* FOOTER */}
      <footer className="text-white py-12" style={{ backgroundColor: '#2a4a4d' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Col 1 */}
            <div>
              <p className="font-semibold mb-4">
                Strandpaviljoen Kaap Noord<br />
                Volharding 4, 1795 LH<br />
                De Cocksdorp, Texel<br />
                Tel: <a href="tel:+310222316340" className="text-blue-300 hover:text-white">+31 (0)222 316340</a>
              </p>

              <h4 className="font-bold text-lg mb-4 mt-6">Vacatures</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Zelfstandig medewerker bediening</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Weekendhulpen en vakantiekrachten</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">TUSSENJAARS OP TEXEL</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Zelfstandig werkend kok</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Chef de Partie</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Open sollicitatie</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div />

            {/* Col 3 */}
            <div>
              <p className="text-gray-300 mb-6">
                Woensdag t/m zondag geopend vanaf 11:00 uur voor lunch, borrel en diner. De keuken is minimaal tot 19:30 geopend.
              </p>

              <h4 className="font-bold text-lg mb-4">Volg onze socials</h4>
              <div className="space-y-2">
                <a href="https://www.instagram.com/strandpaviljoen_kaapnoord/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white block">
                  Instagram
                </a>
                <a href="https://www.facebook.com/StrandpaviljoenKaapNoordTexel/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white block">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2026 Strandpaviljoen Kaap Noord</p>
              <div className="space-x-4">
                <a href="#" className="hover:text-white">Privacy Statement</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
