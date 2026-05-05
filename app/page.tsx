'use client';

import Header from '@/components/Header';
import VacatureCard from '@/components/VacatureCard';
import vacaturesData from '@/lib/vacatures-data.json';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            WERKEN BIJ KAAP NOORD
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Zie jij jezelf al werken op een unieke plek met een fantastisch uitzicht?
          </p>

          {/* Dual CTA - Meeloop + Formal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-900 font-bold rounded hover:bg-gray-100">
              Kom een keer meelopen
            </button>
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 border-2 border-white">
              Ik wil solliciteren
            </button>
          </div>
        </div>
      </section>

      {/* VACATURES SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Ontdek alle vacatures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacaturesData.map((vacature) => (
              <VacatureCard key={vacature.id} vacature={vacature} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/vacatures"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
            >
              Bekijk alle vacatures →
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - BENEFITS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Over Strandpaviljoen Kaap Noord
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Werken op een eiland
              </h3>
              <p className="text-gray-600">
                Enjoy life on beautiful Texel with stunning views and island lifestyle
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Collega's
              </h3>
              <p className="text-gray-600">
                Werk in een warm, informeel team waar je jezelf thuis voelt
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ontwikkeling
              </h3>
              <p className="text-gray-600">
                Groei professioneel en persoonlijk in een stimulerende omgeving
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Veelgestelde vragen
          </h2>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="bg-white p-6 rounded cursor-pointer hover:bg-gray-50">
              <summary className="font-bold text-gray-900">
                Wanneer kan ik starten met werken?
              </summary>
              <p className="text-gray-600 mt-4">
                Dit hangt af van je beschikbaarheid en onze behoefte. Seizoenswerk kan snel beginnen, permanent werk vereist meestal meer planning.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details className="bg-white p-6 rounded cursor-pointer hover:bg-gray-50">
              <summary className="font-bold text-gray-900">
                Is er woonruimte beschikbaar op Texel?
              </summary>
              <p className="text-gray-600 mt-4">
                Mogelijk. Neem contact met ons op voor meer informatie over woonmogelijkheden.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details className="bg-white p-6 rounded cursor-pointer hover:bg-gray-50">
              <summary className="font-bold text-gray-900">
                Wat zijn de opleidingsvereisten?
              </summary>
              <p className="text-gray-600 mt-4">
                Dit verschilt per functie. Sommige rollen vereisen ervaring, anderen bieden je training.
              </p>
            </details>

            {/* FAQ Item 4 */}
            <details className="bg-white p-6 rounded cursor-pointer hover:bg-gray-50">
              <summary className="font-bold text-gray-900">
                Hoe begin ik met solliciteren?
              </summary>
              <p className="text-gray-600 mt-4">
                Kies een vacature en klik op "Solliciteer direct" of "Kom meelopen". Wij nemen snel contact op.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Wil je ons graag eerst even spreken?</h2>
          <p className="text-xl mb-8">Neem contact met ons op!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Telefoon</h3>
              <a href="tel:+31222316340" className="text-blue-200 hover:text-white">
                +31 (0)222 316340
              </a>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Email</h3>
              <a href="mailto:vacatures@strandpaviljoenkaapnoord.nl" className="text-blue-200 hover:text-white">
                vacatures@strandpaviljoenkaapnoord.nl
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-700">
            <h3 className="font-bold text-lg mb-4">Adres</h3>
            <p className="text-blue-200">
              Strandpaviljoen Kaap Noord<br />
              Volharding 4, 1795 LH<br />
              De Cocksdorp, Texel
            </p>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">Volg onze socials</h3>
            <div className="flex justify-center gap-4">
              <a href="#" className="text-blue-200 hover:text-white">Instagram</a>
              <a href="#" className="text-blue-200 hover:text-white">Facebook</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; 2026 Werken bij Kaap Noord. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}
