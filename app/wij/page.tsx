export default function WijPage() {
  const whatsappLink = "https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!";
  const phoneLink = "tel:+31623823324";

  return (
    <div className="min-h-screen bg-white">
{/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm" style={{ backgroundColor: '#bdeffc', height: '80px' }}>
        <div className="max-w-6xl mx-auto px-4 h-full flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 hover:opacity-70">
            <img src="/logo.svg" alt="Kaap Noord" style={{ height: '45px' }} />
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium" style={{ color: '#3b696d' }}>
            <a href="/jij" className="hover:opacity-70">Voor jou</a>
            <a href="/wij" className="hover:opacity-70 font-bold">Over ons</a>
            <a href="/#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Over ons
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Dit is Strandpaviljoen Kaap Noord. Dit zijn wij. Dit zoeken we.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#3b696d' }}>
              Over ons
            </h2>
            <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              We zijn een strandpaviljoen op Texel. Familie-gerund. Klein. Gezellig. Echt.
            </p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              We serveren gasten. We creëren sfeer. We zorgen voor elkaar. We groeien samen.
            </p>

            <h2 className="text-4xl font-bold mb-6 mt-12" style={{ color: '#3b696d' }}>
              Onze waarden
            </h2>
            <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="p-6 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>Huiskamer gevoel</h3>
                <p className="text-gray-700">We willen dat gasten en collega's zich thuis voelen. Niet formeel. Echt.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>Samen sterker</h3>
                <p className="text-gray-700">We helpen elkaar. We lachen. We groeien samen als team.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>Kwaliteit</h3>
                <p className="text-gray-700">Eten, service, sfeer — alles met aandacht en liefde gemaakt.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>Texel first</h3>
                <p className="text-gray-700">We houden van dit eiland. Dat straalt af op alles wat we doen.</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-6 mt-12" style={{ color: '#3b696d' }}>
              Dit zoeken we
            </h2>
            <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              We zoeken mensen die willen samenwerken. Die energie hebben. Die van gasten houden.
            </p>

            <div className="space-y-4 mb-12">
              <p className="text-gray-700 text-lg">✓ Bediening & gastronomie</p>
              <p className="text-gray-700 text-lg">✓ Keuken & ondersteuning</p>
              <p className="text-gray-700 text-lg">✓ Seizoenskrachten</p>
              <p className="text-gray-700 text-lg">✓ Vaste collega's</p>
              <p className="text-gray-700 text-lg">✓ Open sollicitatie — jij bepaalt wat je doet</p>
            </div>

            <h2 className="text-4xl font-bold mb-6 mt-12" style={{ color: '#3b696d' }}>
              Ons team
            </h2>
            <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
            <p className="text-gray-700 text-lg leading-relaxed">
              Van jong tot oud. Van student tot family-mentaliteit. Iedereen brengt iets unieks. Dat maken we samen speciaal.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12 px-6 rounded-lg my-12" style={{ backgroundColor: '#bdeffc' }}>
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#3b696d' }}>Wil je bij ons horen?</h3>
            <p className="text-lg" style={{ color: '#3b696d' }}>
              Neem contact op. Laten we kennismaken!
            </p>
          </div>

          {/* Vacancies */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold mb-8" style={{ color: '#3b696d' }}>Waar kunnen we je gebruiken?</h2>
            <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: '#3b696d' }}>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#3b696d' }}>Bediening</h3>
                <p className="text-gray-700 mb-3">Gasten serveren. Sfeer creëren. Het gezicht van Kaap Noord zijn.</p>
                <p className="text-sm text-gray-600">Flexibel • 20-40 uur/week</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: '#3b696d' }}>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#3b696d' }}>Keuken</h3>
                <p className="text-gray-700 mb-3">Koken. Bereiden. De smaak bepalen van onze gasten.</p>
                <p className="text-sm text-gray-600">Flexibel • 20-40 uur/week</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: '#3b696d' }}>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#3b696d' }}>Seizoenskracht</h3>
                <p className="text-gray-700 mb-3">Voor zomer, paasvakantie, of weekends. Meelopen en leren.</p>
                <p className="text-sm text-gray-600">Flexibel • Per afspraak</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: '#3b696d' }}>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#3b696d' }}>Open sollicitatie</h3>
                <p className="text-gray-700 mb-3">Jij bepaalt wat je kan doen. Wij bepalen hoe we je gebruiken.</p>
                <p className="text-sm text-gray-600">Altijd plaats voor jou</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white mt-20" style={{ backgroundColor: '#2a4a4d' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">Strandpaviljoen Kaap Noord</p>
          <p className="text-sm text-gray-300">Volharding 4, Texel</p>
        </div>
      </footer>
    </div>
  );
}
