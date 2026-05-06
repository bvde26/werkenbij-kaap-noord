export default function Home() {
  const whatsappLink = "https://wa.me/31623823324?text=Hoi!%20Ik%20wil%20graag%20Kaap%20Noord%20ontdekken!";
  const phoneLink = "tel:+31623823324";

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Floating Buttons */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-3xl hover:scale-110 transition-transform shadow-lg"
        style={{ backgroundColor: '#25D366' }}
        title="WhatsApp"
      >
        💬
      </a>
      <a
        href={phoneLink}
        className="fixed bottom-6 right-24 z-50 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        style={{ backgroundColor: '#3b696d' }}
        title="Bel ons"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm" style={{ backgroundColor: '#bdeffc', height: '60px' }}>
        <div className="max-w-6xl mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Kaap Noord" style={{ height: '45px' }} />
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium" style={{ color: '#3b696d' }}>
            <a href="/jij" className="hover:opacity-70">Jij</a>
            <a href="/wij" className="hover:opacity-70">Wij</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section - Text Above Video */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 uppercase" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, letterSpacing: '0.05em', color: '#3b696d' }}>
            Jij bent leuk,<br />wij ook.
          </h1>
          <p className="text-2xl md:text-3xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#3b696d' }}>
            Ontdek Kaap Noord, loop een dagje mee.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="h-96 md:h-screen overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://player.vimeo.com/video/711355612?background=1&muted=1&autoplay=1&dnt=1"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </section>

      {/* Jij / Wij Sections */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* JIJ */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#3b696d' }}>Jij</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Je zoekt een plek waar je jezelf kan zijn. Waar werk leuk is. Waar het voelt als een tweede thuis.
              </p>
              <a
                href="/jij"
                className="inline-block px-6 py-3 font-bold rounded transition"
                style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}
              >
                Lees meer over jij →
              </a>
            </div>

            {/* WIJ */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#3b696d' }}>Wij</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We zijn een team dat gepassioneerd is. Dat elkaar helpt. Dat samen iets moois creëert op Texel.
              </p>
              <a
                href="/wij"
                className="inline-block px-6 py-3 font-bold rounded transition"
                style={{ backgroundColor: '#bdeffc', color: '#3b696d' }}
              >
                Lees meer over ons →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#3b696d' }}>
            Waarom Kaap Noord?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="text-4xl mb-4">🏝️</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>Texel</h3>
              <p className="text-gray-700">Werk op een eiland met uitzicht. Zee in je hart.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>Team</h3>
              <p className="text-gray-700">Hechte groep. Elkaar helpen. Samen sterker.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#3b696d' }}>Flexibel</h3>
              <p className="text-gray-700">Je bepaalt mee je rooster. Werk-leven balans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-12 text-white" style={{ backgroundColor: '#2a4a4d' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="mb-2">📞 06-23823324 (Marije)</p>
              <p className="mb-2">✉️ vacatures@strandpaviljoenkaapnoord.nl</p>
              <p>📍 Volharding 4, Texel</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Snelle link</h3>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block mb-2 hover:opacity-70">
                💬 WhatsApp
              </a>
              <a href={phoneLink} className="block hover:opacity-70">
                ☎️ Bel ons
              </a>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
            <p>Strandpaviljoen Kaap Noord © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
