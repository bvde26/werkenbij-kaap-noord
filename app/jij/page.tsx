export default function JijPage() {
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
            <a href="/jij" className="hover:opacity-70 font-bold">Voor jou</a>
            <a href="/over-ons" className="hover:opacity-70">Over ons</a>
            <a href="/#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Voor jou
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Ben je op zoek naar meer? Naar een plek waar je jezelf kan zijn?
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#3b696d' }}>
              Wat zoeken we in jou?
            </h2>
            <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Je hoeft niet perfect te zijn. Je hoeft geen ervaring te hebben. Je hoeft alleen maar jezelf te zijn.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="p-6 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>Je bent enthousiast</h3>
                <p className="text-gray-700">Je ziet mogelijkheden. Je wilt dingen proberen. Je bent niet bang om jezelf uit te sloven.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>Je bent social</h3>
                <p className="text-gray-700">Je geniet van contact met mensen. Je maakt snel vrienden. Je bent aardig.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>Je bent flexibel</h3>
                <p className="text-gray-700">Je bent bereid om aan te passen. Je denkt mee. Je bent niet star.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#3b696d' }}>Je bent betrouwbaar</h3>
                <p className="text-gray-700">Je doet wat je zegt. Je komt op tijd. Je bent iemand op wie we kunnen rekenen.</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-6 mt-12" style={{ color: '#3b696d' }}>
              Wat krijg jij van ons?
            </h2>
            <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>

            <div className="space-y-4 mb-12">
              <p className="text-gray-700 text-lg">✓ <strong>Flexibel rooster</strong> — Jij bepaalt mee</p>
              <p className="text-gray-700 text-lg">✓ <strong>Woonruimte</strong> — Mogelijkheden op Texel</p>
              <p className="text-gray-700 text-lg">✓ <strong>Prima salaris</strong> — Eerlijk betaald</p>
              <p className="text-gray-700 text-lg">✓ <strong>Team</strong> — Mensen die om je geven</p>
              <p className="text-gray-700 text-lg">✓ <strong>Uitzicht</strong> — Werk met zee in je hart</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12 px-6 rounded-lg" style={{ backgroundColor: '#bdeffc' }}>
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#3b696d' }}>Klinkt dit leuk?</h3>
            <p className="text-lg mb-8" style={{ color: '#3b696d' }}>
              Neem contact op. Laten we elkaar ontmoeten!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-white font-bold rounded text-lg transition hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                💬 WhatsApp
              </a>
              <a
                href={phoneLink}
                className="px-8 py-4 text-white font-bold rounded text-lg transition hover:opacity-90"
                style={{ backgroundColor: '#3b696d' }}
              >
                ☎️ Bel ons
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold mb-8" style={{ color: '#3b696d' }}>Veelgestelde vragen</h2>
            <svg className="w-32 h-2 mb-6" viewBox="0 0 100 10" style={{ color: '#bdeffc' }}>
              <polyline points="0,5 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
            <div className="space-y-6">
              <div className="p-6 border-l-4 bg-gray-50" style={{ borderColor: '#3b696d' }}>
                <h4 className="text-xl font-bold mb-2" style={{ color: '#3b696d' }}>Hoeveel uren per week?</h4>
                <p className="text-gray-700">Flexibel! Afhankelijk van wat je wilt en wat wij nodig hebben. Seizoen speelt ook een rol.</p>
              </div>
              <div className="p-6 border-l-4 bg-gray-50" style={{ borderColor: '#3b696d' }}>
                <h4 className="text-xl font-bold mb-2" style={{ color: '#3b696d' }}>Kan ik nu starten?</h4>
                <p className="text-gray-700">Ja! We hebben altijd plaats. Zelfs nu. Bel of WhatsApp ons.</p>
              </div>
              <div className="p-6 border-l-4 bg-gray-50" style={{ borderColor: '#3b696d' }}>
                <h4 className="text-xl font-bold mb-2" style={{ color: '#3b696d' }}>Hoe lang duurt training?</h4>
                <p className="text-gray-700">Paar weken. We leren je alles. Geen druk, wel duidelijkheid.</p>
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
